function MCWindows(){this.settings=new Array();
this.windows=new Array();
this.isMSIE=(navigator.appName=="Microsoft Internet Explorer");
this.isGecko=navigator.userAgent.indexOf("Gecko")!=-1;
this.isSafari=navigator.userAgent.indexOf("Safari")!=-1;
this.isMac=navigator.userAgent.indexOf("Mac")!=-1;
this.isMSIE5_0=this.isMSIE&&(navigator.userAgent.indexOf("MSIE 5.0")!=-1);
this.action="none";
this.selectedWindow=null;
this.zindex=100;
this.mouseDownScreenX=0;
this.mouseDownScreenY=0;
this.mouseDownLayerX=0;
this.mouseDownLayerY=0;
this.mouseDownWidth=0;
this.mouseDownHeight=0
}MCWindows.prototype.init=function(a){this.settings=a;
if(this.isMSIE){this.addEvent(document,"mousemove",mcWindows.eventDispatcher)
}else{this.addEvent(window,"mousemove",mcWindows.eventDispatcher)
}this.addEvent(document,"mouseup",mcWindows.eventDispatcher)
};
MCWindows.prototype.getParam=function(b,a){var c=null;
c=(typeof(this.settings[b])=="undefined")?a:this.settings[b];
if(c=="true"||c=="false"){return(c=="true")
}return c
};
MCWindows.prototype.eventDispatcher=function(b){b=typeof(b)=="undefined"?window.event:b;
if(mcWindows.selectedWindow==null){return
}if(mcWindows.isGecko&&b.type=="mousedown"){var d=b.currentTarget;
for(var c in mcWindows.windows){var a=mcWindows.windows[c];
if(typeof(a)=="function"){continue
}if(a.headElement==d||a.resizeElement==d){a.focus();
break
}}}switch(b.type){case"mousemove":mcWindows.selectedWindow.onMouseMove(b);
break;
case"mouseup":mcWindows.selectedWindow.onMouseUp(b);
break;
case"mousedown":mcWindows.selectedWindow.onMouseDown(b);
break;
case"focus":mcWindows.selectedWindow.onFocus(b);
break
}};
MCWindows.prototype.addEvent=function(c,a,b){if(this.isMSIE){c.attachEvent("on"+a,b)
}else{c.addEventListener(a,b,true)
}};
MCWindows.prototype.cancelEvent=function(a){if(this.isMSIE){a.returnValue=false;
a.cancelBubble=true
}else{a.preventDefault()
}};
MCWindows.prototype.parseFeatures=function(c){c=c.toLowerCase();
c=c.replace(/;/g,",");
c=c.replace(/[^0-9a-z=,]/g,"");
var e=c.split(",");
var a=new Array();
a.left=10;
a.top=10;
a.width=300;
a.height=300;
a.resizable=true;
a.minimizable=true;
a.maximizable=true;
a.close=true;
a.movable=true;
if(c==""){return a
}for(var b=0;
b<e.length;
b++){var d=e[b].split("=");
if(d.length==2){a[d[0]]=d[1]
}}return a
};
MCWindows.prototype.open=function(c,b,e){var f=new MCWindow();
var a,d="",g;
e=this.parseFeatures(e);
g="mcWindow_"+b;
width=parseInt(e.width);
height=parseInt(e.height)-12-19;
if(this.isMSIE){width-=2
}f.id=g;
f.url=c;
f.name=b;
f.features=e;
this.windows[b]=f;
iframeWidth=width;
iframeHeight=height;
d+='<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">';
d+="<html>";
d+="<head>";
d+="<title>Wrapper iframe</title>";
d+='<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
d+='<link href="../jscripts/tiny_mce/themes/advanced/css/editor_ui.css" rel="stylesheet" type="text/css" />';
d+="</head>";
d+="<body onload=\"parent.mcWindows.onLoad('"+b+"');\">";
d+='<div id="'+g+'_container" class="mceWindow">';
d+='<div id="'+g+'_head" class="mceWindowHead" onmousedown="parent.mcWindows.windows[\''+b+"'].focus();\">";
d+='  <div id="'+g+'_title" class="mceWindowTitle"';
d+='  onselectstart="return false;" unselectable="on" style="-moz-user-select: none !important;">No name window</div>';
d+='    <div class="mceWindowHeadTools">';
d+="      <a href=\"javascript:parent.mcWindows.windows['"+b+'\'].close();" onmousedown="return false;" class="mceWindowClose"><img border="0" src="../jscripts/tiny_mce/themes/advanced/images/window_close.gif" /></a>';
d+="    </div>";
d+='</div><div id="'+g+'_body" class="mceWindowBody" style="width: '+width+"px; height: "+height+'px;">';
d+='<iframe id="'+g+'_iframe" name="'+g+'_iframe" onfocus="parent.mcWindows.windows[\''+b+'\'].focus();" frameborder="0" width="'+iframeWidth+'" height="'+iframeHeight+'" src="'+c+'" class="mceWindowBodyIframe"></iframe></div>';
d+='<div id="'+g+'_statusbar" class="mceWindowStatusbar" onmousedown="parent.mcWindows.windows[\''+b+"'].focus();\">";
d+='<div id="'+g+'_resize" class="mceWindowResize"><img onmousedown="parent.mcWindows.windows[\''+b+'\'].focus();" border="0" src="../jscripts/tiny_mce/themes/advanced/images/window_resize.gif" /></div>';
d+="</div>";
d+="</div>";
d+="</body>";
d+="</html>";
this.createFloatingIFrame(g,e.left,e.top,e.width,e.height,d)
};
MCWindows.prototype.onLoad=function(b){var g=mcWindows.windows[b];
var c="mcWindow_"+b;
var a=window.frames[c+"_iframe"].frames[0];
var e=window.frames[c+"_iframe"].document;
var j=window.frames[c+"_iframe"].document;
var h=document.getElementById("mcWindow_"+b+"_div");
var d=window.frames[c+"_iframe"].frames[0];
g.id="mcWindow_"+b+"_iframe";
g.winElement=h;
g.bodyElement=j.getElementById(c+"_body");
g.iframeElement=j.getElementById(c+"_iframe");
g.headElement=j.getElementById(c+"_head");
g.titleElement=j.getElementById(c+"_title");
g.resizeElement=j.getElementById(c+"_resize");
g.containerElement=j.getElementById(c+"_container");
g.left=g.features.left;
g.top=g.features.top;
g.frame=window.frames[c+"_iframe"].frames[0];
g.wrapperFrame=window.frames[c+"_iframe"];
g.wrapperIFrameElement=document.getElementById(c+"_iframe");
mcWindows.addEvent(g.headElement,"mousedown",mcWindows.eventDispatcher);
mcWindows.addEvent(g.resizeElement,"mousedown",mcWindows.eventDispatcher);
if(mcWindows.isMSIE){mcWindows.addEvent(d.document,"mousemove",mcWindows.eventDispatcher);
mcWindows.addEvent(d.document,"mouseup",mcWindows.eventDispatcher)
}else{mcWindows.addEvent(d,"mousemove",mcWindows.eventDispatcher);
mcWindows.addEvent(d,"mouseup",mcWindows.eventDispatcher);
mcWindows.addEvent(d,"focus",mcWindows.eventDispatcher)
}for(var f=0;
f<window.frames.length;
f++){if(!window.frames[f]._hasMouseHandlers){if(mcWindows.isMSIE){mcWindows.addEvent(window.frames[f].document,"mousemove",mcWindows.eventDispatcher);
mcWindows.addEvent(window.frames[f].document,"mouseup",mcWindows.eventDispatcher)
}else{mcWindows.addEvent(window.frames[f],"mousemove",mcWindows.eventDispatcher);
mcWindows.addEvent(window.frames[f],"mouseup",mcWindows.eventDispatcher)
}window.frames[f]._hasMouseHandlers=true
}}if(mcWindows.isMSIE){mcWindows.addEvent(g.frame.document,"mousemove",mcWindows.eventDispatcher);
mcWindows.addEvent(g.frame.document,"mouseup",mcWindows.eventDispatcher)
}else{mcWindows.addEvent(g.frame,"mousemove",mcWindows.eventDispatcher);
mcWindows.addEvent(g.frame,"mouseup",mcWindows.eventDispatcher);
mcWindows.addEvent(g.frame,"focus",mcWindows.eventDispatcher)
}this.selectedWindow=g
};
MCWindows.prototype.createFloatingIFrame=function(b,g,f,e,a,c){var d=document.createElement("iframe");
var h=document.createElement("div");
e=parseInt(e);
a=parseInt(a)+1;
h.setAttribute("id",b+"_div");
h.setAttribute("width",e);
h.setAttribute("height",(a));
h.style.position="absolute";
h.style.left=g+"px";
h.style.top=f+"px";
h.style.width=e+"px";
h.style.height=(a)+"px";
h.style.backgroundColor="white";
h.style.display="none";
if(this.isGecko){iframeWidth=e+2;
iframeHeight=a+2
}else{iframeWidth=e;
iframeHeight=a+1
}d.setAttribute("id",b+"_iframe");
d.setAttribute("name",b+"_iframe");
d.setAttribute("border","0");
d.setAttribute("frameBorder","0");
d.setAttribute("marginWidth","0");
d.setAttribute("marginHeight","0");
d.setAttribute("leftMargin","0");
d.setAttribute("topMargin","0");
d.setAttribute("width",iframeWidth);
d.setAttribute("height",iframeHeight);
d.setAttribute("scrolling","no");
d.style.width=iframeWidth+"px";
d.style.height=iframeHeight+"px";
d.style.backgroundColor="white";
h.appendChild(d);
document.body.appendChild(h);
h.innerHTML=h.innerHTML;
if(this.isSafari){window.setTimeout(function(){doc=window.frames[b+"_iframe"].document;
doc.open();
doc.write(c);
doc.close()
},10)
}else{doc=window.frames[b+"_iframe"].window.document;
doc.open();
doc.write(c);
doc.close()
}h.style.display="block";
return h
};
function MCWindow(){}MCWindow.prototype.focus=function(){this.winElement.style.zIndex=mcWindows.zindex++;
mcWindows.selectedWindow=this
};
MCWindow.prototype.minimize=function(){};
MCWindow.prototype.maximize=function(){};
MCWindow.prototype.startResize=function(){mcWindows.action="resize"
};
MCWindow.prototype.startMove=function(a){mcWindows.action="move"
};
MCWindow.prototype.close=function(){document.body.removeChild(this.winElement);
mcWindows.windows[this.name]=null
};
MCWindow.prototype.onMouseMove=function(d){var f=0;
var c=0;
var b=d.screenX-mcWindows.mouseDownScreenX;
var a=d.screenY-mcWindows.mouseDownScreenY;
switch(mcWindows.action){case"resize":width=mcWindows.mouseDownWidth+(d.screenX-mcWindows.mouseDownScreenX);
height=mcWindows.mouseDownHeight+(d.screenY-mcWindows.mouseDownScreenY);
width=width<100?100:width;
height=height<100?100:height;
this.wrapperIFrameElement.style.width=width+2;
this.wrapperIFrameElement.style.height=height+2;
this.wrapperIFrameElement.width=width+2;
this.wrapperIFrameElement.height=height+2;
this.winElement.style.width=width;
this.winElement.style.height=height;
height=height-12-19;
this.containerElement.style.width=width;
this.iframeElement.style.width=width;
this.iframeElement.style.height=height;
this.bodyElement.style.width=width;
this.bodyElement.style.height=height;
this.headElement.style.width=width;
mcWindows.cancelEvent(d);
break;
case"move":this.left=mcWindows.mouseDownLayerX+(d.screenX-mcWindows.mouseDownScreenX);
this.top=mcWindows.mouseDownLayerY+(d.screenY-mcWindows.mouseDownScreenY);
this.winElement.style.left=this.left+"px";
this.winElement.style.top=this.top+"px";
mcWindows.cancelEvent(d);
break
}};
MCWindow.prototype.onMouseUp=function(a){mcWindows.action="none"
};
MCWindow.prototype.onFocus=function(b){var c=b.currentTarget;
for(var d in mcWindows.windows){var a=mcWindows.windows[d];
if(typeof(a)=="function"){continue
}if(c.name==a.id){a.focus();
return
}}};
MCWindow.prototype.onMouseDown=function(b){var d=mcWindows.isMSIE?this.wrapperFrame.event.srcElement:b.target;
var c=0;
var a=0;
mcWindows.mouseDownScreenX=b.screenX;
mcWindows.mouseDownScreenY=b.screenY;
mcWindows.mouseDownLayerX=this.left;
mcWindows.mouseDownLayerY=this.top;
mcWindows.mouseDownWidth=parseInt(this.winElement.style.width);
mcWindows.mouseDownHeight=parseInt(this.winElement.style.height);
if(d==this.resizeElement.firstChild){this.startResize(b)
}else{this.startMove(b)
}mcWindows.cancelEvent(b)
};
var mcWindows=new MCWindows();