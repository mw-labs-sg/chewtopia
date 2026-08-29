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
  if(paper){ v.innerHTML=paperHTML(); wirePaper(); return; }
  var V={home:vHome,schedule:vWeek,meals:vMeals,grow:vGrow,forums:vForums,
         practice:vTests,reading:vRead,links:vLinks};
  var Wr={home:wHome,schedule:wWeek,meals:wMeals,grow:wGrow,forums:wForums,
          practice:wTests,reading:wRead,links:wLinks};
  /* the child switch belongs inside the first panel, under its heading */
  var html=V[tab]();
  if(tab==="home"||tab==="schedule"||tab==="grow")
    html=html.replace("</h2>", "</h2>"+whoBar());
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
/* Which entries are a test he actually sits. A day in Upcoming can be a trip,
   a form to fill, a holiday or a spelling test, and only the last sort needs
   revising for \u2014 so it gets an outline and the rest do not.
   e.test set in data.js wins; otherwise it is read off the title, which also
   catches a "Spelling test" typed straight into the app. Deliberately narrow:
   "Maths \u2014 Fractions" is revision homework and carries a practice button, so
   having one is not the signal. */
function isTest(e){
  if(e.test!==undefined) return !!e.test;
  return /\btests?\b|\bspelling\b|\u542c\u5199|\u9ed8\u5199|\u8003\u8bd5/i.test(String(e.t||""));
}
function evCard(e){
  var st=evState(e);
  return '<div class="evc e-'+(e.w||"all")+(st.live?" live":"")+(e.hol?" hol":"")+
    (isTest(e)&&!e.hol?" tst":"")+'">'+
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
  return s+vCCA();
}

/* Both boys are boys, so the girls-only CCAs are shown but greyed: knowing
   Chinese Dance exists and is not open to them is worth more than a list that
   quietly leaves things out. Nothing here is tappable - it is a reference
   column, not a chooser, and the school runs the actual sign-up. */
function vCCA(){
  var g = (typeof NYPS_CCA!=="undefined" ? NYPS_CCA : []);
  if(!g.length) return "";
  var n=0; g.forEach(function(x){ n+=x.cca.length; });
  var s='<div class="panel"><h2><span class="em">\uD83C\uDFC5</span> CCAs at Nanyang'+
        '<span class="side">'+n+' to pick from</span></h2><div class="ccas">';
  g.forEach(function(x){
    s+='<div class="ccag"><h3><span class="em">'+x.em+'</span>'+esc(x.h)+'</h3>';
    x.cca.forEach(function(c){
      var shut = c.g==="g";   /* girls only - neither of ours can join */
      s+='<span class="cca'+(shut?" shut":"")+'">'+
         '<b>'+esc(c.t)+(c.g?'<i>'+(c.g==="b"?"boys":"girls")+'</i>':'')+'</b>'+
         '<u>'+
           '<em class="bub dsa" title="Counts as: '+esc(c.dsa||"")+'">DSA</em>'+
           (c.inri ? '<em class="bub in">in RI</em>'
                   : '<em class="bub off">not in RI</em>')+
           (c.ridsa ? '<em class="bub yes">RI DSA</em>'
                    : c.via ? '<em class="bub yes via">RI DSA <s>via '+esc(c.via)+'</s></em>'
                            : '<em class="bub off">no RI DSA</em>')+
         '</u></span>';
    });
    s+='</div>';
  });
  s+='</div>';
  /* The tags were read as "join this one, get in through it" the first time
     this panel was shown. They do not say that, so the panel now says what
     they do say, in words, right underneath them. */
  var cn = (typeof CCA_NOTES!=="undefined" ? CCA_NOTES : []);
  if(cn.length){
    s+='<div class="pnotes">';
    cn.forEach(function(n){
      s+='<div class="pn"><b>'+esc(n[0])+'</b><span>'+esc(n[1])+'</span></div>';
    });
    s+='</div>';
  }
  s+='<div class="key">Names and who each takes are from MOE\u2019s school listing '+
     '\u2014 it does not say which levels they start at or when they meet. The '+
     'grey line under each CCA is the DSA-Sec talent category it counts in, '+
     'then whether Raffles runs an area of that name. RI publishes its list '+
     'only while the exercise is open, so it is from the last one it ran and '+
     'RI reviews it every year.</div></div>';
  return s+vPSLE()+vJargon()+vSchools()+vTodo();
}

