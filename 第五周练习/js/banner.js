/**
 * Created by dell on 2016/2/8.
 */
var dataAry = ["img/banner1.jpg", "img/banner2.jpg", "img/banner3.jpg", "img/banner4.jpg"];
/*用到的DOM函数*/
var listToArray=function(likeAry){
    try{
        return Array.prototype.slice.call(likeAry,0);
    }catch(e){
        var ary=[];
        for(var i=0;i<likeAry.length;i++){
            ary[ary.length]=likeAry[i];
        }
        return ary;
    }
};
var getElementsByClass=function(strClass,context){
    context=context||document;
    if("getElementsByClassName" in document){
        return listToArray(document.getElementsByClassName(strClass,context));
    }
    var strAry=strClass.replace(/(^ +)|( +$)/g,"").split(/\s+/),tagList=context.getElementsByTagName("*"),ary=[];
    for(var i=0;i<tagList.length;i++){
        var curTag=tagList[i];
        curTag.flog=true;
        for(var j=0;j<strAry.length;j++){
            var reg=new RegExp("(^| +)"+strAry[j]+"( +|$)");
            if(!reg.test(curTag.className)){
                curTag.flog=false;
                break;
            }
        }
        curTag.flog?ary[ary.length]=curTag:null;
    }
    return ary;
};
var getCss=function(ele,attr){
   var reg=/^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem)$/,val=null;
    if("getComputedStyle" in window){
       val=getComputedStyle(ele,null)[attr];
    }else{
        if(attr=="opacity"){
            var regFilter=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/,tempVal=ele.currentStyle["filter"];
            val=regFilter.test(tempVal)?regFilter.exec(tempVal)[1]:"100";
            val=parseFloat(val)/100;
        }else{
            val=ele.currentStyle[attr];
        }
    }
    return reg.test(val)?parseFloat(val):val;
};
var setCss=function(ele,attr,val){
    var reg=/^(width|height|left|top|bottom|right|((margin|padding)(Right|Left)?))$/;
    if(attr=="opacity"){
        ele["style"]["opacity"]=val;
        ele["style"]["filter"]="alpha(opacity="+val*100+")";
    }else if(attr=="float"){
        ele["style"]["cssFloat"]=val;
        ele["style"]["styleFloat"]=val;
    }else if(reg.test(attr)){
        ele["style"][attr]=isNaN(val)?val:val+"px";
    }else{
        ele["style"][attr]=val;
    }
};
var setGroupCss=function(ele,options){
    for(var key in options){
        if(options.hasOwnProperty(key)){
            setCss(ele,key,options[key]);
        }
    }
};
/*动画库*/
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
var animate=function(ele,oTarget,duration,effect,callBack){
    var fnEffect=zhufengEffect.Expo.easeOut;
    if(typeof effect=="number"){
        switch (effect){
            case 1:
                fnEffect = zhufengEffect.zfLinear;
                break;
            case 2:
                fnEffect = zhufengEffect.Quart.easeInOut;
                break;
            case 3:
                fnEffect = zhufengEffect.Back.easeOut;
                break;
            case 4:
                fnEffect = zhufengEffect.zfBounce.easeOut;
                break;
            case 5:
                fnEffect = zhufengEffect.Expo.easeIn;
        }
    }else if(effect instanceof Array){
        fnEffect=effect.length==1?zhufengEffect.linear:zhufengEffect[effect[0]][effect[1]];
    }else if(typeof  effect=="function"){
        fnEffect=zhufengEffect.Expo.easeOut;
        callBack=effect;
    }
  var times= 0,interval=15,oBegin={},oChange={};
    for(var key in oTarget){
        if(oTarget.hasOwnProperty(key)){
            oBegin[key]=getCss(ele,key);
            oChange[key]=oTarget[key]-oBegin[key];
        }
    }
    //清除之前的动画
    clearInterval(ele.timer);
    //实现动画
    ele.timer=setInterval(function(){
        times+=interval;
        if(times>=duration){
           setGroupCss(ele,oTarget);
            clearInterval(ele.timer);
            if(typeof callBack=="function"){
                callBack.call(ele);
            }
            return;
        }
        for(var key in oChange){
            if(oChange.hasOwnProperty(key)){
               var val=fnEffect(times,oBegin[key],oChange[key],duration);
                setCss(ele,key,val);
            }
        }
    },interval);
};

