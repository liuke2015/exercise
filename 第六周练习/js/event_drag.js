/**
 * Created by dell on 2016/2/18.
 */
function down(e){
    this.starL=this.offsetLeft;
    this.starT=this.offsetTop;
    this.starX= e.clientX;
    this.starY= e.clientY;

    if(this.setCapture){
        this.setCapture();
        on(this,"mousemove",move);
        on(this,"mouseup",up);
    }else{
        this.MOVE=processThis(this,move);
        this.UP=processThis(this,up);
        on(document,"mousemove",this.MOVE);
        on(document,"mouseup",this.UP);
    }
    e.preventDefault();
    selfRun.call(this,"selfClearEvent",e);
}
function move(e){
    this.style.left=(this.starL+(e.clientX-this.starX))+"px";
    this.style.top=this.starT+(e.clientY-this.starY)+"px";
    selfRun.call(this,"selfGetSpeed",e);
}
function up(e){
    if(this.releaseCapture){
        this.releaseCapture();
        off(this,"mousemove",move);
        off(this,"mouseup",up);
    }else{
        off(document,"mousemove",this.MOVE);
        off(document,"mouseup",this.UP);
    }
    selfRun.call(this,"selfDragEnd",e);
}
function processThis(obj,fn){
    return function(e){fn.call(obj,e);}
}