/**
 * Created by dell on 2016/3/15.
 */
var http = require("http");
var url = require("url");
var fs=require("fs");

function serve(req, res) {
    if(req.url=="/"){
        fs.readFile("clock.html",function(err,data){
            if(err) res.end("错了");
            res.write(data);
            res.end();
        })
    }else if(req.url=="/clock"){
        console.log(req.method);
        console.log(req.headers.zf);
        //res.statusCode=500;
        res.setHeader("Access-Control-Allow-Origin","http://localhost:63342");
        res.setHeader("Access-Control-Allow-Headers","zf");
        res.write(new Date().toLocaleString());
        res.end();
    }
}
http.createServer(serve).listen(8080, "localhost");
