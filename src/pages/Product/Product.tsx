import { Await, useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';

function Product() {
	const { data } = useLoaderData() as { data: Product };
	return (
		<>
			<Suspense fallback={'Загружаю...'}>
				<Await resolve={data}>
					{({ data }: { data: Product }) => <>Product - {data.name}</>}
				</Await>
			</Suspense>
		</>
	);
}

export default Product;
