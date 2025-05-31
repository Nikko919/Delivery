// const accordionBtn = document.querySelectorAll('.accordion__title-btn');

// accordionBtn.forEach((header) => {
//   header.addEventListener('click', () => {
//     const accordionItem = header.parentElement;
//     const accordionContent = accordionItem.querySelector('.accordion__content');
//     const isActive = accordionContent.classList.contains('active');


//     // Данная функция отвечает за то чтоб открытые пункты закрывались когда открвается следцющий
//     // document.querySelectorAll('.accordion__content').forEach((content) => {
//     //   if (content !== accordionContent) {
//     //     content.classList.remove('active')
//     //     // content.style.maxHeight = '0';
//     //   }
//     // })

//     if (!isActive) {
//       accordionContent.classList.add('active');
//       // accordionContent.style.maxHeight = '0';
//       // setTimeout(() => {
//       //   accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';

//       // }, 100)
//     } else {
//       accordionContent.classList.remove('active')
//     }
//   })



// })



// 333



// const accordionBtn = document.querySelectorAll('.accordion__title-btn');

// accordionBtn.forEach((header) => {
//   header.addEventListener('click', () => {
//     const accordionItem = header.parentElement;
//     const accordionContent = accordionItem.querySelector('.accordion__content');
//     const isActive = accordionContent.classList.contains('active');

//     // Закрытие других аккордеонов
//     // document.querySelectorAll('.accordion__content').forEach((content) => {
//     //   if (content !== accordionContent) {
//     //     content.classList.remove('active');
//     //     content.style.maxHeight = '0'; // Скрытие
//     //   }
//     // });

//     if (!isActive) {
//       accordionContent.classList.add('active'); // Плавное появление
//       // Устанавливаем max-height с использованием requestAnimationFrame
//       requestAnimationFrame(() => {
//         accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'; // Плавное появление
//       });
//     } else {
//       accordionContent.classList.remove('active'); // Плавное скрытие
//       accordionContent.style.maxHeight = '0'; // Плавное скрытие
//     }
//   });
// });




// готовый код 
const accordionBtn = document.querySelectorAll('.accordion__title-btn');

accordionBtn.forEach((header) => {
  header.addEventListener('click', () => {
    const accordionItem = header.parentElement;
    const accordionContent = accordionItem.querySelector('.accordion__content');
    const isActive = accordionContent.classList.contains('active');

    // Закрытие других аккордеонов
    document.querySelectorAll('.accordion__content').forEach((content) => {
      if (content !== accordionContent) {
        // content.classList.remove('active');
        // content.style.maxHeight = '0'; // Скрытие
        // content.previousElementSibling.classList.remove('active'); // Удаляем класс active у кнопки
        // Удаляем класс active у SVG
        const svg = content.previousElementSibling.querySelector('svg');
        if (svg) {
          svg.classList.remove('active');
        }
      }
    });

    if (!isActive) {
      accordionContent.classList.add('active'); // Плавное появление
      header.classList.add('active'); // Добавляем класс active к кнопке
      requestAnimationFrame(() => {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'; // Плавное появление
      });

      // Добавляем класс active к SVG
      const svg = header.querySelector('svg');
      if (svg) {
        svg.classList.add('active');
      }
    } else {
      accordionContent.classList.remove('active'); // Плавное скрытие
      header.classList.remove('active'); // Удаляем класс active у кнопки
      accordionContent.style.maxHeight = '0'; // Плавное скрытие


    }
  });
});