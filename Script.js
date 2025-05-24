<script>
    let carousel = document.getElementById("carousel");
    let cards = document.querySelectorAll(".carousel .card");
    let currentIndex = 0;
    let interval = setInterval(() => moveCarousel(1), 3000); // Auto slide every 3 seconds
    let startX = 0; // For swipe gesture

    function moveCarousel(step) {
      currentIndex = (currentIndex + step + cards.length) % cards.length;
      updateCarousel();
    }

    function updateCarousel() {
      let offset = -cards[currentIndex].offsetLeft + (document.querySelector(".carousel-wrapper").offsetWidth - cards[currentIndex].offsetWidth) / 2;
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

    // Swipe Gesture Support
    document.getElementById("carousel-wrapper").addEventListener("touchstart", e => startX = e.touches[0].clientX);
    document.getElementById("carousel-wrapper").addEventListener("touchend", e => {
      let endX = e.changedTouches[0].clientX;
      if (endX - startX > 50) moveCarousel(-1);
      else if (startX - endX > 50) moveCarousel(1);
    });

    window.onload = () => {
      initDots();
      updateCarousel();
    }
  </script>
  <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
  <script>
  var typed = new Typed('.typed-text', {
    strings: ["Web Developer", "Problem Solver", "Tech Enthusiast"],
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 1500,
    loop: true
  });
  </script>
  <script>
  const video = document.getElementById('heroVideo');
  video.playbackRate = 0.3; // slow down to 10% speed
  </script>
 
