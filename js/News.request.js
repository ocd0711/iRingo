class e{static name="Lodash";static version="1.2.2";static about(){return console.log(`\n🟧 ${this.name} v${this.version}\n`)}static get(e={},t="",s=void 0){Array.isArray(t)||(t=this.toPath(t));const a=t.reduce(((e,t)=>Object(e)[t]),e);return void 0===a?s:a}static set(e={},t="",s){return Array.isArray(t)||(t=this.toPath(t)),t.slice(0,-1).reduce(((e,s,a)=>Object(e[s])===e[s]?e[s]:e[s]=/^\d+$/.test(t[a+1])?[]:{}),e)[t[t.length-1]]=s,e}static unset(e={},t=""){return Array.isArray(t)||(t=this.toPath(t)),t.reduce(((e,s,a)=>a===t.length-1?(delete e[s],!0):Object(e)[s]),e)}static toPath(e){return e.replace(/\[(\d+)\]/g,".$1").split(".").filter(Boolean)}static escape(e){const t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return e.replace(/[&<>"']/g,(e=>t[e]))}static unescape(e){const t={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"};return e.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g,(e=>t[e]))}}class t{static name="$Storage";static version="1.0.9";static about(){return console.log(`\n🟧 ${this.name} v${this.version}\n`)}static data=null;static dataFile="box.dat";static#e=/^@(?<key>[^.]+)(?:\.(?<path>.*))?$/;static#t(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":"undefined"!=typeof Egern?"Egern":void 0}static getItem(t=new String,s=null){let a=s;if(!0===t.startsWith("@")){const{key:s,path:o}=t.match(this.#e)?.groups;t=s;let r=this.getItem(t,{});"object"!=typeof r&&(r={}),a=e.get(r,o);try{a=JSON.parse(a)}catch(e){}}else{switch(this.#t()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":a=$persistentStore.read(t);break;case"Quantumult X":a=$prefs.valueForKey(t);break;case"Node.js":this.data=this.#s(this.dataFile),a=this.data?.[t];break;default:a=this.data?.[t]||null}try{a=JSON.parse(a)}catch(e){}}return a??s}static setItem(t=new String,s=new String){let a=!1;if("object"==typeof s)s=JSON.stringify(s);else s=String(s);if(!0===t.startsWith("@")){const{key:o,path:r}=t.match(this.#e)?.groups;t=o;let i=this.getItem(t,{});"object"!=typeof i&&(i={}),e.set(i,r,s),a=this.setItem(t,i)}else switch(this.#t()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":a=$persistentStore.write(s,t);break;case"Quantumult X":a=$prefs.setValueForKey(s,t);break;case"Node.js":this.data=this.#s(this.dataFile),this.data[t]=s,this.#a(this.dataFile),a=!0;break;default:a=this.data?.[t]||null}return a}static removeItem(t){let s=!1;if(!0===t.startsWith("@")){const{key:a,path:o}=t.match(this.#e)?.groups;t=a;let r=this.getItem(t);"object"!=typeof r&&(r={}),keyValue=e.unset(r,o),s=this.setItem(t,r)}else switch(this.#t()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":case"Node.js":default:s=!1;break;case"Quantumult X":s=$prefs.removeValueForKey(t)}return s}static clear(){let e=!1;switch(this.#t()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":case"Node.js":default:e=!1;break;case"Quantumult X":e=$prefs.removeAllValues()}return e}static#s(e){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(e),s=this.path.resolve(process.cwd(),e),a=this.fs.existsSync(t),o=!a&&this.fs.existsSync(s);if(!a&&!o)return{};{const e=a?t:s;try{return JSON.parse(this.fs.readFileSync(e))}catch(e){return{}}}}}static#a(e=this.dataFile){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(e),s=this.path.resolve(process.cwd(),e),a=this.fs.existsSync(t),o=!a&&this.fs.existsSync(s),r=JSON.stringify(this.data);a?this.fs.writeFileSync(t,r):o?this.fs.writeFileSync(s,r):this.fs.writeFileSync(t,r)}}}class s{static name="ENV";static version="1.7.1";static about(){return console.log(`\n🟧 ${this.name} v${this.version}\n`)}constructor(e,t){console.log(`\n🟧 ${s.name} v${s.version}\n`),this.name=e,this.logs=[],this.isMute=!1,this.isMuteLog=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,t),this.log(`\n🚩 开始!\n${e}\n`)}platform(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":"undefined"!=typeof Egern?"Egern":void 0}isNode(){return"Node.js"===this.platform()}isQuanX(){return"Quantumult X"===this.platform()}isSurge(){return"Surge"===this.platform()}isLoon(){return"Loon"===this.platform()}isShadowrocket(){return"Shadowrocket"===this.platform()}isStash(){return"Stash"===this.platform()}isEgern(){return"Egern"===this.platform()}async getScript(e){return await this.fetch(e).then((e=>e.body))}async runScript(e,s){let a=t.getItem("@chavy_boxjs_userCfgs.httpapi");a=a?.replace?.(/\n/g,"")?.trim();let o=t.getItem("@chavy_boxjs_userCfgs.httpapi_timeout");o=1*o??20,o=s?.timeout??o;const[r,i]=a.split("@"),n={url:`http://${i}/v1/scripting/evaluate`,body:{script_text:e,mock_type:"cron",timeout:o},headers:{"X-Key":r,Accept:"*/*"},timeout:o};await this.fetch(n).then((e=>e.body),(e=>this.logErr(e)))}initGotEnv(e){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,e&&(e.headers=e.headers?e.headers:{},void 0===e.headers.Cookie&&void 0===e.cookieJar&&(e.cookieJar=this.ckjar))}async fetch(t={}||"",s={}){switch(t.constructor){case Object:t={...t,...s};break;case String:t={url:t,...s}}t.method||(t.method="GET",(t.body??t.bodyBytes)&&(t.method="POST")),delete t.headers?.["Content-Length"],delete t.headers?.["content-length"];const a=t.method.toLocaleLowerCase();switch(this.platform()){case"Loon":case"Surge":case"Stash":case"Egern":case"Shadowrocket":default:return delete t.id,t.policy&&(this.isLoon()&&(t.node=t.policy),this.isStash()&&e.set(t,"headers.X-Stash-Selected-Proxy",encodeURI(t.policy))),ArrayBuffer.isView(t.body)&&(t["binary-mode"]=!0),await new Promise(((e,s)=>{$httpClient[a](t,((a,o,r)=>{a?s(a):(o.ok=/^2\d\d$/.test(o.status),o.statusCode=o.status,r&&(o.body=r,1==t["binary-mode"]&&(o.bodyBytes=r)),e(o))}))}));case"Quantumult X":return t.policy&&e.set(t,"opts.policy",t.policy),delete t.charset,delete t.host,delete t.path,delete t.policy,delete t.scheme,delete t.sessionIndex,delete t.statusCode,t.body instanceof ArrayBuffer?(t.bodyBytes=t.body,delete t.body):ArrayBuffer.isView(t.body)?(t.bodyBytes=t.body.buffer.slice(t.body.byteOffset,t.body.byteLength+t.body.byteOffset),delete object.body):t.body&&delete t.bodyBytes,await $task.fetch(t).then((e=>(e.ok=/^2\d\d$/.test(e.statusCode),e.status=e.statusCode,e)),(e=>Promise.reject(e.error)));case"Node.js":let s=require("iconv-lite");this.initGotEnv(t);const{url:o,...r}=t;return await this.got[a](o,r).on("redirect",((e,t)=>{try{if(e.headers["set-cookie"]){const s=e.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),t.cookieJar=this.ckjar}}catch(e){this.logErr(e)}})).then((e=>(e.statusCode=e.status,e.body=s.decode(e.rawBody,this.encoding),e.bodyBytes=e.rawBody,e)),(e=>Promise.reject(e.message)))}}time(e,t=null){const s=t?new Date(t):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let t in a)new RegExp("("+t+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a[t]:("00"+a[t]).substr((""+a[t]).length)));return e}msg(e=name,t="",s="",a){const o=e=>{switch(typeof e){case void 0:return e;case"string":switch(this.platform()){case"Surge":case"Stash":case"Egern":default:return{url:e};case"Loon":case"Shadowrocket":return e;case"Quantumult X":return{"open-url":e};case"Node.js":return}case"object":switch(this.platform()){case"Surge":case"Stash":case"Egern":case"Shadowrocket":default:return{url:e.url||e.openUrl||e["open-url"]};case"Loon":return{openUrl:e.openUrl||e.url||e["open-url"],mediaUrl:e.mediaUrl||e["media-url"]};case"Quantumult X":return{"open-url":e["open-url"]||e.url||e.openUrl,"media-url":e["media-url"]||e.mediaUrl,"update-pasteboard":e["update-pasteboard"]||e.updatePasteboard};case"Node.js":return}default:return}};if(!this.isMute)switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":default:$notification.post(e,t,s,o(a));break;case"Quantumult X":$notify(e,t,s,o(a));case"Node.js":}if(!this.isMuteLog){let a=["","==============📣系统通知📣=============="];a.push(e),t&&a.push(t),s&&a.push(s),console.log(a.join("\n")),this.logs=this.logs.concat(a)}}log(...e){e.length>0&&(this.logs=[...this.logs,...e]),console.log(e.join(this.logSeparator))}logErr(e){switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️ ${this.name}, 错误!`,e);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,e.stack)}}wait(e){return new Promise((t=>setTimeout(t,e)))}done(t={}){const s=((new Date).getTime()-this.startTime)/1e3;switch(this.log("",`🚩 ${this.name}, 结束! 🕛 ${s} 秒`,""),this.platform()){case"Surge":t.policy&&e.set(t,"headers.X-Surge-Policy",t.policy),$done(t);break;case"Loon":t.policy&&(t.node=t.policy),$done(t);break;case"Stash":t.policy&&e.set(t,"headers.X-Stash-Selected-Proxy",encodeURI(t.policy)),$done(t);break;case"Egern":case"Shadowrocket":default:$done(t);break;case"Quantumult X":t.policy&&e.set(t,"opts.policy",t.policy),delete t.charset,delete t.host,delete t.method,delete t.opt,delete t.path,delete t.policy,delete t.scheme,delete t.sessionIndex,delete t.statusCode,t.body instanceof ArrayBuffer?(t.bodyBytes=t.body,delete t.body):ArrayBuffer.isView(t.body)?(t.bodyBytes=t.body.buffer.slice(t.body.byteOffset,t.body.byteLength+t.body.byteOffset),delete t.body):t.body&&delete t.bodyBytes,$done(t);break;case"Node.js":process.exit(1)}}}class a{static name="URI";static version="1.2.7";static about(){return console.log(`\n🟧 ${this.name} v${this.version}\n`)}static#o={scheme:"",host:"",path:"",query:{}};static parse(e){let t=e.match(/(?:(?<scheme>.+):\/\/(?<host>[^/]+))?\/?(?<path>[^?]+)?\??(?<query>[^?]+)?/)?.groups??null;if(t?.path?t.paths=t.path.split("/"):t.path="",t?.paths){const e=t.paths[t.paths.length-1];if(e?.includes(".")){const s=e.split(".");t.format=s[s.length-1]}}return t?.query&&(t.query=Object.fromEntries(t.query.split("&").map((e=>e.split("="))))),t}static stringify(e=this.#o){let t="";return e?.scheme&&e?.host&&(t+=e.scheme+"://"+e.host),e?.path&&(t+=e?.host?"/"+e.path:e.path),e?.query&&(t+="?"+Object.entries(e.query).map((e=>e.join("="))).join("&")),t}}var o={Switch:!0},r={Storefront:[["AE","143481"],["AF","143610"],["AG","143540"],["AI","143538"],["AL","143575"],["AM","143524"],["AO","143564"],["AR","143505"],["AT","143445"],["AU","143460"],["AZ","143568"],["BA","143612"],["BB","143541"],["BD","143490"],["BE","143446"],["BF","143578"],["BG","143526"],["BH","143559"],["BJ","143576"],["BM","143542"],["BN","143560"],["BO","143556"],["BR","143503"],["BS","143539"],["BT","143577"],["BW","143525"],["BY","143565"],["BZ","143555"],["CA","143455"],["CD","143613"],["CG","143582"],["CH","143459"],["CI","143527"],["CL","143483"],["CM","143574"],["CN","143465"],["CO","143501"],["CR","143495"],["CV","143580"],["CY","143557"],["CZ","143489"],["DE","143443"],["DK","143458"],["DM","143545"],["DO","143508"],["DZ","143563"],["EC","143509"],["EE","143518"],["EG","143516"],["ES","143454"],["FI","143447"],["FJ","143583"],["FM","143591"],["FR","143442"],["GA","143614"],["GB","143444"],["GD","143546"],["GF","143615"],["GH","143573"],["GM","143584"],["GR","143448"],["GT","143504"],["GW","143585"],["GY","143553"],["HK","143463"],["HN","143510"],["HR","143494"],["HU","143482"],["ID","143476"],["IE","143449"],["IL","143491"],["IN","143467"],["IQ","143617"],["IS","143558"],["IT","143450"],["JM","143511"],["JO","143528"],["JP","143462"],["KE","143529"],["KG","143586"],["KH","143579"],["KN","143548"],["KP","143466"],["KR","143466"],["KW","143493"],["KY","143544"],["KZ","143517"],["TC","143552"],["TD","143581"],["TJ","143603"],["TH","143475"],["TM","143604"],["TN","143536"],["TO","143608"],["TR","143480"],["TT","143551"],["TW","143470"],["TZ","143572"],["LA","143587"],["LB","143497"],["LC","143549"],["LI","143522"],["LK","143486"],["LR","143588"],["LT","143520"],["LU","143451"],["LV","143519"],["LY","143567"],["MA","143620"],["MD","143523"],["ME","143619"],["MG","143531"],["MK","143530"],["ML","143532"],["MM","143570"],["MN","143592"],["MO","143515"],["MR","143590"],["MS","143547"],["MT","143521"],["MU","143533"],["MV","143488"],["MW","143589"],["MX","143468"],["MY","143473"],["MZ","143593"],["NA","143594"],["NE","143534"],["NG","143561"],["NI","143512"],["NL","143452"],["NO","143457"],["NP","143484"],["NR","143606"],["NZ","143461"],["OM","143562"],["PA","143485"],["PE","143507"],["PG","143597"],["PH","143474"],["PK","143477"],["PL","143478"],["PT","143453"],["PW","143595"],["PY","143513"],["QA","143498"],["RO","143487"],["RS","143500"],["RU","143469"],["RW","143621"],["SA","143479"],["SB","143601"],["SC","143599"],["SE","143456"],["SG","143464"],["SI","143499"],["SK","143496"],["SL","143600"],["SN","143535"],["SR","143554"],["ST","143598"],["SV","143506"],["SZ","143602"],["UA","143492"],["UG","143537"],["US","143441"],["UY","143514"],["UZ","143566"],["VC","143550"],["VE","143502"],["VG","143543"],["VN","143471"],["VU","143609"],["XK","143624"],["YE","143571"],["ZA","143472"],["ZM","143622"],["ZW","143605"]]},i={Settings:o,Configs:r},n={Switch:!0,PEP:{GCC:"US"},Services:{PlaceData:"CN",Directions:"AUTO",Traffic:"AUTO",RAP:"XX",Tiles:"AUTO"},Geo_manifest:{Dynamic:{Config:{Country_code:{default:"AUTO",iOS:"CN",iPadOS:"CN",watchOS:"US",macOS:"CN"}}}},Config:{Announcements:{"Environment:":{default:"AUTO",iOS:"CN",iPadOS:"CN",watchOS:"XX",macOS:"CN"}},Defaults:{LagunaBeach:!0,DrivingMultiWaypointRoutesEnabled:!0,GEOAddressCorrection:!0,LookupMaxParametersCount:!0,LocalitiesAndLandmarks:!0,POIBusyness:!0,PedestrianAR:!0,"6694982d2b14e95815e44e970235e230":!0,OpticalHeading:!0,UseCLPedestrianMapMatchedLocations:!0,TransitPayEnabled:!0,SupportsOffline:!0,SupportsCarIntegration:!0,WiFiQualityNetworkDisabled:!1,WiFiQualityTileDisabled:!1}}},c={Settings:n},l={Switch:!0,CountryCode:"US",newsPlusUser:!0},p={Settings:l},h={Switch:!0,CountryCode:"US",canUse:!0},u={Settings:h},d={Switch:!0,CountryCode:"SG",Domains:["web","itunes","app_store","movies","restaurants","maps"],Functions:["flightutilities","lookup","mail","messages","news","safari","siri","spotlight","visualintelligence"],Safari_Smart_History:!0},g={VisualIntelligence:{enabled_domains:["pets","media","books","art","nature","landmarks"],supported_domains:["ART","BOOK","MEDIA","LANDMARK","ANIMALS","BIRDS","FOOD","SIGN_SYMBOL","AUTO_SYMBOL","DOGS","NATURE","NATURAL_LANDMARK","INSECTS","REPTILES","ALBUM","STOREFRONT","LAUNDRY_CARE_SYMBOL","CATS","OBJECT_2D","SCULPTURE","SKYLINE","MAMMALS"]}},y={Settings:d,Configs:g},f={Switch:"true",CountryCode:"US",MultiAccount:"false",Universal:"true"},m={Settings:f},S={Switch:!0,"Third-Party":!1,HLSUrl:"play-edge.itunes.apple.com",ServerUrl:"play.itunes.apple.com",Tabs:["WatchNow","Originals","MLS","Sports","Kids","Store","Movies","TV","ChannelsAndApps","Library","Search"],CountryCode:{Configs:"AUTO",Settings:"AUTO",View:["SG","TW"],WatchNow:"AUTO",Channels:"AUTO",Originals:"AUTO",Sports:"US",Kids:"US",Store:"AUTO",Movies:"AUTO",TV:"AUTO",Persons:"SG",Search:"AUTO",Others:"AUTO"}},b={Locale:[["AU","en-AU"],["CA","en-CA"],["GB","en-GB"],["KR","ko-KR"],["HK","yue-Hant"],["JP","ja-JP"],["MO","zh-Hant"],["TW","zh-Hant"],["US","en-US"],["SG","zh-Hans"]],Tabs:[{title:"主页",type:"WatchNow",universalLinks:["https://tv.apple.com/watch-now","https://tv.apple.com/home"],destinationType:"Target",target:{id:"tahoma_watchnow",type:"Root",url:"https://tv.apple.com/watch-now"},isSelected:!0},{title:"Apple TV+",type:"Originals",universalLinks:["https://tv.apple.com/channel/tvs.sbd.4000","https://tv.apple.com/atv"],destinationType:"Target",target:{id:"tvs.sbd.4000",type:"Brand",url:"https://tv.apple.com/us/channel/tvs.sbd.4000"}},{title:"MLS Season Pass",type:"MLS",universalLinks:["https://tv.apple.com/mls"],destinationType:"Target",target:{id:"tvs.sbd.7000",type:"Brand",url:"https://tv.apple.com/us/channel/tvs.sbd.7000"}},{title:"体育节目",type:"Sports",universalLinks:["https://tv.apple.com/sports"],destinationType:"Target",target:{id:"tahoma_sports",type:"Root",url:"https://tv.apple.com/sports"}},{title:"儿童",type:"Kids",universalLinks:["https://tv.apple.com/kids"],destinationType:"Target",target:{id:"tahoma_kids",type:"Root",url:"https://tv.apple.com/kids"}},{title:"电影",type:"Movies",universalLinks:["https://tv.apple.com/movies"],destinationType:"Target",target:{id:"tahoma_movies",type:"Root",url:"https://tv.apple.com/movies"}},{title:"电视节目",type:"TV",universalLinks:["https://tv.apple.com/tv-shows"],destinationType:"Target",target:{id:"tahoma_tvshows",type:"Root",url:"https://tv.apple.com/tv-shows"}},{title:"商店",type:"Store",universalLinks:["https://tv.apple.com/store"],destinationType:"SubTabs",subTabs:[{title:"电影",type:"Movies",universalLinks:["https://tv.apple.com/movies"],destinationType:"Target",target:{id:"tahoma_movies",type:"Root",url:"https://tv.apple.com/movies"}},{title:"电视节目",type:"TV",universalLinks:["https://tv.apple.com/tv-shows"],destinationType:"Target",target:{id:"tahoma_tvshows",type:"Root",url:"https://tv.apple.com/tv-shows"}}]},{title:"频道和 App",destinationType:"SubTabs",subTabsPlacementType:"ExpandedList",type:"ChannelsAndApps",subTabs:[]},{title:"资料库",type:"Library",destinationType:"Client"},{title:"搜索",type:"Search",universalLinks:["https://tv.apple.com/search"],destinationType:"Target",target:{id:"tahoma_search",type:"Root",url:"https://tv.apple.com/search"}}],i18n:{WatchNow:[["en","Home"],["zh","主页"],["zh-Hans","主頁"],["zh-Hant","主頁"]],Movies:[["en","Movies"],["zh","电影"],["zh-Hans","电影"],["zh-Hant","電影"]],TV:[["en","TV"],["zh","电视节目"],["zh-Hans","电视节目"],["zh-Hant","電視節目"]],Store:[["en","Store"],["zh","商店"],["zh-Hans","商店"],["zh-Hant","商店"]],Sports:[["en","Sports"],["zh","体育节目"],["zh-Hans","体育节目"],["zh-Hant","體育節目"]],Kids:[["en","Kids"],["zh","儿童"],["zh-Hans","儿童"],["zh-Hant","兒童"]],Library:[["en","Library"],["zh","资料库"],["zh-Hans","资料库"],["zh-Hant","資料庫"]],Search:[["en","Search"],["zh","搜索"],["zh-Hans","搜索"],["zh-Hant","蒐索"]]}},v={Settings:S,Configs:b},C=Database={Default:Object.freeze({__proto__:null,Configs:r,Settings:o,default:i}),Location:Object.freeze({__proto__:null,Settings:n,default:c}),News:Object.freeze({__proto__:null,Settings:l,default:p}),PrivateRelay:Object.freeze({__proto__:null,Settings:h,default:u}),Siri:Object.freeze({__proto__:null,Configs:g,Settings:d,default:y}),TestFlight:Object.freeze({__proto__:null,Settings:f,default:m}),TV:Object.freeze({__proto__:null,Configs:b,Settings:S,default:v})};function T(s,a,o){console.log("☑️ Set Environment Variables","");let{Settings:r,Caches:i,Configs:n}=function(s,a,o){let r=t.getItem(s,o),i={};if("undefined"!=typeof $argument&&Boolean($argument)){let t=Object.fromEntries($argument.split("&").map((e=>e.split("=").map((e=>e.replace(/\"/g,""))))));for(let s in t)e.set(i,s,t[s])}const n={Settings:o?.Default?.Settings||{},Configs:o?.Default?.Configs||{},Caches:{}};Array.isArray(a)||(a=[a]);for(let e of a)n.Settings={...n.Settings,...o?.[e]?.Settings,...i,...r?.[e]?.Settings},n.Configs={...n.Configs,...o?.[e]?.Configs},r?.[e]?.Caches&&"string"==typeof r?.[e]?.Caches&&(r[e].Caches=JSON.parse(r?.[e]?.Caches)),n.Caches={...n.Caches,...r?.[e]?.Caches};return function e(t,s){for(var a in t){var o=t[a];t[a]="object"==typeof o&&null!==o?e(o,s):s(a,o)}return t}(n.Settings,((e,t)=>("true"===t||"false"===t?t=JSON.parse(t):"string"==typeof t&&(t=t.includes(",")?t.split(",").map((e=>c(e))):c(t)),t))),n;function c(e){return e&&!isNaN(e)&&(e=parseInt(e,10)),e}}(s,a,o);if(r?.Tabs&&!Array.isArray(r?.Tabs)&&e.set(r,"Tabs",r?.Tabs?[r.Tabs.toString()]:[]),r?.Domains&&!Array.isArray(r?.Domains)&&e.set(r,"Domains",r?.Domains?[r.Domains.toString()]:[]),r?.Functions&&!Array.isArray(r?.Functions)&&e.set(r,"Functions",r?.Functions?[r.Functions.toString()]:[]),console.log(`✅ Set Environment Variables, Settings: ${typeof r}, Settings内容: ${JSON.stringify(r)}`,""),n.Storefront=new Map(n.Storefront),n.Locale&&(n.Locale=new Map(n.Locale)),n.i18n)for(let e in n.i18n)n.i18n[e]=new Map(n.i18n[e]);return{Settings:r,Caches:i,Configs:n}}const w=new s(" iRingo: 📰 News v3.0.4(2) request");let A;const O=a.parse($request.url);w.log(`⚠ URL: ${JSON.stringify(O)}`,"");const L=$request.method,k=O.host,N=O.path;O.paths,w.log(`⚠ METHOD: ${L}`,"");const U=($request.headers?.["Content-Type"]??$request.headers?.["content-type"])?.split(";")?.[0];w.log(`⚠ FORMAT: ${U}`,""),(async()=>{const{Settings:e,Caches:t,Configs:s}=T("iRingo","News",C);switch(w.log(`⚠ Settings.Switch: ${e?.Switch}`,""),e.Switch){case!0:default:let t={};switch(L){case"POST":case"PUT":case"PATCH":case"DELETE":switch(U){case void 0:case"application/x-www-form-urlencoded":case"text/plain":default:case"application/x-mpegURL":case"application/x-mpegurl":case"application/vnd.apple.mpegurl":case"audio/mpegurl":case"text/xml":case"text/html":case"text/plist":case"application/xml":case"application/plist":case"application/x-plist":case"text/vtt":case"application/vtt":break;case"text/json":case"application/json":switch(t=JSON.parse($request.body??"{}"),k){case"news-edge.apple.com":case"news-todayconfig-edge.apple.com":if("v1/configs"===N)"AUTO"!==e.CountryCode&&(t.storefrontId=s.Storefront.get(e.CountryCode)??"143441"),t?.deviceInfo?.preferredLanguages&&(t.deviceInfo.preferredLanguages.unshift("zh-SG","zh-Hans-US","zh-Hant-US"),t.deviceInfo.preferredLanguages.push("en")),"AUTO"!==e.CountryCode&&(t.deviceInfo.countryCode=e?.CountryCode??"US");break;case"news-events.apple.com":case"news-sports-events.apple.com":if("analyticseventsv2/async"===N)t?.data?.session?.mobileData&&(t.data.session.mobileData.countryCode="310",t.data.session.mobileData.carrier="Google Fi",t.data.session.mobileData.networkCode="260")}$request.body=JSON.stringify(t);case"application/protobuf":case"application/x-protobuf":case"application/vnd.google.protobuf":case"application/grpc":case"application/grpc+proto":case"applecation/octet-stream":}case"GET":case"HEAD":case"OPTIONS":case void 0:default:switch(k){case"news-edge.apple.com":case"news-todayconfig-edge.apple.com":case"news-events.apple.com":case"news-sports-events.apple.com":break;case"news-client-search.apple.com":if("v1/search"===N)O.query?.parsecParameters&&(O.query.parsecParameters=decodeURIComponent(O.query.parsecParameters),O.query.parsecParameters=JSON.parse(O.query.parsecParameters),O.query.parsecParameters.storeFront&&"AUTO"!==e.CountryCode&&(O.query.parsecParameters.storeFront=O.query.parsecParameters.storeFront.replace(/[\d]{6}/,s.Storefront.get(e.CountryCode)??"143441")),O.query.parsecParameters=JSON.stringify(O.query.parsecParameters),O.query.parsecParameters=encodeURIComponent(O.query.parsecParameters)),O.query?.storefrontID&&"AUTO"!==e.CountryCode&&(O.query.storefrontID=s.Storefront.get(e.CountryCode)??"143441"),O.query?.newsPlusUser&&(O.query.newsPlusUser=e?.newsPlusUser??!0)}case"CONNECT":case"TRACE":}$request.headers?.Host&&($request.headers.Host=O.host),$request.url=a.stringify(O);case!1:}})().catch((e=>w.logErr(e))).finally((()=>{if(void 0===A)w.done($request);else w.isQuanX()?(A.status||(A.status="HTTP/1.1 200 OK"),delete A.headers?.["Content-Length"],delete A.headers?.["content-length"],delete A.headers?.["Transfer-Encoding"],w.done(A)):w.done({response:A})}));
