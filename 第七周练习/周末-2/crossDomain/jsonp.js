/**
 * Created by dell on 2016/3/31.
 */
(function () {
    var encode = function (obj) {
        if (typeof obj == "string") {
            return obj;
        }
        var ary = [];
        for (var n in obj) {
            if (!obj.hasOwnProperty(n)) continue;
            ary.push(encodeURIComponent(n) + "=" + encodeURIComponent(obj[n]));
        }
        return ary.join("&");
    };
    var j=this.JSONP=function(url,data,callBack,jsonpcallback){
        var count="cb"+ j.count++;//cb1 cb2 cb3...
        var cbname="window.JSONP."+count;
      /*  console.log(j.count);
        console.log(window.JSONP[count]);
        console.log(j==window.JSONP);
        console.log(j.count==window.JSONP.count);
        console.log(window.JSONP[count]==window.JSONP.count);
        console.log(window.JSONP["count"]);
        */
        window.JSONP[count]=function(serverData){
            try{
                callBack(serverData);
            }finally{
                  script.parentNode.removeChild(script);
                 delete window.JSONP[count];
            }
        };
        var _encode=encode(data);
        if(_encode){
            url+=(/\?/.test(url)?"&":"?")+_encode;
        }
        url+=(/\?/.test(url)?"&":"?")+jsonpcallback+"="+cbname;
        var script=document.createElement("script");
        script.src=url;
        document.body.appendChild(script);
    };
    j.count=1;
})();
