if(typeof ytreeview=="undefined"){ytreeview=1;
YAHOO.widget.TreeView=function(a){if(a){this.init(a)
}};
YAHOO.widget.TreeView.nodeCount=0;
YAHOO.widget.TreeView.prototype={id:null,_el:null,_nodes:null,locked:false,_expandAnim:null,_collapseAnim:null,_animCount:0,maxAnim:2,setExpandAnim:function(a){if(YAHOO.widget.TVAnim.isValid(a)){this._expandAnim=a
}},setCollapseAnim:function(a){if(YAHOO.widget.TVAnim.isValid(a)){this._collapseAnim=a
}},animateExpand:function(d){if(this._expandAnim&&this._animCount<this.maxAnim){var b=this;
var c=YAHOO.widget.TVAnim.getAnim(this._expandAnim,d,function(){b.expandComplete()
});
if(c){++this._animCount;
c.animate()
}return true
}return false
},animateCollapse:function(d){if(this._collapseAnim&&this._animCount<this.maxAnim){var b=this;
var c=YAHOO.widget.TVAnim.getAnim(this._collapseAnim,d,function(){b.collapseComplete()
});
if(c){++this._animCount;
c.animate()
}return true
}return false
},expandComplete:function(){--this._animCount
},collapseComplete:function(){--this._animCount
},init:function(a){this.id=a;
if("string"!==typeof a){this._el=a;
this.id=this.generateId(a)
}this._nodes=[];
YAHOO.widget.TreeView.trees[this.id]=this;
this.root=new YAHOO.widget.RootNode(this)
},draw:function(){var a=this.root.getHtml();
this.getEl().innerHTML=a;
this.firstDraw=false
},getEl:function(){if(!this._el){this._el=document.getElementById(this.id)
}return this._el
},regNode:function(a){this._nodes[a.index]=a
},getRoot:function(){return this.root
},setDynamicLoad:function(a,b){this.root.setDynamicLoad(a,b)
},expandAll:function(){if(!this.locked){this.root.expandAll()
}},collapseAll:function(){if(!this.locked){this.root.collapseAll()
}},getNodeByIndex:function(b){var a=this._nodes[b];
return(a)?a:null
},getNodeByProperty:function(c,b){for(var a in this._nodes){var d=this._nodes[a];
if(d.data&&b==d.data[c]){return d
}}return null
},getNodesByProperty:function(d,c){var a=[];
for(var b in this._nodes){var e=this._nodes[b];
if(e.data&&c==e.data[d]){a.push(e)
}}return(a.length)?a:null
},removeNode:function(b,a){if(b.isRoot()){return false
}var c=b.parent;
if(c.parent){c=c.parent
}this._deleteNode(b);
if(a&&c&&c.childrenRendered){c.refresh()
}return true
},removeChildren:function(a){while(a.children.length){this._deleteNode(a.children[0])
}a.childrenRendered=false;
a.dynamicLoadComplete=false;
a.expand();
a.collapse()
},_deleteNode:function(a){this.removeChildren(a);
this.popNode(a)
},popNode:function(e){var f=e.parent;
var c=[];
for(var d=0,b=f.children.length;
d<b;
++d){if(f.children[d]!=e){c[c.length]=f.children[d]
}}f.children=c;
f.childrenRendered=false;
if(e.previousSibling){e.previousSibling.nextSibling=e.nextSibling
}if(e.nextSibling){e.nextSibling.previousSibling=e.previousSibling
}e.parent=null;
e.previousSibling=null;
e.nextSibling=null;
e.tree=null;
delete this._nodes[e.index]
},toString:function(){return"TreeView "+this.id
},generateId:function(a){var b=a.id;
if(!b){b="yui-tv-auto-id-"+YAHOO.widget.TreeView.counter;
YAHOO.widget.TreeView.counter++
}return b
},onExpand:function(a){},onCollapse:function(a){}};
YAHOO.widget.TreeView.trees=[];
YAHOO.widget.TreeView.counter=0;
YAHOO.widget.TreeView.getTree=function(b){var a=YAHOO.widget.TreeView.trees[b];
return(a)?a:null
};
YAHOO.widget.TreeView.getNode=function(b,c){var a=YAHOO.widget.TreeView.getTree(b);
return(a)?a.getNodeByIndex(c):null
};
YAHOO.widget.TreeView.addHandler=function(c,d,b,a){a=(a)?true:false;
if(c.addEventListener){c.addEventListener(d,b,a)
}else{if(c.attachEvent){c.attachEvent("on"+d,b)
}else{c["on"+d]=b
}}};
YAHOO.widget.TreeView.preload=function(e){e=e||"ygtv";
var c=["tn","tm","tmh","tp","tph","ln","lm","lmh","lp","lph","loading"];
var g=[];
for(var a=0;
a<c.length;
++a){g[g.length]='<span class="'+e+c[a]+'">&#160;</span>'
}var d=document.createElement("DIV");
var b=d.style;
b.position="absolute";
b.top="-1000px";
b.left="-1000px";
d.innerHTML=g.join("");
document.body.appendChild(d)
};
YAHOO.widget.TreeView.addHandler(window,"load",YAHOO.widget.TreeView.preload);
YAHOO.widget.Node=function(c,b,a){if(c){this.init(c,b,a)
}};
YAHOO.widget.Node.prototype={index:0,children:null,tree:null,data:null,parent:null,depth:-1,href:null,target:"_self",expanded:false,multiExpand:true,renderHidden:false,childrenRendered:false,dynamicLoadComplete:false,previousSibling:null,nextSibling:null,_dynLoad:false,dataLoader:null,isLoading:false,hasIcon:true,iconMode:0,_type:"Node",init:function(c,b,a){this.data=c;
this.children=[];
this.index=YAHOO.widget.TreeView.nodeCount;
++YAHOO.widget.TreeView.nodeCount;
this.expanded=a;
if(b){b.appendChild(this)
}},applyParent:function(b){if(!b){return false
}this.tree=b.tree;
this.parent=b;
this.depth=b.depth+1;
if(!this.href){this.href="javascript:"+this.getToggleLink()
}if(!this.multiExpand){this.multiExpand=b.multiExpand
}this.tree.regNode(this);
b.childrenRendered=false;
for(var c=0,a=this.children.length;
c<a;
++c){this.children[c].applyParent(this)
}return true
},appendChild:function(b){if(this.hasChildren()){var a=this.children[this.children.length-1];
a.nextSibling=b;
b.previousSibling=a
}this.children[this.children.length]=b;
b.applyParent(this);
return b
},appendTo:function(a){return a.appendChild(this)
},insertBefore:function(a){var c=a.parent;
if(c){if(this.tree){this.tree.popNode(this)
}var b=a.isChildOf(c);
c.children.splice(b,0,this);
if(a.previousSibling){a.previousSibling.nextSibling=this
}this.previousSibling=a.previousSibling;
this.nextSibling=a;
a.previousSibling=this;
this.applyParent(c)
}return this
},insertAfter:function(a){var c=a.parent;
if(c){if(this.tree){this.tree.popNode(this)
}var b=a.isChildOf(c);
if(!a.nextSibling){return this.appendTo(c)
}c.children.splice(b+1,0,this);
a.nextSibling.previousSibling=this;
this.previousSibling=a;
this.nextSibling=a.nextSibling;
a.nextSibling=this;
this.applyParent(c)
}return this
},isChildOf:function(b){if(b&&b.children){for(var c=0,a=b.children.length;
c<a;
++c){if(b.children[c]===this){return c
}}}return -1
},getSiblings:function(){return this.parent.children
},showChildren:function(){if(!this.tree.animateExpand(this.getChildrenEl())){if(this.hasChildren()){this.getChildrenEl().style.display=""
}}},hideChildren:function(){if(!this.tree.animateCollapse(this.getChildrenEl())){this.getChildrenEl().style.display="none"
}},getElId:function(){return"ygtv"+this.index
},getChildrenElId:function(){return"ygtvc"+this.index
},getToggleElId:function(){return"ygtvt"+this.index
},getEl:function(){return document.getElementById(this.getElId())
},getChildrenEl:function(){return document.getElementById(this.getChildrenElId())
},getToggleEl:function(){return document.getElementById(this.getToggleElId())
},getToggleLink:function(){return"YAHOO.widget.TreeView.getNode('"+this.tree.id+"',"+this.index+").toggle()"
},collapse:function(){if(!this.expanded){return
}var a=this.tree.onCollapse(this);
if("undefined"!=typeof a&&!a){return
}if(!this.getEl()){this.expanded=false;
return
}this.hideChildren();
this.expanded=false;
if(this.hasIcon){this.getToggleEl().className=this.getStyle()
}},expand:function(){if(this.expanded){return
}var a=this.tree.onExpand(this);
if("undefined"!=typeof a&&!a){return
}if(!this.getEl()){this.expanded=true;
return
}if(!this.childrenRendered){this.getChildrenEl().innerHTML=this.renderChildren()
}else{}this.expanded=true;
if(this.hasIcon){this.getToggleEl().className=this.getStyle()
}if(this.isLoading){this.expanded=false;
return
}if(!this.multiExpand){var c=this.getSiblings();
for(var b=0;
b<c.length;
++b){if(c[b]!=this&&c[b].expanded){c[b].collapse()
}}}this.showChildren()
},getStyle:function(){if(this.isLoading){return"ygtvloading"
}else{var b=(this.nextSibling)?"t":"l";
var a="n";
if(this.hasChildren(true)||(this.isDynamic()&&!this.getIconMode())){a=(this.expanded)?"m":"p"
}return"ygtv"+b+a
}},getHoverStyle:function(){var a=this.getStyle();
if(this.hasChildren(true)&&!this.isLoading){a+="h"
}return a
},expandAll:function(){for(var a=0;
a<this.children.length;
++a){var b=this.children[a];
if(b.isDynamic()){alert("Not supported (lazy load + expand all)");
break
}else{if(!b.multiExpand){alert("Not supported (no multi-expand + expand all)");
break
}else{b.expand();
b.expandAll()
}}}},collapseAll:function(){for(var a=0;
a<this.children.length;
++a){this.children[a].collapse();
this.children[a].collapseAll()
}},setDynamicLoad:function(a,b){if(a){this.dataLoader=a;
this._dynLoad=true
}else{this.dataLoader=null;
this._dynLoad=false
}if(b){this.iconMode=b
}},isRoot:function(){return(this==this.tree.root)
},isDynamic:function(){var a=(!this.isRoot()&&(this._dynLoad||this.tree.root._dynLoad));
return a
},getIconMode:function(){return(this.iconMode||this.tree.root.iconMode)
},hasChildren:function(a){return(this.children.length>0||(a&&this.isDynamic()&&!this.dynamicLoadComplete))
},toggle:function(){if(!this.tree.locked&&(this.hasChildren(true)||this.isDynamic())){if(this.expanded){this.collapse()
}else{this.expand()
}}},getHtml:function(){var a=[];
a[a.length]='<div class="ygtvitem" id="'+this.getElId()+'">';
a[a.length]=this.getNodeHtml();
a[a.length]=this.getChildrenHtml();
a[a.length]="</div>";
return a.join("")
},getChildrenHtml:function(){var a=[];
a[a.length]='<div class="ygtvchildren"';
a[a.length]=' id="'+this.getChildrenElId()+'"';
if(!this.expanded){a[a.length]=' style="display:none;"'
}a[a.length]=">";
if((this.hasChildren(true)&&this.expanded)||(this.renderHidden&&!this.isDynamic())){a[a.length]=this.renderChildren()
}a[a.length]="</div>";
return a.join("")
},renderChildren:function(){var a=this;
if(this.isDynamic()&&!this.dynamicLoadComplete){this.isLoading=true;
this.tree.locked=true;
if(this.dataLoader){setTimeout(function(){a.dataLoader(a,function(){a.loadComplete()
})
},10)
}else{if(this.tree.root.dataLoader){setTimeout(function(){a.tree.root.dataLoader(a,function(){a.loadComplete()
})
},10)
}else{return"Error: data loader not found or not specified."
}}return""
}else{return this.completeRender()
}},completeRender:function(){var b=[];
for(var a=0;
a<this.children.length;
++a){this.children[a].childrenRendered=false;
b[b.length]=this.children[a].getHtml()
}this.childrenRendered=true;
return b.join("")
},loadComplete:function(){this.getChildrenEl().innerHTML=this.completeRender();
this.dynamicLoadComplete=true;
this.isLoading=false;
this.expand();
this.tree.locked=false
},getAncestor:function(b){if(b>=this.depth||b<0){return null
}var a=this.parent;
while(a.depth>b){a=a.parent
}return a
},getDepthStyle:function(a){return(this.getAncestor(a).nextSibling)?"ygtvdepthcell":"ygtvblankdepthcell"
},getNodeHtml:function(){return""
},refresh:function(){this.getChildrenEl().innerHTML=this.completeRender();
if(this.hasIcon){var a=this.getToggleEl();
if(a){a.className=this.getStyle()
}}},toString:function(){return"Node ("+this.index+")"
}};
YAHOO.widget.RootNode=function(a){this.init(null,null,true);
this.tree=a
};
YAHOO.widget.RootNode.prototype=new YAHOO.widget.Node();
YAHOO.widget.RootNode.prototype.getNodeHtml=function(){return""
};
YAHOO.widget.RootNode.prototype.toString=function(){return"RootNode"
};
YAHOO.widget.RootNode.prototype.loadComplete=function(){this.tree.draw()
};
YAHOO.widget.TextNode=function(c,b,a){if(c){this.init(c,b,a);
this.setUpLabel(c)
}};
YAHOO.widget.TextNode.prototype=new YAHOO.widget.Node();
YAHOO.widget.TextNode.prototype.labelStyle="ygtvlabel";
YAHOO.widget.TextNode.prototype.labelElId=null;
YAHOO.widget.TextNode.prototype.label=null;
YAHOO.widget.TextNode.prototype.setUpLabel=function(a){if(typeof a=="string"){a={label:a}
}this.label=a.label;
if(a.href){this.href=a.href
}if(a.target){this.target=a.target
}if(a.style){this.labelStyle=a.style
}this.labelElId="ygtvlabelel"+this.index
};
YAHOO.widget.TextNode.prototype.getLabelEl=function(){return document.getElementById(this.labelElId)
};
YAHOO.widget.TextNode.prototype.getNodeHtml=function(){var b=[];
b[b.length]='<table border="0" cellpadding="0" cellspacing="0">';
b[b.length]="<tr>";
for(i=0;
i<this.depth;
++i){b[b.length]='<td class="'+this.getDepthStyle(i)+'">&#160;</td>'
}var a="YAHOO.widget.TreeView.getNode('"+this.tree.id+"',"+this.index+")";
b[b.length]="<td";
b[b.length]=' id="'+this.getToggleElId()+'"';
b[b.length]=' class="'+this.getStyle()+'"';
if(this.hasChildren(true)){b[b.length]=' onmouseover="this.className=';
b[b.length]=a+'.getHoverStyle()"';
b[b.length]=' onmouseout="this.className=';
b[b.length]=a+'.getStyle()"'
}b[b.length]=' onclick="javascript:'+this.getToggleLink()+'">';
b[b.length]="&#160;";
b[b.length]="</td>";
b[b.length]="<td>";
b[b.length]="<a";
b[b.length]=' id="'+this.labelElId+'"';
b[b.length]=' class="'+this.labelStyle+'"';
b[b.length]=' href="'+this.href+'"';
b[b.length]=' target="'+this.target+'"';
b[b.length]=' onclick="return '+a+".onLabelClick("+a+')"';
if(this.hasChildren(true)){b[b.length]=" onmouseover=\"document.getElementById('";
b[b.length]=this.getToggleElId()+"').className=";
b[b.length]=a+'.getHoverStyle()"';
b[b.length]=" onmouseout=\"document.getElementById('";
b[b.length]=this.getToggleElId()+"').className=";
b[b.length]=a+'.getStyle()"'
}b[b.length]=" >";
b[b.length]=this.label;
b[b.length]="</a>";
b[b.length]="</td>";
b[b.length]="</tr>";
b[b.length]="</table>";
return b.join("")
};
YAHOO.widget.TextNode.prototype.onLabelClick=function(a){};
YAHOO.widget.TextNode.prototype.toString=function(){return"TextNode ("+this.index+") "+this.label
};
YAHOO.widget.MenuNode=function(c,b,a){if(c){this.init(c,b,a);
this.setUpLabel(c)
}this.multiExpand=false
};
YAHOO.widget.MenuNode.prototype=new YAHOO.widget.TextNode();
YAHOO.widget.MenuNode.prototype.toString=function(){return"MenuNode ("+this.index+") "+this.label
};
YAHOO.widget.HTMLNode=function(d,c,b,a){if(d){this.init(d,c,b);
this.initContent(d,a)
}};
YAHOO.widget.HTMLNode.prototype=new YAHOO.widget.Node();
YAHOO.widget.HTMLNode.prototype.contentStyle="ygtvhtml";
YAHOO.widget.HTMLNode.prototype.contentElId=null;
YAHOO.widget.HTMLNode.prototype.content=null;
YAHOO.widget.HTMLNode.prototype.initContent=function(b,a){if(typeof b=="string"){b={html:b}
}this.html=b.html;
this.contentElId="ygtvcontentel"+this.index;
this.hasIcon=a
};
YAHOO.widget.HTMLNode.prototype.getContentEl=function(){return document.getElementById(this.contentElId)
};
YAHOO.widget.HTMLNode.prototype.getNodeHtml=function(){var a=[];
a[a.length]='<table border="0" cellpadding="0" cellspacing="0">';
a[a.length]="<tr>";
for(i=0;
i<this.depth;
++i){a[a.length]='<td class="'+this.getDepthStyle(i)+'">&#160;</td>'
}if(this.hasIcon){a[a.length]="<td";
a[a.length]=' id="'+this.getToggleElId()+'"';
a[a.length]=' class="'+this.getStyle()+'"';
a[a.length]=' onclick="javascript:'+this.getToggleLink()+'"';
if(this.hasChildren(true)){a[a.length]=' onmouseover="this.className=';
a[a.length]="YAHOO.widget.TreeView.getNode('";
a[a.length]=this.tree.id+"',"+this.index+').getHoverStyle()"';
a[a.length]=' onmouseout="this.className=';
a[a.length]="YAHOO.widget.TreeView.getNode('";
a[a.length]=this.tree.id+"',"+this.index+').getStyle()"'
}a[a.length]=">&#160;</td>"
}a[a.length]="<td";
a[a.length]=' id="'+this.contentElId+'"';
a[a.length]=' class="'+this.contentStyle+'"';
a[a.length]=" >";
a[a.length]=this.html;
a[a.length]="</td>";
a[a.length]="</tr>";
a[a.length]="</table>";
return a.join("")
};
YAHOO.widget.HTMLNode.prototype.toString=function(){return"HTMLNode ("+this.index+")"
};
YAHOO.widget.TVAnim=function(){return{FADE_IN:"TVFadeIn",FADE_OUT:"TVFadeOut",getAnim:function(b,a,c){if(YAHOO.widget[b]){return new YAHOO.widget[b](a,c)
}else{return null
}},isValid:function(a){return(YAHOO.widget[a])
}}
}();
YAHOO.widget.TVFadeIn=function(a,b){this.el=a;
this.callback=b
};
YAHOO.widget.TVFadeIn.prototype={animate:function(){var e=this;
var d=this.el.style;
d.opacity=0.1;
d.filter="alpha(opacity=10)";
d.display="";
var c=0.4;
var b=new YAHOO.util.Anim(this.el,{opacity:{from:0.1,to:1,unit:""}},c);
b.onComplete.subscribe(function(){e.onComplete()
});
b.animate()
},onComplete:function(){this.callback()
},toString:function(){return"TVFadeIn"
}};
YAHOO.widget.TVFadeOut=function(a,b){this.el=a;
this.callback=b
};
YAHOO.widget.TVFadeOut.prototype={animate:function(){var d=this;
var c=0.4;
var b=new YAHOO.util.Anim(this.el,{opacity:{from:1,to:0.1,unit:""}},c);
b.onComplete.subscribe(function(){d.onComplete()
});
b.animate()
},onComplete:function(){var a=this.el.style;
a.display="none";
a.filter="alpha(opacity=100)";
this.callback()
},toString:function(){return"TVFadeOut"
}}
};