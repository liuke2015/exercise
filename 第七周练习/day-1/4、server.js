/**
 * Created by dell on 2016/3/14.
 */
var http = require("http");
var url = require("url");
var menus = [{name: "鱼香茄子", unit: "盘"}, {name: "红烧茄子", unit: "碗"}, {name: "酱香茄子", unit: "碟"}];

function serve(req, res) {
    //var url = req.url;
    var urlObj=url.parse(req.url,true);
   var pathname=urlObj.pathname;
    /* console.log(req.url);//请求路径
     console.log(req.headers);//请求头
     console.log(req.method);
     console.log(req.httpVersion);*/
    res.setHeader("content-type", "text/html;charset=utf-8");
    if (pathname == "/") {
        res.write("<ul>");
        menus.forEach(function (menu) {
            res.write("<li><a href='/" + menu.name + "?unit=" + menu.unit + "'>" + menu.name + "</a></li>");
        });
        res.write("</ul>");
        res.end();
    } else {
        res.write("一"+decodeURIComponent(urlObj.query.unit)+decodeURIComponent(pathname.slice(1)));
        res.end();
    }
}
var server = http.createServer(serve);
server.listen(8080, "localhost");