// Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header ? header.offsetTop : 0;
  const toTop = document.querySelector("#to-top");

  if (header && window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
    if (toTop) {
      toTop.classList.remove("hidden");
      toTop.classList.add("flex");
    }
  } else {
    if (header) {
      header.classList.remove("navbar-fixed");
    }
    if (toTop) {
      toTop.classList.remove("flex");
      toTop.classList.add("hidden");
    }
  }
};

// Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("hamburger-active");
    navMenu.classList.toggle("hidden");

    // Update aria-expanded for accessibility
    const isExpanded = !navMenu.classList.contains("hidden");
    hamburger.setAttribute("aria-expanded", isExpanded);
  });

  // Klik di luar hamburger
  window.addEventListener("click", function (e) {
    if (e.target != hamburger && e.target != navMenu) {
      hamburger.classList.remove("hamburger-active");
      navMenu.classList.add("hidden");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
}

// // Darkmode toggle
const darkToggle = document.querySelector("#dark-toggle");
const html = document.querySelector("html");

if (darkToggle && html) {
  // Fungsi untuk mengatur tema sesuai toggle
  function setTheme(isDark) {
    if (isDark) {
      html.classList.add("dark");
      localStorage.theme = "dark";
      darkToggle.checked = true;
    } else {
      html.classList.remove("dark");
      localStorage.theme = "light";
      darkToggle.checked = false;
    }
  }

  // Event saat toggle diklik
  darkToggle.addEventListener("click", function () {
    setTheme(darkToggle.checked);
  });

  // Atur tema saat halaman dimuat
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    setTheme(true);
  } else {
    setTheme(false);
  }
}

//animasi client section
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".client-card");
  cards.forEach((card, index) => {
    card.style.setProperty("--index", index);
  });

  // GSAP Animation for Stats
  gsap.from(".grid-cols-3 > div", {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".grid-cols-3",
      start: "top 80%",
    },
  });
});

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize all animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set initial state for elements
  gsap.set(".animate-on-scroll", { opacity: 0, y: 50 });

  // Hero Section Animations
  initHeroAnimations();

  // About Section Animations
  initAboutAnimations();

  // Portfolio Section Animations
  initPortfolioAnimations();

  // Pencapaian Section Animations
  initPencapaianAnimations();

  // Clients Section Animations
  initClientsAnimations();

  // Contact Section Animations
  initContactAnimations();

  // Blog Section Animations
  initBlogAnimations();

  // General scroll animations for common elements
  initGeneralScrollAnimations();
});

// Hero Section Animations
function initHeroAnimations() {
  // Animate hero content from left
  gsap.from("#home .space-y-8", {
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#home",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // Animate hero image from right
  gsap.from("#home .w-full.-mt-\\[3rem\\]", {
    x: 100,
    opacity: 0,
    duration: 1.2,
    delay: 0.3,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#home",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
}

// Fungsi modal
class Modal {
  constructor() {
    this.init();
  }

  init() {
    // Event listeners
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-modal-target]");
      const closeBtn = e.target.closest("[data-modal-close]");

      if (trigger) {
        e.preventDefault();
        const modal = document.getElementById(trigger.dataset.modalTarget);
        this.openModal(modal);
      }

      if (closeBtn) {
        e.preventDefault();
        const modal = closeBtn.closest('[role="dialog"]');
        this.closeModal(modal);
      }
    });

    // Close modal when clicking outside
    document.addEventListener("click", (e) => {
      if (
        e.target.hasAttribute("role") &&
        e.target.getAttribute("role") === "dialog"
      ) {
        this.closeModal(e.target);
      }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const modal = document.querySelector('[role="dialog"]:not(.hidden)');
        if (modal) this.closeModal(modal);
      }
    });
  }

  openModal(modal) {
    if (!modal) return;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // Focus management
    const closeButton = modal.querySelector("[data-modal-close]");
    if (closeButton) {
      setTimeout(() => closeButton.focus(), 100);
    }
  }

  closeModal(modal) {
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";

    // Return focus
    const trigger = document.querySelector(`[data-modal-target="${modal.id}"]`);
    if (trigger) {
      trigger.focus();
    }
  }
}

