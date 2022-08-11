// Libs
import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Types
import { RootState } from '../../store';
import { IItem } from '../generalTypes';

// Redux
import { setPagesCount } from './productsSlice';
import { TRejectedApiCallPayload } from './types';

export const fetchProducts = createAsyncThunk<
	IItem[],
	any,
	{ state: RootState }
>('products/fetchProductsStatus', async (_, thunkAPI) => {
	const getState = thunkAPI.getState;

	const backendUrl = getState().app.backendUrl;
	const baseUrl = backendUrl + getState().products.baseUrl;

	const filterAndSortParams = getState().filter;

	const sortBy = filterAndSortParams.activeSortingProperty.sortingProperty;
	const order = filterAndSortParams.sortingOrder;
	const page = filterAndSortParams.currentPage;
	const limit = 4;
	const search = filterAndSortParams.searchValue;
	const type = filterAndSortParams.activeProductType || '';
	const category = filterAndSortParams.activeProductCategory || '';

	let url =
		`${baseUrl}?page=${page}&limit=${limit}` +
		`&sortBy=${sortBy}&order=${order}`;

	if (type) {
		url += `&type=${type}`;

		if (category) {
			url += `&category=${category}`;
		}
	}

	if (search) {
		url += `&search=${search}`;
	}

	const { data } = await axios.get(url);

	thunkAPI.dispatch(setPagesCount(Number(data.data.pageCount)));

	return data.data.results;
});

export const fetchSingleProductById = createAsyncThunk<
	IItem | TRejectedApiCallPayload,
	string,
	{ state: RootState }
>(
	'products/fetchSingleProductByIdStatus',
	async (id: string, { getState, rejectWithValue }) => {
		if (!id) return;

		const backendUrl = getState().app.backendUrl;
		const url = backendUrl + getState().products.baseUrl;
		try {
			const res = await axios.get(url + `/${id}`);
			return res.data.result;
		} catch (err) {
			return rejectWithValue({
				message: 'Rejected',
				statusCode: (err as AxiosError).response?.status,
			});
		}
	}
);
