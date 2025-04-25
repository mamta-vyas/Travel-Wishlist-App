// src/pages/Home.js
import React, { useCallback, useState } from 'react';
import Dashboard from '../components/Dashboard';

const Home = () => {
  const [countryCode, setCountryCode] = useState('');
  const [regionCode, setRegionCode] = useState('');
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [errorMsg, setErrorMsg] = useState('');

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchCities = useCallback(async () => {
    // setErrorMsg('');
    setLoading(true);
    setCities([]);
  
    if (!countryCode || !regionCode) {
      // setErrorMsg('Please enter both country and region codes.');
      setLoading(false);
      return;
    }
  
    const headers = {
      'X-RapidAPI-Key': '80f2f0b70emshf8305cb38b8b533p114677jsn6dbf87ae9f0f',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    };
  
    const limit = 10;
    let offset = 0;
    let hasMore = true;
    const allCities = [];
  
    while (hasMore) {
      const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}/regions/${regionCode}/cities?limit=${limit}&offset=${offset}&sort=-population`;
  
      try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
          console.error(`API Error (Status: ${response.status})`);
          // setErrorMsg(`API Error: ${response.status} - ${response.statusText}`);
          hasMore = false;
          break;
        }
  
        const result = await response.json();
        const newCities = result?.data ?? [];
  
        if (newCities.length === 0) {
          hasMore = false;
        } else {
          allCities.push(...newCities);
          offset += limit;
        }
  
        if (allCities.length >= 100) hasMore = false;
  
        await delay(1000);
      } catch (error) {
        console.error(`Error fetching cities:`, error);
        // setErrorMsg('An unexpected error occurred while fetching cities.');
        hasMore = false;
      }
    }
  
    setCities(allCities);
    setLoading(false);
  }, [countryCode, regionCode]);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchCities = useCallback(debounce(fetchCities, 1000), [countryCode, regionCode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">🌆 City Explorer</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country Code (e.g., IN, US)</label>
            <input
              type="text"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter country code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region Code (e.g., RJ, CA)</label>
            <input
              type="text"
              value={regionCode}
              onChange={(e) => setRegionCode(e.target.value.toUpperCase())}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter region code"
            />
          </div>
        </div>

        {/* ❌ Removed Error Message UI */}

        <div className="flex justify-center mb-6">
          <button
            onClick={debouncedFetchCities}
            disabled={loading}
            className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            🔍 {loading ? 'Searching...' : 'Search Cities'}
          </button>
        </div>

        <Dashboard cities={cities} loading={loading} />
      </div>
    </div>
  );
};

export default Home;
