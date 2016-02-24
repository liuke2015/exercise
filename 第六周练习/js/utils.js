/**
 * utils(v1.0):关于DOM操作的常用方法
 * by Team on 2016/1/26
 */
(function () {
    var _utils = {
        listToArray: function listToArray(likeAry) {
            try {
                return Array.prototype.slice.call(likeAry, 0);
            } catch (e) {
                var ary = [];
                for (var i = 0; i < likeAry.length; i++) {
                    ary[ary.length] = likeAry[i];
                }
            }
            return ary;
        },
        toJSON: function toJSON(str) {
            return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
        }
    };
    /*
     * 1、获取DOM元素节点的方法
     * */
    //通过类名获取元素
    _utils.getElementsByClassName = function getElementsByClassName(strClass, context) {
        /*  context=context||document;
         if("getElementsByClassName" in document){
         return this.listToArray(document.getElementsByClassName(strClass));
         }
         var regTime=/(^ +)|( +$)/g,aryClass =strClass.replace(regTime,"").split(/\s+/),tagList=context.getElementsByTagName("*"),ary=[];
         for(var i=0;i<tagList.length;i++){
         var cur=tagList[i];
         cur.flag=true;
         for(var k=0;k<aryClass.length;k++){
         var reg=new RegExp("(^| +)"+aryClass[k]+"( +|$)");
         if(!reg.test(cur.className)){
         cur.flag=false;
         break;
         }
         }
         if(cur.flag){
         ary[ary.length]=cur;
         }
         }
         return ary;*/
        context = context || document;
        if ("getElementsByClassName" in document) {
            return this.listToArray(context.getElementsByClassName(strClass));
        }
        var regTrim = /(^ +)|( +$)/g, aryClass = strClass.replace(regTrim, "").split(/\s+/), tagList = context.getElementsByTagName("*"), ary = [];
        for (var i = 0; i < tagList.length; i++) {
            var cur = tagList[i];
            cur.flag = true;
            for (var k = 0; k < aryClass.length; k++) {
                var reg = new RegExp("(^| +)" + aryClass[k] + "( +|$)");
                if (!reg.test(cur.className)) {
                    cur.flag = false;
                    break;
                }
            }
            if (cur.flag) {
                ary[ary.length] = cur;
            }
        }
        return ary;
    };
    //获取某元素下的所有元素子节点
    _utils.children = function children(curEle, tagName) {
        /*  var nodes=curEle.childNodes,ary=[];
         for(var i=0;i<nodes.length;i++){
         var cur=nodes[i];
         if(cur.nodeType==1){
         if(typeof tagName=="String"){
         if(cur.nodeName.toLowerCase()==tagName.toLowerCase()){
         ary[ary.length]=cur;
         }
         continue;
         }
         ary[ary.length]=cur;
         }
         }
         return ary;*/
        var nodes = curEle.childNodes, ary = [];
        for (var i = 0; i < nodes.length; i++) {
            var cur = nodes[i];
            if (cur.nodeType == 1) {
                if (typeof tagName == "string") {
                    if (cur.nodeName.toLowerCase() == tagName.toLowerCase()) {
                        ary[ary.length] = cur;
                    }
                    continue;
                }
                ary[ary.length] = cur;
            }
        }
        return ary;
    };
    //获得元素哥哥节点
    _utils.prev = function prev(curEle) {
        if ("previousElementSibling" in curEle) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    };
    //获得元素所有哥哥节点
    _utils.prevAll = function prevAll(curEle) {
        var pre = this.prev(curEle), ary = [];
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre)
        }
        return ary;
    };
    //获得元素索引位置
    _utils.getIndex = function getIndex(curEle) {
        return this.prevAll(curEle).length;
    };
    //获取元素弟弟节点
    _utils.next = function next(curEle) {
        if ("nextElementSibling" in curEle) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        if (nex && nex.nodeType !== 1) {
            nex = nex.nextSibing;
        }
        return nex;
    };
    //获取元素所有弟弟节点
    _utils.nextAll = function nextAll(curEle) {
        var nex = this.next(curEle), ary = [];
        while (nex) {
            ary[ary.length] = nex;
            nex = this.next(nex);
        }
        return ary;
    };
    //获取元素兄弟节点
    _utils.sibling = function sibling(curEle) {
        var pre = this.prev(curEle), nex = this.next(curEle), ary = [];
        pre ? ary[ary.length] = pre : void 0;
        nex ? ary[ary.length] = nex : void 0;
        return ary;
    };

    //获取元素所有兄弟节点
    _utils.siblings = function siblings(curEle) {
        var pre = this.prevAll(curEle), nex = this.nextAll(curEle);
        return pre.concat(nex);
    }
    //获取元素第一个子节点
    _utils.first = function first(curEle, tagName) {
        return this.children(curEle, tagName)[0];
    };
    //获取元素最后一个子节点
    _utils.last = function last(curEle, tagName) {
        var children = this.children(curEle, tagName);
        return children[children.length - 1];
    };
    /*
     * 2、获取、设置DOM样式的方法
     */
    //获取、设置元素样式值
    _utils.css = function css(curEle, attr, value) {
        //get
        var reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem)$/;
        if (typeof value === "undefined") {
            var val = 0;
            if ("getComputedStyle" in window) {
                val = window.getComputedStyle(curEle, null)[attr];
                if (attr == "margin" && val == "") { //IE10下，如果没有写margin值，会默认margin值为空字符串""，如果取到的值是空字符串，设置其值为0；
                    return 0;
                }
            } else {
                if (attr == "opacity") {
                    val = curEle.currentStyle.filter;
                    var reg = /alpha\(opacity=((?:\d|[1-9]\d)(?:\.\d+)?)\)/;
                    if (reg.test(val)) {
                        return RegExp.$1 / 100;
                    } else {
                        return 1;
                    }
                } else {
                    val = curEle.currentStyle[attr];
                    if(attr=="margin"&&val=="auto"){ //IE7/8下，如果没有写margin值，会默认margin值为"auto",所以匹配其内容是否含有数字，没有的话值设置为0;
                        return 0;
                    }
                }
            }
            return reg.test(val) ? parseFloat(val) : val;
        }
        //set
        var reg = /^(width|height|top|left|right|bottom|((margin|padding)(Left|Top|Bottom|Right)?))$/;
        if (attr == "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;
        } else if (attr == "opacity") {
            if (value >= 0 && value <= 1) {
                curEle["style"]["opacity"] = value;
                curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            }
        } else if (reg.test(attr)) {
            curEle["style"][attr] = isNaN(value) ? value : value + "px";
        } else {
            curEle["style"][attr] = value;
        }
    };
    //批量设置元素样式值
    _utils.setGroupCss = function setGroupCss(curEle, options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this.css(curEle, key, options[key]);
            }
        }
    };
    //获取元素距离body的偏移量
    _utils.offset = function offset(curEle) {
        var l = curEle.offsetLeft, t = curEle.offsetTop, p = curEle.offsetParent;
        while (p) {
            if (navigator.userAgent.indexOf("MSIE 8.0") < 0) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {top: t, left: l};
    };
    //获取或设置所有和浏览器的框模型信息/
    _utils.win = function win(attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    };
    //判断某元素是否含有指定类名
    _utils.hasClass = function hasClass(curEle, strClass) {
        var reg = new RegExp("(^| )" + strClass + "( |$)");
        return reg.test(curEle.className);
    };
    //给某元素添加指定类名
    _utils.addClass = function addClass(curEle, strClass) {
        if (!this.hasClass(curEle, strClass)) {
            curEle.className += " " + strClass;
        }
    };
    //给某元素删除指定类名
    _utils.removeClass = function removeClass(curEle, strClass) {
        if (this.hasClass(curEle, strClass)) {
            var reg = new RegExp("(^| )" + strClass + "( |$)", "g");
            curEle.className = curEle.className.replace(reg, " ");
        }
    };
    //判断某元素是否含有指定类名，有的话删除该类名，没有的话添加该类名
    _utils.toggleClass = function toggleClass(curEle, strClass) {
        this.hasClass(curEle, strClass) ? this.removeClass(curEle, strClass) : this.addClass(curEle, strClass);
    };
    /*
     * Num.3 : DOM的增加和删除
     */
    //设置或者获取元素的属性值
    _utils.attr = function attr(curEle, attr, value) {
        if (typeof value === "undefined") {
            return attr == "class" ? curEle.className : curEle.getAttribute(attr);
        }
        attr == "class" ? curEle.className = value : curEle.setAttribute(attr, value)
    };
    //设置或者获取非表单元素值
    _utils.html = function html(curEle, value) {
        if (typeof value === "undefined") {
            return curEle.innerHTML;
        }
        curEle.innerHTML = value;
    };
    //设置或者获取表单元素值
    _utils.val = function val(curEle, value) {
        if (typeof value === "undefined") {
            return curEle.value;
        }
        curEle.value = value;
    };
    //在元素内的最前面插入新的子节点
    _utils.prepend = function prepend(container, newEle) {
        var fir = this.first(container);
        fir ? container.insertBefore(newEle, fir) : container.appendChild(newEle);
    };
    //在旧元素后面插入新的子节点
    _utils.insertAfter = function insertAfter(oldEle, newEle) {
        var nex = this.next(oldEle), p = oldEle.parentNode;
        nex ? p.insertBefore(newEle, nex) : p.appendChild(newEle);
    };
    //扩展接口
    _utils.extend = function extend(options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
    };
    window.utils = _utils;
})();

