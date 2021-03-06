WikiEditor.prototype.initAttachmentsPlugin=function(){if(!this.isPluginLoaded("core")){alert("Attachment Plugin: You must load the core syntax plugin before!");
return
}this.addExternalProcessorBefore("convertTableExternal",(/{\s*image\s*:\s*(.*?)(\|(.*?))?(\|(.*?))?(\|(.*?))?(\|(.*?))?}/i),"convertImageExternal");
this.addInternalProcessorBefore("convertStyleInternal",(/(<div\s*class=\"img(.*?)\"\s*>\s*)?<img\s*([^>]*)(class=\"wikiimage\")\s*([^>]*)\/>(<\/div>)?/i),"convertImageInternal");
this.addExternalProcessorBefore("convertTableExternal",(/{\s*attach\s*:\s*(.*?)(\|(.*?))?}/i),"convertAttachmentExternal");
this.addInternalProcessorBefore("convertLinkInternal",(/<a\s*href=\"wikiattachment:-:(.*?)\"\s*([^>]*)>(.*?)<\/a>/i),"convertAttachmentInternal");
this.addToolbarHandler("handleAttachmentsButtons")
};
wikiEditor.initAttachmentsPlugin();
WikiEditor.prototype.ATTACHMENT_CLASS_NAME="";
WikiEditor.prototype.insertAttachment=function(d,c,a){var b=((c!=null)&&this.trimString(c)!="")?c:a;
this.core.execInstanceCommand(d,"mceInsertRawHTML",false,'<a href="wikiattachment:-:'+encodeURIComponent(a)+'" class="'+this.ATTACHMENT_CLASS_NAME+'">'+b.escapeHTML()+"</a>")
};
WikiEditor.prototype.convertImageInternal=function(i,o,h){var j="";
var b;
var f="";
var d=this.trimString(o[3]+" "+o[5]);
var k=this.readAttributes(d);
if(o[2]&&this.trimString(o[2])!=""){f=this.trimString(o[2])
}if(k&&(b=k.src)!=null){b=this.trimString(b);
var m=tinyMCE.getParam("wiki_images_path").toString();
b=m.substring(0,m.indexOf("/",2))+"/"+XWiki.servletpath+b.substring(b.indexOf("/",3)+1);
var l=new RegExp(this.getImagePath().replace(/\+/g,"\\+")+"(.*)","i");
var a=l.exec(b);
if(a){var e=decodeURIComponent(a[1]);
j="{image:"+e;
var c=k.width?this.trimString(k.width):"";
var n=k.height?this.trimString(k.height):"";
var g=k.align?this.trimString(k.align):"";
if(c!=""||n!=""||g!=""||f!=""){j+="|"+(n?n:" ")+"|"+(c?c:" ");
if(f&&f!=""){j+="|"+(g?g:" ")+"|"+(f?f:"")
}else{if(g!=""){j+="|"+(g?g:"")
}}}j+="}"
}}return h.replace(i,j)
};
WikiEditor.prototype.IMAGE_CLASS_NAME="wikiimage";
WikiEditor.prototype.convertImageExternal=function(f,b,d){var c,a,h;
var e;
this.trimString(b[9]);
var g="";
if(b[9]){e=this.trimString(b[9])
}else{e=""
}if(e!=""){g+='<div class="img'+e+'">'
}g+='<img id="'+b[1]+'" class="'+this.IMAGE_CLASS_NAME+'" src="'+escape(this.getImagePath()+b[1])+'" ';
if(b[5]&&(c=this.trimString(b[5]))!=""){g+='width="'+c+'" '
}if(b[3]&&(a=this.trimString(b[3]))!=""){g+='height="'+a+'" '
}if(b[7]&&(h=this.trimString(b[7]))!=""){g+='align="'+h+'" '
}if(e!=""){g+='halign="'+e+'" '
}g+="/>";
if(e!=""){g+="</div>"
}return d.replace(f,g)
};
WikiEditor.prototype.handleAttachmentsButtons=function(f,d,e,c,a,b){tinyMCE.switchClass(f+"_image","mceButtonNormal");
do{switch(d.nodeName.toLowerCase()){case"img":tinyMCE.switchClass(f+"_image","mceButtonSelected");
break
}}while((d=d.parentNode))
};
WikiEditor.prototype.getAttachmentsToolbar=function(){return this.getAttachmentsControls("image")+this.getAttachmentsControls("attachment")
};
WikiEditor.prototype.getAttachmentsControls=function(a){var b="";
switch(a){case"image":b=this.createButtonHTML("image","image.gif","lang_image_desc","mceImage",true);
break;
case"attachment":b=this.createButtonHTML("attachment","attachment.gif","lang_attachment_desc","wikiAttachment",true);
break
}return b
};
WikiEditor.prototype.convertAttachmentExternal=function(d,a,c){var b=((typeof(a[3])=="undefined")||(this.trimString(a[3])==""))?a[1]:a[3];
var e='<a href="wikiattachment:-:'+b+'" class="'+this.ATTACHMENT_CLASS_NAME+'">'+a[1].escapeHTML()+"</a>";
return c.replace(d,e)
};
WikiEditor.prototype.convertAttachmentInternal=function(c,a,b){a[1]=decodeURIComponent(a[1].replace(/%20/gi," "));
a[3]=a[3].replace(/%20/gi," ").unescapeHTML();
var d;
if(a[1]==a[3]){d="{attach:"+a[1]+"}"
}else{if((a[1]=="undefined")||(this.trimString(a[1])=="")){d="{attach:"+a[3]+"}"
}else{d="{attach:"+a[3]+"|"+a[1]+"}"
}}return b.replace(c,d)
};