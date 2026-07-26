/* ==========================================================================
   CHEWTOPIA — saved on the device, nothing is sent anywhere.

   WHERE TO EDIT:
     TC_SPELL / TC_PINYIN   → Primary 2 tests
     SC_TINGXIE / SC_SPELL  → Kindergarten tests
     TIMETABLE              → school timetable
     MEALS_DEFAULT          → the usual dinner plan
     SEED_EVENTS            → events loaded on first open
   ========================================================================== */

function S(k,d){ try{ var v=localStorage.getItem("chew:"+k); return v===null?d:v; }catch(e){ return d; } }
function W(k,v){ try{ localStorage.setItem("chew:"+k,v); }catch(e){} }
function SJ(k,d){ try{ var v=JSON.parse(localStorage.getItem("chew:"+k)); return (v===null||v===undefined)?d:v; }catch(e){ return d; } }
function WJ(k,v){ W(k, JSON.stringify(v)); }

var KIDS = [ {id:"tc",init:"TC",level:"Primary 2"}, {id:"sc",init:"SC",level:"Kindergarten"} ];
function pname(id){ var k=KIDS.filter(function(x){return x.id===id;})[0]; return S("name:"+id,k.init); }
function who(){ return S("who","tc"); }

var TC_SPELL = {
  "3.3": ["Unit 9", [
    ["spell","I cannot find my keys. They have completely disappeared!","disappeared"],
    ["spell","John read a book about three mischievous children.","mischievous"],
    ["spell","There was something strange about that tree.","strange"],
    ["spell","Uncle Lim propped the ladder against the tree.","propped"],
    ["spell","He picked something up from the ground.","ground"],
    ["spell","Were his eyes playing a trick on him?","playing a trick"],
    ["spell","He thought of climbing the tall sturdy tree.","sturdy"],
    ["spell","John hid behind the bushes.","behind"],
    ["dict","He frowned with concern.","He frowned with concern."],
    ["dict","He scratched his head over the tricky question.","He scratched his head over the tricky question."]
  ]],
  "3.4": ["Unit 9", [
    ["spell","He returned to the tree with Uncle Lim and his ladder.","returned"],
    ["spell","That tree! he told Uncle Lim as he pointed at it.","pointed at"],
    ["spell","Whenever anyone stood under the tree, odd things happened.","odd"],
    ["spell","Its nest was decorated with Mary's ribbon and many other shiny things.","decorated with"],
    ["spell","They went closer and looked very carefully up into the tree.","closer"],
    ["spell","They saw a bird with Peter's coin in its beak.","coin"],
    ["spell","They were both puzzled by what happened.","puzzled"],
    ["spell","She ambled, grinning from ear to ear.","grinning from ear to ear"],
    ["dict","She looked at the floor with a sheepish grin.","She looked at the floor with a sheepish grin."],
    ["dict","She finally realised what had happened.","She finally realised what had happened."]
  ]],
  "3.5": ["Unit 10", [
    ["spell","He had forgotten to bring his pencil case to school.","forgotten"],
    ["spell","She loves eating vegetables.","vegetables"],
    ["spell","Those tomatoes are red and juicy.","tomatoes"],
    ["spell","The cat might eat the mouse.","might"],
    ["spell","The snake is huge and green.","huge"],
    ["spell","My aunt arrived at my party in a limousine.","arrived"],
    ["spell","It is dangerous to cycle on the road without a helmet.","dangerous"],
    ["dict","He lost his balance and fell with a thud.","He lost his balance and fell with a thud."],
    ["dict","Tears welled up in her eyes.","Tears welled up in her eyes."],
    ["dict","His knees were grazed but he quickly got up.","His knees were grazed but he quickly got up."]
  ]],
  "3.6": ["Unit 10", [
    ["spell","Please be quiet in the library, whispered the librarian.","whispered"],
    ["spell","That aeroplane looks like a gigantic bird.","gigantic"],
    ["spell","The gardener used the hose to water the plants.","hose"],
    ["spell","The smell of the garbage over there is terrible.","garbage"],
    ["spell","He called for extra men to help him move the table.","extra"],
    ["spell","That truck is carrying many baskets of watermelons.","truck"],
    ["spell","Grandfather noticed something moving behind the bushes.","noticed"],
    ["dict","The boy tripped because he missed the ball.","The boy tripped because he missed the ball."],
    ["dict","He slid and fell as the wet grass was slippery.","He slid and fell as the wet grass was slippery."],
    ["dict","He clutched his leg as it was painful.","He clutched his leg as it was painful."]
  ]]
};

