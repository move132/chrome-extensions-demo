/**
 * Created by movejs on 2016/6/16.
 */
var asds='24323432432';
var submisi='4Zdf';
var saumvoeofjew='r56';
var a='vfgdfsgfsdg ';
var vvv='565465454654';

console.log("init 初始化成功！！！");

(function(global){
    // 创建一个简单的文字通知：
    this.notification=function(notificationId,options){
        var opt={
            type:'image',
            title:'Hello notification!',
            iconUrl:'../images/appicon.jpg',
            message:'contextMessage',
            imageUrl:'../images/appicon.jpg'

        }
        chrome.notifications.create(notificationId, options|| opt);
    }

    // 创建一个tab：
    this.createTab=function(options){
        chrome.tabs.create({
            url:"../page/options.html"
        });
    }

    this.createWindow=function(options){
        chrome.windows.create({
            url:"../page/options.html",
            width:300,
            height:300,
            type:"panel"
        });
    }



    this.inter=function(){

        var options={
            type:'list',
            title:'Hello!'+Math.random(),
            iconUrl:'../images/appicon.jpg',
            message:'超过5000万人使用，免费的广告拦截器，可阻止所有烦人的广告及恶意软件和跟踪。',
            buttons:[{title:'Hello!',iconUrl:'../images/appicon.jpg'},
                {title:'Word!',iconUrl:'../images/appicon.jpg'}],
            contextMessage:'contextMessagecontextMessage',
            items:[{title:'Hello!',message:'../images/appicon.jpg'},
                {title:'Word!',message:'../images/appicon.jpg'},
                {title:'Hello!',message:'../images/appicon.jpg'},
                {title:'Word!',message:'../images/appicon.jpg'}],
        }
        chrome.extension.getBackgroundPage().notification("sendMessage",options);
        setTimeout(function(){
            chrome.notifications.clear("sendMessage", function(){ console.log('clear notification')});
        },1000)
        console.log('msg done !!');

    }
})(window);