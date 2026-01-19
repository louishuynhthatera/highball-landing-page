document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // DATA - REMOVED DUPLICATES
  // ========================================
  const worksData = [
    {
      link: "https://swipedrama.com/ja/watch/the-slap/?from=Search&keyword=%E3%83%BB%E3%82%B9%E3%83%A9%E3%83%83%E3%83%97&episode=1",
      source: "public/video/HP_ザ・スラップ.mp4",
    },
    {
      link: "https://swipedrama.com/ja/watch/505-yakusoku/?from=Search&keyword=%E3%81%AE%E7%B4%84%E6%9D%9F&episode=1",
      source: "public/video/HP_505の約束.mp4",
    },
    {
      link: "https://swipedrama.com/ja/watch/fukusyupapa/?from=Search&keyword=_%E5%BE%A9%E8%AE%90%E3%83%91%E3%83%91&episode=1",
      source: "public/video/HP_復讐パパ.mp4",
    },
    {
      link: "https://swipedrama.com/ja/watch/10000-iine-karada/?from=Search&keyword=%E3%81%84%E3%81%84%E3%81%AD&episode=1",
      source: "public/video/HP_10000いいね.mp4",
    },
    {
      link: "https://swipedrama.com/ja/watch/nurarihyon-no-sumu-ie/?from=Search&keyword=%E3%81%AC%E3%82%89%E3%82%8A%E3%81%B2%E3%82%87%E3%82%93%E3%81%AE%E6%A3%B2%E3%82%80%E5%AE%B6&episode=1",
      source: "public/video/HP_ぬらりひょんの棲む家.mp4",
    },
    {
      link: "https://swipedrama.com/ja/watch/you-are-my-present/?from=Search&keyword=%E5%90%9B%E3%81%AF%E5%83%95&episode=1",
      source: "public/video/HP_君は僕のプレゼント.mp4",
    },
    {
      link: "https://swipedrama.com/ja/watch/saijaku-muhai-no-tenkousei/?from=Search&episode=1",
      source: "public/video/HP_最弱無敗の転校生.mp4",
    },
    {
      link: "https://swipedrama.com/ja/watch/kyoiku-mama-saeko/?from=Search&keyword=%E7%8B%82%E8%82%B2%E3%83%9E%E3%83%9E%E3%83%BB%E3%82%B5%E3%82%A8%E3%82%B3&episode=1",
      source: "public/video/HP_狂育ママ・サエコ.mp4",
    },

    {
      link: "https://swipedrama.com/ja/watch/10000-iine-karada/?from=Search&keyword=%E3%81%84%E3%81%84%E3%81%AD&episode=1",
      source: "public/video/HP_10000いいね.mp4",
    },
    {
      link: "https://swipedrama.com/ja/watch/nurarihyon-no-sumu-ie/?from=Search&keyword=%E3%81%AC%E3%82%89%E3%82%8A%E3%81%B2%E3%82%87%E3%82%93%E3%81%AE%E6%A3%B2%E3%82%80%E5%AE%B6&episode=1",
      source: "public/video/HP_ぬらりひょんの棲む家.mp4",
    },
    {
      link: "https://swipedrama.com/ja/watch/you-are-my-present/?from=Search&keyword=%E5%90%9B%E3%81%AF%E5%83%95&episode=1",
      source: "public/video/HP_君は僕のプレゼント.mp4",
    },
    {
      link: "https://swipedrama.com/ja/watch/saijaku-muhai-no-tenkousei/?from=Search&episode=1",
      source: "public/video/HP_最弱無敗の転校生.mp4",
    },
    {
      link: "https://swipedrama.com/ja/watch/kyoiku-mama-saeko/?from=Search&keyword=%E7%8B%82%E8%82%B2%E3%83%9E%E3%83%9E%E3%83%BB%E3%82%B5%E3%82%A8%E3%82%B3&episode=1",
      source: "public/video/HP_狂育ママ・サエコ.mp4",
    },

    {
      link: "https://swipedrama.com/ja/watch/10000-iine-karada/?from=Search&keyword=%E3%81%84%E3%81%84%E3%81%AD&episode=1",
      source: "public/video/HP_10000いいね.mp4",
    },
    {
      link: "https://swipedrama.com/ja/watch/nurarihyon-no-sumu-ie/?from=Search&keyword=%E3%81%AC%E3%82%89%E3%82%8A%E3%81%B2%E3%82%87%E3%82%93%E3%81%AE%E6%A3%B2%E3%82%80%E5%AE%B6&episode=1",
      source: "public/video/HP_ぬらりひょんの棲む家.mp4",
    },
    {
      link: "https://swipedrama.com/ja/watch/you-are-my-present/?from=Search&keyword=%E5%90%9B%E3%81%AF%E5%83%95&episode=1",
      source: "public/video/HP_君は僕のプレゼント.mp4",
    },
  ];

  // ========================================
  // CONSTANTS
  // ========================================
  const VIDEO_PATH = {
    morning: "public/background/Morning.mp4",
    noon: "public/background/Noon.mp4",
    evening: "public/background/Evening.mp4",
    night: "public/background/Night.mp4",
  };

  const ENTER_FRAME_TRIGGER = 378;
  const ENTER_FRAME_TRIGGER_SCALE = 378;
  const INITIAL_SEGMENT = [0, 398];
  const JST_OFFSET = 9 * 60;

  // ========================================
  // DOM ELEMENTS - CACHED
  // ========================================
  const DOM = {
    video: document.getElementById("bg-video"),
    spinner: document.getElementById("lottie"),
    logoLoading: document.getElementById("lottieBg"),
    menuBtn: document.getElementById("menuBtn"),
    mobileMenu: document.getElementById("mobileMenu"),
    header: document.getElementById("main-header"),
    worksBtn: document.getElementById("works-btn"),
    homeBtn: document.getElementById("home-btn"),
    worksMobileBtn: document.getElementById("works-btn-mobile"),
    homeMobileBtn: document.getElementById("home-btn-mobile"),
    worksLoading: document.getElementById("lottie-works"),
    overlay: document.getElementById("overlay"),
    worksPage: document.getElementById("works-page"),
    textElement: document.getElementById("typing-text"),
    lottieSuwa: document.getElementById("lottie-suwa"),
    mobileOverlayBlur: document.getElementById("mobile-overlay-blur"),
    canvas: document.getElementById("pixel-canvas"),
    loadingWrapper: document.getElementById("loading-wrapper"),
    explosionWrapper: document.getElementById("effect-explosion"),
    explosionVideo: document.getElementById("effect-explosion-video"),
    worksList: document.getElementById("works-list"),
    worksContent: document.querySelector(".works-content"),
    introLogo: document.querySelector(".intro-logo"),
    mobileMenuBtn: document.querySelector(".mobile-menu-btn"),
  };

  // ========================================
  // STATE MANAGEMENT
  // ========================================
  const state = {
    currentPage: "home",
    isMenuOpen: false,
    isTransitioning: false,
    pixelZoomStarted: false,
    isMobile: window.matchMedia("(max-width: 1024px)").matches,
  };

  const Anim = {
    spinner: null,
    works: null,
    suwa: null,
  };

  // ========================================
  // CLEANUP & OBSERVERS
  // ========================================
  let observers = {
    video: null,
    scroll: null,
  };

  let rafIds = {
    pixelZoom: null,
    pixelEffect: null,
    zoomMask: null,
  };

  const cleanup = {
    animations() {
      Object.keys(Anim).forEach((key) => {
        if (Anim[key]) {
          Anim[key].destroy();
          Anim[key] = null;
        }
      });
    },

    observers() {
      if (observers.video) {
        observers.video.disconnect();
        observers.video = null;
      }
      if (observers.scroll) {
        observers.scroll.disconnect();
        observers.scroll = null;
      }
    },

    animationFrames() {
      Object.values(rafIds).forEach((id) => {
        if (id) cancelAnimationFrame(id);
      });
      rafIds = { pixelZoom: null, pixelEffect: null, zoomMask: null };
    },

    all() {
      this.animations();
      this.observers();
      this.animationFrames();
    },
  };

  // ========================================
  // UTILITIES
  // ========================================
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

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // ========================================
  // VIDEO SETUP WITH OPTIMIZATION
  // ========================================
  const currentBg = getCurrentBackground();
  DOM.video.src = VIDEO_PATH[currentBg];
  DOM.video.preload = "none"; // Changed from "metadata"
  DOM.video.load();

  // Pause video when tab is hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      DOM.video.pause();
    } else if (state.currentPage === "home") {
      DOM.video.play().catch((err) => {
        console.warn("Video autoplay blocked:", err);
      });
    }
  });

  // ========================================
  // LOTTIE HELPERS
  // ========================================
  const destroyAnim = (anim) => {
    if (!anim) return;
    try {
      anim.destroy();
    } catch (err) {
      console.warn("Animation destroy error:", err);
    }
  };

  const loadLottie = (options) => {
    return lottie.loadAnimation({
      renderer: "svg",
      loop: false,
      autoplay: true,
      ...options,
    });
  };

  // ========================================
  // HEADER
  // ========================================
  const showHeader = () => {
    DOM.header?.classList.add("show");
    DOM.mobileMenuBtn?.classList.add("show");
  };

  // ========================================
  // CANVAS CONTEXT
  // ========================================
  const ctx = DOM.canvas.getContext("2d", {
    alpha: false, // Performance optimization
    desynchronized: true, // Reduce latency
  });

  // ========================================
  // ANIMATION FUNCTIONS WITH RAF CLEANUP
  // ========================================
  function runPixelZoomEffect({
    duration = 900,
    pixelFrom = 48,
    pixelTo = 2,
    radiusMid = 40,
    radiusTo = 130,
  }) {
    const start = performance.now();
    DOM.video.style.opacity = "0";
    DOM.canvas.style.opacity = "1";

    function animate(now) {
      const t = Math.min((now - start) / duration, 1);
      let radius, pixelSize;

      if (t < 0.4) {
        const p = t / 0.4;
        const eased = Math.pow(p, 4.5);
        radius = 0.1 + (40 - 0.1) * eased;
        pixelSize = pixelFrom;
      } else {
        const p = (t - 0.4) / 0.6;
        const eased = 1 - Math.pow(1 - p, 3.5);
        radius = radiusMid + (radiusTo - radiusMid) * eased;
        pixelSize = pixelFrom * 0.7 + (pixelTo - pixelFrom * 0.7) * eased;
      }

      DOM.canvas.width = Math.floor(window.innerWidth / pixelSize);
      DOM.canvas.height = Math.floor(window.innerHeight / pixelSize);

      if (DOM.video.readyState >= 2) {
        ctx.drawImage(DOM.video, 0, 0, DOM.canvas.width, DOM.canvas.height);
      }

      DOM.canvas.style.clipPath = `circle(${radius}% at 50% 50%)`;
      DOM.video.style.clipPath = `circle(${radius}% at 50% 50%)`;

      if (t < 1) {
        rafIds.pixelZoom = requestAnimationFrame(animate);
      } else {
        DOM.video.style.opacity = "1";
        rafIds.pixelZoom = null;
      }
    }

    rafIds.pixelZoom = requestAnimationFrame(animate);
  }

  function runZoomMaskEffect({
    duration = 900,
    radiusMid = 40,
    radiusTo = 130,
  }) {
    const start = performance.now();

    function animate(now) {
      const t = Math.min((now - start) / duration, 1);
      let radius;

      if (t < 0.4) {
        const p = t / 0.4;
        const eased = Math.pow(p, 4.5);
        radius = 0.1 + (40 - 0.1) * eased;
      } else {
        const p = (t - 0.4) / 0.6;
        const eased = 1 - Math.pow(1 - p, 3.5);
        radius = radiusMid + (radiusTo - radiusMid) * eased;
      }

      DOM.video.style.clipPath = `circle(${radius}% at 50% 50%)`;

      if (t < 1) {
        rafIds.zoomMask = requestAnimationFrame(animate);
      } else {
        DOM.video.style.opacity = "1";
        rafIds.zoomMask = null;
      }
    }

    rafIds.zoomMask = requestAnimationFrame(animate);
  }

  function runPixelEffect({ duration = 2000, from = 10, to = 100 }) {
    const start = performance.now();

    function animate(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const pixelSize = Math.floor(from + (to - from) * progress);

      DOM.canvas.width = Math.floor(window.innerWidth / pixelSize);
      DOM.canvas.height = Math.floor(window.innerHeight / pixelSize);

      if (DOM.video.readyState >= 2) {
        ctx.drawImage(DOM.video, 0, 0, DOM.canvas.width, DOM.canvas.height);
      }

      if (progress < 1) {
        rafIds.pixelEffect = requestAnimationFrame(animate);
      } else {
        rafIds.pixelEffect = null;
      }
    }

    rafIds.pixelEffect = requestAnimationFrame(animate);
  }

  // ========================================
  // LOADING ANIMATIONS
  // ========================================
  const playLogoHighBallAnimation = () => {
    loadLottie({
      container: DOM.logoLoading,
      path: "logo-animation.json",
    });
  };

  const onSpinnerEnterFrame = (e) => {
    if (e.currentTime >= ENTER_FRAME_TRIGGER_SCALE) {
      DOM.spinner.style.transform = "scale(1)";
    }

    if (e.currentTime >= ENTER_FRAME_TRIGGER) {
      Anim.spinner.removeEventListener("enterFrame", onSpinnerEnterFrame);
      document.querySelector(".content")?.classList.add("show");
      playLogoHighBallAnimation();
    }

    if (!state.isMobile) {
      DOM.video.style.opacity = "0";
    }

    if (e.currentTime >= 358 && !state.pixelZoomStarted) {
      DOM.loadingWrapper.style.background = "transparent";
      state.pixelZoomStarted = true;

      if (state.isMobile) {
        runZoomMaskEffect({
          duration: 1500,
          pixelFrom: 100,
          pixelTo: 2,
          radiusFrom: 2,
          radiusTo: 130,
        });
      } else {
        runPixelZoomEffect({
          duration: 1500,
          pixelFrom: 100,
          pixelTo: 2,
          radiusFrom: 2,
          radiusTo: 130,
        });
      }
    }
  };

  // Initialize spinner
  Anim.spinner = loadLottie({
    container: DOM.spinner,
    path: "spinner.json",
    initialSegment: INITIAL_SEGMENT,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });

  Anim.spinner.addEventListener("enterFrame", onSpinnerEnterFrame);

  Anim.spinner.addEventListener("complete", () => {
    destroyAnim(Anim.spinner);
    Anim.spinner = null;

    setTimeout(() => {
      DOM.video.play().catch((err) => {
        console.warn("Video autoplay failed:", err);
      });
    }, 300);

    DOM.loadingWrapper?.style.setProperty("background-color", "transparent");
    DOM.video.classList.add("move");
    showHeader();
  });

  // ========================================
  // WORKS PAGE RENDERING - OPTIMIZED
  // ========================================
  function renderWorks(items, perRow = 4) {
    if (!DOM.worksList) return;

    DOM.worksList.innerHTML = "";
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < items.length; i += perRow) {
      const row = document.createElement("div");
      row.className = "works-row";

      items.slice(i, i + perRow).forEach((item) => {
        const el = document.createElement("a");
        el.className = "work-item";
        el.href = item.link;
        el.target = "_blank";
        el.rel = "noopener noreferrer";

        el.innerHTML = `
          <video 
            muted 
            loop 
            playsinline 
            preload="none" 
            data-src="${item.source}"
            loading="lazy">
          </video>
        `;

        row.appendChild(el);
      });

      fragment.appendChild(row);
    }

    DOM.worksList.appendChild(fragment);
  }

  // ========================================
  // INTERSECTION OBSERVERS - WITH CLEANUP
  // ========================================
  function setupWorksScrollAnimation() {
    // Cleanup old observer
    if (observers.scroll) {
      observers.scroll.disconnect();
    }

    const rows = document.querySelectorAll(".works-row");

    observers.scroll = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observers.scroll.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "50px",
      }
    );

    rows.forEach((row) => observers.scroll.observe(row));
  }

  function setupVideoLazyLoad() {
    // Cleanup old observer
    if (observers.video) {
      observers.video.disconnect();
    }

    const ROW_BATCH = 2;
    const rows = Array.from(document.querySelectorAll(".works-row"));
    let currentIndex = 0;

    if (!rows.length) return;

    function loadRow(row) {
      if (row.dataset.loaded === "true") return;

      const videos = row.querySelectorAll("video[data-src]");

      videos.forEach((video, index) => {
        if (!video.src) {
          video.src = video.dataset.src;
          video.load();
          video.play().catch(() => {});
        }
      });

      row.dataset.loaded = "true";
    }

    function loadNextBatch() {
      for (let i = 0; i < ROW_BATCH && currentIndex < rows.length; i++) {
        loadRow(rows[currentIndex]);
        currentIndex++;
      }
    }

    loadNextBatch();

    observers.video = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          observers.video.unobserve(entry.target);
          loadNextBatch();

          if (currentIndex < rows.length) {
            observers.video.observe(rows[currentIndex - 1]);
          }
        });
      },
      {
        rootMargin: "300px",
        threshold: 0.1,
      }
    );

    if (rows[ROW_BATCH - 1]) {
      observers.video.observe(rows[ROW_BATCH - 1]);
    }
  }

  // ========================================
  // TYPING ANIMATION - OPTIMIZED
  // ========================================
  const text = `SWIPEDRAMA brings you bite-sized vertical dramas perfect for filling spare moments.
With episodes lasting just 1 minute, immerse yourself instantly in exciting stories about
romance, revenge, horror, and thrilling relationships.`;

  function typeChar() {
    if (!DOM.textElement) return;

    const spans = [];
    let delayIndex = 0;

    [...text].forEach((char) => {
      if (char === "\n") {
        spans.push("<br>");
        return;
      }

      const displayChar = char === " " ? "&nbsp;" : char;
      spans.push(`<span style="--d:${delayIndex}">${displayChar}</span>`);
      delayIndex++;
    });

    DOM.textElement.innerHTML = spans.join("");

    requestAnimationFrame(() => {
      DOM.textElement.classList.add("typing-active");
    });
  }

  // ========================================
  // WORKS PAGE FLOW
  // ========================================
  const startWorksPage = ({ isMobile }) => {
    resetWorksPageUI();
    state.currentPage = "works";

    // Cleanup previous animation
    if (Anim.works) {
      destroyAnim(Anim.works);
      Anim.works = null;
    }

    const options = {
      container: DOM.worksLoading,
      path: "works-page-animation.json",
    };

    if (!isMobile) {
      DOM.logoLoading.style.display = "none";
      DOM.video.style.opacity = 0;
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
      if (e.currentTime >= 30) DOM.overlay.style.opacity = 1;
    });

    Anim.works.addEventListener("complete", () => {
      destroyAnim(Anim.works);
      Anim.works = null;
      startSuwa({ isMobile });
      DOM.canvas.style.display = "none";
    });
  };

  const startSuwa = ({ isMobile }) => {
    if (Anim.suwa) {
      destroyAnim(Anim.suwa);
      Anim.suwa = null;
    }
    renderWorks(worksData);

    requestAnimationFrame(() => {
      setupVideoLazyLoad();
    });
    Anim.suwa = loadLottie({
      container: DOM.lottieSuwa,
      path: "highball_suwa_walk_1fix.json",
      initialSegment: isMobile ? [100, 160] : [0, 210],
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });

    if (isMobile) {
      DOM.logoLoading.style.display = "none";
    }

    Anim.suwa.addEventListener("complete", () => {
      destroyAnim(Anim.suwa);
      Anim.suwa = null;
      playExplosion();
    });
  };
  function playExplosionVideo() {
    const img = document.getElementById("effect-explosion-video");

    img.style.display = "block";

    img.src = "Eff_Explosion_01.apng?t=" + Date.now();

    setTimeout(() => {
      img.style.display = "none";
      img.src = "";
    }, 1000);
  }

  const playExplosion = () => {
    DOM.explosionWrapper.style.opacity = "1";
    // DOM.explosionVideo.currentTime = 0;
    // DOM.explosionVideo.play().catch(() => {});
    playExplosionVideo();

    DOM.overlay.classList.add("fade-out");
    setTimeout(() => {
      DOM.explosionWrapper.style.opacity = "0";
      showWorksPage();
      showLogo();
      typeChar();
      state.isTransitioning = false;
    }, 500);
  };

  const showWorksPage = () => {
    DOM.worksPage.classList.add("show");
    // renderWorks(worksData);

    requestAnimationFrame(() => {
      // setupVideoLazyLoad();
      setupWorksScrollAnimation();
    });
  };

  function showLogo() {
    DOM.introLogo?.classList.add("show");
  }

  // ========================================
  // HOME PAGE
  // ========================================
  const startHomePage = () => {
    state.currentPage = "home";
    DOM.canvas.style.display = "block";

    cleanup.animations();
    resetWorksPageUI();

    DOM.overlay.style.opacity = "0";
    DOM.overlay.classList.remove("fade-out");
    DOM.worksPage.classList.remove("show");
    DOM.video.style.opacity = "1";
    DOM.logoLoading.style.display = "block";

    state.isTransitioning = false;
  };

  function resetWorksScroll() {
    if (DOM.worksContent) {
      DOM.worksContent.scrollTop = 0;
    }
  }

  const resetWorksPageUI = () => {
    DOM.worksPage.classList.remove("show");
    resetWorksScroll();
    cleanup.observers();

    const rows = document.querySelectorAll(".works-row");
    rows.forEach((row) => row.classList.remove("is-visible"));

    if (DOM.textElement) {
      DOM.textElement.textContent = "";
      DOM.textElement.classList.remove("typing-active");
    }
  };

  // ========================================
  // NAVIGATION
  // ========================================
  const navigateTo = (page, { isMobile = false } = {}) => {
    if (state.isTransitioning) return;
    if (state.currentPage === page) return;

    state.isTransitioning = true;

    if (page === "works") {
      startWorksPage({ isMobile });
    } else if (page === "home") {
      startHomePage();
    }
  };

  // ========================================
  // MOBILE MENU
  // ========================================
  DOM.menuBtn.addEventListener("click", () => {
    state.isMenuOpen = !state.isMenuOpen;

    DOM.menuBtn.classList.toggle("active", state.isMenuOpen);
    DOM.mobileMenu.classList.toggle("show", state.isMenuOpen);

    DOM.menuBtn.innerHTML = state.isMenuOpen
      ? '<i class="bi bi-x-lg"></i>'
      : '<i class="bi bi-list"></i>';
  });

  // ========================================
  // EVENT LISTENERS
  // ========================================
  DOM.worksBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("works", { isMobile: false });
  });

  DOM.worksMobileBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    DOM.menuBtn.click();
    DOM.mobileOverlayBlur.style.display = "block";
    navigateTo("works", { isMobile: true });
  });

  DOM.homeBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("home");
  });

  DOM.homeMobileBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("home");
    DOM.mobileOverlayBlur.style.display = "none";
    DOM.menuBtn.click();
  });

  // ========================================
  // WINDOW RESIZE - DEBOUNCED
  // ========================================
  const handleResize = debounce(() => {
    state.isMobile = window.matchMedia("(max-width: 1024px)").matches;

    if (DOM.canvas.style.opacity === "1") {
      const pixelSize = 2;
      DOM.canvas.width = Math.floor(window.innerWidth / pixelSize);
      DOM.canvas.height = Math.floor(window.innerHeight / pixelSize);
    }
  }, 150);

  window.addEventListener("resize", handleResize, { passive: true });

  // ========================================
  // CLEANUP ON PAGE UNLOAD
  // ========================================
  window.addEventListener("beforeunload", () => {
    cleanup.all();
  });
});
