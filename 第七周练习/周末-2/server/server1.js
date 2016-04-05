/**
 * Created by dell on 2016/3/17.
 */
var http = require("http");
var url = require("url");
var fs = require("fs");
var getFile = function (path, response) {
    fs.readFile(path, function (err, data) {
        if (err) {
            response.writeHead(404);
            response.end("not found");
        } else {
            response.end(data);
        }
    });
};
var querystring = require("querystring");
//var gif = fs.readFileSync("./st.gif");
var gif = fs.readFileSync("./st.gif");
var count = {};
var allow = ['http://localhost:12345', 'http://localhost:63342'];
var server = http.createServer(function (req, res) {
        var queryObj = url.parse(req.url, true);
        var pathname = queryObj.pathname;
        if (pathname == "/ajax") {
            res.write("hello ajax");
            res.end();
        } else if (pathname == "/cross") {
            res.writeHead(200, {"content-type": "application/json"});
            var query = queryObj.query;
            res.end(query.name + "(" + JSON.stringify([
                    {name: "a", age: "1"},
                    {name: "b", age: "2"},
                    {name: "c", age: "3"},
                    {name: "d", age: "4"},
                    {name: "e", age: "5"}
                ]) + ");");

        } else if (pathname == "/cors") {
            var _origin = req.headers["origin"];
            console.log(_origin);
            if (_origin && allow.indexOf(_origin) > -1) {
                res.writeHead(200, {
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": _origin,
                    "Access-Control-Allow-Credentials":true,
                    "set-Cookie":"name=123"
                });
            }
            res.end(JSON.stringify([
                {name: "aaa", age: "11"},
                {name: "bbb", age: "22"},
                {name: "ccc", age: "33"},
                {name: "ddd", age: "44"},
                {name: "eee", age: "55"}
            ]));
        }
        else if (pathname == "/tongji") {
            var origin = req.headers["referer"];
            if (origin) {
                var hostname = url.parse(origin);
                //console.log(hostname);
                hostname = hostname.protocol + "//" + hostname.host;
            }
            var timers = count[hostname];
            if (timers == undefined) {
                count[hostname] = 1;
            } else {
                count[hostname]++;
            }
            console.log(count);
            res.writeHead(200, {"content-type": "image/gif"});
            res.end(gif);
        } else {
            getFile(".." + pathname, res);
            //res.end("not support");
        }
    })
    ;
server.listen(3000, function () {
    console.log("3000启动成功~");
});




