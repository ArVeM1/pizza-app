import { useDispatch, useSelector } from 'react-redux';
import Heading from '../../components/Heading/Heading';
import { AppDispatch, RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import React from 'react';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/slices/cart/cart.slice';

const DELIVERY_FEE = 169;

function Cart() {
	const [cartProducts, setCartProducts] = React.useState<Product[]>([]);
	const items = useSelector((state: RootState) => state.cart.items);
	const jwt = useSelector((state: RootState) => state.user.jwt);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const total = items
		.map(i => {
			const product = cartProducts.find(p => p.id === i.id);
			if (!product) return 0;
			return i.count * product.price;
		})
		.reduce((acc, i) => (acc += i), 0);

	const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map(i => getItem(i.id)));
		setCartProducts(res);
	};

	React.useEffect(() => {
		loadAllItems();
	}, [items]);

	const checkout = async () => {
		try {
			await axios.post(
				`${PREFIX}/order`,
				{
					products: items,
				},
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			);
			dispatch(cartActions.clean());
			navigate('/success');
		} catch (e) {
			console.error(e);
			dispatch(cartActions.clean());
			navigate('/success');
		}
	};

	return (
		<>
			<Heading className={styles['heading']}>Корзина</Heading>
			{items.map(i => {
				const product = cartProducts.find(p => p.id === i.id);
				if (!product) return;
				return <CartItem key={i.id} {...product} count={i.count} />;
			})}
			<div className={styles['line']}>
				<div className={styles['text']}>Итог</div>
				<div className={styles['price']}>
					{total}&nbsp;<span>₽</span>
				</div>
			</div>
			<hr className={styles['hr']} />
			<div className={styles['line']}>
				<div className={styles['text']}>Доставка</div>
				<div className={styles['price']}>
					{DELIVERY_FEE}&nbsp;<span>₽</span>
				</div>
			</div>
			<hr className={styles['hr']} />
			<div className={styles['line']}>
				<div className={styles['text']}>
					Итог <span className={styles['total-count']}>({items.length})</span>
				</div>
				<div className={styles['price']}>
					{total + DELIVERY_FEE}&nbsp;<span>₽</span>
				</div>
			</div>

			<div className={styles['checkout']}>
				<Button appearance='big' onClick={checkout}>
					Оформить
				</Button>
			</div>
		</>
	);
}

export default Cart;
