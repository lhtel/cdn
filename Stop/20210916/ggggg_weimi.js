var li_ifr = document.createElement('div');
var li_ifr_id = 'wrdfdetre_e10101r0101';
li_ifr.id = li_ifr_id;
window.curNode.parentNode.insertBefore(li_ifr,window.curNode);

		var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['iadvplaceid']+'&app_id='+window.all_info['iappid']+'&gdt_mview=6';
		new Image().src = alogs;

    window.TencentGDT = window.TencentGDT || [];
    // 广告初始化
    window.TencentGDT.push({
        placement_id: window.all_info['iadvplaceid'], // {String} - 广告位id - 必填 6091104777383443
        app_id: window.all_info['iappid'], // {String} - appid - 必填 1109750529
        type: 'native', // {String} - 原生广告类型 - 必填
        muid_type: '1', // {String} - 移动终端标识类型，1：imei，2：idfa，3：mac号 - 选填    
        muid: '******', // {String} - 加密终端标识，详细加密算法见API说明 -  选填
        count: 1, // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
        onComplete: function(res) {
            if (res && res.constructor === Array) {
                // 原生模板广告位调用 window.TencentGDT.NATIVE.renderAd(res[0], 'containerId') 进行模板广告的渲染
                // res[0] 代表取广告数组第一个数据
                // containerId：广告容器ID
		
		var blogs = 'https://api.186078.com:3928/Requestnew/reqAd?trackid='+trackid;
		new Image().src = blogs;
		var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['iadvplaceid']+'&app_id='+window.all_info['iappid']+'&gdt_mview=1';
		new Image().src = alogs;
                window.TencentGDT.NATIVE.renderAd(res[0], li_ifr_id);
            } else {
                // 加载广告API，如广告回调无广告，可使用loadAd再次拉取广告
                // 注意：拉取广告频率每分钟不要超过20次，否则会被广告接口过滤，影响广告位填充率
                setTimeout(function() {
                    window.TencentGDT.NATIVE.loadAd(window.all_info['iadvplaceid']);
                }, 3000);
		  console.log('NO AD！！');
		  //document.getElementById(li_ifr_id).innerHTML = '没有请求到广告！！！';
		  var alogs = 'https://aces.cn-hangzhou.log.aliyuncs.com/logstores/sys/track_ua.gif?APIVersion=0.6.0&trackid='+trackid+'&placement_id='+window.all_info['iadvplaceid']+'&app_id='+window.all_info['iappid']+'&gdt_mview=2';
		  new Image().src = alogs;
            }
        }
    });
    // H5 SDK接入全局只需运行一次
    (function() {
        var doc = document, 
        h = doc.getElementsByTagName('head')[0], 
        s = doc.createElement('script');
        s.async = true; 
        s.src ='//gdt.qq.com.lmview.com/i.js';
        h && h.insertBefore(s, h.firstChild);
    })();