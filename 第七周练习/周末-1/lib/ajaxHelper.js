/**
 * Created by dell on 2016/3/18.
 */
(function () {
    //防止重复加载
    if (this.x) {
        return;
    }
    //给window声明一个对象x
    var x = this.x = {};

    //默认参数配置
    var setting = {
        url: "",
        type: "",
        data: {},
        passName: "",
        passWord: "",
        async: true,
        cache: false,
        dataType: "text",
        success: function () {
        },
        error: function () {
        },
        timeout: 0,
        context: window
    };

    x.$http = function (opt) {
        if(!util.isObject(opt)){
            throw new error("参数必须是一个对象");
        }
        var _opt={};
        for(var n in setting){
            if(!setting.hasOwnProperty(n)) continue;
            _opt[n]=opt[n]||setting[n];
        }
        var xhr=util.getXHR();
        //判断_opt.type是否合法
        if(!/^(get|post|put|options|head|delete)$/ig.test(_opt.type)){
            throw new Error("http方法不合法");
        }
        //完善_opt.url
        //1、判断是_opt.data是否为对象数据类型，是的话转换成查询字符串方式
        if(util.isObject(_opt.data)){
            var ary=[];
            for(var n in _opt.data){
                if(!_opt.data.hasOwnProperty(n))continue;
                ary.push(encodeURIComponent(n)+"="+encodeURIComponent(_opt.data[n]));
            }
            _opt.data=ary.join("&");
        }
        //2、判断是否为get系方式，如果为get，将data放在url后面
        if(/^(get|delete|head)&/ig.test(_opt.type)){
             _opt.url+=(/\?/.test(_opt.url)?"&":"?")+_opt.data;
            _opt.data=null;
        }
        //3、判断是否需要缓存，不需要的话，要给url最后加上随机数
        if(_opt.cache==false){
            var random=(~~(Math.random()*0xffffff)).toString(32);
            _opt.url+=(/\?/.test(_opt.url)? "&":"?")+"_="+random;
        }
        xhr.open(_opt.type,_opt.url,_opt.async,_opt.passName,_opt.passWord);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4 && /^2\d{2}/.test(xhr.status)){
                var txt=xhr.responseText;
                if(_opt.dataType.toUpperCase()=="JSON"){
                    try{
                        txt=util.JSONparse(txt);
                    }catch(e){
                        _opt.error(e);
                        return;
                    }
                }

                _opt.success(txt);
            }
        };
        xhr.send(_opt.data);
        if(util.isNumber(_opt.timeout)&&_opt.timeout>0){
            if("timeout" in xhr){
                xhr.timeout=_opt.timeout;
                xhr.ontimerout=function(){
                    _opt.error();
                }
            }else{
                setTimeout(function(){
                    if(xhr.readyState!==4){
                        xhr.abort();
                    }
                },_opt.timeout);
            }
        }
    };
    var isType = function (type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) === "[object " + type + "]";
        }
    };
    //预处理函数
    var util = {
        getXHR: (function () {
            var list = [
                function () {
                    return new XMLHttpRequest();
                },
                function () {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                },
                function () {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                },
                function () {
                    return new ActiveXObject("Msxml3.XMLHTTP");
                }
            ], xhr = null;
            while (xhr = list.shift()) {
                try {
                    xhr();
                    break;
                } catch (e) {
                    xhr = null;
                    continue;
                }
            }
            if (xhr !== null) {
                return xhr;
            }
            throw new error("not support!");
        })(),
        each: (function () {
            if ([].forEach) {
                return function (list, callBack, context) {
                    [].forEach.call(list, callBack, context);
                }
            } else {
                return function (list, callBack, context) {
                    for (var i = 0; i < list.length; i++) {
                        callBack.call(context, list[i], i, list);
                    }
                }
            }
        })(),
        init: function () {
            this.each(["String", "Number", "Boolean", "Object", "Undefined", "Null", "Array", "Function"], function (item) {
                util["is" + item] = isType(item);
            })
        },
        JSONparse: (function () {
            if ("JSON" in window) {
                return function (str) {
                    return JSON.parse(str);
                }
            } else {
                return function(str){
                    return (new Function("return" + str))();
                }
            }
        })()
    };
    util.init();
})();
