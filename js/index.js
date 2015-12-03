;(function(){
	'use strict';


	var util = {
		//16进制方式表示颜色0-F
		randomColor : function() {
			
			var arrHex = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
			var strHex = "#";
			var index;
			for(var i = 0; i < 6; i++) {
				//取得0-15之间的随机整数
				index = Math.round(Math.random() * 15);
				strHex += arrHex[index];
			}
			return strHex;
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
		var html = '<div class="year"><ul>';
		for(var i=year_start; i<year_end; i=i+year_degree){
			html += '<li>'+i+' -</li>';
		}
		html += '</ul></div>';


		$('#content').append(html).children('.year').find('li').css({'height':year_per*year_degree+'px', 'line-height':year_per*year_degree+'px'});
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

		var marginTop =  util.getItemPix(data[0].start);
		var html = '<div class="line"><ul style="margin-top:'+marginTop+'px">';
		for(var i=0; i<data.length; i++){
			var item = data[i],
				height = (item.end-item.start)*year_per,
				bgcolor = util.randomColor();
			html += '<li style="height:'+height+'px; background:'+bgcolor+';">\
						<div>\
							<h2 class="name">'+item.miao+':'+item.name+'（'+item.nian+'）</h2>\
							<p class="info">'+item.info+'</p>\
							<p>在位：'+item.start+'-'+item.end+'('+(item.end-item.start)+'年)</p>\
						</div>\
					</li>';
		}
		html += '</ul></div>';
		
		$('#content').append(html).children('.line').css({'height':(year_end-year_start)*year_per});
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
				start : 1369,  // 公历
				nian_start : '洪武二年', // 皇帝年号计数
				end : 1400,
				nian_end : '建文二年',
				title : '大将常遇春在北伐时暴病而亡，享年39岁'
			}
		];

		var html = '<div class="thing">';
		for(var i=0; i<data.length; i++){
			var item = data[i],
				startTop = util.getItemPix(item.start),
				endTop = util.getItemPix(item.end),
				bgcolor = util.randomColor();
			html += '<div class="item" style="top:'+startTop+'px; height:'+(endTop-startTop)+'px; border-color:'+bgcolor+'; color:'+bgcolor+'">\
						<span class="start">'+item.start+'('+item.nian_start+')</span>\
						<div class="proce" style="background:'+bgcolor+'"></div>\
						<div class="info">\
							<h3>'+item.title+'</h3>\
							<p class="desp">'+ (item.info||'' ) +'</p>\
						</div>\
						<span class="end">'+item.end+'('+item.nian_end+')</span>\
					</div>';
		}
		html += '</div>';
		$('#content').append(html)
	}
	setThingLine();
})();
