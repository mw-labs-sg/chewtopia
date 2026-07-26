/* ==========================================================================
   CHEWTOPIA
   Everything lives on the device. Nothing is sent anywhere.

   TO EDIT CONTENT:
     - spelling lists  -> SPELLING below
     - chinese         -> PINYIN below
     - default meals   -> MEALS_DEFAULT below
   ========================================================================== */

/* ---------- storage ---------- */
function S(k,d){ try{ var v=localStorage.getItem("chew:"+k); return v===null?d:v; }catch(e){ return d; } }
function W(k,v){ try{ localStorage.setItem("chew:"+k,v); }catch(e){} }
function SJ(k,d){ try{ var v=JSON.parse(localStorage.getItem("chew:"+k)); return v===null||v===undefined?d:v; }catch(e){ return d; } }
function WJ(k,v){ W(k, JSON.stringify(v)); }

/* ---------- players (names typed here, never in the code) ---------- */
function pname(slot){ return S("name:"+slot, slot==="p1" ? "Player 1" : "Player 2"); }
function slot(){ return S("slot","p1"); }

function paintWho(){
  var box = document.getElementById("who");
  box.innerHTML = "";
  ["p1","p2"].forEach(function(sl){
    var b = document.createElement("button");
    b.className = "chip" + (sl===slot() ? " on" : "");
    b.textContent = pname(sl);
    b.onclick = function(){
      if(sl === slot()){
        var n = prompt("Name for this player", pname(sl));
        if(n && n.trim()) W("name:"+sl, n.trim().slice(0,18));
      } else {
        W("slot", sl);
      }
      paintWho(); render();
    };
    box.appendChild(b);
  });
}

/* ---------- content ---------- */
var SPELLING = {
  "3.3": { unit:"Unit 9", items:[
    {t:"spell", s:"I cannot find my keys. They have completely disappeared!", a:"disappeared"},
    {t:"spell", s:"John read a book about three mischievous children.", a:"mischievous"},
    {t:"spell", s:"There was something strange about that tree.", a:"strange"},
    {t:"spell", s:"Uncle Lim propped the ladder against the tree.", a:"propped"},
    {t:"spell", s:"He picked something up from the ground.", a:"ground"},
    {t:"spell", s:"Were his eyes playing a trick on him?", a:"playing a trick"},
    {t:"spell", s:"He thought of climbing the tall sturdy tree.", a:"sturdy"},
    {t:"spell", s:"John hid behind the bushes.", a:"behind"},
    {t:"dict",  s:"He frowned with concern.", a:"He frowned with concern."},
    {t:"dict",  s:"He scratched his head over the tricky question.", a:"He scratched his head over the tricky question."}
  ]},
  "3.4": { unit:"Unit 9", items:[
    {t:"spell", s:"He returned to the tree with Uncle Lim and his ladder.", a:"returned"},
    {t:"spell", s:"That tree! he told Uncle Lim as he pointed at it.", a:"pointed at"},
    {t:"spell", s:"Whenever anyone stood under the tree, odd things happened.", a:"odd"},
    {t:"spell", s:"Its nest was decorated with Mary's ribbon and many other shiny things.", a:"decorated with"},
    {t:"spell", s:"They went closer and looked very carefully up into the tree.", a:"closer"},
    {t:"spell", s:"They saw a bird with Peter's coin in its beak.", a:"coin"},
    {t:"spell", s:"They were both puzzled by what happened.", a:"puzzled"},
    {t:"spell", s:"She ambled, grinning from ear to ear.", a:"grinning from ear to ear"},
    {t:"dict",  s:"She looked at the floor with a sheepish grin.", a:"She looked at the floor with a sheepish grin."},
    {t:"dict",  s:"She finally realised what had happened.", a:"She finally realised what had happened."}
  ]},
  "3.5": { unit:"Unit 10", items:[
    {t:"spell", s:"He had forgotten to bring his pencil case to school.", a:"forgotten"},
    {t:"spell", s:"She loves eating vegetables.", a:"vegetables"},
    {t:"spell", s:"Those tomatoes are red and juicy.", a:"tomatoes"},
    {t:"spell", s:"The cat might eat the mouse.", a:"might"},
    {t:"spell", s:"The snake is huge and green.", a:"huge"},
    {t:"spell", s:"My aunt arrived at my party in a limousine.", a:"arrived"},
    {t:"spell", s:"It is dangerous to cycle on the road without a helmet.", a:"dangerous"},
    {t:"dict",  s:"He lost his balance and fell with a thud.", a:"He lost his balance and fell with a thud."},
    {t:"dict",  s:"Tears welled up in her eyes.", a:"Tears welled up in her eyes."},
    {t:"dict",  s:"His knees were grazed but he quickly got up.", a:"His knees were grazed but he quickly got up."}
  ]},
  "3.6": { unit:"Unit 10", items:[
    {t:"spell", s:"Please be quiet in the library, whispered the librarian.", a:"whispered"},
    {t:"spell", s:"That aeroplane looks like a gigantic bird.", a:"gigantic"},
    {t:"spell", s:"The gardener used the hose to water the plants.", a:"hose"},
    {t:"spell", s:"The smell of the garbage over there is terrible.", a:"garbage"},
    {t:"spell", s:"He called for extra men to help him move the table.", a:"extra"},
    {t:"spell", s:"That truck is carrying many baskets of watermelons.", a:"truck"},
    {t:"spell", s:"Grandfather noticed something moving behind the bushes.", a:"noticed"},
    {t:"dict",  s:"The boy tripped because he missed the ball.", a:"The boy tripped because he missed the ball."},
    {t:"dict",  s:"He slid and fell as the wet grass was slippery.", a:"He slid and fell as the wet grass was slippery."},
    {t:"dict",  s:"He clutched his leg as it was painful.", a:"He clutched his leg as it was painful."}
  ]}
};

