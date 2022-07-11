// Libs
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Styles
import './styles/app.scss';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import PizzaPage from './pages/PizzaPage';

// Lazy loading
const Cart = React.lazy(
	() => import(/*webpackChunkName: "Cart"*/ './pages/Cart')
);
const NotFound = React.lazy(
	() => import(/*webpackChunkName: "NotFound"*/ './pages/NotFound')
);

const App: React.FC = () => {
	return (
		<Routes>
			<Route path={'/react-pizza'} element={<MainLayout />}>
				<Route index element={<Home />} />
				<Route path={'pizza/:id'} element={<PizzaPage />} />

				<Route
					path={'cart'}
					element={
						<Suspense fallback={<div>Загрузка корзины...</div>}>
							<Cart />
						</Suspense>
					}
				/>

				<Route
					path="*"
					element={
						<Suspense fallback={<div>Загрузка...</div>}>
							<NotFound />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	);
};

export default App;
