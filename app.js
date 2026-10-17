const APP_KEY = 'reset-life-dashboard-v1';
const APP_VERSION = 6;
const APP_DISPLAY_VERSION = '2.4.0';
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const uid = (p='id') => `${p}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`;
const clamp = (n,min,max) => Math.max(min,Math.min(max,n));
const fmtMoney = n => `${Number(n || 0).toLocaleString(undefined,{maximumFractionDigits:0})} SAR`;
const DAY_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const DAY_LONG = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAY_PICK = ['Su','M','Tu','W','Th','F','Sa'];
const CATEGORIES = ['Routine','University','Fitness','Food','Life','Project','Sleep'];
const ICON_PATHS = {
  chevronLeft:'<path d="M15 18l-6-6 6-6"/>',
  chevronRight:'<path d="M9 6l6 6-6 6"/>',
  close:'<path d="M6 6l12 12M18 6L6 18"/>',
  check:'<path d="M5 12.5l4.2 4.2L19 7"/>',
  more:'<circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/>'
};
function svgIcon(name, cls='ui-icon') { return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[name]||''}</svg>`; }

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
function minutesToTime(total) {
  const n=((Math.round(total)%1440)+1440)%1440;
  return `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;
}
function roundUpMinutes(value, step=5) { return Math.ceil(value/step)*step; }
function durationMinutes(item) {
  const start=minutesFromTime(item.start), end=minutesFromTime(item.end||item.start);
  return Math.max(5, end>start ? end-start : Number(item.minMinutes||30));
}
function dateInRange(key,item) {
  if(item.startDate && key<item.startDate) return false;
  if(item.endDate && key>item.endDate) return false;
  return true;
}

function defaultSchedule() {
  return [
    {id:'wake', title:'Wake up + curtains open', days:[0,1,2,3,4,5,6], start:'08:00', end:'08:10', category:'Routine', detail:'Get out of bed immediately. No scrolling or gooning in bed.', active:true, essential:true, manualLocked:true, minMinutes:5},
    {id:'groom', title:'Shower + grooming', days:[0,1,2,3,4,5,6], start:'08:10', end:'08:30', category:'Routine', detail:'Teeth, deodorant, hair/beard and clean clothes.', active:true, essential:true, manualLocked:true, minMinutes:15},
    {id:'breakfast', title:'Breakfast', days:[0,1,2,3,4,5,6], start:'08:30', end:'09:00', category:'Food', detail:'Eat early and include protein.', active:true, essential:true, manualLocked:true, minMinutes:20},

    {id:'catch_mon', title:'Focused university catch-up', days:[1], start:'10:00', end:'11:30', category:'University', detail:'Work on the highest-priority backlog before today’s class.', active:true, minMinutes:60},
    {id:'catch_tue', title:'Focused university catch-up', days:[2], start:'13:00', end:'14:00', category:'University', detail:'Use the gap before the Reservoir Engineering workshop.', active:true, minMinutes:45},
    {id:'catch_wed', title:'Focused university catch-up', days:[3], start:'10:00', end:'11:30', category:'University', detail:'Current week and urgent assessment content first.', active:true, minMinutes:60},
    {id:'catch_thu', title:'Focused university catch-up', days:[4], start:'09:30', end:'10:30', category:'University', detail:'One focused block before the Reservoir Engineering classes.', active:true, minMinutes:45},
    {id:'catch_fri', title:'Focused university catch-up', days:[5], start:'10:00', end:'11:30', category:'University', detail:'Current week and urgent assessment content first.', active:true, minMinutes:60},
    {id:'catch_sun', title:'Focused university catch-up', days:[0], start:'14:00', end:'15:00', category:'University', detail:'One clean catch-up block before the new week.', active:true, minMinutes:45},

    {id:'class_prod_forum', title:'Production Engineering Forum', days:[2], start:'10:15', end:'12:00', category:'University', detail:'University timetable class. Attend in person.', active:true, fixed:true, isClass:true, startDate:'2026-10-12', endDate:'2026-11-15'},
    {id:'class_prod_workshop', title:'Production Engineering Workshop', days:[1], start:'15:15', end:'17:00', category:'University', detail:'Tutorial 228. University timetable class.', active:true, fixed:true, isClass:true, startDate:'2026-10-12', endDate:'2026-11-15'},
    {id:'class_res_workshop', title:'Reservoir Engineering Workshop', days:[2], start:'14:15', end:'16:00', category:'University', detail:'University timetable class. Attend in person.', active:true, fixed:true, isClass:true, startDate:'2026-10-12', endDate:'2026-11-15'},
    {id:'class_prod_tutorial', title:'Production Engineering Tutorial', days:[3], start:'14:15', end:'16:00', category:'University', detail:'University timetable class. Attend in person.', active:true, fixed:true, isClass:true, startDate:'2026-10-12', endDate:'2026-11-15'},
    {id:'class_res_tutorial', title:'Reservoir Engineering Tutorial', days:[4], start:'11:15', end:'13:00', category:'University', detail:'University timetable class. Attend in person.', active:true, fixed:true, isClass:true, startDate:'2026-10-12', endDate:'2026-11-15'},
    {id:'class_res_lecture', title:'Reservoir Engineering Lecture', days:[4], start:'13:15', end:'14:00', category:'University', detail:'University timetable class. Attend in person.', active:true, fixed:true, isClass:true, startDate:'2026-10-12', endDate:'2026-11-15'},
    {id:'class_fluid_workshop', title:'Fluid Mechanics Workshop', days:[4], start:'14:15', end:'16:00', category:'University', detail:'University timetable class. Shown through 29 Oct in your timetable.', active:true, fixed:true, isClass:true, startDate:'2026-10-12', endDate:'2026-10-29'},
    {id:'class_systems_workshop', title:'Systems Engineering Workshop', days:[5], start:'14:15', end:'16:00', category:'University', detail:'University timetable class. Attend in person.', active:true, fixed:true, isClass:true, startDate:'2026-10-12', endDate:'2026-11-15'},

    {id:'lunch', title:'Lunch', days:[0,1,2,3,5,6], start:'12:30', end:'13:00', category:'Food', detail:'Proper meal, not random snacking.', active:true, minMinutes:25},
    {id:'lunch_thu', title:'Lunch', days:[4], start:'16:00', end:'16:30', category:'Food', detail:'Thursday classes run through lunch. Eat a proper meal as soon as the class block finishes.', active:true, minMinutes:25},
    {id:'outside', title:'Outside + walk', days:[0,2,3,4,5,6], start:'16:45', end:'17:15', category:'Life', detail:'Leave the room and get at least 30 minutes outside.', active:true, minMinutes:25},
    {id:'outside_mon', title:'Outside + walk', days:[1], start:'17:00', end:'17:25', category:'Life', detail:'Use the walk after class to get outside before the gym.', active:true, minMinutes:20},
    {id:'gym', title:'Full-body gym', days:[1,3,5], start:'17:30', end:'18:30', category:'Fitness', detail:'Start light. Consistency beats destroying yourself.', active:true, minMinutes:45},
    {id:'mobility', title:'Mobility / easy movement', days:[0,2,4,6], start:'17:30', end:'17:45', category:'Fitness', detail:'10–15 minutes for hips, hamstrings, back and shoulders.', active:true, minMinutes:10},
    {id:'dinner', title:'Dinner', days:[0,1,2,3,4,5,6], start:'19:00', end:'19:30', category:'Food', detail:'A real meal with protein.', active:true, minMinutes:25},
    {id:'project', title:'Personal project', days:[2,4,6], start:'20:00', end:'21:00', category:'Project', detail:'Build something outside university. The app itself can count.', active:true, minMinutes:45},
    {id:'sat_reset', title:'Room + personal reset', days:[6], start:'10:30', end:'11:30', category:'Life', detail:'Bathroom, bedsheets, grooming and anything small that has been building up.', active:true, minMinutes:30},
    {id:'sun_money', title:'Money check', days:[0], start:'10:30', end:'10:50', category:'Life', detail:'Check spending, allocations and upcoming car/travel costs.', active:true, minMinutes:15},
    {id:'sun_week', title:'Plan the coming week', days:[0], start:'11:00', end:'11:30', category:'Life', detail:'Classes, urgent uni work, gym and one focus for the week.', active:true, minMinutes:20},
    {id:'phone', title:'Phone away', days:[0,1,2,3,4,5,6], start:'23:00', end:'23:05', category:'Sleep', detail:'Charge it away from the bed. No late scroll spiral.', active:true, fixed:true},
    {id:'sleep', title:'Lights out', days:[0,1,2,3,4,5,6], start:'23:30', end:'23:40', category:'Sleep', detail:'Protect tomorrow before it starts.', active:true, fixed:true}
  ];
}
function defaultGymExercises() {
  return [
    {id:'chest_press',name:'Chest Press',group:'Chest'},
    {id:'lat_pulldown',name:'Lat Pulldown',group:'Back'},
    {id:'seated_row',name:'Seated Row',group:'Back'},
    {id:'shoulder_press',name:'Shoulder Press',group:'Shoulders'},
    {id:'leg_press',name:'Leg Press',group:'Legs'},
    {id:'leg_curl',name:'Leg Curl',group:'Hamstrings'},
    {id:'biceps_curl',name:'Biceps Curl',group:'Arms'},
    {id:'triceps_pushdown',name:'Triceps Pushdown',group:'Arms'}
  ];
}
function defaultState() {
  return {
    version: APP_VERSION,
    meta: {createdAt:new Date().toISOString()},
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
    projects:[{
      id:'project_life_reset', name:'Life Reset App', status:'Active', progress:0,
      description:'Build and use a personal dashboard that helps keep the rest of life on track.',
      nextTask:'Use the app consistently and improve only what is genuinely useful.',
      plan:'Keep it simple, reliable and useful on iPhone.', sessions:0, logs:[]
    }],
    gym:{exercises:defaultGymExercises(),logs:[],sessions:[],sessionExcluded:[]},
    health:{weightLogs:[]},
    car:{model:'2007 Honda Accord V6 Luxury',odometer:180000,regoDue:'',serviceDueDate:'',serviceDueKm:0,fuelLogs:[],maintenanceLogs:[]},
    weeklyReviews:[],
    settings:{activeTab:'today', selectedWeekDate:todayKey(), statsRange:'30', moreView:'home', mode:'normal', modeSetDate:todayKey(), selectedExerciseId:'chest_press'}
  };
}

function migrateState(parsed) {
  const base = defaultState();
  const next = {...base, ...parsed};
  next.version = APP_VERSION;
  next.meta = {...base.meta, ...(parsed.meta || {})};
  if(!parsed.meta?.createdAt){const keys=Object.keys(parsed.records||{}).sort();next.meta.createdAt=keys.length?`${keys[0]}T00:00:00` : new Date().toISOString();}
  next.profile = {...base.profile, ...(parsed.profile || {})};
  const savedSchedule = Array.isArray(parsed.schedule) && parsed.schedule.length ? parsed.schedule : [];
  const obsoleteIds = new Set(['uni_am','uni_pm','catchup']);
  const baseById = new Map(base.schedule.map(x=>[x.id,x]));
  const cleanedSchedule = savedSchedule.filter(x=>!obsoleteIds.has(x.id)).map(x=>baseById.has(x.id)?{...baseById.get(x.id),...x}:x);
  const builtInIds = new Set(cleanedSchedule.map(x=>x.id));
  const mustAdd = base.schedule.filter(x=>x.id.startsWith('class_') || x.id.startsWith('catch_') || x.id==='lunch_thu' || x.id==='outside_mon').filter(x=>!builtInIds.has(x.id));
  next.schedule = cleanedSchedule.length ? [...cleanedSchedule, ...mustAdd] : base.schedule;
  next.oneOffTasks = Array.isArray(parsed.oneOffTasks) ? parsed.oneOffTasks : [];
  next.records = parsed.records || {};
  next.courses = Array.isArray(parsed.courses) ? parsed.courses : base.courses;
  next.uniTasks = Array.isArray(parsed.uniTasks) ? parsed.uniTasks : [];
  next.weeklyReviews = Array.isArray(parsed.weeklyReviews) ? parsed.weeklyReviews : [];
  next.settings = {...base.settings, ...(parsed.settings || {})};
  if(['plan','progress','life'].includes(next.settings.activeTab)) next.settings.activeTab='more';
  if(!next.settings.selectedWeekDate) next.settings.selectedWeekDate=todayKey();
  if(!['normal','bad','exam','holiday'].includes(next.settings.mode)) next.settings.mode='normal';
  if(next.settings.mode==='bad' && next.settings.modeSetDate!==todayKey()) next.settings.mode='normal';

  const oldMoney = parsed.money || {};
  const oldBuckets = Array.isArray(oldMoney.buckets) && oldMoney.buckets.length ? oldMoney.buckets : base.money.buckets;
  next.money = {
    ...base.money,
    ...oldMoney,
    buckets: oldBuckets.map(b => ({id:b.id || uid('bucket'), name:b.name || 'Bucket', target:Number(b.target||0)})),
    transactions: Array.isArray(oldMoney.transactions) ? oldMoney.transactions : []
  };
  if(!next.money.transactions.length) {
    oldBuckets.filter(b=>Number(b.spent)>0).forEach(b=>next.money.transactions.push({
      id:uid('tx'), date:todayKey(), amount:Number(b.spent), bucketId:b.id, note:'Imported from previous version'
    }));
  }

  if(Array.isArray(parsed.projects)) {
    next.projects=parsed.projects.map(pr=>({id:pr.id||uid('project'),name:pr.name||'Project',status:pr.status||'Active',progress:clamp(Number(pr.progress||0),0,100),description:pr.description||'',nextTask:pr.nextTask||'',plan:pr.plan||'',sessions:Number(pr.sessions||0),logs:Array.isArray(pr.logs)?pr.logs:[]}));
  } else if(parsed.project) {
    next.projects=[{id:'project_life_reset',name:parsed.project.name||'Life Reset App',status:'Active',progress:0,description:parsed.project.note||'',nextTask:'Choose the next useful step.',plan:'',sessions:Number(parsed.project.sessions||0),logs:[]}];
  } else next.projects=base.projects;
  if(!next.projects.length) next.projects=base.projects;

  const oldGym=parsed.gym||{};
  next.gym={
    exercises:Array.isArray(oldGym.exercises)&&oldGym.exercises.length?oldGym.exercises:base.gym.exercises,
    logs:Array.isArray(oldGym.logs)?oldGym.logs:[],
    sessions:Array.isArray(oldGym.sessions)?[...new Set(oldGym.sessions)]:[],
    sessionExcluded:Array.isArray(oldGym.sessionExcluded)?[...new Set(oldGym.sessionExcluded)]:[]
  };
  next.health={...base.health,...(parsed.health||{})};
  next.health.weightLogs=Array.isArray(parsed.health?.weightLogs)?parsed.health.weightLogs:[];
  next.car={...base.car,...(parsed.car||{})};
  next.car.fuelLogs=Array.isArray(parsed.car?.fuelLogs)?parsed.car.fuelLogs:[];
  next.car.maintenanceLogs=Array.isArray(parsed.car?.maintenanceLogs)?parsed.car.maintenanceLogs:[];

  Object.entries(next.records).forEach(([key,r])=>{
    if(!r.itemStatus) r.itemStatus={};
    Object.keys(r.itemStatus).forEach(k=>{ if(r.itemStatus[k]==='skipped') delete r.itemStatus[k]; });
    if(!r.timeOverrides) r.timeOverrides={};
    if(!Number.isFinite(r.resetCount)) r.resetCount=0;
    if(!r.mode) r.mode='normal';
    if(!('finishCelebrated' in r)) r.finishCelebrated='';
  });
  return next;
}

