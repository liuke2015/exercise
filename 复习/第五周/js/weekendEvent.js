function bind(curEle,evenType,evenFn){
    if(curEle.addEventListener){
        curEle.addEventListener(evenType,evenFn,false);
        return;
    }
    if(!curEle["myEvent"+evenType]){
        curEle["myEvent"+evenType]=[];
    }
    var ary=curEle["myEvent"+evenType];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(ary[i].photo==evenFn){
                return;
            }
        }
    }
    var tempFn=function(){
        evenFn.call(curEle);
    };
    tempFn.photo=evenFn;
    ary.push(tempFn);
    curEle.attachEvent("on"+evenType,tempFn);
}
function unbind(curEle,evenType,evenFn){
    var ary=curEle["myEvent"+evenType];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(ary[i].photo==evenFn){
                curEle.detachEvent("on"+evenType,evenFn);
                ary.splice(i,1);
                return;
            }
        }
    }
}
function on(curEle,evenType,evenFn){
    if(!curEle["aryEven"+evenType]){
        curEle["aryEven"+evenType]=[];
    }
    var ary=curEle["aryEven"+evenType];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(ary[i]==evenFn){
                return;
            }
        }
    }
    ary.push(evenFn);
    bind(curEle,evenType,run);
}
function off(curEle,evenType,evenFn){
    var ary= curEle["aryEven"+evenType];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(ary[i]==evenFn){
                ary[i]=null;
                return;
            }
        }
    }
}
function run(e){
    e=e||window.event;
    if(e.target){
        e.target= e.srcElement;
        e.stopPropagation=function(){
            e.cancelBubble=true;
        };
        e.preventDefault=function(){
            e.returnValue=false;
        };
        e.pageX= e.clientX+(document.documentElement.clientLeft||document.body.clientLeft);
        e.pageY= e.clientY+(document.documentElement.clientTop||document.body.clientTop);
    }
    var type= e.type;
    var ary=this["aryEven"+type];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(typeof ary[i]=="function"){
                ary[i].call(this);
            }else{
                ary.splice(i,1);
                i--;
            }
        }
    }
}

function myBind(obj,fn){
    return function(){
        fn.call(obj)
    }
}
