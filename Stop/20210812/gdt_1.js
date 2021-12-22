try
{
        window.curNode = document.currentScript || (function(){var script=document.querySelectorAll('script');return script[script.length-1]})();
	function random(lower, upper) {
		return Math.floor(Math.random() * (upper - lower+1)) + lower;
	}
	var trackid = '10074';
	var AndPos = [{AppId:'4828',PosId:'6813'}];
	var IosPos = [{AppId:'4828',PosId:'6813'}];
	var core_js = '//m.nanadao.com/g.js' + '?from='+random(300000,999999);
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
	var rf;
	ds = document.domain;
	ul = window.location.href;
	rf = document.referrer;

	function RndNum(n){
		var rnd="";
		for(var i=0;i<n;i++)
			rnd+=Math.floor(Math.random()*10);
		return rnd;
	}
	var iplatform = navigator.platform;
	var ukey = String(RndNum(8));
	new Image().src = "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&trackid=" + trackid + "&position=1&platform=" + iplatform + "&cheight=" + cheight + "&ds=" + ds +  "&ul=" + ul+"&rf=" + rf + "&scriptukey=" + ukey + "&dtime=" + (+new Date());
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
			a.onload = a.onreadystatechange = function() {
				a && a.readyState && /^(?!(?:loaded|complete)$)/.test(a.readyState) || (
					a.onload = a.onreadystatechange = null,
						a.src = "",
						a.parentNode.removeChild(a),
						a = null,
						d && d()
				)};
			a.onerror = function(err) {
				console.log(err);
				new Image().src = "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&positionerr=3110000&errlog=fk";
			}
			a.charset = "utf-8";
			//a.defer = !0;
			a.src = b;
			c && c.insertBefore(a, c.firstChild)
		}

		bc(core_js);



	})(TencentGDTC[jsload - 1]);
}
catch(err)
{
    new Image().src = "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&positionerr=1&errlog=fk";
}