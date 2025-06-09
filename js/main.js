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



// радиоё

// document.querySelectorAll('.selectSwiper-card').forEach(card => {
//   const radio = card.querySelector('.card-radio-input');
//   const tooltipBtn = card.querySelector('.selectSwiper-card__top-svg-box');

//   // Вешаем обработчик на всю карточку
//   card.addEventListener('click', function (e) {
//     // Если кликнули на подсказку - ничего не делаем
//     if (e.target.closest('.selectSwiper-card__top-svg-box')) return;

//     // Снимаем выделение со всех карточек
//     document.querySelectorAll('.selectSwiper-card').forEach(otherCard => {
//       if (otherCard !== card) {
//         const otherRadio = otherCard.querySelector('.card-radio-input');
//         otherRadio.checked = false;
//         otherCard.classList.remove('selected');
//       }
//     });

//     // Переключаем текущую карточку
//     radio.checked = !radio.checked;
//     card.classList.toggle('selected', radio.checked);
//   });

//   // Блокируем всплытие для подсказки
//   tooltipBtn.addEventListener('click', function (e) {
//     e.stopPropagation();
//     e.preventDefault();
//     // Ваш код подсказки
//   });
// });

document.querySelectorAll('.selectSwiper-card').forEach(card => {
  const radio = card.querySelector('.card-radio-input');
  const tooltipBtn = card.querySelector('.selectSwiper-card__top-svg-box');

  card.addEventListener('click', function (e) {
    if (e.target.closest('.selectSwiper-card__top-svg-box')) return;

    document.querySelectorAll('.selectSwiper-card').forEach(otherCard => {
      if (otherCard !== card) {
        const otherRadio = otherCard.querySelector('.card-radio-input');
        otherRadio.checked = false;
        otherCard.classList.remove('selected');
      }
    });

    radio.checked = true;
    card.classList.add('selected');
    // Важно! Триггерим change
    radio.dispatchEvent(new Event('change', { bubbles: true }));
  });

  tooltipBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });
});





// табы

document.querySelectorAll('.form-delivery-tab__btn').forEach(btn => {
  btn.addEventListener('click', function () {
    // Находим родительский контейнер табов
    const tabGroup = this.closest('.form-delivery-tabs');

    // Удаляем active у всех кнопок и контента ТОЛЬКО В ЭТОЙ ГРУППЕ
    tabGroup.querySelectorAll('.form-delivery-tab__btn').forEach(b => b.classList.remove('active'));
    tabGroup.querySelectorAll('.tab-content__item').forEach(item => item.classList.remove('active'));

    // Активируем текущую кнопку и соответствующий контент
    this.classList.add('active');
    const tabId = this.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});



// Проверка чекбокса политики для всех форм и всех чекбоксов политики новая
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('form').forEach(function (form) {
    const submitBtn = form.querySelector('.form-delivery-btn');
    // Найти все чекбоксы политики в форме
    form.querySelectorAll('input[type="checkbox"][name="policy"]').forEach(function (policyCheckbox) {
      // Находим label по for
      const policyLabel = form.querySelector('label[for="' + policyCheckbox.id + '"]');
      if (submitBtn && policyCheckbox && policyLabel) {
        submitBtn.addEventListener('click', function (event) {
          if (!policyCheckbox.checked) {
            event.preventDefault();
            policyLabel.classList.add('custom-checkbox-error');
          } else {
            policyLabel.classList.remove('custom-checkbox-error');
          }
        });

        policyCheckbox.addEventListener('change', function () {
          if (policyCheckbox.checked) {
            policyLabel.classList.remove('custom-checkbox-error');
          }
        });
      }
    });
  });
});







// валидация
// document.addEventListener('DOMContentLoaded', function () {
//   const forms = document.querySelectorAll('form');

//   forms.forEach(form => {
//     // Добавляем обработчик отправки
//     form.addEventListener('submit', function (e) {
//       let isValid = true;

//       // Проверка обязательных полей
//       const requiredInputs = form.querySelectorAll('input[required]');
//       requiredInputs.forEach(input => {
//         if (!input.value.trim()) {
//           markAsInvalid(input);
//           isValid = false;
//         }
//       });

