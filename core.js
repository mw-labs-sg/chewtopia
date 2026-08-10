/* ==========================================================================
   CHEWTOPIA — CORE. Saving, dates, scores, streaks, sound and the voice.
   Every other file reads from here. Nothing to edit day to day.
   ========================================================================== */

function S(k,d){ try{ var v=localStorage.getItem("chew:"+k); return v===null?d:v; }catch(e){ return d; } }
function W(k,v){ try{ localStorage.setItem("chew:"+k,v); }catch(e){} }
function SJ(k,d){ try{ var v=JSON.parse(localStorage.getItem("chew:"+k)); return (v===null||v===undefined)?d:v; }catch(e){ return d; } }
function WJ(k,v){ W(k, JSON.stringify(v)); }

/* ---------- who the whole app is showing ---------- */
/* One choice at the top, used by every screen, instead of a filter per tab. */
function vwho(){
  var v=S("vwho","all");
  if(v==="all") return v;
  for(var i=0;i<KIDS.length;i++){ if(KIDS[i].id===v) return v; }
  return "all";
}
function kidSubj(id){
  for(var i=0;i<KIDS.length;i++){ if(KIDS[i].id===id) return KIDS[i].subj||["en","zh","ma"]; }
  return ["en","zh"];
}
function hasSubj(id, s){ return kidSubj(id).indexOf(s)>=0; }

/* Training, Progress and Reading always show both boys side by side — the
   whole point of those screens is comparing them, and a filter there only
   ever hid half the picture. The child switch is on Upcoming and Timetable,
   where a single day belongs to one of them. */
function shownKids(){ return KIDS; }
/* Sits inside the panel, right under its heading, so there is never any doubt
   about whose screen you are looking at. */
function whoBar(){
  var v=vwho();
  return '<div class="whobar"><button class="wb w-all'+(v==="all"?" on":"")+'" data-vw="all">'+
    'Everyone<small>both boys</small></button>'+
    KIDS.map(function(k){
      return '<button class="wb w-'+k.id+(v===k.id?" on":"")+'" data-vw="'+k.id+'">'+
             esc(pname(k.id))+'<small>'+k.level+'</small></button>';
    }).join("")+'</div>';
}

/* ---------- scenes ---------- */
/* The world behind the cards. Kept per device, since one boy will want lava
   and the other will not. */
var SCENES=[["galaxy","Galaxy"],["aurora","Aurora"],["ocean","Deep sea"],
            ["forest","Forest"],["volcano","Volcano"]];
function scene(){
  var s=S("scene","galaxy");
  for(var i=0;i<SCENES.length;i++){ if(SCENES[i][0]===s) return s; }
  return "galaxy";
}
function applyScene(){
  try{ document.body.setAttribute("data-scene", scene()); }catch(e){}
}
function sceneBar(){
  return SCENES.map(function(s){
    return '<button class="sc-pick sc-'+s[0]+(scene()===s[0]?" on":"")+'" '+
           'data-scene="'+s[0]+'" title="'+s[1]+'" aria-label="'+s[1]+'"></button>';
  }).join("");
}

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
/* Each tab keeps its own colour, so the eye learns where things live. */
/* Progress was removed: Training already shows every score in the same boxes,
   and Sync now sits at the foot of Training. Old #progress links land on
   Training rather than nowhere. */
var TABS = [["home","Upcoming","t1"],["schedule","Timetable","t2"],
            ["meals","Meals","t3"],["practice","Training","t4"],
            ["reading","Reading","t6"]];
var tab="home", quiz=null, showAdd=false, openTest=null, openRun=null, markRun=null, markState=null;
/* Each tab gets a readable address, e.g. .../chewtopia/#meals, so a link can
   be bookmarked or sent straight to one screen. */
var SLUGS = {home:"upcoming", schedule:"timetable", meals:"meals",
             practice:"training", reading:"reading"};
