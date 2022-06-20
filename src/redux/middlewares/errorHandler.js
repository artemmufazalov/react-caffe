import { isRejected } from '@reduxjs/toolkit';

export const errorsHandler = (api) => (next) => (action) => {
	if (isRejected(action)) {
		console.log(action.error);
		if (action.error.message === 'Request failed with status code 429') {
			console.log('Слишком много запросов!');
		}
	}

	return next(action);
};
