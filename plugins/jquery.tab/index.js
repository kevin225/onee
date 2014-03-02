/**
 * Plugin - jQuery.fn.tab
 * 简单tab栏目切换组件
 * 配置 : 
 *      1.通过tab容器ID来初始化整个tab功能
 *      2.分别为控制节点以及内容节点增加 tab-navi / tab-content 属性
 *      3.当前控制节点将会默认添加activetab类
 * 用法 : $("#TabModule").tab()
 * API : @param [Number] def 初始化显示的节点，由0开始，默认为0
 *       @param [String] defClass 当前控制节点样式类，默认"activetab"
 *       @param [Array] fns 各栏目切换事件集合
 */
!function () {
	
	if ( !jQuery || jQuery.fn.tab ) return;
	
	jQuery.fn.extend({
		tab : function (def, defClass, fns) {

			var _typeOfDef = typeof def;
			var _typeOfClass = typeof defClass;
			var _current = _typeOfDef == "number" ? def : 0;
			var _class   = _typeOfClass == "string" ? defClass : (_typeOfDef == "string" ? def : "activetab");
			var _fns =  fns ||
						_typeOfClass == "object" && defClass ||
						_typeOfDef && def ||
						[];

			var _navi    = this.find("*[tab-navi]");
			var _cont    = this.find("*[tab-content]");

			this.on("click", "*[tab-navi]", function () {
				
				var index = _navi.index(this);

				if ( index != _current ) {

					var currfns = _fns[index];
					var prefns = _fns[_current];
					// 初始化回调
					if ( !this.tab_init ) {
						currfns && currfns.init && currfns.init();
						this.tab_init = !!1
					}
					// 触发当显示
					currfns && currfns.onshow && currfns.onshow();
					// 触发当隐藏
					prefns && prefns.onhide && prefns.onhide();
					
					_navi.eq(_current).removeClass(_class);
					_cont.eq(_current).css("display", "none");
					
					_navi.eq(index).addClass(_class);
					_cont.eq(index).css("display", "block");
					
					_current = index;
				}

			});
			
			// initialize
			var initFns = _fns[_current];
			// 初始化回调
			initFns && initFns.init && initFns.init();
			// 触发当显示
			initFns && initFns.onshow && initFns.onshow();

			_cont
				// hide all
				.css("display", "none")
				// show current
				.eq(_current).css("display", "block")
				// set current status to "init"
				.get(0).tab_init = !!1;
			
			_navi
				.removeClass(_class)
				.eq(_current).addClass(_class);
		}
	});
	
}();