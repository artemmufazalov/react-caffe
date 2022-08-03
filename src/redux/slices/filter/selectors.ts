// Types
import { RootState } from '../../store';
import { TSortProperty, TSortOrder, IFilterState } from './types';

export const selectActiveProductType = (state: RootState): number =>
	state.filter.activeProductType;

export const selectActiveProductCategory = (state: RootState): number =>
	state.filter.activeProductCategory;

export const selectSearchValue = (state: RootState): string =>
	state.filter.searchValue;

export const selectSortingProperties = (state: RootState): TSortProperty[] =>
	state.filter.sortingProperties;

export const selectActiveSortingProperty = (state: RootState): TSortProperty =>
	state.filter.activeSortingProperty;

export const selectSortOrder = (state: RootState): TSortOrder =>
	state.filter.sortingOrder;

export const selectFilterValues = (state: RootState): IFilterState => ({
	...state.filter,
});
