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
    var base = ws + "Base/";
    var Plugin = ws + "Plugin/";
    var sizzle = base + "Sizzle/Sizzle.js";
    var jquery = base + "jQuery/jquery.js";
    var Tween = base + "Tween/Tween.js";
    var RequestAnimationFrame = base + "Tween/RequestAnimationFrame.js";
    var dom = base + "onee.dom/dom.js";
    var ajax = base + "onee.ajax/ajax.js";
	
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
			Plugin + "onee.TmplM/index.js"
		],
		"onee.form" : [
			[sizzle, ajax],
			Plugin + "onee.form/index.js"
		],
		"onee.Powin" : [
			sizzle,
			dom,
			ajax,
			[
                Plugin + "onee.Powin/index.js",
                Plugin + "onee.Powin/powin-style.css"
            ]
		],
		"onee.swf" : [
			sizzle,
			dom,
			Plugin + "onee.swf/index.js"
		],
        "onee.scrollpx" : [
            sizzle,
            dom,
            Plugin + "onee.scrollpx/index.js"
        ],
        "onee.scrollitem" : [
            [
                RequestAnimationFrame,
                Tween,
                sizzle
            ],
            dom,
            Plugin + "onee.scrollitem/index.js"
        ],
        "onee.scrollanimation" : [
            [
                RequestAnimationFrame,
                Tween,
                sizzle
            ],
            dom,
            Plugin + "onee.scrollitem/index.js",
            Plugin + "onee.scrollanimation/index.js"
        ],
		"jquery.tab" : [
			jquery,
			Plugin + "jQuery.tab/Tab.js"
		],
        "slipjs" : [
            sizzle,
            dom,
            Plugin + "mobile.slipjs/index.js"
        ]

	};

} ();
