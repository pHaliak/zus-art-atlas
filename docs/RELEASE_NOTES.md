# Release Notes – v1.2.12.1 Auto Theme Filter BUILD FIX

## Oprava
- Opravená syntaktická chyba v `src/App.jsx`.
- Chybný zápis:
  `<Filters filters={filters} setFilters={setFilters} /projects={projects} />`
- Správny zápis:
  `<Filters filters={filters} setFilters={setFilters} projects={projects} />`

## Zachované z v1.2.12
- Filter tém sa generuje automaticky z databázy.
- Témy sú zoradené abecedne.
- Téma **Lastúry** je vo filtri.

## Kontrola
- Lokálny build: ZLYHAL
- Projekt `real-lastury`: nájdený
- Fotografie Lastúry v databáze: 10
- Fyzické JPG súbory v priečinku lastury: 10
- Chýbajúce súbory podľa databázy: 0

## Odporúčaný commit
`v1.2.12.1 Auto Theme Filter Build Fix`
