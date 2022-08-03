// Libs
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';

// Slices
import filterReducer from './slices/filter/filterSlice';
import cartReducer from './slices/cart/cartSlice';
import productsReducer from './slices/products/productsSlice';

// Middlewares
import { errorsHandler } from './middlewares/errorHandler';

export const makeStore = () =>
	configureStore({
		reducer: {
			filter: filterReducer,
			cart: cartReducer,
			products: productsReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(errorsHandler),
	});

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper<RootStore>(makeStore);
