import { IItem } from '../generalTypes';

export type TLoadingStatus = 'idle' | 'pending' | 'success' | 'error';

export interface IProductsState {
	baseUrl: string;
	items: IItem[];
	pagesCount: number;
	productsLoadingStatus: TLoadingStatus;
	singleProductLoadingStatus: TLoadingStatus;
	productsSSFStatus?: boolean;
}
