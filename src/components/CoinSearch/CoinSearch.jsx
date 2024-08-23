import React, { useState } from 'react';
import { searchStore } from '../../state/pageStore';

const CoinSearch = ({ data, page }) => {
  //   const [search, setSearch] = useState('');
  const { search, setSearch } = searchStore();
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

//   const filteredData = data?.filter((coin) => {
//     const result = coin.name
//       .toLowerCase()
//       .includes(search.toLowerCase().trim());
//     return result;
//   });
//   console.log(filteredData);

  return (
    <div className="w-full flex justify-end">
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        placeholder="Search coins"
        onChange={handleSearch}
        className="border px-2 py-1.5 rounded w-1/2"
      />
    </div>
  );
};

export default CoinSearch;
