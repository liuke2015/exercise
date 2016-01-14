/**
 * Created by Administrator on 2015/11/11 0011.
 */
var oTab = document.getElementById("tab");
var tHead = oTab.tHead;
var tBody = oTab.tBodies[0];
var oThs=tHead.getElementsByTagName("th");

//1、循环数据dataAry，然后把对应的标签分别的添加到页面中
var initData = function () {
    if (!dataAry) return;
    var frg = document.createDocumentFragment();
    for (var i = 0; i < dataAry.length; i++) {
        var curItem = dataAry[i];
        //初始化参数
        curItem.name = curItem.name || "--";
        curItem.age = curItem.age || 25;
        curItem.score = curItem.score || 60;
        curItem.sex = curItem.sex === 0 ? "男" : "女";
        //创建行和列，并且添加到页面中
        var oTr = document.createElement("tr");
        for (var key in curItem) {
            var oTd = document.createElement("td");
            oTd.innerHTML = curItem[key];
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
}
initData();
//2、实现隔行变色
function changeBg() {
    var oList = tBody.rows;
    for (var i = 0; i < oList.length; i++) {
        oList[i].className = i % 2 === 1 ? "bgcolor" : null;
    }
}
changeBg();
//3、表格排序
//index:告诉我当前是哪一列排序，就把当前列的索引传递给我
var sortList=function(index){
    var ary=utils.listToArray(tBody.rows);
    ary.sort(function(a,b){
        var cur= a.cells[index].innerHTML,next= b.cells[index].innerHTML;
        var curNum=parseFloat(cur),nextNum=parseFloat(next);
        return isNaN(curNum)||isNaN(nextNum)?cur.localeCompare(next):curNum-nextNum;
    });
    //"asc"代表升序 "desc"代表降序
    if(this.sort==="asc"){
        ary.reverse(ary);
        this.sort="desc";
    }else{
        this.sort="asc";
    }
    //把其他咧已经存储的排序方式清掉，这样的话，下一次点击其他的列还是从升序开始
    for(var i=0;i<oThs.length;i++){
        if(index===i){
            continue;
        }
        oThs[i].sort=null;
    }
    var frg=document.createDocumentFragment();
    for(var i=0;i<ary.length;i++){
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    changeBg();
};
//4、点击执行：给所有具有class="cursor"样式的列绑定点击事件

for(var i=0;i<oThs.length;i++){
    var oTh=oThs[i];
    if(oTh.className==="cursor"){
        oTh.index=i;
        oTh.onclick=function(){
           sortList.call(this,this.index);
        }
    }
}

