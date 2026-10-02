// ================================
// PORTFÓLIO VALDEIR SANTOS
// ================================

const WHATSAPP_NUMBER = "556194349889";

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const backTop = document.getElementById("backTop");
const whatsappButton = document.getElementById("whatsappButton");
const year = document.getElementById("year");

// Ano automático
if (year) {
    year.textContent = new Date().getFullYear();
}

// ================================
// WHATSAPP
// ================================
function updateWhatsAppLink() {
    if (!whatsappButton) return;

    const message = encodeURIComponent(
        "Olá, Valdeir! Vi seu portfólio e gostaria de solicitar um orçamento para um projeto."
    );

    whatsappButton.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

updateWhatsAppLink();

// ================================
// MENU MOBILE
// ================================
if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (!navMenu || !menuToggle) return;

        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
    });
});

// ================================
// HEADER + BOTÃO VOLTAR AO TOPO
// ================================
function handleScroll() {
    const position = window.scrollY;

    if (header) {
        header.classList.toggle("scrolled", position > 30);
    }

    if (backTop) {
        backTop.classList.toggle("show", position > 500);
    }

    updateActiveNav();
}

window.addEventListener("scroll", handleScroll, { passive: true });

// ================================
// MENU ATIVO CONFORME A SEÇÃO
// ================================
const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {
    let current = "inicio";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 160;

        if (window.scrollY >= sectionTop) {
            current = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );
    });
}

// ================================
// ANIMAÇÃO AO ENTRAR NA TELA
// ================================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

// ================================
// EFEITO DE LUZ DO MOUSE
// ================================
const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });
}

// ================================
// FECHAR MENU COM ESC
// ================================
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu && menuToggle) {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
    }
});

// ================================
// INICIALIZAÇÃO
// ================================
handleScroll();
