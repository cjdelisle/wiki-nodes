var templates={"window.open":"window.open('${url}','${target}','${options}')"};
function preinit(){tinyMCE.setWindowArg("mce_windowresize",false);
var a=tinyMCE.getParam("external_link_list_url");
if(a!=null){if(a.charAt(0)!="/"&&a.indexOf("://")==-1){a=tinyMCE.documentBasePath+"/"+a
}document.write('<script language="javascript" type="text/javascript" src="'+a+'"><\/script>')
}}function changeClass(){var a=document.forms[0];
a.classes.value=getSelectValue(a,"classlist")
}function init(){tinyMCEPopup.resizeToInnerSize();
var a=document.forms[0];
var g=tinyMCE.getInstanceById(tinyMCE.getWindowArg("editor_id"));
var h=g.getFocusElement();
var f="insert";
var e;
document.getElementById("hrefbrowsercontainer").innerHTML=getBrowserHTML("hrefbrowser","href","file","advlink");
document.getElementById("popupurlbrowsercontainer").innerHTML=getBrowserHTML("popupurlbrowser","popupurl","file","advlink");
document.getElementById("linklisthrefcontainer").innerHTML=getLinkListHTML("linklisthref","href");
document.getElementById("anchorlistcontainer").innerHTML=getAnchorListHTML("anchorlist","href");
document.getElementById("targetlistcontainer").innerHTML=getTargetListHTML("targetlist","target");
e=getLinkListHTML("linklisthref","href");
if(e==""){document.getElementById("linklisthrefrow").style.display="none"
}else{document.getElementById("linklisthrefcontainer").innerHTML=e
}if(isVisible("hrefbrowser")){document.getElementById("href").style.width="260px"
}if(isVisible("popupurlbrowser")){document.getElementById("popupurl").style.width="180px"
}h=tinyMCE.getParentElement(h,"a");
if(h!=null&&h.nodeName=="A"){f="update"
}a.insert.value=tinyMCE.getLang("lang_"+f,"Insert",true);
setPopupControlsDisabled(true);
if(f=="update"){var b=tinyMCE.getAttrib(h,"href");
b=convertURL(b,h,true);
var d=tinyMCE.getAttrib(h,"mce_href");
if(d!=""){b=d;
if(tinyMCE.getParam("convert_urls")){b=convertURL(b,h,true)
}}var c=tinyMCE.cleanupEventStr(tinyMCE.getAttrib(h,"onclick"));
setFormValue("href",b);
setFormValue("title",tinyMCE.getAttrib(h,"title"));
setFormValue("id",tinyMCE.getAttrib(h,"id"));
setFormValue("style",tinyMCE.serializeStyle(tinyMCE.parseStyle(tinyMCE.getAttrib(h,"style"))));
setFormValue("rel",tinyMCE.getAttrib(h,"rel"));
setFormValue("rev",tinyMCE.getAttrib(h,"rev"));
setFormValue("charset",tinyMCE.getAttrib(h,"charset"));
setFormValue("hreflang",tinyMCE.getAttrib(h,"hreflang"));
setFormValue("dir",tinyMCE.getAttrib(h,"dir"));
setFormValue("lang",tinyMCE.getAttrib(h,"lang"));
setFormValue("tabindex",tinyMCE.getAttrib(h,"tabindex",typeof(h.tabindex)!="undefined"?h.tabindex:""));
setFormValue("accesskey",tinyMCE.getAttrib(h,"accesskey",typeof(h.accesskey)!="undefined"?h.accesskey:""));
setFormValue("type",tinyMCE.getAttrib(h,"type"));
setFormValue("onfocus",tinyMCE.cleanupEventStr(tinyMCE.getAttrib(h,"onfocus")));
setFormValue("onblur",tinyMCE.cleanupEventStr(tinyMCE.getAttrib(h,"onblur")));
setFormValue("onclick",c);
setFormValue("ondblclick",tinyMCE.cleanupEventStr(tinyMCE.getAttrib(h,"ondblclick")));
setFormValue("onmousedown",tinyMCE.cleanupEventStr(tinyMCE.getAttrib(h,"onmousedown")));
setFormValue("onmouseup",tinyMCE.cleanupEventStr(tinyMCE.getAttrib(h,"onmouseup")));
setFormValue("onmouseover",tinyMCE.cleanupEventStr(tinyMCE.getAttrib(h,"onmouseover")));
setFormValue("onmousemove",tinyMCE.cleanupEventStr(tinyMCE.getAttrib(h,"onmousemove")));
setFormValue("onmouseout",tinyMCE.cleanupEventStr(tinyMCE.getAttrib(h,"onmouseout")));
setFormValue("onkeypress",tinyMCE.cleanupEventStr(tinyMCE.getAttrib(h,"onkeypress")));
setFormValue("onkeydown",tinyMCE.cleanupEventStr(tinyMCE.getAttrib(h,"onkeydown")));
setFormValue("onkeyup",tinyMCE.cleanupEventStr(tinyMCE.getAttrib(h,"onkeyup")));
setFormValue("target",tinyMCE.getAttrib(h,"target"));
setFormValue("classes",tinyMCE.getAttrib(h,"class"));
if(c!=null&&c.indexOf("window.open")!=-1){parseWindowOpen(c)
}else{parseFunction(c)
}selectByValue(a,"dir",tinyMCE.getAttrib(h,"dir"));
selectByValue(a,"rel",tinyMCE.getAttrib(h,"rel"));
selectByValue(a,"rev",tinyMCE.getAttrib(h,"rev"));
selectByValue(a,"linklisthref",b);
if(b.charAt(0)=="#"){selectByValue(a,"anchorlist",b)
}addClassesToList("classlist","advlink_styles");
selectByValue(a,"classlist",tinyMCE.getAttrib(h,"class"),true);
selectByValue(a,"targetlist",tinyMCE.getAttrib(h,"target"),true)
}else{addClassesToList("classlist","advlink_styles")
}window.focus()
}function setFormValue(a,b){document.forms[0].elements[a].value=b
}function convertURL(url,node,on_save){return eval("tinyMCEPopup.windowOpener."+tinyMCE.settings.urlconverter_callback+"(url, node, on_save);")
}function parseWindowOpen(c){var a=document.forms[0];
if(c.indexOf("return false;")!=-1){a.popupreturn.checked=true;
c=c.replace("return false;","")
}else{a.popupreturn.checked=false
}var e=parseLink(c);
if(e!=null){a.ispopup.checked=true;
setPopupControlsDisabled(false);
var d=parseOptions(e.options);
var b=e.url;
if(tinyMCE.getParam("convert_urls")){b=convertURL(b,null,true)
}a.popupname.value=e.target;
a.popupurl.value=b;
a.popupwidth.value=getOption(d,"width");
a.popupheight.value=getOption(d,"height");
a.popupleft.value=getOption(d,"left");
a.popuptop.value=getOption(d,"top");
if(a.popupleft.value.indexOf("screen")!=-1){a.popupleft.value="c"
}if(a.popuptop.value.indexOf("screen")!=-1){a.popuptop.value="c"
}a.popuplocation.checked=getOption(d,"location")=="yes";
a.popupscrollbars.checked=getOption(d,"scrollbars")=="yes";
a.popupmenubar.checked=getOption(d,"menubar")=="yes";
a.popupresizable.checked=getOption(d,"resizable")=="yes";
a.popuptoolbar.checked=getOption(d,"toolbar")=="yes";
a.popupstatus.checked=getOption(d,"status")=="yes";
a.popupdependent.checked=getOption(d,"dependent")=="yes";
buildOnClick()
}}function parseFunction(b){var a=document.forms[0];
var c=parseLink(b)
}function getOption(b,a){return typeof(b[a])=="undefined"?"":b[a]
}function setPopupControlsDisabled(b){var a=document.forms[0];
a.popupname.disabled=b;
a.popupurl.disabled=b;
a.popupwidth.disabled=b;
a.popupheight.disabled=b;
a.popupleft.disabled=b;
a.popuptop.disabled=b;
a.popuplocation.disabled=b;
a.popupscrollbars.disabled=b;
a.popupmenubar.disabled=b;
a.popupresizable.disabled=b;
a.popuptoolbar.disabled=b;
a.popupstatus.disabled=b;
a.popupreturn.disabled=b;
a.popupdependent.disabled=b;
setBrowserDisabled("popupurlbrowser",b)
}function parseLink(f){f=f.replace(new RegExp("&#39;","g"),"'");
var a=f.replace(new RegExp("\\s*([A-Za-z0-9.]*)\\s*\\(.*","gi"),"$1");
var h=templates[a];
if(h){var g=h.match(new RegExp("'?\\$\\{[A-Za-z0-9.]*\\}'?","gi"));
var e="\\s*[A-Za-z0-9.]*\\s*\\(";
var d="";
for(var c=0;
c<g.length;
c++){if(g[c].indexOf("'${")!=-1){e+="'(.*)'"
}else{e+="([0-9]*)"
}d+="$"+(c+1);
g[c]=g[c].replace(new RegExp("[^A-Za-z0-9]","gi"),"");
if(c!=g.length-1){e+="\\s*,\\s*";
d+="<delim>"
}else{e+=".*"
}}e+="\\);?";
var j=new Array();
j._function=a;
var b=f.replace(new RegExp(e,"gi"),d).split("<delim>");
for(var c=0;
c<g.length;
c++){j[g[c]]=b[c]
}return j
}return null
}function parseOptions(c){if(c==null||c==""){return new Array()
}c=c.toLowerCase();
c=c.replace(/;/g,",");
c=c.replace(/[^0-9a-z=,]/g,"");
var e=c.split(",");
var a=new Array();
for(var b=0;
b<e.length;
b++){var d=e[b].split("=");
if(d.length==2){a[d[0]]=d[1]
}}return a
}function buildOnClick(){var a=document.forms[0];
if(!a.ispopup.checked){a.onclick.value="";
return
}var c="window.open('";
var b=a.popupurl.value;
if(tinyMCE.getParam("convert_urls")){b=convertURL(b,null,true)
}c+=b+"','";
c+=a.popupname.value+"','";
if(a.popuplocation.checked){c+="location=yes,"
}if(a.popupscrollbars.checked){c+="scrollbars=yes,"
}if(a.popupmenubar.checked){c+="menubar=yes,"
}if(a.popupresizable.checked){c+="resizable=yes,"
}if(a.popuptoolbar.checked){c+="toolbar=yes,"
}if(a.popupstatus.checked){c+="status=yes,"
}if(a.popupdependent.checked){c+="dependent=yes,"
}if(a.popupwidth.value!=""){c+="width="+a.popupwidth.value+","
}if(a.popupheight.value!=""){c+="height="+a.popupheight.value+","
}if(a.popupleft.value!=""){if(a.popupleft.value!="c"){c+="left="+a.popupleft.value+","
}else{c+="left='+(screen.availWidth/2-"+(a.popupwidth.value/2)+")+',"
}}if(a.popuptop.value!=""){if(a.popuptop.value!="c"){c+="top="+a.popuptop.value+","
}else{c+="top='+(screen.availHeight/2-"+(a.popupheight.value/2)+")+',"
}}if(c.charAt(c.length-1)==","){c=c.substring(0,c.length-1)
}c+="');";
if(a.popupreturn.checked){c+="return false;"
}a.onclick.value=c;
if(a.href.value==""){a.href.value=b
}}function setAttrib(elm,attrib,value){var formObj=document.forms[0];
var valueElm=formObj.elements[attrib.toLowerCase()];
if(typeof(value)=="undefined"||value==null){value="";
if(valueElm){value=valueElm.value
}}if(value!=""){elm.setAttribute(attrib.toLowerCase(),value);
if(attrib=="style"){attrib="style.cssText"
}if(attrib.substring(0,2)=="on"){value="return true;"+value
}if(attrib=="class"){attrib="className"
}eval("elm."+attrib+"=value;")
}else{elm.removeAttribute(attrib)
}}function getAnchorListHTML(f,e){var d=tinyMCE.getInstanceById(tinyMCE.getWindowArg("editor_id"));
var a=d.getBody().getElementsByTagName("a");
var c="";
c+='<select id="'+f+'" name="'+f+'" class="mceAnchorList" onfocus="tinyMCE.addSelectAccessibility(event, this, window);" onchange="this.form.'+e+".value=";
c+='this.options[this.selectedIndex].value;">';
c+='<option value="">---</option>';
for(var b=0;
b<a.length;
b++){if((name=tinyMCE.getAttrib(a[b],"name"))!=""){c+='<option value="#'+name+'">'+name+"</option>"
}}c+="</select>";
return c
}function insertAction(){var f=tinyMCE.getInstanceById(tinyMCE.getWindowArg("editor_id"));
var g=f.getFocusElement();
g=tinyMCE.getParentElement(g,"a");
tinyMCEPopup.execCommand("mceBeginUndoLevel");
if(g==null){if(tinyMCE.isSafari){tinyMCEPopup.execCommand("mceInsertContent",false,'<a href="#mce_temp_url#">'+f.selection.getSelectedHTML()+"</a>")
}else{tinyMCEPopup.execCommand("createlink",false,"#mce_temp_url#")
}var b=tinyMCE.getElementsByAttributeValue(f.getBody(),"a","href","#mce_temp_url#");
for(var c=0;
c<b.length;
c++){var g=b[c];
if(tinyMCE.isGecko){var e=f.getDoc().createTextNode(" ");
if(g.nextSibling){g.parentNode.insertBefore(e,g.nextSibling)
}else{g.parentNode.appendChild(e)
}var a=f.getDoc().createRange();
a.setStartAfter(g);
a.setEndAfter(g);
var d=f.getSel();
d.removeAllRanges();
d.addRange(a)
}setAllAttribs(g)
}}else{setAllAttribs(g)
}tinyMCE._setEventsEnabled(f.getBody(),false);
tinyMCEPopup.execCommand("mceEndUndoLevel");
tinyMCEPopup.close()
}function setAllAttribs(d){var a=document.forms[0];
var b=a.href.value;
var c=getSelectValue(a,"targetlist");
if(b.charAt(0)=="#"&&tinyMCE.getParam("convert_urls")){b=tinyMCE.settings.document_base_url+b
}setAttrib(d,"href",convertURL(b,d));
setAttrib(d,"mce_href",b);
setAttrib(d,"title");
setAttrib(d,"target",c=="_self"?"":c);
setAttrib(d,"id");
setAttrib(d,"style");
setAttrib(d,"class",getSelectValue(a,"classlist"));
setAttrib(d,"rel");
setAttrib(d,"rev");
setAttrib(d,"charset");
setAttrib(d,"hreflang");
setAttrib(d,"dir");
setAttrib(d,"lang");
setAttrib(d,"tabindex");
setAttrib(d,"accesskey");
setAttrib(d,"type");
setAttrib(d,"onfocus");
setAttrib(d,"onblur");
setAttrib(d,"onclick");
setAttrib(d,"ondblclick");
setAttrib(d,"onmousedown");
setAttrib(d,"onmouseup");
setAttrib(d,"onmouseover");
setAttrib(d,"onmousemove");
setAttrib(d,"onmouseout");
setAttrib(d,"onkeypress");
setAttrib(d,"onkeydown");
setAttrib(d,"onkeyup");
if(tinyMCE.isMSIE5){d.outerHTML=d.outerHTML
}}function getSelectValue(a,b){var c=a.elements[b];
if(c==null||c.options==null){return""
}return c.options[c.selectedIndex].value
}function getLinkListHTML(d,c,e){if(typeof(tinyMCELinkList)=="undefined"||tinyMCELinkList.length==0){return""
}var b="";
b+='<select id="'+d+'" name="'+d+'"';
b+=' class="mceLinkList" onfocus="tinyMCE.addSelectAccessibility(event, this, window);" onchange="this.form.'+c+".value=";
b+="this.options[this.selectedIndex].value;";
if(typeof(e)!="undefined"){b+=e+"('"+c+"',this.options[this.selectedIndex].text,this.options[this.selectedIndex].value);"
}b+='"><option value="">---</option>';
for(var a=0;
a<tinyMCELinkList.length;
a++){b+='<option value="'+tinyMCELinkList[a][1]+'">'+tinyMCELinkList[a][0]+"</option>"
}b+="</select>";
return b
}function getTargetListHTML(f,e){var a=tinyMCE.getParam("theme_advanced_link_targets","").split(";");
var d="";
d+='<select id="'+f+'" name="'+f+'" onfocus="tinyMCE.addSelectAccessibility(event, this, window);" onchange="this.form.'+e+".value=";
d+='this.options[this.selectedIndex].value;">';
d+='<option value="_self">'+tinyMCE.getLang("lang_advlink_target_same")+"</option>";
d+='<option value="_blank">'+tinyMCE.getLang("lang_advlink_target_blank")+" (_blank)</option>";
d+='<option value="_parent">'+tinyMCE.getLang("lang_advlink_target_parent")+" (_parent)</option>";
d+='<option value="_top">'+tinyMCE.getLang("lang_advlink_target_top")+" (_top)</option>";
for(var c=0;
c<a.length;
c++){var b,g;
if(a[c]==""){continue
}b=a[c].split("=")[0];
g=a[c].split("=")[1];
d+='<option value="'+b+'">'+g+" ("+b+")</option>"
}d+="</select>";
return d
}preinit();