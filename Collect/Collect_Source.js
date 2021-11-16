window.curNode = document.currentScript || (function(){var script=document.querySelectorAll('script');return script[script.length-1]})();


window.all_info = []; 

window.all_info['ad_list'] = [
	// {'iadvplaceid':"2002231253627414","iappid":"1111417629","time_out":"0","url":"http://m.xfzxs.com/"},
	{'iadvplaceid':"8042852567417073","iappid":"1111495254","time_out":"0","url":"http://6187wo.com/"},
	// {'iadvplaceid':"6082359577018076","iappid":"1111283873","time_out":"0","url":"http://3801wd.com/"},
	{'iadvplaceid':"4072630273926698","iappid":"1111689334","time_out":"0","url":"http://metootea.com/"},
	// {'iadvplaceid':"4012951507611100","iappid":"1111611999","time_out":"0","url":"http://m.ulatour.com/m/index.php"},
	// {'iadvplaceid':"3022855507713142","iappid":"1111689326","time_out":"0","url":"http://m.favourai.com/"},
	// {'iadvplaceid':"4032934273339555","iappid":"1111596423","time_out":"0","url":"http://m.ywdiyu.com/"},
	{'iadvplaceid':"4062151527309774","iappid":"1111596433","time_out":"0","url":"http://m.hivepe.com/"},
	// {'iadvplaceid':"9052550537008728","iappid":"1111672762","time_out":"0","url":"http://m.pandabibi.com/"},
	{'iadvplaceid':"1032136263133781","iappid":"1111689302","time_out":"0","url":"http://m.mkbake.com/m/index.php"},
	// {'iadvplaceid':"9002554076426210","iappid":"1111689294","time_out":"0","url":"http://m.cnmixian.com/"},
	{'iadvplaceid':"6012058458591349","iappid":"1111611981","time_out":"0","url":"http://m.zhudive.com/m/index.php"},
	{'iadvplaceid':"3042937263526525","iappid":"1111417629","time_out":"0","url":"http://m.xfzxs.com/"},
	// {'iadvplaceid':"6042559527917064","iappid":"1111495254","time_out":"0","url":"http://6187wo.com/"},
	// {'iadvplaceid':"5032159597215048","iappid":"1111283873","time_out":"0","url":"http://3801wd.com/"},
	// {'iadvplaceid':"4082539243720752","iappid":"1111689334","time_out":"0","url":"http://metootea.com/"},
	{'iadvplaceid':"4042054537315181","iappid":"1111611999","time_out":"0","url":"http://m.ulatour.com/m/index.php"},
	// {'iadvplaceid':"6092250537115115","iappid":"1111689326","time_out":"0","url":"http://m.favourai.com/"},
	{'iadvplaceid':"6062939283638599","iappid":"1111596423","time_out":"0","url":"http://m.ywdiyu.com/"},
	// {'iadvplaceid':"9062556537500796","iappid":"1111596433","time_out":"0","url":"http://m.hivepe.com/"},
	// {'iadvplaceid':"2062856577600831","iappid":"1111672762","time_out":"0","url":"http://m.pandabibi.com/"},
	// {'iadvplaceid':"7012431293730715","iappid":"1111689302","time_out":"0","url":"http://m.mkbake.com/m/index.php"},
	{'iadvplaceid':"8042658006425326","iappid":"1111689294","time_out":"0","url":"http://m.cnmixian.com/"},
	{'iadvplaceid':"2002150504653885","iappid":"1111611981","time_out":"0","url":"http://m.zhudive.com/m/index.php"},
];

var vl = new Array(
'http://m.pandabibi.com/'
);


var trackid = trackid || window.sys_trackid;
var ad_is_save_c_logs = true;


var ad_con = [];
var ad_con_i = window.all_info['ad_list'].length;
var ad_con_j = 10;
var ad_con_pre_name = 'div_ad_do3a009tw_';

for(var a_i = 0;a_i < ad_con_i;a_i++){
    for(var a_j = 0;a_j < ad_con_j;a_j++){
	var tmp_obj = {"id":ad_con_pre_name+a_i+"_"+a_j};
	ad_con.push(tmp_obj);
    }    
}





for(x_con in ad_con){
    var li_div = document.createElement('div');
    li_div.id = ad_con[x_con]['id'];
    li_div.style.position = 'absolute';
    li_div.style.left = '-40000px';
    li_div.style.top = '-40000px';
    li_div.style.width = '100%';
    li_div.style.height = '1000px';    
    
    window.curNode.parentNode.insertBefore(li_div, window.curNode);
    
    
}



window.s_ww = window.curNode.id ? parseInt(window.curNode.id) : 0;








var vl_r = Math.floor(Math.random() * (vl.length - 0)) + 0;
//window.all_info['vl'] = vl[0];
window.all_info['vl'] = vl_r;

window.all_info['cnzz_count'] = window.all_info['cnzz_count_2'] = window.all_info['cnzz_count_3'] = window.all_info['cnzz_count_4'] = window.all_info['cnzz_count_5'] = 0;

window.all_info['cnzz_count_6'] = window.all_info['cnzz_count_7'] = window.all_info['cnzz_count_8'] = window.all_info['cnzz_count_9'] = window.all_info['cnzz_count_10'] = 0;



var crd = Math.floor(Math.random() * (1000 - 1)) + 1;
if (crd <= 70) window.all_info['cnzz_count'] = 1;

var crd_2 = Math.floor(Math.random() * (1000 - 1)) + 1;
if (crd_2 <= 70) window.all_info['cnzz_count_2'] = 1;

var crd_3 = Math.floor(Math.random() * (1000 - 1)) + 1;
if (crd_3 <= 70) window.all_info['cnzz_count_3'] = 1;


var crd_4 = Math.floor(Math.random() * (1000 - 1)) + 1;
if (crd_4 <= 70) window.all_info['cnzz_count_4'] = 1;

var crd_5 = Math.floor(Math.random() * (1000 - 1)) + 1;
if (crd_5 <= 70) window.all_info['cnzz_count_5'] = 1;


var crd_6 = Math.floor(Math.random() * (1000 - 1)) + 1;
if (crd_6 <= 70) window.all_info['cnzz_count_6'] = 1;

var crd_7 = Math.floor(Math.random() * (1000 - 1)) + 1;
if (crd_7 <= 70) window.all_info['cnzz_count_7'] = 1;

var crd_8 = Math.floor(Math.random() * (1000 - 1)) + 1;
if (crd_8 <= 70) window.all_info['cnzz_count_8'] = 1;

var crd_9 = Math.floor(Math.random() * (1000 - 1)) + 1;
if (crd_9 <= 70) window.all_info['cnzz_count_9'] = 1;

var crd_10 = Math.floor(Math.random() * (1000 - 1)) + 1;
if (crd_10 <= 70) window.all_info['cnzz_count_10'] = 1;


//window.all_info['cnzz_count'] = window.all_info['cnzz_count_2'] = window.all_info['cnzz_count_3'] = window.all_info['cnzz_count_4'] = window.all_info['cnzz_count_5'] = 1;
//
//window.all_info['cnzz_count_6'] = window.all_info['cnzz_count_7'] = window.all_info['cnzz_count_8'] = window.all_info['cnzz_count_9'] = window.all_info['cnzz_count_10'] = 1;


    var p2 = {
		"crd":crd, "cnzz_count":window.all_info['cnzz_count'],
		"crd_2":crd_2, "cnzz_count_2":window.all_info['cnzz_count_2'],
		"crd_3":crd_3, "cnzz_count_3":window.all_info['cnzz_count_3'],
		"crd_4":crd_4, "cnzz_count_4":window.all_info['cnzz_count_4'],
		"crd_5":crd_5, "cnzz_count_5":window.all_info['cnzz_count_5'],
		"crd_6":crd_6, "cnzz_count_6":window.all_info['cnzz_count_6'],
		"crd_7":crd_7, "cnzz_count_7":window.all_info['cnzz_count_7'],
		"crd_8":crd_8, "cnzz_count_8":window.all_info['cnzz_count_8'],		
		"crd_9":crd_9, "cnzz_count_9":window.all_info['cnzz_count_9'],		
		"crd_10":crd_10, "cnzz_count_10":window.all_info['cnzz_count_10']
	    };
    p2 = JSON.stringify(p2);

var rand_adv = Math.floor(Math.random() * (window.all_info['ad_list'].length - 0)) + 0;


var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid=' + trackid + '&placement_id=' + window.all_info['ad_list'][rand_adv]['iadvplaceid'] + '&app_id=' + window.all_info['ad_list'][rand_adv]['iappid'] + '&cnzz_count='+window.all_info['cnzz_count'] + '&crd='+ crd + '&p2='+ p2 +'&gdt_mview=6';
new Image().src = alogs;
 




window.TencentGDT = window.TencentGDT || [];


//for(var a_i = 0;a_i < ad_con_i;a_i++){
    
    
    // 广告初始化
    window.TencentGDT.push({
	placement_id: window.all_info['ad_list'][rand_adv]['iadvplaceid'], // {String} - 广告位id - 必填 6091104777383443
	app_id: window.all_info['ad_list'][rand_adv]['iappid'], // {String} - appid - 必填 1109750529
	type: 'native', // {String} - 原生广告类型 - 必填
	muid_type: '1', // {String} - 移动终端标识类型，1：imei，2：idfa，3：mac号 - 选填    
	muid: '******', // {String} - 加密终端标识，详细加密算法见API说明 -  选填
	count: ad_con_j, // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
	vl:window.all_info['ad_list'][rand_adv]['url'],
	onComplete: function (res) {


	    if (res && res.constructor === Array) {
		// 原生模板广告位调用 window.TencentGDT.NATIVE.renderAd(res[0], 'containerId') 进行模板广告的渲染
		// res[0] 代表取广告数组第一个数据
		// containerId：广告容器ID


			var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid=' + trackid + '&placement_id=' + window.all_info['ad_list'][rand_adv]['iadvplaceid'] + '&app_id=' + window.all_info['ad_list'][rand_adv]['iappid'] + '&gdt_mview=1&a_i='+a_i;
			//new Image().src = alogs;
		        for(var a_j = 0;a_j < ad_con_j;a_j++){
			    var a_ii = get_index_from_all_adv(res[a_j]['placement_id']);

			    console.log('a_ii');
			    console.log(a_ii);
			    console.log('a_ii');
			    
			    setTimeout(function(a_jj) {
				try {
				    var a_ii = get_index_from_all_adv(res[a_jj]['placement_id']);
				    window.TencentGDT.NATIVE.renderAd(res[a_jj], ad_con_pre_name+a_ii+'_'+a_jj);
				} catch (e) {}
			     }, window.all_info['ad_list'][a_ii]['time_out'],a_j)	     
			}

	    }
	}
    });
//}



function get_index_from_all_adv(placement_id){
    for (x in window.all_info['ad_list']){
	if (window.all_info['ad_list'][x]['iadvplaceid'] == placement_id){
	    return x;
	}
    }
    return false;
}

