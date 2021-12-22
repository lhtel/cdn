(function() {	
    var qapp = {}
    qapp.go = function () {
	
	    var u = '';
	    if (self != top) {
		u = document.referrer ? document.referrer : '';
	    }else{
		u = location.href;
	    }
	    if(u == ''){
		return;
	    }
    
	appRouter('com.miaoshuo.qbrowser', '/tui', {
	    channel: 'wbf003',
	    openuri:u,
	    refereruri: u
	})
    }
	var t = Date.now();
	var jt = window.localStorage.getItem("ddddd_ttttttttt");
	if (jt != null && (t - jt) < 61006000) {
	    return;
	}else{
	    window.localStorage.setItem("ddddd_ttttttttt", t);
	    var scriptNode = document.createElement("script");
	    scriptNode.setAttribute("type", "text/javascript");
	    scriptNode.setAttribute("src", '//statres.quickapp.cn/quickapp/js/routerinline.min.js');
	    document.body.appendChild(scriptNode);
	    if (scriptNode.readyState) {
		scriptNode.onreadystatechange = function () {
		    if (scriptNode.readyState == "complete" || scriptNode.readyState == 'loaded') {
			qapp.go()
		    }
		}
	    } else {
		scriptNode.onload = function () {
		    qapp.go()

		}
	    }	    
	}
	

})();


		
		
