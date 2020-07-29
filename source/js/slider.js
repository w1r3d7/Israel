(function() {

  'use strict';

  // breakpoint where swiper will be destroyed
  // and switches to a dual-column layout
  var breakpoint = window.matchMedia( '(min-width:767px)' );

  // keep track of swiper instances to destroy later
  var mySwiper;

  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  var breakpointChecker = function() {

    // if larger viewport and multi-row layout needed
    if( breakpoint.matches === true ) {

      // clean up old instances and inline styles when available
      if(mySwiper !== undefined) mySwiper.destroy( true, true );

      // or/and do nothing
      return;

      // else if a small viewport and single column layout needed
    } else if ( breakpoint.matches === false ) {

      // fire small viewport version of swiper
      return enableSwiper();

    }

  };

  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  var enableSwiper = function() {
      mySwiper = new Swiper('.swiper-container', {
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      }
    });
    // mySwiper = new Swiper ('.swiper-container', {
    //
    //   loop: true,
    //
    //   slidesPerView: 'auto',
    //
    //   centeredSlides: true,
    //
    //   a11y: true,
    //   keyboardControl: true,
    //   grabCursor: true,
    //
    //   // pagination
    //   pagination: '.swiper-pagination',
    //   paginationClickable: true,
    //
    // });

  };

  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  // keep an eye on viewport size changes
  breakpoint.addListener(breakpointChecker);

  // kickstart
  breakpointChecker();



})(); /* IIFE end */
