const STORAGE_KEY = "zus-art-atlas-local-student-works-v1";

export function loadLocalStudentWorks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function addLocalStudentWorks(projectId, newImages) {
  const current = loadLocalStudentWorks();
  const existing = current[projectId] || [];
  const next = {
    ...current,
    [projectId]: [...existing, ...newImages],
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function clearLocalStudentWorks(projectId) {
  const current = loadLocalStudentWorks();
  delete current[projectId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  return current;
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