var PINYIN = [
  ["永","yong","3","forever","永远 yǒng yuǎn"], ["轻","qing","1","light / gentle","轻轻 qīng qīng"],
  ["命","ming","4","life / fate","生命 shēng mìng"], ["百","bai","3","hundred","一百 yì bǎi"],
  ["健","jian","4","healthy","健康 jiàn kāng"], ["康","kang","1","well-being","健康 jiàn kāng"],
  ["幸","xing","4","fortunate","幸福 xìng fú"], ["愿","yuan","4","wish","愿望 yuàn wàng"],
  ["吹","chui","1","to blow","吹风 chuī fēng"], ["糕","gao","1","cake","蛋糕 dàn gāo"],
  ["首","shou","3","first / measure word","一首歌 yì shǒu gē"], ["张","zhang","1","measure word","一张纸 yì zhāng zhǐ"],
  ["卡","ka","3","card","卡片 kǎ piàn"], ["影","ying","3","shadow","电影 diàn yǐng"],
  ["票","piao","4","ticket","电影票 diàn yǐng piào"], ["礼","li","3","gift / courtesy","礼物 lǐ wù"],
  ["厅","ting","1","hall","客厅 kè tīng"], ["奇","qi","2","strange","奇怪 qí guài"],
  ["怪","guai","4","weird","奇怪 qí guài"], ["活","huo","2","to live","生活 shēng huó"],
  ["宝","bao","3","treasure","宝贝 bǎo bèi"]
];

var MEALS_DEFAULT = {
  Monday:    "Steamed codfish with ginger, spring onion, light soy\nSunny-side eggs for the boys\nStir-fried mixed vegetables\nLong bean + black fungus, minced pork, chilli & peppercorn",
  Tuesday:   "Salmon rice\nChicken fillet salad (adults)\nSoup",
  Wednesday: "Garlic prawns\nBraised pork belly with carrot, potato & egg\nBlanched vegetables with fried shallots\nSteamed otah",
  Thursday:  "Macaroni soup with minced beef",
  Friday:    "Beef burger, caramelised onion, cheese, fried egg\nBlanched vegetables on the side",
  Saturday:  "",
  Sunday:    ""
};

var DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

/* ---------- tabs ---------- */
var TABS = [
  {id:"home",     label:"Home"},
  {id:"events",   label:"Events"},
  {id:"schedule", label:"Schedule"},
  {id:"meals",    label:"Meals"},
  {id:"english",  label:"English"},
  {id:"chinese",  label:"中文"},
  {id:"math",     label:"Math"},
  {id:"results",  label:"Results"}
];
var tab = "home";
var quiz = null;

function go(id){ tab = id; quiz = null; render(); window.scrollTo(0,0); }

function paintTabs(){
  var t = document.getElementById("tabs");
  t.innerHTML = "";
  TABS.forEach(function(x){
    var b = document.createElement("button");
    b.className = "tab" + (x.id===tab ? " on" : "");
    b.textContent = x.label;
    b.onclick = function(){ go(x.id); };
    t.appendChild(b);
  });
}

