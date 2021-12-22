(function() {
    var t = document.body.clientWidth / 320 || 1;
    var hhhhh = t * 60 > 60 ? 60 : t * 60;
    var li_ifr = document.createElement('IFRAME');
    var trackid = typeof(window.trackid) != 'undefined' ? window.trackid : 1;
    li_ifr.src = document.location.protocol + "//etc.6187wo.com/g/tf.html#web_id="+web_id+"#trackid="+trackid;
    li_ifr.setAttribute("scrolling", "no");
    li_ifr.height = hhhhh + 'px';  
    li_ifr.style.cssText = "border: 0;width: 100%;";
    //console.log(window.curNode.parentNode);
    window.curNode.parentNode.insertBefore(li_ifr,window.curNode);
}());
