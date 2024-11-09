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

darkToggle.addEventListener("click", function () {
  if (darkToggle.checked) {
    html.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    html.classList.remove("dark");
    localStorage.theme = "light";
  }
});

// pindahkan posisi toggle sesuai mode
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  darkToggle.checked = true;
} else {
  darkToggle.checked = false;
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
