;(function(){
	'use strict';

	// http://wenku.baidu.com/link?url=TwrKFRLhKJf3iwl6q0L32m-txB36_xM1LVcvHV0wPjJURQwFBa6Vfur9Yk1ETvgpGjlwqMQVWPFithIvHYxQ6TIZUF_Thv6UMN6dUq4nURq
	// http://www.360doc.com/content/11/0520/08/1054518_118042049.shtml
	
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

	var year_start = 1320, // 开始年份
		year_end = 1680,   // 结束年份
		year_per = 40,      // 每年占用的像素值
		year_degree = 1;  // 跳跃的刻度

	function setYearLine(){
		var html = '<ul class="clearfix">';
		for(var i=year_start; i<year_end; i=i+year_degree){
			html += '<li>'+i+'</li>';
		}
		html += '</ul>';


		$('#year').append(html).find('li').css({'width':year_per*year_degree+'px'});
		$('#content').css({'width':year_per*(year_end-year_start)});
	}
	setYearLine();
	setEmperorLine();

	function setEmperorLine(){
		var data = [
			{
				start : year_start,
				end : 1368,
				name : '元'
			},
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
				end : 1402,
				miao : '明惠宗',
				name : '朱允炆',
				nian : '建文',
				info : '朱元璋嫡长孙，温文孝顺'
			}
		];

		var marginLeft =  util.getItemPix(data[0].start);
		var html = '<ul class="clearfix" style="margin-left:'+marginLeft+'px">';
		for(var i=0; i<data.length; i++){
			var item = data[i],
				width = (item.end-item.start)*year_per,
				bgcolor = util.randomColor(),
				nian_s = item.nian ? '('+item.nian+')' : '';
			html += '<li style="width:'+width+'px; background:'+bgcolor+';">'+item.name+'-'+(item.miao||'')+ nian_s +'</li>';
		}
		html += '</ul>';
		
		$('#line').append(html);
	}

	function setThingLine(){
		var html = '',
			data = thing_data,
			level = [0, 0, 0, 0, 0],  // 防止多个进度条重复，每个数字表示当前进度最后的年份，数组的最后一个表示年份最小的那一组
			len_1 = level.length-1;
		for(var i=0; i<data.length; i++){
			var item = data[i],
				startLeft = util.getItemPix(item.start),
				// endLeft = util.getItemPix(item.end),
				bgcolor = util.randomColor(),
				sty_width = '',
				sty_cls = 'item_one',
				info = item.info ? ' > <div class="info">'+item.info+'</div>' : '',
				bt = 0;
				


			for(var j=0; j<len_1; j++){
				if(item.start>level[j]+2){
					level[j] = item.end || item.start;
					level[len_1] = j;
					break;
				}
			}

			bt = (level[len_1])*34+8;
			if(item.end){
				var endLeft = util.getItemPix(item.end);
				sty_width = 'width:'+(endLeft-startLeft)+'px;';
				sty_cls = 'item';
			}
			html += '<div class="'+sty_cls+'" style="left:'+startLeft+'px; '+sty_width+' border-color:'+bgcolor+';">\
						<div class="proce" style="background:'+bgcolor+'; bottom:'+bt+'px">'+item.title+info+'</div>\
					</div>';
		}

		$('#thing').append(html);
	}
	setThingLine();

	// 鼠标滚轮，滚动条左右滚动
	document.getElementById('main').addEventListener('mousewheel', function(event){
		var e = event || window.event,
			delta = (e.wheelDelta) ? e.wheelDelta / 120 : -(e.detail || 0) / 3;

		var sleft = this.scrollLeft;
		// 向上滚动
		if(delta>0){
			this.scrollLeft = sleft-100;
		}else{
			this.scrollLeft = sleft+100;
		}
	})
})();
