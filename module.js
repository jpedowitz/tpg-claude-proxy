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

// SVG icons keyed by category name — same as HTML but used for sub-head icon
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
  var parts=body.split(/\s*→\s*/);
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
  var bh=(b||'').match(/(\d[\d\s\-–]+)\s*hours?/i);
  var ah=(a||'').match(/(\d[\d\s\-–]+)\s*(hours?|minutes?)/i);
  return {
    before: bh ? bh[1].trim()+' hrs'  : '',
    after:  ah ? ah[1].trim()+' '+(ah[2].toLowerCase().startsWith('m')?'min':'hrs') : ''
  };
}

function getSaving(a){
  var m=(a||'').match(/(\d+)%\s*time/i);
  return m?m[1]+'% time savings':'';
}


// ── Derive use-case tag from process name + VP ──────────────────────────
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

// ── Derive time-investment bucket from current_process ───────────────────
var TIME_BUCKETS = [
  { tag:'Quick',  label:'Under 5 hrs saved',   min:0,  max:5  },
  { tag:'Medium', label:'5–10 hrs saved',       min:5,  max:10 },
  { tag:'High',   label:'10–20 hrs saved',      min:10, max:20 },
  { tag:'Major',  label:'20+ hrs saved',        min:20, max:999 }
];

function getTimeBucket(proc){
  var b = proc.b || '';
  var m = b.match(/(\d+)\s*[-–]\s*(\d+)\s*hours?/i);
  if(m){ var avg = (parseInt(m[1]) + parseInt(m[2])) / 2; }
  else {
    var m2 = b.match(/(\d+)\s*hours?/i);
    var avg = m2 ? parseInt(m2[1]) : 0;
  }
  for(var i=TIME_BUCKETS.length-1; i>=0; i--){
    if(avg >= TIME_BUCKETS[i].min) return TIME_BUCKETS[i].tag;
  }
  return 'Quick';
}

// ── Tag every process once at load time ──────────────────────────────────
function tagAllProcesses(){
  Object.keys(S.data).forEach(function(cat){
    Object.keys(S.data[cat]).forEach(function(sub){
      S.data[cat][sub].forEach(function(proc){
        proc._uc  = getUseCase(proc);
        proc._tb  = getTimeBucket(proc);
      });
    });
  });
}

