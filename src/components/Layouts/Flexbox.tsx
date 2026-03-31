import { CSSProperties } from 'react';
import styled, { css } from 'styled-components/macro';

interface FlexboxTypes {
	nowrap?: boolean;
	/**
	 * @default 'flex-start'
	 * @param 'flex-start' - start of the main axis
	 * @param 'flex-end' - end of the main axis
	 * @param 'center' - center of the main axis
	 * @param 'space-between' - space between items
	 * @param 'space-around' - space around items
	 * @param 'space-evenly' - space evenly between items
	 */
	justify?: CSSProperties['justifyContent'];
	/**
	 * @default 'flex-start'
	 * @param 'flex-start' - start of the cross axis
	 * @param 'flex-end' - end of the cross axis
	 * @param 'center' - center of the cross axis
	 * @param 'space-between' - space between items
	 * @param 'stretch' - stretch items to the same height
	 */
	align?: CSSProperties['alignItems'];
	/**
	 * @default 'row'
	 * @param 'row' - main axis is horizontal
	 * @param 'column' - main axis is vertical
	 * @param 'row-reverse' - main axis is horizontal, reverse order
	 * @param 'column-reverse' - main axis is vertical, reverse order
	 */
	direction?: CSSProperties['flexDirection'];
	/**
	 * @default 0
	 * @param number - gap in pixels between items
	 */
	gap?: number;
}

export const Flexbox = styled.div<FlexboxTypes>`
	${({ nowrap, justify, align, direction, gap }) => css`
		display: flex;
		flex-grow: 1;
		flex-wrap: ${nowrap ? 'nowrap' : 'wrap'};
		justify-content: ${justify || 'flex-start'};
		align-items: ${align || 'flex-start'};
		flex-direction: ${direction || 'row'};
		gap: ${gap || 0}px;
	`}
`;
