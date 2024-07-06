import { useHttp } from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';

import {
  heroDeleted,
  fetchHeroes,
  filteredHeroesSelector,
} from '../heroesList/heroesSlice';

import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';
import { IHeroes } from '../../types/types';

import { useAppSelector, useAppDispatch } from '../../hooks/hook';

const HeroesList = () => {
  const filteredHeroes = useAppSelector(filteredHeroesSelector);
  const heroesLoadingStatus = useAppSelector(
    (state) => state.heroes.heroesLoadingStatus
  );

  const dispatch = useAppDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchHeroes());

    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback((id: string) => {
    request(`http://localhost:3001/heroes/${id}`, 'DELETE')
      .then((data) => console.log(data, 'Deleted'))
      .then((data) => dispatch(heroDeleted(id)))
      .catch((err) => console.log(err));
  }, []);

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr: IHeroes[]) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }
    return arr.map(({ id, ...props }) => {
      return (
        <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)} />
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
