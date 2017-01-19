/***************************\
*  						    *
*    =,    (\_/)    ,=      *
*     /`-'--(")--'-'\		*
*    /     (___)     \	    *
*   /.-.-./ " " \.-.-.\	 	*
*   email:move11@126.com    *
\***************************/

Utils.log('background.js 初始化成功！！！');
(function(global) {
	var current = localStorage["__current__"] || 0;
	var is_image = localStorage["is_image_blur"] || 0;

	var contexts = ["page", "frame", "selection", "link", "editable", "image", "video", "audio", "browser_action"];
	for (var i = 0; i < contexts.length; i++) {
		//console.log(contexts[i]);
		chrome.contextMenus.create({
			id: contexts[i],
			title: contexts[i],
			contexts: [contexts[i]] // ["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"]
				//type:['radio']//"normal", "checkbox", "radio", or "separator"
		});

	}

	//监听右键菜单，一旦被点击，则通知前台
	chrome.contextMenus.onClicked.addListener(function(object, tab, aa) {
		// var arr = ["page", "frame", "selection", "link", "editable", "image", "video", "audio"];
		// Send a message to the active tab
		chrome.tabs.query({ //查找标签页
			active: true,
			currentWindow: true
		}, function(tabs) {
			//console.log(object);
			var activeTab = tabs[0];
			chrome.tabs.sendMessage(activeTab.id, {
				'type': 'contextMenus',
				'is_image':is_image,
				"message": object
			});
			 
		});
 
		//chrome.extension.getBackgroundPage().createEmptyTab();
		//chrome.extension.getBackgroundPage().removeTab();
		chrome.extension.getBackgroundPage().msgTip();
		//chrome.extension.getBackgroundPage().createWindow();
	});


	/*chrome.notifications.onClicked.addListener(function(a) {
		//console.log(a);
		chrome.extension.getBackgroundPage().notification();
		chrome.notifications.getAll(function(obj) {
			console.log(obj);
		});
	});*/

	/*chrome.tabs.query({}, function(tab) {  //获取当前窗口的所有标签页
		console.log('-------', tab);
	})
	chrome.tabs.duplicate(activeTab.id, function(tab) { //复制标签
		console.log('-------', tab);
	});*/


	chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
		//alert(notificationId + '_____' + buttonIndex);
		/*chrome.notifications.getAll(function(notifications_obj) {
			console.log(notifications_obj);
		});*/
		if (buttonIndex === 0) {
			console.log("确定！");
		} else {
			console.log("取消！");
		}
	});
})(window)