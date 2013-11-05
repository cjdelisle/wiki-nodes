tinyMCE.importPluginLanguagePack("print","en,tr,sv,zh_cn,fa,fr_ca,fr,de,pl,pt_br,cs,nl,da,he,nb,hu,ru,ru_KOI8-R,ru_UTF-8,nn,fi,es,cy,is,zh_tw,zh_tw_utf8,sk");
var TinyMCE_PrintPlugin={getInfo:function(){return{longname:"Print",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_print.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},getControlHTML:function(a){switch(a){case"print":return tinyMCE.getButtonHTML(a,"lang_print_desc","{$pluginurl}/images/print.gif","mcePrint")
}return""
},execCommand:function(d,a,c,e,b){switch(c){case"mcePrint":tinyMCE.getInstanceById(d).contentWindow.print();
return true
}return false
}};
tinyMCE.addPlugin("print",TinyMCE_PrintPlugin);