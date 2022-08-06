import { combineReducers } from '@reduxjs/toolkit';

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

export default combinedAppReducers;
