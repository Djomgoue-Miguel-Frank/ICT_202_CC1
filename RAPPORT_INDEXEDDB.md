# Rapport Technique - CV Collectif

## 1) Objectif de la refonte

Le projet a ete transforme pour:

- Uniformiser tous les CV avec le style du CV de **NGOM JIMMY CORNEILLE**.
- Remplacer l'ancien JavaScript par du **TypeScript**.
- Ajouter un vrai CRUD:
  - Creer un CV depuis la page d'accueil (formulaire modal).
  - Modifier un CV depuis la page detail.
  - Supprimer un CV.
- Stocker les donnees texte **et medias (photo/video/audio)** dans **IndexedDB**.

## 2) Organisation finale des fichiers

- `CC1.html`  
  Page principale (liste des CV + bouton "Nouveau CV").

- `cv.html`  
  Page detail d'un CV, avec boutons "Modifier" et "Supprimer".

- `main.css`  
  Style de la page d'accueil et du modal de creation.

- `cv.css`  
  Style unifie des CV + modal d'edition.

- `src/db.ts`  
  Coeur IndexedDB (schema, seed initial, create/read/update/delete, medias).

- `src/main.ts`  
  Logique de la page d'accueil (affichage liste, creation, suppression).

- `src/cv.ts`  
  Logique de la page detail (affichage, edition, suppression, langues FR/EN pour titres).

- `dist/*.js`  
  Fichiers JavaScript compiles depuis TypeScript (utilises par le navigateur).

- `miguel.html`, `faouz.html`, `jimmy2.html`, etc.  
  Redirections vers `cv.html?id=...` pour garder la compatibilite des anciens liens.

## 3) Principe IndexedDB utilise

### Nom de base

- DB: `cv-collectif-db`

### Stores

1. `cvs`  
   Contient les informations textuelles d'un CV:
   - nom, poste, role, matricule, contact, profil, loisirs
   - langues, formation, experiences, competences
   - references vers medias (`photoAssetId`, `videoAssetId`, `audioAssetId`)

2. `media`  
   Contient les fichiers multimedia sous forme de `Blob`:
   - `kind`: `photo` | `video` | `audio`
   - `blob`: contenu binaire
   - `cvId`: CV proprietaire
   - index: `byCvId` pour retrouver rapidement les medias d'un CV

## 4) Migration des CV existants

Au premier lancement:

1. `initializeDatabase()` verifie si `cvs` est vide.
2. Si vide, un **seed initial** est injecte avec les 8 membres actuels.
3. Les fichiers existants (`.jpg`, `.mp4`, `.mp3`) sont charges puis sauvegardes en `Blob` dans le store `media`.
4. Le CV stocke dans `cvs` ne pointe ensuite que vers les IDs media.

Consequence: l'application lit desormais les medias depuis IndexedDB, pas directement depuis les balises HTML statiques.

## 5) Flux CRUD (etape par etape)

### A) Creation d'un CV (page `CC1.html`)

1. Clic sur **Nouveau CV**.
2. Le modal s'ouvre.
3. L'utilisateur remplit les champs texte + choisit fichiers (optionnels).
4. `src/main.ts` transforme le formulaire en `CvUpsertInput`.
5. `createCv()` (dans `src/db.ts`) :
   - cree l'enregistrement du CV.
   - stocke les blobs des fichiers dans `media`.
   - conserve les IDs media dans le CV.

### B) Lecture / affichage

- Liste (`CC1.html`): `getAllCvs()` + photo chargee depuis `getMediaBlob()`.
- Detail (`cv.html?id=...`): `getCvById()` + chargement photo/video/audio depuis `media`.

### C) Modification (page `cv.html`)

1. Clic sur **Modifier le CV**.
2. Formulaire pre-rempli.
3. Si nouveau media choisi:
   - l'ancien media est supprime.
   - le nouveau blob est enregistre.
4. `updateCv()` met a jour les donnees texte + references media.

### D) Suppression

- Depuis accueil ou detail:
  - confirmation utilisateur
  - `deleteCv(id)` supprime le CV et les medias associes.

## 6) Chemins de navigation importants

- Accueil: `CC1.html`
- Detail CV: `cv.html?id=<id_du_cv>`
- Exemple:
  - `cv.html?id=ngom-joseph-jimmy-corneille`

## 7) TypeScript et compilation

Le navigateur execute `dist/*.js`.  
Le code source maintenable est dans `src/*.ts`.

Commandes:

```bash
npm install
npm run build
npm run start
```

Puis ouvrir:

`http://localhost:5500/CC1.html`

## 8) Important sur les medias

- Les **nouveaux** medias (creation/modification) sont stockes dans IndexedDB.
- Les medias historiques du projet sont importes dans IndexedDB au premier lancement.
- Une fois la migration validee sur vos machines, vous pouvez archiver les anciens fichiers media du dossier racine si vous ne voulez plus les conserver en source.
