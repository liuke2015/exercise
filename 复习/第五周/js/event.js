function bind(curEle,evenType,evenFn){
    if(document.addEventListener){
        curEle.addEventListener(evenType,evenFn,false);
        return;
    }
    var tempFn=function(){
        evenFn.call(curEle);
    };
    tempFn.photo=evenFn;
    if(!curEle["my"+evenType]){
        curEle["my"+evenType]=[];
    }
    var ary=curEle["my"+evenType];
    for(var i=0;i<ary.length;i++){
        var cur=ary[i];
        if(cur.photo==evenFn){
            return;
        }
    }
    ary.push(tempFn);
    curEle.attachEvent("on"+evenType,tempFn);
}
function unbind(curEle,evenType,evenFn){
    if(document.removeEventListener){
        curEle.removeEventListener(evenType,evenFn,false);
        return
    }
    var ary=curEle["my"+evenType];
    for(var i=0;i<ary.length;i++){
        var tempFn=ary[i];
        if(tempFn.photo==evenFn){
            curEle.detachEvent("on"+evenType,tempFn);
            break;
        }
    }
}
//解决顺序问题
function on(curEle,evenType,evenFn){
    !curEle["myEven"+evenType]?curEle["myEven"+evenType]=[]:null;
    var ary=curEle["myEven"+evenType];
    for(var i=0;i<ary.length;i++){
        if(ary[i]==evenFn){
            return;
        }
    }
    ary.push(evenFn);
    bind(curEle,evenType,run);
}
function off(curEle,evenType,evenFn){
    var ary=curEle["myEven"+evenType];
    for(var i=0;i<ary.length;i++){
        if(ary[i]==evenFn){
            ary[i]=null;
            break;
        }
    }
}
function run(e){
    e=e||window.event;
    if(!e.target){
        e.target= e.srcElement;
        e.pageX= e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
        e.pageY= e.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
        e.preventDefault=function(){
            e.returnVlue=false;
        };
        e.stopPropagation=function(){
            e.cancelBubble=true;
        }
    }
    //this->curEle
    var ary=this["myEven"+ e.type];
    for(var i=0;i<ary.length;i++){
        var curFn=ary[i];
        if(typeof curFn=="function"){
            curFn.call(this);
        }else{
            ary.splice(i,1);
            i--;
        }

    }
}
