/**
 * Created by dell on 2016/3/14.
 */
var http = require("http");
var menus = ["语文", "数学", "英语"];

function serve(req, res) {
    var url = req.url;
    if (url == "/") {
        /* console.log(req.url);//请求路径
         console.log(req.headers);//请求头
         console.log(req.method);
         console.log(req.httpVersion);*/
        res.setHeader("content-type", "text/html;charset=utf-8");
        res.write("<ul>");
        menus.forEach(function (menu) {
            res.write("<li><a href='/" + menu + "'>" + menu + "</a></li>");
        });
        res.write("</ul>");
        res.end();
    } else {
        res.setHeader("content-type", "text/html;charset=utf-8");
        res.write(decodeURIComponent(url.slice(1)));
        res.end();
    }
}
var server = http.createServer(serve);
server.listen(8080, "localhost");