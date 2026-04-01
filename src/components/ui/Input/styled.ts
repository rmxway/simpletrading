import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

type InputWrapperProps = PropsWithChildren<ComponentPropsWithoutRef<'div'>>;

const InputWrapper = styled.div<InputWrapperProps>`
	${({ theme }) => css`
		label {
			display: block;
			margin-bottom: 5px;
			color: ${theme.colors.gray.$6};
			text-transform: uppercase;
			font-size: 10px;
		}

		input {
			padding: 11px 16px 10px;
			border-radius: ${theme.radius.borderRadius};
			border: 1px solid #aaa;
			background-color: #f9f9f9;

			&:active,
			&:focus {
				border-color: ${theme.colors.success};
				outline: none;
			}

			&:disabled {
				background-color: ${theme.colors.gray.$3};
				opacity: 0.8;
			}
		}
	`}
`;

export { InputWrapper };
export default InputWrapper;
