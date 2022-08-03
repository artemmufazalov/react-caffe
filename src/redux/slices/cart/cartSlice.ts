// Libs
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import { IItem } from '../generalTypes';
import { ICartItem, ICartState } from './types';

const initialState: ICartState = {
	items: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (
			state,
			action: PayloadAction<{
				item: IItem;
				typeIndex: number;
				type: string;
				sizeIndex: number;
				size: string;
			}>
		) => {
			const cartPrice =
				action.payload.item.price[action.payload.typeIndex][
					action.payload.sizeIndex
				];

			const newItem = {
				...action.payload.item,
				typeIndex: action.payload.typeIndex,
				type: action.payload.type,
				sizeIndex: action.payload.sizeIndex,
				size: action.payload.size,
				cartPrice,
			};

			const itemInCart = state.items.find(
				(obj) =>
					obj.id === newItem.id &&
					obj.typeIndex === newItem.typeIndex &&
					obj.sizeIndex === newItem.sizeIndex
			);

			if (itemInCart) {
				itemInCart.quantity += 1;
			} else {
				let cartId =
					newItem.id +
					'' +
					newItem.sizeIndex +
					'' +
					newItem.typeIndex;

				state.items.push({
					...newItem,
					cartId,
					quantity: 1,
				});
			}

			state.items.sort(
				(a, b) =>
					a.title.localeCompare(b.title) ||
					a.sizeIndex - b.sizeIndex ||
					a.typeIndex - b.typeIndex
			);
		},
		increaseItemQuantity: (state, action: PayloadAction<string>) => {
			const item = state.items.find(
				(obj) => obj.cartId === action.payload
			);
			item && item.quantity++;
		},
		decreaseItemQuantity: (state, action: PayloadAction<string>) => {
			const item = state.items.find(
				(obj) => obj.cartId === action.payload
			);
			if (item && item.quantity > 1) {
				item.quantity--;
			}
		},
		removeItemFromCart: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter(
				(i) => i.cartId !== action.payload
			);
		},
		clearCart: (state) => {
			state.items = [];
		},
		setCartItems: (state, action: PayloadAction<ICartItem[]>) => {
			state.items = action.payload;
		},
	},
});

export const {
	addItem,
	increaseItemQuantity,
	decreaseItemQuantity,
	removeItemFromCart,
	clearCart,
	setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
