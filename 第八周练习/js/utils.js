/**
 * Created by dell on 2016/4/10.
 */
var getXhr = (function () {
    if ("XMLHttpRequest" in window) {
        return function () {
            return new XMLHttpRequest();
        }
    }
    if (new ActiveXObject("Microsoft.XMLHTTP")) {
        return function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    if (new ActiveXObject("Msxml2.XMLHTTP")) {
        return function () {
            return new ActiveXObject("Msxml.XMLHTTP");
        }
    }
    if (new ActiveXObject("Msxml3.XMLHTTP")) {
        return function () {
            return new ActiveXObject("Msxml3.XMLHTTP");
        }
    }
})();
var utils = {
    toJSON: function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    },
    ajax: function (url, callBack) {
        var _this=this;
        url += url.indexOf("?") > -1 ? ("&_=" + Math.random()) : ("?_=" + Math.random());
        var xhr=getXhr();
        xhr.open("get",url);
        xhr.onreadystatechange=function(){
            if(this.readyState==4&&/^2\d{2}/.test(this.status)){
                var val=_this.toJSON(xhr.responseText);
                if(typeof callBack=="function"){
                    callBack(val);
                }
            }
        }
        xhr.send();
    }
};
