// ========================== Carousel ==========================
const carousel = document.getElementById("carousel");
const cards = document.querySelectorAll(".carousel .card");
let currentIndex = 0;
// Automatically move the carousel every 3 seconds
let interval = setInterval(() => moveCarousel(1), 3000);
let startX = 0; // For touch swipe detection

/**
 * Moves the carousel by a given number of steps.
 * @param {number} step The number of cards to move (positive for right, negative for left).
 */
function moveCarousel(step) {
  // Calculate the new index, wrapping around if necessary
  currentIndex = (currentIndex + step + cards.length) % cards.length;
  updateCarousel();
}

/**
 * Updates the visual position of the carousel to show the current card.
 */
function updateCarousel() {
  // Calculate the offset to center the current card in the wrapper
  const offset = -cards[currentIndex].offsetLeft +
    (document.querySelector(".carousel-wrapper").offsetWidth - cards[currentIndex].offsetWidth) / 2;
  carousel.style.transform = `translateX(${offset}px)`;
  updateDots();
}

/**
 * Updates the active state of the carousel navigation dots.
 */
function updateDots() {
  const dots = document.querySelectorAll(".carousel-dots span");
  dots.forEach((dot, idx) => {
    // Toggle the 'active' class based on whether the dot's index matches the current index
    dot.classList.toggle("active", idx === currentIndex);
  });
}

/**
 * Initializes the carousel navigation dots.
 */
function initDots() {
  const dotContainer = document.getElementById("carousel-dots");
  cards.forEach((_, idx) => {
    const dot = document.createElement("span");
    // Add a click listener to each dot to navigate to the corresponding card
    dot.onclick = () => {
      currentIndex = idx;
      updateCarousel();
    };
    dotContainer.appendChild(dot);
  });
  updateDots(); // Set the initial active dot
}

// Pause automatic carousel on mouseover
const carouselWrapper = document.getElementById("carousel-wrapper");
if (carouselWrapper) {
  carouselWrapper.addEventListener("mouseover", () => clearInterval(interval));
  // Resume automatic carousel on mouseout
  carouselWrapper.addEventListener("mouseout", () => interval = setInterval(() => moveCarousel(1), 3000));

  // Touch event listeners for swipe navigation
  carouselWrapper.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  carouselWrapper.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    // Swipe left to go to the next card
    if (startX - endX > 50) moveCarousel(1);
    // Swipe right to go to the previous card
    else if (endX - startX > 50) moveCarousel(-1);
  });
}

// ========================== On Load ==========================
window.onload = () => {
  initDots();
  updateCarousel();

  // Typed.js for Hero section text animation
  const typedElement = document.querySelector('.typed-text');
  if (typedElement) {
    const typed = new Typed(typedElement, {
      strings: ["Web Developer", "Problem Solver", "Tech Enthusiast"],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1500,
      loop: true
    });
  }

  // Control the playback speed of the hero video
  const video = document.getElementById('heroVideo');
  if (video) {
    video.playbackRate = 0.3;
  }

  // tsParticles Background configuration
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

  // Intersection Observer for About Me section animation
  const aboutSection = document.querySelector(".about-container");
  if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // No need to unobserve as we might want the animation to trigger again if the user scrolls back
        }
      });
    });
    aboutObserver.observe(aboutSection);
  }

  // Initialize the charts
  initCharts();
  // Start the gradient animation for the charts
  animateGradients();
};

// ========================== Project Typing + Scroll Animations ==========================
/**
 * Starts the typing animation for a given container element.
 * @param {HTMLElement} container The element containing the lines to be typed.
 */
function startTyping(container) {
  // Prevent re-typing if already typed
  if (container.classList.contains('typed')) return;
  container.classList.add('typed');

  const lines = JSON.parse(container.getAttribute('data-lines'));
  let currentLine = 0;
  let currentChar = 0;
  let content = '';

  /**
   * Types the characters of the current line.
   */
  function typeLine() {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];
    container.textContent = content + line.slice(0, currentChar) + '|';
    currentChar++;

    if (currentChar <= line.length) {
      setTimeout(typeLine, 40); // Typing speed
    } else {
      content += line + '\n';
      currentLine++;
      currentChar = 0;
      setTimeout(typeLine, 400); // Delay before next line
    }
  }

  typeLine();
}

// Intersection Observer for Project section animations
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

      obs.unobserve(project); // Only animate once
    }
  });
}, {
  threshold: 0.3 // Trigger when 30% of the element is visible
});

document.querySelectorAll('.project').forEach(project => projectObserver.observe(project));

// ========================== Modal Functionality ==========================
/**
 * Opens a modal window.
 * @param {string} type The type of modal to open ('contact' or 'feedback').
 */
function openModal(type) {
  const modal = document.getElementById(type + 'Modal');
  if (modal) {
    modal.style.display = 'flex';
    // Add fade-in animation class
    setTimeout(() => {
      modal.style.animation = 'fadeIn 0.5s ease';
    }, 0);
  }
}

