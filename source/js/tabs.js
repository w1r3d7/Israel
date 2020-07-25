'use strict';
(function () {
  var programsBlock = document.querySelector('.programs');
  var programsButtons = programsBlock.querySelectorAll('.programs__item');
  var programsDescriptions = programsBlock.querySelectorAll('.programs__descriptions-item');

  var activeClassProgramsButton = 'programs__item--active';
  var activeClassDescriptionsItem = 'programs__descriptions-item--active';

  var removeClass = function (array, className) {
    array.forEach(function (it) {
      it.classList.remove(className);
    });
  };

  var onClickProgramButton = function (evt) {
    removeClass(programsButtons, activeClassProgramsButton);
    removeClass(programsDescriptions, activeClassDescriptionsItem);
    var index = Array.prototype.slice.call(programsButtons).indexOf(evt.target);
    if (index !== -1) {
      evt.target.classList.add(activeClassProgramsButton);
      programsDescriptions[index].classList.add(activeClassDescriptionsItem);
    }
  };

  programsButtons.forEach(function (it) {
    it.addEventListener('click', onClickProgramButton);
  });
})();
