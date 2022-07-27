// Libs
import qs from 'qs';

export type TSortParam = 'price' | 'rating' | 'title';

export type SortProperty = {
	name: string;
	sortingProperty: TSortParam;
};

export type SortOrder = 'desc' | 'asc';

export interface FilterStateInterface {
	categories: string[];
	sortingProperties: SortProperty[];
	activeSortingProperty: SortProperty;
	activeCategoryIndex: number;
	sortingOrder: SortOrder;
	searchValue: string;
	currentPage: number;
}

export interface FilterQueryInputParamsInterface extends qs.ParsedQs {
	sort?: string;
	order?: string;
	categoryId?: string;
	search?: string;
	page?: string;
}
