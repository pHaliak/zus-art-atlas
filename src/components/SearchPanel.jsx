import { Search } from "lucide-react";

const QUICK_SEARCHES = [
  "vianoce anjel",
  "vianoce betlehem",
  "vianoce keramika svietnik",
  "vianočná pohľadnica ornament",
  "zimná krajina maľba",
];

export function SearchPanel({ query, setQuery, onSearch, onQuickSearch }) {
  return (
    <section className="search-panel">
      <h1>Čo dnes učíš?</h1>
      <div className="searchbox">
        <Search size={22} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") onSearch();
          }}
        />
        <button onClick={onSearch}>Nájsť</button>
      </div>
      <div className="quick-actions">
        {QUICK_SEARCHES.map((item) => (
          <button key={item} onClick={() => onQuickSearch(item)}>
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}
