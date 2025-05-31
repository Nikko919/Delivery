

document.addEventListener('DOMContentLoaded', function () {
    const openPopupButtons = document.querySelectorAll('.open-popup');

    openPopupButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPopupId = button.getAttribute('data-target');
            const popupBg = document.getElementById(`popupBg${targetPopupId.slice(-1)}`);
            const popup = document.getElementById(targetPopupId);
            const closePopupButton = popup.querySelector('.close-popup');

            popupBg.classList.add('active');
            popup.classList.add('active');

            closePopupButton.addEventListener('click', () => {
                popupBg.classList.remove('active');
                popup.classList.remove('active');
            });

            popupBg.addEventListener('click', (e) => {
                if (e.target === popupBg) {
                    popupBg.classList.remove('active');
                    popup.classList.remove('active');
                }
            });
        });
    });
});


