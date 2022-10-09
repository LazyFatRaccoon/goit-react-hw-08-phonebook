import { createReducer, createAction } from '@reduxjs/toolkit';

export const setFilter = createAction('filter/setFilter');

export const filter = createReducer('', {
  [setFilter]: (_, action) => action.payload.filter,
});
