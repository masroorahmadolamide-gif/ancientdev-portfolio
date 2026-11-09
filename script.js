
/* =========================================
   ANCIENT DEV — JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // =======================================
  // 1. PRELOADER
  // =======================================

  const preloader = document.getElementById("preloader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader?.classList.add("hide");
    }, 700);
  });

  // Fallback in case the load event already fired
  if (document.readyState === "complete") {
    setTimeout(() => {
      preloader?.classList.add("hide");
    }, 700);
  }

  // =======================================
  // 2. MOBILE NAVIGATION
  // =======================================

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMenu() {
    navLinks?.classList.remove("open");
    menuToggle?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(!!isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", event => {
    if (
      navLinks &&
      menuToggle &&
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // =======================================
  // 3. TYPING ANIMATION
  // =======================================

  const typingText = document.getElementById("typingText");

  const words = [
    "Website Development",
    "Full-Stack Development",
    "Web Applications",
    "Backend Engineering",
    "Digital Innovation"
  ];

  let wordIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeEffect() {
    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (deleting) {
      characterIndex--;
    } else {
      characterIndex++;
    }

    typingText.textContent =
      currentWord.substring(0, characterIndex);

    let speed = deleting ? 45 : 90;

    if (!deleting && characterIndex === currentWord.length) {
      speed = 1500;
      deleting = true;
    } else if (deleting && characterIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 400;
    }

    setTimeout(typeEffect, speed);
  }

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (typingText) {
    if (reduceMotion) {
      typingText.textContent = words[0];
    } else {
      typeEffect();
    }
  }

  // =======================================
  // 4. SCROLL REVEAL ANIMATIONS
  // =======================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add("active");

            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {
    revealElements.forEach(element => {
      element.classList.add("active");
    });
  }

  // =======================================
  // 5. ANIMATED COUNTERS
  // =======================================

  const counters = document.querySelectorAll(".counter");

  function animateCounter(counter) {

    const target = Number(counter.dataset.target);

    if (!Number.isFinite(target)) return;

    const duration = 1800;
    const startTime = performance.now();

    function updateCounter(currentTime) {

      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out effect
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      const currentValue = Math.floor(
        easedProgress * target
      );

      counter.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }

    }

    requestAnimationFrame(updateCounter);
  }

  if ("IntersectionObserver" in window && !reduceMotion) {

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            animateCounter(entry.target);

            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.5
      }
    );

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });

  } else {
    counters.forEach(counter => {
      counter.textContent = counter.dataset.target;
    });
  }

  // =======================================
  // 6. NAVBAR SCROLL EFFECT
  // =======================================

  const header = document.getElementById("header");

  function handleScroll() {

    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  handleScroll();

  // =======================================
  // 7. CURRENT YEAR
  // =======================================

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // =======================================
  // 8. PROJECT CARD POINTER EFFECT
  // =======================================

  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach(card => {

    card.addEventListener("mousemove", event => {

      if (window.innerWidth <= 760 || reduceMotion) return;

      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (centerY - y) / 45;
      const rotateY = (x - centerX) / 45;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });

  });

  // =======================================
  // 9. CONTACT FORM VALIDATION
  // =======================================

  const contactForm = document.querySelector(".contact-form");

  contactForm?.addEventListener("submit", event => {

    if (!contactForm.checkValidity()) {
      event.preventDefault();
      contactForm.reportValidity();
      return;
    }

    const submitButton = contactForm.querySelector(
      ".submit-btn"
    );

    if (submitButton) {
      submitButton.textContent = "Sending...";
      submitButton.disabled = true;
    }

    // Allow the browser to submit the form to FormSubmit.
    // FormSubmit handles the email delivery.
  });

  // =======================================
  // 10. SMOOTH INTERNAL NAVIGATION
  // =======================================

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start"
        });

      }

    });

  });

  console.log(
    "%cANCIENT DEV",
    "color:#ff7900;font-size:25px;font-weight:bold;"
  );

  console.log(
    "Welcome to Ancient Dev. Built with passion and code."
  );

});
