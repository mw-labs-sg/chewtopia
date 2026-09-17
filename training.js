/* ==========================================================================
   CHEWTOPIA — TRAINING tab. The list of tests, the subject filter, the maths
   generator, and the quiz that runs when a test is tapped.
   ========================================================================== */


/* Both boys side by side, three subject columns each, laid out exactly like
   Progress. Grey means never tried; otherwise it is the last score, with the
   name of the test in black inside the same box. */
/* Which boy the Training screen is showing. Progress and Reading still put
   them side by side; Training has too many boxes to read that way. */
function tKid(){
  var v=S("tkid", KIDS[0].id);
  for(var i=0;i<KIDS.length;i++){ if(KIDS[i].id===v) return v; }
  return KIDS[0].id;
}
function tKidBar(){
  var v=tKid();
  return '<div class="whobar tkbar">'+KIDS.map(function(k){
    var st=streak(k.id).n;
    return '<button class="wb w-'+k.id+(v===k.id?" on":"")+'" data-tk="'+k.id+'">'+
      esc(pname(k.id))+'<small>'+k.level+
      (st?' \u00b7 '+st+"\uD83D\uDD25":"")+'</small></button>';
  }).join("")+'</div>';
}

/* The calendar entry a test belongs to, so a box can say when it is sat.
   Seeded tests carry p:"zh|Week 8 · 20 Aug" and friends. */
function testEvent(code, kid){
  var out=null;
  SJ("events",[]).forEach(function(e){
    if(e.p!==code || e.w!==kid || evState(e).gone) return;
    if(!out || evState(e).start < evState(out).start) out=e;
  });
  return out;
}
function dueId(kid){ var e=dueEvent(kid); return e?e.id:""; }

function tCell(kid, code, name, testName, meta, unit){
  var l = testName ? lastFor(testName, kid) : null;
  var cls = l ? scoreCls(l.score, l.total) : "none";
  var ev = testEvent(code, kid), nx = !!(ev && ev.id===dueId(kid));
  var val, sub;
  if(l){
    var b = bestFor(testName, kid);
    val = l.score+"/"+l.total;
    sub = dshort(l.ts) + ((b && b.score>l.score) ? " \u00b7 best "+b.score : "");
  } else { val = "Not tried"; sub = meta||""; }
  /* The last three goes, so one lucky run does not read as "he has it" and one
     bad morning does not read as "he has lost it". A star means all three were
     full marks \u2014 that is the one that means he can finally do it. */
  var a3 = testName ? avgLast(testName, kid, 3) : null;
  return '<button class="tbox '+cls+(nx?" next":"")+'" data-t="'+esc(code)+'" data-kid="'+kid+'">'+
    (name===null ? '' : '<span class="tn">'+esc(name)+
       (unit?'<i>'+esc(unit)+'</i>':'')+'</span>')+
    (ev ? '<span class="tdt">'+esc(dday(ev.d).slice(0,3)+" "+dnum(ev.d)+" "+dmon(ev.d))+
          (nx?' \u00b7 next up':'')+'</span>' : '')+
    '<span class="tv'+(l?'':' small')+'">'+val+'</span>'+
    (sub?'<span class="td">'+esc(sub)+'</span>':'')+
    (a3?'<span class="tavg'+(a3.full?" full":"")+'">'+(a3.full?"\u2605 ":"")+
        'avg '+a3.avg+' \u00b7 '+esc(a3.scores.join(" "))+'</span>':'')+
    '</button>';
}

/* \u9ed8\u5199: the one test in here the app does not run. Its own panel, because it
   is Dad's job rather than the boy's screen, and because it is never scored \u2014
   putting it among the coloured boxes would suggest it could be. */
/* ==========================================================================
   生字表 — the whole list, the way the book prints it
   A reference, not a test: page 116 of the textbook, every lesson at once, so
   the answers are to hand while marking a paper sheet and so you can see what
   is coming without opening anything. Folded away by default, because it is
   long and it is not what you came to Training for — and it remembers whether
   you left it open.
   ========================================================================== */
function charsOpen(){ return S("charlist","off")==="on"; }
function charTable(){
  var open=charsOpen();
  var s='<div class="panel"><h2><span class="em">\uD83D\uDCD6</span> \u751f\u5b57\u8868'+
        '<span class="side">every lesson</span></h2>'+
        '<button class="btn soft wide" id="clTog" aria-expanded="'+(open?"true":"false")+'">'+
        (open?"\u25be Fold it away":"\u25b8 Show the whole list")+'</button>';
  if(!open) return s+'</div>';
  s+='<div class="clist" lang="zh-CN">';
  Object.keys(HANZI).forEach(function(k){
    var rb=(typeof RECOG!=="undefined" && RECOG[k]) ? RECOG[k] : null;
    s+='<div class="cl-l">'+esc(k)+'</div>'+
       '<div class="cl-b">'+
         '<div class="cl-r"><i>\u6211\u4f1a\u8ba4</i>'+
           (rb ? '<b>'+rb.map(function(x){ return esc(x[0]); }).join(" ")+'</b>'+
                 '<u>'+rb.length+'</u>'
               : '<span class="cl-none">not on this page</span>')+'</div>'+
         '<div class="cl-r"><i>\u6211\u4f1a\u5199</i><b class="w">'+
           HANZI[k].map(function(x){ return esc(x[0]); }).join(" ")+'</b>'+
           '<u>'+HANZI[k].length+'</u></div>'+
       '</div>';
  });
  return s+'</div><div class="key">\u6211\u4f1a\u5199 is what he has to write; \u6211\u4f1a\u8ba4 he only '+
    'has to recognise. Straight off the \u751f\u5b57\u8868 in the back of the book.</div></div>';
}


function paperPanel(){
  return '<div class="panel"><h2><span class="em">\u270D\uFE0F</span> \u9ed8\u5199'+
    '<span class="side">on paper \u00b7 not marked here</span></h2>'+
    '<p class="empty" style="padding:0 0 10px">Pick a lesson. You read each word out, '+
    'he writes the character on paper. The app keeps no score for these \u2014 mark the '+
    'paper with a pen.</p><div class="pchips">'+
    Object.keys(HANZI).map(function(k){
      var was=readOut("mo|"+k);
      return '<button class="pchip'+(was?" done":"")+'" data-t="mo|'+esc(k)+'" data-kid="tc">'+
        esc(k)+'<small>'+HANZI[k].length+'\u5b57'+
        (was?' \u00b7 '+esc(dshort(new Date(was+"T00:00:00").getTime())):'')+
        '</small></button>';
    }).join("")+'</div></div>';
}

function tColumn(kid, subj){
  var out="";
  if(subj==="en"){
    var eb = kid==="tc" ? TC_SPELL : SC_SPELL, ec = kid==="tc" ? "en" : "es";
    Object.keys(eb).forEach(function(k){
      /* TC_SPELL has carried the STELLAR unit all along and nothing ever showed
         it. Ms Huang refers to the units by name when she sends work home, so
         it is the label that connects the app to the worksheet on the table. */
      out+=tCell(kid, ec+"|"+k, kid==="tc"?("List "+k):k,
                 kid==="tc"?("Spelling "+k):k, eb[k][1].length+" questions",
                 kid==="tc" ? "STELLAR "+eb[k][0] : "");
    });
  }
  else if(subj==="zh"){
    /* SC's 听写 word lists. TC's 词表 boxes came off the top of this column:
       "Lesson 12", "复习 12 字" and "第十二课 词表" were three overlapping takes on
       the same lesson, and the 生字表 below covers those characters lesson by
       lesson anyway. TC_PINYIN stays in data.js — it is still where the tile
       distractors come from, and the section is four lines to restore. */
    if(kid!=="tc"){
      Object.keys(SC_TINGXIE).forEach(function(k){
        out+=tCell(kid, "zh|"+k, k, k, SC_TINGXIE[k].length+" words");
      });
    }
    /* 我会认 and 我会写 cover the same lessons, so they go side by side:
       one row per lesson, read it on the left, write it on the right. */
    if(kid==="tc"){
      /* Two columns: read it, then write it. The listening column came out \u2014
         only four of the eleven lessons ever had a sheet, so seven rows were a
         dash, and the sentence-gap exercise is not how he practises now.
         TC_TINGXIE and the tx| branch of itemsFor() are still there: putting a
         third cell back in here brings the whole thing with it. */
      out+='<div class="mxtag">\u751f\u5b57\u8868</div><div class="hzgrid">'+
           '<span class="hzh">\u6211\u4f1a\u8ba4</span>'+
           '<span class="hzh">\u6211\u4f1a\u5199</span>';
      Object.keys(HANZI).forEach(function(k){
        var rb=(typeof RECOG!=="undefined" && RECOG[k]) ? RECOG[k] : null;
        out+=tCell(kid, "rn|"+k, k, "\u6211\u4f1a\u8ba4 "+k,
                   (rb?rb.length+"\u8ba4":HANZI[k].length+"\u5199 \u00b7 no \u8ba4 list yet"))+
             tCell(kid, "hz|"+k, k, "\u6211\u4f1a\u5199 "+k, HANZI[k].length+"\u5199");
      });
      out+='</div>';
    }
  }
  else {
    MA_SETS.forEach(function(m){
      out+=tCell(kid, "ma|"+m[0], m[1], "Math \u00b7 "+m[1], m[2]);
    });
  }
  return out || '<div class="mxnone">\u2014</div>';
}

/* The one button that decides for them. It names the test that is closest on
   the calendar, and says exactly what the ten questions are made of. */
function dueEvent(kid){
  var out=null;
  SJ("events",[]).forEach(function(e){
    if(!e.p || e.w!==kid || evState(e).gone) return;
    if(!out || evState(e).start < evState(out).start) out=e;
  });
  return out;
}
function dailyBtn(kid){
  var p=dailyPlan(kid);
  if(!p.any) return "";
  var ev=dueEvent(kid);
  var title = ev ? "Coming up: "+esc(practiceLabel(ev.p)) : "Ten minutes of practice";
  var when  = ev ? evWhen(ev) : "";

  /* The label is built from the set itself, not from a guess at what the set
     will be. It used to say "10 questions \u00b7 4 from it, 4 he keeps missing"
     while startDaily took four from EACH of two due lists and often finished
     eight questions short of ten. Counting the real thing costs nothing and
     the button stops lying. */
  var set=buildDaily(kid), tally={}, bits=[];
  var name=esc(pname(kid));
  set.forEach(function(x){ tally[x.from]=(tally[x.from]||0)+1; });
  if(tally.due)     bits.push(tally.due+" from it");
  if(tally.weak)    bits.push(tally.weak+" he keeps missing");
  if(tally.untried) bits.push(tally.untried+" not tried yet");
  if(tally.any)     bits.push(tally.any+" from anywhere");
  if(!set.length) return "";

  return '<button class="daily k-'+kid+'" data-t="daily" data-kid="'+kid+'">'+
    '<span class="dwho">'+name+'</span>'+
    '<span class="dl">'+title+(when?' <i>'+esc(when)+'</i>':'')+'</span>'+
    '<span class="dm">'+set.length+(set.length===1?" question":" questions")+
      (bits.length?' \u00b7 '+esc(bits.join(", ")):'')+'</span></button>';
}

function vTests(){
  var pick=SUBJ_COLS.slice();     /* everything, always — one screen, no filter */

  /* Sync goes first. It sat at the foot of the screen, which is the wrong end:
     the moment it matters is BEFORE a test, so the tablet has whatever the other
     device recorded and the scores in the boxes are the real ones. Below the
     tests it was only ever found after the fact. */
  var s=syncPanel();

  /* What each boy is doing today, both of them, above the TC/SC switch. It sat
     inside the switch before, so whichever boy you were not looking at had
     nothing coming up as far as the screen was concerned — and on a morning
     when you want to know what is due for both, that is the one question the
     screen would not answer without a tap. */
  var due=KIDS.map(function(k){ return dailyBtn(k.id); }).filter(Boolean);
  if(due.length){
    s+='<div class="panel"><h2><span class="em">\u23F1\uFE0F</span> Today'+
       '<span class="side">ten minutes each</span></h2>'+
       '<div class="todayrow">'+due.join("")+'</div></div>';
  }

  s+='<div class="panel"><h2><span class="em">\uD83D\uDCDD</span> Training</h2>'+
        '<div class="mxkey"><span><span class="dot" style="background:#C3D2DF"></span> '+
          '<b>not tried</b></span>'+
          '<span><span class="dot" style="background:#4FB86B"></span> <b>full marks</b></span>'+
          '<span><span class="dot" style="background:#FFB627"></span> <b>70% or better</b></span>'+
          '<span><span class="dot" style="background:#FF6F52"></span> <b>below 70%</b></span>'+
          '<span>last score \u00b7 tap to start</span></div>'+
        tKidBar()+
        '<div class="mx6">';

  shownKids().filter(function(k){ return k.id===tKid(); }).forEach(function(k){
    var cols=pick.filter(function(c){ return hasSubj(k.id, c[0]); });
    if(!cols.length) return;
    var wk=weakTop(k.id, 12);
    s+='<div class="kidbox">'+
       (wk.length?'<button class="fixbtn" data-t="weak" data-kid="'+k.id+'">'+
         '<span class="nm">Practise the '+wk.length+' he keeps missing</span>'+
         '<span class="mt">'+esc(wk.slice(0,4).map(weakLabel).join(", "))+
         (wk.length>4?", \u2026":"")+'</span></button>':'')+
       '<div class="mxcols'+(cols.length===1?" one":cols.length===2?" two":"")+
       (k.id==="tc" && cols.length===3 ? " wide":"")+'">';
    cols.forEach(function(c){ s+='<div class="mxsub">'+c[1]+'<i>'+c[2]+'</i></div>'; });
    cols.forEach(function(c){ s+='<div class="mxcol">'+tColumn(k.id, c[0])+'</div>'; });
    s+='</div></div>';
  });
  s+='</div></div>';

  if(tKid()==="tc") s+=paperPanel();
  s+=weakPanel(tKid());
  if(tKid()==="tc") s+=charTable();
  /* The reading log, which used to have the tab the quizzes now have. Books are
     not a quiz, but they are how a boy is getting on, which is this screen. */
  s+=readPanels();

  /* No voice picker. The ranking in bestVoice() already knows which is the good
     one — a modern neural voice, a woman, the right accent, and never one of
     the old SAPI ones — so choosing was a setting that only ever made things
     worse. The one thing worth saying is when there is no Mandarin voice at
     all, because then the Chinese tests are silent and that looks like a bug. */
  if(!bestVoice("zh-CN")){
    s+='<div class="panel"><p class="warn" style="margin:0">This device has no '+
       'Mandarin voice, so the Chinese tests stay silent rather than being read out '+
       'in an English accent. On an iPad: Settings \u2192 Accessibility \u2192 Spoken '+
       'Content \u2192 Voices \u2192 Chinese (Mandarin).</p></div>';
  }
  return s;
}

/* What he keeps getting wrong, in full, with a way to strike one off. This
   lived on Progress, which no longer exists, so the only trace left was four
   items squeezed into the subtitle of a button. */
