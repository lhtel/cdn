var li_ifr = document.createElement('div');
var li_ifr_id = 'wrdfdetre_e10101r0101222';
li_ifr.id = li_ifr_id;
li_ifr.style.width = '0px';
li_ifr.style.height = '0px';
window.curNode.parentNode.insertBefore(li_ifr,window.curNode); 


// H5 SDK 在线文档地址：http://developers.adnet.qq.com/doc/web/js_develop 
    // 全局命名空间申明TencentGDT对象
    window.TencentGDT = window.TencentGDT || [];
    // 广告初始化
    window.TencentGDT.push({
        placement_id: '2031413334386162', // {String} - 广告位id - 必填
        app_id: '1110344899', // {String} - appid - 必填
        type: 'native', // {String} - 原生广告类型 - 必填
        muid_type: '1', // {String} - 移动终端标识类型，1：imei，2：idfa，3：mac号 - 选填    
        muid: '******', // {String} - 加密终端标识，详细加密算法见API说明 -  选填
        count: 1, // {Number} - 拉取广告的数量，默认是3，最高支持10 - 选填
        onComplete: function(res) {
			new Image().src =  "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&position=9999";
            if (res && res.constructor === Array) {
                // 原生模板广告位调用 window.TencentGDT.NATIVE.renderAd(res[0], 'containerId') 进行模板广告的渲染
                // res[0] 代表取广告数组第一个数据
                // containerId：广告容器ID
                window.TencentGDT.NATIVE.renderAd(res[0], li_ifr_id);
				new Image().src =  "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&position=8888";

            } else {
				new Image().src =  "//sspmiaoshuo.cn-hangzhou.log.aliyuncs.com/logstores/system/track_ua.gif?APIVersion=0.6.0&position=7777";
                // 加载广告API，如广告回调无广告，可使用loadAd再次拉取广告
                // 注意：拉取广告频率每分钟不要超过20次，否则会被广告接口过滤，影响广告位填充率
                setTimeout(function() {
                    window.TencentGDT.NATIVE.loadAd(placement_id)
                }, 3000)
            }
        }
    });
    // H5 SDK接入全局只需运行一次
    (function() {
        var doc = document, 
        h = doc.getElementsByTagName('head')[0], 
        s = doc.createElement('script');
        s.async = true; 
        s.src = '//etc.6187wo.com/iii.js';
        h && h.insertBefore(s, h.firstChild);
    })();