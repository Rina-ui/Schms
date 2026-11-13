# ⚗ SCHMS

**Science & Chemistry Hands-on Molecular Simulator**
Un laboratoire de chimie virtuel et gamifié pour apprendre la chimie en manipulant, pas en mémorisant.

## Le problème

Beaucoup d'élèves peinent en chimie parce qu'ils doivent retenir des symboles, des formules et des équations sans comprendre comment elles se construisent.

## La solution

SCHMS met l'élève dans un vrai labo : il verse des réactifs dans des tubes à essai, les mélange, observe la réaction, puis équilibre lui-même l'équation-bilan avec un comptage d'atomes en direct.

## Fonctionnalités actuelles

- Étagère de 15 réactifs (H₂, O₂, N₂, Cl₂, C, S, Fe, Cu, Zn, Al, Mg, Ca, Na, K, Li)
- Deux tubes à essai et un mélange animé (tremblement, flash, fumée)
- 22 réactions pilotées par des données
- Équilibreur d'équations avec tableau de comptage des atomes (✓ / ✗)
- Vérification de la forme la plus simple des coefficients
- Missions, points d'expérience et niveaux

## Technologies

React · TypeScript · Vite · CSS

## Lancer le projet

```bash
npm install
npm run dev
```

## Structure
src/

├─ data/lab.ts réactifs, réactions, missions

├─ engine/chemistry.ts moteur chimique (indépendant de l’interface)

├─ components/ Bench, BalancePanel, Formula

├─ App.tsx

└─ App.css


Le moteur chimique est séparé de l'affichage : on peut changer le design sans toucher aux règles scientifiques.

## Ajouter une réaction

Dans `src/data/lab.ts` :

```ts
{ reactants: ["Ca", "O2"], products: ["CaO"], coefficients: [2, 1, 2] }
```

Puis la couleur du produit dans `productColors`.

## Feuille de route

- [ ] Mascotte-guide qui encourage et donne des indices
- [ ] Sons et effets propres à chaque réaction
- [ ] Constructeur moléculaire 3D
- [ ] Parcours collège et lycée alignés sur les programmes togolais
- [ ] Mode BEPC / BAC
- [ ] Comptes, progression et suivi pédagogique
- [ ] Mode hors-ligne

## Avertissement

Certaines réactions sont des simplifications pédagogiques. Les contenus doivent être validés par des enseignants avant un usage en classe.

## Licence
MIT.