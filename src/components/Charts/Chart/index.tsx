import { createChart, IChartApi } from 'lightweight-charts';
import { FC, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components/macro';

import { defaultTheme } from '@/theme';

import { data, dataArea as area } from './candleStickData';
import { ChartType } from './types';

const ChartRoot = styled.div<{ $height: string; $width: string }>`
	${({ $height, $width }) => css`
		height: ${$height};
		width: ${$width};
	`}
`;

const CreateChart: FC<ChartType> = ({ height = '300px', width = '100%', ...props }) => {
	const ref = useRef<HTMLDivElement>(null);
	const chartRef = useRef<IChartApi | null>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return undefined;

		const { colors } = defaultTheme;

		const chart = createChart(el, {
			grid: { horzLines: { color: colors.gray.$7 }, vertLines: { color: colors.gray.$7 } },
			layout: { textColor: '#fff', background: { color: 'rgba(0,0,0,0)' } },
			localization: { locale: 'RU' },
		});
		chartRef.current = chart;

		const areaSeries = chart.addAreaSeries({
			lineColor: defaultTheme.colors.primary,
			topColor: defaultTheme.colors.primary,
			bottomColor: `rgba(254, 220, 0, 0)`,
			lineType: 2,
			lineWidth: 3,
		});
		areaSeries.setData(area);

		const candlestickSeries = chart.addCandlestickSeries({
			upColor: colors.success,
			downColor: colors.danger,
			borderVisible: false,
			wickUpColor: colors.success,
			wickDownColor: colors.danger,
		});
		candlestickSeries.setData(data);

		chart.timeScale().fitContent();

		const handleResize = () => {
			if (!el || !chartRef.current) return;
			chartRef.current.applyOptions({ width: el.clientWidth });
			chartRef.current.timeScale().scrollToRealTime();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			chart.remove();
			chartRef.current = null;
		};
	}, []);

	return <ChartRoot {...props} ref={ref} $height={height} $width={width} />;
};

export { CreateChart };
export default CreateChart;
