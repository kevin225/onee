/**
 * Class PowinM & Class Popwin
 * design by chen's
 * 20130610
 * base jquery.js
 */
!function (undefined) {
	
	if (
		!onee ||
		!_ ||
		!Sizzle ||
		!onee.ajax ||
		!onee.dom
	) return console && console.log && console.log(

		"Base on "+
		"onee.js /"+
		"underscode.js /"+
		"Sizzle.js /"+
		"dom.js"

	);
	
	// is exist
	if ( onee.Powin ) return;

	// new a onee's log
	var log       = onee.log("Powin");
	var getwins   = onee.get;
	var find      = onee.dom.find;
	var interface = onee.Util.interface;
	// base tool
	var isEmpty = _.isEmpty;
	var each    = _.each;
	var indexOf = _.indexOf;
	var extend  = _.extend;
	var slice   = Array.prototype.slice;
	var concat  = Array.prototype.concat;
	
	var _root = (function(){
		
		var scripts = document.getElementsByTagName("script");
		var docUrl  = document.location.href;
		
		return scripts[scripts.length-1].getAttribute("workspace") || docUrl.substring(0, docUrl.lastIndexOf("/")+1);
		
	})();
	
	var _cache_  = {};
	var _opening = [];
	//var _root    = document.location.href;
	var _zIndex  = 1000000;
	var _rTmpl   = /\{(.*?)\}/g;
	var _rBody   = /<(body)[^>]*>([^\2]+)(<\/\1>)/i;
	var _rScript = /<(script)([^>]*)>([^\4]*?)(<\/\1>)/ig;
	var _rSrc    = /src="(.*?)"/i;
	
	var _rStyle  = /<(style|link)([^\3]*?)(\/?>)(?:([^\5]*?)(<\/\1>))?/ig;
	var _rLink   = /<link([^>]*)/ig;
	var _rHref   = /href="(.*?)"/i;
	
	var _rNote   = /<!--(.*?)-->/g;

	var _wrapTmpl  = '<div class="popwin-holder {winClass}" id="{winID}" style="height:{height}px; width:{width}px;"></div>';
	
	var $workSpace = find("body");
	
	var _shadowCtrl = function () {
		
		var $shadow = onee.dom.append( $workSpace, '<div class="popwin-shadow"></div>' );
		
		return function (display) {

			if ( !_opening.length ) {
				
				//console.log($shadow)
				onee.dom.css($shadow, {
					"top": _scrollTop(),
					"display" : display
				})
				/*$shadow
					.css("top", _scrollTop())
					.animate({"opacity" : opacity}, 200);*/

				/*if ( opacity ) {
					
					$shadow.css("display", "block");
					$workSpace.addClass("popwin-body-openning");
					
				} else {
					
					$shadow.css("display", "none");
					$workSpace.removeClass("popwin-body-openning");
					
				}*/

			}
			
		}
		
	}();
	
	function _scrollTop () {
		return document.documentElement.scrollTop || document.body.scrollTop
	}
	// addeventlistener on "ESC"
	onee.dom.key.on( "ESC", function () {

		var top;
		(top = _opening[_opening.length-1]) && top.close();

	});
	
	/*function _log ( msg ) {
		!!console && !!console.log && console.log('popwin ' + Number(new Date()) + ': ' + msg);
	}*/

	// 接口初始化
	/*function _interface () {
		
		var extender = arguments[0];
		
		each( slice.call(arguments, 1), function (k, obj) {
			
			each( obj, function (name, val) {
				
				extender[name] === undefined && (extender[name] = val);
				
			});
			
		});
		
		return extender;
		
	}*/
	
	// 暂时简单递归加载script,
	// 这部分回头使用C.lazy.include整合
	/*var _loadScript = function () {
		
		var _cache = [];
		var _current;
		
		// record the script file loaction
		$("script[src]").each(function (k, script) {
			
			_cache[_cache.length] = script.getAttribute("src")
			
		});
		//console.log(_cache)
		return function ( scripts, callback ) {
			//console.log(scripts)
			if ( scripts.length ) {
			
				indexOf(_current=scripts.shift(), _cache) > -1 ?

					_loadScript(scripts, callback)
					
				:
					$.getScript(_current, function () {
						
						_loadScript(scripts, callback);
						
					}),
					_cache.push( _current );
				
			} else callback && callback.call( grobal );
			
		}
		
	}();
	
	var _loadStyle = function () {
		
		var _cache = [];
		var _head  = $("head");
		
		// record the script file loaction
		$("link[type]").each(function (k, style) {
			
			_cache[_cache.length] = style.getAttribute("href")
			
		});
		//console.log(_cache)
		return function ( styles ) {
			
			each( styles, function ( key, style ) {
				
				// outlink css file
				if ( style.type == "outlink" ) {
					
					var _code = style.code;
					// not cache ?
					if ( indexOf(_code, _cache) < 0 ) {

						// 增加random临时解决缓存问题
						// 日后再改
						_head.append('<link href="'+_code+'?r='+ Math.random() +'" type="text/css" rel="stylesheet" />');
						_cache.push( _code );

					}
					
				} else _head.append($('<style>'+ style.code +'</style>'));
				
			})
			
		}
	
	}();*/
	
	// Events tiggler
	function _tiggle () {
	
		var _self = this,
			_events = this._events_,
			_types,
			_args = arguments;
		
		if ( _events && (_types=_events[_args[0]]) ) {
			
			each( _types, function (listener, index){
			
				listener.apply( _self, slice.call(_args, 1) );
			
			});
			
		}
		
	}
	
	function _popwin ( options ) {
		
		if ( !options.file || !options.id ) return log( "Incomplete parameter." );
	
		// 如果存在该窗体对象，直接返回对象
		var _tmp;
		if ( _tmp=_cache_[options.id] ) return _tmp;
		
		var _self = this;
		
		// 初始化接口
		interface(this, options, {
			
			ID          : options.id,
			height      : 200,
			width       : 400,
			selects     : [],
			winClass    : "popwin-" + options.id,
			winID       : "popwin_" + options.id,
			
			_events_    : {},
			//intialize   : !!0,
			// 0 => none
			// 1 => close
			// 2 => openning
			status      : 0
			
		});
		// 成生节点
		// this.node = onee.dom.create(_wrapTmpl.replace(_rTmpl, function (a, b){ if ( a && b ) return _self[b]; }));
		// record win
		_cache_[options.id] = this;
	}
	
	_popwin.get = function (id) {
		
		return _cache_[id] || null;
		
	};
	
	extend(_popwin.prototype, {
		
		open : function () {
			//console.log(concat.arguments)
			// on openning
			if ( this.status == 2 ) return;
			
			var _self = this;
			var _args = arguments;
			
			// 未被初始化状态
			if ( !this.status ) {
				
				// status loading
				this.status = 1;
				
				// 成生节点
				this.node = onee.dom.append( $workSpace, _wrapTmpl.replace(_rTmpl, function (a, b){ if ( a && b ) return _self[b]; }) );

				getwins(this.file, function ( html ) {

					onee.dom.html( _self.node, _rBody.exec(html)[2] );
					
					// excute style
					var _link = [];
					html.replace( _rStyle, function (a, b, c, d, e, f) {
						
						// out link css file
						if ( b == "link" ) {
							
							// check the type is css ?
							if ( c.indexOf('"text/css"') > -1 ) {
								
								_link[_link.length] = {
									type : "outlink",
									code : _rHref.exec(c)[1]
								}
								
							}
						
						// inner css style
						} else {
							
							_link[_link.length] = {
								type : "inner",
								code : e
							}
							
						}
						
					});
					//console.log(_link)
					// loader
					//_loadStyle(_link);
					//log(_link)
					onee.inc(_link);
					//console.log(_link)
					
					// excute script
					var _innerScript = "";
					var _outLinkScript = [];
					var _tempSrc;
					
					html.replace( _rScript, function (a, b, c, d, e) {
						//console.log(_rSrc.exec(c))
						(_tempSrc = _rSrc.exec(c)) &&
						(_tempSrc = _tempSrc[1]) &&
						_outLinkScript.push(_root + _tempSrc);

						_innerScript += d;
						
					});
					//console.log(_outLinkScript)
					// parse Script
					onee.inc.apply(null, _outLinkScript).done(function () {
					
						// log("d")
						// parse script
						if ( _innerScript.replace(/\s/g, "") )
							
							try{
								
								new Function (_innerScript).call(_self);
								
								// 延迟保证js被执行，html被渲染
								setTimeout(
									function () {
										_tiggle.apply(_self, concat.apply( ["open"], _args ));
									}
								, 20);

							} catch(e) {
								
								log(e);
								
							}
					
					});
					/*_loadScript(_outLinkScript, function () {
						
						// parse script
						if ( _innerScript.replace(/\s/g, "") )
							
							try{
								
								new Function (_innerScript).call(_self);
								
								// 延迟保证js被执行，html被渲染
								setTimeout(
									function () {
										_tiggle.apply(_self, concat.apply( ["open"], _args ));
									}
								, 20);

							} catch(e) {
								
								log(e);
								
							}
						
					});*/

				});
				
			} else _tiggle.apply(this, concat.apply( ["open"], _args ));
			
			// status open
			this.status = 2;
			// call shadow ctrl
			_shadowCtrl("block");
			// record openning
			_opening[_opening.length] = this;

			// 可扩展显示效果

			//alert('d')
			onee.dom.css(this.node, {
				"zIndex"    : _zIndex++,
				"marginTop" : _scrollTop()-this.height/2,
				"marginLeft": -this.width/2,
				"display"   : "block"
			});
			/*this.node.css({
				"zIndex"   : _zIndex++,
				"marginTop" : _scrollTop()-this.height/2,
				"marginLeft": -this.width/2,
				"display" : "block"
			});*/
			
			//var mmm  = this.node.position();
			
			// recording current opening wins
			//_openWins++

		},
		
		on : function ( type, listener ) {
		
			var _event = this._events_;

			var types = _event[type];
			
			if ( !types ) {
				
				types = _event[type] = [];
				
			}
			
			types.push(listener);
			
			return this
			
		},
		
		/*un : function ( type, listener ) {
			
			var _event = this._events_,
				len = arguments.length;
	
			if ( !_event.length ) return;
	
			if ( !len ) {
	
				this._events_ = {};
	
			} else if ( len == 1 ) {
	
				delete _event[type];
	
			} else {
	
				var index = indexOf(_event[type], listener);
	
				if ( index >= 0 ) _event[type].splice( index, 1 );
	
			}
			
			return this
			
		},*/
		
		close: function () {
			
			if ( this.status < 2 ) return;
			
			// status close
			this.status = 1;
			// remove openning win
			_opening.pop();
			// call shadow ctrl
			_shadowCtrl("none");

			onee.dom.css(this.node, "display", "none")
			//this.node.css("display", "none");
			//this.doms.norm.css("display", "none");
			
			// 触发关闭事件
			_tiggle.apply(this, concat.apply( ["close"], arguments ));
			// recording current maxisize wins
			//_openWins--
			
		}
		
	});

	// export
	(onee.Powin = _popwin).cache = _cache_;
	
}();