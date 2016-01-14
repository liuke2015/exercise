/**
 * Created by Administrator on 2015/12/17 0017.
 */
function bind(ele, type, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn, false);
    } else {
        if (!ele["aEvent" + type]) {
            ele["aEvent" + type] = []
        }
        var tempFn = function () {
            fn.call(ele);
        };
        tempFn.photo = fn;
        var ary = ele["aEvent" + type];
        for (var i = 0; i < ary.length; i++) {
            if (ary[i].photo == fn)return;
        }
        ary.push(tempFn);
        ele.attachEvent("on" + type, tempFn);
    }
}
function on(ele, type, fn) {
    ele.innerHTML=ele.x+" "+this.y+" "+" "+this.px+" "+this.px;
    if (!ele["eventAry" + type]) {
        ele["eventAry" + type] = [];
    }
    var ary = ele["eventAry" + type];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] == fn)return;
    }
    ary.push(fn);
    bind(ele, type, run);
}
function run(e) {
    e = e || window.event;
    if (!e.target) {
        e.target = e.srcElement;
        e.preventDefault = function () { e.returnValue = false;};
        e.stopPropagation = function () { e.cancelBubble = true;};
        e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        e.pageY = e.clientY + (document.documentElement.scrollTOp || document.body.scrollTop);
    }
    var type = e.type;
    var ary = this["eventAry" + type];
    for (var i = 0; i < ary.length; i++) {
        if (!ary[i]) {
            ary.splice(i, 1);
        } else {
            ary[i].call(this,e);
        }
    }
}
function off(ele, type, fn) {
    var ary = ele["eventAry" + type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] == fn) {
                ary[i] = null;
                break;
            }
        }
    }
}