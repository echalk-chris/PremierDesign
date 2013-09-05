
(function($, exports){
 
            function  fixRedirect(obj) {
                if (typeof obj.Url !== "undefined" && obj.Url !== null && obj.Url.indexOf("redirect.asp") > -1) {

                    switch( obj.ComponentType  )
                    {
                        case "CL":

                            if(obj.Url.indexOf("sitecalendar") > -1) {
                                var matches = obj.Url.match(/linkRefID={([^}]*)}/);
                                if(matches.length > 0) {
                                    obj.Url = "/calendar_month.aspx?id=" + matches[1];    
                                }
                            }
                            break;

                        case "LP":

                            if(obj.Url.indexOf("goto=groups") > -1) {
                                var matches = obj.Url.match(/link_Id={([^}]*)}/);
                                if(matches.length > 0) {
                                    obj.Url = "/group_profile_view.aspx?id=" + matches[1];    
                                }
                            }
                            break;

                        case "B":

                            if(obj.Url.indexOf("sitelist") > -1) {
                                obj.Url = "/sites";    
                            }
                            break;

                        default:
                            break
                    }
                }
                return obj;
            }

            exports.getAllSiteResources = function(siteId, apiUrl, siteDate, callback) {
                if(siteDate != null) {
                    var resKey = siteId + "AllSiteResources";
                    var resourceValue = jq18.jStorage.get(resKey);

                    var dateKey = siteId + "CacheDate";
                    var siteCacheDate = jq18.jStorage.get(dateKey);                    
                }

                 if (typeof resourceValue !== "undefined" && resourceValue !== null && siteDate == siteCacheDate) {
                    callback(0, resourceValue, 1);
                } else {

                    if(siteDate != null) {
                        var url = "http://" + apiUrl + "/sites/" + siteId + "/resources?callback=?";
                    } else {
                        var url = "http://" + apiUrl + "/sites/" + siteId + "/resources?nocache=true&callback=?";
                    }

                    $.ajax({
                        type: "GET",
                        url: url,
                        data: "jsonp",
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data, status, xhr) {
                            if(siteDate != null) {
                                jq18.jStorage.set(resKey, data, {TTL: 3600000});
                                jq18.jStorage.set(dateKey, siteDate, {TTL: 3600000});
                            }
                            callback(null, data);
                        },
                        error: function (xhr, status, error) {
                            callback(error);
                        }
                    });
                }
            }

            exports.getSiteInfo = function(siteId, apiUrl, callback) {

                $.ajax({
                    type: "GET",
                    url: "http://" + apiUrl + "/SiteApis/Sites/" + siteId + "/Directory/Sites?AssociationSiteTypes=District&callback=?",
                    data: "jsonp",
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data, status, xhr) {

                        var siteData = _.findWhere(data, {Id: siteId}) 

                        callback(null, siteData);
                    },
                    error: function (xhr, status, error) {
                        callback(err, {});
                    }
                });
            }


            exports.getRootResourceFolder = function(siteId, apiUrl, useCache, siteDate, callback) {

                var key = siteId + "RootResources";
                var dateKey = siteId + "CacheDate";

                var resourceValue = jq18.jStorage.get(key);
                var pageName = $(location).attr('href');

                var siteCacheDate = jq18.jStorage.get(dateKey);

                if (typeof resourceValue !== "undefined" && resourceValue !== null && useCache == 1 && siteDate == siteCacheDate) {
                    callback(0, resourceValue, 1);
                } else {

                    $.ajax({
                        type: "GET",
                        url: "http://" + apiUrl + "/SiteApis/Sites/" + siteId + "/Resources?callback=?",
                        data: "jsonp",
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data, status, xhr) {
                            //console.log(data);

                            var resData = _.map(data, fixRedirect);
                            jq18.jStorage.set(key, resData, {TTL: 3600000});
                            jq18.jStorage.set(dateKey, siteDate, {TTL: 3600000});                                

                            callback(0, resData, 0);

                        },
                        error: function (xhr, status, error) {
                            callback(err, {}, 0);
                        }
                    });
                }
            }


           exports.getResourceFolder = function(siteId, folderId, apiUrl, useCache, callback) {

                var key = siteId + folderId + "Resources";
                var resourceValue = jq18.jStorage.get(key);
                var pageName = $(location).attr('href');

                if (typeof resourceValue !== "undefined" && resourceValue !== null && useCache == 1) {
                    callback(0, folderId, resourceValue);
                } else {

                    $.ajax({
                        type: "GET",
                        url: "http://" + apiUrl + "/SiteApis/Sites/" + siteId + "/ResourceFolders/" + folderId + "/Resources?callback=?",
                        data: "jsonp",
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data, status, xhr) {
                            //console.log(data);
                            var resData = _.map(data, fixRedirect);
                            jq18.jStorage.set(key, resData, {TTL: 3600000});
                            callback(0, folderId, resData)
                        },
                        error: function (xhr, status, error) {
                            //console.log(error);
                            callback(error, 0, {});
                        }
                    });

                }
            }

            exports.getAnnouncementAreaData = function(siteId, announcementAreaId, apiUrl, siteDate, callback) {

                if(siteDate != null) {
                    var key = siteId + announcementAreaId + "AnnouncementArea";
                    var announcementValue = jq18.jStorage.get(key);

                    var dateKey = siteId + "CacheDate";
                    var siteCacheDate = jq18.jStorage.get(dateKey);
                    var url = "http://" + apiUrl + "/sites/" + siteId + "/announcementareas/" + announcementAreaId + "/announcements?callback=?";               
                } else {
                    var url = "http://" + apiUrl + "/sites/" + siteId + "/announcementareas/" + announcementAreaId + "/announcements?nocache=true&callback=?";
                }

                if (typeof announcementValue !== "undefined" && announcementValue !== null && siteDate == siteCacheDate) {
                    callback(0, {data: announcementValue});
                } else {                
                    $.ajax({
                        type: "GET",
                        url: url,
                        data: "jsonp",
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data, status, xhr) {
                            //console.log(data);
                            if(siteDate != null) {
                                jq18.jStorage.set(key, data, {TTL: 3600000});
                            }
                            callback(0, {data: data})
                        },
                        error: function (xhr, status, error) {
                            //console.log(error);
                            callback(error, {});
                        }
                    });
                }

            }

             exports.getUpcomingEventsData = function(siteId, calendarId, days, apiUrl, siteDate, callback) {

                var today = moment().format("MMMM DD, YYYY")
                var startDate = moment(today).format();
                var endDate = moment(today).add('days', days).format()
                var sd = startDate.slice(0, startDate.indexOf("T"));
                var ed = endDate.slice(0, endDate.indexOf("T"));

                if(siteDate != null) {
                    var key = siteId + calendarId + "UpcomingEvents";
                    var upcomingEventsValue = jq18.jStorage.get(key);

                    var dateKey = siteId + "CacheDate";
                    var siteCacheDate = jq18.jStorage.get(dateKey);       
                    var url = "http://" + apiUrl + "/sites/" + siteId + "/calendars/" + calendarId + "/events?startdate=" + sd + "&enddate=" + ed + "&callback=?";             
                } else {
                    var url = "http://" + apiUrl + "/sites/" + siteId + "/calendars/" + calendarId + "/events?startdate=" + sd + "&enddate=" + ed + "&nocache=true&callback=?"
                }

                if (typeof upcomingEventsValue !== "undefined" && upcomingEventsValue !== null && siteDate == siteCacheDate) {
                    callback(0, upcomingEventsValue);
                } else {       
                    $.ajax({
                        type: "GET",
                        url: url,
                        data: "jsonp",
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data, status, xhr) {
                            //console.log(data);
                            if(siteDate != null) {
                                var key = siteId + calendarId + "UpcomingEvents";
                                jq18.jStorage.set(key, data, {TTL: 3600000});
                            }
                            callback(0, data);
                        },
                        error: function (xhr, status, error) {
                            //console.log(error);
                            callback(error, {});
                        }
                    });
                }
            }
        
})($, window);