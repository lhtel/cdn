(function() {
	function init() {
		var define = GDTDefine;
		GDTDefine('gdt:mod/util.js', function(require, exports, module) {
			var UMod = {};
			UMod.emptyFn = function() {};
			UMod.userAgent = (function() {
				var t, vie, vff, vopera, vsf, vawk, vair, vchrome, winver, wintype, mactype, isBeta, isIPad, isIPhone, discerned, _ua = navigator.userAgent,
					_nv = navigator.appVersion,
					vffRE = /(?:Firefox|GranParadiso|Iceweasel|Minefield).(\d+\.\d+)/i,
					vwebkitRE = /AppleWebKit.(\d+\.\d+)/i,
					vchromeRE = /Chrome.(\d+\.\d+)/i,
					vsafariRE = /Version.(\d+\.\d+)/i,
					vwinRE = /Windows.+?(\d+\.\d+)/,
					vie = vff = vopera = vsf = vawk = vair = vchrome = winver = NaN;
				wintype = mactype = isBeta = isIPad = discerned = false;
				if (window.ActiveXObject || _nv.indexOf("Trident") > -1) {
					vie = 9 - ((_nv.indexOf("Trident\/5.0") > -1) ? 0 : 1) - (window.XDomainRequest ? 0 : 1) - (window.XMLHttpRequest ? 0 : 1);
					(_nv.indexOf("Trident\/6.0") > -1) && (vie = 10);
					(_nv.indexOf("Trident\/7.0") > -1) && (vie = 11);
					t = navigator.appMinorVersion;
					if (vie > 7 && t && t.toLowerCase().indexOf("beta") > -1) {
						isBeta = true;
					}
				} else if (document.getBoxObjectFor || typeof(window.mozInnerScreenX) != "undefined") {
					t = _ua.match(vffRE);
					vff = parseFloat((t && t[1]) || "3.3", 10);
				} else if (!navigator.taintEnabled) {
					t = _ua.match(vwebkitRE);
					vawk = (t && t.length > 1) ? parseFloat(t[1], 10) : ( !! document.evaluate ? ( !! document.querySelector ? 525 : 420) : 419);
					if ((t = _nv.match(vchromeRE)) || window.chrome) {
						if (!t) {
							t = _ua.match(vchromeRE);
						}
						vchrome = parseFloat((t && t[1]) || "2.0", 10);
					}
					if ((t = _nv.match(vsafariRE)) && !window.chrome) {
						if (!t) {
							t = _ua.match(vsafariRE);
						}
						vsf = parseFloat((t && t[1]) || "3.3", 10);
					}
					if (_ua.indexOf("AdobeAIR") > -1) {
						vair = 1;
					}
					if (_ua.indexOf("iPad") > -1) {
						isIPad = true;
					}
					if (_ua.indexOf("iPhone") > -1) {
						isIPhone = true;
					}
				} else if (window.opera) {
					vopera = parseFloat(_nv, 10);
				} else {
					vie = 6;
				}
				if (_ua.indexOf("Windows") > -1) {
					wintype = true;
					t = _ua.match(vwinRE);
					winver = parseFloat((t && t[1]) || "5.1", 10);
				} else if (_ua.indexOf("Mac OS X") > -1) {
					mactype = true;
				} else {
					wintype = true;
				}
				return {
					beta: isBeta,
					firefox: vff,
					ie: vie,
					opera: vopera,
					air: vair,
					safari: vsf,
					safariV: vsf,
					webkit: vawk,
					chrome: vchrome,
					windows: winver || wintype,
					isiPad: isIPad,
					isiPhone: isIPhone,
					macs: mactype
				};
			})();
			UMod.object = {
				getType: function(obj) {
					return obj === null ? 'null' : (obj === undefined ? 'undefined' : Object.prototype.toString.call(obj).slice(8, -1).toLowerCase());
				},
				each: function(d, a, b) {
					if (typeof d.length == "number") {
						for (var f = 0, n = d.length; f < n; f++) a.call(b, d[f], f);
					} else if (typeof d == "number") {
						for (f = 0; f < d; f++) a.call(b, f, f);
					} else {
						for (f in d) a.call(b, d[f], f);
					}
				}
			};
			UMod.lang = {
				isHashMap: function(o) {
					return UMod.object.getType(o) == "object";
				}
			}
			UMod.string = {
				RegExps: {
					escHTML: {
						re_amp: /&/g,
						re_lt: /</g,
						re_gt: />/g,
						re_apos: /\x27/g,
						re_quot: /\x22/g
					},
					escString: {
						bsls: /\\/g,
						nl: /\n/g,
						rt: /\r/g,
						tab: /\t/g
					},
					cut: /[\x00-\xFF]/,
					getRealLen: {
						r0: /[^\x00-\xFF]/g,
						r1: /[\x00-\xFF]/g
					}
				},
				escString: function(str) {
					var t = UMod.string.RegExps.escString,
						h = UMod.string.RegExps.escHTML;
					return UMod.string.listReplace((str + ""), {
						'\\\\': t.bsls,
						'\\n': t.nl,
						'': t.rt,
						'\\t': t.tab,
						'\\\'': h.re_apos,
						'\\"': h.re_quot
					});
				},
				escHTML: function(str) {
					var t = UMod.string.RegExps.escHTML;
					return UMod.string.listReplace((str + ""), {
						'&amp;': t.re_amp,
						'&lt;': t.re_lt,
						'&gt;': t.re_gt,
						'&#039;': t.re_apos,
						'&quot;': t.re_quot
					});
				},
				restHTML: function(str) {
					if (!UMod.string.restHTML.__utilDiv) {
						UMod.string.restHTML.__utilDiv = document.createElement("div");
					}
					var t = UMod.string.restHTML.__utilDiv;
					t.innerHTML = (str + "");
					if (typeof(t.innerText) != 'undefined') {
						return t.innerText;
					} else if (typeof(t.textContent) != 'undefined') {
						return t.textContent;
					} else if (typeof(t.text) != 'undefined') {
						return t.text;
					} else {
						return '';
					}
				},
				listReplace: function(s, l) {
					if (UMod.lang.isHashMap(l)) {
						for (var i in l) {
							s = UMod.string.commonReplace(s, l[i], i);
						}
						return s;
					} else {
						return s + '';
					}
				},
				commonReplace: function(s, p, r) {
					return s.replace(p, r);
				},
				cut: function(str, bitLen, tails) {
					str += '';
					bitLen -= 0;
					tails = tails || '';
					if (isNaN(bitLen)) {
						return str;
					}
					var len = str.length,
						i = Math.min(Math.floor(bitLen / 2), len),
						cnt = UMod.string.getRealLen(str.slice(0, i));
					for (; i < len && cnt < bitLen; i++) {
						cnt += 1 + !UMod.string.RegExps.cut.test(str.charAt(i));
					}
					return str.slice(0, cnt > bitLen ? i - 1 : i) + (i < len ? tails : '');
				},
				getRealLen: function(s, isUTF8) {
					if (typeof(s) != 'string') {
						return 0;
					}
					if (!isUTF8) {
						return s.replace(UMod.string.RegExps.getRealLen.r0, "**").length;
					} else {
						var cc = s.replace(UMod.string.RegExps.getRealLen.r1, "");
						return (s.length - cc.length) + (encodeURI(cc).length / 3);
					}
				}
			};
			UMod.dom = {
				getById: function(id) {
					return document.getElementById(id);
				},
				getElementsByClassName: function(className, tag, elm) {
					var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
					var tag = tag || "*";
					var elm = elm || document;
					var elements = (tag == "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag);
					var returnElements = [];
					var current;
					var length = elements.length;
					for (var i = 0; i < length; i++) {
						current = elements[i];
						if (testClass.test(current.className)) {
							returnElements.push(current);
						}
					}
					return returnElements;
				},
				searchChain: function(elem, prop, func) {
					prop = prop || 'parentNode';
					while (elem && elem.nodeType && elem.nodeType == 1) {
						if (!func || func.call(elem, elem)) {
							return elem;
						}
						elem = elem[prop];
					}
					return null;
				},
				getAncestorBy: function(elem, method) {
					elem = UMod.dom.get(elem);
					return UMod.dom.searchChain(elem.parentNode, 'parentNode', function(el) {
						return el.nodeType == 1 && (!method || method(el));
					});
				},
				get: function(e) {
					return (typeof(e) == "string") ? document.getElementById(e) : e;
				},
				getStyle: function(el, property) {
					el = UMod.dom.get(el);
					if (!el || el.nodeType == 9) {
						return null;
					}
					var w3cMode = document.defaultView && document.defaultView.getComputedStyle,
						computed = !w3cMode ? null : document.defaultView.getComputedStyle(el, ''),
						value = "";
					switch (property) {
					case "float":
						property = w3cMode ? "cssFloat" : "styleFloat";
						break;
					case "opacity":
						if (!w3cMode) {
							var val = 100;
							try {
								val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity;
							} catch (e) {
								try {
									val = el.filters('alpha').opacity;
								} catch (e) {}
							}
							return val / 100;
						} else {
							return parseFloat((computed || el.style)[property]);
						}
						break;
					case "backgroundPositionX":
						if (w3cMode) {
							property = "backgroundPosition";
							return ((computed || el.style)[property]).split(" ")[0];
						}
						break;
					case "backgroundPositionY":
						if (w3cMode) {
							property = "backgroundPosition";
							return ((computed || el.style)[property]).split(" ")[1];
						}
						break;
					}
					if (w3cMode) {
						return (computed || el.style)[property];
					} else {
						return (el.currentStyle[property] || el.style[property]);
					}
				},
				setStyle: function(el, properties, value) {
					if (!(el = UMod.dom.get(el)) || el.nodeType != 1) {
						return false;
					}
					var tmp, bRtn = true,
						w3cMode = (tmp = document.defaultView) && tmp.getComputedStyle,
						rexclude = /z-?index|font-?weight|opacity|zoom|line-?height/i;
					if (typeof(properties) == 'string') {
						tmp = properties;
						properties = {};
						properties[tmp] = value;
					}
					for (var prop in properties) {
						value = properties[prop];
						if (prop == 'float') {
							prop = w3cMode ? "cssFloat" : "styleFloat";
						} else if (prop == 'opacity') {
							if (!w3cMode) {
								prop = 'filter';
								value = value >= 1 ? '' : ('alpha(opacity=' + Math.round(value * 100) + ')');
							}
						} else if (prop == 'backgroundPositionX' || prop == 'backgroundPositionY') {
							tmp = prop.slice(-1) == 'X' ? 'Y' : 'X';
							if (w3cMode) {
								var v = UMod.dom.getStyle(el, "backgroundPosition" + tmp);
								prop = 'backgroundPosition';
								typeof(value) == 'number' && (value = value + 'px');
								value = tmp == 'Y' ? (value + " " + (v || "top")) : ((v || 'left') + " " + value);
							}
						}
						if (typeof el.style[prop] != "undefined") {
							el.style[prop] = value + (typeof value === "number" && !rexclude.test(prop) ? 'px' : '');
							bRtn = bRtn && true;
						} else {
							bRtn = bRtn && false;
						}
					}
					return bRtn;
				},
				removeElement: function(el) {
					if (typeof(el) == "string") {
						el = document.getElementById(el);
					}
					if (!el) {
						return;
					}
					if (el.removeNode) {
						el.removeNode(true);
					} else {
						if (el.parentNode) {
							el.parentNode.removeChild(el);
						}
					}
					el = null;
					return null;
				},
				getPosition: function(el) {
					var xy = UMod.dom.getXY(el),
						size = UMod.dom.getSize(el);
					return {
						"top": xy[1],
						"left": xy[0],
						"width": size[0],
						"height": size[1]
					};
				},
				getScrollTop: function(doc) {
					var _doc = doc || document;
					return Math.max(_doc.documentElement.scrollTop, _doc.body.scrollTop);
				},
				getScrollLeft: function(doc) {
					var _doc = doc || document;
					return Math.max(_doc.documentElement.scrollLeft, _doc.body.scrollLeft);
				},
				getXY: function(el, doc) {
					var _t = 0,
						_l = 0,
						_doc = doc || document;
					if (el) {
						if (_doc.documentElement.getBoundingClientRect && el.getBoundingClientRect) {
							var box = el.getBoundingClientRect(),
								oDoc = el.ownerDocument,
								_fix = UMod.userAgent.ie ? 2 : 0;
							_t = box.top - _fix + UMod.dom.getScrollTop(oDoc);
							_l = box.left - _fix + UMod.dom.getScrollLeft(oDoc);
						} else {
							while (el.offsetParent) {
								_t += el.offsetTop;
								_l += el.offsetLeft;
								el = el.offsetParent;
							}
						}
					}
					return [_l, _t];
				},
				getSize: function(el) {
					var _fix = [0, 0],
						i, len, arr;
					if (el) {
						arr = ["Left", "Right", "Top", "Bottom"];
						for (i = 0, len = arr.length; i < len; i++) {
							var v = arr[i];
							_fix[v == "Left" || v == "Right" ? 0 : 1] += (parseInt(UMod.dom.getStyle(el, "border" + v + "Width"), 10) || 0) + (parseInt(UMod.dom.getStyle(el, "padding" + v), 10) || 0);
						}
						var _w = el.offsetWidth - _fix[0],
							_h = el.offsetHeight - _fix[1];
						return [_w, _h];
					}
					return [-1, -1];
				}
			};
			UMod.css = {
				insertCSSLink: function(url, id) {
					var doc = document,
						cssLink = (cssLink = doc.getElementById(id)) && cssLink.nodeName == 'LINK' ? cssLink : null,
						head = doc.getElementsByTagName("head")[0];
					if (!cssLink) {
						cssLink = doc.createElement("link");
						id && (cssLink.id = id);
						cssLink.rel = "stylesheet";
						cssLink.rev = "stylesheet";
						cssLink.type = "text/css";
						cssLink.media = "screen";
						head.appendChild(cssLink);
					}
					url && (cssLink.href = url);
					return cssLink.sheet || cssLink;
				},
				hasClassName: function(elem, name) {
					return (elem && name) ? (elem.classList ? elem.classList.contains(name) : (name && ((' ' + elem.className + ' ').indexOf(' ' + name + ' ') > -1))) : false;
				}
			};
			UMod.JSONGetter = (function() {
			    
			    
			function reqRequest (url, param, fnSucc, fnFaild, reqnum,n1){
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
					    fnSucc(oAjax.responseText);
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
		    }
				var counter = 0;

				function load(url, callback, ecb, opts) {
					var script = document.createElement('script'),
						head, doc = document,
						global = window,
						_ecb, charset, clear, timer, _gcname, done = false;
					head = doc.head || doc.getElementsByTagName("head")[0] || doc.body
					opts = opts || {};
					charset = opts.charset || 'GB2312';
					_gcname = opts.uniqueName;
					if (opts.timeout) {
						timer = setTimeout(function() {
							opts.onTimeout(999);
							clear();
						}, opts.timeout);
					}
					global[_gcname] = function(data) {
						done = true;
						callback(data);
					};
					_ecb = function(code) {
						ecb && ecb(code);
					};
					clear = function() {
						done = true;
						global[_gcname] = null;
						try {
							delete global[_gcname];
						} catch (e) {}
						if (timer) {
							clearTimeout(timer);
							timer = null;
						}
						script.onload = script.onreadystatechange = script.onerror = null;
						head.removeChild(script);
						script = null;
					};
					script.onerror = function(ex) {
						_ecb(998);
						clear();
					};
					script.onload = script.onreadystatechange = function(evt) {
						if (!script) {
							return;
						}
						var rs = script.readyState,
							ready;
						ready = (typeof rs === 'undefined' || rs === "loaded" || rs === "complete");
						if (done && ready) {
							clear();
						}
						if (!done && ready) {
							_ecb(999);
							clear();
						}
					};
					
					console.log('\\\\\\\\\\\\fffff\\\\\\\\\\');
					console.log(url);
					//console.log(callback);
					
					console.log('\\\\\\\\\\\\ffff\\\\\\\\\\');
					
					script.type = 'text/javascript';
					script.charset = charset;
					script.async = true;
					script.src = url;
					head.appendChild(script);
				}

				function encode(str) {
					return encodeURIComponent(str);
				}

				function jsonp(url, params, callback, ecb, opts) {
				    console.log('uuuuuuuuuuuu');
				    console.log(url);
				    console.log('uuuuuuuuuuuu');
				    var cbnameKey, query = (url || '').indexOf('?') === -1 ? '?' : '&',
						key;
					opts = opts || {};
					cbname = opts.callbackName || 'callback';
					cbnameKey = opts.cbnameKey || 'callback';
					var uniqueName = cbname + "_gdtjson" + (++counter);
					params = params || {};
					for (key in params) {
						if (params.hasOwnProperty(key)) {
							query += encode(key) + "=" + encode(params[key]) + "&";
						}
					}
					opts.uniqueName = uniqueName;
					
					
					if (url.indexOf('mi.gdt.qq.com/gdt_mview.fcg') > -1){
					    setTimeout(function() {
						    //reqRequest(url + query + cbnameKey + '=' + uniqueName, callback);
						    load(url + query + cbnameKey + '=' + uniqueName, callback, ecb, opts);
					    }, 1);					    
					}else{
					    setTimeout(function() {
						    load(url + query + cbnameKey + '=' + uniqueName, callback, ecb, opts);
					    }, 1);					    
					}
					
					

					return uniqueName;
				}

				function getter(url, cname, data, charset) {
					var obj = {};
					obj.onSuccess = null;
					obj.onError = null;
					obj.onTimeout = null;
					obj.timeout = null;
					obj.send = function(cb) {
						jsonp(url, data, obj.onSuccess, obj.onError, {
							charset: charset,
							timeout: obj.timeout,
							onTimeout: obj.onTimeout,
							callbackName: cb
						});
					};
					return obj;
				}
				return getter;
			}());
			UMod.xhr = (function() {
				var supportlv2 = (window.XMLHttpRequest) && ('withCredentials' in new XMLHttpRequest);
				var _xhrgetter = function(url, callback, ecb, opts) {
						var timer, _getter;
						opts = opts || {};
						var cleartimer = function() {
								if (timer) {
									clearTimeout(timer);
									timer = null;
								}
							};
						var send = function(xmlHttp, clear) {
								xmlHttp.onreadystatechange = function() {
									if (xmlHttp.readyState == 4) {
										if (xmlHttp.status == 200) {
											var resp = xmlHttp.responseText;
											callback({
												ret: 0,
												resp: resp,
												xmlHttp: xmlHttp
											});
										} else {
											ecb({
												ret: 599,
												msg: 'http error',
												status: xmlHttp.status
											});
										}
										cleartimer();
										clear();
									}
								};
								var method = opts.method || "GET";
								xmlHttp.open(method, url, true);
								if (supportlv2) {
									xmlHttp.withCredentials = true;
								}
								if (opts.headers) {
									UMod.object.each(opts.headers, function(v, k) {
										xmlHttp.setRequestHeader(k, v);
									});
								}
								var data = null;
								if (method == "POST" && opts.data) {
									var _d = [];
									UMod.object.each(opts.data, function(v, k) {
										_d.push(k + '=' + encodeURIComponent(v));
									});
									data = _d.join("&");
								}
								xmlHttp.send(data);
								if (opts.timeout) {
									timer = setTimeout(function() {
										opts.onTimeout && opts.onTimeout();
										cleartimer();
										clear();
									}, opts.timeout);
								}
							};
						_getter = _getCors;
						_getter(send, ecb);
					};
				var _getCors = function(send, ecb) {
						var xmlHttp = null;
						var getTransport = function() {
								var xhr;
								if (window.XMLHttpRequest) {
									xhr = new XMLHttpRequest();
								} else if (window.ActiveXObject) {
									xhr = new ActiveXObject("Msxml2.XMLHTTP") || new ActiveXObject("Microsoft.XMLHTTP");
								}
								return xhr;
							};
						var clear = function() {
								xmlHttp.onreadystatechange = null;
								xmlHttp = null;
								delete xmlHttp;
							};
						xmlHttp = _getTansport(getTransport, ecb);
						xmlHttp && send(xmlHttp, clear);
					};
				var _getTansport = function(getTransport, ecb) {
						var xmlHttp;
						try {
							xmlHttp = getTransport();
						} catch (e) {
							ecb({
								ret: 599,
								msg: 'get transport error',
								status: 598,
								exception: e
							});
							return;
						}
						return xmlHttp;
					};
				return _xhrgetter;
			})();
			UMod.getlocalStorage = function(win) {
				var store = null,
					engine = null,
					searchOrder, engines;
				win = win || window;
				searchOrder = ['localStorage', 'userData'];
				engines = {
					localStorage: {
						test: function() {
							return win.localStorage ? true : false;
						},
						init: function() {
							store = win.localStorage;
						},
						getItem: function(key) {
							return store.getItem(key);
						},
						setItem: function(key, value) {
							return store.setItem(key, value);
						}
					},
					userData: {
						test: function() {
							return win.ActiveXObject ? true : false;
						},
						init: function() {
							store = win.document.documentElement;
							store.addBehavior('#default#userdata');
						},
						getItem: function(key) {
							var item = null;
							try {
								store.load(key);
								item = store.getAttribute(key);
							} catch (e) {}
							return item;
						},
						setItem: function(key, value) {
							var flag = false;
							try {
								store.load(key);
								store.setAttribute(key, value);
								flag = store.save(key);
							} catch (e) {}
							return flag;
						}
					}
				};
				for (var i = 0, l = searchOrder.length; i < l; i++) {
					engine = engines[searchOrder[i]];
					try {
						if (engine.test()) {
							engine.init();
							break;
						} else {
							engine = null;
						}
					} catch (ex) {
						engine = null;
					}
				}
				if (engine) {
					delete engine.test;
					delete engine.init;
				}
				return engine;
			};
			UMod.cookie = {
				get: function(name) {
					var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"),
						m = document.cookie.match(r);
					return (!m ? "" : m[1]);
				}
			};
			UMod.event = {
				getEvent: function(evt) {
					var evt = window.event || evt || null,
						c, ct = 0;
					if (!evt) {
						c = arguments.callee;
						while (c && ct < 10) {
							if (c.arguments && (evt = c.arguments[0]) && (typeof(evt.button) != "undefined" && typeof(evt.ctrlKey) != "undefined")) {
								break;
							}++ct;
							c = c.caller;
						}
					}
					return evt;
				},
				_eventListDictionary: {},
				_fnSeqUID: 0,
				_objSeqUID: 0,
				addEvent: function(obj, eventType, fn, argArray) {
					var cfn, res = false,
						l, handlers, efn, sTime;
					if (!obj) {
						return res;
					}
					if (!obj.eventsListUID) {
						obj.eventsListUID = "e" + (++UMod.event._objSeqUID);
					}
					if (!(l = UMod.event._eventListDictionary[obj.eventsListUID])) {
						l = UMod.event._eventListDictionary[obj.eventsListUID] = {};
					}
					if (!fn.__elUID) {
						fn.__elUID = "e" + (++UMod.event._fnSeqUID) + obj.eventsListUID;
					}
					if (!l[eventType]) {
						l[eventType] = {};
					}
					if (!l[eventType].handlers) {
						l[eventType].handlers = {};
					}
					handlers = l[eventType].handlers;
					if (typeof(handlers[fn.__elUID]) == 'function') {
						return false;
					}
					cfn = cfn ||
					function(evt) {
						return fn.apply(obj, !argArray ? [UMod.event.getEvent(evt)] : ([UMod.event.getEvent(evt)]).concat(argArray));
					};
					if (obj.addEventListener) {
						obj.addEventListener(eventType, cfn, false);
						res = true;
					} else if (obj.attachEvent) {
						res = obj.attachEvent("on" + eventType, cfn);
					} else {
						res = false;
					}
					if (res) {
						handlers[fn.__elUID] = cfn;
					}
					return res;
				},
				trigger: function(obj, eventType) {
					var l = obj && UMod.event._eventListDictionary[obj.eventsListUID],
						handlers = l && l[eventType] && l[eventType].handlers,
						i;
					if (handlers) {
						try {
							for (i in handlers) {
								handlers[i].call(window, {});
							}
						} catch (evt) {
							UMod.console.print('UMod.event.trigger error')
						}
					}
				},
				removeEvent: function(obj, eventType, fn) {
					var cfn = fn,
						res = false,
						l = UMod.event._eventListDictionary,
						r;
					if (!obj || !fn) {
						return res;
					}
					if (obj.eventsListUID && l[obj.eventsListUID] && l[obj.eventsListUID][eventType]) {
						l = l[obj.eventsListUID][eventType].handlers;
						if (l && l[fn.__elUID]) {
							cfn = l[fn.__elUID];
							r = l;
						}
					}
					if (obj.removeEventListener) {
						obj.removeEventListener(eventType, cfn, false);
						res = true;
					} else if (obj.detachEvent) {
						obj.detachEvent("on" + eventType, cfn);
						res = true;
					} else {
						return false;
					}
					if (res && r && r[fn.__elUID]) {
						delete r[fn.__elUID];
					}
					return res;
				}
			};
			module.exports = UMod;
		});
	}
	GDT.initComm = init;
})();