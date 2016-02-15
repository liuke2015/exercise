/**
 * Created by dell on 2016/2/13.
 */
function bind(ele,evenType,evenFn){
    if(document.addEventListener){
        ele.addEventListener(evenType,evenFn,false);
        return;
    }
    if(!ele["my"+evenType]){
        ele["my"+evenType]=[];
    }
    var ary=ele["my"+evenType];
    for(var i=0;i<ary.length;i++){
        if(ary[i].photo==evenFn){
            return;
        }
    }
    var tempFn=function(){
        evenFn.call(ele);
    };
    tempFn.photo=evenFn;
    ary[ary.length]=tempFn;
    ele.attachEvent("on"+evenType,tempFn);
}
function unbind(ele,evenType,evenFn){
    if(document.removeEventListener){
        ele.removeEventListener(evenType,evenFn,false);
        return;
    }
    var ary=ele["my"+evenType];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(ary[i].photo==evenFn){
                ele.detachEvent("on"+evenType,ary[i]);
                ary.splice(i,1);
                break;
            }
        }
    }
}
function on(ele,evenType,evenFn){
    if(!ele["aEven"+evenType]){
        ele["aEven"+evenType]=[];
    }
    var ary=ele["aEven"+evenType];
    for(var i=0;i<ary.length;i++){
        if(ary[i]==evenFn){
            return;
        }
    }
    ary[ary.length]=evenFn;
    bind(ele,evenType,run);
}
function run(e){
    e=e||window.event;
    var evenType= e.type;
    if(!e.target) {
        e.target = e.srcElement;
        e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        e.stopPropagation = function () {
            e.cancelBubble = true;
        };
        e.preventDefault = function () {
            e.returnValue = false;
        };
    }
        var ary=this["aEven"+evenType];
        if(ary){
            for(var i=0;i<ary.length;i++){
                if(typeof ary[i]=="function"){
                    ary[i].call(this,e);
                }else{
                    ary.splice(i,1);
                    i--;
                }
            }
        }
    }
function off(ele,evenType,evenFn){
    var ary=ele["aEven"+evenType];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(ary[i]==evenFn){
                ary[i]=null;
                break;
            }
        }
    }
}