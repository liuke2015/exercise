/**
 * Created by Administrator on 2015/11/17 0017.
 */
/*
 * utils.js v1.0
 *
 *
 *
 *
 * */
var utils = {
    //遍历数组（类数组）中的每一项，每一次循环的时候，都执行我们的fn
    each: function (curAry, fn) {
        for (var i = 0; i < curAry.length; i++) {
            var item = curAry[i];
            var index = i;
            typeof fn === "function" ? fn(item,index,curAry) : null;
        }
    },
    //将类数组转化为数组
    listToArray: function (likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry, 0);
        } catch (e) {
           this.each(likeAry,function(item,index,curAry){
              ary[ary.length]=item;
           });
        }
        return ary;
    }
}
