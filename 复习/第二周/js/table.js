var oTab = document.getElementById("oTable");
var tHead = oTab.tHead;
var tBody = oTab.tBodies[0];

//1、数据绑定
function bindData() {
    var frg = document.createDocumentFragment(), str = "";
    for (var i = 0; i < dataAry.length; i++) {
        var tr = document.createElement("tr");
        var cur = dataAry[i];
        cur.name = cur.name || "--";
        cur.age = cur.age || 25;
        cur.score = cur.score || 60;

        str = "<td><input type='checkbox' name='tab'/></td><td>" + cur.name + "</td><td>" + cur.age + "</td><td>" + cur.score + "</td>";
        tr.innerHTML = str;
        frg.appendChild(tr);
    }
    tBody.appendChild(frg);
    frg = null;
};
bindData();

//2、隔行变色
var rows = tBody.rows;
function changBg() {
    for (var i = 0; i < rows.length; i++) {
        rows[i].className = i % 2 == 0 ? null : "bg";
    }
}
changBg();

//4、排序函数
function tabSort(n) {
    var ary = utils.listToArray(rows);
    ary.sort(function (a, b) {
        var cur = a.cells[n].innerHTML, next = b.cells[n].innerHTML;
        var curN = parseFloat(cur), nextN = parseFloat(next);
        if (isNaN(curN)) {
            return cur.localeCompare(next);
        }
        return curN - nextN;
    });

    if (this.sortType == "asc") {
        this.sortType = "desc";
        ary.reverse();
    } else {
        this.sortType = "asc";
    }

    var frg = document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg = null;
    changBg();

}

//3、点击事件绑定
var cols = tHead.getElementsByTagName("th");
for (var i = 1; i < cols.length; i++) {
    cols[i].index = i;
    cols[i].onclick = function () {
        tabSort.call(this, this.index);
    }
}
//5、全选非全选
var checkes = document.getElementsByName("tab");
/*for(var i=0;i<checkes.length;i++){
 var cur=checkes[i];
 cur.index=i;
 cur.onclick=function(){
 if(this.index==0){
 for(var j=1;j<checkes.length;j++){
 checkes[j].checked=this.checked;
 }
 }
 var flag=true;
 for(var j=1;j<checkes.length;j++){
 if(!checkes[j].checked){
 flag=false;
 break;
 }
 }
 checkes[0].checked=flag;
 }
 }*/
for (var i = 0; i < checkes.length; i++) {
    checkes[i].index = i;
    checkes[i].onclick = function () {
        if (this.index == 0) {
            for (var j = 1; j < checkes.length; j++) {
                checkes[j].checked = this.checked;
            }
            return;
        }
        var flag = true;
        for (var j = 1; j < checkes.length; j++) {
            if (!checkes[j].checked) {
                flag = false;
                break;
            }
        }
        checkes[0].checked = flag;
    }
}
