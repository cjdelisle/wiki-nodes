var offsetxpoint=-60;
var offsetypoint=20;
var ie=document.all;
var ns6=document.getElementById&&!document.all;
var enabletip=false;
var tipobj=$("dhtmltooltip");
var tippedNode=undefined;
function ietruebody(){return(document.compatMode&&document.compatMode!="BackCompat")?document.documentElement:document.body
}function showtip(c,a,b,d){Event.observe(document,"mousemove",positionTip);
Event.observe(c,"mouseout",hideTip);
if(d){tipobj.style.textAlign=d
}tippedNode=c;
tipobj.style.visibility="hidden";
tipobj.style.display="block";
tipobj.style.width="auto";
tipobj.innerHTML=a;
if(tipobj.offsetWidth>b){tipobj.style.width=b+"px"
}tipobj.style.display="none";
tipobj.style.visibility="visible";
enabletip=true;
return false
}function positionTip(f){if(enabletip){var b=Event.pointerX(f);
var a=Event.pointerY(f);
var d=ie&&!window.opera?ietruebody().clientWidth-event.clientX-offsetxpoint:window.innerWidth-f.clientX-offsetxpoint-20;
var c=ie&&!window.opera?ietruebody().clientHeight-event.clientY-offsetypoint:window.innerHeight-f.clientY-offsetypoint-20;
var g=(offsetxpoint<0)?offsetxpoint*(-1):-1000;
if(d<tipobj.offsetWidth){tipobj.style.left=ie?ietruebody().scrollLeft+event.clientX-tipobj.offsetWidth+"px":window.pageXOffset+f.clientX-tipobj.offsetWidth+"px"
}else{if(b<g){tipobj.style.left="5px"
}else{tipobj.style.left=b+offsetxpoint+"px"
}}if(c<tipobj.offsetHeight){tipobj.style.top=ie?ietruebody().scrollTop+event.clientY-tipobj.offsetHeight-offsetypoint+"px":window.pageYOffset+f.clientY-tipobj.offsetHeight-offsetypoint+"px"
}else{tipobj.style.top=a+offsetypoint+"px"
}tipobj.style.display="block"
}}function hideTip(a){if(!window.enabletip){return
}Event.stopObserving(document,"mousemove",positionTip);
enabletip=false;
tipobj.style.display="none"
}Event.observe(window,"load",function(){$("body").appendChild(tipobj)
});