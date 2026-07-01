import { useRef, useState } from "react";
import { Palette, Plus, Printer, Star } from "lucide-react";
import { createMockImage } from "../lib/mockImage";
import { ImageLightbox } from "./ImageLightbox";
import { ProjectCmsEditor } from "./ProjectCmsEditor";
import { addLocalStudentWorks, clearLocalStudentWorks, filesToDataUrls, loadLocalStudentWorks } from "../lib/localStudentWorks";
import { clearHiddenProjectImages, hideProjectImage, loadHiddenProjectImages, unhideProjectImage } from "../lib/hiddenProjectImages";

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function TabButton({ active, onClick, children }) {
  return <button className={active ? "tab-button active" : "tab-button"} onClick={onClick}>{children}</button>;
}

export function ProjectDetail({ project, isFavorite, onToggleFavorite, onSaveProjectOverride, onResetProjectOverride }) {
  const [tab, setTab] = useState("tema");
  const [selectedImage, setSelectedImage] = useState(null);
  const [localStudentWorks, setLocalStudentWorks] = useState(() => loadLocalStudentWorks());
  const [hiddenProjectImages, setHiddenProjectImages] = useState(() => loadHiddenProjectImages());
  const fileInputRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const addedImages = localStudentWorks[project.id] || [];
  const allStudentImages = [...(project.studentImages || []), ...addedImages];
  const hiddenImages = hiddenProjectImages[project.id] || [];
  const visibleStudentImages = allStudentImages.filter((src) => !hiddenImages.includes(src));
  const hiddenCount = hiddenImages.length;
  const addedCount = addedImages.length;
  const mainImage = visibleStudentImages[0] || createMockImage(project.title, project.colors, 0);

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


  async function handleAddWorks(event) {
    const files = event.target.files;
    if (!files?.length) return;

    try {
      const images = await filesToDataUrls(files);
      if (images.length) {
        setLocalStudentWorks(addLocalStudentWorks(project.id, images));
        setTab("inspiracia");
      }
    } finally {
      event.target.value = "";
    }
  }

  function handleClearAddedWorks() {
    if (window.confirm("Odstrániť lokálne pridané práce z tejto témy?")) {
      setLocalStudentWorks(clearLocalStudentWorks(project.id));
    }
  }


  function handleHideImage(imageSrc) {
    if (window.confirm("Skryť túto fotografiu z galérie?")) {
      setHiddenProjectImages(hideProjectImage(project.id, imageSrc));
      if (selectedImage === imageSrc) {
        setSelectedImage(null);
      }
    }
  }

  function handleRestoreImage(imageSrc) {
    setHiddenProjectImages(unhideProjectImage(project.id, imageSrc));
  }

  function handleRestoreAllHiddenImages() {
    if (window.confirm("Obnoviť všetky skryté fotografie v tejto téme?")) {
      setHiddenProjectImages(clearHiddenProjectImages(project.id));
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
            <input ref={fileInputRef} className="hidden-file-input" type="file" accept="image/*" multiple onChange={handleAddWorks} />
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
            {visibleStudentImages.map((src) => (
              <div className="gallery-image-wrap" key={src}>
                <button className="gallery-image-button" onClick={() => setSelectedImage(src)} aria-label="Otvoriť obrázok na celý displej">
                  <img src={src} alt="" loading="lazy" />
                </button>
                <button className="hide-photo-button" onClick={() => handleHideImage(src)} title="Skryť fotografiu">
                  Skryť
                </button>
              </div>
            ))}
          </div>
          <div className="gallery-footer"><p className="hint">Fotografie boli zaradené podľa názvu súboru a popisu. Lokálne pridané: {addedCount} · Skryté: {hiddenCount}</p><div className="gallery-footer-actions">{addedCount > 0 && <button className="danger-secondary small-button" onClick={handleClearAddedWorks}>Odstrániť lokálne pridané</button>}{hiddenCount > 0 && <button className="secondary small-button" onClick={handleRestoreAllHiddenImages}>Obnoviť skryté</button>}</div></div>
        
          {hiddenCount > 0 && (
            <details className="hidden-photos-panel">
              <summary>Skryté fotografie ({hiddenCount})</summary>
              <div className="hidden-photos-grid">
                {hiddenImages.map((src) => (
                  <div className="hidden-photo-item" key={src}>
                    <img src={src} alt="" loading="lazy" />
                    <button className="secondary small-button" onClick={() => handleRestoreImage(src)}>Obnoviť</button>
                  </div>
                ))}
              </div>
            </details>
          )}
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
