import styled, { css } from 'styled-components';

export const StatusMessage = styled.p`
	${({ theme }) => css`
		color: ${theme.colors.gray.$4};
	`}
	margin: 0;
`;
