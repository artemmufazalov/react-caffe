// Types
import { RootState } from '../../store';
import { IItem } from '../generalTypes';
import { TLoadingStatus } from './types';

export const selectItems = (state: RootState): IItem[] => state.products.items;

export const selectProductsLoadingStatus = (state: RootState): TLoadingStatus =>
	state.products.productsLoadingStatus;

export const selectSingleProductLoadingStatus = (
	state: RootState
): TLoadingStatus => state.products.singleProductLoadingStatus;

export const selectPagesCount = (state: RootState): number =>
	state.products.pagesCount;
