'use client';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { QUOTE_OPTIONS, QuoteSelect } from '@/features/select-quote';
import { type CbrQuoteCurrency, useCurrencyData } from '@/hooks/useCurrencyData';
import { absPercent, round2 } from '@/services/utils';
import { InfoBlock } from '@/shared/ui/info-block';
import { Container, Flexbox, LayerBlock, StatusMessage } from '@/shared/ui/layouts';
import { ChartSkeleton, CreateChart } from '@/widgets/currency-chart';

const QuoteSelectWrapper = styled.div`
	position: relative;
	width: 200px;
`;

export const HomePage = () => {
	const [quote, setQuote] = useState<CbrQuoteCurrency>('USD');
	const { areaData, stats, loading, isLayerBusy, error } = useCurrencyData(quote);
	const [snackbarDismissed, setSnackbarDismissed] = useState(false);

	useEffect(() => {
		if (error) {
			setSnackbarDismissed(false);
		}
	}, [error]);

	const quoteLabel = QUOTE_OPTIONS.find((option) => option.value === quote)?.label ?? quote;
	const showSnackbar = Boolean(error) && !snackbarDismissed;

	return (
		<Container>
			<h2>Курс {quoteLabel} (ЦБ РФ)</h2>
			<QuoteSelectWrapper>
				<QuoteSelect value={quote} onChange={setQuote} />
			</QuoteSelectWrapper>

			<LayerBlock $mt $busy={isLayerBusy}>
				{loading ? <StatusMessage>Загрузка курса...</StatusMessage> : null}
				{!loading && stats ? (
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
			<LayerBlock $mt $busy={isLayerBusy}>
				{loading ? <ChartSkeleton /> : null}
				{!loading && areaData.length > 0 ? <CreateChart data={areaData} /> : null}
				{!loading && areaData.length === 0 && !error ? (
					<StatusMessage>Нет данных для графика</StatusMessage>
				) : null}
			</LayerBlock>

			<Snackbar
				open={showSnackbar}
				autoHideDuration={8000}
				onClose={() => setSnackbarDismissed(true)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert severity="error" variant="filled" onClose={() => setSnackbarDismissed(true)}>
					{error}
				</Alert>
			</Snackbar>
		</Container>
	);
};
