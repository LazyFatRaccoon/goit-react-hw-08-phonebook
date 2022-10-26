import { createSlice } from '@reduxjs/toolkit';
import authOperations from './authOperations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isError: null,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperations.register.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.isLoggedIn = true;
      state.token = payload.token;
      state.isError = null;
    },
    [authOperations.login.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.isLoggedIn = true;
      state.token = payload.token;
      state.isError = null;
    },
    [authOperations.login.rejected](state, { payload }) {
      state.user = initialState.user;
      state.isLoggedIn = false;
      state.token = null;
      state.isError = payload;
    },
    [authOperations.logout.fulfilled](state, _) {
      state.user = initialState.user;
      state.isLoggedIn = initialState.isLoggedIn;
      state.isRefreshing = initialState.isRefreshing;
      state.token = initialState.token;
      state.isError = null;
    },
    [authOperations.fetchCurrentUser.pending](state) {
      state.isRefreshing = true;
    },
    [authOperations.fetchCurrentUser.rejected](state) {
      state.isRefreshing = initialState.isRefreshing;
    },
    [authOperations.fetchCurrentUser.fulfilled](state, { payload }) {
      state.user = payload;
      state.isLoggedIn = true;
      state.isRefreshing = initialState.isRefreshing;
      state.isError = null;
    },
  },
});

export default authSlice.reducer;
//export const authReducer = authSlice.reducer;
