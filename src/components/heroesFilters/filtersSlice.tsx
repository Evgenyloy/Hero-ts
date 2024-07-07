import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';
import { RootState } from '../../store';
import { IFilters } from '../../types/types';

const filterAdapter = createEntityAdapter<IFilters>();

const initialState = filterAdapter.getInitialState({
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
});

export const fetchFilters = createAsyncThunk<IFilters[]>(
  'filters/fetchFilters',
  () => {
    const { request } = useHttp();
    return request('http://localhost:3001/filters');
  }
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersChanged: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.filtersLoadingStatus = 'loading';
      })
      .addCase(
        fetchFilters.fulfilled,
        (state, action: PayloadAction<IFilters[]>) => {
          state.filtersLoadingStatus = 'idle';
          filterAdapter.setAll(state, action.payload);
        }
      )
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { filtersChanged } = actions;

export const { selectAll } = filterAdapter.getSelectors(
  (state: RootState) => state.filters
);
