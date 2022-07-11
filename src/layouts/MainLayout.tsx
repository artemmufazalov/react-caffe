// Libs
import React from 'react';
import { Outlet } from 'react-router-dom';

// Components
import { Header } from '../components';

const MainLayout: React.FC = () => {
	return (
		<div className="App">
			<div className="wrapper">
				<Header />
				<div className="content">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default MainLayout;
