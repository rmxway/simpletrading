import styled from 'styled-components/macro';

interface FlexboxTypes {
	nowrap?: boolean;
	justify?: string;
	align?: string;
	direction?: string;
}

const Flexbox = styled.div<FlexboxTypes>`
	display: flex;
	flex-wrap: ${(props) => (props.nowrap ? 'nowrap' : 'wrap')};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	flex-direction: ${(props) => props.direction};
	flex-grow: 1;
`;

export { Flexbox };
export default Flexbox;