function renderCatProcesses(cat){
  var catData = S.data[cat] || {};
  var subs    = Object.keys(catData);
  var wrap    = document.getElementById('sub-proc-list');
  if(!wrap) return;

  // Header
  var ico     = document.getElementById('cat-hero-ico');
  var titleEl = document.getElementById('cat-hero-title');
  var descEl  = document.getElementById('cat-hero-desc');
  var meta    = CAT_META[cat] || {};
  if(ico)     tpgSetInnerHTML(ico, CAT_SVG[cat] || '');
  if(titleEl) titleEl.textContent = cat;
  if(descEl)  descEl.textContent  = meta.desc || '';

  // Collect all processes flat for filtering
  var allProcs = [];
  subs.forEach(function(sub){
    (catData[sub] || []).forEach(function(proc){
      allProcs.push({ proc:proc, sub:sub });
    });
  });

  // Build which use-case and time-bucket tags actually exist in this category
  var ucPresent = {}, tbPresent = {};
  allProcs.forEach(function(item){
    ucPresent[item.proc._uc] = true;
    tbPresent[item.proc._tb] = true;
  });

  // Filter state for this render
  var filterState = { q:'', uc:null, tb:null };

  // ── Render the filter bar ──
  var filterBar = document.createElement('div');
  filterBar.className = 'tpg-filter-bar';

  // Search input
  var searchWrap = document.createElement('div');
  searchWrap.className = 'tpg-search-wrap';
  tpgSetInnerHTML(searchWrap,
    '<svg class="tpg-search-ico" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">' +
      '<circle cx="8.5" cy="8.5" r="5.5"/><line x1="13" y1="13" x2="18" y2="18"/>' +
    '</svg>' +
    '<input id="tpg-search" class="tpg-search-input" type="text" placeholder="Search processes..." autocomplete="off">')
  filterBar.appendChild(searchWrap);

  // Use-case chips
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

  // Time-investment chips
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

  // Results count
  var countEl = document.createElement('div');
  countEl.className = 'tpg-result-count';
  filterBar.appendChild(countEl);

  // ── Process list container ──
  var listWrap = document.createElement('div');
  listWrap.id = 'tpg-proc-results';

  wrap.textContent = '';
  wrap.appendChild(filterBar);
  wrap.appendChild(listWrap);

  // Wire up search
  setTimeout(function(){
    var inp = document.getElementById('tpg-search');
    if(inp){
      inp.addEventListener('input', function(){
        filterState.q = inp.value.trim().toLowerCase();
        applyFilters();
      });
    }
  }, 0);

  // ── Filter + render function ──
  function applyFilters(){
    var q   = filterState.q;
    var uc  = filterState.uc;
    var tb  = filterState.tb;

    // Filter
    var filtered = allProcs.filter(function(item){
      if(uc && item.proc._uc !== uc) return false;
      if(tb && item.proc._tb !== tb) return false;
      if(q){
        var text = (item.proc.p + ' ' + item.proc.v + ' ' + item.sub).toLowerCase();
        if(text.indexOf(q) === -1) return false;
      }
      return true;
    });

    // Update count
    countEl.textContent = filtered.length + ' of ' + allProcs.length + ' processes';

    // Group by subcategory, preserving original sub order
    var grouped = {};
    var subOrder = [];
    filtered.forEach(function(item){
      if(!grouped[item.sub]){ grouped[item.sub] = []; subOrder.push(item.sub); }
      grouped[item.sub].push(item.proc);
    });
    // Deduplicate subOrder
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

  // Initial render — all processes
  applyFilters();

  var bc = document.getElementById('tpg-bc');
  if(bc){ bc.textContent = cat; bc.classList.add('on'); }
  goTo('sub');
}


function showDetail(proc){
  S.proc=proc;
  // Store snapshot on report button for gate to read
  setTimeout(function(){
    var btn = document.getElementById('btn-get-report');
    if(btn){
      btn.setAttribute('data-proc', JSON.stringify({p:proc.p,v:proc.v,b:proc.b,a:proc.a,m:proc.m}));
      btn.setAttribute('data-cat', S.cat||'');
      btn.setAttribute('data-sub', S.sub||'');
    }
  }, 0);
  setText('aeo-cat', S.cat+' \u00b7 '+S.sub);
  setText('aeo-q',   'What does \u201c'+proc.p+'\u201d do with AI?');
  setText('aeo-a',   proc.v);
  var times=extractTimes(proc.b,proc.a);
  setText('t-before', times.before||'\u2014');
  setText('t-after',  times.after||'\u2014');
  setText('t-save',   getSaving(proc.a)||'Dramatically faster');
  // Metrics
  var mr=$id('metrics');
  if(mr){
    if(proc.m){
      tpgSetInnerHTML(mr,(proc.m).split(',').map(function(m){
        return '<div class="tpg-metric">'+esc(m.trim())+'</div>';
      }).join(''));
      mr.style.display='';
    } else { mr.style.display='none'; }
  }
  // Timelines
  renderTimeline('tl-b-sum','tl-b',proc.b,false);
  renderTimeline('tl-a-sum','tl-a',proc.a,true);
  // Reset tools
  setHTML('tgrid','<div class="tpg-skel"></div><div class="tpg-skel"></div><div class="tpg-skel"></div>');
  hide('tspin');
  // Reset ask
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
    var agent=isAfter&&/\bai\b|agent|auto/i.test(s.name)
      ?'<span class="tpg-agent-tag">AI agent</span>':'';
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
      messages:[{role:'user',content:'B2B martech expert 2025. For the AI marketing process: "'+proc.p+'" — list the top 3 software platforms. Return ONLY compact JSON, no markdown: {"tools":[{"name":"","description":"max 15 words","pricing":"","bestFor":"max 8 words"}]}'}]
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
    var msg = err && err.name==='AbortError'
      ? '<p style="font-size:13px;color:var(--muted);grid-column:1/-1">Server warming up \u2014 navigate back and try again in 30 seconds.</p>'
      : '<p style="font-size:13px;color:var(--muted);grid-column:1/-1">Could not fetch recommendations. Please try again.</p>';
    setHTML('tgrid', msg);
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

  // Show loading state — textContent only (Trusted Types safe)
  res.textContent = 'Generating… usually takes 5–15 seconds.';
  res.style.display='block';

  // 90-second timeout to handle Render cold starts
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
  .then(function(r){
    if(timer) clearTimeout(timer);
    return r.text();
  })
  .then(function(raw){
    var d;
    try{ d=JSON.parse(raw); }
    catch(e){
      res.textContent='Response parse error: '+raw.slice(0,300);
      res.style.display='block';
      btn.disabled=false; btn.textContent=originalLabel;
      return;
    }
    var text=(d.content&&d.content[0]&&d.content[0].text)||(d.error?'API error: '+JSON.stringify(d.error):'No text in response.');
    res.textContent=text; res.style.display='block';
    res.scrollIntoView({behavior:'smooth',block:'nearest'});
    btn.disabled=false; btn.textContent=originalLabel;
  })
  .catch(function(err){
    if(timer) clearTimeout(timer);
    var msg=err&&err.name==='AbortError'?'Timed out - please try again.':'Error: '+(err&&err.message||'unknown');
    res.textContent=msg; res.style.display='block';
    btn.disabled=false; btn.textContent=originalLabel;
  });
}


function openGate(){
  // Read proc from button data attribute (most reliable) or fall back to S.proc
  var btn = document.getElementById('btn-get-report');
  var procData = btn ? btn.getAttribute('data-proc') : null;
  if(procData){
    try{ _gateProc = JSON.parse(procData); } catch(e){ _gateProc = null; }
    var cat = (btn.getAttribute('data-cat')||'').trim();
    var sub = (btn.getAttribute('data-sub')||'').trim();
    if(cat) S.cat = cat;
    if(sub) S.sub = sub;
  } else if(S.proc){
    _gateProc = {p:S.proc.p, v:S.proc.v, b:S.proc.b, a:S.proc.a, m:S.proc.m};
  }
  if(!_gateProc){ alert('Please select a process first.'); return; }
  var nameEl = document.getElementById('gate-proc-name');
  if(nameEl) nameEl.textContent = S.proc.p;
  var mask = document.getElementById('gateMask');
  if(mask) mask.style.display = '';
  document.body.style.overflow = 'hidden';
  // Reset form to fresh state
  var fields = document.getElementById('gate-form-fields');
  var gen    = document.getElementById('gate-generating');
  var succ   = document.getElementById('gate-success');
  if(fields) fields.style.display = '';
  if(gen)    gen.style.display    = 'none';
  if(succ)   succ.style.display   = 'none';
  var err = document.getElementById('gate-error');
  if(err) err.style.display = 'none';
  // Wire submit button
  var submitBtn = document.getElementById('gate-submit-btn');
  if(submitBtn){
    submitBtn.onclick = function(){ submitGateForm(); };
  }
}

function closeGate(){
  var mask = document.getElementById('gateMask');
  if(mask) mask.style.display = 'none';
  document.body.style.overflow = '';
}



function submitGateForm(){
var fname   = (document.getElementById('gate-fname')   || {}).value || '';
var lname   = (document.getElementById('gate-lname')   || {}).value || '';
var email   = (document.getElementById('gate-email')   || {}).value || '';
var company = (document.getElementById('gate-company') || {}).value || '';
var errEl   = document.getElementById('gate-error');

fname   = fname.trim();
lname   = lname.trim();
email   = email.trim();
company = company.trim();

var emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!fname || !email || !emailRx.test(email)){
  if(errEl) { errEl.style.display = ''; }
  return;
}
if(errEl) errEl.style.display = 'none';

// Show generating state
var fields = document.getElementById('gate-form-fields');
var gen    = document.getElementById('gate-generating');
if(fields) fields.style.display = 'none';
if(gen)    gen.style.display    = '';

// Submit to HubSpot CRM in background
fetch('https://api.hsforms.com/submissions/v3/integration/submit/20715596/b497605e-cd88-407d-bac0-7fefd955de00', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fields: [
      { name: 'firstname', value: fname },
      { name: 'lastname',  value: lname },
      { name: 'email',     value: email },
      { name: 'company',   value: company }
    ],
    context: { pageUri: window.location.href, pageName: 'Agentic AI Capabilities Explorer' }
  })
}).catch(function(){});

