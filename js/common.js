
/*fetch('http://music.movecss.com/src/api.php', {
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
}).then(function(response) {
	return response.text();
}).then(function(responseText) {
	var datas=JSON.parse(responseText).data.imglist;
	//console.log(datas.data.musiclist);
	var str='';
	for (var i = 0; i < datas.length; i++) {
		str+= '<img class="imgs" src="'+datas[i]+'"></img>';
	};
	$("body").append(str);
}).catch(function(error) {
	console.log(error);
});*/

//https://developer.chrome.com/extensions/contextMenus#type-ContextType




/*chrome.notifications.create('1024', options,callback);

function callback(notificationsID){
  	console.log('uppop done!'+notificationsID);
}*/

/*fetch('http://apis.baidu.com/songshuxiansheng/news/news',{
	headers: {
		"apikey": "90686ef7dd90bc83f9aa9830f7bfdbeb",
	},
}).then(function(response){return response.text();}).then(function(responseText){
	setBodyHtml(responseText);
}).catch(function(error){
	console.log(error);
});*/

/*ajax('http://apis.baidu.com/songshuxiansheng/news/news',function(responseText){
	 setBodyHtml(responseText);
});*/

fetch('http://www.biuss.com/').then(function(response){
	return response.text();
}).then(function(responseText){
    console.log($(responseText).find(".mega-menu .btn-u").html());
    $(".list").html( $(responseText).find(".mega-menu .btn-u").html().replace(/\[每1小时变更一次密码\]/g,''));

    fetch('http://www.biuss.com/ucenter/free_pwd.php').then(function(response){
    	return response.text();
    }).then(function(responseText){
        console.log(responseText);
        $("#free_pwd").html( responseText.split('=')[1].replace(/\'/g,'').replace(/;/g,'') );
    }).catch(function(error){
        console.log(error);
    });

}).catch(function(error){
    console.log(error);
});





/*for (var i = 0; i < 20; i++) {
	ajax('http://apis.baidu.com/txapi/mvtp/meinv?num=50',function(responseText){
		var data=JSON.parse(responseText).newslist;
		var str='';
		for (var i = 0; i < data.length; i++) {
			str+='<img width="90" height="90" src="'+data[i].picUrl+'" alt="" />';
		};
		$(".box:eq(2)").append(str);
	});
}*/

function ximiPromise(i){
	return new Promise((resolve, reject) => {
		ajax('http://m.ximalaya.com/album/more_tracks?url=%2Falbum%2Fmore_tracks&aid=203355&page='+(i+1),function(responseText){
			$(".box:eq(2)").append(JSON.parse(responseText).html).find("a").removeAttr("href");
			resolve(JSON.parse(responseText));
		});
	});
}

ximiPromise(0).then(function(res){
	ximiPromise(1);
}).then(function(res){
	ximiPromise(2);
}).then(function(res){
	ximiPromise(3);
}).then(function(res){
	ximiPromise(4);
}).then(function(res){
	ximiPromise(5);
}).then(function(res){
	ximiPromise(6);
});

/*var xiamilist=[];
for (var i = 0; i < 10; i++) {
	xiamilist.push(ximiPromise(i));
};

Promise.all(xiamilist).then(function(res){
	console.log(res);
});
 */




$(function(){
	$(".menu-box ul li").on("click",function(e){
		var _index=$(this).index();
		$(".menu-box ul li").removeClass("active").eq(_index).addClass("active");
		$(".box").hide().eq(_index).show();
	});

	$(".getMsg").on("click",function(e){
		var _this=this;
		fetch('http://apis.baidu.com/appangel/shenzhentong/shenzhentong?id=322170397&format=json',{
			headers: {
				"apikey": "90686ef7dd90bc83f9aa9830f7bfdbeb",
			},
		}).then(function(response){return response.text();}).then(function(responseText){
			var data=JSON.parse(responseText).data;
			var str='<p>卡号：'+data.card_number+'</p>'+
					'<p>余额：<span class="price">'+data.card_balance+'</span></p>'+
					'<p>余额截止时间：'+data.balance_time +'</p>'+
					'<p>卡有效时间：'+data.card_validity +'</p>';
			$(_this).parent().append(str);
		}).catch(function(error){
			console.log(error);
		});
	});

	$(".more").on("click",function(e){
		$("body").addClass("loading_body");
		ajax('http://apis.baidu.com/songshuxiansheng/news/news',function(responseText){
			setBodyHtml(responseText);
			setTimeout(function(){$("body").removeClass("loading_body");}, 300);
		});
	});
	
	$(".clear_tts").on("click",function(e){
		chrome.tts.stop();
	});

	

	$("body").append("<audio id='jp_audio_0' preload='metadata'  ></audio>");
	$("body").on("click",".btn-player",function(){
		//alert($(this).attr("sound_url"));
		chrome.windows.create({
            url:$(this).attr("sound_url"),
           // tabId:122221,
            width:300,
            height:300,
            type:"panel"
        });


		$("#jp_audio_0").attr("src",$(this).attr("sound_url"));
	});
});




function setBodyHtml(responseText){
	var data=JSON.parse(responseText),str='<ul class="article_list">';
	if(data.retData.length >0){
		for(var i=0 ; i < data.retData.length; i++){
			str+='<li>' +
				'<a href="'+data.retData[i].url+'" target="_blank">' +
					'<img src='+data.retData[i].image_url+' alt="" />' +
					'<div class="infos">' +
						'<p>'+data.retData[i].title+'</p>' +
						'<p>' +
							'<span class="author">'+data.retData[i].abstract+'</span>' +
						'</p>' +
					'</div>' +
				'</a>' +
			'</li>';
		}
	}
	str+='</ul>';
	$(".box:eq(0) .list").append(str);
}

function ajax(url,callback){
	fetch(url,{
		headers: {
			"apikey": "90686ef7dd90bc83f9aa9830f7bfdbeb",
		},
	}).then(function(response){return response.text();}).then(function(responseText){
		 callback && callback(responseText);
	}).catch(function(error){
		console.log(error);
	});
}

