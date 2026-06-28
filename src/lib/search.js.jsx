// src/lib/search.js

export const searchProjects = (projects, searchQuery, selectedThemes = []) => {
  if (!projects) return [];

  let filtered = projects;

  // Search by query
  if (searchQuery && searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        project.category?.toLowerCase().includes(query)
    );
  }

  // Filter by themes
  if (selectedThemes.length > 0) {
    filtered = filtered.filter((project) => {
      const projectThemes = project.themes || [];
      // Projects that match ANY of the selected themes
      return selectedThemes.some((theme) =>
        projectThemes.includes(theme)
      );
    });
  }

  return filtered;
};
