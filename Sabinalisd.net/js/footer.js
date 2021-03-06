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

	$('#header').load("http://www.sabinalisd.net/www/sabinalisd/site/hosting/pd/header.html", function(){
		var siteId = '62883294-036f-473f-b09d-d647ee42cdb2';
		var nodeApiUrl = "customdesignapi.echalk.net";

	    var siteDate = null;
	    getAllSiteResources(siteId, nodeApiUrl, siteDate, function(err, data) {
		     drawAllSiteResources(templates, siteId, data, ".top-bar-section>ul", function(err, data) {  
		       $('#nav').foundation('topbar');
		     });
	    });

	});
  
	$('.footer').load("http://www.sabinalisd.net/www/sabinalisd/site/hosting/pd/footer.html");

	$('.goog-te-menu-value').slice(1).hide();

});

})($);