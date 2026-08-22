/* ==========================================================================
   CHEWTOPIA — APP. Draws the tab bar, routes to each screen, and holds the
   three small ones: Upcoming, Meals and Progress. Loads last.
   ========================================================================== */

function render(){
  applyScene();
  var sb=document.getElementById("scenes");
  if(sb){
    sb.innerHTML=sceneBar()+sndToggle();
    var sn=sb.querySelector("#sndBtn");
    if(sn){
      sn.setAttribute("aria-pressed", snd()?"true":"false");
      sn.onclick=function(){ W("snd", snd()?"off":"on"); sfxTap(); render(); };
    }
    sb.querySelectorAll("[data-scene]").forEach(function(b){
      b.onclick=function(){ W("scene", b.dataset.scene); sfxTap(); render(); };
    });
  }
  document.getElementById("mark").innerHTML =
    "CHEWTOPIA".split("").map(function(c){return "<span>"+c+"</span>";}).join("");

  var tb=document.getElementById("tabs"); tb.innerHTML="";
  TABS.forEach(function(t){
    /* family screens on the left, the two child screens on the right */
    if(t[0]==="practice"){
      var d=document.createElement("span"); d.className="tabdiv"; tb.appendChild(d);
    }
    var b=document.createElement("button");
    b.className="tab "+(t[2]||"t-blue")+(t[0]===tab?" on":"");
    b.textContent=t[1];
    /* the ring says which tab you are on; this says it out loud too */
    if(t[0]===tab) b.setAttribute("aria-current","page");
    b.onclick=function(){ sfxSwipe(); go(t[0]); };
    tb.appendChild(b);
  });

  var v=document.getElementById("view");
  if(quiz){ v.innerHTML=quizHTML(); wireQuiz(); return; }
  var V={home:vHome,schedule:vWeek,meals:vMeals,practice:vTests,reading:vRead,links:vLinks};
  var Wr={home:wHome,schedule:wWeek,meals:wMeals,practice:wTests,reading:wRead,links:wLinks};
  /* the child switch belongs inside the first panel, under its heading */
  var html=V[tab]();
  if(tab==="home"||tab==="schedule") html=html.replace("</h2>", "</h2>"+whoBar());
  v.innerHTML=html; Wr[tab]();
  document.querySelectorAll("[data-vw]").forEach(function(b){
    b.onclick=function(){ W("vwho", b.dataset.vw); sfxPop(); render(); };
  });
  document.querySelectorAll("textarea.cell").forEach(grow);
}

/* Today's food, shown on Upcoming so it is there without switching tabs. */
function todayFood(){
  var d=DAYS[todayIdx()];
  var m=SJ("meals:"+monKey(),null)||mealPlan();
  var bk=SJ("brek:"+monKey(),null)||BREAKFAST_DEFAULT;
  var b=bk[d]||"", n=m[d]||"";
  if(!b && !n) return "";
  function lines(x){ return esc(x).replace(/\n/g,"<br>"); }
  return '<div class="panel"><h2><span class="em">\uD83C\uDF5C</span> Eating today'+
    '<span class="side">'+d+'</span></h2>'+
    (b?'<div class="ml">Breakfast</div><p class="fd">'+lines(b)+'</p>':'')+
    (n?'<div class="ml">Dinner</div><p class="fd">'+lines(n)+'</p>':'')+
    '</div>';
}

/* ==========================================================================
   UPCOMING — a rolling four-week agenda. Date down the left, then a column per
   boy, so the eye lands on "when" first and "who" second. Every day is listed,
   including the empty ones, so a quiet week can be seen to be quiet.
   ========================================================================== */
