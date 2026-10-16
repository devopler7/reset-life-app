const APP_KEY = 'reset-life-dashboard-v1';
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const uid = (p='id') => `${p}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`;
const clamp = (n,min,max) => Math.max(min,Math.min(max,n));
const fmtMoney = n => `${Number(n || 0).toLocaleString(undefined,{maximumFractionDigits:0})} SAR`;
const todayKey = (d = new Date()) => {
  const y = d.getFullYear(); const m = String(d.getMonth()+1).padStart(2,'0'); const day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
};
const dayName = d => d.toLocaleDateString(undefined,{weekday:'short'});

const defaultTasks = [
  {id:'wake', title:'Get out of bed', detail:'Target 8:00 AM. No lying in bed with the phone.'},
  {id:'light', title:'Open curtains + daylight', detail:'Get light into the room as soon as you wake.'},
  {id:'groom', title:'Shower + basic grooming', detail:'Teeth, deodorant, hair/beard, clean clothes.'},
  {id:'breakfast', title:'Eat breakfast', detail:'Start the day fed instead of waiting until late.'},
  {id:'class', title:'Attend today’s classes', detail:'Show up even when behind. Current week comes first.'},
  {id:'catchup', title:'University catch-up', detail:'60–90 focused minutes on the highest-priority backlog.'},
  {id:'outside', title:'Leave the house + walk', detail:'At least 30 minutes outside every day.'},
  {id:'training', title:'Training / mobility', detail:'Gym Mon/Wed/Fri. Mobility or extra walking on other days.'},
  {id:'meals', title:'3 proper meals + protein', detail:'Aim for regular meals and roughly 90–110 g protein.'},
  {id:'control', title:'No wasted-hours spiral', detail:'No TikTok. No porn/gooning in bed or after waking.'},
  {id:'phone', title:'Phone away by 11:00 PM', detail:'Charge it away from the bed.'},
  {id:'sleep', title:'Lights out by 11:30 PM', detail:'Default target. Protect tomorrow before it starts.'}
];

const defaultState = () => ({
  version: 1,
  profile: { wakeTarget:'08:00', sleepTarget:'23:30' },
  dailyTasks: defaultTasks,
  records: {},
  courses: [
    {id:uid('course'), name:'Production Engineering', currentWeek:1, teachingWeek:10, note:'Update this to your real position.'},
    {id:uid('course'), name:'Reservoir Engineering', currentWeek:1, teachingWeek:10, note:'Update this to your real position.'},
    {id:uid('course'), name:'ENGM2005', currentWeek:1, teachingWeek:10, note:'Update this to your real position.'},
    {id:uid('course'), name:'Systems Engineering', currentWeek:1, teachingWeek:10, note:'Update this to your real position.'}
  ],
  uniTasks: [],
  money: {
    income: 11000,
    currentCash: 16500,
    buckets: [
      {id:uid('bucket'), name:'Rent + bills', target:5000, spent:0},
      {id:uid('bucket'), name:'Food', target:1800, spent:0},
      {id:uid('bucket'), name:'Car', target:700, spent:0},
      {id:uid('bucket'), name:'Travel', target:1000, spent:0},
      {id:uid('bucket'), name:'Invisalign', target:500, spent:0},
      {id:uid('bucket'), name:'Savings', target:1200, spent:0},
      {id:uid('bucket'), name:'Clothes + fun', target:500, spent:0},
      {id:uid('bucket'), name:'Buffer', target:300, spent:0}
    ]
  },
  project: { name:'Life Reset App', sessions:0, note:'Build something meaningful outside university 3 times a week.' },
  weeklyReviews: [],
  settings: { activeTab:'today' }
});

