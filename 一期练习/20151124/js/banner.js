/**
 * Created by Administrator on 2015/11/24 0024.
 */
var dataAry = ["img/banner1.jpg", "img/banner2.jpg", "img/banner3.jpg", "img/banner4.jpg"];
/*封装常用的DOM库*/
var listToArray = function (likeAry) {
    var ary = [];
    try {
        ary = Array.prototype.slice.call(likeAry, 0);
    } catch (e) {
        for (var i = 0; i < likeAry.length; i++) {
            ary[ary.length] = likeAry[i];
        }
    }
    return ary;
}
var getElementsByClass = function (strClass, context) {
    context = context || document;
    if ("getElementsByClassName" in document) {
        return listToArray(context.getElementsByClassName(strClass));
    }
    var classAry = strClass.replace(/^ +| +$/g, "").split(/ +/);
    var tagList = context.getElementsByTagName("*");
    for (var i = 0; i < tagList.length; i++) {
        var curTag = tagList[i];
        curTag.flag = true;
        for (var j = 0; j < classAry.length; j++) {
            var reg = new RegExp("(^| +)" + classAry[j] + "( +|$");
            if (!reg.text(curTag.className)) {
                curTag.flag = false;
                break;
            }
        }
        curTag.flag ? ary[ary.length] = curTag : null;
    }
};
var getCss=function(curEle,attr){
    var reg=/^[+-]?(\d|([1-9]\d+))(\.\d+)?(px|pt|em|rem)$/,val=null;
    if("getComputedStyle" in window){
        val=window.getComputedStyle(curEle,null)[attr];
    }else{
        if(attr==="opacity"){
           var temp=curEle.currentStyle["filter"],tempReg=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
            val= tempReg.test(temp)?tempReg.exec(temp)[1]:"1";
            val=parseFloat(val)/100;
        }else{
            val=curEle.currentStyle[attr];
        }
    }
    val="getComputedStyle" in window?window.getComputedStyle(curEle,null)[attr]:curEle.currentStyle[attr];

    return reg.test(val)?parseFloat(val):val;
}
var setCss=function(curEle,attr,value){
    reg = /^(width|height|top|left|right|bottom|((margin|padding)(Left|Top|Right|Bottom)?))$/;
    if (attr === "opacity") {
        if (value >= 0 && value <= 1) {
            curEle["style"]["opacity"] = value;
            curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
        }
    } else if (attr === "float") {
        curEle["style"]["cssFloat"] = value;
        curEle["style"]["styleFloat"] = value;
    } else if (reg.test(attr)) {
        curEle["style"][attr] = isNaN(value) ? value : value + "px";
    } else {
        curEle["style"][attr] = value;
    }
};
var setGroupCss = function setGroupCss(curEle, options) {
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            this.css(curEle, key, options[key]);
        }
    }
};
/*封装常用的动画库*/
var animate=function(curEle,tarObj,duration,effect,callBack){

};
~function () {
    var banner = document.getElementById("banner");
    var bannerImg = getElementsByClass("bannerImg", banner);
    if (bannerImg.length <= 0)return;
    bannerImg = bannerImg[0];
    var bannerW=banner.clientWidth,totalW=(dataAry.length+2)*bannerW;
//图片延迟加载
    var initAsyncImg=function(){
        var divList=bannerImg.getElementsByTagName("div");
        for(var i=0;i<divList.length;i++){
            ~function(i){
                var curDiv=divList[i];
                if(! curDiv.isLoad){
                    var oImg=new Image;
                    oImg.src=curDiv.getAttribute("trueImg");
                    oImg.onload=function(){
                        curDiv.appendChild(oImg);
                        curDiv.isLoad=true;
                    }
                }
            }(i);
        }
    };
//初始化绑定数据
    var initData = function () {
        var str = "";
        str += "<div trueImg='" + dataAry[dataAry.length - 1] + "'></div>";
        for (var i = 0; i < dataAry.length; i++) {
            str += "<div trueImg='" + dataAry[i] + "'></div>";
        }
        str += "<div trueImg='" + dataAry[0] + "'></div>";
        bannerImg.innerHTML=str;

        setGroupCss(bannerImg,{
            width:totalW,
            left:-bannerW
        });
    };
    initData();
    window.setTimeout(initAsyncImg,0);
}();