(function($){
		
$(document).ready(function() {
	$('.topNav').hide();
	$('.navVert').hide();
	$('#ctl00_navigationZone_navigationMenu').hide();


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

	$('#header').load("http://www.aliefisd.net/www/Alief/site/hosting/pd/header.html", function(){
		var siteId = 'f56fa45d-430f-43ce-82d1-5032d653a879';
		var nodeApiUrl = "customdesignapi.echalk.net";

	    var siteDate = null;
	    getAllSiteResources(siteId, nodeApiUrl, siteDate, function(err, data) {
		     drawAllSiteResources(templates, siteId, data, ".top-bar-section>ul", function(err, data) {  
		       $('#nav').foundation('topbar');
		     });
	    });

	});
  
	$('.footer-container').load("http://www.aliefisd.net/www/Alief/site/hosting/pd/footer.html");

	$('.goog-te-menu-value').slice(1).hide();

});

})($);