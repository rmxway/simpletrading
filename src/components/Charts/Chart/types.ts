export interface DataAreaType {
	time: string;
	value: number;
}

export interface ChartType {
	height?: string;
	width?: string;
	data: DataAreaType[];
}
