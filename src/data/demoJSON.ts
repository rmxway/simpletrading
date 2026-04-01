interface TableItemTypes {
	id: number;
	img: string;
	title: string;
	link: string;
	operation: 'Покупка' | 'Продажа' | 'Дивиденд';
	notice?: boolean;
	date: string;
	count?: number;
	price?: string;
}

export const demoJSON: TableItemTypes[] = [
	{
		id: 1,
		img: 'https://picsum.photos/seed/alibaba/48/48',
		title: 'Alibaba',
		link: 'http://alibaba.com',
		date: '22.03.2023',
		count: 12,
		operation: 'Покупка',
		price: '12344',
	},
	{
		id: 2,
		img: 'https://picsum.photos/seed/apple/48/48',
		title: 'Apple',
		link: 'http://apple.com',
		date: '21.03.2023',
		count: 4,
		operation: 'Продажа',
		price: '33435',
	},
	{
		id: 3,
		img: 'https://picsum.photos/seed/msft/48/48',
		title: 'Microsoft',
		link: 'http://microsoft.com',
		date: '12.02.2023',
		operation: 'Дивиденд',
		price: '67804',
	},
	{
		id: 4,
		img: 'https://picsum.photos/seed/uhg/48/48',
		title: 'United Health Group',
		link: 'http://uhg.com',
		date: '22.03.2023',
		operation: 'Продажа',
		price: '234234',
	},
];

export default demoJSON;
