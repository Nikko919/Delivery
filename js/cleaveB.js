document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.mask-input').forEach(function (input) {
    new Cleave('.mask-input', {
      prefix: '+7',          // Фиксированный префикс
      noImmediatePrefix: true, // Не показывать +7 до ввода
      blocks: [2, 3, 3, 2, 2], // Разбиение: +7 (123) 456-78-90
      delimiters: [' (', ') ', '-', '-'], // Разделители
      numericOnly: true,     // Только цифры (кроме префикса)
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.mask-input-two').forEach(function (input) {
    new Cleave('.mask-input-two', {
      prefix: '+7',          // Фиксированный префикс
      noImmediatePrefix: true, // Не показывать +7 до ввода
      blocks: [2, 3, 3, 2, 2], // Разбиение: +7 (123) 456-78-90
      delimiters: [' (', ') ', '-', '-'], // Разделители
      numericOnly: true,     // Только цифры (кроме префикса)
    });
  });
});