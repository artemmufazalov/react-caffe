// Libs
import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

// Styles
import '../src/styles/app.scss';

// Layout
import MainLayout from '../src/layouts/MainLayout';

// Redux
import { wrapper } from '../src/redux/store';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="theme-color" content="#000000" />
				<meta
					name="description"
					content="Website of the best online caffe"
				/>
				<link rel="icon" href="/icon.svg" />
				<link rel="apple-touch-icon" href="/icon.svg" />
				<link rel="manifest" href="/manifest.json" />
				<title>React Caffe</title>
			</Head>
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</>
	);
};
export default wrapper.withRedux(App);
