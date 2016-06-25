	/***************************\ 	
	*  						    *		
	*    =,    (\_/)    ,=      *
	*     /`-'--(")--'-'\		*	
	*    /     (___)     \	    *	
	*   /.-.-./ " " \.-.-.\	 	*
	*   email:move11@126.com    *
	\***************************/
console.debugs=function(str){
	console.log('==========================='); 
	console.log('%c%s','background:#338FCC;color:#fff;font-size:20x;',str);
	console.log('==========================='); 
}

console.debugs('hello word!');



$(function(){
	/*$.get("http://521xunlei.com/thread-10627-1-1.html",function(data){
		console.log($(data).find(".pcb table td.t_f:eq(0)").html());
	});*/



	/*$.get("http://m.toutiao.com/list/?tag=__all__&ac=wap&item_type=4&count=200&format=json",function(result){
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



});
