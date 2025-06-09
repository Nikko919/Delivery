document.addEventListener("DOMContentLoaded", function () {
  flatpickr(".date", {
    dateFormat: "d.m.Y",
    minDate: "today",
    disableMobile: true,
    locale: "ru",
    onChange: function () {
      // Скрываем плейсхолдер при выборе даты
      document.querySelector(".fake-placeholder").style.display = "none";
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  flatpickr(".time", {
    enableTime: true,
    noCalendar: true,
    time_24hr: true,
    disableMobile: false,
    minTime: "09:00",
    maxTime: "21:00",
    locale: "ru",
    onChange: function () {
      // Скрываем плейсхолдер при выборе даты
      document.querySelector(".fake-placeholder__time").style.display = "none";
    }
  });
});
