;(function($, window, document,undefined) {
    //定义UploadSize的构造函数
    var UploadSize = function(ele, opt) {
        this.$element = ele,
        this.defaults = {  //默认设置
            'maxSize': 3000,  //最大默认为3M
            'type': 'jpg,jepg,png,gif,pdf,word,excel', //文件格式 
            'sizeTips': '文件大小超出限制',  //文件大小超出限制提示
            'typeTips': '文件格式错误'  //文件格式错误提示
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    //定义UploadSize的方法【对象法】
    UploadSize.prototype = {
        fileChange: function() {
        	var self = this;         

            $(this.$element).on('change',function(){
            	var fileSize = 0,
            		target = this;

            	if (isIE() && !target.files) {
			        var filePath = target.value;
			        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
			        var file = fileSystem.GetFile(filePath);
			        fileSize = file.Size;
			    } else {
			        fileSize = target.files[0].size;
			    }

			    var size = fileSize / 1024;
			    //这里限制大小
			    if(size>self.options.maxSize){    
			        alert(self.options.sizeTips);
			        target.value="";
			        return
			    }

			    var name=target.value;
			    var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();

				var arr = self.options.type.split(','),
					_flag = false;
				
				$.map(arr, function(item,i){
					if(fileName == item) _flag = true;
				});	

			    //这里限制类型
			    if(!_flag){       
			        alert(self.options.typeTips);
			        target.value="";
			        return
			    }
            });		    

		    function isIE() { //判断是否为ie 
			    if (!!window.ActiveXObject || "ActiveXObject" in window)  
			        return true;  
			    else  
			        return false;  
			} 
        }
    }
    //在插件中使用UploadSize对象
    $.fn.uploadSizeLimit = function(options) {
        //创建UploadSize的实体
        var uploadsize = new UploadSize(this, options);
        //调用其方法
        return uploadsize.fileChange(); //返回可链式调用
    }
})(jQuery, window, document);