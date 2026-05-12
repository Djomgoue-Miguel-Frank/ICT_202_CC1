import { deleteCv, getCvById, getMediaBlob, initializeDatabase, updateCv, type CvRecord, type CvUpsertInput } from "./db.js";

type Locale = "fr" | "en";
type LabelKey =
  | "profile"
  | "contact"
  | "hobbies"
  | "languages"
  | "education"
  | "experiences"
  | "skills"
  | "video"
  | "audio"
  | "edit"
  | "delete"
  | "modalTitle"
  | "save";

const labels: Record<Locale, Record<LabelKey, string>> = {
  fr: {
    profile: "PROFIL",
    contact: "CONTACT",
    hobbies: "LOISIRS",
    languages: "LANGUES",
    education: "FORMATION",
    experiences: "PROJETS & EXPERIENCES",
    skills: "COMPETENCES",
    video: "VIDEO DE PRESENTATION",
    audio: "AUDIO DE PRESENTATION",
    edit: "Modifier le CV",
    delete: "Supprimer le CV",
    modalTitle: "Modifier ce CV",
    save: "Enregistrer les modifications"
  },
  en: {
    profile: "PROFILE",
    contact: "CONTACT",
    hobbies: "HOBBIES",
    languages: "LANGUAGES",
    education: "EDUCATION",
    experiences: "PROJECTS & EXPERIENCE",
    skills: "SKILLS",
    video: "PRESENTATION VIDEO",
    audio: "PRESENTATION AUDIO",
    edit: "Edit CV",
    delete: "Delete CV",
    modalTitle: "Edit this CV",
    save: "Save changes"
  }
};

const pageContainer = document.getElementById("cv-page");
const errorContainer = document.getElementById("cv-error");
const editButton = document.getElementById("btn-edit");
const deleteButton = document.getElementById("btn-delete");
const videoPlayer = document.getElementById("video-player");
const editModal = document.getElementById("edit-modal");
const closeEditButton = document.getElementById("close-edit-modal");
const editForm = document.getElementById("edit-form");
const submitEditButton = document.getElementById("submit-edit");
const editError = document.getElementById("edit-error");
const frButton = document.getElementById("lang-fr");
const enButton = document.getElementById("lang-en");

let currentCvId = "";
let currentCv: CvRecord | null = null;
let activeLocale: Locale = "fr";
let mediaUrls: string[] = [];

function setLocale(locale: Locale): void {
  activeLocale = locale;
  const scopedLabels = labels[locale];
  const entries = document.querySelectorAll<HTMLElement>("[data-i18n]");
  entries.forEach((entry) => {
    const key = entry.dataset.i18n as LabelKey | undefined;
    if (!key) {
      return;
    }
    const value = scopedLabels[key];
    if (value) {
      entry.textContent = value;
    }
  });

  if (frButton instanceof HTMLButtonElement) {
    frButton.classList.toggle("active", locale === "fr");
  }
  if (enButton instanceof HTMLButtonElement) {
    enButton.classList.toggle("active", locale === "en");
  }
}

function parseListInput(value: string): string[] {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function renderList(target: HTMLElement, items: string[]): void {
  target.innerHTML = "";
  if (items.length === 0) {
    const fallback = document.createElement("li");
    fallback.textContent = "-";
    target.appendChild(fallback);
    return;
  }

  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    target.appendChild(li);
  }
}

function clearMediaUrls(): void {
  for (const url of mediaUrls) {
    URL.revokeObjectURL(url);
  }
  mediaUrls = [];
}

async function setImage(elementId: string, assetId: string | null, alt: string): Promise<void> {
  const image = document.getElementById(elementId);
  if (!(image instanceof HTMLImageElement)) {
    return;
  }

  image.alt = alt;
  image.src =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23d9efff'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='%23507a9d' font-family='Arial'%3EPhoto%3C/text%3E%3C/svg%3E";

  if (!assetId) {
    return;
  }

  const blob = await getMediaBlob(assetId);
  if (!blob) {
    return;
  }

  const url = URL.createObjectURL(blob);
  mediaUrls.push(url);
  image.src = url;
}

