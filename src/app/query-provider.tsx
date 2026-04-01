'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useEffect, useState } from 'react';

const STALE_MS = 10 * 60 * 1000;
const GC_MS = 15 * 60 * 1000;

/** Экземпляр из QueryProvider; между маунтом и useEffect — undefined. */
export let queryClient: QueryClient | undefined;

export const QueryProvider = ({ children }: { children: ReactNode }) => {
	const [client] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: STALE_MS,
						gcTime: GC_MS,
					},
				},
			}),
	);

	useEffect(() => {
		queryClient = client;
		return () => {
			queryClient = undefined;
		};
	}, [client]);

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
