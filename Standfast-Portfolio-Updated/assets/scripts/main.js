document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
      menuToggle.textContent = isOpen ? "×" : "☰";
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active", "show");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }
  const year = new Date().getFullYear();
  document.querySelectorAll(".current-year, #currentYear, #year").forEach(function (el) { el.textContent = year; });
  const currentPath = window.location.pathname.toLowerCase().split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    const href = (link.getAttribute("href") || "").toLowerCase().split("/").pop();
    if (href === currentPath) link.classList.add("active-link");
  });
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const id = link.getAttribute("href");
      const target = id && document.querySelector(id);
      if (target) { event.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
    });
  });
  const form = document.querySelector("#contact-form, #contactForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const val = id => document.querySelector("#" + id)?.value.trim() || "";
      const name = val("name"), email = val("email"), organisation = val("organisation"), message = val("message");
      const enquiry = val("enquiry-type") || val("subject");
      if (!name || !email || !message) { alert("Please complete your name, email address and message."); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert("Please enter a valid email address."); return; }
      const subject = encodeURIComponent(enquiry || "Portfolio Enquiry");
      const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\nOrganisation: " + (organisation || "Not provided") + "\nEnquiry Type: " + (enquiry || "General") + "\n\nMessage:\n" + message);
      window.location.href = "mailto:bluejackstandfast@gmail.com?subject=" + subject + "&body=" + body;
    });
  }
  const scrollTop = document.querySelector("#scroll-top");
  if (scrollTop) {
    window.addEventListener("scroll", function () { scrollTop.classList.toggle("visible", window.scrollY > 400); });
    scrollTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }
  const animated = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("show"); observer.unobserve(entry.target); } }), { threshold: .15 });
    animated.forEach(el => observer.observe(el));
  } else { animated.forEach(el => el.classList.add("show")); }
});
