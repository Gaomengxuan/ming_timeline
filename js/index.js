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

	var year_start = 1200, // 开始年份
		year_end = 1600, // 结束年份
		year_per = 2; // 每年占用的像素值

	function setYearLine(){
		var html = '<div class="year"><ul>',
			per = 10;
		for(var i=year_start; i<year_end; i=i+per){
			html += '<li>'+i+' -</li>';
		}
		html += '</ul></div>';


		$('#content').append(html).find('li').css({'margin-bottom':year_per*per});
	}
	setYearLine();
	setEmperorLine();

	function setEmperorLine(){
		var data = [
			{
				start : 1230,
				end : 1280,
				name : '朱元璋'
			},
			{
				start : 1280,
				end : 1320,
				name : '朱允炆'
			}
		];

		var html = '<div class="line"><ul>';
		for(var i=0; i<data.length; i++){
			var item = data[i],
				height = (item.end-item.start)*year_per,
				bgcolor = util.randomColor();
			html += '<li style="height:'+height+'px; background:'+bgcolor+';" title="'+ item.name +'"></li>';
		}
		$('#content').append(html);
	}
})();
