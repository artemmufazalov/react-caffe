// Types
import { SortOrder, TSortParam } from '../../redux/slices/filter/types';

// Data
import data from '../data/data.json';

const getItems = (
	page: number | undefined = 1,
	quantity: number | undefined = 4,
	category: number | undefined = 0,
	sortParam: TSortParam | undefined = 'rating',
	sortOrder: SortOrder | undefined = 'desc',
	searchValue: string | undefined = ''
) => {
	let items = data;

	searchValue = searchValue.toLowerCase();

	let filteredByCategory = category
		? items.filter((i) => i.category === category)
		: items;

	let filteredBySearchValue = searchValue
		? filteredByCategory.filter((i) =>
				i.title.toLowerCase().includes(searchValue)
		  )
		: filteredByCategory;

	let orderParam = sortOrder === 'desc' ? -1 : 1,
		results;

	if (sortParam === 'title') {
		results = filteredBySearchValue.sort(
			(a, b) => a[sortParam].localeCompare(b[sortParam]) * orderParam
		);
	} else {
		results = filteredBySearchValue.sort(
			(a, b) => (a[sortParam] - b[sortParam]) * orderParam
		);
	}

	let q = results.length,
		pagesCount = Math.ceil(q / quantity);

	if (q === 0) {
		throw Error('No items was found');
	}

	if (pagesCount < page) {
		throw Error('Requested page exeeds total pages count');
	}

	if (q <= quantity) {
		return { results, pagesCount: 1 };
	}

	return {
		results: results.slice(quantity * (page - 1), quantity * page),
		pageCount: Math.ceil(q / quantity),
	};
};

export default getItems;
