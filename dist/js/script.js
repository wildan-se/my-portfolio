// Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;
  const toTop = document.querySelector("#to-top");

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
    toTop.classList.remove("hidden");
    toTop.classList.add("flex");
  } else {
    header.classList.remove("navbar-fixed");
    toTop.classList.remove("flex");
    toTop.classList.add("hidden");
  }
};

// Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

// Klik di luar hamburger
window.addEventListener("click", function (e) {
  if (e.target != hamburger && e.target != navMenu) {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.add("hidden");
  }
});

// // Darkmode toggle
const darkToggle = document.querySelector("#dark-toggle");
const html = document.querySelector("html");

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

//animasi contact section
gsap.registerPlugin(ScrollTrigger);

// Animate form elements on scroll
gsap.from("form > div", {
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "form",
    start: "top 80%",
  },
});

// Animate contact info on scroll
gsap.from(".grid-cols-3 > div", {
  x: -40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".grid-cols-3",
    start: "top 80%",
  },
});

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

// Initialize modal functionality
new Modal();
