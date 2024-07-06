export interface IInitialFilterState {
  filters: IFilters[];
  filtersLoadingStatus: string;
  activeFilter: string;
}

export interface IFilters {
  [key: string]: string;
}

const initialState: IInitialFilterState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
};

const filters = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case 'FILTERS_FETCHING':
      return {
        ...state,
        filtersLoadingStatus: 'loading',
      };
    case 'FILTERS_FETCHED':
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: 'idle',
      };
    case 'FILTERS_FETCHING_ERROR':
      return {
        ...state,
        filtersLoadingStatus: 'error',
      };
    case 'ACTIVE_FILTER_CHANGED':
      return {
        ...state,
        activeFilter: action.payload,
      };

    default:
      return state;
  }
};

export default filters;
