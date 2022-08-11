export const getSelfUrl = (): string => {
	return (
		process.env.NEXT_PUBLIC_VERCEL_URL ||
		process.env.VERCEL_URL ||
		process.env.APP_SELF_URL ||
		'http://localhost:3000'
	);
};
