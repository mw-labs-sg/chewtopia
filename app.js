/* ==========================================================================
   CHEWTOPIA — everything is stored on the device, nothing is sent anywhere.

   WHERE TO EDIT:
     TESTS.tc / TESTS.sc   → the tests for each child
     TIMETABLE             → the school timetable
     MEALS_DEFAULT         → the usual dinner plan
   ========================================================================== */

function S(k,d){ try{ var v=localStorage.getItem("chew:"+k); return v===null?d:v; }catch(e){ return d; } }
function W(k,v){ try{ localStorage.setItem("chew:"+k,v); }catch(e){} }
function SJ(k,d){ try{ var v=JSON.parse(localStorage.getItem("chew:"+k)); return (v===null||v===undefined)?d:v; }catch(e){ return d; } }
function WJ(k,v){ W(k, JSON.stringify(v)); }

/* ---------- the two players ---------- */
var KIDS = [
  {id:"tc", init:"TC", level:"Primary 2"},
  {id:"sc", init:"SC", level:"Kindergarten"}
];
function pname(id){ var k=KIDS.filter(function(x){return x.id===id;})[0]; return S("name:"+id, k.init); }
function who(){ return S("who","tc"); }

/* ==========================================================================
   CONTENT
   ========================================================================== */

/* --- TC, Primary 2 --- */
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

var DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
var TABS = [
  ["home","Home"],["events","Events"],["timetable","Timetable"],["meals","Meals"],
  ["english","English"],["chinese","华文"],["math","Math"],["results","Results"]
];

var tab="home", quiz=null;
function go(id){ tab=id; quiz=null; hush(); render(); scrollTo(0,0); }

/* ==========================================================================
   helpers
   ========================================================================== */
function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function todayIdx(){ return (new Date().getDay()+6)%7; }
function monKey(){ var d=new Date(); d.setDate(d.getDate()-todayIdx());
  return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); }
function weekDates(){ var d=new Date(); d.setDate(d.getDate()-todayIdx());
  return DAYS.map(function(_,i){ var x=new Date(d); x.setDate(d.getDate()+i); return x; }); }
function daysTo(iso){ var t=new Date(); t.setHours(0,0,0,0);
  return Math.round((new Date(iso+"T00:00:00")-t)/86400000); }
function whenLbl(n){ return n===0?"Today":n===1?"Tomorrow":"in "+n+" days"; }
function evState(e){
  var a = daysTo(e.d), b = e.d2 ? daysTo(e.d2) : a;
  return {start:a, end:b, live:(a<=0 && b>=0), gone:(b<0)};
}
function evWhen(e){
  var st = evState(e);
  if(st.live) return e.d2 ? "On now" : "Today";
  return whenLbl(st.start);
}
function dnum(iso){ return new Date(iso+"T00:00:00").getDate(); }
function dmon(iso){ return new Date(iso+"T00:00:00").toLocaleDateString("en-GB",{month:"short"}); }
function evDates(e){
  if(!e.d2) return dnum(e.d)+" "+dmon(e.d);
  return dmon(e.d)===dmon(e.d2)
    ? dnum(e.d)+"–"+dnum(e.d2)+" "+dmon(e.d)
    : dnum(e.d)+" "+dmon(e.d)+" – "+dnum(e.d2)+" "+dmon(e.d2);
}
var ft={};
function flash(id){ var e=document.getElementById(id); if(!e) return;
  e.textContent="Saved"; clearTimeout(ft[id]); ft[id]=setTimeout(function(){e.textContent="";},1100); }

function results(){ return SJ("results",[]); }
function addResult(r){ var a=results(); a.unshift(r); WJ("results",a.slice(0,600)); }
function runsFor(id){ return results().filter(function(r){ return r.who===(id||who()); })
  .slice().sort(function(a,b){ return a.ts-b.ts; }); }
