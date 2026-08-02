/* ==========================================================================
   CHEWTOPIA — APP. Draws the tab bar, routes to each screen, and holds the
   three small ones: Upcoming, Meals and Progress. Loads last.
   ========================================================================== */

function render(){
  document.getElementById("mark").innerHTML =
    "CHEWTOPIA".split("").map(function(c){return "<span>"+c+"</span>";}).join("");

  var tb=document.getElementById("tabs"); tb.innerHTML="";
  TABS.forEach(function(t){
    /* family screens on the left, the two child screens on the right */
    if(t[0]==="practice"){
      var d=document.createElement("span"); d.className="tabdiv"; tb.appendChild(d);
    }
    var b=document.createElement("button");
    b.className="tab"+(t[0]===tab?" on":"");
    b.textContent=t[1];
    b.onclick=function(){ go(t[0]); };
    tb.appendChild(b);
  });

  var v=document.getElementById("view");
  if(quiz){ v.innerHTML=quizHTML(); wireQuiz(); return; }
  var V={home:vHome,schedule:vWeek,meals:vMeals,practice:vTests,reading:vRead,results:vResults};
  var Wr={home:wHome,schedule:wWeek,meals:wMeals,practice:wTests,reading:wRead,results:wResults};
  v.innerHTML=V[tab](); Wr[tab]();
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

function vHome(){
  var f=evFilter();
  var evs=SJ("events",[]).filter(function(e){ return !evState(e).gone; })
    .filter(function(e){ return f==="all" || !e.w || e.w===f; })
    .sort(function(a,b){ return evState(a).start-evState(b).start; });
  var s='<div class="panel"><h2><span class="em">📅</span> Upcoming</h2>'+evFilterBar();
  if(evs.length){
    evs.forEach(function(e){
      var st=evState(e);
      s+='<div class="ev'+((st.live||st.start<=2)?" soon":"")+'">'+
        '<span class="cd '+whoCls(e.w)+'"><b>'+dnum(e.d)+(e.d2?"–"+dnum(e.d2):"")+'</b>'+
        '<i>'+dmon(e.d)+'</i></span>'+
        '<span class="tx"><span class="tag '+whoCls(e.w)+'">'+
          (e.w?esc(pname(e.w)):"All")+'</span>'+
          '<span class="wh">'+(st.live?(e.d2?"On now":"Today"):
            dday(e.d)+(e.d2?"–"+dday(e.d2):""))+'</span> '+esc(e.t)+
          (st.live&&!e.time?'':'<small>'+(st.live?'':evWhen(e))+
            (e.time?(st.live?'':' · ')+e.time:'')+'</small>')+
          (e.n?'<span class="nt">'+esc(e.n)+'</span>':'')+
          (e.p?'<button class="prac '+whoCls(e.w)+'" data-go="'+esc(e.p)+'" data-who="'+esc(e.w||"")+'">'+
               'Practise '+esc(practiceLabel(e.p))+' \u2192</button>':'')+'</span>'+
        (fromSeed(e.id)?'':'<button class="x" data-del="'+e.id+'" title="Remove">&times;</button>')+
        '</div>';
    });
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
  wireFilter("evFil", function(v){ W("evfilter", v); });
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
  var s="";
  KIDS.forEach(function(k){
    var all=books(k.id), m=booksSince(k.id,30);
    var en=all.filter(function(b){return b.l==="en";}).length, cn=all.length-en;
    s+='<div class="panel"><h2>'+esc(pname(k.id))+
       '<span class="side">'+all.length+(all.length===1?" book":" books")+'</span></h2>'+
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
var SUBJ_ROWS=[["en","English"],["zh","\u534e\u6587"],["ma","Maths"],["rv","Review"]];
function runSubject(r){
  var c=String(r.code||"").split("|")[0];
  if(c==="en"||c==="es") return "en";
  if(c==="zh"||c==="hz"||c==="rn") return "zh";
  if(c==="ma") return "ma";
  if(c==="weak"||c==="review") return "rv";
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
      var sj=runSubject(r), t=String(r.test||"?");
      var row=(g[sj]=g[sj]||{});
      var cell=(row[t]=row[t]||{});
      var c=cell[k.id];
      if(!c) c=cell[k.id]={best:r.score,total:r.total,tries:0,last:r.ts};
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

function vResults(){
  var s=syncPanel();

  var g=gradeGrid(), any=false;
  var m='<div class="mx"><div class="mxh corner"></div>'+
        KIDS.map(kidHead).join("");

  SUBJ_ROWS.forEach(function(sub){
    var row=g[sub[0]]; if(!row) return;
    var tests=Object.keys(row).sort(function(a,b){
      var la=Math.max.apply(null,KIDS.map(function(k){ return (row[a][k.id]||{last:0}).last; }));
      var lb=Math.max.apply(null,KIDS.map(function(k){ return (row[b][k.id]||{last:0}).last; }));
      return lb-la;
    });
    if(!tests.length) return;
    any=true;
    m+='<div class="mxg">'+sub[1]+'</div>';
    tests.forEach(function(t){
      m+='<div class="mxn">'+esc(t)+'</div>';
      KIDS.forEach(function(k){
        var c=row[t][k.id];
        m+='<div class="mxc">'+(c
          ? '<span class="mxs '+scoreCls(c.best,c.total)+'">'+c.best+'/'+c.total+
            '<i>'+(c.tries>1?c.tries+" goes \u00b7 ":"")+dshort(c.last)+'</i></span>'
          : '<span class="mxs none">\u2014</span>')+'</div>';
      });
    });
  });
  m+='</div>';

  s+='<div class="panel"><h2><span class="em">\uD83D\uDCCA</span> How they are doing</h2>'+
     (any ? m+'<div class="key"><span class="dot" style="background:#4FB86B"></span> full marks &nbsp;'+
       '<span class="dot" style="background:#FFB627"></span> 70% or better &nbsp;'+
       '<span class="dot" style="background:#FF6F52"></span> below 70%<br>'+
       'Each box is the best score so far, with how many goes it took.</div>'
      : '<p class="empty">No tests yet. Anything done in Training turns up here.</p>')+
     '</div>';

  /* what each of them keeps missing, side by side */
  var wk=KIDS.map(function(k){ return {k:k, w:weakTop(k.id, 6)}; });
  if(wk.some(function(x){ return x.w.length; })){
    s+='<div class="panel"><h2><span class="em">\uD83C\uDFAF</span> Keeps getting these wrong</h2>'+
       '<div class="mxwk">'+wk.map(function(x){
         return '<div class="weak"><div class="wt">'+esc(pname(x.k.id))+'</div>'+
           (x.w.length ? x.w.map(function(y){
             return '<span class="wi">'+esc(weakLabel(y))+'<i>'+y.n+'\u00d7</i></span>'; }).join("")
            : '<span class="wi">Nothing stuck</span>')+'</div>';
       }).join("")+'</div></div>';
  }

  return s+'<div class="panel"><h2>Housekeeping</h2>'+
    '<div class="btnrow"><button class="btn soft" id="wipe">Clear all scores</button>'+
    (cloudUser?'<button class="btn soft" id="cOut">Sign out</button>':'')+
    '</div></div>';
}

/* Sync sits at the top. One family name and password, nothing else to do. */
function syncPanel(){
  var s='<div class="panel"><h2><span class="em">\u2601\uFE0F</span> Sync';
  if(cloudUser) s+='<span class="side">'+esc(familyName(cloudUser.email))+'</span>';
  s+='</h2>';
  if(cloudUser){
    var p=pending();
    s+='<div class="btnrow"><button class="btn go" id="cSync">'+
       (p? 'Sync now \u00b7 '+p+' waiting' : 'Sync now')+'</button></div>';
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
  var o=document.getElementById("cOut");
  if(o) o.onclick=function(){ if(confirm("Sign out of the family account?")) cloudLogout(); };
  var sy=document.getElementById("cSync"); if(sy) sy.onclick=cloudSync;
  document.getElementById("wipe").onclick=function(){
    if(confirm("Delete every saved score on this device?")){ WJ("results",[]); render(); } };
}

seedOnce();
cloudInit();
tab = tabFromHash() || tab;
if(!location.hash){ try{ location.replace("#"+SLUGS[tab]); }catch(e){} }
render();

/* back and forward buttons, and links pasted straight into the address bar */
window.addEventListener("hashchange", function(){
  var t=tabFromHash();
  if(t && t!==tab) go(t, true);
});
