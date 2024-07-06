//Heroes ---------------------------------------------------

export const fetchHeroes =
  (
    request: (
      url: any,
      method?: string | undefined,
      body?: any,
      headers?: {
        'Content-Type': string;
      }
    ) => Promise<any>
  ) =>
  (dispatch: any) => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
      .then((data: any) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));
  };

export const heroesFetching = () => {
  return {
    type: 'HEROES_FETCHING',
  };
};

export const heroesFetched = (heroes: any) => {
  return {
    type: 'HEROES_FETCHED',
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR',
  };
};

export const heroCreated = (hero: any) => {
  return {
    type: 'HERO_CREATED',
    payload: hero,
  };
};

export const heroDeleted = (id: string) => {
  return {
    type: 'HERO_DELETED',
    payload: id,
  };
};

//filters -------------------------------------------------------------

export const fetchFilters =
  (
    request: (
      url: any,
      method?: string | undefined,
      body?: any,
      headers?: {
        'Content-Type': string;
      }
    ) => Promise<any>
  ) =>
  (dispatch: any) => {
    dispatch(filtersFetching());
    request('http://localhost:3001/filters')
      .then((data: any) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
  };

export const filtersFetching = () => {
  return {
    type: 'FILTERS_FETCHED',
  };
};

export const filtersFetched = (filters: string) => {
  return {
    type: 'FILTERS_FETCHED',
    payload: filters,
  };
};

export const filtersFetchingError = () => {
  return {
    type: 'FILTERS_FETCHING_ERROR',
  };
};

export const activeFilterChanged = (filter: string) => {
  return {
    type: 'ACTIVE_FILTER_CHANGED',
    payload: filter,
  };
};
