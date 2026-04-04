export interface DataAreaType {
	time: string;
	value: number;
}

export interface ChartType {
	height?: string;
	width?: string;
	data: DataAreaType[];
}

export type ChartPeriod = '3m' | '1m' | '1w';
