function init(){tinyMCEPopup.resizeToInnerSize();
var a=document.forms[0];
a.searchstring.value=tinyMCE.getWindowArg("searchstring");
a.casesensitivebox.checked=tinyMCE.getWindowArg("casesensitive");
a.backwards[0].checked=tinyMCE.getWindowArg("backwards");
a.backwards[1].checked=!tinyMCE.getWindowArg("backwards");
tinyMCEPopup.execCommand("mceResetSearch",false,{dummy:""},false)
}function searchNext(){var a=document.forms[0];
if(a.searchstring.value==""){return
}tinyMCEPopup.execCommand("mceSearch",false,{string:a.searchstring.value,casesensitive:a.casesensitivebox.checked,backwards:a.backwards[0].checked},false);
window.focus()
}function cancelAction(){tinyMCEPopup.close()
};