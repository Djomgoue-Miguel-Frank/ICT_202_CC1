const DB_NAME = "cv-collectif-db";
const DB_VERSION = 1;
const CVS_STORE = "cvs";
const MEDIA_STORE = "media";
const MEDIA_CV_ID_INDEX = "byCvId";
const SEED_FILE = "index.db";
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
async function prepareSeedDataFromLocal() {
    const response = await fetch(SEED_FILE);
    if (!response.ok) {
        throw new Error("Impossible de charger le fichier index.db");
    }
    const seedData = await response.json();
    const preparedEntries = [];
    const now = Date.now();
    for (const [index, seed] of seedData.entries()) {
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
    const preparedSeeds = await prepareSeedDataFromLocal();
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
