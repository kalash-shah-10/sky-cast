import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city.trim()) return;

    onSearch(city.trim());
    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl items-center gap-3"
    >
      <input
        type="text"
        placeholder="Search for a city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 rounded-xl border border-slate-600 bg-slate-800 px-5 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-sky-400"
      />

      <button
        type="submit"
        className="flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 font-medium text-white transition hover:bg-sky-600 active:scale-95"
      >
        <Search size={18} />
        Search
      </button>
    </form>
  );
};

export default SearchBar;