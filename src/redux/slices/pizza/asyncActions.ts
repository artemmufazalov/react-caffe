// Libs
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Types
import { RootState } from '../../store';
import { PizzaInterface } from '../generalTypes';

// Redux
import { setPagesCount } from './pizzaSlice';

export const fetchPizzas = createAsyncThunk<
	PizzaInterface[],
	any,
	{ state: RootState }
>('pizza/fetchPizzasStatus', async (_, thunkAPI) => {
	const getState = thunkAPI.getState;

	const baseUrl = getState().pizza.baseUrl;

	const filterAndSortParams = getState().filter;

	const sortBy = filterAndSortParams.activeSortingProperty.sortingProperty;
	const order = filterAndSortParams.sortingOrder;
	const page = filterAndSortParams.currentPage;
	const limit = 4;
	const search = filterAndSortParams.searchValue;
	const category = filterAndSortParams.activeCategoryIndex || '';

	let url =
		`${baseUrl}?page=${page}&limit=${limit}` +
		`&sortBy=${sortBy}&order=${order}`;

	if (category) {
		url += `&category=${category}`;
	}
	if (search) {
		url += `&search=${search}`;
	}

	const { data } = await axios.get(url);

	thunkAPI.dispatch(setPagesCount(Number(data.data.pageCount)));

	return data.data.results;
});

export const fetchSinglePizzaById = createAsyncThunk<
	PizzaInterface,
	string,
	{ state: RootState }
>('pizza/fetchSinglePizzaByIdStatus', async (id: string, { getState }) => {
	if (!id) return;

	const url = getState().pizza.baseUrl;
	const { data } = await axios.get(url + `/${id}`);

	return data.result;
});
