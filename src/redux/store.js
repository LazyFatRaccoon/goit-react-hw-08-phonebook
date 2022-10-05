import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { createReducer, createAction, createSlice } from "@reduxjs/toolkit";


const persistConfig = {
    key: 'root',
    storage,
  }


  const contactsSlice = createSlice({
      name: 'contacts',
      initialState: {contacts: []},
      reducers: {
          addContact(state, action) {
             state.contacts.push(action.payload)
          },
          deleteContact(state, action) {
             state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id)
          },
      }
  })

const persistedContactsReducer = persistReducer(persistConfig, contactsSlice.reducer)

// export const addContact = createAction('contacts/addContact')
// export const deleteContact = createAction('contacts/deleteContact')

export const setFilter = createAction('filter/setFilter')


// console.log(addContact.toString())

// const contacts = createReducer([], {
//     [addContact]: (state, action) => [...state, action.payload],
//     [deleteContact]: (state, action) => state.filter(contact => contact.id !== action.payload.id),
// });

const filter = createReducer("", {
    [setFilter]: (state, action) => action.payload.filter,
});



export const {addContact, deleteContact} = contactsSlice.actions;

export const store = configureStore({
    reducer: {
        contacts: persistedContactsReducer,
        filter,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)