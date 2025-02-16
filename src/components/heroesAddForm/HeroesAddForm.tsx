import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../hooks/hook';
import { IHeroes } from '../../types/types';
import { selectAll } from '../heroesFilters/filtersSlice';
import store from '../../store';
import { useCreateHeroMutation } from '../../api/apiSlice';

const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState('');
  const [heroDescr, setHeroDescr] = useState('');
  const [heroElement, setHeroElement] = useState('');
  const [createHero] = useCreateHeroMutation();

  const filters = selectAll(store.getState());
  const filtersLoadingStatus = useAppSelector(
    (state) => state.filters.filtersLoadingStatus
  );

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newHero: IHeroes = {
      id: uuidv4(),
      name: heroName,
      description: heroDescr,
      element: heroElement,
    };
    createHero(newHero).unwrap();

    setHeroName('');
    setHeroDescr('');
    setHeroElement('');
  };

  const renderFilters = (filters: any[], status: string) => {
    if (status === 'loading') {
      return <option>Загрузка элементов</option>;
    } else if (status === 'error') {
      return <option>Ошибка загрузки</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        if (name === 'all') return;

        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          value={heroName}
          onChange={(e) => setHeroName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: '130px' }}
          value={heroDescr}
          onChange={(e) => setHeroDescr(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          value={heroElement}
          onChange={(e) => setHeroElement(e.target.value)}
        >
          <option value="">Я владею элементом...</option>
          {renderFilters(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
