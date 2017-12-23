/***************************\
*  						    *
*    =,    (\_/)    ,=      *
*     /`-'--(")--'-'\		*
*    /     (___)     \	    *
*   /.-.-./ " " \.-.-.\	 	*
*   email:move11@126.com    *
\***************************/

$(function() {

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		//console.log(request, sender,sendResponse);
		chrome.storage.local.get('is_tts',function(items){
			 //console.log('_____',items);
			//chrome.tts.speak(msg,ttsoption);
		})

		if (request && request.message) {
			switch (request.type) {
				case "contextMenus":
					RUNTIME_MESSAGE.contextMenus(request);
				break;
				case "send":

				break;
			}
		};
	});


	/*var port = chrome.extension.connect();
	console.log(port)

	
	document.getElementById('app').addEventListener('myCustomEvent', function(e) {
		var a=e;
	  var eventData = document.getElementById('app').innerText;
	  	debugger;
	  port.postMessage({message: "myCustomEvent", values: eventData});
	});*/
	
	var port = chrome.extension.connect();
	window.addEventListener("message", function(event) {  
	  	// We only accept messages from ourselves
	  	if (event.source != window)
	    	return;

	  	if (event.data.type && (event.data.type == "FROM_PAGE")) {
	    	console.log("Content script received: " + event.data.text);
	    	//port.postMessage(event.data.text);
	    	chrome.runtime.sendMessage({type:'tts_alertmsg' , content: event.data.text });
	  	}
	}, false);





	function createEle(){
		var div= document.createElement("div");
		div.className="_____div_tts_______";

		div.style.cssText="width:20px; height:20px; background:red; z-index:999;top:200px;left:200px;position:absolute; display:none;";

		document.body.appendChild(div);
	}
	//createEle();

	$("._____div_tts_______").on("click",function(e){ 
		chrome.runtime.sendMessage({type:'tts_alertmsg' , content: $(this).text() });
	})

	if (window.location.hostname === "egghead.io") {
		$(".lesson-controls-container").append('<a id="a4883534254543aeb0" target="_blank" href=' + $("#wistia_19_source").attr("src") + ' title="" class="custom-btn" data-original-title="下载视频"><i class="fa fa-download"></i> <span class="hidden-xs">下载视频</span></a>');
	};
	if (window.location.hostname.indexOf("quanmin.tv") > 0  ) {
		$(".p-room_player").css({
			'position': 'fixed',
		    'width': '100%',
		    'height': '100%',
		    'top': 0,
		    'left': 0,
		    'padding': 0,
		    'z-index': 999999
		});
		$(".main_header").remove();
	}
});



(function(window) {
	this.RUNTIME_MESSAGE = {
		contextMenus: function(request) {
			//console.log(request);
			var menu_type= request.message.menuItemId;  
			switch( menu_type ){
				case "image": 
					if (request.localStorage.is_image_blur == "1") {
						this.menu_type_fn().image(request);
					}else{
						console.log("已经关闭图片模糊设置，请在扩展应用用设置。")
					}
				break;
				case "link":
					this.menu_type_fn().link(request);
				break;
				case "selection":
					this.menu_type_fn().selection(request);
				break;
			}  
		},
		menu_type_fn:function(){
			return {
				image:function(request){
					$("img").css({"-webkit-filter": "blur(5px)"});
				},
				link:function(request){
					new QRcode({ content: request.message.linkUrl });
				},
				selection:function(request){
					new QRcode({ content: request.message.selectionText  });
					if (request.localStorage.is_tts == "1") { 
						
						chrome.runtime.sendMessage({type:'tts_send' , content:  request.message.selectionText },function(a,b,c){
							console.log("成功向后台发送操作！");
						});
					}else{
						chrome.runtime.sendMessage({type:'tts_alertmsg' , content: '已经关闭Tts语音功能，请在扩展应用中开启设置。'});
					}
				}
			}
		},
		send: function() {
			console.log('movecss');
		}
	}
	return RUNTIME_MESSAGE;
})(window);





function QRcode(options){
	this.options= options || {};
	this.elements=null;
	this.init(); 
}
QRcode.prototype.init=function(){
	var html , _this=this;
	html  = '<div class="___qrcode_wrap">'+
				'<div class="__qrcode_bg"></div>' +
				'<div id="qrcodeCanvas" class="__qrcodeCanvas_box__">' +
					'<div class="head">&#215;</div>' +
					'<div class="__qrcodeCanvas__"></div>' +
				'</div>' +
			'</div>'+
			'<style>' +
				'.__qrcode_bg{ position:fixed; width:100%; height:100%; background:rgba(0,0,0,0.7);  top:0; left:0; right:0; botttom:0;z-index:999998;}'+
				'.__qrcodeCanvas_box__{ background:#fff; box-shadow:0 0 100px rgba(255,255,255,0.7); border-radius: 5px; padding:20px; position:fixed; top:50%;left:50%; z-index:999999; transform:translate(-50%,-50%);} ' +
				'.__qrcodeCanvas_box__ .head{ position:absolute; right:5px; top:0px; color:#000; font-size:20px; cursor:pointer;}' +
				'.__qrcodeCanvas_box__ .__qrcodeCanvas__ {   }' +
				'.__qrcodeCanvas_box__ .__qrcodeCanvas__ table tr td{ box-shadow: 0 0 10px rgba(236,28,73,0.3); }' +
				'.__qrcode_error{ color:red; margin:0;}'+
			'</style>'; 
	$("body").find(".___qrcode_wrap").remove().end().append(html);
	_this.elements= $(".___qrcode_wrap"); 
	_this.bindEvent();
	try{
		$('.__qrcodeCanvas__').qrcode({
			width:"200",
			height:"200",
			//render: "table",
			text: _this.options.content
		});
	}catch(err){
		console.log('Qrcode '+err);
		$('.__qrcodeCanvas__').html('<p class="__qrcode_error">'+err+'</p>');
		return;
	}
}
QRcode.prototype.bindEvent=function(){
	var _this=this;
	//console.log( _this.elements );
	_this.elements.find('.head, .__qrcode_bg').on("click", function(e) {
		_this.remove();
	});
}
QRcode.prototype.remove=function(){ 
	this.elements.remove();
}
