var XWiki=(function(c){if(!c.actionButtons||!c.actionButtons.AjaxSaveAndContinue){if(console&&console.warn){console.warn("[Autosave feature] Required class missing: XWiki.actionButtons.AjaxSaveAndContinue")
}}else{var a=c.editors=c.editors||{};
a.AutoSave=Class.create({enabled:false,frequency:5,disabledOpacity:0.2,initialize:function(){if(!(this.form=$("xwikieditcontent"))||!(this.form=this.form.up("form"))){return
}this.initVersionMetadataElements();
this.createUIElements();
this.addListeners();
if(this.enabled){this.startTimer()
}},initVersionMetadataElements:function(){var d=new Element("div",{"class":"hidden"});
this.editComment=this.form.comment;
if(!this.editComment){this.editComment=new Element("input",{type:"hidden",name:"comment"});
this.customMetadataElementsContainer=d;
d.insert(this.editComment)
}this.minorEditCheckbox=this.form.minorEdit;
if(!this.minorEditCheckbox){this.minorEditCheckbox=new Element("input",{type:"checkbox",name:"minorEdit",checked:true});
this.customMetadataElementsContainer=d;
d.insert(this.minorEditCheckbox)
}},createUIElements:function(){this.autosaveCheckbox=new Element("input",{type:"checkbox",checked:this.enabled,name:"doAutosave",id:"doAutosave"});
this.autosaveInput=new Element("input",{type:"text",value:this.frequency,size:"2","class":"autosave-frequency"});
var e=new Element("label",{"class":"autosave","for":"doAutosave"});
e.appendChild(this.autosaveCheckbox);
e.appendChild(document.createTextNode(" Autosave"));
var f=new Element("label",{"class":"frequency"});
f.appendChild(document.createTextNode("every "));
f.appendChild(this.autosaveInput);
this.timeUnit=new Element("span");
this.setTimeUnit();
f.appendChild(document.createTextNode(" "));
f.appendChild(this.timeUnit);
if(!this.enabled){f.setOpacity(this.disabledOpacity)
}var d=new Element("div",{id:"autosaveControl"});
d.appendChild(e);
d.appendChild(document.createTextNode(" "));
d.appendChild(f);
d.appendChild(document.createTextNode(" "));
$(document.body).down(".bottombuttons .buttons").insert({bottom:d});
this.form.observe("submit",function(){d.remove()
});
document.observe("xwiki:actions:cancel",function(){d.remove()
})
},addListeners:function(){var d=function(e){if(e.keyCode==Event.KEY_RETURN){e.stop();
e.element().blur()
}};
["keydown","keyup","keypress"].each(function(e){this.autosaveInput.observe(e,d);
this.autosaveCheckbox.observe(e,d)
}.bind(this));
Event.observe(this.autosaveCheckbox,"click",function(){this.enabled=this.autosaveCheckbox.checked;
if(this.enabled){this.startTimer();
this.autosaveInput.up("label").setOpacity("1.0")
}else{this.stopTimer();
this.autosaveInput.up("label").setOpacity(this.disabledOpacity)
}}.bindAsEventListener(this));
Event.observe(this.autosaveInput,"blur",function(){var e=new Number(this.autosaveInput.value);
if(e>0){this.frequency=e;
this.setTimeUnit();
this.restartTimer()
}else{this.autosaveInput.value=this.frequency
}this.autosaveInput.removeClassName("focused")
}.bindAsEventListener(this));
Event.observe(this.autosaveInput,"focus",function(){this.autosaveInput.addClassName("focused")
}.bindAsEventListener(this))
},setTimeUnit:function(){if(this.frequency==1){this.timeUnit.update("minute")
}else{this.timeUnit.update("minutes")
}},startTimer:function(){this.timer=new PeriodicalExecuter(this.doAutosave.bind(this),this.frequency*60)
},stopTimer:function(){if(this.timer){this.timer.stop();
delete this.timer
}},restartTimer:function(){this.stopTimer();
this.startTimer()
},doAutosave:function(){this.updateVersionMetadata();
document.fire("xwiki:actions:save",{"continue":true,form:this.editComment.form});
this.resetVersionMetadata()
},updateVersionMetadata:function(){if(this.customMetadataElementsContainer){this.form.insert(this.customMetadataElementsContainer)
}this.userEditComment=this.editComment.value;
this.userMinorEdit=this.minorEditCheckbox.checked;
this.editComment.value+=" (Autosaved)";
this.minorEditCheckbox.checked=true
},resetVersionMetadata:function(){if(this.customMetadataElementsContainer){this.customMetadataElementsContainer.remove()
}this.editComment.value=this.userEditComment;
this.minorEditCheckbox.checked=this.userMinorEdit
}});
function b(){return new a.AutoSave()
}(c.domIsLoaded&&b())||document.observe("xwiki:dom:loaded",b)
}return c
}(XWiki||{}));