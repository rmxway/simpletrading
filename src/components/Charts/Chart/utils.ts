import { ChartPeriod, DataAreaType } from './types';

const toLocalIsoDate = (d: Date): string => {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${y}-${m}-${day}`;
};

/** lightweight-charts после setData может заменить time на BusinessDay — не мутируем исходный массив из пропсов. */
const normalizeAreaTime = (t: unknown): string => {
	if (typeof t === 'string' && t.length > 0) return t;
	if (typeof t === 'number' && Number.isFinite(t)) {
		return toLocalIsoDate(new Date(t * 1000));
	}
	if (t && typeof t === 'object') {
		const o = t as { year?: number; month?: number; day?: number };
		if (typeof o.year === 'number' && typeof o.month === 'number' && typeof o.day === 'number') {
			const m = String(o.month).padStart(2, '0');
			const d = String(o.day).padStart(2, '0');
			return `${o.year}-${m}-${d}`;
		}
	}
	return '';
};

export const filterAreaDataByPeriod = (data: DataAreaType[], period: ChartPeriod): DataAreaType[] => {
	if (!data?.length) return [];

	const safe: DataAreaType[] = data
		.map((p) => ({
			time: normalizeAreaTime(p.time),
			value: p.value,
		}))
		.filter((p) => p.time.length > 0);

	if (safe.length === 0) return [];

	const sorted = [...safe].sort((a, b) => a.time.localeCompare(b.time));
	if (period === '3m') return sorted;

	const lastIso = sorted[sorted.length - 1]!.time;
	const lastDate = new Date(`${lastIso}T12:00:00`);
	const cutoff = new Date(lastDate);
	if (period === '1m') cutoff.setDate(cutoff.getDate() - 30);
	else cutoff.setDate(cutoff.getDate() - 7);

	const cutoffIso = toLocalIsoDate(cutoff);
	return sorted.filter((p) => p.time >= cutoffIso);
};
