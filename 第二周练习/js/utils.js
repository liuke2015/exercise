/**
 * Created by Administrator on 2016/1/13 0013.
 */
var utils = {
    /*
     * listToArray:将类数组转换为数组，这样该类数组就可以使用数组的各种方法
     * @parameter
     *    likeAry:[object]类数组对象
     * @return
     *    [array]返回将类数组转换成的数组
     * by team in 2016/1/13
     * */
    listToArray: function (likeAry) {
        try {
            return Array.prototype.slice.call(likeAry, 0);
        } catch (e) {
            var ary = [];
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
            return ary;
        }
    },
    /*
     * toJSON:将字符串转换为JSON格式的对象
     * @parameter
     *     str:要转换的字符串
     * */
    toJSON: function (str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return eval("(" + str + ")");
        }
    }
};
