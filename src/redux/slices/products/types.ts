import { IItem } from '../generalTypes';

export type TLoadingStatus =
	| 'idle'
	| 'pending'
	| 'success'
	| 'not_found'
	| 'error';

export interface IProductsState {
	baseUrl: string;
	items: IItem[];
	pagesCount: number;
	productsLoadingStatus: TLoadingStatus;
	singleProductLoadingStatus: TLoadingStatus;
	itemsNeedUpdateStatus?: boolean;
	itemsFetchedStatus?: boolean;
}

export type TRejectedApiCallPayload = {
	message: string;
	statusCode: number;
};
