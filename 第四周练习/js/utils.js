/**
 * utils(v1.0):����DOM�����ĳ��÷���
 * by Team on 2016/1/26
 */
(function () {
    var _utils = {
        listToArray: function listToArray(likeAry) {
            try {
                return Array.prototype.slice.call(likeAry, 0);
            } catch (e) {
                var ary = [];
                for (var i = 0; i < likeAry.length; i++) {
                    ary[ary.length] = likeAry[i];
                }
            }
            return ary;
        },
        toJSON: function toJSON(str) {
            return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
        }
    };
  /*
  * 1����ȡDOMԪ�ؽڵ�ķ���
  * */
    //ͨ��������ȡԪ��
    _utils.getElementsByClassName=function getElementsByClassName(strClass,context){
      /*  context=context||document;
        if("getElementsByClassName" in document){
            return this.listToArray(document.getElementsByClassName(strClass));
        }
        var regTime=/(^ +)|( +$)/g,aryClass =strClass.replace(regTime,"").split(/\s+/),tagList=context.getElementsByTagName("*"),ary=[];
        for(var i=0;i<tagList.length;i++){
            var cur=tagList[i];
            cur.flag=true;
            for(var k=0;k<aryClass.length;k++){
                var reg=new RegExp("(^| +)"+aryClass[k]+"( +|$)");
                if(!reg.test(cur.className)){
                    cur.flag=false;
                    break;
                }
            }
            if(cur.flag){
                ary[ary.length]=cur;
            }
        }
        return ary;*/
        context=context||document;
        if("getElementsByClassName" in document){
            return this.listToArray(context.getElementsByClassName(strClass));
        }
        var regTrim=/(^ +)|( +$)/g,aryClass=strClass.replace(regTrim,"").split(/\s+/),tagList=context.getElementsByTagName("*"),ary=[];
        for(var i=0;i<tagList.length;i++){
            var cur=tagList[i];
            cur.flag=true;
            for(var k=0;k<aryClass.length;k++){
                var reg=new RegExp("(^| +)"+aryClass[k]+"( +|$)");
                if(!reg.test(cur.className)){
                    cur.flag=false;
                    break;
                }
            }
            if(cur.flag){
                ary[ary.length]=cur;
            }
        }
        return ary;
    };
    //��ȡĳԪ���µ�����Ԫ���ӽڵ�
    _utils.children=function children(curEle,tagName){
      /*  var nodes=curEle.childNodes,ary=[];
        for(var i=0;i<nodes.length;i++){
            var cur=nodes[i];
            if(cur.nodeType==1){
                if(typeof tagName=="String"){
                    if(cur.nodeName.toLowerCase()==tagName.toLowerCase()){
                        ary[ary.length]=cur;
                    }
                    continue;
                }
                ary[ary.length]=cur;
            }
        }
        return ary;*/
        var nodes=curEle.childNodes,ary=[];
        for(var i=0;i<nodes.length;i++){
            var cur=nodes[i];
            if(cur.nodeType==1){
                if(typeof tagName=="string"){
                    if(cur.nodeName.toLowerCase()==tagName.toLowerCase()){
                        ary[ary.length]=cur;
                    }
                    continue;
                }
                ary[ary.length]=cur;
            }
        }
        return ary;
    };
    //���Ԫ�ظ��ڵ�
    _utils.prev=function prev(curEle){
        if("previousElementSibling" in curEle){
            return curEle.previousElementSibling;
        }
        var pre=curEle.previousSibling;
        while(pre&& pre.nodeType!==1){
            pre=pre.previousSibling;
        }
        return pre;
    };
    //���Ԫ�����и��ڵ�
    _utils.prevAll=function prevAll(curEle){
        var pre=this.prev(curEle),ary=[];
        while(pre){
            ary.unshift(pre);
            pre=this.prev(pre)
        }
        return ary;
    };
    //���Ԫ������λ��
    _utils.getIndex=function getIndex(curEle){
       return this.prevAll(curEle).length;
    };
    //��ȡԪ�صܵܽڵ�
    _utils.next=function next(curEle){
        if("nextElementSibling" in curEle){
            return curEle.nextElementSibling;
        }
        var nex=curEle.nextSibling;
        if(nex&&nex.nodeType!==1){
            nex=nex.nextSibing;
        }
        return nex;
    };
    //��ȡԪ�����еܵܽڵ�
    _utils.nextAll=function nextAll(curEle){
        var nex=this.next(curEle),ary=[];
        while(nex){
            ary[ary.length]=nex;
            nex=this.next(nex);
        }
        return ary;
    };
    //��ȡԪ���ֵܽڵ�
    _utils.sibling=function sibling(curEle){
        var pre=this.prev(curEle),nex=this.next(curEle),ary=[];
        pre?ary[ary.length]=pre:void 0;
        nex?ary[ary.length]=nex:void 0;
        return ary;
    };

    //��ȡԪ�������ֵܽڵ�
    _utils.siblings=function siblings(curEle){
        var pre=this.prevAll(curEle),nex=this.nextAll(curEle);
        return pre.concat(nex);
    }
    //��ȡԪ�ص�һ���ӽڵ�
    _utils.first=function first(curEle,tagName){
        return this.children(curEle,tagName)[0];
    };
    //��ȡԪ�����һ���ӽڵ�
    _utils.last=function last(curEle,tagName){
        var children=this.children(curEle,tagName);
        return children[children.length-1];
    };
    /*
    * 2����ȡ������DOM��ʽ�ķ���
    */
    //��ȡ������Ԫ����ʽֵ
    _utils.css=function css(curEle,attr,value){
      //get
        var reg=/^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem)$/;
        if(typeof value==="undefined"){
            var val="getComputedStyle" in window?window.getComputedStyle(curEle,null)[attr]:curEle.currentStyle[attr];
            return reg.test(val)?parseFloat(val):val;
        }
        //set
        var reg=/^(width|height|top|left|right|bottom|((margin|padding)(Left|Top|Bottom|Right)?))$/;
        if(attr=="float"){
            curEle["style"]["cssFloat"]=value;
            curEle["style"]["styleFloat"]=value;
        }else if(attr=="opacity"){
            if(value>=0&&value<=1){
                curEle["style"]["opacity"]=value;
                curEle["style"]["filter"]="alpha(opacity="+value*100+")";
            }
        }else if(reg.test(attr)){
            curEle["style"][attr]=isNaN(value)?value:value+"px";
        }else{
            curEle["style"][attr]=value;
        }
    };
    //��������Ԫ����ʽֵ
    _utils.setGroupCss=function setGroupCss(curEle,options){
        for(var key in options){
            if(options.hasOwnProperty(key)){
                this.css(curEle,key,options[key]);
            }
        }
    };
    //��ȡԪ�ؾ���body��ƫ����
    _utils.offset=function offset(curEle){
        var l=curEle.offsetLeft,t=curEle.offsetTop,p=curEle.offsetParent;
        while(p){
            if(navigator.userAgent.indexOf("MSIE 8.0")<0){
                l+= p.clientLeft;
                t+= p.clientTop;
            }
            l+= p.offsetLeft;
            t+= p.offsetTop;
            p= p.offsetParent;
        }
        return {top:t,left:l};
    };
    //��ȡ���������к�������Ŀ�ģ����Ϣ/
    _utils.win=function win(attr,value){
      if(typeof value==="undefined"){
          return document.documentElement[attr]||document.body[attr];
      }
        document.documentElement[attr]=value;
        document.body[attr]=value;
    };
    //�ж�ĳԪ���Ƿ���ָ������
    _utils.hasClass=function hasClass(curEle,strClass){
      var reg=new RegExp("(^| )"+strClass+"( |$)");
        return reg.test(curEle.className);
    };
    //��ĳԪ�����ָ������
    _utils.addClass=function addClass(curEle,strClass){
        if(!this.hasClass(curEle,strClas)){
            curEle.className+=" "+strClass;
        }
    };
    //��ĳԪ��ɾ��ָ������
    _utils.removeClass=function removeClass(curEle,strClass){
        if(this.hasClass(curEle,strClas)){
            var reg=new RegExp("(^| )"+strClass+"( |$)","g");
            curEle.className=curEle.className.replace(reg," ");
        }
    };
    //�ж�ĳԪ���Ƿ���ָ���������еĻ�ɾ����������û�еĻ���Ӹ�����
    _utils.toggleClass=function toggleClass(curEle,strClass){
        this.hasClass(curEle,strClass)?this.removeClass(curEle,strClass):this.addClass(curEle,strClass);
    };
    /*
     * Num.3 : DOM�����Ӻ�ɾ��
     */
    //���û��߻�ȡԪ�ص�����ֵ
    _utils.attr=function attr(curEle,attr,value){
        if(typeof value==="undefined"){
            return attr=="class"?curEle.className:curEle.getAttribute(attr);
        }
        attr=="class"?curEle.className=value:curEle.setAttribute(attr,value)
    };
    //���û��߻�ȡ�Ǳ�Ԫ��ֵ
    _utils.html=function html(curEle,value){
      if(typeof value==="undefined"){
          return curEle.innerHTML;
      }
        curEle.innerHTML=value;
    };
    //���û��߻�ȡ��Ԫ��ֵ
    _utils.val=function val(curEle,value){
        if(typeof value==="undefined"){
            return curEle.value;
        }
        curEle.value=value;
    };
    //��Ԫ���ڵ���ǰ������µ��ӽڵ�
    _utils.prepend=function prepend(container,newEle){
        var fir=this.first(container);
        fir?container.insertBefore(newEle,fir):container.appendChild(newEle);
    };
    //�ھ�Ԫ�غ�������µ��ӽڵ�
    _utils.insertAfter=function insertAfter(oldEle,newEle){
        var nex=this.next(oldEle),p=oldEle.parentNode;
        nex? p.insertBefore(newEle,nex): p.appendChild(newEle);
    };
    //��չ�ӿ�
    _utils.extend=function extend(options){
        for(var key in options){
            if(options.hasOwnProperty(key)){
                this[key]=options[key];
            }
        }
    };
    window.utils = _utils;
})();

