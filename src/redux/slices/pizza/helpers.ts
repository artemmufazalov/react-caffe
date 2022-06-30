// Types
import { ItemInterface } from '../generalTypes';

export const applySearch = (items: ItemInterface[], value: string) =>
	items &&
	items.filter(
		(item) =>
			!value || item['title'].toLowerCase().includes(value.toLowerCase())
	);
