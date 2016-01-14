/**
 * Created by Administrator on 2016/1/13 0013.
 */
var utils = {
    /*
     * listToArray:��������ת��Ϊ���飬������������Ϳ���ʹ������ĸ��ַ���
     * @parameter
     *    likeAry:[object]���������
     * @return
     *    [array]���ؽ�������ת���ɵ�����
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
     * toJSON:���ַ���ת��ΪJSON��ʽ�Ķ���
     * @parameter
     *     str:Ҫת�����ַ���
     * */
    toJSON: function (str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return eval("(" + str + ")");
        }
    }
};
