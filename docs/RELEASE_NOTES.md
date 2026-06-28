# Release Notes – v0.2.3.1 Graphics Fix

## Oprava
- Odstránená závislosť referenčných náhľadov od externého API.
- Pridaný bezpečný komponent `SafeImage`.
- Ak sa reálna fotografia nenačíta, zobrazí sa lokálny náhradný vizuál.
- Referenčné diela teraz používajú stabilné lokálne náhľady.

## Prečo
Vo verzii v0.2.3 sa stránka načítala, ale niektoré grafické časti sa nemuseli zobraziť kvôli externým obrázkom alebo cestám k súborom po deployi.
