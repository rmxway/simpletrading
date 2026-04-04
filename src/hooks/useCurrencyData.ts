'use client';

import { useQuery } from '@tanstack/react-query';

import type { DataAreaType } from '@/components/Charts/Chart/types';
import { fetchCbrUsdRubDynamics } from '@/services/cbr-api';
import { computeRateStats, parseCbrDynamicXml, type RateStats, toAreaSeriesData } from '@/utils/parseXML';

export interface UseCurrencyDataResult {
	areaData: DataAreaType[];
	stats: RateStats | null;
	loading: boolean;
	error: string | null;
}

const currencyDataQueryKey = ['cbr', 'usd-rub', 'dynamics-3m'] as const;

export const useCurrencyData = (): UseCurrencyDataResult => {
	const query = useQuery({
		queryKey: currencyDataQueryKey,
		queryFn: async () => {
			const to = new Date();
			const from = new Date(to);
			from.setMonth(from.getMonth() - 3);

			const xml = await fetchCbrUsdRubDynamics(from, to);
			const parsed = parseCbrDynamicXml(xml);
			return {
				stats: computeRateStats(parsed),
				areaData: toAreaSeriesData(parsed),
			};
		},
	});

	return {
		areaData: query.data?.areaData ?? [],
		stats: query.data?.stats ?? null,
		loading: query.isPending,
		error: query.error instanceof Error ? query.error.message : query.isError ? 'Ошибка загрузки' : null,
	};
};
