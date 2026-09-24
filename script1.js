/* =========================================================
   ANINDYA BISWAS PORTFOLIO
========================================================= */


/* =========================================================
   THEME TOGGLE
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    themeToggle?.querySelector("i");


function updateThemeIcon() {

    if (!themeIcon) return;

    if (document.body.classList.contains("light")) {

        themeIcon.className =
            "fa-solid fa-sun";

    } else {

        themeIcon.className =
            "fa-solid fa-moon";

    }

}


const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    document.body.classList.add("light");

}

updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light");

        const isLight =
            document.body.classList.contains("light");

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

        updateThemeIcon();

    });

}


/* =========================================================
   3D PROFILE CARD
========================================================= */

const profileCard =
    document.getElementById("profileCard");

const profileWrapper =
    document.querySelector(".profile-card-wrapper");


if (profileCard && profileWrapper) {

    profileWrapper.addEventListener(
        "mousemove",
        (event) => {

            if (window.innerWidth <= 850) return;

            const rect =
                profileCard.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateY =
                ((x - centerX) / centerX) * 18;

            const rotateX =
                ((centerY - y) / centerY) * 18;

            const moveX =
                ((x - centerX) / centerX) * 8;

            const moveY =
                ((y - centerY) / centerY) * 8;

            profileCard.style.transform = `
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translate3d(${moveX}px, ${moveY}px, 0)
                scale3d(1.025,1.025,1.025)
            `;

        }
    );


    profileWrapper.addEventListener(
        "mouseleave",
        () => {

            profileCard.style.transform = `
                rotateX(0deg)
                rotateY(0deg)
                translate3d(0,0,0)
                scale3d(1,1,1)
            `;

        }
    );

}


/* =========================================================
   PROFILE CARD — MOBILE DEVICE TILT
========================================================= */

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;


window.addEventListener("deviceorientation", (event) => {

    if (window.innerWidth > 850) return;

    targetX =
        Math.max(
            -8,
            Math.min(8, event.gamma || 0)
        );

    targetY =
        Math.max(
            -8,
            Math.min(8, (event.beta || 0) - 45)
        );

});


function smoothCardMotion() {

    currentX +=
        (targetX - currentX) * 0.08;

    currentY +=
        (targetY - currentY) * 0.08;


    if (
        window.innerWidth <= 850 &&
        profileCard
    ) {

        profileCard.style.transform = `
            rotateX(${currentY}deg)
            rotateY(${currentX}deg)
            scale3d(1.01,1.01,1.01)
        `;

    }


    requestAnimationFrame(
        smoothCardMotion
    );

}


smoothCardMotion();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "active"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(element);

        }
    );

} else {

    revealElements.forEach(
        element => {
            element.classList.add("active");
        }
    );

}


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById("backToTop");


if (backToTop) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 600) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );

            }

        }
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


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.querySelector(".navbar");


if (navbar) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 50) {

                navbar.style.top = "10px";

            } else {

                navbar.style.top = "18px";

            }

        }
    );

}


/* =========================================================
   SMOOTH ANCHOR LINKS
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");

                    if (
                        targetId === "#" ||
                        !document.querySelector(targetId)
                    ) {

                        return;

                    }

                    event.preventDefault();

                    const target =
                        document.querySelector(
                            targetId
                        );

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );


/* =========================================================
   VIDEO RESUME
========================================================= */

const resumeVideo =
    document.getElementById("resumeVideo");

const videoPlaceholder =
    document.querySelector(".video-placeholder");


if (resumeVideo) {

    resumeVideo.addEventListener(
        "loadeddata",
        () => {

            if (videoPlaceholder) {

                videoPlaceholder.style.display =
                    "none";

            }

        }
    );


    resumeVideo.addEventListener(
        "mouseenter",
        () => {

            resumeVideo.setAttribute(
                "title",
                "Play your video resume"
            );

        }
    );

}


/* =========================================================
   MOUSE-FOLLOWING GLOW
========================================================= */

const glow =
    document.createElement("div");


glow.className =
    "mouse-glow";


document.body.appendChild(glow);


