/**
 * Created by dell on 2016/3/15.
 */
var http = require("http");
var url = require("url");
var fs = require("fs");

http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    var query = urlObj.query;

    if (pathname == "/" || pathname == "/index2.html") {
        var strFile = fs.readFileSync("index2.html").toString();
        //console.log(query.btn);
        res.end(strFile);
        /*
         以下这种方法也行
         fs.readFile("index2.html",function(err,data){
         if(err) throw err;
         res.write(data);
         res.end();
         })*/
    } else if (pathname == "/ajax") {
        res.end(JSON.stringify(query));
    }
}).listen(8082, function () {
    console.log("8082启动成功");
});