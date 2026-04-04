'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { DataAreaType } from '@/components/Charts/Chart/types';
import { type CbrQuoteCurrency, fetchCbrQuoteDynamics } from '@/services/cbr-api';
import { computeRateStats, parseCbrDynamicXml, type RateStats, toAreaSeriesData } from '@/utils/parseXML';

export type { CbrQuoteCurrency } from '@/services/cbr-api';

export interface UseCurrencyDataResult {
	areaData: DataAreaType[];
	stats: RateStats | null;
	loading: boolean;
	error: string | null;
}

const currencyDataQueryKey = (quote: CbrQuoteCurrency) => ['cbr', quote, 'dynamics-3m'] as const;

export const useCurrencyData = (quote: CbrQuoteCurrency): UseCurrencyDataResult => {
	const { data, isPending, error, isError, isPlaceholderData } = useQuery({
		queryKey: currencyDataQueryKey(quote),
		queryFn: async () => {
			const to = new Date();
			const from = new Date(to);
			from.setMonth(from.getMonth() - 3);

			const xml = await fetchCbrQuoteDynamics(from, to, quote);
			const parsed = parseCbrDynamicXml(xml);
			return {
				stats: computeRateStats(parsed),
				areaData: toAreaSeriesData(parsed),
			};
		},
		placeholderData: keepPreviousData,
	});

	return {
		areaData: data?.areaData ?? [],
		stats: data?.stats ?? null,
		loading: isPending && !isPlaceholderData,
		error: error instanceof Error ? error.message : isError ? 'Ошибка загрузки' : null,
	};
};
