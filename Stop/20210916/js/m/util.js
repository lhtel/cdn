define(function(require, exports, module) {
    function _$(container) {
        return document.querySelector(container);
    }
    var tmpl = (function() {
            var cache = {};
            function tmpl(str, data) {
                var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) : new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}var out=p.join('');return p.join('');");
                return data ? fn(data) : fn;
            }
            ;return tmpl;
        }
    )();
    function getParameter(name, cancelBubble) {
        var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
        var m = location.href.match(r);
        if ((!m || m == "") && !cancelBubble)
            m = window.location.href.match(r);
        if (name == 'scale'){
            console.log('guai_start');
            console.log(m);
            console.log('guai_end');
        }

        return (!m ? "" : m[2]);
    }
    function checkParam(val) {
        var valid = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）―|{}【】‘；：”“'。，、？]");
        return !valid.test(val);
    }
    function setGlobal(key, value) {
        window.TencentGDT[key] = value;
    }
    function getGlobal(key) {
        if (window.TencentGDT)
            return window.TencentGDT[key];
        return null;
    }
    function loadJS(url, callback, opts) {
        var q, insertNode, loadedList, onLoaded;
        opts = opts || {};
        charset = opts.charset || '';
        loadedList = getGlobal('loadJS');
        if (loadedList && (url in loadedList)) {
            callback();
            return;
        }
        q = document.createElement("script");
        if (callback) {
            onLoaded = function() {
                var loadedList = getGlobal('loadJS');
                !loadedList && (loadedList = {});
                loadedList[url] = 1;
                setGlobal('loadJS', loadedList);
                callback();
                q = null;
                url = null;
            }
            ;
            if (window.ActiveXObject) {
                q.onreadystatechange = function() {
                    var v = this.readyState;
                    if ("loaded" === v || "complete" === v) {
                        onLoaded();
                        onLoaded = null;
                    }
                }
                ;
            } else {
                q.onload = onLoaded;
            }
        }
        q.charset = charset;
        q.src = url;
        insertNode = opts.insertNode || (document.getElementsByTagName("head")[0].firstChild);
        insertNode.parentNode.insertBefore(q, insertNode);
    }
    function imgLoad(img, cb, ecb) {
        if (!img) {
            return;
        }
        if (img.complete) {
            cb();
            return;
        }
        img.onload = function() {
            cb();
            img.onload = null;
        }
        ;
        if (ecb) {
            img.onerror = function() {
                ecb();
                img.onerror = null;
            }
            ;
        }
    }
    function addEvent(elm, type, cb) {
        if (window.attachEvent) {
            elm.attachEvent('on' + type, cb);
        } else {
            elm.addEventListener(type, cb, false);
        }
    }
    function getByteLen(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            if (val[i].match(/[^x00-xff]/ig) != null)
                len += 2;
            else
                len += 1;
        }
        return len;
    }
    function getDeviceOS() {
        var ua = navigator.userAgent || '';
        ua = ua.toLowerCase();
        if (/android|adr/.test(ua)) {
            return 'android';
        } else if (/ios|iphone|ipad|itouch/.test(ua)) {
            return 'ios';
        }
        return null;
    }
    function contains(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }
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
            }
            return Base64;
        }
    )();
    var mod = {
        $: _$,
        tmpl: tmpl,
        loadJS: loadJS,
        getParameter: getParameter,
        checkParam: checkParam,
        imgLoad: imgLoad,
        addEvent: addEvent,
        getByteLen: getByteLen,
        getDeviceOS: getDeviceOS,
        contains: contains,
        Base64: Base64
    };
    return mod;
});
