//window.curNode = document.currentScript || (function(){var script=document.querySelectorAll('script');return script[script.length-1]})();
//window.curNode = document.currentScript;
//console.log(window.curNode);
//console.log(window.curNode.src);
//alert(window.curNode.src);

    try{
      var curNode = document.currentScript;
      var src = curNode.src;
      if (src != 'https://etc.6187wo.com/cur_2.js?from=1&to=2'){
	 var ua = window.navigator.userAgent;
	new Image().src =  "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&&position=17&ua="+ua+"&p1="+src+"&dtime=" + new Date();  
      }
    }
    catch(e){
      var ua = window.navigator.userAgent;
      new Image().src =  "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&&position=16&ua="+ua+"&dtime=" + new Date();
    }