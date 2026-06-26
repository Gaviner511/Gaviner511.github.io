const root = document.documentElement;
const revealItems = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
const themeToggle = document.querySelector(".theme-toggle");
const toggleText = document.querySelector(".toggle-text");

const storedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");

function setTheme(theme) {
  root.dataset.theme = theme;
  if (toggleText) toggleText.textContent = theme === "dark" ? "Light" : "Dark";
  localStorage.setItem("theme", theme);
}

setTheme(initialTheme);

themeToggle?.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

document.querySelectorAll("section[id]").forEach((section) => sectionObserver.observe(section));
