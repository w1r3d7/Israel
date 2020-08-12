'use strict';
(function () {
  var questionsList = document.querySelector('.questions__list');
  var questionsLinks = questionsList.querySelectorAll('.questions__item-wrapper');

  var onClickQuestionButton = function (evt) {
    var parentElement = evt.currentTarget.parentElement;
    var activeClass = 'questions__item--active';

    if (parentElement.classList.contains(activeClass)) {
      parentElement.classList.remove(activeClass);
    } else {
      parentElement.classList.add(activeClass);
    }
  };

  questionsLinks.forEach(function (it) {
    it.addEventListener('click', onClickQuestionButton);
  });
})();
