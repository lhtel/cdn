function jumpurl(urlstr) {
        //window.location.href = urlstr;
 		/* if (self != top)
		{
		try{window.top.location.host}catch(exp){window.top.location = urlstr;}
		}
		else
		{
		window.location.href = urlstr;
		} */
		/* var t = self.frameElement;
		console.log(t);
		if(t && (t.tagName=="FRAME"||t.tagName=="IFRAME")){
		console.log(1);
		window.top.location = urlstr;
		}else{
		console.log(0);
		window.location = urlstr;
		} */
		/* try{top.location.host}catch(exp){
		top.location = urlstr;
		} */
		try{
		window.top.location.hostname;
		if (top.location.hostname != window.location.hostname)
			{
			top.location.href = urlstr;
			}
		else
			{
			window.location.href = urlstr;
			}
		}
		catch(e){
			top.location.href = urlstr;
		}
    }
	
	//jumpurl('http://www.baidu.com');
	
	jp('snssdk1128://detail?id=6567196240314895630&gd_label=click_schema_lx9');
	function jp(urlstr) {
	window.top.location.href = urlstr;
	    }