import { SafeImage } from "./SafeImage";

export function ProjectCard({ project, onSelect, active }) {
  const cover = project.studentImages?.[0];

  return (
    <button className={active ? "project-card active" : "project-card"} onClick={() => onSelect(project)}>
      <SafeImage src={cover} title={project.title} colors={project.colors} />
      <div>
        <h3>{project.title}</h3>
        <p>{project.grade} · {project.technique} · {project.duration}</p>
        <small>{project.studentImages?.length || 0} fotiek · {project.methodSeries}</small>
      </div>
    </button>
  );
}
