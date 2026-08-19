/* =========================================================
   PANTHEOS GLOBAL STORE V11
   MAIN JAVASCRIPT
   Version: 11.0
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL CONFIG
   ========================================================= */

const PANTHEOS = {
    storeName: "Pantheos Global Store",

    whatsapp: "919310651934",

    instagram:
        "https://instagram.com/pantheosglobalstore",

    telegram:
        "https://t.me/pantheosglobal",

    whatsappLink:
        "https://wa.me/919310651934",

    support:
        "24/7",

    currency: "₹"
};


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initMobileMenu();

    initStickyHeader();

    initSmoothScroll();

    initSearch();

    initScrollReveal();

    initCounters();

    initFAQ();

    initBackToTop();

    initFloatingWhatsApp();

    initCommunityLinks();

    initGameCards();

    initLiveNotifications();

    initImageEffects();

    initActiveNavigation();

});


/* =========================================================
   PREMIUM LOADER
   ========================================================= */

function initLoader() {

    const loader =
        document.querySelector(".loader") ||
        document.querySelector("#loader") ||
        document.querySelector(".page-loader");

    if (!loader) return;

    const progress =
        loader.querySelector(".loader-progress") ||
        loader.querySelector(".progress-bar") ||
        loader.querySelector("[data-loader-progress]");

    let value = 0;

    if (progress) {

        const interval = setInterval(() => {

            value += Math.floor(Math.random() * 8) + 4;

            if (value >= 100) {

                value = 100;

                clearInterval(interval);

                setTimeout(() => {
                    loader.classList.add("loaded");
                }, 350);

            }

            progress.style.width = `${value}%`;

        }, 80);

    } else {

        setTimeout(() => {
            loader.classList.add("loaded");
        }, 1200);

    }

    setTimeout(() => {
        loader.classList.add("loaded");
    }, 3000);
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const menuButton =
        document.querySelector(".menu-toggle") ||
        document.querySelector("#menuToggle") ||
        document.querySelector("[data-menu-toggle]");

    const mobileMenu =
        document.querySelector(".mobile-menu") ||
        document.querySelector("#mobileMenu") ||
        document.querySelector("[data-mobile-menu]");

    if (!menuButton || !mobileMenu) return;

    menuButton.addEventListener("click", () => {

        menuButton.classList.toggle("active");

        mobileMenu.classList.toggle("active");

        document.body.classList.toggle("menu-open");

    });

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                menuButton.classList.remove("active");

                mobileMenu.classList.remove("active");

                document.body.classList.remove("menu-open");

            });

        });

}


/* =========================================================
   STICKY HEADER
   ========================================================= */

function initStickyHeader() {

    const header =
        document.querySelector("header") ||
        document.querySelector(".header") ||
        document.querySelector(".navbar");

    if (!header) return;

    const updateHeader = () => {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

function initSmoothScroll() {

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", event => {

                const targetId =
                    anchor.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });

}


/* =========================================================
   SEARCH SYSTEM
   ========================================================= */

function initSearch() {

    const searchInputs =
        document.querySelectorAll(
            ".search-input, #searchInput, [data-search]"
        );

    if (!searchInputs.length) return;

    searchInputs.forEach(input => {

        input.addEventListener(
            "input",
            () => {

                const query =
                    input.value
                        .trim()
                        .toLowerCase();

                performSearch(query);

            }
        );

        input.addEventListener(
            "keydown",
            event => {

                if (event.key === "Escape") {

                    input.value = "";

                    performSearch("");

                }

            }
        );

    });

}


function performSearch(query) {

    const searchableItems =
        document.querySelectorAll(
            "[data-search-item], " +
            ".game-card, " +
            ".service-card, " +
            ".product-card, " +
            ".gift-card, " +
            ".ott-card"
        );

    searchableItems.forEach(item => {

        const text =
            item.textContent
                .toLowerCase();

        if (!query || text.includes(query)) {

            item.style.display = "";

            item.classList.remove(
                "search-hidden"
            );

        } else {

            item.style.display = "none";

            item.classList.add(
                "search-hidden"
            );

        }

    });

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal, " +
            ".scroll-reveal, " +
            "[data-reveal]"
        );

    if (!elements.length) return;

    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {
            element.classList.add("visible");
        });

        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

    elements.forEach(element => {
        observer.observe(element);
    });

}


