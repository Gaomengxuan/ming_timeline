;(function(){
	'use strict';


	var util = {
		//16进制方式表示颜色0-F
		randomColor : function() {
			var r = parseInt(Math.random()*255),
				g = parseInt(Math.random()*255),
				b = parseInt(Math.random()*255),
				a = 0.4;
			return 'rgba('+r+', '+g+', '+b+', '+a+')';
		},

		// 获取当前年份所对应的像素
		getItemPix : function(now){
			return (now-year_start)*year_per+year_per*year_degree/2;
		}
	}

	var year_start = 1350, // 开始年份
		year_end = 1680,   // 结束年份
		year_per = 20,      // 每年占用的像素值
		year_degree = 2;  // 跳跃的刻度

	function setYearLine(){
		var html = '<div class="year"><ul class="clearfix">';
		for(var i=year_start; i<year_end; i=i+year_degree){
			html += '<li>'+i+'</li>';
		}
		html += '</ul></div>';


		$('#content').append(html).children('.year').css({'width':year_per*(year_end-year_start)}).find('li').css({'width':year_per*year_degree+'px'});
	}
	setYearLine();
	setEmperorLine();

	function setEmperorLine(){
		var data = [
			{
				start : 1368,
				end : 1398,
				miao : '明太祖',
				name : '朱元璋',
				nian : '洪武',
				info : '开国皇帝；惩治贪官，怒杀功臣',
			},
			{
				start : 1398,
				end : 1420,
				miao : '明惠宗',
				name : '朱允炆',
				nian : '建文',
				info : '朱元璋嫡长孙，温文孝顺'
			}
		];

		var marginLeft =  util.getItemPix(data[0].start);
		var html = '<div class="line"><ul class="clearfix" style="margin-left:'+marginLeft+'px">';
		for(var i=0; i<data.length; i++){
			var item = data[i],
				width = (item.end-item.start)*year_per,
				bgcolor = util.randomColor();
			html += '<li style="width:'+width+'px; background:'+bgcolor+';">'+item.name+'-'+item.miao+'('+item.nian+')</li>';
		}
		html += '</ul></div>';
		
		$('#content').append(html).children('.line').css({'width':(year_end-year_start)*year_per});
	}

	function setThingLine(){
		var data = [
			{
				start : 1368,
				end : 1450,  // end可有可无，视情况而定，若不是该事件没有时间跨度，则可以省略
				title : '朱元璋在南京登基，建国大名，年号洪武',
				info : '',  // info可有可无，若事件过于简单，可省略
			},
			{
				start : 1399,  // 公历
				nian_start : '建文元年', // 皇帝年号计数
				end : 1402,
				nian_end : '建文四年',
				title : '靖难之役'
			}
		];

		var html = '<div class="thing">',
			level = [0, 0, 0, 0];  // 防止多个进度条重复
		for(var i=0; i<data.length; i++){
			var item = data[i],
				startLeft = util.getItemPix(item.start),
				endLeft = util.getItemPix(item.end),
				bgcolor = util.randomColor(),
				bt = 0;
				
			
			for(var i=0; i<3; i++){
				if(item.start>level[i]){
					level[i] = item.end;
					level[3] = i;
					break;
				}
			}

			bt = (level[3]+1)*30;

			html += '<div class="item" style="left:'+startLeft+'px; width:'+(endLeft-startLeft)+'px; border-color:'+bgcolor+';">\
						<div class="proce" style="background:'+bgcolor+'; bottom:'+bt+'px">\
							<span class="start">'+item.start+'('+item.nian_start+')</span>'+item.title+'\
							<span class="end">'+item.end+'('+item.nian_end+')\
						</div>\
						</span>\
					</div>';
		}
		html += '</div>';
		// <div class="info">\
		// 					<h3>'+item.title+'</h3>\
		// 					<p class="desp">'+ (item.info||'' ) +'</p>\
		// 				</div>\
		$('#content').append(html)
	}
	setThingLine();
})();
