/**
 * Created by dell on 2016/5/16.
 */
var str = "[a][sring]aaa[/string][/a]".replace(/\[(\/)?\w+\]/gm, function () {
    if (arguments[1]) {
        return "</a>";
    }
    return "<a>";
});
//<a><a>aaa</a></a>