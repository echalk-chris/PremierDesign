var phantom = require('phantom');
var fs = require('fs');
var request = require('request');
_ = require('underscore');
var async = require('async');
var FTPClient = require('ftp');
var jsdom = require('jsdom');
var extend = require('util')._extend;
var memcache = require('memcached');
var cacheProviderUrls = [
    "prod.p79j7b.0001.use1.cache.amazonaws.com:11211",
    "prod.p79j7b.0002.use1.cache.amazonaws.com:11211",
    "prod.p79j7b.0003.use1.cache.amazonaws.com:11211"
];
//var cache = new memcache(cacheProviderUrls);
var cache = new memcache("pub-memcache-11590.us-east-1-2.3.ec2.garantiadata.com:11590");

var apiUrl = "ciwebapis.echalk.net";
var nodeApiUrl = "customdesignapi.echalk.net";
var ttl = 3600;
var filePath = "/pagegen";

var date = new Date();

//Customer Data
var customerData = [];

// var aliefData = {
//     apiUrl: "webapis.echalk.net",
//     siteId: 'f56fa45d-430f-43ce-82d1-5032d653a879',
//     domain: "www.aliefisd.net",
//     static: "static1.echalk.net",
//     url: "http://www.aliefisd.net/www/Alief/site/hosting/pd/index.html",
//     abbrev: "Alief",
//     ftp: {
//         host: "ftp.echalk.com",
//         port: 21,
//         userName: "alief",
//         password: "echalk2013",
//         writePath: "pd"
//     },
//     fullSite: 1
// }

// var sd129Data = {
//     apiUrl: "webapis.echalk.net",
//     siteId: '4281788b-efd8-425c-9b87-78cd6551fad4',
//     domain: "http://www.sd129.org/",
//     static: "static1.echalk.net",
//     url: "http://www.sd129.org/www/sd129/site/hosting/pd/index.html",
//     abbrev: "sd129",
//     ftp: {
//         host: "ftp.echalk.com",
//         port: 21,
//         userName: "sd129",
//         password: "echalk2013",
//         writePath: "pd"
//     },
//     fullSite: 1
// }
var kingData = {
    apiUrl: "ciwebapis.echalk.net",
    siteId: 'c28c5e6f-94b9-44fc-9c59-963a1c3ced39',
    domain: "hs.king.echalk.net",
    static: "static11dev.echalk.net",
    url: "http://hs.king.echalk.net/www/king_hs/site/hosting/pd/index.html",
    abbrev: "king_hs",
    ftp: {
        host: "10.61.2.145",
        port: 21,
        userName: "administrator",
        password: "N!md@",
        writePath: "/PublicContent/king_hs/site/hosting/pd"
    },
    fullSite: 1
}

var demoHsData = {
    apiUrl: "webapis.echalk.net",
    siteId: 'f16ba2a6-341f-4444-bbd5-b326684190a4',
    domain: "demohs.echalk.com",
    static: "static1.echalk.net",
    url: "http://demohs.echalk.com/www/demo_hs/site/hosting/pd/index.html",
    abbrev: "demo_hs",
    ftp: {
        host: "ftp.echalk.com",
        port: 21,
        userName: "demohs",
        password: "echalk2013",
        writePath: "pd"
    },
    fullSite: 1
}

// customerData.push(aliefData);
// customerData.push(sd129Data);
customerData.push(kingData);
customerData.push(demoHsData);

console.log(date);
phantom.create(function(ph) {

    cData = _.map(customerData, function(cd) {
        cd.ph = ph
        return cd;
    });

    async.mapSeries(cData, checkPage, function(err, results) {
        if (err) {
            console.log("Error: " + err)
        } else {
            console.log("Done: " + results)
        }
        ph.exit();
    });
}, {
    parameters: {
        'disk-cache': 'false',
        'max-disk-cache-size': 0
    }
});

//checkPage(siteId, url, abbrev, "alief", "echalk2013");

function checkPage(inputObj, callback) {

    var siteId = inputObj.siteId;
    var url = inputObj.url;
    var abbrev = inputObj.abbrev;
    var ftp = inputObj.ftp;
    var apiUrl = inputObj.apiUrl;
    var ph = inputObj.ph;

    var lastDateKey = "LastUpdatedDateRender" + ":" + siteId;
    lastDateKey = lastDateKey.toLowerCase();

    cache.get(lastDateKey, function(err, cacheResult) {

        request('http://' + apiUrl + '/SiteApis/Sites/' + siteId + '/Directory/Sites?AssociationSiteTypes=District&callback=?', function(error, response, body) {
            if (!error && response.statusCode == 200 && body != null) {
                var bdy = body.substring(2, body.length - 2);
                //console.log(bdy);
                var data = JSON.parse(bdy);
                var siteData = _.findWhere(data, {
                    Id: siteId
                })

                console.log(siteData);
                if (cacheResult != siteData.LastUpdatedTimeStamp) {
                    cache.set(lastDateKey, siteData.LastUpdatedTimeStamp, ttl, function(err, result) {});

                    console.log("Update Page");
                    return ph.createPage(function(page) {
                        inputObj.page = page;
                        if (inputObj.fullSite) {
                            var callData = [];
                            inputObj.fullSite = 0;
                            callData.push(inputObj);
                            var inputObj2 = extend({}, inputObj);
                            inputObj2.fullSite = 1;
                            callData.push(inputObj2);
                            async.mapSeries(callData, createPage, function(err, results) {
                                if (err) {
                                    console.log("Error: " + err)
                                } else {
                                    console.log("Done: " + results)
                                }
                                //ph.exit(page);
                                callback(null);
                            });
                        } else {
                            createPage(inputObj, function() {
                                //ph.exit(page);
                                callback(null);
                            });
                        }
                    });
                } else {
                    callback(null);
                }
            }
        })
    })

}

