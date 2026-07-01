import { useEffect } from "react";

export function ImageLightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("lightbox-open");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("lightbox-open");
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div className="image-lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="image-lightbox-close" onClick={onClose} aria-label="Zavrieť obrázok">
        ×
      </button>
      <img
        src={image}
        alt=""
        onClick={(event) => event.stopPropagation()}
      />
      <div className="image-lightbox-hint">Esc zatvorí náhľad</div>
    </div>
  );
}
