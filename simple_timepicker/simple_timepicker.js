/* create by linyk at 2017/03/17 09:20*/
;(function($, window, undefined){
	
	var Timepicker = function(){
		
		this.setting = {
			width: 80,
			height: 22,
			value:'00:00:00',
			fontSize:12,
			color: '#333'
		};

		this.regx = /^\d{0,2}$/;
	};	

	Timepicker.prototype = {

		constructor: Timepicker,

		init: function( $ele, option ){
			var self = this;

			self.setting = $.extend(self.setting, option || {});
			
			//初始化DOM结构
			this.buildDom($ele);

			//设置初始值
			this.setValue( $ele, self.setting.value );
		},


		//绑定事件
		bindEvents: function($wrapper, $ele){
			var self = this,
				timer = null;

			$wrapper.on("focus","input", function(){
				this.select();

				$wrapper.find("input").removeClass("focus-cur");
				$(this).addClass("focus-cur");
			})

			// 支持鼠标滑轮滚动调节时间
			.on("mousewheel DOMMouseScroll", "input", function(e){
				var $this = $(this),
					delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); 


				if(delta > 0){		//向上滚，增加
					self.changeValue($this, 1);

				}else{				//向下滚，减少
					self.changeValue($this, -1);

				}
			})
			.on("blur", "input", function(){

				if( self.regx.test(this.value) ){		
					if(this.value.length === 1){
						this.value = self.stringPre0(this.value);
					}else if(this.value.length === 0){
						this.value = '00';
					}

					if(parseInt(this.value,10) > 23 ){
						if( $(this).hasClass("time-hour") ){
							this.value = 23;
						}else if( parseInt(this.value,10) > 59 ){
							this.value = 59;
						}
					}
					return;
				}

				//不合法时，重置为当前时间
				var now = new Date(),
					h = self.stringPre0(now.getHours()),
					m = self.stringPre0(now.getMinutes()),
					s = self.stringPre0(now.getSeconds());

        		self.setValue($ele, h+":"+m+":"+s );

			})

			// 支持鼠标左键长按调节时间
			.on("mousedown", ".time-btn", function(){
				var $this = $(this),
					$ipt = $wrapper.find("input.focus-cur");
				
				if($this.hasClass("time-up")){

					self.changeValue($ipt, 1);

				}else{
					self.changeValue($ipt, -1);
				}
				
				clearInterval(timer);
				//长按连续触发
				timer = setInterval(function(){
					if($this.hasClass("time-up")){

						self.changeValue($ipt, 1);

					}else{
						self.changeValue($ipt, -1);
					}
				},150);

			})
			//取消长按触发
			.on("mouseup", ".time-btn", function(){
				clearInterval(timer);
			});
		},

		buildDom: function( $ele ){
			var self = this,
				$wrapper,
				$content = $(
					'<table style="width:100%;table-layout:fixed;border-spacing: 0;">'+
						'<tr>' +
							'<td>'+
								'<input maxlength="2" class="time-hour focus-cur" type="text" value=""/>'+
							'</td>'+
							'<td class="time-split">:</td>'+
							'<td>'+
								'<input maxlength="2" class="time-minute" type="text" value=""/>'+
							'</td>'+
							'<td class="time-split">:</td>'+
							'<td>'+
								'<input maxlength="2" class="time-second" type="text" value=""/>'+
							'</td>'+
							'<td style="width:8px;">'+
								'<span class="time-btn time-up"></span>'+
								'<span class="time-btn time-down"></span>'+
							'</td>'+
						'</tr>'+
					'</table>'
				),

				width = typeof self.setting.width === 'string' ? self.setting.width : self.setting.width + 'px',
				height = typeof self.setting.height === 'string' ? self.setting.height : self.setting.height + 'px';

			if($ele.parent().hasClass("timepicker-wrapper")){
				throw new Error('element has been inited, can not be inited twice.');
			}

			$ele.wrapAll( $('<div>',{
					class: 'timepicker-wrapper'
				}) ).hide();

			$wrapper = $ele.parent();
			$wrapper.css({
				display: 'inline-block',
				width: width,
				height: height,
				backgroundColor: '#fff',
				border: '1px solid #eee',
				borderRadius: '5px',
				overflow: 'hidden',
				color:'#333',
				textAlign: 'center',
				minWidth: 72,
				minHeight: 22,
				fontSize: '12px'
			});

			$content.find("td").css({
				height: typeof self.setting.height === 'string' ? $wrapper.height() : self.setting.height,
				padding: 0
			});
			
			$content.find("input").css({
				border: '0 none',
				height: '100%',
				color: self.setting.color,
				backgroundColor: 'transparent',
				width:'100%',
				textAlign:'center',
				fontSize: self.setting.fontSize
			});
			
			$content.find(".time-split").css({
				width:'4px',
			});
			
			$content.find(".time-btn").css({
				display:'block',
				cursor: 'pointer'
			})
			.filter(".time-up").css({
				borderTop: '4px solid transparent',
				borderLeft: '4px solid transparent',
				borderRight: '4px solid transparent',
				borderBottom: '4px solid #3C81BC',
				marginBottom: '6px'
			}).hover(function(){
				$(this).css({
					borderBottomColor: '#00f'
				});
			}, function(){
				$(this).css({
					borderBottomColor: '#3C81BC'
				});
			})
			.next(".time-down").css({
				borderTop: '4px solid #3C81BC',
				borderLeft: '4px solid transparent',
				borderRight: '4px solid transparent',
				borderBottom: '4px solid transparent'
			}).hover(function(){
				$(this).css({
					borderTopColor: '#00f'
				});
			}, function(){
				$(this).css({
					borderTopColor: '#3C81BC'
				});
			});


			$wrapper.append( $content );

			this.bindEvents($wrapper, $ele);
		},


		setValue: function($ele, timeStr){
			var self = this,
				$wrapper = $ele.parent(".timepicker-wrapper"),
				timeArr = timeStr.split(":");

			//校验并矫正输入
			$.each(timeArr, function(i,time){
				if(isNaN(time)){
					timeArr[i] = '00';
					return;
				}

				if( i===0 && parseInt(time, 10) > 23){
					timeArr[i] = 23;
					return;
				}

				if( i>0 && parseInt(time, 10) > 59 ){
					timeArr[i] = 59;
					return;
				}
			});

			$wrapper.find(".time-hour").val( self.stringPre0(timeArr[0]) );
			$wrapper.find(".time-minute").val( self.stringPre0(timeArr[1]) );
			$wrapper.find(".time-second").val( self.stringPre0(timeArr[2]) );
		},

		getValue: function(ele){
			var $wrapper = $(ele).parent(".timepicker-wrapper");

			return $wrapper.find(".time-hour").val() + ":" +
				   $wrapper.find(".time-minute").val() + ":" +
				   $wrapper.find(".time-second").val();

		},

		stringPre0: function(str){
			str = str.toString();
			
			if(str.length === 1){
				return "0" + str;
			}else{
				return str;
			}
		},


		//operate = 1 or -1
		changeValue: function($ele, operate){
		    if( $ele.is(":disabled") ) return;

			var curVal = parseInt($ele.val(), 10),
				max = 59;

			if($ele.hasClass("time-hour")){
				max = 23;
			}

			if( (curVal >= max && operate === 1) || 
				(curVal <= 0 && operate === -1) ){
				return;
			}

			$ele.val( this.stringPre0( curVal + operate ) );
		}
	};



	$.fn.sp_timepicker = function(option){

		//调用方法
		if(typeof arguments[0] === 'string'){

			switch(arguments[0]){
				case 'getValue':
					return Timepicker.prototype.getValue(this);
					break;
				case 'setValue':
					Timepicker.prototype.setValue(this,arguments[1]);
					break;
			}
			return;
		};


		//初始化插件
		return this.each(function(i,ele){

			( new Timepicker() ).init($(ele), option);

		});
	};



}(jQuery, window));