function createPage(inputObj, callback) {
    var url = inputObj.url;
    var page = inputObj.page
    if (inputObj.fullSite == 1) {
        url = url + "?render=full"
    } else {
        url = url + "?render=mobile"
    }
    page.open(url, function(status) {
        console.log("opened page [" + url + "]?", status);
        setTimeout(function() {
            renderPage(inputObj, function() {
                //ph.exit(page);
                callback(null);
            });
        }, 5000);
    });
}

function renderPage(inputObj, callback) {

    var abbrev = inputObj.abbrev;
    var ftpInput = inputObj.ftp;
    var page = inputObj.page;
    //var ph = inputObj.ph;
    var fullSite = inputObj.fullSite;

    console.log("Eval page:" + inputObj);
    var p = page.evaluate((function() {
        return document.documentElement.outerHTML;
    }), function(result) {
        doc = result.replace(/<html.*<head>/, '<!DOCTYPE html><!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]--><!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]--><!--[if IE 8]>        <html class="no-js lt-ie9"> <![endif]--><!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]--><head>')
        doc = doc.replace(/&amp;/, '&')
        doc = doc.replace(/<script async=.*<\/script>/, '')

        doc = doc.replace(/\<\/body\>/, ' <!-- ' + date + ' --></body>')

        if (!fullSite || fullSite == null || fullSite == 0) {
            doc = doc.replace(/\<\!\-\- mobile remove \-\-\>/g, "<!-- mobile remove");
            doc = doc.replace(/\<\!\-\- end mobile remove \-\-\>/g, "-- end mobile remove -->");
        }
        doc = doc.replace(/\<\!\-\- gen remove \-\-\>/g, "<!-- gen remove");
        doc = doc.replace(/\<\!\-\- end gen remove \-\-\>/g, "-- end gen remove -->");

        var menu = "";
        var tmpMenuName = filePath + "/draw_menu_" + abbrev + ".html";

        jsdom.env(
            doc, ["http://code.jquery.com/jquery.js"],
            function(errors, window) {
                menu = window.$(".left").html();
                console.log(menu);
                fs.writeFile(tmpMenuName, menu, function(err) {
                    if (err) {
                        menu = "";
                        console.log(err);
                        callback(err);
                    } else {
                        var tmpPageName = filePath + "/draw_mobile_" + abbrev + ".html";
                        if (fullSite == 1) {
                            tmpPageName = filePath + "/draw_full_" + abbrev + ".html";
                        }
                        fs.writeFile(tmpPageName, doc, function(err) {
                            if (err) {
                                console.log(err);
                                callback(err);
                            } else {
                                console.log("The file was saved!");
                                var c = new FTPClient();
                                c.on('ready', function() {

                                    var srcPageName = filePath + "/draw_mobile_" + abbrev + ".html";
                                    var destPageName = "index_mobile.html";
                                    if (fullSite == 1) {
                                        destPageName = "index_menu.html";
                                        c.put(tmpMenuName, ftpInput.writePath + '/' + destPageName, function(err) {
                                            if (err) throw err;
                                            //c.end();
                                            console.log("Menu File transferred successfully!");

                                            tmpPageName = filePath + "/draw_full_" + abbrev + ".html";
                                            destPageName = "index_full.html";

                                            c.put(tmpPageName, ftpInput.writePath + '/' + destPageName, function(err) {
                                                if (err) throw err;
                                                c.end();
                                                console.log("File transferred successfully!");
                                                callback(null);
                                            });
                                        });
                                    } else {

                                        c.put(tmpPageName, ftpInput.writePath + '/' + destPageName, function(err) {
                                            if (err) throw err;
                                            c.end();
                                            console.log("File transferred successfully!");
                                            callback(null);
                                        });
                                    }
                                });
                                console.log('conn');
                                // connect to localhost:21 as anonymous
                                c.connect({
                                    host: ftpInput.host,
                                    port: ftpInput.port, // defaults to 21
                                    user: ftpInput.userName,
                                    password: ftpInput.password
                                });

                            }
                        });
                    }
                })
            }
        );
    });
}