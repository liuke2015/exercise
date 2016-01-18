/**
 * Created by Administrator on 2016/1/14 0014.
 */
var oTab=document.getElementById("oTable");
var tHs=oTab.tHead.getElementsByTagName("th");
var tBody=oTab.tBodies[0];
var rows=tBody.getElementsByTagName("tr");
/*//1�����ݰ�
function initData(){
    for(var i=0;i<dataAry.length;i++){
        var cur=dataAry[i];
        //���ݳ�ʼ������������ݸ���һ���Ѻõĳ�ʼֵ
        cur.name=cur.name||"--";
        cur.age=cur.age||25;
        cur.score=cur.score||60;

        //ѭ������tr,td
        var tr=document.createElement("tr");
        var str="";
        str+="<td>"+cur.name+"</td>";
        str+="<td>"+cur.age+"</td>";
        str+="<td>"+cur.score+"</td>";

        tr.innerHTML=str;
        tBody.appendChild(tr);
    }
    changeBG();
}*/
//1�����ĵ���Ƭ�ķ�ʽ�������ݰ�
function initData(){
    var frg=document.createDocumentFragment();
    for(var i=0;i<dataAry.length;i++){
        var cur=dataAry[i];
        cur.name=cur.name||"--";
        cur.age=cur.age||25;
        cur.score=cur.score||60;

        var tr=document.createElement("tr");
        var str="";
        str+="<td>"+cur.name+"</td>";
        str+="<td>"+cur.age+"</td>";
        str+="<td>"+cur.score+"</td>";
        tr.innerHTML=str;
        frg.appendChild(tr);
    }
    tBody.appendChild(frg);
    changeBG();
}

initData();

//2�����б�ɫ
function changeBG(){
    for(var i=0;i<rows.length;i++){
        rows[i].className=i%2==1?"bg":null;
    }
}

//3���������
function sortTab(n){
    var ary=utils.listToArray(rows);
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
    //���ź������������ѭ����ӵ�ԭ���ı����
    for(var i=0;i<ary.length;i++){
        tBody.appendChild(ary[i]);
    }
    changeBG();
}
//�����������
for(var i=0;i<tHs.length;i++){
    tHs[i].index=i;
    tHs[i].onclick=function(){
        sortTab.call(this,this.index);
    }
}
