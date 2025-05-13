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