/* ==========================================================================
   CHEWTOPIA — TRAINING tab. The list of tests, the subject filter, the maths
   generator, and the quiz that runs when a test is tapped.
   ========================================================================== */

function pFilter(){ return S("pfilter","all"); }

/* Both boys side by side, three subject columns each, laid out exactly like
   Progress. Grey means never tried; otherwise it is the last score, with the
   name of the test in black inside the same box. */
function tCell(kid, code, name, testName, meta){
  var l = testName ? lastFor(testName, kid) : null;
  var cls = l ? scoreCls(l.score, l.total) : "none";
  var val, sub;
  if(l){
    var b = bestFor(testName, kid);
    val = l.score+"/"+l.total;
    sub = dshort(l.ts) + ((b && b.score>l.score) ? " \u00b7 best "+b.score : "");
  } else { val = "Not tried"; sub = meta||""; }
  return '<button class="tbox '+cls+'" data-t="'+esc(code)+'" data-kid="'+kid+'">'+
    (name===null ? '' : '<span class="tn">'+esc(name)+'</span>')+
    '<span class="tv'+(l?'':' small')+'">'+val+'</span>'+
    (sub?'<span class="td">'+esc(sub)+'</span>':'')+'</button>';
}

function tColumn(kid, subj){
  var out="";
  if(subj==="en"){
    var eb = kid==="tc" ? TC_SPELL : SC_SPELL, ec = kid==="tc" ? "en" : "es";
    Object.keys(eb).forEach(function(k){
      out+=tCell(kid, ec+"|"+k, kid==="tc"?("List "+k):k,
                 kid==="tc"?("Spelling "+k):k, eb[k][1].length+" questions");
    });
  }
  else if(subj==="zh"){
    var bank = kid==="tc" ? TC_PINYIN : SC_TINGXIE;
    if(Object.keys(bank).length){
      out+='<div class="mxtag">'+(kid==="tc"?"\u6c49\u8bed\u62fc\u97f3 \u00b7 \u8bcd\u8868":"\u542c\u5199")+'</div><div class="zhwrap">';
      Object.keys(bank).forEach(function(k){
        out+=tCell(kid, "zh|"+k, k, k, bank[k].length+" words");
      });
      out+='</div>';
    }
    /* 我会认 and 我会写 cover the same lessons, so they go side by side:
       one row per lesson, read it on the left, write it on the right. */
    if(kid==="tc"){
      out+='<div class="mxtag">\u751f\u5b57\u8868</div><div class="hzgrid">'+
           '<span></span><span class="hzh">\u6211\u4f1a\u8ba4</span>'+
           '<span class="hzh">\u6211\u4f1a\u5199</span>';
      Object.keys(HANZI).forEach(function(k){
        out+='<span class="hzl">'+esc(k)+'<em>'+HANZI[k].length+' \u5b57</em></span>'+
             tCell(kid, "rn|"+k, null, "\u6211\u4f1a\u8ba4 "+k, "")+
             tCell(kid, "hz|"+k, null, "\u6211\u4f1a\u5199 "+k, "");
      });
      out+='</div>';
    }
  }
  else {
    [["easy","Warm up","Add and take away to 20"],
     ["times","Times tables","2 to 10"],
     ["hard","Challenge","Bigger numbers, division"]].forEach(function(m){
      out+=tCell(kid, "ma|"+m[0], m[1], "Math \u00b7 "+m[1], m[2]);
    });
  }
  return out || '<div class="mxnone">\u2014</div>';
}

/* The one button that decides for them. Says what is in the set first. */
function dailyBtn(kid){
  var p=dailyPlan(kid);
  if(!p.any) return "";
  var bits=[];
  if(p.due.length)     bits.push(esc(practiceLabel(p.due[0]))+" coming up");
  if(p.weak.length)    bits.push(Math.min(4,p.weak.length)+" to fix");
  if(p.untried.length) bits.push("something new");
  var done = streak(kid).last===todayISO();
  return '<button class="daily'+(done?" done":"")+'" data-t="daily" data-kid="'+kid+'">'+
    '<span class="dl">'+(done?"\u2713 Done today \u00b7 go again":"Today\u2019s ten minutes")+'</span>'+
    '<span class="dm">'+esc(bits.join(" \u00b7 "))+'</span></button>';
}

