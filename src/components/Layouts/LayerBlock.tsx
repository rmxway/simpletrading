import { motion } from 'framer-motion';
import { lighten } from 'polished';
import styled from 'styled-components/macro';

interface LayerTypes {
	mt?: string;
}

const LayerBlock = styled(motion.div)<LayerTypes>`
	position: relative;
	padding: ${(props) => props.theme.layout.paddingX3};
	border-radius: ${(props) => props.theme.radius.borderRadius};
	margin-bottom: ${(props) => props.theme.layout.marginX2};
	color: ${(props) => props.theme.colors.gray.$4};
	background-color: ${(props) => lighten(0.03, props.theme.layout.bgColor)};
	box-shadow: ${(props) => props.theme.layout.shadow};

	${(props) => props.mt && `margin-top: ${props.theme.layout.marginX2};`}
`;

export { LayerBlock };
export default LayerBlock;