function weakPanel(kid){
  var w=weakTop(kid, 24);
  if(!w.length) return "";
  return '<div class="panel"><h2><span class="em">\uD83C\uDFAF</span> Keeps getting these wrong'+
    '<span class="side ' +whoCls(kid)+'">'+esc(pname(kid))+'</span></h2>'+
    '<div class="mxwk one"><div class="weak">'+
    '<div class="wt">'+w.length+(w.length===1?" thing":" things")+' \u00b7 hardest first</div>'+
    w.map(function(y){
      return '<span class="wi'+(y.n>=3?" hot":"")+'">'+esc(weakLabel(y))+
             '<i>'+y.n+'\u00d7</i>'+
             '<button class="wx" data-weakgo="'+esc(kid+"\u0001"+y.k)+'" '+
             'title="He knows this one now" aria-label="Clear this one">\u00d7</button>'+
             '</span>';
    }).join("")+'</div></div>'+
    '<div class="key">Two clean goes clears one on its own. Tap the \u00d7 if he has it '+
    'already and it is only cluttering up his practice.</div></div>';
}

/* The TC/SC tabs appear on both Training and Progress and share one setting,
   so switching boy on one screen lands you on the same boy on the other. */
function wKidBar(){
  document.querySelectorAll("[data-tk]").forEach(function(b){
    b.onclick=function(){ W("tkid", b.dataset.tk); render(); };
  });
}

function wTests(){
  wKidBar();
  wResults();          /* the sync buttons now live on this screen */
  wireRead();          /* the reading log at the foot of the screen */
  var cl=document.getElementById("clTog");
  if(cl) cl.onclick=function(){ W("charlist", charsOpen()?"off":"on"); sfxTap(); render(); };
  document.querySelectorAll("[data-weakgo]").forEach(function(b){
    b.onclick=function(e){
      e.stopPropagation();
      var p=b.dataset.weakgo.split("\u0001"), kid=p[0], key=p[1];
      WJ("weak:"+kid, weakAll(kid).filter(function(x){ return x.k!==key; }));
      strike("weak:"+kid, key);      /* and it stays gone on the other device too */
      sfxTap(); render();
    };
  });
  document.querySelectorAll("[data-t]").forEach(function(b){
    b.onclick=function(){
      if(b.dataset.kid) W("who", b.dataset.kid);
      start(b.dataset.t);
    };
  });
}

/* ==========================================================================
   默写 — THE PAPER SHEET
   The only test in here the app does not run. Dad reads a word out, the boy
   writes the character on paper, and it is marked with a pen like the real
   thing. So the screen is a reading list, not a quiz: the words in a shuffled
   order that stays put while the sheet is open, big enough to read at arm's
   length, with the character to be written picked out of each word.

   Nothing is scored. A score the app did not see is a score it should not
   claim, and a half-marked run is worse than none — so the box on Training
   stays grey and only carries the date it was last read out.
   ========================================================================== */
function startPaper(code){
  var k=String(code).split("|")[1], set=HANZI[k];
  if(!set || !set.length){ alert("That list is not in the app any more."); return; }
  paper={ code:code, lesson:k,
          /* shuffled so the order is not learnt, fixed so the answer column
             beside it still lines up with what he was actually asked */
          items:shuffled(set).map(function(x){
            return {h:x[0], a:x[1], tone:x[2], word:x[3], m:x[4]};
          }),
          shown:false };
  render(); scrollTo(0,0);
}
/* The word with the character he has to write picked out of it. */
function paperWord(it){
  var wd=String(it.word||it.h), tgt=String(it.h), at=wd.indexOf(tgt);
  if(at<0) return '<b>'+esc(tgt)+'</b>';
  return esc(wd.slice(0,at))+'<b>'+esc(tgt)+'</b>'+esc(wd.slice(at+tgt.length));
}
/* Which character of the word he is being asked for — used Reading out \u5e94\u8be5 alone
   wherever a word is read out, not only on the paper sheet.
   does not say whether to write \u5e94 or \u8be5, and \u5bb9\u6613 does not say \u5bb9 or \u6613 \u2014 the
   word is only there to fix the sound and the meaning. Chinese has one phrase
   for exactly this and every teacher uses it: \u300c\u5bb9\u6613\u300d\u7684\u300c\u5bb9\u300d, the r\u00f3ng of r\u00f3ngy\u00ec.
   A word that is a single character on its own \u2014 \u5462 \u2014 has nothing to pick out,
   so it is just said twice. */
function cueFor(it){
  /* The full stop has to come off before comparing, or SC's 马儿跑得快。 does
     not match the 马儿跑得快 he has to write and the cue comes out as
     “马儿跑得快。的马儿跑得快” — a sentence picking itself out of itself. */
  var wd=String(it.word||it.h).replace(/[。！？，、]/g,""),
      tgt=String(it.h);
  /* nothing to pick out when the word IS the answer, or is not in it at all */
  if(wd===tgt || wd.indexOf(tgt)<0) return tgt;
  return wd+"的"+tgt;
}
function paperHTML(){
  var q=paper, n=q.items.length;
  return '<div class="panel"><div class="qtop">'+
    '<button class="btn soft" id="pB">&larr; Back</button>'+
    '<span class="hudchips"><span class="hud">'+n+' \u5b57</span></span></div>'+
    '<h2><span class="em">\u270D\uFE0F</span> \u9ed8\u5199 '+esc(q.lesson)+
      '<span class="side">on paper</span></h2>'+
    '<p class="papertip">Read out the line in quotes \u2014 the word, then which '+
      'character of it he writes, the way the teacher says it: \u201c\u5bb9\u6613\u201d\u7684\u201c\u5bb9\u201d. '+
      'He writes the <b>bold</b> one on paper. Tap a row to hear it. Nothing here '+
      'is marked, so mark the paper with a pen.</p>'+
    '<ol class="psheet'+(q.shown?"":" hide")+'" lang="zh-CN">'+
      q.items.map(function(it,i){
        return '<li class="prow" data-say="'+i+'">'+
          '<span class="pw">'+paperWord(it)+'</span>'+
          /* the exact words to read out, so you are not working it out mid-test */
          '<span class="psay">\u201c'+esc(cueFor(it))+'\u201d</span>'+
          '<span class="pm"><b>'+esc(pinyinMark(it.a,it.tone))+'</b>'+
            (pinyinMark(it.a,it.tone)!==String(it.a||"")
              ? ' <span class="pnum">'+esc(String(it.a||"")+String(it.tone||""))+'</span>' : '')+
            (it.m?' \u00b7 '+esc(it.m):'')+'</span>'+
          '<span class="pspk" aria-hidden="true">\uD83D\uDD0A</span></li>';
      }).join("")+'</ol>'+
    (q.shown ? '' :
      '<p class="empty" style="text-align:center">The list is covered so he cannot '+
      'read it over your shoulder.</p>')+
    '<div class="btnrow">'+
      '<button class="btn '+(q.shown?"soft":"go")+'" id="pShow">'+
        (q.shown?"\uD83D\uDC41 Cover the list":"\uD83D\uDC41 Show me the list")+'</button>'+
      '<button class="btn go" id="pDone">Done \u2192</button>'+
    '</div></div>';
}
function wirePaper(){
  var q=paper;
  document.getElementById("pB").onclick=function(){ paper=null; go("practice"); };
  document.getElementById("pShow").onclick=function(){ q.shown=!q.shown; sfxTap(); render(); };
  document.getElementById("pDone").onclick=function(){
    /* No score \u2014 only that it happened, so the grey box can carry a date. */
    markReadOut(q.code);
    paper=null; sfxDone(); go("practice");
  };
  document.querySelectorAll("[data-say]").forEach(function(row){
    row.onclick=function(){
      var it=q.items[+row.dataset.say];
      hush(); sfxTap();
      /* The way a teacher dictates: the word so the sound and meaning are
         fixed, then which character of it to write, a gap long enough to
         write in, then that again more slowly. It used to say only the word,
         twice \u2014 which for \u5e94\u8be5 left him guessing between \u5e94 and \u8be5. */
      var cue=cueFor(it);
      say(it.word,0.85,"zh-CN");
      sayLater(function(){ say(cue,0.72,"zh-CN"); }, 1500);
      sayLater(function(){ say(cue,0.62,"zh-CN"); }, 4600);
    };
  });
}

/* ==========================================================================
   MATHS — Primary 2, following the MOE 2021 primary syllabus (Oct 2025).
   One set per sub-strand, so a red box points at a topic he needs rather
   than at a bag of mixed sums. Everything here is on the P2 syllabus except
   the last set, which reaches into P3 and says so on the box, so a low score
   there is never mistaken for falling behind.
   ========================================================================== */
