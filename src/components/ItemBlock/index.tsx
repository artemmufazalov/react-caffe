// Libs
import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

// Assets
import { AddPizzaPlusSvg } from '../../assets';

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

	// @TODO: change naming
	const [activePizzaSize, setActivePizzaSize] = React.useState<number>(0);
	const [activePizzaType, setActivePizzaType] = React.useState<number>(0);

	let productTypes: string[];

	if (!isMetaType && types_names) {
		productTypes = types_names;
	} else {
		const productTypesKey = productType + '_types';
		productTypes = (metaData as IMeta)[productTypesKey];
	}

	const onClickAddPizza = () => {
		let typeIndex = activePizzaType,
			type = productTypes[types[typeIndex]],
			sizeIndex = activePizzaSize,
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
		<div className="pizza-block-wrapper">
			<div className="pizza-block">
				<Link href={`/product/${id}`}>
					<span className="cp">
						<img
							className="pizza-block__image"
							src={imageUrl}
							alt="Pizza"
						/>
						<h4 className="pizza-block__title">{title}</h4>
					</span>
				</Link>
				<div className="pizza-block__selector">
					<ul>
						{types.map((type, index) => (
							<li
								key={index}
								className={
									index === activePizzaType ? 'active' : ''
								}
								onClick={() => setActivePizzaType(index)}>
								{productTypes[type]}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map((size, index) => (
							<li
								key={index}
								className={
									index === activePizzaSize ? 'active' : ''
								}
								onClick={() => setActivePizzaSize(index)}>
								{size}
							</li>
						))}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">
						от {price[activePizzaType][activePizzaSize]} ₽
					</div>
					<button
						onClick={onClickAddPizza}
						className="button button--outline button--add">
						<AddPizzaPlusSvg />
						<span>Добавить</span>
						{quantity > 0 && <i>{quantity}</i>}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ItemBlock;