/* 拼音 — hear the word, write the pinyin and the tone number.
   [character, word it is used in, pinyin, tone, meaning] */
var TC_PINYIN = {
  "Lesson 12": [
    ["永","永远","yong","3","forever"], ["轻","轻轻","qing","1","light / gently"],
    ["命","生命","ming","4","life"],   ["百","一百","bai","3","hundred"],
    ["健","健康","jian","4","healthy"],["康","健康","kang","1","well-being"],
    ["幸","幸福","xing","4","fortunate"],["愿","愿望","yuan","4","wish"],
    ["吹","吹风","chui","1","to blow"],["糕","蛋糕","gao","1","cake"],
    ["首","一首歌","shou","3","measure word for songs"],["张","一张纸","zhang","1","measure word"],
    ["卡","卡片","ka","3","card"],     ["影","电影","ying","3","shadow / film"],
    ["票","电影票","piao","4","ticket"],["礼","礼物","li","3","gift"],
    ["厅","客厅","ting","1","hall"],   ["奇","奇怪","qi","2","strange"],
    ["怪","奇怪","guai","4","weird"],  ["活","生活","huo","2","to live"],
    ["宝","宝贝","bao","3","treasure"]
  ],
  "复习 12 字": [
    ["宝","宝贝","bao","3","treasure"], ["些","一些","xie","1","some"],
    ["写","写字","xie","3","to write"], ["桌","桌子","zhuo","1","table"],
    ["礼","礼物","li","3","gift"],      ["卡","卡片","ka","3","card"],
    ["张","一张","zhang","1","measure word"],["吹","吹风","chui","1","to blow"],
    ["康","健康","kang","1","well-being"],["健","健康","jian","4","healthy"],
    ["百","一百","bai","3","hundred"],  ["永","永远","yong","3","forever"]
  ]
};

/* --- SC, Kindergarten K2 --- */
var SC_TINGXIE = {
  "Week 6 · 6 Aug": [
    ["去","去学校","qu","4","to go"], ["来","过来","lai","2","to come"],
    ["爱","爱心","ai","4","love"],   ["快乐","快乐","kuai le","",  "happy"],
    ["马儿跑得快","马儿跑得快。","ma er pao de kuai","","The horse runs fast."]
  ],
  "Week 8 · 20 Aug": [
    ["狼","大灰狼","lang","2","wolf"], ["蛇","小蛇","she","2","snake"],
    ["鸭子","小鸭子","ya zi","","duck"], ["乌龟","小乌龟","wu gui","","tortoise"],
    ["小花猫","小花猫","xiao hua mao","","little tabby cat"]
  ]
};
var SC_SPELL = {
  "Week 7 · 12 Aug": ["English Spelling", [
    ["spell","A seed grows into a plant.","seed"],
    ["spell","The root takes in water from the soil.","root"],
    ["spell","The stem holds the plant up.","stem"],
    ["spell","The flower is pink and pretty.","flower"],
    ["spell","A green leaf grew on the branch.","leaf"],
    ["dict","We eat fruits daily.","We eat fruits daily."]
  ]],
  "Week 9 · 26 Aug": ["English Spelling", [
    ["spell","We baked cookies for tea.","cookies"],
    ["spell","Let us bake a cake today.","bake"],
    ["spell","She drank a glass of orange juice.","juice"],
    ["spell","Put the buns on the tray.","tray"],
    ["spell","Add the flour into the bowl.","flour"],
    ["dict","She mixes the batter to bake a cake.","She mixes the batter to bake a cake."]
  ]]
};

/* --- TC's school timetable --- */
var TIMETABLE = {
  Monday:    ["MA","CL","CL","Recess","LSP","PAL","EL"],
  Tuesday:   ["MA","ART","CL","Recess","CL","LSP","EL","PE"],
  Wednesday: ["LSP","EL","CCE","Recess","CL","MA","FTGP"],
  Thursday:  ["LSP","CL","Assembly","Recess","MA","PE","EL","SS"],
  Friday:    ["MA","MUSIC","EL","Recess","LSP","CL","PE","CL"]
};
var TT_KEY = "MA maths · CL 华文 · EL English · SS social studies · " +
             "LSP learning support · PAL active learning · CCE character &amp; citizenship · " +
             "FTGP form teacher time";

