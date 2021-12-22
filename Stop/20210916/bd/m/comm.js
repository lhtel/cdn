define(function(require, exports, module) {
    var modUtil = require("./util");
    function pingHot(tag, opts) {
        opts = opts || {};
        purl = ['//pingfore.qq.com/pingd', '?dm=e.qq.com.hot', '&url=', escape(location.pathname), '&tt=-', '&hottag=h5_inter.' + tag, '&hotx=' + (opts.x || 9999), '&hoty=' + (opts.y || 9999), '&rand=', Math.random()].join('');
        var i = new Image();
        i.src = purl;
    }
    function callWithSchema(schema) {
        var frame = document.createElement('iframe');
        frame.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;visibility:hidden;';
        frame.frameBorder = '0';
        frame.src = schema;
        document.body.appendChild(frame);
        return frame;
    }
    function skipHttpOrHttpsProtocol(url) {
        if (!url) {
            return url;
        }
        if (url.indexOf("http://") !== -1) {
            url = url.substring(7);
        } else if (url.indexOf("https://") !== -1) {
            url = url.substring(8);
        }
        return url;
    }
    function isHttpsProtocol() {
        if (location.protocol.indexOf("http:") !== -1) {
            return false;
        } else if (location.protocol.indexOf("https:") !== -1) {
            return true;
        }
        return false;
    }
    function getReqCond() {
        var ua = navigator.userAgent || '';
        var obj = {
            c_os: '',
            c_hl: navigator.language
        }
        if (ua.indexOf("TBS/") !== -1 || ua.indexOf("MQQBrowser/") !== -1) {
            obj.flow_source = 2;
            if (ua.indexOf("TBS/") == -1 && ua.indexOf("MQQBrowser/") !== -1) {
                if (window.browser) {
                    if (window.browser.connection) {
                        window.browser.connection.getType(function(state) {
                            var connString = state;
                            if (connString) {
                                if (connString == "wifi") {
                                    obj.conn = 1;
                                } else if (connString == "2g") {
                                    obj.conn = 2;
                                } else if (connString == "3g") {
                                    obj.conn = 3;
                                } else if (connString == "4g") {
                                    obj.conn = 4;
                                } else {
                                    obj.conn = 0;
                                }
                            } else {
                                pingHot('nobrowserconnectionstate');
                            }
                        });
                    } else {
                        pingHot('nobrowserconnection');
                    }
                } else {
                    pingHot('nobrowser');
                }
            }
            if (ua.indexOf("TBS/") !== -1 && ua.indexOf("MQQBrowser/") !== -1) {
                if (window.tbs) {
                    if (window.tbs.network) {
                        var tbsConn = window.tbs.network.type();
                        if (tbsConn) {
                            if (tbsConn == "wifi") {
                                obj.conn = 1;
                            } else if (tbsConn == "2g") {
                                obj.conn = 2;
                            } else if (tbsConn == "3g") {
                                obj.conn = 3;
                            } else if (tbsConn == "4g") {
                                obj.conn = 4;
                            } else {
                                obj.conn = 0;
                            }
                        } else {
                            pingHot('notbsnetworktype');
                        }
                    } else {
                        pingHot('notbsnetwork');
                    }
                } else {
                    pingHot('notbs');
                }
            }
            if (!obj.conn) {
                ua = ua.toLowerCase();
                if (ua.indexOf("nettype/wifi") !== -1) {
                    pingHot('netfromua');
                    obj.conn = 1;
                } else if (ua.indexOf("nettype/2g") !== -1) {
                    pingHot('netfromua');
                    obj.conn = 2;
                } else if (ua.indexOf("nettype/3g") !== -1) {
                    pingHot('netfromua');
                    obj.conn = 3;
                } else if (ua.indexOf("nettype/4g") !== -1 || ua.indexOf("nettype/ctlte") !== -1) {
                    pingHot('netfromua');
                    obj.conn = 4;
                }
            }
        }
        ua = ua.toLowerCase();
        if (/android|adr/.test(ua)) {
            obj.c_os = 'android';
        } else if (/ios|iphone|ipad|itouch/.test(ua)) {
            obj.c_os = 'ios';
        } else {
            pingHot('uncondi');
        }
        return obj;
    }
    function sendMessageToParent(contentObj, domain) {
        if (window.postMessage) {
            window.parent && window.parent.postMessage(JSON.stringify(contentObj), domain);
        }
    }
    function rptcode(ret, domain, cgi, duration) {
        var url, type, time;
        var rate = 100;
        if (Math.random() > 1 / rate) {
            return;
        }
        if (ret == 500) {
            type = 3;
        } else {
            typeof ret === 'undefied' && (ret = 51);
            type = ret >= 50 ? 2 : 1;
        }
        url = 'https://huatuocode.weiyun.com/code.cgi?domain=' + domain + '&cgi=' + cgi + '&code=' + ret + '&rate=' + rate;
        url += '&type=' + type + '&time=' + (duration || 0);
        var rep = new Image();
        rep.src = url;
    }
    function _filterAPPDesc(tplData) {
        var desc = tplData.desc;
        tplData.descDn = "";
        tplData.isFromFeedsAd = false;
        if (desc.length > 14) {
            var tail = desc.length > 28 ? 28 : desc.length;
            tplData.descDn = desc.substring(14, tail);
            tplData.desc = desc.substring(0, 14);
            tplData.isFromFeedsAd = true;
        }
    }
    function addVisibilityEvent(changeFunction) {
        var visibilityChange;
        if (typeof document.hidden !== "undefined") {
            visibilityChange = "visibilitychange";
        } else if (typeof document.mozHidden !== "undefined") {
            visibilityChange = "mozvisibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            visibilityChange = "webkitvisibilitychange";
        }
        modUtil.addEvent(document, visibilityChange, changeFunction);
    }
    function antiSpam(ele, callback) {
        var _s = this;
        this.touchInfo = {};
        if (window.attachEvent) {
            ele.attachEvent('ontouchstart', function(evt) {
                _s.onTouchStart(evt, callback);
            });
            ele.attachEvent('ontouchend', function(evt) {
                _s.onTouchEnd(evt, callback);
            });
        } else {
            ele.addEventListener('touchstart', function(evt) {
                _s.onTouchStart(evt, callback);
            }, false);
            ele.addEventListener('touchend', function(evt) {
                _s.onTouchEnd(evt, callback);
            }, false);
            ele.addEventListener('touchcancel', function(evt) {
                _s.onTouchCancel(evt);
            }, false);
        }
    }
    ;antiSpam.prototype = {
        getFixedX: function(oldX, objInfo) {
            var fixedX = oldX;
            if (!objInfo.adShowWidth) {
                return fixedX;
            }
            if (objInfo.adType == "banner") {
                fixedX = oldX * 320 / objInfo.adShowWidth;
            } else if (objInfo.adType == "inline_full") {
                fixedX = oldX * 320 / objInfo.adShowWidth;
            } else if (objInfo.adType == "inline_half") {
                fixedX = oldX * 300 / objInfo.adShowWidth;
            }
            console.log('fixedX:'+fixedX);
            return parseInt(fixedX);
        },
        getFixedY: function(oldY, objInfo) {
            var fixedY = oldY;
            if (!objInfo.adShowHeight) {
                return fixedY;
            }
            if (objInfo.adType == "banner") {
                fixedY = oldY * 50 / objInfo.adShowHeight;
            } else if (objInfo.adType == "inline_full") {
                fixedY = oldY * 480 / objInfo.adShowHeight;
            } else if (objInfo.adType == "inline_half") {
                fixedY = oldY * 250 / objInfo.adShowHeight;
            }
            console.log('fixedY:'+fixedY);
            return parseInt(fixedY);
        },
        onTouchCancel: function(evt) {
            pingHot('cancel');
        },
        onTouchStart: function(evt, callback) {
            var touches = evt.changedTouches;
            this.touchInfo.startx = touches[0].pageX;
            this.touchInfo.starty = touches[0].pageY;
            this.touchInfo.preclick = new Date().getTime();
            if (callback) {
                callback();
            }
        },
        onTouchEnd: function(evt, callback) {
            var touches = evt.changedTouches;
            this.touchInfo.endx = touches[0].pageX;
            this.touchInfo.endy = touches[0].pageY;
            this.touchInfo.postclick = new Date().getTime();
            if (callback) {
                callback();
            }
        },
        getAntiSpamInfo: function(objInfo) {
            console.log('／／／／／／／／／／／／／／／／');
            console.log(objInfo);
            console.log('／／／／／／／／／／／／／／／／');


            console.log('---------------------------');
            console.log(this.touchInfo);
            console.log('---------------------------');


            console.log('---------------------------');
            console.log(document.body.clientWidth || document.body.offsetWidth);
            console.log(window.navigator.userAgent);

            console.log('---------------------------');


            var info = (typeof objInfo == 'string') ? JSON.parse(objInfo) : objInfo;
            var obj = {};
            var clickedtime = new Date().getTime();


            if (this.touchInfo.preclick && this.touchInfo.postclick) {
                obj.g = '' + (this.touchInfo.postclick - this.touchInfo.preclick);
            } else {
                obj.g = "-999";
            }


            if (this.touchInfo.preclick) {
                obj.ec = '' + (clickedtime - this.touchInfo.preclick);
                this.touchInfo.preclick = '';
            } else {
                obj.ec = "-999";
            }



            if (this.touchInfo.postclick) {
                obj.sc = '' + (clickedtime - this.touchInfo.postclick);
                this.touchInfo.postclick = '';
            } else {
                obj.sc = "-999";
            }



            if (this.touchInfo.startx) {
                obj.aa = '' + this.getFixedX(this.touchInfo.startx, info);
                this.touchInfo.startx = '';
            } else if (info.pageX) {
                obj.aa = '' + this.getFixedX(info.pageX, info);
            } else {
                obj.aa = "-999";
            }



            if (this.touchInfo.starty) {
                obj.ab = '' + this.getFixedY(this.touchInfo.starty, info);
                this.touchInfo.starty = '';
            } else if (info.pageY) {
                obj.ab = '' + this.getFixedY(info.pageY, info);
            } else {
                obj.ab = "-999";
            }


            if (this.touchInfo.endy) {
                obj.bb = '' + this.getFixedY(this.touchInfo.endy, info);
                this.touchInfo.endy = '';
            } else if (info.pageY) {
                obj.bb = '' + this.getFixedY(info.pageY, info);
            } else {
                obj.bb = "-999";
            }


            if (this.touchInfo.endx) {
                obj.ba = '' + this.getFixedX(this.touchInfo.endx, info);
                this.touchInfo.endx = '';
            } else if (info.pageX) {
                obj.ba = '' + this.getFixedX(info.pageX, info);
            } else {
                obj.ba = "-999";
            }
            obj.f = "0";
            if (info.playBeginTime) {
                obj.p = "" + (new Date().getTime() - info.playBeginTime);
            } else {
                obj.p = '-999';
            }
            obj.d = '0';
            if (info.closeBtnDisplayed) {
                obj.x = "1";
            } else {
                obj.x = "0";
            }
            if (info.isClickThrough) {
                obj.ct = info.isClickThrough;
            }
            var fpid = getParameter("fpid");
            console.log('fpid:'+fpid);
            if (fpid && fpid != "") {
                obj.fpid = decodeURIComponent(fpid);
            }

            var ddddddd = encodeURIComponent(JSON.stringify(obj));

            //document.getElementById('abccccc').innerHTML = JSON.stringify(obj);
            console.log(obj);
            return ddddddd;
        }
    }
    function getParameter(name, cancelBubble) {
        var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
        var m = location.href.match(r);
        if ((!m || m == "") && !cancelBubble)
            m = window.location.href.match(r);
        return (!m ? "" : m[2]);
    }
    function checkToLoadTBS(domain) {
        sendMessageToParent({
            op: "checkToLoadTBS"
        }, domain)
    }
    function purl(re, pwindowurl) {
        if (!!pwindowurl)
            return false;
        if (pwindowurl.indexOf('#')) {
            return pwindowurl + '&gdt_result=' + re;
        } else {
            return pwindowurl + '#gdt_result=' + re;
        }
    }
    var mod = {
        pingHot: pingHot,
        getReqCond: getReqCond,
        sendMessageToParent: sendMessageToParent,
        rptcode: rptcode,
        filterAPPDesc: _filterAPPDesc,
        addVisibilityEvent: addVisibilityEvent,
        antiSpam: antiSpam,
        purl: purl,
        checkToLoadTBS: checkToLoadTBS,
        callWithSchema: callWithSchema,
        skipHttpOrHttpsProtocol: skipHttpOrHttpsProtocol,
        isHttpsProtocol: isHttpsProtocol
    };
    return mod;
});
