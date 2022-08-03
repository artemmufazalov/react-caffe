import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import cloneDeep from 'lodash.clonedeep';

// Types
import { RootState } from './store';

// Slices
import filterReducer from './slices/filter/filterSlice';
import cartReducer from './slices/cart/cartSlice';
import productsReducer from './slices/products/productsSlice';
import appReducer from './slices/app/appSlice';

const combinedAppReducers = combineReducers({
	filter: filterReducer,
	cart: cartReducer,
	products: productsReducer,
	app: appReducer,
});

const reducer: Reducer = (state: RootState, action) => {
	if (action.type === HYDRATE) {
		if (action.payload.products.productsSSFStatus) {
			return { ...cloneDeep(state), products: action.payload.products };
		}
		return { ...cloneDeep(state) };
	} else {
		return combinedAppReducers(state, action);
	}
};

export default reducer;