/* ---------- helpers ---------- */
function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function dayIndexToday(){ return (new Date().getDay()+6)%7; }
function mondayKey(){
  var d = new Date(); d.setDate(d.getDate()-dayIndexToday());
  return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
}
function weekDates(){
  var d = new Date(); d.setDate(d.getDate()-dayIndexToday());
  return DAYS.map(function(_,i){ var x=new Date(d); x.setDate(d.getDate()+i); return x; });
}
function daysUntil(iso){
  var t = new Date(); t.setHours(0,0,0,0);
  var d = new Date(iso+"T00:00:00");
  return Math.round((d-t)/86400000);
}
function whenLabel(n){
  return n<0 ? "past" : n===0 ? "Today" : n===1 ? "Tomorrow" : "in "+n+" days";
}
var flashT = {};
function flash(id){
  var el = document.getElementById(id); if(!el) return;
  el.textContent = "Saved";
  clearTimeout(flashT[id]);
  flashT[id] = setTimeout(function(){ el.textContent=""; }, 1100);
}

/* ---------- results store ---------- */
function results(){ return SJ("results", []); }
function addResult(r){ var a = results(); a.unshift(r); WJ("results", a.slice(0,500)); }
function myRuns(sl){
  return results().filter(function(r){ return (r.slot||"p1") === (sl||slot()); })
                  .slice().sort(function(a,b){ return a.ts-b.ts; });
}
function lastFor(test){
  var a = myRuns().filter(function(r){ return r.test===test; });
  return a.length ? a[a.length-1] : null;
}
function pill(r){
  if(!r) return '<span class="pill">Not tried</span>';
  var p = Math.round(r.score/r.total*100);
  var c = p>=80 ? "good" : p>=50 ? "mid" : "low";
  return '<span class="pill '+c+'">'+r.score+'/'+r.total+'</span>';
}

/* ---------- speech ---------- */
var voices = [];
function loadVoices(){ try{ voices = speechSynthesis.getVoices()||[]; }catch(e){ voices=[]; } }
if(window.speechSynthesis){ loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }

var FEM = /samantha|serena|sonia|kate|karen|moira|tessa|fiona|libby|maisie|hazel|aria|jenny|zira|ava|allison|susan|female|woman|嘉|xiaoxiao|huihui|tingting|mei/i;

function bestVoice(lang){
  if(!voices.length) loadVoices();
  var saved = S("voice:"+lang, "");
  var hit = voices.filter(function(v){ return v.name===saved; })[0];
  if(hit) return hit;
  var base = lang.split("-")[0];
  var exact = voices.filter(function(v){ return v.lang && v.lang.replace("_","-")===lang; });
  var near  = voices.filter(function(v){ return v.lang && v.lang.replace("_","-").indexOf(base)===0; });
  return exact.filter(function(v){ return FEM.test(v.name); })[0]
      || near.filter(function(v){ return FEM.test(v.name); })[0]
      || exact[0] || near[0] || null;
}
function say(text, rate, lang){
  if(!window.speechSynthesis) return;
  lang = lang || "en-GB";
  var u = new SpeechSynthesisUtterance(text);
  var v = bestVoice(lang);
  if(v){ u.voice = v; u.lang = v.lang; } else { u.lang = lang; }
  u.rate = rate || 0.85; u.pitch = 1.06;
  speechSynthesis.speak(u);
}
function hush(){ try{ speechSynthesis.cancel(); }catch(e){} }

function voicePicker(lang){
  if(!voices.length) loadVoices();
  var opts = voices.filter(function(v){
    return v.lang && v.lang.replace("_","-").indexOf(lang.split("-")[0])===0;
  });
  if(!opts.length) return "";
  var cur = bestVoice(lang);
  var html = '<div class="lbl">Teacher voice</div><select id="vpick">';
  opts.forEach(function(v){
    html += '<option value="'+esc(v.name)+'"'+(cur && v.name===cur.name?" selected":"")+'>'+esc(v.name)+'</option>';
  });
  return html + '</select>';
}
function wireVoicePicker(lang){
  var el = document.getElementById("vpick");
  if(!el) return;
  el.onchange = function(){
    W("voice:"+lang, el.value);
    say("Hello, I am your spelling teacher.", 0.85, lang);
  };
}

/* ==========================================================================
   VIEWS
   ========================================================================== */
function render(){
  document.getElementById("mark").innerHTML =
    "CHEWTOPIA".split("").map(function(c){ return "<span>"+c+"</span>"; }).join("");
  paintWho();
  paintTabs();
  var v = document.getElementById("view");
  if(quiz){ v.innerHTML = quizHTML(); wireQuiz(); return; }
  v.innerHTML = ({
    home: viewHome, events: viewEvents, schedule: viewSchedule, meals: viewMeals,
    english: viewEnglish, chinese: viewChinese, math: viewMath, results: viewResults
  })[tab]();
  ({ events: wireEvents, schedule: wireSchedule, meals: wireMeals,
     english: wireTests, chinese: wireTests, math: wireMath, results: wireResults,
     home: wireHome })[tab]();
}

