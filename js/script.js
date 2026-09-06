"use strict";

document.documentElement.classList.add("js");

const header = document.querySelector("#site-header");
const progressBar = document.querySelector(".scroll-progress span");
const backToTop = document.querySelector(".back-to-top");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = [...document.querySelectorAll(".nav-link")];
const navAnchors = [...document.querySelectorAll("#nav-menu a")];
const trackedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
const mobileNavigation = window.matchMedia("(max-width: 900px)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let menuIsOpen = false;
let scrollFrame = null;

function setCurrentYear() {
    const year = document.querySelector("#current-year");
    if (year) {
        year.textContent = String(new Date().getFullYear());
    }
}

function initializeReveals() {
    const items = [...document.querySelectorAll(".reveal")];

    items.forEach((item) => {
        const delay = Number.parseInt(item.dataset.delay || "0", 10);
        item.style.setProperty("--reveal-delay", Math.max(delay, 0) + "ms");
    });

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
        items.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            rootMargin: "0px 0px -8% 0px",
            threshold: 0.08,
        },
    );

    items.forEach((item) => observer.observe(item));
}

function setMenuAccessibility() {
    if (!navMenu) {
        return;
    }

    if (mobileNavigation.matches && !menuIsOpen) {
        navMenu.setAttribute("inert", "");
    } else {
        navMenu.removeAttribute("inert");
    }
}

function openMenu() {
    if (!navToggle || !navMenu || menuIsOpen) {
        return;
    }

    menuIsOpen = true;
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close navigation");
    navMenu.classList.add("open");
    document.body.classList.add("nav-open");
    setMenuAccessibility();

    window.requestAnimationFrame(() => navLinks[0]?.focus());
}

function closeMenu({ restoreFocus = false } = {}) {
    if (!navToggle || !navMenu) {
        return;
    }

    menuIsOpen = false;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    navMenu.classList.remove("open");
    document.body.classList.remove("nav-open");
    setMenuAccessibility();

    if (restoreFocus) {
        navToggle.focus();
    }
}

function toggleMenu() {
    if (menuIsOpen) {
        closeMenu({ restoreFocus: true });
    } else {
        openMenu();
    }
}

function trapMenuFocus(event) {
    if (!menuIsOpen || event.key !== "Tab" || !navMenu || !navToggle) {
        return;
    }

    const focusable = [navToggle, ...navMenu.querySelectorAll("a[href]")];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

function setActiveNavigation() {
    const activationPoint = window.scrollY + Math.max(140, window.innerHeight * 0.34);
    let currentSection = "";

    trackedSections.forEach((section) => {
        if (section.offsetTop <= activationPoint) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === "#" + currentSection;
        link.classList.toggle("active", isCurrent);

        if (isCurrent) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

function updateScrollInterface() {
    const scrollTop = window.scrollY;
    const scrollableHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
    );
    const progress = Math.min((scrollTop / scrollableHeight) * 100, 100);

    header?.classList.toggle("scrolled", scrollTop > 20);
    backToTop?.classList.toggle("visible", scrollTop > 700);

    if (progressBar) {
        progressBar.style.width = progress + "%";
    }

    setActiveNavigation();
    scrollFrame = null;
}

function requestScrollUpdate() {
    if (scrollFrame !== null) {
        return;
    }

    scrollFrame = window.requestAnimationFrame(updateScrollInterface);
}

navToggle?.addEventListener("click", toggleMenu);

navAnchors.forEach((link) => {
    link.addEventListener("click", () => {
        if (mobileNavigation.matches) {
            closeMenu();
        }
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuIsOpen) {
        closeMenu({ restoreFocus: true });
        return;
    }

    trapMenuFocus(event);
});

mobileNavigation.addEventListener("change", () => {
    closeMenu();
    setMenuAccessibility();
});

backToTop?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: reducedMotion.matches ? "auto" : "smooth",
    });
});

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate, { passive: true });

setCurrentYear();
setMenuAccessibility();
initializeReveals();
updateScrollInterface();
