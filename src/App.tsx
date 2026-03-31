import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components/macro';

import { About, MainPage } from '@/pages';
import { defaultTheme } from '@/theme';
import { GlobalStyles } from '@/theme/styles/global';

import { Navbar } from './components/ui';

const App = () => (
	<ThemeProvider theme={defaultTheme}>
		<BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
			<Navbar />
			<GlobalStyles />
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</BrowserRouter>
	</ThemeProvider>
);

export { App };
export default App;
