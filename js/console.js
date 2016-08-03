	/***************************\ 	
	*  						    *		
	*    =,    (\_/)    ,=      *
	*     /`-'--(")--'-'\		*	
	*    /     (___)     \	    *	
	*   /.-.-./ " " \.-.-.\	 	*
	*   email:move11@126.com    *
	\***************************/
console.debugs=function(str){ 
	console.log('%c%s','background:#338FCC;color:#fff;font-size:20x;',str); 
}


function conInfo(){
	var str=
		'	   _  _    __         __    __    __   __ 	\n' +
		'	  / /  ) /   ) | /  /___) /   \' (_ ` (_ `	\n' +
		'	_/_/__/_(___/__|/__(___ _(___ _(__)_(__)_ 	\n'+
		' 												\n'; 
	console.log('%c%s','background:#2A4767; font-weight:bold; color:#DDBB00; text-shadow: 0 0 20px #fff;',str);
}

/*setInterval(function(){ 
		conInfo();
},5000);*/

$(function(){ 

	/*$.get("http://m.toutiao.com/list/?tag=__all__&ac=wap&item_type=4&count=100&format=json",function(result){
		console.log(result.html.replace(/\n/g,''));
		$('html').append(result.html);
	})*/

	//$("body").addClass("___cobg___");

	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) { 
		console.debugs(request.channelmsg); 
		if (request && request.channelmsg == 0 ) {
			 
			$("img").css({
				"-webkit-filter" : "blur(5px)"
			});
		};
	});


	if (window.location.hostname === "egghead.io") {
		$(".lesson-controls-container").append('<a id="a4883534254543aeb0" target="_blank" href='+$("#wistia_19_source").attr("src")+' title="" class="custom-btn" data-original-title="下载视频"><i class="fa fa-download"></i> <span class="hidden-xs">下载视频</span></a>');
	}; 
});

