/* TPG Agentic AI Capabilities Explorer — module.js */
// Trusted Types policy for HubSpot CSP compliance
(function(){
  if(window.trustedTypes && window.trustedTypes.createPolicy){
    try {
      window.tpgTT = window.trustedTypes.createPolicy('tpg-html', {
        createHTML: function(s){ return s; }
      });
    } catch(e){ window.tpgTT = null; }
  } else {
    window.tpgTT = null;
  }
})();

function tpgSetInnerHTML(el, html){
  if(!el) return;
  try {
    el.innerHTML = window.tpgTT ? window.tpgTT.createHTML(html) : html;
  } catch(e){ el.textContent = html; }
}

var S = { cat:'', sub:'', proc:null, data:{} };
var _gateProc = null; // captured when gate opens

var CAT_META = {
  'Brand Management':     { desc:'Monitor sentiment, manage reputation, and enforce voice consistency across every channel.' },
  'Content Marketing':    { desc:'Generate, optimize, and distribute content at scale from ideation through performance.' },
  'Demand Generation':    { desc:'Identify high-intent accounts, personalize campaigns, and nurture leads with precision.' },
  'Customer Marketing':   { desc:'Predict churn, surface expansion signals, and activate advocacy programs.' },
  'Digital Marketing':    { desc:'Optimize bids, shift budgets in real-time, and predict creative performance.' },
  'Marketing Operations': { desc:'Clean data, route leads, monitor integrations, and flag anomalies automatically.' },
  'Marketing Analytics':  { desc:'Real-time dashboards, attribution across every touchpoint, and predictive forecasts.' },
  'Sales Enablement':     { desc:'Surface the right content, score deals, transcribe calls, and coach reps.' },
  'Event Marketing':      { desc:'Predict attendance, score leads, and generate follow-up campaigns post-event.' },
  'Field Marketing':      { desc:'Identify high-ROI regions, localize messaging, and track activation sentiment.' },
  'Partner Marketing':    { desc:'Identify top partners, automate onboarding, route leads, and flag churn risk.' },
  'Public Relations':     { desc:'Monitor media 24/7, predict crisis risks, and draft press materials in minutes.' },
  'Market Research':      { desc:'Scan competitor moves and market shifts — delivering intelligence in hours.' },
  'Customer Experience':  { desc:'Map journey friction, predict churn, and personalize every touchpoint.' },
  'Product Marketing':    { desc:'Monitor competitor features, generate battlecards, and keep GTM current.' }
};

var CAT_SVG = {
  'Brand Management':     '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="14"/><path d="M18 8 l3 6 h6 l-5 4 2 6-6-4-6 4 2-6-5-4h6z"/></svg>',
  'Content Marketing':    '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="6" width="22" height="28" rx="2"/><line x1="12" y1="13" x2="24" y2="13"/><line x1="12" y1="18" x2="24" y2="18"/><line x1="12" y1="23" x2="19" y2="23"/><circle cx="25" cy="28" r="4" fill="none"/><line x1="28" y1="31" x2="30" y2="33"/></svg>',
  'Demand Generation':    '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="5,28 12,20 18,24 26,13 31,8"/><polyline points="27,8 31,8 31,12"/><circle cx="12" cy="20" r="2" fill="currentColor" stroke="none"/><circle cx="18" cy="24" r="2" fill="currentColor" stroke="none"/><circle cx="26" cy="13" r="2" fill="currentColor" stroke="none"/></svg>',
  'Customer Marketing':   '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 30 C18 30 6 22 6 14 a7 7 0 0 1 12-4.9A7 7 0 0 1 30 14c0 8-12 16-12 16z"/></svg>',
  'Digital Marketing':    '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="28" height="18" rx="2"/><line x1="14" y1="30" x2="22" y2="30"/><line x1="11" y1="30" x2="25" y2="30"/><circle cx="18" cy="17" r="5"/><line x1="18" y1="12" x2="18" y2="8"/><line x1="18" y1="22" x2="18" y2="26"/><line x1="23" y1="17" x2="32" y2="17"/><line x1="4" y1="17" x2="13" y2="17"/></svg>',
  'Marketing Operations': '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="4"/><path d="M18 6v3M18 27v3M6 18h3M27 18h3"/><path d="M9.5 9.5l2.1 2.1M24.4 24.4l2.1 2.1M9.5 26.5l2.1-2.1M24.4 11.6l2.1-2.1"/><circle cx="18" cy="18" r="10" stroke-dasharray="3 3"/></svg>',
  'Marketing Analytics':  '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="20" width="6" height="12" rx="1"/><rect x="15" y="14" width="6" height="18" rx="1"/><rect x="25" y="8" width="6" height="24" rx="1"/><polyline points="8,18 18,12 28,6"/><circle cx="8" cy="18" r="2" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="2" fill="currentColor" stroke="none"/><circle cx="28" cy="6" r="2" fill="currentColor" stroke="none"/></svg>',
  'Sales Enablement':     '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 28 h20 a2 2 0 0 0 2-2 V16 l-6-8 H8 a2 2 0 0 0-2 2 v16 a2 2 0 0 0 2 2z"/><path d="M22 8 v8 h8"/><line x1="11" y1="18" x2="21" y2="18"/><line x1="11" y1="22" x2="18" y2="22"/></svg>',
  'Event Marketing':      '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="10" width="26" height="22" rx="2"/><line x1="5" y1="17" x2="31" y2="17"/><line x1="13" y1="6" x2="13" y2="13"/><line x1="23" y1="6" x2="23" y2="13"/><circle cx="12" cy="23" r="2" fill="currentColor" stroke="none"/><circle cx="18" cy="23" r="2" fill="currentColor" stroke="none"/><circle cx="24" cy="23" r="2" fill="currentColor" stroke="none"/></svg>',
  'Field Marketing':      '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 4 a9 9 0 0 1 9 9c0 7-9 19-9 19S9 20 9 13a9 9 0 0 1 9-9z"/><circle cx="18" cy="13" r="3"/></svg>',
  'Partner Marketing':    '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="5"/><circle cx="24" cy="14" r="5"/><path d="M4 30 a8 8 0 0 1 16 0"/><path d="M16 30 a8 8 0 0 1 16 0"/></svg>',
  'Public Relations':     '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 10 h24 a2 2 0 0 1 2 2 v10 a2 2 0 0 1-2 2 H16 l-6 4 v-4 H6 a2 2 0 0 1-2-2 V12 a2 2 0 0 1 2-2z"/><circle cx="12" cy="17" r="1.5" fill="currentColor" stroke="none"/><circle cx="18" cy="17" r="1.5" fill="currentColor" stroke="none"/><circle cx="24" cy="17" r="1.5" fill="currentColor" stroke="none"/></svg>',
  'Market Research':      '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="10"/><line x1="23" y1="23" x2="31" y2="31"/><line x1="11" y1="16" x2="21" y2="16"/><line x1="16" y1="11" x2="16" y2="21"/></svg>',
  'Customer Experience':  '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="13"/><circle cx="13" cy="15" r="2" fill="currentColor" stroke="none"/><circle cx="23" cy="15" r="2" fill="currentColor" stroke="none"/><path d="M12 22 q6 6 12 0"/></svg>',
  'Product Marketing':    '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 4 l14 8 v12 l-14 8 L4 24 V12z"/><path d="M18 4 v28"/><path d="M4 12 l14 8 l14-8"/></svg>'
};

function $id(i){ return document.getElementById(i); }
function setText(i,t){ var e=$id(i); if(e) e.textContent=t; }
function setHTML(i,h){
  var e=$id(i); if(!e) return;
  try { e.innerHTML=h; }
  catch(ex){
    try { var f=document.createRange().createContextualFragment(h); e.textContent=''; e.appendChild(f); }
    catch(ex2){ e.textContent=h; }
  }
}
function show(i){ var e=$id(i); if(e) e.style.display=''; }
function hide(i){ var e=$id(i); if(e) e.style.display='none'; }
function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

var STEPS = ['land','cat','sub','detail'];
function goTo(step){
  STEPS.forEach(function(s,i){
    var sec=$id('s-'+s);
    if(sec) sec.classList.toggle('on', s===step);
    var dot=$id('d'+(i+1));
    if(dot){
      dot.classList.remove('active','done');
      var cur=STEPS.indexOf(step);
      if(i===cur) dot.classList.add('active');
      else if(i<cur) dot.classList.add('done');
    }
  });
  window.scrollTo(0,0);
}

