// Libs
import React from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

// Redux
import { useAppDispatch } from '../store';

export function useCache<T>(key: string, data: T): void;
export function useCache<T>(
	key: string,
	data: T,
	setter: ActionCreatorWithPayload<T, string>
): void;

export function useCache<T>(
	key: string,
	data: T,
	setter?: ActionCreatorWithPayload<T, string>
): void {
	const dispatch = useAppDispatch();

	const isMount = React.useRef(false);

	React.useEffect(() => {
		if (setter && localStorage[key]) {
			const parsedData = JSON.parse(localStorage.getItem(key) || '');
			dispatch(setter(parsedData));
		}
	}, [key, dispatch, setter]);

	React.useEffect(() => {
		if (isMount.current) {
			const jsonData = JSON.stringify(data);
			localStorage.setItem(key, jsonData);
		}
		isMount.current = true;
	}, [key, data]);
}
