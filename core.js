/* ==========================================================================
   CHEWTOPIA — CORE. Saving, dates, scores, streaks, sound and the voice.
   Every other file reads from here. Nothing to edit day to day.
   ========================================================================== */

function S(k,d){ try{ var v=localStorage.getItem("chew:"+k); return v===null?d:v; }catch(e){ return d; } }
function W(k,v){ try{ localStorage.setItem("chew:"+k,v); }catch(e){} }
function SJ(k,d){ try{ var v=JSON.parse(localStorage.getItem("chew:"+k)); return (v===null||v===undefined)?d:v; }catch(e){ return d; } }
function WJ(k,v){ W(k, JSON.stringify(v)); }

function pname(id){ var k=KIDS.filter(function(x){return x.id===id;})[0]; return S("name:"+id,k.init); }
function who(){ return S("who","tc"); }

/* Adds anything new from data.js without touching what is already here.
   Deleting a seeded item inside the app records it, so it will not come back. */
/* Anything that came from data.js is school-set — no delete button for it.
   Only things added inside the app can be removed. */
function fromSeed(id){
  for(var i=0;i<SEED_EVENTS.length;i++){ if(SEED_EVENTS[i].id===id) return true; }
  return false;
}
function seedGone(){ return SJ("seedgone",[]); }
function markGone(id){ var g=seedGone(); if(g.indexOf(id)<0){ g.push(id); WJ("seedgone",g); } }
function mergeSeed(key, seed){
  var cur = SJ(key,null);
  if(cur===null){ WJ(key, seed.slice()); return; }
  var gone = seedGone(), byId = {};
  seed.forEach(function(x){ byId[x.id]=x; });
  var out = [], have = {}, changed = false;
  cur.forEach(function(x){
    if(byId[x.id]){
      have[x.id]=1;
      if(JSON.stringify(x)!==JSON.stringify(byId[x.id])){ changed=true; out.push(byId[x.id]); }
      else out.push(x);
    } else out.push(x);
  });
  seed.forEach(function(x){
    if(!have[x.id] && gone.indexOf(x.id)<0){ out.push(x); changed=true; }
  });
  if(changed) WJ(key, out);
}
function seedOnce(){ mergeSeed("events", SEED_EVENTS); mergeSeed("acts", SEED_ACTS); }

var DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
var TABS = [["home","Upcoming"],["schedule","Timetable"],["meals","Meals"],["practice","Training"],["results","Progress"]];
var tab="home", quiz=null, showAdd=false;
/* Each tab gets a readable address, e.g. .../chewtopia/#meals, so a link can
   be bookmarked or sent straight to one screen. */
var SLUGS = {home:"upcoming", schedule:"timetable", meals:"meals",
             practice:"training", results:"progress"};
function tabFromHash(){
  var h=(location.hash||"").replace(/^#\/?/,"").toLowerCase();
  for(var k in SLUGS){ if(SLUGS[k]===h) return k; }
  return null;
}
function go(id, quiet){
  tab=id; quiz=null; showAdd=false; hush();
  if(!quiet){ try{ location.hash="#"+SLUGS[id]; }catch(e){} }
  render(); scrollTo(0,0);
}

/* ---------- helpers ---------- */
/* Subject colours on the school timetable */
function subjCls(x){
  if(x==="Recess") return "s-rec";
  if(x==="CL")     return "s-cl";
  if(x==="MA"||x==="EL") return "s-core";
  if(x==="PE"||x==="MUSIC"||x==="ART") return "s-fun";
  return "s-other";
}
function whoCls(w){ return w==="tc" ? "c-tc" : w==="sc" ? "c-sc" : "c-all"; }
function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function todayIdx(){ return (new Date().getDay()+6)%7; }
function monKey(){ var d=new Date(); d.setDate(d.getDate()-todayIdx());
  return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); }
function weekDates(){ var d=new Date(); d.setDate(d.getDate()-todayIdx());
  return DAYS.map(function(_,i){ var x=new Date(d); x.setDate(d.getDate()+i); return x; }); }
function daysTo(iso){ var t=new Date(); t.setHours(0,0,0,0);
  return Math.round((new Date(iso+"T00:00:00")-t)/86400000); }
function evState(e){ var a=daysTo(e.d), b=e.d2?daysTo(e.d2):a;
  return {start:a,end:b,live:(a<=0&&b>=0),gone:(b<0)}; }
