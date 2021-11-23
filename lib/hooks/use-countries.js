import { useState, useEffect } from 'react';
import { get } from '../utils/fetcher';

function useCountries() {
  const [data, dataSet] = useState(null);

  useEffect(() => {
    async function getCountries() {
      const { data } = await get('https://countriesnow.space/api/v0.1/countries/states');
      const countries = data.map((c) => ({
        ...c,
        iso2: c.iso3.slice(0, 2)
      }));
      dataSet(countries);
    }

    getCountries();
  }, []);

  return data;
}

export default useCountries;
