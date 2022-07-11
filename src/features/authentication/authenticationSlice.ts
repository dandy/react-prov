import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import authenticationService from './authenticationService';

export interface AuthenticationState {
    username: string;
    isLoggedIn: boolean;
    loginError: boolean
}

export interface UserLoginData {
    username: string;
    password: string
}

const initialState: AuthenticationState = {
    username: '',
    isLoggedIn: false,
    loginError: false
};

export const login = createAsyncThunk(
    'authentication/login',
    async (data: UserLoginData, thunkAPI) => {
        try {
            return await authenticationService.login(data.username, data.password);
        } catch (error) {
            return thunkAPI.rejectWithValue('Unable to login');
        }
    }
);

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        logout: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.username = action.payload;
                state.loginError = false;
            })
            .addCase(login.rejected, (state) => {
                state.isLoggedIn = false;
                state.username = '';
                state.loginError = true;
            })
    }
});

export const { logout } = authenticationSlice.actions;

export const isLoggedIn = (state: RootState) => state.authentication.isLoggedIn;
export const loggedInUsername = (state: RootState) => state.authentication.username;
export const loginError = (state: RootState) => state.authentication.loginError;

export default authenticationSlice.reducer;
