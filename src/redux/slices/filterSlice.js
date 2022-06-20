import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
	selectedCategoryIndex: 0,
	selectedSortingProperty: {
		name: 'популярности',
		sortingProperty: 'rating',
	},
	sortingOrder: 'desc',
	searchValue: '',
	currentPage: 1,
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		selectCategory: (state, action) => {
			state.selectedCategoryIndex = action.payload;
		},
		setSearchValue: (state, action) => {
			state.searchValue = action.payload;
		},
		setSortingProperty: (state, action) => {
			state.selectedSortingProperty = action.payload;
		},
		toggleSortingOrder: (state) => {
			state.sortingOrder = state.sortingOrder === 'asc' ? 'desc' : 'asc';
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		setFilters: (state, action) => {
			if (action.payload.sort) {
				let sortingPropery = state.sortingProperties.find(
					(obj) => obj.sortingProperty === action.payload.sort
				);
				state.selectedSortingProperty = sortingPropery;
			}

			state.sortingOrder = action.payload.order || 'desc';
			state.searchValue = action.payload.search || '';
			state.currentPage = Number(action.payload.page) || 1;
			state.selectedCategoryIndex =
				Number(action.payload.categoryId) || 0;
		},
		dropFilters: (state) => {
			state.selectedSortingProperty = {
				name: 'популярности',
				sortingProperty: 'rating',
			};
			state.sortingOrder = 'desc';
			state.searchValue = '';
			state.currentPage = 1;
			state.selectedCategoryIndex = 0;
		},
	},
});

export const {
	selectCategory,
	setSearchValue,
	setSortingProperty,
	toggleSortingOrder,
	setCurrentPage,
	setFilters,
	dropFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
