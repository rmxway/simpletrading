import { FC } from 'react';

import { CreateChart, InfoBlock, Table } from '@/components';
import { Container, Flexbox, LayerBlock } from '@/components/Layouts';

const MainPage: FC = () => (
	<Container>
		<h2>Текущее состояние</h2>
		<LayerBlock mt="true">
			<Flexbox>
				<InfoBlock
					title="Стоимость"
					mainValue={12093}
					mainCurrency="$"
					additionalValue={10000}
					additionalCurrency="$"
				/>
				<InfoBlock title="Суммарная прибыль" mainValue={3324.94} mainCurrency="$" state={28.22} />
				<InfoBlock title="Доходность" mainValue={46} mainCurrency="%" />
				<InfoBlock title="Изменение в день" mainValue={193.67} mainCurrency="$" state={1.67} statePlus />
			</Flexbox>
		</LayerBlock>

		<h2>Графики</h2>
		<LayerBlock mt="true">
			<CreateChart />
		</LayerBlock>

		<h2>Сделки</h2>
		<LayerBlock mt="true">
			<Table />
		</LayerBlock>
	</Container>
);

export { MainPage };
export default MainPage;
