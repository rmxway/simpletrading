import type { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

import { media } from '@/theme';

export const InfoBlockStyled = styled.div<PropsWithChildren>`
	display: flex;
	flex-direction: column;
	color: #fff;
	width: 100%;
	${({ theme }) => css`
		margin-bottom: calc(${theme.layout.marginX3} * 2);
	`}

	${media.greaterThan('xs')`
        width: 50%;
    `}

	${media.greaterThan('lg')`
        width: 25%;
    `}
`;

export const Title = styled.div<PropsWithChildren>`
	font-size: 1.5rem;
	line-height: 1;
	${({ theme }) => css`
		color: ${theme.colors.gray.$6};
		margin-bottom: ${theme.layout.marginX1};
	`}
`;

export const MainValue = styled.div<PropsWithChildren>`
	font-size: 2.2rem;
	line-height: 1.2;
	font-weight: 900;
	${({ theme }) => css`
		font-family: ${theme.fonts.bold};

		span {
			font-weight: 100;
			margin-left: ${theme.layout.marginX1};
		}
	`}
`;

export const AdditionalValue = styled.div<PropsWithChildren>`
	${({ theme }) => css`
		font-size: 1.75rem;
		font-family: ${theme.fonts.bold};
		color: ${theme.colors.gray.$4};

		span {
			margin-left: ${theme.layout.marginX1};
		}
	`}
`;

export const State = styled.div<PropsWithChildren<{ $plus?: boolean }>>`
	display: flex;
	align-items: center;
	font-size: 1.7rem;
	margin-top: 4px;
	${({ theme, $plus }) => css`
		font-family: ${theme.fonts.bold};
		color: ${$plus ? theme.colors.success : theme.colors.danger};

		.icofont {
			display: flex;
			align-items: center;
			justify-content: center;
			line-height: 0;
			font-size: 1.5rem;
			width: 25px;
			height: 25px;
			border-radius: 30px;
			margin: 4px 8px 4px 0;
			color: #222;

			${$plus &&
			css`
				transform: scale(1, -1);
			`}

			background-color: ${$plus ? theme.colors.success : theme.colors.danger};
		}
	`}
`;

export default InfoBlockStyled;
