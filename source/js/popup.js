'use strict';
(function () {
  var openPopupButton = document.querySelector('.header__information-order');
  var popup = document.querySelector('.popup');
  var closePopupButtons = popup.querySelectorAll('.popup__close');
  var orderPopup = popup.querySelector('.popup__wrapper--order');
  var orderPopupInputs = orderPopup.querySelectorAll('input:not([type=checkbox])');
  var orderPopupCheckbox = orderPopup.querySelector('input[type=checkbox]');
  var orderPopupForm = orderPopup.querySelector('form');
  var orderPopupInputName = popup.querySelector('input[name=name]');
  var orderComplitePopup = popup.querySelector('.popup__wrapper--order-complite');
  var orderComplitePopupButton = orderComplitePopup.querySelector('button:not(.popup__close)');
  var body = document.querySelector('body');
  var storage = window.localStorage;

  var PHONE_CHARS = '18';

  var checkInputValidity = function (input) {
    var inputClass = input.parentElement.classList[0];
    var inputParent = input.parentElement;

    if (!inputClass) {
      return;
    }

    if (input.type === 'tel') {
      if (String(input.value.length) === PHONE_CHARS) {
        inputParent.classList.remove(inputClass + '--invalid');
        inputParent.classList.add(inputClass + '--valid');
      } else {
        inputParent.classList.add(inputClass + '--invalid');
        inputParent.classList.remove(inputClass + '--valid');
      }
    } else {
      if (input.value.length) {
        inputParent.classList.remove(inputClass + '--invalid');
        inputParent.classList.add(inputClass + '--valid');
      } else {
        inputParent.classList.add(inputClass + '--invalid');
        inputParent.classList.remove(inputClass + '--valid');
      }
    }
  };

  var checkCheckboxValidity = function (checkbox) {
    var checkboxClass = checkbox.parentElement.classList[0];
    var checkboxParent = checkbox.parentElement;

    if (checkbox.checked) {
      checkboxParent.classList.add(checkboxClass + '--valid');
      checkboxParent.classList.remove(checkboxClass + '--invalid');
    } else {
      checkboxParent.classList.remove(checkboxClass + '--valid');
      checkboxParent.classList.add(checkboxClass + '--invalid');
    }
  };

  if (orderPopupCheckbox) {
    orderPopupCheckbox.addEventListener('change', function (evt) {
      checkCheckboxValidity(evt.target);
    });
  }

  if (orderPopupInputs) {
    orderPopupInputs.forEach(function (it) {
      it.value = storage.getItem(it.name);
      it.addEventListener('input', function (evt) {
        evt.stopPropagation();
        storage.setItem(evt.target.name, evt.target.value);
      });
      it.addEventListener('input', function (evt) {
        checkInputValidity(evt.target);
      });
    });
  }

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
    orderPopupInputName.focus();
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

  if (openPopupButton) {
    openPopupButton.addEventListener('click', function () {
      openPopup();
    });
  }

  if (closePopupButtons) {
    closePopupButtons.forEach(function (it) {
      it.addEventListener('click', function () {
        closeAllPopups();
      });
    });
  }

  if (orderPopupForm) {
    orderPopupForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      orderPopupInputs.forEach(checkInputValidity);
      checkCheckboxValidity(orderPopupCheckbox);
      var inputWrappers = orderPopupForm.querySelectorAll('.popup__input-wrapper');
      var isValidInputs = !Array.prototype.slice.call(inputWrappers).some(function (it) {
        return it.classList.contains('popup__input-wrapper--invalid');
      });

      if (isValidInputs && orderPopupCheckbox.checked) {
        openComplitePopup();
      }
    });
  }

  if (orderComplitePopupButton) {
    orderComplitePopupButton.addEventListener('click', function () {
      closeAllPopups();
    });
  }

  if (orderPopup) {
    orderPopup.addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  }

  if (orderComplitePopup) {
    orderComplitePopup.addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  }

  if (popup) {
    var isClicked = false;

    popup.addEventListener('mousedown', function (evt) {
      if (evt.currentTarget === evt.target) {
        isClicked = true;
      }
    });

    popup.addEventListener('click', function () {
      if (isClicked) {
        closeAllPopups();
      }
      isClicked = false;
    });
  }

  var openComplitePopupAlone = function () {
    popup.classList.remove('popup--close');
    body.classList.add('scroll-lock');
    document.addEventListener('keydown', onEscapePress);
    orderComplitePopup.classList.remove('popup__wrapper--close');
  };

  var wantToGoForm = document.querySelector('.want-to-go form');
  var wantToGoInput = wantToGoForm.querySelector('input');
  var WANT_TO_GO_VALID_INPUT = 'want-to-go__input-wrapper--valid';

  if (wantToGoForm) {
    wantToGoInput.addEventListener('input', function (evt) {
      checkInputValidity(evt.target);
    });

    wantToGoForm.addEventListener('submit', function (evt) {
      evt.preventDefault();

      var isInputValid = wantToGoInput.parentElement.classList.contains(WANT_TO_GO_VALID_INPUT);

      if (isInputValid) {
        openComplitePopupAlone();
        wantToGoForm.reset();
        wantToGoInput.parentElement.classList.remove(WANT_TO_GO_VALID_INPUT);
      } else {
        checkInputValidity(wantToGoInput);
      }
    });
  }

  var detailsForm = document.querySelector('.details__form').querySelector('form');
  var detailsFormInputs = detailsForm.querySelectorAll('input');

  var DETAILS_VALID_INPUT = 'details__form-input-wrapper--valid';


  if (detailsForm) {
    detailsFormInputs[0].addEventListener('input', function (evt) {
      checkInputValidity(evt.target);
    });

    detailsFormInputs[1].addEventListener('input', function (evt) {
      checkInputValidity(evt.target);
    });

    detailsForm.addEventListener('submit', function (evt) {
      evt.preventDefault();

      var isInputValid = detailsFormInputs[0].parentElement.classList.contains(DETAILS_VALID_INPUT) && detailsFormInputs[1].parentElement.classList.contains(DETAILS_VALID_INPUT);

      if (isInputValid) {
        openComplitePopupAlone();
        detailsForm.reset();
        detailsFormInputs.forEach(function (it) {
          it.parentElement.classList.remove(DETAILS_VALID_INPUT);
        });
      } else {
        checkInputValidity(detailsFormInputs[0]);
        checkInputValidity(detailsFormInputs[1]);
      }
    });
  }
})();
