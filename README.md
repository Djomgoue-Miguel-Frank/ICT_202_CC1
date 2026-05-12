# ICT_202_CC1 - Procedure complete de refonte

Ce README explique toute la procedure utilisee pour transformer le projet initial (HTML/CSS/JS statique) en application CV dynamique avec TypeScript + IndexedDB.

## 1) Objectif du devoir

- Garder le rendu propre du CV modele (NGOM JIMMY CORNEILLE).
- Donner le meme style a tous les CV.
- Ajouter:
  - creation d'un CV (modal depuis l'accueil),
  - modification d'un CV (depuis sa page),
  - suppression d'un CV.
- Remplacer le JavaScript par TypeScript.
- Stocker les informations et medias (photo/video/audio) dans IndexedDB.

## 2) Audit initial du projet

Analyse des fichiers existants:

- Une page d'accueil: `CC1.html`.
- Plusieurs CV separes (`miguel.html`, `faouz.html`, `jimmy2.html`, etc.) avec styles differents.
- Plusieurs scripts JS separes (`miguel.js`, `faouz.js`, etc.).
- Medias dans le dossier racine (`.jpg`, `.mp4`, `.mp3`).

Conclusion de l'audit:

- Le projet etait fonctionnel mais non centralise.
- Pas de base de donnees navigateur.
- Pas de vrai CRUD global.

## 3) Choix techniques retenus

- **Frontend**: HTML + CSS.
- **Logique**: TypeScript compile vers JavaScript navigateur.
- **Stockage**: IndexedDB (2 stores: `cvs` et `media`).
- **Pages cibles**:
  - `CC1.html` pour la liste et creation.
  - `cv.html?id=...` pour lecture/modification/suppression.

## 4) Mise en place TypeScript

Etapes effectuees:

1. Initialisation npm:
```bash
npm init -y
```
2. Installation TypeScript:
```bash
npm install --save-dev typescript
```
3. Creation de `tsconfig.json` (sortie vers `dist/`).
4. Mise a jour `package.json`:
   - script `build`: `tsc`
   - script `start`: `python3 -m http.server 5500`

## 5) Conception de la base IndexedDB

Dans `src/db.ts`:

- DB: `cv-collectif-db`
- Store `cvs`:
  - infos texte d'un CV (nom, profil, contact, etc.)
  - references medias (`photoAssetId`, `videoAssetId`, `audioAssetId`)
- Store `media`:
  - blobs des fichiers (photo/video/audio)
  - index `byCvId`

Fonctions implementees:

- `initializeDatabase()`
- `getAllCvs()`, `getCvById()`
- `getMediaBlob()`
- `createCv()`, `updateCv()`, `deleteCv()`

## 6) Migration initiale des CV existants

Toujours dans `src/db.ts`:

- Creation d'un tableau seed avec les 8 membres existants.
- Au premier lancement:
  - si `cvs` est vide, insertion automatique des donnees.
  - lecture des anciens fichiers media (`jpg/mp4/mp3`) via `fetch`.
  - conversion en `Blob` et stockage dans `media`.
  - association des IDs media dans `cvs`.

## 7) Refonte de la page d'accueil

Nouveau `CC1.html` + `main.css` + `src/main.ts`:

- Affichage dynamique de la liste des CV depuis IndexedDB.
- Bouton `Nouveau CV`.
- Modal de creation avec formulaire complet.
- Suppression possible directement depuis la liste.
- Photo de chaque membre chargee depuis IndexedDB.

## 8) Refonte de la page detail CV

Nouveau `cv.html` + `cv.css` + `src/cv.ts`:

- Style unifie inspire du modele Jimmy.
- Lecture du CV via parametre URL: `cv.html?id=<id>`.
- Bouton `Modifier le CV` (modal pre-rempli).
- Bouton `Supprimer le CV`.
- Lecture des medias depuis IndexedDB (photo/video/audio).
- Boutons langue FR/EN pour les titres de section.

## 9) Compatibilite des anciens liens

Les anciens fichiers (`miguel.html`, `faouz.html`, `jimmy2.html`, etc.) ont ete convertis en redirections vers `cv.html?id=...` pour conserver les chemins historiques.

## 10) Nettoyage legacy

Suppression des anciens scripts JS:

- `elsonk.js`, `faouz.js`, `jimmy2.js`, `miguel.js`, `nibelle.js`

Suppression des anciens CSS devenus inutiles:

- `accueil.css`, `elsonk.css`, `faouz.css`, `jimmy2.css`, `kengne.css`, `kouawa.css`, `miguel.css`

## 11) Compilation et verification

Compilation TypeScript:

```bash
npm run build
```

Resultat:

- `dist/main.js`
- `dist/cv.js`
- `dist/db.js`

## 12) Execution locale

1. Installer:
```bash
npm install
```
2. Compiler:
```bash
npm run build
```
3. Lancer serveur:
```bash
npm run start
```
4. Ouvrir:
`http://localhost:5500/CC1.html`

## 13) Arborescence importante

- `CC1.html`: accueil + creation + suppression liste.
- `cv.html`: affichage/modification/suppression d'un CV.
- `main.css`: style accueil + modal creation.
- `cv.css`: style detail + modal edition.
- `src/db.ts`: couche IndexedDB.
- `src/main.ts`: logique accueil.
- `src/cv.ts`: logique detail.
- `dist/*.js`: code compile utilise par le navigateur.
- `RAPPORT_INDEXEDDB.md`: rapport technique complementaire.
- `EXPLICATION_CODE.md`: explication du code fonction par fonction.

## 14) Notes d'utilisation

- Les nouvelles creations/modifications ecrivent directement dans IndexedDB.
- Les medias ne sont plus pris depuis les balises HTML statiques, mais depuis la base navigateur.
- Si vous voulez rejouer la migration initiale, supprimez la base IndexedDB `cv-collectif-db` dans les outils navigateur puis rechargez la page.
