'use client';

import { FC } from 'react';
import styled, { css } from 'styled-components';

import { ChartSkeleton, CreateChart, InfoBlock } from '@/components';
import { Container, Flexbox, LayerBlock } from '@/components/Layouts';
import { useCurrencyData } from '@/hooks/useCurrencyData';

const StatusMessage = styled.p`
	${({ theme }) => css`
		color: ${theme.colors.gray.$4};
	`}
	margin: 0;
`;

const round2 = (value: number): number => Math.round(value * 100) / 100;

const absPercent = (value: number): number => round2(Math.abs(value));

export const HomePage: FC = () => {
	const { areaData, stats, loading, error } = useCurrencyData();

	return (
		<Container>
			<h2>Курс USD/RUB (ЦБ РФ)</h2>
			<LayerBlock $mt>
				{loading ? <StatusMessage>Загрузка курса…</StatusMessage> : null}
				{!loading && error ? <StatusMessage>{error}</StatusMessage> : null}
				{!loading && !error && stats ? (
					<Flexbox>
						<InfoBlock title="Текущий курс" mainValue={round2(stats.current)} mainCurrency="₽ за $1" />
						<InfoBlock
							title="Изменение за день"
							mainValue={round2(stats.changeDayAbs)}
							mainCurrency="₽"
							state={absPercent(stats.changeDayPercent)}
							statePlus={stats.changeDayAbs >= 0}
						/>
						<InfoBlock
							title="Изменение за неделю"
							mainValue={round2(stats.changeWeekAbs)}
							mainCurrency="₽"
							state={absPercent(stats.changeWeekPercent)}
							statePlus={stats.changeWeekAbs >= 0}
						/>
						<InfoBlock
							title="Изменение за месяц"
							mainValue={round2(stats.changeMonthAbs)}
							mainCurrency="₽"
							state={absPercent(stats.changeMonthPercent)}
							statePlus={stats.changeMonthAbs >= 0}
						/>
					</Flexbox>
				) : null}
			</LayerBlock>

			<h2>Динамика за 3 месяца</h2>
			<LayerBlock $mt>
				{loading ? <ChartSkeleton /> : null}
				{!loading && !error && areaData.length > 0 ? <CreateChart data={areaData} /> : null}
				{!loading && !error && areaData.length === 0 ? (
					<StatusMessage>Нет данных для графика</StatusMessage>
				) : null}
			</LayerBlock>

			{/* <h2>Сделки</h2>
			<LayerBlock $mt>
				<Table />
			</LayerBlock> */}
		</Container>
	);
};
