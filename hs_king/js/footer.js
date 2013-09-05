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

	$('#header').load("http://hs.king.echalk.net/www/king_hs/site/hosting/pd/header.html", function(){
	
		$(".top-bar-section>ul").load("http://hs.king.echalk.net/www/king_hs/site/hosting/pd/index_menu.html", function() {
			$('#nav').foundation('topbar');		
		});
	
		// var siteId = 'c28c5e6f-94b9-44fc-9c59-963a1c3ced39';
		// var nodeApiUrl = "cinode.echalk.net:3000";
	    // var siteDate = null;
	    // getAllSiteResources(siteId, nodeApiUrl, siteDate, function(err, data) {
		     // drawAllSiteResources(templates, siteId, data, ".top-bar-section>ul", function(err, data) {  
		       // $('#nav').foundation('topbar');
		     // });
	    // });

	});
  
	$('.footer-container').load("http://hs.king.echalk.net/www/king_hs/site/hosting/pd/footer.html");

	$('.goog-te-menu-value').slice(1).hide();

});

})($);