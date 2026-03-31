import { useEffect, useState } from 'react';

import type { DataAreaType } from '@/components/Charts/Chart/types';
import { fetchCbrUsdRubDynamics } from '@/services/cbr-api';
import { computeRateStats, parseCbrDynamicXml, type RateStats, toAreaSeriesData } from '@/utils/parseXML';

export interface UseCurrencyDataResult {
	areaData: DataAreaType[];
	stats: RateStats | null;
	loading: boolean;
	error: string | null;
}

export const useCurrencyData = (): UseCurrencyDataResult => {
	const [areaData, setAreaData] = useState<DataAreaType[]>([]);
	const [stats, setStats] = useState<RateStats | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;

		const load = async () => {
			try {
				setLoading(true);
				setError(null);

				const to = new Date();
				const from = new Date(to);
				from.setMonth(from.getMonth() - 3);

				const xml = await fetchCbrUsdRubDynamics(from, to);
				if (cancelled) return;

				const parsed = parseCbrDynamicXml(xml);
				const nextStats = computeRateStats(parsed);

				setStats(nextStats);
				setAreaData(toAreaSeriesData(parsed));
			} catch (e) {
				if (cancelled) return;
				setError(e instanceof Error ? e.message : 'Ошибка загрузки');
				setStats(null);
				setAreaData([]);
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		load().catch(() => {
			// ошибка уже обработана внутри load
		});

		return () => {
			cancelled = true;
		};
	}, []);

	return { areaData, stats, loading, error };
};
