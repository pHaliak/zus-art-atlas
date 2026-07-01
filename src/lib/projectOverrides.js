const STORAGE_KEY = "zus-art-atlas-project-overrides-v1";

export function loadProjectOverrides() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveProjectOverride(projectId, data) {
  const current = loadProjectOverrides();
  const next = {
    ...current,
    [projectId]: {
      ...(current[projectId] || {}),
      ...data,
      updatedAt: new Date().toISOString(),
    },
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function clearProjectOverride(projectId) {
  const current = loadProjectOverrides();
  delete current[projectId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  return current;
}

export function applyProjectOverrides(projects, overrides) {
  return projects.map((project) => {
    const override = overrides?.[project.id];
    if (!override) return project;
    return {
      ...project,
      ...override,
      id: project.id,
      studentImages: project.studentImages,
      source: project.source,
      colors: project.colors,
    };
  });
}
