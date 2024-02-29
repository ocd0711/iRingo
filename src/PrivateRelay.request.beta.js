/*
README: https://github.com/VirgilClyne/iRingo
*/

import ENVs from "./ENV/ENV.mjs";
import URIs from "./URI/URI.mjs";

import Database from "./database/index.mjs";
import setENV from "./function/setENV.mjs";

const $ = new ENVs(" iRingo: ☁️ iCloud Private Relay v3.0.3(4) request.beta");
const URI = new URIs();

// 构造回复数据
let $response = undefined;

/***************** Processing *****************/
// 解构URL
const URL = URI.parse($request.url);
$.log(`⚠ ${$.name}`, `URL: ${JSON.stringify(URL)}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = URL.host, PATH = URL.path, PATHs = URL.paths;
$.log(`⚠ ${$.name}`, `METHOD: ${METHOD}`, "");
// 解析格式
const FORMAT = ($request.headers?.["Content-Type"] ?? $request.headers?.["content-type"])?.split(";")?.[0];
$.log(`⚠ ${$.name}`, `FORMAT: ${FORMAT}`, "");
(async () => {
	const { Settings, Caches, Configs } = setENV($, "iRingo", "PrivateRelay", Database);
	$.log(`⚠ ${$.name}`, `Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 创建空数据
			let body = {};
			// 方法判断
			switch (METHOD) {
				case "POST":
				case "PUT":
				case "PATCH":
				case "DELETE":
					// 格式判断
					switch (FORMAT) {
						case undefined: // 视为无body
							break;
						case "application/x-www-form-urlencoded":
						case "text/plain":
						case "text/html":
						default:
							break;
						case "application/x-mpegURL":
						case "application/x-mpegurl":
						case "application/vnd.apple.mpegurl":
						case "audio/mpegurl":
							//body = M3U8.parse($request.body);
							//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
							//$request.body = M3U8.stringify(body);
							break;
						case "text/xml":
						case "text/plist":
						case "application/xml":
						case "application/plist":
						case "application/x-plist":
							//body = XML.parse($request.body);
							//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
							//$request.body = XML.stringify(body);
							break;
						case "text/vtt":
						case "application/vtt":
							//body = VTT.parse($request.body);
							//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
							//$request.body = VTT.stringify(body);
							break;
						case "text/json":
						case "application/json":
							//body = JSON.parse($request.body);
							//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
							//$request.body = JSON.stringify(body);
							break;
						case "application/protobuf":
						case "application/x-protobuf":
						case "application/vnd.google.protobuf":
						case "application/grpc":
						case "application/grpc+proto":
						case "applecation/octet-stream":
							break;
					};
				//break; // 不中断，继续处理URL
				case "GET":
				case "HEAD":
				case "OPTIONS":
				case undefined: // QX牛逼，script-echo-response不返回method
				default:
					// 主机判断
					switch (HOST) {
						case "mask-api.icloud.com":
							$.log(`🚧 ${$.name}`, `$request.headers: ${JSON.stringify($request.headers)}`, "");
							//if ($request?.headers?.["X-Mask-User-Tier"]) $request.headers["X-Mask-User-Tier"] = "FREE"; //"SUBSCRIBER"
							//if ($request?.headers?.["x-mask-user-tier"]) $request.headers["x-mask-user-tier"] = "FREE"; //"SUBSCRIBER"
							if (Settings.CountryCode !== "AUTO") {
								if ($request.headers?.["Client-Region"]) $request.headers["Client-Region"] = `${Settings.CountryCode}-GMT+8`;
								if ($request.headers?.["client-region"]) $request.headers["client-region"] = `${Settings.CountryCode}-GMT+8`;
							};
							// 路径判断
							switch (PATH) {
								case "v1/fetchAuthTokens":
									$.lodash.set(Caches, "fetchAuthTokens.ETag", setETag($request.headers?.["If-None-Match"] ?? $request.headers?.["if-none-match"], Caches?.fetchAuthTokens?.ETag));
									$.setjson(Caches, "@iRingo.PrivateRelay.Caches");
									break;
								case "v3_1/fetchConfigFile":
								case "v3_2/fetchConfigFile":
									$.lodash.set(Caches, "fetchConfigFile.ETag", setETag($request.headers?.["If-None-Match"] ?? $request.headers?.["if-none-match"], Caches?.fetchConfigFile?.ETag));
									$.setjson(Caches, "@iRingo.PrivateRelay.Caches");
							};
							break;
					};
					break;
				case "CONNECT":
				case "TRACE":
					break;
			};
			if ($request.headers?.Host) $request.headers.Host = URL.host;
			$request.url = URI.stringify(URL);
			$.log(`🚧 ${$.name}, 调试信息`, `$request.url: ${$request.url}`, "");
			break;
		case false:
			break;
	};
})()
	.catch((e) => $.logErr(e))
	.finally(() => {
		switch ($response) {
			default: // 有构造回复数据，返回构造的回复数据
				if ($.isQuanX()) {
					if (!$response.status) $response.status = "HTTP/1.1 200 OK";
					delete $response.headers?.["Content-Length"];
					delete $response.headers?.["content-length"];
					delete $response.headers?.["Transfer-Encoding"];
					$.done($response);
				} else $.done({ response: $response });
				break;
			case undefined: // 无构造回复数据，发送修改的请求数据
				$.done($request);
				break;
		};
	})

/***************** Function *****************/
/**
 * Set ETag
 * @author VirgilClyne
 * @param {String} IfNoneMatch - If-None-Match
 * @return {String} ETag - ETag
 */
function setETag(IfNoneMatch, ETag) {
	$.log(`☑️ ${$.name}, Set ETag`, `If-None-Match: ${IfNoneMatch}`, `ETag: ${ETag}`, "");
	if (IfNoneMatch !== ETag) {
		ETag = IfNoneMatch;
		delete $request?.headers?.["If-None-Match"];
		delete $request?.headers?.["if-none-match"];
	}
	$.log(`✅ ${$.name}, Set ETag`, "");
	return ETag;
};