let initialLocalStateFound=false;
let appInitialized=false;
let durableTimer=null;
let durableDbPromise=null;
function loadState() {
  try {
    const raw = localStorage.getItem(APP_KEY);
    initialLocalStateFound=!!raw;
    if(!raw) return defaultState();
    return migrateState(JSON.parse(raw));
  } catch(e) {
    return defaultState();
  }
}
let state = loadState();
function openDurableDB() {
  if(!('indexedDB' in window)) return Promise.resolve(null);
  if(durableDbPromise) return durableDbPromise;
  durableDbPromise=new Promise(resolve=>{
    const req=indexedDB.open('reset-life-dashboard-db',1);
    req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains('snapshots')) req.result.createObjectStore('snapshots',{keyPath:'id'});};
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>resolve(null);
  });
  return durableDbPromise;
}
async function durableWrite() {
  try {
    const db=await openDurableDB(); if(!db) return false;
    return await new Promise(resolve=>{
      const tx=db.transaction('snapshots','readwrite');
      tx.objectStore('snapshots').put({id:'latest',updatedAt:new Date().toISOString(),state:JSON.parse(JSON.stringify(state))});
      tx.oncomplete=()=>resolve(true); tx.onerror=()=>resolve(false); tx.onabort=()=>resolve(false);
    });
  } catch(e){ return false; }
}
async function durableRead() {
  try {
    const db=await openDurableDB(); if(!db) return null;
    return await new Promise(resolve=>{
      const tx=db.transaction('snapshots','readonly'); const req=tx.objectStore('snapshots').get('latest');
      req.onsuccess=()=>resolve(req.result||null); req.onerror=()=>resolve(null);
    });
  } catch(e){ return null; }
}
async function durableClear() {
  try { const db=await openDurableDB(); if(!db) return; const tx=db.transaction('snapshots','readwrite'); tx.objectStore('snapshots').clear(); } catch(e){}
}
function save() {
  try { localStorage.setItem(APP_KEY, JSON.stringify(state)); } catch(e) {}
  if(appInitialized){clearTimeout(durableTimer);durableTimer=setTimeout(()=>durableWrite(),350);}
}
async function requestPersistentStorage() {
  try {
    if(!navigator.storage?.persist) return {supported:false,persisted:false};
    let persisted=await navigator.storage.persisted?.();
    if(!persisted) persisted=await navigator.storage.persist();
    return {supported:true,persisted:!!persisted};
  } catch(e){return {supported:false,persisted:false};}
}
async function initializeApp() {
  if(!initialLocalStateFound) {
    const snap=await durableRead();
    if(snap?.state){state=migrateState(snap.state);try{localStorage.setItem(APP_KEY,JSON.stringify(state));}catch(e){}}
  }
  if(state.settings.mode==='bad' && state.settings.modeSetDate!==todayKey()) state.settings.mode='normal';
  appInitialized=true;
  requestPersistentStorage().then(updateStorageProtectionLabel);
  render();
  durableWrite();
}
function updateStorageProtectionLabel(result) {
  const el=$('#storageProtectionStatus'); if(!el)return;
  if(result?.persisted) el.textContent='Protected';
  else if(result?.supported) el.textContent='Best effort';
  else el.textContent='Local';
}

