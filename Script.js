      // ========================== Carousel ==========================
let carousel = document.getElementById("carousel");
let cards = document.querySelectorAll(".carousel .card");
let currentIndex = 0;
let interval = setInterval(() => moveCarousel(1), 3000);

let startX = 0;

function moveCarousel(step) {
  currentIndex = (currentIndex + step + cards.length) % cards.length;
  updateCarousel();
}

function updateCarousel() {
  let offset = -cards[currentIndex].offsetLeft +
    (document.querySelector(".carousel-wrapper").offsetWidth - cards[currentIndex].offsetWidth) / 2;
  carousel.style.transform = `translateX(${offset}px)`;
  updateDots();
}

function updateDots() {
  let dots = document.querySelectorAll(".carousel-dots span");
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentIndex);
  });
}

function initDots() {
  let dotContainer = document.getElementById("carousel-dots");
  cards.forEach((_, idx) => {
    let dot = document.createElement("span");
    dot.onclick = () => {
      currentIndex = idx;
      updateCarousel();
    };
    dotContainer.appendChild(dot);
  });
  updateDots();
}

document.getElementById("carousel-wrapper").addEventListener("mouseover", () => clearInterval(interval));
document.getElementById("carousel-wrapper").addEventListener("mouseout", () => interval = setInterval(() => moveCarousel(1), 3000));

document.getElementById("carousel-wrapper").addEventListener("touchstart", e => startX = e.touches[0].clientX);
document.getElementById("carousel-wrapper").addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (endX - startX > 50) moveCarousel(-1);
  else if (startX - endX > 50) moveCarousel(1);
});

// ========================== On Load ==========================
window.onload = () => {
  initDots();
  updateCarousel();

  // Typed.js for Hero
  var typed = new Typed('.typed-text', {
    strings: ["Web Developer", "Problem Solver", "Tech Enthusiast"],
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 1500,
    loop: true
  });

  // Video Speed Control
  const video = document.getElementById('heroVideo');
  if (video) {
    video.playbackRate = 0.3;
  }

  // tsParticles Background
  tsParticles.load("tsparticles", {
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      number: { value: 80 },
      color: { value: "#bb86fc" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 5 } },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        outModes: { default: "bounce" }
      },
      links: {
        enable: true,
        distance: 120,
        color: "#bb86fc",
        opacity: 0.4,
        width: 1
      }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        repulse: { distance: 100 },
        push: { quantity: 4 }
      }
    },
    background: {
      color: "#0d0b1f"
    }
  });

  // Observe About Me Animation
  const aboutSection = document.querySelector(".about-container");
  if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    });
    aboutObserver.observe(aboutSection);
  }
};

// ========================== Project Typing + Scroll Animations ==========================
function startTyping(container) {
  if (container.classList.contains('typed')) return;
  container.classList.add('typed');

  const lines = JSON.parse(container.getAttribute('data-lines'));
  let currentLine = 0;
  let currentChar = 0;
  let content = '';

  function typeLine() {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];
    container.textContent = content + line.slice(0, currentChar) + '|';
    currentChar++;

    if (currentChar <= line.length) {
      setTimeout(typeLine, 40);
    } else {
      content += line + '\n';
      currentLine++;
      currentChar = 0;
      setTimeout(typeLine, 400);
    }
  }

  typeLine();
}

const projectObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const project = entry.target;
      project.classList.add('visible');

      const img = project.querySelector('.project-img');
      const heading = project.querySelector('h3');
      const lines = project.querySelector('.typed-lines');

      if (img) img.classList.add('visible');
      if (heading) heading.classList.add('visible');
      if (lines) startTyping(lines);

      obs.unobserve(project);
    }
  });
}, {
  threshold: 0.3
});

document.querySelectorAll('.project').forEach(project => projectObserver.observe(project));
      
      
      
  function openModal(type) {
      const modal = document.getElementById(type + 'Modal');
      modal.style.display = 'flex';
      modal.style.animation = 'fadeIn 0.5s ease';
    }

 function closeModal(type) {
      document.getElementById(type + 'Modal').style.display = 'none';
    }

    window.onclick = function(event) {
      ['contactModal', 'feedbackModal'].forEach(id => {
        const modal = document.getElementById(id);
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
    }