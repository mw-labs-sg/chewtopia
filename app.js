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
    if(sn) sn.onclick=function(){ W("snd", snd()?"off":"on"); sfxTap(); render(); };
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
    b.onclick=function(){ sfxSwipe(); go(t[0]); };
    tb.appendChild(b);
  });

  var v=document.getElementById("view");
  if(quiz){ v.innerHTML=quizHTML(); wireQuiz(); return; }
  var V={home:vHome,schedule:vWeek,meals:vMeals,practice:vTests,reading:vRead,results:vResults};
  var Wr={home:wHome,schedule:wWeek,meals:wMeals,practice:wTests,reading:wRead,results:wResults};
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
   UPCOMING — a rolling agenda. Date down the left, then a column per boy, so
   the eye lands on "when" first and "who" second. Empty days are skipped.
   ========================================================================== */
function evCard(e){
  var st=evState(e);
  return '<div class="evc e-'+(e.w||"all")+(st.live?" live":"")+'">'+
    '<span class="evt">'+esc(e.t)+'</span>'+
    '<span class="evw">'+(st.live?(e.d2?"On now":"Today"):evWhen(e))+
      (e.time?' \u00b7 '+e.time:'')+
      (e.d2?' \u00b7 to '+dnum(e.d2)+' '+dmon(e.d2):'')+'</span>'+
    (e.n?'<span class="nt">'+esc(e.n)+'</span>':'')+
    (e.p?'<button class="prac '+whoCls(e.w)+'" data-go="'+esc(e.p)+'" data-who="'+esc(e.w||"")+'">'+
         '\u25b6 '+esc(practiceLabel(e.p))+'</button>':'')+
    (fromSeed(e.id)?'':'<button class="x" data-del="'+e.id+'" title="Remove">&times;</button>')+
    '</div>';
}

