import { create } from 'zustand';
export const pageStore = create((set) => ({
  page: 1,
  setPage: (newPage) =>
    set((state) => {
      return {
        ...state,
        page: newPage,
      };
    }),
}));

export const searchStore = create((set) => ({
  search: '',
  setSearch: (searchs) =>
    set((state) => {
      return {
        ...state,
        search: searchs,
      };
    }),
}));
