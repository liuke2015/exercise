/**
 * Created by dell on 2016/2/25.
 */
"use strict";
var http = require("http");
var menus = ["腰花", "大虾", "茄子"];
/*
 * @param  req 请求
 * @param  res 响应
 * */
function serve(req, res) {
    console.log(req.url);//请求URL
    console.log(req.headers);//请求头
    console.log(req.method);
    console.log(req.httpVersion);
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    res.setHeader("zfname", "zfpx");
    res.write("<ul>");
    menus.forEach(function (menu) {
        res.write("<li>" + menu + "</li>");
    });
    res.write("</ul>");
    res.end();
}
var server = http.createServer(serve);
server.listen("8080", "localhost");
