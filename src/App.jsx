import Navbar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import { useState } from "react";
import { searchCity, getWeather } from "./services/weatherApi";
import { getWeatherCondition } from "./utils/weatherCode";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateWeather = async (location) => {
    const data = await getWeather(location.latitude, location.longitude);

    const weatherData = {
      city: location.name,
      country: location.country,

      temp: Math.round(data.current.temperature_2m),

      condition: getWeatherCondition(data.current.weather_code),

      humidity: data.current.relative_humidity_2m,

      wind: Math.round(data.current.wind_speed_10m),

      feelsLike: Math.round(data.current.apparent_temperature),

      rainChance:
        data.hourly.precipitation_probability?.[0] ?? "--",

      updatedAt: "Now",
    };

    const forecastData = data.hourly.time.map((time, index) => ({
      time: new Date(time).toLocaleTimeString([], {
        hour: "numeric",
      }),

      temp: Math.round(data.hourly.temperature_2m[index]),

      condition: getWeatherCondition(data.hourly.weather_code[index]),

      rainChance:
        data.hourly.precipitation_probability?.[index] ?? "--",
    }));

    setWeather(weatherData);
    setForecast(forecastData);
  };

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError("");

      const location = await searchCity(city);

      await updateWeather(location);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const location = {
            name: "Current Location",
            country: "",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          await updateWeather(location);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Location permission denied.");
            break;

          case error.POSITION_UNAVAILABLE:
            setError("Location information unavailable.");
            break;

          case error.TIMEOUT:
            setError(
              "Location request timed out. Please search for a city instead."
            );
            break;

          default:
            setError("Unable to get your location.");
        }

        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar
        onSearch={handleSearch}
        onCurrentLocation={handleCurrentLocation}
      />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {loading && (
          <p className="text-center text-white">Loading...</p>
        )}

        {error && (
          <p className="mb-6 text-center text-red-500">{error}</p>
        )}

        {weather && <WeatherCard weather={weather} />}

        {forecast.length > 0 && (
          <Forecast forecast={forecast} />
        )}
      </main>
    </div>
  );
}

export default App;