/**
 * Created by Administrator on 2015/11/17 0017.
 */
/*
 * utils.js v1.0
 *
 *
 *
 *
 * */
var utils = {
    //将类数组转化为数组
    listToArray: function (likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry, 0);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    },
    //
    toJSON: function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }

};
var _utils=utils;
/*
* 1、获取相关DOM元素的方法
* */
_utils.getElementsByClassName=function(strClass,context){
    //this->utils
    context=context || document;
    //判断当前浏览器是否兼容我们的getElementByClassName这个方法，
    if("getElementsByClassName" in document){
        return this.listToArray(context.getElementsByClassName(strClass));
    }
    //"  w1  w3  "
    //去除首尾空格
    strClass.replace(/(^\s+)|(\s+$)/g,"").split(/\s+/);
    var ary=[];
};