function vHome(){
  var f=vwho(), kids=shownKids();
  var evs=SJ("events",[]).filter(function(e){ return !evState(e).gone; })
    .filter(function(e){ return f==="all" || !e.w || e.w===f; })
    .sort(function(a,b){ return evState(a).start-evState(b).start; });

  var s='<div class="panel"><h2><span class="em">📅</span> What is coming</h2>';

  if(evs.length){
    /* one block per date, in order, so nothing empty takes up room */
    var days=[], byDay={};
    evs.forEach(function(e){
      if(!byDay[e.d]){ byDay[e.d]=[]; days.push(e.d); }
      byDay[e.d].push(e);
    });

    s+='<div class="agenda'+(kids.length===1?" solo":"")+'">'+
       '<span class="agh"></span>'+
       kids.map(function(k){ return '<span class="agh '+whoCls(k.id)+'">'+esc(pname(k.id))+'</span>'; }).join("");

    var lastMonth="";
    days.forEach(function(d){
      var mon=dmon(d);
      if(mon!==lastMonth){
        lastMonth=mon;
        s+='<span class="agmon">'+mon+'</span>';
      }
      var list=byDay[d], st=evState(list[0]);
      s+='<span class="agd'+(st.live?" now":"")+'"><b>'+dnum(d)+'</b><i>'+
         dday(d).slice(0,3)+'</i></span>';
      kids.forEach(function(k){
        var mine=list.filter(function(e){ return e.w===k.id; });
        s+='<span class="agc">'+(mine.length?mine.map(evCard).join(""):'')+'</span>';
      });
      var all=list.filter(function(e){ return !e.w; });
      if(all.length){
        s+='<span class="agd sp"></span><span class="agc both">'+
           all.map(evCard).join("")+'</span>';
      }
    });
    s+='</div>';
  } else s+='<p class="empty">Nothing coming up'+(f==="all"?"":" for "+esc(pname(f)))+'.</p>';

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
    '<div class="saved" id="mS"></div></div>'+
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
var SUBJ_COLS=[["en","English"],["zh","\u534e\u6587"],["ma","Maths"]];
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
function gradeGrid(){
  var g={};
  KIDS.forEach(function(k){
    runsFor(k.id).forEach(function(r){
      if(isFixing(r)) return;
      if(runSubject(r)==="rv") return;   /* mixed-subject review goes */
      var sj=runSubject(r), t=String(r.test||"?");
      var row=(g[sj]=g[sj]||{});
      var cell=(row[t]=row[t]||{});
      var c=cell[k.id];
      if(!c) c=cell[k.id]={best:r.score,total:r.total,tries:0,last:r.ts,code:r.code||""};
      if(r.code) c.code=r.code;
      c.tries++;
      if(r.score>c.best){ c.best=r.score; c.total=r.total; }
      if(r.ts>c.last) c.last=r.ts;
    });
  });
  return g;
}

function kidHead(k){
  var runs=runsFor(k.id).filter(function(r){ return !isFixing(r); });
  var full=runs.filter(function(r){ return r.score>=r.total; }).length;
  return '<div class="mxh '+whoCls(k.id)+'">'+esc(pname(k.id))+
    '<small>'+(streak(k.id).n?streak(k.id).n+"\uD83D\uDD25 \u00b7 ":"")+
    runs.length+' tests \u00b7 '+full+' full</small></div>';
}

/* Is this test still in the books? Old scores can name a list that has since
   been replaced, and tapping one of those should not open an empty quiz. */
function codeLive(code, kid){
  var p=String(code||"").split("|"), k=p[1];
  if(p[0]==="en") return !!(typeof TC_SPELL!=="undefined" && TC_SPELL[k]);
  if(p[0]==="es") return !!(typeof SC_SPELL!=="undefined" && SC_SPELL[k]);
  if(p[0]==="hz"||p[0]==="rn") return !!(typeof HANZI!=="undefined" && HANZI[k]);
  if(p[0]==="zh"){
    var bank = kid==="tc" ? TC_PINYIN : SC_TINGXIE;
    return !!(bank && bank[k]);
  }
  if(p[0]==="ma") return k==="easy"||k==="times"||k==="hard";
  return false;
}

/* One box per test: what it was, the best score, when. Tap to sit it again. */
function testBox(kid, test, c){
  var cls=scoreCls(c.best,c.total), live=codeLive(c.code, kid);
  return '<button class="tbox '+cls+'"'+
    (live ? ' data-open="'+esc(c.code)+'" data-kid="'+kid+'"' : ' disabled')+'>'+
    '<span class="tn">'+esc(test)+'</span>'+
    '<span class="tv">'+c.best+'/'+c.total+'</span>'+
    '<span class="td">'+dshort(c.last)+(c.tries>1?" \u00b7 "+c.tries+" goes":"")+'</span>'+
    '</button>';
}

/* ==========================================================================
   ONE TEST, IN FULL — every word in the list, how it went, and every attempt.
   Training is where a test is started; this is where it is looked at.
   ========================================================================== */

function itemLabel(it){
  if(it.k==="hz"||it.k==="rn"||it.k==="py"||it.k==="tx") return it.h;
  if(it.k==="math") return it.q;
  if(it.k==="dict"){                       /* a whole sentence needs shortening */
    var w=String(it.a||it.s||"").split(/\s+/);
    return w.slice(0,4).join(" ")+(w.length>4?" \u2026":"");
  }
  return it.a || it.s || "";
}
/* Green means he has it. Amber means he slipped once. Red means it keeps
   going wrong. Grey means he has not met it yet. */
function itemState(it, kid, attempted){
  var k=weakKey(it), hit=null;
  weakAll(kid).forEach(function(x){ if(x.k===k) hit=x; });
  if(hit) return hit.n>=2 ? "low" : "mid";
  return attempted ? "good" : "none";
}

/* What he actually put down, question by question. */
function answerSheet(r){
  var s='<div class="sheet">';
  (r.ans||[]).forEach(function(x){
    s+='<div class="shrow '+(x.right?"ok":"no")+'">'+
       '<span class="shask">'+esc(x.ask||"")+'</span>';
    if(x.img && x.img.length){
      s+='<span class="shimgs">'+x.img.map(function(src,i){
           var bad = x.marks && x.marks[i]===false;
           return '<img class="'+(bad?"no":"ok")+'" src="'+src+'" alt="">';
         }).join("")+'</span>';
    } else if(x.marks){
      /* handwriting from an older run whose pictures have been let go */
      s+='<span class="shgot">'+x.marks.map(function(ok){
           return '<b class="'+(ok===false?"no":"ok")+'">'+(ok===false?"\u2715":"\u2713")+'</b>';
         }).join(" ")+'</span>';
    } else {
      s+='<span class="shgot">'+(x.got ? esc(x.got) : '<i>nothing</i>')+'</span>';
    }
    s+='<span class="shwant">'+esc(x.want||"")+'</span>'+
       '<span class="shflag">'+(x.right?"\u2713":"\u2715")+'</span></div>';
  });
  return s+'</div>';
}

function vTestDetail(){
  var kid=openTest.kid, code=openTest.code;
  var q=itemsFor(code, kid);
  if(!q) return '<div class="panel"><p class="empty">That list is not in the app any more.</p>'+
                '<div class="btnrow"><button class="btn go" id="dtBack">Back</button></div></div>';

  var runs=runsFor(kid).filter(function(r){ return r.test===q.test && !isFixing(r); });
  var attempted=runs.length>0;
  var best=runs.reduce(function(x,y){ return (!x||y.score/y.total>x.score/x.total)?y:x; }, null);

  /* the words themselves, one chip each */
  var chips=q.items.map(function(it){
    var st=itemState(it, kid, attempted);
    return '<span class="wchip '+st+'">'+esc(itemLabel(it))+'</span>';
  }).join("");

  var s='<div class="panel"><h2><span class="em">\uD83D\uDD0E</span> '+esc(q.test)+
        '<span class="side '+whoCls(kid)+'">'+esc(pname(kid))+'</span></h2>'+
        '<div class="mxkey"><span><span class="dot" style="background:#4FB86B"></span> <b>knows it</b></span>'+
          '<span><span class="dot" style="background:#FFB627"></span> <b>slipped once</b></span>'+
          '<span><span class="dot" style="background:#FF6F52"></span> <b>keeps missing</b></span>'+
          '<span><span class="dot" style="background:#C3D2DF"></span> <b>not met yet</b></span></div>'+
        '<div class="wchips">'+chips+'</div>';

  if(runs.length){
    s+='<div class="mxg">Every go</div><div class="runlist">'+
       runs.slice().reverse().map(function(r){
         var cls=scoreCls(r.score,r.total), open=(openRun===r.id);
         var row='<div class="runrow'+(r.ans?" can":"")+'"'+(r.ans?' data-run="'+esc(r.id)+'"':'')+'>'+
           '<span class="rundate">'+dshort(r.ts)+'</span>'+
           '<span class="runbar"><i class="'+cls+'" style="width:'+
             Math.round(r.score/r.total*100)+'%"></i></span>'+
           '<span class="runsc '+cls+'">'+r.score+'/'+r.total+'</span>'+
           (r.ans?'<span class="runarw">'+(open?"\u2303":"\u2304")+'</span>':'')+'</div>';
         return row + (open ? answerSheet(r) : "");
       }).join("")+'</div>'+
       (best?'<p class="empty">Best so far '+best.score+'/'+best.total+
         ' \u00b7 '+runs.length+(runs.length===1?' go':' goes')+'</p>':'');
  } else s+='<p class="empty">Not tried yet.</p>';

  return s+'<div class="btnrow">'+
    '<button class="btn go" id="dtGo">\u25b6 Practise this now</button>'+
    '<button class="btn soft" id="dtBack">Back</button></div></div>';
}

function vResults(){
  if(openTest) return vTestDetail();
  var s=syncPanel();
  var g=gradeGrid(), any=false;

  var m='<div class="mx6">';
  shownKids().forEach(function(k){
    var runs=runsFor(k.id).filter(function(r){
      return !isFixing(r) && runSubject(r)!=="rv"; });
    var full=runs.filter(function(r){ return r.score>=r.total; }).length;
    m+='<div class="kidbox"><div class="kidname '+whoCls(k.id)+'">'+esc(pname(k.id))+
       '<small>'+(streak(k.id).n?streak(k.id).n+"\uD83D\uDD25 \u00b7 ":"")+
       runs.length+' tests \u00b7 '+full+' full</small></div>'+
       '<div class="mxcols'+(kidSubj(k.id).length===2?" two":"")+'">';
    /* three headers first, then the three columns under them */
    var mine=SUBJ_COLS.filter(function(sub){ return hasSubj(k.id, sub[0]); });
    mine.forEach(function(sub){ m+='<div class="mxsub">'+sub[1]+'</div>'; });
    mine.forEach(function(sub){
      var row=g[sub[0]]||{}, out="";
      Object.keys(row).filter(function(t){ return row[t][k.id]; })
        .sort(function(a,b){ return row[b][k.id].last - row[a][k.id].last; })
        .forEach(function(t){ any=true; out+=testBox(k.id, t, row[t][k.id]); });
      m+='<div class="mxcol">'+(out||'<div class="mxnone">\u2014</div>')+'</div>';
    });
    m+='</div></div>';
  });
  m+='</div>';

  s+='<div class="panel"><h2><span class="em">\uD83D\uDCCA</span> How they are doing</h2>'+
     '<div class="mxkey"><span><span class="dot" style="background:#4FB86B"></span> '+
       '<b>full marks</b></span>'+
       '<span><span class="dot" style="background:#FFB627"></span> <b>70% or better</b></span>'+
       '<span><span class="dot" style="background:#FF6F52"></span> <b>below 70%</b></span>'+
       '<span>best score \u00b7 tap to sit it again</span></div>'+
     (any ? m : '<p class="empty">No tests yet. Anything done in Training turns up here.</p>')+
     '</div>';

  /* what each of them keeps missing, side by side */
  var wk=shownKids().map(function(k){ return {k:k, w:weakTop(k.id, 6)}; });
  if(wk.some(function(x){ return x.w.length; })){
    s+='<div class="panel"><h2><span class="em">\uD83C\uDFAF</span> Keeps getting these wrong</h2>'+
       '<div class="mxwk">'+wk.map(function(x){
         return '<div class="weak"><div class="wt">'+esc(pname(x.k.id))+'</div>'+
           (x.w.length ? x.w.map(function(y){
             return '<span class="wi">'+esc(weakLabel(y))+'<i>'+y.n+'\u00d7</i></span>'; }).join("")
            : '<span class="wi">Nothing stuck</span>')+'</div>';
       }).join("")+'</div></div>';
  }

  return s;
}

/* Sync sits at the top: two buttons, and a line saying what happened last.
   Nothing clever, nothing in the background you cannot see. */
function syncPanel(){
  var s='<div class="panel"><h2><span class="em">\u2601\uFE0F</span> Sync';
  if(cloudUser) s+='<span class="side">'+esc(familyName(cloudUser.email))+'</span>';
  s+='</h2>';
  if(cloudUser){
    var p=pending();
    s+='<div class="syncrow"><button class="btn go" id="cSync">\u21bb Sync'+
       (p?' \u00b7 '+p+' waiting':'')+'</button></div>'+
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
  return s+'</div>';
}

function wResults(){
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
  document.querySelectorAll("[data-open]").forEach(function(b){
    b.onclick=function(){
      openTest={kid:b.dataset.kid, code:b.dataset.open}; openRun=null;
      sfxTap(); render(); scrollTo(0,0);
    };
  });
  document.querySelectorAll(".runrow[data-run]").forEach(function(row){
    row.onclick=function(){
      openRun = (openRun===row.dataset.run) ? null : row.dataset.run;
      sfxTap(); render();
    };
  });
  var dtb=document.getElementById("dtBack");
  if(dtb) dtb.onclick=function(){ openTest=null; render(); scrollTo(0,0); };
  var dtg=document.getElementById("dtGo");
  if(dtg) dtg.onclick=function(){
    var o=openTest; openTest=null;
    W("who", o.kid); tab="practice"; start(o.code);
  };
}

seedOnce();
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
