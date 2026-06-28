import { useEffect, useState } from "react";
import { createMockImage } from "../lib/mockImage";

async function fetchAicWork(query) {
  const searchUrl = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&query[term][is_public_domain]=true&limit=1&fields=id,title,artist_display,image_id,date_display`;
  const response = await fetch(searchUrl);
  if (!response.ok) throw new Error("AIC search failed");
  const data = await response.json();
  const item = data?.data?.[0];
  if (!item?.image_id) return null;

  return {
    title: item.title,
    artist: item.artist_display,
    date: item.date_display,
    image: `https://www.artic.edu/iiif/2/${item.image_id}/full/600,/0/default.jpg`,
    source: "Art Institute of Chicago",
    url: `https://www.artic.edu/artworks/${item.id}`,
  };
}

function ReferenceCard({ work, project, index }) {
  const [remoteWork, setRemoteWork] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    fetchAicWork(work.query)
      .then((result) => {
        if (active) setRemoteWork(result);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [work.query]);

  const image = remoteWork?.image || createMockImage(work.artist, project.colors, index + 8);

  return (
    <article className="reference-card">
      <img src={image} alt="" />
      <div>
        <b>{remoteWork?.title || work.title}</b>
        <span>{remoteWork?.artist || work.artist}</span>
        {remoteWork?.date && <small>{remoteWork.date}</small>}
        <p>{work.why}</p>
        {remoteWork?.url ? (
          <a href={remoteWork.url} target="_blank" rel="noreferrer">Otvoriť zdroj</a>
        ) : (
          <small>{failed ? "Náhľad zo zdroja sa nepodarilo načítať." : "Načítavam open-access náhľad..."}</small>
        )}
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
      <p className="hint">Tieto náhľady sa načítavajú z open-access kolekcií. Ak sa niektorý obrázok nenačíta, aplikácia zobrazí náhradný vizuál.</p>
    </section>
  );
}
