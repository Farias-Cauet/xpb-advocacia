// ===== MENU MOBILE =====
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== SCROLL REVEAL =====
const revealTargets = document.querySelectorAll('.area-card, .dif-item, .sobre-media, .sobre-content, .contato-form, .contato-info');
revealTargets.forEach(el => el.setAttribute('data-reveal', ''));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// ===== FORM SUBMIT (Netlify Forms via fetch, sem reload) =====
const form = document.getElementById('contato-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(form);

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString()
  })
    .then(() => {
      status.textContent = 'Mensagem enviada. Retornaremos em até 24h úteis.';
      form.reset();
    })
    .catch(() => {
      status.textContent = 'Não foi possível enviar agora. Tente novamente ou use o telefone/e-mail ao lado.';
    });
});
