import { motion } from 'framer-motion';
import { lighten } from 'polished';
import styled, { css } from 'styled-components';

interface LayerTypes {
	$mt?: boolean;
	$busy?: boolean;
}

export const LayerBlock = styled(motion.div).attrs<LayerTypes>(({ $busy }) => ({
	'aria-busy': $busy === true,
}))<LayerTypes>`
	${({ theme, $mt, $busy }) => css`
		position: relative;
		padding: ${theme.layout.paddingX3};
		border-radius: ${theme.radius.borderRadius};
		margin-bottom: ${theme.layout.marginX2};
		color: ${theme.colors.gray.$4};
		background-color: ${lighten(0.03, theme.layout.bgColor)};
		box-shadow: ${theme.layout.shadow};
		transition: opacity 0.2s ease;
		opacity: ${$busy ? 0.3 : 1};
		pointer-events: ${$busy ? 'none' : 'auto'};
		${$mt &&
		css`
			margin-top: ${theme.layout.marginX2};
		`}
	`}
`;
