/* =========================================================
   PANTHEOS GLOBAL STORE V11
   MAIN JAVASCRIPT
   Mobile-first • Premium • Lightweight
   ========================================================= */

"use strict";

/* =========================================================
   STORE CONFIG
========================================================= */

const PANTHEOS = {
    storeName: "Pantheos Global Store",

    whatsapp: "919310651934",

    whatsappLink:
        "https://wa.me/919310651934",

    instagram:
        "https://instagram.com/pantheosglobalstore",

    telegram:
        "https://t.me/pantheosglobal",

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

    initCommunityLinks();

    initGameCards();

    initImageEffects();

    initActiveNavigation();

    initFloatingWhatsApp();

    initGenericOrderButtons();

    initPackageSelection();

    initLiveNotifications();

    initHeroParticles();

    updateCopyright();

});


/* =========================================================
   LOADER
========================================================= */

function initLoader() {

    const loader =
        document.querySelector(".page-loader") ||
        document.querySelector(".loader") ||
        document.querySelector("#loader");

    if (!loader) return;

    const progress =
        loader.querySelector(".loader-progress") ||
        loader.querySelector(".progress-bar");

    let value = 0;

    if (progress) {

        const interval = setInterval(() => {

            value += Math.floor(Math.random() * 10) + 5;

            if (value >= 100) {

                value = 100;

                progress.style.width = "100%";

                clearInterval(interval);

                setTimeout(() => {

                    loader.classList.add("loaded");

                    setTimeout(() => {
                        loader.remove();
                    }, 700);

                }, 250);

            } else {

                progress.style.width =
                    `${value}%`;

            }

        }, 70);

    } else {

        setTimeout(() => {

            loader.classList.add("loaded");

            setTimeout(() => {
                loader.remove();
            }, 700);

        }, 900);

    }

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const toggle =
        document.querySelector(".menu-toggle") ||
        document.querySelector("#menuToggle") ||
        document.querySelector("[data-menu-toggle]");

    const menu =
        document.querySelector(".mobile-menu") ||
        document.querySelector("#mobileMenu") ||
        document.querySelector("[data-mobile-menu]");

    if (!toggle || !menu) return;

    toggle.setAttribute(
        "aria-expanded",
        "false"
    );

    function closeMenu() {

        toggle.classList.remove("active");

        menu.classList.remove("active");

        document.body.classList.remove(
            "menu-open"
        );

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    function openMenu() {

        toggle.classList.add("active");

        menu.classList.add("active");

        document.body.classList.add(
            "menu-open"
        );

        toggle.setAttribute(
            "aria-expanded",
            "true"
        );

    }

    toggle.addEventListener("click", event => {

        event.preventDefault();

        if (
            menu.classList.contains("active")
        ) {

            closeMenu();

        } else {

            openMenu();

        }

    });


    menu.querySelectorAll("a").forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    document.addEventListener(
        "click",
        event => {

            if (
                menu.classList.contains("active") &&
                !menu.contains(event.target) &&
                !toggle.contains(event.target)
            ) {

                closeMenu();

            }

        }
    );


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 900) {
                closeMenu();
            }

        }
    );

}


/* =========================================================
   STICKY HEADER
========================================================= */

function initStickyHeader() {

    const header =
        document.querySelector(".site-header") ||
        document.querySelector("header");

    if (!header) return;

    function update() {

        if (window.scrollY > 25) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    update();

    window.addEventListener(
        "scroll",
        update,
        { passive: true }
    );

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute("href");

                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }

                    let target;

                    try {

                        target =
                            document.querySelector(
                                href
                            );

                    } catch {

                        return;

                    }

                    if (!target) return;

                    event.preventDefault();

                    const header =
                        document.querySelector(
                            ".site-header"
                        );

                    const offset =
                        header
                            ? header.offsetHeight + 12
                            : 10;

                    const position =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        offset;

                    window.scrollTo({
                        top: Math.max(
                            0,
                            position
                        ),
                        behavior: "smooth"
                    });

                }
            );

        });

}


/* =========================================================
   SEARCH
========================================================= */

function initSearch() {

    const inputs =
        document.querySelectorAll(
            ".search-input, " +
            "#searchInput, " +
            "[data-search]"
        );

    if (!inputs.length) return;

    inputs.forEach(input => {

        input.addEventListener(
            "input",
            () => {

                performSearch(
                    input.value
                        .trim()
                        .toLowerCase()
                );

            }
        );


        input.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                ) {

                    input.value = "";

                    performSearch("");

                    input.blur();

                }

            }
        );

    });

}


