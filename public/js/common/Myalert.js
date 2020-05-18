/**
 * Created by Musicbear on 2016/7/28.
 */
Myalert = {
    typeChoice:{
        notice:0,
        message:1,
        alert:2,
        error:3,
        loading:4,
    },
    top:'false',
    loadingId:[],
    iconSrc:{
        message:"http://nhds.oss-cn-hangzhou.aliyuncs.com/picture-wall/image/kaimushi/test_15355586.png",
        error:"http://nhds.oss-cn-hangzhou.aliyuncs.com/picture-wall/image/kaimushi/test_52593527.png",
        notice:"http://nhds.oss-cn-hangzhou.aliyuncs.com/picture-wall/image/kaimushi/test_61162436.png",
        alert:"http://nhds.oss-cn-hangzhou.aliyuncs.com/picture-wall/image/kaimushi/test_61162436.png"
    },
    idAdd:function(obj){
        this.loadingId.push(obj);
    },
    idGet:function(){
        var id = this.loadingId.pop();
        return id;
    },
    idNum:function(){
        return this.loadingId.length;
    },
    setTop:function(top){
        this.top = top;
    }
};

function alertTest(){
   // var callback = function(){
   //      setTimeout(function(){
   //          alert('回调');
   //      },2000)
   //  }
   //  setTimeout(function(){
   //      popupalert('看一下行不行','message',callback);
   //  },1000);
   //
   //  setTimeout(function(){
   //      popupalert('看一下行不行','alert','',false);
   //  },10000);
   //  message('测试一下啦');
   //   setTimeout(function(){
   //       stopLoading();
   //   },10000);
};

/**
 * 弹框参数 遮罩型弹窗
 * message 必填，弹框内容
 * type 必填，弹框类型string  有message,alert,notice,error,loading五种
 * callback 非必填，回调函数  如在alert,notice,与error状态下，为确认按钮触发事件，如在message状态下则为弹窗消失时执行 , 不填写与loading状态不执行
 * isNeedClose 非必填，如为true或不填写，且有确认按钮的情况下，则为确认按钮点击后，弹窗消失。如为false则不消失。（注意message，默认状态是两秒消失，设为false则不消失）
 * cancelCb 非必填，回调函数  如填写，代表需要第二个按钮，有特殊事件，会复写“X”的事件。
 * sureTxt 非必填，更改弹框确认按钮的文本
 * canTxt 非必填，更改弹框取消按钮的文本
 * isNeedExBt 非必填，是否需要第二个按钮，默认与true打开，false关闭
 */
function popupalert(message,type,callback,isNeedClose,cancelCb,sureTxt,canTxt,isNeedExBt){
    if(typeof(message)!= 'string'&&typeof(type)!= 'string'){
        console.log('弹框参数错误');
        return;
    }
    if(typeof(Myalert.typeChoice[type])=='undefined'){
        console.log('弹框类型错误');
        return;
    }
    var typeindex = Myalert.typeChoice[type];

    //生成pop
    var pCreator = new popCreator();
    pCreator.create(typeindex,message,callback,isNeedClose,cancelCb,sureTxt,canTxt,isNeedExBt);
}

/**
 * 发送普通消息
 * @param msg 消息内容
 */
function message(msg){
    if(typeof(msg)!='string'||msg.length == 0){
        return;
    }
    var id = uuid(8);
    createMessage(msg,id);
    $("#msg_"+id).show();
    setTimeout(function(){
        var cb = function(){
            $("#msg_"+id).remove();
        }
        $("#msg_"+id).fadeOut(500,cb);
    },2000);
    $("#msg_"+id).fadeIn(500);
    PopUpTopDefine($("#msg_"+id));
}

function createMessage(msg,id){
    //获取宽高
    var height = window.innerHeight;
    var width = window.innerWidth;
    var top = height/2-50;
    var left = width/2-100;
    var css = {
        left: left+'px',
        top: top+'px',
    }

    var parentDiv = $('<div></div>');
    parentDiv.addClass('normalMsgContent popFrame msgContent');
    parentDiv.attr('id','msg_'+id);
    parentDiv.css(css);
    var msgDiv = $('<div></div>');
    msgDiv.addClass("pop-buttons pop-row");
    var i = $('<i></i>');
    i.addClass("iconfont c-success msgHint");
    i.html('&#xe64b;');
    var p = $('<p></p>');
    p.addClass("pc-text mc-text mainText");
    p.html(msg);
    i.appendTo(msgDiv);
    p.appendTo(msgDiv);
    msgDiv.appendTo(parentDiv);
    parentDiv.appendTo('body');
    // console.log(parentDiv);
    messageWidthAdjust(parentDiv);
}

//停止loading动画事件
function stopLoading(){
   var num = Myalert.idNum();
    for(var i=0;i<num;i++){
        var obj = Myalert.idGet();
        obj.end();
    }
}

