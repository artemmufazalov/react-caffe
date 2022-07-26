// Libs
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import { PizzaStateInterface, LoadingStatusType } from './types';

// Asyncs
import { fetchPizzas, fetchSinglePizzaById } from './asyncActions';

const initialState: PizzaStateInterface = {
	baseUrl: 'https://629ccb9ee9358232f760bbe8.mockapi.io/api/items',
	items: [],
	pizzasLoadingStatus: 'pending',
	singlePizzaLoadingStatus: 'pending',
};

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		togglePizzasLoadingStatus: (
			state,
			action: PayloadAction<LoadingStatusType>
		) => {
			state.pizzasLoadingStatus = action.payload;
		},
		toggleSinglePizzaLoadingStatus: (
			state,
			action: PayloadAction<LoadingStatusType>
		) => {
			state.pizzasLoadingStatus = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.items = [];
			state.pizzasLoadingStatus = 'pending';
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.pizzasLoadingStatus = 'success';
		});
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.pizzasLoadingStatus = 'error';
			state.items = [];
		});
		builder.addCase(fetchSinglePizzaById.pending, (state) => {
			state.singlePizzaLoadingStatus = 'pending';
		});
		builder.addCase(fetchSinglePizzaById.fulfilled, (state) => {
			state.singlePizzaLoadingStatus = 'success';
		});
		builder.addCase(fetchSinglePizzaById.rejected, (state) => {
			state.singlePizzaLoadingStatus = 'error';
		});
	},
});

export const { togglePizzasLoadingStatus, toggleSinglePizzaLoadingStatus } =
	pizzaSlice.actions;

export default pizzaSlice.reducer;
