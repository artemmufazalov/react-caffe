// Types
import { RootState } from '../../store';
import { SortProperty, SortOrder, FilterStateInterface } from './types';

export const selectActiveCategoryIndex = (state: RootState): number =>
	state.filter.activeCategoryIndex;

export const selectCategories = (state: RootState): string[] =>
	state.filter.categories;

export const selectSearchValue = (state: RootState): string =>
	state.filter.searchValue;

export const selectSortingProperties = (state: RootState): SortProperty[] =>
	state.filter.sortingProperties;

export const selectActiveSortingProperty = (state: RootState): SortProperty =>
	state.filter.activeSortingProperty;

export const selectSortOrder = (state: RootState): SortOrder =>
	state.filter.sortingOrder;

export const selectFilterValues = (state: RootState): FilterStateInterface => ({
	...state.filter,
});
