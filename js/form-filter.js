const dropDown = document.querySelectorAll('.dropdown-filter-box');


// === УНИВЕРСАЛЬНОЕ ОТКРЫТИЕ/ЗАКРЫТИЕ ФИЛЬТРОВ ===

document.querySelectorAll('.dropdown-filter-box').forEach(dropDownBox => {
  const filterSelect = dropDownBox.querySelector('.dropdown-filter-select');
  const menu = dropDownBox.querySelector('.dropdown-filter-menu-list');
  // Открытие/закрытие по клику на select
  filterSelect.addEventListener('click', (e) => {
    e.stopPropagation();
    // Закрыть все остальные меню
    document.querySelectorAll('.dropdown-filter-menu-list.menu-open').forEach(openMenu => {
      if (openMenu !== menu) openMenu.classList.remove('menu-open');
    });
    menu.classList.toggle('menu-open');
  });
  // Закрытие при выборе пункта
  menu.querySelectorAll('.dropdown-filter-menu-item').forEach(item => {
    item.addEventListener('click', () => {
      menu.classList.remove('menu-open');
    });
  });
});
// Закрытие при клике вне меню
window.addEventListener('click', (e) => {
  document.querySelectorAll('.dropdown-filter-menu-list.menu-open').forEach(menu => {
    menu.classList.remove('menu-open');
  });
});


// === ИЗОЛИРОВАННАЯ ФИЛЬТРАЦИЯ ДЛЯ КАЖДОЙ ФОРМЫ ===
document.querySelectorAll('.dropdown-filter-menu-item').forEach(item => {
  item.addEventListener('click', function () {
    // Находим форму-контейнер
    const form = this.closest('.form-delivery__form');
    if (!form) return;
    // Ищем карточки только внутри этой формы
    const cards = form.querySelectorAll('.selectSwiper-slide');
    // Ищем слайдер только внутри этой формы
    let selectSwiperInstance = null;
    const swiperEl = form.querySelector('.selectSwiper');
    if (swiperEl && swiperEl.swiper) {
      selectSwiperInstance = swiperEl.swiper;
    }
    const filterValue = this.getAttribute('data-brend');
    if (!filterValue) {
      // Показать все карточки
      cards.forEach(card => {
        card.style.display = '';
      });
      if (selectSwiperInstance) selectSwiperInstance.slideTo(0, 0);
      return;
    }
    // Фильтруем карточки
    cards.forEach(card => {
      if (card.getAttribute('data-brend') === filterValue) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
    if (selectSwiperInstance) selectSwiperInstance.slideTo(0, 0);
  });
});


