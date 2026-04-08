import Link from 'next/link';
import { darken, lighten } from 'polished';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
	position: relative;
	height: 75px;
	display: flex;
	align-items: center;
	margin-bottom: 2.5rem;
	${({ theme }) => css`
		background-color: ${lighten(0.03, theme.layout.bgColor)};
		box-shadow: ${theme.layout.shadow};
	`}
	z-index: 100;
`;

export const NavbarLink = styled(Link)<{ $active?: boolean }>`
	position: relative;
	text-decoration: none;
	margin-left: 30px;
	font-size: 1.2rem;
	color: #fff;

	${({ $active, theme }) =>
		$active &&
		css`
			color: ${theme.colors.primary};

			&:before {
				position: absolute;
			}
		`}
`;

export const LogoMark = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 0.2em 0.42em;
	line-height: 1;
	letter-spacing: -0.04em;
	text-transform: uppercase;
	font-weight: 900;
	font-size: 1.65rem;
	transition:
		filter 0.2s ease,
		transform 0.2s ease;
	${({ theme }) => css`
		font-family: ${theme.fonts.bold};
		color: ${theme.colors.dark};
		border-radius: ${theme.radius.borderRadius};
		background: linear-gradient(
			145deg,
			${lighten(0.14, theme.colors.primary)} 0%,
			${theme.colors.primary} 42%,
			${darken(0.2, theme.colors.primary)} 100%
		);
		box-shadow:
			0 1px 0 rgba(255, 255, 255, 0.35) inset,
			0 2px 10px rgba(0, 0, 0, 0.28);
	`}
`;

export const LogoTitle = styled.span`
	display: block;
	font-size: 0.95rem;
	font-weight: 600;
	line-height: 1.2;
	letter-spacing: 0.04em;
	text-transform: none;
	color: rgba(255, 255, 255, 0.92);
	${({ theme }) => css`
		font-family: ${theme.fonts.base};

		strong {
			font-weight: 700;
			background: linear-gradient(
				90deg,
				#ffffff 0%,
				${theme.colors.primary} 70%,
				${theme.colors.primary} 100%
			);
			-webkit-background-clip: text;
			background-clip: text;
			-webkit-text-fill-color: transparent;
			color: ${theme.colors.primary};
		}
	`}
`;

export const NavbarLogo = styled(Link)`
	display: inline-flex;
	align-items: center;
	gap: 0.65rem;
	margin-right: 20px;
	text-decoration: none;
	${({ theme }) => css`
		font-family: ${theme.fonts.base};
	`}

	&:hover ${LogoMark} {
		filter: brightness(1.06);
		transform: translateY(-1px);
	}
`;
