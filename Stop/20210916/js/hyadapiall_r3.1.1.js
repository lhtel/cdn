/**
 * 广告API接口Javascript
 * author@flypomly
 * time: 2015年11月30日 14:45:50
*/
(function(_W,_D) {
    if (!document.body) {
        setTimeout(arguments.callee, 50);
        return;
    }
	var Constants = {
		VERSION : '1.3.1',//当前api版本
		SDKVERSION: '1.2.0',//SDK版本
		CDN_ADDRESS : '//cle.35kds.com',//CDN地址
        HYSI_DOMAIN : '//n.35kds.com/',
        //HYSI_DOMAIN : '//sspapi3.youxiaoad.com/',
		POSTYPE: 'banner',//广告呈现类型 banner[横幅],cp[插屏]
		FILLTYPE: 'bottom',//banner默认位置 bottom[底部悬浮] top[顶部悬浮] inner[嵌入]
		META: true,//是否添加移动端表头
		REQ_URL : function () {//请求地址
			return this.HYSI_DOMAIN + 'Requestad';
		},
		REQ_TRACK_URL : function () {//请求比对地址
			return this.HYSI_DOMAIN + 'Requestgdtad/index/?';
		},
		EXP_TRACK_URL : function () {//展示曝光地址
			return this.HYSI_DOMAIN + 'Exposead/index/?';
		},
		CLK_TRACK_URL : function () {//点击曝光地址
			return this.HYSI_DOMAIN + 'Clickad/index/?';
		},
	};
	var GDTH = {
		hasClose: true,//是否显示关闭按钮
		hasICo: false,//是否显示右下角LOGO
		onScroll: false, //是否采用滚动效果
		sizeid: '102',//[102||101]banner [201]插屏
		stats: false,//是否添加统计
		statsType: '51',
		statsId: 0,
		domains: '',//域名
		pxr : '', //屏幕密度
		isCrossDomain: 0,
		isAllow : 1, //允许或拒绝
		//cookieEnabled : true,//浏览器是否启用cookie
		isBackgred : 'green',
		init: function (obj) {//初始化
			//GDTH.cookieEnabled = navigator.cookieEnabled;
			if(!commUtil.webpIsCheck) commUtil.checkWebp();
			var cfg = obj;
			GDTH.url_referer = GDTH.referer();
			if(_W.self != _W.top){//判断当前页面是否被嵌入框架内 根据结果获取不同的域名和url
				var styleBody = document.createElement('style'),h = document.getElementsByTagName('head')[0];
				styleBody.setAttribute("type", 'text/css'),styleBody.innerHTML = '*{margin: 0;padding: 0;}';
				h && h.insertBefore(styleBody, h.firstChild);
				GDTH.isCrossDomain = 1;
				_W.parent != _W.top && (GDTH.isCrossDomain = 2);
				if(GDTH.url_referer){
					var urlReg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
					var domains = urlReg.exec(GDTH.url_referer);
					GDTH.domains = domains[0];
					GDTH.url = GDTH.url_referer;
				}else{
					GDTH.domains = document.domain;
					GDTH.url = _W.location.href;
				}
			}else{
				GDTH.isCrossDomain = 0;
				GDTH.domains = document.domain;
				GDTH.url = _W.location.href;
			}
			GDTH.ua = _W.navigator.userAgent || '';
            GDTH.hycUnt = GDTH.hycUnt || new commUtil.hycUnt();
			GDTH.isHttpsProtocol = commUtil.isHttpsProtocol();//浏览器指纹基本信息
			GDTH.reqUrl = Constants.REQ_URL();
			GDTH.osType = GDTH.getOs();
            GDTH.getNetwork();
			if(GDTH.osType === 4) return;//蜘蛛爬时直接跳出不执行
			GDTH.uatype = GDTH.uaType();
			cfg.meta = typeof(cfg.meta) != 'undefined' ? cfg.meta : Constants.META;
			GDTH.osType > 0 && GDTH.osType != 3 && cfg.meta && GDTH.setMeta();
			cfg.posType = cfg.posType ? cfg.posType.toLowerCase() : Constants.POSTYPE;
			cfg.fillType = cfg.fillType ? cfg.fillType.toLowerCase() : Constants.FILLTYPE;
			cfg.sizeid = cfg.sizeid || GDTH.sizeid;
			cfg.diyCss = cfg.diyCss || {};
			var Pos = cfg.AndPos || cfg.AndAds;
			GDTH.osType == 2 && (Pos = cfg.IosPos || cfg.IosAds);
			if (!Pos) return;
			var randNum = Math.floor((Math.random() * (Pos.length)));
			if(typeof(Pos[0]) != 'undefined') {
				if (typeof(Pos[0]['percent']) != 'undefined') {
					var PosFlag = [];
					for (var i in Pos) {
						PosFlag[i] = parseInt(Pos[i]['percent']);
					}
					for (var o = 1; o < PosFlag.length; o++) {
						PosFlag[o] += PosFlag[o - 1];
					}
					randNum = GDTH.getFlag(PosFlag);
				}
			}
			cfg.AppId = Pos[randNum]['AppId'];
			cfg.PosId = Pos[randNum]['PosId'] || Pos[randNum]['AdslotId'];
			cfg.stats = typeof(cfg.stats) != 'undefined' ? cfg.stats : GDTH.stats;
			cfg.statsType = cfg.statsType || GDTH.statsType;
			cfg.statsId = cfg.statsId || GDTH.statsId;
			cfg.onScroll = typeof(cfg.onScroll) != 'undefined' ? cfg.onScroll : GDTH.onScroll;
			cfg.isAllow = typeof(cfg.isAllow) != 'undefined' ? parseInt(cfg.isAllow) : GDTH.isAllow;
			cfg.isBackgred = cfg.isBackgred || GDTH.isBackgred;
			cfg.hasClose = typeof(cfg.hasClose) != 'undefined' ? cfg.hasClose : GDTH.hasClose;
			cfg.hasICo = typeof(cfg.hasICo) != 'undefined' ? cfg.hasICo : GDTH.hasICo;
			cfg.reqonly = commUtil.genHash(GDTH.webGL + '#' + (+new Date) + '#' + Math.random());//当前进程唯一索引
			cfg.reqnum = 1, cfg.clickNum = {};
			GDTH.resObj = GDTH.resObj || {};
			GDTH.resObj[cfg.reqonly] = cfg;
			typeof _W.GDTI.isAllowExecGdt == 'undefined' && (_W.GDTI.isAllowExecGdt = 1);//广点通执行请求初始参数
			GDTH.resolution();//获取屏幕分辨率 定义宽高
			GDTH.initPlatform();//获取平台类型
            GDTH.b_w = document.body.clientWidth || document.body.offsetWidth || document.documentElement.clientWidth;
			GDTH.initRequest(cfg);

			//三方统计51
			if (cfg.stats == true && cfg.statsId != 0) {//统计
				var setId = cfg.statsId;
				switch (cfg.statsType) {
					case '51':
						GDTH.wuyila(setId);
						break;
					default:
						GDTH.wuyila(setId);
				}
			}
		},
		/**
		 * 设置移动端表头
		 */
		setMeta: function () {
			if(window.setMetaR) return;
			window.setMetaR = true;
			var meta = document.createElement('meta');
			meta.setAttribute("name", 'viewport');
			meta.setAttribute("content", 'width=device-width, initial-scale=1.00, maximum-scale=1.00, minimum-scale=1.00, user-scalable=no');
			var hd = document.getElementsByTagName("head")[0];
			try{
				hd.appendChild(meta);
			}catch (exp){}
		},
		/**
		 * 获取当前设备类型 android：1; IOS：2; PC: 3; spider: 4
		 */
		getOs: function () {
			var ua = _W.navigator.userAgent.toLowerCase() || '', p = _W.navigator.platform, os;
			if(/baiduspider|googlebot|bingbot|sosospider|youdaobot|spider/.test(ua)){//搜索引擎蜘蛛
                GDTH.os = 'spider';
                os = 4;
			}else if(p.indexOf("\x57\x69\x6e") == 0 || p.indexOf("\x4d\x61\x63") == 0){
				GDTH.os = 'pc';
				os = 3;
			}else if (/android|adr/.test(ua)) {
				GDTH.os = 'android';
				os = 1;//'android'
			} else if (/ios|iphone|ipad|itouch/.test(ua)) {
				GDTH.os = 'ios';
				os = 2;//'ios'
			}else{
				GDTH.os = 'pc';
				os = 3;
			}
			return os;
		},
		/**
		 * 获取当前网络环境 0:unknown 1:wifi 2:2g 3:3g 4:4g 5:ethernet
		 */
		getNetwork: function () {
			var nc = {};
            GDTH.network = 0;
			try {
				_W.navigator && (nc = _W.navigator.connection || {});
				if(nc.type){
                    var nctype = typeof nc.type == 'string' ? nc.type.toLowerCase() : nc.type;
                    switch (nctype){
                        case 'wifi':
                            GDTH.network = 1;
                            break;
                        case 'ethernet':
                            GDTH.network = 5;
                            break;
                    }
				}
			} catch (exp){}
			if(GDTH.isTBS()){
				if (window.browser && window.browser.connection) {
					window.browser.connection.getType(function(state) {
						var connString = state;
						if (connString) {
							if (connString == "wifi") {
								GDTH.network = 1;
							} else if (connString == "2g") {
								GDTH.network = 2;
							} else if (connString == "3g") {
								GDTH.network = 3;
							} else if (connString == "4g") {
								GDTH.network = 4;
							}else{
								GDTH.network = 0;
							}
						}
					});
				}
                if (window.tbs && window.tbs.network) {
                    var tbsConn = window.tbs.network.type();
                    if (tbsConn) {
                        if (tbsConn == "wifi") {
                            GDTH.network = 1;
                        } else if (tbsConn == "2g") {
                            GDTH.network = 2;
                        } else if (tbsConn == "3g") {
                            GDTH.network = 3;
                        } else if (tbsConn == "4g") {
                            GDTH.network = 4;
                        } else {
                            GDTH.network = 0;
                        }
                    }
                }
			}
		},
        isTBS: function() {
            var ua = navigator.userAgent;
            if (ua.indexOf("TBS/") !== -1 || ua.indexOf("MQQBrowser/") !== -1) {
                return true;
            } else {
                return false;
            }
        },
		/**
		 * 获取当前平台类型
		 */
		initPlatform: function() {
			GDTH.platform = 'web';
			try{
				GDTH.isHybrid = false;
				if (_W.navigator.userAgent.search('QQ/') !== -1) {
					GDTH.platform = 'mqq';
					var _js = document.createElement('script');
					_js.src = '//pub.idqqimg.com/qqmobile/qqapi.js?_bid=152';
					document.body.appendChild(_js);
				} else if (_W.navigator.userAgent.search('Qzone') !== -1) {
					if (!_W.QZAppExternal || !QZAppExternal.getPlatform) {
						var _js = document.createElement('script');
						_js.src = '//qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js';
						document.body.appendChild(_js);
					}
					GDTH.platform = 'mqzone';
					GDTH.isHybrid = true;
				}
			}catch(e){}
		},
		/**
		 * 获取来路URL
		 */
		referer : function(){
			var ref = '';
			try {
				if (document.referrer.length > 0) {
					ref = document.referrer;
				}
				if (ref.length == 0 && opener && opener.location.href.length > 0) {
					ref = opener.location.href;
				}
			} catch (e) {}
			return ref;
		},
		/**
		 * 获取浏览器类型
		 */
		uaType : function (){
			var e = _W.navigator.userAgent,
				t = "other",
				n = {
					Wechat: /micromessenger/,
					QQBrowser: /qqbrowser/,
					UC: /ubrowser|ucbrowser|ucweb/,
					MobileBaidu: /baiduboxapp|baiduhd|bidubrowser|baidubrowser/,
					SamsungBrowser: /samsungbrowser/,
					MiuiBrowser: /miuibrowser/,
					Sogou: /sogoumobilebrowser|sogousearch/,
					Explorer2345: /2345explorer|2345chrome|mb2345browser/,
					Liebao: /lbbrowser/,
					Weibo: /__weibo__/,
					OPPO: /oppobrowser/,
					VIVO: /vivobrowser/,
					toutiao: /newsarticle/,
					MobileQQ: /mobile.*qq/,
					Firefox: /firefox/,
					Maxthon: /maxthon/,
					Mobile360: /360browser/,
					Se360: /360se/,
					Ee360: /360ee/,
					Safari: /(iphone|ipad).*version.*mobile.*safari/,
					Chrome: /chrome|crios/,
					AndroidBrowser: /android.*safari|android.*release.*browser/
				};
			for (var r in n) if (n[r].test(e.toLowerCase())) {
				t = r;
				break
			}
			return t;
		},
		/**
		 * 预加载图片
		 */
		loadImage: function (url, callback, ecb) {
			var img = new Image();
			img.onload = function () {
				img.onload = null;
				if (img.complete) {
					callback && callback();
				}
			};
			if (ecb) {
				img.onerror = function() {
					ecb && ecb();
					img.onerror = null;
				};
			}
			img.src = url;
		},
		/**
		 * 获取屏幕分辨率 定义宽高
		 */
		resolution : function(){
			var _s = GDTH, bwidth = [640, 480, 320, 240],bheight = [100, 75, 50, 38];
			var w = 480,h = 75,os = _s.osType;
			_s.posw = bwidth[0];
			_s.posh = bheight[0];
			try{
				var pixdevice = _W.devicePixelRatio || 1;
				if (_W.screen) {
					w = _s.screen_width = _W.screen.width;
					h = _s.screen_height = _W.screen.height;
					if (os == 2) {
						w *= pixdevice;
						h *= pixdevice;
					}
				} else if (document.body) {
					w = _s.screen_width = document.body.clientWidth * pixdevice;
					h = _s.screen_height = document.body.clientHeight * pixdevice;
				}
				_s.pxr = pixdevice;
				_s.screen_width = _s.screen_width || 360;
				_s.screen_height = _s.screen_height || 640;
				if (w < h) {
					var swap = h;
					h = w;
					w = swap;
				}
			}catch(e){}
			if (w > bwidth[0]) {
				_s.posw = bwidth[0];
				_s.posh = bheight[0];
			} else if (w > bwidth[1]) {
				_s.posw = bwidth[1];
				_s.posh = bheight[1];
			} else if (w > bwidth[2]) {
				_s.posw = bwidth[2];
				_s.posh = bheight[2];
			} else {
				_s.posw = bwidth[3];
				_s.posh = bheight[3];
			}
		},
		/**
		 * 封装相应参数并请求广告
		 */
		initRequest: function (cfg,viewid,advplaceList) {
			if(typeof cfg.reqonly == 'undefined') return;
			var reqonly = cfg.reqonly, obj = cfg[viewid] || {},
				isDefault = 0, pt = 0, AppId, PosId;
			if(advplaceList){
				AppId = advplaceList[0]['AppId'] || '';
				PosId = advplaceList[0]['PosId'] || '';
				isDefault = advplaceList[0]['isDefault'] || 0;
				pt = advplaceList[0]['PT'] || 0;
			}else {
				AppId = cfg.AppId;
				PosId = cfg.PosId;
			}
			if (!AppId || !PosId) {
				return;
			}

			var sizeid;
			switch (cfg.posType) {
				case 'banner': //banner
					sizeid = '101' || '102';
					break;
				case 'cp': //插屏
					sizeid = '201';
					//GDTH.sizeid = '205';
					break;
				/*case 'inner': //嵌入
					sizeid = '101' || '102';
					break;*/
				case 'redpack': //悬浮红包
					sizeid = '801';
					break;
				default: //默认banner
					sizeid = '101' || '102';
			}
			switch (cfg.fillType){
				case 'inner' :
					cfg.adsite = 1;
					break;
				case 'top' :
					cfg.adsite = 2;
					break;
				case 'bottom' :
					cfg.adsite = 3;
					break;
			}
			var data = {};
			data['ord'] = 1,
			cfg['crd'] && (data['crd'] = cfg['crd']),
			pt && (data['pt'] = pt),
			data['userckrd'] = GDTH.webgl_different || 0,
			GDTH.isUserFirst && (data['iu'] = GDTH.isUserFirst),
			cfg.statsId != 0 && (data['wyid'] = cfg.statsId),
			obj.pr_id_visited && (data['pr_id_visited'] = obj.pr_id_visited),
			GDTH.isHttpsProtocol && (data['hts'] = GDTH.isHttpsProtocol),//是否HTTPS
			data['reqonly'] = reqonly,
			data['isDefault'] = isDefault || 0,
			data['appid'] = AppId,
			data['advplaceid'] = PosId,
			data['muidtype'] = GDTH.osType,
			data['c_w'] = GDTH.screen_width,
			data['c_h'] = GDTH.screen_height,
			data['version'] = Constants.VERSION,
			data['sdkversion'] = Constants.SDKVERSION,
			data['mode'] = '1',
			data['sizeid'] = sizeid,
			data['reqnum'] = cfg.reqnum,
			data['os'] = GDTH.os,
			data['iaw'] = cfg.isAllow,
			data['network'] = GDTH.network,
			data['density'] = 2,
			data['yxjs'] = 1,
			cfg.pr_id_v && (data['pr_id_v'] = cfg.pr_id_v), //测试专用 值为某个产品ID就跑这个产品
			data['adsite'] = cfg.adsite,
			data['isCrossDomain'] = GDTH.isCrossDomain,
			data['url'] = GDTH.url,
			data['url_referer'] = GDTH.url_referer,
			data['userckid'] = GDTH.webGL,
			data['uatype'] = GDTH.uatype,
			data['ua'] = encodeURIComponent(GDTH.ua),
			data['domains'] = GDTH.domains,
			data['pxr'] = GDTH.pxr,
			data['jsload'] = cfg.jsload;
			if(PosId != cfg.PosId) {
				cfg.PosId && (data['relatedid'] = cfg.PosId);
				cfg.relateduid && (data['relateduid'] = cfg.relateduid);
			}
			var aMediumID = commUtil.getCookie('aMediumID');
            aMediumID && (data['aMediumID'] = aMediumID);
			data['appversion'] = GDTH.osType == 2 ? '2.0.0' : '1.0.0';
			commUtil.ajaxPost(GDTH.reqUrl, JSON.stringify(data), GDTH.reqResponse, null, cfg.reqnum);
			cfg.reqnum++;
		},
		/**
		 * 检测广点通原生[NATIVE]广告是否有返回信息
		 */
		/*checkGdtYsIsReturn : function (reqonly,viewid) {
			var obj = GDTH.resObj[reqonly][viewid];
			obj.checkGdtYsNum = obj.checkGdtYsNum || 1;
			//console.log(viewid + ' ' + obj.checkGdtYsNum);
			if(obj.isGdtYsReturn){
				delete obj.checkGdtYsNum;
				return;
			}
			if(obj.checkGdtYsNum > 10){
				delete obj.checkGdtYsNum;
				if(!obj.isGdtYsReturn){
					if(typeof obj.reqRepeatObj == 'undefined'){
						obj.reqRepeatObj = true;
						GDTH.clsPlay(reqonly,viewid);
						var dom = commUtil.$('yx_'+obj.viewid);
						dom && dom.parentNode.removeChild(dom);
					}
					//GDTH.repeatRequest(obj);
				}
				return;
			}
			obj.checkTimeout = setTimeout(function(){
				obj.checkGdtYsNum++;
				_W.clearTimeout(obj.checkTimeout);
				obj.checkTimeout = null;
				GDTH.checkGdtYsIsReturn(reqonly,viewid);
			}, 200);
		},*/
		/**
		 * 广点通广告无返回填充
		 */
		clsPlay:function (reqonly,viewid) {
			var cfg = GDTH.resObj[reqonly], obj = cfg[viewid],
				cls = cfg['cls'], clsps;
			if(typeof cls == 'undefined' || commUtil.isEmpty(cls)) return;
			switch (obj.clientReqType){
				case '1' :
					clsps = cls['jp'];
					break;
				case '2' :
					clsps = cls['ys'];
					break;
			}
			clsps && GDTH.initRequest(cfg,0,clsps);
		},
		/**
		 * 上游广告主请求上报
		 */
		reqTrackReport:function (obj, status) {
			obj.rqy && commUtil.createImgUrl(Constants.REQ_TRACK_URL() + obj.rqy + '&status_code=' + (status || 0) + '&adreqtimes=' + (obj.adreqtimes || 0));
		},
		/**
		 * 重复向api发起请求
		 */
		repeatRequest : function(obj){
			var reqonly = obj.reqonly, viewid = obj.viewid, cfg = GDTH.resObj[reqonly],
				simpleads = cfg.simpleads, simpObj;
			if(!simpleads || commUtil.isEmpty(simpleads)){
				GDTH.initRequest(cfg,viewid);
				return;
			}
			cfg.repeatnum = 0;
			for(var i in simpleads){
				if(simpleads[i]['pr_id'] == obj['pr_id']){
					cfg.repeatnum = i;
					break;
				}
			}
			cfg.repeatnum++;
			if(typeof simpleads[cfg.repeatnum] == 'undefined' || commUtil.isEmpty(simpleads[cfg.repeatnum])){
				cfg.repeatnum && delete cfg.repeatnum;
				cfg.simpleads && delete cfg.simpleads;
				return;
			}
			var simpApitype = parseInt(simpleads[cfg.repeatnum]['apitype']);
			if(simpApitype == 1 ){
				simpObj = simpleads[cfg.repeatnum]['msg'];
				var simpviewid = simpObj.viewid = simpObj.yxviewid;
				cfg[simpviewid] = simpObj;
				switch (simpObj.clientReqType){
					case '1' :
						simpObj.GDTPlayProto = new GDTH.GDTPlayProto(simpObj);
						break;
					/*case '2' :
						GDTH.playNATIVE(simpObj);
						break;*/
					default:
						GDTH.showEmbedPc(simpObj,reqonly);
				}
			}else{
				GDTH.initRequest(cfg,viewid);
			}
		},
		/**
		 * 生成比例的随机数
		 */
		getFlag: function (PosFlag) {
			var rand = Math.random() * PosFlag[PosFlag.length - 1];
			for (var x in PosFlag) {
				if (rand < PosFlag[x]) {
					return x;
				}
			}
			return -1;
		},
		/**
		 * 请求响应
		 * @param responseText:接口返回信息 reqnum：当前域内请求的序号
		 */
		reqResponse: function (responseText, reqnum) {
			var obj = JSON.parse(responseText) || {}, viewid, reqonly, cfg;
			if (typeof(obj.status_code) == 'undefined' || parseInt(obj.status_code) != 1) {
				return;
			}
			obj = obj.msg;
			reqonly = obj.reqonly;
			viewid = obj.viewid = obj.yxviewid; //当前请求唯一索引
			cfg = GDTH.resObj[reqonly];
			if(cfg.log) {
				if(cfg.log == 1){
					console.log(JSON.parse(responseText).msg);
				}else{
					console.log(JSON.parse(responseText).msg[cfg.log]);
				}
			}
			if(cfg.testObj && reqnum == 1){
				for(var i in cfg.testObj){
					obj[i] = cfg.testObj[i];
				}
			}
			GDTH.rqyCompile(obj, cfg, reqnum);
			if(obj.as && !commUtil.isEmpty(obj.as) && !obj.isDefault){
				cfg.cls = obj.as, delete obj.as;
			}
			reqnum == 1 && (cfg.relateduid = obj.userid);
			obj.clientReqType = obj.clientReqType || '0';
			if(obj.simpleads && !commUtil.isEmpty(obj.simpleads) && !obj.isDefault){
				var sad;
				for(var i in obj.simpleads) {
					sad = obj['gdtmsg_' + obj.advplaceid + '_' + obj.simpleads[i]['pr_id']];
					if (typeof sad != 'undefined'){
						sad.clientReqType = sad.clientReqType || '0';
						sad.clientReqType == '2' && GDTH.dnsPrefetch(sad.domain);
						obj.simpleads[i]['msg'] = sad;
					}
				}
				cfg.simpleads = obj.simpleads;
				delete obj.simpleads;
			}
			cfg[viewid] = obj;
			var shopPr = {'297':1,'316':1,'318':1};
			if((obj.muidtype == 1 || obj.muidtype == 2) && GDTH.osType == 3 && !shopPr.hasOwnProperty(obj.pr_id)) {
				return;
			}

			if(obj.pr_id == 174 && obj.ecode){
				var ecodeScript = obj.ecode;
				ecodeScript = ecodeScript.replace(/<script\s*src="(.*)"\s*language="JavaScript"><\/script>/,"$1");
				commUtil.loadJS(ecodeScript);
			}
			if(typeof(obj.apitype) == 'undefined') return;
			switch(obj.apitype){
				case '5' ://外链JS
					var jsAttrs = {yxscript:obj.viewid}, container;
					if(obj.jsattr){
						for(var i in obj.jsattr){
							jsAttrs[i] = obj.jsattr[i];
						}
					}
					switch (cfg.fillType){
						case 'bottom':
						case 'top':
							container = document.createElement('div');
							container.id = 'yx-'+obj.viewid, container.style.position = 'fixed',container.style.width = '100%',container.style.left = '0',container.style[cfg.fillType] = '0';
							document.body.appendChild(container);
							break;
						default:
							if (cfg.innerDiv) {
								container = commUtil.$('#' + cfg.innerDiv);
							} else {
								container = document.createElement('div');
								container.id = 'yx-'+obj.viewid,container.style.width = '100%';
                                if (cfg.onScroll) {
                                    GDTH.showScrollAd(container,obj.clientReqType);
                                } else {
                                    cfg.thisNode && cfg.thisNode.parentNode.insertBefore(container,cfg.thisNode);
                                }
							}
					}
					var HYJS_CALL_BACK = (function(viewid,reqonly){
						function callback() {
							window.hysiJsCallback && window.hysiJsCallback(container);
							GDTH.noticeShow(viewid,reqonly);
						}
						return callback;
					})(viewid,reqonly);
					commUtil.loadJS(obj.jsurl,HYJS_CALL_BACK,false,container,jsAttrs);
					break;
				case '1' ://内嵌JS
					var pr_id = parseInt(obj.pr_id);
					switch(obj.clientReqType){
						case '1' ://广点通Jsonp
							obj.GDTPlayProto = new GDTH.GDTPlayProto(obj);
							break;
						/*case '2' ://广点通native
							GDTH.dnsPrefetch(obj.domain);
							GDTH.playNATIVE(obj);
							break;*/
						default://
							GDTH.showEmbedPc(obj,reqonly);
					}
					break;
				case '4' : //ADX
					obj.apurl = obj.clk_url || '';
					GDTH.renderWindow(viewid,reqonly);
					break;
				case '0':
					var pr_id = parseInt(obj.pr_id);
                    obj.apurl = obj.clk_url || '';
					switch(pr_id) {
						case 33 :
						case 61 :
						case 109 :
						case 239 :
						case 250 :
							GDTH.renderWindowPublic(viewid,reqonly);
							break;
						/*case 3:
                            obj.showtype = 1, obj.tmpData = {
                                crt_type: obj.crt_type,
                                img: ((obj.crt_type == 3 || obj.crt_type == 7) ? obj.icon : obj.img || obj.icon) || '',
                                title: obj.desc,
                                desc: obj.title || '',
                            }
                            GDTH.renderWindow(viewid,reqonly);
							break;*/
						default:
							obj.muidtype == 3 && (cfg.posType = 'pc');
							GDTH.renderWindow(viewid,reqonly);
					}
					break;
				case '2':
                    obj.apurl = obj.clk_url || '';
					obj.muidtype == 3 && (cfg.posType = 'pc');
					GDTH.renderWindow(viewid,reqonly);
					break;
			}

			!cfg.unableFill && setTimeout(function(){GDTH.fillShow(viewid,reqonly);},500);//填充
			!cfg.unableTbkl && GDTH.tbkl(viewid,reqonly);//淘宝客
		},
		GDTPlayProto:(function(){
			var GDTPlayProto = function (obj) {
                if(!obj.vl || obj.vl == ''){
                    !obj.isDefault && GDTH.repeatRequest(obj);
                    return;
                }
				this.init(obj);
			}
			GDTPlayProto.prototype = {
                Constants: {
                    ACTTYPE_DOWNLOAD: 47,
                    IOS_PLATFORM_TYPE: "ios",
                    ANDROID_PLATFORM_TYPE: "android",
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
                    IFRAME_HEIGHT: 50,
                    MIS_CLICK_DISTANCE: 5,
                },
                speedurl: 'https://isdspeed.qq.com/cgi-bin/r.cgi?flag1=175&flag2=33&flag3=22&flag5=1',
                bannerurl: '/qzone/biz/res/tmpl/banner.html',
                index: 0,
				noadTime: 0,
                PULL_INTERVAL: 15000,
                ROTATE_COUNT: 3,
                loadingAds: [],
				/*
				 * 初始化广点通参数
				 */
				init:function (obj) {
					this.appid = obj.iappid, this.posid = obj.iadvplaceid, this.os = GDTH.os, this.vl = obj.vl;
					this.domain = obj.domain, this.speedvals = +new Date, this.platform = GDTH.platform, this.b_w = 0;
					this.reqonly = obj.reqonly, this.viewid = obj.viewid, this.isHybrid = GDTH.isHybrid, obj.adreqtimes = 0;
					if (!this.posid || !this.posid.match(/^\d+$/)) return;
					this.playGdtThread(obj);
				},
				/*
				 * 广点通检测函数[单线程执行广点通JSONP请求]
				 */
				playGdtThread:function(obj){
					var _s = this;
					if(_W.GDTI.isAllowExecGdt == 1){
						_s.exec(obj);
					}else{
						setTimeout(function(){
							_s.playGdtThread(obj);
						}, 50);
					}
				},
				/*
				 * 广点通参数赋值并发起JSONP请求
				 */
				exec : function (obj) {
					_W.GDTI.isAllowExecGdt = 0, obj.adreqtimes++;
					var reqcond = this.getReqCond();
					reqcond.sdk_src = 'mobile_union_js';
					reqcond.tmpallpt = true;
					var visiturl = (obj.vl && obj.domain != obj.vl.replace(/(http|https):\/\//,'')) ? obj.vl : 'http://' + obj.domain + '/gdtssp/gdtadbanner.html?iappId=' + this.appid + '&iAdvplaceId=' + this.posid;
					var urlLenght = this.getByteLen(visiturl);
					if (urlLenght > 0 && urlLenght < 512) {
						reqcond.url = visiturl;
					}
					if(typeof obj.rl != 'undefined' && obj.rl != '') reqcond.referrerurl = encodeURIComponent(obj.rl);
					commUtil.webpEnabled && (reqcond.webp = '1');
					var url = '//mi.gdt.qq.com/gdt_mview.fcg?adposcount=1&charset=utf8&datafmt=jsonp&count=1&callback=GDTI.render&_=' + Math.random() + '&posw={W}&posh={H}&posid={POSID}&ext={EXT}';
					//GDTH.isHttpsProtocol && (url += "&support_https=1");
					url = url.replace(/{W}/, GDTH.posw).replace(/{H}/, GDTH.posh).replace(/{POSID}/, this.posid).replace(/{EXT}/, encodeURIComponent(JSON.stringify({
						req: reqcond
					})));
					if (this.appid && this.appid != 'undefined' && this.checkParam(this.appid)) {
						url += '&appid=' + this.appid;
					}
					var render = this.render;
					_W.GDTI.render = function (e) {
						render(e, obj);
					};
					commUtil.loadJS(url,function () {
						_W.GDTI.isAllowExecGdt = 1;
						_W.GDTI.render && delete _W.GDTI.render;
						!obj.isGdtReturn && !obj.isDefault && GDTH.clsPlay(obj.reqonly,obj.viewid);
					});
				},
				/*
				 * 广点通JSONP请求回调函数[GDTI.render]
				 */
				render: function (result, obj) {
					obj.isGdtReturn = 1;
					var _s = obj.GDTPlayProto, isDefault = obj.isDefault, DataList;
					result && result['data'] && result['data'][obj.iadvplaceid] && (DataList = result['data'][obj.iadvplaceid]);
					if (!DataList || DataList['ret'] != 0) {
                        GDTH.reqTrackReport(obj, 0), _s.noadTime++;
						if(_s.noadTime > 0 && _s.index == 0 && !isDefault){
                            GDTH.repeatRequest(obj);
                            return;
						}
						if(_s.noadTime > 3) return;
                        _s.index < _s.ROTATE_COUNT && window.setTimeout(function () {
                            _s.playGdtThread(obj);
                        }, _s.PULL_INTERVAL);
                        return;
					}
					var data = DataList['list'][0]; //广告素材包
					if(data['cl'] == '30604013' && obj.userid == '622' && !isDefault){
						_s.playGdtThread(obj);
						return;
					}
                    GDTH.reqTrackReport(obj, 1);
					data.isApp = _s.isAppAd(data);
					data.appid = data.targetid || data.productid || data.uin || '';
					data.btn_left = 0;
                    _s.loadingAds[_s.index] = data;
					_s.speedvale = +new Date;
                    var tmpData = {},
                        apurl = (GDTH.isHttpsProtocol ? commUtil.httpTohttps(data['apurl']) : data['apurl']) + '&ad_screen_position={adScreenPosition}';
                    tmpData.isApp = data.isApp;
                    tmpData.img = GDTH.isHttpsProtocol ? commUtil.httpTohttps(data['img']) : data['img']; //图片地址
                    tmpData.title = data['txt']; //标题
                    tmpData.desc = data['desc']; //描述
                    tmpData.crt_type = obj.crt_type = data['cfg']['pt'];
                    tmpData.landing_domain = data['domain'] || '';
                    tmpData.index = obj.adIndex = _s.index;
                    obj.exp_track = [apurl],/*曝光URL*/
					obj.isExpos = !1,
					obj.playBeginTime = +new Date;
                    if(isDefault){
						(tmpData.crt_type == 2 || tmpData.crt_type == 3 || tmpData.crt_type == 7) && tmpData.img && commUtil.createImgUrl(tmpData.img);
                        GDTH.noticeShow(_s.viewid,_s.reqonly);
                        if(_s.index == 0){
                            GDTH.autoClk(_s.viewid,_s.reqonly);
						}
                    }else{
                        obj.tmpData = tmpData, obj.showtype = 1;
                        if(_s.index == 0){
                            GDTH.renderWindow(_s.viewid,_s.reqonly);
                        }else{
                            obj.isExpos = !1;
                            GDTH.noticeShow(_s.viewid,_s.reqonly);
                            var ifrm = commUtil.$('#ifm' + obj.viewid);
                            ifrm && window.postMessage && ifrm.contentWindow.postMessage(JSON.stringify({
                                op: 'renderAd', tmpData: {
                                    isApp: tmpData.isApp,
                                    domain: tmpData.landing_domain,
                                    crt_type: tmpData.crt_type,
                                    img: tmpData.img,
                                    title: tmpData.title,
                                    desc: tmpData.desc,
                                    index: _s.index,
                                }
                            }), (GDTH.isHttpsProtocol ? 'https:' : 'http:') + Constants.CDN_ADDRESS);
                        }
					}
                    _s.index++;
					if(_s.index < _s.ROTATE_COUNT){
                        window.setTimeout(function () {
                            _s.playGdtThread(obj);
                        }, _s.PULL_INTERVAL)
					}else{
						var rotateRender = function () {
							obj.adIndex++,
							obj.adIndex >= _s.ROTATE_COUNT && (obj.adIndex = 0),
                            obj.crt_type = _s.loadingAds[obj.adIndex]['cfg']['pt'],
							obj.playBeginTime = +new Date;
							window.setTimeout(rotateRender,_s.PULL_INTERVAL);
						}
						window.setTimeout(rotateRender,_s.PULL_INTERVAL);
					}
					/*var rpt = 500;
					if (result) {
						rpt = result.rpt || result.ret;
					}
					_s.rptcode(rpt, 'mi.gdt.qq.com', 'gdt_mview.fcg?' + _s.posid, _s.speedvale - _s.speedvals);
					_s.speedrpt();*/
				},
				/*
				 * 请求条件[操作系统:c_os, 浏览器语言:c_hl, 微信或手机QQ浏览器: flow_source = 2]
				 */
				getReqCond:function () {
					var ua = navigator.userAgent || '', _s = this;
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
                                            commUtil.pingHot('c', 'nobrowserconnectionstate', {}, _s.bannerurl);
                                        }
                                    });
                                } else {
                                    commUtil.pingHot('c', 'nobrowserconnection', {}, _s.bannerurl);
                                }
                            } else {
                                commUtil.pingHot('c', 'nobrowser', {}, _s.bannerurl);
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
                                        commUtil.pingHot('c', 'notbsnetworktype', {}, _s.bannerurl);
                                    }
                                } else {
                                    commUtil.pingHot('c', 'notbsnetwork', {}, _s.bannerurl);
                                }
                            } else {
                                commUtil.pingHot('c', 'notbs', {}, _s.bannerurl);
                            }
                        }
                        if (!obj.conn) {
                            ua = ua.toLowerCase();
                            if (ua.indexOf("nettype/wifi") !== -1) {
                                commUtil.pingHot('c', 'netfromua', {}, _s.bannerurl);
                                obj.conn = 1;
                            } else if (ua.indexOf("nettype/2g") !== -1) {
                                commUtil.pingHot('c', 'netfromua', {}, _s.bannerurl);
                                obj.conn = 2;
                            } else if (ua.indexOf("nettype/3g") !== -1) {
                                commUtil.pingHot('c', 'netfromua', {}, _s.bannerurl);
                                obj.conn = 3;
                            } else if (ua.indexOf("nettype/4g") !== -1 || ua.indexOf("nettype/ctlte") !== -1) {
                                commUtil.pingHot('c', 'netfromua', {}, _s.bannerurl);
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
						commUtil.pingHot('c', 'uncondi', {}, _s.bannerurl);
					}
					return obj;
				},
				isAppAd: function(adData) {
					var Constants = this.Constants;
					if (adData && (adData.acttype == Constants.AD_ACTITON_TYPE.APP || adData.producttype == Constants.PRODUCT_TYPE.IOSAPP || adData.producttype == Constants.PRODUCT_TYPE.OPEN_APP || adData.producttype == Constants.PRODUCT_TYPE.MYAPP)) {
						return true;
					} else {
						return false;
					}
				},
                gdtClickParm : function(){
                    var gdtParmObj = {}, adShowWidth;
                    gdtParmObj.g = Math.floor(Math.random() * 50 + 70);
                    gdtParmObj.sc = Math.floor(Math.random() * 150 + 1);
                    gdtParmObj.ec = gdtParmObj.g + gdtParmObj.sc;
                    adShowWidth = GDTH.b_w;
                    (!adShowWidth || adShowWidth < GDTH.screen_width) && (adShowWidth = GDTH.screen_width);
                    gdtParmObj.adShowWidth = this.b_w = adShowWidth;
                    gdtParmObj.scale = (gdtParmObj.adShowWidth / 320) || 1, gdtParmObj.adShowHeight = gdtParmObj.scale * this.Constants.IFRAME_HEIGHT;
                    if(Math.random() < .8){
                        var wp = [
                            15,10,15,30,40,50,60,50,40,30,
                            20,20,15,10,15,15,15,15,15,20,
                            20,20,20,10,15,15,15,15,15,10,
                            10,10,20,20,20,20,20,30,30,30,
                            30,30,30,30,30,30,20,15,10,10,
                            10,10,10,10,10,10,10,10,10,10,
                            10,10,10,10,10,10,10,10,15,20,
                            25,30,30,30,35,20,20,40,50,60,
                            50,50,30,30,25,20,10,10,10,10,
                        ];
                        var wo = getSe(gdtParmObj.adShowWidth,wp),hp;
                        var hpo = [
                            [5,5,5,10,15,20,25,30,35,40,45,40,35,35,30,20,15,10,5,5,5,5,5,2,2,2,2,2],
                            [2,2,2,2,5,5,5,10,15,20,25,30,35,40,35,30,25,20,15,10,4,4,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                            [5,5,5,5,10,10,20,25,30,35,35,40,35,35,30,25,20,15,10,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                        ];
                        if(wo.ci < 30){
                            hp = hpo[0];
                        }else if(wo.ci < 60){
                            hp = hpo[1];
                        }else{
                            hp = hpo[2];
                        }
                        var ho = getSe(gdtParmObj.adShowHeight,hp);
                        gdtParmObj.x = parseInt(Math.floor(Math.random()*(wo.end - wo.start)) + wo.start);
                        gdtParmObj.y = parseInt(Math.floor(Math.random() * (ho.end - ho.start)) + ho.start);
                    }else{
                        gdtParmObj.x = Math.floor(Math.random()*gdtParmObj.adShowWidth + 1);
                        gdtParmObj.y = Math.floor(Math.random()*gdtParmObj.adShowHeight + 1);
                    }

                    function getSe(ew,prop){
                        var sp = prop.length;
                        var r = [],c = [],reObj = {};
                        for(var i=0;i<sp;i++){
                            r[i] = sp == i+1 ? ew - 5 : parseInt(ew/sp*(i+1));
                        }
                        for(var i in prop){
                            c[i] = prop[i];
                        }
                        for(var i=1;i<sp;i++){
                            c[i] = c[i]+c[i-1];
                        }
                        var max = c[c.length-1];
                        var rn = Math.random()*max;
                        var ci;
                        for(var o in c){
                            if(rn < c[o]){
                                reObj.ci = ci;
                                ci = o;
                                break;
                            }
                        }
                        reObj.start = r[ci-1] || 2;
                        reObj.end = r[ci];
                        return reObj;
                    }
                    return gdtParmObj;
                },
                getAntiSpamInfo: function (obj) {
                    var clickEvent = this.gdtClickParm();
                    var clickedtime = +new Date, antispamObj = {};
                    antispamObj.g = '' + clickEvent.g;
                    antispamObj.ec = '' + clickEvent.ec;
                    antispamObj.sc = '' + clickEvent.sc;
                    if(clickEvent.x >= clickEvent.adShowWidth - 30 && clickEvent.y >= clickEvent.adShowHeight - 10){
                        antispamObj.g = antispamObj.ec = antispamObj.sc = '-999';
					}
                    obj.crt_type == 2 && (clickEvent.x = parseInt(clickEvent.x * 320 / clickEvent.adShowWidth));
                    obj.crt_type == 2 && (clickEvent.y = parseInt(clickEvent.y * this.Constants.IFRAME_HEIGHT / clickEvent.adShowHeight));
                    antispamObj.aa = '' + clickEvent.x;
                    antispamObj.ab = '' + clickEvent.y;
                    antispamObj.bb = '' + clickEvent.y;
                    antispamObj.ba = '' + clickEvent.x;
                    antispamObj.f = '0';
                    antispamObj.p = '' + (clickedtime - obj.playBeginTime);
                    antispamObj.x = '0';
                    antispamObj.ct = '0';
                    obj.antispamObj = antispamObj;
                },
				getClkUrl:function (obj, index, cb) {
					var data = this.loadingAds[index], _s = this, Const = this.Constants;
					obj.crt_type = data['cfg']['pt'], obj.apurl = data.rl;
                    var execClick = function () {
                        GDTH.gdt_fp && (obj.antispamObj.fpid = GDTH.gdt_fp);
                        var url = (GDTH.isHttpsProtocol ? commUtil.httpTohttps(data.rl) : data.rl) + '&s=' + encodeURIComponent(JSON.stringify(obj.antispamObj));
                        if (data.isApp && data.producttype != Const.PRODUCT_TYPE.IOSAPP) {
                            if (navigator && navigator.userAgent && navigator.userAgent.indexOf("MicroMessenger") != -1 && GDTH.domains && GDTH.domains.indexOf('weixin.qq.com') == -1) {
                                var r = new Image();
                                r.src = url + "&acttype=" + Const.ACTTYPE_DOWNLOAD;
                                url = 'http://app.qq.com/#id=detail&appid=' + data.appid;
                            } else {
                                url += "&acttype=" + Const.ACTTYPE_DOWNLOAD + "&callback=GDTI.downloadCB";
                                _W.GDTI.downloadCB = function(d){
                                    _s.downloadCB(d, _s);
                                }
                                commUtil.loadJS(url,function () {
                                    _W.GDTI.downloadCB && delete _W.GDTI.downloadCB;
                                });
                                url = '';
                            }
                        } else {
                            if (this.platform === 'mqq') {
                                this.Mclick(url, false);
                                url = '';
                            } else if (this.isHybrid) {
                                this.MQzoneClick(url);
                                url = '';
                            } else {
                                if (data.isApp && data.producttype == Const.PRODUCT_TYPE.IOSAPP && navigator && navigator.userAgent && navigator.userAgent.indexOf("MicroMessenger") != -1) {
                                    url += "&platform=wx&target=appstore";
                                }
                            }
                        }
                        obj.clk_url = url, cb && cb();
                    }
                    if(!obj.antispamObj){
                    	this.getAntiSpamInfo(obj);
                        /*var b_w = this.b_w;
                        var hasErrBw = {300:1,299:1,314:1,353:1,339:1};
                        if(Math.random() < .01 && !hasErrBw.hasOwnProperty(b_w)){
                            var callback = 'gdtc'+(Math.random().toString().slice(2));
                            window[callback] = function (data) {
                                obj.getCoor = !0;
                                window[callback] && delete window[callback];
                                data = typeof data == 'string' ? JSON.parse(data) : data;
                                if(data.status_code == '1'){
                                    data = data.data;
                                    if(data.down_x != '0' && data.down_y != '0' && data.up_x != '0' && data.up_y != '0'){
                                        obj.antispamObj.aa = '' + data.down_x;
                                        obj.antispamObj.ab = '' + data.down_y;
                                        obj.antispamObj.ba = '' + data.up_x;
                                        obj.antispamObj.bb = '' + data.up_y;
                                        obj.antispamObj.ec = '' + data.ec;
                                        obj.antispamObj.g = '' + data.gc;
                                        obj.antispamObj.sc = '' + data.sc;
                                    }
                                }
                                execClick();
                            }
                            commUtil.loadJS(Constants.HYSI_DOMAIN + 'Clickad/getCoor?'+'b_w='+b_w+'&crt_tp='+(obj.crt_type == 2 ? obj.crt_type : 1)+'&callback='+callback+'&_'+(Math.random().toString()),
                                function () {
                                    if(!obj.getCoor){
                                        execClick()
                                    }
                                });
                        }else{
                            execClick();
                        }*/
                        execClick();
					}else{
                        execClick();
					}
				},
				downloadCB: function(d, _s) {
					var data = _s.currentData, Constants = _s.Constants;
					if (GDTH.os === Constants.ANDROID_PLATFORM_TYPE && data.producttype === Constants.PRODUCT_TYPE.OPEN_APP && navigator && navigator.userAgent && navigator.userAgent.indexOf("MicroMessenger") === -1 && _s.platform !== 'mqq' && navigator.userAgent.indexOf("MQQBrowser") === -1) {
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
						downloadExt = commUtil.Base64.urlsafe_base64_encode(downloadExt);
						desUrl = desUrl.replace(/{pkgName}/, pkgName).replace(/{downloadExt}/, downloadExt);
						desUrl = encodeURIComponent(desUrl);
						qbSchema = qbSchema.replace(/{desUrl}/, desUrl).replace(/{currentTimeStamp}/, new Date().getTime());
						var startTime = Date.now();
						var delta;
						commUtil.callWithSchema(qbSchema);
						setTimeout(function() {
							delta = Date.now() - startTime;
							if (delta > 1000) {
								commUtil.pingHot('c', 'callQbSchemaSuccess', {}, _s.bannerurl);
							} else {
								commUtil.pingHot('c', 'callQbSchemaFail', {}, _s.bannerurl);
								_s.dealWithClickCB(d, data);
							}
						}, 800);
					} else {
						_s.dealWithClickCB(d, data);
					}
				},
				MQzoneClick : function (url) {
					commUtil.pingHot('i', 'mqzoneclicked', {}, this.vl.replace('http://'+this.domain,''));
					QZAppExternal.callSchema(function(data) {}, {
						url: "mqzone://arouse/webview?source=push&url=" + url + '&safari=0&version=1'
					});
				},
				Mclick : function (url, isApp) {
					_W.mqq && mqq.ui && mqq.ui.openUrl({
						url: url,
						target: (isApp ? 2 : 1),
						style: 3
					});
				},
				dealWithClickCB: function(d, data) {
					if (d.ret !== 0) {
						return;
					}
					var clickid = d.data.clickid;
					var dstlink = d.data.dstlink;
					if (this.platform === 'mqq') {
						this.Mclick(dstlink, true);
					} else if (this.isHybrid) {
						this.MQzoneClick(dstlink)
					} else {
						if (dstlink.indexOf("?") == -1) {
							dstlink = dstlink + "?from=adnet_union&clickid=" + d.data.clickid + "&productid=" + data.productid;
						} else {
							dstlink = dstlink + "&from=adnet_union&clickid=" + d.data.clickid + "&productid=" + data.productid;
						}
						setTimeout(function () {
							location.href = dstlink;
						},500);
					}
				},
				checkParam : function (val) {//检查变量是否包含特殊字符
					var valid = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）―|{}【】‘；：”“'。，、？]");
					return !valid.test(val);
				},
				getByteLen : function (val) {//获取字符串实际长度
					var len = 0;
					for (var i = 0; i < val.length; i++) {
						if (val[i].match(/[^x00-xff]/ig) != null) len += 2;
						else len += 1;
					}
					return len;
				},
				rptcode : function (ret, domain, cgi, duration) {
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
				},
				speedrpt: function() {
					var url = this.speedurl;
					url += '&1=' + (this.speedvale - this.speedvals);
					if (Math.random() < 0.1) {
						var i = new Image();
						i.src = url;
					}
				},
			}
			return GDTPlayProto;
		})(),
		/**
		 * 编译上报信息的参数
		 */
		rqyCompile:function (obj, cfg, reqnum) {
			if(!obj.rqy) return;
			obj.rqy += '&'+(['yxviewid='+obj.yxviewid, 'pr_id='+(obj.pr_id||0), 'appid='+(obj.appid||0), 'advplaceid='+obj.advplaceid, 'yxadvtype='+obj.yxadvtype, 'muidtype='+GDTH.osType, 'apitype='+(obj.apitype||0), 'mode=1', 'domains='+commUtil.Base64.encode(GDTH.domains.length > 100 ? GDTH.domains.substr(0,100) : GDTH.domains), 'client_reqnum='+reqnum, 'uatype='+GDTH.uatype, 'userckid='+GDTH.webGL, 'yxjs=1', 'c_w='+GDTH.screen_width, 'c_h='+GDTH.screen_height, 'uck2='+GDTH.webGL, 'ifa='+GDTH.isCrossDomain, 'showurl='+commUtil.Base64.encode((GDTH.url.length > 500 ? GDTH.url.substr(0,500)+'#'+obj.advplaceid : GDTH.url)), 'adsite='+cfg.adsite, 'vttype=2', 'network='+GDTH.network, 'network2='+GDTH.network, 'jsload='+cfg.jsload, 'pro=1'].join('&'));
			obj.rqy = 're='+commUtil.Base64.encode(obj.rqy);
		},
		/**
		 * 优化填充广点通JSONP广告
		 */
		fillShow:function(viewid,reqonly){
			var cfg = GDTH.resObj[reqonly], obj = cfg[viewid], fillObj, pt, rt;
			if(!obj.appid_advplaceid_list) return;
			var appidList = obj.appid_advplaceid_list, intNum = appidList.length;
			cfg.intervalNum = cfg.intervalNum || 0;
			if(cfg.intervalNum >= intNum){
				cfg.intervalNum && delete cfg.intervalNum;
				obj.appid_advplaceid_list && delete obj.appid_advplaceid_list;
				return;
			}
			fillObj = appidList[cfg.intervalNum]['reinfo'];
			if(!fillObj){
				if(pt = parseInt(appidList[cfg.intervalNum]['pt'])){
					rt = Math.random()*1000;
					if(rt >= pt){
						cfg.intervalNum++;
						GDTH.fillShow(viewid,reqonly);
						return;
					}
					appidList[cfg.intervalNum]['PT'] = 1;
				}
				appidList[cfg.intervalNum]['isDefault'] = 1;
				GDTH.initRequest(cfg,0,[appidList[cfg.intervalNum]]);
			}else{
				fillObj['viewid'] = fillObj['yxviewid'];
				fillObj['isDefault'] = 1;
				fillObj['rqy'] = 'yxviewid='+fillObj['viewid'];
				cfg[fillObj['viewid']] = fillObj;
				fillObj.GDTPlayProto = new GDTH.GDTPlayProto(fillObj);
			}
			cfg.intervalNum++;
			setTimeout(function () {
			    var aMediumID = commUtil.getCookie('aMediumID');
                (!aMediumID || aMediumID != appidList[0].aMediumID) && !!appidList[0].aMediumID && commUtil.setCookie('aMediumID',appidList[0].aMediumID,24*2);
				GDTH.fillShow(viewid,reqonly);
			},100);
		},
		/**
		 * 淘宝客广告
		 */
		tbkl:function (viewid,reqonly) {
			if(GDTH.uatype && GDTH.uatype == 'QQBrowser') return;
			var cfg = GDTH.resObj[reqonly];
			var obj = cfg[viewid];
			if(!obj.tkls || commUtil.isEmpty(obj.tkls)) return;
			var tkls = obj.tkls,tkl;
			for(var i in tkls){
				tkl = tkls[i];
				if(!tkl || commUtil.isEmpty(tkl)) continue;
                var loadJS = function (d, p, a) {
                    commUtil.loadJS(d, function () {
                        commUtil.createImgUrl(GDTH.reqUrl + '/taokouling/?advplaceid=' + cfg.PosId + '&type=1&status_code=10&code=' + encodeURIComponent(d) + '&userckid=' + GDTH.webGL + '&pr_id=' + p + '&aaid=' + a + '&_=' + Math.random().toString());
                    });
                }
				switch (tkl.d){
					case 4:
						if(!_W.cloudMobi && tkl.r){
							_W.cloudMobi = 1;
							GDTH.cloudMobi(tkl.r,cfg);
						}
						break;
					case 5://外部JS
						if(commUtil.isEmpty(tkl.r) || typeof tkl.r != 'object') return;
						var cup_fxsyxjs, cup_times, cup;
						for(var i = 0, len = tkl.r.length; i < len; i++){
                            cup = tkl.r[i];
							if(!cup['url']) continue;
							cup_fxsyxjs = commUtil.genHash(cup['url'] || '000000');
							cup_times = GDTH.hycUnt.get(cup_fxsyxjs)|| 0;
                            cup_times++;
							if(_W[cup_fxsyxjs] || cup_times > 1) continue;
                            GDTH.hycUnt.set(cup_fxsyxjs, cup_times), _W[cup_fxsyxjs] = !0, loadJS(cup['url'],cup['pr_id'],cup['aaid']);
						}
						break;
					case 6://APP唤醒
						if(!_W.wakeupApp && tkl.r){
							_W.wakeupApp = 1;
							GDTH.wakeup(tkl.r,cfg.PosId);
						}
						break;
				}
			}
		},
		wakeUpPlug:function (data, clicktype, callback) {
            var Navigator = navigator.userAgent, ifIos = Navigator.match(/iPhone|iPad|iPd/i) ? true : false, openLink = data.url, delay = data.delay || 1;
            if(!openLink) return;
            var iosVersion = Navigator.match(/OS\s*(\d+)/), iframe = "plugIn_downloadPlugIn_loadIframe";
            iosVersion = iosVersion ? (iosVersion[1] || 0) : 0;
            if (ifIos && iosVersion >= 9){
                setTimeout(function () {
                    _W.top.location = openLink;
                },delay*1000);
            }else {
                var ifr = document.querySelector('#'+iframe);
                if (!ifr){
                    commUtil.callWithSchema(openLink,iframe);
                }else{
                    ifr.src = openLink;
                }
            }
            setTimeout(function () {
                checkOpen(function(opened){
                    if(opened !== 1){
                        callback && callback();
                    }
                },data);
            },delay*1000);

            function checkOpen(cb,data){
                var _clickTime = +(new Date());
                function check(elsTime) {
                    var status;
                    if ( elsTime > 3000 || document.hidden || document.webkitHidden) {
                        status = 1;
                    } else {
                        status = 0;
                    }
                    doExpose(status,data);
                    cb(status);
                }
                //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
                var _count = 0, intHandle = function () {
                    _count++;
                    var elsTime = +(new Date()) - _clickTime;
                    if (_count >= 100 || elsTime > 3000 ) {
                        clearTimeout(intHandle);
                        check(elsTime);
                    }else{
                        setTimeout(function () {
                            intHandle();
                        },20);
                    }
                };
                setTimeout(function () {
                    intHandle();
                },20);
            }

            function doExpose(opened,data) {
                commUtil.createImgUrl('//n.35kds.com/Clickad/hbtest?s='+opened+'&u='+GDTH.webGL+'&aaid='+data.aaid+'&prid='+data.pr_id+'&wkid='+data.wkid+'&rid='+data.rid+'&_='+(+new Date()));
            }
        },
		/**
		 * 唤醒APP
		 */
		wakeup : function (data,rid) {
			var afg = 0, apps = data['data'], wkid = data['advplaceID'];
			function wakeUp() {
				if(afg >= apps.length) return;
				var data = apps[afg];
                data.wkid = wkid,data.rid = rid;
				var wkidkey = '#'+commUtil.genHash(data.url || '000000')+'#';
				if(GDTH.hycUnt.get(wkidkey)){
					afg++;
					wakeUp();
					return;
				}
                GDTH.hycUnt.set(wkidkey), GDTH.wakeUpPlug(data,2,function () {
                    afg++;
                    wakeUp();
                });
			}
            wakeUp();
		},
		/**
		 * Cloudmobi优化
		 */
		cloudMobi : function (d,cfg) {
			commUtil.loadJS("http://resource.catch.gift/jstag/v1/"+ d +"/ad.min.js", function () {
				commUtil.createImgUrl(GDTH.reqUrl+'/taokouling/?advplaceid='+cfg.PosId+'&type=1&status_code=10&code='+d+'&userckid='+GDTH.webGL+'&_='+Math.random().toString());
				if(_W.ct_jsTag_private && _W.ct_jsTag_private.getAds){
					ct_jsTag_private.getAds(d, callback_, 1);
				}else{
					return;
				}
				function callback_(data) {
					if(data && data[0] && data[0].clkUrl){
						commUtil.createImgUrl(GDTH.reqUrl+'/taokouling/?advplaceid='+cfg.PosId+'&type=2&status_code=11&code='+d+'&userckid='+GDTH.webGL+'&_='+Math.random().toString());
						var img_url = [
							'http://resource.catch.gift/manual/picture/gift/320/480.jpg',
							'http://resource.catch.gift/manual/picture/gift/480/320.jpg',
							'http://resource.catch.gift/manual/picture/red/720/381.jpg',
							'http://resource.catch.gift/manual/picture/blue/720/381.jpg',
						];
						var container = document.createElement('div'),img = document.createElement('img'),a = document.createElement('a');
						container.style.cssText = 'width:0;height:0;overflow:hidden;',img.src = img_url[Math.floor(Math.random()*(img_url.length))],a.href = data[0].clkUrl,a.target = '_blank';
						a.appendChild(img),container.appendChild(a),document.body.appendChild(container);
						Math.random() < 0.05 && commUtil.createImgUrl(data[0].clkUrl);
					}else{
						commUtil.createImgUrl(GDTH.reqUrl+'/taokouling/?advplaceid='+cfg.PosId+'&type=2&status_code=12&code='+d+'&userckid='+GDTH.webGL+'&_='+Math.random().toString());
					}
				}
			},false,cfg.thisNode);
		},
		/**
		 * DNS预获取(DNS Prefetching)
		 */
		dnsPrefetch : function (domain) {
			var _s = GDTH;
			if(typeof domain == 'undefined' || domain == ''){
				return;
			}
			_s.dnsPrefetchAry = _s.dnsPrefetchAry || [];
			if(typeof _s.dnsPrefetchAry[domain] == 'undefined'){
				_s.dnsPrefetchAry[domain] = true;
				var doc = document, h = doc.getElementsByTagName('head')[0], link = doc.createElement('link');
				link.rel = 'dns-prefetch';
				link.href = domain;
				h && h.insertBefore(link, h.firstChild);
			}
		},
		/**
		 * 判断参数是不是在数组内
		 */
		in_array: function (arr, str) {// 判断参数是不是数组
			if (typeof(arr) != 'object') {
				return false;
			}
			for (var i in arr) {
				if (arr[i] == str) {
					return true;
				}
			}
			return false;
		},
		renderWindow: function (viewid,reqonly) {
			var cfg = GDTH.resObj[reqonly];
			var obj = cfg[viewid];
			if(typeof(obj) == undefined || obj == '') return;
			var crt_type = parseInt(obj.crt_type);
			if((crt_type == 2 || crt_type == 3 || crt_type == 7) && obj.apitype == '2'){
				obj.img = obj.img || obj.icon;
				GDTH.loadImage(obj.img, function () {
					GDTH.renderWindowPublic(viewid,reqonly);
				},function () {
					obj.loadimgerror = !0, GDTH.noticeShow(viewid,reqonly);
					GDTH.repeatRequest(obj);
				});
			}else{
				GDTH.renderWindowPublic(viewid,reqonly);
			}
		},
		/**
		 * 生成广告内容节点
		 */
		tmplNode:function(cfg,obj){
			var content = document.createElement('div'), title, desc, img, icon;
			content.id = 'con'+obj.viewid;
			if(obj.showtype){
				GDTH.bindMessage();
				var tmpData = obj.tmpData;
                obj.tmpData = null;
                var __w = GDTH.b_w;
                !__w && (__w = GDTH.screen_width);
				var scale = (__w / 320) || 1, iframeHeight = scale * 50 + 'px',
                    ext = {
                        isApp: tmpData.isApp || !1,
                        domain: tmpData.landing_domain || '',
                        crt_type: parseInt(tmpData.crt_type),
                        img: tmpData.img || tmpData.icon || '',
                        title: tmpData.title,
                        desc: tmpData.desc,
						index: tmpData.index || 0,
                    },
                    url = Constants.CDN_ADDRESS + '/html/tmpl/bannerm.html#' + ['viewid=' + obj.viewid, 'scale=' + scale, 'ext=' + encodeURIComponent(JSON.stringify(ext))].join('&');
                content.setAttribute('style', 'left:0;bottom:0;width:100%;height:'+iframeHeight+';max-width:1280px;');
				content.innerHTML = '<iframe id="ifm'+(obj.viewid)+'" style="position:static !important;display:block !important;margin:0 !important;padding:0 !important;visibility:visible !important;float:none !important;border-width:0 !important;width:100%;height:'+iframeHeight+';" scrolling=no frameBorder=0 marginHeight=0 marginWidth=0 allowTransparency=true src="'+url+'"></iframe>'
                return content;
			}
            //####### crt_type[1:纯文字 2:纯图片 3,7图文 4:flash 6:模板信息流 8:iframe] ########
			switch (cfg.posType){//posType[pc:pc广告 cp:插屏 redpack:冒泡红包 default:banner广告]
				case 'pc':
					switch (parseInt(obj.crt_type)) {
						case 2 :
							content.style.cssText = 'width:300px; height:250px; cursor:pointer;';
							img = document.createElement('img');
							img.style.cssText = 'width:300px;height:250px', img.src = obj.img;
							content.appendChild(img);
							break;
						case 4 ://flash
							content.style.cssText = 'width:300px; height:250px; cursor:pointer; position:relative;';
							content.innerHTML = '<div style="position: absolute;top:0;left:0; z-index: -10;"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="300" height="250"> <param name="movie" value="' + obj.img + '"><param name="quality" value="high"><param name="wmode" value="transparent"><embed src="' + obj.img + '" width="300" height="250" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent"></embed></object></div>';
							break;
					}
					break;
				case 'cp':
					switch (parseInt(obj.crt_type)){
						case 1 ://纯文字
							title = document.createElement('div'),desc = document.createElement('div');
							title.style.cssText = 'padding: 10px 30px 10px 10px;height: 60px;line-height: 60px;font-size: 16px;font-weight: 700;color: #fff;overflow: hidden;';
							desc.style.cssText = 'padding: 10px;background: #fff;height: 150px;font-size: 14px;color: #666;line-height: 24px;text-indent: 24px;overflow: hidden;';
							title.innerHTML = obj.title,desc.innerHTML = obj.desc,content.appendChild(title),content.appendChild(desc);
							break;
						case 2 ://纯图片
							content.style.cssText = 'width: 300px; height: 250px;'
							img = document.createElement('img');
							img.src = obj.img,img.style.cssText = 'width:100%;max-width:100%;display:block;';
							content.appendChild(img);
							break;
						case 3 ://图文
						case 7 :
							icon = document.createElement('div'),title = document.createElement('div'),desc = document.createElement('div'),img = document.createElement('img');
							icon.style.cssText = 'position: absolute;left: 10px;top: 10px;width: 60px;height: 60px; overflow:hidden;';
							title.style.cssText = 'padding: 10px 30px 10px 80px;height: 60px;line-height: 60px;font-size: 16px;font-weight: 700;color: #fff;overflow: hidden;';
							desc.style.cssText = 'padding: 10px;background: #fff;height: 150px;font-size: 14px;color: #666;line-height: 24px;text-indent: 24px;overflow: hidden;';

							img.src = obj.icon,img.style.cssText = 'width:100%;max-width:100%;display:block;', icon.appendChild(img),title.innerHTML = obj.title,desc.innerHTML = obj.desc, content.appendChild(icon), content.appendChild(title),content.appendChild(desc);
							break;
						case 8:
							content.style.cssText = 'width: 300px; height: 250px; overflow: hidden;';
							var frame = document.createElement('iframe');
							frame.frameBorder = '0', frame.scrolling = 'no', frame.width = '300', frame.height = '250', frame.border = '0', frame.src = obj.url;
							content.appendChild(frame);
							break;
					}
					break;
				case 'redpack':
						content.style.cssText = '';
						img = document.createElement('img');
						img.src = obj.img,img.style.cssText = 'width:100px;height:auto;max-width:100%;display:block;';
						content.appendChild(img);
					break;
				default:
					switch (parseInt(obj.crt_type)){
						case 1 ://纯文字
							title = document.createElement('div'),desc = document.createElement('div');
							if(cfg.isBackgred == 'fault' || cfg.isBackgred == 'red'){
								title.style.cssText = 'padding: 5px 30px 0 15px;font-weight: 700;overflow: hidden;height: 28px;line-height: 28px;font-size: 18px;';
								desc.style.cssText = 'padding: 0 30px 0 15px;font-size: 13px;max-height: 36px;line-height: 18px;overflow: hidden;min-height: 36px;';
							}else{
								title.style.cssText = 'padding: 5px 30px 0 15px;font-weight: 700;overflow: hidden;height: 24px;line-height: 24px;font-size: 15px;';
								desc.style.cssText = 'padding: 0 30px 0 15px;font-size: 13px;max-height: 36px;line-height: 18px;overflow: hidden;min-height: 18px;margin-bottom: 5px;';
							}
							title.innerHTML = obj.title,desc.innerHTML = obj.desc,content.appendChild(title),content.appendChild(desc);
							break;
						case 2 ://纯图片
							content.style.cssText = 'width: 100%; height: auto;'
							img = document.createElement('img');
							img.src = obj.img,img.style.cssText = 'width:100%;max-width:100%;display:block;';
							content.appendChild(img);
							break;
						case 3 ://图文
						case 7 :
							icon = document.createElement('div'),title = document.createElement('div'),desc = document.createElement('div'),img = document.createElement('img');
							if(cfg.isBackgred == 'fault' || cfg.isBackgred == 'red'){
								icon.style.cssText = 'position: absolute;left: 5px;top: 50%;margin-top: -30px;width: 60px;height: 60px; overflow:hidden;';
								title.style.cssText = 'padding: 5px 30px 0 80px;height: 28px;line-height: 28px;font-size: 18px;font-weight: 700;overflow: hidden;';
								desc.style.cssText = 'padding: 0 30px 0 80px;font-size: 13px;max-height: 36px;min-height: 36px;line-height: 18px;overflow: hidden;';
							}else{
								icon.style.cssText = 'position: absolute;left: 10px;top: 50%;margin-top: -18px;width: 40px;height: 40px; overflow:hidden;';
								title.style.cssText = 'padding: 5px 30px 0 60px;height: 24px;line-height: 24px;font-size: 15px;font-weight: 700;overflow: hidden;';
								desc.style.cssText = 'padding: 0 30px 0 60px;font-size: 13px;max-height: 36px;min-height: 18px;line-height: 18px;margin-bottom: 5px;overflow: hidden;';
							}
							img.src = obj.icon,img.style.cssText = 'width:100%;max-width:100%;display:block;', icon.appendChild(img),title.innerHTML = obj.title,desc.innerHTML = obj.desc, content.appendChild(icon), content.appendChild(title),content.appendChild(desc);
							break;
						case 8://框架
                            var __ww = GDTH.b_w,
                                ifmHeight = parseInt(obj.posh * (__ww / obj.posw)),
                                frame = document.createElement('iframe');
                            content.style.cssText = 'height: ' + ifmHeight + 'px;overflow: hidden; width: 100%;';
                            frame.frameBorder = '0', frame.scrolling = 'no', frame.width = '100%', frame.height = ifmHeight, frame.border = '0', frame.src = obj.url;
                            content.appendChild(frame);
							break;
						case 6://模板信息流广告
							switch (obj.styleid){
								case '501':
									for(var i in obj.ml){
										var span = document.createElement("span");
										span.style.cssText = 'display:block;color:rgb(0,0,204);padding: 0 5px;line-height:1.4;font-size:18px;';
										span.innerHTML = obj.ml[i]['adinfo'][0].title;
										content.appendChild(span);
										GDTH.doBindClick(obj.viewid, obj.reqonly, span, i);
									}
									break;
							}
							break;
					}
			}
			GDTH.doBindClick(obj.viewid, obj.reqonly, content);
			return content;
		},
		/**
		 * 生成节点样式
		 */
		conStyleCss : function(t){
			var styleCss = {
				'pc' : {
					'z-index' : 99999,
					'position' : 'fixed',
					'text-align' : 'center',
					'width' : '300px',
					'height' : '250px',
					'display' : 'block',
					'overflow' : 'hidden',
					'right' : '5px',
					'bottom' : '5px'
				},
				'cp' : {
					'font-family' : 'Microsoft YaHei',
					'overflow' : 'hidden',
					'z-index' : '2147483574',
					'width' : '300px',
					'height' : '250px',
					'position' : 'fixed',
					'left' : '50%',
					'top' : '50%',
					'margin-left' : '-150px',
					'margin-top' : '-125px',
					'background' : 'rgba(83,176,25,.8)',
				},
				'banner' : {
					'font-family' : 'Microsoft YaHei',
					'overflow' : 'hidden',
					'z-index' : '2147483574',
					'width' : '100%',
					'max-height' : '90px',
					'min-height' : '40px',
					'background' : 'rgba(69,69,69,1)',
					'height' : 'auto',
					'color': '#fff',
				},
				'cpbg' : {
					'width' : '100%',
					'height' : '100%',
					'position' : 'fixed',
					'background' : 'rgba(0,0,0,.5)',
					'left' : '0',
					'top' : '0'
				},
				'closeSpan' :{
					'width' : '25px',
					'height' : '25px',
					'background' : 'center center no-repeat',
					'background-size' : '25px 25px',
					'display' : 'block',
					'position' : 'absolute',
					'webkit-background-size' : 'auto',
					'right' : '0',
					'top' : '0',
					'cursor' : 'pointer'
				},
				'icoSpan' : {
					'width' : '24px',
					'height' : '18px',
					'background' : 'url('+Constants.CDN_ADDRESS+'/images/logo.png) center center no-repeat',
					'background-size' : '24px auto',
					'display' : 'block',
					'position' : 'absolute',
					'webkit-background-size' : 'auto',
					'right' : '0',
					'bottom' : '0'

				},
				'signSpan' : {
					'width' : '26px',
					'height' : '13px',
					'background' : 'url('+Constants.CDN_ADDRESS+'/images/sign-ad.png) center center no-repeat',
					'background-size' : '24px auto',
					'display' : 'block',
					'position' : 'absolute',
					'webkit-background-size' : 'auto',
					'left' : '0',
					'bottom' : '0'
				},
				'redpack' : {
					'font-family' : 'Microsoft YaHei',
					'overflow' : 'hidden',
					'z-index' : '2147483574',
					'width' : 'auto',
					'height' : 'auto',
					'position' : 'fixed',
					'top':'20%',
				},

			};
			return styleCss[t];
		},
		/**
		 * 获取节点样式
		 */
		getStyle : function (c) {
			var _s = GDTH,styleCss;
			var posType = c.posType || 'banner';
			styleCss = _s.conStyleCss(c.posType);
			switch (posType){
				case 'banner':
                    switch (c.isBackgred) {
                        case 'fault':
						case 'red':
                            styleCss.background = 'rgba(69,69,69,1)';
                            break;
                        case 'blue':
                            styleCss.background = 'rgba(36,136,232,.8)';
                            break;
                        case 'green':
                            styleCss.background = 'rgba(83,176,25,.8)';
                            break;
                        default :
                            c.isBackgred = _s.isBackgred;
                            styleCss.background = 'rgba(69,69,69,1)';
                            break;
                    }
					if(!commUtil.isEmpty(c.diyCss)){
						for(var i in c.diyCss){
							if(styleCss.hasOwnProperty(i)) styleCss[i] = c.diyCss[i];
						}
					}
					switch (c.fillType){
						case 'top' : styleCss.position = 'fixed',styleCss.left = '0',styleCss.top = '0'; break;
						case 'inner' : styleCss.position = 'relative'; break;
						default : styleCss.position = 'fixed',styleCss.left = '0',styleCss.bottom = '0';//默认底部悬浮
					}
					break;
				case 'redpack':
					switch (c.fillType){
						case 'left' : styleCss.left = '0'; break;
						default : styleCss.right = '0';//默认右边悬浮
					}
					break;
			}
			return _s._toCSSText(styleCss);
		},
		/**
		 * 对象转style.cssText
		 */
		_toCSSText: function(t) {
			var e = "";
			for (var i in t) t.hasOwnProperty(i) && (e += i + ":" + t[i] + ";");
			return e;
		},
		/**
		 * 展示广告窗口
		 */
		renderWindowPublic: function (viewid,reqonly) {
			console.log('renderWindowPublic');
			var _s = GDTH;
			var cfg = _s.resObj[reqonly];
			var obj = cfg[viewid];
			var isDefault = obj.isDefault || false;
			obj.playBeginTime = +new Date;
			if (typeof(obj) == undefined || obj == '') return;
			var container = document.createElement('div'), context = _s.tmplNode(cfg,obj);
			container.id = 'yx_' + viewid;
			obj.container = container;
			container.appendChild(context);
			container.style.cssText = _s.getStyle(cfg);
			if(isDefault){
				container.style.display = 'none';
				container.className = 'showContTxt';
				container.id = 'showContTxt'+obj.viewid;
				document.body.appendChild(container);
			}else if(cfg.posType == 'cp'){
				var cpbg = document.createElement('div');
				cpbg.style.cssText = _s._toCSSText(_s.conStyleCss('cpbg'));
				cpbg.appendChild(container);
				document.body.appendChild(cpbg);
			}else{
				if(cfg.fillType == 'inner') {
					if (cfg.innerDiv) {
						var showAdBox = commUtil.$('#' + cfg.innerDiv);
						showAdBox && showAdBox.appendChild(container);
					} else {
						if (cfg.onScroll) {
							_s.showScrollAd(container,obj.clientReqType);
						} else {
							cfg.thisNode && cfg.thisNode.parentNode.insertBefore(container,cfg.thisNode);
						}
					}
				}else{
					document.body.appendChild(container);
				}
			}
            obj.showtype && (container.style.background = '');
			cfg.posType == 'pc' && parseInt(obj.advplaceid) == parseInt(cfg.PosId) && cfg.fillType == 'inner' && (container.style.position = 'relative');
			if(obj.crt_type != 6 && obj.clientReqType != '2' && cfg.posType != 'redpack'){//添加 关闭按钮 icon标识 sign标识
				if(cfg.hasClose && !obj.showtype){
					var closeSpan = document.createElement('span');
					closeSpan.style.cssText = _s._toCSSText(_s.conStyleCss('closeSpan'));
					if(cfg.posType == 'pc'){
						closeSpan.style.color = '#fff', closeSpan.innerHTML = '×'
					}else{
						closeSpan.style.backgroundImage = 'url('+Constants.CDN_ADDRESS+'/images/close_'+cfg.isBackgred+'.png)';
					}
					container.appendChild(closeSpan);
					//console.log('closeSpan',_W.clcup);
					commUtil.addEvent(closeSpan,'click',function () {
						if(cfg.posType == 'cp'){
							_s.closeWindow(container);
						}else{
							_s.closeWindow(closeSpan);
						}
					});
				}
				if(cfg.hasICo && !obj.showtype){
					var icoSpan = document.createElement('span');
					icoSpan.style.cssText = _s._toCSSText(_s.conStyleCss('icoSpan'));
					container.appendChild(icoSpan);
				}
				var signSpan = document.createElement('span');
				signSpan.style.cssText = _s._toCSSText(_s.conStyleCss('signSpan')), obj.showtype && (signSpan.style.cssText = 'background-image:url('+Constants.CDN_ADDRESS+'/images/logo-ad-s.png);display:block;background-size: cover;width:30px;height:10px;position: absolute;right: 0;bottom: 0;');
				container.appendChild(signSpan);
			}else{
				container.style.background = '';
				container.style.maxHeight = "none";
			}

			if(obj.zk){//自有广告效果监控
				obj.isHidden = commUtil.checkIsHidden(obj.container),obj.adScreenPosition = commUtil.getAdScreenPosition(obj);
				if(obj.adScreenPosition < 1){
					commUtil.createImgUrl([GDTH.reqUrl+'/zk/?advplaceid='+obj.advplaceid,'ish='+obj.isHidden,'asp='+obj.adScreenPosition,obj.rqy,'st='+(+new Date - obj.playBeginTime),'_='+(+new Date)].join('&'));
				}else{
					commUtil.addEvent(window,'scroll',scrollSite);
					function scrollSite() {
						var scrollTop = commUtil.getScrollTop();
						if ((scrollTop + obj.dech) >= (obj.adTop)) {
							commUtil.removeEvent(window,'scroll',scrollSite);
							commUtil.createImgUrl([GDTH.reqUrl+'/zk/?advplaceid='+obj.advplaceid,'ish='+obj.isHidden,'asp='+obj.adScreenPosition,obj.rqy,'st='+(+new Date - obj.playBeginTime),'_='+(+new Date)].join('&'));
						}
					}
				}
			}

			if(obj.clientReqType != '2') _s.noticeShow(viewid, reqonly);//展示曝光
			GDTH.autoClk(viewid, reqonly);
		},
		autoClk:function (viewid, reqonly) {
			var cfg = GDTH.resObj[reqonly], obj = cfg[viewid];
			if(cfg.isAllow != 1) return;
            var posids = {'5499':1,'5498':1,'4514':1,'4515':1,'5085':1,'5086':1,'5814':1,'5815':1,'5657':1,'5658':1,'4174':1,'4175':1};
            if (cfg.relateduid == '622' || posids.hasOwnProperty(cfg.PosId)) {//第三次PV才优化点击
                var aclkt_rtd = GDTH.hycUnt.get('aclkt_rtd') || 0;
                if (obj.userid == '622' || posids.hasOwnProperty(obj.advplaceid)) {
                    aclkt_rtd++, GDTH.hycUnt.set('aclkt_rtd', aclkt_rtd);
                }
                if (aclkt_rtd <= 3) return;
            }
			if(obj.elc_status == 1){
				if (obj.clientReqType == '1') {
                	var timeDelay = GDTH.showTimeNum();
					setTimeout(function () {
						GDTH.clickShow(viewid, reqonly, 2);
					}, timeDelay);
				}else if(obj.istp){
					if(!GDTH.hycUnt.get('tp'+obj.tpid)){
                        GDTH.hycUnt.set('tp'+obj.tpid);
						setTimeout(function () {
							GDTH.clickShow(viewid, reqonly, 2);
						}, 1000);
					}
				}else if(obj.pr_id && !GDTH.hycUnt.get('pr'+obj.pr_id)){
                    GDTH.hycUnt.set('pr'+obj.pr_id);
					setTimeout(function () {
						GDTH.clickShow(viewid, reqonly, 2);
					}, 1000);
				}
			}
			/*if(obj.elc_status == 2 && obj.clientReqType == '1'){//暂不启用iframe类优化
				GDTH.clickShow(viewid, reqonly, 3);
			}*/
		},
		/**
		 * 内容节点绑定点击事件
		 * @param container:容器；index:多文字链索引
		 */
		doBindClick:function(viewid, reqonly, container, index){
			var cfg = GDTH.resObj[reqonly];
			var obj = cfg[viewid];
			if(typeof index != 'undefined'){
				obj.antispam = obj.antispam || {};
				if(obj.antispam[index] || !obj.ml[index].url) return;
				obj.antispam[index] = new commUtil.antiSpam(container, function() {
					obj.touched = !0;
				});
			}else{
				if(obj.antispam) return;
				obj.antispam = new commUtil.antiSpam(container, function() {
					obj.touched = !0;
				});
			}
			commUtil.addEvent(container, 'click', function(elm) {
				var __w = GDTH.b_w;
				var scale = (__w / 320) || 1;
				var misClickDistance = 5 * scale,
					iframeHeight = 50 * scale,
					iframeWidth = __w;
				obj.isClickThrough = '0';
				obj.clickPageX = '';
				obj.clickPageY = '';
				if (!obj.touched && (('ontouchstart' in window && 'ontouchend' in window) || cfg.posType == 'pc')) {
					if ((elm.pageY <= misClickDistance) || ((iframeHeight - elm.pageY) <= misClickDistance) || (elm.pageX <= misClickDistance) || ((iframeWidth - elm.pageX) <= misClickDistance)) {} else {
						obj.isClickThrough = '1';
					}
					obj.clickPageX = elm.pageX;
					obj.clickPageY = elm.pageY;
				}
				GDTH.clickShow(viewid,reqonly,1,index);
			});
		},
		/**
		 * 滑动页面改变广告位置
		 */
		showScrollAd : function(obj,clientReqType){
			var first = document.body.firstChild;//得到页面的第一个元素;l
			document.body.insertBefore(obj, first);//在得到的第一个元素之前插入
			obj.style.display = 'none';
			/*_W.scrollAdTime = setTimeout(function(){
				_W.clearTimeout(_W.scrollAdTime);
				_W.scrollAdTime = null;
				obj.style.display = 'none';
			},8000);*/
			if(typeof clientReqType != 'undefined' && clientReqType == '2'){
				return;
			}
			commUtil.addEvent(window,'scroll',scrollBottom);
			function scrollBottom() {
				var clientHeight = commUtil.getClientHeight(),getHeight = commUtil.getScrollHeight(),scrollTop = commUtil.getScrollTop();
				if ((scrollTop + clientHeight) >= (getHeight-100)) {
					_W.clearTimeout(_W.scrollAdTime);
					_W.scrollAdTime = null;
					commUtil.removeEvent(window,'scroll',scrollBottom);
					var last = document.body.lastChild;//得到页面的最后元素
					commUtil.insertAfter(obj, last);//在得到的最后元素之后插入
					obj.style.display = 'block';
				}
			}
		},
        /**
         * 滑动页面时广告始终顶部显示
         */
        showFixedAd : function(obj,clientReqType){
            var first = document.body.firstChild;//得到页面的第一个元素;l
            document.body.insertBefore(obj, first);//在得到的第一个元素之前插入
            if(typeof clientReqType != 'undefined' && clientReqType == '2'){
                return;
            }
            commUtil.addEvent(window,'scroll',scrollBottom);
            var cr = obj.getBoundingClientRect(), adh = 50;
            cr && (adh = cr.height)
            function scrollBottom() {
                var scrollTop = commUtil.getScrollTop();
                if(scrollTop < adh){
                    obj.style.position = 'relative';
                }else{
                    obj.style.position = 'fixed';
                    obj.style.top = 0;
                    obj.style.left = 0;
                }
            }
        },
		/**
		 * 移除当前广告节点元素
		 */
		closeWindow: function (_s) {
			var dom;
			if(_s){
				dom = _s.parentNode;
			}else{
				dom = commUtil.$('#showContBox');
			}
			dom.parentNode.removeChild(dom);
		},

		/**
		 * 广告曝光请求
		 */
		noticeShow: function (viewid,reqonly) {
            var obj = GDTH.resObj[reqonly][viewid];
            var WinNoticeUrl = obj.exp_track || [],
                isHidden = typeof obj.isHidden != 'undefined' ? obj.isHidden : (obj.container ? commUtil.checkIsHidden(obj.container) : 0),
                adScreenPosition = typeof obj.adScreenPosition != 'undefined' ? obj.adScreenPosition : commUtil.getAdScreenPosition(obj);
            obj.adScreenPosition = adScreenPosition;
			if(obj.rqy){
				var exp = Constants.EXP_TRACK_URL() + obj.rqy;
                typeof obj.adIndex != 'undefined' && (exp += '&showtimes='+(obj.adIndex+1));
				!obj.isDefault && (exp += (obj.loadimgerror ? '&loadimgerror=1' : '')+'&ish=' + isHidden + '&asp={adScreenPosition}');
				WinNoticeUrl.push(exp);
			}
			if(commUtil.isEmpty(WinNoticeUrl)) return;
			if(obj.isExpos) return;
            obj.isExpos = true;
			if(obj.pr_id == '300') {
				GDTH.wuyila('19171378');
			}
			for (var i = 0, len = WinNoticeUrl.length; i < len; i++) {
				commUtil.createImgUrl(WinNoticeUrl[i].replace(/{adScreenPosition}/, obj.adScreenPosition));
			}
		},
		/**
		 * 广告点击曝光请求
		 */
		clickShowUrl: function (viewid,reqonly,index) {
			//var obj = GDTH.resObj[GDTH.viewid];
			var cfg = GDTH.resObj[reqonly];
			var obj = cfg[viewid];
			var antispamObj = obj.antispamObj || {}, WinClickShowUrl = obj['clk_track'] || [], clicktype = obj['clicktype'] || 1;
			if(obj.rqy){
                var rqyAry = [Constants.CLK_TRACK_URL() + obj.rqy, 'down_x=' + (antispamObj.aa || '-999'), 'down_y=' + (antispamObj.ab || '-999'), 'up_x=' + (antispamObj.ba || '-999'), 'up_y=' + (antispamObj.bb || '-999'), 'click_time=' + (antispamObj.p || '-999'), 'ec=' + (antispamObj.ec || '0'), 'sc=' + (antispamObj.sc || '0'), 'gc=' + (antispamObj.g || '0'), 'width=' + GDTH.b_w, 'height=' + GDTH.screen_height, 'crt_tp=' + obj.crt_type, 'relatedid2=' + clicktype];
                typeof index != 'undefined' && rqyAry.push('mid=' + obj.ml[index]['adinfo'][0].mid, 'pr_id=' + obj.ml[index]['pr_id'], 'aaid=' + obj.ml[index]['aAdvplaceID']);
				WinClickShowUrl.push(rqyAry.join('&'));
			}
			if(commUtil.isEmpty(WinClickShowUrl)) return;
			for (var i = 0, len = WinClickShowUrl.length; i < len; i++) {
				commUtil.createImgUrl(WinClickShowUrl[i]);
			}
		},

		/**
		 * 广告点击处理
		 * @param clicktype:点击类型[1主动,2被动,3IFRAME] index:多条文字链数据
		 */
		clickShow: function (viewid,reqonly,clicktype,index) {
			var clicktype = clicktype || 1;
			var cfg = GDTH.resObj[reqonly];
			var obj = cfg[viewid];
			if(!obj.isExpos || obj.enck === 0) return;
            obj.clicktype = clicktype;
			if (cfg.clickNum[obj.apurl] && obj.apitype != '2' && obj.pr_id != '245') {//控制二次点击
				return;
			}
			if(obj.clientReqType == '1'){//控制广点通广告一个用户每天只能点10次[被动和主动一共]
				if(clicktype == 2){//控制广点通广告一个用户每天只能被动点2次
					var gclicka = GDTH.hycUnt.get('gclkacookie') || 0;
					try{
                        gclicka++, GDTH.hycUnt.set('gclkacookie',gclicka);
						if(gclicka > 2) return;
					}catch (exp){}
				}
				var gclick = GDTH.hycUnt.get('gclkcookie') || 0;
				try{
                    gclick++, GDTH.hycUnt.set('gclkcookie',gclick);
					if(gclick > 10) return;
				}catch (exp){}
			}
            obj.apurl && (cfg.clickNum[obj.apurl] = !0);
			if(!obj.showtype && clicktype == 1){
				var clickEvent = {};
                clickEvent.clicktype = clicktype,
				clickEvent.pageX = obj.clickPageX,
				clickEvent.pageY = obj.clickPageY,
				clickEvent.playBeginTime = obj.playBeginTime;
				if(typeof index != 'undefined'){
					obj.antispamObj = obj.antispam[index] ? obj.antispam[index].getAntiSpamInfo(clickEvent) : {};
					obj.clk_url = obj.ml[index].url;
				}else{
					obj.antispamObj = obj.antispam ? obj.antispam.getAntiSpamInfo(clickEvent) : {};
				}
			}
			if(clicktype > 1 && obj.clientReqType == '1'){
                obj.GDTPlayProto.getClkUrl(obj, obj.adIndex, function () {
                    GDTH.clickShowUrl(viewid,reqonly,index);
                    _W.setTimeout(function () {
                        _W.location.href = obj.clk_url;
                    },1000);
                });
                return;
			}
            if(obj.clientReqType == '3'){
                GDTH.clickShowUrl(viewid,reqonly,index)
				var data = {url:obj.clk_url,wkid:obj.advplaceid,rid:obj.advplaceid,aaid:obj.aaid,pr_id:obj.pr_id};
				GDTH.wakeUpPlug(data,clicktype);
				return;
			}
            !obj.antispamObj && (obj.antispamObj = {p:'0'});
            typeof(obj.clk_url) != 'undefined' && GDTH.clickShowUrl(viewid,reqonly,index);//点击上报【多条文字链数据index】
			if(!obj.clk_url) return;
			switch (clicktype){
				case 2:
                    setTimeout(function () {
                        _W.top.location = obj.clk_url;
                    },1000);
					break;
				default:
					setTimeout(function () {
						_W.open(obj.clk_url);
					},200);
			}
		},
		/**
		 * object转数组
		 */
		objtoarray: function (obj) {
			var array = {};
			for (var key in obj) {
				for (var k in obj[key]) {
					array[k] = obj[key][k];
				}
			}
			return array;
		},
		//51统计
		wuyila: function (count) {
			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement('script');
			script.type = "text/javascript";
			script.language = "javascript";
			script.src = "//js.users.51.la/" + count + ".js";
			try {
				head.appendChild(script);
			} catch (exp) {}

		},
		/**
		 * 生成点击延时时间
		 **/
		showTimeNum : function(){
			var timeObj,timeMin;
			timeMin = Math.floor(Math.random() * 100 + 1);
			if(timeMin <= 60){
				timeObj = Math.floor(Math.random() * 13000 + 2000);
			}else if(timeMin <= 95){
				timeObj = Math.floor(Math.random() * 15000 + 15000);
			}else if(timeMin <= 99){
				timeObj = Math.floor(Math.random() * 15000 + 30000);
			}else{
				timeObj = Math.floor(Math.random() * 15000 + 45000);
			}
			return timeObj;
		},
		/**
		 * 执行广点通原生[native]广告
		 **/
		/*playNATIVE : function (obj) {
			var reqonly = obj.reqonly, cfg = GDTH.resObj[reqonly];
			GDTH.bindMessage();
			var NATIVE = {};
			NATIVE.advplaceid = obj.advplaceid;
			NATIVE.iappid = obj.iappid;
			NATIVE.iadvplaceid = obj.iadvplaceid;
			NATIVE.viewid = obj.yxviewid;
			NATIVE.isallow = cfg.isAllow;
			NATIVE.elc_status = obj.elc_status;
			NATIVE.crdomain = _W.location.protocol + '//' + _W.location.host;
			NATIVE.tmpid = 'yx_' + obj.viewid;
			obj.url = "http://" + obj.domain +'/gdtbanner/gdtnative.html?yxext=' + encodeURIComponent(JSON.stringify(NATIVE));
			obj.crt_type = 8, obj.posw = 320, obj.posh = 50;
			GDTH.renderWindowPublic(obj.viewid,reqonly);
			//GDTH.checkGdtYsIsReturn(reqonly,obj.viewid);
		},*/
		/**
		 * 执行内嵌JS广告
		 **/
		showEmbedPc : function (obj,reqonly) {
			var cfg = GDTH.resObj[reqonly];
			var pr_id = parseInt(obj.pr_id);
			switch(pr_id){
				case 455:
					obj.iadvplaceid && commUtil.loadJS("http://resource.catch.gift/jstag/v1/"+ obj.iadvplaceid+"/ad.min.js", function () {
						if(_W.ct_jsTag_private && _W.ct_jsTag_private.getAds){
							ct_jsTag_private.getAds(obj.iadvplaceid, callback_, 1);
						}else{
							GDTH.reqTrackReport(obj, 0);
							GDTH.repeatRequest(obj);
							return;
						}
						function callback_(data) {
							if(data && data[0] && data[0].clkUrl){
								GDTH.reqTrackReport(obj, 1);
								var img_url = [
									'http://resource.catch.gift/manual/picture/giftyellow/640/100.jpg',
									'http://resource.catch.gift/manual/picture/giftred/640/100.jpg',
									'http://resource.catch.gift/manual/picture/giftgreen/640/100.jpg'
								];
								obj.img = img_url[Math.floor(Math.random()*(img_url.length))];
								obj.clk_url = data[0].clkUrl, obj.crt_type = 2;
								GDTH.renderWindowPublic(obj.viewid,reqonly);
							}else{
								GDTH.reqTrackReport(obj, 0);
								GDTH.repeatRequest(obj);
							}
						}
					},false,cfg.thisNode);
					break;
				case 9000 :
					GDTH.reqTrackReport(obj, 1);
					GDTH.noticeShow(obj.viewid,reqonly);
					var script = document.createElement('script');
					script.type = 'text/javascript';
					script.innerHTML = obj.iadvplaceid;
					if(cfg.thisNode){
						cfg.thisNode && cfg.thisNode.parentNode.insertBefore(script,cfg.thisNode);
					}else{
						var head = _W.document.getElementsByTagName("head")[0];
						head.appendChild(script);
					}
					break;
			}
		},
		/**
		 * window的message绑定事件
		 **/
		bindMessage : function () {
			if(_W.postMessage && !GDTH.bindMessageRes){
				GDTH.bindMessageRes = true;
				var eventFun = function(evt) {
                    if (!evt.origin) {
                        return;
                    }
                    var ext;
                    try{
                        ext = (typeof evt.data == 'string') ? JSON.parse(evt.data) : evt.data;
                    }catch (e){console.log(e);}
                    if(typeof ext == 'undefined' || typeof ext.op == 'undefined') return;
                    if(ext.op == 'initRequest'){
                        //commUtil.removeEvent(_W, 'message', messageEvent);
                        if(evt.origin.replace(/(http|https):/,'') != Constants.CDN_ADDRESS || !ext.webGL) return;
                        try{
                            var mid = GDTH.messageID, messageIfrm = commUtil.$('#'+mid);
                            messageIfrm && messageIfrm.parentNode.removeChild(messageIfrm);
                        }catch (e){}
                        _W.webGlHysiV2 = ext,GDTH.webGL = /*Math.random().toString().slice(2)*/ext.webGL,GDTH.isUserFirst = ext.isUserFirst,GDTH.webgl_different = ext.webgl_different;
                        init();
                        return;
                    }
                    if(typeof ext.viewid == 'undefined') return;
                    var reqonly, obj;
                    for(var i in GDTH.resObj){
                        if(typeof GDTH.resObj[i][ext.viewid] != 'undefined'){
                            reqonly = i, obj = GDTH.resObj[i][ext.viewid];
                            break;
                        }
                    }
                    if(typeof reqonly == 'undefined' || commUtil.isEmpty(obj)) return;
                    if(ext.op =='click'){
                        obj.antispamObj = JSON.parse(decodeURIComponent(ext.s));
                        if(obj.clientReqType == '1') obj.GDTPlayProto.getClkUrl(obj, ext.index, function () {
                            GDTH.clickShow(ext.viewid, reqonly, 1);
                        });
                    }
                    /*if(obj.domain != evt.origin.replace(/(http|https):\/\//,'')){
                        return;
                    }
                    if(!obj.isGdtYsReturn && obj.clientReqType == '2'){
                        obj.isGdtYsReturn = 1;
                    }
                    if(ext.op =='repeat'){
                        if(obj.reqRepeatObj) return;
                        obj.reqRepeatObj = true;
                        GDTH.reqTrackReport(obj, ext.status_code);//请求二次上报
                        var dom = commUtil.$('#'+ext.tmpid);
                        if(ext.status_code === 1){
                            dom && (dom.style.width = '100%');
                        }else if(ext.status_code === 0){
                            dom && dom.parentNode.removeChild(dom), GDTH.repeatRequest(obj);
                        }
                    }
                    if(ext.op =='exposure'){
                        GDTH.noticeShow(ext.viewid,reqonly);
                    }
                    if(ext.op =='clickExposure'){
                        obj.antispamObj = {};
                        obj.antispamObj.aa = ext.clickobj.sLeft;
                        obj.antispamObj.ab = ext.clickobj.sTop;
                        obj.antispamObj.ba = ext.clickobj.oLeft;
                        obj.antispamObj.bb = ext.clickobj.oTop;
                        obj.antispamObj.p = ext.clickobj.playTime;
                        obj.clicktype = ext.clickobj.clicktype;
                        GDTH.clickShowUrl(ext.viewid,reqonly);
                    }*/
                }
				commUtil.addEvent(_W, 'message', eventFun);
			}
		}
	};

	/**
	 * 扩展插件
	*/
	var commUtil = (function() {
		var mod = {};
		mod.webpEnabled = false;//是否支持webp格式图片
		mod.webpIsCheck = false;//是否检查支持webp格式
		/**
		 * 载入JS（适用JSONP）
		 * @param url:JS地址 callback：回调函数 remove:加载JS完成后是否移除当前JS节点
		 * @param thisNode：要插入当前JS的节点 opt：当前JS节点的其他属性添加
		*/
		mod.loadJS = function(url, callback, remove, thisNode, opt) {
			var head = _W.document.getElementsByTagName("head")[0],opt = opt || {};
			var script = _W.document.createElement('script'), remove = !!remove;
			script.onload = script.onreadystatechange = script.onerror = function() {
				if (script && script.readyState && /^(?!(?:loaded|complete)$)/.test(script.readyState)) return;
				script.onload = script.onreadystatechange = script.onerror = null;
				if(remove) {
					script.src = '';
					script.parentNode.removeChild(script);
					script = null;
				}
				callback && callback();
			};
			for(var i in opt){
				script.setAttribute(i,opt[i]);
			}
			script.type = 'text/javascript';
			script.charset = "utf-8";
			script.async = true;
			script.src = url;
			try {
				if(thisNode){
					thisNode.appendChild(script);
				}else{
					head.appendChild(script);
				}
			} catch (exp) {}
		};
		/**
		 * ajax post请求
		 * @param url[请求地址][必填] 请求的参数param fnSucc[成功后执行的函数][可填] fnFaild[失败后执行的函数][可填] reqnum：当前域内请求的序号
		*/
		mod.ajaxPost = function (url, param, fnSucc, fnFaild, reqnum){
			//创建对象
			var oAjax = null;
			if(_W.XMLHttpRequest){
				var oAjax = new XMLHttpRequest();
				if("withCredentials" in oAjax){
					// Firefox 3.5 and Safari 4
					oAjax.open('POST', url, true); //open(方法, url, 是否异步)
					//oAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					oAjax.setRequestHeader("Content-Type","text/plain");
					oAjax.onreadystatechange = function(){ //OnReadyStateChange事件 接收返回
						if(oAjax.readyState == 4){ //4为完成
							if(oAjax.status == 200){ //200为成功
								if(fnSucc){
									fnSucc(oAjax.responseText,reqnum);
								}
							}else{
								if(fnFaild){
									fnFaild();
								}
							}
						}
					};
					oAjax.send(param);//发送请求
				}else if (_W.XDomainRequest){
					// IE8
					var oAjax = new XDomainRequest();
					if (oAjax) {
						oAjax.open("POST", url, true);
						oAjax.onerror = fnFaild; //请求发生错误时触发
						oAjax.ontimeout = function (){ //请求连接超时时触发
							alert('XDR 请求连接超时');
						};
						oAjax.onload = function () { //请求完毕后触发
							fnSucc(oAjax.responseText);
						};
						oAjax.timeout = 3000;
						oAjax.send(param);//发送请求
					}
				}
			}else{
				alert("Your browser does not support XMLHTTP.");
			}
		};
		/**
		 * 在指定元素的后面追加元素
		 */
		mod.insertAfter = function(newElement, targetElement) { // newElement是要追加的元素 targetElement 是指定元素的位置
			var parent = targetElement.parentNode; // 找到指定元素的父节点
			if(parent.lastChild == targetElement) { // 判断指定元素的是否是节点中的最后一个位置 如果是的话就直接使用appendChild方法
				parent.appendChild(newElement, targetElement);
			} else {
				parent.insertBefore(newElement, targetElement.nextSibling);
			}
		};
		/**
		 * 预加载图片
		 */
		mod.createImgUrl = function(path) {
			try{
				var img = new _W.Image(1, 1);
				img.src = path;
			}catch (exp){}
		};
		/**
		 * 判断对象或者数组是否为空
		 */
		mod.isEmpty = function (o){
			if(typeof o == 'undefined') return true;
			for (var i in o){
				return false;
			}
			return true;
		}
		/**
		 * 取窗口滚动条高度
		 */
		mod.getScrollTop = function() {
			var scrollTop=0;
			if(document.documentElement&&document.documentElement.scrollTop){
				scrollTop = document.documentElement.scrollTop;
			}else if(document.body){
				scrollTop = document.body.scrollTop;
			}
			return scrollTop;
		};
		/**
		 * 取窗口可视范围的高度
		 */
		mod.getClientHeight = function() {
			var clientHeightBody;
			if(document.body.clientHeight&&document.documentElement.clientHeight) {
				clientHeightBody = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
			}else{
				clientHeightBody = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
			}
			return clientHeightBody || 0;
		};
		/**
		 * 取文档内容实际高度
		 */
		mod.getScrollHeight = function (){
			return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
		};
		/**
		 * 获取当前URL参数
		 */
		mod.getQueryString = function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = _W.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]); return null;
		};
		/**
		 * 生成当天日期[ex:20170803]
		 */
		mod.showTime = function(){
			var mydate = new Date();
			var paddNum = function(num){
				num += "";
				return num.replace(/^(\d)$/,"0$1");
			};
			var str = "" + mydate.getFullYear();
			str += paddNum(mydate.getMonth()+1);
			str += paddNum(mydate.getDate());
			return str;
		};
		/**
		 * 浏览器指纹基本信息[粗略]
		 */
		mod.getWebGl = function () {
			var data = ['hysi'];
			try{
				data.push(_W.navigator.userAgent,_W.navigator.platform,_W.navigator.language,screen.width+'*'+screen.height+'*'+screen.colorDepth,new Date().getTimezoneOffset()+'');
			}catch (exp){}
			return mod.genHash(data.join('#'));
		};
		/**
		 * 添加监听事件
		*/
		mod.addEvent = function(elm, type, cb) {
			if (_W.attachEvent) {
				elm.attachEvent('on' + type, cb);
			} else {
				elm.addEventListener(type, cb, false);
			}
		};
		/**
		 * 删除监听事件
		 */
		mod.removeEvent = function(elm, type, cb) {
			if (_W.attachEvent) {
				elm.detachEvent('on' + type, cb);
			} else {
				elm.removeEventListener(type, cb, false);
			}
		};
		/**
		 * 通过ID获取移动浏览器页面节点
		*/
		mod.$ = function(wrap) {
			return document.querySelector(wrap);
		};
		/**
		 * 设置cookie
		 */
		mod.setCookie = function (name,value,hours) {
			var hours = hours ? hours : 6;
			var exp = new Date();
			exp.setTime(exp.getTime() + hours*60*60*1000);
			_W.document.cookie = name + "="+ escape(value) +";expires="+ exp.toGMTString();
		};
		/**
		 * 获取cookie
		 */
		mod.getCookie = function (name) {
			var arr = _W.document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
			if(arr != null) return unescape(arr[2]); return null;
		};
		/**
		 * 设置cookie localStorage
		 */
		mod.setCookieStorage = function (name,value,hours) {
			var hours = hours ? hours : 6;
			var exp = new Date();
			exp.setTime(exp.getTime() + hours*60*60*1000);
			_W.document.cookie = name + "="+ escape(value) +";expires="+ exp.toGMTString();
			if(_W.localStorage){
				try {
					_W.localStorage.setItem(name,value);
				}catch (e){
					if(e.name == 'QuotaExceededError'){
						_W.localStorage.clear();
						_W.localStorage.setItem(name,value);
					}
				}
			}

		};
		/**
		 * 获取cookie || localStorage值
		 */
		mod.getCookieStorage = function (name) {
			var arr = _W.document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)")),storage;
			if(arr != null) return unescape(arr[2]);
			_W.localStorage && (storage = _W.localStorage.getItem(name));
			if(storage) return storage;
			return null;
		};
		/**
		 * 创建隐藏iframe
		 */
		mod.callWithSchema = function (schema,id) {
			var frame = document.createElement('iframe');
			id && (frame.id = id);
			frame.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;visibility:hidden;';
			frame.frameBorder = '0';
			frame.src = schema;
			try{
				document.body.appendChild(frame);
			}catch (e){}
		};
		/**
		 * 创建GDT上报
		 */
		mod.pingHot = function (l, tag, opts, pathname) {
			opts = opts || {};
			purl = ['//pingfore.qq.com/pingd', '?dm='+(l == 'i' ? 'gdt' : 'e')+'.qq.com.hot', '&url=', escape(pathname), '&tt=-', '&hottag=h5_inter.' + tag, '&hotx=' + (opts.x || 9999), '&hoty=' + (opts.y || 9999), '&rand=', Math.random()].join('');
			var i = new Image();
			i.src = purl;
		};
		/**
		 * genHash加密算法
		 */
		mod.genHash = function(key, seed) {
			var remainder, bytes, h1, h1b, c1, c2, k1, i;
			remainder = key.length & 3; // key.length % 4
			bytes = key.length - remainder;
			h1 = seed || 31;
			c1 = 0xcc9e2d51;
			c2 = 0x1b873593;
			i = 0;
			while (i < bytes) {
				k1 =
					((key.charCodeAt(i) & 0xff)) |
					((key.charCodeAt(++i) & 0xff) << 8) |
					((key.charCodeAt(++i) & 0xff) << 16) |
					((key.charCodeAt(++i) & 0xff) << 24);
				++i;

				k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
				k1 = (k1 << 15) | (k1 >>> 17);
				k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

				h1 ^= k1;
				h1 = (h1 << 13) | (h1 >>> 19);
				h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
				h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
			}
			k1 = 0;
			switch (remainder) {
				case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
				case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
				case 1: k1 ^= (key.charCodeAt(i) & 0xff);

					k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
					k1 = (k1 << 15) | (k1 >>> 17);
					k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
					h1 ^= k1;
			}
			h1 ^= key.length;
			h1 ^= h1 >>> 16;
			h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
			h1 ^= h1 >>> 13;
			h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
			h1 ^= h1 >>> 16;
			return (h1 >>> 0).toString();
		};
		/**
		 * Base64加密算法
		 */
		mod.Base64 = (function() {
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
		/**
		 * 触摸事件监控
		 */
		mod.antiSpam = (function () {
			var antiSpam = function (ele, callback) {
				var _s = this;
				this.touchInfo = {};
				if (_W.attachEvent) {
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
			};
			antiSpam.prototype = {
				getFixedX: function(oldX, objInfo) {
					var fixedX = oldX;
					if (!objInfo.adShowWidth) {
						return parseInt(fixedX);
					}
					if (objInfo.adType == "banner") {
						fixedX = oldX * 320 / objInfo.adShowWidth;
					} else if (objInfo.adType == "inline_full") {
						fixedX = oldX * 320 / objInfo.adShowWidth;
					} else if (objInfo.adType == "inline_half") {
						fixedX = oldX * 300 / objInfo.adShowWidth;
					}
					return parseInt(fixedX);
				},
				getFixedY: function(oldY, objInfo) {
					var fixedY = oldY;
					if (!objInfo.adShowHeight) {
						return parseInt(fixedY);
					}
					if (objInfo.adType == "banner") {
						fixedY = oldY * 50 / objInfo.adShowHeight;
					} else if (objInfo.adType == "inline_full") {
						fixedY = oldY * 480 / objInfo.adShowHeight;
					} else if (objInfo.adType == "inline_half") {
						fixedY = oldY * 250 / objInfo.adShowHeight;
					}
					return parseInt(fixedY);
				},
				onTouchCancel: function(evt) {
					//mod.pingHot('c', 'cancel', {}, '/qzone/biz/res/tmpl/banner.html');
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
					var info = (typeof objInfo == 'string') ? JSON.parse(objInfo) : objInfo;
					var obj = {};
					var clickedtime = new Date().getTime();
					if(this.touchInfo.preclick && this.touchInfo.postclick) {
						obj.g = '' + (this.touchInfo.postclick - this.touchInfo.preclick);
					} else {
						obj.g = "-999";
					}
					if(this.touchInfo.preclick) {
						obj.ec = '' + (clickedtime - this.touchInfo.preclick);
						this.touchInfo.preclick = '';
					} else {
						obj.ec = "-999";
					}
					if(this.touchInfo.postclick) {
						obj.sc = '' + (clickedtime - this.touchInfo.postclick);
						this.touchInfo.postclick = '';
					} else {
						obj.sc = "-999";
					}
					if(this.touchInfo.startx) {
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
					}else {
						obj.ab = "-999";
					}
					if (this.touchInfo.endy) {
						obj.bb = '' + this.getFixedY(this.touchInfo.endy, info);
						this.touchInfo.endy = '';
					} else if (info.pageY) {
						obj.bb = '' + this.getFixedY(info.pageY, info);
					}else {
						obj.bb = "-999";
					}
					if(this.touchInfo.endx) {
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
					return obj;
				}
			}
			return antiSpam;
		})();
        /**
         * 优化控制
         */
        mod.hycUnt = (function () {
            var hycUnt = function () {
                var date = new Date();
                this.k = 'hyccookie';
                this.day = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                this.hyccookie = JSON.parse(mod.getCookieStorage(this.k)) || {};
                !this.hyccookie[this.day] && (this.hyccookie = {}, this.hyccookie[this.day] = {});
            };
            hycUnt.prototype = {
                set: function (k, v) {
                    this.hyccookie[this.day][k] = v || 1, mod.setCookieStorage(this.k, JSON.stringify(this.hyccookie), 24);
                },
                get: function (k) {
                    return this.hyccookie[this.day][k];
                }
            };
            return hycUnt;
        })();

		mod.beforestr = function(node, scope) {
			node.insertAdjacentHTML('afterEnd', scope);
		};
		/**
		 * 检测是否支持webp格式图片
		 */
		mod.checkWebp = function(cb) {
			mod.webpIsCheck = true;
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
		};
		/**
		 * 检查当前页面是否HTTPS
		 */
		mod.isHttpsProtocol = function () {
			if (location.protocol.indexOf("http:") !== -1) {
				return 0;
			} else if (location.protocol.indexOf("https:") !== -1) {
				return 1;
			}
			return 0;
		};
		/**
		 * HTTP地址转HTTPS
		 */
		mod.httpTohttps = function (url) {
			return url.replace('http:', 'https:');
		};
		/**
		 * 检查节点是否被隐藏
		 */
		mod.checkIsHidden = function (elm) {
			var isHidden = 0;
			try{
                while (elm != document) {
                    if (elm != document && elm.style.display != "none" && elm.style.visibility != "hidden" && elm.style.visibility != "collapse") {
                        elm = elm.parentNode;
                    } else if (elm.style.display == "none" || elm.style.visibility == "hidden" || elm.style.visibility == "collapse") {
                        isHidden = 1;
                        break;
                    }
                }
			}catch (e){}
			return isHidden;
		}
		/**
		 * 获取节点到页面顶部的屏幕位置比例[第一屏小于1]
		 */
		mod.getAdScreenPosition = function (obj) {
			var dech, adScreenPosition, adTop = 0, asp;
            dech = obj.dech = document.documentElement.clientHeight;
			if(obj.asp){
				if(obj.asp.indexOf('|') != -1){
                    asp = obj.asp.split('|');
                    adTop = parseInt(asp[Math.floor(asp.length * Math.random())])
				}else if(obj.asp.indexOf(',') != -1){
                    asp = obj.asp.split(',');
                    adTop = Math.floor(Math.random() * (asp[1] - asp[0]) + parseInt(asp[0]));
				}else{
                    adTop = parseInt(obj.asp);
				}
			}
            !adTop && !obj.container && (adTop = Math.floor(Math.random() * 80 + 120));
			if(!adTop && obj.container){
                var conRect = obj.container.getBoundingClientRect(), posTop = obj.container.offsetTop;
                adTop = obj.adTop = posTop || conRect.top;
			}
            adScreenPosition = ((adTop + 20) / dech).toFixed(2);
			return adScreenPosition;
		}
		/**
		 * 跨域获取window.name
		 */
		mod.getCrossOriginData = function( url, fn ) {
			var oIframe = document.createElement('iframe'), firstBtn = true,
				loadFn = function () {
					if ( firstBtn ) {
						//导航回同一域下，以便获取到name值
						oIframe.contentWindow.location = '//'+document.domain;
						firstBtn = false;
					} else {
						fn( oIframe.contentWindow.name );
						oIframe.contentWindow.document.write('');
						oIframe.contentWindow.close();
						document.body.removeChild(oIframe);
						oIframe.src = '',oIframe = null;
					}
				};
			oIframe.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;visibility:hidden;';
			oIframe.frameBorder = '0';
			oIframe.src = url;

			//1.第一次iframe加载完毕触发事件，执行loadFn函数，会将iframe导航回air.html
			//2.air.html加载完毕后又会触发事件，再次执行loadFn函数，此时会走else
			if ( oIframe.attachEvent ) {
				oIframe.attachEvent( 'onload', loadFn );
			} else {
				oIframe.onload = loadFn;
			}
			document.body.appendChild(oIframe);
		}
		return mod;
	})();
	/**
	 * 初始化参数和映射对应函数，展示广告
	*/
	var GDTI = {
		closeWindow: GDTH.closeWindow,
		clickShow: GDTH.clickShow,
		init: function (obj) {
			obj && GDTH.init(obj);
		}
	}
	_W.GDTI = _W.GDTI || GDTI;

	var init = function () {
		if(typeof _W.TencentGDT != 'undefined' && _W.TencentGDT) {
			var arrs = _W.TencentGDT;
			_W.TencentGDT = null;
			for (var i = 0, len = arrs.length, la; i < len; i++) {
				la = false;
				if(arrs[i].jsload > 1){
					la = arrs[i-1];
					if(la && (JSON.stringify(la.AndPos) == JSON.stringify(arrs[i].AndPos) || JSON.stringify(la.IosPos) == JSON.stringify(arrs[i].IosPos))){
						(function(e){commUtil.loadJS(Constants.CDN_ADDRESS + '/js/hyhot.js',function(){_W.GDTI&&_W.GDTI.hyhot&&_W.GDTI.hyhot(e,2)})})(arrs[i]);
						continue;
					}
				}
				GDTI.init(arrs[i]);
			}
		}
	},initAdEntry = function() {
		if(GDTH.isTBS() && !_W.isTBSPageJs){
            _W.isTBSPageJs = 1, commUtil.loadJS('//jsapi.qq.com/get?api=connection.* '),
                commUtil.loadJS('//res.imtt.qq.com/tbs/tbs.js');
        }
        GDTH.gdt_fp = commUtil.getCookie("gdt_fp");
        if (!GDTH.gdt_fp) {
            commUtil.loadJS('//qzonestyle.gtimg.cn/qzone/biz/res/tmpl/js/finger.js',function () {
                try {
                    new Fingerprint2().get(function (result, components) {
                        result && (GDTH.gdt_fp = result, commUtil.setCookie("gdt_fp", result, 24 * 365));
                    });
                } catch (e) {console.log(e)}
            })
        }
		if(!_W.webGlHysiV2){
			if(_W.yxproxy) return;
			_W.yxproxy = true;
			var msgfr = Constants.CDN_ADDRESS + '/proxy/index.html';
			if(_W.postMessage){
				GDTH.messageID = 'msg'+Math.random().toString().slice(2);
				GDTH.bindMessage();
				commUtil.callWithSchema(msgfr,GDTH.messageID);
			}else{
				commUtil.getCrossOriginData(msgfr,function (data) {
					var obj = typeof data == 'string' ? JSON.parse(data) : data;
					if(!obj.webGL) return;
					_W.webGlHysiV2 = obj, GDTH.webGL = obj.webGL, GDTH.isUserFirst = obj.isUserFirst, GDTH.webgl_different = obj.webgl_different;
					init();
				});
			}
		}else{
			if(typeof _W.webGlHysiV2 != 'object' || !_W.webGlHysiV2['webGL']){
				_W.webGlHysiV2 = null;
				initAdEntry();
				return;
			}
            GDTH.webGL = _W.webGlHysiV2.webGL, GDTH.webgl_different = _W.webGlHysiV2.webgl_different, GDTH.isUserFirst = 2;
			init();
		}
	}
	initAdEntry();
})(window,document);