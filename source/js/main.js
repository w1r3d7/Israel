'use strict';
(function () {
  var popupOpenButton = document.querySelector('.header__information-order');
  var popupBlock = document.querySelector('.popup');
  var popupOrderBlock = popupBlock.querySelector('.popup__wrapper--order');
  var popupCloseButtons = popupBlock.querySelectorAll('.popup__close');
  var popupOrderForm = popupOrderBlock.querySelector('form');
  var popupOrderInputs = popupOrderForm.querySelectorAll('input');
  var popupOrderCompliteBlock = popupBlock.querySelector('.popup__wrapper--order-complite');
  var popupCloseCompliteBlock = popupOrderCompliteBlock.querySelector('.popup__button');

  var closePopups = function () {
    popupBlock.classList.add('popup--close');
    popupOrderBlock.classList.add('popup__wrapper--close');
    popupOrderCompliteBlock.classList.add('popup__wrapper--close');
  };

  popupOrderInputs.forEach(function (it) {
    it.addEventListener('keydown', function (evt) {
      evt.stopPropagation();
    });
  });

  var onEscapePress = function (evt) {
    if (evt.key === 'Escape') {
      closePopups();
      document.removeEventListener('keydown', onEscapePress);
    }
  };

  popupOpenButton.addEventListener('click', function () {
    popupBlock.classList.remove('popup--close');
    popupOrderBlock.classList.remove('popup__wrapper--close');

    document.addEventListener('keydown', onEscapePress);
  });

  popupCloseButtons.forEach(function (it) {
    it.addEventListener('click', function () {
      closePopups();
    });
  });

  popupCloseCompliteBlock.addEventListener('click', function () {
    closePopups();
  });

  popupOrderForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    popupOrderBlock.classList.add('popup__wrapper--close');
    popupOrderCompliteBlock.classList.remove('popup__wrapper--close');
  });

})();
