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

	$('#header').load("http://pbhs.fusdaz.org/www/PBHS/site/hosting/pd/header.html", function(){
		var siteId = '47f1d79a-f0c2-4787-87c0-c1434d6970cc';
		var nodeApiUrl = "customdesignapi.echalk.net";

	    var siteDate = null;
	    getAllSiteResources(siteId, nodeApiUrl, siteDate, function(err, data) {
		     drawAllSiteResources(templates, siteId, data, ".top-bar-section>ul", function(err, data) {  
		       $('#nav').foundation('topbar');
		     });
	    });

	});
  
	$('.footer').load("http://pbhs.fusdaz.org/www/PBHS/site/hosting/pd/footer.html");

	$('.goog-te-menu-value').slice(1).hide();

});

})($);