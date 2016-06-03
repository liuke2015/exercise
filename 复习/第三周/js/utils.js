/**
 * Created by dell on 2016/5/19.
 */
var utils = {
    listToArray: function (likeAry) {
        var ary = [];
        try {
            ary = [].slice.call(likeAry, 0);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    },
    toJSON: function (str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return eval("(" + str + ")");
        }
    },
    getCss: function (curEle, attr) {
        var reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|em|rem|pt)$/, val = null;
        val = "getComputedStyle" in window ? window.getComputedStyle(curEle, null)[attr] : curEle.currentStyle[attr];
        return reg.test(val) ? parseFloat(val) : val;
    },
    offset: function (curEle) {
        var par = curEle.offsetParent,l=curEle.offsetLeft,t=curEle.offsetTop;
        while(par){
            if(navigator.userAgent.indexOf("MSIE 8.0")<0){
                l+=par.clientLeft;
                t+=par.clientTop;
            }
            l+=par.offsetLeft;
            t+=par.offsetTop;
            par = par.offsetParent;
        }
        return {
            left:l,
            top:t
        }
    }
}
