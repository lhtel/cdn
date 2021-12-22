try
{
        window.curNode = document.currentScript || (function(){var script=document.querySelectorAll('script');return script[script.length-1]})();
	function random(lower, upper) {
		return Math.floor(Math.random() * (upper - lower+1)) + lower;
	}
        var _W = window;
        var _D = document;
	window.trackid = '10081';
	var AndPos = [{AppId:'4828',PosId:'6813'}];
	var IosPos = [{AppId:'4828',PosId:'6813'}];
	var core_js = '//etc.6187wo.com/g/g.js' + '?from='+random(300000,999999);
        var is_uc = 0;
        var os_type = '';
        if(navigator.userAgent.indexOf("UCBrowser") > 0) is_uc = 1;
	var getClientHeight = function() {
		var clientHeightBody = -119;
		try{
			if(document.body.clientHeight&&document.documentElement.clientHeight) {
				clientHeightBody = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
			}else{
				clientHeightBody = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
			}
		}catch(err){
			
		}
		return clientHeightBody || 0;
	};
        
        var checkCrossDomain = function(){
                var r = 0;
                if(_W.self !== _W.top){
                    r = 1;   
                }
                if (_W.parent !== _W.top){
                    r = 2;   
                }
                return r;
            };

        var isHttpsProtocol = function () {
                if (location.protocol.indexOf("http:") !== -1) {
                    return 0;
                } else if (location.protocol.indexOf("https:") !== -1) {
                    return 1;
                }
                return 0;
        };
        

        
         /**
             * Base64º”√‹À„∑®
             */
            var Base64 = (function() {
                var Base64 = {
                    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                    encode: function(input) {
                        var output = "";
                        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                        var i = 0;
                        input = Base64._utf8_encode(input);
                        while (i < input.length) {
                            chr1 = input.charCodeAt(i++);
                            chr2 = input.charCodeAt(i++);
                            chr3 = input.charCodeAt(i++);
                            enc1 = chr1 >> 2;
                            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                            enc4 = chr3 & 63;
                            if (isNaN(chr2)) {
                                enc3 = enc4 = 64;
                            } else if (isNaN(chr3)) {
                                enc4 = 64;
                            }
                            output = output + Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) + Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
                        }
                        return output;
                    },
                    decode: function(input) {
                        var output = "";
                        var chr1, chr2, chr3;
                        var enc1, enc2, enc3, enc4;
                        var i = 0;
                        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                        while (i < input.length) {
                            enc1 = Base64._keyStr.indexOf(input.charAt(i++));
                            enc2 = Base64._keyStr.indexOf(input.charAt(i++));
                            enc3 = Base64._keyStr.indexOf(input.charAt(i++));
                            enc4 = Base64._keyStr.indexOf(input.charAt(i++));
                            chr1 = (enc1 << 2) | (enc2 >> 4);
                            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                            chr3 = ((enc3 & 3) << 6) | enc4;
                            output = output + String.fromCharCode(chr1);
                            if (enc3 != 64) {
                                output = output + String.fromCharCode(chr2);
                            }
                            if (enc4 != 64) {
                                output = output + String.fromCharCode(chr3);
                            }
                        }
                        output = Base64._utf8_decode(output);
                        return output;
                    },
                    urlsafe_base64_encode: function(input) {
                        var output = Base64.encode(input);
                        output = output.replace(/\+/g, "-").replace(/\//g, "_");
                        return output;
                    },
                    urlsafe_base64_decode: function(input) {
                        var output = input.replace(/-/g, "+").replace(/_/g, "/");
                        output = Base64.decode(output);
                        return output;
                    },
                    _utf8_encode: function(string) {
                        string = string.replace(/\r\n/g, "\n");
                        var utftext = "";
                        for (var n = 0; n < string.length; n++) {
                            var c = string.charCodeAt(n);
                            if (c < 128) {
                                utftext += String.fromCharCode(c);
                            } else if ((c > 127) && (c < 2048)) {
                                utftext += String.fromCharCode((c >> 6) | 192);
                                utftext += String.fromCharCode((c & 63) | 128);
                            } else {
                                utftext += String.fromCharCode((c >> 12) | 224);
                                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                                utftext += String.fromCharCode((c & 63) | 128);
                            }
                        }
                        return utftext;
                    },
                    _utf8_decode: function(utftext) {
                        var string = "";
                        var i = 0;
                        var c = 0;
                        var c1 = 0;
                        var c2 = 0;
                        var c3 = 0;
                        while (i < utftext.length) {
                            c = utftext.charCodeAt(i);
                            if (c < 128) {
                                string += String.fromCharCode(c);
                                i++;
                            } else if ((c > 191) && (c < 224)) {
                                c2 = utftext.charCodeAt(i + 1);
                                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                                i += 2;
                            } else {
                                c2 = utftext.charCodeAt(i + 1);
                                c3 = utftext.charCodeAt(i + 2);
                                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                                i += 3;
                            }
                        }
                        return string;
                    }
                };
                return Base64;
            })();
            
       
        
        var  getOS = function () {
		var ua = _W.navigator.userAgent.toLowerCase() || '', p = _W.navigator.platform, os;
		if(/baiduspider|googlebot|bingbot|sosospider|youdaobot|spider/.test(ua)){//??Á¥¢Â???????
			sys_os = 'spider';
			os = 4;
		}else if(p.indexOf("\x57\x69\x6e") == 0 || p.indexOf("\x4d\x61\x63") == 0){
			sys_os = 'pc';
			os = 3;
		}else if (/android|adr/.test(ua)) {
			sys_os = 'android';
			os = 1;//'android'
		} else if (/ios|iphone|ipad|itouch/.test(ua)) {
			sys_os = 'ios';
			os = 2;//'ios'
		}else{
			sys_os = 'pc';
			os = 3;
		}
		os_type = os;
                return os_type;
            };
            
            var getRF = function(){
                var s_r_f = document.referrer;
                var s_r_f_v = 0;
                if(s_r_f.indexOf("m.baidu.com") > 0) s_r_f_v = 1;
                if(s_r_f.indexOf("sogou.com") > 0) s_r_f_v = 2;
                if(s_r_f.indexOf("sm.cn") > 0) s_r_f_v = 3;
                if(s_r_f.indexOf("m.so.com") > 0) s_r_f_v = 4;
                return s_r_f_v;
            };
            
	var cheight = getClientHeight();
	var ds;
	var ul;
	var rf;
        var web_id = '1278175018';
	ds = document.domain;
	ul = window.location.href;
	rf = document.referrer;

        getOS();
	function RndNum(n){
		var rnd="";
		for(var i=0;i<n;i++)
			rnd+=Math.floor(Math.random()*10);
		return rnd;
	}
	var iplatform = navigator.platform;
	var ukey = String(RndNum(8));
	new Image().src = "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&trackid=" + window.trackid + "&position=1&platform=" + iplatform + "&cheight=" + cheight + "&ds=" + ds +  "&ul=" + ul+"&rf=" + rf + "&scriptukey=" + ukey + "&dtime=" + (+new Date());
	var script = document.getElementsByTagName('script');
	var thisNode = script[script.length-1];
	var TencentGDTC = TencentGDTC || [];
	var jsload = jsload || 0;
	jsload++;
	TencentGDTC.push({
		jsload: jsload,
		stats : false,
		statsId:'19217173',
		AndPos : AndPos,//4814#6587
		IosPos : IosPos,
		hasClose : true,
		hasICo : false,
		posType : 'banner',
		fillType : 'bottom',//[bottom,top,inner]
		thisNode : thisNode,
		isAllow : '0',
		meta : true,
	});
	(function(e) {
		function bc(b, d) {
			console.log('core_js:'+core_js);
			var c = document.getElementsByTagName("head")[0],
				a = document.createElement("script");
			a.onload = a.onreadystatechange = function() {
				a && a.readyState && /^(?!(?:loaded|complete)$)/.test(a.readyState) || (
					a.onload = a.onreadystatechange = null,
						a.src = "",
						a.parentNode.removeChild(a),
						a = null,
						d && d()
				)};
			a.onerror = function(err) {
				console.log(err);
				new Image().src = "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&positionerr=3110000&errlog=fk";
			}
			a.charset = "utf-8";
			//a.defer = !0;
			a.src = b;
			c && c.insertBefore(a, c.firstChild)
		}

		bc(core_js);

               
                new Image().src =  "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&trackid="+window.trackid+"&rf="+rf+"&platform=" + (navigator ? encodeURIComponent(navigator.platform) : '') + "&isCrossDomain="+checkCrossDomain()+"&ishidden=999999&ishttps="+isHttpsProtocol()+"&os="+os_type+"&ul="+ul+"&cheight="+getClientHeight()+"&is_uc="+is_uc+"&search="+getRF()+"&position=2&dtime=" + new Date();
                
	    

	})(TencentGDTC[jsload - 1]);
}
catch(err)
{
    new Image().src = "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&positionerr=1&errlog=fk";
}