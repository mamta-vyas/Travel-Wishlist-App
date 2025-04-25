import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DestinationDetails = () => {
  const location = useLocation();
  const { cityName, lat, lon } = location.state || {};

  const [weather, setWeather] = useState(null);
  const [images, setImages] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const mapRef = useRef(null);
  const leafletMap = useRef(null);

  // ✅ WeatherAPI Fetch
  const fetchWeather = async () => {
    const weatherApiKey = '0c40cb6e53e7910de0010ff49e45940e';
  
    if (!lat || !lon) {
      console.warn("Latitude or longitude is missing.");
      return;
    }
  
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
      );
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error('❌ Weather API Error:', err.message || err);
    }
  };
  
  // ✅ Unsplash Image Fetch
  const fetchImages = async () => {
    const unsplashKey = 'du-zw8KiJ1MFdENQO82AV5Is9kCt9eJSbe-Eg8wNsa8';
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${cityName}&client_id=${unsplashKey}`
      );
      const data = await res.json();
      setImages(data.results || []);
    } catch (err) {
      console.error('❌ Unsplash API Error:', err);
    }
  };

  // ✅ Foursquare Fetch
  const fetchFoursquarePlaces = async () => {
    const fsqKey = 'fsq3KGNQkWc01jg02UE3dVoGsZV60XKg1NnPMBEiEB33v+8=';
    try {
      const res = await fetch(
        `https://api.foursquare.com/v3/places/search?ll=${lat},${lon}&radius=3000&limit=6`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: fsqKey,
          },
        }
      );
      const data = await res.json();
      setPlaces(data.results || []);
    } catch (err) {
      console.error('❌ Foursquare API Error:', err);
    }
  };

  // ✅ Fetch All Data on Load
  useEffect(() => {
    if (!lat || !lon || !cityName) return;

    const fetchAll = async () => {
      await Promise.all([
        fetchWeather(),
        fetchImages(),
        fetchFoursquarePlaces(),
      ]);
      setLoading(false);
    };

    fetchAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon, cityName]);

  // ✅ Leaflet Map Setup
  // Effect to initialize the map when lat or lon changes
  useEffect(() => {
    if (!lat || !lon) return;  // Don't proceed if lat or lon are missing

    // Check if the map container is available before initializing
    if (mapRef.current && !leafletMap.current) {
      // Initialize the map with the lat/lon
      leafletMap.current = L.map(mapRef.current).setView([lat, lon], 13);

      // Add tile layer for the map
      L.tileLayer('https://api.maptiler.com/maps/landscape/{z}/{x}/{y}@2x.png?key=DApIOe9jZnh4iAClke33', {
        tileSize: 512,
        zoomOffset: -1,
        attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      }).addTo(leafletMap.current);

      // Add a marker for the current location
      const marker = L.marker([lat, lon]).addTo(leafletMap.current);
      marker.bindPopup(`<b>You're here!</b><br>Lat: ${lat}, Lon: ${lon}`).openPopup();
    }

    // Cleanup map instance when component unmounts or lat/lon change
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [lat, lon]);  // Re-run effect when lat or lon changes


  if (loading) return <div className="text-center mt-10">Fetching data...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">{cityName}</h1>

      {/* Unsplash Images */}
      {images.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <img
                key={img.id}
                src={img.urls.small}
                alt={cityName}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        </section>
      )}

      {/* Weather Info */}
      {weather?.main && (
        <section className="bg-white rounded-lg p-6 shadow mb-8 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-blue-700">
                {weather.weather[0].main}
              </h3>
              <p className="text-gray-700 capitalize">
                {weather.weather[0].description}
              </p>
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="w-16 h-16"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
            <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
            <p><strong>Feels Like:</strong> {weather.main.feels_like}°C</p>
            <p><strong>Min Temp:</strong> {weather.main.temp_min}°C</p>
            <p><strong>Max Temp:</strong> {weather.main.temp_max}°C</p>
            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
          </div>
        </section>
      )}

      {/* Foursquare Nearby Places */}
      {places.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Nearby Places</h2>
          <ul className="space-y-4">
            {places.map((place) => (
              <li key={place.fsq_id} className="p-4 bg-white rounded shadow">
                <p><strong>Name:</strong> {place.name}</p>
                <p><strong>Category:</strong> {place.categories?.[0]?.name}</p>
                <p><strong>Distance:</strong> {place.distance} m</p>
                <p><strong>Address:</strong> {place.location?.formatted_address || place.location?.address}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Map */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">📍 Map View</h2>
        <div
          ref={mapRef}
          className="rounded-2xl border-4 border-blue-400 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
          style={{ height: '420px', width: '100%' }}
        ></div>
      </section>
    </div>
  );
};

export default DestinationDetails;
