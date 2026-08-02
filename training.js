/* ==========================================================================
   CHEWTOPIA — TRAINING tab. The list of tests, the subject filter, the maths
   generator, and the quiz that runs when a test is tapped.
   ========================================================================== */

function pFilter(){ return S("pfilter","all"); }

/* Both boys side by side. Each column is that child's own lists, because
   they are in different years and never sit the same test. */
function testsFor(kid, f){
  var s="", any=false;

  var wk=weakTop(kid, 12);
  if(wk.length){
    s+='<button class="test rev" data-t="weak" data-kid="'+kid+'">'+
       '<span class="tx"><span class="nm">Tricky ones</span>'+
       '<span class="mt">'+esc(wk.slice(0,3).map(weakLabel).join(", "))+
       (wk.length>3?", \u2026":"")+'</span></span>'+
       '<span class="pill beat">Go</span></button>';
  }

  if(f==="all"||f==="en"){
    var eb = kid==="tc" ? TC_SPELL : SC_SPELL, ec = kid==="tc" ? "en" : "es";
    if(Object.keys(eb).length){
      s+='<div class="sub">English spelling</div>'; any=true;
      Object.keys(eb).forEach(function(k){
        s+='<button class="test" data-t="'+ec+'|'+k+'" data-kid="'+kid+'">'+
          '<span><span class="nm">'+(kid==="tc"?"List "+k:esc(k))+'</span>'+
          '<span class="mt">'+eb[k][1].length+' questions</span></span>'+
          pill(kid==="tc"?("Spelling "+k):k, kid)+'</button>'; });
    }
  }

  if(f==="all"||f==="zh"){
    var bank = kid==="tc" ? TC_PINYIN : SC_TINGXIE;
    if(Object.keys(bank).length){
      s+='<div class="sub">'+(kid==="tc"?"\u534e\u6587 \u00b7 \u6c49\u8bed\u62fc\u97f3":"\u534e\u6587\u542c\u5199")+'</div>'; any=true;
      Object.keys(bank).forEach(function(k){
        s+='<button class="test" data-t="zh|'+k+'" data-kid="'+kid+'">'+
          '<span><span class="nm">'+esc(k)+'</span>'+
          '<span class="mt">'+bank[k].length+' words</span></span>'+pill(k, kid)+'</button>'; });
    }

    if(kid==="tc"){
      s+='<div class="sub">\u751f\u5b57\u8868 \u00b7 \u6211\u4f1a\u8ba4</div>';
      Object.keys(HANZI).forEach(function(k){
        s+='<button class="test" data-t="rn|'+k+'" data-kid="'+kid+'">'+
          '<span><span class="nm">'+esc(k)+'</span>'+
          '<span class="mt">'+HANZI[k].length+' \u5b57 \u00b7 see the character, write the pinyin</span></span>'+
          pill("\u6211\u4f1a\u8ba4 "+k, kid)+'</button>'; });

      s+='<div class="sub">\u751f\u5b57\u8868 \u00b7 \u6211\u4f1a\u5199</div>';
      Object.keys(HANZI).forEach(function(k){
        s+='<button class="test" data-t="hz|'+k+'" data-kid="'+kid+'">'+
          '<span><span class="nm">'+esc(k)+'</span>'+
          '<span class="mt">'+HANZI[k].map(function(x){return x[0];}).join("")+'</span></span>'+
          pill("\u6211\u4f1a\u5199 "+k, kid)+'</button>'; });
    }
  }

  if(f==="all"||f==="ma"){
    s+='<div class="sub">Maths</div>'; any=true;
    [["easy","Warm up","Add and take away to 20"],
     ["times","Times tables","2 to 10"],
     ["hard","Challenge","Bigger numbers and division"]].forEach(function(m){
      s+='<button class="test" data-t="ma|'+m[0]+'" data-kid="'+kid+'">'+
        '<span><span class="nm">'+m[1]+'</span><span class="mt">'+m[2]+'</span></span>'+
        pill("Math \u00b7 "+m[1], kid)+'</button>';
    });
  }

  if(!any && !wk.length) s+='<p class="empty">Nothing here yet.</p>';
  return s;
}

