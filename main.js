document.addEventListener("DOMContentLoaded", () => {
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
  ];

  function renderWorks(items, perRow = 4) {
    const container = document.getElementById("works-list");
    container.innerHTML = "";

    const fragment = document.createDocumentFragment();

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
        <video muted loop playsinline preload="none" data-src="${item.source}"></video>
      `;

        row.appendChild(el);
      });

      fragment.appendChild(row);
    }

    container.appendChild(fragment);
  }

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
    morning: "public/background/Morning.mp4",
    noon: "public/background/Noon.mp4",
    evening: "public/background/Evening.mp4",
    night: "public/background/Night.mp4",
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
  const isMobile = window.matchMedia("(max-width: 1024px)").matches;

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
    if (!isMobile) {
      video.style.opacity = "0";
    }

    if (e.currentTime >= 358 && !pixelZoomStarted) {
      loadingWrapper.style.background = "transparent";

      pixelZoomStarted = true;
      if (isMobile) {
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

      canvas.width = Math.floor(window.innerWidth / pixelSize);
      canvas.height = Math.floor(window.innerHeight / pixelSize);

      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      canvas.style.clipPath = `circle(${radius}% at 50% 50%)`;
      video.style.clipPath = `circle(${radius}% at 50% 50%)`;
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        video.style.opacity = "1";
      }
    }

    requestAnimationFrame(animate);
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

      video.style.clipPath = `circle(${radius}% at 50% 50%)`;

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
      canvas.style.display = "none";
    });
  };

  const startSuwa = ({ isMobile }) => {
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
    setTimeout(() => {
      wrapper.style.opacity = "0";

      showWorksPage();
      showLogo();
      typeChar();

      isTransitioning = false;
    }, 500);
    // videoFx.onended = () => {
    //    wrapper.style.opacity = "0";

    //   showWorksPage();
    //   showLogo();
    //   typeChar();

    //   isTransitioning = false;
    // };
  };

  /* =====================================================
   WORKS PAGE UI
  ===================================================== */
  function setupWorksScrollAnimation() {
    const rows = document.querySelectorAll(".works-row");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    rows.forEach((row) => observer.observe(row));
  }

  function setupVideoLazyLoad() {
    const videos = document.querySelectorAll("video[data-src]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            if (!video.src) {
              video.src = video.dataset.src;
              video.load();
            }
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        rootMargin: "200px",
        threshold: 0.25,
      }
    );

    videos.forEach((v) => observer.observe(v));
  }

  const showWorksPage = () => {
    worksPage.classList.add("show");
    renderWorks(worksData);

    requestAnimationFrame(() => {
      setupVideoLazyLoad();
      setupWorksScrollAnimation();
    });
  };

  function showLogo() {
    const logo = document.querySelector(".intro-logo");
    logo.classList.add("show");
  }
  const textEl = document.getElementById("typing-text");
  const text = `SWIPEDRAMA brings you bite-sized vertical dramas perfect for filling spare moments.
With episodes lasting just 1 minute, immerse yourself instantly in exciting stories about
romance, revenge, horror, and thrilling relationships.`;

  function typeChar() {
    const fragment = document.createDocumentFragment();
    let delayIndex = 0;

    const spans = [];

    [...text].forEach((char) => {
      if (char === "\n") {
        spans.push("<br>");
        return;
      }

      const displayChar = char === " " ? "&nbsp;" : char;
      spans.push(`<span style="--d:${delayIndex}">${displayChar}</span>`);
      delayIndex++;
    });

    textEl.innerHTML = spans.join("");

    requestAnimationFrame(() => {
      textEl.classList.add("typing-active");
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
    canvas.style.display = "block";

    destroyAnim(Anim.works);
    destroyAnim(Anim.suwa);

    resetWorksPageUI();

    overlay.style.opacity = "0";
    overlay.classList.remove("fade-out");

    worksPage.classList.remove("show");

    video.style.opacity = "1";
    logoLoading.style.display = "block";

    isTransitioning = false;
  };

  function resetWorksScroll() {
    const worksContent = document.querySelector(".works-content");
    if (worksContent) {
      worksContent.scrollTop = 0;
    }
  }

  const resetWorksPageUI = () => {
    worksPage.classList.remove("show");
    resetWorksScroll();

    worksPageRows.forEach((row) => {
      row.classList.remove("is-visible");
    });

    // reset typing text
    textElement.textContent = "";
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
  });

  homeMobileBtn.addEventListener("click", () => {
    navigateTo("home");
    mobileOverlayBlur.style.display = "none";

    menuBtn.click();
  });
});
