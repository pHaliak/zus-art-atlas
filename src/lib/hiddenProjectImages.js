const STORAGE_KEY = "zus-art-atlas-hidden-project-images-v1";

export function loadHiddenProjectImages() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function hideProjectImage(projectId, imageSrc) {
  const current = loadHiddenProjectImages();
  const existing = current[projectId] || [];

  if (existing.includes(imageSrc)) {
    return current;
  }

  const next = {
    ...current,
    [projectId]: [...existing, imageSrc],
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function unhideProjectImage(projectId, imageSrc) {
  const current = loadHiddenProjectImages();
  const existing = current[projectId] || [];

  const nextImages = existing.filter((item) => item !== imageSrc);
  const next = {
    ...current,
    [projectId]: nextImages,
  };

  if (!nextImages.length) {
    delete next[projectId];
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function clearHiddenProjectImages(projectId) {
  const current = loadHiddenProjectImages();
  delete current[projectId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  return current;
}
