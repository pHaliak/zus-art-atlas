import { grades, methodSeries, techniques, themes } from "../data/filters";

function Select({ label, value, options, onChange }) {
  return (
    <label>
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Všetko</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

export function Filters({ filters, setFilters }) {
  function update(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <section className="filters">
      <Select label="Téma" value={filters.theme} options={themes} onChange={(value) => update("theme", value)} />
      <Select label="Ročník" value={filters.grade} options={grades} onChange={(value) => update("grade", value)} />
      <Select label="Technika" value={filters.technique} options={techniques} onChange={(value) => update("technique", value)} />
      <Select label="Metodický rad" value={filters.methodSeries} options={methodSeries} onChange={(value) => update("methodSeries", value)} />
      <button className="reset" onClick={() => setFilters({ grade: "", technique: "", methodSeries: "", theme: "" })}>Vyčistiť</button>
    </section>
  );
}