const glowStyle =
    document.createElement("style");


glowStyle.innerHTML = `

    .mouse-glow {

        position: fixed;

        width: 250px;

        height: 250px;

        border-radius: 50%;

        pointer-events: none;

        z-index: -1;

        background:
            radial-gradient(
                circle,
                rgba(56,189,248,.07),
                transparent 70%
            );

        transform:
            translate(-50%, -50%);

        transition:
            left .15s ease-out,
            top .15s ease-out;

    }

`;


document.head.appendChild(
    glowStyle
);


window.addEventListener(
    "mousemove",
    (event) => {

        glow.style.left =
            event.clientX + "px";

        glow.style.top =
            event.clientY + "px";

    }
);


/* =========================================================
   PROJECT CARD MAGNETIC / 3D EFFECT
========================================================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth <= 850) return;

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateX =
                    ((y - rect.height / 2)
                    / rect.height) * -5;

                const rotateY =
                    ((x - rect.width / 2)
                    / rect.width) * 5;

                card.style.transform = `
                    perspective(700px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   CODING CARD HOVER
========================================================= */

const codingCards =
    document.querySelectorAll(
        ".coding-card"
    );


codingCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth <= 850) return;

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const px =
                    (x / rect.width) * 100;

                const py =
                    (y / rect.height) * 100;

                card.style.background = `
                    radial-gradient(
                        circle at ${px}% ${py}%,
                        rgba(255,255,255,.13),
                        rgba(255,255,255,.035)
                    )
                `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.background = "";

            }
        );

    }
);


/* =========================================================
   TYPING ANIMATION
========================================================= */

const typingText =
    document.getElementById("typingText");


const typingWords = [

    "Problem Solver",

    "Future AI & ML Engineer",

    "Competitive Engineering"

];


let typingWordIndex = 0;

let typingCharIndex = 0;

let typingDeleting = false;


const typingSpeed = 90;

const deletingSpeed = 55;

const typingPause = 1700;

const deletingPause = 450;


function runTypingAnimation() {

    if (!typingText) return;


    const currentWord =
        typingWords[typingWordIndex];


    /* TYPE */

    if (!typingDeleting) {

        typingText.textContent =
            currentWord.slice(
                0,
                typingCharIndex + 1
            );


        typingCharIndex++;


        if (
            typingCharIndex ===
            currentWord.length
        ) {

            typingDeleting = true;

            setTimeout(
                runTypingAnimation,
                typingPause
            );

            return;

        }


        setTimeout(
            runTypingAnimation,
            typingSpeed
        );

        return;

    }


    /* DELETE */

    typingText.textContent =
        currentWord.slice(
            0,
            typingCharIndex - 1
        );


    typingCharIndex--;


    if (typingCharIndex === 0) {

        typingDeleting = false;


        typingWordIndex =
            (
                typingWordIndex + 1
            ) %
            typingWords.length;


        setTimeout(
            runTypingAnimation,
            deletingPause
        );

        return;

    }


    setTimeout(
        runTypingAnimation,
        deletingSpeed
    );

}


runTypingAnimation();


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenuBtn =
    document.getElementById(
        "mobileMenuBtn"
    );


const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


if (
    mobileMenuBtn &&
    mobileMenu
) {

    mobileMenuBtn.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "open"
            );


            const icon =
                mobileMenuBtn.querySelector(
                    "i"
                );


            if (icon) {

                icon.className =
                    mobileMenu.classList.contains(
                        "open"
                    )
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";

            }

        }
    );


    mobileMenu
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenu.classList.remove(
                            "open"
                        );


                        const icon =
                            mobileMenuBtn.querySelector(
                                "i"
                            );


                        if (icon) {

                            icon.className =
                                "fa-solid fa-bars";

                        }

                    }
                );

            }
        );

}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

const magneticElements =
    document.querySelectorAll(
        ".magnetic-btn, .nav-contact, .primary-btn, .secondary-btn"
    );


