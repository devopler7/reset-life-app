const APP_KEY = 'reset-life-dashboard-v1';
const APP_VERSION = 19;
const APP_DISPLAY_VERSION = '3.6.5';
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const uid = (p='id') => `${p}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`;
const clamp = (n,min,max) => Math.max(min,Math.min(max,n));
function currentLocale(){return 'en-AU';}
function fmtNumber(n,opts={}){return Number(n||0).toLocaleString('en-AU',opts);}
function fmtMoney(n){return `${Number(n||0).toLocaleString('en-AU',{maximumFractionDigits:0})} SAR`;}
const DAY_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const DAY_LONG = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAY_PICK = ['Su','M','Tu','W','Th','F','Sa'];
function dayShort(i){return DAY_SHORT[i];}
function dayLong(i){return DAY_LONG[i];}
const CATEGORIES = ['Routine','University','Fitness','Food','Life','Project','Sleep','Other'];
const GYM_GROUPS = ['Chest','Back','Shoulders','Rear Delts','Biceps','Triceps','Quads','Hamstrings','Glutes','Calves','Core','Traps','Forearms','Legs','Arms','Other'];
const ICON_PATHS = {
  chevronLeft:'<path d="M15 18l-6-6 6-6"/>',
  chevronRight:'<path d="M9 6l6 6-6 6"/>',
  close:'<path d="M6 6l12 12M18 6L6 18"/>',
  check:'<path d="M5 12.5l4.2 4.2L19 7"/>',
  more:'<circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/>',
  dumbbell:'<path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10"/>',
  heart:'<path d="M20.8 5.9c-2.1-2.1-5.4-1.9-7.3.3L12 7.9l-1.5-1.7C8.6 4 5.3 3.8 3.2 5.9c-2.3 2.3-2.3 6 0 8.3L12 22l8.8-7.8c2.3-2.3 2.3-6 0-8.3z"/>',
  car:'<path d="M4 15l1.5-5h13L20 15M5 15h14v4H5zM7 19v2M17 19v2M7.5 15h.01M16.5 15h.01M7 10l1.4-4h7.2l1.4 4"/>',
  folder:'<path d="M3.5 7.5h6l2 2h9v9.5h-17zM3.5 7.5V5h6l2 2"/>',
  chart:'<path d="M5 19V11M10 19V6M15 19v-9M20 19V4"/>',
  wallet:'<path d="M4 7h14a3 3 0 0 1 3 3v8H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h13M16 12h5v4h-5a2 2 0 0 1 0-4z"/>',
  calendar:'<rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M8 3.5V7M16 3.5V7M3.5 9h17"/>',
  university:'<path d="M3 10l9-5 9 5-9 5-9-5zM6 13v4c3 2 9 2 12 0v-4M21 10v6"/>',
  money:'<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v5c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 11v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/>',
  lightbulb:'<path d="M9 18h6M10 21h4M8.5 14.5c-1.5-1-2.5-2.8-2.5-4.8a6 6 0 1 1 12 0c0 2-1 3.8-2.5 4.8-.7.5-1.1 1.3-1.2 2.1h-4.6c-.1-.8-.5-1.6-1.2-2.1z"/>',
  bell:'<path d="M18 9a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  trophy:'<path d="M8 4h8v4c0 4-2 6-4 6s-4-2-4-6V4zM8 6H4v2c0 2 1.2 3 3.5 3M16 6h4v2c0 2-1.2 3-3.5 3M12 14v4M8.5 21h7M9 18h6"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1z"/>',
  arrowUpRight:'<path d="M7 17L17 7M9 7h8v8"/>',
  fork:'<path d="M7 3v7M4 3v5c0 2 1 3 3 3s3-1 3-3V3M7 11v10M15 3v18M15 3c4 2 4 7 0 9"/>',
  spark:'<path d="M12 3l1.2 4.3L17.5 9l-4.3 1.7L12 15l-1.2-4.3L6.5 9l4.3-1.7L12 3zM19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15z"/>',
  moon:'<path d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.6 8.6 0 1 0 11.2 11.2z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  bed:'<path d="M4 11V6M4 16v-5h16v5M4 14h16M6 11V8h5a3 3 0 0 1 3 3M3 18v-2h18v2M5 18v2M19 18v2"/>',
  shower:'<path d="M7 8a5 5 0 0 1 10 0M17 8h-5M12 8l-2 2M12 12h.01M16 12h.01M10 16h.01M14 16h.01M18 16h.01M12 20h.01M16 20h.01"/>',
  warning:'<path d="M12 3l9 17H3L12 3zM12 9v5M12 17h.01"/>',
  list:'<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
  refresh:'<path d="M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.6 6.6L4 9M5.8 15A7 7 0 0 0 17.4 17.4L20 15"/>',
  plane:'<path d="M21 16l-8-3v6l2 2-1 1-3-2-3 2-1-1 2-2v-6l-8 3v-2l8-5V4a2 2 0 0 1 4 0v5l8 5z"/>',
  target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M15 9l5-5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  utensils:'<path d="M7 3v8M4 3v5c0 2 1 3 3 3s3-1 3-3V3M7 11v10M16 3v18M16 3c4 2 4 7 0 10"/>',
  walk:'<circle cx="13" cy="4" r="2"/><path d="M11 8l3 2 2 4M11 8l-2 5-3 3M9 13l3 3-2 5M14 10l-1 5 4 5"/>',
  briefcase:'<rect x="3" y="7" width="18" height="12" rx="2"/><path d="M9 7V5h6v2M3 12h18"/>'
};
function svgIcon(name, cls='ui-icon') { return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[name]||''}</svg>`; }
function ui(s){return String(s??'');}
function localizeTree(){}
function applyLanguageState(){document.documentElement.lang='en';document.documentElement.dir='ltr';}
function ensureLanguageObserver(){}

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
  return d.toLocaleTimeString(currentLocale(), {hour:'numeric',minute:'2-digit'});
}
function formatDateShort(date) {
  return date.toLocaleDateString(currentLocale(),{month:'short',day:'numeric'});
}
function localDateTimeInput(date=new Date()) {
  const y=date.getFullYear(), m=String(date.getMonth()+1).padStart(2,'0'), d=String(date.getDate()).padStart(2,'0');
  const h=String(date.getHours()).padStart(2,'0'), min=String(date.getMinutes()).padStart(2,'0');
  return `${y}-${m}-${d}T${h}:${min}`;
}
function actualSleepClock(value) {
  if(!value || !value.includes('T')) return '';
  return formatClock(value.slice(11,16));
}
function sleepItemForKey(key) {
  return itemsForDate(parseDateKey(key)).find(i=>i.id==='sleep') || null;
}
function previousUnloggedSleep() {
  const yesterday=addDays(new Date(),-1);
  const key=todayKey(yesterday);
  if(parseDateKey(key)<appStartDate()) return null;
  const item=sleepItemForKey(key);
  if(!item) return null;
  const rec=state.records[key];
  if(rec?.actualSleepAt || getStatus(item,key)==='done') return null;
  return {key,date:yesterday,item};
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
    {id:'wake', title:'Wake up + curtains open', days:[0,1,2,3,4,5,6], start:'08:00', end:'08:10', category:'Routine', detail:'Get out of bed immediately. No scrolling or gooning in bed.', active:true, essential:true, fixed:true, manualLocked:true, anchor:'wake', minMinutes:5},
    {id:'groom', title:'Shower + grooming', days:[0,1,2,3,4,5,6], start:'08:10', end:'08:30', category:'Routine', detail:'Teeth, deodorant, hair/beard and clean clothes.', active:true, essential:true, minMinutes:15},
    {id:'breakfast', title:'Breakfast', days:[0,1,2,3,4,5,6], start:'08:30', end:'09:00', category:'Food', detail:'Eat early and include protein.', active:true, essential:true, minMinutes:20},

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
    {id:'phone', title:'Phone away', days:[0,1,2,3,4,5,6], start:'23:00', end:'23:05', category:'Sleep', detail:'Charge it away from the bed. No late scroll spiral.', active:true},
    {id:'sleep', title:'Sleep', days:[0,1,2,3,4,5,6], start:'23:30', end:'23:40', category:'Sleep', detail:'Protect tomorrow before it starts.', active:true, fixed:true, manualLocked:true, anchor:'sleep'}
  ];
}
function defaultGymExercises() {
  return [
    {id:'chest_press',name:'Chest Press',group:'Chest',targets:['Chest','Triceps','Shoulders']},
    {id:'lat_pulldown',name:'Lat Pulldown',group:'Back',targets:['Back','Biceps','Forearms']},
    {id:'seated_row',name:'Seated Row',group:'Back',targets:['Back','Rear Delts','Biceps','Traps','Forearms']},
    {id:'shoulder_press',name:'Shoulder Press',group:'Shoulders',targets:['Shoulders','Triceps']},
    {id:'leg_press',name:'Leg Press',group:'Quads',targets:['Quads','Glutes']},
    {id:'leg_curl',name:'Leg Curl',group:'Hamstrings',targets:['Hamstrings']},
    {id:'biceps_curl',name:'Biceps Curl',group:'Biceps',targets:['Biceps','Forearms']},
    {id:'triceps_pushdown',name:'Triceps Pushdown',group:'Triceps',targets:['Triceps']},
    {id:'standing_calf_raise',name:'Standing Calf Raise',group:'Calves',targets:['Calves']},
    {id:'ab_crunch_machine',name:'Ab Crunch Machine',group:'Core',targets:['Core']},
    {id:'glute_kickback',name:'Glute Kickback',group:'Glutes',targets:['Glutes']},
    {id:'rear_delt_fly',name:'Rear Delt Fly',group:'Rear Delts',targets:['Rear Delts','Shoulders','Traps']},
    {id:'hanging_knee_raise',name:'Hanging Knee Raise',group:'Core',targets:['Core']}
  ];
}
function defaultWorkoutPresets(){
  return {
    'Full Body':['leg_press','leg_curl','chest_press','lat_pulldown','shoulder_press','rear_delt_fly','biceps_curl','triceps_pushdown','standing_calf_raise','ab_crunch_machine'],
    'Upper Body':['chest_press','lat_pulldown','seated_row','shoulder_press','rear_delt_fly','biceps_curl','triceps_pushdown'],
    'Lower Body':['leg_press','leg_curl','glute_kickback','standing_calf_raise'],
    'Custom':[]
  };
}

function defaultState() {
  return {
    version: APP_VERSION,
    meta: {createdAt:new Date().toISOString()},
    profile: {wakeTarget:'08:00', sleepTarget:'23:30', sleepDurationTarget:8, paydayDay:29},
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
      transactions:[],
      planHistory:{},
      bucketPlanHistory:{},
    },
    projects:[{
      id:'project_life_reset', name:'Life Reset App', status:'Active', archived:false, progress:0,
      description:'Build and use a personal dashboard that helps keep the rest of life on track.',
      nextTask:'Use the app consistently and improve only what is genuinely useful.',
      plan:'Keep it simple, reliable and useful on iPhone.', sessions:0, logs:[]
    }],
    gym:{exercises:defaultGymExercises(),logs:[],sessions:[],sessionExcluded:[],weeklyGoal:3,activeWorkout:null,workoutPresets:defaultWorkoutPresets(),workoutHistory:[],logDrafts:{}},
    health:{weightLogs:[]},
    car:{model:'2007 Honda Accord V6 Luxury',odometer:180000,regoDue:'',serviceDueDate:'',serviceDueKm:0,fuelLogs:[],maintenanceLogs:[]},
    weeklyReviews:[],
    settings:{activeTab:'today', selectedWeekDate:todayKey(), statsRange:'30', moreView:'home', mode:'normal', modeSetDate:todayKey(), selectedExerciseId:'chest_press', gymView:'workouts', gymGroupFilter:'All', gymHistoryExercise:'all', gymHistoryExpanded:false, sleepHistoryExpanded:false, moneyHistoryMonth:monthKey(), moneyHistoryBucket:'all', moneyView:'home'}
  };
}

function migrateLegacyState(parsed) {
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
  // Wake/sleep are permanent day anchors. Morning tasks and phone remain flexible.
  next.schedule=next.schedule.map(item=>{
    if(item.id==='wake') return {...item,fixed:true,manualLocked:true,anchor:'wake',essential:true};
    if(item.id==='sleep') return {...item,title:'Sleep',fixed:true,manualLocked:true,anchor:'sleep'};
    if(['groom','breakfast'].includes(item.id)){const x={...item,fixed:false,manualLocked:false};delete x.anchor;return x;}
    if(item.id==='phone'){const x={...item,fixed:false,manualLocked:false};delete x.anchor;return x;}
    return item;
  });
  next.oneOffTasks = Array.isArray(parsed.oneOffTasks) ? parsed.oneOffTasks : [];
  next.records = parsed.records || {};
  Object.values(next.records).forEach(r=>{ if(r&&typeof r==='object'){ if(!Array.isArray(r.unscheduledItems))r.unscheduledItems=[]; if(!Array.isArray(r.schedulerAttention))r.schedulerAttention=[]; } });
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
    transactions: Array.isArray(oldMoney.transactions) ? oldMoney.transactions : [],
    planHistory: oldMoney.planHistory && typeof oldMoney.planHistory==='object' ? {...oldMoney.planHistory} : {},
    bucketPlanHistory: oldMoney.bucketPlanHistory && typeof oldMoney.bucketPlanHistory==='object' ? {...oldMoney.bucketPlanHistory} : {},
  };
  delete next.money.fx;
  const migratedPlanTotal=next.money.buckets.reduce((a,b)=>a+Number(b.target||0),0);
  if(next.money.planHistory[monthKey()]==null) next.money.planHistory[monthKey()]=migratedPlanTotal;
  if(!next.money.transactions.length) {
    oldBuckets.filter(b=>Number(b.spent)>0).forEach(b=>next.money.transactions.push({
      id:uid('tx'), date:todayKey(), amount:Number(b.spent), bucketId:b.id, note:'Imported from previous version'
    }));
  }

  if(Array.isArray(parsed.projects)) {
    next.projects=parsed.projects.map(pr=>({id:pr.id||uid('project'),name:pr.name||'Project',status:pr.status||'Active',archived:!!pr.archived,progress:clamp(Number(pr.progress||0),0,100),description:pr.description||'',nextTask:pr.nextTask||'',plan:pr.plan||'',sessions:Number(pr.sessions||0),logs:Array.isArray(pr.logs)?pr.logs:[]}));
  } else if(parsed.project) {
    next.projects=[{id:'project_life_reset',name:parsed.project.name||'Life Reset App',status:'Active',archived:false,progress:0,description:parsed.project.note||'',nextTask:'Choose the next useful step.',plan:'',sessions:Number(parsed.project.sessions||0),logs:[]}];
  } else next.projects=base.projects;
  if(!next.projects.length) next.projects=base.projects;
  if(next.settings.moreView==='plan') next.settings.moreView='home';
  if(!next.settings.moneyHistoryMonth) next.settings.moneyHistoryMonth=monthKey();
  if(!next.settings.moneyHistoryBucket) next.settings.moneyHistoryBucket='all';
  delete next.settings.language;
  if(!['home','history'].includes(next.settings.moneyView)) next.settings.moneyView='home';
  if(!['workouts','progress','history'].includes(next.settings.gymView)) next.settings.gymView='workouts';

  const oldGym=parsed.gym||{};
  const defaultGymById=new Map(base.gym.exercises.map(x=>[x.id,x]));
  let migratedExercises=Array.isArray(oldGym.exercises)&&oldGym.exercises.length?oldGym.exercises.map(ex=>{
    const meta=defaultGymById.get(ex.id)||{};
    if(defaultGymById.has(ex.id))return {...ex,name:ex.name||meta.name,group:meta.group,targets:[...(meta.targets||[meta.group||'Other'])]};
    return {...ex,targets:Array.isArray(ex.targets)&&ex.targets.length?ex.targets:[ex.group||'Other']};
  }):base.gym.exercises.map(x=>({...x}));
  if(Number(parsed.version||0)<11){
    const existingIds=new Set(migratedExercises.map(x=>x.id));
    ['standing_calf_raise','ab_crunch_machine','glute_kickback','rear_delt_fly','hanging_knee_raise'].forEach(id=>{const ex=defaultGymById.get(id);if(ex&&!existingIds.has(id))migratedExercises.push({...ex});});
  }
  const presetDefaults=defaultWorkoutPresets();
  const savedPresets=oldGym.workoutPresets&&typeof oldGym.workoutPresets==='object'?oldGym.workoutPresets:{};
  const validExerciseIds=new Set(migratedExercises.map(x=>x.id));
  const workoutPresets={};
  Object.keys(presetDefaults).forEach(name=>{
    const candidate=Number(parsed.version||0)<12?presetDefaults[name]:(Array.isArray(savedPresets[name])?savedPresets[name]:presetDefaults[name]);
    workoutPresets[name]=candidate.filter(id=>validExerciseIds.has(id));
  });
  next.gym={
    exercises:migratedExercises,
    logs:Array.isArray(oldGym.logs)?oldGym.logs:[],
    sessions:Array.isArray(oldGym.sessions)?[...new Set(oldGym.sessions)]:[],
    sessionExcluded:Array.isArray(oldGym.sessionExcluded)?[...new Set(oldGym.sessionExcluded)]:[],
    weeklyGoal:clamp(Number(oldGym.weeklyGoal||base.gym.weeklyGoal||3),1,7),
    activeWorkout:oldGym.activeWorkout&&typeof oldGym.activeWorkout==='object'?{...oldGym.activeWorkout,id:oldGym.activeWorkout.id||uid('workout'),exerciseIds:Array.isArray(oldGym.activeWorkout.exerciseIds)?oldGym.activeWorkout.exerciseIds:[],completedExerciseIds:Array.isArray(oldGym.activeWorkout.completedExerciseIds)?oldGym.activeWorkout.completedExerciseIds:[]}:null,
    workoutPresets
  };
  if(Number(parsed.version||0)<12){next.settings.gymHistoryExercise='all';next.settings.gymHistoryExpanded=false;}
  if(!['All',...GYM_GROUPS].includes(next.settings.gymGroupFilter))next.settings.gymGroupFilter='All';
  if(!next.settings.gymHistoryExercise)next.settings.gymHistoryExercise='all';
  next.health={...base.health,...(parsed.health||{})};
  next.health.weightLogs=Array.isArray(parsed.health?.weightLogs)?parsed.health.weightLogs:[];
  next.car={...base.car,...(parsed.car||{})};
  next.car.fuelLogs=Array.isArray(parsed.car?.fuelLogs)?parsed.car.fuelLogs:[];
  next.car.maintenanceLogs=Array.isArray(parsed.car?.maintenanceLogs)?parsed.car.maintenanceLogs:[];

  Object.entries(next.records).forEach(([key,r])=>{
    if(!r.itemStatus) r.itemStatus={};
    Object.keys(r.itemStatus).forEach(k=>{ if(r.itemStatus[k]==='skipped') delete r.itemStatus[k]; });
    if(!r.timeOverrides) r.timeOverrides={};
    Object.values(r.timeOverrides).forEach(ov=>{if(ov && typeof ov==='object' && !('manual' in ov) && !('adaptive' in ov)) ov.manual=true;});
    if(!Number.isFinite(r.resetCount)) r.resetCount=0;
    if(!r.mode) r.mode='normal';
    if(!('finishCelebrated' in r)) r.finishCelebrated='';
    if(!('dayNote' in r)) r.dayNote='';
    if(!('lastActualWakeAt' in r)) r.lastActualWakeAt=r.actualWakeAt||'';
    if(!('lastActualSleepAt' in r)) r.lastActualSleepAt=r.actualSleepAt||'';
    if(!r.explicitAnchors || typeof r.explicitAnchors!=='object') r.explicitAnchors={};

    // v3.3 could accidentally turn an actual Wake/Sleep completion into a planned
    // one-day anchor. Repair only records that do not show evidence of an explicit
    // Plan Day edit, so genuine one-day plans are preserved.
    if(Number(parsed.version||0)<14){
      const wakeOv=r.timeOverrides['s:wake'], sleepOv=r.timeOverrides['s:sleep'];
      const wakeClock=r.actualWakeAt&&String(r.actualWakeAt).includes('T')?String(r.actualWakeAt).slice(11,16):'';
      const sleepClock=r.actualSleepAt&&String(r.actualSleepAt).includes('T')?String(r.actualSleepAt).slice(11,16):'';
      // Older builds never stored an explicit flag on day anchors. If an old
      // anchor exactly equals an actual completion timestamp, prefer safety:
      // treat it as the known legacy mix-up rather than silently turning the
      // actual event into tomorrow's plan. Non-matching Plan Day anchors stay.
      if(wakeClock&&wakeOv?.dayAnchor&&!wakeOv.explicit&&wakeOv.start===wakeClock) delete r.timeOverrides['s:wake'];
      else if(wakeOv?.dayAnchor)r.explicitAnchors.wake=true;
      if(sleepClock&&sleepOv?.dayAnchor&&!sleepOv.explicit&&sleepOv.start===sleepClock) delete r.timeOverrides['s:sleep'];
      else if(sleepOv?.dayAnchor)r.explicitAnchors.sleep=true;
    }
  });
  return next;
}

let initialLocalStateFound=false;
let appInitialized=false;
let durableTimer=null;
let durableDbPromise=null;
let moreHomeScrollY=0;
let weekEditContext=null;
let moneySelectMode=false;
let moneySelectedIds=new Set();
const historySelectMode={weight:false,gym:false,workout:false,fuel:false,maintenance:false,project:false};
const historySelected={weight:new Set(),gym:new Set(),workout:new Set(),fuel:new Set(),maintenance:new Set(),project:new Set()};
function historySelectToggle(type,renderer){const turnOn=!historySelectMode[type];Object.keys(historySelectMode).forEach(k=>{historySelectMode[k]=false;historySelected[k].clear();});historySelectMode[type]=turnOn;renderer();}
function historySelectCheckbox(type,id){return `<input class="history-select-check" type="checkbox" data-history-select="${type}" data-history-id="${escapeAttr(id)}" ${historySelected[type].has(id)?'checked':''} aria-label="Select item">`;}
function historySelectToolbar(type){return historySelectMode[type]?`<div class="selection-toolbar compact-selection"><span><b data-history-count="${type}">${historySelected[type].size}</b> selected</span><button class="danger-btn small-btn" data-history-delete-selected="${type}" ${historySelected[type].size?'':'disabled'}>Delete selected</button></div>`:'';}
function bindHistorySelection(type,renderer,deleteFn){
  $$(`[data-history-select="${type}"]`).forEach(cb=>cb.onchange=()=>{if(cb.checked)historySelected[type].add(cb.dataset.historyId);else historySelected[type].delete(cb.dataset.historyId);const c=$(`[data-history-count="${type}"]`);if(c)c.textContent=historySelected[type].size;const d=$(`[data-history-delete-selected="${type}"]`);if(d)d.disabled=!historySelected[type].size;});
  const del=$(`[data-history-delete-selected="${type}"]`);if(del)del.onclick=()=>deleteFn([...historySelected[type]]);
}
function restoreDeletedObjects(array,removed){removed.slice().sort((a,b)=>a.index-b.index).forEach(x=>array.splice(Math.min(x.index,array.length),0,x.item));}

function loadState() {
  try {
    const raw = localStorage.getItem(APP_KEY);
    initialLocalStateFound=!!raw;
    if(!raw) return defaultState();
    const parsed=JSON.parse(raw);
    // Keep the exact pre-migration state locally before upgrading schemas.
    // This runs before the normal snapshot helpers are initialized.
    if(Number(parsed?.version||0)<APP_VERSION){
      try{
        const listKey=`${APP_KEY}-safety-list-v2`,legacyKey=`${APP_KEY}-safety-v1`,snap={createdAt:new Date().toISOString(),reason:`Before v${APP_DISPLAY_VERSION} migration`,state:parsed};
        const list=JSON.parse(localStorage.getItem(listKey)||'[]'),next=Array.isArray(list)?list:[];next.unshift(snap);localStorage.setItem(listKey,JSON.stringify(next.slice(0,3)));localStorage.setItem(legacyKey,JSON.stringify(snap));
      }catch(e){}
    }
    return migrateState(parsed);
  } catch(e) {
    initialLocalStateFound=false;window.__resetUnreadableLocal=true;
    try{const raw=localStorage.getItem(APP_KEY);if(raw)localStorage.setItem(APP_KEY+'-unreadable-backup',raw);}catch(ignored){}
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
  sealPastDays();refreshHistoricalSummaries();
  if(!state.meta) state.meta={};
  state.meta.lastSavedAt=new Date().toISOString();
  try { localStorage.setItem(APP_KEY, JSON.stringify(state)); } catch(e) {}
  if(appInitialized){clearTimeout(durableTimer);durableTimer=setTimeout(()=>durableWrite(),350);}
}
async function updateBackupConfidenceLabel(){
  const el=$('#backupConfidenceStatus'); if(!el)return;
  try{
    const snap=await durableRead();
    const when=snap?.updatedAt ? new Date(snap.updatedAt) : (state.meta?.lastSavedAt?new Date(state.meta.lastSavedAt):null);
    if(!when || Number.isNaN(when.getTime())){el.textContent='Ready';return;}
    const mins=Math.max(0,Math.round((Date.now()-when.getTime())/60000));
    el.textContent=mins<1?'Saved now':mins===1?'1 min ago':mins<60?`${mins} min ago`:when.toLocaleDateString(undefined,{month:'short',day:'numeric'});
  }catch(e){el.textContent='Local';}
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
  const snap=await durableRead();
  if(snap?.state&&(!initialLocalStateFound||Date.parse(snap.state.meta?.lastSavedAt||0)>Date.parse(state.meta?.lastSavedAt||0))){
    try{state=migrateState(snap.state);try{localStorage.setItem(APP_KEY,JSON.stringify(state));}catch(e){}}catch(e){}
  }
  if(state.settings.mode==='bad'&&state.settings.modeSetDate!==todayKey())state.settings.mode='normal';
  state=migrateState(state);appInitialized=true;
  applyLanguageState();ensureLanguageObserver();requestPersistentStorage().then(updateStorageProtectionLabel);render();flushStateSave();durableWrite();
  if(window.__resetUnreadableLocal)toast('Stored data needed recovery. Check your records and keep a JSON backup.');
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
  if(status==='pending') {
    delete rec.itemStatus[occurrenceKey(item)];
    rec.finishCelebrated='';
    if(item.id==='sleep'){delete rec.actualSleepAt;delete rec.actualSleepOffsetMin;}
  } else rec.itemStatus[occurrenceKey(item)]=status;
  if(status==='done' && item.category==='Fitness' && /gym/i.test(item.title||'')) state.gym.sessionExcluded=(state.gym.sessionExcluded||[]).filter(k=>k!==key);
  if(status==='done'){rec.completedAt??={};rec.completedAt[occurrenceKey(item)]??=new Date().toISOString();rec.unscheduledItems=(rec.unscheduledItems||[]).filter(x=>x!==occurrenceKey(item));if(!rec.unscheduledItems.length)rec.schedulerAttention=[];}
  else if(rec.completedAt)delete rec.completedAt[occurrenceKey(item)];
  save();
}
function applyDailyOverride(item,key,ignoreOverrides=false) {
  if(ignoreOverrides) return item;
  const override=state.records[key]?.timeOverrides?.[occurrenceKey(item)];
  return override ? {...item,...override,adjusted:true} : item;
}
function itemsForDateLegacy(date, options={}) {
  const key=todayKey(date); const dow=date.getDay();
  const recurring=state.schedule
    .filter(x=>x.active!==false && Array.isArray(x.days) && x.days.includes(dow) && dateInRange(key,x))
    .map(x=>applyDailyOverride({...x,source:'schedule',date:key},key,options.ignoreOverrides));
  const oneOff=state.oneOffTasks
    .filter(x=>x.date===key)
    .map(x=>applyDailyOverride({...x,source:'oneoff'},key,options.ignoreOverrides));
  return [...recurring,...oneOff].sort((a,b)=>itemSortMinutes(a)-itemSortMinutes(b) || String(a.title).localeCompare(String(b.title)));
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
function dayCompletionLegacy(date) {
  const key=todayKey(date); const items=itemsForMode(itemsForDate(date),modeForDate(key)).filter(i=>getStatus(i,key)!=='cancelled'&&itemCountsForProgress(i));
  if(!items.length) return 0;
  const done=items.filter(i=>getStatus(i,key)==='done').length;
  return Math.round(done/items.length*100);
}

function dayFinishState(date=new Date()) {
  const key=todayKey(date); const items=itemsForMode(itemsForDate(date),modeForDate(key)).filter(i=>getStatus(i,key)!=='cancelled'&&itemCountsForProgress(i));
  if(!items.length) return null;
  const statuses=items.map(i=>getStatus(i,key));
  const closed=new Set(['done','missed','deferred','dropped','cancelled']);
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
  moveToastToActiveSheet();
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

/* ===== Shared sheet scrolling ===== */
const sheetScrollState = { page: null, releaseFrame: 0, stack: [], onDismiss: null };
function pageScrollY() { return sheetScrollState.page?.y ?? window.scrollY; }
function pageScrollTo(...args) {
  if (!sheetScrollState.page) return window.scrollTo(...args);
  const options = typeof args[0] === 'object' ? args[0] : {left: args[0], top: args[1]};
  if (Number.isFinite(options.top)) sheetScrollState.page.y = Math.max(0, options.top);
  if (Number.isFinite(options.left)) sheetScrollState.page.x = Math.max(0, options.left);
  document.body.style.top = `${-sheetScrollState.page.y}px`;
  document.body.style.left = `${-sheetScrollState.page.x}px`;
}
function openSheets() {
  sheetScrollState.stack = sheetScrollState.stack.filter(dialog => dialog.open);
  return [...$$('dialog.sheet[open]').filter(dialog => !sheetScrollState.stack.includes(dialog)), ...sheetScrollState.stack];
}
function moveToastToActiveSheet() {
  const el = $('.toast');
  if (el) (openSheets().at(-1) || document.body).appendChild(el);
}
function lockPageForSheet() {
  cancelAnimationFrame(sheetScrollState.releaseFrame);
  if (sheetScrollState.page) return;
  const body = document.body, root = document.documentElement;
  const properties = ['position', 'top', 'left', 'width', 'overflow', 'padding-right'];
  sheetScrollState.page = {
    x: window.scrollX, y: window.scrollY,
    bodyStyles: properties.map(name => [name, body.style.getPropertyValue(name), body.style.getPropertyPriority(name)]),
    rootOverflow: root.style.getPropertyValue('overflow'),
    rootOverflowPriority: root.style.getPropertyPriority('overflow'),
    rootScrollBehavior: root.style.getPropertyValue('scroll-behavior'),
    rootScrollPriority: root.style.getPropertyPriority('scroll-behavior')
  };
  const scrollbar = window.innerWidth - root.clientWidth;
  if (scrollbar > 0) body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight || 0) + scrollbar}px`;
  body.style.position = 'fixed';
  body.style.top = `${-sheetScrollState.page.y}px`;
  body.style.left = `${-sheetScrollState.page.x}px`;
  body.style.width = '100%';
  body.style.overflow = 'hidden';
  root.style.overflow = 'hidden';
  root.style.scrollBehavior = 'auto';
}
function releasePageAfterSheets() {
  cancelAnimationFrame(sheetScrollState.releaseFrame);
  sheetScrollState.releaseFrame = requestAnimationFrame(() => {
    if (openSheets().length || !sheetScrollState.page) return;
    const saved = sheetScrollState.page, body = document.body, root = document.documentElement;
    sheetScrollState.page = null;
    for (const [name, value, priority] of saved.bodyStyles) {
      if (value) body.style.setProperty(name, value, priority);
      else body.style.removeProperty(name);
    }
    if (saved.rootOverflow) root.style.setProperty('overflow', saved.rootOverflow, saved.rootOverflowPriority);
    else root.style.removeProperty('overflow');
    window.scrollTo({left: saved.x, top: saved.y, behavior: 'auto'});
    if (saved.rootScrollBehavior) root.style.setProperty('scroll-behavior', saved.rootScrollBehavior, saved.rootScrollPriority);
    else root.style.removeProperty('scroll-behavior');
    moveToastToActiveSheet();
  });
}
function updateSheetViewport() {
  const viewport = window.visualViewport, root = document.documentElement;
  root.style.setProperty('--sheet-viewport-height', `${viewport?.height || window.innerHeight}px`);
  root.style.setProperty('--sheet-viewport-top', `${viewport?.offsetTop || 0}px`);
  requestAnimationFrame(keepSheetFieldVisible);
}
function keepSheetFieldVisible() {
  const field = document.activeElement;
  if (!field?.matches('input:not([type=checkbox]):not([type=range]),select,textarea')) return;
  const card = field.closest('dialog[open] .sheet-card');
  if (!card) return;
  const bounds = card.getBoundingClientRect(), rect = field.getBoundingClientRect();
  if (rect.bottom > bounds.bottom - 16) card.scrollTop += rect.bottom - bounds.bottom + 16;
  else if (rect.top < bounds.top + 16) card.scrollTop -= bounds.top + 16 - rect.top;
}
function prepareModalView() {
  sheetScrollState.onDismiss = null;
  if (modal.contains(document.activeElement)) document.activeElement.blur();
  modalContent.scrollTop = 0;
  modalContent.scrollLeft = 0;
  modal.scrollTop = 0;
  if (modal.open) modalContent.focus({preventScroll: true});
}
function openAppSheet(dialog) {
  lockPageForSheet();
  updateSheetViewport();
  try {
    if (!dialog.open) {
      const card = $('.sheet-card', dialog);
      if (card) {card.scrollTop = 0; card.scrollLeft = 0;}
      dialog.showModal();
      sheetScrollState.stack = sheetScrollState.stack.filter(sheet => sheet !== dialog);
      sheetScrollState.stack.push(dialog);
    }
  } catch (error) {
    releasePageAfterSheets();
    throw error;
  }
  moveToastToActiveSheet();
}
function closeAppSheet(dialog) {
  if (dialog === modal) sheetScrollState.onDismiss = null;
  if (dialog.contains(document.activeElement)) document.activeElement.blur();
  if (dialog.open) dialog.close();
  moveToastToActiveSheet();
  releasePageAfterSheets();
}
function returnToRoutineManager() {
  const day = routineManagerReturnDay, top = routineManagerReturnScroll;
  routineManagerReturnDay = null;
  routineManagerReturnScroll = 0;
  if (day !== null) openScheduleManager(day, top, true);
  else {weekEditContext = null; closeAppSheet(modal);}
}
function dismissAppSheet(dialog) {
  if (dialog === modal && sheetScrollState.onDismiss) {
    const action = sheetScrollState.onDismiss;
    sheetScrollState.onDismiss = null;
    action();
    return;
  }
  if (dialog === modal && $('#schedTitle', modalContent) && routineManagerReturnDay !== null) {
    returnToRoutineManager();
    return;
  }
  if (dialog === modal) {
    routineManagerReturnDay = null;
    routineManagerReturnScroll = 0;
    weekEditContext = null;
  }
  closeAppSheet(dialog);
}
function initializeSheetScrolling() {
  for (const dialog of $$('dialog.sheet')) {
    const card = $('.sheet-card', dialog);
    card.tabIndex = -1;
    card.setAttribute('autofocus', '');
    // Cancellation must remain possible even if a form contains invalid fields.
    dialog.addEventListener('cancel', event => {event.preventDefault(); dismissAppSheet(dialog);});
    dialog.addEventListener('close', () => {moveToastToActiveSheet(); releasePageAfterSheets();});
    let backdropStart = null;
    dialog.addEventListener('pointerdown', event => {
      backdropStart = event.target === dialog ? {x: event.clientX, y: event.clientY} : null;
    }, {passive: true});
    dialog.addEventListener('click', event => {
      if (event.target === dialog && backdropStart && Math.hypot(event.clientX - backdropStart.x, event.clientY - backdropStart.y) < 10) dismissAppSheet(dialog);
      backdropStart = null;
    });
    // Native method=dialog settings buttons bypass closeAppSheet.
    dialog.addEventListener('submit', event => {
      if (event.target.getAttribute('method') === 'dialog') {
        event.preventDefault();
        closeAppSheet(dialog);
      }
    });
  }
  window.addEventListener('resize', updateSheetViewport, {passive: true});
  window.visualViewport?.addEventListener('resize', updateSheetViewport, {passive: true});
  window.visualViewport?.addEventListener('scroll', updateSheetViewport, {passive: true});
  document.addEventListener('focusin', () => requestAnimationFrame(keepSheetFieldVisible));
  updateSheetViewport();
}
/* ===== End shared sheet scrolling ===== */


function setHeader(title, date=new Date()) {
  pageTitle.textContent=ui(title);
  dateLabel.textContent=date.toLocaleDateString(currentLocale(),{weekday:'long',month:'short',day:'numeric'}).toUpperCase();
}
function render() {
  applyLanguageState();
  const tab=state.settings.activeTab || 'today';
  $$('.tab').forEach(b=>{const active=b.dataset.tab===tab;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
  if(tab==='today') renderToday();
  if(tab==='week') renderWeek();
  if(tab==='university') renderUniversity();
  if(tab==='money') renderMoney();
  if(tab==='more') renderMore();
  localizeTree(main);
  save();
}

function categoryBadge(category) {
  const cls=category==='University'?'blue':category==='Fitness'?'purple':category==='Sleep'?'warn':category==='Food'?'':category==='Project'?'purple':'';
  return `<span class="badge ${cls}">${escapeHTML(category || 'Task')}</span>`;
}
function isDayAnchor(item){return !!item && (item.anchor==='wake'||item.anchor==='sleep'||item.id==='wake'||item.id==='sleep');}
function itemSortMinutes(item){return minutesFromTime(item.start)+1440*Number(item.dayOffset||0);}
function itemEndSortMinutes(item){const start=itemSortMinutes(item);let end=minutesFromTime(item.end||item.start)+1440*Number(item.dayOffset||0);if(item.end&&end<start)end+=1440;return end+(!item.end?30:0);}
function sleepDayOffsetForTime(time){return minutesFromTime(time)<720?1:0;}
function timeWindow(item) {
  const suffix=Number(item.dayOffset||0)>0?' (+1)':'';
  if(item.end && item.end!==item.start) return `${formatClock(item.start)}–${formatClock(item.end)}${suffix}`;
  return `${formatClock(item.start)}${suffix}`;
}
function statusForTime(item, date, nowMin=currentMinutes()) {
  if(todayKey(date)!==todayKey()) return '';
  const s=itemSortMinutes(item); const e=itemEndSortMinutes(item);
  if(nowMin>=s && nowMin<=Math.max(s+10,e)) return 'now';
  if(nowMin<s) return 'future';
  return 'past';
}

function nextUsefulItem(items,key) {
  const now=currentMinutes();
  const active=items.filter(i=>!isClosedStatus(getStatus(i,key)));
  const current=active.find(i=>statusForTime(i,new Date())==='now');
  if(current) return {item:current,mode:'now'};
  const overdueEssential=active.find(i=>i.essential && itemEndSortMinutes(i)<now);
  if(overdueEssential) return {item:overdueEssential,mode:'overdue'};
  const next=active.find(i=>itemSortMinutes(i)>now);
  if(next) return {item:next,mode:'next'};
  const overdue=active.find(i=>itemEndSortMinutes(i)<now && !itemIsFixed(i));
  if(overdue) return {item:overdue,mode:'overdue'};
  return null;
}
function countdownText(item,mode) {
  if(mode==='overdue') return 'NOW';
  const now=currentMinutes();
  if(mode==='now') {
    const diff=Math.max(0,itemEndSortMinutes(item)-now);
    return diff>0 ? `${diff}m` : 'NOW';
  }
  const diff=Math.max(0,itemSortMinutes(item)-now);
  if(diff<60) return `${diff}m`;
  return `${Math.floor(diff/60)}h ${diff%60}m`;
}

function renderToday(preserveScroll=false) {
  const scroll=pageScrollY();
  const date=new Date(); const key=todayKey(date); const rec=ensureRecord(key);rec.mode=currentMode();
  const allItems=itemsForDate(date); const items=itemsForMode(allItems,currentMode()); const parked=allItems.filter(i=>!itemIncludedForMode(i,currentMode()));
  const effectiveItems=items.filter(i=>getStatus(i,key)!=='cancelled');
  const done=effectiveItems.filter(i=>getStatus(i,key)==='done').length,total=effectiveItems.length,pct=total?Math.round(done/total*100):0;
  const next=nextUsefulItem(items,key); const finish=dayFinishState(date); const lastSleep=previousUnloggedSleep();
  const hour=new Date().getHours(); const greeting=hour<12?'Good morning':hour<18?'Good afternoon':'Good evening';
  const open=items.filter(i=>!isClosedStatus(getStatus(i,key))); const hero=next?.item||open[0]||null;
  const nextAfter=hero?open.find(i=>occurrenceKey(i)!==occurrenceKey(hero) && minutesFromTime(i.start)>=minutesFromTime(hero.start)):null;
  const heroMode=next?.mode||'next'; const heroCanComplete=hero && (heroMode==='now'||heroMode==='overdue');
  const classes=effectiveItems.filter(i=>i.isClass), habits=effectiveItems.filter(i=>!i.isClass && ['Routine','Food','Fitness','Sleep'].includes(i.category)), other=effectiveItems.filter(i=>!classes.includes(i)&&!habits.includes(i));
  const count=(arr)=>[arr.filter(i=>getStatus(i,key)==='done').length,arr.length]; const cc=count(classes),hc=count(habits),oc=count(other);
  const pendingFlexible=items.filter(i=>!itemManualMoveLocked(i)&&!isClosedStatus(getStatus(i,key))); const showWrap=hour>=18&&pendingFlexible.length>0;
  const adjusted=items.filter(i=>i.adjusted).length,missed=items.filter(i=>getStatus(i,key)==='missed').length;
  setHeader('Today',date);
  main.innerHTML=`
    <section class="now-card ${finish?'complete':''}">
      <div class="now-topline"><div><span class="now-label">${finish?'Complete':heroMode==='now'||heroMode==='overdue'?'Now':'Next up'}</span><button class="mode-mini mode-pill" id="modeBtn">${escapeHTML(modeName())}</button></div><div class="mini-ring" style="--value:${pct*3.6}deg"><span>${pct}%</span></div></div>
      ${hero?`<h2>${escapeHTML(hero.title)}</h2><p class="now-time">${escapeHTML(timeWindow(hero))}${heroMode==='overdue'?' · overdue':''}</p><p class="muted now-detail">${escapeHTML(hero.detail||'Do the next useful thing.')}</p><div class="now-actions"><button class="success-btn" id="heroDoneBtn">${svgIcon('check')} Done</button>${!itemManualMoveLocked(hero)?`<button class="secondary" id="heroMoveBtn">${svgIcon('arrowUpRight')} Move</button>`:''}<div class="now-countdown"><b>${countdownText(hero,heroMode)}</b><small>${heroMode==='now'?'left':heroMode==='overdue'?'':'until'}</small></div></div>`:finish?`<div class="completion-center">${svgIcon('check','completion-icon')}<h2>${finish.type==='full'?'Day complete':'Recovery complete'}</h2><p>You finished what mattered today.</p></div>`:`<h2>You’re clear for now.</h2><p class="muted">Use the free time well, or add something useful.</p>`}
    </section>
    ${nextAfter?`<section class="next-slim-card"><div><span>Next</span><b>${escapeHTML(nextAfter.title)}</b><small>${escapeHTML(timeWindow(nextAfter))}</small></div><span class="next-arrow">${svgIcon('chevronRight')}</span></section>`:''}
    <section class="today-progress-card"><div class="today-progress-head"><h3>Today’s Progress</h3><span>${done}/${total}</span></div><div class="today-progress-body"><div class="progress-ring compact-ring" style="--value:${pct*3.6}deg"><b>${pct}%</b></div><div class="progress-breakdown"><div><span class="progress-dot uni"></span><b>Classes</b><em>${cc[0]} / ${cc[1]}</em></div><div><span class="progress-dot habit"></span><b>Habits</b><em>${hc[0]} / ${hc[1]}</em></div><div><span class="progress-dot other"></span><b>Other</b><em>${oc[0]} / ${oc[1]}</em></div></div></div></section>
    ${lastSleep?`<section class="next-slim-card warning-card"><div><span>Last night</span><b>Sleep was not logged</b><small>Record it even if you slept after midnight.</small></div><button class="secondary small-btn" id="logLastSleepBtn">Log sleep</button></section>`:''}
    <div class="section-title"><h2>Today’s timeline</h2><button id="addTodayBtn">+ Add</button></div>
    <section class="timeline-shell"><div class="timeline">${items.length?items.map(i=>timelineItemHTML(i,date,true)).join(''):'<div class="empty-state">Nothing scheduled today.</div>'}</div></section>
    ${showWrap?`<section class="next-slim-card"><div><span>End of day</span><b>${pendingFlexible.length} flexible item${pendingFlexible.length===1?'':'s'} still open</b><small>Move, drop or keep them.</small></div><button class="secondary small-btn" id="wrapDayBtn">Review</button></section>`:''}
    ${parked.length&&currentMode()!=='normal'?`<details class="card flat parked-card"><summary>${parked.length} parked by ${escapeHTML(modeName())} mode</summary><div class="parked-list">${parked.map(i=>`<div><b>${escapeHTML(i.title)}</b><span>${escapeHTML(timeWindow(i))}</span></div>`).join('')}</div></details>`:''}
    <section class="adaptive-card"><div><span class="adaptive-icon">${svgIcon('spark')}</span><div><b>Rebuild the rest of today</b><small>Keep fixed events safe and rebuild only what is still useful.</small></div></div><button class="secondary" id="restartBtn">Rebuild</button></section>
    ${adjusted?`<p class="muted tiny center-note">${adjusted} item${adjusted===1?'':'s'} adjusted today.</p>`:''}${missed?`<p class="muted tiny center-note">${missed} fixed event${missed===1?'':'s'} missed.</p>`:''}`;
  bindTimeline(date);
  $('#addTodayBtn').onclick=()=>openOneOffTaskModal(null,{date:key,start:suggestTimeForNewTask(date)});$('#restartBtn').onclick=openRestartModal;$('#modeBtn').onclick=openModeModal;
  if($('#logLastSleepBtn')&&lastSleep)$('#logLastSleepBtn').onclick=()=>openSleepLogModal(lastSleep.key);if($('#wrapDayBtn'))$('#wrapDayBtn').onclick=()=>openEndOfDayCleanup(date);
  if($('#heroDoneBtn')&&hero){$('#heroDoneBtn').onclick=()=>{const completed=hero;setStatus(completed,key,'done');renderToday();toast('Marked done','Undo',()=>{setStatus(completed,key,'pending');renderToday();});requestAnimationFrame(()=>maybeCelebrateDayFinish(date));};}
  if($('#heroMoveBtn')&&hero)$('#heroMoveBtn').onclick=()=>openMoveItemModal(hero,date);
  localizeTree(main);if(preserveScroll)requestAnimationFrame(()=>pageScrollTo(0,scroll));
}

function timelineItemHTML(item,date,showActions=false) {
  const key=todayKey(date); const status=getStatus(item,key); const timeState=statusForTime(item,date);
  const isNext=timeState==='future' && !isClosedStatus(status);
  const nowClass=timeState==='now' && status==='pending'?'now':'';
  const nextClass=isNext?'next':'';
  const closedStatus=['missed','deferred','dropped','cancelled'].includes(status);
  const locked=itemManualMoveLocked(item), anchor=isDayAnchor(item);
  const statusBadge=status==='missed'?'<span class="badge danger-badge">MISSED</span>':status==='cancelled'?'<span class="badge muted-badge">CANCELLED</span>':status==='deferred'?'<span class="badge blue">MOVED</span>':status==='dropped'?'<span class="badge muted-badge">DROPPED</span>':item.adjusted?'<span class="badge adjusted-badge">ADJUSTED</span>':nowClass?'<span class="badge">NOW</span>':'';
  const actualSleep=item.id==='sleep' ? state.records[key]?.actualSleepAt : '';
  const actualWake=item.id==='wake' ? state.records[key]?.actualWakeAt : '';
  const anchorBadge=anchor?`<span class="badge anchor-badge">${item.id==='wake'?'WAKE':'SLEEP'} ANCHOR</span>`:'';
  const sleepBadge=actualSleep?`<span class="badge sleep-badge">SLEPT ${escapeHTML(actualSleepClock(actualSleep))}</span>`:'';
  const wakeBadge=actualWake?`<span class="badge sleep-badge">AWAKE ${escapeHTML(actualSleepClock(actualWake))}</span>`:'';
  const canMarkMissed=!anchor && status==='pending' && key<=todayKey();
  const canCancel=!anchor && !['done','deferred','dropped','cancelled'].includes(status);
  const canRestore=(status==='cancelled'||status==='dropped'||(status==='missed'&&!itemIsFixed(item)));
  return `<div class="timeline-item ${anchor?'anchor-item':''} ${nowClass} ${nextClass} ${status}" data-timeline-occ="${escapeAttr(occurrenceKey(item))}">
    <div class="timeline-time">${formatClock(item.start)}${Number(item.dayOffset||0)>0?'<small>+1</small>':''}</div><span class="timeline-dot"></span>
    <div class="timeline-body">
      <div class="timeline-main">
        <input class="check" type="checkbox" data-occ="${escapeAttr(occurrenceKey(item))}" data-date="${key}" ${status==='done'?'checked':''} ${closedStatus?'disabled':''} aria-label="Mark ${escapeAttr(item.title)} done">
        <div class="timeline-copy"><b>${escapeHTML(item.title)}</b><small>${escapeHTML(item.detail||'')}</small>
          <div class="timeline-meta">${anchorBadge}${itemIsNonBlocking(item)?'<span class="badge reminder-badge">REMINDER</span>':''}${categoryBadge(item.category)}<span class="badge blue">${escapeHTML(timeWindow(item))}</span>${locked&&!anchor?'<span class="badge lock-badge">LOCKED</span>':''}${statusBadge}${sleepBadge}${wakeBadge}</div>
        </div>
      </div>
      ${showActions?`<div class="quick-actions">${anchor?`<button data-plan-anchors="${key}" type="button">Adjust day</button>${item.id==='sleep'?`<button data-log-sleep="${key}" type="button">${actualSleep?'Edit sleep time':'Log sleep time'}</button>`:''}`:`<button data-edit-item="${item.source}:${item.id}" type="button">Edit</button>${!locked && !isClosedStatus(status) && status!=='done'?`<button data-move-item="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Move</button>`:''}${canMarkMissed?`<button data-miss-item="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Mark missed</button>`:''}${canCancel?`<button data-cancel-item="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Cancel for day</button>`:''}${canRestore?`<button data-restore-item="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Restore</button>`:''}${status==='deferred'?`<button data-undo-defer="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Undo move</button>`:''}`}</div>`:''}
    </div>
  </div>`;
}
function markMissedBeforeWake(key,wakeValue){
  const rec=ensureRecord(key), date=parseDateKey(key), d=new Date(wakeValue);
  if(Number.isNaN(d.getTime()))return;
  const wakeMin=d.getHours()*60+d.getMinutes();
  itemsForDate(date).forEach(item=>{
    if(isDayAnchor(item)||getStatus(item,key)!=='pending')return;
    if(itemEndSortMinutes(item)<=wakeMin)rec.itemStatus[occurrenceKey(item)]='missed';
  });
}
function restoreMissedItem(item,key){
  const rec=ensureRecord(key);delete rec.itemStatus[occurrenceKey(item)];
  if(!itemIsFixed(item)&&key===todayKey()&&itemEndSortMinutes(item)<currentMinutes()){
    const date=parseDateKey(key),duration=itemDurationForMove(item),blocked=itemsForDate(date).filter(x=>occurrenceKey(x)!==occurrenceKey(item)&&itemManualMoveLocked(x)&&!itemAllowsOverlap(x)&&getStatus(x,key)!=='cancelled'&&itemEndSortMinutes(x)>=currentMinutes()).map(x=>({start:itemSortMinutes(x),end:itemEndSortMinutes(x)}));
    const slot=findOpenSlot(roundUpMinutes(currentMinutes(),5),duration,blocked,daySleepAbsoluteMinutes(date));
    if(slot!=null)rec.timeOverrides[occurrenceKey(item)]={start:minutesToTime(slot%1440),end:minutesToTime((slot+duration)%1440),dayOffset:Math.floor(slot/1440),manual:true,adaptive:false};
  }
  save();
}
function bindTimeline(date) {
  const key=todayKey(date);
  $$('[data-occ]').forEach(cb=>cb.addEventListener('change',()=>{
    const occ=cb.dataset.occ; const item=itemsForDate(date).find(x=>occurrenceKey(x)===occ); if(!item)return;
    if(item.id==='sleep' && cb.checked){cb.checked=false;openSleepLogModal(key);return;}
    if(item.id==='wake'){
      const rec=ensureRecord(key);
      if(cb.checked){
        const now=key===todayKey()?new Date():new Date(`${key}T${item.start}:00`);rec.actualWakeAt=localDateTimeInput(now);
        const wakeClock=rec.actualWakeAt.slice(11,16);setDayWakeOverride(parseDateKey(key),wakeClock);markMissedBeforeWake(key,rec.actualWakeAt);setStatus(item,key,'done');
      }else{delete rec.actualWakeAt;setStatus(item,key,'pending');}
    }else setStatus(item,key,cb.checked?'done':'pending');
    const y=pageScrollY();render();requestAnimationFrame(()=>{pageScrollTo(0,y);if(cb.checked)maybeCelebrateDayFinish(date);});
  }));
  $$('[data-edit-item]').forEach(btn=>btn.addEventListener('click',()=>{const [source,id]=btn.dataset.editItem.split(':');if(source==='schedule')openScheduleItemModal(id);else openOneOffTaskModal(id);}));
  $$('[data-plan-anchors]').forEach(btn=>btn.addEventListener('click',()=>openDayAnchorPlanner(parseDateKey(btn.dataset.planAnchors))));
  $$('[data-log-sleep]').forEach(btn=>btn.addEventListener('click',()=>openSleepLogModal(btn.dataset.logSleep)));
  $$('[data-move-item]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.moveItem);if(item)openMoveItemModal(item,date);}));
  $$('[data-miss-item]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.missItem);if(item){setStatus(item,key,'missed');render();toast('Marked missed','Undo',()=>{setStatus(item,key,'pending');render();});}}));
  $$('[data-cancel-item]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.cancelItem);if(item){const old=getStatus(item,key);setStatus(item,key,'cancelled');render();toast('Cancelled for this day','Undo',()=>{setStatus(item,key,old==='pending'?'pending':old);render();});}}));
  $$('[data-restore-item]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.restoreItem);if(item){restoreMissedItem(item,key);render();toast('Restored');}}));
  $$('[data-undo-defer]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.undoDefer);if(item){restoreDeferredItem(item,key);render();toast('Move undone');}}));
}
function openSleepLogModal(targetKey) {
  const item=sleepItemForKey(targetKey); if(!item)return toast('Sleep anchor was not found for that day');
  const rec=ensureRecord(targetKey),targetDate=parseDateKey(targetKey),nextKey=todayKey(addDays(targetDate,1));let defaultValue=rec.actualSleepAt||'';
  if(!defaultValue){
    const now=new Date();
    if(targetKey===todayKey(addDays(now,-1)))defaultValue=localDateTimeInput(now);
    else if(targetKey===todayKey()&&currentMinutes()>=itemSortMinutes(item)%1440)defaultValue=localDateTimeInput(now);
    else{const planned=new Date(targetDate),off=Number(item.dayOffset||0);planned.setDate(planned.getDate()+off);const [h,m]=(item.start||state.profile.sleepTarget||'23:30').split(':').map(Number);planned.setHours(h,m,0,0);defaultValue=localDateTimeInput(planned);}
  }
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SLEEP</p><h2>Log when you actually went to sleep</h2><p class="muted">This belongs to the night of ${escapeHTML(formatDateShort(targetDate))}, even if you slept after midnight.</p><label><span class="label">Actual sleep time</span><input class="input" id="actualSleepInput" type="datetime-local" value="${escapeAttr(defaultValue)}"></label><button class="primary full" id="saveSleepLog" style="margin-top:14px">Save sleep time</button>${rec.actualSleepAt?'<button class="danger-btn full" id="clearSleepLog" style="margin-top:8px">Clear sleep log</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);
  $('#saveSleepLog').onclick=()=>{const value=$('#actualSleepInput').value;if(!value||!value.includes('T'))return toast('Choose the actual sleep time');const actualKey=value.slice(0,10);if(actualKey!==targetKey&&actualKey!==nextKey)return toast('Use that evening or the following morning');rec.actualSleepAt=value;setDaySleepOverride(targetDate,value.slice(11,16));setStatus(item,targetKey,'done');save();closeAppSheet(modal);render();toast(`Sleep logged at ${actualSleepClock(value)}`);requestAnimationFrame(()=>maybeCelebrateDayFinish(targetDate));};
  if($('#clearSleepLog'))$('#clearSleepLog').onclick=()=>{delete rec.actualSleepAt;setStatus(item,targetKey,'pending');save();closeAppSheet(modal);render();toast('Sleep log cleared');};
  $('#cancelModal').onclick=()=>closeAppSheet(modal);localizeTree(modalContent);
}

function suggestTimeForNewTask(date) {
  if(todayKey(date)!==todayKey()) return '12:00';
  const d=new Date(); d.setMinutes(Math.ceil(d.getMinutes()/15)*15,0,0);
  if(d.getHours()>=23) return '20:00';
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

function moveWouldHitLocked(item,date,startTime){
  const key=todayKey(date), start=minutesFromTime(startTime), end=start+itemDurationForMove(item);
  return itemsForDate(date).some(other=>occurrenceKey(other)!==occurrenceKey(item) && getStatus(other,key)!=='cancelled' && itemManualMoveLocked(other) && !itemAllowsOverlap(other) && !itemAllowsOverlap(item) && start<minutesFromTime(other.end||other.start) && end>minutesFromTime(other.start));
}
function openMoveItemModal(item,date){
  const key=todayKey(date);
  if(itemManualMoveLocked(item)) return toast('This item is locked to its planned time');
  const others=itemsForDate(date).filter(x=>occurrenceKey(x)!==occurrenceKey(item) && !itemManualMoveLocked(x) && !isClosedStatus(getStatus(x,key))).sort((a,b)=>minutesFromTime(a.start)-minutesFromTime(b.start));
  const hasOverride=!!state.records[key]?.timeOverrides?.[occurrenceKey(item)];
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">MOVE TASK</p><h2>${escapeHTML(item.title)}</h2><p class="muted tiny">Flexible tasks can move. Classes, wake-up, morning reset and sleep stay locked.</p><div class="stack"><label><span class="label">Move to a different time</span><input class="input" id="moveTime" type="time" value="${escapeAttr(item.start)}"></label>${others.length?`<label><span class="label">Or swap times with</span><select id="swapTask"><option value="">No swap</option>${others.map(x=>`<option value="${escapeAttr(occurrenceKey(x))}">${escapeHTML(x.title)} · ${escapeHTML(formatClock(x.start))}</option>`).join('')}</select></label>`:''}</div><button class="primary full" id="saveMove" style="margin-top:14px">Save move</button><button class="secondary full" id="moveTomorrow" style="margin-top:8px">Move to tomorrow</button>${hasOverride?'<button class="secondary full" id="resetMove" style="margin-top:8px">Reset to planned time</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);
  $('#saveMove').onclick=()=>{
    const swapOcc=$('#swapTask')?.value||'';
    if(swapOcc){
      const other=itemsForDate(date).find(x=>occurrenceKey(x)===swapOcc); if(!other)return toast('That task is no longer available');
      const aStart=item.start, bStart=other.start;
      if(moveWouldHitLocked(item,date,bStart)||moveWouldHitLocked(other,date,aStart)) return toast('That swap would overlap a locked item');
      const before=daySnapshot(key);setItemTimeOverride(item,key,bStart); setItemTimeOverride(other,key,aStart); save(); closeAppSheet(modal); render(); toast('Tasks swapped','Undo',()=>restoreDaySnapshot(key,before)); return;
    }
    const time=$('#moveTime').value; if(!time)return toast('Choose a time');
    if(moveWouldHitLocked(item,date,time)) return toast('That time overlaps a locked item');
    const before=daySnapshot(key);setItemTimeOverride(item,key,time); closeAppSheet(modal); render(); toast('Task moved','Undo',()=>restoreDaySnapshot(key,before));
  };
  $('#moveTomorrow').onclick=()=>{const nextKey=todayKey(addDays(parseDateKey(key),1)),beforeRec=deepClone(state.records[key]||null),beforeNext=deepClone(state.records[nextKey]||null),beforeOneOff=deepClone(state.oneOffTasks);if(moveItemToTomorrow(item,key)){closeAppSheet(modal);render();toast('Moved to tomorrow','Undo',()=>{if(beforeRec)state.records[key]=beforeRec;else delete state.records[key];if(beforeNext)state.records[nextKey]=beforeNext;else delete state.records[nextKey];state.oneOffTasks=beforeOneOff;save();render();});}};
  if($('#resetMove')) $('#resetMove').onclick=()=>{const before=daySnapshot(key);clearItemTimeOverride(item,key);closeAppSheet(modal);render();toast('Planned time restored','Undo',()=>restoreDaySnapshot(key,before));};
  $('#cancelModal').onclick=()=>closeAppSheet(modal);
}
function openEndOfDayCleanup(date=new Date()){
  const key=todayKey(date); const pending=itemsForMode(itemsForDate(date),modeForDate(key)).filter(i=>!itemManualMoveLocked(i) && !isClosedStatus(getStatus(i,key)));
  if(!pending.length)return toast('No flexible tasks need cleaning up');
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">END OF DAY</p><h2>Clean up unfinished tasks</h2><p class="muted">Choose what happens to each flexible item. Nothing locked is touched.</p><div class="cleanup-list">${pending.map((i,idx)=>`<div class="cleanup-row"><div><b>${escapeHTML(i.title)}</b><small>${escapeHTML(timeWindow(i))}</small></div><select data-cleanup="${escapeAttr(occurrenceKey(i))}"><option value="keep">Keep today</option><option value="tomorrow">Move to tomorrow</option><option value="drop">Drop for today</option></select></div>`).join('')}</div><button class="primary full" id="applyCleanup" style="margin-top:14px">Apply</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);
  $('#applyCleanup').onclick=()=>{
    $$('[data-cleanup]',modalContent).forEach(sel=>{const choice=sel.value;if(choice==='keep')return;const current=itemsForDate(date).find(i=>occurrenceKey(i)===sel.dataset.cleanup);if(!current)return;if(choice==='tomorrow')moveItemToTomorrow(current,key);if(choice==='drop')setStatus(current,key,'dropped');});
    save();closeAppSheet(modal);renderToday();requestAnimationFrame(()=>maybeCelebrateDayFinish(date));toast('Day cleaned up');
  };
  $('#cancelModal').onclick=()=>closeAppSheet(modal);
}

function renderWeek() {
  let selected=parseDateKey(state.settings.selectedWeekDate||todayKey()); const weekStart=startOfWeek(selected);const days=Array.from({length:7},(_,i)=>addDays(weekStart,i));const weekEnd=days[6];let selectedKey=todayKey(selected);
  if(!days.some(d=>todayKey(d)===selectedKey)){selected=weekStart;selectedKey=todayKey(selected);state.settings.selectedWeekDate=selectedKey;}
  setHeader('Week',selected);const selectedItems=itemsForDate(selected);
  main.innerHTML=`<section class="week-header-card"><div class="week-nav clean"><button class="round-icon" id="prevWeekBtn" aria-label="Previous week">${svgIcon('chevronLeft')}</button><div><b>${formatDateShort(weekStart)} – ${formatDateShort(weekEnd)}</b><button class="today-link" id="todayWeekBtn">Today</button></div><button class="round-icon" id="nextWeekBtn" aria-label="Next week">${svgIcon('chevronRight')}</button></div><div class="week-strip modern">${days.map(d=>{const k=todayKey(d),p=dayCompletion(d);return `<button class="week-day ${k===selectedKey?'active':''} ${k===todayKey()?'today':''}" data-day-key="${k}"><small>${dayShort(d.getDay())}</small><strong>${d.getDate()}</strong><i style="--p:${p}%"></i></button>`}).join('')}</div></section>
  <div class="section-title week-day-title"><div><span class="section-kicker">${dayLong(selected.getDay())}</span><h2>${formatDateShort(selected)}</h2></div><div class="week-day-actions">${selectedKey>=todayKey()?'<button class="secondary small-btn" id="planDayBtn">Plan day</button>':''}<button id="addWeekTaskBtn">+ Task</button></div></div>
  <section class="week-day-schedule">${selectedItems.length?selectedItems.map(i=>timelineItemHTML(i,selected,true)).join(''):'<div class="empty-state">Nothing scheduled for this day.</div>'}</section>
  <details class="routine-manager"><summary><span><b>Weekly routine</b><small>${state.schedule.filter(s=>s.active!==false).length} recurring items</small></span>${svgIcon('chevronRight')}</summary><div class="routine-actions"><button class="primary" id="addRoutineBtn">+ Recurring item</button><button class="secondary" id="manageRoutineBtn">Manage routine</button></div></details>`;
  $('#prevWeekBtn').onclick=()=>{state.settings.selectedWeekDate=todayKey(addDays(selected,-7));save();renderWeek();};$('#nextWeekBtn').onclick=()=>{state.settings.selectedWeekDate=todayKey(addDays(selected,7));save();renderWeek();};$('#todayWeekBtn').onclick=()=>{state.settings.selectedWeekDate=todayKey();save();renderWeek();};$$('[data-day-key]').forEach(b=>b.onclick=()=>{state.settings.selectedWeekDate=b.dataset.dayKey;save();renderWeek();});$('#addWeekTaskBtn').onclick=()=>openOneOffTaskModal(null,{date:selectedKey,start:'12:00'});if($('#planDayBtn'))$('#planDayBtn').onclick=()=>openFutureDayPlanner(selected);$('#addRoutineBtn').onclick=()=>openScheduleItemModal(null,{days:[selected.getDay()]});$('#manageRoutineBtn').onclick=openScheduleManager;bindTimeline(selected);localizeTree(main);
}

function renderUniversity() {
  setHeader('University');
  const openTasks=state.uniTasks.filter(t=>!t.done);
  const urgent=openTasks.filter(t=>t.priority==='Urgent').length;
  const sorted=[...state.uniTasks].sort((a,b)=>Number(a.done)-Number(b.done) || priorityWeight(a.priority)-priorityWeight(b.priority) || String(a.dueDate||'9999').localeCompare(String(b.dueDate||'9999')));
  main.innerHTML=`
    <section class="grid-3 uni-top-stats">
      <div class="stat"><small>Courses</small><strong>${state.courses.length}</strong></div>
      <div class="stat"><small>Open tasks</small><strong>${openTasks.length}</strong></div>
      <div class="stat"><small>Urgent</small><strong>${urgent}</strong></div>
    </section>
    <div class="section-title"><h2>Courses</h2><button id="addCourseBtn">+ Add</button></div>
    <section>${state.courses.map(courseHTML).join('') || '<div class="card flat empty-state">No courses yet. Add only what you want to track.</div>'}</section>
    <div class="section-title"><h2>Catch-up queue</h2><button id="addUniTaskBtn">+ Task</button></div>
    <section class="card flat">
      ${sorted.length?sorted.map(uniTaskHTML).join(''):'<div class="empty-state">Nothing in the catch-up queue. Current classes can stay your focus.</div>'}
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



function shortMoney(n){const x=Number(n||0);return x>=1000?`${(x/1000).toFixed(x>=10000?0:1)}K`:Math.round(x).toString();}


/* Salary periods are advanced only by an explicit, confirmed salary receipt. */
function salaryMoney(value){return `${Number(value||0).toLocaleString(currentLocale(),{maximumFractionDigits:2})} SAR`;}
function moneyCents(value){return Math.round((Number(value)||0)*100);}
function moneySum(list){return list.reduce((sum,t)=>sum+moneyCents(t.amount),0)/100;}
function moneyMonthValid(value){return /^\d{4}-(0[1-9]|1[0-2])$/.test(String(value));}
function salaryScheduledDate(month,day=state.profile.paydayDay){
  const [y,m]=month.split('-').map(Number),last=new Date(y,m,0,12).getDate();
  return `${month}-${String(Math.min(clamp(Math.round(Number(day)||28),1,31),last)).padStart(2,'0')}`;
}
function salaryMonthShift(month,delta){const [y,m]=month.split('-').map(Number);return monthKey(new Date(y,m-1+delta,1,12));}
function salaryNextDefault(month,startDate,day=state.profile.paydayDay){
  let next=salaryScheduledDate(salaryMonthShift(month,1),day);
  for(let i=2;next<=startDate&&i<120;i++)next=salaryScheduledDate(salaryMonthShift(month,i),day);
  return next;
}
function salaryBucketSnapshot(buckets){return buckets.map(b=>({id:b.id,name:b.name,target:Math.max(0,moneyCents(b.target)/100)}));}
function ensureSalaryPeriods(data=state){
  const money=data.money;
  if(!Array.isArray(money.salaryPeriods))money.salaryPeriods=[];
  if(money.salaryPeriods.length){if(!money.salaryPeriods.some(p=>p.id===money.activeSalaryPeriodId))money.activeSalaryPeriodId=money.salaryPeriods.find(p=>!p.closedAt)?.id||null;return;}
  const created=String(data.meta?.createdAt||todayKey()).slice(0,10),anchor=validDateKey(created)&&created<=todayKey()?created:todayKey();
  let month=anchor.slice(0,7),start=salaryScheduledDate(month,data.profile.paydayDay||28);
  if(start>anchor){month=salaryMonthShift(month,-1);start=salaryScheduledDate(month,data.profile.paydayDay||28);}
  const period={id:uid('salary'),salaryMonth:month,startDate:start,income:Math.max(0,moneyCents(money.income)/100),buckets:salaryBucketSnapshot(money.buckets||[]),inferred:true,openedAt:new Date().toISOString(),closedAt:null};
  money.salaryPeriods.push(period);money.activeSalaryPeriodId=period.id;
  money.nextSalaryDate=salaryNextDefault(month,start,data.profile.paydayDay||28);
}
function salaryActivePeriod(){ensureSalaryPeriods();return state.money.salaryPeriods.find(p=>p.id===state.money.activeSalaryPeriodId)||null;}
function salaryPeriodForTransaction(t){
  if(t.salaryPeriodId)return state.money.salaryPeriods.find(p=>p.id===t.salaryPeriodId)||null;
  return [...(state.money.salaryPeriods||[])].reverse().find(p=>t.date>=p.startDate&&(!p.endDate||t.date<p.endDate))||null;
}
function salaryPeriodForDate(date){return [...(state.money.salaryPeriods||[])].reverse().find(p=>date>=p.startDate&&(!p.endDate||date<p.endDate))||null;}
function salaryTransactions(id){return state.money.transactions.filter(t=>salaryPeriodForTransaction(t)?.id===id);}
function salaryLabel(period){return `${moneyMonthLongLabel(period.salaryMonth)} salary`;}
function salaryRange(period){return `${formatDateShort(parseDateKey(period.startDate))} → ${period.endDate?formatDateShort(parseDateKey(period.endDate)):'next salary'}`;}
function salaryPeriodTotals(period){
  const tx=salaryTransactions(period.id),spent=moneySum(tx),income=moneyCents(period.income)/100;
  return {spent,income,balance:(moneyCents(income)-moneyCents(spent))/100,allocated:period.buckets.reduce((sum,b)=>sum+moneyCents(b.target),0)/100};
}
function salaryReserveTotal(){return state.money.salaryPeriods.filter(p=>p.closedAt).reduce((sum,p)=>sum+moneyCents(salaryPeriodTotals(p).balance),0)/100;}
function salaryDisplayBuckets(p){return [...(p?.buckets||[]),...(p?.retiredBuckets||[]).filter(b=>!p.buckets.some(x=>x.id===b.id))];}
function salaryBucketInfo(t){const p=salaryPeriodForTransaction(t);return salaryDisplayBuckets(p).find(b=>b.id===t.bucketId)||state.money.buckets.find(b=>b.id===t.bucketId)||{id:t.bucketId,name:'Other',target:0};}
function salaryBucketEmoji(b){
  const text=`${b.id} ${b.name}`.toLowerCase();
  if(/rent|bill|housing/.test(text))return '🏠';if(/food|grocer|meal/.test(text))return '🍽️';if(/car|fuel|petrol/.test(text))return '🚗';if(/saving/.test(text))return '💰';if(/cloth|fun|entertain/.test(text))return '👕';if(/travel|flight/.test(text))return '✈️';if(/dental|invisalign|health/.test(text))return '🦷';if(/buffer|reserve|misc/.test(text))return '🧾';return '📦';
}
function daysUntilPayday(){
  ensureSalaryPeriods();const due=state.money.nextSalaryDate;if(!validDateKey(due))return 0;
  return Math.max(0,Math.round((Date.UTC(...due.split('-').map((n,i)=>Number(n)-(i===1?1:0)))-Date.UTC(...todayKey().split('-').map((n,i)=>Number(n)-(i===1?1:0))))/86400000));
}
function captureCurrentMoneyPlan(){
  const p=salaryActivePeriod();if(!p)return;
  const buckets=salaryBucketSnapshot(state.money.buckets),income=Math.max(0,moneyCents(state.money.income)/100);
  if(JSON.stringify(p.buckets)!==JSON.stringify(buckets)||p.income!==income){const used=new Set(salaryTransactions(p.id).map(t=>t.bucketId));p.retiredBuckets=[...new Map([...(p.retiredBuckets||[]),...p.buckets.filter(b=>!buckets.some(x=>x.id===b.id)&&used.has(b.id))].map(b=>[b.id,b])).values()];p.buckets=buckets;p.income=income;save();}
}
function salaryConfirmReceipt({expectedId,date,month,income,nextDate,moveDatedSpending=true,previousMonth=null}){
  const money=state.money,old=salaryActivePeriod();
  if(!old||old.id!==expectedId)throw new Error('This salary has already changed. Reopen the confirmation.');
  if(!validDateKey(date)||date>todayKey()||date<=old.startDate)throw new Error('Use the actual salary date, after the previous start and no later than today.');
  if(!moneyMonthValid(month)||month<=(previousMonth||old.salaryMonth))throw new Error('Choose a salary month after the previous one.');
  if(income==null||String(income).trim()===''||!Number.isFinite(Number(income))||Number(income)<0||Number(income)>1e9)throw new Error('Enter a valid salary amount.');
  if(!validDateKey(nextDate)||nextDate<=date)throw new Error('The next expected salary date must be after this salary.');
  if(money.salaryPeriods.some(p=>p.id!==old.id&&p.salaryMonth===month))throw new Error('That salary month is already recorded.');
  if(previousMonth&&(!moneyMonthValid(previousMonth)||money.salaryPeriods.some(p=>p.id!==old.id&&p.salaryMonth===previousMonth)))throw new Error('Choose a different valid month for the previous salary.');
  createSafetySnapshot('Before confirming a new salary');
  const before={periods:deepClone(money.salaryPeriods),active:money.activeSalaryPeriodId,next:money.nextSalaryDate,income:money.income,assignments:money.transactions.map(t=>({id:t.id,had:Object.hasOwn(t,'salaryPeriodId'),value:t.salaryPeriodId}))};
  const next={id:uid('salary'),salaryMonth:month,startDate:date,income:moneyCents(income)/100,buckets:salaryBucketSnapshot(money.buckets),openedAt:new Date().toISOString(),closedAt:null};
  const oldTx=salaryTransactions(old.id);
  if(previousMonth)old.salaryMonth=previousMonth;
  old.endDate=date;old.closedAt=new Date().toISOString();old.inferred=false;
  money.salaryPeriods.push(next);money.activeSalaryPeriodId=next.id;money.nextSalaryDate=nextDate;money.income=next.income;
  for(const t of oldTx)t.salaryPeriodId=moveDatedSpending&&t.date>=date?next.id:old.id;
  old.closeout={...salaryPeriodTotals(old),recordedAt:old.closedAt};
  const after=salaryUndoSignature();save();flushStateSave();return {before,newId:next.id,after};
}
function salaryUndoSignature(){return JSON.stringify({periods:state.money.salaryPeriods,next:state.money.nextSalaryDate,income:state.money.income,buckets:state.money.buckets,payday:state.profile.paydayDay,assignments:state.money.transactions.map(t=>({id:t.id,value:t.salaryPeriodId}))});}
function undoSalaryReceipt(change){
  const money=state.money;
  if(money.activeSalaryPeriodId!==change.newId||salaryUndoSignature()!==change.after){toast('Money data changed after confirmation. Use history to correct individual entries.');return;}
  money.salaryPeriods=deepClone(change.before.periods);money.activeSalaryPeriodId=change.before.active;money.nextSalaryDate=change.before.next;money.income=change.before.income;
  for(const a of change.before.assignments){const t=money.transactions.find(t=>t.id===a.id);if(t){if(a.had)t.salaryPeriodId=a.value;else delete t.salaryPeriodId;}}
  save();flushStateSave();renderMoney();
}
function openSalaryReceiptModal(){
  const old=salaryActivePeriod();if(!old)return;
  let date=todayKey(),month=date.slice(0,7),nextDate=salaryNextDefault(month,date),move=true;
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SALARY RECEIVED</p><h2>Start a fresh salary period</h2><p class="muted">Review the previous salary, then confirm. Your allocation targets stay the same; spending starts fresh for the new salary.</p>${old.inferred?`<label><span class="label">Previous salary month — check this once</span><input class="input" type="month" id="salaryPreviousMonth" value="${escapeAttr(old.salaryMonth)}"></label>`:`<p><b>${escapeHTML(salaryLabel(old))}</b> will move to history.</p>`}<div class="form-grid"><label><span class="label">Salary received on</span><input class="input" type="date" id="salaryReceivedDate" max="${todayKey()}" value="${date}"></label><label><span class="label">New salary month</span><input class="input" type="month" id="salaryNewMonth" value="${month}"></label><label><span class="label">Salary amount (SAR)</span><input class="input" type="number" step="0.01" min="0" inputmode="decimal" id="salaryAmount" value="${Number(state.money.income||0)}"></label><label><span class="label">Next expected salary date</span><input class="input" type="date" id="salaryNextDate" value="${nextDate}"></label></div><div id="salaryReceiptPreview" class="salary-receipt-preview"></div><p id="salaryReceiptError" class="form-error" role="alert" hidden></p><button type="button" class="primary full" id="confirmSalaryReceipt">Confirm salary & reset spending</button><button type="button" class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  const preview=()=>{
    const tx=salaryTransactions(old.id),dated=tx.filter(t=>t.date>=date),oldSpent=moneySum(move?tx.filter(t=>t.date<date):tx),balance=(moneyCents(old.income)-moneyCents(oldSpent))/100;
    $('#salaryReceiptPreview').innerHTML=`<p><b>Previous salary:</b> ${salaryMoney(oldSpent)} spent · ${salaryMoney(Math.abs(balance))} ${balance>=0?'left over':'overspent'}</p><p><b>New salary:</b> ${salaryMoney(move?moneySum(dated):0)} already logged</p><small>Leftover amounts stay separately in salary history. They are not added to the new allocations.</small>${dated.length?`<label class="salary-payday-choice"><input type="checkbox" id="movePaydaySpending" ${move?'checked':''}><span>Put spending dated ${escapeHTML(validDateKey(date)?formatDateShort(parseDateKey(date)):date)} onward under the new salary (${salaryMoney(moneySum(dated))}). Uncheck to keep it with the previous salary.</span></label>`:''}`;
    if($('#movePaydaySpending'))$('#movePaydaySpending').onchange=e=>{move=e.target.checked;preview();};
  };
  $('#salaryReceivedDate').oninput=e=>{date=e.target.value;if(validDateKey(date)){month=date.slice(0,7);$('#salaryNewMonth').value=month;nextDate=salaryNextDefault(month,date);$('#salaryNextDate').value=nextDate;}preview();};
  $('#salaryNewMonth').oninput=e=>{month=e.target.value;if(moneyMonthValid(month)){nextDate=salaryNextDefault(month,date);$('#salaryNextDate').value=nextDate;}};
  let confirmed=false;
  $('#confirmSalaryReceipt').onclick=()=>{if(confirmed)return;try{const change=salaryConfirmReceipt({expectedId:old.id,date:$('#salaryReceivedDate').value,month:$('#salaryNewMonth').value,income:$('#salaryAmount').value,nextDate:$('#salaryNextDate').value,moveDatedSpending:move,previousMonth:$('#salaryPreviousMonth')?.value||null});confirmed=true;closeAppSheet(modal);state.settings.moneyView='home';renderMoney();toast('New salary started. Previous salary saved.','Undo',()=>undoSalaryReceipt(change));}catch(error){$('#salaryReceiptError').textContent=error.message;$('#salaryReceiptError').hidden=false;}};
  $('#cancelModal').onclick=()=>closeAppSheet(modal);preview();openAppSheet(modal);
}
function budgetRowHTML(b,periodId=state.money.activeSalaryPeriodId){
  const spent=moneySum(salaryTransactions(periodId).filter(t=>t.bucketId===b.id)),target=Number(b.target||0),left=(moneyCents(target)-moneyCents(spent))/100,pct=target?Math.round(spent/target*100):spent?100:0;
  return `<div class="budget-row"><div class="budget-top"><div><b>${salaryBucketEmoji(b)} ${escapeHTML(b.name)}</b><small>${salaryMoney(spent)} spent · ${salaryMoney(Math.abs(left))} ${left<0?'over':'left'}</small></div><div class="budget-amount"><b>${salaryMoney(target)}</b><small>${pct}%</small></div></div><div class="budget-track"><div class="budget-fill ${left<0?'over':pct>=80?'warning':''}" style="width:${clamp(pct,0,100)}%"></div></div></div>`;
}
function moneyBarsHTML(){
  const rows=state.money.salaryPeriods.slice(-6).map(p=>({p,spent:salaryPeriodTotals(p).spent})),max=Math.max(1,...rows.map(r=>r.spent));
  return `<div class="money-bars" style="grid-template-columns:repeat(${rows.length},minmax(0,1fr))">${rows.map(r=>`<div class="money-bar-col"><b>${r.spent?shortMoney(r.spent):'—'}</b><i><span class="${r.p.id===state.money.activeSalaryPeriodId?'current':''}" style="height:${Math.max(r.spent?10:2,Math.round(r.spent/max*100))}%"></span></i><small>${escapeHTML(moneyMonthLabel(r.p.salaryMonth))} '${r.p.salaryMonth.slice(2,4)}</small></div>`).join('')}</div>`;
}
function renderMoney(){
  ensureSalaryPeriods();if(state.settings.moneyView==='history')return renderMoneyHistoryPage();
  setHeader('Money');const p=salaryActivePeriod(),totals=salaryPeriodTotals(p),due=state.money.nextSalaryDate<=todayKey(),days=daysUntilPayday(),pct=totals.income>0?Math.round(totals.spent/totals.income*100):0;
  const recent=[...salaryTransactions(p.id)].sort((a,b)=>String(b.date).localeCompare(String(a.date))||Number(b.createdAt||0)-Number(a.createdAt||0)).slice(0,5),closed=state.money.salaryPeriods.filter(p=>p.closedAt),reserve=salaryReserveTotal();
  main.innerHTML=`<section class="money-top-grid"><article class="money-summary-tile salary"><span class="money-tile-icon">${svgIcon('calendar')}</span><div><b>${due?(state.money.nextSalaryDate===todayKey()?'Today':'Due'):days}</b><small>${due?'salary awaiting confirmation':`days until salary · ${escapeHTML(formatDateShort(parseDateKey(state.money.nextSalaryDate)))}`}</small></div></article><article class="money-summary-tile remaining ${totals.balance<0?'over':''}"><span class="money-tile-icon">${svgIcon('money')}</span><div><b>${salaryMoney(Math.abs(totals.balance))}</b><small>${totals.balance<0?'over salary income':'salary remaining'}</small></div></article></section>${due?`<section class="salary-due-card"><div><b>Has your salary arrived?</b><p>Confirm it to close the previous salary and refresh your allocations.</p></div><button class="primary full" id="salaryReceivedBtn">Salary received · Start new period</button></section>`:''}<section class="monthly-spending-card"><div class="monthly-spending-title"><div><span>${escapeHTML(salaryLabel(p))}</span><b>${salaryMoney(totals.spent)} <em>/ ${salaryMoney(totals.income)}</em></b></div><strong>${pct}%</strong></div><p class="salary-period-range">${escapeHTML(salaryRange(p))}</p><div class="budget-track big"><div class="budget-fill ${pct>=100?'over':pct>=80?'warning':''}" style="width:${clamp(pct,0,100)}%"></div></div></section><button class="primary full money-log-btn money-log-top" id="addExpenseBtn">+ Log spending</button><div class="section-title"><h2>Allocations</h2><button id="editMoneyBtn">Edit</button></div><p class="salary-allocation-total">${salaryMoney(totals.allocated)} allocated${totals.allocated!==totals.income?` · ${salaryMoney(Math.abs(totals.income-totals.allocated))} ${totals.allocated>totals.income?'above salary':'unallocated'}`:''}</p><section class="allocation-list">${p.buckets.map(b=>budgetRowHTML(b,p.id)).join('')}</section><section class="salary-reserve-card"><div><small>Recorded net leftover</small><b>${reserve<0?'−':''}${salaryMoney(Math.abs(reserve))}</b><p>From ${closed.length} closed ${closed.length===1?'salary':'salaries'}. Separate from this salary’s allocations.</p></div><button class="secondary small-btn" id="salaryHistoryBtn">Salary history</button></section><div class="section-title"><h2>Recent Spending</h2><button id="seeAllSpendingBtn">See all</button></div><section class="recent-spending-list">${recent.map(t=>transactionHTML(t)).join('')||'<div class="empty-state">No spending logged for this salary.</div>'}</section><details class="salary-extra-controls"><summary>Salary settings & early arrival</summary><button type="button" class="secondary full" id="recordEarlySalaryBtn">Record a salary received on a different date</button><p>Set the next expected salary date in Edit allocations. Nothing resets until you confirm receipt.</p></details>`;
  $('#addExpenseBtn').onclick=()=>openExpenseModal();$('#editMoneyBtn').onclick=openMoneyModal;
  for(const id of ['salaryReceivedBtn','recordEarlySalaryBtn'])if($('#'+id))$('#'+id).onclick=openSalaryReceiptModal;
  for(const id of ['salaryHistoryBtn','seeAllSpendingBtn'])$('#'+id).onclick=()=>{state.settings.moneyView='history';state.settings.moneyHistoryPeriod=p.id;save();renderMoney();};
  bindMoneyTransactionControls();
}
function bindMoneyTransactionControls(){
  $$('[data-edit-tx]').forEach(b=>b.onclick=()=>openExpenseModal(b.dataset.editTx));$$('[data-del-tx]').forEach(b=>b.onclick=()=>deleteMoneyTransactionWithUndo(b.dataset.delTx));
}
function renderMoneyHistoryPage(){
  ensureSalaryPeriods();setHeader('Salary History');const periods=state.money.salaryPeriods;
  let id=state.settings.moneyHistoryPeriod||state.money.activeSalaryPeriodId;if(!['all','earlier'].includes(id)&&!periods.some(p=>p.id===id))id=state.money.activeSalaryPeriodId;
  const p=periods.find(p=>p.id===id),pool=id==='all'?state.money.transactions:id==='earlier'?state.money.transactions.filter(t=>!salaryPeriodForTransaction(t)):salaryTransactions(id);
  const bucket=state.settings.moneyHistoryBucket||'all',buckets=[...new Map([...periods.flatMap(salaryDisplayBuckets),...state.money.buckets].map(b=>[b.id,b])).values()],tx=pool.filter(t=>bucket==='all'||t.bucketId===bucket).sort((a,b)=>String(b.date).localeCompare(String(a.date))||Number(b.createdAt||0)-Number(a.createdAt||0)),totals=p?salaryPeriodTotals(p):null,reserve=salaryReserveTotal();
  main.innerHTML=`<button class="back-link" id="moneyBackBtn">${svgIcon('chevronLeft')}<span>Money</span></button><section class="history-month-card"><label><span class="label">Salary period</span><select id="moneyHistoryPeriod"><option value="all" ${id==='all'?'selected':''}>All salary periods & earlier records</option>${[...periods].reverse().map(p=>`<option value="${escapeAttr(p.id)}" ${id===p.id?'selected':''}>${escapeHTML(salaryLabel(p))}${p.closedAt?'':' · Current'}</option>`).join('')}<option value="earlier" ${id==='earlier'?'selected':''}>Earlier records</option></select></label><div><b>${salaryMoney(moneySum(tx))}</b><small>${tx.length} entries${bucket!=='all'?' · filtered':''}</small></div></section><div class="history-chip-row"><button class="filter-chip ${bucket==='all'?'active':''}" data-money-bucket="all">All</button>${buckets.map(b=>`<button class="filter-chip ${bucket===b.id?'active':''}" data-money-bucket="${escapeAttr(b.id)}">${salaryBucketEmoji(b)} ${escapeHTML(b.name)}</button>`).join('')}</div>${p?`<section class="salary-history-summary"><h3>${escapeHTML(salaryLabel(p))}</h3><p>${escapeHTML(salaryRange(p))}${p.closedAt?' · Closed':' · Current'}</p><div class="salary-history-numbers"><div><small>Salary income</small><b>${salaryMoney(totals.income)}</b></div><div><small>Total spent</small><b>${salaryMoney(totals.spent)}</b></div><div><small>${p.closedAt?'Recorded leftover':'Remaining'}</small><b>${totals.balance<0?'−':''}${salaryMoney(Math.abs(totals.balance))}</b></div></div><details><summary>Allocation breakdown</summary>${salaryDisplayBuckets(p).map(b=>budgetRowHTML(b,p.id)).join('')}</details></section>`:''}<section class="salary-reserve-card"><div><small>All closed salaries · net leftover</small><b>${reserve<0?'−':''}${salaryMoney(Math.abs(reserve))}</b><p>Closed salary income minus its logged spending. Corrections to old expenses update this total.</p></div></section><details class="salary-comparison"><summary>Compare salary periods</summary><p class="muted">Spending across your last six salary periods.</p>${moneyBarsHTML()}</details><div class="section-title"><h2>Transactions</h2><button class="secondary small-btn" id="selectTxBtn">${moneySelectMode?'Done':'Select'}</button></div>${moneySelectMode?`<section class="selection-toolbar"><span><b id="selectedTxCount">${moneySelectedIds.size}</b> selected</span><button class="danger-btn small-btn" id="deleteSelectedTx" ${moneySelectedIds.size?'':'disabled'}>Delete selected</button></section>`:''}<section class="spending-history-list">${tx.length?moneyHistoryHTML(tx):'<div class="empty-state">No spending matches this salary and allocation.</div>'}</section>`;
  $('#moneyBackBtn').onclick=()=>{moneySelectMode=false;moneySelectedIds.clear();state.settings.moneyView='home';save();renderMoney();};$('#moneyHistoryPeriod').onchange=e=>{state.settings.moneyHistoryPeriod=e.target.value;moneySelectedIds.clear();save();renderMoney();};
  $$('[data-money-bucket]').forEach(b=>b.onclick=()=>{state.settings.moneyHistoryBucket=b.dataset.moneyBucket;moneySelectedIds.clear();save();renderMoney();});$('#selectTxBtn').onclick=()=>{moneySelectMode=!moneySelectMode;moneySelectedIds.clear();renderMoney();};bindMoneyTransactionControls();
  $$('[data-select-tx]').forEach(cb=>cb.onchange=()=>{if(cb.checked)moneySelectedIds.add(cb.dataset.selectTx);else moneySelectedIds.delete(cb.dataset.selectTx);$('#selectedTxCount').textContent=moneySelectedIds.size;$('#deleteSelectedTx').disabled=!moneySelectedIds.size;});if($('#deleteSelectedTx'))$('#deleteSelectedTx').onclick=deleteSelectedMoneyTransactions;
}
function openExpenseModal(id=null){
  ensureSalaryPeriods();const existing=id?state.money.transactions.find(t=>t.id===id):null;if(id&&!existing)return toast('That spending entry no longer exists');
  let date=existing?.date||todayKey(),periodId=salaryPeriodForTransaction(existing||{date})?.id||'earlier',bucketId=existing?.bucketId||'',saved=false;
  const periods=state.money.salaryPeriods;
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SPENDING</p><h2>${existing?'Edit':'Log'} spending</h2><label><span class="label">Amount (SAR)</span><input class="input expense-amount-large" id="expenseAmount" type="number" min="0" step="0.01" inputmode="decimal" placeholder="0.00" value="${existing?.amount??''}"></label><p class="label expense-category-label">Choose an allocation</p><div class="expense-category-grid" id="expenseCategoryGrid"></div><div class="stack"><label><span class="label">Date</span><input class="input" id="expenseDate" type="date" value="${escapeAttr(date)}"></label><label><span class="label">Note</span><input class="input" id="expenseNote" value="${escapeAttr(existing?.note||'')}" placeholder="e.g. groceries, fuel, haircut"></label><label><span class="label">Salary period</span><select id="expenseSalaryPeriod">${[...periods].reverse().map(p=>`<option value="${escapeAttr(p.id)}" ${periodId===p.id?'selected':''}>${escapeHTML(salaryLabel(p))}</option>`).join('')}<option value="earlier" ${periodId==='earlier'?'selected':''}>Earlier records</option></select></label><p class="muted salary-expense-note">A backdated entry follows its salary period. You can change the period for spending made around payday.</p></div><p id="expenseError" class="form-error" role="alert" hidden></p><button class="primary full" id="saveExpense">${existing?'Save changes':'Save spending'}</button>${existing?'<button class="danger-btn full" id="deleteExpense" style="margin-top:8px">Delete entry</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  const drawCategories=()=>{
    const period=periods.find(p=>p.id===periodId),buckets=period?salaryDisplayBuckets(period):state.money.buckets;
    if(!buckets.some(b=>b.id===bucketId))bucketId='';
    $('#expenseCategoryGrid').innerHTML=buckets.map(b=>`<button type="button" class="expense-category ${bucketId===b.id?'selected':''}" data-expense-category="${escapeAttr(b.id)}" aria-pressed="${bucketId===b.id}"><span aria-hidden="true">${salaryBucketEmoji(b)}</span><b>${escapeHTML(b.name)}</b>${bucketId===b.id?'<i aria-hidden="true">✓</i>':''}</button>`).join('');
    $$('[data-expense-category]',modalContent).forEach(b=>b.onclick=()=>{bucketId=b.dataset.expenseCategory;drawCategories();});
  };
  $('#expenseDate').oninput=e=>{date=e.target.value;periodId=salaryPeriodForDate(date)?.id||'earlier';$('#expenseSalaryPeriod').value=periodId;drawCategories();};
  $('#expenseSalaryPeriod').onchange=e=>{periodId=e.target.value;drawCategories();};
  const error=message=>{$('#expenseError').textContent=message;$('#expenseError').hidden=false;};
  $('#saveExpense').onclick=()=>{
    if(saved)return;const raw=$('#expenseAmount').value,amount=Number(raw),period=periods.find(p=>p.id===periodId);
    if(!raw.trim()||!Number.isFinite(amount)||moneyCents(amount)<=0||amount>1e9)return error('Enter a valid amount greater than zero.');
    if(!validDateKey(date))return error('Choose a valid date.');
    if(!(period?salaryDisplayBuckets(period):state.money.buckets).some(b=>b.id===bucketId))return error('Choose an allocation.');
    const data={amount:moneyCents(amount)/100,bucketId,date,note:$('#expenseNote').value.trim(),createdAt:existing?.createdAt||Date.now(),salaryPeriodId:period?.id||'earlier'};
    saved=true;if(existing)Object.assign(existing,data);else state.money.transactions.push({id:uid('tx'),...data});save();flushStateSave();closeAppSheet(modal);renderMoney();toast(existing?'Spending updated':'Spending logged');
  };
  if(existing)$('#deleteExpense').onclick=()=>{closeAppSheet(modal);deleteMoneyTransactionWithUndo(existing.id);};
  $('#cancelModal').onclick=()=>closeAppSheet(modal);drawCategories();openAppSheet(modal);
}
function openMoneyModal(){
  const p=salaryActivePeriod();prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SALARY PLAN</p><h2>Edit allocations</h2><p class="muted">Changes apply to the current salary and future defaults. Closed salary plans stay saved in history.</p><div class="form-grid"><label><span class="label">Salary income (SAR)</span><input class="input" id="incomeInput" type="number" min="0" step="0.01" value="${Number(state.money.income||0)}"></label><label><span class="label">Usual payday (day of month)</span><input class="input" id="paydayInput" type="number" min="1" max="31" value="${Number(state.profile.paydayDay||28)}"></label><label><span class="label">Next expected salary date</span><input class="input" id="moneyNextSalaryDate" type="date" value="${escapeAttr(state.money.nextSalaryDate)}"></label></div><div id="bucketEditor" class="stack">${state.money.buckets.map(bucketEditorRow).join('')}</div><button type="button" class="secondary full" id="addBucketBtn">+ Add allocation</button><p id="moneyPlanError" class="form-error" role="alert" hidden></p><button class="primary full" id="saveMoney" style="margin-top:12px">Save salary plan</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  $('#paydayInput').oninput=()=>{const day=Number($('#paydayInput').value);if(Number.isInteger(day)&&day>=1&&day<=31)$('#moneyNextSalaryDate').value=salaryNextDefault(p.salaryMonth,p.startDate,day);};
  $('#addBucketBtn').onclick=()=>{const wrap=document.createElement('div');wrap.innerHTML=bucketEditorRow({id:uid('bucket'),name:'New allocation',target:0});$('#bucketEditor').appendChild(wrap.firstElementChild);bindBucketDeleteButtons();};bindBucketDeleteButtons();
  $('#saveMoney').onclick=()=>{
    const income=Number($('#incomeInput').value),day=Number($('#paydayInput').value),next=$('#moneyNextSalaryDate').value,rows=$$('.bucket-editor',modalContent),buckets=rows.map(row=>({id:row.dataset.bucketId||uid('bucket'),name:$('.bucket-name',row).value.trim(),target:Number($('.bucket-target',row).value)}));
    if(!$('#incomeInput').value.trim()||!Number.isFinite(income)||income<0||income>1e9||!Number.isInteger(day)||day<1||day>31||!validDateKey(next)||next<=p.startDate||!buckets.length||buckets.some(b=>!b.name||!Number.isFinite(b.target)||b.target<0||b.target>1e9)){$('#moneyPlanError').textContent='Check the salary amount, payday, next salary date and allocation values.';$('#moneyPlanError').hidden=false;return;}
    const before={income:state.money.income,buckets:deepClone(state.money.buckets),next:state.money.nextSalaryDate,payday:state.profile.paydayDay,period:deepClone(p)};
    createSafetySnapshot('Before salary allocation change');state.money.income=moneyCents(income)/100;state.profile.paydayDay=day;state.money.nextSalaryDate=next;state.money.buckets=salaryBucketSnapshot(buckets);captureCurrentMoneyPlan();save();flushStateSave();const after=salaryUndoSignature();closeAppSheet(modal);renderMoney();toast('Salary plan updated','Undo',()=>{if(salaryUndoSignature()!==after)return toast('Money data changed after this edit. Review the current plan instead.');state.money.income=before.income;state.money.buckets=before.buckets;state.money.nextSalaryDate=before.next;state.profile.paydayDay=before.payday;Object.keys(p).forEach(k=>delete p[k]);Object.assign(p,before.period);save();flushStateSave();renderMoney();});
  };
  $('#cancelModal').onclick=()=>closeAppSheet(modal);openAppSheet(modal);
}

function moneyPlanTotal(){return state.money.buckets.reduce((a,b)=>a+Number(b.target||0),0);}

function recentMonthKeys(count=6){
  const out=[]; const now=new Date();
  for(let i=count-1;i>=0;i--){const d=new Date(now.getFullYear(),now.getMonth()-i,1,12,0,0,0);out.push(monthKey(d));}
  return out;
}
function moneyMonthLabel(mk){const [y,m]=mk.split('-').map(Number);return new Date(y,m-1,1,12).toLocaleDateString(currentLocale(),{month:'short'});}
function moneyMonthLongLabel(mk){const [y,m]=mk.split('-').map(Number);return new Date(y,m-1,1,12).toLocaleDateString(currentLocale(),{month:'long',year:'numeric'});}
function moneyAvailableMonths(){
  const set=new Set([monthKey(),...state.money.transactions.map(t=>String(t.date||'').slice(0,7)).filter(x=>/^\d{4}-\d{2}$/.test(x)),...Object.keys(state.money.planHistory||{})]);
  return [...set].sort().reverse();
}
function moneyBucketPlanForMonth(mk,bucketId){
  const snap=state.money.bucketPlanHistory?.[mk];
  if(Array.isArray(snap)){const b=snap.find(x=>x.id===bucketId);if(b)return Number(b.target||0);}
  return mk===monthKey()?Number(state.money.buckets.find(x=>x.id===bucketId)?.target||0):0;
}
function moneyTrendHTML(bucketId='all'){
  const keys=recentMonthKeys(6);
  const rows=keys.map(k=>{const tx=transactionsForMonth(k).filter(t=>bucketId==='all'||t.bucketId===bucketId);const spent=tx.reduce((a,t)=>a+Number(t.amount||0),0);const plan=bucketId==='all'?Number(state.money.planHistory?.[k]||0):moneyBucketPlanForMonth(k,bucketId);return {key:k,label:moneyMonthLabel(k),spent,plan};});
  const max=Math.max(1,...rows.map(r=>Math.max(r.spent,r.plan||0)));
  const label=bucketId==='all'?'All spending':(state.money.buckets.find(b=>b.id===bucketId)?.name||'Selected allocation');
  return `<section class="card flat money-trend-card"><div class="money-trend-legend"><span><i class="spent-dot"></i>${escapeHTML(label)}</span><span>same scale across months</span></div>${rows.map(r=>`<div class="money-trend-row"><span>${escapeHTML(r.label)}</span><div class="money-trend-track"><i style="width:${Math.round(r.spent/max*100)}%"></i>${r.plan?`<em style="left:${Math.min(100,Math.round(r.plan/max*100))}%" title="Plan ${fmtMoney(r.plan)}"></em>`:''}</div><b>${r.spent?fmtMoney(r.spent):'—'}</b></div>`).join('')}</section>`;
}
function transactionsForMonth(mk){return state.money.transactions.filter(t=>String(t.date||'').startsWith(mk));}
function moneyFilteredTransactions(month,bucket){
  return [...state.money.transactions].filter(t=>(month==='all'||String(t.date||'').startsWith(month))&&(bucket==='all'||t.bucketId===bucket)).sort((a,b)=>String(b.date||'').localeCompare(String(a.date||''))||Number(b.createdAt||0)-Number(a.createdAt||0));
}
function spentForBucket(bucketId,mk=monthKey()){return transactionsForMonth(mk).filter(t=>t.bucketId===bucketId).reduce((a,t)=>a+Number(t.amount||0),0);}

function transactionHTML(t,{selectable=false}={}) {
  const b=salaryBucketInfo(t);
  return `<div class="transaction ${selectable?'selectable-history':''}">${selectable?`<input class="check history-check" type="checkbox" data-select-tx="${escapeAttr(t.id)}" ${moneySelectedIds.has(t.id)?'checked':''} aria-label="Select spending entry">`:''}<span class="transaction-icon">${svgIcon(t.bucketId==='food'?'fork':t.bucketId==='car'?'car':'wallet')}</span><div class="transaction-copy"><b>${escapeHTML(t.note||b?.name||'Spending')}</b><small>${escapeHTML(b?.name||'Other')} · ${escapeHTML(formatDateShort(parseDateKey(t.date)))}</small></div><div class="transaction-amount"><b>−${salaryMoney(t.amount)}</b>${selectable?'':`<div class="row"><button class="text-button tiny" data-edit-tx="${t.id}">Edit</button><button class="text-button tiny danger-text" data-del-tx="${t.id}">Delete</button></div>`}</div></div>`;
}
function moneyHistoryHTML(list){
  let last=''; let out='';
  list.forEach(t=>{if(t.date!==last){last=t.date;out+=`<div class="history-date"><span>${escapeHTML(parseDateKey(t.date).toLocaleDateString(currentLocale(),{weekday:'short',month:'short',day:'numeric',year:'numeric'}))}</span></div>`;}out+=transactionHTML(t,{selectable:moneySelectMode});});
  return out;
}
function moneyMonthSummaryHTML(mk){
  const spent=transactionsForMonth(mk).reduce((a,t)=>a+Number(t.amount||0),0); const plan=Number(state.money.planHistory?.[mk]||0); const diff=plan-spent;
  const by=state.money.buckets.map(b=>({name:b.name,spent:spentForBucket(b.id,mk)})).sort((a,b)=>b.spent-a.spent); const top=by.find(x=>x.spent>0);
  return `<div class="month-closeout"><div><small>${escapeHTML(moneyMonthLongLabel(mk))}</small><b>${fmtMoney(spent)} spent</b></div><div><small>${plan?'vs saved allocation':'allocation'}</small><b>${plan?(diff>=0?`${fmtMoney(diff)} left`:`${fmtMoney(Math.abs(diff))} over`):'—'}</b></div><div><small>top category</small><b>${top?`${escapeHTML(top.name)} · ${fmtMoney(top.spent)}`:'—'}</b></div></div>`;
}
function deleteMoneyTransactionWithUndo(id){
  const idx=state.money.transactions.findIndex(t=>t.id===id); if(idx<0)return; const removed=state.money.transactions[idx];state.money.transactions.splice(idx,1);save();renderMoney();toast('Spending entry deleted','Undo',()=>{state.money.transactions.splice(Math.min(idx,state.money.transactions.length),0,removed);save();renderMoney();});
}
function deleteSelectedMoneyTransactions(){
  if(!moneySelectedIds.size)return; const removed=state.money.transactions.map((t,i)=>({t,i})).filter(x=>moneySelectedIds.has(x.t.id)); state.money.transactions=state.money.transactions.filter(t=>!moneySelectedIds.has(t.id));moneySelectedIds.clear();moneySelectMode=false;save();renderMoney();toast(`${removed.length} entries deleted`,'Undo',()=>{removed.sort((a,b)=>a.i-b.i).forEach(x=>state.money.transactions.splice(Math.min(x.i,state.money.transactions.length),0,x.t));save();renderMoney();});
}

function appStartDateLegacy(){
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
function gymSessionDatesLive(){
  const set=new Set((state.gym.sessions||[]).map(String));
  Object.keys(state.records).forEach(key=>{
    const d=parseDateKey(key);itemsForDate(d).filter(i=>i.category==='Fitness'&&/gym/i.test(i.title||'')).forEach(i=>{if(getStatus(i,key)==='done')set.add(key);});
  });
  (state.gym.logs||[]).forEach(l=>{if(l.date&&gymWorkingSets(l).length)set.add(l.date);});
  (state.gym.sessionExcluded||[]).forEach(k=>set.delete(String(k)));
  return set;
}
function mealDayIsCompleteLive(date){
  const key=todayKey(date); const meals=itemsForDate(date).filter(i=>i.category==='Food');
  return meals.length>=3 && meals.every(i=>getStatus(i,key)==='done');
}
function pastClassOccurrencesLive(dates){
  const now=new Date(); const nowKey=todayKey(now); const nowMin=currentMinutes(); const out=[];
  dates.forEach(date=>{const key=todayKey(date);itemsForDate(date,{ignoreOverrides:true}).filter(i=>i.isClass).forEach(i=>{
    const ended=key<nowKey || (key===nowKey && minutesFromTime(i.end||i.start)<nowMin);
    const status=getStatus(i,key); if(ended && status!=='cancelled') out.push({date,key,item:i,done:status==='done'});
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
function perfectClassDaysCountLegacy(){
  return dateRange('all').filter(d=>{const key=todayKey(d);const items=itemsForDate(d,{ignoreOverrides:true}).filter(i=>i.isClass&&getStatus(i,key)!=='cancelled');if(!items.length)return false;const ended=key<todayKey()||items.every(i=>itemEndSortMinutes(i)<currentMinutes());return ended&&items.every(i=>getStatus(i,key)==='done');}).length;
}
function perfectWeeksCountLegacy(){
  const appStart=startOfWeek(appStartDate()), currentStart=startOfWeek(new Date()); let count=0;
  for(let ws=new Date(appStart); ws<=currentStart; ws=addDays(ws,7)){
    const days=Array.from({length:7},(_,i)=>addDays(ws,i));
    if(days[6]>new Date() && todayKey(days[6])!==todayKey()) break;
    if(days.some(d=>todayKey(d)>todayKey())) continue;
    const valid=days.every(d=>{const items=itemsForMode(itemsForDate(d),modeForDate(todayKey(d)));return items.length>0&&dayCompletion(d)===100;});
    if(valid)count++;
  }
  return count;
}
function spendingForRange(range){
  if(range==='all')return (state.money.transactions||[]).reduce((a,t)=>a+Number(t.amount||0),0);
  const keys=new Set(dateRange(range).map(todayKey));
  return (state.money.transactions||[]).filter(t=>keys.has(t.date)).reduce((a,t)=>a+Number(t.amount||0),0);
}
function maxStrengthGainPct(){
  let best=0;
  (state.gym.exercises||[]).forEach(ex=>{const logs=gymProgressLogs(ex.id);if(logs.length>=2){const first=Number(logs[0].weight||0), max=Math.max(...logs.map(x=>Number(x.weight||0)));if(first>0)best=Math.max(best,Math.round((max-first)/first*100));}});
  return best;
}
function achievementData(){
  const all=rangeMetrics('all'), gymAll=gymSessionDates().size, meals=all.mealDays, projects=totalProjectSessions(), perfectClasses=perfectClassDaysCount(), perfectWeeks=perfectWeeksCount(), strength=maxStrengthGainPct();
  const specs=[
    ['consistent_14','Two solid weeks','Finish 14 days at 70% or better.',all.goodDays,14],
    ['gym_12','Gym routine','Complete 12 gym sessions.',gymAll,12],
    ['gym_30','Locked in','Complete 30 gym sessions.',gymAll,30],
    ['meals_20','Food rhythm','Hit all 3 meals on 20 different days.',meals,20],
    ['class_20','Show up','Attend 20 tracked university classes.',all.attended,20],
    ['class_days_10','Reliable student','Complete every class on 10 class days.',perfectClasses,10],
    ['project_15','Builder','Log 15 focused project sessions.',projects,15],
    ['strength_20','Stronger','Improve one tracked lift by at least 20%.',strength,20],
    ['good_50','Reset 50','Finish 50 good days at 70% or better.',all.goodDays,50],
    ['perfect_week','Perfect Week','Finish every tracked day in a completed week.',perfectWeeks,1]
  ];
  return specs.map(([id,title,desc,value,baseTarget])=>{
    const tiers=[baseTarget,baseTarget*2,baseTarget*4,baseTarget*8];
    const achieved=tiers.filter(t=>value>=t).length;
    const level=Math.max(0,achieved);
    const nextTarget=tiers.find(t=>value<t) || baseTarget*16;
    const tierStart=level?tiers[Math.min(level-1,tiers.length-1)]:0;
    const tierSpan=Math.max(1,nextTarget-tierStart);
    const tierProgress=clamp(value-tierStart,0,tierSpan);
    return {id,title,desc,unlocked:value>=baseTarget,value,baseTarget,level,nextTarget,tierStart,tierProgress,tierSpan,progress:Math.min(baseTarget,value),target:baseTarget};
  });
}
function monthMetrics(date=new Date()){
  const start=new Date(date.getFullYear(),date.getMonth(),1,12); const end=new Date(); const same=date.getFullYear()===end.getFullYear()&&date.getMonth()===end.getMonth(); const last=same?end:new Date(date.getFullYear(),date.getMonth()+1,0,12); const m=metricsForDates(datesBetween(start,last,40)); const mk=monthKey(date); const spending=transactionsForMonth(mk).reduce((a,t)=>a+Number(t.amount||0),0);return {...m,mk,spending};
}
function monthInReviewHTML(){
  const m=monthMetrics(); const label=new Date().toLocaleDateString(undefined,{month:'long'});return `<section class="card flat month-review-card"><div class="row between center"><div><p class="eyebrow">${escapeHTML(label.toUpperCase())}</p><h3 style="margin:0">Month in review</h3></div><span class="badge">LIVE</span></div><div class="month-review-grid"><div><small>Gym</small><b>${m.gym}</b><span>sessions</span></div><div><small>Classes</small><b>${m.classes?m.classPct+'%':'—'}</b><span>${m.attended}/${m.classes}</span></div><div><small>3 meals</small><b>${m.mealDays}</b><span>days</span></div><div><small>Spending</small><b>${fmtMoney(m.spending)}</b><span>logged</span></div><div><small>Completion</small><b>${m.avgCompletion}%</b><span>average</span></div><div><small>Good days</small><b>${m.goodDays}</b><span>70%+</span></div></div></section>`;
}
function lightweightInsights(){
  const m30=rangeMetrics('30'), p30=previous30Metrics(); const out=[];
  if(m30.classes) out.push(`Class attendance is ${m30.classPct}% over the last 30 days (${m30.attended}/${m30.classes}).`);
  if(m30.gym||p30.gym) out.push(`Gym is ${m30.gym>p30.gym?`${m30.gym-p30.gym} session${m30.gym-p30.gym===1?'':'s'} up`:m30.gym<p30.gym?`${p30.gym-m30.gym} session${p30.gym-m30.gym===1?'':'s'} down`:'unchanged'} versus the previous 30 days.`);
  if(m30.mealDays||p30.mealDays) out.push(`Three-meal days: ${m30.mealDays} in the last 30 days versus ${p30.mealDays} in the previous 30.`);
  const currentSpend=transactionsForMonth(monthKey()).reduce((a,t)=>a+Number(t.amount||0),0); const prevDate=new Date();prevDate.setMonth(prevDate.getMonth()-1);const prevSpend=transactionsForMonth(monthKey(prevDate)).reduce((a,t)=>a+Number(t.amount||0),0);if(currentSpend||prevSpend)out.push(`Spending this month is ${fmtMoney(currentSpend)}${prevSpend?` versus ${fmtMoney(prevSpend)} last month`:''}.`);
  const tracked=Object.keys(state.records).filter(k=>state.records[k]?.itemStatus&&Object.keys(state.records[k].itemStatus).length).length;
  if(tracked>=7){const byDay=Array.from({length:7},()=>[]);Object.keys(state.records).filter(k=>isTrackedDate(k)&&k<=todayKey()&&Object.keys(state.records[k]?.itemStatus||{}).length).forEach(k=>{const d=parseDateKey(k);byDay[d.getDay()].push(dayCompletion(d));});const avgs=byDay.map(a=>a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length):-1);const best=Math.max(...avgs);if(best>=0)out.push(`${DAY_LONG[avgs.indexOf(best)]} is your strongest tracked day at about ${best}% completion.`);}
  const sleep30=sleepAverageForDays(30);if(sleep30.count>=3)out.push(`Average sleep is ${formatDurationHours(sleep30.average)} over ${sleep30.count} logged night${sleep30.count===1?'':'s'} in the last 30 days.`);
  const perfectWeeks=perfectWeeksCount();if(perfectWeeks)out.push(`You have completed ${perfectWeeks} perfect week${perfectWeeks===1?'':'s'} with every scheduled item finished.`);
  if(!out.length)out.push('Keep using Reset and useful patterns will appear here automatically.');
  return out.slice(0,4);
}
function renderMore() {
  const view=state.settings.moreView||'home';
  if(view==='gym')return renderGym();if(view==='health')return renderHealth();if(view==='sleep')return renderSleep();if(view==='car')return renderCar();if(view==='projects')return renderProjects();if(view==='progress')return renderProgress();if(view.startsWith('project:'))return renderProjectDetail(view.slice(8));
  setHeader('More');const unlocked=achievementData().filter(a=>a.unlocked).length;
  main.innerHTML=`<div class="section-title first-section"><h2>Life Tools</h2></div><section class="tool-grid mock-tools">${toolCard('gym','Gym','Workout','dumbbell',`${gymSessionDates().size} sessions`)}${toolCard('health','Health','Body weight and simple progress','heart',`${state.health.weightLogs.length} entries`)}${toolCard('sleep','Sleep','Duration, timing and consistency.','moon',sleepToolMeta())}${toolCard('car','Car','Fuel, service & rego','car',state.car.model||'Vehicle')}${toolCard('projects','Projects','Track your progress','folder',`${state.projects.filter(p=>!p.archived).length} active`)}</section><div class="section-title"><h2>Progress</h2></div><section class="progress-link-grid single-progress-link"><button class="progress-link" data-more-view="progress"><span class="tool-icon blue">${svgIcon('chart')}</span><span><b>Progress & achievements</b><small>Insights, trends and long-term goals</small></span><em>${unlocked} earned</em></button></section>`;
  $$('[data-more-view]').forEach(b=>b.onclick=()=>{const v=b.dataset.moreView;moreHomeScrollY=pageScrollY();state.settings.moreView=v;save();renderMore();pageScrollTo({top:0,behavior:'auto'});});localizeTree(main);
}
function renderProgress(){
  setHeader('Progress');
  const range=state.settings.statsRange||'30',metrics=rangeMetrics(range),ach=achievementData(),unlocked=ach.filter(a=>a.unlocked).length,m30=rangeMetrics('30'),p30=previous30Metrics();
  const rangeLabel=range==='7'?'Last 7 days':range==='30'?'Last 30 days':`Since ${appStartDate().toLocaleDateString(currentLocale(),{month:'short',year:'numeric'})}`;
  main.innerHTML=`${moreBack()}<div class="segmented mock-segmented"><button data-range="7" class="${range==='7'?'active':''}">7 days</button><button data-range="30" class="${range==='30'?'active':''}">30 days</button><button data-range="all" class="${range==='all'?'active':''}">All time</button></div><section class="progress-range-title"><small>VIEWING</small><b>${escapeHTML(rangeLabel)}</b></section><section class="progress-color-grid"><article class="pmetric red"><span>${svgIcon('dumbbell')}</span><small>Gym Sessions</small><b>${metrics.gym}</b></article><article class="pmetric blue"><span>${svgIcon('university')}</span><small>Class Attendance</small><b>${metrics.classes?metrics.classPct+'%':'—'}</b></article><article class="pmetric green"><span>${svgIcon('fork')}</span><small>Three-Meal Days</small><b>${metrics.mealDays}</b></article><article class="pmetric yellow"><span>${svgIcon('money')}</span><small>Money Spent</small><b>${fmtMoney(spendingForRange(range))}</b></article><article class="pmetric purple"><span>${svgIcon('check')}</span><small>Daily Completion</small><b>${metrics.avgCompletion}%</b></article><article class="pmetric cyan"><span>${svgIcon('heart')}</span><small>Weight</small><b>${latestWeightText()}</b></article></section>${range==='30'?monthInReviewHTML():''}<div class="section-title"><h2>Insights</h2></div><section class="insight-list mock-insights">${lightweightInsights().map((x,i)=>`<div class="insight-row"><span>${svgIcon(i%2?'wallet':'spark')}</span><p>${escapeHTML(x)}</p></div>`).join('')}</section><div class="section-title"><h2>Achievements</h2><span class="muted tiny">${unlocked}/${ach.length}</span></div><section class="achievement-grid">${ach.map(a=>{const pct=Math.round(a.tierProgress/a.tierSpan*100);return `<article class="achievement ${a.unlocked?'unlocked':''}"><span>${a.unlocked?svgIcon('trophy'):'○'}</span><div><div class="achievement-title-row"><b>${escapeHTML(a.title)}</b>${a.level?`<i>Level ${a.level}</i>`:''}</div><small>${escapeHTML(a.desc)}</small><div class="achievement-progress"><i style="width:${pct}%"></i></div><em>${a.value}/${a.nextTarget}${a.unlocked?' · next tier':''}</em></div></article>`}).join('')}</section><div class="section-title"><h2>30-day comparison</h2></div><section class="comparison-grid"><div class="comparison-card"><small>Gym</small><b>${m30.gym}</b><span>${signedDelta(m30.gym,p30.gym)}</span></div><div class="comparison-card"><small>Meals</small><b>${m30.mealDays}</b><span>${signedDelta(m30.mealDays,p30.mealDays)}</span></div><div class="comparison-card"><small>Classes</small><b>${m30.classes?m30.classPct+'%':'—'}</b><span>${p30.classes?signedDelta(m30.classPct,p30.classPct,'%'):'—'}</span></div><div class="comparison-card"><small>Good days</small><b>${m30.goodDays}</b><span>${signedDelta(m30.goodDays,p30.goodDays)}</span></div></section>`;
  bindMoreBack();$$('[data-range]').forEach(b=>b.onclick=()=>{state.settings.statsRange=b.dataset.range;save();renderProgress();});localizeTree(main);
}
function latestWeightText(){const x=[...(state.health.weightLogs||[])].sort((a,b)=>String(a.date).localeCompare(String(b.date))).pop();return x?`${Number(x.weight).toFixed(1)} kg`:'—';}

function toolCard(view,title,desc,icon,meta=''){const tone=({gym:'blue',health:'purple',sleep:'cyan',money:'green',car:'orange',projects:'violet'})[view]||'blue';return `<button class="tool-card" data-more-view="${escapeAttr(view)}"><span class="tool-icon ${tone}">${svgIcon(icon)}</span><span class="tool-card-copy"><b>${escapeHTML(title)}</b><small>${escapeHTML(desc)}</small>${meta?`<em>${escapeHTML(meta)}</em>`:''}</span></button>`;}
function toolLink(view,title,desc){return `<button class="tool-link" data-more-view="${escapeAttr(view)}"><span><b>${escapeHTML(title)}</b><small>${escapeHTML(desc)}</small></span><span class="tool-chevron">${svgIcon('chevronRight')}</span></button>`;}
function moreBack(label='More'){return `<button class="back-link" id="moreBackBtn">${svgIcon('chevronLeft')}<span>${escapeHTML(label)}</span></button>`;}
function bindMoreBack(){const b=$('#moreBackBtn');if(b)b.onclick=()=>{const y=moreHomeScrollY;state.settings.moreView='home';save();renderMore();requestAnimationFrame(()=>pageScrollTo({top:y,behavior:'auto'}));};}
function itemIsFixed(item) { return isDayAnchor(item) || item.fixed===true || item.isClass===true; }
function itemIsNonBlocking(item){ return item?.nonBlocking===true || item?.itemType==='reminder'; }
function itemAllowsOverlap(item){ return itemIsNonBlocking(item) || item?.allowOverlap===true; }
function itemCountsForProgress(item){ return !itemIsNonBlocking(item); }
function itemManualMoveLocked(item) { return itemIsFixed(item) || item.manualLocked===true; }
function isClosedStatus(status){ return ['done','missed','deferred','dropped','cancelled'].includes(status); }
function itemDurationForMove(item){ return Math.max(5,durationMinutes(item)); }
function setItemTimeOverride(item,key,startTime){
  const rec=ensureRecord(key); const occ=occurrenceKey(item), dur=itemDurationForMove(item); const start=minutesFromTime(startTime); const existing=rec.timeOverrides[occ]||{};
  rec.timeOverrides[occ]={...existing,start:minutesToTime(start),end:minutesToTime(start+dur),manual:true,adaptive:false};
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
function findOpenSlotBackward(latestEnd,duration,blocked,floor=0) {
  if(latestEnd-duration<floor)return null;
  let end=latestEnd;
  const sorted=[...blocked].sort((a,b)=>b.start-a.start);
  for(let guard=0;guard<100;guard++) {
    const start=end-duration;
    if(start<floor) return null;
    const collision=sorted.find(x=>start < x.end && end > x.start);
    if(!collision) return start;
    end=collision.start;
  }
  return null;
}
function buildAdaptiveRestartPlan(date=new Date(),preserveManual=false) {
  const key=todayKey(date),rec=ensureRecord(key),manualMap=rec.timeOverrides||{};
  let baseItems=itemsForMode(itemsForDate(date,{ignoreOverrides:true}),currentMode());
  if(preserveManual)baseItems=baseItems.map(i=>{const ov=manualMap[occurrenceKey(i)];return ov?.manual?{...i,...ov}:i;});
  const now=roundUpMinutes(currentMinutes(),5),sleepLimit=Math.max(now+30,daySleepAbsoluteMinutes(date));
  // Keep one-day wake/sleep anchors even while the rest of the day is rebuilt.
  const overrides={};Object.entries(manualMap).forEach(([occ,ov])=>{if(ov?.dayAnchor)overrides[occ]={...ov};});
  const candidates=baseItems.filter(i=>getStatus(i,key)!=='done'&&getStatus(i,key)!=='cancelled'&&getStatus(i,key)!=='deferred'&&getStatus(i,key)!=='dropped');
  const fixed=candidates.filter(itemIsFixed),movable=candidates.filter(i=>!itemIsFixed(i));
  const missedFixed=fixed.filter(i=>!isDayAnchor(i)&&itemEndSortMinutes(i)<now);
  const futureFixed=fixed.filter(i=>itemEndSortMinutes(i)>=now).map(i=>({start:itemSortMinutes(i),end:itemEndSortMinutes(i),item:i}));
  const blocked=[...futureFixed],moved=[];let lastMealEnd=null;
  const ordered=[...movable].sort((a,b)=>{const aOver=itemEndSortMinutes(a)<now||getStatus(a,key)==='missed',bOver=itemEndSortMinutes(b)<now||getStatus(b,key)==='missed';const aRank=aOver&&a.essential?0:aOver?1:2,bRank=bOver&&b.essential?0:bOver?1:2;return aRank-bRank||itemSortMinutes(a)-itemSortMinutes(b);});
  for(const item of ordered){
    const originalStart=itemSortMinutes(item),overdue=itemEndSortMinutes(item)<now||getStatus(item,key)==='missed',normalDuration=durationMinutes(item),duration=overdue?Math.max(5,Math.min(normalDuration,Number(item.minMinutes||normalDuration))):normalDuration;
    let desired=overdue?now:Math.max(now,originalStart);if(item.category==='Food'&&lastMealEnd!==null)desired=Math.max(desired,lastMealEnd+150);
    const slot=findOpenSlot(desired,duration,blocked,sleepLimit);if(slot===null)continue;
    const newStart=slot,newEnd=slot+duration;blocked.push({start:newStart,end:newEnd,item});if(item.category==='Food')lastMealEnd=newEnd;
    const wasManual=!!manualMap[occurrenceKey(item)]?.manual;
    if(newStart!==originalStart||duration!==normalDuration||overdue||wasManual){const ov={start:minutesToTime(newStart),end:minutesToTime(newEnd),dayOffset:Math.floor(newStart/1440),adaptive:true,manual:preserveManual&&wasManual};if(item.id==='breakfast'&&overdue){ov.title='First meal + protein';ov.detail='Eat now. Do not let waking late turn into not eating.';}overrides[occurrenceKey(item)]=ov;moved.push({...item,...ov});}
  }
  return {key,now,overrides,moved,missedFixed,preserveManual,manualCount:Object.values(manualMap).filter(x=>x?.manual&&!x?.dayAnchor).length};
}
function applyAdaptiveRestart(plan) {
  const rec=ensureRecord(plan.key);rec.timeOverrides=plan.overrides;
  for(const item of plan.missedFixed){if(getStatus(item,plan.key)!=='done'&&getStatus(item,plan.key)!=='cancelled')rec.itemStatus[occurrenceKey(item)]='missed';}
  for(const item of plan.moved){if(rec.itemStatus[occurrenceKey(item)]==='missed')delete rec.itemStatus[occurrenceKey(item)];}
  Object.keys(rec.itemStatus).forEach(k=>{if(rec.itemStatus[k]!=='missed')return;const item=itemsForDate(parseDateKey(plan.key),{ignoreOverrides:true}).find(x=>occurrenceKey(x)===k);if(item&&!itemIsFixed(item))delete rec.itemStatus[k];});
  rec.resetCount=(rec.resetCount||0)+1;rec.restartAt=new Date().toISOString();save();
}
function openRestartModal() {
  const keepPlan=buildAdaptiveRestartPlan(new Date(),true),resetPlan=buildAdaptiveRestartPlan(new Date(),false),manualCount=keepPlan.manualCount,p=manualCount?keepPlan:resetPlan,missCount=p.missedFixed.length;
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">ADAPTIVE RESTART</p><h2>Rebuild the rest of today.</h2><p class="muted">Wake and sleep anchors stay fixed for this day. Classes and appointments are never moved.${missCount?` ${missCount} fixed event${missCount===1?' is':'s are'} already past and will stay visible as missed.`:''}</p>${manualCount?`<div class="card flat restart-preview"><b>${manualCount} manual move${manualCount===1?'':'s'} detected</b><small>Choose whether Reset should keep the order/timing choices you made or return to the original schedule before rebuilding.</small></div><button class="primary full" id="restartKeepMoves" style="margin-top:12px">Rebuild + keep my moves</button><button class="secondary full" id="restartResetMoves" style="margin-top:8px">Reset my moves + rebuild</button>`:`<div class="card flat restart-preview"><b>Adaptive rebuild</b><small>Overdue flexible tasks move forward around fixed events.</small></div><button class="primary full" id="restartResetMoves" style="margin-top:12px">Rebuild today</button>`}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);if($('#restartKeepMoves'))$('#restartKeepMoves').onclick=()=>{applyAdaptiveRestart(keepPlan);closeAppSheet(modal);toast('Today rebuilt and your manual order was kept');renderToday();};$('#restartResetMoves').onclick=()=>{applyAdaptiveRestart(resetPlan);closeAppSheet(modal);toast(manualCount?'Today rebuilt from the original schedule':'Today rebuilt around the current time');renderToday();};$('#cancelModal').onclick=()=>closeAppSheet(modal);
}
function dailyWakeItem(date){return itemsForDate(date,{ignoreOverrides:true}).find(i=>i.id==='wake')||null;}
function dailySleepItem(date){return itemsForDate(date,{ignoreOverrides:true}).find(i=>i.id==='sleep')||null;}
function dayWakeTime(date){const key=todayKey(date),wake=dailyWakeItem(date);if(!wake)return state.profile.wakeTarget||'08:00';const ov=state.records[key]?.timeOverrides?.[occurrenceKey(wake)];return ov?.start||wake.start;}
function daySleepTime(date){const key=todayKey(date),sleep=dailySleepItem(date);if(!sleep)return state.profile.sleepTarget||'23:30';const ov=state.records[key]?.timeOverrides?.[occurrenceKey(sleep)];return ov?.start||sleep.start;}
function daySleepOffset(date){const key=todayKey(date),sleep=dailySleepItem(date);if(!sleep)return sleepDayOffsetForTime(state.profile.sleepTarget||'23:30');const ov=state.records[key]?.timeOverrides?.[occurrenceKey(sleep)];return Number(ov?.dayOffset??sleep.dayOffset??sleepDayOffsetForTime(ov?.start||sleep.start));}
function daySleepAbsoluteMinutes(date){return minutesFromTime(daySleepTime(date))+1440*daySleepOffset(date);}
function setDayWakeOverride(date,time){
  const key=todayKey(date),wake=dailyWakeItem(date);if(!wake)return false;
  const rec=ensureRecord(key),occ=occurrenceKey(wake),normalized=minutesToTime(minutesFromTime(time)),routine=minutesToTime(minutesFromTime(wake.start));
  if(normalized===routine){delete rec.timeOverrides[occ];return false;}
  const dur=durationMinutes(wake),start=minutesFromTime(normalized);rec.timeOverrides[occ]={start:normalized,end:minutesToTime(start+dur),dayOffset:0,manual:true,adaptive:false,dayAnchor:true};return true;
}
function setDaySleepOverride(date,time){
  const key=todayKey(date),sleep=dailySleepItem(date);if(!sleep)return false;
  const rec=ensureRecord(key),occ=occurrenceKey(sleep),normalized=minutesToTime(minutesFromTime(time)),routine=minutesToTime(minutesFromTime(sleep.start));
  if(normalized===routine){delete rec.timeOverrides[occ];return false;}
  const dur=durationMinutes(sleep),off=sleepDayOffsetForTime(normalized),start=minutesFromTime(normalized);rec.timeOverrides[occ]={start:normalized,end:minutesToTime(start+dur),dayOffset:off,manual:true,adaptive:false,dayAnchor:true};return true;
}
function buildFutureDayPlan(date,preserveManual=true,wakeTime=null,sleepTime=null){
  const key=todayKey(date),rec=ensureRecord(key),manualMap=rec.timeOverrides||{},mode=modeForDate(key);let baseItems=itemsForMode(itemsForDate(date,{ignoreOverrides:true}),mode);
  const wakeBase=baseItems.find(i=>i.id==='wake'),sleepBase=baseItems.find(i=>i.id==='sleep'),baseWake=minutesFromTime(wakeBase?.start||state.profile.wakeTarget||'08:00'),chosenWake=minutesFromTime(wakeTime||manualMap[wakeBase?occurrenceKey(wakeBase):'']?.start||wakeBase?.start||state.profile.wakeTarget||'08:00');
  const chosenSleepTime=sleepTime||manualMap[sleepBase?occurrenceKey(sleepBase):'']?.start||sleepBase?.start||state.profile.sleepTarget||'23:30',chosenSleepOff=sleepDayOffsetForTime(chosenSleepTime),sleepLimit=minutesFromTime(chosenSleepTime)+1440*chosenSleepOff;
  if(preserveManual)baseItems=baseItems.map(i=>{const ov=manualMap[occurrenceKey(i)];return ov?.manual?{...i,...ov}:i;});
  const overrides={},blocked=[],moved=[];let lastMealEnd=null;
  if(wakeBase){const dur=durationMinutes(wakeBase);overrides[occurrenceKey(wakeBase)]={start:minutesToTime(chosenWake),end:minutesToTime(chosenWake+dur),dayOffset:0,manual:true,adaptive:false,dayAnchor:true};blocked.push({start:chosenWake,end:chosenWake+dur,item:wakeBase});}
  if(sleepBase){const dur=durationMinutes(sleepBase),abs=minutesFromTime(chosenSleepTime)+1440*chosenSleepOff;overrides[occurrenceKey(sleepBase)]={start:chosenSleepTime,end:minutesToTime(abs+dur),dayOffset:chosenSleepOff,manual:true,adaptive:false,dayAnchor:true};}
  for(const item of baseItems){if(isDayAnchor(item))continue;if(itemIsFixed(item))blocked.push({start:itemSortMinutes(item),end:itemEndSortMinutes(item),item});}
  const wakeShift=chosenWake-baseWake,movable=baseItems.filter(i=>!isDayAnchor(i)&&!itemIsFixed(i)&&getStatus(i,key)!=='cancelled').sort((a,b)=>itemSortMinutes(a)-itemSortMinutes(b));
  for(const item of movable){const normalDuration=durationMinutes(item),manual=preserveManual&&!!manualMap[occurrenceKey(item)]?.manual;let desired=itemSortMinutes(item);if(!manual&&['groom','breakfast'].includes(item.id))desired=Math.max(chosenWake,desired+wakeShift);desired=Math.max(chosenWake,desired);if(item.category==='Food'&&lastMealEnd!==null)desired=Math.max(desired,lastMealEnd+150);let slot=findOpenSlot(desired,normalDuration,blocked,sleepLimit);if(slot===null)slot=findOpenSlotBackward(sleepLimit,normalDuration,blocked,chosenWake);if(slot===null)continue;const newStart=slot,newEnd=slot+normalDuration;blocked.push({start:newStart,end:newEnd,item});if(item.category==='Food')lastMealEnd=newEnd;const original=itemsForDate(date,{ignoreOverrides:true}).find(x=>occurrenceKey(x)===occurrenceKey(item)),changed=!original||newStart!==itemSortMinutes(original)||manual||(['groom','breakfast'].includes(item.id)&&wakeShift!==0);if(changed){const ov={start:minutesToTime(newStart),end:minutesToTime(newEnd),dayOffset:Math.floor(newStart/1440),adaptive:true,manual};overrides[occurrenceKey(item)]=ov;moved.push({...item,...ov});}}
  if(preserveManual)Object.entries(manualMap).forEach(([occ,ov])=>{if(ov?.manual&&!overrides[occ]&&!baseItems.some(i=>occurrenceKey(i)===occ&&itemIsFixed(i)))overrides[occ]={...ov};});
  return {key,overrides,moved,wakeTime:minutesToTime(chosenWake),sleepTime:chosenSleepTime,manualCount:Object.values(manualMap).filter(x=>x?.manual&&!x?.dayAnchor).length};
}
function applyFutureDayPlan(plan){const rec=ensureRecord(plan.key);rec.timeOverrides=plan.overrides;rec.futurePlannedAt=new Date().toISOString();save();}
function openDayAnchorPlanner(date){
  const key=todayKey(date);if(key<todayKey())return toast('Past day anchors can be corrected from their history instead');
  const currentWake=dayWakeTime(date),currentSleep=daySleepTime(date),manualCount=Object.values(ensureRecord(key).timeOverrides||{}).filter(x=>x?.manual&&!x?.dayAnchor).length,isToday=key===todayKey();
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">DAY PLAN</p><h2>${escapeHTML(dayLong(date.getDay()))}, ${escapeHTML(formatDateShort(date))}</h2><p class="muted">Wake and sleep change only for this date. Your recurring routine stays untouched.</p><div class="stack"><label><span class="label">Wake time for this day</span><input class="input" id="futureWakeTime" type="time" value="${escapeAttr(currentWake)}"></label><label><span class="label">Sleep time for this night</span><input class="input" id="futureSleepTime" type="time" value="${escapeAttr(currentSleep)}"><small class="field-help">Times before noon are treated as after midnight on the following calendar day.</small></label><label class="switch-row"><input type="checkbox" id="keepFutureMoves" ${manualCount?'checked':''}><span><b>Keep my moves</b><small>Keep swaps and manual time changes while rebuilding around the new anchors.</small></span></label></div><button class="primary full" id="rebuildFutureDay" style="margin-top:14px">Save + rebuild day</button><button class="secondary full" id="saveAnchorsOnly" style="margin-top:8px">Save anchors only</button><button class="secondary full" id="resetFutureDay" style="margin-top:8px">Reset day to routine</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);
  const saveAnchors=()=>{const wake=$('#futureWakeTime').value||currentWake,sleep=$('#futureSleepTime').value||currentSleep;setDayWakeOverride(date,wake);setDaySleepOverride(date,sleep);save();return {wake,sleep};};
  $('#rebuildFutureDay').onclick=()=>{const {wake,sleep}=saveAnchors(),keep=$('#keepFutureMoves').checked;if(isToday){const rec=ensureRecord(key),beforeWake=!rec.actualWakeAt&&currentMinutes()<minutesFromTime(wake);if(beforeWake){const plan=buildFutureDayPlan(date,keep,wake,sleep);applyFutureDayPlan(plan);}else{const plan=buildAdaptiveRestartPlan(new Date(),keep);applyAdaptiveRestart(plan);}}else{const plan=buildFutureDayPlan(date,keep,wake,sleep);applyFutureDayPlan(plan);}closeAppSheet(modal);render();toast(isToday?'Today rebuilt':'Day rebuilt');};
  $('#saveAnchorsOnly').onclick=()=>{saveAnchors();closeAppSheet(modal);render();toast('Day anchors saved');};
  $('#resetFutureDay').onclick=()=>{const rec=ensureRecord(key);rec.timeOverrides={};delete rec.futurePlannedAt;save();closeAppSheet(modal);render();toast('Day restored to recurring routine');};
  $('#cancelModal').onclick=()=>closeAppSheet(modal);localizeTree(modalContent);
}
function openFutureDayPlanner(date){openDayAnchorPlanner(date);}

function captureWeekEditContext(){if(state.settings.activeTab==='week')weekEditContext={date:state.settings.selectedWeekDate||todayKey(),scrollY:pageScrollY()};else weekEditContext=null;}
function renderAfterEditor(){if(state.settings.activeTab==='week'&&weekEditContext){const ctx=weekEditContext;weekEditContext=null;state.settings.selectedWeekDate=ctx.date;save();renderWeek();requestAnimationFrame(()=>pageScrollTo({top:ctx.scrollY,behavior:'auto'}));}else{weekEditContext=null;render();}}

function openScheduleManager() {
  const sorted=[...state.schedule].sort((a,b)=>minutesFromTime(a.start)-minutesFromTime(b.start));
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><div class="row between center"><div><p class="eyebrow">WEEKLY ROUTINE</p><h2>Recurring schedule</h2></div><button class="icon-button" id="closeModal" aria-label="Close">${svgIcon('close')}</button></div><p class="muted tiny">Your university timetable is preloaded. Fixed items stay in place during an adaptive restart. You can still edit or add recurring items.</p><div class="stack" style="margin-top:14px">${sorted.map(s=>`<button class="more-link" data-routine-edit="${s.id}"><span><b>${escapeHTML(s.title)}</b><small>${escapeHTML(s.days.map(d=>DAY_SHORT[d]).join(', '))} · ${escapeHTML(timeWindow(s))}</small></span><span class="tool-chevron">${svgIcon('chevronRight')}</span></button>`).join('')}</div><button class="primary full" id="addRoutineInside" style="margin-top:14px">+ Add recurring item</button>`;
  openAppSheet(modal);
  $('#closeModal').onclick=()=>closeAppSheet(modal);
  $('#addRoutineInside').onclick=()=>openScheduleItemModal();
  $$('[data-routine-edit]').forEach(b=>b.onclick=()=>openScheduleItemModal(b.dataset.routineEdit));
}

function openScheduleItemModalBase(id=null,preset={}) {
  captureWeekEditContext();
  const existing=id?state.schedule.find(x=>x.id===id):null;
  const item=existing || {...preset,title:preset.title||'',days:preset.days||[1,2,3,4,5],start:preset.start||'09:00',end:preset.end||'10:00',category:preset.category||'Life',detail:preset.detail||'',active:true,fixed:!!preset.fixed,startDate:preset.startDate||'',endDate:preset.endDate||''};
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">RECURRING ITEM</p><h2>${existing?'Edit weekly item':'Add weekly item'}</h2><div class="stack">
    <label><span class="label">Title</span><input class="input" id="schedTitle" value="${escapeAttr(item.title)}" placeholder="e.g. Reservoir Engineering lecture"></label>
    <div class="form-grid"><label><span class="label">Start</span><input class="input" id="schedStart" type="time" value="${item.start}"></label><label><span class="label">End</span><input class="input" id="schedEnd" type="time" value="${item.end||item.start}"></label></div>
    <label><span class="label">Category</span><select id="schedCategory">${CATEGORIES.map(c=>`<option ${c===item.category?'selected':''}>${c}</option>`).join('')}</select></label>
    <label class="switch-row"><input type="checkbox" id="schedFixed" ${item.fixed?'checked':''}><span><b>Fixed time</b><small>Use for classes or appointments. Adaptive restart will never move it.</small></span></label>
    <div class="form-grid"><label><span class="label">Starts on (optional)</span><input class="input" id="schedStartDate" type="date" value="${item.startDate||''}"></label><label><span class="label">Ends on (optional)</span><input class="input" id="schedEndDate" type="date" value="${item.endDate||''}"></label></div>
    <div><span class="label">Repeat on</span><div class="day-picker">${DAY_PICK.map((d,i)=>`<label class="day-toggle"><input type="checkbox" data-repeat-day="${i}" ${item.days.includes(i)?'checked':''}><span>${d}</span></label>`).join('')}</div></div>
    <label><span class="label">Note</span><textarea id="schedDetail" placeholder="What exactly should you do?">${escapeHTML(item.detail||'')}</textarea></label>
  </div><button class="primary full" id="saveSchedule" style="margin-top:14px">Save recurring item</button>${existing&&!isDayAnchor(item)?'<button class="danger-btn full" id="deleteSchedule" style="margin-top:8px">Delete recurring item</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);
  const anchorDuration=isDayAnchor(item)?Math.max(1,durationMinutes(item)):null;
  if(anchorDuration!==null){
    const start=$('#schedStart'),end=$('#schedEnd');
    end.readOnly=true;
    const updateEnd=()=>{if(start.value)end.value=minutesToTime(minutesFromTime(start.value)+anchorDuration);};
    start.addEventListener('input',updateEnd);start.addEventListener('change',updateEnd);
    const help=document.createElement('small');help.className='field-help';help.textContent='End time follows this anchor automatically.';end.parentElement.appendChild(help);
  }
  $('#saveSchedule').onclick=()=>{
    const title=$('#schedTitle').value.trim(); const days=$$('[data-repeat-day]').filter(x=>x.checked).map(x=>Number(x.dataset.repeatDay));
    if(!title)return toast('Add a title'); if(!days.length)return toast('Choose at least one day');
    const startTime=$('#schedStart').value||'09:00', endTime=anchorDuration!==null?minutesToTime(minutesFromTime(startTime)+anchorDuration):($('#schedEnd').value||'10:00'), startDate=$('#schedStartDate').value||'', endDate=$('#schedEndDate').value||'';
    if(anchorDuration===null&&minutesFromTime(endTime)<=minutesFromTime(startTime))return toast('End time must be after start time');
    if(startDate&&endDate&&endDate<startDate)return toast('End date must be after start date');
    const anchor=isDayAnchor(item);const data={title,days,start:startTime,end:endTime,category:$('#schedCategory').value,detail:$('#schedDetail').value.trim(),active:existing?existing.active!==false:true,isClass:!!item.isClass,fixed:anchor?true:$('#schedFixed').checked,startDate,endDate};
    if(anchor){data.manualLocked=true;data.anchor=item.anchor;}
    createSafetySnapshot('Before weekly routine change');
    const before=existing?structuredClone(existing):null;
    if(existing){Object.assign(existing,data);if(existing.id==='wake')state.profile.wakeTarget=data.start;if(existing.id==='sleep')state.profile.sleepTarget=data.start;}else state.schedule.push({id:uid('sched'),...data});save();closeAppSheet(modal);toast('Weekly schedule updated',existing?'Undo':null,existing?()=>{Object.assign(existing,before);if(existing.id==='wake')state.profile.wakeTarget=existing.start;if(existing.id==='sleep')state.profile.sleepTarget=existing.start;save();renderAfterEditor();}:null);renderAfterEditor();
  };
  if(existing&&!isDayAnchor(item)&&$('#deleteSchedule'))$('#deleteSchedule').onclick=()=>{createSafetySnapshot('Before deleting recurring item');const idx=state.schedule.findIndex(x=>x.id===existing.id);if(idx<0)return;const removed=structuredClone(state.schedule[idx]);state.schedule.splice(idx,1);save();closeAppSheet(modal);renderAfterEditor();toast('Recurring item deleted','Undo',()=>{state.schedule.splice(Math.min(idx,state.schedule.length),0,removed);save();renderAfterEditor();});};
  $('#cancelModal').onclick=()=>returnToRoutineManager();
}

function openOneOffTaskModal(id=null,preset={}) {
  const returnToPlan=preset.returnToPlan||null;
  if(returnToPlan&&$('#futureWakeTime',modalContent))planReturnScroll=modalContent.scrollTop;
  if(!returnToPlan)captureWeekEditContext();
  const existing=id?state.oneOffTasks.find(x=>x.id===id):null;
  const baseType=(existing?.itemType)||(existing?.nonBlocking?'reminder':preset.itemType)||'task';
  const item=existing || {title:preset.title||'',date:preset.date||todayKey(),start:preset.start||'12:00',end:preset.end||'',category:preset.category||'Life',detail:preset.detail||'',fixed:!!preset.fixed,itemType:baseType,nonBlocking:baseType==='reminder',allowOverlap:!!preset.allowOverlap};
  const finishEditor=()=>{if(returnToPlan){returnToDayPlan(parseDateKey(returnToPlan));}else renderAfterEditor();};
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">ADD TO DAY</p><h2>${existing?'Edit item':'Task or reminder'}</h2>
    <div class="item-type-picker" role="group" aria-label="Item type"><button type="button" data-one-type="task" class="${baseType==='task'?'active':''}">${svgIcon('check')}<span><b>Task / event</b><small>Can reserve time and be rebuilt.</small></span></button><button type="button" data-one-type="reminder" class="${baseType==='reminder'?'active':''}">${svgIcon('bell')}<span><b>Reminder</b><small>Shows on the timeline without blocking time.</small></span></button></div>
    <div class="stack">
      <label><span class="label" id="oneTitleLabel">${baseType==='reminder'?'Reminder':'Task / event'}</span><input class="input" id="oneTitle" value="${escapeAttr(item.title)}" placeholder="${baseType==='reminder'?'e.g. Call the dentist':'e.g. Meeting or buy groceries'}"></label>
      <label><span class="label">Date</span><input class="input" id="oneDate" type="date" value="${item.date}"></label>
      <div class="form-grid"><label><span class="label">Start</span><input class="input" id="oneStart" type="time" value="${item.start}"></label><label><span class="label">End (optional)</span><input class="input" id="oneEnd" type="time" value="${item.end||''}"></label></div>
      <label><span class="label">Category</span><select id="oneCategory">${CATEGORIES.map(c=>`<option ${c===item.category?'selected':''}>${c}</option>`).join('')}</select></label>
      <div id="oneTaskOptions"><label class="switch-row"><input type="checkbox" id="oneFixed" ${item.fixed?'checked':''}><span><b>Fixed time / appointment</b><small>Use for classes, meetings or anything Reset should not move.</small></span></label><label class="switch-row overlap-option ${item.fixed?'':'hidden'}" id="oneOverlapRow"><input type="checkbox" id="oneAllowOverlap" ${baseType==='task'&&item.allowOverlap?'checked':''}><span><b>Allow intentional overlap</b><small>Keep this event at its time even when another event happens at the same time.</small></span></label></div>
      <div class="reminder-info ${baseType==='reminder'?'':'hidden'}" id="oneReminderInfo">${svgIcon('bell')}<span><b>Non-blocking reminder</b><small>It can overlap classes, meetings or tasks and will never trigger Needs attention or force Rebuild to move anything.</small></span></div>
      <label><span class="label">Note</span><textarea id="oneDetail" placeholder="Keep it specific.">${escapeHTML(item.detail||'')}</textarea></label>
    </div><button class="primary full" id="saveOneTask" style="margin-top:14px">Save ${baseType==='reminder'?'reminder':'item'}</button>${existing?'<button class="danger-btn full" id="deleteOneTask" style="margin-top:8px">Delete from this day</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);
  sheetScrollState.onDismiss=returnToPlan?()=>returnToDayPlan(parseDateKey(returnToPlan)):null;
  let selectedType=baseType;
  const refreshTypeUI=()=>{const reminder=selectedType==='reminder';$$('[data-one-type]',modalContent).forEach(b=>b.classList.toggle('active',b.dataset.oneType===selectedType));$('#oneTaskOptions').classList.toggle('hidden',reminder);$('#oneReminderInfo').classList.toggle('hidden',!reminder);$('#oneTitleLabel').textContent=reminder?'Reminder':'Task / event';$('#oneTitle').placeholder=reminder?'e.g. Call the dentist':'e.g. Meeting or buy groceries';$('#saveOneTask').textContent=`Save ${reminder?'reminder':'item'}`;if(!reminder)$('#oneOverlapRow').classList.toggle('hidden',!$('#oneFixed').checked);};
  $$('[data-one-type]',modalContent).forEach(b=>b.onclick=()=>{selectedType=b.dataset.oneType;refreshTypeUI();});
  $('#oneFixed').onchange=()=>$('#oneOverlapRow').classList.toggle('hidden',!$('#oneFixed').checked);
  $('#saveOneTask').onclick=()=>{const title=$('#oneTitle').value.trim();if(!title)return toast(`Add a ${selectedType==='reminder'?'reminder':'task'} name`);const startTime=$('#oneStart').value||'12:00',endTime=$('#oneEnd').value||'';if(endTime&&minutesFromTime(endTime)<=minutesFromTime(startTime))return toast('End time must be after start time');const reminder=selectedType==='reminder',fixed=reminder?false:$('#oneFixed').checked;const data={title,date:$('#oneDate').value||todayKey(),start:startTime,end:endTime,category:$('#oneCategory').value,detail:$('#oneDetail').value.trim(),fixed,itemType:selectedType,nonBlocking:reminder,allowOverlap:reminder?true:(fixed&&$('#oneAllowOverlap').checked)},before=existing?deepClone(existing):null;if(existing)Object.assign(existing,data);else state.oneOffTasks.push({id:uid('one'),...data});save();closeAppSheet(modal);toast(existing?(reminder?'Reminder updated':'Item updated'):(reminder?'Reminder added':'Item scheduled'),existing?'Undo':null,existing?()=>{Object.assign(existing,before);save();finishEditor();}:null);finishEditor();};
  if(existing)$('#deleteOneTask').onclick=()=>{const idx=state.oneOffTasks.findIndex(x=>x.id===existing.id);if(idx<0)return;const removed=deepClone(state.oneOffTasks[idx]);state.oneOffTasks.splice(idx,1);save();closeAppSheet(modal);finishEditor();toast(removed.itemType==='reminder'||removed.nonBlocking?'Reminder deleted':'Item deleted','Undo',()=>{state.oneOffTasks.splice(Math.min(idx,state.oneOffTasks.length),0,removed);save();finishEditor();});};
  $('#cancelModal').onclick=()=>{if(returnToPlan)returnToDayPlan(parseDateKey(returnToPlan));else closeAppSheet(modal);};
}

function openCourseModal(id=null) {
  const c=id?state.courses.find(x=>x.id===id):null;
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">UNIVERSITY</p><h2>${c?'Edit course':'Add course'}</h2><div class="stack"><label><span class="label">Course name</span><input class="input" id="courseName" value="${c?escapeAttr(c.name):''}" placeholder="e.g. Production Engineering"></label><div class="form-grid"><label><span class="label">You are at week</span><input class="input" id="courseCurrent" type="number" min="0" value="${c?c.currentWeek:1}"></label><label><span class="label">Teaching week</span><input class="input" id="courseTeaching" type="number" min="1" value="${c?c.teachingWeek:10}"></label></div><label><span class="label">Note</span><input class="input" id="courseNote" value="${c?escapeAttr(c.note||''):''}" placeholder="What is blocking you?"></label></div><button class="primary full" id="saveCourse" style="margin-top:14px">Save course</button>${c?'<button class="danger-btn full" id="deleteCourse" style="margin-top:8px">Delete course</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);
  $('#saveCourse').onclick=()=>{const data={name:$('#courseName').value.trim()||'Untitled course',currentWeek:Number($('#courseCurrent').value||0),teachingWeek:Number($('#courseTeaching').value||10),note:$('#courseNote').value.trim()};if(c)Object.assign(c,data);else state.courses.push({id:uid('course'),...data});save();closeAppSheet(modal);renderUniversity();};
  if(c)$('#deleteCourse').onclick=()=>{state.courses=state.courses.filter(x=>x.id!==c.id);save();closeAppSheet(modal);renderUniversity();};
  $('#cancelModal').onclick=()=>closeAppSheet(modal);
}

function openUniTaskModal(id=null) {
  const existing=id?state.uniTasks.find(x=>x.id===id):null;
  const t=existing||{title:'',course:'General',priority:'Important',dueDate:'',estimate:''};
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">CATCH-UP QUEUE</p><h2>${existing?'Edit task':'Add task'}</h2><div class="stack"><label><span class="label">Task</span><input class="input" id="uniTitle" value="${escapeAttr(t.title)}" placeholder="e.g. Topic 4 tutorial + notes"></label><label><span class="label">Course</span><select id="uniCourse"><option value="General">General</option>${state.courses.map(c=>`<option ${c.name===t.course?'selected':''}>${escapeHTML(c.name)}</option>`).join('')}</select></label><div class="form-grid"><label><span class="label">Priority</span><select id="uniPriority"><option ${t.priority==='Urgent'?'selected':''}>Urgent</option><option ${t.priority==='Important'?'selected':''}>Important</option><option ${t.priority==='Later'?'selected':''}>Later</option></select></label><label><span class="label">Due date</span><input class="input" id="uniDue" type="date" value="${t.dueDate||''}"></label></div><label><span class="label">Estimated time</span><input class="input" id="uniEstimate" value="${escapeAttr(t.estimate||'')}" placeholder="e.g. 60–90 min"></label></div><button class="primary full" id="saveUniTask" style="margin-top:14px">Save task</button>${existing?'<button class="danger-btn full" id="deleteUniTask" style="margin-top:8px">Delete task</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);
  $('#saveUniTask').onclick=()=>{const title=$('#uniTitle').value.trim();if(!title)return toast('Add a task name');const data={title,course:$('#uniCourse').value,priority:$('#uniPriority').value,dueDate:$('#uniDue').value||'',estimate:$('#uniEstimate').value.trim()};if(existing)Object.assign(existing,data);else state.uniTasks.push({id:uid('unitask'),done:false,...data});save();closeAppSheet(modal);renderUniversity();};
  if(existing)$('#deleteUniTask').onclick=()=>{state.uniTasks=state.uniTasks.filter(x=>x.id!==existing.id);save();closeAppSheet(modal);renderUniversity();};
  $('#cancelModal').onclick=()=>closeAppSheet(modal);
}


function bucketEditorRow(b){return `<div class="course bucket-editor" data-bucket-id="${escapeAttr(b.id)}"><div class="row"><label style="flex:1"><span class="label">Bucket</span><input class="input bucket-name" value="${escapeAttr(b.name)}"></label><label style="width:130px"><span class="label">SAR per salary</span><input class="input bucket-target" type="number" min="0" value="${Number(b.target||0)}"></label></div><button class="text-button danger-text bucket-delete" type="button">Remove</button></div>`;}
function bindBucketDeleteButtons(){ $$('.bucket-delete').forEach(b=>b.onclick=()=>{if($$('.bucket-editor').length<=1)return toast('Keep at least one bucket');b.closest('.bucket-editor').remove();}); }



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
  main.innerHTML=`${moreBack()}<section class="metric-grid health-metrics first-section"><div class="metric-card"><small>Current</small><strong>${last?Number(last.weight).toFixed(1):'—'}</strong><span>${last?'kg':'no entry'}</span></div><div class="metric-card"><small>First logged</small><strong>${first?Number(first.weight).toFixed(1):'—'}</strong><span>${first?'kg':'no entry'}</span></div><div class="metric-card"><small>Change</small><strong>${logs.length>1?`${change>0?'+':''}${change.toFixed(1)}`:'—'}</strong><span>${logs.length>1?'kg since first':'need 2 entries'}</span></div><div class="metric-card"><small>Entries</small><strong>${logs.length}</strong><span>all time</span></div></section>
    <section class="card flat">${weightChartHTML(logs)}</section>
    <button class="primary full" id="addWeightBtn">+ Log body weight</button>
    <div class="section-title"><h2>Weight history</h2><button class="secondary small-btn" id="selectWeightBtn">${historySelectMode.weight?'Done':'Select'}</button></div>${historySelectToolbar('weight')}<section class="card flat">${logs.length?logs.slice().reverse().map(l=>`<div class="gym-log">${historySelectMode.weight?historySelectCheckbox('weight',l.id):''}<div><b>${Number(l.weight).toFixed(1)} kg</b><small>${escapeHTML(formatDateShort(parseDateKey(l.date)))}</small></div>${historySelectMode.weight?'':`<div class="row"><button class="text-button tiny" data-edit-weight="${l.id}">Edit</button><button class="text-button tiny danger-text" data-del-weight="${l.id}">Delete</button></div>`}</div>`).join(''):'<div class="empty-state">No weight entries yet.</div>'}</section>`;
  bindMoreBack();
  $('#addWeightBtn').onclick=()=>openWeightModal();
  $('#selectWeightBtn').onclick=()=>historySelectToggle('weight',renderHealth);
  $$('[data-edit-weight]').forEach(b=>b.onclick=()=>openWeightModal(b.dataset.editWeight));
  $$('[data-del-weight]').forEach(b=>b.onclick=()=>{const idx=state.health.weightLogs.findIndex(x=>x.id===b.dataset.delWeight);if(idx<0)return;const removed=state.health.weightLogs[idx];state.health.weightLogs.splice(idx,1);save();renderHealth();toast('Weight entry deleted','Undo',()=>{state.health.weightLogs.splice(Math.min(idx,state.health.weightLogs.length),0,removed);save();renderHealth();});});
  bindHistorySelection('weight',renderHealth,ids=>{const set=new Set(ids),removed=state.health.weightLogs.map((item,index)=>({item,index})).filter(x=>set.has(x.item.id));state.health.weightLogs=state.health.weightLogs.filter(x=>!set.has(x.id));historySelected.weight.clear();historySelectMode.weight=false;save();renderHealth();toast(`${removed.length} weight entr${removed.length===1?'y':'ies'} deleted`,'Undo',()=>{restoreDeletedObjects(state.health.weightLogs,removed);save();renderHealth();});});
}
function openWeightModal(id=null){
  const existing=id?(state.health.weightLogs||[]).find(x=>x.id===id):null;
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">BODY WEIGHT</p><h2>${existing?'Edit':'Log'} weight</h2><div class="stack"><label><span class="label">Weight (kg)</span><input class="input" id="bodyWeight" type="number" min="20" max="300" step="0.1" inputmode="decimal" value="${existing?Number(existing.weight):''}"></label><label><span class="label">Date</span><input class="input" id="bodyWeightDate" type="date" value="${existing?.date||todayKey()}"></label></div><button class="primary full" id="saveBodyWeight" style="margin-top:14px">Save</button>${existing?'<button class="danger-btn full" id="deleteBodyWeight" style="margin-top:8px">Delete entry</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);
  $('#saveBodyWeight').onclick=()=>{const weight=Number($('#bodyWeight').value);if(!(weight>=20&&weight<=300))return toast('Enter a valid weight');const data={weight,date:$('#bodyWeightDate').value||todayKey(),createdAt:existing?.createdAt||Date.now()};if(existing)Object.assign(existing,data);else state.health.weightLogs.push({id:uid('weight'),...data});save();closeAppSheet(modal);renderHealth();toast(existing?'Weight updated':'Weight logged');};
  if(existing)$('#deleteBodyWeight').onclick=()=>{const idx=state.health.weightLogs.findIndex(x=>x.id===existing.id);if(idx<0)return;const removed=state.health.weightLogs[idx];state.health.weightLogs.splice(idx,1);save();closeAppSheet(modal);renderHealth();toast('Weight entry deleted','Undo',()=>{state.health.weightLogs.splice(Math.min(idx,state.health.weightLogs.length),0,removed);save();renderHealth();});};
  $('#cancelModal').onclick=()=>closeAppSheet(modal);
}


function sleepNightRecord(nightKey){
  const night=parseDateKey(nightKey),nextKey=todayKey(addDays(night,1)),sleepRec=state.records[nightKey]||{},wakeRec=state.records[nextKey]||{},sleepValue=sleepRec.actualSleepAt||'',wakeValue=wakeRec.actualWakeAt||'';
  const sleepDate=sleepValue?new Date(sleepValue):null,wakeDate=wakeValue?new Date(wakeValue):null;
  let durationHours=null;
  if(sleepValue&&wakeValue){const hours=stableDurationHours(sleepValue,wakeValue,sleepRec.actualSleepOffsetMin,wakeRec.actualWakeOffsetMin);if(hours>0&&hours<=20)durationHours=hours;}
  return {nightKey,nextKey,night,sleepValue,wakeValue,sleepDate,wakeDate,durationHours};
}
function sleepNightRecords(days=180){
  const out=[];const today=new Date();
  for(let i=1;i<=days;i++){const d=addDays(today,-i),key=todayKey(d);if(d<appStartDate()&&!(state.records[key]?.actualSleepAt))continue;const r=sleepNightRecord(key);if(r.sleepValue||r.wakeValue)out.push(r);}
  return out.sort((a,b)=>b.nightKey.localeCompare(a.nightKey));
}
function sleepAverageForDays(days){const since=todayKey(addDays(new Date(),-days)),rows=sleepNightRecords(Math.max(days+2,35)).filter(r=>r.nightKey>=since&&r.durationHours!=null);return {count:rows.length,average:rows.length?rows.reduce((a,r)=>a+r.durationHours,0)/rows.length:0,rows};}
function formatDurationHours(hours){if(!(hours>0))return '—';const total=Math.round(hours*60);return `${Math.floor(total/60)}h ${String(total%60).padStart(2,'0')}m`;}
function sleepStatus(hours){const target=clamp(Number(state.profile.sleepDurationTarget||8),4,14);if(hours==null)return 'Incomplete';if(hours<target-.5)return 'Short';if(hours>target+1.5)return 'Long';return 'On target';}
function sleepStatusClass(hours){const x=sleepStatus(hours);return x==='On target'?'good':x==='Incomplete'?'neutral':'warn';}
function sleepClockFromValue(value){return value&&value.includes('T')?formatClock(value.slice(11,16)):'—';}
function sleepRelativeBedMinutes(r){if(!r.sleepDate)return null;const clock=r.sleepDate.getHours()*60+r.sleepDate.getMinutes();return r.sleepValue.slice(0,10)===r.nightKey?clock:clock+1440;}
function avgAbsDeviation(values){if(!values.length)return null;const avg=values.reduce((a,b)=>a+b,0)/values.length;return values.reduce((a,b)=>a+Math.abs(b-avg),0)/values.length;}
function sleepConsistency(rows,kind){const values=rows.filter(r=>kind==='bed'?r.sleepDate:r.wakeDate).map(r=>kind==='bed'?sleepRelativeBedMinutes(r):r.wakeDate.getHours()*60+r.wakeDate.getMinutes());const dev=avgAbsDeviation(values);if(dev==null)return {text:'—',label:'Need more nights'};const mins=Math.round(dev);return {text:`±${mins}m`,label:mins<=30?'Very consistent':mins<=60?'Fairly consistent':'Irregular'};}
function sleepToolMeta(){const last=sleepNightRecord(todayKey(addDays(new Date(),-1)));return last.durationHours!=null?formatDurationHours(last.durationHours):'No complete night yet';}
function sleepChartHTML(){const rows=sleepNightRecords(21).filter(r=>r.durationHours!=null).slice(0,14).reverse();if(rows.length<2)return '<div class="chart-empty">Log at least two complete nights to see your sleep trend.</div>';const max=Math.max(10,...rows.map(r=>r.durationHours)),target=clamp(Number(state.profile.sleepDurationTarget||8),4,14);return `<div class="sleep-chart"><div class="sleep-target-line" style="--target:${Math.min(100,target/max*100)}%"><span>${target}h target</span></div>${rows.map(r=>`<div class="sleep-bar-wrap" title="${escapeAttr(formatDateShort(r.night))} · ${escapeAttr(formatDurationHours(r.durationHours))}"><div class="sleep-bar ${sleepStatusClass(r.durationHours)}" style="height:${Math.max(8,Math.round(r.durationHours/max*100))}%"></div><small>${dayShort(addDays(r.night,1).getDay()).slice(0,1)}</small></div>`).join('')}</div>`;}
function renderSleep(){
  setHeader('Sleep');const last=sleepNightRecord(todayKey(addDays(new Date(),-1))),avg7=sleepAverageForDays(7),avg30=sleepAverageForDays(30),recent=sleepNightRecords(180),expanded=!!state.settings.sleepHistoryExpanded,shown=expanded?recent:recent.slice(0,7),consRows=recent.filter(r=>r.durationHours!=null).slice(0,14),bed=sleepConsistency(consRows,'bed'),wake=sleepConsistency(consRows,'wake'),target=clamp(Number(state.profile.sleepDurationTarget||8),4,14);
  main.innerHTML=`${moreBack()}<section class="sleep-hero ${sleepStatusClass(last.durationHours)}"><div><p class="eyebrow">LAST NIGHT</p><h2>${formatDurationHours(last.durationHours)}</h2><p>${sleepClockFromValue(last.sleepValue)} → ${sleepClockFromValue(last.wakeValue)}</p></div><span class="sleep-status-pill">${sleepStatus(last.durationHours)}</span></section><section class="sleep-metric-grid"><article><small>7-day average</small><b>${formatDurationHours(avg7.average)}</b><span>${avg7.count} logged night${avg7.count===1?'':'s'}</span></article><article><small>30-day average</small><b>${formatDurationHours(avg30.average)}</b><span>${avg30.count} logged night${avg30.count===1?'':'s'}</span></article><article><small>Target duration</small><b>${formatDurationHours(target)}</b><button class="text-button tiny" id="editSleepTarget">Edit</button></article></section><section class="card flat sleep-chart-card"><div class="row between center"><div><p class="eyebrow">DURATION</p><h3 style="margin:0">Recent nights</h3></div></div>${sleepChartHTML()}</section><section class="sleep-consistency-grid"><article><span>${svgIcon('moon')}</span><div><small>Bedtime consistency</small><b>${bed.text}</b><em>${bed.label}</em></div></article><article><span>${svgIcon('calendar')}</span><div><small>Wake consistency</small><b>${wake.text}</b><em>${wake.label}</em></div></article></section><div class="section-title"><h2>Sleep history</h2><div class="row"><button class="secondary small-btn" id="addSleepNightBtn">+ Night</button>${recent.length>7?`<button class="secondary small-btn" id="toggleSleepHistory">${expanded?'Recent':'View all'}</button>`:''}</div></div><section class="card flat">${shown.length?shown.map(r=>`<div class="sleep-history-row"><span class="sleep-history-icon ${sleepStatusClass(r.durationHours)}">${svgIcon('moon')}</span><div><b>${escapeHTML(formatDateShort(r.night))} night</b><small>${sleepClockFromValue(r.sleepValue)} → ${sleepClockFromValue(r.wakeValue)} · ${formatDurationHours(r.durationHours)}</small></div><button class="secondary small-btn" data-edit-sleep-night="${r.nightKey}">Edit</button></div>`).join(''):'<div class="empty-state">No sleep history yet. Log sleep and wake times and Reset will calculate it automatically.</div>'}</section>`;
  bindMoreBack();$('#editSleepTarget').onclick=openSleepTargetModal;$('#addSleepNightBtn').onclick=()=>openSleepNightModal(todayKey(addDays(new Date(),-1)));if($('#toggleSleepHistory'))$('#toggleSleepHistory').onclick=()=>{state.settings.sleepHistoryExpanded=!expanded;save();renderSleep();};$$('[data-edit-sleep-night]').forEach(b=>b.onclick=()=>openSleepNightModal(b.dataset.editSleepNight));localizeTree(main);
}
function openSleepTargetModal(){const current=clamp(Number(state.profile.sleepDurationTarget||8),4,14);prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SLEEP</p><h2>Target duration</h2><p class="muted">This only changes your duration target. Your planned sleep and wake times stay separate.</p><div class="quick-value-row sleep-target-options">${[7,7.5,8,8.5,9].map(v=>`<button class="quick-value ${v===current?'active':''}" data-sleep-target="${v}">${v}h</button>`).join('')}</div><label><span class="label">Custom hours</span><input class="input" id="sleepTargetHours" type="number" min="4" max="14" step="0.25" value="${current}"></label><button class="primary full" id="saveSleepTarget" style="margin-top:14px">Save target</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;openAppSheet(modal);$$('[data-sleep-target]').forEach(b=>b.onclick=()=>{$('#sleepTargetHours').value=b.dataset.sleepTarget;$$('[data-sleep-target]').forEach(x=>x.classList.toggle('active',x===b));});$('#saveSleepTarget').onclick=()=>{state.profile.sleepDurationTarget=clamp(Number($('#sleepTargetHours').value||8),4,14);save();closeAppSheet(modal);renderSleep();toast('Sleep target updated');};$('#cancelModal').onclick=()=>closeAppSheet(modal);localizeTree(modalContent);}
function openSleepNightModal(nightKey){
  const r=sleepNightRecord(nightKey),night=parseDateKey(nightKey),next=addDays(night,1),nextKey=todayKey(next);const plannedSleep=daySleepTime(night),plannedWake=dayWakeTime(next);let sleepValue=r.sleepValue,wakeValue=r.wakeValue;
  if(!sleepValue){const d=new Date(night),off=sleepDayOffsetForTime(plannedSleep);d.setDate(d.getDate()+off);const [h,m]=plannedSleep.split(':').map(Number);d.setHours(h,m,0,0);sleepValue=localDateTimeInput(d);}if(!wakeValue){const d=new Date(next);const [h,m]=plannedWake.split(':').map(Number);d.setHours(h,m,0,0);wakeValue=localDateTimeInput(d);}
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SLEEP HISTORY</p><h2>${escapeHTML(formatDateShort(night))} night</h2><p class="muted">Sleep after midnight still belongs to this night.</p><div class="stack"><label><span class="label">Went to sleep</span><input class="input" id="sleepNightBed" type="datetime-local" value="${escapeAttr(sleepValue)}"></label><label><span class="label">Woke up</span><input class="input" id="sleepNightWake" type="datetime-local" value="${escapeAttr(wakeValue)}"></label></div><button class="primary full" id="saveSleepNight" style="margin-top:14px">Save night</button>${r.sleepValue||r.wakeValue?'<button class="danger-btn full" id="deleteSleepNight" style="margin-top:8px">Clear this night</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;openAppSheet(modal);
  $('#saveSleepNight').onclick=()=>{const bed=$('#sleepNightBed').value,wake=$('#sleepNightWake').value;if(!bed||!wake)return toast('Choose both sleep and wake times');const bd=new Date(bed),wd=new Date(wake);if(Number.isNaN(bd.getTime())||Number.isNaN(wd.getTime())||wd<=bd)return toast('Wake time must be after sleep time');const hours=(wd-bd)/36e5;if(hours>20)return toast('That sleep duration looks too long');const sleepRec=ensureRecord(nightKey),wakeRec=ensureRecord(nextKey);sleepRec.actualSleepAt=bed;wakeRec.actualWakeAt=wake;const sleepItem=sleepItemForKey(nightKey),wakeItem=itemsForDate(next).find(i=>i.id==='wake');if(sleepItem)setStatus(sleepItem,nightKey,'done');if(wakeItem)setStatus(wakeItem,nextKey,'done');setDaySleepOverride(night,bed.slice(11,16));setDayWakeOverride(next,wake.slice(11,16));save();closeAppSheet(modal);renderSleep();toast('Sleep night saved');};
  if($('#deleteSleepNight'))$('#deleteSleepNight').onclick=()=>{const sleepRec=ensureRecord(nightKey),wakeRec=ensureRecord(nextKey);delete sleepRec.actualSleepAt;delete wakeRec.actualWakeAt;const sleepItem=sleepItemForKey(nightKey),wakeItem=itemsForDate(next).find(i=>i.id==='wake');if(sleepItem)setStatus(sleepItem,nightKey,'pending');if(wakeItem)setStatus(wakeItem,nextKey,'pending');save();closeAppSheet(modal);renderSleep();toast('Sleep night cleared');};$('#cancelModal').onclick=()=>closeAppSheet(modal);localizeTree(modalContent);
}



/* Gym session and set logging — v3.6.3. Legacy logs remain readable without rewriting them. */
function ensureGymSessionState(gym=state.gym){
  if(!Array.isArray(gym.workoutHistory))gym.workoutHistory=[];
  if(!gym.logDrafts||typeof gym.logDrafts!=='object'||Array.isArray(gym.logDrafts))gym.logDrafts={};
  if(!Array.isArray(gym.sessions))gym.sessions=[];
  if(!Array.isArray(gym.sessionExcluded))gym.sessionExcluded=[];
  return gym;
}
function gymLogSets(log){
  if(!log)return [];
  if(Array.isArray(log.setEntries))return log.setEntries.filter(s=>s&&['working','warmup'].includes(s.type)&&Number.isFinite(Number(s.weight))&&Number(s.weight)>=0&&Number.isInteger(Number(s.reps))&&Number(s.reps)>0).map(s=>({type:s.type,weight:Number(s.weight),reps:Number(s.reps)}));
  const weight=Number(log.weight),reps=Number(log.reps),sets=Math.floor(Number(log.sets));
  if(!Number.isFinite(weight)||weight<0||!Number.isInteger(reps)||reps<1||!Number.isFinite(sets)||sets<1)return [];
  const type=log.type==='warmup'||log.isWarmup===true?'warmup':'working';
  return Array.from({length:Math.min(sets,100)},()=>({type,weight,reps}));
}
function gymWorkingSets(log){return gymLogSets(log).filter(s=>s.type==='working');}
function gymWorkingWeight(log){return Math.max(0,...gymWorkingSets(log).map(s=>s.weight));}
function gymProgressLogs(exerciseId=null){
  return (state.gym.logs||[]).filter(l=>(exerciseId==null||l.exerciseId===exerciseId)&&gymWorkingSets(l).length).map(l=>({...l,weight:gymWorkingWeight(l)})).sort((a,b)=>String(a.date).localeCompare(String(b.date))||Number(a.createdAt||0)-Number(b.createdAt||0));
}
function exercisePR(exerciseId,excludeId=null){return Math.max(0,...(state.gym.logs||[]).filter(l=>l.exerciseId===exerciseId&&l.id!==excludeId).map(gymWorkingWeight));}
function lastWorkingExerciseLog(exerciseId,{excludeId=null,excludeWorkoutId=null,beforeDate=null,beforeCreatedAt=null}={}){
  const activeId=state.gym.activeWorkout?.id;
  return [...(state.gym.logs||[])].filter(l=>l.exerciseId===exerciseId&&l.id!==excludeId&&(!l.workoutId||l.workoutId!==activeId)&&(!excludeWorkoutId||l.workoutId!==excludeWorkoutId)&&(!beforeDate||l.date<=beforeDate)&&(!beforeCreatedAt||l.date!==beforeDate||Number(l.createdAt||0)<beforeCreatedAt)&&gymWorkingSets(l).length).sort((a,b)=>String(b.date).localeCompare(String(a.date))||Number(b.createdAt||0)-Number(a.createdAt||0))[0]||null;
}
function latestExerciseLog(exerciseId,excludeId=null){return lastWorkingExerciseLog(exerciseId,{excludeId});}
function gymSetsSummary(sets){
  if(!sets.length)return '';
  if(sets.every(s=>s.weight===sets[0].weight&&s.reps===sets[0].reps))return `${sets[0].weight} kg · ${sets.length} × ${sets[0].reps}`;
  return sets.map(s=>`${s.weight} kg × ${s.reps}`).join(' · ');
}
function gymLogSummary(log){
  const working=gymWorkingSets(log),warmups=gymLogSets(log).filter(s=>s.type==='warmup');
  return working.length?gymSetsSummary(working):(warmups.length?'Warm-up only':'No sets recorded');
}
function gymWarmupSummary(log){const warmups=gymLogSets(log).filter(s=>s.type==='warmup');return warmups.length?`Warm-up: ${gymSetsSummary(warmups)}`:'';}
function workoutDurationSeconds(workout,end=Date.now()){
  const start=Date.parse(workout?.startedAt||''),finish=workout?.finishedAt?Date.parse(workout.finishedAt):Number(end);
  return Number.isFinite(start)&&Number.isFinite(finish)&&finish>=start?Math.floor((finish-start)/1000):null;
}
function formatWorkoutDuration(seconds,live=false){
  if(seconds==null||!Number.isFinite(Number(seconds)))return 'Duration not recorded';
  const total=Math.max(0,Math.floor(Number(seconds))),h=Math.floor(total/3600),m=Math.floor(total%3600/60),s=total%60;
  if(live)return `${h?`${h}:`:''}${h?String(m).padStart(2,'0'):m}:${String(s).padStart(2,'0')}`;
  if(h)return `${h}h ${m}m`;
  return m?`${m}m${s?` ${s}s`:''}`:`${s}s`;
}
function workoutTimestampLabel(value,includeDate=false){
  const d=new Date(value);if(Number.isNaN(d.getTime()))return 'Time not recorded';
  return (includeDate?`${formatDateShort(d)} · `:'')+d.toLocaleTimeString(currentLocale(),{hour:'numeric',minute:'2-digit'});
}
function completedWorkoutsForDate(key){return (state.gym.workoutHistory||[]).filter(w=>w.date===key&&w.finishedAt).sort((a,b)=>String(a.startedAt).localeCompare(String(b.startedAt)));}
function workoutDayDurationLabel(key){
  const workouts=completedWorkoutsForDate(key),durations=workouts.map(w=>workoutDurationSeconds(w)).filter(n=>n!=null);
  if(!durations.length)return state.gym.activeWorkout?.date===key?'Workout in progress':'Duration not recorded';
  return `${formatWorkoutDuration(durations.reduce((a,b)=>a+b,0))}${workouts.length>1?' total':''}${durations.length<workouts.length?' · some times unavailable':''}`;
}
function workoutDayDetailsHTML(key){
  const timed=completedWorkoutsForDate(key);
  return `<small class="workout-duration-history">${escapeHTML(workoutDayDurationLabel(key))}${timed.length>1?` · ${timed.length} workouts`:''}</small><button type="button" class="text-button tiny" data-workout-details="${escapeAttr(key)}">Details</button>`;
}
function openWorkoutHistoryDay(key){
  const workouts=completedWorkoutsForDate(key),logs=(state.gym.logs||[]).filter(l=>l.date===key);
  prepareModalView();
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">WORKOUT HISTORY</p><h2>${escapeHTML(formatDateShort(parseDateKey(key)))}</h2><p class="workout-total-duration">${escapeHTML(workoutDayDurationLabel(key))}</p>${workouts.map(w=>`<section class="card flat workout-time-card"><h3>${escapeHTML(w.focus||'Workout')}</h3><b>${escapeHTML(formatWorkoutDuration(workoutDurationSeconds(w)))}</b><p class="muted">Started ${escapeHTML(workoutTimestampLabel(w.startedAt,true))}<br>Finished ${escapeHTML(workoutTimestampLabel(w.finishedAt,true))}</p></section>`).join('')}${!workouts.length?'<p class="muted">Start and finish times were not recorded for older workouts.</p>':''}<div class="workout-history-exercises">${logs.map(l=>`<article><b>${escapeHTML(exerciseById(l.exerciseId)?.name||'Deleted exercise')}</b><small>${escapeHTML(gymLogSummary(l))}</small>${gymWarmupSummary(l)?`<small class="gym-warmup-copy">${escapeHTML(gymWarmupSummary(l))}</small>`:''}</article>`).join('')||'<p class="muted">No exercise logs for this day.</p>'}</div><button class="secondary full" id="cancelModal">Close</button>`;
  openAppSheet(modal);$('#cancelModal').onclick=()=>closeAppSheet(modal);
}
function activeWorkoutHTML(){
  const w=state.gym.activeWorkout;if(!w)return '';
  const exercises=(w.exerciseIds||[]).map(exerciseById).filter(Boolean),logs=new Map(exercises.map(ex=>[ex.id,sessionWorkoutLog(w.id,ex.id)])),done=exercises.filter(ex=>gymWorkingSets(logs.get(ex.id)).length).length;
  return `<section class="active-workout-card"><div class="row between center"><div><span>IN PROGRESS</span><h3>${escapeHTML(w.focus||'Workout')}</h3></div><b>${done}/${exercises.length}</b></div><div class="workout-timer-line">${svgIcon('clock')}<b data-workout-elapsed>${escapeHTML(formatWorkoutDuration(workoutDurationSeconds(w),true))}</b><small>Started ${escapeHTML(workoutTimestampLabel(w.startedAt,true))}</small></div>${w.date!==todayKey()?`<p class="workout-overnight-note">Continuing your ${escapeHTML(formatDateShort(parseDateKey(w.date)))} workout. Logs stay on its start date.</p>`:''}<div class="weekbar"><span style="width:${exercises.length?Math.round(done/exercises.length*100):0}%"></span></div><div class="active-workout-list">${exercises.map(ex=>{const log=logs.get(ex.id),complete=gymWorkingSets(log).length>0,draft=state.gym.logDrafts?.[`workout:${w.id}:${ex.id}`];return `<div class="active-workout-row ${complete?'done':''}"><span class="workout-check">${complete?svgIcon('check'):''}</span><div><b>${escapeHTML(ex.name)}</b><small>${escapeHTML(log?gymLogSummary(log):`${ex.group||'Other'} · not logged yet`)}</small>${log&&gymWarmupSummary(log)?`<small class="gym-warmup-copy">${escapeHTML(gymWarmupSummary(log))}</small>`:''}${draft?'<small>Unsaved sets kept on this device</small>':''}</div><button class="secondary tiny-workout-btn" data-workout-log="${escapeAttr(ex.id)}">${draft?'Resume':log?'Edit':'Log'}</button></div>`}).join('')}</div><button class="success-btn full" id="finishWorkoutBtn">${svgIcon('check')} Finish workout</button><button class="text-button full" id="cancelWorkoutBtn">Cancel workout</button></section>`;
}
function markActiveWorkoutExercise(exerciseId){
  const w=state.gym.activeWorkout;if(!w)return;
  w.completedExerciseIds=(w.completedExerciseIds||[]).filter(id=>id!==exerciseId);
  if(gymWorkingSets(sessionWorkoutLog(w.id,exerciseId)).length)w.completedExerciseIds.push(exerciseId);
}
function completeActiveWorkout(workoutId,finishedAt=new Date().toISOString()){
  const gym=ensureGymSessionState(),w=gym.activeWorkout;if(!w||w.id!==workoutId)return null;
  const durationSeconds=workoutDurationSeconds({...w,finishedAt});
  if(durationSeconds==null&&w.startedAt)return null;
  const completed={...deepClone(w),finishedAt,durationSeconds};
  if(!gym.workoutHistory.some(x=>x.id===w.id))gym.workoutHistory.push(completed);
  if(!gym.sessions.includes(w.date))gym.sessions.push(w.date);
  gym.sessionExcluded=gym.sessionExcluded.filter(k=>k!==w.date);
  for(const key of Object.keys(gym.logDrafts))if(key.startsWith(`workout:${w.id}:`))delete gym.logDrafts[key];
  gym.activeWorkout=null;save();flushStateSave();return completed;
}
function confirmWorkoutAction(kind){
  const w=state.gym.activeWorkout;if(!w)return;
  const total=(w.exerciseIds||[]).length,done=(w.exerciseIds||[]).filter(id=>gymWorkingSets(sessionWorkoutLog(w.id,id)).length).length,isFinish=kind==='finish';
  const drafts=Object.keys(state.gym.logDrafts||{}).some(k=>k.startsWith(`workout:${w.id}:`));
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">WORKOUT</p><h2>${isFinish?'Finish this workout?':'Cancel this workout?'}</h2><p class="muted">${isFinish?(done<total?`You logged working sets for ${done} of ${total} exercises. You can finish if you intentionally skipped the rest.`:`All ${total} exercises are logged.`):'The workout will close. Exercise logs you already saved will stay in history.'}</p>${drafts?'<p class="workout-draft-warning">Some exercise changes are still drafts. Go back and save them before finishing. Closing this workout discards its unsaved drafts.</p>':''}<p class="workout-total-duration">${escapeHTML(formatWorkoutDuration(workoutDurationSeconds(w)))}</p><button class="${isFinish?'success-btn':'danger-btn'} full" id="confirmWorkoutAction">${isFinish?'Finish workout':'Cancel workout'}</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Go back</button>`;openAppSheet(modal);
  $('#confirmWorkoutAction').onclick=()=>{
    if(state.gym.activeWorkout?.id!==w.id)return;
    if(isFinish){const completed=completeActiveWorkout(w.id);if(!completed)return toast('Check your device clock before finishing this workout');toast(`Workout finished · ${formatWorkoutDuration(completed.durationSeconds)}`);}
    else{for(const key of Object.keys(state.gym.logDrafts||{}))if(key.startsWith(`workout:${w.id}:`))delete state.gym.logDrafts[key];state.gym.activeWorkout=null;save();flushStateSave();toast('Workout cancelled');}
    closeAppSheet(modal);renderGym();
  };
  $('#cancelModal').onclick=()=>closeAppSheet(modal);
}
function openGymLogModal(id=null,presetExerciseId=null){
  ensureGymSessionState();
  const active=state.gym.activeWorkout,requested=id?(state.gym.logs||[]).find(l=>l.id===id):null;
  if(id&&!requested)return toast('That exercise log is no longer available');
  const attached=(!id&&active)||(requested?.workoutId===active?.id&&active)?active:null;
  const workoutExisting=!id&&presetExerciseId&&attached?sessionWorkoutLog(attached.id,presetExerciseId):null;
  const existing=requested||workoutExisting,workoutId=existing?.workoutId||attached?.id||null;
  const lockedExercise=!!(presetExerciseId||existing?.workoutId);
  let exerciseId=existing?.exerciseId||presetExerciseId||state.settings.selectedExerciseId||state.gym.exercises[0]?.id;
  if(!exerciseById(exerciseId))return toast('Add an exercise first');
  let date=existing?.date||attached?.date||todayKey(),entries=[],prior=null,draftKey='',saved=false;
  const workingBlank=()=>({type:'working',weight:'',reps:'12'});
  const keyForExercise=()=>workoutId?`workout:${workoutId}:${exerciseId}`:existing?`edit:${existing.id}`:`manual:${exerciseId}`;
  const loadDraft=()=>{draftKey=keyForExercise();const draft=state.gym.logDrafts[draftKey],sourceLog=existing||(workoutId?sessionWorkoutLog(workoutId,exerciseId):null);entries=Array.isArray(draft?.setEntries)?deepClone(draft.setEntries):sourceLog?gymLogSets(sourceLog).map(s=>({...s,weight:String(s.weight),reps:String(s.reps)})):[workingBlank(),workingBlank(),workingBlank()];date=attached?.date||existing?.date||draft?.date||date;};
  const persistDraft=()=>{state.gym.logDrafts[draftKey]={exerciseId,date,setEntries:deepClone(entries),updatedAt:new Date().toISOString()};if(attached)attached.lastExerciseId=exerciseId;save();};
  loadDraft();
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">GYM LOG</p><h2>${existing?'Update':'Log'} exercise</h2>${lockedExercise?`<div class="locked-exercise-name"><b>${escapeHTML(exerciseById(exerciseId)?.name||'Exercise')}</b></div>`:`<label><span class="label">Exercise</span><select id="gymLogExercise">${state.gym.exercises.map(x=>`<option value="${escapeAttr(x.id)}" ${x.id===exerciseId?'selected':''}>${escapeHTML(x.name)}</option>`).join('')}</select></label>`}<section class="gym-previous-card" id="gymPreviousPerformance"></section>${attached?`<p class="muted gym-session-date">Workout started ${escapeHTML(formatDateShort(parseDateKey(attached.date)))}. All sets stay on this workout’s date.</p>`:`<label><span class="label">Date</span><input class="input" id="gymDate" type="date" value="${escapeAttr(date)}"></label>`}<p class="muted gym-set-help">Record each set separately. Warm-ups stay in history and are excluded from strength charts and PRs.</p><div class="gym-set-list" id="gymSetRows"></div><div class="gym-set-actions"><button class="secondary" type="button" id="addGymWorkingSet">+ Working set</button><button class="secondary gym-warmup-button" type="button" id="addGymWarmupSet">+ Warm-up</button></div><button class="text-button full" type="button" id="fillGymWorkingSets">Copy first working set to all working sets</button><p id="gymLogError" class="gym-log-error" role="alert" hidden></p><button class="primary full" id="saveGymLog" style="margin-top:12px">${existing?'Update log':'Save exercise'}</button>${existing?'<button class="danger-btn full" id="deleteGymLog" style="margin-top:8px">Delete log</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Close</button><p class="muted gym-draft-note">Unfinished entries are saved on this device. Reopen this exercise to continue.</p>`;
  const showError=message=>{const el=$('#gymLogError');el.textContent=message;el.hidden=false;};
  const drawPrevious=()=>{
    prior=lastWorkingExerciseLog(exerciseId,{excludeId:existing?.id,excludeWorkoutId:workoutId,beforeDate:date,beforeCreatedAt:existing?.createdAt||null});
    $('#gymPreviousPerformance').innerHTML=prior?`<small>LAST TIME · ${escapeHTML(formatDateShort(parseDateKey(prior.date)))}</small><b>${escapeHTML(gymSetsSummary(gymWorkingSets(prior)))}</b><button class="secondary small-btn" type="button" id="useLastGymWorkout">Use last workout</button>`:'<small>LAST TIME</small><b>No previous working sets yet</b>';
    const copy=$('#useLastGymWorkout');if(copy)copy.onclick=()=>{entries=[...entries.filter(s=>s.type==='warmup'),...gymWorkingSets(prior).map(s=>({...s,weight:String(s.weight),reps:String(s.reps)}))];persistDraft();drawRows();};
  };
  const drawRows=()=>{
    let working=0,warmup=0;
    $('#gymSetRows').innerHTML=entries.map((s,index)=>{const label=s.type==='warmup'?`Warm-up ${++warmup}`:`Set ${++working}`;return `<div class="gym-set-row ${s.type==='warmup'?'warmup':''}"><label class="gym-set-kind"><span class="label">${label}</span><select aria-label="${label} type" data-gym-set-type="${index}"><option value="working" ${s.type==='working'?'selected':''}>Working</option><option value="warmup" ${s.type==='warmup'?'selected':''}>Warm-up</option></select></label><label><span class="label">kg</span><input class="input" type="number" inputmode="decimal" min="0" step="any" data-gym-set-weight="${index}" aria-label="${label} weight in kg" value="${escapeAttr(String(s.weight??''))}" placeholder="0"></label><label><span class="label">Reps</span><input class="input" type="number" inputmode="numeric" min="1" max="1000" step="1" data-gym-set-reps="${index}" aria-label="${label} reps" value="${escapeAttr(String(s.reps??''))}"></label><button type="button" class="gym-remove-set" data-gym-remove-set="${index}" aria-label="Remove ${label.toLowerCase()}">×</button></div>`;}).join('');
    $$('[data-gym-set-weight]',modalContent).forEach(el=>el.oninput=()=>{entries[Number(el.dataset.gymSetWeight)].weight=el.value;persistDraft();});
    $$('[data-gym-set-reps]',modalContent).forEach(el=>el.oninput=()=>{entries[Number(el.dataset.gymSetReps)].reps=el.value;persistDraft();});
    $$('[data-gym-set-type]',modalContent).forEach(el=>el.onchange=()=>{entries[Number(el.dataset.gymSetType)].type=el.value;persistDraft();drawRows();});
    $$('[data-gym-remove-set]',modalContent).forEach(el=>el.onclick=()=>{entries.splice(Number(el.dataset.gymRemoveSet),1);persistDraft();drawRows();});
  };
  const addSet=type=>{if(entries.length>=60)return showError('Keep this exercise to 60 sets or fewer.');if(type==='warmup'){const index=entries.findIndex(s=>s.type==='working');entries.splice(index<0?entries.length:index,0,{type,weight:'',reps:'12'});}else{const previous=[...entries].reverse().find(s=>s.type==='working');entries.push(previous?{...previous}:workingBlank());}persistDraft();drawRows();};
  $('#addGymWorkingSet').onclick=()=>addSet('working');$('#addGymWarmupSet').onclick=()=>addSet('warmup');
  $('#fillGymWorkingSets').onclick=()=>{const first=entries.find(s=>s.type==='working');if(!first||String(first.weight).trim()===''||String(first.reps).trim()==='')return showError('Enter the first working set’s weight and reps first.');entries=entries.map(s=>s.type==='working'?{...first}:{...s});persistDraft();drawRows();};
  if($('#gymLogExercise'))$('#gymLogExercise').onchange=e=>{exerciseId=e.target.value;loadDraft();if($('#gymDate'))$('#gymDate').value=date;drawPrevious();drawRows();};
  if($('#gymDate'))$('#gymDate').oninput=e=>{date=e.target.value;persistDraft();drawPrevious();};
  $('#saveGymLog').onclick=()=>{
    if(saved)return;
    if(!validDateKey(date))return showError('Choose a valid workout date.');
    if(attached&&state.gym.activeWorkout?.id!==attached.id)return showError('This workout has closed. Reopen the exercise from history.');
    if(!entries.length)return showError('Add at least one working or warm-up set.');
    if(entries.some(s=>!['working','warmup'].includes(s.type)||String(s.weight).trim()===''||!Number.isFinite(Number(s.weight))||Number(s.weight)<0||Number(s.weight)>10000||String(s.reps).trim()===''||!Number.isInteger(Number(s.reps))||Number(s.reps)<1||Number(s.reps)>1000))return showError('Each set needs a weight of 0 or more and whole reps from 1 to 1,000.');
    const setEntries=entries.map(s=>({type:s.type,weight:Number(s.weight),reps:Number(s.reps)})),working=setEntries.filter(s=>s.type==='working');
    const target=existing||(workoutId?sessionWorkoutLog(workoutId,exerciseId):null),priorPR=exercisePR(exerciseId,target?.id||null);
    const data={exerciseId,date,workoutId,createdAt:target?.createdAt||Date.now(),updatedAt:Date.now(),setEntries,weight:Math.max(0,...working.map(s=>s.weight)),sets:working.length,reps:working[0]?.reps||0};
    saved=true;
    if(target)Object.assign(target,data);else state.gym.logs.push({id:uid('gymlog'),...data});
    if(attached){if(!attached.exerciseIds.includes(exerciseId))attached.exerciseIds.push(exerciseId);markActiveWorkoutExercise(exerciseId);}
    if(working.length)state.gym.sessionExcluded=state.gym.sessionExcluded.filter(k=>k!==date);
    state.settings.selectedExerciseId=exerciseId;delete state.gym.logDrafts[draftKey];save();flushStateSave();closeAppSheet(modal);renderGym();
    toast(working.length&&data.weight>priorPR?`New PR: ${data.weight} kg`:target?'Exercise updated':working.length?'Exercise saved':'Warm-up saved');
  };
  if(existing)$('#deleteGymLog').onclick=()=>{const idx=state.gym.logs.findIndex(l=>l.id===existing.id);if(idx<0)return;const removed=state.gym.logs.splice(idx,1)[0];delete state.gym.logDrafts[draftKey];if(attached)markActiveWorkoutExercise(exerciseId);save();closeAppSheet(modal);renderGym();toast('Exercise log deleted','Undo',()=>{state.gym.logs.splice(Math.min(idx,state.gym.logs.length),0,removed);if(state.gym.activeWorkout?.id===removed.workoutId)markActiveWorkoutExercise(removed.exerciseId);save();renderGym();});};
  $('#cancelModal').onclick=()=>{flushStateSave();closeAppSheet(modal);renderGym();};
  drawPrevious();drawRows();openAppSheet(modal);
}

function exerciseById(id){return (state.gym.exercises||[]).find(x=>x.id===id)||null;}
function exerciseTargets(ex){return [...new Set([ex?.group,...(Array.isArray(ex?.targets)?ex.targets:[])].filter(Boolean))];}
function workoutFocuses(){return ['Full Body','Upper Body','Lower Body','Custom'];}
function validPresetIds(name){const defaults=defaultWorkoutPresets(),source=Array.isArray(state.gym.workoutPresets?.[name])?state.gym.workoutPresets[name]:(defaults[name]||[]),valid=new Set((state.gym.exercises||[]).map(x=>x.id));return source.filter(id=>valid.has(id));}
function bodyRegionForExercise(ex){const t=exerciseTargets(ex);if(t.includes('Core'))return 'Core';if(t.some(x=>['Quads','Hamstrings','Glutes','Calves','Legs'].includes(x)))return 'Lower Body';if(t.some(x=>['Chest','Back','Shoulders','Rear Delts','Biceps','Triceps','Traps','Forearms','Arms'].includes(x)))return 'Upper Body';return 'Other';}
function sessionWorkoutLog(workoutId,exerciseId){return [...(state.gym.logs||[])].filter(l=>l.workoutId===workoutId&&l.exerciseId===exerciseId).sort((a,b)=>Number(b.createdAt||0)-Number(a.createdAt||0))[0]||null;}

function smartWeightOptions(exerciseId,current=null){const prior=latestExerciseLog(exerciseId,current?.id||null),base=Number(current?.weight||prior?.weight||20),step=base<20?2.5:5;return [...new Set([base-step,base-step/2,base,base+step/2,base+step].map(x=>Math.max(.5,Math.round(x*2)/2)))];}




function finishActiveWorkout(){confirmWorkoutAction('finish');}
function cancelActiveWorkout(){confirmWorkoutAction('cancel');}
function prSectionHTML(title,rows){return `<div class="pr-section"><div class="pr-section-title"><b>${escapeHTML(title)}</b><span>${rows.length}</span></div>${rows.length?rows.map(({ex,pr})=>`<div class="pr-row"><div><b>${escapeHTML(ex.name)}</b><small>${escapeHTML(ex.group||'')}</small></div><strong>${Number(pr)} kg</strong></div>`).join(''):'<div class="empty-state compact-empty">No PRs yet.</div>'}</div>`;}
function renderGym(){
  setHeader('Gym');
  const sessions=gymSessionDates(),view=state.settings.gymView||'workouts',weeklyGoal=clamp(Number(state.gym.weeklyGoal||3),1,7),groupFilter=state.settings.gymGroupFilter||'All',filteredExercises=(state.gym.exercises||[]).filter(ex=>groupFilter==='All'||exerciseTargets(ex).includes(groupFilter));
  let exercise=filteredExercises.find(x=>x.id===state.settings.selectedExerciseId)||filteredExercises[0]||state.gym.exercises[0]||null;if(exercise)state.settings.selectedExerciseId=exercise.id;
  const logs=exercise?gymProgressLogs(exercise.id):[],allLogs=[...(state.gym.logs||[])].sort((a,b)=>String(b.date).localeCompare(String(a.date))||Number(b.createdAt||0)-Number(a.createdAt||0));
  const historyFilter=state.settings.gymHistoryExercise||'all',historyLogs=historyFilter==='all'?allLogs:allLogs.filter(l=>l.exerciseId===historyFilter),historyExpanded=!!state.settings.gymHistoryExpanded,displayHistory=historyExpanded?historyLogs:allLogs.slice(0,8);
  const first=logs[0],last=logs[logs.length-1],change=first&&last?Number(last.weight)-Number(first.weight):0,pr=exercise?exercisePR(exercise.id):0,weekStart=startOfWeek(new Date()),weekKeys=new Set(Array.from({length:7},(_,i)=>todayKey(addDays(weekStart,i)))),weekSessions=[...sessions].filter(k=>weekKeys.has(k)).sort(),recentSessions=[...sessions].sort().reverse();
  const prRows=state.gym.exercises.map(ex=>({ex,pr:exercisePR(ex.id),region:bodyRegionForExercise(ex)})).filter(x=>x.pr>0).sort((a,b)=>b.pr-a.pr),upper=prRows.filter(x=>x.region==='Upper Body'),lower=prRows.filter(x=>x.region==='Lower Body'),core=prRows.filter(x=>x.region==='Core'),other=prRows.filter(x=>x.region==='Other');
  let body='';
  if(view==='workouts')body=`${activeWorkoutHTML()}<section class="gym-week-card"><div class="row between center"><div><span>This Week</span><b>${weekSessions.length} session${weekSessions.length===1?'':'s'}</b></div><button class="goal-pill" id="editGymGoalBtn">Goal ${weeklyGoal}</button></div><div class="weekbar"><span style="width:${Math.min(100,weekSessions.length/weeklyGoal*100)}%"></span></div><small class="gym-goal-copy">${weekSessions.length>=weeklyGoal?'Weekly goal reached':`${Math.max(0,weeklyGoal-weekSessions.length)} to go`}</small></section>${state.gym.activeWorkout?'':`<button class="primary full" id="startWorkoutBtn">Start Workout</button>`}<div class="section-title"><h2>Recent Sessions</h2><button data-gym-view="history">See all</button></div><section class="recent-session-list">${recentSessions.slice(0,5).map(k=>`<div class="workout-type done"><span class="workout-icon">${svgIcon('dumbbell')}</span><div><b>Workout</b><small>${formatDateShort(parseDateKey(k))}</small>${workoutDayDetailsHTML(k)}</div></div>`).join('')||'<div class="empty-state">No workout days logged yet.</div>'}</section>`;
  if(view==='progress')body=`<div class="section-title first-section"><h2>Strength Progress</h2><div class="row"><button class="secondary small-btn" id="manageExercisesBtn">Manage</button><button id="addExerciseBtn">+ Exercise</button></div></div><div class="muscle-filter-strip">${['All',...GYM_GROUPS.filter(g=>g!=='Other')].map(g=>`<button class="focus-chip ${g===groupFilter?'active':''}" data-gym-group="${escapeAttr(g)}">${escapeHTML(g)}</button>`).join('')}</div>${state.gym.exercises.length?`<section class="card flat"><label><span class="label">Exercise</span><select id="gymExerciseSelect">${filteredExercises.map(x=>`<option value="${escapeAttr(x.id)}" ${x.id===exercise?.id?'selected':''}>${escapeHTML(x.name)} · ${escapeHTML(x.group||'')}</option>`).join('')}</select></label>${exercise?`<section class="progress-color-grid gym-metrics"><article class="pmetric blue"><small>First</small><b>${first?Number(first.weight):'—'}</b><em>kg</em></article><article class="pmetric green"><small>Current</small><b>${last?Number(last.weight):'—'}</b><em>kg</em></article><article class="pmetric yellow"><small>PR</small><b>${pr||'—'}</b><em>kg</em></article><article class="pmetric purple"><small>Change</small><b>${logs.length>1?(change>0?'+':'')+change:'—'}</b><em>kg</em></article></section><p class="muted gym-chart-note">Best working-set weight per log. Warm-ups excluded.</p>${gymChartHTML(logs)}`:'<div class="empty-state">No exercise in this muscle group yet.</div>'}</section><button class="primary full" id="logGymBtn">+ Log exercise</button>`:`<section class="card flat empty-state">No exercises yet. Add one to start tracking strength.</section>`}<div class="section-title"><h2>Personal Bests</h2></div><section class="card flat pr-groups">${prSectionHTML('Upper Body',upper)}${prSectionHTML('Lower Body',lower)}${prSectionHTML('Core',core)}${other.length?prSectionHTML('Other',other):''}</section>`;
  if(view==='history')body=`<div class="section-title first-section"><h2>${historyExpanded?'All Exercise Logs':'Recent Exercise Logs'}</h2><div class="row"><button class="secondary small-btn" id="toggleGymHistory">${historyExpanded?'Recent':'View all'}</button><button class="secondary small-btn" id="selectGymBtn">${historySelectMode.gym?'Done':'Select'}</button></div></div>${historyExpanded?`<label class="history-exercise-filter"><span class="label">Show</span><select id="gymHistoryFilter"><option value="all" ${historyFilter==='all'?'selected':''}>All exercises</option>${state.gym.exercises.map(x=>`<option value="${escapeAttr(x.id)}" ${historyFilter===x.id?'selected':''}>${escapeHTML(x.name)}</option>`).join('')}</select></label>`:''}${historySelectToolbar('gym')}<section class="card flat">${displayHistory.length?displayHistory.map(l=>{const ex=exerciseById(l.exerciseId);return `<div class="gym-log">${historySelectMode.gym?historySelectCheckbox('gym',l.id):''}<div><b>${escapeHTML(ex?.name||'Deleted exercise')}</b><small>${escapeHTML(formatDateShort(parseDateKey(l.date)))} · ${escapeHTML(ex?.group||'Other')}</small><small>${escapeHTML(gymLogSummary(l))}</small>${gymWarmupSummary(l)?`<small class="gym-warmup-copy">${escapeHTML(gymWarmupSummary(l))}</small>`:''}</div>${historySelectMode.gym?'':`<div class="row"><button class="text-button tiny" data-edit-gym="${l.id}">Edit</button><button class="text-button tiny danger-text" data-del-gym="${l.id}">Delete</button></div>`}</div>`}).join(''):'<div class="empty-state">No exercise logs match this view.</div>'}</section><div class="section-title"><h2>Workout Days</h2><button class="secondary small-btn" id="selectWorkoutBtn">${historySelectMode.workout?'Done':'Select'}</button></div>${historySelectToolbar('workout')}<section class="card flat">${recentSessions.length?recentSessions.map(k=>`<div class="gym-log">${historySelectMode.workout?historySelectCheckbox('workout',k):''}<div><b>${escapeHTML(formatDateShort(parseDateKey(k)))}</b>${workoutDayDetailsHTML(k)}</div>${historySelectMode.workout?'':`<button class="text-button tiny danger-text" data-del-session="${k}">Remove</button>`}</div>`).join(''):'<div class="empty-state">No workout days logged yet.</div>'}</section>`;
  main.innerHTML=`${moreBack()}<div class="segmented gym-tabs"><button data-gym-view="workouts" class="${view==='workouts'?'active':''}">Workouts</button><button data-gym-view="progress" class="${view==='progress'?'active':''}">Progress</button><button data-gym-view="history" class="${view==='history'?'active':''}">History</button></div>${body}`;bindMoreBack();
  $$('[data-gym-view]').forEach(b=>b.onclick=()=>{state.settings.gymView=b.dataset.gymView;save();renderGym();});$$('[data-gym-group]').forEach(b=>b.onclick=()=>{state.settings.gymGroupFilter=b.dataset.gymGroup;const pool=(state.gym.exercises||[]).filter(ex=>b.dataset.gymGroup==='All'||exerciseTargets(ex).includes(b.dataset.gymGroup));if(pool.length)state.settings.selectedExerciseId=pool[0].id;save();renderGym();});if($('#gymExerciseSelect'))$('#gymExerciseSelect').onchange=e=>{state.settings.selectedExerciseId=e.target.value;save();renderGym();};if($('#gymHistoryFilter'))$('#gymHistoryFilter').onchange=e=>{state.settings.gymHistoryExercise=e.target.value;historySelected.gym.clear();historySelectMode.gym=false;save();renderGym();};if($('#toggleGymHistory'))$('#toggleGymHistory').onclick=()=>{state.settings.gymHistoryExpanded=!historyExpanded;if(!state.settings.gymHistoryExpanded)state.settings.gymHistoryExercise='all';historySelected.gym.clear();historySelectMode.gym=false;save();renderGym();};if($('#logGymBtn'))$('#logGymBtn').onclick=()=>openGymLogModal();if($('#startWorkoutBtn'))$('#startWorkoutBtn').onclick=()=>{if(state.gym.activeWorkout)return toast('Your workout is already in progress');openWorkoutPlanner();};$$('[data-workout-details]').forEach(b=>b.onclick=()=>openWorkoutHistoryDay(b.dataset.workoutDetails));$$('[data-workout-log]').forEach(b=>b.onclick=()=>openGymLogModal(null,b.dataset.workoutLog));if($('#finishWorkoutBtn'))$('#finishWorkoutBtn').onclick=finishActiveWorkout;if($('#cancelWorkoutBtn'))$('#cancelWorkoutBtn').onclick=cancelActiveWorkout;if($('#addExerciseBtn'))$('#addExerciseBtn').onclick=()=>openExerciseModal();if($('#manageExercisesBtn'))$('#manageExercisesBtn').onclick=openExerciseManager;if($('#editGymGoalBtn'))$('#editGymGoalBtn').onclick=openGymGoalModal;if($('#selectGymBtn'))$('#selectGymBtn').onclick=()=>historySelectToggle('gym',renderGym);if($('#selectWorkoutBtn'))$('#selectWorkoutBtn').onclick=()=>historySelectToggle('workout',renderGym);$$('[data-edit-gym]').forEach(b=>b.onclick=()=>openGymLogModal(b.dataset.editGym));$$('[data-del-gym]').forEach(b=>b.onclick=()=>{const idx=state.gym.logs.findIndex(l=>l.id===b.dataset.delGym);if(idx<0)return;const removed=state.gym.logs[idx];state.gym.logs.splice(idx,1);save();renderGym();toast('Exercise log deleted','Undo',()=>{state.gym.logs.splice(Math.min(idx,state.gym.logs.length),0,removed);save();renderGym();});});$$('[data-del-session]').forEach(b=>b.onclick=()=>{const k=b.dataset.delSession,existed=state.gym.sessions.includes(k);state.gym.sessions=state.gym.sessions.filter(x=>x!==k);if(!state.gym.sessionExcluded.includes(k))state.gym.sessionExcluded.push(k);save();renderGym();toast('Workout day removed','Undo',()=>{state.gym.sessionExcluded=state.gym.sessionExcluded.filter(x=>x!==k);if(existed&&!state.gym.sessions.includes(k))state.gym.sessions.push(k);save();renderGym();});});bindHistorySelection('gym',renderGym,ids=>{const set=new Set(ids),removed=state.gym.logs.map((item,index)=>({item,index})).filter(x=>set.has(x.item.id));state.gym.logs=state.gym.logs.filter(x=>!set.has(x.id));historySelected.gym.clear();historySelectMode.gym=false;save();renderGym();toast(`${removed.length} exercise logs deleted`,'Undo',()=>{restoreDeletedObjects(state.gym.logs,removed);save();renderGym();});});bindHistorySelection('workout',renderGym,ids=>{const set=new Set(ids),removed=state.gym.sessions.filter(k=>set.has(k));state.gym.sessions=state.gym.sessions.filter(k=>!set.has(k));removed.forEach(k=>{if(!state.gym.sessionExcluded.includes(k))state.gym.sessionExcluded.push(k);});historySelected.workout.clear();historySelectMode.workout=false;save();renderGym();toast(`${removed.length} workout days removed`,'Undo',()=>{removed.forEach(k=>{state.gym.sessionExcluded=state.gym.sessionExcluded.filter(x=>x!==k);if(!state.gym.sessions.includes(k))state.gym.sessions.push(k);});save();renderGym();});});localizeTree(main);
}
function gymChartHTML(logs){logs=logs.filter(l=>gymWorkingSets(l).length).map(l=>({...l,weight:gymWorkingWeight(l)}));if(logs.length<2)return `<div class="chart-empty">Log this exercise at least twice to see a progress chart.</div>`;const pts=logs.slice(-12),vals=pts.map(x=>Number(x.weight||0)),min=Math.min(...vals),max=Math.max(...vals),span=Math.max(1,max-min),w=320,h=130,pad=18,coords=pts.map((x,i)=>({x:pad+(w-pad*2)*(i/Math.max(1,pts.length-1)),y:h-pad-(h-pad*2)*((Number(x.weight)-min)/span),v:Number(x.weight),date:x.date})),path=coords.map((p,i)=>`${i?'L':'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');return `<div class="gym-chart-wrap"><svg class="gym-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Weight progress chart"><path class="chart-line" d="${path}"/>${coords.map(p=>`<circle cx="${p.x}" cy="${p.y}" r="4"><title>${p.v} kg · ${escapeHTML(p.date)}</title></circle>`).join('')}<text x="${pad}" y="14">${max} kg</text><text x="${pad}" y="${h-3}">${min} kg</text></svg></div>`;}

function openExerciseModal(id=null){
  const existing=id?(state.gym.exercises||[]).find(x=>x.id===id):null;prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">GYM</p><h2>${existing?'Edit exercise':'Add an exercise'}</h2><div class="stack"><label><span class="label">Exercise name</span><input class="input" id="exerciseName" value="${escapeAttr(existing?.name||'')}" placeholder="e.g. Incline dumbbell press"></label><label><span class="label">Muscle group</span><select id="exerciseGroup">${[...new Set([existing?.group,...GYM_GROUPS].filter(Boolean))].map(g=>`<option value="${escapeAttr(g)}" ${g===(existing?.group||'Other')?'selected':''}>${escapeHTML(g)}</option>`).join('')}</select></label></div><button class="primary full" id="saveExercise" style="margin-top:14px">${existing?'Save':'Add exercise'}</button>${existing?'<button class="danger-btn full" id="deleteExercise" style="margin-top:8px">Delete exercise</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;openAppSheet(modal);$('#saveExercise').onclick=()=>{const name=$('#exerciseName').value.trim();if(!name)return toast('Add an exercise name');if(existing){existing.name=name;existing.group=$('#exerciseGroup').value||'Other';existing.targets=[existing.group];}else{const x={id:uid('exercise'),name,group:$('#exerciseGroup').value||'Other',targets:[$('#exerciseGroup').value||'Other']};state.gym.exercises.push(x);state.settings.selectedExerciseId=x.id;}save();closeAppSheet(modal);renderGym();toast(existing?'Exercise updated':'Exercise added');};if(existing&&$('#deleteExercise'))$('#deleteExercise').onclick=()=>{const exIndex=state.gym.exercises.findIndex(x=>x.id===existing.id),removedExercise={...existing},removedLogs=(state.gym.logs||[]).map((item,index)=>({item,index})).filter(x=>x.item.exerciseId===existing.id),presetSnapshot=JSON.parse(JSON.stringify(state.gym.workoutPresets||{})),activeWorkoutSnapshot=state.gym.activeWorkout?JSON.parse(JSON.stringify(state.gym.activeWorkout)):null;state.gym.exercises.splice(exIndex,1);state.gym.logs=state.gym.logs.filter(l=>l.exerciseId!==existing.id);Object.keys(state.gym.workoutPresets||{}).forEach(k=>state.gym.workoutPresets[k]=(state.gym.workoutPresets[k]||[]).filter(id=>id!==existing.id));if(state.gym.activeWorkout){state.gym.activeWorkout.exerciseIds=(state.gym.activeWorkout.exerciseIds||[]).filter(id=>id!==existing.id);state.gym.activeWorkout.completedExerciseIds=(state.gym.activeWorkout.completedExerciseIds||[]).filter(id=>id!==existing.id);}state.settings.selectedExerciseId=state.gym.exercises[0]?.id||'';save();closeAppSheet(modal);renderGym();toast('Exercise deleted','Undo',()=>{state.gym.exercises.splice(Math.max(0,Math.min(exIndex,state.gym.exercises.length)),0,removedExercise);restoreDeletedObjects(state.gym.logs,removedLogs);state.gym.workoutPresets=presetSnapshot;if(activeWorkoutSnapshot)state.gym.activeWorkout=activeWorkoutSnapshot;state.settings.selectedExerciseId=removedExercise.id;save();renderGym();});};$('#cancelModal').onclick=()=>closeAppSheet(modal);localizeTree(modalContent);
}
function openExerciseManager(){prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">GYM</p><h2>Manage exercises</h2><div class="exercise-manage-list">${state.gym.exercises.length?state.gym.exercises.map(ex=>`<div class="exercise-manage-row"><div><b>${escapeHTML(ex.name)}</b><small>${escapeHTML(ex.group||'Other')}</small></div><button class="secondary small-btn" data-edit-exercise="${escapeAttr(ex.id)}">Edit</button></div>`).join(''):'<div class="empty-state">No exercises yet.</div>'}</div><button class="primary full" id="managerAddExercise" style="margin-top:12px">+ Add exercise</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Close</button>`;openAppSheet(modal);$$('[data-edit-exercise]').forEach(b=>b.onclick=()=>{closeAppSheet(modal);openExerciseModal(b.dataset.editExercise);});$('#managerAddExercise').onclick=()=>{closeAppSheet(modal);openExerciseModal();};$('#cancelModal').onclick=()=>closeAppSheet(modal);localizeTree(modalContent);}
function openGymGoalModal(){const current=clamp(Number(state.gym.weeklyGoal||3),1,7);prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">GYM</p><h2>Weekly goal</h2><p class="muted">Choose how many workout days you want in a normal week. This is a target, not a fixed program.</p><div class="goal-picker">${Array.from({length:7},(_,i)=>i+1).map(n=>`<button class="goal-number ${n===current?'active':''}" data-goal="${n}">${n}</button>`).join('')}</div><button class="secondary full" id="cancelModal" style="margin-top:12px">Cancel</button>`;openAppSheet(modal);$$('[data-goal]').forEach(b=>b.onclick=()=>{state.gym.weeklyGoal=clamp(Number(b.dataset.goal),1,7);save();closeAppSheet(modal);renderGym();toast(`Weekly goal set to ${state.gym.weeklyGoal}`);});$('#cancelModal').onclick=()=>closeAppSheet(modal);localizeTree(modalContent);}

function daysUntilDate(key){if(!key)return null;const d=parseDateKey(key),t=parseDateKey(todayKey());return Math.round((d-t)/86400000);}
function dueMeta(key){const d=daysUntilDate(key);if(d==null)return {main:'—',sub:'No date set',tone:'muted'};if(d<0)return {main:formatDateShort(parseDateKey(key)),sub:`${Math.abs(d)} day${Math.abs(d)===1?'':'s'} overdue`,tone:'danger'};if(d===0)return {main:formatDateShort(parseDateKey(key)),sub:'Due today',tone:'warn'};return {main:formatDateShort(parseDateKey(key)),sub:`${d} day${d===1?'':'s'} left`,tone:d<=14?'warn':'good'};}
function renderCar(){
  setHeader('Car');
  const c=state.car, fuel=[...(c.fuelLogs||[])].sort((a,b)=>String(b.date).localeCompare(String(a.date))), maintenance=[...(c.maintenanceLogs||[])].sort((a,b)=>String(b.date).localeCompare(String(a.date))), latestFuel=fuel[0];
  const rego=dueMeta(c.regoDue), service=dueMeta(c.serviceDueDate), kmLeft=Number(c.serviceDueKm||0)>0?Number(c.serviceDueKm)-Number(c.odometer||0):null;
  main.innerHTML=`${moreBack()}<section class="car-overview-card"><div class="car-title-row"><div><span class="badge blue">CAR</span><h2>${escapeHTML(c.model||'My car')}</h2></div><button class="secondary small-btn" id="editCarBtn">Edit details</button></div><button class="odometer-panel" id="quickOdoBtn"><span>Odometer</span><strong>${Number(c.odometer||0).toLocaleString(currentLocale())}</strong><small>km · Tap to update</small></button></section>
  <section class="car-status-grid"><article class="car-status"><span class="status-icon blue">${svgIcon('calendar')}</span><div><small>Rego due</small><b>${escapeHTML(rego.main)}</b><em class="${rego.tone}">${escapeHTML(rego.sub)}</em></div></article><article class="car-status"><span class="status-icon orange">${svgIcon('settings')}</span><div><small>Service due</small><b>${escapeHTML(service.main)}</b><em class="${service.tone}">${escapeHTML(service.sub)}${kmLeft!=null?` · ${kmLeft>=0?`${kmLeft.toLocaleString(currentLocale())} km left`:`${Math.abs(kmLeft).toLocaleString(currentLocale())} km overdue`}`:''}</em></div></article><article class="car-status wide"><span class="status-icon green">${svgIcon('car')}</span><div><small>Last fill</small><b>${latestFuel?`${Number(latestFuel.litres||0).toFixed(1)} L`:'—'}</b><em>${latestFuel?`${formatDateShort(parseDateKey(latestFuel.date))} · ${Number(latestFuel.odometer||0).toLocaleString(currentLocale())} km`:'No fuel fill logged yet'}</em></div></article></section>
  <div class="car-action-row"><button class="primary" id="logFuelBtn">+ Fuel</button><button class="secondary" id="logMaintenanceBtn">+ Maintenance</button><button class="secondary" id="quickOdoBtn2">Odometer</button></div>
  <div class="section-title"><h2>Fuel history</h2><button class="secondary small-btn" id="selectFuelBtn">${historySelectMode.fuel?'Done':'Select'}</button></div>${historySelectToolbar('fuel')}<section class="card flat">${fuel.length?fuel.map((f,i)=>{const older=fuel[i+1],km=older&&Number(f.odometer)>Number(older.odometer)?Number(f.odometer)-Number(older.odometer):null;return `<div class="fuel-row">${historySelectMode.fuel?historySelectCheckbox('fuel',f.id):''}<div><b>${Number(f.litres||0).toFixed(1)} L · ${fmtMoney(f.cost)}</b><small>${escapeHTML(formatDateShort(parseDateKey(f.date)))} · ${Number(f.odometer||0).toLocaleString(currentLocale())} km${km?` · ${km.toLocaleString(currentLocale())} km since prior fill`:''}${f.note?` · ${escapeHTML(f.note)}`:''}</small></div>${historySelectMode.fuel?'':`<div class="row"><button class="text-button tiny" data-edit-fuel="${f.id}">Edit</button><button class="text-button tiny danger-text" data-del-fuel="${f.id}">Delete</button></div>`}</div>`}).join(''):'<div class="empty-state">No fuel fills logged yet.</div>'}</section>
  <div class="section-title"><h2>Maintenance history</h2><button class="secondary small-btn" id="selectMaintenanceBtn">${historySelectMode.maintenance?'Done':'Select'}</button></div>${historySelectToolbar('maintenance')}<section class="card flat">${maintenance.length?maintenance.map(m=>`<div class="fuel-row">${historySelectMode.maintenance?historySelectCheckbox('maintenance',m.id):''}<div><b>${escapeHTML(m.service||'Maintenance')}</b><small>${escapeHTML(formatDateShort(parseDateKey(m.date)))} · ${Number(m.odometer||0).toLocaleString(currentLocale())} km${Number(m.cost||0)?` · ${fmtMoney(m.cost)}`:''}${m.note?` · ${escapeHTML(m.note)}`:''}</small></div>${historySelectMode.maintenance?'':`<div class="row"><button class="text-button tiny" data-edit-maint="${m.id}">Edit</button><button class="text-button tiny danger-text" data-del-maint="${m.id}">Delete</button></div>`}</div>`).join(''):'<div class="empty-state">No maintenance logged yet.</div>'}</section>`;
  bindMoreBack();$('#logFuelBtn').onclick=()=>openFuelModal();$('#logMaintenanceBtn').onclick=()=>openMaintenanceModal();$('#editCarBtn').onclick=openCarModal;$('#quickOdoBtn').onclick=openOdometerModal;$('#quickOdoBtn2').onclick=openOdometerModal;
  $('#selectFuelBtn').onclick=()=>historySelectToggle('fuel',renderCar);$('#selectMaintenanceBtn').onclick=()=>historySelectToggle('maintenance',renderCar);
  $$('[data-edit-fuel]').forEach(b=>b.onclick=()=>openFuelModal(b.dataset.editFuel));
  $$('[data-del-fuel]').forEach(b=>b.onclick=()=>{const idx=state.car.fuelLogs.findIndex(x=>x.id===b.dataset.delFuel);if(idx<0)return;const removed=state.car.fuelLogs[idx];state.car.fuelLogs.splice(idx,1);save();renderCar();toast('Fuel entry deleted','Undo',()=>{state.car.fuelLogs.splice(Math.min(idx,state.car.fuelLogs.length),0,removed);save();renderCar();});});
  $$('[data-edit-maint]').forEach(b=>b.onclick=()=>openMaintenanceModal(b.dataset.editMaint));
  $$('[data-del-maint]').forEach(b=>b.onclick=()=>{const idx=state.car.maintenanceLogs.findIndex(x=>x.id===b.dataset.delMaint);if(idx<0)return;const removed=state.car.maintenanceLogs[idx];state.car.maintenanceLogs.splice(idx,1);save();renderCar();toast('Maintenance entry deleted','Undo',()=>{state.car.maintenanceLogs.splice(Math.min(idx,state.car.maintenanceLogs.length),0,removed);save();renderCar();});});
  bindHistorySelection('fuel',renderCar,ids=>{const set=new Set(ids),removed=state.car.fuelLogs.map((item,index)=>({item,index})).filter(x=>set.has(x.item.id));state.car.fuelLogs=state.car.fuelLogs.filter(x=>!set.has(x.id));historySelected.fuel.clear();historySelectMode.fuel=false;save();renderCar();toast(`${removed.length} fuel entr${removed.length===1?'y':'ies'} deleted`,'Undo',()=>{restoreDeletedObjects(state.car.fuelLogs,removed);save();renderCar();});});
  bindHistorySelection('maintenance',renderCar,ids=>{const set=new Set(ids),removed=state.car.maintenanceLogs.map((item,index)=>({item,index})).filter(x=>set.has(x.item.id));state.car.maintenanceLogs=state.car.maintenanceLogs.filter(x=>!set.has(x.id));historySelected.maintenance.clear();historySelectMode.maintenance=false;save();renderCar();toast(`${removed.length} maintenance entr${removed.length===1?'y':'ies'} deleted`,'Undo',()=>{restoreDeletedObjects(state.car.maintenanceLogs,removed);save();renderCar();});});
  localizeTree(main);
}
function openOdometerModal(){
  const c=state.car, original=Math.max(0,Number(c.odometer||0));let value=original;const min=Math.max(0,original-2000),max=original+5000;
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">CAR</p><h2>Update odometer</h2><div class="odo-picker"><small>Current reading</small><strong id="odoPickerValue">${original.toLocaleString(currentLocale())}</strong><span>km</span><input id="odoRange" type="range" min="${min}" max="${max}" step="10" value="${original}" aria-label="Odometer"></div><div class="odo-steps"><button data-odo-step="-100">−100</button><button data-odo-step="-10">−10</button><button data-odo-step="10">+10</button><button data-odo-step="100">+100</button></div><button class="primary full" id="saveOdo" style="margin-top:14px">Save odometer</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);const label=$('#odoPickerValue'),range=$('#odoRange');const draw=()=>{value=Math.max(0,Math.round(value));label.textContent=value.toLocaleString(currentLocale());range.value=String(clamp(value,Number(range.min),Number(range.max)));};range.oninput=()=>{value=Number(range.value);draw();};$$('[data-odo-step]').forEach(b=>b.onclick=()=>{value+=Number(b.dataset.odoStep);draw();});$('#saveOdo').onclick=()=>{c.odometer=value;save();closeAppSheet(modal);renderCar();toast('Odometer updated');};$('#cancelModal').onclick=()=>closeAppSheet(modal);localizeTree(modalContent);
}
function openCarModal(){const c=state.car;prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">CAR</p><h2>Edit car details</h2><div class="stack"><label><span class="label">Car</span><input class="input" id="carModel" value="${escapeAttr(c.model||'')}"></label><label><span class="label">Current odometer (km)</span><input class="input" id="carOdo" type="number" min="0" value="${Number(c.odometer||0)}"></label><div class="form-grid"><label><span class="label">Rego due</span><input class="input" id="carRego" type="date" value="${c.regoDue||''}"></label><label><span class="label">Service due date</span><input class="input" id="carServiceDate" type="date" value="${c.serviceDueDate||''}"></label></div><label><span class="label">Service due odometer (km)</span><input class="input" id="carServiceKm" type="number" min="0" value="${Number(c.serviceDueKm||0)||''}"></label></div><button class="primary full" id="saveCar" style="margin-top:14px">Save car</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;openAppSheet(modal);$('#saveCar').onclick=()=>{state.car.model=$('#carModel').value.trim()||'My car';state.car.odometer=Math.max(0,Number($('#carOdo').value||0));state.car.regoDue=$('#carRego').value||'';state.car.serviceDueDate=$('#carServiceDate').value||'';state.car.serviceDueKm=Math.max(0,Number($('#carServiceKm').value||0));save();closeAppSheet(modal);renderCar();};$('#cancelModal').onclick=()=>closeAppSheet(modal);}
function openFuelModal(id=null){const c=state.car;const existing=id?(c.fuelLogs||[]).find(x=>x.id===id):null;prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">CAR</p><h2>${existing?'Edit':'Log'} a fuel fill</h2><div class="stack"><div class="form-grid"><label><span class="label">Litres</span><input class="input" id="fuelLitres" type="number" min="0" step="0.1" value="${existing?Number(existing.litres):''}"></label><label><span class="label">Cost (SAR)</span><input class="input" id="fuelCost" type="number" min="0" step="1" value="${existing?Number(existing.cost||0):''}"></label></div><div class="form-grid"><label><span class="label">Odometer (km)</span><input class="input" id="fuelOdo" type="number" min="0" value="${existing?Number(existing.odometer||0):Number(c.odometer||0)}"></label><label><span class="label">Date</span><input class="input" id="fuelDate" type="date" value="${existing?.date||todayKey()}"></label></div></div><button class="primary full" id="saveFuel" style="margin-top:14px">Save fuel fill</button>${existing?'<button class="danger-btn full" id="deleteFuel" style="margin-top:8px">Delete entry</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;openAppSheet(modal);$('#saveFuel').onclick=()=>{const litres=Number($('#fuelLitres').value||0),cost=Number($('#fuelCost').value||0),odometer=Number($('#fuelOdo').value||0);if(!(litres>0))return toast('Enter litres');if(odometer<0)return toast('Enter a valid odometer');const data={litres,cost:Math.max(0,cost),odometer,date:$('#fuelDate').value||todayKey()};if(existing)Object.assign(existing,data);else state.car.fuelLogs.push({id:uid('fuel'),...data});state.car.odometer=Math.max(Number(state.car.odometer||0),odometer);save();closeAppSheet(modal);renderCar();toast(existing?'Fuel entry updated':'Fuel fill saved');};if(existing)$('#deleteFuel').onclick=()=>{const idx=state.car.fuelLogs.findIndex(x=>x.id===existing.id);if(idx<0)return;const removed=state.car.fuelLogs[idx];state.car.fuelLogs.splice(idx,1);save();closeAppSheet(modal);renderCar();toast('Fuel entry deleted','Undo',()=>{state.car.fuelLogs.splice(Math.min(idx,state.car.fuelLogs.length),0,removed);save();renderCar();});};$('#cancelModal').onclick=()=>closeAppSheet(modal);}
function openMaintenanceModal(id=null){const c=state.car;const existing=id?(c.maintenanceLogs||[]).find(x=>x.id===id):null;prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">CAR MAINTENANCE</p><h2>${existing?'Edit':'Log'} maintenance</h2><div class="stack"><label><span class="label">What was done?</span><input class="input" id="maintService" value="${escapeAttr(existing?.service||'')}" placeholder="e.g. Engine oil + filter"></label><div class="form-grid"><label><span class="label">Date</span><input class="input" id="maintDate" type="date" value="${existing?.date||todayKey()}"></label><label><span class="label">Odometer (km)</span><input class="input" id="maintOdo" type="number" min="0" value="${existing?Number(existing.odometer||0):Number(c.odometer||0)}"></label></div><label><span class="label">Cost (SAR)</span><input class="input" id="maintCost" type="number" min="0" step="1" value="${existing?Number(existing.cost||0):''}"></label><label><span class="label">Short note (optional)</span><input class="input" id="maintNote" value="${escapeAttr(existing?.note||'')}" placeholder="fluid, parts, next check..."></label></div><button class="primary full" id="saveMaint" style="margin-top:14px">Save maintenance</button>${existing?'<button class="danger-btn full" id="deleteMaint" style="margin-top:8px">Delete entry</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;openAppSheet(modal);$('#saveMaint').onclick=()=>{const service=$('#maintService').value.trim();if(!service)return toast('Add what was done');const odometer=Math.max(0,Number($('#maintOdo').value||0));const data={service,date:$('#maintDate').value||todayKey(),odometer,cost:Math.max(0,Number($('#maintCost').value||0)),note:$('#maintNote').value.trim()};if(existing)Object.assign(existing,data);else c.maintenanceLogs.push({id:uid('maint'),...data});c.odometer=Math.max(Number(c.odometer||0),odometer);save();closeAppSheet(modal);renderCar();toast(existing?'Maintenance updated':'Maintenance saved');};if(existing)$('#deleteMaint').onclick=()=>{const idx=c.maintenanceLogs.findIndex(x=>x.id===existing.id);if(idx<0)return;const removed=c.maintenanceLogs[idx];c.maintenanceLogs.splice(idx,1);save();closeAppSheet(modal);renderCar();toast('Maintenance entry deleted','Undo',()=>{c.maintenanceLogs.splice(Math.min(idx,c.maintenanceLogs.length),0,removed);save();renderCar();});};$('#cancelModal').onclick=()=>closeAppSheet(modal);}
function renderProjects(){
  setHeader('Projects'); const active=state.projects.filter(p=>!p.archived), archived=state.projects.filter(p=>p.archived);
  const cards=list=>list.map(p=>`<button class="project-card ${p.archived?'archived':''}" data-project="${p.id}"><div class="row between center"><div><span class="badge ${p.archived?'muted-badge':p.status==='Completed'?'':'purple'}">${p.archived?'Archived':escapeHTML(p.status)}</span><h3>${escapeHTML(p.name)}</h3></div><strong>${clamp(Number(p.progress||0),0,100)}%</strong></div><div class="weekbar"><span style="width:${clamp(Number(p.progress||0),0,100)}%"></span></div><p>${escapeHTML(p.nextTask||'Set the next task.')}</p></button>`).join('');
  main.innerHTML=`${moreBack()}<div class="section-title first-section"><h2>Active projects</h2><button id="addProjectBtn">+ Project</button></div><section class="project-list">${active.length?cards(active):'<div class="card flat empty-state">No active projects. Start one when you have something worth building.</div>'}</section>${archived.length?`<details class="card flat archive-section"><summary>Archive · ${archived.length}</summary><section class="project-list archive-list">${cards(archived)}</section></details>`:''}`;
  bindMoreBack();$('#addProjectBtn').onclick=()=>openProjectModal();$$('[data-project]').forEach(b=>b.onclick=()=>{historySelected.project.clear();historySelectMode.project=false;state.settings.moreView='project:'+b.dataset.project;save();renderMore();pageScrollTo({top:0,behavior:'auto'});});
}
function renderProjectDetail(id){
  const p=state.projects.find(x=>x.id===id);if(!p){state.settings.moreView='projects';return renderProjects();}setHeader(p.name);
  main.innerHTML=`<button class="back-link" id="projectBackBtn">${svgIcon('chevronLeft')}<span>Projects</span></button><section class="card hero"><div class="row between center"><span class="badge ${p.archived?'muted-badge':'purple'}">${p.archived?'ARCHIVED':escapeHTML(p.status)}</span><button class="secondary small-btn" id="editProjectBtn">Edit</button></div><h2 style="margin-top:14px">${escapeHTML(p.name)}</h2><p class="muted">${escapeHTML(p.description||'No description yet.')}</p><div class="project-progress"><div><b>${clamp(Number(p.progress||0),0,100)}%</b><span>progress</span></div><div class="weekbar"><span style="width:${clamp(Number(p.progress||0),0,100)}%"></span></div></div></section><div class="section-title"><h2>Next task</h2></div><section class="card flat"><h3>${escapeHTML(p.nextTask||'Choose the next useful step.')}</h3></section><div class="section-title"><h2>Plan</h2></div><section class="card flat"><p class="project-plan">${escapeHTML(p.plan||'No plan written yet. Keep it short.')}</p></section><section class="grid-3"><div class="stat"><small>Sessions</small><strong>${Number(p.sessions||0)}</strong></div><div class="stat"><small>Status</small><strong>${p.archived?'Archived':escapeHTML(p.status)}</strong></div><div class="stat"><small>Progress</small><strong>${clamp(Number(p.progress||0),0,100)}%</strong></div></section>${p.archived?'<button class="secondary full" id="restoreProjectBtn">Restore project</button>':'<button class="primary full" id="logProjectBtn">+ Log project session</button>'}<div class="section-title"><h2>Activity history</h2><button class="secondary small-btn" id="selectProjectHistoryBtn">${historySelectMode.project?'Done':'Select'}</button></div>${historySelectToolbar('project')}<section class="card flat">${(p.logs||[]).length?p.logs.slice().reverse().map(l=>`<div class="project-log">${historySelectMode.project?historySelectCheckbox('project',l.id):''}<div><b>${escapeHTML(l.note||'Project session')}</b><small>${escapeHTML(formatDateShort(parseDateKey(l.date)))}</small></div>${historySelectMode.project?'':`<div class="row"><button class="text-button tiny" data-edit-project-log="${l.id}">Edit</button><button class="text-button tiny danger-text" data-del-project-log="${l.id}">Delete</button></div>`}</div>`).join(''):'<div class="empty-state">No project sessions logged yet.</div>'}</section>`;
  $('#projectBackBtn').onclick=()=>{historySelected.project.clear();historySelectMode.project=false;state.settings.moreView='projects';save();renderMore();};$('#editProjectBtn').onclick=()=>openProjectModal(p.id);if($('#logProjectBtn'))$('#logProjectBtn').onclick=()=>openProjectSessionModal(p.id);if($('#restoreProjectBtn'))$('#restoreProjectBtn').onclick=()=>{p.archived=false;save();renderProjectDetail(p.id);toast('Project restored');};if($('#selectProjectHistoryBtn'))$('#selectProjectHistoryBtn').onclick=()=>historySelectToggle('project',()=>renderProjectDetail(p.id));$$('[data-edit-project-log]').forEach(b=>b.onclick=()=>openProjectSessionModal(p.id,b.dataset.editProjectLog));$$('[data-del-project-log]').forEach(b=>b.onclick=()=>{const idx=p.logs.findIndex(x=>x.id===b.dataset.delProjectLog);if(idx<0)return;const removed=p.logs[idx];p.logs.splice(idx,1);p.sessions=Math.max(0,Number(p.sessions||0)-1);save();renderProjectDetail(p.id);toast('Project session deleted','Undo',()=>{p.logs.splice(Math.min(idx,p.logs.length),0,removed);p.sessions=Number(p.sessions||0)+1;save();renderProjectDetail(p.id);});});bindHistorySelection('project',()=>renderProjectDetail(p.id),ids=>{const set=new Set(ids),removed=p.logs.map((item,index)=>({item,index})).filter(x=>set.has(x.item.id));p.logs=p.logs.filter(x=>!set.has(x.id));p.sessions=Math.max(0,Number(p.sessions||0)-removed.length);historySelected.project.clear();historySelectMode.project=false;save();renderProjectDetail(p.id);toast(`${removed.length} project session${removed.length===1?'':'s'} deleted`,'Undo',()=>{restoreDeletedObjects(p.logs,removed);p.sessions=Number(p.sessions||0)+removed.length;save();renderProjectDetail(p.id);});});
}
function openProjectModal(id=null){
  const p=id?state.projects.find(x=>x.id===id):null;const x=p||{name:'',status:'Active',archived:false,progress:0,description:'',nextTask:'',plan:''};
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">PROJECT</p><h2>${p?'Edit project':'New project'}</h2><div class="stack"><label><span class="label">Project name</span><input class="input" id="projectName" value="${escapeAttr(x.name)}"></label><label><span class="label">What is this project?</span><textarea id="projectDescription">${escapeHTML(x.description||'')}</textarea></label><label><span class="label">Next task</span><input class="input" id="projectNext" value="${escapeAttr(x.nextTask||'')}" placeholder="The next concrete thing to do"></label><label><span class="label">Plan / notes</span><textarea id="projectPlan">${escapeHTML(x.plan||'')}</textarea></label><div class="form-grid"><label><span class="label">Progress %</span><input class="input" id="projectProgress" type="number" min="0" max="100" value="${Number(x.progress||0)}"></label><label><span class="label">Status</span><select id="projectStatus"><option ${x.status==='Active'?'selected':''}>Active</option><option ${x.status==='Paused'?'selected':''}>Paused</option><option ${x.status==='Completed'?'selected':''}>Completed</option></select></label></div></div><button class="primary full" id="saveProject" style="margin-top:14px">Save project</button>${p?`<button class="secondary full" id="archiveProject" style="margin-top:8px">${p.archived?'Restore from archive':'Archive project'}</button>${p.archived?'<button class="danger-btn full" id="deleteProject" style="margin-top:8px">Delete permanently</button>':''}`:''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);
  $('#saveProject').onclick=()=>{const name=$('#projectName').value.trim();if(!name)return toast('Add a project name');const data={name,status:$('#projectStatus').value,progress:clamp(Number($('#projectProgress').value||0),0,100),description:$('#projectDescription').value.trim(),nextTask:$('#projectNext').value.trim(),plan:$('#projectPlan').value.trim()};if(p)Object.assign(p,data);else state.projects.push({id:uid('project'),archived:false,sessions:0,logs:[],...data});save();closeAppSheet(modal);if(p){state.settings.moreView='project:'+p.id;renderMore();}else renderProjects();};
  if(p)$('#archiveProject').onclick=()=>{p.archived=!p.archived;save();closeAppSheet(modal);renderProjectDetail(p.id);toast(p.archived?'Project archived':'Project restored');};
  if(p&&$('#deleteProject'))$('#deleteProject').onclick=()=>{if(!confirm('Permanently delete this archived project and its history?'))return;state.projects=state.projects.filter(x=>x.id!==p.id);state.settings.moreView='projects';save();closeAppSheet(modal);renderMore();};
  $('#cancelModal').onclick=()=>closeAppSheet(modal);
}
function openProjectSessionModal(id,logId=null){const p=state.projects.find(x=>x.id===id);if(!p)return;const existing=logId?(p.logs||[]).find(x=>x.id===logId):null;prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">PROJECT SESSION</p><h2>${escapeHTML(p.name)}</h2><div class="stack"><label><span class="label">What did you move forward?</span><textarea id="projectSessionNote" placeholder="A short note is enough.">${escapeHTML(existing?.note||'')}</textarea></label><label><span class="label">Date</span><input class="input" id="projectSessionDate" type="date" value="${existing?.date||todayKey()}"></label></div><button class="primary full" id="saveProjectSession" style="margin-top:14px">Save session</button>${existing?'<button class="danger-btn full" id="deleteProjectSession" style="margin-top:8px">Delete session</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;openAppSheet(modal);$('#saveProjectSession').onclick=()=>{const data={date:$('#projectSessionDate').value||todayKey(),note:$('#projectSessionNote').value.trim()||'Focused project session'};if(existing)Object.assign(existing,data);else{p.sessions=Number(p.sessions||0)+1;if(!Array.isArray(p.logs))p.logs=[];p.logs.push({id:uid('projectlog'),...data});}save();closeAppSheet(modal);renderProjectDetail(p.id);toast(existing?'Project session updated':'Project session logged');};if(existing)$('#deleteProjectSession').onclick=()=>{const idx=p.logs.findIndex(x=>x.id===existing.id);if(idx<0)return;const removed=p.logs[idx];p.logs.splice(idx,1);p.sessions=Math.max(0,Number(p.sessions||0)-1);save();closeAppSheet(modal);renderProjectDetail(p.id);toast('Project session deleted','Undo',()=>{p.logs.splice(Math.min(idx,p.logs.length),0,removed);p.sessions=Number(p.sessions||0)+1;save();renderProjectDetail(p.id);});};$('#cancelModal').onclick=()=>closeAppSheet(modal);}
function openModeModal(){const cur=currentMode();const modes=[['normal','Normal','Full routine and normal weekly plan.'],['bad','Bad day','Today only: keep essentials, classes, meals, outside and sleep. It resets tomorrow.'],['exam','Exam','Temporarily park projects and nonessential life admin. Keep uni, sleep, food and training.'],['holiday','Holiday','Pause university items without deleting the timetable. Keep life, gym, projects and sleep.']];prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">DAY MODE</p><h2>How should Reset treat your schedule?</h2><div class="mode-list">${modes.map(([id,name,desc])=>`<button class="mode-option ${id===cur?'active':''}" data-mode="${id}"><span><b>${name}</b><small>${desc}</small></span><strong>${id===cur?'✓':''}</strong></button>`).join('')}</div><button class="secondary full" id="cancelModal" style="margin-top:10px">Cancel</button>`;openAppSheet(modal);$$('[data-mode]').forEach(b=>b.onclick=()=>{state.settings.mode=b.dataset.mode;state.settings.modeSetDate=todayKey();ensureRecord(todayKey()).mode=b.dataset.mode;save();closeAppSheet(modal);renderToday();toast(`${modeName()} mode active`);});$('#cancelModal').onclick=()=>closeAppSheet(modal);}

/* ===== Reset v3.4 stability + planning layer ===== */
const SAFETY_KEY = `${APP_KEY}-safety-v1`;
function deepClone(value){return JSON.parse(JSON.stringify(value));}
function createSafetySnapshot(reason='Safety snapshot'){
  try{localStorage.setItem(SAFETY_KEY,JSON.stringify({createdAt:new Date().toISOString(),reason,state:deepClone(state)}));return true;}catch(e){return false;}
}
function clearSafetySnapshot(){try{localStorage.removeItem(SAFETY_KEY);}catch(e){}}
function sameLocalDateTimeKey(value,key){return !!value&&String(value).slice(0,10)===key;}
function civilDateMinutes(value){
  const m=String(value||'').match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);if(!m)return null;
  return Date.UTC(Number(m[1]),Number(m[2])-1,Number(m[3]),Number(m[4]),Number(m[5]))/60000;
}
function clockMinutesFromDateTime(value){const m=String(value||'').match(/T(\d{2}):(\d{2})/);return m?Number(m[1])*60+Number(m[2]):null;}
function localOffsetForInput(value){const d=new Date(value);return Number.isNaN(d.getTime())?null:d.getTimezoneOffset();}
function stableDurationHours(startValue,endValue,startOffset=null,endOffset=null){
  const a=civilDateMinutes(startValue),b=civilDateMinutes(endValue);if(a==null||b==null)return null;
  const ao=Number.isFinite(Number(startOffset))?Number(startOffset):0,bo=Number.isFinite(Number(endOffset))?Number(endOffset):0;
  return ((b+bo)-(a+ao))/60;
}
function actualMinutesForRecord(value,key,allowNextDay=false){
  if(!value||!value.includes('T'))return null;
  const valueKey=String(value).slice(0,10),clock=clockMinutesFromDateTime(value);if(clock==null)return null;
  if(valueKey===key)return clock;
  if(allowNextDay&&valueKey===todayKey(addDays(parseDateKey(key),1)))return clock+1440;
  return null;
}
function anchorPlannedOverride(item,key){return state.records[key]?.timeOverrides?.[occurrenceKey(item)]||null;}

// Planned anchors and actual behaviour are deliberately separate. Actual times only affect display and adaptive planning.
function applyDailyOverride(item,key,ignoreOverrides=false){
  if(ignoreOverrides)return item;
  const override=state.records[key]?.timeOverrides?.[occurrenceKey(item)];
  let result=override?{...item,...override,adjusted:true}:{...item};
  const rec=state.records[key]||{};
  if(item.id==='wake'&&rec.actualWakeAt){
    const actual=actualMinutesForRecord(rec.actualWakeAt,key,false);
    if(actual!=null){const dur=durationMinutes(item);result={...result,plannedStart:result.start,plannedDayOffset:Number(result.dayOffset||0),start:minutesToTime(actual),end:minutesToTime(actual+dur),dayOffset:0,actualized:true};}
  }
  if(item.id==='sleep'&&rec.actualSleepAt){
    const actual=actualMinutesForRecord(rec.actualSleepAt,key,true);
    if(actual!=null){const dur=durationMinutes(item);result={...result,plannedStart:result.start,plannedDayOffset:Number(result.dayOffset||0),start:minutesToTime(actual),end:minutesToTime(actual+dur),dayOffset:Math.floor(actual/1440),actualized:true};}
  }
  return result;
}

function taskIconName(item){
  const title=String(item?.title||'').toLowerCase();
  if(itemIsNonBlocking(item))return 'bell';
  if(item?.id==='wake'||/wake/.test(title))return 'bed';
  if(item?.id==='groom'||/shower|groom/.test(title))return 'shower';
  if(item?.id==='sleep'||/sleep/.test(title))return 'moon';
  if(/breakfast|lunch|dinner|meal|food/.test(title)||item?.category==='Food')return 'utensils';
  if(item?.category==='University'||item?.isClass)return 'university';
  if(item?.category==='Fitness'||/gym|workout|mobility/.test(title))return 'dumbbell';
  if(item?.category==='Project')return 'folder';
  if(/walk|outside/.test(title))return 'walk';
  if(/money|spend|budget/.test(title))return 'wallet';
  if(item?.fixed)return 'calendar';
  if(item?.category==='Sleep')return 'bed';
  return 'list';
}
function taskIconTone(item){const icon=taskIconName(item);if(icon==='bell')return 'yellow';if(icon==='bed'||icon==='moon')return 'purple';if(icon==='shower')return 'blue';if(icon==='utensils')return 'orange';if(icon==='university')return 'blue';if(icon==='dumbbell'||icon==='walk')return 'green';if(icon==='folder')return 'purple';if(icon==='wallet')return 'yellow';return 'neutral';}
function taskIconHTML(item,extra=''){return `<span class="task-symbol task-tone-${taskIconTone(item)} ${extra}">${svgIcon(taskIconName(item))}</span>`;}
function mealRank(item){const id=String(item?.id||'').toLowerCase(),title=String(item?.title||'').toLowerCase();if(id==='breakfast'||/breakfast|first meal/.test(title))return 1;if(id.startsWith('lunch')||/\blunch\b/.test(title))return 2;if(id==='dinner'||/\bdinner\b/.test(title))return 3;return 0;}
function morningRank(item){if(item?.id==='groom')return 1;if(item?.id==='breakfast')return 2;return 0;}
function preferredComparator(a,b){
  const am=mealRank(a),bm=mealRank(b);if(am&&bm)return am-bm;
  const ar=morningRank(a),br=morningRank(b);if(ar&&br)return ar-br;
  return itemSortMinutes(a)-itemSortMinutes(b)||String(a.title).localeCompare(String(b.title));
}
function plannedWakeAbsolute(date){return minutesFromTime(dayWakeTime(date));}
function effectiveWakeAbsolute(date){const key=todayKey(date),actual=actualMinutesForRecord(state.records[key]?.actualWakeAt,key,false);return actual!=null?actual:plannedWakeAbsolute(date);}
function effectiveWakeEnd(date){const wake=dailyWakeItem(date);return effectiveWakeAbsolute(date)+durationMinutes(wake||{start:dayWakeTime(date),end:minutesToTime(minutesFromTime(dayWakeTime(date))+10)});}
function plannedSleepAbsolute(date){return daySleepAbsoluteMinutes(date);}
function removeUnscheduledOccurrence(key,occ){const rec=ensureRecord(key);rec.unscheduledItems=(rec.unscheduledItems||[]).filter(x=>x!==occ);}

function setItemTimeOverride(item,key,startTime){
  const rec=ensureRecord(key),occ=occurrenceKey(item),dur=itemDurationForMove(item),start=minutesFromTime(startTime),existing=rec.timeOverrides[occ]||{},preferred=minutesToTime(start);
  rec.timeOverrides[occ]={...existing,start:preferred,end:minutesToTime(start+dur),dayOffset:Math.floor(start/1440),manual:true,adaptive:false,manualPreferredStart:preferred};
  removeUnscheduledOccurrence(key,occ);save();
}
function clearItemTimeOverride(item,key){const rec=ensureRecord(key);delete rec.timeOverrides[occurrenceKey(item)];removeUnscheduledOccurrence(key,occurrenceKey(item));save();}

function dayAttentionIssues(date){
  const key=todayKey(date),rec=ensureRecord(key),issues=[];
  const all=itemsForMode(itemsForDate(date),modeForDate(key));
  const unscheduled=new Set((rec.unscheduledItems||[]).filter(occ=>all.some(x=>occurrenceKey(x)===occ&&!isClosedStatus(getStatus(x,key)))));
  if(unscheduled.size)issues.push(`${unscheduled.size} task${unscheduled.size===1?'':'s'} could not fit into the day`);
  const active=all.filter(i=>!['cancelled','dropped','deferred','missed'].includes(getStatus(i,key))&&!unscheduled.has(occurrenceKey(i)));
  const wakeEnd=effectiveWakeEnd(date),sleepLimit=plannedSleepAbsolute(date);
  const beforeWake=active.filter(i=>!isDayAnchor(i)&&getStatus(i,key)!=='done'&&itemEndSortMinutes(i)<=wakeEnd);
  if(beforeWake.length){const fixed=beforeWake.find(itemIsFixed);issues.push(fixed?`${fixed.title} is before your wake time`:`${beforeWake.length} task${beforeWake.length===1?' is':'s are'} before your wake time`);}
  const afterSleep=active.filter(i=>!isDayAnchor(i)&&getStatus(i,key)!=='done'&&itemEndSortMinutes(i)>sleepLimit);
  if(afterSleep.length)issues.push(`${afterSleep.length} task${afterSleep.length===1?' runs':'s run'} past sleep`);
  const meals=active.filter(i=>mealRank(i)>0&&getStatus(i,key)!=='done').sort((a,b)=>mealRank(a)-mealRank(b));
  for(let i=1;i<meals.length;i++){
    if(itemSortMinutes(meals[i])<=itemSortMinutes(meals[i-1])){issues.push('Meal order needs attention');break;}
    if(itemSortMinutes(meals[i])-itemEndSortMinutes(meals[i-1])<90){issues.push('Meals are too close together');break;}
  }
  const timed=active.filter(i=>!isDayAnchor(i)&&!unscheduled.has(occurrenceKey(i))).sort((a,b)=>itemSortMinutes(a)-itemSortMinutes(b));
  for(let i=1;i<timed.length;i++){
    const a=timed[i-1],b=timed[i];
    if(itemSortMinutes(b)<itemEndSortMinutes(a)&&getStatus(a,key)!=='done'&&getStatus(b,key)!=='done'){
      if(itemIsFixed(a)||itemIsFixed(b)){issues.push('A fixed event overlaps another task');break;}
    }
  }
  return [...new Set(issues)].slice(0,4);
}
function hasDayAnchorOverride(date,id){const key=todayKey(date),item=id==='wake'?dailyWakeItem(date):dailySleepItem(date);return !!(item&&state.records[key]?.timeOverrides?.[occurrenceKey(item)]?.dayAnchor);}
function isDayPlanned(date){
  const key=todayKey(date),rec=state.records[key]||{};
  return !!(rec.futurePlannedAt||rec.dayPlanType&&rec.dayPlanType!=='planned'||Object.values(rec.timeOverrides||{}).some(x=>x?.manual)||state.oneOffTasks.some(x=>x.date===key));
}
function dayPlanStatusLegacy(date){
  const key=todayKey(date),issues=dayAttentionIssues(date),completion=dayCompletion(date),rec=state.records[key]||{};
  if(issues.length)return {label:'Needs attention',tone:'attention',icon:'warning'};
  if(key<=todayKey()&&completion===100)return {label:'Complete',tone:'complete',icon:'check'};
  if(isDayPlanned(date))return {label:rec.dayPlanType==='focus'?'Focus day':rec.dayPlanType==='travel'?'Travel':rec.dayPlanType==='rest'?'Rest day':'Planned',tone:'planned',icon:rec.dayPlanType==='focus'?'target':rec.dayPlanType==='travel'?'plane':rec.dayPlanType==='rest'?'bed':'calendar'};
  return {label:'On track',tone:'track',icon:'check'};
}

function buildDaySchedulePlan(date,{kind='future',preserveManual=true,wakeTime=null,sleepTime=null}={}){
  const key=todayKey(date),rec=ensureRecord(key),manualMap=rec.timeOverrides||{},mode=modeForDate(key);
  const baseRaw=itemsForMode(itemsForDate(date,{ignoreOverrides:true}),mode);
  const wakeBase=baseRaw.find(i=>i.id==='wake'),sleepBase=baseRaw.find(i=>i.id==='sleep');
  const recurringWake=minutesFromTime(wakeBase?.start||state.profile.wakeTarget||'08:00');
  const chosenWakeTime=wakeTime||manualMap[wakeBase?occurrenceKey(wakeBase):'']?.start||wakeBase?.start||state.profile.wakeTarget||'08:00';
  const chosenWake=minutesFromTime(chosenWakeTime);
  const chosenSleepTime=sleepTime||manualMap[sleepBase?occurrenceKey(sleepBase):'']?.start||sleepBase?.start||state.profile.sleepTarget||'23:30';
  const chosenSleepOff=sleepDayOffsetForTime(chosenSleepTime),sleepLimit=minutesFromTime(chosenSleepTime)+1440*chosenSleepOff;
  const actualWake=(kind==='today'?actualMinutesForRecord(rec.actualWakeAt,key,false):null);
  const schedulingWake=actualWake!=null?actualWake:chosenWake;
  const wakeDur=durationMinutes(wakeBase||{start:chosenWakeTime,end:minutesToTime(chosenWake+10)});
  const now=kind==='today'?roundUpMinutes(currentMinutes(),5):schedulingWake+wakeDur;
  const floor=kind==='today'?Math.max(now,schedulingWake+wakeDur):schedulingWake+wakeDur;
  const overrides={};
  // Preserve genuine one-day anchor overrides. Rebuilding a normal day must not create fake overrides.
  if(wakeBase){const occ=occurrenceKey(wakeBase),routine=minutesToTime(minutesFromTime(wakeBase.start)),normalized=minutesToTime(chosenWake);if(normalized!==routine||manualMap[occ]?.dayAnchor){const dur=durationMinutes(wakeBase);overrides[occ]={start:normalized,end:minutesToTime(chosenWake+dur),dayOffset:0,manual:true,adaptive:false,dayAnchor:true};}}
  if(sleepBase){const occ=occurrenceKey(sleepBase),routine=minutesToTime(minutesFromTime(sleepBase.start)),normalized=minutesToTime(minutesFromTime(chosenSleepTime));if(normalized!==routine||manualMap[occ]?.dayAnchor){const dur=durationMinutes(sleepBase),abs=minutesFromTime(normalized)+1440*chosenSleepOff;overrides[occ]={start:normalized,end:minutesToTime(abs+dur),dayOffset:chosenSleepOff,manual:true,adaptive:false,dayAnchor:true};}}
  // Completed items keep the exact time they were displayed at; a rebuild is about the remaining day.
  Object.entries(manualMap).forEach(([occ,ov])=>{const item=baseRaw.find(x=>occurrenceKey(x)===occ);if(item&&getStatus(item,key)==='done'&&!isDayAnchor(item))overrides[occ]={...ov};});
  let baseItems=baseRaw.map(i=>{const ov=preserveManual?manualMap[occurrenceKey(i)]:null;return ov?.manual&&!ov?.dayAnchor?{...i,...ov}:i;});
  const fixed=baseItems.filter(i=>!isDayAnchor(i)&&itemIsFixed(i)&&!['done','cancelled','dropped','deferred'].includes(getStatus(i,key)));
  const missedFixed=kind==='today'?fixed.filter(i=>getStatus(i,key)==='pending'&&itemEndSortMinutes(i)<currentMinutes()):[];
  const blocked=[];
  fixed.forEach(i=>{if(!itemAllowsOverlap(i)&&(itemEndSortMinutes(i)>floor||kind!=='today'))blocked.push({start:itemSortMinutes(i),end:itemEndSortMinutes(i),item:i});});
  const statusesToSkip=new Set(['done','cancelled','deferred','dropped']);
  const movable=baseItems.filter(i=>!isDayAnchor(i)&&!itemIsFixed(i)&&!itemIsNonBlocking(i)&&!statusesToSkip.has(getStatus(i,key)));
  const wakeShift=schedulingWake-recurringWake;
  const manualPreferredMinutes=(item)=>{
    const ov=manualMap[occurrenceKey(item)];
    if(!preserveManual||!ov?.manual||ov?.dayAnchor)return null;
    return minutesFromTime(ov.manualPreferredStart||ov.start||item.start);
  };
  const basePref=(item)=>{
    const preferred=manualPreferredMinutes(item),manual=preferred!=null;
    let desired=manual?preferred:itemSortMinutes(item);
    if(!manual&&['groom','breakfast'].includes(item.id))desired+=wakeShift;
    if(desired<schedulingWake+wakeDur)desired=floor;
    if(kind==='today'&&itemEndSortMinutes(item)<floor)desired=floor;
    return Math.max(floor,desired);
  };
  // Manual moves are respected unless they violate an obvious routine rule.
  // Build meal preference floors first so Breakfast → Lunch → Dinner stays
  // ordered even when a user previously dragged Dinner to an impossible time.
  const mealDesired=new Map();let semanticMealEnd=null;
  [...movable].filter(i=>mealRank(i)>0).sort((a,b)=>mealRank(a)-mealRank(b)||basePref(a)-basePref(b)).forEach(item=>{
    let desired=basePref(item);if(semanticMealEnd!=null)desired=Math.max(desired,semanticMealEnd+120);
    mealDesired.set(occurrenceKey(item),desired);semanticMealEnd=desired+durationMinutes(item);
  });
  const pref=(item)=>mealDesired.has(occurrenceKey(item))?mealDesired.get(occurrenceKey(item)):basePref(item);
  const originalMinutes=(item)=>{const original=baseRaw.find(x=>occurrenceKey(x)===occurrenceKey(item));return original?itemSortMinutes(original):itemSortMinutes(item);};
  movable.sort((a,b)=>{
    const ar=morningRank(a),br=morningRank(b);if(ar||br){if(ar&&br)return ar-br;return ar?-1:1;}
    return pref(a)-pref(b)||originalMinutes(a)-originalMinutes(b)||String(a.title).localeCompare(String(b.title));
  });
  const moved=[],unplaced=[];let lastMealEnd=null;
  for(const item of movable){
    const occ=occurrenceKey(item),normalDuration=durationMinutes(item),overdue=kind==='today'&&(itemEndSortMinutes(item)<floor||getStatus(item,key)==='missed');
    const duration=overdue?Math.max(5,Math.min(normalDuration,Number(item.minMinutes||normalDuration))):normalDuration;
    let desired=pref(item);
    const mr=mealRank(item);if(mr&&lastMealEnd!=null)desired=Math.max(desired,lastMealEnd+120);
    let slot=findOpenSlot(desired,duration,blocked,sleepLimit);
    const wasManual=!!manualMap[occ]?.manual&&!manualMap[occ]?.dayAnchor;
    if(slot==null&&kind==='future')slot=findOpenSlotBackward(sleepLimit,duration,blocked,(mr||wasManual)?desired:floor);
    if(slot==null){unplaced.push(item);if(wasManual)overrides[occ]={...manualMap[occ]};continue;}
    const newStart=slot,newEnd=slot+duration;blocked.push({start:newStart,end:newEnd,item});if(mr)lastMealEnd=newEnd;
    const original=baseRaw.find(x=>occurrenceKey(x)===occ);
    const changed=!original||newStart!==itemSortMinutes(original)||duration!==normalDuration||overdue||(preserveManual&&wasManual)||(['groom','breakfast'].includes(item.id)&&wakeShift!==0);
    if(changed){const ov={start:minutesToTime(newStart),end:minutesToTime(newEnd),dayOffset:Math.floor(newStart/1440),adaptive:true,manual:preserveManual&&wasManual};if(preserveManual&&wasManual)ov.manualPreferredStart=manualMap[occ]?.manualPreferredStart||manualMap[occ]?.start||item.start;overrides[occ]=ov;moved.push({...item,...ov});}
  }
  return {key,kind,now,floor,overrides,moved,missedFixed,unplaced,preserveManual,wakeTime:chosenWakeTime,sleepTime:chosenSleepTime,manualCount:Object.values(manualMap).filter(x=>x?.manual&&!x?.dayAnchor).length};
}
function buildAdaptiveRestartPlan(date=new Date(),preserveManual=false){return buildDaySchedulePlan(date,{kind:'today',preserveManual,wakeTime:dayWakeTime(date),sleepTime:daySleepTime(date)});}
function buildFutureDayPlan(date,preserveManual=true,wakeTime=null,sleepTime=null){return buildDaySchedulePlan(date,{kind:'future',preserveManual,wakeTime:wakeTime||dayWakeTime(date),sleepTime:sleepTime||daySleepTime(date)});}
function applyAdaptiveRestart(plan){
  const rec=ensureRecord(plan.key);rec.timeOverrides=plan.overrides;rec.unscheduledItems=plan.unplaced.map(occurrenceKey);rec.schedulerAttention=plan.unplaced.map(i=>`${i.title} could not fit before sleep`);
  for(const item of plan.missedFixed){if(getStatus(item,plan.key)!=='done'&&getStatus(item,plan.key)!=='cancelled')rec.itemStatus[occurrenceKey(item)]='missed';}
  for(const item of plan.moved){if(rec.itemStatus[occurrenceKey(item)]==='missed')delete rec.itemStatus[occurrenceKey(item)];}
  Object.keys(rec.itemStatus).forEach(k=>{if(rec.itemStatus[k]!=='missed')return;const item=itemsForDate(parseDateKey(plan.key),{ignoreOverrides:true}).find(x=>occurrenceKey(x)===k);if(item&&!itemIsFixed(item)&&!rec.unscheduledItems.includes(k))delete rec.itemStatus[k];});
  rec.resetCount=(rec.resetCount||0)+1;rec.restartAt=new Date().toISOString();save();
}
function applyFutureDayPlan(plan){const rec=ensureRecord(plan.key);rec.timeOverrides=plan.overrides;rec.unscheduledItems=plan.unplaced.map(occurrenceKey);rec.schedulerAttention=plan.unplaced.map(i=>`${i.title} could not fit before sleep`);rec.futurePlannedAt=new Date().toISOString();save();}

function daySnapshot(key){return deepClone(ensureRecord(key));}
function restoreDaySnapshot(key,snapshot){state.records[key]=deepClone(snapshot);save();render();}
function openRestartModal(){
  const date=new Date(),key=todayKey(date),keepPlan=buildAdaptiveRestartPlan(date,true),resetPlan=buildAdaptiveRestartPlan(date,false),manualCount=keepPlan.manualCount,p=manualCount?keepPlan:resetPlan,missCount=p.missedFixed.length,attention=p.unplaced.length;
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">ADAPTIVE RESTART</p><h2>Rebuild the rest of today.</h2><p class="muted">Wake and sleep stay as real day boundaries. Classes and appointments never move.${missCount?` ${missCount} fixed event${missCount===1?' is':'s are'} already past and will be marked missed.`:''}${attention?` ${attention} task${attention===1?' may':'s may'} need attention if there is not enough room.`:''}</p>${manualCount?`<div class="card flat restart-preview"><b>${manualCount} manual move${manualCount===1?'':'s'} detected</b><small>Keep your choices where possible, or rebuild from the original routine.</small></div><button class="primary full" id="restartKeepMoves" style="margin-top:12px">Rebuild + keep my moves</button><button class="secondary full" id="restartResetMoves" style="margin-top:8px">Reset my moves + rebuild</button>`:`<div class="card flat restart-preview"><b>Smart rebuild</b><small>Flexible tasks compact around your effective wake time and fixed events. Meals stay in order.</small></div><button class="primary full" id="restartResetMoves" style="margin-top:12px">Rebuild today</button>`}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);
  const run=(plan,label)=>{const before=daySnapshot(key);createSafetySnapshot('Before rebuilding today');applyAdaptiveRestart(plan);closeAppSheet(modal);renderToday();toast(label,'Undo',()=>restoreDaySnapshot(key,before));};
  if($('#restartKeepMoves'))$('#restartKeepMoves').onclick=()=>run(keepPlan,'Today rebuilt and your moves were kept');
  $('#restartResetMoves').onclick=()=>run(resetPlan,manualCount?'Today rebuilt from the original routine':'Today rebuilt');
  $('#cancelModal').onclick=()=>closeAppSheet(modal);
}

function exceptionItemHTML(item,date){
  const key=todayKey(date),status=getStatus(item,key),fixed=itemIsFixed(item),canRestore=status==='cancelled'||(status==='missed'&&!fixed);
  return `<div class="exception-item ${status}">${taskIconHTML(item)}<div class="exception-copy"><b>${escapeHTML(item.title)}</b><small>${escapeHTML(timeWindow(item))} · ${status==='missed'?'Missed':'Cancelled for this day'}</small></div>${canRestore?`<button class="secondary small-btn" data-exception-restore="${escapeAttr(occurrenceKey(item))}">Restore</button>`:''}</div>`;
}
function attentionItemHTML(item,date){const key=todayKey(date);return `<div class="attention-item">${taskIconHTML(item)}<div><b>${escapeHTML(item.title)}</b><small>Reset could not fit this task before sleep.</small></div><button class="secondary small-btn" data-attention-move="${escapeAttr(occurrenceKey(item))}" data-date="${key}">Move</button></div>`;}

function timelineItemHTML(item,date,showActions=false){
  const key=todayKey(date),status=getStatus(item,key),timeState=statusForTime(item,date),futureDate=key>todayKey();
  const isNext=timeState==='future'&&!isClosedStatus(status),nowClass=timeState==='now'&&status==='pending'?'now':'',nextClass=isNext?'next':'',closedStatus=['missed','deferred','dropped','cancelled'].includes(status),locked=itemManualMoveLocked(item),anchor=isDayAnchor(item);
  const statusBadge=status==='deferred'?'<span class="badge blue">MOVED</span>':status==='dropped'?'<span class="badge muted-badge">DROPPED</span>':item.adjusted&&!anchor?'<span class="badge adjusted-badge">ADJUSTED</span>':nowClass?'<span class="badge">NOW</span>':'';
  const rec=state.records[key]||{},actualSleep=item.id==='sleep'?rec.actualSleepAt:'',actualWake=item.id==='wake'?rec.actualWakeAt:'',planned=item.actualized&&item.plannedStart?`<span class="badge planned-anchor-badge">PLANNED ${escapeHTML(formatClock(item.plannedStart))}</span>`:'';
  const anchorBadge=anchor?`<span class="badge anchor-badge">${item.id==='wake'?'WAKE':'SLEEP'} ANCHOR</span>`:'',sleepBadge=actualSleep?`<span class="badge sleep-badge">SLEPT ${escapeHTML(actualSleepClock(actualSleep))}</span>`:'',wakeBadge=actualWake?`<span class="badge sleep-badge">AWAKE ${escapeHTML(actualSleepClock(actualWake))}</span>`:'';
  const canMarkMissed=!anchor&&!itemIsNonBlocking(item)&&status==='pending'&&key<=todayKey(),canCancel=!anchor&&!['done','deferred','dropped','cancelled'].includes(status),canRestore=status==='dropped';
  return `<div class="timeline-item ${anchor?'anchor-item':''} ${nowClass} ${nextClass} ${status}" data-timeline-occ="${escapeAttr(occurrenceKey(item))}"><div class="timeline-time">${formatClock(item.start)}${Number(item.dayOffset||0)>0?'<small>+1</small>':''}</div><span class="timeline-dot"></span><div class="timeline-body"><div class="timeline-main"><input class="check" type="checkbox" data-occ="${escapeAttr(occurrenceKey(item))}" data-date="${key}" ${status==='done'?'checked':''} ${(closedStatus||futureDate)?'disabled':''} aria-label="Mark ${escapeAttr(item.title)} done">${taskIconHTML(item,'timeline-task-icon')}<div class="timeline-copy"><b>${escapeHTML(item.title)}</b><small>${escapeHTML(item.detail||'')}</small><div class="timeline-meta">${anchorBadge}${itemIsNonBlocking(item)?'<span class="badge reminder-badge">REMINDER</span>':''}${categoryBadge(item.category)}<span class="badge blue">${escapeHTML(timeWindow(item))}</span>${planned}${locked&&!anchor?'<span class="badge lock-badge">LOCKED</span>':''}${statusBadge}${sleepBadge}${wakeBadge}</div></div></div>${showActions?`<div class="quick-actions">${anchor?`<button data-plan-anchors="${key}" type="button">${svgIcon('clock')} Adjust day</button>${item.id==='sleep'?`<button data-log-sleep="${key}" type="button">${svgIcon('moon')} ${actualSleep?'Edit sleep':'Log sleep'}</button>`:''}`:`<button data-edit-item="${item.source}:${item.id}" type="button">Edit</button>${!locked&&!isClosedStatus(status)&&status!=='done'?`<button data-move-item="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">${svgIcon('arrowUpRight')} Move</button>`:''}${canMarkMissed?`<button data-miss-item="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Mark missed</button>`:''}${canCancel?`<button data-cancel-item="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Cancel for day</button>`:''}${canRestore?`<button data-restore-item="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Restore</button>`:''}${status==='deferred'?`<button data-undo-defer="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Undo move</button>`:''}`}</div>`:''}</div></div>`;
}

function restoreMissedItem(item,key){
  const rec=ensureRecord(key);delete rec.itemStatus[occurrenceKey(item)];removeUnscheduledOccurrence(key,occurrenceKey(item));
  if(!itemIsFixed(item)&&key===todayKey()&&itemEndSortMinutes(item)<currentMinutes()){
    const date=parseDateKey(key),duration=itemDurationForMove(item),blocked=itemsForDate(date).filter(x=>occurrenceKey(x)!==occurrenceKey(item)&&itemManualMoveLocked(x)&&!itemAllowsOverlap(x)&&getStatus(x,key)!=='cancelled'&&itemEndSortMinutes(x)>=currentMinutes()).map(x=>({start:itemSortMinutes(x),end:itemEndSortMinutes(x)}));
    const floor=Math.max(roundUpMinutes(currentMinutes(),5),effectiveWakeEnd(date)),slot=findOpenSlot(floor,duration,blocked,plannedSleepAbsolute(date));
    if(slot!=null){const preferred=minutesToTime(slot);rec.timeOverrides[occurrenceKey(item)]={start:preferred,end:minutesToTime(slot+duration),dayOffset:Math.floor(slot/1440),manual:true,adaptive:false,manualPreferredStart:preferred};}
  }
  save();
}
function bindTimeline(date){
  const key=todayKey(date);
  $$('[data-occ]').forEach(cb=>cb.addEventListener('change',()=>{
    const occ=cb.dataset.occ,item=itemsForDate(date).find(x=>occurrenceKey(x)===occ);if(!item)return;
    if(item.id==='sleep'&&cb.checked){cb.checked=false;openSleepLogModal(key);return;}
    if(item.id==='wake'){
      const rec=ensureRecord(key);
      if(cb.checked){const now=key===todayKey()?new Date():new Date(`${key}T${dayWakeTime(date)}:00`);rec.actualWakeAt=localDateTimeInput(now);rec.actualWakeOffsetMin=now.getTimezoneOffset();markMissedBeforeWake(key,rec.actualWakeAt);setStatus(item,key,'done');}
      else{delete rec.actualWakeAt;delete rec.actualWakeOffsetMin;setStatus(item,key,'pending');}
    }else setStatus(item,key,cb.checked?'done':'pending');
    const y=pageScrollY();render();requestAnimationFrame(()=>{pageScrollTo(0,y);if(cb.checked)maybeCelebrateDayFinish(date);});
  }));
  $$('[data-edit-item]').forEach(btn=>btn.addEventListener('click',()=>{const [source,id]=btn.dataset.editItem.split(':');if(source==='schedule')openScheduleItemModal(id);else openOneOffTaskModal(id);}));
  $$('[data-plan-anchors]').forEach(btn=>btn.addEventListener('click',()=>openDayAnchorPlanner(parseDateKey(btn.dataset.planAnchors))));
  $$('[data-log-sleep]').forEach(btn=>btn.addEventListener('click',()=>openSleepLogModal(btn.dataset.logSleep)));
  $$('[data-move-item]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.moveItem);if(item)openMoveItemModal(item,date);}));
  $$('[data-miss-item]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.missItem);if(item){ensureRecord(key).exceptionPanelOpen=true;setStatus(item,key,'missed');render();toast('Marked missed','Undo',()=>{setStatus(item,key,'pending');render();});}}));
  $$('[data-cancel-item]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.cancelItem);if(item){const old=getStatus(item,key);ensureRecord(key).exceptionPanelOpen=true;setStatus(item,key,'cancelled');render();toast('Cancelled for this day','Undo',()=>{setStatus(item,key,old==='pending'?'pending':old);render();});}}));
  $$('[data-restore-item]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.restoreItem);if(item){restoreMissedItem(item,key);render();toast('Restored');}}));
  $$('[data-undo-defer]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.undoDefer);if(item){restoreDeferredItem(item,key);render();toast('Move undone');}}));
  $$('[data-exception-restore]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.exceptionRestore);if(item){restoreMissedItem(item,key);render();toast(itemIsFixed(item)?'Restored to its original fixed time':'Restored');}}));
  $$('[data-attention-move]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.attentionMove);if(item)openMoveItemModal(item,date);}));
}

function renderToday(preserveScroll=false){
  const scroll=pageScrollY(),date=new Date(),key=todayKey(date),rec=ensureRecord(key);rec.mode=currentMode();
  const allItems=itemsForDate(date),items=itemsForMode(allItems,currentMode()),parked=allItems.filter(i=>!itemIncludedForMode(i,currentMode()));
  const exceptionItems=items.filter(i=>['missed','cancelled'].includes(getStatus(i,key))),unscheduledSet=new Set(rec.unscheduledItems||[]),unscheduledItems=items.filter(i=>unscheduledSet.has(occurrenceKey(i))),timelineItems=items.filter(i=>!['missed','cancelled'].includes(getStatus(i,key))&&!unscheduledSet.has(occurrenceKey(i)));
  const effectiveItems=items.filter(i=>getStatus(i,key)!=='cancelled'&&itemCountsForProgress(i)),done=effectiveItems.filter(i=>getStatus(i,key)==='done').length,total=effectiveItems.length,pct=total?Math.round(done/total*100):0;
  const next=nextUsefulItem(timelineItems.filter(itemCountsForProgress),key),finish=dayFinishState(date),lastSleep=previousUnloggedSleep(),hour=new Date().getHours();
  const open=timelineItems.filter(i=>itemCountsForProgress(i)&&!isClosedStatus(getStatus(i,key))),hero=next?.item||open[0]||null,nextAfter=hero?open.find(i=>occurrenceKey(i)!==occurrenceKey(hero)&&itemSortMinutes(i)>=itemSortMinutes(hero)):null,heroMode=next?.mode||'next';
  const classes=effectiveItems.filter(i=>i.isClass),habits=effectiveItems.filter(i=>!i.isClass&&['Routine','Food','Fitness','Sleep'].includes(i.category)),other=effectiveItems.filter(i=>!classes.includes(i)&&!habits.includes(i)),count=(arr)=>[arr.filter(i=>getStatus(i,key)==='done').length,arr.length],cc=count(classes),hc=count(habits),oc=count(other);
  const pendingFlexible=timelineItems.filter(i=>!itemIsNonBlocking(i)&&!itemManualMoveLocked(i)&&!isClosedStatus(getStatus(i,key))),showWrap=hour>=18&&pendingFlexible.length>0,adjusted=timelineItems.filter(i=>i.adjusted&&!isDayAnchor(i)).length,issues=dayAttentionIssues(date),exceptionsOpen=!!rec.exceptionPanelOpen;
  setHeader('Today',date);
  main.innerHTML=`<section class="now-card ${finish?'complete':''}"><div class="now-topline"><div><span class="now-label">${finish?'Complete':heroMode==='now'||heroMode==='overdue'?'Now':'Next up'}</span><button class="mode-mini mode-pill" id="modeBtn">${escapeHTML(modeName())}</button></div><div class="mini-ring" style="--value:${pct*3.6}deg"><span>${pct}%</span></div></div>${hero?`<h2>${escapeHTML(hero.title)}</h2><p class="now-time">${escapeHTML(timeWindow(hero))}${heroMode==='overdue'?' · overdue':''}</p><p class="muted now-detail">${escapeHTML(hero.detail||'Do the next useful thing.')}</p><div class="now-actions"><button class="success-btn" id="heroDoneBtn">${svgIcon('check')}<span>Done</span></button>${!itemManualMoveLocked(hero)?`<button class="secondary move-action" id="heroMoveBtn">${svgIcon('arrowUpRight')}<span>Move</span></button>`:''}<div class="now-countdown"><b>${countdownText(hero,heroMode)}</b><small>${heroMode==='now'?'left':heroMode==='overdue'?'':'until'}</small></div></div>`:finish?`<div class="completion-center">${svgIcon('check','completion-icon')}<h2>${finish.type==='full'?'Day complete':'Recovery complete'}</h2><p>You finished what mattered today.</p></div>`:`<h2>You’re clear for now.</h2><p class="muted">Use the free time well, or add something useful.</p>`}</section>
  ${nextAfter?`<section class="next-slim-card"><div><span>Next</span><b>${escapeHTML(nextAfter.title)}</b><small>${escapeHTML(timeWindow(nextAfter))}</small></div><span class="next-arrow">${svgIcon('chevronRight')}</span></section>`:''}
  <section class="today-progress-card"><div class="today-progress-head"><h3>Today’s Progress</h3><span>${done}/${total}</span></div><div class="today-progress-body"><div class="progress-ring compact-ring" style="--value:${pct*3.6}deg"><b>${pct}%</b></div><div class="progress-breakdown"><div><span class="progress-dot uni"></span><b>Classes</b><em>${cc[0]} / ${cc[1]}</em></div><div><span class="progress-dot habit"></span><b>Habits</b><em>${hc[0]} / ${hc[1]}</em></div><div><span class="progress-dot other"></span><b>Other</b><em>${oc[0]} / ${oc[1]}</em></div></div></div></section>
  ${lastSleep?`<section class="next-slim-card warning-card"><div><span>Last night</span><b>Sleep was not logged</b><small>Record it even if you slept after midnight.</small></div><button class="secondary small-btn" id="logLastSleepBtn">Log sleep</button></section>`:''}
  ${exceptionItems.length?`<details class="exception-panel" id="exceptionPanel" ${exceptionsOpen?'open':''}><summary><span class="exception-summary-icon">${svgIcon('warning')}</span><span><b>Missed & Cancelled</b><small>${exceptionItems.filter(i=>getStatus(i,key)==='missed').length} missed · ${exceptionItems.filter(i=>getStatus(i,key)==='cancelled').length} cancelled</small></span><span class="exception-chevron">${svgIcon('chevronRight')}</span></summary><div class="exception-list">${exceptionItems.map(i=>exceptionItemHTML(i,date)).join('')}</div></details>`:''}
  ${unscheduledItems.length?`<section class="attention-panel"><div class="attention-head"><span>${svgIcon('warning')}</span><div><b>${unscheduledItems.length} task${unscheduledItems.length===1?' needs':'s need'} attention</b><small>There was not enough room before sleep. Nothing was silently dropped.</small></div></div>${unscheduledItems.map(i=>attentionItemHTML(i,date)).join('')}</section>`:''}
  <div class="section-title"><h2>Today’s timeline</h2><button id="addTodayBtn">+ Add</button></div><section class="timeline-shell"><div class="timeline">${timelineItems.length?timelineItems.map(i=>timelineItemHTML(i,date,true)).join(''):'<div class="empty-state">Nothing scheduled today.</div>'}</div></section>
  ${showWrap?`<section class="next-slim-card"><div><span>End of day</span><b>${pendingFlexible.length} flexible item${pendingFlexible.length===1?'':'s'} still open</b><small>Move, drop or keep them.</small></div><button class="secondary small-btn" id="wrapDayBtn">Review</button></section>`:''}
  ${parked.length&&currentMode()!=='normal'?`<details class="card flat parked-card"><summary>${parked.length} parked by ${escapeHTML(modeName())} mode</summary><div class="parked-list">${parked.map(i=>`<div><b>${escapeHTML(i.title)}</b><span>${escapeHTML(timeWindow(i))}</span></div>`).join('')}</div></details>`:''}
  <section class="adaptive-card"><div><span class="adaptive-icon">${svgIcon('refresh')}</span><div><b>Rebuild the rest of today</b><small>Respect wake, sleep, fixed events and the natural order of your day.</small></div></div><button class="secondary" id="restartBtn">Rebuild</button></section>${adjusted?`<p class="muted tiny center-note">${adjusted} item${adjusted===1?'':'s'} adjusted today.</p>`:''}${issues.length&&!unscheduledItems.length?`<p class="attention-note">${svgIcon('warning')} ${escapeHTML(issues[0])}</p>`:''}`;
  bindTimeline(date);$('#addTodayBtn').onclick=()=>openOneOffTaskModal(null,{date:key,start:suggestTimeForNewTask(date)});$('#restartBtn').onclick=openRestartModal;$('#modeBtn').onclick=openModeModal;
  if($('#exceptionPanel'))$('#exceptionPanel').ontoggle=e=>{rec.exceptionPanelOpen=e.currentTarget.open;save();};
  if($('#logLastSleepBtn')&&lastSleep)$('#logLastSleepBtn').onclick=()=>openSleepLogModal(lastSleep.key);if($('#wrapDayBtn'))$('#wrapDayBtn').onclick=()=>openEndOfDayCleanup(date);
  if($('#heroDoneBtn')&&hero)$('#heroDoneBtn').onclick=()=>{const completed=hero;if(completed.id==='sleep')return openSleepLogModal(key);if(completed.id==='wake'){completeWakeAnchor(key,{preferPrevious:true});renderToday();toast('Wake logged','Undo',()=>{uncompleteWakeAnchor(key);renderToday();});requestAnimationFrame(()=>maybeCelebrateDayFinish(date));return;}setStatus(completed,key,'done');renderToday();toast('Marked done','Undo',()=>{setStatus(completed,key,'pending');renderToday();});requestAnimationFrame(()=>maybeCelebrateDayFinish(date));};
  if($('#heroMoveBtn')&&hero)$('#heroMoveBtn').onclick=()=>openMoveItemModal(hero,date);if(preserveScroll)requestAnimationFrame(()=>pageScrollTo(0,scroll));
}

function planRowHTML(item,date){
  const key=todayKey(date),status=getStatus(item,key),unscheduled=(state.records[key]?.unscheduledItems||[]).includes(occurrenceKey(item)),reminder=itemIsNonBlocking(item),tone=status==='cancelled'?'cancelled':status==='done'?'done':unscheduled?'attention':'planned';
  const detail=item.detail||(reminder?'Non-blocking reminder':itemAllowsOverlap(item)&&itemIsFixed(item)?'Fixed time · overlap allowed':itemIsFixed(item)?'Fixed time':item.source==='oneoff'?'This day only':'From routine');
  const stateLabel=status==='cancelled'?'Cancelled':status==='done'?'Complete':unscheduled?'Needs attention':reminder?'Reminder':'Planned';
  return `<button type="button" class="day-plan-row ${tone} plan-manage-row" data-plan-item="${escapeAttr(occurrenceKey(item))}">${taskIconHTML(item)}<span class="day-plan-time">${escapeHTML(formatClock(item.start))}${Number(item.dayOffset||0)>0?' +1':''}</span><div><b>${escapeHTML(item.title)}</b><small>${escapeHTML(detail)}</small></div><span class="day-plan-state">${stateLabel}</span><span class="plan-row-chevron">${svgIcon('chevronRight')}</span></button>`;
}
function openPlanItemEditor(item,date){
  const key=todayKey(date),status=getStatus(item,key),fixed=itemIsFixed(item),reminder=itemIsNonBlocking(item),oneoff=item.source==='oneoff',active=!['cancelled','dropped','deferred'].includes(status);
  const others=itemsForDate(date).filter(x=>occurrenceKey(x)!==occurrenceKey(item)&&!itemManualMoveLocked(x)&&!isClosedStatus(getStatus(x,key))).sort((a,b)=>itemSortMinutes(a)-itemSortMinutes(b));
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><div class="day-plan-modal-head"><button class="round-icon" id="backToPlan" aria-label="Back">${svgIcon('chevronLeft')}</button><div><p class="eyebrow">PLAN ITEM</p><h2>${escapeHTML(item.title)}</h2><p>${reminder?'Non-blocking reminder':fixed?'Fixed event':'Flexible task'} · ${escapeHTML(timeWindow(item))}</p></div><span></span></div>
    ${!fixed&&active?`<section class="day-settings-card"><h3>Move or swap</h3><div class="stack"><label><span class="label">Move to time</span><input class="input" id="planMoveTime" type="time" value="${escapeAttr(item.start)}"></label>${others.length?`<label><span class="label">Or swap with</span><select id="planSwapTask"><option value="">No swap</option>${others.map(x=>`<option value="${escapeAttr(occurrenceKey(x))}">${escapeHTML(x.title)} · ${escapeHTML(formatClock(x.start))}</option>`).join('')}</select></label>`:''}</div><button class="primary full" id="savePlanMove" style="margin-top:12px">Save move</button></section>`:''}
    <section class="day-plan-section compact-plan-actions"><div class="day-plan-section-head"><span>${svgIcon('more')}</span><div><h3>Actions</h3><p>Changes apply only to ${escapeHTML(formatDateShort(date))}.</p></div></div>
      ${oneoff?`<button class="secondary full" id="editPlanOneOff">${svgIcon('settings')} Edit details</button>`:''}
      ${status==='cancelled'?`<button class="secondary full" id="restorePlanItem">${svgIcon('refresh')} Restore to this day</button>`:active?`<button class="secondary full" id="cancelPlanItem">${svgIcon('close')} Cancel for this day</button>`:''}
      ${oneoff?`<button class="danger-btn full" id="deletePlanOneOff">Delete from this day</button>`:''}
    </section>`;
  if(!modal.open)openAppSheet(modal);
  $('#backToPlan').onclick=()=>openDayAnchorPlanner(date);
  if($('#savePlanMove'))$('#savePlanMove').onclick=()=>{const swapOcc=$('#planSwapTask')?.value||'',before=daySnapshot(key);if(swapOcc){const other=itemsForDate(date).find(x=>occurrenceKey(x)===swapOcc);if(!other)return toast('That task is no longer available');const aStart=item.start,bStart=other.start;if(moveWouldHitLocked(item,date,bStart)||moveWouldHitLocked(other,date,aStart))return toast('That swap would overlap an active locked item');setItemTimeOverride(item,key,bStart);setItemTimeOverride(other,key,aStart);save();openDayAnchorPlanner(date);toast('Tasks swapped','Undo',()=>restoreDaySnapshot(key,before));return;}const time=$('#planMoveTime').value;if(!time)return toast('Choose a time');if(moveWouldHitLocked(item,date,time))return toast('That time overlaps an active locked item');setItemTimeOverride(item,key,time);save();openDayAnchorPlanner(date);toast(reminder?'Reminder moved':'Task moved','Undo',()=>restoreDaySnapshot(key,before));};
  if($('#editPlanOneOff'))$('#editPlanOneOff').onclick=()=>{closeAppSheet(modal);openOneOffTaskModal(item.id,{returnToPlan:key});};
  if($('#cancelPlanItem'))$('#cancelPlanItem').onclick=()=>{const before=daySnapshot(key);setStatus(item,key,'cancelled');save();openDayAnchorPlanner(date);toast('Cancelled for this day','Undo',()=>restoreDaySnapshot(key,before));};
  if($('#restorePlanItem'))$('#restorePlanItem').onclick=()=>{const before=daySnapshot(key);setStatus(item,key,'pending');save();openDayAnchorPlanner(date);toast(fixed?'Restored to its fixed time':'Restored','Undo',()=>restoreDaySnapshot(key,before));};
  if($('#deletePlanOneOff'))$('#deletePlanOneOff').onclick=()=>{const idx=state.oneOffTasks.findIndex(x=>x.id===item.id);if(idx<0)return;const removed=deepClone(state.oneOffTasks[idx]);state.oneOffTasks.splice(idx,1);save();openDayAnchorPlanner(date);toast(reminder?'Reminder deleted':'Item deleted','Undo',()=>{state.oneOffTasks.splice(Math.min(idx,state.oneOffTasks.length),0,removed);save();openDayAnchorPlanner(date);});};
}
function returnToDayPlan(date){const top=planReturnScroll;openDayAnchorPlanner(date);modalContent.scrollTop=top;}

function resetDateToRoutine(date){
  const key=todayKey(date),rec=ensureRecord(key);createSafetySnapshot(`Before resetting ${key} to routine`);
  const actualWake=rec.actualWakeAt,actualSleep=rec.actualSleepAt,actualWakeOffsetMin=rec.actualWakeOffsetMin,actualSleepOffsetMin=rec.actualSleepOffsetMin,doneStatuses=Object.fromEntries(Object.entries(rec.itemStatus||{}).filter(([,v])=>v==='done'));
  state.oneOffTasks=state.oneOffTasks.filter(x=>x.date!==key);
  rec.timeOverrides={};rec.itemStatus=doneStatuses;rec.unscheduledItems=[];rec.schedulerAttention=[];delete rec.futurePlannedAt;delete rec.dayPlanType;rec.actualWakeAt=actualWake;rec.actualSleepAt=actualSleep;if(actualWakeOffsetMin!=null)rec.actualWakeOffsetMin=actualWakeOffsetMin;else delete rec.actualWakeOffsetMin;if(actualSleepOffsetMin!=null)rec.actualSleepOffsetMin=actualSleepOffsetMin;else delete rec.actualSleepOffsetMin;save();
}
function copyOneOffSetup(sourceDate,targetDate){
  const from=todayKey(sourceDate),to=todayKey(targetDate);if(from===to)return 0;
  const source=state.oneOffTasks.filter(x=>x.date===from),existing=state.oneOffTasks.filter(x=>x.date===to),signatures=new Set(existing.map(x=>`${x.title}|${x.start}|${x.category}`));let count=0;
  source.forEach(x=>{const sig=`${x.title}|${x.start}|${x.category}`;if(signatures.has(sig))return;state.oneOffTasks.push({...x,id:uid('one'),date:to,movedFrom:null});signatures.add(sig);count++;});
  if(count){ensureRecord(to).futurePlannedAt=new Date().toISOString();save();}return count;
}
function openDayAnchorPlanner(date){
  const key=todayKey(date);if(key<todayKey())return toast('Past day anchors can be corrected from their history instead');
  const rec=ensureRecord(key),currentWake=dayWakeTime(date),currentSleep=daySleepTime(date),isToday=key===todayKey(),items=itemsForDate(date),routine=items.filter(i=>i.source==='schedule'&&!isDayAnchor(i)),oneoffs=items.filter(i=>i.source==='oneoff'),cancelled=items.filter(i=>getStatus(i,key)==='cancelled').length,planType=rec.dayPlanType||'planned';
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><div class="day-plan-modal-head"><button class="round-icon" id="cancelModal" aria-label="Back">${svgIcon('chevronLeft')}</button><div><h2>${escapeHTML(dayLong(date.getDay()))}, ${escapeHTML(formatDateShort(date))}</h2><p>Plan this day without changing your recurring routine.</p></div><button class="round-icon" id="dayPlanMoreBtn" aria-label="More">${svgIcon('more')}</button></div>
  <section class="day-settings-card"><h3>Day settings</h3><div class="day-anchor-grid"><label><span class="day-setting-icon wake">${svgIcon('sun')}</span><span><small>Wake time</small><input id="futureWakeTime" type="time" value="${escapeAttr(currentWake)}"><em>${hasDayAnchorOverride(date,'wake')?`Override · routine ${formatClock(dailyWakeItem(date)?.start||state.profile.wakeTarget)}`:'From routine'}</em></span></label><label><span class="day-setting-icon sleep">${svgIcon('moon')}</span><span><small>Sleep time</small><input id="futureSleepTime" type="time" value="${escapeAttr(currentSleep)}"><em>${hasDayAnchorOverride(date,'sleep')?`Override · routine ${formatClock(dailySleepItem(date)?.start||state.profile.sleepTarget)}`:'From routine'}</em></span></label></div></section>
  <section class="quick-status-card"><h3>Quick status</h3><p>Set the feel of this day. It does not rewrite your routine.</p><div class="day-type-grid"><button data-day-type="planned" class="${planType==='planned'?'active':''}">${svgIcon('check')} Planned</button><button data-day-type="focus" class="${planType==='focus'?'active':''}">${svgIcon('target')} Focus Day</button><button data-day-type="travel" class="${planType==='travel'?'active':''}">${svgIcon('plane')} Travel</button><button data-day-type="rest" class="${planType==='rest'?'active':''}">${svgIcon('bed')} Rest Day</button></div></section>
  <section class="day-plan-section"><div class="day-plan-section-head"><span>${svgIcon('calendar')}</span><div><h3>Routine & fixed events</h3><p>Recurring items for this date. Fixed events keep their real time.</p></div></div><div class="day-plan-list">${routine.length?routine.map(i=>planRowHTML(i,date)).join(''):'<div class="empty-state compact-empty">No recurring items.</div>'}</div></section>
  <section class="day-plan-section"><div class="day-plan-section-head"><span class="purple">${svgIcon('check')}</span><div><h3>One-off tasks</h3><p>Specific to this day only.</p></div><button class="text-button" id="addPlanOneOff">+ Add</button></div><div class="day-plan-list">${oneoffs.length?oneoffs.map(i=>planRowHTML(i,date)).join(''):'<div class="empty-state compact-empty">No one-off tasks yet.</div>'}</div></section>
  <section class="day-plan-summary"><h3>Day summary</h3><div><span>${svgIcon('calendar')}<b>${routine.filter(itemIsFixed).length}</b><small>Fixed events</small></span><span>${svgIcon('check')}<b>${oneoffs.length}</b><small>One-off tasks</small></span><span>${svgIcon('list')}<b>${items.filter(i=>getStatus(i,key)!=='cancelled').length}</b><small>Planned items</small></span><span class="${cancelled?'red':''}">${svgIcon('close')}<b>${cancelled}</b><small>Cancelled</small></span></div></section>
  <section class="day-plan-advanced hidden" id="dayPlanAdvanced"><div class="day-plan-section-head"><span>${svgIcon('more')}</span><div><h3>More options</h3><p>Useful occasionally, kept out of the way.</p></div></div><label><span class="label">Copy this day’s one-off setup to</span><input class="input" id="copyDayTarget" type="date" min="${todayKey()}" value="${todayKey(addDays(date,1))}"></label><button class="secondary full" id="copyDaySetup" style="margin-top:8px">Copy one-off setup</button><button class="secondary full" id="manageRoutineFromPlan" style="margin-top:8px">Manage recurring routine</button></section>
  <button class="primary full day-plan-rebuild" id="rebuildFutureDay">${svgIcon('refresh')}<span><b>Rebuild with my changes</b><small>Update this day’s plan</small></span></button><button class="secondary full reset-routine-btn" id="resetFutureDay">${svgIcon('refresh')}<span><b>Reset to routine</b><small>Revert this day to its default routine</small></span></button><p class="day-plan-footnote">${svgIcon('lightbulb')} This only changes ${escapeHTML(dayLong(date.getDay()))}, ${escapeHTML(formatDateShort(date))}. Your recurring routine stays the same.</p>`;
  openAppSheet(modal);
  let selectedType=planType;$$('[data-day-type]',modalContent).forEach(b=>b.onclick=()=>{selectedType=b.dataset.dayType;$$('[data-day-type]',modalContent).forEach(x=>x.classList.toggle('active',x===b));});
  $('#dayPlanMoreBtn').onclick=()=>$('#dayPlanAdvanced').classList.toggle('hidden');
  $('#addPlanOneOff').onclick=()=>{closeAppSheet(modal);openOneOffTaskModal(null,{date:key,start:'12:00'});};
  $('#manageRoutineFromPlan').onclick=()=>{closeAppSheet(modal);openScheduleManager();};
  $('#copyDaySetup').onclick=()=>{const target=$('#copyDayTarget').value;if(!target)return toast('Choose a target date');const count=copyOneOffSetup(date,parseDateKey(target));toast(count?`${count} one-off task${count===1?'':'s'} copied`:'Nothing new to copy');};
  $('#rebuildFutureDay').onclick=()=>{const wake=$('#futureWakeTime').value||currentWake,sleep=$('#futureSleepTime').value||currentSleep,before=daySnapshot(key);createSafetySnapshot(`Before rebuilding ${key}`);setDayWakeOverride(date,wake);setDaySleepOverride(date,sleep);rec.dayPlanType=selectedType;const plan=isToday?buildDaySchedulePlan(date,{kind:'today',preserveManual:true,wakeTime:wake,sleepTime:sleep}):buildDaySchedulePlan(date,{kind:'future',preserveManual:true,wakeTime:wake,sleepTime:sleep});if(isToday)applyAdaptiveRestart(plan);else applyFutureDayPlan(plan);rec.dayPlanType=selectedType;save();closeAppSheet(modal);render();toast('Day rebuilt','Undo',()=>restoreDaySnapshot(key,before));};
  $('#resetFutureDay').onclick=()=>{if(!confirm('Reset this date to the recurring routine? One-off tasks and day-specific changes will be removed. Completed history and actual wake/sleep logs are kept.'))return;const before=daySnapshot(key),oneoffsBefore=deepClone(state.oneOffTasks.filter(x=>x.date===key));resetDateToRoutine(date);closeAppSheet(modal);render();toast('Day restored to routine','Undo',()=>{state.records[key]=before;state.oneOffTasks.push(...oneoffsBefore.filter(x=>!state.oneOffTasks.some(y=>y.id===x.id)));save();render();});};
  $('#cancelModal').onclick=()=>closeAppSheet(modal);
}
function openFutureDayPlanner(date){openDayAnchorPlanner(date);}

function weekPreviewRow(item,date){
  const key=todayKey(date),status=getStatus(item,key),unscheduled=(state.records[key]?.unscheduledItems||[]).includes(occurrenceKey(item)),label=status==='done'?'Complete':unscheduled?'Needs attention':'Planned',tone=status==='done'?'complete':unscheduled?'attention':'planned';
  return `<div class="week-preview-row">${taskIconHTML(item)}<span class="week-preview-time">${formatClock(item.start)}${Number(item.dayOffset||0)>0?' +1':''}</span><div><b>${escapeHTML(item.title)}</b><small>${escapeHTML(item.detail||item.category||'')}</small></div><em class="week-status-pill ${tone}">${label}</em></div>`;
}
function weekOtherRow(date){
  const key=todayKey(date),items=itemsForMode(itemsForDate(date),modeForDate(key)),status=dayPlanStatus(date),pending=items.filter(i=>getStatus(i,key)==='pending').length,done=items.filter(i=>getStatus(i,key)==='done').length,later=items.filter(i=>['deferred','dropped'].includes(getStatus(i,key))).length;
  const flags=[];if(hasDayAnchorOverride(date,'wake'))flags.push('wake override');if(hasDayAnchorOverride(date,'sleep'))flags.push('sleep override');
  return `<button class="week-other-row" data-week-other="${key}"><div class="week-other-date"><small>${dayShort(date.getDay()).toUpperCase()}</small><b>${date.getDate()} ${date.toLocaleDateString(currentLocale(),{month:'short'})}</b></div><div class="week-other-counts"><span><i class="green"></i>${done} complete</span><span><i class="blue"></i>${pending} planned</span>${later?`<span><i></i>${later} later</span>`:''}${flags.length?`<small>${escapeHTML(flags.join(' · '))}</small>`:''}</div><em class="week-status-pill ${status.tone}">${escapeHTML(status.label)}</em><span class="tool-chevron">${svgIcon('chevronRight')}</span></button>`;
}
function renderWeek(){
  let selected=parseDateKey(state.settings.selectedWeekDate||todayKey()),weekStart=startOfWeek(selected),days=Array.from({length:7},(_,i)=>addDays(weekStart,i)),weekEnd=days[6],selectedKey=todayKey(selected);
  if(!days.some(d=>todayKey(d)===selectedKey)){selected=weekStart;selectedKey=todayKey(selected);state.settings.selectedWeekDate=selectedKey;}
  setHeader('Week',selected);const rec=ensureRecord(selectedKey),selectedAll=itemsForDate(selected),selectedItems=selectedAll.filter(i=>!['cancelled','missed'].includes(getStatus(i,selectedKey))&&!(rec.unscheduledItems||[]).includes(occurrenceKey(i))),expanded=!!state.settings.weekDayExpanded,shown=expanded?selectedItems:selectedItems.slice(0,4),otherDays=days.filter(d=>todayKey(d)!==selectedKey),otherExpanded=!!state.settings.weekOtherExpanded,otherShown=otherExpanded?otherDays:otherDays.slice(0,3);
  const completeCount=days.filter(d=>todayKey(d)<=todayKey()&&dayCompletion(d)===100).length,attentionCount=days.filter(d=>dayAttentionIssues(d).length).length,plannedCount=days.filter(d=>isTrackedDate(d)&&isDayPlanned(d)).length;
  const selectedStatus=dayPlanStatus(selected);
  main.innerHTML=`<p class="week-subtitle">Plan ahead, not just react.</p><section class="week-header-card week-v34" id="weekSwipeArea"><div class="week-nav clean"><button class="round-icon" id="prevWeekBtn" aria-label="Previous week">${svgIcon('chevronLeft')}</button><div><b>${formatDateShort(weekStart)} – ${formatDateShort(weekEnd)}</b><button class="today-link" id="todayWeekBtn">This Week</button></div><button class="round-icon" id="nextWeekBtn" aria-label="Next week">${svgIcon('chevronRight')}</button></div><div class="week-strip modern">${days.map(d=>{const k=todayKey(d),p=dayCompletion(d),status=dayPlanStatus(d);return `<button class="week-day ${k===selectedKey?'active':''} ${k===todayKey()?'today':''}" data-day-key="${k}"><small>${dayShort(d.getDay())}</small><strong>${d.getDate()}</strong><i style="--p:${p}%"></i>${status.tone==='attention'?'<span class="week-alert-dot"></span>':''}</button>`}).join('')}</div></section>
  <section class="week-summary-v34"><button data-week-summary="complete"><span class="week-summary-icon complete">${svgIcon('check')}</span><b>${completeCount} / 7</b><small>Complete</small><i>${svgIcon('chevronRight')}</i></button><button data-week-summary="attention" class="${attentionCount?'has-attention':''}"><span class="week-summary-icon attention">${svgIcon('warning')}</span><b>${attentionCount}</b><small>Need attention</small><i>${svgIcon('chevronRight')}</i></button><button data-week-summary="planned"><span class="week-summary-icon planned">${svgIcon('calendar')}</span><b>${plannedCount}</b><small>Planned</small><i>${svgIcon('chevronRight')}</i></button></section>
  <section class="week-selected-card"><div class="week-selected-head"><div><small>${dayLong(selected.getDay()).toUpperCase()}</small><h2>${formatDateShort(selected)}</h2></div>${selectedKey>=todayKey()?`<button class="week-plan-button" id="planDayBtn">${svgIcon('calendar')} Plan Day</button>`:`<span class="week-status-pill ${selectedStatus.tone}">${selectedStatus.label}</span>`}</div><div class="week-preview-list">${shown.length?shown.map(i=>weekPreviewRow(i,selected)).join(''):'<div class="empty-state compact-empty">Nothing scheduled for this day.</div>'}</div>${selectedItems.length>4?`<button class="week-view-full" id="weekViewFull">${svgIcon('list')} <span>${expanded?'Show less':`View full day (${selectedItems.length} items)`}</span>${svgIcon('chevronRight')}</button>`:''}${expanded?`<div class="week-expanded-actions"><button class="secondary small-btn" id="addWeekTaskBtn">${svgIcon('plus')} Add task</button></div>`:''}</section>
  <div class="week-other-title"><h2>Other Days This Week</h2>${otherDays.length>3?`<button id="weekSeeAll">${otherExpanded?'Show Less':'See All'}</button>`:''}</div><section class="week-other-list">${otherShown.map(weekOtherRow).join('')}</section>
  <details class="routine-manager week-routine-v34"><summary><span>${svgIcon('refresh')}<span><b>Weekly routine</b><small>${state.schedule.filter(s=>s.active!==false).length} recurring items</small></span></span>${svgIcon('chevronRight')}</summary><div class="routine-actions"><button class="primary" id="addRoutineBtn">+ Recurring item</button><button class="secondary" id="manageRoutineBtn">Manage routine</button></div></details>`;
  const shiftWeek=n=>{state.settings.selectedWeekDate=todayKey(n>0?addDays(startOfWeek(selected),7):addDays(startOfWeek(selected),-1));state.settings.weekDayExpanded=false;save();renderWeek();};
  $('#prevWeekBtn').onclick=()=>shiftWeek(-1);$('#nextWeekBtn').onclick=()=>shiftWeek(1);$('#todayWeekBtn').onclick=()=>{state.settings.selectedWeekDate=todayKey();state.settings.weekDayExpanded=false;save();renderWeek();};
  $$('[data-day-key]').forEach(b=>b.onclick=()=>{state.settings.selectedWeekDate=b.dataset.dayKey;state.settings.weekDayExpanded=false;save();renderWeek();});$$('[data-week-other]').forEach(b=>b.onclick=()=>{state.settings.selectedWeekDate=b.dataset.weekOther;state.settings.weekDayExpanded=false;save();renderWeek();pageScrollTo({top:0,behavior:'smooth'});});
  $$('[data-week-summary]').forEach(b=>b.onclick=()=>{const type=b.dataset.weekSummary;let candidates=type==='complete'?days.filter(d=>todayKey(d)<=todayKey()&&dayCompletion(d)===100):type==='attention'?days.filter(d=>dayAttentionIssues(d).length):days.filter(isDayPlanned);if(!candidates.length)return toast(type==='attention'?'No days need attention':type==='planned'?'No manually planned days this week':'No completed days yet');if(type==='complete')candidates=[...candidates].reverse();state.settings.selectedWeekDate=todayKey(candidates[0]);state.settings.weekDayExpanded=false;save();renderWeek();pageScrollTo({top:0,behavior:'smooth'});});
  if($('#planDayBtn'))$('#planDayBtn').onclick=()=>openDayAnchorPlanner(selected);if($('#weekViewFull'))$('#weekViewFull').onclick=()=>{state.settings.weekDayExpanded=!expanded;save();renderWeek();};if($('#weekSeeAll'))$('#weekSeeAll').onclick=()=>{state.settings.weekOtherExpanded=!otherExpanded;save();renderWeek();};
  if($('#addWeekTaskBtn'))$('#addWeekTaskBtn').onclick=()=>openOneOffTaskModal(null,{date:selectedKey,start:'12:00'});$('#addRoutineBtn').onclick=()=>openScheduleItemModal(null,{days:[selected.getDay()]});$('#manageRoutineBtn').onclick=openScheduleManager;
  let sx=0,sy=0;const swipe=$('#weekSwipeArea');swipe.addEventListener('touchstart',e=>{const t=e.touches[0];sx=t.clientX;sy=t.clientY;},{passive:true});swipe.addEventListener('touchend',e=>{const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.4)shiftWeek(dx<0?1:-1);},{passive:true});
}

function openSleepLogModal(targetKey){
  const item=sleepItemForKey(targetKey);if(!item)return toast('Sleep anchor was not found for that day');
  const rec=ensureRecord(targetKey),targetDate=parseDateKey(targetKey),nextKey=todayKey(addDays(targetDate,1));let defaultValue=rec.actualSleepAt||'';
  if(!defaultValue){const now=new Date();if(targetKey===todayKey(addDays(now,-1)))defaultValue=localDateTimeInput(now);else if(targetKey===todayKey()&&currentMinutes()>=daySleepAbsoluteMinutes(targetDate)%1440)defaultValue=localDateTimeInput(now);else{const planned=new Date(targetDate),off=daySleepOffset(targetDate);planned.setDate(planned.getDate()+off);const [h,m]=daySleepTime(targetDate).split(':').map(Number);planned.setHours(h,m,0,0);defaultValue=localDateTimeInput(planned);}}
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SLEEP</p><h2>Log when you actually went to sleep</h2><p class="muted">This belongs to the night of ${escapeHTML(formatDateShort(targetDate))}, even if you slept after midnight. Your planned sleep time will stay unchanged.</p><label><span class="label">Actual sleep time</span><input class="input" id="actualSleepInput" type="datetime-local" value="${escapeAttr(defaultValue)}"></label><button class="primary full" id="saveSleepLog" style="margin-top:14px">Save sleep time</button>${rec.actualSleepAt?'<button class="danger-btn full" id="clearSleepLog" style="margin-top:8px">Clear sleep log</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);
  $('#saveSleepLog').onclick=()=>{const value=$('#actualSleepInput').value;if(!value||!value.includes('T'))return toast('Choose the actual sleep time');const actualKey=value.slice(0,10);if(actualKey!==targetKey&&actualKey!==nextKey)return toast('Use that evening or the following morning');rec.actualSleepAt=value;rec.actualSleepOffsetMin=localOffsetForInput(value);setStatus(item,targetKey,'done');save();closeAppSheet(modal);render();toast(`Sleep logged at ${actualSleepClock(value)}`);requestAnimationFrame(()=>maybeCelebrateDayFinish(targetDate));};
  if($('#clearSleepLog'))$('#clearSleepLog').onclick=()=>{delete rec.actualSleepAt;delete rec.actualSleepOffsetMin;setStatus(item,targetKey,'pending');save();closeAppSheet(modal);render();toast('Sleep log cleared');};$('#cancelModal').onclick=()=>closeAppSheet(modal);
}
function openSleepNightModal(nightKey){
  const r=sleepNightRecord(nightKey),night=parseDateKey(nightKey),next=addDays(night,1),nextKey=todayKey(next),plannedSleep=daySleepTime(night),plannedWake=dayWakeTime(next);let sleepValue=r.sleepValue,wakeValue=r.wakeValue;
  if(!sleepValue){const d=new Date(night),off=sleepDayOffsetForTime(plannedSleep);d.setDate(d.getDate()+off);const [h,m]=plannedSleep.split(':').map(Number);d.setHours(h,m,0,0);sleepValue=localDateTimeInput(d);}if(!wakeValue){const d=new Date(next);const [h,m]=plannedWake.split(':').map(Number);d.setHours(h,m,0,0);wakeValue=localDateTimeInput(d);}
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SLEEP HISTORY</p><h2>${escapeHTML(formatDateShort(night))} night</h2><p class="muted">Correct the actual times. Planned wake and sleep anchors stay separate.</p><div class="stack"><label><span class="label">Went to sleep</span><input class="input" id="sleepNightBed" type="datetime-local" value="${escapeAttr(sleepValue)}"></label><label><span class="label">Woke up</span><input class="input" id="sleepNightWake" type="datetime-local" value="${escapeAttr(wakeValue)}"></label></div><button class="primary full" id="saveSleepNight" style="margin-top:14px">Save night</button>${r.sleepValue||r.wakeValue?'<button class="danger-btn full" id="deleteSleepNight" style="margin-top:8px">Clear this night</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;openAppSheet(modal);
  $('#saveSleepNight').onclick=()=>{const bed=$('#sleepNightBed').value,wake=$('#sleepNightWake').value;if(!bed||!wake)return toast('Choose both sleep and wake times');const bedOffset=localOffsetForInput(bed),wakeOffset=localOffsetForInput(wake),hours=stableDurationHours(bed,wake,bedOffset,wakeOffset);if(hours==null||hours<=0)return toast('Wake time must be after sleep time');if(hours>20)return toast('That sleep duration looks too long');const sleepRec=ensureRecord(nightKey),wakeRec=ensureRecord(nextKey);sleepRec.actualSleepAt=bed;sleepRec.actualSleepOffsetMin=bedOffset;wakeRec.actualWakeAt=wake;wakeRec.actualWakeOffsetMin=wakeOffset;const sleepItem=sleepItemForKey(nightKey),wakeItem=itemsForDate(next).find(i=>i.id==='wake');if(sleepItem)setStatus(sleepItem,nightKey,'done');if(wakeItem)setStatus(wakeItem,nextKey,'done');save();closeAppSheet(modal);renderSleep();toast('Sleep night saved');};
  if($('#deleteSleepNight'))$('#deleteSleepNight').onclick=()=>{const sleepRec=ensureRecord(nightKey),wakeRec=ensureRecord(nextKey);delete sleepRec.actualSleepAt;delete sleepRec.actualSleepOffsetMin;delete wakeRec.actualWakeAt;delete wakeRec.actualWakeOffsetMin;const sleepItem=sleepItemForKey(nightKey),wakeItem=itemsForDate(next).find(i=>i.id==='wake');if(sleepItem)setStatus(sleepItem,nightKey,'pending');if(wakeItem)setStatus(wakeItem,nextKey,'pending');save();closeAppSheet(modal);renderSleep();toast('Sleep night cleared');};$('#cancelModal').onclick=()=>closeAppSheet(modal);
}




function compareVersionStrings(a,b){const aa=String(a).trim().split('.').map(Number),bb=String(b).trim().split('.').map(Number);for(let i=0;i<Math.max(aa.length,bb.length);i++){const x=aa[i]||0,y=bb[i]||0;if(x!==y)return x-y;}return 0;}
async function checkForAppUpdate(fromSettings=false){
  try{const response=await fetch(`./VERSION.txt?check=${Date.now()}`,{cache:'no-store'});if(!response.ok)return;const latest=(await response.text()).trim(),btn=$('#updateReadyBtn'),label=$('#updateReadyLabel');if(compareVersionStrings(latest,APP_DISPLAY_VERSION)>0){window.__resetUpdateVersion=latest;if(btn)btn.classList.remove('hidden');if(label)label.textContent=`v${latest}`;if(!fromSettings&&!window.__resetUpdateToast){window.__resetUpdateToast=true;toast(`Reset v${latest} is ready`,'Update',applyAppUpdate);}}else{if(btn)btn.classList.add('hidden');window.__resetUpdateVersion='';}}catch(e){}
}
async function applyAppUpdate(){
  flushStateSave();window.__resetApplyingUpdate=true;
  try{const reg=await navigator.serviceWorker?.getRegistration();if(reg){await reg.update();if(reg.waiting)reg.waiting.postMessage({type:'SKIP_WAITING'});}}catch(e){}
  setTimeout(()=>{const u=new URL(location.href);u.searchParams.set('update',Date.now());location.replace(u.toString());},350);
}

/* ===== Reset v3.5 reliability + polish layer ===== */
const SAFETY_LIST_KEY = `${APP_KEY}-safety-list-v2`;
let __resetSaveTimer = null;
let __resetLastSerialized = '';
let routineManagerReturnDay = null;
let routineManagerReturnScroll = 0;
let planReturnScroll = 0;

function flushStateSave(){
  sealPastDays();refreshHistoricalSummaries();
  if(!state.meta) state.meta={};
  state.meta.lastSavedAt=new Date().toISOString();
  let serialized='';
  try{
    serialized=JSON.stringify(state);
    if(serialized!==__resetLastSerialized){localStorage.setItem(APP_KEY,serialized);__resetLastSerialized=serialized;}
  }catch(e){if(!window.__resetStorageWarning){window.__resetStorageWarning=true;toast('Device storage could not save this change. Export a backup now.');}const label=$('#backupConfidenceStatus');if(label)label.textContent='Save failed';}
  if(appInitialized){clearTimeout(durableTimer);durableTimer=setTimeout(()=>durableWrite(),260);}
}
function save(){
  sealPastDays();refreshHistoricalSummaries();
  if(!state.meta) state.meta={};
  state.meta.lastSavedAt=new Date().toISOString();
  clearTimeout(__resetSaveTimer);
  __resetSaveTimer=setTimeout(()=>{__resetSaveTimer=null;flushStateSave();},70);
}
window.addEventListener('pagehide',()=>{if(__resetSaveTimer){clearTimeout(__resetSaveTimer);__resetSaveTimer=null;}flushStateSave();});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){if(__resetSaveTimer){clearTimeout(__resetSaveTimer);__resetSaveTimer=null;}flushStateSave();}});

function readSafetySnapshots(){
  try{const x=JSON.parse(localStorage.getItem(SAFETY_LIST_KEY)||'[]');return Array.isArray(x)?x:[];}catch(e){return [];}
}
function createSafetySnapshot(reason='Safety snapshot'){
  try{
    const snap={createdAt:new Date().toISOString(),reason,state:deepClone(state)};
    const list=readSafetySnapshots();list.unshift(snap);localStorage.setItem(SAFETY_LIST_KEY,JSON.stringify(list.slice(0,3)));
    localStorage.setItem(SAFETY_KEY,JSON.stringify(snap));
    updateRecoverySnapshotRow();
    return true;
  }catch(e){return false;}
}
function clearSafetySnapshot(){try{localStorage.removeItem(SAFETY_KEY);localStorage.removeItem(SAFETY_LIST_KEY);}catch(e){}updateRecoverySnapshotRow();}
function latestSafetySnapshot(){return readSafetySnapshots()[0]||null;}
function updateRecoverySnapshotRow(){
  const btn=$('#recoverySnapshotBtn'),label=$('#recoverySnapshotStatus');if(!btn||!label)return;
  const snap=latestSafetySnapshot();btn.classList.toggle('hidden',!snap);
  if(!snap)return;
  const d=new Date(snap.createdAt);label.textContent=Number.isNaN(d.getTime())?'Restore':d.toLocaleDateString(undefined,{month:'short',day:'numeric'});
}
function openRecoverySnapshotModal(){
  const snap=latestSafetySnapshot();if(!snap)return toast('No recovery snapshot is available');
  closeAppSheet(settingsDialog);
  const d=new Date(snap.createdAt),when=Number.isNaN(d.getTime())?'an earlier point':d.toLocaleString(undefined,{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'});
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">RECOVERY</p><h2>Restore safety snapshot?</h2><p class="muted">${escapeHTML(snap.reason||'Safety snapshot')} · ${escapeHTML(when)}</p><p class="muted tiny">Your current state will be saved as a new safety snapshot first, so this action is reversible.</p><button class="primary full" id="restoreSafetyNow">Restore snapshot</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);
  $('#restoreSafetyNow').onclick=()=>{const old=deepClone(snap.state);createSafetySnapshot('Before restoring recovery snapshot');state=migrateState(old);flushStateSave();closeAppSheet(modal);render();toast('Recovery snapshot restored');};
  $('#cancelModal').onclick=()=>closeAppSheet(modal);
}

function ensureRecord(key=todayKey()){
  if(!state.records[key])state.records[key]={itemStatus:{},timeOverrides:{},resetCount:0,restartAt:null,mode:key===todayKey()?currentMode():'normal',finishCelebrated:'',unscheduledItems:[],schedulerAttention:[],dayNote:'',lastActualWakeAt:'',lastActualSleepAt:'',explicitAnchors:{},autoMissedByWake:[]};
  const r=state.records[key];
  if(!r.itemStatus)r.itemStatus={};if(!r.timeOverrides)r.timeOverrides={};if(!Array.isArray(r.unscheduledItems))r.unscheduledItems=[];if(!Array.isArray(r.schedulerAttention))r.schedulerAttention=[];if(!Array.isArray(r.autoMissedByWake))r.autoMissedByWake=[];
  if(!r.mode)r.mode=key===todayKey()?currentMode():'normal';if(!('finishCelebrated' in r))r.finishCelebrated='';if(!('dayNote' in r))r.dayNote='';if(!('lastActualWakeAt' in r))r.lastActualWakeAt=r.actualWakeAt||'';if(!('lastActualSleepAt' in r))r.lastActualSleepAt=r.actualSleepAt||'';if(!r.explicitAnchors||typeof r.explicitAnchors!=='object')r.explicitAnchors={};
  return r;
}
function setStatus(item,key,status){
  const rec=ensureRecord(key),occ=occurrenceKey(item);
  if(status==='pending'){delete rec.itemStatus[occ];rec.finishCelebrated='';}
  else rec.itemStatus[occ]=status;
  if(status==='done'&&item.category==='Fitness'&&/gym/i.test(item.title||''))state.gym.sessionExcluded=(state.gym.sessionExcluded||[]).filter(k=>k!==key);
  save();
}

function setDayWakeOverride(date,time){
  const key=todayKey(date),wake=dailyWakeItem(date);if(!wake)return false;
  const rec=ensureRecord(key),occ=occurrenceKey(wake),normalized=minutesToTime(minutesFromTime(time)),routine=minutesToTime(minutesFromTime(wake.start));
  if(normalized===routine){delete rec.timeOverrides[occ];delete rec.explicitAnchors.wake;return false;}
  const dur=durationMinutes(wake),start=minutesFromTime(normalized);rec.timeOverrides[occ]={start:normalized,end:minutesToTime(start+dur),dayOffset:0,manual:true,adaptive:false,dayAnchor:true,explicit:true};rec.explicitAnchors.wake=true;return true;
}
function setDaySleepOverride(date,time){
  const key=todayKey(date),sleep=dailySleepItem(date);if(!sleep)return false;
  const rec=ensureRecord(key),occ=occurrenceKey(sleep),normalized=minutesToTime(minutesFromTime(time)),routine=minutesToTime(minutesFromTime(sleep.start));
  if(normalized===routine){delete rec.timeOverrides[occ];delete rec.explicitAnchors.sleep;return false;}
  const dur=durationMinutes(sleep),off=sleepDayOffsetForTime(normalized),start=minutesFromTime(normalized);rec.timeOverrides[occ]={start:normalized,end:minutesToTime(start+dur),dayOffset:off,manual:true,adaptive:false,dayAnchor:true,explicit:true};rec.explicitAnchors.sleep=true;return true;
}

function clearAutoMissedFromWake(key){
  const rec=ensureRecord(key);for(const occ of rec.autoMissedByWake||[]){if(rec.itemStatus[occ]==='missed')delete rec.itemStatus[occ];}rec.autoMissedByWake=[];
}
function markMissedBeforeWake(key,wakeValue){
  const rec=ensureRecord(key),date=parseDateKey(key),d=new Date(wakeValue);if(Number.isNaN(d.getTime()))return;
  clearAutoMissedFromWake(key);const wakeMin=d.getHours()*60+d.getMinutes();
  itemsForDate(date).forEach(item=>{if(isDayAnchor(item)||getStatus(item,key)!=='pending')return;if(itemEndSortMinutes(item)<=wakeMin){const occ=occurrenceKey(item);rec.itemStatus[occ]='missed';rec.autoMissedByWake.push(occ);}});
}
function validActualWakeForKey(value,key){return !!value&&String(value).slice(0,10)===key;}
function setActualWake(key,value){
  const rec=ensureRecord(key),d=new Date(value);if(Number.isNaN(d.getTime()))return false;
  rec.actualWakeAt=value;rec.actualWakeOffsetMin=d.getTimezoneOffset();rec.lastActualWakeAt=value;rec.lastActualWakeOffsetMin=rec.actualWakeOffsetMin;markMissedBeforeWake(key,value);return true;
}
function completeWakeAnchor(key,{preferPrevious=true}={}){
  const rec=ensureRecord(key),date=parseDateKey(key),item=itemsForDate(date).find(i=>i.id==='wake');if(!item)return false;
  let value='';if(preferPrevious&&validActualWakeForKey(rec.lastActualWakeAt,key))value=rec.lastActualWakeAt;
  if(!value){const d=key===todayKey()?new Date():new Date(`${key}T${dayWakeTime(date)}:00`);value=localDateTimeInput(d);}
  setActualWake(key,value);setStatus(item,key,'done');return true;
}
function uncompleteWakeAnchor(key){
  const rec=ensureRecord(key),date=parseDateKey(key),item=itemsForDate(date).find(i=>i.id==='wake');if(!item)return;
  if(rec.actualWakeAt){rec.lastActualWakeAt=rec.actualWakeAt;rec.lastActualWakeOffsetMin=rec.actualWakeOffsetMin;}
  delete rec.actualWakeAt;delete rec.actualWakeOffsetMin;clearAutoMissedFromWake(key);setStatus(item,key,'pending');
}
function openWakeLogModal(targetKey){
  const date=parseDateKey(targetKey),item=itemsForDate(date).find(i=>i.id==='wake');if(!item)return toast('Wake anchor was not found for that day');
  const rec=ensureRecord(targetKey);let value=rec.actualWakeAt||(validActualWakeForKey(rec.lastActualWakeAt,targetKey)?rec.lastActualWakeAt:'');
  if(!value){const d=targetKey===todayKey()?new Date():new Date(`${targetKey}T${dayWakeTime(date)}:00`);value=localDateTimeInput(d);}
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">WAKE</p><h2>${rec.actualWakeAt?'Edit':'Log'} actual wake time</h2><p class="muted">Planned wake stays ${escapeHTML(formatClock(dayWakeTime(date)))}. This only records what actually happened.</p><label><span class="label">Actual wake time</span><input class="input" id="actualWakeInput" type="datetime-local" value="${escapeAttr(value)}"></label><button class="primary full" id="saveWakeLog" style="margin-top:14px">Save actual wake</button>${rec.actualWakeAt?'<button class="danger-btn full" id="clearWakeLog" style="margin-top:8px">Clear actual wake</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);
  $('#saveWakeLog').onclick=()=>{const v=$('#actualWakeInput').value;if(!v||String(v).slice(0,10)!==targetKey)return toast('Use a time on this date');clearAutoMissedFromWake(targetKey);setActualWake(targetKey,v);setStatus(item,targetKey,'done');save();closeAppSheet(modal);render();toast(`Wake logged at ${actualSleepClock(v)}`);};
  if($('#clearWakeLog'))$('#clearWakeLog').onclick=()=>{clearAutoMissedFromWake(targetKey);delete rec.actualWakeAt;delete rec.actualWakeOffsetMin;delete rec.lastActualWakeAt;delete rec.lastActualWakeOffsetMin;setStatus(item,targetKey,'pending');save();closeAppSheet(modal);render();toast('Actual wake cleared');};
  $('#cancelModal').onclick=()=>closeAppSheet(modal);
}

function openSleepLogModal(targetKey){
  const item=sleepItemForKey(targetKey);if(!item)return toast('Sleep anchor was not found for that day');
  const rec=ensureRecord(targetKey),targetDate=parseDateKey(targetKey),nextKey=todayKey(addDays(targetDate,1));let defaultValue=rec.actualSleepAt||rec.lastActualSleepAt||'';
  if(!defaultValue){const now=new Date();if(targetKey===todayKey(addDays(now,-1)))defaultValue=localDateTimeInput(now);else if(targetKey===todayKey()&&currentMinutes()>=daySleepAbsoluteMinutes(targetDate)%1440)defaultValue=localDateTimeInput(now);else{const planned=new Date(targetDate),off=daySleepOffset(targetDate);planned.setDate(planned.getDate()+off);const [h,m]=daySleepTime(targetDate).split(':').map(Number);planned.setHours(h,m,0,0);defaultValue=localDateTimeInput(planned);}}
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SLEEP</p><h2>Log when you actually went to sleep</h2><p class="muted">This belongs to the night of ${escapeHTML(formatDateShort(targetDate))}, even after midnight. Planned sleep stays ${escapeHTML(formatClock(daySleepTime(targetDate)))}.</p><label><span class="label">Actual sleep time</span><input class="input" id="actualSleepInput" type="datetime-local" value="${escapeAttr(defaultValue)}"></label><button class="primary full" id="saveSleepLog" style="margin-top:14px">Save sleep time</button>${rec.actualSleepAt?'<button class="danger-btn full" id="clearSleepLog" style="margin-top:8px">Clear sleep log</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);
  $('#saveSleepLog').onclick=()=>{const value=$('#actualSleepInput').value;if(!value||!value.includes('T'))return toast('Choose the actual sleep time');const actualKey=value.slice(0,10);if(actualKey!==targetKey&&actualKey!==nextKey)return toast('Use that evening or the following morning');rec.actualSleepAt=value;rec.actualSleepOffsetMin=localOffsetForInput(value);rec.lastActualSleepAt=value;rec.lastActualSleepOffsetMin=rec.actualSleepOffsetMin;setStatus(item,targetKey,'done');save();closeAppSheet(modal);render();toast(`Sleep logged at ${actualSleepClock(value)}`);requestAnimationFrame(()=>maybeCelebrateDayFinish(targetDate));};
  if($('#clearSleepLog'))$('#clearSleepLog').onclick=()=>{delete rec.actualSleepAt;delete rec.actualSleepOffsetMin;delete rec.lastActualSleepAt;delete rec.lastActualSleepOffsetMin;setStatus(item,targetKey,'pending');save();closeAppSheet(modal);render();toast('Sleep log cleared');};
  $('#cancelModal').onclick=()=>closeAppSheet(modal);
}
function openSleepNightModal(nightKey){
  const r=sleepNightRecord(nightKey),night=parseDateKey(nightKey),next=addDays(night,1),nextKey=todayKey(next),plannedSleep=daySleepTime(night),plannedWake=dayWakeTime(next);let sleepValue=r.sleepValue,wakeValue=r.wakeValue;
  if(!sleepValue){const d=new Date(night),off=sleepDayOffsetForTime(plannedSleep);d.setDate(d.getDate()+off);const [h,m]=plannedSleep.split(':').map(Number);d.setHours(h,m,0,0);sleepValue=localDateTimeInput(d);}if(!wakeValue){const d=new Date(next);const [h,m]=plannedWake.split(':').map(Number);d.setHours(h,m,0,0);wakeValue=localDateTimeInput(d);}
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SLEEP HISTORY</p><h2>${escapeHTML(formatDateShort(night))} night</h2><p class="muted">Correct actual times only. Planned Wake and Sleep anchors stay unchanged.</p><div class="stack"><label><span class="label">Went to sleep</span><input class="input" id="sleepNightBed" type="datetime-local" value="${escapeAttr(sleepValue)}"></label><label><span class="label">Woke up</span><input class="input" id="sleepNightWake" type="datetime-local" value="${escapeAttr(wakeValue)}"></label></div><button class="primary full" id="saveSleepNight" style="margin-top:14px">Save night</button>${r.sleepValue||r.wakeValue?'<button class="danger-btn full" id="deleteSleepNight" style="margin-top:8px">Clear this night</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;openAppSheet(modal);
  $('#saveSleepNight').onclick=()=>{const bed=$('#sleepNightBed').value,wake=$('#sleepNightWake').value;if(!bed||!wake)return toast('Choose both sleep and wake times');const bedOffset=localOffsetForInput(bed),wakeOffset=localOffsetForInput(wake),hours=stableDurationHours(bed,wake,bedOffset,wakeOffset);if(hours==null||hours<=0)return toast('Wake time must be after sleep time');if(hours>20)return toast('That sleep duration looks too long');const sleepRec=ensureRecord(nightKey),wakeRec=ensureRecord(nextKey);sleepRec.actualSleepAt=bed;sleepRec.actualSleepOffsetMin=bedOffset;sleepRec.lastActualSleepAt=bed;sleepRec.lastActualSleepOffsetMin=bedOffset;clearAutoMissedFromWake(nextKey);wakeRec.actualWakeAt=wake;wakeRec.actualWakeOffsetMin=wakeOffset;wakeRec.lastActualWakeAt=wake;wakeRec.lastActualWakeOffsetMin=wakeOffset;markMissedBeforeWake(nextKey,wake);const sleepItem=sleepItemForKey(nightKey),wakeItem=itemsForDate(next).find(i=>i.id==='wake');if(sleepItem)setStatus(sleepItem,nightKey,'done');if(wakeItem)setStatus(wakeItem,nextKey,'done');save();closeAppSheet(modal);renderSleep();toast('Sleep night saved');};
  if($('#deleteSleepNight'))$('#deleteSleepNight').onclick=()=>{const sleepRec=ensureRecord(nightKey),wakeRec=ensureRecord(nextKey);delete sleepRec.actualSleepAt;delete sleepRec.actualSleepOffsetMin;delete sleepRec.lastActualSleepAt;delete sleepRec.lastActualSleepOffsetMin;clearAutoMissedFromWake(nextKey);delete wakeRec.actualWakeAt;delete wakeRec.actualWakeOffsetMin;delete wakeRec.lastActualWakeAt;delete wakeRec.lastActualWakeOffsetMin;const sleepItem=sleepItemForKey(nightKey),wakeItem=itemsForDate(next).find(i=>i.id==='wake');if(sleepItem)setStatus(sleepItem,nightKey,'pending');if(wakeItem)setStatus(wakeItem,nextKey,'pending');save();closeAppSheet(modal);renderSleep();toast('Sleep night cleared');};$('#cancelModal').onclick=()=>closeAppSheet(modal);
}

function timelineItemHTML(item,date,showActions=false){
  const key=todayKey(date),status=getStatus(item,key),timeState=statusForTime(item,date),futureDate=key>todayKey();
  const isNext=timeState==='future'&&!isClosedStatus(status),nowClass=timeState==='now'&&status==='pending'?'now':'',nextClass=isNext?'next':'',closedStatus=['missed','deferred','dropped','cancelled'].includes(status),locked=itemManualMoveLocked(item),anchor=isDayAnchor(item);
  const statusBadge=status==='deferred'?'<span class="badge blue">MOVED</span>':status==='dropped'?'<span class="badge muted-badge">DROPPED</span>':item.adjusted&&!anchor?'<span class="badge adjusted-badge">ADJUSTED</span>':nowClass?'<span class="badge">NOW</span>':'';
  const rec=state.records[key]||{},actualSleep=item.id==='sleep'?rec.actualSleepAt:'',actualWake=item.id==='wake'?rec.actualWakeAt:'',planned=item.actualized&&item.plannedStart?`<span class="badge planned-anchor-badge">PLANNED ${escapeHTML(formatClock(item.plannedStart))}</span>`:'';
  const anchorBadge=anchor?`<span class="badge anchor-badge">${item.id==='wake'?'WAKE':'SLEEP'} ANCHOR</span>`:'',sleepBadge=actualSleep?`<span class="badge sleep-badge">ACTUAL ${escapeHTML(actualSleepClock(actualSleep))}</span>`:'',wakeBadge=actualWake?`<span class="badge sleep-badge">ACTUAL ${escapeHTML(actualSleepClock(actualWake))}</span>`:'';
  const canMarkMissed=!anchor&&!itemIsNonBlocking(item)&&status==='pending'&&key<=todayKey(),canCancel=!anchor&&!['done','deferred','dropped','cancelled'].includes(status),canRestore=status==='dropped';
  const anchorActions=anchor?`<button data-plan-anchors="${key}" type="button">${svgIcon('clock')} Adjust day</button>${item.id==='wake'?`<button data-log-wake="${key}" type="button">${svgIcon('sun')} ${actualWake?'Edit wake':'Log wake'}</button>`:`<button data-log-sleep="${key}" type="button">${svgIcon('moon')} ${actualSleep?'Edit sleep':'Log sleep'}</button>`}`:'';
  return `<div class="timeline-item ${anchor?'anchor-item':''} ${nowClass} ${nextClass} ${status}" data-timeline-occ="${escapeAttr(occurrenceKey(item))}"><div class="timeline-time">${formatClock(item.start)}${Number(item.dayOffset||0)>0?'<small>+1</small>':''}</div><span class="timeline-dot"></span><div class="timeline-body"><div class="timeline-main"><input class="check" type="checkbox" data-occ="${escapeAttr(occurrenceKey(item))}" data-date="${key}" ${status==='done'?'checked':''} ${(closedStatus||futureDate)?'disabled':''} aria-label="Mark ${escapeAttr(item.title)} done">${taskIconHTML(item,'timeline-task-icon')}<div class="timeline-copy"><b>${escapeHTML(item.title)}</b><small>${escapeHTML(item.detail||'')}</small><div class="timeline-meta">${anchorBadge}${itemIsNonBlocking(item)?'<span class="badge reminder-badge">REMINDER</span>':''}${categoryBadge(item.category)}<span class="badge blue">${escapeHTML(timeWindow(item))}</span>${planned}${locked&&!anchor?'<span class="badge lock-badge">LOCKED</span>':''}${statusBadge}${sleepBadge}${wakeBadge}</div></div></div>${showActions?`<div class="quick-actions">${anchor?anchorActions:`<button data-edit-item="${item.source}:${item.id}" type="button">Edit</button>${!locked&&!isClosedStatus(status)&&status!=='done'?`<button data-move-item="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">${svgIcon('arrowUpRight')} Move</button>`:''}${canMarkMissed?`<button data-miss-item="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Mark missed</button>`:''}${canCancel?`<button data-cancel-item="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Cancel for day</button>`:''}${canRestore?`<button data-restore-item="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Restore</button>`:''}${status==='deferred'?`<button data-undo-defer="${escapeAttr(occurrenceKey(item))}" data-date="${key}" type="button">Undo move</button>`:''}`}</div>`:''}</div></div>`;
}
function bindTimeline(date){
  const key=todayKey(date);
  $$('[data-occ]').forEach(cb=>cb.addEventListener('change',()=>{const occ=cb.dataset.occ,item=itemsForDate(date).find(x=>occurrenceKey(x)===occ);if(!item)return;if(item.id==='sleep'&&cb.checked){cb.checked=false;openSleepLogModal(key);return;}if(item.id==='wake'){if(cb.checked)completeWakeAnchor(key,{preferPrevious:true});else uncompleteWakeAnchor(key);}else setStatus(item,key,cb.checked?'done':'pending');const y=pageScrollY();render();requestAnimationFrame(()=>{pageScrollTo(0,y);if(cb.checked)maybeCelebrateDayFinish(date);});}));
  $$('[data-edit-item]').forEach(btn=>btn.addEventListener('click',()=>{const [source,id]=btn.dataset.editItem.split(':');if(source==='schedule')openScheduleItemModal(id);else openOneOffTaskModal(id);}));
  $$('[data-plan-anchors]').forEach(btn=>btn.addEventListener('click',()=>openDayAnchorPlanner(parseDateKey(btn.dataset.planAnchors))));
  $$('[data-log-wake]').forEach(btn=>btn.addEventListener('click',()=>openWakeLogModal(btn.dataset.logWake)));
  $$('[data-log-sleep]').forEach(btn=>btn.addEventListener('click',()=>openSleepLogModal(btn.dataset.logSleep)));
  $$('[data-move-item]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.moveItem);if(item)openMoveItemModal(item,date);}));
  $$('[data-miss-item]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.missItem);if(item){const before=daySnapshot(key);ensureRecord(key).exceptionPanelOpen=true;setStatus(item,key,'missed');render();toast('Marked missed','Undo',()=>restoreDaySnapshot(key,before));}}));
  $$('[data-cancel-item]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.cancelItem);if(item){const before=daySnapshot(key);ensureRecord(key).exceptionPanelOpen=true;setStatus(item,key,'cancelled');render();toast('Cancelled for this day','Undo',()=>restoreDaySnapshot(key,before));}}));
  $$('[data-restore-item]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.restoreItem);if(item){const before=daySnapshot(key);restoreMissedItem(item,key);render();toast('Restored','Undo',()=>restoreDaySnapshot(key,before));}}));
  $$('[data-undo-defer]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.undoDefer);if(item){const before=daySnapshot(key);restoreDeferredItem(item,key);render();toast('Move undone','Undo',()=>restoreDaySnapshot(key,before));}}));
  $$('[data-exception-restore]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.exceptionRestore);if(item){const before=daySnapshot(key);restoreMissedItem(item,key);render();toast(itemIsFixed(item)?'Restored to its original fixed time':'Restored','Undo',()=>restoreDaySnapshot(key,before));}}));
  $$('[data-attention-move]').forEach(btn=>btn.addEventListener('click',()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===btn.dataset.attentionMove);if(item)openMoveItemModal(item,date);}));
  const panel=$('#exceptionPanel');if(panel)panel.addEventListener('toggle',()=>{ensureRecord(key).exceptionPanelOpen=panel.open;save();});
}

function dayAttentionDetailsLive(date){
  const key=todayKey(date),rec=ensureRecord(key),details=[],all=itemsForMode(itemsForDate(date),modeForDate(key)),unscheduled=new Set((rec.unscheduledItems||[]).filter(occ=>all.some(x=>occurrenceKey(x)===occ&&!isClosedStatus(getStatus(x,key)))));
  if(unscheduled.size)details.push({code:'unscheduled',text:`${unscheduled.size} task${unscheduled.size===1?'':'s'} could not fit before sleep`,count:unscheduled.size});
  const active=all.filter(i=>!itemIsNonBlocking(i)&&!['cancelled','dropped','deferred','missed'].includes(getStatus(i,key))&&!unscheduled.has(occurrenceKey(i))),wakeEnd=effectiveWakeEnd(date),sleepLimit=plannedSleepAbsolute(date);
  const beforeWake=active.filter(i=>!isDayAnchor(i)&&getStatus(i,key)!=='done'&&itemSortMinutes(i)<wakeEnd);
  if(beforeWake.length){const fixed=beforeWake.find(itemIsFixed);details.push({code:'before-wake',text:fixed?`${fixed.title} overlaps your wake boundary`:`${beforeWake.length} task${beforeWake.length===1?' starts':'s start'} before your wake boundary`,count:beforeWake.length});}
  const afterSleep=active.filter(i=>!isDayAnchor(i)&&getStatus(i,key)!=='done'&&itemEndSortMinutes(i)>sleepLimit);
  if(afterSleep.length)details.push({code:'after-sleep',text:`${afterSleep.length} task${afterSleep.length===1?' runs':'s run'} past sleep`,count:afterSleep.length});
  const meals=active.filter(i=>mealRank(i)>0&&getStatus(i,key)!=='done').sort((a,b)=>mealRank(a)-mealRank(b));
  for(let i=1;i<meals.length;i++){
    if(itemSortMinutes(meals[i])<=itemSortMinutes(meals[i-1])){details.push({code:'meal-order',text:'Meal order is not Breakfast → Lunch → Dinner',count:1});break;}
    if(itemSortMinutes(meals[i])-itemEndSortMinutes(meals[i-1])<90){details.push({code:'meal-spacing',text:`${meals[i-1].title} and ${meals[i].title} are scheduled too close together`,count:1});break;}
  }
  const timed=active.filter(i=>!isDayAnchor(i)).sort((a,b)=>itemSortMinutes(a)-itemSortMinutes(b));
  for(let i=0;i<timed.length;i++){
    for(let j=i+1;j<timed.length;j++){
      const a=timed[i],b=timed[j];
      if(itemSortMinutes(b)>=itemEndSortMinutes(a))break;
      if(getStatus(a,key)==='done'||getStatus(b,key)==='done'||itemAllowsOverlap(a)||itemAllowsOverlap(b))continue;
      if(itemIsFixed(a)||itemIsFixed(b)){details.push({code:'overlap',text:`${a.title} overlaps ${b.title}`,count:1,items:[occurrenceKey(a),occurrenceKey(b)]});return details;}
    }
  }
  return details;
}
function dayAttentionIssues(date){return dayAttentionDetails(date).map(x=>x.text).slice(0,5);}
function isDayPlanned(date){const key=todayKey(date),rec=state.records[key]||{};return !!(rec.futurePlannedAt||(rec.dayPlanType&&rec.dayPlanType!=='planned')||String(rec.dayNote||'').trim()||Object.values(rec.timeOverrides||{}).some(x=>x?.manual)||state.oneOffTasks.some(x=>x.date===key));}
function dayPlanStatusLegacy(date){const key=todayKey(date),issues=dayAttentionIssues(date),completion=dayCompletion(date),rec=state.records[key]||{};if(issues.length)return {label:'Needs attention',tone:'attention',icon:'warning'};if(key<=todayKey()&&completion===100)return {label:'Complete',tone:'complete',icon:'check'};if(isDayPlanned(date))return {label:rec.dayPlanType==='focus'?'Focus day':rec.dayPlanType==='travel'?'Travel':rec.dayPlanType==='rest'?'Rest day':'Planned',tone:'planned',icon:rec.dayPlanType==='focus'?'target':rec.dayPlanType==='travel'?'plane':rec.dayPlanType==='rest'?'bed':'calendar'};return {label:'On track',tone:'track',icon:'check'};}

function returnToDayPlan(date){const top=planReturnScroll;openDayAnchorPlanner(date);modalContent.scrollTop=top;}

function resetDateToRoutine(date){
  const key=todayKey(date),rec=ensureRecord(key);createSafetySnapshot(`Before resetting ${key} to routine`);
  const keep={actualWakeAt:rec.actualWakeAt,actualSleepAt:rec.actualSleepAt,actualWakeOffsetMin:rec.actualWakeOffsetMin,actualSleepOffsetMin:rec.actualSleepOffsetMin,lastActualWakeAt:rec.lastActualWakeAt,lastActualSleepAt:rec.lastActualSleepAt,lastActualWakeOffsetMin:rec.lastActualWakeOffsetMin,lastActualSleepOffsetMin:rec.lastActualSleepOffsetMin},doneStatuses=Object.fromEntries(Object.entries(rec.itemStatus||{}).filter(([,v])=>v==='done'));
  state.oneOffTasks=state.oneOffTasks.filter(x=>x.date!==key);rec.timeOverrides={};rec.itemStatus=doneStatuses;rec.unscheduledItems=[];rec.schedulerAttention=[];rec.autoMissedByWake=[];rec.explicitAnchors={};rec.dayNote='';delete rec.futurePlannedAt;delete rec.dayPlanType;Object.entries(keep).forEach(([k,v])=>{if(v!==undefined&&v!=='')rec[k]=v;else delete rec[k];});save();
}

function openDayAnchorPlanner(date){
  const key=todayKey(date);if(key<todayKey())return toast('Past day anchors can be corrected from their history instead');
  const rec=ensureRecord(key),currentWake=dayWakeTime(date),currentSleep=daySleepTime(date),isToday=key===todayKey(),items=itemsForDate(date),routine=items.filter(i=>i.source==='schedule'&&!isDayAnchor(i)),oneoffs=items.filter(i=>i.source==='oneoff'),reminders=oneoffs.filter(itemIsNonBlocking),cancelled=items.filter(i=>getStatus(i,key)==='cancelled').length,planType=rec.dayPlanType||'planned',attention=dayAttentionDetails(date);
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><div class="day-plan-modal-head"><button class="round-icon" id="cancelModal" aria-label="Back">${svgIcon('chevronLeft')}</button><div><h2>${escapeHTML(dayLong(date.getDay()))}, ${escapeHTML(formatDateShort(date))}</h2><p>Plan this day without changing your recurring routine.</p></div><button class="round-icon" id="dayPlanMoreBtn" aria-label="More">${svgIcon('more')}</button></div>
  ${attention.length?`<section class="week-attention-card plan-attention-card"><span>${svgIcon('warning')}</span><div><b>${attention.length} ${attention.length===1?'issue needs':'issues need'} attention</b>${attention.map(x=>`<small>${escapeHTML(x.text)}</small>`).join('')}<em>Tap any item below to move, cancel, restore or edit it.</em></div></section>`:''}
  <section class="day-settings-card"><h3>Day settings</h3><div class="day-anchor-grid"><label><span class="day-setting-icon wake">${svgIcon('sun')}</span><span><small>Wake time</small><input id="futureWakeTime" type="time" value="${escapeAttr(currentWake)}"><em>${hasDayAnchorOverride(date,'wake')?`Override · routine ${formatClock(dailyWakeItem(date)?.start||state.profile.wakeTarget)}`:'From routine'}</em></span></label><label><span class="day-setting-icon sleep">${svgIcon('moon')}</span><span><small>Sleep time</small><input id="futureSleepTime" type="time" value="${escapeAttr(currentSleep)}"><em>${hasDayAnchorOverride(date,'sleep')?`Override · routine ${formatClock(dailySleepItem(date)?.start||state.profile.sleepTarget)}`:'From routine'}</em></span></label></div><label class="day-note-field"><span class="label">Day note <small>optional</small></span><input class="input" id="dayNoteInput" maxlength="80" value="${escapeAttr(rec.dayNote||'')}" placeholder="Exam day, feeling sick, travel…"></label></section>
  <section class="quick-status-card"><h3>Quick status</h3><p>Set the feel of this day. It does not rewrite your routine.</p><div class="day-type-grid"><button data-day-type="planned" class="${planType==='planned'?'active':''}">${svgIcon('check')} Planned</button><button data-day-type="focus" class="${planType==='focus'?'active':''}">${svgIcon('target')} Focus Day</button><button data-day-type="travel" class="${planType==='travel'?'active':''}">${svgIcon('plane')} Travel</button><button data-day-type="rest" class="${planType==='rest'?'active':''}">${svgIcon('bed')} Rest Day</button></div></section>
  <section class="day-plan-section"><div class="day-plan-section-head"><span>${svgIcon('calendar')}</span><div><h3>Routine & fixed events</h3><p>Tap an item to manage this occurrence only. Fixed events can be cancelled or restored.</p></div></div><div class="day-plan-list">${routine.length?routine.map(i=>planRowHTML(i,date)).join(''):'<div class="empty-state compact-empty">No recurring items.</div>'}</div></section>
  <section class="day-plan-section"><div class="day-plan-section-head"><span class="purple">${svgIcon('check')}</span><div><h3>One-off items</h3><p>Add tasks, appointments or non-blocking reminders for this date.</p></div><button class="text-button" id="addPlanOneOff">+ Add</button></div><div class="day-plan-list">${oneoffs.length?oneoffs.map(i=>planRowHTML(i,date)).join(''):'<div class="empty-state compact-empty">No one-off items yet.</div>'}</div></section>
  <section class="day-plan-summary"><h3>Day summary</h3><div><span>${svgIcon('calendar')}<b>${routine.filter(itemIsFixed).length}</b><small>Fixed events</small></span><span>${svgIcon('check')}<b>${oneoffs.length}</b><small>One-off items</small></span><span>${svgIcon('bell')}<b>${reminders.length}</b><small>Reminders</small></span><span class="${cancelled?'red':''}">${svgIcon('close')}<b>${cancelled}</b><small>Cancelled</small></span></div></section>
  <section class="day-plan-advanced hidden" id="dayPlanAdvanced"><div class="day-plan-section-head"><span>${svgIcon('more')}</span><div><h3>More options</h3><p>Useful occasionally, kept out of the way.</p></div></div><label><span class="label">Copy this day’s one-off setup to</span><input class="input" id="copyDayTarget" type="date" min="${todayKey()}" value="${todayKey(addDays(date,1))}"></label><button class="secondary full" id="copyDaySetup" style="margin-top:8px">Copy one-off setup</button><button class="secondary full" id="manageRoutineFromPlan" style="margin-top:8px">Manage recurring routine</button></section>
  <button class="primary full day-plan-rebuild" id="rebuildFutureDay">${svgIcon('refresh')}<span><b>Rebuild with my changes</b><small>Resolve flexible tasks around your fixed events and anchors</small></span></button><button class="secondary full reset-routine-btn" id="resetFutureDay">${svgIcon('refresh')}<span><b>Reset to routine</b><small>Revert this day to its default routine</small></span></button><p class="day-plan-footnote">${svgIcon('lightbulb')} This only changes ${escapeHTML(dayLong(date.getDay()))}, ${escapeHTML(formatDateShort(date))}. Your recurring routine stays the same.</p>`;
  if(!modal.open)openAppSheet(modal);let selectedType=planType;
  $$('[data-day-type]',modalContent).forEach(b=>b.onclick=()=>{selectedType=b.dataset.dayType;$$('[data-day-type]',modalContent).forEach(x=>x.classList.toggle('active',x===b));});
  $$('[data-plan-item]',modalContent).forEach(b=>b.onclick=()=>{const item=itemsForDate(date).find(x=>occurrenceKey(x)===b.dataset.planItem);if(item)openPlanItemEditor(item,date);});
  $('#dayPlanMoreBtn').onclick=()=>$('#dayPlanAdvanced').classList.toggle('hidden');
  $('#addPlanOneOff').onclick=()=>{closeAppSheet(modal);openOneOffTaskModal(null,{date:key,start:key===todayKey()?suggestTimeForNewTask(date):'12:00',returnToPlan:key});};
  $('#manageRoutineFromPlan').onclick=()=>{closeAppSheet(modal);openScheduleManager(date.getDay());};
  $('#copyDaySetup').onclick=()=>{const target=$('#copyDayTarget').value;if(!target)return toast('Choose a target date');const count=copyOneOffSetup(date,parseDateKey(target));toast(count?`${count} one-off item${count===1?'':'s'} copied`:'Nothing new to copy');};
  $('#rebuildFutureDay').onclick=()=>{const wake=$('#futureWakeTime').value||currentWake,sleep=$('#futureSleepTime').value||currentSleep,before=daySnapshot(key);createSafetySnapshot(`Before rebuilding ${key}`);rec.dayNote=$('#dayNoteInput').value.trim();setDayWakeOverride(date,wake);setDaySleepOverride(date,sleep);rec.dayPlanType=selectedType;const plan=isToday?buildDaySchedulePlan(date,{kind:'today',preserveManual:true,wakeTime:wake,sleepTime:sleep}):buildDaySchedulePlan(date,{kind:'future',preserveManual:true,wakeTime:wake,sleepTime:sleep});if(isToday)applyAdaptiveRestart(plan);else applyFutureDayPlan(plan);rec.dayPlanType=selectedType;save();closeAppSheet(modal);render();toast('Day rebuilt','Undo',()=>restoreDaySnapshot(key,before));};
  $('#resetFutureDay').onclick=()=>{if(!confirm('Reset this date to the recurring routine? One-off items and day-specific changes will be removed. Completed history and actual wake/sleep logs are kept.'))return;const before=daySnapshot(key),oneoffsBefore=deepClone(state.oneOffTasks.filter(x=>x.date===key));resetDateToRoutine(date);closeAppSheet(modal);render();toast('Day restored to routine','Undo',()=>{state.records[key]=before;state.oneOffTasks.push(...oneoffsBefore.filter(x=>!state.oneOffTasks.some(y=>y.id===x.id)));save();render();});};
  $('#cancelModal').onclick=()=>closeAppSheet(modal);
}

function weekAttentionCard(date){const details=dayAttentionDetails(date);if(!details.length)return '';return `<section class="week-attention-card"><span>${svgIcon('warning')}</span><div><b>${details.length} ${details.length===1?'issue':'issues'} need attention</b>${details.map(x=>`<small>${escapeHTML(x.text)}</small>`).join('')}</div></section>`;}
function renderWeekBase(){
  let selected=parseDateKey(state.settings.selectedWeekDate||todayKey()),weekStart=startOfWeek(selected),days=Array.from({length:7},(_,i)=>addDays(weekStart,i)),weekEnd=days[6],selectedKey=todayKey(selected);if(!days.some(d=>todayKey(d)===selectedKey)){selected=weekStart;selectedKey=todayKey(selected);state.settings.selectedWeekDate=selectedKey;}
  setHeader('Week',selected);const rec=ensureRecord(selectedKey),selectedAll=itemsForDate(selected),selectedItems=selectedAll.filter(i=>!['cancelled','missed'].includes(getStatus(i,selectedKey))&&!(rec.unscheduledItems||[]).includes(occurrenceKey(i))),expanded=!!state.settings.weekDayExpanded,shown=expanded?selectedItems:selectedItems.slice(0,4),otherDays=days.filter(d=>todayKey(d)!==selectedKey),otherExpanded=!!state.settings.weekOtherExpanded,otherShown=otherExpanded?otherDays:otherDays.slice(0,3);
  const completeCount=days.filter(d=>todayKey(d)<=todayKey()&&dayCompletion(d)===100).length,attentionDays=days.filter(d=>isTrackedDate(d)&&dayAttentionIssues(d).length),attentionCount=attentionDays.length,plannedCount=days.filter(d=>isTrackedDate(d)&&isDayPlanned(d)).length,selectedStatus=dayPlanStatus(selected),cancelledCount=selectedAll.filter(i=>getStatus(i,selectedKey)==='cancelled').length;
  main.innerHTML=`<p class="week-subtitle">Plan ahead, not just react.</p><section class="week-header-card week-v34" id="weekSwipeArea"><div class="week-nav clean"><button class="round-icon" id="prevWeekBtn" aria-label="Previous week">${svgIcon('chevronLeft')}</button><div><b>${formatDateShort(weekStart)} – ${formatDateShort(weekEnd)}</b><button class="today-link" id="todayWeekBtn">This Week</button></div><button class="round-icon" id="nextWeekBtn" aria-label="Next week">${svgIcon('chevronRight')}</button></div><div class="week-strip modern">${days.map(d=>{const k=todayKey(d),p=dayCompletion(d),status=dayPlanStatus(d);return `<button class="week-day ${k===selectedKey?'active':''} ${k===todayKey()?'today':''}" data-day-key="${k}"><small>${dayShort(d.getDay())}</small><strong>${d.getDate()}</strong><i style="--p:${p}%"></i>${status.tone==='attention'?'<span class="week-alert-dot"></span>':''}</button>`}).join('')}</div></section>
  <section class="week-summary-v34 week-summary-v35"><button data-week-summary="complete"><span class="week-summary-icon complete">${svgIcon('check')}</span><b>${completeCount} / 7</b><small>Days complete</small><i>${svgIcon('chevronRight')}</i></button><button data-week-summary="attention" class="${attentionCount?'has-attention':''}"><span class="week-summary-icon attention">${svgIcon('warning')}</span><b>${attentionCount}</b><small>Days need attention</small><i>${svgIcon('chevronRight')}</i></button><button data-week-summary="planned"><span class="week-summary-icon planned">${svgIcon('calendar')}</span><b>${plannedCount}</b><small>Planned days</small><i>${svgIcon('chevronRight')}</i></button></section>
  <section class="week-selected-card"><div class="week-selected-head"><div><small>${dayLong(selected.getDay()).toUpperCase()}</small><h2>${formatDateShort(selected)}</h2>${rec.dayNote?`<p class="week-day-note">${svgIcon('lightbulb')} ${escapeHTML(rec.dayNote)}</p>`:''}</div>${selectedKey>=todayKey()?`<button class="week-plan-button" id="planDayBtn">${svgIcon('calendar')} Plan Day</button>`:`<span class="week-status-pill ${selectedStatus.tone}">${selectedStatus.label}</span>`}</div>${weekAttentionCard(selected)}${cancelledCount?`<div class="week-cancelled-note"><span>${svgIcon('close')}</span><b>${cancelledCount} cancelled</b><small>Intentional cancellations do not count as attention.</small></div>`:''}<div class="week-preview-list">${shown.length?shown.map(i=>weekPreviewRow(i,selected)).join(''):'<div class="empty-state compact-empty">Nothing scheduled for this day.</div>'}</div>${selectedItems.length>4?`<button class="week-view-full" id="weekViewFull">${svgIcon('list')} <span>${expanded?'Show less':`View full day (${selectedItems.length} items)`}</span>${svgIcon('chevronRight')}</button>`:''}${expanded?`<div class="week-expanded-actions"><button class="secondary small-btn" id="addWeekTaskBtn">${svgIcon('plus')} Add task</button></div>`:''}</section>
  <div class="week-other-title"><h2>Other Days This Week</h2>${otherDays.length>3?`<button id="weekSeeAll">${otherExpanded?'Show Less':'See All'}</button>`:''}</div><section class="week-other-list">${otherShown.map(weekOtherRow).join('')}</section>
  <details class="routine-manager week-routine-v34"><summary><span>${svgIcon('refresh')}<span><b>Weekly routine</b><small>${state.schedule.filter(s=>s.active!==false).length} recurring items</small></span></span>${svgIcon('chevronRight')}</summary><div class="routine-actions"><button class="primary" id="addRoutineBtn">+ Recurring item</button><button class="secondary" id="manageRoutineBtn">Manage routine</button></div></details>`;
  const shiftWeek=n=>{state.settings.selectedWeekDate=todayKey(n>0?addDays(startOfWeek(selected),7):addDays(startOfWeek(selected),-1));state.settings.weekDayExpanded=false;save();renderWeek();};$('#prevWeekBtn').onclick=()=>shiftWeek(-1);$('#nextWeekBtn').onclick=()=>shiftWeek(1);$('#todayWeekBtn').onclick=()=>{state.settings.selectedWeekDate=todayKey();state.settings.weekDayExpanded=false;save();renderWeek();};
  $$('[data-day-key]').forEach(b=>b.onclick=()=>{state.settings.selectedWeekDate=b.dataset.dayKey;state.settings.weekDayExpanded=false;save();renderWeek();});$$('[data-week-other]').forEach(b=>b.onclick=()=>{state.settings.selectedWeekDate=b.dataset.weekOther;state.settings.weekDayExpanded=false;save();renderWeek();pageScrollTo({top:0,behavior:'smooth'});});
  $$('[data-week-summary]').forEach(b=>b.onclick=()=>{const type=b.dataset.weekSummary;let candidates=type==='complete'?days.filter(d=>todayKey(d)<=todayKey()&&dayCompletion(d)===100):type==='attention'?attentionDays:days.filter(isDayPlanned);if(!candidates.length)return toast(type==='attention'?'No days need attention':type==='planned'?'No manually planned days this week':'No completed days yet');if(type==='complete')candidates=[...candidates].reverse();state.settings.selectedWeekDate=todayKey(candidates[0]);state.settings.weekDayExpanded=false;save();renderWeek();pageScrollTo({top:0,behavior:'smooth'});});
  if($('#planDayBtn'))$('#planDayBtn').onclick=()=>openDayAnchorPlanner(selected);if($('#weekViewFull'))$('#weekViewFull').onclick=()=>{state.settings.weekDayExpanded=!expanded;save();renderWeek();};if($('#weekSeeAll'))$('#weekSeeAll').onclick=()=>{state.settings.weekOtherExpanded=!otherExpanded;save();renderWeek();};if($('#addWeekTaskBtn'))$('#addWeekTaskBtn').onclick=()=>openOneOffTaskModal(null,{date:selectedKey,start:'12:00'});$('#addRoutineBtn').onclick=()=>openScheduleItemModal(null,{days:[selected.getDay()]});$('#manageRoutineBtn').onclick=()=>openScheduleManager(selected.getDay());
  let sx=0,sy=0;const swipe=$('#weekSwipeArea');swipe.addEventListener('touchstart',e=>{const t=e.touches[0];sx=t.clientX;sy=t.clientY;},{passive:true});swipe.addEventListener('touchend',e=>{const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.4)shiftWeek(dx<0?1:-1);},{passive:true});
}

function routineItemCard(item,selectedDay){
  const isAnchor=isDayAnchor(item),fixed=itemIsFixed(item),days=(item.days||[]).map(dayShort).join(', ');
  return `<button class="routine-v35-item ${item.active===false?'paused':''}" data-routine-edit="${escapeAttr(item.id)}">${taskIconHTML(item)}<span class="routine-v35-copy"><b>${escapeHTML(item.title)}</b><small>${escapeHTML(timeWindow(item))} · ${escapeHTML(item.category||'Routine')}</small><em>${isAnchor?'Anchor':fixed?'Fixed':'Flexible'} · ${escapeHTML(days)}</em></span><span class="routine-v35-chevron">${svgIcon('chevronRight')}</span></button>`;
}
function openScheduleManager(initialDay=null, returnScroll=0, returning=false){
  if(!returning)routineAllView.open=false;
  let selectedDay=initialDay==null?parseDateKey(state.settings.selectedWeekDate||todayKey()).getDay():Number(initialDay);
  const draw=(restoreScroll=0)=>{
    const active=state.schedule.filter(x=>x.active!==false&&Array.isArray(x.days)&&x.days.includes(selectedDay)).sort((a,b)=>itemSortMinutes(a)-itemSortMinutes(b)),anchors=active.filter(isDayAnchor),fixed=active.filter(i=>!isDayAnchor(i)&&itemIsFixed(i)),flex=active.filter(i=>!isDayAnchor(i)&&!itemIsFixed(i)),paused=state.schedule.filter(x=>x.active===false&&Array.isArray(x.days)&&x.days.includes(selectedDay));
    const wake=anchors.find(i=>i.id==='wake'),sleep=anchors.find(i=>i.id==='sleep');
    prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><div class="routine-v35-head"><div><p class="eyebrow">WEEKLY ROUTINE</p><h2>Manage routine</h2><p>Your recurring default week. One-off planning stays in Week → Plan Day.</p></div><button class="round-icon" id="closeModal" aria-label="Close">${svgIcon('close')}</button></div><div class="routine-day-tabs">${DAY_SHORT.map((d,i)=>`<button data-routine-day="${i}" class="${i===selectedDay?'active':''}"><small>${d}</small><b>${state.schedule.filter(x=>x.active!==false&&x.days?.includes(i)).length}</b></button>`).join('')}</div>
    <section class="routine-v35-summary"><div><span class="routine-anchor-icon wake">${svgIcon('sun')}</span><small>Wake</small><b>${formatClock(wake?.start||state.profile.wakeTarget)}</b><button data-routine-edit="wake">Edit</button></div><div><span class="routine-anchor-icon sleep">${svgIcon('moon')}</span><small>Sleep</small><b>${formatClock(sleep?.start||state.profile.sleepTarget)}</b><button data-routine-edit="sleep">Edit</button></div><div class="routine-counts"><span><b>${fixed.length}</b><small>Fixed</small></span><span><b>${flex.length}</b><small>Flexible</small></span></div></section>
    <div class="routine-v35-section-head"><div><span class="routine-section-icon fixed">${svgIcon('calendar')}</span><span><b>Fixed events</b><small>Classes and appointments never move.</small></span></div></div><section class="routine-v35-list">${fixed.length?fixed.map(i=>routineItemCard(i,selectedDay)).join(''):`<div class="empty-state compact-empty">No fixed events on ${escapeHTML(dayLong(selectedDay))}.</div>`}</section>
    <div class="routine-v35-section-head"><div><span class="routine-section-icon flexible">${svgIcon('spark')}</span><span><b>Flexible routine</b><small>Reset may move these when rebuilding a day.</small></span></div></div><section class="routine-v35-list">${flex.length?flex.map(i=>routineItemCard(i,selectedDay)).join(''):`<div class="empty-state compact-empty">No flexible routine items on ${escapeHTML(dayLong(selectedDay))}.</div>`}</section>
    ${paused.length?`<details class="routine-paused"><summary>${paused.length} paused item${paused.length===1?'':'s'} on this day</summary><div>${paused.map(i=>routineItemCard(i,selectedDay)).join('')}</div></details>`:''}
    <button class="primary full routine-add-v35" id="addRoutineInside">${svgIcon('plus')} Add recurring item</button>`;
    if(!modal.open)openAppSheet(modal);
    $('#closeModal').onclick=()=>dismissAppSheet(modal);$$('[data-routine-day]').forEach(b=>b.onclick=()=>{selectedDay=Number(b.dataset.routineDay);draw();});
    $$('[data-routine-edit]').forEach(b=>b.onclick=()=>{routineManagerReturnDay=selectedDay;routineManagerReturnScroll=modalContent.scrollTop;openScheduleItemModal(b.dataset.routineEdit);});
    $('#addRoutineInside').onclick=()=>{routineManagerReturnDay=selectedDay;routineManagerReturnScroll=modalContent.scrollTop;openScheduleItemModal(null,{days:[selectedDay]});};
    attachAllRecurringItems(selectedDay);
    modalContent.scrollTop=restoreScroll;
  };draw(returnScroll);
}
function renderAfterEditor(){
  if(routineManagerReturnDay!==null){returnToRoutineManager();return;}
  if(state.settings.activeTab==='week'&&weekEditContext){const ctx=weekEditContext;weekEditContext=null;state.settings.selectedWeekDate=ctx.date;save();renderWeek();requestAnimationFrame(()=>pageScrollTo({top:ctx.scrollY,behavior:'auto'}));}else{weekEditContext=null;render();}
}

function openWorkoutPlanner(){
  if(state.gym.activeWorkout)return toast('Finish or cancel your active workout first');
  let focus='Full Body',temp={};workoutFocuses().forEach(name=>temp[name]=new Set(validPresetIds(name)));
  const draw=()=>{
    const selected=temp[focus],all=state.gym.exercises||[],count=selected.size;
    prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">START WORKOUT</p><h2>Build today’s workout</h2><div class="focus-chip-wrap workout-four">${workoutFocuses().map(x=>`<button class="focus-chip ${x===focus?'active':''}" data-workout-focus="${escapeAttr(x)}">${escapeHTML(x)}</button>`).join('')}</div><div class="workout-builder-head"><div><small>${escapeHTML(focus.toUpperCase())}</small><b id="workoutSelectedCount">${count} exercise${count===1?'':'s'} selected</b></div><button class="text-button" id="resetWorkoutPreset">${focus==='Custom'?'Clear':'Reset default'}</button></div><div class="exercise-pick-grid" id="exercisePickGrid">${all.map(ex=>`<button type="button" class="exercise-pick ${selected.has(ex.id)?'selected':''}" data-workout-pick="${escapeAttr(ex.id)}" role="checkbox" aria-checked="${selected.has(ex.id)?'true':'false'}"><span class="exercise-pick-check">${selected.has(ex.id)?'✓':''}</span><span><b>${escapeHTML(ex.name)}</b><small>${escapeHTML(ex.group||'Other')}</small></span></button>`).join('')}</div><button class="primary full" id="startPlannedWorkout" ${count?'':'disabled'}>Start ${escapeHTML(focus)} workout</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
    if(!modal.open)openAppSheet(modal);
    $$('[data-workout-focus]',modalContent).forEach(b=>b.onclick=()=>{focus=b.dataset.workoutFocus;draw();});
    const grid=$('#exercisePickGrid');grid.onclick=e=>{const btn=e.target.closest('[data-workout-pick]');if(!btn)return;const id=btn.dataset.workoutPick;if(selected.has(id))selected.delete(id);else selected.add(id);const on=selected.has(id);btn.classList.toggle('selected',on);btn.setAttribute('aria-checked',on?'true':'false');const check=btn.querySelector('.exercise-pick-check');if(check)check.textContent=on?'✓':'';const c=$('#workoutSelectedCount');if(c)c.textContent=`${selected.size} exercise${selected.size===1?'':'s'} selected`;const start=$('#startPlannedWorkout');if(start)start.disabled=!selected.size;};
    $('#resetWorkoutPreset').onclick=()=>{temp[focus]=new Set(focus==='Custom'?[]:(defaultWorkoutPresets()[focus]||[]).filter(id=>state.gym.exercises.some(ex=>ex.id===id)));draw();};
    $('#startPlannedWorkout').onclick=()=>{if(state.gym.activeWorkout)return toast('Your workout is already in progress');const ids=[...temp[focus]];if(!ids.length)return toast('Choose at least one exercise');if(!state.gym.workoutPresets)state.gym.workoutPresets=defaultWorkoutPresets();state.gym.workoutPresets[focus]=ids;state.gym.activeWorkout={id:uid('workout'),date:todayKey(),focus,exerciseIds:ids,completedExerciseIds:[],startedAt:new Date().toISOString()};save();flushStateSave();closeAppSheet(modal);renderGym();toast(`${focus} workout started`);};$('#cancelModal').onclick=()=>closeAppSheet(modal);
  };draw();
}

function inspectDataHealth({repair=false}={}){
  const issues=[];let repaired=0;
  const gymSeen=new Map();
  for(const log of state.gym.logs||[]){
    if(!log.id)issues.push('A gym log is missing an ID');
    if(!Array.isArray(log.setEntries)&&(Number(log.sets)<1||Number(log.reps)<1)){issues.push('A gym log has invalid sets or reps');if(repair){log.sets=clamp(Number(log.sets||1),1,20);log.reps=clamp(Number(log.reps||1),1,100);repaired++;}}
    if(log.workoutId&&log.exerciseId){const k=`${log.workoutId}|${log.exerciseId}`,old=gymSeen.get(k);if(old){issues.push('Duplicate exercise logs exist inside one workout');if(repair){const oldIndex=state.gym.logs.indexOf(old),newIndex=state.gym.logs.indexOf(log);if(oldIndex>=0&&newIndex>=0){const keep=Number(log.createdAt||0)>=Number(old.createdAt||0)?log:old,drop=keep===log?old:log;state.gym.logs=state.gym.logs.filter(x=>x!==drop);gymSeen.set(k,keep);repaired++;}}}else gymSeen.set(k,log);}
  }
  for(const [key,rec] of Object.entries(state.records||{})){
    const date=parseDateKey(key),valid=new Set([...itemsForDate(date,{ignoreOverrides:true}).map(occurrenceKey),...state.schedule.map(x=>'s:'+x.id)]);
    for(const occ of Object.keys(rec.itemStatus||{})){if(!valid.has(occ)){issues.push(`${key} has an orphan task status`);if(repair){delete rec.itemStatus[occ];repaired++;}}}
    for(const occ of Object.keys(rec.timeOverrides||{})){if(!valid.has(occ)){issues.push(`${key} has an orphan time override`);if(repair){delete rec.timeOverrides[occ];repaired++;}}}
    const before=(rec.unscheduledItems||[]).length;const cleaned=(rec.unscheduledItems||[]).filter(x=>valid.has(x));if(cleaned.length!==before){issues.push(`${key} has stale attention references`);if(repair){rec.unscheduledItems=cleaned;repaired+=before-cleaned.length;}}
    if(rec.actualWakeAt&&!validActualWakeForKey(rec.actualWakeAt,key))issues.push(`${key} has a wake log on the wrong date`);
    if(rec.actualSleepAt){const a=String(rec.actualSleepAt).slice(0,10),next=todayKey(addDays(date,1));if(a!==key&&a!==next)issues.push(`${key} has a sleep log outside its night`);}
    const w=rec.timeOverrides?.['s:wake'];if(w?.dayAnchor&&rec.actualWakeAt&&!rec.explicitAnchors?.wake&&w.start===String(rec.actualWakeAt).slice(11,16)){issues.push(`${key} has a legacy actual-wake/planned-wake mix-up`);if(repair){delete rec.timeOverrides['s:wake'];repaired++;}}
    const sl=rec.timeOverrides?.['s:sleep'];if(sl?.dayAnchor&&rec.actualSleepAt&&!rec.explicitAnchors?.sleep&&sl.start===String(rec.actualSleepAt).slice(11,16)){issues.push(`${key} has a legacy actual-sleep/planned-sleep mix-up`);if(repair){delete rec.timeOverrides['s:sleep'];repaired++;}}
  }
  const txIds=new Set();for(const t of state.money.transactions||[]){if(txIds.has(t.id))issues.push('Duplicate money transaction IDs were found');else txIds.add(t.id);if(!Number.isFinite(Number(t.amount))||Number(t.amount)<0)issues.push('A money transaction has an invalid amount');}
  return {issues:[...new Set(issues)],repaired};
}
function openDataHealthModal(){
  const report=inspectDataHealth(),status=$('#dataHealthStatus');if(status)status.textContent=report.issues.length?`${report.issues.length} found`:'Healthy';closeAppSheet(settingsDialog);
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">DATA HEALTH</p><h2>${report.issues.length?'A few things need checking':'Everything looks healthy'}</h2><p class="muted">Reset checks schedule links, Wake/Sleep separation, gym logs and stored references without sending anything online.</p>${report.issues.length?`<div class="health-check-list">${report.issues.slice(0,10).map(x=>`<div>${svgIcon('warning')}<span>${escapeHTML(x)}</span></div>`).join('')}${report.issues.length>10?`<small>+ ${report.issues.length-10} more</small>`:''}</div><button class="primary full" id="repairDataHealth">Repair safe issues</button>`:`<div class="health-ok-card">${svgIcon('check')}<div><b>No structural problems found</b><small>Your local Reset data passed the consistency check.</small></div></div>`}<button class="secondary full" id="cancelModal" style="margin-top:8px">Close</button>`;
  openAppSheet(modal);
  if($('#repairDataHealth'))$('#repairDataHealth').onclick=()=>{createSafetySnapshot('Before data health repair');const fixed=inspectDataHealth({repair:true});save();const status=$('#dataHealthStatus');if(status)status.textContent='Healthy';closeAppSheet(modal);render();toast(fixed.repaired?`${fixed.repaired} safe issue${fixed.repaired===1?'':'s'} repaired`:'No safe repairs were needed');};
  $('#cancelModal').onclick=()=>closeAppSheet(modal);
}

// Prevent accidental double execution of the same action while still allowing rapid interaction across different controls.
const __resetTapTimes=new WeakMap();
document.addEventListener('click',e=>{const btn=e.target.closest?.('button');if(!btn||btn.matches('[data-odo-step],[data-quick-weight],[data-quick-sets],[data-quick-reps]'))return;if(btn.matches('#cancelModal,#closeModal,#backToPlan,[aria-label="Close"],[aria-label="Back"]'))return;const now=performance.now(),last=__resetTapTimes.get(btn);if(last!==undefined&&now-last<260){e.preventDefault();e.stopImmediatePropagation();return;}__resetTapTimes.set(btn,now);},true);

const __dataHealthBtn=$('#dataHealthBtn');if(__dataHealthBtn)__dataHealthBtn.onclick=openDataHealthModal;
const __recoveryBtn=$('#recoverySnapshotBtn');if(__recoveryBtn)__recoveryBtn.onclick=openRecoverySnapshotModal;
/* ===== end v3.5 layer ===== */

/* ===== end v3.4 layer ===== */


$$('.tab').forEach(btn=>btn.addEventListener('click',()=>{state.settings.activeTab=btn.dataset.tab;if(btn.dataset.tab==='more')state.settings.moreView='home';if(btn.dataset.tab==='money')state.settings.moneyView='home';save();render();pageScrollTo({top:0,behavior:'auto'});}));

const settingsDialog=$('#settingsDialog');
$('#settingsBtn').onclick=()=>{const v=$('#versionLabel');if(v)v.textContent='v'+APP_DISPLAY_VERSION;requestPersistentStorage().then(updateStorageProtectionLabel);updateBackupConfidenceLabel();updateRecoverySnapshotRow();checkForAppUpdate(true);openAppSheet(settingsDialog);};
if($('#updateReadyBtn'))$('#updateReadyBtn').onclick=applyAppUpdate;
$('#exportBtn').onclick=()=>{
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`reset-backup-${todayKey()}.json`;a.click();URL.revokeObjectURL(url);toast('Backup exported');
};
$('#importInput').addEventListener('change',async e=>{const f=e.target.files?.[0];if(!f)return;try{const data=JSON.parse(await f.text());if(!data.money||!data.records)throw new Error('Invalid');createSafetySnapshot('Before backup import');state=migrateState(data);save();closeAppSheet(settingsDialog);toast('Backup imported');render();}catch(err){toast('That backup file is not valid');}e.target.value='';});
$('#installHelpBtn').onclick=()=>{closeAppSheet(settingsDialog);prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">IPHONE</p><h2>Add Reset to your Home Screen</h2><ol class="muted" style="padding-left:20px;line-height:1.8"><li>Open the app link in <b>Safari</b>.</li><li>Tap <b>Share</b>.</li><li>Choose <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b>.</li></ol><p class="muted tiny">When an update is uploaded to GitHub Pages, fully close and reopen the app. If an old version remains, refresh the Safari page once.</p><button class="primary full" id="cancelModal">Got it</button>`;openAppSheet(modal);$('#cancelModal').onclick=()=>closeAppSheet(modal);};
$('#storageProtectionBtn').onclick=async()=>{const r=await requestPersistentStorage();updateStorageProtectionLabel(r);toast(r.persisted?'Local data protection enabled':'iPhone is using best-effort local storage');};
$('#eraseBtn').onclick=async()=>{if(confirm('Erase all Reset app data on this device?')){try{localStorage.removeItem(APP_KEY);}catch(e){}await durableClear();clearSafetySnapshot();state=defaultState();closeAppSheet(settingsDialog);save();render();toast('App reset');}};


if('serviceWorker' in navigator){
  window.addEventListener('load',async()=>{
    try{
      let reloading=false;
      navigator.serviceWorker.addEventListener('controllerchange',()=>{
        if(reloading)return;
        if(!window.__resetApplyingUpdate){const button=$('#updateReadyBtn');if(button)button.classList.remove('hidden');return;}
        reloading=true;
        window.location.reload();
      });
      const reg=await navigator.serviceWorker.register('./service-worker.js?v=3.6.5-final',{updateViaCache:'none'});
      if(reg.waiting){const button=$('#updateReadyBtn');if(button)button.classList.remove('hidden');}
      reg.addEventListener('updatefound',()=>{
        const worker=reg.installing;
        if(!worker)return;
        worker.addEventListener('statechange',()=>{
          if(worker.state==='installed'&&navigator.serviceWorker.controller){
            const button=$('#updateReadyBtn');if(button)button.classList.remove('hidden');
          }
        });
      });
      reg.update().catch(()=>{});
      checkForAppUpdate(false);
      setInterval(()=>checkForAppUpdate(false),30*60*1000);
    }catch(e){}
  });
}

// CSS touch-action handles double taps without swallowing taps after scrolling.
let lastClockDateKey=todayKey();
setInterval(()=>{if(openSheets().length)return;const nowKey=todayKey();if(nowKey!==lastClockDateKey){sealPastDays();lastClockDateKey=nowKey;if(state.settings.activeTab==='today')renderToday(false);else if(state.settings.activeTab==='week')renderWeek();else render();return;}if(state.settings.activeTab==='today')renderToday(true);},60000);
/* ===== Reset v3.6.1 swap/order hotfix ===== */
function swapEligibleItems(date){
  const key=todayKey(date);
  return itemsForMode(itemsForDate(date),modeForDate(key))
    .filter(i=>!isDayAnchor(i)&&!itemIsFixed(i)&&!itemIsNonBlocking(i)&&!isClosedStatus(getStatus(i,key)))
    .sort((a,b)=>itemSortMinutes(a)-itemSortMinutes(b)||String(a.title).localeCompare(String(b.title)));
}
function setManualPreferredOverrideAbs(item,key,absoluteStart){
  const rec=ensureRecord(key),occ=occurrenceKey(item),dur=itemDurationForMove(item),existing=rec.timeOverrides[occ]||{};
  rec.timeOverrides[occ]={...existing,start:minutesToTime(absoluteStart),end:minutesToTime(absoluteStart+dur),dayOffset:Math.floor(absoluteStart/1440),manual:true,adaptive:false,manualPreferredStart:minutesToTime(absoluteStart)};
  removeUnscheduledOccurrence(key,occ);
}
var __manualSwapError='';
function manualOrderSemanticError(date,list){
  const byOcc=new Map(itemsForDate(date).map(i=>[occurrenceKey(i),i]));
  const meals=list.map((occ,pos)=>({pos,item:byOcc.get(occ)})).filter(x=>x.item&&mealRank(x.item)>0).sort((a,b)=>mealRank(a.item)-mealRank(b.item));
  for(let i=1;i<meals.length;i++){if(meals[i].pos<meals[i-1].pos)return `${meals[i].item.title} needs to stay after ${meals[i-1].item.title}`;}
  const groom=list.findIndex(occ=>byOcc.get(occ)?.id==='groom'),breakfast=list.findIndex(occ=>byOcc.get(occ)?.id==='breakfast');
  if(groom>=0&&breakfast>=0&&groom>breakfast)return 'Shower + grooming needs to stay before Breakfast';
  return '';
}
function recordSwapIntent(item,other,date){
  __manualSwapError='';
  const key=todayKey(date),rec=ensureRecord(key),ordered=swapEligibleItems(date),aOcc=occurrenceKey(item),bOcc=occurrenceKey(other);
  const list=ordered.map(occurrenceKey),ai=list.indexOf(aOcc),bi=list.indexOf(bOcc);
  if(ai<0||bi<0){__manualSwapError='Those tasks cannot be swapped right now';return false;}
  const aStart=itemSortMinutes(item),bStart=itemSortMinutes(other);
  [list[ai],list[bi]]=[list[bi],list[ai]];
  const semanticError=manualOrderSemanticError(date,list);if(semanticError){__manualSwapError=semanticError;return false;}
  rec.manualOrder=list;
  setManualPreferredOverrideAbs(item,key,bStart);
  setManualPreferredOverrideAbs(other,key,aStart);
  return true;
}
function rebuildAfterManualSwap(date){
  const key=todayKey(date),isToday=key===todayKey();
  const plan=buildDaySchedulePlan(date,{kind:isToday?'today':'future',preserveManual:true,wakeTime:dayWakeTime(date),sleepTime:daySleepTime(date)});
  if(isToday)applyAdaptiveRestart(plan);else applyFutureDayPlan(plan);
  return plan;
}

function buildDaySchedulePlan(date,{kind='future',preserveManual=true,wakeTime=null,sleepTime=null}={}){
  const key=todayKey(date),rec=ensureRecord(key),manualMap=rec.timeOverrides||{},mode=modeForDate(key);
  const baseRaw=itemsForMode(itemsForDate(date,{ignoreOverrides:true}),mode);
  const wakeBase=baseRaw.find(i=>i.id==='wake'),sleepBase=baseRaw.find(i=>i.id==='sleep');
  const recurringWake=minutesFromTime(wakeBase?.start||state.profile.wakeTarget||'08:00');
  const chosenWakeTime=wakeTime||manualMap[wakeBase?occurrenceKey(wakeBase):'']?.start||wakeBase?.start||state.profile.wakeTarget||'08:00';
  const chosenWake=minutesFromTime(chosenWakeTime);
  const chosenSleepTime=sleepTime||manualMap[sleepBase?occurrenceKey(sleepBase):'']?.start||sleepBase?.start||state.profile.sleepTarget||'23:30';
  const chosenSleepOff=sleepDayOffsetForTime(chosenSleepTime),sleepLimit=minutesFromTime(chosenSleepTime)+1440*chosenSleepOff;
  const actualWake=(kind==='today'?actualMinutesForRecord(rec.actualWakeAt,key,false):null);
  const schedulingWake=actualWake!=null?actualWake:chosenWake;
  const wakeDur=durationMinutes(wakeBase||{start:chosenWakeTime,end:minutesToTime(chosenWake+10)});
  const now=kind==='today'?roundUpMinutes(currentMinutes(),5):schedulingWake+wakeDur;
  const floor=kind==='today'?Math.max(now,schedulingWake+wakeDur):schedulingWake+wakeDur;
  const overrides={};
  if(wakeBase){const occ=occurrenceKey(wakeBase),routine=minutesToTime(minutesFromTime(wakeBase.start)),normalized=minutesToTime(chosenWake);if(normalized!==routine||manualMap[occ]?.dayAnchor){const dur=durationMinutes(wakeBase);overrides[occ]={start:normalized,end:minutesToTime(chosenWake+dur),dayOffset:0,manual:true,adaptive:false,dayAnchor:true};}}
  if(sleepBase){const occ=occurrenceKey(sleepBase),routine=minutesToTime(minutesFromTime(sleepBase.start)),normalized=minutesToTime(minutesFromTime(chosenSleepTime));if(normalized!==routine||manualMap[occ]?.dayAnchor){const dur=durationMinutes(sleepBase),abs=minutesFromTime(normalized)+1440*chosenSleepOff;overrides[occ]={start:normalized,end:minutesToTime(abs+dur),dayOffset:chosenSleepOff,manual:true,adaptive:false,dayAnchor:true};}}
  Object.entries(manualMap).forEach(([occ,ov])=>{const item=baseRaw.find(x=>occurrenceKey(x)===occ);if(item&&getStatus(item,key)==='done'&&!isDayAnchor(item))overrides[occ]={...ov};});
  let baseItems=baseRaw.map(i=>{const ov=preserveManual?manualMap[occurrenceKey(i)]:null;return ov?.manual&&!ov?.dayAnchor?{...i,...ov}:i;});
  const fixed=baseItems.filter(i=>!isDayAnchor(i)&&itemIsFixed(i)&&!['done','cancelled','dropped','deferred'].includes(getStatus(i,key)));
  const missedFixed=kind==='today'?fixed.filter(i=>getStatus(i,key)==='pending'&&itemEndSortMinutes(i)<currentMinutes()):[];
  const blocked=[];
  fixed.forEach(i=>{if(!itemAllowsOverlap(i)&&(itemEndSortMinutes(i)>floor||kind!=='today'))blocked.push({start:itemSortMinutes(i),end:itemEndSortMinutes(i),item:i});});
  const statusesToSkip=new Set(['done','cancelled','deferred','dropped']);
  const movable=baseItems.filter(i=>!isDayAnchor(i)&&!itemIsFixed(i)&&!itemIsNonBlocking(i)&&!statusesToSkip.has(getStatus(i,key)));
  const wakeShift=schedulingWake-recurringWake;
  const manualPreferredMinutes=(item)=>{
    const ov=manualMap[occurrenceKey(item)];
    if(!preserveManual||!ov?.manual||ov?.dayAnchor)return null;
    return minutesFromTime(ov.manualPreferredStart||ov.start||item.start)+1440*Number(ov.dayOffset||0);
  };
  const basePref=(item)=>{
    const preferred=manualPreferredMinutes(item),manual=preferred!=null;
    let desired=manual?preferred:itemSortMinutes(item);
    if(!manual&&['groom','breakfast'].includes(item.id))desired+=wakeShift;
    if(desired<schedulingWake+wakeDur)desired=floor;
    if(kind==='today'&&itemEndSortMinutes(item)<floor)desired=floor;
    return Math.max(floor,desired);
  };
  const mealDesired=new Map();let semanticMealEnd=null;
  [...movable].filter(i=>mealRank(i)>0).sort((a,b)=>mealRank(a)-mealRank(b)||basePref(a)-basePref(b)).forEach(item=>{
    let desired=basePref(item);if(semanticMealEnd!=null)desired=Math.max(desired,semanticMealEnd+120);
    mealDesired.set(occurrenceKey(item),desired);semanticMealEnd=desired+durationMinutes(item);
  });
  const pref=(item)=>mealDesired.has(occurrenceKey(item))?mealDesired.get(occurrenceKey(item)):basePref(item);
  const originalMinutes=(item)=>{const original=baseRaw.find(x=>occurrenceKey(x)===occurrenceKey(item));return original?itemSortMinutes(original):itemSortMinutes(item);};
  const validMovable=new Set(movable.map(occurrenceKey));
  const storedOrder=preserveManual&&Array.isArray(rec.manualOrder)?rec.manualOrder.filter(occ=>validMovable.has(occ)):[];
  const orderIndex=new Map(storedOrder.map((occ,index)=>[occ,index]));
  movable.sort((a,b)=>{
    const ar=morningRank(a),br=morningRank(b);if(ar&&br)return ar-br;
    const am=mealRank(a),bm=mealRank(b);if(am&&bm)return am-bm;
    const ao=orderIndex.get(occurrenceKey(a)),bo=orderIndex.get(occurrenceKey(b));
    if(ao!=null&&bo!=null)return ao-bo;
    return pref(a)-pref(b)||originalMinutes(a)-originalMinutes(b)||String(a.title).localeCompare(String(b.title));
  });
  const moved=[],unplaced=[];let lastMealEnd=null,sequenceCursor=null;
  for(const item of movable){
    const occ=occurrenceKey(item),normalDuration=durationMinutes(item),overdue=kind==='today'&&(itemEndSortMinutes(item)<floor||getStatus(item,key)==='missed');
    const duration=overdue?Math.max(5,Math.min(normalDuration,Number(item.minMinutes||normalDuration))):normalDuration;
    let desired=pref(item);
    const inManualSequence=orderIndex.has(occ);
    if(inManualSequence&&sequenceCursor!=null)desired=Math.max(desired,sequenceCursor);
    const mr=mealRank(item);if(mr&&lastMealEnd!=null)desired=Math.max(desired,lastMealEnd+120);
    let slot=findOpenSlot(desired,duration,blocked,sleepLimit);
    const wasManual=!!manualMap[occ]?.manual&&!manualMap[occ]?.dayAnchor;
    if(slot==null&&kind==='future'&&!inManualSequence)slot=findOpenSlotBackward(sleepLimit,duration,blocked,(mr||wasManual)?desired:floor);
    if(slot==null){unplaced.push(item);if(wasManual)overrides[occ]={...manualMap[occ]};continue;}
    const newStart=slot,newEnd=slot+duration;blocked.push({start:newStart,end:newEnd,item});if(mr)lastMealEnd=newEnd;if(inManualSequence)sequenceCursor=newEnd;
    const original=baseRaw.find(x=>occurrenceKey(x)===occ);
    const changed=!original||newStart!==itemSortMinutes(original)||duration!==normalDuration||overdue||(preserveManual&&wasManual)||inManualSequence||(['groom','breakfast'].includes(item.id)&&wakeShift!==0);
    if(changed){const ov={start:minutesToTime(newStart),end:minutesToTime(newEnd),dayOffset:Math.floor(newStart/1440),adaptive:true,manual:preserveManual&&(wasManual||inManualSequence)};if(preserveManual&&(wasManual||inManualSequence))ov.manualPreferredStart=manualMap[occ]?.manualPreferredStart||manualMap[occ]?.start||item.start;overrides[occ]=ov;moved.push({...item,...ov});}
  }
  return {key,kind,now,floor,overrides,moved,missedFixed,unplaced,preserveManual,wakeTime:chosenWakeTime,sleepTime:chosenSleepTime,manualCount:Object.values(manualMap).filter(x=>x?.manual&&!x?.dayAnchor).length,manualOrder:preserveManual?storedOrder:[]};
}
function applyAdaptiveRestart(plan){
  const rec=ensureRecord(plan.key);recordRebuildSummary(plan);rec.timeOverrides=plan.overrides;rec.manualOrder=Array.isArray(plan.manualOrder)?[...plan.manualOrder]:[];rec.unscheduledItems=plan.unplaced.map(occurrenceKey);rec.schedulerAttention=plan.unplaced.map(i=>`${i.title} could not fit before sleep`);
  for(const item of plan.missedFixed){if(getStatus(item,plan.key)!=='done'&&getStatus(item,plan.key)!=='cancelled')rec.itemStatus[occurrenceKey(item)]='missed';}
  for(const item of plan.moved){if(rec.itemStatus[occurrenceKey(item)]==='missed')delete rec.itemStatus[occurrenceKey(item)];}
  Object.keys(rec.itemStatus).forEach(k=>{if(rec.itemStatus[k]!=='missed')return;const item=itemsForDate(parseDateKey(plan.key),{ignoreOverrides:true}).find(x=>occurrenceKey(x)===k);if(item&&!itemIsFixed(item)&&!rec.unscheduledItems.includes(k))delete rec.itemStatus[k];});
  rec.resetCount=(rec.resetCount||0)+1;rec.restartAt=new Date().toISOString();save();
}
function applyFutureDayPlan(plan){const rec=ensureRecord(plan.key);recordRebuildSummary(plan);rec.timeOverrides=plan.overrides;rec.manualOrder=Array.isArray(plan.manualOrder)?[...plan.manualOrder]:[];rec.unscheduledItems=plan.unplaced.map(occurrenceKey);rec.schedulerAttention=plan.unplaced.map(i=>`${i.title} could not fit before sleep`);rec.futurePlannedAt=new Date().toISOString();save();}
function clearItemTimeOverride(item,key){const rec=ensureRecord(key),occ=occurrenceKey(item);delete rec.timeOverrides[occ];if(Array.isArray(rec.manualOrder))rec.manualOrder=rec.manualOrder.filter(x=>x!==occ);removeUnscheduledOccurrence(key,occ);save();}

function openMoveItemModal(item,date){
  const key=todayKey(date);
  if(itemManualMoveLocked(item))return toast('This item is locked to its planned time');
  const others=itemsForDate(date).filter(x=>occurrenceKey(x)!==occurrenceKey(item)&&!itemManualMoveLocked(x)&&!itemIsNonBlocking(x)&&!isClosedStatus(getStatus(x,key))).sort((a,b)=>itemSortMinutes(a)-itemSortMinutes(b));
  const hasOverride=!!state.records[key]?.timeOverrides?.[occurrenceKey(item)];
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">MOVE TASK</p><h2>${escapeHTML(item.title)}</h2><p class="muted tiny">Move to an exact time, or swap positions with another flexible task. Swaps automatically repack the surrounding timeline.</p><div class="stack"><label><span class="label">Move to a different time</span><input class="input" id="moveTime" type="time" value="${escapeAttr(item.start)}"></label>${others.length?`<label><span class="label">Or swap positions with</span><select id="swapTask"><option value="">No swap</option>${others.map(x=>`<option value="${escapeAttr(occurrenceKey(x))}">${escapeHTML(x.title)} · ${escapeHTML(formatClock(x.start))}</option>`).join('')}</select></label>`:''}</div><button class="primary full" id="saveMove" style="margin-top:14px">Save move</button><button class="secondary full" id="moveTomorrow" style="margin-top:8px">Move to tomorrow</button>${hasOverride?'<button class="secondary full" id="resetMove" style="margin-top:8px">Reset to planned time</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);
  $('#saveMove').onclick=()=>{
    const swapOcc=$('#swapTask')?.value||'';
    if(swapOcc){
      const other=itemsForDate(date).find(x=>occurrenceKey(x)===swapOcc);if(!other)return toast('That task is no longer available');
      const before=daySnapshot(key);createSafetySnapshot(`Before swapping tasks on ${key}`);
      if(!recordSwapIntent(item,other,date))return toast(__manualSwapError||'Those tasks cannot be swapped right now');
      const plan=rebuildAfterManualSwap(date);closeAppSheet(modal);render();
      if(plan.unplaced.length)toast('Swapped, but part of the day needs attention','Undo',()=>restoreDaySnapshot(key,before));else toast('Tasks swapped and timeline repacked','Undo',()=>restoreDaySnapshot(key,before));
      return;
    }
    const time=$('#moveTime').value;if(!time)return toast('Choose a time');
    if(moveWouldHitLocked(item,date,time))return toast('That time overlaps a locked item');
    const before=daySnapshot(key);setItemTimeOverride(item,key,time);closeAppSheet(modal);render();toast('Task moved','Undo',()=>restoreDaySnapshot(key,before));
  };
  $('#moveTomorrow').onclick=()=>{const nextKey=todayKey(addDays(parseDateKey(key),1)),beforeRec=deepClone(state.records[key]||null),beforeNext=deepClone(state.records[nextKey]||null),beforeOneOff=deepClone(state.oneOffTasks);if(moveItemToTomorrow(item,key)){closeAppSheet(modal);render();toast('Moved to tomorrow','Undo',()=>{if(beforeRec)state.records[key]=beforeRec;else delete state.records[key];if(beforeNext)state.records[nextKey]=beforeNext;else delete state.records[nextKey];state.oneOffTasks=beforeOneOff;save();render();});}};
  if($('#resetMove'))$('#resetMove').onclick=()=>{const before=daySnapshot(key);clearItemTimeOverride(item,key);closeAppSheet(modal);render();toast('Planned time restored','Undo',()=>restoreDaySnapshot(key,before));};
  $('#cancelModal').onclick=()=>closeAppSheet(modal);
}

function openPlanItemEditor(item,date){
  if($('#futureWakeTime',modalContent))planReturnScroll=modalContent.scrollTop;
  const key=todayKey(date),status=getStatus(item,key),fixed=itemIsFixed(item),reminder=itemIsNonBlocking(item),oneoff=item.source==='oneoff',active=!['cancelled','dropped','deferred'].includes(status);
  const others=itemsForDate(date).filter(x=>occurrenceKey(x)!==occurrenceKey(item)&&!itemManualMoveLocked(x)&&!itemIsNonBlocking(x)&&!isClosedStatus(getStatus(x,key))).sort((a,b)=>itemSortMinutes(a)-itemSortMinutes(b));
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><div class="day-plan-modal-head"><button class="round-icon" id="backToPlan" aria-label="Back">${svgIcon('chevronLeft')}</button><div><p class="eyebrow">PLAN ITEM</p><h2>${escapeHTML(item.title)}</h2><p>${reminder?'Non-blocking reminder':fixed?'Fixed event':'Flexible task'} · ${escapeHTML(timeWindow(item))}</p></div><span></span></div>
    ${!fixed&&active?`<section class="day-settings-card"><h3>Move or swap</h3><div class="stack"><label><span class="label">Move to time</span><input class="input" id="planMoveTime" type="time" value="${escapeAttr(item.start)}"></label>${others.length?`<label><span class="label">Or swap positions with</span><select id="planSwapTask"><option value="">No swap</option>${others.map(x=>`<option value="${escapeAttr(occurrenceKey(x))}">${escapeHTML(x.title)} · ${escapeHTML(formatClock(x.start))}</option>`).join('')}</select></label>`:''}</div><button class="primary full" id="savePlanMove" style="margin-top:12px">Save move</button></section>`:''}
    <section class="day-plan-section compact-plan-actions"><div class="day-plan-section-head"><span>${svgIcon('more')}</span><div><h3>Actions</h3><p>Changes apply only to ${escapeHTML(formatDateShort(date))}.</p></div></div>
      ${oneoff?`<button class="secondary full" id="editPlanOneOff">${svgIcon('settings')} Edit details</button>`:''}
      ${status==='cancelled'?`<button class="secondary full" id="restorePlanItem">${svgIcon('refresh')} Restore to this day</button>`:active?`<button class="secondary full" id="cancelPlanItem">${svgIcon('close')} Cancel for this day</button>`:''}
      ${oneoff?`<button class="danger-btn full" id="deletePlanOneOff">Delete from this day</button>`:''}
    </section>`;
  if(!modal.open)openAppSheet(modal);
  sheetScrollState.onDismiss=()=>returnToDayPlan(date);
  $('#backToPlan').onclick=()=>returnToDayPlan(date);
  if($('#savePlanMove'))$('#savePlanMove').onclick=()=>{const swapOcc=$('#planSwapTask')?.value||'',before=daySnapshot(key);if(swapOcc){const other=itemsForDate(date).find(x=>occurrenceKey(x)===swapOcc);if(!other)return toast('That task is no longer available');createSafetySnapshot(`Before swapping tasks on ${key}`);if(!recordSwapIntent(item,other,date))return toast(__manualSwapError||'Those tasks cannot be swapped right now');const plan=rebuildAfterManualSwap(date);returnToDayPlan(date);toast(plan.unplaced.length?'Swapped, but this day still needs attention':'Tasks swapped and day repacked','Undo',()=>restoreDaySnapshot(key,before));return;}const time=$('#planMoveTime').value;if(!time)return toast('Choose a time');if(moveWouldHitLocked(item,date,time))return toast('That time overlaps an active locked item');setItemTimeOverride(item,key,time);save();returnToDayPlan(date);toast(reminder?'Reminder moved':'Task moved','Undo',()=>restoreDaySnapshot(key,before));};
  if($('#editPlanOneOff'))$('#editPlanOneOff').onclick=()=>{closeAppSheet(modal);openOneOffTaskModal(item.id,{returnToPlan:key});};
  if($('#cancelPlanItem'))$('#cancelPlanItem').onclick=()=>{const before=daySnapshot(key);setStatus(item,key,'cancelled');save();returnToDayPlan(date);toast('Cancelled for this day','Undo',()=>restoreDaySnapshot(key,before));};
  if($('#restorePlanItem'))$('#restorePlanItem').onclick=()=>{const before=daySnapshot(key);setStatus(item,key,'pending');save();returnToDayPlan(date);toast(fixed?'Restored to its fixed time':'Restored','Undo',()=>restoreDaySnapshot(key,before));};
  if($('#deletePlanOneOff'))$('#deletePlanOneOff').onclick=()=>{const idx=state.oneOffTasks.findIndex(x=>x.id===item.id);if(idx<0)return;const removed=deepClone(state.oneOffTasks[idx]);state.oneOffTasks.splice(idx,1);save();returnToDayPlan(date);toast(reminder?'Reminder deleted':'Item deleted','Undo',()=>{state.oneOffTasks.splice(Math.min(idx,state.oneOffTasks.length),0,removed);save();returnToDayPlan(date);});};
}

function returnToDayPlan(date){const top=planReturnScroll;openDayAnchorPlanner(date);modalContent.scrollTop=top;}

function resetDateToRoutine(date){
  const key=todayKey(date),rec=ensureRecord(key);createSafetySnapshot(`Before resetting ${key} to routine`);
  const keep={actualWakeAt:rec.actualWakeAt,actualSleepAt:rec.actualSleepAt,actualWakeOffsetMin:rec.actualWakeOffsetMin,actualSleepOffsetMin:rec.actualSleepOffsetMin,lastActualWakeAt:rec.lastActualWakeAt,lastActualSleepAt:rec.lastActualSleepAt,lastActualWakeOffsetMin:rec.lastActualWakeOffsetMin,lastActualSleepOffsetMin:rec.lastActualSleepOffsetMin},doneStatuses=Object.fromEntries(Object.entries(rec.itemStatus||{}).filter(([,v])=>v==='done'));
  state.oneOffTasks=state.oneOffTasks.filter(x=>x.date!==key);rec.timeOverrides={};rec.manualOrder=[];rec.itemStatus=doneStatuses;rec.unscheduledItems=[];rec.schedulerAttention=[];rec.autoMissedByWake=[];rec.explicitAnchors={};rec.dayNote='';delete rec.futurePlannedAt;delete rec.dayPlanType;Object.entries(keep).forEach(([k,v])=>{if(v!==undefined&&v!=='')rec[k]=v;else delete rec[k];});save();
}
/* ===== end Reset v3.6.1 swap/order hotfix ===== */

/* ===== v3.6.2 history and recurring-item reliability ===== */
function validDateKey(value){return /^\d{4}-\d{2}-\d{2}$/.test(String(value||''))&&!Number.isNaN(parseDateKey(value).getTime())&&todayKey(parseDateKey(value))===value;}
function trackingStartKey(data=state){const explicit=data.settings?.trackingStartDate;if(validDateKey(explicit))return explicit;const created=String(data.meta?.createdAt||todayKey()).slice(0,10);return validDateKey(created)?created:todayKey();}
function isTrackedDate(date,data=state){const key=typeof date==='string'?date:todayKey(date);return validDateKey(key)&&key>=trackingStartKey(data);}
function appStartDate(){return parseDateKey(trackingStartKey());}
function rawItemsForDate(data,date,options={}){
  const key=todayKey(date),rec=data.records?.[key]||{},dow=date.getDay();
  const apply=item=>options.ignoreOverrides?item:{...item,...(rec.timeOverrides?.[occurrenceKey(item)]||{})};
  const recurring=(data.schedule||[]).filter(x=>x.active!==false&&Array.isArray(x.days)&&x.days.includes(dow)&&dateInRange(key,x)).map(x=>apply({...x,source:'schedule',date:key}));
  const oneOff=(data.oneOffTasks||[]).filter(x=>x.date===key).map(x=>apply({...x,source:'oneoff'}));
  const ids=new Set([...recurring,...oneOff].map(occurrenceKey));
  const retained=(rec.retainedItems||[]).filter(x=>!ids.has(occurrenceKey(x))).map(apply);
  return [...recurring,...oneOff,...retained].sort((a,b)=>itemSortMinutes(a)-itemSortMinutes(b)||String(a.title).localeCompare(String(b.title)));
}
function itemsForDate(date,options={}){
  const key=todayKey(date);if(!isTrackedDate(key))return [];
  const rec=state.records[key],snapshot=rec?.daySnapshot;
  if(key<todayKey()&&Array.isArray(snapshot?.items)){
    const excluded=new Set(rec.historyExcluded||[]),list=options.ignoreOverrides?(snapshot.baseItems||snapshot.items):snapshot.items;
    return list.filter(x=>!excluded.has(occurrenceKey(x))).map(x=>({...x}));
  }
  return rawItemsForDate(state,date,options);
}
function progressCounts(items,rec={}){
  const counts={total:0,done:0,mealTotal:0,mealsDone:0,classTotal:0,classDone:0,gymDone:false};
  for(const item of items){
    if(!itemIncludedForMode(item,rec.mode||'normal'))continue;
    const status=rec.itemStatus?.[occurrenceKey(item)]||'pending';if(status==='cancelled')continue;
    if(itemCountsForProgress(item)){counts.total++;if(status==='done')counts.done++;}
    if(item.category==='Food'){counts.mealTotal++;if(status==='done')counts.mealsDone++;}
    if(item.isClass){counts.classTotal++;if(status==='done')counts.classDone++;}
    if(item.category==='Fitness'&&/gym/i.test(item.title||'')&&status==='done')counts.gymDone=true;
  }
  return counts;
}
function addCounts(a,b){const result={...a};for(const key of ['total','done','mealTotal','mealsDone','classTotal','classDone'])result[key]=Number(a[key]||0)+Number(b[key]||0);result.gymDone=!!(a.gymDone||b.gymDone);return result;}
function summarizeHistoricalDay(data,key){
  const rec=data.records[key],excluded=new Set(rec.historyExcluded||[]);
  const counts=addCounts(progressCounts(rec.daySnapshot.items.filter(x=>!excluded.has(occurrenceKey(x))),rec),rec.redactedProgress||{});
  rec.summaryStatusSignature=historicalStatusSignature(rec);
  rec.completionSummary={...counts,percent:counts.total?Math.round(counts.done/counts.total*100):0,mealsComplete:counts.mealTotal>=3&&counts.mealTotal===counts.mealsDone};
  return rec.completionSummary;
}
function historicalStatusSignature(rec){return JSON.stringify([(rec.daySnapshot?.items||[]).map(x=>[occurrenceKey(x),rec.itemStatus?.[occurrenceKey(x)]||'pending']),rec.historyExcluded||[],rec.redactedProgress||{}]);}
function refreshHistoricalSummaries(){for(const [key,rec]of Object.entries(state.records))if(key<todayKey()&&isTrackedDate(key)&&rec.daySnapshot&&historicalStatusSignature(rec)!==rec.summaryStatusSignature)summarizeHistoricalDay(state,key);}
function sealPastDays(data=state){
  const end=todayKey(addDays(new Date(),-1)),start=trackingStartKey(data);
  if(start>end||data.meta?.historySealedThrough===end)return;
  data.meta??={};data.records??={};
  for(const date of datesBetween(parseDateKey(start),parseDateKey(end))){
    const key=todayKey(date);let rec=data.records[key];
    if(!rec)rec=data.records[key]={itemStatus:{},timeOverrides:{},mode:'normal',resetCount:0};
    if(!Array.isArray(rec.daySnapshot?.items)){
      rec.daySnapshot={version:1,capturedAt:new Date().toISOString(),items:rawItemsForDate(data,date),baseItems:rawItemsForDate(data,date,{ignoreOverrides:true})};
      summarizeHistoricalDay(data,key);
    }else if(!rec.completionSummary)summarizeHistoricalDay(data,key);
  }
  data.meta.historySealedThrough=end;
}
function dayCompletion(date){
  const key=todayKey(date);if(!isTrackedDate(key))return 0;
  const rec=state.records[key];if(key<todayKey()&&rec?.completionSummary)return Number(rec.completionSummary.percent||0);
  const counts=progressCounts(itemsForDate(date),rec);return counts.total?Math.round(counts.done/counts.total*100):0;
}
function requestedOctoberRepair(data){
  if(data.meta?.october2026RepairApplied)return;
  const target=data.schedule.find(x=>x.id==='catch_tue'&&x.title==='University catch-up');
  if(String(data.meta?.createdAt||'').slice(0,10)!=='2026-10-17'||!target||!data.records['2026-10-17']||!data.records['2026-10-19'])return;
  const alias={catch_mon:'catch_tue',catch_wed:'catch_tue',catch_thu:'catch_tue',catch_fri:'catch_tue',catch_sun:'catch_tue',outside_mon:'outside'};
  const old=data.schedule.filter(x=>alias[x.id]);
  target.days=[...new Set([...target.days,...old.filter(x=>alias[x.id]==='catch_tue').flatMap(x=>x.days||[])])].sort();
  const rank={pending:0,missed:1,dropped:2,deferred:3,cancelled:4,done:5};
  for(const [key,rec]of Object.entries(data.records)){
    if(key<'2026-10-17')continue;rec.itemStatus??={};rec.timeOverrides??={};
    for(const [from,to]of Object.entries(alias)){
      const a='s:'+from,b='s:'+to,status=rec.itemStatus[a];
      if(status&&(rank[status]??0)>(rank[rec.itemStatus[b]]??-1))rec.itemStatus[b]=status;
      if(rec.timeOverrides[a]&&!rec.timeOverrides[b])rec.timeOverrides[b]=rec.timeOverrides[a];
      delete rec.itemStatus[a];delete rec.timeOverrides[a];
      if(rec.completedAt?.[a]){rec.completedAt[b]??=rec.completedAt[a];delete rec.completedAt[a];}
      for(const field of ['manualOrder','unscheduledItems','autoMissedByWake'])if(Array.isArray(rec[field]))rec[field]=[...new Set(rec[field].map(x=>x===a?b:x))];
      for(const list of [rec.daySnapshot?.items,rec.daySnapshot?.baseItems])if(Array.isArray(list)){
        const replacement=data.schedule.find(x=>x.id===to),seen=new Set();
        const mapped=list.map(x=>x.source==='schedule'&&x.id===from?{...x,id:to,title:replacement?.title||x.title}:x).filter(x=>{const k=occurrenceKey(x);if(seen.has(k))return false;seen.add(k);return true;});list.splice(0,list.length,...mapped);
      }
    }
  }
  data.schedule=data.schedule.filter(x=>!alias[x.id]);
  data.deletedRecurringIds=[...new Set([...(data.deletedRecurringIds||[]),...Object.keys(alias)])];
  for(const [key,ids]of Object.entries({'2026-10-17':['catch_tue','sat_reset'],'2026-10-18':['catch_tue'],'2026-10-19':['outside','mobility']})){
    const rec=data.records[key];if(rec)for(const id of ids)rec.itemStatus['s:'+id]='done';
  }
  data.settings.trackingStartDate='2026-10-17';
  data.meta.october2026RepairApplied=true;
}
function migrateState(parsed){
  if(!parsed||typeof parsed!=='object'||!Array.isArray(parsed.schedule)||!parsed.records||typeof parsed.records!=='object'||Array.isArray(parsed.records)||!parsed.profile||!parsed.money||!parsed.gym)throw new Error('Invalid Reset backup');
  // Recent versions already have a complete schema. Preserve their unrelated records exactly.
  const next=Number(parsed.version||0)>=16?deepClone(parsed):migrateLegacyState(deepClone(parsed));
  next.meta??={};next.settings??={};next.records??={};next.oneOffTasks??=[];next.recurringArchive??=[];next.deletedRecurringIds??=[];
  next.settings.trackingStartDate=trackingStartKey(next);
  if(Number(parsed.version||0)<17)requestedOctoberRepair(next);
  const deleted=new Set(next.deletedRecurringIds);next.schedule=next.schedule.filter(x=>!deleted.has(x.id));
  ensureGymSessionState(next.gym);ensureSalaryPeriods(next);next.version=APP_VERSION;delete next.meta.historySealedThrough;sealPastDays(next);return next;
}
function dayAttentionDetails(date){if(!isTrackedDate(date)||todayKey(date)<todayKey())return [];return dayAttentionDetailsLive(date);}
function dayPlanStatus(date){if(!isTrackedDate(date))return {label:'Not tracked',tone:'untracked',icon:'calendar'};return dayPlanStatusLegacy(date);}
function perfectWeeksCount(){
  let count=0;for(let start=startOfWeek(appStartDate());todayKey(start)<=todayKey();start=addDays(start,7)){
    const days=Array.from({length:7},(_,i)=>addDays(start,i)).filter(d=>isTrackedDate(d));
    if(!days.length||todayKey(addDays(start,6))>todayKey())continue;
    if(days.every(d=>dayCompletion(d)===100))count++;
  }return count;
}
function mealDayIsComplete(date){const key=todayKey(date),summary=state.records[key]?.completionSummary;if(key<todayKey()&&summary)return !!summary.mealsComplete;return mealDayIsCompleteLive(date);}
function pastClassOccurrences(dates){
  const out=[];for(const date of dates){const key=todayKey(date);if(!isTrackedDate(key))continue;const summary=state.records[key]?.completionSummary;
    if(key<todayKey()&&summary){for(let i=0;i<summary.classTotal;i++)out.push({date,key,item:{id:'daily-class-total',category:'University',isClass:true},done:i<summary.classDone});}
    else out.push(...pastClassOccurrencesLive([date]));
  }return out;
}
function perfectClassDaysCount(){return dateRange('all').filter(date=>{const classes=pastClassOccurrences([date]);return classes.length&&classes.every(x=>x.done);}).length;}
function gymSessionDates(){
  const result=new Set((state.gym.sessions||[]).map(String));
  for(const log of state.gym.logs||[])if(log.date&&gymWorkingSets(log).length)result.add(log.date);
  for(const [key,rec]of Object.entries(state.records)){
    if(rec.completionSummary){if(rec.completionSummary.gymDone)result.add(key);continue;}
    if(!Object.values(rec.itemStatus||{}).includes('done'))continue;
    if(itemsForDate(parseDateKey(key)).some(x=>x.category==='Fitness'&&/gym/i.test(x.title||'')&&getStatus(x,key)==='done'))result.add(key);
  }
  for(const key of state.gym.sessionExcluded||[])result.delete(key);return result;
}

function mutationSnapshot(){return deepClone({schedule:state.schedule,records:state.records,oneOffTasks:state.oneOffTasks,recurringArchive:state.recurringArchive,deletedRecurringIds:state.deletedRecurringIds,profile:state.profile});}
function dataEqual(a,b){return JSON.stringify(a)===JSON.stringify(b);}
function undoMutation(before,after){
  function restore(target,a,b){for(const key of new Set([...Object.keys(a||{}),...Object.keys(b||{})])){
    if(dataEqual(a?.[key],b?.[key]))continue;
    if(dataEqual(target[key],b?.[key])){if(a&&Object.hasOwn(a,key))target[key]=deepClone(a[key]);else delete target[key];}
    else if(target[key]&&a?.[key]&&b?.[key]&&typeof target[key]==='object'&&!Array.isArray(target[key])&&!Array.isArray(a[key])&&!Array.isArray(b[key]))restore(target[key],a[key],b[key]);
  }}restore(state,before,after);save();render();toast('Change undone');
}
function keepCompletedOccurrence(item){const key=todayKey(),rec=state.records[key];if(!rec||rec.itemStatus?.['s:'+item.id]!=='done')return;const current=rawItemsForDate(state,new Date()).find(x=>x.source==='schedule'&&x.id===item.id);if(current){rec.retainedItems??=[];if(!rec.retainedItems.some(x=>occurrenceKey(x)==='s:'+item.id))rec.retainedItems.push(deepClone(current));}}
function finishRoutineMutation(){const hadParent=routineManagerReturnDay!==null;returnToRoutineManager();if(!hadParent)render();}
function changeRecurringActive(id,active){
  const item=state.schedule.find(x=>x.id===id);if(!item||isDayAnchor(item))return toast('Wake and Sleep remain daily anchors');
  sealPastDays();const before=mutationSnapshot();createSafetySnapshot('Before changing recurring availability');if(!active)keepCompletedOccurrence(item);item.active=active;const after=mutationSnapshot();save();finishRoutineMutation();toast(active?'Recurring item resumed':'Recurring item paused','Undo',()=>undoMutation(before,after));
}
function duplicateRecurringItem(id){const item=state.schedule.find(x=>x.id===id);if(!item||isDayAnchor(item))return;openScheduleItemModal(null,{...deepClone(item),title:item.title+' (copy)',fixed:itemIsFixed(item)});}
function deleteRecurringItem(id,deleteHistory=false){
  const item=state.schedule.find(x=>x.id===id);if(!item||isDayAnchor(item))return false;
  sealPastDays();const before=mutationSnapshot();createSafetySnapshot('Before deleting recurring item');const occ='s:'+id;
  if(!deleteHistory){keepCompletedOccurrence(item);state.recurringArchive??=[];state.recurringArchive=state.recurringArchive.filter(x=>x.id!==id);state.recurringArchive.push({...deepClone(item),removedAt:new Date().toISOString()});
    for(const [key,rec]of Object.entries(state.records))if(key>=todayKey()){
      if(rec.itemStatus?.[occ]==='done'){
        const retained=rawItemsForDate(state,parseDateKey(key)).find(x=>occurrenceKey(x)===occ)||{...deepClone(item),source:'schedule',date:key};
        rec.retainedItems??=[];if(!rec.retainedItems.some(x=>occurrenceKey(x)===occ))rec.retainedItems.push(retained);
      }else{if(rec.itemStatus)delete rec.itemStatus[occ];if(rec.timeOverrides)delete rec.timeOverrides[occ];}
      for(const field of ['manualOrder','unscheduledItems','autoMissedByWake'])if(Array.isArray(rec[field]))rec[field]=rec[field].filter(x=>x!==occ);
      if(!rec.unscheduledItems?.length)rec.schedulerAttention=[];
    }
  }
  else{
    const removed=new Set([occ]);let changed=true;
    while(changed){changed=false;for(const task of state.oneOffTasks)if(removed.has(task.movedFrom?.occurrence)&&!removed.has('o:'+task.id)){removed.add('o:'+task.id);changed=true;}}
    state.oneOffTasks=state.oneOffTasks.filter(x=>!removed.has('o:'+x.id));
    for(const [key,rec]of Object.entries(state.records)){
      if(rec.daySnapshot?.items){const erased=rec.daySnapshot.items.filter(x=>removed.has(occurrenceKey(x))&&!(rec.historyExcluded||[]).includes(occurrenceKey(x)));rec.redactedProgress=addCounts(rec.redactedProgress||{},progressCounts(erased,rec));}
      for(const field of ['items','baseItems'])if(Array.isArray(rec.daySnapshot?.[field]))rec.daySnapshot[field]=rec.daySnapshot[field].filter(x=>!removed.has(occurrenceKey(x)));
      if(Array.isArray(rec.retainedItems))rec.retainedItems=rec.retainedItems.filter(x=>!removed.has(occurrenceKey(x)));
      for(const field of ['itemStatus','timeOverrides','completedAt'])if(rec[field])for(const key of removed)delete rec[field][key];
      for(const field of ['manualOrder','unscheduledItems','autoMissedByWake','historyExcluded'])if(Array.isArray(rec[field]))rec[field]=rec[field].filter(x=>!removed.has(x));
      if(rec.lastRebuildSummary){
        const summary=rec.lastRebuildSummary;summary.moved=summary.moved.filter(x=>!removed.has(x.occurrence));
        const kept=(summary.unplacedOccurrences||[]).map((x,index)=>({x,index})).filter(row=>!removed.has(row.x));
        summary.unplaced=kept.map(row=>summary.unplaced[row.index]);summary.unplacedOccurrences=kept.map(row=>row.x);
      }
      if(!rec.unscheduledItems?.length)rec.schedulerAttention=[];
      if(key<todayKey()&&rec.daySnapshot)summarizeHistoricalDay(state,key);
    }
    state.recurringArchive=(state.recurringArchive||[]).filter(x=>x.id!==id);
  }
  state.schedule=state.schedule.filter(x=>x.id!==id);state.deletedRecurringIds=[...new Set([...(state.deletedRecurringIds||[]),id])];
  const after=mutationSnapshot();save();finishRoutineMutation();toast(deleteHistory?'Item history removed. Past completion preserved.':'Recurring item removed. History kept.','Undo',()=>undoMutation(before,after));return true;
}
function openRecurringDeleteChoice(id){
  const item=state.schedule.find(x=>x.id===id);if(!item||isDayAnchor(item))return;
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">REMOVE RECURRING ITEM</p><h2>${escapeHTML(item.title)}</h2><p>Choose what to keep. Both options stop future occurrences.</p><button class="secondary full" id="deleteKeepHistory"><b>Keep its history</b><small class="field-help">Past entries and completions remain.</small></button><button class="danger-btn full" id="deleteFullHistory" style="margin-top:10px"><b>Delete its task history too</b><small class="field-help">Remove past task entries. Daily completion totals, achievements and other app logs stay.</small></button><button class="secondary full" id="cancelModal" style="margin-top:10px">Cancel</button>`;
  openAppSheet(modal);$('#deleteKeepHistory').onclick=()=>deleteRecurringItem(id,false);$('#deleteFullHistory').onclick=()=>deleteRecurringItem(id,true);$('#cancelModal').onclick=()=>openScheduleItemModal(id);sheetScrollState.onDismiss=()=>openScheduleItemModal(id);
}
function openScheduleItemModal(id=null,preset={}){
  openScheduleItemModalBase(id,preset);
  const existing=id?state.schedule.find(x=>x.id===id):null,saveButton=$('#saveSchedule'),saveOriginal=saveButton.onclick;
  const error=document.createElement('p');error.id='recurringFormError';error.className='form-error';error.setAttribute('role','alert');modalContent.appendChild(error);
  const submit=()=>{
    if(!$('#schedTitle').value.trim()){error.textContent='Enter a title.';return;}
    const start=$('#schedStart').value,end=$('#schedEnd').value;
    if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(start)||(!isDayAnchor(existing)&&(!/^([01]\d|2[0-3]):[0-5]\d$/.test(end)||minutesFromTime(end)<=minutesFromTime(start)))){error.textContent='Choose a valid start and an end after it.';return;}
    if(!$$('[data-repeat-day]',modalContent).some(x=>x.checked)){error.textContent='Choose at least one repeat day.';return;}
    if($('#schedStartDate').value&&$('#schedEndDate').value&&$('#schedEndDate').value<$('#schedStartDate').value){error.textContent='The end date must be on or after the start date.';return;}
    sealPastDays();const before=mutationSnapshot();saveOriginal();
    if($('#schedTitle',modalContent))return;
    const after=mutationSnapshot();toast('Recurring item saved. Past days are protected.','Undo',()=>undoMutation(before,after));
  };saveButton.onclick=submit;
  if(existing&&!isDayAnchor(existing)){
    $('#deleteSchedule').onclick=()=>openRecurringDeleteChoice(id);
    const controls=document.createElement('div');controls.className='recurring-extra-actions';controls.innerHTML=`<button class="secondary full" id="toggleRecurringActive">${existing.active===false?'Resume':'Pause'} recurring item</button><button class="secondary full" id="duplicateRecurring">Duplicate item</button>`;modalContent.appendChild(controls);
    $('#toggleRecurringActive').onclick=()=>changeRecurringActive(id,existing.active===false);$('#duplicateRecurring').onclick=()=>duplicateRecurringItem(id);
  }
}
var routineAllView={open:false,query:'',filter:'all',sort:'name'};
function attachAllRecurringItems(selectedDay){
  const details=document.createElement('details');details.id='allRecurringItems';details.className='all-recurring';details.open=routineAllView.open;
  details.innerHTML=`<summary>All recurring items <span>${state.schedule.length}</span></summary><div class="all-recurring-controls"><input class="input" id="recurringSearch" type="search" aria-label="Search all recurring items" placeholder="Search every recurring item"><div class="form-grid"><select id="recurringFilter" aria-label="Filter recurring items"><option value="all">All items</option><option value="active">Active</option><option value="paused">Paused</option><option value="fixed">Fixed / anchors</option><option value="flexible">Flexible</option></select><select id="recurringSort" aria-label="Sort recurring items"><option value="name">By name</option><option value="time">By time</option></select></div><div id="allRecurringResults"></div><button class="primary full" id="allRecurringAdd">Add recurring item</button></div>`;modalContent.appendChild(details);
  const search=$('#recurringSearch'),filter=$('#recurringFilter'),sort=$('#recurringSort');search.value=routineAllView.query;filter.value=routineAllView.filter;sort.value=routineAllView.sort;
  const remember=()=>{routineAllView.open=true;routineManagerReturnDay=selectedDay;routineManagerReturnScroll=modalContent.scrollTop;};
  const draw=()=>{const query=search.value.trim().toLowerCase();let list=state.schedule.filter(x=>(!query||[x.title,x.category,x.detail].join(' ').toLowerCase().includes(query))&&(filter.value==='all'||(filter.value==='active'&&x.active!==false)||(filter.value==='paused'&&x.active===false)||(filter.value==='fixed'&&itemIsFixed(x))||(filter.value==='flexible'&&!itemIsFixed(x))));
    list.sort(sort.value==='time'?(a,b)=>minutesFromTime(a.start)-minutesFromTime(b.start):(a,b)=>a.title.localeCompare(b.title));
    $('#allRecurringResults').innerHTML=list.length?list.map(item=>`<div class="all-recurring-row"><button type="button" data-all-edit="${escapeAttr(item.id)}"><b>${escapeHTML(item.title)}</b><small>${escapeHTML(timeWindow(item))} · ${(item.days||[]).map(dayShort).join(', ')} · ${escapeHTML(item.category||'Routine')} · ${item.active===false?'Paused':itemIsFixed(item)?'Fixed':'Flexible'}</small></button>${!isDayAnchor(item)?`<div><button class="text-button" data-all-toggle="${escapeAttr(item.id)}">${item.active===false?'Resume':'Pause'}</button><button class="text-button" data-all-copy="${escapeAttr(item.id)}">Duplicate</button><button class="text-button danger-text" data-all-delete="${escapeAttr(item.id)}">Remove</button></div>`:''}</div>`).join(''):'<p class="empty-state">No matching recurring items.</p>';
    $$('[data-all-edit]',details).forEach(b=>b.onclick=()=>{remember();openScheduleItemModal(b.dataset.allEdit);});
    $$('[data-all-toggle]',details).forEach(b=>b.onclick=()=>{remember();const item=state.schedule.find(x=>x.id===b.dataset.allToggle);changeRecurringActive(item.id,item.active===false);});
    $$('[data-all-copy]',details).forEach(b=>b.onclick=()=>{remember();duplicateRecurringItem(b.dataset.allCopy);});
    $$('[data-all-delete]',details).forEach(b=>b.onclick=()=>{remember();openRecurringDeleteChoice(b.dataset.allDelete);});
  };
  const refresh=()=>{routineAllView.query=search.value;routineAllView.filter=filter.value;routineAllView.sort=sort.value;draw();};search.oninput=refresh;filter.onchange=refresh;sort.onchange=refresh;details.addEventListener('toggle',()=>{routineAllView.open=details.open;});$('#allRecurringAdd').onclick=()=>{remember();openScheduleItemModal(null,{days:[selectedDay]});};draw();
}
function openHistoryDayEditor(date){
  const key=todayKey(date);if(!isTrackedDate(key)||key>=todayKey())return;
  sealPastDays();const rec=ensureRecord(key),all=rec.daySnapshot.items;
  prepareModalView();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">CORRECT PAST DAY</p><h2>${escapeHTML(formatDateShort(date))}</h2><p>Correct only this date. Exclude items that did not belong to this day. Actual sleep/wake logs and other app records stay unchanged.</p><div class="history-correction-list">${all.map(item=>{const value=(rec.historyExcluded||[]).includes(occurrenceKey(item))?'exclude':getStatus(item,key);return `<label><b>${escapeHTML(item.title)}</b><small>${escapeHTML(timeWindow(item))}</small><select data-history-status="${escapeAttr(occurrenceKey(item))}">${[['done','Complete'],['pending','Incomplete'],['missed','Missed'],['cancelled','Cancelled'],['deferred','Moved to another day'],['dropped','Dropped'],['exclude','Did not belong to this day']].map(([id,label])=>`<option value="${id}" ${id===value?'selected':''}>${label}</option>`).join('')}</select></label>`;}).join('')}</div><button class="primary full" id="saveHistoryCorrection">Save corrections</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  openAppSheet(modal);$('#saveHistoryCorrection').onclick=()=>{const before=deepClone(rec);createSafetySnapshot('Before correcting past day');rec.historyExcluded=[];$$('[data-history-status]',modalContent).forEach(select=>{const occ=select.dataset.historyStatus;if(select.value==='exclude')rec.historyExcluded.push(occ);else if(select.value==='pending')delete rec.itemStatus[occ];else rec.itemStatus[occ]=select.value;});rec.historyCorrectedAt=new Date().toISOString();summarizeHistoricalDay(state,key);save();closeAppSheet(modal);renderWeek();toast('Past day corrected','Undo',()=>restoreDaySnapshot(key,before));};$('#cancelModal').onclick=()=>closeAppSheet(modal);
}
function renderWeek(){
  renderWeekBase();const key=state.settings.selectedWeekDate||todayKey(),date=parseDateKey(key);
  $$('[data-day-key]').forEach(button=>{if(!isTrackedDate(button.dataset.dayKey))button.classList.add('not-tracked');});
  const trackedDays=Array.from({length:7},(_,i)=>addDays(startOfWeek(date),i)).filter(d=>isTrackedDate(d));
  const count=$('[data-week-summary="complete"] b');if(count)count.textContent=`${trackedDays.filter(d=>todayKey(d)<=todayKey()&&dayCompletion(d)===100).length} / ${trackedDays.length}`;
  if(!isTrackedDate(key)){const selected=$('.week-selected-card');if(selected)selected.innerHTML=`<div class="week-selected-head"><div><small>${dayLong(date.getDay()).toUpperCase()}</small><h2>${formatDateShort(date)}</h2></div><span class="week-status-pill untracked">Not tracked</span></div><p class="muted">Tracking starts on ${formatDateShort(appStartDate())} ${appStartDate().getFullYear()}.</p>`;}
  else if(key<todayKey()){
    const selected=$('.week-selected-card'),button=document.createElement('button');button.id='correctPastDay';button.className='secondary full';button.textContent='Correct this past day';button.onclick=()=>openHistoryDayEditor(date);selected.appendChild(button);
  }
  const summary=state.records[key]?.lastRebuildSummary;if(summary){const selected=$('.week-selected-card'),details=document.createElement('details');details.className='rebuild-results';details.innerHTML=`<summary>Last rebuild: ${summary.moved.length} moved · ${summary.unplaced.length} could not fit</summary><p>${summary.fixed} fixed events kept their times.</p>${summary.moved.map(x=>`<div>${escapeHTML(x.title)} · ${escapeHTML(formatClock(x.start))}</div>`).join('')}${summary.unplaced.map(x=>`<p class="form-error">${escapeHTML(x)} could not fit before sleep.</p>`).join('')}`;selected.appendChild(details);}
}
function recordRebuildSummary(plan){const rec=ensureRecord(plan.key);rec.lastRebuildSummary={at:new Date().toISOString(),moved:plan.moved.map(x=>({occurrence:occurrenceKey(x),title:x.title,start:x.start})),unplaced:plan.unplaced.map(x=>x.title),unplacedOccurrences:plan.unplaced.map(occurrenceKey),fixed:itemsForDate(parseDateKey(plan.key)).filter(x=>!isDayAnchor(x)&&itemIsFixed(x)&&getStatus(x,plan.key)!=='cancelled').length};}
function setStatus(item,key,status){
  const rec=ensureRecord(key),occ=occurrenceKey(item);
  if(status==='pending'){delete rec.itemStatus[occ];rec.finishCelebrated='';if(rec.completedAt)delete rec.completedAt[occ];}
  else rec.itemStatus[occ]=status;
  if(status==='done'){
    rec.completedAt??={};rec.completedAt[occ]??=new Date().toISOString();
    rec.unscheduledItems=(rec.unscheduledItems||[]).filter(x=>x!==occ);
    if(!rec.unscheduledItems.length)rec.schedulerAttention=[];
    if(item.category==='Fitness'&&/gym/i.test(item.title||''))state.gym.sessionExcluded=(state.gym.sessionExcluded||[]).filter(k=>k!==key);
  }else if(rec.completedAt)delete rec.completedAt[occ];
  if(key<todayKey()&&rec.daySnapshot)summarizeHistoricalDay(state,key);
  save();
}
function daySnapshot(key){const snapshot=deepClone(ensureRecord(key));Object.defineProperty(snapshot,'__gymExcluded',{value:(state.gym.sessionExcluded||[]).includes(key),enumerable:false});return snapshot;}
function restoreDaySnapshot(key,snapshot){state.records[key]=deepClone(snapshot);if(Object.hasOwn(snapshot,'__gymExcluded')){state.gym.sessionExcluded=(state.gym.sessionExcluded||[]).filter(x=>x!==key);if(snapshot.__gymExcluded)state.gym.sessionExcluded.push(key);}save();render();}
/* ===== End v3.6.2 reliability ===== */


// Update the elapsed label without re-rendering a form or changing its focus/scroll.
setInterval(()=>{const w=state.gym.activeWorkout;if(!w||document.visibilityState==='hidden')return;for(const label of $$('[data-workout-elapsed]'))label.textContent=formatWorkoutDuration(workoutDurationSeconds(w),true);},1000);

initializeSheetScrolling();
initializeApp();
