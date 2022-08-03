// Types
import { IItem } from '../generalTypes';

export interface ICartItem extends IItem {
	cartId: string;
	quantity: number;
	type: string;
	typeIndex: number;
	size: string;
	sizeIndex: number;
	cartPrice: number;
}

export interface ICartState {
	items: ICartItem[];
}
