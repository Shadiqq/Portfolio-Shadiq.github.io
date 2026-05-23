(function () {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const navbar = $("nav");
  const navLinks = $$("nav ul li a");
  const sections = $$('section[id]');
  const typingElement = $(".hero-text h3");
  const heroImage = $(".hero-image img");

  const canRunTyping = Boolean(typingElement);
  const canRunHeroImage = Boolean(heroImage);

  let currentId = "";

  const scrollBtn = document.createElement("button");
  scrollBtn.type = "button";
  scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  scrollBtn.style.position = "fixed";
  scrollBtn.style.bottom = "30px";
  scrollBtn.style.right = "30px";
  scrollBtn.style.padding = "15px";
  scrollBtn.style.border = "none";
  scrollBtn.style.borderRadius = "50%";
  scrollBtn.style.background = "#38bdf8";
  scrollBtn.style.color = "#0f172a";
  scrollBtn.style.cursor = "pointer";
  scrollBtn.style.display = "none";
  scrollBtn.style.fontSize = "18px";
  scrollBtn.style.zIndex = "999";
  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const onScroll = () => {
    const y = window.scrollY || 0;

    if (navbar) {
      navbar.style.boxShadow = y > 50 ? "0 5px 20px rgba(0,0,0,0.3)" : "none";
    }

    scrollBtn.style.display = y > 300 ? "block" : "none";

    let nextId = "";
    for (const section of sections) {
      const sectionTop = section.offsetTop;
      if (y >= sectionTop - 200) {
        nextId = section.getAttribute("id") || "";
      }
    }

    if (nextId !== currentId) {
      currentId = nextId;
      for (const link of navLinks) {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        }
      }
    }

    if (canRunHeroImage) {
      const scale = 1 + y / 5000;
      heroImage.style.transform = `scale(${scale})`;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  
  if (canRunTyping) {
    const roles = [
      "Network Engineer",
      "4G/5G Enthusiast",
      "Linux Administrator",
    ];

    let roleIndex = 0;
    let charIndex = 0;

    typingElement.textContent = "";

    const typeEffect = () => {
      const currentRole = roles[roleIndex] || "";
      if (charIndex < currentRole.length) {
        typingElement.textContent += currentRole.charAt(charIndex);
        charIndex += 1;
        setTimeout(typeEffect, 100);
      } else {
        setTimeout(eraseEffect, 1500);
      }
    };

    const eraseEffect = () => {
      const currentRole = roles[roleIndex] || "";
      if (charIndex > 0) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex -= 1;
        setTimeout(eraseEffect, 50);
      } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
      }
    };

    typeEffect();
  }

  // CONSOLE MESSAGE
  console.log(`\r\n=============================\r\n QIZDI YU PORTFOLIO WEBSITE\r\n=============================\r\n`);
})();

