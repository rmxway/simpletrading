import styled, { css } from 'styled-components/macro';

import { media } from '@/theme';

const Container = styled.div<{ mt?: boolean }>`
	position: relative;
	padding: ${(props) => `0 ${props.theme.layout.paddingX2}`};
	width: 100%;
	max-width: 100%;
	margin: 0 auto;

	${(props) =>
		props.mt &&
		css`
			margin-top: ${props.theme.layout.marginX2};
		`}

	${media.greaterThan('sm')`
		max-width: 768px;
	`}

	${media.greaterThan('md')`
		max-width: 1024px;
        padding: ${(props) => `0 ${props.theme.layout.paddingX3}`};
	`}

	${media.greaterThan('lg')`
		max-width: 1280px;
	`}
`;

export { Container };
export default Container;
