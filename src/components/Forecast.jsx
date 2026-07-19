import HourCard from "./HourCard";

const Forecast = ({ forecast }) => {
  return (
    <section className="mx-auto mt-10 w-full max-w-5xl rounded-3xl border border-slate-700/50 bg-slate-800/40 p-6 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            24 Hour Forecast
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Weather outlook for the next 24 hours
          </p>
        </div>
      </div>

      {/* Scrollable Cards */}
      <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
        {forecast.map((hour, index) => (
          <HourCard
            key={index}
            time={hour.time}
            temp={hour.temp}
            condition={hour.condition}
          />
        ))}
      </div>
    </section>
  );
};

export default Forecast;