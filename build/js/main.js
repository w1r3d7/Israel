'use strict';
(function () {
  var popupOpenButton = document.querySelector('.header__information-order');
  var popupBlock = document.querySelector('.popup');
  var popupOrderBlock = popupBlock.querySelector('.popup__wrapper--order');
  var popupCloseButtons = popupBlock.querySelectorAll('.popup__close');
  var popupOrderForm = popupOrderBlock.querySelector('form');
  var popupOrderInputs = popupOrderForm.querySelectorAll('input:not([type="checkbox"])');
  var popupOrderCompliteBlock = popupBlock.querySelector('.popup__wrapper--order-complite');
  var popupCloseCompliteBlock = popupOrderCompliteBlock.querySelector('.popup__button');

  var storage = window.localStorage;

  for (var k = 0; k < popupOrderInputs.length; k++) {
    var inputName = popupOrderInputs[k].name;
    if (storage.getItem(inputName)) {
      popupOrderInputs[k].value = storage[inputName];
    }
  }

  var closePopups = function () {
    popupBlock.classList.add('popup--close');
    popupOrderBlock.classList.add('popup__wrapper--close');
    popupOrderCompliteBlock.classList.add('popup__wrapper--close');
  };

  var onInputChange = function (inputEvent) {
    inputEvent.stopPropagation();
    storage.setItem(inputEvent.target.name, inputEvent.target.value);
  };

  var inputPhoneValidate = function (phoneEvent) {
    phoneEvent.target.value = phoneEvent.target.value.replace(/[^0-9+()-]/g, '');
  };

  for (var j = 0; j < popupOrderInputs.length; j++) {
    popupOrderInputs[j].addEventListener('keyup', onInputChange);
    if (popupOrderInputs[j].type === 'tel') {
      popupOrderInputs[j].addEventListener('input', inputPhoneValidate);
    }
  }

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

  for (var i = 0; i < popupCloseButtons.length; i++) {
    popupCloseButtons[i].addEventListener('click', function () {
      closePopups();
    });
  }

  popupCloseCompliteBlock.addEventListener('click', function () {
    closePopups();
  });

  popupOrderForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    popupOrderBlock.classList.add('popup__wrapper--close');
    popupOrderCompliteBlock.classList.remove('popup__wrapper--close');
  });

})();
