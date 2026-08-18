/* =========================================================
   PANTHEOS GLOBAL STORE V11
   GLOBAL APPLICATION JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initHeader();

    initMobileMenu();

    initFAQ();

    initCounters();

    initRevealAnimations();

    initBackToTop();

    initSearch();

});


/* =========================================================
   LOADER
========================================================= */

function initLoader() {

    const loader =
        document.getElementById("pageLoader");

    const progress =
        document.getElementById("loaderProgress");

    if (!loader || !progress) {
        return;
    }

    let value = 0;

    const interval =
        setInterval(() => {

            value += Math.floor(
                Math.random() * 12
            ) + 5;

            if (value >= 100) {

                value = 100;

                progress.style.width =
                    `${value}%`;

                clearInterval(interval);

                setTimeout(() => {

                    loader.classList.add(
                        "loaded"
                    );

                }, 350);

            } else {

                progress.style.width =
                    `${value}%`;

            }

        }, 90);

}


/* =========================================================
   HEADER
========================================================= */

function initHeader() {

    const header =
        document.getElementById("siteHeader");

    if (!header) {
        return;
    }

    function updateHeader() {

        if (window.scrollY > 25) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const button =
        document.getElementById(
            "mobileMenuBtn"
        );

    const menu =
        document.getElementById(
            "mobileMenu"
        );

    if (!button || !menu) {
        return;
    }

    button.addEventListener(
        "click",
        () => {

            menu.classList.toggle(
                "open"
            );

        }
    );


    menu.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    menu.classList.remove(
                        "open"
                    );

                }
            );

        });

}


/* =========================================================
   FAQ
========================================================= */

function initFAQ() {

    const questions =
        document.querySelectorAll(
            ".faq-question"
        );

    questions.forEach(question => {

        question.addEventListener(
            "click",
            () => {

                const item =
                    question.closest(
                        ".faq-item"
                    );

                const answer =
                    item.querySelector(
                        ".faq-answer"
                    );

                const isOpen =
                    item.classList.contains(
                        "open"
                    );


                document
                    .querySelectorAll(
                        ".faq-item.open"
                    )
                    .forEach(openItem => {

                        openItem.classList.remove(
                            "open"
                        );

                        const openAnswer =
                            openItem.querySelector(
                                ".faq-answer"
                            );

                        openAnswer.style.maxHeight =
                            null;

                    });


                if (!isOpen) {

                    item.classList.add(
                        "open"
                    );

                    answer.style.maxHeight =
                        answer.scrollHeight +
                        "px";

                }

            }
        );

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

    if (!counters.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const element =
                        entry.target;

                    if (
                        element.dataset.started
                    ) {
                        return;
                    }

                    element.dataset.started =
                        "true";

                    const target =
                        Number(
                            element.dataset.counter
                        );

                    animateCounter(
                        element,
                        target
                    );

                });

            },
            {
                threshold: .5
            }
        );


    counters.forEach(counter => {

        observer.observe(counter);

    });

}


function animateCounter(
    element,
    target
) {

    const duration = 1600;

    const start =
        performance.now();


    function update(now) {

        const elapsed =
            now - start;

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
            Math.floor(
                eased * target
            );


        element.textContent =
            value.toLocaleString() + "+";


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            element.textContent =
                target.toLocaleString() + "+";

        }

    }


    requestAnimationFrame(update);

}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

function initRevealAnimations() {

    const targets =
        document.querySelectorAll(
            ".section, .game-card, .service-card, .trend-card, .community-card, .category-card"
        );


    targets.forEach(element => {

        element.classList.add(
            "reveal"
        );

    });


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
                threshold: .08
            }
        );


    targets.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );

    if (!button) {
        return;
    }


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );

            }

        },
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
   GLOBAL SEARCH
========================================================= */

function initSearch() {

    const input =
        document.getElementById(
            "globalSearch"
        );

    const results =
        document.getElementById(
            "searchResults"
        );

    if (!input || !results) {
        return;
    }


    const products = [

        {
            name: "Mobile Legends",
            type: "Game Top-Up",
            url: "mlbb.html"
        },

        {
            name: "BGMI",
            type: "Game Top-Up",
            url: "bgmi.html"
        },

        {
            name: "Free Fire",
            type: "Game Top-Up",
            url: "freefire.html"
        },

        {
            name: "Call of Duty Mobile",
            type: "Game Top-Up",
            url: "codm.html"
        },

        {
            name: "Valorant",
            type: "Game Top-Up",
            url: "valorant.html"
        },

        {
            name: "Genshin Impact",
            type: "Game Top-Up",
            url: "genshin.html"
        },

        {
            name: "Honkai Star Rail",
            type: "Game Top-Up",
            url: "hsr.html"
        },

        {
            name: "Gift Cards",
            type: "Digital Products",
            url: "giftcards.html"
        },

        {
            name: "OTT Services",
            type: "Subscriptions",
            url: "ott.html"
        },

        {
            name: "Instagram Boosting",
            type: "Social Media",
            url: "boosting.html"
        },

        {
            name: "YouTube Boosting",
            type: "Social Media",
            url: "boosting.html"
        }

    ];


    input.addEventListener(
        "input",
        () => {

            const query =
                input.value
                    .trim()
                    .toLowerCase();


            if (!query) {

                results.innerHTML = "";

                results.classList.remove(
                    "show"
                );

                return;

            }


            const matches =
                products.filter(product =>
                    product.name
                        .toLowerCase()
                        .includes(query)
                );


            if (!matches.length) {

                results.innerHTML = `
                    <div class="search-result">
                        <strong>
                            No products found
                        </strong>
                        <div style="color:#64748b;font-size:11px;margin-top:3px;">
                            Try another search.
                        </div>
                    </div>
                `;

            } else {

                results.innerHTML =
                    matches
                        .slice(0, 6)
                        .map(product => `

                            <a
                                href="${product.url}"
                                class="search-result"
                            >

                                <strong>
                                    ${product.name}
                                </strong>

                                <div style="color:#64748b;font-size:10px;margin-top:3px;">
                                    ${product.type}
                                </div>

                            </a>

                        `)
                        .join("");

            }


            results.classList.add(
                "show"
            );

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "/" &&
                document.activeElement !== input
            ) {

                event.preventDefault();

                input.focus();

            }

        }
    );

}
