/**
 * Created by dell on 2016/2/29.
 */
var http = require("http");
var url = require("url");
var fs = require("fs");

http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    var objData = urlObj.query;
    console.log(pathname);
    if (pathname == "/" || pathname == "/index2.html") {
        res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
        var strFile = fs.readFileSync("index2.html").toString();
        res.end(strFile);
        if (objData.btn) {//表单有提交内容
            try {
                var strFile = fs.readFileSync("data2.txt").toString();
                var dataAry = JSON.parse(strFile);
                dataAry.push(objData);
                fs.writeFile("data2.txt", JSON.stringify(dataAry));
            } catch (e) {//第一次提交，创建新文件data2.txt
                var dataAry = [];
                dataAry.push(objData);
                fs.writeFile("data2.txt", JSON.stringify(dataAry));
            }
        }
        console.log(objData);
    } else {
        res.writeHead(404, {"Content-Type": "text/html;charset=utf-8"});
        res.end("文件不存在~");
    }
}).listen("8080", function () {
    console.log("成功启动~");
});