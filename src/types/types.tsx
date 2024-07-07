export interface IHeroes {
  id: string;
  name: string;
  description: string;
  element: string;
}

export interface IInitialHeroState {
  heroes: IHeroes[];
  heroesLoadingStatus: string;
}

export interface IInitialFilterState {
  filters: IFilters[];
  filtersLoadingStatus: string;
  activeFilter: string;
}

export interface IFilters {
  name: string;
  label: string;
  className: string;
  id: string;
}
