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

	if (window.location.hostname === "egghead.io") {
		$(".lesson-controls-container").append('<a id="a4883534254543aeb0" target="_blank" href=' + $("#wistia_19_source").attr("src") + ' title="" class="custom-btn" data-original-title="下载视频"><i class="fa fa-download"></i> <span class="hidden-xs">下载视频</span></a>');
	};
});



(function(window) {
	this.RUNTIME_MESSAGE = {
		contextMenus: function(request) {
			console.log(request);
			var menu_type= request.message.menuItemId;  
			switch( menu_type ){
				case "image":
					if (request.is_image == "1") {
						this.menu_type_fn().image(request);
					};
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
					new QRcode({ content: request.selectionText  });
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
					'<div class="head">x</div>' +
					'<div class="__qrcodeCanvas__"></div>' +
				'</div>' +
			'</div>'+
			'<style>' +
				'.__qrcode_bg{ position:fixed; width:100%; height:100%; background:rgba(0,0,0,0.7);  top:0; left:0; right:0; botttom:0;z-index:999998;}'+
				'.__qrcodeCanvas_box__{ background:#fff; box-shadow:0 0 100px rgba(255,255,255,0.7); border-radius: 5px; padding:20px; position:fixed; top:50%;left:50%; z-index:999999; transform:translate(-50%,-50%);} ' +
				'.__qrcodeCanvas_box__ .head{ position:absolute; right:5px; top:0px; color:#000; font-size:16px; cursor:pointer;}' +
				'.__qrcodeCanvas_box__ .__qrcodeCanvas__ {   }' +
				'.__qrcodeCanvas_box__ .__qrcodeCanvas__ table tr td{ box-shadow: 0 0 10px rgba(236,28,73,0.3); }' +
			'</style>'; 
	$("body").find(".___qrcode_wrap").remove().end().append(html);
	$('.__qrcodeCanvas__').qrcode({
		width:"200",
		height:"200",
		//render: "table",
		text: _this.options.content
	});
	_this.elements= $(".___qrcode_wrap"); 
	_this.bindEvent();
}
QRcode.prototype.bindEvent=function(){
	var _this=this;
	console.log( _this.elements );
	_this.elements.find('.head, .__qrcode_bg').on("click", function(e) {
		_this.remove();
	});
}
QRcode.prototype.remove=function(){ 
	this.elements.remove();
}
