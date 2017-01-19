$(function(){
	var is_image=localStorage.getItem("is_image_blur");
	if (is_image && is_image==1) {
		$("input[name='autoformat']").prop("checked",true);
	};
	$("input[name='autoformat']").on("click",function(e){
		var ischeck=$(this).prop("checked") ? 1 : 0;
		localStorage.setItem("is_image_blur",ischeck);
	});
})