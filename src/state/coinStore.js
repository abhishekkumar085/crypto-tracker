import { useQuery } from 'react-query';
import { create } from 'zustand';
import { fetchCoinData } from '../services/fetchCoinData';
import { searchStore } from './pageStore';

export const useCoinStore = create((set, get) => ({
  data: null,
  isLoading: false,
  isError: false,
  error: null,
  setCoinData: (data) => set({ data }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (isError, error = null) => set({ isError, error }),

  filteredData: () => {
    const { data } = get();
    console.log(data, 'ffififififif');
    const searchData = searchStore.getState().search.toLowerCase().trim();
    if (!data) return [];
    return data.filter((coin) => coin.name.toLowerCase().includes(searchData));
  },
}));

export const useFetchCoins = (page, currency) => {
  const { setCoinData, setLoading, setError } = useCoinStore();

  useQuery(['coins', page, currency], () => fetchCoinData(page, currency), {
    onSuccess: (data) => {
      console.log('Fetched Data:', data);
      setCoinData(data);
      setLoading(false);
    },
    onError: (error) => {
      setError(true, error);
      setLoading(false);
    },
    onSettled: () => setLoading(false),
    cacheTime: 1000 * 60 * 2,
    staleTime: 1000 * 60 * 2,
  });
};