function lastFor(test){ var a=runsFor().filter(function(r){ return r.test===test; });
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
  u.rate=rate||0.85; u.pitch=1.05;
  speechSynthesis.speak(u);
}
function hush(){ try{ speechSynthesis.cancel(); }catch(e){} }
function voiceBox(lang){
  if(!voices.length) loadVoices();
  var opts=voices.filter(function(v){ return v.lang&&v.lang.replace("_","-").indexOf(lang.split("-")[0])===0; });
  if(!opts.length) return '<p class="empty">This device has no '+(lang==="zh-CN"?"Chinese":"English")+' voice installed.</p>';
  var cur=bestVoice(lang), h='<div class="lbl">Teacher voice</div><select id="vp">';
  opts.forEach(function(v){ h+='<option value="'+esc(v.name)+'"'+(cur&&v.name===cur.name?" selected":"")+'>'+esc(v.name)+'</option>'; });
  return h+'</select>';
}
function wireVoice(lang){
  var e=document.getElementById("vp"); if(!e) return;
  e.onchange=function(){ W("voice:"+lang,e.value);
    say(lang==="zh-CN"?"你好，我是老师。":"Hello, I am your teacher.",0.85,lang); };
}

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
      if(k.id===who()){
        var n2=prompt("Name for this player (kept on this device only)",pname(k.id));
        if(n2&&n2.trim()) W("name:"+k.id,n2.trim().slice(0,16));
      } else W("who",k.id);
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
  var views={home:vHome,events:vEvents,timetable:vTime,meals:vMeals,
             english:vEnglish,chinese:vChinese,math:vMath,results:vResults};
  var wires={home:wHome,events:wEvents,timetable:wTime,meals:wMeals,
             english:wTests,chinese:wTests,math:wTests,results:wResults};
  v.innerHTML=views[tab]();
  wires[tab]();
}

/* ---------- home ---------- */
function vHome(){
  var evs=SJ("events",[]).filter(function(e){ return !evState(e).gone; })
    .sort(function(a,b){ return evState(a).start-evState(b).start; }).slice(0,4);
  var s='<div class="up"><div class="t">Coming up</div>';
  if(evs.length) evs.forEach(function(e){
    s+='<div class="r"><span class="w">'+evWhen(e)+'</span><span>'+esc(e.t)+
       (e.w?' <b style="color:var(--blue)">'+esc(pname(e.w))+'</b>':'')+'</span></div>'; });
  else s+='<div class="none">Nothing yet. Add the next test under Events.</div>';
  s+='</div>';

  return s+'<div class="tiles">'+
    tl("t1","🔤","English","Spelling tests","english")+
    tl("t2","汉","华文","听写 &amp; 拼音","chinese")+
    tl("t3","🔢","Math","Number drills","math")+
    tl("t4","🧪","Results","Who is improving","results")+
  '</div><div class="tiles" style="margin-top:10px">'+
    tl("t2","📅","Events","Tests and birthdays","events")+
    tl("t1","🏫","Timetable","School week","timetable")+
    tl("t3","🍜","Meals","Dinner plan","meals")+
    tl("t4","🏆","Badges","What you unlocked","results")+
  '</div>';
}
function tl(c,i,n,s,g){
  return '<button class="tile '+c+'" data-go="'+g+'"><span class="ico">'+i+'</span>'+
    '<span class="nm">'+n+'</span><span class="sb">'+s+'</span></button>';
}
function wHome(){ document.querySelectorAll("[data-go]").forEach(function(b){
  b.onclick=function(){ go(b.dataset.go); }; }); }

