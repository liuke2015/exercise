
var zhufengEffect = {
    //当前时间*变化量/持续时间+初始值
    zfLinear: function (t, b, c, d) {
        return c * t / d + b;
    },
    Quad: {//二次方的缓动（t^2）；
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    },
    Cubic: {//三次方的缓动（t^3）
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {//四次方的缓动（t^4）；
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    },
    Quint: {//5次方的缓动（t^5）；
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {//正弦曲线的缓动（sin(t)）
        easeIn: function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOut: function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOut: function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }
    },
    Expo: {//指数曲线的缓动（2^t）；
        easeIn: function (t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOut: function (t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {//圆形曲线的缓动（sqrt(1-t^2)）；
        easeIn: function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function (t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {//指数衰减的正弦曲线缓动；
        easeIn: function (t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function (t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        easeInOut: function (t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }
    },
    Back: {//超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；
        easeIn: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    },
    zfBounce: {//指数衰减的反弹缓动。
        easeIn: function (t, b, c, d) {
            return c - zhufengEffect.zfBounce.easeOut(d - t, 0, c, d) + b;
        },
        easeOut: function (t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOut: function (t, b, c, d) {
            if (t < d / 2) return zhufengEffect.zfBounce.easeIn(t * 2, 0, c, d) * .5 + b;
            else return zhufengEffect.zfBounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    }
};
function animate(ele, oTarget, duration,effect, callBack) {
    //一共31种效果，常用的效果有五种，那我们把常用的效果用数字来表示
    //0表示减速，1表示匀速，2表示elastic弹性的,3表示back,返回式，4表示bounce反弹
    //再用0减速效果为默认效果
    var fnEffect=zhufengEffect.Expo.easeInOut;
    if(typeof effect =="Number"){
        switch (effect){
            case 1:
                fnEffect=zhufengEffect.zfLinear;
                break;
            case 2:
                fnEffect=zhufengEffect.Quart.easeInOut;
                break;
            case 3:
                fnEffect=zhufengEffect.Back.easeOut;
                break;
            case 4:
                fnEffect=zhufengEffect.zfBounce.easeOut;
                break;
            case 5:
                fnEffect=zhufengEffect.Expo.easeIn;
                break;
            default :
                fnEffect=zhufengEffect.Expo.easeInOut;
        }
    }else if(effect instanceof Array){
        if(effect.length==1){
            fnEffect=zhufengEffect.zfLinear;
        }else if(effect.length==2){
            fnEffect=zhufengEffect[effect[0]][effect[1]];
        }
    }else if(typeof effect=="function"){
        callBack=effect;
        fnEffect=zhufengEffect.Expo.easeInOut;
    }


    var oBegin = {}, oChange = {}, timers = 0, interval = 13;
    for (var key in oTarget) {
        oBegin[key] = parseFloat(utils.css(ele, key));
        oChange[key] = oTarget[key] - oBegin[key];
    }
    //1)清除之前正在运行的动画
    window.clearInterval(ele.timer);
    //2)开始设置新的动画执行我们的操作
    ele.timer=window.setInterval(function(){
        timers += interval;
        if(timers>=duration){
            for (var key in oTarget) {
                utils.css(ele, key, oTarget[key]);
            }
            window.clearInterval(ele.timer);
            if (typeof callBack == "function") {
                callBack.call(ele);
            }
            return;
        }
        for (var key in oTarget) {
            var val=fnEffect(timers,oBegin[key],oChange[key],duration);
            utils.css(ele, key, val);
        }
    },interval);
}


var dataAry = ["images/banner1.jpg", "images/banner2.jpg", "images/banner3.jpg", "images/banner4.jpg"];

var oBox=document.getElementById("box"),oPicList=document.getElementById("picList"),oTip=document.getElementById("tip");
//绑定数据
function bindPic() {
    if (!dataAry) {
        return
    }
    var strP="",strT="";
    strP+='<li trueImg="'+dataAry[dataAry.length-1]+'"></li>';
    for(var i=0;i<dataAry.length;i++){
        strP+='<li trueImg="'+dataAry[i]+'"></li>';
    }
    strP+='<li trueImg="'+dataAry[0]+'"></li>';
    oPicList.innerHTML=strP;
    for(var i=0;i<dataAry.length;i++){
        i==0?strT+='<li class="select"></li>':strT+='<li></li>';
    }
    oTip.innerHTML=strT;
}
bindPic();
//图片延时加载
var liList=oPicList.getElementsByTagName("li");
function initImg(){
    for(var i=0;i<liList.length;i++){
        ~function(i){
            var curLi=liList[i];
            if(!curLi.isLoad){
                var oImg=new Image;
                oImg.src=curLi.getAttribute("trueImg");
                oImg.onload=function(){
                    curLi.appendChild(oImg);
                    curLi.isLoad=true;
                }
            }
        }(i);
    }
}
initImg();
//动态设置picList的width
utils.setGroupCss(oPicList,{
        "width":1000*liList.length,
        "left":-1000
});
//自动轮播
var index=1;
function autoMove(){
    index++;
    if(index>dataAry.length){
        index=1;
        utils.css(oPicList,"left",0);
    }
    if(index<0){
        index=3;
        utils.css(oPicList,"left",-4*1000);
    }
    autoTip(index);
    animate(oPicList,{"left":-index*1000},800,2);
};
oPicList.autoMove=window.setInterval(autoMove,3000);
//焦点对齐
var tipList=oTip.getElementsByTagName("li");
function autoTip(index){
    var tipAry=utils.listToArray(tipList);
    index--;
    if(index<0){
        index=dataAry.length-1;
    }
    tipAry.myForEach(function(cur,i,ary){
        cur.className=i==index?"select":null;
    })
}
//点击焦点切换图片
for(var i=0;i<tipList.length;i++){
    var curT=tipList[i];
    curT.index=i;
    curT.onclick=function(){
        index=this.index+1;
        autoTip(index);
        animate(oPicList,{"left":-index*1000},800,2);
    };
}
//点击btn按钮实现切换
var btnL=document.getElementById("btnL"),btnR=document.getElementById("btnR");
btnR.onclick=function(){
    autoMove();
}
btnL.onclick=function(){
    index-=2;
    autoMove();
};
btnR.onmouseenter=btnL.onmouseenter=function(){
    var _this=this;
    utils.css(_this,"opacity",0.8);
}
btnR.onmouseleave=btnL.onmouseleave=function(){
    var _this=this;
    utils.css(_this,"opacity",0.5);
}

oBox.onmouseenter=function(){
    window.clearInterval(oPicList.autoMove);
    btnL.style.display="block";
    btnR.style.display="block";
};
oBox.onmouseleave=function(){
    oPicList.autoMove=window.setInterval(autoMove,3000);
    btnL.style.display="none";
    btnR.style.display="none";
};

