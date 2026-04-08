import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
	position: relative;
	height: 75px;
	display: flex;
	align-items: center;
	margin-bottom: 2.5rem;
	${({ theme }) => css`
		background-color: ${theme.colors.gray.$8};
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

export const NavbarLogo = styled(Link)`
	${({ theme }) => css`
		font-family: ${theme.fonts.base};
		font-size: 3rem;
		font-weight: 900;
		color: #fff;
		display: flex;
		align-items: center;
		text-decoration: none;
		text-transform: uppercase;
		margin-right: 20px;

		span {
			position: relative;
			margin-left: 3px;
			font-size: 1.1rem;
			padding-top: 20px;
			line-height: 1.1;
			color: ${theme.colors.primary};

			&:before {
				position: absolute;
				content: '';
				top: 3px;
				left: 0;
				right: 0;
				height: 15px;
				border-radius: 2px;
				background-color: ${theme.colors.primary};
			}
		}
	`}
`;