var MEALS_DEFAULT = {
  Monday:"Steamed codfish with ginger, spring onion, light soy\nSunny-side eggs for the boys\nStir-fried mixed vegetables\nLong bean + black fungus, minced pork, chilli & peppercorn",
  Tuesday:"Salmon rice\nChicken fillet salad (adults)\nSoup",
  Wednesday:"Garlic prawns\nBraised pork belly with carrot, potato & egg\nBlanched vegetables with fried shallots\nSteamed otah",
  Thursday:"Macaroni soup with minced beef",
  Friday:"Beef burger, caramelised onion, cheese, fried egg\nBlanched vegetables on the side",
  Saturday:"", Sunday:""
};

/* Events pre-loaded the first time only. Delete any of them in the app and
   they stay deleted. d = start date, d2 = end date for trips. */
var SEED_EVENTS = [
  {id:"s1", t:"Hai Di Lao 🍲",     d:"2026-08-01", w:"sc"},
  {id:"s2", t:"Birthday party 🎂", d:"2026-08-08", w:"sc"},
  {id:"s3", t:"Chiang Mai ✈️",     d:"2026-09-04", d2:"2026-09-07"}
];
function seedOnce(){
  if(S("seeded","")==="1") return;
  var a = SJ("events", []);
  var have = {}; a.forEach(function(e){ have[e.id]=1; });
  SEED_EVENTS.forEach(function(e){ if(!have[e.id]) a.push(e); });
  WJ("events", a); W("seeded","1");
}


var SEED_EVENTS = [
  {id:"s1", t:"Hai Di Lao 🍲",     d:"2026-08-01", w:"sc"},
  {id:"s2", t:"Birthday party 🎂", d:"2026-08-08", w:"sc"},
  {id:"s3", t:"Chiang Mai ✈️",     d:"2026-09-04", d2:"2026-09-07"}
];
function seedOnce(){
  if(S("seeded","")==="1") return;
  var a=SJ("events",[]), have={};
  a.forEach(function(e){ have[e.id]=1; });
  SEED_EVENTS.forEach(function(e){ if(!have[e.id]) a.push(e); });
  WJ("events",a); W("seeded","1");
}

var DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
var TABS = [["home","Home"],["tests","Tests"],["results","Results"],["timetable","School"]];
var tab="home", quiz=null, showAdd=false;
function go(id){ tab=id; quiz=null; showAdd=false; hush(); render(); scrollTo(0,0); }

/* ---------- helpers ---------- */
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
function pill(r){ if(!r) return '<span class="pill">Not tried</span>';
  var p=Math.round(r.score/r.total*100), c=p>=80?"good":p>=50?"mid":"low";
  return '<span class="pill '+c+'">'+r.score+'/'+r.total+'</span>'; }

/* ---------- speech ---------- */
var voices=[];
function loadVoices(){ try{ voices=speechSynthesis.getVoices()||[]; }catch(e){ voices=[]; } }
if(window.speechSynthesis){ loadVoices(); speechSynthesis.onvoiceschanged=loadVoices; }
var FEM=/samantha|serena|sonia|kate|karen|moira|tessa|fiona|libby|maisie|hazel|aria|jenny|zira|ava|allison|susan|female|woman|xiaoxiao|huihui|tingting|meijia|sinji|yaoyao|lili/i;
function bestVoice(lang){
  if(!voices.length) loadVoices();
  var saved=S("voice:"+lang,""), hit=voices.filter(function(v){return v.name===saved;})[0];
  if(hit) return hit;
  var base=lang.split("-")[0];
  var ex=voices.filter(function(v){ return v.lang&&v.lang.replace("_","-")===lang; });
  var nr=voices.filter(function(v){ return v.lang&&v.lang.replace("_","-").indexOf(base)===0; });
  return ex.filter(function(v){return FEM.test(v.name);})[0]
      || nr.filter(function(v){return FEM.test(v.name);})[0] || ex[0] || nr[0] || null;
}
function say(t,rate,lang){
  if(!window.speechSynthesis) return;
  lang=lang||"en-GB";
  var u=new SpeechSynthesisUtterance(t), v=bestVoice(lang);
  if(v){ u.voice=v; u.lang=v.lang; } else u.lang=lang;
  u.rate=rate||0.85; u.pitch=1.05; speechSynthesis.speak(u);
}
function hush(){ try{ speechSynthesis.cancel(); }catch(e){} }
function voiceBox(lang){
  if(!voices.length) loadVoices();
  var o=voices.filter(function(v){ return v.lang&&v.lang.replace("_","-").indexOf(lang.split("-")[0])===0; });
  if(!o.length) return '<p class="empty">No '+(lang==="zh-CN"?"Chinese":"English")+' voice on this device.</p>';
  var cur=bestVoice(lang), h='<div class="lbl">Teacher voice</div><select id="vp">';
  o.forEach(function(v){ h+='<option value="'+esc(v.name)+'"'+(cur&&v.name===cur.name?" selected":"")+'>'+esc(v.name)+'</option>'; });
  return h+'</select>';
}
function wireVoice(lang){ var e=document.getElementById("vp"); if(!e) return;
  e.onchange=function(){ W("voice:"+lang,e.value);
    say(lang==="zh-CN"?"你好":"Hello, I am your teacher.",0.85,lang); }; }

