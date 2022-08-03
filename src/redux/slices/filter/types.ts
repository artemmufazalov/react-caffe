// Libs
import qs from 'qs';

export type TSortParam = 'price' | 'rating' | 'title';

export type TSortProperty = {
	name: string;
	sortingProperty: TSortParam;
};

export type TSortOrder = 'desc' | 'asc';

export interface IFilterState {
	sortingProperties: TSortProperty[];
	activeSortingProperty: TSortProperty;
	activeProductType: number;
	activeProductCategory: number;
	sortingOrder: TSortOrder;
	searchValue: string;
	currentPage: number;
}

export interface IFilterQueryInputParams extends qs.ParsedQs {
	sort?: string;
	order?: string;
	categoryId?: string;
	search?: string;
	page?: string;
}
