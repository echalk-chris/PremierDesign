(function($, exports){

exports.templates = {
	NavRootItem: ["<li id='{{Id}}' {{#IsFolder}}class='has-dropdown'{{/IsFolder}}><a href='{{&Url}}'>{{&Name}}{{#ShowNewIndicator}}<span class='newnavitem'></span>{{/ShowNewIndicator}}</a></li>"],
	NavDropdown: ["<ul id='cat{{Id}}' class='dropdown'>"],
	NavFolderLink: ["<li><label><a href='/site_res_view_folder.aspx?id={{Id}}'>{{Name}}</a></label></li>"],

	SlideShowTextSlide: [
		"<li><img src='{{&image}}'>",
        "<div class='orbit-caption'>{{caption}} ", 
        "{{#Attachment.Uri}}<a href='{{&Attachment.Uri}}' class='eventlink'><span class='attach-icon'><img src='http://school.echalk.com/www/school/site/hosting/alief/img/attach_alief.png'></span></a>{{/Attachment.Uri}} ",
        "{{#FullText}}<a href='#' data-reveal-id='ann{{Id}}'>Read more...</a>{{/FullText}}",
        "</div></li>"
	],
    SlideShowTextModal: [
    		"{{#data}}{{#FullText}}<div id='ann{{Id}}' class='reveal-modal'>",
            "<h2>Announcement</h2>", 
            "<p>{{&FullText}}</p>",
            "<a class='close-reveal-modal'>&#215;</a>",
            "</div>{{/FullText}}{{/data}}"
    ],
	SlideShowSlide: [
		"{{#data}}<li><img src='{{&Image.Path}}' alt='{{alt}}'>",
		"{{#HighlightText}}<div class='orbit-caption'>{{HighlightText}} ",
		"{{#Attachment.Uri}}<a href='{{&Attachment.Uri}}' class='eventlink'><span class='attach-icon'><img src='http://school.echalk.com/www/school/site/hosting/alief/img/attach_alief.png'></span></a>{{/Attachment.Uri}} ",
		"{{#FullText}}<a href='#' data-reveal-id='ann{{Id}}'>Read more...</a>{{/FullText}}",
		"</div>{{/HighlightText}}</li>{{/data}}"
	],
	SlideShowModal: [
		"{{#data}}{{#FullText}}<div id='ann{{Id}}' class='reveal-modal'>",
        "<h2>Announcement</h2>", 
        "<p>{{&FullText}}</p>",
        "<a class='close-reveal-modal'>&#215;</a>",
        "</div>{{/FullText}}{{/data}}"
    ],
    /* Welcome Message */
    ArchiveItem: [
		"{{#data}}<div>{{&HighlightText}}",
		"{{#FullText}}<a href='#' data-reveal-id='ann{{Id}}' class='more-btn'>Read More &gt;</a>{{/FullText}}</div>",
		"{{/data}}"
    ],
    ArchiveModal: [
		"{{#data}}{{#FullText}}<div id='ann{{Id}}' class='reveal-modal'>",
		"<h2>Message from the Principal</h2>",
		"<p>{{&FullText}}</p>",
		"<a class='close-reveal-modal'>&#215;</a>",
		"</div>{{/FullText}}{{/data}}"
    ],
    SiteMessage: [
		"{{#data}}<div>{{&HighlightText}}",
        "{{#FullText}}<a href='#' data-reveal-id='ann{{Id}}' class='more-btn'>Read More &gt;</a>{{/FullText}}</div>",
        "{{/data}}"
    ],
	SiteMessageModal: [
		"{{#data}}{{#FullText}}<div id='ann{{Id}}' class='reveal-modal'>",
		"<h2>Message from the Principal</h2>", 
		"<p>{{&FullText}}</p>",
		"<a class='close-reveal-modal'>&#215;</a>",
		"</div>{{/FullText}}{{/data}}"	
	],

	/* Daily Announcement */
    AnnouncementAreaItem: [

		 "<div class='outer'><div class='media'>",
		    "<a class='pull-left' href='#'>{{#Image.Path}}<img src='{{&Image.Path}}' width='140' height='100'>{{/Image.Path}}</a>",
		    "<div class='media-body'>",
		        "<div class='annbody'>{{#IsUrgent}}<span class='urgenticon'></span>{{/IsUrgent}}{{&HighlightText}}</div>",
		    "</div><div class='clearfix'></div>",
		"</div></div>"
	],
	AnnouncementAreaLastAttachment: ["<a href='{{Attachment.Uri}}' class='eventlink'><span class='attach-icon'><img src='http://school.echalk.com/www/school/site/hosting/alief/img/attach_alief.png'></span></a>"],
	AnnouncementAreaAttachment: ["<a href='{{Attachment.Uri}}' class='eventlink'><span class='attach-icon'></span></a>"],
	AnnouncementAreaMore: ["<div class='clearfix'></div><a href='#' data-reveal-id='ann{{Id}}' class='more-btn'>Read More &gt;</a>"],
	AnnouncementAreaModal: [
		"{{#data}}{{#FullText}}<div id='ann{{Id}}' class='reveal-modal'>",
        "<h2>Announcement</h2>", 
        "<p>{{&FullText}}</p>",
        "<a class='close-reveal-modal'>&#215;</a>",
        "</div>{{/FullText}}{{/data}}"
	],

	/* Calendar */
	UpcomingEventsDayHeader: ["<div class='event-icon'></div><div class='event1'>{{formatDate}}</div>"],
	UpcomingEventsItem: [
		    "<div class='event-news-box'>",
		    "<div class='event-con'>",
		        "{{#eventTypeName}}<span class='ueEventType' {{#eventTypeColor}}style='background-color: {{eventTypeColor}};'{{/eventTypeColor}}>{{eventTypeName}}</span>{{/eventTypeName}}",
		        "<h4>{{#eventTypeImage}}<span class='eventimg'><img src='{{&eventTypeImage}}'></span>{{/eventTypeImage}}",
		        "{{#ShowInSeparatePage}}<a href='{{link}}' class='eventlink'>{{/ShowInSeparatePage}} {{&Title}} {{#ShowInSeparatePage}}</a>{{/ShowInSeparatePage}} {{#Attachment.Uri}}<a href='{{&Attachment.Uri}}' class='eventlink'><span class='attach-icon'><img src='http://school.echalk.com/www/school/site/hosting/alief/img/attach_alief.png'></span></a>{{/Attachment.Uri}}</h4>",
		        "{{^AllDayEvent}}<span class='eventtime'>{{formatTime}}</span>{{/AllDayEvent}}",
		        "{{#ShortDescription}}<p class='eventdesc'>{{&ShortDescription}}</p>{{/ShortDescription}}",
		    "</div>",
		    "</div>"
	]
}
})($, window); 

