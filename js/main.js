/* =========================================================
   PANTHEOS GLOBAL STORE V11
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. PREMIUM LOADER
    ===================================================== */

    const loader = document.querySelector(".page-loader");

    if (loader) {
        window.addEventListener("load", () => {

            setTimeout(() => {
                loader.classList.add("hidden");
            }, 500);

        });
    }


    /* =====================================================
       02. STICKY HEADER
    ===================================================== */

    const header = document.querySelector(".site-header");

    const handleHeader = () => {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    handleHeader();

    window.addEventListener("scroll", handleHeader, {
        passive: true
    });


    /* =====================================================
       03. MOBILE MENU
    ===================================================== */

    const mobileButton =
        document.querySelector(".mobile-menu-btn");

    const mobileMenu =
        document.querySelector(".mobile-menu");

    if (mobileButton && mobileMenu) {

        mobileButton.addEventListener("click", () => {

            const opened =
                mobileMenu.classList.toggle("open");

            mobileButton.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );

            mobileButton.innerHTML =
                opened ? "✕" : "☰";

        });


        mobileMenu.querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    mobileMenu.classList.remove("open");

                    mobileButton.innerHTML = "☰";

                    mobileButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                });

            });

    }


    /* =====================================================
       04. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if (revealElements.length) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        entry.target.classList.add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       05. BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");

    if (backToTop) {

        const updateBackToTop = () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("visible");

            } else {

                backToTop.classList.remove("visible");

            }

        };

        updateBackToTop();

        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       06. SMOOTH INTERNAL LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top
                +
                window.scrollY
                -
                headerHeight
                -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       07. ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    document.querySelectorAll(
        ".desktop-nav a, .mobile-menu a"
    ).forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href) return;

        const cleanHref =
            href
                .split("?")[0]
                .split("#")[0]
                .split("/")
                .pop()
                .toLowerCase();

        if (
            cleanHref &&
            cleanHref === currentPage
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       08. ANIMATED COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    if (counters.length) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        animateCounter(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.5
                }
            );

        counters.forEach(counter => {

            counterObserver.observe(counter);

        });

    }


    /* =====================================================
       09. PRICE CARD SELECTION
    ===================================================== */

    setupPriceCards();


    /* =====================================================
       10. PRODUCT SEARCH
    ===================================================== */

    setupSearch();


    /* =====================================================
       11. FAQ ACCORDION
    ===================================================== */

    setupFAQ();


    /* =====================================================
       12. IMAGE ERROR PROTECTION
    ===================================================== */

    document.querySelectorAll("img")
        .forEach(img => {

            img.addEventListener(
                "error",
                () => {

                    img.classList.add(
                        "image-error"
                    );

                }
            );

        });


    /* =====================================================
       13. ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            if (
                mobileMenu &&
                mobileMenu.classList.contains("open")
            ) {

                mobileMenu.classList.remove(
                    "open"
                );

                if (mobileButton) {

                    mobileButton.innerHTML =
                        "☰";

                    mobileButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );

});


/* =========================================================
   COUNTER FUNCTION
========================================================= */

function animateCounter(element) {

    const target =
        Number(
            element.dataset.counter || 0
        );

    const duration =
        Number(
            element.dataset.duration || 1600
        );

    const suffix =
        element.dataset.suffix || "";

    const prefix =
        element.dataset.prefix || "";

    const startTime =
        performance.now();

    const formatNumber = value => {

        return Math.floor(value)
            .toLocaleString("en-IN");

    };

    const update = currentTime => {

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

        const value =
            target * eased;

        element.textContent =
            prefix +
            formatNumber(value) +
            suffix;

        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            element.textContent =
                prefix +
                formatNumber(target) +
                suffix;

        }

    };

    requestAnimationFrame(update);

}


/* =========================================================
   PRICE CARD SYSTEM
========================================================= */

function setupPriceCards() {

    const cards =
        document.querySelectorAll(
            ".price-card[data-price]"
        );

    if (!cards.length) {
        return;
    }

    cards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const group =
                    card.dataset.group ||
                    "default";

                document
                    .querySelectorAll(
                        `.price-card[data-group="${group}"]`
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "selected"
                        );

                    });

                card.classList.add(
                    "selected"
                );

                updateOrderSummary(
                    card
                );

            }
        );

    });

}


/* =========================================================
   ORDER SUMMARY UPDATE
========================================================= */

