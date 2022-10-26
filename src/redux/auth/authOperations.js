import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk('auth/register', async credentials => {
  try {
    const { data } = await axios.post('/users/signup', credentials);
    console.log(data);
    token.set(data.token);
    return data;
  } catch (error) {}
});

const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.post('/users/login', credentials);
    console.log(data);
    token.set(data.token);
    return data;
  } catch (error) {
    console.log('wrong password or email');
    return thunkAPI.rejectWithValue('wrong password or email');
  }
});

const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post('/users/logout');
    token.unset();
    return;
  } catch (error) {}
});

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('something goes wrong');
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something goes wrong');
    }
  }
);

const authOperations = {
  register,
  login,
  logout,
  fetchCurrentUser,
};

export default authOperations;
