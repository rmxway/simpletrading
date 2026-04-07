import { createTheme } from '@mui/material/styles';

import { defaultTheme } from '@/theme';

export const muiTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: { main: defaultTheme.colors.primary, contrastText: '#6d410a' },
		success: { main: defaultTheme.colors.success },
		error: { main: defaultTheme.colors.danger },
		background: {
			default: defaultTheme.layout.bgColor,
			paper: defaultTheme.colors.gray.$9,
		},
		text: {
			primary: '#ffffff',
			secondary: defaultTheme.colors.gray.$4,
		},
	},
	shape: {
		borderRadius: Number.parseInt(defaultTheme.radius.borderRadius, 10) || 8,
	},
	typography: {
		fontFamily: defaultTheme.fonts.base,
		button: {
			fontWeight: 800,
			textTransform: 'uppercase',
			fontSize: 12,
		},
	},
});
