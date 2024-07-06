import { configureStore } from '@reduxjs/toolkit';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

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
  reducer: { heroes, filters },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ownStringMiddleware),

  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
