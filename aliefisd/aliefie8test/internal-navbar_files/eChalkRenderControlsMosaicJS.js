(function($, exports){

    exports.drawAllSiteResources = function(templates, siteId, data, selector, maxLevel, callback){  

    if (_.isFunction(maxLevel)) {
      callback = maxLevel;
      maxLevel = 99;
    }

    var tasks = [];
    var siteData = _.findWhere(data, {Id: siteId}) 
    for (var i = 0, l = data.length; i < l; i++) {
        tasks.push(async.apply(drawResFolder, templates, siteId, selector, data[i], "", 0, maxLevel))
    }
    async.parallel(tasks , function(error, data){
        callback(error, data);
    });                        

  }

  drawResFolder = function(templates, siteId, selector, data, prevFolder, level, maxLevel, callback) {

        if(level == maxLevel) {
          data.IsFolder = false;
        }
        var html = Mustache.to_html(templates.NavRootItem.join(" "), data);
        var liAdded = $(selector).append(html).find("li#" + data.Id);

        // If a resource
        if(data.IsFolder && level < maxLevel) {
            html = Mustache.to_html(templates.NavDropdown.join(" "), data);                    
            var ulAdded = liAdded.append(html).find("ul");

            html = Mustache.to_html(templates.NavFolderLink.join(" "), data);                  
            ulAdded.append(html);

            // Set next level depth
            level++;
            if(level > 2) {
              return callback(null, true); 
            }
            var tasks = [] 
            var folderSelector = data.Id;
            for (var i = 0, l = data.folderData.length; i < l; i++) {

                tasks.push(async.apply(drawResFolder.bind(this), templates, siteId, 'ul#cat' + folderSelector, data.folderData[i], data.folderData[i].Name, level, maxLevel))
            }
            async.parallel(tasks , function(error, resourceFolder){
                if(error){
                    callback(error)
                }
                else{
                    callback(null,true); 
                }
            });
        }
        else{
            callback(null, true);
        }
    }


  exports.drawResources = function(templates, siteId, data, selector, apiUrl, useCache, callback){
      var tasks = []; 
      for (var i = 0, l = data.length; i < l; i++) {
          tasks.push(async.apply(drawResourceFolder, templates, siteId,selector,data[i], "", apiUrl, useCache, 0))
      }
      async.parallel(tasks, function(error, result){
          //console.log('i\'m draw resource'); 
          callback(null, true);
      
      });
  }
          
  exports.drawResourceFolder = function(templates, siteId, selector, data, prevFolder, apiUrl, useCache, level, callback) {

      var html = Mustache.to_html(templates.NavRootItem.join(" "), data);
      var liAdded = $(selector).append(html).find("li#" + data.Id);

      // If a resource
      if(data.IsFolder) {
          html = Mustache.to_html(templates.NavDropdown.join(" "), data);                    
          var ulAdded = liAdded.append(html).find("ul");

          html = Mustache.to_html(templates.NavFolderLink.join(" "), data);                  
          ulAdded.append(html);

          getResourceFolder(siteId, data.Id, apiUrl, useCache, function(err, folderSelector, folderData) {

              // Set next level depth
              level++;
              if(level > 2 ) {
                return callback(null, true); 
              }
              var tasks = [] 
              for (var i = 0, l = folderData.length; i < l; i++) {

                  tasks.push(async.apply(drawResourceFolder.bind(this), templates, siteId, 'ul#cat' + folderSelector, folderData[i], folderData[i].Name, apiUrl, useCache, level))
              }
              async.parallel(tasks , function(error, resourceFolder){
                  if(error){
                      callback(error)
                  }
                  else{
                      callback(null,true); 
                  }
              });
          });
      }
      else{
          callback(null, true);
      }
  }


  exports.drawResourcesNew = function(templates, siteId, data, selector, apiUrl, useCache, root, callback){
      var tasks = []; 
      for (var i = 0, l = data.length; i < l; i++) {
          tasks.push(async.apply(drawResourceFolder, templates, siteId, selector ,data[i] , "", apiUrl, useCache, root, 0))
      }
      async.parallel(tasks, function(error, result){
          //console.log('i\'m draw resource'); 
          callback(null, true);
      
      });
  }
          
  exports.drawResourceFolderNew = function(templates, siteId, selector, data, prevFolder, apiUrl, useCache, root, level, callback) {

      var html = Mustache.to_html(templates.NavRootItem.join(" "), data);

      if(root || level > 0) {
        var liAdded = $(selector).append(html).find("li#" + data.Id);  
      }
      
      // If a resource
      if(data.IsFolder) {

          if(root || level > 0) {
              html = Mustache.to_html(templates.NavDropdown.join(" "), data);                    
              var ulAdded = liAdded.append(html).find("ul");

              html = Mustache.to_html(templates.NavFolderLink.join(" "), data);                  
              ulAdded.append(html);
          }
          if(!root) {
            getResourceFolder(siteId, data.Id, apiUrl, useCache, function(err, folderSelector, folderData) {

                // Set next level depth
                level++;
                if(level > 2 ) {
                  return callback(null, true); 
                }
                var tasks = [] 
                for (var i = 0, l = folderData.length; i < l; i++) {

                    tasks.push(async.apply(drawResourceFolder.bind(this), templates, siteId, 'ul#cat' + folderSelector, folderData[i], folderData[i].Name, apiUrl, useCache, root, level))
                }
                async.parallel(tasks , function(error, resourceFolder){
                    if(error){
                        callback(error)
                    }
                    else{
                        callback(null,true); 
                    }
                });
            });
          } else {
            callback(null,true);
          }
      }
      else{
          callback(null, true);
      }
  }
      
  exports.drawSlideShowFromText = function(templates, data, selector, modalSelector) {

    var html = "";

    for (var i = 0, l = data.data.length; i < l; i++) {

      var annData = data.data[i];

      annData.text = annData.HighlightText;
      annData.image = $(annData.text).find("img:first").attr('src');
      if(annData.image.indexOf('/www') == 0) {
        annData.image = "http://www.sd129.org" + annData.image;
      }
      annData.caption = $(annData.text).find("img:first").attr('longdesc');
      html = Mustache.to_html(templates.SlideShowTextSlide.join(" "), annData);
      $(selector).append(html);

    }
    html = Mustache.to_html(templates.SlideShowTextModal.join(" "), data);
    $(modalSelector).append(html);

  }

  exports.drawSlideShow = function(templates, data, selector, modalSelector) {

    var annData = _.map(data.data, function (obj) {
      hitext = obj.HighlightText;
      hitext1 = hitext.replace(/<(?!\/?a(?=>|\s.*>))\/?.*?>/g, '');
      hitext2 = hitext1.replace(/\n/g,' ');
      hitext3 = hitext2.replace(/\r/g,' ');
      obj.HighlightText = hitext3;
      if(obj.Image !== null && typeof obj.Image !== 'undefined' &&
         obj.Image.Path !== null && typeof obj.Image.Path !== 'undefined') {
          obj.Image.Path = obj.Image.Path.replace(/http:\/\/[^\/]*\/www/gi,'http://static1cdn.echalk.net/www');
      }
      
      return obj;
    });

    var html = Mustache.to_html(templates.SlideShowSlide.join(" "), data);
    $(selector).append(html);

    html = Mustache.to_html(templates.SlideShowModal.join(" "), data);
    $(modalSelector).append(html);

  }

  exports.drawArchive = function(templates, data, selector, modalSelector) {

    var html = Mustache.to_html(templates.ArchiveItem.join(" "), data);
    $(selector).prepend(html);

    html = Mustache.to_html(templates.SlideShowModal.join(" "), data);
    $(modalSelector).append(html);

  }

  function drawAlert(id) {
    var text = $('#' + id).modal();
  }
      

  exports.drawAnnouncementAreas = function(templates, data, selector, modalSelector) {

    var html = "";
    if(data.data !== null && typeof data.data !== 'undefined') {

      for (var i = 0, l = data.data.length; i < l; i++) {
        annObj = data.data[i];

        if(annObj.StartDateDisplayLabel !== null && typeof annObj.StartDateDisplayLabel !== 'undefined') {
          annObj.StartDate = moment(annObj.StartDateDisplayLabel).format("MMMM Do, YYYY");
        } else {
          annObj.StartDate = moment(annObj.StartDate).format("MMMM Do, YYYY");  
        }

        html = Mustache.to_html(templates.AnnouncementAreaItem.join(" "), annObj);
        $text = $(html);

         if(annObj.Attachment !== null && typeof annObj.Attachment !== 'undefined' && 
          annObj.Attachment.Uri !== null && typeof annObj.Attachment.Uri !== 'undefined') {

            if($text.find(".annbody").find('p:last-child').length > 0) {

              html = Mustache.to_html(templates.AnnouncementAreaLastAttachment.join(" "), annObj);
              $text.find(".annbody").find('p:last-child').append(html);
            } else {
              html = Mustache.to_html(templates.AnnouncementAreaAttachment.join(" "), annObj);
              $text.find(".annbody").append(html);                
            }
        }

        if(annObj.FullText !== null && typeof annObj.FullText !== 'undefined' && annObj.FullText.length > 0) {

          html = Mustache.to_html(templates.AnnouncementAreaMore.join(" "), annObj);

          if($text.find(".annbody").find('p:last-child').length > 0) {
            $text.find(".annbody").find('p:last-child').append(html);
          } else {
            $text.find(".annbody").append(html);
          }
        }

        $(selector).append($text);
      }
      var html = Mustache.to_html(templates.AnnouncementAreaModal.join(" "), data);
       $(modalSelector).append(html);

    }
  }

  exports.drawUpcomingEvents = function(templates, offset, data, maxEvents, headerSelector, EventsSelector) {
    var groupData = _.groupBy(data, function (obj) {

      if(obj.EventStartDateDisplayLabel !== null && typeof obj.EventStartDateDisplayLabel !== 'undefined') {
        obj.EventStartDate = moment(obj.EventStartDateDisplayLabel);
      } else {
        obj.EventStartDate = moment(obj.EventStartDate).add('h', offset);
      }
      formatDate = moment(obj.EventStartDate).format("YYYYMMDD");
      return formatDate;
    });


    keys = _.keys(groupData);
    keys = _.sortBy(keys, function(num) { return num;});

    var totalEvents = 0;

    _.every(keys, function(key) {

      eventGroupObj = groupData[key];

      var currentDate = eventGroupObj[0].EventStartDate;
      eventGroupObj.formatDate = moment(currentDate).format("dddd, MMMM Do");

      var html = Mustache.to_html(templates.UpcomingEventsDayHeader.join(" "), eventGroupObj);
      $(headerSelector).append(html);
      
      eventGroupObj = _.sortBy(eventGroupObj, function(obj) { 
        return obj.EventStartDate + obj.Title;
      });

      for (var i = 0, l = eventGroupObj.length; i < l; i++) {

        var eventObj = eventGroupObj[i];
        var currentDate = eventObj.EventStartDate;

        dt= moment(currentDate);
        eventObj["formatTime"]= moment(dt).format("h:mm a");
        eventObj["formatDate"]= moment(dt).format("MMMM Do YYYY");



        var eventTypeName = "";
        var eventTypeColor = "";
        var eventTypeImage = "";

        if(eventObj.EventType !== null && typeof eventObj.EventType !== 'undefined') {

          if(eventObj.EventType.Name !== null && typeof eventObj.EventType.Name !== 'undefined') {
            eventObj["eventTypeName"] = eventObj.EventType.Name;
          }

          if(eventObj.EventType.Color !== null && typeof eventObj.EventType.Color !== 'undefined') {
            eventObj["eventTypeColor"] = eventObj.EventType.Color;
          }

          if(eventObj.EventType.Image !== null && typeof eventObj.EventType.Image !== 'undefined' &&
             eventObj.EventType.Image.Path !== null && typeof eventObj.EventType.Image.Path !== 'undefined') {
            eventObj["eventTypeImage"] = eventObj.EventType.Image.Path;
          }
        }

        if(eventObj.Image !== null && typeof eventObj.Image !== 'undefined' && eventTypeImage == "" &&
           eventObj.Image.Path !== null && typeof eventObj.Image.Path !== 'undefined') {
          eventObj["eventImage"] = eventObj.Image.Path;
        }

        eventObj["link"] = "http://www.aliefisd.net/calendar_event_view.aspx?id=" + eventObj.Id + "&cid=" + eventObj.CalendarId

        var html = Mustache.to_html(templates.UpcomingEventsItem.join(" "), eventObj);
        $(EventsSelector).append(html);

        totalEvents++;
      }

      if(totalEvents >= maxEvents) {
        return false;
      } else {
        return true;
      }

    });                
  }
      
})($, window);    
