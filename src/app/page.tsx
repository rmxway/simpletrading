'use client';

import { useState } from 'react';

import { ChartSkeleton, CreateChart, InfoBlock } from '@/components';
import { Container, Flexbox, LayerBlock, StatusMessage } from '@/components/Layouts';
import { SelectOption, SelectUI } from '@/components/ui';
import { type CbrQuoteCurrency, useCurrencyData } from '@/hooks/useCurrencyData';
import { absPercent, round2 } from '@/services/utils';

const QUOTE_OPTIONS: SelectOption[] = [
	{ value: 'USD', label: 'USD / RUB' },
	{ value: 'EUR', label: 'EU / RUB' },
	{ value: 'CNY', label: 'CNY / RUB' },
];

export default function Page() {
	const [quote, setQuote] = useState<CbrQuoteCurrency>('USD');
	const { areaData, stats, loading, error } = useCurrencyData(quote);
	const quoteLabel = QUOTE_OPTIONS.find((o) => o.value === quote)?.label ?? quote;

	return (
		<Container>
			<h2>Курс {quoteLabel} (ЦБ РФ)</h2>
			<div style={{ width: '200px' }}>
				<SelectUI
					name="actives"
					label="Выберите актив"
					options={QUOTE_OPTIONS}
					value={quote}
					onChange={(v) => setQuote(v as CbrQuoteCurrency)}
				/>
			</div>

			<LayerBlock $mt>
				{loading ? <StatusMessage>Загрузка курса…</StatusMessage> : null}
				{!loading && error ? <StatusMessage>{error}</StatusMessage> : null}
				{!loading && !error && stats ? (
					<Flexbox>
						<InfoBlock
							title="Текущий курс"
							mainValue={round2(stats.current)}
							mainCurrency={`₽ за 1 ${quote}`}
						/>
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

			<h2>Динамика курса</h2>
			<LayerBlock $mt>
				{loading ? <ChartSkeleton /> : null}
				{!loading && !error && areaData.length > 0 ? <CreateChart data={areaData} /> : null}
				{!loading && !error && areaData.length === 0 ? (
					<StatusMessage>Нет данных для графика</StatusMessage>
				) : null}
			</LayerBlock>
		</Container>
	);
}
