import {
  Cloud,
  CloudRain,
  CloudSun,
  Sun,
  Moon,
} from "lucide-react";

const HourCard = ({ time, temp, condition }) => {
  const getWeatherIcon = () => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="text-yellow-400" size={38} />;

      case "cloudy":
        return <Cloud className="text-slate-300" size={38} />;

      case "partly cloudy":
        return <CloudSun className="text-yellow-400" size={38} />;

      case "rain":
        return <CloudRain className="text-blue-400" size={38} />;

      case "night":
        return <Moon className="text-slate-200" size={38} />;

      default:
        return <CloudSun className="text-sky-400" size={38} />;
    }
  };

  return (
    <div className="flex min-w-[120px] flex-col items-center rounded-2xl border border-slate-700 bg-slate-800/60 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg hover:shadow-sky-500/10">
      {getWeatherIcon()}

      <p className="mt-4 text-sm font-medium text-slate-400">
        {time}
      </p>

      <h2 className="mt-2 text-2xl font-bold text-white">
        {temp}°
      </h2>
    </div>
  );
};

export default HourCard;