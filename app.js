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
/* School timetable. Each entry is [start, end, subject].
   Times come from the printed timetable — check them against the original. */
var TIMES = ["7:30","8:00","8:30","9:00","9:30","10:00","10:30",
             "11:00","11:30","12:00","12:30","13:00","13:30","14:15"];
var TIMETABLE = {
  Monday: [
    ["7:30","8:00","MA"], ["8:00","8:30","CL"], ["8:30","9:30","CL"],
    ["10:00","10:30","Recess"], ["10:30","11:00","LSP"],
    ["11:00","12:30","PAL"], ["12:30","13:30","EL"]
  ],
  Tuesday: [
    ["7:30","8:00","MA"], ["8:00","9:00","ART"], ["9:00","9:30","CL"],
    ["10:00","10:30","Recess"], ["10:30","11:30","CL"], ["11:30","12:00","LSP"],
    ["12:00","13:00","EL"], ["13:00","13:30","PE"]
  ],
  Wednesday: [
    ["7:30","8:00","LSP"], ["8:00","8:30","EL"], ["8:30","9:30","CCE"],
    ["10:00","10:30","Recess"], ["10:30","11:30","CL"],
    ["11:30","12:30","MA"], ["12:30","13:30","FTGP"]
  ],
  Thursday: [
    ["7:30","8:00","LSP"], ["8:00","9:00","CL"], ["9:30","10:00","Assembly"],
    ["10:00","10:30","Recess"], ["10:30","11:30","MA"], ["11:30","12:00","PE"],
    ["12:00","12:30","EL"], ["13:00","13:30","SS"]
  ],
  Friday: [
    ["7:30","8:00","MA"], ["8:00","8:30","MUSIC"], ["8:30","9:30","EL"],
    ["10:00","10:30","Recess"], ["10:30","11:00","LSP"], ["11:00","12:00","CL"],
    ["12:00","12:30","PE"], ["12:30","13:00","CL"]
  ]
};
/* One timetable per child. SC is in kindergarten — put the hours here
   when you have them and they will appear on the Schedule automatically. */
var TIMETABLES = { tc: TIMETABLE, sc: null };

var TT_KEY = "MA maths · CL 华文 · EL English · SS social studies · " +
             "LSP learning support · PAL active learning · " +
             "CCE character &amp; citizenship · FTGP form teacher time";

var MEALS_DEFAULT = {
  Monday:"Steamed codfish with ginger, spring onion, light soy\nSunny-side eggs for the boys\nStir-fried mixed vegetables\nLong bean + black fungus, minced pork, chilli & peppercorn",
  Tuesday:"Salmon rice\nChicken fillet salad (adults)\nSoup",
  Wednesday:"Garlic prawns\nBraised pork belly with carrot, potato & egg\nBlanched vegetables with fried shallots\nSteamed otah",
  Thursday:"Macaroni soup with minced beef",
  Friday:"Beef burger, caramelised onion, cheese, fried egg\nBlanched vegetables on the side",
  Saturday:"", Sunday:""
};

/* Test dates and family events, loaded on first open only.
   Delete any of them in the app and they stay deleted. */
var SEED_EVENTS = [
  {id:"e1", t:"Spelling test",  d:"2026-07-28", w:"tc"},
  {id:"e2", t:"华文听写",        d:"2026-07-30", w:"tc"},
  {id:"e3", t:"Hai Di Lao",     d:"2026-08-01", w:"sc"},
  {id:"e4", t:"华文听写",        d:"2026-08-06", w:"sc"},
  {id:"e5", t:"Birthday party", d:"2026-08-08", w:"sc"},
  {id:"e6", t:"Spelling test",  d:"2026-08-12", w:"sc"},
  {id:"e7", t:"Chiang Mai",     d:"2026-09-04", d2:"2026-09-07"}
];
var SEED_ACTS = [
  {id:"a1", who:"all", day:"Saturday", from:"08:00", to:"10:00", t:"Berries"},
  {id:"a2", who:"all", day:"Sunday",   from:"09:00", to:"11:00", t:"Coach Lee"}
];
function seedOnce(){
  /* Bump this string to reload the lists below and clear the old ones. */
  if(S("seed","")==="v3") return;
  WJ("events", SEED_EVENTS.slice());
  WJ("acts",   SEED_ACTS.slice());
  W("seed","v3");
}

var DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
var TABS = [["home","Upcoming"],["schedule","Schedule"],["meals","Meals"],["practice","Practice"],["results","Results"]];
var tab="home", quiz=null, showAdd=false;
function go(id){ tab=id; quiz=null; showAdd=false; hush(); render(); scrollTo(0,0); }

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
/* Voice ranking. Modern neural voices first, then known female names.
   Windows' old SAPI voices (Zira, David, Hazel) are pushed to the bottom. */
var NEURAL=/natural|online|google|siri|premium|enhanced/i;
var FEM=/samantha|serena|sonia|libby|maisie|aria|jenny|ava|allison|susan|kate|karen|moira|tessa|fiona|martha|female|woman|xiaoxiao|huihui|tingting|meijia|sinji|yaoyao|lili/i;
var OLD=/zira|david|hazel|mark|george|james|ravi|desktop/i;

function voiceScore(v){
  var n=v.name||"", x=0;
  if(NEURAL.test(n)) x+=100;
  if(FEM.test(n))    x+=40;
  if(OLD.test(n))    x-=60;
  return x;
}
function langVoices(lang){
  if(!voices.length) loadVoices();
  var base=lang.split("-")[0];
  return voices.filter(function(v){
    return v.lang && v.lang.replace("_","-").toLowerCase().indexOf(base)===0;
  }).sort(function(x,y){
    var d=voiceScore(y)-voiceScore(x);
    if(d) return d;
    var xe=((x.lang||"").replace("_","-")===lang)?1:0;
    var ye=((y.lang||"").replace("_","-")===lang)?1:0;
    return ye-xe;
  });
}
function bestVoice(lang){
  var saved=S("voice:"+lang,"");
  var hit=voices.filter(function(v){ return v.name===saved; })[0];
  if(hit) return hit;
  return langVoices(lang)[0] || null;
}
function say(t,rate,lang){
  if(!window.speechSynthesis) return;
  lang=lang||"en-GB";
  var u=new SpeechSynthesisUtterance(t), v=bestVoice(lang);
  if(v){ u.voice=v; u.lang=v.lang; } else u.lang=lang;
  var base=parseFloat(S("rate","0.85"));
  if(isNaN(base)) base=0.85;
  u.rate = rate ? Math.max(0.4, Math.min(1.3, rate * (base/0.85))) : base;
  u.pitch=1.05; speechSynthesis.speak(u);
}
function hush(){ try{ speechSynthesis.cancel(); }catch(e){} }
function voiceBox(lang){
  var o=langVoices(lang);
  var label = lang==="zh-CN" ? "Chinese voice" : "English voice";
  if(!o.length) return '<div class="lbl">'+label+'</div>'+
    '<p class="empty">No '+(lang==="zh-CN"?"Chinese":"English")+' voice installed on this device.</p>';
  var cur=bestVoice(lang);
  var h='<div class="lbl">'+label+'</div><select data-voice="'+lang+'">';
  o.forEach(function(v){
    var tag = NEURAL.test(v.name) ? "  ✨" : OLD.test(v.name) ? "  (old)" : "";
    h+='<option value="'+esc(v.name)+'"'+((cur&&v.name===cur.name)?" selected":"")+'>'+
       esc(v.name)+tag+'</option>';
  });
  return h+'</select>';
}
function wireVoices(){
  document.querySelectorAll("[data-voice]").forEach(function(sel){
    sel.onchange=function(){
      var lg=sel.dataset.voice;
      W("voice:"+lg, sel.value);
      say(lg==="zh-CN" ? "你好，我是老师。" : "Hello. I am your teacher.", 0.85, lg);
    };
  });
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
  var V={home:vHome,schedule:vWeek,meals:vMeals,practice:vTests,results:vResults};
  var Wr={home:wHome,schedule:wWeek,meals:wMeals,practice:wTests,results:wResults};
  v.innerHTML=V[tab](); Wr[tab]();
  document.querySelectorAll("textarea.cell").forEach(grow);
}

/* ==========================================================================
   HOME = coming up + schedule + meals
   ========================================================================== */
