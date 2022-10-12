import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/contactsSlice';
import { filter } from './filter/filter';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter,
  }, 
});
