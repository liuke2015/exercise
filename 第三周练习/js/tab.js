var oTab = document.getElementById("tab");
var tHd = oTab.tHead;
var tBody = oTab.tBodies[0];
var rows=tBody.rows;
var ths = tHd.getElementsByTagName("th");

//1、绑定数据
var initDate = function () {
    if (!dataAry) {
        return;
    }
    var frg=document.createDocumentFragment();
    for (var i = 0; i < dataAry.length; i++) {
        var cur = dataAry[i];
        cur.name = cur.name || "--";
        cur.age = cur.age || 25;
        cur.score = cur.score || 60;
        cur.sex = cur.sex || 0;

        var oTr=document.createElement("tr");
        var oTd=document.createElement("td");
        oTd.innerHTML="<input type='checkbox' name='ck'/>";
        oTr.appendChild(oTd);
        for(var key in cur){
            oTd=document.createElement("td");
            oTd.innerHTML=cur[key];
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
};
initDate();
//2、隔行变色
var changeBg=function(){
    for(var i=0;i<rows.length;i++){
        rows[i].className=i%2===1?"bg":null;
    }
};
changeBg();
//3、排序
var sortTab=function(index){
    var ary=utils.listToArray(rows),frg=document.createDocumentFragment();
    ary.sort(function(a,b){
        var n = a.cells[index].innerHTML, m = b.cells[index].innerHTML;
        var nNum = parseFloat(n), mNum = parseFloat(m);
        if (isNaN(nNum) || isNaN(mNum)) {
             return n.localeCompare(m);
        }
        return nNum-mNum;
    });
    if(this.sort==="asc"){
        this.sort="desc";
        ary.reverse();
    }else{
        this.sort="asc";
    }
    for(var i=0;i<ths.length;i++){
        if(i===index){
            continue;
        }
        ths[i].sort=null;
    }
    for(var i=0;i<ary.length;i++){
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    changeBg();
};
//4、绑定排序
for(var i=0;i<ths.length;i++){
    var th=ths[i];
    th.index=i;
    th.onclick=function(){
        if(this.className==="cur"){
            sortTab.call(this,this.index)
        }
    }
}
//5、全选非全选
var cks=document.getElementsByName("ck");
for(var i=0;i<cks.length;i++){
    var ck=cks[i];
    ck.index=i;
    ck.onclick=function(){
        if(this.index==0){
            for(var k=1;k<cks.length;k++){
                cks[k].checked=this.checked;
            }
        }
        var flog=true;
        for(var k=1;k<cks.length;k++){
            if(!cks[k].checked){
                flog=false;
                break;
            }
        }
       cks[0].checked=flog;
    }
}

