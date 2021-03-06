if(!tinyMCE.settings.contextmenu_skip_plugin_css){tinyMCE.loadCSS(tinyMCE.baseURL+"/plugins/contextmenu/css/contextmenu.css")
}var TinyMCE_ContextMenuPlugin={_contextMenu:null,getInfo:function(){return{longname:"Context menus",author:"Moxiecode Systems",authorurl:"http://tinymce.moxiecode.com",infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_contextmenu.html",version:tinyMCE.majorVersion+"."+tinyMCE.minorVersion}
},initInstance:function(a){if(tinyMCE.isMSIE5_0&&tinyMCE.isOpera){return
}TinyMCE_ContextMenuPlugin._contextMenu=new TinyMCE_ContextMenu({commandhandler:"TinyMCE_ContextMenuPlugin._commandHandler",spacer_image:tinyMCE.baseURL+"/plugins/contextmenu/images/spacer.gif"});
tinyMCE.addEvent(a.getDoc(),"click",TinyMCE_ContextMenuPlugin._hideContextMenu);
tinyMCE.addEvent(a.getDoc(),"keypress",TinyMCE_ContextMenuPlugin._hideContextMenu);
tinyMCE.addEvent(a.getDoc(),"keydown",TinyMCE_ContextMenuPlugin._hideContextMenu);
tinyMCE.addEvent(document,"click",TinyMCE_ContextMenuPlugin._hideContextMenu);
tinyMCE.addEvent(document,"keypress",TinyMCE_ContextMenuPlugin._hideContextMenu);
tinyMCE.addEvent(document,"keydown",TinyMCE_ContextMenuPlugin._hideContextMenu);
if(tinyMCE.isGecko){tinyMCE.addEvent(a.getDoc(),"contextmenu",function(b){TinyMCE_ContextMenuPlugin._showContextMenu(tinyMCE.isMSIE?a.contentWindow.event:b,a)
})
}else{tinyMCE.addEvent(a.getDoc(),"contextmenu",TinyMCE_ContextMenuPlugin._onContextMenu)
}},_onContextMenu:function(c){var g=tinyMCE.isMSIE?c.srcElement:c.target;
var d,a;
if((a=tinyMCE.getParentElement(g,"body"))!=null){for(var f in tinyMCE.instances){var b=tinyMCE.instances[f];
if(!tinyMCE.isInstance(b)){continue
}if(a==b.getBody()){d=b;
break
}}return TinyMCE_ContextMenuPlugin._showContextMenu(tinyMCE.isMSIE?d.contentWindow.event:c,d)
}},_showContextMenu:function(f,d){function c(j,e){return j.getAttribute(e)?j.getAttribute(e):""
}var a,i,h,b;
var g=tinyMCE.getAbsPosition(d.iframeElement);
a=tinyMCE.isMSIE?f.screenX:g.absLeft+(f.pageX-d.getBody().scrollLeft);
i=tinyMCE.isMSIE?f.screenY:g.absTop+(f.pageY-d.getBody().scrollTop);
h=tinyMCE.isMSIE?f.srcElement:f.target;
b=this._contextMenu;
b.inst=d;
window.setTimeout(function(){var k=tinyMCE.getParam("theme");
b.clearAll();
var e=d.selection.getSelectedText().length!=0||h.nodeName=="IMG";
b.addItem(tinyMCE.baseURL+"/themes/"+k+"/images/cut.gif","$lang_cut_desc","Cut","",!e);
b.addItem(tinyMCE.baseURL+"/themes/"+k+"/images/copy.gif","$lang_copy_desc","Copy","",!e);
b.addItem(tinyMCE.baseURL+"/themes/"+k+"/images/paste.gif","$lang_paste_desc","Paste","",false);
if(e||(h?(h.nodeName=="A")||(h.nodeName=="IMG"):false)){b.addSeparator();
b.addItem(tinyMCE.baseURL+"/themes/advanced/images/link.gif","$lang_link_desc",d.hasPlugin("advlink")?"mceAdvLink":"mceLink");
b.addItem(tinyMCE.baseURL+"/themes/advanced/images/unlink.gif","$lang_unlink_desc","unlink","",(h?(h.nodeName!="A")&&(h.nodeName!="IMG"):true))
}h=tinyMCE.getParentElement(h,"img,table,td"+(d.hasPlugin("advhr")?",hr":""));
if(h){switch(h.nodeName){case"IMG":b.addSeparator();
if(tinyMCE.getAttrib(h,"class").indexOf("mceItemFlash")!=-1){b.addItem(tinyMCE.baseURL+"/plugins/flash/images/flash.gif","$lang_flash_props","mceFlash")
}else{b.addItem(tinyMCE.baseURL+"/themes/"+k+"/images/image.gif","$lang_image_props_desc",d.hasPlugin("advimage")?"mceAdvImage":"mceImage")
}break;
case"HR":b.addSeparator();
b.addItem(tinyMCE.baseURL+"/plugins/advhr/images/advhr.gif","$lang_insert_advhr_desc","mceAdvancedHr");
break;
case"TABLE":case"TD":if(d.hasPlugin("table")){var l=(h.nodeName=="TABLE")?"":c(h,"colspan");
var j=(h.nodeName=="TABLE")?"":c(h,"rowspan");
l=l==""?"1":l;
j=j==""?"1":j;
b.addSeparator();
b.addItem(tinyMCE.baseURL+"/themes/"+k+"/images/cut.gif","$lang_table_cut_row_desc","mceTableCutRow");
b.addItem(tinyMCE.baseURL+"/themes/"+k+"/images/copy.gif","$lang_table_copy_row_desc","mceTableCopyRow");
b.addItem(tinyMCE.baseURL+"/themes/"+k+"/images/paste.gif","$lang_table_paste_row_before_desc","mceTablePasteRowBefore","",d.tableRowClipboard==null);
b.addItem(tinyMCE.baseURL+"/themes/"+k+"/images/paste.gif","$lang_table_paste_row_after_desc","mceTablePasteRowAfter","",d.tableRowClipboard==null);
b.addSeparator();
b.addItem(tinyMCE.baseURL+"/plugins/table/images/table.gif","$lang_table_desc","mceInsertTable","insert");
b.addItem(tinyMCE.baseURL+"/plugins/table/images/table.gif","$lang_table_props_desc","mceInsertTable");
b.addItem(tinyMCE.baseURL+"/plugins/table/images/table_cell_props.gif","$lang_table_cell_desc","mceTableCellProps");
b.addItem(tinyMCE.baseURL+"/plugins/table/images/table_delete.gif","$lang_table_del","mceTableDelete");
b.addSeparator();
b.addItem(tinyMCE.baseURL+"/plugins/table/images/table_row_props.gif","$lang_table_row_desc","mceTableRowProps");
b.addItem(tinyMCE.baseURL+"/plugins/table/images/table_insert_row_before.gif","$lang_table_row_before_desc","mceTableInsertRowBefore");
b.addItem(tinyMCE.baseURL+"/plugins/table/images/table_insert_row_after.gif","$lang_table_row_after_desc","mceTableInsertRowAfter");
b.addItem(tinyMCE.baseURL+"/plugins/table/images/table_delete_row.gif","$lang_table_delete_row_desc","mceTableDeleteRow");
b.addSeparator();
b.addItem(tinyMCE.baseURL+"/plugins/table/images/table_insert_col_before.gif","$lang_table_col_before_desc","mceTableInsertColBefore");
b.addItem(tinyMCE.baseURL+"/plugins/table/images/table_insert_col_after.gif","$lang_table_col_after_desc","mceTableInsertColAfter");
b.addItem(tinyMCE.baseURL+"/plugins/table/images/table_delete_col.gif","$lang_table_delete_col_desc","mceTableDeleteCol");
b.addSeparator();
b.addItem(tinyMCE.baseURL+"/plugins/table/images/table_split_cells.gif","$lang_table_split_cells_desc","mceTableSplitCells","",(l=="1"&&j=="1"));
b.addItem(tinyMCE.baseURL+"/plugins/table/images/table_merge_cells.gif","$lang_table_merge_cells_desc","mceTableMergeCells","",false)
}break
}}else{if(d.hasPlugin("table")){b.addSeparator();
b.addItem(tinyMCE.baseURL+"/plugins/table/images/table.gif","$lang_table_desc","mceInsertTable","insert")
}}b.show(a,i)
},10);
tinyMCE.cancelEvent(f);
return false
},_hideContextMenu:function(){if(TinyMCE_ContextMenuPlugin._contextMenu){TinyMCE_ContextMenuPlugin._contextMenu.hide()
}},_commandHandler:function(d,c){var a=TinyMCE_ContextMenuPlugin._contextMenu;
a.hide();
var b=false;
if(d=="mceInsertTable"||d=="mceTableCellProps"||d=="mceTableRowProps"||d=="mceTableMergeCells"){b=true
}if(d=="Paste"){c=null
}if(tinyMCE.getParam("dialog_type")=="modal"&&tinyMCE.isMSIE){window.setTimeout(function(){a.inst.execCommand(d,b,c)
},100)
}else{a.inst.execCommand(d,b,c)
}}};
tinyMCE.addPlugin("contextmenu",TinyMCE_ContextMenuPlugin);
function TinyMCE_ContextMenu(b){function c(e,d){b[e]=typeof(b[e])!="undefined"?b[e]:d
}var a=this;
this.isMSIE=(navigator.appName=="Microsoft Internet Explorer");
this.contextMenuDiv=document.createElement("div");
this.contextMenuDiv.className="contextMenu";
this.contextMenuDiv.setAttribute("class","contextMenu");
this.contextMenuDiv.style.display="none";
this.contextMenuDiv.style.position="absolute";
this.contextMenuDiv.style.zindex=1000;
this.contextMenuDiv.style.left="0";
this.contextMenuDiv.style.top="0";
this.contextMenuDiv.unselectable="on";
document.body.appendChild(this.contextMenuDiv);
c("commandhandler","");
c("spacer_image","images/spacer.gif");
this.items=new Array();
this.settings=b;
this.html="";
if(tinyMCE.isMSIE&&!tinyMCE.isMSIE5_0&&!tinyMCE.isOpera){this.pop=window.createPopup();
doc=this.pop.document;
doc.open();
doc.write('<html><head><link href="'+tinyMCE.baseURL+'/plugins/contextmenu/css/contextmenu.css" rel="stylesheet" type="text/css" /></head><body unselectable="yes" class="contextMenuIEPopup"></body></html>');
doc.close()
}}TinyMCE_ContextMenu.prototype={clearAll:function(){this.html="";
this.contextMenuDiv.innerHTML=""
},addSeparator:function(){this.html+='<tr class="contextMenuItem"><td class="contextMenuIcon"><img src="'+this.settings.spacer_image+'" width="20" height="1" class="contextMenuImage" /></td><td><img class="contextMenuSeparator" width="1" height="1" src="'+this.settings.spacer_image+'" /></td></tr>'
},addItem:function(c,g,f,d,b){if(g.charAt(0)=="$"){g=tinyMCE.getLang(g.substring(1))
}var e="";
var a="";
if(tinyMCE.isMSIE&&!tinyMCE.isMSIE5_0){e="contextMenu.execCommand('"+f+"', '"+d+"');return false;"
}else{e=this.settings.commandhandler+"('"+f+"', '"+d+"');return false;"
}if(c==""){c=this.settings.spacer_image
}if(!b){a+='<tr class="contextMenuItem">'
}else{a+='<tr class="contextMenuItemDisabled">'
}a+='<td class="contextMenuIcon"><img src="'+c+'" width="20" height="20" class="contextMenuImage" /></td>';
a+='<td><div class="contextMenuText">';
a+='<a href="javascript:void(0);" onclick="'+e+'" onmousedown="return false;">&#160;';
a+=g;
a+="&#160;</a>";
a+="</div></td>";
a+="</tr>";
this.html+=a
},show:function(b,f){var c,e,a;
if(this.html==""){return
}var d="";
d+='<a href="#"></a><table border="0" cellpadding="0" cellspacing="0">';
d+=this.html;
d+="</table>";
this.contextMenuDiv.innerHTML=d;
this.contextMenuDiv.style.display="block";
e=this.contextMenuDiv.offsetWidth;
a=this.contextMenuDiv.offsetHeight;
this.contextMenuDiv.style.display="none";
if(tinyMCE.isMSIE&&!tinyMCE.isMSIE5_0&&!tinyMCE.isOpera){this.pop.document.body.innerHTML='<div class="contextMenu">'+d+"</div>";
this.pop.document.tinyMCE=tinyMCE;
this.pop.document.contextMenu=this;
this.pop.show(b,f,e,a)
}else{c=this.getViewPort();
this.contextMenuDiv.style.left=(b>c.width-e?c.width-e:b)+"px";
this.contextMenuDiv.style.top=(f>c.height-a?c.height-a:f)+"px";
this.contextMenuDiv.style.display="block"
}},getViewPort:function(){return{width:document.documentElement.offsetWidth||document.body.offsetWidth,height:self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}
},hide:function(){if(tinyMCE.isMSIE&&!tinyMCE.isMSIE5_0&&!tinyMCE.isOpera){this.pop.hide()
}else{this.contextMenuDiv.style.display="none"
}},execCommand:function(command,value){eval(this.settings.commandhandler+"(command, value);")
}};