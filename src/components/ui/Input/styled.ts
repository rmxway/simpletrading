import styled from 'styled-components/macro';

const InputWrapper = styled.div`
	label {
		display: block;
		margin-bottom: 5px;
		color: ${(props) => props.theme.colors.gray.$6};
		text-transform: uppercase;
		font-size: 10px;
	}

	input {
		padding: 11px 16px 10px;
		border-radius: ${(props) => props.theme.radius.borderRadius};
		border: 1px solid #aaa;
		background-color: #f9f9f9;

		&:active,
		&:focus {
			border-color: ${(props) => props.theme.colors.success};
			outline: none;
		}

		&:disabled {
			background-color: ${(props) => props.theme.colors.gray.$3};
			opacity: 0.8;
		}
	}
`;

export { InputWrapper };
export default InputWrapper;
