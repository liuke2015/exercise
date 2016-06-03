/*
 *utils(v1.0): 其中包含操作DOM的常用方法   Which contains the common method of operating DOM
 * by Team on 2016/05/24
 */
(function () {
    var _utils = {
        listToArray: function listToArray(likeAry) {
            var ary = [];
            try {
                ary = [].prototype.slice.call(likeAry, 0);
            } catch (e) {
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
     * Num.1:获取DOM元素的方法  Methods for obtaining DOM elements
     * */

    //1-1 getElementsByClass
    _utils.getElementsByClass = function getElementsByClass(strClass, context) {
        context = context || document;
        if ("getElementsByClassName" in document) {
            return this.listToArray(document.getElementsByClassName(strClass))
        }

        var ary = [], tagList = document.getElementsByTagName("*");
        var reg = /(^ +)|( +$)/g, cNameAry = strClass.replace(reg, "").split(/\s+/);

        for (var i = 0; i < tagList.length; i++) {
            var cur = tagList[i];
            cur.flag = true;
            for (var j = 0; j < cNameAry.length; j++) {
                var regN = new RegExp("(^| +)" + cNameAry[i] + "( +|$)");
                if (!regN.test(cur.className)) {
                    cur.flag = false;
                    break;
                }
            }
            cur.flag ? ary[ary.length] = cur : null;
        }
        return ary;
    };

    //1-2 children：获取元素在当前指定元素下的所有元素（可指定一个特定的标记）。
    _utils.children = function children(curEle, tagName) {
        var nodeList = curEle.childNodes, ary = [];
        for (var i = 0; i < nodeList.length; i++) {
            var cur = nodeList[i];
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
    }
    //1-3 prev:获取当前元素的第一个哥哥元素
    _utils.prev = function prev(curEle) {
        if ("previousElementSibling" in curEle) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre) {
            if (pre.nodeType == 1) {
                return pre;
            }
            pre = pre.previousSibling;
        }
        return null;
    };
//1-4 prevAll:获取当前元素的所有哥哥元素
    _utils.prevAll = function prevAll(curEle) {
        var ary = [], pre = this.prev(curEle);
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    };
//1-5 getIndex:获取当前元素的索引
    _utils.getIndex = function getIndex(curEle) {
        return this.prevAll(curEle).length;
    };
//1-6 next:获取当前元素的第一个弟弟元素
    _utils.next = function next(curEle) {
        if ("nextElementSibling" in curEle) {
            return curEle.nextElementSibling;
        }
        var next = curEle.nextSibling;
        while (next) {
            if (next.nodeType == 1) {
                return next;
            }
        }
        return null;
    };
//1-7 nextAll:获取当前元素的第一个弟弟元素
    _utils.nextAll = function next(curEle) {
        var ary = [], next = this.next(curEle);
        while (next) {
            ary[ary.length] = next;
            next = this.next(next);
        }
        return ary;
    };
//1-8 sibling:获取当前元素的第一个哥哥和弟弟元素
    _utils.sibling = function sibling(curEle) {
        var ary = [], pre = this.prev(curEle), next = this.next(curEle);
        pre ? ary[ary.length] = pre : null;
        next ? ary[ary.length] = next : null;
        return ary;
    };
//1-9 sibling:获取当前元素的所有兄弟元素
    _utils.siblings = function siblings(curEle) {
        var prevA = this.prevAll(curEle), nextA = this.nextAll(curEle);
        return prevA.concat(nextA);
    };
//1-10 first: 获取当前元素的第一个元素子节点（您可以指定标记的名称）
    _utils.first = function first(curEle, tagName) {
        return this.children(curEle, tagName)[0];
    };
//1-11:last:获取当前元素的最后一个元素子节点（您可以指定标记的名称）
    _utils.last = function last(curEle, tagName) {
        var child = this.children(curEle, tagName);
        return child[child.length - 1];
    };

    /*
     * Num.2:获取DOM样式元素的方法  Methods for obtaining DOM elements
     * */

//2-1 css 获取或设置当前元素的风格(第三值值获得,该值设置)。
    _utils.css = function css(curEle, attr, value) {
        //get
        var reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?(px|pt|em|rem)$/, val = null;
        if (typeof value == "undefined") {
            if ("getComputedStyle" in window) {
                val = window.getComputedStyle(curEle, null)[attr]
            } else {
                val = curEle.currentStyle[attr];
                if (attr == "opacity") {
                    var regOpa = /alpha\(opacity=(\d+)\)/;
                    if (regOpa.test(val)) {
                        return regExp.$1 / 100;
                    } else {
                        return 1;
                    }
                }
            }
            return reg.test(val) ? parseFloat(val) : val;
        }
        //set
        var regStye = /^(top|left|bottom|bottom|width|height|((margin|padding)(Left|Top|Bottom|Right)?))$/;
        if (attr == "opacity") {
            if (value >= 0 && value <= 1) {
                curEle["style"]["opacity"] = value;
                curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            }
        } else if (attr == "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;
        } else if (regStye.test(attr)) {
            curEle["style"][attr] = value + "px";
        } else {
            curEle["style"][attr] = value;
        }
    };
//2-2 setGroupCss:批量设置css
    _utils.setGroupCss = function setGroupCss(curEle, opt) {
        for (var key in opt) {
            if (opt.hasOwnProperty(key)) {
                this.css(curEle, key, opt[key]);
            }
        }
    };
    //2-3 offset :获取当前元素距离body的偏移量
    _utils.offset = function offset(curEle) {
        var par = curEle.offsetParent;
        var l = curEle.offsetLeft, t = curEle.offsetTop;
        while (par) {
            if (navigator.userAgent.indexOf("MSIE 8.0") < 0) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {top: t, left: l}
    }
    //2-4 win 获取或设置所有和浏览器的框模型信息
    _utils.win = function win(attr, value) {
        if (typeof value == "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }
    //2-5 hasClass:检测是否含有该class类名
    _utils.hasClass = function hasClass(curEle, strClass) {
        var reg = new RegExp("(^| +)" + strClass + "( +|$)");
        return reg.test(curEle.className);
    };
    //2-6 addClass 添加类名
    _utils.addClass = function addClass(curEle, strClass) {
        if (!this.hasClass(curEle, strClass)) {
            curEle.className += " " + strClass;
        }
    };
    //2-7 removeClass 移除类名
    _utils.removeClass = function removeClass(curEle, strClass) {
        var reg = new RegExp("(^| +)" + strClass + "( +|$)", "g");
        if (this.hasClass(curEle, strClass)) {
            curEle.className = curEle.className.replace(reg, " ");
        }
    }
    //2-8 toggleClass 有该类名，删除；无该类名，添加
    _utils.toggleClass = function toggleClass(curEle, strClass) {
        this.hasClass(curEle, strClass) ? this.removeClass(curEle, strClass) : this.addClass(curEle, strClass);
    };

    /*
     * Num.3:关于DOM属性 About DOM additions and deletions
     * */
    //3-1 attr  设置或获取当前元素的自定义属性的值
    _utils.attr = function attr(curEle, attr, value) {
        if (typeof value == "undefined") {
            return attr == "class" ? curEle.className : curEle.getAttribute(attr);
        }
        attr == "class" ? curEle.className = value : curEle.setAttribute(attr, value);
    };
    //3-2 html 设置或获取非表单元素的内容
    _utils.html = function html(curEle, value) {
        if (typeof value == "undefined") {
            return curEle.innerHTML;
        }
        curEle.innerHTML = value;
    };
    //3-3 val 设置或获取表单元素的内容
    _utils.val = function val(curEle, value) {
        if (typeof value == "undefined") {
            return curEle.value;
        }
        curEle.value = value;
    };
    //3-4 prepend 跟我们的appendChild相反，从容器的开始添加新的内容。
    _utils.prepend = function prepend(parentN, newEle) {
        var fir = this.first(parentN);
        fir ? parentN.insertBefore(newEle, fir) : parentN.appendChild(newEle);
    };
    //insertAfter 跟insertBefore相反，把新的元素添加到旧元素的后面
    _utils.insertAfter = function insertAfter(curEle, newEle) {
        var par = curEle.parentNode, next = this.next(curEle);
        next ? par.insertBefore(newEle, next) : par.appendChild(newEle);

    };
    //extend 作为一个合格的类库，我们需要给别人一个接口来扩展我们的方法，并且我们一般都写一个叫做扩展的方法。
    _utils.extend = function extend(opt) {
        for (var key in opt) {
            if (opt.hasOwnProperty(key)) {
                this[key] = opt[key];
            }
        }
    };
    //把私有变量_utils赋值给全局变量utils
    window.utils = _utils;
})();

//utils.isNum(val):测试数据类型 Test data type
~function (utils) {
    var obj = {
        isNum: "Number",
        isBoo: "Boolean",
        isStr: "String",
        isAry: "Array",
        isFun: "Function",
        isReg: "RegExp",
        isDate: "Date",
        isNull: "Null",
        isUnd: "Undefined",
        isObj: "Object"
    }, isType = function () {
        var dataType = arguments[0];
        return function () {
            var testObj = arguments[0];
            var reg = new RegExp("^\\[Object " + dataType + "\\]$", "i");
            return reg.test(Object.prototype.toString.call(testObj));
        };
    };
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            utils[key] = isType(obj[key]);
        }
    }
}(utils);

//直接在原型上扩展的方法 Extended method on the prototype of the built-in class
~function () {
    var aryPro = Array.prototype, strPro = String.prototype, regPro = RegExp.prototype;

    //unique 数组去重
    aryPro.unique = function unique() {
        var obj = {};
        for (var i = 0; i < this.length; i++) {
            var cur = this[i];
            obj[cur] == cur ? (this[i] = this[this.length - 1], this.length - 1, i--) : obj[cur] = cur;
        }
        obj = null;
        return this;
    };
    //myForEach：forEach compatibility
    aryPro.myForEach = function myForEach(callBack, context) {
        if (Array.prototype.forEach) {
            this.forEach(callBack, context);//return?
            return;
        }
        for (var i = 0; i < this.length; i++) {
            callBack.call(context, this[i], i, this);
        }
    };
    //myMap：map compatibility
    aryPro.myMap = function myMap(callBack, context) {
        if (Array.prototype.map) {
            return this.map(callBack, context);
        }
        for (var i = 0; i < this.length; i++) {
            this[i] = callBack.call(context, this[i], i, this);
        }
        return this;
    };
    //myTrim：Remove the string and space
    strPro.myTrim = function myTrim() {
        return this.replace(/^\s+|\s+$/g, "");
    }
    //mySub：截取指定个数字符串，中文一个汉字是2个字符 Intercept string, this method is distinguished in English
    strPro.mySub = function mySub() {
        var total = arguments[0] || 10, isD = arguments[1] || false, str = "", n = 0, reg = /^[\u4e00-\u9fa5]$/;
        for (var i = 0; i < this.length; i++) {
            var cur = this.charAt(i);
            reg.test(cur) ? n += 2 : ++n;
            if (n > total) {
                isD ? str += "..." : str;
                break;
            }
            str += cur;
        }
        return str;
    }

    //myFormatTime：Format time
    strPro.myFormatTime = function myFormatTime() {
        var reg = /^(\d{4})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:\s+)?(\d{1,2})?(?:-|\/|\.|:)?(\d{1,2})?(?:-|\/|\.|:)?(\d{1,2})?$/g, ary = [];
        this.replace(reg, function () {
            ary = [].slice.call(arguments, 1, 6);
        });
        var formate = arguments[0] || "{0}年{1}月{2}日 {3}:{4}:{5}";
        return formate.replace(/{(\d)}/g, function () {
            var val = ary[arguments[1]];
            return val.length == 1 ? "0" + val : val;
        });
    };
    //queryURLParameter：Gets the parameters in the URL address bar
    strPro.queryURLParameter = function queryURLParameter() {
        var reg = /([^=?&]?)=([^=?&]?)/g;
        var obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }
    //myExecAll：Capture all of the required content in a one-time capture
    regPro.myExecAll = function myExecAll(str) {
        var reg = this.global ? this : eval(this.toString() + "g");
        var ary = [], res = reg.exec(str);

        while (res) {
            ary[ary.length] = res[0];
            res = reg.exec(str);
        }
        return ary.length == 0 ? null : ary;
    }
}();