magneticElements.forEach(
    element => {

        element.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth <= 850
                ) return;


                const rect =
                    element.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                element.style.transform =
                    `
                    translate(
                        ${x * 0.12}px,
                        ${y * 0.12}px
                    )
                    `;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   CONTACT FORM
   EMAIL COMPOSE + SUCCESS ANIMATION
========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


const formSuccess =
    document.getElementById(
        "formSuccess"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(
                    contactForm
                );


            const name =
                formData.get("name") || "";


            const email =
                formData.get("email") || "";


            const subject =
                formData.get("subject") ||
                "Portfolio Contact";


            const message =
                formData.get("message") ||
                "";


            const body =
                `Hello Anindya,

Name: ${name}
Email: ${email}

${message}`;


            const mailto =
                `mailto:anindya123rrss@gmail.com` +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(body)}`;


            if (formSuccess) {

                formSuccess.classList.add(
                    "show"
                );

            }


            window.location.href =
                mailto;


            setTimeout(
                () => {

                    contactForm.reset();


                    if (formSuccess) {

                        formSuccess.classList.remove(
                            "show"
                        );

                    }

                },
                2500
            );

        }
    );

}


/* =========================================================
   FORM INPUT FOCUS EFFECT
========================================================= */

const formInputs =
    document.querySelectorAll(
        ".contact-form input, .contact-form textarea"
    );


formInputs.forEach(
    input => {

        input.addEventListener(
            "focus",
            () => {

                input.parentElement?.classList.add(
                    "focused"
                );

            }
        );


        input.addEventListener(
            "blur",
            () => {

                input.parentElement?.classList.remove(
                    "focused"
                );

            }
        );

    }
);


/* =========================================================
   PROJECT / DEMO BUTTONS
========================================================= */

const projectLinks =
    document.querySelectorAll(
        ".project-link"
    );


projectLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                if (
                    link.getAttribute("href") ===
                    "#"
                ) {

                    event.preventDefault();

                    alert(
                        "Project link will be added soon."
                    );

                }

            }
        );

    }
);


/* =========================================================
   STAT COUNTER ANIMATION
========================================================= */

const statNumbers =
    document.querySelectorAll(
        "[data-count]"
    );


if (
    statNumbers.length &&
    "IntersectionObserver" in window
) {

    const statObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) return;


                        const element =
                            entry.target;


                        const target =
                            Number(
                                element.dataset.count
                            );


                        let current = 0;

                        const duration = 1200;

                        const start =
                            performance.now();


                        function updateCounter(
                            timestamp
                        ) {

                            const progress =
                                Math.min(
                                    (
                                        timestamp -
                                        start
                                    ) /
                                    duration,
                                    1
                                );


                            current =
                                Math.floor(
                                    progress *
                                    target
                                );


                            element.textContent =
                                current;


                            if (
                                progress < 1
                            ) {

                                requestAnimationFrame(
                                    updateCounter
                                );

                            } else {

                                element.textContent =
                                    target;

                            }

                        }


                        requestAnimationFrame(
                            updateCounter
                        );


                        statObserver.unobserve(
                            element
                        );

                    }
                );

            },
            {
                threshold: 0.5
            }
        );


    statNumbers.forEach(
        number => {

            statObserver.observe(
                number
            );

        }
    );

}


/* =========================================================
   PARALLAX EFFECT
========================================================= */

const parallaxElements =
    document.querySelectorAll(
        "[data-parallax]"
    );


window.addEventListener(
    "scroll",
    () => {

        if (window.innerWidth <= 850)
            return;


        const scrollY =
            window.scrollY;


        parallaxElements.forEach(
            element => {

                const speed =
                    Number(
                        element.dataset.parallax
                    ) || 0.15;


                element.style.transform =
                    `translateY(
                        ${scrollY * speed}px
                    )`;

            }
        );

    }
);


/* =========================================================
   KEYBOARD ESC — CLOSE MOBILE MENU
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            mobileMenu
        ) {

            mobileMenu.classList.remove(
                "open"
            );


            if (mobileMenuBtn) {

                const icon =
                    mobileMenuBtn.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.className =
                        "fa-solid fa-bars";

                }

            }

        }

    }
);


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);