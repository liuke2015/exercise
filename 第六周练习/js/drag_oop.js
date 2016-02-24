/**
 * Created by dell on 2016/2/22.
 */
function processThis(obj,fn){
    return function(e){
        fn.call(obj,e);
    }
}
function EventEmitter(){}
EventEmitter.prototype.on=function(type,fn){
    if(!this[type]){
        this[type]=[];
    }
    var ary=this[type];
    for(var i=0;i<ary.length;i++){
        if(ary[i]==fn){
            return;
        }
    }
    ary[ary.length]=fn;
};
EventEmitter.prototype.run=function(type,e){
    var ary=this[type];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(typeof ary[i]=="function"){
                ary[i].call(this,e)
            }else{
                ary.splice(i,1);
                i--;
            }
        }
    }
};
EventEmitter.prototype.off=function(type,fn){
    var ary=this[type];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(ary[i]==fn){
                ary[i]=null;
                break;
            }
        }
    }
};

function Drag(ele){
    this.starL=null;
    this.starT=null;
    this.starX=null;
    this.starY=null;
    this.ele=ele;

    this.MOVE=processThis(this,this.move);
    this.UP=processThis(this,this.up);
    this.DOWN=processThis(this,this.down);

    on(this.ele,"mousedown",this.DOWN);
}
Drag.prototype=new EventEmitter();
Drag.prototype.down=function(e){
    this.starL=this.ele.offsetLeft;
    this.starT=this.ele.offsetTop;
    this.starX= e.pageX;
    this.starY= e.pageY;

    if(this.ele.setCapture){
        this.ele.setCapture();
        on(this.ele,"mousemove",this.MOVE);
        on(this.ele,"mouseup",this.UP);
    }else{
        on(document,"mousemove",this.MOVE);
        on(document,"mouseup",this.UP);
    }
    this.run("dragStar",e);
    e.preventDefault();
};
Drag.prototype.move=function(e){
    this.ele.style.left=this.starL+(e.pageX-this.starX)+"px";
    this.ele.style.top=this.starT+(e.pageY-this.starY)+"px";
    this.run("drag",e);
};
Drag.prototype.up=function(e){
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off(this.ele,"mousemove",this.MOVE);
        off(this.ele,"mouseup",this.Up);
    }else{
        off(document,"mousemove",this.MOVE);
        off(document,"mouseup",this.Up);
    }
    this.run("dragEnd",e);
};
Drag.prototype.addBorder=function(){
    this.ele.style.border="1px dashed blue";
};
Drag.prototype.removeBorder=function(){
    this.ele.style.border="";
};
Drag.prototype.border=function(){
    this.on("dragStar",this.addBorder);
    this.on("dragEnd",this.removeBorder);
};
