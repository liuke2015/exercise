/**
 * Created by dell on 2016/2/25.
 */
/*

 var http = require("http");
 var url = require("url");
 var fs = require("fs");
 var mime = require("mime");

 var menus = [{name: "孜然羊肉", unit: "盘"}, {name: "水果沙拉", unit: "碗"}, {name: "辣炒花蛤", unit: "碟"}];
 function serve(req, res) {
 /!*  console.log(req.url);
 console.log(req.headers);
 console.log(req.method);*!/
 var urlObj = url.parse(req.url, true);
 var pathname = urlObj.pathname;
 // console.log("pathname=" + pathname);
 res.setHeader("Content-Type", "text/html;charset=utf-8");
 if (pathname === "/") {
 res.write("<link rel='stylesheet' href='/menu.css'/>");
 res.write("<script src='/menu.js'></script>");
 res.write("请点菜：");
 res.write("<ul>");
 menus.forEach(function (menu) {
 res.write("<li><a href='/menu/" + menu.name + "?unit=" + menu.unit + "'>" + menu.name + "</a></li>");
 });
 res.write("</ul>");
 res.end();
 } else if (pathname.indexOf("/menu/") === 0) {
 res.write("一" + urlObj.query.unit + decodeURIComponent(pathname.slice(6)));
 res.end();
 } else if (pathname === "/favicon.ico") {
 res.statusCode = 404;
 res.end("404");
 } else {
 res.setHeader(pathname.slice(1), mime.lookup(pathname.slice(1)) + ";charset=utf-8");
 fs.readFile(pathname.slice(1), function (err, data) {
 if (err) throw err;
 res.write(data);
 res.end();
 })
 }

 }
 var server = http.createServer(serve);
 server.listen("8080", "localhost");*/
var http = require("http");
var url = require("url");
var fs = require("fs");
var mime = require("mime");

var menus = [{name: "油焖大虾", unit: "盆"}, {name: "辣炒花蛤", unit: "盘"}, {name: "糖醋里脊", unit: "碗"}];

function serve(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;

    res.setHeader("Content-Type", "text/html;charset=utf-8");
    if (pathname == "/") {
        res.write("<link rel='stylesheet' href='menu.css'/>");
        res.write("<script src='menu.js'></script>");
        res.write("请点菜：");
        res.write("<ul>");
        menus.forEach(function (menu) {
            res.write("<li><a href='/menu/" + menu.name + "?unit=" + menu.unit + "'>" + menu.name + "</a></li>");
        });
        res.write("</ul>");
        res.end();
    } else if (/^\/menu\//.test(pathname)) {/*也可以这么写--pathname.indexOf("/menu/") == 0*/
        res.write("一" + urlObj.query.unit + decodeURIComponent(pathname.slice(6)));
        res.end();
    } else if (pathname == "/favicon.ico") {
        res.statusCode = 404;
        res.end("404");
    } else {
        res.setHeader("Content-Type", mime.lookup(pathname.slice(1)) + ";charset=utf-8");
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
server.listen("8080", "localhost");