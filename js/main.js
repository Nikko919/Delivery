var swiper = new Swiper(".brends-swiper", {
  slidesPerView: 4,
  spaceBetween: 5,
  breakpoints: {
    1200: {
      slidesPerView: 3,
    }
  },
  navigation: {
    nextEl: ".brends-swiper-next",
    prevEl: ".brends-swiper-prev",
  },

});


// свайпер  select

var swiper = new Swiper(".selectSwiper", {
  breakpoints: {
    320: {

      slidesPerView: 1.5,
      spaceBetween: 10,
    },
    380: {

      slidesPerView: 2,
      spaceBetween: 10,
    },
    600: {

      slidesPerView: 3,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 4.5,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 4.5,
      // slidesPerView: 6.5,
      spaceBetween: 10,
    },
    1400: {
      slidesPerView: 5.5,
      // slidesPerView: 6.5,
      spaceBetween: 10,
    },
  },
  grabCursor: true,
  loop: false,
  navigation: {
    nextEl: ".selectSwiper-next",
    prevEl: ".selectSwiper-prev",
  },
});



// беблиотека подсказки старый код 
// document.addEventListener('DOMContentLoaded', () => {
//   const button = document.querySelector('.selectSwiper-card__top-svg-box');
//   const tooltip = document.getElementById('tooltip');

//   // Закрытие при клике вне элемента
//   document.addEventListener('click', (event) => {
//     if (!button.contains(event.target)) {

//       tooltip.style.display = 'none';
//     }
//   });

//   button.addEventListener('click', async (event) => {
//     event.stopPropagation(); // Предотвращаем всплытие

//     // Переключаем видимость подсказки
//     const shouldShow = tooltip.style.display !== 'block';
//     tooltip.style.display = shouldShow ? 'block' : 'none';

//     if (shouldShow) {
//       // Позиционируем слева с отступом 10px
//       const { x, y } = await FloatingUIDOM.computePosition(button, tooltip, {
//         placement: 'left',
//         middleware: [
//           FloatingUIDOM.offset({ mainAxis: 10 }),
//           FloatingUIDOM.flip(),
//           FloatingUIDOM.shift({ padding: 5 })
//         ]
//       });

//       // tooltip.style.transform = `translate(${x}px, ${y}px)`;
//     }
//   });
// });

// это код которфй работает для подсказак и на всех карточках его показывает  




// код для подсказак в карточках

document.addEventListener('DOMContentLoaded', () => {
  // Обработчик для всех карточек
  document.querySelectorAll('.selectSwiper-card').forEach(card => {
    const button = card.querySelector('.selectSwiper-card__top-svg-box');
    const tooltip = card.querySelector('#tooltip'); // Используем класс для подсказки

    if (!button || !tooltip) {
      console.warn('Не найдены кнопка или подсказка в карточке', card);
      return;
    }

    // Обработчик клика по кнопке
    button.addEventListener('click', async (event) => {
      event.stopPropagation();

      // Закрываем все другие подсказки
      document.querySelectorAll('.selectSwiper-card__tooltip').forEach(t => {
        if (t !== tooltip) t.style.display = 'none';
      });

      // Переключаем текущую подсказку
      const shouldShow = tooltip.style.display !== 'block';
      tooltip.style.display = shouldShow ? 'block' : 'none';

      if (shouldShow) {
        try {
          const { x, y } = await FloatingUIDOM.computePosition(button, tooltip, {
            placement: 'left',
            middleware: [
              FloatingUIDOM.offset({ mainAxis: 10 }),
              FloatingUIDOM.flip(),
              FloatingUIDOM.shift({ padding: 5 })
            ]
          });
        } catch (error) {
          console.error('Ошибка позиционирования:', error);
        }
      }
    });
  });

  // Закрытие при клике вне карточек
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.selectSwiper-card')) {
      document.querySelectorAll('.selectSwiper-card__tooltip').forEach(tooltip => {
        tooltip.style.display = 'none';
      });
    }
  });
});







// радиоё

document.querySelectorAll('.selectSwiper-card').forEach(card => {
  const radio = card.querySelector('.card-radio-input');
  const tooltipBtn = card.querySelector('.selectSwiper-card__top-svg-box');

  // Вешаем обработчик на всю карточку
  card.addEventListener('click', function (e) {
    // Если кликнули на подсказку - ничего не делаем
    if (e.target.closest('.selectSwiper-card__top-svg-box')) return;

    // Снимаем выделение со всех карточек
    document.querySelectorAll('.selectSwiper-card').forEach(otherCard => {
      if (otherCard !== card) {
        const otherRadio = otherCard.querySelector('.card-radio-input');
        otherRadio.checked = false;
        otherCard.classList.remove('selected');
      }
    });

    // Переключаем текущую карточку
    radio.checked = !radio.checked;
    card.classList.toggle('selected', radio.checked);
  });

  // Блокируем всплытие для подсказки
  tooltipBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    // Ваш код подсказки
  });
});







// код для подсказок в конце формы 
document.addEventListener('DOMContentLoaded', () => {
  // Обработчик для всех кнопок с подсказками
  document.querySelectorAll('[data-tooltip-toggle]').forEach(button => {
    const tooltipId = button.getAttribute('aria-describedby') || button.getAttribute('data-tooltip-target');
    if (!tooltipId) {
      console.warn('Не указан ID подсказки для кнопки', button);
      return;
    }

    const tooltip = document.getElementById(tooltipId);
    if (!tooltip) {
      console.warn('Не найдена подсказка с ID:', tooltipId);
      return;
    }

    // Инициализация подсказки (скрываем по умолчанию)
    tooltip.style.display = 'none';

    // Обработчик клика по кнопке
    button.addEventListener('click', async (event) => {
      event.stopPropagation();

      // Закрываем все другие подсказки
      document.querySelectorAll('[role="tooltip"]').forEach(t => {
        if (t !== tooltip) t.style.display = 'none';
      });

      // Переключаем текущую подсказку
      const shouldShow = tooltip.style.display !== 'block';
      tooltip.style.display = shouldShow ? 'block' : 'none';

      if (shouldShow) {
        try {
          const { x, y } = await FloatingUIDOM.computePosition(button, tooltip, {
            placement: 'top-start',
            middleware: [
              FloatingUIDOM.offset({ mainAxis: 10 }),
              FloatingUIDOM.flip(),
              FloatingUIDOM.shift({ padding: 5 })
            ]
          });

          Object.assign(tooltip.style, {
            left: `${x}px`,
            top: `${y}px`
          });
        } catch (error) {
          console.error('Ошибка позиционирования:', error);
        }
      }
    });
  });

  // Закрытие при клике вне подсказок
  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-tooltip-toggle]') &&
      !event.target.closest('[role="tooltip"]')) {
      document.querySelectorAll('[role="tooltip"]').forEach(tooltip => {
        tooltip.style.display = 'none';
      });
    }
  });
});