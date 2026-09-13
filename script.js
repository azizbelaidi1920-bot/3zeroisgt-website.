
const QUESTIONNAIRE_URL = "";
const TIKTOK_URL =
  "https://www.tiktok.com/@3zero.campus.club.isgt?_r=1&_t=ZS-99XcH4nWcVd";
const CLUB_EMAIL = "3z.campusclub.isgt@gmail.com";
const FACEBOOK_URL = "https://www.facebook.com/3zcampusclubisgt";
const INSTAGRAM_URL = "https://www.instagram.com/3zero_campus_club_isgt/";
const LINKEDIN_URL =
  "https://www.linkedin.com/company/3zero-campus-club-isg-tunis/";
const PROJECT_POLE_MANAGER = "";
const PROJECT_POLE_MANAGER_PHOTO = "";

// Tous les boutons "Rejoindre" utilisent la même variable.
document.querySelectorAll(".join-btn").forEach((btn) => {
  btn.href = QUESTIONNAIRE_URL || "#rejoindre";
  if (!QUESTIONNAIRE_URL) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const cta = document.querySelector("#rejoindre");
      if (cta) cta.scrollIntoView({ behavior: "smooth" });
    });
  }
});

// TikTok reste désactivé tant que l'URL est vide.
document.querySelectorAll(".tiktok-link").forEach((link) => {
  if (TIKTOK_URL) {
    link.href = TIKTOK_URL;
    link.target = "_blank";
    link.rel = "noopener";
    link.style.opacity = "1";
  } else {
    link.addEventListener("click", (e) => e.preventDefault());
  }
});

// Menu mobile
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
navLinks
  ?.querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );

// Header + barre de progression
const header = document.querySelector(".header");
const progress = document.querySelector(".progress");
function scrollUI() {
  header.classList.toggle("scrolled", window.scrollY > 15);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}
window.addEventListener("scroll", scrollUI, { passive: true });
scrollUI();

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Compteurs — les valeurs restent à zéro tant que les statistiques officielles ne sont pas fournies.
document.querySelectorAll("[data-count]").forEach((el) => {
  const target = Number(el.dataset.count || 0);
  let current = 0;
  const duration = 900;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    current = Math.round(target * (1 - Math.pow(1 - p, 3)));
    el.textContent = current + "+";
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
});

// Onglets événements
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    // Le contenu officiel sera ajouté ici quand les événements seront fournis.
  });
});

// Protection douce du mail affiché
document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
  a.setAttribute("aria-label", "Envoyer un e-mail à " + CLUB_EMAIL);
});