// Call Claude for implementation brief, then generate PDF
// Re-read S.proc in case it changed; guard against null
var proc = _gateProc || S.proc;
var cat  = S.cat || '';
var sub  = S.sub || '';
if(!proc){
  var errEl2 = document.getElementById('gate-error');
  if(errEl2){ errEl2.textContent = 'Please navigate back and select a process first.'; errEl2.style.display = ''; }
  var gen2 = document.getElementById('gate-generating');
  if(gen2) gen2.style.display = 'none';
  var fields2 = document.getElementById('gate-form-fields');
  if(fields2) fields2.style.display = '';
  return;
}
setStatus('Researching platforms and implementation approach…');
var prompt = 'You are a senior AI implementation consultant at The Pedowitz Group. ' +
  'Process: ' + proc.p + '. Category: ' + cat + '. Sub-function: ' + sub + '. ' +
  'Value proposition: ' + proc.v + '. ' +
  'Current manual process: ' + (proc.b || 'Not provided') + '. ' +
  'AI-powered process: ' + (proc.a || 'Not provided') + '. ' +
  'Write a practical implementation brief with these exact sections: ' +
  '1. WHY THIS MATTERS NOW (2-3 sentences on business impact). ' +
  '2. THE AI AGENT APPROACH (plain language, 3-4 sentences). ' +
  '3. TOP 3 PLATFORMS (name, one-line description, ballpark pricing). ' +
  '4. 30-DAY IMPLEMENTATION PLAN (Week 1, Week 2, Weeks 3-4 with 2-3 specific actions each). ' +
  '5. EXPECTED ROI (time saved per week, cost savings estimate, 3-month payback framing). ' +
  '6. COMMON PITFALLS (3 bullets - what most teams get wrong). ' +
  'Write for a VP of Marketing who needs to make a decision this week.';

