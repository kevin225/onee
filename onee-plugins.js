;!function () {

	if ( !onee ) return console && console.log && console.log("Base on onee.js");
	
	// is exist
	if ( onee.plugins ) return;
	
	// 内置驱动/组件
	// 说明：
	// 基础目录 - Base/
	// 组件目录 - Plugins/
	// 键 - 目录名
	// 值 - 需要加载的文件，具体与onee.inc接口一致


    var ws = onee.workspace;
    // var base = ws + "Base/";
    var plugins = ws + "plugins/";
    var sizzle = "Sizzle/Sizzle.js";
    var jquery = "jquery/jquery.js";
    var Tween = "Tween/Tween.js";
    var RequestAnimationFrame = "Tween/RequestAnimationFrame.js";
    var dom = "onee-dom.js";
    var ajax = "onee-ajax.js";
	
	onee.plugins = {

		// Driver
		"sizzle" : [
			sizzle
		],
		"jquery" : [
			jquery
		],
        "Tween" : [
            RequestAnimationFrame,
            Tween
        ],
		"onee.dom" : [
			sizzle,
			dom
		],
		"onee.ajax" : [
			ajax
		],

		// Plugin
		"onee.TmplM" : [
			ajax,
			plugins + "onee.TmplM/index.js"
		],
		"onee.form" : [
			[sizzle, ajax],
			plugins + "onee.form/index.js"
		],
		"onee.Powin" : [
			sizzle,
			dom,
			ajax,
			[
                plugins + "onee.Powin/index.js",
                plugins + "onee.Powin/powin-style.css"
            ]
		],
		"onee.swf" : [
			sizzle,
			dom,
			plugins + "onee.swf/index.js"
		],
        "onee.scrollpx" : [
            sizzle,
            dom,
            plugins + "onee.scrollpx/index.js"
        ],
        "onee.scrollitem" : [
            [
                RequestAnimationFrame,
                Tween,
                sizzle
            ],
            dom,
            plugins + "onee.scrollitem/index.js"
        ],
        "onee.scrollanimation" : [
            [
                RequestAnimationFrame,
                Tween,
                sizzle
            ],
            dom,
            plugins + "onee.scrollitem/index.js",
            plugins + "onee.scrollanimation/index.js"
        ],
		"jquery.tab" : [
			jquery,
			plugins + "jquery.tab/index.js"
		],
        "slipjs" : [
            sizzle,
            dom,
            plugins + "onee.mobile.slipjs/index.js"
        ]

	};

} ();
