/* src/components/ReferenceWorks.css */

.reference-works {
  margin-top: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.reference-works h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.artworks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.artwork-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.artwork-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.artwork-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.no-image {
  width: 100%;
  height: 200px;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.9rem;
}

.artwork-info {
  padding: 1rem;
}

.artwork-info h4 {
  font-size: 0.95rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
  min-height: 2.6em;
}

.artwork-info .artist {
  font-size: 0.85rem;
  color: #555;
  margin: 0.25rem 0;
  font-style: italic;
}

.artwork-info .date {
  font-size: 0.8rem;
  color: #888;
  margin: 0.25rem 0 0 0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.pagination button {
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

.pagination button:hover:not(:disabled) {
  background: #2980b9;
}

.pagination button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  opacity: 0.6;
}

.pagination span {
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.95rem;
}

.loading-skeleton {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.skeleton-item {
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  height: 280px;
  border-radius: 10px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.no-results {
  color: #7f8c8d;
  text-align: center;
  padding: 2rem;
  font-size: 1rem;
}
