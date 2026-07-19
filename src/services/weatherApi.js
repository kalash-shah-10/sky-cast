const GEO_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_BASE_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * Search a city and return its location details
 */
export const searchCity = async (city) => {
  const response = await fetch(
    `${GEO_BASE_URL}?name=${encodeURIComponent(city)}&count=1`
  );

  if (!response.ok) {
    throw new Error("Failed to search city.");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found.");
  }

  return data.results[0];
};

/**
 * Get weather using latitude & longitude
 */
export const getWeather = async (latitude, longitude) => {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),

    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",

    hourly:
      "temperature_2m,weather_code,precipitation_probability",

    forecast_hours: "24",
  });

  const response = await fetch(
    `${WEATHER_BASE_URL}?${params}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data.");
  }

  return await response.json();
};