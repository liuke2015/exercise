var http=require("http");
var url=require("url");
var fs=require("fs");
http.createServer(function(request,response){
    var urlObj=url.parse(request.url,true);
    var pathname=urlObj.pathname;
    var query=urlObj.query;

    if(pathname=="/"||pathname=="/form.html"){
        if(query.sub==undefined){//直接访问网页过来的
            var strFile=fs.readFileSync("form.html").toString();
            var strData=fs.readFileSync("data.txt").toString();
            if(strData){
                var ary=JSON.parse(strData);
                var reg=/<div +id="show-content">[\w\W]*?<\/div>/;
                var strTab="<div id='show-content'><table><tr><th>姓名</th><th>年龄</th><th>性别</th><th>学历</th><th>所学课程</th><th>爱好</th><th>操作</th></tr>";
                for(var i=0;i<ary.length;i++){
                    var cur=ary[i];
                    strTab+="<tr>";
                    for(var key in cur){
                        if(key=="sub"){
                            strTab+="<td><a del='true' href='javascript:;'>删除</a></td>";
                            continue;
                        }
                        strTab+="<td>"+cur[key]+"</td>";
                    }
                    strTab+="</tr>";
                }
                strTab+="</div></table>";
                strFile=strFile.replace(reg,strTab);
            }
            response.end(strFile);
        }else{//通过提交按钮过来的
            console.log(query);
            try{
                var strData=fs.readFileSync("data.txt").toString();
                var ary=JSON.parse(strData);
                ary.push(query);
                fs.writeFile("data.txt",JSON.stringify(ary));
            }catch(e){//第一次读写数据
                var ary=[];
                ary.push(query);
                fs.writeFile("data.txt",JSON.stringify(ary));
            }finally{//将form.html页面更新
                var strFile=fs.readFileSync("form.html").toString();
                var reg=/<div +id="show-content">[\w\W]*?<\/div>/;
                var strTab="<div id='show-content'><table>";
                for(var i=0;i<ary.length;i++){
                    var cur=ary[i];
                    strTab+="<tr>";
                    for(var key in cur){
                        strTab+="<td>"+cur[key]+"</td>";
                    }
                    strTab+="</tr>";
                }
                strTab+="</div></table>";
                strFile=strFile.replace(reg,strTab);
                response.end(strFile);
            }
        }
    }else if(pathname=="/ajax"){
        try{
            var strData=fs.readFileSync("data.txt").toString();
            var ary=JSON.parse(strData);
            ary.push(query);
            fs.writeFile("data.txt",JSON.stringify(ary));
        }catch(e){//第一次读写数据
            var ary=[];
            ary.push(query);
            fs.writeFile("data.txt",JSON.stringify(ary));
        }
        response.end(JSON.stringify(query));
    }
}).listen(8080,function(){
    console.log("8080启动成功");
});
