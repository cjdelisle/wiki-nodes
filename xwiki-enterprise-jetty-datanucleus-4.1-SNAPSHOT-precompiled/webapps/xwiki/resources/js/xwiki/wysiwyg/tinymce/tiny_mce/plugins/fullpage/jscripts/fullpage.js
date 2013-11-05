var defaultDocTypes='XHTML 1.0 Transitional=<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">,XHTML 1.0 Frameset=<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">,XHTML 1.0 Strict=<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">,XHTML 1.1=<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">">,HTML 4.01 Transitional=<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">,HTML 4.01 Strict=<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">,HTML 4.01 Frameset=<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">';
var defaultEncodings="Western european (iso-8859-1)=iso-8859-1,Central European (iso-8859-2)=iso-8859-2,Unicode (UTF-8)=utf-8,Chinese traditional (Big5)=big5,Cyrillic (iso-8859-5)=iso-8859-5,Japanese (iso-2022-jp)=iso-2022-jp,Greek (iso-8859-7)=iso-8859-7,Korean (iso-2022-kr)=iso-2022-kr,ASCII (us-ascii)=us-ascii";
var defaultMediaTypes="all=all,screen=screen,print=print,tty=tty,tv=tv,projection=projection,handheld=handheld,braille=braille,aural=aural";
var defaultFontNames="Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;Georgia=georgia,times new roman,times,serif;Tahoma=tahoma,arial,helvetica,sans-serif;Times New Roman=times new roman,times,serif;Verdana=verdana,arial,helvetica,sans-serif;Impact=impact;WingDings=wingdings";
var defaultFontSizes="10px,11px,12px,13px,14px,15px,16px";
var addMenuLayer=new MCLayer("addmenu");
var lastElementType=null;
var topDoc;
function init(){var h=document.forms.fullpage;
var d,a,b,j,g,k;
var e=tinyMCE.getInstanceById(tinyMCE.getWindowArg("editor_id"));
b=tinyMCE.getParam("fullpage_doctypes",defaultDocTypes).split(",");
for(d=0;
d<b.length;
d++){a=b[d].split("=");
if(a.length>1){addSelectValue(h,"doctypes",a[0],a[1])
}}k=tinyMCE.getParam("fullpage_fonts",defaultFontNames).split(";");
for(d=0;
d<k.length;
d++){a=k[d].split("=");
if(a.length>1){addSelectValue(h,"fontface",a[0],a[1])
}}k=tinyMCE.getParam("fullpage_fontsizes",defaultFontSizes).split(",");
for(d=0;
d<k.length;
d++){addSelectValue(h,"fontsize",k[d],k[d])
}g=tinyMCE.getParam("fullpage_media_types",defaultMediaTypes).split(",");
for(d=0;
d<g.length;
d++){a=g[d].split("=");
if(a.length>1){addSelectValue(h,"element_style_media",a[0],a[1]);
addSelectValue(h,"element_link_media",a[0],a[1])
}}j=tinyMCE.getParam("fullpage_encodings",defaultEncodings).split(",");
for(d=0;
d<j.length;
d++){a=j[d].split("=");
if(a.length>1){addSelectValue(h,"docencoding",a[0],a[1]);
addSelectValue(h,"element_script_charset",a[0],a[1]);
addSelectValue(h,"element_link_charset",a[0],a[1])
}}document.getElementById("bgcolor_pickcontainer").innerHTML=getColorPickerHTML("bgcolor_pick","bgcolor");
document.getElementById("link_color_pickcontainer").innerHTML=getColorPickerHTML("link_color_pick","link_color");
document.getElementById("visited_color_pickcontainer").innerHTML=getColorPickerHTML("visited_color_pick","visited_color");
document.getElementById("active_color_pickcontainer").innerHTML=getColorPickerHTML("active_color_pick","active_color");
document.getElementById("textcolor_pickcontainer").innerHTML=getColorPickerHTML("textcolor_pick","textcolor");
document.getElementById("stylesheet_browsercontainer").innerHTML=getBrowserHTML("stylesheetbrowser","stylesheet","file","fullpage");
document.getElementById("link_href_pickcontainer").innerHTML=getBrowserHTML("link_href_browser","element_link_href","file","fullpage");
document.getElementById("script_src_pickcontainer").innerHTML=getBrowserHTML("script_src_browser","element_script_src","file","fullpage");
document.getElementById("bgimage_pickcontainer").innerHTML=getBrowserHTML("bgimage_browser","bgimage","image","fullpage");
if(isVisible("stylesheetbrowser")){document.getElementById("stylesheet").style.width="220px"
}if(isVisible("link_href_browser")){document.getElementById("element_link_href").style.width="230px"
}if(isVisible("bgimage_browser")){document.getElementById("bgimage").style.width="210px"
}var c=document.createElement("iframe");
c.id="tempFrame";
c.style.display="none";
c.src=tinyMCE.baseURL+"/plugins/fullpage/blank.htm";
document.body.appendChild(c);
tinyMCEPopup.resizeToInnerSize()
}function setupIframe(r){var h=tinyMCE.getInstanceById(tinyMCE.getWindowArg("editor_id"));
var j=h.fullpageTopContent;
var k=document.forms[0];
var o,m,n;
var c,g,p,b,q,e,d;
j=j.replace(/<script>/gi,'<script type="text/javascript">');
j=j.replace(/\ssrc=/gi," mce_src=");
j=j.replace(/\shref=/gi," mce_href=");
j=j.replace(/\stype=/gi," mce_type=");
j=j.replace(/<script/gi,'<script type="text/unknown" ');
j+="</body></html>";
topDoc=r;
r.open();
r.write(j);
r.close();
o=getReItem(/<\?\s*?xml.*?version\s*?=\s*?"(.*?)".*?\?>/gi,j,1);
m=getReItem(/<\?\s*?xml.*?encoding\s*?=\s*?"(.*?)".*?\?>/gi,j,1);
n=getReItem(/<\!DOCTYPE.*?>/gi,j,0);
k.langcode.value=getReItem(/lang="(.*?)"/gi,j,1);
k.metatitle.value=tinyMCE.entityDecode(getReItem(/<title>(.*?)<\/title>/gi,j,1));
c=r.getElementsByTagName("meta");
for(g=0;
g<c.length;
g++){b=tinyMCE.getAttrib(c[g],"name");
q=tinyMCE.getAttrib(c[g],"content");
httpEquiv=tinyMCE.getAttrib(c[g],"httpEquiv");
switch(b.toLowerCase()){case"keywords":k.metakeywords.value=q;
break;
case"description":k.metadescription.value=q;
break;
case"author":k.metaauthor.value=q;
break;
case"copyright":k.metacopyright.value=q;
break;
case"robots":selectByValue(k,"metarobots",q,true,true);
break
}switch(httpEquiv.toLowerCase()){case"content-type":e=getReItem(/charset\s*=\s*(.*)\s*/gi,q,1);
if(e!=""){m=e
}break
}}selectByValue(k,"doctypes",n,true,true);
selectByValue(k,"docencoding",m,true,true);
selectByValue(k,"langdir",tinyMCE.getAttrib(r.body,"dir"),true,true);
if(o!=""){k.xml_pi.checked=true
}c=r.getElementsByTagName("link");
for(g=0;
g<c.length;
g++){d=c[g];
e=tinyMCE.getAttrib(d,"media");
if(tinyMCE.getAttrib(d,"mce_type")=="text/css"&&(e==""||e=="screen"||e=="all")&&tinyMCE.getAttrib(d,"rel")=="stylesheet"){k.stylesheet.value=tinyMCE.getAttrib(d,"mce_href");
break
}}c=r.getElementsByTagName("style");
for(g=0;
g<c.length;
g++){e=parseStyleElement(c[g]);
for(p=0;
p<e.length;
p++){if(e[p].rule.indexOf("a:visited")!=-1&&e[p].data.color){k.visited_color.value=e[p].data.color
}if(e[p].rule.indexOf("a:link")!=-1&&e[p].data.color){k.link_color.value=e[p].data.color
}if(e[p].rule.indexOf("a:active")!=-1&&e[p].data.color){k.active_color.value=e[p].data.color
}}}k.textcolor.value=convertRGBToHex(tinyMCE.getAttrib(r.body,"text"));
k.active_color.value=convertRGBToHex(tinyMCE.getAttrib(r.body,"alink"));
k.link_color.value=convertRGBToHex(tinyMCE.getAttrib(r.body,"link"));
k.visited_color.value=convertRGBToHex(tinyMCE.getAttrib(r.body,"vlink"));
k.bgcolor.value=convertRGBToHex(tinyMCE.getAttrib(r.body,"bgcolor"));
k.bgimage.value=convertRGBToHex(tinyMCE.getAttrib(r.body,"background"));
var a=tinyMCE.parseStyle(tinyMCE.getAttrib(r.body,"style"));
if(a["font-family"]){selectByValue(k,"fontface",a["font-family"],true,true)
}else{selectByValue(k,"fontface",tinyMCE.getParam("fullpage_default_fontface",""),true,true)
}if(a["font-size"]){selectByValue(k,"fontsize",a["font-size"],true,true)
}else{selectByValue(k,"fontsize",tinyMCE.getParam("fullpage_default_fontsize",""),true,true)
}if(a.color){k.textcolor.value=convertRGBToHex(a.color)
}if(a["background-image"]){k.bgimage.value=a["background-image"].replace(new RegExp("url\\('?([^']*)'?\\)","gi"),"$1")
}if(a["background-color"]){k.bgcolor.value=convertRGBToHex(a["background-color"])
}if(a.margin){e=a.margin.replace(/[^0-9 ]/g,"");
e=e.split(/ +/);
k.topmargin.value=e.length>0?e[0]:"";
k.rightmargin.value=e.length>1?e[1]:e[0];
k.bottommargin.value=e.length>2?e[2]:e[0];
k.leftmargin.value=e.length>3?e[3]:e[0]
}if(a["margin-left"]){k.leftmargin.value=a["margin-left"].replace(/[^0-9]/g,"")
}if(a["margin-right"]){k.rightmargin.value=a["margin-right"].replace(/[^0-9]/g,"")
}if(a["margin-top"]){k.topmargin.value=a["margin-top"].replace(/[^0-9]/g,"")
}if(a["margin-bottom"]){k.bottommargin.value=a["margin-bottom"].replace(/[^0-9]/g,"")
}k.style.value=tinyMCE.serializeStyle(a);
updateColor("textcolor_pick","textcolor");
updateColor("bgcolor_pick","bgcolor");
updateColor("visited_color_pick","visited_color");
updateColor("active_color_pick","active_color");
updateColor("link_color_pick","link_color")
}function updateAction(){var j=tinyMCE.getInstanceById(tinyMCE.getWindowArg("editor_id"));
var m=document.forms[0];
var a,e,k,o,p,n,g,b,d,c=true;
n=topDoc.getElementsByTagName("head")[0];
a=topDoc.getElementsByTagName("script");
for(e=0;
e<a.length;
e++){if(tinyMCE.getAttrib(a[e],"mce_type")==""){a[e].setAttribute("mce_type","text/javascript")
}}a=topDoc.getElementsByTagName("link");
for(e=0;
e<a.length;
e++){b=a[e];
d=tinyMCE.getAttrib(b,"media");
if(tinyMCE.getAttrib(b,"mce_type")=="text/css"&&(d==""||d=="screen"||d=="all")&&tinyMCE.getAttrib(b,"rel")=="stylesheet"){c=false;
if(m.stylesheet.value==""){b.parentNode.removeChild(b)
}else{b.setAttribute("mce_href",m.stylesheet.value)
}break
}}if(m.stylesheet.value!=""){b=topDoc.createElement("link");
b.setAttribute("mce_type","text/css");
b.setAttribute("mce_href",m.stylesheet.value);
b.setAttribute("rel","stylesheet");
n.appendChild(b)
}setMeta(n,"keywords",m.metakeywords.value);
setMeta(n,"description",m.metadescription.value);
setMeta(n,"author",m.metaauthor.value);
setMeta(n,"copyright",m.metacopyright.value);
setMeta(n,"robots",getSelectValue(m,"metarobots"));
setMeta(n,"Content-Type",getSelectValue(m,"docencoding"));
topDoc.body.dir=getSelectValue(m,"langdir");
topDoc.body.style.cssText=m.style.value;
topDoc.body.setAttribute("vLink",m.visited_color.value);
topDoc.body.setAttribute("link",m.link_color.value);
topDoc.body.setAttribute("text",m.textcolor.value);
topDoc.body.setAttribute("aLink",m.active_color.value);
topDoc.body.style.fontFamily=getSelectValue(m,"fontface");
topDoc.body.style.fontSize=getSelectValue(m,"fontsize");
topDoc.body.style.backgroundColor=m.bgcolor.value;
if(m.leftmargin.value!=""){topDoc.body.style.marginLeft=m.leftmargin.value+"px"
}if(m.rightmargin.value!=""){topDoc.body.style.marginRight=m.rightmargin.value+"px"
}if(m.bottommargin.value!=""){topDoc.body.style.marginBottom=m.bottommargin.value+"px"
}if(m.topmargin.value!=""){topDoc.body.style.marginTop=m.topmargin.value+"px"
}g=topDoc.getElementsByTagName("html")[0];
g.setAttribute("lang",m.langcode.value);
g.setAttribute("xml:lang",m.langcode.value);
if(m.bgimage.value!=""){topDoc.body.style.backgroundImage="url('"+m.bgimage.value+"')"
}else{topDoc.body.style.backgroundImage=""
}j.cleanup.addRuleStr("-title,meta[http-equiv|name|content],base[href|target],link[href|rel|type|title|media],style[type],script[type|language|src],html[lang|xml:lang|xmlns],body[style|dir|vlink|link|text|alink],head");
k=j.cleanup.serializeNodeAsHTML(topDoc.documentElement);
k=k.substring(0,k.lastIndexOf("</body>"));
if(k.indexOf("<title>")==-1){k=k.replace(/<head.*?>/,"$&\n<title>"+j.cleanup.xmlEncode(m.metatitle.value)+"</title>")
}else{k=k.replace(/<title>(.*?)<\/title>/,"<title>"+j.cleanup.xmlEncode(m.metatitle.value)+"</title>")
}if((o=getSelectValue(m,"doctypes"))!=""){k=o+"\n"+k
}if(m.xml_pi.checked){p='<?xml version="1.0"';
if((o=getSelectValue(m,"docencoding"))!=""){p+=' encoding="'+o+'"'
}p+="?>\n";
k=p+k
}j.fullpageTopContent=k;
tinyMCEPopup.execCommand("mceFullPageUpdate",false,"");
tinyMCEPopup.close()
}function setMeta(f,d,c){var b,e,a;
b=f.getElementsByTagName("meta");
for(e=0;
e<b.length;
e++){if(d=="Content-Type"&&tinyMCE.getAttrib(b[e],"http-equiv")==d){if(c==""){b[e].parentNode.removeChild(b[e])
}else{b[e].setAttribute("content","text/html; charset="+c)
}return
}if(tinyMCE.getAttrib(b[e],"name")==d){if(c==""){b[e].parentNode.removeChild(b[e])
}else{b[e].setAttribute("content",c)
}return
}}if(c==""){return
}a=topDoc.createElement("meta");
if(d=="Content-Type"){a.httpEquiv=d
}else{a.setAttribute("name",d)
}a.setAttribute("content",c);
f.appendChild(a)
}function parseStyleElement(f){var a=f.innerHTML;
var d,b,c;
a=a.replace(/<!--/gi,"");
a=a.replace(/-->/gi,"");
a=a.replace(/[\n\r]/gi,"");
a=a.replace(/\s+/gi," ");
c=new Array();
d=a.split(/{|}/);
for(b=0;
b<d.length;
b+=2){if(d[b]!=""){c[c.length]={rule:tinyMCE.trim(d[b]),data:tinyMCE.parseStyle(d[b+1])}
}}return c
}function serializeStyleElement(e){var b,c,a;
c="<!--\n";
for(b=0;
b<e.length;
b++){c+=e[b].rule+" {\n";
a=tinyMCE.serializeStyle(e[b].data);
if(a!=""){a+=";"
}c+=a.replace(/;/g,";\n");
c+="}\n";
if(b!=e.length-1){c+="\n"
}}c+="\n-->";
return c
}function getReItem(d,b,a){var e=d.exec(b);
if(e&&e.length>a){return e[a]
}return""
}function changedStyleField(a){}function showAddMenu(){var a=document.getElementById("addbutton");
addMenuLayer.moveRelativeTo(a,"tr");
if(addMenuLayer.isMSIE){addMenuLayer.moveBy(2,0)
}addMenuLayer.show();
addMenuLayer.setAutoHide(true,hideAddMenu);
addMenuLayer.addCSSClass(a,"selected")
}function hideAddMenu(a,d,f,c){var b=document.getElementById("addbutton");
addMenuLayer.removeCSSClass(b,"selected")
}function addHeadElm(c){var a=document.getElementById("headlist");
var b=document.getElementById("addbutton");
var d=document.getElementById(c+"_element");
if(lastElementType){lastElementType.style.display="none"
}d.style.display="block";
lastElementType=d;
addMenuLayer.hide();
addMenuLayer.removeCSSClass(b,"selected");
document.getElementById(c+"_updateelement").value=tinyMCE.getLang("lang_insert","Insert",true);
a.size=10
}function updateHeadElm(d){var c=d.substring(0,d.indexOf("_"));
var a=document.getElementById("headlist");
var b=document.getElementById("addbutton");
var e=document.getElementById(c+"_element");
if(lastElementType){lastElementType.style.display="none"
}e.style.display="block";
lastElementType=e;
addMenuLayer.hide();
addMenuLayer.removeCSSClass(b,"selected");
document.getElementById(c+"_updateelement").value=tinyMCE.getLang("lang_update","Update",true);
a.size=10
}function cancelElementUpdate(){var a=document.getElementById("headlist");
if(lastElementType){lastElementType.style.display="none"
}a.size=26
};