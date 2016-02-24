/**
 * Created by dell on 2016/2/15.
 */
/*该event.js中去掉了多余的bind和unbind，将相关绑定与解绑的代码都整合在了on和off中*/
function on(ele,evenType,evenFn){
    if(ele.addEventListener){
       ele.addEventListener(evenType,evenFn,false);
        return;
    }
    if(!ele["aEven"+evenType]){
        ele["aEven"+evenType]=[];
        ele.attachEvent("on"+evenType,function(e){run.call(ele,e)});
    }
    var ary=ele["aEven"+evenType];
    for(var i=0;i<ary.length;i++){
        if(ary[i]==evenFn){
            return;
        }
    }
    ary[ary.length]=evenFn;
}
function run(e){
    e=e||window.event;
    if(!e.target){
        e.target= e.srcElement;
        e.preventDefault=function(){e.returnValue=false;};
        e.stopPropagation=function(){e.cancelBubble=true;};
        e.pageX= e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
        e.pageY= e.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
    }
    var ary=this["aEven"+ e.type];
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
    if(ele.removeEventListener){
        ele.removeEventListener(evenType,evenFn,false);
        return;
    }
    var ary=ele["aEven"+evenType];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(ary[i]==evenFn){
                ary[i]=null;
                return;
            }
        }
    }
}

function processThis(obj,fn){
    return function(e){
        fn.call(obj,e);
    }
}