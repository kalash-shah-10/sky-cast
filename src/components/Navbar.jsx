import SearchBar from "./SearchBar";
import { CloudSun, MapPin } from "lucide-react";

const Navbar = ({ onSearch, onCurrentLocation }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/80 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-sky-500 p-2 shadow-lg shadow-sky-500/20">
            <CloudSun className="text-white" size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-wide text-white">
              SkyCast
            </h1>
            <p className="text-xs text-slate-400">
              Real-time Weather Forecast
            </p>
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden flex-1 justify-center px-10 lg:flex">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onCurrentLocation}
            className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-sky-700 hover:shadow-lg hover:shadow-sky-500/30"
          >
            <MapPin size={18} />
            <span className="hidden sm:inline">My Location</span>
          </button>

          <div className="hidden items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 md:flex">
            <CloudSun className="text-yellow-400" size={18} />
            <span className="font-medium text-slate-200">
              Weather
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-6 pb-4 lg:hidden">
        <SearchBar onSearch={onSearch} />
      </div>
    </nav>
  );
};

export default Navbar;