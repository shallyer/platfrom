/*  === common.js 全局变量===  */

/* ===通用变量===  */

var suateam_tools={
	version:'v1.0',
	interfaceurl:'http://192.168.120.208:8084/',
	AJAX:function(_method,_url,_data,_success,_error){
		var _self =this;
		jQuery.support.cors = true;
		$.ajax({
	        type:_method ||'post',
	        url:_url,
	        xhrFields: {withCredentials: true},
	        dataType:'json',
	        contentType:"application/json",
	        data:JSON.stringify(_data),
//			data: $.toJSON(userData),
//        	dataType: 'jsonp',
// 	      	jsonpCallback:'callback',
	        success:_success,
	        error:_error
    	});
	},
	GetParam:function(){
		var url = window.location;
		var reg = /[^\/]*$/;
		var fileName = reg.exec(url)[0];
		
		return fileName;	
	}
}
module.exports = suateam_tools;