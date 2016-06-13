function down(e){
    e=e||window.event;
    this.starL=this.offsetLeft;
    this.starT=this.offsetTop;
    this.starX= e.clientX;
    this.starY= e.clientY;

   if(this.setCapture){
       this.setCapture();
       on(this,"mousemove",move);
       on(this,"mouseup",up);
   }else{
       this.MOVE=myBind(this,move);
       this.UP=myBind(this,up);
       on(document,"mousemove",this.MOVE);
       on(document,"mouseup",this.UP);
   }
}

function move(e){
    e=e||window.event;
    this.style.left=this.starL+(e.clientX-this.starX)+"px";
    this.style.top=this.starT+(e.clientY-this.starY)+"px";
}

function up(e){
    e=e||window.event;
    if(this.releaseCapture){
        this.releaseCapture();
        off(this,"mousemove",move);
        off(this,"mouseup",up);
    }else{
        off(document,"mousemove",this.MOVE);
        off(document,"mouseup",this.UP);
    }
}

function myBind(obj,fn){
    return function(e){
        fn.call(obj,e)
    }
}