/* Neither boy is anywhere near sitting it - TC is P2 - but the CCA choice, the
   高级华文 he is already doing and every streaming conversation all point at
   this, and it is easier to read once here than to half-remember it off a
   parents' group. Reference only: nothing on this panel is tappable. */
function vPSLE(){
  var al = (typeof PSLE_AL!=="undefined" ? PSLE_AL : []);
  var pg = (typeof PSLE_PG!=="undefined" ? PSLE_PG : []);
  var nt = (typeof PSLE_NOTES!=="undefined" ? PSLE_NOTES : []);
  if(!al.length) return "";
  var s='<div class="panel"><h2><span class="em">\uD83D\uDCCF</span> How the PSLE is scored'+
        '<span class="side">TC 2030 \u00b7 SC 2032</span></h2>';

  s+='<div class="pgrid">';
  s+='<div class="pblk"><h3>Each subject, out of 8</h3><div class="ptab">';
  al.forEach(function(a){
    s+='<span class="pk">'+esc(a.al)+'</span><span class="pv">'+esc(a.m)+'</span>';
  });
  s+='</div><p class="pnote">MOE calls these reference ranges: the AL is set '+
     'against the cohort, so the marks are a guide and not a promise.</p></div>';

  s+='<div class="pblk"><h3>The four added up, 4 to 32</h3><div class="ptab">';
  pg.forEach(function(g){
    s+='<span class="pk num">'+esc(g.s)+'</span><span class="pv"><b>'+esc(g.g)+'</b>'+
       (g.n?'<i>'+esc(g.n)+'</i>':'')+'</span>';
  });
  s+='</div><p class="pnote">Lower is better. The posting group sets which '+
     'level the subjects start at in secondary one, not which school.</p></div>';
  s+='</div>';

  /* "4 to 6" is meaningless until it has been added up once in front of you,
     which is exactly how it was misread the first time this panel went up. */
  var mk = (typeof PSLE_MAKE!=="undefined" ? PSLE_MAKE : []);
  if(mk.length){
    s+='<div class="pblk" style="margin-top:12px"><h3>Where a total comes from</h3>'+
       '<p class="pnote" style="margin:0 0 9px">Four subjects, one AL each, '+
       'added. That is the whole calculation \u2014 it is not a percentage and '+
       'not a mark out of anything.</p><div class="mktab">';
    mk.forEach(function(m){
      s+='<span class="mkn">'+esc(m.n)+'</span>'+
         '<span class="mks">'+esc(m.sum)+'</span>'+
         '<span class="mkw">'+esc(m.w)+'</span>';
    });
    s+='</div><p class="pnote">So a school that took <b>4 to 6</b> took '+
       'children who were at AL 1 in every subject, or one band down in two of '+
       'them. A school that took <b>4(D) to 8(M)</b> took up to four ones and '+
       'four twos, and wanted a Higher Chinese grade with it.</p></div>';
  }

  s+='<div class="pnotes">';
  nt.forEach(function(n){
    s+='<div class="pn"><b>'+esc(n[0])+'</b><span>'+esc(n[1])+'</span></div>';
  });
  s+='</div>';

  s+='<div class="key">All of it is MOE\u2019s, off the PSLE scoring and '+
     'secondary-one posting pages. Rules change \u2014 check them again nearer '+
     'the time rather than trusting this screen.</div></div>';
  return s;
}

/* ==========================================================================
   GROWTH - weight and height, typed in whenever they get weighed, and drawn.

   Two numbers a week is not enough data for anything clever, and cleverness is
   not the point: the point is watching the line go up over a year. So the
   chart is plain SVG built as a string like every other view here - no library,
   nothing to fetch, and it redraws inside render() with everything else.

   Deliberately NOT here: any judgement about whether a number is a good one.
   That needs the growth reference charts, which we do not have off any sheet,
   and an invented band under a child's weight is worse than no band at all.
   BMI is shown because it is arithmetic, not an opinion.
   ========================================================================== */
function growKey(who){ return "grow:"+who; }
function growList(who){
  return SJ(growKey(who),[]).slice().sort(function(a,b){
    return a.d < b.d ? -1 : a.d > b.d ? 1 : 0; });
}
function growDays(iso){ return Math.round(new Date(iso+"T00:00:00")/86400000); }
function isoFromDays(n){
  var d=new Date(n*86400000);
  return d.getUTCFullYear()+"-"+String(d.getUTCMonth()+1).padStart(2,"0")+
         "-"+String(d.getUTCDate()).padStart(2,"0");
}
function kidCol(id){ return id==="tc" ? "var(--blue)" : "var(--tang)"; }

