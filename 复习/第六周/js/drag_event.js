function down(e){
    e=e|| window.event;

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
    e.preventDefault? e.preventDefault(): e.returnValue=false;
   selfRun(this,"selfDragStart");
}
function move(e){
    e=e||window.event;
    this.style.left=this.starL+(e.clientX-this.starX)+"px";
    this.style.top=this.starT+(e.clientY-this.starY)+"px";
   selfRun(this,"selfDrag");
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
   selfRun(this,"selfDragEnd");
}

