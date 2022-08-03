export interface IItem {
	id: string;
	imageUrl: string;
	productType: string;
	title: string;
	types: number[];
	sizes: string[];
	price: number[][];
	category: number;
	rating: number;
	isMetaType?: boolean;
	types_names?: string[];
}
