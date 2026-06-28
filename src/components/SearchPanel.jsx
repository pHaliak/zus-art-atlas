import { Search } from "lucide-react";

const QUICK_SEARCHES = [
  "1. ročník jeseň maľba",
  "2. ročník ryby koláž",
  "3. ročník mesto kresba",
  "portrét emócia kresba",
  "zima maľba",
  "hudba abstrakcia maľba",
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

      <p>Výsledok nikdy nezostane prázdny. Aplikácia vždy zobrazí najbližšie vhodné návrhy.</p>
    </section>
  );
}
