// Lib
import { NextApiRequest, NextApiResponse } from 'next';

// Handler func
import getSingleItem from '../../../src/server/api/getSingleItem';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		const { iid } = req.query;

		try {
			let result = getSingleItem(iid as string);
			return res.status(200).json({ result });
		} catch (err) {
			return res.status(404).json({
				message: String(err),
			});
		}
	}

	return res.status(400).json({
		message: 'This endpoint accepts only GET method!',
	});
}
