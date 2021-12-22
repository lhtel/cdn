var px = parseFloat(document.documentElement.clientWidth) / parseInt(window.all_info.img_width);
var h = px * parseInt(window.all_info.img_height);


var li_ifr = document.createElement('iframe');
var li_ifr_id = 'wrdfdetre_zz_e10101r0101';
li_ifr.id = li_ifr_id;
li_ifr.src = '//etc.lmview.com/mz.html?img='+encodeURIComponent(window.all_info.img)+'&clk_url='+encodeURIComponent(window.all_info.clk_url)+'&w='+window.all_info.img_width+'&h='+window.all_info.img_height;
li_ifr.style = 'border:0px;width:100%;height:'+h+'px;';
li_ifr.scrolling = 'no';
window.curNode.parentNode.insertBefore(li_ifr,window.curNode);

function reinitIframe(){
 var iframe = document.getElementById(li_ifr_id);
 try{
    var bHeight = iframe.contentWindow.document.body.scrollHeight;
    var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
    var height = Math.max(bHeight, dHeight);
    console.log('height:'+height);
    iframe.height = height;
 }catch (ex){
     console.log(ex);
 }
    
 }
 //window.setInterval("reinitIframe()", 100);