function loadData(){
  var el=$id('tpg-data'); if(!el) return;
  try{
    var rows=JSON.parse(el.textContent).results||[];
    rows.forEach(function(r){
      if(!r.c||!r.p) return;
      if(!S.data[r.c]) S.data[r.c]={};
      if(!S.data[r.c][r.s]) S.data[r.c][r.s]=[];
      S.data[r.c][r.s].push({p:r.p,v:r.v,b:r.b,a:r.a,m:r.m,t:r.t});
    });
  }catch(e){ console.warn('TPG data error',e); }
  tagAllProcesses();
}

function parseSteps(str){
  if(!str) return {summary:'',steps:[]};
  var hm=str.match(/^(\d+\s+steps?,\s*[^:]+):/i);
  var summary=hm?hm[1].trim():'';
  var body=hm?str.slice(hm[0].length).trim():str;
  var parts=body.split(/\s*\u2192\s*/);
  var steps=parts.map(function(s){
    s=s.trim().replace(/\.\s*\d+%.*$/i,'').trim();
    if(!s||s.length<4) return null;
    var tm=s.match(/\(([^)]*(?:h(?:our)?s?|m(?:in(?:ute)?s?)?)[^)]*)\)/i);
    var time=tm?tm[1].replace(/\s+/g,' ').trim():'';
    var name=s.replace(/\([^)]*\)/g,'').replace(/^\d+\.\s*/,'').trim();
    return name?{name:name,time:time}:null;
  }).filter(Boolean);
  return {summary:summary,steps:steps};
}

function extractTimes(b,a){
  var bh=(b||'').match(/(\d[\d\s\-\u2013]+)\s*hours?/i);
  var ah=(a||'').match(/(\d[\d\s\-\u2013]+)\s*(hours?|minutes?)/i);
  return {
    before: bh ? bh[1].trim()+' hrs'  : '',
    after:  ah ? ah[1].trim()+' '+(ah[2].toLowerCase().startsWith('m')?'min':'hrs') : ''
  };
}

function getSaving(a){
  var m=(a||'').match(/(\d+)%\s*time/i);
  return m?m[1]+'% time savings':'';
}

var USE_CASES = [
  { tag:'Monitoring',      label:'Monitoring & Alerts',    kw:['monitor','detect','track','alert','watch','listen','surveil'] },
  { tag:'Content',         label:'Content Generation',     kw:['content','copy','writ','draft','generat','creat','narrat','messag'] },
  { tag:'Scoring',         label:'Scoring & Prioritization', kw:['scor','priorit','rank','qualify','rate','evaluat','weight'] },
  { tag:'Analysis',        label:'Analysis & Reporting',   kw:['analys','report','insight','measur','dashb','attribut','metric'] },
  { tag:'Automation',      label:'Automation & Workflow',  kw:['automat','workflow','sequence','trigger','orchestrat','streamlin'] },
  { tag:'Prediction',      label:'Prediction & Forecasting', kw:['predict','forecast','anticipat','model','likelihood','project'] },
  { tag:'Personalization', label:'Personalization',        kw:['personaliz','tailor','customiz','segment','individual','targeted'] },
  { tag:'Research',        label:'Research & Intelligence',kw:['research','intelligen','competit','landscap','benchmark','discover'] }
];

function getUseCase(proc){
  var text = (proc.p + ' ' + proc.v).toLowerCase();
  for(var i=0; i<USE_CASES.length; i++){
    var kws = USE_CASES[i].kw;
    for(var j=0; j<kws.length; j++){
      if(text.indexOf(kws[j]) !== -1) return USE_CASES[i].tag;
    }
  }
  return 'Other';
}

var TIME_BUCKETS = [
  { tag:'Quick',  label:'Under 5 hrs saved',   min:0,  max:5  },
  { tag:'Medium', label:'5\u201310 hrs saved',  min:5,  max:10 },
  { tag:'High',   label:'10\u201320 hrs saved', min:10, max:20 },
  { tag:'Major',  label:'20+ hrs saved',        min:20, max:999 }
];

function getTimeBucket(proc){
  var b = proc.b || '';
  var m = b.match(/(\d+)\s*[-\u2013]\s*(\d+)\s*hours?/i);
  var avg;
  if(m){ avg = (parseInt(m[1]) + parseInt(m[2])) / 2; }
  else { var m2 = b.match(/(\d+)\s*hours?/i); avg = m2 ? parseInt(m2[1]) : 0; }
  for(var i=TIME_BUCKETS.length-1; i>=0; i--){
    if(avg >= TIME_BUCKETS[i].min) return TIME_BUCKETS[i].tag;
  }
  return 'Quick';
}

function tagAllProcesses(){
  Object.keys(S.data).forEach(function(cat){
    Object.keys(S.data[cat]).forEach(function(sub){
      S.data[cat][sub].forEach(function(proc){
        proc._uc = getUseCase(proc);
        proc._tb = getTimeBucket(proc);
      });
    });
  });
}