//       // Проверка телефона
//       const phoneInput = form.querySelector('input[name="phone"]');
//       if (phoneInput && phoneInput.value) {
//         const phone = phoneInput.value.replace(/\D/g, '');
//         if (phone.length < 11) {
//           markAsInvalid(phoneInput);
//           isValid = false;
//         }
//       }

//       // Проверка длины для специфичных полей
//       const addressInputs = form.querySelectorAll('input[name="from"], input[name="to"]');
//       addressInputs.forEach(input => {
//         if (input.value.length > 40) {
//           markAsInvalid(input);
//           isValid = false;
//         }
//       });

//       // Проверка имени (до 100 символов)
//       const nameInput = form.querySelector('input[name="name"]');
//       if (nameInput && nameInput.value.length > 100) {
//         markAsInvalid(nameInput);
//         isValid = false;
//       }

//       if (!isValid) e.preventDefault();
//     });

//     // Динамическая валидация при вводе
//     const allInputs = form.querySelectorAll('input');
//     allInputs.forEach(input => {
//       input.addEventListener('input', function () {
//         // Для полей "Откуда" и "Куда"
//         if (input.name === "from" || input.name === "to") {
//           if (input.value.length > 40) {
//             markAsInvalid(input);
//           } else {
//             markAsValid(input);
//           }
//         }
//         // Для телефона
//         else if (input.name === "phone") {
//           const phone = input.value.replace(/\D/g, '');
//           if (phone.length < 11 && phone.length > 0) {
//             markAsInvalid(input);
//           } else {
//             markAsValid(input);
//           }
//         }
//         // Для имени
//         else if (input.name === "name") {
//           if (input.value.length > 30) {
//             markAsInvalid(input);
//           } else {
//             markAsValid(input);
//           }
//         }
//       });
//     });
//   });

//   function markAsInvalid(input) {
//     input.classList.add('invalid-field');
//   }

//   function markAsValid(input) {
//     input.classList.remove('invalid-field');
//   }
// });




// новая валидация с применением к машинам 
// document.addEventListener('DOMContentLoaded', function () {
//   const forms = document.querySelectorAll('form');

//   forms.forEach(form => {
//     // Добавляем обработчик отправки
//     form.addEventListener('submit', function (e) {
//       let isValid = true;

//       // Проверка обязательных полей
//       const requiredInputs = form.querySelectorAll('input[required]');
//       requiredInputs.forEach(input => {
//         if (!input.value.trim()) {
//           markAsInvalid(input);
//           isValid = false;
//         }
//       });

//       // === ВАЛИДАЦИЯ: carType radio ===
//       const helpCheckbox = form.querySelector('.options-box__btn-help-input');
//       const carTypeRadios = form.querySelectorAll('input[type="radio"][name="carType"]');
//       if (helpCheckbox && !helpCheckbox.checked && carTypeRadios.length > 0) {
//         let carTypeChecked = false;
//         carTypeRadios.forEach(radio => {
//           if (radio.checked) carTypeChecked = true;
//         });
//         if (!carTypeChecked) {
//           carTypeRadios.forEach(radio => {
//             const card = radio.closest('.selectSwiper-card');
//             if (card) card.classList.add('invalid-field');
//           });
//           isValid = false;
//         } else {
//           carTypeRadios.forEach(radio => {
//             const card = radio.closest('.selectSwiper-card');
//             if (card) card.classList.remove('invalid-field');
//           });
//         }
//       } else if (helpCheckbox && helpCheckbox.checked && carTypeRadios.length > 0) {
//         carTypeRadios.forEach(radio => {
//           const card = radio.closest('.selectSwiper-card');
//           if (card) card.classList.remove('invalid-field');
//         });
//       }
//       // === КОНЕЦ ВАЛИДАЦИИ ===

//       // Проверка телефона
//       const phoneInput = form.querySelector('input[name="phone"]');
//       if (phoneInput && phoneInput.value) {
//         const phone = phoneInput.value.replace(/\D/g, '');
//         if (phone.length < 11) {
//           markAsInvalid(phoneInput);
//           isValid = false;
//         }
//       }

