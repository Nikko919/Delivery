// выподающее меню 

// выпадающие пункты меню
document.querySelectorAll('.dropdown-header').forEach(header => {
  header.addEventListener('click', () => {
    const dropdown = header.parentElement;
    const isActive = dropdown.classList.contains('active');

    // Закрываем все открытые аккордеоны (опционально)
    document.querySelectorAll('.dropdown').forEach(item => {
      item.classList.remove('active');
    });

    // Открываем текущий, если он был закрыт
    if (!isActive) {
      dropdown.classList.add('active');
    }
  });
});


// открытие выпадающего меню 


document.addEventListener('DOMContentLoaded', function () {
  const openBtn = document.querySelector('.btn-option__open');
  const popup = document.querySelector('.popup-option');
  const closeBtn = document.querySelector('.popup-option__close-btn');
  const saveBtn = document.querySelector('.popup-option__save-btn');

  function openPopup() {
    popup.style.display = 'block';
    // Запускаем анимацию в следующем кадре
    requestAnimationFrame(() => {
      popup.classList.add('active');
    });
  }

  function closePopup() {
    popup.classList.remove('active');
    // Ждем завершения анимации перед скрытием
    setTimeout(() => {
      popup.style.display = 'none';
    }, 300);
  }

  // Инициализация
  popup.style.display = 'none';

  // Обработчики событий
  if (openBtn) {
    openBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (popup.classList.contains('active')) {
        closePopup();
      } else {
        openPopup();
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closePopup);
  if (saveBtn) saveBtn.addEventListener('click', closePopup);

  // Закрытие при клике вне popup
  document.addEventListener('click', function (e) {
    if (popup.classList.contains('active') &&
      !popup.contains(e.target) &&
      e.target !== openBtn) {
      closePopup();
    }
  });

  // Предотвращаем закрытие при клике внутри popup
  popup.addEventListener('click', function (e) {
    e.stopPropagation();
  });
});