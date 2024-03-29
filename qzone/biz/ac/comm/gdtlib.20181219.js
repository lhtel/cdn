(function() {
	var a = GDT;
	var require, define;
	(function(global) {
		var head = document.getElementsByTagName('head')[0],
			baseUrl, loadingMap = {},
			factoryMap = {},
			modulesMap = {},
			scriptsMap = {},
			resMap = {},
			pkgMap = {};

		function createScript(url, onerror) {
			if (url in scriptsMap) return;
			scriptsMap[url] = true;
			var script = document.createElement('script');
			if (onerror) {
				var tid = setTimeout(onerror, require.timeout);
				script.onerror = function() {
					clearTimeout(tid);
					onerror();
				};
				script.onreadystatechange = function() {
					if (this.readyState == 'complete') {
						clearTimeout(tid);
					}
				}
			}
			script.type = 'text/javascript';
			script.charset = 'UTF-8';
			script.src = url;
			head.appendChild(script);
			return script;
		}

		function loadScript(id, callback, onerror) {
			var queue = loadingMap[id] || (loadingMap[id] = []);
			queue.push(callback);
			var res = resMap[id] || {};
			var pkg = res.pkg;
			var url;
			var base = baseUrl || '';
			if (pkg) {
				url = base + pkgMap[pkg].url;
			} else {
				url = base + res.url || id;
			}
			createScript(url, onerror &&
			function() {
				onerror(id);
			});
		}
		define = function(id, factory) {
			factoryMap[id] = factory;
			var queue = loadingMap[id];
			if (queue) {
				for (var i = 0, n = queue.length; i < n; i++) {
					queue[i]();
				}
				delete loadingMap[id];
			}
		};
		require = function(id) {
			id = require.alias(id);
			var mod = modulesMap[id];
			if (mod) {
				return mod.exports;
			}
			var factory = factoryMap[id];
			if (!factory) {
				throw '[ModJS] Cannot find module `' + id + '`';
			}
			mod = modulesMap[id] = {
				exports: {}
			};
			var ret = (typeof factory == 'function') ? factory.apply(mod, [require, mod.exports, mod]) : factory;
			if (ret) {
				mod.exports = ret;
			}
			return mod.exports;
		};
		require.async = function(names, onload, onerror) {
			if (typeof names == 'string') {
				names = [names];
			}
			for (var i = 0, n = names.length; i < n; i++) {
				names[i] = require.alias(names[i]);
			}
			var needMap = {};
			var needNum = 0;

			function findNeed(depArr) {
				for (var i = 0, n = depArr.length; i < n; i++) {
					var dep = depArr[i];
					var child = resMap[dep];
					if (child && 'deps' in child) {
						findNeed(child.deps);
					}
					if (dep in factoryMap || dep in needMap) {
						continue;
					}
					needMap[dep] = true;
					needNum++;
					loadScript(dep, updateNeed, onerror);
				}
			}

			function updateNeed() {
				if (0 == needNum--) {
					var args = [];
					for (var i = 0, n = names.length; i < n; i++) {
						args[i] = require(names[i]);
					}
					onload && onload.apply(global, args);
				}
			}
			findNeed(names);
			updateNeed();
		};
		require.resourceMap = function(obj) {
			var k, col;
			col = obj.res;
			for (k in col) {
				if (col.hasOwnProperty(k)) {
					resMap[k] = col[k];
				}
			}
			col = obj.pkg;
			for (k in col) {
				if (col.hasOwnProperty(k)) {
					pkgMap[k] = col[k];
				}
			}
		};
		require.setBaseUrl = function(url) {
			baseUrl = url;
		};
		require.loadJs = function(url) {
			createScript(url);
		};
		require.loadCss = function(cfg) {
			if (cfg.content) {
				var sty = document.createElement('style');
				sty.type = 'text/css';
				if (sty.styleSheet) {
					sty.styleSheet.cssText = cfg.content;
				} else {
					sty.innerHTML = cfg.content;
				}
				head.appendChild(sty);
			} else if (cfg.url) {
				var link = document.createElement('link');
				link.href = cfg.url;
				link.rel = 'stylesheet';
				link.type = 'text/css';
				head.appendChild(link);
			}
		};
		require.alias = function(id) {
			return id
		};
		require.timeout = 5000;
		global.GDTRequire = require;
		global.GDTDefine = define;
	})(window);
	GDTDefine('gdt:comm/comm.js', function(require, exports, module) {
		var CMod = {};
		CMod.fp = GDT.fp;
		var fk = GDT.fp.QZFL || {};
		var UMod = require('gdt:mod/util.js');
		CMod.dom = UMod.dom;
		CMod.dom.ua = UMod.userAgent;
		CMod.css = UMod.css;
		CMod.string = UMod.string;
		CMod.event = UMod.event;
		CMod.JSONGetter = UMod.JSONGetter;
		CMod.xhr = UMod.xhr;
		CMod.TCISD = (typeof TCISD != 'undefined') ? TCISD : fk.TCISD;
		CMod.fnQueue = GDT.fnQueue;
		CMod.on = GDT.fnQueue.add;
		CMod.fire = GDT.fnQueue.exec;
		CMod.fireOnce = GDT.fnQueue.execOnce;
		CMod.importJs = GDT.importJs;
		CMod.getFileUrl = GDT.getFileUrl;
		CMod.genHash = GDT.genHash;
		CMod.t = GDT.t;
		CMod.siDomain = GDT.siDomain;
		CMod.imgcacheDomain = GDT.imgcacheDomain;
		CMod._isPageHttps = GDT._isPageHttps;
		CMod._isHttps = GDT._isHttps;
		CMod._isJSHttps = GDT._isJSHttps;
		CMod._isImageHttps = GDT._isImageHttps;
		CMod._isApptraceHttps = GDT._isApptraceHttps;
		CMod._protocal = !GDT._isHttps ? "http://" : "https://";
		CMod.httpsUrl = function(url) {
			url = url.replace("http://", "https://");
			return url;
		}
		CMod.getlocalStorage = UMod.getlocalStorage;
		CMod.cookie = UMod.cookie;
		var debugcnt, _isDebugging = false;

		function log(str) {
			if (!_isDebugging) {
				return;
			}
			if (!debugcnt) {
				var divObj = document.createElement("div");
				divObj.style.position = "fixed";
				divObj.style.backgroundColor = 'gray';
				var first = document.body.firstChild;
				document.body.insertBefore(divObj, first);
				debugcnt = divObj;
			}
			debugcnt.innerHTML += "<div>" + str + "</div>";
		};
		var isEmpty = function(o) {
				var empty = true;
				each(o, function(v, k, _break) {
					empty = false;
					return _break;
				});
				return empty;
			},
			each = function(d, a, b) {
				if (typeof d.length == "number") {
					for (var f = 0, n = d.length; f < n; f++) a.call(b, d[f], f);
				} else if (typeof d == "number") {
					for (f = 0; f < d; f++) a.call(b, f, f);
				} else {
					for (f in d) a.call(b, d[f], f);
				}
			},
			map = function(d, a) {
				var b = [];
				each(d, function(f, n) {
					b.push(a(f, n));
				});
				return b;
			},
			mix = function(r) {
				r = r || {};
				for (var i = 1; i < arguments.length; i++) {
					var s = arguments[i];
					if (s) {
						for (var j in s) {
							r[j] = s[j];
						}
					}
				}
				return r;
			},
			getObjectToStringFn = function(assign_token, pair_separator, need_last, need_encode) {
				var encode = need_encode ? encodeURIComponent : function(k) {
						return k;
					};
				return function(o) {
					return map(o, function(v, k) {
						if (k != null) {
							return k + assign_token + encode(v);
						}
					}).join(pair_separator) + (need_last ? pair_separator : '');
				};
			};
		var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
		var meta = {
			'\b': '\\b',
			'\t': '\\t',
			'\n': '\\n',
			'\f': '\\f',
			'\r': '\\r',
			'"': '\\"',
			'\\': '\\\\'
		};

		function quote(string) {
			escapable.lastIndex = 0;
			return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
				var c = meta[a];
				return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
			}) + '"' : '"' + string + '"';
		}
		mix(CMod, {
			getTime: function() {
				return +new Date();
			},
			log: log,
			isEmpty: isEmpty,
			each: each,
			map: map,
			getType: function(obj) {
				return obj === null ? 'null' : (obj === undefined ? 'undefined' : Object.prototype.toString.call(obj).slice(8, -1).toLowerCase());
			},
			getUrlParam: function(name, cancelBubble) {
				var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
				var m = location.href.match(r);
				try {
					if ((!m || m == "") && !cancelBubble) m = top.location.href.match(r);
				} catch (e) {}
				return (!m ? "" : m[2]);
			},
			mix: mix,
			bind: function(method, thisObj) {
				var args = Array.prototype.slice.call(arguments, 2);
				return function() {
					var this_args = Array.prototype.slice.call(arguments, 0);
					return method.apply(thisObj, args.concat(this_args));
				};
			},
			format: function(s, config, reserve) {
				return s.replace(/\{([^}]*)\}/g, (typeof config == 'object') ?
				function(m, i) {
					var ret = config[i];
					return ret == null && reserve ? m : (ret === undefined ? '' : ret);
				} : config);
			},
			JSONToString: function(obj) {
				if (typeof JSON != 'undefined' && JSON.stringify) {
					return JSON.stringify(obj);
				} else {
					var str = '',
						arr = [],
						type;
					var otype = CMod.getType(obj);
					var bstart = (otype == 'array') ? '[' : '{';
					var bend = (otype == 'array') ? ']' : '}';
					str += bstart;
					CMod.each(obj, function(v, k) {
						var substr = "";
						if (otype != 'array') {
							substr = "\"" + k + "\":";
						}
						type = CMod.getType(v);
						if (type == 'string') {
							substr += quote(v);
						} else if (type == 'number') {
							substr += v;
						} else if (type == 'undefined') {
							substr += type;
						} else if (type == 'object' || type == 'array') {
							substr += CMod.JSONToString(v);
						}
						arr.push(substr);
					});
					str += arr.join(',');
					str += bend;
					return str;
				}
			},
			getObjectToStringFn: getObjectToStringFn,
			serializeStyles: getObjectToStringFn(':', ';', true, false),
			serializeAttrs: getObjectToStringFn('=', ' ', true, false),
			serializeQuery: getObjectToStringFn('=', '&', false, true)
		});
		(function() {
			var el_template = '<{tag} {attrs}style="{styles}">{inner}</{tag}>';
			var buildHTML = function(styles, attrs, tag, inner) {
					return CMod.format(el_template, {
						tag: tag || 'div',
						attrs: CMod.serializeAttrs(attrs || {}),
						styles: CMod.serializeStyles(styles),
						inner: inner || ''
					});
				};
			CMod.dom.buildHTML = buildHTML;
		})();
		module.exports = CMod;
	});;
	GDTDefine('gdt:comm/anticheat.js', function(require, exports, module) {
		var comm = require('gdt:comm/comm.js');
		var CMod = {};
		CMod.ClickManage = (function() {
			var da;
			var cm = {
				possize: {},
				initdata: function() {
					da.mousedown = da.mouseup = {
						x: da.none,
						y: da.none
					};
					da.mousedownTime = da.mouseupTime = da.clickTime = da.none;
				},
				poscn: 'mod-snsmarketing-slot-external',
				setPoscn: function(poscn) {
					cm.poscn = poscn;
				},
				getPosSize: function(obj, pid, opts) {
					var possize, posel, size, dom = comm.dom,
						poscn;
					opts = opts || {};
					poscn = cm.poscn;
					possize = cm.possize[pid];
					if (!possize) {
						possize = {};
						posel = dom.getAncestorBy(obj, function(el) {
							return (comm.css.hasClassName(el, poscn));
						});
						if (posel) {
							size = dom.getSize(posel);
							possize.width = size[0];
							possize.height = size[1];
						} else {
							possize.width = possize.height = da.none;
						}
						cm.possize[pid] = possize;
					}
					return possize;
				},
				getDisplayedTime: function() {
					return da.none;
				},
				combinedata: function(phrase, obj, pid, oid) {
					var data = {},
						now = comm.getTime(),
						dimension, size;
					data.aa = da.mousedown.x;
					data.ab = da.mousedown.y;
					data.ba = da.mouseup.x;
					data.bb = da.mouseup.y;
					data.g = (da.clickTime > 0 && da.mousedownTime > 0) ? (da.clickTime - da.mousedownTime) : da.none;
					data.e = (cm.entertime > 0) ? (now - cm.entertime) : da.none;
					data.r = 2;
					data.p = cm.getDisplayedTime();
					size = cm.getPosSize(obj, pid);
					data.da = size.width;
					data.db = size.height;
					comm.each(data, function(v, k) {
						data[k] = v + '';
					});
					return data;
				},
				getTarget: function(obj) {
					return obj;
				},
				getX: function(evt) {
					return evt.clientX + comm.dom.getScrollLeft();
				},
				getY: function(evt) {
					return evt.clientY + comm.dom.getScrollTop();
				},
				setLink: function(obj, data) {
					var originUrl, target = cm.getTarget(obj);
					originUrl = obj.getAttribute('gdtoriurl');
					url = originUrl + '&s=' + comm.JSONToString(data);
					target.setAttribute('href', url);
				},
				mouseevent: function(pid, oid, opts) {
					var data = {},
						target, el, url, now = comm.getTime(),
						eda, type, evt;
					opts = opts || {};
					el = opts.el;
					eda = opts.evtdata;
					type = eda.type;
					if (!el) {
						return;
					}
					da[type + 'Time'] = now;
					if (da[type]) {
						evt = comm.event.getEvent();
						da[type].x = cm.getX(evt);
						da[type].y = cm.getY(evt);
					}
					data = cm.combinedata(eda.phrase, el, pid, oid);
					cm.setLink(el, data);
				},
				mouseover: function(pid, oid, opts) {
					cm.entertime = comm.getTime();
				},
				mousedown: function(pid, oid, opts) {
					cm.initdata();
					opts.evtdata = {
						type: 'mousedown',
						phrase: 1
					};
					cm.mouseevent(pid, oid, opts);
				},
				mouseup: function(pid, oid, opts) {
					opts.evtdata = {
						type: 'mouseup',
						phrase: 2
					};
					cm.mouseevent(pid, oid, opts);
				},
				click: function(pid, oid, opts) {
					opts.evtdata = {
						type: 'click',
						phrase: 3
					};
					cm.mouseevent(pid, oid, opts);
				}
			};
			cm.data = {
				none: -999,
				entertime: 0
			};
			da = cm.data;
			return cm;
		})();
		module.exports = CMod;
	});;
	GDTDefine('gdt:comm/proxy.js', function(require, exports, module) {
		var comm = require('gdt:comm/comm.js');
		var Mshell = function(mod, opts) {
				var shell = this;
				this.name = mod;
				opts = opts || {};
				this.version = opts.ver || null;
				this.callbackkey = '__shell_' + this.name;
				this.mockfuncs = {};
				this.asyncmod = null;
				this.isMockClass = !! opts.isMockClass;
				if (this.isMockClass) {
					this.classFn = this.fshell(this.name, true);
				}
			};
		Mshell.prototype = {
			getResource: function(ver) {},
			resourceCounter: 0,
			prefetched: -1,
			prefetch: function() {},
			mock: function() {
				var i = 0,
					len, meths = Array.prototype.slice.call(arguments);
				for (len = meths.length; i < len; i++) {
					this[meths[i]] = this.fshell(meths[i]);
					this.mockfuncs[meths[i]] = this[meths[i]];
				}
			},
			mockProto: function() {
				var i = 0,
					len, meths = Array.prototype.slice.call(arguments);
				for (len = meths.length; i < len; i++) {
					this.classFn.prototype[meths[i]] = this.fshell(meths[i]);
				}
			},
			extendMod: function(Mod) {
				for (var meth in this.mockfuncs) {
					Mod[meth] = this.mockfuncs[meth];
				}
			},
			getClass: function() {
				return this.classFn;
			},
			fshell: function(meth, isConstruct) {
				return (function(_m) {
					return function() {
						var fn, thisObj, args = Array.prototype.slice.call(arguments);
						var methkey = _m.callbackkey;
						if (!_m.isMockClass || (_m.isMockClass && isConstruct)) {
							thisObj = _m.isMockClass ? this : _m.asyncmod;
							fn = function() {
								_m.asyncmod[meth].apply(thisObj, args);
							};
						} else {
							thisObj = this;
							fn = function() {
								_m.asyncmod[_m.name].prototype[meth].apply(thisObj, args);
							};
						}
						if (_m.prefetched > 0) {
							fn();
						} else {
							comm.fnQueue.add(methkey, fn);
							_m.prefetched < 0 && _m.prefetch();
						}
					};
				})(this);
			},
			onReady: function(fn) {
				typeof fn === 'function' && (comm.fnQueue.add(this.callbackkey, fn));
			},
			execOnReady: function() {
				this.prefetched = 1;
				comm.fnQueue.execOnce(this.callbackkey);
			}
		};
		Mshell.prototype.prefetch = function(ver) {
			var rs, rscount, i = 0,
				len, url, el, urlid, loadFn;
			if (this.prefetched < 0) {
				this.prefetched = 0;
				rs = this.getResource(ver);
				rscount = rs ? rs.length : 0;
				for (; i < rscount; i++) {
					url = rs[i][1];
					ver && (url = url.replace(/{VER}/g, ver));
					if (rs[i][0] === 'js') {
						rs[i][1]((function(_m, count) {
							return function(asyncMod) {
								_m.asyncmod = asyncMod;
								if (++_m.resourceCounter >= count) {
									_m.execOnReady();
									_m = null, count = null;
								}
							};
						})(this, rscount))
					} else {
						require.loadCss(url);
						this.resourceCounter++;
					}
				}
			}
		};
		var ProxyMod = {
			Mshell: Mshell,
			siDomain: comm.siDomain
		};
		module.exports = ProxyMod;
	});;
	GDTDefine('gdt:comm/helper.js', function(require, exports, module) {
		var comm = require('gdt:comm/comm.js');
		var proxy = require('gdt:comm/proxy.js');
		var HMod = {};
		var each = comm.each,
			dom = comm.dom;
		HMod.__imgs = [];
		HMod.pingreq = function(url) {
			setTimeout(function() {
				var img = new Image();
				img.src = url;
				HMod.__imgs.push(img);
			}, 0);
		};
		HMod.stripTag = function(str) {
			var reg = /\[url\]([^\[]+)\[\/url\]/g;
			str = str.replace(reg, "$1");
			reg = /<br\s*\/>|<\/?[^>]*>/g;
			str = str.replace(reg, "");
			str = str.replace(/<|>/g, "");
			str = str.replace(/'/g, "&#39;");
			return str;
		};
		HMod.ENV = (function() {
			var m = {};
			try {
				var win = comm.fp;
				if (win && win.location.host.indexOf('qzone.qq.com') > 0 && typeof(win.g_version) == 'number') {
					m.hosttype = 'qzone';
					m.hostver = win.g_version;
				}
				if (win.QZONE && win.QZONE.FP && win.QZONE.FP.getUserVIPLevel) {
					m.yellow = win.QZONE.FP.getUserVIPLevel(true);
				}
			} catch (e) {}
			return m;
		})();
		HMod.clear = function(pid) {};
		HMod.genGTk = function() {
			var skey = comm.cookie.get("skey") || comm.cookie.get("rv2");
			return comm.genHash(skey);
		};
		HMod.getbrowserInfo = function(map) {
			var browser, btype;
			try {
				each(comm.dom.ua, function(v, k) {
					if (v && map[k]) {
						broswer = k + '' + v;
						btype = map[k];
						return false;
					}
				});
			} catch (exi) {}
			return {
				broswer: broswer,
				btype: btype
			};
		};
		var statmod = new proxy.Mshell('stat');
		statmod.getResource = function() {
			var files;
			files = [
				['js', function(cb) {
					require.async('gdt:mod/stat.js', function(asyncmod) {
						cb(asyncmod);
					});
				}]
			];
			return files;
		};
		statmod.mock("sendStat", "sendErrMsg", "valueStat", "closeOrder", "pgvOrder", "reportReqErr");
		statmod.extendMod(HMod);
		HMod.filterManage = (function() {
			var fm = {};
			var getDateTime = function(time) {
					var date = time ? new Date(time) : new Date();
					var datestr = date.toDateString();
					return Date.parse(datestr);
				};
			var _localstorage = comm.getlocalStorage(comm.fp);
			fm._db = {
				set: function(k, v) {
					_localstorage && _localstorage.setItem(k, v);
				},
				get: function(k) {
					return _localstorage && _localstorage.getItem(k);
				}
			};
			var _datekey = '_gdt_filter_date',
				_datakey = '_gdt_filter_data';
			fm.set = function(id) {
				var exist = false;
				var cdata = fm.get();
				var dn = getDateTime();
				exist = ('|' + cdata.join('|') + '|').indexOf('|' + id + '|') >= 0;
				if (!exist) {
					cdata.unshift(id);
					var len = cdata.length;
					if (len > 5) {
						cdata.length--;
					}
					fm._db.set(_datakey, cdata.join('|'));
					fm._db.set(_datekey, dn);
				}
			};
			fm.get = function() {
				var _date = fm._db.get(_datekey),
					data = fm._db.get(_datakey);
				var cdata = data ? data.split('|') : [];
				var dn = getDateTime();
				if (_date) {
					var d1 = getDateTime(+_date);
					cdata = (d1 != dn) ? [] : cdata;
				} else {
					cdata = [];
				}
				each(cdata, function(v, k) {
					cdata[k] = v + '';
				});
				return cdata;
			};
			return fm;
		})();
		HMod._webp = 0;
		HMod.getWebPSupport = function() {
			return HMod._webp == 1;
		};
		var detectWebp = function(callback) {
				var image = new Image();
				image.onerror = function() {
					callback(false);
				};
				image.onload = function() {
					callback(image.width == 1);
				};
				image.src = 'data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA==';
			}
		HMod.detectWebp = function() {
			if (navigator.userAgent.indexOf("Chrome") > 0) {
				detectWebp(function(g) {
					HMod._webp = g ? 1 : 0;
				});
			}
		};
		HMod.detectWebp();
		module.exports = HMod;
	});;
	GDTDefine('gdt:comm/data.js', function(require, exports, module) {
		var comm = require('gdt:comm/comm.js');
		var helper = require('gdt:comm/helper.js');
		var DMod = {};
		DMod.dm = {
			omap: {},
			dlist: {},
			clist: {}
		};
		DMod.init = function(pid, c, d) {
			DMod.dm.clist[pid] = c;
			DMod.dm.dlist[pid] = d;
		};
		DMod.getPosData = function(pid) {
			var d = DMod.dm.dlist[pid];
			var c = DMod.dm.clist[pid];
			if (d && c) {
				return {
					'cfg': c,
					'data': d
				};
			}
		};
		DMod.getPosCfg = function(pid) {
			var c = DMod.dm.clist[pid];
			if (c) {
				return c;
			}
		};
		DMod.getOrderData = function(pid, oid) {
			var pos = DMod.getPosData(pid);
			var data;
			if (pos) {
				var datalist = pos['data'];
				for (var i = 0, len = datalist.length; i < len; i++) {
					var o = datalist[i];
					if (o.cl == oid) {
						data = o;
						break;
					}
				}
			}
			return data;
		};
		var pinged = {};
		DMod.getDataAndPing = function(pid, start, len, cb) {
			var pos = DMod.getPosData(pid),
				data, ret = [];
			if (pos) {
				var dlist = pos.data,
					parr = [],
					_cpinged;
				pinged[pid] = pinged[pid] || {};
				_cpinged = pinged[pid];
				ret = dlist.slice(start, start + len);
				comm.each(ret, function(v, k) {
					if (!_cpinged[v.cl]) {
						parr.push(v.cl);
						_cpinged[v.cl] = 1
					}
				});
				if (parr.length) {
					setTimeout(function() {
						require.async('gdt:comm/ping.js', function(ping) {
							ping.view(pid, parr);
						});
					}, 0);
				}
			}
			cb && cb(ret);
		};
		DMod.trimData = function(data, pconf) {
			var playcfg = pconf.playcfg;
			comm.each(data, function(v, k) {
				v.cl = v.cl || v.id;
				if (v.ext) {
					var tmpalist, ainfo;
					if (v.ext.appclass) {
						v.appclass = v.ext.appclass;
					}
					if (v.ext.appname) {
						v.appname = v.ext.appname;
					}
					tmpalist = v.ext.alist;
					if (tmpalist) {
						ainfo = tmpalist[2019];
						if (ainfo) {
							var tmpaid = ainfo.aid;
							if (tmpaid && v.txt) {
								ainfo.aid = {
									url: v.rl,
									txt: v.txt
								};
								v.bqqdeal = 1;
								v.txt = '';
								v.orirl = v.rl;
								v.rl = tmpaid;
							}
						}
						ainfo = tmpalist[2016];
						if (ainfo && ainfo.aid && ainfo.aid.list && ainfo.aid.list.length && v.txt && !(playcfg && playcfg[1039] == 1)) {
							v.txt = '';
						}
						ainfo = tmpalist[2023];
						if (ainfo) {
							v.pcpush = {
								appid: v.productid,
								canpush: true,
								canhover: true
							};
							if (ainfo.aid && ainfo.aid.appname) {
								ainfo.aid.sendtipmsg = '手机接收应用';
							}
						}
						var alist = [];
						comm.each(tmpalist, function(av) {
							alist.push(av);
						});
						v.alist = alist;
					}
				}
			});
		};
		DMod.getPosCfgByKey = function(pid, cfgkey, oid) {
			var o, cv, cfg;
			if (oid) {
				o = DMod.getOrderData(pid, oid);
				cfg = o && o.cfg;
			} else {
				o = DMod.getPosCfg(pid);
				cfg = o && o.playcfg;
			}
			cv = cfg && cfg[cfgkey];
			return cv;
		};
		module.exports = DMod;
	});;
	GDTDefine('gdt:comm/config.js', function(require, exports, module) {
		var comm = require('gdt:comm/comm.js');
		var Config = {};
		Config.charset = 'utf-8';
		Config.cbname = '_bc';
		Config.PINGWAITTIMEMAX = 300;
		Config.c = '2';
		Config.MAXVIEWNUM = 18;
		Config.datadomain = 'i.gdt.qq.com';
		Config.datapath = 'view.fcg';
		Config.mdatadomain = 'mi.gdt.qq.com';
		Config.innerdomain = 'ii.gdt.qq.com';
		Config.mdatapath = 'gdt_mview.fcg';
		Config.innerdatapath = 'gdt_inner_view';
		Config._curdatadomain = Config.datadomain;
		var burl = comm._protocal + Config._curdatadomain + '/' + Config.datapath + '?';
		Config._burl = burl;
		Config._mburl = comm._protocal + Config.mdatadomain + '/' + Config.mdatapath + '?';
		Config._mbInnerUrl = comm._protocal + Config.innerdomain + '/' + Config.innerdatapath + '?';
		Config._xhrproxyurl = comm._protocal + Config._curdatadomain + '/ajaxproxy2.html';
		Config._xhrdataurl = comm._protocal + Config._curdatadomain + '/dataproxy.html';
		Config.expconf = {
			PINGWAIT: '11030',
			PCPUSHTPL: 'mapptpl'
		};
		Config.setReqCgi = function(cgi) {
			Config._burl = cgi;
		};
		setTimeout(function() {
			var _lc = comm.getlocalStorage();
			Config._full_stat = _lc && _lc.getItem('_gdt_full_stat');
			Config._debugger = _lc && _lc.getItem('_gdt_debugger');
		}, 0);
		module.exports = Config;
	});;
	GDTDefine('gdt:comm/ping.js', function(require, exports, module) {
		var comm = require('gdt:comm/comm.js');
		var helper = require('gdt:comm/helper.js');
		var bizconfig = require('gdt:comm/config.js');
		var datamanage = require('gdt:comm/data.js');
		var PMod = {};
		PMod.ping = (function() {
			var plist = [],
				orderlist = [],
				pmap = {},
				extlist = [],
				mplist = [],
				mextlist = [],
				waitflush, timerflush = 0;
			return {
				append: function(orderdata, pid) {
					if (!orderdata || !orderdata.apurl) {
						return;
					}
					plist.push(orderdata.apurl);
					pmap[orderdata.cl] = pid;
					orderlist.push(orderdata.cl);
					if (orderdata.opurl) {
						extlist.push(orderdata.opurl);
					}
					if (orderdata.apptrace) {
						extlist.push(orderdata.apptrace);
					}
				},
				appendClick: function(data) {
					if (data.appclick) {
						helper.pingreq(data.appclick);
					}
				},
				flush: function() {
					var v, rd = Math.random() * 100,
						fn = arguments.callee,
						delaymerge;
					if (plist.length === 0) {
						return;
					}
					delaymerge = 10;
					if (delaymerge && (delaymerge < bizconfig.PINGWAITTIMEMAX)) {
						if (!waitflush) {
							waitflush = 1;
							setTimeout(function() {
								timerflush = 1;
								fn();
							}, delaymerge);
							return;
						}
						if (!timerflush) {
							return;
						}
						waitflush = 0;
						timerflush = 0;
					}
					if (plist.length <= 1 || rd < 1 || bizconfig._full_stat) {
						while (plist.length > 0) {
							v = plist.shift();
							PMod.ping_vgdt(v);
						}
					} else {
						PMod._postOrderView(plist);
						plist = [];
					}
					while (extlist.length > 0) {
						v = extlist.shift();
						helper.pingreq(v);
					}
					pmap = {};
					orderlist = [];
				}
			};
		})();
		PMod._gdtping = function(pid) {
			var c = datamanage.getPosCfg(pid);;
			if (c && c.playcfg && !c.playcfg.noping) {
				PMod._viewpos(pid, true);
			}
		};
		PMod.view = function(pid, olist) {
		    
			var rand_122 = Math.floor(Math.random() * (1000 - 1)) + 1;
			var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['iadvplaceid']+'&app_id='+window.all_info['iappid']+'&gdt_mview=139&rand_122='+rand_122;
			new Image().src = alogs;		    
		    
		    
			var t = comm.getType(olist);
			if (t != 'array') {
				olist = [olist];
			}
			comm.each(olist, function(oid) {
				PMod._view(pid, oid);
			});
		};
		PMod._view = function(pid, oid, forcePing) {
			var c = datamanage.getPosCfg(pid);
			if (c && c.playcfg && !c.playcfg.noping && !forcePing) {
				return;
			}
			var odata = datamanage.getOrderData(pid, oid);
			if (!odata) {
				return;
			}
			PMod.ping.append(odata, pid);
			PMod.ping.flush();
			setTimeout(function() {
				require.async('gdt:comm/plugin.js', function(plugin) {
					plugin.execLoadPlugin(pid, 'onExposure', {
						posId: pid,
						orderdata: odata
					});
				});
			}, 0);
		};
		PMod.viewpos = function(pid) {
			PMod._viewpos(pid, false);
		};
		PMod._viewpos = function(pid, forcePing) {
			var d = datamanage.getPosData(pid),
				c;
			c = (d && d.cfg) ? d.cfg : null;
			var dlist = (d && d.data) ? d.data : null;
			comm.each(dlist, function(v, k) {
				PMod._view(pid, v.cl, forcePing);
			});
		};
		PMod._postOrderView = function(list) {
			var dc, varr = [],
				targeturl;
			comm.each(list, function(url) {
				var mat = url && url.match(/viewid=([^&]*)/);
				(!targeturl) && url && (targeturl = url.substring(0, url.indexOf('?')));
				if (mat && mat[1]) {
					varr.push(mat[1]);
				}
			});
			targeturl = targeturl || 'http://v.gdt.qq.com/gdt_stats.fcg';
			if (comm._isHttps) {
				targeturl = comm.httpsUrl(targeturl);
			}
			var attrVarr = [];
			while (varr.length) {
				attrVarr = varr.splice(0, bizconfig.MAXVIEWNUM || 1);
				PMod._batchview(targeturl, attrVarr);
			}
		};
		PMod.ping_vgdt = function(url) {
		    
		var rand_122 = Math.floor(Math.random() * (1000 - 1)) + 1;
		var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['iadvplaceid']+'&app_id='+window.all_info['iappid']+'&gdt_mview=138&cf=1&rand_122='+rand_122;
		new Image().src = alogs;		    
		    
		    
			var p, statId = 440065,
				succode, retcode;
			url += '&datatype=jsonp';
			p = new comm.JSONGetter(url, null, null, 'utf-8');
			p.onSuccess = function(re) {
				var rate = 1;
				if (re.ret === 0) {
					succode = 1;
					retcode = 11;
					rate = 300;
				} else {
					succode = re.ret >= 400 ? 2 : 3;
					retcode = 50 + re.ret;
					rate = 100;
				}
				helper.valueStat(url, succode, retcode, 1, rate, {
					urlext: '?ext'
				});
			};
			p.onError = function() {
				helper.valueStat(url, 3, 50, 1, 1, {
					urlext: '?ext'
				});
			};
			p.send('_cb');
		};
		var vnum = 0;
		PMod._batchview = function(targeturl, list) {
			var FormSender, data, _sender, _img;

			function formatData(d, isStr) {
				var ret = !! isStr ? [] : {};
				comm.each(d, function(v, k) {
					if ( !! isStr) {
						ret.push('viewid' + k + '=' + v);
					} else {
						ret['viewid' + k] = v;
					}
				});
				if ( !! isStr) {
					ret.push('count=' + d.length);
				} else {
					ret.count = d.length;
				}
				return ret;
			}
			
			var lll = list.length;
			for(var jjj = 0;jjj < lll;jjj++){
			    var rand_122 = Math.floor(Math.random() * (1000 - 1)) + 1;
			    var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['iadvplaceid']+'&app_id='+window.all_info['iappid']+'&gdt_mview=138&cf=2&rand_122='+rand_122;
			    new Image().src = alogs;			    
			}	
						
			
			
			
			if (list.length <= 3) {
				helper.pingreq(targeturl + '?' + formatData(list, true).join('&'));
			} else {
				require.async('gdt:mod/stat.js', function(stat) {
					var data = formatData(list);
					data.datatype = 'jsonp';
					stat._postdata(targeturl, data);
				});
			}
		};
		module.exports = PMod;
	});;
	GDTDefine('gdt:comm/click.js', function(require, exports, module) {
		var datamanage = require('gdt:comm/data.js');
		var comm = require('gdt:comm/comm.js');
		var ping = require('gdt:comm/ping.js');
		var helper = require('gdt:comm/helper.js');
		var proxy = require('gdt:comm/proxy.js');
		var CM = require('gdt:comm/anticheat.js');
		var CMod = {};
		CMod.setOrderLink = function(params) {
			var pid, oid, linklist, openlink;
			params = params || {};
			if (comm.getType(params) === 'object') {
				pid = params.posId;
				oid = params.orderId;
				linklist = params.linklist;
				openlink = params.openlink;
			} else {
				pid = arguments[0];
				oid = arguments[1];
				linklist = arguments[2];
			}
			if (comm.getType(linklist) == 'array') {
				var d = datamanage.getOrderData(pid, oid);
				comm.each(linklist, function(v, k) {
					if (v && v.nodeType == 1) {
						var params = [pid, d.cl,
						{
							openlink: openlink
						}],
							cm = CMod.ClickManage;
						v.onclick = function() {
							params[2].el = this;
							return CMod._click.apply(null, params);
						};
						comm.each(['mousedown', 'mouseup', 'mouseover'], function(mouseevt) {
							v['on' + mouseevt] = function() {
								params[2].el = this;
								cm[mouseevt].apply(null, params);
							};
						});
						v.setAttribute('gdtoriurl', d._l);
						v.setAttribute('href', d._l);
						v.setAttribute('target', '_blank');
					}
				});
			}
		};
		CMod.getOrderLink = function(pid, oid) {
			var cm = "ClickManage",
				cparam = '',
				d = datamanage.getOrderData(pid, oid);
			cparam = "'" + pid + "', '" + d.cl + "', {el: this}"
			var arr = ['onclick="return ' + comm.t + '._click( ' + cparam + ' );"', 'onmousedown="' + comm.t + '. ' + cm + '.mousedown( ' + cparam + ' );"', 'onmouseup="' + comm.t + '. ' + cm + '.mouseup( ' + cparam + ' );"', 'onmouseover="' + comm.t + '. ' + cm + '.mouseover( ' + cparam + ' );"', 'href="' + d._l + '"', 'gdtoriurl="' + d._l + '"', 'target = "_blank"'];
			return arr.join(" ");
		};
		CMod.click = function(pid, oid, opts) {
			return CMod._click(pid, oid, opts);
		};
		CMod._click = function(pid, oid, opts) {
			var data = datamanage.getOrderData(pid, oid);
			opts = opts || {};
			if (!data) {
				return;
			}
			comm.fire('beforeclick', {
				pid: pid,
				oid: oid,
				obj: opts.el
			});
			ping.ping.appendClick(data);
			var link = data.rl,
				clickret;
			if (data.pcpush && data.pcpush.canpush) {
				helper.pingreq(data.rl);
				CMod.dealPcpush(pid, oid, data.pcpush.appid, data);
				clickret = false;
			} else if (!CMod.isLink(link)) {
				try {
					CMod._execln(link);
					clickret = false;
				} catch (e) {}
			} else if (CMod.isLink(link)) {
				if (opts.openlink) {
					var linktoopen = opts.el ? opts.el.getAttribute('href') : link;
					var target = '_blank';
					CMod.openUrl(linktoopen, target);
					clickret = false;
				}
			}
			comm.fire('afterclick', {
				pid: pid,
				oid: oid,
				orderdata: data
			});
			return clickret;
		};
		CMod.isLink = function(link) {
			return !(/jtype=[12]/).test(link);
		};
		CMod.ClickManage = CM.ClickManage;
		var linkMod = new proxy.Mshell('linkMod');
		linkMod.getResource = function() {
			var files = [
				['js', function(cb) {
					require.async('gdt:mod/link.js', function(asyncmod) {
						cb(asyncmod);
					});
				}]
			];
			return files;
		};
		linkMod.mock('dealPcpush', '_openlink', 'openUrl', '_execln');
		linkMod.extendMod(CMod);
		module.exports = CMod;
	});;
	GDTDefine('gdt:comm/load.js', function(require, exports, module) {
		var comm = require('gdt:comm/comm.js');
		var helper = require('gdt:comm/helper.js');
		var bizconfig = require('gdt:comm/config.js');
		var datamanage = require('gdt:comm/data.js');
		var NMod = {};
		var callconf = {},
			queuenum = 0,
			callque = {},
			pidqnum = {};
		var wantedcallnum = 0,
			callingnum = 0,
			user_data_buffer = {},
			call_p_buffer = [],
			_tmp_user_data_buffer = {},
			timeout;
		NMod._getCallConf = function(pid) {
			return callconf[pid];
		};
		NMod._clearCallConf = function() {
			user_data_buffer = {};
			call_p_buffer = [];
			callingnum = 0;
			wantedcallnum = 0;
		};
		NMod._mload = function(list) {
			var _tmpcall_p_buf = call_p_buffer,
				_tmpcallnum = wantedcallnum,
				_tmpcallingnum = callingnum,
				_tmp_user_data_buffer = user_data_buffer;
			NMod._clearCallConf();
			var num = list.length;
			comm.each(list, function(v, k) {
				v.poscount = num;
				NMod._realload(v);
			});
			call_p_buffer = _tmpcall_p_buf;
			wantedcallnum = _tmpcallnum;
			callingnum = _tmpcallingnum;
			user_data_buffer = _tmp_user_data_buffer;
		};
		NMod._dealpos = function(pid, callback) {
			var conf = callconf[pid];
			if (conf && conf._dataret) {
				var pos = datamanage.getPosData(pid);
				if (pos) {
					pos.ret = true;
					callback(pos);
				} else {
					callback({
						'ret': false
					});
				}
			} else {
				comm.on('aftercomplete' + pid, callback);
			}
		};
		NMod.dataUrl = {
			get: function(plist, userdataList) {
				var len = plist.length,
					extkey, ext, arr;
				var req = {
					'adposcount': len,
					'posid': [],
					count: [],
					curpage: []
				};
				var extreq = {};
				var extpos = {};
				comm.each(plist, function(posid, posnum) {
					var ud = userdataList[posid] || {};
					arr = ['siteset', 'cur', 'adposcount', 'adid', 'adloc'];
					comm.each(arr, function(dv) {
						delete ud[dv];
					});
					req.posid.push(posid);
					req.count.push(ud.count || 1);
					delete ud.count;
					req.curpage.push(ud.req && ud.req.curpage || 0);
					comm.each(ud, function(uv, uk) {
						if (uk.substr(0, 2) == 'u_') {
							extkey = uk.substr(2);
							extreq[extkey] = uv;
							delete ud[uk];
						}
					});
					var movefield = function(field, toPath) {
							var param = ud[field];
							if (param) {
								comm.each(param, function(v, k) {
									!toPath[k] && (toPath[k] = v);
								});
								delete ud[field];
							}
						};
					movefield('req', req);
					movefield('common', extreq);
					if (ud.appid) {
						extreq.appid = ud.appid;
						req.appid = ud.appid;
						delete ud.appid;
					}
					extpos[posnum + ''] = ud;
				});
				comm.fire('gatherparams', {
					extreq: extreq,
					req: req
				});
				req.posid = req.posid.join('|');
				req.count = req.count.join('|');
				var tmpCurPage = req.curpage.join('|');
				delete req.curpage;
				if (/[1-9]/.test(tmpCurPage)) {
					req.curpage = tmpCurPage;
				}
				ext = {
					'req': extreq,
					'pos': extpos
				};
				req.ext = encodeURIComponent(comm.JSONToString(ext));
				req.qz_caller = "qzfl_jg";
				req._r = Math.ceil(Math.random() * 1000000);
				var url = bizconfig._burl + (comm.getObjectToStringFn('=', '&', false, false))(req);
				return url;
			}
		};
		NMod._get = function() {
			var args = Array.prototype.slice.call(arguments);
			var adapt = function(arg) {
					var conf = {};
					conf.posId = arg[0];
					conf.container = arg[1];
					conf.onComplete = arg[4];
					conf.context = arg[5];
					conf.count = conf.context && conf.context.count || 1;
					return conf;
				};
			if (comm.getType(args[0]) == 'array') {
				var req = [];
				comm.each(args[0], function(arg) {
					req.push(adapt(arg));
				});
				NMod._loadreq(req);
			} else {
				NMod._loadreq(adapt(args));
			}
		};
		NMod._load = function(poscnf) {
			NMod._loadreq(poscnf);
		};
		NMod._loadreq = function() {
			var args = Array.prototype.slice.call(arguments);
			setTimeout(function() {
				NMod._realload.apply(null, args);
			}, 0);
		};
		NMod._realload = function(poscnf) {
			var type, arg0 = arguments[0],
				appid, opts = opts || {},
				type = comm.getType(arg0);
			if (type == 'array') {
				NMod._mload(arg0);
				return;
			}
			var pid = poscnf.posId,
				container = poscnf.container,
				callback = poscnf.onComplete,
				user_data = poscnf.context || {};
			var conf = {
				'pid': pid,
				'container': container,
				'callback': callback,
				'opts': poscnf
			};
			user_data.count = poscnf.count || 1;
			callconf[pid] = conf;
			comm.fire('beforeload', {
				posId: pid
			});
			wantedcallnum = wantedcallnum || poscnf.poscount || 1;
			call_p_buffer.push(pid);
			pidqnum[pid] = queuenum;
			callingnum++;
			if (user_data) {
				appid = user_data.appid;
				user_data_buffer[pid] = user_data;
			}
			timeout = opts.timeout || timeout;
			if (wantedcallnum == callingnum || wantedcallnum == 1) {
				var data_url = NMod.dataUrl.get(call_p_buffer, user_data_buffer),
					brdata;
				brdata = {
					url: data_url,
					plist: call_p_buffer
				};
				comm.fire('beforerequest', brdata);
				data_url = brdata.url;
				var startTime = +new Date();
				var onerror = (function(calledlist, stTime) {
					return function(type, opts) {
						opts = opts || {};
						if (!calledlist) {
							return;
						}
						try {
							comm.each(calledlist, function(pid, k) {
								var conf = callconf[pid];
								callconf[pid] = null;
								NMod.dealcallback(pid, conf, {
									'ret': false
								});
							});
						} catch (e) {}
						if (NMod.onerror) {
							NMod.onerror(type, stTime, calledlist, opts);
						}
						calledlist = null;
					};
				})(call_p_buffer, startTime);
				callque[queuenum] = wantedcallnum;
				queuenum++;
				NMod._clearCallConf();
				var onsucc = (function(stTime) {
					return function(o) {
						try {
							NMod.reqcallback(o, onerror, stTime);
						} catch (e) {
							onerror(14);
						}
					};
				})(startTime),
					ecb, onTimeout;
				ecb = function(err) {
					onerror(51, {
						err: err
					});
				};
				onTimeout = function(err) {
					onerror(50, {
						err: err
					});
				};
				NMod.getter(data_url, onsucc, ecb, {
					timeout: timeout,
					onTimeout: onTimeout
				});
			}
			comm.fire('postget', conf, user_data);
		};
		NMod.getter = function(url, callback, ecb, opts) {
			require.async('gdt:comm/net.js', function(net) {
				net.getter(url, callback, ecb, opts);
			});
		};
		NMod.onerror = function(type, startTime, calledlist, opts) {
			helper.sendStat(type, startTime, calledlist, opts);
		};
		NMod.reqcallback = function(o, ecb, startTime) {
			var retcode;
			if (o && (o.ret == 0) && o.data) {
				comm.each(o.data, function(v, k) {
					var hasOrder = false,
						data = {};
					try {
						data.list = [];
						if (v.ret == 0) {
							hasOrder = true;
							retcode = 11;
							data.list = v.list || [v];
							data.cfg = data.list.cfg = v.cfg;
							v.html && (data.html = v.html);
							v.template && (data.template = v.template);
						} else {
							retcode = 12;
							data.cfg = {};
						}
						data.cfg.p = k;
						NMod.callback(data);
						helper.sendStat(retcode, startTime, [k]);
					} catch (e) {
						retcode = hasOrder ? 16 : 13;
						setTimeout(function() {
							NMod.onerror(retcode, startTime, [k]);
						}, 0);
						helper.reportReqErr(e, k, hasOrder);
					}
				});
			} else {
				if (o && o.ret) {
					retcode = (o.svr && o.svr.status) || o.rpt;
					retcode = retcode || 52;
					retcode = (retcode == 63) ? 15 : retcode;
				} else {
					retcode = 53;
				}
				ecb(retcode);
			}
		};
		NMod.callback = function(data) {
			var pconf = data.cfg;
			if (pconf.playcfg) {
				comm.mix(pconf, pconf.playcfg);
			}
			var pid = pconf.p;
			var qnum = pidqnum[pid];
			callque[qnum]--;
			var conf = callconf[pid];
			if (!conf) {
				return;
			}
			conf._dataret = true;
			if (data.list.length == 0) {
				NMod.dealcallback(pid, conf, {
					'ret': false
				});
				return;
			}
			datamanage.trimData(data.list, pconf);
			pconf.id = pid;
			pconf.container = conf.container;
			datamanage.init(pid, pconf, data.list);
			comm.fire('beforerender', {
				pid: pid,
				pconf: pconf,
				data: data.list,
				html: data.html,
				template: data.template
			});
			require.async('gdt:comm/render.js', function(renderer) {
				renderer.render(pid, function(ret) {
					var _self = arguments.callee;
					if (_self._runed) {
						return;
					}
					NMod.dealcallback(pid, conf, {
						ret: ret,
						data: data.list,
						cfg: pconf,
						html: data.html,
						template: data.template
					});
					_self._runed = true;
				});
			});
		};
		NMod.dealcallback = function(pid, conf, data) {
			var qnum = pidqnum[pid];
			if (callque[qnum] == 0) {
				require.async('gdt:comm/ping.js', function(ping) {
					ping.ping.flush();
				});
			}
			if (!conf) {
				return;
			}
			if (conf.callback) {
				conf.callback(data);
			}
			comm.fire('aftercomplete' + pid, data);
		};
		module.exports = NMod;
	});;
	GDTDefine('gdt:comm/net.js', function(require, exports, module) {
		var comm = require('gdt:comm/comm.js');
		var helper = require('gdt:comm/helper.js');
		var config = require('gdt:comm/config.js');
		var NMod = {};
		NMod.getter = function(url, callback, ecb, opts) {
			var timeout = 15000,
				opttimeout, mat, postail = 0;
			opts = opts || {};
			opttimeout = parseInt(opts.timeout, 10);
			if (opttimeout && opttimeout > 2500) {
				timeout = opttimeout;
			}
			url += '&charset=utf8&datafmt=jsonp';
			if (!opts.forcescript) {
				setTimeout(function() {
					NMod.xhrgetter(url, callback, ecb, {
						timeout: timeout,
						onTimeout: opts.onTimeout
					});
				}, 0);
				return;
			}
			NMod._normalgetter(url, callback, ecb, {
				timeout: timeout,
				onTimeout: opts.onTimeout
			});
		};
		NMod._normalgetter = function(url, callback, ecb, opts) {
			var charset = config.charset || 'GB2312',
				js1;
			var cb = config.cbname || '_bc';
			js1 = new comm.JSONGetter(url, null, null, charset);
			js1.timeout = opts.timeout;
			js1.onSuccess = callback;
			js1.onError = ecb;
			js1.onTimeout = opts.onTimeout;
			js1.send(cb);
		};
		var supportlv2 = (window.XMLHttpRequest) && ('withCredentials' in new XMLHttpRequest);
		NMod._ishostSupportxhr = function() {
			var h, arr, f = false;
			try {
				h = location.hostname;
				h = h.split('.').slice(-2).join('.');
				if (h === 'qq.com' || h === 'paipai.com' || h === 'gtimg.cn') {
					f = true;
				}
			} catch (ignore) {}
			return f;
		};
		NMod.xhrgetter = function(url, callback, ecb, opts) {
			var pid, gtk, domain = document.domain,
				usecors, valuestaturl = 'http://i.gdt.qq.com/view.fcg?xhr2';
			opts = opts || {};
			gtk = NMod._ishostSupportxhr() ? helper.genGTk() : '';
			if (supportlv2 && NMod._ishostSupportxhr()) {
				gtk && (url += '&g_tk=' + gtk);
				comm.xhr(url, function(obj) {
					NMod._decodexhrjson(obj.resp, callback, ecb);
				}, function(obj) {
					ecb(obj);
					if (obj && obj.exception && obj.status == 598) {
						helper.sendErrMsg(obj.exception, location.href + '&gxhr', '', {
							extra: "get xhr transport error",
							rate: 100
						});
					}
				}, opts);
				helper.valueStat(valuestaturl, 1, 11, 1, 500);
				return;
			}
			opts.forcescript = true;
			NMod._normalgetter(url, callback, ecb, opts);
			helper.valueStat(valuestaturl, 1, 12, 1, 500);
		};
		NMod._decodexhrjson = function(resp, callback, ecb) {
			var obj, respstr = resp;
			try {
				if (respstr.slice(0, 1) != '{') {
					respstr = respstr.substring(resp.indexOf('(') + 1, respstr.lastIndexOf(')'));
				}
				obj = eval('(' + (respstr) + ')');
			} catch (e) {
				var msg = 'json decode error';
				ecb({
					ret: 60,
					msg: msg,
					status: 60
				});
				helper.sendErrMsg(e, location.href + '&gxhr', '', {
					extra: msg,
					rate: 50,
					resp: resp
				});
			}
			obj && callback(obj);
		};
		module.exports = NMod;
	});;
	GDTDefine('gdt:comm/plugin.js', function(require, exports, module) {
		var comm = require('gdt:comm/comm.js');
		var helper = require('gdt:comm/helper.js');
		var config = require('gdt:comm/config.js');
		var click = require('gdt:comm/click.js');
		var datamanage = require('gdt:comm/data.js');
		var PMod = {};
		PMod._beforeclick = function(data) {
			var pid = data.pid,
				oid = data.oid,
				obj = data.obj;
			var d = datamanage.getOrderData(pid, oid),
				tmp;
			if (d && d.productid && (d.producttype == 4)) {
				helper.filterManage.set(d.productid);
			}
			if (d.bqqdeal) {
				helper.pingreq(d.orirl);
			}
			obj && click.ClickManage.click(pid, oid, {
				el: obj
			});
		};
		PMod._fixDataURL = function(data_url, plist) {
			require.async('gdt:comm/load.js', function(getter) {
				plist && comm.each(plist, function(pid) {
					var callconf = getter._getCallConf(pid);
					if (callconf && callconf.opts && callconf.opts.platform == 'mobile') {
						if (callconf.opts.tempContext && callconf.opts.tempContext.common && callconf.opts.tempContext.common.site_set == 25) {
							data_url = data_url.replace(config._burl, config._mbInnerUrl);
						} else {
							data_url = data_url.replace(config._burl, config._mburl);
						}
					}
				});
			});
			return data_url;
		};
		comm.on('gatherparams', function(data) {
			var extreq = data.extreq,
				req = data.req;
			var fl = helper.filterManage.get();
			if (fl && fl.length > 0) {
				var fapp = {
					'app': fl
				};
				extreq.filter = fapp;
			}
			var screen = window.screen;
			extreq.rst = screen.width + '*' + screen.height;
			var ENV = helper.ENV;
			if (typeof(extreq.hosttype) === 'undefined' && typeof(ENV.hosttype) != 'undefined') {
				extreq.hosttype = ENV.hosttype;
				extreq.hostver = ENV.hostver + '';
			}
			if (typeof(extreq.yellow) === 'undefined' && typeof(ENV.yellow) != 'undefined') {
				extreq.yellow = ENV.yellow;
			}
			var _gdtoid, _adid, _adloc, _urlparam = comm.getUrlParam;
			(_gdtoid = _urlparam('_gdtoid')) && (extreq.aid = _gdtoid);
			(_adid = _urlparam('adid')) && (req.adid = _adid);
			(_adloc = _urlparam('adloc')) && (req.adloc = _adloc);
			if (helper.getWebPSupport()) {
				extreq.webp = "1";
			}
		});
		comm.on('beforeclick', function(data) {
			PMod._beforeclick(data);
		});
		comm.on('afterclick', function(data) {
			var pid = data.pid,
				orderdata = data.orderdata;
			PMod.execLoadPlugin(pid, 'onClick', {
				posId: pid,
				orderdata: orderdata
			});
		});
		var httpsApptrace = function(url) {
				return url.replace("http://analy.qq.com/cgi-bin/apptrace", "https://h5.qzone.qq.com/proxy/domain/analy.qq.com/cgi-bin/apptrace")
			}
		comm.on('beforerender', function(data) {
			var pid = data.pid,
				pconf = data.pconf,
				orderdata = data.data;
			comm.each(orderdata, function(v, k) {
				var oid = v.cl;
				v._l = (click.isLink(v.rl)) ? v.rl : 'javascript:;';
				v.olink = click.getOrderLink(pid, oid);
				comm._isImageHttps && v.img && (v.img = comm.httpsUrl(v.img));
				comm._isHttps && v.apurl && (v.apurl = comm.httpsUrl(v.apurl));
				if (comm._isApptraceHttps) {
					v.apptrace && (v.apptrace = httpsApptrace(v.apptrace));
					v.appclick && (v.appclick = httpsApptrace(v.appclick));
				}
			});
			require.async('gdt:comm/ping.js', function(ping) {
				ping._gdtping(pid);
			});
		});
		comm.on('beforerequest', function(data) {
			var url = data.url,
				plist = data.plist;
			url = PMod._fixDataURL(url, plist);
			if (PMod.fixDataURL) {
				url = PMod.fixDataURL(url);
			}
			data.url = url;
			setTimeout(function() {
				require.async("gdt:mod/asynload.js", function(mod) {
					mod.init({
						url: url
					});
				});
			}, 100);
		});
		comm.on('beforeload', function(data) {
			var pid = data.posId;
			PMod.execLoadPlugin(pid, 'onBeforeLoad');
		});
		PMod.execLoadPlugin = function(pid, fn, data) {
			require.async('gdt:comm/load.js', function(getter) {
				var callconf = getter._getCallConf(pid);
				if (callconf && callconf.opts && callconf.opts[fn]) {
					callconf.opts[fn](data);
				}
			});
		};
		module.exports = PMod;
	});;
	GDTDefine('gdt:comm/render.js', function(require, exports, module) {
		var comm = require('gdt:comm/comm.js');
		var ping = require('gdt:comm/ping.js');
		var datamanage = require('gdt:comm/data.js');
		var RMod = {};
		var each = comm.each;
		RMod.render = function(pid, callback) {
			var pos = datamanage.getPosData(pid),
				type, d, hasCb = typeof(callback) == 'function';
			RMod.dealCfg(pos.cfg);
			type = pos.cfg.playmode;
			d = df.get(type);
			if (d) {
				d.render(pid, callback);
			} else {
				callback(true);
			}
		};
		RMod.dealCfg = function(pconf) {
			pconf.playmode = (pconf.playmod == 3) ? 'default' : 'npdata';
		};
		var _dclass = {};
		RMod.DisplayFactory = {
			reg: function(type, displayer) {
				_dclass[type] = displayer;
			},
			get: function(type) {
				return _dclass[type];
			}
		};
		var df = RMod.DisplayFactory;
		RMod.DisplayBase = {
			render: function(pid, cb) {
				var ret;
				this.preRender(pid);
				ret = this.doRender(pid, cb);
				return ret;
			},
			preRender: function() {},
			doRender: function() {}
		};
		var getExtendFun = function(superclass) {
				var _extend = function(o, type) {
						var kclass = comm.mix({}, superclass, o);
						df.reg(type, kclass);
					};
				return function(clist) {
					each(clist, _extend);
				};
			};
		RMod.setNoPingDisplayer = getExtendFun(RMod.DisplayBase);
		RMod.setNoPingDisplayer({
			'default': {
				doRender: function(pid, callback) {
					require.async('gdt:mod/defaultrender.js', function(defrender) {
						var h = defrender.renderHelper,
							pos = datamanage.getPosData(pid),
							data = pos.data,
							cfg = pos.cfg;
						cfg.pid = pid;
						h.render(cfg, data, callback);
					});
				}
			}
		});
		module.exports = RMod;
	});;
	GDTDefine('gdt:main.js', function(require, exports, module) {
		(function() {
			var comm = require('gdt:comm/comm.js');
			var helper = require('gdt:comm/helper.js');
			var bizconfig = require('gdt:comm/config.js');
			var datamanage = require('gdt:comm/data.js');
			var render = require('gdt:comm/render.js');
			var datagetter = require('gdt:comm/load.js');
			var ping = require('gdt:comm/ping.js');
			var click = require('gdt:comm/click.js');
			var plugin = require('gdt:comm/plugin.js');
			var proxy = require('gdt:comm/proxy.js');
			var snsmod = new proxy.Mshell('snsmod');
			snsmod.getResource = function() {
				var files;
				files = [
					['js', function(cb) {
						require.async('gdt:mod/sns.js', function(asyncmod) {
							cb(asyncmod);
						});
					}]
				];
				return files;
			};
			snsmod.mock('like', 'share', 'getPageLike', 'getFriendApp', 'getBqqExt', '_dealExt', 'loadExtrender', 'renderExt', 'bindPcpushhover', '_wrapnickname', '_trimnickname');
			var PollShell = new proxy.Mshell('Poller', {
				isMockClass: true
			});
			PollShell.getResource = function() {
				var files = [
					['js', function(cb) {
						require.async('gdt:mod/poller.js', function(asyncmod) {
							cb(asyncmod);
						});
					}]
				];
				return files;
			};
			PollShell.mockProto("play", 'pollPlay', "setCurPoll", "setFrame", "setCurrentState", "setFrame", "pause", "goon", "clear");
			var Poller = PollShell.getClass();
			comm.mix(GDT, comm);
			comm.mix(GDT, helper);
			comm.mix(GDT, bizconfig);
			comm.mix(GDT, datamanage);
			comm.mix(GDT, render);
			comm.mix(GDT, datagetter);
			comm.mix(GDT, ping);
			comm.mix(GDT, click);
			comm.mix(GDT, plugin);
			snsmod.extendMod(GDT);
			GDT.Poller = Poller;
		})();
	});

	function main(cb) {
		var protocal = !GDT._isJSHttps ? "http://" : "https://";
		require.setBaseUrl(protocal + 'qzonestyle.gtimg.cn/qzone/biz/gdt/display/modules');
		require.timeout = 20000;
		GDT.initComm && GDT.initComm();
		require.async("gdt:main.js", function() {
			cb && cb();
		});
	}
	GDT.initLib = main;
})();