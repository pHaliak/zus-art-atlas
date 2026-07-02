import { getAtlasPhotoCount } from "../data/atlasStats";
export function Header(){return <header className="topbar"><div className="logo">A</div><div><strong>ZUŠ Art Atlas</strong><span>v1.2.12.1 · Build Fix FIX</span></div>  <div className="atlas-photo-count">Databáza obsahuje <strong>{photoCount}</strong> žiackych prác</div>
</header>}