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
    const interactiveElements = document.querySelectorAll("a, button, .card, input, textarea");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursorOutline.style.backgroundColor = "rgba(66, 133, 244, 0.1)";
        cursorOutline.style.borderColor = "transparent";
      });
      el.addEventListener("mouseleave", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
        cursorOutline.style.backgroundColor = "transparent";
        cursorOutline.style.borderColor = "var(--google-blue)";
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
      ".hero-content > *",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      },
      "-=0.5"
    )
    .from(
      ".hero-visual",
      {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=0.8"
    )
    .from(
      ".shape",
      {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)",
      },
      "-=1"
    );

  // Scroll Animations

  // About Section
  gsap.from(".about-image", {
    scrollTrigger: {
      trigger: ".about-image",
      start: "top 80%",
    },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".about-text", {
    scrollTrigger: {
      trigger: ".about-text",
      start: "top 80%",
    },
    x: 50,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power3.out",
  });

  // Skills Section - Progress Bars
  const skillSection = document.querySelector("#skills");
  if (skillSection) {
    const progressBars = document.querySelectorAll(".progress-bar");
    progressBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0"; // Reset for animation

      ScrollTrigger.create({
        trigger: bar,
        start: "top 85%",
        onEnter: () => {
          gsap.to(bar, {
            width: width,
            duration: 1.5,
            ease: "power2.out",
          });
        },
      });
    });
  }

  // Cards Animation (Skills & Portfolio)
  const cards = document.querySelectorAll(".card-animate");
  if (cards.length > 0) {
    ScrollTrigger.batch(cards, {
      start: "top 85%",
      onEnter: (batch) => {
        gsap.from(batch, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          overwrite: true,
        });
      },
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
