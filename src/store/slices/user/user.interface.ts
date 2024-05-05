export interface UserPersistentState {
	jwt: string | null;
}

export interface UserProfile {
	id: number;
	email: string;
	address: string;
	name: string;
	phone: string;
}

export interface UserState {
	profile?: UserProfile;
	jwt: string | null;
	loginErrorMessage?: string;
	registerErrorMessage?: string;
}