var lists=document.getElementById("list"),page=document.getElementById("page"),pageList=document.getElementById("pageList"),totN=0,totP=0,curPage=1,perNum=10;
lists.style.height=perNum*30+"px";
utils.ajax("./data.txt",function(data){
    totN=data.length;
    totP=Math.ceil(totN/perNum);
    //1、绑定数据，把当前页的数据绑定到页面中,第一次绑定的时候默认当前页是第一页
    bindData(curPage,data);
    //2、绑定分页
    bindPage(curPage);
    //点击页码更换数据(事件委托)
    page.onclick=function(e){
        e=e||window.event;
        var target= e.target||window.srcElement;
        if(target.tagName.toLowerCase()=="li"){
            curPage=Number(target.innerHTML);
        }else if(target.id=="first"){
            if(curPage==1){
                return;
            }
            curPage=1;
        }else if(target.id=="last"){
            if(curPage==totP){
                return;
            }
            curPage=totP;
        }else if(target.id=="prev"){
            if(curPage==1){
                return;
            }
            curPage--;
        }else if(target.id=="next"){
            if(curPage==totP){
                return;
            }
            curPage++;
        }else if(target.id=="search"){
            return;
        }
        bindData(curPage,data);
        bindPage(curPage);
    }
    //输入页码跳转页面
    var serch=document.getElementById("search")
    serch.onkeyup=function(e){
        e=e||window.event;
        if(e.keyCode==13){
            var num=Number(this.value);
            if(num<1||num>totP){
                curPage=totP;
            }else{
                if(num){
                    curPage=num;
                }
            }
            bindData(curPage,data);
            bindPage(curPage);
        }
    }

});
//绑定数据
function bindData(curPage,data){
    var starPage=(curPage-1)*perNum,endPage=curPage==totP?(totN-1):(curPage*perNum-1);
    var str="";
    for(var i=starPage;i<=endPage;i++){
        var curData=data[i];
        var c=i%2==0?null:"even";
        str+="<li class='"+c+"' num='"+curData['num']+"'>";
        for(var n in curData){
            var val=n==="sex"?(curData[n]==1?"男":"女"):curData[n];
           str+="<span>"+val+"</span>";
        }
        str+="</li>";
    }
    lists.innerHTML=str;
    //给每一条数据绑定点击事件
    var lis=lists.getElementsByTagName("li");
    for(var k=0;k<lis.length;k++){
        var cLi=lis[k];
        cLi.onclick=function(){
            window.location.href="detail.html?num="+ cLi.getAttribute("num");
        }
    }
}
//绑定分页
function bindPage(curP){
    var str="";
    for(var i=1;i<=totP;i++){
        var c=i==curP?"select":null;
        str+="<li class='"+c+"'>"+i+"</li>"
    }
    pageList.innerHTML=str;
}