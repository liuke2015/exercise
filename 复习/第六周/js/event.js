function bind(curEle,evenType,evenFn){
   /* if(curEle.addEventListener){
        curEle.addEventListener(evenType,evenFn,false);
        return;
    }*/
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
function on(curEle,evenType,eventFn){
    var isSelf=false;
    if(/^self/.test(evenType)){
        isSelf=true;
        if(!curEle[evenType]){
            curEle[evenType]=[];
        }
        var arySelf= curEle[evenType];
        for(var i=0;i<arySelf.length;i++){
            if(arySelf[i]==eventFn) break;
        }
        arySelf.push(eventFn);
    }
    if(curEle.addEventListener){
        curEle.addEventListener(evenType,eventFn,false);
        return;
    }
    if(isSelf) return;
    if(!curEle["myEven"+evenType]){
        curEle["myEven"+evenType]=[];
        bind(curEle,evenType,run);
    }
    var ary=curEle["myEven"+evenType];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(ary[i]==eventFn){
                return;
            }
        }
    }
    ary.push(eventFn);
  /*  curEle.attachEvent("on"+evenType,function(e){
        run.call(curEle,e);
    });*/

}
function off(curEle,evenType,eventFn){
    if(curEle.removeEventListener){
        curEle.removeEventListener(evenType,eventFn,false);
        return;
    }
    if(/^self/.test(evenType)){
        var arySelf=curEle[evenType];
        if(arySelf){
            for(var i=0;i<arySelf.length;i++){
                if(arySelf[i]==eventFn){
                    arySelf[i]=null;
                    return;
                }
            }
        }
        return;
    }
    var ary=curEle["myEven"+evenType];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(ary[i]==eventFn){
                ary[i]=null;
                return;
            }
        }
    }
}
function run(e){
    e=e||window.event;
    if(!e.target){
        e.target= e.srcElement;
        e.pageX= e.clientX+(document.documentElement.clientLeft||document.body.clientLeft);
        e.pageY=e.clientY+(document.documentElement.clientTop||document.body.clientTop);
        e.preventDefault=function(){
            e.returnValue=false;
        };
        e.stopPropagation=function(){
            e.cancelBubble=true;
        };
    }
    var type= e.type;
    var _this=this;
    var ary=_this["myEven"+type];
    if(ary){
        for(var i= 0;i<ary.length;i++){
            if(typeof ary[i]=="function"){
                ary[i].call(_this,e);
            }else{
                ary.splice(i,1);
                i--;
            }
        }
    }
}

function selfRun(curEle,evenType){
    var arySelf=curEle[evenType];
    if(arySelf){
        for(var i=0;i<arySelf.length;i++){
           if(typeof arySelf[i]=="function"){
               arySelf[i].call(curEle);
           }else{
               arySelf.splice(i,1);
               i--;
           }
        }
    }
}
function myBind(obj,fn){
    return function(e){
        fn.call(obj,e);
    }
}


