import styled, { css } from 'styled-components/macro';

import { media } from '@/theme';

export const InfoBlockStyled = styled.div`
	display: flex;
	flex-direction: column;
	color: #fff;
	width: 100%;
	margin-bottom: calc(${(props) => props.theme.layout.marginX3} * 2);

	${media.greaterThan('xs')`
        width: 50%;
    `}

	${media.greaterThan('lg')`
        width: 25%;
    `}
`;

export const Title = styled.div`
	font-size: 1.5rem;
	line-height: 1;
	color: ${(props) => props.theme.colors.gray.$6};
	margin-bottom: ${(props) => props.theme.layout.marginX1};
`;

export const MainValue = styled.div`
	font-size: 2.2rem;
	line-height: 1.2;
	font-weight: 900;
	font-family: ${(props) => props.theme.fonts.bold};

	span {
		font-weight: 100;
		margin-left: ${(props) => props.theme.layout.marginX1};
	}
`;

export const AdditionalValue = styled.div`
	font-size: 1.75rem;
	font-family: ${(props) => props.theme.fonts.bold};
	color: ${(props) => props.theme.colors.gray.$4};

	span {
		margin-left: ${(props) => props.theme.layout.marginX1};
	}
`;

export const State = styled.div<{ plus?: boolean }>`
	display: flex;
	align-items: center;
	font-size: 1.7rem;
	margin-top: 4px;
	font-family: ${(props) => props.theme.fonts.bold};

	color: ${(props) => (props?.plus ? props.theme.colors.success : props.theme.colors.danger)};

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

		${(props) =>
			props?.plus &&
			css`
				transform: scale(1, -1);
			`}

		background-color: ${(props) => (props?.plus ? props.theme.colors.success : props.theme.colors.danger)};
	}
`;

export default InfoBlockStyled;