function performSearch(query) {

    const items =
        document.querySelectorAll(
            "[data-search-item], " +
            ".game-card, " +
            ".service-card, " +
            ".product-card, " +
            ".gift-card, " +
            ".ott-card"
        );

    items.forEach(item => {

        const searchableText =
            (
                item.dataset.searchText ||
                item.textContent ||
                ""
            ).toLowerCase();

        const visible =
            !query ||
            searchableText.includes(query);

        item.classList.toggle(
            "search-hidden",
            !visible
        );

        if (!visible) {

            item.setAttribute(
                "aria-hidden",
                "true"
            );

        } else {

            item.removeAttribute(
                "aria-hidden"
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

        elements.forEach(
            element =>
                element.classList.add(
                    "visible"
                )
        );

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
                threshold: 0.08,
                rootMargin:
                    "0px 0px -30px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   COUNTERS
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

        counters.forEach(
            animateCounter
        );

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
        element.dataset.counterStarted ===
        "true"
    ) {
        return;
    }

    element.dataset.counterStarted =
        "true";


    const target =
        Number(
            element.dataset.counter
        );


    if (!Number.isFinite(target)) {
        return;
    }


    const duration = 1500;

    const start =
        performance.now();


    function frame(now) {

        const progress =
            Math.min(
                (now - start) /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.floor(
                target * eased
            );


        element.textContent =
            new Intl.NumberFormat(
                "en-IN"
            ).format(value);


        if (progress < 1) {

            requestAnimationFrame(frame);

        }

    }


    requestAnimationFrame(frame);

}


/* =========================================================
   FAQ
========================================================= */

function initFAQ() {

    const questions =
        document.querySelectorAll(
            ".faq-question, " +
            ".faq-header, " +
            "[data-faq-question]"
        );

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

                const active =
                    item.classList.contains(
                        "active"
                    );


                document
                    .querySelectorAll(
                        ".faq-item.active"
                    )
                    .forEach(other => {

                        if (
                            other === item
                        ) {
                            return;
                        }

                        other.classList.remove(
                            "active"
                        );

                        const otherAnswer =
                            other.querySelector(
                                ".faq-answer"
                            );

                        if (otherAnswer) {

                            otherAnswer.style.maxHeight =
                                null;

                        }

                    });


                if (active) {

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
   FIXED MOBILE POSITION
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


    function update() {

        button.classList.toggle(
            "visible",
            window.scrollY > 450
        );

    }


    update();


    window.addEventListener(
        "scroll",
        update,
        { passive: true }
    );


    button.addEventListener(
        "click",
        event => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

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

            link.href =
                PANTHEOS.instagram;

        });


    document
        .querySelectorAll(
            "[data-telegram]"
        )
        .forEach(link => {

            link.href =
                PANTHEOS.telegram;

        });


    document
        .querySelectorAll(
            "[data-whatsapp-link]"
        )
        .forEach(link => {

            link.href =
                PANTHEOS.whatsappLink;

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

    cards.forEach(card => {

        card.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        "a, button"
                    )
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
   IMAGE EFFECTS
========================================================= */

function initImageEffects() {

    document
        .querySelectorAll(
            ".game-card img, " +
            ".product-card img, " +
            ".service-card img"
        )
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-load-error"
                    );

                }
            );

        });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const current =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() ||
        "index.html";


    document
        .querySelectorAll(
            "nav a, " +
            ".nav-links a, " +
            ".mobile-menu a"
        )
        .forEach(link => {

            const href =
                link.getAttribute(
                    "href"
                );

            if (!href) return;

            const clean =
                href
                    .split("/")
                    .pop()
                    .split("?")[0]
                    .split("#")[0]
                    .toLowerCase();


            if (
                clean &&
                clean === current
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

}


/* =========================================================
   WHATSAPP
========================================================= */

function openWhatsApp(message) {

    const url =
        PANTHEOS.whatsappLink +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   STANDARD ORDER MESSAGE
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
`🎮 PANTHEOS GLOBAL STORE

━━━━━━━━━━━━━━━━━━
ORDER DETAILS
━━━━━━━━━━━━━━━━━━

Game:
${game}
`;


    if (playerId) {

        message +=
`
Player ID:
${playerId}
`;

    }


    if (serverId) {

        message +=
`
Server ID:
${serverId}
`;

    }


    message +=
`
Package:
${packageName}

Price:
${price}

Payment Status:
${paymentStatus}

━━━━━━━━━━━━━━━━━━
⚡ FAST • SECURE • TRUSTED
━━━━━━━━━━━━━━━━━━

Please send payment screenshot after payment.`;

    return message;

}


/* =========================================================
   GENERIC ORDER BUTTONS
========================================================= */

function initGenericOrderButtons() {

    document
        .querySelectorAll(
            "[data-order-button]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const game =
                        button.dataset.game ||
                        "Gaming Top-Up";


                    const packageName =
                        button.dataset.package ||
                        "Selected Package";


                    const price =
                        button.dataset.price ||
                        "₹0";


                    const player =
                        document.querySelector(
                            "[data-player-id]"
                        );


                    const server =
                        document.querySelector(
                            "[data-server-id]"
                        );


                    const message =
                        generateOrderMessage({

                            game,

                            playerId:
                                player
                                    ?.value
                                    ?.trim() ||
                                "",

                            serverId:
                                server
                                    ?.value
                                    ?.trim() ||
                                "",

                            packageName,

                            price

                        });


                    openWhatsApp(message);

                }
            );

        });

}


/* =========================================================
   PACKAGE SELECTION
========================================================= */

function initPackageSelection() {

    const packages =
        document.querySelectorAll(
            "[data-package]"
        );


    if (!packages.length) return;


    packages.forEach(card => {

        card.setAttribute(
            "aria-selected",
            "false"
        );


        card.addEventListener(
            "click",
            () => {

                selectPackage(card);

            }
        );


        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    selectPackage(card);

                }

            }
        );

    });

}


