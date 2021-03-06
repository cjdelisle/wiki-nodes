tinyMCE.importPluginLanguagePack("advlink","en,tr,de,sv,zh_cn,cs,fa,fr_ca,fr,pl,pt_br,nl,he,nb,ru,ru_KOI8-R,ru_UTF-8,nn,cy,es,is,zh_tw,zh_tw_utf8,sk,da");
var TinyMCE_AdvancedLinkPlugin={getInfo:function(){return{longname:"Advanced link",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_advlink.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},initInstance:function(a){a.addShortcut("ctrl","k","lang_advlink_desc","mceAdvLink")
},getControlHTML:function(a){switch(a){case"link":return tinyMCE.getButtonHTML(a,"lang_link_desc","{$themeurl}/images/link.gif","mceAdvLink")
}return""
},execCommand:function(g,d,c,a,h){switch(c){case"mceAdvLink":var f=false;
var e=tinyMCE.getInstanceById(g);
var j=e.getFocusElement();
var b=e.selection.getSelectedText();
if(tinyMCE.selectedElement){f=(tinyMCE.selectedElement.nodeName.toLowerCase()=="img")||(b&&b.length>0)
}if(f||(j!=null&&j.nodeName=="A")){var i=new Array();
i.file="../../plugins/advlink/link.htm";
i.width=480;
i.height=400;
i.width+=tinyMCE.getLang("lang_advlink_delta_width",0);
i.height+=tinyMCE.getLang("lang_advlink_delta_height",0);
tinyMCE.openWindow(i,{editor_id:g,inline:"yes"})
}return true
}return false
},handleNodeChange:function(f,d,e,c,a,b){if(d==null){return
}do{if(d.nodeName=="A"&&tinyMCE.getAttrib(d,"href")!=""){tinyMCE.switchClass(f+"_advlink","mceButtonSelected");
return true
}}while((d=d.parentNode));
if(b){tinyMCE.switchClass(f+"_advlink","mceButtonNormal");
return true
}tinyMCE.switchClass(f+"_advlink","mceButtonDisabled");
return true
}};
tinyMCE.addPlugin("advlink",TinyMCE_AdvancedLinkPlugin);