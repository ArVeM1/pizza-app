import { Link, useNavigate } from 'react-router-dom';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Register.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { FormEvent } from 'react';
import React from 'react';
import Button from '../../components/Button/Button';
import { userActions } from '../../store/slices/user/user.slice';
import { register } from '../../store/slices/user/user.actions';

export interface RegisterForm {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
	name: {
		value: string;
	};
}

function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const jwt = useSelector((state: RootState) => state.user.jwt);
	const error = useSelector(
		(state: RootState) => state.user.registerErrorMessage
	);

	React.useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const { email, password, name } = target;
		await sendRegister(email.value, password.value, name.value);
	};

	const sendRegister = async (email: string, password: string, name: string) => {
		dispatch(register({ email, password, name }));
	};

	return (
		<div className={styles['login']}>
			<Heading>Регистрация</Heading>
			{error && <div className={styles['error']}>{error}</div>}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor='email'>Ваш email</label>
					<Input id='email' name='email' placeholder='Email' />
				</div>

				<div className={styles['field']}>
					<label htmlFor='password'>Ваше имя</label>
					<Input id='name' name='name' type='text' placeholder='Имя' />
				</div>

				<div className={styles['field']}>
					<label htmlFor='password'>Ваш пароль</label>
					<Input
						id='password'
						name='password'
						type='password'
						placeholder='Пароль'
					/>
				</div>

				<Button appearance='big'>Зарегистрироваться</Button>
			</form>
			<div className={styles['links']}>
				<div>Есть аккаунт?</div>
				<Link to={'/auth/login'}>Войти</Link>
			</div>
		</div>
	);
}

export default Register;