/* =========================================================
   ANIMATED STATISTICS
   ========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    if (!counters.length) return;

    if (
        !("IntersectionObserver" in window)
    ) {

        counters.forEach(counter => {
            animateCounter(counter);
        });

        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.5
            }
        );

    counters.forEach(counter => {
        observer.observe(counter);
    });

}


function animateCounter(element) {

    if (
        element.dataset.counterStarted === "true"
    ) {
        return;
    }

    element.dataset.counterStarted = "true";

    const target =
        parseInt(
            element.dataset.counter,
            10
        );

    if (
        Number.isNaN(target)
    ) {
        return;
    }

    const duration = 1800;

    const startTime =
        performance.now();

    function update(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );

        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );

        const current =
            Math.floor(
                target * eased
            );

        element.textContent =
            formatNumber(current);

        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            element.textContent =
                formatNumber(target);

        }

    }

    requestAnimationFrame(update);

}


function formatNumber(number) {

    return new Intl.NumberFormat(
        "en-IN"
    ).format(number);

}


/* =========================================================
   FAQ ACCORDION
   ========================================================= */

function initFAQ() {

    const questions =
        document.querySelectorAll(
            ".faq-question, " +
            ".faq-header, " +
            "[data-faq-question]"
        );

    if (!questions.length) return;

    questions.forEach(question => {

        question.addEventListener(
            "click",
            () => {

                const item =
                    question.closest(
                        ".faq-item"
                    );

                if (!item) return;

                const answer =
                    item.querySelector(
                        ".faq-answer"
                    );

                const isActive =
                    item.classList.contains(
                        "active"
                    );

                document
                    .querySelectorAll(
                        ".faq-item.active"
                    )
                    .forEach(activeItem => {

                        if (
                            activeItem !== item
                        ) {

                            activeItem.classList.remove(
                                "active"
                            );

                            const activeAnswer =
                                activeItem.querySelector(
                                    ".faq-answer"
                                );

                            if (activeAnswer) {

                                activeAnswer.style.maxHeight =
                                    null;

                            }

                        }

                    });

                if (isActive) {

                    item.classList.remove(
                        "active"
                    );

                    if (answer) {
                        answer.style.maxHeight =
                            null;
                    }

                } else {

                    item.classList.add(
                        "active"
                    );

                    if (answer) {

                        answer.style.maxHeight =
                            answer.scrollHeight +
                            "px";

                    }

                }

            }
        );

    });

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function initBackToTop() {

    const button =
        document.querySelector(
            ".back-to-top"
        ) ||
        document.querySelector(
            "#backToTop"
        ) ||
        document.querySelector(
            "[data-back-top]"
        );

    if (!button) return;

    const update = () => {

        if (window.scrollY > 500) {

            button.classList.add(
                "visible"
            );

        } else {

            button.classList.remove(
                "visible"
            );

        }

    };

    window.addEventListener(
        "scroll",
        update,
        { passive: true }
    );

    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   FLOATING WHATSAPP
   ========================================================= */

function initFloatingWhatsApp() {

    const buttons =
        document.querySelectorAll(
            ".whatsapp-btn, " +
            ".floating-whatsapp, " +
            "[data-whatsapp]"
        );

    if (!buttons.length) return;

    buttons.forEach(button => {

        if (
            button.tagName.toLowerCase() === "a"
        ) {

            if (
                !button.getAttribute("href")
            ) {

                button.href =
                    PANTHEOS.whatsappLink;

            }

            return;
        }

        button.addEventListener(
            "click",
            () => {

                openWhatsApp(
                    "Hello Pantheos Global Store! I need assistance."
                );

            }
        );

    });

}


/* =========================================================
   COMMUNITY LINKS
   ========================================================= */

function initCommunityLinks() {

    document
        .querySelectorAll(
            "[data-instagram]"
        )
        .forEach(link => {

            link.setAttribute(
                "href",
                PANTHEOS.instagram
            );

        });

    document
        .querySelectorAll(
            "[data-telegram]"
        )
        .forEach(link => {

            link.setAttribute(
                "href",
                PANTHEOS.telegram
            );

        });

    document
        .querySelectorAll(
            "[data-whatsapp-link]"
        )
        .forEach(link => {

            link.setAttribute(
                "href",
                PANTHEOS.whatsappLink
            );

        });

}


/* =========================================================
   GAME CARD NAVIGATION
   ========================================================= */

function initGameCards() {

    const cards =
        document.querySelectorAll(
            "[data-game-page]"
        );

    if (!cards.length) return;

    cards.forEach(card => {

        card.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest("a") ||
                    event.target.closest("button")
                ) {
                    return;
                }

                const page =
                    card.dataset.gamePage;

                if (page) {
                    window.location.href =
                        page;
                }

            }
        );

    });

}