function popCreator(){
    var id=0;
    var type = 0;
    var myMessage = '';
    var myIsNeedClose = '';
    var myCallback = '';
    var myCancelCb = '';
    var myIsNeedExBt = true;
    var mySureTxt = '确定';
    var myCanTxt = '取消';
    var myNoticeTxt = '知道了';

    // var defaultCallback = function(){};
    var loadingTimeout = -1;
    var self = this;
    this.create = function(typeIndex,message,callback,isNeedClose,cancelCb,sureTxt,canTxt,isNeedExBt){
        config(typeIndex,message,isNeedClose,sureTxt,canTxt,isNeedExBt);
        var shadow = createShadow();
        id = 'popupalert'+uuid(8);
        shadow.attr('id',id);

        setCallback(callback);
        setCancelCb(cancelCb);
        var content = mainContent(type);
        shadow.append(content);
        $('body').append(shadow);

        var top = topAdjust(typeIndex);
        content.css('top',top);

        shadow.fadeIn(500);
        setSpecialExe(typeIndex);
        PopUpTopDefine(content);
    };
    var config = function(typeIndex,message,isNeedClose,sureTxt,canTxt,isNeedExBt){
        type = typeIndex;
        myMessage = message;
        myIsNeedClose = isNeedClose;
        if(sureTxt){
            mySureTxt = sureTxt;
            myNoticeTxt = sureTxt;
        }

        if(canTxt){
            myCanTxt = canTxt;
        }

        if(typeof(isNeedExBt)!='undefined'&&isNeedExBt==false){
            myIsNeedExBt = isNeedExBt;
        }
    };
    var createShadow = function(){
        var shadow = $('<div class="pop-fade"></div>');
        return shadow;
    };
    var mainContent = function(type){
        if(type == 0)return notice();
        if(type == 1)return message();
        if(type == 2)return alert();
        if(type == 3)return error();
        if(type == 4)return load();
    };
    var notice = function(){
        var content = $('<div class="pop-content popFrame"></div>');
        var p = $('<p class="pc-text nc-text mainText">'+myMessage+'</p>');
        var div = $('<div class="pop-buttons pop-row"></div>');
        var button = $('<button class="bt-sub-sure pop-bt">'+myNoticeTxt+'</button>');
        button.click(myCallback);
        div.append(button);
        var i = $('<img class="icon-img notice-img" src="'+Myalert.iconSrc.notice+'"></img>');
        i.click(myCancelCb);
        content.append(p);
        content.append(div);
        content.append(i);
        return content;
    };
    var message = function(){
        var content = $('<div class="pop-content popFrame msgContent"></div>');
        var buttons = $('<div class="pop-buttons pop-row"></div>');
        var i = $('<img class="icon-img success-img" src="'+Myalert.iconSrc.message+'"></img>');

        var p = $('<p class="pc-text mc-text mainText">'+myMessage+'</p>');
        buttons.append(i);
        buttons.append(p);
        content.append(buttons);
        return content;
    };
    var alert = function(){
        var content = $('<div class="pop-content popFrame "></div>');
        // var i = $('<i class="iconfont pop-hint c-warn">&#xe64d;</i>');
        var i = $('<img class="icon-img alert-img" src="'+Myalert.iconSrc.alert+'"></img>');
        var p = $('<p class="pc-text ac-text mainText">'+myMessage+'</p>');
        content.append(i);
        content.append(p);
        var buttons = $('<div class="pop-buttons pop-row"></div>');
        var b1 = $('<button class="bt-sub-sure pop-bt">'+mySureTxt+'</button>');
        b1.click(myCallback);
        buttons.append(b1);
        if(myIsNeedExBt) {
            var b2 = $('<button class="bt-sub-cancel pop-bt">' + myCanTxt + '</button>');
            b2.click(myCancelCb);
            buttons.append(b2);
        }
        content.append(buttons);
        // var i = $('<i class="iconfont pop-close">x</i>');
        // i.click(myCancelCb);
        // content.append(i);
        return content;
    };
    var error = function(){
        var content = $('<div class="pop-content popFrame "></div>');
        // var i = $('<i class="iconfont pop-hint c-danger">&#xe649;</i>');
        var i = $('<img class="icon-img error-img" src="'+Myalert.iconSrc.error+'"></img>');
        var p = $('<p class="pc-text ac-text mainText">'+myMessage+'</p>');
        content.append(i);
        content.append(p);
        var buttons = $('<div class="pop-buttons pop-row"></div>');
        var b1 = $('<button class="bt-sub-sure pop-bt">'+mySureTxt+'</button>');
        b1.click(myCallback);
        buttons.append(b1);
        if(myIsNeedExBt) {
            var b2 = $('<button class="bt-sub-cancel pop-bt">' + myCanTxt + '</button>');
            b2.click(myCancelCb);
            buttons.append(b2);
        }
        content.append(buttons);
        // var i = $('<i class="iconfont pop-close">&#xe64c;</i>');
        // i.click(myCancelCb);
        // content.append(i);
        return content;
    };
    var load = function(){
        var content = $('<div class="pop-content popFrame loadContent"></div>');
        var p = $('<p class="pc-text mainText lc-text">'+myMessage+'</p>');
        content.append(p);
        var buttons = $('<div class="pop-buttons pop-row"></div>');
        var b1 = $('<div class="loading"></div>');
        var b2 = $('<div class="loading"></div>');
        var b3 = $('<div class="loading l-last"></div>');
        b1.click(function(){loading();});
        b3.click(stopLoading);
        buttons.append(b1);
        buttons.append(b2);
        buttons.append(b3);
        content.append(buttons);
        return content;
    };
    var topAdjust = function(typeindex){
        if(typeindex == 1){
            var offset = 50;
        }else{
            var offset = 100;
        }

        var top = window.innerHeight/2 - offset;
        return top;
    };
    var setCallback = function(callback){
        //添加回调函数
        var exeCallback = '';
        if(typeof(callback)=='function') {
            exeCallback = callback;
        }else{
            exeCallback = function(){};
        }
        var callbackFinal = function(){
            var isNeedClose = myIsNeedClose;
            exeCallback();
            if(typeof(isNeedClose)=='undefined'||isNeedClose==true){
                if(type != 1 && type != 4) {
                    cancel();
                    // console.log('exeCan');
                }
            }
        }
        myCallback = callbackFinal;
    };
    var setCancelCb = function(callback){
        var exeCallback = function(){};
        if(typeof(callback)=='function'){
            exeCallback = callback;
            // console.log('设置第二CB');
        }
        var callbackFinal = function(){
            exeCallback();
            cancel();
        }
        myCancelCb = callbackFinal;
    };
    var setSpecialExe = function(typeindex){
        var isNeedClose = myIsNeedClose;
        if(typeindex == 1){
            setTimeout(function(){
                myCallback();
            },2000);
            if(typeof(isNeedClose)=='undefined'||isNeedClose==true){
                setTimeout(function(){
                    cancel();
                },2000);
            }
            //宽度调整
            var parentDiv = $('#'+id).find('.msgContent');
            messageWidthAdjust(parentDiv,false);
        }else if(typeindex == 4){
            loading();
            //将对象暴露给控制组件
            Myalert.idAdd(self);
        }
    };
    var cancel = function(){

        $("#"+id).fadeOut(500,function(){
            $("#"+id).remove();
        });
    };
    var loading = function(index){
        if(typeof(index)=='undefined'){
            index = 0;
        }
        clearTimeout(loadingTimeout);
        var wObj = $('#'+id);
        wObj.find('.loading').eq(index%3).addClass('loadingL');
        loadingTimeout = setTimeout(function(){
            wObj.find('.loading').eq(index%3).removeClass('loadingL');
            index = (index+1)%3;
            loading(index);
        },1000);
    };
    var stopLoading = function(){
        var wObj = $('#'+id);
        wObj.find('.loading').removeClass('loadingL');
        clearTimeout(loadingTimeout);
    };
    this.end = function(){
        stopLoading();
        cancel();
    };
}

