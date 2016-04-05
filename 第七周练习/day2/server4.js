/**
 * Created by dell on 2016/2/29.
 */

var http = require("http");
var url = require("url");
var fs = require("fs");

http.createServer(function (req, res) {
    var objUrl = url.parse(req.url, true);
    var pathname = objUrl.pathname;
    var objData = objUrl.query;

    if (pathname == "/" || pathname == "/index2.html") {
        if (objData.btn == undefined) {//如果没有提交内容
            var strFile = fs.readFileSync("index2.html").toString();
            res.end(strFile);
        } else {//有提交内容
            try {//非第一次表单提交
                var strData = fs.readFileSync("data4.txt");
                var aryData = JSON.parse(strData);
                aryData.push(objData);
                fs.writeFile("data4.txt", JSON.stringify(aryData));
            } catch (e) {//第一次表单提交
                var aryData = [];
                aryData.push(objData);
                fs.writeFile("data4.txt", JSON.stringify(aryData));
            } finally {//将页面原有内容+表单提交的内容重新写入index2.html
                var strHTML = fs.readFileSync("index2.html").toString();
                var reg = /<div +id="formContent">[\w\W]*?<\/div>/;
                console.log(aryData);
                var strTab = "<table>";
                for (var i = 0; i < aryData.length; i++) {
                    strTab += "<tr>";
                    for (var key in aryData[i]) {
                        strTab += "<td>" + aryData[i][key] + "</td>";
                    }
                    strTab += "</tr>";
                }
                strTab += "</table>";

                strHTML = strHTML.replace(reg, strTab);
                console.log("here2");
                res.end(strHTML);
            }
        }
    }
}).listen("8080", function () {
    console.log("启动成功~");
});

