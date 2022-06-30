// Libs
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// Slices
import filterReducer from './slices/filter/filterSlice';
import cartReducer from './slices/cart/cartSlice';
import pizzaReducer from './slices/pizza/pizzaSlice';

// Middlewares
import { errorsHandler } from './middlewares/errorHandler';

const store = configureStore({
	reducer: { filter: filterReducer, cart: cartReducer, pizza: pizzaReducer },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(errorsHandler),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
