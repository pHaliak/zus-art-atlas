// src/components/ReferenceWorks.jsx
import React, { useState, useEffect } from 'react';
import './ReferenceWorks.css';

const ReferenceWorks = ({ projectTitle }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const CACHE_KEY = `aic_artworks_${projectTitle}`;
  const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setArtworks(data);
          setLoading(false);
          return;
        }
      }

      try {
        // Art Institute of Chicago API
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(projectTitle)}&limit=12&fields=id,title,image_id,artist_display,date_display`
        );

        if (!response.ok) throw new Error('API error');

        const data = await response.json();
        const works = data.data || [];

        // Cache the results
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: works,
            timestamp: Date.now(),
          })
        );

        setArtworks(works);
      } catch (err) {
        setError('Unable to load reference artworks');
        console.error('AIC API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (projectTitle) {
      fetchArtworks();
    }
  }, [projectTitle, CACHE_KEY]);

  if (loading) {
    return (
      <div className="reference-works">
        <h3>Reference Artworks</h3>
        <div className="loading-skeleton">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton-item"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || artworks.length === 0) {
    return (
      <div className="reference-works">
        <h3>Reference Artworks</h3>
        <p className="no-results">{error || 'No reference artworks found'}</p>
      </div>
    );
  }

  const itemsPerPage = 4;
  const totalPages = Math.ceil(artworks.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayedArtworks = artworks.slice(startIdx, startIdx + itemsPerPage);

  const getImageUrl = (imageId) => {
    return imageId
      ? `https://www.artic.edu/iiif/2/${imageId}/full/400,/0/default.jpg`
      : null;
  };

  return (
    <div className="reference-works">
      <h3>Reference Artworks from Art Institute of Chicago</h3>

      <div className="artworks-grid">
        {displayedArtworks.map((artwork) => {
          const imageUrl = getImageUrl(artwork.image_id);
          return (
            <div key={artwork.id} className="artwork-card">
              {imageUrl ? (
                <img src={imageUrl} alt={artwork.title} />
              ) : (
                <div className="no-image">No image available</div>
              )}
              <div className="artwork-info">
                <h4>{artwork.title}</h4>
                {artwork.artist_display && (
                  <p className="artist">{artwork.artist_display}</p>
                )}
                {artwork.date_display && (
                  <p className="date">{artwork.date_display}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default ReferenceWorks;
