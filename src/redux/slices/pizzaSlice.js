import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const applySearch = (items, value) =>
	items &&
	items.filter(
		(pizza) =>
			!value || pizza['title'].toLowerCase().includes(value.toLowerCase())
	);

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async (params, thunkAPI) => {
		const getState = thunkAPI.getState;

		const baseUrl = getState().pizza.baseUrl;

		const filterAndSortParams = getState().filter;

		const sortBy =
			filterAndSortParams.selectedSortingProperty.sortingProperty;
		const order = filterAndSortParams.sortingOrder;
		const page = filterAndSortParams.currentPage;
		const limit = 4;
		const search = filterAndSortParams.searchValue;
		const category = filterAndSortParams.selectedCategoryIndex || '';

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

		// MockAPI не умеет работать одновременно с параметрами фильтрации и поиска,
		// Если есть и те, и другие, то он отдает предпочтение первым.
		// Поэтому, если указаны параметры фильтрации (категория), то применяем поиск на пришедший список

		let items = data;
		if (category !== 0 && search) {
			items = applySearch(data, search);
		}
		console.log('Fetch pizzas request');
		return items;
	}
);

export const fetchSinglePizzaById = createAsyncThunk(
	'pizza/fetchSinglePizzaByIdStatus',
	async (id, { getState }) => {
		const url = getState().pizza.baseUrl;
		const { data } = await axios.get(url + `/${id}`);
		return data;
	}
);

const initialState = {
	baseUrl: 'https://629ccb9ee9358232f760bbe8.mockapi.io/api/items',
	items: [],
	pizzasLoadingStatus: 'pending', // idle | pending | success | error
	singlePizzaLoadingStatus: 'pending', // idle | pending | success | error
};

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		togglePizzasLoadingStatus: (state, action) => {
			state.pizzasLoadingStatus = action.payload;
		},
		toggleSinglePizzaLoadingStatus: (state, action) => {
			state.pizzasLoadingStatus = action.payload;
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state) => {
			state.pizzasLoadingStatus = 'pending';
			state.items = [];
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.pizzasLoadingStatus = 'success';
		},
		[fetchPizzas.rejected]: (state) => {
			state.pizzasLoadingStatus = 'error';
			state.items = [];
		},
		[fetchSinglePizzaById.pending]: (state) => {
			state.singlePizzaLoadingStatus = 'pending';
		},
		[fetchSinglePizzaById.fulfilled]: (state, action) => {
			state.singlePizzaLoadingStatus = 'success';
		},
		[fetchSinglePizzaById.rejected]: (state) => {
			state.singlePizzaLoadingStatus = 'error';
		},
	},
});

export const selectItems = (state) => state.pizza.items;

export const selectPizzasLoadingStatus = (state) =>
	state.pizza.pizzasLoadingStatus;
export const selectSinglePizzaLoadingStatus = (state) =>
	state.pizza.singlePizzaLoadingStatus;

export const { togglePizzasLoadingStatus, toggleSinglePizzaLoadingStatus } =
	pizzaSlice.actions;

export default pizzaSlice.reducer;
