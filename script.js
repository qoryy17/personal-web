document.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Custom Cursor
  const cursorDot = document.querySelector("[data-cursor-dot]");
  const cursorOutline = document.querySelector("[data-cursor-outline]");

  if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", function (e) {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      // Animate outline with a slight delay for smooth effect
      cursorOutline.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        { duration: 500, fill: "forwards" }
      );
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .project-card, .timeline-content"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursorOutline.style.backgroundColor = "rgba(66, 133, 244, 0.1)";
      });
      el.addEventListener("mouseleave", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
        cursorOutline.style.backgroundColor = "transparent";
      });
    });
  }
  // Hero Animations
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".navbar", {
    y: -100,
    opacity: 0,
    duration: 1,
  })
    .from(
      ".greeting",
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.5"
    )
    .from(
      ".name",
      {
        y: 30,
        opacity: 0,
        duration: 1,
      },
      "-=0.6"
    )
    .from(
      ".tagline",
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.6"
    )
    .from(
      ".description",
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.6"
    )
    .from(
      ".cta-buttons .btn",
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        onComplete: function () {
          gsap.set(this.targets(), { clearProps: "all" });
          gsap.set(this.targets(), { opacity: 1, transform: "none" });
        },
      },
      "-=0.6"
    )
    .from(
      ".hero-visual .shape",
      {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "elastic.out(1, 0.5)",
      },
      "-=1.5"
    )
    .from(
      ".scroll-indicator",
      {
        y: 20,
        opacity: 0,
        duration: 1,
      },
      "-=1"
    );

  // Scroll Animations

  // Helper function for scroll animations
  const animateOnScroll = (selector, vars, triggerParams = {}) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      gsap.from(elements, {
        scrollTrigger: {
          trigger: selector,
          start: "top 80%",
          ...triggerParams,
        },
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        ...vars,
      });
    }
  };

  // About Section
  animateOnScroll(".about-image", { x: -50, opacity: 0 });
  animateOnScroll(".about-text", { x: 50, opacity: 0, delay: 0.2 });

  // Skills Section
  const skillSection = document.querySelector(".skills");
  if (skillSection) {
    ScrollTrigger.create({
      trigger: ".skills",
      start: "top 75%",
      onEnter: () => {
        document.querySelectorAll(".skill-bar .bar span").forEach((bar) => {
          const width = bar.getAttribute("data-width");
          gsap.to(bar, {
            width: width,
            duration: 1.5,
            ease: "power2.out",
          });
        });
      },
    });
  }

  // Portfolio Section
  const projectItems = document.querySelectorAll(".project-list-item");
  if (projectItems.length > 0) {
    // Set initial state to avoid FOUC
    gsap.set(".project-list-item", { y: 50, opacity: 0 });

    ScrollTrigger.batch(".project-list-item", {
      start: "top 85%",
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          overwrite: true,
        });
      },
      onEnterBack: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          overwrite: true,
        });
      },
    });
  }

  // Contact Section
  const contactWrapper = document.querySelector(".contact-wrapper");
  if (contactWrapper) {
    gsap.from(".contact-wrapper", {
      scrollTrigger: {
        trigger: ".contact",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }

  // Stats Counter Animation
  const stats = document.querySelectorAll(".number");
  stats.forEach((stat) => {
    const targetAttr = stat.getAttribute("data-target");
    if (targetAttr) {
      const target = +targetAttr;

      ScrollTrigger.create({
        trigger: stat,
        start: "top 85%",
        onEnter: () => {
          let count = 0;
          const updateCount = () => {
            const increment = target / 50;
            if (count < target) {
              count += increment;
              stat.innerText = Math.ceil(count);
              setTimeout(updateCount, 40);
            } else {
              stat.innerText = target;
            }
          };
          updateCount();
        },
      });
    }
  });

  // Refresh ScrollTrigger to ensure positions are correct after load
  ScrollTrigger.refresh();
});
