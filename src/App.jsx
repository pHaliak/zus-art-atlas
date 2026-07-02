import { useMemo, useState } from "react";
import { Header } from "./components/Header";
import { SearchPanel } from "./components/SearchPanel";
import { Filters } from "./components/Filters";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectDetail } from "./components/ProjectDetail";
import { projects } from "./data/projects";
import { searchProjects } from "./lib/search";
import { applyProjectOverrides, clearProjectOverride, loadProjectOverrides, saveProjectOverride } from "./lib/projectOverrides";
import "./styles/app.css";

export function App() {
  const [query, setQuery] = useState("kubizmus");
  const [filters, setFilters] = useState({ theme: "", grade: "", technique: "", methodSeries: "" });
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [projectOverrides, setProjectOverrides] = useState(() => loadProjectOverrides());

  const editableProjects = useMemo(
    () => applyProjectOverrides(projects, projectOverrides),
    [projectOverrides]
  );

  const results = useMemo(
    () => searchProjects(editableProjects, query, filters),
    [editableProjects, query, filters]
  );

  const [selectedProjectId, setSelectedProjectId] = useState(editableProjects[0]?.id);
  const selectedProject = editableProjects.find((project) => project.id === selectedProjectId) || results[0] || editableProjects[0];

  function handleSearch() {
    setSelectedProjectId((results[0] || editableProjects[0]).id);
  }

  function handleQuickSearch(value) {
    setQuery(value);
    const found = searchProjects(editableProjects, value, filters)[0] || editableProjects[0];
    setSelectedProjectId(found.id);
  }

  function toggleFavorite(id) {
    setFavoriteIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function handleSaveProjectOverride(projectId, data) {
    setProjectOverrides(saveProjectOverride(projectId, data));
  }

  function handleResetProjectOverride(projectId) {
    setProjectOverrides(clearProjectOverride(projectId));
  }

  return (
    <div className="app">
      <Header />
      <SearchPanel query={query} setQuery={setQuery} onSearch={handleSearch} onQuickSearch={handleQuickSearch} />
      <Filters filters={filters} setFilters={setFilters} /projects={projects} />
      <section className="workspace">
        <aside className="results">
          <h2>Najlepšie návrhy</h2>
          <p className="count">{results.length} projektov · reálne galérie</p>
          {results.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={(item) => setSelectedProjectId(item.id)} active={project.id === selectedProject.id} />
          ))}
        </aside>
        <ProjectDetail
          project={selectedProject}
          isFavorite={favoriteIds.includes(selectedProject.id)}
          onToggleFavorite={toggleFavorite}
          onSaveProjectOverride={handleSaveProjectOverride}
          onResetProjectOverride={handleResetProjectOverride}
        />
      </section>
    </div>
  );
}
