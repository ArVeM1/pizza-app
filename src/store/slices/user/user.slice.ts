import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadState } from '../../storage';
import { LoginResponse, RegisterResponse } from '../../../interfaces/auth.interface';
import { login, getProfile, register } from './user.actions';
import { UserPersistentState, UserState } from './user.interface';

export const JWT_PERSISTENT_STATE = 'userData';

const initialState: UserState = {
	jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: state => {
			state.jwt = null;
		},
		clearLoginError: state => {
			state.loginErrorMessage = undefined;
		},
		clearRegisterError: state => {
			state.registerErrorMessage = undefined;
		},
	},
	extraReducers: builder => {
		builder.addCase(
			login.fulfilled,
			(state, action: PayloadAction<LoginResponse | undefined>) => {
				if (!action.payload) return;
				state.jwt = action.payload.access_token;
			}
		);
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});
		builder.addCase(
			register.fulfilled,
			(state, action: PayloadAction<RegisterResponse | undefined>) => {
				if (!action.payload) return;
				state.jwt = action.payload.access_token;
			}
		);
		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMessage = action.error.message;
		});
	},
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
