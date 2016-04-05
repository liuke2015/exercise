/**
 * Created by dell on 2016/2/24.
 */
'use strict';
var http = require('http');
var menus = ["爆炒腰花", "油焖大虾", "鱼香茄子"];
/*
 *
 * @param req 请求
 * @param res 响应
 * */
function serve(req, res) {
    res.write("hello");
    res.end();//响应结束
}
//有客人进来的时候调用serve函数进行处理
var server = http.createServer(serve);
server.listen(8080, 'localhost');//在本机的8080端口上启动一个服务。让别人能找到你