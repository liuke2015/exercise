/**
 * Created by dell on 2016/1/25.
 */
var DOM = {};
var _DOM = DOM;
_DOM.listToArray = function listToArray(likeAry) {
    try {
        return Array.prototype.slice.call(likeAry, 0);
    } catch (e) {
        var ary = [];
        for (var i = 0; i < likeAry.length; i++) {
            ary[ary.length] = likeAry[i];
        }
        return ary;
    }
};
_DOM.toJSON = function toJSON(str) {
    return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
};
_DOM.offset = function offset(curEle) {
    var p = curEle.parentNode, l = curEle.offsetLeft, t = curEle.offsetTop;
    while (p) {
        if (navigator.userAgent.indexOf("MSIE 8.0") < 0) {
            l += p.clientLeft;
            t += p.clientTop;
        }
        l += p.offsetLeft;
        t += p.offsetTop;
        p = p.offsetParent;
    }
    return {left: l, top: t};
};
_DOM.getIndex = function getIndex(curEle) {
    var index = 0, p = curEle.previousSibling;
    while (p) {
        if (p.nodeType == 1) {
            index++;
        }
        p = p.previousSibling;
    }
    return index;
};
_DOM.prepend = function prepend(curEle, child) {
    curEle.insertBefore(child, curEle.firstChild);
};
_DOM.insertAfter = function insertAfter(newEle, oldEle) {
    oldEle.parentNode.insertBefore(newEle, oldEle.previousSibling);
};
_DOM.siblings = function siblings(curEle) {
    var pre = curEle.previousSibling, next = curEle.nextSibling, a = [];
    while (pre) {
        if (pre.nodeType == 1) {
            a.unshift(pre);
        }
        pre = pre.previousSibling;
    }
    while (next) {
        if (next.nodeType == 1) {
            a.push(next);
        }
        next = next.nextSibling;
    }
    return a;
};
_DOM.trim=function trim(str){
    var reg= /^\s+|\s+$/g;
    if(str.trim){
        str.trim();
    }else{
        str=str.replace(reg,"");
    }
    return str;
};
_DOM.getELementsByClassName = function getElementsByClassName(strClass, context) {
    context = context || document;
    var eles = context.getElementsByTagName("*");
    strClass=this.trim(strClass);
    var classAry=strClass.split(/ +/);
    for(var i=0;i<classAry.length;i++){
        var cName=classAry[i],regName=new RegExp("(^| )"+cName+"( |$)"),ary=[];
        for(var j=0;j<eles.length;j++){
            var ele=eles[j];
            if(regName.test(ele.className)){
                ary.push(ele);
            }
        }
        eles=ary;
    }
   return eles;
};
_DOM.addClass=function addClass(curEle,strClass){
    var reg=new RegExp("(^| )"+strClass+"( |$)","g");
    if(!reg.test(curEle.className)){
        curEle.className=this.trim(curEle.className)+" "+strClass;
    }
};
_DOM.removeClass=function removeClass(curEle,strClass){
    var reg=new RegExp("(^| )"+strClass+"( |$)","g");
    if(reg.test(curEle.className)){
        curEle.className=curEle.className.replace(reg," ");
    }
    this.trim(curEle.className);
};
_DOM.children=function children(curEle){
    var children=curEle.childNodes,ary=[];
    for(var i=0;i<children.length;i++){
        var child=children[i];
        if(child.nodeType==1){
            ary[ary.length]=child;
        }
    }
    return ary;
};
_DOM.next=function next(curEle){
    var next=curEle.nextSibling;
    while(next){
        if(next.nodeType==1){
            return next;
        }
        next=next.nextSibling;
    }
    return null;
};
