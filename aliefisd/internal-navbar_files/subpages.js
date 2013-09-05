$(document).ready(function(){
	$('.breadCrumbs').insertAfter('.navVert');
	$('.backLink').insertAfter('.content');
	$('.footer').wrap('<div class="wrap footer-container" />');
	$('.breadCrumbs').wrap('<div class="inner-container" />');
	$('.content').wrap('<div class="inner-container" />');
	$('.backLink').wrap('<div class="inner-container" />');
	$('.subFooterRegion').insertAfter('.footer');
	$('.toggleMenu').click(function(){
		$("ul.sf-menu").slideToggle();
	});
	var oldSrc = 'http://pdms.echalk.net/www/echalkpd_ms/site/hosting/design1/images/calViewBtn.png';
	var newSrc = 'http://www.aliefisd.net/www/Alief/site/hosting/cd/img/calendarview.jpg';
	$('input[src="' + oldSrc + '"]').attr('src', newSrc);
});