/* ==========================================================================
   render
   ========================================================================== */
function render(){
  document.getElementById("mark").innerHTML =
    "CHEWTOPIA".split("").map(function(c){return "<span>"+c+"</span>";}).join("");

  var wb=document.getElementById("who"); wb.innerHTML="";
  KIDS.forEach(function(k,n){
    var b=document.createElement("button");
    b.className="kid"+(n?" b":"")+(k.id===who()?" on":"");
    b.innerHTML='<span class="av">'+esc(pname(k.id).slice(0,2).toUpperCase())+'</span>'+
      '<span class="nm">'+esc(pname(k.id))+'<small>'+k.level+'</small></span>';
    b.onclick=function(){
      if(k.id===who()){ var n2=prompt("Name (kept on this device only)",pname(k.id));
        if(n2&&n2.trim()) W("name:"+k.id,n2.trim().slice(0,16)); }
      else W("who",k.id);
      quiz=null; render();
    };
    wb.appendChild(b);
  });

  var tb=document.getElementById("tabs"); tb.innerHTML="";
  TABS.forEach(function(t){
    var b=document.createElement("button");
    b.className="tab"+(t[0]===tab?" on":"");
    b.textContent=t[1];
    b.onclick=function(){ go(t[0]); };
    tb.appendChild(b);
  });

  var v=document.getElementById("view");
  if(quiz){ v.innerHTML=quizHTML(); wireQuiz(); return; }
  var V={home:vHome,tests:vTests,results:vResults,timetable:vSchool};
  var Wr={home:wHome,tests:wTests,results:wResults,timetable:wSchool};
  v.innerHTML=V[tab](); Wr[tab]();
  document.querySelectorAll("textarea.cell").forEach(grow);
}

/* ==========================================================================
   HOME = coming up + schedule + meals
   ========================================================================== */
function vHome(){
  /* --- coming up --- */
  var evs=SJ("events",[]).filter(function(e){ return !evState(e).gone; })
    .sort(function(a,b){ return evState(a).start-evState(b).start; });
  var s='<div class="panel"><h2><span class="em">📅</span> Coming up</h2>';
  if(evs.length){
    evs.forEach(function(e){
      var st=evState(e);
      s+='<div class="ev'+((st.live||st.start<=2)?" soon":"")+'">'+
        '<span class="cd"><b>'+dnum(e.d)+(e.d2?"–"+dnum(e.d2):"")+'</b><i>'+dmon(e.d)+'</i></span>'+
        '<span class="tx">'+esc(e.t)+'<small>'+evWhen(e)+(e.w?" · "+esc(pname(e.w)):"")+'</small></span>'+
        '<button class="x" data-del="'+e.id+'">&times;</button></div>';
    });
  } else s+='<p class="empty">Nothing coming up.</p>';

  if(showAdd){
    var opts='<option value="">Everyone</option>'+KIDS.map(function(k){
      return '<option value="'+k.id+'"'+(k.id===who()?" selected":"")+'>'+esc(pname(k.id))+'</option>'; }).join("");
    s+='<div class="lbl">What</div><input type="text" id="eT" maxlength="60" placeholder="华文听写 Week 6">'+
       '<div class="lbl">When</div><input type="date" id="eD">'+
       '<div class="lbl">Until (trips only)</div><input type="date" id="eD2">'+
       '<div class="lbl">Who</div><select id="eW">'+opts+'</select>'+
       '<div class="btnrow"><button class="btn go" id="eAdd">Add</button>'+
       '<button class="btn soft" id="eCancel">Cancel</button></div>';
  } else {
    s+='<button class="addlink" id="eShow">+ Add something</button>';
  }
  s+='</div>';

  /* --- schedule --- */
  var sch=SJ("sched:"+who(),{}), dt=weekDates();
  s+='<div class="panel"><h2><span class="em">⏰</span> This week'+
     '<span class="side">'+esc(pname(who()))+'</span></h2>';
  DAYS.forEach(function(d,i){
    s+='<div class="day'+(i===todayIdx()?" now":"")+'"><span class="d">'+d.slice(0,3)+' '+dt[i].getDate()+'</span>'+
      '<input class="cell" type="text" data-day="'+d+'" value="'+esc(sch[d]||"")+'" placeholder="—"></div>';
  });
  s+='<div class="saved" id="schS"></div></div>';

  /* --- meals --- */
  var m=SJ("meals:"+monKey(),null)||MEALS_DEFAULT;
  s+='<div class="panel"><h2><span class="em">🍜</span> Dinner</h2>';
  DAYS.forEach(function(d,i){
    s+='<div class="day'+(i===todayIdx()?" now":"")+'"><span class="d">'+d.slice(0,3)+'</span>'+
      '<textarea class="cell" data-meal="'+d+'" placeholder="—">'+esc(m[d]||"")+'</textarea></div>';
  });
  s+='<div class="btnrow"><button class="btn soft" id="mR">Reset to usual plan</button></div>'+
     '<div class="saved" id="mS"></div></div>'+
     '<div class="panel"><h2><span class="em">🛒</span> Groceries</h2>'+
     '<textarea class="cell" id="gr" style="min-height:110px" placeholder="What to buy">'+
     esc(S("groc:"+monKey(),""))+'</textarea><div class="saved" id="gS"></div></div>';
  return s;
}

