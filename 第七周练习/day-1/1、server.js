/**
 * Created by dell on 2016/3/14.
 */
var http = require("http");

function serve(req, res) {
    console.log("hello");
    res.end();
}
var server = http.createServer(serve);
server.listen(8080, "localhost");