~function(){
    var aryPro=Array.prototype,strPro=String.prototype,regPro=RegExp.prototype;
    //����ȥ��
    aryPro.unique=function unique(){
        var obj={};
        for(var i=0;i<this.length;i++){
            var cur=this[i];
            obj[cur]==cur?(this[i]=this[this.length-1],this.length-=1,i--):obj[cur]=cur;
        }
        obj=null;
        return this;
    };
    //��д����forEach���������ݸ������
    aryPro.myForEach=function myForEach(callBack,context){
        if("forEach" in Array.prototype){
            return this.forEach(callBack,context);
        }else{
            for(var i=0;i<this.length;i++){
                callBack.call(context,this[i],i,this);
            }
        }
    };
    //��д����map���������ݸ������
    aryPro.myMap=function myMap(callBack,context){
        if("map" in Array.prototype){
            return this.map(callBack,context);
        }else{
            for(var i=0;i<this.length;i++){
                this[i]=callBack.call(context,this[i],i,this);
            }
        }
        return this;
    };
    //��βȥ�ո�
    strPro.myTrim=function myTrim(){
        return this.replace(/(^\s+|\s+$)/g,"");
    };
    //��ȡָ�������ַ�����Ӣ��һ����ĸ��һλ������һ����������λ
    strPro.mySub=function mySub(){
        var len=arguments[0]||10,isD=arguments[1]||false,n=0,str="";
        for(var i=0;i<this.length;i++){
            var s=this.charAt[i];
            /[\u4e00-\u9fa5]/.test(s)?n+=2:n++;
            if(n>len){
                isD?str+="...":void 0;
                break;
            }
            str+=s;
        }
        return str;
    };
    //��ʽ��ʱ���ַ���
    strPro.myFormatTime=function myFormateTime(){
        var reg=/^(\d{4})(?:-|\/|\.)(\d{1,2})(?:-|\/|\.)(\d{1,2})(?:\s+)(\d{1,2})(?:-|\/|\.)(\d{1,2})(?:-|\/|\.)(\d{1,2})$/,ary=[];
       this.replace(reg,function(){
           ary=(Array.prototype.slice.call(arguments)).slice(1,7);
        });
        var str=arguments[0]||"{0}��{1}��{2}�� {3}ʱ:{4}��:{5}��";
        str=str.replace(/\{(\d+)\}/g,function(){
            var val=ary[arguments[1]];
            return val.length==1?"0"+val:val;
        });
        return str;
    };
    //��ȡURL�в���
    strPro.queryUrlParameter=function queryUrlParameter(){
        var reg=/([^?=&])=([^?=&])/g,obj={};
        this.replace(reg,function(){
            obj[arguments[1]]=arguments[2];
        });
        return obj;
    };
    //��дexec�������������з����������ַ���������������
    regPro.myExecAll=function myExecAll(str){
        reg=this.global?str:eval(this.toString()+"g");
        var ary=[],res=reg.exec(str);
        while(res){
            ary[ary.length]=res;
            res=reg.exec(str);
        }
        return ary.length==0?null:ary;
    }

}();