function rnd(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function maPick(a){ return a[Math.floor(Math.random()*a.length)]; }

var MA_SETS = [
  ["nums",    "Numbers to 1000",  "Place value, comparing, patterns, odd and even"],
  ["addsub",  "Add and subtract", "Up to 3 digits, with renaming"],
  ["times",   "Times tables",     "2, 3, 4, 5 and 10 \u2014 both ways"],
  ["frac",    "Fractions",        "Unit and like fractions"],
  ["money",   "Money",            "Dollars, cents and change"],
  ["time",    "Time",             "To the minute, and how long"],
  ["measure", "Measuring",        "Length, mass and volume"],
  ["reach",   "Next year",        "P3 tables \u2014 6, 7, 8 and 9"]
];
function maName(k){
  for(var i=0;i<MA_SETS.length;i++) if(MA_SETS[i][0]===k) return MA_SETS[i][1];
  return k;
}
/* Numbers in words, Singapore style: four hundred and sixty-two. */
var MA_ONES=["zero","one","two","three","four","five","six","seven","eight","nine","ten",
  "eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
var MA_TENS=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
function numWords(n){
  if(n<20) return MA_ONES[n];
  if(n<100){ var t=Math.floor(n/10), o=n%10; return MA_TENS[t]+(o?"-"+MA_ONES[o]:""); }
  var h=Math.floor(n/100), r=n%100;
  return MA_ONES[h]+" hundred"+(r?" and "+numWords(r):"");
}
/* one thirds, one quarters — the plain names a P2 child reads on the page */
function fracWord(d){
  return {2:"halves",3:"thirds",4:"quarters",5:"fifths",6:"sixths",7:"sevenths",
          8:"eighths",9:"ninths",10:"tenths",11:"elevenths",12:"twelfths"}[d];
}
function gcd(x,y){ x=Math.abs(x); y=Math.abs(y); while(y){ var t=y; y=x%y; x=t; } return x||1; }
/* Every fraction answer, plus the same fraction in its simplest form, because
   that is the form the school asks for and the one he is most likely to give. */
function fracAlts(n,d){
  var out=[], g=gcd(n,d);
  if(g>1) out.push((n/g)+"/"+(d/g));
  if(n===d) out.push("1");
  if(n===0) out.push("0");
  return out;
}
function money(c){ return "$"+(c/100).toFixed(2); }
function hhmm(m){
  m=((m%720)+720)%720; var h=Math.floor(m/60); if(h===0) h=12;
  return h+":"+String(m%60).padStart(2,"0");
}

/* q     what he is asked
   a     the answer, exactly as it should read
   alt   other spellings that are just as right
   w     a question in words, so no " = ?" is tacked on the end
   im    keyboard: numbers unless the answer has letters in it            */
function maQ(q,a,o){
  var it={k:"math", q:q, a:String(a)};
  if(o){ if(o.alt) it.alt=o.alt; if(o.w) it.w=1; if(o.im) it.im=o.im; if(o.ph) it.ph=o.ph; }
  return it;
}

function maNums(){
  switch(rnd(1,7)){
    case 1: {
      var n=rnd(102,999), p=maPick(["hundreds","tens","ones"]);
      var d = p==="hundreds"?Math.floor(n/100) : p==="tens"?Math.floor(n/10)%10 : n%10;
      return maQ("In "+n+", which digit is in the "+p+" place?", d, {w:1});
    }
    case 2: {
      var h=rnd(1,9), t=rnd(1,9), o=rnd(1,9);
      return maQ(h*100+" + "+t*10+" + "+o, h*100+t*10+o);
    }
    case 3: {
      var n=rnd(101,999);
      return maQ("Write this in numerals: "+numWords(n), n, {w:1});
    }
    case 4: {
      var a=rnd(120,899), b=a+maPick([-1,1])*maPick([9,11,90,99,101]);
      if(b<100||b>999||b===a) b=a+9;
      var big=maPick([0,1]);
      return maQ("Which number is "+(big?"greater":"smaller")+", "+a+" or "+b+"?",
                 big?Math.max(a,b):Math.min(a,b), {w:1});
    }
    case 5: {
      /* P2 stops at 1000, so the whole run and its answer must fit inside it */
      var st=maPick([2,3,5,10,25,100]), top=Math.floor(1000/st), up=maPick([0,1]);
      var s = up ? rnd(1, Math.max(1, top-3))*st : rnd(4, top)*st;
      var seq=[s, up?s+st:s-st, up?s+2*st:s-2*st];
      return maQ("What comes next?  "+seq.join(", ")+", ___",
                 up?seq[2]+st:seq[2]-st, {w:1});
    }
    case 6: {
      var n=rnd(100,999);
      return maQ("Is "+n+" odd or even?", n%2?"odd":"even", {w:1, im:"text", ph:"odd or even"});
    }
    default: {
      var n=rnd(120,880), j=maPick([1,10,100]), more=maPick([0,1]);
      return maQ("What is "+j+" "+(more?"more than":"less than")+" "+n+"?",
                 more?n+j:n-j, {w:1});
    }
  }
}

function maAddSub(){
  switch(rnd(1,5)){
    case 1: {  /* renaming in at least one column, which is the whole point */
      var a=rnd(115,650), b=rnd(115,340);
      if((a%10)+(b%10)<10) b+=10-((a%10)+(b%10));
      return maLadQ(a+" + "+b, a+b);
    }
    case 2: {
      var a=rnd(200,999), b=rnd(105,a-20);
      if((a%10)>=(b%10)) b+=(a%10)-(b%10)+1;
      if(b>=a) b=a-13;
      return maQ(a+" \u2212 "+b, a-b);
    }
    case 3: {  /* the mental one the syllabus names: 3 digits and ones/tens/hundreds.
                  Pick what is being added first, then a number that leaves the
                  answer inside 1000, which is as far as P2 goes. */
      var plus=maPick([0,1]), b=maPick([rnd(2,9), rnd(1,8)*10, rnd(1,7)*100]);
      var a = plus ? rnd(210, 1000-b) : rnd(b+110, 999);
      return maQ(a+(plus?" + ":" \u2212 ")+b, plus?a+b:a-b);
    }
    case 4: {
      var s=rnd(300,900), a=rnd(120,s-60);
      return maQ("What goes in the blank?  "+a+" + ___ = "+s, s-a, {w:1});
    }
    default: {
      var a=rnd(150,700), b=rnd(120,290), c=rnd(20,90);
      return maQ(a+" + "+b+" \u2212 "+c, a+b-c);
    }
  }
}

/* Every question here lives inside the tables of 2, 3, 4, 5 and 10.
   That is the whole of P2 multiplication, and nothing beyond it. */
var MA_TABLES=[2,3,4,5,10];
function maTimes(){
  var t=maPick(MA_TABLES), n=rnd(2,10);
  switch(rnd(1,4)){
    case 1: return maQ(maPick([0,1]) ? t+" \u00d7 "+n : n+" \u00d7 "+t, t*n);
    case 2: return maQ((t*n)+" \u00f7 "+t, n);
    case 3: return maQ("What goes in the blank?  "+t+" \u00d7 ___ = "+(t*n), n, {w:1});
    default:
      return maQ(t+" \u00d7 "+n+" = "+(t*n)+".  So what is "+(t*n)+" \u00f7 "+n+"?", t, {w:1});
  }
}

function maFrac(){
  var d=rnd(2,12);
  switch(rnd(1,6)){
    case 1: {
      var n=rnd(1,d-1);
      return maQ("A cake is cut into "+d+" equal parts.  "+n+
                 " part"+(n>1?"s are":" is")+" eaten.  What fraction is eaten?",
                 n+"/"+d, {w:1, im:"text", ph:"3/8"});
    }
    case 2: {
      var e=rnd(2,12); while(e===d) e=rnd(2,12);
      var big=maPick([0,1]), lo=Math.min(d,e), hi=Math.max(d,e);
      /* the smaller the bottom number, the bigger the piece */
      return maQ("Which is "+(big?"bigger":"smaller")+", 1/"+d+" or 1/"+e+"?",
                 "1/"+(big?lo:hi), {w:1, im:"text", ph:"1/4"});
    }
    case 3: {
      var dd=rnd(3,12), a=rnd(1,dd-2), b=rnd(1,dd-a-1)+0;
      if(a+b>=dd) b=dd-a-1;
      if(b<1){ a=1; b=1; }
      /* Subtraction always accepted the simplified answer; addition never did,
         so 1/8 + 3/8 wanted 4/8 and a boy who wrote 1/2 — the form the school
         actually asks for — was told he was wrong. */
      return maQ(a+"/"+dd+" + "+b+"/"+dd, (a+b)+"/"+dd,
                 {im:"text", ph:"5/7", alt:fracAlts(a+b,dd)});
    }
    case 4: {
      /* a stops one short of the bottom number: P2 works within one whole, so
         10/10 - 2/10 was a question off his syllabus dressed up as one on it */
      var dd=rnd(3,12), a=rnd(2,dd-1), b=rnd(1,a-1);
      return maQ(a+"/"+dd+" \u2212 "+b+"/"+dd, (a-b)+"/"+dd,
                 {im:"text", ph:"3/9", alt:fracAlts(a-b,dd)});
    }
    case 5:
      return maQ("How many "+fracWord(d)+" make one whole?", d, {w:1});
    default: {
      var dd=rnd(4,12), s=[], u={};
      while(s.length<3){ var n=rnd(1,dd-1); if(!u[n]){ u[n]=1; s.push(n); } }
      var big=maPick([0,1]);
      var want = big?Math.max.apply(null,s):Math.min.apply(null,s);
      return maQ("Which is "+(big?"the largest":"the smallest")+": "+
                 s.map(function(n){ return n+"/"+dd; }).join(", ")+"?",
                 want+"/"+dd, {w:1, im:"text", ph:"3/8"});
    }
  }
}

function maMoney(){
  switch(rnd(1,5)){
    case 1: {
      var c=rnd(105,995);
      return maQ("How many cents is "+money(c)+"?", c, {w:1});
    }
    case 2: {
      var c=rnd(105,995);
      return maQ("Write "+c+" cents in dollars.", money(c),
                 {w:1, im:"text", ph:"$1.20", alt:[(c/100).toFixed(2)]});
    }
    case 3: {
      var a=rnd(105,600), b=rnd(105,395);
      if((a%10)+(b%10)<10) b+=10-((a%10)+(b%10));
      return maQ(money(a)+" + "+money(b), money(a+b),
                 {im:"text", ph:"$7.15", alt:[((a+b)/100).toFixed(2)]});
    }
    case 4: {
      var paid=maPick([500,1000,2000]), cost=rnd(105,paid-40);
      return maQ("He pays "+money(paid)+" for a book costing "+money(cost)+
                 ".  How much change does he get?", money(paid-cost),
                 {w:1, im:"text", ph:"$3.60", alt:[((paid-cost)/100).toFixed(2)]});
    }
    default: {
      var a=rnd(105,900), b=a+maPick([-1,1])*maPick([5,45,50,90]);
      if(b<100) b=a+45;
      var more=maPick([0,1]);
      return maQ("Which is "+(more?"more":"less")+", "+money(a)+" or "+money(b)+"?",
                 money(more?Math.max(a,b):Math.min(a,b)),
                 {w:1, im:"text", ph:"$5.50",
                  alt:[((more?Math.max(a,b):Math.min(a,b))/100).toFixed(2)]});
    }
  }
}

function maTime(){
  switch(rnd(1,5)){
    case 1: {
      var h=rnd(1,5), m=rnd(1,59);
      return maQ("How many minutes is "+h+" h "+m+" min?", h*60+m, {w:1});
    }
    case 2: {
      var t=rnd(70,340);
      return maQ("Write "+t+" minutes in hours and minutes.",
                 Math.floor(t/60)+" h "+(t%60)+" min",
                 {w:1, im:"text", ph:"3 h 20 min",
                  alt:[Math.floor(t/60)+"h"+(t%60)]});
    }
    case 3: {
      var s=rnd(8,10)*60+rnd(0,55), d=rnd(15,55);
      return maQ("A lesson starts at "+hhmm(s)+" am and ends at "+hhmm(s+d)+
                 " am.  How many minutes long is it?", d, {w:1});
    }
    case 4: {
      var s=rnd(1,10)*60+rnd(0,55), d=rnd(10,55);
      return maQ("It is "+hhmm(s)+".  What time will it be in "+d+" minutes?",
                 hhmm(s+d), {w:1, im:"text", ph:"4:05",
                 alt:[hhmm(s+d).replace(":",".")]});
    }
    default: {
      var h=rnd(1,4), m=maPick([5,10,15,20,25,30,40,45,50]);
      return maQ("How many minutes is "+h+" h "+m+" min?", h*60+m, {w:1});
    }
  }
}

function maMeasure(){
  switch(rnd(1,5)){
    case 1: {
      var x=maPick([["an apple","g",["gram","grams"]],["a bag of rice","kg",["kilogram","kilograms","kilo","kilos"]],
                    ["a school bag","kg",["kilogram","kilograms","kilo","kilos"]],["a coin","g",["gram","grams"]]]);
      return maQ("Which unit would you use for the mass of "+x[0]+" \u2014 g or kg?",
                 x[1], {w:1, im:"text", ph:"g or kg", alt:x[2]});
    }
    case 2: {
      var a=rnd(2,9), b=rnd(2,9);
      return maQ("A jug holds "+a+" \u2113 and a pail holds "+b+
                 " \u2113.  How many litres altogether?", a+b, {w:1});
    }
    case 3: {
      var a=rnd(120,900), b=rnd(120,900); while(b===a) b=rnd(120,900);
      var hv=maPick([0,1]);
      return maQ("Which is "+(hv?"heavier":"lighter")+", "+a+" g or "+b+" g?",
                 (hv?Math.max(a,b):Math.min(a,b))+" g",
                 {w:1, im:"text", ph:"520 g", alt:[String(hv?Math.max(a,b):Math.min(a,b))]});
    }
    case 4: {
      var a=rnd(6,20), b=rnd(2,a-2);
      return maQ("A ribbon is "+a+" m long.  "+b+
                 " m is cut off.  How many metres are left?", a-b, {w:1});
    }
    default: {
      /* The answer used to be \u2113, U+2113, which no iPad or Windows keyboard can
         produce \u2014 so "l", "L" and "litres" were all marked wrong and the
         question could not be got right by anybody. It is asked in the letters
         he can actually reach, and every reasonable spelling is accepted. */
      var x=maPick([["a bottle of water","l",["\u2113","litre","litres","liter","liters"]],
                    ["the length of a classroom","m",["metre","metres","meter","meters"]],
                    ["a pencil","cm",["centimetre","centimetres","centimeter","centimeters"]]]);
      return maQ("Which unit fits "+x[0]+" \u2014 cm, m or l (litres)?", x[1],
                 {w:1, im:"text", ph:"cm, m or l", alt:x[2]});
    }
  }
}

/* The stretch set. Off the P2 syllabus on purpose — these are the tables
   he meets in P3 — so the box is labelled next year and a poor score there
   means nothing has gone wrong. */
function maReach(){
  var t=maPick([6,7,8,9]), n=rnd(2,10);
  switch(rnd(1,3)){
    case 1: return maQ(maPick([0,1]) ? t+" \u00d7 "+n : n+" \u00d7 "+t, t*n);
    case 2: return maQ((t*n)+" \u00f7 "+t, n);
    default: return maQ("What goes in the blank?  "+t+" \u00d7 ___ = "+(t*n), n, {w:1});
  }
}

function mathItems(kind){
  var gen = {nums:maNums, addsub:maAddSub, times:maTimes, frac:maFrac,
             money:maMoney, time:maTime, measure:maMeasure, reach:maReach}[kind] || maNums;
  var o=[], seen={};
  /* ten different questions: a repeat inside one round reads as a mistake */
  for(var guard=0; o.length<10 && guard<200; guard++){
    var it=gen();
    if(seen[it.q]) continue;
    seen[it.q]=1; o.push(it);
  }
  return o;
}

/* Numbers can be written more than one way and still be right: $3.60 or 3.6,
   3 h 20 min or 3h20. Compare what they mean, not how it was typed. */
function maNorm(s){
  /* Anchored on word boundaries: without them "min" matched inside "minus",
     so a typed "minus 5" normalised to "mus5" and could never be right. */
  return String(s||"").toLowerCase()
    .replace(/\b(hours?|hrs?)\b/g,"h").replace(/\b(minutes?|mins?)\b/g,"m")
    .replace(/\u2113/g,"l")
    .replace(/[\s,$]/g,"").replace(/[.\u3002]+$/,"");
}
function mathOK(given, it){
  var g=maNorm(given), opts=[it.a].concat(it.alt||[]);
  for(var i=0;i<opts.length;i++){
    var w=maNorm(opts[i]);
    if(g===w) return true;
    if(/^-?\d+(\.\d+)?$/.test(g) && /^-?\d+(\.\d+)?$/.test(w) &&
       Math.abs(parseFloat(g)-parseFloat(w))<1e-9) return true;
  }
  return false;
}

/* What a practice code opens, for labelling the button on Upcoming. */
function practiceLabel(code){
  var p=String(code).split("|");
  if(p[0]==="en") return "List "+p[1];
  if(p[0]==="hz") return "\u6211\u4f1a\u5199 "+p[1];
  if(p[0]==="rn") return "\u6211\u4f1a\u8ba4 "+p[1];
  if(p[0]==="tx") return "\u542c\u5199 "+p[1];
  if(p[0]==="ma") return "Maths \u00b7 "+maName(p[1]);
  return p[1];
}

/* Replay a specific set of items — used straight after a test, and by Review. */
/* One mark per character the answer needs. A four-character phrase with one
   slip should not score the same as a blank. */
function itemMarks(it){
  return it.k==="bd" ? Math.max(1, String(it.h||"").length) : 1;
}
function totalMarks(items){
  var n=0; (items||[]).forEach(function(it){ n+=itemMarks(it); }); return n;
}

function startItems(items, test, subject, lang, code){
  if(!items || !items.length) return;
  quiz={code:code||"review", subject:subject||"Review", test:test, lang:lang||"en-GB",
        items:shuffled(items),
        i:0,score:0,streak:0,best:0,missed:[],wrong:[],graded:false,done:false,review:true};
  quiz.total=totalMarks(quiz.items);
  render(); scrollTo(0,0);
}
/* Everything this child has got wrong before, hardest first. */
function startWeak(){
  var a=weakTop(who(), 12).map(function(x){ return x.it; }).filter(Boolean)
    /* Entries left over from the handwriting days have no pinyin and no tiles
       banked, so they cannot be asked at all. Drop them rather than show an
       unanswerable one. */
    .filter(function(i){ return i && i.k!=="tx" && i.k!=="hz" && i.k!=="py"; });
  if(!a.length) return;
  var cn=a.every(function(i){ return i.k==="hz"||i.k==="rn"||i.k==="py"||(i.k==="bd"&&i.lesson); });
  startItems(a, "Review \u00b7 tricky ones", "Review", cn?"zh-CN":"en-GB", "weak");
}

/* Everything a code opens: the questions, what to call it, which voice.
   Kept apart from start() so the daily set can borrow from several at once. */
function itemsFor(code, kid){
  kid = kid || who();
  var p=String(code).split("|"), k=p[1], items, subject, test, lang="en-GB";
  try{
    /* Shuffled like every other list. In printed order he learns the running
       order as much as the words, and a run of eight right in a row says less
       than it looks. */
    if(p[0]==="en"){ subject="English"; test="Spelling "+k;
      items=shuffled(TC_SPELL[k][1]).map(function(x){ return {k:x[0],s:x[1],a:x[2]}; }); }
    else if(p[0]==="es"){ subject="English"; test=k;
      items=shuffled(SC_SPELL[k][1]).map(function(x){ return {k:x[0],s:x[1],a:x[2]}; }); }
    else if(p[0]==="hz"){
      subject="\u534e\u6587"; test="\u6211\u4f1a\u5199 "+k; lang="zh-CN";
      var set=HANZI[k];
      /* HANZI stores [char, pinyin, tone, word, meaning]; the build question
         wants the cue word in .word and the characters to find in .h */
      items=shuffled(set).map(function(x){
        return {k:"bd", h:x[0], a:x[1], tone:x[2], word:x[3], m:x[4], lesson:k};
      });
    }
    else if(p[0]==="rn"){
      subject="\u534e\u6587"; test="\u6211\u4f1a\u8ba4 "+k; lang="zh-CN";
      var rb=(typeof RECOG!=="undefined" && RECOG[k]) ? RECOG[k] : HANZI[k];
      items=shuffled(rb).map(function(x){
        return {k:"rn", h:x[0], a:x[1], tone:x[2], word:x[3], m:x[4], lesson:k};
      });
    }
    else if(p[0]==="tx"){
      /* The school sheet: a whole sentence with the tested characters knocked
         out. He has to work out which word belongs in the gap, not just how to
         write a character he has already been handed. */
      subject="\u534e\u6587"; test="\u542c\u5199 "+k; lang="zh-CN";
      items=shuffled(TC_TINGXIE[k])
        .map(function(x){
          var full="", j=0;
          for(var i=0;i<x[0].length;i++){
            full += x[0].charAt(i)==="\u25a1" ? x[1].charAt(j++) : x[0].charAt(i);
          }
          return {k:"bd", s:x[0], h:x[1], word:full, a:"", tone:"", m:"", lesson:k};
        });
    }
    else if(p[0]==="zh"){ subject="\u534e\u6587"; test=k; lang="zh-CN";
      /* Both boys type the pinyin, same format, tones included. SC used to
         write the characters on the pad, but that needed marking by hand and
         was easy to get backwards. */
      var bank = kid==="tc" ? TC_PINYIN : SC_TINGXIE;
      items=shuffled(bank[k])
        .map(function(x){ return {k:"bd",h:x[0],word:x[1],a:x[2],tone:x[3],m:x[4],lesson:k}; });
    }
    else if(p[0]==="ma"){ subject="Math"; test="Math \u00b7 "+maName(k);
      items=mathItems(k); }
  }catch(e){ return null; }
  if(!items || !items.length) return null;
  return {items:items, subject:subject, test:test, lang:lang};
}

function start(code){
  if(code==="weak")  return startWeak();
  if(code==="daily") return startDaily(who());
  /* 默写 is not a quiz: it opens a reading list, not a question. */
  if(String(code).indexOf("mo|")===0) return startPaper(code);
  var q=itemsFor(code);
  if(!q){ alert("That list is not in the app any more."); return; }
  quiz={code:code,subject:q.subject,test:q.test,lang:q.lang,items:q.items,
        i:0,score:0,streak:0,best:0,missed:[],graded:false,done:false};
  quiz.total=totalMarks(quiz.items);
  render(); scrollTo(0,0);
}

/* ==========================================================================
   TODAY'S TEN MINUTES
   A mixed set built without anyone having to choose: what a test is coming up
   for, what keeps going wrong, and one list never tried. Ten questions.
   ========================================================================== */
function dueCodes(kid){
  return SJ("events",[]).filter(function(e){
      return e.p && e.w===kid && !evState(e).gone;
    }).sort(function(a,b){ return evState(a).start-evState(b).start; })
    .map(function(e){ return e.p; });
}
function allCodes(kid){
  var out=[];
  if(hasSubj(kid,"en")) Object.keys(kid==="tc"?TC_SPELL:SC_SPELL).forEach(function(k){ out.push((kid==="tc"?"en|":"es|")+k); });
  /* TC's 词表 lists are off the screen, so they stay out of the daily set too. */
  if(kid!=="tc") Object.keys(SC_TINGXIE).forEach(function(k){ out.push("zh|"+k); });
  if(kid==="tc") Object.keys(HANZI).forEach(function(k){
    out.push("rn|"+k); out.push("hz|"+k);   /* the sheets are parked: see tColumn */
  });
  if(hasSubj(kid,"ma")) MA_SETS.forEach(function(m){ out.push("ma|"+m[0]); });
  return out;
}
function untriedCodes(kid){
  return allCodes(kid).filter(function(c){
    var q=itemsFor(c, kid);
    return q && !lastFor(q.test, kid);
  });
}
function some(items, n){
  return shuffled(items).slice(0,n);
}
/* What the button says before it is pressed, so it is never a mystery box. */
function dailyPlan(kid){
  var due=dueCodes(kid), weak=weakTop(kid,8), untried=untriedCodes(kid);
  return {due:due, weak:weak, untried:untried,
          any: !!(due.length || weak.length || untried.length)};
}
/* The set itself, each question tagged with where it came from, so the button
   can describe exactly what it is about to hand over. Ten is the target; if
   there is genuinely less than that to practise, it says the smaller number
   rather than pretending. */
function buildDaily(kid){
  var plan=dailyPlan(kid), out=[], seen={};
  function push(list, from){
    (list||[]).forEach(function(it){
      if(!it || out.length>=10) return;
      var k=weakKey(it); if(seen[k]) return;
      seen[k]=1; it.from=from; out.push(it);
    });
  }
  /* four from each of the two things being tested soonest */
  plan.due.slice(0,2).forEach(function(c){
    if(out.length>=10) return;
    var q=itemsFor(c, kid); if(q) push(some(q.items, 4), "due");
  });
  /* the ones he keeps getting wrong */
  push(some(plan.weak.map(function(x){ return x.it; }).filter(Boolean),
            Math.min(4, 10-out.length)), "weak");
  /* something never tried */
  if(out.length<10 && plan.untried.length){
    var q2=itemsFor(some(plan.untried,1)[0], kid);
    if(q2) push(some(q2.items, 10-out.length), "untried");
  }
  /* still short: top it up from anywhere, taking a fresh list each time rather
     than giving up at six and handing over a half-length set */
  var guard=0;
  while(out.length<10 && guard++<8){
    var q3=itemsFor(some(allCodes(kid),1)[0], kid);
    if(q3) push(some(q3.items, 10-out.length), "any");
  }
  return out;
}
function startDaily(kid){
  kid=kid||who();
  W("who", kid);
  var items=buildDaily(kid);
  if(!items.length){ alert("Nothing to practise yet."); return; }
  var cn=items.every(function(i){ return i.k==="hz"||i.k==="rn"||i.k==="py"||(i.k==="bd"&&i.lesson); });
  startItems(items, "Today \u00b7 ten minutes", "Review", cn?"zh-CN":"en-GB", "daily");
}

function clean(s){ return String(s||"").toLowerCase()
  .replace(/[.,!?;:'"\u2018\u2019\u201c\u201d]/g,"").replace(/\s+/g," ").trim(); }
/* A dictation sentence is marked on its punctuation and its capital letter as
   well as its spelling \u2014 those carry marks on the real paper. clean() threw all
   of it away, so "he frowned with concern" scored the same as the right
   answer. Curly quotes and apostrophes are still folded to straight ones,
   because which one the keyboard produced is not the child's doing. */
function cleanDict(s){
  return String(s||"")
    .replace(/[\u2018\u2019]/g,"'").replace(/[\u201c\u201d]/g,'"')
    .replace(/\s+/g," ").trim();
}
/* What he got wrong in a sentence, so the feedback can say more than "no". */
function dictSlip(given, want){
  var g=cleanDict(given), w=cleanDict(want);
  if(g===w) return "";
  if(g.toLowerCase()===w.toLowerCase()) return "Check the capital letters.";
  if(g.replace(/[.,!?;:']/g,"")===w.replace(/[.,!?;:']/g,"")) return "The words are right \u2014 check the punctuation.";
  return "";
}
/* A dictation sentence marked as ONE sentence: the one he was meant to write,
   with the words he did not get picked out in red, and anything he put in that
   does not belong struck through where he put it.

   It used to print his sentence underneath the right one and leave a
   seven-year-old to compare two lines of similar-looking text — which is
   exactly the job he has just failed at. The single words have been marked
   letter by letter since the beginning (ltRow, below); this is the same idea a
   word at a time.

   Aligned by longest common subsequence rather than word against word from the
   left: one word missing near the start shifted everything after it, turned
   the whole sentence red, and told him nothing about what he actually got
   wrong. A dictation sentence is a dozen words at most, so the table costs
   nothing. */
function dictWords(s){
  return cleanDict(s).split(" ").filter(function(x){ return x.length>0; });
}
function dictRow(want, got){
  var A=dictWords(want), B=dictWords(got), n=A.length, m=B.length, i, j;
  var L=[];
  for(i=0;i<=n;i++){ L.push([]); for(j=0;j<=m;j++) L[i].push(0); }
  for(i=n-1;i>=0;i--){
    for(j=m-1;j>=0;j--){
      L[i][j] = (A[i]===B[j]) ? L[i+1][j+1]+1 : Math.max(L[i+1][j], L[i][j+1]);
    }
  }
  var out='<div class="wds">';
  i=0; j=0;
  while(i<n && j<m){
    if(A[i]===B[j]){ out+='<span class="wd">'+esc(A[i])+'</span>'; i++; j++; }
    else if(L[i+1][j]>=L[i][j+1]){ out+='<span class="wd miss">'+esc(A[i])+'</span>'; i++; }
    else { out+='<span class="wd extra">'+esc(B[j])+'</span>'; j++; }
  }
  while(i<n){ out+='<span class="wd miss">'+esc(A[i])+'</span>'; i++; }
  while(j<m){ out+='<span class="wd extra">'+esc(B[j])+'</span>'; j++; }
  return out+'</div>';
}

function ltRow(t,g){ var h='<div class="lts">';
  t.split("").forEach(function(c,k){
    var ok=g[k]!==undefined&&g[k].toLowerCase()===c.toLowerCase();
    h+='<span class="lt '+(ok?"h":"s")+'">'+(c===" "?"&nbsp;":c)+'</span>'; });
  return h+'</div>'; }


/* ==========================================================================
   BUILD IT — the one Chinese mechanic both boys use. He hears the whole word,
   sees it with the tested characters blanked, and taps them back in order.
   No pinyin, no keyboard, no writing.
   ========================================================================== */
function bdSlots(it){ return String(it.h||"").split(""); }
/* The cue word with the tested characters knocked out. 小蛇 -> 小 □ */
function bdMasked(it, filled){
  /* A 听写 sentence carries its own gaps, which need not be next to each other:
     昨天□上，我□见妈妈送给我一只小白□。 */
  if(it.s){
    var out="", j=0;
    for(var i=0;i<it.s.length;i++){
      var ch=it.s.charAt(i);
      if(ch==="\u25a1"){
        var got=(filled||[])[j];
        out+='<button type="button" class="bslot'+(got?" on":"")+'" data-slot="'+j+'"'+
             (got?' title="Tap to clear this one" aria-label="Gap '+(j+1)+', '+esc(got)+
                  '. Tap to clear."':' aria-label="Gap '+(j+1)+', empty"')+'>'+
             (got?esc(got):"\u25a1")+'</button>';
        j++;
      } else out+='<span class="bfix">'+esc(ch)+'</span>';
    }
    return out;
  }
  var wd=String(it.word||it.h), tgt=String(it.h||""), at=wd.indexOf(tgt);
  if(at<0){ wd=tgt; at=0; }
  var out="";
  for(var i=0;i<wd.length;i++){
    if(i>=at && i<at+tgt.length){
      var j=i-at, got=(filled||[])[j];
      out+='<button type="button" class="bslot'+(got?" on":"")+'" data-slot="'+j+'"'+
           (got?' title="Tap to clear this one"':'')+'>'+(got?esc(got):"\u25a1")+'</button>';
    } else out+='<span class="bfix">'+esc(wd.charAt(i))+'</span>';
  }
  return out;
}
/* Tiles: the right characters plus a few from his own bank, so everything on
   screen is something he is actually learning. */
function bdTiles(it){
  if(it.tiles) return it.tiles;
  var need=bdSlots(it), seen={}, pool=[];
  need.forEach(function(c){ seen[c]=1; });
  /* Only ever his own characters — a K2 tile in a P2 question, or the reverse,
     is rejected on sight and teaches nothing. */
  var banks=[];
  if(who()==="sc"){
    if(typeof SC_TINGXIE!=="undefined" && SC_TINGXIE) banks.push(SC_TINGXIE);
  } else {
    if(typeof TC_PINYIN!=="undefined" && TC_PINYIN) banks.push(TC_PINYIN);
    if(typeof HANZI!=="undefined" && HANZI)         banks.push(HANZI);
    if(typeof RECOG!=="undefined" && RECOG)         banks.push(RECOG);
  }
  var near=[], far=[];
  banks.forEach(function(b){
    Object.keys(b).forEach(function(k){
      (b[k]||[]).forEach(function(x){
        String(x[0]||"").split("").forEach(function(c){
          if(!c || seen[c]) return; seen[c]=1;
          (k===it.lesson ? near : far).push(c);
        });
      });
    });
  });
  function shuffle(a){ return shuffled(a); }
  var extra = it.s ? 4 : Math.min(4, Math.max(2, 7-need.length));
  var d=shuffle(near).concat(shuffle(far)).slice(0, extra);
  it.tiles=shuffle(need.concat(d));
  return it.tiles;
}
/* One entry per gap, held apart from the others. It used to be a dense list
   that tiles were pushed on to and spliced out of, so clearing the FIRST gap
   of 前总丢 slid 总 into it and emptied the last one — correcting one
   character quietly rewrote the other two. */
function bdFilled(){ return (quiz.bd||[]).slice(); }
function bdNextGap(it){
  var need=bdSlots(it).length, f=quiz.bd||[];
  for(var i=0;i<need;i++){ if(!f[i]) return i; }
  return -1;
}
/* What he handed in, gap by gap, with a marker where he left one empty so the
   marking never slides a later answer into an earlier gap's place. */
function bdAnswer(it){
  var need=bdSlots(it).length, f=quiz.bd||[], out=[];
  for(var i=0;i<need;i++) out.push(f[i]||"\u3000");
  return out.join("");
}

/* ==========================================================================
   REMOVED: stroke tracing, the writing pad and hand-marking.
   handwritten() returned false unconditionally, so writing(), tracing(),
   wireTrace(), wirePad*(), wireMarks() and loadStrokes() could never run, and
   strokes.js and hanzi-writer.min.js were never fetched. hzOpts() and pyOpts()
   went the same way: every Chinese question now arrives as k:"bd" or k:"rn",
   so the k:"hz"/"py"/"tx" branches they served were unreachable too.
   Nothing in the app is written by hand any more — 我会写 is answered on screen
   by tapping the character, and 听写 by filling the gaps in the sentence.
   ========================================================================== */

/* What to call the question on screen. The Chinese questions all arrive as
   k:"bd" — the build-it mechanic — so the kind has to come from the shape of
   the item and the test it came from, or a 听写 ends up labelled "Spelling". */
function quizKind(it){
  /* A sheet that knows what it is asking says so: the Berries parts are 词语,
     好句 and 结构, and guessing from the shape of the item labelled the first
     of them 听写 and the other two Spelling. */
  if(it.kind) return it.kind;
  if(it.k==="rn")   return "\u6211\u4f1a\u8ba4";          /* 我会认 */
  if(it.k==="dict") return "Dictation";
  if(it.k==="math") return "Question";
  if(it.k==="bd"){
    /* a sentence with gaps is a 听写 sheet, whatever it was started from */
    if(it.s) return "\u542c\u5199";
    var p=String((quiz&&quiz.code)||"").split("|")[0];
    if(p==="hz") return "\u6211\u4f1a\u5199";
    if(p==="zh") return who()==="tc" ? "\u6c49\u8bed\u62fc\u97f3" : "\u542c\u5199";
    return "\u534e\u6587";                                 /* mixed review */
  }
  return "Spelling";
}

function quizHTML(){
  var q=quiz, it=q.items[q.i];
  if(q.done) return doneHTML();
  var dots="";
  q.items.forEach(function(_,n){
    var st = q.marks && q.marks[n]===true ? " win" : q.marks && q.marks[n]===false ? " lose"
           : n===q.i ? " now" : "";
    dots+='<span class="dot2'+st+'"></span>';
  });

  var s='<div class="panel quizcard"><div class="qtop">'+
    '<button class="btn soft" id="qB">&larr; Back</button>'+
    '<span class="hudchips">'+
      '<span class="hud ok">✅ '+q.score+'</span>'+
      '<span class="hud fire'+(q.streak>=2?" hot":"")+'">🔥 '+q.streak+'</span>'+
    '</span></div>'+
    botSVG()+
    '<div class="track">'+dots+'</div>'+
    '<div class="meter" role="progressbar" aria-valuemin="0" aria-valuemax="'+q.items.length+
      '" aria-valuenow="'+q.i+'" aria-label="Question '+(q.i+1)+' of '+q.items.length+'">'+
      '<i style="width:'+(q.i/q.items.length*100)+'%"></i></div>'+
    '<div class="kind">'+quizKind(it)+
      ' '+(q.i+1)+' of '+q.items.length+'</div>';
  if(it.k==="rn"){
    s+='<div class="hz" lang="zh-CN">'+it.h+'</div>'+
       '<div class="ctx">'+(q.graded?esc(it.word)+' · '+esc(it.m)
         :"Type the pinyin, with its tone number")+'</div>'+
       '<div class="lbl">Pinyin with tones</div>'+
       '<input type="text" id="qa" class="pyin" autocomplete="off" autocapitalize="none" '+
       'spellcheck="false" placeholder="yong3">'+
       '<div class="switch"><button class="addlink" id="qP">🔊 Hear it</button></div>';
  }
  else if(it.k==="bd"){
    var fl=bdFilled(), need=bdSlots(it);
    s+='<div class="qq">'+(it.s
         ? "Listen, then fill in the missing characters"
         : "Listen, then tap the "+(need.length>1?need.length+" characters":"character")+" you hear")+'</div>'+
       '<button class="btn play wide" id="qP">\uD83D\uDD0A Hear the word</button>'+
       '<div class="bword'+(it.s?" sent":"")+'" lang="zh-CN">'+bdMasked(it, fl)+'</div>'+
       (q.graded
        ? '<div class="hint2">'+esc(it.h)+' \u00b7 <b>'+esc(pinyinBoth(it.a,it.tone))+'</b>'+
          (it.m?' \u00b7 '+esc(it.m):"")+'</div>'
        : '<div class="btiles" role="group" aria-label="Characters to choose from">'+(function(){
            /* a tile the same character as another is only used up once */
            var left={}; fl.forEach(function(c){ if(c) left[c]=(left[c]||0)+1; });
            return bdTiles(it).map(function(c){
              var used=left[c]>0; if(used) left[c]--;
              return '<button class="btile'+(used?" used":"")+'" data-tile="'+esc(c)+
                     '"'+(used?' aria-disabled="true"':'')+'>'+esc(c)+'</button>';
            }).join("");
          })()+'</div>')+
       '<input type="hidden" id="qa" value="'+esc(bdAnswer(it))+'">';
  }
  else if(it.k==="pick"){
    /* One question, two or three answers, and the tap is the answer — there is
       no Check button to press. Answered by tapping rather than writing because
       what it tests is which sentence is the better one; making him copy it out
       would test his typing instead. */
    s+='<div class="qq qw"'+(it.lang?' lang="'+it.lang+'"':'')+'>'+esc(it.q)+'</div>'+
       (it.tip?'<div class="tip">'+esc(it.tip)+'</div>':'')+
       '<div class="lopts sent" role="group">'+
       it.c.map(function(o){
         var cls="";
         if(q.graded) cls = (o===it.a) ? " right" : (o===q.pick ? " wrong" : " dim");
         return '<div class="loptrow">'+
           '<button type="button" class="lopt'+cls+'" data-qopt="'+esc(o)+'"'+
           (it.lang?' lang="'+it.lang+'"':'')+(q.graded?' disabled':'')+'>'+esc(o)+'</button>'+
           '<button type="button" class="lsay" data-qsay="'+esc(o)+'" '+
           'title="Hear this one" aria-label="Hear this one">🔊</button></div>';
       }).join("")+'</div>'+
       '<input type="hidden" id="qa" value="'+esc(q.pick||"")+'">';
  }
  else if(it.k==="math"){
    /* A sum gets " = ?" after it; a question already asks for itself. */
    s+='<div class="qq'+(it.w?" qw":"")+'">'+esc(it.q)+(it.w?"":" = ?")+'</div>'+
       '<input type="text" id="qa" inputmode="'+(it.im==="text"?"text":"numeric")+
       '" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="'+
       esc(it.ph||"Answer")+'">';
  } else {
    s+='<div class="qq">'+(it.k==="dict"?"Write the sentence":"Spell the word")+'</div>'+
       '<div class="tip">Word, then the sentence, then the word again.</div>'+
       '<button class="btn play wide" id="qP">🔊 Play</button>'+
       (it.k==="dict"
        ? '<textarea id="qa" spellcheck="false" placeholder="Type the whole sentence" style="margin-top:12px"></textarea>'
        : '<input type="text" id="qa" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Type here" style="margin-top:12px">');
  }
  return s+(it.k==="pick" && !q.graded ? ""
      : '<div class="btnrow"><button class="btn go" id="qG">Check</button></div>')+
    '<div id="qf" role="status" aria-live="polite"></div></div>';
}
function wireQuiz(){
  var q=quiz;
  if(q.done){
    document.getElementById("dBack").onclick=function(){ newBuddy(); go("practice"); };
    var ds=document.getElementById("dScore");
    /* Progress is not a tab of its own any more — every score lives on
       Training, which is also where this test was started from. */
    if(ds) ds.onclick=function(){ newBuddy(); go("practice"); };
    document.getElementById("dAgain").onclick=function(){ hush(); newBuddy(); start(q.code); };
    var fx=document.getElementById("dFix");
    if(fx) fx.onclick=function(){
      hush();
      startItems(q.wrong, "Fixing \u00b7 "+q.test, q.subject, q.lang, q.code);
    };
    return;
  }
  var it=q.items[q.i];
  document.getElementById("qB").onclick=function(){ go("practice"); };
  var p=document.getElementById("qP"); if(p) p.onclick=function(){ sfxTap(); speakIt(it); };
  var g=document.getElementById("qG");
  if(g) g.onclick=function(){ q.graded?next():grade(); };

  /* Build it: a tile drops into the first empty gap; tapping a filled gap
     clears that gap alone, so a wrong tap costs nothing but a second tap. */
  document.querySelectorAll("[data-qopt]").forEach(function(b){
    b.onclick=function(){
      if(q.graded) return;
      /* set it, redraw so the hidden input carries it, then mark it: grade()
         reads the answer off the DOM and not off this handler */
      q.pick=b.dataset.qopt; render(); grade();
    };
  });
  document.querySelectorAll("[data-qsay]").forEach(function(b){
    b.onclick=function(){ hush(); say(b.dataset.qsay, 0.75, it.lang||undefined); };
  });
  document.querySelectorAll("[data-tile]").forEach(function(b){
    b.onclick=function(){
      if(q.graded) return;
      q.bd = q.bd || [];
      var slot=bdNextGap(it);
      if(slot<0) return;                       /* every gap already filled */
      sfxTap(); q.bd[slot]=b.dataset.tile; render();
    };
  });
  document.querySelectorAll("[data-slot]").forEach(function(b){
    b.onclick=function(){
      if(q.graded) return;
      q.bd = q.bd || [];
      var i=+b.dataset.slot;
      if(!q.bd[i]) return;
      sfxTap(); q.bd[i]=""; render();          /* only this gap, never its neighbours */
    };
  });

  var a=document.getElementById("qa");
  if(a) a.addEventListener("keydown",function(e){ if(e.key==="Enter"&&it.k!=="dict"){ e.preventDefault(); g.click(); } });
  var t=document.getElementById("qt");
  if(t) t.addEventListener("keydown",function(e){ if(e.key==="Enter"&&g){ e.preventDefault(); g.click(); } });
  if(!q.graded){
    if(a && a.type!=="hidden") a.focus();
    /* Once per question, not once per draw. render() rebuilds the whole card on
       every tile tap, so this re-armed itself each time and the word started
       over mid-sentence — three taps on 借书 meant hearing "借书" cut itself off
       three times before the cue ever arrived. */
    if(it.k!=="math" && it.k!=="rn" && q.spoke!==q.i){
      q.spoke=q.i;
      setTimeout(function(){ speakIt(it); },250);
    }
  }
}
function speakIt(it){
  hush();
  /* Always read the whole word, never a lone character: 更, 长, 乐, 种 and 教
     all have two readings and the engine guesses wrong without the context. */
  if(it.k==="bd" && it.s){
    /* A 听写 sentence, read the way the teacher reads it: the whole thing
       through, a gap long enough to write in, then again more slowly. The gap
       has to grow with the sentence, or the second reading lands on top of
       the first. */
    var gap = Math.max(2600, 420*String(it.word||"").length);
    say(it.word,0.9,"zh-CN");
    sayLater(function(){ say(it.word,0.75,"zh-CN"); }, gap);
  }
  else if(it.k==="rn"||it.k==="bd"){
    /* The whole word first, because 更, 长, 乐, 种 and 教 all have two readings
       and the engine guesses wrong without the context — then which character
       of it is wanted, the way a teacher says it: “小猫”的“猫”. Saying the word
       twice left him to work that out from the screen alone, which is no use
       to a boy who is listening rather than reading. Where the word is the
       whole answer there is nothing to pick out, so it is said twice. */
    var cue=cueFor(it), heard=String(it.word||it.h);
    /* long words need a longer gap before the second reading */
    var gap=Math.max(1400, 300*heard.length);
    say(heard,0.9,"zh-CN");
    sayLater(function(){ say(cue===heard ? heard : cue, 0.78, "zh-CN"); }, gap);
  }
  else if(it.k==="pick"){
    say(it.q, 0.9, it.lang||undefined);
  }
  else if(it.k==="dict"){
    say("Write the whole sentence.",0.92); say(it.s,0.78);
    say("Again.",0.92); say(it.s,0.68);
  }
  else {
    /* word, then the sentence it lives in, then the word again — the last
       thing he hears is always the word he has to write */
    say("Spell",0.92); say(it.a+".",0.72);
    say(it.s,0.86);
    say("Again.",0.92); say(it.a+".",0.66);
  }
}
/* Pinyin is typed the way the school writes it: the tone number after each
   syllable, e.g. da4 ma3. One box, so there is nothing to tab between.
   Where the bank has no tone stored (SC's two- and three-character words),
   the tone numbers are optional rather than wrong. */
function pyWant(it){ return String(it.a||"")+String(it.tone||""); }
function pyOK(given, it){
  var norm=function(v){ return clean(v).replace(/\s+/g,""); };
  var w=norm(pyWant(it)), g=norm(given);
  if(/\d/.test(w)) return g===w;
  /* No tone stored means a neutral tone \u2014 \u5427, \u535c, \u5462. Stripping every digit
     here meant ba1, ba2 and ba4 were all accepted for \u5427, so a plainly wrong
     tone was marked right. Bare, or the 5 and 0 that both stand for neutral. */
  return g===w || g===w+"5" || g===w+"0";
}

function grade(forced){
  var q=quiz, it=q.items[q.i], right, detail="";
  var ga=document.getElementById("qa"), given = ga ? ga.value : "";
  var gained=null;
  if(it.k==="rn"){
    right=pyOK(given, it);
    detail='<b style="font-size:30px">'+it.h+'</b> &nbsp; '+esc(it.word)+'<br>'+
      (right?"\u2713 "+esc(pinyinBoth(it.a,it.tone))
            :"\u2717 \u2192 <b>"+esc(pinyinMark(it.a,it.tone))+"</b> \u00b7 type <b>"+esc(pyWant(it))+"</b>")+
      '<br>'+esc(it.m);
  }
  else if(it.k==="bd"){
    var need=bdSlots(it), got=String(given||"").split("");
    gained=0;
    need.forEach(function(c,i){ if(got[i]===c) gained++; });
    right = gained===need.length;
    got=got.map(function(c){ return c==="\u3000" ? "\uff3f" : c; });   /* show a gap as a gap */
    detail = it.s
      ? '<b style="font-size:20px;line-height:1.6">'+esc(it.word||"")+'</b>'+
        (right?"":'<br>You put: '+(esc(got.join(""))||"nothing"))
      : '<b style="font-size:34px">'+esc(it.h)+'</b><br>'+esc(it.word||"")+
        ' \u00b7 '+esc(pinyinBoth(it.a,it.tone))+(it.m?'<br>'+esc(it.m):"")+
        (right?"":'<br>You put: '+(esc(got.join(""))||"nothing"));
  }
  else if(it.k==="pick"){
    right = given===it.a;
    detail = '<b'+(it.lang?' lang="'+it.lang+'"':'')+'>'+esc(it.a)+'</b>'+
             (it.why?'<br>'+esc(it.why):"");
  }
  else if(it.k==="math"){
    right=mathOK(given, it);
    if(!right) detail=esc(it.q)+(it.w?'<br>':' = ')+'<b>'+esc(it.a)+'</b>';
  } else if(it.k==="dict"){
    right = cleanDict(given)===cleanDict(it.a);
    var slip = right ? "" : dictSlip(given, it.a);
    detail = right
      ? '<b>'+esc(it.a)+'</b>'
      : dictRow(it.a, given)+
        (String(given||"").trim() ? "" : '<div class="wdhint">Nothing was written.</div>')+
        (slip?'<div class="wdhint">'+esc(slip)+'</div>':"");
  } else { right=clean(given)===clean(it.a); detail=ltRow(it.a,given); }

  /* Keep what he actually put down, so the run can be looked at afterwards. */
  q.ans = q.ans || [];
  q.ans[q.i] = {
    ask:  (it.k==="rn"||it.k==="bd") ? (it.word||it.h||"")
        : (it.k==="math" ? it.q : it.s || ""),
    want: it.k==="rn" ? (it.a+(it.tone||""))
        : it.k==="bd" ? it.h
        : (it.a||""),
    got:  String(given||"").replace(/\u3000/g,"\uff3f"),
    right: right
  };

  q.marks = q.marks || [];
  q.marks[q.i] = right;
  q.wrong = q.wrong || [];
  if(right){
    q.score+=itemMarks(it); q.streak++; q.best=Math.max(q.best,q.streak);
    weakDrop(it);
  } else {
    q.streak=0;
    /* Part marks: 乌龟 with only 龟 wrong scores 1 of 2, and it is 龟 that goes
       into the tricky-ones bank, not the whole word. */
    if(gained) q.score+=gained;
    /* A 听写 sentence has no single pinyin, so naming one read "\u524d\u603b\u4e18 ()".
       Name the characters, and the word only where there is one. */
    q.missed.push(
      it.k==="math" ? it.q
      : (it.k==="bd"||it.k==="rn")
        ? it.h+(it.a?" ("+it.a+(it.tone||"")+")":"")
        : it.a);
    q.wrong.push(it);
    /* A sentence he chose wrongly is not a word he keeps missing, and dropping
       one into the tricky-ones bank would put a 好句 question into tomorrow's
       ten minutes of 生字 practice. */
    if(it.k!=="pick") weakAdd(it, q.code);
  }
  q.graded=true;
  render();
  var a=document.getElementById("qa");
  if(a){ a.value=given; a.disabled=true; }
  if(document.getElementById("qt")) document.getElementById("qt").disabled=true;
  var cnQ = (it.k==="rn"||it.k==="bd");
  var pr = right ? praise(cnQ, q.streak) : oops(cnQ);
  q.say = pr;
  document.getElementById("qf").innerHTML='<div class="fb '+(right?"ok":"no")+'">'+
    '<span class="big">'+(right && q.streak>=3 ? "\uD83D\uDD25 "+q.streak+" \u00b7 "+esc(pr.t)
      : esc(pr.t))+'</span>'+detail+'</div>';
  var gb=document.getElementById("qG");
  if(gb){
    gb.textContent=(q.i===q.items.length-1)?"Finished \u2192":"Next";
    try{ if(document.activeElement && document.activeElement.blur) document.activeElement.blur(); }catch(e){}
    setTimeout(function(){
      try{ gb.scrollIntoView({block:"center", behavior:"smooth"}); }catch(e){}
    }, 60);
  }

  if(right){
    if(q.streak>=3) sfxStreak(); else sfxWin();
    burst(q.streak>=3?30:18);
    botReact("cheer");
  } else {
    sfxLose(); botReact("oops");
  }

  hush();
  if(right) say(q.say.t, q.say.lang?0.95:0.95, q.say.lang||undefined);
  else if(it.k==="py"||it.k==="hz"||it.k==="rn"||it.k==="tx"||it.k==="bd") say(it.word,0.85,"zh-CN");
  else if(it.k!=="math") say(it.a,0.6);
}
function next(){
  var q=quiz; q.i++; q.graded=false; q.bd=null; q.pick=null;
  if(q.i>=q.items.length){ q.done=true;
    addResult({who:who(),subject:q.subject,code:q.code,test:q.test,score:q.score,
               total:q.total||q.items.length,missed:q.missed,ts:Date.now(),
               ans:(q.ans||[]).filter(Boolean)});
    bumpStreak(); }                 /* addResult syncs it up on its own */
  render(); scrollTo(0,0);
}
function doneHTML(){
  var q=quiz;
  var p=q.score/(q.total||q.items.length);
  var cn = String(q.lang||"").indexOf("zh")===0;
  var st=p===1?"★★★":p>=.8?"★★☆":p>=.5?"★☆☆":"☆☆☆";
  var rank=p===1?"S":p>=.9?"A":p>=.8?"B":p>=.6?"C":"D";
  var rk = cn
    ? (p===1?"\u6ee1\u5206\uff01":p>=.8?"\u5f88\u597d":p>=.5?"\u6709\u8fdb\u6b65":"\u518d\u8bd5\u4e00\u6b21")
    : (p===1?"Full marks!":p>=.8?"Very good":p>=.5?"Getting there":"Worth another go");
  if(!q.cheered){
    q.cheered=true;
    sfxDone(); burst(p>=0.8?40:16);
    if(cn) say(p>=0.8?"\u592a\u68d2\u4e86\uff01":"\u518d\u8bd5\u4e00\u6b21\u3002",0.95,"zh-CN");
    else   say(p>=0.8?"Well done!":"Good effort. Try again.",0.95);
  }
  return '<div class="panel done">'+botSVG()+
    '<div class="kind">'+esc(q.test)+'</div>'+
    '<div class="big">'+q.score+' / '+(q.total||q.items.length)+'</div>'+
    '<div class="st">'+st+'</div>'+
    '<div class="rankbadge r'+rank+'">Rank '+rank+'</div>'+
    '<div class="rk">'+rk+'</div>'+
    '<div class="streakline">Longest streak: '+q.best+'</div>'+
    (q.missed.length?'<div class="again">Missed: <b>'+esc(q.missed.join(", "))+'</b></div>':'')+
    '<div class="btnrow">'+
    ((q.wrong&&q.wrong.length)
      ? '<button class="btn go" id="dFix">Fix the '+q.wrong.length+' missed \u2192</button>' : '')+
    '<button class="btn '+((q.wrong&&q.wrong.length)?"soft":"go")+'" id="dScore">See my progress \u2192</button>'+
    '</div><div class="btnrow">'+
    '<button class="btn soft" id="dAgain">Try again</button>'+
    '<button class="btn soft" id="dBack">More practice</button></div></div>';
}

/* ==========================================================================
   THE QUIZ LADDERS — four games, one engine.

   Every other test in this app asks a fixed list and hands back a mark out of
   ten. A ladder asks the opposite question: not "did he learn this week's
   words" but "how far up can he get before it stops him". Three right in a row
   climbs a rung, three wrong on the same rung ends the run, and what it reports
   is the rung he cleared — not a percentage, and not a pass.

   Three misses are counted per rung, not per run: the lives refill on the way
   up. A boy who trips once on rung 4 and once on rung 7 has not shown a
   ceiling, and stopping him there would report one he does not have.

   The rung he starts on is his to pick and sticks per ladder on the device.
   Starting every run at the bottom was right once and wrong from the second run
   on: TC can spell every three-letter word in the bank, so nine words of typing
   practice came before the ladder reached anything he might get wrong. Rungs
   below the start are never asked, so they never count as cleared — the ladder
   draws them faded, and the run records where it began.

   NONE OF THE FOUR IS CURRICULUM, and that is the point of them. The school's
   lists are on Training, marked out of ten, and a bad mark there means
   something. Here a low rung means the next question was harder than the last
   one, nothing joins the tricky-ones bank, and nothing feeds the daily set.

   Neither is any of it split by boy. Both of them use the same iPad and play
   these together, and asking "who is this" before a game bought nothing: the
   run is saved against whoever the app is set to so the row has a child on it,
   and what the panel shows is the best anyone has managed. A ladder is a family
   high score, not a school record.

   A ladder supplies what its rungs are called, what each rung asks, and where
   its questions come from. The engine below knows nothing else about them.
   ========================================================================== */
var CLIMB_ROW=3, CLIMB_LIVES=3;

/* ---------- 1. the spelling ladder: words by how long they are ---------- */
var CLIMB_LO=3, CLIMB_HI=20;          /* CLIMB_WORDS is keyed by word length */
var CLIMB_TEST="Spelling climb";
/* A name on every rung. "Level 8" is a school report; "you got to Cliff" is
   the bit a seven-year-old repeats at dinner, and the names climb into the
   sky the way the scene backdrops do. */
var CLIMB_TIERS={3:"Sprout",4:"Pebble",5:"Rock",6:"Hill",7:"Ridge",8:"Cliff",
                 9:"Peak",10:"Summit",11:"Cloud",12:"Sky",13:"Star",
                 14:"Comet",15:"Galaxy",16:"Nebula",17:"Quasar",18:"Cosmos",
                 19:"Infinity",20:"Legend"};
function climbTier(n){ return CLIMB_TIERS[n]||("Level "+n); }
/* "eight-letter words" — spelt out, because it is a thing that gets said.
   numWords(), not MA_ONES[n]: that array stops at nineteen, so the top rung
   was announcing itself as "20-letter words". */
function climbLen(n){ return numWords(n)+"-letter words"; }
/* Only words that really are this long. The key in CLIMB_WORDS is the whole
   promise of the game, so anything filed under the wrong length is dropped
   rather than asked — one nine-letter word on the ten rung and the ladder is
   measuring nothing. */
function climbBank(n){
  var a=(typeof CLIMB_WORDS!=="undefined" && CLIMB_WORDS[n]) ? CLIMB_WORDS[n] : [];
  return a.filter(function(x){ return String(x[0]).length===n; })
          .map(function(x){ return {a:x[0], s:x[1]}; });
}
function climbWordCount(){
  var n=0;
  for(var i=CLIMB_LO;i<=CLIMB_HI;i++) n+=climbBank(i).length;
  return n;
}

/* ---------- 2. the maths ladder: one sum a rung, generated ---------- */
/* Generated rather than listed, so it never runs out and never repeats itself
   round a rung. Rungs 1 to 9 are P2 ground; from 10 up it is P3 and beyond and
   the panel says so, the way MA_SETS labels its "reach" set "Next year". */
var MA_RUNGS=["", "adding up to 10", "taking away within 10", "adding within 20",
  "taking away within 20", "the 2, 5 and 10 times tables",
  "the 3 and 4 times tables", "adding within 100", "taking away within 100",
  "sharing equally", "adding within 1000", "taking away within 1000",
  "two digits times one digit", "dividing two digits", "fractions of an amount",
  "two steps at once"];
var MA_TIERS=["", "Start", "Take away", "Twenty", "Back from twenty", "Tables",
  "More tables", "Hundred", "Back from a hundred", "Sharing", "Thousand",
  "Back from a thousand", "Long times", "Long division", "Fractions", "Two steps"];
function maRungGen(n){
  var a,b,c;
  switch(n){
    case 1:  a=rnd(1,9);   b=rnd(1,10-a);  return maLadQ(a+" + "+b, a+b);
    case 2:  a=rnd(2,10);  b=rnd(1,a);     return maLadQ(a+" − "+b, a-b);
    case 3:  a=rnd(3,18);  b=rnd(1,20-a);  return maLadQ(a+" + "+b, a+b);
    case 4:  a=rnd(6,20);  b=rnd(1,a);     return maLadQ(a+" − "+b, a-b);
    case 5:  a=maPick([2,5,10]); b=rnd(2,10); return maLadQ(a+" × "+b, a*b);
    case 6:  a=maPick([3,4]);    b=rnd(2,10); return maLadQ(a+" × "+b, a*b);
    case 7:  a=rnd(11,89); b=rnd(5,99-a);  return maLadQ(a+" + "+b, a+b);
    case 8:  a=rnd(25,99); b=rnd(6,a-1);   return maLadQ(a+" − "+b, a-b);
    case 9:  b=maPick([2,3,4,5,10]); c=rnd(2,10); return maLadQ((b*c)+" ÷ "+b, c);
    case 10: a=rnd(120,880); b=rnd(30,999-a); return maLadQ(a+" + "+b, a+b);
    case 11: a=rnd(220,999); b=rnd(40,a-10);  return maLadQ(a+" − "+b, a-b);
    case 12: a=rnd(12,39);  b=rnd(3,9);    return maLadQ(a+" × "+b, a*b);
    case 13: b=rnd(3,9); c=rnd(11,20);     return maLadQ((b*c)+" ÷ "+b, c);
    case 14: b=maPick([2,3,4,5]); c=rnd(2,9); return maLadQ("1/"+b+" of "+(b*c), c);
    default: a=rnd(4,9); b=rnd(4,9); c=rnd(6,40);
             return maLadQ(a+" × "+b+" + "+c, a*b+c);
  }
}
/* The sum twice: once as it is written and once as it is read out, because a
   voice handed "7 × 8" says "seven ex eight" on half the tablets in the house.
   Read out at all because both boys are quicker at hearing a sum than reading
   one, and this ladder is not a reading test.

   maLadQ, not maQ: this was called maQ for five builds and there has been a
   maQ since the maths quiz was written, three hundred lines up. The later
   declaration won, so every maths question in the daily set quietly lost its
   keyboard and its accepted spellings — and the fractions generator handed
   this one "3/8", which is not a number, so the answers-to-tap loop below span
   for ever and took the Training tab with it. */
function maLadQ(q, a){
  return {a:String(a), q:q, c:ladShuffleIn(String(a), maOpts(a)), sy:q
    .replace(/1\/(\d+) of/g, function(_,d){
      return (d==="2"?"one half":d==="3"?"one third":d==="4"?"one quarter":"one fifth")+" of";
    })
    .replace(/\+/g," plus ").replace(/−/g," minus ")
    .replace(/×/g," times ").replace(/÷/g," divided by ")};
}

/* ---------- everything else is tapped, not typed ----------

   Typing is the test on the spelling ladder and nowhere else. On the others a
   keyboard was only ever in the way: a boy who knows 56 loses the question to
   his own thumbs, and on an iPad the keyboard covers half the card. So the
   maths ladder offers four answers and the rest of them offer three or four,
   and the right one is shuffled in fresh every single time — a boy who
   remembers "it was the second one" has remembered nothing worth having. */
function ladShuffleIn(right, wrongs){ return shuffled([right].concat(wrongs)); }

/* Three wrong answers for a sum, and they have to be near misses. 56, 3 and
   900 is not a question, it is a reading exercise: the only plausible wrong
   answers to 7 × 8 are the ones a boy would actually arrive at — one out,
   two out, ten out, or the digits the wrong way round. */
function maOpts(a){
  var n=Number(a);
  /* Anything that is not a whole number has no near misses worth offering, and
     the top-up loop at the bottom would never finish looking for three of them:
     String(NaN+4) is "NaN" every time round. */
  if(!isFinite(n)) return [];
  var pool=[n+1, n-1, n+2, n-2, n+10, n-10, n+3, n-3, n+20, n-20];
  /* Two digits the wrong way round is a slip a child actually makes: 14 for 41.
     Three digits reversed is not a slip, it is a different number, and 851 next
     to 158 only tells him which one looks wrong. */
  var rev=String(n).split("").reverse().join("");
  if(String(n).length===2 && rev.charAt(0)!=="0") pool.push(Number(rev));
  var seen={}, out=[];
  seen[String(n)]=1;
  shuffled(pool).forEach(function(x){
    if(x<0 || out.length>=3) return;
    var k=String(x);
    if(seen[k]) return;
    seen[k]=1; out.push(k);
  });
  /* a sum whose near misses collided — 1 + 1 has fewer neighbours than most */
  for(var d=4; out.length<3; d++){ if(!seen[String(n+d)]){ seen[String(n+d)]=1; out.push(String(n+d)); } }
  return out;
}

/* ---------- the ladders themselves ---------- */
/* Two shapes cover six of the eight. A quiz bank is a question with its answers
   written out; a language bank is a word, how it sounds, and what it means. Both
   arrive as {rung name, rows}, keyed by rung, so one factory each is enough and
   a new subject or a new language is a bank in data.js and one line here. */
function qzLad(o){
  var B=o.bank;
  return { id:o.id, em:o.em, name:o.name, test:o.name, subject:o.subject,
    lo:1, hi:10, mode:"pick", ask:"Tap the answer, or 🔊 to hear one",
    blurb:o.blurb, note:o.note,
    tier:function(n){ return (B[n]&&B[n][0])||("Level "+n); },
    rung:function(n){ return String((B[n]&&B[n][0])||("level "+n)).toLowerCase(); },
    bank:function(n){
      return ((B[n]&&B[n][1])||[]).map(function(x){ return {a:x[1], q:x[0], w:x[2]}; });
    },
    dress:function(x){ return {a:x.a, q:x.q, c:ladShuffleIn(x.a, x.w)}; },
    speak:function(it){ return [[it.q,0.95]]; },
    tell:function(it){ return [[it.a,0.9]]; } };
}
/* Hear the word, read what it means, tap the one that says it. The wrong
   answers are the other words from the same rung, so every tile on screen is
   one he has just as much business knowing — distractors off an easier rung
   would make a hard word look easy.

   Nothing here is written in the Latin alphabet except Bahasa Indonesia, which
   is why `big` is a flag and not the rule: 재미있다 needs the size, "membaca"
   needs the width. */
function langLad(o){
  var B=o.bank;
  return { id:o.id, em:o.em, name:o.name, test:o.name, subject:o.subject||o.name,
    lo:1, hi:10, mode:"pick", big:o.big, optLang:o.lang, voice:o.lang, vname:o.vname,
    ask:"Tap 🔊 to hear one, then tap the answer", blurb:o.blurb, note:o.note,
    tier:function(n){ return (B[n]&&B[n][0])||("Level "+n); },
    rung:function(n){ return (B[n]&&B[n][0])||("level "+n); },
    bank:function(n){
      return ((B[n]&&B[n][1])||[]).map(function(x){ return {a:x[0], py:x[1], m:x[2]}; });
    },
    dress:function(x, n){
      var others=[], all=(B[n]&&B[n][1])||[];
      all.forEach(function(y){ if(y[0]!==x.a) others.push(y[0]); });
      return {a:x.a, py:x.py, m:x.m,
              q:"What is “"+x.m+"” in "+o.vname+"?",
              c:ladShuffleIn(x.a, shuffled(others).slice(0,3))};
    },
    /* The question, in English, and not the answer. Reading the answer out was
       the game given away to anyone who already knew the sound of it, and it
       left the other three words on screen unsaid — which is the half of a
       language quiz where the learning is. Now he hears "what is thank you in
       Tagalog", plays any of the four to hear how it sounds, and picks.

       Each word is spoken in its own language or not at all: an English voice
       reading ねこ teaches the wrong sounds, which is why say() refuses rather
       than guessing — and the question is English, so a tablet with no Japanese
       voice still asks out loud and still has a working game. */
    speak:function(it){ return [[it.q,0.95]]; },
    tell:function(it){ return [[it.a,0.6,o.lang]]; },
    after:function(it){ return '<div class="csent">'+(it.py
      ? '<span lang="'+o.lang+'">'+esc(it.py)+'</span> · ' : '')+esc(it.m)+'</div>'; } };
}

var LADDERS=[
  { id:"spell", em:"🧗", name:"Spelling climb", test:CLIMB_TEST,
    subject:"English", lo:CLIMB_LO, hi:CLIMB_HI, mode:"type", ph:"Type the word",
    lts:true,               /* letter by letter: this is the one about spelling */
    ask:"Word, then the sentence, then the word again",
    blurb:"Three-letter words up to twenty. Each word is read out, then a "+
      "sentence with the word in it, then the word again.",
    note:"Ordinary English words, none of them off a school list — this one is "+
      "just for the fun of it. Typed, because tapping a word somebody else has "+
      "spelt is not spelling it.",
    tier:climbTier, rung:climbLen, bank:climbBank,
    speak:function(it){ return [["Spell",0.92],[it.a+".",0.72],[it.s,0.86],
                                ["Again.",0.92],[it.a+".",0.66]]; },
    tell:function(it){ return [[it.a,0.6]]; },
    after:function(it){ return '<div class="csent">'+esc(it.s)+'</div>'; } },

  { id:"ma", em:"➗", name:"Maths climb", test:"Maths climb",
    subject:"Maths", lo:1, hi:15, mode:"pick",
    ask:"Tap the answer, or 🔊 to hear one",
    blurb:"Adding up to ten at the bottom, two steps at once at the top. Every "+
      "sum is read out as well as written, and no two in a run are the same.",
    note:"Rungs 1 to 9 are P2 ground. From 10 up it is P3 and beyond, so a "+
      "short climb up there means nothing at all.",
    tier:function(n){ return MA_TIERS[n]||("Level "+n); },
    rung:function(n){ return MA_RUNGS[n]||("level "+n); },
    gen:maRungGen,
    q:function(it){ return it.q+" = ?"; },
    speak:function(it){ return [["What is "+it.sy+"?",0.95]]; },
    tell:function(it){ return [["The answer is "+it.a+".",0.9]]; } },

  qzLad({ id:"sci", em:"🔬", name:"Science quiz", subject:"Science", bank:SCI_LADDER,
    blurb:"Animals at the bottom, food chains and condensation at the top — ten "+
      "rungs, one topic each, and every question is read out.",
    note:"Not school science: MOE starts science in P3, so neither boy has a "+
      "syllabus for this yet. It is here because they like it." }),

  qzLad({ id:"body", em:"🫀", name:"Human body", subject:"Science", bank:BODY_LADDER,
    blurb:"Ten rungs from the outside in: what you can see, then the senses, "+
      "bones, muscles, heart, lungs, food, brain, skin, and all of it at once.",
    note:"Not school science either, but it does go in order — a boy who gets "+
      "to rung 8 has learnt something real about himself." }),

  langLad({ id:"zh", em:"汉", name:"华文 quiz", subject:"华文", bank:ZH_LADDER,
    lang:"zh-CN", vname:"Mandarin", big:true,
    blurb:"The word is read out in Mandarin with its meaning on screen — tap the "+
      "characters that say it. 一二三 at the bottom, 保护环境 at the top.",
    note:"Not off a school sheet: his 听写 lists are on Training and those are "+
      "the ones that count. The rungs here are my own idea of what is hard." }),

  langLad({ id:"id", em:"🇮🇩", name:"Bahasa quiz", subject:"Bahasa Indonesia",
    bank:ID_LADDER, lang:"id-ID", vname:"Indonesian",
    blurb:"Bahasa Indonesia, six words a rung: halo and terima kasih at the "+
      "bottom, verbs and adjectives at the top.",
    note:"Nobody teaches this at either school. It is read exactly as it is "+
      "spelt, which makes it the gentlest of the four languages to start on." }),

  langLad({ id:"ja", em:"あ", name:"日本語 quiz", subject:"日本語",
    bank:JA_LADDER, lang:"ja-JP", vname:"Japanese", big:true,
    blurb:"Hiragana and a little katakana, read out in Japanese — こんにちは at "+
      "the bottom, むずかしい at the top. The romaji is shown after each answer.",
    note:"Nobody teaches this at either school. If the tablet has no Japanese "+
      "voice the words stay silent rather than being read in an English one." }),

  langLad({ id:"tl", em:"🇵🇭", name:"Tagalog quiz", subject:"Tagalog",
    bank:TL_LADDER, lang:"fil-PH", vname:"Tagalog",
    blurb:"Tagalog, six words a rung: kumusta and salamat at the bottom, verbs "+
      "and adjectives at the top.",
    note:"Nobody teaches this at either school either. Read as it is spelt, and "+
      "the one language on here the boys hear outside the house." }),

  langLad({ id:"ko", em:"한", name:"한국어 quiz", subject:"한국어",
    bank:KO_LADDER, lang:"ko-KR", vname:"Korean", big:true,
    blurb:"Hangul read out in Korean — 안녕하세요 at the bottom, 어렵다 at the "+
      "top — with how it sounds shown after each answer.",
    note:"Nobody teaches this at either school. If the tablet has no Korean "+
      "voice the words stay silent rather than being read in an English one." })
];

function ladBy(id){
  for(var i=0;i<LADDERS.length;i++) if(LADDERS[i].id===id) return LADDERS[i];
  return LADDERS[0];
}
/* The rung this ladder starts on, kept on the device and per ladder. Not
   synced: where to start on the tablet in front of you is a comfort setting,
   not a family record, and a stale value arriving from the other device
   mid-week would move the bottom of the ladder with nobody asking. Clamped on
   the way out as well as in, because a rung saved before a ladder changed shape
   must not land off the end of it. */
function ladFrom(L){
  var n=parseInt(S("qfrom:"+L.id, L.lo), 10);
  if(!n || n<L.lo || n>L.hi) n=L.lo;
  return n;
}
function setLadFrom(L, n){
  n=Number(n);
  if(!n || n<L.lo || n>L.hi) n=L.lo;
  W("qfrom:"+L.id, String(n));
}
/* The highest rung anyone has cleared. Runs are saved against a child because
   the results table has a column for one, but nothing on these screens asks
   which boy is playing, so nothing here reads it back per boy either. */
function ladBest(L){
  var b=0;
  KIDS.forEach(function(k){ var r=bestFor(L.test, k.id); if(r && r.score>b) b=r.score; });
  return b;
}
function ladLast(L){
  var l=null;
  KIDS.forEach(function(k){ var r=lastFor(L.test, k.id); if(r && (!l || r.ts>l.ts)) l=r; });
  return l;
}

/* Never the same question twice in one run — until a rung runs out of fresh
   ones, and then that rung starts over. Ending a run for lack of questions
   would look on the screen exactly like ending it for getting them wrong. */
function climbPick(){
  var q=climb, L=q.L;
  if(L.gen){
    /* a generated rung cannot run out, so all this does is keep the same sum
       from turning up twice in one run */
    for(var t=0;t<12;t++){
      var g=L.gen(q.lvl);
      if(!q.seen[g.q]){ q.seen[g.q]=1; return g; }
    }
    return L.gen(q.lvl);
  }
  var a=L.bank(q.lvl);
  if(!a.length) return null;
  var fresh=a.filter(function(x){ return !q.seen[x.a]; });
  if(!fresh.length){
    a.forEach(function(x){ delete q.seen[x.a]; });
    fresh=a;
  }
  var x=fresh[Math.floor(Math.random()*fresh.length)];
  q.seen[x.a]=1;
  return L.dress ? L.dress(x, q.lvl) : x;
}

function startClimb(id, lvl){
  var L=ladBy(id), from = lvl ? Number(lvl) : ladFrom(L);
  if(!from || from<L.lo || from>L.hi) from=L.lo;
  setLadFrom(L, from);      /* tapping a rung and starting sets it for next time */
  climb={L:L, from:from, lvl:from, row:0, lives:CLIMB_LIVES, cleared:0,
         seen:{}, asked:0, right:0, missed:[], up:0, spoke:-1, msg:"",
         wasBest:ladBest(L),
         it:null, graded:false, ok:false, given:"", done:false, saved:false};
  climb.it=climbPick();
  if(!climb.it){ climb=null; alert("That ladder has no questions on it."); return; }
  render(); scrollTo(0,0);
}

/* The whole ladder, every rung, so the top is visible from the bottom — that is
   most of the pull of the game.

   `from` is the rung the run began on. Rungs below it were never asked, so they
   are drawn faded and not green: a boy who started at eight and cleared nine
   has not climbed from three, and a row of green boxes underneath him would say
   he had. */
function climbLadder(L, cleared, now, best, from){
  from = from || L.lo;
  var s='<div class="clad" aria-hidden="true">';
  for(var n=L.lo;n<=L.hi;n++){
    var cls = (n>=from && n<=cleared) ? " done" : (n===now ? " now" : "");
    if(n<from) cls+=" below";
    if(best && n===best) cls+=" best";
    s+='<span class="crung'+cls+'" title="'+esc(L.tier(n))+'">'+n+'</span>';
  }
  return s+'</div>';
}
function climbPips(row){
  var s='<div class="cpips" role="img" aria-label="'+row+' of '+CLIMB_ROW+' in a row">';
  for(var i=0;i<CLIMB_ROW;i++) s+='<span class="cpip'+(i<row?" on":"")+'"></span>';
  return s+'</div>';
}
function climbHearts(n){
  var s="";
  for(var i=0;i<CLIMB_LIVES;i++) s+= (i<n ? "❤️" : "🤍");
  return s;
}
/* The answers to tap, each with a speaker of its own.

   Hearing all four is the point: a boy choosing between 안녕하세요 and 감사합니다
   by shape alone is doing a spot-the-difference puzzle, and hearing them is the
   only part of it that is learning Korean. The speaker is a button beside the
   answer rather than the answer itself, so playing one is never mistaken for
   choosing it — and it keeps working after the answer is in, because the moment
   he most wants to hear the right one is the moment he has just got it wrong.

   Shuffled once when the question is drawn, not here, so they keep their order
   while the card is redrawn. */
function climbOpts(q){
  var it=q.it, s='<div class="lopts'+(q.L.big?" big":"")+'" role="group">';
  for(var i=0;i<it.c.length;i++){
    var o=it.c[i], cls="";
    if(q.graded) cls = (o===it.a) ? " right" : (o===q.given ? " wrong" : " dim");
    s+='<div class="loptrow">'+
       '<button type="button" class="lopt'+cls+'" data-opt="'+esc(o)+'"'+
       (q.L.optLang?' lang="'+q.L.optLang+'"':'')+
       (q.graded?' disabled':'')+'>'+esc(o)+'</button>'+
       '<button type="button" class="lsay" data-say="'+esc(o)+'" '+
       'title="Hear this one" aria-label="Hear this one">🔊</button>'+
       '</div>';
  }
  return s+'</div>';
}

function climbHTML(){
  var q=climb, L=q.L;
  if(q.done) return climbDoneHTML();
  var it=q.it, left=CLIMB_ROW-q.row;
  var s='<div class="panel quizcard"><div class="qtop">'+
    '<button class="btn soft" id="cB">&larr; Back</button>'+
    '<span class="hudchips">'+
      '<span class="hud">⬆️ '+q.lvl+'</span>'+
      '<span class="hud'+(q.lives<=1?" fire hot":"")+'" aria-label="'+q.lives+
        ' tries left">'+climbHearts(q.lives)+'</span>'+
    '</span></div>'+
    botSVG()+
    climbLadder(L, q.cleared, q.lvl, q.wasBest, q.from)+
    '<div class="kind">'+esc(L.tier(q.lvl))+' · level '+q.lvl+'</div>'+
    '<div class="qq'+(L.q?" qw":"")+'">'+
      esc(L.q ? L.q(it) : (it.q || L.rung(q.lvl)))+'</div>'+
    climbPips(q.row)+
    '<div class="tip">'+esc(L.ask)+'. '+
      (left<=0 ? "Up you go." : (left===1?"One more":left+" more")+" in a row to go up.")+
      '</div>'+
    '<button class="btn play wide" id="cP">🔊 '+
      (L.mode==="pick"?"Say it again":"Play")+'</button>';
  if(L.mode==="pick") s+=climbOpts(q);
  else s+='<input type="text" id="ca" autocomplete="off" autocapitalize="none" '+
      'autocorrect="off" spellcheck="false" inputmode="'+(L.im||"text")+'" '+
      'placeholder="'+esc(L.ph)+'" style="margin-top:12px"'+
      (q.graded?' disabled value="'+esc(q.given)+'"':'')+'>';
  /* A tapped ladder needs no Check button — the tap is the answer — but it does
     need the Next one once the answer is on screen. */
  if(L.mode!=="pick" || q.graded){
    s+='<div class="btnrow"><button class="btn go" id="cG">'+
      (q.graded ? ((q.lives<=0||q.up===2) ? "See how high →" : "Next") : "Check")+
      '</button></div>';
  }
  if(q.graded){
    if(q.up===1) s+='<div class="clevel">⬆️ Level '+(q.lvl+1)+' · '+
                    esc(L.tier(q.lvl+1))+' · '+esc(L.rung(q.lvl+1))+'</div>';
    if(q.up===2) s+='<div class="clevel">🏆 Top of the ladder!</div>';
    s+='<div class="fb '+(q.ok?"ok":"no")+'" role="status" aria-live="polite">'+
       '<span class="big">'+esc(q.msg)+'</span>'+
       '<b style="font-size:23px"'+(L.optLang?' lang="'+L.optLang+'"':'')+'>'+
         esc(it.a)+'</b>'+
       (L.lts ? ltRow(it.a, q.given) : "")+
       (L.after?L.after(it):"")+'</div>';
  }
  return s+'</div>';
}

function climbGrade(val){
  var q=climb, L=q.L;
  if(q.graded) return;
  if(L.mode==="pick") q.given = val||"";
  else { var el=document.getElementById("ca"); q.given = el ? el.value : ""; }
  q.ok = (L.mode==="pick") ? (q.given===q.it.a) : (clean(q.given)===clean(q.it.a));
  q.graded=true; q.asked++; q.up=0;
  if(q.ok){
    q.right++; q.row++;
    if(q.row>=CLIMB_ROW){
      q.cleared=q.lvl;                       /* three in a row is what clears it */
      q.up = (q.lvl>=L.hi) ? 2 : 1;
    }
    q.msg = q.up===2 ? "You cleared the whole ladder!"
          : q.up===1 ? "Three in a row!"
          : praise(false, q.row).t;
  } else {
    q.lives--; q.row=0;
    q.missed.push(q.it.a);
    /* Say how many tries are left rather than only "not quite" — on a rung he
       is going to fall off, knowing it is coming is the difference between a
       game and a surprise. */
    q.msg = q.lives>0
      ? oops(false).t+" "+q.lives+(q.lives===1?" try left on this rung.":" tries left on this rung.")
      : "That is the climb over.";
  }
  render();
  if(q.ok){
    if(q.up){ sfxStreak(); burst(44); } else { sfxWin(); burst(18); }
    botReact("cheer");
  } else { sfxLose(); botReact("oops"); }
  hush();
  say(q.msg, 0.95);
  /* the last thing he hears is the right answer */
  if(!q.ok) L.tell(q.it).forEach(function(p){ say(p[0], p[1], p[2]); });
}

function climbNext(){
  var q=climb;
  if(q.lives<=0 || q.up===2) return climbFinish();
  if(q.up===1){ q.lvl++; q.row=0; q.lives=CLIMB_LIVES; }
  q.up=0; q.graded=false; q.ok=false; q.given=""; q.msg="";
  q.it=climbPick();
  if(!q.it) return climbFinish();   /* a rung with no questions is the end of it */
  render(); scrollTo(0,0);
}
function climbFinish(){
  var q=climb, L=q.L;
  q.done=true;
  if(!q.saved){
    q.saved=true;
    /* One row per run, like every other test, so it syncs with the rest and the
       other device sees how high anyone got. The score is the rung cleared out
       of the whole ladder — which is exactly why these have their own panels
       and not coloured boxes: 8 out of 20 is a good climb, and scoreCls() would
       have painted it red.

       who() is on the row because the results table needs a child, not because
       the ladder asked one. `from` rides along, local only, because it is what
       makes a saved row readable: level 9 off a start at 8 and level 9 off a
       start at 3 are not the same run. */
    addResult({who:who(), subject:L.subject, code:"climb", test:L.test,
               score:q.cleared, total:L.hi, from:q.from,
               missed:q.missed, ts:Date.now()});
    bumpStreak();
  }
  render(); scrollTo(0,0);
}

function climbDoneHTML(){
  var q=climb, L=q.L, beat=q.cleared>q.wasBest;
  if(!q.cheered){
    q.cheered=true;
    sfxDone(); burst(q.cleared>=Math.round(L.hi*0.5)?46:18);
    say(q.cleared ? "You cleared level "+q.cleared+"." : "Good try. Have another go.", 0.95);
  }
  return '<div class="panel done">'+botSVG()+
    '<div class="kind">'+esc(L.name)+'</div>'+
    '<div class="big">'+(q.cleared||"—")+'</div>'+
    '<div class="rk">'+(q.cleared
      ? "Level "+q.cleared+" · "+esc(L.tier(q.cleared))
      : "No rung cleared this time")+'</div>'+
    '<div class="streakline">'+(q.cleared
      ? esc(L.rung(q.cleared))+", three in a row"
      : "Three in a row on "+esc(L.rung(q.from))+" starts the climb")+'</div>'+
    climbLadder(L, q.cleared, 0, q.wasBest, q.from)+
    /* Never silently — a big number off a high start is not a long climb, and
       the screen has to say which it was before anyone reads it as a best. */
    (q.from>L.lo
      ? '<div class="streakline">Started at level '+q.from+' · '+
        esc(L.tier(q.from))+'</div>' : '')+
    /* "A new best — it was level 0" is what a first run used to say. */
    '<div class="streakline">'+(!q.wasBest ? "First go at this one"
      : beat ? "🎉 A new best — it was level "+q.wasBest
      : "Best so far: level "+q.wasBest)+'</div>'+
    '<div class="streakline">'+q.right+' of '+q.asked+' right</div>'+
    (q.missed.length?'<div class="again"'+(L.optLang?' lang="'+L.optLang+'"':'')+
      '>Tripped on: <b>'+esc(q.missed.join(", "))+'</b></div>':'')+
    '<div class="btnrow">'+
      '<button class="btn go" id="cAgain">Go again</button>'+
      '<button class="btn soft" id="cBack">Back to the quizzes</button>'+
    '</div></div>';
}

function climbSpeak(it){
  hush();
  climb.L.speak(it).forEach(function(p){ say(p[0], p[1], p[2]); });
}
function wireClimb(){
  var q=climb, L=q.L;
  if(q.done){
    document.getElementById("cAgain").onclick=function(){ hush(); newBuddy(); startClimb(L.id); };
    document.getElementById("cBack").onclick=function(){ newBuddy(); go("quiz"); };
    return;
  }
  document.getElementById("cB").onclick=function(){ go("quiz"); };
  var p=document.getElementById("cP");
  if(p) p.onclick=function(){ sfxTap(); climbSpeak(q.it); };
  var g=document.getElementById("cG");
  if(g) g.onclick=function(){ q.graded?climbNext():climbGrade(); };
  document.querySelectorAll("[data-opt]").forEach(function(b){
    b.onclick=function(){ if(!q.graded) climbGrade(b.dataset.opt); };
  });
  /* Hearing an answer is not choosing it, and it goes on working once the
     answer is in — see climbOpts(). */
  document.querySelectorAll("[data-say]").forEach(function(b){
    b.onclick=function(){ hush(); say(b.dataset.say, 0.7, L.optLang||"en-GB"); };
  });
  var a=document.getElementById("ca");
  if(a && !q.graded){
    a.addEventListener("keydown",function(e){
      if(e.key==="Enter"){ e.preventDefault(); g.click(); }
    });
    a.focus();
  }
  /* Once per question, not once per draw — render() rebuilds this card whenever
     anything is tapped, and re-arming here restarted the word mid-sentence. */
  if(!q.graded && q.spoke!==q.asked){
    q.spoke=q.asked;
    setTimeout(function(){ climbSpeak(q.it); }, 250);
  }
}

/* ==========================================================================
   THE QUIZ SCREEN — eight cards in a grid, drawn by app.js's vQuiz().

   It has a tab of its own rather than a corner of Training because Training is
   a wall of coloured boxes for the school's lists, and at the foot of it the
   one thing in the app that is nobody's homework could not be found.

   Cards rather than a panel each: one panel per quiz was fine at four and would
   be a minute of scrolling at eight. A card is one tap to play at the rung it
   remembers, and the rung picker is behind "Levels" for the once in a while
   anybody wants to move it.
   ========================================================================== */
var qopen="";                     /* which card has its levels showing */

function quizCards(){
  var s='<div class="qgrid">';
  LADDERS.forEach(function(L){ s+=quizCard(L); });
  return s+'</div>';
}
function quizCard(L){
  var best=ladBest(L), from=ladFrom(L), l=ladLast(L), open=(qopen===L.id);
  var s='<div class="qcard'+(open?" open":"")+'">'+
    '<button class="qgo" data-climb="'+L.id+'">'+
      '<span class="qem">'+L.em+'</span>'+
      '<span class="qnm">'+esc(L.name)+'</span>'+
      '<span class="qsub">Level '+from+' · '+esc(L.tier(from))+'</span>'+
    '</button>'+
    '<div class="qfoot">'+
      '<span class="qbest">'+(best?"best "+best:"new")+'</span>'+
      '<button class="qlv" data-qopen="'+L.id+'" aria-expanded="'+(open?"true":"false")+'">'+
        (open?"Hide levels":"Levels")+'</button>'+
    '</div>';
  if(open){
    s+='<p class="empty" style="padding:10px 0">'+esc(L.blurb)+'</p>'+
       climbPicker(L)+
       '<div class="key">'+(best
         ? "Best so far: level "+best+" · "+esc(L.tier(best))+" · "+esc(L.rung(best))+
           (l?" · last go "+esc(dshort(l.ts)):"")
         : esc(L.note))+'</div>';
    /* Said on the card rather than discovered mid-question: with no voice for
       the language the game still works off the meaning on screen, but nothing
       will be read out, and a silent Play button looks like a broken one. */
    if(L.voice && !bestVoice(L.voice)){
      s+='<p class="warn" style="margin:10px 0 0">This device has no '+
         esc(L.vname||L.name)+' voice, so the words stay silent rather than being '+
         'read out in an English accent. On an iPad: Settings → Accessibility → '+
         'Spoken Content → Voices.</p>';
    }
  }
  return s+'</div>';
}

/* The same ladder, tappable: pick the rung the run starts on. The same boxes in
   the same order as the run itself draws them, so "I got to twelve" and "start
   me at twelve" are the same row on the screen — and bigger than the ladder
   proper, because these ones get hit with a finger on an iPad. */
function climbPicker(L){
  var sel=ladFrom(L), best=ladBest(L);
  var s='<div class="clad pick" role="group" aria-label="Starting level">';
  for(var n=L.lo;n<=L.hi;n++){
    var cls = (best && n<=best) ? " done" : "";
    if(best && n===best) cls+=" best";
    /* .crung.now is declared after .crung.done in the stylesheet, so the rung
       about to be started on stays yellow even inside the cleared range. */
    if(n===sel) cls+=" now";
    s+='<button type="button" class="crung'+cls+'" data-cfrom="'+L.id+':'+n+'" '+
       'aria-pressed="'+(n===sel?"true":"false")+'" '+
       'title="Level '+n+' · '+esc(L.tier(n))+' · '+esc(L.rung(n))+'">'+
       n+'</button>';
  }
  return s+'</div>';
}

/* Everything on a card, wired by whichever screen drew it. */
function wireClimbPanel(){
  /* Its own attribute, not data-t: a ladder is not a code start() knows. */
  document.querySelectorAll("[data-climb]").forEach(function(b){
    b.onclick=function(){ sfxTap(); startClimb(b.dataset.climb); };
  });
  document.querySelectorAll("[data-qopen]").forEach(function(b){
    b.onclick=function(){
      qopen = (qopen===b.dataset.qopen) ? "" : b.dataset.qopen;
      sfxTap(); render();
    };
  });
  /* Picking a rung only saves the setting and redraws — it does not start the
     run. Tapping along a ladder to see what the rungs are called should not
     drop a boy straight into twenty-letter words. */
  document.querySelectorAll("[data-cfrom]").forEach(function(b){
    b.onclick=function(){
      var p=b.dataset.cfrom.split(":");
      setLadFrom(ladBy(p[0]), p[1]); sfxTap(); render();
    };
  });
}

/* ==========================================================================
   BERRIES — the three things a 看图作文 sheet can actually be tested on.

   词语: the eight words off the sheet, each one tapped back into the sentence
   it belongs in. Same mechanic as 听写 — he hears the word, sees the sentence
   with a gap in it, and taps the characters — because that is the mechanic
   that works on an iPad and it is the one he already knows.

   好句: the plain sentence beside the lively one. This is the whole point of
   the sheet: he can already say what happened, and what Berries is teaching is
   how to say it so somebody wants to read it.

   结构: where each picture goes, which 开头法, which 结尾法. Knowing the shape
   is what stops a boy writing four sentences and stopping.

   Writing it is not tested and will not be. He writes the composition on paper
   in his own hand, his teacher marks it, and an app that gave that a number
   would be inventing one — same reason the 默写 sheet is a reading list and
   not a quiz.
   ========================================================================== */
function beBy(id){
  for(var i=0;i<BERRIES.length;i++) if(BERRIES[i].id===id) return BERRIES[i];
  return null;
}
function beTest(L, part){
  return "Berries "+L.id+" "+(part==="ci" ? "词语" : part==="ju" ? "好句" : "结构");
}
/* Everything he could be asked to tap, so a four-character word is chosen from
   more than four tiles and the answer is not the only thing on screen. */
function beTiles(L, need){
  var seen={}, pool=[];
  need.split("").forEach(function(c){ seen[c]=1; });
  L.words.forEach(function(w){
    w[0].split("").forEach(function(c){ if(!seen[c]){ seen[c]=1; pool.push(c); } });
  });
  return shuffled(need.split("").concat(shuffled(pool).slice(0, Math.min(5, pool.length))));
}
function beItems(L, part){
  var out=[];
  if(part==="ci"){
    L.words.forEach(function(w){
      out.push({k:"bd", kind:"词语", h:w[0], word:w[0], a:w[0], m:w[2], s:w[3],
                tiles:beTiles(L, w[0]), lesson:L.id});
    });
  } else if(part==="ju"){
    L.good.forEach(function(g){
      out.push({k:"pick", kind:"好句", lang:"zh-CN",
                q:"哪一句比较生动？", tip:"Tap the livelier one.",
                a:g[1], c:shuffled([g[0], g[1]]), why:g[2]});
    });
  } else {
    L.frame.forEach(function(f){
      out.push({k:"pick", kind:"结构", lang:"zh-CN", q:f[0], a:f[1],
                c:shuffled([f[1]].concat(f[2])), why:f[3]});
    });
  }
  return out;
}
function startBerries(id, part){
  var L=beBy(id);
  if(!L) return;
  W("who", L.who);                 /* these sheets are TC's */
  startItems(beItems(L, part), beTest(L, part), "华文", "zh-CN", "be|"+L.id+"|"+part);
}
/* Passed, or have another go. The mark is out of the marks available, which on
   the 词语 part is one per character — a boy who puts 口水直流 with one
   character wrong has not failed the word, and 7 of 8 words is not the same
   as 7 of 8 tries. */
function bePass(L, part){
  var r=lastFor(beTest(L, part), L.who);
  if(!r) return null;
  return {score:r.score, total:r.total, ts:r.ts, ok:(r.score/r.total)>=BE_PASS};
}
