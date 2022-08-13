// Libs
import React from 'react';

// Assets
import { MinusSvg, PlusSvg, CrossSvg } from '../../assets';

// Styles
import styles from './Cart.module.scss';

// Redux
import { useAppDispatch } from '../../redux/store';
import { ICartItem } from '../../redux/slices/cart/types';
import {
	increaseItemQuantity,
	decreaseItemQuantity,
	removeItemFromCart,
} from '../../redux/slices/cart/cartSlice';

interface CartItemPropsInterface extends ICartItem {}

const CartItem: React.FC<CartItemPropsInterface> = ({
	cartId,
	title,
	imageUrl,
	quantity,
	type,
	size,
	cartPrice,
}) => {
	const dispatch = useAppDispatch();

	const onClickRemove = () => {
		if (
			window.confirm(
				'Вы уверены, что хотите удалить этот товар из корзины?'
			)
		) {
			dispatch(removeItemFromCart(cartId));
		}
	};

	return (
		<div className={styles.item}>
			<span className={styles.item__left}>
				<div className={styles.item__img}>
					<img src={imageUrl} alt={title} />
				</div>
				<div className={styles.item__info}>
					<h3>{title}</h3>
					<p>
						{type}, {size}
					</p>
				</div>
			</span>

			<div className={styles.item__middle}>
				<div className={styles.item__count}>
					<button
						disabled={quantity < 2}
						className={
							'button button--outline button--circle ' +
							styles.item__count__minus
						}
						onClick={() => {
							dispatch(decreaseItemQuantity(cartId));
						}}>
						<MinusSvg />
					</button>
					<b>{quantity}</b>
					<button
						className={
							'button button--outline button--circle ' +
							styles.item__count__plus
						}
						onClick={() => {
							dispatch(increaseItemQuantity(cartId));
						}}>
						<PlusSvg />
					</button>
				</div>
			</div>

			<span className={styles.item__right}>
				<div className={styles.item__price}>
					<b>{cartPrice * quantity} ₽</b>
				</div>
				<div className={styles.item__remove}>
					<button
						className="button button--outline button--circle"
						onClick={onClickRemove}>
						<CrossSvg />
					</button>
				</div>
			</span>
		</div>
	);
};

export default CartItem;
