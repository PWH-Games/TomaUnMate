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

function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

function sanitizeText(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.textContent;
}

function applyPersonalization() {
  const para = getQueryParam("para");
  const de = getQueryParam("de");

  if (para) {
    const safePara = sanitizeText(para);
    mainTitle.textContent = `${safePara}, te mando un mate virtual`;
    successTitle.textContent = `${safePara}, ¡aceptaste el mate!`;
  }

  if (de) {
    const safeDe = sanitizeText(de);
    mainSubtitle.textContent = `Está calentito, bien cebado y te lo manda ${safeDe}.`;
    successSubtitle.textContent = `Gran elección. Este mate virtual te lo mandó ${safeDe} con toda la buena onda.`;
  }
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

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copiedMessage.textContent = "Link copiado al portapapeles.";
  } catch (error) {
    copiedMessage.textContent = "No se pudo copiar el link.";
  }
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

yesBtn.addEventListener("click", acceptMate);
resetBtn.addEventListener("click", resetFlow);
shareBtn.addEventListener("click", copyLink);

window.addEventListener("load", () => {
  applyPersonalization();

  noBtn.style.left = "58%";
  noBtn.style.top = "0px";
});

window.addEventListener("resize", () => {
  noBtn.style.left = "58%";
  noBtn.style.top = "0px";
});