function loadState(){
  try {
    const raw = localStorage.getItem(APP_KEY);
    if(!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return {...defaultState(), ...parsed};
  } catch(e){ return defaultState(); }
}
let state = loadState();
function save(){ localStorage.setItem(APP_KEY, JSON.stringify(state)); }

function ensureRecord(key=todayKey()){
  if(!state.records[key]) state.records[key] = {tasks:{}, resetCount:0, restartAt:null};
  return state.records[key];
}
function completedCount(key=todayKey()){
  const r = ensureRecord(key);
  return state.dailyTasks.filter(t => r.tasks[t.id]).length;
}
function completionPct(key=todayKey()){
  if(!state.records[key]) return 0;
  return Math.round((completedCount(key) / Math.max(1,state.dailyTasks.length))*100);
}
function streak(){
  let count = 0; const d = new Date();
  for(let i=0;i<60;i++){
    const k=todayKey(d); const p=completionPct(k);
    if(p>=70) count++; else if(i===0 && p===0) {} else break;
    d.setDate(d.getDate()-1);
  }
  return count;
}
function toast(msg){
  let el = $('.toast');
  if(!el){ el=document.createElement('div'); el.className='toast'; document.body.appendChild(el); }
  el.textContent=msg; el.classList.add('show'); clearTimeout(window.__toast); window.__toast=setTimeout(()=>el.classList.remove('show'),1800);
}

const main = $('#mainContent');
const pageTitle = $('#pageTitle');
const dateLabel = $('#dateLabel');
const modal = $('#modal');
const modalContent = $('#modalContent');

function setHeader(title){
  pageTitle.textContent=title;
  dateLabel.textContent = new Date().toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric'}).toUpperCase();
}

function render(){
  const tab=state.settings.activeTab || 'today';
  $$('.tab').forEach(b=>b.classList.toggle('active', b.dataset.tab===tab));
  if(tab==='today') renderToday();
  if(tab==='plan') renderPlan();
  if(tab==='university') renderUniversity();
  if(tab==='progress') renderProgress();
  if(tab==='life') renderLife();
  save();
}

function renderToday(){
  setHeader('Today');
  const rec=ensureRecord();
  const done=completedCount(); const total=state.dailyTasks.length; const pct=Math.round(done/total*100);
  const hour=new Date().getHours(); const greeting=hour<12?'Good morning':hour<18?'Good afternoon':'Good evening';
  const restarted = rec.restartAt ? `<div class="badge blue">Restarted ${new Date(rec.restartAt).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'})}</div>` : '';
  main.innerHTML=`
    <section class="card hero">
      <div class="row between center">
        <div>
          <span class="badge">RESET MODE</span>
          <h2 style="margin-top:14px">${greeting}.</h2>
          <p class="muted" style="margin-bottom:12px">Don’t win the whole week. Do the next useful thing.</p>
          <div class="row wrap">${restarted}<span class="badge blue">${streak()} day streak</span></div>
        </div>
        <div class="progress-ring" style="--value:${pct*3.6}deg"><b>${pct}%</b></div>
      </div>
    </section>

    <section class="grid-3">
      <div class="stat"><small>Wake target</small><strong>${formatClock(state.profile.wakeTarget)}</strong></div>
      <div class="stat"><small>Sleep target</small><strong>${formatClock(state.profile.sleepTarget)}</strong></div>
      <div class="stat"><small>Done today</small><strong>${done}/${total}</strong></div>
    </section>

    <div class="section-title"><h2>Today’s reset</h2><button id="editRoutineBtn">Edit</button></div>
    <section class="card flat" id="taskList">
      ${state.dailyTasks.map(t=>taskHTML(t,!!rec.tasks[t.id])).join('')}
    </section>

    <section class="card restart">
      <span class="badge warn">ANTI-COLLAPSE</span>
      <h3 style="margin-top:12px">The day went off track?</h3>
      <p class="muted">Nothing you missed is allowed to block what comes next. Restart from this moment.</p>
      <button class="primary full" id="restartBtn">Restart today</button>
    </section>

    <section class="card flat">
      <div class="row between center"><div><p class="eyebrow">NON-NEGOTIABLE</p><h3 style="margin:0">One rule</h3></div><span class="badge">KEEP MOVING</span></div>
      <div class="rule"><strong>An unfinished task never blocks the next task.</strong><span class="muted tiny">Missed something? Continue the schedule. The day is not cancelled.</span></div>
    </section>`;

  $$('.task .check').forEach(cb=>cb.addEventListener('change', e=>{
    rec.tasks[e.target.dataset.id]=e.target.checked;
    save(); renderToday();
  }));
  $('#restartBtn').addEventListener('click', openRestartModal);
  $('#editRoutineBtn').addEventListener('click', openRoutineModal);
}
function taskHTML(t,done){return `<label class="task ${done?'done':''}"><input class="check" type="checkbox" data-id="${t.id}" ${done?'checked':''}><span class="task-text"><b>${escapeHTML(t.title)}</b><small>${escapeHTML(t.detail||'')}</small></span></label>`}

function renderPlan(){
  setHeader('The Plan');
  main.innerHTML=`
    <section class="card hero">
      <span class="badge">90-DAY RESET</span>
      <h2 style="margin-top:14px">Build a normal, active life.</h2>
      <p class="muted" style="margin-bottom:0">Wake up, get out, show up, train, learn, build something, manage money, then enjoy free time without guilt.</p>
    </section>

    ${planCard('1','Sleep','8:00 AM wake. 11:30 PM sleep. Get out of bed immediately, open the curtains and keep the phone away after waking.')}
    ${planCard('2','Control the time-wasters','No TikTok for the reset period. Twitter/X limited. No porn/gooning in bed or after waking. If an urge starts a spiral, physically leave the room for 10 minutes.')}
    ${planCard('3','University','Attend current classes even while behind. Priority order: current week → upcoming assessments/exams → backlog. Attempt work first, then use AI to explain or check.')}
    ${planCard('4','Body','Gym Monday/Wednesday/Friday. Walk outside daily. 10 minutes mobility. Three proper meals and roughly 90–110 g protein.')}
    ${planCard('5','Money','Split salary immediately into rent/bills, food, car, travel, Invisalign, savings and fun. Eating out becomes occasional instead of default.')}
    ${planCard('6','Environment + grooming','Bedsheets and bathroom weekly. Groom at home. Keep a personal clean plate/bowl/cutlery set. Open blackout curtains during the day.')}
    ${planCard('7','Life outside uni','Work on one personal project 3× a week for 45–60 minutes. One guilt-free evening each week.')}

    <div class="section-title"><h2>Weekly rhythm</h2></div>
    <section class="card flat">
      <ul class="list-clean">
        <li><b>Mon / Wed / Fri</b><br><span class="muted tiny">Gym + normal uni/catch-up.</span></li>
        <li><b>Tue / Thu</b><br><span class="muted tiny">Extra university catch-up + walk.</span></li>
        <li><b>Saturday</b><br><span class="muted tiny">Bathroom, bedsheets, grooming and general reset.</span></li>
        <li><b>Sunday</b><br><span class="muted tiny">Money check, weekly review and next-week plan.</span></li>
      </ul>
    </section>

    <section class="card restart"><h3>Remember</h3><p style="margin:0">You are not trying to become perfect. You are trying to become <b>consistent enough that your life stops collapsing around one bad day.</b></p></section>`;
}
function planCard(n,title,text){return `<section class="card flat"><div class="row"><span class="badge">${n}</span><div><h3>${title}</h3><p class="muted" style="margin:0">${text}</p></div></div></section>`}

function renderUniversity(){
  setHeader('University');
  const openTasks=state.uniTasks.filter(t=>!t.done);
  const urgent=openTasks.filter(t=>t.priority==='Urgent').length;
  main.innerHTML=`
    <section class="card hero">
      <div class="row between center"><div><span class="badge blue">TRIAGE, NOT PANIC</span><h2 style="margin-top:14px">Catch up strategically.</h2><p class="muted" style="margin-bottom:0">Current classes first. Urgent assessment content second. Backlog after that.</p></div></div>
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
      ${['Urgent','Important','Later'].map(p=>uniGroupHTML(p)).join('')}
    </section>`;
  $('#addCourseBtn').addEventListener('click',()=>openCourseModal());
  $('#addUniTaskBtn').addEventListener('click',()=>openUniTaskModal());
  $$('[data-edit-course]').forEach(b=>b.addEventListener('click',()=>openCourseModal(b.dataset.editCourse)));
  $$('[data-uni-task]').forEach(cb=>cb.addEventListener('change',()=>{ const t=state.uniTasks.find(x=>x.id===cb.dataset.uniTask); if(t){t.done=cb.checked; save();renderUniversity();}}));
  $$('[data-del-task]').forEach(b=>b.addEventListener('click',()=>{state.uniTasks=state.uniTasks.filter(t=>t.id!==b.dataset.delTask);save();renderUniversity();}));
}
function courseHTML(c){
  const pct=clamp(Math.round((Number(c.currentWeek)||0)/Math.max(1,Number(c.teachingWeek)||1)*100),0,100);
  return `<article class="course"><div class="course-top"><div><h3>${escapeHTML(c.name)}</h3><span class="muted tiny">Week ${c.currentWeek} of ${c.teachingWeek}</span></div><button class="secondary" style="min-height:34px;padding:0 10px" data-edit-course="${c.id}">Edit</button></div><div class="weekbar"><span style="width:${pct}%"></span></div>${c.note?`<p class="muted tiny" style="margin:9px 0 0">${escapeHTML(c.note)}</p>`:''}</article>`;
}
function uniGroupHTML(priority){
  const items=state.uniTasks.filter(t=>t.priority===priority);
  const badge=priority==='Urgent'?'warn':priority==='Important'?'blue':'';
  return `<div style="margin-bottom:15px"><div class="row between center"><span class="badge ${badge}">${priority.toUpperCase()}</span><span class="muted tiny">${items.filter(x=>!x.done).length} open</span></div><div style="margin-top:7px">${items.length?items.map(t=>`<div class="task ${t.done?'done':''}"><input class="check" type="checkbox" data-uni-task="${t.id}" ${t.done?'checked':''}><span class="task-text"><b>${escapeHTML(t.title)}</b><small>${escapeHTML(t.course||'General')}</small></span><button class="icon-button" style="width:34px;height:34px;border-radius:10px;font-size:15px" data-del-task="${t.id}">×</button></div>`).join(''):`<p class="muted tiny" style="margin:10px 0">Nothing here yet.</p>`}</div></div>`;
}

function renderProgress(){
  setHeader('Progress');
  const days=[]; const d=new Date();
  for(let i=6;i>=0;i--){ const x=new Date(d); x.setDate(d.getDate()-i); days.push({date:x,key:todayKey(x),pct:completionPct(todayKey(x))}); }
  const avg=Math.round(days.reduce((a,b)=>a+b.pct,0)/7);
  const totalResets=Object.values(state.records).reduce((a,r)=>a+(r.resetCount||0),0);
  main.innerHTML=`
    <section class="card hero">
      <span class="badge">PROGRESS, NOT PERFECTION</span>
      <h2 style="margin-top:14px">${avg}% weekly average</h2>
      <p class="muted" style="margin-bottom:0">A 70% day counts as a solid day. You do not need a perfect streak.</p>
    </section>
    <section class="grid-3"><div class="stat"><small>Current streak</small><strong>${streak()}</strong></div><div class="stat"><small>7-day avg</small><strong>${avg}%</strong></div><div class="stat"><small>Restarts used</small><strong>${totalResets}</strong></div></section>
    <div class="section-title"><h2>Last 7 days</h2></div>
    <section class="card flat"><div class="day-grid">${days.map(x=>`<div class="day"><div class="bubble ${x.pct>=70?'good':''}">${x.pct}%</div><small>${dayName(x.date)}</small></div>`).join('')}</div></section>
    <div class="section-title"><h2>Habit completion</h2></div>
    <section class="card flat">${state.dailyTasks.map(t=>habitBar(t,days)).join('')}</section>
    <section class="card restart"><h3>Your success threshold</h3><p class="muted" style="margin-bottom:0">If you do roughly <b>70% of the plan consistently</b>, your life will look completely different from the current cycle. Don’t turn 95% into the minimum.</p></section>`;
}
function habitBar(t,days){const n=days.filter(d=>state.records[d.key]?.tasks?.[t.id]).length;const pct=Math.round(n/7*100);return `<div class="bar-row"><span>${escapeHTML(shorten(t.title,12))}</span><div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div><b>${n}/7</b></div>`}

function renderLife(){
  setHeader('Life');
  const totalTarget=state.money.buckets.reduce((a,b)=>a+Number(b.target||0),0);
  const totalSpent=state.money.buckets.reduce((a,b)=>a+Number(b.spent||0),0);
  const remaining=Number(state.money.income||0)-totalSpent;
  main.innerHTML=`
    <section class="card hero">
      <span class="badge blue">LIFE OUTSIDE CLASS</span>
      <h2 style="margin-top:14px">Build the rest of your life too.</h2>
      <p class="muted" style="margin-bottom:0">Money, health, grooming, your environment and a personal project all live here.</p>
    </section>

    <div class="section-title"><h2>Money</h2><button id="editMoneyBtn">Edit</button></div>
    <section class="card flat">
      <div class="grid-2"><div class="stat"><small>Monthly income</small><strong>${fmtMoney(state.money.income)}</strong></div><div class="stat"><small>Current cash</small><strong>${fmtMoney(state.money.currentCash)}</strong></div></div>
      <hr>
      ${state.money.buckets.map(b=>`<div class="money-row"><div><b>${escapeHTML(b.name)}</b><div class="muted tiny">Target ${fmtMoney(b.target)} · Spent ${fmtMoney(b.spent)}</div></div><b>${fmtMoney(Math.max(0,Number(b.target)-Number(b.spent)))}</b></div>`).join('')}
      <hr><div class="money-row"><div><b>Planned buckets</b><div class="muted tiny">Keep the plan at or below income.</div></div><b class="${totalTarget>state.money.income?'':'accent'}">${fmtMoney(totalTarget)}</b></div>
      <div class="money-row"><div><b>Income left after logged spending</b></div><b>${fmtMoney(remaining)}</b></div>
    </section>

    <div class="section-title"><h2>Personal project</h2></div>
    <section class="card flat"><div class="row between center"><div><h3>${escapeHTML(state.project.name)}</h3><p class="muted tiny" style="margin:0">${escapeHTML(state.project.note)}</p></div><div class="stat" style="text-align:center"><small>Sessions</small><strong>${state.project.sessions}</strong></div></div><button class="primary full" id="projectSessionBtn" style="margin-top:14px">+ Log a 45–60 min session</button></section>

    <div class="section-title"><h2>Weekly maintenance</h2></div>
    <section class="card flat"><ul class="list-clean"><li><b>Saturday</b><br><span class="muted tiny">Bedsheets, bathroom, grooming and general reset.</span></li><li><b>Sunday</b><br><span class="muted tiny">Money check, plan the week and review what slipped.</span></li><li><b>Every day</b><br><span class="muted tiny">Leave the house, eat properly and get some daylight.</span></li></ul><button class="secondary full" id="weeklyReviewBtn" style="margin-top:14px">Do weekly reset</button></section>

    <div class="section-title"><h2>Recent weekly reviews</h2></div>
    <section class="card flat">${state.weeklyReviews.length?state.weeklyReviews.slice().reverse().slice(0,3).map(r=>`<div style="padding:10px 0;border-bottom:1px solid var(--line)"><div class="row between"><b>${escapeHTML(r.date)}</b><span class="badge">${r.rating}/10</span></div><p class="muted tiny" style="margin:6px 0 0">Next focus: ${escapeHTML(r.focus||'—')}</p></div>`).join(''):'<p class="muted" style="margin:0">No weekly review yet.</p>'}</section>`;
  $('#editMoneyBtn').addEventListener('click',openMoneyModal);
  $('#projectSessionBtn').addEventListener('click',()=>{state.project.sessions=(state.project.sessions||0)+1;save();toast('Project session logged');renderLife();});
  $('#weeklyReviewBtn').addEventListener('click',openWeeklyReviewModal);
}

function openRestartModal(){
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">RESTART TODAY</p><h2>Start again from now.</h2><p class="muted">Completed tasks stay completed. Missed tasks stop carrying guilt. Pick the next useful action and continue.</p><button class="primary full" id="confirmRestart">Restart from this moment</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#confirmRestart').onclick=()=>{const r=ensureRecord();r.resetCount=(r.resetCount||0)+1;r.restartAt=new Date().toISOString();save();modal.close();toast('Day restarted');renderToday();};
  $('#cancelModal').onclick=()=>modal.close();
}
function openRoutineModal(){
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">ROUTINE</p><h2>Edit targets</h2><div class="form-grid"><label><span class="label">Wake target</span><input class="input" id="wakeInput" type="time" value="${state.profile.wakeTarget}"></label><label><span class="label">Sleep target</span><input class="input" id="sleepInput" type="time" value="${state.profile.sleepTarget}"></label></div><hr><p class="muted tiny">The core checklist is intentionally fixed so you don’t spend more time designing the system than living it.</p><button class="primary full" id="saveRoutine">Save</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal(); $('#saveRoutine').onclick=()=>{state.profile.wakeTarget=$('#wakeInput').value||'08:00';state.profile.sleepTarget=$('#sleepInput').value||'23:30';save();modal.close();renderToday();}; $('#cancelModal').onclick=()=>modal.close();
}
function openCourseModal(id=null){
  const c=id?state.courses.find(x=>x.id===id):null;
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">UNIVERSITY</p><h2>${c?'Edit course':'Add course'}</h2><div class="stack"><label><span class="label">Course name</span><input class="input" id="courseName" value="${c?escapeAttr(c.name):''}" placeholder="e.g. Production Engineering"></label><div class="form-grid"><label><span class="label">You are at week</span><input class="input" id="courseCurrent" type="number" min="0" value="${c?c.currentWeek:1}"></label><label><span class="label">Teaching week</span><input class="input" id="courseTeaching" type="number" min="1" value="${c?c.teachingWeek:10}"></label></div><label><span class="label">Note</span><input class="input" id="courseNote" value="${c?escapeAttr(c.note||''):''}" placeholder="What is blocking you?"></label></div><button class="primary full" id="saveCourse" style="margin-top:14px">Save course</button>${c?'<button class="danger-btn full" id="deleteCourse" style="margin-top:8px">Delete course</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveCourse').onclick=()=>{const data={name:$('#courseName').value.trim()||'Untitled course',currentWeek:Number($('#courseCurrent').value||0),teachingWeek:Number($('#courseTeaching').value||10),note:$('#courseNote').value.trim()}; if(c)Object.assign(c,data); else state.courses.push({id:uid('course'),...data}); save();modal.close();renderUniversity();};
  if(c) $('#deleteCourse').onclick=()=>{state.courses=state.courses.filter(x=>x.id!==c.id);save();modal.close();renderUniversity();};
  $('#cancelModal').onclick=()=>modal.close();
}
function openUniTaskModal(){
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">CATCH-UP QUEUE</p><h2>Add task</h2><div class="stack"><label><span class="label">Task</span><input class="input" id="uniTitle" placeholder="e.g. Topic 4 tutorial + notes"></label><label><span class="label">Course</span><select id="uniCourse"><option value="General">General</option>${state.courses.map(c=>`<option>${escapeHTML(c.name)}</option>`).join('')}</select></label><label><span class="label">Priority</span><select id="uniPriority"><option>Urgent</option><option selected>Important</option><option>Later</option></select></label></div><button class="primary full" id="saveUniTask" style="margin-top:14px">Add task</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal(); $('#saveUniTask').onclick=()=>{const title=$('#uniTitle').value.trim();if(!title)return toast('Add a task name');state.uniTasks.push({id:uid('task'),title,course:$('#uniCourse').value,priority:$('#uniPriority').value,done:false});save();modal.close();renderUniversity();}; $('#cancelModal').onclick=()=>modal.close();
}
function openMoneyModal(){
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">MONEY</p><h2>Edit monthly plan</h2><div class="form-grid"><label><span class="label">Monthly income (SAR)</span><input class="input" id="incomeInput" type="number" value="${state.money.income}"></label><label><span class="label">Current cash (SAR)</span><input class="input" id="cashInput" type="number" value="${state.money.currentCash}"></label></div><hr><div class="stack">${state.money.buckets.map((b,i)=>`<div class="course"><label><span class="label">Bucket</span><input class="input bucket-name" data-i="${i}" value="${escapeAttr(b.name)}"></label><div class="form-grid" style="margin-top:8px"><label><span class="label">Target</span><input class="input bucket-target" data-i="${i}" type="number" value="${b.target}"></label><label><span class="label">Spent</span><input class="input bucket-spent" data-i="${i}" type="number" value="${b.spent}"></label></div></div>`).join('')}</div><button class="primary full" id="saveMoney" style="margin-top:14px">Save money plan</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal(); $('#saveMoney').onclick=()=>{state.money.income=Number($('#incomeInput').value||0);state.money.currentCash=Number($('#cashInput').value||0);state.money.buckets.forEach((b,i)=>{b.name=$(`.bucket-name[data-i="${i}"]`).value.trim()||b.name;b.target=Number($(`.bucket-target[data-i="${i}"]`).value||0);b.spent=Number($(`.bucket-spent[data-i="${i}"]`).value||0)});save();modal.close();renderLife();}; $('#cancelModal').onclick=()=>modal.close();
}
function openWeeklyReviewModal(){
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SUNDAY RESET</p><h2>Weekly review</h2><div class="stack"><label><span class="label">How was the week? (1–10)</span><input class="input" id="reviewRating" type="number" min="1" max="10" value="7"></label><label><span class="label">What went well?</span><textarea id="reviewWins" placeholder="Small wins count."></textarea></label><label><span class="label">What kept slipping?</span><textarea id="reviewIssues" placeholder="Sleep, scrolling, class, food..."></textarea></label><label><span class="label">One focus for next week</span><input class="input" id="reviewFocus" placeholder="e.g. Attend every class"></label></div><button class="primary full" id="saveReview" style="margin-top:14px">Save weekly reset</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal(); $('#saveReview').onclick=()=>{state.weeklyReviews.push({id:uid('review'),date:new Date().toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}),rating:clamp(Number($('#reviewRating').value||7),1,10),wins:$('#reviewWins').value.trim(),issues:$('#reviewIssues').value.trim(),focus:$('#reviewFocus').value.trim()});save();modal.close();toast('Weekly reset saved');renderLife();}; $('#cancelModal').onclick=()=>modal.close();
}