~function () {
    var aryPro = Array.prototype, strPro = String.prototype, regPro = RegExp.prototype;
    //数组去重
    aryPro.unique = function unique() {
        var obj = {};
        for (var i = 0; i < this.length; i++) {
            var cur = this[i];
            obj[cur] == cur ? (this[i] = this[this.length - 1], this.length -= 1, i--) : obj[cur] = cur;
        }
        obj = null;
        return this;
    };
    //重写数组forEach方法，兼容各浏览器
    aryPro.myForEach = function myForEach(callBack, context) {
        if ("forEach" in Array.prototype) {
            return this.forEach(callBack, context);
        } else {
            for (var i = 0; i < this.length; i++) {
                callBack.call(context, this[i], i, this);
            }
        }
    };
    //重写数组map方法，兼容各浏览器
    aryPro.myMap = function myMap(callBack, context) {
        if ("map" in Array.prototype) {
            return this.map(callBack, context);
        } else {
            for (var i = 0; i < this.length; i++) {
                this[i] = callBack.call(context, this[i], i, this);
            }
        }
        return this;
    };
    //首尾去空格
    strPro.myTrim = function myTrim() {
        return this.replace(/(^\s+|\s+$)/g, "");
    };
    //截取指定个数字符串，英文一个字母算一位，中文一个汉字算两位
    strPro.mySub = function mySub() {
        var len = arguments[0] || 10, isD = arguments[1] || false, n = 0, str = "";
        for (var i = 0; i < this.length; i++) {
            var s = this.charAt[i];
            /[\u4e00-\u9fa5]/.test(s) ? n += 2 : n++;
            if (n > len) {
                isD ? str += "..." : void 0;
                break;
            }
            str += s;
        }
        return str;
    };
    //格式化时间字符串
    strPro.myFormatTime = function myFormateTime() {
        var reg = /^(\d{4})(?:-|\/|\.)(\d{1,2})(?:-|\/|\.)(\d{1,2})(?:\s+)(\d{1,2})(?:-|\/|\.)(\d{1,2})(?:-|\/|\.)(\d{1,2})$/, ary = [];
        this.replace(reg, function () {
            ary = (Array.prototype.slice.call(arguments)).slice(1, 7);
        });
        var str = arguments[0] || "{0}年{1}月{2}日 {3}时:{4}分:{5}秒";
        str = str.replace(/\{(\d+)\}/g, function () {
            var val = ary[arguments[1]];
            return val.length == 1 ? "0" + val : val;
        });
        return str;
    };
    //获取URL中参数
    strPro.queryUrlParameter = function queryUrlParameter() {
        var reg = /([^?=&])=([^?=&])/g, obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    };
    //重写exec方法，捕获所有符合条件的字符串，放入数组中
    regPro.myExecAll = function myExecAll(str) {
        reg = this.global ? str : eval(this.toString() + "g");
        var ary = [], res = reg.exec(str);
        while (res) {
            ary[ary.length] = res;
            res = reg.exec(str);
        }
        return ary.length == 0 ? null : ary;
    }

}();