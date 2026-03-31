import React, { FC } from 'react';

import { InputWrapper } from './styled';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	name: string;
}

const InputUI: FC<InputProps> = ({ name, label, className, ...props }) => (
	<InputWrapper className={className}>
		{label && <label htmlFor={name}>{label}</label>}

		<input {...props} id={name} type="text" autoComplete="off" />
	</InputWrapper>
);

export { InputUI };
export default InputUI;
