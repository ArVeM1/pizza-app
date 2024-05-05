import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';
import styles from './MenuList.module.css';

function MenuList({ products }: MenuListProps) {
	return (
		<div className={styles['wrapper']}>
			{products.map(p => (
				<ProductCard
					key={p.id}
					id={p.id}
					title={p.name}
					description={p.ingredients.join(', ')}
					rating={p.rating}
					price={p.price}
					image={p.image}
				/>
			))}
		</div>
	);
}

export default MenuList;
