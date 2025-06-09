// это код рабочий только тут нет отмены выбора если нажали нцжна помощь 

// document.addEventListener('DOMContentLoaded', function () {
//   const helpCheckbox = document.getElementById('help-checkbox');
//   const radioButtons = document.querySelectorAll('input[name="carType"]');
//   const radioBlocks = document.querySelectorAll('.selectSwiper-card'); // Предполагается, что у вас есть этот класс

//   helpCheckbox.addEventListener('change', function () {
//     radioButtons.forEach(function (radio, index) {
//       radio.disabled = helpCheckbox.checked; // Отключаем радио-кнопки, если чекбокс активен
//       if (helpCheckbox.checked) {
//         radioBlocks[index].classList.add('noactive'); // Добавляем класс для полупрозрачности
//       } else {
//         radioBlocks[index].classList.remove('noactive'); // Убираем класс, если чекбокс не активен
//       }
//     });
//   });

//   radioButtons.forEach(function (radio, index) {
//     radio.addEventListener('click', function () {
//       if (!helpCheckbox.checked) {
//         radioBlocks.forEach(block => block.classList.remove('selected')); // Убираем класс selected у всех
//         radioBlocks[index].classList.add('selected'); // Добавляем класс selected к текущему блоку
//       }
//     });
//   });
// });

// в этом коде отмена выбора если нажали нужна помощь
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.options-box__btn-help-input').forEach(function (helpCheckbox) {
    // ищем форму, в которой находится чекбокс
    const form = helpCheckbox.closest('form');
    if (!form) return;
    const radioButtons = form.querySelectorAll('input[name="carType"]');
    const radioBlocks = form.querySelectorAll('.selectSwiper-card');

    helpCheckbox.addEventListener('change', function () {
      radioButtons.forEach(function (radio, index) {
        radio.disabled = helpCheckbox.checked; // Отключаем радио-кнопки, если чекбокс активен
        if (helpCheckbox.checked) {
          radioBlocks[index]?.classList.add('noactive'); // Добавляем класс для полупрозрачности
          if (radio.checked) {
            radio.checked = false; // Отменяем выбор, если чекбокс активен
            radioBlocks[index]?.classList.remove('selected'); // Убираем класс selected
          }
        } else {
          radioBlocks[index]?.classList.remove('noactive'); // Убираем класс, если чекбокс не активен
        }
      });
    });

    radioButtons.forEach(function (radio, index) {
      radio.addEventListener('click', function () {
        if (!helpCheckbox.checked) {
          radioBlocks.forEach(block => block.classList.remove('selected'));
          radioBlocks[index]?.classList.add('selected');
        }
      });
    });
  });
});