var utils = {
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
    toJSON: function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    },
    offset: function (curEle) {
        var p = curEle.offsetParent, l = curEle.offsetLeft, t = curEle.offsetTop;
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
    },
    getCss: function (curEle, attr) {
        var reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|em|rem|pt)$/, val = null;
        val = "getComputedStyle" in window ? window.getComputedStyle(curEle, null)[attr] : curEle.currentStyle[attr];
        return reg.test(val) ? parseFloat(val) : val;
    }
};