/* One chart, one measurement, every shown child drawn on it. Returns "" when
   there is nothing to draw, so the caller can say so in words instead. */
function growChart(kids, field, unit){
  var W=320, H=140, L=36, R=8, T=10, B=20;
  var series=[], loX=null, hiX=null, loY=null, hiY=null;
  kids.forEach(function(k){
    var pts=[];
    growList(k.id).forEach(function(r){
      var v=parseFloat(r[field]); if(isNaN(v)) return;
      var x=growDays(r.d);
      pts.push({x:x, y:v});
      if(loX===null||x<loX) loX=x;
      if(hiX===null||x>hiX) hiX=x;
      if(loY===null||v<loY) loY=v;
      if(hiY===null||v>hiY) hiY=v;
    });
    if(pts.length) series.push({id:k.id, pts:pts});
  });
  if(!series.length) return "";

  /* A single reading, or several all on one day, would give a box with no
     width or no height and every point would land on top of the others. */
  if(hiX===loX){ loX-=7; hiX+=7; }
  var pad=(hiY-loY)*0.15 || Math.max(hiY*0.05, 1);
  var y0=loY-pad, y1=hiY+pad;

  function px(x){ return L + (x-loX)/(hiX-loX)*(W-L-R); }
  function py(v){ return T + (1-(v-y0)/(y1-y0))*(H-T-B); }

  var g='<svg class="gch" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none" '+
        'role="img" aria-label="'+esc(unit)+' over time">';
  /* three gridlines with the value beside them, so the shape has a scale */
  for(var i=0;i<3;i++){
    var v=y0+(y1-y0)*i/2, yy=py(v);
    g+='<line class="ggl" x1="'+L+'" y1="'+yy.toFixed(1)+'" x2="'+(W-R)+
       '" y2="'+yy.toFixed(1)+'"/>'+
       '<text class="gyl" x="'+(L-6)+'" y="'+(yy+3).toFixed(1)+'">'+v.toFixed(1)+'</text>';
  }
  g+='<text class="gxl" x="'+L+'" y="'+(H-5)+'">'+esc(dfull(isoFromDays(loX)))+'</text>'+
     '<text class="gxl end" x="'+(W-R)+'" y="'+(H-5)+'">'+esc(dfull(isoFromDays(hiX)))+'</text>';

  series.forEach(function(se){
    var d=se.pts.map(function(p){
      return px(p.x).toFixed(1)+","+py(p.y).toFixed(1); }).join(" ");
    if(se.pts.length>1)
      g+='<polyline class="gln" points="'+d+'" style="stroke:'+kidCol(se.id)+'"/>';
    se.pts.forEach(function(p){
      g+='<circle class="gdot" cx="'+px(p.x).toFixed(1)+'" cy="'+py(p.y).toFixed(1)+
         '" r="3" style="fill:'+kidCol(se.id)+'"/>';
    });
  });
  return g+'</svg>';
}