/* ---------- events ---------- */
function vEvents(){
  var l=SJ("events",[]).filter(function(e){ return !evState(e).gone; })
        .sort(function(a,b){ return evState(a).start-evState(b).start; });
  var rows=l.map(function(e){
    var st=evState(e);
    return '<div class="ev'+((st.live||st.start<=2)?" soon":"")+'">'+
      '<span class="cd"><b>'+dnum(e.d)+(e.d2?'–'+dnum(e.d2):'')+'</b><i>'+dmon(e.d)+'</i></span>'+
      '<span class="tx">'+esc(e.t)+'<small>'+evWhen(e)+' · '+evDates(e)+
        (e.w?' · '+esc(pname(e.w)):'')+'</small></span>'+
      '<button class="x" data-del="'+e.id+'">&times;</button></div>';
  }).join("");
  var opts='<option value="">Everyone</option>'+
    KIDS.map(function(k){ return '<option value="'+k.id+'"'+(k.id===who()?" selected":"")+'>'+esc(pname(k.id))+'</option>'; }).join("");
  return '<div class="panel"><h2>Coming up</h2><p class="lead">Tests, birthdays, trips</p>'+
    (rows||'<p class="empty">Nothing yet.</p>')+'</div>'+
    '<div class="panel"><h2>Add something</h2>'+
    '<div class="lbl">What</div><input type="text" id="eT" maxlength="60" placeholder="华文听写 Week 6">'+
    '<div class="lbl">When</div><input type="date" id="eD">'+
    '<div class="lbl">Until (only for trips)</div><input type="date" id="eD2">'+
    '<div class="lbl">Who</div><select id="eW">'+opts+'</select>'+
    '<div class="btnrow"><button class="btn go" id="eAdd">Add</button></div></div>';
}
function wEvents(){
  document.getElementById("eAdd").onclick=function(){
    var t=document.getElementById("eT").value.trim(), d=document.getElementById("eD").value;
    if(!t||!d){ alert("Needs a name and a date."); return; }
    var d2=document.getElementById("eD2").value;
    var a=SJ("events",[]);
    var rec={id:Date.now()+"",t:t.slice(0,60),d:d,w:document.getElementById("eW").value};
    if(d2 && d2>=d) rec.d2=d2;
    a.push(rec);
    WJ("events",a); render();
  };
  document.querySelectorAll("[data-del]").forEach(function(b){
    b.onclick=function(){ WJ("events",SJ("events",[]).filter(function(e){return e.id!==b.dataset.del;})); render(); };
  });
}

/* ---------- timetable ---------- */
function vTime(){
  var s='<div class="panel"><h2>School week</h2><p class="lead">'+esc(pname("tc"))+' · Primary 2</p>';
  ["Monday","Tuesday","Wednesday","Thursday","Friday"].forEach(function(d,i){
    s+='<div class="tt'+(i===todayIdx()?" now":"")+'"><div class="day">'+d+'</div><div class="slots">'+
      TIMETABLE[d].map(function(x){
        var c = x==="Recess" ? "rec" : x==="CL" ? "cl" :
                (["MA","EL"].indexOf(x)>=0 ? "" : "other");
        return '<span class="slot '+c+'">'+x+'</span>';
      }).join("")+'</div></div>';
  });
  s+='<div class="key">'+TT_KEY+'</div></div>';

  var sch=SJ("sched:"+who(),{});
  s+='<div class="panel"><h2>After school</h2><p class="lead">Weekly routine for '+esc(pname(who()))+'</p>';
  DAYS.forEach(function(d,i){
    s+='<div class="r2'+(i===todayIdx()?" now":"")+'"><span class="d">'+d.slice(0,3)+'</span>'+
      '<input type="text" data-day="'+d+'" value="'+esc(sch[d]||"")+'" placeholder="Swimming 4pm"></div>';
  });
  return s+'<div class="saved" id="schS"></div></div>';
}
function wTime(){
  document.querySelectorAll("[data-day]").forEach(function(i){
    i.oninput=function(){ var s=SJ("sched:"+who(),{}); s[i.dataset.day]=i.value;
      WJ("sched:"+who(),s); flash("schS"); };
  });
}

/* ---------- meals ---------- */
function vMeals(){
  var m=SJ("meals:"+monKey(),null)||MEALS_DEFAULT, dt=weekDates();
  var s='<div class="panel"><h2>Dinner this week</h2><p class="lead">Edit anything; it saves as you type</p>';
  DAYS.forEach(function(d,i){
    s+='<div class="r2'+(i===todayIdx()?" now":"")+'"><span class="d">'+d.slice(0,3)+
      '<small>'+dt[i].getDate()+'</small></span>'+
      '<textarea data-meal="'+d+'" placeholder="Dinner">'+esc(m[d]||"")+'</textarea></div>';
  });
  s+='<div class="btnrow"><button class="btn mini" id="mR">Back to the usual plan</button></div>'+
     '<div class="saved" id="mS"></div></div>'+
     '<div class="panel"><h2>Groceries</h2><textarea id="gr" style="min-height:130px" '+
     'placeholder="Codfish&#10;Salmon&#10;Pork belly">'+esc(S("groc:"+monKey(),""))+'</textarea>'+
     '<div class="saved" id="gS"></div></div>';
  return s;
}
function wMeals(){
  document.querySelectorAll("[data-meal]").forEach(function(t){
    t.oninput=function(){ var m=SJ("meals:"+monKey(),null)||JSON.parse(JSON.stringify(MEALS_DEFAULT));
      m[t.dataset.meal]=t.value; WJ("meals:"+monKey(),m); flash("mS"); };
  });
  document.getElementById("mR").onclick=function(){
    if(confirm("Replace this week's dinners with the usual plan?")){ WJ("meals:"+monKey(),MEALS_DEFAULT); render(); } };
  var g=document.getElementById("gr");
  g.oninput=function(){ W("groc:"+monKey(),g.value); flash("gS"); };
}

