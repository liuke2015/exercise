/**
 * Created by dell on 2016/3/7.
 */
var http = require("http");
var url = require("url");
var fs = require("fs");
var getFile = function (path, res) {
    fs.readFile(path, function (err, data) {
        console.log(path);
        if (err) {
            res.writeHead(404);
            res.end("not found");
        } else {
            res.end(data);
        }
    });
};
var querystring = require("querystring");//调取外部的应用程序包

var server = http.createServer(function (request, response) {
    var params = url.parse(request.url, true);
    if (params.pathname == "/ajax") {
        response.write("hello world");
        response.end();
    } else {
        getFile(".." + params.pathname, response);
        //response.end("not supported");
    }
});
//端口最大值是65535
server.listen(3000, function () {
    console.log("start at 3000");
});


