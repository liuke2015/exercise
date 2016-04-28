/**
 * Created by dell on 2016/4/10.
 */
/*
 * 实现原理：
 * 1、ajax获取数据，得到数据总条数：total
 * 2、根据总条数计算一共多少页：totalPage=Math.ceil(total/pageNum);
 * 3、绑定数据，默认绑定第一页
 * 4、用事件委托的方法给换页绑定方法
 *
 * */
var total = 0, totalPage = 0, pageNum = 10, curPage = 1;
var pageList = document.getElementById("pageList"), list = document.getElementById("list"),page=document.getElementById("page"),search=document.getElementById("search");
list.style.height = pageNum * 30 + "px";
//1、通过ajax获取到数据
utils.ajax("data.txt", function (data) {
    total = data.length;
    totalPage = Math.ceil(total / pageNum);

    bindData(curPage, data);
    bindPage();

    //4、绑定点击事件
    page.onclick=function(e){
        e=e||window.event;
        var tar= e.target|| e.srcElement;
        if(tar.id=="first"){
            curPage=1;
        }else if(tar.id=="last"){
            curPage=totalPage;
        }else if(tar.id=="pre"){
            if(curPage==1)return;
            curPage--;
        }else if(tar.id=="next"){
            if(curPage==totalPage)return;
            curPage++;
        }else if(tar.tagName.toLowerCase()=="li"){
            curPage=Number(tar.innerHTML);
        }
        bindData(curPage, data);
        changeBG();
    };
    //6、输入框页码跳转
    search.onkeyup=function(e){
        e=e||window.event;
        if(e.keyCode==13){
            var val=this.value.replace(/(^ +| +$)/g,"");
            if(/^(\d|[1-9]\d+)$/.test(val)){
                if(val>totalPage){
                    curPage=totalPage;
                }else if(val<1){
                    curPage=1;
                }else{
                    curPage=val;
                }
                bindData(curPage, data);
                changeBG();
            }else{
                this.value="";
                this.focus();
            }

        }
    }
});

//2、动态绑定分页页码
function bindPage() {
    var str = "", cName = null;
    for (var i = 1; i <= totalPage; i++) {
        cName = i == curPage ? "cPage" : null;
        str += "<li class=" + cName + ">" + i + "</li>";
    }
    pageList.innerHTML = str;
}

//3、绑定数据
//第一页0-9
//第二页10-19
//第三页20-29
//(n-1)*pageNum~(n*pageNum)-1
function bindData(page, data) {
    var sIndex = (page - 1) * pageNum, eIndex = (page * pageNum) - 1;
    var str = "";
    for (var i = sIndex; i <= eIndex; i++) {
        var cur = data[i];
        if (cur) {
            var cName = i % 2 == 1 ? "even" : null;
            str += "<li class=" + cName + " num="+cur['num']+">";
            for (var key in cur) {
                var val = key == "sex" ? (cur[key] == 1 ? "男" : "女") : cur[key];
                str += "<span>" + val + "</span>"
            }
            str += "</li>";
        }
    }
    list.innerHTML = str;
    var oList=list.getElementsByTagName("li");
    for(var j=0;j<oList.length;j++){
        oList[j].onclick=function(){
            window.location.href="detail.html?num="+this.getAttribute("num");
        }
    }
}

//5、页码背景切换
function changeBG(){
    var oLis=pageList.getElementsByTagName("li"),cName=null;
    for(var i=0;i<oLis.length;i++){
        oLis[i].className= (i+1)==curPage?"cPage":null;
    }
}



