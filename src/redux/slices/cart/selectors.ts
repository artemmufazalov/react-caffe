// Types
import { RootState } from '../../store';
import { CartPizzaInterface } from './types';

export const selectCartItems = (state: RootState): CartPizzaInterface[] =>
	state.cart.pizzas;

export const selectPizzaQuantityById =
	(id: string) =>
	(state: RootState): number => {
		if (state.cart.pizzas.length < 1) return 0;
		return state.cart.pizzas
			.filter((obj) => obj.id === id)
			.reduce((prev, curr) => prev + curr.quantity, 0);
	};

export const selectCartTotalItemsCost = (state: RootState): number =>
	state.cart.pizzas.reduce(
		(prev, curr) => prev + curr.quantity * curr.price,
		0
	);

export const selectCartTotalItemsCount = (state: RootState): number =>
	state.cart.pizzas.reduce((prev, curr) => prev + curr.quantity, 0);

export const selectDoughTypes = (state: RootState): string[] =>
	state.cart.doughTypes;