//       // Проверка длины для специфичных полей
//       const addressInputs = form.querySelectorAll('input[name="from"], input[name="to"]');
//       addressInputs.forEach(input => {
//         if (input.value.length > 40) {
//           markAsInvalid(input);
//           isValid = false;
//         }
//       });

//       // Проверка имени (до 100 символов)
//       const nameInput = form.querySelector('input[name="name"]');
//       if (nameInput && nameInput.value.length > 100) {
//         markAsInvalid(nameInput);
//         isValid = false;
//       }

//       if (!isValid) e.preventDefault();
//     });

//     // === Новый обработчик: убираем бордер со всех карточек при выборе radio ===
//     const carTypeRadios = form.querySelectorAll('input[type="radio"][name="carType"]');
//     carTypeRadios.forEach(radio => {
//       radio.addEventListener('change', function () {
//         // Убираем бордер со всех карточек
//         const allCards = form.querySelectorAll('.selectSwiper-card');
//         allCards.forEach(card => card.classList.remove('invalid-field'));
//       });
//     });
//     // === Конец обработчика ===

//     // Динамическая валидация при вводе
//     const allInputs = form.querySelectorAll('input');
//     allInputs.forEach(input => {
//       input.addEventListener('input', function () {
//         // Для полей "Откуда" и "Куда"
//         if (input.name === "from" || input.name === "to") {
//           if (input.value.length > 40) {
//             markAsInvalid(input);
//           } else {
//             markAsValid(input);
//           }
//         }
//         // Для телефона
//         else if (input.name === "phone") {
//           const phone = input.value.replace(/\D/g, '');
//           if (phone.length < 11 && phone.length > 0) {
//             markAsInvalid(input);
//           } else {
//             markAsValid(input);
//           }
//         }
//         // Для имени
//         else if (input.name === "name") {
//           if (input.value.length > 30) {
//             markAsInvalid(input);
//           } else {
//             markAsValid(input);
//           }
//         }
//       });
//     });
//   });

//   function markAsInvalid(input) {
//     input.classList.add('invalid-field');
//   }

//   function markAsValid(input) {
//     input.classList.remove('invalid-field');
//   }
// });