/* ---------- subject menus ---------- */
function vEnglish(){
  var s="";
  if(who()==="tc"){
    var units={};
    Object.keys(TC_SPELL).forEach(function(k){ (units[TC_SPELL[k][0]]=units[TC_SPELL[k][0]]||[]).push(k); });
    Object.keys(units).forEach(function(u){
      s+='<div class="panel"><h2>'+u+'</h2><p class="lead">Listen, then type the word. Starred sentences are dictation.</p>';
      units[u].forEach(function(k){
        s+='<button class="test" data-t="en|'+k+'"><span><span class="nm">List '+k+'</span>'+
          '<span class="mt">'+TC_SPELL[k][1].length+' questions</span></span>'+pill(lastFor("Spelling "+k))+'</button>';
      });
      s+='</div>';
    });
  } else {
    s+='<div class="panel"><h2>English Spelling</h2><p class="lead">K2 · Term 3</p>';
    Object.keys(SC_SPELL).forEach(function(k){
      s+='<button class="test" data-t="es|'+k+'"><span><span class="nm">'+k+'</span>'+
        '<span class="mt">'+SC_SPELL[k][1].length+' questions</span></span>'+pill(lastFor(k))+'</button>';
    });
    s+='</div>';
  }
  return s+'<div class="panel">'+voiceBox("en-GB")+
    '<p class="lead" style="margin:9px 0 0">Pick whichever sounds most like a teacher. Changing it plays a sample.</p></div>';
}
function vChinese(){
  var s='<div class="panel"><h2>'+(who()==="tc"?"汉语拼音":"华文听写")+'</h2>'+
        '<p class="lead">You hear the word. Type the pinyin and the tone number — the character stays hidden until you answer.</p>';
  var bank = who()==="tc" ? TC_PINYIN : SC_TINGXIE;
  Object.keys(bank).forEach(function(k){
    s+='<button class="test" data-t="zh|'+k+'"><span><span class="nm">'+k+'</span>'+
      '<span class="mt">'+bank[k].length+' words</span></span>'+pill(lastFor(k))+'</button>';
  });
  return s+'</div><div class="panel">'+voiceBox("zh-CN")+'</div>';
}
function vMath(){
  return '<div class="panel"><h2>Number drills</h2><p class="lead">Ten questions, fresh every time</p>'+
    '<button class="test" data-t="ma|easy"><span><span class="nm">Warm up</span>'+
      '<span class="mt">Add and take away to 20</span></span>'+pill(lastFor("Math · Warm up"))+'</button>'+
    '<button class="test" data-t="ma|times"><span><span class="nm">Times tables</span>'+
      '<span class="mt">2 to 10</span></span>'+pill(lastFor("Math · Times tables"))+'</button>'+
    '<button class="test" data-t="ma|hard"><span><span class="nm">Challenge</span>'+
      '<span class="mt">Bigger numbers and division</span></span>'+pill(lastFor("Math · Challenge"))+'</button></div>';
}
function wTests(){
  document.querySelectorAll("[data-t]").forEach(function(b){ b.onclick=function(){ start(b.dataset.t); }; });
  wireVoice(tab==="chinese"?"zh-CN":"en-GB");
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

/* ---------- quiz ---------- */
function start(code){
  var p=code.split("|"), items, subject, test, lang="en-GB";
  if(p[0]==="en"){
    subject="English"; test="Spelling "+p[1];
    items=TC_SPELL[p[1]][1].map(function(x){ return {k:x[0],s:x[1],a:x[2]}; });
  } else if(p[0]==="es"){
    subject="English"; test=p[1];
    items=SC_SPELL[p[1]][1].map(function(x){ return {k:x[0],s:x[1],a:x[2]}; });
  } else if(p[0]==="zh"){
    subject="华文"; test=p[1]; lang="zh-CN";
    var bank = who()==="tc" ? TC_PINYIN : SC_TINGXIE;
    items = bank[p[1]].slice().sort(function(){ return Math.random()-0.5; })
      .map(function(x){ return {k:"py",h:x[0],word:x[1],a:x[2],tone:x[3],m:x[4]}; });
  } else {
    subject="Math"; test="Math · "+(p[1]==="easy"?"Warm up":p[1]==="times"?"Times tables":"Challenge");
    items=mathItems(p[1]);
  }
  quiz={code:code,subject:subject,test:test,lang:lang,items:items,i:0,score:0,missed:[],graded:false,done:false};
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
    '<button class="btn mini" id="qB">&larr; Back</button>'+
    '<span class="sc">'+esc(q.test)+' · '+q.score+'/'+q.i+'</span></div>'+
    '<div class="meter"><i style="width:'+(q.i/q.items.length*100)+'%"></i></div>'+
    '<div class="kind">'+(it.k==="py"?"听写":it.k==="dict"?"Dictation":it.k==="math"?"Question":"Spelling")+
      ' '+(q.i+1)+' of '+q.items.length+'</div>';

  if(it.k==="py"){
    s+='<div class="hz'+(q.graded?"":" q")+'">'+(q.graded?it.h:"?")+'</div>'+
       '<div class="ctx">'+(q.graded?esc(it.word):"Listen, then write the pinyin")+'</div>'+
       '<button class="btn play" id="qP">🔊 Hear the word</button>'+
       '<div class="pair"><span class="f1"><span class="lbl">Pinyin</span>'+
       '<input type="text" id="qa" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="yong"></span>'+
       '<span class="f2"><span class="lbl">Tone</span>'+
       '<input type="text" id="qt" inputmode="numeric" maxlength="1" placeholder="1-4"></span></div>';
  } else if(it.k==="math"){
    s+='<div class="qq">'+it.q+' = ?</div>'+
       '<input type="text" id="qa" inputmode="numeric" autocomplete="off" placeholder="Answer">';
  } else {
    s+='<div class="qq">'+(it.k==="dict"?"Write the sentence":"Spell the word")+'</div>'+
       '<div class="tip">Tap play. You hear the word, then the sentence, then the word again.</div>'+
       '<button class="btn play" id="qP">🔊 Play</button>'+
       (it.k==="dict"
         ? '<textarea id="qa" spellcheck="false" placeholder="Type the whole sentence" style="margin-top:11px"></textarea>'
         : '<input type="text" id="qa" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Type here" style="margin-top:11px">');
  }
  return s+'<div class="btnrow"><button class="btn go" id="qG">Check</button></div><div id="qf"></div></div>';
}

function wireQuiz(){
  var q=quiz;
  if(q.done){
    document.getElementById("dBack").onclick=function(){ go(q.subject==="Math"?"math":q.subject==="华文"?"chinese":"english"); };
    document.getElementById("dAgain").onclick=function(){ hush(); start(q.code); };
    return;
  }
  var it=q.items[q.i];
  document.getElementById("qB").onclick=function(){ go(tab); };
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
  if(it.k==="py"){
    say(it.word,0.62,"zh-CN");
    setTimeout(function(){ say(it.h,0.55,"zh-CN"); },1100);
  } else if(it.k==="dict"){
    say("Write this sentence.",0.92); say(it.s,0.8); say("Once more.",0.92); say(it.s,0.72);
  } else {
    say("Spell,",0.92); say(it.a+".",0.76); say(it.s,0.86); say(it.a+".",0.7);
  }
}

function grade(){
  var q=quiz, it=q.items[q.i], given=document.getElementById("qa").value, right, detail="";
  if(it.k==="py"){
    var tn=(document.getElementById("qt")||{value:""}).value.trim();
    var pOK=clean(given).replace(/\s+/g," ")===clean(it.a);
    var tOK=!it.tone || tn===it.tone;
    right=pOK&&tOK;
    detail='<b style="font-size:22px">'+it.h+'</b> &nbsp; '+esc(it.word)+'<br>'+
      (pOK?"Pinyin ✓":"Pinyin ✗ → <b>"+esc(it.a)+"</b>")+
      (it.tone?(" &nbsp;·&nbsp; "+(tOK?"Tone ✓":"Tone ✗ → <b>"+it.tone+"</b>")):"")+
      '<br>'+esc(it.m);
  } else if(it.k==="math"){
    right=clean(given)===it.a;
    if(!right) detail=it.q+' = <b>'+it.a+'</b>';
  } else {
    right=clean(given)===clean(it.a);
    detail=ltRow(it.a,given);
  }

  if(right) q.score++;
  else q.missed.push(it.k==="py" ? it.h+" ("+it.a+(it.tone||"")+")" : it.k==="math" ? it.q : it.a);

  q.graded=true;
  render();
  document.getElementById("qa").value=given;
  document.getElementById("qa").disabled=true;
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
  if(q.i>=q.items.length){
    q.done=true;
    addResult({who:who(),subject:q.subject,test:q.test,score:q.score,
               total:q.items.length,missed:q.missed,ts:Date.now()});
  }
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
    '<div class="btnrow"><button class="btn mini" id="dBack">Back to the list</button>'+
    '<button class="btn go" id="dAgain">Try again</button></div></div>';
}

/* ---------- results ---------- */
function vResults(){
  var s="";
  KIDS.forEach(function(k){
    var runs=runsFor(k.id);
    s+='<div class="panel"><h2>'+esc(pname(k.id))+'</h2>';
    if(!runs.length){ s+='<p class="empty">No finished tests yet.</p></div>'; return; }
    var xp=runs.reduce(function(t,r){ return t+r.score*10; },0);
    s+='<p class="lead">'+runs.length+' tests · '+xp+' XP · level '+(Math.floor(xp/300)+1)+'</p>';

    var latest={},subj={};
    runs.forEach(function(r){ latest[r.test]=r; });
    Object.keys(latest).forEach(function(t){ var r=latest[t];
      subj[r.subject]=subj[r.subject]||{g:0,m:0};
      subj[r.subject].g+=r.score; subj[r.subject].m+=r.total; });
    s+='<div class="bars">';
    Object.keys(subj).forEach(function(x){
      var p=Math.round(subj[x].g/subj[x].m*100), c=p>=80?"":p>=50?"mid":"low";
      s+='<div class="brow"><span class="n">'+esc(x)+'</span><span class="bar">'+
         '<i class="'+c+'" style="width:'+p+'%"></i></span><span class="p">'+p+'%</span></div>'; });
    s+='</div>';

    var tests=[]; runs.forEach(function(r){ if(tests.indexOf(r.test)<0) tests.push(r.test); });
    tests.forEach(function(t){
      var a=runs.filter(function(r){ return r.test===t; });
      var f=a[0], l=a[a.length-1], b=a.reduce(function(x,y){ return y.score>x.score?y:x; },a[0]);
      var mv=l.score-f.score;
      var tr=a.length<2?'<span class="tr fl">First try</span>'
            :mv>0?'<span class="tr up">▲ up '+mv+'</span>'
            :mv<0?'<span class="tr dn">▼ down '+Math.abs(mv)+'</span>'
            :'<span class="tr fl">no change</span>';
      var ch=a.map(function(r,n){
        var p=Math.round(r.score/r.total*100), c=p>=80?"good":p>=50?"mid":"low";
        return (n?'<span class="arw">→</span>':'')+'<span class="run '+c+'"><b>'+r.score+'/'+r.total+
          '</b><i>'+new Date(r.ts).toLocaleDateString("en-GB",{day:"numeric",month:"short"})+'</i></span>';
      }).join("");
      s+='<div class="rr"><div class="rh"><span class="n">'+esc(t)+'</span>'+tr+
         '<span class="best">Best '+b.score+'/'+b.total+'</span></div><div class="rl">'+ch+'</div></div>';
    });
    s+='</div>';
  });
  return s+'<div class="panel"><h2>Housekeeping</h2><p class="lead">Scores live on this device only</p>'+
    '<div class="btnrow"><button class="btn mini" id="wipe">Clear all scores</button></div></div>';
}
function wResults(){
  document.getElementById("wipe").onclick=function(){
    if(confirm("Delete every saved score on this device?")){ WJ("results",[]); render(); } };
}

seedOnce();
render();
