/**
 * Created by Administrator on 2016/1/14 0014.
 */
//该方法比表格排序1有了改进，增加了文档碎片的处理方式，并且增加了全选与非全选的功能
//1、数据绑定
var oTab = document.getElementById("oTable");
var thList = oTab.tHead.getElementsByTagName("th");
var oTBody = oTab.tBodies[0];
var rowList = oTBody.rows;

function initData() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < dataAry.length; i++) {
        var cur=dataAry[i];
        cur.name=cur.name||"--";
        cur.age=cur.age||0;
        cur.score=cur.score||0;

        var oTr = document.createElement("tr"), oTdF = document.createElement("td");
        oTdF.innerHTML = "<input type='checkbox' name='tab'/>";
        oTr.appendChild(oTdF);
        for(var key in cur){
            var oTd=document.createElement("td");
            oTd.innerHTML=cur[key];
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    oTBody.appendChild(frg);
    changeBG();
}
initData();
//2、隔行变色
function changeBG(){
    for(var i=0;i<rowList.length;i++){
        rowList[i].className=i%2===1?"bg":null;
    }
}
//3、排序
function sortList(n){

    var ary=utils.listToArray(rowList);
    ary.sort(function(a,b){
        var cur= a.cells[n].innerHTML,next= b.cells[n].innerHTML;

        var curNum=parseFloat(cur),nextNum=parseFloat(next);
        if(isNaN(curNum)){
            return cur.localeCompare(next);
        }
        return curNum-nextNum;
    });

    if(this.sortType){
        this.sortType=0;
        ary.reverse();
    }else{
        this.sortType=1;
    }

    var frg=document.createDocumentFragment();
    for(var i=0;i<ary.length;i++){
        frg.appendChild(ary[i]);
    }
    oTBody.appendChild(frg);
    changeBG();
}
//4、触发排序
for(var i=0;i<thList.length;i++){
    thList[i].index=i;
    thList[i].onclick=function(){
        if(this.className=="cursor"){
            sortList.call(this,this.index);
        }
    }
}
//5、全选与非全选
/*var oInputs=document.getElementsByName("tab");
for(var i=0;i<oInputs.length;i++){
    oInputs[i].index=i;
    oInputs[i].onclick=function(){
        if(this.index==0){
            for(var k=1;k<oInputs.length;k++){
                oInputs[k].checked=this.checked;
            }
        }
        var flog=true;
        for(var k=1;k<oInputs.length;k++){
            if(!oInputs[k].checked){
                flog=false;
                break;
            }
        }
        oInputs[0].checked=flog;
    }
}*/
var checks=document.getElementsByName("tab");
for(var i=0;i<checks.length;i++){
    checks[i].index=i;
    checks[i].onclick=function(){
        if(this.index===0){
            for(var k=1;k<checks.length;k++){
                checks[k].checked=this.checked;
            }
        }
        var flog=true;
        for(var k=1;k<checks.length;k++){
            if(!checks[k].checked){
                flog=false;
                break;
            }
        }
        checks[0].checked=flog;
    }
}
