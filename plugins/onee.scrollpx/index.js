/**
 * demo - 
 * onee 组件开发模板
 * 20131112
 * design by J.do
 * for more ? http://jdoi.net/
 */

;!function (global, undefined) {
	
	if (
		!onee ||
		!_ ||
		!Sizzle ||
		!onee.dom
	) return console && console.log && console.log(

			"Base on "+
			"onee.js /"+
			"underscode.js /"+
			"Sizzle.js /"+
			"dom.js"

		);
	
	// is exist
	if ( onee.scrollpx ) return;

	// new a onee's log
	var log = onee.log("scrollpx");
	var find= onee.dom.find;
	var addClass = onee.dom.addClass;
	var delClass = onee.dom.delClass;
    var append   = onee.dom.append;
    var evtOn    = onee.dom.on;
    var getAttr  = onee.dom.getAttr;

    var extend = _.extend;
    var each   = _.each;
	
	var _scrollpx = function ( options ) {

        // 载体对象
        this.el = options.el;
        // 往前控制节点
        this.pre = options.pre;
        // 向后控制节点
        this.nex = options.nex;
		// 初始滚动速度
		this.sp = options.speed || 2;
		// private 
		var maxScroll = this.el.scrollHeight - this.el.clientHeight,
			dir = 1,
			timestamphandle = null,
			ts = this;
		// 不满足初始化条件
		if ( maxScroll <= 0 ) {
			addClass([this.pre, this.nex], "unable");
			return;
		} else delClass([this.pre, this.nex], "unable");

		function _doi () {
			// 不满足执行条件，边界点
			if ( (ts.el.scrollTop <= 0 && dir === -1) || (ts.el.scrollTop >= maxScroll && dir === 1) ) {
                if ( dir === -1 ) addClass(ts.pre, "unable");
                if ( dir ===  1 ) addClass(ts.nex, "unable");
				clearInterval( timestamphandle );
				return
			}
            delClass([ts.pre, ts.nex], "unable");
            ts.el.scrollTop += dir * ts.sp;
		}

        // building handle

        evtOn(
            evtOn(
                [this.pre, this.nex],
                "mouseover",
                function () {
                    dir = getAttr(this, "scrollpx-navi") == "pre" ? -1 : 1;
                    timestamphandle = setInterval( _doi, 50 );
                }
            ),
            "mouseout",
            function () {
                clearInterval( timestamphandle )
            }
        );
	
	}

    onee.scrollpx = function ( selector, opts ) {
        var holder = find(selector);
        !!holder.length && each(holder, function (elem, index) {
            var el  = Sizzle("[scrollpx-master]", elem);
            var pre = Sizzle("[scrollpx-navi=pre]", elem);
            var nex = Sizzle("[scrollpx-navi=nex]", elem);
            el.length && pre.length && nex.length && new _scrollpx(extend({
                el  : el[0],
                pre : pre[0],
                nex : nex[0],
            }, opts))
        })
    }
	
}(this);