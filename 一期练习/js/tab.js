/**
 * Created by Administrator on 2015/11/11 0011.
 */
//1、绑定数据
var oTab = document.getElementById("tab");
var tBody = oTab.tBodies[0];
var tHead = oTab.tHead;
var oThs = tHead.getElementsByTagName("th");
var oList = tBody.rows;

function initData() {
    if (!dataAry) return;
    var frg = document.createDocumentFragment();
    for (var i = 0; i < dataAry.length; i++) {
        var curItem = dataAry[i];
        //给表格内容赋初始值
        curItem.name = curItem.name || "--";
        curItem.age = curItem.age || 25;
        curItem.score = curItem.score || 60;
        curItem.sex = curItem.sex === 0 ? "男" : "女";

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
//2、隔行变色
function changeBg() {
    for (var i = 0; i < oList.length; i++) {
        oList[i].className = i % 2 === 1 ? "bgcolor" : null;
    }
}
changeBg();
//3、表格排序
function tabSort(index) {
    var ary = utils.listToArray(oList);
    ary.sort(function (a, b) {
        var cur = a.cells[index].innerHTML, next = b.cells[index].innerHTML;
        var curNum = parseFloat(cur), nextNum = parseFloat(next);
        return isNaN(curNum) || isNaN(nextNum) ? cur.localeCompare(next) : curNum - nextNum;
    });

    if(this.sort==="asc"){
        ary=ary.reverse();
        this.sort="desc";
    }else{
        this.sort="asc";
    }
    for(var i=0;i<oThs.length;i++){
        if(index===i){
            continue;
        }else{
            oThs[i].sort=null;
        }
    }
    for (var i = 0; i < ary.length; i++) {
        tBody.appendChild(ary[i]);
    }
    changeBg();
}
//点击元素触发排序
for (var i = 0; i < oThs.length; i++) {
    var cur = oThs[i];
    if (cur.className === "cursor") {
        cur.index=i;
        cur.onclick=function(){
            tabSort.call(this,this.index);
        }
    }
}