function wHome(){
  document.querySelectorAll("[data-del]").forEach(function(b){
    b.onclick=function(){ WJ("events",SJ("events",[]).filter(function(e){return e.id!==b.dataset.del;})); render(); }; });
  var sh=document.getElementById("eShow");
  if(sh) sh.onclick=function(){ showAdd=true; render(); };
  var cx=document.getElementById("eCancel");
  if(cx) cx.onclick=function(){ showAdd=false; render(); };
  var ad=document.getElementById("eAdd");
  if(ad) ad.onclick=function(){
    var t=document.getElementById("eT").value.trim(), d=document.getElementById("eD").value;
    if(!t||!d){ alert("Needs a name and a date."); return; }
    var d2=document.getElementById("eD2").value;
    var rec={id:Date.now()+"",t:t.slice(0,60),d:d,w:document.getElementById("eW").value};
    if(d2&&d2>=d) rec.d2=d2;
    var a=SJ("events",[]); a.push(rec); WJ("events",a);
    showAdd=false; render();
  };
  document.querySelectorAll("[data-day]").forEach(function(i){
    i.oninput=function(){ var s=SJ("sched:"+who(),{}); s[i.dataset.day]=i.value;
      WJ("sched:"+who(),s); flash("schS"); }; });
  document.querySelectorAll("[data-meal]").forEach(function(t){
    t.oninput=function(){ grow(t);
      var m=SJ("meals:"+monKey(),null)||JSON.parse(JSON.stringify(MEALS_DEFAULT));
      m[t.dataset.meal]=t.value; WJ("meals:"+monKey(),m); flash("mS"); }; });
  document.getElementById("mR").onclick=function(){
    if(confirm("Reset this week's dinners?")){ WJ("meals:"+monKey(),MEALS_DEFAULT); render(); } };
  var g=document.getElementById("gr");
  g.oninput=function(){ grow(g); W("groc:"+monKey(),g.value); flash("gS"); };
}

/* ==========================================================================
   TESTS
   ========================================================================== */
