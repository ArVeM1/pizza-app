import cn from 'classnames';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Layout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { userActions } from '../../store/slices/user/user.slice';
import React from 'react';
import { getProfile } from '../../store/slices/user/user.actions';

function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const profile = useSelector((state: RootState) => state.user.profile);
	const items = useSelector((state: RootState) => state.cart.items);

	React.useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	const logout = () => {
		dispatch(userActions.logout());
		navigate('/auth/login');
	};
	return (
		<div className={cn(styles['layout'])}>
			<div className={cn(styles['sidebar'])}>
				<div className={cn(styles['user'])}>
					<img className={styles['avatar']} src='/avatar.png' alt='avatar' />
					<div className={styles['name']}>
						{profile?.name ?? 'Амиржан Дусенбаев'}
					</div>
					<div className={styles['email']}>
						{profile?.email ?? 'dusenbaev101@gmail.com'}
					</div>
				</div>
				<div className={cn(styles['menu'])}>
					<NavLink
						to='/'
						className={({ isActive }) =>
							cn(styles['link'], {
								[styles['active']]: isActive,
							})
						}
					>
						<img src='/menu-icon.svg' alt='menu' />
						Меню
					</NavLink>
					<NavLink
						to='/cart'
						className={({ isActive }) =>
							cn(styles['link'], {
								[styles['active']]: isActive,
							})
						}
					>
						<img src='/cart-icon.svg' alt='cart' />
						Корзина <span className={styles['cart-count']}>{items.reduce((acc, items) => (acc += items.count), 0)}</span>
					</NavLink>
				</div>
				<Button appearance='small' className={styles['exit']} onClick={logout}>
					<img src='/exit-icon.svg' alt='exit' />
					Выйти
				</Button>
			</div>

			<div className={styles['content']}>
				<Outlet />
			</div>
		</div>
	);
}

export default Layout;
