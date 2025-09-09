    // Navbar toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    // Typing animation
    const roles = ["Web Developer", "Designer", "Programmer"];
    let roleIndex = 0;
    let charIndex = 0;
    const typingElement = document.getElementById("typing-text");
    let deleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      if (!deleting) {
        typingElement.textContent = currentRole.slice(0, charIndex++);
        if (charIndex > currentRole.length) {
          deleting = true;
          setTimeout(typeEffect, 1200);
          return;
        }
      } else {
        typingElement.textContent = currentRole.slice(0, charIndex--);
        if (charIndex < 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeEffect, deleting ? 70 : 120);
    }
    typeEffect();

    // Dark mode toggle + particles
    const toggleBtn = document.getElementById('toggle-dark');
    let particlesColor = "#ffffff";

    function loadParticles(color) {
      particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: color },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 150, color: color, opacity: 0.4, width: 1 },
          move: { enable: true, speed: 2 }
        },
        interactivity: {
          events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
          modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
      });
    }

    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      toggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
      particlesColor = isDark ? "#ff9800" : "#ffffff";
      loadParticles(particlesColor);
    });

    // Initial particle load
    loadParticles(particlesColor);

// Scroll animations
const elements = document.querySelectorAll("section, .project-card, .contact-form, nav, h1, img, .social-animate, .skill-card");


window.addEventListener("scroll", () => {
  elements.forEach(el => {
    const elTop = el.getBoundingClientRect().top;
    if (elTop < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});


document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    contact: document.getElementById("contact").value,
    message: document.getElementById("message").value
  };

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.msg);
});