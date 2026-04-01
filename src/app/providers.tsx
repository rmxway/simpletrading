'use client';

import { type ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { Navbar } from '@/components/ui';
import { defaultTheme } from '@/theme';
import { GlobalStyles } from '@/theme/styles/global';

export const AppProviders = ({ children }: { children: ReactNode }) => (
	<ThemeProvider theme={defaultTheme}>
		<GlobalStyles />
		<Navbar />
		{children}
	</ThemeProvider>
);
