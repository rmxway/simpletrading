import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { FC, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components/macro';

import { defaultTheme } from '@/theme';

import { ChartType } from './types';

const ChartRoot = styled.div<{ $height: string; $width: string }>`
	${({ $height, $width }) => css`
		height: ${$height};
		width: ${$width};
	`}
`;

export const CreateChart: FC<ChartType> = ({ height = '300px', width = '100%', data, ...props }) => {
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
		});
		chartRef.current = chart;

		const areaSeries = chart.addAreaSeries({
			lineColor: defaultTheme.colors.primary,
			topColor: defaultTheme.colors.primary,
			bottomColor: `rgba(254, 220, 0, 0)`,
			lineType: 2,
			lineWidth: 3,
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
		if (!seriesRef.current || data.length === 0) return;
		seriesRef.current.setData(data);
		chartRef.current?.timeScale().fitContent();
	}, [data]);

	return <ChartRoot {...props} ref={ref} $height={height} $width={width} />;
};

export { ChartSkeleton } from './ChartSkeleton';
