$(function(){
	var is_image=localStorage.getItem("is_image_blur");
	var is_tts=localStorage.getItem("is_tts");
	var is_notifications=localStorage.getItem("is_notifications");

	$("input[type='checkbox']").each(function(i,e){
		var type=$(e).attr("name");
		switch(type){
			case 'autoformat':
				if (is_image && is_image==1) {
					$("input[name='autoformat']").prop("checked",true);
				};
			break;
			case 'automedia':
				if (is_tts && is_tts==1) {
					$("input[name='automedia']").prop("checked",true);
				};
			break;
			case 'notifications':
				if (is_notifications && is_notifications==1) {
					$("input[name='notifications']").prop("checked",true);
				};
			break;
			
		}
	});

	$("input[type='checkbox']").on("click",function(e){
		var type=e.target.getAttribute("name");
		var ischeck=$(this).prop("checked") ? 1 : 0;
		switch(type){
			case 'autoformat':
				localStorage.setItem("is_image_blur",ischeck);
			break;
			case 'automedia':
				localStorage.setItem("is_tts",ischeck);
			break;
			case 'notifications':
				localStorage.setItem("is_notifications",ischeck);
			break;
		}
	});
})