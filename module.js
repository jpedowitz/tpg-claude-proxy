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
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

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

  // ── JSON-structured prompt — no markdown parsing needed ────────────────
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


function generateAgenticPDF(name, email, company, proc, cat, sub, brief){
  var NAVY='#004963', LIME='#ABCF37', TEAL='#168FB1', CHAR='#636466';
  var RED='#c0392b', GREEN='#27ae60', ORANGE='#e07b00', LIGHT='#f4f6f8';

  var jspdf = window.jspdf;
  if(!jspdf){ showGateSuccess(); return; }
  var jsPDF = jspdf.jsPDF;

  // Time extraction
  var beforeTime='', afterTime='', saving='';
  if(proc.b){ var bm=proc.b.match(/(\d+[\d\s\-\u2013]*)\s*hours?/i); if(bm) beforeTime=bm[1].trim()+' hrs'; }
  if(proc.a){ var am=proc.a.match(/(\d+[\d\s\-\u2013]*)\s*(hours?|minutes?)/i); if(am) afterTime=am[1].trim()+(am[2].toLowerCase().startsWith('m')?' min':' hrs'); }
  var sm=proc.a?(proc.a.match(/(\d+)%\s*time/i)||[]):[];
  if(sm[1]) saving=sm[1]+'% time savings';

  // Step parser
  function parseStepsLocal(str){
    if(!str) return [];
    return str.split(/\s*\u2192\s*/).map(function(s){
      s = s.trim().replace(/\.\s*\d+%.*$/i,'');
      if(!s||s.length<4) return null;
      var tm = s.match(/\(([^)]*(?:h(?:our)?s?|m(?:in)?s?)[^)]*)\)/i);
      var nm = s.replace(/\([^)]*\)/g,'').replace(/^\d+\.\s*/,'').replace(/^\d+\s+steps?,\s*[^:]+:\s*/i,'').trim();
      return nm ? {name:nm, time:tm?tm[1]:''} : null;
    }).filter(Boolean).slice(0,6);
  }

  var bSteps = parseStepsLocal(proc.b);
  var aSteps = parseStepsLocal(proc.a);

  function stepHTML(s, i, isAfter){
    var numBg  = isAfter ? '#e8f5e9' : '#fdecea';
    var numCol = isAfter ? '#2e7d32' : '#b71c1c';
    var tagBg  = isAfter ? '#c8e6c9' : '#fff3cd';
    var tagCol = isAfter ? '#1b5e20' : '#7d5a00';
    return '<div style="display:flex;gap:9px;align-items:flex-start;margin-bottom:8px">' +
      '<div style="min-width:18px;height:18px;border-radius:50%;background:'+numBg+';color:'+numCol+';font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">'+(i+1)+'</div>' +
      '<div><div style="font-size:12px;font-weight:600;color:#1c2b35;line-height:1.35">'+s.name+'</div>'+
        (s.time ? '<div style="display:inline-block;font-size:9.5px;font-weight:700;background:'+tagBg+';color:'+tagCol+';border-radius:3px;padding:1px 6px;margin-top:3px">'+s.time+'</div>' : '')+
      '</div></div>';
  }

  var bHTML = bSteps.map(function(s,i){return stepHTML(s,i,false);}).join('') || '<p style="font-size:11px;color:'+CHAR+';line-height:1.5">'+proc.b+'</p>';
  var aHTML = aSteps.map(function(s,i){return stepHTML(s,i,true);}).join('') || '<p style="font-size:11px;color:'+CHAR+';line-height:1.5">'+proc.a+'</p>';

  // JSON section renderers
  function rPara(t, lightText){
    var col = lightText ? 'rgba(255,255,255,.84)' : CHAR;
    if(!t) return '<p style="font-size:12px;color:'+(lightText?'rgba(255,255,255,.4)':'#aaa')+';font-style:italic">Data unavailable.</p>';
    return '<p style="font-size:12.5px;color:'+col+';line-height:1.8;margin:0">'+t+'</p>';
  }
  function rBullets(arr){
    if(!arr||!arr.length) return '<p style="font-size:12px;color:#aaa;font-style:italic">Data unavailable.</p>';
    return arr.map(function(x){
      return '<div style="display:flex;gap:9px;margin-bottom:9px;align-items:flex-start">' +
        '<div style="min-width:6px;height:6px;border-radius:50%;background:'+RED+';margin-top:5px"></div>' +
        '<div style="font-size:12px;color:'+CHAR+';line-height:1.65">'+x+'</div></div>';
    }).join('');
  }
  function rPlatforms(pp){
    if(!pp||!pp.length) return '<p style="font-size:12px;color:#aaa;font-style:italic">Data unavailable.</p>';
    return pp.map(function(p,i){
      return '<div style="background:#fff;border:1px solid #dde4eb;border-radius:8px;padding:11px 14px;margin-bottom:8px">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">' +
          '<span style="font-size:13px;font-weight:700;color:'+NAVY+'">'+(i+1)+'. '+p.name+'</span>' +
          '<span style="font-size:10.5px;color:'+TEAL+';font-weight:600;background:rgba(22,143,177,.1);padding:2px 8px;border-radius:10px">'+p.pricing+'</span>' +
        '</div>' +
        '<div style="font-size:11.5px;color:'+CHAR+';line-height:1.5">'+p.desc+'</div>' +
      '</div>';
    }).join('');
  }
  function rPlan(plan){
    if(!plan) return '<p style="font-size:12px;color:#aaa;font-style:italic">Data unavailable.</p>';
    var weeks = [
      {l:'Week 1',   items:plan.week1||[], c:TEAL,       bg:'#e3f4f9'},
      {l:'Week 2',   items:plan.week2||[], c:'#1565c0',  bg:'#e8eef8'},
      {l:'Weeks 3–4',items:plan.week34||[],c:'#2e7d32',  bg:'#e8f5e9'}
    ];
    return '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">' +
      weeks.map(function(w){
        return '<div style="background:'+w.bg+';border-radius:8px;padding:12px 13px;border-top:3px solid '+w.c+'">' +
          '<div style="font-size:9.5px;font-weight:800;color:'+w.c+';text-transform:uppercase;letter-spacing:1.2px;margin-bottom:9px">'+w.l+'</div>' +
          w.items.map(function(x){
            return '<div style="display:flex;gap:7px;margin-bottom:7px;align-items:flex-start">' +
              '<div style="min-width:5px;height:5px;border-radius:50%;background:'+w.c+';margin-top:5px"></div>' +
              '<div style="font-size:11px;color:#1c2b35;line-height:1.5">'+x+'</div></div>';
          }).join('') +
        '</div>';
      }).join('')+'</div>';
  }

  // Shared CSS — no Google Fonts needed (Arial renders fine in html2canvas)
  var CSS = '<style>' +
    '*{box-sizing:border-box;margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}' +
    'html,body,div,p,span{font-family:Arial,Helvetica,sans-serif}' +
    '.page{width:794px;background:#fff;position:relative;overflow:hidden}' +
    // Page header
    '.phdr{background:'+NAVY+';padding:15px 36px;border-bottom:3px solid '+LIME+';display:flex;justify-content:space-between;align-items:center}' +
    '.phdr-text{flex:1}' +
    '.phdr-eye{font-size:8.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:2px}' +
    '.phdr-ttl{font-size:14px;font-weight:800;color:#fff;line-height:1.2}' +
    '.phdr-sub{font-size:9.5px;color:rgba(255,255,255,.4);margin-top:2px;font-style:italic}' +
    // Page footer
    '.pftr{background:'+NAVY+';padding:7px 36px;display:flex;justify-content:space-between;align-items:center}' +
    // Body
    '.pbdy{padding:22px 32px 18px}' +
    // Cards
    '.card{background:'+LIGHT+';border:1px solid #d8dee5;border-radius:8px;padding:15px}' +
    '.card-navy{background:'+NAVY+';border-radius:8px;padding:15px 18px}' +
    // Labels
    '.lbl{font-size:9px;font-weight:800;letter-spacing:1.8px;text-transform:uppercase;margin-bottom:9px}' +
  '</style>';

  var LOGO = 'https://resource.pedowitzgroup.com/hubfs/tpg-logo-white.png';

  var wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;background:#fff;font-family:Arial,sans-serif;';
  document.body.appendChild(wrap);
  var pages = [];

  // ═══════════════════════════════════════════════════════
  // PAGE 1 — FULL-BLEED COVER
  // ═══════════════════════════════════════════════════════
  var coverHTML = CSS +
    '<div class="page" style="min-height:1123px;background:'+NAVY+';display:flex;flex-direction:column">' +
      // Top lime stripe
      '<div style="background:'+LIME+';height:6px;flex-shrink:0"></div>' +

      // Nav bar — logo + URL
      '<div style="padding:20px 44px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,.08)">' +
        '<img src="'+LOGO+'" style="height:32px;width:auto" crossorigin="anonymous" alt="The Pedowitz Group">' +
        '<div style="font-size:9px;color:rgba(255,255,255,.28);letter-spacing:.8px">pedowitzgroup.com</div>' +
      '</div>' +

      // Main content
      '<div style="flex:1;padding:40px 44px 32px;display:flex;flex-direction:column">' +

        // Category tag
        '<div style="display:inline-block;background:rgba(171,207,55,.15);border:1px solid rgba(171,207,55,.35);border-radius:100px;padding:5px 14px;margin-bottom:20px;width:fit-content">' +
          '<span style="font-size:9.5px;font-weight:700;color:'+LIME+';letter-spacing:1.5px;text-transform:uppercase">'+cat+(sub?' &rsaquo; '+sub:'')+'</span>' +
        '</div>' +

        // Process title
        '<div style="font-size:36px;font-weight:900;color:#fff;line-height:1.1;margin-bottom:14px;max-width:580px;letter-spacing:-.5px">'+proc.p+'</div>' +

        // Lime rule
        '<div style="width:52px;height:4px;background:'+LIME+';border-radius:2px;margin-bottom:20px"></div>' +

        // AEO answer
        '<div style="font-size:11px;font-weight:600;color:rgba(255,255,255,.32);margin-bottom:9px;text-transform:uppercase;letter-spacing:1px">What This AI Process Does</div>' +
        '<div style="font-size:15px;font-weight:600;color:rgba(255,255,255,.9);line-height:1.6;max-width:560px;margin-bottom:32px;padding-left:16px;border-left:4px solid '+LIME+'">'+proc.v+'</div>' +

        // Time comparison blocks
        (beforeTime&&afterTime ?
          '<div style="display:flex;align-items:center;gap:14px;margin-bottom:32px">' +
            '<div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:14px 20px;text-align:center">' +
              '<div style="font-size:22px;font-weight:900;color:rgba(255,100,100,.9);line-height:1;letter-spacing:-.5px">'+beforeTime+'</div>' +
              '<div style="font-size:9px;color:rgba(255,255,255,.35);margin-top:5px;text-transform:uppercase;letter-spacing:.8px">manually today</div>' +
            '</div>' +
            '<div style="font-size:22px;color:rgba(255,255,255,.15)">\u2192</div>' +
            '<div style="background:rgba(171,207,55,.12);border:1px solid rgba(171,207,55,.3);border-radius:10px;padding:14px 20px;text-align:center">' +
              '<div style="font-size:22px;font-weight:900;color:'+LIME+';line-height:1;letter-spacing:-.5px">'+afterTime+'</div>' +
              '<div style="font-size:9px;color:rgba(255,255,255,.35);margin-top:5px;text-transform:uppercase;letter-spacing:.8px">with AI agents</div>' +
            '</div>' +
            (saving?'<div style="background:'+LIME+';color:'+NAVY+';border-radius:8px;padding:10px 16px;font-weight:900;font-size:13px;letter-spacing:.3px">'+saving+'</div>':'') +
          '</div>' : '') +

        // Prepared for
        '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
          '<div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:11px 16px">' +
            '<div style="font-size:8.5px;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Prepared for</div>' +
            '<div style="font-size:14px;font-weight:700;color:#fff">'+name+'</div>' +
            (email?'<div style="font-size:10.5px;color:rgba(255,255,255,.38);margin-top:2px">'+email+'</div>':'') +
          '</div>' +
          (company?'<div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:11px 16px"><div style="font-size:8.5px;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Organization</div><div style="font-size:14px;font-weight:700;color:#fff">'+company+'</div></div>':'') +
        '</div>' +

      '</div>' +

      // Spacer
      '<div style="flex:1"></div>' +

      // Bottom bar
      '<div style="background:'+LIME+';padding:10px 44px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0">' +
        '<span style="font-size:8.5px;font-weight:700;color:'+NAVY+';letter-spacing:.8px;text-transform:uppercase">Confidential &middot; Agentic AI Implementation Report</span>' +
        '<span style="font-size:8.5px;font-weight:700;color:'+NAVY+'">The Pedowitz Group &middot; pedowitzgroup.com</span>' +
      '</div>' +
    '</div>';

  var d1 = document.createElement('div'); d1.innerHTML = coverHTML;
  pages.push(d1.querySelector('.page'));

  // ═══════════════════════════════════════════════════════
  // PAGE 2 — WORKFLOW + STRATEGIC BRIEF
  // ═══════════════════════════════════════════════════════
  var page2HTML = CSS +
    '<div class="page" style="min-height:1123px">' +
      '<div class="phdr">' +
        '<div class="phdr-text">' +
          '<div class="phdr-eye">Agentic AI Implementation Report &middot; The Pedowitz Group</div>' +
          '<div class="phdr-ttl">Workflow Analysis &amp; Strategic Brief</div>' +
          '<div class="phdr-sub">'+proc.p+'</div>' +
        '</div>' +
        '<img src="'+LOGO+'" style="height:24px;width:auto;opacity:.6;margin-left:20px" crossorigin="anonymous" alt="TPG">' +
      '</div>' +
      '<div class="pbdy">' +

        // Before/After
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">' +
          '<div class="card" style="border-left:4px solid '+RED+'">' +
            '<div style="font-size:10px;font-weight:800;color:'+RED+';text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">\u2717 Manual Process Today</div>' +
            bHTML +
          '</div>' +
          '<div class="card" style="border-left:4px solid '+GREEN+'">' +
            '<div style="font-size:10px;font-weight:800;color:'+GREEN+';text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">\u2713 With AI Agents</div>' +
            aHTML +
          '</div>' +
        '</div>' +

        // Why Now — navy card
        '<div class="card-navy" style="margin-bottom:12px">' +
          '<div class="lbl" style="color:'+LIME+'">Why This Matters Now</div>' +
          rPara(brief&&brief.why_now, true) +
        '</div>' +

        // AI Approach
        '<div class="card" style="margin-bottom:12px">' +
          '<div class="lbl" style="color:'+TEAL+'">The AI Agent Approach</div>' +
          rPara(brief&&brief.agent_approach, false) +
        '</div>' +

        // Platforms
        '<div class="card">' +
          '<div class="lbl" style="color:'+TEAL+'">Top 3 Platforms</div>' +
          rPlatforms(brief&&brief.platforms) +
        '</div>' +

      '</div>' +
      '<div class="pftr">' +
        '<span style="font-size:8.5px;color:rgba(255,255,255,.35)">The Pedowitz Group &middot; pedowitzgroup.com</span>' +
        '<span style="font-size:8.5px;color:'+LIME+';font-weight:600">'+email+'</span>' +
      '</div>' +
    '</div>';

  var d2 = document.createElement('div'); d2.innerHTML = page2HTML;
  pages.push(d2.querySelector('.page'));

  // ═══════════════════════════════════════════════════════
  // PAGE 3 — PLAN + ROI + PITFALLS + CTA
  // ═══════════════════════════════════════════════════════
  var page3HTML = CSS +
    '<div class="page" style="min-height:1123px">' +
      '<div class="phdr">' +
        '<div class="phdr-text">' +
          '<div class="phdr-eye">Agentic AI Implementation Report &middot; The Pedowitz Group</div>' +
          '<div class="phdr-ttl">30-Day Implementation Plan &amp; Business Case</div>' +
          '<div class="phdr-sub">'+proc.p+'</div>' +
        '</div>' +
        '<img src="'+LOGO+'" style="height:24px;width:auto;opacity:.6;margin-left:20px" crossorigin="anonymous" alt="TPG">' +
      '</div>' +
      '<div class="pbdy">' +

        // 30-day plan
        '<div style="margin-bottom:16px">' +
          '<div class="lbl" style="color:'+NAVY+'">30-Day Implementation Roadmap</div>' +
          rPlan(brief&&brief.plan) +
        '</div>' +

        // ROI + Pitfalls
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">' +
          '<div class="card" style="border-left:4px solid '+LIME+'">' +
            '<div class="lbl" style="color:'+NAVY+'">Expected Business ROI</div>' +
            rPara(brief&&brief.roi, false) +
          '</div>' +
          '<div class="card" style="border-left:4px solid '+RED+'">' +
            '<div class="lbl" style="color:'+RED+'">Common Pitfalls to Avoid</div>' +
            rBullets(brief&&brief.pitfalls) +
          '</div>' +
        '</div>' +

        // CTA block
        '<div style="background:'+NAVY+';border-radius:10px;padding:24px 28px;display:flex;align-items:center;gap:28px">' +
          '<div style="flex:1">' +
            '<div style="font-size:16px;font-weight:800;color:#fff;margin-bottom:7px;line-height:1.25">Ready to implement this with TPG?</div>' +
            '<div style="font-size:12px;color:rgba(255,255,255,.6);line-height:1.65;margin-bottom:12px">Our AI practice has deployed agentic processes like this for 1,500+ B2B clients since 2007. We can have you live in 30 days.</div>' +
            '<div style="font-size:13px;font-weight:700;color:'+LIME+'">pedowitzgroup.com/contact</div>' +
          '</div>' +
          // Right accent
          '<div style="background:'+LIME+';border-radius:10px;padding:16px 20px;text-align:center;flex-shrink:0">' +
            '<img src="'+LOGO+'" style="height:20px;width:auto;margin-bottom:6px;filter:invert(1) sepia(1) saturate(10) hue-rotate(180deg)" crossorigin="anonymous" alt="TPG">' +
            '<div style="font-size:8.5px;font-weight:800;color:'+NAVY+';text-transform:uppercase;letter-spacing:1px;margin-top:4px">Since 2007</div>' +
            '<div style="font-size:8px;color:rgba(0,73,99,.6);margin-top:2px">1,500+ Clients</div>' +
          '</div>' +
        '</div>' +

      '</div>' +
      '<div class="pftr">' +
        '<span style="font-size:8.5px;color:rgba(255,255,255,.35)">The Pedowitz Group &middot; pedowitzgroup.com</span>' +
        '<span style="font-size:8.5px;color:'+LIME+';font-weight:600">'+email+'</span>' +
      '</div>' +
    '</div>';

  var d3 = document.createElement('div'); d3.innerHTML = page3HTML;
  pages.push(d3.querySelector('.page'));

  // ═══════════════════════════════════════════════════════
  // RENDER TO PDF
  // ═══════════════════════════════════════════════════════
  var pdf = new jsPDF('p','mm','a4');
  var PW = pdf.internal.pageSize.getWidth();
  var PH = pdf.internal.pageSize.getHeight();

  function renderPage(idx){
    if(idx >= pages.length){
      document.body.removeChild(wrap);
      pdf.save('TPG-Agentic-AI-Report.pdf');
      showGateSuccess();
      return;
    }
    wrap.innerHTML = '';
    wrap.appendChild(pages[idx]);
    void wrap.offsetHeight;
    // Small delay to let images load
    setTimeout(function(){
      window.html2canvas(pages[idx], {
        scale:2.5, useCORS:true, allowTaint:true,
        backgroundColor:'#ffffff', width:794, windowWidth:794,
        height:pages[idx].scrollHeight||1123,
        logging:false,
        onclone:function(doc){
          // Ensure images have time to load in cloned doc
          var imgs = doc.querySelectorAll('img');
          imgs.forEach(function(img){ img.crossOrigin='anonymous'; });
        }
      }).then(function(canvas){
        var imgData = canvas.toDataURL('image/jpeg', 0.95);
        if(idx > 0) pdf.addPage();
        pdf.addImage(imgData,'JPEG',0,0,PW,PH,undefined,'FAST');
        renderPage(idx+1);
      }).catch(function(e){
        console.warn('Page render error:', e);
        renderPage(idx+1);
      });
    }, idx===0 ? 800 : 200); // Extra delay on first page for logo to load
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
