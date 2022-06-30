// Types
import { RootState } from '../../store';
import { PizzaInterface } from '../generalTypes';
import { LoadingStatusType } from './types';

export const selectItems = (state: RootState): PizzaInterface[] =>
	state.pizza.items;

export const selectPizzasLoadingStatus = (
	state: RootState
): LoadingStatusType => state.pizza.pizzasLoadingStatus;

export const selectSinglePizzaLoadingStatus = (
	state: RootState
): LoadingStatusType => state.pizza.singlePizzaLoadingStatus;
