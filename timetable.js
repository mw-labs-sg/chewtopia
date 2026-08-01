/* ==========================================================================
   CHEWTOPIA — TIMETABLE tab. The weekly grid: school hours,
   after-school activities and the time slots.
   ========================================================================== */

/* ==========================================================================
   WEEK — school, after school and events on one grid
   ========================================================================== */
var WK_FROM="07:00", WK_TO="20:00", wkOff=0;

function toMin(t){ var p=String(t).split(":"); return (+p[0])*60 + (+p[1]||0); }
function slotOf(t){ return Math.round((toMin(t)-toMin(WK_FROM))/15); }
function slotCount(){ return Math.round((toMin(WK_TO)-toMin(WK_FROM))/15); }
function slotLabel(i){
  var m=toMin(WK_FROM)+i*15, h=Math.floor(m/60), mm=m%60;
  if(mm!==0) return "";
  var hh = h===0?12 : h>12?h-12 : h;
  return hh+(h>=12?"pm":"am");
}
function weekStart(off){
  var d=new Date(); d.setHours(0,0,0,0);
  d.setDate(d.getDate()-todayIdx()+(off||0)*7);
  return d;
}
function iso(d){
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
function acts(){ return SJ("acts",[]); }

function vWeek(){
  var start=weekStart(wkOff), dates=DAYS.map(function(_,i){
    var x=new Date(start); x.setDate(start.getDate()+i); return x; });
  var isThis = wkOff===0;
  var rows=slotCount();

  /* all-day events falling in this week */
  var allday=[];
  SJ("events",[]).forEach(function(e){
    DAYS.forEach(function(_,i){
      var day=iso(dates[i]);
      var inRange = e.d2 ? (day>=e.d && day<=e.d2) : (day===e.d);
      if(inRange && !e.time) allday.push({col:i, e:e});
    });
  });

  var g='<div class="wkwrap"><div class="wkgrid" style="grid-template-rows:24px '+
        (allday.length?"auto ":"")+'repeat('+rows+',26px)">';

  /* header */
  g+='<span class="wkh corner"></span>';
  DAYS.forEach(function(d,i){
    var today = isThis && i===todayIdx();
    g+='<span class="wkh'+(today?" now":"")+'" style="grid-column:'+(i+2)+';grid-row:1">'+
       d.slice(0,3)+' <em>'+dates[i].getDate()+'</em></span>';
  });

  /* all-day strip */
  var rowOffset=2;
  if(allday.length){
    g+='<span class="wkallday-label" style="grid-row:2">all day</span>';
    var byCol={};
    allday.forEach(function(x){ (byCol[x.col]=byCol[x.col]||[]).push(x.e); });
    Object.keys(byCol).forEach(function(c){
      g+='<span class="wkallday" style="grid-column:'+(+c+2)+';grid-row:2">'+
         byCol[c].map(function(e){
           return '<span class="chip '+whoCls(e.w)+'">'+esc(e.t)+'</span>'; }).join("")+'</span>';
    });
    rowOffset=3;
  }

  /* time labels */
  for(var i=0;i<rows;i++){
    var lb=slotLabel(i);
    g+='<span class="wkt" style="grid-row:'+(i+rowOffset)+'">'+lb+'</span>';
    if(lb) g+='<span class="wkrule" style="grid-row:'+(i+rowOffset)+'"></span>';
  }

  function block(colIdx, from, to, label, cls, extra){
    var a=slotOf(from), z=slotOf(to);
    if(z<=a) z=a+1;
    if(z<=0 || a>=rows) return "";
    a=Math.max(0,a); z=Math.min(rows,z);
    return '<span class="wkb '+cls+'" style="grid-column:'+(colIdx+2)+
      ';grid-row:'+(a+rowOffset)+'/span '+(z-a)+'"'+(extra||"")+'>'+label+'</span>';
  }

  /* Both mode puts each child down half the column so they sit side by side. */
  var w = ttWho(), both = (w==="both");
  function side(id){ return both ? (id===KIDS[0].id ? " hL" : " hR") : ""; }

  /* school */
  var shown = both ? KIDS.map(function(k){ return k.id; }) : [w];
  var tt = both ? (TIMETABLES[KIDS[0].id]||TIMETABLES[KIDS[1].id]) : TIMETABLES[w];
  shown.forEach(function(kid){
    var kt = TIMETABLES[kid]; if(!kt) return;
    ["Monday","Tuesday","Wednesday","Thursday","Friday"].forEach(function(d,i){
      (kt[d]||[]).forEach(function(bk){
        g+=block(i, bk[0], bk[1], bk[2], "sch "+subjCls(bk[2])+side(kid));
      });
    });
  });

  /* after school, recurring */
  acts().filter(function(a){
    return both || !a.who || a.who==="all" || a.who===w;
  }).forEach(function(a){
    var i=DAYS.indexOf(a.day); if(i<0) return;
    var own = a.who && a.who!=="all";
    g+=block(i, a.from, a.to, esc(a.t), 'own '+whoCls(own?a.who:'')+(own?side(a.who):""), ' data-act="'+a.id+'"');
  });

  /* timed events this week */
  SJ("events",[]).forEach(function(e){
    if(!e.time) return;
    DAYS.forEach(function(_,i){
      if(iso(dates[i])!==e.d) return;
      var end=String(Math.min(20,(+e.time.split(":")[0])+1)).padStart(2,"0")+":"+e.time.split(":")[1];
      g+=block(i, e.time, end, esc(e.t), 'own '+whoCls(e.w));
    });
  });

  g+='</div></div>';

  var lbl = isThis ? "This week" : (wkOff===1?"Next week":wkOff===-1?"Last week":
    dates[0].toLocaleDateString("en-GB",{day:"numeric",month:"short"}));

  var head='<div class="panel"><h2><span class="em">🗓️</span> '+lbl+
    '<span class="side">'+(both?"Both":esc(pname(w)))+'</span></h2>'+
    kidPicker(w,"ttPick",true)+kidKey(true)+
    (both?'<p class="empty" style="margin:-4px 0 10px">'+esc(pname(KIDS[0].id))+
      ' on the left of each day, '+esc(pname(KIDS[1].id))+' on the right.</p>':'')+
    '<div class="wknav"><button class="btn soft" id="wkPrev">‹</button>'+
    '<span class="wkrange">'+dates[0].toLocaleDateString("en-GB",{day:"numeric",month:"short"})+
    ' – '+dates[6].toLocaleDateString("en-GB",{day:"numeric",month:"short"})+'</span>'+
    '<button class="btn soft" id="wkNext">›</button></div>'+
    (tt ? '' : '<p class="empty" style="margin-bottom:10px">No school timetable saved for '+
      esc(pname(w))+' yet — after-school and events still show below.</p>')+g;

  /* add an activity */
  var dayOpts=DAYS.map(function(d){ return '<option value="'+d+'">'+d+'</option>'; }).join("");
  head+='<button class="addlink" id="aShow">+ Add something weekly</button>'+
    '<div id="aForm" class="hidden">'+
    '<div class="lbl">What</div><input type="text" id="aT" maxlength="40" placeholder="Swimming">'+
    '<div class="lbl">Day</div><select id="aD">'+dayOpts+'</select>'+
    '<div class="lbl">Who</div><select id="aW"><option value="all">Everyone</option>'+
      KIDS.map(function(k){ return '<option value="'+k.id+'"'+(k.id===w?" selected":"")+'>'+esc(pname(k.id))+'</option>'; }).join("")+
    '</select>'+
    '<div class="pair"><span class="f1"><div class="lbl">From</div><input type="time" id="aF" value="16:00"></span>'+
    '<span class="f1"><div class="lbl">To</div><input type="time" id="aTo" value="17:00"></span></div>'+
    '<div class="btnrow"><button class="btn go" id="aAdd">Add</button>'+
    '<button class="btn soft" id="aCancel">Cancel</button></div></div>';

  head+='<div class="key">'+(tt?'<span class="dot s-core"></span> maths &amp; English &nbsp;'+
    '<span class="dot s-cl"></span> 华文 &nbsp;'+
    '<span class="dot s-fun"></span> PE, music, art &nbsp;'+
    '<span class="dot s-other"></span> LSP, PAL, CCE, FTGP, SS &nbsp;'+
    '<span class="dot s-rec"></span> recess<br>'+TT_KEY+'<br>':'')+
    'Blocks with a coloured edge are after school — tap one to remove it.</div></div>';
  return head;
}

function wWeek(){
  document.getElementById("wkPrev").onclick=function(){ wkOff--; render(); };
  document.getElementById("wkNext").onclick=function(){ wkOff++; render(); };
  var sh=document.getElementById("aShow"), fm=document.getElementById("aForm");
  sh.onclick=function(){ fm.classList.toggle("hidden"); };
  document.getElementById("aCancel").onclick=function(){ fm.classList.add("hidden"); };
  document.getElementById("aAdd").onclick=function(){
    var t=document.getElementById("aT").value.trim();
    if(!t){ alert("Give it a name."); return; }
    var a=acts();
    a.push({id:Date.now()+"", who:document.getElementById("aW").value, day:document.getElementById("aD").value,
            from:document.getElementById("aF").value, to:document.getElementById("aTo").value,
            t:t.slice(0,40)});
    WJ("acts",a); render();
  };
  wirePicker("ttPick", ttWho(), function(v){ W("ttwho", v); });
  document.querySelectorAll("[data-act]").forEach(function(b){
    b.onclick=function(){
      if(!confirm("Remove "+b.textContent+"?")) return;
      markGone(b.dataset.act);
      WJ("acts", acts().filter(function(x){ return x.id!==b.dataset.act; })); render();
    };
  });
}
