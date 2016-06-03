var DOM = {};
DOM.index = function index(ele) {
    var pres = this.prevAll(ele), n = pres.length;
    return n;
};
DOM.children = function (ele, tName) {
    var ary = [], reg = null;
    var childNodes = ele.childNodes;
    if (typeof tName == "string") {
        tName = tName.toUpperCase();
        reg = new RegExp("^" + tName + "$");
    } else if (typeof tName == "undefined") {
        reg = /^[A-Z][A-Z0-9_]*$/;
    } else {
        throw new error("第二个参数错误~");
    }

    for (var i = 0; i < childNodes.length; i++) {
        var child = childNodes[i];
        if (reg.test(child.nodeName)) {
            ary[ary.length] = child;
        }
    }
    return ary;
};
DOM.getElementsByClass = function (cName, context) {
    context = context || document;
    var eles = context.getElementsByTagName("*"), ary = [];

    //类名去除首尾空格
    if (cName.trim) {
        cName = cName.trim();
    } else {
        var reg = /^ +| +$/g;
        cName = cName.replace(reg, "");
    }

    //将类名切成数组
    var cAry = cName.split(/ +/);

    for (var i = 0; i < cAry.length; i++) {
        var cur = cAry[i], ary = [];
        var regN = new RegExp("(^| )" + cur + "( |$)");
        for (var j = 0; j < eles.length; j++) {
            if (regN.test(eles[j].className)) {
                ary[ary.length] = eles[j];
            }
        }
        eles = ary;
    }
    return ary;
};
DOM.prev = function (ele) {
    if ("previousElementSibling" in ele) {
        return ele.previousElementSibling;
    }
    var pre = ele.previousSibling;
    while (pre) {
        if (pre.nodeType == 1) {
            return pre;
        }
        pre = pre.previousSibling;
    }
    return null;
};
DOM.next = function (ele) {
    if ("nextElementSibling" in ele) {
        return ele.nextElementSibling;
    }
    var next = ele.nextSibling;
    while (next) {
        if (next.nodeType == 1) {
            return next;
        }
        next = next.nextSibling;
    }
    return null;
};
DOM.prevAll = function (ele) {
    var ary = [];
    var pre = this.prev(ele);
    while (pre) {
        ary[ary.length] = pre;
        pre = this.prev(pre);
    }
    return ary;
};
DOM.nextAll = function (ele) {
    var ary = [];
    var nex = this.next(ele);
    while (nex) {
        ary[ary.length] = nex;
        nex = this.next(nex);
    }
    return ary;
};
DOM.siblings = function (ele) {
    var ary1 = this.prevAll(ele), ary2 = this.nextAll(ele);
    return ary1.concat(ary2);
};
DOM.addClass = function (ele, cName) {
    var reg = new RegExp("(^| )" + cName + "( |$)", "gi");
    if (!reg.test(ele.className)) {
        ele.className += " " + cName;
    }
};
DOM.removeClass = function (ele, cName) {
    var reg = new RegExp("(^| )" + cName + "( |$)", "gi");
    ele.className= ele.className.replace(reg, " ");
}
