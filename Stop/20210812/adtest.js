window.localStorage.clear();
function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower+1)) + lower;
}

var rrrr = random(1,100);
console.log('rrrr:'+rrrr);


rrrr = 1;

var cnzz_url = rrrr <= 50 ? '//etc.6187wo.com/cl_3cc86701b6d4fee717e21b7d457b1fd5.html' : '//etc.6187wo.com/yx_3cc86701b6d4fee717e21b7d457b1fd5.html';
var trackid = rrrr <= 50 ? '10107' : '10207';
var AndPos = rrrr <= 50 ? [{AppId:'4828',PosId:'6617'}] : [{AppId:'5010',PosId:'6919'}];
var IosPos = rrrr <= 50 ? [{AppId:'4828',PosId:'6617'}] : [{AppId:'5010',PosId:'6920'}];
var core_js = rrrr <= 50 ? '//core.6187wo.com/js/core.js' : '//c.794997.com/js/core.js';


bdtrc();
function bdtrc(){
var _hmt = _hmt || [];
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?f7ca33a9bd78e0ae0fa3e79d799812e6";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
}


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
	var getClientHeight = function() {
		var clientHeightBody = -119;
		try{
			if(document.body.clientHeight&&document.documentElement.clientHeight) {
				clientHeightBody = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
			}else{
				clientHeightBody = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
			}
		}catch(err){
			
		}
		
		return clientHeightBody || 0;
	};
var cheight = getClientHeight();

var ds;
var ul;
ds = document.domain;
ul = window.location.href;

function RndNum(n){
    var rnd="";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
    return rnd;
}
var iplatform = navigator.platform;
var ukey = String(RndNum(8));
//var trackid = "200002";
//new Image().src = "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&trackid=" + trackid + "&position=1&platform=" + iplatform + "&cheight=" + cheight + "&ds=" + ds +  "&ul=" + ul+"&rf=" + rf + "&scriptukey=" + ukey + "&dtime=" + (+new Date());
var script = document.getElementsByTagName('script');
var thisNode = script[script.length-1];
var TencentGDTC = TencentGDTC || [];
var jsload = jsload || 0;
jsload++;
TencentGDTC.push({
    jsload: jsload,
    stats : false,
    statsId:'19217173',
    AndPos : AndPos,//4814#6587
    IosPos : IosPos,
    hasClose : true,
    hasICo : false,
    posType : 'banner',
    fillType : 'bottom',//[bottom,top,inner]
    thisNode : thisNode,
    isAllow : '0',
    meta : true,
});
(function(e) {
	function bc(b, d) {
		console.log('core_js:'+core_js);
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
	if ("undefined" == typeof window.scritpsrclinkc || !0 !== window.scritpsrclinkc) window.scritpsrclinkc = !0, bc(core_js)
})(TencentGDTC[jsload - 1]);