function updateOrderSummary(card) {

    const price =
        card.dataset.price || "";

    const product =
        card.dataset.product ||
        card.querySelector(
            ".price-card-main strong"
        )?.textContent ||
        "Selected Product";

    const priceElement =
        document.querySelector(
            "#summaryPrice"
        );

    const productElement =
        document.querySelector(
            "#summaryProduct"
        );

    const messageElement =
        document.querySelector(
            "#selectionMessage"
        );

    const orderButton =
        document.querySelector(
            "#orderButton"
        );

    if (priceElement) {

        priceElement.textContent =
            `₹${price}`;

    }

    if (productElement) {

        productElement.textContent =
            product;

    }

    if (messageElement) {

        messageElement.textContent =
            `Selected: ${product}`;

        messageElement.classList.add(
            "ready"
        );

    }

    if (orderButton) {

        orderButton.disabled = false;

        orderButton.dataset.price =
            price;

        orderButton.dataset.product =
            product;

    }

    document.dispatchEvent(
        new CustomEvent(
            "pantheos:productSelected",
            {
                detail: {
                    product,
                    price,
                    card
                }
            }
        )
    );

}


/* =========================================================
   SEARCH SYSTEM
========================================================= */

function setupSearch() {

    const searchInput =
        document.querySelector(
            "#globalSearch"
        );

    if (!searchInput) {
        return;
    }

    const searchableItems =
        document.querySelectorAll(
            "[data-search]"
        );

    searchInput.addEventListener(
        "input",
        () => {

            const query =
                searchInput.value
                    .trim()
                    .toLowerCase();

            searchableItems.forEach(item => {

                const searchableText =
                    (
                        item.dataset.search ||
                        item.textContent ||
                        ""
                    ).toLowerCase();

                const match =
                    !query ||
                    searchableText.includes(
                        query
                    );

                item.style.display =
                    match ? "" : "none";

            });

        }
    );

}


/* =========================================================
   FAQ ACCORDION
========================================================= */

function setupFAQ() {

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );

    if (!faqItems.length) {
        return;
    }

    faqItems.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );

        if (!question) {
            return;
        }

        question.addEventListener(
            "click",
            () => {

                const wasOpen =
                    item.classList.contains(
                        "open"
                    );

                faqItems.forEach(other => {

                    other.classList.remove(
                        "open"
                    );

                });

                if (!wasOpen) {

                    item.classList.add(
                        "open"
                    );

                }

            }
        );

    });

}


/* =========================================================
   GET CUSTOMER DATA
========================================================= */

function getCustomerData() {

    const playerId =
        document.querySelector(
            "#playerId"
        )?.value.trim() || "";

    const serverId =
        document.querySelector(
            "#serverId"
        )?.value.trim() || "";

    const uid =
        document.querySelector(
            "#uid"
        )?.value.trim() || "";

    const characterId =
        document.querySelector(
            "#characterId"
        )?.value.trim() || "";

    const riotId =
        document.querySelector(
            "#riotId"
        )?.value.trim() || "";

    return {
        playerId,
        serverId,
        uid,
        characterId,
        riotId
    };

}


/* =========================================================
   FIND SELECTED PRODUCT
========================================================= */

function getSelectedProduct() {

    const selected =
        document.querySelector(
            ".price-card.selected"
        );

    if (!selected) {
        return null;
    }

    return {

        product:
            selected.dataset.product ||
            selected.querySelector(
                ".price-card-main strong"
            )?.textContent ||
            "",

        price:
            selected.dataset.price ||
            "",

        group:
            selected.dataset.group ||
            ""

    };

}


/* =========================================================
   WHATSAPP ORDER BUILDER
========================================================= */

