import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DestinationDetails = () => {
  const location = useLocation();
  const { cityName, lat, lon } = location.state || {};
  const navigate = useNavigate();
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
    if (!lat || !lon) return;
  
    // Add a delay before initializing the map
    const mapDelay = setTimeout(() => {
      if (mapRef.current && !leafletMap.current) {
        leafletMap.current = L.map(mapRef.current, {
          center: [lat, lon],
          zoom: 14,
          scrollWheelZoom: true,
          zoomControl: true,
          crs: L.CRS.EPSG3857,
        });
  
        L.tileLayer(
          'https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=DApIOe9jZnh4iAClke33',
          {
            attribution: '&copy; OpenStreetMap contributors &copy; MapTiler',
          }
        ).addTo(leafletMap.current);
      }
  
      if (leafletMap.current) {
        leafletMap.current.setView([lat, lon], 14);
        const marker = L.marker([lat, lon]).addTo(leafletMap.current);
        marker.bindPopup(`<b>You're here!</b><br>Lat: ${lat}, Lon: ${lon}`).openPopup();
  
        setTimeout(() => {
          leafletMap.current.invalidateSize();
        }, 300);
      }
    }, 3000); // Delay of 1000ms (1 second)
  
    return () => {
      clearTimeout(mapDelay); // Cleanup the timeout on component unmount or when lat/lon changes
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [lat, lon]);
  

  if (loading) return <div className="text-center mt-10">Fetching data...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back to Dashboard */}
      <button
        onClick={() => navigate('/')}
        className="mb-4 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        ← Back to Home
      </button>

      {/* City Header */}
      <h1 className="text-3xl font-bold text-pink-600">{cityName}</h1>

      {/* Images */}
      {images.length > 0 && (
        <section className="bg-gradient-to-br from-pink-50 to-red-100 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📸 City Views</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <img
                key={img.id}
                src={img.urls.small}
                alt={cityName}
                className="rounded-lg object-cover h-48 w-full hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </section>
      )}

      {/* Weather */}
      {weather?.main && (
        <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-blue-700">🌦️ Weather Info</h2>
          <div className="flex items-center gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather"
              className="w-16 h-16"
            />
            <div>
              <p className="text-lg font-semibold text-gray-800">{weather.weather[0].main}</p>
              <p className="text-gray-600 capitalize">{weather.weather[0].description}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-700 text-sm">
            <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
            <p><strong>Feels Like:</strong> {weather.main.feels_like}°C</p>
            <p><strong>Min Temp:</strong> {weather.main.temp_min}°C</p>
            <p><strong>Max Temp:</strong> {weather.main.temp_max}°C</p>
            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
          </div>
        </section>
      )}

      {/* Places */}
      {places.length > 0 && (
        <section className="bg-gradient-to-r from-[#e0f7fa] to-[#fce4ec] rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🏙️ Nearby Places</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {places.map((place) => (
              <li
                key={place.fsq_id}
                className="p-4 rounded-lg border border-gray-200 bg-white shadow hover:shadow-lg transition"
              >
                <p className="font-semibold text-gray-900">{place.name}</p>
                <p className="text-sm text-gray-600">{place.categories?.[0]?.name}</p>
                <p className="text-sm text-gray-600">Distance: {place.distance} m</p>
                <p className="text-sm text-gray-600">
                  {place.location?.formatted_address || place.location?.address}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Map */}
      <section className="mx-auto p-4">
  <h2 className="text-xl font-semibold text-gray-800 mb-3">📍 Map View</h2>
  <div
    ref={mapRef}
    className="w-full max-w-full h-72 sm:h-[500px] rounded-xl border-4 border-blue-300 shadow"
  />
</section>


    </div>
  );
};

export default DestinationDetails;
