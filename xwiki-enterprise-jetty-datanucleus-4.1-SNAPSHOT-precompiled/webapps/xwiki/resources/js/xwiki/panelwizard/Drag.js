var Drag={obj:null,init:function(b,c){b.onmousedown=Drag.start;
b.root=c;
if(isNaN(parseInt(b.root.style.left))){b.root.style.left="0px"
}if(isNaN(parseInt(b.root.style.top))){b.root.style.top="0px"
}b.root.onDragStart=new Function();
b.root.onDragEnd=new Function();
b.root.onDrag=new Function()
},start:function(a){var b=Drag.obj=this;
a=Drag.fixE(a);
var f=parseInt(b.root.style.top);
var e=parseInt(b.root.style.left);
b.lastMouseX=a.clientX;
b.lastMouseY=a.clientY;
b.root.onDragStart(e,f,a.clientX,a.clientY);
document.onmousemove=Drag.drag;
document.onmouseup=Drag.end;
return false
},drag:function(b){b=Drag.fixE(b);
var k=Drag.obj;
var l=b.clientY;
var a=b.clientX;
var j=parseInt(k.root.style.top);
var i=parseInt(k.root.style.left);
var c,d;
c=i+a-k.lastMouseX;
d=j+l-k.lastMouseY;
k.root.style.left=c+"px";
k.root.style.top=d+"px";
k.lastMouseX=a;
k.lastMouseY=l;
k.root.onDrag(c,d,l,a);
return false
},end:function(){document.onmousemove=null;
document.onmouseup=null;
Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style.left),parseInt(Drag.obj.root.style.top));
Drag.obj=null
},fixE:function(a){if(typeof a=="undefined"){a=window.event
}if(typeof a.layerX=="undefined"){a.layerX=a.offsetX
}if(typeof a.layerY=="undefined"){a.layerY=a.offsetY
}return a
}};