function renderCatProcesses(cat){
  var catData = S.data[cat] || {};
  var subs    = Object.keys(catData);
  var wrap    = document.getElementById('sub-proc-list');
  if(!wrap) return;

  var ico     = document.getElementById('cat-hero-ico');
  var titleEl = document.getElementById('cat-hero-title');
  var descEl  = document.getElementById('cat-hero-desc');
  var meta    = CAT_META[cat] || {};
  if(ico)     tpgSetInnerHTML(ico, CAT_SVG[cat] || '');
  if(titleEl) titleEl.textContent = cat;
  if(descEl)  descEl.textContent  = meta.desc || '';

  var allProcs = [];
  subs.forEach(function(sub){
    (catData[sub] || []).forEach(function(proc){
      allProcs.push({ proc:proc, sub:sub });
    });
  });

  var ucPresent = {}, tbPresent = {};
  allProcs.forEach(function(item){
    ucPresent[item.proc._uc] = true;
    tbPresent[item.proc._tb] = true;
  });

  var filterState = { q:'', uc:null, tb:null };

  var filterBar = document.createElement('div');
  filterBar.className = 'tpg-filter-bar';

  var searchWrap = document.createElement('div');
  searchWrap.className = 'tpg-search-wrap';
  tpgSetInnerHTML(searchWrap,
    '<svg class="tpg-search-ico" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">' +
      '<circle cx="8.5" cy="8.5" r="5.5"/><line x1="13" y1="13" x2="18" y2="18"/>' +
    '</svg>' +
    '<input id="tpg-search" class="tpg-search-input" type="text" placeholder="Search processes..." autocomplete="off">');
  filterBar.appendChild(searchWrap);

  var ucRow = document.createElement('div');
  ucRow.className = 'tpg-chip-row';
  var ucLabel = document.createElement('span');
  ucLabel.className = 'tpg-chip-label';
  ucLabel.textContent = 'What it does:';
  ucRow.appendChild(ucLabel);
  USE_CASES.forEach(function(uc){
    if(!ucPresent[uc.tag]) return;
    var chip = document.createElement('button');
    chip.className = 'tpg-fchip';
    chip.setAttribute('data-uc', uc.tag);
    chip.textContent = uc.label;
    chip.addEventListener('click', function(){
      filterState.uc = filterState.uc === uc.tag ? null : uc.tag;
      ucRow.querySelectorAll('.tpg-fchip').forEach(function(c){ c.classList.remove('on'); });
      if(filterState.uc) chip.classList.add('on');
      applyFilters();
    });
    ucRow.appendChild(chip);
  });
  filterBar.appendChild(ucRow);

  var tbRow = document.createElement('div');
  tbRow.className = 'tpg-chip-row';
  var tbLabel = document.createElement('span');
  tbLabel.className = 'tpg-chip-label';
  tbLabel.textContent = 'Manual effort replaced:';
  tbRow.appendChild(tbLabel);
  TIME_BUCKETS.forEach(function(tb){
    if(!tbPresent[tb.tag]) return;
    var chip = document.createElement('button');
    chip.className = 'tpg-fchip';
    chip.setAttribute('data-tb', tb.tag);
    chip.textContent = tb.label;
    chip.addEventListener('click', function(){
      filterState.tb = filterState.tb === tb.tag ? null : tb.tag;
      tbRow.querySelectorAll('.tpg-fchip').forEach(function(c){ c.classList.remove('on'); });
      if(filterState.tb) chip.classList.add('on');
      applyFilters();
    });
    tbRow.appendChild(chip);
  });
  filterBar.appendChild(tbRow);

  var countEl = document.createElement('div');
  countEl.className = 'tpg-result-count';
  filterBar.appendChild(countEl);

  var listWrap = document.createElement('div');
  listWrap.id = 'tpg-proc-results';

  wrap.textContent = '';
  wrap.appendChild(filterBar);
  wrap.appendChild(listWrap);

  setTimeout(function(){
    var inp = document.getElementById('tpg-search');
    if(inp){
      inp.addEventListener('input', function(){
        filterState.q = inp.value.trim().toLowerCase();
        applyFilters();
      });
    }
  }, 0);

  function applyFilters(){
    var q  = filterState.q;
    var uc = filterState.uc;
    var tb = filterState.tb;

    var filtered = allProcs.filter(function(item){
      if(uc && item.proc._uc !== uc) return false;
      if(tb && item.proc._tb !== tb) return false;
      if(q){
        var text = (item.proc.p + ' ' + item.proc.v + ' ' + item.sub).toLowerCase();
        if(text.indexOf(q) === -1) return false;
      }
      return true;
    });

    countEl.textContent = filtered.length + ' of ' + allProcs.length + ' processes';

    var grouped = {}, subOrder = [];
    filtered.forEach(function(item){
      if(!grouped[item.sub]){ grouped[item.sub] = []; subOrder.push(item.sub); }
      grouped[item.sub].push(item.proc);
    });
    subOrder = subOrder.filter(function(v,i){ return subOrder.indexOf(v)===i; });

    listWrap.textContent = '';

    if(!filtered.length){
      tpgSetInnerHTML(listWrap, '<div class="tpg-no-results">No processes match those filters. Try clearing one.</div>');
      return;
    }

    subOrder.forEach(function(sub){
      var procs = grouped[sub];
      var heading = document.createElement('div');
      heading.className = 'tpg-sub-heading';
      heading.textContent = sub;
      listWrap.appendChild(heading);

      var group = document.createElement('div');
      group.className = 'tpg-proc-list';

      procs.forEach(function(proc){
        var saving  = getSaving(proc.a);
        var times   = extractTimes(proc.b, proc.a);
        var timeStr = times.before && times.after ? times.before + ' \u2192 ' + times.after : '';
        var row = document.createElement('div');
        row.className = 'tpg-proc-item';
        tpgSetInnerHTML(row,
          '<div>' +
            '<div class="tpg-proc-name">' + esc(proc.p) + '</div>' +
            '<div class="tpg-proc-vp">'   + esc(proc.v) + '</div>' +
            '<div class="tpg-proc-pills">' +
              (timeStr ? '<span class="tpg-pill">' + esc(timeStr) + '</span>' : '') +
              (saving  ? '<span class="tpg-pill tpg-pill-save">' + esc(saving) + '</span>' : '') +
            '</div>' +
          '</div>' +
          '<div class="tpg-proc-arrow">&#8250;</div>');
        row.addEventListener('click', function(){ S.sub = sub; showDetail(proc); });
        group.appendChild(row);
      });
      listWrap.appendChild(group);
    });
  }

  applyFilters();

  var bc = document.getElementById('tpg-bc');
  if(bc){ bc.textContent = cat; bc.classList.add('on'); }
  goTo('sub');
}

function showDetail(proc){
  S.proc = proc;
  _gateProc = {p:proc.p, v:proc.v, b:proc.b, a:proc.a, m:proc.m};
  setText('aeo-cat', S.cat+' \u00b7 '+S.sub);
  setText('aeo-q',   'What does \u201c'+proc.p+'\u201d do with AI?');
  setText('aeo-a',   proc.v);
  var times=extractTimes(proc.b,proc.a);
  setText('t-before', times.before||'\u2014');
  setText('t-after',  times.after||'\u2014');
  setText('t-save',   getSaving(proc.a)||'Dramatically faster');
  var mr=$id('metrics');
  if(mr){
    if(proc.m){
      tpgSetInnerHTML(mr,(proc.m).split(',').map(function(m){
        return '<div class="tpg-metric">'+esc(m.trim())+'</div>';
      }).join(''));
      mr.style.display='';
    } else { mr.style.display='none'; }
  }
  renderTimeline('tl-b-sum','tl-b',proc.b,false);
  renderTimeline('tl-a-sum','tl-a',proc.a,true);
  setHTML('tgrid','<div class="tpg-skel"></div><div class="tpg-skel"></div><div class="tpg-skel"></div>');
  hide('tspin');
  var ta=$id('ta-detail'); if(ta) ta.value='';
  var rd=$id('res-detail'); if(rd){rd.style.display='none';rd.textContent='';}
  var hint=$id('ask-hint');
  if(hint) hint.textContent='Ask anything about implementing \u201c'+proc.p+'\u201d \u2014 team size, timeline, HubSpot integration, week-one plan.';
  var bc=$id('tpg-bc');
  if(bc){ bc.textContent=S.cat+' \u203a '+S.sub+' \u203a '+proc.p; bc.classList.add('on'); }
  goTo('detail');
  fetchTools(proc);
}

function renderTimeline(sumId,listId,raw,isAfter){
  var sumEl=$id(sumId), listEl=$id(listId);
  if(!listEl) return;
  var parsed=parseSteps(raw||'');
  if(sumEl) sumEl.textContent=parsed.summary;
  if(!parsed.steps.length){
    tpgSetInnerHTML(listEl,'<div style="font-size:12px;color:var(--muted);line-height:1.6">'+esc(raw||'')+'</div>');
    return;
  }
  tpgSetInnerHTML(listEl,parsed.steps.map(function(s,i){
    var agent=isAfter&&/\bai\b|agent|auto/i.test(s.name)?'<span class="tpg-agent-tag">AI agent</span>':'';
    return '<div class="tpg-step">'+
      '<div class="tpg-step-n">'+(i+1)+'</div>'+
      '<div class="tpg-step-body">'+
        '<div class="tpg-step-nm">'+esc(s.name)+agent+'</div>'+
        (s.time?'<span class="tpg-step-t">'+esc(s.time)+'</span>':'')+
      '</div>'+
    '</div>';
  }).join(''));
}

