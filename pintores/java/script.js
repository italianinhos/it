const scrollLinks = document.querySelectorAll('.scroll-link');

// Função para rolar suavemente para o destino do link
function smoothScrollTo(e, target) {
  e.preventDefault();
  const targetElement = document.querySelector(target);
  if (!targetElement) return;
  
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 800; // Defina a duração desejada em milissegundos

  let start = null;
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
}

// Função de animação para efeito de rolagem suave (easeInOutCubic)
function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t * t + b;
  t -= 2;
  return c / 2 * (t * t * t + 2) + b;
}

// Adicionar evento de clique a todos os links de rolagem
scrollLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    smoothScrollTo(e, link.getAttribute('href'));
  });
});