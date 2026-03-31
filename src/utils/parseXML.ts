import type { DataAreaType } from '@/components/Charts/Chart/types';

export interface CbrRatePoint {
	date: string;
	value: number;
}

export interface RateStats {
	current: number;
	changeDayAbs: number;
	changeDayPercent: number;
	changeWeekAbs: number;
	changeWeekPercent: number;
	changeMonthAbs: number;
	changeMonthPercent: number;
}

const parseCbrValue = (raw: string): number => {
	const normalized = raw.trim().replace(',', '.');
	const value = Number.parseFloat(normalized);
	return Number.isFinite(value) ? value : Number.NaN;
};

const cbrDateToIso = (cbrDate: string): string | null => {
	const parts = cbrDate.split('.');
	if (parts.length !== 3) return null;
	const [dd, mm, yyyy] = parts;
	if (!dd || !mm || !yyyy) return null;
	return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
};

/**
 * ЦБ отдаёт XML с encoding="windows-1251"; DOMParser в браузере часто создаёт parsererror
 * или прокси может подставить HTML. Надёжнее вытащить Record/Value регуляркой.
 */
const RECORD_VALUE_PATTERN =
	/<Record\b[^>]*\bDate="(\d{2}\.\d{2}\.\d{4})"[^>]*>[\s\S]*?<Value>([^<]*)<\/Value>/gi;

const parseCbrDynamicXmlWithRegex = (raw: string): CbrRatePoint[] => {
	const text = raw.replace(/^\uFEFF/, '').trim();
	const re = new RegExp(RECORD_VALUE_PATTERN.source, RECORD_VALUE_PATTERN.flags);
	const matches = Array.from(text.matchAll(re));
	return matches.reduce<CbrRatePoint[]>((acc, match) => {
		const iso = cbrDateToIso(match[1]);
		const value = parseCbrValue(match[2]);
		if (iso && !Number.isNaN(value)) acc.push({ date: iso, value });
		return acc;
	}, []);
};

const parseCbrDynamicXmlWithDom = (raw: string): CbrRatePoint[] => {
	const parser = new DOMParser();
	const doc = parser.parseFromString(raw, 'application/xml');
	if (doc.querySelector('parsererror')) return [];

	const records = doc.querySelectorAll('Record');
	const points: CbrRatePoint[] = [];

	records.forEach((record) => {
		const dateAttr = record.getAttribute('Date');
		const valueNode = record.querySelector('Value');
		if (!dateAttr || !valueNode?.textContent) return;

		const iso = cbrDateToIso(dateAttr);
		if (!iso) return;

		const value = parseCbrValue(valueNode.textContent);
		if (Number.isNaN(value)) return;

		points.push({ date: iso, value });
	});

	return points;
};

export const parseCbrDynamicXml = (xml: string): CbrRatePoint[] => {
	const trimmed = xml.replace(/^\uFEFF/, '').trim();
	if (!trimmed) {
		throw new Error('ЦБ РФ вернул пустой ответ');
	}

	let points = parseCbrDynamicXmlWithRegex(trimmed);

	if (points.length === 0) {
		points = parseCbrDynamicXmlWithDom(trimmed);
	}

	if (points.length === 0) {
		const hint = trimmed.startsWith('<') ? '' : ' (ожидался XML)';
		throw new Error(`Не удалось разобрать ответ ЦБ РФ${hint}`);
	}

	points.sort((a, b) => a.date.localeCompare(b.date));

	return points;
};

const toLocalIsoDate = (d: Date): string => {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${y}-${m}-${day}`;
};

const baselineAtOrBefore = (points: CbrRatePoint[], isoDate: string): number => {
	if (points.length === 0) return Number.NaN;
	return points.reduce((baseline, p) => (p.date <= isoDate ? p.value : baseline), points[0].value);
};

const percentChange = (from: number, to: number): number => {
	if (from === 0 || !Number.isFinite(from)) return 0;
	return ((to - from) / from) * 100;
};

export const computeRateStats = (points: CbrRatePoint[]): RateStats | null => {
	if (points.length === 0) return null;

	const last = points[points.length - 1];
	const current = last.value;
	const prev = points.length >= 2 ? points[points.length - 2].value : current;
	const changeDayAbs = current - prev;

	const lastDate = new Date(`${last.date}T12:00:00`);
	const weekAgo = new Date(lastDate);
	weekAgo.setDate(weekAgo.getDate() - 7);
	const monthAgo = new Date(lastDate);
	monthAgo.setDate(monthAgo.getDate() - 30);

	const weekBaseline = baselineAtOrBefore(points, toLocalIsoDate(weekAgo));
	const monthBaseline = baselineAtOrBefore(points, toLocalIsoDate(monthAgo));

	const changeWeekAbs = current - weekBaseline;
	const changeMonthAbs = current - monthBaseline;

	return {
		current,
		changeDayAbs,
		changeDayPercent: percentChange(prev, current),
		changeWeekAbs,
		changeWeekPercent: percentChange(weekBaseline, current),
		changeMonthAbs,
		changeMonthPercent: percentChange(monthBaseline, current),
	};
};

export const toAreaSeriesData = (points: CbrRatePoint[]): DataAreaType[] =>
	points.map((p) => ({ time: p.date, value: p.value }));
