const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.burger__box')

const body = document.body;

// базовый код 
// if (menu && menuBtn) {
//   menuBtn.addEventListener('click', () => {
//     menu.classList.toggle('active');
//     menuBtn.classList.toggle('active');
//     body.classList.toggle('lock');
//   })

//   menu.querySelectorAll('.menu__item-link').forEach(link => {
//     link.addEventListener('click', () => {
//       menu.classList.remove('active');
//       menuBtn.classList.remove('active');
//       body.classList.remove('lock');
//     })
//   })
// }




// код с запретом на скролл
// ... existing code ...
if (menu && menuBtn) {
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuBtn.classList.toggle('active');

    // Добавляем класс lock сразу при открытии меню
    if (menu.classList.contains('active')) {
      body.classList.add('lock');
      // Запрещаем прокрутку
      document.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      body.classList.remove('lock');
      // Разрешаем прокрутку
      document.removeEventListener('touchmove', preventScroll);
    }
  })

  menu.querySelectorAll('.menu__item-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      menuBtn.classList.remove('active');
      body.classList.remove('lock');
      // Разрешаем прокрутку
      document.removeEventListener('touchmove', preventScroll);
    })
  })
}

// Функция для предотвращения прокрутки
function preventScroll(e) {
  e.preventDefault();
}
// ... existing code ...