import '@/assets/fonts/icofont/icofont.css';

import type { Metadata } from 'next';

import { AppProviders } from './providers';
import { StyledComponentsRegistry } from './styled-registry';

export const metadata: Metadata = {
	title: 'Simple Trading',
	description: 'Simple Trading',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ru">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Sofia+Sans:wght@100;400;700&display=swap"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Play&family=Russo+One&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<StyledComponentsRegistry>
					<AppProviders>{children}</AppProviders>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
