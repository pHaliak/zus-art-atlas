import { useRef, useState } from "react";
import { Palette, Plus, Printer, Star } from "lucide-react";
import { createMockImage } from "../lib/mockImage";
import { ImageLightbox } from "./ImageLightbox";
import { ProjectCmsEditor } from "./ProjectCmsEditor";
import { filesToDataUrls } from "../lib/localStudentWorks";

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function TabButton({ active, onClick, children }) {
  return <button className={active ? "tab-button active" : "tab-button"} onClick={onClick}>{children}</button>;
}

export function ProjectDetail({ project, isFavorite, onToggleFavorite, onSaveProjectOverride, onResetProjectOverride }) {
  const [tab, setTab] = useState("tema");
  const [selectedImage, setSelectedImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const fileInputRef = useRef(null);
  const addedCount = (project.studentImages || []).filter((src) => String(src).startsWith("data:image/")).length;
  const mainImage = project.studentImages?.[0] || createMockImage(project.title, project.colors, 0);

  function handleSave(data) {
    onSaveProjectOverride(project.id, data);
    setEditing(false);
  }

  function handleReset() {
    if (window.confirm("Naozaj chceš vrátiť pôvodné údaje tejto témy?")) {
      onResetProjectOverride(project.id);
      setEditing(false);
    }
  }

  if (editing) {
    return (
      <main className="project-detail">
        <ProjectCmsEditor project={project} onSave={handleSave} onCancel={() => setEditing(false)} onReset={handleReset} />
      </main>
    );
  }

  return (
    <main className="project-detail">
      <section className="hero">
        <img src={mainImage} alt="" />
        <div className="hero-text">
          <div className="eyebrow">{project.methodSeries}</div>
          <div className="title-row">
            <h2>{project.title}</h2>
            <button className="secondary edit-meta-button" onClick={() => setEditing(true)}>✏️ Upraviť údaje</button>
          </div>
          <div className="meta">
            <Pill>{project.themeCategory}</Pill>
            <Pill>{project.grade}</Pill>
            <Pill>{project.month}</Pill>
            <Pill>{project.technique}</Pill>
            <Pill>{project.duration}</Pill>
            <Pill>{project.difficulty}</Pill>
          </div>
          <p className="goal">🎯 {project.shortDescription || project.goal}</p>
          <div className="actions">
            <button onClick={() => window.print()}><Printer size={18} /> Tlačiť</button>
            <button className={isFavorite ? "secondary favorite-on" : "secondary"} onClick={() => onToggleFavorite(project.id)}><Star size={18} /> {isFavorite ? "Obľúbené" : "Uložiť"}</button>
            <button className="secondary" onClick={() => fileInputRef.current?.click()}><Plus size={18} /> Pridať práce</button>
            <input ref={fileInputRef} className="hidden-file-input" type="file" accept="image/*" multiple onChange={handleFilesSelected} />
          </div>
        </div>
      </section>

      <nav className="detail-tabs">
        <TabButton active={tab === "tema"} onClick={() => setTab("tema")}>Téma</TabButton>
        <TabButton active={tab === "inspiracia"} onClick={() => setTab("inspiracia")}>Inšpirácia</TabButton>
        <TabButton active={tab === "skusenosti"} onClick={() => setTab("skusenosti")}>Moje skúsenosti</TabButton>
      </nav>

      {tab === "tema" && (
        <>
          <section className="two-col">
            <article className="panel">
              <h3>Pomôcky</h3>
              <ul>{(project.materials || []).map((tool) => <li key={tool}>{tool}</li>)}</ul>
            </article>
            <article className="panel">
              <h3>Motivácia</h3>
              <p>{project.motivation}</p>
              {project.teacherNotes && <><h3>Metodické poznámky</h3><p>{project.teacherNotes}</p></>}
            </article>
          </section>
          <article className="panel">
            <h3>Postup</h3>
            <ol>{(project.procedure || []).map((step) => <li key={step}>{step}</li>)}</ol>
          </article>
          <section className="standard"><b>Väzba na učivo:</b> {project.standard}</section>
        </>
      )}

      {tab === "inspiracia" && (
        <section className="panel">
          <h3><Palette size={20} /> Reálne práce žiakov</h3>
          <div className="image-grid real-gallery">
            {(project.studentImages || []).map((src) => (
              <button className="gallery-image-button" key={src} onClick={() => setSelectedImage(src)} aria-label="Otvoriť obrázok na celý displej">
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
          <p className="hint">Fotografie boli zaradené podľa názvu súboru a popisu.</p>
        </section>
      )}

      {tab === "skusenosti" && (
        <section className="panel experience-panel">
          <h3>Moje skúsenosti</h3>
          <div className="experience-card">
            <b>Pripravené na ďalší krok</b>
            <p>Tu budú tvoje krátke poznámky po realizácii hodiny.</p>
          </div>
          <button className="secondary disabled-button" disabled>+ Pridať realizáciu — pripravujeme</button>
        </section>
      )}

      <ImageLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </main>
  );
}
