export interface IData {
	id: string;
	imageUrl: string;
	productType: string;
	metaType: true;
	title: string;
	types: number[];
	sizes: string[];
	price: number[][];
	category: number;
	rating: number;
}

export interface IMeta extends Record<string, any> {
	products_types: string[][];
	universal_category: string;
	pizza_categories: string[];
	burger_categories: string[];
	shaverma_categories: string[];
	drink_categories: string[];
	pizza_types: string[];
	burger_types: string[];
	shaverma_types: string[];
	drink_types: string[];
}