function evWhen(e){ var s=evState(e);
  if(s.live) return e.d2?"On now":"Today";
  return s.start===1?"Tomorrow":"in "+s.start+" days"; }
function dday(i){ return new Date(i+"T00:00:00").toLocaleDateString("en-GB",{weekday:"long"}); }
function dnum(i){ return new Date(i+"T00:00:00").getDate(); }
function dmon(i){ return new Date(i+"T00:00:00").toLocaleDateString("en-GB",{month:"short"}); }
var ft={};
function flash(id){ var e=document.getElementById(id); if(!e) return;
  e.textContent="Saved"; clearTimeout(ft[id]); ft[id]=setTimeout(function(){e.textContent="";},1100); }
function grow(t){ t.style.height="auto"; t.style.height=(t.scrollHeight)+"px"; }

function results(){ return SJ("results",[]); }
function addResult(r){ var a=results(); a.unshift(r); WJ("results",a.slice(0,600)); }
function runsFor(id){ return results().filter(function(r){ return r.who===(id||who()); })
  .slice().sort(function(a,b){ return a.ts-b.ts; }); }
function lastFor(t){ var a=runsFor().filter(function(r){ return r.test===t; });
  return a.length?a[a.length-1]:null; }
function bestFor(t){ var a=runsFor().filter(function(r){ return r.test===t; });
  return a.length ? a.reduce(function(x,y){ return y.score>x.score?y:x; },a[0]) : null; }

/* Last score, plus the score to beat when there is a better one on record. */
function pill(t){
  var l=lastFor(t);
  if(!l) return '<span class="pills"><span class="pill">Not tried</span></span>';
  var p=Math.round(l.score/l.total*100), c=p>=80?"good":p>=50?"mid":"low";
  var s='<span class="pills"><span class="pill '+c+'">'+l.score+'/'+l.total+'</span>';
  var b=bestFor(t);
  if(b && b.score>l.score) s+='<span class="pill beat">Beat '+b.score+'</span>';
  else if(l.score===l.total) s+='<span class="pill beat">\u2605</span>';
  return s+'</span>';
}

/* ---------- day streak ---------- */
/* One a day, any test counts. Missing a single day is forgiven so a sick day
   does not wipe out weeks of work. Two days off and it starts again. */
function todayISO(){ var d=new Date();
  return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2); }
function streak(id){ return SJ("streak:"+(id||who()), {n:0,last:""}); }
function bumpStreak(){
  var k="streak:"+who(), s=streak(), t=todayISO();
  if(s.last===t) return s;
  var gap = s.last ? -daysTo(s.last) : 999;
  s.n = (gap<=2) ? s.n+1 : 1;
  s.last = t;
  WJ(k,s);
  return s;
}
/* ---------- meal rotation ---------- */
/* Which of the four printed weeks this Monday falls on. */
function rotIdx(off){
  var d=new Date(); d.setHours(0,0,0,0);
  d.setDate(d.getDate()-todayIdx()+(off||0)*7);
  var w=Math.floor((d-new Date(ROTATION_START+"T00:00:00"))/604800000);
  return ((w%4)+4)%4;
}
function mealPlan(off){ return MEALS_ROTATION[rotIdx(off)]; }

/* Upcoming filter: everyone, or one child plus anything family-wide. */
function evFilter(){ return S("evfilter","all"); }
/* One filter bar shape, used on Upcoming and on the Timetable. */
function filterBar(id, cur, allValue, allLabel){
  var s='<div class="legend" id="'+id+'">'+
    '<button class="lg c-all'+(cur===allValue?" on":"")+'" data-fil="'+allValue+'">'+allLabel+'</button>';
  KIDS.forEach(function(k){
    s+='<button class="lg '+whoCls(k.id)+(cur===k.id?" on":"")+'" data-fil="'+k.id+'">'+
       esc(pname(k.id))+'</button>';
  });
  return s+'</div>';
}
function wireFilter(id, save){
  var box=document.getElementById(id); if(!box) return;
  box.querySelectorAll("[data-fil]").forEach(function(b){
    b.onclick=function(){ save(b.dataset.fil); render(); };
  });
}
function evFilterBar(){ return filterBar("evFil", evFilter(), "all", "Everyone"); }

