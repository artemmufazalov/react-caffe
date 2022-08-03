// Libs
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import {
	IFilterState,
	TSortProperty,
	TSortOrder,
	IFilterQueryInputParams,
} from './types';

const initialState: IFilterState = {
	sortingProperties: [
		{ name: 'популярности', sortingProperty: 'rating' },
		{ name: 'цене', sortingProperty: 'price' },
		{ name: 'алфавиту', sortingProperty: 'title' },
	],
	activeSortingProperty: {
		name: 'популярности',
		sortingProperty: 'rating',
	},
	activeProductType: 0,
	activeProductCategory: 0,
	sortingOrder: 'desc',
	searchValue: '',
	currentPage: 1,
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setProductType: (state, action: PayloadAction<number>) => {
			state.activeProductType = action.payload;
			state.currentPage = 1;
			state.activeProductCategory = 0;
		},
		setCategory: (state, action: PayloadAction<number>) => {
			state.activeProductCategory = action.payload;
			state.currentPage = 1;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
			state.currentPage = 1;
		},
		setSortingProperty: (state, action: PayloadAction<TSortProperty>) => {
			state.activeSortingProperty = action.payload;
		},
		toggleSortingOrder: (state) => {
			state.sortingOrder = state.sortingOrder === 'asc' ? 'desc' : 'asc';
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setFilters: (state, action: PayloadAction<IFilterQueryInputParams>) => {
			if (!action.payload) {
				return;
			}

			if (action.payload.sort) {
				let sortingPropery = state.sortingProperties.find(
					(obj) => obj.sortingProperty === action.payload.sort
				);
				if (sortingPropery) {
					state.activeSortingProperty = sortingPropery;
				}
			}

			state.sortingOrder = (action.payload.order as TSortOrder) || 'desc';
			state.searchValue = action.payload.search || '';
			state.currentPage = Number(action.payload.page) || 1;
			state.activeProductType = Number(action.payload.productType) || 0;
			state.activeProductCategory =
				Number(action.payload.categoryId) || 0;
		},
		dropFilters: (state) => {
			state.activeSortingProperty = {
				name: 'популярности',
				sortingProperty: 'rating',
			};
			state.sortingOrder = 'desc';
			state.searchValue = '';
			state.currentPage = 1;
			state.activeProductType = 0;
			state.activeProductCategory = 0;
		},
	},
});

export const {
	setProductType,
	setCategory,
	setSearchValue,
	setSortingProperty,
	toggleSortingOrder,
	setCurrentPage,
	setFilters,
	dropFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
