function EventEmitter(){}
EventEmitter.prototype.on=function(type,fn){
    if(!this[type]){
        this[type]=[];
    }
    var ary=this[type];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(ary[i]==fn){
                return;
            }
        }
    }
    ary.push(fn);
};
EventEmitter.prototype.run=function(type,e){
    var ary=this[type];
    if(ary){
        for(var i=0;i<ary.length;i++){
            if(typeof ary[i]=="function"){
                ary[i].call(this,e);
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
                return;
            }
        }
    }
};
function myBind(obj,fn){
    return function(e){
        fn.call(obj,e);
    }
}
function Drag(ele){
    this.ele=ele;
    this.starL=null;
    this.starT=null;
    this.starX=null;
    this.starY=null;

    this.DOWN=myBind(this,this.down);
    this.MOVE=myBind(this,this.move);
    this.UP=myBind(this,this.up);

    on(this.ele,"mousedown",this.DOWN);
}
Drag.prototype=new EventEmitter();
Drag.prototype.down=function(e){
    e.preventDefault();

    this.starL=this.ele.offsetLeft;
    this.starT=this.ele.offsetTop;
    this.starX= e.clientX;
    this.starY=e.clientY;

    if(this.ele.setCapture){
        this.ele.setCapture();
        on(this.ele,"mousemove",this.MOVE);
        on(this.ele,"mouseup",this.UP);
    }else{
        on(document,"mousemove",this.MOVE);
        on(document,"mouseup",this.UP);
    }
    this.run("dragStart",e);
};
Drag.prototype.move=function(e){
    this.ele.style.left=this.starL+(e.clientX-this.starX)+"px";
    this.ele.style.top=this.starT+(e.clientY-this.starY)+"px";
    this.run("drag",e);
};
Drag.prototype.up=function(e){
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off(this.ele,"mousemove",this.MOVE);
        off(this.ele,"mouseup",this.MOVE);
    }else{
        off(document,"mousemove",this.MOVE);
        off(document,"mouseup",this.MOVE);
    }
    this.run("dragEnd",e);
};
Drag.prototype.addBorder=function(){
    this.ele.style.border="2px solid #f0f";
};
Drag.prototype.removeBorder=function(){
    this.ele.style.border="0px";
};
Drag.prototype.border=function(){
    this.on("drag",this.addBorder);
    this.on("dragEnd",this.removeBorder);
};