function vGrow(){
  var kids=shownKids().filter(function(k){ return vwho()==="all" || k.id===vwho(); });
  var s='<div class="panel"><h2><span class="em">\uD83D\uDCC8</span> Growth'+
        '<span class="side">weight and height</span></h2>';

  /* the newest reading for each child, and what moved since the one before */
  s+='<div class="glat">';
  kids.forEach(function(k){
    var l=growList(k.id), last=l[l.length-1], prev=l[l.length-2];
    s+='<div class="gcard '+whoCls(k.id)+'"><span class="gwho">'+esc(pname(k.id))+'</span>';
    if(!last){ s+='<span class="gnone">Nothing weighed yet</span></div>'; return; }
    s+='<span class="gnow">'+
       (last.w!==""&&last.w!=null ? '<b>'+(+last.w).toFixed(1)+'<i>kg</i></b>' : '')+
       (last.h!==""&&last.h!=null ? '<b>'+(+last.h).toFixed(1)+'<i>cm</i></b>' : '')+
       '</span>';
    var bits=[];
    if(prev){
      ["w","h"].forEach(function(f){
        var a=parseFloat(prev[f]), b=parseFloat(last[f]);
        if(isNaN(a)||isNaN(b)) return;
        var dd=b-a;
        bits.push((dd>=0?"+":"\u2212")+Math.abs(dd).toFixed(1)+(f==="w"?"kg":"cm"));
      });
    }
    var bmi = (last.w && last.h) ? (+last.w)/Math.pow((+last.h)/100,2) : null;
    s+='<span class="gsub">'+esc(dfull(last.d))+
       (bits.length?' \u00b7 '+esc(bits.join(", "))+' since last time':'')+
       (bmi?' \u00b7 BMI '+bmi.toFixed(1):'')+'</span></div>';
  });
  s+='</div>';

  var wc=growChart(kids,"w","kilograms"), hc=growChart(kids,"h","centimetres");
  if(wc||hc){
    s+='<div class="gcharts">';
    if(wc) s+='<div class="gwrap"><h3>Weight <em>kg</em></h3>'+wc+'</div>';
    if(hc) s+='<div class="gwrap"><h3>Height <em>cm</em></h3>'+hc+'</div>';
    s+='</div>';
    if(kids.length>1)
      s+='<div class="gkey">'+kids.map(function(k){
           return '<span class="gk"><i style="background:'+kidCol(k.id)+'"></i>'+
                  esc(pname(k.id))+'</span>'; }).join("")+'</div>';
  } else {
    s+='<p class="empty">Nothing plotted yet. Put the first weigh-in in below '+
       'and the line starts from there.</p>';
  }

  /* The form. Weight or height on its own is fine - a morning where only one
     of them happens still counts, and a missing number just skips that chart. */
  var pick = vwho()==="all" ? who() : vwho();
  var opts=KIDS.map(function(k){
    return '<option value="'+k.id+'"'+(k.id===pick?" selected":"")+'>'+
           esc(pname(k.id))+'</option>'; }).join("");
  s+='<div class="lbl">Add a weigh-in</div>'+
     '<div class="growrow">'+
       '<select id="gW">'+opts+'</select>'+
       '<input type="date" id="gD" value="'+esc(isoOf(new Date()))+'">'+
       '<input type="number" id="gKg" step="0.1" min="0" max="200" placeholder="kg" inputmode="decimal">'+
       '<input type="number" id="gCm" step="0.1" min="0" max="250" placeholder="cm" inputmode="decimal">'+
       '<button class="btn go" id="gAdd">Add</button>'+
     '</div><div class="hint" id="gMsg"></div>';
  s+='</div>';

  /* every reading, newest first, one panel per child */
  kids.forEach(function(k){
    var l=growList(k.id).slice().reverse();
    if(!l.length) return;
    s+='<div class="panel"><h2><span class="em">\uD83D\uDCCB</span> '+esc(pname(k.id))+
       '<span class="side">'+l.length+(l.length===1?" reading":" readings")+'</span></h2>'+
       '<div class="grows">';
    l.forEach(function(r){
      s+='<div class="growr"><span class="grd">'+esc(dfull(r.d))+'</span>'+
         '<span class="grv">'+(r.w!==""&&r.w!=null ? (+r.w).toFixed(1)+' kg' : '\u2014')+'</span>'+
         '<span class="grv">'+(r.h!==""&&r.h!=null ? (+r.h).toFixed(1)+' cm' : '\u2014')+'</span>'+
         '<button class="x" data-gdel="'+esc(r.id)+'" data-gwho="'+esc(k.id)+'" '+
         'aria-label="Delete this reading">\u00d7</button></div>';
    });
    s+='</div></div>';
  });
  return s;
}

function wGrow(){
  var b=document.getElementById("gAdd");
  if(b) b.onclick=function(){
    var w=document.getElementById("gW").value,
        d=document.getElementById("gD").value,
        kg=document.getElementById("gKg").value.trim(),
        cm=document.getElementById("gCm").value.trim(),
        m=document.getElementById("gMsg");
    /* Say what is wrong. Doing nothing silently just looks broken. */
    if(!d){ m.textContent="Pick the date it was taken."; return; }
    if(!kg && !cm){ m.textContent="Put in a weight, a height, or both."; return; }
    var a=SJ(growKey(w),[]), hit=null;
    /* One reading per child per day: standing him on the scale twice on a
       Sunday should correct the morning number, not draw a second dot on it. */
    a.forEach(function(x){ if(x.d===d) hit=x; });
    if(hit){
      if(kg) hit.w=+kg;
      if(cm) hit.h=+cm;
      hit.ts=Date.now();
    } else {
      a.push({id:"g"+Date.now()+Math.floor(Math.random()*1000),
              d:d, w:kg?+kg:"", h:cm?+cm:"", ts:Date.now()});
    }
    WJ(growKey(w), a);
    sfxPop(); render();
  };
  document.querySelectorAll("[data-gdel]").forEach(function(x){
    x.onclick=function(){
      var w=x.dataset.gwho, id=x.dataset.gdel, k=growKey(w);
      WJ(k, SJ(k,[]).filter(function(r){ return r.id!==id; }));
      strike(k, id);        /* without this the next sync hands it back */
      sfxTap(); render();
    };
  });
}

