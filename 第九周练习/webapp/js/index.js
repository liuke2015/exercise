//基于内置类String.prototype上的我们自己的常用方法
(function (pro) {
    pro.myFormatTime = function myFormatTime() {
        var reg = /^(\d{4})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:\s+)?(\d{1,2})?(?:-|\/|\.|:)?(\d{1,2})?(?:-|\/|\.|:)?(\d{1,2})?$/, ary = [];
        this.replace(reg, function () {
            ary = [].slice.call(arguments, 1, 7);
        });
        var formate = arguments[0] || "{0}-{1}-{2} {3}-{4}-{5}";
        return formate.replace(/{(\d+)}/g, function () {
            var val = arguments[1];
            return val && val.length > 1 ? val : "0" + val;
        });
    };
})(String.prototype);

//1、通过ajax获取数据
var dataMatch = null;
$.ajax({
    url: "json.txt?_=" + Math.random(),
    type: "get",
    dataType: "json",
    async: false,
    success: function (data) {
        if (data && data[0] == 0) {
            dataMatch = data[1];
        }
    }
});
//2、给video绑定播放文件和poster图片
$(".player>video").attr({
    src: dataMatch["live"],
    poster: dataMatch["matchPic"]
});

//3、给比赛分数支持率绑定数据
var matchInfo = dataMatch["matchInfo"], str = "";

str += '<div class="score"><div><span class="img-box"><img src="'+matchInfo["leftBadge"]+'"></span> <span class="num">' + matchInfo["leftGoal"] + '</span></div><div>'+matchInfo["startTime"].myFormatTime("{1}月{2}日{3}:{4}")+'</div><div><span class="img-box"><img src="'+matchInfo["rightBadge"]+'"></span><span class="num">'+matchInfo["rightGoal"]+'</span></div></div><div class="progress"><span></span></div><div class="spo"><div><em dir="left"></em> <span>'+dataMatch["leftSupport"]+'</span></div><div>'+matchInfo["matchDesc"]+'</div><div><em dir="right"></em> <span>'+dataMatch["rightSupport"]+'</span></div></div>';

$(".score-spo").html(str);
//4、计算支持比例
function spo(l,r){
    var w=l/(l+r)*100;
    $(".progress>span").css({width:w+"%"});
}

var spans=$(".spo span");
var ems=$(".spo em");
var spoL=parseFloat(spans[0].innerHTML),spoR=parseFloat(spans[1].innerHTML);
spo(spoL,spoR);


//本地存储读取数据，如果有数据将不再有点击事件
var isSup=false;
var support=localStorage.getItem("support");
if(support){
    isSup=true;
    support=JSON.parse(support);
    var dir=support.dir;
    var lef=support.leftSupport;
    var rig=support.rightSupport;

    dir=="left"?ems[0].className="select":ems[1].className="select";
    spans[0].innerHTML=lef;
    spans[1].innerHTML=rig;


}
//点击支持，数字增加、比例条改变
$(".spo").find("em").singleTap(function(){
   // $(this).parents(".spo").find("em").removeClass("select");
    if(isSup){
        return;
    }
    $(this).addClass("select");
    var sportN=parseFloat( $(this).siblings("span").html());
    $(this).siblings("span").html(sportN+1);
    isSup=true;

    var spoL=parseFloat(spans[0].innerHTML),spoR=parseFloat(spans[1].innerHTML);
    spo(spoL,spoR);
    var d=$(this).attr("dir");
    var supObj={
      dir:d,
      leftSupport:spoL,
      rightSupport:spoR
    };
    localStorage.setItem("support",JSON.stringify(supObj));
});
