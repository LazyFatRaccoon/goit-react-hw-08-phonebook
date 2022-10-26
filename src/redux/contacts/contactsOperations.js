import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//axios.defaults.baseURL = 'https://6342f0493f83935a784cbd77.mockapi.io';
axios.defaults.baseURL =
  'https://connections-api.herokuapp.com';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (token, { rejectWithValue }) => {
    try {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const contacts = await axios.get('/contacts');
      console.log(contacts.data);
      return contacts.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const contacts = await axios.post(
        '/contacts',
        contact
      );

      return contacts.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const contacts = await axios.delete(
        `/contacts/${contactId}`
      );
      return contacts.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
