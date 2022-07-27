// Lib
import { NextApiRequest, NextApiResponse } from 'next';
import { SortOrder, TSortParam } from '../../../src/redux/slices/filter/types';

// Handler func
import { getItems } from '../../../src/api';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		const { query } = req;
		const { page, limit, sortBy, order, category, search } = query;

		try {
			let data = getItems(
				Number(page) || 1,
				Number(limit) || 4,
				Number(category) || 0,
				(sortBy as TSortParam) || 'rating',
				(order as SortOrder) || 'desc',
				(search as string) || ''
			);

			return res.status(200).json({ data });
		} catch (err) {
			return res.status(400).json({
				message: String(err),
			});
		}
	}

	return res.status(400).json({
		message: 'This endpoint accepts only GET method!',
	});
}
