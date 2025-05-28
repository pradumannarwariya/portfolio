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

const labels = ['HTML', 'CSS', 'JavaScript', 'Python', 'SQL'];
    let skillsData = [95, 90, 85, 98, 75];

    const radarCtx = document.getElementById('radarChart').getContext('2d');
    const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
    const polarCtx = document.getElementById('polarChart').getContext('2d');

    const colorSets = [
      ['#00c9ff', '#92fe9d'],
      ['#f2709c', '#ff9472'],
      ['#fc6076', '#ff9a44'],
      ['#43e97b', '#38f9d7'],
      ['#30cfd0', '#330867']
    ];

    let offset = 0;

    const createMovingGradient = (ctx, color1, color2, offset) => {
      const gradient = ctx.createLinearGradient(offset % 400, 0, 400 + offset % 400, 400);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      return gradient;
    };

    let radarChart, doughnutChart, polarChart;

    const initCharts = () => {
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
    };

    function animateGradients() {
      offset += 2;
      doughnutChart.data.datasets[0].backgroundColor =
        colorSets.map(([c1, c2]) => createMovingGradient(doughnutCtx, c1, c2, offset));
      polarChart.data.datasets[0].backgroundColor =
        colorSets.map(([c1, c2]) => createMovingGradient(polarCtx, c1, c2, offset));

      doughnutChart.update('none');
      polarChart.update('none');

      requestAnimationFrame(animateGradients);
    }

    function updateSkills() {
      // Example: Updating skill levels
      skillsData = [96, 91, 87, 99, 80];
      radarChart.data.datasets[0].data = skillsData;
      doughnutChart.data.datasets[0].data = skillsData;
      polarChart.data.datasets[0].data = skillsData;

      radarChart.update();
      doughnutChart.update();
      polarChart.update();
    }

    initCharts();
    animateGradients();
