export function ReferenceWorksText({ project }) {
  const works = project.referenceWorks || [];

  if (!works.length) {
    return null;
  }

  return (
    <article className="panel">
      <h3>Referenčné diela autorov</h3>
      <div className="reference-text-list">
        {works.map((work) => (
          <div className="artist" key={`${work.artist}-${work.title}`}>
            <b>{work.artist}</b>
            <span>{work.title}</span>
            <p>{work.note}</p>
          </div>
        ))}
      </div>
      <p className="hint">V tejto stabilnej verzii sú referencie zatiaľ textové. Obrázky diel pridáme až po overení stabilných open-access zdrojov.</p>
    </article>
  );
}