/* Every abbreviation on this tab in one place. It sits between the scoring
   and the school table on purpose: the table is unreadable without it. */
function vJargon(){
  var j = (typeof JARGON!=="undefined" ? JARGON : []);
  if(!j.length) return "";
  var s='<div class="panel"><h2><span class="em">\uD83D\uDD24</span> What the words mean'+
        '<span class="side">'+j.length+' of them</span></h2><div class="jgs">';
  j.forEach(function(x){
    s+='<div class="jg"><span class="jgk">'+esc(x.k)+'</span>'+
       '<span class="jgt">'+esc(x.t)+'</span>'+
       '<span class="jgd">'+esc(x.d)+'</span></div>';
  });
  return s+'</div></div>';
}

/* The whole tab turned into the handful of things that are actually ours to
   do, in the order they happen. Everything above this is background; this is
   the part with a date on it. */
function vTodo(){
  var t = (typeof TODO!=="undefined" ? TODO : []);
  if(!t.length) return "";
  var s='<div class="panel"><h2><span class="em">\u2705</span> What we actually have to do'+
        '<span class="side">TC sits it 2030 \u00b7 SC 2032</span></h2><div class="tds">';
  t.forEach(function(x,i){
    s+='<div class="td"><span class="tdn">'+(i+1)+'</span>'+
       '<span class="tdw">'+esc(x.w)+'</span>'+
       '<span class="tdt">'+esc(x.t)+'</span>'+
       '<span class="tdd">'+esc(x.d)+'</span></div>';
  });
  return s+'</div><div class="key">The months are the shape of the year, off '+
    'MOE\u2019s 2026 exercise \u2014 they shift by a week or two and MOE publishes '+
    'the real dates each January. Nothing on this list can be done early, and '+
    'the only two that can be missed outright are the DSA windows.</div></div>';
}

function vSchools(){
  var sc = (typeof SEC_SCHOOLS!=="undefined" ? SEC_SCHOOLS : []);
  var nt = (typeof SEC_NOTES!=="undefined" ? SEC_NOTES : []);
  if(!sc.length) return "";
  var s='<div class="panel"><h2><span class="em">\uD83C\uDF93</span> Secondary schools'+
        '<span class="side">what each took last round</span></h2>'+
        '<p class="pnote" style="margin:0 0 12px">There is no ranking here because '+
        'there is no ranking to show \u2014 MOE stopped publishing one in 2012. These '+
        'are the indicative PSLE score ranges each school actually took, which is '+
        'the nearest honest thing to it.</p><div class="schs">';
  sc.forEach(function(c){
    s+='<div class="sch"><span class="scht">'+esc(c.t)+'</span>'+
       '<span class="schm">'+esc(c.w)+' \u00b7 '+esc(c.s)+'</span><span class="schr">';
    c.pg.forEach(function(r){
      s+='<span class="schb"><i>'+esc(r[0])+'</i><b>'+esc(r[1])+'</b></span>';
    });
    s+='</span>'+(c.aff?'<span class="schaf">Affiliated: '+esc(c.aff)+'</span>':'')+'</div>';
  });
  s+='</div><div class="pnotes">';
  nt.forEach(function(n){
    s+='<div class="pn"><b>'+esc(n[0])+'</b><span>'+esc(n[1])+'</span></div>';
  });
  s+='</div><div class="key">Every range is off that school\u2019s own page on MOE '+
     'SchoolFinder, and MOE says on each of them that the ranges move with the '+
     'cohort. (D) and (M) are the Higher Chinese grade that came with the score. '+
     'The shortlist is ours, not MOE\u2019s \u2014 a school not on it is not a school '+
     'ruled out.</div></div>';
  return s;
}

/* Links out, and nothing read in. The forum blocks it - no CORS headers on
   its API or its RSS - and a hand-pasted copy of "the latest three" is stale
   within the week and has to be re-pasted forever. So every card opens the
   real page instead. Same card as the school sites, two groups. */
