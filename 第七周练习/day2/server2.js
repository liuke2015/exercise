/**
 * Created by dell on 2016/2/29.
 */
var http = require("http");
var url = require("url");
var fs = require("fs");

http.createServer(function (req, res) {
    var objUrl = url.parse(req.url, true);
    var pathname = objUrl.pathname;
    var objData = objUrl.query;
    try {
        var strFile = fs.readFileSync("data.txt").toString();
        var a = JSON.parse(strFile);
        a.push(objData);
        fs.writeFile("data.txt", JSON.stringify(a));
    } catch (e) {//第一次将查询键对值存入data.text文件。
        var a = [];
        a.push(objData);
        fs.writeFile("data.txt", JSON.stringify(a));
    }

    try {
        res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
        if (/\/$/.test(pathname)) {
            pathname += "index.html";
        }
        var strFile = fs.readFileSync(pathname.slice(1)).toString();
        res.end(strFile);
    } catch (e) {
        res.writeHead(404, {"Content-Type": "text/html;charset=utf-8"});
        res.end("文件不存在");
    }
}).listen("8080", function () {
    console.log("启动成功~");
});
