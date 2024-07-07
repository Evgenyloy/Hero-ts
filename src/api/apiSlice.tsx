import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IHeroes } from '../types/types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Heroes'],
  endpoints: (builder) => ({
    getHeroes: builder.query<IHeroes[], void>({
      query: () => '/heroes',
      providesTags: ['Heroes'],
    }),
    createHero: builder.mutation<IHeroes[], IHeroes>({
      query: (hero) => ({
        url: '/heroes',
        method: 'POST',
        body: hero,
      }),
      invalidatesTags: ['Heroes'],
    }),
    deleteHero: builder.mutation<IHeroes[], string>({
      query: (id) => ({
        url: `/heroes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Heroes'],
    }),
  }),
});

export const {
  useGetHeroesQuery,
  useCreateHeroMutation,
  useDeleteHeroMutation,
} = apiSlice;