function evCard(e){
  var st=evState(e);
  return '<div class="evc e-'+(e.w||"all")+(st.live?" live":"")+(e.hol?" hol":"")+'">'+
    '<span class="evt">'+esc(e.t)+'</span>'+
    '<span class="evw">'+(st.live?(e.d2?"On now":"Today"):evWhen(e))+
      (e.time?' \u00b7 '+e.time:'')+
      (e.d2?' \u00b7 to '+dnum(e.d2)+' '+dmon(e.d2):'')+'</span>'+
    (e.n?'<span class="nt">'+esc(e.n)+'</span>':'')+
    (e.p?'<button class="prac '+whoCls(e.w)+'" data-go="'+esc(e.p)+'" data-who="'+esc(e.w||"")+'">'+
         '\u25b6 '+esc(practiceLabel(e.p))+'</button>':'')+
    /* school forms arrive as a link; a note you cannot tap is a note you
       have to go and find again later */
    (e.url?'<a class="prac evlink" href="'+esc(e.url)+'" target="_blank" '+
         'rel="noopener noreferrer">Open the form \u2197</a>':'')+
    (fromSeed(e.id)?'':'<button class="x" data-del="'+e.id+'" title="Remove">&times;</button>')+
    '</div>';
}

/* ---------- the rolling window ---------- */
/* Four weeks, every single day, so a quiet fortnight reads as a quiet fortnight
   instead of the screen looking broken. Skipping the empty days made the list
   shorter but you could no longer tell "nothing on" from "nothing entered". */
var AGENDA_DAYS = 28;
function isoOf(d){
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+
         "-"+String(d.getDate()).padStart(2,"0");
}
function rollingDays(n){
  var d=new Date(); d.setHours(0,0,0,0);
  var out=[];
  for(var i=0;i<n;i++){ var x=new Date(d); x.setDate(d.getDate()+i); out.push(isoOf(x)); }
  return out;
}
/* Which Monday a date belongs to, and what to call that week. */
function mondayOf(isoStr){
  var d=new Date(isoStr+"T00:00:00");
  d.setDate(d.getDate()-((d.getDay()+6)%7));
  return isoOf(d);
}
function weekLabel(monIso){
  var here=mondayOf(isoOf(new Date()));
  var gap=Math.round((new Date(monIso+"T00:00:00")-new Date(here+"T00:00:00"))/604800000);
  if(gap===0) return "This week";
  if(gap===1) return "Next week";
  var a=new Date(monIso+"T00:00:00"), b=new Date(a); b.setDate(a.getDate()+6);
  return "Week of "+a.getDate()+" "+a.toLocaleDateString("en-GB",{month:"short"})+
         " – "+b.getDate()+" "+b.toLocaleDateString("en-GB",{month:"short"});
}
function isWeekend(isoStr){ var g=new Date(isoStr+"T00:00:00").getDay(); return g===0||g===6; }

/* ==========================================================================
   SCHOOL — the handful of sites the school sends you to, one tap each.
   They open in a new tab and log in there. Nothing is stored here.
   ========================================================================== */
