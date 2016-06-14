/**
 * Created by dell on 2016/2/5.
 */
/*var _utils={
    css : function css(curEle, attr, value) {
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
}
};
window.utils=_utils;*/
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
function animate(ele, oTarget, duration,effect, callBack) {
    //一共31种效果，常用的效果有五种，那我们把常用的效果用数字来表示
    //0表示减速，1表示匀速，2表示elastic弹性的,3表示back,返回式，4表示bounce反弹
    //再用0减速效果为默认效果
    var fnEffect=zhufengEffect.Expo.easeInOut;
    if(typeof effect =="Number"){
        switch (effect){
            case 1:
                fnEffect=zhufengEffect.zfLinear;
                break;
            case 2:
                fnEffect=zhufengEffect.Quart.easeInOut;
                break;
            case 3:
                fnEffect=zhufengEffect.Back.easeOut;
                break;
            case 4:
                fnEffect=zhufengEffect.zfBounce.easeOut;
                break;
            case 5:
                fnEffect=zhufengEffect.Expo.easeIn;
                break;
            default :
                fnEffect=zhufengEffect.Expo.easeInOut;
        }
    }else if(effect instanceof Array){
        if(effect.length==1){zfLinear
            fnEffect=zhufengEffect.zfLinear;
        }else if(effect.length==2){
            fnEffect=zhufengEffect[effect[0]][effect[1]];
        }
    }else if(typeof effect=="function"){
        callBack=effect;
        fnEffect=zhufengEffect.Expo.easeInOut;
    }

    clearTimeout(ele.timer);
    var oBegin = {}, oChange = {}, timers = 0, interval = 13;
    for (var key in oTarget) {
        oBegin[key] = parseFloat(utils.css(ele, key));
        oChange[key] = oTarget[key] - oBegin[key];
    }
    function step() {
        timers += interval;
        if (timers < duration) {
            for (var key in oTarget) {
                var val=fnEffect(timers,oBegin[key],oChange[key],duration);
               /* if(key=="opacity"){
                 console.log(val);
                 }*/
                utils.css(ele, key, val);
            }
        } else {
            for (var key in oTarget) {
                utils.css(ele, key, oTarget[key]);
            }
            clearInterval(ele.timer);
            if (typeof callBack == "function") {
                callBack.call(ele);
            }
        }
    }
    ele.timer=window.setInterval(step,interval);
}
