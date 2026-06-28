export function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[áä]/g, "a").replace(/č/g, "c").replace(/ď/g, "d").replace(/é/g, "e").replace(/í/g, "i")
    .replace(/[ľĺ]/g, "l").replace(/ň/g, "n").replace(/[óô]/g, "o").replace(/ŕ/g, "r")
    .replace(/š/g, "s").replace(/ť/g, "t").replace(/ú/g, "u").replace(/ý/g, "y").replace(/ž/g, "z")
    .replace(/[.,;:!?]/g, " ").replace(/\s+/g, " ").trim();
}

function projectSearchText(project) {
  return normalizeText([
    project.title, project.grade, project.month, project.methodSeries, project.area, project.goal,
    project.theme, project.technique, project.duration, project.difficulty, project.materials?.join(" "),
    project.procedure?.join(" "),
    project.artists?.map((artist) => [artist.name, artist.works?.join(" "), artist.note].join(" ")).join(" ")
  ].join(" "));
}

export function searchProjects(projects, query, filters = {}) {
  const normalizedQuery = normalizeText(query);
  const ignored = new Set(["rocnik", "dnes", "ucim", "chcem", "tema", "technika", "pre", "hodina", "minut"]);
  const words = normalizedQuery.split(/\s+/).filter((word) => word.length > 1 && !ignored.has(word));

  return projects
    .map((project) => {
      const text = projectSearchText(project);
      let score = 0;

      for (const word of words) {
        if (text.includes(word)) score += 3;
      }

      if (normalizedQuery.includes("vianoc")) score += text.includes("vianoce") ? 12 : 0;
      if (normalizedQuery.includes("zima")) score += text.includes("zima") ? 12 : 0;
      if (normalizedQuery.includes("anjel")) score += text.includes("anjel") ? 12 : 0;
      if (normalizedQuery.includes("betlehem")) score += text.includes("betlehem") ? 12 : 0;
      if (normalizedQuery.includes("keramika")) score += text.includes("keramika") ? 12 : 0;

      if (filters.grade && project.grade !== filters.grade) score -= 100;
      if (filters.technique && !normalizeText(project.technique).includes(normalizeText(filters.technique))) score -= 100;
      if (filters.methodSeries && project.methodSeries !== filters.methodSeries) score -= 100;

      return { project, score };
    })
    .filter((item) => item.score > -50)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.project);
}
