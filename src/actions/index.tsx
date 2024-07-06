import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
} from '../components/heroesList/heroesSlice';

import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
} from '../components/heroesFilters/filtersSlice';
//Heroes ---------------------------------------------------

export const fetchHeroes = (request: any) => (dispatch: any) => {
  dispatch(heroesFetching());
  request('http://localhost:3001/heroes')
    .then((data: any) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

//filters -------------------------------------------------------------

export const fetchFilters = (request: any) => (dispatch: any) => {
  dispatch(filtersFetching());
  request('http://localhost:3001/filters')
    .then((data: any) => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError()));
};
