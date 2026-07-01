import { useState } from "react";
import { Palette, Plus, Printer, Star } from "lucide-react";
import { createMockImage } from "../lib/mockImage";
import { ReferenceWorksText } from "./ReferenceWorksText";

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function TabButton({ active, onClick, children }) {
  return (
    <button className={active ? "tab-button active" : "tab-button"} onClick={onClick}>
      {children}
    </button>
  );
}

export function ProjectDetail({ project, isFavorite, onToggleFavorite }) {
  const [tab, setTab] = useState("tema");
  const mainImage = project.studentImages?.[0] || createMockImage(project.title, project.colors, 0);

  return (
    <main className="project-detail">
      <section className="hero">
        <img src={mainImage} alt="" />

        <div className="hero-text">
          <div className="eyebrow">{project.methodSeries}</div>
          <h2>{project.title}</h2>

          <div className="meta">
            <Pill>{project.themeCategory}</Pill>
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

          <section className="standard">
            <b>Väzba na učivo:</b> {project.standard}
          </section>
        </>
      )}

      {tab === "inspiracia" && (
        <>
          <ReferenceWorksText project={project} />

          <section className="panel">
            <h3><Palette size={20} /> Reálne práce žiakov</h3>
            <div className="image-grid real-gallery">
              {(project.studentImages || []).map((src) => (
                <img src={src} alt="" key={src} loading="lazy" />
              ))}
            </div>
            <p className="hint">Fotografie boli automaticky priradené podľa názvu súboru.</p>
          </section>
        </>
      )}

      {tab === "skusenosti" && (
        <section className="panel experience-panel">
          <h3>Moje skúsenosti</h3>
          <div className="experience-card">
            <b>Zatiaľ pripravené na dopĺňanie</b>
            <p>Táto záložka bude slúžiť na tvoje krátke poznámky po realizácii hodiny.</p>
            <ul>
              <li>Rok realizácie</li>
              <li>Krátka poznámka, čo fungovalo</li>
              <li>Čo zmeniť nabudúce</li>
              <li>Hodnotenie témy ⭐⭐⭐⭐⭐</li>
              <li>Fotky z konkrétnej realizácie</li>
            </ul>
          </div>
          <button className="secondary disabled-button" disabled>+ Pridať realizáciu — pripravujeme</button>
          <p className="hint">Vo v1.1 túto záložku iba testujeme ako stabilnú súčasť rozhrania. Ukladanie údajov pridáme až v ďalšej verzii.</p>
        </section>
      )}
    </main>
  );
}
