import { useMemo, useState } from "react";
import { Header } from "./components/Header";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectDetail } from "./components/ProjectDetail";
import { SearchPanel } from "./components/SearchPanel";
import { projects } from "./data/projects";
import { searchProjects } from "./lib/search";
import "./styles/app.css";

export function App() {
  const [query, setQuery] = useState("1. ročník, jeseň, maľba");
  const results = useMemo(() => searchProjects(projects, query), [query]);
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  function handleSearch() {
    setSelectedProject(results[0] || projects[0]);
  }

  function handleQuickSearch(value) {
    setQuery(value);
    setSelectedProject(searchProjects(projects, value)[0] || projects[0]);
  }

  return (
    <div className="app">
      <Header />

      <SearchPanel
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        onQuickSearch={handleQuickSearch}
      />

      <section className="workspace">
        <aside className="results">
          <h2>Najlepšie návrhy</h2>
          {results.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
          ))}
        </aside>

        <ProjectDetail project={selectedProject} />
      </section>
    </div>
  );
}
