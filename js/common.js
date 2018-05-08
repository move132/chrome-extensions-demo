
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

/*fetch('https://www.biuss.com/').then(function(response){
	return response.text();
}).then(function(responseText){
    console.log($(responseText).find(".intro-how-to .row").html());
    $(".list").html( $(responseText).find(".intro-how-to .row").html() );

    fetch('https://www.biuss.com/ucenter/free_pwd.php',{
    	headers:{'cookie':'UM_distinctid=15b9098392280-00f23d411d10e8-5e4f2b18-100200-15b909839237be; PHPSESSID=9b1oh5cmv04q5jb2bec4r8bgl5'}
    }).then(function(response){
    	return response.text();
    }).then(function(responseText){
        console.log(responseText);
        $("#free_pwd").html( responseText.split('=')[1].replace(/\'/g,'').replace(/;/g,'') );
    }).catch(function(error){
        console.log(error);
    });

}).catch(function(error){
    console.log(error);
});*/





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

	chrome.tts.getVoices(function(voices) {
		var voicehtml="<select class='select_voice'>";
		for (var i = 0; i < voices.length; i++) {
			//console.log('Voice ' + i + ':');
			//console.log('  name: ' + voices[i].);
			/*console.log('  lang: ' + voices[i].lang);
			console.log('  gender: ' + voices[i].gender);
			console.log('  extension id: ' + voices[i].extensionId);
			console.log('  event types: ' + voices[i].eventTypes);*/
			if (localStorage.getItem("voiceName")==voices[i].voiceName) {
				voicehtml+="<option value='"+voices[i].voiceName+"' selected='selected'>"+voices[i].voiceName+"</option>";	
			}else{
				console.log('  extension id: ' + voices[i].voiceName);
				voicehtml+="<option value='"+voices[i].voiceName+"'>"+voices[i].voiceName+"</option>";
			}
		}
		voicehtml+="</select>";
		$(".voiceNamelist").html(voicehtml);

		$(".select_voice").on("change",function(e){  
			localStorage.setItem("voiceName",$(this).val());
		});

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
	var qrcode_linklist=[
		{
			"src":"http://freess.cx/images/servers/jp01.png",
			"title":"Japan#1"
		},
		{
			"src":"http://freess.cx/images/servers/jp02.png",
			"title":"Japan#2"
		},
		{
			"src":"http://freess.cx/images/servers/jp03.png",
			"title":"Japan#3"
		},
		{
			"src":"http://freess.cx/images/servers/us01.png",
			"title":"America#1"
		},
		{
			"src":"http://freess.cx/images/servers/us02.png",
			"title":"America#2"
		},
		{
			"src":"http://freess.cx/images/servers/us03.png",
			"title":"America#3"
		}
		
	];
	$.each(qrcode_linklist,function(i,val){
		var str=
		"<div class='qrcode_item tc fl' style='margin:10px;'>"+
			"<img src="+qrcode_linklist[i].src+" alt="+qrcode_linklist[i]+" />"+
			"<p>"+qrcode_linklist[i].title+"</p>"+ 
		"</div>";
		$(".list").append(str);
	});

	$(".qrcode_item").on("click",function(e){
		if ($(this).hasClass("rotate")) {
			$(".mask_layer").remove();
			$(this).removeClass("rotate");
		}else{
			$(this).addClass("rotate");
			$("body").append("<div class='mask_layer'></div>");
		}
	})
});

(function() {
    var coreSocialistValues = ["富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善"]
      , index = Math.floor(Math.random() * coreSocialistValues.length);
    document.body.addEventListener('click', function(e) {
        if (e.target.tagName == 'A') {
            return;
        }
        var x = e.pageX
          , y = e.pageY
          , span = document.createElement('span');
        span.textContent = coreSocialistValues[index];
        index = (index + 1) % coreSocialistValues.length;
        span.style.cssText = ['z-index: 9999999; position: absolute; font-weight: bold; color: #ff6651; top: ', y - 20, 'px; left: ', x, 'px;'].join('');
        document.body.appendChild(span);
        animate(span);
    });
    function animate(el) {
        var i = 0
          , top = parseInt(el.style.top)
          , id = setInterval(frame, 16.7);
        function frame() {
            if (i > 180) {
                clearInterval(id);
                el.parentNode.removeChild(el);
            } else {
                i += 2;
                el.style.top = top - i + 'px';
                el.style.opacity = (180 - i) / 180;
            }
        }
    }
}());



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

