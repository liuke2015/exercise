var getXHR = (function () {
    var list = [function () {
        return new XMLHttpRequest();
    }, function () {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }, function () {
        return new ActiveXObject("Msxml2.XMLHTTP");
    }, function () {
        return new ActiveXObject("Msxml3.XMLHTTP");
    }], xhr = null;
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
    throw new ReferenceError("您的浏览器不支持ajax");
})();
var utils = {
    toJson: function (str) {
       return "JSON" in window ? JSON.parse(str) : (new Function("return" + str))();
    },
    ajax: function (url, callBack) {
        var _this = this;
        url += (/\?/.test(url)) ? "&_=" : "?_=" + (~~(Math.random() * 0xffffff)).toString(36);
        var xhr = getXHR();
        xhr.open("get", url,true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && /^2\d{2}/.test(xhr.status)) {
                var text = xhr.responseText;
                var val = _this.toJson(text);
                typeof callBack == "function" ? callBack(val) : null;
            }
        };
        xhr.send();
    }
};