function selectPackage(card) {

    const packages =
        document.querySelectorAll(
            "[data-package]"
        );


    packages.forEach(item => {

        item.classList.remove(
            "selected"
        );

        item.setAttribute(
            "aria-selected",
            "false"
        );

    });


    card.classList.add(
        "selected"
    );


    card.setAttribute(
        "aria-selected",
        "true"
    );


    updateOrderSummary(card);

}


/* =========================================================
   ORDER SUMMARY
========================================================= */

function updateOrderSummary(card) {

    if (!card) return;


    const packageName =
        card.dataset.package ||
        card.querySelector(
            "[data-package-name]"
        )?.textContent?.trim() ||
        "Selected Package";


    const price =
        card.dataset.price ||
        card.querySelector(
            "[data-price]"
        )?.textContent?.trim() ||
        "₹0";


    const packageElement =
        document.querySelector(
            "[data-summary-package], " +
            "#summaryProduct"
        );


    const priceElement =
        document.querySelector(
            "[data-summary-price], " +
            "#summaryPrice"
        );


    if (packageElement) {

        packageElement.textContent =
            packageName;

    }


    if (priceElement) {

        priceElement.textContent =
            price;

    }


    const summary =
        document.querySelector(
            ".order-summary-card"
        );


    if (summary) {

        summary.classList.add(
            "summary-active"
        );

    }

}


/* =========================================================
   LIVE NOTIFICATION
========================================================= */

function initLiveNotifications() {

    const element =
        document.querySelector(
            ".live-notification"
        ) ||
        document.querySelector(
            "#liveNotification"
        ) ||
        document.querySelector(
            "[data-live-notification]"
        );


    if (!element) return;


    const messages = [

        "⚡ A new order was received",

        "💎 MLBB Diamond package selected",

        "🎮 Gaming top-up order received",

        "🔥 Popular package purchased",

        "🚀 Order processed successfully",

        "⭐ New customer order received"

    ];


    let index = 0;


    function show() {

        element.classList.remove(
            "show"
        );


        setTimeout(() => {

            element.textContent =
                messages[index];


            element.classList.add(
                "show"
            );


            index =
                (index + 1) %
                messages.length;

        }, 250);

    }


    show();


    setInterval(
        show,
        6500
    );

}


/* =========================================================
   HERO PARTICLES
========================================================= */

function initHeroParticles() {

    const hero =
        document.querySelector(
            ".hero"
        ) ||
        document.querySelector(
            ".game-hero"
        );


    if (!hero) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    const container =
        document.createElement(
            "div"
        );


    container.className =
        "hero-particles";


    container.setAttribute(
        "aria-hidden",
        "true"
    );


    const amount =
        window.innerWidth < 600
            ? 10
            : 18;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "hero-particle";


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.animationDelay =
            `${Math.random() * 5}s`;


        particle.style.animationDuration =
            `${5 + Math.random() * 7}s`;


        container.appendChild(
            particle
        );

    }


    hero.appendChild(
        container
    );

}


/* =========================================================
   FLOATING WHATSAPP
========================================================= */

function initFloatingWhatsApp() {

    document
        .querySelectorAll(
            ".floating-whatsapp, " +
            ".whatsapp-btn, " +
            "[data-whatsapp]"
        )
        .forEach(button => {

            if (
                button.tagName.toLowerCase() ===
                "a"
            ) {

                if (
                    !button.getAttribute(
                        "href"
                    )
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
   COPYRIGHT
========================================================= */

function updateCopyright() {

    document
        .querySelectorAll(
            "[data-current-year]"
        )
        .forEach(element => {

            element.textContent =
                new Date()
                    .getFullYear();

        });

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
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

                button.setAttribute(
                    "aria-expanded",
                    "false"
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
   IMAGE LOAD SAFETY
========================================================= */

document.addEventListener(
    "error",
    event => {

        const element =
            event.target;


        if (
            element &&
            element.tagName === "IMG"
        ) {

            element.classList.add(
                "image-load-error"
            );

        }

    },
    true
);


/* =========================================================
   GLOBAL API
========================================================= */

window.Pantheos = {

    config: PANTHEOS,

    openWhatsApp,

    generateOrderMessage,

    updateOrderSummary,

    selectPackage,

    performSearch

};


/* =========================================================
   READY MESSAGE
========================================================= */

console.log(
    "🎮 Pantheos Global Store V11 — Main JS loaded."
);
