import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import classNames from 'classnames';

import { filtersChanged, fetchFilters, selectAll } from './filtersSlice';
import store from '../../store';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
  const filters = selectAll(store.getState());

  const activeFilter = useAppSelector((state) => state.filters.activeFilter);
  const filtersLoadingStatus = useAppSelector(
    (state) => state.filters.filtersLoadingStatus
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
    // eslint-disable-next-line
  }, []);

  if (filtersLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderFilters = (arr: any[]) => {
    if (arr?.length === 0) {
      return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
    }

    return arr?.map(({ name, className, label }) => {
      const btnClass = classNames('btn', className, {
        active: name === activeFilter,
      });

      return (
        <button
          key={name}
          id={name}
          className={btnClass}
          onClick={() => dispatch(filtersChanged(name))}
        >
          {label}
        </button>
      );
    });
  };

  const elements = renderFilters(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{elements}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