function vTests(){
  var s='<div class="panel"><h2><span class="em">📝</span> Tests'+
        '<span class="side">'+esc(pname(who()))+'</span></h2>';
  if(who()==="tc"){
    s+='<div class="sub">English spelling</div>';
    Object.keys(TC_SPELL).forEach(function(k){
      s+='<button class="test" data-t="en|'+k+'"><span><span class="nm">List '+k+'</span>'+
        '<span class="mt">'+TC_SPELL[k][0]+' · '+TC_SPELL[k][1].length+' questions</span></span>'+
        pill(lastFor("Spelling "+k))+'</button>'; });
    s+='<div class="sub">华文 · 汉语拼音</div>';
    Object.keys(TC_PINYIN).forEach(function(k){
      s+='<button class="test" data-t="zh|'+k+'"><span><span class="nm">'+k+'</span>'+
        '<span class="mt">'+TC_PINYIN[k].length+' words</span></span>'+pill(lastFor(k))+'</button>'; });
  } else {
    s+='<div class="sub">华文听写</div>';
    Object.keys(SC_TINGXIE).forEach(function(k){
      s+='<button class="test" data-t="zh|'+k+'"><span><span class="nm">'+k+'</span>'+
        '<span class="mt">'+SC_TINGXIE[k].length+' words</span></span>'+pill(lastFor(k))+'</button>'; });
    s+='<div class="sub">English spelling</div>';
    Object.keys(SC_SPELL).forEach(function(k){
      s+='<button class="test" data-t="es|'+k+'"><span><span class="nm">'+k+'</span>'+
        '<span class="mt">'+SC_SPELL[k][1].length+' questions</span></span>'+pill(lastFor(k))+'</button>'; });
  }
  s+='<div class="sub">Maths</div>'+
     '<button class="test" data-t="ma|easy"><span><span class="nm">Warm up</span>'+
       '<span class="mt">Add and take away to 20</span></span>'+pill(lastFor("Math · Warm up"))+'</button>'+
     '<button class="test" data-t="ma|times"><span><span class="nm">Times tables</span>'+
       '<span class="mt">2 to 10</span></span>'+pill(lastFor("Math · Times tables"))+'</button>'+
     '<button class="test" data-t="ma|hard"><span><span class="nm">Challenge</span>'+
       '<span class="mt">Bigger numbers and division</span></span>'+pill(lastFor("Math · Challenge"))+'</button>'+
     '</div>'+
     '<div class="panel"><h2><span class="em">🔊</span> Voices</h2>'+
     voiceBox("en-GB")+voiceBox("zh-CN")+'</div>';
  return s;
}
function wTests(){
  document.querySelectorAll("[data-t]").forEach(function(b){ b.onclick=function(){ start(b.dataset.t); }; });
  var sel=document.querySelectorAll("#vp");
  if(sel[0]){ sel[0].onchange=function(){ W("voice:en-GB",sel[0].value); say("Hello, I am your teacher.",0.85,"en-GB"); }; }
  if(sel[1]){ sel[1].id="vp2"; sel[1].onchange=function(){ W("voice:zh-CN",sel[1].value); say("你好",0.85,"zh-CN"); }; }
}

