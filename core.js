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
  mergeSeed("songs", SEED_SONGS);
  seedGrow(); dropGone();
}

var DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
/* Each tab keeps its own colour, so the eye learns where things live. */
/* Progress was removed: Training already shows every score in the same boxes,
   and Sync now sits at the foot of Training. Old #progress links land on
   Training rather than nowhere. */
var TABS = [["home","Upcoming","t1"],["schedule","Timetable","t2"],
            ["meals","Health","t3"],["forums","Forums","t7"],
            ["practice","Training","t4"],
            ["berries","Berries","t9"],["quiz","Quiz","t6"],
            ["fun","Fun","t8"],["links","School","t5"]];
var tab="home", quiz=null, showAdd=false;
/* The paper dictation sheet: not a quiz, because nothing on it is answered on
   the screen. Dad reads, he writes on paper, and there is no score to keep. */
var paper=null;
/* A run at one of the four quiz ladders — spelling, maths, science, 华文.
   Its own state rather than quiz's, because a ladder has no fixed list of items
   and no mark out of ten: it ends when he runs out of lives, and what it
   reports is the rung he cleared. */
var climb=null;
/* Each tab gets a readable address, e.g. .../chewtopia/#meals, so a link can
   be bookmarked or sent straight to one screen. */
var SLUGS = {home:"upcoming", schedule:"timetable", meals:"health",
             forums:"forums", practice:"training", berries:"berries",
             quiz:"quiz", fun:"fun", links:"school"};