function formatClock(v){ if(!v)return'—'; const [h,m]=v.split(':').map(Number); const d=new Date();d.setHours(h,m);return d.toLocaleTimeString([], {hour:'numeric',minute:'2-digit'}); }
function shorten(s,n){ return s.length>n?s.slice(0,n-1)+'…':s; }
function escapeHTML(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function escapeAttr(s=''){return escapeHTML(s);}

$$('.tab').forEach(btn=>btn.addEventListener('click',()=>{state.settings.activeTab=btn.dataset.tab;save();render();window.scrollTo({top:0,behavior:'smooth'});}));

const settingsDialog=$('#settingsDialog');
$('#settingsBtn').onclick=()=>settingsDialog.showModal();
$('#exportBtn').onclick=()=>{
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`reset-backup-${todayKey()}.json`; a.click(); URL.revokeObjectURL(url); toast('Backup exported');
};
$('#importInput').addEventListener('change',async e=>{const f=e.target.files?.[0]; if(!f)return; try{const data=JSON.parse(await f.text()); if(!data.records||!data.money)throw new Error('Invalid'); state=data; save(); settingsDialog.close(); toast('Backup imported'); render();}catch(err){toast('That backup file is not valid');} e.target.value='';});
$('#installHelpBtn').onclick=()=>{settingsDialog.close();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">IPHONE</p><h2>Add Reset to your Home Screen</h2><ol class="muted" style="padding-left:20px;line-height:1.8"><li>Open the deployed app in <b>Safari</b>.</li><li>Tap the <b>Share</b> button.</li><li>Choose <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b>.</li></ol><p class="muted tiny">After that it opens full-screen like an app and can work offline.</p><button class="primary full" id="cancelModal">Got it</button>`;modal.showModal();$('#cancelModal').onclick=()=>modal.close();};
$('#eraseBtn').onclick=()=>{if(confirm('Erase all Reset app data on this device?')){localStorage.removeItem(APP_KEY);state=defaultState();settingsDialog.close();render();toast('App reset');}};

modal.addEventListener('click',e=>{ if(e.target===modal)modal.close(); });
settingsDialog.addEventListener('click',e=>{ if(e.target===settingsDialog)settingsDialog.close(); });

if('serviceWorker' in navigator){ window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{})); }
render();