function vHome(){
  var evs=SJ("events",[]).filter(function(e){ return !evState(e).gone; })
    .sort(function(a,b){ return evState(a).start-evState(b).start; });
  var s='<div class="panel"><h2><span class="em">📅</span> Upcoming</h2>';
  if(evs.length){
    evs.forEach(function(e){
      var st=evState(e);
      s+='<div class="ev'+((st.live||st.start<=2)?" soon":"")+'">'+
        '<span class="cd '+whoCls(e.w)+'"><b>'+dnum(e.d)+(e.d2?"–"+dnum(e.d2):"")+'</b>'+
        '<i>'+dmon(e.d)+'</i></span>'+
        '<span class="tx"><span class="tag '+whoCls(e.w)+'">'+
          (e.w?esc(pname(e.w)):"All")+'</span> '+esc(e.t)+
          '<small>'+evWhen(e)+(e.time?" · "+e.time:"")+'</small></span>'+
        '<button class="x" data-del="'+e.id+'">&times;</button></div>';
    });
  } else s+='<p class="empty">Nothing coming up.</p>';

  if(showAdd){
    var opts='<option value="">Everyone</option>'+KIDS.map(function(k){
      return '<option value="'+k.id+'"'+(k.id===who()?" selected":"")+'>'+esc(pname(k.id))+'</option>'; }).join("");
    s+='<div class="lbl">What</div><input type="text" id="eT" maxlength="60" placeholder="华文听写 Week 6">'+
       '<div class="lbl">When</div><input type="date" id="eD">'+
       '<div class="lbl">Time (optional)</div><input type="time" id="eTm">'+
       '<div class="lbl">Until (trips only)</div><input type="date" id="eD2">'+
       '<div class="lbl">Who</div><select id="eW">'+opts+'</select>'+
       '<div class="btnrow"><button class="btn go" id="eAdd">Add</button>'+
       '<button class="btn soft" id="eCancel">Cancel</button></div>';
  } else s+='<button class="addlink" id="eShow">+ Add something</button>';

  return s+'<div class="key" style="margin-top:14px">'+
    '<span class="dot c-tc"></span> '+esc(pname("tc"))+' &nbsp; '+
    '<span class="dot c-sc"></span> '+esc(pname("sc"))+' &nbsp; '+
    '<span class="dot c-all"></span> Everyone</div></div>';
}

function vMeals(){
  var m=SJ("meals:"+monKey(),null)||MEALS_DEFAULT;
  var dt=weekDates();
  var s='<div class="panel"><h2><span class="em">🍜</span> Dinner this week</h2>';
  DAYS.forEach(function(d,i){
    s+='<div class="mealday'+(i===todayIdx()?" now":"")+'">'+
       '<div class="mh">'+d+' <em>'+dt[i].getDate()+' '+
         dt[i].toLocaleDateString("en-GB",{month:"short"})+'</em></div>'+
       '<textarea class="cell" data-meal="'+d+'" placeholder="—">'+esc(m[d]||"")+'</textarea></div>';
  });
  return s+'<div class="btnrow"><button class="btn soft" id="mR">Reset to usual plan</button></div>'+
    '<div class="saved" id="mS"></div></div>'+
    '<div class="panel"><h2><span class="em">🛒</span> Groceries</h2>'+
    '<textarea class="cell" id="gr" style="min-height:130px" placeholder="What to buy">'+
    esc(S("groc:"+monKey(),""))+'</textarea><div class="saved" id="gS"></div></div>';
}
function wMeals(){
  document.querySelectorAll("[data-meal]").forEach(function(t){
    t.oninput=function(){ grow(t);
      var m=SJ("meals:"+monKey(),null)||JSON.parse(JSON.stringify(MEALS_DEFAULT));
      m[t.dataset.meal]=t.value; WJ("meals:"+monKey(),m); flash("mS"); }; });
  document.getElementById("mR").onclick=function(){
    if(confirm("Reset this week's dinners?")){ WJ("meals:"+monKey(),MEALS_DEFAULT); render(); } };
  var g=document.getElementById("gr");
  g.oninput=function(){ grow(g); W("groc:"+monKey(),g.value); flash("gS"); };
}