// самая новая валидация
document.addEventListener('DOMContentLoaded', function () {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    // Добавляем обработчик отправки
    form.addEventListener('submit', function (e) {
      let isValid = true;

      // Проверка обязательных полей с бордером
      const nameInputSubmit = form.querySelector('input[name="name"]');
      if (nameInputSubmit) {
        const valid = /^[A-Za-zА-Яа-яЁё'\- ]+$/.test(nameInputSubmit.value) && nameInputSubmit.value.length > 0 && nameInputSubmit.value.indexOf('|') === -1 && nameInputSubmit.value.indexOf('\\') === -1;
        if (!valid) {
          markAsInvalid(nameInputSubmit);
          isValid = false;
        } else {
          markAsValid(nameInputSubmit);
        }
      }

      const fromInputSubmit = form.querySelector('input[name="from"]');
      if (fromInputSubmit) {
        if (!fromInputSubmit.value.trim()) {
          markAsInvalid(fromInputSubmit);
          isValid = false;
        } else {
          markAsValid(fromInputSubmit);
        }
      }

      const toInputSubmit = form.querySelector('input[name="to"]');
      if (toInputSubmit) {
        if (!toInputSubmit.value.trim()) {
          markAsInvalid(toInputSubmit);
          isValid = false;
        } else {
          markAsValid(toInputSubmit);
        }
      }

      const dateInputSubmit = form.querySelector('input[name="date"]');
      if (dateInputSubmit) {
        if (!dateInputSubmit.value.trim()) {
          markAsInvalid(dateInputSubmit);
          isValid = false;
        } else {
          markAsValid(dateInputSubmit);
        }
      }

      const timeInputSubmit = form.querySelector('input[name="time"]');
      if (timeInputSubmit) {
        if (!timeInputSubmit.value.trim()) {
          markAsInvalid(timeInputSubmit);
          isValid = false;
        } else {
          markAsValid(timeInputSubmit);
        }
      }

      // === ВАЛИДАЦИЯ: carType radio ===
      const helpCheckbox = form.querySelector('.options-box__btn-help-input');
      const carTypeRadios = form.querySelectorAll('input[type="radio"][name="carType"]');
      if (helpCheckbox && !helpCheckbox.checked && carTypeRadios.length > 0) {
        let carTypeChecked = false;
        carTypeRadios.forEach(radio => {
          if (radio.checked) carTypeChecked = true;
        });
        if (!carTypeChecked) {
          carTypeRadios.forEach(radio => {
            const card = radio.closest('.selectSwiper-card');
            if (card) card.classList.add('invalid-field');
          });
          isValid = false;
        } else {
          carTypeRadios.forEach(radio => {
            const card = radio.closest('.selectSwiper-card');
            if (card) card.classList.remove('invalid-field');
          });
        }
      } else if (helpCheckbox && helpCheckbox.checked && carTypeRadios.length > 0) {
        carTypeRadios.forEach(radio => {
          const card = radio.closest('.selectSwiper-card');
          if (card) card.classList.remove('invalid-field');
        });
      }
      // === КОНЕЦ ВАЛИДАЦИИ ===

      // Проверка телефона
      const phoneInput = form.querySelector('input[name="phone"]');
      if (phoneInput && phoneInput.value) {
        const phone = phoneInput.value.replace(/\D/g, '');
        if (phone.length < 11) {
          markAsInvalid(phoneInput);
          isValid = false;
        }
      }

      // Проверка длины для специфичных полей
      const addressInputs = form.querySelectorAll('input[name="from"], input[name="to"]');
      addressInputs.forEach(input => {
        if (input.value.length > 128) {
          markAsInvalid(input);
          isValid = false;
        }
      });

      // Проверка имени (до 100 символов)
      const nameInput = form.querySelector('input[name="name"]');
      if (nameInput && nameInput.value.length > 140) {
        markAsInvalid(nameInput);
        isValid = false;
      }

      if (!isValid) e.preventDefault();
    });

    // === Новый обработчик: убираем бордер со всех карточек при выборе radio ===
    const carTypeRadios = form.querySelectorAll('input[type="radio"][name="carType"]');
    carTypeRadios.forEach(radio => {
      radio.addEventListener('change', function () {
        // Убираем бордер со всех карточек
        const allCards = form.querySelectorAll('.selectSwiper-card');
        allCards.forEach(card => card.classList.remove('invalid-field'));
      });
    });
    // === Конец обработчика ===

    // Динамическая валидация при вводе
    const allInputs = form.querySelectorAll('input');
    allInputs.forEach(input => {
      input.addEventListener('input', function () {
        // Для поля "Имя"
        if (input.name === "name") {
          const valid = /^[A-Za-zА-Яа-яЁё'\- ]+$/.test(input.value) && input.value.length > 0 && input.value.indexOf('|') === -1 && input.value.indexOf('\\') === -1;
          if (!valid) {
            markAsInvalid(input);
          } else {
            markAsValid(input);
          }
        }
        // Для поля "Откуда"
        else if (input.name === "from") {
          if (!input.value.trim()) {
            markAsInvalid(input);
          } else {
            markAsValid(input);
          }
        }
        // Для поля "Куда"
        else if (input.name === "to") {
          if (!input.value.trim()) {
            markAsInvalid(input);
          } else {
            markAsValid(input);
          }
        }
        // Для даты
        else if (input.name === "date") {
          if (!input.value.trim()) {
            markAsInvalid(input);
          } else {
            markAsValid(input);
          }
        }
        // Для времени
        else if (input.name === "time") {
          if (!input.value.trim()) {
            markAsInvalid(input);
          } else {
            markAsValid(input);
          }
        }
        // Для телефона
        else if (input.name === "phone") {
          const phone = input.value.replace(/\D/g, '');
          if (phone.length < 11 && phone.length > 0) {
            markAsInvalid(input);
          } else {
            markAsValid(input);
          }
        }
      });
    });
  });

  function markAsInvalid(input) {
    input.classList.add('invalid-field');
  }

  function markAsValid(input) {
    input.classList.remove('invalid-field');
  }
});




// запрещает вводить все кроме бекв
document.querySelectorAll('input[name="name"]').forEach(input => {
  input.addEventListener('input', function () {
    this.value = this.value.replace(/[^A-Za-zА-Яа-яЁё\\s'\- ]/g, '');
  });
});