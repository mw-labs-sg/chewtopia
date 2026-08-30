/* ==========================================================================
   CHEWTOPIA — CORE. Saving, dates, scores, streaks, sound and the voice.
   Every other file reads from here. Nothing to edit day to day.
   ========================================================================== */

function S(k,d){ try{ var v=localStorage.getItem("chew:"+k); return v===null?d:v; }catch(e){ return d; } }
/* A full disk used to be swallowed here, so a finished test simply did not
   save and the score he had just earned was never seen again. Now the answer
   sheets — far and away the biggest thing in the store, and the least
   important — are let go to make room, and if that is still not enough the
   screen says so rather than failing in silence. */
var storeFull="";
function W(k,v){
  try{ localStorage.setItem("chew:"+k,v); storeFull=""; return true; }
  catch(e){
    if(!trimStore()) { storeFull="This device is out of room."; return false; }
    try{ localStorage.setItem("chew:"+k,v); storeFull=""; return true; }
    catch(e2){ storeFull="This device is out of room, so the last thing was not saved."; return false; }
  }
}
/* Drop the oldest answer sheets, then the oldest runs. Scores are kept as long
   as anything can be: a number is worth far more than the working. */
function trimStore(){
  var a=null;
  try{ a=JSON.parse(localStorage.getItem("chew:results")||"[]"); }catch(e){ return false; }
  if(!a || !a.length) return false;
  var freed=false;
  for(var i=a.length-1;i>=0;i--){ if(a[i].ans){ delete a[i].ans; freed=true; if(a.length-i>40) break; } }
  if(!freed && a.length>120){ a=a.slice(0,120); freed=true; }
  if(!freed) return false;
  try{ localStorage.setItem("chew:results", JSON.stringify(a)); RES=null; return true; }
  catch(e){ return false; }
}
function SJ(k,d){ try{ var v=JSON.parse(localStorage.getItem("chew:"+k)); return (v===null||v===undefined)?d:v; }catch(e){ return d; } }
function WJ(k,v){ if(k==="results") RES=null; return W(k, JSON.stringify(v)); }

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
/* Anything deleted on any device is deleted on all of them. Merging two lists
   is a union, so without this the device that had not heard about a deletion
   handed the entry straight back on the next sync and it never stayed gone. */
function dropGone(){
  var g=seedGone(); if(!g.length) return;
  var bad={}; g.forEach(function(id){ bad[id]=1; });
  ["events","acts"].forEach(function(k){
    var a=SJ(k,[]), keep=a.filter(function(x){ return !bad[x.id]; });
    if(keep.length!==a.length) WJ(k, keep);
  });
}
/* Growth readings can arrive from data.js too - a photo of the bathroom scale
   gets read and typed in there rather than on the tablet.

   This is NOT mergeSeed, on purpose. mergeSeed treats data.js as the truth and
   rewrites the device copy whenever the two differ, which is right for a
   school-set event and wrong for a measurement: correcting a number on the
   iPad has to stick. So a seeded reading is only ever ADDED, never rewritten,
   and it comes in with ts:0 so any later edit wins the merge outright.

   Both tombstones are honoured. seedgone covers the seeded lists, and struck
   is what the delete button on a reading writes - miss either and a reading
   deleted on the tablet reappears on the next open. And a seed is skipped if
   that child already has a reading on that date, which keeps the one-a-day
   rule the form enforces. */
function seedGrow(){
  if(typeof SEED_GROW==="undefined" || !SEED_GROW.length) return;
  var gone=seedGone(), t=tombs(), by={};
  SEED_GROW.forEach(function(r){ (by[r.who]=by[r.who]||[]).push(r); });
  Object.keys(by).forEach(function(who){
    var key="grow:"+who, cur=SJ(key,[]), struck=t[key]||{},
        have={}, onDay={}, changed=false;
    cur.forEach(function(x){ have[x.id]=1; onDay[x.d]=1; });
    by[who].forEach(function(r){
      if(have[r.id] || onDay[r.d]) return;
      if(gone.indexOf(r.id)>=0 || struck[r.id]) return;
      cur.push({id:r.id, d:r.d,
                w:(r.w===undefined?"":r.w), h:(r.h===undefined?"":r.h), ts:0});
      onDay[r.d]=1; changed=true;
    });
    if(changed) WJ(key, cur);
  });
}
function seedOnce(){
  mergeSeed("events", SEED_EVENTS); mergeSeed("acts", SEED_ACTS);
  seedGrow(); dropGone();
}

var DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
/* Each tab keeps its own colour, so the eye learns where things live. */
/* Progress was removed: Training already shows every score in the same boxes,
   and Sync now sits at the foot of Training. Old #progress links land on
   Training rather than nowhere. */
var TABS = [["home","Upcoming","t1"],["schedule","Timetable","t2"],
            ["meals","Meals","t3"],["grow","Growth","t8"],
            ["forums","Forums","t7"],
            ["practice","Training","t4"],
            ["reading","Reading","t6"],["links","School","t5"]];
var tab="home", quiz=null, showAdd=false;
/* The paper dictation sheet: not a quiz, because nothing on it is answered on
   the screen. Dad reads, he writes on paper, and there is no score to keep. */
var paper=null;
/* Each tab gets a readable address, e.g. .../chewtopia/#meals, so a link can
   be bookmarked or sent straight to one screen. */
var SLUGS = {home:"upcoming", schedule:"timetable", meals:"meals",
             grow:"growth", forums:"forums", practice:"training",
             reading:"reading",
             links:"school"};
function tabFromHash(){
  var h=(location.hash||"").replace(/^#\/?/,"").toLowerCase();
  for(var k in SLUGS){ if(SLUGS[k]===h) return k; }
  if(h==="progress") return "practice";      /* old bookmarks still work */
  return null;
}
function go(id, quiet){
  /* A name nothing can draw used to blank the screen and leave "#undefined" in
     the address bar, with no way back except tapping a tab. */
  if(!SLUGS[id]) id="home";
  /* Everything a screen was left in the middle of. wkOff was missed, so
     browsing four weeks ahead on the Timetable, going to Meals and coming
     back landed you four weeks ahead again with no way to tell why. */
  tab=id; quiz=null; paper=null; showAdd=false; showBook=false; wkOff=0; hush();
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
/* Quotes matter as much as angle brackets: nearly every use of this is inside
   an attribute, and a title carrying a straight quote would otherwise close it
   and hand the rest of the string to the browser as markup. */
function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;")
  .replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"); }
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
/* Day and month, plus the year when it is not this one — "25 Dec" a year and a
   half out reads as this December unless it says otherwise. */
function dfull(i){
  var d=new Date(i+"T00:00:00");
  return dnum(i)+" "+dmon(i)+(d.getFullYear()!==new Date().getFullYear()
    ? " "+d.getFullYear() : "");
}
var ft={};
function flash(id){ var e=document.getElementById(id); if(!e) return;
  e.textContent="Saved"; clearTimeout(ft[id]); ft[id]=setTimeout(function(){e.textContent="";},1100); }
function grow(t){ t.style.height="auto"; t.style.height=(t.scrollHeight)+"px"; }

/* A real shuffle. sort(() => Math.random()-0.5) looks like one but is not: the
   comparator is inconsistent, so the first few items barely move and a list
   comes out in nearly the order it went in. Fisher-Yates gives every order the
   same chance, which is the whole point of not learning a list by its order. */
function shuffled(a){
  var o=(a||[]).slice();
  for(var i=o.length-1;i>0;i--){
    var j=Math.floor(Math.random()*(i+1)), t=o[i]; o[i]=o[j]; o[j]=t;
  }
  return o;
}

/* The last few goes at one test, oldest first — enough to see whether he is
   closing in on full marks or still bouncing around. */
function lastRuns(t, kid, n){
  return runsFor(kid).filter(function(r){ return r.test===t; }).slice(-(n||3));
}
function avgLast(t, kid, n){
  var a=lastRuns(t, kid, n||3);
  if(a.length<2) return null;                /* one go is not an average */
  var sc=0, tot=0;
  a.forEach(function(r){ sc+=r.score; tot+=r.total||0; });
  var out=Math.round(sc/a.length*10)/10;
  return {n:a.length, avg:out, total:Math.round(tot/a.length),
          pct:tot?Math.round(sc/tot*100):0,
          scores:a.map(function(r){ return r.score; }),
          full:a.every(function(r){ return r.score>=r.total; })};
}

function uuid(){
  if(window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(ch){
    var r=Math.random()*16|0; return (ch==="x"?r:(r&0x3|0x8)).toString(16); });
}

/* Every box on Training asks for the last score, the best score and the last
   three goes, and each of those used to re-read and re-parse the whole run
   history out of localStorage. Drawing the screen once did that 133 times over
   a 49KB string — about a sixth of a second of nothing, on every single tap
   inside a Chinese test. It is parsed once now and thrown away the moment
   anything writes to it. */
var RES=null;
function results(){ if(!RES) RES=SJ("results",[]); return RES; }
/* The paper sheets keep no score \u2014 nothing on them is marked in the app \u2014 but
   a date is worth having, or the box can never say whether it has been done. */
function readOut(code){ return S("paper:"+code,""); }
function markReadOut(code){ W("paper:"+code, todayISO()); }
/* Nothing produces hand-marked runs any more — 华文 is typed for both boys.
   An unmarked run has no real score, and lastFor() was showing it as 0, so any
   left over from the handwriting days are dropped rather than counted. */
function dropUnmarked(){
  var a=results(), keep=a.filter(function(r){ return !r.pend; });
  if(keep.length!==a.length) WJ("results", keep);
}
function addResult(r){
  if(!r.id) r.id=uuid();
  r.up=0;                                  /* not yet uploaded */
  var a=results(); a.unshift(r);
  /* Handwriting pictures are heavy, so only the last 20 runs keep theirs.
     Everything older keeps its score, just not the pictures. */
  var seen=0;
  a.forEach(function(x){ if(x.ans){ seen++; if(seen>20) delete x.ans; } });
  WJ("results", a.slice(0,600));
  /* Straight up to the cloud, if signed in — but as a full two-way sync. It
     used to push only, which sent this device's lists up without bringing the
     other device's down first, so a tablet that had been asleep for a week
     wiped the reading log and the events the phone had added. */
  autoSend();
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
/* What went wrong on the way DOWN. The way up already had this; without the
   matching half, a device that could not read the cloud but could still write
   to it said "Synced" and looked perfectly healthy. */
function pullErr(){ return S("pullerr",""); }
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
  function pullFailed(msg, note){
    syncBusy=false; W("pullerr", msg||"no connection");
    if(!quiet) setNote(note+" \u00b7 "+(msg||"no connection"));
    done(0);
  }
  c.from("results").select("*").then(function(r){
    if(r.error) return pullFailed(r.error.message, "Could not get the scores");
    var local=results(), byId={}, added=0, fixed=0;
    local.forEach(function(x){ if(x.id) byId[x.id]=x; });
    (r.data||[]).forEach(function(row){
      var mine=byId[row.id];
      if(!mine){
        added++;
        local.push({id:row.id, who:row.child_id, code:row.test_code, test:row.test_name,
                    score:row.score, total:row.total,
                    ts:new Date(row.completed_at).getTime(), up:1});
        return;
      }
      /* A score changed here and not sent yet wins \u2014 it is the newer one.
         Otherwise the cloud copy is the truth, so a run re-marked on the other
         device turns up here instead of staying wrong on this one forever. */
      if(!mine.up) return;
      if(mine.score!==row.score || mine.total!==row.total){
        mine.score=row.score; mine.total=row.total; fixed++;
      }
      mine.up=1;
    });
    local.sort(function(a,b){ return b.ts-a.ts; });
    WJ("results", local.slice(0,600));
    /* pulledOnce used to be set right here, on the SCORES having come down.
       But it is the lists \u2014 books, events, the tricky-ones bank \u2014 that a
       push replaces wholesale, and those live in the state table, which is
       read a moment later and can fail on its own. Setting the flag before
       that read meant a blocked state read still let this device push its
       un-merged lists over the other device's. It is set where it is earned. */
    pullState(function(stMsg, stOK){
      syncBusy=false;
      /* The scores came down \u2014 that select succeeded to get here. Only the
         extras did not, which is a different and much smaller thing, so it
         must not be reported as a failed sync. pullerr is for the scores. */
      W("pullerr","");
      if(stOK) pulledOnce=true;
      if(!quiet) setNote("Got "+added+(added===1?" new score":" new scores")+
        (fixed?", "+fixed+" corrected":"")+stMsg+" \u00b7 "+stamp());
      done(added+fixed);
    });
  }, function(e){ pullFailed((e&&e.message)||"no connection", "Could not sync"); });
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
  function marchOn(){
    var sent={}; todo.forEach(function(x){ sent[x.id]=1; });
    var l=results(); l.forEach(function(x){ if(sent[x.id]) x.up=1; });
    WJ("results", l);
    afterResults();
  }
  function giveUp(msg){
    syncBusy=false;
    W("syncerr", msg||"no connection");
    /* cloudSync writes the one line the screen shows; this ignored quiet
       and overwrote it with a longer version of the same news. */
    if(!quiet) setNote("Could not send · "+(msg||"no connection"));
    done(0);
  }
  /* Sending a score twice has to update the row, not be quietly dropped, or a
     score corrected on one device stays wrong on every other one forever.
     Updating needs more permission than inserting though, and not every
     database is set up to grant it — so if the update is refused, fall back to
     insert-only. New scores always get up; only corrections have to wait. */
  c.from("results").upsert(rows,{onConflict:"id"}).then(function(r){
    if(!r.error){ W("syncerr",""); marchOn(); return; }
    var m=String(r.error.message||"");
    var refused=/row-level security|permission|denied|policy|not allowed|42501/i.test(m);
    if(!refused) return giveUp(m);
    c.from("results").upsert(rows,{onConflict:"id", ignoreDuplicates:true}).then(function(r2){
      if(r2.error) return giveUp(r2.error.message);
      W("syncerr","insert-only");     /* up, but this table cannot take a correction */
      marchOn();
    }, function(e2){ giveUp((e2&&e2.message)||"no connection"); });
  }, function(e){ giveUp((e&&e.message)||"no connection"); });
}
/* What went wrong last time, so the screen can say so rather than sit there
   with a number that never goes down. */
function syncErr(){ return S("syncerr",""); }

/* ---------- the rest: mistakes, books, events, activities ---------- */
/* "seedgone" is the list of school-set events that were removed in the app.
   It used to be listed here as "gone", which is not a key anything writes, so
   an event deleted on the iPad came straight back on the phone. */
/* grow:* rides the same machinery as everything else here: keyed by id, so
   mergeList unions it and strike()/dropStruck() make a deletion stick. A year
   of measurements is exactly the kind of thing that must not live on one
   tablet, which is why it syncs and the meal plan does not. */
var STATE_KEYS=["weak:tc","weak:sc","books:tc","books:sc","events","acts",
                "seedgone","grow:tc","grow:sc"];
function stateIdent(k){ return k.indexOf("weak:")===0 ? "k" : "id"; }

/* ---------- tombstones ----------
   Merging two lists is a union, so a plain delete never sticks: the device
   that had not heard about it hands the entry straight back on the next sync.
   Events and activities already had "seedgone". Books and the tricky-ones bank
   did not, so a book struck off the reading log came back every single time,
   and a tricky-one cleared by two clean goes came back at its worst count.
   One list of what has been struck off, synced like everything else. */
function tombs(){ return SJ("struck",{}); }
function strike(key, id){
  var t=tombs(); (t[key]=t[key]||{})[id]=Date.now(); WJ("struck", t);
}
/* Anything struck off, taken back out after every merge. */
function dropStruck(){
  var t=tombs();
  Object.keys(t).forEach(function(key){
    var ids=t[key], a=SJ(key,null); if(!a || !a.length) return;
    var idf=stateIdent(key);
    var keep=a.filter(function(x){ return !ids[x[idf]]; });
    if(keep.length!==a.length) WJ(key, keep);
  });
}
/* Two devices each keep their own strike list; the union is the truth. */
function mergeTombs(far){
  var mine=tombs(), touched=false;
  Object.keys(far||{}).forEach(function(key){
    var m=(mine[key]=mine[key]||{});
    Object.keys(far[key]||{}).forEach(function(id){
      if(!m[id]){ m[id]=far[key][id]; touched=true; }
    });
  });
  if(touched) WJ("struck", mine);
  return mine;
}
/* Nothing goes up until something has come down this session. Sending our
   lists first would hand a week-old tablet the last word over everything. */
var pulledOnce=false;
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
/* The state table is optional: scores live in their own table and sync without
   it, so a failure here is a setup gap rather than a broken sync.
   "stateerr" is written but nothing shows it any more \u2014 the panel was cut back
   to saying only whether the scores synced. It is left as a breadcrumb: when
   the books and events are not travelling between devices, localStorage
   chew:stateerr holds the server's own words for why, which is the difference
   between a missing table and a missing policy. */
function pullState(done){
  var c=sbc();
  if(!c||!cloudUser) return done("", false);
  c.from("state").select("*").then(function(r){
    if(r.error){ W("stateerr", r.error.message||"the state table could not be read");
                 return done(", the rest needs the state table", false); }
    var remote={};
    (r.data||[]).forEach(function(row){ remote[row.k]=row.v; });
    /* strike lists first, so the merge below never re-adds something that this
       device or the other one has already struck off */
    mergeTombs(remote["struck"]);
    var touched=0;
    STATE_KEYS.forEach(function(k){
      var far=remote[k];
      /* older devices wrote the deleted-events list under "gone" */
      if(k==="seedgone" && far===undefined) far=remote["gone"];
      if(far===undefined) return;
      var mine=SJ(k,[]);
      var merged = k==="seedgone" ? uniq(mine.concat(far||[]))
                                  : mergeList(mine, far, stateIdent(k));
      if(JSON.stringify(merged)!==JSON.stringify(mine)) touched++;
      WJ(k, merged);
    });
    dropGone();                 /* a union puts deleted entries back; take them out again */
    dropStruck();               /* and the same for books and the tricky-ones bank */
    W("stateerr","");
    done(touched?", plus the rest":"", true);
  }, function(e){ W("stateerr", (e&&e.message)||"no connection");
                  done(", the rest could not be reached", false); });
}
function pushState(done){
  var c=sbc();
  if(!c||!cloudUser) return done("");
  /* Never send up before something has come down: our lists would replace the
     other device's rather than join them. */
  if(!pulledOnce) return done("");
  var now=new Date().toISOString();
  var rows=STATE_KEYS.map(function(k){
    return {user_id:cloudUser.id, k:k, v:SJ(k,[]), updated_at:now};
  });
  rows.push({user_id:cloudUser.id, k:"struck", v:tombs(), updated_at:now});
  c.from("state").upsert(rows,{onConflict:"user_id,k"}).then(function(r){
    if(r.error){ W("stateerr", r.error.message||"the state table would not take a write");
                 return done(", the rest needs the state table"); }
    W("stateerr",""); done(", plus the rest");
  }, function(e){ W("stateerr",(e&&e.message)||"no connection");
                  done(", the rest could not be sent"); });
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
      /* One line: did it sync or not. The scores are the sync \u2014 they are what
         the panel counts and what the boys earn. The optional state table
         failing takes the extras with it but leaves the scores correct, so it
         is not a failure to report here. Never claim success over a real one
         though, in either direction: fifteen scores once piled up unsent on
         one device because the note said "nothing new" instead of "stuck". */
      var err=syncErr(), down=pullErr();
      if(err && err!=="insert-only"){ setNote("Not synced \u00b7 "+stamp()); return; }
      if(down){ setNote("Not synced \u00b7 "+stamp()); return; }
      setNote("Synced \u00b7 "+stamp());
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
function delBook(w, id){
  strike("books:"+w, id);       /* or the next sync hands it straight back */
  WJ("books:"+w, books(w).filter(function(b){ return b.id!==id; }));
}
function booksSince(w, days){
  var cut=Date.now()-days*86400000;
  return books(w).filter(function(b){ return b.ts>=cut; });
}

/* ---------- child pickers ---------- */
/* Training always needs one child. The timetable can also show both. */
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
/* ==========================================================================
   PINYIN WITH ITS TONE MARK
   The banks store the tone as a trailing digit, because that is how the school
   writes it and how he types it. shou4 is not wrong, but it is not what the
   book prints either \u2014 the book prints sh\u00f2u, and the mark belongs on one
   particular letter.

   Where it goes is settled, not a matter of taste:
     an "a" always takes it        h\u01ceo, ku\u00e0i, ji\u0101ng
     otherwise an "o" or an "e"    sh\u00f2u, xu\u00e9, w\u01d2   (o and e never share a syllable)
     otherwise the last vowel      ji\u00f9, gu\u00ec, q\u00f9
   That last rule is the one people get wrong: in "iu" it is the u, in "ui" it
   is the i, because the mark follows whichever vowel comes second.
   ========================================================================== */
var TONED={
  a:"\u0101\u00e1\u01ce\u00e0", o:"\u014d\u00f3\u01d2\u00f2", e:"\u0113\u00e9\u011b\u00e8",
  i:"\u012b\u00ed\u01d0\u00ec", u:"\u016b\u00fa\u01d4\u00f9", "\u00fc":"\u01d6\u01d8\u01da\u01dc"
};
function pinyinMark(a, tone){
  var w=String(a==null?"":a), t=String(tone==null?"":tone);
  /* no tone recorded, or a whole phrase with one tone between them all: leave
     it alone rather than guess which syllable the mark belongs to */
  if(!/^[1-4]$/.test(t) || /\s/.test(w)) return w;
  var i, at=-1;
  if((i=w.indexOf("a"))>=0) at=i;
  else if((i=w.indexOf("o"))>=0) at=i;
  else if((i=w.indexOf("e"))>=0) at=i;
  else { for(i=w.length-1;i>=0;i--){ if("iu\u00fcv".indexOf(w.charAt(i))>=0){ at=i; break; } } }
  if(at<0) return w;                       /* no vowel to put it on */
  var ch=w.charAt(at); if(ch==="v") ch="\u00fc";
  var set=TONED[ch];
  if(!set) return w;
  return w.slice(0,at)+set.charAt(+t-1)+w.slice(at+1);
}
/* The book's spelling and the one he types, together: sh\u00f2u \u00b7 shou4 */
function pinyinBoth(a, tone){
  var m=pinyinMark(a,tone), plain=String(a||"")+String(tone||"");
  return m===String(a||"") ? plain : m+" \u00b7 "+plain;
}

function weakKey(it){ return it.k+"|"+(it.h||it.a||it.q||it.s||""); }
/* The question, without whatever the screen decorated it with last time. */
function bareItem(it){
  var o={}; Object.keys(it||{}).forEach(function(f){
    if(f!=="tiles" && f!=="opts") o[f]=it[f]; });
  return o;
}
function unstrike(key, id){
  var t=tombs(); if(!t[key] || !t[key][id]) return;
  delete t[key][id]; WJ("struck", t);
}
function weakAll(w){ return SJ("weak:"+(w||who()), []); }
function weakAdd(it, code){ return weakAddFor(who(), it, code); }
function weakAddFor(w, it, code){
  /* Missed again after having been cleared: it is a tricky one once more, so
     the strike has to be lifted or the next merge would delete it again. */
  unstrike("weak:"+w, weakKey(it));
  var a=weakAll(w), k=weakKey(it), hit=null;
  a.forEach(function(x){ if(x.k===k) hit=x; });
  if(hit){ hit.n++; hit.ts=Date.now(); }
  /* Bank the question, never the four tiles it happened to be shown with.
     Those are cached on the item so they do not jump about mid-question;
     stored, they made every replay of a tricky one identical, so it could be
     learnt by the shape of the row rather than by the character. */
  else a.push({k:k, n:1, ts:Date.now(), it:bareItem(it), code:code||""});
  WJ("weak:"+w, a.slice(-120));
}
function weakDrop(it){
  var w=who(), k=weakKey(it), a=weakAll(w), out=[], cleared=false;
  a.forEach(function(x){
    if(x.k!==k){ out.push(x); return; }
    x.n--; if(x.n>0) out.push(x); else cleared=true;   /* two clean goes clears it */
  });
  /* Merging takes the higher count, so without this the other device simply
     handed it back at its worst and the bank never emptied. */
  if(cleared) strike("weak:"+w, k);
  WJ("weak:"+w, out);
}
function weakTop(w, n){
  return weakAll(w).slice().sort(function(a,b){
    return (b.n-a.n) || (b.ts-a.ts);
  }).slice(0, n||5);
}
/* Every Chinese question now arrives as k:"bd" — the build-it mechanic — so
   this fell through to it.a and printed the raw pinyin, or to it.s and printed
   a whole 听写 sentence. "Keeps getting these wrong" read
   "pin, wan, 识 · 认识, 昨天□上，我□见妈妈…" instead of naming four characters. */
function weakLabel(x){
  var it=x.it||{};
  /* A maths chip wants the sum, not the sentence around it: "What goes in the
     blank?  10 × ___ = 80" is most of a line for one item in a list of twenty. */
  if(it.k==="math"){
    var q=String(it.q||"").replace(/^[^?]*\?\s*/,"").replace(/\s+/g," ").trim();
    if(!q) q=String(it.q||"").trim();
    return q.length>28 ? q.slice(0,27)+"\u2026" : q;
  }
  if(it.k==="bd"){
    /* a 听写 sentence: name the characters, not the sentence */
    if(it.s) return String(it.h||"").split("").join(" ");
    return (it.h||"")+(it.word && it.word!==it.h ? " \u00b7 "+it.word : "");
  }
  if(it.k==="hz"||it.k==="rn"||it.k==="py"||it.k==="tx")
    return (it.h||"")+(it.word ? " \u00b7 "+it.word : "");
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
/* Every female voice these devices actually ship, by name, because the name is
   all the API gives us \u2014 SpeechSynthesisVoice has no gender field. This list
   was missing zira and hazel, which are the two commonest female voices on
   Windows: the app did not know they were women and they only ever won because
   the men scored worse. Grouped by where they come from so it stays addable. */
var FEM=new RegExp([
  /* The short ones are anchored on word boundaries. Unanchored, "mia" sits
     inside Damian and "eva" inside Evan, so an unknown male voice could have
     matched one and been read as a woman. */
  /* Apple */      "samantha|serena|karen|moira|tessa|fiona|allison|\\bava\\b|susan|nicky|\\bzoe\\b|kathy|vicki|victoria|agnes|princess|catherine|siri female",
  /* Windows */    "zira|hazel|heera|linda|\\beva\\b|hoda|caroline",
  /* Edge/Azure */ "aria|jenny|michelle|\\bana\\b|sonia|libby|maisie|natasha|clara|molly|\\bnova\\b|emily|amber|ashley|\\bcora\\b|elizabeth|monica|\\bsara\\b|\\bluna\\b|\\bmia\\b|abbi|bella|hollie|olivia",
  /* Google */     "female",
  /* generic */    "\\bwoman\\b",
  /* Mandarin */   "tingting|ting-ting|xiaoxiao|xiaoyi|xiaohan|xiaomo|xiaoxuan|xiaorui|xiaoshuang|xiaoqiu|xiaochen|xiaoyan|yaoyao|huihui|meijia|\u5a77\u5a77|\u6653\u6653|\u6653\u4f0a"
].join("|"), "i");
/* Mandarin voices worth having, best first. Tingting and Siri are iOS,
   Xiaoxiao and Yunxi are the Windows neural pair, Huihui is the old SAPI one. */
var CN_GOOD=/\u666e\u901a\u8bdd|tingting|xiaoxiao|xiaoyi|yunxi|yunyang|meijia|liangliang|kangkang|yaoyao/i;
var CN_OLD=/huihui/i;
var OLD=/zira|david|hazel|mark|george|james|ravi|desktop/i;
/* Anything obviously a man, so it is never picked while a woman is available */
var MALE=/\b(male|man|men)\b|daniel|\balex\b|fred|thomas|\bdavid\b|\bmark\b|george|james|oliver|arthur|\bryan\b|aaron|gordon|rishi|nathan|guy|davis|tony|jason|eric|roger|steffan|william|liam|brian|christopher|yunxi|yunyang|yunjian|yunfeng|yunhao|kangkang|liangliang|\u4e91\u5e0c|\u4e91\u626c/i;

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
/* A woman, by name, and not one that also reads as a man's. */
function femaleVoice(v){
  var n=(v&&v.name)||"";
  return !MALE.test(n) && FEM.test(n);
}
/* A woman reads the tests. Preferring one with a score was not enough: it only
   took +200 on a scale where a neural voice takes +100 and the right accent
   +30, so a slick male voice could still come out on top of a plain female
   one. Now it is a rule, not a weight \u2014 if the device has a female voice for
   this language at all, one of them is used, and the rest of the ranking only
   decides which. A male voice is the last resort, not a near miss. */
function bestVoice(lang){
  var o=langVoices(lang);
  for(var i=0;i<o.length;i++){ if(femaleVoice(o[i])) return o[i]; }
  return o[0] || null;      /* nothing identifiably female: better than silence */
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
