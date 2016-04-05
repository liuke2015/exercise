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
        if (query.btn == undefined) {
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
        } else if (query.btn) {
            try {
                var strFile = fs.readFileSync("data2.txt").toString();
                ary = JSON.parse(strFile);
                ary.push(query);
                fs.writeFile("data2.txt", JSON.stringify(ary));
            } catch (e) {
                var ary = [];
                ary.push(query);
                fs.writeFile("data2.txt", JSON.stringify(ary));
            } finally {
                var strHTML = fs.readFileSync("index2.html").toString();
                var reg = /<div +id="content">[\w\W]*?<\/div>/;
                var strTab = "<table>";
                for (var i = 0; i < ary.length; i++) {
                    strTab += "<tr>";
                    for (var key in ary[i]) {
                        strTab += "<td>" + ary[i][key] + "</td>";
                    }
                    strTab += "</tr>";
                }
                strTab += "</table>";
                strHTML = strHTML.replace(reg, strTab);
                res.write(strHTML);
                res.end();
            }
        }
    }
}).listen(8082, function () {
    console.log("8082启动成功");
});