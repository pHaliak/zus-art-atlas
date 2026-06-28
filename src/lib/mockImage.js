export function createMockImage(title, colors = ["#d9822b", "#b94e2f", "#f0b43c", "#6b3f1d"], variant = 0) {
  const shapes = colors.map((color, index) => {
    const x = 95 + index * 105 + variant * 7;
    const y = 155 + ((index + variant) % 2) * 66;
    const radius = 60 + ((index + variant) % 3) * 8;
    return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" opacity=".9"/>`;
  }).join("");

  const safeTitle = String(title).replace(/[<>&]/g, "");
  const star = variant % 2
    ? `<path d="M720 120l18 42 45 4-34 29 10 44-39-23-39 23 10-44-34-29 45-4z" fill="#f6d365" opacity=".9"/>`
    : `<path d="M690 125h80v80h-80z" fill="#fff4e6" opacity=".75" transform="rotate(18 730 165)"/>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620">
    <rect width="900" height="620" fill="#fff8ef"/>
    <rect x="55" y="55" width="790" height="510" rx="52" fill="#f4eadf"/>
    ${shapes}
    ${star}
    <path d="M95 410 C210 300, 330 470, 460 350 S670 310, 805 420" fill="none" stroke="#2e6b5f" stroke-width="22" stroke-linecap="round" opacity=".72"/>
    <text x="78" y="525" font-family="Arial" font-size="46" font-weight="700" fill="#2b2723">${safeTitle}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