function ensureRecord(key=todayKey()) {
  if(!state.records[key]) state.records[key] = {itemStatus:{}, timeOverrides:{}, resetCount:0, restartAt:null, mode:key===todayKey()?currentMode():'normal', finishCelebrated:''};
  if(!state.records[key].itemStatus) state.records[key].itemStatus={};
  if(!state.records[key].timeOverrides) state.records[key].timeOverrides={};
  if(!state.records[key].mode) state.records[key].mode=key===todayKey()?currentMode():'normal';
  if(!('finishCelebrated' in state.records[key])) state.records[key].finishCelebrated='';
  return state.records[key];
}
function occurrenceKey(item) { return `${item.source==='oneoff'?'o':'s'}:${item.id}`; }
function getStatus(item,key) { return state.records[key]?.itemStatus?.[occurrenceKey(item)] || 'pending'; }
function setStatus(item,key,status) {
  const rec=ensureRecord(key);
  if(status==='pending') { delete rec.itemStatus[occurrenceKey(item)]; rec.finishCelebrated=''; }
  else rec.itemStatus[occurrenceKey(item)]=status;
  if(status==='done' && item.category==='Fitness' && /gym/i.test(item.title||'')) state.gym.sessionExcluded=(state.gym.sessionExcluded||[]).filter(k=>k!==key);
  save();
}
function applyDailyOverride(item,key,ignoreOverrides=false) {
  if(ignoreOverrides) return item;
  const override=state.records[key]?.timeOverrides?.[occurrenceKey(item)];
  return override ? {...item,...override,adjusted:true} : item;
}
function itemsForDate(date, options={}) {
  const key=todayKey(date); const dow=date.getDay();
  const recurring=state.schedule
    .filter(x=>x.active!==false && Array.isArray(x.days) && x.days.includes(dow) && dateInRange(key,x))
    .map(x=>applyDailyOverride({...x,source:'schedule',date:key},key,options.ignoreOverrides));
  const oneOff=state.oneOffTasks
    .filter(x=>x.date===key)
    .map(x=>applyDailyOverride({...x,source:'oneoff'},key,options.ignoreOverrides));
  return [...recurring,...oneOff].sort((a,b)=>minutesFromTime(a.start)-minutesFromTime(b.start) || String(a.title).localeCompare(String(b.title)));
}
function currentMode() {
  if(state.settings.mode==='bad' && state.settings.modeSetDate!==todayKey()) {state.settings.mode='normal';state.settings.modeSetDate=todayKey();}
  return state.settings.mode||'normal';
}
function modeName(mode=currentMode()){return ({normal:'Normal',bad:'Bad day',exam:'Exam',holiday:'Holiday'})[mode]||'Normal';}
function isWalkItem(item){return item.category==='Life' && /outside|walk/i.test(item.title||'');}
function itemIncludedForMode(item,mode) {
  if(mode==='holiday') return item.category!=='University' && !item.isClass;
  if(mode==='bad') return !!(item.essential || item.isClass || item.category==='Food' || item.category==='Sleep' || isWalkItem(item));
  if(mode==='exam') return item.category!=='Project' && !(item.category==='Life' && /reset|money check|plan the coming week/i.test(item.title||''));
  return true;
}
function itemsForMode(items,mode=currentMode()){return items.filter(i=>itemIncludedForMode(i,mode));}
function modeForDate(key){return state.records[key]?.mode || 'normal';}
function dayCompletion(date) {
  const key=todayKey(date); const items=itemsForMode(itemsForDate(date),modeForDate(key));
  if(!items.length) return 0;
  const done=items.filter(i=>getStatus(i,key)==='done').length;
  return Math.round(done/items.length*100);
}
function dayFinishState(date=new Date()) {
  const key=todayKey(date); const items=itemsForMode(itemsForDate(date),modeForDate(key));
  if(!items.length) return null;
  const statuses=items.map(i=>getStatus(i,key));
  const closed=new Set(['done','missed','deferred','dropped']);
  const pending=statuses.filter(s=>!closed.has(s)).length;
  const done=statuses.filter(s=>s==='done').length;
  const missed=statuses.filter(s=>s==='missed').length;
  const deferred=statuses.filter(s=>s==='deferred').length;
  const dropped=statuses.filter(s=>s==='dropped').length;
  if(pending>0 || done===0) return null;
  return {type:(missed||deferred||dropped)?'recovery':'full', done, missed, deferred, dropped, total:items.length};
}
function showDayFinishPop(result) {
  const old=$('.day-finish-pop'); if(old) old.remove();
  const el=document.createElement('div');
  el.className='day-finish-pop';
  el.setAttribute('role','status');
  const full=result.type==='full';
  el.innerHTML=`<div class="day-finish-card"><div class="day-finish-icon">${svgIcon('check')}</div><div class="day-finish-copy"><b>${full?'Day complete':'Recovery complete'}</b><small>${full?'Everything planned for today is done.':'You finished everything still in your control today.'}</small></div><div class="day-finish-sparks" aria-hidden="true"><i></i><i></i><i></i></div></div>`;
  document.body.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('show'));
  clearTimeout(window.__finishPop);
  window.__finishPop=setTimeout(()=>{el.classList.remove('show');setTimeout(()=>el.remove(),350);},3600);
}
function maybeCelebrateDayFinish(date=new Date()) {
  if(todayKey(date)!==todayKey()) return;
  const result=dayFinishState(date); if(!result) return;
  const rec=ensureRecord(todayKey(date));
  if(rec.finishCelebrated===result.type) return;
  rec.finishCelebrated=result.type;
  rec.finishedAt=new Date().toISOString();
  save();
  showDayFinishPop(result);
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
function toast(msg,actionLabel='',actionFn=null) {
  let el=$('.toast');
  if(!el){el=document.createElement('div');el.className='toast';document.body.appendChild(el);}
  clearTimeout(window.__toast); el.classList.remove('actionable');
  if(actionLabel && typeof actionFn==='function'){
    el.innerHTML=`<span>${escapeHTML(msg)}</span><button type="button">${escapeHTML(actionLabel)}</button>`;
    el.classList.add('actionable');
    const btn=el.querySelector('button'); if(btn)btn.onclick=()=>{clearTimeout(window.__toast);el.classList.remove('show','actionable');actionFn();};
  } else el.textContent=msg;
  el.classList.add('show');
  window.__toast=setTimeout(()=>el.classList.remove('show','actionable'),actionLabel?3200:1800);
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
  $$('.tab').forEach(b=>{const active=b.dataset.tab===tab;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
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
  const active=items.filter(i=>!['done','skipped','missed','deferred','dropped'].includes(getStatus(i,key)));
  const current=active.find(i=>statusForTime(i,new Date())==='now');
  if(current) return {item:current,mode:'now'};
  const overdueEssential=active.find(i=>i.essential && minutesFromTime(i.end||i.start)<now);
  if(overdueEssential) return {item:overdueEssential,mode:'overdue'};
  const next=active.find(i=>minutesFromTime(i.start)>now);
  if(next) return {item:next,mode:'next'};
  const overdue=active.find(i=>minutesFromTime(i.end||i.start)<now && !itemIsFixed(i));
  if(overdue) return {item:overdue,mode:'overdue'};
  return null;
}
function countdownText(item,mode) {
  if(mode==='overdue') return 'NOW';
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
  const date=new Date(); const key=todayKey(date); const rec=ensureRecord(key);
  rec.mode=currentMode();
  const allItems=itemsForDate(date); const items=itemsForMode(allItems,currentMode()); const parked=allItems.filter(i=>!itemIncludedForMode(i,currentMode()));
  const done=items.filter(i=>getStatus(i,key)==='done').length; const total=items.length; const pct=total?Math.round(done/total*100):0;
  const hour=new Date().getHours(); const greeting=hour<12?'Good morning':hour<18?'Good afternoon':'Good evening';
  const next=nextUsefulItem(items,key);
  const missed=items.filter(i=>getStatus(i,key)==='missed').length;
  const adjusted=items.filter(i=>i.adjusted).length;
  const finish=dayFinishState(date);
  const pendingFlexible=items.filter(i=>!itemManualMoveLocked(i) && !isClosedStatus(getStatus(i,key)));
  const showWrap=hour>=18 && pendingFlexible.length>0;
  const heroCanComplete=next && (next.mode==='now'||next.mode==='overdue');
  setHeader('Today',date);
  main.innerHTML=`
    <section class="card hero ${finish?'day-complete':''}">
      <div class="next-card">
        <div>
          <div class="row wrap"><span class="badge">${greeting.toUpperCase()}</span><button class="mode-pill" id="modeBtn">${escapeHTML(modeName())} ▾</button></div>
          ${next ? `<div class="time-big" style="margin-top:12px">${next.mode==='now'||next.mode==='overdue'?'DO THIS NOW':'NEXT · '+formatClock(next.item.start)}</div><h2>${escapeHTML(next.item.title)}</h2><p class="muted" style="margin-bottom:${heroCanComplete?'12px':'0'}">${escapeHTML(next.item.detail||'Do the next useful thing.')}</p>${heroCanComplete?`<div class="hero-actions"><button class="primary hero-action" id="heroDoneBtn">${svgIcon('check')} Mark done</button>${!itemManualMoveLocked(next.item)?`<button class="secondary hero-action" id="heroMoveBtn">Move</button>`:''}</div>`:''}` : finish ? `<div class="completion-label" style="margin-top:12px">${svgIcon('check')} ${finish.type==='full'?'DAY COMPLETE':'RECOVERY COMPLETE'}</div><h2 style="margin-top:8px">${finish.type==='full'?'You finished the day.':'You finished what was still in your control.'}</h2><p class="muted" style="margin-bottom:0">${finish.type==='full'?'Everything planned for today is checked off.':'A fixed event was missed or something was moved, but every remaining actionable task is done.'}</p>` : `<h2 style="margin-top:14px">You’re clear for now.</h2><p class="muted" style="margin-bottom:0">Use the free time well, or add something useful to today.</p>`}
        </div>
        ${next?`<div class="countdown"><b>${countdownText(next.item,next.mode)}</b><small>${next.mode==='now'?'remaining / now':next.mode==='overdue'?'overdue':'until next'}</small></div>`:`<div class="progress-ring" style="--value:${pct*3.6}deg"><b>${pct}%</b></div>`}
      </div>
    </section>

    <section class="grid-3">
      <div class="stat"><small>Done</small><strong>${done}/${total}</strong></div>
      <div class="stat"><small>Streak</small><strong>${streak()} days</strong></div>
      <div class="stat"><small>Sleep target</small><strong>${formatClock(state.profile.sleepTarget)}</strong></div>
    </section>

    <div class="section-title"><h2>Today’s timeline</h2><button id="addTodayBtn">+ Task</button></div>
    <section class="card flat timeline">
      ${items.length ? items.map(i=>timelineItemHTML(i,date,true)).join('') : '<div class="empty-state">Nothing scheduled in this mode today.</div>'}
    </section>

    ${showWrap?`<section class="card compact day-wrap-card"><div><b>Wrapping up?</b><small>${pendingFlexible.length} flexible item${pendingFlexible.length===1?'':'s'} still open. Move them to tomorrow, drop them, or keep them today.</small></div><button class="secondary small-btn" id="wrapDayBtn">Wrap up</button></section>`:''}
    ${parked.length&&currentMode()!=='normal'?`<details class="card flat parked-card"><summary>${parked.length} item${parked.length===1?'':'s'} parked by ${escapeHTML(modeName())} mode</summary><div class="parked-list">${parked.map(i=>`<div><b>${escapeHTML(i.title)}</b><span>${escapeHTML(timeWindow(i))}</span></div>`).join('')}</div></details>`:''}
    ${adjusted?`<p class="muted tiny" style="text-align:center">Adaptive restart moved ${adjusted} item${adjusted===1?'':'s'} to realistic times for today. Fixed classes stay fixed.</p>`:''}
    ${missed?`<p class="muted tiny" style="text-align:center">${missed} fixed event${missed===1?' was':'s were'} already past when you restarted. They remain visible as missed instead of disappearing.</p>`:''}

    <section class="card restart">
      <span class="badge warn">ADAPTIVE RESTART</span>
      <h3 style="margin-top:12px">The day went off track?</h3>
      <p class="muted">Rebuild only the remaining useful part of today. Essential morning tasks move forward, fixed classes stay fixed, and nothing is deleted.</p>
      <button class="primary full" id="restartBtn">Rebuild today from now</button>
    </section>

    <section class="card flat">
      <div class="row between center"><div><p class="eyebrow">NON-NEGOTIABLE</p><h3 style="margin:0">One rule</h3></div><span class="badge">KEEP MOVING</span></div>
      <div class="rule"><strong>An unfinished task never blocks the next task.</strong><span class="muted tiny">If something is missed, continue with the schedule. The day is not cancelled.</span></div>
    </section>`;
  bindTimeline(date);
  $('#addTodayBtn').onclick=()=>openOneOffTaskModal(null,{date:key,start:suggestTimeForNewTask(date)});
  $('#restartBtn').onclick=openRestartModal;
  $('#modeBtn').onclick=openModeModal;
  if($('#wrapDayBtn')) $('#wrapDayBtn').onclick=()=>openEndOfDayCleanup(date);
  if($('#heroDoneBtn')&&next){$('#heroDoneBtn').onclick=()=>{const completed=next.item;setStatus(completed,key,'done');renderToday();toast('Marked done','Undo',()=>{setStatus(completed,key,'pending');renderToday();});requestAnimationFrame(()=>maybeCelebrateDayFinish(date));};}
  if($('#heroMoveBtn')&&next) $('#heroMoveBtn').onclick=()=>openMoveItemModal(next.item,date);
  if(preserveScroll) requestAnimationFrame(()=>window.scrollTo(0,scroll));
}

function timelineItemHTML(item,date,showActions=false) {
  const key=todayKey(date); const status=getStatus(item,key); const timeState=statusForTime(item,date);
  const isNext=timeState==='future' && !isClosedStatus(status);
  const nowClass=timeState==='now' && status==='pending'?'now':'';
  const nextClass=isNext?'next':'';
  const closedStatus=['missed','deferred','dropped'].includes(status);
  const locked=itemManualMoveLocked(item);
  const statusBadge=status==='missed'?'<span class="badge danger-badge">MISSED</span>':status==='deferred'?'<span class="badge blue">MOVED</span>':status==='dropped'?'<span class="badge muted-badge">DROPPED</span>':item.adjusted?'<span class="badge adjusted-badge">ADJUSTED</span>':nowClass?'<span class="badge">NOW</span>':'';
  return `<div class="timeline-item ${nowClass} ${nextClass} ${status}" data-timeline-occ="${escapeAttr(occurrenceKey(item))}">
    <div class="timeline-time">${formatClock(item.start)}</div><span class="timeline-dot"></span>
    <div class="timeline-body">
      <div class="timeline-main">
        <input class="check" type="checkbox" data-occ="${escapeAttr(occurrenceKey(item))}" data-date="${key}" ${status==='done'?'checked':''} ${closedStatus?'disabled':''} aria-label="Mark ${escapeAttr(item.title)} done">
        <div class="timeline-copy"><b>${escapeHTML(item.title)}</b><small>${escapeHTML(item.detail||'')}</small>
          <div class="timeline-meta">${categoryBadge(item.category)}<span class="badge blue">${escapeHTML(timeWindow(item))}</span>${locked?'<span class="badge lock-badge">LOCKED</span>':''}${statusBadge}</div>
        </div>
      </div>
      ${showActions?`<div class="quick-actions"><button data-edit-item="${item.source}:${item.id}" type="button">Edit</button>${!locked && !isClosedStatus(status) && status!=='done'?`<button data-move-item="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Move</button>`:''}${status==='missed'?`<button data-restore-item="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Restore</button>`:''}${status==='deferred'?`<button data-undo-defer="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Undo move</button>`:''}${status==='dropped'?`<button data-restore-item="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Restore</button>`:''}</div>`:''}
    </div>
  </div>`;
}
function bindTimeline(date) {
  const key=todayKey(date);
  $$('[data-occ]').forEach(cb=>cb.addEventListener('change',()=>{
    const occ=cb.dataset.occ; const item=itemsForDate(date).find(x=>occurrenceKey(x)===occ);
    if(item) setStatus(item,key,cb.checked?'done':'pending');
    const y=window.scrollY;
    render();
    requestAnimationFrame(()=>{window.scrollTo(0,y); if(cb.checked) maybeCelebrateDayFinish(date);});
  }));
  $$('[data-edit-item]').forEach(btn=>btn.addEventListener('click',()=>{
    const [source,id]=btn.dataset.editItem.split(':');
    if(source==='schedule') openScheduleItemModal(id);
    else openOneOffTaskModal(id);
  }));
  $$('[data-move-item]').forEach(btn=>btn.addEventListener('click',()=>{
    const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.moveItem);
    if(item) openMoveItemModal(item,date);
  }));
  $$('[data-restore-item]').forEach(btn=>btn.addEventListener('click',()=>{
    const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.restoreItem);
    if(item){setStatus(item,key,'pending');render();}
  }));
  $$('[data-undo-defer]').forEach(btn=>btn.addEventListener('click',()=>{
    const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.undoDefer);
    if(item){restoreDeferredItem(item,key);render();toast('Move undone');}
  }));
}
function suggestTimeForNewTask(date) {
  if(todayKey(date)!==todayKey()) return '12:00';
  const d=new Date(); d.setMinutes(Math.ceil(d.getMinutes()/15)*15,0,0);
  if(d.getHours()>=23) return '20:00';
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

function moveWouldHitLocked(item,date,startTime){
  const key=todayKey(date), start=minutesFromTime(startTime), end=start+itemDurationForMove(item);
  return itemsForDate(date).some(other=>occurrenceKey(other)!==occurrenceKey(item) && itemManualMoveLocked(other) && start<minutesFromTime(other.end||other.start) && end>minutesFromTime(other.start));
}
function openMoveItemModal(item,date){
  const key=todayKey(date);
  if(itemManualMoveLocked(item)) return toast('This item is locked to its planned time');
  const others=itemsForDate(date).filter(x=>occurrenceKey(x)!==occurrenceKey(item) && !itemManualMoveLocked(x) && !isClosedStatus(getStatus(x,key))).sort((a,b)=>minutesFromTime(a.start)-minutesFromTime(b.start));
  const hasOverride=!!state.records[key]?.timeOverrides?.[occurrenceKey(item)];
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">MOVE TASK</p><h2>${escapeHTML(item.title)}</h2><p class="muted tiny">Flexible tasks can move. Classes, wake-up, morning reset and sleep stay locked.</p><div class="stack"><label><span class="label">Move to a different time</span><input class="input" id="moveTime" type="time" value="${escapeAttr(item.start)}"></label>${others.length?`<label><span class="label">Or swap times with</span><select id="swapTask"><option value="">No swap</option>${others.map(x=>`<option value="${escapeAttr(occurrenceKey(x))}">${escapeHTML(x.title)} · ${escapeHTML(formatClock(x.start))}</option>`).join('')}</select></label>`:''}</div><button class="primary full" id="saveMove" style="margin-top:14px">Save move</button><button class="secondary full" id="moveTomorrow" style="margin-top:8px">Move to tomorrow</button>${hasOverride?'<button class="secondary full" id="resetMove" style="margin-top:8px">Reset to planned time</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveMove').onclick=()=>{
    const swapOcc=$('#swapTask')?.value||'';
    if(swapOcc){
      const other=itemsForDate(date).find(x=>occurrenceKey(x)===swapOcc); if(!other)return toast('That task is no longer available');
      const aStart=item.start, bStart=other.start;
      if(moveWouldHitLocked(item,date,bStart)||moveWouldHitLocked(other,date,aStart)) return toast('That swap would overlap a locked item');
      setItemTimeOverride(item,key,bStart); setItemTimeOverride(other,key,aStart); save(); modal.close(); render(); toast('Tasks swapped'); return;
    }
    const time=$('#moveTime').value; if(!time)return toast('Choose a time');
    if(moveWouldHitLocked(item,date,time)) return toast('That time overlaps a locked item');
    setItemTimeOverride(item,key,time); modal.close(); render(); toast('Task moved');
  };
  $('#moveTomorrow').onclick=()=>{if(moveItemToTomorrow(item,key)){modal.close();render();toast('Moved to tomorrow');}};
  if($('#resetMove')) $('#resetMove').onclick=()=>{clearItemTimeOverride(item,key);modal.close();render();toast('Planned time restored');};
  $('#cancelModal').onclick=()=>modal.close();
}
function openEndOfDayCleanup(date=new Date()){
  const key=todayKey(date); const pending=itemsForMode(itemsForDate(date),modeForDate(key)).filter(i=>!itemManualMoveLocked(i) && !isClosedStatus(getStatus(i,key)));
  if(!pending.length)return toast('No flexible tasks need cleaning up');
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">END OF DAY</p><h2>Clean up unfinished tasks</h2><p class="muted">Choose what happens to each flexible item. Nothing locked is touched.</p><div class="cleanup-list">${pending.map((i,idx)=>`<div class="cleanup-row"><div><b>${escapeHTML(i.title)}</b><small>${escapeHTML(timeWindow(i))}</small></div><select data-cleanup="${escapeAttr(occurrenceKey(i))}"><option value="keep">Keep today</option><option value="tomorrow">Move to tomorrow</option><option value="drop">Drop for today</option></select></div>`).join('')}</div><button class="primary full" id="applyCleanup" style="margin-top:14px">Apply</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#applyCleanup').onclick=()=>{
    $$('[data-cleanup]',modalContent).forEach(sel=>{const choice=sel.value;if(choice==='keep')return;const current=itemsForDate(date).find(i=>occurrenceKey(i)===sel.dataset.cleanup);if(!current)return;if(choice==='tomorrow')moveItemToTomorrow(current,key);if(choice==='drop')setStatus(current,key,'dropped');});
    save();modal.close();renderToday();requestAnimationFrame(()=>maybeCelebrateDayFinish(date));toast('Day cleaned up');
  };
  $('#cancelModal').onclick=()=>modal.close();
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
        <button class="icon-button" id="prevWeekBtn" aria-label="Previous week">${svgIcon('chevronLeft')}</button>
        <h3>${formatDateShort(weekStart)} – ${formatDateShort(weekEnd)}</h3>
        <button class="icon-button" id="nextWeekBtn" aria-label="Next week">${svgIcon('chevronRight')}</button>
      </div>
      <div class="week-jump"><button class="secondary small-btn" id="todayWeekBtn">Today</button></div>
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
  $('#todayWeekBtn').onclick=()=>{state.settings.selectedWeekDate=todayKey();save();renderWeek();};
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
  const freeAfterPlan=Number(state.money.income||0)-totalTarget;
  const daysPay=daysUntilPayday();
  const latest=[...state.money.transactions].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,10);
  main.innerHTML=`
    <section class="card hero">
      <span class="badge blue">MONTHLY PLAN</span>
      <div class="money-hero-value ${freeAfterPlan<0?'danger-text':''}">${fmtMoney(freeAfterPlan)}</div>
      <p class="muted" style="margin-bottom:12px">${freeAfterPlan>=0?'Free after every monthly allocation. This is the flexible amount you have not assigned anywhere else.':'Your allocations are higher than your monthly income. Reduce one or more buckets.'}</p>
      <div class="row wrap"><span class="badge">${daysPay===0?'PAYDAY TODAY':`${daysPay} day${daysPay===1?'':'s'} to payday`}</span><span class="badge blue">Cash snapshot ${fmtMoney(state.money.currentCash)}</span></div>
    </section>
    <section class="grid-3">
      <div class="stat"><small>Income</small><strong>${fmtMoney(state.money.income)}</strong></div>
      <div class="stat"><small>Allocated</small><strong>${fmtMoney(totalTarget)}</strong></div>
      <div class="stat"><small>Logged spent</small><strong>${fmtMoney(totalSpent)}</strong></div>
    </section>

    <div class="section-title"><h2>Allocations</h2><button id="editMoneyBtn">Edit</button></div>
    <section class="card flat">${state.money.buckets.map(b=>budgetRowHTML(b,mk)).join('')}</section>
    <button class="primary full" id="addExpenseBtn">+ Log spending</button>

    <div class="section-title"><h2>Recent spending</h2><span class="muted tiny">${fmtMoney(totalSpent)} this month</span></div>
    <section class="card flat">${latest.length?latest.map(transactionHTML).join(''):'<div class="empty-state">No spending logged yet. Start with food, fuel and other variable costs.</div>'}</section>

    <section class="card restart"><h3>Money rule</h3><p class="muted" style="margin-bottom:0">Allocate the important money first. Whatever remains after the plan is your flexible money, without needing another forecast.</p></section>`;
  $('#editMoneyBtn').onclick=openMoneyModal;
  $('#addExpenseBtn').onclick=()=>openExpenseModal();
  $$('[data-edit-tx]').forEach(b=>b.onclick=()=>openExpenseModal(b.dataset.editTx));
  $$('[data-del-tx]').forEach(b=>b.onclick=()=>{state.money.transactions=state.money.transactions.filter(t=>t.id!==b.dataset.delTx);save();renderMoney();toast('Spending entry deleted');});
}
function transactionsForMonth(mk){return state.money.transactions.filter(t=>String(t.date||'').startsWith(mk));}
function spentForBucket(bucketId,mk=monthKey()){return transactionsForMonth(mk).filter(t=>t.bucketId===bucketId).reduce((a,t)=>a+Number(t.amount||0),0);}
function budgetRowHTML(b,mk) {
  const spent=spentForBucket(b.id,mk); const target=Number(b.target||0); const pct=target?clamp(Math.round(spent/target*100),0,140):0; const over=spent>target && target>0;
  return `<div class="budget-row"><div class="budget-top"><div><b>${escapeHTML(b.name)}</b><small>${fmtMoney(spent)} spent · ${fmtMoney(Math.max(0,target-spent))} left</small></div><div class="budget-amount"><b>${fmtMoney(target)}</b><small>${target?Math.round(spent/target*100):0}%</small></div></div><div class="budget-track"><div class="budget-fill ${over?'over':''}" style="width:${Math.min(100,pct)}%"></div></div></div>`;
}
function transactionHTML(t) {
  const b=state.money.buckets.find(x=>x.id===t.bucketId);
  return `<div class="transaction"><div><b>${escapeHTML(t.note||b?.name||'Spending')}</b><small>${escapeHTML(b?.name||'Other')} · ${escapeHTML(formatDateShort(parseDateKey(t.date)))}</small></div><div class="transaction-amount"><b>−${fmtMoney(t.amount)}</b><div class="row"><button class="text-button tiny" data-edit-tx="${t.id}">Edit</button><button class="text-button tiny danger-text" data-del-tx="${t.id}">Delete</button></div></div></div>`;
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

function appStartDate(){
  const raw=String(state.meta?.createdAt||todayKey()).slice(0,10);
  try{return parseDateKey(raw);}catch(e){return new Date();}
}
function datesBetween(start,end=new Date(),maxDays=4000){
  const out=[]; let d=new Date(start); d.setHours(12,0,0,0); const e=new Date(end);e.setHours(12,0,0,0);
  for(let i=0;i<maxDays && d<=e;i++,d=addDays(d,1)) out.push(new Date(d));
  return out;
}
function dateRange(range='30'){
  const end=new Date();end.setHours(12,0,0,0);
  if(range==='all') return datesBetween(appStartDate(),end);
  const n=range==='7'?7:30; return datesBetween(addDays(end,-(n-1)),end,n+1);
}
function gymSessionDates(){
  const set=new Set((state.gym.sessions||[]).map(String));
  Object.keys(state.records).forEach(key=>{
    const d=parseDateKey(key);itemsForDate(d).filter(i=>i.category==='Fitness'&&/gym/i.test(i.title||'')).forEach(i=>{if(getStatus(i,key)==='done')set.add(key);});
  });
  (state.gym.logs||[]).forEach(l=>{if(l.date)set.add(l.date);});
  (state.gym.sessionExcluded||[]).forEach(k=>set.delete(String(k)));
  return set;
}
function mealDayIsComplete(date){
  const key=todayKey(date); const meals=itemsForDate(date).filter(i=>i.category==='Food');
  return meals.length>=3 && meals.every(i=>getStatus(i,key)==='done');
}
function pastClassOccurrences(dates){
  const now=new Date(); const nowKey=todayKey(now); const nowMin=currentMinutes(); const out=[];
  dates.forEach(date=>{const key=todayKey(date);itemsForDate(date,{ignoreOverrides:true}).filter(i=>i.isClass).forEach(i=>{
    const ended=key<nowKey || (key===nowKey && minutesFromTime(i.end||i.start)<nowMin);
    if(ended) out.push({date,key,item:i,done:getStatus(i,key)==='done'});
  });});
  return out;
}
function classDayStreak(){
  const dates=datesBetween(appStartDate(),new Date()).reverse(); let streakDays=0, started=false;
  for(const d of dates){
    const occ=pastClassOccurrences([d]); if(!occ.length)continue; started=true;
    if(occ.every(x=>x.done))streakDays++; else break;
  }
  return started?streakDays:0;
}
function metricsForDates(dates){
  // Never score days from before Reset existed. This prevents a new user from
  // inheriting fake missed classes / zero-completion days in 7- and 30-day stats.
  const started=appStartDate(); started.setHours(12,0,0,0);
  const eligible=dates.filter(d=>{const x=new Date(d);x.setHours(12,0,0,0);return x>=started && todayKey(x)<=todayKey();});
  const keys=new Set(eligible.map(todayKey)); const gymDates=gymSessionDates();
  const gym=[...gymDates].filter(k=>keys.has(k)).length;
  const mealDays=eligible.filter(mealDayIsComplete).length;
  const classes=pastClassOccurrences(eligible); const attended=classes.filter(x=>x.done).length;
  const goodDays=eligible.filter(d=>dayCompletion(d)>=70).length;
  const completionValues=eligible.map(dayCompletion);
  const avgCompletion=completionValues.length?Math.round(completionValues.reduce((a,b)=>a+b,0)/completionValues.length):0;
  return {dates:eligible,gym,mealDays,classes:classes.length,attended,goodDays,classPct:classes.length?Math.round(attended/classes.length*100):0,avgCompletion};
}
function rangeMetrics(range){return metricsForDates(dateRange(range));}
function currentWeekMetrics(){const start=startOfWeek(new Date());const end=new Date();end.setHours(12,0,0,0);return metricsForDates(datesBetween(start,end,8));}
function previousWeekMetrics(){const thisStart=startOfWeek(new Date());const start=addDays(thisStart,-7);const end=addDays(thisStart,-1);return metricsForDates(datesBetween(start,end,8));}
function previous30Metrics(){const end=addDays(new Date(),-30);end.setHours(12,0,0,0);return metricsForDates(datesBetween(addDays(end,-29),end,31));}
function signedDelta(current,previous,suffix=''){const d=current-previous;return `${d>0?'+':''}${d}${suffix}`;}
function totalProjectSessions(){return (state.projects||[]).reduce((a,p)=>a+Number(p.sessions||0),0);}
function achievementData(){
  const all=rangeMetrics('all'), gymAll=gymSessionDates().size, meals=all.mealDays, projects=totalProjectSessions(), resets=Object.values(state.records).reduce((a,r)=>a+Number(r.resetCount||0),0);
  const specs=[
    ['first_day','First proper day','Finish at least 70% of one day.',all.goodDays>=1,Math.min(1,all.goodDays),1],
    ['gym_1','Back in the gym','Complete your first gym session.',gymAll>=1,Math.min(1,gymAll),1],
    ['gym_10','Building momentum','Complete 10 gym sessions.',gymAll>=10,Math.min(10,gymAll),10],
    ['meals_7','Food rhythm','Hit all 3 meals on 7 different days.',meals>=7,Math.min(7,meals),7],
    ['class_5','Showed up','Complete 5 perfect class days in a row.',classDayStreak()>=5,Math.min(5,classDayStreak()),5],
    ['project_5','Builder','Log 5 focused project sessions.',projects>=5,Math.min(5,projects),5],
    ['restart_3','Recovered, not ruined','Use Adaptive Restart 3 times and keep going.',resets>=3,Math.min(3,resets),3]
  ];
  return specs.map(([id,title,desc,unlocked,progress,target])=>({id,title,desc,unlocked,progress,target}));
}
function lightweightInsights(){
  const m30=rangeMetrics('30'); const prevDates=datesBetween(addDays(new Date(),-59),addDays(new Date(),-30),31); const prevKeys=new Set(prevDates.map(todayKey));
  const prevGym=[...gymSessionDates()].filter(k=>prevKeys.has(k)).length;
  const out=[];
  if(m30.classes) out.push(`You attended ${m30.attended}/${m30.classes} tracked classes in the last 30 days (${m30.classPct}%).`);
  if(m30.gym||prevGym) out.push(`Gym: ${m30.gym} sessions in the last 30 days${m30.gym===prevGym?' — the same as the previous 30 days':m30.gym>prevGym?` — ${m30.gym-prevGym} more than the previous 30 days`:` — ${prevGym-m30.gym} fewer than the previous 30 days`}.`);
  if(m30.mealDays) out.push(`You completed the 3-meal target on ${m30.mealDays} of the last 30 days.`);
  const tracked=Object.keys(state.records).filter(k=>state.records[k]?.itemStatus&&Object.keys(state.records[k].itemStatus).length).length;
  if(tracked>=7){
    const byDay=Array.from({length:7},()=>[]);Object.keys(state.records).forEach(k=>{const d=parseDateKey(k);byDay[d.getDay()].push(dayCompletion(d));});
    const avgs=byDay.map(a=>a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length):-1); const best=Math.max(...avgs);
    if(best>=0)out.push(`${DAY_LONG[avgs.indexOf(best)]} has been your strongest tracked day so far at about ${best}% completion.`);
  }
  if(!out.length) out.push('Keep using Reset for a few days and useful patterns will appear here automatically.');
  return out.slice(0,3);
}
function renderMore() {
  const view=state.settings.moreView||'home';
  if(view==='gym') return renderGym();
  if(view==='health') return renderHealth();
  if(view==='car') return renderCar();
  if(view==='projects') return renderProjects();
  if(view.startsWith('project:')) return renderProjectDetail(view.slice(8));
  if(view==='plan') return renderPlan();
  setHeader('More');
  const range=state.settings.statsRange||'30'; const metrics=rangeMetrics(range); const ach=achievementData(); const unlocked=ach.filter(a=>a.unlocked).length;
  const wk=currentWeekMetrics(), pw=previousWeekMetrics(), m30=rangeMetrics('30'), p30=previous30Metrics();
  main.innerHTML=`
    <section class="card hero"><span class="badge">PROGRESS</span><h2 style="margin-top:14px">Keep the useful things visible.</h2><p class="muted" style="margin-bottom:0">Track the habits that actually matter without turning life into a spreadsheet.</p></section>
    <div class="segmented" role="group" aria-label="Statistics range"><button data-range="7" class="${range==='7'?'active':''}">7 days</button><button data-range="30" class="${range==='30'?'active':''}">30 days</button><button data-range="all" class="${range==='all'?'active':''}">All time</button></div>
    <section class="metric-grid">
      <div class="metric-card"><small>Gym</small><strong>${metrics.gym}</strong><span>session${metrics.gym===1?'':'s'}</span></div>
      <div class="metric-card"><small>3 meals</small><strong>${metrics.mealDays}</strong><span>day${metrics.mealDays===1?'':'s'}</span></div>
      <div class="metric-card"><small>Classes</small><strong>${metrics.classes?metrics.classPct+'%':'—'}</strong><span>${metrics.attended}/${metrics.classes} attended</span></div>
      <div class="metric-card"><small>Good days</small><strong>${metrics.goodDays}</strong><span>70%+ complete</span></div>
    </section>
    <section class="grid-3"><div class="stat"><small>Daily streak</small><strong>${streak()}</strong></div><div class="stat"><small>Class-day streak</small><strong>${classDayStreak()}</strong></div><div class="stat"><small>Achievements</small><strong>${unlocked}/${ach.length}</strong></div></section>

    <div class="section-title"><h2>This week</h2><span class="muted tiny">vs last week</span></div>
    <section class="card flat weekly-summary-card">
      <div class="summary-row"><span>Gym sessions</span><b>${wk.gym}</b><small>${signedDelta(wk.gym,pw.gym)}</small></div>
      <div class="summary-row"><span>3-meal days</span><b>${wk.mealDays}</b><small>${signedDelta(wk.mealDays,pw.mealDays)}</small></div>
      <div class="summary-row"><span>Class attendance</span><b>${wk.classes?wk.classPct+'%':'—'}</b><small>${pw.classes?signedDelta(wk.classPct,pw.classPct,'%'):'—'}</small></div>
      <div class="summary-row"><span>Average completion</span><b>${wk.avgCompletion}%</b><small>${signedDelta(wk.avgCompletion,pw.avgCompletion,'%')}</small></div>
    </section>

    <div class="section-title"><h2>Last 30 days</h2><span class="muted tiny">vs previous 30</span></div>
    <section class="comparison-grid">
      <div class="comparison-card"><small>Gym</small><b>${m30.gym}</b><span>${signedDelta(m30.gym,p30.gym)}</span></div>
      <div class="comparison-card"><small>Meals</small><b>${m30.mealDays}</b><span>${signedDelta(m30.mealDays,p30.mealDays)}</span></div>
      <div class="comparison-card"><small>Classes</small><b>${m30.classes?m30.classPct+'%':'—'}</b><span>${p30.classes?signedDelta(m30.classPct,p30.classPct,'%'):'—'}</span></div>
      <div class="comparison-card"><small>Good days</small><b>${m30.goodDays}</b><span>${signedDelta(m30.goodDays,p30.goodDays)}</span></div>
    </section>

    <div class="section-title"><h2>Achievements</h2></div>
    <section class="achievement-grid">${ach.map(a=>`<article class="achievement ${a.unlocked?'unlocked':''}"><span>${a.unlocked?'✓':'○'}</span><div><b>${escapeHTML(a.title)}</b><small>${escapeHTML(a.desc)}</small><div class="achievement-progress"><i style="width:${Math.round(a.progress/a.target*100)}%"></i></div><em>${a.progress}/${a.target}</em></div></article>`).join('')}</section>

    <div class="section-title"><h2>Insights</h2></div>
    <section class="card flat">${lightweightInsights().map(x=>`<div class="insight-row"><span>↗</span><p>${escapeHTML(x)}</p></div>`).join('')}</section>

    <div class="section-title"><h2>Life tools</h2></div>
    <section class="card flat tool-list">
      ${toolLink('gym','Gym','Weights, PRs, exercise progress and workout history.')}
      ${toolLink('health','Health','Simple body-weight progress without calorie tracking.')}
      ${toolLink('car','Car','Fuel, maintenance history, service and registration.')}
      ${toolLink('projects','Projects',`${state.projects.length} project${state.projects.length===1?'':'s'} · keep the next step clear.`)}
      ${toolLink('plan','Reset plan','Your simple rules and weekly review.')}
    </section>

    <div class="section-title"><h2>Weekly reset</h2></div>
    <section class="card flat"><p class="muted tiny">Review the week, then choose one focus for the next one.</p><button class="secondary full" id="weeklyReviewBtn">Do weekly review</button></section>`;
  $$('[data-range]').forEach(b=>b.onclick=()=>{state.settings.statsRange=b.dataset.range;save();renderMore();});
  $$('[data-more-view]').forEach(b=>b.onclick=()=>{state.settings.moreView=b.dataset.moreView;save();renderMore();window.scrollTo({top:0,behavior:'auto'});});
  $('#weeklyReviewBtn').onclick=()=>openWeeklyReviewModal();
}
function toolLink(view,title,desc){return `<button class="tool-link" data-more-view="${escapeAttr(view)}"><span><b>${escapeHTML(title)}</b><small>${escapeHTML(desc)}</small></span><span class="tool-chevron">${svgIcon('chevronRight')}</span></button>`;}
function moreBack(label='More'){return `<button class="back-link" id="moreBackBtn">${svgIcon('chevronLeft')}<span>${escapeHTML(label)}</span></button>`;}
function bindMoreBack(){const b=$('#moreBackBtn');if(b)b.onclick=()=>{state.settings.moreView='home';save();renderMore();window.scrollTo({top:0,behavior:'auto'});};}
function morePlanRow(title,text){return `<div class="more-link"><span><b>${escapeHTML(title)}</b><small>${escapeHTML(text)}</small></span></div>`;}

