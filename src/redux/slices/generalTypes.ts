export interface ItemInterface {
	id: string;
	imageUrl: string;
	title: string;
	price: number;
	category: number;
	rating: number;
}

export interface PizzaInterface extends ItemInterface {
	types: number[];
	sizes: number[];
}
