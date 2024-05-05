import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartState } from './cart.interface';
import { loadState } from '../../storage';

export const CART_PERSISTENT_STATE = 'cartData';

const initialState: CartState = {
	items: loadState<CartState>(CART_PERSISTENT_STATE)?.items ?? [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clean: (state) => {
			state.items = [];
		},
		add: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(i => i.id === action.payload);
			if (!existed) {
				state.items.push({ id: action.payload, count: 1 });
				return;
			}
			state.items.map(i => {
				if (i.id === action.payload) {
					i.count += 1;
				}
				return i;
			});
		},
		remove: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(i => i.id === action.payload);
			if (existed && existed.count !== 1) {
				state.items.map(i => {
					if (i.id === action.payload) {
						i.count -= 1;
					}
					return i;
				});
				return;
			}
			state.items = state.items.filter(i => i.id !== action.payload);
		},
		delete: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(i => i.id !== action.payload);
		},
	},
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