function itemIsFixed(item) { return item.fixed===true || item.isClass===true; }
function itemManualMoveLocked(item) { return itemIsFixed(item) || item.manualLocked===true || ['wake','groom','breakfast','phone','sleep'].includes(item.id); }
function isClosedStatus(status){ return ['done','missed','deferred','dropped'].includes(status); }
function itemDurationForMove(item){ return Math.max(5,durationMinutes(item)); }
function setItemTimeOverride(item,key,startTime){
  const rec=ensureRecord(key); const occ=occurrenceKey(item); const dur=itemDurationForMove(item); const start=minutesFromTime(startTime);
  const existing=rec.timeOverrides[occ]||{};
  rec.timeOverrides[occ]={...existing,start:minutesToTime(start),end:minutesToTime(start+dur)};
  save();
}
function clearItemTimeOverride(item,key){const rec=ensureRecord(key);delete rec.timeOverrides[occurrenceKey(item)];save();}
function moveItemToTomorrow(item,key){
  const tomorrow=todayKey(addDays(parseDateKey(key),1));
  if(item.source==='oneoff'){
    const original=state.oneOffTasks.find(x=>x.id===item.id); if(!original)return false;
    original.date=tomorrow; const rec=ensureRecord(key); delete rec.itemStatus[occurrenceKey(item)]; delete rec.timeOverrides[occurrenceKey(item)];
  } else {
    state.oneOffTasks.push({id:uid('one'),title:item.title,date:tomorrow,start:item.start,end:item.end||'',category:item.category||'Life',detail:item.detail||'',movedFrom:{date:key,occurrence:occurrenceKey(item)}});
    setStatus(item,key,'deferred');
  }
  save(); return true;
}
function restoreDeferredItem(item,key){
  state.oneOffTasks=state.oneOffTasks.filter(t=>!(t.movedFrom?.date===key && t.movedFrom?.occurrence===occurrenceKey(item)));
  setStatus(item,key,'pending');
  save();
}
function findOpenSlot(desired,duration,blocked,limit) {
  let start=Math.max(0,desired);
  const sorted=[...blocked].sort((a,b)=>a.start-b.start);
  for(let guard=0;guard<100;guard++) {
    let collision=sorted.find(x=>start < x.end && start+duration > x.start);
    if(!collision) return start+duration<=limit ? start : null;
    start=collision.end;
  }
  return null;
}
function buildAdaptiveRestartPlan(date=new Date()) {
  const key=todayKey(date); const baseItems=itemsForMode(itemsForDate(date,{ignoreOverrides:true}),currentMode());
  const rec=ensureRecord(key); const now=roundUpMinutes(currentMinutes(),5);
  const sleepLimit=Math.max(now+30, minutesFromTime(state.profile.sleepTarget||'23:30'));
  const pending=baseItems.filter(i=>!isClosedStatus(getStatus(i,key)));
  const fixed=pending.filter(itemIsFixed);
  const movable=pending.filter(i=>!itemIsFixed(i));
  const missedFixed=fixed.filter(i=>minutesFromTime(i.end||i.start)<now);
  const futureFixed=fixed.filter(i=>minutesFromTime(i.end||i.start)>=now).map(i=>({start:minutesFromTime(i.start),end:minutesFromTime(i.end||i.start)+(!i.end?30:0),item:i}));
  const blocked=[...futureFixed];
  const overrides={};
  const moved=[];
  let lastMealEnd=null;

  const ordered=[...movable].sort((a,b)=>{
    const aOver=minutesFromTime(a.end||a.start)<now, bOver=minutesFromTime(b.end||b.start)<now;
    const aRank=aOver&&a.essential?0:aOver?1:2;
    const bRank=bOver&&b.essential?0:bOver?1:2;
    return aRank-bRank || minutesFromTime(a.start)-minutesFromTime(b.start);
  });

  for(const item of ordered) {
    const status=getStatus(item,key);
    if(status==='done') continue;
    const originalStart=minutesFromTime(item.start);
    const overdue=minutesFromTime(item.end||item.start)<now;
    const normalDuration=durationMinutes(item);
    const duration=overdue ? Math.max(5,Math.min(normalDuration,Number(item.minMinutes||normalDuration))) : normalDuration;
    let desired=overdue ? now : Math.max(now,originalStart);
    if(item.category==='Food' && lastMealEnd!==null) desired=Math.max(desired,lastMealEnd+150);
    const slot=findOpenSlot(desired,duration,blocked,sleepLimit);
    if(slot===null) continue;
    const newStart=slot, newEnd=slot+duration;
    blocked.push({start:newStart,end:newEnd,item});
    if(item.category==='Food') lastMealEnd=newEnd;
    if(newStart!==originalStart || duration!==normalDuration || overdue) {
      const ov={start:minutesToTime(newStart),end:minutesToTime(newEnd)};
      if(item.id==='breakfast' && overdue) { ov.title='First meal + protein'; ov.detail='Eat now. Do not let waking late turn into not eating.'; }
      if(item.id==='wake' && overdue) ov.title='Get up + curtains open';
      overrides[occurrenceKey(item)]=ov;
      moved.push({...item,...ov});
    }
  }
  return {key,now,overrides,moved,missedFixed};
}
function applyAdaptiveRestart(plan) {
  const rec=ensureRecord(plan.key);
  rec.timeOverrides=plan.overrides;
  for(const item of plan.missedFixed) {
    if(getStatus(item,plan.key)!=='done') rec.itemStatus[occurrenceKey(item)]='missed';
  }
  // A new restart should not leave old "missed" marks on flexible items or future fixed items.
  Object.keys(rec.itemStatus).forEach(k=>{
    if(rec.itemStatus[k]!=='missed') return;
    const item=itemsForDate(parseDateKey(plan.key),{ignoreOverrides:true}).find(x=>occurrenceKey(x)===k);
    if(item && (!itemIsFixed(item) || minutesFromTime(item.end||item.start)>=plan.now)) delete rec.itemStatus[k];
  });
  rec.resetCount=(rec.resetCount||0)+1;
  rec.restartAt=new Date().toISOString();
  save();
}
function openRestartModal() {
  const plan=buildAdaptiveRestartPlan(new Date());
  const moveCount=plan.moved.length, missCount=plan.missedFixed.length;
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">ADAPTIVE RESTART</p><h2>Rebuild the rest of today.</h2><p class="muted">Nothing important gets deleted. ${moveCount?`${moveCount} flexible item${moveCount===1?'':'s'} will move to realistic times.`:'Your flexible tasks already fit from here.'} Fixed university classes and sleep times stay fixed.${missCount?` ${missCount} fixed event${missCount===1?' is':'s are'} already past and will stay visible as missed.`:''}</p><div class="card flat restart-preview"><b>Priority order</b><small>Get up / curtains → shower / grooming → first meal → fixed classes → remaining useful tasks.</small></div><button class="primary full" id="confirmRestart" style="margin-top:12px">Rebuild today</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#confirmRestart').onclick=()=>{applyAdaptiveRestart(plan);modal.close();toast('Today rebuilt around the current time');renderToday();};
  $('#cancelModal').onclick=()=>modal.close();
}
function openScheduleManager() {
  const sorted=[...state.schedule].sort((a,b)=>minutesFromTime(a.start)-minutesFromTime(b.start));
  modalContent.innerHTML=`<div class="sheet-handle"></div><div class="row between center"><div><p class="eyebrow">WEEKLY ROUTINE</p><h2>Recurring schedule</h2></div><button class="icon-button" id="closeModal" aria-label="Close">${svgIcon('close')}</button></div><p class="muted tiny">Your university timetable is preloaded. Fixed items stay in place during an adaptive restart. You can still edit or add recurring items.</p><div class="stack" style="margin-top:14px">${sorted.map(s=>`<button class="more-link" data-routine-edit="${s.id}"><span><b>${escapeHTML(s.title)}</b><small>${escapeHTML(s.days.map(d=>DAY_SHORT[d]).join(', '))} · ${escapeHTML(timeWindow(s))}</small></span><span class="tool-chevron">${svgIcon('chevronRight')}</span></button>`).join('')}</div><button class="primary full" id="addRoutineInside" style="margin-top:14px">+ Add recurring item</button>`;
  modal.showModal();
  $('#closeModal').onclick=()=>modal.close();
  $('#addRoutineInside').onclick=()=>openScheduleItemModal();
  $$('[data-routine-edit]').forEach(b=>b.onclick=()=>openScheduleItemModal(b.dataset.routineEdit));
}

