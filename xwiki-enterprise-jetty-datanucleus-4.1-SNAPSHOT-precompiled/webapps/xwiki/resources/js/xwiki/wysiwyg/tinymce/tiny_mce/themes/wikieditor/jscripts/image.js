function insertImage(){var d=document.forms[0].href.value;
var b=document.forms[0].width.value;
var a=document.forms[0].height.value;
var e=document.forms[0].align.options[document.forms[0].align.selectedIndex].value;
var c=document.forms[0].halign.options[document.forms[0].halign.selectedIndex].value;
tinyMCEPopup.restoreSelection();
tinyMCE.themes.wikieditor.insertImage(d,b,a,e,c);
tinyMCEPopup.close()
}function init(){var c=tinyMCE.getWindowArg("editor_id");
var a=tinyMCE.getWindowArg("src");
document.forms[0].href.value=a.replace(/%20/gi," ");
document.forms[0].width.value=tinyMCE.getWindowArg("width");
document.forms[0].height.value=tinyMCE.getWindowArg("height");
for(var b=0;
b<document.forms[0].align.options.length;
b++){if(document.forms[0].align.options[b].value==tinyMCE.getWindowArg("align")){document.forms[0].align.options.selectedIndex=b
}}for(var b=0;
b<document.forms[0].halign.options.length;
b++){if(document.forms[0].halign.options[b].value==tinyMCE.getWindowArg("halign")){document.forms[0].halign.options.selectedIndex=b
}}document.forms[0].insert.value=tinyMCE.getLang("lang_"+tinyMCE.getWindowArg("action"),"Insert",true)
}function cancelAction(){tinyMCEPopup.close()
}var preloadImg=new Image();
function resetImageData(){var a=document.forms[0];
a.width.value=a.height.value=""
}function updateImageData(){var a=document.forms[0];
if(a.width.value==""){a.width.value=preloadImg.width
}if(a.height.value==""){a.height.value=preloadImg.height
}}function getImageData(){preloadImg=new Image();
tinyMCE.addEvent(preloadImg,"load",updateImageData);
tinyMCE.addEvent(preloadImg,"error",function(){var a=document.forms[0];
a.width.value=a.height.value=""
});
preloadImg.src=tinyMCE.convertRelativeToAbsoluteURL(tinyMCE.settings.base_href,document.forms[0].src.value)
};