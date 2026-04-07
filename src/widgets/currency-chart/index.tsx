'use client';

import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import { type DataAreaType } from '@/entities/quote';
import { AppButton } from '@/shared/ui/button';
import { defaultTheme } from '@/theme';

import { filterAreaDataByPeriod } from './lib/filter-area-data';
import type { ChartPeriod } from './model/chart-period';
import { CHART_MOUNT_CLASS, ChartRoot, ChartWrapper, PeriodRow, SkeletonRoot } from './styled';

const PERIOD_OPTIONS: { id: ChartPeriod; label: string }[] = [
	{ id: '3m', label: '3 месяца' },
	{ id: '1m', label: '1 месяц' },
	{ id: '1w', label: '1 неделя' },
];

type CreateChartProps = {
	height?: string;
	width?: string;
	data: DataAreaType[];
};

export const CreateChart: FC<CreateChartProps> = ({ height = '300px', width = '100%', data }) => {
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
					<AppButton key={id} type="button" active={period === id} onClick={() => setPeriod(id)}>
						{label}
					</AppButton>
				))}
			</PeriodRow>
			<ChartWrapper $height={height} $width={width}>
				<div ref={ref} className={CHART_MOUNT_CLASS} />
			</ChartWrapper>
		</ChartRoot>
	);
};

export interface ChartSkeletonProps {
	height?: string;
	className?: string;
}

export const ChartSkeleton: FC<ChartSkeletonProps> = ({ height = '300px', ...props }) => (
	<SkeletonRoot {...props} $height={height} role="status" aria-label="Загрузка графика" />
);
