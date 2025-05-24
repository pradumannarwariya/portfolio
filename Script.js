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

window.onload = () => {
  initDots();
  updateCarousel();

  // Typed text
  var typed = new Typed('.typed-text', {
    strings: ["Web Developer", "Problem Solver", "Tech Enthusiast"],
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 1500,
    loop: true
  });

  // Video control
  const video = document.getElementById('heroVideo');
  if (video) {
    video.playbackRate = 0.3;
  }

  // Particles
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
}
