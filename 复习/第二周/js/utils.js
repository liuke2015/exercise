/**
 * Created by dell on 2016/5/19.
 */
var utils = {
    listToArray: function (likeAry) {
       var ary=[];
        try{
            ary=[].slice.call(likeAry,0);
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
                ary[ary.length]=likeAry[i];
            }
        }
        return ary;
    },
    toJSON:function(str){
        try{
            return JSON.parse(str);
        }catch(e){
            return eval("("+str+")");
        }
    }
}
