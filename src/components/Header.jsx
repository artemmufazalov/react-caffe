import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { pizzaLogoSvg } from '../assets';
import { ReactComponent as HeaderCartIconSvg } from '../assets/header/headerCartIcon.svg';
import Search from './Search/Search';
import {
	selectCartTotalItemsCount,
	selectCartTotalItemsCost,
} from '../redux/slices/cartSlice';

function Header() {
	const { pathname } = useLocation();

	const totalCount = useSelector(selectCartTotalItemsCount);
	const totalSum = useSelector(selectCartTotalItemsCost);

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
}

export default Header;
