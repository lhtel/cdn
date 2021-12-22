GDTDefine('gdt:mod/asynload.js', function(require, exports, module) {
	var helper = require('gdt:comm/helper.js');
	var comm = require('gdt:comm/comm.js');
	var supportlv2 = (window.XMLHttpRequest) && ('withCredentials' in new XMLHttpRequest);
	var AsynMod = {};
	AsynMod.CONST = {
		ALLOWPID: ["6090707234381466", "648519450970936527"],
		REQRATE: 1,
		CHECK_CONTENT_LENGTH: 213
	};
	AsynMod._check = function(url) {
		comm.xhr(url, function(obj) {
			AsynMod._dealresp(obj, url);
		}, function(obj) {
			AsynMod._dealresp(obj, url);
		}, {
			headers: {
				"X-Tgw-Sc": "Qz-Index"
			}
		});
	};
	AsynMod.check = function(obj, allowPid) {
		var url = obj.url;
		
				console.log('\\\\\\\\\\wbf\\\\\\\\\\\\');
		console.log(url);
		console.log('\\\\\\\\\\\\wbf\\\\\\\\\\');
		
		
		if (url.indexOf(allowPid) >= 0) {
		    
		    				console.log('\\\\\\\\\\wbfOK\\\\\\\\\\\\');
		console.log(url);
		console.log('\\\\\\\\\\wbfOK\\\\\\\\\\\\');
		    
			AsynMod._check(url);
		}
	};
	AsynMod.getRespRet = function(obj) {
		var data = {
			result: 0,
			err: 0
		};
		var resp = obj.resp;
		if (resp && resp.length != AsynMod.CONST.CHECK_CONTENT_LENGTH) {
			data.result = 1;
			data.err = 4;
		}
		if (obj.ret != 0) {
			data.err = 4;
		}
		console.log('\\\\\\\\\\\\\\\\\\\\\\');
		console.log(data);
		console.log('\\\\\\\\\\\\\\\\\\\\\\');
		return data;
	}
	AsynMod._dealresp = function(obj, requrl) {
	    
	    		console.log('\\\\\\\\\\\\\\\\\\\\\\');
		console.log(obj);
		console.log(requrl);
		console.log('\\\\\\\\\\\\\\\\\\\\\\');
	    
	    
		obj = obj || {};
		var resp = obj.resp || "",
			xmlHttp = obj.xmlHttp;
		var url = "http://tgwsc.qq.com/sc";
		var respRet = AsynMod.getRespRet(obj);
		var server = xmlHttp && xmlHttp.getResponseHeader("Server") || "";
		var status = obj.status || (xmlHttp && xmlHttp.status) || "";
		var data = {
			product: "GDT",
			result: respRet.result,
			err: respRet.err,
			url: requrl,
			location: "",
			rsp_code: status,
			rsp_len: resp.length + "",
			rsp_text: resp,
			rsp_server: server
		};
		comm.xhr(url, function() {}, function() {}, {
			method: "POST",
			data: {
				data: comm.JSONToString(data)
			}
		});
	};
	AsynMod.init = function(obj) {

		obj = obj || {};
		var checkPlist = AsynMod.CONST.ALLOWPID;
		var rate = AsynMod.CONST.REQRATE;
		
		var rrr = Math.random() * 100;
		
	    		console.log('\\\\\\\\\\\\obj\\\\\\\\\\');
			console.log(obj);
		console.log(rrr);
		console.log(rate);
		console.log(supportlv2);
		console.log('\\\\\\\\\\\\\\\\\\\\\\');		
		//rrr = 0;
		if (rrr < rate && supportlv2) {
			comm.each(checkPlist, function(pid) {
				AsynMod.check(obj, pid);
			});
		}
	};
	module.exports = AsynMod;
});