function rnd(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function mathItems(kind){
  var o=[];
  for(var i=0;i<10;i++){
    var a,b,q,ans;
    if(kind==="easy"){
      a=rnd(2,18); b=rnd(1,Math.max(1,18-a));
      if(Math.random()<0.5){ q=a+" + "+b; ans=a+b; }
      else { if(b>a){var t=a;a=b;b=t;} q=a+" − "+b; ans=a-b; }
    } else if(kind==="times"){ a=rnd(2,10); b=rnd(2,10); q=a+" × "+b; ans=a*b; }
    else { var r=Math.random();
      if(r<0.34){ a=rnd(3,12); b=rnd(3,12); q=a+" × "+b; ans=a*b; }
      else if(r<0.67){ b=rnd(2,12); ans=rnd(2,12); q=(b*ans)+" ÷ "+b; }
      else { a=rnd(21,89); b=rnd(11,49); q=a+" + "+b; ans=a+b; } }
    o.push({k:"math",q:q,a:String(ans)});
  }
  return o;
}

/* ==========================================================================
   QUIZ
   ========================================================================== */
function start(code){
  var p=code.split("|"), items, subject, test, lang="en-GB";
  if(p[0]==="en"){ subject="English"; test="Spelling "+p[1];
    items=TC_SPELL[p[1]][1].map(function(x){ return {k:x[0],s:x[1],a:x[2]}; }); }
  else if(p[0]==="es"){ subject="English"; test=p[1];
    items=SC_SPELL[p[1]][1].map(function(x){ return {k:x[0],s:x[1],a:x[2]}; }); }
  else if(p[0]==="zh"){ subject="华文"; test=p[1]; lang="zh-CN";
    var bank=who()==="tc"?TC_PINYIN:SC_TINGXIE;
    items=bank[p[1]].slice().sort(function(){ return Math.random()-0.5; })
      .map(function(x){ return {k:"py",h:x[0],word:x[1],a:x[2],tone:x[3],m:x[4]}; }); }
  else { subject="Math";
    test="Math · "+(p[1]==="easy"?"Warm up":p[1]==="times"?"Times tables":"Challenge");
    items=mathItems(p[1]); }
  quiz={code:code,subject:subject,test:test,lang:lang,items:items,
        i:0,score:0,missed:[],graded:false,done:false};
  render(); scrollTo(0,0);
}
function clean(s){ return String(s||"").toLowerCase()
  .replace(/[.,!?;:'"\u2018\u2019\u201c\u201d]/g,"").replace(/\s+/g," ").trim(); }
function ltRow(t,g){ var h='<div class="lts">';
  t.split("").forEach(function(c,k){
    var ok=g[k]!==undefined&&g[k].toLowerCase()===c.toLowerCase();
    h+='<span class="lt '+(ok?"h":"s")+'">'+(c===" "?"&nbsp;":c)+'</span>'; });
  return h+'</div>'; }

function quizHTML(){
  var q=quiz, it=q.items[q.i];
  if(q.done) return doneHTML();
  var s='<div class="panel"><div class="qtop">'+
    '<button class="btn soft" id="qB">&larr; Back</button>'+
    '<span class="sc">'+esc(q.test)+' · '+q.score+'/'+q.i+'</span></div>'+
    '<div class="meter"><i style="width:'+(q.i/q.items.length*100)+'%"></i></div>'+
    '<div class="kind">'+(it.k==="py"?"听写":it.k==="dict"?"Dictation":it.k==="math"?"Question":"Spelling")+
      ' '+(q.i+1)+' of '+q.items.length+'</div>';
  if(it.k==="py"){
    s+='<div class="hz'+(q.graded?"":" q")+'">'+(q.graded?it.h:"?")+'</div>'+
       '<div class="ctx">'+(q.graded?esc(it.word):"Listen, then write the pinyin")+'</div>'+
       '<button class="btn play wide" id="qP">🔊 Hear the word</button>'+
       '<div class="pair"><span class="f1"><div class="lbl">Pinyin</div>'+
       '<input type="text" id="qa" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="yong"></span>'+
       '<span class="f2"><div class="lbl">Tone</div>'+
       '<input type="text" id="qt" inputmode="numeric" maxlength="1" placeholder="1-4"></span></div>';
  } else if(it.k==="math"){
    s+='<div class="qq">'+it.q+' = ?</div>'+
       '<input type="text" id="qa" inputmode="numeric" autocomplete="off" placeholder="Answer">';
  } else {
    s+='<div class="qq">'+(it.k==="dict"?"Write the sentence":"Spell the word")+'</div>'+
       '<div class="tip">Word, then the sentence, then the word again.</div>'+
       '<button class="btn play wide" id="qP">🔊 Play</button>'+
       (it.k==="dict"
        ? '<textarea id="qa" spellcheck="false" placeholder="Type the whole sentence" style="margin-top:12px"></textarea>'
        : '<input type="text" id="qa" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Type here" style="margin-top:12px">');
  }
  return s+'<div class="btnrow"><button class="btn go" id="qG">Check</button></div><div id="qf"></div></div>';
}
function wireQuiz(){
  var q=quiz;
  if(q.done){
    document.getElementById("dBack").onclick=function(){ go("tests"); };
    document.getElementById("dAgain").onclick=function(){ hush(); start(q.code); };
    return;
  }
  var it=q.items[q.i];
  document.getElementById("qB").onclick=function(){ go("tests"); };
  var p=document.getElementById("qP"); if(p) p.onclick=function(){ speakIt(it); };
  var g=document.getElementById("qG");
  g.onclick=function(){ q.graded?next():grade(); };
  var a=document.getElementById("qa");
  a.addEventListener("keydown",function(e){ if(e.key==="Enter"&&it.k!=="dict"){ e.preventDefault(); g.click(); } });
  var t=document.getElementById("qt");
  if(t) t.addEventListener("keydown",function(e){ if(e.key==="Enter"){ e.preventDefault(); g.click(); } });
  if(!q.graded){ a.focus(); if(it.k!=="math") setTimeout(function(){ speakIt(it); },250); }
}
function speakIt(it){
  hush();
  if(it.k==="py"){ say(it.word,0.62,"zh-CN"); setTimeout(function(){ say(it.h,0.55,"zh-CN"); },1100); }
  else if(it.k==="dict"){ say("Write this sentence.",0.92); say(it.s,0.8); say("Once more.",0.92); say(it.s,0.72); }
  else { say("Spell,",0.92); say(it.a+".",0.76); say(it.s,0.86); say(it.a+".",0.7); }
}
function grade(){
  var q=quiz, it=q.items[q.i], given=document.getElementById("qa").value, right, detail="";
  if(it.k==="py"){
    var tn=(document.getElementById("qt")||{value:""}).value.trim();
    var pOK=clean(given)===clean(it.a), tOK=!it.tone||tn===it.tone;
    right=pOK&&tOK;
    detail='<b style="font-size:23px">'+it.h+'</b> &nbsp; '+esc(it.word)+'<br>'+
      (pOK?"Pinyin ✓":"Pinyin ✗ → <b>"+esc(it.a)+"</b>")+
      (it.tone?(" &nbsp;·&nbsp; "+(tOK?"Tone ✓":"Tone ✗ → <b>"+it.tone+"</b>")):"")+
      '<br>'+esc(it.m);
  } else if(it.k==="math"){
    right=clean(given)===it.a;
    if(!right) detail=it.q+' = <b>'+it.a+'</b>';
  } else { right=clean(given)===clean(it.a); detail=ltRow(it.a,given); }

  if(right) q.score++;
  else q.missed.push(it.k==="py"?it.h+" ("+it.a+(it.tone||"")+")":it.k==="math"?it.q:it.a);
  q.graded=true;
  render();
  var a=document.getElementById("qa"); a.value=given; a.disabled=true;
  if(document.getElementById("qt")) document.getElementById("qt").disabled=true;
  document.getElementById("qf").innerHTML='<div class="fb '+(right?"ok":"no")+'">'+
    '<span class="big">'+(right?"Correct":"Not quite")+'</span>'+detail+'</div>';
  document.getElementById("qG").textContent=(q.i===q.items.length-1)?"See the score":"Next";
  hush();
  if(right) say("Correct.",0.95);
  else if(it.k==="py") say(it.word,0.55,"zh-CN");
  else if(it.k!=="math") say(it.a,0.6);
}
function next(){
  var q=quiz; q.i++; q.graded=false;
  if(q.i>=q.items.length){ q.done=true;
    addResult({who:who(),subject:q.subject,test:q.test,score:q.score,
               total:q.items.length,missed:q.missed,ts:Date.now()}); }
  render(); scrollTo(0,0);
}
function doneHTML(){
  var q=quiz, p=q.score/q.items.length;
  var st=p===1?"★★★":p>=.8?"★★☆":p>=.5?"★☆☆":"☆☆☆";
  var rk=p===1?"Full marks!":p>=.8?"Very good":p>=.5?"Getting there":"Worth another go";
  if(!q.cheered){ q.cheered=true; say(p>=0.8?"Well done!":"Good effort. Try again.",0.95); }
  return '<div class="panel done"><div class="kind">'+esc(q.test)+'</div>'+
    '<div class="big">'+q.score+' / '+q.items.length+'</div><div class="st">'+st+'</div>'+
    '<div class="rk">'+rk+'</div>'+
    (q.missed.length?'<div class="again">Practise again: <b>'+esc(q.missed.join(", "))+'</b></div>':'')+
    '<div class="btnrow"><button class="btn soft" id="dBack">Back to tests</button>'+
    '<button class="btn go" id="dAgain">Try again</button></div></div>';
}

/* ==========================================================================
   RESULTS
   ========================================================================== */
function vResults(){
  var s="";
  KIDS.forEach(function(k){
    var runs=runsFor(k.id);
    s+='<div class="panel"><h2>'+esc(pname(k.id))+
       '<span class="side">'+runs.length+(runs.length===1?" test":" tests")+'</span></h2>';
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

/* ==========================================================================
   SCHOOL TIMETABLE
   ========================================================================== */
function vSchool(){
  var s='<div class="panel"><h2><span class="em">🏫</span> School week'+
        '<span class="side">'+esc(pname("tc"))+'</span></h2>';
  ["Monday","Tuesday","Wednesday","Thursday","Friday"].forEach(function(d,i){
    s+='<div class="day'+(i===todayIdx()?" now":"")+'"><span class="d">'+d.slice(0,3)+'</span>'+
      '<span class="slots">'+TIMETABLE[d].map(function(x){
        var c=x==="Recess"?"rec":x==="CL"?"cl":(["MA","EL"].indexOf(x)>=0?"":"o");
        return '<span class="slot '+c+'">'+x+'</span>'; }).join("")+'</span></div>';
  });
  return s+'<div class="key">'+TT_KEY+'</div></div>';
}
function wSchool(){}

seedOnce();
render();