/* ---------- home ---------- */
function viewHome(){
  var evs = SJ("events", []).map(function(e){ return {e:e, n:daysUntil(e.d)}; })
              .filter(function(x){ return x.n>=0; })
              .sort(function(a,b){ return a.n-b.n; }).slice(0,3);
  var sch = SJ("schedule", {});
  var todayName = DAYS[dayIndexToday()];
  var todaySch = (sch[todayName]||"").trim();

  var strip = '<div class="nextup"><div class="t">Coming up</div>';
  if(todaySch) strip += '<div class="row"><span class="when">Today</span><span>'+esc(todaySch)+'</span></div>';
  evs.forEach(function(x){
    strip += '<div class="row"><span class="when">'+whenLabel(x.n)+'</span><span>'+esc(x.e.t)+'</span></div>';
  });
  if(!todaySch && !evs.length) strip += '<div class="none">Nothing scheduled. Add something under Events.</div>';
  strip += '</div>';

  return strip + '<div class="tiles">'+
    tile("a","📚","English","Spelling lists 3.3 – 3.6","english")+
    tile("b","汉","中文","拼音 Lesson 12","chinese")+
    tile("c","🔢","Math","Quick number drills","math")+
    tile("d","📈","Results","Who is improving","results")+
    tile("b","🗓️","Events","What is coming up","events")+
    tile("c","⏰","Schedule","The weekly routine","schedule")+
    tile("a","🍜","Meals","Dinner plan for the week","meals")+
    tile("d","🏆","Badges","What you have unlocked","results")+
  '</div>';
}
function tile(cls,ico,nm,sb,go){
  return '<button class="tile '+cls+'" data-go="'+go+'">'+
    '<span class="ico">'+ico+'</span><span class="nm">'+nm+'</span>'+
    '<span class="sb">'+sb+'</span></button>';
}
function wireHome(){
  document.querySelectorAll("[data-go]").forEach(function(b){
    b.onclick = function(){ go(b.dataset.go); };
  });
}

/* ---------- events ---------- */
function viewEvents(){
  var list = SJ("events", []).map(function(e){ return {e:e,n:daysUntil(e.d)}; })
               .sort(function(a,b){ return a.n-b.n; });
  var upcoming = list.filter(function(x){ return x.n>=0; });

  var rows = upcoming.map(function(x,i){
    var d = new Date(x.e.d+"T00:00:00");
    return '<div class="ev'+(x.n<=2?" soon":"")+'">'+
      '<span class="cd"><b>'+d.getDate()+'</b><i>'+d.toLocaleDateString("en-GB",{month:"short"})+'</i></span>'+
      '<span class="tx">'+esc(x.e.t)+'<small>'+whenLabel(x.n)+'</small></span>'+
      '<button class="x" data-del="'+x.e.id+'" title="Remove">&times;</button></div>';
  }).join("");

  return '<div class="panel"><h2>Coming up</h2>'+
    '<p class="lead">One-off things: tests, birthdays, trips, holidays</p>'+
    (rows || '<p class="empty">Nothing yet. Add the next spelling test or a birthday below.</p>')+
    '</div>'+
    '<div class="panel"><h2>Add something</h2>'+
      '<div class="lbl">What is it</div>'+
      '<input type="text" id="evT" placeholder="Spelling test List 3.7" maxlength="60">'+
      '<div class="lbl">When</div><input type="date" id="evD">'+
      '<div class="btnrow"><button class="btn go" id="evAdd">Add to the list</button></div>'+
    '</div>';
}
function wireEvents(){
  var add = document.getElementById("evAdd");
  add.onclick = function(){
    var t = document.getElementById("evT").value.trim();
    var d = document.getElementById("evD").value;
    if(!t || !d){ alert("Needs a name and a date."); return; }
    var a = SJ("events", []);
    a.push({id:Date.now()+"", t:t.slice(0,60), d:d});
    WJ("events", a);
    render();
  };
  document.querySelectorAll("[data-del]").forEach(function(b){
    b.onclick = function(){
      WJ("events", SJ("events",[]).filter(function(e){ return e.id !== b.dataset.del; }));
      render();
    };
  });
}

