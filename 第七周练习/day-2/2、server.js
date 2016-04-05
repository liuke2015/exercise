/**
 * Created by dell on 2016/3/15.
 */
var http = require("http");
var url = require("url");
var fs = require("fs");

http.createServer(function (req, res) {
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
   /* if (/\/$/.test(pathname)) {
        pathname += index.html;
    }
    console.log(pathname);*/
    try {
        res.writeHead(200, {"content-type": "text/html;charset='utf-8"});
        if (/\/$/.test(pathname)) {
            pathname += "index.html";
        }
        console.log(pathname);
        var strFile = fs.readFileSync(pathname.slice(1)).toString();
        res.write(strFile);
        res.end();
    } catch (e) {
        res.writeHead(404, {"content-type": "text/html;charset='utf-8"});
        res.end("文件不存在");
    }
}).listen(8082, function () {
    console.log("8082开张了");
});