function wHome(){
  document.querySelectorAll("[data-del]").forEach(function(b){
    b.onclick=function(){
      WJ("events",SJ("events",[]).filter(function(e){return e.id!==b.dataset.del;})); render(); }; });
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
    var d2=document.getElementById("eD2").value; if(d2&&d2>=d) rec.d2=d2;
    var a=SJ("events",[]); a.push(rec); WJ("events",a);
    showAdd=false; render();
  };
}

/* ==========================================================================
   TESTS
   ========================================================================== */
function pFilter(){ return S("pfilter","all"); }

function vTests(){
  var f=pFilter();
  var opts=[["all","Everything"],["en","English"],["zh","华文"],["ma","Maths"]]
    .map(function(o){ return '<option value="'+o[0]+'"'+(f===o[0]?" selected":"")+'>'+o[1]+'</option>'; }).join("");

  var s='<div class="panel"><h2><span class="em">📝</span> Practice'+
        '<span class="side">'+esc(pname(who()))+'</span></h2>'+
        '<div class="lbl">Subject</div><select id="pf">'+opts+'</select><div style="height:14px"></div>';

  var any=false;

  if(f==="all"||f==="en"){
    s+='<div class="sub">English spelling</div>'; any=true;
    if(who()==="tc"){
      Object.keys(TC_SPELL).forEach(function(k){
        s+='<button class="test" data-t="en|'+k+'"><span><span class="nm">List '+k+'</span>'+
          '<span class="mt">'+TC_SPELL[k][0]+' · '+TC_SPELL[k][1].length+' questions</span></span>'+
          pill(lastFor("Spelling "+k))+'</button>'; });
    } else {
      Object.keys(SC_SPELL).forEach(function(k){
        s+='<button class="test" data-t="es|'+k+'"><span><span class="nm">'+k+'</span>'+
          '<span class="mt">'+SC_SPELL[k][1].length+' questions</span></span>'+pill(lastFor(k))+'</button>'; });
    }
  }

  if(f==="all"||f==="zh"){
    var bank = who()==="tc" ? TC_PINYIN : SC_TINGXIE;
    s+='<div class="sub">'+(who()==="tc"?"华文 · 汉语拼音":"华文听写")+'</div>'; any=true;
    Object.keys(bank).forEach(function(k){
      s+='<button class="test" data-t="zh|'+k+'"><span><span class="nm">'+k+'</span>'+
        '<span class="mt">'+bank[k].length+' words</span></span>'+pill(lastFor(k))+'</button>'; });
  }

  if(f==="all"||f==="ma"){
    s+='<div class="sub">Maths</div>'; any=true;
    s+='<button class="test" data-t="ma|easy"><span><span class="nm">Warm up</span>'+
        '<span class="mt">Add and take away to 20</span></span>'+pill(lastFor("Math · Warm up"))+'</button>'+
       '<button class="test" data-t="ma|times"><span><span class="nm">Times tables</span>'+
        '<span class="mt">2 to 10</span></span>'+pill(lastFor("Math · Times tables"))+'</button>'+
       '<button class="test" data-t="ma|hard"><span><span class="nm">Challenge</span>'+
        '<span class="mt">Bigger numbers and division</span></span>'+pill(lastFor("Math · Challenge"))+'</button>';
  }

  if(!any) s+='<p class="empty">Nothing here yet.</p>';
  s+='</div>';

  /* voice settings */
  var sp=parseFloat(S("rate","0.85"));
  s+='<div class="panel"><h2><span class="em">🔊</span> Voice</h2>'+
     voiceBox("en-GB")+voiceBox("zh-CN")+
     '<div class="lbl">Speaking speed</div>'+
     '<input type="range" id="rate" min="0.5" max="1.1" step="0.05" value="'+sp+'">'+
     '<div class="rateval" id="rateVal">'+(sp<0.7?"Slow":sp<0.95?"Normal":"Quick")+'</div>'+
     '<div class="btnrow"><button class="btn soft" id="vTest">Hear a sample</button></div>'+
     '<p class="empty" style="margin-top:10px">Voices marked ✨ are the good ones. '+
     'If the list is short, see the note below.</p>'+
     '<div class="key">More voices: on Windows open the site in <b>Edge</b> for Sonia and Libby. '+
     'On iPad go to Settings → Accessibility → Spoken Content → Voices → English and download '+
     '<b>Serena</b> or <b>Martha</b>.</div></div>';
  return s;
}
function wTests(){
  document.querySelectorAll("[data-t]").forEach(function(b){ b.onclick=function(){ start(b.dataset.t); }; });
  var f=document.getElementById("pf");
  if(f) f.onchange=function(){ W("pfilter", f.value); render(); };
  wireVoices();
  var r=document.getElementById("rate");
  if(r){
    r.oninput=function(){
      W("rate", r.value);
      var v=parseFloat(r.value);
      document.getElementById("rateVal").textContent = v<0.7?"Slow":v<0.95?"Normal":"Quick";
    };
  }
  var t=document.getElementById("vTest");
  if(t) t.onclick=function(){ say("Spell, mischievous. John read a book about three mischievous children.",0,"en-GB"); };
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
    document.getElementById("dBack").onclick=function(){ go("practice"); };
    document.getElementById("dAgain").onclick=function(){ hush(); start(q.code); };
    return;
  }
  var it=q.items[q.i];
  document.getElementById("qB").onclick=function(){ go("practice"); };
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
    '<div class="btnrow"><button class="btn soft" id="dBack">Back to practice</button>'+
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
/* ==========================================================================
   WEEK — school, after school and events on one grid
   ========================================================================== */
