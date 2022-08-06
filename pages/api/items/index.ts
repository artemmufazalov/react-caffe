// Lib
import { NextApiRequest, NextApiResponse } from 'next';
import { TSortOrder, TSortParam } from '../../../src/redux/slices/filter/types';

// Handler func
import { getItems } from '../../../src/api';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		const { query } = req;
		const { page, limit, sortBy, order, category, type, search } = query;

		try {
			let data = getItems(
				Number(page) || 1,
				Number(limit) || 4,
				Number(type) || 0,
				Number(category) || 0,
				(sortBy as TSortParam) || 'rating',
				(order as TSortOrder) || 'desc',
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
