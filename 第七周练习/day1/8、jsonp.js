/**
 * Created by dell on 2016/2/27.
 */
var http=require("http");

function serve(req,res){
    res.write("hello('zfpx')");
    res.end();
}
var server=http.createServer(serve);
server.listen("8080","localhost");
