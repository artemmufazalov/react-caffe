// Types
import { TSortOrder, TSortParam } from '../redux/slices/filter/types';
import { IItem } from '../redux/slices/generalTypes';

// Data
import data from '../data/data.json';
import metaData from '../data/meta.json';

const getItems = (
	page: number | undefined = 1,
	quantity: number | undefined = 4,
	type: number | undefined = 0,
	category: number | undefined = 0,
	sortParam: TSortParam | undefined = 'rating',
	sortOrder: TSortOrder | undefined = 'desc',
	searchValue: string | undefined = ''
) => {
	let items = data;

	searchValue = searchValue.toLowerCase();

	const productTypes = ['', ...metaData['products_types'].map((a) => a[0])];

	let filteredByProductType = type
		? items.filter((i) => i.productType === productTypes[type])
		: items;

	let filteredByCategory = category
		? filteredByProductType.filter((i) => i.category === category)
		: filteredByProductType;

	let filteredBySearchValue = searchValue
		? filteredByCategory.filter((i) =>
				i.title.toLowerCase().includes(searchValue)
		  )
		: filteredByCategory;

	let orderParam = sortOrder === 'desc' ? -1 : 1,
		results: IItem[] = [];

	if (sortParam === 'title') {
		results = filteredBySearchValue.sort(
			(a, b) => a[sortParam].localeCompare(b[sortParam]) * orderParam
		);
	} else if (sortParam === 'rating') {
		results = filteredBySearchValue.sort(
			(a, b) => (a[sortParam] - b[sortParam]) * orderParam
		);
	} else if (sortParam === 'price') {
		results = filteredBySearchValue.sort(
			(a, b) => (a[sortParam][0][0] - b[sortParam][0][0]) * orderParam
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
