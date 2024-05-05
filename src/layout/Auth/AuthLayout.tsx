import cn from 'classnames';
import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';

function AuthLayout() {
	return (
		<div className={cn(styles['layout'])}>
			<div className={cn(styles['logo'])}>
				<img src="/auth-icon.svg" alt="Логотип компании" />
			</div>

			<div className={styles['content']}>
				<Outlet />
			</div>
		</div>
	);
}

export default AuthLayout;
