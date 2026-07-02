import { useEffect } from "react";

export function ImageLightbox({
  image,
  images = [],
  currentIndex = 0,
  onClose,
  onNext,
  onPrevious,
}) {
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!image) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight" && hasMultipleImages) {
        event.preventDefault();
        onNext?.();
      }

      if (event.key === "ArrowLeft" && hasMultipleImages) {
        event.preventDefault();
        onPrevious?.();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("lightbox-open");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("lightbox-open");
    };
  }, [image, onClose, onNext, onPrevious, hasMultipleImages]);

  if (!image) return null;

  return (
    <div className="image-lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="image-lightbox-close" onClick={onClose} aria-label="Zavrieť obrázok">
        ×
      </button>

      {hasMultipleImages && (
        <button
          className="image-lightbox-nav image-lightbox-prev"
          onClick={(event) => {
            event.stopPropagation();
            onPrevious?.();
          }}
          aria-label="Predchádzajúca fotografia"
        >
          ‹
        </button>
      )}

      <img
        src={image}
        alt=""
        onClick={(event) => event.stopPropagation()}
      />

      {hasMultipleImages && (
        <button
          className="image-lightbox-nav image-lightbox-next"
          onClick={(event) => {
            event.stopPropagation();
            onNext?.();
          }}
          aria-label="Ďalšia fotografia"
        >
          ›
        </button>
      )}

      <div className="image-lightbox-hint">
        {hasMultipleImages ? `${currentIndex + 1} / ${images.length} · šípky ← → listujú · Esc zatvorí` : "Esc zatvorí náhľad"}
      </div>
    </div>
  );
}
