import { useState } from "react";
import { createMockImage } from "../lib/mockImage";

export function SafeImage({ src, alt = "", title = "Náhľad", colors, variant = 0, className = "" }) {
  const [failed, setFailed] = useState(false);
  const fallback = createMockImage(title, colors, variant);

  return (
    <img
      className={className}
      src={!src || failed ? fallback : src}
      alt={alt}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}
