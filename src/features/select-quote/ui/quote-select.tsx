import { type FC } from 'react';

import type { CbrQuoteCurrency } from '@/hooks/useCurrencyData';
import { AppSelect } from '@/shared/ui';

import { QUOTE_OPTIONS } from '../model/options';

type QuoteSelectProps = {
	value: CbrQuoteCurrency;
	onChange: (value: CbrQuoteCurrency) => void;
};

export const QuoteSelect: FC<QuoteSelectProps> = ({ value, onChange }) => (
	<AppSelect
		name="actives"
		label="Выберите актив"
		options={QUOTE_OPTIONS}
		value={value}
		onChange={(next) => onChange(next as CbrQuoteCurrency)}
	/>
);
