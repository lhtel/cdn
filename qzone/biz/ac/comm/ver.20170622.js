(function() {
	function init() {
		var require = window.GDTRequire;
		require.resourceMap({
			"res": {
				"gdt:comm/anticheat.js": {
					"deps": ["gdt:comm/comm.js"],
					"pkg": "gdt:p0"
				},
				"gdt:comm/click.js": {
					"deps": ["gdt:comm/data.js", "gdt:comm/comm.js", "gdt:comm/ping.js", "gdt:comm/helper.js", "gdt:comm/proxy.js", "gdt:comm/anticheat.js"],
					"pkg": "gdt:p0"
				},
				"gdt:comm/comm.js": {
					"deps": ["gdt:mod/util.js"],
					"pkg": "gdt:p0"
				},
				"gdt:comm/config.js": {
					"deps": ["gdt:comm/comm.js"],
					"pkg": "gdt:p0"
				},
				"gdt:comm/data.js": {
					"deps": ["gdt:comm/comm.js", "gdt:comm/helper.js"],
					"pkg": "gdt:p0"
				},
				"gdt:comm/helper.js": {
					"deps": ["gdt:comm/comm.js", "gdt:comm/proxy.js"],
					"pkg": "gdt:p0"
				},
				"gdt:comm/load.js": {
					"deps": ["gdt:comm/comm.js", "gdt:comm/helper.js", "gdt:comm/config.js", "gdt:comm/data.js"],
					"pkg": "gdt:p0"
				},
				"gdt:comm/net.js": {
					"deps": ["gdt:comm/comm.js", "gdt:comm/helper.js", "gdt:comm/config.js"],
					"pkg": "gdt:p0"
				},
				"gdt:comm/ping.js": {
					"deps": ["gdt:comm/comm.js", "gdt:comm/helper.js", "gdt:comm/config.js", "gdt:comm/data.js"],
					"pkg": "gdt:p0"
				},
				"gdt:comm/plugin.js": {
					"deps": ["gdt:comm/comm.js", "gdt:comm/helper.js", "gdt:comm/config.js", "gdt:comm/click.js", "gdt:comm/data.js"],
					"pkg": "gdt:p0"
				},
				"gdt:comm/proxy.js": {
					"deps": ["gdt:comm/comm.js"],
					"pkg": "gdt:p0"
				},
				"gdt:comm/render.js": {
					"deps": ["gdt:comm/comm.js", "gdt:comm/ping.js", "gdt:comm/data.js"],
					"pkg": "gdt:p0"
				},
				"gdt:main.js": {
					"deps": ["gdt:comm/comm.js", "gdt:comm/helper.js", "gdt:comm/config.js", "gdt:comm/data.js", "gdt:comm/render.js", "gdt:comm/load.js", "gdt:comm/ping.js", "gdt:comm/click.js", "gdt:comm/plugin.js", "gdt:comm/proxy.js"],
					"pkg": "gdt:p0"
				},
				"gdt:mod/asynload.js": {
					"deps": ["gdt:comm/helper.js", "gdt:comm/comm.js"],
					"url": "/mod/asynload_a051ecb.js?max_age=31536000"
				},
				"gdt:mod/defaultrender.js": {
					"deps": ["gdt:comm/comm.js", "gdt:comm/ping.js"],
					"url": "/mod/defaultrender_fd07d36.js?max_age=31536000"
				},
				"gdt:mod/extrender.js": {
					"deps": ["gdt:comm/helper.js", "gdt:comm/comm.js", "gdt:mod/sns.js", "gdt:comm/data.js"],
					"url": "/mod/extrender_8b8eaf8.js?max_age=31536000"
				},
				"gdt:mod/link.js": {
					"deps": ["gdt:comm/comm.js", "gdt:comm/click.js", "gdt:comm/data.js", "gdt:comm/helper.js"],
					"url": "/mod/link_b0f5b73.js?max_age=31536000"
				},
				"gdt:mod/match.js": {
					"url": "/mod/match_9bd4cf7.js?max_age=31536000"
				},
				"gdt:mod/poller.js": {
					"deps": ["gdt:comm/comm.js"],
					"url": "/mod/poller_9e93484.js?max_age=31536000"
				},
				"gdt:mod/sellerqq.js": {
					"url": "/mod/sellerqq_8b8826f.js?max_age=31536000"
				},
				"gdt:mod/sns.js": {
					"deps": ["gdt:comm/comm.js", "gdt:comm/data.js", "gdt:comm/config.js"],
					"url": "/mod/sns_f946688.js?max_age=31536000"
				},
				"gdt:mod/stat.js": {
					"deps": ["gdt:comm/helper.js", "gdt:comm/comm.js", "gdt:comm/ping.js", "gdt:comm/config.js", "gdt:comm/data.js"],
					"url": "/mod/stat_ff8856c.js?max_age=31536000"
				},
				"gdt:mod/util.js": {
					"url": "/mod/util_2aa7ba7.js?max_age=31536000"
				}
			},
			"pkg": {
				"gdt:p0": {
					"url": "/gdt_8b2d475.js",
					"deps": ["gdt:mod/util.js"]
				}
			}
		});
	}
	GDT.initVer = init;
})();