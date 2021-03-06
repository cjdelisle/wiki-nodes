WikiEditor.prototype.initMacrosPlugin=function(){if(!this.isPluginLoaded("core")){alert("Macros Plugin: You must load the core syntax plugin before!");
return
}this.addToolbarHandler("handleMacrosButtons")
};
wikiEditor.initMacrosPlugin();
WikiEditor.prototype.insertMacro=function(b,a){this.core.execInstanceCommand(b,"mceInsertRawHTML",false,a)
};
WikiEditor.prototype.handleMacrosButtons=function(f,d,e,c,a,b){tinyMCE.switchClass(f+"_macro","mceButtonNormal");
do{switch(d.nodeName.toLowerCase()){case"macro":tinyMCE.switchClass(f+"_macro","mceButtonSelected");
break
}}while((d=d.parentNode))
};
WikiEditor.prototype.getMacrosToolbar=function(){return this.getMacrosControls("macro")
};
WikiEditor.prototype.getMacrosControls=function(a){var b="";
switch(a){case"macro":b=this.createButtonHTML("macro","macro.gif","lang_macro_desc","wikiMacro",true);
break
}return b
};