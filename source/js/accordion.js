'use strict';
(function () {
  var questionsList = document.querySelector('.questions__list');
  var questionsButtons = questionsList.querySelectorAll('.questions__item-wrapper');

  var onClickQuestionButton = function (evt) {
    var parentElement = evt.currentTarget.parentElement;
    var activeClass = 'questions__item--active';

    if (parentElement.classList.contains(activeClass)) {
      parentElement.classList.remove(activeClass);
    } else {
      parentElement.classList.add(activeClass);
    }
  };

  if (questionsButtons) {
    questionsButtons.forEach(function (it) {
      it.addEventListener('click', function (evt) {
        evt.preventDefault();
        onClickQuestionButton(evt);
      });
    });
  }
})();
