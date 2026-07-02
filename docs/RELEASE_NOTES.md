# Release Notes – v1.2.13.1 Dependency FIX

## Oprava
- Zachované zmeny z v1.2.13: nová téma **Krajinka / plstenie** s 20 fotkami.
- Opravené závislosti v `package.json`:
  - odstránené `latest`,
  - verzie knižníc sú pripnuté na stabilné konkrétne verzie,
  - vygenerovaný čistý `package-lock.json`.

## Prečo
Vercel sa zasekával na `Installing dependencies...`. Toto eliminuje riziko problémov s cache a priebežne meniacimi sa `latest` verziami balíkov.

## Kontrola
- Lokálny `npm install`: OK
- Lokálny `npm run build`: OK
- Projekt `real-krajinka-plstenie`: nájdený
- Fotografie v databáze: 20
- Fyzické JPG súbory: 20
- Chýbajúce súbory: 0

## Odporúčaný commit
`v1.2.13.1 Dependency Fix`