async function setMedia(sectionId: string, elementId: string, assetId: string | null): Promise<void> {
  const section = document.getElementById(sectionId);
  const media = document.getElementById(elementId);
  if (!(section instanceof HTMLElement) || !(media instanceof HTMLMediaElement)) {
    return;
  }

  media.removeAttribute("src");
  media.load();

  if (!assetId) {
    section.classList.add("hidden");
    return;
  }

  const blob = await getMediaBlob(assetId);
  if (!blob) {
    section.classList.add("hidden");
    return;
  }

  const url = URL.createObjectURL(blob);
  mediaUrls.push(url);
  media.src = url;
  media.load();
  section.classList.remove("hidden");
}

function fillText(id: string, value: string): void {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value || "-";
  }
}

function toCvPayload(form: HTMLFormElement): CvUpsertInput {
  const fullName = (form.elements.namedItem("fullName") as HTMLInputElement).value;
  const headline = (form.elements.namedItem("headline") as HTMLInputElement).value;
  const groupRole = (form.elements.namedItem("groupRole") as HTMLInputElement).value;
  const matricule = (form.elements.namedItem("matricule") as HTMLInputElement).value;
  const city = (form.elements.namedItem("city") as HTMLInputElement).value;
  const country = (form.elements.namedItem("country") as HTMLInputElement).value;
  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
  const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
  const profile = (form.elements.namedItem("profile") as HTMLTextAreaElement).value;
  const hobbies = (form.elements.namedItem("hobbies") as HTMLTextAreaElement).value;
  const languages = (form.elements.namedItem("languages") as HTMLTextAreaElement).value;
  const education = (form.elements.namedItem("education") as HTMLTextAreaElement).value;
  const experiences = (form.elements.namedItem("experiences") as HTMLTextAreaElement).value;
  const skills = (form.elements.namedItem("skills") as HTMLTextAreaElement).value;
  const photoInput = form.elements.namedItem("photo") as HTMLInputElement;
  const videoInput = form.elements.namedItem("video") as HTMLInputElement;
  const audioInput = form.elements.namedItem("audio") as HTMLInputElement;

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

function openEditModal(): void {
  if (!editModal || !(editForm instanceof HTMLFormElement) || !currentCv) {
    return;
  }
  editModal.classList.remove("hidden");
  document.body.classList.add("modal-open");

  (editForm.elements.namedItem("fullName") as HTMLInputElement).value = currentCv.fullName;
  (editForm.elements.namedItem("headline") as HTMLInputElement).value = currentCv.headline;
  (editForm.elements.namedItem("groupRole") as HTMLInputElement).value = currentCv.groupRole;
  (editForm.elements.namedItem("matricule") as HTMLInputElement).value = currentCv.matricule;
  (editForm.elements.namedItem("city") as HTMLInputElement).value = currentCv.city;
  (editForm.elements.namedItem("country") as HTMLInputElement).value = currentCv.country;
  (editForm.elements.namedItem("email") as HTMLInputElement).value = currentCv.email;
  (editForm.elements.namedItem("phone") as HTMLInputElement).value = currentCv.phone;
  (editForm.elements.namedItem("profile") as HTMLTextAreaElement).value = currentCv.profile;
  (editForm.elements.namedItem("hobbies") as HTMLTextAreaElement).value = currentCv.hobbies;
  (editForm.elements.namedItem("languages") as HTMLTextAreaElement).value = currentCv.languages.join("\n");
  (editForm.elements.namedItem("education") as HTMLTextAreaElement).value = currentCv.education.join("\n");
  (editForm.elements.namedItem("experiences") as HTMLTextAreaElement).value = currentCv.experiences.join("\n");
  (editForm.elements.namedItem("skills") as HTMLTextAreaElement).value = currentCv.skills.join("\n");

  const photoInput = editForm.elements.namedItem("photo") as HTMLInputElement;
  const videoInput = editForm.elements.namedItem("video") as HTMLInputElement;
  const audioInput = editForm.elements.namedItem("audio") as HTMLInputElement;
  photoInput.value = "";
  videoInput.value = "";
  audioInput.value = "";

  if (editError) {
    editError.textContent = "";
  }
}

function closeEditModal(): void {
  if (!(editForm instanceof HTMLFormElement) || !editModal) {
    return;
  }
  editModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  editForm.reset();
  if (editError) {
    editError.textContent = "";
  }
}

async function renderCv(cv: CvRecord): Promise<void> {
  clearMediaUrls();
  currentCv = cv;

  fillText("full-name", cv.fullName);
  fillText("headline", cv.headline || "Etudiant");
  fillText("profile-text", cv.profile);
  fillText("city", cv.city);
  fillText("country", cv.country);
  fillText("email", cv.email);
  fillText("phone", cv.phone);
  fillText("hobbies-text", cv.hobbies);

  const badge = document.getElementById("badge-meta");
  if (badge) {
    const metadata = [cv.groupRole, cv.matricule].filter((value) => value.length > 0).join(" • ");
    badge.textContent = metadata || "-";
  }

  const languageList = document.getElementById("languages-list");
  const educationList = document.getElementById("education-list");
  const experienceList = document.getElementById("experiences-list");
  const skillList = document.getElementById("skills-list");

  if (languageList) {
    renderList(languageList, cv.languages);
  }
  if (educationList) {
    renderList(educationList, cv.education);
  }
  if (experienceList) {
    renderList(experienceList, cv.experiences);
  }
  if (skillList) {
    renderList(skillList, cv.skills);
  }

  await setImage("photo-image", cv.photoAssetId, `Photo de ${cv.fullName}`);
  await setMedia("video-section", "video-player", cv.videoAssetId);
  await setMedia("audio-section", "audio-player", cv.audioAssetId);
}

function showPageError(message: string): void {
  if (errorContainer) {
    errorContainer.textContent = message;
    errorContainer.classList.remove("hidden");
  }
  if (pageContainer) {
    pageContainer.classList.add("hidden");
  }
}

async function loadCv(): Promise<void> {
  if (!currentCvId) {
    showPageError("Parametre id manquant. Retournez a l'accueil.");
    return;
  }

  const cv = await getCvById(currentCvId);
  if (!cv) {
    showPageError("CV introuvable. Retournez a l'accueil.");
    return;
  }

  if (errorContainer) {
    errorContainer.classList.add("hidden");
  }
  if (pageContainer) {
    pageContainer.classList.remove("hidden");
  }

  await renderCv(cv);
}

function setupEvents(): void {
  frButton?.addEventListener("click", () => setLocale("fr"));
  enButton?.addEventListener("click", () => setLocale("en"));

  editButton?.addEventListener("click", openEditModal);
  closeEditButton?.addEventListener("click", closeEditModal);

  editModal?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.dataset.closeModal === "true") {
      closeEditModal();
    }
  });

  deleteButton?.addEventListener("click", async () => {
    if (!currentCv) {
      return;
    }
    const accepted = window.confirm(`Supprimer le CV de ${currentCv.fullName} ?`);
    if (!accepted) {
      return;
    }
    await deleteCv(currentCv.id);
    window.location.href = "CC1.html";
  });

  const jumpButtons = document.querySelectorAll<HTMLButtonElement>("[data-video-jump]");
  jumpButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!(videoPlayer instanceof HTMLVideoElement)) {
        return;
      }

      const targetTime = Number(button.dataset.videoJump);
      if (!Number.isFinite(targetTime) || targetTime < 0) {
        return;
      }

      const seek = () => {
        videoPlayer.currentTime = targetTime;
        void videoPlayer.play().catch(() => undefined);
      };

      if (videoPlayer.readyState >= 1) {
        seek();
      } else {
        videoPlayer.addEventListener("loadedmetadata", seek, { once: true });
      }
    });
  });

  if (editForm instanceof HTMLFormElement && submitEditButton instanceof HTMLButtonElement) {
    editForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!currentCv) {
        return;
      }

      submitEditButton.disabled = true;
      if (editError) {
        editError.textContent = "";
      }

      try {
        const payload = toCvPayload(editForm);
        await updateCv(currentCv.id, payload);
        await loadCv();
        closeEditModal();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Erreur lors de la modification du CV.";
        if (editError) {
          editError.textContent = message;
        }
      } finally {
        submitEditButton.disabled = false;
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && editModal && !editModal.classList.contains("hidden")) {
      closeEditModal();
    }
  });

  window.addEventListener("beforeunload", clearMediaUrls);
}

async function bootstrap(): Promise<void> {
  const params = new URLSearchParams(window.location.search);
  currentCvId = params.get("id") ?? "";

  try {
    await initializeDatabase();
    setLocale(activeLocale);
    setupEvents();
    await loadCv();
  } catch (error) {
    showPageError(error instanceof Error ? error.message : "Erreur d'initialisation.");
  }
}

void bootstrap();
