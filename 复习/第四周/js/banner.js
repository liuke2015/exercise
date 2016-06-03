//简易动画库
var oUl = document.getElementById("picList"), oLis = document.getElementById("tip").getElementsByTagName("li");
var index = 0, oPicList = document.getElementById("picList");

function move(curEle, attr, value, duration, interval, callBack) {
    var _this = curEle, curV = utils.css(_this, attr);
    var dir = Math.abs(value) > Math.abs(curV) ? true : false;
    var step = ((value - curV) / duration) * interval;
    window.clearTimeout(_this.moveTimer);
    ~function _move() {
        window.clearTimeout(_this.timer);
        var curV = utils.css(_this, attr);

        if ((dir && (curV + step <= value)) || (!dir && (curV + step >= value))) {
            utils.css(_this, attr, value);
            if (typeof callBack == "function") {
                callBack.call(_this, attr);
                return;
            }
        }
        utils.css(_this, attr, curV + step);
        _this.timer = window.setTimeout(_move, interval);
    }();
}
function autoTip(index) {
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = null;
    }
    oLis[index].className = "select";
}
function changeTip() {
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].index = i;
        oLis[i].onclick = function () {
            clearTimeout(oPicList.moveTimer);
            index = this.index - 1;
            autoTip(index + 1);
            autoMove(index);
        }
    }
}
function autoMove() {
    index++;
    move(oPicList, "left", -index * 1000, 600, 10, function (attr) {
        if (index >= 4) {
            index = 0;
            utils.css(this, attr, 0);
        }
        autoTip(index);
        this.moveTimer = window.setTimeout(autoMove, 3000);
    })
}
function appendLi() {
    var li = document.createElement("li");
    li.innerHTML = utils.first(oUl).innerHTML;
    oUl.appendChild(li);
    var liLen = oUl.getElementsByTagName("li").length;
    utils.css(oUl, "width", liLen * 1000);

}
oPicList.moveTimer = window.setTimeout(autoMove, 3000);
changeTip();
appendLi();