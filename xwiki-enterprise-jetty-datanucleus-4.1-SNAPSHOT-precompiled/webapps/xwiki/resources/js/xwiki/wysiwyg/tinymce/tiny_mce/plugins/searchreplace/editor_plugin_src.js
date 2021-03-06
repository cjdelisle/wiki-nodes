tinyMCE.importPluginLanguagePack("searchreplace","en,tr,sv,zh_cn,fa,fr_ca,fr,de,pl,pt_br,cs,nl,da,he,nb,hu,ru,ru_KOI8-R,ru_UTF-8,nn,fi,cy,es,is,zh_tw,zh_tw_utf8,sk");
var TinyMCE_SearchReplacePlugin={getInfo:function(){return{longname:"Search/Replace",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_searchreplace.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},initInstance:function(a){a.addShortcut("ctrl","f","lang_searchreplace_search_desc","mceSearch",true)
},getControlHTML:function(a){switch(a){case"search":return tinyMCE.getButtonHTML(a,"lang_searchreplace_search_desc","{$pluginurl}/images/search.gif","mceSearch",true);
case"replace":return tinyMCE.getButtonHTML(a,"lang_searchreplace_replace_desc","{$pluginurl}/images/replace.gif","mceSearchReplace",true)
}return""
},execCommand:function(j,g,f,d,m){var o=tinyMCE.getInstanceById(j);
function k(q,p){m[q]=typeof(m[q])=="undefined"?p:m[q]
}function c(p,r,q){o.execCommand("mceInsertContent",false,r)
}if(!m){m=new Array()
}k("editor_id",j);
k("searchstring","");
k("replacestring",null);
k("replacemode","none");
k("casesensitive",false);
k("backwards",false);
k("wrap",false);
k("wholeword",false);
k("inline","yes");
switch(f){case"mceResetSearch":tinyMCE.lastSearchRng=null;
return true;
case"mceSearch":if(d){var n=new Array();
if(m.replacestring!=null){n.file="../../plugins/searchreplace/replace.htm";
n.width=320;
n.height=100+(tinyMCE.isNS7?20:0);
n.width+=tinyMCE.getLang("lang_searchreplace_replace_delta_width",0);
n.height+=tinyMCE.getLang("lang_searchreplace_replace_delta_height",0)
}else{n.file="../../plugins/searchreplace/search.htm";
n.width=310;
n.height=105+(tinyMCE.isNS7?25:0);
n.width+=tinyMCE.getLang("lang_searchreplace_search_delta_width",0);
n.height+=tinyMCE.getLang("lang_searchreplace_replace_delta_height",0)
}o.execCommand("SelectAll");
if(tinyMCE.isMSIE){var b=o.selection.getRng();
b.collapse(true);
b.select()
}else{o.selection.getSel().collapseToStart()
}tinyMCE.openWindow(n,m)
}else{var i=tinyMCE.getInstanceById(j).contentWindow;
var l=tinyMCE.getInstanceById(j).contentWindow.document;
var h=tinyMCE.getInstanceById(j).contentWindow.document.body;
if(h.innerHTML==""){alert(tinyMCE.getLang("lang_searchreplace_notfound"));
return true
}if(m.replacemode=="current"){c(m.string,m.replacestring,m.backwards);
m.replacemode="none";
tinyMCE.execInstanceCommand(j,"mceSearch",d,m,false);
return true
}if(tinyMCE.isMSIE){var a=tinyMCE.lastSearchRng?tinyMCE.lastSearchRng:l.selection.createRange();
var e=0;
if(m.wholeword){e=e|2
}if(m.casesensitive){e=e|4
}if(!a.findText){alert("This operation is currently not supported by this browser.");
return true
}if(m.replacemode=="all"){while(a.findText(m.string,m.backwards?-1:1,e)){a.scrollIntoView();
a.select();
a.collapse(false);
c(m.string,m.replacestring,m.backwards)
}alert(tinyMCE.getLang("lang_searchreplace_allreplaced"));
return true
}if(a.findText(m.string,m.backwards?-1:1,e)){a.scrollIntoView();
a.select();
a.collapse(m.backwards);
tinyMCE.lastSearchRng=a
}else{alert(tinyMCE.getLang("lang_searchreplace_notfound"))
}}else{if(m.replacemode=="all"){while(i.find(m.string,m.casesensitive,m.backwards,m.wrap,m.wholeword,false,false)){c(m.string,m.replacestring,m.backwards)
}alert(tinyMCE.getLang("lang_searchreplace_allreplaced"));
return true
}if(!i.find(m.string,m.casesensitive,m.backwards,m.wrap,m.wholeword,false,false)){alert(tinyMCE.getLang("lang_searchreplace_notfound"))
}}}return true;
case"mceSearchReplace":m.replacestring="";
tinyMCE.execInstanceCommand(j,"mceSearch",d,m,false);
return true
}return false
}};
tinyMCE.addPlugin("searchreplace",TinyMCE_SearchReplacePlugin);