import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudFog,
  Droplets,
  Wind,
  Umbrella,
  Thermometer,
  Clock,
  MapPin,
} from "lucide-react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Sunny":
        return <Sun size={90} className="mb-5 text-yellow-400 drop-shadow-lg" />;

      case "Partly Cloudy":
        return (
          <CloudSun
            size={90}
            className="mb-5 text-yellow-400 drop-shadow-lg"
          />
        );

      case "Cloudy":
        return <Cloud size={90} className="mb-5 text-slate-300 drop-shadow-lg" />;

      case "Rain":
        return (
          <CloudRain
            size={90}
            className="mb-5 text-blue-400 drop-shadow-lg"
          />
        );

      case "Snow":
        return (
          <Snowflake
            size={90}
            className="mb-5 text-cyan-300 drop-shadow-lg"
          />
        );

      case "Fog":
        return (
          <CloudFog
            size={90}
            className="mb-5 text-slate-400 drop-shadow-lg"
          />
        );

      case "Thunderstorm":
        return (
          <CloudLightning
            size={90}
            className="mb-5 text-yellow-300 drop-shadow-lg"
          />
        );

      default:
        return (
          <CloudSun
            size={90}
            className="mb-5 text-yellow-400 drop-shadow-lg"
          />
        );
    }
  };

  return (
    <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-800/40 p-8 shadow-2xl backdrop-blur-md">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left Section */}
        <div className="flex flex-col justify-center">
          <div className="mb-4 flex items-center gap-2 text-slate-300">
            <MapPin size={18} className="text-sky-400" />

            <span className="text-lg font-medium">
              {weather.city}
              {weather.country && `, ${weather.country}`}
            </span>
          </div>

          {getWeatherIcon(weather.condition)}

          <h1 className="text-6xl font-bold text-white">
            {weather.temp}°
          </h1>

          <p className="mt-2 text-2xl font-semibold text-slate-200">
            {weather.condition}
          </p>

          <div className="mt-6 flex items-center gap-2 text-slate-400">
            <Clock size={18} />

            <span>Updated {weather.updatedAt}</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-2 gap-5">
          <StatCard
            icon={<Droplets className="text-sky-400" size={24} />}
            title="Humidity"
            value={`${weather.humidity}%`}
          />

          <StatCard
            icon={<Wind className="text-cyan-400" size={24} />}
            title="Wind Speed"
            value={`${weather.wind} km/h`}
          />

          <StatCard
            icon={<Umbrella className="text-blue-400" size={24} />}
            title="Rain Chance"
            value={
              weather.rainChance === "--"
                ? "--"
                : `${weather.rainChance}%`
            }
          />

          <StatCard
            icon={<Thermometer className="text-red-400" size={24} />}
            title="Feels Like"
            value={`${weather.feelsLike}°`}
          />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, title, value }) => {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500">
      <div className="mb-4">{icon}</div>

      <p className="text-sm text-slate-400">{title}</p>

      <h3 className="mt-1 text-2xl font-semibold text-white">
        {value}
      </h3>
    </div>
  );
};

export default WeatherCard;