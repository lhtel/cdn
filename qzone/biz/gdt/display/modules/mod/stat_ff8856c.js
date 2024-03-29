GDTDefine('gdt:mod/stat.js', function(require, exports, module) {
	var helper = require('gdt:comm/helper.js');
	var comm = require('gdt:comm/comm.js');
	var ping = require('gdt:comm/ping.js');
	var config = require('gdt:comm/config.js');
	var datamanage = require('gdt:comm/data.js');
	var StatMod = {};
	var emsgnum = 0;
	StatMod.sendErrMsg = function(e, url, pid, opt) {
		var data, browserinfo, map, callerinfo = '',
			tmp, msg = e.message,
			stack = e.stack,
			extra, hasOrder, orderdesc = '',
			charleft = 8;
		opt = opt || {};
		extra = opt.extra;
		hasOrder = opt.hasOrder;
		if (opt.rate) {
			if (!(Math.random() < 1 / opt.rate)) {
				return;
			}
		}
		map = {
			chrome: 11,
			firefox: 12,
			ie: 13,
			opera: 14,
			safari: 15
		};
		browserinfo = helper.getbrowserInfo(map);
		orderdesc = hasOrder ? 'hasorder' : 'noorder';
		data = {
			dataId: 1000058,
			bid: 20,
			url: comm.string.cut(url, 128 - charleft),
			lineNo: 0,
			browser: browserinfo.broswer,
			errMsg: [pid, orderdesc, msg, navigator.userAgent]
		};
		if ( !! stack) {
			stack = stack.split(/\n\s*at\s*/).slice(0, 3).join(' ◆ ');
			data.errMsg.push(stack);
		}
		data.errMsg.push(extra);
		data.errMsg = comm.string.cut('【' + data.errMsg.join(' 】 【 ') + '】', 1024 - charleft);
		setTimeout(function() {
			if (extra && comm.TCISD) {
				var opts = {
					referURL: 'http://qzone.com/appinfo',
					referDomain: 'qzone.com',
					referPath: '/appinfo'
				},
					emsg = comm.string.cut('/' + ([pid, msg, stack]).join('').replace(/["\/:]/g, ''), 256);
				comm.TCISD.pv('gdt.qq.com', emsg, opts);
			}
		}, 0);
		if (!comm._isHttps) {
			var cgi = 'http://s.isdspeed.qq.com/cgi-bin/s.fcg';
			StatMod._postdata(cgi, data);
		}
		if (!comm._isHttps && opt.resp) {
			var errcgi = 'http://i.gdt.qq.com/report_json.fcg';
			var errMsg = [url, msg, navigator.userAgent, opt.resp];
			StatMod._postdata(errcgi, {
				jsondata: '【' + errMsg.join('】 【') + '】'
			});
		}
	};
	StatMod._postdata = function(url, data) {
		var FormSender, _sender;
		if (comm.fp && comm.fp.QZFL && (FormSender = comm.fp.QZFL.FormSender)) {
			_sender = new FormSender(url, 'post', data, 'utf-8');
			_sender.send();
		} else {
			emsgnum++;
			var frameId = '_GDT_POST_SENDER_' + emsgnum,
				cntid = "_GDT_SENDER_" + emsgnum,
				doc = document,
				wrapFrm, frameEl, formEl, df, tmp, elist, loaded = false;
			wrapFrm = doc.createElement('div');
			wrapFrm.id = cntid;
			wrapFrm.style.display = 'none';
			wrapFrm.innerHTML = '<iframe id="' + frameId + '" name="' + frameId + '" onload="" width="1px" height="1px" style="display:none"></iframe>';
			formEl = doc.createElement('form');
			formEl.method = 'post';
			formEl.target = frameId;
			formEl.style.cssText = 'display:none';
			doc.body.appendChild(wrapFrm);
			wrapFrm.appendChild(formEl);
			var clear = (function(cntid, doc) {
				return function() {
					var cnt = doc.getElementById(cntid);
					cnt.parentNode.removeChild(cnt);
				};
			})(cntid, doc);
			frameEl = doc.getElementById(frameId);
			if (frameEl.attachEvent) {
				frameEl.attachEvent("onload", function() {
					clear();
				});
			} else {
				frameEl.onload = function() {
					clear();
				};
			}
			df = doc.createDocumentFragment();
			for (var k in data) {
				tmp = doc.createElement('input');
				tmp.name = k;
				tmp.type = 'hidden';
				tmp.value = data[k];
				df.appendChild(tmp);
			}
			formEl.appendChild(df);
			formEl.action = url;
			try {
				formEl.submit();
			} catch (e) {}
			formEl = frameEl = null;
		}
	};
	StatMod.sendStat = function(errcode, startTime, calledlist, opts) {
		var duration, clen = calledlist.length,
			isKP = false,
			statId, commStated = false,
			commStatId = 400350;
		opts = opts || {};
		if (calledlist.length > 0) {
			comm.each(calledlist, function(v, k) {
				_send(v);
			});
		}

		function _send(pid) {
			var ecode = 0,
				succode = 1,
				url, urlext, rate = 1,
				errstatus;
			ecode = errcode;
			errstatus = opts.err && opts.err.status;
			if (typeof errstatus != 'undefined') {
				var map = {
					chrome: 1000,
					firefox: 2000,
					ie: 3000,
					opera: 4000,
					safari: 5000
				},
					binfo, bcode;
				binfo = helper.getbrowserInfo(map);
				bcode = binfo.btype;
				bcode && (ecode = (bcode + errstatus));
			}
			succode = (ecode == 50 || ecode == 51 || ecode > 100) ? 2 : succode;
			succode = (ecode == 12 || (ecode > 51 && ecode <= 100)) ? 3 : succode;
			succode = ((ecode + '').length == 4 && (ecode + '').slice(1) === '000') ? 3 : succode;
			rate = (succode === 1) ? 1000 : 100;
			duration = (+new Date()) - startTime;
			urlext = '?' + pid;
			url = config._burl;
			helper.valueStat(url, succode, ecode, duration, rate, {
				urlext: urlext
			});
			if (succode != 2) {
				urlext = '?qzfl';
				helper.valueStat(url, succode, ecode, duration, rate, {
					urlext: urlext
				});
			}
		}
	};
	StatMod.reportReqErr = function(e, pid, hasOrder) {
		try {
			var r = ( !! e.stack ? 500 : 1000),
				extra = '',
				url = '';
			try {
				url = location.href;
			} catch (exi) {
				url = 'location access deny';
			}
			r = Math.random() * r;
			if (r < 1 || config._full_stat) {
				StatMod.sendErrMsg(e, url, pid, {
					extra: extra,
					hasOrder: hasOrder
				});
			}
		} catch (ex) {
			pgvOrder("execcallback", "callbackerr");
		}
	};
	StatMod.closeOrder = function(pid, oid) {
		var d = datamanage.getOrderData(pid, oid);
		if (d && d.closeurl) {
			helper.pingreq(d.closeurl);
		}
	};

	function pgvOrder(n, d) {
		var opts = {
			referURL: 'http://user.qzone.qq.com/inforcenter',
			referDomain: 'user.qzone.qq.com',
			referPath: '/inforcenter'
		};
		comm.TCISD && TCISD.pv('gdt.qq.com', '/ic_qbs/' + d + '_' + n, opts);
	}
	StatMod.pgvOrder = pgvOrder;
	(function(q) {
		var commurl = 'http://c.isdspeed.qq.com/code.cgi',
			httpsCommUrl = 'https://huatuocode.weiyun.com/code.cgi',
			collector = [],
			timer, duration = 1000;

		function valueStat(domain, cgi, type, code, time, rate, exts) {
			var param = [],
				uin = comm.cookie.get('uin');
			if (uin) {
				uin = parseInt(uin.replace('o', ''), 10);
				param.push('uin=' + uin);
			}
			param.push('key=' + 'domain,cgi,type,code,time,rate', 'r=' + Math.random());
			if (typeof exts.unshift == 'function') {
				var i = 0;
				while (exts.length) {
					if (param.join('&').length > 1000) {
						break;
					}
					var c = exts.shift();
					param.push([i + 1, 1].join('_') + '=' + c[0]);
					param.push([i + 1, 2].join('_') + '=' + c[1]);
					param.push([i + 1, 3].join('_') + '=' + c[2]);
					param.push([i + 1, 4].join('_') + '=' + c[3]);
					param.push([i + 1, 5].join('_') + '=' + c[4]);
					param.push([i + 1, 6].join('_') + '=' + c[5]);
					i++;
				}
			}
			if (i > 0) {
				var urlHeader = !comm._isPageHttps ? commurl : httpsCommUrl;
				helper.pingreq(urlHeader + '?' + param.join('&'), 1000);
			}
		}
		var urlParse = /^http(s?):\/\/([\s\S]*?)(\/[\s\S]*?)(?:\?|$)/;
		q.parseUrl = function(req) {
			var mtch, url, domain, isHttps = false;
			req = req || "";
			mtch = req.match(urlParse);
			if (mtch) {
				url = mtch[3];
				domain = mtch[2];
				isHttps = !! mtch[1];
			}
			return [domain, url, isHttps];
		};
		q.valueStat = function(req, type, code, time, rate, conf) {
			var pUrl, domain, url;
			req = req || "";
			pUrl = q.parseUrl(req)
			conf = conf || {};
			domain = pUrl[0];
			url = pUrl[1];
			if (!domain || !url) {
				return;
			}
			conf.urlext && (url += conf.urlext);
			pUrl[2] && (url += "_https");
			_valueStat(domain, url, type, code, time, rate);
		};

		function _valueStat(domain, cgi, type, code, time, rate) {
			if (Math.random() < 1 / rate) {
				collector.push([domain, cgi, type, code, time, rate]);
			}
		};

		function _r() {
			if (collector.length) {
				valueStat('', '', '', '', '', '', collector);
			}
			timer = setTimeout(_r, duration);
			duration *= 1.1;
		}
		_r();
	})(StatMod);
	module.exports = StatMod;
});