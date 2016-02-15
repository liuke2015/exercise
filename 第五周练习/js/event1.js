/**
 * Created by dell on 2016/2/12.
 */
/*解决this和重复的问题*/
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
    ary[ary.length]=tempFn;
    curEle.attachEvent("on"+evenType,tempFn);
}
function unbind(curEle,evenType,evenFn){
    if(document.removeEventListener){
        curEle.removeEventListener(evenType,evenFn,false);
        return;
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