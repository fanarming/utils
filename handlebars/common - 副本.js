;(function($,window,document,undefined){
	$.Setdata = function(container){
		var datas = {},
			ioAttr = {},
			iFunctions = {};

		this.container = container;
		
		iFunctions = {
			render_UI: function(){

			},
		};
		
		ioAttr = {
			template: Handlebars.compile(
				'{{#this}}<div class="group">' +
					'<div class="app">{{name}}</div>' +
				'</div>{{/this}}'
			)
		};

		datas = [
			{
				name: '我是谁'
			},
			{
				name: '呵呵呵'
			}

		];

		$(container).html(ioAttr.template(datas));

		/*$.ajax({
			url: '/api/test',
			dataType: 'json',
			type: 'get',
			success: function (data, err){
				console.log(data);
				$(container).html(ioAttr.template(datas));
			},
			error: function (){

			}
		});*/
	};
})(jQuery,window,document);