fetch('https://tpg-claude-proxy.onrender.com/claude', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1200,
    messages: [{ role: 'user', content: prompt }]
  })
})
.then(function(r){ return r.text(); })
.then(function(raw){
  var d;
  try { d = JSON.parse(raw); } catch(e){ d = {}; }
  var brief = (d.content && d.content[0] && d.content[0].text) || 'Implementation brief unavailable.';
  setStatus('Building your PDF report…');
  setTimeout(function(){
    generateAgenticPDF(fname + ' ' + lname, email, company, proc, cat, sub, brief);
  }, 200);
})
.catch(function(){
  setStatus('Generating report…');
  generateAgenticPDF(fname + ' ' + lname, email, company, proc, cat, sub, 'Implementation brief could not be generated. Please contact TPG directly at pedowitzgroup.com/contact.');
});
}
function setStatus(msg){
var el = document.getElementById('gate-status');
if(el) el.textContent = msg;
}

function generateAgenticPDF(name, email, company, proc, cat, sub, brief){
  var NAVY = '#004963', LIME = '#ABCF37', TEAL = '#168FB1', CHAR = '#636466';

  var jspdf = window.jspdf;
  if(!jspdf){ showGateSuccess(); return; }
  var jsPDF = jspdf.jsPDF;

  // Extract times from before/after strings
  var beforeTime = '', afterTime = '', saving = '';
  if(proc.b){ var m=proc.b.match(/(\d+[\d\s\-–]+)\s*hours?/i); if(m) beforeTime=m[1].trim()+' hrs'; }
  if(proc.a){ var m=proc.a.match(/(\d+[\d\s\-–]+)\s*(hours?|minutes?)/i); if(m) afterTime=m[1].trim()+(m[2].toLowerCase().startsWith('m')?' min':' hrs'); }
  var sm=proc.a?(proc.a.match(/(\d+)%\s*time/i)||[]):[];
  if(sm[1]) saving=sm[1]+'% time savings';

  var wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;background:#fff;font-family:Inter,Arial,sans-serif;';
  document.body.appendChild(wrap);

  var BASE = '<style>*{box-sizing:border-box;margin:0;padding:0;-webkit-print-color-adjust:exact}body,div{font-family:Inter,Arial,sans-serif}.page{width:794px;min-height:1123px;background:#fff;position:relative;overflow:hidden}.navy{background:'+NAVY+'}.lime-txt{color:'+LIME+'}.navy-txt{color:'+NAVY+'}.teal-txt{color:'+TEAL+'}.white-txt{color:#fff}.bar-t{height:6px;background:#e7e6e6;border-radius:3px;overflow:hidden}.bar-f{height:100%;border-radius:3px}.card{background:#f8f9fa;border:1px solid #dde1e5;border-radius:8px;padding:16px}.hdr{background:'+NAVY+';padding:20px 36px 16px;border-bottom:4px solid '+LIME+'}.ftr{background:'+NAVY+';padding:8px 36px;display:flex;justify-content:space-between;align-items:center;position:absolute;bottom:0;left:0;right:0}.body{padding:24px 36px 72px}.eyebrow{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase}</style>';

  // Parse brief into sections
  var sections = {};
  var lines = brief.split('\n');
  var currentSection = '';
  var currentLines = [];
  lines.forEach(function(line){
    var secMatch = line.match(/^\d+\.\s+([A-Z][A-Z\s&]+[A-Z])/);
    if(secMatch){
      if(currentSection) sections[currentSection] = currentLines.join('\n').trim();
      currentSection = secMatch[1].trim();
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  });
  if(currentSection) sections[currentSection] = currentLines.join('\n').trim();

  function sectionHTML(key){
    var text = '';
    Object.keys(sections).forEach(function(k){ if(k.indexOf(key) !== -1) text = sections[k]; });
    if(!text) return '<p style="font-size:13px;color:'+CHAR+';line-height:1.7">'+brief.slice(0,300)+'</p>';
    var html = '';
    text.split('\n').forEach(function(line){
      line = line.trim();
      if(!line) return;
      if(/^[-•\*]/.test(line)){
        html += '<div style="display:flex;gap:8px;margin-bottom:6px;align-items:flex-start"><div style="width:6px;height:6px;border-radius:50%;background:'+LIME+';margin-top:5px;flex-shrink:0"></div><div style="font-size:12px;color:'+CHAR+';line-height:1.6">'+line.replace(/^[-•\*]\s*/,'')+'</div></div>';
      } else {
        html += '<p style="font-size:13px;color:'+CHAR+';line-height:1.7;margin-bottom:8px">'+line+'</p>';
      }
    });
    return html;
  }

  var pages = [];

  // PAGE 1: Cover + AEO answer block
  var coverHTML = BASE +
    '<div class="page">' +
      '<div style="background:'+NAVY+';height:100%;min-height:1123px;display:flex;flex-direction:column">' +
        '<div style="background:'+LIME+';height:5px;flex-shrink:0"></div>' +
        '<div style="flex:1;padding:52px 48px;display:flex;flex-direction:column;justify-content:center">' +
          '<div class="eyebrow" style="color:'+LIME+';margin-bottom:16px">The Pedowitz Group &middot; Agentic AI Implementation Report</div>' +
          '<div style="font-size:38px;font-weight:900;color:#fff;line-height:1.15;margin-bottom:8px;max-width:560px">'+proc.p+'</div>' +
          '<div style="font-size:14px;color:rgba(255,255,255,.5);margin-bottom:32px">'+cat+' &rsaquo; '+sub+'</div>' +
          '<div style="font-size:15px;font-weight:700;color:rgba(255,255,255,.45);margin-bottom:10px;font-style:italic">What does this AI process do?</div>' +
          '<div style="font-size:17px;font-weight:700;color:#fff;line-height:1.45;max-width:580px;margin-bottom:36px;border-left:4px solid '+LIME+';padding-left:16px">'+proc.v+'</div>' +
          (beforeTime && afterTime ?
            '<div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:36px">' +
              '<div style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:12px 18px;text-align:center"><div style="font-size:20px;font-weight:700;color:rgba(255,100,100,.85)">'+beforeTime+'</div><div style="font-size:10px;color:rgba(255,255,255,.4);margin-top:3px">manually today</div></div>' +
              '<div style="font-size:18px;color:rgba(255,255,255,.2)">&rarr;</div>' +
              '<div style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:12px 18px;text-align:center"><div style="font-size:20px;font-weight:700;color:'+LIME+'">'+afterTime+'</div><div style="font-size:10px;color:rgba(255,255,255,.4);margin-top:3px">with AI agents</div></div>' +
              (saving ? '<div style="background:'+LIME+';color:'+NAVY+';border-radius:6px;padding:8px 14px;font-weight:700;font-size:13px">'+saving+'</div>' : '') +
            '</div>' : '') +
          '<div style="display:flex;gap:12px;flex-wrap:wrap">' +
            '<div style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:10px 16px"><div style="font-size:10px;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:1px">Prepared for</div><div style="font-size:14px;font-weight:700;color:#fff">'+name+'</div>'+(email?'<div style="font-size:11px;color:rgba(255,255,255,.5)">'+email+'</div>':'')+('</div>') +
            (company ? '<div style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:10px 16px"><div style="font-size:10px;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:1px">Organization</div><div style="font-size:14px;font-weight:700;color:#fff">'+company+'</div></div>' : '') +
          '</div>' +
        '</div>' +
        '<div style="background:'+LIME+';padding:10px 48px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0">' +
          '<span style="font-size:10px;font-weight:700;color:'+NAVY+'">CONFIDENTIAL &middot; AGENTIC AI IMPLEMENTATION REPORT &middot; THE PEDOWITZ GROUP</span>' +
          '<span style="font-size:10px;font-weight:700;color:'+NAVY+'">pedowitzgroup.com</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  var d1 = document.createElement('div');
  d1.innerHTML = coverHTML;
  pages.push(d1.querySelector('.page'));

  // PAGE 2: Before/After timelines + Why it matters + AI approach
  var parseStepsLocal = function(str){
    if(!str) return [];
    var parts = str.split(/\s*→\s*/);
    return parts.map(function(s){
      s = s.trim().replace(/\.\s*\d+%.*$/i,'');
      if(!s || s.length < 4) return null;
      var tm = s.match(/\(([^)]*(?:h(?:our)?s?|m(?:in)?s?)[^)]*)\)/i);
      var time = tm ? tm[1] : '';
      var name2 = s.replace(/\([^)]*\)/g,'').replace(/^\d+\.\s*/,'').replace(/^\d+\s+steps?,\s*[^:]+:\s*/i,'').trim();
      return name2 ? {name:name2, time:time} : null;
    }).filter(Boolean).slice(0,6);
  };

  var beforeSteps = parseStepsLocal(proc.b);
  var afterSteps  = parseStepsLocal(proc.a);

  var stepsBeforeHTML = beforeSteps.map(function(s,i){
    return '<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px">' +
      '<div style="width:18px;height:18px;border-radius:50%;background:#fce8e8;color:#c0392b;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">'+(i+1)+'</div>' +
      '<div style="flex:1"><div style="font-size:12px;font-weight:600;color:'+NAVY+';line-height:1.35">'+s.name+'</div>'+(s.time?'<span style="font-size:10px;font-weight:600;background:#fdf3d0;color:#8a6800;border-radius:3px;padding:1px 5px;display:inline-block;margin-top:2px">'+s.time+'</span>':'')+'</div>' +
    '</div>';
  }).join('') || '<p style="font-size:12px;color:'+CHAR+'">'+proc.b+'</p>';

  var stepsAfterHTML = afterSteps.map(function(s,i){
    return '<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px">' +
      '<div style="width:18px;height:18px;border-radius:50%;background:#edf5e0;color:#27ae60;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">'+(i+1)+'</div>' +
      '<div style="flex:1"><div style="font-size:12px;font-weight:600;color:'+NAVY+';line-height:1.35">'+s.name+'</div>'+(s.time?'<span style="font-size:10px;font-weight:600;background:#edf5e0;color:#27ae60;border-radius:3px;padding:1px 5px;display:inline-block;margin-top:2px">'+s.time+'</span>':'')+'</div>' +
    '</div>';
  }).join('') || '<p style="font-size:12px;color:'+CHAR+'">'+proc.a+'</p>';

  var page2HTML = BASE +
    '<div class="page">' +
      '<div class="hdr"><div class="eyebrow" style="color:rgba(255,255,255,.5);margin-bottom:3px">The Pedowitz Group &middot; Agentic AI Implementation Report</div><div style="font-size:15px;font-weight:800;color:#fff">Workflow Analysis &amp; Strategic Brief</div><div style="font-size:11px;color:rgba(255,255,255,.5);margin-top:2px">'+proc.p+'</div></div>' +
      '<div class="body">' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px">' +
          '<div class="card" style="border-left:4px solid #c0392b"><div style="font-weight:700;color:#c0392b;font-size:13px;margin-bottom:10px">&#10007; Manual Process Today</div>'+stepsBeforeHTML+'</div>' +
          '<div class="card" style="border-left:4px solid #27ae60"><div style="font-weight:700;color:#27ae60;font-size:13px;margin-bottom:10px">&#10003; With AI Agents</div>'+stepsAfterHTML+'</div>' +
        '</div>' +
        '<div style="background:'+NAVY+';border-radius:10px;padding:18px 22px;margin-bottom:16px">' +
          '<div class="eyebrow" style="color:'+LIME+';margin-bottom:8px">Why This Matters Now</div>' +
          sectionHTML('WHY') +
        '</div>' +
        '<div class="card" style="margin-bottom:16px">' +
          '<div class="eyebrow" style="color:'+TEAL+';margin-bottom:8px">The AI Agent Approach</div>' +
          sectionHTML('APPROACH') +
        '</div>' +
        '<div class="card">' +
          '<div class="eyebrow" style="color:'+TEAL+';margin-bottom:8px">Top 3 Platforms</div>' +
          sectionHTML('PLATFORMS') +
        '</div>' +
      '</div>' +
      '<div class="ftr"><span style="font-size:10px;color:rgba(255,255,255,.5)">The Pedowitz Group &middot; pedowitzgroup.com</span><span style="font-size:10px;color:'+LIME+';font-weight:700">'+email+'</span></div>' +
    '</div>';
  var d2 = document.createElement('div');
  d2.innerHTML = page2HTML;
  pages.push(d2.querySelector('.page'));

  // PAGE 3: 30-day plan + ROI + pitfalls + CTA
  var page3HTML = BASE +
    '<div class="page">' +
      '<div class="hdr"><div class="eyebrow" style="color:rgba(255,255,255,.5);margin-bottom:3px">The Pedowitz Group &middot; Agentic AI Implementation Report</div><div style="font-size:15px;font-weight:800;color:#fff">Implementation Plan &amp; ROI</div><div style="font-size:11px;color:rgba(255,255,255,.5);margin-top:2px">'+proc.p+'</div></div>' +
      '<div class="body">' +
        '<div style="margin-bottom:16px">' +
          '<div class="eyebrow" style="color:'+NAVY+';margin-bottom:8px">30-Day Implementation Plan</div>' +
          '<div class="card">'+sectionHTML('30-DAY')+'</div>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px">' +
          '<div class="card" style="border-left:4px solid '+LIME+'"><div class="eyebrow" style="color:'+NAVY+';margin-bottom:8px">Expected ROI</div>'+sectionHTML('ROI')+'</div>' +
          '<div class="card" style="border-left:4px solid #c0392b"><div class="eyebrow" style="color:#c0392b;margin-bottom:8px">Common Pitfalls</div>'+sectionHTML('PITFALLS')+'</div>' +
        '</div>' +
        '<div style="background:'+LIME+';border-radius:12px;padding:24px 28px;text-align:center">' +
          '<div style="font-size:20px;font-weight:800;color:'+NAVY+';margin-bottom:6px">Ready to implement this with TPG?</div>' +
          '<div style="font-size:13px;color:'+NAVY+';margin-bottom:10px;opacity:.8">Our AI practice has deployed agentic processes like this for 1,500+ clients. We can have you running in 30 days.</div>' +
          '<div style="font-size:16px;font-weight:800;color:'+NAVY+'">pedowitzgroup.com/contact</div>' +
        '</div>' +
      '</div>' +
      '<div class="ftr"><span style="font-size:10px;color:rgba(255,255,255,.5)">The Pedowitz Group &middot; pedowitzgroup.com</span><span style="font-size:10px;color:'+LIME+';font-weight:700">'+email+'</span></div>' +
    '</div>';
  var d3 = document.createElement('div');
  d3.innerHTML = page3HTML;
  pages.push(d3.querySelector('.page'));

  // Render pages to PDF
  var pdf = new jsPDF('p','mm','a4');
  var PW  = pdf.internal.pageSize.getWidth();
  var PH  = pdf.internal.pageSize.getHeight();

  function renderPage(idx){
    if(idx >= pages.length){
      document.body.removeChild(wrap);
      pdf.save('TPG-Agentic-AI-Report.pdf');
      showGateSuccess();
      return;
    }
    wrap.innerHTML = '';
    wrap.appendChild(pages[idx]);
    // Force layout
    void wrap.offsetHeight;
    window.html2canvas(pages[idx], {
      scale:2, useCORS:true, allowTaint:false,
      backgroundColor:'#ffffff', width:794, windowWidth:794,
      height:pages[idx].scrollHeight||1123, logging:false
    }).then(function(canvas){
      var imgData = canvas.toDataURL('image/jpeg', 0.92);
      if(idx > 0) pdf.addPage();
      pdf.addImage(imgData,'JPEG',0,0,PW,PH,undefined,'FAST');
      renderPage(idx + 1);
    }).catch(function(){
      renderPage(idx + 1);
    });
  }

  renderPage(0);
}

