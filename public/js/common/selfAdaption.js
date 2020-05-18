/**
 * Created by zqf on 2017/7/28.
 */

function selfAdaption(correctScale){
    var dpr, rem, scale;
    var docEl = document.documentElement;
    var fontEl = document.createElement('style');
    var metaEl = document.querySelector('meta[name="viewport"]');
    dpr = window.devicePixelRatio || 1;
    scale = 1 / dpr;

    if(!window.myWidth){
        window.myWidth = $(window).width();
    }
    rem = window.myWidth / 10 * 2;
    if(correctScale){
        scale = correctScale;
    }else{
        scale = 1 / dpr;
    }

    // 设置viewport，进行缩放，达到高清效果
    //metaEl.setAttribute('content', 'width=' + window.myWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

    // 设置data-dpr属性，留作的css hack之用
    docEl.setAttribute('data-dpr', dpr);

    // 动态写入样式
    docEl.firstElementChild.appendChild(fontEl);
    fontEl.innerHTML = 'html{font-size:' + rem + 'px !important;}';
//            alert("metaEl:"+" "+'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
    // 给js调用的，某一dpr下rem和px之间的转换函数
    window.rem2px = function(v) {
        v = parseFloat(v);
        return v * rem;
    };
    window.px2rem = function(v) {
        v = parseFloat(v);
        return v / rem;
    };

    window.dpr = dpr;
    window.rem = rem;
}