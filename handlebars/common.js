;(function($,window,document,undefined){
	var SetData = function(ele){
		this.$ele = ele;
		//this.api = api;
		this.datas = [
			{
				name: '我是谁'
			},
			{
				name: '呵呵呵'
			}

		];

		this.ioAttr = {
			template: Handlebars.compile(
				'{{#this}}<div class="group">' +
					'<div class="app">{{name}}</div>' +
				'</div>{{/this}}'
			)
		};		
	};

	SetData.prototype = {
		_renderUI: function(){	
			var templates = this.ioAttr.template,
				datas = this.datas;

			$(this.$ele).html(templates(datas));
		},

		_consoleLog: function(){
			$('.app').on('click', function(){
				console.log($(this).text());
			});
		}
	};	

	$.fn.setData = function(){
		var setdata = new SetData(this);

		setdata._renderUI();
		setdata._consoleLog();
	};	
	
})(jQuery,window,document);




