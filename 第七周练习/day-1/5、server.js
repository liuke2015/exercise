/**
 * Created by dell on 2016/3/14.
 */
/*
 var http = require("http");
 var url = require("url");
 var fs = require("fs");
 //要安装mime  命令：npm install mime
 var mime = require("mime");
 var menus = [{name: "鱼香茄子", unit: "盘"}, {name: "红烧茄子", unit: "碗"}, {name: "酱香茄子", unit: "碟"}];

 function serve(req, res) {
 //var url = req.url;
 var urlObj = url.parse(req.url, true);
 var pathname = urlObj.pathname;
 console.log("pathname:" + pathname);
 /!* console.log(req.url);//请求路径
 console.log(req.headers);//请求头
 console.log(req.method);
 console.log(req.httpVersion);*!/
 res.setHeader("content-type", "text/html;charset=utf-8");
 if (pathname == "/") {
 res.write("<link rel='stylesheet' type='text/css' href='menu.css'/>");
 res.write("<script type='text/javascript' src='menu.js'></script>");
 res.write("请点菜：");
 res.write("<ul>");
 menus.forEach(function (menu) {
 res.write("<li><a href='/pick/" + menu.name + "?unit=" + menu.unit + "'>" + menu.name + "</a></li>");
 });
 res.write("</ul>");
 res.end();
 } else if (pathname.indexOf("/pick") == 0) {
 res.write("一" + decodeURIComponent(urlObj.query.unit) + decodeURIComponent(pathname.slice(6)));
 res.end();
 } else if (pathname == "/favicon.ico") {
 res.statusCode = 404;
 res.end("404");
 } else {
 res.setHeader("content-type", mime.lookup(pathname.slice(1)) + ";charset=utf-8");
 fs.readFile(pathname.slice(1), function (err, data) {
 if (err) {
 throw err;
 }
 res.write(data);
 res.end();
 });
 }
 }
 var server = http.createServer(serve);
 server.listen(8080, "localhost");*/
var http = require("http");
var url = require("url");
var fs = require("fs");
var mime = require("mime");
var menus = [{name: "鱼香茄子", unit: "盘"}, {name: "红烧茄子", unit: "碗"}, {name: "酱香茄子", unit: "碟"}];

function serve(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    res.setHeader("content-type", "text/html;charset='utf-8'");
    if (pathname == "/") {
        res.write("<link rel='stylesheet' type='text/css' href='menu.css'/>");
        res.write("<script type='text/javascript' src='menu.js'></script>");
        res.write("<img src='apple_1_bigger.jpg'/>");
        res.write("<ul>");
        menus.forEach(function (menu) {
            res.write("<li><a href='/pick/" + menu.name + "?unit=" + menu.unit + "'>" + menu.name + "</a></li>");
        });
        res.write("</ul>");
        res.end();
    } else if (pathname.indexOf("/pick/") == 0) {
        res.write("一" + decodeURIComponent(urlObj.query.unit) + decodeURIComponent(pathname.slice(6)));
    } else if (pathname == "/favicon.ico") {
        res.statusCode = 404;
        res.end("404");
    } else {
        res.setHeader("content-type", mime.lookup(pathname.slice(1)) + ";charset='utf-8'");
        fs.readFile(pathname.slice(1),function (err, data) {
            if (err) {
                throw err;
            }
            res.write(data);
            res.end();
        });
    }
}
http.createServer(serve).listen(8080, "localhost");