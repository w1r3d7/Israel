'use strict';
(function () {
  var questionsList = document.querySelector('.questions__list');
  var questionsButtons = questionsList.querySelectorAll('button');

  var onClickQuestionButton = function (evt) {
    var parentElement = evt.target.parentElement.parentElement;
    var activeClass = 'questions__item--active';

    if (parentElement.classList.contains(activeClass)) {
      parentElement.classList.remove(activeClass);
    } else {
      parentElement.classList.add(activeClass);
    }
  };

  questionsButtons.forEach(function (it) {
    it.addEventListener('click', onClickQuestionButton);
  });
})();
