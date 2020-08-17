'use strict';
(function () {
  var phoneInputs = document.querySelectorAll('input[type="tel"]');
  var COUNTRY_CODE = '+7';
  var onInputPhoneInput = ({target}) => {
    var matrix = `${COUNTRY_CODE} (___) ___ __ __`;
    var def = matrix.replace(/\D/g, '');
    var i = 0;
    var val = target.value.replace(/\D/g, '');
    if (def.length >= val.length) {
      val = def;
    }
    target.value = matrix.replace(/./g, (a) => {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });
  };
  var onFocusPhoneInput = ({target}) => {
    if (!target.value) {
      target.value = COUNTRY_CODE;
      target.addEventListener('input', onInputPhoneInput);
      target.addEventListener('blur', onBlurPhoneInput);
    }
  };
  var onBlurPhoneInput = ({target}) => {
    if (target.value === COUNTRY_CODE) {
      target.value = '';
      target.removeEventListener('input', onInputPhoneInput);
      target.removeEventListener('blur', onBlurPhoneInput);
    }
  };
  var initPhoneMask = () => {
    if (phoneInputs.length) {
      phoneInputs.forEach((input) => {
        input.addEventListener('focus', onFocusPhoneInput);
      });
    }
  };

  initPhoneMask();
})();
