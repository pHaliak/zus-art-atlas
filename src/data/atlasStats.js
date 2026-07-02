import { projects } from "./projects";

export function getAtlasPhotoCount() {
  return projects.reduce((total, project) => {
    const images = project.studentImages || project.images || [];
    return total + images.length;
  }, 0);
}