function tabFromHash(){
  var h=(location.hash||"").replace(/^#\/?/,"").toLowerCase();
  for(var k in SLUGS){ if(SLUGS[k]===h) return k; }
  if(h==="progress") return "practice";      /* old bookmarks still work */
  return null;
}
function go(id, quiet){
  tab=id; quiz=null; showAdd=false; openTest=null; openRun=null; markRun=null; markState=null; hush();
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

function uuid(){
  if(window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(ch){
    var r=Math.random()*16|0; return (ch==="x"?r:(r&0x3|0x8)).toString(16); });
}

function results(){ return SJ("results",[]); }
function addResult(r){
  if(!r.id) r.id=uuid();
  r.up=0;                                  /* not yet uploaded */
  var a=results(); a.unshift(r);
  /* Handwriting pictures are heavy, so only the last 20 runs keep theirs.
     Everything older keeps its score, just not the pictures. */
  var seen=0;
  a.forEach(function(x){ if(x.ans){ seen++; if(seen>20) delete x.ans; } });
  WJ("results", a.slice(0,600));
  /* straight up to the cloud, if signed in — the sync button is only ever
     needed for the other direction or after being offline */
  if(typeof cloudPushAll==="function" && cloudUser) cloudPushAll(true);
}

/* ==========================================================================
   SHARED RESULTS
   One family account. Scores save on the device first, then upload.
   Progress reads whatever the cloud has, so any device sees every run.
   ========================================================================== */
var SB=null, cloudUser=null, cloudMsg="";
function sbc(){
  if(SB) return SB;
  if(!window.supabase || !SUPA_URL) return null;
  try{ SB=window.supabase.createClient(SUPA_URL, SUPA_KEY); }catch(e){ return null; }
  return SB;
}
function cloudInit(){
  var c=sbc(); if(!c) return;
  c.auth.getSession().then(function(r){
    cloudUser = (r.data && r.data.session) ? r.data.session.user : null;
    if(cloudUser) cloudSync(); else render();
  });
}
function asEmail(name){
  name=String(name).trim().toLowerCase();
  return name.indexOf("@")>-1 ? name : name+FAMILY_DOMAIN;
}
function familyName(email){
  return String(email||"").replace(FAMILY_DOMAIN,"");
}
function cloudLogin(email, pass){
  email=asEmail(email);
  var c=sbc(); if(!c){ cloudMsg="Cannot reach the server."; render(); return; }
  cloudMsg="Signing in\u2026"; render();
  c.auth.signInWithPassword({email:email, password:pass}).then(function(r){
    if(r.error){ cloudMsg=r.error.message; cloudUser=null; render(); return; }
    cloudUser=r.data.user; cloudMsg=""; cloudSync();
  });
}
function cloudLogout(){
  var c=sbc(); if(!c) return;
  c.auth.signOut().then(function(){ cloudUser=null; cloudMsg=""; render(); });
}
/* ==========================================================================
   SYNC — two buttons, and it says what happened.
   Get = bring down whatever the other device sent up.
   Send = put this device's work up.
   Both are safe to press at any time and in any order: nothing is ever
   overwritten, only merged.
   ========================================================================== */
var syncBusy=false;
function syncNote(){ return S("syncnote",""); }
function setNote(t){ W("syncnote", t); render(); }
function stamp(){
  var d=new Date();
  return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");
}
function pending(){ return results().filter(function(x){ return !x.up; }).length; }

/* ---------- GET ---------- */
function cloudPull(quiet, done){
  done = done || function(){};
  var c=sbc();
  if(!c||!cloudUser){ if(!quiet) setNote("Not signed in."); return done(0); }
  if(syncBusy) return done(0);
  syncBusy=true; if(!quiet) setNote("Getting\u2026");
  c.from("results").select("*").then(function(r){
    if(r.error){ syncBusy=false; setNote("Could not sync: "+r.error.message); return done(0); }
    var local=results(), byId={}, added=0;
    local.forEach(function(x){ if(x.id) byId[x.id]=x; });
    (r.data||[]).forEach(function(row){
      if(byId[row.id]){ byId[row.id].up=1; return; }
      added++;
      local.push({id:row.id, who:row.child_id, code:row.test_code, test:row.test_name,
                  score:row.score, total:row.total,
                  ts:new Date(row.completed_at).getTime(), up:1});
    });
    local.sort(function(a,b){ return b.ts-a.ts; });
    WJ("results", local.slice(0,600));
    pullState(function(stMsg){
      syncBusy=false;
      if(!quiet) setNote("Got "+added+(added===1?" new score":" new scores")+stMsg+" \u00b7 "+stamp());
      done(added);
    });
  });
}

/* ---------- SEND ---------- */
function cloudPushAll(quiet, done){
  done = done || function(){};
  var c=sbc();
  if(!c||!cloudUser){ if(!quiet) setNote("Not signed in."); return done(0); }
  if(syncBusy) return done(0);
  /* a different account than last time means everything local is unsent */
  if(S("clouduid","")!==cloudUser.id){
    var l0=results(); l0.forEach(function(x){ x.up=0; }); WJ("results",l0);
    W("clouduid", cloudUser.id);
  }
  syncBusy=true; if(!quiet) setNote("Sending\u2026");
  var local=results(), todo=[];
  local.forEach(function(x){ if(x.up) return; if(!x.id) x.id=uuid(); todo.push(x); });
  WJ("results", local);

  function afterResults(){
    pushState(function(stMsg){
      syncBusy=false;
      if(!quiet) setNote("Sent "+todo.length+(todo.length===1?" score":" scores")+stMsg+" \u00b7 "+stamp());
      done(todo.length);
    });
  }
  if(!todo.length){ afterResults(); return; }
  var rows=todo.map(function(x){
    return {id:x.id, user_id:cloudUser.id, child_id:x.who, test_code:x.code||null,
            test_name:x.test, score:x.score, total:x.total,
            completed_at:new Date(x.ts).toISOString()};
  });
  c.from("results").upsert(rows,{onConflict:"id", ignoreDuplicates:true}).then(function(r){
    if(r.error){ syncBusy=false; setNote("Could not sync: "+r.error.message); return done(0); }
    var done={}; todo.forEach(function(x){ done[x.id]=1; });
    var l=results(); l.forEach(function(x){ if(done[x.id]) x.up=1; });
    WJ("results", l);
    afterResults();
  });
}

/* ---------- the rest: mistakes, books, events, activities ---------- */
var STATE_KEYS=["weak:tc","weak:sc","books:tc","books:sc","events","acts","gone"];
function stateIdent(k){ return k.indexOf("weak:")===0 ? "k" : "id"; }
function mergeList(a, b, key){
  var out=[], seen={};
  (a||[]).concat(b||[]).forEach(function(x){
    if(!x) return;
    var id=x[key]; if(id===undefined){ out.push(x); return; }
    var hit=seen[id];
    if(!hit){ seen[id]=x; out.push(x); return; }
    if((x.n||0) > (hit.n||0)) hit.n=x.n;
    if((x.ts||0) > (hit.ts||0)){
      Object.keys(x).forEach(function(f){ if(f!=="n") hit[f]=x[f]; });
    }
  });
  return out;
}
function uniq(a){
  var seen={}, out=[];
  (a||[]).forEach(function(x){ if(!seen[x]){ seen[x]=1; out.push(x); } });
  return out;
}
function pullState(done){
  var c=sbc();
  if(!c||!cloudUser) return done("");
  c.from("state").select("*").then(function(r){
    if(r.error) return done(", the rest needs the state table");
    var remote={};
    (r.data||[]).forEach(function(row){ remote[row.k]=row.v; });
    var touched=0;
    STATE_KEYS.forEach(function(k){
      if(remote[k]===undefined) return;
      var mine=SJ(k,[]);
      var merged = k==="gone" ? uniq(mine.concat(remote[k]||[]))
                              : mergeList(mine, remote[k], stateIdent(k));
      if(JSON.stringify(merged)!==JSON.stringify(mine)) touched++;
      WJ(k, merged);
    });
    done(touched?", plus the rest":"");
  });
}
function pushState(done){
  var c=sbc();
  if(!c||!cloudUser) return done("");
  var rows=STATE_KEYS.map(function(k){
    return {user_id:cloudUser.id, k:k, v:SJ(k,[]), updated_at:new Date().toISOString()};
  });
  c.from("state").upsert(rows,{onConflict:"user_id,k"}).then(function(r){
    done(r.error ? ", the rest needs the state table" : ", plus the rest");
  });
}

/* ==========================================================================
   ONE BUTTON. It gets whatever the other device sent, then sends whatever this
   one has. Two directions in one press, so there is nothing to get wrong and
   no order to remember.
   ========================================================================== */
function cloudSync(){
  var c=sbc();
  if(!c||!cloudUser){ setNote("Not signed in."); return; }
  if(syncBusy) return;
  setNote("Syncing\u2026");
  cloudPull(true, function(got){
    cloudPushAll(true, function(sent){
      var bits=[];
      if(got)  bits.push("brought "+got+" down");
      if(sent) bits.push("sent "+sent+" up");
      setNote((bits.length ? "Synced \u00b7 "+bits.join(", ") : "Synced \u00b7 nothing new")+
              " \u00b7 "+stamp());
    });
  });
}
/* A finished test syncs itself, so a tablet left on the sofa keeps up. */
function autoSend(){ if(cloudUser) cloudSync(); }

function runsFor(id){ return results().filter(function(r){ return r.who===(id||who()); })
  .slice().sort(function(a,b){ return a.ts-b.ts; }); }
function lastFor(t,kid){ var a=runsFor(kid).filter(function(r){ return r.test===t; });
  return a.length?a[a.length-1]:null; }
function bestFor(t,kid){ var a=runsFor(kid).filter(function(r){ return r.test===t; });
  return a.length ? a.reduce(function(x,y){ return y.score>x.score?y:x; },a[0]) : null; }

/* Last score, plus the score to beat when there is a better one on record. */
function pill(t,kid){
  var l=lastFor(t,kid);
  if(!l) return '<span class="pills"><span class="pill">Not tried</span></span>';
  var p=Math.round(l.score/l.total*100), c=p>=80?"good":p>=50?"mid":"low";
  var s='<span class="pills"><span class="pill '+c+'">'+l.score+'/'+l.total+'</span>';
  var b=bestFor(t,kid);
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
/* One filter bar shape, used on Upcoming and on the Timetable. */

/* ---------- reading log ---------- */
function books(w){ return SJ("books:"+w, []); }
function addBook(w, rec){ var a=books(w); a.unshift(rec); WJ("books:"+w, a.slice(0,400)); }
function delBook(w, id){ WJ("books:"+w, books(w).filter(function(b){ return b.id!==id; })); }
function booksSince(w, days){
  var cut=Date.now()-days*86400000;
  return books(w).filter(function(b){ return b.ts>=cut; });
}

/* ---------- child pickers ---------- */
/* Training always needs one child. The timetable can also show both. */
/* Tapping the child already showing lets you rename them, as the old header did. */

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
/* One switch for every noise the app makes, including the reading voice. */
function snd(){ return S("snd","on")!=="off"; }
function sndToggle(){
  return '<button class="sndbtn'+(snd()?"":" off")+'" id="sndBtn" '+
    'title="'+(snd()?"Sound on":"Sound off")+'" aria-label="Sound">'+
    (snd()?"\uD83D\uDD0A":"\uD83D\uDD07")+'</button>';
}
var ac=null;
function actx(){ if(!ac){ var C=window.AudioContext||window.webkitAudioContext; if(C) ac=new C(); } return ac; }
function blip(f,dur,type,vol){
  if(!snd()) return;
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
function sfxSwipe(){ blip([392,523],0.055,"triangle",0.03); }   /* changing tab */
function sfxPop(){ blip([659,880],0.05,"sine",0.045); }         /* picking someone */

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
/* ---------- praise, mixed so it never repeats itself ---------- */
var PRAISE_EN=["Nice one!","Well done!","That's it!","Spot on!","Good work!","Yes!","Lovely.","Got it!"];
var PRAISE_CN=[["\u5f88\u597d","hen hao"],["\u592a\u68d2\u4e86","tai bang le"],["\u5bf9\u4e86","dui le"],
               ["\u4e0d\u9519","bu cuo"],["\u771f\u5389\u5bb3","zhen li hai"],["\u597d\u68d2","hao bang"]];
var OOPS_EN=["Not quite.","Nearly.","Close one.","Have another look."];
var OOPS_CN=["\u518d\u60f3\u60f3","\u5dee\u4e00\u70b9","\u4e0d\u5bf9\u54e6","\u518d\u770b\u4e00\u904d"];
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
/* A Chinese question is answered entirely in Chinese — praise, the miss, and
   the streak line. Mixing English in halfway through breaks the spell and
   teaches nothing. */
function praise(cn, streak){
  if(cn) return {t: streak>=4 ? "\u8fde\u5bf9"+streak+"\u4e2a\uff01" : pick(PRAISE_CN)[0], lang:"zh-CN"};
  if(streak>=4) return {t:streak+" in a row!", lang:null};
  return {t:pick(PRAISE_EN), lang:null};
}
function oops(cn){ return cn ? {t:pick(OOPS_CN), lang:"zh-CN"} : {t:pick(OOPS_EN), lang:null}; }

/* ---------- weak items: everything missed, kept per child ---------- */
function weakKey(it){ return it.k+"|"+(it.h||it.a||it.q||it.s||""); }
function weakAll(w){ return SJ("weak:"+(w||who()), []); }
function weakAdd(it, code){ return weakAddFor(who(), it, code); }
function weakAddFor(w, it, code){
  var a=weakAll(w), k=weakKey(it), hit=null;
  a.forEach(function(x){ if(x.k===k) hit=x; });
  if(hit){ hit.n++; hit.ts=Date.now(); }
  else a.push({k:k, n:1, ts:Date.now(), it:it, code:code||""});
  WJ("weak:"+w, a.slice(-120));
}
function weakDrop(it){
  var w=who(), k=weakKey(it), a=weakAll(w), out=[];
  a.forEach(function(x){
    if(x.k!==k){ out.push(x); return; }
    x.n--; if(x.n>0) out.push(x);          /* two clean goes clears it */
  });
  WJ("weak:"+w, out);
}
function weakTop(w, n){
  return weakAll(w).slice().sort(function(a,b){
    return (b.n-a.n) || (b.ts-a.ts);
  }).slice(0, n||5);
}
function weakLabel(x){
  var it=x.it||{};
  if(it.k==="hz"||it.k==="rn") return it.h+" \u00b7 "+(it.word||"");
  if(it.k==="py"||it.k==="tx") return (it.word||it.h||"");
  if(it.k==="math") return it.q||"";
  return it.a||it.s||"";
}

/* A different buddy each session, so it never feels like the same screen.
   All share the eye and mouth classes, so the cheer and oops animations work. */
var BUDDIES=["robot","cat","dragon","rocket","owl"];
function buddy(){
  var b=S("buddy",""); 
  if(BUDDIES.indexOf(b)<0){ b=BUDDIES[Math.floor(Math.random()*BUDDIES.length)]; W("buddy",b); }
  return b;
}
function newBuddy(){
  var cur=buddy(), pick=cur;
  while(pick===cur) pick=BUDDIES[Math.floor(Math.random()*BUDDIES.length)];
  W("buddy",pick); return pick;
}
function botSVG(){
  var b=buddy();
  if(b==="cat")    return catSVG();
  if(b==="dragon") return dragonSVG();
  if(b==="rocket") return rocketSVG();
  if(b==="owl")    return owlSVG();
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
function catSVG(){
  return '<svg class="bot" id="bot" viewBox="0 0 150 128" aria-hidden="true">'+
    '<path d="M45 44 L40 18 L64 32 Z" fill="#FFB627"/>'+
    '<path d="M105 44 L110 18 L86 32 Z" fill="#FFB627"/>'+
    '<circle cx="75" cy="66" r="40" fill="#FFE9D2" stroke="#F0C89A" stroke-width="3"/>'+
    '<circle class="eye" cx="62" cy="60" r="6" fill="#16222E"/>'+
    '<circle class="eye" cx="88" cy="60" r="6" fill="#16222E"/>'+
    '<path d="M70 76 q5 6 10 0" stroke="#C25A0C" stroke-width="3" fill="none" stroke-linecap="round"/>'+
    '<rect class="mouth" x="66" y="82" width="18" height="4" rx="2" fill="#C25A0C"/>'+
    '<path d="M30 64 H14 M30 72 H16 M120 64 H136 M120 72 H134" stroke="#F0C89A" stroke-width="3" stroke-linecap="round"/>'+
  '</svg>';
}
function dragonSVG(){
  return '<svg class="bot" id="bot" viewBox="0 0 150 128" aria-hidden="true">'+
    '<path d="M52 30 L60 14 L68 30 M82 30 L90 14 L98 30" fill="#2F7A45"/>'+
    '<ellipse cx="75" cy="68" rx="42" ry="38" fill="#DFF3E4" stroke="#8FCBA3" stroke-width="3"/>'+
    '<circle class="eye" cx="62" cy="60" r="6" fill="#16222E"/>'+
    '<circle class="eye" cx="88" cy="60" r="6" fill="#16222E"/>'+
    '<ellipse cx="68" cy="80" rx="3" ry="4" fill="#2F7A45"/>'+
    '<ellipse cx="82" cy="80" rx="3" ry="4" fill="#2F7A45"/>'+
    '<rect class="mouth" x="64" y="88" width="22" height="5" rx="2.5" fill="#2F7A45"/>'+
    '<path d="M33 70 q-14 -6 -18 6 q12 4 18 -2" fill="#8FCBA3"/>'+
    '<path d="M117 70 q14 -6 18 6 q-12 4 -18 -2" fill="#8FCBA3"/>'+
  '</svg>';
}
function rocketSVG(){
  return '<svg class="bot" id="bot" viewBox="0 0 150 128" aria-hidden="true">'+
    '<path d="M75 12 q26 26 26 58 q0 20 -26 30 q-26 -10 -26 -30 q0 -32 26 -58 Z" fill="#E8F2FE" stroke="#C9DFF8" stroke-width="3"/>'+
    '<path d="M49 74 L30 96 L49 92 Z" fill="#FF6F52"/>'+
    '<path d="M101 74 L120 96 L101 92 Z" fill="#FF6F52"/>'+
    '<circle cx="75" cy="52" r="17" fill="#2F73E8"/>'+
    '<circle class="eye" cx="69" cy="50" r="5" fill="#fff"/>'+
    '<circle class="eye" cx="82" cy="50" r="5" fill="#fff"/>'+
    '<rect class="mouth" x="66" y="66" width="18" height="4" rx="2" fill="#7C5CE0"/>'+
    '<path d="M66 100 q9 20 18 0 q-9 8 -18 0 Z" fill="#FFB627"/>'+
  '</svg>';
}
function owlSVG(){
  return '<svg class="bot" id="bot" viewBox="0 0 150 128" aria-hidden="true">'+
    '<path d="M44 34 L52 16 L64 30 Z" fill="#7C5CE0"/>'+
    '<path d="M106 34 L98 16 L86 30 Z" fill="#7C5CE0"/>'+
    '<ellipse cx="75" cy="70" rx="40" ry="40" fill="#F0EAFE" stroke="#CDBDF5" stroke-width="3"/>'+
    '<circle cx="62" cy="60" r="14" fill="#fff" stroke="#CDBDF5" stroke-width="2"/>'+
    '<circle cx="88" cy="60" r="14" fill="#fff" stroke="#CDBDF5" stroke-width="2"/>'+
    '<circle class="eye" cx="62" cy="60" r="6" fill="#16222E"/>'+
    '<circle class="eye" cx="88" cy="60" r="6" fill="#16222E"/>'+
    '<path d="M75 72 L69 80 L81 80 Z" fill="#FFB627"/>'+
    '<rect class="mouth" x="66" y="88" width="18" height="4" rx="2" fill="#7C5CE0"/>'+
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
var BEST_EN=/serena|martha|sonia|libby|kate|stephanie|matilda|samantha|ava|jenny|aria/i;
var FEM=/samantha|serena|sonia|libby|maisie|aria|jenny|ava|allison|susan|kate|karen|moira|tessa|fiona|martha|shelley|nicky|female|woman|tingting|ting-ting|xiaoxiao|xiaoyi|yaoyao|xiaohan|xiaomo|meijia|huihui|\u5a77\u5a77|\u6653\u6653/i;
/* Mandarin voices worth having, best first. Tingting and Siri are iOS,
   Xiaoxiao and Yunxi are the Windows neural pair, Huihui is the old SAPI one. */
var CN_GOOD=/\u666e\u901a\u8bdd|tingting|xiaoxiao|xiaoyi|yunxi|yunyang|meijia|liangliang|kangkang|yaoyao/i;
var CN_OLD=/huihui/i;
var OLD=/zira|david|hazel|mark|george|james|ravi|desktop/i;
/* Anything obviously a man, so it is never picked while a woman is available */
var MALE=/\b(male|man|men)\b|daniel|\balex\b|fred|thomas|\bdavid\b|\bmark\b|george|james|oliver|arthur|\bryan\b|aaron|gordon|rishi|nathan|yunxi|yunyang|kangkang|liangliang/i;

function voiceScore(v){
  var n=v.name||"", l=(v.lang||"").replace("_","-"), x=0;
  if(BEST_EN.test(n)) x+=60;           /* the ones that sound like a person */
  if(/^en-GB/i.test(l)) x+=30;         /* the accent they hear at school */
  if(/^en-AU|^en-IE/i.test(l)) x+=10;
  if(FEM.test(n))     x+=200;   /* a woman's voice first, always */
  if(NEURAL.test(n))  x+=100;
  if(CN_GOOD.test(n)) x+=80;
  if(MALE.test(n))    x-=200;
  if(OLD.test(n))     x-=60;
  if(CN_OLD.test(n))  x-=50;
  return x;
}
var CN_WRONG=/yue|cantonese|hk|hong ?kong|sinji|tw|taiwan|meijia|\u53f0\u7063|\u7cb5/i;
function langVoices(lang){
  if(!voices.length) loadVoices();
  var base=lang.split("-")[0];
  return voices.filter(function(v){
    var l=(v.lang||"").replace("_","-").toLowerCase();
    if(l.indexOf(base)!==0) return false;
    /* Mandarin only. Cantonese and the Taiwan voices read these lists wrong. */
    if(base==="zh" && (CN_WRONG.test(v.name||"") || CN_WRONG.test(l))) return false;
    return true;
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
/* Chinese read too slowly turns to mush and loses its tones, so it never
   drops below this however slow the English is set. */
function say(t,rate,lang){
  if(!window.speechSynthesis || !snd()) return;
  lang=lang||"en-GB";
  var cn = lang.indexOf("zh")===0;
  var u=new SpeechSynthesisUtterance(t), v=bestVoice(lang);
  /* An English voice reading Chinese is worse than silence: it teaches the
     wrong sounds. Say nothing and let the screen carry it. */
  if(cn && !v) return;
  if(v){ u.voice=v; u.lang=v.lang; } else u.lang=lang;
  var base=0.85;   /* the one speed that suits both boys */
  if(isNaN(base)) base=0.85;
  u.rate = rate ? Math.max(cn?0.75:0.4, Math.min(1.3, rate * (base/0.85))) : base;
  u.pitch = cn ? 1.0 : 1.05;
  speechSynthesis.speak(u);
}
var sayTimers=[];
function sayLater(fn, ms){ sayTimers.push(setTimeout(fn, ms)); }
function hush(){
  sayTimers.forEach(clearTimeout); sayTimers=[];
  try{ speechSynthesis.cancel(); }catch(e){}
}
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
