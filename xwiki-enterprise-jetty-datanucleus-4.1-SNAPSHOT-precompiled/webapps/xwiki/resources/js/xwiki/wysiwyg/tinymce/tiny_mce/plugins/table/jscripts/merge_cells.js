function init(){tinyMCEPopup.resizeToInnerSize();
var a=document.forms[0];
a.numcols.value=tinyMCE.getWindowArg("numcols",1);
a.numrows.value=tinyMCE.getWindowArg("numrows",1)
}function mergeCells(){var b=new Array();
var a=document.forms[0];
b.numcols=a.numcols.value;
b.numrows=a.numrows.value;
tinyMCEPopup.execCommand("mceTableMergeCells",false,b);
tinyMCEPopup.close()
};