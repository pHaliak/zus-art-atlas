const STORAGE_KEY = "zus-art-atlas-local-student-works-v1";

export function loadLocalStudentWorks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveLocalStudentWorks(projectId, images) {
  const current = loadLocalStudentWorks();
  const next = {
    ...current,
    [projectId]: images,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function addLocalStudentWorks(projectId, newImages) {
  const current = loadLocalStudentWorks();
  const existing = current[projectId] || [];
  const nextImages = [...existing, ...newImages];
  return saveLocalStudentWorks(projectId, nextImages);
}

export function clearLocalStudentWorks(projectId) {
  const current = loadLocalStudentWorks();
  delete current[projectId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  return current;
}

export function applyLocalStudentWorks(projects, localWorks) {
  return projects.map((project) => {
    const added = localWorks?.[project.id] || [];
    if (!added.length) return project;
    return {
      ...project,
      studentImages: [...(project.studentImages || []), ...added],
    };
  });
}

export function filesToDataUrls(files) {
  const selected = Array.from(files || []).filter((file) => file.type.startsWith("image/"));

  return Promise.all(
    selected.map((file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      })
    )
  );
}
