/**
 * Created by dell on 2016/2/5.
 */
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
var getCss = function (ele, attr) {
    if ("getComputedStyle" in window) {
        var val = window.getComputedStyle(ele, null)[attr];
        //IE10下，如果没有写margin值，会默认margin值为空字符串""，如果取到的值是空字符串，设置其值为0；
        if (val) {
            return parseFloat(val);
        } else {
            return 0;
        }
    } else {
        if (attr == "opacity") {
            val = ele.currentStyle.filter;
            var reg = /alpha\(opacity=((?:\d|[1-9]\d)(?:\.\d+)?)\)/;
            if (reg.test(val)) {
                return RegExp.$1 / 100;
            } else {
                return 1;
            }
        } else {
            val = ele.currentStyle[attr];
            reg = /\d+/;
            //IE7/8下，如果没有写margin值，会默认margin值为"auto",所以匹配其内容是否含有数字，没有的话值设置为0;
            if (reg.test(val)) {
                return parseFloat(ele.currentStyle[attr]);
            } else {
                return 0;
            }
        }
    }
};
var setCss = function (ele, attr, val) {
    var reg = /^(width|height|left|top|right|bottom|((margin|padding)(Left|Top|Right|Bottom)?))$/;
    if (attr == "float") {
        ele.style.cssFloat = val;
        ele.style.styleFloat = val;
    } else if (attr == "opacity") {
        ele.style.opacity = val;
        ele.style.filter = "alpha(opacity=" + val * 100 + ")";
    } else if (reg.test(attr)) {

        ele["style"][attr] = isNaN(val) ? val : val + "px";

    } else {
        ele.style.attr = val;
    }
};
var animate = function (ele, oTarget, duration, effect, callBack) {
    //一共31种效果，常用的效果有五种，那我们把常用的效果用数字来表示
    //0表示减速，1表示匀速，2表示elastic弹性的,3表示back,返回式，4表示bounce反弹
    //再用0减速效果为默认效果
    var fnEffect = zhufengEffect.Expo.easeOut;
    if (typeof effect == "number") {
        switch (effect) {
            case 1:
                fnEffect = zhufengEffect.zfLinear;
                break;
            case 2:
                fnEffect = zhufengEffect.Elastic.easeOut;
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
    } else if (effect instanceof Array) {
        if(effect.length==1){
            fnEffect=zhufengEffect.zfLinear;
        }else if(effect.length==2){
            fnEffect = zhufengEffect[effect[0]][effect[1]];
        }
    } else if (typeof effect == "function") {
        fnEffect = zhufengEffect.Expo.easeOut;
        callBack = effect;
    }

    var oBegin = {}, oChange = {};
    for (var attr in oTarget) {
        var begin = getCss(ele, attr);
        var change = oTarget[attr] - begin;
        oBegin[attr] = begin;
        oChange[attr] = change;
    }
    var times = 0;
    var interval = 15;
    window.clearInterval(ele.timer);
    function step() {
        times += interval;
        if (times < duration) {
            for (var attr in oChange) {
                var change=oChange[attr];
                var begin=oBegin[attr];
                var val=fnEffect(times,begin,change,duration);
                setCss(ele, attr, val);
            }
        } else {
            for (var attr in oTarget) {
                var val = oTarget[attr];
                setCss(ele, attr, val);
            }
            window.clearInterval(ele.timer);
            if (typeof callBack == "function") {
                callBack.call(ele);
            }
        }
    }

    ele.timer = window.setInterval(step, interval);
};