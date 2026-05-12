import { createCv, deleteCv, getAllCvs, getMediaBlob, initializeDatabase } from "./db.js";
const listContainer = document.getElementById("cv-list");
const openModalButton = document.getElementById("open-create-modal");
const closeModalButton = document.getElementById("close-modal");
const modal = document.getElementById("cv-modal");
const form = document.getElementById("cv-form");
const modalError = document.getElementById("modal-error");
const submitButton = document.getElementById("submit-cv");
let objectUrls = [];
function revokeObjectUrls() {
    for (const url of objectUrls) {
        URL.revokeObjectURL(url);
    }
    objectUrls = [];
}
function parseListInput(value) {
    return value
        .split(/\r?\n|,/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
}
function toCvPayload(activeForm) {
    const fullName = activeForm.elements.namedItem("fullName").value;
    const headline = activeForm.elements.namedItem("headline").value;
    const groupRole = activeForm.elements.namedItem("groupRole").value;
    const matricule = activeForm.elements.namedItem("matricule").value;
    const city = activeForm.elements.namedItem("city").value;
    const country = activeForm.elements.namedItem("country").value;
    const email = activeForm.elements.namedItem("email").value;
    const phone = activeForm.elements.namedItem("phone").value;
    const profile = activeForm.elements.namedItem("profile").value;
    const hobbies = activeForm.elements.namedItem("hobbies").value;
    const languages = activeForm.elements.namedItem("languages").value;
    const education = activeForm.elements.namedItem("education").value;
    const experiences = activeForm.elements.namedItem("experiences").value;
    const skills = activeForm.elements.namedItem("skills").value;
    const photoInput = activeForm.elements.namedItem("photo");
    const videoInput = activeForm.elements.namedItem("video");
    const audioInput = activeForm.elements.namedItem("audio");
    return {
        fullName,
        headline,
        groupRole,
        matricule,
        city,
        country,
        email,
        phone,
        profile,
        hobbies,
        languages: parseListInput(languages),
        education: parseListInput(education),
        experiences: parseListInput(experiences),
        skills: parseListInput(skills),
        photoFile: photoInput.files?.[0] ?? null,
        videoFile: videoInput.files?.[0] ?? null,
        audioFile: audioInput.files?.[0] ?? null
    };
}
function openModal() {
    if (!modal) {
        return;
    }
    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");
    if (modalError) {
        modalError.textContent = "";
    }
}
function closeModal() {
    if (!modal || !form) {
        return;
    }
    modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
    form.reset();
    if (modalError) {
        modalError.textContent = "";
    }
}
async function setImageFromMedia(cv, image) {
    image.alt = `Photo de ${cv.fullName}`;
    image.src =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Crect width='220' height='220' fill='%23d9efff'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-size='16' fill='%23507a9d' font-family='Arial'%3EPhoto%3C/text%3E%3C/svg%3E";
    if (!cv.photoAssetId) {
        return;
    }
    const blob = await getMediaBlob(cv.photoAssetId);
    if (!blob) {
        return;
    }
    const url = URL.createObjectURL(blob);
    objectUrls.push(url);
    image.src = url;
}
function createCardHeader(cv) {
    const info = document.createElement("div");
    info.className = "infos";
    const name = document.createElement("h2");
    name.textContent = cv.fullName;
    const group = document.createElement("p");
    const groupMeta = [cv.groupRole, cv.matricule].filter((item) => item.length > 0).join(" • ");
    group.textContent = groupMeta || "Membre";
    const role = document.createElement("p");
    role.className = "headline";
    role.textContent = cv.headline || "Etudiant";
    info.append(name, group, role);
    return info;
}
async function renderCvList() {
    if (!listContainer) {
        return;
    }
    revokeObjectUrls();
    listContainer.innerHTML = "";
    const cvs = await getAllCvs();
    if (cvs.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty-state";
        empty.textContent = "Aucun CV disponible. Utilisez 'Nouveau CV' pour en creer un.";
        listContainer.appendChild(empty);
        return;
    }
    for (const cv of cvs) {
        const card = document.createElement("article");
        card.className = "membre";
        const profileLink = document.createElement("a");
        profileLink.className = "membre-link";
        profileLink.href = `cv.html?id=${encodeURIComponent(cv.id)}`;
        const avatar = document.createElement("img");
        await setImageFromMedia(cv, avatar);
        profileLink.appendChild(avatar);
        profileLink.appendChild(createCardHeader(cv));
        const actions = document.createElement("div");
        actions.className = "card-actions";
        const openButton = document.createElement("a");
        openButton.className = "btn-open";
        openButton.href = `cv.html?id=${encodeURIComponent(cv.id)}`;
        openButton.textContent = "Ouvrir";
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "btn-delete";
        deleteButton.textContent = "Supprimer";
        deleteButton.addEventListener("click", async (event) => {
            event.preventDefault();
            const accepted = window.confirm(`Supprimer le CV de ${cv.fullName} ?`);
            if (!accepted) {
                return;
            }
            await deleteCv(cv.id);
            await renderCvList();
        });
        actions.append(openButton, deleteButton);
        card.append(profileLink, actions);
        listContainer.appendChild(card);
    }
}
async function setupFormSubmission() {
    if (!(form instanceof HTMLFormElement) || !(submitButton instanceof HTMLButtonElement)) {
        return;
    }
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        submitButton.disabled = true;
        if (modalError) {
            modalError.textContent = "";
        }
        try {
            const payload = toCvPayload(form);
            await createCv(payload);
            closeModal();
            await renderCvList();
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Erreur lors de l'enregistrement du CV.";
            if (modalError) {
                modalError.textContent = message;
            }
        }
        finally {
            submitButton.disabled = false;
        }
    });
}
async function bootstrap() {
    try {
        await initializeDatabase();
        await renderCvList();
        await setupFormSubmission();
    }
    catch (error) {
        if (listContainer) {
            listContainer.innerHTML = `<div class="empty-state">Erreur d'initialisation: ${error instanceof Error ? error.message : "erreur inconnue"}</div>`;
        }
    }
    openModalButton?.addEventListener("click", openModal);
    closeModalButton?.addEventListener("click", closeModal);
    modal?.addEventListener("click", (event) => {
        const target = event.target;
        if (target.dataset.closeModal === "true") {
            closeModal();
        }
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal && !modal.classList.contains("hidden")) {
            closeModal();
        }
    });
}
void bootstrap();
