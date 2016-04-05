/**
 * Created by dell on 2016/3/1.
 */
var http = require("http");
var url = require("url");
var fs = require("fs");

http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    var dataQuery = urlObj.query;

    if (pathname == "/" || pathname == "/index2.html") {
        if (dataQuery.btn == undefined) {//无提交操作
            var strFile = fs.readFileSync("index2.html").toString();
            res.end(strFile);
        } else if (dataQuery.btn == "提交") {//有提交操作
            try {//非第一次提交
                var strData = fs.readFileSync("data.txt").toString();
                var ary = JSON.parse(strData);
                ary.push(dataQuery);
                fs.writeFile("data.txt", JSON.stringify(ary));
            } catch (e) {//第一次提交
                var ary = [];
                ary.push(dataQuery);
                fs.writeFile("data.txt", JSON.stringify(ary));
            } finally {
                var strHtml = fs.readFileSync("index2.html").toString();
                var reg = /<div +id="formContent">[\w\W]*?<\/div>/;

                var strTab = "<table>";
                for (var i = 0; i < ary.length; i++) {
                    strTab += "<tr>";
                    for (var key in ary[i]) {
                        strTab += "<td>" + ary[i][key] + "</td>";
                    }
                    strTab += "</tr>";
                }
                strTab += "</table>";

                strHtml=strHtml.replace(reg,strTab);
                res.end(strHtml);
            }
        }
    } else if (pathname == "/ajax") {
        res.end(JSON.stringify(dataQuery));
    }
}).listen("8080", function () {
    console.log("成功启动");
});