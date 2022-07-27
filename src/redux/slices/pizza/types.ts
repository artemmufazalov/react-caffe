import { PizzaInterface } from '../generalTypes';

export type LoadingStatusType = 'idle' | 'pending' | 'success' | 'error';

export interface PizzaStateInterface {
	baseUrl: string;
	items: PizzaInterface[];
	pagesCount: number;
	pizzasLoadingStatus: LoadingStatusType;
	singlePizzaLoadingStatus: LoadingStatusType;
}
