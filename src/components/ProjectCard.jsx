import { createMockImage } from "../lib/mockImage";

export function ProjectCard({ project, onSelect }) {
  return (
    <button className="project-card" onClick={() => onSelect(project)}>
      <img src={createMockImage(project.title, project.colors)} alt="" />
      <div>
        <h3>{project.title}</h3>
        <p>{project.grade} · {project.technique} · {project.duration}</p>
        <small>{project.methodSeries}</small>
      </div>
    </button>
  );
}
