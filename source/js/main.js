const openPopupButton = document.querySelector('.header__information-order');
const popup = document.querySelector('.popup');
const closePopupButtons = popup.querySelectorAll('.popup__close');

const orderPopup = popup.querySelector('.popup__wrapper--order');
const orderPopupInputs = orderPopup.querySelectorAll('input:not([type=checkbox])');
const orderPopupCheckbox = orderPopup.querySelector('input[type=checkbox]');
const orderPopupForm = orderPopup.querySelector('form');

const orderComplitePopup = popup.querySelector('.popup__wrapper--order-complite');
const orderComplitePopupButton = orderComplitePopup.querySelector('button:not(.popup__close)');

const body = document.querySelector('body');

const storage = window.localStorage;

const inputPhoneValidate = (phoneEvent) => {
  phoneEvent.target.value = phoneEvent.target.value.replace(/[^0-9+()-]/g, '');
};

const checkInputValidity = (input) => {
  const inputParent = input.parentElement;
  if (!input.value) {
    inputParent.classList.add('popup__input-wrapper--invalid');
    inputParent.classList.remove('popup__input-wrapper--valid');
  } else {
    inputParent.classList.remove('popup__input-wrapper--invalid');
    inputParent.classList.add('popup__input-wrapper--valid')
  }
}

const checkCheckboxValidity = (checkbox) => {
  const checkboxParent = checkbox.parentElement;

  if (checkbox.checked) {
    checkboxParent.classList.add('popup__form-agreement-wrapper--valid');
    checkboxParent.classList.remove('popup__form-agreement-wrapper--invalid');
  } else {
    checkboxParent.classList.remove('popup__form-agreement-wrapper--valid');
    checkboxParent.classList.add('popup__form-agreement-wrapper--invalid');
  }
}

orderPopupCheckbox.addEventListener('change', (evt) => {
  checkCheckboxValidity(evt.target);
});

orderPopupInputs.forEach((it) => {
  it.value = storage.getItem(it.name);

  it.addEventListener('keyup', (evt) => {
    evt.stopPropagation();
    storage.setItem(evt.target.name, evt.target.value);
    if (evt.target.type === 'tel') {
      inputPhoneValidate(evt);
    }
  });

  it.addEventListener('input', (evt) => {
    checkInputValidity(evt.target);
  });
});

const onEscapePress = (evt) => {
  if (evt.key === 'Escape') {
    closeAllPopups();
    document.removeEventListener('keydown', onEscapePress);
  }
}

const openPopup = () => {
  popup.classList.remove('popup--close');
  orderPopup.classList.remove('popup__wrapper--close');
  body.classList.add('scroll-lock');
  document.addEventListener('keydown', onEscapePress);
}

const openComplitePopup = () => {
  orderPopup.classList.add('popup__wrapper--close');
  orderComplitePopup.classList.remove('popup__wrapper--close');
}

const closeAllPopups = () => {
  popup.classList.add('popup--close');
  orderPopup.classList.add('popup__wrapper--close');
  orderComplitePopup.classList.add('popup__wrapper--close');
  body.classList.remove('scroll-lock');
  document.removeEventListener('keydown', onEscapePress);
}

openPopupButton.addEventListener('click', () => {
  openPopup();
})

closePopupButtons.forEach((it) => {
  it.addEventListener('click', () => {
    closeAllPopups();
  });
});

orderPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  orderPopupInputs.forEach(checkInputValidity);
  checkCheckboxValidity(orderPopupCheckbox);

  const inputWrappers = orderPopupForm.querySelectorAll('.popup__input-wrapper');
  const isValidInputs = !Array.from(inputWrappers).some((it) => {
    return it.classList.contains('popup__input-wrapper--invalid');
  })

  if (isValidInputs && orderPopupCheckbox.checked) {
    openComplitePopup();
  }
})

orderComplitePopupButton.addEventListener('click', () => {
  closeAllPopups();
})

orderPopup.addEventListener('click', (evt) => {
  evt.stopPropagation();
})

orderComplitePopup.addEventListener('click', (evt) => {
  evt.stopPropagation();
})

popup.addEventListener('click', () => {
  closeAllPopups();
})