/* ---------- schedule ---------- */
function viewSchedule(){
  var sch = SJ("schedule", {});
  var rows = DAYS.map(function(d,i){
    return '<div class="row2'+(i===dayIndexToday()?" today":"")+'">'+
      '<span class="d">'+d.slice(0,3)+'</span>'+
      '<input type="text" data-day="'+d+'" value="'+esc(sch[d]||"")+'" '+
      'placeholder="Swimming 4pm, tuition 6pm"></div>';
  }).join("");
  return '<div class="panel"><h2>Weekly routine</h2>'+
    '<p class="lead">The things that repeat every week. Today is highlighted.</p>'+
    rows + '<div class="saved" id="schSaved"></div></div>';
}
function wireSchedule(){
  document.querySelectorAll("[data-day]").forEach(function(inp){
    inp.oninput = function(){
      var s = SJ("schedule", {}); s[inp.dataset.day] = inp.value; WJ("schedule", s);
      flash("schSaved");
    };
  });
}

/* ---------- meals ---------- */
function viewMeals(){
  var m = SJ("meals:"+mondayKey(), null) || MEALS_DEFAULT;
  var dates = weekDates();
  var rows = DAYS.map(function(d,i){
    return '<div class="row2'+(i===dayIndexToday()?" today":"")+'">'+
      '<span class="d">'+d.slice(0,3)+'<small>'+dates[i].getDate()+'</small></span>'+
      '<textarea data-meal="'+d+'" placeholder="Dinner">'+esc(m[d]||"")+'</textarea></div>';
  }).join("");
  return '<div class="panel"><h2>Dinner this week</h2>'+
    '<p class="lead">Starts from your usual plan. Edit anything; it saves as you type.</p>'+
    rows +
    '<div class="btnrow"><button class="btn mini" id="mReset">Back to the usual plan</button></div>'+
    '<div class="saved" id="mealSaved"></div></div>'+
    '<div class="panel"><h2>Groceries</h2>'+
    '<p class="lead">What to buy for the week</p>'+
    '<textarea id="groc" style="min-height:130px" placeholder="Codfish&#10;Salmon&#10;Pork belly&#10;Long bean">'+
      esc(S("groc:"+mondayKey(),"")) + '</textarea>'+
    '<div class="saved" id="grocSaved"></div></div>';
}
function wireMeals(){
  document.querySelectorAll("[data-meal]").forEach(function(ta){
    ta.oninput = function(){
      var m = SJ("meals:"+mondayKey(), null) || JSON.parse(JSON.stringify(MEALS_DEFAULT));
      m[ta.dataset.meal] = ta.value;
      WJ("meals:"+mondayKey(), m);
      flash("mealSaved");
    };
  });
  document.getElementById("mReset").onclick = function(){
    if(!confirm("Replace this week's dinners with the usual plan?")) return;
    WJ("meals:"+mondayKey(), MEALS_DEFAULT); render();
  };
  var g = document.getElementById("groc");
  g.oninput = function(){ W("groc:"+mondayKey(), g.value); flash("grocSaved"); };
}

/* ---------- subject menus ---------- */
function viewEnglish(){
  var units = {};
  Object.keys(SPELLING).forEach(function(k){
    (units[SPELLING[k].unit] = units[SPELLING[k].unit] || []).push(k);
  });
  var html = "";
  Object.keys(units).forEach(function(u){
    html += '<div class="panel"><h2>'+u+'</h2><p class="lead">Listen, then type the word. Starred sentences are dictation.</p>';
    units[u].forEach(function(k){
      var n = SPELLING[k].items.length;
      html += '<button class="test" data-test="en|'+k+'">'+
        '<span><span class="nm">List '+k+'</span><span class="mt">'+n+' questions</span></span>'+
        pill(lastFor("Spelling "+k))+'</button>';
    });
    html += '</div>';
  });
  return html + '<div class="panel">'+voicePicker("en-GB")+
    '<p class="lead" style="margin:9px 0 0">Pick whichever sounds most like a teacher. Changing it plays a sample.</p></div>';
}
function viewChinese(){
  return '<div class="panel"><h2>汉语拼音</h2>'+
    '<p class="lead">Lesson 12 · type the pinyin and the tone number</p>'+
    '<button class="test" data-test="zh|L12"><span><span class="nm">拼音 Lesson 12</span>'+
    '<span class="mt">21 characters</span></span>'+pill(lastFor("拼音 Lesson 12"))+'</button></div>'+
    '<div class="panel">'+voicePicker("zh-CN")+
    '<p class="lead" style="margin:9px 0 0">Chinese voices vary by device. If none are listed, this device has none installed.</p></div>';
}
function wireTests(){
  document.querySelectorAll("[data-test]").forEach(function(b){
    b.onclick = function(){ startTest(b.dataset.test); };
  });
  wireVoicePicker(tab==="chinese" ? "zh-CN" : "en-GB");
}

