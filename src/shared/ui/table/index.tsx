'use client';

import { FC } from 'react';

import { demoJSON } from '@/data/demoJSON';

import { TableCell, TableHeader, TableItem, TableStyled } from './styled';

const Table: FC = () => (
	<TableStyled>
		<TableHeader>
			<TableCell $width={350} $flexGrow>
				Актив
			</TableCell>
			<TableCell $width={100}>Операция</TableCell>
			<TableCell $width={100}>Заметка</TableCell>
			<TableCell $width={150}>Дата сделки</TableCell>
			<TableCell $width={100}>Количество</TableCell>
			<TableCell $width={150} $alignRight>
				Цена
			</TableCell>
		</TableHeader>

		{demoJSON.map(({ id, date, img, operation, title, count, notice, price }) => (
			<TableItem key={id}>
				<TableCell $width={350} $flexGrow>
					<img src={img} alt={title} />
					{title}
				</TableCell>
				<TableCell $width={100}>{operation}</TableCell>
				<TableCell $width={100}>{notice}</TableCell>
				<TableCell $width={150}>{date}</TableCell>
				<TableCell $width={100}>{count}</TableCell>
				<TableCell $width={150} $alignRight>
					{price}
				</TableCell>
			</TableItem>
		))}
	</TableStyled>
);

export { Table };
export default Table;
