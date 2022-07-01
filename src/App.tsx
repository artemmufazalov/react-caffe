// Libs
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Styles
import './scss/app.scss';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Cart from './pages/Cart';
import PizzaPage from './pages/PizzaPage';

const App: React.FC = () => {
	return (
		<Routes>
			<Route path={'/react-pizza'} element={<MainLayout />}>
				<Route index element={<Home />} />
				<Route path={'cart'} element={<Cart />} />
				<Route path={'pizza/:id'} element={<PizzaPage />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default App;