/* ---------- child pickers ---------- */
/* Training always needs one child. The timetable can also show both. */
function ttWho(){ return S("ttwho","both"); }
function kidPicker(cur, id, withBoth){
  var s='<div class="pick" id="'+id+'">';
  if(withBoth) s+='<button class="pk'+(cur==="both"?" on":"")+'" data-pick="both">Both</button>';
  KIDS.forEach(function(k){
    s+='<button class="pk k-'+k.id+(cur===k.id?" on":"")+'" data-pick="'+k.id+'">'+
       esc(pname(k.id))+'<small>'+k.level+'</small></button>';
  });
  return s+'</div>';
}
/* Tapping the child already showing lets you rename them, as the old header did. */
function wirePicker(id, cur, save){
  var box=document.getElementById(id); if(!box) return;
  box.querySelectorAll("[data-pick]").forEach(function(b){
    b.onclick=function(){
      var v=b.dataset.pick;
      if(v===cur && v!=="both"){
        var n=prompt("Name (kept on this device only)", pname(v));
        if(n && n.trim()) W("name:"+v, n.trim().slice(0,16));
      } else save(v);
      quiz=null; render();
    };
  });
}

/* A colour key naming both boys, used wherever their colours appear. */
function kidKey(withAll){
  var s='<div class="legend">';
  KIDS.forEach(function(k){ s+='<span class="lg '+whoCls(k.id)+'">'+esc(pname(k.id))+'</span>'; });
  if(withAll) s+='<span class="lg c-all">Everyone</span>';
  return s+'</div>';
}

function streakChip(id){
  var s=streak(id);
  if(!s.n) return "";
  var cold = s.last!==todayISO();
  return '<span class="strk'+(cold?" cold":"")+'">\uD83D\uDD25 '+s.n+(s.n===1?" day":" days")+'</span>';
}

/* ---------- sound effects ---------- */
var ac=null;
function actx(){ if(!ac){ var C=window.AudioContext||window.webkitAudioContext; if(C) ac=new C(); } return ac; }
function blip(f,dur,type,vol){
  dur=dur||0.12; type=type||"square"; vol=vol||0.06;
  try{
    var a=actx(); if(!a) return;
    f.forEach(function(hz,n){
      var o=a.createOscillator(), g=a.createGain();
      o.type=type; o.frequency.value=hz;
      var t=a.currentTime+n*dur;
      g.gain.setValueAtTime(vol,t);
      g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
      o.connect(g); g.connect(a.destination); o.start(t); o.stop(t+dur);
    });
  }catch(e){}
}
function sfxWin(){ blip([523,659,784,1047],0.10); }
function sfxStreak(){ blip([659,784,988,1319,1568],0.09); }
function sfxLose(){ blip([196,155],0.17,"sawtooth",0.05); }
function sfxTap(){ blip([880],0.045,"triangle",0.035); }
function sfxDone(){ blip([523,659,784,1047,1319],0.13); }

function burst(n){
  var cols=["#2F73E8","#4FB86B","#FF6F52","#7C5CE0","#FFB627"];
  for(var i=0;i<(n||20);i++){
    var el=document.createElement("div");
    el.className="spark";
    el.style.background=cols[i%cols.length];
    el.style.left=(window.innerWidth/2)+"px";
    el.style.top=(window.innerHeight*0.34)+"px";
    document.body.appendChild(el);
    var a=Math.random()*Math.PI*2, d=90+Math.random()*160;
    (function(x){
      try{
        x.animate([{transform:"translate(0,0) rotate(0)",opacity:1},
          {transform:"translate("+Math.cos(a)*d+"px,"+(Math.sin(a)*d+120)+"px) rotate("+
            (Math.random()*720-360)+"deg)",opacity:0}],
          {duration:850+Math.random()*450,easing:"cubic-bezier(.2,.7,.4,1)"}).onfinish=function(){ x.remove(); };
      }catch(e){ x.remove(); }
    })(el);
  }
}

