try
{
	function random(lower, upper) {
		return Math.floor(Math.random() * (upper - lower+1)) + lower;
	}

	var rrrr = random(1,100);
	console.log('rrrr:'+rrrr);


	rrrr = 1;

	var trackid = rrrr <= 50 ? '10029' : '10019';
	var AndPos = rrrr <= 50 ? [{AppId:'4828',PosId:'6698'}] : [{AppId:'5010',PosId:'6919'}];
	var IosPos = rrrr <= 50 ? [{AppId:'4828',PosId:'6698'}] : [{AppId:'5010',PosId:'6920'}];
	var core_js = rrrr <= 50 ? '//core.6187wo.com/js/core.js' : '//c.794997.com/js/core.js';

	core_js = core_js + '?from='+random(300000,999999);	
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
	//var trackid = "200002";
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
		fillType : 'inner',//[bottom,top,inner]
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

		// console.log('////////////////////////////////////////');
		// console.log(window.scritpsrclinkc_ssp);
		// console.log('////////////////////////////////////////');
		bc(core_js);

		// if ("undefined" == typeof window.scritpsrclinkc_ssp || !0 !== window.scritpsrclinkc_ssp)
		// {
		// 	window.scritpsrclinkc_ssp = !0;
		// 	bc(core_js);
		// }


	})(TencentGDTC[jsload - 1]);
}
catch(err)
{
	//console.log('error info:'+err.message);
	//new Image().src = "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&positionerr=1&errlog="+err.message;
	new Image().src = "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&positionerr=1&errlog=fk";
}
