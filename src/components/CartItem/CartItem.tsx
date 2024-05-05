import { useDispatch } from 'react-redux';
import { CartItemProps } from './CartItem.props';
import { AppDispatch } from '../../store/store';
import styles from './CartItem.module.css';
import { cartActions } from '../../store/slices/cart/cart.slice';

function CartItem({ id, name, image, count, price }: CartItemProps) {
	const dispatch = useDispatch<AppDispatch>();
	function decrease(): void {
		dispatch(cartActions.delete(id));
	}

	function increase(): void {
		dispatch(cartActions.add(id));
	}

	function remove(): void {
		dispatch(cartActions.remove(id));
	}

	return (
		<div className={styles['item']}>
			<div
				className={styles['image']}
				style={{ backgroundImage: `url('${image}')` }}
			></div>
			<div className={styles['description']}>
				<div className={styles['name']}>{name}</div>
				<div className={styles['price']}>{price}&nbsp;₽</div>
			</div>

			<div className={styles['actions']}>
				<button className={styles['minus']} onClick={remove}>
					<img src='./minus-icon.svg' alt='Уменьшить продукт' />
				</button>
				<div className={styles['count']}>{count}</div>
				<button className={styles['plus']} onClick={increase}>
					<img src='./plus-icon.svg' alt='Увеличить продукт' />
				</button>
				<button className={styles['remove']} onClick={decrease}>
					<img src='./remove-icon.svg' alt='Очистить продукт' />
				</button>
			</div>
		</div>
	);
}

export default CartItem;