/**
 * Closes a modal window.
 * @param {string} type The type of modal to close ('contact' or 'feedback').
 */
function closeModal(type) {
  const modal = document.getElementById(type + 'Modal');
  if (modal) {
    modal.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => {
      modal.style.display = 'none';
      modal.style.animation = ''; // Reset animation
    }, 300);
  }
}

// Close modal when clicking outside
window.onclick = function(event) {
  ['contactModal', 'feedbackModal'].forEach(id => {
    const modal = document.getElementById(id);
    if (modal && event.target === modal) {
      closeModal(id.replace('Modal', ''));
    }
  });
};

// ========================== Chart.js Implementation ==========================
const labels = ['HTML', 'CSS', 'JavaScript', 'Python', 'SQL'];
let skillsData = [95, 90, 85, 98, 75];

// Get the 2D rendering contexts of the canvas elements
const radarCtx = document.getElementById('radarChart').getContext('2d');
const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
const polarCtx = document.getElementById('polarChart').getContext('2d');

// Array of color pairs for gradients
const colorSets = [
  ['#00c9ff', '#92fe9d'],
  ['#f2709c', '#ff9472'],
  ['#fc6076', '#ff9a44'],
  ['#43e97b', '#38f9d7'],
  ['#30cfd0', '#330867']
];

let offset = 0; // Offset for the moving gradient effect

/**
 * Creates a linear gradient with a moving effect.
 * @param {CanvasRenderingContext2D} ctx The 2D rendering context.
 * @param {string} color1 The starting color of the gradient.
 * @param {string} color2 The ending color of the gradient.
 * @param {number} offset The current offset for the gradient.
 * @returns {CanvasGradient} The created linear gradient.
 */
const createMovingGradient = (ctx, color1, color2, offset) => {
  const gradient = ctx.createLinearGradient(offset % 400, 0, 400 + offset % 400, 400);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
};

// Chart instances
let radarChart, doughnutChart, polarChart;

/**
 * Initializes the Chart.js charts.
 */
const initCharts = () => {
  if (radarCtx) {
    radarChart = new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels,
        datasets: [{
          label: 'Skill Level',
          data: skillsData,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: '#00ffff',
          pointBackgroundColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          r: {
            min: 50,
            max: 100,
            angleLines: { color: '#444' },
            grid: { color: '#666' },
            pointLabels: { color: '#fff' },
            ticks: { color: '#fff', backdropColor: 'transparent' }
          }
        },
        plugins: {
          legend: { labels: { color: '#fff' } }
        }
      }
    });
    console.log("Radar Chart initialized:", radarChart);
  }

  if (doughnutCtx) {
    doughnutChart = new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data: skillsData,
          backgroundColor: colorSets.map(([c1, c2]) => createMovingGradient(doughnutCtx, c1, c2, offset)),
          borderWidth: 2
        }]
      },
      options: {
        plugins: {
          legend: { labels: { color: '#fff' } }
        }
      }
    });
    console.log("Doughnut Chart initialized:", doughnutChart);
  }

  if (polarCtx) {
    polarChart = new Chart(polarCtx, {
      type: 'polarArea',
      data: {
        labels,
        datasets: [{
          data: skillsData,
          backgroundColor: colorSets.map(([c1, c2]) => createMovingGradient(polarCtx, c1, c2, offset)),
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          r: {
            min: 50,
            max: 100,
            ticks: { color: '#fff' },
            grid: { color: '#666' }
          }
        },
        plugins: {
          legend: { labels: { color: '#fff' } }
        }
      }
    });
    console.log("Polar Chart initialized:", polarChart);
  }
};

/**
 * Animates the gradients of the doughnut and polar area charts.
 */
function animateGradients() {
  offset += 2;
  if (doughnutChart && doughnutChart.data) {
    doughnutChart.data.datasets[0].backgroundColor =
      colorSets.map(([c1, c2]) => createMovingGradient(doughnutCtx, c1, c2, offset));
    doughnutChart.update('none');
  }
  if (polarChart && polarChart.data) {
    polarChart.data.datasets[0].backgroundColor =
      colorSets.map(([c1, c2]) => createMovingGradient(polarCtx, c1, c2, offset));
    polarChart.update('none');
  }
  requestAnimationFrame(animateGradients);
}

/**
 * Example function to update the skill data and refresh the charts.
 */
function updateSkills() {
  skillsData = [96, 91, 87, 99, 80];
  if (radarChart && radarChart.data) {
    radarChart.data.datasets[0].data = skillsData;
    radarChart.update();
  }
  if (doughnutChart && doughnutChart.data) {
    doughnutChart.data.datasets[0].data = skillsData;
    doughnutChart.update();
  }
  if (polarChart && polarChart.data) {
    polarChart.data.datasets[0].data = skillsData;
    polarChart.update();
  }
}

// The initCharts and animateGradients functions are called within the window.onload event
// to ensure the DOM is fully loaded.
