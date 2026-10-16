const APP_KEY = 'reset-life-dashboard-v1';
const APP_VERSION = 2;
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const uid = (p='id') => `${p}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`;
const clamp = (n,min,max) => Math.max(min,Math.min(max,n));
const fmtMoney = n => `${Number(n || 0).toLocaleString(undefined,{maximumFractionDigits:0})} SAR`;
const DAY_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const DAY_LONG = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAY_PICK = ['Su','M','Tu','W','Th','F','Sa'];
const CATEGORIES = ['Routine','University','Fitness','Food','Life','Project','Sleep'];

function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}
function parseDateKey(key) {
  const [y,m,d] = key.split('-').map(Number);
  return new Date(y,m-1,d,12,0,0,0);
}
function addDays(date, amount) {
  const d = new Date(date);
  d.setDate(d.getDate()+amount);
  return d;
}
function startOfWeek(date = new Date()) {
  const d = new Date(date);
  d.setHours(12,0,0,0);
  const diff = (d.getDay()+6)%7;
  d.setDate(d.getDate()-diff);
  return d;
}
function monthKey(dateOrKey = new Date()) {
  const d = typeof dateOrKey === 'string' ? parseDateKey(dateOrKey) : dateOrKey;
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
}
function minutesFromTime(value) {
  if(!value || !/^\d{2}:\d{2}$/.test(value)) return 0;
  const [h,m] = value.split(':').map(Number);
  return h*60+m;
}
function currentMinutes() {
  const d = new Date();
  return d.getHours()*60+d.getMinutes();
}
function formatClock(value) {
  if(!value) return '—';
  const [h,m]=value.split(':').map(Number);
  const d=new Date(); d.setHours(h,m,0,0);
  return d.toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});
}
function formatDateShort(date) {
  return date.toLocaleDateString(undefined,{month:'short',day:'numeric'});
}
function escapeHTML(s='') { return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function escapeAttr(s='') { return escapeHTML(s); }
function shorten(s='',n=16) { return s.length>n ? `${s.slice(0,n-1)}…` : s; }

function defaultSchedule() {
  return [
    {id:'wake', title:'Wake up + curtains open', days:[0,1,2,3,4,5,6], start:'08:00', end:'08:10', category:'Routine', detail:'Get out of bed immediately. No scrolling or gooning in bed.', active:true},
    {id:'groom', title:'Shower + grooming', days:[0,1,2,3,4,5,6], start:'08:10', end:'08:30', category:'Routine', detail:'Teeth, deodorant, hair/beard and clean clothes.', active:true},
    {id:'breakfast', title:'Breakfast', days:[0,1,2,3,4,5,6], start:'08:30', end:'09:00', category:'Food', detail:'Eat early and include protein.', active:true},
    {id:'uni_am', title:'Classes / university focus', days:[1,2,3,4,5], start:'09:00', end:'12:00', category:'University', detail:'Attend anything scheduled. If free, work on current-week material or the highest-priority backlog.', active:true},
    {id:'lunch', title:'Lunch', days:[0,1,2,3,4,5,6], start:'12:30', end:'13:00', category:'Food', detail:'Proper meal, not random snacking.', active:true},
    {id:'uni_pm', title:'Classes / study / errands', days:[1,2,3,4,5], start:'13:30', end:'16:30', category:'University', detail:'Current classes first. Use library/CBD time for useful work when there is no class.', active:true},
    {id:'outside', title:'Outside + walk', days:[0,1,2,3,4,5,6], start:'16:45', end:'17:15', category:'Life', detail:'Leave the room and get at least 30 minutes outside.', active:true},
    {id:'gym', title:'Full-body gym', days:[1,3,5], start:'17:30', end:'18:30', category:'Fitness', detail:'Start light. Consistency beats destroying yourself.', active:true},
    {id:'mobility', title:'Mobility / easy movement', days:[0,2,4,6], start:'17:30', end:'17:45', category:'Fitness', detail:'10–15 minutes for hips, hamstrings, back and shoulders.', active:true},
    {id:'dinner', title:'Dinner', days:[0,1,2,3,4,5,6], start:'19:00', end:'19:30', category:'Food', detail:'A real meal with protein.', active:true},
    {id:'catchup', title:'Focused uni catch-up', days:[1,3,5,0], start:'20:00', end:'21:00', category:'University', detail:'One focused block. Current week and urgent assessment content before old backlog.', active:true},
    {id:'project', title:'Personal project', days:[2,4,6], start:'20:00', end:'21:00', category:'Project', detail:'Build something outside university. The app itself can count.', active:true},
    {id:'sat_reset', title:'Room + personal reset', days:[6], start:'10:30', end:'11:30', category:'Life', detail:'Bathroom, bedsheets, grooming and anything small that has been building up.', active:true},
    {id:'sun_money', title:'Money check', days:[0], start:'10:30', end:'10:50', category:'Life', detail:'Check spending, allocations and upcoming car/travel costs.', active:true},
    {id:'sun_week', title:'Plan the coming week', days:[0], start:'11:00', end:'11:30', category:'Life', detail:'Classes, urgent uni work, gym and one focus for the week.', active:true},
    {id:'phone', title:'Phone away', days:[0,1,2,3,4,5,6], start:'23:00', end:'23:05', category:'Sleep', detail:'Charge it away from the bed. No late scroll spiral.', active:true},
    {id:'sleep', title:'Lights out', days:[0,1,2,3,4,5,6], start:'23:30', end:'23:40', category:'Sleep', detail:'Protect tomorrow before it starts.', active:true}
  ];
}

function defaultState() {
  return {
    version: APP_VERSION,
    profile: {wakeTarget:'08:00', sleepTarget:'23:30', paydayDay:29},
    schedule: defaultSchedule(),
    oneOffTasks: [],
    records: {},
    courses: [
      {id:uid('course'), name:'Production Engineering', currentWeek:1, teachingWeek:10, note:'Update this to your real position.'},
      {id:uid('course'), name:'Reservoir Engineering', currentWeek:1, teachingWeek:10, note:'Update this to your real position.'},
      {id:uid('course'), name:'ENGM2005', currentWeek:1, teachingWeek:10, note:'Update this to your real position.'},
      {id:uid('course'), name:'Systems Engineering', currentWeek:1, teachingWeek:10, note:'Update this to your real position.'}
    ],
    uniTasks: [],
    money: {
      income:11000,
      currentCash:16500,
      buckets:[
        {id:'rent', name:'Rent + bills', target:5000},
        {id:'food', name:'Food', target:1800},
        {id:'car', name:'Car fuel + reserve', target:700},
        {id:'travel', name:'Travel', target:1000},
        {id:'invisalign', name:'Invisalign', target:500},
        {id:'savings', name:'Savings', target:1200},
        {id:'fun', name:'Clothes + fun', target:500},
        {id:'buffer', name:'Buffer', target:300}
      ],
      transactions:[]
    },
    project:{name:'Life Reset App', sessions:0, note:'Work on one meaningful thing outside university 3 times a week.'},
    weeklyReviews:[],
    settings:{activeTab:'today', selectedWeekDate:todayKey()}
  };
}

function migrateState(parsed) {
  const base = defaultState();
  const state = {...base, ...parsed};
  state.version = APP_VERSION;
  state.profile = {...base.profile, ...(parsed.profile || {})};
  state.schedule = Array.isArray(parsed.schedule) && parsed.schedule.length ? parsed.schedule : base.schedule;
  state.oneOffTasks = Array.isArray(parsed.oneOffTasks) ? parsed.oneOffTasks : [];
  state.records = parsed.records || {};
  state.courses = Array.isArray(parsed.courses) ? parsed.courses : base.courses;
  state.uniTasks = Array.isArray(parsed.uniTasks) ? parsed.uniTasks : [];
  state.project = {...base.project, ...(parsed.project || {})};
  state.weeklyReviews = Array.isArray(parsed.weeklyReviews) ? parsed.weeklyReviews : [];
  state.settings = {...base.settings, ...(parsed.settings || {})};
  if(['plan','progress','life'].includes(state.settings.activeTab)) state.settings.activeTab='more';
  if(!state.settings.selectedWeekDate) state.settings.selectedWeekDate=todayKey();

  const oldMoney = parsed.money || {};
  const oldBuckets = Array.isArray(oldMoney.buckets) && oldMoney.buckets.length ? oldMoney.buckets : base.money.buckets;
  state.money = {
    ...base.money,
    ...oldMoney,
    buckets: oldBuckets.map(b => ({id:b.id || uid('bucket'), name:b.name || 'Bucket', target:Number(b.target||0)})),
    transactions: Array.isArray(oldMoney.transactions) ? oldMoney.transactions : []
  };
  if(!state.money.transactions.length) {
    oldBuckets.filter(b=>Number(b.spent)>0).forEach(b=>state.money.transactions.push({
      id:uid('tx'), date:todayKey(), amount:Number(b.spent), bucketId:b.id, note:'Imported from previous version'
    }));
  }
  Object.values(state.records).forEach(r=>{
    if(!r.itemStatus) r.itemStatus={};
    if(!Number.isFinite(r.resetCount)) r.resetCount=0;
  });
  return state;
}

function loadState() {
  try {
    const raw = localStorage.getItem(APP_KEY);
    if(!raw) return defaultState();
    return migrateState(JSON.parse(raw));
  } catch(e) {
    return defaultState();
  }
}
let state = loadState();
function save() { try { localStorage.setItem(APP_KEY, JSON.stringify(state)); } catch(e) {} }

function ensureRecord(key=todayKey()) {
  if(!state.records[key]) state.records[key] = {itemStatus:{}, resetCount:0, restartAt:null};
  if(!state.records[key].itemStatus) state.records[key].itemStatus={};
  return state.records[key];
}
function occurrenceKey(item) { return `${item.source==='oneoff'?'o':'s'}:${item.id}`; }
function getStatus(item,key) { return ensureRecord(key).itemStatus[occurrenceKey(item)] || 'pending'; }
function setStatus(item,key,status) {
  const rec=ensureRecord(key);
  if(status==='pending') delete rec.itemStatus[occurrenceKey(item)];
  else rec.itemStatus[occurrenceKey(item)]=status;
  save();
}
function itemsForDate(date) {
  const key=todayKey(date); const dow=date.getDay();
  const recurring=state.schedule
    .filter(x=>x.active!==false && Array.isArray(x.days) && x.days.includes(dow))
    .map(x=>({...x,source:'schedule',date:key}));
  const oneOff=state.oneOffTasks
    .filter(x=>x.date===key)
    .map(x=>({...x,source:'oneoff'}));
  return [...recurring,...oneOff].sort((a,b)=>minutesFromTime(a.start)-minutesFromTime(b.start) || String(a.title).localeCompare(String(b.title)));
}
function dayCompletion(date) {
  const key=todayKey(date); const items=itemsForDate(date);
  if(!items.length) return 0;
  const done=items.filter(i=>getStatus(i,key)==='done').length;
  return Math.round(done/items.length*100);
}
function streak() {
  let count=0; const d=new Date();
  for(let i=0;i<60;i++) {
    const pct=dayCompletion(d);
    if(pct>=70) count++;
    else if(i===0 && pct===0) {}
    else break;
    d.setDate(d.getDate()-1);
  }
  return count;
}
function toast(msg) {
  let el=$('.toast');
  if(!el){el=document.createElement('div');el.className='toast';document.body.appendChild(el);}
  el.textContent=msg; el.classList.add('show'); clearTimeout(window.__toast);
  window.__toast=setTimeout(()=>el.classList.remove('show'),1800);
}

const main=$('#mainContent');
const pageTitle=$('#pageTitle');
const dateLabel=$('#dateLabel');
const modal=$('#modal');
const modalContent=$('#modalContent');

function setHeader(title, date=new Date()) {
  pageTitle.textContent=title;
  dateLabel.textContent=date.toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric'}).toUpperCase();
}
function render() {
  const tab=state.settings.activeTab || 'today';
  $$('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
  if(tab==='today') renderToday();
  if(tab==='week') renderWeek();
  if(tab==='university') renderUniversity();
  if(tab==='money') renderMoney();
  if(tab==='more') renderMore();
  save();
}

function categoryBadge(category) {
  const cls=category==='University'?'blue':category==='Fitness'?'purple':category==='Sleep'?'warn':category==='Food'?'':category==='Project'?'purple':'';
  return `<span class="badge ${cls}">${escapeHTML(category || 'Task')}</span>`;
}
function timeWindow(item) {
  if(item.end && item.end!==item.start) return `${formatClock(item.start)}–${formatClock(item.end)}`;
  return formatClock(item.start);
}
function statusForTime(item, date, nowMin=currentMinutes()) {
  if(todayKey(date)!==todayKey()) return '';
  const s=minutesFromTime(item.start); const e=minutesFromTime(item.end || item.start)+(!item.end?30:0);
  if(nowMin>=s && nowMin<=Math.max(s+10,e)) return 'now';
  if(nowMin<s) return 'future';
  return 'past';
}
function nextUsefulItem(items,key) {
  const now=currentMinutes();
  const active=items.filter(i=>!['done','skipped'].includes(getStatus(i,key)));
  const current=active.find(i=>statusForTime(i,new Date())==='now');
  if(current) return {item:current,mode:'now'};
  const next=active.find(i=>minutesFromTime(i.start)>now);
  if(next) return {item:next,mode:'next'};
  return null;
}
function countdownText(item,mode) {
  if(mode==='now') {
    const e=minutesFromTime(item.end||item.start);
    const diff=Math.max(0,e-currentMinutes());
    return diff>0 ? `${diff}m` : 'NOW';
  }
  const diff=Math.max(0,minutesFromTime(item.start)-currentMinutes());
  if(diff<60) return `${diff}m`;
  return `${Math.floor(diff/60)}h ${diff%60}m`;
}

function renderToday(preserveScroll=false) {
  const scroll=window.scrollY;
  const date=new Date(); const key=todayKey(date); const rec=ensureRecord(key); const items=itemsForDate(date);
  const done=items.filter(i=>getStatus(i,key)==='done').length; const total=items.length; const pct=total?Math.round(done/total*100):0;
  const hour=new Date().getHours(); const greeting=hour<12?'Good morning':hour<18?'Good afternoon':'Good evening';
  const next=nextUsefulItem(items,key);
  const skipped=items.filter(i=>getStatus(i,key)==='skipped').length;
  setHeader('Today',date);
  main.innerHTML=`
    <section class="card hero">
      <div class="next-card">
        <div>
          <span class="badge">${greeting.toUpperCase()}</span>
          ${next ? `<div class="time-big" style="margin-top:12px">${next.mode==='now'?'DO THIS NOW':'NEXT · '+formatClock(next.item.start)}</div><h2>${escapeHTML(next.item.title)}</h2><p class="muted" style="margin-bottom:0">${escapeHTML(next.item.detail||'Do the next useful thing.')}</p>` : `<h2 style="margin-top:14px">You’re clear for now.</h2><p class="muted" style="margin-bottom:0">Use the free time well, or add something useful to today.</p>`}
        </div>
        ${next?`<div class="countdown"><b>${countdownText(next.item,next.mode)}</b><small>${next.mode==='now'?'remaining / now':'until next'}</small></div>`:`<div class="progress-ring" style="--value:${pct*3.6}deg"><b>${pct}%</b></div>`}
      </div>
    </section>

    <section class="grid-3">
      <div class="stat"><small>Done</small><strong>${done}/${total}</strong></div>
      <div class="stat"><small>Streak</small><strong>${streak()} days</strong></div>
      <div class="stat"><small>Sleep target</small><strong>${formatClock(state.profile.sleepTarget)}</strong></div>
    </section>

    <div class="section-title"><h2>Today’s timeline</h2><button id="addTodayBtn">+ Task</button></div>
    <section class="card flat timeline">
      ${items.length ? items.map(i=>timelineItemHTML(i,date,true)).join('') : '<div class="empty-state">Nothing scheduled today. Add a task or edit your weekly routine.</div>'}
    </section>

    ${skipped?`<p class="muted tiny" style="text-align:center">${skipped} earlier item${skipped===1?'':'s'} skipped after a restart. That is intentional. Keep moving.</p>`:''}

    <section class="card restart">
      <span class="badge warn">ANTI-COLLAPSE</span>
      <h3 style="margin-top:12px">The day went off track?</h3>
      <p class="muted">Restart from this moment. Past unfinished tasks get skipped instead of blocking the rest of the day.</p>
      <button class="primary full" id="restartBtn">Restart today from now</button>
    </section>

    <section class="card flat">
      <div class="row between center"><div><p class="eyebrow">NON-NEGOTIABLE</p><h3 style="margin:0">One rule</h3></div><span class="badge">KEEP MOVING</span></div>
      <div class="rule"><strong>An unfinished task never blocks the next task.</strong><span class="muted tiny">If something is missed, continue with the schedule. The day is not cancelled.</span></div>
    </section>`;
  bindTimeline(date);
  $('#addTodayBtn').onclick=()=>openOneOffTaskModal(null,{date:key,start:suggestTimeForNewTask(date)});
  $('#restartBtn').onclick=openRestartModal;
  if(preserveScroll) requestAnimationFrame(()=>window.scrollTo(0,scroll));
}

function timelineItemHTML(item,date,showActions=false) {
  const key=todayKey(date); const status=getStatus(item,key); const timeState=statusForTime(item,date);
  const isNext=timeState==='future' && !['done','skipped'].includes(status);
  const nowClass=timeState==='now' && status==='pending'?'now':'';
  const nextClass=isNext?'next':'';
  return `<div class="timeline-item ${nowClass} ${nextClass} ${status}">
    <div class="timeline-time">${formatClock(item.start)}</div><span class="timeline-dot"></span>
    <div class="timeline-body">
      <div class="timeline-main">
        <input class="check" type="checkbox" data-occ="${escapeAttr(occurrenceKey(item))}" data-date="${key}" ${status==='done'?'checked':''} aria-label="Mark ${escapeAttr(item.title)} done">
        <div class="timeline-copy"><b>${escapeHTML(item.title)}</b><small>${escapeHTML(item.detail||'')}</small>
          <div class="timeline-meta">${categoryBadge(item.category)}<span class="badge blue">${escapeHTML(timeWindow(item))}</span>${status==='skipped'?'<span class="badge warn">SKIPPED</span>':nowClass?'<span class="badge">NOW</span>':''}</div>
        </div>
      </div>
      ${showActions?`<div class="quick-actions"><button data-edit-item="${item.source}:${item.id}" type="button">Edit</button>${status==='skipped'?`<button data-restore-item="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Restore</button>`:''}</div>`:''}
    </div>
  </div>`;
}
function bindTimeline(date) {
  const key=todayKey(date);
  $$('[data-occ]').forEach(cb=>cb.addEventListener('change',()=>{
    const occ=cb.dataset.occ; const item=itemsForDate(date).find(x=>occurrenceKey(x)===occ);
    if(item) setStatus(item,key,cb.checked?'done':'pending');
    render();
  }));
  $$('[data-edit-item]').forEach(btn=>btn.addEventListener('click',()=>{
    const [source,id]=btn.dataset.editItem.split(':');
    if(source==='schedule') openScheduleItemModal(id);
    else openOneOffTaskModal(id);
  }));
  $$('[data-restore-item]').forEach(btn=>btn.addEventListener('click',()=>{
    const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.restoreItem);
    if(item){setStatus(item,key,'pending');render();}
  }));
}
function suggestTimeForNewTask(date) {
  if(todayKey(date)!==todayKey()) return '12:00';
  const d=new Date(); d.setMinutes(Math.ceil(d.getMinutes()/15)*15,0,0);
  if(d.getHours()>=23) return '20:00';
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

function renderWeek() {
  let selected=parseDateKey(state.settings.selectedWeekDate || todayKey());
  const weekStart=startOfWeek(selected); const days=Array.from({length:7},(_,i)=>addDays(weekStart,i));
  const weekEnd=days[6]; const selectedKey=todayKey(selected);
  if(!days.some(d=>todayKey(d)===selectedKey)){selected=weekStart;state.settings.selectedWeekDate=todayKey(selected);}
  setHeader('Week',selected);
  const oneOffCount=state.oneOffTasks.filter(t=>days.some(d=>todayKey(d)===t.date)).length;
  const gymCount=days.reduce((n,d)=>n+itemsForDate(d).filter(i=>i.category==='Fitness' && /gym/i.test(i.title)).length,0);
  const uniCount=days.reduce((n,d)=>n+itemsForDate(d).filter(i=>i.category==='University').length,0);
  main.innerHTML=`
    <section class="card flat">
      <div class="week-nav">
        <button class="icon-button" id="prevWeekBtn" aria-label="Previous week">‹</button>
        <h3>${formatDateShort(weekStart)} – ${formatDateShort(weekEnd)}</h3>
        <button class="icon-button" id="nextWeekBtn" aria-label="Next week">›</button>
      </div>
      <div class="week-strip">
        ${days.map(d=>{const k=todayKey(d);const p=dayCompletion(d);return `<button class="week-day ${k===selectedKey?'active':''} ${k===todayKey()?'today':''}" data-day-key="${k}"><small>${DAY_SHORT[d.getDay()]}</small><strong>${d.getDate()}</strong><small>${itemsForDate(d).length} items</small><div class="mini-progress"><span style="width:${p}%"></span></div></button>`}).join('')}
      </div>
    </section>

    <section class="week-summary-grid">
      <div class="week-summary"><small>One-off tasks</small><strong>${oneOffCount}</strong></div>
      <div class="week-summary"><small>Gym sessions</small><strong>${gymCount}</strong></div>
      <div class="week-summary"><small>Uni blocks</small><strong>${uniCount}</strong></div>
      <div class="week-summary"><small>Selected day</small><strong>${dayCompletion(selected)}%</strong></div>
    </section>

    <div class="section-title"><h2>${DAY_LONG[selected.getDay()]} · ${formatDateShort(selected)}</h2><button id="addWeekTaskBtn">+ Task</button></div>
    <section class="card flat timeline">
      ${itemsForDate(selected).length?itemsForDate(selected).map(i=>timelineItemHTML(i,selected,true)).join(''):'<div class="empty-state">Nothing scheduled for this day.</div>'}
    </section>

    <section class="card flat">
      <div class="row between center"><div><p class="eyebrow">RECURRING ROUTINE</p><h3 style="margin:0">Weekly schedule</h3></div><span class="badge blue">${state.schedule.filter(s=>s.active!==false).length} active</span></div>
      <p class="muted tiny" style="margin:10px 0 14px">Use this for classes, gym, sleep and anything that repeats every week.</p>
      <div class="button-row"><button class="primary" id="addRoutineBtn">+ Recurring item</button><button class="secondary" id="manageRoutineBtn">Manage routine</button></div>
    </section>`;
  $('#prevWeekBtn').onclick=()=>{state.settings.selectedWeekDate=todayKey(addDays(selected,-7));save();renderWeek();};
  $('#nextWeekBtn').onclick=()=>{state.settings.selectedWeekDate=todayKey(addDays(selected,7));save();renderWeek();};
  $$('[data-day-key]').forEach(b=>b.onclick=()=>{state.settings.selectedWeekDate=b.dataset.dayKey;save();renderWeek();});
  $('#addWeekTaskBtn').onclick=()=>openOneOffTaskModal(null,{date:selectedKey,start:'12:00'});
  $('#addRoutineBtn').onclick=()=>openScheduleItemModal(null,{days:[selected.getDay()]});
  $('#manageRoutineBtn').onclick=openScheduleManager;
  bindTimeline(selected);
}

function renderUniversity() {
  setHeader('University');
  const openTasks=state.uniTasks.filter(t=>!t.done);
  const urgent=openTasks.filter(t=>t.priority==='Urgent').length;
  const sorted=[...state.uniTasks].sort((a,b)=>Number(a.done)-Number(b.done) || priorityWeight(a.priority)-priorityWeight(b.priority) || String(a.dueDate||'9999').localeCompare(String(b.dueDate||'9999')));
  main.innerHTML=`
    <section class="card hero">
      <span class="badge blue">CURRENT WEEK FIRST</span>
      <h2 style="margin-top:14px">Catch up without disappearing.</h2>
      <p class="muted" style="margin-bottom:0">Attend current classes. Then handle urgent assessment content. Backlog comes after that.</p>
    </section>
    <section class="grid-3">
      <div class="stat"><small>Courses</small><strong>${state.courses.length}</strong></div>
      <div class="stat"><small>Open tasks</small><strong>${openTasks.length}</strong></div>
      <div class="stat"><small>Urgent</small><strong>${urgent}</strong></div>
    </section>
    <div class="section-title"><h2>Courses</h2><button id="addCourseBtn">+ Add</button></div>
    <section>${state.courses.map(courseHTML).join('') || '<div class="card flat muted">Add your courses and current progress.</div>'}</section>
    <div class="section-title"><h2>Catch-up queue</h2><button id="addUniTaskBtn">+ Task</button></div>
    <section class="card flat">
      ${sorted.length?sorted.map(uniTaskHTML).join(''):'<div class="empty-state">No university tasks yet. Add the things you need to catch up on.</div>'}
    </section>`;
  $('#addCourseBtn').onclick=()=>openCourseModal();
  $('#addUniTaskBtn').onclick=()=>openUniTaskModal();
  $$('[data-edit-course]').forEach(b=>b.onclick=()=>openCourseModal(b.dataset.editCourse));
  $$('[data-uni-check]').forEach(cb=>cb.onchange=()=>{const t=state.uniTasks.find(x=>x.id===cb.dataset.uniCheck);if(t){t.done=cb.checked;save();renderUniversity();}});
  $$('[data-uni-schedule]').forEach(b=>b.onclick=()=>{const t=state.uniTasks.find(x=>x.id===b.dataset.uniSchedule);if(t)openOneOffTaskModal(null,{date:todayKey(),start:suggestTimeForNewTask(new Date()),title:t.title,category:'University',detail:t.course||''});});
  $$('[data-uni-edit]').forEach(b=>b.onclick=()=>openUniTaskModal(b.dataset.uniEdit));
}
function priorityWeight(p){return p==='Urgent'?0:p==='Important'?1:2;}
function courseHTML(c) {
  const pct=clamp(Math.round((Number(c.currentWeek)||0)/Math.max(1,Number(c.teachingWeek)||1)*100),0,100);
  const gap=Math.max(0,Number(c.teachingWeek||0)-Number(c.currentWeek||0));
  return `<article class="course"><div class="course-top"><div><h3>${escapeHTML(c.name)}</h3><span class="muted tiny">You: week ${c.currentWeek} · Teaching: week ${c.teachingWeek}${gap?` · ${gap} week${gap===1?'':'s'} behind`:''}</span></div><button class="secondary small-btn" data-edit-course="${c.id}">Edit</button></div><div class="weekbar"><span style="width:${pct}%"></span></div>${c.note?`<p class="muted tiny" style="margin:9px 0 0">${escapeHTML(c.note)}</p>`:''}</article>`;
}
function uniTaskHTML(t) {
  const badge=t.priority==='Urgent'?'warn':t.priority==='Important'?'blue':'';
  return `<div class="uni-task ${t.done?'muted':''}"><div class="uni-task-head"><input class="check" type="checkbox" data-uni-check="${t.id}" ${t.done?'checked':''}><div class="uni-task-copy"><b>${escapeHTML(t.title)}</b><small>${escapeHTML(t.course||'General')}${t.dueDate?` · Due ${escapeHTML(formatDateShort(parseDateKey(t.dueDate)))}`:''}${t.estimate?` · ${escapeHTML(t.estimate)}`:''}</small><div class="timeline-meta"><span class="badge ${badge}">${escapeHTML(t.priority||'Important')}</span></div></div></div>${!t.done?`<div class="uni-actions"><button class="soft-btn small-btn" data-uni-schedule="${t.id}">Schedule it</button><button class="secondary small-btn" data-uni-edit="${t.id}">Edit</button></div>`:''}</div>`;
}

function renderMoney() {
  setHeader('Money');
  const mk=monthKey();
  const totalTarget=state.money.buckets.reduce((a,b)=>a+Number(b.target||0),0);
  const totalSpent=transactionsForMonth(mk).reduce((a,t)=>a+Number(t.amount||0),0);
  const unallocated=Number(state.money.income||0)-totalTarget;
  const budgetRemaining=Number(state.money.income||0)-totalSpent;
  const daysPay=daysUntilPayday();
  const latest=[...state.money.transactions].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,10);
  main.innerHTML=`
    <section class="card hero">
      <span class="badge blue">MONTHLY PLAN</span>
      <div class="money-hero-value">${fmtMoney(budgetRemaining)}</div>
      <p class="muted" style="margin-bottom:12px">Income left after spending logged this month</p>
      <div class="row wrap"><span class="badge">${daysPay===0?'PAYDAY TODAY':`${daysPay} day${daysPay===1?'':'s'} to payday`}</span><span class="badge blue">Cash snapshot ${fmtMoney(state.money.currentCash)}</span></div>
    </section>
    <section class="grid-3">
      <div class="stat"><small>Income</small><strong>${fmtMoney(state.money.income)}</strong></div>
      <div class="stat"><small>Allocated</small><strong>${fmtMoney(totalTarget)}</strong></div>
      <div class="stat"><small>Unallocated</small><strong class="${unallocated<0?'danger-text':'accent'}">${fmtMoney(unallocated)}</strong></div>
    </section>

    <div class="section-title"><h2>Allocations</h2><button id="editMoneyBtn">Edit</button></div>
    <section class="card flat">
      ${state.money.buckets.map(b=>budgetRowHTML(b,mk)).join('')}
    </section>
    <button class="primary full" id="addExpenseBtn">+ Log spending</button>

    <div class="section-title"><h2>Recent spending</h2><span class="muted tiny">${fmtMoney(totalSpent)} this month</span></div>
    <section class="card flat">
      ${latest.length?latest.map(transactionHTML).join(''):'<div class="empty-state">No spending logged yet. Start with food, fuel and other variable costs.</div>'}
    </section>

    <section class="card restart">
      <h3>Money rule</h3>
      <p class="muted" style="margin-bottom:0">The target is not to stop living. It is to decide where the 11k goes before random spending decides for you.</p>
    </section>`;
  $('#editMoneyBtn').onclick=openMoneyModal;
  $('#addExpenseBtn').onclick=()=>openExpenseModal();
  $$('[data-del-tx]').forEach(b=>b.onclick=()=>{state.money.transactions=state.money.transactions.filter(t=>t.id!==b.dataset.delTx);save();renderMoney();});
}
function transactionsForMonth(mk){return state.money.transactions.filter(t=>String(t.date||'').startsWith(mk));}
function spentForBucket(bucketId,mk=monthKey()){return transactionsForMonth(mk).filter(t=>t.bucketId===bucketId).reduce((a,t)=>a+Number(t.amount||0),0);}
function budgetRowHTML(b,mk) {
  const spent=spentForBucket(b.id,mk); const target=Number(b.target||0); const pct=target?clamp(Math.round(spent/target*100),0,140):0; const over=spent>target && target>0;
  return `<div class="budget-row"><div class="budget-top"><div><b>${escapeHTML(b.name)}</b><small>${fmtMoney(spent)} spent · ${fmtMoney(Math.max(0,target-spent))} left</small></div><div class="budget-amount"><b>${fmtMoney(target)}</b><small>${target?Math.round(spent/target*100):0}%</small></div></div><div class="budget-track"><div class="budget-fill ${over?'over':''}" style="width:${Math.min(100,pct)}%"></div></div></div>`;
}
function transactionHTML(t) {
  const b=state.money.buckets.find(x=>x.id===t.bucketId);
  return `<div class="transaction"><div><b>${escapeHTML(t.note||b?.name||'Spending')}</b><small>${escapeHTML(b?.name||'Other')} · ${escapeHTML(formatDateShort(parseDateKey(t.date)))}</small></div><div class="transaction-amount"><b>−${fmtMoney(t.amount)}</b><button class="text-button tiny" data-del-tx="${t.id}">Delete</button></div></div>`;
}
function daysUntilPayday() {
  const today=new Date(); today.setHours(12,0,0,0);
  const day=clamp(Number(state.profile.paydayDay||29),1,31);
  let y=today.getFullYear(),m=today.getMonth();
  const lastThis=new Date(y,m+1,0).getDate();
  let pay=new Date(y,m,Math.min(day,lastThis),12,0,0,0);
  if(pay<today){m+=1;if(m>11){m=0;y+=1;}const last=new Date(y,m+1,0).getDate();pay=new Date(y,m,Math.min(day,last),12,0,0,0);}
  return Math.round((pay-today)/86400000);
}

function renderMore() {
  setHeader('More');
  const days=[]; const today=new Date();
  for(let i=6;i>=0;i--){const d=addDays(today,-i);days.push({date:d,pct:dayCompletion(d)});}
  const avg=Math.round(days.reduce((a,b)=>a+b.pct,0)/7);
  const totalResets=Object.values(state.records).reduce((a,r)=>a+Number(r.resetCount||0),0);
  main.innerHTML=`
    <section class="card hero">
      <span class="badge">LIFE RESET</span>
      <h2 style="margin-top:14px">${avg}% this week.</h2>
      <p class="muted" style="margin-bottom:0">70% done consistently is better than a perfect plan you abandon.</p>
    </section>
    <section class="grid-3"><div class="stat"><small>Streak</small><strong>${streak()}</strong></div><div class="stat"><small>7-day avg</small><strong>${avg}%</strong></div><div class="stat"><small>Restarts</small><strong>${totalResets}</strong></div></section>

    <div class="section-title"><h2>Last 7 days</h2></div>
    <section class="card flat"><div class="day-grid">${days.map(x=>`<div class="day"><div class="bubble ${x.pct>=70?'good':''}">${x.pct}%</div><small>${DAY_SHORT[x.date.getDay()]}</small></div>`).join('')}</div></section>

    <div class="section-title"><h2>Your reset plan</h2></div>
    <section class="card flat">
      ${morePlanRow('Sleep','8:00 AM wake, 11:30 PM sleep. Get out of bed immediately.')}
      ${morePlanRow('Screen control','No TikTok during the reset. No porn/gooning in bed or after waking. Phone away at 11 PM.')}
      ${morePlanRow('University','Attend current classes first. Urgent assessments second. Backlog third. Attempt work before AI.')}
      ${morePlanRow('Body','Gym M/W/F, walk daily, mobility on other days, 3 meals and 90–110 g protein.')}
      ${morePlanRow('Money','Allocate salary before spending. Cut eating-out leakage and reserve for car/travel/Invisalign.')}
      ${morePlanRow('Environment','Weekly bathroom + bedsheets. Curtains open after waking. Groom at home.')}
      ${morePlanRow('Life outside uni','Personal project 3× a week and one guilt-free free evening.')}
    </section>

    <div class="section-title"><h2>Personal project</h2></div>
    <section class="card flat"><div class="row between center"><div><h3>${escapeHTML(state.project.name)}</h3><p class="muted tiny" style="margin:0">${escapeHTML(state.project.note)}</p></div><div class="stat" style="text-align:center"><small>Sessions</small><strong>${Number(state.project.sessions||0)}</strong></div></div><button class="primary full" id="projectSessionBtn" style="margin-top:14px">+ Log a 45–60 min session</button></section>

    <div class="section-title"><h2>Weekly reset</h2></div>
    <section class="card flat"><ul class="list-clean"><li><b>Saturday</b><br><span class="muted tiny">Bathroom, bedsheets, grooming and general reset.</span></li><li><b>Sunday</b><br><span class="muted tiny">Money check, week plan and review what slipped.</span></li></ul><button class="secondary full" id="weeklyReviewBtn" style="margin-top:14px">Do weekly review</button></section>

    <div class="section-title"><h2>Recent reviews</h2></div>
    <section class="card flat">${state.weeklyReviews.length?state.weeklyReviews.slice().reverse().slice(0,3).map(r=>`<div style="padding:10px 0;border-bottom:1px solid var(--line)"><div class="row between"><b>${escapeHTML(r.date)}</b><span class="badge">${r.rating}/10</span></div><p class="muted tiny" style="margin:6px 0 0">Next focus: ${escapeHTML(r.focus||'—')}</p></div>`).join(''):'<p class="muted" style="margin:0">No weekly review yet.</p>'}</section>`;
  $('#projectSessionBtn').onclick=()=>{state.project.sessions=Number(state.project.sessions||0)+1;save();toast('Project session logged');renderMore();};
  $('#weeklyReviewBtn').onclick=openWeeklyReviewModal;
}
function morePlanRow(title,text){return `<div class="more-link"><span><b>${escapeHTML(title)}</b><small>${escapeHTML(text)}</small></span></div>`;}

function openRestartModal() {
  const items=itemsForDate(new Date());
  const now=currentMinutes();
  const skippable=items.filter(i=>getStatus(i,todayKey())==='pending' && minutesFromTime(i.end||i.start)<now);
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">RESTART TODAY</p><h2>Start again from now.</h2><p class="muted">${skippable.length?`${skippable.length} unfinished earlier item${skippable.length===1?'':'s'} will be marked skipped.`:'Nothing earlier needs to be skipped.'} Completed tasks stay completed.</p><button class="primary full" id="confirmRestart">Restart from this moment</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#confirmRestart').onclick=()=>{const rec=ensureRecord();skippable.forEach(i=>rec.itemStatus[occurrenceKey(i)]='skipped');rec.resetCount=(rec.resetCount||0)+1;rec.restartAt=new Date().toISOString();save();modal.close();toast('Day restarted');renderToday();};
  $('#cancelModal').onclick=()=>modal.close();
}

function openScheduleManager() {
  const sorted=[...state.schedule].sort((a,b)=>minutesFromTime(a.start)-minutesFromTime(b.start));
  modalContent.innerHTML=`<div class="sheet-handle"></div><div class="row between center"><div><p class="eyebrow">WEEKLY ROUTINE</p><h2>Recurring schedule</h2></div><button class="icon-button" id="closeModal">×</button></div><p class="muted tiny">Edit the defaults to match your real class timetable. Repeating items automatically appear on Today and Week.</p><div class="stack" style="margin-top:14px">${sorted.map(s=>`<button class="more-link" data-routine-edit="${s.id}"><span><b>${escapeHTML(s.title)}</b><small>${escapeHTML(s.days.map(d=>DAY_SHORT[d]).join(', '))} · ${escapeHTML(timeWindow(s))}</small></span><b>›</b></button>`).join('')}</div><button class="primary full" id="addRoutineInside" style="margin-top:14px">+ Add recurring item</button>`;
  modal.showModal();
  $('#closeModal').onclick=()=>modal.close();
  $('#addRoutineInside').onclick=()=>openScheduleItemModal();
  $$('[data-routine-edit]').forEach(b=>b.onclick=()=>openScheduleItemModal(b.dataset.routineEdit));
}

function openScheduleItemModal(id=null,preset={}) {
  const existing=id?state.schedule.find(x=>x.id===id):null;
  const item=existing || {title:'',days:preset.days||[1,2,3,4,5],start:preset.start||'09:00',end:preset.end||'10:00',category:preset.category||'Life',detail:'',active:true};
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">RECURRING ITEM</p><h2>${existing?'Edit weekly item':'Add weekly item'}</h2><div class="stack">
    <label><span class="label">Title</span><input class="input" id="schedTitle" value="${escapeAttr(item.title)}" placeholder="e.g. Reservoir Engineering lecture"></label>
    <div class="form-grid"><label><span class="label">Start</span><input class="input" id="schedStart" type="time" value="${item.start}"></label><label><span class="label">End</span><input class="input" id="schedEnd" type="time" value="${item.end||item.start}"></label></div>
    <label><span class="label">Category</span><select id="schedCategory">${CATEGORIES.map(c=>`<option ${c===item.category?'selected':''}>${c}</option>`).join('')}</select></label>
    <div><span class="label">Repeat on</span><div class="day-picker">${DAY_PICK.map((d,i)=>`<label class="day-toggle"><input type="checkbox" data-repeat-day="${i}" ${item.days.includes(i)?'checked':''}><span>${d}</span></label>`).join('')}</div></div>
    <label><span class="label">Note</span><textarea id="schedDetail" placeholder="What exactly should you do?">${escapeHTML(item.detail||'')}</textarea></label>
  </div><button class="primary full" id="saveSchedule" style="margin-top:14px">Save recurring item</button>${existing?'<button class="danger-btn full" id="deleteSchedule" style="margin-top:8px">Delete recurring item</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveSchedule').onclick=()=>{
    const title=$('#schedTitle').value.trim(); const days=$$('[data-repeat-day]').filter(x=>x.checked).map(x=>Number(x.dataset.repeatDay));
    if(!title)return toast('Add a title'); if(!days.length)return toast('Choose at least one day');
    const data={title,days,start:$('#schedStart').value||'09:00',end:$('#schedEnd').value||$('#schedStart').value||'10:00',category:$('#schedCategory').value,detail:$('#schedDetail').value.trim(),active:true};
    if(existing){Object.assign(existing,data);if(existing.id==='wake')state.profile.wakeTarget=data.start;if(existing.id==='sleep')state.profile.sleepTarget=data.start;}else state.schedule.push({id:uid('sched'),...data});save();modal.close();toast('Weekly schedule updated');render();
  };
  if(existing)$('#deleteSchedule').onclick=()=>{state.schedule=state.schedule.filter(x=>x.id!==existing.id);save();modal.close();toast('Recurring item deleted');render();};
  $('#cancelModal').onclick=()=>modal.close();
}

function openOneOffTaskModal(id=null,preset={}) {
  const existing=id?state.oneOffTasks.find(x=>x.id===id):null;
  const item=existing || {title:preset.title||'',date:preset.date||todayKey(),start:preset.start||'12:00',end:preset.end||'',category:preset.category||'Life',detail:preset.detail||''};
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">ONE-OFF TASK</p><h2>${existing?'Edit task':'Add task'}</h2><div class="stack">
    <label><span class="label">Task</span><input class="input" id="oneTitle" value="${escapeAttr(item.title)}" placeholder="e.g. Buy groceries"></label>
    <label><span class="label">Date</span><input class="input" id="oneDate" type="date" value="${item.date}"></label>
    <div class="form-grid"><label><span class="label">Start</span><input class="input" id="oneStart" type="time" value="${item.start}"></label><label><span class="label">End (optional)</span><input class="input" id="oneEnd" type="time" value="${item.end||''}"></label></div>
    <label><span class="label">Category</span><select id="oneCategory">${CATEGORIES.map(c=>`<option ${c===item.category?'selected':''}>${c}</option>`).join('')}</select></label>
    <label><span class="label">Note</span><textarea id="oneDetail" placeholder="Keep it specific.">${escapeHTML(item.detail||'')}</textarea></label>
  </div><button class="primary full" id="saveOneTask" style="margin-top:14px">Save task</button>${existing?'<button class="danger-btn full" id="deleteOneTask" style="margin-top:8px">Delete task</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveOneTask').onclick=()=>{const title=$('#oneTitle').value.trim();if(!title)return toast('Add a task name');const data={title,date:$('#oneDate').value||todayKey(),start:$('#oneStart').value||'12:00',end:$('#oneEnd').value||'',category:$('#oneCategory').value,detail:$('#oneDetail').value.trim()};if(existing)Object.assign(existing,data);else state.oneOffTasks.push({id:uid('one'),...data});save();modal.close();toast('Task scheduled');render();};
  if(existing)$('#deleteOneTask').onclick=()=>{state.oneOffTasks=state.oneOffTasks.filter(x=>x.id!==existing.id);save();modal.close();toast('Task deleted');render();};
  $('#cancelModal').onclick=()=>modal.close();
}

function openCourseModal(id=null) {
  const c=id?state.courses.find(x=>x.id===id):null;
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">UNIVERSITY</p><h2>${c?'Edit course':'Add course'}</h2><div class="stack"><label><span class="label">Course name</span><input class="input" id="courseName" value="${c?escapeAttr(c.name):''}" placeholder="e.g. Production Engineering"></label><div class="form-grid"><label><span class="label">You are at week</span><input class="input" id="courseCurrent" type="number" min="0" value="${c?c.currentWeek:1}"></label><label><span class="label">Teaching week</span><input class="input" id="courseTeaching" type="number" min="1" value="${c?c.teachingWeek:10}"></label></div><label><span class="label">Note</span><input class="input" id="courseNote" value="${c?escapeAttr(c.note||''):''}" placeholder="What is blocking you?"></label></div><button class="primary full" id="saveCourse" style="margin-top:14px">Save course</button>${c?'<button class="danger-btn full" id="deleteCourse" style="margin-top:8px">Delete course</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveCourse').onclick=()=>{const data={name:$('#courseName').value.trim()||'Untitled course',currentWeek:Number($('#courseCurrent').value||0),teachingWeek:Number($('#courseTeaching').value||10),note:$('#courseNote').value.trim()};if(c)Object.assign(c,data);else state.courses.push({id:uid('course'),...data});save();modal.close();renderUniversity();};
  if(c)$('#deleteCourse').onclick=()=>{state.courses=state.courses.filter(x=>x.id!==c.id);save();modal.close();renderUniversity();};
  $('#cancelModal').onclick=()=>modal.close();
}

function openUniTaskModal(id=null) {
  const existing=id?state.uniTasks.find(x=>x.id===id):null;
  const t=existing||{title:'',course:'General',priority:'Important',dueDate:'',estimate:''};
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">CATCH-UP QUEUE</p><h2>${existing?'Edit task':'Add task'}</h2><div class="stack"><label><span class="label">Task</span><input class="input" id="uniTitle" value="${escapeAttr(t.title)}" placeholder="e.g. Topic 4 tutorial + notes"></label><label><span class="label">Course</span><select id="uniCourse"><option value="General">General</option>${state.courses.map(c=>`<option ${c.name===t.course?'selected':''}>${escapeHTML(c.name)}</option>`).join('')}</select></label><div class="form-grid"><label><span class="label">Priority</span><select id="uniPriority"><option ${t.priority==='Urgent'?'selected':''}>Urgent</option><option ${t.priority==='Important'?'selected':''}>Important</option><option ${t.priority==='Later'?'selected':''}>Later</option></select></label><label><span class="label">Due date</span><input class="input" id="uniDue" type="date" value="${t.dueDate||''}"></label></div><label><span class="label">Estimated time</span><input class="input" id="uniEstimate" value="${escapeAttr(t.estimate||'')}" placeholder="e.g. 60–90 min"></label></div><button class="primary full" id="saveUniTask" style="margin-top:14px">Save task</button>${existing?'<button class="danger-btn full" id="deleteUniTask" style="margin-top:8px">Delete task</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveUniTask').onclick=()=>{const title=$('#uniTitle').value.trim();if(!title)return toast('Add a task name');const data={title,course:$('#uniCourse').value,priority:$('#uniPriority').value,dueDate:$('#uniDue').value||'',estimate:$('#uniEstimate').value.trim()};if(existing)Object.assign(existing,data);else state.uniTasks.push({id:uid('unitask'),done:false,...data});save();modal.close();renderUniversity();};
  if(existing)$('#deleteUniTask').onclick=()=>{state.uniTasks=state.uniTasks.filter(x=>x.id!==existing.id);save();modal.close();renderUniversity();};
  $('#cancelModal').onclick=()=>modal.close();
}

function openMoneyModal() {
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">MONEY PLAN</p><h2>Edit monthly allocation</h2><div class="form-grid"><label><span class="label">Monthly income (SAR)</span><input class="input" id="incomeInput" type="number" min="0" value="${state.money.income}"></label><label><span class="label">Current total cash (SAR)</span><input class="input" id="cashInput" type="number" min="0" value="${state.money.currentCash}"></label></div><label style="display:block;margin-top:10px"><span class="label">Payday day of month</span><input class="input" id="paydayInput" type="number" min="1" max="31" value="${state.profile.paydayDay||29}"></label><hr><div id="bucketEditor" class="stack">${state.money.buckets.map(bucketEditorRow).join('')}</div><button class="secondary full" id="addBucketBtn" style="margin-top:10px">+ Add allocation bucket</button><button class="primary full" id="saveMoney" style="margin-top:14px">Save money plan</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#addBucketBtn').onclick=()=>{const wrap=document.createElement('div');wrap.innerHTML=bucketEditorRow({id:uid('bucket'),name:'New bucket',target:0});$('#bucketEditor').appendChild(wrap.firstElementChild);bindBucketDeleteButtons();};
  bindBucketDeleteButtons();
  $('#saveMoney').onclick=()=>{state.money.income=Math.max(0,Number($('#incomeInput').value||0));state.money.currentCash=Math.max(0,Number($('#cashInput').value||0));state.profile.paydayDay=clamp(Number($('#paydayInput').value||29),1,31);state.money.buckets=$$('.bucket-editor').map(row=>({id:row.dataset.bucketId||uid('bucket'),name:$('.bucket-name',row).value.trim()||'Bucket',target:Math.max(0,Number($('.bucket-target',row).value||0))}));save();modal.close();renderMoney();};
  $('#cancelModal').onclick=()=>modal.close();
}
function bucketEditorRow(b){return `<div class="course bucket-editor" data-bucket-id="${escapeAttr(b.id)}"><div class="row"><label style="flex:1"><span class="label">Bucket</span><input class="input bucket-name" value="${escapeAttr(b.name)}"></label><label style="width:130px"><span class="label">Monthly SAR</span><input class="input bucket-target" type="number" min="0" value="${Number(b.target||0)}"></label></div><button class="text-button danger-text bucket-delete" type="button">Remove</button></div>`;}
function bindBucketDeleteButtons(){ $$('.bucket-delete').forEach(b=>b.onclick=()=>{if($$('.bucket-editor').length<=1)return toast('Keep at least one bucket');b.closest('.bucket-editor').remove();}); }

function openExpenseModal() {
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SPENDING</p><h2>Log an expense</h2><div class="stack"><label><span class="label">Amount (SAR)</span><input class="input" id="expenseAmount" type="number" min="0" step="1" placeholder="0"></label><label><span class="label">Allocation</span><select id="expenseBucket">${state.money.buckets.map(b=>`<option value="${b.id}">${escapeHTML(b.name)}</option>`).join('')}</select></label><label><span class="label">Date</span><input class="input" id="expenseDate" type="date" value="${todayKey()}"></label><label><span class="label">Note</span><input class="input" id="expenseNote" placeholder="e.g. takeaway, fuel, haircut"></label></div><button class="primary full" id="saveExpense" style="margin-top:14px">Add spending</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveExpense').onclick=()=>{const amount=Number($('#expenseAmount').value||0);if(amount<=0)return toast('Enter an amount');state.money.transactions.push({id:uid('tx'),amount,bucketId:$('#expenseBucket').value,date:$('#expenseDate').value||todayKey(),note:$('#expenseNote').value.trim()});save();modal.close();toast('Spending logged');renderMoney();};
  $('#cancelModal').onclick=()=>modal.close();
}

function openWeeklyReviewModal() {
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SUNDAY RESET</p><h2>Weekly review</h2><div class="stack"><label><span class="label">How was the week? (1–10)</span><input class="input" id="reviewRating" type="number" min="1" max="10" value="7"></label><label><span class="label">What went well?</span><textarea id="reviewWins" placeholder="Small wins count."></textarea></label><label><span class="label">What kept slipping?</span><textarea id="reviewIssues" placeholder="Sleep, scrolling, class, food..."></textarea></label><label><span class="label">One focus for next week</span><input class="input" id="reviewFocus" placeholder="e.g. Attend every class"></label></div><button class="primary full" id="saveReview" style="margin-top:14px">Save weekly review</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveReview').onclick=()=>{state.weeklyReviews.push({id:uid('review'),date:new Date().toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}),rating:clamp(Number($('#reviewRating').value||7),1,10),wins:$('#reviewWins').value.trim(),issues:$('#reviewIssues').value.trim(),focus:$('#reviewFocus').value.trim()});save();modal.close();toast('Weekly review saved');renderMore();};
  $('#cancelModal').onclick=()=>modal.close();
}

$$('.tab').forEach(btn=>btn.addEventListener('click',()=>{state.settings.activeTab=btn.dataset.tab;save();render();window.scrollTo({top:0,behavior:'auto'});}));

const settingsDialog=$('#settingsDialog');
$('#settingsBtn').onclick=()=>settingsDialog.showModal();
$('#exportBtn').onclick=()=>{
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`reset-backup-${todayKey()}.json`;a.click();URL.revokeObjectURL(url);toast('Backup exported');
};
$('#importInput').addEventListener('change',async e=>{const f=e.target.files?.[0];if(!f)return;try{const data=JSON.parse(await f.text());if(!data.money||!data.records)throw new Error('Invalid');state=migrateState(data);save();settingsDialog.close();toast('Backup imported');render();}catch(err){toast('That backup file is not valid');}e.target.value='';});
$('#installHelpBtn').onclick=()=>{settingsDialog.close();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">IPHONE</p><h2>Add Reset to your Home Screen</h2><ol class="muted" style="padding-left:20px;line-height:1.8"><li>Open the app link in <b>Safari</b>.</li><li>Tap <b>Share</b>.</li><li>Choose <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b>.</li></ol><p class="muted tiny">When an update is uploaded to GitHub Pages, fully close and reopen the app. If an old version remains, refresh the Safari page once.</p><button class="primary full" id="cancelModal">Got it</button>`;modal.showModal();$('#cancelModal').onclick=()=>modal.close();};
$('#eraseBtn').onclick=()=>{if(confirm('Erase all Reset app data on this device?')){try{localStorage.removeItem(APP_KEY);}catch(e){}state=defaultState();settingsDialog.close();save();render();toast('App reset');}};
modal.addEventListener('click',e=>{if(e.target===modal)modal.close();});
settingsDialog.addEventListener('click',e=>{if(e.target===settingsDialog)settingsDialog.close();});

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));}
setInterval(()=>{if(state.settings.activeTab==='today')renderToday(true);},60000);
render();
