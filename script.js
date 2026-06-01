const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const mobileLinks = document.querySelectorAll(".mobile-nav a");
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const revealElements = document.querySelectorAll(".reveal");
const heroPoster = document.getElementById("heroPoster");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function handleHeaderScroll() {
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 18);
}

function openMenu() {
  document.body.classList.add("menu-open");
  siteHeader.classList.add("is-open");
  menuToggle.classList.add("is-open");
  mobileNav.classList.add("is-open");
  menuToggle.setAttribute("aria-label", "Fechar menu");
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  siteHeader.classList.remove("is-open");
  menuToggle.classList.remove("is-open");
  mobileNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  menuToggle.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  if (menuToggle.classList.contains("is-open")) {
    closeMenu();
    return;
  }

  openMenu();
}

function scrollToTarget(target) {
  const headerOffset = siteHeader.offsetHeight + 18;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({
    top: targetTop,
    behavior: prefersReducedMotion.matches ? "auto" : "smooth",
  });
}

menuToggle.addEventListener("click", toggleMenu);
window.addEventListener("scroll", handleHeaderScroll, { passive: true });

mobileLinks.forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

anchorLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    closeMenu();
    scrollToTarget(target);
  });
});

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 1100) {
    closeMenu();
  }
});

if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -70px 0px",
    }
  );

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(function (element) {
    element.classList.add("is-visible");
  });
}

if (heroPoster && !prefersReducedMotion.matches) {
  window.addEventListener(
    "pointermove",
    function (event) {
      if (window.innerWidth < 900) {
        heroPoster.style.setProperty("--mx", "0px");
        heroPoster.style.setProperty("--my", "0px");
        return;
      }

      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 18;

      heroPoster.style.setProperty("--mx", x.toFixed(2) + "px");
      heroPoster.style.setProperty("--my", y.toFixed(2) + "px");
    },
    { passive: true }
  );
}

handleHeaderScroll();
