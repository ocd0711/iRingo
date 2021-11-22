/*
README:https://github.com/VirgilClyne/iRingo
*/

var url = $request.url;
var body = $request.body;

const path1 = "/v1/configs";
const path2 = "/analyticseventsv2/async";
const path3 = "/v1/search?";

if (url.indexOf(path1) != -1) {
    let configs = JSON.parse(body);
    configs.deviceInfo.preferredLanguages = ["zh-CN", "zh-HK", "zh-US", "en-US"];
    configs.deviceInfo.countryCode = "US";
    body = JSON.stringify(configs);
    console.log('/v1/configs');
    $done({ body });
} else if (url.indexOf(path2) != -1) {
    let async = JSON.parse(body);
    if (async.data.session.mobileData) {
        async.data.session.mobileData.countryCode = "310";
        async.data.session.mobileData.carrier = "Google Fi";
        async.data.session.mobileData.networkCode = "260";
    };
    body = JSON.stringify(async);
    console.log('/analyticseventsv2/async');
    $done({ body });
} else if (url.indexOf(path3) != -1) {
    if (processQuery(url, 'storefrontID') == '143441') $done({ url }) //US
    else if (processQuery(url, 'storefrontID') == '143455') $done({ url }) //CA
    else if (processQuery(url, 'storefrontID') == '143444') $done({ url }) //UK
    else if (processQuery(url, 'storefrontID') == '143460') $done({ url }) //AU
    else url = processQuery(url, 'storefrontID', '143441'); $done({ url }); //Other Region, Redirect StoreFrontID to US (143441)
    console.log('/v1/search?');
} else $done({});

// Function 1
// process Query URL
// 查询并替换自身,url为链接,variable为参数,parameter为新值(如果有就替换)
// https://github.com/VirgilClyne/iRingo/blob/main/js/QueryURL.js
function processQuery(url, variable, parameter) {
    console.log(`processQuery, INPUT: variable: ${variable}, parameter: ${parameter}`, ``);
    if (url.indexOf("?") != -1) {
        if (parameter == undefined) {
            console.log(`getQueryVariable, INPUT: variable: ${variable}`, ``);
            var query = url.split("?")[1];
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    console.log(`getQueryVariable, OUTPUT: ${variable}=${pair[1]}`, ``);
                    return pair[1];
                }
            }
            console.log(`getQueryVariable, ERROR: No such variable: ${variable}, Skip`, ``);
            return false;
        } else {
            console.log(`replaceQueryParamter, INPUT: ${variable}=${parameter}, Start`, ``);
            var re = new RegExp('(' + variable + '=)([^&]*)', 'gi')
            var newUrl = url.replace(re, variable + '=' + parameter)
            console.log(`replaceQueryParamter, OUTPUT: ${variable}=${parameter}`, newUrl, ``);
            return newUrl
        };
    } else {
        console.log(`processQuery, ERROR: No such URL ,Skip`, url, ``);
        return url;
    }
};
