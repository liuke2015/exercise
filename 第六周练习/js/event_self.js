/**
 * Created by dell on 2016/2/18.
 */
function on(ele,evenType,fn){
    var ary=null;
    if(/^self/.test(evenType)){
        if(!ele[evenType]){
            ele[evenType]=[];
        }
        ary=ele[evenType];
        for(var i=0;i<ary.length;i++){
            if(ary[i]==fn){
                return;
            }
        }
        ary[ary.length]=fn;
        return;
    }
    if(ele.addEventListener){
        ele.addEventListener(evenType,fn,false);
        return;
    }

    if(!ele["aEven"+evenType]){
        ele["aEven"+evenType]=[];
        ele.RUN=function(e){
            run.call(ele,e)
        };
        ele.attachEvent("on"+evenType,ele.RUN);
    }
     ary=ele["aEven"+evenType];
    for(var i=0;i<ary.length;i++){
        if(ary[i]==fn){
            return;
        }
    }
    ary[ary.length]=fn;
}
function run(e){
    e=e||window.event;
    if(!e.target){
        e.target= e.srcElement;
        e.preventDefault=function(){
            e.returnValue=false;
        };
        e.stopPropagation=function(){
            e.cancelBubble=true;
        };
        e.pageX= e.clientX+(document.documentElement.clientLeft||document.body.clientLeft);
        e.pageY= e.clientY+(document.documentElement.clientTop||document.body.clientTop)
    }
    var ary=this["aEven"+ e.type];
    if(ary) {
        for (var i = 0; i < ary.length; i++) {
            if (typeof ary[i] == "function") {
                ary[i].call(this, e);
            } else {
                ary.splice(i, 1);
                i--;
            }
        }
    }
}
function selfRun(selfType,e){
    var ary=this[selfType];
    for(var i=0;i<ary.length;i++){
        ary[i].call(this,e);
    }
}
function off(ele,evenType,fn){
    var ary=null;
    if(/^self/.test(evenType)){
        if(!ele[evenType]){
            ele[evenType]=[];
        }
        ary=ele[evenType];
        for(var i=0;i<ary.length;i++){
            if(ary[i]==fn){
                ary[i]=null;
                return;
            }
        }
        return;
    }
    if(ele.removeEventListener){
        ele.removeEventListener(evenType,fn,false);
        return;
    }
    ary=ele["aEven"+evenType];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(ary[i]==fn){
                ary[i]=null;
                return;
            }
        }
    }
}