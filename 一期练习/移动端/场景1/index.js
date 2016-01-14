/**
 * Created by Administrator on 2015/12/17 0017.
 */
var main=document.querySelector("#main");
var oLis=document.querySelector(".slide>li");
var winW=window.innerWidth;
var winH=window.innerHeight;
var desW=640;
var desH=960;
main.style.webkitTransform="scale("+winH/desH+")";
[].forEach.call(oLis,function(){
    arguments[0].addEventListener("touchstart",start,false);
    arguments[0].addEventListener("touchmove",move,false);
    arguments[0].addEventListener("touchend",end,false);
});
function start(e){
   this.startX= e.changedTouches[0].pageY;
    console.log(this.startX);
}
function move(e){
    e.preventDefault();
    var touchMove= e.changedTouches[0].pageY;
}
function end(){
    console.log(e.change)
}

//console.log(e.touches);
//console.log(e.targetTouches);
//console.log(e.changedTouches);