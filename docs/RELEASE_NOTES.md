# Release Notes – v1.2.13.2 Vercel Install FIX

## Oprava
- Pridaný `.gitignore`.
- Odstránené `node_modules`, `dist` a `.vercel` z exportu.
- Vyčistený a nanovo vytvorený `package-lock.json`.
- Závislosti sú pripnuté na stabilné verzie:
  - React 18.3.1
  - React DOM 18.3.1
  - Vite 5.4.11
  - @vitejs/plugin-react 4.3.4
  - lucide-react 0.468.0

## Prečo
Vercel sa zasekával na kroku `Installing dependencies...`. Táto verzia čistí závislosti a cache artefakty, ktoré tam nemajú byť.

## Kontrola
- Lokálne `npm install`: OK
- Lokálne `npm run build`: OK
- Krajinka / plstenie – fotky v databáze: 20
- Krajinka / plstenie – fyzické JPG súbory: 20
- Chýbajúce súbory: 0

## Dôležité pri nasadení
Po rozbalení ZIP-u musíš v GitHub Desktop vidieť aj vymazanie prípadného `node_modules`, ak bol v repozitári omylom commitnutý.

## Odporúčaný commit
`v1.2.13.2 Vercel Install FIX`
