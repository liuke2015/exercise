/**
 * Created by dell on 2016/4/25.
 */
/**动态设置html字体大小**/
var winW = document.documentElement.clientWidth, winH = document.documentElement.clientHeight;
var desW = 640;
document.documentElement.style.fontSize = winW / desW * 100 + "px";
/***获取元素函数**/
function getEle(ele) {
    return document.querySelector(ele);
}
function getEleA(ele) {
    return document.querySelectorAll(ele);
}
/**音乐**/
var bell=getEle("#bell"),say=getEle("#say"),music=getEle("#music");
/***进度条***/
var picAry = ['phoneBg.jpg', 'cubeBg.jpg', 'cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png', 'cubeImg5.png', 'cubeImg6.png', 'phoneBtn.png', 'phoneKey.png', 'messageHead1.png', 'messageHead2.png', 'messageText.png', 'phoneHeadName.png'];
var oLoad = getEle(".load"), oSpan = getEle(".progress>span");
function imgLoad() {
    var n = 0;
    picAry.forEach(function () {
        var img = new Image();
        img.src = "images/" + arguments[0];
        img.onload = function () {
            n++;
            var spanW = n / picAry.length * 100;
            oSpan.style.width = spanW + "%";
        }
    });
    oSpan.addEventListener("webkitTransitionEnd", function () {
        oSpan.webkitTransition = "";
        oLoad.remove();
        tel.init();
    }, false);

}
imgLoad();
/***接听挂断电话**/
var telBox = getEle(".telBox"), callU = getEle(".callUp"), callD = getEle(".callDown");
var tel = {
    init: function () {
        bell.play();
        telBox.addEventListener("touchstart", this.telMove, false);
    },
    telMove: function (e) {
        var tar = e.target;
        if (tar.className == "callUpClick") {
            callU.style.display = "none";
            callD.style.opacity = 1;
            callD.style.webkitTransform = "translateY(0)";
            bell.pause();
            say.play();
        } else if (tar.className == "DownClick") {
            telBox.style.webkitTransform = "translateY(" + winH + "px)";
            say.pause();
            window.setTimeout(function () {
                telBox.remove();
                fnMes();
            }, 1000);
        }
    }
};
/**咨询对话***/
function fnMes() {
    music.play();
    var oMs = getEle(".mess"), oMsList = getEle(".mesList"), oLis = getEleA(".mesList>li");
    var n = 0,h= 0,tH=0;
    var timer = window.setInterval(function () {
        var cur = oLis[n];
        h+=cur.clientHeight;
        tH=h-cur.clientHeight;
        with (cur.style) {
            opacity = 1;
            webkitTransform = "translateY(0)";
        }
        if(n%3==0){
            oMsList.style.webkitTransform="translateY("+(-tH)+"px)";
        }
        if (n == oLis.length-1) {
            clearInterval(timer);
            window.setTimeout(function(){
                oMs.style.display="none";
                cube();
            },3000);
        } else {
            n++;
        }
    }, 1000);
}

/**魔方***/
function cube(){
    var cubeBox=getEle(".cube>ul"),cubLis=getEleA(".cube>ul>li");
    cubeBox.style.webkitTransform="scale(.8) rotateX(45deg) rotateY(45deg)";
    var startPos={x:0,y:0},degX=45,degY=45;
    [].forEach.call(cubLis,function(){
        arguments[0].addEventListener("touchstart",start,false);
        arguments[0].addEventListener("touchmove",move,false);
        arguments[0].addEventListener("touchend",end,false);
    });
    function start(e){
        startPos.x= e.changedTouches[0].pageX;
        startPos.y= e.changedTouches[0].pageY;
    }
    function move(e){
        var moveX= e.changedTouches[0].pageX;
        var moveY= e.changedTouches[0].pageY;
        this.posX=moveX-startPos.x;
        this.posY=moveY-startPos.y;
        var nowX=degX+this.posX,nowY=degY+this.posY;
        cubeBox.style.webkitTransform="scale(.8) rotateX("+(-this.posY-degY)+"deg) rotateY("+nowX+"deg)";
    }
    function end(e){
        degX+=this.posX;
        degY+=this.posY;
    }
}

