import { lighten } from 'polished';
import styled, { css } from 'styled-components';

export const Wrapper = styled.footer`
	flex-shrink: 0;
	padding: 1.25rem 0;
	${({ theme }) => css`
		background-color: ${lighten(0.03, theme.layout.bgColor)};
		box-shadow: ${theme.layout.shadow};
	`}
`;

export const Text = styled.p`
	margin: 0;
	text-indent: 0;
	text-align: center;
	font-size: 0.9rem;
	${({ theme }) => css`
		color: ${theme.colors.gray.$2};
		font-family: ${theme.fonts.base};
	`}
`;

export const Brand = styled.span`
	${({ theme }) => css`
		color: ${theme.colors.primary};
		font-weight: 700;
	`}
`;
