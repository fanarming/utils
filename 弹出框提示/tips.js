;(function($, window, document, undefined){
	$.extend({
		NormalMsg: function(mes){
			var normalTemplate = '<div class="pop-modal">' +
				'<div class="pop-modal-container">' +
					'<div class="pop-header">' +
						'<span class="close-btn">x</span>' +
					'</div>' +
					'<div class="pop-content">' +
						'<p class="normal-mes">' + mes + '</p>' +
					'</div>' +
					'<div class="pop-footer">' +
						'<button class="normal-confirm">确认</button>' +
					'</div>' +
				'</div>' +
			'</div>';
			
			$('body').append(normalTemplate);	
			this._hiddenModal();		
		},

		SuccessMsg: function(mes){
			var successTemplate = '<div class="pop-modal">' +
				'<div class="pop-modal-container">' +
					'<div class="pop-header">' +
						'<span class="close-btn">x</span>' +
					'</div>' +
					'<div class="pop-content">' +
						'<p class="success-mes">' + mes + '</p>' +
					'</div>' +
					'<div class="pop-footer">' +
						'<button class="success-confirm">确认</button>' +
					'</div>' +
				'</div>' +
			'</div>';
			
			$('body').append(successTemplate);
			this._hiddenModal();			
		},

		_hiddenModal: function(){
			$('.close-btn').on('click', function(){
				$('.pop-modal').remove();
			});			
		}
	});		
})(jQuery, window, document);
