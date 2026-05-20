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
    '<input id="tpg-search" class="tpg-search-input" type="text" placeholder="Search processes&hellip;" autocomplete="off">';
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
      }).join('');
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
  res.style.display='';

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
  .then(function(r){return r.json();})
  .then(function(d){
    if(timer) clearTimeout(timer);
    var text=(d.content&&d.content[0]&&d.content[0].text)||'Unable to generate recommendations.';
    res.textContent=text; res.style.display='';
    btn.disabled=false; btn.textContent=originalLabel;
  })
  .catch(function(err){
    if(timer) clearTimeout(timer);
    var msg = err && err.name==='AbortError'
      ? 'Request timed out. The server may be waking up \u2014 please try again in 30 seconds.'
      : 'Connection error. Please try again.';
    res.textContent=msg; res.style.display='';
    btn.disabled=false; btn.textContent=originalLabel;
  });
}

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

  function openGate(){
    var mask = document.getElementById('gateMask');
    var nameEl = document.getElementById('gate-proc-name');
    if(nameEl && S.proc) nameEl.textContent = S.proc.p;
    if(mask) mask.style.display = '';
    document.body.style.overflow = 'hidden';
    renderGateForm();
  }

  function closeGate(){
    var mask = document.getElementById('gateMask');
    if(mask) mask.style.display = 'none';
    document.body.style.overflow = '';
  }

  function renderGateForm(){
    var target = document.getElementById('gate-hs-form');
    if(!target || target.hasChildNodes()) return; // already rendered
    if(typeof hbspt === 'undefined'){
      setTimeout(renderGateForm, 300); return;
    }
    hbspt.forms.create({
      region:   'na1',
      portalId: '20715596',
      formId:   'REPLACE_WITH_YOUR_FORM_GUID',  // ← paste your HubSpot form GUID here
      target:   '#gate-hs-form',
      onFormSubmitted: function(){
        // Store context for the report page
        try {
          var payload = {
            process:     S.proc ? S.proc.p : '',
            category:    S.cat  || '',
            sub:         S.sub  || '',
            vp:          S.proc ? S.proc.v : '',
            before:      S.proc ? S.proc.b : '',
            after:       S.proc ? S.proc.a : '',
            metrics:     S.proc ? S.proc.m : '',
            savedAt:     Date.now()
          };
          localStorage.setItem('tpg_agentic_report', JSON.stringify(payload));
        } catch(e){}
        // Redirect to report page
        setTimeout(function(){
          window.location.href = '/agentic-ai-report';
        }, 800);
      }
    });
  }

  // Close gate on mask click
  var mask = document.getElementById('gateMask');
  if(mask) mask.addEventListener('click', function(e){
    if(e.target === mask) closeGate();
  });

}

if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',init); }
else { init(); }

