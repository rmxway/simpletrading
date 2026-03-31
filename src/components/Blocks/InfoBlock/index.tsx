import { FC } from 'react';

import { AdditionalValue, InfoBlockStyled, MainValue, State, Title } from './styled';

export interface InfoBlockTypes {
	title: string;
	infoTitle?: string;
	mainValue: number;
	mainCurrency: string;
	additionalValue?: number;
	additionalCurrency?: string;
	state?: number;
	statePlus?: boolean;
	stateInfo?: string;
}

const InfoBlock: FC<InfoBlockTypes> = ({
	title,
	mainValue,
	mainCurrency,
	additionalValue,
	additionalCurrency,
	state,
	statePlus,
	...props
}) => (
	<InfoBlockStyled {...props}>
		<Title>{title}</Title>
		<MainValue>
			{mainValue.toLocaleString('ru-RU')}
			<span>{mainCurrency}</span>
		</MainValue>
		{additionalValue ? (
			<AdditionalValue>
				{additionalValue.toLocaleString('ru-RU')}
				<span>{additionalCurrency}</span>
			</AdditionalValue>
		) : null}
		{state ? (
			<State plus={statePlus}>
				<i className="icofont icofont-arrow-down" /> {state} %
			</State>
		) : null}
	</InfoBlockStyled>
);

export { InfoBlock };
export default InfoBlock;
