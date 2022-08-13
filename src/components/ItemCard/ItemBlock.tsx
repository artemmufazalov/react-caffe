// Libs
import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

// Assets
import { AddItemPlusSvg } from '../../assets';

// Styles
import styles from './ItemCard.module.scss';

// Data
import metaData from '../../data/meta.json';
import { IMeta } from '../../data/dataTypes';

// Redux
import { useAppDispatch } from '../../redux/store';
import { IItem } from '../../redux/slices/generalTypes';
import { selectItemQuantityById } from '../../redux/slices/cart/selectors';
import { addItem } from '../../redux/slices/cart/cartSlice';

interface ItemBlockProps extends IItem {}

const ItemBlock: React.FC<ItemBlockProps> = ({
	id,
	title,
	productType,
	price,
	imageUrl,
	sizes,
	types,
	category,
	rating,
	isMetaType,
	types_names,
}) => {
	const dispatch = useAppDispatch();

	const quantity: number = useSelector(selectItemQuantityById(id));

	const [activeItemSize, setActiveItemSize] = React.useState<number>(0);
	const [activeItemType, setActiveItemType] = React.useState<number>(0);

	let productTypes: string[];

	if (!isMetaType && types_names) {
		productTypes = types_names;
	} else {
		const productTypesKey = productType + '_types';
		productTypes = (metaData as IMeta)[productTypesKey];
	}

	const onClickAddItem = () => {
		let typeIndex = activeItemType,
			type = productTypes[types[typeIndex]],
			sizeIndex = activeItemSize,
			size = sizes[sizeIndex],
			item = {
				sizes,
				types,
				productType,
				id,
				title,
				price,
				imageUrl,
				category,
				rating,
			};

		dispatch(addItem({ item, type, typeIndex, sizeIndex, size }));
	};

	return (
		<div className={styles.root}>
			<div className={styles.block}>
				<Link href={`/product/${id}`}>
					<span className="cp">
						<img
							className={styles.image}
							src={imageUrl}
							alt={title}
						/>
						<h4 className={styles.title}>{title}</h4>
					</span>
				</Link>
				<div className={styles.selector}>
					<ul>
						{types.map((type, index) => (
							<li
								key={index}
								className={
									index === activeItemType
										? styles.active
										: ''
								}
								onClick={() => setActiveItemType(index)}>
								{productTypes[type]}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map((size, index) => (
							<li
								key={index}
								className={
									index === activeItemSize
										? styles.active
										: ''
								}
								onClick={() => setActiveItemSize(index)}>
								{size}
							</li>
						))}
					</ul>
				</div>
				<div className={styles.bottom}>
					<div className={styles.price}>
						от {price[activeItemType][activeItemSize]} ₽
					</div>
					<button
						onClick={onClickAddItem}
						className={
							'button button--outline button--add ' +
							styles.addBtn
						}>
						<AddItemPlusSvg />
						<span>Добавить</span>
						{quantity > 0 && <i>{quantity}</i>}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ItemBlock;
