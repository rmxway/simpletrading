'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import type { DataAreaType } from '@/entities/quote';
import { type CbrQuoteCurrency, fetchCbrQuoteDynamics } from '@/services/cbr-api';
import { computeRateStats, parseCbrDynamicXml, type RateStats, toAreaSeriesData } from '@/utils/parseXML';

export type { CbrQuoteCurrency } from '@/services/cbr-api';

type CurrencyDataPayload = {
	stats: RateStats | null;
	areaData: DataAreaType[];
};

export interface UseCurrencyDataResult {
	areaData: DataAreaType[];
	stats: RateStats | null;
	loading: boolean;
	isLayerBusy: boolean;
	error: string | null;
}

const currencyDataQueryKey = (quote: CbrQuoteCurrency) => ['cbr', quote, 'dynamics-3m'] as const;

export const useCurrencyData = (quote: CbrQuoteCurrency): UseCurrencyDataResult => {
	const lastSuccessRef = useRef<CurrencyDataPayload | null>(null);

	const { data, isPending, isFetching, error, isError, isPlaceholderData, isSuccess } = useQuery({
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

	useEffect(() => {
		if (isSuccess && data) {
			lastSuccessRef.current = data;
		}
	}, [isSuccess, data]);

	const resolved = data ?? (isError ? lastSuccessRef.current : null);
	const stats = resolved?.stats ?? null;
	const areaData = resolved?.areaData ?? [];

	const loading = isPending && !isPlaceholderData;
	const isLayerBusy = isFetching && Boolean(data);

	return {
		areaData,
		stats,
		loading,
		isLayerBusy,
		error: error instanceof Error ? error.message : isError ? 'Ошибка загрузки' : null,
	};
};
