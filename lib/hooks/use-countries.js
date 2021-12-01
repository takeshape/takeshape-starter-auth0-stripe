import { useState, useEffect } from 'react';
import { get } from 'lib/utils/fetcher';

function useCountries() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getCountries() {
      const { data } = await get('https://countriesnow.space/api/v0.1/countries/states');
      const countries = data.map((c) => ({
        ...c,
        // Not correct, but mostly works...
        iso2: c.iso3.slice(0, 2)
      }));
      setData(countries);
    }

    getCountries();
  }, []);

  return data;
}

export default useCountries;
