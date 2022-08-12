// Libs
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

// Assets
import {
	HeaderLogoSvg,
	HeartIconSvg,
	PersonIconSvg,
	HeaderCartIconSvg,
} from '../../assets';

// Styles
import styles from './Header.module.scss';

// Components
import { Search } from '../';

// Types
import { ICartItem } from '../../redux/slices/cart/types';

// Redux
import { useAppSelector } from '../../redux/store';
import { selectCartItems } from '../../redux/slices/cart/selectors';
import { useCache } from '../../redux/reduxCustomHooks/useCache';
import { setCartItems } from '../../redux/slices/cart/cartSlice';

const Header: React.FC = () => {
	const router = useRouter();
	const pathname = router.pathname;

	const cartItems: ICartItem[] = useAppSelector(selectCartItems);

	useCache<ICartItem[]>('cart', cartItems, setCartItems);

	return (
		<div className={styles.header}>
			<div className={styles.container}>
				<Link href="/">
					<div
						className={clsx(styles.logo, {
							wdpe: pathname === '' || pathname === '/',
						})}>
						<HeaderLogoSvg width="38" alt="На главную" />
						<div>
							<h1 className={styles.logo__header}>React Caffe</h1>
							<p className={styles.logo__text}>
								лучшее онлайн кафе
							</p>
						</div>
					</div>
				</Link>

				{!pathname.includes('/cart') && (
					<span className={styles.searchBlock}>
						<Search />
					</span>
				)}

				<div className={styles.iconsWrapper}>
					<span className={styles.heartLogo}>
						<Link href="/favorites">
							<HeartIconSvg />
						</Link>
					</span>
					{!pathname.includes('/cart') && (
						<div className={styles.cartLogo}>
							<Link href="/cart">
								<HeaderCartIconSvg />
							</Link>
						</div>
					)}
					<span className={styles.personLogo}>
						<Link href="/account">
							<PersonIconSvg />
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Header;
