(function() {
    var NATIVE = {
        conflist: [],
        originConflist: [],
        exposureOids: [],
        rlMap: [],
        apUrlMap: [],
        isAndroidApp: [],
        isIOSApp: [],
        loadedAd: [],
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
            }
        },
        tbsDomain: "recmd.html5.qq.com",
        tbsFlag: "tbs",
        init: function(cfgs) {
            var _s = NATIVE,
                req = _s.getReqCond(cfgs),
                posid = cfgs.posid || cfgs.placement_id,
                count = cfgs.count,
                appid = cfgs.appid || cfgs.app_id,
                information_info = cfgs.information_info || cfgs.informationInfo,
                from = cfgs.from,
                tbsAdConfig = cfgs.tbs_config,
                onComplete = cfgs.onComplete;
            var _GDTH = GDTH;
            if (!_s.checkLoadCondition(posid, count, onComplete))
                return;
            if (tbsAdConfig) {
                if (tbsTool.isTBSPageView()) {
                    commUtil.loadJS("//res.imtt.qq.com/tbs/tbs.js", function() {
                        _GDTH.tbsLoaded = true;
                        if (window.tbs && window.tbs.ad && window.tbs.ad.setAdInfo) {
                            try {
                                var state = tbs.ad.setAdInfo({
                                    ifShowAd: tbsAdConfig.ifShowAd ? tbsAdConfig.ifShowAd : false,
                                    adType: tbsAdConfig.adType ? tbsAdConfig.adType : "splice",
                                    adShape: tbsAdConfig.adShape ? tbsAdConfig.adShape : "",
                                    adPos: tbsAdConfig.adPos ? tbsAdConfig.adPos : "bottom",
                                    appId: appid,
                                    adId: posid
                                });
                                console.log(state);
                            } catch (e) {
                                console.log(e);
                            }
                        } else {
                            console.log("tbsjs not ready");
                        }
                    });
                } else {}
            } else {
                _s.conflist.push({
                    posId: posid,
                    count: count,
                    platform: "mobile",
                    from: from ? from : "",
                    tbsAdConfig: tbsAdConfig ? tbsAdConfig : null,
                    onComplete: function(o) {
                        _s.callback(posid, o, cfgs);
                    },
                    context: {
                        appid: appid,
                        req: {
                            'support_https': commUtil.isHttpsProtocol() ? 1 : 0
                        },
                        common: req
                    },
                    tempContext: {
                        appid: appid,
                        req: {
                            'support_https': commUtil.isHttpsProtocol() ? 1 : 0
                        },
                        common: JSON.parse(JSON.stringify(req))
                    }
                });
                _s.originConflist.push({
                    posId: posid,
                    count: count,
                    platform: "mobile",
                    from: from ? from : "",
                    tbsAdConfig: tbsAdConfig ? tbsAdConfig : null,
                    onComplete: function(o) {
                        _s.callback(posid, o, cfgs);
                    },
                    context: {
                        appid: appid,
                        req: {
                            'support_https': commUtil.isHttpsProtocol() ? 1 : 0
                        },
                        common: req
                    },
                    tempContext: {
                        appid: appid,
                        req: {
                            'support_https': commUtil.isHttpsProtocol() ? 1 : 0
                        },
                        common: JSON.parse(JSON.stringify(req))
                    }
                });
            }
        },
        checkLoadCondition: function(posid, count, onComplete) {
            if (!posid || !posid.match(/^\d+$/))
                return false;
            if (!count || !commUtil.isInteger(count) || count < NATIVE.CONST.MIN_LOADCOUNT || count > NATIVE.CONST.MAX_LOADCOUNT)
                return false;
            if (!onComplete || typeof onComplete != "function")
                return false;
            return true;
        },
        getReqCond: function(cfgs) {
            var _s = NATIVE;
            var ua = navigator.userAgent || '',
                muidtype = cfgs.muidtype || cfgs.muid_type,
                muid = cfgs.muid,
                information_info = cfgs.information_info || cfgs.informationInfo,
                obj = {
                    c_os: '',
                    c_hl: navigator.language || navigator.browserLanguage,
                    url: document.location.href,
                    sdk_src: 'mobile_union_js',
                    tmpallpt: true
                };
            if (window.location != window.parent.location) {
                var referrerurl = document.referrer;
                var referrerUrlLenght = commUtil.getByteLen(referrerurl);
                if (referrerUrlLenght > 0 && referrerUrlLenght < 512) {
                    obj.referrerurl = referrerurl;
                }
            }
            ua = ua.toLowerCase();
            if (tbsTool.isTBSPageView()) {
                obj.flow_source = 2;
                if (window.browser && window.browser.connection) {
                    window.browser.connection.getType(function(state) {
                        var connString = state;
                        if (connString) {
                            if (connString == "wifi") {
                                obj.conn = 1;
                            } else if (connString == "2g") {
                                obj.conn = 2
                            } else if (connString == "3g") {
                                obj.conn = 3
                            } else if (connString == "4g") {
                                obj.conn = 4
                            } else {
                                obj.conn = 0;
                            }
                        }
                    });
                }
                if (window.tbs && window.tbs.network) {
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
                    }
                }
            }
            if (information_info && information_info != 'undefined' && information_info != '') {
                obj.information_info = information_info;
            }
            if (/android|adr/.test(ua)) {
                obj.c_os = 'android';
            } else if (/ios|iphone|ipad|itouch/.test(ua)) {
                obj.c_os = 'ios';
            }
            if (muidtype && commUtil.isValidMuidtype(muidtype) && muid && commUtil.isValidMuid(muid)) {
                obj.muidtype = parseInt(muidtype);
                obj.muid = muid;
            }
            if (commUtil.webpEnabled) {
                obj.webp = '1';
            }
            return obj;
        },
        loadAd: function(pid, fromTbs) {
            var _s = NATIVE,
                req = [];
            for (var i = 0; i < _s.originConflist.length; i++) {
                _s.originConflist[i].context = JSON.parse(JSON.stringify(_s.originConflist[i].tempContext));
                if (pid == _s.originConflist[i].posId) {
                    if (_s.originConflist[i].from && _s.originConflist[i].from == _s.tbsFlag && _s.tbsDomain == document.domain) {
                        if (_s.originConflist[i].context && _s.originConflist[i].context.common && fromTbs) {
                            _s.originConflist[i].context.common.url = fromTbs;
                        }
                    }
                    req.push(_s.refreshConnParam(_s.originConflist[i]));
                    break;
                }
            }
            GDT.load(req);
        },
        checkAndLoadNativeAd: function() {
            var _s = NATIVE;
            if (_s.conflist && _s.conflist.length > 0 && !_s.qbsLoaded) {
                commUtil.loadJS("//qzonestyle.gtimg.cn/qzone/biz/comm/js/qbs.js", function() {
                    _s.qbsLoaded = true;
                    var selfConflist = [];
                    for (var i = 0; i < _s.conflist.length; i++) {
                        if (_s.conflist[i].from && _s.conflist[i].from == _s.tbsFlag && _s.tbsDomain == document.domain) {} else {
                            selfConflist.push(_s.refreshConnParam(_s.conflist[i]));
                        }
                    }
                    GDT.load(selfConflist);
                });
            }
        },
        refreshConnParam: function(config) {
            if (tbsTool.isTBSPageView()) {
                if (config && config.tempContext && config.tempContext.common) {
                    if (!config.tempContext.common.conn) {
                        var ua = navigator.userAgent || '';
                        if (ua.indexOf("TBS/") == -1 && ua.indexOf("MQQBrowser/") !== -1) {
                            if (window.browser) {
                                if (window.browser.connection) {
                                    window.browser.connection.getType(function(state) {
                                        var connString = state;
                                        if (connString) {
                                            if (connString == "wifi") {
                                                config.tempContext.common.conn = 1;
                                            } else if (connString == "2g") {
                                                config.tempContext.common.conn = 2
                                            } else if (connString == "3g") {
                                                config.tempContext.common.conn = 3
                                            } else if (connString == "4g") {
                                                config.tempContext.common.conn = 4
                                            } else {
                                                config.tempContext.common.conn = 0;
                                            }
                                        } else {
                                            commUtil.pingHot('nobrowserconnectionstate');
                                        }
                                    });
                                } else {
                                    commUtil.pingHot('nobrowserconnection');
                                }
                            } else {
                                commUtil.pingHot('nobrowser');
                            }
                        }
                        if (ua.indexOf("TBS/") !== -1 && ua.indexOf("MQQBrowser/") !== -1) {
                            if (window.tbs) {
                                if (window.tbs.network) {
                                    var tbsConn = window.tbs.network.type();
                                    if (tbsConn) {
                                        if (tbsConn == "wifi") {
                                            config.tempContext.common.conn = 1;
                                        } else if (tbsConn == "2g") {
                                            config.tempContext.common.conn = 2;
                                        } else if (tbsConn == "3g") {
                                            config.tempContext.common.conn = 3;
                                        } else if (tbsConn == "4g") {
                                            config.tempContext.common.conn = 4;
                                        } else {
                                            config.tempContext.common.conn = 0;
                                        }
                                    } else {
                                        commUtil.pingHot('notbsnetworktype');
                                    }
                                } else {
                                    commUtil.pingHot('notbsnetwork');
                                }
                            } else {
                                commUtil.pingHot('notbs');
                            }
                        }
                        if (!config.tempContext.common.conn) {
                            ua = ua.toLowerCase();
                            if (ua.indexOf("nettype/wifi") !== -1) {
                                config.tempContext.common.conn = 1;
                                commUtil.pingHot('netfromua');
                            } else if (ua.indexOf("nettype/2g") !== -1) {
                                config.tempContext.common.conn = 2;
                                commUtil.pingHot('netfromua');
                            } else if (ua.indexOf("nettype/3g") !== -1) {
                                config.tempContext.common.conn = 3;
                                commUtil.pingHot('netfromua');
                            } else if (ua.indexOf("nettype/4g") !== -1 || ua.indexOf("nettype/ctlte") !== -1) {
                                config.tempContext.common.conn = 4;
                                commUtil.pingHot('netfromua');
                            }
                        }
                    }
                    config.context = JSON.parse(JSON.stringify(config.tempContext));
                }
            }
            return config;
        },
        isAppAd: function(adData) {
            if (adData && (adData.acttype == NATIVE.CONST.AD_ACTITON_TYPE.APP || adData.producttype == NATIVE.CONST.PRODUCT_TYPE.IOSAPP || adData.producttype == NATIVE.CONST.PRODUCT_TYPE.OPEN_APP || adData.producttype == NATIVE.CONST.PRODUCT_TYPE.MYAPP)) {
                return true;
            } else {
                return false;
            }
        },
        exposeTemplateNativeAd: function(traceid, params) {
            var _s = NATIVE;
            var adObj = _s.loadedAd[traceid];
            if (adObj) {
                var obj = {
                    placement_id: adObj.posid,
                    advertisement_id: adObj.adData.cl
                };
                _s.doExpose(obj);
            }
        },
        clickTemplateNativeAd: function(event, traceid, params) {
            console.log('clickTemplateNativeAd');
            var _s = NATIVE;
            var adObj = _s.loadedAd[traceid];
            if (adObj) {
                var clickInfo = {
                    "down_x": event.pageX,
                    "down_y": event.pageY,
                    "up_x": event.pageX,
                    "up_y": event.pageY
                };
                var obj = {
                    placement_id: adObj.posid,
                    advertisement_id: adObj.adData.cl,
                    s: encodeURIComponent(JSON.stringify(clickInfo))
                };
                _s.doExpose(obj);
                _s.doClick(obj);
            }
        },
        loadIframeUrlJS: function(doc, url, callback) {
            var script = doc.createElement('script');
            script.onload = script.onreadystatechange = script.onerror = function() {
                if (script && script.readyState && /^(?!(?:loaded|complete)$)/.test(script.readyState)) {
                    return;
                }
                script.onload = script.onreadystatechange = script.onerror = null;
                script.src = '';
                script.parentNode.removeChild(script);
                script = null;
                if (callback) {
                    callback();
                }
            };
            script.charset = "utf-8";
            script.src = url;
            try {
                doc.head.appendChild(script);
            } catch (exp) {}
        },
        renderTemplateNativeAd: function(ad, container_id) {
            var container = commUtil.$("#" + container_id),
                adView = NATIVE.loadedAd[ad && ad.tid],
                template = adView && adView.template,
                reltarget = adView && adView.adData && adView.adData.reltarget,
                producttype = adView && adView.adData && adView.adData.producttype,
                packagename = adView && adView.adData && adView.adData.ext && adView.adData.ext.pkg_name,
                appid = adView && adView.adData && adView.adData.ext && adView.adData.ext.appid,
                options = {
                    'packagename': packagename
                };
            if (!container_id || !container) {
                return;
            }
            if (!ad || !ad.tid || !ad.advertisement_id || !ad.placement_id || !adView || !template) {
                return;
            }
            try {
                if (NATIVE.checkEnvironment("inQB") && window.browser && window.browser.app && producttype == NATIVE.CONST.PRODUCT_TYPE.OPEN_APP && reltarget == 1) {
                    window.browser.app.isInstallApk(function(res) {
                        res != true && NATIVE.creatAdframe(ad, container_id, container, template);
                    }, options)
                } else if (NATIVE.checkEnvironment("inQW") && window.tbs && window.tbs.package && producttype == NATIVE.CONST.PRODUCT_TYPE.OPEN_APP && reltarget == 1) {
                    var isInstalled = window.tbs.package.isApkInstalled(options, function(info) {
                        console.log(JSON.stringify(info));
                    });
                    isInstalled != 1 && NATIVE.creatAdframe(ad, container_id, container, template);
                } else {
                    NATIVE.creatAdframe(ad, container_id, container, template);
                }
            } catch (e) {
                NATIVE.creatAdframe(ad, container_id, container, template);
                console.error(e);
            }
        },
        creatAdframe: function(ad, container_id, container, template) {
            var wrap = document.createElement('div');
            var signal = 'gdt_template_native_wrap_' + ad.tid + '_' + ad.advertisement_id;
            wrap.id = signal;
            container.appendChild(wrap);
            var iframeEl = document.createElement("iframe");
            iframeEl.id = signal;
            iframeEl.name = signal;
            wrap.appendChild(iframeEl);
            iframeEl.setAttribute("style", "border:0;width:100%;");
            iframeEl.setAttribute("scrolling", "no");
            var timer = setInterval(function() {
                var iframeDoc = iframeEl.contentDocument || iframeEl.contentWindow.document;
                if (!adTools.checkIsHidden(iframeEl)) {
                    if (iframeDoc.readyState == 'complete' || iframeDoc.readyState == 'interactive') {
                        if (iframeDoc.body.scrollHeight > 150) {
                            iframeEl.style.height = iframeDoc.body.scrollHeight + "px";
                        } else {
                            iframeEl.style.height = iframeDoc.body.getElementsByTagName("div")[0].scrollHeight + "px";
                        }
                        clearInterval(timer);
                        return;
                    }
                }
            }, 300);
            var doc = iframeEl.contentDocument;
            var meta = doc.createElement('meta');
            meta.setAttribute("content", "edge");
            meta.setAttribute("http-equiv", "X-UA-Compatible");
            meta.setAttribute("charset", "utf-8");
            doc.head.appendChild(meta);
            NATIVE.loadIframeUrlJS(doc, "//qzonestyle.gtimg.cn/qzone/biz/res/tmpl/js/templatenative.js", function() {
                doc.body.innerHTML = template;
            });
        },
        processTemplateNativeAd: function(posid, data, cfgs) {
            var adView = [];
            var dataList = data.data;
            var pkgArr = [];
            for (var i = 0; i < dataList.length; i++) {
                var ad = {
                    tid: dataList[i].traceid,
                    advertisement_id: dataList[i].cl,
                    placement_id: posid,
                    item: i
                };
                adView.push(ad);
            }
            cfgs.onComplete && cfgs.onComplete(adView);
        },
        processCustomNativeAd: function(posid, data, cfgs, contentObj) {
            cfgs.onComplete && cfgs.onComplete(contentObj);
        },
        processinQWCustomNativeAd: function(posid, data, cfgs, contentObj) {
            var dataList = data.data;
            var tempData = [];
            for (var i = 0; i < dataList.length; i++) {
                var producttype = dataList[i].producttype,
                    reltarget = dataList[i].reltarget,
                    options = {
                        'packagename': dataList[i].ext.pkg_name
                    };
                if (producttype == NATIVE.CONST.PRODUCT_TYPE.OPEN_APP && reltarget == 1) {
                    var isInstalled = window.tbs.package.isApkInstalled(options, function(info) {});
                    isInstalled != 1 && tempData.push(contentObj.data[i]);
                } else {
                    tempData.push(contentObj.data[i]);
                }
            }
            contentObj.data = tempData;
            cfgs.onComplete && cfgs.onComplete(contentObj);
        },
        processinQBCustomNativeAd: function(posid, data, cfgs, contentObj) {
            var dataList = data.data;
            var tempData = [];
            var flag = dataList.length;

            function sendTemp(flag) {
                if (flag == 0) {
                    contentObj.data = tempData;
                    cfgs.onComplete && cfgs.onComplete(contentObj);
                }
            }
            for (var i = 0; i < dataList.length; i++) {
                var producttype = dataList[i].producttype,
                    reltarget = dataList[i].reltarget,
                    options = {
                        'packagename': dataList[i].ext.pkg_name
                    };
                --flag;
                if (producttype == NATIVE.CONST.PRODUCT_TYPE.OPEN_APP && reltarget == 1) {
                    try {
                        window.browser.app.isInstallApk(function(res) {
                            var _res = JSON.stringify(res);
                            _res != "true" && tempData.push(contentObj.data[i]);
                            sendTemp(flag);
                        }, options)
                    } catch (e) {
                        console.error(e);
                    }
                } else {
                    tempData.push(contentObj.data[i]);
                    sendTemp(flag);
                }
            }
        },
        checkEnvironment: function(env) {
            var ua = navigator.userAgent;
            switch (env) {
                case "inQW":
                    return ua.indexOf("TBS/") !== -1 && ua.indexOf("MQQBrowser/") !== -1;
                    break;
                case "inTBS":
                    return ua.indexOf("TBS/") !== -1 || ua.indexOf("MQQBrowser/") !== -1;
                    break;
                case "inQB":
                    return ua.indexOf("TBS/") == -1 && ua.indexOf("MQQBrowser/") !== -1;
                    break;
                default:
                    return false;
                    break;
            }
        },
        callback: function(posid, data, cfgs) {
            console.log('i.js/callback');
            var _s = NATIVE;
            var contentObj = {};
            var adList = [];
            if (data.ret && data.data && data.data.length > 0) {
                var dataList = data.data;
                for (var i = 0; i < dataList.length; i++) {
                    var traceid = dataList[i].traceid;
                    var cl = dataList[i].cl;
                    _s.loadedAd[traceid] = {
                        posid: posid,
                        adData: dataList[i],
                        template: _s.getTemplateByTraceid(traceid, data.template)
                    };
                    var adObj = {};
                    var elm = dataList[i];
                    _s.rlMap[elm.cl + posid] = elm.rl;
                    _s.apUrlMap[elm.cl + posid] = elm.apurl;
                    if (_s.isAppAd(elm) && elm.producttype == _s.CONST.PRODUCT_TYPE.OPEN_APP) {
                        _s.isAndroidApp[elm.cl] = true;
                    }
                    if (_s.isAppAd(elm) && elm.producttype == _s.CONST.PRODUCT_TYPE.IOSAPP) {
                        _s.isIOSApp[elm.cl] = true;
                    }
                    adObj.advertisement_id = elm.cl;
                    adObj.is_app = _s.isAppAd(elm);
                    adObj.icon_url = elm.img2 || "";
                    adObj.img_url = elm.img || "";
                    adObj.description = elm.desc || "";
                    if (adObj.is_app) {
                        adObj.app_name = elm.txt || "";
                        adObj.app_score = elm.ext && elm.ext.appscore || -1;
                        if (elm.price && elm.price != '-') {
                            adObj.app_price = Number(elm.price);
                        } else {
                            adObj.app_price = -1;
                        }
                        adObj.download_count = elm.ext && elm.ext.alist && elm.ext.alist[2025] && elm.ext.alist[2025].aid && elm.ext.alist[2025].aid.total || -1;
                    } else {
                        adObj.title = elm.txt || "";
                    }
                    for (var j = 0; j < _s.originConflist.length; j++) {
                        if (posid == _s.originConflist[j].posId) {
                            if (_s.originConflist[j].from && _s.originConflist[j].from == _s.tbsFlag && _s.tbsDomain == document.domain) {
                                var click_url = elm.rl;
                                if (_s.isAndroidApp[elm.cl]) {
                                    click_url = ~~click_url.indexOf('&s_lp') > 0 ? click_url : click_url + "&acttype=" + _s.CONST.ACTTYPE_DOWNLOAD;
                                } else {
                                    if (_s.isIOSApp[elm.cl] && navigator && navigator.userAgent && navigator.userAgent.indexOf("MicroMessenger") !== -1) {
                                        click_url = click_url + "&platform=wx&target=appstore";
                                    }
                                }
                                adObj.click_url = click_url;
                            }
                            break;
                        }
                    }
                    adList.push(adObj);
                }
            }
            contentObj = {
                data: adList,
                ret: data.ret
            }
            if (data.template && data.template.length > 0) {
                NATIVE.processTemplateNativeAd(posid, data, cfgs);
            } else {
                if (NATIVE.checkEnvironment("inQB")) {
                    NATIVE.processinQBCustomNativeAd(posid, data, cfgs, contentObj);
                } else if (NATIVE.checkEnvironment("inQW") && window.tbs && window.tbs.package && window.tbs.package.isApkInstalled) {
                    NATIVE.processinQWCustomNativeAd(posid, data, cfgs, contentObj);
                } else {
                    NATIVE.processCustomNativeAd(posid, data, cfgs, contentObj);
                }
            }
        },
        getTemplateByTraceid: function(traceid, templates) {
            if (!templates || templates.length <= 0) {
                return null;
            }
            for (var i = 0; i < templates.length; i++) {
                var view = templates[i].view;
                if (view.indexOf(traceid) >= 0) {
                    return view;
                }
            }
            return null;
        },
        doExpose: function(obj) {
            if (obj && obj.placement_id && obj.advertisement_id) {
                var apurl = NATIVE.apUrlMap[obj.advertisement_id + obj.placement_id];
                if (!NATIVE.exposureOids[apurl]) {
                    GDT.view(obj.placement_id, obj.advertisement_id);
                    NATIVE.exposureOids[apurl] = true;
                }
            }
        },
        doClick: function(obj) {
            console.log('doClick');
            var url, _s = NATIVE;
            for (var j = 0; j < _s.originConflist.length; j++) {
                if (obj.placement_id == _s.originConflist[j].posId) {
                    if (_s.originConflist[j].from && _s.originConflist[j].from == _s.tbsFlag && _s.tbsDomain == document.domain) {
                        return;
                    }
                    break;
                }
            }
            if (obj && obj.s && obj.advertisement_id && obj.placement_id) {
                var apurl = NATIVE.apUrlMap[obj.advertisement_id + obj.placement_id];
                if (NATIVE.exposureOids[apurl]) {
                    try {
                        var gdt_fp = commUtil.getCookie("gdt_fp");
                        if (gdt_fp) {
                            var tempS = decodeURIComponent(obj.s);
                            tempS = JSON.parse(tempS);
                            tempS.fpid = gdt_fp;
                            obj.s = encodeURIComponent(JSON.stringify(tempS));
                        }
                    } catch (e) {}
                    url = _s.rlMap[obj.advertisement_id + obj.placement_id] + "&s=" + obj.s;
                    if (_s.isAndroidApp[obj.advertisement_id]) {
                        url = ~~url.indexOf('&s_lp') > 0 ? url : url + "&acttype=" + _s.CONST.ACTTYPE_DOWNLOAD;
                        window.open(url);
                    } else {
                        if (_s.isIOSApp[obj.advertisement_id] && navigator && navigator.userAgent && navigator.userAgent.indexOf("MicroMessenger") !== -1) {
                            url = url + "&platform=wx&target=appstore";
                        }
                        window.open(url);
                    }
                } else {
                    return {
                        ret: 1,
                        msg: 'error，不能进行点击跳转'
                    }
                }
            }
        }
    };
    var GDTH = {
        posid: '',
        apurl: '',
        tplType: '',
        posw: 300,
        posh: 250,
        needMask: false,
        adType: '',
        bannerbox: {},
        tbsWebviewValidateValue: 0,
        webviewType: 0,
        missExpose: false,
        tbsLoaded: false,
        posborder: 4,
        //adDomain: 'qzonestyle.gtimg.cn',
        adDomain: 'core.6187wo.com',//core.6187wo.com
        onClose: function() {},
        onFail: function() {},
        posDomain: '',
        postNum: '',
        init: function(obj) {
            GDTH.cfgs = obj;
            var cfg = obj;
            obj.adType = obj.type;
            GDTH.filltype = cfg.filltype || cfg.fill_type;
            GDTH.adType = cfg.adType;
            GDTH.posDomain = encodeURIComponent(document.location.protocol + '//' + document.location.host);
            GDTH.postNum = Math.random();
            GDTH.posid = cfg.posid || cfg.placement_id;
            GDTH.initPlatform();
            if (cfg.adType == 'banner') {
                GDTH.initBanner(obj);
            } else if (cfg.adType == 'interstitial') {
                GDTH.initInter(obj);
            } else if (cfg.adType == 'native') {
                NATIVE.init(obj);
            }
            commUtil.debugTest();
        },
        initPlatform: function() {
            GDTH.platform = 'web';
            if (navigator.userAgent.search('QQ/') !== -1) {
                GDTH.platform = 'mqq';
                var _js = document.createElement('script');
                _js.src = '//pub.idqqimg.com/qqmobile/qqapi.js?_bid=152';
                document.body.appendChild(_js);
            } else if (navigator.userAgent.search('Qzone') !== -1) {
                if (!window.QZAppExternal || !QZAppExternal.getPlatform) {
                    var _js = document.createElement('script');
                    _js.src = '//qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js';
                    document.body.appendChild(_js);
                }
                GDTH.platform = 'mqzone';
                GDTH.isHybrid = true;
            } else {
                GDTH.isHybrid = false;
            }
        },
        BannerCb: {
            onBannerLoaded: function() {}
        },
        initBanner: function(obj) {
            var _s = GDTH;
            var bwidth = [640, 480, 320, 240];
            var bheight = [100, 75, 50, 38];
            var w = 480;
            var h = 75;
            var os = GDTH.getOs();
            if (window.screen) {
                w = window.screen.width;
                h = window.screen.height;
                if (os == 'ios') {
                    w *= window.devicePixelRatio;
                    h *= window.devicePixelRatio;
                }
            } else if (document.body) {
                var pixdevice = window.devicePixelRatio || 1;
                w = document.body.clientWidth * pixdevice;
                h = document.body.clientHeight * pixdevice;
            }
            if (w < h) {
                var swap = h;
                h = w;
                w = swap;
            }
            if (w > bwidth[0]) {
                _s.bannerbox.posw = bwidth[0];
                _s.bannerbox.posh = bheight[0];
            } else if (w > bwidth[1]) {
                _s.bannerbox.posw = bwidth[1];
                _s.bannerbox.posh = bheight[1];
            } else if (w > bwidth[2]) {
                _s.bannerbox.posw = bwidth[2];
                _s.bannerbox.posh = bheight[2];
            } else {
                _s.bannerbox.posw = bwidth[3];
                _s.bannerbox.posh = bheight[3];
            }
            _s.posw = _s.bannerbox.posw;
            _s.posh = _s.bannerbox.posh;
            _s.BannerCb.onBannerLoaded = obj.onBannerLoaded;
            _s.renderBannerWindow(obj);
        },
        getOs: function() {
            var ua = navigator.userAgent || '';
            ua = ua.toLowerCase();
            if (/android|adr/.test(ua)) {
                return 'android';
            } else if (/ios|iphone|ipad|itouch/.test(ua)) {
                return 'ios';
            }
            return 'uncondi';
        },
        loadGDT: function() {
            GDTH.renderWindow({}, GDTH.posw, GDTH.posh, GDTH.zIndex);
        },
        getWidthHeight: function() {
            var _dw = document.body.clientWidth || 640;
            var _dh = document.body.clientHeight || 100;
            if (_dw > _dh) {
                var swap = _dw;
                _dw = _dh;
                _dh = swap;
            }
            var _s = GDTH;
            _s.inter_posw = 300;
            _s.inter_posh = 250;
            if (_s.inter_posw * 2 < _dw) {
                _s.inter_posw *= 2;
                _s.inter_posh *= 2;
            }
        },
        renderBannerWindow: function(cfg) {
            GDTH.posborder = 0;
            //GDTH.renderWindow(cfg, 0, 0, 1, '//qzonestyle.gtimg.cn/qzone/biz/res/tmpl/banner.html');
            GDTH.renderWindow(cfg, 0, 0, 1, 'http://core.6187wo.com/js/banner.html');
        },
        checkParam: function(val) {
            var valid = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
            return !valid.test(val);
        },
        getUid: function() {
            var sid = commUtil.getParameter('sid');
            var openid = commUtil.getParameter('openid');
            var openkey = commUtil.getParameter('openkey');
            var re = '';
            if (sid && commUtil.checkParam(sid)) {
                re += '&sid=' + encodeURIComponent(sid);
            }
            if (openid && commUtil.checkParam(openid)) {
                re += '&openid=' + encodeURIComponent(openid);
            }
            if (openkey && commUtil.checkParam(openkey)) {
                re += '&openkey=' + encodeURIComponent(openkey);
            }
            return re;
        },
        renderWindow: function(cfgs, width, height, zIndex, htmlurl) {
            console.log('i.js/renderWindow');
            var wTmpl = '<div class="gdth_popup_floater"></div><div class="gdth_popup_wrap" style="margin:0 auto;position:relative;{OTHER}">\
                            {CLOSEDIV}\
                                <iframe id="{IFRID}" style="position:static !important;display:block !important;margin:0 !important;padding:0 !important;visibility:visible !important;float:none !important;border-width:0 !important;width:{W};height:{H};"\
                                scrolling=no frameBorder=0 marginHeight=0 marginWidth=0 allowTransparency=true \
                                src="{HTMLURL}#{PARAM}"></iframe>{LOGO}\
                        </div>';
            var _s = GDTH;
            console.log(htmlurl);
            if (!htmlurl) {
                htmlurl = '//qzonestyle.gtimg.cn/qzone/biz/res/tmpl/interstitial.html';
            }
            _s.zIndex = zIndex;
            var appid = cfgs.appid || cfgs.app_id,
                muidtype = cfgs.muidtype || cfgs.muid_type,
                muid = cfgs.muid,
                posid = cfgs.posid || cfgs.placement_id,
                hasBannerCB = _s.BannerCb.onBannerLoaded ? true : false;
            var information_info = cfgs.information_info || cfgs.informationInfo;
            var taglist = cfgs.taglist || cfgs.tag_list;
            var posclass = cfgs.posclass || cfgs.pos_class;
            var pwinw = _s.inter_posw;
            var pwinh = _s.inter_posh;
            if (cfgs.adType == 'banner') {
                pwinw = _s.posw;
                pwinh = _s.posh;
            }
            var params = '_spoint=' + GDTH._spoint + '&posid=' + encodeURIComponent(posid) + '&posh=' + pwinh + '&posw=' + pwinw + '&posdomain=' + _s.posDomain + '&postnum=' + _s.postNum + '&adtype=' + encodeURIComponent(cfgs.adType) + '&ishybrid=' + GDTH.isHybrid + '&platform=' + GDTH.platform + '&posclass=' + encodeURIComponent(posclass) + '&hasBannerCB=' + encodeURIComponent(hasBannerCB);
            if (appid && appid != 'undefined') {
                params += '&appid=' + encodeURIComponent(appid);
            }
            if (taglist && taglist != 'undefined') {
                params += '&taglist=' + encodeURIComponent(taglist);
            }
            if (muidtype && muidtype != 'undefined' && muid && muid != 'undefined') {
                params += '&muidtype=' + encodeURIComponent(muidtype) + '&muid=' + encodeURIComponent(muid);
            }
            if (information_info && information_info != 'undefined' && information_info != '') {
                params += '&information_info=' + encodeURIComponent(information_info);
            }
            var __w = document.body.clientWidth || document.body.offsetWidth;
            var __h = document.body.clientHeight || document.body.offsetHeight;
            params += '&win_w=' + __w;
            params += '&win_h=' + __h;
            var cid = cfgs.containerid || cfgs.container_id;
            var conw = 0,
                conh = 0;
            if (cid) {
                _s.container = commUtil.$('#' + cid);
                if (!adTools.checkIsHidden(_s.container)) {
                    conw = '' + _s.container.clientWidth;
                    conh = '' + _s.container.clientHeight;
                    CONST.BANNER_IFRAME_WIDTH = _s.container.clientWidth;
                    conw = conw.replace(/px/, '');
                    conh = conh.replace(/px/, '');
                    if (conw.indexOf('%') != -1)
                        conw = 0;
                    if (conh.indexOf('%') != -1)
                        conh = 0;
                    conw && (params += '&conw=' + conw) && (__w = conw);
                    conh && (params += '&conh=' + conh);
                }
            }
            var scale = (__w / 320) || 1;
            _s.scale = scale;
            params += '&scale=' + scale;
            params += '&conw=' + conw;
            var visiturl = document.location.href;
            params += '&visiturl=' + encodeURIComponent(visiturl);
            params += '&referrerurl=' + encodeURIComponent((window.location != window.parent.location) ? document.referrer : "");
            params += '&iframeheight=' + CONST.BANNER_IFRAME_HEIGHT;
            params += '&iframewidth=' + CONST.BANNER_IFRAME_WIDTH;
            if (cid && commUtil.$('#' + cid)) {
                var cidRect = commUtil.$('#' + cid).getBoundingClientRect();
                if (cidRect) {
                    params += '&iframetop=' + cidRect.top;
                }
            } else {
                var dom = commUtil.$('#gdt-' + _s.posid);
                if (dom) {
                    var domRect = dom.getBoundingClientRect();
                    if (domRect) {
                        params += '&iframetop=' + domRect.top;
                    }
                }
            }
            params += '&documentElementClientHeight=' + document.documentElement.clientHeight;
            var tempFp = commUtil.getCookie("gdt_fp");
            if (tempFp && tempFp != "") {
                params += '&fpid=' + encodeURIComponent(tempFp);
            }
            wTmpl = wTmpl.replace(/{HTMLURL}/, htmlurl).replace(/{PARAM}/, params + _s.getUid());
            var wrap = document.createElement('div');
            wrap.setAttribute('style', 'display:none');
            wrap.id = 'gdt_banner_popup_wrap';
            if (cfgs.adType == 'banner') {
                var logo_width = 30,
                    logo_height = 10;
                wrap.innerHTML = wTmpl.replace(/{OTHER}/, 'max-width:1280px;').replace(/{W}/, '100%').replace(/{IFRID}/, 'gdt_banner_ifr').replace(/{LOGO}/, '<div id="gdt_logo" style="background-image:url(//qzonestyle.gtimg.cn/open_proj/proj-gdt-toufang/img/ad-sign/logo-ad-s.png);background-size: cover;width:' + logo_width + 'px;height:' + logo_height + 'px;position: absolute;right: 0;bottom: 0;"><i ></i></div>').replace(/{H}/, '').replace(/{CLOSEDIV}/, '');
                var fixed = (cfgs.position == 'fixed') ? 'position:fixed' : '';
                if (cid && commUtil.$('#' + cid)) {
                    fixed = '';
                    commUtil.$('#' + cid).appendChild(wrap);
                } else {
                    var dom = commUtil.$('#gdt-' + _s.posid);
                    dom.parentNode.insertBefore(wrap, dom);
                }
                wrap.setAttribute('style', fixed + ';left:0px;bottom:0;width:100%;display:none');
            } else {
                var close_wh = 'width:30px;height: 30px;';
                var h_wrap = document.createElement('div');
                h_wrap.id = 'gdt_inter_popup_wrap';
                if (_s.inter_posw == 600 || _s.inter_posw == 500) {
                    close_wh = 'width:60px;height: 60px;';
                }
                _s.btn_pos = 9;
                if (_s.inter_posw == 600) {
                    _s.btn_pos = 18;
                }
                var logo_width = 36,
                    logo_height = 12;
                wTmpl = wTmpl.replace(/{OTHER}/, 'display: inline-block;"  id="gdth_popup_wrap').replace(/{W}/, _s.inter_posw + 'px').replace(/{H}/, _s.inter_posh + 'px').replace(/{LOGO}/, '<div id="gdt_logo" style="background-image:url(//qzonestyle.gtimg.cn/open_proj/proj-gdt-toufang/img/ad-sign/logo-ad-s.png);background-size: cover;width:' + logo_width + 'px;height:' + logo_height + 'px;position: absolute;right: 0;bottom: 0;"><i ></i></div>').replace(/{IFRID}/, 'gdt_ifr').replace(/{CLOSEDIV}/, '<a href="javascript:" style="' + close_wh + 'position: absolute;right:4px;top:5px;text-indent: -9999px;overflow: hidden;z-index: 100;" onclick="GDT.closeWindow(this)" class="icon_close">关闭</a>');
                h_wrap.innerHTML = wTmpl;
                h_wrap.style.display = 'none';
                document.body.appendChild(h_wrap);
            }

            console.log('here');

            if (window.postMessage) {
                console.log('here1');
                GDTH.initPostMsg();
            } else if (cfgs.adType == 'banner') {
                console.log('here2');
                console.log('1');
                GDTH.showBannerWin();
            }
        },
        setOnorientationChangeScale: function(adType) {
            var conw = document.body.clientWidth,
                scale = (conw / 320) || 1;
            GDTH.scale = scale;
            console.log('2');
            GDTH.showBannerWin();
            adTools.postMessage(adType, {
                scale: scale,
                flag: "onorientationchange"
            }, GDTH.adDomain);
        },
        onorientationChange: function(adType) {
            var _this = this;
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
                setTimeout(function() {
                    _this.setOnorientationChangeScale(adType);
                }, 100)
                setTimeout(function() {
                    _this.setOnorientationChangeScale(adType);
                }, 400)
            }, false);
        },
        initPostMsg: function() {
            console.log('initPostMsg');
            if (GDTH.bindPostMsg)
                return;
            GDTH.bindPostMsg = true;
            GDTH.onorientationChange("banner");
            commUtil.addEvent(window, 'message', function(evt) {

                var evt_origin = evt.origin;
                evt_origin = commUtil.skipHttpOrHttpsProtocol(evt_origin);

                //console.log('evt_origin:'+evt_origin);
                //console.log('GDTH.adDomain:'+GDTH.adDomain);
                //

                if (!evt_origin || evt_origin != GDTH.adDomain)
                    return;
                if (!evt || !evt.data)
                    return;
                var ext = (typeof evt.data == 'string') ? JSON.parse(evt.data) : evt.data;

                if (!re && !ext)
                    return;
                var re = ext.result;
                // console.log('///////////////');
                // console.log(re);
                // console.log('---------------');
                if (re == 'fail') {
                    GDTH.closeWindow();
                    GDTH.IntersCb.onFail && GDTH.IntersCb.onFail();
                } else if (re == 'success') {
                    console.log('3');
                    GDTH.showBannerWin();
                } else if (ext.op) {
                    if (ext.op == 'checkToLoadTBS') {
                        if (tbsTool.isTBSsupported()) {
                            tbsTool.tbsLoad();
                        }
                    } else if (ext.op == 'mqzoneclick') {
                        commUtil.pingHot('mqzoneclicked');
                        QZAppExternal.callSchema(function(data) {}, {
                            url: "mqzone://arouse/webview?source=push&url=" + ext.url + '&safari=0&version=1'
                        });
                    } else if (ext.op === 'mclick') {
                        var isApp = ext.isApp;
                        window.mqq && mqq.ui && mqq.ui.openUrl({
                            url: decodeURIComponent(ext.url),
                            target: (isApp ? 2 : 1),
                            style: 3
                        });
                    } else if (ext.op === 'androidAppOtherClick') {
                        location.href = decodeURIComponent(ext.url);
                    } else if (ext.op === 'loaededad') {
                        GDTH.adready = true;
                        GDTH.IntersCb.onInterstitialLoaded();
                        commUtil.$('.gdth_popup_floater').style.marginBottom = -this.inter_posh / 2 + 'px';
                    } else if (ext.op === 'googleInterstitialLoaded') {
                        GDTH.adready = true;
                        GDTH.IntersCb.onInterstitialLoaded();
                        commUtil.$('#gdt_logo').style.display = "none";
                        commUtil.$('.gdth_popup_floater').style.marginBottom = -this.inter_posh / 2 + 'px';
                    } else if (ext.op == 'showbigsize') {
                        GDTH.adready = true;
                        GDTH.IntersCb.onInterstitialLoaded();
                        commUtil.$('#gdt_ifr').style.width = '580px';
                        commUtil.$('#gdt_ifr').style.height = '900px';
                        commUtil.$('#gdt_logo').style.right = '0';
                        commUtil.$('.gdth_popup_floater').style.marginBottom = '-450px';
                        GDTH.fixFullAdPos(290, 450);
                        window.addEventListener('orientationchange', function(e) {
                            GDTH.fixFullAdPos(290, 450);
                        })
                    } else if (ext.op == 'checkHidden') {
                        var adType = ext.type;
                        var posid = ext.posid;
                        var flag = ext.flag;
                        var elm = adTools.getBaseNode(adType);
                        logicExpose.checkHidden(elm, posid, adType, flag);
                    } else if (ext.op == 'exposeCheck') {
                        var adType = ext.type;
                        var posid = ext.posid;
                        var apurl = ext.apurl;
                        var tplType = ext.tplType;
                        logicExpose.prepare(adType, posid, apurl, tplType, imgState);
                    } else if (ext.op == 'getImgStatus') {
                        var adType = ext.type;
                        var posid = ext.posid;
                        var imgState = ext.isImgComplete;
                        logicExpose.imgExposeCheck(adType, posid, apurl, tplType, imgState);
                    } else if (ext.op == 'showBanner') {
                        console.log('4');
                        GDTH.showBannerWin();
                    } else if (ext.op == 'noAd') {
                        console.log('5');
                        GDTH.showBannerWin();
                        GDTH.BannerCb.onBannerLoaded && GDTH.BannerCb.onBannerLoaded({
                            ret: 1,
                            msg: 'no ad'
                        });
                    } else if (ext.op == 'showGoogleBanner') {
                        var iframeHeight = GDTH.scale * CONST.BANNER_IFRAME_HEIGHT;
                        commUtil.$('#gdt_banner_popup_wrap').style.display = '';
                        commUtil.$('#gdt_banner_ifr').style.height = iframeHeight + 'px';
                        commUtil.$('#gdt_banner_popup_wrap').style.height = iframeHeight + 'px';
                        commUtil.$('#gdt_logo').style.display = "none";
                    }
                }
            });
        },
        posWinW: 0,
        posWinH: 0,
        fixNormalAdPos: function() {
            var wrap = commUtil.$('#gdt_inter_popup_wrap');
            if (!wrap)
                return;
            wrap.style.textAlign = 'center';
            wrap.querySelector('.gdth_popup_floater').style.height = '50%';
            wrap.querySelector('.gdth_popup_floater').style.position = 'relative';
            var _m = this.inter_posh || 250;
            wrap.querySelector('.gdth_popup_floater').style.marginBottom = -_m / 2 + 'px';
        },
        fixFullAdPos: function(pw, ph) {
            var ori = window.orientation || screen.orientation;
            if (ori && (ori == 90 || ori == -90 || ori == 270)) {
                commUtil.$('#gdth_popup_wrap').style.webkitTransform = 'rotate(-90deg)';
            } else {
                commUtil.$('#gdth_popup_wrap').style.webkitTransform = '';
            }
            var win_w = document.body.clientWidth;
            var win_h = document.body.clientHeight;
            var tar_x = win_w / 2 - pw;
            var tar_y = win_h / 2 - ph;
        },
        getParameter: function(name, cancelBubble) {
            var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
            var m = location.href.match(r);
            if ((!m || m == "") && !cancelBubble)
                m = window.location.href.match(r);
            return (!m ? "" : m[2]);
        },
        windowShowing: false,
        showWindow: function() {
            if (GDTH.windowShowing || !GDTH.adready)
                return;
            GDTH.windowShowing = true;
            GDTH.needMask && GDTH.showMask(GDTH.zIndex - 1);
            commUtil.$('#gdt_inter_popup_wrap').setAttribute('style', 'position: absolute;overflow: hidden;width: 100%;height: 100%;left: 0;top: 0;z-index:' + GDTH.zIndex);
            var ifr = commUtil.$("#gdt_ifr");
            var domain = GDTH.adDomain;
            if (commUtil.isHttpsProtocol()) {
                domain = "https://" + domain;
            } else {
                domain = "http://" + domain;
            }
            ifr.contentWindow.postMessage(JSON.stringify({
                op: 'exp'
            }), domain);
            GDTH.fixNormalAdPos();
        },
        showBannerWin: function() { //接收来自 m.js 中 postmessage  success处理
            var iframeHeight = GDTH.scale * CONST.BANNER_IFRAME_HEIGHT;
            commUtil.$('#gdt_banner_popup_wrap').style.display = '';
            commUtil.$('#gdt_banner_ifr').style.height = iframeHeight + 'px';
            commUtil.$('#gdt_banner_popup_wrap').style.height = iframeHeight + 'px';
            GDTH.showedBannerWindow = true;
        },
        closeWindow: function(_s) {
            var dom = commUtil.$('#gdt_inter_popup_wrap');
            dom.setAttribute('style', 'display:none;');
            commUtil.pingHot('close_inters');
            GDTH.hideMask();
            GDTH.IntersCb.onClose && GDTH.IntersCb.onClose();
            GDTH.windowShowing = false;
        },
        MASKID: 'gdt_mask',
        showMask: function(zIndex) {
            var mask = GDTH.MASKID;
            if (commUtil.$('#' + mask))
                return;
            var dom = document.createElement('div');
            dom.id = mask;
            dom.setAttribute('style', 'display:block;position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:black;opacity:.70;-moz-opacity:0.7;filter:alpha(opacity=70);z-index:' + zIndex);
            document.body.appendChild(dom);
        },
        hideMask: function() {
            var dom = commUtil.$('#' + GDTH.MASKID);
            dom && dom.parentNode.removeChild(dom);
        },
        IntersCb: {
            onClose: function() {},
            onInterstitialLoaded: function() {}
        },
        initInter: function(obj) {
            var supportPostMsg = !!(window.postMessage);
            var cfg = obj;
            GDTH.zIndex = cfg.zIndex || cfg.z_index || 9999;
            GDTH.getWidthHeight();
            GDTH.needMask = !!(cfg.showmask || cfg.show_mask);
            var loadWhenInit = cfg.load;
            GDTH.IntersCb.onClose = cfg.onClose;
            GDTH.IntersCb.onInterstitialLoaded = cfg.onInterstitialLoaded;
            GDTH.renderWindow(cfg, GDTH.inter_posw, GDTH.inter_posh, GDTH.zIndex);
        },
        collectDPI: function() {
            window.setTimeout(function() {
                var _w = window.screen.width || 10000;
                var _f = 4;
                if (_w < 100) {
                    _f = 1;
                } else if (_w < 300) {
                    _f = 2;
                } else if (_w < 600) {
                    _f = 3;
                }
                var _d = '' + window.devicePixelRatio;
                if (_d) {
                    _d = _d.replace(/\./g, '_');
                }
                commUtil.pingHot('screen' + _f + '.dpi' + _d);
                var ourl = 'ns';
                if (window.URL && URL.createObjectURL) {
                    ourl = 'ss';
                }
                commUtil.pingHot(ourl + '.' + GDTH.getOs());
            }, 500);
        }
    };
    var CONST = {
        VALID_VISUAL_DISTANCE: 40,
        BANNER_IFRAME_HEIGHT: 50,
        BANNER_IFRAME_WIDTH: document.body.clientWidth || document.body.offsetWidth
    };
    var commUtil = (function() {
        var mod = {};
        mod.webpEnabled = false;
        mod.loadJS = function(url, callback) {
            var head = document.getElementsByTagName("head")[0];
            var script = document.createElement('script');
            script.onload = script.onreadystatechange = script.onerror = function() {
                if (script && script.readyState && /^(?!(?:loaded|complete)$)/.test(script.readyState))
                    return;
                script.onload = script.onreadystatechange = script.onerror = null;
                script.src = '';
                script.parentNode.removeChild(script);
                script = null;
                if (typeof callback == "function") {
                    callback();
                }
            };
            script.charset = "utf-8";
            script.src = url;
            try {
                head.appendChild(script);
            } catch (exp) {}
        }
        mod.getByteLen = function(val) {
            var len = 0;
            for (var i = 0; i < val.length; i++) {
                if (val[i].match(/[^x00-xff]/ig) != null)
                    len += 2;
                else
                    len += 1;
            }
            return len;
        }
        mod.getParameter = function(name, cancelBubble) {
            var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
            var m = location.href.match(r);
            if ((!m || m == "") && !cancelBubble)
                m = window.location.href.match(r);
            return (!m ? "" : m[2]);
        }
        mod.checkParam = function(val) {
            var valid = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
            return !valid.test(val);
        }
        mod.skipHttpOrHttpsProtocol = function(url) {
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
        mod.isHttpsProtocol = function() {
            if (location.protocol.indexOf("http:") !== -1) {
                return false;
            } else if (location.protocol.indexOf("https:") !== -1) {
                return true;
            }
            return false;
        }
        mod.pingHot = function(tag, opts) {
            opts = opts || {};
            purl = ['//pingfore.qq.com/pingd', '?dm=gdt.qq.com.hot', '&url=', escape(location.pathname), '&tt=-', '&hottag=h5_inter.' + tag, '&hotx=' + (opts.x || 9999), '&hoty=' + (opts.y || 9999), '&rand=', Math.random()].join('');
            var i = new Image();
            i.src = purl;
        }
        mod.extendIframe = function(h, w) {
            var _f = commUtil.$('#gdt_ifr');
            _f.width = w + 'px';
            _f.height = h + 'px';
            _f.style.width = w + 'px';
            _f.style.height = h + 'px';
        }
        mod.addEvent = function(elm, type, cb) {
            if (window.attachEvent) {
                elm.attachEvent('on' + type, cb);
            } else {
                elm.addEventListener(type, cb, false);
            }
        }
        mod.$ = function(wrap) {
            return document.querySelector(wrap);
        }
        mod.isInteger = function(obj) {
            return typeof obj === 'number' && obj % 1 === 0
        }
        mod.isValidMuid = function(val) {
            var valid = new RegExp("[^a-f0-9]");
            return !valid.test(val);
        }
        mod.isValidMuidtype = function(val) {
            if (parseInt(val)) {
                var valid = new RegExp("[^1-3]");
                return !valid.test(val);
            }
            return false;
        }
        mod.checkWebp = function(cb) {
            var image = new Image();
            image.onerror = function() {
                mod.webpEnabled = false;
                cb && cb();
            };
            image.onload = function() {
                mod.webpEnabled = true;
                cb && cb();
            };
            image.src = 'data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA==';
        }
        mod.debugTest = function() {
            var divObj = document.createElement("div");
            divObj.style.position = "fixed";
            divObj.style.backgroundColor = 'gray';
            var first = document.body.firstChild;
            document.body.insertBefore(divObj, first);
            GDTH.divObj = divObj;
            GDTH.divObj.innerHTML = '';
        }
        mod.log = function(str) {
            GDTH.divObj.innerHTML += str + '</br>';
        }
        mod.getCookie = function(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            } else {
                return null;
            }
        }
        mod.setCookie = function(name, value, expiresTime) {
            try {
                document.cookie = name + "=" + escape(value) + ";expires=" + expiresTime.toGMTString();
            } catch (e) {
                console.error(e);
            }
        }
        return mod;
    })();
    var exposeCheck = (function() {
        var a = {},
            expose = {};
        a.init = function(apurl, windowClientHeight, posid) {
            expose.apurl = apurl;
            expose.windowClientHeight = windowClientHeight;
            expose.posid = posid;
        }
        a.check = function(posTop, posid) {
            if (posid == expose.posid) {
                var visualDistance = parseInt(window.pageYOffset) + parseInt(expose.windowClientHeight) - parseInt(posTop);
                if (document.readyState == 'complete') {
                    if (visualDistance > CONST.VALID_VISUAL_DISTANCE) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    setTimeout(function() {
                        a.check(posTop, posid);
                    }, 50);
                }
            }
        }
        return a;
    })();
    var logicExpose = (function() {
        var mod = {};
        var _s = GDTH;
        mod.bindScroll = {};
        mod.posTop = 0;
        mod.tbsAdInfo = {};
        mod.prepare = function(adType, posid, apurl, tplType, imgState) {
            mod.posid = posid;
            mod.apurl = apurl;
            if (tbsTool.isTBSsupported()) {
                tbsTool.tbsAdInfo.adtype = adType;
                tbsTool.tbsAdInfo.posid = posid;
                tbsTool.tbsAdInfo.apurl = apurl;
                if (_s.tbsLoaded && _s.webviewType == 1) {
                    tbsTool.tbsExposeCheck();
                } else if (_s.tbsLoaded && _s.webviewType == 2 && _s.missExpose) {
                    logicExpose.doExpose(adType, posid, apurl);
                    _s.missExpose = false;
                } else if (!_s.tbsLoaded) {
                    tbsTool.tbsLoad();
                } else if (_s.webviewType != 1 && _s.webviewType != 2) {
                    mod.initExpose(adType, posid, apurl, tplType, imgState);
                    commUtil.addEvent(document, 'scroll', function() {
                        mod.scrollFunc(adType, posid, apurl, tplType, imgState);
                    });
                    mod.bindScroll[posid] = true;
                }
            } else {
                mod.initExpose(adType, posid, apurl, tplType, imgState);
                commUtil.addEvent(document, 'scroll', function() {
                    mod.scrollFunc(adType, posid, apurl, tplType, imgState);
                });
                mod.bindScroll[posid] = true;
            }
        }
        mod.checkHidden = function(elm, id, adType, flag) {
            var hiddenStatus;
            var isHidden = adTools.checkIsHidden(elm);
            if (isHidden) {
                hiddenStatus = "true";
            } else {
                hiddenStatus = "false";
            }
            if (hiddenStatus) {
                adTools.postHiddenStatus(adType, hiddenStatus, id, flag);
            }
        }, mod.initExpose = function(adType, posid, apurl, tplType, imgState) {
            if (document.readyState == 'complete') {
                var windowClientHeight = document.documentElement.clientHeight;
                exposeCheck.init(apurl, windowClientHeight, posid);
                mod.commonExposeCheck(adType, posid, apurl, tplType, imgState);
            } else {
                setTimeout(function() {
                    mod.initExpose(adType, posid, apurl, tplType, imgState);
                }, 50);
            }
        }
        mod.calculateElmTop = function(adType) {
            var elm = adTools.getBaseNode(adType);
            var posTop = elm.offsetTop;
            return posTop;
        }
        mod.commonExposeCheck = function(adType, posid, apurl, tplType, imgState) {
            if (tplType && tplType == 'tplImg' && !imgState) {
                adTools.postMessage(adType, {
                    op: 'checkImg',
                    id: posid
                }, _s.adDomain);
                mod.imgExposeCheck(adType, posid, apurl, tplType, imgState);
            } else {
                mod.doExposeCheck(adType, posid, apurl, tplType);
            }
        }
        mod.imgExposeCheck = function(adType, posid, apurl, tplType, imgState) {
            if (imgState && mod.posid == posid) {
                if (!apurl) {
                    apurl = mod.apurl;
                }
                mod.doExposeCheck(adType, posid, apurl, tplType);
            } else {
                setTimeout(arguments.callee, 50);
            }
        }
        mod.doExposeCheck = function(adType, posid, apurl, tplType) {
            var posTop = mod.calculateElmTop(adType);
            if (exposeCheck.check(posTop, posid)) {
                mod.doExpose(adType, posid, apurl, posTop);
            }
        }
        mod.doExpose = function(adType, posid, apurl, posTop) {
            if (mod.bindScroll[posid]) {
                document.removeEventListener('scroll', mod.scrollFunc, false);
                mod.bindScroll[posid] = false;
            }
            adTools.postMessage(adType, {
                op: 'doExpose',
                apurl: apurl,
                id: posid,
                posTop: posTop
            }, _s.adDomain);
        }
        mod.scrollFunc = function(adType, posid, apurl, tplType, imgState) {
            if (_s.handler) {
                _s.handler = null;
            }
            mod.bundleSetTimeout(adType, posid, apurl, tplType, imgState);
        }
        mod.bundleSetTimeout = function(adType, posid, apurl, tplType, imgState) {
            _s.handler = window.setTimeout(function() {
                mod.commonExposeCheck(adType, posid, apurl, tplType, imgState);
            }, 50);
        }
        return mod;
    })();
    var tbsTool = (function() {
        var mod = {},
            _s = GDTH;
        mod.tbsAdInfo = {};
        mod.isTBSPageView = function() {
            var ua = navigator.userAgent;
            if (ua.indexOf("TBS/") !== -1 || ua.indexOf("MQQBrowser/") !== -1) {
                return true;
            } else {
                return false;
            }
        }
        mod.isTBSsupported = function() {
            var ua = navigator.userAgent;
            if (ua.indexOf("TBS") !== -1 && typeof window.tbsJs !== undefined && tbsJs.isTbsJsapiEnabled()) {
                return true;
            } else {
                return false;
            }
        }
        mod.tbsExposeCheck = function() {
            if (mod.tbsAdInfo.adtype && mod.tbsAdInfo.posid && mod.tbsAdInfo.apurl) {
                var posTop = logicExpose.calculateElmTop(mod.tbsAdInfo.adtype);
                if ((_s.tbsWebviewValidateValue > CONST.VALID_VISUAL_DISTANCE) && (_s.tbsWebviewValidateValue - posTop > CONST.VALID_VISUAL_DISTANCE)) {
                    logicExpose.doExpose(mod.tbsAdInfo.adtype, mod.tbsAdInfo.posid, mod.tbsAdInfo.apurl);
                }
            }
        }
        mod.tbsReady = function() {
            try {
                tbs.event.onwebviewvalidate(function(ret) {
                    var webviewType = typeof ret.webview_type !== "undefined" ? ret.webview_type : "-1";
                    if (webviewType === "-1" || webviewType === "1") {
                        _s.tbsWebviewValidateValue = ret.value;
                        _s.webviewType = 1;
                        mod.tbsExposeCheck();
                    } else if (webviewType === "2") {
                        _s.webviewType = 2;
                        if (mod.tbsAdInfo.adtype && mod.tbsAdInfo.posid && mod.tbsAdInfo.apurl) {
                            logicExpose.doExpose(mod.tbsAdInfo.adtype, mod.tbsAdInfo.posid, mod.tbsAdInfo.apurl);
                        } else {
                            _s.missExpose = true;
                        }
                    }
                });
            } catch (e) {}
        }
        mod.tbsLoad = function() {
            commUtil.loadJS("//res.imtt.qq.com/tbs/tbs.js", function() {
                _s.tbsLoaded = true;
                tbsTool.tbsReady();
            });
        }
        return mod;
    })();
    var adTools = (function() {
        var mod = {},
            _s = GDTH;
        mod.getBaseNode = function(adType) {
            var elm;
            if (adType == "banner") {
                elm = commUtil.$('#gdt_banner_popup_wrap');
            } else {
                elm = commUtil.$('#gdt_inter_popup_wrap');
            }
            return elm;
        }
        mod.getIfr = function(adType) {
            var ifr;
            if (adType == "banner") {
                ifr = commUtil.$('#gdt_banner_ifr');
            } else {
                ifr = commUtil.$('#gdt_ifr');
            }
            return ifr;
        }
        mod.checkIsHidden = function(elm) {
            var isHidden = false;
            while (elm != document) {
                if (elm != document && elm.style.display != "none" && elm.style.visibility != "hidden" && elm.style.visibility != "collapse") {
                    elm = elm.parentNode;
                } else if (elm.style.display == "none" || elm.style.visibility == "hidden" || elm.style.visibility == "collapse") {
                    isHidden = true;
                    break;
                }
            }
            return isHidden;
        }
        mod.postHiddenStatus = function(adType, hiddenStatus, id, flag) {
            var scale, showedBanner;
            if (GDTH.container && !mod.checkIsHidden(GDTH.container)) {
                var conw = '' + GDTH.container.clientWidth;
                scale = (conw / 320) || 1;
            }
            if (GDTH.showedBannerWindow) {
                showedBanner = GDTH.showedBannerWindow;
            }
            mod.postMessage(adType, {
                isAdHidden: hiddenStatus,
                scale: scale,
                showedBanner: showedBanner,
                id: id,
                flag: flag
            }, GDTH.adDomain);
        }
        mod.postMessage = function(adType, contentObj, domain) {
            var ifr = adTools.getIfr(adType);
            if (commUtil.isHttpsProtocol()) {
                domain = "https://" + domain;
            } else {
                domain = "http://" + domain;
            }
            ifr.contentWindow && ifr.contentWindow.postMessage(JSON.stringify(contentObj), domain);
        }
        return mod;
    })();
    window.GDT = {
        loadGDT: GDTH.loadGDT,
        closeWindow: GDTH.closeWindow,
        showWindow: GDTH.showWindow,
        log: function() {
            console.log(window.TencentGDT);
            console.log(document.location.href);
            console.log(document.head.querySelector('[name=viewport]'));
        },
        init: function(obj) {
            var arrs = window.TencentGDT;
            if (obj) {
                GDTH.init(obj);
            } else {
                for (var i = 0, len = arrs.length; i < len; i++) {
                    GDTH.init(arrs[i]);
                }
            }
            NATIVE.checkAndLoadNativeAd();
        }
    };
    GDTH._spoint = +new Date;
    window.TencentGDT.NATIVE = {
        loadAd: NATIVE.loadAd,
        loadCallback: NATIVE.callback,
        doExpose: NATIVE.doExpose,
        doClick: NATIVE.doClick,
        renderAd: NATIVE.renderTemplateNativeAd
    }
    window.TencentGDT.TN = {
        doExpose: NATIVE.exposeTemplateNativeAd,
        doClick: NATIVE.clickTemplateNativeAd
    }
    var arrs = window.TencentGDT;
    var initAdEntry = function() {
        if (arrs && arrs.length) {
            //if (!commUtil.getCookie("gdt_fp")) {
                setTimeout(function() {
                    try {
                        new Fingerprint2().get(function(result, components) {
                            if (result) {
                                var exp = new Date();
                                exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 365)
                                commUtil.setCookie("gdt_fp", result, exp);
                            }
                        });
                    } catch (e) {
                        console.log(e)
                    }
                }, 2000);
            //}
            arrs = arrs.sort(function(a, b) {
                if (a.type && a.type == 'banner')
                    return -1;
                return 1;
            });
            if (arrs[0].type && arrs[0].type != 'banner') {
                for (var i = 0, len = arrs.length; i < len; i++) {
                    GDTH.init(arrs[i]);
                }
                NATIVE.checkAndLoadNativeAd();
                return;
            }
            var wanbaurl = '//qzonestyle.gtimg.cn/qzone/qzact/act/game/ad/index.js?v=20141119';
            var wanbaifr = '//qzs.qq.com/qzone/qzact/act/game/ad/proxy/index.html';
            var domain = 'qzs.qq.com';
            if (arrs[0].appflag === 1) {
                var d = document.createElement('script');
                d.src = wanbaurl;
                d.onload = function() {
                    wanbaAd && wanbaAd.init && wanbaAd.init(arrs);
                };
                document.body.appendChild(d);
            } else {
                window.addEventListener('message', function(evt) {
                    var evt_origin = evt.origin;
                    evt_origin = commUtil.skipHttpOrHttpsProtocol(evt_origin);
                    if (evt_origin && evt_origin == domain) {
                        if (!evt.data)
                            return;
                        var d = (typeof evt.data == 'string') ? JSON.parse(evt.data) : evt.data;
                        if (d.appflag !== 1 && d.appflag !== 0)
                            return;
                        if (d && d.appflag === 0) {
                            for (var i = 0, len = arrs.length; i < len; i++) {
                                GDTH.init(arrs[i]);
                            }
                            NATIVE.checkAndLoadNativeAd();
                        } else {
                            var d = document.createElement('script');
                            d.src = wanbaurl;
                            d.onload = function() {
                                wanbaAd && wanbaAd.init && wanbaAd.init(arrs);
                            };
                            document.body.appendChild(d);
                        }
                    }
                });
                var ifr = document.createElement('iframe');
                ifr.style = 'width:0;height:0;display:none;';
                ifr.width = 0;
                ifr.height = 0;
                ifr.frameBorder = 0;
                ifr.src = wanbaifr;
                document.body.appendChild(ifr);
                return;
            }
        }
    }
    var init = function() {
        if (window.jsInited) {
            return;
        }
        window.jsInited = true;
        if (tbsTool.isTBSPageView()) {
            var _js = document.createElement('script');
            _js.src = '//jsapi.qq.com/get?api=connection.* ';
            document.body.appendChild(_js);
            var _qbs = document.createElement('script');
            _qbs.src = '//jsapi.qq.com/get?api=app.*';
            document.body.appendChild(_qbs);
            var _tbsjs = document.createElement('script');
            _tbsjs.src = '//res.imtt.qq.com/tbs/tbs.js';
            document.body.appendChild(_tbsjs);
        }
        //if (!commUtil.getCookie("gdt_fp")) {
            var _fingerprintsjs = document.createElement('script');
            _fingerprintsjs.src = 'http://core.6187wo.com/js/m/finger.js';
            document.body.appendChild(_fingerprintsjs);
        //}
        commUtil.checkWebp(initAdEntry);
    }
    init();
})();