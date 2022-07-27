// Data
import data from '../data/data.json';

const getSingleItem = (id: string | undefined) => {
	let items = data;

	let result = items.filter((i) => i.id === id)[0];

	if (!result) {
		throw Error('There is no item with provided id');
	}

	return result;
};

export default getSingleItem;
