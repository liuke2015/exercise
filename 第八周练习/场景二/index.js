/**
 * Created by dell on 2016/4/22.
 */
function getEle(ele) {
    return document.querySelector(ele);
}
var main = getEle("#main");
var winW = document.documentElement.clientWidth, winH = document.documentElement.clientHeight;
var desW = 960, desH = 1008;
if (winW / winH > desW / desH) {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
} else {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
}
var ary = ['phoneBg.jpg', 'cubeBg.jpg', 'cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png', 'cubeImg5.png', 'cubeImg6.png', 'phoneBtn.png', 'phoneKey.png', 'messageHead1.png', 'messageHead2.png', 'messageText.png', 'phoneHeadName.png'];
function fnLoad() {
    var n = 0, oSpan = getEle(".progress>span");
    ary.forEach(function () {
        var img = new Image();
        img.src = "images/" + arguments[0];
        img.onload = function () {
            n++;
            oSpan.style.width = n / ary.length * 100 + "%";
        };
    });
    oSpan.addEventListener("webkitTransitionEnd", function () {
        this.webkitTransition = "";
        this.parentNode.parentNode.remove();
    }, false);
}
fnLoad();