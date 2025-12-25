/* =========================
   TIME & BACKGROUND
========================= */

const JST_OFFSET = 9 * 60;

const getJSTHour = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + JST_OFFSET * 60000).getHours();
};

const getCurrentBackground = () => {
  const hour = getJSTHour();
  if (hour >= 5 && hour < 8) return "morning";
  if (hour >= 8 && hour < 17) return "noon";
  if (hour >= 17 && hour < 19) return "evening";
  return "night";
};

/* =========================
   CONSTANTS
========================= */

const VIDEO_PATH = {
  morning: "public/video/Morning.mp4",
  noon: "public/video/Noon.mp4",
  evening: "public/video/Evening.mp4",
  night: "public/video/Night.mp4",
};

const ANIMATION_LOADING = {
  morning: "Morning-animation.json",
  noon: "Noon-animation.json",
  evening: "Evening-animation.json",
  night: "Night-animation.json",
};

const ENTER_FRAME_TRIGGER = 378;
const INITIAL_SEGMENT = [0, 398];

/* =========================
   DOM ELEMENTS
========================= */

const video = document.getElementById("bg-video");
const spinner = document.getElementById("lottie");
const logoLoading = document.getElementById("lottieBg");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const header = document.getElementById("main-header");

let isMenuOpen = false;
let animSpinner = null;

/* =========================
   VIDEO SETUP
========================= */

const currentBg = getCurrentBackground();

video.src = VIDEO_PATH[currentBg];
video.load();

/* =========================
   HEADER
========================= */

const showHeader = () => {
  header?.classList.add("show");
  document.querySelector(".mobile-menu-btn")?.classList.add("show");
};

/* =========================
   LOTTIE LOADING
========================= */

const playLogoAnimation = () => {
  lottie.loadAnimation({
    container: logoLoading,
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: "logo-animation.json",
  });
};

const onEnterFrame = (e) => {
  if (e.currentTime >= ENTER_FRAME_TRIGGER) {
    animSpinner.removeEventListener("enterFrame", onEnterFrame);
    document.querySelector(".content")?.classList.add("show");
    playLogoAnimation();
  }
};

animSpinner = lottie.loadAnimation({
  container: spinner,
  renderer: "svg",
  loop: false,
  autoplay: true,
  path: ANIMATION_LOADING[currentBg],
  initialSegment: INITIAL_SEGMENT,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
});

animSpinner.addEventListener("enterFrame", onEnterFrame);

animSpinner.addEventListener("complete", () => {
  animSpinner.destroy();
  setTimeout(() => {
    video.play().catch((err) => {
      console.warn("Autoplay blocked:", err);
    });
  }, 300);

  const loadingWrapper = document.getElementById("loading-wrapper");
  if (loadingWrapper) loadingWrapper.style.backgroundColor = "transparent";

  video.classList.add("move");
  showHeader();
});

/* =========================
   MOBILE MENU
========================= */

menuBtn.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;

  menuBtn.classList.toggle("active", isMenuOpen);
  mobileMenu.classList.toggle("show", isMenuOpen);

  menuBtn.innerHTML = isMenuOpen
    ? '<i class="bi bi-x-lg"></i>'
    : '<i class="bi bi-list"></i>';
});