function createWhatsAppOrder(options = {}) {

    const game =
        options.game ||
        "Gaming Product";

    const customer =
        getCustomerData();

    const selected =
        getSelectedProduct();

    if (!selected) {

        alert(
            "Please select a package first."
        );

        return;

    }

    const lines = [];

    lines.push(
        "🎮 Pantheos Global Store Order"
    );

    lines.push("");

    lines.push(
        `Game: ${game}`
    );

    if (customer.playerId) {

        lines.push(
            `Player ID: ${customer.playerId}`
        );

    }

    if (customer.serverId) {

        lines.push(
            `Server ID: ${customer.serverId}`
        );

    }

    if (customer.uid) {

        lines.push(
            `UID: ${customer.uid}`
        );

    }

    if (customer.characterId) {

        lines.push(
            `Character ID: ${customer.characterId}`
        );

    }

    if (customer.riotId) {

        lines.push(
            `Riot ID: ${customer.riotId}`
        );

    }

    lines.push("");

    lines.push(
        `Package: ${selected.product}`
    );

    lines.push(
        `Price: ₹${selected.price}`
    );

    lines.push(
        "Payment Status: Pending"
    );

    lines.push("");

    lines.push(
        "Please send payment screenshot after payment."
    );

    lines.push("");

    lines.push(
        "Fast • Secure • Trusted"
    );

    const message =
        encodeURIComponent(
            lines.join("\n")
        );

    const phone =
        "919310651934";

    const url =
        `https://wa.me/${phone}?text=${message}`;

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   GLOBAL WHATSAPP BUTTON
========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-whatsapp-order]"
            );

        if (!button) {
            return;
        }

        event.preventDefault();

        createWhatsAppOrder({
            game:
                button.dataset.game ||
                document.body.dataset.game ||
                "Gaming Product"
        });

    }
);


/* =========================================================
   PRODUCT PAGE VALIDATION
========================================================= */

function validateProductPage() {

    const requiredInputs =
        document.querySelectorAll(
            "[data-required]"
        );

    let valid = true;

    requiredInputs.forEach(input => {

        const value =
            input.value.trim();

        if (!value) {

            input.classList.add(
                "input-invalid"
            );

            valid = false;

        } else {

            input.classList.remove(
                "input-invalid"
            );

        }

    });

    return valid;

}


/* =========================================================
   ORDER BUTTON VALIDATION
========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "#orderButton"
            );

        if (!button) {
            return;
        }

        if (button.disabled) {
            return;
        }

        if (!validateProductPage()) {

            alert(
                "Please enter your required player information first."
            );

            return;

        }

        createWhatsAppOrder({
            game:
                document.body.dataset.game ||
                "Gaming Product"
        });

    }
);


/* =========================================================
   LIVE ORDER NOTIFICATION
========================================================= */

function startLiveNotifications() {

    const container =
        document.querySelector(
            "#liveNotification"
        );

    if (!container) {
        return;
    }

    const notifications = [

        "A customer just placed an order ⚡",

        "Gaming top-up order received 🎮",

        "Instant delivery order completed ✓",

        "New Pantheos customer joined 🔥",

        "Someone just purchased a package 💎"

    ];

    let index = 0;

    const showNotification = () => {

        container.textContent =
            notifications[index];

        container.classList.add(
            "show"
        );

        setTimeout(() => {

            container.classList.remove(
                "show"
            );

        }, 3500);

        index =
            (index + 1) %
            notifications.length;

    };

    showNotification();

    setInterval(
        showNotification,
        10000
    );

}

document.addEventListener(
    "DOMContentLoaded",
    startLiveNotifications
);


/* =========================================================
   IMAGE HOVER EFFECT
========================================================= */

document.addEventListener(
    "mousemove",
    event => {

        const card =
            event.target.closest(
                ".game-card, .service-card"
            );

        if (!card) {
            return;
        }

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left;

        const y =
            event.clientY -
            rect.top;

        const rotateX =
            ((y / rect.height) - .5) * -4;

        const rotateY =
            ((x / rect.width) - .5) * 4;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-3px)`;

    }
);


document.addEventListener(
    "mouseout",
    event => {

        const card =
            event.target.closest(
                ".game-card, .service-card"
            );

        if (!card) {
            return;
        }

        card.style.transform = "";

    }
);


/* =========================================================
   COPY TO CLIPBOARD
========================================================= */

document.addEventListener(
    "click",
    async event => {

        const button =
            event.target.closest(
                "[data-copy]"
            );

        if (!button) {
            return;
        }

        const text =
            button.dataset.copy;

        if (!text) {
            return;
        }

        try {

            await navigator.clipboard.writeText(
                text
            );

            const original =
                button.textContent;

            button.textContent =
                "Copied ✓";

            setTimeout(() => {

                button.textContent =
                    original;

            }, 1500);

        } catch {

            alert(
                "Unable to copy."
            );

        }

    }
);


/* =========================================================
   GLOBAL SEARCH SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            const search =
                document.querySelector(
                    "#globalSearch"
                );

            if (search) {

                search.focus();

            }

        }

    }
);