function openScheduleItemModal(id=null,preset={}) {
  const existing=id?state.schedule.find(x=>x.id===id):null;
  const item=existing || {title:'',days:preset.days||[1,2,3,4,5],start:preset.start||'09:00',end:preset.end||'10:00',category:preset.category||'Life',detail:'',active:true,fixed:false,startDate:'',endDate:''};
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">RECURRING ITEM</p><h2>${existing?'Edit weekly item':'Add weekly item'}</h2><div class="stack">
    <label><span class="label">Title</span><input class="input" id="schedTitle" value="${escapeAttr(item.title)}" placeholder="e.g. Reservoir Engineering lecture"></label>
    <div class="form-grid"><label><span class="label">Start</span><input class="input" id="schedStart" type="time" value="${item.start}"></label><label><span class="label">End</span><input class="input" id="schedEnd" type="time" value="${item.end||item.start}"></label></div>
    <label><span class="label">Category</span><select id="schedCategory">${CATEGORIES.map(c=>`<option ${c===item.category?'selected':''}>${c}</option>`).join('')}</select></label>
    <label class="switch-row"><input type="checkbox" id="schedFixed" ${item.fixed?'checked':''}><span><b>Fixed time</b><small>Use for classes or appointments. Adaptive restart will never move it.</small></span></label>
    <div class="form-grid"><label><span class="label">Starts on (optional)</span><input class="input" id="schedStartDate" type="date" value="${item.startDate||''}"></label><label><span class="label">Ends on (optional)</span><input class="input" id="schedEndDate" type="date" value="${item.endDate||''}"></label></div>
    <div><span class="label">Repeat on</span><div class="day-picker">${DAY_PICK.map((d,i)=>`<label class="day-toggle"><input type="checkbox" data-repeat-day="${i}" ${item.days.includes(i)?'checked':''}><span>${d}</span></label>`).join('')}</div></div>
    <label><span class="label">Note</span><textarea id="schedDetail" placeholder="What exactly should you do?">${escapeHTML(item.detail||'')}</textarea></label>
  </div><button class="primary full" id="saveSchedule" style="margin-top:14px">Save recurring item</button>${existing?'<button class="danger-btn full" id="deleteSchedule" style="margin-top:8px">Delete recurring item</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveSchedule').onclick=()=>{
    const title=$('#schedTitle').value.trim(); const days=$$('[data-repeat-day]').filter(x=>x.checked).map(x=>Number(x.dataset.repeatDay));
    if(!title)return toast('Add a title'); if(!days.length)return toast('Choose at least one day');
    const startTime=$('#schedStart').value||'09:00', endTime=$('#schedEnd').value||'10:00', startDate=$('#schedStartDate').value||'', endDate=$('#schedEndDate').value||'';
    if(minutesFromTime(endTime)<=minutesFromTime(startTime))return toast('End time must be after start time');
    if(startDate&&endDate&&endDate<startDate)return toast('End date must be after start date');
    const data={title,days,start:startTime,end:endTime,category:$('#schedCategory').value,detail:$('#schedDetail').value.trim(),active:true,fixed:$('#schedFixed').checked,startDate,endDate};
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
  $('#saveOneTask').onclick=()=>{const title=$('#oneTitle').value.trim();if(!title)return toast('Add a task name');const startTime=$('#oneStart').value||'12:00', endTime=$('#oneEnd').value||'';if(endTime&&minutesFromTime(endTime)<=minutesFromTime(startTime))return toast('End time must be after start time');const data={title,date:$('#oneDate').value||todayKey(),start:startTime,end:endTime,category:$('#oneCategory').value,detail:$('#oneDetail').value.trim()};if(existing)Object.assign(existing,data);else state.oneOffTasks.push({id:uid('one'),...data});save();modal.close();toast('Task scheduled');render();};
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

function openExpenseModal(id=null) {
  const existing=id?state.money.transactions.find(t=>t.id===id):null;
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SPENDING</p><h2>${existing?'Edit':'Log'} an expense</h2><div class="stack"><label><span class="label">Amount (SAR)</span><input class="input" id="expenseAmount" type="number" min="0" step="1" placeholder="0" value="${existing?Number(existing.amount):''}"></label><label><span class="label">Allocation</span><select id="expenseBucket">${state.money.buckets.map(b=>`<option value="${b.id}" ${existing?.bucketId===b.id?'selected':''}>${escapeHTML(b.name)}</option>`).join('')}</select></label><label><span class="label">Date</span><input class="input" id="expenseDate" type="date" value="${existing?.date||todayKey()}"></label><label><span class="label">Note</span><input class="input" id="expenseNote" value="${escapeAttr(existing?.note||'')}" placeholder="e.g. takeaway, fuel, haircut"></label></div><button class="primary full" id="saveExpense" style="margin-top:14px">Save spending</button>${existing?'<button class="danger-btn full" id="deleteExpense" style="margin-top:8px">Delete entry</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveExpense').onclick=()=>{const amount=Number($('#expenseAmount').value||0);if(amount<=0)return toast('Enter an amount');const data={amount,bucketId:$('#expenseBucket').value,date:$('#expenseDate').value||todayKey(),note:$('#expenseNote').value.trim()};if(existing)Object.assign(existing,data);else state.money.transactions.push({id:uid('tx'),...data});save();modal.close();toast(existing?'Spending updated':'Spending logged');renderMoney();};
  if(existing)$('#deleteExpense').onclick=()=>{state.money.transactions=state.money.transactions.filter(t=>t.id!==existing.id);save();modal.close();renderMoney();toast('Spending entry deleted');};
  $('#cancelModal').onclick=()=>modal.close();
}


function weightChartHTML(logs){
  if(logs.length<2)return `<div class="chart-empty">Log your weight at least twice to see the trend.</div>`;
  const pts=logs.slice(-16),vals=pts.map(x=>Number(x.weight||0)),min=Math.min(...vals),max=Math.max(...vals),span=Math.max(.5,max-min),w=320,h=130,pad=18;
  const coords=pts.map((x,i)=>({x:pad+(w-pad*2)*(i/Math.max(1,pts.length-1)),y:h-pad-(h-pad*2)*((Number(x.weight)-min)/span),v:Number(x.weight),date:x.date}));
  const path=coords.map((pt,i)=>`${i?'L':'M'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`).join(' ');
  return `<div class="gym-chart-wrap"><svg class="gym-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Body weight progress chart"><path class="chart-line" d="${path}"/>${coords.map(pt=>`<circle cx="${pt.x}" cy="${pt.y}" r="4"><title>${pt.v} kg · ${escapeHTML(pt.date)}</title></circle>`).join('')}<text x="${pad}" y="14">${max.toFixed(1)} kg</text><text x="${pad}" y="${h-3}">${min.toFixed(1)} kg</text></svg></div>`;
}
function renderHealth(){
  setHeader('Health');
  const logs=[...(state.health.weightLogs||[])].sort((a,b)=>String(a.date).localeCompare(String(b.date))||Number(a.createdAt||0)-Number(b.createdAt||0));
  const first=logs[0],last=logs[logs.length-1],change=first&&last?Number(last.weight)-Number(first.weight):0;
  main.innerHTML=`${moreBack()}<section class="card hero"><span class="badge blue">HEALTH</span><h2 style="margin-top:14px">Keep body tracking simple.</h2><p class="muted" style="margin-bottom:0">Only body weight lives here. Gym performance stays in Gym, and food stays intentionally simple.</p></section>
    <section class="metric-grid"><div class="metric-card"><small>Current</small><strong>${last?Number(last.weight).toFixed(1):'—'}</strong><span>${last?'kg':'no entry'}</span></div><div class="metric-card"><small>First logged</small><strong>${first?Number(first.weight).toFixed(1):'—'}</strong><span>${first?'kg':'no entry'}</span></div><div class="metric-card"><small>Change</small><strong>${logs.length>1?`${change>0?'+':''}${change.toFixed(1)}`:'—'}</strong><span>${logs.length>1?'kg since first':'need 2 entries'}</span></div><div class="metric-card"><small>Entries</small><strong>${logs.length}</strong><span>all time</span></div></section>
    <section class="card flat">${weightChartHTML(logs)}</section>
    <button class="primary full" id="addWeightBtn">+ Log body weight</button>
    <div class="section-title"><h2>Recent weight</h2></div><section class="card flat">${logs.length?logs.slice().reverse().slice(0,12).map(l=>`<div class="gym-log"><div><b>${Number(l.weight).toFixed(1)} kg</b><small>${escapeHTML(formatDateShort(parseDateKey(l.date)))}</small></div><div class="row"><button class="text-button tiny" data-edit-weight="${l.id}">Edit</button><button class="text-button tiny danger-text" data-del-weight="${l.id}">Delete</button></div></div>`).join(''):'<div class="empty-state">No weight entries yet.</div>'}</section>`;
  bindMoreBack();
  $('#addWeightBtn').onclick=()=>openWeightModal();
  $$('[data-edit-weight]').forEach(b=>b.onclick=()=>openWeightModal(b.dataset.editWeight));
  $$('[data-del-weight]').forEach(b=>b.onclick=()=>{state.health.weightLogs=state.health.weightLogs.filter(x=>x.id!==b.dataset.delWeight);save();renderHealth();toast('Weight entry deleted');});
}
function openWeightModal(id=null){
  const existing=id?(state.health.weightLogs||[]).find(x=>x.id===id):null;
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">BODY WEIGHT</p><h2>${existing?'Edit':'Log'} weight</h2><div class="stack"><label><span class="label">Weight (kg)</span><input class="input" id="bodyWeight" type="number" min="20" max="300" step="0.1" inputmode="decimal" value="${existing?Number(existing.weight):''}"></label><label><span class="label">Date</span><input class="input" id="bodyWeightDate" type="date" value="${existing?.date||todayKey()}"></label></div><button class="primary full" id="saveBodyWeight" style="margin-top:14px">Save</button>${existing?'<button class="danger-btn full" id="deleteBodyWeight" style="margin-top:8px">Delete entry</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveBodyWeight').onclick=()=>{const weight=Number($('#bodyWeight').value);if(!(weight>=20&&weight<=300))return toast('Enter a valid weight');const data={weight,date:$('#bodyWeightDate').value||todayKey(),createdAt:existing?.createdAt||Date.now()};if(existing)Object.assign(existing,data);else state.health.weightLogs.push({id:uid('weight'),...data});save();modal.close();renderHealth();toast(existing?'Weight updated':'Weight logged');};
  if(existing)$('#deleteBodyWeight').onclick=()=>{state.health.weightLogs=state.health.weightLogs.filter(x=>x.id!==existing.id);save();modal.close();renderHealth();toast('Weight entry deleted');};
  $('#cancelModal').onclick=()=>modal.close();
}


function exercisePR(exerciseId,excludeId=null){const logs=(state.gym.logs||[]).filter(l=>l.exerciseId===exerciseId && l.id!==excludeId);return logs.length?Math.max(...logs.map(l=>Number(l.weight||0))):0;}
function renderGym(){
  setHeader('Gym'); const sessions=gymSessionDates(); const exercise=state.gym.exercises.find(x=>x.id===state.settings.selectedExerciseId)||state.gym.exercises[0];
  if(exercise)state.settings.selectedExerciseId=exercise.id;
  const logs=(state.gym.logs||[]).filter(l=>l.exerciseId===exercise?.id).sort((a,b)=>String(a.date).localeCompare(String(b.date))||Number(a.createdAt||0)-Number(b.createdAt||0));
  const first=logs[0],last=logs[logs.length-1],change=first&&last?Number(last.weight)-Number(first.weight):0,pr=exercise?exercisePR(exercise.id):0;
  const last30=dateRange('30'); const keys30=new Set(last30.map(todayKey)); const sessions30=[...sessions].filter(k=>keys30.has(k)).length;
  const prRows=state.gym.exercises.map(ex=>({ex,pr:exercisePR(ex.id)})).filter(x=>x.pr>0).sort((a,b)=>b.pr-a.pr);
  const recentSessions=[...sessions].sort().reverse().slice(0,12);
  main.innerHTML=`${moreBack()}<section class="card hero"><span class="badge purple">GYM</span><h2 style="margin-top:14px">Track progress, not perfection.</h2><p class="muted" style="margin-bottom:0">Log the working weight you actually used. Reset keeps your PRs and long-term progress visible.</p></section>
    <section class="grid-3"><div class="stat"><small>Last 30 days</small><strong>${sessions30}</strong></div><div class="stat"><small>All sessions</small><strong>${sessions.size}</strong></div><div class="stat"><small>Exercises</small><strong>${state.gym.exercises.length}</strong></div></section>
    <div class="button-row"><button class="primary" id="logGymBtn">+ Log exercise</button><button class="secondary" id="logGymSessionBtn">${sessions.has(todayKey())?'Today logged':'Log workout day'}</button></div>
    <div class="section-title"><h2>Strength progress</h2><button id="addExerciseBtn">+ Exercise</button></div>
    <section class="card flat"><label><span class="label">Exercise</span><select id="gymExerciseSelect">${state.gym.exercises.map(x=>`<option value="${escapeAttr(x.id)}" ${x.id===exercise?.id?'selected':''}>${escapeHTML(x.name)} · ${escapeHTML(x.group||'')}</option>`).join('')}</select></label>
      ${exercise?`<div class="metric-grid compact-metrics"><div class="metric-card"><small>First</small><strong>${first?Number(first.weight):'—'}</strong><span>${first?'kg':'no log'}</span></div><div class="metric-card"><small>Current</small><strong>${last?Number(last.weight):'—'}</strong><span>${last?'kg':'no log'}</span></div><div class="metric-card pr-card"><small>Personal best</small><strong>${pr||'—'}</strong><span>${pr?'kg':'no PR yet'}</span></div><div class="metric-card"><small>Change</small><strong class="${change>0?'accent':''}">${logs.length>1?(change>0?'+':'')+change:'—'}</strong><span>${logs.length>1?'kg since first':'need 2 logs'}</span></div></div>${gymChartHTML(logs)}`:'<div class="empty-state">Add an exercise to start tracking.</div>'}
    </section>
    <div class="section-title"><h2>Personal bests</h2></div><section class="card flat">${prRows.length?prRows.map(({ex,pr})=>`<div class="pr-row"><div><b>${escapeHTML(ex.name)}</b><small>${escapeHTML(ex.group||'')}</small></div><strong>${Number(pr)} kg</strong></div>`).join(''):'<div class="empty-state">Your PRs will appear after you log exercises.</div>'}</section>
    <div class="section-title"><h2>Recent logs</h2></div><section class="card flat">${logs.length?logs.slice().reverse().slice(0,12).map(l=>`<div class="gym-log"><div><b>${Number(l.weight)} kg</b><small>${escapeHTML(formatDateShort(parseDateKey(l.date)))} · ${Number(l.sets||0)||'—'} sets × ${Number(l.reps||0)||'—'} reps</small></div><div class="row"><button class="text-button tiny" data-edit-gym="${l.id}">Edit</button><button class="text-button tiny danger-text" data-del-gym="${l.id}">Delete</button></div></div>`).join(''):'<div class="empty-state">No weight logs for this exercise yet.</div>'}</section>
    <div class="section-title"><h2>Workout days</h2></div><section class="card flat">${recentSessions.length?recentSessions.map(k=>`<div class="gym-log"><div><b>${escapeHTML(formatDateShort(parseDateKey(k)))}</b><small>Workout session</small></div><button class="text-button tiny danger-text" data-del-session="${k}">Remove</button></div>`).join(''):'<div class="empty-state">No workout days logged yet.</div>'}</section>`;
  bindMoreBack();
  $('#gymExerciseSelect')?.addEventListener('change',e=>{state.settings.selectedExerciseId=e.target.value;save();renderGym();});
  $('#logGymBtn').onclick=()=>openGymLogModal(); $('#addExerciseBtn').onclick=()=>openExerciseModal();
  $('#logGymSessionBtn').onclick=()=>{const k=todayKey();state.gym.sessionExcluded=state.gym.sessionExcluded.filter(x=>x!==k);if(!state.gym.sessions.includes(k)){state.gym.sessions.push(k);save();toast('Workout day logged');renderGym();}else toast('Today is already logged');};
  $$('[data-edit-gym]').forEach(b=>b.onclick=()=>openGymLogModal(b.dataset.editGym));
  $$('[data-del-gym]').forEach(b=>b.onclick=()=>{state.gym.logs=state.gym.logs.filter(l=>l.id!==b.dataset.delGym);save();renderGym();toast('Exercise log deleted');});
  $$('[data-del-session]').forEach(b=>b.onclick=()=>{const k=b.dataset.delSession;state.gym.sessions=state.gym.sessions.filter(x=>x!==k);if(!state.gym.sessionExcluded.includes(k))state.gym.sessionExcluded.push(k);save();renderGym();toast('Workout day removed');});
}
function gymChartHTML(logs){
  if(logs.length<2)return `<div class="chart-empty">Log this exercise at least twice to see a progress chart.</div>`;
  const pts=logs.slice(-12),vals=pts.map(x=>Number(x.weight||0)),min=Math.min(...vals),max=Math.max(...vals),span=Math.max(1,max-min),w=320,h=130,pad=18;
  const coords=pts.map((x,i)=>({x:pad+(w-pad*2)*(i/Math.max(1,pts.length-1)),y:h-pad-(h-pad*2)*((Number(x.weight)-min)/span),v:Number(x.weight),date:x.date}));
  const path=coords.map((p,i)=>`${i?'L':'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  return `<div class="gym-chart-wrap"><svg class="gym-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Weight progress chart"><path class="chart-line" d="${path}"/>${coords.map(p=>`<circle cx="${p.x}" cy="${p.y}" r="4"><title>${p.v} kg · ${escapeHTML(p.date)}</title></circle>`).join('')}<text x="${pad}" y="14">${max} kg</text><text x="${pad}" y="${h-3}">${min} kg</text></svg></div>`;
}
function openGymLogModal(id=null){
  const existing=id?(state.gym.logs||[]).find(x=>x.id===id):null;
  const ex=state.gym.exercises.find(x=>x.id===(existing?.exerciseId||state.settings.selectedExerciseId))||state.gym.exercises[0];
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">GYM LOG</p><h2>${existing?'Edit':'Log'} an exercise</h2><div class="stack"><label><span class="label">Exercise</span><select id="gymLogExercise">${state.gym.exercises.map(x=>`<option value="${x.id}" ${x.id===ex?.id?'selected':''}>${escapeHTML(x.name)}</option>`).join('')}</select></label><div class="form-grid"><label><span class="label">Weight (kg)</span><input class="input" id="gymWeight" type="number" min="0" step="0.5" inputmode="decimal" value="${existing?Number(existing.weight):''}"></label><label><span class="label">Date</span><input class="input" id="gymDate" type="date" value="${existing?.date||todayKey()}"></label></div><div class="form-grid"><label><span class="label">Sets</span><input class="input" id="gymSets" type="number" min="1" max="20" value="${existing?Number(existing.sets||3):3}"></label><label><span class="label">Reps</span><input class="input" id="gymReps" type="number" min="1" max="100" value="${existing?Number(existing.reps||10):10}"></label></div></div><button class="primary full" id="saveGymLog" style="margin-top:14px">Save log</button>${existing?'<button class="danger-btn full" id="deleteGymLog" style="margin-top:8px">Delete log</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveGymLog').onclick=()=>{const weight=Number($('#gymWeight').value);if(!(weight>0))return toast('Enter the weight you used');const exerciseId=$('#gymLogExercise').value,date=$('#gymDate').value||todayKey();const priorPR=exercisePR(exerciseId,existing?.id||null);const data={exerciseId,weight,sets:clamp(Number($('#gymSets').value||3),1,20),reps:clamp(Number($('#gymReps').value||10),1,100),date,createdAt:existing?.createdAt||Date.now()};if(existing)Object.assign(existing,data);else state.gym.logs.push({id:uid('gymlog'),...data});state.gym.sessionExcluded=state.gym.sessionExcluded.filter(k=>k!==date);state.settings.selectedExerciseId=exerciseId;save();modal.close();renderGym();toast(weight>priorPR?`New PR: ${weight} kg`:(existing?'Gym log updated':'Gym progress saved'));};
  if(existing)$('#deleteGymLog').onclick=()=>{state.gym.logs=state.gym.logs.filter(l=>l.id!==existing.id);save();modal.close();renderGym();toast('Exercise log deleted');};
  $('#cancelModal').onclick=()=>modal.close();
}
function openExerciseModal(){
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">GYM</p><h2>Add an exercise</h2><div class="stack"><label><span class="label">Exercise name</span><input class="input" id="exerciseName" placeholder="e.g. Incline dumbbell press"></label><label><span class="label">Muscle group</span><input class="input" id="exerciseGroup" placeholder="e.g. Chest"></label></div><button class="primary full" id="saveExercise" style="margin-top:14px">Add exercise</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();$('#saveExercise').onclick=()=>{const name=$('#exerciseName').value.trim();if(!name)return toast('Add an exercise name');const x={id:uid('exercise'),name,group:$('#exerciseGroup').value.trim()||'Other'};state.gym.exercises.push(x);state.settings.selectedExerciseId=x.id;save();modal.close();renderGym();};$('#cancelModal').onclick=()=>modal.close();
}
function daysUntilDate(key){if(!key)return null;const d=parseDateKey(key),t=parseDateKey(todayKey());return Math.round((d-t)/86400000);}
function renderCar(){
  setHeader('Car');const car=state.car;const rego=daysUntilDate(car.regoDue),service=daysUntilDate(car.serviceDueDate);const fuel=[...(car.fuelLogs||[])].sort((a,b)=>String(b.date).localeCompare(String(a.date))||Number(b.odometer||0)-Number(a.odometer||0));const maintenance=[...(car.maintenanceLogs||[])].sort((a,b)=>String(b.date).localeCompare(String(a.date))||Number(b.odometer||0)-Number(a.odometer||0));
  const maintenanceTotal=maintenance.reduce((a,x)=>a+Number(x.cost||0),0);
  main.innerHTML=`${moreBack()}<section class="card hero"><span class="badge blue">CAR</span><h2 style="margin-top:14px">${escapeHTML(car.model||'My car')}</h2><p class="muted" style="margin-bottom:0">Keep kilometres, fuel, service, registration and maintenance history in one place.</p></section>
  <section class="metric-grid"><div class="metric-card"><small>Odometer</small><strong>${Number(car.odometer||0).toLocaleString()}</strong><span>km</span></div><div class="metric-card"><small>Rego</small><strong>${rego===null?'—':rego<0?'Overdue':rego+'d'}</strong><span>${car.regoDue?escapeHTML(formatDateShort(parseDateKey(car.regoDue))):'not set'}</span></div><div class="metric-card"><small>Service date</small><strong>${service===null?'—':service<0?'Due':service+'d'}</strong><span>${car.serviceDueDate?escapeHTML(formatDateShort(parseDateKey(car.serviceDueDate))):'not set'}</span></div><div class="metric-card"><small>Maintenance</small><strong>${maintenance.length}</strong><span>${fmtMoney(maintenanceTotal)} logged</span></div></section>
  <div class="three-button-row"><button class="primary" id="logFuelBtn">+ Fuel</button><button class="secondary" id="logMaintenanceBtn">+ Maintenance</button><button class="secondary" id="editCarBtn">Edit car</button></div>
  <div class="section-title"><h2>Maintenance history</h2></div><section class="card flat">${maintenance.length?maintenance.slice(0,12).map(m=>`<div class="fuel-row"><div><b>${escapeHTML(m.service||'Maintenance')}</b><small>${escapeHTML(formatDateShort(parseDateKey(m.date)))} · ${Number(m.odometer||0).toLocaleString()} km${Number(m.cost||0)?` · ${fmtMoney(m.cost)}`:''}${m.note?` · ${escapeHTML(m.note)}`:''}</small></div><div class="row"><button class="text-button tiny" data-edit-maint="${m.id}">Edit</button><button class="text-button tiny danger-text" data-del-maint="${m.id}">Delete</button></div></div>`).join(''):'<div class="empty-state">No maintenance logged yet.</div>'}</section>
  <div class="section-title"><h2>Fuel history</h2></div><section class="card flat">${fuel.length?fuel.slice(0,12).map((f,i)=>{const older=fuel[i+1],km=older&&Number(f.odometer)>Number(older.odometer)?Number(f.odometer)-Number(older.odometer):null;return `<div class="fuel-row"><div><b>${Number(f.litres||0).toFixed(1)} L · ${fmtMoney(f.cost)}</b><small>${escapeHTML(formatDateShort(parseDateKey(f.date)))} · ${Number(f.odometer||0).toLocaleString()} km${km?` · ${km.toLocaleString()} km since prior fill`:''}</small></div><div class="row"><button class="text-button tiny" data-edit-fuel="${f.id}">Edit</button><button class="text-button tiny danger-text" data-del-fuel="${f.id}">Delete</button></div></div>`}).join(''):'<div class="empty-state">No fuel fills logged yet.</div>'}</section>`;
  bindMoreBack();$('#logFuelBtn').onclick=()=>openFuelModal();$('#logMaintenanceBtn').onclick=()=>openMaintenanceModal();$('#editCarBtn').onclick=openCarModal;
  $$('[data-edit-fuel]').forEach(b=>b.onclick=()=>openFuelModal(b.dataset.editFuel));
  $$('[data-del-fuel]').forEach(b=>b.onclick=()=>{state.car.fuelLogs=state.car.fuelLogs.filter(x=>x.id!==b.dataset.delFuel);save();renderCar();toast('Fuel entry deleted');});
  $$('[data-edit-maint]').forEach(b=>b.onclick=()=>openMaintenanceModal(b.dataset.editMaint));
  $$('[data-del-maint]').forEach(b=>b.onclick=()=>{state.car.maintenanceLogs=state.car.maintenanceLogs.filter(x=>x.id!==b.dataset.delMaint);save();renderCar();toast('Maintenance entry deleted');});
}
function openCarModal(){const c=state.car;modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">CAR</p><h2>Edit car details</h2><div class="stack"><label><span class="label">Car</span><input class="input" id="carModel" value="${escapeAttr(c.model||'')}"></label><label><span class="label">Current odometer (km)</span><input class="input" id="carOdo" type="number" min="0" value="${Number(c.odometer||0)}"></label><div class="form-grid"><label><span class="label">Rego due</span><input class="input" id="carRego" type="date" value="${c.regoDue||''}"></label><label><span class="label">Service due date</span><input class="input" id="carServiceDate" type="date" value="${c.serviceDueDate||''}"></label></div><label><span class="label">Service due odometer (km)</span><input class="input" id="carServiceKm" type="number" min="0" value="${Number(c.serviceDueKm||0)||''}"></label></div><button class="primary full" id="saveCar" style="margin-top:14px">Save car</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;modal.showModal();$('#saveCar').onclick=()=>{state.car.model=$('#carModel').value.trim()||'My car';state.car.odometer=Math.max(0,Number($('#carOdo').value||0));state.car.regoDue=$('#carRego').value||'';state.car.serviceDueDate=$('#carServiceDate').value||'';state.car.serviceDueKm=Math.max(0,Number($('#carServiceKm').value||0));save();modal.close();renderCar();};$('#cancelModal').onclick=()=>modal.close();}
function openFuelModal(id=null){const c=state.car;const existing=id?(c.fuelLogs||[]).find(x=>x.id===id):null;modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">CAR</p><h2>${existing?'Edit':'Log'} a fuel fill</h2><div class="stack"><div class="form-grid"><label><span class="label">Litres</span><input class="input" id="fuelLitres" type="number" min="0" step="0.1" value="${existing?Number(existing.litres):''}"></label><label><span class="label">Cost (SAR)</span><input class="input" id="fuelCost" type="number" min="0" step="1" value="${existing?Number(existing.cost||0):''}"></label></div><div class="form-grid"><label><span class="label">Odometer (km)</span><input class="input" id="fuelOdo" type="number" min="0" value="${existing?Number(existing.odometer||0):Number(c.odometer||0)}"></label><label><span class="label">Date</span><input class="input" id="fuelDate" type="date" value="${existing?.date||todayKey()}"></label></div></div><button class="primary full" id="saveFuel" style="margin-top:14px">Save fuel fill</button>${existing?'<button class="danger-btn full" id="deleteFuel" style="margin-top:8px">Delete entry</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;modal.showModal();$('#saveFuel').onclick=()=>{const litres=Number($('#fuelLitres').value||0),cost=Number($('#fuelCost').value||0),odometer=Number($('#fuelOdo').value||0);if(!(litres>0))return toast('Enter litres');if(odometer<0)return toast('Enter a valid odometer');const data={litres,cost:Math.max(0,cost),odometer,date:$('#fuelDate').value||todayKey()};if(existing)Object.assign(existing,data);else state.car.fuelLogs.push({id:uid('fuel'),...data});state.car.odometer=Math.max(Number(state.car.odometer||0),odometer);save();modal.close();renderCar();toast(existing?'Fuel entry updated':'Fuel fill saved');};if(existing)$('#deleteFuel').onclick=()=>{state.car.fuelLogs=state.car.fuelLogs.filter(x=>x.id!==existing.id);save();modal.close();renderCar();toast('Fuel entry deleted');};$('#cancelModal').onclick=()=>modal.close();}
function openMaintenanceModal(id=null){const c=state.car;const existing=id?(c.maintenanceLogs||[]).find(x=>x.id===id):null;modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">CAR MAINTENANCE</p><h2>${existing?'Edit':'Log'} maintenance</h2><div class="stack"><label><span class="label">What was done?</span><input class="input" id="maintService" value="${escapeAttr(existing?.service||'')}" placeholder="e.g. Engine oil + filter"></label><div class="form-grid"><label><span class="label">Date</span><input class="input" id="maintDate" type="date" value="${existing?.date||todayKey()}"></label><label><span class="label">Odometer (km)</span><input class="input" id="maintOdo" type="number" min="0" value="${existing?Number(existing.odometer||0):Number(c.odometer||0)}"></label></div><label><span class="label">Cost (SAR)</span><input class="input" id="maintCost" type="number" min="0" step="1" value="${existing?Number(existing.cost||0):''}"></label><label><span class="label">Short note (optional)</span><input class="input" id="maintNote" value="${escapeAttr(existing?.note||'')}" placeholder="fluid, parts, next check..."></label></div><button class="primary full" id="saveMaint" style="margin-top:14px">Save maintenance</button>${existing?'<button class="danger-btn full" id="deleteMaint" style="margin-top:8px">Delete entry</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;modal.showModal();$('#saveMaint').onclick=()=>{const service=$('#maintService').value.trim();if(!service)return toast('Add what was done');const odometer=Math.max(0,Number($('#maintOdo').value||0));const data={service,date:$('#maintDate').value||todayKey(),odometer,cost:Math.max(0,Number($('#maintCost').value||0)),note:$('#maintNote').value.trim()};if(existing)Object.assign(existing,data);else c.maintenanceLogs.push({id:uid('maint'),...data});c.odometer=Math.max(Number(c.odometer||0),odometer);save();modal.close();renderCar();toast(existing?'Maintenance updated':'Maintenance saved');};if(existing)$('#deleteMaint').onclick=()=>{c.maintenanceLogs=c.maintenanceLogs.filter(x=>x.id!==existing.id);save();modal.close();renderCar();toast('Maintenance entry deleted');};$('#cancelModal').onclick=()=>modal.close();}
function renderProjects(){setHeader('Projects');main.innerHTML=`${moreBack()}<section class="card hero"><span class="badge purple">PROJECTS</span><h2 style="margin-top:14px">Something meaningful outside university.</h2><p class="muted" style="margin-bottom:0">Keep each project simple: what it is, where it stands and the next useful step.</p></section><div class="section-title"><h2>Your projects</h2><button id="addProjectBtn">+ Project</button></div><section class="project-list">${state.projects.map(p=>`<button class="project-card" data-project="${p.id}"><div class="row between center"><div><span class="badge ${p.status==='Completed'?'':'purple'}">${escapeHTML(p.status)}</span><h3>${escapeHTML(p.name)}</h3></div><strong>${clamp(Number(p.progress||0),0,100)}%</strong></div><div class="weekbar"><span style="width:${clamp(Number(p.progress||0),0,100)}%"></span></div><p>${escapeHTML(p.nextTask||'Set the next task.')}</p></button>`).join('')}</section>`;bindMoreBack();$('#addProjectBtn').onclick=()=>openProjectModal();$$('[data-project]').forEach(b=>b.onclick=()=>{state.settings.moreView='project:'+b.dataset.project;save();renderMore();window.scrollTo({top:0,behavior:'auto'});});}
function renderProjectDetail(id){const p=state.projects.find(x=>x.id===id);if(!p){state.settings.moreView='projects';return renderProjects();}setHeader(p.name);main.innerHTML=`<button class="back-link" id="projectBackBtn">${svgIcon('chevronLeft')}<span>Projects</span></button><section class="card hero"><div class="row between center"><span class="badge purple">${escapeHTML(p.status)}</span><button class="secondary small-btn" id="editProjectBtn">Edit</button></div><h2 style="margin-top:14px">${escapeHTML(p.name)}</h2><p class="muted">${escapeHTML(p.description||'No description yet.')}</p><div class="project-progress"><div><b>${clamp(Number(p.progress||0),0,100)}%</b><span>progress</span></div><div class="weekbar"><span style="width:${clamp(Number(p.progress||0),0,100)}%"></span></div></div></section><div class="section-title"><h2>Next task</h2></div><section class="card flat"><h3>${escapeHTML(p.nextTask||'Choose the next useful step.')}</h3></section><div class="section-title"><h2>Plan</h2></div><section class="card flat"><p class="project-plan">${escapeHTML(p.plan||'No plan written yet. Keep it short.')}</p></section><section class="grid-3"><div class="stat"><small>Sessions</small><strong>${Number(p.sessions||0)}</strong></div><div class="stat"><small>Status</small><strong>${escapeHTML(p.status)}</strong></div><div class="stat"><small>Progress</small><strong>${clamp(Number(p.progress||0),0,100)}%</strong></div></section><button class="primary full" id="logProjectBtn">+ Log project session</button><div class="section-title"><h2>Recent activity</h2></div><section class="card flat">${(p.logs||[]).length?p.logs.slice().reverse().slice(0,12).map(l=>`<div class="project-log"><div><b>${escapeHTML(l.note||'Project session')}</b><small>${escapeHTML(formatDateShort(parseDateKey(l.date)))}</small></div><div class="row"><button class="text-button tiny" data-edit-project-log="${l.id}">Edit</button><button class="text-button tiny danger-text" data-del-project-log="${l.id}">Delete</button></div></div>`).join(''):'<div class="empty-state">No project sessions logged yet.</div>'}</section>`;$('#projectBackBtn').onclick=()=>{state.settings.moreView='projects';save();renderMore();};$('#editProjectBtn').onclick=()=>openProjectModal(p.id);$('#logProjectBtn').onclick=()=>openProjectSessionModal(p.id);$$('[data-edit-project-log]').forEach(b=>b.onclick=()=>openProjectSessionModal(p.id,b.dataset.editProjectLog));$$('[data-del-project-log]').forEach(b=>b.onclick=()=>{p.logs=p.logs.filter(x=>x.id!==b.dataset.delProjectLog);p.sessions=Math.max(0,Number(p.sessions||0)-1);save();renderProjectDetail(p.id);toast('Project session deleted');});}
function openProjectModal(id=null){const p=id?state.projects.find(x=>x.id===id):null;const x=p||{name:'',status:'Active',progress:0,description:'',nextTask:'',plan:''};modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">PROJECT</p><h2>${p?'Edit project':'New project'}</h2><div class="stack"><label><span class="label">Project name</span><input class="input" id="projectName" value="${escapeAttr(x.name)}"></label><label><span class="label">What is this project?</span><textarea id="projectDescription">${escapeHTML(x.description||'')}</textarea></label><label><span class="label">Next task</span><input class="input" id="projectNext" value="${escapeAttr(x.nextTask||'')}" placeholder="The next concrete thing to do"></label><label><span class="label">Plan / notes</span><textarea id="projectPlan">${escapeHTML(x.plan||'')}</textarea></label><div class="form-grid"><label><span class="label">Progress %</span><input class="input" id="projectProgress" type="number" min="0" max="100" value="${Number(x.progress||0)}"></label><label><span class="label">Status</span><select id="projectStatus"><option ${x.status==='Active'?'selected':''}>Active</option><option ${x.status==='Paused'?'selected':''}>Paused</option><option ${x.status==='Completed'?'selected':''}>Completed</option></select></label></div></div><button class="primary full" id="saveProject" style="margin-top:14px">Save project</button>${p?'<button class="danger-btn full" id="deleteProject" style="margin-top:8px">Delete project</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;modal.showModal();$('#saveProject').onclick=()=>{const name=$('#projectName').value.trim();if(!name)return toast('Add a project name');const data={name,status:$('#projectStatus').value,progress:clamp(Number($('#projectProgress').value||0),0,100),description:$('#projectDescription').value.trim(),nextTask:$('#projectNext').value.trim(),plan:$('#projectPlan').value.trim()};if(p)Object.assign(p,data);else state.projects.push({id:uid('project'),sessions:0,logs:[],...data});save();modal.close();if(p){state.settings.moreView='project:'+p.id;renderMore();}else renderProjects();};if(p)$('#deleteProject').onclick=()=>{if(state.projects.length<=1)return toast('Keep at least one project');state.projects=state.projects.filter(x=>x.id!==p.id);state.settings.moreView='projects';save();modal.close();renderMore();};$('#cancelModal').onclick=()=>modal.close();}
function openProjectSessionModal(id,logId=null){const p=state.projects.find(x=>x.id===id);if(!p)return;const existing=logId?(p.logs||[]).find(x=>x.id===logId):null;modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">PROJECT SESSION</p><h2>${escapeHTML(p.name)}</h2><div class="stack"><label><span class="label">What did you move forward?</span><textarea id="projectSessionNote" placeholder="A short note is enough.">${escapeHTML(existing?.note||'')}</textarea></label><label><span class="label">Date</span><input class="input" id="projectSessionDate" type="date" value="${existing?.date||todayKey()}"></label></div><button class="primary full" id="saveProjectSession" style="margin-top:14px">Save session</button>${existing?'<button class="danger-btn full" id="deleteProjectSession" style="margin-top:8px">Delete session</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;modal.showModal();$('#saveProjectSession').onclick=()=>{const data={date:$('#projectSessionDate').value||todayKey(),note:$('#projectSessionNote').value.trim()||'Focused project session'};if(existing)Object.assign(existing,data);else{p.sessions=Number(p.sessions||0)+1;if(!Array.isArray(p.logs))p.logs=[];p.logs.push({id:uid('projectlog'),...data});}save();modal.close();renderProjectDetail(p.id);toast(existing?'Project session updated':'Project session logged');};if(existing)$('#deleteProjectSession').onclick=()=>{p.logs=p.logs.filter(x=>x.id!==existing.id);p.sessions=Math.max(0,Number(p.sessions||0)-1);save();modal.close();renderProjectDetail(p.id);toast('Project session deleted');};$('#cancelModal').onclick=()=>modal.close();}
function renderPlan(){setHeader('Reset plan');main.innerHTML=`${moreBack()}<section class="card hero"><span class="badge">RESET PLAN</span><h2 style="margin-top:14px">Simple enough to live with.</h2><p class="muted" style="margin-bottom:0">The plan stays here. The Today screen is where you actually live it.</p></section><section class="card flat">${morePlanRow('Sleep','8:00 AM wake, 11:30 PM sleep. Get out of bed immediately.')}${morePlanRow('Screen control','No TikTok during the reset. No porn/gooning in bed or after waking. Phone away at 11 PM.')}${morePlanRow('University','Attend current classes first. Urgent assessments second. Backlog third. Attempt work before AI.')}${morePlanRow('Body','Gym M/W/F, walk daily, mobility on other days, 3 meals and 90–110 g protein.')}${morePlanRow('Money','Allocate salary before spending. Whatever remains after the plan is flexible money.')}${morePlanRow('Environment','Weekly bathroom + bedsheets. Curtains open after waking. Groom at home.')}${morePlanRow('Life outside uni','Keep at least one personal project moving.')}</section><div class="section-title"><h2>Weekly review</h2></div><section class="card flat"><button class="secondary full" id="weeklyReviewBtn">Do weekly review</button></section><div class="section-title"><h2>Recent reviews</h2></div><section class="card flat">${state.weeklyReviews.length?state.weeklyReviews.slice().reverse().slice(0,8).map(r=>`<div class="project-log"><div><b>${escapeHTML(r.date)}</b><small>Next focus: ${escapeHTML(r.focus||'—')}</small></div><div class="row center"><span class="badge">${r.rating}/10</span><button class="text-button tiny" data-edit-review="${r.id}">Edit</button><button class="text-button tiny danger-text" data-del-review="${r.id}">Delete</button></div></div>`).join(''):'<div class="empty-state">No weekly review yet.</div>'}</section>`;bindMoreBack();$('#weeklyReviewBtn').onclick=()=>openWeeklyReviewModal();$$('[data-edit-review]').forEach(b=>b.onclick=()=>openWeeklyReviewModal(b.dataset.editReview));$$('[data-del-review]').forEach(b=>b.onclick=()=>{state.weeklyReviews=state.weeklyReviews.filter(r=>r.id!==b.dataset.delReview);save();renderPlan();toast('Weekly review deleted');});}
function openModeModal(){const cur=currentMode();const modes=[['normal','Normal','Full routine and normal weekly plan.'],['bad','Bad day','Today only: keep essentials, classes, meals, outside and sleep. It resets tomorrow.'],['exam','Exam','Temporarily park projects and nonessential life admin. Keep uni, sleep, food and training.'],['holiday','Holiday','Pause university items without deleting the timetable. Keep life, gym, projects and sleep.']];modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">DAY MODE</p><h2>How should Reset treat your schedule?</h2><div class="mode-list">${modes.map(([id,name,desc])=>`<button class="mode-option ${id===cur?'active':''}" data-mode="${id}"><span><b>${name}</b><small>${desc}</small></span><strong>${id===cur?'✓':''}</strong></button>`).join('')}</div><button class="secondary full" id="cancelModal" style="margin-top:10px">Cancel</button>`;modal.showModal();$$('[data-mode]').forEach(b=>b.onclick=()=>{state.settings.mode=b.dataset.mode;state.settings.modeSetDate=todayKey();ensureRecord(todayKey()).mode=b.dataset.mode;save();modal.close();renderToday();toast(`${modeName()} mode active`);});$('#cancelModal').onclick=()=>modal.close();}

function openWeeklyReviewModal(id=null) {
  const existing=id?state.weeklyReviews.find(r=>r.id===id):null;
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SUNDAY RESET</p><h2>${existing?'Edit':'Weekly'} review</h2><div class="stack"><label><span class="label">How was the week? (1–10)</span><input class="input" id="reviewRating" type="number" min="1" max="10" value="${existing?.rating||7}"></label><label><span class="label">What went well?</span><textarea id="reviewWins" placeholder="Small wins count.">${escapeHTML(existing?.wins||'')}</textarea></label><label><span class="label">What kept slipping?</span><textarea id="reviewIssues" placeholder="Sleep, scrolling, class, food...">${escapeHTML(existing?.issues||'')}</textarea></label><label><span class="label">One focus for next week</span><input class="input" id="reviewFocus" value="${escapeAttr(existing?.focus||'')}" placeholder="e.g. Attend every class"></label></div><button class="primary full" id="saveReview" style="margin-top:14px">Save weekly review</button>${existing?'<button class="danger-btn full" id="deleteReview" style="margin-top:8px">Delete review</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveReview').onclick=()=>{const data={rating:clamp(Number($('#reviewRating').value||7),1,10),wins:$('#reviewWins').value.trim(),issues:$('#reviewIssues').value.trim(),focus:$('#reviewFocus').value.trim()};if(existing)Object.assign(existing,data);else state.weeklyReviews.push({id:uid('review'),date:new Date().toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}),dateKey:todayKey(),...data});save();modal.close();toast(existing?'Weekly review updated':'Weekly review saved');if(state.settings.moreView==='plan')renderPlan();else renderMore();};
  if(existing)$('#deleteReview').onclick=()=>{state.weeklyReviews=state.weeklyReviews.filter(r=>r.id!==existing.id);save();modal.close();if(state.settings.moreView==='plan')renderPlan();else renderMore();toast('Weekly review deleted');};
  $('#cancelModal').onclick=()=>modal.close();
}

$$('.tab').forEach(btn=>btn.addEventListener('click',()=>{state.settings.activeTab=btn.dataset.tab;if(btn.dataset.tab==='more')state.settings.moreView='home';save();render();window.scrollTo({top:0,behavior:'auto'});}));

const settingsDialog=$('#settingsDialog');
$('#settingsBtn').onclick=()=>{const v=$('#versionLabel');if(v)v.textContent='v'+APP_DISPLAY_VERSION;requestPersistentStorage().then(updateStorageProtectionLabel);settingsDialog.showModal();};
$('#exportBtn').onclick=()=>{
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`reset-backup-${todayKey()}.json`;a.click();URL.revokeObjectURL(url);toast('Backup exported');
};
$('#importInput').addEventListener('change',async e=>{const f=e.target.files?.[0];if(!f)return;try{const data=JSON.parse(await f.text());if(!data.money||!data.records)throw new Error('Invalid');state=migrateState(data);save();settingsDialog.close();toast('Backup imported');render();}catch(err){toast('That backup file is not valid');}e.target.value='';});
$('#installHelpBtn').onclick=()=>{settingsDialog.close();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">IPHONE</p><h2>Add Reset to your Home Screen</h2><ol class="muted" style="padding-left:20px;line-height:1.8"><li>Open the app link in <b>Safari</b>.</li><li>Tap <b>Share</b>.</li><li>Choose <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b>.</li></ol><p class="muted tiny">When an update is uploaded to GitHub Pages, fully close and reopen the app. If an old version remains, refresh the Safari page once.</p><button class="primary full" id="cancelModal">Got it</button>`;modal.showModal();$('#cancelModal').onclick=()=>modal.close();};
$('#storageProtectionBtn').onclick=async()=>{const r=await requestPersistentStorage();updateStorageProtectionLabel(r);toast(r.persisted?'Local data protection enabled':'iPhone is using best-effort local storage');};
$('#eraseBtn').onclick=async()=>{if(confirm('Erase all Reset app data on this device?')){try{localStorage.removeItem(APP_KEY);}catch(e){}await durableClear();state=defaultState();settingsDialog.close();save();render();toast('App reset');}};
modal.addEventListener('click',e=>{if(e.target===modal)modal.close();});
settingsDialog.addEventListener('click',e=>{if(e.target===settingsDialog)settingsDialog.close();});

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));}
setInterval(()=>{if(state.settings.activeTab==='today')renderToday(true);},60000);
initializeApp();
