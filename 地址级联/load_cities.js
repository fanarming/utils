;(function($){
	var Loadcities = function(ele,options){
		this.$element = ele;
		this.options = options;
		this.initPro = options.province ? options.province : false;
		this.initProDeflt = options.prodefault ? options.prodefault : false;
		this.initCity = options.city ? options.city : false;
		this.initCityDeflt = options.citydefault ? options.citydefault : false;
		this.$chinese_cities = $.CHINESE_CITIES();		
	};


	Loadcities.prototype = {
		_renderUI: function(){
			this.$element.append('<select name="province" id="province">' +
				'<option value="0">请选择</option>' +
			'</select>' +
			'<select name="city" id="city">' +
				'<option value="0">请选择</option>' +
			'</select>');
		},

		_changeAction: function(){
			var self = this,
				cities = self.$chinese_cities,//载入地址列表数据
//console.log(cities);				
			    $province = $("#province"),
				$cities = $("#city"),
				$region = $("#region");
		

			$.map(cities, function(item, index){//初始化省份
/*console.log("第"+index+"个数组是：");
console.log(item);*/
				$province.append("<option value=" + item[0] + " " + (item[0] == self.initPro ? 'selected' : '') + ">" + item[1] + "</option>");//单双引号相互嵌套，但不能相似的引号嵌套
			});

			if(!$province.find("option:selected").length) {
				$cities.attr('disabled', 'disabled').css({
					'background': '#DCDCDC',
					'cursor': 'not-allowed'
				});
			} else {
				self.initProDeflt ? $province.attr('disabled','disabled') : '';
				self._searchCities();	
			}
			

			$province.change(function(event){// 改变省份
/*console.log($(this).children("option:selected").val());
console.log($(this).children("option:selected").text());*/
				self._searchCities();				
			});
		},

		_searchCities: function(){
			var self = this,
				$province = $("#province"),
				$cities = $("#city"),
				$region = $("#region"),
				val = $province.children("option:selected").val();

			$cities.children('option:gt(0)').remove();

			if (parseInt(val)) {					
				var newarr = $.map(self.$chinese_cities, function(item, index){
					
					var i = $.inArray(parseInt(val), item, 0);

					if (i > -1) {
						item.push('true'); //做标记
						return item; //返回所在数组,如果还有区需要选择可以在新返回的数组里进行操作							
					}
				});

//console.log(newarr);
				if (newarr[3]) {
					$cities.removeAttr('disabled').css({
						'background': '#fff',
						'cursor': 'default'
					});

					$.each(newarr[2], function(index, item){
						$cities.append("<option value=" + item[0] + " " + (item[0] == self.initCity ? 'selected' : '') + ">" + item[1] + "</option>");
					});

					self.initCityDeflt ? $cities.attr('disabled','disabled') : '';
				}
				
			}  else {
				$cities.attr('disabled', 'disabled').css({
					'background': '#DCDCDC',
					'cursor': 'not-allowed'
				});

				$cities.children('option:gt(0)').remove();
			};
		}
	};


	$.fn.loadCities = function (options){
		var loadcities = new Loadcities(this,options);

		loadcities._renderUI();
		loadcities._changeAction();
	};	
})(jQuery);
