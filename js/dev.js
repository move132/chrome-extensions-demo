$(function(){
	$("#clear_tts").on("click",function(e){
 		chrome.tts.stop();
	})
})