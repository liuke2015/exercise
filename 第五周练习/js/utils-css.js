/**
 * Created by dell on 2016/2/11.
 */
~function(){
    utils={
        getCss:function (ele, attr) {
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
        },
        setCss:function (ele, attr, val) {
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
        },
        setGroupCss:function(curEle,options){
        for(var key in options){
            if(options.hasOwnProperty(key)){
                this.setCss(curEle,key,options[key]);
            }
        }
    }
    }
}();

