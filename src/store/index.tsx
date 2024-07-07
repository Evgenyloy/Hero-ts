import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import filters from '../components/heroesFilters/filtersSlice';

const ownStringMiddleware =
  (store: any) => (dispatch: any) => (action: any) => {
    if (typeof action === 'string') {
      return dispatch({
        type: action,
      });
    }
    return dispatch(action);
  };

const store = configureStore({
  reducer: { filters, [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ownStringMiddleware, apiSlice.middleware),

  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
