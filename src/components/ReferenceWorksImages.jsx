import { useEffect, useState } from "react";
import { createMockImage } from "../lib/mockImage";

const cache = new Map();

async function fetchCommonsImage(query) {
  if (cache.has(query)) return cache.get(query);

  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrlimit: "1",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "650",
    format: "json",
    origin: "*",
  });

  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params.toString()}`);
  if (!response.ok) throw new Error("Commons failed");

  const data = await response.json();
  const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
  const page = pages.find((item) => item?.imageinfo?.[0]?.thumburl || item?.imageinfo?.[0]?.url);

  if (!page) {
    cache.set(query, null);
    return null;
  }

  const info = page.imageinfo[0];
  const result = {
    title: page.title?.replace(/^File:/, "") || query,
    image: info.thumburl || info.url,
    source: "Wikimedia Commons",
    url: info.descriptionurl,
    license: info.extmetadata?.LicenseShortName?.value || "",
  };

  cache.set(query, result);
  return result;
}

function ReferenceImageCard({ work, project, index }) {
  const [remote, setRemote] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    setStatus("loading");

    fetchCommonsImage(work.query || `${work.artist} ${work.title}`)
      .then((result) => {
        if (!active) return;
        setRemote(result);
        setStatus(result ? "ready" : "fallback");
      })
      .catch(() => {
        if (!active) return;
        setStatus("fallback");
      });

    return () => {
      active = false;
    };
  }, [work.query, work.artist, work.title]);

  const fallback = createMockImage(`${work.artist} · ${work.title}`, project.colors, index + 10);
  const image = remote?.image || fallback;

  return (
    <article className="reference-image-card">
      <img src={image} alt="" loading="lazy" />
      <div>
        <b>{work.title}</b>
        <span>{work.artist}</span>
        <p>{work.note}</p>

        {status === "loading" && <small>Načítavam obrázok z otvorenej knižnice...</small>}

        {remote ? (
          <>
            <small>{remote.source}{remote.license ? ` · ${remote.license}` : ""}</small>
            {remote.url && <a href={remote.url} target="_blank" rel="noreferrer">Otvoriť zdroj obrázka</a>}
          </>
        ) : (
          status !== "loading" && <small>Náhradný lokálny náhľad. Obrázok z knižnice sa nenašiel alebo nenačítal.</small>
        )}
      </div>
    </article>
  );
}

export function ReferenceWorksImages({ project }) {
  const works = project.referenceWorks || [];
  if (!works.length) return null;

  return (
    <section className="panel">
      <h3>Referenčné diela autorov</h3>
      <div className="reference-image-grid">
        {works.map((work, index) => (
          <ReferenceImageCard key={`${work.artist}-${work.title}-${index}`} work={work} project={project} index={index} />
        ))}
      </div>
      <p className="hint">
        Obrázky sa načítavajú z otvorených verejných knižníc cez Wikimedia Commons. Ak sa náhľad nepodarí nájsť, aplikácia zobrazí bezpečný lokálny náhradný vizuál.
      </p>
    </section>
  );
}
