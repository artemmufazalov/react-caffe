import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './slices/filterSlice.js';
import cartReducer from './slices/cartSlice.js';
import pizzaReducer from './slices/pizzaSlice.js';

import { errorsHandler } from './middlewares/errorHandler';

export const store = configureStore({
	reducer: { filter: filterReducer, cart: cartReducer, pizza: pizzaReducer },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(errorsHandler),
});
