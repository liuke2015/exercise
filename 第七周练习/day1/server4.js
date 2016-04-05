/**
 * Created by dell on 2016/2/25.
 */
"use strict";
/*var http = require("http");
 var url = require("url");
 var menus = [{name: "腰花", unit: "盘"}, {name: "大虾", unit: "碗"}, {name: "茄子", unit: "碟"}];
 /!*
 * @param  req 请求
 * @param  res 响应
 * *!/
 function serve(req, res) {
 console.log(req.url);//请求URL
 console.log(req.headers);//请求头
 console.log(req.method);//请求的方法
 var urlObj = url.parse(req.url, true);//把请求的url转换成对象
 //query 查询字符串 如果第二个参数为true,query就变成了一个json对象
 var pathname = urlObj.pathname;//pathname-端口号跟问号之间的那部分
 if (pathname === "/") {
 res.setHeader("Content-Type", "text/html;charset=utf-8");
 res.setHeader("zfname", "zfpx");
 res.write("<ul>");
 menus.forEach(function (menu) {
 res.write("<li><a href='/" + menu.name + "?unit=" + menu.unit + "'>" + menu.name + "</a></li>");
 });
 res.write("</ul>");
 res.end();
 } else {
 //设置内容类型
 res.setHeader("Content-Type", "text/html;charset=utf-8");
 res.write("一" + urlObj.query.unit + decodeURIComponent(pathname.slice(1)));
 res.end();
 }

 }
 var server = http.createServer(serve);
 server.listen("8080", "localhost");*/
var http = require("http");
var url = require("url");
var menus = [{name: "孜然羊肉", unit: "盘"}, {name: "水果沙拉", unit: "碗"}, {name: "辣炒花蛤", unit: "碟"}];
function serve(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    if (pathname === "/") {
        res.write("<ul>");
        menus.forEach(function (menu) {
            res.write("<li><a href='/" + menu.name + "?unit=" + menu.unit + "'>" + menu.name + "</a></li>");
        });
        res.write("</ul>");
    } else {
        res.write("一" + urlObj.query.unit + decodeURIComponent(pathname.slice(1)));
    }
    res.end();
}
var server = http.createServer(serve);
server.listen("8080", "localhost");

