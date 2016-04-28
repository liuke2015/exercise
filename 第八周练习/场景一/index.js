/**
 * Created by dell on 2016/4/14.
 */
/*var main = document.querySelector("#main"), oLis = document.querySelectorAll(".slider>li");
 var winW = window.innerWidth, winH = window.innerHeight;
 var desW = 640, desH = 960;
 main.style.webkitTransform = "scale(" + winH / desH + ")";
 [].forEach.call(oLis, function () {
 arguments[0].index = arguments[1];
 arguments[0].addEventListener("touchstart", start, false);
 arguments[0].addEventListener("touchmove", move, false);
 arguments[0].addEventListener("touchend", end, false);
 });
 function start(e) {
 this.startY = e.changedTouches[0].pageY;
 console.log(this.index);
 }
 function move(e) {
 e.preventDefault();
 this.flag=true;
 var cur = this.index;
 var moveY = e.changedTouches[0].pageY;
 var changeY = moveY - this.startY;
 var step = 1 / 2;
 var changePos = (Math.abs(changeY) / winH) * step;
 [].forEach.call(oLis, function () {
 if (arguments[1] != cur) {
 arguments[0].style.display = "none";
 }
 arguments[0].className = "";
 arguments[0].firstElementChild.id="";
 arguments[0].style.webkitTransition = "";//自己想到的清除动画积累
 });
 if (changeY > 0) {/!*向下滑动*!/
 this.preSIndex = cur == 0 ? oLis.length - 1 : cur - 1;
 var pos = -winH + changeY;
 } else {/!*向上滑动*!/
 this.preSIndex = cur == oLis.length - 1 ? 0 : cur + 1;
 var pos = winH + changeY;
 }
 oLis[this.preSIndex].style.webkitTransform = "translate(0," + pos + "px)";
 oLis[this.preSIndex].className = "zIndex";
 oLis[this.preSIndex].style.display = "block";
 oLis[cur].style.webkitTransform = "scale(" + (1 - changePos) + ") translate(0," + changeY + "px)";
 }
 function end(e) {
 if(this.flag){
 oLis[this.preSIndex].style.webkitTransform = "translate(0,0)";
 oLis[this.preSIndex].style.webkitTransition = "0.3s";
 oLis[this.preSIndex].addEventListener("webkitTransitionEnd", function () {
 this.style.webkitTransition = "";//老师教的清除动画积累的方法，但是如果滑屏过快，还是无法清除积累
 this.firstElementChild.id="a"+(this.index+1);
 },false);
 }
 }*/
var main = document.querySelector("#main"), oLis = document.querySelectorAll(".slider>li");
var winW = window.innerWidth, winH = window.innerHeight;
var desW = 640, desH = 960;
main.style.webkitTransform = "scale(" + winH / desH + ")";
[].forEach.call(oLis, function () {
    arguments[0].index = arguments[1];
    arguments[0].addEventListener("touchstart", start, false);
    arguments[0].addEventListener("touchmove", move, false);
    arguments[0].addEventListener("touchend", end, false);
});
function start(e) {
    this.startY = e.changedTouches[0].pageY;
}
function move(e) {
    e.preventDefault();
    var moveY = e.changedTouches[0].pageY;
    var pos = moveY - this.startY;
    var cur = this.index;
    var movePos=0;
    var step=1/2;
    var scalePos=Math.abs(pos)/winH*step;

    [].forEach.call(oLis,function(){
        if(arguments[1]!=cur) {
            arguments[0].style.display="none";
        }
        arguments[0].className="";
        arguments[0].style.webkitTransition="";
        arguments[0].firstElementChild.id="";
    });

    if (pos > 0) {/*向下滑动*/
        this.preSIndex = cur == 0 ? oLis.length - 1 : cur - 1;
        movePos=-winH+pos;
    } else {/*向上滑动*/
        this.preSIndex = cur == oLis.length - 1 ? 0 : cur + 1;
        movePos=winH+pos;
    }
    oLis[this.preSIndex].className="zIndex";
    oLis[this.preSIndex].style.display="block";
    oLis[this.preSIndex].style.webkitTransform="translate(0,"+movePos+"px)";
    oLis[cur].style.webkitTransform="scale("+(1-scalePos)+") translate(0,"+pos+"px)";
}
function end(e){
    oLis[this.preSIndex].style.webkitTransform="translate(0,0)";
    oLis[this.preSIndex].style.webkitTransition=".5s";
    oLis[this.preSIndex].addEventListener("webkitTransitionEnd",function(){
        this.firstElementChild.id="a"+(this.index+1);
    },false);
}

