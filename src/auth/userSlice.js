import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../api/userApi';

export const register = createAsyncThunk('user/register', async (payload) => {
    //call api

    const data = await userApi.register(payload);

    //local store
    localStorage.setItem('accsess_token', data.jwt);
    localStorage.setItem('user', JSON.stringify(data.user));

    //return user data
    return data.user;
});
const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: {},
        setting: {},
    },
    reducers: {},
    extraReducers: {
        // 'user/register/fulfilled':() => {}
        [register.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
    },
});

const { reducer } = userSlice;

export default reducer;