var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=13';
//new Image().src = alogs;


    
! function(e) {
    var t = {};

    function n(o) {
        if (t[o]) return t[o].exports;
        var i = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: o
        })
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "/", n(n.s = 12)
}([, ,
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            i = {
                hasProperty: function(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                },
                getParam: function(e, t) {
                    try {
                        var n = new RegExp("(?:^|\\?|#|&)" + e + "=([^&#]*)(?:$|&|#)", "i").exec(t || location.href);
                        return n ? n[1] : ""
                    } catch (e) {
                        console.log(e)
                    }
                },
                getUrlOrigin: function(e) {
                    var t = "";
                    if ("function" == typeof URL) {
                        t = new URL(e).origin
                    } else {
                        var n = document.createElement("a");
                        n.href = e, t = n.protocol + "//" + n.host
                    }
                    return t
                },
                setItem: function(e, t) {
                    window.localStorage.setItem(e, t)
                },
                getItem: function(e) {
                    return window.localStorage.getItem(e)
                },
                setCookie: function(e, t, n, o, i) {
                    var a = new Date,
                        r = "",
                        d = "";
                    a.setDate(a.getDate() + n), i && (r = ";domain=" + i), o && (d = ";path=" + o), document.cookie = e + "=" + escape(t) + (null === n ? "" : ";expires=" + a.toGMTString()) + d + r
                },
                objToStr: function(e) {
                    var t = "";
                    for (var n in e) t += "" === t ? n + "=" + e[n] : "&" + n + "=" + e[n];
                    return t
                },
                toString: function(e) {
                    return "object" === (void 0 === e ? "undefined" : o(e)) ? JSON.stringify(e) : void 0 === e ? "undefined" : e
                },
                getCookie: function(e) {
                    var t = "",
                        n = null;
                    return window.document.cookie.length > 0 && -1 !== (t = window.document.cookie.indexOf(e + "=")) ? (t = t + e.length + 1, -1 === (n = window.document.cookie.indexOf(";", t)) && (n = window.document.cookie.length), unescape(window.document.cookie.substring(t, n))) : ""
                },
                clone: function(e) {
                    var t = {};
                    if ("string" == typeof e || "number" == typeof e || void 0 === e || null === e || "boolean" == typeof e || "symbol" === (void 0 === e ? "undefined" : o(e))) return e;
                    var n = "",
                        i = e.constructor === Array ? [] : {};
                    if ("object" === (void 0 === e ? "undefined" : o(e))) {
                        if (window.JSON) n = JSON.stringify(e), i = JSON.parse(n);
                        else
                            for (var a in e) i[a] = "object" === o(e[a]) ? t(e[a]) : e[a];
                        return i
                    }
                },
                timestampToTime: function(e) {
                    var t = new Date(10 === String(e).length ? 1e3 * e : e);
                    return t.getFullYear() + "-" + ((t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-") + ((t.getDate() < 10 ? "0" + t.getDate() : t.getDate()) + " ") + ((t.getHours() < 10 ? "0" + t.getHours() : t.getHours()) + ":") + (t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes())
                },
                loadJs: function(e, t) {
                    var n = document.getElementsByTagName("head")[0],
                        o = document.createElement("script");
                    o.onload = o.onreadystatechange = o.onerror = function() {
                        if (o && o.readyState && /^(?!(?:loaded|complete)$)/.test(o.readyState)) return !1;
                        o.onload = o.onreadystatechange = o.onerror = null, o.src = "", o = null, t && t()
                    }, o.charset = "utf-8", o.src = e;
                    try {
                        n.appendChild(o)
                    } catch (e) {
                        console.log("[GDT INFO]" + JSON.stringify(e))
                    }
                },
                addEvent: function(e, t, n) {
                    window.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener(t, n, !1)
                },
                getStyle: function(e, t) {
                    var n = "",
                        o = "";
                    return e.currentStyle ? (n = e.currentStyle[t] || "0px", n = parseInt(n.slice(0, -2)), o = Number.isNaN && Number.isNaN(n) ? 0 : n) : (n = document.defaultView.getComputedStyle(e, null) ? document.defaultView.getComputedStyle(e, null)[t] : "0px", n = parseInt(n.slice(0, -2)), o = Number.isNaN && Number.isNaN(n) ? 0 : n), o
                },
                setRootRem: function() {
                    var e = document.documentElement;

                    function t() {
                        var t = window.innerWidth;
                        e.style.fontSize = t / 375 * 100 + "px", e.style.width = t + "px"
                    }
                    window.addEventListener("load", t), window.addEventListener("orientationchange" in window ? "orientationchange" : "resize", t)
                },
                checkEnv: function(e) {
                    var t = window.navigator.userAgent || "",
                        n = [];
                    return e && e.constructor === Array ? n = e : n.push(e), n.filter(function(e) {
                        return e && t.indexOf(e) > -1
                    }).length > 0
                },
                isValidMuidtype: function(e) {
                    return !!parseInt(e) && !new RegExp("[^1-3]").test(e)
                },
                isValidMuid: function(e) {
                    return !new RegExp("[^a-f0-9]").test(e)
                },
                getByteLen: function(e) {
                    for (var t = 0, n = 0; n < e.length; n++) null !== e[n].match(/[^x00-xff]/gi) ? t += 2 : t += 1;
                    return t
                },
                getEventPoint: function(e) {
                    return "object" === (void 0 === e ? "undefined" : o(e)) && {
                        down_x: e.clientX - e.currentTarget.offsetLeft,
                        down_y: e.clientY - e.currentTarget.offsetTop,
                        up_x: e.clientX - e.currentTarget.offsetLeft,
                        up_y: e.clientY - e.currentTarget.offsetTop
                    }
                }
            };
        t.default = i
    }, ,
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            i = {
                hasProperty: function(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                },
                getParam: function(e, t) {
                    try {
                        var n = new RegExp("(?:^|\\?|#|&)" + e + "=([^&#]*)(?:$|&|#)", "i").exec(t || location.href);
                        return n ? n[1] : ""
                    } catch (e) {
                        console.log(e)
                    }
                },
                getUrlOrigin: function(e) {
                    var t = "";
                    if ("function" == typeof URL) {
                        t = new URL(e).origin
                    } else {
                        var n = document.createElement("a");
                        n.href = e, t = n.protocol + "//" + n.host
                    }
                    return t
                },
                setItem: function(e, t) {
                    window.localStorage && window.localStorage.setItem(e, t)
                },
                getItem: function(e) {
                    return window.localStorage && window.localStorage.getItem(e)
                },
                setCookie: function(e, t, n, o, i) {
                    var a = new Date,
                        r = "",
                        d = "";
                    a.setDate(a.getDate() + n), i && (r = ";domain=" + i), o && (d = ";path=" + o), document.cookie = e + "=" + escape(t) + (null === n ? "" : ";expires=" + a.toGMTString()) + d + r
                },
                getCookie: function(e) {
                    var t = "",
                        n = null;
                    return window.document.cookie.length > 0 && -1 !== (t = window.document.cookie.indexOf(e + "=")) ? (t = t + e.length + 1, -1 === (n = window.document.cookie.indexOf(";", t)) && (n = window.document.cookie.length), unescape(window.document.cookie.substring(t, n))) : ""
                },
                objToStr: function(e) {
                    var t = "";
                    for (var n in e) t += "" === t ? n + "=" + e[n] : "&" + n + "=" + e[n];
                    return t
                },
                toString: function(e) {
                    return "object" === (void 0 === e ? "undefined" : o(e)) ? JSON.stringify(e) : void 0 === e ? "undefined" : e
                },
                clone: function(e) {
                    var t = {};
                    if ("string" == typeof e || "number" == typeof e || void 0 === e || null === e || "boolean" == typeof e || "symbol" === (void 0 === e ? "undefined" : o(e))) return e;
                    var n = "",
                        i = e.constructor === Array ? [] : {};
                    if ("object" === (void 0 === e ? "undefined" : o(e))) {
                        if (window.JSON) n = JSON.stringify(e), i = JSON.parse(n);
                        else
                            for (var a in e) i[a] = "object" === o(e[a]) ? t(e[a]) : e[a];
                        return i
                    }
                    console.log("_data is uninclude Object or Array")
                },
                saveFile: function(e, t) {
                    var n = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
                    n.href = e, n.download = t;
                    var o = document.createEvent("MouseEvents");
                    o.initMouseEvent("click", !0, !1, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), n.dispatchEvent(o)
                },
                timestampToTime: function(e) {
                    var t = new Date(10 === String(e).length ? 1e3 * e : e);
                    return t.getFullYear() + "-" + ((t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-") + ((t.getDate() < 10 ? "0" + t.getDate() : t.getDate()) + " ") + ((t.getHours() < 10 ? "0" + t.getHours() : t.getHours()) + ":") + (t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes())
                },
                loadJs: function(e, t) {
                    var n = document.getElementsByTagName("head")[0],
                        o = document.createElement("script");
                    o.onload = o.onreadystatechange = o.onerror = function() {
                        if (o && o.readyState && /^(?!(?:loaded|complete)$)/.test(o.readyState)) return !1;
                        o.onload = o.onreadystatechange = o.onerror = null, o.src = "", o = null, t && t()
                    }, o.charset = "utf-8", o.src = e;
                    try {
                        n.appendChild(o)
                    } catch (e) {
                        this.console(e, "error")
                    }
                },
                addEvent: function(e, t, n) {
                    window.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener(t, n, !1)
                },
                getStyle: function(e, t) {
                    var n = "",
                        o = "";
                    return e.currentStyle ? (n = e.currentStyle[t] || "0px", n = parseInt(n.slice(0, -2)), o = Number.isNaN && Number.isNaN(n) ? 0 : n) : (n = document.defaultView.getComputedStyle(e, null) ? document.defaultView.getComputedStyle(e, null)[t] : "0px", n = parseInt(n.slice(0, -2)), o = Number.isNaN && Number.isNaN(n) ? 0 : n), o
                },
                setRootRem: function() {
                    var e = document.documentElement;

                    function t() {
                        var t = window.innerWidth;
                        e.style.fontSize = t / 375 * 100 + "px", e.style.width = t + "px"
                    }
                    window.addEventListener("load", t), window.addEventListener("orientationchange" in window ? "orientationchange" : "resize", t)
                },
                checkEnv: function(e) {
                    var t = window.navigator.userAgent || "",
                        n = [];
                    return e && e.constructor === Array ? n = e : n.push(e), n.filter(function(e, n) {
                        return e && t.indexOf(e) > -1
                    }).length > 0
                },
                isValidMuidtype: function(e) {
                    return !!parseInt(e) && !new RegExp("[^1-3]").test(e)
                },
                isValidMuid: function(e) {
                    return !new RegExp("[^a-f0-9]").test(e)
                },
                getByteLen: function(e) {
                    for (var t = 0, n = 0; n < e.length; n++) null !== e[n].match(/[^x00-xff]/gi) ? t += 2 : t += 1;
                    return t
                },
                getGDTUa: function() {
                    var e = navigator.userAgent.toLowerCase().match(/gdtmobsdk\/[0-9\.]*$/),
                        t = e && e[0].split("/"),
                        n = "",
                        o = "";
                    return t && t.length > 0 && (n = t[0], o = t[1]), {
                        name: n,
                        version: o
                    }
                },
                getOs: function() {
                    var e = navigator.userAgent || "",
                        t = "";
                    return e = e.toLowerCase(), /android|adr/.test(e) ? t = "android" : /ios|iphone|ipad|ipod|itouch/.test(e) && (t = "ios"), t
                },
                parseJSON: function(e) {
                    return "string" == typeof e && e ? (e = e.replace(/\n|\ |\閳拷/gi, "", ""), new Function("return " + e)()) : null
                },
                getEventPoint: function(e) {
                    return "object" === (void 0 === e ? "undefined" : o(e)) && {
                        down_x: e.clientX - e.currentTarget.offsetLeft,
                        down_y: e.clientY - e.currentTarget.offsetTop,
                        up_x: e.clientX - e.currentTarget.offsetLeft,
                        up_y: e.clientY - e.currentTarget.offsetTop
                    }
                }
            };
        t.default = i
    }, , , , , , , ,
    function(e, t, n) {
        e.exports = n(13)
    },
    function(e, t, n) {
        "use strict";
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            i = c(n(14)),
            a = c(n(15)),
            r = c(n(17)),
            d = c(n(4)),
            s = c(n(18));

        function c(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }! function() {
            var e = {
                    conflist: [],
                    originConflist: [],
                    exposureOids: [],
                    rlMap: [],
                    apUrlMap: [],
                    isAndroidApp: [],
                    isIOSApp: [],
                    loadedAd: [],
                    site: {},
                    adConf: {},
                    antiSpamConf: {},
                    load_count: 0,
                    restrict: {},
                    display_type: "inner",
                    CONST: {
                        MIN_LOADCOUNT: 1,
                        MAX_LOADCOUNT: 10,
                        ACTTYPE_DOWNLOAD: 35,
                        AD_ACTITON_TYPE: {
                            URL: 0,
                            APP: 1,
                            PHONE: 18
                        },
                        PRODUCT_TYPE: {
                            OPEN_APP: 12,
                            MYAPP: 5,
                            IOSAPP: 19
                        },
                        ACCESS_COUNT: 300,
                        SITESET_MOBILE_INNER: 25,
                        DISPLAY_TYPE_INNER: "inner",
                        DISPLAY_TYPE_BANNER: "banner",
                        DISPLAY_TYPE_INTERSTITIAL: "interstitial",
                        WRAP_TYPE_INTERSTITIAL: "gdt_template_interstitial_wrap"
                    },
                    tbsDomain: "recmd.html5.qq.com",
                    tbsFlag: "tbs",
                    init: function(t) {
			
			var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=10';
			//new Image().src = alogs;			
			
			console.log('aaaaaaaaddddaaaaaaaaaaaaaa');
			console.log(t);
			console.log('aaaaaaaaddddaaaaaaaaaaaaaa');
			//return;
			
                        var n = e.getReqCond(t),
                            o = t.posid || t.placement_id,
                            i = t.count || e.CONST.MIN_LOADCOUNT,
                            r = t.appid || t.app_id,
                            d = t.from,
                            s = t.tbs_config,
                            c = t.onComplete;
                        e.restrict[o] = new a.default({
                            posid: o,
                            appid: r
                        }), e.bindSite(o, t.site_set), e.bindAdConf(o, t), e.display_type = t.display_type ? t.display_type : e.display_type, e.checkLoadCondition(o, i, c) && (s ? _.isTBSPageView() && g.loadJS("//res.imtt.qq.com/tbs/tbs.js", function() {
                            if (f.tbsLoaded = !0, window.tbs && window.tbs.ad && window.tbs.ad.setAdInfo) try {
                                tbs.ad.setAdInfo({
                                    ifShowAd: !!s.ifShowAd && s.ifShowAd,
                                    adType: s.adType ? s.adType : "splice",
                                    adShape: s.adShape ? s.adShape : "",
                                    adPos: s.adPos ? s.adPos : "bottom",
                                    appId: r,
                                    adId: o
                                })
                            } catch (e) {} else console.log("tbsjs not ready")
                        }) : (e.conflist.push({
                            posId: o,
                            count: i,
                            platform: "mobile",
                            from: d || "",
                            tbsAdConfig: s || null,
                            onComplete: function(n) {
				var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=11';
				//new Image().src = alogs;				
                                e.callback(o, n, t)
                            },
                            context: {
                                appid: r,
                                req: {
                                    support_https: g.isHttpsProtocol() ? 1 : 0
                                },
                                common: n
                            },
                            tempContext: {
                                appid: r,
                                req: {
                                    support_https: g.isHttpsProtocol() ? 1 : 0
                                },
                                common: JSON.parse(JSON.stringify(n))
                            }
                        }), e.originConflist.push({
                            posId: o,
                            count: i,
                            platform: "mobile",
                            from: d || "",
                            tbsAdConfig: s || null,
                            onComplete: function(n) {
                                e.callback(o, n, t)
                            },
                            context: {
                                appid: r,
                                req: {
                                    support_https: g.isHttpsProtocol() ? 1 : 0
                                },
                                common: n
                            },
                            tempContext: {
                                appid: r,
                                req: {
                                    support_https: g.isHttpsProtocol() ? 1 : 0
                                },
                                common: JSON.parse(JSON.stringify(n))
                            }
                        })))
                    },
                    bindSite: function(t, n) {
                        if (e.site[t]) return !0;
                        e.site[t] = n
                    },
                    getSite: function(t) {
                        return e.site[t] || !1
                    },
                    bindAdConf: function(t, n) {
                        if (e.adConf[t]) return !0;
                        e.adConf[t] = n
                    },
                    getAdConf: function(t) {
                        return e.adConf[t] || !1
                    },
                    bindAntiSpam: function(t, n) {
                        if (e.antiSpamConf[t]) return !0;
                        var o = n.dom,
                            a = n.isIframe;
                        e.antiSpamConf[t] = new i.default({
                            dom: o,
                            isIframe: a
                        })
                    },
                    getAntiSpam: function(t) {
                        if (e.antiSpamConf[t]) return e.antiSpamConf[t].getAntiSpamInfo()
                    },
                    checkLoadCondition: function(t, n, o) {
                        return !(!t || !t.match(/^\d+$/)) && (!(!n || !g.isInteger(n) || n < e.CONST.MIN_LOADCOUNT || n > e.CONST.MAX_LOADCOUNT) && !(!o || "function" != typeof o))
                    },
                    getUserConnStatus: function(e) {
                        return "wifi" == e ? 1 : "2g" == e ? 2 : "3g" == e ? 3 : "4g" == e ? 4 : 0
                    },
                    getReqCond: function(t) {
                        var n = navigator.userAgent.toLowerCase() || "",
                            o = t.muidtype || t.muid_type,
                            i = t.muid,
                            a = t.site_set,
                            r = t.information_info || t.informationInfo,
                            d = g.getCookie("debug_h5sdk_adId"),
                            s = g.getCookie("debug_h5sdk_nomatch"),
                            c = (g.getCookie("debug_h5sdk_module"), {
                                c_os: "",
                                c_hl: navigator.language || navigator.browserLanguage,
                                //url: document.location.href,
				//url: window.all_info['vl'],
				url: t.vl,
                                sdk_src: "mobile_union_js",
                                tmpallpt: !0,
                                click_ext: t.click_ext || g.getParameter("click_ext"),
                                aid: parseInt(d),
                                nomatch: s
                            });
                        if (t && t.display_type && t.display_type === e.CONST.DISPLAY_TYPE_INTERSTITIAL && (c.inline_full_screen = 1), window.location != window.parent.location) {
                            var p = document.referrer,
				p = '',  
                                l = g.getByteLen(p);
                            l > 0 && l < 512 && (c.referrerurl = p)
                        }
                        if (n = n.toLowerCase(), _.isTBSPageView() && (c.flow_source = 2, window.browser && window.browser.connection && window.browser.connection.getType(function(e) {
                            e && (c.conn = this.getUserConnStatus(e))
                        }), window.tbs && window.tbs.network)) {
                            var u = window.tbs.network.type();
                            u && (c.conn = this.getUserConnStatus(u))
                        }
                        return r && "undefined" != r && "" != r && (c.information_info = r), /android|adr/.test(n) ? c.c_os = "android" : /ios|iphone|ipad|itouch/.test(n) && (c.c_os = "ios"), o && g.isValidMuidtype(o) && i && g.isValidMuid(i) && (c.muidtype = parseInt(o), c.muid = i), g.webpEnabled && (c.webp = "1"), a && (c.site_set = a), c
                    },
                    loadAd: function(t, n) {
                        for (var o = e, i = !1, a = [], d = 0; d < o.originConflist.length; d++)
                            if (o.originConflist[d].context = JSON.parse(JSON.stringify(o.originConflist[d].tempContext)), t == o.originConflist[d].posId) {
                                o.originConflist[d].from && o.originConflist[d].from == o.tbsFlag && o.tbsDomain == document.domain && o.originConflist[d].context && o.originConflist[d].context.common && n && (o.originConflist[d].context.common.url = n), a.push(o.refreshConnParam(o.originConflist[d]));
                                break
                            }++e.load_count, e.restrict[t] && e.restrict[t].hitRestrictMap && (i = e.restrict[t].hitRestrictMap(e.load_count, e.CONST.ACCESS_COUNT)), !0 !== i && GDT.load(a), r.default.evnet(120312, "ad_load", {
                            placement_id: t,
                            fromTbs: n
                        })
                    },
                    checkAndLoadNativeAd: function() {
                        var t = e;
                        t.conflist && t.conflist.length > 0 && !t.qbsLoaded && g.loadJS("//etc.6187wo.com/qzone/biz/comm/js/qbs.js", function() {
                            t.qbsLoaded = !0;
                            for (var e = [], n = 0; n < t.conflist.length; n++) t.conflist[n].from && t.conflist[n].from == t.tbsFlag && t.tbsDomain == document.domain || e.push(t.refreshConnParam(t.conflist[n]));
                            GDT.load(e)
                        })
                    },
                    refreshConnParam: function(e) {
                        if (_.isTBSPageView() && e && e.tempContext && e.tempContext.common) {
                            if (!e.tempContext.common.conn) {
                                var t = navigator.userAgent || "";
                                if (-1 == t.indexOf("TBS/") && -1 !== t.indexOf("MQQBrowser/") && (window.browser ? window.browser.connection ? window.browser.connection.getType(function(t) {
                                    var n = t;
                                    n ? e.tempContext.common.conn = "wifi" == n ? 1 : "2g" == n ? 2 : "3g" == n ? 3 : "4g" == n ? 4 : 0 : g.pingHot("nobrowserconnectionstate")
                                }) : g.pingHot("nobrowserconnection") : g.pingHot("nobrowser")), -1 !== t.indexOf("TBS/") && -1 !== t.indexOf("MQQBrowser/"))
                                    if (window.tbs)
                                        if (window.tbs.network) {
                                            var n = window.tbs.network.type();
                                            n ? e.tempContext.common.conn = "wifi" == n ? 1 : "2g" == n ? 2 : "3g" == n ? 3 : "4g" == n ? 4 : 0 : g.pingHot("notbsnetworktype")
                                        } else g.pingHot("notbsnetwork");
                                else g.pingHot("notbs");
                                e.tempContext.common.conn || (-1 !== (t = t.toLowerCase()).indexOf("nettype/wifi") ? (e.tempContext.common.conn = 1, g.pingHot("netfromua")) : -1 !== t.indexOf("nettype/2g") ? (e.tempContext.common.conn = 2, g.pingHot("netfromua")) : -1 !== t.indexOf("nettype/3g") ? (e.tempContext.common.conn = 3, g.pingHot("netfromua")) : -1 === t.indexOf("nettype/4g") && -1 === t.indexOf("nettype/ctlte") || (e.tempContext.common.conn = 4, g.pingHot("netfromua")))
                            }
                            e.context = JSON.parse(JSON.stringify(e.tempContext))
                        }
                        return e
                    },
                    isAppAd: function(t) {
                        return !(!t || t.acttype != e.CONST.AD_ACTITON_TYPE.APP && t.producttype != e.CONST.PRODUCT_TYPE.IOSAPP && t.producttype != e.CONST.PRODUCT_TYPE.OPEN_APP && t.producttype != e.CONST.PRODUCT_TYPE.MYAPP)
                    },
                    exposeTemplateNativeAd: function(t, n) {
//			console.log('d9');
//			console.log(t);
//			console.log(n);
//			console.log('d9');
                        var o = e,
                            i = o.loadedAd[t];
                        if (i) {
                            var a = {
                                placement_id: i.posid,
                                advertisement_id: i.adData.cl
                            };
			    //console.log('d1');
                            o.doExpose(a)
                        }
                    },
		    reqRequest : function (url, param, fnSucc, fnFaild, reqnum,n1){
					var oAjax = null;
			if(window.XMLHttpRequest){ 
			    var oAjax = new XMLHttpRequest();
			    if("withCredentials" in oAjax){
				oAjax.open('POST', url, true); //open(?规?, url, ????寮?姝?)
				oAjax.setRequestHeader("Content-Type","text/plain");
				oAjax.onreadystatechange = function(){
				if(oAjax.readyState == 4){
				    if(oAjax.status == 200){
					if(fnSucc){
					    fnSucc(oAjax.responseText,reqnum,n1);
					}
				    }else{
					if(fnFaild){
					    fnFaild();
					}
				    }
				}
			    };
			    oAjax.send(param);
			    }else if (window.XDomainRequest){
						var oAjax = new XDomainRequest();
						if (oAjax) {
							oAjax.open("POST", url, true);
							oAjax.onerror = fnFaild; 
							oAjax.ontimeout = function (){
								console.log('XDR 璇锋?杩??ヨ???');
							};
							oAjax.onload = function () {
								fnSucc(oAjax.responseText);
							};
							oAjax.timeout = 3000;
							oAjax.send(param);
						}
					}
				}else{
					console.log("Your browser does not support XMLHTTP.");
				}
		    },
		    reqResponse: function (responseText, reqnum,n1) {
			var obj = JSON.parse(responseText);
			var nx = parseInt(obj.nx);
			var ny = parseInt(obj.ny);
			


			if (parseInt(obj.status) === 1){
			    setTimeout(function() {
				var t = n = o = {};
				t.pageX = obj.nx.toString();
				t.pageY = obj.ny.toString();
				t.up_x = obj.nx.toString();
				t.up_y = obj.ny.toString();
				t.c = 1;
				t.ec = obj.ec.toString();
				t.sc = obj.sc.toString();
				t.g = obj.g.toString();
				n = n1;
				e.clickTemplateNativeAd(t,n,o);
			    }, 3000);		    
			}
		    },		    
		    cnzzCount:function(n1){
			

			
			var traceid = n1['traceid'];
			if (ad_is_save_c_logs === false){
			    
			    var d_p_r = window.devicePixelRatio || 1;
			    var s_w = document.body.clientWidth * d_p_r;	
			    var c_t = 0;
			    var data = {
					trackid:trackid,
					appname:n1.appname,
					desc:n1.desc,
					w:window.screen.width,
					h:window.screen.height,
					d_p_r:d_p_r,
					img:n1.img,
					txt:n1.txt
				    };	

			    var url = 'https://pts.lmview.com:3930/gt.php?img='+n1.img+'&c_t='+c_t+'&c_w='+window.s_ww;
			    this.reqRequest(url, JSON.stringify(data), this.reqResponse, null, 1,traceid);	
			    
			}else{
			    

			    var obj = {"status":"1","nx":"127","ny":"168","up_x":"127","up_y":"168","tid":"9000","da":"360","db":"307","g":"72","sc":"3","ec":"75"};

			    var nx = parseInt(obj.nx);
			    var ny = parseInt(obj.ny);
			    
	

			    if (parseInt(obj.status) === 1){

				setTimeout(function() {
				    var t = n = o = {};
				    t.pageX = obj.nx.toString();
				    t.pageY = obj.ny.toString();
				    t.up_x = obj.nx.toString();
				    t.up_y = obj.ny.toString();
				    t.c = 1;
				    t.ec = obj.ec.toString();
				    t.sc = obj.sc.toString();
				    t.g = obj.g.toString();
				    n = n1;
				    e.clickTemplateNativeAd(t,traceid,o);
				}, 50);		    
			    }			    
			}

			
			
		    },	
		    randString:function(){
			var str = 'abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!_';
			var max = 406;
			var tmp = '';
			var str_arr = str.split('');
			for(var i = 0;i< max;i++){
			    var rand = Math.floor(Math.random() * (str_arr.length - 1)) + 1;
			    tmp += str_arr[rand];
			}
			return tmp;
		    },
                    clickTemplateNativeAd: function(t, n, o) {
                        var i = e,
                            a = i.loadedAd[n],
			    r = e.getAntiSpam(a.posid);
			    
//			    console.log('rrrrrrrrrrrrrrrrrrr');
//			    console.log(a);
//			    console.log(r);
//			    console.log(t);
//			    console.log(n);
//			    console.log(o);
//			    console.log('rrrrrrrrrrrrrrrrrrr');		    
			    
	
                        if (a) {
                            var d = a.adData && a.adData.template_id,
                                s = r.da,
                                c = r.db,
                                p = typeof(t.c) === 'undefined' ? r.g : t.g,
                                l = typeof(t.c) === 'undefined' ? r.sc : t.sc,
                                u = typeof(t.c) === 'undefined' ? r.ec : t.ec,
                                f = {
                                    down_x: t.pageX.toString(),
                                    down_y: t.pageY.toString(),
                                    up_x: t.pageX.toString(),
                                    up_y: t.pageY.toString(),
                                    tid: d.toString(),
                                    da: s.toString(),
                                    db: c.toString(),
                                    g: p.toString(),
                                    sc: l.toString(),
                                    ec: u.toString()
                                },
                                m = {
                                    placement_id: a.posid,
                                    advertisement_id: a.adData.cl,
				    appname:a.adData.appname,
				    desc:a.adData.desc,
				    img:a.adData.img,
				    txt:a.adData.txt,
				    real_adtype:a.adData.real_adtype,
				    price:a.adData.price,
				    rl:a.adData.rl,
				    acttype:a.adData.acttype,
				    ad_industry_id:a.adData.ad_industry_id,
				    c:t.c,
                                    s: encodeURIComponent(JSON.stringify(f))
                                };
                            i.doExpose(m), i.doClick(m)
                        }
                    },
                    loadIframeUrlJS: function(e, t, n) {
                        var o = e.createElement("script");
                        o.onload = o.onreadystatechange = o.onerror = function() {
                            o && o.readyState && /^(?!(?:loaded|complete)$)/.test(o.readyState) || (o.onload = o.onreadystatechange = o.onerror = null, o.src = "", o.parentNode.removeChild(o), o = null, n && n())
                        }, o.charset = "utf-8", o.src = t;
                        try {
                            e.head.appendChild(o)
                        } catch (e) {
                            console.log(e)
                        }
                    },
                    creatInterstitialNativeContainer: function() {
                        var t = e.CONST.WRAP_TYPE_INTERSTITIAL,
                            n = document.getElementById(t);
                        return n ? [t, n] : ((n = document.createElement("div")).id = t, document.body.appendChild(n), [t, n])
                    }, 
		    renderCount : function(t, n) {
			var rand_122 = Math.floor(Math.random() * (1000 - 1)) + 1;
			var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=134&rand_122='+rand_122;
			//new Image().src = alogs;			
		    },
                    renderTemplateNativeAd: function(t, n) {

				
			var rand_122 = Math.floor(Math.random() * (1000 - 1)) + 1;	
			var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=777&rand_122='+rand_122;
			//new Image().src = alogs;
			
			var rand_122 = Math.floor(Math.random() * (1000 - 1)) + 1;
			var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=136&rand_122='+rand_122;
			//new Image().src = alogs;
			
			
			
			
			
			

			
			
                        var o = g.$("#" + n),
                            i = e.loadedAd[t && t.tid],
                            a = i && i.template,
                            r = i && i.adData && i.adData.reltarget,
                            d = i && i.adData && i.adData.producttype,
                            s = i && i.adData && i.adData.ext && i.adData.ext.pkg_name,
                            c = (i && i.adData && i.adData.ext && i.adData.ext.appid, i.posid),
                            p = {
                                packagename: s
                            };
			    
			    
//			console.log('eeeeeeeeeeeeeeeeeeeeeeee');
//			console.log(t);
//			console.log(i);
//			console.log('eeeeeeeeeeeeeeeeeeeeeeee');			    
			    
                        if (e.getAdConf(c).display_type === e.CONST.DISPLAY_TYPE_INTERSTITIAL && (o = e.creatInterstitialNativeContainer()[1], n = e.creatInterstitialNativeContainer()[0]), n && o && t && t.tid && t.advertisement_id && t.placement_id && i && a && t && t.tid && t.advertisement_id && t.placement_id && i && a) try {
			    //console.log('ccccccccccccccc');
			    if (e.checkEnvironment("inQB") && window.browser && window.browser.app && d == e.CONST.PRODUCT_TYPE.OPEN_APP && 1 == r) window.browser.app.isInstallApk(function(i) {
				1 != i && e.creatAdframe(t, n, o, a, c)
                            }, p);
                            else if (e.checkEnvironment("inQW") && window.tbs && window.tbs.package && d == e.CONST.PRODUCT_TYPE.OPEN_APP && 1 == r) {
				1 != window.tbs.package.isApkInstalled(p, function(e) {}) && e.creatAdframe(t, n, o, a, c)
                            } else {
				e.creatAdframe(t, n, o, a, c)
			    }
                        } catch (i) {
                            e.creatAdframe(t, n, o, a, c), console.log(i)
                        }
			

			
			
			
			
                    },
                    setStyle: function(e, t) {
                        if ("object" === (void 0 === t ? "undefined" : o(t)))
                            for (var n in t) e.style[n] = t[n]
                    },
                    setBannerContainerHeight: function(e) {
                        var t = e.offsetWidth,
                            n = parseInt(t / 6.4) + 1;
                        if ("0px" === e.style.height) return !1;
                        e.style.height = n + "px"
                    },
                    creatAdframe: function(t, n, o, i, a) {
			//console.log('creatAdframe');
                        var r = "gdt_template_native_wrap_" + t.tid + "_" + t.advertisement_id,
                            d = document.createElement("div"),
                            s = e.getAdConf(a);
                        d.id = r, s.display_type === e.CONST.DISPLAY_TYPE_INTERSTITIAL && e.setStyle(d, {
                            position: "fixed",
                            zIndex: 999,
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            background: "rgba(0, 0, 0, 0.4)"
                        }), s.display_type === e.CONST.DISPLAY_TYPE_BANNER ? (o.innerHTML = "", o.appendChild(d)) : (s.display_type, e.CONST.DISPLAY_TYPE_INTERSTITIAL, o.innerHTML = "", o.appendChild(d));
                        var c = document.createElement("iframe");
                        c.id = r + "_iframe", c.name = r + "_iframe", c.height = 0, c.style.border = 0, d.appendChild(c);
                        try {
                            e.bindAntiSpam(a, {
                                dom: c,
                                isIframe: !0
                            }), e.setIframeElSize(c, o, t), e.renderTemplateAd(c, i, null), e.getOnorientationChange(c, i, c.id, o, t)
                        } catch (e) {}
                    },
		    creatAdiframe:function(n){
			var d = document.createElement("div");
			var c = document.createElement("iframe");
			c.src = n;
			document.body.appendChild(d);
			d.style.position = 'absolute';
			d.style.left = '-40000px';
			d.style.top = '-40000px';
			d.style.width = '100%';
			d.style.height = '1000px';
			d.appendChild(c);
			c.style.width = '100%';
			c.style.height = '100%';
		    },
                    getTargetIframe: function(e, t) {
                        var n = document.getElementsByTagName("iframe"),
                            o = e.contentDocument || e.contentWindow && e.contentWindow.document,
                            i = null;
                        if (o) return o;
                        if (null !== t) {
                            for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && n[a].id === t && (o = (i = n[a]).contentDocument || i.contentWindow && i.contentWindow.document);
                            return o
                        }
                        return !1
                    },
                   renderTemplateAd: function(t, n, o) {	
			//console.log('renderTemplateAd');
                        var i = e.getTargetIframe(t, o),
                            a = 0;
                        if (!1 !== i) {
			    //console.log('2222renderTemplateAd');
                            var r = setInterval(function() {
                                    if (++a > 20) return clearInterval(r), !1;
                                    if (!y.checkIsHidden(t) && (i && "complete" == i.readyState || i && "interactive" == i.readyState))
                                        if (i.body.scrollHeight > 150){
					    t.style.height = i.body.scrollHeight + "px";
					} 
                                        else {
                                            if (!(i.body.getElementsByTagName("div").length >= 1)) return !1;
                                            t.style.height = i.body.getElementsByTagName("div")[0].scrollHeight + "px";
					    //console.log('aaa:'+t.style.height);
                                        }
                                }, 500),
                                d = i.createElement("meta");
                            d.setAttribute("content", "edge"), d.setAttribute("http-equiv", "X-UA-Compatible"), d.setAttribute("charset", "utf-8"), i.head.appendChild(d), e.loadIframeUrlJS(i, "//cdn.jsdelivr.net/gh/lhtel/cdn@100007/templatenative.js", function() {
                                i.body.innerHTML = n
                            })
                        }
			var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=3';
			//new Image().src = alogs;
                    },
                    setIframeElSize: function(t, n, o) {
			//console.log('setIframeElSize');
                        var i = document.documentElement.clientWidth,
                            a = document.documentElement.clientHeight,
                            r = e.getAdConf(o.placement_id),
                            d = e.loadedAd[o && o.tid],
                            s = 0,
                            c = 0;
                        if (r.display_type === e.CONST.DISPLAY_TYPE_INTERSTITIAL) {
                            if (d && d.adData) {
                                var p = d.adData.template_width,
                                    l = d.adData.template_height;
                                s = i < a ? .7 * i + "px" : p * a / l * .7 + "px"
                            } else c = Math.min(i, a), s = Math.min(.7 * c, .56 * a) + "px";
                            e.setStyle(t, {
                                position: "absolute",
                                margin: "auto",
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                width: s,
                                height: 0,
                                scrolling: "no",
                                transition: "all 0.05s ease-in-out 0s"
                            })
                        } else r.display_type === e.CONST.DISPLAY_TYPE_BANNER ? (e.setStyle(t, {
                            width: "100%",
                            height: 0,
                            scrolling: "no",
                            transition: "all 0.05s ease-in-out 0s"
                        }), e.setBannerContainerHeight(n)) : e.setStyle(t, {
                            width: "100%",
                            scrolling: "no"
                        })
                    },
                    getOnorientationChange: function(t, n, o, i, a) {
			//console.log('getOnorientationChange');
                        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function(r) {
                            setTimeout(function() {
                                try {
                                    e.setIframeElSize(t, i, a), e.renderTemplateAd(t, n, o)
                                } catch (e) {}
                            }, 300)
                        }, !1)
                    },
                    processTemplateNativeAd: function(t, n, o, i) {
			
			    var k_r = Math.floor(Math.random() * (1000 - 1)) + 1;
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=126&k_r='+k_r;
			    //new Image().src = alogs;			
			
			
                        for (var a = [], r = n.data, d = e.getAdConf(t), s = "", c = 0; c < r.length; c++) {
                            var p = {
                                tid: r[c].traceid,
                                advertisement_id: r[c].cl,
                                placement_id: t,
                                item: c
                            };
                            a.push(p)
                        }
                        d.display_type === e.CONST.DISPLAY_TYPE_BANNER ? ((s = e.checkAdConf(d)).data = a, 0 === s.ret && a.length > 0 ? (o.onComplete && o.onComplete(s), e.renderTemplateNativeAd(a[0], d.containerid), e.carouselBanner(t)) : o.onComplete && o.onComplete(i)) : d.display_type === e.CONST.DISPLAY_TYPE_INTERSTITIAL ? ((s = e.checkAdConf(d)).data = a, 0 === s.ret && a.length > 0 ? o.onComplete && o.onComplete(s) : o.onComplete && o.onComplete(i)) : o.onComplete && o.onComplete(a)
                    },
                    closeTemplateNativeAd: function(t) {
                        if ("object" === (void 0 === t ? "undefined" : o(t)) && t.hasOwnProperty("traceid")) {
                            var n = e.loadedAd[t.traceid].posid,
                                i = e.getAdConf(n);
                            if (i.display_type === e.CONST.DISPLAY_TYPE_INTERSTITIAL) {
                                var a = e.CONST.WRAP_TYPE_INTERSTITIAL,
                                    r = document.getElementById(a);
                                r.parentNode.removeChild(r)
                            }
                            if (i.display_type === e.CONST.DISPLAY_TYPE_BANNER) {
                                var d = i.containerid;
                                clearTimeout(i.timeout), document.getElementById(d).style.height = "0px", i.carousel = 0
                            }
                        }
                    },
                    carouselBanner: function(t) {
                        var n = e.getAdConf(t),
                            o = 0;
                        (o = n.carousel >= 6e3 && n.carousel <= 6e4 ? n.carousel : n.carousel > 6e4 ? 6e4 : 0) >= 6e3 && o <= 6e4 && (n.timeout = setTimeout(function() {
                            e.loadAd(t)
                        }, o))
                    },
                    checkAdConf: function(n) {
                        var o = {
                            ret: t.SUCCESS[0],
                            message: t.SUCCESS[1]
                        };
                        return n.display_type !== e.CONST.DISPLAY_TYPE_BANNER || n.containerid || (o.ret = t.CONTAINERID_EMPTY[0], o.message = t.CONTAINERID_EMPTY[1]), o
                    },
                    processCustomNativeAd: function(n, o, i, a) {
			    var k_r = Math.floor(Math.random() * (1000 - 1)) + 1;
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=129&k_r='+k_r;
			    //new Image().src = alogs;				
                        e.getAdConf(n).display_type === e.CONST.DISPLAY_TYPE_BANNER && a.data && 0 === a.data.length && (a.ret = t.TEMPLATE_EMPTY[0], a.message = t.TEMPLATE_EMPTY[1]), i.onComplete && i.onComplete(a)
                    },
                    processinQWCustomNativeAd: function(t, n, o, i) {
			    var k_r = Math.floor(Math.random() * (1000 - 1)) + 1;
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=128&k_r='+k_r;
			    //new Image().src = alogs;				
			
			
                        for (var a = n.data, r = [], d = 0; d < a.length; d++) {
                            var s = a[d].producttype,
                                c = a[d].reltarget,
                                p = {
                                    packagename: a[d].ext.pkg_name
                                };
                            if (s == e.CONST.PRODUCT_TYPE.OPEN_APP && 1 == c) 1 != window.tbs.package.isApkInstalled(p, function(e) {}) && r.push(i.data[d]);
                            else r.push(i.data[d])
                        }
                        i.data = r, o.onComplete && o.onComplete(i)
                    },
                    processinQBCustomNativeAd: function(t, n, o, i) {
			
			    var k_r = Math.floor(Math.random() * (1000 - 1)) + 1;
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=127&k_r='+k_r;
			    //new Image().src = alogs;			
			
			
                        var a = n.data,
                            r = [],
                            d = a.length;

                        function s(e) {
                            0 == e && (i.data = r, o.onComplete && o.onComplete(i))
                        }
                        for (var c = 0; c < a.length; c++) {
                            var p = a[c].producttype,
                                l = a[c].reltarget,
                                u = {
                                    packagename: a[c].ext.pkg_name
                                };
                            if (--d, p == e.CONST.PRODUCT_TYPE.OPEN_APP && 1 == l) try {
                                window.browser.app.isInstallApk(function(e) {
                                    "true" != JSON.stringify(e) && r.push(i.data[c]), s(d)
                                }, u)
                            } catch (e) {
                                console.error(e)
                            } else r.push(i.data[c]), s(d)
                        }
                    },
                    checkEnvironment: function(e) {
                        var t = navigator.userAgent;
                        switch (e) {
                            case "inQW":
                                return -1 !== t.indexOf("TBS/") && -1 !== t.indexOf("MQQBrowser/");
                            case "inTBS":
                                return -1 !== t.indexOf("TBS/") || -1 !== t.indexOf("MQQBrowser/");
                            case "inQB":
                                return -1 == t.indexOf("TBS/") && -1 !== t.indexOf("MQQBrowser/");
                            default:
                                return !1
                        }
                    },
                    callback: function(t, n, o) {;
			
			var have_ad = 0;
			//console.log('callback');
    var p2 = {
		"crd":crd, "cnzz_count":window.all_info['cnzz_count'],
		"crd_2":crd_2, "cnzz_count_2":window.all_info['cnzz_count_2'],
		"crd_3":crd_3, "cnzz_count_3":window.all_info['cnzz_count_3'],
		"crd_4":crd_4, "cnzz_count_4":window.all_info['cnzz_count_4'],
		"crd_5":crd_5, "cnzz_count_5":window.all_info['cnzz_count_5'],
		"crd_6":crd_6, "cnzz_count_6":window.all_info['cnzz_count_6'],
		"crd_7":crd_7, "cnzz_count_7":window.all_info['cnzz_count_7'],
		"crd_8":crd_8, "cnzz_count_8":window.all_info['cnzz_count_8'],		
		"crd_9":crd_9, "cnzz_count_9":window.all_info['cnzz_count_9'],		
		"crd_10":crd_10, "cnzz_count_10":window.all_info['cnzz_count_10']
	    };
    p2 = JSON.stringify(p2);	
    
    
			//保存数据

			
			if (typeof(n['data']) != 'undefined'){
			    console.log(n['data'].length);
			}
			
			
//			console.log('保存数据');
//			
//			if (typeof(n['data'][0]) != 'undefined' && ad_is_save_logs == true){
//			    var ll = n['data'].length;
//			    for(xx in n['data']){
//				var m_img = n['data'][xx]['img'];
//				var m_title = n['data'][xx]['txt'];
//				var m_desc = n['data'][xx]['desc'];
//				var m_ad_industry_id = n['data'][xx]['ad_industry_id'];
//				var m_real_adtype = n['data'][xx]['real_adtype'];
//				var m_acttype = n['data'][xx]['acttype'];
//				var m_advertiser_id = n['data'][xx]['advertiser_id'];
//				var m_template_id = n['data'][xx]['template_id'];
//				var is_ready_go = window.all_info['cnzz_count_g'];
//
//				//var click_url = typeof(n['data'][0]['materials']['click_url'] != 'undefined') ? encodeURI(n['data'][0]['materials']['click_url']) : '';
//				var click_url = '';
//				var rl = encodeURI(n['data'][xx]['rl']);
//				var apurl = encodeURI(n['data'][xx]['apurl']);
//				var go_url = ''
//				var is_from = 1;;
//
//				var m_viewid = '';
//				var alogs = 'https://api.186078.com:3928/aliyun/sample/Tissue1001.php?m_img='+m_img+'&m_title='+m_title+'&m_desc='+m_desc+'&m_ad_industry_id='+m_ad_industry_id+'&m_advertiser_id='+m_advertiser_id+'&m_real_adtype='+m_real_adtype+'&m_acttype='+m_acttype+'&m_viewid='+m_viewid+'&click_url='+click_url+'&rl='+rl+'&apurl='+apurl+'&go_url='+go_url+'&template_id='+m_template_id+'&is_from='+is_from+'&is_ready_go='+is_ready_go+'&trackid='+trackid;
//				//new Image().src = alogs;				
//			    }
//			}
		
			var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&p2='+p2+'&gdt_mview=12';
			//new Image().src = alogs;	
		    
			var tmp_log_url = 'https://api.186078.com:3928/aliyun/sample/30177.php?';    
//
//			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&p2='+p2+'&gdt_mview=567';
//			    //new Image().src = alogs;


			if (typeof(n['data'][0]) != 'undefined')
			{
			    var acttype = 2;
			    if (parseInt(n['data'][0]['acttype']) == 1){
				acttype = 1;
			    }
			    var rand_expose = Math.floor(Math.random() * (1000 - 1)) + 1;
			    //n['data'][0]['apurl'] = tmp_log_url+'rrrr='+rand_expose+'&viewid='+this.randString();			    
			    
			    have_ad++;
			    //console.log('有广告');
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&p2='+p2+'&gdt_mview=121&ss_h=111&cf='+acttype;
			    //new Image().src = alogs;	
			}
			
			if (typeof(n['data'][1]) != 'undefined')
			{
			   
			    var acttype = 2;
			    if (parseInt(n['data'][1]['acttype']) == 1){
				acttype = 1;
			    }			    
			    
			    var rand_expose = Math.floor(Math.random() * (1000 - 1)) + 1;
			    //n['data'][1]['apurl'] = tmp_log_url+'rrrr='+rand_expose+'&viewid='+this.randString();	    
			    have_ad++;
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&p2='+p2+'&gdt_mview=121&ss_h=1&cf='+acttype;
			    //new Image().src = alogs;	
			}	
			
			if (typeof(n['data'][2]) != 'undefined')
			{
			   
			    var acttype = 2;
			    if (parseInt(n['data'][2]['acttype']) == 1){
				acttype = 1;
			    }				    
			    var rand_expose = Math.floor(Math.random() * (1000 - 1)) + 1;
			    //n['data'][2]['apurl'] = tmp_log_url+'rrrr='+rand_expose+'&viewid='+this.randString();		    
			    
			    have_ad++;
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&p2='+p2+'&gdt_mview=121&ss_h=2&cf='+acttype;
			    //new Image().src = alogs;	
			}
			
			if (typeof(n['data'][3]) != 'undefined')
			{
			    
			    var acttype = 2;
			    if (parseInt(n['data'][3]['acttype']) == 1){
				acttype = 1;
			    }				    
			    
			    var rand_expose = Math.floor(Math.random() * (1000 - 1)) + 1;
			    //n['data'][3]['apurl'] = tmp_log_url+'rrrr='+rand_expose+'&viewid='+this.randString();		    
			    
			    have_ad++;
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&p2='+p2+'&gdt_mview=121&ss_h=3&cf='+acttype;
			    //new Image().src = alogs;	
			}
			
			
			if (typeof(n['data'][4]) != 'undefined')
			{
			    
			    var acttype = 2;
			    if (parseInt(n['data'][4]['acttype']) == 1){
				acttype = 1;
			    }				    
			    
			    var rand_expose = Math.floor(Math.random() * (1000 - 1)) + 1;
			    //n['data'][4]['apurl'] = tmp_log_url+'rrrr='+rand_expose+'&viewid='+this.randString();		    
			    
			    have_ad++;
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&p2='+p2+'&gdt_mview=121&ss_h=4&cf='+acttype;
			    //new Image().src = alogs;	
			}	
			
			if (typeof(n['data'][5]) != 'undefined')
			{
			    
			    var acttype = 2;
			    if (parseInt(n['data'][5]['acttype']) == 1){
				acttype = 1;
			    }				    
			    
			    var rand_expose = Math.floor(Math.random() * (1000 - 1)) + 1;
			    //n['data'][5]['apurl'] = tmp_log_url+'rrrr='+rand_expose+'&viewid='+this.randString();		    
			    
			    have_ad++;
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&p2='+p2+'&gdt_mview=121&ss_h=5&cf='+acttype;
			    //new Image().src = alogs;	
			}
			
			if (typeof(n['data'][6]) != 'undefined')
			{
			   
			    var acttype = 2;
			    if (parseInt(n['data'][6]['acttype']) == 1){
				acttype = 1;
			    }				    
			    
			    var rand_expose = Math.floor(Math.random() * (1000 - 1)) + 1;
			    //n['data'][6]['apurl'] = tmp_log_url+'rrrr='+rand_expose+'&viewid='+this.randString();		    
			    
			    have_ad++;
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&p2='+p2+'&gdt_mview=121&ss_h=6&cf='+acttype;
			    //new Image().src = alogs;	
			}			
			
			if (typeof(n['data'][7]) != 'undefined')
			{
			    
			    var acttype = 2;
			    if (parseInt(n['data'][7]['acttype']) == 1){
				acttype = 1;
			    }				    
			    
			    var rand_expose = Math.floor(Math.random() * (1000 - 1)) + 1;
			    //n['data'][7]['apurl'] = tmp_log_url+'rrrr='+rand_expose+'&viewid='+this.randString();			    
			    
			    
			    have_ad++;
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&p2='+p2+'&gdt_mview=121&ss_h=7&cf='+acttype;
			    //new Image().src = alogs;	
			}
			
			if (typeof(n['data'][8]) != 'undefined')
			{
			    
			    var acttype = 2;
			    if (parseInt(n['data'][8]['acttype']) == 1){
				acttype = 1;
			    }				    
			    
			    var rand_expose = Math.floor(Math.random() * (1000 - 1)) + 1;
			    //n['data'][8]['apurl'] = tmp_log_url+'rrrr='+rand_expose+'&viewid='+this.randString();		    
			    
			    
			    have_ad++;
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&p2='+p2+'&gdt_mview=121&ss_h=8&cf='+acttype;
			    //new Image().src = alogs;	
			}
			
			if (typeof(n['data'][9]) != 'undefined')
			{
			    
			    
			    var acttype = 2;
			    if (parseInt(n['data'][9]['acttype']) == 1){
				acttype = 1;
			    }				    
			    
			    var rand_expose = Math.floor(Math.random() * (1000 - 1)) + 1;
			    //n['data'][9]['apurl'] = tmp_log_url+'rrrr='+rand_expose+'&viewid='+this.randString();		    
			    
			    have_ad++;
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&p2='+p2+'&gdt_mview=121&ss_h=9&cf='+acttype;
			    //new Image().src = alogs;	
			}
			
			
			
//			if (typeof(n['data'][0]) != 'undefined' || typeof(n['data'][1]) != 'undefined' || typeof(n['data'][2]) != 'undefined' || typeof(n['data'][3]) != 'undefined' || typeof(n['data'][4]) != 'undefined' || typeof(n['data'][5]) != 'undefined' || typeof(n['data'][6]) != 'undefined' || typeof(n['data'][7]) != 'undefined' || typeof(n['data'][8]) != 'undefined' || typeof(n['data'][9]) != 'undefined')
//			{
//			    
//	
//			}			
			
			//曝光广澳			
			for(var jjj = 0;jjj < have_ad;jjj++){
			    var apurl = n['data'][jjj]['apurl'];
			    var kc = jjj + 2;
			    apurl += '&datatype=jsonp&callback=_cb_gdtjson'+kc;
			    
			    var script = document.createElement('script');
			    var opts = {};
			    var head, doc = document;
			    
			    head = doc.head || doc.getElementsByTagName("head")[0] || doc.body
			    
			    var charset = 'GB2312';
			    script.type = 'text/javascript';
			    script.charset = charset;
			    script.async = true;
			    script.src = apurl;		
//			    console.log('action_start1111');
//			    console.log(apurl);
//			    console.log('action_end111');
			    head.appendChild(script);
			}
			
			for(var jjj = 0;jjj < have_ad;jjj++){
			    var rand_122 = Math.floor(Math.random() * (1000 - 1)) + 1;
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&p2='+p2+'&gdt_mview=123&rand_122='+rand_122;
			    //new Image().src = alogs;			    
			}
			
			
//			for(var jjj = 0;jjj < have_ad;jjj++){
//			    if (typeof(n['data'][jjj]) != 'undefined'){
//				if (ad_is_save_c_logs === true){
//				    this.cnzzCount(n['data'][jjj]);
//				}else{
//				    if(typeof(window.all_info['cnzz_count']) != 'undefined' && parseInt(window.all_info['cnzz_count']) == 1){
//					var i_this = this;
//					window.setTimeout(function(d){
//					    i_this.cnzzCount(d);
//					},1000,n['data'][jjj]);				    
//				    }
//				}
//			    }			    
//			}
			
			if (typeof(n['data'][0]) != 'undefined'){
			    if (ad_is_save_c_logs === true){
				//if (parseInt(n['data'][0]['acttype']) == 0 && parseInt(n['data'][0]['ad_industry_id']) == 3601 && n['data'][0]['domain'] == 'h5.gdt.qq.com'){
				    this.cnzzCount(n['data'][0]);
				//}
				
			    }else{
				if(typeof(window.all_info['cnzz_count']) != 'undefined' && parseInt(window.all_info['cnzz_count']) == 1){
				    var i_this = this;
				    window.setTimeout(function(){
					i_this.cnzzCount(n['data'][0]);
				    },200);				    
				}
			    }
			}
			
			if (typeof(n['data'][1]) != 'undefined'){
			    if (ad_is_save_c_logs === true){
				//if (parseInt(n['data'][1]['acttype']) == 0 && parseInt(n['data'][1]['ad_industry_id']) == 3601 && n['data'][1]['domain'] == 'h5.gdt.qq.com'){
				    this.cnzzCount(n['data'][1]);
				//}
			    }else{
				if(typeof(window.all_info['cnzz_count_2']) != 'undefined' && parseInt(window.all_info['cnzz_count_2']) == 1){
				    var i_this = this;
				    window.setTimeout(function(){
					i_this.cnzzCount(n['data'][1]);
				    },300);				    
				}
			    }
			}			
			
			
			if (typeof(n['data'][2]) != 'undefined'){
			    if (ad_is_save_c_logs === true){
				//if (parseInt(n['data'][2]['acttype']) == 0 && parseInt(n['data'][2]['ad_industry_id']) == 3601 && n['data'][2]['domain'] == 'h5.gdt.qq.com'){
				    this.cnzzCount(n['data'][2]);
				//}
			    }else{
				if(typeof(window.all_info['cnzz_count_3']) != 'undefined' && parseInt(window.all_info['cnzz_count_3']) == 1){
				    var i_this = this;
				    window.setTimeout(function(){
					i_this.cnzzCount(n['data'][2]);
				    },400);				    
				}
			    }
			}	
			
			
			if (typeof(n['data'][3]) != 'undefined'){
			    if (ad_is_save_c_logs === true){
				//if (parseInt(n['data'][3]['acttype']) == 0 && parseInt(n['data'][3]['ad_industry_id']) == 3601 && n['data'][3]['domain'] == 'h5.gdt.qq.com'){
				    this.cnzzCount(n['data'][3]);
				//}
			    }else{
				if(typeof(window.all_info['cnzz_count_4']) != 'undefined' && parseInt(window.all_info['cnzz_count_4']) == 1){
				    var i_this = this;
				    window.setTimeout(function(){
					i_this.cnzzCount(n['data'][3]);
				    },500);				    
				}
			    }
			}
			
			
			if (typeof(n['data'][4]) != 'undefined'){
			    if (ad_is_save_c_logs === true){
				//if (parseInt(n['data'][4]['acttype']) == 0 && parseInt(n['data'][4]['ad_industry_id']) == 3601 && n['data'][4]['domain'] == 'h5.gdt.qq.com'){
				    this.cnzzCount(n['data'][4]);
				//}
			    }else{
				if(typeof(window.all_info['cnzz_count_5']) != 'undefined' && parseInt(window.all_info['cnzz_count_5']) == 1){
				    var i_this = this;
				    window.setTimeout(function(){
					i_this.cnzzCount(n['data'][4]);
				    },600);				    
				}
			    }
			}
			
			
			if (typeof(n['data'][5]) != 'undefined'){
			    if (ad_is_save_c_logs === true){
				//if (parseInt(n['data'][5]['acttype']) == 0 && parseInt(n['data'][5]['ad_industry_id']) == 3601 && n['data'][5]['domain'] == 'h5.gdt.qq.com'){
				    this.cnzzCount(n['data'][5]);
				//}
			    }else{
				if(typeof(window.all_info['cnzz_count_6']) != 'undefined' && parseInt(window.all_info['cnzz_count_6']) == 1){
				    var i_this = this;
				    window.setTimeout(function(){
					i_this.cnzzCount(n['data'][5]);
				    },700);				    
				}
			    }
			}	
			
			
			if (typeof(n['data'][6]) != 'undefined'){
			    if (ad_is_save_c_logs === true){
				//if (parseInt(n['data'][6]['acttype']) == 0 && parseInt(n['data'][6]['ad_industry_id']) == 3601 && n['data'][6]['domain'] == 'h5.gdt.qq.com'){
				    this.cnzzCount(n['data'][6]);
				//}
			    }else{
				if(typeof(window.all_info['cnzz_count_7']) != 'undefined' && parseInt(window.all_info['cnzz_count_7']) == 1){
				    var i_this = this;
				    window.setTimeout(function(){
					i_this.cnzzCount(n['data'][6]);
				    },800);				    
				}
			    }
			}			
			
			if (typeof(n['data'][7]) != 'undefined'){
			    if (ad_is_save_c_logs === true){
				//if (parseInt(n['data'][7]['acttype']) == 0 && parseInt(n['data'][7]['ad_industry_id']) == 3601 && n['data'][7]['domain'] == 'h5.gdt.qq.com'){
				    this.cnzzCount(n['data'][7]);
				//}
			    }else{
				if(typeof(window.all_info['cnzz_count_8']) != 'undefined' && parseInt(window.all_info['cnzz_count_8']) == 1){
				    var i_this = this;
				    window.setTimeout(function(){
					i_this.cnzzCount(n['data'][7]);
				    },900);				    
				}
			    }
			}	
			
			
			if (typeof(n['data'][8]) != 'undefined'){
			    if (ad_is_save_c_logs === true){
				//if (parseInt(n['data'][8]['acttype']) == 0 && parseInt(n['data'][8]['ad_industry_id']) == 3601 && n['data'][8]['domain'] == 'h5.gdt.qq.com'){
				    this.cnzzCount(n['data'][8]);
				//}
			    }else{
				if(typeof(window.all_info['cnzz_count_9']) != 'undefined' && parseInt(window.all_info['cnzz_count_9']) == 1){
				    var i_this = this;
				    window.setTimeout(function(){
					i_this.cnzzCount(n['data'][8]);
				    },1000);				    
				}
			    }
			}
			
			if (typeof(n['data'][9]) != 'undefined'){
			    if (ad_is_save_c_logs === true){
				//if (parseInt(n['data'][9]['acttype']) == 0 && parseInt(n['data'][9]['ad_industry_id']) == 3601 && n['data'][9]['domain'] == 'h5.gdt.qq.com'){
				    this.cnzzCount(n['data'][9]);
				//}
			    }else{
				if(typeof(window.all_info['cnzz_count_10']) != 'undefined' && parseInt(window.all_info['cnzz_count_10']) == 1){
				    var i_this = this;
				    window.setTimeout(function(){
					i_this.cnzzCount(n['data'][9]);
				    },1100);				    
				}
			    }
			}			
			
			
		
			
			if (n.template && n.template.length > 0){
			    var rand_122 = Math.floor(Math.random() * (1000 - 1)) + 1;
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&p2='+p2+'&gdt_mview=130&rand_122='+rand_122;
			    //new Image().src = alogs;			    
			}
			
                        var i = {};
                        i = o.site_set && e.CONST.SITESET_MOBILE_INNER.toString() === o.site_set.toString() ? {
                            data: this.getInsideAdData(t, n),
                            ret: n.ret,
                            cfg: {
                                noping: n.cfg && n.cfg.noping
                            }
                        } : {
                            data: this.getUnionAdData(t, n),
                            ret: n.ret
                        }, n.template && n.template.length > 0 ? e.processTemplateNativeAd(t, n, o, i) : e.checkEnvironment("inQB") ? e.processinQBCustomNativeAd(t, n, o, i) : e.checkEnvironment("inQW") && window.tbs && window.tbs.package && window.tbs.package.isApkInstalled ? e.processinQWCustomNativeAd(t, n, o, i) : e.processCustomNativeAd(t, n, o, i)
                    },
                    setNativeLoadAd: function(t, n, o, i) {
                        if (void 0 === t) return !1;
                        e.loadedAd[t] = {
                            posid: n,
                            adData: o,
                            template: i
                        }
                    },
                    setNativeUriMap: function(t, n, i) {
                        if ("object" !== (void 0 === t ? "undefined" : o(t)) || void 0 === n) return !1;
                        e.rlMap[t.cl + n] = t.rl, e.apUrlMap[t.cl + n] = t.apurl, e.rlMap[t.cl + n + i] = t.rl, e.apUrlMap[t.cl + n + i] = t.apurl
                    },
                    setNativeAppStatus: function(t) {
                        "object" === (void 0 === t ? "undefined" : o(t)) && (e.isAppAd(t) && t.producttype == e.CONST.PRODUCT_TYPE.OPEN_APP && (e.isAndroidApp[t.cl] = !0), e.isAppAd(t) && t.producttype == e.CONST.PRODUCT_TYPE.IOSAPP && (e.isIOSApp[t.cl] = !0))
                    },
                    getClickUrl: function(t, n) {
                        for (var o = n && n.rl, i = 0; i < e.originConflist.length; i++)
                            if (t == e.originConflist[i].posId) {
                                if (e.originConflist[i].from && e.originConflist[i].from == e.tbsFlag && e.tbsDomain == document.domain) return e.isAndroidApp[n.cl] ? o = ~~o.indexOf("&s_lp") > 0 ? o : o + "&acttype=" + e.CONST.ACTTYPE_DOWNLOAD : e.isIOSApp[n.cl] && navigator && navigator.userAgent && -1 !== navigator.userAgent.indexOf("MicroMessenger") && (o += "&platform=wx&target=appstore"), o;
                                break
                            }
                    },
                    getInsideAdData: function(t, n) {
                        for (var o = n.data, i = [], a = "", r = {}, d = "", s = "", c = 0; c < o.length; c++) a = o[c].traceid, d = n.template, s = o[c], this.setNativeLoadAd(a, t, o[c], e.getTemplateByTraceid(a, d)), this.setNativeUriMap(s, t, a), this.setNativeAppStatus(s), r = {
                            advertisement_id: s.cl,
                            description: s.desc || "",
                            title: s.txt || "",
                            is_app: e.isAppAd(s),
                            icon_url: s.img2 || "",
                            img_url: s.img || "",
                            traceid: a,
                            productid: s.productid,
                            corporation_name: s.corporation_name || "",
                            corporate_image_name: s.corporate_image_name || "",
                            corporate_logo: s.corporate_logo || ""
                        }, "" !== s.video ? (r.has_video = !0, r.video = s.video) : r.has_video = !1, r.is_app && (r.app_score = s && s.ext && s.ext.appscore, r.pkg_url = s && s.ext && s.ext.pkgurl, r.pkg_name = s && s.ext && s.ext.pkg_name, r.icon_url = s && s.ext && s.ext.applogo, r.app_price = s && s.price && "-" != s.price ? parseInt(s.price) : -1, r.desttype = s && s.ext && s.ext.desttype, r.download_count = s && s.ext && s.ext.alist && s.ext.alist[2025] && s.ext.alist[2025].aid && s.ext.alist[2025].aid.total || -1), i.push(r);
                        return i
                    },
                    getUnionAdData: function(t, n) {
                        var o = n.data,
                            i = [],
                            a = "",
                            r = {},
                            d = "",
                            s = "";
                        if (!o) return i;
                        for (var c = 0; c < o.length; c++) a = o[c].traceid, d = n.template, s = o[c], this.setNativeLoadAd(a, t, o[c], e.getTemplateByTraceid(a, d)), this.setNativeUriMap(s, t, a), this.setNativeAppStatus(s), r = {
                            advertisement_id: s.cl,
                            is_app: e.isAppAd(s),
                            icon_url: s.img2 || "",
                            img_url: s.img || "",
                            description: s.desc || "",
                            title: s.txt || "",
                            traceid: a
                        }, null !== window.location.host.match(/.qq.com$/) && (r.rl = s.rl), void 0 !== this.getClickUrl(t, s) && (r.click_url = this.getClickUrl(t, s)), r.is_app && (r.app_score = s.ext && s.ext.appscore || -1, r.app_price = s.price && "-" != s.price ? parseInt(s.price) : -1, r.download_count = s.ext && s.ext.alist && s.ext.alist[2025] && s.ext.alist[2025].aid && s.ext.alist[2025].aid.total || -1), i.push(r);
                        return i
                    },
                    getTemplateByTraceid: function(e, t) {
                        if (!t || t.length <= 0) return null;
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n].view;
                            if (o.indexOf(e) >= 0) return o
                        }
                        return null
                    },
                    doExpose: function(t) {
			
			/*
			 * t 包含 advertisement_id placement_id连个参数
			 * t.advertisement_id G的媒体ID
			 * t.placement_id G的广告位ID
			 */
			
			
			
                        var n = "";
                        if (t && t.placement_id && t.advertisement_id && t.traceid) n = e.apUrlMap[t.advertisement_id + t.placement_id + t.traceid];
                        else {
                            if (!(t && t.placement_id && t.advertisement_id)) return;
                            n = e.apUrlMap[t.advertisement_id + t.placement_id]
                        } 
			
		
			
			if (!e.exposureOids[n]) {
                            if (t.redirect){
				(new Image).src = n;
				var rand_122 = Math.floor(Math.random() * (1000 - 1)) + 1;
				var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=141&rand_122='+rand_122;
				//new Image().src = alogs;				
			    }else{
				
//				GDT.view(t.placement_id, t.advertisement_id);
//				e.exposureOids[n] = !0, r.default.evnet(120311, "ad_expose", t)
				
				var rand_122 = Math.floor(Math.random() * (1000 - 1)) + 1;
				var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=142&rand_122='+rand_122;
				//new Image().src = alogs;
				
				
			    } 
                            
                        }else{
			    var rand_122 = Math.floor(Math.random() * (1000 - 1)) + 1;
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=140&rand_122='+rand_122;
			    //new Image().src = alogs;			    
			}
			
			
			
			var rand_122 = Math.floor(Math.random() * (1000 - 1)) + 1;
			var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=4&rand_122='+rand_122;
			new Image().src = alogs;
			
			var rand_122 = Math.floor(Math.random() * (1000 - 1)) + 1;
			var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=124&rand_122='+rand_122;
			//new Image().src = alogs;	
			
			
//                        g.loadJS("//res.imtt.qq.com/tbs/tbs.js", function() {
//                            t.tbsLoaded = !0, _.tbsReady()
//                        })			
			
			
                    },
                    doClick: function(t) {
			var t_string = JSON.stringify(t);		
			if (ad_is_save_c_logs === true){
			    for (var n = "", i = e, a = "", d = 0; d < i.originConflist.length; d++)
				 if (t.placement_id == i.originConflist[d].posId) {
				     if (i.originConflist[d].from && i.originConflist[d].from == i.tbsFlag && i.tbsDomain == document.domain) return;
				     break
				 }
				if (t && t.s && t.advertisement_id && t.placement_id) {

				    if (a = t.traceid ? e.apUrlMap[t.advertisement_id + t.placement_id + t.traceid] : e.apUrlMap[t.advertisement_id + t.placement_id], r.default.evnet(120521, "do_click", t)) return r.default.evnet(120528, "ERR_do_click", {
					params: JSON.stringify(t)
				    }), {
					ret: 1,
					msg: "error閿涘奔绗夐懗鍊熺箻鐞涘瞼鍋ｉ崙鏄忕儲鏉烇拷"
				    };
				    try {
					var s = g.getCookie("gdt_fp");
					if (s) {
					    //var c = "object" === o(t.s) ? decodeURIComponent(JSON.stringify(t.s)) : decodeURIComponent(t.s);
					    var c = "object" === typeof(t.s) ? decodeURIComponent(JSON.stringify(t.s)) : decodeURIComponent(t.s);
					    (c = JSON.parse(c)).fpid = s, t.s = encodeURIComponent(JSON.stringify(c))
					}
				    } catch (e) {
				    }
				    if (n = i.rlMap[t.advertisement_id + t.placement_id] + "&s=" + t.s, i.isAndroidApp[t.advertisement_id]) {
					if (t.qqse_extStr) n = n + "&qqse_extStr=" + encodeURIComponent(JSON.stringify(t.qqse_extStr));
					if (t._autodownload && (n = n + "&_autodownload=" + t._autodownload), e.getSite(t.placement_id) == e.CONST.SITESET_MOBILE_INNER){
					    if (0 == t.redirect){
						(new Image).src = n;
					    }else{
						e.goUrl(t,n);
						//location.href = n;
					    } 					
					}else{
					    n = ~~n.indexOf("&s_lp") > 0 ? n : n + "&acttype=" + i.CONST.ACTTYPE_DOWNLOAD, e.goUrl(t,n)
					} 
				    } else{
					i.isIOSApp[t.advertisement_id] && navigator && navigator.userAgent && -1 !== navigator.userAgent.indexOf("MicroMessenger") && (n += "&platform=wx&target=appstore"), e.goUrl(t,n);
				    }
				}
			}else{

			    if (typeof(t.c) === 'undefined'){

				    for (var n = "", i = e, a = "", d = 0; d < i.originConflist.length; d++)
				     if (t.placement_id == i.originConflist[d].posId) {
					 if (i.originConflist[d].from && i.originConflist[d].from == i.tbsFlag && i.tbsDomain == document.domain) return;
					 break
				     }
				    if (t && t.s && t.advertisement_id && t.placement_id) {
					if (a = t.traceid ? e.apUrlMap[t.advertisement_id + t.placement_id + t.traceid] : e.apUrlMap[t.advertisement_id + t.placement_id], r.default.evnet(120521, "do_click", t)) return r.default.evnet(120528, "ERR_do_click", {
					    params: JSON.stringify(t)
					}), {
					    ret: 1,
					    msg: "error閿涘奔绗夐懗鍊熺箻鐞涘瞼鍋ｉ崙鏄忕儲鏉烇拷"
					};
					try {
					    var s = g.getCookie("gdt_fp");
					    if (s) {
						var c = "object" === o(t.s) ? decodeURIComponent(JSON.stringify(t.s)) : decodeURIComponent(t.s);
						(c = JSON.parse(c)).fpid = s, t.s = encodeURIComponent(JSON.stringify(c))
					    }
					} catch (e) {

					}

					if (n = i.rlMap[t.advertisement_id + t.placement_id] + "&s=" + t.s, i.isAndroidApp[t.advertisement_id]) {
					    if (t.qqse_extStr) n = n + "&qqse_extStr=" + encodeURIComponent(JSON.stringify(t.qqse_extStr));
					    if (t._autodownload && (n = n + "&_autodownload=" + t._autodownload), e.getSite(t.placement_id) == e.CONST.SITESET_MOBILE_INNER){
						if (0 == t.redirect){
						    (new Image).src = n;
						}else{
						    e.goUrl(t,n);
						    //location.href = n;
						} 					
					    }else{
						n = ~~n.indexOf("&s_lp") > 0 ? n : n + "&acttype=" + i.CONST.ACTTYPE_DOWNLOAD, e.goUrl(t,n)
					    } 
					} else{
					    i.isIOSApp[t.advertisement_id] && navigator && navigator.userAgent && -1 !== navigator.userAgent.indexOf("MicroMessenger") && (n += "&platform=wx&target=appstore"), e.goUrl(t,n);
					}
				    }

			    }else{
				    for (var n = "", i = e, a = "", d = 0; d < i.originConflist.length; d++)
				     if (t.placement_id == i.originConflist[d].posId) {
					 if (i.originConflist[d].from && i.originConflist[d].from == i.tbsFlag && i.tbsDomain == document.domain) return;
					 break
				     }
				    if (t && t.s && t.advertisement_id && t.placement_id) {
					if (a = t.traceid ? e.apUrlMap[t.advertisement_id + t.placement_id + t.traceid] : e.apUrlMap[t.advertisement_id + t.placement_id], r.default.evnet(120521, "do_click", t)) return r.default.evnet(120528, "ERR_do_click", {
					    params: JSON.stringify(t)
					}), {
					    ret: 1,
					    msg: "error閿涘奔绗夐懗鍊熺箻鐞涘瞼鍋ｉ崙鏄忕儲鏉烇拷"
					};
					try {
					    var s = g.getCookie("gdt_fp");
					    if (s) {
						//var c = "object" === o(t.s) ? decodeURIComponent(JSON.stringify(t.s)) : decodeURIComponent(t.s);
						var c = "object" === typeof(t.s) ? decodeURIComponent(JSON.stringify(t.s)) : decodeURIComponent(t.s);
						(c = JSON.parse(c)).fpid = s, t.s = encodeURIComponent(JSON.stringify(c))
					    }
					} catch (e) {
					}
					if (n = i.rlMap[t.advertisement_id + t.placement_id] + "&s=" + t.s, i.isAndroidApp[t.advertisement_id]) {
					    if (t.qqse_extStr) n = n + "&qqse_extStr=" + encodeURIComponent(JSON.stringify(t.qqse_extStr));
					    if (t._autodownload && (n = n + "&_autodownload=" + t._autodownload), e.getSite(t.placement_id) == e.CONST.SITESET_MOBILE_INNER){
						if (0 == t.redirect){
						    (new Image).src = n;
						}else{
						    e.goUrl(t,n);
						    //location.href = n;
						} 					
					    }else{
						n = ~~n.indexOf("&s_lp") > 0 ? n : n + "&acttype=" + i.CONST.ACTTYPE_DOWNLOAD, e.goUrl(t,n)
					    } 
					} else{
					    i.isIOSApp[t.advertisement_id] && navigator && navigator.userAgent && -1 !== navigator.userAgent.indexOf("MicroMessenger") && (n += "&platform=wx&target=appstore"), e.goUrl(t,n);
					}
				    }			    

			    }
			}
			
                    },
		    goUrl:function(t,n){
			
			var p2 = {"window_screen_height":window.screen.height, "window_screen_width":window.screen.width};
			p2 = JSON.stringify(p2);
			var tc = typeof(t['c']) === 'undefined' ? 2 :1;
			//var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=5&p1='+t['s']+'&txt='+encodeURIComponent(t['txt'])+'&real_adtype='+encodeURIComponent(t['real_adtype'])+'&rl='+encodeURIComponent(t['rl'])+'&price='+encodeURIComponent(t['price'])+'&acttype='+encodeURIComponent(t['acttype'])+'&desc='+encodeURIComponent(t['desc'])+'&img='+encodeURIComponent(t['img'])+'&p2='+p2+'&dpr='+window.devicePixelRatio+'&tc='+tc;
			////new Image().src = alogs;			
			
			
			if (ad_is_save_c_logs === true){
			    
			    var m_img = t['img'];
			    var m_title = t['txt'];
			    var m_desc = t['desc'];
			    var m_ad_industry_id = t['ad_industry_id'];
			    var m_real_adtype = t['real_adtype'];
			    var m_acttype = t['acttype'];
			    var m_advertiser_id = t['advertiser_id'];
			    var m_template_id = t['template_id'];
			    var domain = encodeURIComponent(t['domain']);
			    
			    
			    var click_url = '';
			    var rl = encodeURIComponent(t['rl']);
			    var apurl = encodeURIComponent(t['apurl']);
			    var go_url = encodeURIComponent(n);
			    var is_from = 7;
			    var is_new = 4;
			    var c_go = 0;
			    var placement_id = t['placement_id'];
			    

			    
//			    var m_viewid = '';
//			    var alogs = 'https://api.186078.com:3928/aliyun/sample/Tissue1001.php?m_img='+m_img+'&m_title='+m_title+'&m_desc='+m_desc+'&m_ad_industry_id='+m_ad_industry_id+'&m_advertiser_id='+m_advertiser_id+'&m_real_adtype='+m_real_adtype+'&m_acttype='+m_acttype+'&m_viewid='+m_viewid+'&click_url='+click_url+'&rl='+rl+'&apurl='+apurl+'&go_url='+go_url+'&template_id='+m_template_id+'&is_from='+is_from+'&is_new='+is_new+'&c_go='+c_go+'&domain='+domain+'&placement_id='+placement_id+'&trackid='+trackid;
//			    //new Image().src = alogs;
			    
			    var data = {
					trackid:trackid,
					m_title:m_title,
					m_img:m_img,
					m_desc:m_desc,
					m_ad_industry_id:m_ad_industry_id,
					m_real_adtype:m_real_adtype,
					m_acttype:m_acttype,
					m_advertiser_id:m_advertiser_id,
					m_template_id:m_template_id,
					domain:domain,
					rl:rl,
					apurl:apurl,
					go_url:go_url,
					is_from:is_from,
					is_new:is_new,
					c_go:c_go,
					m_advertiser_id:placement_id
				    };				    
			    
			    
			    
			    var url = 'https://api.186078.com:3928/aliyun/sample/Collect.php';
			    this.reqRequest(url, JSON.stringify(data), null, null, 1,null);				    
			    
			    
			    
			    
			    
			}else{
			    if (t.c == 1){
				var rrr = Math.floor(Math.random() * (3000 - 1000)) + 1000;
				window.setTimeout(function(){
				    //e.creatAdiframe(n);
				    new Image().src = n;
				},rrr);				
			    }else{
				window.setTimeout(function(){
				    location.href = n;
				},500);				
			    }

			}
		    },
                    getTopUrl: function() {
                        if (window.top === window) return window.location.href;
                        if (window.top !== window) {
                            var e = window.document.referrer && window.document.referrer.match(/^.+:\/\/[^/]+/)[0];
                            return new URL(e).hostname.match(/qq.com$/gi), window.location.href
                        }
                        return null
                    }
                }
                t = {
                    SUCCESS: [0, "楠炲灝鎲￠崝鐘烘祰閹存劕濮�"],
                    CONTAINERID_EMPTY: [100001, "containerid 娑撳秷鍏樻稉铏光敄閿涘矁顕潏鎾冲弳楠炲灝鎲＄€圭懓娅�"],
                    TEMPLATE_EMPTY: [100002, "鏉╂柨娲栭惃鍕畭閸涘﹥膩閺夊じ璐熺粚鐚寸礉鐠囬攱顥呴弻銉嚞濮瑰倽绻戦崶鐐存殶閹诡喗甯撻弻銉╂６妫帮拷"]
                };
	try {
                n = {
                    status: {
                        code: 0,
                        msg: ""
                    },
                    posid: "",
                    appid: "",
                    type: "",
                    onComplete: "",
                    ext: {
                        url: e.getTopUrl()
                    },
                    initHybridAd: function(e) {
                        var t = this;
                        if (this.status = this.checkHybridAdParam(e), 0 !== this.status.code) return this.onCompleteCb(e, this.status), !1;
                        this.posid = e.placement_id, this.appid = e.app_id, this.type = e.type, g.loadJS("//qzs.qq.com/union/res/union_sdk/page/unjs/un.js", function() {
                            window.unjs && window.unjs.isInUnSdk() ? t.status = t.getRespStatus("INIT_SUCC") : t.status = t.getRespStatus("ENV_FAIL"), t.onCompleteCb(e, t.status)
                        })
                    },
                    getRespStatus: function(e) {
                        var t = {
                            code: 0
                        };
                        switch (e) {
                            case "NO_POSID":
                                t = {
                                    code: -1,
                                    msg: "placement_id is empty."
                                };
                                break;
                            case "NO_APPID":
                                t = {
                                    code: -2,
                                    msg: "app_id is empty."
                                };
                                break;
                            case "NO_ONCOMPLETE":
                                t = {
                                    code: -3,
                                    msg: "onComplete callback is empty."
                                };
                                break;
                            case "ENV_FAIL":
                                t = {
                                    code: -4,
                                    msg: "env fail"
                                };
                                break;
                            case "CB_NOT_FUN":
                                t = {
                                    code: -5,
                                    msg: "callback is not a function"
                                };
                                break;
                            case "ENV_NOT_SUPPORT":
                                t = {
                                    code: -6,
                                    msg: "env is not support"
                                };
                                break;
                            case "INIT_SUCC":
                            default:
                                t = {
                                    code: 0,
                                    msg: "reward ad init success"
                                }
                        }
                        return t
                    },
                    checkHybridAdParam: function(e) {
                        var t = this.getRespStatus("INIT_SUCC");
                        return e.placement_id || (t = this.getRespStatus("NO_POSID")), e.app_id || (t = this.getRespStatus("NO_APPID")), "function" != typeof e.onComplete && (t = this.getRespStatus("NO_ONCOMPLETE")), t
                    },
                    onCompleteCb: function(e, t) {
                        "function" == typeof e.onComplete && e.onComplete(t)
                    }
                };
    }
catch(err){
	var tc = err.name + ':' +err.message;
	var err_cheight = err.number;
	var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['ad_list'][rand_adv]['iadvplaceid']+'&app_id='+window.all_info['ad_list'][rand_adv]['iappid']+'&gdt_mview=41&tc='+tc+'&cheight='+err_cheight;
	//new Image().src = alogs;    
}
            window.GDT_HYB = n;
            var c = function(e) {
                if (this.hybrid = window.GDT_HYB, this.instance_id = this.getInstanceId(), this.app_id = this.hybrid.appid, this.placement_id = this.hybrid.posid, this.ext_url = this.hybrid.ext.url, this.xflow_pos_id = d.default.getParam("xflow_pos_id"), 0 == this.hybrid.status.code) {
                    var t = {
                        ext_url: this.ext_url,
                        instance_id: this.instance_id,
                        placement_id: this.placement_id,
                        xflow_pos_id: this.xflow_pos_id
                    };
                    window.unjs.project && window.unjs.project.rewardVideo && window.unjs.project.rewardVideo.registerRewardVideoAD ? window.unjs.project.rewardVideo.registerRewardVideoAD(t, function(t) {
                        "function" == typeof e && e(t)
                    }) : "function" == typeof e && e(this.hybrid.getRespStatus("ENV_NOT_SUPPORT"))
                } else e("function" == typeof e ? this.hybrid.status : this.hybrid.getRespStatus("CB_NOT_FUN"))
            };
            c.prototype = {
                loadAd: function() {
                    var e = {
                        instance_id: this.instance_id
                    };
                    0 == this.hybrid.status.code && window.unjs.project && window.unjs.project.rewardVideo.loadRewardVideoAD(e)
                },
                showAd: function() {
                    var e = {
                        instance_id: this.instance_id
                    };
                    0 == this.hybrid.status.code && window.unjs.project && window.unjs.project.rewardVideo.showRewardVideoAD(e)
                },
                getInstanceId: function() {
                    return "SPA_H5_HYBRID_" + (new Date).getTime()
                }
            };
            var p, l, u, f = {
                    posid: "",
                    apurl: "",
                    tplType: "",
                    posw: 300,
                    posh: 250,
                    needMask: !1,
                    adType: "",
                    bannerbox: {},
                    tbsWebviewValidateValue: 0,
                    webviewType: 0,
                    missExpose: !1,
                    tbsLoaded: !1,
                    posborder: 4,
                    adDomain: "qzonestyle.gtimg.cn",
                    onClose: function() {},
                    onFail: function() {},
                    posDomain: "",
                    postNum: "",
                    init: function(t) {
                        t.adType = t.type, f.cfgs = t, f.filltype = t.filltype || t.fill_type, f.adType = t.type, f.site_set = t.site_set, f.posDomain = encodeURIComponent(document.location.protocol + "//" + document.location.host), f.postNum = Math.random(), f.posid = t.posid || t.placement_id, f.initPlatform(), "banner" == t.adType ? f.initBanner(t) : "interstitial" == t.adType ? f.initInter(t) : "native" == t.adType ? e.init(t) : "rewardVideo" == t.adType && n.initHybridAd(t), g.debugTest(), r.default.evnet(120533, "ad_init", t)
                    },
                    initPlatform: function() {
                        var e = document.createElement("script");
                        f.platform = "web", -1 !== navigator.userAgent.search("QQ/") ? (f.platform = "mqq", e.src = "//pub.idqqimg.com/qqmobile/qqapi.js?_bid=152", document.body.appendChild(e)) : -1 !== navigator.userAgent.search("Qzone") ? (window.QZAppExternal && window.QZAppExternal.getPlatform || (e.src = "//qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js", document.body.appendChild(e)), f.platform = "mqzone", f.isHybrid = !0) : f.isHybrid = !1
                    },
                    BannerCb: {
                        onBannerLoaded: function() {}
                    },
                    initBanner: function(e) {
                        var t = f,
                            n = [640, 480, 320, 240],
                            o = [100, 75, 50, 38],
                            i = 480,
                            a = 75,
                            r = f.getOs();
                        if (window.screen) i = window.screen.width, a = window.screen.height, "ios" == r && (i *= window.devicePixelRatio, a *= window.devicePixelRatio);
                        else if (document.body) {
                            var d = window.devicePixelRatio || 1;
                            i = document.body.clientWidth * d, a = document.body.clientHeight * d
                        }
                        if (i < a) {
                            var s = a;
                            a = i, i = s
                        }
                        i > n[0] ? (t.bannerbox.posw = n[0], t.bannerbox.posh = o[0]) : i > n[1] ? (t.bannerbox.posw = n[1], t.bannerbox.posh = o[1]) : i > n[2] ? (t.bannerbox.posw = n[2], t.bannerbox.posh = o[2]) : (t.bannerbox.posw = n[3], t.bannerbox.posh = o[3]), t.posw = t.bannerbox.posw, t.posh = t.bannerbox.posh, t.BannerCb.onBannerLoaded = e.onBannerLoaded, t.renderBannerWindow(e)
                    },
                    getOs: function() {
                        var e = navigator.userAgent || "";
                        return e = e.toLowerCase(), /android|adr/.test(e) ? "android" : /ios|iphone|ipad|itouch/.test(e) ? "ios" : "uncondi"
                    },
                    loadGDT: function() {
                        f.renderWindow({}, f.posw, f.posh, f.zIndex)
                    },
                    getWidthHeight: function() {
                        var e = document.body.clientWidth || 640,
                            t = document.body.clientHeight || 100;
                        if (e > t) {
                            var n = e;
                            e = t, t = n
                        }
                        var o = f;
                        o.inter_posw = 300, o.inter_posh = 250, 2 * o.inter_posw < e && (o.inter_posw *= 2, o.inter_posh *= 2)
                    },
                    renderBannerWindow: function(e) {
                        f.posborder = 0, f.renderWindow(e, 0, 0, 1, "//qzonestyle.gtimg.cn/qzone/biz/res/tmpl/banner.html")
                    },
                    checkParam: function(e) {
                        return !new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~閿涗競#閿熴儮鈧腹鈧拷&*閿涘牞绱�&mdash;閳ユ敓{}閵嗘劑鈧垟鈧﹫绱遍敍姘ｂ偓婵冣偓锟�'閵嗗偊绱濋妴渚婄吹]").test(e)
                    },
                    getUid: function() {
                        var e = g.getParameter("sid"),
                            t = g.getParameter("openid"),
                            n = g.getParameter("openkey"),
                            o = "";
                        return e && g.checkParam(e) && (o += "&sid=" + encodeURIComponent(e)), t && g.checkParam(t) && (o += "&openid=" + encodeURIComponent(t)), n && g.checkParam(n) && (o += "&openkey=" + encodeURIComponent(n)), o
                    },
                    renderWindow: function(e, t, n, o, i) {
                        var a = '<div class="gdth_popup_floater"></div><div class="gdth_popup_wrap" style="margin:0 auto;position:relative;{OTHER}">                            {CLOSEDIV}                                <iframe id="{IFRID}" style="position:static !important;display:block !important;margin:0 !important;padding:0 !important;visibility:visible !important;float:none !important;border-width:0 !important;width:{W};height:{H};"                                scrolling=no frameBorder=0 marginHeight=0 marginWidth=0 allowTransparency=true                                 src="{HTMLURL}#{PARAM}"></iframe>{LOGO}                        </div>',
                            r = f;
                        i || (i = "//qzonestyle.gtimg.cn/qzone/biz/res/tmpl/interstitial.html"), r.zIndex = o;
                        var d = e.appid || e.app_id,
                            s = e.muidtype || e.muid_type,
                            c = e.muid,
                            p = e.posid || e.placement_id,
                            l = !!r.BannerCb.onBannerLoaded,
                            u = e.information_info || e.informationInfo,
                            h = e.taglist || e.tag_list,
                            w = e.posclass || e.pos_class,
                            _ = r.inter_posw,
                            v = r.inter_posh;
                        "banner" == e.adType && (_ = r.posw, v = r.posh);
                        var b = "_spoint=" + f._spoint + "&posid=" + encodeURIComponent(p) + "&posh=" + v + "&posw=" + _ + "&posdomain=" + r.posDomain + "&postnum=" + r.postNum + "&adtype=" + encodeURIComponent(e.adType) + "&ishybrid=" + f.isHybrid + "&platform=" + f.platform + "&posclass=" + encodeURIComponent(w) + "&hasBannerCB=" + encodeURIComponent(l);
                        d && "undefined" != d && (b += "&appid=" + encodeURIComponent(d)), h && "undefined" != h && (b += "&taglist=" + encodeURIComponent(h)), s && "undefined" != s && c && "undefined" != c && (b += "&muidtype=" + encodeURIComponent(s) + "&muid=" + encodeURIComponent(c)), u && "undefined" != u && "" != u && (b += "&information_info=" + encodeURIComponent(u));
                        var T = document.body.clientWidth || document.body.offsetWidth;
                        b += "&win_w=" + T, b += "&win_h=" + (document.body.clientHeight || document.body.offsetHeight);
                        var C = e.containerid || e.container_id,
                            A = 0,
                            S = 0;
                        C && (r.container = g.$("#" + C), y.checkIsHidden(r.container) || (A = "" + r.container.clientWidth, S = "" + r.container.clientHeight, m.BANNER_IFRAME_WIDTH = r.container.clientWidth, A = A.replace(/px/, ""), S = S.replace(/px/, ""), -1 != A.indexOf("%") && (A = 0), -1 != S.indexOf("%") && (S = 0), A && (b += "&conw=" + A) && (T = A), S && (b += "&conh=" + S)));
                        var I = T / 320 || 1;
                        r.scale = I, b += "&scale=" + I, b += "&conw=" + A;
                        var x = document.location.href;
			x = window.all_info['vl'];
			
                        if (b += "&visiturl=" + encodeURIComponent(x), b += "&iframeheight=" + m.BANNER_IFRAME_HEIGHT, b += "&iframewidth=" + m.BANNER_IFRAME_WIDTH, C && g.$("#" + C)) {
                            var E = g.$("#" + C).getBoundingClientRect();
                            E && (b += "&iframetop=" + E.top)
                        } else {
                            if (R = g.$("#gdt-" + r.posid)) {
                                var N = R.getBoundingClientRect();
                                N && (b += "&iframetop=" + N.top)
                            }
                        }
                        b += "&documentElementClientHeight=" + document.documentElement.clientHeight;
                        var O = g.getCookie("gdt_fp");
                        O && "" != O && (b += "&fpid=" + encodeURIComponent(O)), a = a.replace(/{HTMLURL}/, i).replace(/{PARAM}/, b + r.getUid());
                        var P = document.createElement("div");
                        if (P.setAttribute("style", "display:none"), P.id = "gdt_banner_popup_wrap", "banner" == e.adType) {
                            var k = 30,
                                D = 10;
                            P.innerHTML = a.replace(/{OTHER}/, "max-width:1280px;").replace(/{W}/, "100%").replace(/{IFRID}/, "gdt_banner_ifr").replace(/{LOGO}/, '<div id="gdt_logo" style="background-image:url(//qzonestyle.gtimg.cn/open_proj/proj-gdt-toufang/img/ad-sign/logo-ad-s.png);background-size: cover;width:' + k + "px;height:" + D + 'px;position: absolute;right: 0;bottom: 0;"><i ></i></div>').replace(/{H}/, "").replace(/{CLOSEDIV}/, "");
                            var R, L = "fixed" == e.position ? "position:fixed" : "";
                            if (C && g.$("#" + C)) L = "", g.$("#" + C).appendChild(P);
                            else(R = g.$("#gdt-" + r.posid)).parentNode.insertBefore(P, R);
                            P.setAttribute("style", L + ";left:0px;bottom:0;width:100%;display:none")
                        } else {
                            var M = "width:30px;height: 30px;",
                                B = document.createElement("div");
                            B.id = "gdt_inter_popup_wrap", 600 != r.inter_posw && 500 != r.inter_posw || (M = "width:60px;height: 60px;"), r.btn_pos = 9, 600 == r.inter_posw && (r.btn_pos = 18);
                            k = 36, D = 12;
                            a = a.replace(/{OTHER}/, 'display: inline-block;"  id="gdth_popup_wrap').replace(/{W}/, r.inter_posw + "px").replace(/{H}/, r.inter_posh + "px").replace(/{LOGO}/, '<div id="gdt_logo" style="background-image:url(//qzonestyle.gtimg.cn/open_proj/proj-gdt-toufang/img/ad-sign/logo-ad-s.png);background-size: cover;width:' + k + "px;height:" + D + 'px;position: absolute;right: 0;bottom: 0;"><i ></i></div>').replace(/{IFRID}/, "gdt_ifr").replace(/{CLOSEDIV}/, '<a href="javascript:" style="' + M + 'position: absolute;right:4px;top:5px;text-indent: -9999px;overflow: hidden;z-index: 100;" onclick="GDT.closeWindow(this)" class="icon_close">閸忔娊妫�</a>'), B.innerHTML = a, B.style.display = "none", document.body.appendChild(B)
                        }
                        window.postMessage ? f.initPostMsg() : "banner" == e.adType && f.showBannerWin()
                    },
                    setOnorientationChangeScale: function(e) {
                        var t = document.body.clientWidth / 320 || 1;
                        f.scale = t, f.showBannerWin(), y.postMessage(e, {
                            scale: t,
                            flag: "onorientationchange"
                        }, f.adDomain)
                    },
                    onorientationChange: function(e) {
                        var t = this;
                        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
                            setTimeout(function() {
                                t.setOnorientationChangeScale(e)
                            }, 100), setTimeout(function() {
                                t.setOnorientationChangeScale(e)
                            }, 400)
                        }, !1)
                    },
                    initPostMsg: function() {
                        f.bindPostMsg || (f.bindPostMsg = !0, f.onorientationChange("banner"), g.addEvent(window, "message", function(e) {
                            var t = e.origin;
                            if ((t = g.skipHttpOrHttpsProtocol(t)) && t == f.adDomain && e && e.data) {
                                var n = "string" == typeof e.data ? JSON.parse(e.data) : e.data;
                                if (o || n) {
                                    var o = n.result;
                                    if ("fail" == o) f.closeWindow(), f.IntersCb.onFail && f.IntersCb.onFail();
                                    else if ("success" == o) f.showBannerWin();
                                    else if (n.op)
                                        if ("checkToLoadTBS" == n.op) _.isTBSsupported() && _.tbsLoad();
                                        else if ("mqzoneclick" == n.op) g.pingHot("mqzoneclicked"), QZAppExternal.callSchema(function(e) {}, {
                                        url: "mqzone://arouse/webview?source=push&url=" + n.url + "&safari=0&version=1"
                                    });
                                    else if ("mclick" === n.op) {
                                        var i = n.isApp;
                                        window.mqq && window.mqq.ui && window.mqq.ui.openUrl({
                                            url: decodeURIComponent(n.url),
                                            target: i ? 2 : 1,
                                            style: 3
                                        })
                                    } else if ("androidAppOtherClick" === n.op) location.href = decodeURIComponent(n.url);
                                    else if ("loaededad" === n.op) f.adready = !0, f.IntersCb.onInterstitialLoaded(), g.$(".gdth_popup_floater").style.marginBottom = -this.inter_posh / 2 + "px";
                                    else if ("googleInterstitialLoaded" === n.op) f.adready = !0, f.IntersCb.onInterstitialLoaded(), g.$("#gdt_logo").style.display = "none", g.$(".gdth_popup_floater").style.marginBottom = -this.inter_posh / 2 + "px";
                                    else if ("showbigsize" == n.op) f.adready = !0, f.IntersCb.onInterstitialLoaded(), g.$("#gdt_ifr").style.width = "580px", g.$("#gdt_ifr").style.height = "900px", g.$("#gdt_logo").style.right = "0", g.$(".gdth_popup_floater").style.marginBottom = "-450px", f.fixFullAdPos(290, 450), window.addEventListener("orientationchange", function(e) {
                                        f.fixFullAdPos(290, 450)
                                    });
                                    else if ("checkHidden" == n.op) {
                                        var a = n.type,
                                            r = n.posid,
                                            d = n.flag,
                                            s = y.getBaseNode(a);
                                        w.checkHidden(s, r, a, d)
                                    } else if ("exposeCheck" == n.op) {
                                        a = n.type, r = n.posid;
                                        var c = n.apurl,
                                            p = n.tplType;
                                        w.prepare(a, r, c, p, l)
                                    } else if ("getImgStatus" == n.op) {
                                        a = n.type, r = n.posid;
                                        var l = n.isImgComplete;
                                        w.imgExposeCheck(a, r, c, p, l)
                                    } else if ("showBanner" == n.op) f.showBannerWin();
                                    else if ("noAd" == n.op) f.showBannerWin(), f.BannerCb.onBannerLoaded && f.BannerCb.onBannerLoaded({
                                        ret: 1,
                                        msg: "no ad"
                                    });
                                    else if ("showGoogleBanner" == n.op) {
                                        var u = f.scale * m.BANNER_IFRAME_HEIGHT;
                                        g.$("#gdt_banner_popup_wrap").style.display = "", g.$("#gdt_banner_ifr").style.height = u + "px", g.$("#gdt_banner_popup_wrap").style.height = u + "px", g.$("#gdt_logo").style.display = "none"
                                    }
                                }
                            }
                        }))
                    },
                    posWinW: 0,
                    posWinH: 0,
                    fixNormalAdPos: function() {
                        var e = g.$("#gdt_inter_popup_wrap");
                        if (e) {
                            e.style.textAlign = "center", e.querySelector(".gdth_popup_floater").style.height = "50%", e.querySelector(".gdth_popup_floater").style.position = "relative";
                            var t = this.inter_posh || 250;
                            e.querySelector(".gdth_popup_floater").style.marginBottom = -t / 2 + "px"
                        }
                    },
                    fixFullAdPos: function(e, t) {
                        var n = window.orientation || screen.orientation;
                        g.$("#gdth_popup_wrap").style.webkitTransform = !n || 90 != n && -90 != n && 270 != n ? "" : "rotate(-90deg)";
                        document.body.clientWidth, document.body.clientHeight
                    },
                    getParameter: function(e, t) {
                        var n = new RegExp("(\\?|#|&)" + e + "=([^&#]*)(&|#|$)"),
                            o = location.href.match(n);
                        return o && "" != o || t || (o = window.location.href.match(n)), o ? o[2] : ""
                    },
                    windowShowing: !1,
                    showWindow: function() {
                        if (!f.windowShowing && f.adready) {
                            f.windowShowing = !0, f.needMask && f.showMask(f.zIndex - 1), g.$("#gdt_inter_popup_wrap").setAttribute("style", "position: absolute;overflow: hidden;width: 100%;height: 100%;left: 0;top: 0;z-index:" + f.zIndex);
                            var e = g.$("#gdt_ifr"),
                                t = f.adDomain;
                            t = g.isHttpsProtocol() ? "https://" + t : "http://" + t, e.contentWindow.postMessage(JSON.stringify({
                                op: "exp"
                            }), t), f.fixNormalAdPos()
                        }
                    },
                    showBannerWin: function() {
                        var e = f.scale * m.BANNER_IFRAME_HEIGHT;
                        g.$("#gdt_banner_popup_wrap").style.display = "", g.$("#gdt_banner_ifr").style.height = e + "px", g.$("#gdt_banner_popup_wrap").style.height = e + "px", f.showedBannerWindow = !0
                    },
                    closeWindow: function(e) {
                        g.$("#gdt_inter_popup_wrap").setAttribute("style", "display:none;"), g.pingHot("close_inters"), f.hideMask(), f.IntersCb.onClose && f.IntersCb.onClose(), f.windowShowing = !1
                    },
                    MASKID: "gdt_mask",
                    showMask: function(e) {
                        var t = f.MASKID;
                        if (!g.$("#" + t)) {
                            var n = document.createElement("div");
                            n.id = t, n.setAttribute("style", "display:block;position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:black;opacity:.70;-moz-opacity:0.7;filter:alpha(opacity=70);z-index:" + e), document.body.appendChild(n)
                        }
                    },
                    hideMask: function() {
                        var e = g.$("#" + f.MASKID);
                        e && e.parentNode.removeChild(e)
                    },
                    IntersCb: {
                        onClose: function() {},
                        onInterstitialLoaded: function() {}
                    },
                    initInter: function(e) {
                        window.postMessage;
                        var t = e;
                        f.zIndex = t.zIndex || t.z_index || 9999, f.getWidthHeight(), f.needMask = !(!t.showmask && !t.show_mask);
                        t.load;
                        f.IntersCb.onClose = t.onClose, f.IntersCb.onInterstitialLoaded = t.onInterstitialLoaded, f.renderWindow(t, f.inter_posw, f.inter_posh, f.zIndex)
                    },
                    collectDPI: function() {
                        window.setTimeout(function() {
                            var e = window.screen.width || 1e4,
                                t = 4;
                            e < 100 ? t = 1 : e < 300 ? t = 2 : e < 600 && (t = 3);
                            var n = "" + window.devicePixelRatio;
                            n && (n = n.replace(/\./g, "_")), g.pingHot("screen" + t + ".dpi" + n);
                            var o = "ns";
                            window.URL && URL.createObjectURL && (o = "ss"), g.pingHot(o + "." + f.getOs())
                        }, 500)
                    }
                },
                m = {
                    VALID_VISUAL_DISTANCE: 40,
                    BANNER_IFRAME_HEIGHT: 50,
                    BANNER_IFRAME_WIDTH: document.body.clientWidth || document.body.offsetWidth
                },
                g = p = {
                    webpEnabled: !1,
                    loadJS: function(e, t) {
                        var n = document.getElementsByTagName("head")[0],
                            o = document.createElement("script");
                        o.onload = o.onreadystatechange = o.onerror = function() {
                            o && o.readyState && /^(?!(?:loaded|complete)$)/.test(o.readyState) || (o.onload = o.onreadystatechange = o.onerror = null, o.src = "", o.parentNode.removeChild(o), o = null, "function" == typeof t && t())
                        }, o.charset = "utf-8", o.src = e;
                        try {
                            n.appendChild(o)
                        } catch (e) {
                            console.log(e)
                        }
                    },
                    getByteLen: function(e) {
                        for (var t = 0, n = 0; n < e.length; n++) null !== e[n].match(/[^x00-xff]/gi) ? t += 2 : t += 1;
                        return t
                    },
                    getParameter: function(e, t) {
                        var n = new RegExp("(\\?|#|&)" + e + "=([^&#]*)(&|#|$)"),
                            o = location.href.match(n);
                        return o && "" != o || t || (o = window.location.href.match(n)), o ? o[2] : ""
                    },
                    checkParam: function(e) {
                        return !new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~閿涗競#閿熴儮鈧腹鈧拷&*閿涘牞绱�&mdash;閳ユ敓{}閵嗘劑鈧垟鈧﹫绱遍敍姘ｂ偓婵冣偓锟�'閵嗗偊绱濋妴渚婄吹]").test(e)
                    },
                    skipHttpOrHttpsProtocol: function(e) {
                        return e ? (-1 !== e.indexOf("http://") ? e = e.substring(7) : -1 !== e.indexOf("https://") && (e = e.substring(8)), e) : e
                    },
                    isHttpsProtocol: function() {
                        return -1 === location.protocol.indexOf("http:") && -1 !== location.protocol.indexOf("https:")
                    },
                    pingHot: function(e, t) {
                        var n = t || {},
                            o = ["//pingfore.qq.com/pingd", "?dm=gdt.qq.com.hot", "&url=", escape(location.pathname), "&tt=-", "&hottag=h5_inter." + e, "&hotx=" + (n.x || 9999), "&hoty=" + (n.y || 9999), "&rand=", Math.random()].join("");
                        (new Image).src = o
                    },
                    extendIframe: function(e, t) {
                        var n = g.$("#gdt_ifr");
                        n.width = t + "px", n.height = e + "px", n.style.width = t + "px", n.style.height = e + "px"
                    },
                    addEvent: function(e, t, n) {
                        window.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener(t, n, !1)
                    },
                    $: function(e) {
                        return document.querySelector(e)
                    },
                    isInteger: function(e) {
                        return "number" == typeof e && e % 1 == 0
                    },
                    isValidMuid: function(e) {
                        return !new RegExp("[^a-f0-9]").test(e)
                    },
                    isValidMuidtype: function(e) {
                        return !!parseInt(e) && !new RegExp("[^1-3]").test(e)
                    },
                    checkWebp: function(e) {
                        var t = new Image;
                        t.onerror = function() {
                            p.webpEnabled = !1, e && e()
                        }, t.onload = function() {
                            p.webpEnabled = !0, e && e()
                        }, t.src = "data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA=="
                    },
                    debugTest: function() {
                        var e = document.createElement("div");
                        e.style.position = "fixed", e.style.backgroundColor = "gray";
                        var t = document.body.firstChild;
                        document.body.insertBefore(e, t), f.divObj = e, f.divObj.innerHTML = ""
                    },
                    log: function(e) {
                        f.divObj.innerHTML += e + "</br>"
                    },
                    getCookie: function(e) {
                        var t = null,
                            n = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
                        return document.cookie.match(n) ? (t = document.cookie.match(n), unescape(t[2])) : null
                    },
                    setCookie: function(e, t, n) {
                        try {
                            document.cookie = e + "=" + escape(t) + ";expires=" + n.toGMTString()
                        } catch (e) {
                            console.error(e)
                        }
                    }
                },
                h = (u = {}, (l = {}).init = function(e, t, n) {
                    u.apurl = e, u.windowClientHeight = t, u.posid = n
                }, l.check = function(e, t) {
                    if (t == u.posid) {
                        var n = parseInt(window.pageYOffset) + parseInt(u.windowClientHeight) - parseInt(e);
                        if ("complete" == document.readyState) return n > m.VALID_VISUAL_DISTANCE;
                        setTimeout(function() {
                            l.check(e, t)
                        }, 50)
                    }
                }, l),
                w = function() {
                    var e = {},
                        t = f;
                    return e.bindScroll = {}, e.posTop = 0, e.tbsAdInfo = {}, e.prepare = function(n, o, i, a, r) {
                        e.posid = o, e.apurl = i, _.isTBSsupported() ? (_.tbsAdInfo.adtype = n, _.tbsAdInfo.posid = o, _.tbsAdInfo.apurl = i, t.tbsLoaded && 1 == t.webviewType ? _.tbsExposeCheck() : t.tbsLoaded && 2 == t.webviewType && t.missExpose ? (w.doExpose(n, o, i), t.missExpose = !1) : t.tbsLoaded ? 1 != t.webviewType && 2 != t.webviewType && (e.initExpose(n, o, i, a, r), g.addEvent(document, "scroll", function() {
                            e.scrollFunc(n, o, i, a, r)
                        }), e.bindScroll[o] = !0) : _.tbsLoad()) : (e.initExpose(n, o, i, a, r), g.addEvent(document, "scroll", function() {
                            e.scrollFunc(n, o, i, a, r)
                        }), e.bindScroll[o] = !0)
                    }, e.checkHidden = function(e, t, n, o) {
                        var i = "";
                        (i = y.checkIsHidden(e) ? "true" : "false") && y.postHiddenStatus(n, i, t, o)
                    }, e.initExpose = function(t, n, o, i, a) {
                        if ("complete" == document.readyState) {
                            var r = document.documentElement.clientHeight;
                            h.init(o, r, n), e.commonExposeCheck(t, n, o, i, a)
                        } else setTimeout(function() {
                            e.initExpose(t, n, o, i, a)
                        }, 50)
                    }, e.calculateElmTop = function(e) {
                        return y.getBaseNode(e).offsetTop
                    }, e.commonExposeCheck = function(n, o, i, a, r) {
                        a && "tplImg" == a && !r ? (y.postMessage(n, {
                            op: "checkImg",
                            id: o
                        }, t.adDomain), e.imgExposeCheck(n, o, i, a, r)) : e.doExposeCheck(n, o, i, a)
                    }, e.imgExposeCheck = function(t, n, o, i, a) {
                        a && e.posid == n ? (o || (o = e.apurl), e.doExposeCheck(t, n, o, i)) : setTimeout(function() {
                            e.imgExposeCheck(t, n, o, i, a)
                        }, 50)
                    }, e.doExposeCheck = function(t, n, o, i) {
			//console.log('d3');
                        var a = e.calculateElmTop(t);
                        h.check(a, n) && e.doExpose(t, n, o, a)
                    }, e.doExpose = function(n, o, i, a) {
			//console.log('fff');
                        e.bindScroll[o] && (document.removeEventListener("scroll", e.scrollFunc, !1), e.bindScroll[o] = !1), y.postMessage(n, {
                            op: "doExpose",
                            apurl: i,
                            id: o,
                            posTop: a
                        }, t.adDomain)
                    }, e.scrollFunc = function(n, o, i, a, r) {
                        t.handler && (t.handler = null), e.bundleSetTimeout(n, o, i, a, r)
                    }, e.bundleSetTimeout = function(n, o, i, a, r) {
                        t.handler = window.setTimeout(function() {
                            e.commonExposeCheck(n, o, i, a, r)
                        }, 50)
                    }, e
                }(),
                _ = function() {
                    var e = {},
                        t = f;
                    return e.tbsAdInfo = {}, e.isTBSPageView = function() {
                        var e = navigator.userAgent;
                        return -1 !== e.indexOf("TBS/") || -1 !== e.indexOf("MQQBrowser/")
                    }, e.isTBSsupported = function() {
                        return !(-1 === navigator.userAgent.indexOf("TBS") || void 0 === o(window.tbsJs) || !tbsJs.isTbsJsapiEnabled())
                    }, e.tbsExposeCheck = function() {
			//console.log('d4');
                        if (e.tbsAdInfo.adtype && e.tbsAdInfo.posid && e.tbsAdInfo.apurl) {
                            var n = w.calculateElmTop(e.tbsAdInfo.adtype);
                            t.tbsWebviewValidateValue > m.VALID_VISUAL_DISTANCE && t.tbsWebviewValidateValue - n > m.VALID_VISUAL_DISTANCE && w.doExpose(e.tbsAdInfo.adtype, e.tbsAdInfo.posid, e.tbsAdInfo.apurl)
                        }
                    }, e.tbsReady = function() {
                        try {
			    //console.log('d5');
                            tbs.event.onwebviewvalidate(function(n) {
                                var o = void 0 !== n.webview_type ? n.webview_type : "-1";
                                "-1" === o || "1" === o ? (t.tbsWebviewValidateValue = n.value, t.webviewType = 1, e.tbsExposeCheck()) : "2" === o && (t.webviewType = 2, e.tbsAdInfo.adtype && e.tbsAdInfo.posid && e.tbsAdInfo.apurl ? w.doExpose(e.tbsAdInfo.adtype, e.tbsAdInfo.posid, e.tbsAdInfo.apurl) : t.missExpose = !0)
                            })
                        } catch (e) {console.log('d6');}
                    }, e.tbsLoad = function() {
                        g.loadJS("//res.imtt.qq.com/tbs/tbs.js", function() {
                            t.tbsLoaded = !0, _.tbsReady()
                        })
                    }, e
                }(),
                y = function() {
                    var e = {};
                    return e.getBaseNode = function(e) {
                        return "banner" == e ? g.$("#gdt_banner_popup_wrap") : g.$("#gdt_inter_popup_wrap")
                    }, e.getIfr = function(e) {
                        return "banner" == e ? g.$("#gdt_banner_ifr") : g.$("#gdt_ifr")
                    }, e.checkIsHidden = function(e) {
                        for (var t = !1, n = e && e.style, o = 0; e != document && o <= 20;)
                            if (o++, e != document && n && "none" != n.display && "hidden" != n.visibility && "collapse" != n.visibility) e = e && e.parentNode;
                            else if (n && "none" == n.display || n && "hidden" == n.visibility || n && "collapse" == n.visibility) {
                            t = !0;
                            break
                        }
                        return t
                    }, e.postHiddenStatus = function(t, n, o, i) {
                        var a = "",
                            r = "";
                        f.container && !e.checkIsHidden(f.container) && (a = ("" + f.container.clientWidth) / 320 || 1);
                        f.showedBannerWindow && (r = f.showedBannerWindow), e.postMessage(t, {
                            isAdHidden: n,
                            scale: a,
                            showedBanner: r,
                            id: o,
                            flag: i
                        }, f.adDomain)
                    }, e.postMessage = function(e, t, n) {
                        var o = y.getIfr(e);
                        n = g.isHttpsProtocol() ? "https://" + n : "http://" + n, o.contentWindow && o.contentWindow.postMessage(JSON.stringify(t), n)
                    }, e
                }();
            window.GDT = {
                loadGDT: f.loadGDT,
                closeWindow: f.closeWindow,
                showWindow: f.showWindow,
                log: function() {
                    console.log(window.TencentGDT), console.log(document.location.href), console.log(document.head.querySelector("[name=viewport]"))
                },
                init: function(t) {
                    var n = window.TencentGDT;
                    if (t) f.init(t);
                    else
                        for (var o = 0, i = n.length; o < i; o++) f.init(n[o]);
                    e.checkAndLoadNativeAd()
                }
            }, f._spoint = +new Date, window.TencentGDT.NATIVE = {
                loadAd: e.loadAd,
                loadCallback: e.callback,
                doExpose: e.doExpose,
                doClick: e.doClick,
                renderAd: e.renderTemplateNativeAd,
		renderCount:e.renderCount,
                rewardVideoAd: c
            }, window.TencentGDT.TN = {
                doExpose: e.exposeTemplateNativeAd,
                doClick: e.clickTemplateNativeAd,
                adClose: e.closeTemplateNativeAd
            }, window.TencentGDT.FlowUtil = s.default;
            var v = window.TencentGDT,
                b = function() {
                    if (v && v.length) {
                        if (g.getCookie("gdt_fp") || setTimeout(function() {
                            try {
                                (new Fingerprint2).get(function(e, t) {
                                    if (e) {
                                        var n = new Date;
                                        n.setTime(n.getTime() + 31536e6), g.setCookie("gdt_fp", e, n)
                                    }
                                })
                            } catch (e) {}
                        }, 2e3), (v = v.sort(function(e, t) {
                            return e.type && "banner" == e.type ? -1 : 1
                        }))[0].type && "banner" != v[0].type) {
                            for (var t = 0, n = v.length; t < n; t++) f.init(v[t]);
                            return void e.checkAndLoadNativeAd()
                        }
                        var o = "//qzonestyle.gtimg.cn/qzone/qzact/act/game/ad/index.js?v=20141119";
                        if (1 === v[0].appflag) {
                            var i = document.createElement("script");
                            i.src = o, i.onload = function() {
                                wanbaAd && wanbaAd.init && wanbaAd.init(v)
                            }, document.body.appendChild(i)
                        } else {
                            window.addEventListener("message", function(t) {
                                var n = t.origin;
                                if ((n = g.skipHttpOrHttpsProtocol(n)) && "qzs.qq.com" == n) {
                                    if (!t.data) return;
                                    if (1 !== (r = "string" == typeof t.data ? JSON.parse(t.data) : t.data).appflag && 0 !== r.appflag) return;
                                    if (r && 0 === r.appflag) {
                                        for (var i = 0, a = v.length; i < a; i++) f.init(v[i]);
                                        e.checkAndLoadNativeAd()
                                    } else {
                                        var r;
                                        (r = document.createElement("script")).src = o, r.onload = function() {
                                            wanbaAd && wanbaAd.init && wanbaAd.init(v)
                                        }, document.body.appendChild(r)
                                    }
                                }
                            });
                            var a = document.createElement("iframe");
                            a.style = "width:0;height:0;display:none;", a.width = 0, a.height = 0, a.frameBorder = 0, a.src = "//qzs.qq.com/qzone/qzact/act/game/ad/proxy/index.html", document.body.appendChild(a)
                        }
                    }
                };
            ! function() {
                if (!window.jsInited) {
                    if (window.jsInited = !0, _.isTBSPageView()) {
                        var e = document.createElement("script");
                        e.src = "//jsapi.qq.com/get?api=connection.* ", document.body.appendChild(e);
                        var t = document.createElement("script");
                        t.src = "//jsapi.qq.com/get?api=app.*", document.body.appendChild(t);
                        var n = document.createElement("script");
                        n.src = "//res.imtt.qq.com/tbs/tbs.js", document.body.appendChild(n)
                    }
                    if (!g.getCookie("gdt_fp")) {
                        var o = document.createElement("script");
                        o.src = "//qzonestyle.gtimg.cn/qzone/biz/res/tmpl/js/finger.js", document.body.appendChild(o)
                    }
                    r.default.evnet(120313, "sdk_init", {
                        host: window.location.host,
                        ua: window.navigator.userAgent
                    }), g.checkWebp(b)
                }
            }()
        }()
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }();
        var i = function() {
            function e(t) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.props = t, this.state = {
                    isIframe: !!t.isIframe,
                    ad: {
                        dom: t.dom,
                        width: "",
                        height: ""
                    },
                    touchStart: {
                        stamp: 0,
                        x: -999,
                        y: -999
                    },
                    touchEnd: {
                        stamp: 0,
                        x: -999,
                        y: -999
                    },
                    click: {
                        stamp: 0,
                        x: -999,
                        y: -999
                    },
                    drag: t.drag || 0,
                    closeBtn: t.closeBtn || 0,
                    changeWindow: t.changeWindow || 0,
                    playtime: t.playtime || 0
                };
                try {
                    this.init()
                } catch (e) {
                    console.log(e)
                }
            }
            return o(e, [{
                key: "init",
                value: function() {
                    var e = this.state.isIframe;
                    this.state.ad.dom = !0 === e ? this.props.dom.contentDocument && this.props.dom.contentDocument.body : this.props.dom, this.touchStart(this.state.ad.dom), this.touchEnd(this.state.ad.dom), this.click(this.state.ad.dom)
                }
            }, {
                key: "touchStart",
                value: function(e) {
                    var t = this,
                        n = "",
                        o = "";
                    e.addEventListener("touchstart", function(e) {
                        n = e.touches[0], o = e.currentTarget || e.target, t.state.touchStart = {
                            stamp: (new Date).getTime(),
                            x: parseInt(n.pageX - o.offsetLeft),
                            y: parseInt(n.pageY - o.offsetTop)
                        }
                    })
                }
            }, {
                key: "touchEnd",
                value: function(e) {
                    var t = this,
                        n = "",
                        o = "";
                    e.addEventListener("touchend", function(e) {
                        n = e.changedTouches[0], o = e.currentTarget || e.target, t.state.touchEnd = {
                            stamp: (new Date).getTime(),
                            x: parseInt(n.pageX - o.offsetLeft),
                            y: parseInt(n.pageY - o.offsetTop)
                        }
                    })
                }
            }, {
                key: "click",
                value: function(e) {
                    var t = this,
                        n = "";
                    e.addEventListener("click", function(e) {
                        n = e.currentTarget || e.target, t.state.click = {
                            stamp: (new Date).getTime(),
                            x: e.pageX - n.offsetLeft,
                            y: e.pageY - n.offsetTop
                        }
                    }, !0)
                }
            }, {
                key: "getAntiSpamInfo",
                value: function() {
		    //console.log('getAntiSpamInfo');
                    var e = this.state,
                        t = (e.ad, e.touchStart),
                        n = e.touchEnd,
                        o = e.click,
                        i = e.drag,
                        a = e.closeBtn,
                        r = e.playtime,
                        d = e.changeWindow,
                        s = o.stamp || n.stamp,
                        c = this.state.ad.dom.offsetHeight,
                        p = this.state.ad.dom.offsetWidth;
                    return {
                        g: (n.stamp - t.stamp).toString(),
                        sc: Math.abs(s - n.stamp).toString(),
                        ec: Math.abs(s - t.stamp).toString(),
                        aa: t.x.toString(),
                        ab: t.y.toString(),
                        ba: n.x.toString(),
                        bb: n.y.toString(),
                        da: p.toString(),
                        db: c.toString(),
                        d: i.toString(),
                        p: r.toString(),
                        f: d.toString(),
                        x: a.toString(),
                        dpi: window.devicePixelRatio.toString()
                    }
                }
            }]), e
        }();
        t.default = i
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var o = t[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                    }
                }
                return function(t, n, o) {
                    return n && e(t.prototype, n), o && e(t, o), t
                }
            }(),
            i = r(n(16)),
            a = r(n(4));

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var d = 3e5,
            s = function() {
                function e(t) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.appid = t.appid, this.posid = t.posid, this.host = window.location.host, this.getRestrictMap(), setInterval(this.getRestrictMap.bind(this), d), this.hitRestrictMap()
                }
                return o(e, [{
                    key: "getRestrictMap",
                    value: function() {
                        var e = this;
                        this.getConfigRate(function() {
                            (0, i.default)("//m.gdt.qq.com/manager/api/operation?op_id=h5sdk_control", {}, function(t, n) {
                                null === t && e.setRestrictData(n)
                            })
                        })
                    }
                }, {
                    key: "setRestrictData",
                    value: function(e) {
                        var t = {};
                        0 === e.ret && e.data.map(function(e) {
                            t = e.operation, a.default.setItem("__GDT_H5_RST_MAP", t)
                        })
                    }
                }, {
                    key: "getConfigRate",
                    value: function(e) {
                        try {
                            var t = a.default.getItem("__GDT_H5_RST_MAP"),
                                n = a.default.getItem("__GDT_H5_RST_EXPIRATION"),
                                o = (new Date).getTime(),
                                i = JSON.parse(t).restrict_map;
                            if (n && i && i.rate) o - n >= (i.rate || 1e4) && (e(), a.default.setItem("__GDT_H5_RST_EXPIRATION", o));
                            else e(), a.default.setItem("__GDT_H5_RST_EXPIRATION", o)
                        } catch (t) {
                            var r = (new Date).getTime();
                            return e(), a.default.setItem("__GDT_H5_RST_EXPIRATION", r), !1
                        }
                    }
                }, {
                    key: "hitRestrictMap",
                    value: function(e, t) {
                        try {
                            var n = a.default.getItem("__GDT_H5_RST_MAP"),
                                o = JSON.parse(n).restrict_map,
                                i = t,
                                r = !1;
                            if (o instanceof Object) {
                                if (o.appid && 0 != ~o.appid.indexOf(this.appid)) return r = !0;
                                if (o.posid && 0 != ~o.posid.indexOf(this.posid)) return r = !0;
                                if (o.host && 0 != ~o.host.indexOf(this.host)) return r = !0;
                                if (o.access_count > 0) return r = e >= (i = o.access_count)
                            }
                            return e >= i ? r = !0 : r
                        } catch (e) {
                            return !1
                        }
                    }
                }]), e
            }();
        t.default = s
    },
    function(e, t, n) {
        "use strict";

        function o() {}
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.default = function(e, t, n) {
            var i = "",
                a = null,
                r = "__gdt_jp_" + (new Date).getTime() + parseInt(1e5 * Math.random()),
                d = null !== t.timeout ? t.timeout : 6e3,
                s = encodeURIComponent,
                c = document.getElementsByTagName("script")[0] || document.head;

            function p() {
                i.parentNode && i.parentNode.removeChild(i), window[r] = o, a && clearTimeout(a)
            }
            return "function" == typeof t && (n = t, t = {}), t || (t = {}), d && (a = setTimeout(function() {
                    p(), n && n({
                        ret: -1e3
                    })
                }, d)), window[r] = function(e) {
                    p(), n && n(null, e)
                }, e = (e += (~e.indexOf("?") ? "&" : "?") + "callback=" + s(r)).replace("?&", "?"), (i = document.createElement("script")).src = e, c.parentNode.insertBefore(i, c),
                function() {
                    window[r] && p()
                }
        }
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o, i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var o = t[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                    }
                }
                return function(t, n, o) {
                    return n && e(t.prototype, n), o && e(t, o), t
                }
            }(),
            a = n(2),
            r = (o = a) && o.__esModule ? o : {
                default: o
            };
        var d = function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.state = {
                    cache: []
                }, this.props = {
                    debug: r.default.getParam("debug") || !1
                }, this.initSDK()
            }
            return i(e, [{
                key: "evnet",
                value: function(e, t, n) {
                    try {
                        window.BeaconAction ? window.BeaconAction.onEvent(e, t, n) : this.state.cache.push({
                            eventID: e,
                            eventName: t,
                            params: n
                        })
                    } catch (e) {
                        this.props.debug && console.log(e)
                    }
                }
            }, {
                key: "feedback",
                value: function() {
                    var e = this.state.cache;
                    if (e.length > 0)
                        for (var t in e) window.BeaconAction && window.BeaconAction.onEvent(e[t].eventID, e[t].eventName, e[t].params)
                }
            }, {
                key: "initSDK",
                value: function() {
                    var e = this,
                        t = this.props.debug,
                        n = document.createElement("script");
                    n.src = t ? "//3gimg.qq.com/mig_op/beacon/js/v113/beacon_release_jrlt.js?appkey=JS05KY1G393HQI&vc=1.0.1" : "https:" === window.location.protocol ? "//3gimg.qq.com/mig_op/beacon/js/v113/beacon_release_s.js" : "//3gimg.qq.com/mig_op/beacon/js/v113/beacon_release.js", document.body.appendChild(n), n.onload = function() {
                        e.feedback()
                    }
                }
            }]), e
        }();
        t.default = new d
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o, i = n(4),
            a = (o = i) && o.__esModule ? o : {
                default: o
            };
        var r = {
            getFlowLpData: function() {
                return decodeURIComponent(a.default.getParam("xflow_lp_data"))
            },
            getFlowOpenId: function() {
                var e = r.getFlowLpData();
                return a.default.getParam("open_id", e)
            },
            getFlowNicename: function() {
                var e = r.getFlowLpData();
                return a.default.getParam("nicename", e)
            }
        };
        t.default = r
    }
]);


		
		function _cb_gdtjson2(){}
		function _cb_gdtjson3(){}
		function _cb_gdtjson4(){}
		function _cb_gdtjson5(){}
		function _cb_gdtjson6(){}
		function _cb_gdtjson7(){}
		function _cb_gdtjson8(){}
		function _cb_gdtjson9(){}
		function _cb_gdtjson10(){}
		function _cb_gdtjson11(){}