function tabFromHash(){
  var h=(location.hash||"").replace(/^#\/?/,"").toLowerCase();
  for(var k in SLUGS){ if(SLUGS[k]===h) return k; }
  if(h==="progress") return "practice";      /* old bookmarks still work */
  /* #reading was a tab of its own until build 142. The book log it pointed at
     is at the foot of Training now, so that is where the old address goes. */
  if(h==="reading") return "practice";
  /* This screen has been called Meals, then Growth & Meals, then Health.
     Every address it has ever had still lands on it. */
  if(h==="meals"||h==="growth") return "meals";
  return null;
}
function go(id, quiet){
  /* A name nothing can draw used to blank the screen and leave "#undefined" in
     the address bar, with no way back except tapping a tab. */
  if(!SLUGS[id]) id="home";
  /* Everything a screen was left in the middle of. wkOff was missed, so
     browsing four weeks ahead on the Timetable, going to Meals and coming
     back landed you four weeks ahead again with no way to tell why. */
  tab=id; quiz=null; paper=null; climb=null; showAdd=false; showBook=false; wkOff=0; hush();
  songOpen=""; songEdit=""; showSong=false;
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

/* ==========================================================================
   RUNG PICTURES — one flat drawing per topic on the science ladders.

   Drawn here in SVG rather than fetched as images: there is no build step and
   no image folder, and a quiz that needs the network is a quiz that fails on
   the school wifi. Same house style as the mascots above — a viewBox, flat
   fills, no gradients, nothing that needs a font.

   One rule keeps them honest: a picture illustrates the topic, never the
   question. It is the same drawing for all six questions on a rung, so it
   cannot hand an answer over, and it is aria-hidden because a card that never
   draws it must lose nothing — the question has to read on its own. That is
   also why the language ladders have no pictures: a picture of what a word
   means is the answer to "what does this word mean".
   ========================================================================== */
var QPIC = {
  /* --- biology --- */
  creatures:
    '<path d="M2 66 q12 -5 24 0 t24 0 t24 0 t24 0 t24 0" stroke="#BBD7FA" stroke-width="3" fill="none" stroke-linecap="round"/>'+
    '<path d="M40 40 L49 32 L51 43 Z" fill="#1E5FC4"/>'+
    '<ellipse cx="40" cy="52" rx="21" ry="12" fill="#2F73E8"/>'+
    '<path d="M19 52 L5 43 L5 61 Z" fill="#2F73E8"/>'+
    '<circle cx="52" cy="49" r="3.4" fill="#fff"/><circle cx="53" cy="49" r="1.6" fill="#16222E"/>'+
    '<path d="M80 44 l-3 9 M90 44 l3 9" stroke="#E09A00" stroke-width="3" stroke-linecap="round"/>'+
    '<circle cx="85" cy="30" r="15" fill="#FFB627"/>'+
    '<ellipse cx="79" cy="34" rx="8" ry="6" fill="#E09A00"/>'+
    '<path d="M99 27 L111 31 L99 35 Z" fill="#FF6F52"/>'+
    '<circle cx="91" cy="24" r="2.6" fill="#16222E"/>',
  sprout:
    '<circle cx="100" cy="16" r="11" fill="#FFB627"/>'+
    '<path d="M18 22 q7 7 0 14 q-7 -7 0 -14z" fill="#2F73E8"/>'+
    '<rect x="8" y="58" width="104" height="16" rx="7" fill="#E8D5BE"/>'+
    '<path d="M60 60 v-22" stroke="#4FB86B" stroke-width="4" stroke-linecap="round"/>'+
    '<path d="M60 46 q-15 -4 -17 -15 q15 0 17 15z" fill="#4FB86B"/>'+
    '<path d="M60 42 q15 -4 17 -15 q-15 0 -17 15z" fill="#2C7A46"/>',
  plant:
    '<rect x="4" y="56" width="112" height="22" rx="7" fill="#F3E3CE"/>'+
    '<path d="M60 56 v10 M60 62 l-11 11 M60 62 l11 11 M60 69 l-6 6 M60 69 l6 6" stroke="#C79A63" stroke-width="2.5" fill="none" stroke-linecap="round"/>'+
    '<path d="M60 58 v-30" stroke="#4FB86B" stroke-width="4"/>'+
    '<path d="M60 50 q-16 -3 -18 -14 q16 0 18 14z" fill="#4FB86B"/>'+
    '<path d="M60 44 q16 -3 18 -14 q-16 0 -18 14z" fill="#2C7A46"/>'+
    '<g fill="#FF6F52"><circle cx="60" cy="13" r="7"/><circle cx="70" cy="20" r="7"/><circle cx="66" cy="31" r="7"/><circle cx="54" cy="31" r="7"/><circle cx="50" cy="20" r="7"/></g>'+
    '<circle cx="60" cy="22" r="6" fill="#FFB627"/>',
  butterfly:
    '<g fill="#4FB86B"><circle cx="11" cy="54" r="7"/><circle cx="22" cy="54" r="7"/><circle cx="33" cy="54" r="7"/></g>'+
    '<circle cx="44" cy="53" r="8" fill="#2C7A46"/>'+
    '<circle cx="47" cy="50" r="2.2" fill="#fff"/>'+
    '<path d="M58 52 h12 M66 48 l5 4 l-5 4" stroke="#B8C9DA" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
    '<path d="M87 36 q-24 -21 -27 1 q-3 16 27 7z" fill="#7C5CE0"/>'+
    '<path d="M87 46 q-19 -1 -20 13 q-1 11 20 -2z" fill="#A78BFA"/>'+
    '<path d="M91 36 q24 -21 27 1 q3 16 -27 7z" fill="#7C5CE0"/>'+
    '<path d="M91 46 q19 -1 20 13 q1 11 -20 -2z" fill="#A78BFA"/>'+
    '<rect x="86" y="26" width="6" height="34" rx="3" fill="#16222E"/>'+
    '<path d="M87 27 l-6 -9 M91 27 l6 -9" stroke="#16222E" stroke-width="2" stroke-linecap="round"/>',
  habitat:
    '<rect x="0" y="56" width="120" height="24" fill="#DFF3E4"/>'+
    '<circle cx="104" cy="15" r="10" fill="#FFB627"/>'+
    '<ellipse cx="90" cy="66" rx="24" ry="9" fill="#9CD3F5"/>'+
    '<rect x="32" y="36" width="9" height="24" rx="3" fill="#A9743F"/>'+
    '<circle cx="24" cy="36" r="11" fill="#2C7A46"/><circle cx="48" cy="36" r="11" fill="#2C7A46"/>'+
    '<circle cx="36" cy="26" r="16" fill="#4FB86B"/>',
  foodchain:
    '<path d="M4 48 q9 -19 27 -15 q-2 19 -27 15z" fill="#4FB86B"/>'+
    '<path d="M36 42 h11 M43 38 l5 4 l-5 4" stroke="#B8C9DA" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
    '<g fill="#7ABF5A"><circle cx="55" cy="44" r="5.5"/><circle cx="63" cy="44" r="5.5"/></g>'+
    '<circle cx="71" cy="43" r="6" fill="#2C7A46"/>'+
    '<path d="M80 42 h11 M87 38 l5 4 l-5 4" stroke="#B8C9DA" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
    '<circle cx="104" cy="42" r="13" fill="#FFB627"/>'+
    '<path d="M117 39 L120 42 L117 45 Z" fill="#FF6F52"/>'+
    '<circle cx="108" cy="38" r="2.4" fill="#16222E"/>',
  chameleon:
    '<rect x="4" y="60" width="112" height="7" rx="3.5" fill="#A9743F"/>'+
    '<path d="M34 48 q-22 2 -18 15 q3 9 13 4" stroke="#4FB86B" stroke-width="7" fill="none" stroke-linecap="round"/>'+
    '<path d="M46 54 v8 M70 54 v8" stroke="#2C7A46" stroke-width="6" stroke-linecap="round"/>'+
    '<ellipse cx="58" cy="44" rx="25" ry="13" fill="#4FB86B"/>'+
    '<circle cx="85" cy="38" r="12" fill="#7ABF5A"/>'+
    '<circle cx="89" cy="35" r="3.6" fill="#16222E"/>'+
    '<path d="M96 54 q13 -15 23 -8 q-5 15 -23 8z" fill="#2C7A46"/>',
  cells:
    '<circle cx="34" cy="32" r="17" fill="#E8F2FE" stroke="#2F73E8" stroke-width="3"/>'+
    '<circle cx="34" cy="32" r="6" fill="#2F73E8"/>'+
    '<circle cx="74" cy="44" r="14" fill="#E8F2FE" stroke="#2F73E8" stroke-width="3"/>'+
    '<circle cx="74" cy="44" r="5" fill="#2F73E8"/>'+
    '<circle cx="96" cy="21" r="11" fill="#E8F2FE" stroke="#2F73E8" stroke-width="3"/>'+
    '<circle cx="96" cy="21" r="4" fill="#2F73E8"/>'+
    '<rect x="12" y="60" width="28" height="11" rx="5.5" fill="#FF6F52"/>'+
    '<path d="M40 65 q11 2 15 -5" stroke="#FF6F52" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
  photo:
    '<circle cx="19" cy="18" r="10" fill="#FFB627"/>'+
    '<g stroke="#FFB627" stroke-width="2.5" stroke-linecap="round"><path d="M19 3 v4 M6 8 l3 3 M32 8 l-3 3 M3 18 h4 M31 18 h4 M8 30 l3 -3"/></g>'+
    '<path d="M33 27 l17 10 M46 33 l5 5 l-7 1" stroke="#E09A00" stroke-width="3" fill="none" stroke-linecap="round"/>'+
    '<path d="M70 10 q27 20 0 56 q-27 -36 0 -56z" fill="#4FB86B"/>'+
    '<path d="M70 14 v48" stroke="#2C7A46" stroke-width="2"/>'+
    '<path d="M70 26 l10 -6 M70 38 l10 -6 M70 50 l10 -6 M70 26 l-10 -6 M70 38 l-10 -6 M70 50 l-10 -6" stroke="#2C7A46" stroke-width="1.6"/>'+
    '<path d="M88 42 h18 M101 37 l6 5 l-6 5" stroke="#2F73E8" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  dna:
    '<g stroke="#FFB627" stroke-width="3.5" stroke-linecap="round"><path d="M46 14 h28"/><path d="M40 26 h40"/><path d="M40 54 h40"/><path d="M46 66 h28"/></g>'+
    '<path d="M38 6 q34 18 0 34 q-34 18 0 34" stroke="#2F73E8" stroke-width="5.5" fill="none" stroke-linecap="round"/>'+
    '<path d="M82 6 q-34 18 0 34 q34 18 0 34" stroke="#7C5CE0" stroke-width="5.5" fill="none" stroke-linecap="round"/>',

  /* --- physics --- */
  pushpull:
    '<rect x="4" y="64" width="112" height="5" rx="2.5" fill="#E1EAF2"/>'+
    '<rect x="42" y="30" width="36" height="32" rx="5" fill="#FFB627" stroke="#E09A00" stroke-width="2.5"/>'+
    '<path d="M6 46 h26 M27 40 l7 6 l-7 6" stroke="#4FB86B" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
    '<path d="M114 46 h-26 M93 40 l-7 6 l7 6" stroke="#FF6F52" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  magnet:
    '<path d="M34 54 v-16 a26 26 0 0 1 52 0 v16" stroke="#9FB3C8" stroke-width="15" fill="none"/>'+
    '<rect x="26" y="52" width="16" height="14" rx="2" fill="#FF6F52"/>'+
    '<rect x="78" y="52" width="16" height="14" rx="2" fill="#2F73E8"/>'+
    '<g stroke="#B8C9DA" stroke-width="4" stroke-linecap="round"><path d="M12 72 h14"/><path d="M96 72 h14"/><path d="M52 74 h16"/></g>',
  float:
    '<rect x="0" y="34" width="120" height="46" fill="#D6EEFB"/>'+
    '<path d="M0 34 q10 -5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0" stroke="#9CD3F5" stroke-width="3" fill="none"/>'+
    '<rect x="41" y="8" width="3.5" height="26" fill="#A9743F"/>'+
    '<path d="M47 10 v22 h18z" fill="#fff" stroke="#B8C9DA" stroke-width="2"/>'+
    '<path d="M20 34 h48 l-9 13 h-30z" fill="#FF6F52"/>'+
    '<ellipse cx="94" cy="64" rx="13" ry="10" fill="#7C8FA3"/>'+
    '<g fill="#fff" opacity=".8"><circle cx="90" cy="48" r="3"/><circle cx="98" cy="42" r="2.2"/><circle cx="92" cy="37" r="1.6"/></g>',
  shadow:
    '<rect x="0" y="62" width="120" height="5" fill="#E1EAF2"/>'+
    '<g stroke="#FFD98A" stroke-width="3" stroke-linecap="round"><path d="M28 14 L114 8"/><path d="M28 30 L114 56"/></g>'+
    '<circle cx="17" cy="22" r="11" fill="#FFB627"/>'+
    '<ellipse cx="94" cy="64" rx="22" ry="6" fill="#16222E" opacity=".22"/>'+
    '<circle cx="60" cy="40" r="15" fill="#2F73E8"/>',
  sound:
    '<path d="M44 46 q0 -26 16 -26 q16 0 16 26 z" fill="#FFB627"/>'+
    '<rect x="39" y="46" width="42" height="6" rx="3" fill="#E09A00"/>'+
    '<circle cx="60" cy="58" r="5" fill="#E09A00"/>'+
    '<g stroke="#2F73E8" stroke-width="3" fill="none" stroke-linecap="round">'+
      '<path d="M88 28 q8 12 0 24"/><path d="M98 20 q14 20 0 40"/>'+
      '<path d="M32 28 q-8 12 0 24"/><path d="M22 20 q-14 20 0 40"/></g>',
  thermo:
    '<rect x="43" y="6" width="15" height="52" rx="7.5" fill="#fff" stroke="#B8C9DA" stroke-width="3"/>'+
    '<rect x="46" y="28" width="9" height="32" fill="#FF6F52"/>'+
    '<circle cx="50.5" cy="64" r="12" fill="#FF6F52"/>'+
    '<g stroke="#B8C9DA" stroke-width="2" stroke-linecap="round"><path d="M60 16 h7 M60 24 h7 M60 32 h7 M60 40 h7"/></g>'+
    '<path d="M94 68 q-15 -11 -5 -26 q2 9 9 6 q-7 -15 6 -24 q0 15 11 22 q8 13 -6 22z" fill="#FF6F52"/>'+
    '<path d="M94 68 q-8 -6 -2 -15 q4 7 9 -2 q4 9 -6 17z" fill="#FFB627"/>',
  circuit:
    '<path d="M53 40 H16 V68 H44" stroke="#16222E" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
    '<path d="M67 40 H104 V68 H82" stroke="#16222E" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
    '<rect x="44" y="61" width="34" height="14" rx="3" fill="#4FB86B"/>'+
    '<rect x="78" y="64" width="6" height="8" rx="2" fill="#2C7A46"/>'+
    '<rect x="52" y="33" width="16" height="9" rx="2" fill="#B8C9DA"/>'+
    '<circle cx="60" cy="20" r="15" fill="#FFF1CE" stroke="#FFB627" stroke-width="3"/>'+
    '<path d="M55 30 v-5 q0 -4 5 -4 q5 0 5 4 v5" stroke="#E09A00" stroke-width="2.5" fill="none"/>'+
    '<g stroke="#FFB627" stroke-width="2.5" stroke-linecap="round"><path d="M60 0 v4 M40 6 l3 3 M80 6 l-3 3"/></g>',
  windmill:
    '<rect x="0" y="68" width="120" height="12" fill="#DFF3E4"/>'+
    '<circle cx="100" cy="16" r="11" fill="#FFB627"/>'+
    '<path d="M44 70 L50 28 L58 28 L64 70z" fill="#CBD6E2"/>'+
    '<g stroke="#7C8FA3" stroke-width="6" stroke-linecap="round"><path d="M54 26 V4"/><path d="M54 26 L33 40"/><path d="M54 26 L75 40"/></g>'+
    '<circle cx="54" cy="26" r="5" fill="#5E7183"/>',
  speed:
    '<g stroke="#B8C9DA" stroke-width="4" stroke-linecap="round"><path d="M4 32 h16"/><path d="M2 46 h13"/><path d="M6 58 h11"/></g>'+
    '<path d="M38 50 q5 -18 21 -18 h13 q13 0 19 18z" fill="#FF6F52"/>'+
    '<path d="M50 46 q4 -10 11 -10 h10 q9 0 13 10z" fill="#DDF1FB"/>'+
    '<rect x="28" y="48" width="76" height="13" rx="6.5" fill="#E85A3C"/>'+
    '<circle cx="45" cy="64" r="9" fill="#16222E"/><circle cx="45" cy="64" r="3.5" fill="#B8C9DA"/>'+
    '<circle cx="88" cy="64" r="9" fill="#16222E"/><circle cx="88" cy="64" r="3.5" fill="#B8C9DA"/>',
  space:
    '<g fill="#FFB627"><circle cx="14" cy="12" r="2.6"/><circle cx="106" cy="62" r="2.2"/><circle cx="22" cy="70" r="2"/></g>'+
    '<circle cx="50" cy="40" r="22" fill="#7C5CE0"/>'+
    '<circle cx="40" cy="32" r="6" fill="#5B41B8"/><circle cx="58" cy="48" r="4.5" fill="#5B41B8"/>'+
    '<ellipse cx="50" cy="40" rx="36" ry="10" fill="none" stroke="#FFB627" stroke-width="4" transform="rotate(-18 50 40)"/>'+
    '<circle cx="99" cy="20" r="9" fill="#E1EAF2"/>'+
    '<circle cx="95" cy="17" r="2.6" fill="#B8C9DA"/><circle cx="102" cy="24" r="2" fill="#B8C9DA"/>',

  /* --- chemistry --- */
  materials:
    '<rect x="6" y="22" width="32" height="36" rx="5" fill="#C79A63"/>'+
    '<g stroke="#A9743F" stroke-width="2.5" stroke-linecap="round"><path d="M12 31 h20 M12 40 h20 M12 49 h20"/></g>'+
    '<rect x="44" y="22" width="32" height="36" rx="5" fill="#DDF1FB" stroke="#9CD3F5" stroke-width="2.5"/>'+
    '<path d="M51 52 L69 28" stroke="#fff" stroke-width="5" stroke-linecap="round"/>'+
    '<rect x="82" y="22" width="32" height="36" rx="5" fill="#CBD6E2"/>'+
    '<circle cx="98" cy="40" r="10" fill="#fff" stroke="#9FB3C8" stroke-width="3"/>',
  states:
    '<rect x="8" y="20" width="30" height="44" rx="6" fill="#F2F7FC" stroke="#B8C9DA" stroke-width="2.5"/>'+
    '<rect x="15" y="42" width="16" height="16" rx="3" fill="#2F73E8"/>'+
    '<rect x="45" y="20" width="30" height="44" rx="6" fill="#F2F7FC" stroke="#B8C9DA" stroke-width="2.5"/>'+
    '<path d="M47 44 q7 -6 14 0 t14 0 v14 a5 5 0 0 1 -5 5 h-18 a5 5 0 0 1 -5 -5z" fill="#2F73E8"/>'+
    '<rect x="82" y="20" width="30" height="44" rx="6" fill="#F2F7FC" stroke="#B8C9DA" stroke-width="2.5"/>'+
    '<g fill="#2F73E8"><circle cx="90" cy="30" r="3"/><circle cx="102" cy="36" r="3"/><circle cx="94" cy="46" r="3"/><circle cx="105" cy="52" r="3"/><circle cx="88" cy="56" r="3"/></g>',
  melt:
    '<circle cx="100" cy="16" r="10" fill="#FFB627"/>'+
    '<ellipse cx="48" cy="70" rx="32" ry="7" fill="#9CD3F5"/>'+
    '<rect x="28" y="16" width="36" height="32" rx="5" fill="#DDF1FB" stroke="#9CD3F5" stroke-width="3"/>'+
    '<path d="M34 40 L50 22" stroke="#fff" stroke-width="4" stroke-linecap="round"/>'+
    '<path d="M38 54 q5 6 0 10 q-5 -5 0 -10z" fill="#2F73E8"/>'+
    '<path d="M56 58 q4 5 0 9 q-4 -4 0 -9z" fill="#2F73E8"/>',
  kettle:
    '<g stroke="#BBD7FA" stroke-width="4" fill="none" stroke-linecap="round">'+
      '<path d="M44 30 q-7 -9 0 -15 q7 -7 0 -13"/><path d="M66 30 q7 -9 0 -15 q-7 -7 0 -13"/></g>'+
    '<path d="M26 42 h58 v16 a9 9 0 0 1 -9 9 h-40 a9 9 0 0 1 -9 -9z" fill="#7C8FA3"/>'+
    '<path d="M84 48 q11 7 0 14" stroke="#5E7183" stroke-width="4" fill="none"/>'+
    '<rect x="22" y="36" width="66" height="7" rx="3.5" fill="#5E7183"/>'+
    '<circle cx="55" cy="33" r="4" fill="#5E7183"/>'+
    '<path d="M46 76 q-6 -6 0 -11 q2 5 5 0 q4 7 -1 11z" fill="#FF6F52"/>'+
    '<path d="M64 76 q-6 -6 0 -11 q2 5 5 0 q4 7 -1 11z" fill="#FF6F52"/>',
  dissolve:
    '<path d="M38 16 h44 l-5 50 a6 6 0 0 1 -6 6 h-22 a6 6 0 0 1 -6 -6z" fill="#DDF1FB" stroke="#9CD3F5" stroke-width="3"/>'+
    '<path d="M76 8 L60 44" stroke="#B8C9DA" stroke-width="4" stroke-linecap="round"/>'+
    '<ellipse cx="58" cy="48" rx="7" ry="4.5" fill="#CBD6E2" transform="rotate(-24 58 48)"/>'+
    '<g fill="#7C5CE0"><circle cx="50" cy="36" r="2.6"/><circle cx="64" cy="42" r="2.2"/><circle cx="54" cy="52" r="1.8"/><circle cx="68" cy="56" r="1.5"/><circle cx="46" cy="60" r="1.3"/></g>',
  filter:
    '<path d="M28 8 h46 l-17 24 v14 h-12 v-14z" fill="#DDF1FB" stroke="#9CD3F5" stroke-width="3"/>'+
    '<path d="M35 13 h32 l-16 19z" fill="#fff" stroke="#B8C9DA" stroke-width="2"/>'+
    '<g fill="#C79A63"><circle cx="45" cy="19" r="2.4"/><circle cx="53" cy="22" r="2"/><circle cx="49" cy="26" r="1.8"/></g>'+
    '<path d="M51 50 q4 5 0 9 q-4 -4 0 -9z" fill="#2F73E8"/>'+
    '<path d="M30 60 h42 v12 a5 5 0 0 1 -5 5 h-32 a5 5 0 0 1 -5 -5z" fill="#BBD7FA" stroke="#9CD3F5" stroke-width="3"/>',
  candle:
    '<rect x="45" y="36" width="30" height="40" rx="5" fill="#FFE9D2" stroke="#F0C89A" stroke-width="2.5"/>'+
    '<g stroke="#F0C89A" stroke-width="2.5" stroke-linecap="round"><path d="M45 50 h30 M45 62 h30"/></g>'+
    '<path d="M60 36 v-6" stroke="#16222E" stroke-width="2.5" stroke-linecap="round"/>'+
    '<path d="M60 30 q-11 -7 -4 -19 q2 7 7 2 q7 7 -3 17z" fill="#FF6F52"/>'+
    '<path d="M60 30 q-6 -5 -1 -11 q2 5 5 1 q3 6 -4 10z" fill="#FFB627"/>'+
    '<path d="M92 34 q-9 -9 0 -16 q9 -8 0 -15" stroke="#B8C9DA" stroke-width="3" fill="none" stroke-linecap="round"/>',
  ph:
    '<ellipse cx="26" cy="48" rx="19" ry="14" fill="#FFD84D"/>'+
    '<path d="M26 34 q7 -8 15 -6 q-3 8 -15 6z" fill="#4FB86B"/>'+
    '<g stroke="#E09A00" stroke-width="2" stroke-linecap="round"><path d="M26 48 L12 42 M26 48 L12 54 M26 48 L40 44 M26 48 L38 54"/></g>'+
    '<rect x="54" y="38" width="28" height="18" rx="7" fill="#BBD7FA"/>'+
    '<g fill="#DDF1FB"><circle cx="58" cy="28" r="5"/><circle cx="70" cy="22" r="3.5"/><circle cx="78" cy="30" r="4.5"/></g>'+
    '<rect x="88" y="20" width="9" height="40" rx="4" fill="#FF6F52"/>'+
    '<rect x="99" y="20" width="9" height="40" rx="4" fill="#4FB86B"/>'+
    '<rect x="110" y="20" width="9" height="40" rx="4" fill="#7C5CE0"/>',
  molecule:
    '<g stroke="#2F73E8" stroke-width="6"><path d="M58 42 L33 26"/><path d="M58 42 L86 28"/></g>'+
    '<circle cx="58" cy="42" r="21" fill="#2F73E8"/>'+
    '<circle cx="30" cy="24" r="12" fill="#E8F2FE" stroke="#2F73E8" stroke-width="3"/>'+
    '<circle cx="89" cy="26" r="12" fill="#E8F2FE" stroke="#2F73E8" stroke-width="3"/>'+
    '<circle cx="51" cy="35" r="5" fill="#5B93F0"/>',
  ptable:
    '<g fill="#E8F2FE" stroke="#BBD7FA" stroke-width="1.5">'+
      '<rect x="8" y="10" width="16" height="14" rx="2"/><rect x="26" y="10" width="16" height="14" rx="2"/>'+
      '<rect x="44" y="10" width="16" height="14" rx="2"/><rect x="62" y="10" width="16" height="14" rx="2"/>'+
      '<rect x="80" y="10" width="16" height="14" rx="2"/><rect x="98" y="10" width="16" height="14" rx="2"/>'+
      '<rect x="8" y="26" width="16" height="14" rx="2"/><rect x="26" y="26" width="16" height="14" rx="2"/>'+
      '<rect x="62" y="26" width="16" height="14" rx="2"/>'+
      '<rect x="80" y="26" width="16" height="14" rx="2"/><rect x="98" y="26" width="16" height="14" rx="2"/>'+
      '<rect x="8" y="42" width="16" height="14" rx="2"/><rect x="26" y="42" width="16" height="14" rx="2"/>'+
      '<rect x="44" y="42" width="16" height="14" rx="2"/><rect x="62" y="42" width="16" height="14" rx="2"/>'+
      '<rect x="98" y="42" width="16" height="14" rx="2"/>'+
      '<rect x="8" y="58" width="16" height="14" rx="2"/><rect x="26" y="58" width="16" height="14" rx="2"/>'+
      '<rect x="44" y="58" width="16" height="14" rx="2"/><rect x="62" y="58" width="16" height="14" rx="2"/>'+
      '<rect x="80" y="58" width="16" height="14" rx="2"/><rect x="98" y="58" width="16" height="14" rx="2"/></g>'+
    '<rect x="44" y="26" width="16" height="14" rx="2" fill="#FFB627"/>'+
    '<rect x="80" y="42" width="16" height="14" rx="2" fill="#FF6F52"/>',

  /* --- the two science ladders that were here first --- */
  body:
    '<circle cx="60" cy="17" r="13" fill="#FFE0BD" stroke="#F0C89A" stroke-width="2.5"/>'+
    '<circle cx="55" cy="15" r="2" fill="#16222E"/><circle cx="65" cy="15" r="2" fill="#16222E"/>'+
    '<path d="M55 22 q5 4 10 0" stroke="#16222E" stroke-width="2" fill="none" stroke-linecap="round"/>'+
    '<path d="M48 40 l-14 13 M72 40 l14 13" stroke="#FFE0BD" stroke-width="8" stroke-linecap="round"/>'+
    '<rect x="47" y="32" width="26" height="30" rx="9" fill="#2F73E8"/>'+
    '<path d="M54 62 v13 M66 62 v13" stroke="#7C5CE0" stroke-width="8" stroke-linecap="round"/>',
  cloud:
    '<circle cx="94" cy="20" r="11" fill="#FFB627"/>'+
    '<path d="M34 50 a15 15 0 0 1 3 -28 a19 19 0 0 1 35 3 a13 13 0 0 1 -3 25z" fill="#E8F2FE" stroke="#BBD7FA" stroke-width="2.5"/>'+
    '<g stroke="#2F73E8" stroke-width="4" stroke-linecap="round"><path d="M36 58 l-4 12"/><path d="M50 58 l-4 12"/><path d="M64 58 l-4 12"/></g>',
  senses:
    '<ellipse cx="38" cy="38" rx="25" ry="15" fill="#fff" stroke="#2F73E8" stroke-width="3"/>'+
    '<circle cx="38" cy="38" r="10" fill="#2F73E8"/>'+
    '<circle cx="38" cy="38" r="4.5" fill="#16222E"/>'+
    '<circle cx="34" cy="34" r="2.6" fill="#fff"/>'+
    '<path d="M86 16 q19 0 19 21 q0 21 -13 27 q-9 4 -9 -6 q0 -9 -6 -11 q-9 -4 -5 -17 q4 -14 14 -14z" fill="#FFE0BD" stroke="#F0C89A" stroke-width="2.5"/>'+
    '<path d="M90 30 q9 2 7 13 q-2 8 -6 9" stroke="#F0C89A" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
  bones:
    '<g stroke="#A9BACC" stroke-width="6" fill="none" stroke-linecap="round">'+
      '<path d="M56 22 q-26 4 -26 18"/><path d="M64 22 q26 4 26 18"/>'+
      '<path d="M56 36 q-23 4 -22 17"/><path d="M64 36 q23 4 22 17"/>'+
      '<path d="M56 50 q-19 4 -17 15"/><path d="M64 50 q19 4 17 15"/></g>'+
    '<rect x="54" y="8" width="12" height="62" rx="6" fill="#DCE6F0" stroke="#A9BACC" stroke-width="2.5"/>'+
    '<g stroke="#A9BACC" stroke-width="2" stroke-linecap="round"><path d="M54 24 h12 M54 38 h12 M54 52 h12"/></g>',
  muscle:
    '<rect x="30" y="34" width="60" height="11" rx="5.5" fill="#7C8FA3"/>'+
    '<rect x="16" y="20" width="15" height="39" rx="6" fill="#16222E"/>'+
    '<rect x="89" y="20" width="15" height="39" rx="6" fill="#16222E"/>'+
    '<rect x="34" y="25" width="11" height="29" rx="5" fill="#2A3B4D"/>'+
    '<rect x="75" y="25" width="11" height="29" rx="5" fill="#2A3B4D"/>',
  heart:
    '<path d="M6 44 h16 l5 -13 l8 27 l6 -14 h8" stroke="#FF9E8F" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
    '<path d="M80 74 C42 52 45 24 63 22 C72 21 78 29 80 35 C82 29 88 21 97 22 C115 24 118 52 80 74z" fill="#FF6F52"/>'+
    '<path d="M68 30 q8 10 12 2 q4 -8 12 2" stroke="#E8836F" stroke-width="3" fill="none" stroke-linecap="round"/>',
  lungs:
    '<path d="M56 10 v16 q-28 6 -28 28 q0 20 16 20 q14 0 14 -20z" fill="#FFB3A7"/>'+
    '<path d="M64 10 v16 q28 6 28 28 q0 20 -16 20 q-14 0 -14 -20z" fill="#FF9E8F"/>'+
    '<rect x="55" y="6" width="10" height="24" rx="5" fill="#C9D6E3"/>'+
    '<path d="M60 28 q-14 4 -16 16 M60 28 q14 4 16 16" stroke="#C9D6E3" stroke-width="5" fill="none" stroke-linecap="round"/>'+
    '<g stroke="#E8836F" stroke-width="2.5" fill="none" stroke-linecap="round">'+
      '<path d="M44 46 v18 M44 54 l-7 6 M44 54 l7 6 M76 46 v18 M76 54 l-7 6 M76 54 l7 6"/></g>',
  tummy:
    '<path d="M46 8 v12 q-22 9 -22 31 q0 22 22 22 q20 0 20 -18 q0 -12 -13 -15" stroke="#FF9E8F" stroke-width="15" fill="none" stroke-linecap="round"/>'+
    '<circle cx="90" cy="26" r="12" fill="#FF6F52"/>'+
    '<path d="M90 14 q3 -7 10 -7 q-2 7 -10 7z" fill="#4FB86B"/>',
  brain:
    '<path d="M40 20 q-16 3 -15 17 q-8 9 2 17 q-2 13 13 15 q7 9 18 4 q14 5 19 -8 q13 -5 10 -18 q7 -11 -5 -19 q-5 -13 -19 -10 q-13 -8 -23 2z" fill="#F7B8C8" stroke="#E08AA0" stroke-width="2.5"/>'+
    '<g stroke="#E08AA0" stroke-width="2.5" fill="none" stroke-linecap="round">'+
      '<path d="M60 18 v50"/><path d="M45 28 q10 6 0 13 q-10 7 2 13"/><path d="M76 28 q-10 6 0 13 q10 7 -2 13"/></g>',
  skin:
    '<rect x="14" y="22" width="92" height="13" rx="6.5" fill="#FFCBA4"/>'+
    '<rect x="14" y="38" width="92" height="15" rx="7" fill="#F0A882"/>'+
    '<rect x="14" y="56" width="92" height="15" rx="7" fill="#D98F6E"/>'+
    '<path d="M44 22 q3 -13 13 -16" stroke="#8A5A3B" stroke-width="3.5" fill="none" stroke-linecap="round"/>'+
    '<path d="M78 8 q7 8 0 13 q-7 -6 0 -13z" fill="#2F73E8"/>',

  /* --- films and games. Every one of these is deliberately generic: a
     controller rather than Mario, a microphone rather than the band, a
     monster of our own rather than a Pokemon. Drawing somebody's character
     into this repo would be copying their character, and the rule that keeps
     song words out of data.js keeps their characters out of here. --- */
  controller:
    '<rect x="18" y="28" width="84" height="34" rx="17" fill="#5E7183"/>'+
    '<circle cx="28" cy="58" r="13" fill="#5E7183"/><circle cx="92" cy="58" r="13" fill="#5E7183"/>'+
    '<rect x="31" y="40" width="22" height="7" rx="2" fill="#E1EAF2"/>'+
    '<rect x="38.5" y="32.5" width="7" height="22" rx="2" fill="#E1EAF2"/>'+
    '<circle cx="80" cy="36" r="6" fill="#FF6F52"/>'+
    '<circle cx="93" cy="45" r="6" fill="#FFB627"/>'+
    '<circle cx="67" cy="45" r="6" fill="#4FB86B"/>',
  castle:
    '<rect x="22" y="36" width="76" height="38" fill="#BBD7FA"/>'+
    '<rect x="12" y="28" width="20" height="46" fill="#9CC8F5"/>'+
    '<rect x="88" y="28" width="20" height="46" fill="#9CC8F5"/>'+
    '<rect x="46" y="20" width="28" height="54" fill="#DDF1FB"/>'+
    '<path d="M12 28 L22 12 L32 28z" fill="#7C5CE0"/>'+
    '<path d="M88 28 L98 12 L108 28z" fill="#7C5CE0"/>'+
    '<path d="M46 20 L60 2 L74 20z" fill="#5B41B8"/>'+
    '<path d="M54 74 v-16 a6 6 0 0 1 12 0 v16z" fill="#5E7183"/>'+
    '<g fill="#FFB627"><circle cx="60" cy="34" r="4"/><circle cx="22" cy="44" r="3"/>'+
      '<circle cx="98" cy="44" r="3"/></g>',
  popcorn:
    '<g fill="#FFF1CE"><circle cx="42" cy="30" r="10"/><circle cx="58" cy="23" r="11"/>'+
      '<circle cx="75" cy="29" r="10"/><circle cx="50" cy="18" r="7"/>'+
      '<circle cx="68" cy="16" r="7"/></g>'+
    '<path d="M32 38 h54 l-6 38 a4 4 0 0 1 -4 3 h-34 a4 4 0 0 1 -4 -3z" fill="#FF6F52"/>'+
    '<path d="M46 38 l-2 41 h8 l2 -41z" fill="#fff"/>'+
    '<path d="M66 38 l2 41 h8 l-2 -41z" fill="#fff"/>',
  mic:
    '<ellipse cx="60" cy="74" rx="17" ry="5" fill="#5B41B8"/>'+
    '<rect x="57" y="56" width="6" height="16" fill="#5B41B8"/>'+
    '<path d="M38 36 a22 22 0 0 0 44 0" stroke="#5B41B8" stroke-width="4.5" fill="none" stroke-linecap="round"/>'+
    '<rect x="49" y="8" width="22" height="38" rx="11" fill="#7C5CE0"/>'+
    '<g stroke="#A78BFA" stroke-width="2.5" stroke-linecap="round"><path d="M53 18 h14 M53 26 h14 M53 34 h14"/></g>'+
    '<g fill="#FFB627"><path d="M20 22 l3 -9 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3z"/>'+
      '<path d="M98 48 l2 -6 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2z"/></g>',
  monster:
    '<path d="M40 24 L33 8 L50 16z" fill="#2E8B80"/>'+
    '<path d="M80 24 L87 8 L70 16z" fill="#2E8B80"/>'+
    '<ellipse cx="44" cy="70" rx="11" ry="6" fill="#2E8B80"/>'+
    '<ellipse cx="76" cy="70" rx="11" ry="6" fill="#2E8B80"/>'+
    '<circle cx="60" cy="42" r="27" fill="#3FB0A2"/>'+
    '<circle cx="50" cy="38" r="8" fill="#fff"/><circle cx="70" cy="38" r="8" fill="#fff"/>'+
    '<circle cx="51" cy="39" r="3.6" fill="#16222E"/><circle cx="71" cy="39" r="3.6" fill="#16222E"/>'+
    '<path d="M50 54 q10 9 20 0" stroke="#16222E" stroke-width="3" fill="none" stroke-linecap="round"/>',
  blocks:
    '<rect x="24" y="42" width="24" height="24" fill="#4FB86B"/>'+
    '<rect x="24" y="42" width="24" height="6" fill="#3E9B57"/>'+
    '<rect x="48" y="42" width="24" height="24" fill="#C79A63"/>'+
    '<rect x="48" y="42" width="24" height="6" fill="#A9743F"/>'+
    '<rect x="72" y="42" width="24" height="24" fill="#9FB3C8"/>'+
    '<rect x="72" y="42" width="24" height="6" fill="#7C8FA3"/>'+
    '<rect x="36" y="18" width="24" height="24" fill="#FFB627"/>'+
    '<rect x="36" y="18" width="24" height="6" fill="#E09A00"/>'+
    '<rect x="60" y="18" width="24" height="24" fill="#2F73E8"/>'+
    '<rect x="60" y="18" width="24" height="6" fill="#1E5FC4"/>',
  ticket:
    '<rect x="14" y="24" width="92" height="44" rx="8" fill="#FFB627"/>'+
    '<circle cx="60" cy="24" r="7" fill="#F7FAFF"/><circle cx="60" cy="68" r="7" fill="#F7FAFF"/>'+
    '<path d="M60 34 v24" stroke="#fff" stroke-width="2.5" stroke-dasharray="4 5"/>'+
    '<path d="M36 34 l3.6 8.2 l8.9 .7 l-6.8 5.8 l2.1 8.7 l-7.8 -4.7 l-7.8 4.7 l2.1 -8.7 l-6.8 -5.8 l8.9 -.7z" fill="#fff"/>'+
    '<g stroke="#fff" stroke-width="3.5" stroke-linecap="round"><path d="M74 40 h20 M74 48 h20 M74 56 h12"/></g>',
  cape:
    '<path d="M38 26 q22 -9 44 0 l9 44 q-31 11 -62 0z" fill="#FF6F52"/>'+
    '<path d="M34 26 h52 v12 q0 13 -14 13 q-9 0 -12 -7 q-3 7 -12 7 q-14 0 -14 -13z" fill="#2F73E8"/>'+
    '<ellipse cx="46" cy="36" rx="7.5" ry="5.5" fill="#fff"/>'+
    '<ellipse cx="74" cy="36" rx="7.5" ry="5.5" fill="#fff"/>'+
    '<path d="M60 58 l2.6 6 l6.4 .5 l-4.9 4.2 l1.5 6.3 l-5.6 -3.4 l-5.6 3.4 l1.5 -6.3 l-4.9 -4.2 l6.4 -.5z" fill="#FFB627"/>',
  onigiri:
    '<g fill="#F7B8C8"><circle cx="22" cy="20" r="5"/><circle cx="31" cy="13" r="4"/>'+
      '<circle cx="98" cy="26" r="5"/><circle cx="105" cy="17" r="4"/></g>'+
    '<path d="M60 14 q23 9 29 48 q-29 9 -58 0 q6 -39 29 -48z" fill="#FAFCFE" stroke="#D9E3EC" stroke-width="2.5"/>'+
    '<rect x="44" y="44" width="32" height="20" rx="3" fill="#2A3B4D"/>'+
    '<circle cx="51" cy="36" r="2.6" fill="#16222E"/><circle cx="69" cy="36" r="2.6" fill="#16222E"/>',
  clapper:
    '<rect x="18" y="34" width="84" height="38" rx="4" fill="#2A3B4D"/>'+
    '<g stroke="#5E7183" stroke-width="3.5" stroke-linecap="round"><path d="M28 48 h64 M28 60 h42"/></g>'+
    '<g transform="rotate(-7 60 26)">'+
      '<rect x="18" y="18" width="84" height="16" rx="3" fill="#16222E"/>'+
      '<g fill="#fff"><path d="M26 18 h9 l-7 16 h-9z"/><path d="M46 18 h9 l-7 16 h-9z"/>'+
        '<path d="M66 18 h9 l-7 16 h-9z"/><path d="M86 18 h9 l-7 16 h-9z"/></g></g>',

  /* --- flags, countries and sport --- */
  /* --- flags and countries --- */
  flags:
    '<g stroke="#9FB3C8" stroke-width="3.5" stroke-linecap="round"><path d="M18 74 V14 M58 74 V10 M96 74 V18"/></g>'+
    '<path d="M20 16 h28 l-7 9 l7 9 h-28z" fill="#FF6F52"/>'+
    '<path d="M60 12 h28 l-7 9 l7 9 h-28z" fill="#4FB86B"/>'+
    '<path d="M98 20 h20 l-6 8 l6 8 h-20z" fill="#FFB627"/>',
  globe:
    '<circle cx="60" cy="40" r="30" fill="#BBD7FA" stroke="#2F73E8" stroke-width="3"/>'+
    '<path d="M42 30 q12 -7 22 2 q-8 9 -22 -2z" fill="#4FB86B"/>'+
    '<path d="M60 50 q16 -5 20 6 q-14 7 -20 -6z" fill="#4FB86B"/>'+
    '<ellipse cx="60" cy="40" rx="13" ry="30" fill="none" stroke="#2F73E8" stroke-width="2.5"/>'+
    '<path d="M31 40 h58" stroke="#2F73E8" stroke-width="2.5"/>',
  citysky:
    '<rect x="8" y="42" width="22" height="32" fill="#9FB3C8"/>'+
    '<rect x="33" y="28" width="24" height="46" fill="#5E7183"/>'+
    '<rect x="60" y="36" width="20" height="38" fill="#7C8FA3"/>'+
    '<rect x="83" y="16" width="26" height="58" fill="#5E7183"/>'+
    '<g fill="#FFB627"><rect x="13" y="48" width="5" height="6"/><rect x="21" y="48" width="5" height="6"/>'+
      '<rect x="13" y="60" width="5" height="6"/><rect x="38" y="34" width="5" height="6"/>'+
      '<rect x="47" y="34" width="5" height="6"/><rect x="38" y="46" width="5" height="6"/>'+
      '<rect x="47" y="58" width="5" height="6"/><rect x="65" y="42" width="5" height="6"/>'+
      '<rect x="73" y="54" width="5" height="6"/><rect x="88" y="22" width="5" height="6"/>'+
      '<rect x="97" y="22" width="5" height="6"/><rect x="88" y="36" width="5" height="6"/>'+
      '<rect x="97" y="50" width="5" height="6"/><rect x="88" y="62" width="5" height="6"/></g>',
  map:
    '<path d="M8 20 l34 -8 l34 8 l36 -8 v50 l-36 8 l-34 -8 l-34 8z" fill="#E4F4E8" stroke="#8FC7A2" stroke-width="2.5"/>'+
    '<path d="M42 12 v50 M76 20 v50" stroke="#8FC7A2" stroke-width="2"/>'+
    '<path d="M14 44 q16 -8 30 2 q14 10 30 -4" stroke="#9CD3F5" stroke-width="3" fill="none"/>'+
    '<path d="M80 24 a11 11 0 0 1 22 0 q0 13 -11 22 q-11 -9 -11 -22z" fill="#FF6F52"/>'+
    '<circle cx="91" cy="24" r="4.5" fill="#fff"/>',
  tower:
    '<path d="M24 74 L34 18 L40 18 L50 74z" fill="#9FB3C8"/>'+
    '<path d="M34 18 L37 6 L40 18z" fill="#7C8FA3"/>'+
    '<g stroke="#7C8FA3" stroke-width="3"><path d="M28 50 h18 M30 38 h14"/></g>'+
    '<path d="M66 74 V44 a17 17 0 0 1 34 0 v30 h-11 V48 a6 6 0 0 0 -12 0 v26z" fill="#C79A63"/>'+
    '<rect x="62" y="70" width="42" height="6" rx="2" fill="#A9743F"/>',
  mountain:
    '<circle cx="100" cy="18" r="9" fill="#FFB627"/>'+
    '<path d="M2 72 L36 20 L58 50 L74 30 L118 72z" fill="#7C8FA3"/>'+
    '<path d="M36 20 L48 38 L36 33 L27 40z" fill="#fff"/>'+
    '<path d="M74 30 L84 44 L74 40 L66 46z" fill="#fff"/>'+
    '<rect x="0" y="72" width="120" height="8" fill="#DFF3E4"/>',
  pin:
    '<ellipse cx="60" cy="72" rx="22" ry="6" fill="#16222E" opacity=".16"/>'+
    '<path d="M60 6 a21 21 0 0 1 21 21 q0 21 -21 41 q-21 -20 -21 -41 a21 21 0 0 1 21 -21z" fill="#FF6F52"/>'+
    '<circle cx="60" cy="27" r="8.5" fill="#fff"/>',
  speech:
    '<path d="M8 12 h52 a7 7 0 0 1 7 7 v20 a7 7 0 0 1 -7 7 h-30 l-13 10 v-10 h-9 a7 7 0 0 1 -7 -7 v-20 a7 7 0 0 1 7 -7z" fill="#2F73E8"/>'+
    '<g fill="#fff"><circle cx="24" cy="29" r="3.4"/><circle cx="35" cy="29" r="3.4"/><circle cx="46" cy="29" r="3.4"/></g>'+
    '<path d="M112 34 h-44 a7 7 0 0 0 -7 7 v20 a7 7 0 0 0 7 7 h26 l12 9 v-9 h6 a7 7 0 0 0 7 -7 v-20 a7 7 0 0 0 -7 -7z" fill="#4FB86B"/>'+
    '<g fill="#fff"><circle cx="79" cy="51" r="3.4"/><circle cx="90" cy="51" r="3.4"/><circle cx="101" cy="51" r="3.4"/></g>',
  compass:
    '<circle cx="60" cy="40" r="31" fill="#FFF1CE" stroke="#E09A00" stroke-width="3.5"/>'+
    '<g stroke="#E09A00" stroke-width="2.5" stroke-linecap="round"><path d="M60 12 v6 M60 62 v6 M32 40 h6 M82 40 h6"/></g>'+
    '<path d="M60 16 L69 40 L51 40z" fill="#FF6F52"/>'+
    '<path d="M60 64 L69 40 L51 40z" fill="#E1EAF2"/>'+
    '<circle cx="60" cy="40" r="4.5" fill="#5E7183"/>',
  /* Deliberately not any country's flag: a made-up one, so the picture on the
     rung about flags cannot be the answer to a question about flags. */
  flagpole:
    '<ellipse cx="24" cy="74" rx="14" ry="4" fill="#CBD6E2"/>'+
    '<path d="M24 74 V8" stroke="#9FB3C8" stroke-width="4.5" stroke-linecap="round"/>'+
    '<rect x="26" y="12" width="66" height="46" fill="#FF6F52"/>'+
    '<path d="M26 12 L54 35 L26 58z" fill="#4FB86B"/>'+
    '<path d="M72 21 l4 9 l9.5 .7 l-7.3 6.3 l2.3 9.5 l-8.5 -5.2 l-8.5 5.2 l2.3 -9.5 l-7.3 -6.3 l9.5 -.7z" fill="#fff"/>'+
    '<circle cx="24" cy="8" r="4" fill="#FFB627"/>',

  /* --- sports --- */
  football:
    '<circle cx="60" cy="40" r="29" fill="#fff" stroke="#16222E" stroke-width="3"/>'+
    '<path d="M60 22 l11 8 l-4 13 h-14 l-4 -13z" fill="#16222E"/>'+
    '<path d="M60 11 l-11 6 l11 5 l11 -5z" fill="#16222E"/>'+
    '<path d="M33 34 l-1 12 l11 -4 l2 -12z" fill="#16222E"/>'+
    '<path d="M87 34 l1 12 l-11 -4 l-2 -12z" fill="#16222E"/>'+
    '<path d="M50 62 l4 8 h12 l4 -8 l-10 -5z" fill="#16222E"/>',
  pool:
    '<rect x="6" y="18" width="108" height="50" rx="7" fill="#9CD3F5"/>'+
    '<g stroke="#fff" stroke-width="3.5" stroke-dasharray="7 6" stroke-linecap="round">'+
      '<path d="M12 32 h96 M12 43 h96 M12 54 h96"/></g>'+
    '<circle cx="34" cy="43" r="8" fill="#FFB627"/>'+
    '<path d="M42 39 q12 -6 22 2" stroke="#FFB627" stroke-width="5" fill="none" stroke-linecap="round"/>',
  racquet:
    '<ellipse cx="40" cy="30" rx="19" ry="23" fill="#F7FAFF" stroke="#7C5CE0" stroke-width="5"/>'+
    '<g stroke="#CBD6E2" stroke-width="1.6"><path d="M30 12 v36 M40 8 v44 M50 12 v36 M24 22 h32 M23 31 h34 M24 40 h32"/></g>'+
    '<path d="M40 53 L52 76" stroke="#5B41B8" stroke-width="7" stroke-linecap="round"/>'+
    '<path d="M92 48 L74 14 h36z" fill="#fff" stroke="#B8C9DA" stroke-width="2"/>'+
    '<g stroke="#CBD6E2" stroke-width="1.6"><path d="M86 22 l3 24 M92 16 v30 M98 22 l-3 24"/></g>'+
    '<path d="M83 48 h18 a9 9 0 0 1 -18 0z" fill="#E8D5BE" stroke="#C79A63" stroke-width="2"/>',
  hoop:
    '<rect x="28" y="6" width="62" height="40" rx="3" fill="#F2F7FC" stroke="#B8C9DA" stroke-width="3"/>'+
    '<rect x="48" y="22" width="22" height="17" fill="none" stroke="#FF6F52" stroke-width="3"/>'+
    '<ellipse cx="59" cy="48" rx="15" ry="4.5" fill="none" stroke="#FF6F52" stroke-width="4"/>'+
    '<g stroke="#CBD6E2" stroke-width="2"><path d="M46 51 L53 66 M59 52 v15 M72 51 L65 66 M48 58 h22"/></g>'+
    '<circle cx="98" cy="62" r="13" fill="#E8833C"/>'+
    '<g stroke="#A9521F" stroke-width="1.8" fill="none"><path d="M85 62 h26 M98 49 v26 M89 53 q9 9 0 18 M107 53 q-9 9 0 18"/></g>',
  stopwatch:
    '<rect x="52" y="4" width="16" height="9" rx="3" fill="#5E7183"/>'+
    '<circle cx="60" cy="45" r="28" fill="#fff" stroke="#5E7183" stroke-width="4.5"/>'+
    '<g stroke="#CBD6E2" stroke-width="2.5" stroke-linecap="round"><path d="M60 22 v5 M83 45 h-5 M60 68 v-5 M37 45 h5"/></g>'+
    '<path d="M60 45 V28 M60 45 l13 9" stroke="#FF6F52" stroke-width="3.5" stroke-linecap="round" fill="none"/>'+
    '<circle cx="60" cy="45" r="3.5" fill="#16222E"/>',
  bike:
    '<circle cx="26" cy="52" r="19" fill="none" stroke="#5E7183" stroke-width="4.5"/>'+
    '<circle cx="94" cy="52" r="19" fill="none" stroke="#5E7183" stroke-width="4.5"/>'+
    '<path d="M26 52 L52 52 L66 24 L80 52 M52 52 L66 24 M94 52 L80 52" stroke="#2F73E8" stroke-width="4" fill="none" stroke-linecap="round"/>'+
    '<path d="M52 52 V26" stroke="#2F73E8" stroke-width="4" stroke-linecap="round"/>'+
    '<path d="M45 24 h14" stroke="#16222E" stroke-width="5.5" stroke-linecap="round"/>'+
    '<path d="M74 20 h14" stroke="#16222E" stroke-width="4.5" stroke-linecap="round"/>'+
    '<path d="M80 52 V22" stroke="#2F73E8" stroke-width="3.5"/>'+
    '<circle cx="60" cy="56" r="6" fill="#CBD6E2"/>',
  podium:
    '<rect x="44" y="18" width="32" height="56" fill="#FFB627"/>'+
    '<rect x="8" y="36" width="32" height="38" fill="#CBD6E2"/>'+
    '<rect x="80" y="46" width="32" height="28" fill="#C79A63"/>'+
    '<circle cx="60" cy="32" r="8" fill="#fff"/>'+
    '<circle cx="24" cy="50" r="7" fill="#fff"/>'+
    '<circle cx="96" cy="60" r="6" fill="#fff"/>',
  belt:
    '<rect x="4" y="32" width="112" height="16" rx="4" fill="#16222E"/>'+
    '<path d="M50 48 v22 M70 48 v22" stroke="#16222E" stroke-width="11" stroke-linecap="round"/>'+
    '<rect x="42" y="26" width="36" height="28" rx="6" fill="#2A3B4D"/>'+
    '<path d="M42 40 h36" stroke="#16222E" stroke-width="3"/>',
  bat:
    '<rect x="30" y="10" width="24" height="44" rx="5" fill="#E8D5BE" stroke="#C79A63" stroke-width="2.5"/>'+
    '<path d="M42 14 v36" stroke="#C79A63" stroke-width="2"/>'+
    '<rect x="37" y="52" width="10" height="24" rx="5" fill="#A9743F"/>'+
    '<circle cx="88" cy="52" r="15" fill="#C43F2D"/>'+
    '<path d="M88 37 q7 15 0 30" stroke="#fff" stroke-width="2.5" fill="none" stroke-dasharray="3 3"/>',
  trophy:
    '<path d="M38 10 h44 v20 a22 22 0 0 1 -44 0z" fill="#FFB627"/>'+
    '<path d="M38 14 q-15 0 -15 11 q0 11 15 11 M82 14 q15 0 15 11 q0 11 -15 11" stroke="#E09A00" stroke-width="4.5" fill="none"/>'+
    '<rect x="54" y="50" width="12" height="12" fill="#E09A00"/>'+
    '<rect x="40" y="62" width="40" height="11" rx="3" fill="#C79A63"/>'+
    '<path d="M60 16 l3 7 l7.5 .5 l-5.8 5 l1.8 7.5 l-6.5 -4 l-6.5 4 l1.8 -7.5 l-5.8 -5 l7.5 -.5z" fill="#fff"/>',

  /* --- music, art and computers --- */
  /* --- music --- */
  guitar:
    '<path d="M10 14 l8 -8 l44 34 l-8 8z" fill="#8A5A3B"/>'+
    '<rect x="2" y="2" width="14" height="13" rx="3" fill="#5E4326"/>'+
    '<circle cx="52" cy="46" r="18" fill="#C79A63"/>'+
    '<circle cx="78" cy="52" r="24" fill="#C79A63"/>'+
    '<circle cx="72" cy="50" r="9" fill="#5E4326"/>'+
    '<rect x="88" y="48" width="18" height="6" rx="2" fill="#8A5A3B"/>'+
    '<g stroke="#F2F7FC" stroke-width="1.6"><path d="M14 12 L92 50 M12 16 L92 54"/></g>',
  trumpet:
    '<path d="M94 20 l22 -10 v60 l-22 -10z" fill="#FFB627"/>'+
    '<rect x="32" y="34" width="64" height="13" rx="6.5" fill="#FFB627"/>'+
    '<path d="M32 34 h-12 a6.5 6.5 0 0 0 0 13 h12z" fill="#E09A00"/>'+
    '<g fill="#E09A00"><rect x="48" y="18" width="9" height="18" rx="3"/>'+
      '<rect x="63" y="18" width="9" height="18" rx="3"/><rect x="78" y="18" width="9" height="18" rx="3"/></g>',
  dynamics:
    '<circle cx="30" cy="56" r="15" fill="#7C5CE0"/>'+
    '<rect x="42" y="12" width="6" height="46" fill="#7C5CE0"/>'+
    '<path d="M48 12 q14 4 14 14 q0 -18 -14 -8z" fill="#7C5CE0"/>'+
    '<circle cx="90" cy="60" r="8.5" fill="#A78BFA"/>'+
    '<rect x="97" y="34" width="3.5" height="27" fill="#A78BFA"/>'+
    '<path d="M100 34 q8 2 8 8 q0 -10 -8 -5z" fill="#A78BFA"/>',
  drum:
    '<path d="M18 72 L46 42 M102 72 L74 42" stroke="#C79A63" stroke-width="5" stroke-linecap="round"/>'+
    '<path d="M30 34 v18 a30 10 0 0 0 60 0 v-18z" fill="#FF6F52"/>'+
    '<path d="M30 38 l12 12 l12 -12 l12 12 l12 -12 l12 12" stroke="#fff" stroke-width="3.5" fill="none"/>'+
    '<ellipse cx="60" cy="34" rx="30" ry="10" fill="#F2F7FC" stroke="#B8C9DA" stroke-width="3"/>',
  stave:
    '<g stroke="#B8C9DA" stroke-width="2"><path d="M6 22 h108 M6 33 h108 M6 44 h108 M6 55 h108 M6 66 h108"/></g>'+
    '<g fill="#2F73E8"><ellipse cx="30" cy="55" rx="8" ry="6"/><ellipse cx="60" cy="33" rx="8" ry="6"/>'+
      '<ellipse cx="90" cy="44" rx="8" ry="6"/></g>'+
    '<g fill="#2F73E8"><rect x="36" y="27" width="4" height="28"/><rect x="66" y="5" width="4" height="28"/>'+
      '<rect x="96" y="16" width="4" height="28"/></g>',
  violin:
    '<path d="M14 72 L104 12" stroke="#C79A63" stroke-width="3.5" stroke-linecap="round"/>'+
    '<rect x="54" y="2" width="9" height="22" rx="3" fill="#8A5A3B"/>'+
    '<path d="M58 22 q17 0 17 15 q0 9 -7 11 q7 4 7 13 q0 15 -17 15 q-17 0 -17 -15 q0 -9 7 -13 q-7 -2 -7 -11 q0 -15 17 -15z" fill="#A9743F"/>'+
    '<g stroke="#5E4326" stroke-width="2"><path d="M48 44 q-3 8 0 12 M69 44 q3 8 0 12"/></g>',
  piano:
    '<rect x="8" y="24" width="104" height="42" rx="4" fill="#fff" stroke="#B8C9DA" stroke-width="2.5"/>'+
    '<g stroke="#CBD6E2" stroke-width="2"><path d="M23 24 v42 M38 24 v42 M53 24 v42 M68 24 v42 M83 24 v42 M98 24 v42"/></g>'+
    '<g fill="#16222E"><rect x="18" y="24" width="10" height="25" rx="2"/><rect x="33" y="24" width="10" height="25" rx="2"/>'+
      '<rect x="63" y="24" width="10" height="25" rx="2"/><rect x="78" y="24" width="10" height="25" rx="2"/>'+
      '<rect x="93" y="24" width="10" height="25" rx="2"/></g>',
  headphones:
    '<path d="M24 56 V42 a36 36 0 0 1 72 0 v14" stroke="#5E7183" stroke-width="8" fill="none" stroke-linecap="round"/>'+
    '<rect x="12" y="46" width="22" height="30" rx="10" fill="#2F73E8"/>'+
    '<rect x="86" y="46" width="22" height="30" rx="10" fill="#2F73E8"/>',

  /* --- art --- */
  palette:
    '<path d="M58 10 q42 0 42 27 q0 15 -17 15 q-11 0 -11 9 q0 11 -15 11 q-42 0 -42 -31 q0 -31 43 -31z" fill="#E8D5BE" stroke="#C79A63" stroke-width="2.5"/>'+
    '<ellipse cx="74" cy="48" rx="7" ry="5.5" fill="#F7FAFF"/>'+
    '<g><circle cx="34" cy="26" r="7" fill="#FF6F52"/><circle cx="54" cy="20" r="7" fill="#FFB627"/>'+
      '<circle cx="74" cy="24" r="7" fill="#2F73E8"/><circle cx="30" cy="46" r="7" fill="#4FB86B"/>'+
      '<circle cx="46" cy="56" r="7" fill="#7C5CE0"/></g>',
  paintpots:
    '<rect x="8" y="30" width="30" height="40" rx="4" fill="#F2F7FC" stroke="#B8C9DA" stroke-width="2.5"/>'+
    '<path d="M10 44 h26 v22 a4 4 0 0 1 -4 4 h-18 a4 4 0 0 1 -4 -4z" fill="#FF6F52"/>'+
    '<rect x="45" y="30" width="30" height="40" rx="4" fill="#F2F7FC" stroke="#B8C9DA" stroke-width="2.5"/>'+
    '<path d="M47 44 h26 v22 a4 4 0 0 1 -4 4 h-18 a4 4 0 0 1 -4 -4z" fill="#2F73E8"/>'+
    '<rect x="82" y="30" width="30" height="40" rx="4" fill="#F2F7FC" stroke="#B8C9DA" stroke-width="2.5"/>'+
    '<path d="M84 44 h26 v22 a4 4 0 0 1 -4 4 h-18 a4 4 0 0 1 -4 -4z" fill="#FFB627"/>'+
    '<g><circle cx="23" cy="18" r="6" fill="#FF6F52"/><circle cx="60" cy="14" r="6" fill="#2F73E8"/>'+
      '<circle cx="97" cy="18" r="6" fill="#FFB627"/></g>',
  shapes:
    '<circle cx="26" cy="42" r="19" fill="#2F73E8"/>'+
    '<rect x="50" y="23" width="36" height="36" rx="3" fill="#FFB627"/>'+
    '<path d="M102 20 L118 60 L86 60z" fill="#4FB86B"/>',
  pencils:
    '<rect x="28" y="6" width="16" height="10" fill="#FF6F52"/>'+
    '<rect x="28" y="16" width="16" height="42" fill="#FFB627"/>'+
    '<path d="M28 58 h16 l-8 16z" fill="#E8D5BE"/>'+
    '<path d="M33 68 l3 6 l3 -6z" fill="#16222E"/>'+
    '<rect x="76" y="6" width="13" height="42" rx="2" fill="#C79A63"/>'+
    '<rect x="73" y="48" width="19" height="11" rx="2" fill="#B8C9DA"/>'+
    '<path d="M74 59 q8.5 19 17 0z" fill="#2F73E8"/>',
  frame:
    '<rect x="16" y="8" width="88" height="62" rx="3" fill="#FFB627"/>'+
    '<rect x="24" y="16" width="72" height="46" fill="#E09A00"/>'+
    '<rect x="30" y="22" width="60" height="34" fill="#F7FAFF"/>'+
    '<g fill="#FFF1CE"><circle cx="22" cy="14" r="4"/><circle cx="98" cy="14" r="4"/>'+
      '<circle cx="22" cy="64" r="4"/><circle cx="98" cy="64" r="4"/></g>',
  easel:
    '<path d="M30 76 L54 12 M90 76 L66 12" stroke="#C79A63" stroke-width="4.5" stroke-linecap="round"/>'+
    '<path d="M36 56 h48" stroke="#C79A63" stroke-width="4.5" stroke-linecap="round"/>'+
    '<rect x="28" y="18" width="64" height="38" fill="#fff" stroke="#B8C9DA" stroke-width="2.5"/>'+
    '<path d="M28 46 L46 30 L58 46z" fill="#4FB86B"/>'+
    '<circle cx="78" cy="30" r="7" fill="#FFB627"/>',
  statue:
    '<rect x="34" y="58" width="52" height="16" rx="3" fill="#B8C9DA"/>'+
    '<rect x="40" y="52" width="40" height="8" rx="2" fill="#CBD6E2"/>'+
    '<path d="M60 8 q15 7 13 21 q-2 13 6 17 q-8 7 -19 7 q-11 0 -19 -7 q8 -4 6 -17 q-2 -14 13 -21z" fill="#DCE6F0" stroke="#9FB3C8" stroke-width="2.5"/>',
  inkbrush:
    '<path d="M22 40 a25 25 0 1 1 22 24" stroke="#16222E" stroke-width="7.5" fill="none" stroke-linecap="round"/>'+
    '<rect x="80" y="6" width="9" height="38" rx="3" fill="#C79A63"/>'+
    '<rect x="78" y="44" width="13" height="7" rx="2" fill="#B8C9DA"/>'+
    '<path d="M79 51 q5.5 22 11 0z" fill="#16222E"/>',
  canvas:
    '<rect x="14" y="10" width="92" height="58" rx="3" fill="#fff" stroke="#B8C9DA" stroke-width="2.5"/>'+
    '<rect x="14" y="44" width="92" height="24" fill="#DFF3E4"/>'+
    '<circle cx="86" cy="26" r="9" fill="#FFB627"/>'+
    '<path d="M14 44 L44 22 L68 44z" fill="#9FB3C8"/>'+
    '<path d="M44 22 L53 29 L44 27 L37 31z" fill="#fff"/>'+
    '<path d="M14 56 q24 -8 46 0 q22 8 46 0" stroke="#8FC7A2" stroke-width="2.5" fill="none"/>',
  collage:
    '<path d="M10 18 l32 -8 l7 30 l-34 9z" fill="#FF6F52"/>'+
    '<path d="M70 8 l34 10 l-5 28 l-30 -9z" fill="#7C5CE0"/>'+
    '<path d="M40 34 l36 -15 l11 28 l-33 17z" fill="#4FB86B"/>'+
    '<path d="M18 50 l34 7 l-5 19 l-31 -5z" fill="#FFB627"/>',

  /* --- computers --- */
  desktop:
    '<rect x="20" y="6" width="80" height="48" rx="4" fill="#2A3B4D"/>'+
    '<rect x="26" y="12" width="68" height="36" fill="#9CD3F5"/>'+
    '<g fill="#fff" opacity=".7"><rect x="32" y="18" width="26" height="4" rx="2"/>'+
      '<rect x="32" y="26" width="40" height="4" rx="2"/><rect x="32" y="34" width="33" height="4" rx="2"/></g>'+
    '<rect x="52" y="54" width="16" height="8" fill="#5E7183"/>'+
    '<rect x="34" y="62" width="52" height="6" rx="3" fill="#5E7183"/>'+
    '<rect x="16" y="70" width="88" height="9" rx="3" fill="#CBD6E2"/>',
  mouse:
    '<path d="M60 6 q23 0 23 25 v20 q0 22 -23 22 q-23 0 -23 -22 v-20 q0 -25 23 -25z" fill="#E1EAF2" stroke="#9FB3C8" stroke-width="3"/>'+
    '<path d="M37 34 h46" stroke="#9FB3C8" stroke-width="2.5"/>'+
    '<path d="M60 6 v28" stroke="#9FB3C8" stroke-width="2.5"/>'+
    '<rect x="56" y="14" width="8" height="14" rx="4" fill="#2F73E8"/>',
  folder:
    '<path d="M10 18 h30 l8 9 h62 a5 5 0 0 1 5 5 v8 h-110 v-17 a5 5 0 0 1 5 -5z" fill="#E09A00"/>'+
    '<rect x="28" y="26" width="64" height="20" rx="2" fill="#fff" stroke="#E1EAF2" stroke-width="1.5"/>'+
    '<path d="M6 36 h108 v30 a5 5 0 0 1 -5 5 h-98 a5 5 0 0 1 -5 -5z" fill="#FFB627"/>',
  wifi:
    '<g stroke="#2F73E8" fill="none" stroke-linecap="round">'+
      '<path d="M18 34 a54 54 0 0 1 84 0" stroke-width="8"/>'+
      '<path d="M34 48 a33 33 0 0 1 52 0" stroke-width="8"/></g>'+
    '<circle cx="60" cy="66" r="8" fill="#2F73E8"/>',
  padlock:
    '<path d="M42 36 v-9 a18 18 0 0 1 36 0 v9" stroke="#9FB3C8" stroke-width="8.5" fill="none"/>'+
    '<rect x="28" y="34" width="64" height="42" rx="8" fill="#FFB627"/>'+
    '<circle cx="60" cy="50" r="7.5" fill="#16222E"/>'+
    '<rect x="56.5" y="52" width="7" height="14" rx="3.5" fill="#16222E"/>',
  code:
    '<path d="M38 18 L14 42 L38 66" stroke="#4FB86B" stroke-width="8.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
    '<path d="M82 18 L106 42 L82 66" stroke="#4FB86B" stroke-width="8.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
    '<path d="M70 14 L50 70" stroke="#7C5CE0" stroke-width="7.5" stroke-linecap="round"/>',
  chip:
    '<g stroke="#9FB3C8" stroke-width="4" stroke-linecap="round">'+
      '<path d="M38 16 v-9 M54 16 v-9 M66 16 v-9 M82 16 v-9 M38 64 v9 M54 64 v9 M66 64 v9 M82 64 v9"/>'+
      '<path d="M28 28 h-10 M28 40 h-10 M28 52 h-10 M92 28 h10 M92 40 h10 M92 52 h10"/></g>'+
    '<rect x="28" y="16" width="64" height="48" rx="6" fill="#2A3B4D"/>'+
    '<rect x="44" y="30" width="32" height="20" rx="3" fill="#4FB86B"/>',
  binary:
    '<g fill="#2F73E8">'+
      '<rect x="14" y="14" width="8" height="18" rx="4"/><circle cx="40" cy="23" r="9"/>'+
      '<circle cx="66" cy="23" r="9"/><rect x="92" y="14" width="8" height="18" rx="4"/>'+
      '<circle cx="27" cy="46" r="9"/><rect x="53" y="37" width="8" height="18" rx="4"/>'+
      '<rect x="79" y="37" width="8" height="18" rx="4"/><circle cx="105" cy="46" r="9"/>'+
      '<rect x="14" y="60" width="8" height="18" rx="4"/><circle cx="40" cy="69" r="9"/>'+
      '<rect x="66" y="60" width="8" height="18" rx="4"/><circle cx="92" cy="69" r="9"/></g>'+
    '<g fill="#F7FAFF"><circle cx="40" cy="23" r="3.6"/><circle cx="66" cy="23" r="3.6"/>'+
      '<circle cx="27" cy="46" r="3.6"/><circle cx="105" cy="46" r="3.6"/>'+
      '<circle cx="40" cy="69" r="3.6"/><circle cx="92" cy="69" r="3.6"/></g>',
  mainframe:
    '<rect x="12" y="12" width="96" height="56" rx="5" fill="#5E7183"/>'+
    '<circle cx="42" cy="32" r="14" fill="#2A3B4D"/><circle cx="42" cy="32" r="5" fill="#CBD6E2"/>'+
    '<circle cx="78" cy="32" r="14" fill="#2A3B4D"/><circle cx="78" cy="32" r="5" fill="#CBD6E2"/>'+
    '<rect x="24" y="54" width="72" height="8" rx="3" fill="#CBD6E2"/>'+
    '<g><circle cx="22" cy="20" r="3.5" fill="#FF6F52"/><circle cx="32" cy="20" r="3.5" fill="#FFB627"/>'+
      '<circle cx="42" cy="20" r="3.5" fill="#4FB86B"/></g>'+
    '<rect x="8" y="68" width="104" height="7" rx="3" fill="#2A3B4D"/>',
  robot:
    '<path d="M60 14 V6" stroke="#9FB3C8" stroke-width="3.5" stroke-linecap="round"/>'+
    '<circle cx="60" cy="4" r="4.5" fill="#FF6F52"/>'+
    '<rect x="14" y="30" width="9" height="18" rx="3.5" fill="#9FB3C8"/>'+
    '<rect x="97" y="30" width="9" height="18" rx="3.5" fill="#9FB3C8"/>'+
    '<rect x="24" y="14" width="72" height="52" rx="13" fill="#CBD6E2" stroke="#9FB3C8" stroke-width="3"/>'+
    '<rect x="34" y="26" width="52" height="22" rx="11" fill="#2A3B4D"/>'+
    '<circle cx="48" cy="37" r="5.5" fill="#4FB86B"/><circle cx="72" cy="37" r="5.5" fill="#4FB86B"/>'+
    '<rect x="46" y="55" width="28" height="5" rx="2.5" fill="#9FB3C8"/>',

  /* --- history and geography --- */
  /* --- history --- */
  hourglass:
    '<rect x="30" y="6" width="60" height="8" rx="3" fill="#C79A63"/>'+
    '<rect x="30" y="66" width="60" height="8" rx="3" fill="#C79A63"/>'+
    '<path d="M38 14 h44 l-22 26 l22 26 h-44 l22 -26z" fill="#EAF6FD" stroke="#9CD3F5" stroke-width="2.5"/>'+
    '<path d="M42 18 h36 l-18 21z" fill="#FFB627"/>'+
    '<path d="M60 44 l14 18 h-28z" fill="#FFB627"/>'+
    '<path d="M60 40 v14" stroke="#FFB627" stroke-width="2.5"/>',
  cave:
    '<path d="M6 74 V38 a54 32 0 0 1 108 0 v36z" fill="#8A7360"/>'+
    '<path d="M22 74 V44 a38 24 0 0 1 76 0 v30z" fill="#5C4A3C"/>'+
    '<path d="M46 50 q-8 6 -2 14 q3 5 9 3 q7 -3 5 -10 q-2 -8 -12 -7z" fill="#E8D5BE"/>'+
    '<g stroke="#E8D5BE" stroke-width="3" stroke-linecap="round">'+
      '<path d="M44 52 l-8 -7 M45 62 l-9 3 M56 50 l3 -9 M60 58 l9 -4 M56 66 l4 8"/></g>'+
    '<path d="M78 46 l14 22" stroke="#C79A63" stroke-width="3.5" stroke-linecap="round"/>'+
    '<path d="M78 46 l-4 7 l8 -1z" fill="#E8D5BE"/>',
  pyramid:
    '<rect x="0" y="66" width="120" height="14" fill="#F3E3CE"/>'+
    '<circle cx="100" cy="16" r="10" fill="#FFB627"/>'+
    '<path d="M16 66 L46 16 L76 66z" fill="#E0C08A"/>'+
    '<path d="M46 16 L46 66 L16 66z" fill="#C9A566"/>'+
    '<path d="M74 66 L92 36 L110 66z" fill="#E0C08A"/>'+
    '<path d="M92 36 L92 66 L74 66z" fill="#C9A566"/>',
  column:
    '<rect x="26" y="8" width="68" height="9" rx="2" fill="#DCE6F0"/>'+
    '<rect x="30" y="17" width="60" height="7" rx="2" fill="#CBD6E2"/>'+
    '<rect x="38" y="24" width="44" height="42" fill="#DCE6F0"/>'+
    '<g stroke="#B8C9DA" stroke-width="2.5"><path d="M46 24 v42 M55 24 v42 M65 24 v42 M74 24 v42"/></g>'+
    '<rect x="30" y="66" width="60" height="7" rx="2" fill="#CBD6E2"/>'+
    '<rect x="24" y="73" width="72" height="7" rx="2" fill="#B8C9DA"/>',
  harbour:
    '<rect x="0" y="54" width="120" height="26" fill="#9CD3F5"/>'+
    '<rect x="10" y="20" width="16" height="34" fill="#7C8FA3"/>'+
    '<rect x="30" y="10" width="14" height="44" fill="#5E7183"/>'+
    '<rect x="48" y="26" width="18" height="28" fill="#9FB3C8"/>'+
    '<g fill="#FFB627"><rect x="14" y="26" width="4" height="5"/><rect x="34" y="16" width="4" height="5"/>'+
      '<rect x="34" y="28" width="4" height="5"/><rect x="53" y="32" width="4" height="5"/></g>'+
    '<path d="M74 44 h40 l-6 12 h-28z" fill="#FF6F52"/>'+
    '<rect x="80" y="30" width="26" height="14" rx="2" fill="#E1EAF2"/>'+
    '<path d="M0 62 q10 -5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0" stroke="#fff" stroke-width="2.5" fill="none" opacity=".7"/>',
  helmet:
    '<path d="M30 34 a30 30 0 0 1 60 0 v26 a12 12 0 0 1 -12 12 h-36 a12 12 0 0 1 -12 -12z" fill="#CBD6E2" stroke="#9FB3C8" stroke-width="3"/>'+
    '<rect x="38" y="38" width="44" height="7" rx="3" fill="#2A3B4D"/>'+
    '<rect x="38" y="50" width="44" height="7" rx="3" fill="#2A3B4D"/>'+
    '<path d="M60 4 v10" stroke="#9FB3C8" stroke-width="3"/>'+
    '<path d="M60 4 q16 4 14 18 q-8 -8 -14 -6z" fill="#FF6F52"/>',
  galleon:
    '<rect x="0" y="58" width="120" height="22" fill="#9CD3F5"/>'+
    '<path d="M60 8 V58" stroke="#8A5A3B" stroke-width="4"/>'+
    '<path d="M62 12 q22 8 0 18z" fill="#F7FAFF" stroke="#CBD6E2" stroke-width="2"/>'+
    '<path d="M58 34 q-24 8 0 18z" fill="#F7FAFF" stroke="#CBD6E2" stroke-width="2"/>'+
    '<path d="M62 34 q24 8 0 18z" fill="#EAF2FB" stroke="#CBD6E2" stroke-width="2"/>'+
    '<path d="M20 56 h80 l-12 16 h-56z" fill="#A9743F"/>'+
    '<path d="M24 62 h72" stroke="#8A5A3B" stroke-width="3"/>'+
    '<path d="M0 70 q10 -5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0" stroke="#fff" stroke-width="2.5" fill="none" opacity=".7"/>',
  cog:
    '<g fill="#7C8FA3"><rect x="52" y="2" width="16" height="14" rx="3"/>'+
      '<rect x="52" y="60" width="16" height="14" rx="3"/>'+
      '<rect x="18" y="30" width="14" height="16" rx="3"/>'+
      '<rect x="88" y="30" width="14" height="16" rx="3"/>'+
      '<rect x="26" y="9" width="16" height="14" rx="3" transform="rotate(-45 34 16)"/>'+
      '<rect x="78" y="9" width="16" height="14" rx="3" transform="rotate(45 86 16)"/>'+
      '<rect x="26" y="53" width="16" height="14" rx="3" transform="rotate(45 34 60)"/>'+
      '<rect x="78" y="53" width="16" height="14" rx="3" transform="rotate(-45 86 60)"/></g>'+
    '<circle cx="60" cy="38" r="28" fill="#9FB3C8"/>'+
    '<circle cx="60" cy="38" r="11" fill="#F2F7FC"/>',
  plane:
    '<path d="M4 44 L104 30 l12 6 l-12 6 L4 50z" fill="#E1EAF2" stroke="#B8C9DA" stroke-width="2.5"/>'+
    '<path d="M46 40 L34 10 h10 l24 28z" fill="#2F73E8"/>'+
    '<path d="M46 48 L34 74 h10 l24 -24z" fill="#2F73E8"/>'+
    '<path d="M96 34 L88 18 h7 l12 15z" fill="#1E5FC4"/>'+
    '<g fill="#9CD3F5"><circle cx="62" cy="44" r="3"/><circle cx="72" cy="43" r="3"/>'+
      '<circle cx="82" cy="42" r="3"/></g>',
  urn:
    '<path d="M46 10 h28 v8 l-6 4 q18 8 18 28 q0 22 -26 22 q-26 0 -26 -22 q0 -20 18 -28 l-6 -4z" fill="#C79A63" stroke="#A9743F" stroke-width="2.5"/>'+
    '<g stroke="#8A5A3B" stroke-width="2.5" fill="none"><path d="M40 44 h40 M44 56 h32"/></g>'+
    '<path d="M60 36 l4 7 h-8z" fill="#8A5A3B"/>'+
    '<path d="M94 8 L82 30" stroke="#B8C9DA" stroke-width="4" stroke-linecap="round"/>'+
    '<path d="M82 30 q4 10 8 0z" fill="#5E7183"/>',

  /* --- geography --- */
  island:
    '<rect x="0" y="46" width="120" height="34" fill="#9CD3F5"/>'+
    '<ellipse cx="60" cy="52" rx="38" ry="12" fill="#EFE0BC"/>'+
    '<ellipse cx="60" cy="49" rx="26" ry="8" fill="#DFF3E4"/>'+
    '<path d="M58 48 V22" stroke="#A9743F" stroke-width="4" stroke-linecap="round"/>'+
    '<g fill="#2C7A46"><path d="M58 22 q-18 -4 -22 8 q14 -2 22 -2z"/><path d="M58 22 q18 -4 22 8 q-14 -2 -22 -2z"/>'+
      '<path d="M58 20 q-6 -14 -20 -14 q10 10 20 16z"/><path d="M58 20 q6 -14 20 -14 q-10 10 -20 16z"/></g>'+
    '<path d="M0 60 q10 -5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0" stroke="#fff" stroke-width="2.5" fill="none" opacity=".7"/>',
  river:
    '<rect x="0" y="0" width="120" height="80" fill="#DFF3E4"/>'+
    '<path d="M46 0 q-14 22 4 34 q20 14 2 30 q-12 10 -6 16" stroke="#9CD3F5" stroke-width="18" fill="none" stroke-linecap="round"/>'+
    '<path d="M46 0 q-14 22 4 34 q20 14 2 30 q-12 10 -6 16" stroke="#BDE4FA" stroke-width="9" fill="none" stroke-linecap="round"/>'+
    '<g fill="#2C7A46"><circle cx="16" cy="20" r="8"/><circle cx="96" cy="16" r="9"/>'+
      '<circle cx="104" cy="48" r="7"/><circle cx="18" cy="58" r="8"/></g>'+
    '<g fill="#A9743F"><rect x="14" y="26" width="4" height="8"/><rect x="94" y="23" width="4" height="9"/>'+
      '<rect x="102" y="53" width="4" height="7"/><rect x="16" y="64" width="4" height="8"/></g>',
  volcano:
    '<rect x="0" y="66" width="120" height="14" fill="#8A7360"/>'+
    '<path d="M14 66 L44 22 h32 l30 44z" fill="#5C4A3C"/>'+
    '<path d="M44 22 h32 l-6 8 h-20z" fill="#3E332A"/>'+
    '<path d="M48 26 q6 12 12 0 q4 14 12 2 l6 38 h-36z" fill="#FF6F52"/>'+
    '<path d="M52 30 q5 10 9 0 q3 11 9 2 l3 32 h-24z" fill="#FFB627"/>'+
    '<g fill="#7C8FA3" opacity=".8"><circle cx="46" cy="12" r="8"/><circle cx="62" cy="6" r="9"/>'+
      '<circle cx="78" cy="12" r="7"/></g>',
  wave:
    '<rect x="0" y="34" width="120" height="46" fill="#9CD3F5"/>'+
    '<path d="M4 44 q22 -30 48 -8 q18 15 6 24 q-10 8 -18 -2 q-6 -8 2 -13 q7 -4 11 2 q-8 -2 -8 4" fill="#BDE4FA" stroke="#6FC2EE" stroke-width="2.5" stroke-linejoin="round"/>'+
    '<path d="M0 68 q10 -5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>'+
    '<path d="M96 52 q10 -12 18 0 q-9 10 -18 0z" fill="#FFE9D2" stroke="#F0C89A" stroke-width="2"/>'+
    '<g stroke="#F0C89A" stroke-width="1.6"><path d="M99 50 l12 3 M101 46 l9 6"/></g>',
  desert:
    '<rect x="0" y="0" width="120" height="80" fill="#FFF1CE"/>'+
    '<circle cx="98" cy="16" r="11" fill="#FFB627"/>'+
    '<path d="M0 62 q26 -18 52 -2 q22 14 68 -4 v24 H0z" fill="#E0C08A"/>'+
    '<path d="M0 72 q30 -10 60 0 q30 10 60 0 v8 H0z" fill="#C9A566"/>'+
    '<rect x="34" y="34" width="11" height="34" rx="5" fill="#4FB86B"/>'+
    '<path d="M39 48 h-10 a6 6 0 0 0 -6 6 v6" stroke="#4FB86B" stroke-width="7" fill="none" stroke-linecap="round"/>'+
    '<path d="M40 42 h9 a6 6 0 0 1 6 6 v9" stroke="#4FB86B" stroke-width="7" fill="none" stroke-linecap="round"/>',
  earthlayers:
    '<circle cx="60" cy="40" r="36" fill="#9CD3F5"/>'+
    '<path d="M60 4 a36 36 0 0 1 0 72z" fill="#4FB86B"/>'+
    '<path d="M60 4 A36 36 0 0 0 60 76 A36 36 0 0 0 96 40z" fill="none"/>'+
    '<path d="M60 12 a28 28 0 0 1 0 56z" fill="#E8B87A"/>'+
    '<path d="M60 22 a18 18 0 0 1 0 36z" fill="#FF6F52"/>'+
    '<path d="M60 32 a8 8 0 0 1 0 16z" fill="#FFD84D"/>'+
    '<circle cx="60" cy="40" r="36" fill="none" stroke="#2F73E8" stroke-width="3"/>'+
    '<path d="M60 4 V76" stroke="#2F73E8" stroke-width="2.5"/>',
  umbrella:
    '<g stroke="#2F73E8" stroke-width="4" stroke-linecap="round">'+
      '<path d="M24 62 l-4 12"/><path d="M50 66 l-4 12"/><path d="M76 62 l-4 12"/><path d="M100 66 l-4 12"/></g>'+
    '<path d="M12 42 a48 48 0 0 1 96 0 q-12 -8 -24 0 q-12 -8 -24 0 q-12 -8 -24 0 q-12 -8 -24 0z" fill="#FF6F52"/>'+
    '<path d="M60 42 V64 a8 8 0 0 0 16 0" stroke="#5E7183" stroke-width="4" fill="none" stroke-linecap="round"/>'+
    '<path d="M60 -2 V6" stroke="#5E7183" stroke-width="3"/>',
  recycle:
    '<g fill="#4FB86B">'+
      '<path d="M60 8 l14 23 h-8.5 v11 h-11 v-11 h-8.5z"/>'+
      '<path d="M60 8 l14 23 h-8.5 v11 h-11 v-11 h-8.5z" transform="rotate(120 60 44)"/>'+
      '<path d="M60 8 l14 23 h-8.5 v11 h-11 v-11 h-8.5z" transform="rotate(240 60 44)"/></g>'
};
/* No name, or a name nothing was drawn for, and the card simply has no picture
   — which is why every rung has to read on its own and a typo here is only
   ever cosmetic. */
function picSVG(name){
  var d = name && QPIC[name];
  return d ? '<svg class="qpic" viewBox="0 0 120 80" aria-hidden="true">'+d+'</svg>' : "";
}

/* ==========================================================================
   THE CLOCK FACE — drawn fresh for every question, unlike everything in QPIC.

   A rung picture illustrates the topic and must never answer the question.
   This one IS the question: the hands are the thing being read, so it is
   built per item from the hour and minute rather than per rung, and it is the
   only drawing in the app that carries information.

   That is also why it is not aria-hidden and gets a real label. A card that
   fails to draw a QPIC picture loses nothing; a card that fails to draw this
   has no question left, so the time goes into aria-label and a boy using a
   screen reader is told it in words.

   The two hands are made as unlike each other as a drawing can make them —
   short, fat and blue against long, thin and orange — because "which hand is
   which" is the whole of what a six-year-old gets wrong, and a clock with two
   similar hands teaches him to guess.
   ========================================================================== */
function clockHand(len, deg, w, col){
  var r = (deg - 90) * Math.PI / 180;
  return '<path d="M60 60 L' + (60 + len * Math.cos(r)).toFixed(1) + ' ' +
         (60 + len * Math.sin(r)).toFixed(1) + '" stroke="' + col +
         '" stroke-width="' + w + '" stroke-linecap="round"/>';
}
function clockSVG(h, m, label){
  var s = '<svg class="clockpic" viewBox="0 0 120 120" role="img" aria-label="' +
          esc(label || "a clock face") + '">';
  s += '<circle cx="60" cy="60" r="55" fill="#fff" stroke="#2F73E8" stroke-width="4"/>';
  var i, r, x1, y1, x2, y2;
  /* every minute gets a mark: without them the top rung, which asks for a time
     to the exact minute, is a guess rather than a reading */
  for(i = 0; i < 60; i++){
    r = (i * 6 - 90) * Math.PI / 180;
    var big = (i % 5 === 0), inner = big ? 45 : 48;
    x1 = 60 + inner * Math.cos(r); y1 = 60 + inner * Math.sin(r);
    x2 = 60 + 51 * Math.cos(r);    y2 = 60 + 51 * Math.sin(r);
    s += '<path d="M' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' L' + x2.toFixed(1) +
         ' ' + y2.toFixed(1) + '" stroke="' + (big ? "#16222E" : "#B8C9DA") +
         '" stroke-width="' + (big ? 3 : 1.5) + '" stroke-linecap="round"/>';
  }
  for(i = 1; i <= 12; i++){
    r = (i * 30 - 90) * Math.PI / 180;
    s += '<text x="' + (60 + 36 * Math.cos(r)).toFixed(1) + '" y="' +
         (60 + 36 * Math.sin(r)).toFixed(1) + '" text-anchor="middle" ' +
         'dominant-baseline="central" font-size="13" font-weight="700" ' +
         'fill="#16222E">' + i + '</text>';
  }
  s += clockHand(28, ((h % 12) + m / 60) * 30, 7.5, "#2F73E8");   /* hour, short and fat */
  s += clockHand(44, m * 6, 4, "#FF6F52");                        /* minute, long and thin */
  s += '<circle cx="60" cy="60" r="4.5" fill="#16222E"/>';
  return s + '</svg>';
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
  /* Any language that is not English, now that there are four of them. */
  var foreign = lang.indexOf("en")!==0;
  var u=new SpeechSynthesisUtterance(t), v=bestVoice(lang);
  /* An English voice reading Chinese is worse than silence: it teaches the
     wrong sounds. Say nothing and let the screen carry it. The same goes for
     ねこ and 안녕하세요 — a tablet with no Japanese voice used to read the kana
     out in an English accent, which is a lesson in how not to say it. */
  if(foreign && !v) return;
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
