/**
 * Created by dell on 2016/3/17.
 */
var http = require("http");
var url = require("url");
var fs = require("fs");
var querystring = require("querystring");
var getFile = function (path, response) {
    fs.readFile(path, function (err, data) {
        if (err) {
            throw err;
            response.writeHead(404);
            response.end("not found");
        } else {
            response.end(data);
        }
    });
};

var server = http.createServer(function (req, res) {
    var queryObj = url.parse(req.url, true);
    var pathname = queryObj.pathname;
    if (pathname == "/ajax") {
        res.write("hello ajax");
        res.end();
    } else {
        getFile(".." + pathname,res);
        //res.end("not support");
    }
});
server.listen(3000, function () {
    console.log("3000启动成功~");
});
