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
			console.error(action.error);
			if (
				action.error.message === 'Request failed with status code 429'
			) {
				console.error('Слишком много запросов!');
			}
		}

		return next(action);
	};
