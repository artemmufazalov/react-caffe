// Libs
import React from 'react';

// Components
import { Categories, Pagination, ProductTypes, Sort } from '..';

// Styles
import styles from './Shop.module.scss';

// Types
import { IItem } from '../../redux/slices/generalTypes';
import { TLoadingStatus } from '../../redux/slices/products/types';

interface IShopProps {
	items: IItem[];
	itemBlocks: React.ReactNode[];
	skeletons: React.ReactNode[];
	currentPage: number;
	productsLoadingStatus: TLoadingStatus;
	activeProductType: number;
	onPageChange: (page: number) => void;
}

const Shop: React.FC<IShopProps> = ({
	items,
	itemBlocks,
	skeletons,
	currentPage,
	productsLoadingStatus,
	activeProductType,
	onPageChange,
}) => {
	const contentTopRef = React.useRef<HTMLDivElement>(null);

	const onShopPageChange = (page: number) => {
		onPageChange(page);
		contentTopRef.current?.scrollIntoView();
	};

	return (
		<div className="container">
			<div className={styles.top} ref={contentTopRef}>
				<ProductTypes />
				<Sort />
			</div>
			{activeProductType !== 0 && activeProductType !== 5 ? (
				<div className={styles.top}>
					<Categories />
				</div>
			) : (
				''
			)}
			<h2 className={styles.title}>Меню</h2>

			{(productsLoadingStatus === 'error' ||
				(items.length < 1 && productsLoadingStatus === 'success')) && (
				<div className={styles.errorInfo}>
					<h2>
						Товаров не нашлось <span>😕</span>
					</h2>
					<br />
					<p>
						К сожалению, по вашему запросу нет товаров. Попробуйте
						изменить параметры поиска!
					</p>
				</div>
			)}
			<div className={styles.items}>
				{productsLoadingStatus === 'pending' ? skeletons : itemBlocks}
			</div>
			{productsLoadingStatus !== 'error' && (
				<Pagination
					onPageChange={onShopPageChange}
					currentPage={currentPage}
				/>
			)}
		</div>
	);
};

export default Shop;
