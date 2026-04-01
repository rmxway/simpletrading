import { darken, desaturate } from 'polished';
import styled, { css, type DefaultTheme } from 'styled-components';

export type ButtonVariant = 'success' | 'danger' | 'primary' | 'white' | 'black';

type CommonProps = {
	$w100?: boolean;
	$inactive?: boolean;
	$margins?: boolean;
};

export type ButtonProps = CommonProps & {
	/** Цветовой вариант; без значения — нейтральная кнопка */
	$variant?: ButtonVariant;
};

const mixinButton = ($background = '#fff', $color = '#fff') => css`
	border-color: transparent;
	background-color: ${$background};
	color: ${$color};

	&:hover {
		background-color: ${darken(0.05, $background)};
	}

	&:active {
		background-color: ${darken(0.1, $background)};
	}

	&:disabled,
	&:disabled:hover {
		opacity: 0.45;
		background-color: ${desaturate(0.4, $background)};
		color: ${desaturate(0.6, $color)};
		cursor: default;
	}
`;

function variantMixin(theme: DefaultTheme, variant: ButtonVariant | undefined) {
	switch (variant) {
		case 'success':
			return mixinButton(theme.colors.success);
		case 'danger':
			return mixinButton(theme.colors.danger);
		case 'primary':
			return mixinButton(theme.colors.primary, '#6d410a');
		case 'white':
			return mixinButton('#fff', theme.colors.success);
		case 'black':
			return mixinButton(theme.colors.dark);
		default:
			return null;
	}
}

const ButtonUI = styled.button<ButtonProps>`
	${({ theme, $w100, $inactive, $margins, $variant }) => css`
		appearance: none;
		border: 1px solid #aaa;
		background: none;

		border-radius: ${theme.radius.borderRadius};

		padding: 11px 16px 10px;
		color: #777;
		font-size: 12px;
		font-weight: 800;
		text-transform: uppercase;

		${$margins &&
		css`
			margin-bottom: 10px;
			margin-right: 10px;
		`}

		cursor: pointer;
		line-height: 1;
		transition: 0.1s all;

		&:hover {
			background-color: #f9f9f9;
		}

		&:active {
			background-color: #f1f1f1;
		}

		&:disabled,
		&:disabled:hover {
			background-color: ${theme.colors.gray.$2};
			color: ${theme.colors.gray.$5};
			cursor: default;
		}

		${variantMixin(theme, $variant)}

		${$w100 &&
		css`
			width: 100%;
		`}
		${$inactive &&
		css`
			pointer-events: none;
		`}
	`}
`;

export { ButtonUI };
export default ButtonUI;
