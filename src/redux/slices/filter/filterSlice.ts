// Libs
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import {
	FilterStateInterface,
	SortProperty,
	SortOrder,
	FilterQueryInputParamsInterface,
} from './types';

const initialState: FilterStateInterface = {
	categories: [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	],
	sortingProperties: [
		{ name: 'популярности', sortingProperty: 'rating' },
		{ name: 'цене', sortingProperty: 'price' },
		{ name: 'алфавиту', sortingProperty: 'title' },
	],
	activeSortingProperty: {
		name: 'популярности',
		sortingProperty: 'rating',
	},
	activeCategoryIndex: 0,
	sortingOrder: 'desc',
	searchValue: '',
	currentPage: 1,
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategory: (state, action: PayloadAction<number>) => {
			state.activeCategoryIndex = action.payload;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
		setSortingProperty: (state, action: PayloadAction<SortProperty>) => {
			state.activeSortingProperty = action.payload;
		},
		toggleSortingOrder: (state) => {
			state.sortingOrder = state.sortingOrder === 'asc' ? 'desc' : 'asc';
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setFilters: (
			state,
			action: PayloadAction<FilterQueryInputParamsInterface>
		) => {
			if (action.payload.sort) {
				let sortingPropery = state.sortingProperties.find(
					(obj) => obj.sortingProperty === action.payload.sort
				);
				if (sortingPropery) {
					state.activeSortingProperty = sortingPropery;
				}
			}

			state.sortingOrder = (action.payload.order as SortOrder) || 'desc';
			state.searchValue = action.payload.search || '';
			state.currentPage = Number(action.payload.page) || 1;
			state.activeCategoryIndex = Number(action.payload.categoryId) || 0;
		},
		dropFilters: (state) => {
			state.activeSortingProperty = {
				name: 'популярности',
				sortingProperty: 'rating',
			};
			state.sortingOrder = 'desc';
			state.searchValue = '';
			state.currentPage = 1;
			state.activeCategoryIndex = 0;
		},
	},
});

export const {
	setCategory,
	setSearchValue,
	setSortingProperty,
	toggleSortingOrder,
	setCurrentPage,
	setFilters,
	dropFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
