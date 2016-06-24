(function(){
    var encode=function(obj){
        if(typeof obj=="string") return null;
        var ary=[];
        for(var n in obj){
            if(!obj.hasOwnProperty(n)) continue;
            ary.push(encodeURIComponent(n)+"="+encodeURIComponent(obj[n]));
        }
        return ary.join("&");
    };
    var j=this.JSONP=function(url,data,callBack,jsonpcallback){
        var count="cb"+j.count++;
        var cbName="window.JSONP."+count;
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
        var script=document.createElement("script");
        script.src=url+(/\?/.test(url)?"&":"?")+jsonpcallback+"="+cbName;
        document.body.appendChild(script);
    };
    j.count=0;
})();
