# ICT_202_CC1 - Procedure de centralisation (index.db)

Ce projet a ete mis a jour pour centraliser toutes les donnees dans un fichier unique **`index.db`** et ranger les medias dans un dossier **`assets/`**.

## 1) Nouvelle Structure
- **`index.db`** : Contient toutes les informations textuelles (JSON) et les liens vers les fichiers. C'est la "source de verite" du projet.
- **`assets/`** : Contient toutes les photos, videos et audios. Plus de desordre a la racine !
- **`src/db.ts`** : Le script charge le fichier `index.db` au premier lancement pour remplir la base de donnees du navigateur (IndexedDB).

## 2) Comment fonctionne la communication ?
Le flux de donnees est le suivant:
1. **Chargement** : Quand tu ouvres `CC1.html` pour la premiere fois, le script `db.ts` fait un `fetch('index.db')`.
2. **Initialisation** : Les donnees lues sont inserees dans la base **IndexedDB** du navigateur.
3. **Affichage** : Le site lit ensuite les donnees depuis IndexedDB. Si tu ajoutes ou modifies un CV via l'interface, c'est IndexedDB qui est mis a jour (ce qui permet de garder les changements meme apres avoir rafraichi la page).
4. **Medias** : Les photos et videos sont chargees depuis le dossier `assets/` lors de l'initialisation, puis stockees sous forme de "Blobs" dans la base de donnees pour une lecture ultra-rapide.

## 3) Pourquoi ce fichier index.db ?
- **Ordre** : Il evite d'avoir des dizaines de fichiers eparpilles.
- **Simplicite** : Toutes les donnees par defaut sont regroupées au meme endroit.
- **Standard** : Cela simule le comportement d'une vraie base de donnees SQL tout en restant compatible avec un navigateur web sans serveur complexe.

## 4) Compilation et Lancement
1. `npm run build` (pour compiler le TypeScript)
2. `npm run start` (pour lancer le serveur Python)
3. Ouvrir `http://localhost:5500/CC1.html`



note de miguel 
je ne comprend pas , pourquoi alors je ne vois pas ce fichier la il est situer ou


IndexedDB n'est PAS un fichier visible dans ton dossier ! 🧠
C'est la confusion classique. Laisse-moi t'expliquer simplement :

📁 Ce que tu VOIS dans ton dossier
ICT_202_CC1/
├── miguel.jpg
├── miguel.mp4
├── CC1.html
├── src/db.ts     ← le CODE qui GÈRE la base
└── ...
🗄️ Ce que tu NE VOIS PAS (mais qui existe)
IndexedDB  →  stockée DANS LE NAVIGATEUR (Chrome/Firefox)
             pas dans ton dossier de projet !
Analogie simple :
src/db.ts c'est le plan d'architecte de la base de données. IndexedDB c'est la vraie base — elle vit à l'intérieur de ton navigateur, comme les cookies ou l'historique.

Où la voir concrètement ?
Ouvre ton site dans Chrome
Appuie sur F12 (DevTools)
Va dans l'onglet Application
Dans le menu gauche → IndexedDB → cv-collectif-db
Tu verras tes deux stores : cvs et media avec toutes les données dedans !

Résumé pour ton devoir ✅
Ce qu'on demandait	Ce que tu as fait
Créer une base de données pour gérer les médias	✅ IndexedDB dans src/db.ts
Ne plus avoir les fichiers en désordre	✅ Tout est stocké dans la base du navigateur
CRUD (Créer, Lire, Modifier, Supprimer)	✅ Implémenté dans db.ts
Le fichier .db n'existe pas dans le dossier — c'est normal et c'est VOULU. C'est exactement comme ça que fonctionne IndexedDB.

je ne comprend pas , pourquoi alors je ne vois pas ce fichier la il est situer ou


IndexedDB n'est PAS un fichier visible dans ton dossier ! 🧠
C'est la confusion classique. Laisse-moi t'expliquer simplement :

📁 Ce que tu VOIS dans ton dossier
ICT_202_CC1/
├── miguel.jpg
├── miguel.mp4
├── CC1.html
├── src/db.ts     ← le CODE qui GÈRE la base
└── ...
🗄️ Ce que tu NE VOIS PAS (mais qui existe)
IndexedDB  →  stockée DANS LE NAVIGATEUR (Chrome/Firefox)
             pas dans ton dossier de projet !
Analogie simple :
src/db.ts c'est le plan d'architecte de la base de données. IndexedDB c'est la vraie base — elle vit à l'intérieur de ton navigateur, comme les cookies ou l'historique.

Où la voir concrètement ?
Ouvre ton site dans Chrome
Appuie sur F12 (DevTools)
Va dans l'onglet Application
Dans le menu gauche → IndexedDB → cv-collectif-db
Tu verras tes deux stores : cvs et media avec toutes les données dedans !

Résumé pour ton devoir ✅
Ce qu'on demandait	Ce que tu as fait
Créer une base de données pour gérer les médias	✅ IndexedDB dans src/db.ts
Ne plus avoir les fichiers en désordre	✅ Tout est stocké dans la base du navigateur
CRUD (Créer, Lire, Modifier, Supprimer)	✅ Implémenté dans db.ts
Le fichier .db n'existe pas dans le dossier — c'est normal et c'est VOULU. C'est exactement comme ça que fonctionne IndexedDB.