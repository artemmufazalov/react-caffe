// Libs
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import { IProductsState, TLoadingStatus } from './types';
import { IItem } from '../generalTypes';

// Asyncs
import { fetchProducts, fetchSingleProductById } from './asyncActions';

const initialState: IProductsState = {
	baseUrl: '/api/items',
	items: [],
	pagesCount: 0,
	productsLoadingStatus: 'idle',
	singleProductLoadingStatus: 'idle',
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		toggleProductsLoadingStatus: (
			state,
			action: PayloadAction<TLoadingStatus>
		) => {
			state.productsLoadingStatus = action.payload;
		},
		toggleSingleProductLoadingStatus: (
			state,
			action: PayloadAction<TLoadingStatus>
		) => {
			state.singleProductLoadingStatus = action.payload;
		},
		setPagesCount: (state, action: PayloadAction<number>) => {
			state.pagesCount = action.payload;
		},
		setItems: (state, action: PayloadAction<IItem[]>) => {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.items = [];
			state.productsLoadingStatus = 'pending';
		});
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.items = action.payload;
			state.productsLoadingStatus = 'success';
		});
		builder.addCase(fetchProducts.rejected, (state) => {
			state.productsLoadingStatus = 'error';
			state.items = [];
		});
		builder.addCase(fetchSingleProductById.pending, (state) => {
			state.singleProductLoadingStatus = 'pending';
		});
		builder.addCase(fetchSingleProductById.fulfilled, (state) => {
			state.singleProductLoadingStatus = 'success';
		});
		builder.addCase(fetchSingleProductById.rejected, (state) => {
			state.singleProductLoadingStatus = 'error';
		});
	},
});

export const {
	toggleProductsLoadingStatus,
	toggleSingleProductLoadingStatus,
	setPagesCount,
	setItems,
} = productsSlice.actions;

export default productsSlice.reducer;
