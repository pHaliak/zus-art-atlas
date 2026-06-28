// src/components/ProjectDetail.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReferenceWorks from './ReferenceWorks';
import './ProjectDetail.css';

const ProjectDetail = ({ projects }) => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(null);

  if (!project) {
    return <div className="project-detail-error">Project not found</div>;
  }

  const allImages = [project.coverImage, ...(project.additionalImages || [])].filter(
    Boolean
  );

  return (
    <div className="project-detail">
      <div className="project-header">
        <h1>{project.title}</h1>
        <p className="project-meta">
          {project.year} • {project.category}
        </p>
      </div>

      {/* Main Cover Image */}
      {project.coverImage && (
        <div className="cover-image-section">
          <img
            src={project.coverImage}
            alt={project.title}
            className="cover-image"
            onClick={() => setSelectedImage(project.coverImage)}
          />
          <p className="click-hint">Click to expand</p>
        </div>
      )}

      {/* Description */}
      {project.description && (
        <div className="project-description">
          <h2>About this project</h2>
          <p>{project.description}</p>
        </div>
      )}

      {/* Gallery */}
      {project.additionalImages && project.additionalImages.length > 0 && (
        <div className="gallery-section">
          <h2>Gallery</h2>
          <div className="gallery-grid">
            {project.additionalImages.map((image, index) => (
              <div
                key={index}
                className="gallery-item"
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt={`${project.title} ${index + 1}`} />
                <div className="overlay">
                  <span>View</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reference Works */}
      <ReferenceWorks projectTitle={project.title} />

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedImage(null)}>
              ✕
            </button>
            <img src={selectedImage} alt="Fullscreen" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
