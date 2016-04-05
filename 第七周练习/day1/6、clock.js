/**
 * Created by dell on 2016/2/27.
 */
var http = require("http");
var url = require("url");
var fs = require("fs");

function serve(req, res) {
    console.log(req.url);
    if (req.url == "/") {
        fs.readFile("clock.html", function (err, data) {
            if (err) {
                res.end("错了~");
            }
            res.end(data);
        });
    } else if (req.url == "/clock") {
        console.log(req.headers.zf);
        console.log(req.method);
        res.setHeader("Access-Control-Allow-Headers", "zf");
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:63342");
        res.write(new Date().toLocaleString());
        res.end();
    }
}
var server = http.createServer(serve);
server.listen("8080", "localhost");