function vForums(){
  var f = (typeof FORUM_LINKS!=="undefined" ? FORUM_LINKS : []);
  function group(which, em, title, side){
    var mine=f.filter(function(l){ return (l.sec||"forum")===which; });
    if(!mine.length) return "";
    var g='<div class="panel"><h2><span class="em">'+em+'</span> '+title+
          '<span class="side">'+side+'</span></h2><div class="lnks">';
    mine.forEach(function(l){
      g+='<a class="lnk f-'+esc(l.k)+'" href="'+esc(l.u)+'" target="_blank" rel="noopener noreferrer">'+
         '<span class="lnt">'+esc(l.t)+(l.live?' <em class="livep">live</em>':'')+'</span>'+
         '<span class="lns">'+esc(l.s)+'</span>'+
         '<span class="lngo">\u2197</span></a>';
    });
    return g+'</div>';
  }
  var s = group("site","\uD83D\uDCF0","KiasuParents","the site")+
     '<div class="key">The sections behind the menu across the top of their '+
     'site. Every one opens in a new tab.</div></div>'+
     group("forum","\uD83D\uDCAC","The forum","boards")+
     '<div class="key">Chewtopia only links here, it does not read the forum: '+
     'there is no server behind this app and the forum refuses to be read by a '+
     'page like it. So nothing on this tab can go stale \u2014 every card opens '+
     'whatever is actually there now. And it is a public forum, not a source: '+
     'good for what a school felt like, useless for what a cut-off was. Check '+
     'anything that matters against MOE or the school.</div></div>';
  return s;
}
function wForums(){
  document.querySelectorAll(".lnk").forEach(function(a){
    a.addEventListener("click", function(){ sfxTap(); });
  });
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

  /* Every chip gets its month, not just the row where the month turns over:
     one printed at the top of a run means scrolling to "5 Sat" tells you
     nothing, and the "After that" rows are not consecutive days at all. */
  function monCap(d){
    var y=new Date(d+"T00:00:00").getFullYear();
    return dmon(d)+(y!==new Date().getFullYear() ? " "+String(y).slice(2) : "");
  }
  /* and a soft rule where one month ends and the next begins — the small
     caps say which month, the line is what you see without reading. */
  var lastMon="";
  function dayRows(list, d){
    var out="", has=!!(list&&list.length), mon=d.slice(0,7);
    if(lastMon && mon!==lastMon) out+='<span class="agmo"></span>';
    lastMon=mon;
    /* a day off colours its own date too, so no-school days can be counted
       down the left edge without reading a word */
    var off = has && list.some(function(e){ return e.hol; });
    out+='<span class="agd'+(d===today?" now":"")+(isWeekend(d)?" we":"")+
         (off?" off":"")+(has?"":" bare")+'">'+
         '<u'+(monCap(d).length>4?' class="yr"':'')+'>'+esc(monCap(d))+'</u>'+
         '<b>'+dnum(d)+'</b><i>'+
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

/* Which subject a run belongs to. The code comes first because runs pulled
   back down from the cloud do not carry the subject with them. */
/* The code the school and the boys actually use, with the plain word under it
   so nobody has to translate. The timetable two tabs away already says EL, CL
   and MA; these columns used to say English, 华文 and Maths, which meant the
   app disagreed with itself about what its own subjects are called. */
var SUBJ_COLS=[["en","EL","English"],["zh","CL","\u534e\u6587"],["ma","MA","Maths"]];
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
    var p=pending();
    var bad = (typeof syncErr==="function" ? syncErr() : "")||"";
    if(bad==="insert-only") bad="";      /* scores still go up; not a failure */
    if(!bad) bad=(typeof pullErr==="function" ? pullErr() : "")||"";
    /* Which family this device is signed in to. Two devices on two different
       names each sync perfectly and never see one another, and the only way to
       spot it is to read the name on both. */
    s+='<p class="whoami">Signed in as <b>'+esc(familyName(cloudUser.email))+
       '</b> \u00b7 '+results().length+' scores here, '+p+' waiting</p>'+
       '<div class="syncrow"><button class="btn go" id="cSync">\u21bb Sync'+
       (p?' \u00b7 '+p+' waiting':'')+'</button>'+
       '<button class="btn soft" id="cOut">Sign out</button></div>'+
       '<p class="synced'+(bad?" bad":"")+'">'+esc(syncNote()||"Not synced yet.")+'</p>';
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
