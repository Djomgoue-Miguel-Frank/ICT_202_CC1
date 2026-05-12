const DB_NAME = "cv-collectif-db";
const DB_VERSION = 1;
const CVS_STORE = "cvs";
const MEDIA_STORE = "media";
const MEDIA_CV_ID_INDEX = "byCvId";
const DEFAULT_SEED_DATA = [
    {
        id: "djomgoue-miguel-frank",
        fullName: "DJOMGOUE MIGUEL FRANK",
        headline: "ETUDIANT",
        groupRole: "Chef du groupe (Numero 41)",
        matricule: "24H2449",
        city: "Yaounde",
        country: "Cameroun",
        email: "djomgouemiguel@gmail.com",
        phone: "+237 657560037",
        profile: "Je suis etudiant a l'Universite de Yaounde I, faculte des sciences, filiere ICT4D, specialite securite des systemes informatiques.",
        hobbies: "Football, course de vitesse, cuisine camerounaise.",
        languages: ["Francais", "Anglais"],
        education: [
            "2023 - 2024 : Diplome de baccalaureat",
            "2024 - 2025 : Licence ICT4D 1",
            "2025 - 2026 : Licence ICT4D 2"
        ],
        experiences: ["Instituteur de mathematiques", "Developpeur web"],
        skills: ["HTML", "CSS", "JavaScript", "Gestion de projet"],
        legacyMedia: {
            photo: "miguel.jpg",
            video: "miguel.mp4",
            audio: "miguel.mp3"
        }
    },
    {
        id: "douanla-mafo-jimmy-tresor",
        fullName: "DOUANLA MAFO JIMMY TRESOR",
        headline: "ETUDIANT FULL STACK DEVELOPER",
        groupRole: "Sous-chef (Numero 42)",
        matricule: "24H2206",
        city: "Yaounde",
        country: "Cameroun",
        email: "jimmydouanla@gmail.com",
        phone: "+237 654187578",
        profile: "Etudiant a l'Universite de Yaounde I, passionne par le developpement web, les systemes informatiques et les nouvelles technologies.",
        hobbies: "Programmation, technologies, football, innovation digitale.",
        languages: ["Francais", "Anglais"],
        education: [
            "2023 - 2024 : Baccalaureat scientifique",
            "2024 - 2025 : Licence ICT4D Niveau 1",
            "2025 - 2026 : Licence ICT4D Niveau 2"
        ],
        experiences: [
            "Developpement de mini projets web",
            "Creation de portfolios modernes",
            "Participation a des travaux universitaires"
        ],
        skills: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "React"],
        legacyMedia: {
            photo: "jimmy1.jpg",
            video: "jimmy1.mp4",
            audio: "jimmy1.mp3"
        }
    },
    {
        id: "njimoluh-wajid-faouz",
        fullName: "NJIMOLUH WAJID FAOUZ",
        headline: "ETUDIANT EN INFORMATIQUE ICT4D",
        groupRole: "Membre (Numero 43)",
        matricule: "24H2076",
        city: "Yaounde",
        country: "Cameroun",
        email: "wajidnjimoluh@gmail.com",
        phone: "+237 693172961",
        profile: "Je suis etudiant passionne par la cyber-securite, le developpement web, le developpement mobile, les technologies et l'innovation.",
        hobbies: "Football, nouvelles technologies.",
        languages: ["Francais", "Anglais"],
        education: [
            "2025 : Licence 1 ICT4D",
            "2024 : Baccalaureat (LYCLAF)",
            "2021 : BEPC (LYCLAF)"
        ],
        experiences: ["Formation continue en ICT4D et projets academiques."],
        skills: ["HTML", "CSS", "JavaScript", "Utilisation des outils IA"],
        legacyMedia: {
            photo: "faouz.jpg",
            video: "faouz.mp4",
            audio: "faouz.mp3"
        }
    },
    {
        id: "ngom-joseph-jimmy-corneille",
        fullName: "NGOM JOSEPH JIMMY CORNEILLE",
        headline: "ETUDIANT EN SECURITE INFORMATIQUE",
        groupRole: "Membre (Numero 44)",
        matricule: "24H2199",
        city: "Yaounde",
        country: "Cameroun",
        email: "jimmycorneillengom@gmail.com",
        phone: "+237 659949883",
        profile: "Etudiant passionne par la securite informatique, le developpement logiciel et le design graphique (UI/UX).",
        hobbies: "Design graphique, veille technologique, musique.",
        languages: ["Francais", "Anglais"],
        education: [
            "2025 - Present : Licence 2 Securite Informatique (ICT4D) - Universite de Yaounde I",
            "2024 - 2025 : Licence 1 ICT4D - Universite de Yaounde I",
            "2024 : Baccalaureat",
            "2022 : Probatoire"
        ],
        experiences: [
            "MENTION237 : Plateforme educative pour la reussite aux examens",
            "EVALTRACK : Application de gestion des notes des etudiants",
            "Gestion de restaurant : Systeme complet de gestion",
            "Emploi du temps : Application de gestion scolaire"
        ],
        skills: [
            "Dev : Langage C, Algorithmique, Linux (Ubuntu)",
            "Securite : Analyse systeme, machines virtuelles",
            "Design : Photoshop, Figma, Canva, UI/UX Design"
        ],
        legacyMedia: {
            photo: "jimmy2.jpg",
            video: "jimmy2.mp4",
            audio: "jimmy.mp3"
        }
    },
    {
        id: "yogo-victorine",
        fullName: "YOGO VICTORINE",
        headline: "ETUDIANTE | HOTESSE | MANNEQUIN | AGENT D'ASSURANCE",
        groupRole: "Membre (Numero 45)",
        matricule: "24H2103",
        city: "Yaounde",
        country: "Cameroun",
        email: "yogovictorine575@gmail.com",
        phone: "",
        profile: "Etudiante de 19 ans a l'Universite de Yaounde 1. Formation en securite informatique, reseau informatique, marketing digital et communication.",
        hobbies: "Mode, communication, marketing et apprentissage continu.",
        languages: ["Francais", "Anglais"],
        education: [
            "Baccalaureat scientifique",
            "Universite de Yaounde 1",
            "Reseaux informatiques"
        ],
        experiences: ["Hotesse", "Mannequin", "Agent d'assurance"],
        skills: ["Marketing", "Communication", "Reseaux informatiques"],
        legacyMedia: {
            photo: "vicky.jpg",
            video: "vicky.mp4"
        }
    },
    {
        id: "kouawa-foba-benjamin",
        fullName: "KOUAWA FOBA BENJAMIN",
        headline: "ETUDIANT",
        groupRole: "Membre (Numero 46)",
        matricule: "24G2425",
        city: "Yaounde",
        country: "Cameroun",
        email: "benjofoba@gmail.com",
        phone: "+237 657751373",
        profile: "Etudiant en Licence 2 ICT4D, passionne par les technologies et le numerique. Rigoureux, organise et dote d'un bon esprit d'equipe.",
        hobbies: "Jeux, programmation, sciences, technologie, histoire, philosophie, art, litterature, sports, musique et voyages.",
        languages: ["Francais", "Anglais"],
        education: [
            "2025 - 2026 : ICT4D L2 - Universite de Yaounde I",
            "2024 - 2025 : ICT4D L1 - Universite de Yaounde I",
            "2021 - 2022 : Baccalaureat scientifique (serie C)",
            "2020 - 2021 : Probatoire scientifique (serie C)",
            "2018 - 2019 : BEPC",
            "2014 - 2015 : CEPE"
        ],
        experiences: ["Recherche de stage en entreprise pour consolidation des competences."],
        skills: ["HTML", "CSS", "C", "PHP", "C++", "JavaScript", "Python", "Java"],
        legacyMedia: {
            photo: "kouawa.jpg",
            video: "kouawa.mp4",
            audio: "kouawa.mp3"
        }
    },
    {
        id: "mikam-mibelle",
        fullName: "MIKAM MIBELLE",
        headline: "ETUDIANTE",
        groupRole: "Membre (Numero 47)",
        matricule: "21T2814",
        city: "Yaounde",
        country: "Cameroun",
        email: "mibellemikam837@gmail.com",
        phone: "+237 655520015",
        profile: "Je suis etudiante a l'Universite de Yaounde I, en cycle licence ICT4D specialite Genie logiciel.",
        hobbies: "Lecture, cuisine camerounaise.",
        languages: ["Francais", "Anglais"],
        education: [
            "2020 - 2021 : Baccalaureat C",
            "2022 - 2023 : Licence 1 Mathematiques",
            "2023 - 2026 : Licence professionnelle ICT4D"
        ],
        experiences: [
            "Institutrice - Groupe Excellence +",
            "Soutien scolaire personnalise",
            "Methodes pedagogiques adaptees",
            "Suivi des eleves"
        ],
        skills: ["Communication", "Gestion de projet", "Adaptabilite"],
        legacyMedia: {
            photo: "fille.jpg",
            video: "mibelle.mp4"
        }
    },
    {
        id: "kengne-bekam-fidele-jordan",
        fullName: "KENGNE BEKAM FIDELE JORDAN",
        headline: "DEVELOPPEUR MOBILE JUNIOR | ENTREPRENEUR",
        groupRole: "Membre (Numero 48)",
        matricule: "24H2143",
        city: "Yaounde",
        country: "Cameroun",
        email: "bejorbejor2@gmail.com",
        phone: "+237 658174874",
        profile: "Etudiant en deuxieme annee ICT4D a l'Universite de Yaounde I, specialite Genie logiciel. Passionne par le developpement d'applications et la creation de solutions numeriques.",
        hobbies: "Entrepreneuriat, developpement mobile, montage video, photographie.",
        languages: ["Francais", "Anglais"],
        education: [
            "2022 - 2023 : Baccalaureat C",
            "2023 - 2024 : Formation d'anglais",
            "2024 - 2026 : Licence professionnelle ICT4D"
        ],
        experiences: [
            "Projet BK Drive : gestion de la communication et vente de vehicules d'occasion"
        ],
        skills: [
            "JavaScript",
            "Dart",
            "HTML",
            "CSS",
            "Git",
            "VS Code",
            "Android Studio"
        ],
        legacyMedia: {
            photo: "bejor.jpg",
            video: "presentation.mp4"
        }
    }
];
let dbPromise = null;
function getDatabase() {
    if (!dbPromise) {
        dbPromise = openDatabase();
    }
    return dbPromise;
}
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(CVS_STORE)) {
                db.createObjectStore(CVS_STORE, { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains(MEDIA_STORE)) {
                const mediaStore = db.createObjectStore(MEDIA_STORE, { keyPath: "id" });
                mediaStore.createIndex(MEDIA_CV_ID_INDEX, "cvId", { unique: false });
            }
            else {
                const transaction = request.transaction;
                if (transaction && !transaction.objectStore(MEDIA_STORE).indexNames.contains(MEDIA_CV_ID_INDEX)) {
                    transaction.objectStore(MEDIA_STORE).createIndex(MEDIA_CV_ID_INDEX, "cvId", { unique: false });
                }
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error ?? new Error("Impossible d'ouvrir IndexedDB."));
    });
}
function requestToPromise(request) {
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error ?? new Error("Requete IndexedDB en echec."));
    });
}
function transactionToPromise(transaction) {
    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error ?? new Error("Transaction IndexedDB en echec."));
        transaction.onabort = () => reject(transaction.error ?? new Error("Transaction IndexedDB annulee."));
    });
}
function normalizeList(values) {
    return values
        .map((value) => value.trim())
        .filter((value) => value.length > 0);
}
function normalizeText(value) {
    return value.trim();
}
function generateId(prefix) {
    if ("randomUUID" in crypto) {
        return `${prefix}-${crypto.randomUUID()}`;
    }
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
function buildMediaRecord(cvId, kind, file, fileName) {
    const now = Date.now();
    return {
        id: generateId(kind),
        cvId,
        kind,
        mimeType: file.type || "application/octet-stream",
        fileName,
        blob: file,
        createdAt: now,
        updatedAt: now
    };
}
function sanitizeInput(input) {
    return {
        fullName: normalizeText(input.fullName),
        headline: normalizeText(input.headline),
        groupRole: normalizeText(input.groupRole),
        matricule: normalizeText(input.matricule),
        city: normalizeText(input.city),
        country: normalizeText(input.country),
        email: normalizeText(input.email),
        phone: normalizeText(input.phone),
        profile: normalizeText(input.profile),
        hobbies: normalizeText(input.hobbies),
        languages: normalizeList(input.languages),
        education: normalizeList(input.education),
        experiences: normalizeList(input.experiences),
        skills: normalizeList(input.skills)
    };
}
async function fetchLegacyMedia(path) {
    if (!path) {
        return null;
    }
    try {
        const response = await fetch(path);
        if (!response.ok) {
            return null;
        }
        return await response.blob();
    }
    catch {
        return null;
    }
}
async function prepareSeedData() {
    const preparedEntries = [];
    const now = Date.now();
    for (const [index, seed] of DEFAULT_SEED_DATA.entries()) {
        const mediaRecords = [];
        let photoAssetId = null;
        let videoAssetId = null;
        let audioAssetId = null;
        const photoBlob = await fetchLegacyMedia(seed.legacyMedia.photo);
        if (photoBlob) {
            const media = buildMediaRecord(seed.id, "photo", photoBlob, seed.legacyMedia.photo ?? "photo");
            photoAssetId = media.id;
            mediaRecords.push(media);
        }
        const videoBlob = await fetchLegacyMedia(seed.legacyMedia.video);
        if (videoBlob) {
            const media = buildMediaRecord(seed.id, "video", videoBlob, seed.legacyMedia.video ?? "video");
            videoAssetId = media.id;
            mediaRecords.push(media);
        }
        const audioBlob = await fetchLegacyMedia(seed.legacyMedia.audio);
        if (audioBlob) {
            const media = buildMediaRecord(seed.id, "audio", audioBlob, seed.legacyMedia.audio ?? "audio");
            audioAssetId = media.id;
            mediaRecords.push(media);
        }
        const cvRecord = {
            id: seed.id,
            fullName: seed.fullName,
            headline: seed.headline,
            groupRole: seed.groupRole,
            matricule: seed.matricule,
            city: seed.city,
            country: seed.country,
            email: seed.email,
            phone: seed.phone,
            profile: seed.profile,
            hobbies: seed.hobbies,
            languages: seed.languages,
            education: seed.education,
            experiences: seed.experiences,
            skills: seed.skills,
            photoAssetId,
            videoAssetId,
            audioAssetId,
            displayOrder: index + 1,
            createdAt: now + index,
            updatedAt: now + index
        };
        preparedEntries.push({
            cv: cvRecord,
            media: mediaRecords
        });
    }
    return preparedEntries;
}
export async function initializeDatabase() {
    const db = await getDatabase();
    const tx = db.transaction(CVS_STORE, "readonly");
    const cvStore = tx.objectStore(CVS_STORE);
    const count = await requestToPromise(cvStore.count());
    await transactionToPromise(tx);
    if (count > 0) {
        return;
    }
    const preparedSeeds = await prepareSeedData();
    const seedTx = db.transaction([CVS_STORE, MEDIA_STORE], "readwrite");
    const seedCvStore = seedTx.objectStore(CVS_STORE);
    const seedMediaStore = seedTx.objectStore(MEDIA_STORE);
    for (const seed of preparedSeeds) {
        seedCvStore.put(seed.cv);
        for (const mediaRecord of seed.media) {
            seedMediaStore.put(mediaRecord);
        }
    }
    await transactionToPromise(seedTx);
}
export async function getAllCvs() {
    const db = await getDatabase();
    const tx = db.transaction(CVS_STORE, "readonly");
    const cvStore = tx.objectStore(CVS_STORE);
    const rows = await requestToPromise(cvStore.getAll());
    await transactionToPromise(tx);
    return rows.sort((a, b) => {
        if (a.displayOrder !== b.displayOrder) {
            return a.displayOrder - b.displayOrder;
        }
        return a.fullName.localeCompare(b.fullName);
    });
}
export async function getCvById(id) {
    const db = await getDatabase();
    const tx = db.transaction(CVS_STORE, "readonly");
    const cvStore = tx.objectStore(CVS_STORE);
    const record = await requestToPromise(cvStore.get(id));
    await transactionToPromise(tx);
    return record ?? null;
}
export async function getMediaBlob(assetId) {
    const db = await getDatabase();
    const tx = db.transaction(MEDIA_STORE, "readonly");
    const mediaStore = tx.objectStore(MEDIA_STORE);
    const media = await requestToPromise(mediaStore.get(assetId));
    await transactionToPromise(tx);
    return media?.blob ?? null;
}
export async function createCv(input) {
    const sanitized = sanitizeInput(input);
    if (!sanitized.fullName) {
        throw new Error("Le nom complet est obligatoire.");
    }
    const all = await getAllCvs();
    const maxOrder = all.reduce((acc, cv) => Math.max(acc, cv.displayOrder), 0);
    const cvId = generateId("cv");
    const now = Date.now();
    const mediaRecords = [];
    if (input.photoFile && input.photoFile.size > 0) {
        mediaRecords.push(buildMediaRecord(cvId, "photo", input.photoFile, input.photoFile.name || "photo"));
    }
    if (input.videoFile && input.videoFile.size > 0) {
        mediaRecords.push(buildMediaRecord(cvId, "video", input.videoFile, input.videoFile.name || "video"));
    }
    if (input.audioFile && input.audioFile.size > 0) {
        mediaRecords.push(buildMediaRecord(cvId, "audio", input.audioFile, input.audioFile.name || "audio"));
    }
    const photoAsset = mediaRecords.find((media) => media.kind === "photo")?.id ?? null;
    const videoAsset = mediaRecords.find((media) => media.kind === "video")?.id ?? null;
    const audioAsset = mediaRecords.find((media) => media.kind === "audio")?.id ?? null;
    const cvRecord = {
        id: cvId,
        ...sanitized,
        photoAssetId: photoAsset,
        videoAssetId: videoAsset,
        audioAssetId: audioAsset,
        displayOrder: maxOrder + 1,
        createdAt: now,
        updatedAt: now
    };
    const db = await getDatabase();
    const tx = db.transaction([CVS_STORE, MEDIA_STORE], "readwrite");
    const cvStore = tx.objectStore(CVS_STORE);
    const mediaStore = tx.objectStore(MEDIA_STORE);
    cvStore.put(cvRecord);
    for (const media of mediaRecords) {
        mediaStore.put(media);
    }
    await transactionToPromise(tx);
    return cvRecord;
}
export async function updateCv(id, input) {
    const existing = await getCvById(id);
    if (!existing) {
        throw new Error("CV introuvable.");
    }
    const sanitized = sanitizeInput(input);
    if (!sanitized.fullName) {
        throw new Error("Le nom complet est obligatoire.");
    }
    const db = await getDatabase();
    const tx = db.transaction([CVS_STORE, MEDIA_STORE], "readwrite");
    const cvStore = tx.objectStore(CVS_STORE);
    const mediaStore = tx.objectStore(MEDIA_STORE);
    let photoAssetId = existing.photoAssetId;
    let videoAssetId = existing.videoAssetId;
    let audioAssetId = existing.audioAssetId;
    if (input.photoFile && input.photoFile.size > 0) {
        if (photoAssetId) {
            mediaStore.delete(photoAssetId);
        }
        const media = buildMediaRecord(id, "photo", input.photoFile, input.photoFile.name || "photo");
        photoAssetId = media.id;
        mediaStore.put(media);
    }
    if (input.videoFile && input.videoFile.size > 0) {
        if (videoAssetId) {
            mediaStore.delete(videoAssetId);
        }
        const media = buildMediaRecord(id, "video", input.videoFile, input.videoFile.name || "video");
        videoAssetId = media.id;
        mediaStore.put(media);
    }
    if (input.audioFile && input.audioFile.size > 0) {
        if (audioAssetId) {
            mediaStore.delete(audioAssetId);
        }
        const media = buildMediaRecord(id, "audio", input.audioFile, input.audioFile.name || "audio");
        audioAssetId = media.id;
        mediaStore.put(media);
    }
    const updatedRecord = {
        ...existing,
        ...sanitized,
        photoAssetId,
        videoAssetId,
        audioAssetId,
        updatedAt: Date.now()
    };
    cvStore.put(updatedRecord);
    await transactionToPromise(tx);
    return updatedRecord;
}
export async function deleteCv(id) {
    const existing = await getCvById(id);
    if (!existing) {
        return;
    }
    const db = await getDatabase();
    const tx = db.transaction([CVS_STORE, MEDIA_STORE], "readwrite");
    const cvStore = tx.objectStore(CVS_STORE);
    const mediaStore = tx.objectStore(MEDIA_STORE);
    cvStore.delete(id);
    if (existing.photoAssetId) {
        mediaStore.delete(existing.photoAssetId);
    }
    if (existing.videoAssetId) {
        mediaStore.delete(existing.videoAssetId);
    }
    if (existing.audioAssetId) {
        mediaStore.delete(existing.audioAssetId);
    }
    // Nettoyage des medias orphelins eventuels relies au cv.
    const index = mediaStore.index(MEDIA_CV_ID_INDEX);
    const orphanRequest = index.openCursor(IDBKeyRange.only(id));
    orphanRequest.onsuccess = () => {
        const cursor = orphanRequest.result;
        if (!cursor) {
            return;
        }
        cursor.delete();
        cursor.continue();
    };
    await transactionToPromise(tx);
}
