function init(){var a=document.forms[0];
a.width.value=tinyMCE.getWindowArg("width");
a.size.value=tinyMCE.getWindowArg("size");
a.insert.value=tinyMCE.getLang("lang_"+tinyMCE.getWindowArg("mceDo"),"Insert",true);
if(tinyMCE.getWindowArg("noshade")){a.noshade.checked=true
}if(tinyMCE.getWindowArg("width").lastIndexOf("%")!=-1){a.width2.value="%";
a.width.value=a.width.value.substring(0,a.width.value.length-1)
}}function insertHR(){var a=document.forms[0];
var d=a.width.value;
var c=a.size.value;
var b="<hr";
if(c!=""&&c!=0){b+=' size="'+c+'"'
}if(d!=""&&d!=0){b+=' width="'+d;
if(a.width2.value=="%"){b+="%"
}b+='"'
}if(a.noshade.checked==true){b+=' noshade="noshade"'
}b+=" />";
tinyMCEPopup.execCommand("mceInsertContent",true,b);
tinyMCEPopup.close()
}function cancelAction(){tinyMCEPopup.close()
};