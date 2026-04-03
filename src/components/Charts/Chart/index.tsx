'use client';

import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import { defaultTheme } from '@/theme';

import { CHART_MOUNT_CLASS, ChartRoot, ChartWrapper, PeriodButton, PeriodRow } from './styled';
import type { ChartType, DataAreaType } from './types';

type ChartPeriod = '3m' | '1m' | '1w';

const PERIOD_OPTIONS: { id: ChartPeriod; label: string }[] = [
	{ id: '3m', label: '3 мес.' },
	{ id: '1m', label: '1 мес.' },
	{ id: '1w', label: '1 неделя' },
];

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

const filterAreaDataByPeriod = (data: DataAreaType[], period: ChartPeriod): DataAreaType[] => {
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

export const CreateChart: FC<ChartType> = ({ height = '300px', width = '100%', data }) => {
	const [period, setPeriod] = useState<ChartPeriod>('3m');
	const filteredData = useMemo(() => filterAreaDataByPeriod(data, period), [data, period]);

	const ref = useRef<HTMLDivElement>(null);
	const chartRef = useRef<IChartApi | null>(null);
	const seriesRef = useRef<ISeriesApi<'Area'> | null>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return undefined;

		const { colors } = defaultTheme;

		const chart = createChart(el, {
			grid: { horzLines: { color: colors.gray.$7 }, vertLines: { color: colors.gray.$7 } },
			layout: { textColor: '#fff', background: { color: 'rgba(0,0,0,0)' } },
			localization: { locale: 'RU' },
			width: el.clientWidth,
			handleScale: false,
			handleScroll: false,
		});
		chartRef.current = chart;

		const areaSeries = chart.addAreaSeries({
			lineColor: defaultTheme.colors.primary,
			topColor: defaultTheme.colors.primary,
			bottomColor: `rgba(254, 220, 0, 0)`,
			lineType: 1,
			lineWidth: 1,
		});
		seriesRef.current = areaSeries;

		const handleResize = () => {
			if (!el || !chartRef.current) return;
			chartRef.current.applyOptions({ width: el.clientWidth });
			chartRef.current.timeScale().fitContent();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			chart.remove();
			chartRef.current = null;
			seriesRef.current = null;
		};
	}, []);

	useEffect(() => {
		if (!seriesRef.current || filteredData.length === 0) return;
		seriesRef.current.setData(filteredData.map((p) => ({ time: p.time, value: p.value })));
		chartRef.current?.timeScale().fitContent();
	}, [filteredData]);

	return (
		<ChartRoot>
			<PeriodRow>
				{PERIOD_OPTIONS.map(({ id, label }) => (
					<PeriodButton key={id} type="button" $active={period === id} onClick={() => setPeriod(id)}>
						{label}
					</PeriodButton>
				))}
			</PeriodRow>
			<ChartWrapper $height={height} $width={width}>
				<div ref={ref} className={CHART_MOUNT_CLASS} />
			</ChartWrapper>
		</ChartRoot>
	);
};

export { ChartSkeleton } from './ChartSkeleton';
