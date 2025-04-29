import React, { useCallback, useState, useEffect, useMemo } from "react";
import Dashboard from "../components/Dashboard";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";

const Home = () => {
  const [countryCode, setCountryCode] = useState("");
  const [regionCode, setRegionCode] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoadedSessionData, setHasLoadedSessionData] = useState(false);

  const user = useSelector((state) => state.user.user);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const debounce = (func, delayTime) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delayTime);
    };
  };

  const fetchCities = useCallback(async () => {
    setLoading(true);
    setCities([]);

    const trimmedCountry = countryCode.trim().toUpperCase();
    const trimmedRegion = regionCode.trim().toUpperCase();

    if (!trimmedCountry || !trimmedRegion) {
      setLoading(false);
      return;
    }

    const headers = {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    };

    const limit = 10;
    let offset = 0;
    let hasMore = true;
    const allCities = [];

    while (hasMore) {
      const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${trimmedCountry}/regions/${trimmedRegion}/cities?limit=${limit}&offset=${offset}&sort=-population`;

      try {
        const response = await fetch(url, { headers });

        if (response.status === 429) {
          await delay(5000);
          continue;
        }

        if (!response.ok) {
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
        console.error("Error fetching cities:", error);
        hasMore = false;
      }
    }

    setCities(allCities);
    sessionStorage.setItem("cities", JSON.stringify(allCities));
    sessionStorage.setItem("countryCode", trimmedCountry);
    sessionStorage.setItem("regionCode", trimmedRegion);

    setLoading(false);
  }, [countryCode, regionCode]);

  const debouncedFetchCities = useMemo(
    () => debounce(fetchCities, 1000),
    [fetchCities]
  );

  const handleSearchClick = () => {
    debouncedFetchCities();
  };

  // on login/logout reset everything
  useEffect(() => {
    if (!user) {
      setCountryCode("");
      setRegionCode("");
      setCities([]);
      sessionStorage.removeItem("cities");
      sessionStorage.removeItem("countryCode");
      sessionStorage.removeItem("regionCode");
      setHasLoadedSessionData(false);
    }
  }, [user]);

  // on page load, load from sessionStorage
  useEffect(() => {
    const savedCities = sessionStorage.getItem("cities");
    const savedCountryCode = sessionStorage.getItem("countryCode");
    const savedRegionCode = sessionStorage.getItem("regionCode");

    if (savedCities && savedCountryCode && savedRegionCode) {
      setCities(JSON.parse(savedCities));
      setCountryCode(savedCountryCode);
      setRegionCode(savedRegionCode);
    }
    setHasLoadedSessionData(true);
  }, []); // This effect runs once when the component is first mounted

  // when inputs are cleared (after initial load), reset cities too
  useEffect(() => {
    if (hasLoadedSessionData && !countryCode && !regionCode) {
      setCities([]);
      sessionStorage.removeItem("cities");
      sessionStorage.removeItem("countryCode");
      sessionStorage.removeItem("regionCode");
    }
  }, [countryCode, regionCode, hasLoadedSessionData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 px-4 sm:px-6 lg:px-8 py-2 mt-0">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl px-6 py-2 sm:px-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-8">
          🌆 City Explorer
        </h1>

        <p className="text-center text-lg text-gray-600 mb-4">
          Please enter the <strong>country</strong> and <strong>region</strong>{" "}
          codes of the place you want to explore.
        </p>

        {/* Country and Region Code Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country Code (e.g., IN, US)
            </label>
            <input
              type="text"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter country code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Region Code (e.g., RJ, CA)
            </label>
            <input
              type="text"
              value={regionCode}
              onChange={(e) => setRegionCode(e.target.value.toUpperCase())}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Enter region code"
            />
          </div>
        </div>

        {/* Add professional line while loading */}
        {loading && (
          <p className="text-center text-base font-semibold lg:text-lg lg:font-bold mb-4 bg-gradient-to-r from-teal-500 via-indigo-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
            ⏳ Please bear with us as we search for the cities. It might take a
            few moments. Thank you for your patience! 🌍
          </p>
        )}

        <div className="flex justify-center mb-8">
          <button
            onClick={handleSearchClick}
            disabled={loading}
            className={`w-1/3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-4 py-3 rounded-lg shadow-md hover:opacity-90 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            🔍 {loading ? "Searching..." : "Search Cities"}
          </button>
        </div>

        {/* Conditionally render the SearchBar only when needed */}
        {!countryCode || !regionCode ? (
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 ">
              Don't know the country/region code? You can search for it or ask
              for help!
            </p>
            <SearchBar />
          </div>
        ) : null}

        <Dashboard cities={cities} loading={loading} />
      </div>
    </div>
  );
};

export default Home;
