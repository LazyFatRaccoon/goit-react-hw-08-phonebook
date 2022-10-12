import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOperations';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null },
  extraReducers: {
    [fetchContacts.fulfilled] (state, {payload}) {return {...state, items: payload, isLoading: false}},
    [fetchContacts.pending] (state) {return {...state, isLoading: true}},
    [fetchContacts.rejected] (state, {error}) {return {...state, isLoading: false, error: error}},

    [addContact.fulfilled] (state, {payload}) {return {...state, items: [...state.items, payload], isLoading: false}},
    [addContact.pending] (state) {return {...state, isLoading: true}},
    [addContact.rejected] (state, {error}) {return {...state, isLoading: false, error: error}},
    
    [deleteContact.fulfilled] (state, {payload}) {return {...state, items: [...state.items.filter(contact => contact.id !== payload.id)], isLoading: false}},
    [deleteContact.pending] (state) {return {...state, isLoading: true}},
    [deleteContact.rejected] (state, {error}) {return {...state, isLoading: false, error: error}}, 

    // addContact(state, action) {
    //   return { ...state, contacts: [...state.contacts, action.payload] };
    // },
    // deleteContact(state, action) {
    //   return {
    //     ...state,
    //     contacts: state.contacts.filter(
    //       contact => contact.id !== action.payload.id
    //     ),
    //   };
    // },
  },
});

export const contactsReducer = contactsSlice.reducer;