/* =========================================================
   LIVE ORDER NOTIFICATIONS
   ========================================================= */

function initLiveNotifications() {

    const container =
        document.querySelector(
            ".live-notification"
        ) ||
        document.querySelector(
            "#liveNotification"
        ) ||
        document.querySelector(
            "[data-live-notification]"
        );

    if (!container) return;

    const notifications = [

        "⚡ A customer just placed an order",

        "💎 MLBB Diamonds order received",

        "🔥 Popular package purchased",

        "🎮 Gaming top-up order confirmed",

        "🚀 New order processed",

        "⭐ Customer order received",

        "💳 New digital product order"

    ];

    let index = 0;

    function showNotification() {

        container.classList.remove(
            "show"
        );

        setTimeout(() => {

            container.textContent =
                notifications[index];

            container.classList.add(
                "show"
            );

            index =
                (index + 1) %
                notifications.length;

        }, 300);

    }

    showNotification();

    setInterval(
        showNotification,
        6000
    );

}


/* =========================================================
   IMAGE HOVER EFFECTS
   ========================================================= */

function initImageEffects() {

    const images =
        document.querySelectorAll(
            ".game-card img, " +
            ".product-card img, " +
            ".service-card img"
        );

    images.forEach(image => {

        image.addEventListener(
            "mouseenter",
            () => {

                image.classList.add(
                    "image-hover"
                );

            }
        );

        image.addEventListener(
            "mouseleave",
            () => {

                image.classList.remove(
                    "image-hover"
                );

            }
        );

    });

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const links =
        document.querySelectorAll(
            "nav a, " +
            ".nav-links a, " +
            ".mobile-menu a"
        );

    links.forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href) return;

        const linkPage =
            href
                .split("/")
                .pop()
                .split("?")[0]
                .toLowerCase();

        if (
            linkPage &&
            linkPage === currentPage
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


/* =========================================================
   WHATSAPP ORDER SYSTEM
   ========================================================= */

function openWhatsApp(message) {

    const encoded =
        encodeURIComponent(message);

    const url =
        `https://wa.me/${PANTHEOS.whatsapp}?text=${encoded}`;

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   GENERATE STANDARD ORDER MESSAGE
   ========================================================= */

function generateOrderMessage({

    game = "Gaming Top-Up",

    playerId = "",

    serverId = "",

    packageName = "",

    price = "",

    paymentStatus = "Pending"

} = {}) {

    let message =
`🎮 Pantheos Global Store Order

Game: ${game}

`;

    if (playerId) {

        message +=
`Player ID:
${playerId}

`;

    }

    if (serverId) {

        message +=
`Server ID:
${serverId}

`;

    }

    message +=
`Package:
${packageName}

Price:
${price}

Payment Status:
${paymentStatus}

Please send payment screenshot after payment.`;

    return message;

}


/* =========================================================
   GENERIC ORDER BUTTON
   ========================================================= */

function initGenericOrderButtons() {

    document
        .querySelectorAll(
            "[data-order-button]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const game =
                        button.dataset.game ||
                        "Gaming Top-Up";

                    const packageName =
                        button.dataset.package ||
                        "Selected Package";

                    const price =
                        button.dataset.price ||
                        "₹0";

                    const playerInput =
                        document.querySelector(
                            "[data-player-id]"
                        );

                    const serverInput =
                        document.querySelector(
                            "[data-server-id]"
                        );

                    const playerId =
                        playerInput
                            ? playerInput.value.trim()
                            : "";

                    const serverId =
                        serverInput
                            ? serverInput.value.trim()
                            : "";

                    const message =
                        generateOrderMessage({

                            game,

                            playerId,

                            serverId,

                            packageName,

                            price,

                            paymentStatus:
                                "Pending"

                        });

                    openWhatsApp(message);

                }
            );

        });

}


