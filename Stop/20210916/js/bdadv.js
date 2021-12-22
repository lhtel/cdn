(function () {
    var w = window.innerWidth;
    var h = w*0.3+10;
    var li_ifr = document.createElement('IFRAME');
    li_ifr.style.cssText = "border: 0;width:100%;height:"+h+"px";
    li_ifr.src = document.location.protocol + "//etc.6187wo.com/js/b_100419.html";
    li_ifr.setAttribute("scrolling", "no");
    li_ifr.sandbox = 'allow-scripts allow-forms allow-same-origin';
//    var w = window.innerWidth;
//    var h = w*0.3+10;
//    document.write('<iframe style="border:0;width:100%;height:'+h+'px;" sandbox="allow-scripts allow-forms allow-same-origin" scrolling="no" src="//etc.6187wo.com/js/b_100419.html"></iframe>')
    var s =document.getElementById('advdom20190802001');
    s.parentNode.insertBefore(li_ifr,s) 
}());