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
    project.title, project.grade, project.stage, project.month, project.methodSeries, project.learningGoal,
    project.theme, project.technique, project.duration, project.difficulty, project.tools?.join(" "),
    project.procedure?.join(" "),
    project.artists?.map((artist) => [artist.name, artist.works?.join(" "), artist.note].join(" ")).join(" ")
  ].join(" "));
}

export function searchProjects(projects, query) {
  const normalizedQuery = normalizeText(query);
  const ignored = new Set(["rocnik", "dnes", "ucim", "chcem", "tema", "technika", "pre", "hodina"]);
  const words = normalizedQuery.split(/\s+/).filter((word) => word.length > 1 && !ignored.has(word));

  return projects
    .map((project) => {
      const text = projectSearchText(project);
      let score = 0;
      for (const word of words) if (text.includes(word)) score += 3;

      for (const grade of ["1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
        if (normalizedQuery.includes(grade) && project.grade.includes(`${grade}.`)) score += 12;
      }

      if (normalizedQuery.includes("prv") && project.grade.includes("1.")) score += 12;
      if (normalizedQuery.includes("druh") && project.grade.includes("2.")) score += 12;
      if (normalizedQuery.includes("tret") && project.grade.includes("3.")) score += 12;
      if (normalizedQuery.includes("stvrt") && project.grade.includes("4.")) score += 12;
      if (normalizedQuery.includes("piat") && project.grade.includes("5.")) score += 12;

      if (normalizedQuery.includes("malba") && normalizeText(project.technique).includes("malba")) score += 10;
      if (normalizedQuery.includes("kolaz") && normalizeText(project.technique).includes("kolaz")) score += 10;
      if (normalizedQuery.includes("kresba") && normalizeText(project.technique).includes("kresba")) score += 10;

      return { project, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.project);
}
