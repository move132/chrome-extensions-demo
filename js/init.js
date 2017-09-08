/**
 * Created by movejs on 2016/6/16.
 */
Utils.log('init.js 初始化成功！！！');

(function(global) {
    // 创建一个简单的文字通知：
    this.notification = function(notificationId, options) {
        var opt = {
            type: 'image',
            title: 'Hello notification!',
            iconUrl: '../images/appicon.jpg',
            message: 'contextMessage',
            imageUrl: '../images/appicon.jpg'

        }
        chrome.notifications.create(notificationId, options || opt);
    }

    this.msgTip = function() {

        var number = 10;
        var ishide = false;
        var contextMessage = '这里是提示的消息，' + number + '秒后自动关闭.';
        var options = {
                type: 'basic',
                title: '提示', // +  new Date().toLocaleString(),
                iconUrl: '../images/appicon.jpg',
                message: '',
                contextMessage: contextMessage,
                buttons: [{
                    title: '确定',
                    iconUrl: '../images/submit.png'
                }, {
                    title: '取消',
                    iconUrl: '../images/cancel.png'
                }]
            }
            //chrome.extension.getBackgroundPage().notification("sendMessage", options);

        chrome.notifications.create("update_notifications", options);

        var notifi_interv = setInterval(function() {
            if (number == 0) {
                clearInterval(notifi_interv);
                chrome.notifications.clear("update_notifications", function() {
                    console.log('update_notifications__关闭提示！');
                    ishide = true;
                });
            };
            options.contextMessage = '这里是提示的消息，' + number + '秒后自动关闭.';
            chrome.notifications.update("update_notifications", options, function(wasUpdated) {
                //console.log(number);
                number--;
            });
        }, 1000);


        // setTimeout(function() {
        //   chrome.notifications.clear("sendMessage", function() {
        //     console.log('关闭提示！')
        //   });
        // }, 2000)
    }

    // 创建一个tab：
    this.createTab = function(options) {
        chrome.tabs.create({
            url: "../page/options.html"
        });
    }
    this.createEmptyTab = function(options) {
        chrome.windows.create({
            //id:001,
            url: "https://www.baidu.com/",
            width: 300,
            height: 300
                //  state:'normal',  //"normal", "minimized", "maximized", "fullscreen", or "docked"
                //type:"panel",
                // focused:true,
                // alwaysOnTop:true
                // type:"popup"
        });

    }
    this.removeTab = function(options) {
        chrome.windows.remove('001', function() {
            console.log('删除tab');
        });
    }

    this.createWindow = function(options) {
        chrome.windows.create({
            url: "../page/options.html",
            width: 300,
            height: 300,
            type: "panel"
        });
    }



    this.inter = function() {

        var options = {
            type: 'list',
            title: 'Hello!' + Math.random(),
            iconUrl: '../images/appicon.jpg',
            message: '超过5000万人使用，免费的广告拦截器，可阻止所有烦人的广告及恶意软件和跟踪。',
            contextMessage: 'contextMessagecontextMessage',
            buttons: [{
                title: 'Hello!',
                iconUrl: '../images/appicon.jpg'
            }, {
                title: 'Word!',
                iconUrl: '../images/appicon.jpg'
            }],
            items: [{
                title: 'Hello!',
                message: '../images/appicon.jpg'
            }, {
                title: 'Word!',
                message: '../images/appicon.jpg'
            }, {
                title: 'Hello!',
                message: '../images/appicon.jpg'
            }, {
                title: 'Word!',
                message: '../images/appicon.jpg'
            }],
        }
        chrome.extension.getBackgroundPage().notification("sendMessage", options);
        setTimeout(function() {
            chrome.notifications.clear("sendMessage", function() {
                console.log('clear notification')
            });
        }, 1000)
        console.log('msg done !!');

    }


    this.tts_msg=function(content){
        /*{
            enqueue: 是否将朗读任务放入队列，如果为true，此朗读任务将在之前的任务结束后才开始,
            voiceName: 朗读所使用的声音名称,
            extensionId: 为朗读提供声音引擎扩展的id,
            lang: 所朗读文字的语言,
            gender: 朗读声音所使用的性别，male或female,
            rate: 朗读语速，默认值为1.0，允许的值为0.1到10.0，但具体范围还要结合具体使用的声音，值越大速度越快,
            pitch: 朗读语调，默认值为1.0，允许的值为0到2.0,
            volume: 朗读音量，默认值为1.0，允许的值为0到1.0,
            requiredEventTypes: 声音必须支持的事件,
            desiredEventTypes: 需要监听的事件，如未指定则监听全部事件,
            onEvent: 用于监听事件的函数
        }chrome.tts.speak(content,{enqueue:true});*/
        var voiceName=localStorage.getItem("voiceName");
        chrome.tts.speak(content,{enqueue:false,gender:'male',pitch:0, voiceName:voiceName});
    }
    this.tts_stop=function(){
         chrome.tts.stop();
    }
})(window);