function vLinks(){
  var s='<div class="panel"><h2><span class="em">\uD83C\uDFEB</span> School sites'+
        '<span class="side">opens in a new tab</span></h2>'+
        '<div class="lnks">';
  (typeof SCHOOL_LINKS!=="undefined" ? SCHOOL_LINKS : []).forEach(function(l){
    s+='<a class="lnk l-'+esc(l.k)+'" href="'+esc(l.u)+'" target="_blank" rel="noopener noreferrer">'+
       '<span class="lnt">'+esc(l.t)+(l.cn?' <b>'+esc(l.cn)+'</b>':'')+'</span>'+
       '<span class="lns">'+esc(l.s)+'</span>'+
       '<span class="lnu">'+esc(String(l.u).replace(/^https:\/\//,""))+'</span>'+
       '<span class="lngo">\u2197</span></a>';
  });
  s+='</div><div class="key">Chewtopia never asks for or keeps a password. '+
     'Each of these takes you to the school\u2019s own login page, where the '+
     'usual MIMS details go in.</div></div>';
  return s;
}
function wLinks(){
  document.querySelectorAll(".lnk").forEach(function(a){
    a.addEventListener("click", function(){ sfxTap(); });
  });
}

function vHome(){
  var f=vwho(), kids=shownKids();
  var evs=SJ("events",[]).filter(function(e){ return !evState(e).gone; })
    .filter(function(e){ return f==="all" || !e.w || e.w===f; })
    .sort(function(a,b){ return evState(a).start-evState(b).start; });

  var s='<div class="panel"><h2><span class="em">📅</span> What is coming'+
        '<span class="side">next 4 weeks</span></h2>';

  var days=rollingDays(AGENDA_DAYS), today=days[0], last=days[days.length-1];
  /* A trip that started before today still belongs on today, not off the top. */
  var byDay={}, later=[], laterDays=[];
  evs.forEach(function(e){
    var key = e.d < today ? today : e.d;
    if(key>last){
      if(!byDay[e.d]){ byDay[e.d]=[]; laterDays.push(e.d); }
      byDay[e.d].push(e); later.push(e); return;
    }
    (byDay[key]=byDay[key]||[]).push(e);
  });

  s+='<div class="agenda'+(kids.length===1?" solo":"")+'">'+
     '<span class="agh"></span>'+
     kids.map(function(k){ return '<span class="agh '+whoCls(k.id)+'">'+esc(pname(k.id))+'</span>'; }).join("");

  function dayRows(list, d, dim){
    var out="", has=!!(list&&list.length);
    /* a day off colours its own date too, so no-school days can be counted
       down the left edge without reading a word */
    var off = has && list.some(function(e){ return e.hol; });
    out+='<span class="agd'+(d===today?" now":"")+(isWeekend(d)?" we":"")+
         (off?" off":"")+(has?"":" bare")+'"><b>'+dnum(d)+'</b><i>'+
         dday(d).slice(0,3)+'</i></span>';
    kids.forEach(function(k){
      var mine=has ? list.filter(function(e){ return e.w===k.id; }) : [];
      out+='<span class="agc'+(has?"":" bare")+'">'+mine.map(evCard).join("")+'</span>';
    });
    var all=has ? list.filter(function(e){ return !e.w; }) : [];
    if(all.length){
      out+='<span class="agd sp"></span><span class="agc both">'+
           all.map(evCard).join("")+'</span>';
    }
    return out;
  }

  var lastWk="";
  days.forEach(function(d){
    var mon=mondayOf(d);
    if(mon!==lastWk){
      lastWk=mon;
      var mine=days.filter(function(x){ return mondayOf(x)===mon && (byDay[x]||[]).length; });
      s+='<span class="agwk">'+esc(weekLabel(mon))+
         '<i>'+(mine.length ? mine.length+(mine.length===1?" day on":" days on") : "clear")+'</i></span>';
    }
    s+=dayRows(byDay[d], d);
  });

  /* Past the four weeks, only the next few — the holiday list runs to the end
     of next year and nobody needs Christmas 2027 under this week's spelling. */
  if(laterDays.length){
    laterDays.sort();
    var show=laterDays.slice(0,3);
    var restDays=laterDays.length-show.length;
    var restEvs=0;
    laterDays.slice(3).forEach(function(d){ restEvs+=byDay[d].length; });
    s+='<span class="agwk">After that<i>'+
       (restDays?"next 3 of "+laterDays.length:laterDays.length+
         (laterDays.length===1?" day":" days"))+'</i></span>';
    show.forEach(function(d){ s+=dayRows(byDay[d], d); });
    if(restEvs){
      s+='<span class="agd sp"></span><span class="agc both">'+
         '<p class="empty" style="padding:2px 0">and '+restEvs+' more further out, '+
         'the last on '+dfull(laterDays[laterDays.length-1])+'.</p></span>';
    }
  }
  s+='</div>';

  if(showAdd){
    var opts='<option value="">Everyone</option>'+KIDS.map(function(k){
      return '<option value="'+k.id+'"'+(k.id===who()?" selected":"")+'>'+esc(pname(k.id))+'</option>'; }).join("");
    s+='<div class="lbl">What</div><input type="text" id="eT" maxlength="60" placeholder="华文听写 Week 6">'+
       '<div class="lbl">When</div><input type="date" id="eD">'+
       '<div class="lbl">Time (optional)</div><input type="time" id="eTm">'+
       '<div class="lbl">Details (optional)</div><textarea id="eN" class="cell" style="min-height:64px" placeholder="What to bring, where, what time"></textarea>'+
       '<div class="lbl">Until (trips only)</div><input type="date" id="eD2">'+
       '<div class="lbl">Who</div><select id="eW">'+opts+'</select>'+
       '<div class="btnrow"><button class="btn go" id="eAdd">Add</button>'+
       '<button class="btn soft" id="eCancel">Cancel</button></div>';
  } else s+='<button class="addlink" id="eShow">+ Add something</button>';

  return s+'</div>'+todayFood();
}

function vMeals(){
  var m=SJ("meals:"+monKey(),null)||mealPlan();
  var bk=SJ("brek:"+monKey(),null)||BREAKFAST_DEFAULT;
  var dt=weekDates();
  var s='<div class="panel"><h2><span class="em">\uD83C\uDF5C</span> Meals this week'+
    '<span class="side">Dinner week '+(rotIdx()+1)+' of 4</span></h2>';
  DAYS.forEach(function(d,i){
    s+='<div class="mealday'+(i===todayIdx()?" now":"")+'">'+
       '<div class="mh">'+d+' <em>'+dt[i].getDate()+' '+
         dt[i].toLocaleDateString("en-GB",{month:"short"})+'</em></div>'+
       '<div class="mcols">'+
         '<div class="mcol b"><div class="ml">Breakfast</div>'+
         '<textarea class="cell brek" data-brek="'+d+'" placeholder="\u2014">'+esc(bk[d]||"")+'</textarea></div>'+
         '<div class="mcol d"><div class="ml">Dinner</div>'+
         '<textarea class="cell dinr" data-meal="'+d+'" placeholder="\u2014">'+esc(m[d]||"")+'</textarea></div>'+
       '</div></div>';
  });
  return s+'<div class="btnrow"><button class="btn soft" id="mR">Reset to week '+(rotIdx()+1)+'</button></div>'+
    '<div class="saved" id="mS"></div>'+
    /* Scores, books and Upcoming all sync; this does not, and it looks
       identical, so it has to say so rather than be found out. */
    '<div class="key">Meals and the grocery list stay on this device \u2014 they are '+
    'not part of the family sync.</div></div>'+
    '<div class="panel"><h2><span class="em">\uD83D\uDED2</span> Groceries</h2>'+
    '<textarea class="cell" id="gr" style="min-height:130px" placeholder="What to buy">'+
    esc(S("groc:"+monKey(),""))+'</textarea><div class="saved" id="gS"></div></div>';
}
function wMeals(){
  document.querySelectorAll("[data-meal]").forEach(function(t){
    t.oninput=function(){ grow(t);
      var m=SJ("meals:"+monKey(),null)||JSON.parse(JSON.stringify(mealPlan()));
      m[t.dataset.meal]=t.value; WJ("meals:"+monKey(),m); flash("mS"); }; });
  document.querySelectorAll("[data-brek]").forEach(function(t){
    t.oninput=function(){ grow(t);
      var b=SJ("brek:"+monKey(),null)||JSON.parse(JSON.stringify(BREAKFAST_DEFAULT));
      b[t.dataset.brek]=t.value; WJ("brek:"+monKey(),b); flash("mS"); }; });
  document.getElementById("mR").onclick=function(){
    if(confirm("Reset this week's meals to the printed plan?")){
      WJ("meals:"+monKey(),mealPlan()); WJ("brek:"+monKey(),BREAKFAST_DEFAULT); render(); } };
  var g=document.getElementById("gr");
  g.oninput=function(){ grow(g); W("groc:"+monKey(),g.value); flash("gS"); };
}

function wHome(){
  document.querySelectorAll("[data-del]").forEach(function(b){
    b.onclick=function(){
      if(!confirm("Remove this from Upcoming?")) return;
      markGone(b.dataset.del);
      WJ("events",SJ("events",[]).filter(function(e){return e.id!==b.dataset.del;})); render(); }; });
  document.querySelectorAll("[data-go]").forEach(function(b){
    b.onclick=function(){
      if(b.dataset.who) W("who", b.dataset.who);
      tab="practice"; showAdd=false;
      try{ location.hash="#training"; }catch(e){}
      start(b.dataset.go);
    };
  });
  var sh=document.getElementById("eShow");
  if(sh) sh.onclick=function(){ showAdd=true; render(); };
  var cx=document.getElementById("eCancel");
  if(cx) cx.onclick=function(){ showAdd=false; render(); };
  var ad=document.getElementById("eAdd");
  if(ad) ad.onclick=function(){
    var t=document.getElementById("eT").value.trim(), d=document.getElementById("eD").value;
    if(!t||!d){ alert("Needs a name and a date."); return; }
    var rec={id:Date.now()+"",t:t.slice(0,60),d:d,w:document.getElementById("eW").value};
    var tm=document.getElementById("eTm").value; if(tm) rec.time=tm;
    var nn=document.getElementById("eN").value.trim(); if(nn) rec.n=nn.slice(0,600);
    var d2=document.getElementById("eD2").value; if(d2&&d2>=d) rec.d2=d2;
    var a=SJ("events",[]); a.push(rec); WJ("events",a);
    showAdd=false; render();
  };
}

/* ==========================================================================
   READING — books finished, in either language
   ========================================================================== */
var showBook=false;
function vRead(){
  var s='<div class="panel"><h2><span class="em">\uD83D\uDCDA</span> Reading</h2><div class="duo">';
  shownKids().forEach(function(k){
    var all=books(k.id), m=booksSince(k.id,30);
    var en=all.filter(function(b){return b.l==="en";}).length, cn=all.length-en;
    s+='<div class="kidbox"><div class="kidname '+whoCls(k.id)+'">'+esc(pname(k.id))+
       '<small>'+all.length+(all.length===1?" book":" books")+'</small></div>'+
       '<div class="rdsum"><span class="rdc en">'+en+' English</span>'+
       '<span class="rdc cn">'+cn+' \u534e\u6587</span>'+
       '<span class="rdc mo">'+m.length+' this month</span></div>';
    if(!all.length) s+='<p class="empty">Nothing logged yet.</p>';
    else all.slice(0,12).forEach(function(b){
      s+='<div class="bk"><span class="bl '+(b.l==="en"?"en":"cn")+'">'+
         (b.l==="en"?"EN":"\u4e2d")+'</span>'+
         '<span class="btx">'+esc(b.t)+'<small>'+
         new Date(b.ts).toLocaleDateString("en-GB",{day:"numeric",month:"short"})+
         (b.r?' \u00b7 '+"\u2605".repeat(b.r):"")+'</small></span>'+
         '<button class="x" data-bk="'+k.id+':'+b.id+'" title="Remove">&times;</button></div>';
    });
    if(all.length>12) s+='<p class="empty">'+(all.length-12)+' more before these.</p>';
    s+='</div>';
  });
  s+='</div></div>';

  if(showBook){
    s+='<div class="panel"><h2>Add a book</h2>'+
       '<div class="lbl">Title</div><input type="text" id="bT" maxlength="70" placeholder="\u6bdb\u6bdb\u866b\u7684\u978b\u5b50">'+
       '<div class="lbl">Who read it</div><select id="bW">'+
       KIDS.map(function(k){ return '<option value="'+k.id+'"'+(k.id===who()?" selected":"")+'>'+esc(pname(k.id))+'</option>'; }).join("")+
       '</select>'+
       '<div class="lbl">Language</div><select id="bL">'+
       '<option value="en">English</option><option value="cn">\u534e\u6587</option></select>'+
       '<div class="lbl">Did they like it?</div><select id="bR">'+
       '<option value="">No rating</option><option value="3">\u2605\u2605\u2605 loved it</option>'+
       '<option value="2">\u2605\u2605 good</option><option value="1">\u2605 ok</option></select>'+
       '<div class="btnrow"><button class="btn go" id="bAdd">Add</button>'+
       '<button class="btn soft" id="bCancel">Cancel</button></div></div>';
  } else {
    s+='<div class="panel"><button class="addlink" id="bShow">+ Finished a book</button></div>';
  }
  return s;
}
function wRead(){
  var sh=document.getElementById("bShow");
  if(sh) sh.onclick=function(){ showBook=true; render(); };
  var cx=document.getElementById("bCancel");
  if(cx) cx.onclick=function(){ showBook=false; render(); };
  var ad=document.getElementById("bAdd");
  if(ad) ad.onclick=function(){
    var t=document.getElementById("bT").value.trim();
    if(!t){ alert("Needs a title."); return; }
    var w=document.getElementById("bW").value;
    addBook(w,{id:Date.now()+"", t:t.slice(0,70), l:document.getElementById("bL").value,
               r:+document.getElementById("bR").value||0, ts:Date.now()});
    showBook=false; render();
  };
  document.querySelectorAll("[data-bk]").forEach(function(b){
    b.onclick=function(){
      if(!confirm("Remove this book?")) return;
      var p=b.dataset.bk.split(":"); delBook(p[0],p[1]); render();
    };
  });
}

/* ==========================================================================
   PROGRESS — one matrix: the two boys across, the subjects down.
   Green is full marks, amber is close, red needs work.
   ========================================================================== */

/* Practice runs made straight after a test, fixing the missed ones, are not
   a fair score of the whole list, so they never reach this screen. */
function isFixing(r){ return /^Fixing/.test(String(r.test||"")); }

/* Which subject a run belongs to. The code comes first because runs pulled
   back down from the cloud do not carry the subject with them. */
/* The code the school and the boys actually use, with the plain word under it
   so nobody has to translate. The timetable two tabs away already says EL, CL
   and MA; these columns used to say English, 华文 and Maths, which meant the
   app disagreed with itself about what its own subjects are called. */
var SUBJ_COLS=[["en","EL","English"],["zh","CL","\u534e\u6587"],["ma","MA","Maths"]];
function runSubject(r){
  var c=String(r.code||"").split("|")[0];
  if(c==="en"||c==="es") return "en";
  if(c==="zh"||c==="hz"||c==="rn") return "zh";
  if(c==="ma") return "ma";
  if(c==="weak"||c==="review"||c==="daily") return "rv";
  if(r.subject==="English") return "en";
  if(r.subject==="Math") return "ma";
  if(r.subject==="\u534e\u6587") return "zh";
  var t=String(r.test||"");
  if(/^Math/.test(t)) return "ma";
  if(/^Review/.test(t)) return "rv";
  if(/[\u4e00-\u9fff]/.test(t)) return "zh";
  return "en";
}
function scoreCls(sc,tot){
  if(!tot) return "none";
  return sc>=tot ? "good" : (sc/tot>=0.7 ? "mid" : "low");
}
function dshort(ts){
  return new Date(ts).toLocaleDateString("en-GB",{day:"numeric",month:"short"});
}

/* subject -> test name -> child -> {best, total, tries, last} */
/* ==========================================================================
   REMOVED: the Progress screen and the PIN-gated marking sheet.
   vResults() was never reachable \u2014 render()'s view map has no entry for it \u2014
   so gradeGrid(), testBox(), codeLive(), vTestDetail(), answerSheet(),
   markPanel(), vMarkRun() and saveMarks() were all dead, and wResults() was
   still walking [data-open], [data-mark] and [data-q] selectors on every
   Training draw that could never match. codeLive() had also gone stale: it
   still tested for maths sets called "easy" and "hard", which have not existed
   since the sets were split by sub-strand, so seven of the eight would have
   come back disabled had anything ever called it.
   Training already shows every score, every test and everything he keeps
   getting wrong, and the sync panel below is what the grown-ups actually open.
   ========================================================================== */

/* Sync sits at the top: two buttons, and a line saying what happened last.
   Nothing clever, nothing in the background you cannot see. */
function syncPanel(){
  var s='<div class="panel"><h2><span class="em">\u2601\uFE0F</span> Sync';
  if(cloudUser) s+='<span class="side">'+esc(familyName(cloudUser.email))+'</span>';
  s+='</h2>';
  if(cloudUser){
    var p=pending(), er=(typeof syncErr==="function") ? syncErr() : "";
    var down=(typeof pullErr==="function") ? pullErr() : "";
    /* Two very different failures. down = the scores did not come down, which
       is the sync being broken. st = the optional state table could not be
       read, which is a setup gap that leaves the scores working perfectly. */
    var st=(typeof stateErr==="function") ? stateErr() : "";
    var bad = er && er!=="insert-only";
    /* Which family this device is signed in to. Two devices on two different
       names each sync perfectly and never see one another, and the only way to
       spot it is to read the name on both. */
    s+='<p class="whoami">Signed in as <b>'+esc(familyName(cloudUser.email))+
       '</b> \u00b7 '+results().length+' scores here, '+p+' waiting</p>'+
       '<div class="syncrow"><button class="btn go" id="cSync">\u21bb Sync'+
       (p?' \u00b7 '+p+' waiting':'')+'</button>'+
       '<button class="btn soft" id="cOut">Sign out</button></div>'+
       (bad ? '<p class="synced bad">Scores are not going up. The server said: '+
              esc(er)+'</p>' : '')+
       (down ? '<p class="synced bad">Scores are not coming down, so this device may be '+
              'behind the other one. The server said: '+esc(down)+'</p>' : '')+
       (er==="insert-only" ? '<p class="synced warn2">New scores go up fine, but this '+
              'database will not let one already sent be corrected \u2014 so a run re-marked '+
              'here stays as it was on the other device. Fixable: the results table needs '+
              'an update policy as well as an insert one.</p>' : '')+
       (st ? '<p class="synced warn2"><b>Scores sync; the rest does not.</b> Books, '+
              'Upcoming and the tricky-ones bank stay on this device, because the '+
              '<code>state</code> table could not be read. The server said: \u201c'+esc(st)+
              '\u201d \u2014 most likely it has not been created yet. Run '+
              '<code>supabase-state.sql</code> once in the Supabase SQL editor and press '+
              'Sync again. Nothing is lost meanwhile: this device will not send its lists '+
              'up until it has managed to read what is already there.</p>' : '')+
       '<p class="synced">'+(syncNote()
          ? esc(syncNote())
          : (p ? p+(p===1?" score":" scores")+" on this device not sent up yet."
               : "Nothing waiting."))+'</p>'+
       '<div class="key">One press does both ways: it brings down anything from the other '+
       'device and sends up anything from this one. Nothing is ever overwritten, so press it '+
       'as often as you like. A finished test syncs itself.</div>';
  } else {
    s+='<div class="pair"><span class="f1"><div class="lbl">Family name</div>'+
       '<input type="text" id="cEm" autocomplete="username" placeholder="chewtopia"></span>'+
       '<span class="f1"><div class="lbl">Password</div>'+
       '<input type="password" id="cPw" autocomplete="current-password"></span></div>'+
       '<div class="btnrow"><button class="btn go" id="cIn">Sign in</button></div>';
  }
  if(cloudMsg) s+='<p class="empty" style="color:var(--coral);margin-bottom:0">'+esc(cloudMsg)+'</p>';
  if(storeFull) s+='<p class="synced bad">'+esc(storeFull)+
    ' Old answer sheets have been let go to make room; the scores themselves are safe.</p>';
  return s+'</div>';
}

/* Everything the sync panel needs, and nothing else. This used to walk half a
   dozen selectors belonging to the Progress screen on every single Training
   draw, none of which have existed for some time. */
function wResults(){
  wKidBar();
  var i=document.getElementById("cIn");
  if(i){
    var goIn=function(){
      var em=document.getElementById("cEm").value.trim();
      var pw=document.getElementById("cPw").value;
      if(!em || !pw){ cloudMsg="Type the family name and password first."; render(); return; }
      cloudLogin(em, pw);
    };
    i.onclick=goIn;
    ["cEm","cPw"].forEach(function(id){
      var f=document.getElementById(id);
      if(f) f.addEventListener("keydown",function(e){
        if(e.key==="Enter"){ e.preventDefault(); goIn(); } });
    });
  }
  var sy=document.getElementById("cSync");
  if(sy) sy.onclick=function(){ sfxTap(); cloudSync(); };
  /* Signing out was written and then never given a button, so the only way off
     a wrong family account was to clear the site data \u2014 on the one screen whose
     job is to make a wrong account obvious. */
  var so=document.getElementById("cOut");
  if(so) so.onclick=function(){
    if(!confirm("Sign out of this family account on this device?\n\nScores already on this device stay here.")) return;
    sfxTap(); cloudLogout();
  };
}

seedOnce();
dropUnmarked();
cloudInit();
tab = tabFromHash() || tab;
if(!location.hash){ try{ location.replace("#"+SLUGS[tab]); }catch(e){} }
render();

/* back and forward buttons, and links pasted straight into the address bar */
window.addEventListener("hashchange", function(){
  /* Never navigate out of a test in progress. Tapping a score in Progress sets
     the address bar and then starts the test; the hash change lands a moment
     later and used to wipe the quiz that had just opened. */
  if(quiz) return;
  var t=tabFromHash();
  if(t && t!==tab) go(t, true);
});
