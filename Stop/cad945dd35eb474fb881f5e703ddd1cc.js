var is_load = false;
var ms_num = 0;
var is_load_ad = false;
var ms_ad_list = new Array();
var ms_w = 252 / 375 * parseFloat(window.screen.width);
function MiaoshuoAdFun(container_id){
    
    if (is_load === true){
	MiaoshuoAdRenderFun(container_id);
	return;
    }else{
	MiaoshuoAdRenderFun(container_id);
    }
  
//    var container_id_arr = window.MiaoshuoAD[0].container_id.split(',');
//    var container_id_arr_count = container_id_arr.length;
    window.TencentGDT = window.TencentGDT || [];
    var container_id_arr_count = 10;
    
    


    window.TencentGDT.push({
	    app_id: '1110546630',
	    placement_id: '3031632511021250',
	    type: 'native',
	    muid_type: '1',
	    muid: '******',
	    count: container_id_arr_count,
	    onComplete: function(res) {
		    is_load_ad = true;
		    if (res && res.constructor === Array) {
			ms_ad_list = res;
			MiaoshuoAdRenderFun(container_id);
		    } else {
			
		    }
		    
	    }
    });


    (function() {
	if (is_load === false){
	    is_load = true;
	    var doc = document,
	    h = doc.getElementsByTagName('head')[0],
	    s = doc.createElement('script');
	    s.async = true;
	    s.src = '//qzs.qq.com/qzone/biz/res/i.js';
	    h && h.insertBefore(s, h.firstChild);	    
	}

    })();    
}

function MiaoshuoAdRenderFun(container_id){
    if (is_load_ad === false && ms_num > 0){
	setTimeout(function() {
		var ll = ms_ad_list.length;
		if (ll > 0){
		    if (ms_num >= ll){
			var mod = ms_num%ll;
			window.TencentGDT.NATIVE.renderAd(ms_ad_list[mod], container_id);
		    }else{
			window.TencentGDT.NATIVE.renderAd(ms_ad_list[ms_num], container_id);
		    }
		}else{
		    document.getElementById(container_id).innerHTML = "<iframe scrolling='no' frameborder='0px' style='border: 0px; width: 100%; height: "+ms_w+"px;' src='https://etc.6187wo.com/fly.html'></iframe>";
		}
		ms_num++;                               
        }, 2000)
	return;
    }
    
    
 		var ll = ms_ad_list.length;
		if (ll > 0){
		    if (ms_num >= ll){
			var mod = ms_num%ll;
			window.TencentGDT.NATIVE.renderAd(ms_ad_list[mod], container_id);
		    }else{
			window.TencentGDT.NATIVE.renderAd(ms_ad_list[ms_num], container_id);
		    }
		}else{
		    document.getElementById(container_id).innerHTML = "<iframe scrolling='no' frameborder='0px' style='border: 0px; width: 100%; height: "+ms_w+"px;' src='https://etc.6187wo.com/fly.html'></iframe>";
		}
		ms_num++;          

}