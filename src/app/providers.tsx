'use client';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { type ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { muiTheme } from '@/shared/config/mui-theme';
import { defaultTheme } from '@/theme';
import { GlobalStyles } from '@/theme/styles/global';
import { Navbar } from '@/widgets/app-navbar';

import { QueryProvider } from './query-provider';

export const AppProviders = ({ children }: { children: ReactNode }) => (
	<MuiThemeProvider theme={muiTheme}>
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyles />
			<QueryProvider>
				<Navbar />
				{children}
			</QueryProvider>
		</ThemeProvider>
	</MuiThemeProvider>
);
