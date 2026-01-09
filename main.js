document.addEventListener("DOMContentLoaded", () => {
  const worksData = [
    {
      link: "",
      source: "",
    },
    {
      link: "",
      source: "",
    },
    {
      link: "",
      source: "",
    },
    {
      link: "",
      source: "",
    },

    {
      link: "",
      source: "",
    },
    {
      link: "",
      source: "",
    },
    {
      link: "",
      source: "",
    },
    {
      link: "",
      source: "",
    },
  ];

  function renderWorks(items, perRow = 4) {
    const container = document.getElementById("works-list");
    container.innerHTML = "";

    for (let i = 0; i < items.length; i += perRow) {
      const row = document.createElement("div");
      row.className = "works-row";

      items.slice(i, i + perRow).forEach((item) => {
        const el = document.createElement("a");
        el.className = "work-item";
        el.href = item.link;
        el.target = "_blank";
        el.rel = "noopener";

        el.innerHTML = `
       <video autoplay muted loop>
            <source src="${item?.source}" /> 
          </video>
      `;

        row.appendChild(el);
      });

      container.appendChild(row);
    }
  }

  renderWorks(worksData);

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
    morning: "Morning.json",
    noon: "Noon.json",
    evening: "Evening.json",
    night: "Night.json",
  };

  const ENTER_FRAME_TRIGGER = 378;
  const ENTER_FRAME_TRIGGER_SCALE = 378;
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
  const worksBtn = document.getElementById("works-btn");
  const homeBtn = document.getElementById("home-btn");
  const worksMobileBtn = document.getElementById("works-btn-mobile");
  const homeMobileBtn = document.getElementById("home-btn-mobile");
  const worksLoading = document.getElementById("lottie-works");
  const overlay = document.getElementById("overlay");
  const worksPage = document.getElementById("works-page");
  const worksPageRows = document.querySelectorAll(".works-row");
  const textElement = document.getElementById("typing-text");
  const lottieSuwa = document.getElementById("lottie-suwa");
  const mobileOverlayBlur = document.getElementById("mobile-overlay-blur");
  const canvas = document.getElementById("pixel-canvas");
  const loadingWrapper = document.getElementById("loading-wrapper");

  let isMenuOpen = false;
  let pixelZoomStarted = false;

  // let currentPage = "home";
  // "home" | "works"
  let currentPage = "home";
  // home | works

  let isTransitioning = false;

  const Anim = {
    spinner: null,
    works: null,
    suwa: null,
  };

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

  /* =====================================================
   LOTTIE HELPERS
  ===================================================== */
  const destroyAnim = (anim) => {
    if (!anim) return;
    anim.destroy();
  };

  const loadLottie = (options) => {
    return lottie.loadAnimation({
      renderer: "svg",
      loop: false,
      autoplay: true,
      ...options,
    });
  };

  /* =========================
   LOTTIE LOADING
========================= */

  const playLogoHighBallAnimation = () => {
    loadLottie({
      container: logoLoading,
      path: "Logo.json",
    });
  };

  const onSpinnerEnterFrame = (e) => {
    if (e.currentTime >= ENTER_FRAME_TRIGGER_SCALE) {
      spinner.style.transform = "scale(1)";
    }
    if (e.currentTime >= ENTER_FRAME_TRIGGER) {
      Anim.spinner.removeEventListener("enterFrame", onSpinnerEnterFrame);
      document.querySelector(".content")?.classList.add("show");
      playLogoHighBallAnimation();
    }

    video.style.opacity = "0";

    if (e.currentTime >= 358 && !pixelZoomStarted) {
      pixelZoomStarted = true;

      runPixelZoomEffect({
        duration: 1500,
        pixelFrom: 100,
        pixelTo: 2,
        radiusFrom: 2,
        radiusTo: 130,
      });
    }
  };

  function runPixelZoomEffect({
    duration = 900,
    pixelFrom = 48,
    pixelTo = 2,
    radiusFrom = 0,
    radiusMid = 40,
    radiusTo = 130,
  }) {
    const start = performance.now();

    video.style.opacity = "0";
    canvas.style.opacity = "1";

    function animate(now) {
      const t = Math.min((now - start) / duration, 1);

      let radius;
      let pixelSize;

      if (t < 0.4) {
        // ===== PHASE 1: 0 → 40% =====
        const p = t / 0.4; // normalize 0–1
        const eased = Math.pow(p, 1.2);

        radius = radiusFrom + (radiusMid - radiusFrom) * eased;
        pixelSize = pixelFrom + (pixelTo - pixelFrom) * eased * 0.3;
      } else {
        // ===== PHASE 2: 40% → 100% =====
        const p = (t - 0.4) / 0.6; // normalize 0–1
        const eased = 1 - Math.pow(1 - p, 3.5); // punch zoom

        radius = radiusMid + (radiusTo - radiusMid) * eased;
        pixelSize = pixelFrom * 0.7 + (pixelTo - pixelFrom * 0.7) * eased;
      }

      canvas.width = Math.floor(window.innerWidth / pixelSize);
      canvas.height = Math.floor(window.innerHeight / pixelSize);

      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      canvas.style.clipPath = `circle(${radius}% at 50% 50%)`;

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        video.style.opacity = "1";
      }
    }

    requestAnimationFrame(animate);
  }

  Anim.spinner = loadLottie({
    container: spinner,
    path: "spinner.json",
    initialSegment: INITIAL_SEGMENT,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });

  Anim.spinner.addEventListener("enterFrame", onSpinnerEnterFrame);

  Anim.spinner.addEventListener("complete", () => {
    destroyAnim(Anim.spinner);

    setTimeout(() => {
      video.play().catch(() => {});
    }, 300);

    loadingWrapper?.style.setProperty("background-color", "transparent");

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

  /* =====================================================
   PIXEL EFFECT
  ===================================================== */

  const ctx = canvas.getContext("2d");

  function resizeCanvas(pixelSize) {
    canvas.width = Math.floor(window.innerWidth / pixelSize);
    canvas.height = Math.floor(window.innerHeight / pixelSize);
  }

  function runPixelEffect({ duration = 2000, from = 10, to = 100 }) {
    const start = performance.now();

    function animate(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      const pixelSize = Math.floor(from + (to - from) * progress);

      resizeCanvas(pixelSize);

      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  /* =====================================================
   WORKS FLOW (DESKTOP + MOBILE)
  ===================================================== */

  const startWorksPage = ({ isMobile }) => {
    resetWorksPageUI();
    currentPage = "works";

    canvas.style.opacity = "1";
    destroyAnim(Anim.works);

    const options = {
      container: worksLoading,
      path: "works-page-animation.json",
    };

    if (!isMobile) {
      logoLoading.style.display = "none";
      video.style.opacity = 0;
      options.rendererSettings = {
        preserveAspectRatio: "xMidYMid slice",
      };
    }

    Anim.works = loadLottie(options);

    if (!isMobile) {
      Anim.works.addEventListener("DOMLoaded", () => {
        const duration = Anim.works.getDuration(true) * (1000 / 30);
        runPixelEffect({ duration });
      });
    }

    Anim.works.addEventListener("enterFrame", (e) => {
      if (e.currentTime >= 30) overlay.style.opacity = 1;
    });

    Anim.works.addEventListener("complete", () => {
      destroyAnim(Anim.works);
      startSuwa({ isMobile });
    });
  };

  const startSuwa = ({ isMobile }) => {
    console.log("ismobile", isMobile);
    destroyAnim(Anim.suwa);

    Anim.suwa = loadLottie({
      container: lottieSuwa,
      path: "highball_suwa_walk_1fix.json",
      initialSegment: isMobile ? [100, 160] : [0, 210],
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });

    if (isMobile) {
      logoLoading.style.display = "none";
    }

    Anim.suwa.addEventListener("complete", () => {
      destroyAnim(Anim.suwa);
      playExplosion();
    });
  };

  const playExplosion = () => {
    const wrapper = document.getElementById("effect-explosion");
    const videoFx = document.getElementById("effect-explosion-video");

    wrapper.style.opacity = "1";
    videoFx.currentTime = 0;
    videoFx.play().catch(() => {});
    overlay.classList.add("fade-out");

    videoFx.onended = () => {
      wrapper.style.opacity = "0";
      loadingWrapper.style.display = "none";
      showWorksPage();
      showLogo();
      typeChar();

      isTransitioning = false;
    };
  };

  /* =====================================================
   WORKS PAGE UI
  ===================================================== */
  const showWorksPage = () => {
    worksPage.classList.add("show");

    [...worksPageRows[0].children].forEach(
      (el) => (el.style.transform = "translateX(0)")
    );

    setTimeout(() => {
      animateRows();
      [...worksPageRows[1].children].forEach(
        (el) => (el.style.transform = "translateX(0)")
      );
    }, 3000);
  };

  function animateRows() {
    worksPageRows.forEach((row) => {
      const height = row.offsetHeight;
      row.style.transform = `translateY(-${height}px)`;
    });
  }

  function showLogo() {
    const logo = document.querySelector(".intro-logo");
    logo.classList.add("show");
  }

  const textEl = document.getElementById("typing-text");
  const text = textEl.textContent.replace(/\n\s+/g, "\n").trimStart();

  function typeChar() {
    textEl.textContent = "";

    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.animationDelay = `${i * 25}ms`;
      textEl.appendChild(span);
    });
  }

  const navigateTo = (page, { isMobile = false } = {}) => {
    if (isTransitioning) return;
    if (currentPage === page) return;

    isTransitioning = true;

    if (page === "works") {
      startWorksPage({ isMobile });
    }

    if (page === "home") {
      startHomePage();
    }
  };

  const startHomePage = () => {
    currentPage = "home";

    destroyAnim(Anim.works);
    destroyAnim(Anim.suwa);

    resetWorksPageUI();

    overlay.style.opacity = "0";
    overlay.classList.remove("fade-out");

    worksPage.classList.remove("show");
    canvas.style.opacity = "0";

    video.style.opacity = "1";
    logoLoading.style.display = "block";

    isTransitioning = false;
  };

  const resetWorksPageUI = () => {
    worksPage.classList.remove("show");

    worksPageRows.forEach((row) => {
      row.style.transform = "";
    });

    worksPageRows.forEach((row) => {
      [...row.children].forEach((el) => {
        el.style.transform = "";
      });
    });

    // reset typing text
    textElement.textContent = "";
    index = 0;
  };

  worksBtn.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("works", { isMobile: false });
  });

  //  Mobile

  worksMobileBtn.addEventListener("click", (e) => {
    e.preventDefault();
    menuBtn.click();
    mobileOverlayBlur.style.display = "block";

    navigateTo("works", { isMobile: true });
  });

  homeBtn.addEventListener("click", () => {
    navigateTo("home");
    loadingWrapper.style.display = "block";
  });

  homeMobileBtn.addEventListener("click", () => {
    navigateTo("home");
    loadingWrapper.style.display = "block";

    menuBtn.click();
  });
});