/* ---------- mascot ---------- */
function botSVG(){
  return '<svg class="bot" id="bot" viewBox="0 0 150 128" aria-hidden="true">'+
    '<line x1="75" y1="30" x2="75" y2="13" stroke="#B8C9DA" stroke-width="5" stroke-linecap="round"/>'+
    '<circle cx="75" cy="9" r="7" fill="#FFB627"/>'+
    '<rect x="20" y="52" width="15" height="34" rx="7" fill="#FF6F52"/>'+
    '<rect x="115" y="52" width="15" height="34" rx="7" fill="#FF6F52"/>'+
    '<rect x="38" y="30" width="74" height="66" rx="20" fill="#E8F2FE" stroke="#C9DFF8" stroke-width="3"/>'+
    '<rect x="50" y="46" width="50" height="28" rx="12" fill="#2F73E8"/>'+
    '<circle class="eye" cx="64" cy="60" r="5" fill="#fff"/>'+
    '<circle class="eye" cx="86" cy="60" r="5" fill="#fff"/>'+
    '<rect class="mouth" x="64" y="80" width="22" height="5" rx="2.5" fill="#7C5CE0"/>'+
    '<rect x="52" y="100" width="16" height="12" rx="5" fill="#B8C9DA"/>'+
    '<rect x="82" y="100" width="16" height="12" rx="5" fill="#B8C9DA"/>'+
  '</svg>';
}
function botReact(kind){
  var b=document.getElementById("bot"); if(!b) return;
  b.classList.remove("cheer","oops");
  void b.offsetWidth;
  b.classList.add(kind);
  setTimeout(function(){ b.classList.remove(kind); }, 700);
}

/* ---------- speech ---------- */
var voices=[];
function loadVoices(){ try{ voices=speechSynthesis.getVoices()||[]; }catch(e){ voices=[]; } }
if(window.speechSynthesis){ loadVoices(); speechSynthesis.onvoiceschanged=loadVoices; }
/* Voice ranking. Modern neural voices first, then known female names.
   Windows' old SAPI voices (Zira, David, Hazel) are pushed to the bottom. */
var NEURAL=/natural|online|google|siri|premium|enhanced/i;
var FEM=/samantha|serena|sonia|libby|maisie|aria|jenny|ava|allison|susan|kate|karen|moira|tessa|fiona|martha|female|woman|xiaoxiao|huihui|tingting|meijia|sinji|yaoyao|lili/i;
var OLD=/zira|david|hazel|mark|george|james|ravi|desktop/i;

function voiceScore(v){
  var n=v.name||"", x=0;
  if(NEURAL.test(n)) x+=100;
  if(FEM.test(n))    x+=40;
  if(OLD.test(n))    x-=60;
  return x;
}
function langVoices(lang){
  if(!voices.length) loadVoices();
  var base=lang.split("-")[0];
  return voices.filter(function(v){
    return v.lang && v.lang.replace("_","-").toLowerCase().indexOf(base)===0;
  }).sort(function(x,y){
    var d=voiceScore(y)-voiceScore(x);
    if(d) return d;
    var xe=((x.lang||"").replace("_","-")===lang)?1:0;
    var ye=((y.lang||"").replace("_","-")===lang)?1:0;
    return ye-xe;
  });
}
function bestVoice(lang){
  var saved=S("voice:"+lang,"");
  var hit=voices.filter(function(v){ return v.name===saved; })[0];
  if(hit) return hit;
  return langVoices(lang)[0] || null;
}
function say(t,rate,lang){
  if(!window.speechSynthesis) return;
  lang=lang||"en-GB";
  var u=new SpeechSynthesisUtterance(t), v=bestVoice(lang);
  if(v){ u.voice=v; u.lang=v.lang; } else u.lang=lang;
  var base=parseFloat(S("rate","0.85"));
  if(isNaN(base)) base=0.85;
  u.rate = rate ? Math.max(0.4, Math.min(1.3, rate * (base/0.85))) : base;
  u.pitch=1.05; speechSynthesis.speak(u);
}
function hush(){ try{ speechSynthesis.cancel(); }catch(e){} }
function voiceBox(lang){
  var o=langVoices(lang);
  var label = lang==="zh-CN" ? "Chinese voice" : "English voice";
  if(!o.length) return '<div class="lbl">'+label+'</div>'+
    '<p class="empty">No '+(lang==="zh-CN"?"Chinese":"English")+' voice installed on this device.</p>';
  var cur=bestVoice(lang);
  var h='<div class="lbl">'+label+'</div><select data-voice="'+lang+'">';
  o.forEach(function(v){
    var tag = NEURAL.test(v.name) ? "  ✨" : OLD.test(v.name) ? "  (old)" : "";
    h+='<option value="'+esc(v.name)+'"'+((cur&&v.name===cur.name)?" selected":"")+'>'+
       esc(v.name)+tag+'</option>';
  });
  return h+'</select>';
}
function wireVoices(){
  document.querySelectorAll("[data-voice]").forEach(function(sel){
    sel.onchange=function(){
      var lg=sel.dataset.voice;
      W("voice:"+lg, sel.value);
      say(lg==="zh-CN" ? "你好，我是老师。" : "Hello. I am your teacher.", 0.85, lg);
    };
  });
}