// Animate blob elements
gsap.from("#home .animate-blob", {
  scale: 0,
  opacity: 0,
  duration: 1.5,
  stagger: 0.2,
  ease: "elastic.out(1, 0.5)",
  scrollTrigger: {
    trigger: "#home",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});

// About Section Animations
function initAboutAnimations() {
  // Animate about content
  gsap.from("#about .lg\\:w-1\\/2:first-child", {
    x: -80,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#about",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  // Animate social media section
  gsap.from("#about .lg\\:w-1\\/2:last-child", {
    x: 80,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#about",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  // Animate social buttons
  gsap.from("#about .social-button", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "#about .flex.items-center.gap-4",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
}

// Portfolio Section Animations
function initPortfolioAnimations() {
  // Animate section header
  gsap.from("#portfolio .max-w-xl", {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#portfolio",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
}

// Animate portfolio cards
gsap.from("#portfolio .group", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  stagger: 0.3,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#portfolio .flex.flex-wrap",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});

// Pencapaian Section Animations
function initPencapaianAnimations() {
  const pencapaianSection = document.querySelector("#portfolio + section");

  if (pencapaianSection) {
    // Animate section header
    gsap.from(pencapaianSection.querySelector(".max-w-xl"), {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: pencapaianSection,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }
}

// Clients Section Animations
function initClientsAnimations() {
  // Animate header
  gsap.from("#clients .max-w-4xl", {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#clients",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // Animate client cards with 3D effect
  gsap.from("#clients .client-card", {
    rotationY: 90,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#clients .client-gallery",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
}

// Animate background blobs
gsap.from("#clients .absolute.w-\\[500px\\]", {
  scale: 0,
  opacity: 0,
  duration: 2,
  stagger: 0.5,
  ease: "elastic.out(1, 0.3)",
  scrollTrigger: {
    trigger: "#clients",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});

// Contact Section Animations
function initContactAnimations() {
  // Animate header
  gsap.from("#contact .max-w-2xl", {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#contact",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // Animate form
  gsap.from("#contact form", {
    y: 80,
    opacity: 0,
    duration: 1.2,
    delay: 0.3,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#contact form",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });

  // Animate form fields
  gsap.from("#contact form .group", {
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "#contact form",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // Animate contact info
  gsap.from("#contact .grid.grid-cols-1.gap-8.md\\:grid-cols-3 > div", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#contact .grid.grid-cols-1.gap-8.md\\:grid-cols-3",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
}

// Animate floating elements
gsap.from("#contact .animate-float, #contact .animate-float-delay", {
  scale: 0,
  rotation: 180,
  opacity: 0,
  duration: 1.5,
  stagger: 0.3,
  ease: "elastic.out(1, 0.5)",
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});

// Blog Section Animations
function initBlogAnimations() {
  // Animate blog header
  gsap.from("#blog .max-w-xl", {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#blog",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // Animate "Coming Soon" text with special effect
  gsap.from("#blog .bg-gradient-to-r", {
    scale: 0.5,
    opacity: 0,
    duration: 1.5,
    ease: "elastic.out(1, 0.5)",
    scrollTrigger: {
      trigger: "#blog .bg-gradient-to-r",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
}

// General scroll animations
function initGeneralScrollAnimations() {
  // Animate all section headers
  gsap.utils.toArray("h2, h3, h4").forEach((heading) => {
    gsap.from(heading, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: heading,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

// Animate paragraphs
gsap.utils.toArray("p").forEach((paragraph) => {
  gsap.from(paragraph, {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: paragraph,
      start: "top 95%",
      toggleActions: "play none none reverse",
    },
  });
});

// Animate buttons
gsap.utils.toArray("button, .button, a[class*='btn']").forEach((button) => {
  gsap.from(button, {
    scale: 0.8,
    opacity: 0,
    duration: 0.5,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: button,
      start: "top 95%",
      toggleActions: "play none none reverse",
    },
  });
});

// Parallax effect for background elements
gsap.utils.toArray(".absolute.rounded-full").forEach((blob) => {
  gsap.to(blob, {
    yPercent: -5,
    ease: "none",
    scrollTrigger: {
      trigger: blob.closest("section"),
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});

// Smooth scroll reveal animation for images
gsap.utils.toArray("img").forEach((img) => {
  gsap.from(img, {
    scale: 1.2,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: img,
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });
});

// Add magnetic effect to buttons
gsap.utils.toArray("button, .social-button").forEach((button) => {
  button.addEventListener("mouseenter", (e) => {
    gsap.to(button, { scale: 1.1, duration: 0.3, ease: "power2.out" });
  });

  button.addEventListener("mouseleave", (e) => {
    gsap.to(button, { scale: 1, duration: 0.3, ease: "power2.out" });
  });

  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.1,
      y: y * 0.1,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// Navbar animation on scroll
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const header = document.querySelector("header");

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    gsap.to(header, { y: -100, duration: 0.3 });
  } else {
    // Scrolling up
    gsap.to(header, { y: 0, duration: 0.3 });
  }

  lastScrollTop = scrollTop;
});

function openModal(modal) {
  if (!modal) return;

  // GSAP animation for modal opening
  gsap.set(modal, { opacity: 0, scale: 0.8 });
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  gsap.to(modal, {
    opacity: 1,
    duration: 0.3,
    ease: "power2.out",
  });

  gsap.to(modal.querySelector(".relative"), {
    scale: 1,
    duration: 0.4,
    ease: "back.out(1.7)",
  });

  // Focus management
  const closeButton = modal.querySelector("[data-modal-close]");
  if (closeButton) {
    setTimeout(() => closeButton.focus(), 100);
  }
}

function closeModal(modal) {
  if (!modal) return;

  // GSAP animation for modal closing
  gsap.to(modal, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    },
  });

  gsap.to(modal.querySelector(".relative"), {
    scale: 0.8,
    duration: 0.3,
    ease: "power2.in",
  });

  // Return focus
  const trigger = document.querySelector(`[data-modal-target="${modal.id}"]`);
  if (trigger) {
    trigger.focus();
  }
}

// Initialize modal functionality
new Modal();

// Add loading animation
window.addEventListener("load", () => {
  // Hide any loading screen if exists
  const loader = document.querySelector(".loader");
  if (loader) {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => loader.remove(),
    });
  }

  // Refresh ScrollTrigger after all content is loaded
  ScrollTrigger.refresh();
});

// Optimize performance
ScrollTrigger.config({
  limitCallbacks: true,
});

// Update ScrollTrigger on window resize
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});

// ============================================
// PROJECT MODAL FUNCTIONALITY
// ============================================

// Store scroll position
let scrollPosition = 0;

// Project data
const projectsData = {
  project1: {
    title: "E-Commerce Platform",
    image: "dist/img/project/wlstore.jpg",
    description:
      "Platform e-commerce lengkap yang dibangun menggunakan stack MEVN (MongoDB, Express.js, Vue.js, Node.js). Aplikasi ini menyediakan pengalaman berbelanja online yang intuitif dengan sistem autentikasi, manajemen produk, keranjang belanja, dan checkout yang aman.",
    technologies: [
      "MongoDB",
      "Express.js",
      "Vue.js",
      "Node.js",
      "Tailwind CSS",
      "JWT Authentication",
    ],
    features: [
      "Sistem autentikasi user dengan JWT",
      "Katalog produk dengan filter dan pencarian",
      "Keranjang belanja dengan real-time update",
      "Halaman checkout dengan validasi form",
      "Dashboard admin untuk manajemen produk",
      "Responsive design untuk semua device",
      "Dark mode support",
    ],
    demoLink: "#",
    githubLink: "#",
  },
  project2: {
    title: "Product Management System",
    image: "dist/img/project/crud-simpel.jpg",
    description:
      "Sistem manajemen produk berbasis web yang memungkinkan administrator untuk melakukan operasi CRUD (Create, Read, Update, Delete) dengan mudah. Aplikasi ini dilengkapi dengan interface yang user-friendly dan validasi data yang ketat untuk memastikan integritas data.",
    technologies: ["PHP", "MySQL", "Bootstrap", "JavaScript", "jQuery"],
    features: [
      "CRUD operations untuk manajemen produk",
      "Upload dan preview gambar produk",
      "Sistem validasi form yang comprehensive",
      "Search dan filter produk",
      "Pagination untuk data produk",
      "Export data ke Excel/PDF",
      "Responsive UI dengan Bootstrap",
    ],
    demoLink: "#",
    githubLink: "#",
  },
};

// Open modal function
function openProjectModal(projectId) {
  const modal = document.getElementById("projectModal");
  const modalContent = document.getElementById("modalContent");
  const project = projectsData[projectId];

  if (!modal || !modalContent || !project) return;

  // Populate modal with project data
  document.getElementById("modalImage").src = project.image;
  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalDescription").textContent = project.description;

  // Technologies
  const techContainer = document.getElementById("modalTech");
  techContainer.innerHTML = "";
  project.technologies.forEach((tech, index) => {
    const badge = document.createElement("span");
    const gradients = [
      "from-emerald-500 via-teal-500 to-cyan-500",
      "from-purple-500 via-pink-500 to-rose-500",
      "from-indigo-500 via-blue-500 to-cyan-500",
      "from-orange-500 via-red-500 to-pink-500",
      "from-green-500 via-emerald-500 to-teal-500",
      "from-violet-500 via-purple-500 to-fuchsia-500",
    ];
    const gradient = gradients[index % gradients.length];
    badge.className = `px-4 py-2 text-sm font-bold text-white rounded-full bg-gradient-to-r ${gradient} shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer`;
    badge.textContent = tech;
    techContainer.appendChild(badge);
  });

  // Features
  const featuresContainer = document.getElementById("modalFeatures");
  featuresContainer.innerHTML = "";
  project.features.forEach((feature, index) => {
    const li = document.createElement("li");
    li.className =
      "flex items-start gap-3 text-slate-700 dark:text-slate-300 group";
    li.innerHTML = `
      <svg class="w-6 h-6 mt-0.5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">${feature}</span>
    `;
    li.style.animationDelay = `${index * 0.1}s`;
    li.classList.add("opacity-0", "animate-fade-in-up");
    featuresContainer.appendChild(li);
  });

  // Links
  const demoLink = document.getElementById("modalDemoLink");
  const githubLink = document.getElementById("modalGithubLink");

  if (project.demoLink && project.demoLink !== "#") {
    demoLink.href = project.demoLink;
    demoLink.classList.remove("hidden");
  } else {
    demoLink.classList.add("hidden");
  }

  if (project.githubLink && project.githubLink !== "#") {
    githubLink.href = project.githubLink;
    githubLink.classList.remove("hidden");
  } else {
    githubLink.classList.add("hidden");
  }

  // Show modal with animation
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Store current scroll position
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  // Prevent body scroll and maintain position
  document.documentElement.classList.add("modal-open");
  document.body.classList.add("modal-open");
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";

  // Trigger animation
  setTimeout(() => {
    modalContent.classList.remove("scale-95", "opacity-0");
    modalContent.classList.add("scale-100", "opacity-100");
  }, 10);
}

// Close modal function
function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  const modalContent = document.getElementById("modalContent");

  if (!modal || !modalContent) return;

  // Animate out
  modalContent.classList.remove("scale-100", "opacity-100");
  modalContent.classList.add("scale-95", "opacity-0");

  // Hide modal after animation
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");

    // Restore body scroll
    document.documentElement.classList.remove("modal-open");
    document.body.classList.remove("modal-open");
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";

    // Restore scroll position
    window.scrollTo(0, scrollPosition);
  }, 300);
}

// Close modal with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProjectModal();
    closeAchievementModal();
  }
});

// Prevent modal content click from closing modal
document.addEventListener("DOMContentLoaded", () => {
  const modalContent = document.getElementById("modalContent");
  if (modalContent) {
    modalContent.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  const achievementModalContent = document.getElementById(
    "achievementModalContent"
  );
  if (achievementModalContent) {
    achievementModalContent.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
});

// ============================================
// ACHIEVEMENT MODAL FUNCTIONALITY
// ============================================

// Achievement data
const achievementsData = {
  achievement1: {
    title: "Sertifikat Eskul Mikrotik",
    image: "dist/img/portfolio/eskul.jpeg",
    description:
      "Sertifikat yang diberikan atas partisipasi aktif dan pencapaian dalam kegiatan ekstrakurikuler Mikrotik. Mempelajari dasar-dasar konfigurasi router, networking, dan manajemen jaringan menggunakan MikroTik RouterOS.",
  },
  achievement2: {
    title: "Sertifikat Mikrotik PT. Sanken",
    image: "dist/img/portfolio/sanken.jpeg",
    description:
      "Sertifikat pelatihan resmi dari PT. Sanken Indonesia yang mengakui kompetensi dalam konfigurasi dan manajemen jaringan menggunakan perangkat MikroTik. Pelatihan ini mencakup routing, firewall, bandwidth management, dan network security.",
  },
  achievement3: {
    title: "Sertifikat LSP Junior Network Administrator",
    image: "dist/img/portfolio/lsp_jna.jpeg",
    description:
      "Sertifikasi kompetensi dari Lembaga Sertifikasi Profesi (LSP) sebagai Junior Network Administrator. Sertifikat ini memvalidasi kemampuan dalam instalasi, konfigurasi, dan troubleshooting jaringan komputer sesuai standar SKKNI (Standar Kompetensi Kerja Nasional Indonesia).",
  },
  achievement4: {
    title: "Sertifikat LSP Junior Web Developer",
    image: "dist/img/portfolio/lsp_jwd.jpeg",
    description:
      "Sertifikasi kompetensi dari Lembaga Sertifikasi Profesi (LSP) sebagai Junior Web Developer. Mencakup kemampuan dalam HTML, CSS, JavaScript, dan pengembangan website responsif sesuai standar industri dan SKKNI.",
  },
};

// Open achievement modal function
function openAchievementModal(achievementId) {
  const modal = document.getElementById("achievementModal");
  const modalContent = document.getElementById("achievementModalContent");
  const achievement = achievementsData[achievementId];

  if (!modal || !modalContent || !achievement) return;

  // Populate modal with achievement data
  document.getElementById("achievementModalImage").src = achievement.image;
  document.getElementById("achievementModalTitle").textContent =
    achievement.title;
  document.getElementById("achievementModalDescription").textContent =
    achievement.description;

  // Show modal with animation
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Store current scroll position
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  // Prevent body scroll and maintain position
  document.documentElement.classList.add("modal-open");
  document.body.classList.add("modal-open");
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";

  // Trigger animation
  setTimeout(() => {
    modalContent.classList.remove("scale-95", "opacity-0");
    modalContent.classList.add("scale-100", "opacity-100");
  }, 10);
}

// Close achievement modal function
function closeAchievementModal() {
  const modal = document.getElementById("achievementModal");
  const modalContent = document.getElementById("achievementModalContent");

  if (!modal || !modalContent) return;

  // Animate out
  modalContent.classList.remove("scale-100", "opacity-100");
  modalContent.classList.add("scale-95", "opacity-0");

  // Hide modal after animation
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");

    // Restore body scroll
    document.documentElement.classList.remove("modal-open");
    document.body.classList.remove("modal-open");
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";

    // Restore scroll position
    window.scrollTo(0, scrollPosition);
  }, 300);
}