function fetchTools(proc){
  show('tspin');
  var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  var timer = controller ? setTimeout(function(){ controller.abort(); }, 90000) : null;
  fetch('https://tpg-claude-proxy.onrender.com/claude',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    signal: controller ? controller.signal : undefined,
    body:JSON.stringify({
      model:'claude-sonnet-4-20250514',
      max_tokens:900,
      messages:[{role:'user',content:'B2B martech expert 2025. For the AI marketing process: "'+proc.p+'" list the top 3 software platforms. Return ONLY compact JSON, no markdown: {"tools":[{"name":"","description":"max 15 words","pricing":"","bestFor":"max 8 words"}]}'}]
    })
  })
  .then(function(r){return r.json();})
  .then(function(d){
    if(timer) clearTimeout(timer);
    hide('tspin');
    var text=(d.content&&d.content[0]&&d.content[0].text)||'{}';
    var parsed; try{parsed=JSON.parse(text.replace(/```[a-z]*/g,'').trim());}catch(e){parsed={tools:[]};}
    var tools=parsed.tools||[];
    if(!tools.length){
      setHTML('tgrid','<p style="font-size:13px;color:var(--muted);grid-column:1/-1">No recommendations returned.</p>');
      return;
    }
    setHTML('tgrid',tools.map(function(t,i){
      return '<div class="tpg-tool-card">'+
        '<div class="tpg-tool-top"><div class="tpg-tool-name">'+esc(t.name||'')+'</div><span class="tpg-tool-rank">#'+(i+1)+'</span></div>'+
        '<div class="tpg-tool-desc">'+esc(t.description||'')+'</div>'+
        '<div class="tpg-tool-prc">'+esc(t.pricing||'')+'</div>'+
        '<div class="tpg-tool-bst"><b>Best for:</b> '+esc(t.bestFor||'')+'</div>'+
      '</div>';
    }).join(''));
  })
  .catch(function(err){
    if(timer) clearTimeout(timer);
    hide('tspin');
    setHTML('tgrid', err&&err.name==='AbortError'
      ? '<p style="font-size:13px;color:var(--muted);grid-column:1/-1">Server warming up \u2014 try again in 30 seconds.</p>'
      : '<p style="font-size:13px;color:var(--muted);grid-column:1/-1">Could not fetch recommendations. Please try again.</p>');
  });
}

function fetchAI(inputId,resultId,btnId,ctx){
  var inp=$id(inputId),res=$id(resultId),btn=$id(btnId);
  if(!inp||!res||!btn) return;
  var q=inp.value.trim();
  if(!q){
    inp.style.borderColor='var(--teal)';
    inp.placeholder='Type your question first, then click the button.';
    inp.focus();
    setTimeout(function(){ inp.style.borderColor=''; },2000);
    return;
  }
  var originalLabel = btn.textContent;
  btn.disabled=true;
  btn.textContent='Thinking\u2026';
  res.textContent = 'Generating\u2026 usually takes 5\u201315 seconds.';
  res.style.display='block';
  var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  var timer = controller ? setTimeout(function(){ controller.abort(); }, 90000) : null;
  fetch('https://tpg-claude-proxy.onrender.com/claude',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    signal: controller ? controller.signal : undefined,
    body:JSON.stringify({
      model:'claude-sonnet-4-20250514',
      max_tokens:900,
      system:'Senior B2B revenue marketing AI consultant at The Pedowitz Group. Direct, practitioner-first, no hedging, no buzzwords. Lead with the insight.'+(ctx?' Context: '+ctx:''),
      messages:[{role:'user',content:q+'\n\nInclude: 1) AI agent approach in 2-3 sentences. 2) Top 3 platforms with pricing. 3) Expected time savings. 4) Three concrete first steps this week.'}]
    })
  })
  .then(function(r){ if(timer) clearTimeout(timer); return r.text(); })
  .then(function(raw){
    var d; try{ d=JSON.parse(raw); }catch(e){ d={}; }
    var text=(d.content&&d.content[0]&&d.content[0].text)||(d.error?'API error: '+JSON.stringify(d.error):'No response.');
    res.textContent=text; res.style.display='block';
    res.scrollIntoView({behavior:'smooth',block:'nearest'});
    btn.disabled=false; btn.textContent=originalLabel;
  })
  .catch(function(err){
    if(timer) clearTimeout(timer);
    res.textContent=err&&err.name==='AbortError'?'Timed out \u2014 please try again.':'Error: '+(err&&err.message||'unknown');
    res.style.display='block';
    btn.disabled=false; btn.textContent=originalLabel;
  });
}

// ── Gate functions ────────────────────────────────────────────────────────

function openGate(){
  if(!_gateProc){ alert('Please select a process first.'); return; }
  var nameEl = document.getElementById('gate-proc-name');
  if(nameEl) nameEl.textContent = _gateProc.p;
  var mask = document.getElementById('gateMask');
  if(mask) mask.style.display = '';
  document.body.style.overflow = 'hidden';
  var fields = document.getElementById('gate-form-fields');
  var gen    = document.getElementById('gate-generating');
  var succ   = document.getElementById('gate-success');
  if(fields) fields.style.display = '';
  if(gen)    gen.style.display    = 'none';
  if(succ)   succ.style.display   = 'none';
  var err = document.getElementById('gate-error');
  if(err) err.style.display = 'none';
}

function closeGate(){
  var mask = document.getElementById('gateMask');
  if(mask) mask.style.display = 'none';
  document.body.style.overflow = '';
}

function submitGateForm(){
  var fname   = ((document.getElementById('gate-fname')   ||{}).value||'').trim();
  var lname   = ((document.getElementById('gate-lname')   ||{}).value||'').trim();
  var email   = ((document.getElementById('gate-email')   ||{}).value||'').trim();
  var company = ((document.getElementById('gate-company') ||{}).value||'').trim();
  var errEl   = document.getElementById('gate-error');

  var emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!fname || !email || !emailRx.test(email)){
    if(errEl){ errEl.textContent='Please enter your name and a valid work email.'; errEl.style.display=''; }
    return;
  }
  if(errEl) errEl.style.display = 'none';

  var fields = document.getElementById('gate-form-fields');
  var gen    = document.getElementById('gate-generating');
  if(fields) fields.style.display = 'none';
  if(gen)    gen.style.display    = '';

  // HubSpot CRM in background
  fetch('https://api.hsforms.com/submissions/v3/integration/submit/20715596/b497605e-cd88-407d-bac0-7fefd955de00',{
    method:'POST', headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      fields:[{name:'firstname',value:fname},{name:'lastname',value:lname},{name:'email',value:email},{name:'company',value:company}],
      context:{pageUri:window.location.href,pageName:'Agentic AI Capabilities Explorer'}
    })
  }).catch(function(){});

  var proc = _gateProc;
  var cat  = S.cat || '';
  var sub  = S.sub || '';

  setStatus('Researching your process\u2026');

  var prompt =
    'You are a senior B2B AI implementation consultant at The Pedowitz Group. ' +
    'Return ONLY valid compact JSON, no markdown, no explanation, no code fences. ' +
    'Process: ' + proc.p + '. Category: ' + cat + '. Value proposition: ' + proc.v + '. ' +
    'JSON structure: ' +
    '{"why_now":"2-3 direct sentences on business urgency and impact",' +
    '"agent_approach":"3-4 plain-language sentences on how the AI agent works and what it replaces",' +
    '"platforms":[{"name":"","desc":"one-line description","pricing":"ballpark price"},{"name":"","desc":"","pricing":""},{"name":"","desc":"","pricing":""}],' +
    '"plan":{"week1":["action 1","action 2","action 3"],"week2":["action 1","action 2","action 3"],"week34":["action 1","action 2","action 3"]},' +
    '"roi":"2-3 sentences: specific time saved per week, cost reduction estimate, payback framing",' +
    '"pitfalls":["pitfall 1","pitfall 2","pitfall 3"]}';

  fetch('https://tpg-claude-proxy.onrender.com/claude',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1200,messages:[{role:'user',content:prompt}]})
  })
  .then(function(r){ return r.text(); })
  .then(function(raw){
    var envelope; try{ envelope=JSON.parse(raw); }catch(e){ envelope={}; }
    var text = (envelope.content&&envelope.content[0]&&envelope.content[0].text)||'';
    var brief; try{ brief=JSON.parse(text.replace(/```json|```/g,'').trim()); }catch(e){ brief=null; }
    setStatus('Building your PDF\u2026');
    setTimeout(function(){ generateAgenticPDF(fname+' '+lname, email, company, proc, cat, sub, brief); }, 200);
  })
  .catch(function(){
    setStatus('Building your PDF\u2026');
    setTimeout(function(){ generateAgenticPDF(fname+' '+lname, email, company, proc, cat, sub, null); }, 200);
  });
}

function setStatus(msg){
  var el = document.getElementById('gate-status');
  if(el) el.textContent = msg;
}

// ═════════════════════════════════════════════════════════════════════════
// generateAgenticPDF — IMPROVED 3-PAGE LAYOUT
// Cover (P1) · Strategic Brief (P2) · Implementation (P3)
// ═════════════════════════════════════════════════════════════════════════
function generateAgenticPDF(name, email, company, proc, cat, sub, brief){
  // ── Brand tokens ────────────────────────────────────────────────────
  var NAVY      = '#004963';
  var NAVY_DEEP = '#002e3d';
  var LIME      = '#abcf37';
  var TEAL      = '#168FB1';
  var CHAR      = '#636466';
  var CHAR2     = '#1c2b35';
  var GRAY_L    = '#E7E6E6';
  var BG_PAGE   = '#f4f6f8';
  var RED       = '#c0392b';
  var GREEN     = '#27ae60';
  var WHITE     = '#ffffff';

  var LOGO = 'https://resource.pedowitzgroup.com/hubfs/tpg-logo-white.png';

  var jspdf = window.jspdf;
  if(!jspdf){ showGateSuccess(); return; }
  var jsPDF = jspdf.jsPDF;

  // ── Data parsing ────────────────────────────────────────────────────
  function parseStepsLocal(str){
    if(!str) return [];
    return str.split(/\s*\u2192\s*/).map(function(s){
      s = s.trim().replace(/\.\s*\d+%.*$/i,'');
      if(!s||s.length<4) return null;
      var tm = s.match(/\(([^)]*(?:h(?:our)?s?|m(?:in)?s?)[^)]*)\)/i);
      var nm = s.replace(/\([^)]*\)/g,'').replace(/^\d+\.\s*/,'').replace(/^\d+\s+steps?,\s*[^:]+:\s*/i,'').trim();
      return nm ? {name:nm, time:tm?tm[1].trim():''} : null;
    }).filter(Boolean).slice(0,6);
  }

  // Numeric time extraction (number only, plus unit)
  function parseTime(str, isAfter){
    if(!str) return {num:'', unit:''};
    var m = str.match(/(\d+[\d\s\-\u2013]*?)\s*(hours?|minutes?|min|hrs?)/i);
    if(!m) return {num:'', unit:''};
    var num = m[1].trim().replace(/\s+/g,'');
    var u = m[2].toLowerCase();
    var unit = u.indexOf('m')===0 ? (isAfter?'min':'hrs') : 'hrs';
    return {num:num, unit:unit};
  }

  var bTime = parseTime(proc.b, false);
  var aTime = parseTime(proc.a, true);
  var savingMatch = (proc.a||'').match(/(\d+)%\s*time/i);
  var savingPct = savingMatch ? savingMatch[1] : '';

  var bSteps = parseStepsLocal(proc.b);
  var aSteps = parseStepsLocal(proc.a);

  // Parse metrics like "Response time -98%, Coverage +500%, Manual effort -94%"
  function parseMetrics(str){
    if(!str) return [];
    return str.split(',').map(function(s){
      s = s.trim();
      // Try to find a stat like "-98%" or "+500%" or "5x"
      var statMatch = s.match(/([\+\-]?\d+(?:\.\d+)?\s*(?:%|x))/i);
      var stat = statMatch ? statMatch[1].replace(/\s+/g,'') : '';
      var label = stat ? s.replace(statMatch[1],'').trim().replace(/[:\-\u2013]+$/,'').trim() : s;
      // Capitalize first letter of label
      if(label) label = label.charAt(0).toUpperCase() + label.slice(1);
      return {stat:stat, label:label || s};
    }).filter(function(m){ return m.stat || m.label; }).slice(0,3);
  }
  var metrics = parseMetrics(proc.m);

  // Today's date
  var now = new Date();
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var dateStr = months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();
  var validThru = 'Valid through Q' + (Math.floor(now.getMonth()/3)+2) + ' ' + now.getFullYear();

  // ── Render helpers ──────────────────────────────────────────────────
  function stepHTML(s, i, isAfter){
    var numBg  = isAfter ? '#e8f5e9' : '#fdecea';
    var numCol = isAfter ? '#2e7d32' : '#b71c1c';
    var tagBg  = isAfter ? '#c8e6c9' : '#fff3cd';
    var tagCol = isAfter ? '#1b5e20' : '#7d5a00';
    var isAI = isAfter && /\bai\b|agent|auto/i.test(s.name);
    var aiTag = isAI ? '<span style="display:inline-block;font-size:8.5px;font-weight:800;background:'+LIME+';color:'+NAVY_DEEP+';border-radius:3px;padding:1px 6px;margin-left:6px;letter-spacing:.5px;vertical-align:middle">AI</span>' : '';
    return '<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:9px">' +
      '<div style="min-width:18px;height:18px;border-radius:50%;background:'+numBg+';color:'+numCol+';font-size:9.5px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+(i+1)+'</div>' +
      '<div><div style="font-size:11.5px;font-weight:600;color:'+CHAR2+';line-height:1.4">'+esc(s.name)+aiTag+'</div>'+
        (s.time ? '<div style="display:inline-block;font-size:9px;font-weight:700;background:'+tagBg+';color:'+tagCol+';border-radius:3px;padding:1px 6px;margin-top:3px;white-space:nowrap">'+esc(s.time)+'</div>' : '')+
      '</div></div>';
  }

  function rPara(t){
    if(!t) return '<p style="font-size:12.5px;color:#aaa;font-style:italic;margin:0;line-height:1.6">Data unavailable.</p>';
    return '<p style="font-size:12.5px;color:'+CHAR+';line-height:1.65;margin:0">'+esc(t)+'</p>';
  }
  function rWhyNow(t){
    if(!t) return '<p style="font-size:14px;color:rgba(255,255,255,.6);font-style:italic;margin:0">Data unavailable.</p>';
    return '<p style="font-size:14px;font-weight:500;color:#fff;line-height:1.55;margin:0">'+esc(t)+'</p>';
  }
  function rBullets(arr){
    if(!arr||!arr.length) return '<p style="font-size:12px;color:#aaa;font-style:italic;margin:0">Data unavailable.</p>';
    return '<div style="display:flex;flex-direction:column;gap:8px">' +
      arr.slice(0,3).map(function(x){
        return '<div style="display:flex;gap:9px;align-items:flex-start">' +
          '<div style="min-width:6px;height:6px;border-radius:50%;background:'+RED+';margin-top:6px;flex-shrink:0"></div>' +
          '<div style="font-size:11.5px;color:'+CHAR+';line-height:1.55">'+esc(x)+'</div></div>';
      }).join('') + '</div>';
  }
  function rPlatforms(pp){
    if(!pp||!pp.length) return '<p style="font-size:12px;color:#aaa;font-style:italic">Data unavailable.</p>';
    return pp.slice(0,3).map(function(p,i){
      return '<div style="background:#fff;border:1px solid '+GRAY_L+';border-radius:8px;padding:12px 13px;display:flex;flex-direction:column;gap:6px">' +
        '<div style="display:flex;justify-content:space-between;align-items:center">' +
          '<div style="font-size:12.5px;font-weight:800;color:'+NAVY+';letter-spacing:-.2px">'+esc(p.name||'')+'</div>' +
          '<div style="width:18px;height:18px;border-radius:50%;background:'+NAVY+';color:#fff;font-size:9px;font-weight:800;display:flex;align-items:center;justify-content:center">'+(i+1)+'</div>' +
        '</div>' +
        '<div style="font-size:10.5px;color:'+CHAR+';line-height:1.5;min-height:32px">'+esc(p.desc||'')+'</div>' +
        '<div style="font-size:9.5px;font-weight:700;color:'+TEAL+';background:rgba(22,143,177,.10);padding:3px 8px;border-radius:10px;width:fit-content;margin-top:auto">'+esc(p.pricing||'')+'</div>' +
      '</div>';
    }).join('');
  }
  function rPlan(plan){
    if(!plan) return '<p style="font-size:12px;color:#aaa;font-style:italic">Data unavailable.</p>';
    var weeks = [
      {l:'Week 1',   sub:'Foundation',  items:plan.week1||[],  c:TEAL,      n:'1'},
      {l:'Week 2',   sub:'Train & test',items:plan.week2||[],  c:'#1565c0', n:'2'},
      {l:'Weeks 3\u20134', sub:'Roll out',items:plan.week34||[],c:'#2e7d32', n:'3'}
    ];
    return '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">' +
      weeks.map(function(w){
        return '<div style="background:#fff;border:1px solid '+GRAY_L+';border-radius:10px;padding:14px;display:flex;flex-direction:column;gap:10px">' +
          '<div style="display:flex;align-items:center;gap:9px;padding-bottom:10px;border-bottom:1px solid '+GRAY_L+'">' +
            '<div style="width:24px;height:24px;border-radius:6px;background:'+w.c+';color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0">'+w.n+'</div>' +
            '<div style="display:flex;flex-direction:column;line-height:1.1">' +
              '<div style="font-size:10.5px;font-weight:800;color:'+NAVY+';text-transform:uppercase;letter-spacing:1.3px;white-space:nowrap">'+w.l+'</div>' +
              '<div style="font-size:9px;color:'+CHAR+';font-weight:600;margin-top:3px;white-space:nowrap">'+w.sub+'</div>' +
            '</div>' +
          '</div>' +
          w.items.slice(0,4).map(function(x){
            return '<div style="display:flex;gap:9px;align-items:flex-start">' +
              '<div style="min-width:6px;height:6px;border-radius:50%;background:'+w.c+';margin-top:6px;flex-shrink:0"></div>' +
              '<div style="font-size:11px;color:'+CHAR2+';line-height:1.5;font-weight:500">'+esc(x)+'</div></div>';
          }).join('') +
        '</div>';
      }).join('')+'</div>';
  }

  // Header band reused on interior pages
  function pageHeader(pageTitle, pageNum){
    return '<div style="background:'+NAVY+';color:#fff;padding:18px 40px;display:flex;align-items:center;gap:18px;border-bottom:3px solid '+LIME+'">' +
      '<img src="'+LOGO+'" style="height:30px;width:auto;display:block;opacity:.95" crossorigin="anonymous" alt="TPG">' +
      '<div style="flex:1">' +
        '<div style="font-size:8.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.42);margin-bottom:2px">Agentic AI Implementation Report \u00b7 The Pedowitz Group</div>' +
        '<div style="font-size:14px;font-weight:800;color:#fff;line-height:1.2;letter-spacing:-.2px">'+pageTitle+'</div>' +
      '</div>' +
      '<div style="font-size:9.5px;color:rgba(255,255,255,.5);letter-spacing:.8px;text-align:right;white-space:nowrap">Page <b style="color:'+LIME+';font-weight:700">'+pageNum+'</b> / 03</div>' +
    '</div>';
  }
  function pageFooter(pageNum){
    return '<div style="background:'+NAVY+';padding:9px 40px;display:flex;justify-content:space-between;align-items:center">' +
      '<span style="font-size:8.5px;color:rgba(255,255,255,.4);letter-spacing:.6px">The Pedowitz Group \u00b7 pedowitzgroup.com \u00b7 Confidential</span>' +
      '<span style="font-size:9px;font-weight:800;color:'+LIME+';letter-spacing:1.2px">'+pageNum+' / 03</span>' +
    '</div>';
  }

  // ── Shared CSS reset for the offscreen render ───────────────────────
  var CSS = '<style>' +
    '*{box-sizing:border-box;margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}' +
    'html,body,div,p,span,h1,h2,small,b,em{font-family:Arial,Helvetica,sans-serif}' +
    '.page{width:794px;height:1123px;background:#fff;position:relative;overflow:hidden;display:flex;flex-direction:column}' +
  '</style>';

  // ═══════════════════════════════════════════════════════════════════
  // PAGE 1 — COVER
  // ═══════════════════════════════════════════════════════════════════
  var catSubStr = esc(cat) + (sub ? ' \u203a ' + esc(sub) : '');
  var coverHTML = CSS +
    '<div class="page" style="background:'+NAVY_DEEP+';color:#fff">' +
      // Top lime stripe
      '<div style="height:6px;background:'+LIME+';flex-shrink:0"></div>' +

      // Nav bar
      '<div style="padding:22px 48px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,.08);position:relative;z-index:2">' +
        '<img src="'+LOGO+'" style="height:48px;width:auto;display:block" crossorigin="anonymous" alt="The Pedowitz Group">' +
        '<div style="text-align:right">' +
          '<div style="font-size:10.5px;color:#fff;font-weight:700;letter-spacing:.5px">pedowitzgroup.com</div>' +
          '<div style="font-size:9px;color:rgba(255,255,255,.32);margin-top:2px;letter-spacing:.5px">'+dateStr+' \u00b7 Confidential</div>' +
        '</div>' +
      '</div>' +

      // Lime corner decoration
      '<div style="position:absolute;top:78px;right:0;width:170px;height:170px;background:linear-gradient(135deg,rgba(171,207,55,.10),rgba(171,207,55,0));border-top:1px solid rgba(171,207,55,.18);border-left:1px solid rgba(171,207,55,.18);border-top-left-radius:14px;pointer-events:none"></div>' +

      // Body
      '<div style="flex:1;padding:54px 48px 24px;display:flex;flex-direction:column;position:relative;z-index:1">' +

        // Category pill
        '<div style="display:inline-flex;align-items:center;gap:8px;background:rgba(171,207,55,.12);border:1px solid rgba(171,207,55,.36);border-radius:100px;padding:6px 14px;width:fit-content;margin-bottom:24px;white-space:nowrap">' +
          '<span style="width:6px;height:6px;border-radius:50%;background:'+LIME+';display:inline-block"></span>' +
          '<span style="font-size:10px;font-weight:700;color:'+LIME+';letter-spacing:1.5px;text-transform:uppercase">'+catSubStr+'</span>' +
        '</div>' +

        // Title
        '<div style="font-size:54px;font-weight:900;color:#fff;line-height:1.04;letter-spacing:-1.6px;margin:0 0 22px;max-width:640px">'+esc(proc.p)+'</div>' +

        // Lime rule
        '<div style="width:60px;height:4px;background:'+LIME+';border-radius:2px;margin-bottom:24px"></div>' +

        // AEO label + answer
        '<div style="font-size:10px;font-weight:700;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:1.8px;margin-bottom:10px">What this AI process does</div>' +
        '<div style="font-size:16px;font-weight:500;color:rgba(255,255,255,.92);line-height:1.55;max-width:600px;padding-left:18px;border-left:3px solid rgba(171,207,55,.5);margin-bottom:48px">'+esc(proc.v)+'</div>' +

        // Hero stat row
        ((savingPct || (bTime.num && aTime.num)) ?
          '<div style="display:flex;align-items:stretch;gap:24px;margin-bottom:44px">' +
            (savingPct ?
              '<div style="flex:1;background:rgba(171,207,55,.08);border:1px solid rgba(171,207,55,.28);border-radius:14px;padding:22px 26px;display:flex;align-items:center;gap:22px">' +
                '<div style="font-size:84px;font-weight:900;color:'+LIME+';line-height:.95;letter-spacing:-3.5px">'+savingPct+'%</div>' +
                '<div>' +
                  '<div style="font-size:14px;font-weight:700;color:#fff;line-height:1.2;margin-bottom:3px">Time savings</div>' +
                  '<div style="font-size:10px;font-weight:600;color:rgba(255,255,255,.45);letter-spacing:1.2px;text-transform:uppercase">vs. manual today</div>' +
                '</div>' +
              '</div>' : '') +
            ((bTime.num && aTime.num) ?
              '<div style="display:flex;flex-direction:column;gap:8px;width:200px">' +
                '<div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.10);border-radius:10px;padding:10px 14px">' +
                  '<div style="font-size:9px;font-weight:700;color:rgba(255,255,255,.45);letter-spacing:1.2px;text-transform:uppercase;margin-bottom:4px">Manually today</div>' +
                  '<div style="display:flex;align-items:baseline;gap:6px"><span style="font-size:22px;font-weight:800;color:#ff8b8b;line-height:1;letter-spacing:-.5px">'+esc(bTime.num)+'</span><span style="font-size:10px;color:rgba(255,255,255,.55);font-weight:600">'+esc(bTime.unit)+' / event</span></div>' +
                '</div>' +
                '<div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.10);border-radius:10px;padding:10px 14px">' +
                  '<div style="font-size:9px;font-weight:700;color:rgba(255,255,255,.45);letter-spacing:1.2px;text-transform:uppercase;margin-bottom:4px">With AI agents</div>' +
                  '<div style="display:flex;align-items:baseline;gap:6px"><span style="font-size:22px;font-weight:800;color:'+LIME+';line-height:1;letter-spacing:-.5px">'+esc(aTime.num)+'</span><span style="font-size:10px;color:rgba(255,255,255,.55);font-weight:600">'+esc(aTime.unit)+' / event</span></div>' +
                '</div>' +
              '</div>' : '') +
          '</div>' : '') +

        // Prepared-for footer
        '<div style="margin-top:auto;padding-top:32px;border-top:1px solid rgba(255,255,255,.10);display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px">' +
          '<div style="display:flex;flex-direction:column;gap:5px">' +
            '<span style="font-size:9px;font-weight:800;color:rgba(255,255,255,.4);letter-spacing:1.6px;text-transform:uppercase">Prepared for</span>' +
            '<span style="font-size:14px;font-weight:700;color:#fff;line-height:1.2">'+esc(name||'\u2014')+'</span>' +
            (email?'<span style="font-size:11px;color:rgba(255,255,255,.55)">'+esc(email)+'</span>':'') +
          '</div>' +
          '<div style="display:flex;flex-direction:column;gap:5px">' +
            '<span style="font-size:9px;font-weight:800;color:rgba(255,255,255,.4);letter-spacing:1.6px;text-transform:uppercase">Organization</span>' +
            '<span style="font-size:14px;font-weight:700;color:#fff;line-height:1.2">'+esc(company||'\u2014')+'</span>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;gap:5px">' +
            '<span style="font-size:9px;font-weight:800;color:rgba(255,255,255,.4);letter-spacing:1.6px;text-transform:uppercase">Report date</span>' +
            '<span style="font-size:14px;font-weight:700;color:#fff;line-height:1.2">'+dateStr+'</span>' +
            '<span style="font-size:11px;color:rgba(255,255,255,.55)">'+validThru+'</span>' +
          '</div>' +
        '</div>' +

      '</div>' +

      // Bottom lime strip
      '<div style="background:'+LIME+';padding:11px 48px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0">' +
        '<span style="font-size:9px;font-weight:800;color:'+NAVY_DEEP+';letter-spacing:1.2px;text-transform:uppercase">Confidential \u00b7 Agentic AI implementation report</span>' +
        '<span style="font-size:9px;font-weight:800;color:'+NAVY_DEEP+';letter-spacing:.5px">The Pedowitz Group \u00b7 pedowitzgroup.com</span>' +
      '</div>' +
    '</div>';

  // ═══════════════════════════════════════════════════════════════════
  // PAGE 2 — STRATEGIC BRIEF
  // ═══════════════════════════════════════════════════════════════════
  var bHTML = bSteps.length ? bSteps.map(function(s,i){return stepHTML(s,i,false);}).join('') : '<p style="font-size:11.5px;color:'+CHAR+';line-height:1.55">'+esc(proc.b||'')+'</p>';
  var aHTML = aSteps.length ? aSteps.map(function(s,i){return stepHTML(s,i,true);}).join('')  : '<p style="font-size:11.5px;color:'+CHAR+';line-height:1.55">'+esc(proc.a||'')+'</p>';

  // Metrics strip (fall back to gap-fill if proc.m empty)
  var metricsHTML = '';
  if(metrics.length){
    metricsHTML =
      '<div style="margin-top:auto;padding-top:18px">' +
        '<div style="font-size:9px;font-weight:800;color:'+NAVY+';letter-spacing:2px;text-transform:uppercase;margin-bottom:8px">Success metrics to track</div>' +
        '<div style="display:grid;grid-template-columns:repeat('+metrics.length+',1fr);gap:10px">' +
          metrics.map(function(m){
            return '<div style="background:'+BG_PAGE+';border:1px solid '+GRAY_L+';border-radius:8px;padding:12px 14px">' +
              (m.stat?'<div style="font-size:22px;font-weight:900;color:'+NAVY+';letter-spacing:-.6px;line-height:1">'+esc(m.stat)+'</div>':'') +
              '<div style="font-size:9.5px;color:'+CHAR+';font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-top:6px">'+esc(m.label)+'</div>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>';
  }

  var page2HTML = CSS +
    '<div class="page">' +
      pageHeader('Strategic brief \u2014 '+esc(proc.p), '02') +
      '<div style="flex:1;padding:28px 40px 22px;display:flex;flex-direction:column">' +

        // Section tag
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">' +
          '<span style="background:'+LIME+';color:'+NAVY_DEEP+';padding:3px 8px;border-radius:3px;font-size:10px;font-weight:800;letter-spacing:1.2px">01</span>' +
          '<span style="font-size:10px;font-weight:700;color:'+CHAR+';letter-spacing:2.5px;text-transform:uppercase">Strategic Brief</span>' +
        '</div>' +
        '<h2 style="font-size:24px;font-weight:800;color:'+NAVY+';letter-spacing:-.6px;line-height:1.2;margin:0 0 22px;max-width:620px">Why this matters now, and how the agent works</h2>' +

        // Why-now navy callout
        '<div style="background:'+NAVY+';color:#fff;border-radius:10px;padding:20px 22px 20px 26px;position:relative;overflow:hidden;margin-bottom:14px">' +
          '<div style="position:absolute;left:0;top:0;bottom:0;width:4px;background:'+LIME+'"></div>' +
          '<div style="font-size:9px;font-weight:800;color:'+LIME+';letter-spacing:2px;text-transform:uppercase;margin-bottom:8px">Why this matters now</div>' +
          rWhyNow(brief && brief.why_now) +
        '</div>' +

        // Agent approach card
        '<div style="background:#fff;border:1px solid '+GRAY_L+';border-top:3px solid '+TEAL+';border-radius:10px;padding:18px 20px;margin-bottom:18px">' +
          '<div style="font-size:9px;font-weight:800;color:'+TEAL+';letter-spacing:2px;text-transform:uppercase;margin-bottom:8px">The AI agent approach</div>' +
          rPara(brief && brief.agent_approach) +
        '</div>' +

        // Divider label
        '<div style="display:flex;align-items:center;gap:12px;margin:6px 0 14px">' +
          '<div style="flex:1;height:1px;background:'+GRAY_L+'"></div>' +
          '<div style="font-size:9.5px;font-weight:800;color:'+CHAR+';letter-spacing:2.5px;text-transform:uppercase">Workflow transformation</div>' +
          '<div style="flex:1;height:1px;background:'+GRAY_L+'"></div>' +
        '</div>' +

        // Before/after grid
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">' +
          // Before
          '<div style="background:'+BG_PAGE+';border:1px solid '+GRAY_L+';border-left:4px solid '+RED+';border-radius:10px;padding:16px 18px">' +
            '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px">' +
              '<div style="font-size:9.5px;font-weight:800;color:'+RED+';letter-spacing:1.6px;text-transform:uppercase">\u2717 Manual today</div>' +
              (bTime.num?'<div style="font-size:15px;font-weight:800;color:'+CHAR2+';letter-spacing:-.3px;white-space:nowrap">'+esc(bTime.num)+'<small style="font-size:10px;font-weight:600;color:'+CHAR+';letter-spacing:.3px;margin-left:1px"> '+esc(bTime.unit)+'</small></div>':'') +
            '</div>' +
            bHTML +
          '</div>' +
          // After
          '<div style="background:'+BG_PAGE+';border:1px solid '+GRAY_L+';border-left:4px solid '+GREEN+';border-radius:10px;padding:16px 18px">' +
            '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px">' +
              '<div style="font-size:9.5px;font-weight:800;color:'+GREEN+';letter-spacing:1.6px;text-transform:uppercase">\u2713 With AI agents</div>' +
              (aTime.num?'<div style="font-size:15px;font-weight:800;color:'+CHAR2+';letter-spacing:-.3px;white-space:nowrap">'+esc(aTime.num)+'<small style="font-size:10px;font-weight:600;color:'+CHAR+';letter-spacing:.3px;margin-left:1px"> '+esc(aTime.unit)+'</small></div>':'') +
            '</div>' +
            aHTML +
          '</div>' +
        '</div>' +

        // Success metrics strip (uses margin-top:auto to push to bottom)
        metricsHTML +

      '</div>' +
      pageFooter('02') +
    '</div>';

  // ═══════════════════════════════════════════════════════════════════
  // PAGE 3 — IMPLEMENTATION
  // ═══════════════════════════════════════════════════════════════════
  var page3HTML = CSS +
    '<div class="page">' +
      pageHeader('Implementation \u2014 30-day path to live', '03') +
      '<div style="flex:1;padding:28px 40px 22px;display:flex;flex-direction:column">' +

        // Section tag
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">' +
          '<span style="background:'+LIME+';color:'+NAVY_DEEP+';padding:3px 8px;border-radius:3px;font-size:10px;font-weight:800;letter-spacing:1.2px">02</span>' +
          '<span style="font-size:10px;font-weight:700;color:'+CHAR+';letter-spacing:2.5px;text-transform:uppercase">Implementation</span>' +
        '</div>' +
        '<h2 style="font-size:24px;font-weight:800;color:'+NAVY+';letter-spacing:-.6px;line-height:1.2;margin:0 0 22px;max-width:620px">Your 30-day path to a live agent</h2>' +

        // Platforms
        '<div style="font-size:9px;font-weight:800;color:'+NAVY+';letter-spacing:2px;text-transform:uppercase;margin-bottom:8px">Top 3 platforms to evaluate</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:18px">' +
          rPlatforms(brief && brief.platforms) +
        '</div>' +

        // Plan
        '<div style="font-size:9px;font-weight:800;color:'+NAVY+';letter-spacing:2px;text-transform:uppercase;margin-bottom:8px">30-day roadmap</div>' +
        '<div style="margin-bottom:18px">' +
          rPlan(brief && brief.plan) +
        '</div>' +

        // ROI + Pitfalls
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">' +
          '<div style="background:#fff;border:1px solid '+GRAY_L+';border-top:3px solid '+LIME+';border-radius:10px;padding:18px 20px">' +
            '<div style="font-size:9px;font-weight:800;color:'+LIME+';letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;filter:brightness(.7)"><span style="color:#6a9300">Expected business ROI</span></div>' +
            rPara(brief && brief.roi) +
          '</div>' +
          '<div style="background:#fff;border:1px solid '+GRAY_L+';border-top:3px solid '+RED+';border-radius:10px;padding:18px 20px">' +
            '<div style="font-size:9px;font-weight:800;color:'+RED+';letter-spacing:2px;text-transform:uppercase;margin-bottom:10px">Common pitfalls to avoid</div>' +
            rBullets(brief && brief.pitfalls) +
          '</div>' +
        '</div>' +

        // CTA pinned to bottom
        '<div style="margin-top:auto;background:'+NAVY+';color:#fff;border-radius:12px;padding:22px 26px;display:flex;align-items:center;gap:22px;position:relative;overflow:hidden">' +
          '<div style="position:absolute;right:-20px;top:-20px;width:160px;height:160px;border-radius:50%;background:radial-gradient(circle,rgba(171,207,55,.12),transparent 70%)"></div>' +
          '<div style="flex:1;position:relative;z-index:1">' +
            '<div style="font-size:9.5px;font-weight:800;color:'+LIME+';letter-spacing:1.8px;text-transform:uppercase;margin-bottom:8px">Next step</div>' +
            '<div style="font-size:18px;font-weight:800;color:#fff;line-height:1.2;margin-bottom:6px;letter-spacing:-.3px">Ready to implement this with TPG?</div>' +
            '<div style="font-size:11.5px;color:rgba(255,255,255,.7);line-height:1.55;max-width:380px">Our AI practice has deployed agentic processes like this for 1,500+ B2B clients since 2007. We can have you live in 30 days, on your existing stack.</div>' +
            '<div style="font-size:12px;font-weight:700;color:'+LIME+';margin-top:10px;display:inline-block">pedowitzgroup.com/contact</div>' +
          '</div>' +
          '<div style="background:'+LIME+';color:'+NAVY_DEEP+';border-radius:10px;padding:14px 18px;text-align:center;flex-shrink:0;position:relative;z-index:1;min-width:110px">' +
            '<div style="font-size:22px;font-weight:900;line-height:1;letter-spacing:-.5px">1,500+</div>' +
            '<div style="font-size:8px;font-weight:800;color:'+NAVY_DEEP+';letter-spacing:1.4px;text-transform:uppercase;margin-top:5px">Clients</div>' +
            '<div style="height:1px;background:rgba(0,73,99,.2);margin:8px 0"></div>' +
            '<div style="font-size:9.5px;font-weight:800;color:'+NAVY_DEEP+';letter-spacing:.5px">Since 2007</div>' +
          '</div>' +
        '</div>' +

      '</div>' +
      pageFooter('03') +
    '</div>';

  // ── Render ──────────────────────────────────────────────────────────
  var pages = [coverHTML, page2HTML, page3HTML];

  var wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;background:#fff;';
  document.body.appendChild(wrap);

  var pdf = new jsPDF('p','mm','a4');
  var PW = pdf.internal.pageSize.getWidth();
  var PH = pdf.internal.pageSize.getHeight();

  function renderPage(idx){
    if(idx >= pages.length){
      try { document.body.removeChild(wrap); } catch(e){}
      pdf.save('TPG-Agentic-AI-Report.pdf');
      showGateSuccess();
      return;
    }
    wrap.innerHTML = '';
    var frag = document.createElement('div');
    frag.innerHTML = pages[idx];
    var pageEl = frag.querySelector('.page');
    wrap.appendChild(pageEl);
    void wrap.offsetHeight;

    setTimeout(function(){
      window.html2canvas(pageEl, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
        windowWidth: 794,
        logging: false,
        onclone: function(doc){
          var imgs = doc.querySelectorAll('img');
          imgs.forEach(function(img){ img.crossOrigin='anonymous'; });
        }
      }).then(function(canvas){
        var imgData = canvas.toDataURL('image/jpeg', 0.94);
        if(idx > 0) pdf.addPage();
        pdf.addImage(imgData,'JPEG',0,0,PW,PH,undefined,'FAST');
        renderPage(idx+1);
      }).catch(function(e){
        console.warn('Page render error:', e);
        renderPage(idx+1);
      });
    }, idx===0 ? 800 : 250);
  }

  renderPage(0);
}


function showGateSuccess(){
  var gen  = document.getElementById('gate-generating');
  var succ = document.getElementById('gate-success');
  if(gen)  gen.style.display  = 'none';
  if(succ) succ.style.display = 'block';
}

var mask = document.getElementById('gateMask');
if(mask) mask.addEventListener('click', function(e){ if(e.target===mask) closeGate(); });

function init(){
  loadData();

  var pb=$id('path-browse');
  if(pb) pb.addEventListener('click',function(){ goTo('cat'); });

  var pd=$id('path-describe');
  if(pd) pd.addEventListener('click',function(){
    var cw=$id('challenge-wrap');
    if(cw){ cw.style.display=''; cw.scrollIntoView({behavior:'smooth',block:'nearest'}); }
    setTimeout(function(){ var ta=$id('ta-land'); if(ta) ta.focus(); },180);
  });

  document.querySelectorAll('.tpg-cat-card').forEach(function(card){
    card.addEventListener('click',function(){
      var cat=card.getAttribute('data-cat'); if(!cat) return;
      S.cat=cat; S.sub='';
      renderCatProcesses(cat);
    });
  });

  var bCat=$id('b-cat'); if(bCat) bCat.addEventListener('click',function(){ goTo('land'); });
  var bSub=$id('b-sub'); if(bSub) bSub.addEventListener('click',function(){ goTo('cat'); });
  var bDetail=$id('b-detail'); if(bDetail) bDetail.addEventListener('click',function(){ goTo('sub'); });

  var blBtn = document.getElementById('btn-land');
  if(blBtn) blBtn.addEventListener('click', function(){ fetchAI('ta-land','res-land','btn-land',''); });

  var bdBtn = document.getElementById('btn-detail');
  if(bdBtn) bdBtn.addEventListener('click', function(){
    var ctx = S.proc ? 'Process: "'+S.proc.p+'". Category: '+S.cat+'. Sub: '+S.sub+'.' : '';
    fetchAI('ta-detail','res-detail','btn-detail',ctx);
  });

  var gateClose = document.getElementById('gateClose');
  if(gateClose) gateClose.addEventListener('click', closeGate);

  var btnReport = document.getElementById('btn-get-report');
  if(btnReport) btnReport.addEventListener('click', openGate);
}

if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',init); }
else { init(); }

window.tpgSubmitGate = function(){ submitGateForm(); };
window.submitGateForm = submitGateForm;

document.addEventListener('click', function(e){
  var btn = e.target;
  while(btn && btn.id !== 'gate-submit-btn' && btn !== document.body){ btn = btn.parentElement; }
  if(btn && btn.id === 'gate-submit-btn'){ e.preventDefault(); submitGateForm(); }
});

