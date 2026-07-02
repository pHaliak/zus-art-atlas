export const grades = ["1.–2. ročník", "1.–3. ročník", "2.–4. ročník", "3. ročník, 2. časť I. stupňa", "4.–6. ročník"];
export const techniques = ["kresba", "maľba", "koláž", "akryl", "kombinovaná technika"];
export const methodSeries = ["Farba", "Kompozícia", "Línia", "Tvar a farba", "Tvar a štruktúra", "Farba a kompozícia", "Kresba"];

function normalizeThemeLabel(value) {
  if (!value) return "";
  const text = Array.isArray(value) ? value.join(", ") : String(value);
  return text
    .split(",")[0]
    .trim()
    .replace(/^./u, (char) => char.toLocaleUpperCase("sk-SK"));
}

export function getThemesFromProjects(projects) {
  return Array.from(
    new Set(
      projects
        .map((project) => normalizeThemeLabel(project.themeCategory || project.category || project.theme || project.title))
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, "sk-SK", { sensitivity: "base" }));
}
