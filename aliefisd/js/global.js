    
$(function () {


	// var $slideshowItem = $('.content-5 .announcementItem');
	var $banner = $('.banner');

 // scroll on hover 
 $('.cc-area, .homepage .content, #nav1, .homepage .content > div').hover(function() {
    $(this).addClass('scrollMe');} , function() {$(this).removeClass('scrollMe');
});

// if this is the home page put a class on the form tag 
$('form[action="/home"]').addClass('homepage');
$('form[action="home.aspx"]').addClass('homepage');
$('form[action=""]').addClass('homepage');

 // move new nav to navRpt
 $('#container').prependTo('.navRpt');

 // remove all old styles (link tag with css.axd)
 var str = $('link').attr('href');
 if (str.toLowerCase().indexOf("css.axd") >= 0) {
 	$('head link[href="'+str+'"]').remove();
 }
$('link[href*="css.axd"]').remove();
 
 $('link#ctl00_eChalkBase').remove();

 $('.msButton').removeClass('msButton');

// remove the component art nav menu styles
$('.navHoriz > style').remove();
$('.navVert > style').remove();
$('#ctl00_navigationZone style, #layoutClient_navigationZone style').remove();

// replace utility nav content to make text links shorter
$('#ctl00_ctl01_schoolHomePlaceholder a, #ctl00_ctl02_schoolHomePlaceholder a').html('School');  
$('#ctl00_ctl01_districtHomePlaceholder a, #ctl00_ctl02_districtHomePlaceholder a').html('District');
$('#ctl00_ctl01_loginPlaceholder a, #ctl00_ctl02_loginPlaceholder a').html('Login');
$('#ctl00_ctl01_helpPlaceholder a, #ctl00_ctl02_helpPlaceholder a').html('Help'); 
$('#ctl00_ctl01_searchPlaceholder a, #ctl00_ctl01_searchPlaceholder a').html('Search');


// remove clear-both from upcomingEvent
$('.upcomingEvent .clear-both').remove();


// // replace cal view input type image src
$('.calViewBtn').attr('src', 'http://pdms.echalk.net/www/echalkpd_ms/site/hosting/design1/images/calViewBtn.png');
$('#ctl00_mainContent_searchLink, #ctl00_mainContent_listView_searchLink').next().addClass('calExport');




// slideshow 

// place slideshow announcements in content-5 area 
var $slide = $('.content-5 .announcementItem');
// append items to slideshow
$slide.appendTo($('#s1'));
$slide.wrapInner('<div class=\"announcementContent\" />');


// wrap announcment content and pull image (if exists) out content and prepend to the announcement item and place it back into the announcment container
$('.announcementContent').each(function() {
  $this = $(this);
  $this.find('img').prependTo($this.parent());
});

// more announcementItem 
$('.announcementItem img, .announcementItem span').removeAttr('style');
$('.announcementItem br').remove();

// USER profile 
$('.userInfoMid').wrapInner('<div class=\"profile-info\" />');
$('.profile-info').prependTo('.content');
$('.userInfoImage img').addClass('profile-image').prependTo('.content');

	// if profile page, hide pagetitlecontainer 
if ($('.profile-info').length) {
  $('.pageTitleContainer').remove();
}

 // // mobile utility nav (incomplete)
 // if ($(window).width() < 600) {
 //  $('body').append('<div class="btn-menu" />');        

 //  $('.btn-menu').click(function() {
 //      $('.utilityNav').toggle();
 //  });
 //  $('.utilityNav li').click(function() {
 //      $('.utilityNav').toggle();
 //  });


// help the subpages become responsive
if($(window).width()<600) {

$('.listViewSideBar > div, .listViewList > div, .eventViewTable td > div').appendTo('.content');

$('.GrayItlTxt').insertAfter('#ctl00_mainContent_calendarEvent_infoPanel');

// remove table layout for mobile 
var $profilePanel = $('#ctl00_mainContent_ucClassProfile_profilePanel, #ctl00_mainContent_ucGroupProfile_profilePanel');

// table references the table DOM element
var table = $('.siteListTable, .userProfileTable, #ctl00_mainContent_ucClassProfile_profilePanel table');
var tdcontent = $('.siteListTable td, .userProfileLeftCol, .userProfileRightCol, #ctl00_mainContent_ucClassProfile_profilePanel table td');
// alert(tdcontent);
tdcontent.each(function() {
  var keep = $(this).children('div');
  keep.appendTo(table.parent());
});


// console.log($(window).width());

  $('#ctl00_mainContent_ucClassProfile_announcePanel, #ctl00_mainContent_ucClassProfile_resourcesPanel, #ctl00_mainContent_ucClassProfile_workeventsPanel, #ctl00_mainContent_ucClassProfile_taughtByPanel, #ctl00_mainContent_ucGroupProfile_announcePanel, #ctl00_mainContent_ucGroupProfile_schedulePanel, #ctl00_mainContent_ucGroupProfile_resourcesPanel, #ctl00_mainContent_ucGroupProfile_workeventsPanel, #ctl00_mainContent_ucGroupProfile_ContactsPanel').appendTo($profilePanel.parent());

    $('.userProfileCallOuts').appendTo(table.parent());

    // wrap profile image in a div and try to crop it better for mobile
    var $profileImg = $('.profile-image');
    $profileImg.wrap('<div class="pro-image"/>');
    // var $profileImgHeight = $profileImg.height();
    // console.log(-($profileImg.height()));
    // $profileImg.css({
    //   'position':'relative',
    //   'top':-($profileImg.height())
    // })
}

//     // user profile 

//     table.remove();
// }

     // contact us / forgot password buttons 

   var $contactBtn = $('.contactUsForm a, .forgotPassForm a');

   $contactBtn.addClass('button');

$contactBtn.each(function() {
$(this).html($(this).attr('title'));
});

 });