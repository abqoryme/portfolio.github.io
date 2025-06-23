function toggleMenu() {
  document.getElementById('navMenu').classList.toggle('active');
}
function closeMenu() {
  document.getElementById('navMenu').classList.remove('active');
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  const icon = document.getElementById('themeToggle');
  icon.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}
/* AUDIO FUNCTION */
function toggleAudio() {
  const audio = document.getElementById('bg-audio');
  const icon = document.getElementById('audioToggle');

  if (audio.paused) {
  audio.play();
  icon.textContent = '🔊';
  localStorage.setItem('audio', 'play');
} else {
  audio.pause();
  icon.textContent = '🔈';
  localStorage.setItem('audio', 'pause');
}
}
const audio = document.getElementById('bg-audio');
const audioToggle = document.getElementById('audioToggle');
const audioState = localStorage.getItem('audio');

if (audioState === 'play') {
  audio.play();
  audioToggle.textContent = '🔊';
} else {
  audio.pause();
  audioToggle.textContent = '🔈';
}
/* DARK WHITE */
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    document.getElementById('themeToggle').textContent = '☀️';
  }

  const preloaderVideo = document.getElementById('preloaderVideo');
  const preloader = document.getElementById('preloader');
  const bgAudio = document.getElementById('bg-audio');

  fetch('p_93kdl9mXz.mp4')
    .then(response => response.blob())
    .then(blob => {
      const blobUrl = URL.createObjectURL(blob);
      preloaderVideo.src = blobUrl;
      preloaderVideo.play();
    });

  preloaderVideo.onended = () => {
    preloader.style.display = 'none';
    bgAudio.play().catch(e => console.warn('Autoplay prevented:', e));
  };
});
/* SELECTION */
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

let slideIndex = 0;
const track = document.querySelector('.testimonial-track');
const cards = document.querySelectorAll('.testimonial-card');
const totalSlides = cards.length;

function updateSlider() {
  const width = cards[0].offsetWidth;
  track.style.transform = `translateX(-${slideIndex * width}px)`;
}

setInterval(() => {
  slideIndex = (slideIndex + 1) % totalSlides;
  updateSlider();
}, 5000);

// Touch Support
let startX = 0;
function startTouch(e) {
  startX = e.touches[0].clientX;
}

function moveTouch(e) {
  if (!startX) return;

  let diffX = startX - e.touches[0].clientX;
  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      // Swipe Left
      slideIndex = (slideIndex + 1) % totalSlides;
    } else {
      // Swipe Right
      slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    }
    updateSlider();
    startX = 0;
  }
}