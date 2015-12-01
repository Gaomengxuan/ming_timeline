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


		$('#content').append(html).find('li').css({'height':year_per*year_degree+'px', 'line-height':year_per*year_degree+'px'});
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

		var marginTop = (data[0].start-year_start)*year_per+year_per*year_degree/2;
		var html = '<div class="line"><ul style="margin-top:'+marginTop+'px">';
		for(var i=0; i<data.length; i++){
			var item = data[i],
				height = (item.end-item.start)*year_per,
				bgcolor = util.randomColor();
			html += '<li style="height:'+height+'px; background:'+bgcolor+';" title="'+ item.name +'('+item.start+'-'+item.end+')"><div><h2 class="name">'+item.miao+':'+item.name+'（'+item.nian+'）</h2><p class="info">'+item.info+'</p></div></li>';
		}
		$('#content').append(html).children('.line').css({'height':(year_end-year_start)*year_per});
	}
})();
