(function($){
		
$(document).ready(function() {

	var $myDiv = $('.bg-fullpage');

	if ( $myDiv.length){
		$('.bg-fullpage').prepend("<div id='header'></div>");
	} else {
		var $myDiv = $('#ctl00_navigationZone');
		if ( $myDiv.length){
			$('.navRpt').empty();
			$('.navRpt').prepend("<div id='header'></div>");
			$('.breadCrumbs').insertBefore('.content');
			$('.subFooter').hide();
		} 
	}
	
	$('#header').insertBefore('#ctl00_TopHeaderZone');
	$('.event-icon').prepend("<br />");
	$('.content').attr('id', 'content-box-subpages');
	$("<span id='shadow'></span>").appendTo('#content-box-subpages');
	

	$('#header').load("http://www.ellabakerschool.net/www/r9tech_ellabaker/site/hosting/pd/header.html", function(){
		var siteId = '555634b3-aa0b-43b2-b302-55271bdacd0f';
		var nodeApiUrl = "customdesignapi.echalk.net";

	    var siteDate = null;
	    getAllSiteResources(siteId, nodeApiUrl, siteDate, function(err, data) {
		     drawAllSiteResources(templates, siteId, data, ".top-bar-section>ul", function(err, data) {  
		       $('#nav').foundation('topbar');
		     });
	    });

	});
  
	$('.footer').load("http://www.ellabakerschool.net/www/r9tech_ellabaker/site/hosting/pd/footer.html");

	$('.goog-te-menu-value').slice(1).hide();

});

})($);