/* ---------- math ---------- */
function viewMath(){
  return '<div class="panel"><h2>Number drills</h2>'+
    '<p class="lead">Ten questions, made fresh each time</p>'+
    '<button class="test" data-m="easy"><span><span class="nm">Warm up</span>'+
      '<span class="mt">Adding and taking away up to 20</span></span>'+pill(lastFor("Math · Warm up"))+'</button>'+
    '<button class="test" data-m="times"><span><span class="nm">Times tables</span>'+
      '<span class="mt">2 to 10</span></span>'+pill(lastFor("Math · Times tables"))+'</button>'+
    '<button class="test" data-m="hard"><span><span class="nm">Challenge</span>'+
      '<span class="mt">Bigger numbers and division</span></span>'+pill(lastFor("Math · Challenge"))+'</button>'+
    '</div>';
}
function wireMath(){
  document.querySelectorAll("[data-m]").forEach(function(b){
    b.onclick = function(){ startTest("ma|"+b.dataset.m); };
  });
}
function rnd(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function mathItems(kind){
  var out = [];
  for(var i=0;i<10;i++){
    var a,b,q,ans;
    if(kind==="easy"){
      a=rnd(2,18); b=rnd(1,18-Math.min(a,17));
      if(Math.random()<0.5){ q=a+" + "+b; ans=a+b; }
      else { if(b>a){ var t=a;a=b;b=t; } q=a+" − "+b; ans=a-b; }
    } else if(kind==="times"){
      a=rnd(2,10); b=rnd(2,10); q=a+" × "+b; ans=a*b;
    } else {
      var r=Math.random();
      if(r<0.34){ a=rnd(3,12); b=rnd(3,12); q=a+" × "+b; ans=a*b; }
      else if(r<0.67){ b=rnd(2,12); ans=rnd(2,12); a=b*ans; q=a+" ÷ "+b; }
      else { a=rnd(21,89); b=rnd(11,49); q=a+" + "+b; ans=a+b; }
    }
    out.push({t:"math", q:q, a:String(ans)});
  }
  return out;
}

/* ---------- quiz ---------- */
function startTest(code){
  var p = code.split("|"), items, subject, test, lang;
  if(p[0]==="en"){
    subject="English"; test="Spelling "+p[1]; lang="en-GB";
    items = SPELLING[p[1]].items.map(function(x){ return {t:x.t, s:x.s, a:x.a}; });
  } else if(p[0]==="zh"){
    subject="中文"; test="拼音 Lesson 12"; lang="zh-CN";
    items = PINYIN.slice().sort(function(){ return Math.random()-0.5; }).map(function(x){
      return {t:"py", h:x[0], a:x[1], tone:x[2], m:x[3], help:x[4]};
    });
  } else {
    subject="Math"; lang="en-GB";
    test = "Math · " + (p[1]==="easy"?"Warm up":p[1]==="times"?"Times tables":"Challenge");
    items = mathItems(p[1]);
  }
  quiz = {code:code, subject:subject, test:test, lang:lang, items:items,
          i:0, score:0, done:false, missed:[], graded:false};
  render(); window.scrollTo(0,0);
}

function quizHTML(){
  var q = quiz, it = q.items[q.i];
  if(q.done) return finishHTML();

  var head = '<div class="panel"><div class="qtop">'+
    '<button class="btn mini" id="qBack">&larr; Back</button>'+
    '<span class="sc">'+q.test+' · '+q.score+'/'+q.i+'</span></div>'+
    '<div class="meter"><i style="width:'+(q.i/q.items.length*100)+'%"></i></div>';

  var kind = it.t==="dict" ? "Dictation" : it.t==="py" ? "Character" : it.t==="math" ? "Question" : "Spelling";
  head += '<div class="kind">'+kind+' '+(q.i+1)+' of '+q.items.length+'</div>';

  if(it.t==="py"){
    head += '<div class="hanzi">'+it.h+'</div>';
  } else if(it.t==="math"){
    head += '<div class="qq">'+it.q+' = ?</div>';
  } else {
    head += '<div class="qq">'+(it.t==="dict"?"Write the sentence":"Spell the word")+'</div>'+
            '<div class="tip">Tap play. You will hear the sentence, then the word to spell.</div>';
  }

  if(it.t!=="math"){
    head += '<button class="btn play" id="qPlay">🔊 '+(it.t==="py"?"Hear it":"Play")+'</button>';
  }

  if(it.t==="py"){
    head += '<div class="btnrow" style="align-items:flex-end">'+
      '<span style="flex:2"><span class="lbl">Pinyin</span>'+
      '<input type="text" id="qa" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="yong"></span>'+
      '<span style="flex:1"><span class="lbl">Tone</span>'+
      '<input type="text" id="qt" inputmode="numeric" maxlength="1" placeholder="1-4"></span></div>';
  } else if(it.t==="dict"){
    head += '<textarea id="qa" spellcheck="false" placeholder="Type the whole sentence"></textarea>';
  } else {
    head += '<div style="margin-top:11px"><input type="text" id="qa" autocomplete="off" '+
      'autocapitalize="none" spellcheck="false" '+
      (it.t==="math"?'inputmode="numeric" ':'')+'placeholder="Type here"></div>';
  }

  head += '<div class="btnrow"><button class="btn go" id="qGo">Check</button></div>'+
          '<div id="qfb"></div></div>';
  return head;
}

function clean(s){
  return String(s||"").toLowerCase()
    .replace(/[.,!?;:'"\u2018\u2019\u201c\u201d]/g,"").replace(/\s+/g," ").trim();
}
function letterRow(target, given){
  var h = '<div class="tiles2">';
  target.split("").forEach(function(c,k){
    var ok = given[k]!==undefined && given[k].toLowerCase()===c.toLowerCase();
    h += '<span class="lt '+(ok?"h":"s")+'">'+(c===" "?"&nbsp;":c)+'</span>';
  });
  return h+'</div>';
}

function wireQuiz(){
  var q = quiz;
  if(q.done){
    document.getElementById("qHome").onclick = function(){ hush(); go(q.subject==="Math"?"math":q.subject==="中文"?"chinese":"english"); };
    document.getElementById("qAgain").onclick = function(){
      hush(); startTest(q.code);
    };
    return;
  }
  var it = q.items[q.i];
  document.getElementById("qBack").onclick = function(){ hush(); go(tab); };
  var play = document.getElementById("qPlay");
  if(play) play.onclick = function(){ speakItem(it); };

  var go2 = document.getElementById("qGo");
  go2.onclick = function(){ q.graded ? next() : grade(); };
  var a = document.getElementById("qa");
  a.addEventListener("keydown", function(e){ if(e.key==="Enter" && it.t!=="dict"){ e.preventDefault(); go2.click(); } });
  var t = document.getElementById("qt");
  if(t) t.addEventListener("keydown", function(e){ if(e.key==="Enter"){ e.preventDefault(); go2.click(); } });
  a.focus();
  if(it.t!=="math" && !q.graded) setTimeout(function(){ speakItem(it); }, 220);
}

function speakItem(it){
  hush();
  if(it.t==="py"){ say(it.h, 0.62, "zh-CN"); setTimeout(function(){ say(it.h,0.55,"zh-CN"); }, 900); }
  else if(it.t==="dict"){ say("Write this sentence.",0.92); say(it.s,0.8); say("Once more.",0.92); say(it.s,0.72); }
  else { say("Spell,",0.92); say(it.a+".",0.76); say(it.s,0.86); say(it.a+".",0.7); }
}

function grade(){
  var q = quiz, it = q.items[q.i];
  var given = document.getElementById("qa").value;
  var right, detail = "";

  if(it.t==="py"){
    var tone = (document.getElementById("qt")||{value:""}).value.trim();
    var pOK = clean(given).replace(/\s/g,"") === it.a;
    var tOK = tone === it.tone;
    right = pOK && tOK;
    detail = (pOK?"Pinyin ✓":"Pinyin ✗ → "+it.a)+" &nbsp;·&nbsp; "+(tOK?"Tone ✓":"Tone ✗ → "+it.tone)+
             "<br>"+it.h+" — "+it.a+it.tone+" · "+it.m+"<br>"+it.help;
  } else if(it.t==="math"){
    right = clean(given) === it.a;
    if(!right) detail = it.q+" = <b>"+it.a+"</b>";
  } else {
    right = clean(given) === clean(it.a);
    detail = letterRow(it.a, given);
  }

  if(right) q.score++;
  else q.missed.push(it.t==="py" ? it.h+" ("+it.a+it.tone+")" : it.t==="math" ? it.q : it.a);

  q.graded = true;
  document.getElementById("qa").disabled = true;
  if(document.getElementById("qt")) document.getElementById("qt").disabled = true;

  document.getElementById("qfb").innerHTML =
    '<div class="fb '+(right?"ok":"no")+'">'+
      '<span class="big">'+(right?"Correct":"Not quite")+'</span>'+detail+'</div>';
  document.getElementById("qGo").textContent = (q.i===q.items.length-1) ? "See the score" : "Next";

  if(right) say("Correct.",0.95);
  else { hush(); if(it.t==="py") say(it.h,0.55,"zh-CN"); else if(it.t!=="math") say(it.a,0.6); }
}

function next(){
  var q = quiz;
  q.i++; q.graded = false;
  if(q.i >= q.items.length){
    q.done = true;
    addResult({slot:slot(), subject:q.subject, test:q.test,
               score:q.score, total:q.items.length, missed:q.missed, ts:Date.now()});
  }
  render(); window.scrollTo(0,0);
}

function finishHTML(){
  var q = quiz, pct = q.score/q.items.length;
  var st = pct===1?"★★★":pct>=.8?"★★☆":pct>=.5?"★☆☆":"☆☆☆";
  var rk = pct===1?"Full marks":pct>=.8?"Very good":pct>=.5?"Getting there":"Worth another go";
  if(!q.cheered){ q.cheered = true; say(pct>=0.8 ? "Well done!" : "Good effort. Try again.", 0.95); }
  return '<div class="panel done"><div class="kind">'+q.test+'</div>'+
    '<div class="big">'+q.score+' / '+q.items.length+'</div>'+
    '<div class="st">'+st+'</div><div class="rk">'+rk+'</div>'+
    (q.missed.length ? '<div class="again">Practise again: <b>'+esc(q.missed.join(", "))+'</b></div>' : '')+
    '<div class="btnrow"><button class="btn mini" id="qHome" style="flex:1">Back to the list</button>'+
    '<button class="btn go" id="qAgain" style="flex:1">Try again</button></div></div>';
}

/* ---------- results (parent dashboard) ---------- */
function viewResults(){
  var html = "";
  ["p1","p2"].forEach(function(sl){
    var runs = myRuns(sl);
    html += '<div class="panel"><h2>'+esc(pname(sl))+'</h2>';
    if(!runs.length){
      html += '<p class="empty">No finished tests yet.</p></div>';
      return;
    }
    var xp = runs.reduce(function(t,r){ return t+r.score*10; },0);
    html += '<p class="lead">'+runs.length+' tests finished · '+xp+' XP · level '+(Math.floor(xp/300)+1)+'</p>';

    /* subject bars from the latest attempt of each test */
    var latest = {}, subj = {};
    runs.forEach(function(r){ latest[r.test] = r; });
    Object.keys(latest).forEach(function(t){
      var r = latest[t];
      subj[r.subject] = subj[r.subject] || {g:0,m:0};
      subj[r.subject].g += r.score; subj[r.subject].m += r.total;
    });
    html += '<div class="bars">';
    Object.keys(subj).forEach(function(s){
      var p = Math.round(subj[s].g/subj[s].m*100);
      var c = p>=80?"":p>=50?"mid":"low";
      html += '<div class="brow"><span class="n">'+esc(s)+'</span>'+
              '<span class="bar"><i class="'+c+'" style="width:'+p+'%"></i></span>'+
              '<span class="p">'+p+'%</span></div>';
    });
    html += '</div>';

    /* progression per test */
    var tests = [];
    runs.forEach(function(r){ if(tests.indexOf(r.test)<0) tests.push(r.test); });
    tests.forEach(function(t){
      var a = runs.filter(function(r){ return r.test===t; });
      var first=a[0], last=a[a.length-1];
      var best=a.reduce(function(x,y){ return y.score>x.score?y:x; },a[0]);
      var mv = last.score-first.score;
      var tr = a.length<2 ? '<span class="trend fl">First try</span>'
             : mv>0 ? '<span class="trend up">▲ up '+mv+'</span>'
             : mv<0 ? '<span class="trend dn">▼ down '+Math.abs(mv)+'</span>'
             : '<span class="trend fl">no change</span>';
      var chips = a.map(function(r,n){
        var p=Math.round(r.score/r.total*100);
        var c=p>=80?"good":p>=50?"mid":"low";
        return (n?'<span class="arrow">→</span>':'')+
          '<span class="run '+c+'"><b>'+r.score+'/'+r.total+'</b><i>'+
          new Date(r.ts).toLocaleDateString("en-GB",{day:"numeric",month:"short"})+'</i></span>';
      }).join("");
      html += '<div class="runrow"><div class="runhead"><span class="runname">'+esc(t)+'</span>'+tr+
              '<span class="runbest">Best '+best.score+'/'+best.total+'</span></div>'+
              '<div class="runline">'+chips+'</div></div>';
    });
    html += '</div>';
  });

  return html + '<div class="panel"><h2>Housekeeping</h2>'+
    '<p class="lead">Scores are stored on this device only</p>'+
    '<div class="btnrow"><button class="btn mini" id="wipe">Clear all scores</button></div></div>';
}
function wireResults(){
  document.getElementById("wipe").onclick = function(){
    if(!confirm("Delete every saved score on this device?")) return;
    WJ("results", []); render();
  };
}

/* ---------- boot ---------- */
render();
