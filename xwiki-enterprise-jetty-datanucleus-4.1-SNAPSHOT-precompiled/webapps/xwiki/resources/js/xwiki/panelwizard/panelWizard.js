function computeBounds(){leftPanelsLeft=getX(leftPanels);
leftPanelsRight=leftPanelsLeft+leftPanels.offsetWidth;
rightPanelsLeft=getX(rightPanels);
rightPanelsRight=rightPanelsLeft+rightPanels.offsetWidth;
allpanelsLeft=getX(allPanels);
allpanelsTop=getY(allPanels)
}function debugwrite(a){document.getElementById("headerglobal").appendChild(document.createTextNode(a))
}function isPanel(a){if(a.className&&((a.className=="panel")||(a.className.indexOf("panel ")>=0)||(a.className.indexOf(" panel")>=0))){return true
}return false
}function getX(a){if(a.offsetParent){if(window.ActiveXObject){return a.offsetLeft+getX(a.offsetParent)+a.clientLeft
}else{return a.offsetLeft+getX(a.offsetParent)+(a.scrollWidth-a.clientWidth)
}}else{if(a.x){return a.x
}else{return 0
}}}function getY(a){if(a.offsetParent){if(window.ActiveXObject){return a.offsetTop+getY(a.offsetParent)+a.clientTop
}else{return a.offsetTop+getY(a.offsetParent)+(a.scrollHeight-a.clientHeight)
}}else{if(a.y){return a.y
}else{return 0
}}}function getBlocList(d){var e=[];
var a=d.childNodes.length;
for(var c=0;
c<a;
++c){var b=d.childNodes[c];
if(isPanel(b)){if(!b.isDragging){e.push(b)
}}}return e
}function getDragBoxPos(c,d){var a=c.length;
if(a==0){return 0
}for(var b=0;
b<a;
++b){if(c[b]==dragel){return b
}}return -1
}function getAllPanels(d){var e=[];
var c=d.getElementsByTagName("div");
var a=0;
for(var b=0;
b<c.length;
++b){if(isPanel(c[b])){e[a]=c[b];
a++
}}return e
}function getClosestDropTarget(a,d,b,c){if(window.showLeftColumn==1&&(a<=leftPanelsRight&&(a+b)>=leftPanelsLeft)){return leftPanels
}if(window.showRightColumn==1&&((a+b)>=rightPanelsLeft&&a<=rightPanelsRight)){return rightPanels
}return allPanels
}function onDragStart(b,a,f){if(b.isDragging){return
}hideTip();
window.isDraggingPanel=true;
if(enabletip==true){hideTip()
}realParent=b.parentNode;
parentNode=b.parentNode;
var d=(realParent!=leftPanels&&realParent!=rightPanels);
var c=Position.cumulativeOffset(b);
var e=Position.realOffset(b);
var a=c[0];
var f=c[1]-e[1]+(document.documentElement.scrollTop-0+document.body.scrollTop-0);
if(window.ActiveXObject){dragel.style.height=(b.offsetHeight?(b.offsetHeight):b.displayHeight)+"px"
}else{dragel.style.height=(b.offsetHeight?(b.offsetHeight-2):b.displayHeight)+"px"
}dragel.style.display="block";
b.style.left=a+"px";
b.style.top=f+"px";
b.style.zIndex="10";
if(d){parentNode=allPanels;
b.placeholder=document.createElement("div");
b.placeholder.className="placeholder";
if(window.ActiveXObject){b.placeholder.style.height=(b.offsetHeight?(b.offsetHeight):b.displayHeight)+"px"
}else{b.placeholder.style.height=(b.offsetHeight?(b.offsetHeight-2):b.displayHeight)+"px"
}realParent.replaceChild(b.placeholder,b);
b.placeholder.style.display="block";
addClass(allPanels,"dropTarget")
}else{realParent.replaceChild(dragel,b)
}b.style.position="absolute";
document.body.appendChild(b);
b.isDragging=true;
prevcolumn=parentNode
}function onDrag(b,a,e){if(enabletip==true){hideTip()
}parentNode=getClosestDropTarget(a,e,b.offsetWidth,b.offsetHeight);
if(parentNode!=prevcolumn){if(prevcolumn!=allPanels){prevcolumn.removeChild(dragel)
}if(parentNode!=allPanels){parentNode.appendChild(dragel);
rmClass(allPanels,"dropTarget")
}else{addClass(allPanels,"dropTarget")
}}prevcolumn=parentNode;
var c=getBlocList(parentNode);
var d=getDragBoxPos(c,e);
if(d==-1){return
}if(c.length==0){if(parentNode!=allPanels){parentNode.appendChild(dragel)
}}else{if(d!=0&&e<=getY(c[d-1])){parentNode.insertBefore(dragel,c[d-1])
}else{if(d!=(c.length-1)&&e>=getY(c[d+1])){if(c[d+2]){parentNode.insertBefore(dragel,c[d+2])
}else{if(parentNode!=allPanels){parentNode.appendChild(dragel)
}else{dragel.parentNode.removeChild(dragel)
}}}}}}function onDragEnd(b,a,c){b.isDragging=false;
window.isDraggingPanel=false;
b.style.position="static";
if(parentNode==allPanels){b.placeholder.parentNode.replaceChild(b,b.placeholder);
b.placeholder=undefined;
rmClass(allPanels,"dropTarget")
}else{parentNode.replaceChild(b,dragel)
}dragel.style.display="none"
}function executeCommand(c,e){function a(){if(d.readyState==4){if(d.status==200){if(b){b(d.responseText)
}else{alert("no callback defined")
}}else{alert("There was a problem retrieving the xml data:\n"+d.status+":\t"+d.statusText+"\n"+d.responseText)
}}}var d=null;
var b=e;
if(window.XMLHttpRequest){d=new XMLHttpRequest();
d.onreadystatechange=a;
d.open("GET",c,true);
d.send(null)
}else{if(window.ActiveXObject){d=new ActiveXObject("Microsoft.XMLHTTP");
if(d){d.onreadystatechange=a;
d.open("GET",c,true);
d.send()
}else{alert("your browser does not support xmlhttprequest")
}}else{alert("your browser does not support xmlhttprequest")
}}}function start1(){var b;
var a;
var g;
var d=document.getElementsByTagName("div");
for(b=0;
b<d.length;
++b){c=d[b];
var f=c.id;
if(isPanel(c)){attachDragHandler(c)
}}window.panelsInList=getAllPanels(allPanels);
window.panelsOnLeft=getBlocList(leftPanels);
window.panelsOnRight=getBlocList(rightPanels);
var c;
for(b=0;
b<panelsInList.length;
++b){g=window.allPanelsPlace[b]["left"];
if(g!=-1){c=panelsOnLeft[g];
if(c){c.fullname=window.allPanelsPlace[b].fullname;
c.placeholder=document.createElement("div");
c.placeholder.className="placeholder";
if(window.ActiveXObject){c.displayHeight=(c.offsetHeight?(c.offsetHeight):0)
}else{c.displayHeight=(c.offsetHeight?(c.offsetHeight-2):0)
}c.placeholder.style.height=(c.displayHeight)+"px";
c.placeholder.style.display="block";
panelsInList[b].parentNode.replaceChild(c.placeholder,panelsInList[b])
}}g=window.allPanelsPlace[b]["right"];
if(g!=-1){c=panelsOnRight[g];
if(c){c.fullname=window.allPanelsPlace[b].fullname;
c.placeholder=document.createElement("div");
c.placeholder.className="placeholder";
if(window.ActiveXObject){c.displayHeight=(c.offsetHeight?(c.offsetHeight):0)
}else{c.displayHeight=(c.offsetHeight?(c.offsetHeight-2):0)
}c.placeholder.style.height=(c.displayHeight)+"px";
c.placeholder.style.display="block";
if(panelsInList[b].parentNode){panelsInList[b].parentNode.replaceChild(c.placeholder,panelsInList[b])
}}}panelsInList[b].fullname=window.allPanelsPlace[b].fullname
}leftPanels.savedPanelList=getBlocList(leftPanels);
rightPanels.savedPanelList=getBlocList(rightPanels);
leftPanels.isVisible=window.showLeftColumn;
rightPanels.isVisible=window.showRightColumn;
if(!leftPanels.isVisible){leftPanels.panels=getBlocList(leftPanels)
}if(!rightPanels.isVisible){rightPanels.panels=getBlocList(rightPanels)
}var e=document.getElementById("PageLayoutSection").getElementsByTagName("td");
layoutMaquettes=new Object();
for(b=0;
b<e.length;
b++){for(a=0;
a<e[b].childNodes.length;
++a){if(e[b].childNodes[a].tagName=="DIV"){layoutMaquettes[b]=e[b].childNodes[a];
break
}}}window.activeWizardPage=document.getElementById("PanelListSection");
window.activeWizardTab=document.getElementById("firstwtab");
document.getElementById("PageLayoutSection").style.display="none"
}function attachDragHandler(a){a.ondblclick=function(b){};
Drag.init(a,a);
a.onDragStart=function(b,c){onDragStart(this,b,c)
};
a.onDrag=function(b,c){onDrag(this,b,c)
};
a.onDragEnd=function(b,c){onDragEnd(this,b,c)
}
}function getBlocNameList(d){var e="";
var a=d.childNodes.length;
for(var c=0;
c<a;
++c){var b=d.childNodes[c];
if(isPanel(b)){if(!b.isDragging){if(e!=""){e+=","
}e+=b.fullname
}}}return e
}function save(){url=window.ajaxurl;
var a=getBlocNameList(leftPanels);
url+="&leftPanels="+a;
url+="&showLeftPanels="+window.showLeftColumn;
var b=getBlocNameList(rightPanels);
url+="&rightPanels="+b;
url+="&showRightPanels="+window.showRightColumn;
executeCommand(url,saveResult)
}function saveResult(a){if(a=="SUCCESS"){alert(window.panelsavesuccess);
leftPanels.savedPanelList=getBlocList(leftPanels);
rightPanels.savedPanelList=getBlocList(rightPanels);
leftPanels.isVisible=window.showLeftColumn;
rightPanels.isVisible=window.showRightColumn
}else{alert(window.panelsaveerror);
alert(a)
}}function releasePanels(b){b.panels=getBlocList(b);
for(var a=0;
a<b.panels.length;
++a){releasePanel(b.panels[a])
}}function releasePanel(a){a.parentNode.removeChild(a);
a.placeholder.parentNode.replaceChild(a,a.placeholder);
a.placeholder=undefined
}function restorePanels(b){for(var a=0;
a<b.panels.length;
++a){if(!b.panels[a].placeholder){restorePanel(b.panels[a],b)
}}b.panels=undefined
}function revertPanels(b){for(var a=0;
a<b.savedPanelList.length;
++a){restorePanel(b.savedPanelList[a],b)
}}function restorePanel(b,a){b.placeholder=document.createElement("div");
b.placeholder.className="placeholder";
if(window.ActiveXObject){b.placeholder.style.height=(b.offsetHeight?(b.offsetHeight):0)
}else{b.placeholder.style.height=(b.offsetHeight?(b.offsetHeight-2):0)
}b.placeholder.style.display="block";
b.parentNode.replaceChild(b.placeholder,b);
a.appendChild(b)
}function changePreviewLayout(a,b){document.getElementById("selectedoption").id="";
a.id="selectedoption";
switch(b){case 0:if(window.showLeftColumn==1){window.showLeftColumn=0;
leftPanels.style.display="none";
releasePanels(leftPanels)
}if(window.showRightColumn==1){window.showRightColumn=0;
rightPanels.style.display="none";
releasePanels(rightPanels)
}mainContainer.className="hidelefthideright";
break;
case 1:if(window.showLeftColumn==0){window.showLeftColumn=1;
leftPanels.style.display="block";
restorePanels(leftPanels)
}if(window.showRightColumn==1){window.showRightColumn=0;
rightPanels.style.display="none";
releasePanels(rightPanels)
}mainContainer.className="hideright";
break;
case 2:if(window.showLeftColumn==1){window.showLeftColumn=0;
leftPanels.style.display="none";
releasePanels(leftPanels)
}if(window.showRightColumn==0){window.showRightColumn=1;
rightPanels.style.display="block";
restorePanels(rightPanels)
}mainContainer.className="hideleft";
break;
case 3:if(window.showLeftColumn==0){window.showLeftColumn=1;
leftPanels.style.display="block";
restorePanels(leftPanels)
}if(window.showRightColumn==0){window.showRightColumn=1;
rightPanels.style.display="block";
restorePanels(rightPanels)
}mainContainer.className="content";
break;
default:break
}computeBounds()
}function revert(){releasePanels(leftPanels);
releasePanels(rightPanels);
revertPanels(leftPanels);
revertPanels(rightPanels);
var a=0;
if(leftPanels.isVisible){a+=1
}if(rightPanels.isVisible){a+=2
}changePreviewLayout(layoutMaquettes[a],a)
}function switchToWizardPage(b,a){window.activeWizardPage.style.display="none";
window.activeWizardTab.className="";
window.activeWizardTab=b;
window.activeWizardTab.className="active";
window.activeWizardPage=document.getElementById(a);
window.activeWizardPage.style.display="block";
b.blur()
}function panelEditorInit(){tipobj=$("dhtmltooltip");
parentNode=null;
realParent=null;
dragel=new Element("div",{id:"dragbox","class":"panel"});
dragWidth=0;
nb=0;
layoutMaquetes=null;
window.leftPanels=$("leftPanels");
window.rightPanels=$("rightPanels");
allPanels=$("allviewpanels");
mainContent=$("contentcolumn");
mainContainer=$("body");
leftPanelsLeft=getX(leftPanels);
leftPanelsRight=leftPanelsLeft+leftPanels.offsetWidth;
rightPanelsLeft=getX(rightPanels);
rightPanelsRight=rightPanelsLeft+rightPanels.offsetWidth;
allpanelsLeft=getX(allPanels);
allpanelsTop=getY(allPanels);
prevcolumn=allPanels;
start1()
}(XWiki&&XWiki.isInitialized&&panelEditorInit())||document.observe("xwiki:dom:loading",panelEditorInit);