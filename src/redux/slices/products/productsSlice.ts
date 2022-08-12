// Libs
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Types
import {
	IProductsState,
	TLoadingStatus,
	TRejectedApiCallPayload,
} from './types';
import { IItem } from '../generalTypes';
import { RootState } from '../../store';

// Asyncs
import { fetchProducts, fetchSingleProductById } from './asyncActions';

const initialState: IProductsState = {
	baseUrl: '/api/items',
	items: [],
	pagesCount: 0,
	productsLoadingStatus: 'idle',
	singleProduct: null,
	singleProductLoadingStatus: 'idle',
	itemsNeedUpdateStatus: false,
	itemsFetchedStatus: false,
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setItemsNeedUpdateStatus: (state, action: PayloadAction<boolean>) => {
			state.itemsNeedUpdateStatus = action.payload;
		},
		setItemsFetched: (state, action: PayloadAction<boolean>) => {
			state.itemsFetchedStatus = action.payload;
		},
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
		setSingleItem: (state, action: PayloadAction<IItem>) => {
			state.singleProduct = action.payload;
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
		builder.addCase(fetchSingleProductById.fulfilled, (state, action) => {
			state.singleProduct = action.payload;
			state.singleProductLoadingStatus = 'success';
		});
		builder.addCase(fetchSingleProductById.rejected, (state, action) => {
			if (
				(action.payload as TRejectedApiCallPayload).statusCode === 404
			) {
				state.singleProductLoadingStatus = 'not_found';
			} else {
				state.singleProductLoadingStatus = 'error';
			}
		});
		builder.addCase(HYDRATE, (state, action) => {
			const payload = (action as PayloadAction<RootState>).payload;

			if (payload.products.singleProduct !== null) {
				state.singleProduct = payload.products.singleProduct;
				state.singleProductLoadingStatus =
					payload.products.singleProductLoadingStatus;
				return;
			}

			if (
				payload.products.itemsNeedUpdateStatus ||
				(!state.itemsFetchedStatus && state.items.length < 1)
			) {
				state.items = payload.products.items;
				state.itemsFetchedStatus = true;
				state.pagesCount = payload.products.pagesCount;
			}
		});
	},
});

export const {
	setItemsNeedUpdateStatus,
	setItemsFetched,
	toggleProductsLoadingStatus,
	toggleSingleProductLoadingStatus,
	setPagesCount,
	setItems,
	setSingleItem,
} = productsSlice.actions;

export default productsSlice.reducer;
