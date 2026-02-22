// URL del stream editable por el administrador.
const streamURL = "https://TU_STREAM_AQUI.com/stream";

const player = document.getElementById('radioPlayer');
const togglePlayBtn = document.getElementById('togglePlay');
const reloadBtn = document.getElementById('reloadStream');
const heroPlayBtn = document.getElementById('heroPlayBtn');
const bottomPlayBtn = document.getElementById('bottomPlayBtn');
const liveIndicator = document.getElementById('liveIndicator');
const dynamicSubtitle = document.getElementById('dynamicSubtitle');

player.src = streamURL;

const subtitlePhrases = [
  'Siempre al ritmo de tu ciudad.',
  'Sonido urbano que conecta generaciones.',
  'La energía de Guajayvi en cada frecuencia.'
];

let subtitleIndex = 0;
dynamicSubtitle.style.transition = 'opacity .25s ease';

setInterval(() => {
  subtitleIndex = (subtitleIndex + 1) % subtitlePhrases.length;
  dynamicSubtitle.style.opacity = '0';
  setTimeout(() => {
    dynamicSubtitle.textContent = subtitlePhrases[subtitleIndex];
    dynamicSubtitle.style.opacity = '1';
  }, 220);
}, 2600);

async function togglePlayer() {
  try {
    if (player.paused) {
      await player.play();
    } else {
      player.pause();
    }
  } catch {
    alert('No se pudo iniciar el streaming. Verifica la URL del stream.');
  }
}

function updateLiveState() {
  const isPlaying = !player.paused;
  liveIndicator.textContent = isPlaying ? 'EN VIVO 🔴' : 'EN VIVO ⚪';
  liveIndicator.classList.toggle('active', isPlaying);

  togglePlayBtn.textContent = isPlaying ? '⏸️ Pause' : '▶️ Play';
  heroPlayBtn.textContent = isPlaying ? '⏸' : '▶';
  bottomPlayBtn.textContent = isPlaying ? '⏸' : '▶';
}

[togglePlayBtn, heroPlayBtn, bottomPlayBtn].forEach((btn) => {
  btn.addEventListener('click', togglePlayer);
});

reloadBtn.addEventListener('click', async () => {
  player.load();
  if (!player.paused) {
    await player.play();
  }
});

player.addEventListener('play', updateLiveState);
player.addEventListener('pause', updateLiveState);
player.addEventListener('ended', updateLiveState);

const contactForm = document.getElementById('contactForm');
const formError = document.getElementById('formError');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formError.textContent = '';
  formSuccess.textContent = '';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    formError.textContent = 'Por favor, completa todos los campos.';
    return;
  }

  if (!emailRegex.test(email)) {
    formError.textContent = 'Ingresa un correo electrónico válido.';
    return;
  }

  formSuccess.textContent = '¡Mensaje enviado! Te responderemos pronto.';
  contactForm.reset();
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
updateLiveState();
