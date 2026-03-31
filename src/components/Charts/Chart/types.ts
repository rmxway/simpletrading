export interface ChartType {
	height?: string;
	width?: string;
	data?: [];
}

export interface DataAreaType {
	time: string;
	value: number;
}

export interface DataCandlestickType {
	time: string;
	open: number;
	high: number;
	low: number;
	close: number;
}
