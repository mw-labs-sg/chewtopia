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
  var V={home:vHome,schedule:vWeek,meals:vMeals,practice:vTests,results:vResults};
  var Wr={home:wHome,schedule:wWeek,meals:wMeals,practice:wTests,results:wResults};
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
  var evs=SJ("events",[]).filter(function(e){ return !evState(e).gone; })
    .sort(function(a,b){ return evState(a).start-evState(b).start; });
  var s='<div class="panel"><h2><span class="em">📅</span> Upcoming</h2>'+kidKey(true);
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
          (e.p?'<button class="prac" data-go="'+esc(e.p)+'" data-who="'+esc(e.w||"")+'">'+
               'Practise this \u2192</button>':'')+'</span>'+
        '<button class="x" data-del="'+e.id+'" title="Remove">&times;</button></div>';
    });
  } else s+='<p class="empty">Nothing coming up.</p>';

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

function vResults(){
  var s="";
  KIDS.forEach(function(k){
    var runs=runsFor(k.id);
    s+='<div class="panel"><h2>'+esc(pname(k.id))+
       '<span class="side">'+streakChip(k.id)+runs.length+(runs.length===1?" test":" tests")+'</span></h2>';
    if(!runs.length){ s+='<p class="empty">Nothing yet.</p></div>'; return; }
    var tests=[]; runs.forEach(function(r){ if(tests.indexOf(r.test)<0) tests.push(r.test); });
    tests.forEach(function(t){
      var a=runs.filter(function(r){ return r.test===t; });
      var b=a.reduce(function(x,y){ return y.score>x.score?y:x; },a[0]);
      var ch=a.map(function(r,n){
        var p=Math.round(r.score/r.total*100), c=p>=80?"good":p>=50?"mid":"low";
        return (n?'<span class="arw">→</span>':'')+'<span class="run '+c+'"><b>'+r.score+'/'+r.total+
          '</b><i>'+new Date(r.ts).toLocaleDateString("en-GB",{day:"numeric",month:"short"})+'</i></span>';
      }).join("");
      s+='<div class="res"><div class="top"><span class="n">'+esc(t)+'</span>'+
         '<span class="best">Best '+b.score+'/'+b.total+'</span></div>'+
         '<div class="rl">'+ch+'</div></div>';
    });
    s+='</div>';
  });
  return s+'<div class="panel"><h2>Housekeeping</h2>'+
    '<div class="btnrow"><button class="btn soft" id="wipe">Clear all scores</button></div></div>';
}
function wResults(){
  document.getElementById("wipe").onclick=function(){
    if(confirm("Delete every saved score on this device?")){ WJ("results",[]); render(); } };
}

seedOnce();
tab = tabFromHash() || tab;
if(!location.hash){ try{ location.replace("#"+SLUGS[tab]); }catch(e){} }
render();

/* back and forward buttons, and links pasted straight into the address bar */
window.addEventListener("hashchange", function(){
  var t=tabFromHash();
  if(t && t!==tab) go(t, true);
});
