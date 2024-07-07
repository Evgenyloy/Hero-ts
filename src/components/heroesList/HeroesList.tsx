import { useCallback, useMemo } from 'react';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';
import { IHeroes } from '../../types/types';
import { useAppSelector } from '../../hooks/hook';

const HeroesList = () => {
  const { data: heroes = [], isLoading, isError } = useGetHeroesQuery();

  const [deleteHero] = useDeleteHeroMutation();

  const activeFilter = useAppSelector((state) => state.filters.activeFilter);

  const filteredHeroes = useMemo(() => {
    const filteredHeroes = heroes.slice();

    if (activeFilter === 'all') {
      return filteredHeroes;
    } else {
      return filteredHeroes.filter(
        (item: IHeroes) => item.element === activeFilter
      );
    }
  }, [heroes, activeFilter]);

  const onDelete = useCallback((id: string) => {
    deleteHero(id);
  }, []);

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
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