function showGateSuccess(){
var gen  = document.getElementById('gate-generating');
var succ = document.getElementById('gate-success');
if(gen)  gen.style.display  = 'none';
if(succ) succ.style.display = 'block';
}

// Close gate on mask click
var mask = document.getElementById('gateMask');
if(mask) mask.addEventListener('click', function(e){
  if(e.target === mask) closeGate();
});


function init(){
  loadData();

  // Landing paths
  var pb=$id('path-browse');
  if(pb) pb.addEventListener('click',function(){ goTo('cat'); });

  var pd=$id('path-describe');
  if(pd) pd.addEventListener('click',function(){
    var cw=$id('challenge-wrap');
    if(cw){ cw.style.display=''; cw.scrollIntoView({behavior:'smooth',block:'nearest'}); }
    setTimeout(function(){ var ta=$id('ta-land'); if(ta) ta.focus(); },180);
  });


  // Category cards — one click goes straight to all processes
  document.querySelectorAll('.tpg-cat-card').forEach(function(card){
    card.addEventListener('click',function(){
      var cat=card.getAttribute('data-cat'); if(!cat) return;
      S.cat=cat; S.sub='';
      renderCatProcesses(cat);
    });
  });

  // Back buttons
  var bCat=$id('b-cat');
  if(bCat) bCat.addEventListener('click',function(){ goTo('land'); });

  var bSub=$id('b-sub');
  if(bSub) bSub.addEventListener('click',function(){ goTo('cat'); });

  var bDetail=$id('b-detail');
  if(bDetail) bDetail.addEventListener('click',function(){ goTo('sub'); });

  // Q&A buttons — addEventListener (JS tab scope, no inline handlers)
  var blBtn = document.getElementById('btn-land');
  if(blBtn) blBtn.addEventListener('click', function(){
    fetchAI('ta-land','res-land','btn-land','');
  });

  var bdBtn = document.getElementById('btn-detail');
  if(bdBtn) bdBtn.addEventListener('click', function(){
    var ctx = S.proc ? 'Process: "'+S.proc.p+'". Category: '+S.cat+'. Sub: '+S.sub+'.' : '';
    fetchAI('ta-detail','res-detail','btn-detail', ctx);
  });

  // ── Gate modal ────────────────────────────────────────────────────────

  var gateClose = document.getElementById('gateClose');
  if(gateClose) gateClose.addEventListener('click', closeGate);

  var btnReport = document.getElementById('btn-get-report');
  if(btnReport) btnReport.addEventListener('click', openGate);

}

if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',init); }
else { init(); }

// Expose gate submit as global so document delegation can reach it
window.tpgSubmitGate = function(){ submitGateForm(); };
window.submitGateForm = submitGateForm;

// Document-level click delegation for gate submit button
document.addEventListener('click', function(e){
  var btn = e.target;
  // Walk up in case user clicked the SVG inside the button
  while(btn && btn.id !== 'gate-submit-btn' && btn !== document.body){
    btn = btn.parentElement;
  }
  if(btn && btn.id === 'gate-submit-btn'){
    e.preventDefault();
    submitGateForm();
  }
});

