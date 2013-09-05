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
			$('.subFooter').hide();
		} 
	}

	// Add Container Around Body Content
	$('.breadCrumbs').insertBefore('.mainContainer');
	$('.topNavOnly').attr('id', 'content-container');
	$('.content').attr('id', 'content-box-subpages');
	$("<div id='nav-under-left'></div>").appendTo('#content-container');
	$("<div id='nav-under-right'></div>").appendTo('#content-container');
	$("<span id='shadow'></span>").appendTo('#content-box-subpages');
	
	$('#header').insertBefore('#ctl00_TopHeaderZone');

	$('#header').load("http://greenman.sd129.org/www/greeman/site/hosting/pd/header.html", function(){
		var siteId = '549b012f-2932-439a-8db5-2d83f38a3005';
		var nodeApiUrl = "customdesignapi.echalk.net";

	    var siteDate = null;
	    getAllSiteResources(siteId, nodeApiUrl, siteDate, function(err, data) {
	             drawAllSiteResources(templates, siteId, data, ".top-bar-section>ul", function(err, data) {  
	               $('#nav').foundation('topbar');
	             });
	    });

	});
  
	$('.footer').load("http://greenman.sd129.org/www/greeman/site/hosting/pd/footer.html");

	$('.goog-te-menu-value').slice(1).hide();

});

})($);