function WikiEditor(){this._instance=null;
this._wsFilters=new Array();
this._wsReplace=new Array();
this._htmlFilters=new Array();
this._htmlReplace=new Array();
this._toolbarGenerators=new Array();
this._toolbarHandlers=new Array();
this._fixCommands=new Array();
this._commands=new Array();
var b=document.getElementsByTagName("script");
for(var a=0;
a<b.length;
a++){if(b[a].src&&(b[a].src.indexOf("wiki_editor.js")!=-1)){var c=b[a].src;
this.srcMode=(c.indexOf("_src")!=-1)?"_src":"";
c=c.substring(0,c.lastIndexOf("/"));
this.baseURL=c;
break
}}this.scriptsBaseURL=this.baseURL.substring(0,this.baseURL.lastIndexOf("/"))
}WikiEditor.prototype.init=function(c){this._imagePath="";
this._commandIntercept=false;
this._interceptedCommand="";
this._interceptedNode=null;
this._interceptedEditor="";
this._htmlTagRemover="__removeHtmlTags";
this.core=tinyMCE;
this._theme="default";
this._loadedPlugins=new Array();
this._useStyleToolbar=false;
if(c.plugins==null){c.plugins=""
}if(c.plugins.indexOf("wikieditor")==-1){c.plugins+=",wikiplugin"
}c.theme="wikieditor";
c.extended_valid_elements="li[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style|title|type|value|wikieditorlistdepth|wikieditorlisttype]";
c.relative_urls=true;
c.remove_linebreaks=false;
if(c.use_linkeditor_tabs==null){c.use_linkeditor_tabs="wiki_tab, web_tab, attachments_tab, email_tab, file_tab"
}if((c.wiki_editor_toolbar==null)||(c.wiki_editor_toolbar.toString()=="")){c.wiki_editor_toolbar="texttoolbar, justifytoolbar, listtoolbar, indenttoolbar, undotoolbar, titletoolbar, styletoolbar, horizontaltoolbar, symboltoolbar, attachmenttoolbar, macrostoolbar, tabletoolbar, tablerowtoolbar, tablecoltoolbar, linktoolbar, togglebutton"
}this.setImagePath((c.wiki_images_path==null)?"":c.wiki_images_path);
if(c.wiki_theme&&c.wiki_theme!=""){this._theme=c.wiki_theme
}if(c.wiki_use_style=="true"){this._useStyleToolbar=c.wiki_use_style
}this.core.init(c);
this.core.loadScript(this.baseURL+"/themes/"+this._theme+".js");
if(c.wiki_plugins&&c.wiki_plugins!=""){var a=c.wiki_plugins.split(/\s*,\s*/i);
for(var b=0;
b<a.length;
b++){this.core.loadScript(this.baseURL+"/plugins/"+a[b]+".js");
this._loadedPlugins.push(a[b])
}}};
WikiEditor.prototype.getContent=function(){return this.core.getContent()
};
WikiEditor.prototype.setContent=function(a){this.core.setContent(a)
};
WikiEditor.prototype.triggerSave=function(b,a){this.core.triggerSave(b,a)
};
WikiEditor.prototype.updateContent=function(a){this.core.updateContent(a)
};
WikiEditor.prototype.isPluginLoaded=function(a){for(var b=0;
b<this._loadedPlugins.length;
b++){if(this._loadedPlugins[b]==a){return true
}}return false
};
WikiEditor.prototype.setHtmlTagRemover=function(a){this._htmlTagRemover=a
};
WikiEditor.prototype.addExternalProcessor=function(a,b){this._wsFilters.push(a);
this._wsReplace.push(b)
};
WikiEditor.prototype.addExternalProcessorBefore=function(a,b,c){this._insertBefore(this._wsFilters,this._wsReplace,a,b,c)
};
WikiEditor.prototype.addInternalProcessor=function(a,b){this._htmlFilters.push(a);
this._htmlReplace.push(b)
};
WikiEditor.prototype.addInternalProcessorBefore=function(a,b,c){this._insertBefore(this._htmlFilters,this._htmlReplace,a,b,c)
};
WikiEditor.prototype._insertBefore=function(d,b,a,g,f){var c=0;
for(var e=0;
e<b.length;
e++){if(b[e]==a){c=e;
break
}}for(var e=b.length;
e>c;
e--){b[e]=b[e-1];
d[e]=d[e-1]
}d[c]=g;
b[c]=f
};
WikiEditor.prototype.addFixCommand=function(a,b){this._fixCommands[a]=b
};
WikiEditor.prototype.addCommand=function(a,b){this._commands[a]=b
};
WikiEditor.prototype.addToolbarGenerator=function(a){this._toolbarGenerators.push(a)
};
WikiEditor.prototype.addToolbarHandler=function(a){this._toolbarHandlers.push(a)
};
WikiEditor.prototype.setImagePath=function(a){this._imagePath=a
};
WikiEditor.prototype.getImagePath=function(){return tinyMCE.settings.wiki_images_path
};
WikiEditor.prototype.dummyCommand=function(d,a,c,e,b){this.core.triggerNodeChange();
return true
};
WikiEditor.prototype.execCommand=function(d,a,c,e,b){if(this._fixCommands[c]!=null){this._commandIntercept=true;
this._interceptedCommand=c;
this._interceptedEditor=d
}if(this._commands[c]&&this[this._commands[c]]){return this[this._commands[c]](d,a,c,e,b)
}return false
};
WikiEditor.prototype.executedCommand=function(a){if(a==this._interceptedCommand&&this._interceptedNode){this[this._fixCommands[a]](this._interceptedEditor,this._interceptedNode);
this._interceptedCommand="";
this._interceptedNode=null
}};
WikiEditor.prototype.handleNodeChange=function(g,e,f,d,a,c){this._cleanNode(g,e);
if(this._commandIntercept){this._commandIntercept=false;
this._interceptedNode=e
}for(var b=0;
b<this._toolbarHandlers.length;
b++){if(this[this._toolbarHandlers[b]]){this[this._toolbarHandlers[b]](g,e,f,d,a,c)
}}};
WikiEditor.prototype.getControlHTML=function(a){var c="";
for(var b=0;
b<this._toolbarGenerators.length;
b++){if(this[this._toolbarGenerators[b]]&&(c=this[this._toolbarGenerators[b]](a))!=""){break
}}return c
};
WikiEditor.prototype.convertExternal=function(d){var f,c;
var a;
var g;
d=d.replace(/\$(\d)/g,"&#036;$1");
for(var b=0;
b<this._wsFilters.length;
b++){RegExp.lastIndex=0;
g=-1;
f=this._wsFilters[b];
while((c=f.exec(d))){if(c.index<=g){break
}RegExp.lastIndex=g=c.index;
var e=this._wsReplace[b];
if(this[e]){d=this[e](f,c,d)
}else{d=d.replace(f,e)
}}}d=unescape(d);
d=d.replace(/\\<(.*?)\\>/g,"\\&lt;$1\\&gt;");
return d
};
WikiEditor.prototype.convertInternal=function(d){var f,c;
var a;
var g;
d=d.replace(/\$(\d)/g,"&#036;$1");
for(var b=0;
b<this._htmlFilters.length;
b++){RegExp.lastIndex=0;
g=-1;
f=this._htmlFilters[b];
while((c=f.exec(d))){if(c.index<=g){break
}RegExp.lastIndex=g=c.index;
var e=this._htmlReplace[b];
if(this[e]){d=this[e](f,c,d)
}else{d=d.replace(f,e)
}}}d=this.trimString(this._removeHtmlTags(d));
d=unescape(d);
d=d.replace(/\&#036;/g,"$");
d=d.replace(/\\<((\/)*blockquote)\\>/g,"<$1>");
d=d.replace(/<blockquote>((<(\/)?blockquote>)|(\s*))*<\/blockquote>/g,"");
d=d.replace(/[\r\n]{4,}/g,"\r\n\r\n");
if(d.substring(d.length-2)=="\\\\"){d=d.substring(0,d.lastIndexOf("\\\\"))
}return d
};
WikiEditor.prototype.tagListInternal=function(b){for(var a=0;
b.childNodes[a];
a++){if(b.childNodes[a].nodeType==1){switch(b.childNodes[a].nodeName.toLowerCase()){case"ul":case"ol":this._tagListInternal(b.childNodes[a],1);
break;
default:this.tagListInternal(b.childNodes[a])
}}}return b
};
WikiEditor.prototype._tagListInternal=function(b,d){var c="";
for(var a=0;
b.childNodes[a];
a++){if(b.childNodes[a].nodeType==1){switch(b.childNodes[a].nodeName.toLowerCase()){case"ul":case"ol":c+=this._tagListInternal(b.childNodes[a],d+1);
break;
case"li":b.childNodes[a].setAttribute("wikieditorlisttype",b.nodeName.toLowerCase());
b.childNodes[a].setAttribute("wikieditorlistdepth",d);
break
}}}return c
};
WikiEditor.prototype.replaceMatchingTag=function(e,k,g){var h=new RegExp("<"+k+"[^>]*>","gi");
var i=new RegExp("</s*"+k+"[^>]*>","gi");
var b=h.exec(e);
var c=i.exec(e);
var f=this._getResultIndex(b);
var d=this._getResultIndex(c);
var a=f;
var j=new Array();
if(f>-1&&d>-1&&f<d){do{RegExp.lastIndex=a+b[0].length;
b=h.exec(e);
a=this._getResultIndex(b);
if(a==-1){break
}else{if(a<d){RegExp.lastIndex=d+c[0].length;
c=i.exec(e);
d=this._getResultIndex(c)
}else{break
}}}while(true);
j.start=f;
j.end=d+c[0].length;
if(typeof(g)=="undefined"){j.string=e
}else{j.string=e.substring(0,f)+g+e.substring(d+c[0].length,e.length)
}}else{j.start=j.end=-1;
j.string=e
}return j
};
WikiEditor.prototype._getResultIndex=function(a){return(a==null)?-1:a.index
};
WikiEditor.prototype.readAttributes=function(f){var d=/\s*\w+\s*=\s*"[^"]*"\s*/gi;
var h=/\s*(\w+)\s*=\s*"([^"]*)"\s*/i;
var a=f.match(d);
var b=new Array();
var g=0;
if(a!=null){for(var c=0;
c<a.length;
c++){var e=h.exec(a[c]);
g++;
b[e[1].toLowerCase()]=e[2]
}}return(g>0)?b:null
};
WikiEditor.prototype.trimString=function(c){var a=/(\S+(\s+\S+)*)+/i;
var b=a.exec(c);
return(b&&b[1])?b[1]:""
};
WikiEditor.prototype.buildString=function(c,d){var a="";
for(var b=0;
b<d;
b++){a+=c
}return a
};
WikiEditor.prototype._removeHtmlTags=function(a){return this[this._htmlTagRemover](a)
};
WikiEditor.prototype.__removeHtmlTags=function(b){var a=/<[^>]*>/g;
return b.replace(a,"")
};
WikiEditor.prototype._escapeText=function(g){var f="";
var c;
var d="";
var h="";
var a="";
for(var b=0;
b<256;
b++){a=b.toString(16);
if(a.length<2){a="0"+a
}h+=a;
d+=unescape("%"+a)
}h=h.toUpperCase();
g.replace(String.fromCharCode(13)+"","%13");
for(var e=0;
e<g.length;
e++){c=g.substr(e,1);
for(var b=0;
b<d.length;
b++){if(c==d.substr(b,1)){c=c.replace(d.substr(b,1),"%"+h.substr(b*2,2));
b=d.length
}}f+=c
}return f
};
WikiEditor.prototype.trimRNString=function(a){a=a.replace(/(^(\r|\n))|((\r|\n)$)/gi,"");
if(a.lastIndexOf("\r")==(a.length-1)){a=a.substring(0,a.length-1)
}if(a.indexOf("\n")==0){a=a.substring(1,a.length)
}return a
};
WikiEditor.prototype.toolbars=["texttoolbar","justifytoolbar","listtoolbar","indenttoolbar","undotoolbar","titletoolbar","styletoolbar","horizontaltoolbar","symboltoolbar","attachmenttoolbar","macrostoolbar","tabletoolbar","tablerowtoolbar","tablecoltoolbar","linktoolbar","suptoolbar"];
WikiEditor.prototype.disableButtonsInWikiMode=function(c){for(var a=0;
a<this.toolbars.length;
a++){var b=document.getElementById(c+"_"+this.toolbars[a]);
if(b){b.style.display="none"
}}};
WikiEditor.prototype.showButtonsInWywisygMode=function(c){for(var a=0;
a<this.toolbars.length;
a++){var b=document.getElementById(c+"_"+this.toolbars[a]);
if(b){b.style.display="inline"
}}};
wikiEditor=new WikiEditor();