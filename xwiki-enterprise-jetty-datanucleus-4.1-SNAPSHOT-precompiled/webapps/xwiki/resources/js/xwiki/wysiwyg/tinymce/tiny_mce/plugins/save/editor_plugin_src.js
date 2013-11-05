tinyMCE.importPluginLanguagePack("save","en,tr,sv,zh_cn,cs,fa,fr_ca,fr,de,pl,pt_br,nl,he,nb,hu,ru,ru_KOI8-R,ru_UTF-8,nn,fi,da,es,cy,is,zh_tw,zh_tw_utf8,sk");
var TinyMCE_SavePlugin={getInfo:function(){return{longname:"Save",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_save.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},initInstance:function(a){a.addShortcut("ctrl","s","lang_save_desc","mceSave")
},getControlHTML:function(a){switch(a){case"save":return tinyMCE.getButtonHTML(a,"lang_save_desc","{$pluginurl}/images/save.gif","mceSave")
}return""
},execCommand:function(editor_id,element,command,user_interface,value){switch(command){case"mceSave":if(tinyMCE.getParam("fullscreen_is_enabled")){return true
}var inst=tinyMCE.selectedInstance;
var formObj=inst.formElement.form;
if(tinyMCE.getParam("save_enablewhendirty")&&!inst.isDirty()){return true
}if(formObj){tinyMCE.triggerSave();
var os;
if((os=tinyMCE.getParam("save_onsavecallback"))){if(eval(os+"(inst);")){inst.startContent=tinyMCE.trim(inst.getBody().innerHTML);
tinyMCE.triggerNodeChange(false,true)
}return true
}for(var i=0;
i<formObj.elements.length;
i++){var elementId=formObj.elements[i].name?formObj.elements[i].name:formObj.elements[i].id;
if(elementId.indexOf("mce_editor_")==0){formObj.elements[i].disabled=true
}}tinyMCE.isNotDirty=true;
if(formObj.onsubmit==null||formObj.onsubmit()!=false){inst.formElement.form.submit()
}}else{alert("Error: No form element found.")
}return true
}return false
},handleNodeChange:function(g,d,f,c,a,b){if(tinyMCE.getParam("fullscreen_is_enabled")){tinyMCE.switchClass(g+"_save","mceButtonDisabled");
return true
}if(tinyMCE.getParam("save_enablewhendirty")){var e=tinyMCE.getInstanceById(g);
if(e.isDirty()){tinyMCE.switchClass(g+"_save","mceButtonNormal");
return true
}tinyMCE.switchClass(g+"_save","mceButtonDisabled")
}return true
}};
tinyMCE.addPlugin("save",TinyMCE_SavePlugin);