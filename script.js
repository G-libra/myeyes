function sayHello() {
  alert("Thanks for visiting my profile!");
}
 
document.getElementById("hello-btn").addEventListener("click", sayHello);
 

const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;
 
themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
 
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});
 

const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");
 
navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
 

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});
 

const revealEls = document.querySelectorAll(".reveal");
 
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
 
revealEls.forEach((el) => revealObserver.observe(el));
 

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("#main-nav a");
 
const activeLinkObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = document.querySelector(
        `#main-nav a[href="#${entry.target.id}"]`
      );
      if (!link) return;
 
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
 
sections.forEach((section) => activeLinkObserver.observe(section));
 