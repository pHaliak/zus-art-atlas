export function createMockImage(title, colors = ["#d9822b", "#b94e2f", "#f0b43c", "#6b3f1d"]) {
  const circles = colors
    .map((color, index) => {
      const x = 90 + index * 110;
      const y = 150 + (index % 2) * 70;
      return `<circle cx="${x}" cy="${y}" r="74" fill="${color}" opacity=".9"/>`;
    })
    .join("");

  const safeTitle = String(title).replace(/[<>&]/g, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620">
    <rect width="900" height="620" fill="#fff8ef"/>
    <rect x="55" y="55" width="790" height="510" rx="52" fill="#f4eadf"/>
    ${circles}
    <path d="M95 405 C210 280, 330 475, 460 350 S670 305, 805 415" fill="none" stroke="#2e6b5f" stroke-width="22" stroke-linecap="round" opacity=".72"/>
    <text x="78" y="525" font-family="Arial" font-size="52" font-weight="700" fill="#2b2723">${safeTitle}</text>
  </svg>`;

  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
