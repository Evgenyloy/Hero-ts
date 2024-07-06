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

const initialState: IInitialHeroState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

const heroes = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading',
      };
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: 'idle',
      };
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error',
      };
    case 'HERO_CREATED':
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };
    case 'HERO_DELETED':
      return {
        ...state,
        heroes: state.heroes.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default heroes;
