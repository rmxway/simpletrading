import { rgba } from 'polished';
import { css } from 'styled-components/macro';

export const rightHideGradient = (bg = '#ffffff') => css`
	position: relative;

	&::after {
		content: '';
		position: absolute;
		right: 0;
		bottom: 0;
		width: 35%;
		height: 1rem;

		background: linear-gradient(to right, ${rgba(bg, 0)} 0%, ${bg} 100%);
	}
`;

export default rightHideGradient;
