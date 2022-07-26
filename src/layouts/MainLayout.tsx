// Libs
import React from 'react';

// Components
import { Header } from '../components';

type LayoutProps = {
	children: React.ReactNode;
};

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="App">
			<div className="wrapper">
				<Header />
				<div className="content">{children}</div>
			</div>
		</div>
	);
};

export default MainLayout;
