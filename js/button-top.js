
const buttonTop = document.querySelector('.button-top');

buttonTop.addEventListener("click", btnTop);
window.addEventListener("scroll", trackScroll);

function trackScroll() {
  const offset = window.pageYOffset;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const threshold = isMobile ? 350 : 600;

  buttonTop.classList.toggle('go-top-show', offset > threshold);
}

function btnTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Измените на 'auto' для мгновенного скролла
  });
}