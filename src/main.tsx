import axios from 'axios';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import { PREFIX } from './helpers/API';
import './index.css';
import Layout from './layout/Menu/Layout';
import Cart from './pages/Cart/Cart';
import Error from './pages/Error/Error';
import Product from './pages/Product/Product';
import AuthLayout from './layout/Auth/AuthLayout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import RequireAuth from './helpers/RequireAuth';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Success from './pages/Success/Success';

const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<>Загрузка...</>}>
						<Menu />
					</Suspense>
				),
			},
			{
				path: '/cart',
				element: <Cart />,
			},
			{
				path: '/success',
				element: <Success />,
			},
			{
				path: '/product/:id',
				element: <Product />,
				errorElement: <>Ошибка</>,
				loader: async ({ params }) => {
					return defer({
						data: new Promise((res, rej) => {
							setTimeout(() => {
								axios
									.get(`${PREFIX}/products/${params.id}`)
									.then(data => res(data))
									.catch(e => rej(e));
							}, 2000);
						}),
					});
					// await new Promise<void>(res => {
					// 	setTimeout(() => {
					// 		res();
					// 	}, 2000);
					// });
					// const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
					// return data;
				},
			},
		],
	},
	{
		path: 'auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
			},
		],
	},
	{
		path: '*',
		element: <Error />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
