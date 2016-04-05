/**
 * Created by dell on 2016/3/7.
 */
var http = require("http");
var url = require("url");
var fs = require("fs");
var getFile = function (path, res) {
    fs.readFile(path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end("not found");
        } else {
            res.end(data);
        }
    });
};
var querystring = require("querystring");//调取外部的应用程序包

var gif = fs.readFileSync("./st.gif");//buffer--二进制流
var count = {};
var server = http.createServer(function (request, response) {
    var params = url.parse(request.url, true);
    if (params.pathname == "/ajax") {
        response.write("hello world");
        response.end();
    } else if (params.pathname == "/cross") {
        var query = params.query;
        response.writeHead(200, {"content-type": "application/json"});
        response.end(query.name + "(" + JSON.stringify([
                {name: "a", age: "1"},
                {name: "b", age: "2"},
                {name: "c", age: "3"},
                {name: "d", age: "4"}
            ]) + ")");
    } else if (params.pathname == "/tongji") {
        var origin = request.headers["referer"];
        if(origin){
            var hostname = url.parse(origin);
            hostname=hostname.protocol+"//"+hostname.host;
        }

        /*location.href
         "http://localhost:63342/%E7%8F%A0%E5%B3%B0%E5%9F%B9%E8%AE%AD/%E4%B8%83%E6%9C…8%83%E5%91%A8%E7%BB%83%E4%B9%A0/%E5%91%A8%E6%9C%AB2/crossDomain/cross.html"
         location.origin
         "http://localhost:63342"
         location.hostname
         "localhost"
         location.port
         "63342"
         location.protocol
         "http:"
         */
        var times = count[hostname];
        if (times === undefined) {
            count[hostname] = 1;
        } else {
            count[hostname]++;
        }
        console.log(count);
        response.writeHead(200, {"content-type": "image/gif"});
        response.write(gif);
        response.end();
    } else {
        getFile(".." + params.pathname, response);
        //response.end("not supported");
    }
});
//端口最大值是65535
server.listen(5000, function () {
    console.log("start at 5000");
});


