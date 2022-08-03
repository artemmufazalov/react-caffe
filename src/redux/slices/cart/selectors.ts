// Types
import { RootState } from '../../store';
import { ICartItem } from './types';

export const selectCartItems = (state: RootState): ICartItem[] =>
	state.cart.items;

export const selectItemQuantityById =
	(id: string) =>
	(state: RootState): number => {
		if (state.cart.items.length < 1) return 0;
		return state.cart.items
			.filter((obj) => obj.id === id)
			.reduce((prev, curr) => prev + curr.quantity, 0);
	};

export const selectCartTotalItemsCost = (state: RootState): number =>
	state.cart.items.reduce(
		(prev, curr) => prev + curr.quantity * curr.cartPrice,
		0
	);

export const selectCartTotalItemsCount = (state: RootState): number =>
	state.cart.items.reduce((prev, curr) => prev + curr.quantity, 0);
