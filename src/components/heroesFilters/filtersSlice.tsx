import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';
import { RootState } from '../../store';
import { IFilters } from '../../types/types';

export interface IInitialFiltersState {
  filtersLoadingStatus: string;
  activeFilter: string;
  id: number;
  entities: IFilters[];
}

const filterAdapter = createEntityAdapter<IInitialFiltersState>();

const initialState = filterAdapter.getInitialState({
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
});
console.log(initialState);

export const fetchFilters = createAsyncThunk('filters/fetchFilters', () => {
  const { request } = useHttp();
  return request('http://localhost:3001/filters');
});

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.filtersLoadingStatus = 'loading';
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filtersLoadingStatus = 'idle';
        filterAdapter.setAll(state, action.payload);
      })
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
