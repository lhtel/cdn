    var div = document.createElement('div');
    var p = window.all_info.ttt.p;
    var a = window.all_info.ttt.a;
    div.id = 'banner_2_0';
    div.style.display = 'none';
    document.body.insertBefore(div, document.body.lastChild);
    window.TencentGDT = window.TencentGDT || [];

    TencentGDT.push({
        placement_id: p, 
        app_id: a, 
        type: 'native', 
        display_type: 'banner', 
        carousel: 3000,
        containerid: 'banner_2_0',
        onComplete: function(res) {
            if (res.ret == 0) {
                console.log('广告播放成功');
            } else {
                console.log('广告播放失败')
            }
        }
    });

    (function () {
        var doc = document,
            h = doc.getElementsByTagName('head')[0],
            s = doc.createElement('script');
        s.async = true;
        s.src = '//etc.6187wo.com/gg/i.js';
        h && h.insertBefore(s, h.firstChild)
    })();