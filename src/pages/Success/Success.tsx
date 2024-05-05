import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Success.module.css';

function Success() {
	const navigate = useNavigate();
	return (
		<div className={styles['success']}>
			<img src='./success.png' alt='Изображение пиццы' />
			<div className={styles['text']}>Ваш заказ успешно оформлен!</div>
			<Button appearance='big' onClick={() => navigate('/')}>
				СДЕЛАТЬ НОВЫЙ
			</Button>
		</div>
	);
}

export default Success;
