import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';
import { IHeroes } from '../../types/types';
import { RootState } from '../../store';

interface IInitialHeroState {
  heroesLoadingStatus: string;
  id: number;
}

const heroesAdapter = createEntityAdapter<IInitialHeroState>();
const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle',
});

const { selectAll } = heroesAdapter.getSelectors(
  (state: RootState) => state.heroes
);

export const filteredHeroesSelector = createSelector(
  (state: RootState) => state.filters.activeFilter,

  selectAll,
  (filter: string, heroes: any) => {
    if (filter === 'all') {
      return heroes;
    } else {
      return heroes.filter((item: IHeroes) => item.element === filter);
    }
  }
);

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', () => {
  const { request } = useHttp();
  return request('http://localhost:3001/heroes');
});

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroCreated: (state, action) => {
      heroesAdapter.addOne(state, action.payload);
    },
    heroDeleted: (state, action) => {
      heroesAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = 'loading';
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = 'idle';
        heroesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const { heroCreated, heroDeleted } = actions;