/*轮播图代码*/
~function(){
    //获取页面元素
    var bannerBox=document.getElementById("bannerBox");
    var bannerImg=getElementsByClass("bannerImg",bannerBox);
    if(bannerImg.length<=0) return;
    bannerImg=bannerImg[0];

    var bannerTip=getElementsByClass("bannerTip",bannerBox);
    if(bannerTip.length<=0) return;
    bannerTip=bannerTip[0];

    var btnL=document.getElementById("btnP"),btnR=document.getElementById("btnN");

    //计算页面宽度
    var banW=bannerBox.clientWidth,count=dataAry.length+ 2,totalW=banW*count;
    setGroupCss(bannerImg,{
        width:totalW,
        left:-banW
    });

    //图片延时加载
    var initImg=function(){
        var divList=bannerBox.getElementsByTagName("div");
      for(var i=0;i<divList.length;i++){
          ~function(i){
              var curDiv=divList[i];
              var oImg=new Image;
              if(!oImg.isLoad){
                  oImg.src=curDiv.getAttribute("trueImg");
                  oImg.onload=function(){
                      curDiv.appendChild(oImg);
                      oImg.isLoad=true;
                  }
              }
          }(i);
      }
    };
    //数据绑定
    var initDate=function(){
        var str="",strLi="";
        str+="<div trueImg='"+dataAry[dataAry.length-1]+"'></div>";
        for(var i=0;i<dataAry.length;i++){
            str+="<div trueImg='"+dataAry[i]+"'></div>";
        }
        str+="<div trueImg='"+dataAry[0]+"'></div>";
        bannerImg.innerHTML=str;

        for(var i=0;i<dataAry.length;i++){
            i==0?strLi+="<li class='select'></li>":strLi+="<li></li>";
        }
        bannerTip.innerHTML=strLi;
    };
    initDate();
    window.setTimeout(initImg,1000);

    //轮播图
    //1、实现焦点对齐
    var autoTip=function(index){
        var liList=bannerTip.getElementsByTagName("li");
      if(index<0){
          index=liList.length-1;
      }else if(index>=liList.length){
          index=0;
      }
        for(var i=0;i<liList.length;i++){
            liList[i].className=i==index?"select":null;
        }
    };
    var step=1;
    var autoMove=function(){
        step++;
        if(step>=count-1){
            setCss(bannerImg,"left",0);
            step=1;
        }
        autoTip(step-1);
        animate(bannerImg,{left:-step*banW},600,3);
    };
    bannerImg.autoTimer=setInterval(autoMove,3000);

    //点击切换
    var liList=bannerTip.getElementsByTagName("li");
    for(var i=0;i<liList.length;i++){
        liList[i].i=i;
        liList[i].onclick=function(){
            step=this.i+1;
            autoTip(this.i);
            animate(bannerImg,{left:-step*banW},600,3);
        }
    }

    //左右按钮隐现
    bannerBox.onmouseover=function(){
        clearInterval(bannerImg.autoTimer);
        btnL.style.display=btnR.style.display="block";
    };
    bannerBox.onmouseout=function(){
        bannerImg.autoTimer=setInterval(autoMove,3000);
        btnL.style.display=btnR.style.display="none";
    };
    btnL.onclick=function(){
        autoMove();
    };
    btnR.onclick=function(){
        step--;
        if(step<=0){
            setCss(bannerImg,"left",-banW*(liList.length+1))
            step=4;
        }
        autoTip(step-1);
        animate(bannerImg,{left:-step*banW},600,3);
    }
}();