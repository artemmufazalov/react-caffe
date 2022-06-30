import {
	Action,
	Middleware,
	MiddlewareAPI,
	isRejected,
	Dispatch,
} from '@reduxjs/toolkit';

export const errorsHandler: Middleware =
	(api: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
		if (isRejected(action)) {
			console.log(action.error);
			if (
				action.error.message === 'Request failed with status code 429'
			) {
				console.log('Слишком много запросов!');
			}
		}

		return next(action);
	};
