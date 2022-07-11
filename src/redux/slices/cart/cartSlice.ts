// Libs
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import { PizzaInterface } from '../generalTypes';
import { CartPizzaInterface, CartStateInterface } from './types';

const initialState: CartStateInterface = {
	doughTypes: ['Тонкое', 'Традиционное'],
	pizzas: JSON.parse(localStorage.getItem('cart') || '') || [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addPizza: (
			state,
			action: PayloadAction<{
				pizza: PizzaInterface;
				doughIndex: number;
				sizeIndex: number;
			}>
		) => {
			const newPizza = {
				...action.payload.pizza,
				doughIndex: action.payload.doughIndex,
				sizeIndex: action.payload.sizeIndex,
			};

			const pizzaInCart = state.pizzas.find(
				(obj) =>
					obj.id === newPizza.id &&
					obj.doughIndex === newPizza.doughIndex &&
					obj.sizeIndex === newPizza.sizeIndex
			);

			if (pizzaInCart) {
				pizzaInCart.quantity += 1;
			} else {
				let cartId =
					newPizza.id +
					'' +
					newPizza.sizeIndex +
					'' +
					newPizza.doughIndex;

				state.pizzas.push({
					...newPizza,
					cartId,
					quantity: 1,
					doughType: state.doughTypes[newPizza.doughIndex],
				});
			}

			state.pizzas.sort(
				(a, b) =>
					a.title.localeCompare(b.title) ||
					a.sizeIndex - b.sizeIndex ||
					a.doughIndex - b.doughIndex
			);
		},
		increasePizzaQuantity: (state, action: PayloadAction<string>) => {
			const pizza = state.pizzas.find(
				(obj) => obj.cartId === action.payload
			);
			pizza && pizza.quantity++;
		},
		decreasePizzaQuantity: (state, action: PayloadAction<string>) => {
			const pizza = state.pizzas.find(
				(obj) => obj.cartId === action.payload
			);
			if (pizza && pizza.quantity > 1) {
				pizza.quantity--;
			}
		},
		removePizzaFromCart: (state, action: PayloadAction<string>) => {
			state.pizzas = state.pizzas.filter(
				(p) => p.cartId !== action.payload
			);
		},
		clearCart: (state) => {
			state.pizzas = [];
		},
		setCartItems: (state, action: PayloadAction<CartPizzaInterface[]>) => {
			state.pizzas = action.payload;
		},
	},
});

export const {
	addPizza,
	increasePizzaQuantity,
	decreasePizzaQuantity,
	removePizzaFromCart,
	clearCart,
	setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
