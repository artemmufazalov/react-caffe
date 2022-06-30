// Libs
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Assets
import { pizzaLogoSvg } from '../assets';
import { ReactComponent as HeaderCartIconSvg } from '../assets/header/headerCartIcon.svg';

// Components
import Search from './Search/Search';

// Redux
import {
	selectCartTotalItemsCount,
	selectCartTotalItemsCost,
} from '../redux/slices/cart/selectors';

const Header: React.FC = () => {
	const { pathname } = useLocation();

	const totalCount: number = useSelector(selectCartTotalItemsCount);
	const totalSum: number = useSelector(selectCartTotalItemsCost);

	return (
		<div className="header">
			<div className="container">
				<Link to="/">
					<div className="header__logo">
						<img width="38" src={pizzaLogoSvg} alt="Pizza logo" />
						<div>
							<h1>React Pizza</h1>
							<p>самая вкусная пицца во вселенной</p>
						</div>
					</div>
				</Link>

				{pathname !== '/cart' && <Search />}
				{pathname !== '/cart' ? (
					<div className="header__cart">
						<Link to="/cart" className="button button--cart">
							<span>{totalSum} ₽</span>
							<div className="button__delimiter"></div>
							<HeaderCartIconSvg />
							<span>{totalCount}</span>
						</Link>
					</div>
				) : (
					''
				)}
			</div>
		</div>
	);
};

export default Header;
