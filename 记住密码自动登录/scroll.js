;(function($){
	$(function(){
		//设置content大小
		$("section").height($(window).height()).css("lineHeight", $(window).height() + 'px');

		var done = true;//执行判断
		//判断鼠标滚动方向(兼容)
		var scrollFunc = function(e){ 
		    var ee = e || window.event,
		    	$wrapper = $("#wrapper"),
		    	winHeight = $(window).height(),
		    	flag; 
		    
		    if (ee.wheelDelta && done) {//IE/Opera/Chrome 
		    	
		    	done = false;

		    	if (ee.wheelDelta < 0) {		    		
		    		flag = -$wrapper[0].offsetTop == ($wrapper.height()-winHeight) ? 0 : -1;	    		
		    		
		    	} else {		    		
		    		flag = $wrapper[0].offsetTop == 0 ? 0 : 1;	    		
		    		
		    	}

		    	$wrapper.animate({'top': ($wrapper[0].offsetTop + winHeight * flag) + 'px'}, 400, function(){
		    		done = true;//滚轮事件完成后回调,可重新滚动响应事件
		    	});		       
		        
		    } else if (ee.detail && done) {//Firefox 
		        
		        done = false;

		    	if (ee.detail < 0) {		    		
		    		flag = -$wrapper[0].offsetTop == ($wrapper.height()-winHeight) ? 0 : -1;	    		
		    		
		    	} else {		    		
		    		flag = $wrapper[0].offsetTop == 0 ? 0 : 1;	    		
		    		
		    	}

		    	$wrapper.animate({'top': ($wrapper[0].offsetTop + winHeight * flag) + 'px'}, 400, function(){
		    		done = true;//滚轮事件完成后回调,可重新滚动响应事件
		    	});
		        
		    } 
		} 
		/*注册事件*/ 
		if(document.addEventListener){ 
		    document.addEventListener('DOMMouseScroll',scrollFunc,false); 
		}//W3C 
		window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome 

		$(window).resize(function() { //重置窗口大小事件
			$("section").height($(window).height()).css("lineHeight", $(window).height() + 'px');
		});
	});
})(jQuery);
