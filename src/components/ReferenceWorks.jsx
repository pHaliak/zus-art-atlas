import { createMockImage } from "../lib/mockImage";

function ReferenceCard({ work, project, index }) {
  const image = createMockImage(`${work.artist} · ${work.title}`, project.colors, index + 8);

  return (
    <article className="reference-card">
      <img src={image} alt="" />
      <div>
        <b>{work.title}</b>
        <span>{work.artist}</span>
        <p>{work.why}</p>
        <small>Lokálny bezpečný náhľad. Reálne open-access obrázky doplníme v ďalšej verzii po overení zdrojov.</small>
      </div>
    </article>
  );
}

export function ReferenceWorks({ project }) {
  const works = project.referenceWorks || [];

  if (!works.length) {
    return null;
  }

  return (
    <section className="panel">
      <h3>Referenčné diela autorov</h3>
      <div className="reference-grid">
        {works.map((work, index) => (
          <ReferenceCard key={`${work.artist}-${work.title}`} work={work} project={project} index={index} />
        ))}
      </div>
      <p className="hint">
        V tejto opravnej verzii používame stabilné lokálne náhľady, aby sa grafika zobrazila na každom zariadení.
      </p>
    </section>
  );
}
