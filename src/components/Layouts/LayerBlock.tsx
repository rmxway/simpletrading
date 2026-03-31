import { motion } from 'framer-motion';
import { lighten } from 'polished';
import styled, { css } from 'styled-components/macro';

interface LayerTypes {
	mt?: string;
}

export const LayerBlock = styled(motion.div)<LayerTypes>`
	${({ theme, mt }) => css`
		position: relative;
		padding: ${theme.layout.paddingX3};
		border-radius: ${theme.radius.borderRadius};
		margin-bottom: ${theme.layout.marginX2};
		color: ${theme.colors.gray.$4};
		background-color: ${lighten(0.03, theme.layout.bgColor)};
		box-shadow: ${theme.layout.shadow};
		${mt &&
		css`
			margin-top: ${theme.layout.marginX2};
		`}
	`}
`;
