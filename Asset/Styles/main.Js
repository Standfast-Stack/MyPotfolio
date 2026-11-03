
/* =========================================
   STANDFAST BLUEJACK - PORTFOLIO JAVASCRIPT
   File: scripts/main.js
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       1. MOBILE NAVIGATION
    ===================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    /* =====================================
       2. AUTOMATIC COPYRIGHT YEAR
    ===================================== */

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================
       3. SMOOTH SCROLLING
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* =====================================
       4. ACTIVE NAVIGATION LINK
    ===================================== */

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(function (link) {

        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active-link");
        }

    });


    /* =====================================
       5. CONTACT FORM VALIDATION
    ===================================== */

    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.querySelector("#name")?.value.trim();
            const email = document.querySelector("#email")?.value.trim();
            const organisation = document.querySelector("#organisation")?.value.trim();
            const enquiryType = document.querySelector("#enquiry-type")?.value;
            const message = document.querySelector("#message")?.value.trim();

            if (!name || !email || !message) {
                alert("Please complete your name, email address and message.");
                return;
            }

            // Basic email format validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            const subject = encodeURIComponent(
                enquiryType || "Portfolio Enquiry"
            );

            const body = encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\nOrganisation: " + (organisation || "Not provided") +
                "\nEnquiry Type: " + (enquiryType || "General") +
                "\n\nMessage:\n" + message
            );

            const recipient = "bluejackstandfast@gmail.com";

            window.location.href =
                "mailto:" + recipient +
                "?subject=" + subject +
                "&body=" + body;

        });

    }


    /* =====================================
       6. SCROLL TO TOP BUTTON
    ===================================== */

    const scrollTopButton = document.querySelector("#scroll-top");

    if (scrollTopButton) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {
                scrollTopButton.classList.add("visible");
            } else {
                scrollTopButton.classList.remove("visible");
            }

        });

        scrollTopButton.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================
       7. FADE-IN ANIMATIONS
    ===================================== */

    const animatedElements = document.querySelectorAll(".fade-in");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.15
        });

        animatedElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {
        animatedElements.forEach(function (element) {
            element.classList.add("show");
        });
    }

});
