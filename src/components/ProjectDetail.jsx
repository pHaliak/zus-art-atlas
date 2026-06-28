import { Image, Palette, Plus, Printer, Star } from "lucide-react";
import { createMockImage } from "../lib/mockImage";

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

export function ProjectDetail({ project, isFavorite, onToggleFavorite }) {
  const mainImage = createMockImage(project.title, project.colors, 0);
  const studentGallery = Array.from({ length: 8 }).map((_, index) =>
    createMockImage(`${project.title} · práca ${index + 1}`, index % 2 ? [...project.colors].reverse() : project.colors, index)
  );
  const referenceGallery = project.artists.map((artist, index) =>
    createMockImage(`${artist.name}`, project.colors, index + 4)
  );

  return (
    <main className="project-detail">
      <section className="hero">
        <img src={mainImage} alt="" />
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
          <p className="goal">🎯 {project.goal}</p>
          <div className="actions">
            <button onClick={() => window.print()}><Printer size={18} /> Tlačiť</button>
            <button className={isFavorite ? "secondary favorite-on" : "secondary"} onClick={() => onToggleFavorite(project.id)}>
              <Star size={18} /> {isFavorite ? "Obľúbené" : "Uložiť"}
            </button>
            <button className="secondary"><Plus size={18} /> Pridať práce</button>
          </div>
        </div>
      </section>

      <section className="two-col">
        <article className="panel">
          <h3>Pomôcky</h3>
          <ul>{project.materials.map((tool) => <li key={tool}>{tool}</li>)}</ul>
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
        <h3>Referenční autori a diela</h3>
        {project.artists.map((artist) => (
          <div className="artist" key={artist.name}>
            <b>{artist.name}</b>
            <span>{artist.works.join(" · ")}</span>
            <p>{artist.note}</p>
          </div>
        ))}
      </article>

      <section className="panel">
        <h3><Image size={20} /> Referenčné náhľady</h3>
        <div className="image-grid">
          {referenceGallery.map((src) => <img src={src} alt="" key={src} />)}
        </div>
        <p className="hint">Zatiaľ ilustračné náhľady. V ďalších verziách ich nahradia open-access diela a tvoje obrazové zdroje.</p>
      </section>

      <section className="panel">
        <h3><Palette size={20} /> Náhľady žiackych prác</h3>
        <div className="image-grid">
          {studentGallery.map((src) => <img src={src} alt="" key={src} />)}
        </div>
        <p className="hint">Pripravené miesto pre tvoje reálne fotografie vianočných prác.</p>
      </section>

      <section className="standard">
        <b>Väzba na učivo:</b> {project.standard}
      </section>
    </main>
  );
}