function vTests(){
  var f=pFilter();
  var opts=[["all","Everything"],["en","English"],["zh","华文"],["ma","Maths"]]
    .map(function(o){ return '<option value="'+o[0]+'"'+(f===o[0]?" selected":"")+'>'+o[1]+'</option>'; }).join("");
  var pick=SUBJ_COLS.filter(function(c){ return f==="all" || f===c[0]; });

  var s='<div class="panel"><h2><span class="em">📝</span> Training</h2>'+
        '<div class="mxkey"><span><span class="dot" style="background:#C3D2DF"></span> '+
          '<b>not tried</b></span>'+
          '<span><span class="dot" style="background:#4FB86B"></span> <b>full marks</b></span>'+
          '<span><span class="dot" style="background:#FFB627"></span> <b>70% or better</b></span>'+
          '<span><span class="dot" style="background:#FF6F52"></span> <b>below 70%</b></span>'+
          '<span>last score \u00b7 tap to start</span></div>'+
        '<div class="lbl">Subject</div><select id="pf">'+opts+'</select>'+
        '<div style="height:14px"></div><div class="mx6">';

  shownKids().forEach(function(k){
    var cols=pick.filter(function(c){ return hasSubj(k.id, c[0]); });
    if(!cols.length) return;
    var wk=weakTop(k.id, 12);
    s+='<div class="kidbox"><div class="kidname '+whoCls(k.id)+'">'+
       esc(pname(k.id))+'<small>'+k.level+
       (streak(k.id).n?' \u00b7 '+streak(k.id).n+"\uD83D\uDD25":"")+'</small></div>'+
       dailyBtn(k.id)+
       (wk.length?'<button class="test rev" data-t="weak" data-kid="'+k.id+'">'+
         '<span class="tx"><span class="nm">Tricky ones</span>'+
         '<span class="mt">'+esc(wk.slice(0,3).map(weakLabel).join(", "))+
         (wk.length>3?", \u2026":"")+'</span></span>'+
         '<span class="pill beat">Go</span></button>':'')+
       '<div class="mxcols'+(cols.length===1?" one":cols.length===2?" two":"")+
       (k.id==="tc" && cols.length===3 ? " wide":"")+'">';
    cols.forEach(function(c){ s+='<div class="mxsub">'+c[1]+'</div>'; });
    cols.forEach(function(c){ s+='<div class="mxcol">'+tColumn(k.id, c[0])+'</div>'; });
    s+='</div></div>';
  });
  s+='</div></div>';

  /* voice settings */
  var sp=parseFloat(S("rate","0.85"));
  var ve=bestVoice("en-GB"), vc=bestVoice("zh-CN");
  s+='<div class="panel"><h2><span class="em">🔊</span> Voice</h2>'+
     (vc?'':'<p class="warn">No Mandarin voice on this device, so the Chinese tests '+
       'stay silent rather than being read out in an English accent. '+
       'The instructions below add one.</p>')+
     '<p class="empty">English: <b>'+esc(ve?ve.name:"none installed")+'</b><br>'+
     '\u534e\u6587: <b>'+esc(vc?vc.name:"none installed")+'</b></p>'+
     '<div class="lbl">Speaking speed</div>'+
     '<input type="range" id="rate" min="0.5" max="1.1" step="0.05" value="'+sp+'">'+
     '<div class="rateval" id="rateVal">'+(sp<0.7?"Slow":sp<0.95?"Normal":"Quick")+'</div>'+
     '<div class="btnrow"><button class="btn soft" id="vTest">Hear a sample</button></div>'+
     '<div class="key">Chewtopia picks the best voice already on this device. '+
     'To give it a better one: on <b>iPad</b> go to Settings → Accessibility → Spoken Content → '+
     'Voices and download the Enhanced or Premium voice for English and for Chinese (Mandarin). '+
     'On <b>Windows</b> open the site in Edge, and add a Chinese (Simplified, China) voice under '+
     'Settings → Time &amp; language → Speech.</div></div>';
  return s;
}
function wTests(){
  document.querySelectorAll("[data-t]").forEach(function(b){
    b.onclick=function(){
      if(b.dataset.kid) W("who", b.dataset.kid);
      start(b.dataset.t);
    };
  });
  var f=document.getElementById("pf");
  if(f) f.onchange=function(){ W("pfilter", f.value); render(); };
  var r=document.getElementById("rate");
  if(r){
    r.oninput=function(){
      W("rate", r.value);
      var v=parseFloat(r.value);
      document.getElementById("rateVal").textContent = v<0.7?"Slow":v<0.95?"Normal":"Quick";
    };
  }
  var vt=document.getElementById("vTest");
  if(vt) vt.onclick=function(){ say("Spell, mischievous. John read a book about three mischievous children.",0,"en-GB"); };
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

/* What a practice code opens, for labelling the button on Upcoming. */
function practiceLabel(code){
  var p=String(code).split("|");
  if(p[0]==="en") return "List "+p[1];
  if(p[0]==="hz") return "\u6211\u4f1a\u5199 "+p[1];
  if(p[0]==="rn") return "\u6211\u4f1a\u8ba4 "+p[1];
  if(p[0]==="ma") return "Maths \u00b7 "+(p[1]==="easy"?"Warm up":p[1]==="times"?"Times tables":"Challenge");
  return p[1];
}

/* Replay a specific set of items — used straight after a test, and by Review. */
function startItems(items, test, subject, lang, code){
  if(!items || !items.length) return;
  quiz={code:code||"review", subject:subject||"Review", test:test, lang:lang||"en-GB",
        items:items.slice().sort(function(){ return Math.random()-0.5; }),
        i:0,score:0,streak:0,best:0,missed:[],wrong:[],graded:false,done:false,review:true};
  render(); scrollTo(0,0);
}
/* Everything this child has got wrong before, hardest first. */
function startWeak(){
  var a=weakTop(who(), 12).map(function(x){ return x.it; }).filter(Boolean);
  if(!a.length) return;
  var cn=a.every(function(i){ return i.k==="hz"||i.k==="rn"||i.k==="py"; });
  startItems(a, "Review \u00b7 tricky ones", "Review", cn?"zh-CN":"en-GB", "weak");
}

/* Everything a code opens: the questions, what to call it, which voice.
   Kept apart from start() so the daily set can borrow from several at once. */
function itemsFor(code, kid){
  kid = kid || who();
  var p=String(code).split("|"), k=p[1], items, subject, test, lang="en-GB";
  try{
    if(p[0]==="en"){ subject="English"; test="Spelling "+k;
      items=TC_SPELL[k][1].map(function(x){ return {k:x[0],s:x[1],a:x[2]}; }); }
    else if(p[0]==="es"){ subject="English"; test=k;
      items=SC_SPELL[k][1].map(function(x){ return {k:x[0],s:x[1],a:x[2]}; }); }
    else if(p[0]==="hz"){
      subject="\u534e\u6587"; test="\u6211\u4f1a\u5199 "+k; lang="zh-CN";
      var set=HANZI[k];
      items=set.slice().sort(function(){ return Math.random()-0.5; }).map(function(x){
        var pool=set.filter(function(y){ return y[0]!==x[0]; }).sort(function(){ return Math.random()-0.5; });
        var opts=[x[0], pool[0][0], pool[1][0], pool[2][0]].sort(function(){ return Math.random()-0.5; });
        return {k:"hz", h:x[0], a:x[1], tone:x[2], word:x[3], m:x[4], opts:opts};
      });
    }
    else if(p[0]==="rn"){
      subject="\u534e\u6587"; test="\u6211\u4f1a\u8ba4 "+k; lang="zh-CN";
      items=HANZI[k].slice().sort(function(){ return Math.random()-0.5; }).map(function(x){
        return {k:"rn", h:x[0], a:x[1], tone:x[2], word:x[3], m:x[4]};
      });
    }
    else if(p[0]==="zh"){ subject="\u534e\u6587"; test=k; lang="zh-CN";
      /* TC types the pinyin. SC's 听写 is a handwriting test: he hears it and
         writes the characters, then it is marked by eye. */
      var bank = kid==="tc" ? TC_PINYIN : SC_TINGXIE, kind = kid==="tc" ? "py" : "tx";
      items=bank[k].slice().sort(function(){ return Math.random()-0.5; })
        .map(function(x){ return {k:kind,h:x[0],word:x[1],a:x[2],tone:x[3],m:x[4]}; }); }
    else if(p[0]==="ma"){ subject="Math";
      test="Math \u00b7 "+(k==="easy"?"Warm up":k==="times"?"Times tables":"Challenge");
      items=mathItems(k); }
  }catch(e){ return null; }
  if(!items || !items.length) return null;
  return {items:items, subject:subject, test:test, lang:lang};
}

function start(code){
  if(code==="weak")  return startWeak();
  if(code==="daily") return startDaily(who());
  var q=itemsFor(code);
  if(!q){ alert("That list is not in the app any more."); return; }
  quiz={code:code,subject:q.subject,test:q.test,lang:q.lang,items:q.items,
        i:0,score:0,streak:0,best:0,missed:[],graded:false,done:false};
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
  Object.keys(kid==="tc"?TC_PINYIN:SC_TINGXIE).forEach(function(k){ out.push("zh|"+k); });
  if(kid==="tc") Object.keys(HANZI).forEach(function(k){ out.push("rn|"+k); out.push("hz|"+k); });
  if(hasSubj(kid,"ma")) ["easy","times","hard"].forEach(function(k){ out.push("ma|"+k); });
  return out;
}
function untriedCodes(kid){
  return allCodes(kid).filter(function(c){
    var q=itemsFor(c, kid);
    return q && !lastFor(q.test, kid);
  });
}
function some(items, n){
  return (items||[]).slice().sort(function(){ return Math.random()-0.5; }).slice(0,n);
}
/* What the button says before it is pressed, so it is never a mystery box. */
function dailyPlan(kid){
  var due=dueCodes(kid), weak=weakTop(kid,8), untried=untriedCodes(kid);
  return {due:due, weak:weak, untried:untried,
          any: !!(due.length || weak.length || untried.length)};
}
function startDaily(kid){
  kid=kid||who();
  W("who", kid);
  var plan=dailyPlan(kid), items=[], seen={};
  function push(list){
    (list||[]).forEach(function(it){
      if(!it || items.length>=10) return;
      var k=weakKey(it); if(seen[k]) return;
      seen[k]=1; items.push(it);
    });
  }
  /* four from whatever is being tested soonest */
  plan.due.slice(0,2).forEach(function(c){
    var q=itemsFor(c, kid); if(q) push(some(q.items, 4));
  });
  /* four they keep getting wrong */
  push(some(plan.weak.map(function(x){ return x.it; }).filter(Boolean), 4));
  /* two from something never tried */
  if(items.length<10 && plan.untried.length){
    var q2=itemsFor(some(plan.untried,1)[0], kid);
    if(q2) push(some(q2.items, 10-items.length));
  }
  /* still short? top it up from anything at all */
  if(items.length<6){
    var q3=itemsFor(some(allCodes(kid),1)[0], kid);
    if(q3) push(some(q3.items, 10-items.length));
  }
  if(!items.length){ alert("Nothing to practise yet."); return; }
  var cn=items.every(function(i){ return i.k==="hz"||i.k==="rn"||i.k==="py"; });
  startItems(items, "Today \u00b7 ten minutes", "Review", cn?"zh-CN":"en-GB", "daily");
}

function clean(s){ return String(s||"").toLowerCase()
  .replace(/[.,!?;:'"\u2018\u2019\u201c\u201d]/g,"").replace(/\s+/g," ").trim(); }
function ltRow(t,g){ var h='<div class="lts">';
  t.split("").forEach(function(c,k){
    var ok=g[k]!==undefined&&g[k].toLowerCase()===c.toLowerCase();
    h+='<span class="lt '+(ok?"h":"s")+'">'+(c===" "?"&nbsp;":c)+'</span>'; });
  return h+'</div>'; }

/* Weak items are stored bare, without the four choices they were first shown
   with, so anything replaying them has to build a fresh set. */
function hzOpts(it){
  if(it.opts && it.opts.length>=2) return it.opts;
  var pool=[];
  Object.keys(HANZI).forEach(function(k){
    HANZI[k].forEach(function(x){ if(x[0]!==it.h) pool.push(x[0]); });
  });
  pool=pool.sort(function(){ return Math.random()-0.5; }).slice(0,3);
  if(pool.length<3) return null;                 /* not enough to choose from */
  /* kept on the item, so the four do not jump about between redraws */
  it.opts=[it.h].concat(pool).sort(function(){ return Math.random()-0.5; });
  return it.opts;
}

/* Writing mode. Any Chinese question can be answered on the pad instead of the
   keyboard, and marked by eye afterwards. SC starts there because he cannot
   type pinyin at six; TC starts on the keyboard and can switch any time. */
function cmodeKey(){ return "cmode:"+who(); }
function cmode(){ return S(cmodeKey(), who()==="sc" ? "write" : "keys"); }
function isCN(it){ return it.k==="hz"||it.k==="rn"||it.k==="py"||it.k==="tx"; }
function writing(it){ return isCN(it) && cmode()==="write"; }

/* What goes on the pad, and what is revealed when it is time to mark. */
function writeAsk(it){
  if(it.k==="hz"){
    var wd=String(it.word||it.h), tgt=String(it.h);
    var box='<b class="blank">'+"\u25a2".repeat(tgt.length)+'</b>';
    return {title:"\u5199\u4e00\u5199",
            sub:(wd.indexOf(tgt)>=0 ? esc(wd).replace(esc(tgt),box) : box),
            count:tgt.length+" character"+(tgt.length===1?"":"s")+" to write"};
  }
  if(it.k==="rn"){
    return {title:"\u5199\u62fc\u97f3", sub:'<b class="blank">'+esc(it.h)+'</b>',
            count:"pinyin and tone"};
  }
  var n=String(it.h||"").length;
  return {title:"\u542c\u4e00\u542c\uff0c\u5199\u4e00\u5199", sub:"",
          count:n+" character"+(n===1?"":"s")+" to write"};
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
    '<div class="meter"><i style="width:'+(q.i/q.items.length*100)+'%"></i></div>'+
    '<div class="kind">'+(it.k==="rn"?"我会认":it.k==="hz"?"我会写":it.k==="py"?"听写":it.k==="tx"?"听写":it.k==="dict"?"Dictation":it.k==="math"?"Question":"Spelling")+
      ' '+(q.i+1)+' of '+q.items.length+'</div>';
  if(writing(it)){
    var ask=writeAsk(it);
    s+='<div class="qq">'+ask.title+'</div>'+
       (ask.sub?'<div class="ctx big-word">'+ask.sub+'</div>':'')+
       '<button class="btn play wide" id="qP">\uD83D\uDD0A Hear it again</button>'+
       '<div class="ctx wcount">'+ask.count+'</div>'+
       ((q.show||q.graded)
        ? '<div class="hz">'+esc(it.k==="rn"?(it.a+(it.tone||"")):it.h)+'</div>'+
          '<div class="ctx">'+esc(it.word||"")+
            (it.k==="rn"?"":' \u00b7 '+esc(it.a)+(it.tone||""))+
            (it.m?' \u00b7 '+esc(it.m):"")+'</div>'
        : '<div class="padwrap"><canvas id="pad" class="pad"></canvas>'+
          '<button class="padclr" id="padClr">Rub out</button></div>'+
          '<div class="switch"><button class="addlink" id="cSwitch">Use the keyboard instead</button></div>')+
       '<input type="hidden" id="qa" value="">';
  }
  else if(it.k==="rn"){
    s+='<div class="hz">'+it.h+'</div>'+
       '<div class="ctx">'+(q.graded?esc(it.word)+' · '+esc(it.m):"Write the pinyin and the tone")+'</div>'+
       '<div class="pair"><span class="f1"><div class="lbl">Pinyin</div>'+
       '<input type="text" id="qa" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="yong"></span>'+
       '<span class="f2"><div class="lbl">Tone</div>'+
       '<input type="text" id="qt" inputmode="numeric" maxlength="1" placeholder="1-4"></span></div>'+
       '<div class="switch"><button class="addlink" id="qP">🔊 Hear it</button>'+
       '<button class="addlink" id="cSwitch">Write it on the pad</button></div>';
  }
  else if(it.k==="hz"){
    /* Say plainly which character is wanted: the word with one box missing,
       the pinyin of that character only, and how many to write. */
    var wd=String(it.word||it.h), tgt=String(it.h);
    var blanked = wd.indexOf(tgt)>=0
      ? esc(wd).replace(esc(tgt), '<b class="blank">'+"\u25a2".repeat(tgt.length)+'</b>')
      : '<b class="blank">'+"\u25a2".repeat(tgt.length)+'</b>';
    s+='<div class="qq">Write the '+(tgt.length>1?tgt.length+' characters':'character')+
         ' that goes in the box</div>'+
       '<div class="ctx big-word">'+blanked+'</div>'+
       '<div class="hint2">\u25a2 = <b>'+esc(it.a)+(it.tone||"")+'</b>'+
         (it.m?' \u00b7 '+esc(it.m):"")+'</div>'+
       '<div class="tip">The whole word is read out. Write only the box.</div>'+
       '<button class="btn play wide" id="qP">\uD83D\uDD0A Hear the word</button>'+
       (S("hzmode","tap")==="tap" && hzOpts(it)
        ? '<div class="opts">'+hzOpts(it).map(function(c){
            return '<button class="opt" data-opt="'+c+'">'+c+'</button>'; }).join("")+
          '<input type="hidden" id="qa" value="">'+
          '<div class="switch"><button class="addlink" id="hzSwitch">Type it instead</button>'+
          '<button class="addlink" id="cSwitch">Write on the pad</button></div>'
        : '<input type="text" id="qa" autocomplete="off" spellcheck="false" '+
          'class="hzin" placeholder="'+esc(tgt.length>1?"写这两个字":"写这个字")+'" lang="zh">'+
          '<div class="switch"><button class="addlink" id="hzSwitch">Tap from four instead</button>'+
          '<button class="addlink" id="cSwitch">Write on the pad</button></div>');
  }
  else if(it.k==="py"||it.k==="tx"){
    var pn=String(it.h||"").length;
    s+='<div class="hz'+(q.graded?"":" q")+'">'+(q.graded?esc(it.h):"?")+'</div>'+
       '<div class="ctx">'+(q.graded?esc(it.word)
         :"Listen, then type the pinyin for "+(pn>1?"all "+pn+" characters":"the word")+
          " \u2014 no spaces")+'</div>'+
       '<button class="btn play wide" id="qP">🔊 Hear the word</button>'+
       '<div class="pair"><span class="f1"><div class="lbl">Pinyin</div>'+
       '<input type="text" id="qa" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="yong"></span>'+
       '<span class="f2"><div class="lbl">Tone</div>'+
       '<input type="text" id="qt" inputmode="numeric" maxlength="1" placeholder="1-4"></span></div>'+
       '<div class="switch"><button class="addlink" id="cSwitch">Write it on the pad</button></div>';
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
  if(writing(it)){
    s += q.graded
      ? '<div class="btnrow"><button class="btn go" id="qG">Next</button></div>'
      : (q.show
         ? '<div class="btnrow"><button class="btn go" id="mkY">\u2713 He got it</button>'+
           '<button class="btn soft" id="mkN">\u2717 Not yet</button></div>'
         : '<div class="btnrow"><button class="btn go" id="qShow">Show the answer</button></div>');
    return s+'<div id="qf"></div></div>';
  }
  return s+'<div class="btnrow"><button class="btn go" id="qG">Check</button></div><div id="qf"></div></div>';
}
function wireQuiz(){
  var q=quiz;
  if(q.done){
    document.getElementById("dBack").onclick=function(){ newBuddy(); go("practice"); };
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

  /* the writing pad: finger or Apple Pencil, and a rub-out */
  var pad=document.getElementById("pad");
  if(pad) wirePad(pad);
  var shw=document.getElementById("qShow");
  if(shw) shw.onclick=function(){ sfxTap(); q.show=true; render(); };
  var my=document.getElementById("mkY"), mn=document.getElementById("mkN");
  if(my) my.onclick=function(){ grade(true); };
  if(mn) mn.onclick=function(){ grade(false); };

  var cs=document.getElementById("cSwitch");
  if(cs) cs.onclick=function(){
    W(cmodeKey(), cmode()==="write" ? "keys" : "write");
    q.show=false; render();
  };

  var sw=document.getElementById("hzSwitch");
  if(sw) sw.onclick=function(){
    W("hzmode", S("hzmode","tap")==="tap" ? "type" : "tap"); render(); };

  document.querySelectorAll("[data-opt]").forEach(function(b){
    b.onclick=function(){
      if(q.graded) return;
      sfxTap();
      document.getElementById("qa").value=b.dataset.opt;
      document.querySelectorAll("[data-opt]").forEach(function(x){ x.classList.remove("sel"); });
      b.classList.add("sel");
    };
  });
  var a=document.getElementById("qa");
  if(a) a.addEventListener("keydown",function(e){ if(e.key==="Enter"&&it.k!=="dict"){ e.preventDefault(); g.click(); } });
  var t=document.getElementById("qt");
  if(t) t.addEventListener("keydown",function(e){ if(e.key==="Enter"&&g){ e.preventDefault(); g.click(); } });
  if(!q.graded && !q.show){
    if(a && a.type!=="hidden") a.focus();
    if(it.k!=="math" && it.k!=="rn") setTimeout(function(){ speakIt(it); },250);
  }
}
/* A plain writing pad. Nothing is recognised — a six-year-old writing 快乐 with
   a finger cannot be graded by software honestly, so it is marked by eye. */
function wirePad(cv){
  var box=cv.parentNode, w=box.clientWidth-2, h=Math.round(Math.min(300, w*0.42));
  var dpr=window.devicePixelRatio||1;
  cv.style.width=w+"px"; cv.style.height=h+"px";
  cv.width=w*dpr; cv.height=h*dpr;
  var x=cv.getContext && cv.getContext("2d");
  if(!x) return;                      /* no canvas: paper still works fine */
  x.scale(dpr,dpr);
  x.lineWidth=7; x.lineCap="round"; x.lineJoin="round"; x.strokeStyle="#16202B";

  function grid(){
    x.save();
    x.strokeStyle="#D9E4EF"; x.lineWidth=1; x.setLineDash([6,6]);
    x.beginPath(); x.moveTo(0,h/2); x.lineTo(w,h/2);
    x.moveTo(w/2,0); x.lineTo(w/2,h);
    /* 田字格 style boxes across, so characters get a place to sit */
    var n=Math.max(2,Math.round(w/h)), s=w/n;
    for(var i=1;i<n;i++){ x.moveTo(i*s,0); x.lineTo(i*s,h); }
    x.stroke(); x.restore();
  }
  grid();

  var down=false, px=0, py=0;
  function pos(e){
    var r=cv.getBoundingClientRect();
    var t=e.touches?e.touches[0]:e;
    return [t.clientX-r.left, t.clientY-r.top];
  }
  function begin(e){ e.preventDefault(); down=true; var p=pos(e); px=p[0]; py=p[1]; }
  function move(e){
    if(!down) return; e.preventDefault();
    var p=pos(e);
    x.beginPath(); x.moveTo(px,py); x.lineTo(p[0],p[1]); x.stroke();
    px=p[0]; py=p[1];
  }
  function end(){ down=false; }
  cv.addEventListener("pointerdown",begin); cv.addEventListener("pointermove",move);
  cv.addEventListener("pointerup",end);     cv.addEventListener("pointerleave",end);
  cv.addEventListener("touchstart",begin,{passive:false});
  cv.addEventListener("touchmove",move,{passive:false});
  cv.addEventListener("touchend",end);

  var clr=document.getElementById("padClr");
  if(clr) clr.onclick=function(){ x.clearRect(0,0,w,h); grid(); sfxTap(); };
}

function speakIt(it){
  hush();
  /* Always read the whole word, never a lone character: 更, 长, 乐, 种 and 教
     all have two readings and the engine guesses wrong without the context. */
  if(it.k==="py"||it.k==="hz"||it.k==="rn"||it.k==="tx"){
    say(it.word,0.9,"zh-CN");
    setTimeout(function(){ say(it.word,0.8,"zh-CN"); },1300);
  }
  else if(it.k==="dict"){ say("Write this sentence.",0.92); say(it.s,0.8); say("Once more.",0.92); say(it.s,0.72); }
  else { say("Spell,",0.92); say(it.a+".",0.76); say(it.s,0.86); say(it.a+".",0.7); }
}
function grade(forced){
  var q=quiz, it=q.items[q.i], right, detail="";
  var ga=document.getElementById("qa"), given = ga ? ga.value : "";
  if(writing(it)){
    right = forced===true;
    detail='<b style="font-size:34px">'+esc(it.h)+'</b><br>'+esc(it.word||"")+' \u00b7 '+
           esc(it.a)+(it.tone||"")+(it.m?'<br>'+esc(it.m):"");
  }
  else
  if(it.k==="rn"){
    var tn2=(document.getElementById("qt")||{value:""}).value.trim();
    var pOK2=clean(given)===clean(it.a), tOK2=!it.tone||tn2===it.tone;
    right=pOK2&&tOK2;
    detail='<b style="font-size:30px">'+it.h+'</b> &nbsp; '+esc(it.word)+'<br>'+
      (pOK2?"Pinyin ✓":"Pinyin ✗ → <b>"+esc(it.a)+"</b>")+
      (it.tone?(" &nbsp;·&nbsp; "+(tOK2?"Tone ✓":"Tone ✗ → <b>"+it.tone+"</b>")):" &nbsp;·&nbsp; neutral tone")+
      '<br>'+esc(it.m);
  }
  else if(it.k==="hz"){
    var gv=String(given||"").trim();
    right = gv===it.h;
    detail='<b style="font-size:34px">'+it.h+'</b><br>'+esc(it.word)+' · '+esc(it.a)+(it.tone||"")+
           '<br>'+esc(it.m)+(right?"":'<br>You put: '+(esc(gv)||"nothing"));
  }
  else if(it.k==="py"||it.k==="tx"){
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

  q.marks = q.marks || [];
  q.marks[q.i] = right;
  q.wrong = q.wrong || [];
  if(right){
    q.score++; q.streak++; q.best=Math.max(q.best,q.streak);
    weakDrop(it);
  } else {
    q.streak=0;
    q.missed.push((it.k==="py"||it.k==="tx")?it.h+" ("+it.a+(it.tone||"")+")":it.k==="math"?it.q:it.a);
    q.wrong.push(it);
    weakAdd(it, q.code);
  }
  q.graded=true;
  render();
  var a=document.getElementById("qa");
  if(a){ a.value=given; a.disabled=true; }
  if(document.getElementById("qt")) document.getElementById("qt").disabled=true;
  var cnQ = (it.k==="py"||it.k==="hz"||it.k==="rn"||it.k==="tx");
  var pr = right ? praise(cnQ, q.streak) : oops(cnQ);
  q.say = pr;
  document.getElementById("qf").innerHTML='<div class="fb '+(right?"ok":"no")+'">'+
    '<span class="big">'+(right && q.streak>=3 ? "\uD83D\uDD25 "+q.streak+" \u00b7 "+esc(pr.t)
      : esc(pr.t))+'</span>'+detail+'</div>';
  var gb=document.getElementById("qG");
  if(gb) gb.textContent=(q.i===q.items.length-1)?"See the score":"Next";

  if(right){
    if(q.streak>=3) sfxStreak(); else sfxWin();
    burst(q.streak>=3?30:18);
    botReact("cheer");
  } else {
    sfxLose(); botReact("oops");
  }

  hush();
  if(right) say(q.say.t, q.say.lang?0.95:0.95, q.say.lang||undefined);
  else if(it.k==="py"||it.k==="hz"||it.k==="rn"||it.k==="tx") say(it.word,0.85,"zh-CN");
  else if(it.k!=="math") say(it.a,0.6);
}
function next(){
  var q=quiz; q.i++; q.graded=false; q.show=false;
  if(q.i>=q.items.length){ q.done=true;
    addResult({who:who(),subject:q.subject,code:q.code,test:q.test,score:q.score,
               total:q.items.length,missed:q.missed,ts:Date.now()});
    bumpStreak(); }
  render(); scrollTo(0,0);
}
function doneHTML(){
  var q=quiz, p=q.score/q.items.length;
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
    '<div class="big">'+q.score+' / '+q.items.length+'</div>'+
    '<div class="st">'+st+'</div>'+
    '<div class="rankbadge r'+rank+'">Rank '+rank+'</div>'+
    '<div class="rk">'+rk+'</div>'+
    '<div class="streakline">Longest streak: '+q.best+'</div>'+
    (q.missed.length?'<div class="again">Missed: <b>'+esc(q.missed.join(", "))+'</b></div>':'')+
    '<div class="btnrow">'+
    ((q.wrong&&q.wrong.length)
      ? '<button class="btn go" id="dFix">Fix the '+q.wrong.length+' missed \u2192</button>' : '')+
    '<button class="btn '+((q.wrong&&q.wrong.length)?"soft":"go")+'" id="dAgain">Try again</button>'+
    '<button class="btn soft" id="dBack">Back to training</button></div></div>';
}
