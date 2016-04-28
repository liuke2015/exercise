/**
 * Created by dell on 2016/4/22.
 */
function getEle(ele) {
    return document.querySelector(ele);
}
var main = getEle("#main");
var winW = document.documentElement.clientWidth, winH = document.documentElement.clientHeight;
var desW = 640, desH = 1008;

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
        phone.init();
    }, false);
}
fnLoad();
var tel = getEle("#tel"), cUp = getEle(".callUp"), cDown = getEle(".callDown");
var phone = {
    init: function () {
        tel.addEventListener("touchstart", this.fnClick, false);
    },
    fnClick: function (e) {
        if (e.target.className == "callUp-click") {
            cUp.style.opacity = "0";
            cDown.style.opacity = "1";
            cDown.style.webkitTransform = "translateY(0)";
            cDown.style.zIndex = "9";
        } else {
            if (e.target.className == "callDown-click") {
                tel.style.webkitTransform = "translateY(" + desH + "px)";
                window.setTimeout(function () {
                    tel.remove();
                    fnMess();
                }, 1000);
            }
        }
    }
};
var mes = getEle("#message"), oMesUl = getEle("#message>ul");
var oLis = document.querySelectorAll("#message>ul>li");
function fnMess() {
    var n = 0, h = 0;
    var timer = window.setInterval(function () {
        var cur = oLis[n];
        cur.style.opacity = 1;
        cur.style.webkitTransform = "translateY(0)";
        h += cur.offsetHeight;
        hY = h - cur.offsetHeight;

        if (n == oLis.length - 1) {
            window.clearInterval(timer);
            window.setTimeout(function () {
                mes.style.display = "none";
                fnCube();
            }, 1000);
        } else if (n >= 3) {
            oMesUl.style.webkitTransform = "translateY(" + (-hY) + "px)";
            n++;
        } else {
            n++;
        }
    }, 1000);
}
var cBox = getEle(".cubeBox"), cLis = document.querySelectorAll(".cubeBox>li");
function fnCube() {
    var sPos = {x: 0, y: 0}, xDeg = 45, yDeg = 45;
    cBox.style.webkitTransform = "scale(0.6) rotateX(45deg) rotateY(45deg)";
    [].forEach.call(cLis, function () {
        arguments[0].addEventListener("touchstart", start, false);
        arguments[0].addEventListener("touchmove", move, false);
        arguments[0].addEventListener("touchend", end, false);
    });
    function start(e) {
        sPos.x = e.changedTouches[0].pageX;
        sPos.y = e.changedTouches[0].pageY;
    }

    function move(e) {
        var moveX = e.changedTouches[0].pageX, moveY = e.changedTouches[0].pageY;
        this.changeX = moveX - sPos.x;
        this.changeY = moveY - sPos.y;
        cBox.style.webkitTransform = "scale(.6) rotateX(" + (-this.changeY - yDeg) + "deg) rotateY(" + (this.changeX + xDeg) + "deg)";
    }

    function end(e) {
        xDeg += this.changeX;
        yDeg += this.changeY;
    }
}