var WK_FROM="07:00", WK_TO="20:00", wkOff=0;

function toMin(t){ var p=String(t).split(":"); return (+p[0])*60 + (+p[1]||0); }
function slotOf(t){ return Math.round((toMin(t)-toMin(WK_FROM))/30); }
function slotCount(){ return Math.round((toMin(WK_TO)-toMin(WK_FROM))/30); }
function slotLabel(i){
  var m=toMin(WK_FROM)+i*30, h=Math.floor(m/60), mm=m%60;
  return (mm===0) ? (h>12?h-12:h)+(h>=12?"pm":"am") : "";
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

  /* school, for whichever child has a timetable saved */
  var tt = TIMETABLES[who()];
  if(tt){
    ["Monday","Tuesday","Wednesday","Thursday","Friday"].forEach(function(d,i){
      (tt[d]||[]).forEach(function(bk){
        g+=block(i, bk[0], bk[1], bk[2], "sch "+subjCls(bk[2]));
      });
    });
  }

  /* after school, recurring */
  acts().filter(function(a){ return !a.who || a.who==="all" || a.who===who(); }).forEach(function(a){
    var i=DAYS.indexOf(a.day); if(i<0) return;
    g+=block(i, a.from, a.to, esc(a.t), 'own '+whoCls(a.who==='all'?'':a.who), ' data-act="'+a.id+'"');
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
    '<span class="side">'+esc(pname(who()))+'</span></h2>'+
    '<div class="wknav"><button class="btn soft" id="wkPrev">‹</button>'+
    '<span class="wkrange">'+dates[0].toLocaleDateString("en-GB",{day:"numeric",month:"short"})+
    ' – '+dates[6].toLocaleDateString("en-GB",{day:"numeric",month:"short"})+'</span>'+
    '<button class="btn soft" id="wkNext">›</button></div>'+
    (tt ? '' : '<p class="empty" style="margin-bottom:10px">No school timetable saved for '+
      esc(pname(who()))+' yet — after-school and events still show below.</p>')+g;

  /* add an activity */
  var dayOpts=DAYS.map(function(d){ return '<option value="'+d+'">'+d+'</option>'; }).join("");
  head+='<button class="addlink" id="aShow">+ Add something weekly</button>'+
    '<div id="aForm" class="hidden">'+
    '<div class="lbl">What</div><input type="text" id="aT" maxlength="40" placeholder="Swimming">'+
    '<div class="lbl">Day</div><select id="aD">'+dayOpts+'</select>'+
    '<div class="lbl">Who</div><select id="aW"><option value="all">Everyone</option>'+
      KIDS.map(function(k){ return '<option value="'+k.id+'"'+(k.id===who()?" selected":"")+'>'+esc(pname(k.id))+'</option>'; }).join("")+
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
  document.querySelectorAll("[data-act]").forEach(function(b){
    b.onclick=function(){
      if(!confirm("Remove "+b.textContent+"?")) return;
      WJ("acts", acts().filter(function(x){ return x.id!==b.dataset.act; })); render();
    };
  });
}

seedOnce();
render();
