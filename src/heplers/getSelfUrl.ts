export const getSelfUrl = (): string => {
	const checkValues = ['http', 'react-caffe'];

	const checkIfEnvIsUrl = (url?: string) => {
		if (!url) {
			return false;
		}

		return checkValues.every((v) => url.includes(v));
	};

	if (checkIfEnvIsUrl(process.env.NEXT_PUBLIC_VERCEL_URL)) {
		return process.env.NEXT_PUBLIC_VERCEL_URL as string;
	}
	if (checkIfEnvIsUrl(process.env.VERCEL_URL)) {
		return process.env.VERCEL_URL as string;
	}
	if (checkIfEnvIsUrl(process.env.APP_SELF_URL)) {
		return process.env.APP_SELF_URL as string;
	}

	return 'http://localhost:3000';
};
