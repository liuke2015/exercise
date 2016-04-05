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
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    res.setHeader("zfname", "zfpx");
    var url = req.url;
    if (url === "/") {
        res.write("<ul>");
        menus.forEach(function (menu) {
            res.write("<li><a href='/" + menu + "'>" + menu + "</a></li>");
        });
        res.write("</ul>");
        res.end();
    } else {
        res.setHeader("Content-Type", "text/html;charset=utf-8");
        res.write(decodeURIComponent(url.slice(1)));
        res.end();
    }

}
var server = http.createServer(serve);
server.listen("8080", "localhost");
