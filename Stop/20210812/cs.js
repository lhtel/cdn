function RndNum(n){
    var rnd="";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
    return rnd;
}
var iplatform = navigator.platform;
var ukey = String(RndNum(8));
var trackid = "88888";
new Image().src = "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&trackid=" + trackid + "&position=1&platform=" + iplatform + "&scriptukey=" + ukey + "&dtime=" + (+new Date());
var script = document.getElementsByTagName('script');
var thisNode = script[script.length-1];
var TencentGDT = TencentGDT || [];
var jsload = jsload || 0;
jsload++;
TencentGDT.push({
    jsload: jsload,
    stats : false,
    statsId:'19217173',
    AndPos : [{AppId:'4828',PosId:'6623'}],//4814#6587
    IosPos : [{AppId:'4828',PosId:'6623'}],
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
	b("//core.6187wo.com/js/hyhot.js", function() {
		window.GDTI && window.GDTI.hyhot && window.GDTI.hyhot(e, 1)
	});
	if ("undefined" == typeof window.scritpsrclink || !0 !== window.scritpsrclink) window.scritpsrclink = !0, b("//core.6187wo.com/js/core.js")
})(TencentGDT[jsload - 1]);