function vTests(){
  var f=pFilter();
  var opts=[["all","Everything"],["en","English"],["zh","华文"],["ma","Maths"]]
    .map(function(o){ return '<option value="'+o[0]+'"'+(f===o[0]?" selected":"")+'>'+o[1]+'</option>'; }).join("");

  var s='<div class="panel"><h2><span class="em">📝</span> Training</h2>'+
        '<div class="lbl">Subject</div><select id="pf">'+opts+'</select>'+
        '<div style="height:14px"></div><div class="duo">';

  KIDS.forEach(function(k){
    s+='<div class="kidbox"><button class="kidname '+whoCls(k.id)+'" data-rename="'+k.id+'">'+
       esc(pname(k.id))+'<small>'+k.level+
       (streak(k.id).n?' \u00b7 '+streak(k.id).n+"\uD83D\uDD25":"")+'</small></button>'+
       testsFor(k.id, f)+'</div>';
  });
  s+='</div></div>';

  /* voice settings */
  var sp=parseFloat(S("rate","0.85"));
  var ve=bestVoice("en-GB"), vc=bestVoice("zh-CN");
  s+='<div class="panel"><h2><span class="em">🔊</span> Voice</h2>'+
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
  document.querySelectorAll("[data-rename]").forEach(function(b){
    b.onclick=function(){
      var id=b.dataset.rename;
      var n=prompt("Name (kept on this device only)", pname(id));
      if(n && n.trim()){ W("name:"+id, n.trim().slice(0,16)); render(); }
    };
  });
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

function start(code){
  if(code==="weak") return startWeak();
  var p=code.split("|"), items, subject, test, lang="en-GB";
  if(p[0]==="en"){ subject="English"; test="Spelling "+p[1];
    items=TC_SPELL[p[1]][1].map(function(x){ return {k:x[0],s:x[1],a:x[2]}; }); }
  else if(p[0]==="es"){ subject="English"; test=p[1];
    items=SC_SPELL[p[1]][1].map(function(x){ return {k:x[0],s:x[1],a:x[2]}; }); }
  else if(p[0]==="hz"){
    subject="华文"; test="我会写 "+p[1]; lang="zh-CN";
    var set=HANZI[p[1]];
    items=set.slice().sort(function(){ return Math.random()-0.5; }).map(function(x){
      var pool=set.filter(function(y){ return y[0]!==x[0]; }).sort(function(){ return Math.random()-0.5; });
      var opts=[x[0], pool[0][0], pool[1][0], pool[2][0]].sort(function(){ return Math.random()-0.5; });
      return {k:"hz", h:x[0], a:x[1], tone:x[2], word:x[3], m:x[4], opts:opts};
    });
  }
  else if(p[0]==="rn"){
    subject="华文"; test="我会认 "+p[1]; lang="zh-CN";
    items=HANZI[p[1]].slice().sort(function(){ return Math.random()-0.5; }).map(function(x){
      return {k:"rn", h:x[0], a:x[1], tone:x[2], word:x[3], m:x[4]};
    });
  }
  else if(p[0]==="zh"){ subject="华文"; test=p[1]; lang="zh-CN";
    var bank=who()==="tc"?TC_PINYIN:SC_TINGXIE;
    items=bank[p[1]].slice().sort(function(){ return Math.random()-0.5; })
      .map(function(x){ return {k:"py",h:x[0],word:x[1],a:x[2],tone:x[3],m:x[4]}; }); }
  else { subject="Math";
    test="Math · "+(p[1]==="easy"?"Warm up":p[1]==="times"?"Times tables":"Challenge");
    items=mathItems(p[1]); }
  quiz={code:code,subject:subject,test:test,lang:lang,items:items,
        i:0,score:0,streak:0,best:0,missed:[],graded:false,done:false};
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
    '<div class="kind">'+(it.k==="rn"?"我会认":it.k==="hz"?"我会写":it.k==="py"?"听写":it.k==="dict"?"Dictation":it.k==="math"?"Question":"Spelling")+
      ' '+(q.i+1)+' of '+q.items.length+'</div>';
  if(it.k==="rn"){
    s+='<div class="hz">'+it.h+'</div>'+
       '<div class="ctx">'+(q.graded?esc(it.word)+' · '+esc(it.m):"Write the pinyin and the tone")+'</div>'+
       '<div class="pair"><span class="f1"><div class="lbl">Pinyin</div>'+
       '<input type="text" id="qa" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="yong"></span>'+
       '<span class="f2"><div class="lbl">Tone</div>'+
       '<input type="text" id="qt" inputmode="numeric" maxlength="1" placeholder="1-4"></span></div>'+
       '<div class="switch"><button class="addlink" id="qP">🔊 Hear it</button></div>';
  }
  else if(it.k==="hz"){
    s+='<div class="ctx big-word">'+esc(it.word.replace(it.h,"_"))+'</div>'+
       '<div class="qq">'+esc(it.a)+(it.tone||"")+'</div>'+
       '<div class="tip">'+esc(it.m)+'</div>'+
       '<button class="btn play wide" id="qP">🔊 Hear the word</button>'+
       (S("hzmode","tap")==="tap"
        ? '<div class="opts">'+it.opts.map(function(c){
            return '<button class="opt" data-opt="'+c+'">'+c+'</button>'; }).join("")+
          '<input type="hidden" id="qa" value="">'+
          '<div class="switch"><button class="addlink" id="hzSwitch">Write it instead</button></div>'
        : '<input type="text" id="qa" autocomplete="off" spellcheck="false" '+
          'class="hzin" placeholder="写这个字" lang="zh">'+
          '<div class="switch"><button class="addlink" id="hzSwitch">Tap from four instead</button></div>');
  }
  else if(it.k==="py"){
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
  g.onclick=function(){ q.graded?next():grade(); };

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
  a.addEventListener("keydown",function(e){ if(e.key==="Enter"&&it.k!=="dict"){ e.preventDefault(); g.click(); } });
  var t=document.getElementById("qt");
  if(t) t.addEventListener("keydown",function(e){ if(e.key==="Enter"){ e.preventDefault(); g.click(); } });
  if(!q.graded){
    if(a && a.type!=="hidden") a.focus();
    if(it.k!=="math" && it.k!=="rn") setTimeout(function(){ speakIt(it); },250);
  }
}
function speakIt(it){
  hush();
  /* Always read the whole word, never a lone character: 更, 长, 乐, 种 and 教
     all have two readings and the engine guesses wrong without the context. */
  if(it.k==="py"||it.k==="hz"||it.k==="rn"){
    say(it.word,0.9,"zh-CN");
    setTimeout(function(){ say(it.word,0.8,"zh-CN"); },1300);
  }
  else if(it.k==="dict"){ say("Write this sentence.",0.92); say(it.s,0.8); say("Once more.",0.92); say(it.s,0.72); }
  else { say("Spell,",0.92); say(it.a+".",0.76); say(it.s,0.86); say(it.a+".",0.7); }
}
function grade(){
  var q=quiz, it=q.items[q.i], given=document.getElementById("qa").value, right, detail="";
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
  else if(it.k==="py"){
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
    q.missed.push(it.k==="py"?it.h+" ("+it.a+(it.tone||"")+")":it.k==="math"?it.q:it.a);
    q.wrong.push(it);
    weakAdd(it, q.code);
  }
  q.graded=true;
  render();
  var a=document.getElementById("qa"); a.value=given; a.disabled=true;
  if(document.getElementById("qt")) document.getElementById("qt").disabled=true;
  var cnQ = (it.k==="py"||it.k==="hz"||it.k==="rn");
  var pr = right ? praise(cnQ, q.streak) : {t:pick(OOPS_EN), lang:null};
  q.say = pr;
  document.getElementById("qf").innerHTML='<div class="fb '+(right?"ok":"no")+'">'+
    '<span class="big">'+(right && q.streak>=3 ? "\uD83D\uDD25 "+q.streak+" \u00b7 "+esc(pr.t)
      : esc(pr.t))+'</span>'+detail+'</div>';
  document.getElementById("qG").textContent=(q.i===q.items.length-1)?"See the score":"Next";

  if(right){
    if(q.streak>=3) sfxStreak(); else sfxWin();
    burst(q.streak>=3?30:18);
    botReact("cheer");
  } else {
    sfxLose(); botReact("oops");
  }

  hush();
  if(right) say(q.say.t, q.say.lang?0.95:0.95, q.say.lang||undefined);
  else if(it.k==="py"||it.k==="hz"||it.k==="rn") say(it.word,0.85,"zh-CN");
  else if(it.k!=="math") say(it.a,0.6);
}
function next(){
  var q=quiz; q.i++; q.graded=false;
  if(q.i>=q.items.length){ q.done=true;
    addResult({who:who(),subject:q.subject,code:q.code,test:q.test,score:q.score,
               total:q.items.length,missed:q.missed,ts:Date.now()});
    bumpStreak(); }
  render(); scrollTo(0,0);
}
function doneHTML(){
  var q=quiz, p=q.score/q.items.length;
  var st=p===1?"★★★":p>=.8?"★★☆":p>=.5?"★☆☆":"☆☆☆";
  var rank=p===1?"S":p>=.9?"A":p>=.8?"B":p>=.6?"C":"D";
  var rk=p===1?"Full marks!":p>=.8?"Very good":p>=.5?"Getting there":"Worth another go";
  if(!q.cheered){
    q.cheered=true;
    sfxDone(); burst(p>=0.8?40:16);
    say(p>=0.8?"Well done!":"Good effort. Try again.",0.95);
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