function messageWidthAdjust(parentDiv,isNormalMessage){
    // console.log(parentDiv.width());
    var p = parentDiv.find('p');
    var i = parentDiv.find('i');
    var width = window.innerWidth;
    if(i.width()+p.width()+20>200){
        //宽度问题亟待解决
        parentDiv.width(i.width()+p.width()+20);
        if(isNormalMessage == true || typeof(isNormalMessage)=='undefined') {
            var left = width / 2 - parentDiv.width() / 2;
            parentDiv.css('left', left + 'px');
        }
    }
};

function PopUpTopDefine(content){
    if(!(window.parent.frames[0] == window.self)){
        //不在iframe中，不进行特殊处理
        return;
    }
    var top = Myalert.top;
    var ctHeight = content.css('height');
    // console.log(ctHeight);
    var pxSub = function(num){
        if(typeof(num)=='number'){
            return num;
        }
        var px = num.substr(num.length-2,2);
        if(px == 'px'){
            num = num.substring(0,num.length-2);
            num = Number(num);
            return num;
        }else {
            return 0;
        }
    }
    if(typeof(top)=='false'){
        return;
    }
    top = pxSub(top);
    ctHeight = pxSub(ctHeight);

    var totalHeight = document.body.scrollHeight;
    var half = ctHeight/2
    var offsetTop = top-half;
    var offsetBottom = top+half;
    if(offsetTop<0){
        top = 0;
    }else if(offsetBottom>totalHeight){
        top = totalHeight - ctHeight;
    }else{
        top = top - half;
    }
    content.css('top',top);
}

function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}