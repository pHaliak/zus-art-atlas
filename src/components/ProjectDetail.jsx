import { Image, Palette, Plus, Printer } from "lucide-react";
import { createMockImage } from "../lib/mockImage";

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

export function ProjectDetail({ project }) {
  const image = createMockImage(project.title, project.colors);
  const gallery = Array.from({ length: 6 }).map((_, index) =>
    createMockImage(`${project.title} ${index + 1}`, index % 2 ? [...project.colors].reverse() : project.colors)
  );

  return (
    <main className="project-detail">
      <section className="hero">
        <img src={image} alt="" />
        <div className="hero-text">
          <div className="eyebrow">{project.methodSeries}</div>
          <h2>{project.title}</h2>
          <div className="meta">
            <Pill>{project.grade}</Pill>
            <Pill>{project.month}</Pill>
            <Pill>{project.technique}</Pill>
            <Pill>{project.duration}</Pill>
            <Pill>{project.difficulty}</Pill>
          </div>
          <p className="goal">🎯 {project.learningGoal}</p>
          <div className="actions">
            <button onClick={() => window.print()}><Printer size={18} /> Tlačiť</button>
            <button className="secondary"><Plus size={18} /> Pridať práce</button>
          </div>
        </div>
      </section>

      <section className="two-col">
        <article className="panel">
          <h3>Pomôcky</h3>
          <ul>{project.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
        </article>
        <article className="panel">
          <h3>Motivácia</h3>
          <p>{project.motivation}</p>
        </article>
      </section>

      <article className="panel">
        <h3>Postup</h3>
        <ol>{project.procedure.map((step) => <li key={step}>{step}</li>)}</ol>
      </article>

      <article className="panel">
        <h3>Umelci a diela</h3>
        {project.artists.map((artist) => (
          <div className="artist" key={artist.name}>
            <b>{artist.name}</b>
            <span>{artist.works.join(" · ")}</span>
            <p>{artist.note}</p>
          </div>
        ))}
      </article>

      <section className="panel">
        <h3><Image size={20} /> Inšpiračné obrázky</h3>
        <div className="image-grid">
          {gallery.slice(0, 3).map((src) => <img src={src} alt="" key={src} />)}
        </div>
      </section>

      <section className="panel">
        <h3><Palette size={20} /> Koláž vytvorených prác</h3>
        <div className="image-grid">
          {gallery.map((src) => <img src={src} alt="" key={src} />)}
        </div>
      </section>

      <section className="standard">
        <b>Väzba na osnovy:</b> {project.standardLink}
      </section>
    </main>
  );
}
