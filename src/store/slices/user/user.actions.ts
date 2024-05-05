import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { LoginResponse, RegisterResponse } from '../../../interfaces/auth.interface';
import { PREFIX } from '../../../helpers/API';
import { UserProfile } from './user.interface';
import { RootState } from '../../store';

export const login = createAsyncThunk(
	'user/login',
	async (params: { email: string; password: string }) => {
		try {
			const { data } = await axios.post<LoginResponse>(
				`${PREFIX}/auth/login`,
				params
			);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export const getProfile = createAsyncThunk<
	UserProfile,
	void,
	{ state: RootState }
>('user/profile', async (_, thunkApi) => {
	const jwt = thunkApi.getState().user.jwt;
	const { data } = await axios.get<UserProfile>(`${PREFIX}/auth/profile`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	return data;
});

export const register = createAsyncThunk(
	'user/register',
	async (params: { email: string; password: string, name: string }) => {
		try {
			const { data } = await axios.post<RegisterResponse>(
				`${PREFIX}/auth/register`,
				params
			);
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);
