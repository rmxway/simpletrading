import Button, { type ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { type FC } from 'react';

type AppButtonProps = ButtonProps & {
	active?: boolean;
};

const ButtonRoot = styled(Button, {
	shouldForwardProp: (prop) => prop !== 'active',
})<Pick<AppButtonProps, 'active'>>(({ theme, active }) => ({
	borderRadius: theme.shape.borderRadius,
	padding: '11px 16px 10px',
	lineHeight: 1,
	...(active
		? {
				backgroundColor: theme.palette.primary.main,
				color: theme.palette.primary.contrastText,
				border: '1px solid transparent',
			}
		: {
				backgroundColor: 'transparent',
				color: theme.palette.text.secondary,
				border: `1px solid ${theme.palette.grey[600]}`,
			}),
}));

export const AppButton: FC<AppButtonProps> = ({ active, variant = 'contained', ...props }) => (
	<ButtonRoot active={active} variant={variant} disableElevation {...props} />
);
