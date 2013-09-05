// reset js - minor DOM manipulation

$(function () {


 // // scroll on hover 
 // $('.cc-area, .homepage .content, #nav1, .homepage .content > div').hover(function() {
 //    $(this).addClass('scrollMe');} , function() {$(this).removeClass('scrollMe');}
 //    );

    // $('*').removeAttr('style');

    $('#ctl00_mainContent_currentResource *').removeAttr('style');
    // move slideshow to banner region 
    $('.content-1').appendTo('.banner');


});