/* =========================================================
   FORM VALIDATION
   ========================================================= */

function validateRequiredInputs(
    container = document
) {

    const required =
        container.querySelectorAll(
            "[required]"
        );

    let valid = true;

    required.forEach(input => {

        const value =
            input.value.trim();

        if (!value) {

            input.classList.add(
                "input-error"
            );

            valid = false;

        } else {

            input.classList.remove(
                "input-error"
            );

        }

    });

    return valid;

}


/* =========================================================
   PLAYER ID VALIDATION
   ========================================================= */

function validatePlayerId(value) {

    if (!value) {
        return false;
    }

    return /^[0-9]{4,20}$/.test(
        value
    );

}


/* =========================================================
   SERVER ID VALIDATION
   ========================================================= */

function validateServerId(value) {

    if (!value) {
        return false;
    }

    return /^[0-9]{2,10}$/.test(
        value
    );

}


/* =========================================================
   GENERIC PACKAGE SELECTION
   ========================================================= */

function initPackageSelection() {

    const packages =
        document.querySelectorAll(
            "[data-package]"
        );

    packages.forEach(packageCard => {

        packageCard.addEventListener(
            "click",
            () => {

                packages.forEach(card => {

                    card.classList.remove(
                        "selected"
                    );

                    card.setAttribute(
                        "aria-selected",
                        "false"
                    );

                });

                packageCard.classList.add(
                    "selected"
                );

                packageCard.setAttribute(
                    "aria-selected",
                    "true"
                );

                updateOrderSummary(
                    packageCard
                );

            }
        );

    });

}


/* =========================================================
   ORDER SUMMARY
   ========================================================= */

function updateOrderSummary(
    selectedCard
) {

    if (!selectedCard) return;

    const packageName =
        selectedCard.dataset.package ||
        selectedCard
            .querySelector(
                "[data-package-name]"
            )
            ?.textContent
            ?.trim() ||
        "Selected Package";

    const price =
        selectedCard.dataset.price ||
        selectedCard
            .querySelector(
                "[data-price]"
            )
            ?.textContent
            ?.trim() ||
        "₹0";

    const summaryPackage =
        document.querySelector(
            "[data-summary-package]"
        );

    const summaryPrice =
        document.querySelector(
            "[data-summary-price]"
        );

    if (summaryPackage) {

        summaryPackage.textContent =
            packageName;

    }

    if (summaryPrice) {

        summaryPrice.textContent =
            price;

    }

}


/* =========================================================
   INITIALIZE ORDER HELPERS
   ========================================================= */

initGenericOrderButtons();

initPackageSelection();


/* =========================================================
   GLOBAL ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }

        document.body.classList.remove(
            "menu-open"
        );

        document
            .querySelectorAll(
                ".mobile-menu.active"
            )
            .forEach(menu => {

                menu.classList.remove(
                    "active"
                );

            });

        document
            .querySelectorAll(
                ".menu-toggle.active"
            )
            .forEach(button => {

                button.classList.remove(
                    "active"
                );

            });

    }
);


/* =========================================================
   PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            document.body.classList.add(
                "page-visible"
            );

        }

    }
);


/* =========================================================
   ERROR PROTECTION
   ========================================================= */

window.addEventListener(
    "error",
    event => {

        console.warn(
            "Pantheos V11:",
            event.message
        );

    }
);


/* =========================================================
   EXPORT GLOBAL FUNCTIONS
   ========================================================= */

window.Pantheos = {

    config: PANTHEOS,

    openWhatsApp,

    generateOrderMessage,

    validateRequiredInputs,

    validatePlayerId,

    validateServerId,

    updateOrderSummary

};

console.log(
    "🎮 Pantheos Global Store V11 loaded successfully."
);
