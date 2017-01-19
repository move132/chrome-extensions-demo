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
})(window);