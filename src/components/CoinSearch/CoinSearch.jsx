import React, { useEffect, useCallback } from 'react';
import { searchStore } from '../../state/pageStore';
import { useQuery } from 'react-query';
import { fetchAllData } from '../../services/fetchAllCoinData';
import store from '../../state/store';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';

const CoinSearch = () => {
  const navigate = useNavigate();
  const { search, setSearch } = searchStore();
  const { currency } = store();

  const { data, error, isLoading } = useQuery(
    ['allCoins', currency],
    () => fetchAllData(currency),
    {
      cacheTime: 1000 * 60 * 2,
      staleTime: 1000 * 60 * 2,
    }
  );

  const debouncedSearch = useCallback(
    debounce((value) => setSearch(value), 300),
    [setSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    debouncedSearch(e.target.value);
    search('')
  };

  const filteredData = data?.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  if (error) {
    return <div>Something went wrong!!</div>;
  }
  const handleRedirect = (id) => {
    setSearch('');
    navigate(`/details/${id}`);
  };
  return (
    <div className="w-full flex justify-end">
      <div className="relative w-1/2">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search coins"
          onChange={handleSearch}
          className="border px-2 py-1.5 rounded w-full"
        />
        {isLoading && search ? (
          <div className="absolute w-full mt-2 bg-white border rounded shadow-lg z-50 flex items-center justify-center py-4">
            <span>Loading...</span>
          </div>
        ) : (
          search &&
          filteredData && (
            <div className="absolute w-full mt-2 bg-white border rounded shadow-lg max-h-60 overflow-y-auto z-50">
              {filteredData.length > 0 ? (
                filteredData.map((coin) => (
                  <div
                    key={coin.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRedirect(coin.id)}
                  >
                    {coin.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No results found</div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CoinSearch;
