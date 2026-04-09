const layout = document.querySelector(".layout");
const generatorCard = document.getElementById("generatorCard");

const mainCard = document.getElementById("mainCard");
const successCard = document.getElementById("successCard");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const resetBtn = document.getElementById("resetBtn");
const shareBtn = document.getElementById("shareBtn");
const buttonsArea = document.getElementById("buttonsArea");
const floatingHearts = document.getElementById("floatingHearts");
const copiedMessage = document.getElementById("copiedMessage");

const mainTitle = document.getElementById("mainTitle");
const mainSubtitle = document.getElementById("mainSubtitle");
const successTitle = document.getElementById("successTitle");
const successSubtitle = document.getElementById("successSubtitle");

const paraInput = document.getElementById("paraInput");
const deInput = document.getElementById("deInput");
const mensajeInput = document.getElementById("mensajeInput");
const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const generatedLink = document.getElementById("generatedLink");
const copyGeneratedBtn = document.getElementById("copyGeneratedBtn");
const openGeneratedBtn = document.getElementById("openGeneratedBtn");
const generatorMessage = document.getElementById("generatorMessage");

function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

function sanitizeText(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.textContent.trim();
}

function hasPersonalizationParams() {
  const para = sanitizeText(getQueryParam("para") || "");
  const de = sanitizeText(getQueryParam("de") || "");
  const mensaje = sanitizeText(getQueryParam("mensaje") || "");

  return para !== "" || de !== "" || mensaje !== "";
}

function setupViewMode() {
  if (hasPersonalizationParams()) {
    generatorCard.classList.add("hide-generator");
    layout.classList.add("single-view");
  } else {
    generatorCard.classList.remove("hide-generator");
    layout.classList.remove("single-view");
  }
}

function updateTitles({ para, de, mensaje }) {
  mainTitle.textContent = para
    ? `${para}, te mando un mate virtual`
    : "Te mando un mate virtual";

  successTitle.textContent = para
    ? `${para}, ¡aceptaste el mate!`
    : "¡Aceptaste el mate!";

  if (de && mensaje) {
    mainSubtitle.textContent = `${mensaje}. Te lo manda ${de}.`;
    successSubtitle.textContent = `Gran elección. ${mensaje}. Este mate virtual te lo mandó ${de}.`;
    return;
  }

  if (de) {
    mainSubtitle.textContent = `Está calentito, bien cebado y te lo manda ${de}.`;
    successSubtitle.textContent = `Gran elección. Este mate virtual te lo mandó ${de} con toda la buena onda.`;
    return;
  }

  if (mensaje) {
    mainSubtitle.textContent = mensaje;
    successSubtitle.textContent = `${mensaje}. Excelente decisión.`;
    return;
  }

  mainSubtitle.textContent =
    "Está calentito, bien cebado y viene con buena charla incluida.";
  successSubtitle.textContent =
    "Excelente decisión. Este mate virtual viene con bizcochitos imaginarios y cero riesgo de que se lave.";
}

function applyPersonalizationFromUrl() {
  const para = sanitizeText(getQueryParam("para") || "");
  const de = sanitizeText(getQueryParam("de") || "");
  const mensaje = sanitizeText(getQueryParam("mensaje") || "");

  updateTitles({ para, de, mensaje });

  paraInput.value = para;
  deInput.value = de;
  mensajeInput.value = mensaje;

  buildGeneratedLink(false);
}

function moveNoButton() {
  const areaWidth = buttonsArea.clientWidth;
  const areaHeight = buttonsArea.clientHeight;

  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const maxX = Math.max(areaWidth - btnWidth, 0);
  const maxY = Math.max(areaHeight - btnHeight, 0);

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

function launchCelebration() {
  const items = ["🧉", "✨", "💚", "🤎"];

  for (let i = 0; i < 26; i++) {
    const el = document.createElement("span");
    el.className = "float-item";
    el.textContent = items[Math.floor(Math.random() * items.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${3 + Math.random() * 3}s`;
    el.style.fontSize = `${20 + Math.random() * 18}px`;
    floatingHearts.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 6500);
  }
}

function acceptMate() {
  mainCard.classList.add("hidden");
  successCard.classList.remove("hidden");
  copiedMessage.textContent = "";
  launchCelebration();
}

function resetFlow() {
  successCard.classList.add("hidden");
  mainCard.classList.remove("hidden");
  copiedMessage.textContent = "";
}

async function copyCurrentLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copiedMessage.textContent = "Link actual copiado al portapapeles.";
  } catch (error) {
    copiedMessage.textContent = "No se pudo copiar el link actual.";
  }
}

function buildGeneratedLink(updatePreview = true) {
  const para = sanitizeText(paraInput.value);
  const de = sanitizeText(deInput.value);
  const mensaje = sanitizeText(mensajeInput.value);

  const url = new URL(window.location.origin + window.location.pathname);

  if (para) url.searchParams.set("para", para);
  if (de) url.searchParams.set("de", de);
  if (mensaje) url.searchParams.set("mensaje", mensaje);

  generatedLink.value = url.toString();
  generatorMessage.textContent = "";

  if (updatePreview) {
    updateTitles({ para, de, mensaje });
  }
}

async function copyGeneratedLink() {
  if (!generatedLink.value) {
    generatorMessage.textContent = "Primero generá un link.";
    return;
  }

  try {
    await navigator.clipboard.writeText(generatedLink.value);
    generatorMessage.textContent = "Link generado copiado.";
  } catch (error) {
    generatorMessage.textContent = "No se pudo copiar el link.";
  }
}

function openGeneratedLink() {
  if (!generatedLink.value) {
    generatorMessage.textContent = "Primero generá un link.";
    return;
  }

  window.open(generatedLink.value, "_blank");
}

function clearGenerator() {
  paraInput.value = "";
  deInput.value = "";
  mensajeInput.value = "";
  generatorMessage.textContent = "";
  generatedLink.value = window.location.origin + window.location.pathname;

  updateTitles({
    para: "",
    de: "",
    mensaje: ""
  });
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

yesBtn.addEventListener("click", acceptMate);
resetBtn.addEventListener("click", resetFlow);
shareBtn.addEventListener("click", copyCurrentLink);

generateBtn.addEventListener("click", () => buildGeneratedLink(true));
copyGeneratedBtn.addEventListener("click", copyGeneratedLink);
openGeneratedBtn.addEventListener("click", openGeneratedLink);
clearBtn.addEventListener("click", clearGenerator);

paraInput.addEventListener("input", () => buildGeneratedLink(true));
deInput.addEventListener("input", () => buildGeneratedLink(true));
mensajeInput.addEventListener("input", () => buildGeneratedLink(true));

window.addEventListener("load", () => {
  setupViewMode();
  applyPersonalizationFromUrl();
  noBtn.style.left = "58%";
  noBtn.style.top = "0px";
});

window.addEventListener("resize", () => {
  noBtn.style.left = "58%";
  noBtn.style.top = "0px";
});