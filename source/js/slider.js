'use strict';
(function () {
  var breakpoint = window.matchMedia('(min-width:767px)');
  var mySwiper;
  var breakpointChecker = function () {
    if (breakpoint.matches === true) {
      if (mySwiper !== undefined) mySwiper.destroy(true, true);
      return;
    } else if (breakpoint.matches === false) {
      return enableSwiper();
    }
  };

  var enableSwiper = function() {
      mySwiper = new Swiper('.swiper-container', {
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      }
    });
  };
  breakpoint.addListener(breakpointChecker);
  breakpointChecker();


})();

(function () {
  var swiper = new Swiper('.swiper-reviews-container', {
    pagination: {
      el: '.swiper-reviews-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-reviews-button-next',
      prevEl: '.swiper-reviews-button-prev',
    },
  });
})();
