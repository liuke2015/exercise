/**
 * Created by dell on 2016/3/14.
 */
var http = require("http");
var menus = ["语文", "数学", "英语"];

function serve(req, res) {
    console.log(req.url);
    res.setHeader("content-type","text/html;charset=utf-8");
    res.write("<ul>");
    menus.forEach(function (menu) {
        res.write("<li>" + menu + "</li>");
    });
    res.write("</ul>");
    res.end();
}
var server = http.createServer(serve);
server.listen(8080, "localhost");