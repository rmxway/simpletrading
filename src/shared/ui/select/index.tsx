import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect, { type SelectChangeEvent } from '@mui/material/Select';
import { type FC } from 'react';

export type SelectOption = {
	value: string;
	label: string;
};

export type AppSelectProps = {
	name: string;
	options: SelectOption[];
	value: string;
	onChange: (value: string) => void;
	label?: string;
	disabled?: boolean;
};

export const AppSelect: FC<AppSelectProps> = ({ name, options, value, onChange, label, disabled }) => {
	const labelId = `${name}-label`;

	const handleChange = (event: SelectChangeEvent<string>) => {
		onChange(event.target.value);
	};

	return (
		<FormControl fullWidth size="small" disabled={disabled}>
			{label ? <InputLabel id={labelId}>{label}</InputLabel> : null}
			<MuiSelect<string>
				labelId={label ? labelId : undefined}
				value={value}
				label={label}
				MenuProps={{ disableScrollLock: true }}
				onChange={handleChange}
			>
				{options.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</MuiSelect>
		</FormControl>
	);
};
