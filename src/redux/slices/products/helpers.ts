// Types
import { IItem } from '../generalTypes';

export const applySearch = (items: IItem[], value: string) =>
	items &&
	items.filter(
		(item) =>
			!value || item['title'].toLowerCase().includes(value.toLowerCase())
	);
