import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	doughTypes: ['Тонкое', 'Традиционное'],
	pizzas: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addPizza: (state, action) => {
			const newPizza = action.payload;

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
		increasePizzaQuantity: (state, action) => {
			const pizza = state.pizzas.find(
				(obj) => obj.cartId === action.payload
			);
			pizza.quantity++;
		},
		decreasePizzaQuantity: (state, action) => {
			const pizza = state.pizzas.find(
				(obj) => obj.cartId === action.payload
			);
			if (pizza.quantity > 1) {
				pizza.quantity--;
			}
		},
		removePizzaFromCart: (state, action) => {
			state.pizzas = state.pizzas.filter(
				(p) => p.cartId !== action.payload
			);
		},
		clearCart: (state) => {
			state.pizzas = [];
		},
	},
});

export const selectCartItems = (state) => state.cart.pizzas;

export const selectPizzaQuantityById = (id) => (state) => {
	if (state.cart.pizzas.length < 1) return 0;
	return state.cart.pizzas
		.filter((obj) => obj.id === id)
		.reduce((prev, curr) => prev + curr.quantity, 0);
};

export const selectCartTotalItemsCost = (state) =>
	state.cart.pizzas.reduce(
		(prev, curr) => prev + curr.quantity * curr.price,
		0
	);

export const selectCartTotalItemsCount = (state) =>
	state.cart.pizzas.reduce((prev, curr) => prev + curr.quantity, 0);

export const selectDoughTypes = (state) => state.cart.doughTypes;

export const {
	addPizza,
	increasePizzaQuantity,
	decreasePizzaQuantity,
	removePizzaFromCart,
	clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
