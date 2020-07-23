"use strict";

var openPopupButton = document.querySelector('.header__information-order');
var popup = document.querySelector('.popup');
var closePopupButtons = popup.querySelectorAll('.popup__close');
var orderPopup = popup.querySelector('.popup__wrapper--order');
var orderPopupInputs = orderPopup.querySelectorAll('input:not([type=checkbox])');
var orderPopupCheckbox = orderPopup.querySelector('input[type=checkbox]');
var orderPopupForm = orderPopup.querySelector('form');
var orderComplitePopup = popup.querySelector('.popup__wrapper--order-complite');
var orderComplitePopupButton = orderComplitePopup.querySelector('button:not(.popup__close)');
var body = document.querySelector('body');
var storage = window.localStorage;

var inputPhoneValidate = function inputPhoneValidate(phoneEvent) {
  phoneEvent.target.value = phoneEvent.target.value.replace(/[^0-9+()-]/g, '');
};

var checkInputValidity = function checkInputValidity(input) {
  var inputParent = input.parentElement;

  if (!input.value) {
    inputParent.classList.add('popup__input-wrapper--invalid');
    inputParent.classList.remove('popup__input-wrapper--valid');
  } else {
    inputParent.classList.remove('popup__input-wrapper--invalid');
    inputParent.classList.add('popup__input-wrapper--valid');
  }
};

var checkCheckboxValidity = function checkCheckboxValidity(checkbox) {
  var checkboxParent = checkbox.parentElement;

  if (checkbox.checked) {
    checkboxParent.classList.add('popup__form-agreement-wrapper--valid');
    checkboxParent.classList.remove('popup__form-agreement-wrapper--invalid');
  } else {
    checkboxParent.classList.remove('popup__form-agreement-wrapper--valid');
    checkboxParent.classList.add('popup__form-agreement-wrapper--invalid');
  }
};

orderPopupCheckbox.addEventListener('change', function (evt) {
  checkCheckboxValidity(evt.target);
});
orderPopupInputs.forEach(function (it) {
  it.value = storage.getItem(it.name);
  it.addEventListener('keyup', function (evt) {
    evt.stopPropagation();
    storage.setItem(evt.target.name, evt.target.value);

    if (evt.target.type === 'tel') {
      inputPhoneValidate(evt);
    }
  });
  it.addEventListener('input', function (evt) {
    checkInputValidity(evt.target);
  });
});

var onEscapePress = function onEscapePress(evt) {
  if (evt.key === 'Escape') {
    closeAllPopups();
    document.removeEventListener('keydown', onEscapePress);
  }
};

var openPopup = function openPopup() {
  popup.classList.remove('popup--close');
  orderPopup.classList.remove('popup__wrapper--close');
  body.classList.add('scroll-lock');
  document.addEventListener('keydown', onEscapePress);
};

var openComplitePopup = function openComplitePopup() {
  orderPopup.classList.add('popup__wrapper--close');
  orderComplitePopup.classList.remove('popup__wrapper--close');
};

var closeAllPopups = function closeAllPopups() {
  popup.classList.add('popup--close');
  orderPopup.classList.add('popup__wrapper--close');
  orderComplitePopup.classList.add('popup__wrapper--close');
  body.classList.remove('scroll-lock');
  document.removeEventListener('keydown', onEscapePress);
};

openPopupButton.addEventListener('click', function () {
  openPopup();
});
closePopupButtons.forEach(function (it) {
  it.addEventListener('click', function () {
    closeAllPopups();
  });
});
orderPopupForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  orderPopupInputs.forEach(checkInputValidity);
  checkCheckboxValidity(orderPopupCheckbox);
  var inputWrappers = orderPopupForm.querySelectorAll('.popup__input-wrapper');
  var isValidInputs = !Array.from(inputWrappers).some(function (it) {
    return it.classList.contains('popup__input-wrapper--invalid');
  });

  if (isValidInputs && orderPopupCheckbox.checked) {
    openComplitePopup();
  }
});
orderComplitePopupButton.addEventListener('click', function () {
  closeAllPopups();
});
orderPopup.addEventListener('click', function (evt) {
  evt.stopPropagation();
});
orderComplitePopup.addEventListener('click', function (evt) {
  evt.stopPropagation();
});
popup.addEventListener('click', function () {
  closeAllPopups();
});