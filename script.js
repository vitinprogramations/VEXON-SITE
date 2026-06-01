const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const mobileLinks = document.querySelectorAll(".mobile-nav a");
const revealElements = document.querySelectorAll(".reveal");
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const briefOptions = document.querySelectorAll(".brief-option");
const briefCode = document.getElementById("briefCode");
const briefTitle = document.getElementById("briefTitle");
const briefText = document.getElementById("briefText");
const briefWhatsapp = document.getElementById("briefWhatsapp");

const whatsappNumber = "5500000000000";

const briefContent = {
  site: {
    code: "SITE / DIGITAL",
    title: "Site institucional",
    text: "Ideal para apresentar a marca com autoridade, estética forte e uma estrutura clara de navegação.",
    message: "Oi, quero conversar sobre um projeto de Site institucional com a Vexon.",
  },
  landing: {
    code: "LANDING / CTA",
    title: "Landing page",
    text: "Para campanhas, lançamentos, vendas ou captação de contatos com foco em conversão.",
    message: "Oi, quero conversar sobre um projeto de Landing page com a Vexon.",
  },
  webapp: {
    code: "APP / FLOW",
    title: "Web app",
    text: "Para criar uma experiência interativa, ferramenta digital, MVP ou produto online.",
    message: "Oi, quero conversar sobre um projeto de Web app com a Vexon.",
  },
  interface: {
    code: "UI / SYSTEM",
    title: "Interface digital",
    text: "Para organizar telas, fluxos, dashboards e experiências visuais com mais clareza.",
    message: "Oi, quero conversar sobre um projeto de Interface digital com a Vexon.",
  },
};

function handleHeaderScroll() {
  if (window.scrollY > 20) {
    siteHeader.classList.add("is-scrolled");
  } else {
    siteHeader.classList.remove("is-scrolled");
  }
}

function openMenu() {
  document.body.classList.add("menu-open");
  menuToggle.classList.add("is-open");
  mobileNav.classList.add("is-open");
  menuToggle.setAttribute("aria-label", "Fechar menu");
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  menuToggle.classList.remove("is-open");
  mobileNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

function toggleMenu() {
  const menuIsOpen = menuToggle.classList.contains("is-open");

  if (menuIsOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

window.addEventListener("scroll", handleHeaderScroll);
menuToggle.addEventListener("click", toggleMenu);

mobileLinks.forEach(function (link) {
  link.addEventListener("click", closeMenu);
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

function scrollToPanel(target) {
  window.scrollTo({
    top: target.offsetTop,
    behavior: "smooth",
  });
}

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
    scrollToPanel(target);
  });
});

function updateBrief(type) {
  const content = briefContent[type];

  if (!content) {
    return;
  }

  briefCode.textContent = content.code;
  briefTitle.textContent = content.title;
  briefText.textContent = content.text;
  briefWhatsapp.href = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(content.message);

  briefOptions.forEach(function (option) {
    const isActive = option.dataset.brief === type;
    option.classList.toggle("is-active", isActive);
    option.setAttribute("aria-pressed", String(isActive));
  });
}

briefOptions.forEach(function (option) {
  option.setAttribute("aria-pressed", String(option.classList.contains("is-active")));

  option.addEventListener("click", function () {
    updateBrief(option.dataset.brief);
  });
});

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

handleHeaderScroll();
