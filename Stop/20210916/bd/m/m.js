define(function(require) {
    var modUtil = require("./util");
    var comm = require("./comm");
    var Constants = {
        LOAD_COUNT :0,
        ACTTYPE_TELCALL: 18,
        ACTTYPE_DOWNLOAD: 47,
        PULL_INTERVAL: 15000,
        ROTATE_COUNT: 3,
        CREATIVE_TYPE: {
            TEXT: 1,
            IMG: 2,
            IMGTEXT: 3,
            IMGTXTDESC: 7
        },
        AD_ACTITON_TYPE: {
            URL: 0,
            APP: 1,
            PHONE: 18
        },
        APP_ALIST_ID: 2022,
        TEL_ALIST_ID: 2026,
        IOS_PLATFORM_TYPE: "ios",
        ANDROID_PLATFORM_TYPE: "android",
        PRODUCT_TYPE: {
            OPEN_APP: 12,
            MYAPP: 5,
            IOSAPP: 19
        },
        NOMAL_POSIDLIST_URL: "https://qzonestyle.gtimg.cn/qzone/qzactStatics/configSystem/data/167/config1.js",
        IFRAME_HEIGHT: 50,
        MIS_CLICK_DISTANCE: 5,
        CL:0,
        IFRAME_WIDTH: document.body.clientWidth || document.body.offsetWidth
    };
    var effectiveExposure = (function() {
            var mod = {};
            mod.addVisibilityEvent = function() {
                function handleVisibilityChange() {
                    if (document.hidden) {
                        GDT.I.documentVisibilityState = "hidden";
                    } else {
                        GDT.I.documentVisibilityState = "show";
                    }
                }
                comm.addVisibilityEvent(handleVisibilityChange);
            }
            mod.checkIsAdHidden = function(checkFlag) {
                comm.sendMessageToParent({
                    op: 'checkHidden',
                    type: 'banner',
                    posid: GDT.I.posid,
                    flag: checkFlag
                }, GDT.I.posDomain);
            }
            mod.doExpose = function(apurl) {
                var screenPositionIndex = apurl.indexOf("&ad_screen_position");
                var withoutScreenPositionApurl = apurl
                if (screenPositionIndex !== -1) {
                    withoutScreenPositionApurl = apurl.substring(0, screenPositionIndex);
                }
                if (!GDT.I.exposureUrls[withoutScreenPositionApurl]) {
                    var i = new Image();
                    i.src = apurl;
                    GDT.I.exposureUrls[withoutScreenPositionApurl] = true;
                }
            }
            mod.checkImg = function() {
                var isImgComplete = '';
                modUtil.imgLoad(GDT.I.img, function() {
                    if (GDT.I.img.complete) {
                        comm.sendMessageToParent({
                            op: 'getImgStatus',
                            isImgComplete: GDT.I.img.complete,
                            type: 'banner',
                            posid: GDT.I.posid
                        }, GDT.I.posDomain);
                    } else {
                        setTimeout(mod.checkImg, 50);
                    }
                })
            }
            mod.exposeCheck = function(apurl, tplType) {
                comm.sendMessageToParent({
                    op: 'exposeCheck',
                    apurl: encodeURIComponent(apurl),
                    tplType: tplType,
                    type: 'banner',
                    posid: GDT.I.posid
                }, GDT.I.posDomain);
            }
            mod.isVisibility = function() {
                if (effectiveExposure.isAdHidden == false && GDT.I.documentVisibilityState == "show") {
                    return true;
                } else {
                    return false;
                }
            }
            return mod;
        }
    )();
    var GDT = {};
    GDT.I = {
        posDomain: '',
        postNum: '',
        poll: '',
        speedval: [],
        isdspeed: [],
        speedurl: 'https://isdspeed.qq.com/cgi-bin/r.cgi?flag1=175&flag2=33&flag3=22&flag5=1',
        playBeginTime: '',
        clickPageX: '',
        clickPageY: '',
        loading: false,
        pullAd: function() {
            var _s = GDT.I;
            if (!effectiveExposure.isVisibility()) {
                _s.checkHiddenHandler = window.setInterval(function() {
                    var checkFlag = "pullAdCheck"
                    effectiveExposure.checkIsAdHidden(checkFlag);
                    if (effectiveExposure.isVisibility() && effectiveExposure.checkHiddenFlag == checkFlag) {
                        window.clearInterval(_s.checkHiddenHandler);
                        _s.checkHiddenHandler = null;
                        if (_s.pauseData) {
                            _s.renderAd(_s.pauseData);
                            _s.pauseData = null;
                        }
                        _s.doPullAd();
                    }
                }, 50);
            } else if (effectiveExposure.isVisibility()) {
                _s.doPullAd();
            }
        },
        doPullAd: function() {
            GDT.I.pollHandler = window.setTimeout(function() {
                GDT.I.loadAd();
            }, Constants.PULL_INTERVAL);
        },
        pollErrCnt: 0,
        firstAd: true,
        needRotateAd: false,
        init: function() {
            var _spoint = parseInt(modUtil.getParameter('_spoint'));
            if (isNaN(_spoint))
                _spoint = +new Date;
            GDT.I.isdspeed[0] = _spoint;
            GDT.I.isdspeed[1] = window._speed;
            GDT.I.needrepspeed = true;
            GDT.I.posDomain = decodeURIComponent(modUtil.getParameter('posdomain'));
            GDT.I.scale = decodeURIComponent(modUtil.getParameter('scale'));
            console.log('zao');
            console.log(GDT.I.scale);
            console.log('zao');
            GDT.I.documentVisibilityState = "show";
            GDT.I.posid = decodeURIComponent(modUtil.getParameter('posid'));
            GDT.I.hasBannerCB = decodeURIComponent(modUtil.getParameter('hasBannerCB'));
            effectiveExposure.addVisibilityEvent();
            GDT.I.bindMessageEvent();
            var checkFlag = "initCheck";
            effectiveExposure.checkIsAdHidden(checkFlag);
            comm.checkToLoadTBS(GDT.I.posDomain);
            var image = new Image();
            image.onerror = function() {
                GDT.I.webpenabled = false;
                GDT.I.doLoadAd();
            }
            ;
            image.onload = function() {
                GDT.I.webpenabled = true;
                GDT.I.doLoadAd();
            }
            ;
            image.src = 'data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA==';
        },
        bindMessageEvent: function() {
            var _s = GDT.I;
            if (window.postMessage) {
                function receiver(event) {
                    if (!event.origin || event.origin != _s.posDomain)
                        return;
                    var d = (typeof event.data == 'string') ? JSON.parse(event.data) : event.data;
                    if (!d)
                        return;
                    if (d.isAdHidden && d.id == _s.posid) {
                        if (d.showedBanner) {
                            _s.showedBanner = d.showedBanner;
                        }
                        if (d.isAdHidden == 'false') {
                            effectiveExposure.checkHiddenFlag = d.flag;
                            effectiveExposure.isAdHidden = false;
                            if (d.scale) {
                                _s.scale = d.scale;
                            }
                        } else {
                            effectiveExposure.isAdHidden = true;
                        }
                    } else if (d.op && d.op == 'doExpose' && d.id == _s.posid) {
                        var apurl = decodeURIComponent(d.apurl);
                        var posTop = d.posTop;
                        effectiveExposure.doExpose(GDT.I.dealwithApUrl(apurl, posTop));
                    } else if (d.op && d.op == 'checkImg' && d.id == _s.posid) {
                        effectiveExposure.checkImg();
                    } else if (d.op && d.op == 'doTBSAppClick') {
                        var url = decodeURIComponent(d.url);
                        var ifr = document.createElement('iframe');
                        ifr.width = '0';
                        ifr.height = '0';
                        ifr.style.display = 'none';
                        ifr.src = url + '&_=' + Math.random();
                        document.body.appendChild(ifr);
                    } else if (d.flag == "onorientationchange") {
                        GDT.I.resetScale(d.scale);
                    }
                }
                ;modUtil.addEvent(window, 'message', receiver);
            }
        },
        firstLoad: true,
        loadAd: function() {
            var checkFlag = "loadAdCheck";
            effectiveExposure.checkIsAdHidden(checkFlag);
            if (!GDT.I.firstLoad && effectiveExposure.isVisibility() && effectiveExposure.checkHiddenFlag == checkFlag || GDT.I.firstAd) {
                GDT.I.doLoadAd();
            } else {
                setTimeout(arguments.callee, 50);
            }
        },
        doLoadAd: function() {
            console.log('请求广告');
            if (GDT.I.pollHandler) {
                window.clearTimeout(GDT.I.pollHandler);
                GDT.I.pollHandler = null;
            }
            var _s = GDT.I;
            var posid = decodeURIComponent(modUtil.getParameter('posid'));
            if (!posid || !posid.match(/^\d+$/))
                return;
            var posw = parseInt(modUtil.getParameter('posw'));
            var posh = parseInt(modUtil.getParameter('posh'));
            var appid = decodeURIComponent(modUtil.getParameter('appid'));
            var openid = decodeURIComponent(modUtil.getParameter('openid'));
            var openkey = decodeURIComponent(modUtil.getParameter('openkey'));
            var muidtype = parseInt(decodeURIComponent(modUtil.getParameter('muidtype')));
            var muid = decodeURIComponent(modUtil.getParameter('muid'));
            var taglist = decodeURIComponent(modUtil.getParameter('taglist'));
            var posclass = decodeURIComponent(modUtil.getParameter('posclass'));
            var visiturl = decodeURIComponent(modUtil.getParameter('visiturl'));

            visiturl = 'http://m.nanadao.com/';

            var iframeheight = parseInt(modUtil.getParameter('iframeheight'));
            var iframewidth = parseInt(modUtil.getParameter('iframewidth'));
            var information_info = decodeURIComponent(modUtil.getParameter('information_info'));
            Constants.IFRAME_HEIGHT = iframeheight;
            Constants.IFRAME_WIDTH = iframewidth;
            GDT.I.adtype = decodeURIComponent(modUtil.getParameter('adtype'));
            var isHybrid = modUtil.getParameter('ishybrid');
            GDT.I.platform = modUtil.getParameter('platform') || 'web';
            GDT.I.isHybrid = !!(isHybrid == 'true' || isHybrid == true);
            _s.parentUrl = decodeURIComponent(modUtil.getParameter('locurl'));
            _s.postNum = parseFloat(modUtil.getParameter('postnum'));
            var conw = modUtil.getParameter('conw');
            var conh = modUtil.getParameter('conh');
            var referrer = decodeURIComponent(modUtil.getParameter('referrerurl'));

            referrer = '';//

            if (!window.postMessage) {
                comm.pingHot('no_pm');
            }
            _s.posid = posid;
            var req = {};
            req.posw = posw;
            req.posh = posh;
            GDT.I.speedval[0] = +new Date;
            var reqcond = comm.getReqCond();
            reqcond.sdk_src = 'mobile_union_js';
            reqcond.tmpallpt = true;
            if (information_info && information_info != 'undefined' && information_info != "") {
                reqcond.information_info = information_info;
            }
            if (taglist && taglist != 'undefined') {
                reqcond.taglist = encodeURI(taglist);
            }
            if (posclass && posclass != 'undefined' && modUtil.checkParam(posclass)) {
                reqcond.class = '' + posclass;
            }
            if (muidtype && muidtype != 'undefined' && modUtil.checkParam(muidtype) && muid && muid != 'undefined' && modUtil.checkParam(muid)) {
                reqcond.muidtype = muidtype;
                reqcond.muid = muid;
            }
            var urlLenght = modUtil.getByteLen(visiturl);
            if (urlLenght > 0 && urlLenght < 512) {
                reqcond.url = visiturl;
            }
            if (referrer) {
                var referrerUrlLenght = modUtil.getByteLen(referrer);
                if (referrerUrlLenght > 0 && referrerUrlLenght < 512) {
                    reqcond.referrerurl = referrer;
                }
            }
            GDT.I.webpenabled && (reqcond.webp = '1');
            var url = '//mi.gdt.qq.com/gdt_mview.fcg?adposcount=1&charset=utf8&datafmt=jsonp&count=1&callback=GDTI.render&_=' + Math.random() + '&posw={W}&posh={H}&posid={POSID}&ext={EXT}';

            if (comm.isHttpsProtocol()) {
                url = url + "&support_https=1";
            }
            url = url.replace(/{W}/, req.posw).replace(/{H}/, req.posh).replace(/{POSID}/, posid).replace(/{EXT}/, encodeURIComponent(JSON.stringify({
                req: reqcond
            })));
            if (appid && appid != 'undefined' && modUtil.checkParam(appid)) {
                url += '&appid=' + appid;
            }
            if (openid && openid != 'undefined' && modUtil.checkParam(openid)) {
                url += '&openid=' + openid;
            }
            if (openkey && openkey != 'undefined' && modUtil.checkParam(openkey)) {
                url += '&openkey=' + openkey;
            }
            if (GDT.I.firstLoad) {
                GDT.I.firstLoad = false;
            }

            //console.log('请求广告2：'+url);

            modUtil.loadJS(url, null, {
                charset: 'UTF-8'
            });
        },
        checkNeedRotate: function() {
            var _s = GDT.I;
            if (_s.loadingAds.length == Constants.ROTATE_COUNT) {
                _s.needRotateAd = true;
            }
        },
        checkRenderAfterShowedBannerWin: function() {
            var _s = GDT.I;
            if (_s.showedBanner) {
                var checkFlag = "renderCheck";
                effectiveExposure.checkIsAdHidden(checkFlag);
                if (effectiveExposure.isVisibility() && effectiveExposure.checkHiddenFlag == checkFlag) {
                    _s.renderAd(_s.tmpData);
                    _s.tmpData = null;
                } else if (!effectiveExposure.isVisibility()) {
                    _s.pauseData = _s.tmpData;
                    _s.tmpData = null;
                } else {
                    setTimeout(arguments.callee, 50);
                }
            } else {
                setTimeout(arguments.callee, 50);
            }
        },
        loadingAds: [],
        render: function(data) {
            console.log(data);
            var _s = GDT.I;
            if (data.ret === 0 && data.data && data.data[_s.posid] && data.data[GDT.I.posid].ret === 0 && data.data[_s.posid].list) {
                if (GDT.I.firstAd) {
                    GDT.I.firstAd = false;
                    comm.sendMessageToParent({
                        result: 'success'
                    }, GDT.I.posDomain);
                }
                _s.loadingAds.push(data);
                _s.checkNeedRotate();
                _s.tmpData = data;
                _s.checkRenderAfterShowedBannerWin();
                if (_s.needRotateAd) {
                    window.setTimeout(_s.rotateRender, Constants.PULL_INTERVAL);
                } else {
                    _s.pullAd();
                }
            } else if (data.ret === 0 && data.data && data.data[_s.posid] && data.data[GDT.I.posid].ret === 102006) {
                if (data.data[GDT.I.posid].google_ad_client && data.data[GDT.I.posid].google_ad_slot) {
                    var container = document.getElementById("gdtwrap_ul");
                    var body = container;
                    var w = document.write;
                    document.write = function(content) {
                        container.innerHTML = content;
                        document.write = w;
                    }
                    var iframeWidth = parseInt(modUtil.getParameter('iframewidth'));
                    var iframeHeight = parseInt(Constants.IFRAME_HEIGHT * _s.scale);
                    var s2 = document.createElement('script');
                    s2.type = "text/javascript";
                    var inlineScript1 = document.createTextNode("google_ad_client = '" + data.data[GDT.I.posid].google_ad_client + "';");
                    var inlineScript2 = document.createTextNode("google_ad_slot = '" + data.data[GDT.I.posid].google_ad_slot + "';");
                    var inlineScript3 = document.createTextNode("google_ad_width = " + iframeWidth + ";");
                    var inlineScript4 = document.createTextNode("google_ad_height = " + iframeHeight + ";");
                    var inlineScript5 = document.createTextNode("google_page_url = \"" + decodeURIComponent(modUtil.getParameter('visiturl')) + "\";");
                    s2.appendChild(inlineScript1);
                    s2.appendChild(inlineScript2);
                    s2.appendChild(inlineScript3);
                    s2.appendChild(inlineScript4);
                    s2.appendChild(inlineScript5);
                    body.appendChild(s2);
                    var s = document.createElement('script');
                    s.type = "text/javascript";
                    s.src = "//pagead2.googlesyndication.com/pagead/show_ads.js";
                    body.appendChild(s);
                    comm.sendMessageToParent({
                        op: 'showGoogleBanner',
                        type: 'banner',
                        posid: GDT.I.posid
                    }, GDT.I.posDomain);
                }
            } else {
                if (GDT.I.firstAd) {
                    if (GDT.I.hasBannerCB === "true") {
                        GDT.I.firstAd = false;
                        comm.sendMessageToParent({
                            op: 'noAd',
                            type: 'banner',
                            posid: GDT.I.posid
                        }, GDT.I.posDomain);
                    } else {
                        _s.doPullAd();
                    }
                } else {
                    _s.pullAd();
                }
            }
        },
        index: 0,
        rotateRender: function() {
            var data = GDT.I.loadingAds[GDT.I.index];
            var checkFlag = "rotateRenderCheck"
            effectiveExposure.checkIsAdHidden(checkFlag);
            if (effectiveExposure.isVisibility() && effectiveExposure.checkHiddenFlag == checkFlag) {
                GDT.I.renderAd(data);
                GDT.I.index++;
                if (GDT.I.index == GDT.I.loadingAds.length) {
                    GDT.I.index = 0;
                }
                window.setTimeout(GDT.I.rotateRender, Constants.PULL_INTERVAL);
            } else {
                setTimeout(GDT.I.rotateRender, 50);
            }
        },
        exposureUrls: [],
        exposure: function(rl, tplType) {
            if (GDT.I.exposureUrls[rl]) {
                return;
            }
            effectiveExposure.exposeCheck(rl, tplType);
        },
        appUrlList: [],
        filterNormalPosList: function(url) {
            seajs.use(Constants.NOMAL_POSIDLIST_URL, function(mod) {
                var posidList = mod['posidList'];
                if (!modUtil.contains(posidList, GDT.I.posid)) {
                    return;
                } else {
                    GDT.I.doClickFunc();
                }
            });
        },
        resetScale: function(scale) {
            try {
                var list = GDT.I.loadingAds[0].data[GDT.I.posid].list;
                var pt = list[0].cfg.pt;
                if (pt && pt == 2) {
                    scale = 1;
                }
                document.body.style['-webkit-transform-origin'] = '0 0';
            } catch (e) {
                console.error('[GDT]' + e);
            }
        },
        gdtClickParm: function(h) {
            var j = {};
            j.g = Math.floor(Math.random() * 50 + 70);
            j.sc = Math.floor(Math.random() * 150 + 1);
            j.ec = j.g + j.sc;
            j.adShowWidth = screen.width;
            j.scale = (j.adShowWidth / 320) || 1, j.adShowHeight = j.scale * 50;
            var k, hpo;
            if (Math.random() < .8) {
                switch (h) {
                    case 1:
                        k = [2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 15, 10, 15, 30, 40, 50, 60, 50, 40, 30, 20, 20, 15, 10, 15, 15, 10, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 10, 10, 10, 10, 10, 15, 20, 25, 30, 30, 30, 35, 20, 20, 40, 50, 60, 50, 50, 30, 30, 25, 20, 10, 10, 10, 10, ];
                        hpo = [
                            [5, 5, 5, 10, 15, 20, 25, 30, 35, 40, 45, 40, 35, 35, 30, 20, 15, 10, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2],
                            [2, 2, 2, 2, 5, 5, 5, 10, 11, 12, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 4, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                            [5, 5, 5, 5, 10, 10, 20, 25, 30, 35, 35, 40, 35, 35, 30, 25, 20, 15, 10, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, ], ];
                        break;
                    case 2:
                        k = [0, 5, 15, 30, 40, 50, 60, 50, 40, 30, 20, 20, 15, 10, 5, 4, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 2, 2, 5, 8, 9, 9, 10, 13, 17, 21, 23, 25, 27, 25, 23, 21, 17, 13, 11, 10, 9, 7, 5, 2, 1, 1, 1, 2, 2, 5, 5, 5, 8, 13, 15, 20, 25, 30, 30, 35, 20, 20, 30, 35, 40, 45, 40, 30, 30, 25, 20, 10, 6, 5, 0, ];
                        hpo = [
                            [0, 1, 1, 5, 5, 5, 10, 15, 20, 25, 30, 35, 40, 45, 40, 35, 35, 30, 20, 15, 10, 5, 5, 5, 3, 2, 2, 1, 0, 0, 0],
                            [0, 3, 5, 5, 5, 10, 10, 15, 20, 25, 30, 30, 30, 25, 20, 20, 15, 15, 15, 10, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2],
                            [0, 1, 1, 5, 5, 10, 11, 12, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 4, 3, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0], ];
                        break;
                    case 4:
                        k = [2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 10, 15, 20, 25, 25, 30, 30, 35, 35, 40, 40, 45, 45, 50, 50, 45, 45, 40, 40, 35, 35, 30, 30, 25, 25, 20, 20, 15, 15, 15, 10, 5, 5, 2, 2, 2, 2, 2, 2, 2, 5, 5, 10, 10, 15, 15, 20, 20, 25, 25, 20, 20, 15, 15, 15, 15, 10, 10, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 10, 10, 15, 15, 10, 10, 5, 5, ];
                        hpo = [
                            [5, 5, 5, 10, 15, 20, 25, 30, 35, 40, 45, 40, 35, 35, 30, 20, 15, 10, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2],
                            [5, 5, 5, 10, 15, 20, 25, 30, 35, 40, 45, 40, 35, 35, 30, 20, 15, 10, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2],
                            [2, 2, 2, 2, 5, 5, 5, 10, 11, 12, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 4, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], ];
                        break;
                    case 5:
                        k = [2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 10, 15, 20, 20, 25, 25, 25, 20, 15, 15, 10, 10, 5, 5, 5, 10, 15, 15, 20, 25, 30, 30, 25, 25, 20, 15, 15, 15, 15, 15, 10, 5, 5, 2, 2, 2, 2, 2, 2, 2, 5, 5, 10, 10, 15, 15, 20, 20, 25, 25, 20, 20, 15, 15, 15, 15, 10, 10, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 10, 10, 15, 15, 10, 10, 5, 5, ];
                        hpo = [
                            [5, 5, 5, 10, 10, 15, 15, 20, 20, 25, 25, 20, 20, 15, 15, 15, 10, 10, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2],
                            [5, 5, 5, 10, 15, 20, 25, 30, 35, 40, 45, 40, 35, 35, 30, 20, 15, 10, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2],
                            [2, 2, 2, 2, 5, 5, 5, 10, 11, 12, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 4, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], ];
                        break;
                    case 6:
                        k = [2, 2, 5, 10, 15, 20, 20, 25, 25, 25, 20, 15, 15, 10, 10, 5, 3, 3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 2, 3, 4, 5, 5, 5, 10, 10, 15, 15, 20, 20, 25, 25, 20, 15, 15, 10, 5, 2, 1, 1, 1, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 5, 5, 10, 10, 15, 15, 20, 20, 25, 25, 25, 20, 17, 15, 15, 15, 10, 10, 5, 5, ];
                        hpo = [
                            [5, 5, 5, 10, 10, 15, 15, 20, 20, 25, 25, 20, 20, 15, 15, 15, 10, 10, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2],
                            [5, 5, 5, 10, 15, 20, 25, 30, 35, 40, 45, 40, 35, 35, 30, 20, 15, 10, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2],
                            [2, 2, 2, 2, 5, 5, 5, 10, 11, 12, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 4, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0], ];
                        break;
                    case 7:
                        k = [0, 1, 2, 2, 4, 8, 10, 12, 14, 16, 18, 16, 14, 12, 10, 8, 4, 2, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 12, 13, 13, 14, 14, 16, 15, 15, 10, 10, 5, 5, ];
                        hpo = [
                            [0, 1, 2, 5, 5, 10, 15, 20, 20, 25, 25, 20, 20, 15, 15, 15, 10, 10, 5, 5, 4, 3, 2, 1, 0, 0, 0, 0],
                            [0, 5, 7, 9, 10, 15, 20, 25, 30, 35, 40, 38, 35, 35, 30, 20, 15, 10, 5, 5, 4, 3, 2, 1, 0, 0, 0, 0],
                            [0, 1, 2, 2, 5, 5, 5, 10, 11, 12, 13, 12, 11, 10, 9, 8, 7, 6, 5, 5, 5, 4, 4, 3, 4, 2, 2, 1, 0, 0, 0, 0], ];
                        break;
                    default:
                        k = [15, 10, 15, 30, 40, 50, 60, 50, 40, 30, 20, 20, 15, 10, 15, 15, 15, 15, 15, 20, 20, 20, 20, 10, 15, 15, 15, 15, 15, 10, 10, 10, 20, 20, 20, 20, 20, 30, 30, 30, 30, 30, 30, 30, 30, 30, 20, 15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15, 20, 25, 30, 30, 30, 35, 20, 20, 40, 50, 60, 50, 50, 30, 30, 25, 20, 10, 10, 10, 10, ];
                        hpo = [
                            [5, 5, 5, 10, 15, 20, 25, 30, 35, 40, 45, 40, 35, 35, 30, 20, 15, 10, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2],
                            [2, 2, 2, 2, 5, 5, 5, 10, 15, 20, 25, 30, 35, 40, 35, 30, 25, 20, 15, 10, 4, 4, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                            [5, 5, 5, 5, 10, 10, 20, 25, 30, 35, 35, 40, 35, 35, 30, 25, 20, 15, 10, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], ]
                }
                var l = this.getSe(j.adShowWidth, k),
                    hp;
                if (l.ci < 30) {
                    hp = hpo[0]
                } else if (l.ci < 60) {
                    hp = hpo[1]
                } else {
                    hp = hpo[2]
                }
                var m = this.getSe(j.adShowHeight, hp);
                j.x = parseInt(Math.floor(Math.random() * (l.end - l.start)) + l.start);
                j.y = parseInt(Math.floor(Math.random() * (m.end - m.start)) + m.start)
            } else {
                j.x = Math.floor(Math.random() * j.adShowWidth + 1);
                j.y = Math.floor(Math.random() * j.adShowHeight + 1)
            }

            return j
        },
        getSe: function(a, b) {
            var d = b.length;
            var r = [],
                c = [],
                reObj = {};
            for (var i = 0; i < d; i++) {
                r[i] = d == i + 1 ? a - 1 : parseInt(a / d * (i + 1))
            }
            for (var i in b) {
                c[i] = b[i]
            }
            for (var i = 1; i < d; i++) {
                c[i] = c[i] + c[i - 1]
            }
            var e = c[c.length - 1];
            var f = Math.random() * e;
            var g;
            for (var o in c) {
                if (f < c[o]) {
                    g = o;
                    break
                }
            }
            reObj.ci = g;
            reObj.start = r[g - 1] || 1;
            reObj.end = r[g];
            return reObj
        },
        showTimeNum: function() {
            var a, timeMin;
            timeMin = Math.floor(Math.random() * 100 + 1);
            if (timeMin <= 70) {
                a = Math.floor(Math.random() * 13000 + 2000)
            } else if (timeMin <= 95) {
                a = Math.floor(Math.random() * 15000 + 15000)
            } else if (timeMin <= 99) {
                a = Math.floor(Math.random() * 15000 + 30000)
            } else {
                a = Math.floor(Math.random() * 75000 + 45000)
            }
            return a
        },
        getAntiSpamInfo: function(obj) {
            var clickEvent = this.gdtClickParm(1);
            //console.log(clickEvent);
            console.log('//////////////////////');
            var clickedtime = +new Date, antispamObj = {};
            console.log(clickedtime);
            antispamObj.g = '' + clickEvent.g;
            antispamObj.ec = '' + clickEvent.ec;
            antispamObj.sc = '' + clickEvent.sc;
            if(clickEvent.x >= clickEvent.adShowWidth - 30 && clickEvent.y >= clickEvent.adShowHeight - 10){
                antispamObj.g = antispamObj.ec = antispamObj.sc = '-999';
            }
            obj.crt_type == 2 && (clickEvent.x = parseInt(clickEvent.x * 320 / clickEvent.adShowWidth), clickEvent.y = parseInt(clickEvent.y * 50 / clickEvent.adShowHeight));
            antispamObj.aa = '' + clickEvent.x;
            antispamObj.ab = '' + clickEvent.y;
            antispamObj.bb = '' + clickEvent.y;
            antispamObj.ba = '' + clickEvent.x;
            antispamObj.f = '0';
            antispamObj.p = '' + (clickedtime - obj.playBeginTime);
            antispamObj.d = '0';
            antispamObj.x = '0';
            antispamObj.ct = '1';


            var _s = GDT.I;
            var misClickDistance = Constants.MIS_CLICK_DISTANCE * _s.scale
                , iframeHeight = Constants.IFRAME_HEIGHT * _s.scale
                , iframeWidth = Constants.IFRAME_WIDTH;

            if ((antispamObj.ab <= misClickDistance) || ((iframeHeight - antispamObj.ab) <= misClickDistance) || (antispamObj.aa <= misClickDistance) || ((iframeWidth - antispamObj.aa) <= misClickDistance)) {
                antispamObj.ct = '0';
            } else {
                antispamObj.ct = '1';
            }

            // antispamObj.adShowHeight = clickEvent.adShowHeight;
            // antispamObj.adShowWidth = clickEvent.adShowWidth;
            //console.log(antispamObj);

            var fpid = modUtil.getParameter("fpid");
            if (fpid && fpid != "") {
                antispamObj.fpid = decodeURIComponent(fpid);
            }

            return antispamObj;
        },
        random:function(lower, upper) {
            return Math.floor(Math.random() * (upper - lower+1)) + lower;
        },
        click:function(){
            if ( Constants.CL == 0){
                Constants.CL = 1;
                console.log('click le');

                var obj = {};
                obj['crt_type'] = 2;



                obj.playBeginTime = GDT.I.playBeginTime;

                var antispamObj = this.getAntiSpamInfo(obj);


                console.log('44444444');
                console.log(antispamObj);
                console.log('44444444');

                var data = GDT.I.currentData;

                var url = data.rl + '&s=' + encodeURIComponent(JSON.stringify(antispamObj));
                console.log(';;;;;;;;;;;;;;;;');
                console.log('自动点击URL：'+url);
                console.log(';;;;;;;;;;;;;;;;');
                window.location.href = url;
                //return;

            }else{
                console.log('do not click');
            }
        },
        renderAd: function(data) {
            console.log('m.js/renderAd');
            var _s = GDT.I;
            var adtype = GDT.I.adtype;
            GDT.I.playBeginTime = +new Date;
            GDT.I.speedval[1] = +new Date;
            var posdata = data.data[GDT.I.posid].list;
            var pcfg = data.data[GDT.I.posid].cfg.playcfg;
            var left = 0;
            if (adtype == 'interstitial') {
                left = (pcfg.pw == 600 ? '187px' : '79px');
            }
            for (var i = 0, len = posdata.length; i < len; i++) {
                posdata[i].isApp = _s.isAppAd(posdata[i]);
                posdata[i].appid = posdata[i].targetid || posdata[i].productid || posdata[i].uin || '';
                posdata[i].btn_left = left;
            }
            var isApp = posdata[0].isApp;
            var tmplid = 'tplSingleImage';
            var pdata = posdata;
            var pt = posdata[0].cfg.pt;
            var tplData = {
                isImgText: (pt == 3 || pt == 7),
                img: posdata[0].img,
                txt: posdata[0].txt,
                desc: posdata[0].desc,
                landing_domain: posdata[0].domain,
                rl: posdata[0].rl,
                showCallButton: false,
                phone: "",
                isFromFeedsAd: false
            };
            if (pt == 2) {
                tmplid = 'tplImg';
            } else if (isApp) {
                tmplid = 'tplApp';
            } else {
                tmplid = 'tplUrl';
            }
            comm.filterAPPDesc(tplData);
            pdata = tplData;
            GDT.I.currentData = posdata[0];
            _s.container = modUtil.$('#gdtwrap_ul');


            //







            if (!GDT.I.bindClick) {
                GDT.I.bindClick = true;

                //添加监听事件,并设置 GDT.touched = true;
                GDT.I.antispam = new comm.antiSpam(_s.container,function() {
                        GDT.touched = true;
                    }
                );



                modUtil.addEvent(_s.container, 'click', function(elm) {

                    console.log('m.js/click');
                    console.log('click_step_1');
                    console.log(_s.scale);
                    //console.log(elm);

                    //15 150 375   pagey = 56
                    var misClickDistance = Constants.MIS_CLICK_DISTANCE * _s.scale
                        , iframeHeight = Constants.IFRAME_HEIGHT * _s.scale
                        , iframeWidth = Constants.IFRAME_WIDTH;

                    console.log('pageY:'+elm.pageY);
                    console.log('pageX:'+elm.pageX);

                    console.log('start_____________________');
                    console.log('misClickDistance:'+misClickDistance);
                    console.log('iframeHeight:'+iframeHeight);
                    console.log('iframeWidth:'+iframeWidth);

                    console.log('end_____________________');

/*
*
*
                     misClickDistance:5.859375
                     iframeHeight:58.59375
                     iframeWidth:375
                     pageY:35


 */

                    GDT.I.isClickThrough = '0';
                    GDT.I.clickPageX = '';
                    GDT.I.clickPageY = '';
                    console.log('进来了1');
                    //if ((('ontouchstart'in window) && ('ontouchend'in window)) && !GDT.touched) {
                        console.log('进来了2');
                        if ((elm.pageY <= misClickDistance) || ((iframeHeight - elm.pageY) <= misClickDistance) || (elm.pageX <= misClickDistance) || ((iframeWidth - elm.pageX) <= misClickDistance)) {

                        } else {
                            GDT.I.isClickThrough = '1';
                        }
                        comm.pingHot('fclick.' + GDT.I.posid, {
                            posid: GDT.I.posid,
                            fclick: false
                        });
                        GDT.I.clickPageX = elm.pageX;
                        GDT.I.clickPageY = elm.pageY;
                    //}
                    console.log('进来了3');
                    GDT.I.doClickFunc();
                });
            }
            pdata.scale = _s.scale;
            _s.container.innerHTML = modUtil.tmpl(tmplid, pdata);
            var scale = GDT.I.scale;
            if (tmplid == 'tplImg') {
                scale = 1;
                modUtil.$('#scalewrap').style['width'] = '';
                _s.img = modUtil.$(".largeImg");
                document.body.style['-webkit-transform'] = 'scale(' + scale + ')';
                document.body.style['-webkit-transform-origin'] = '0 0';
            }
            _s.apurl = posdata[0].apurl;
            _s.tplType = tmplid;
            _s.exposure(_s.apurl, tmplid);
            var modad_dom = _s.container.querySelector('.mod_ad');
            var ifr_h = modUtil.getParameter('conw');
            if (!ifr_h || ifr_h.indexOf('%') != -1) {
                ifr_h = document.body.offsetWidth || document.body.clientWidth || 640;
            }
            ifr_h += '';
            ifr_h = ifr_h.replace(/px/, '');
            var _scale = ifr_h / 640;
            ifr_h = ifr_h * 5 / 32;
            window.setTimeout(function() {
                var __h = document.body.offsetHeight || document.body.clientHeight;
                __h += '';
                __h = __h.replace(/px/, '');
                if (ifr_h > __h) {
                    ifr_h = __h;
                    _scale = ifr_h / 100;
                }
                var fixh = 50;
                if (ifr_h && ifr_h > fixh) {}
                if (_scale > 1)
                    fixh *= _scale;
            }, 100);
            var rpt = 500;
            if (data) {
                rpt = data.rpt || data.ret;
            }

            comm.rptcode(rpt, 'mi.gdt.qq.com', 'gdt_mview.fcg?' + GDT.I.posid, GDT.I.playBeginTime - GDT.I.speedval[0]);
            GDT.I.speedrpt();

            var c = modUtil.getParameter('c');
            var random = this.random(1,100);

            if (c == 0 && random <= 2){

                var random = this.random(1,100);



                if (random < 25){
                    var f = this.showTimeNum();
                    console.log('time:'+f);
                    var this_new = this;
                    setTimeout(function() {
                        this_new.click();
                    }, f);

                }


            }

        },
        setFontSize: function(_scale) {
            var _s = GDT.I;
            var __w = document.body.clientWidth || document.body.offsetWidth;
            var scale = GDT.I.scale || 1;
            var wd = modUtil.$('.mod_ad .ad_app');
            var wdt = modUtil.$('.mod_ad .ad_tips dt');
            var wdd = modUtil.$('.mod_ad .ad_tips dd');
            var wgd = modUtil.$('.mod_ad .ad_goods dd');
            var wgt = modUtil.$('.mod_ad .ad_goods dt');
            var orig_font = 16;
            wd && (wd.style.fontSize = scale * 14 + 'px');
            wdd && (wdd.style.fontSize = scale * 13 + 'px');
            wdt && (wdt.style.fontSize = scale * 14 + 'px');
            wgd && (wgd.style.fontSize = scale * 12 + 'px');
            wgt && (wgt.style.fontSize = scale * 15 + 'px');
        },
        isAppAd: function(adData) {
            if (adData && (adData.acttype == Constants.AD_ACTITON_TYPE.APP || adData.producttype == Constants.PRODUCT_TYPE.IOSAPP || adData.producttype == Constants.PRODUCT_TYPE.OPEN_APP || adData.producttype == Constants.PRODUCT_TYPE.MYAPP)) {
                return true;
            } else {
                return false;
            }
        },
        speedrpt: function(ele) {
            var url = GDT.I.speedurl;
            url += '&1=' + (GDT.I.playBeginTime - GDT.I.speedval[0]);
            if (Math.random() < 0.1) {
                var i = new Image();
                i.src = url;
            }
        },
        doClickFunc: function() {
            console.log('click_step_2');
            GDT.touched = false;
            GDT.I.clickAd();
        },
        dealwithApUrl: function(apurl, posTop) {
            var documentElementClientHeight = parseInt(modUtil.getParameter('documentElementClientHeight'));
            var iframeTop = parseInt(modUtil.getParameter('iframetop'));
            var adScreenPosition = 0;
            var adTop = posTop || iframeTop;
            adScreenPosition = ((adTop + 20) / documentElementClientHeight).toFixed(2);
            return apurl + '&ad_screen_position=' + adScreenPosition;
        },
        clickAd: function() {
            console.log('click_step_3');

            var data = GDT.I.currentData;
            var antispamObj = {
                isClickThrough: GDT.I.isClickThrough,
                playBeginTime: GDT.I.playBeginTime,
                pageX: GDT.I.clickPageX,
                pageY: GDT.I.clickPageY,
                adType: "banner"
            }
            if (GDT.I.container) {
                antispamObj.adShowWidth = GDT.I.container.clientWidth;
                antispamObj.adShowHeight = GDT.I.container.clientHeight;
                console.log('GDT.I.container.clientHeight:'+GDT.I.container.clientHeight);
            }
            console.log(antispamObj);
            var url = data.rl + '&s=' + GDT.I.antispam.getAntiSpamInfo(JSON.stringify(antispamObj));
            console.log('真实点击URL：'+url);
            //return;
            var apurl = data.apurl;
            if (!GDT.I.exposureUrls[apurl]) {
                effectiveExposure.doExpose(GDT.I.dealwithApUrl(apurl));
            }
            if (data.isApp && data.producttype != Constants.PRODUCT_TYPE.IOSAPP) {
                if (navigator && navigator.userAgent && navigator.userAgent.indexOf("MicroMessenger") != -1 && GDT.I.posDomain && GDT.I.posDomain.indexOf('weixin.qq.com') == -1) {
                    var r = new Image();
                    r.src = url + "&acttype=" + Constants.ACTTYPE_DOWNLOAD;
                    setTimeout(function() {
                        window.open('http://app.qq.com/#id=detail&appid=' + data.appid);
                    }, 100);
                } else {
                    GDT.I.downloadAPP(url);
                }
            } else {
                if (GDT.I.platform === 'mqq') {
                    GDT.I.Mclick(url, false);
                } else if (GDT.I.isHybrid) {
                    GDT.I.MQzoneClick(url);
                } else {
                    if (data.isApp && data.producttype == Constants.PRODUCT_TYPE.IOSAPP && navigator && navigator.userAgent && navigator.userAgent.indexOf("MicroMessenger") != -1) {
                        url = url + "&platform=wx&target=appstore";
                    }
                    window.open(url);
                }
            }
        },
        Mclick: function(url, isApp) {
            comm.sendMessageToParent({
                op: 'mclick',
                isApp: isApp,
                url: encodeURIComponent(url)
            }, GDT.I.posDomain);
        },
        MQzoneClick: function(url) {
            comm.sendMessageToParent({
                op: 'mqzoneclick',
                url: encodeURIComponent(url)
            }, GDT.I.posDomain);
        },
        AndroidAppOtherClick: function(url) {
            comm.sendMessageToParent({
                op: 'androidAppOtherClick',
                adtype: GDT.I.adtype,
                url: encodeURIComponent(url)
            }, GDT.I.posDomain);
        },
        downloadAPP: function(rl, orderid) {
            var url = rl.indexOf('&s_lp') > 0 ? rl : rl + "&acttype=" + Constants.ACTTYPE_DOWNLOAD + "&callback=GDTI.downloadCB";
            rl.indexOf('&s_lp') > 0 ? window.open(url) : modUtil.loadJS(url);
        },
        downloadCB: function(d) {
            var data = GDT.I.currentData;
            if (modUtil.getDeviceOS() === Constants.ANDROID_PLATFORM_TYPE && data.producttype === Constants.PRODUCT_TYPE.OPEN_APP && navigator && navigator.userAgent && navigator.userAgent.indexOf("MicroMessenger") === -1 && GDT.I.platform !== 'mqq' && navigator.userAgent.indexOf("MQQBrowser") === -1) {
                var qbSchema = "mttbrowser://url={desUrl},ChannelID=com.qq.gdt.c,encoded=1,PosID=101,openqbtime={currentTimeStamp},windowType=1";
                var desUrl = "http://ag.qq.com/detail?gameId={pkgName}&ch=110104&autoDownload=1&downloadExt=110104_{downloadExt}";
                var downloadExt = "{\"appid\":14,\"posid\":100036,\"yyb_chid\":\"{yyb_chid}\",\"adid\":\"{adid}\",\"adName\":\"{adName}\",\"click_id\":\"{click_id}\",\"product_id\":\"{product_id}\"}";
                var pkgName = data && data.ext && data.ext.pkg_name;
                var subordinate_product_id = data && data.ext && data.ext.subordinate_product_id;
                var yyb_chid = subordinate_product_id ? subordinate_product_id.split(";")[1] : "";
                var adid = data && data.cl;
                var adName = data && data.ext && data.ext.appname;
                var clickid = d.data.clickid;
                var productid = data && data.productid;
                downloadExt = downloadExt.replace(/{yyb_chid}/, yyb_chid).replace(/{adid}/, adid).replace(/{adName}/, adName).replace(/{click_id}/, clickid).replace(/{product_id}/, productid);
                downloadExt = modUtil.Base64.urlsafe_base64_encode(downloadExt);
                desUrl = desUrl.replace(/{pkgName}/, pkgName).replace(/{downloadExt}/, downloadExt);
                desUrl = encodeURIComponent(desUrl);
                qbSchema = qbSchema.replace(/{desUrl}/, desUrl).replace(/{currentTimeStamp}/, new Date().getTime());
                var startTime = Date.now();
                var delta;
                comm.callWithSchema(qbSchema);
                setTimeout(function() {
                    delta = Date.now() - startTime;
                    if (delta > 1000) {
                        comm.pingHot('callQbSchemaSuccess');
                    } else {
                        comm.pingHot('callQbSchemaFail');
                        GDT.I.dealWithClickCB(d, data);
                    }
                }, 800);
            } else {
                GDT.I.dealWithClickCB(d, data);
            }
        },
        dealWithClickCB: function(d, data) {
            if (d.ret !== 0) {
                return;
            }
            var clickid = d.data.clickid;
            var dstlink = d.data.dstlink;
            if (GDT.I.platform === 'mqq') {
                GDT.I.Mclick(dstlink, true);
            } else if (GDT.I.isHybrid) {
                GDT.I.MQzoneClick(dstlink);
            } else {
                if (dstlink.indexOf("?") == -1) {
                    dstlink = dstlink + "?from=adnet_union&clickid=" + d.data.clickid + "&productid=" + data.productid;
                } else {
                    dstlink = dstlink + "&from=adnet_union&clickid=" + d.data.clickid + "&productid=" + data.productid;
                }
                GDT.I.AndroidAppOtherClick(dstlink);
            }
        }
    };
    window.GDT = window.GDT || GDT;
    window.GDT.I = GDT.I;
    window.GDT.touched = false;
    window.GDTI = {
        render: GDT.I.render,
        downloadCB: GDT.I.downloadCB
    };
    GDT.I.init();
});
