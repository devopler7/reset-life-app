const APP_KEY = 'reset-life-dashboard-v1';
const APP_VERSION = 12;
const APP_DISPLAY_VERSION = '3.3.0';
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const uid = (p='id') => `${p}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`;
const clamp = (n,min,max) => Math.max(min,Math.min(max,n));
function isArabic(){return state?.settings?.language==='ar';}
function currentLocale(){return isArabic()?'ar-SA':'en-AU';}
function fmtNumber(n,opts={}){return Number(n||0).toLocaleString(currentLocale(),opts);}
function fmtMoney(n){return isArabic()?new Intl.NumberFormat('ar-SA',{style:'currency',currency:'SAR',maximumFractionDigits:0}).format(Number(n||0)):`${Number(n||0).toLocaleString('en-AU',{maximumFractionDigits:0})} SAR`;}
const DAY_SHORT_EN = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const DAY_LONG_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAY_SHORT_AR = ['أحد','اثن','ثلا','أرب','خمي','جمع','سبت'];
const DAY_LONG_AR = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const DAY_PICK = ['Su','M','Tu','W','Th','F','Sa'];
function dayShort(i){return isArabic()?DAY_SHORT_AR[i]:DAY_SHORT_EN[i];}
function dayLong(i){return isArabic()?DAY_LONG_AR[i]:DAY_LONG_EN[i];}
const DAY_SHORT=DAY_SHORT_EN, DAY_LONG=DAY_LONG_EN;
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
  trophy:'<path d="M8 4h8v4c0 4-2 6-4 6s-4-2-4-6V4zM8 6H4v2c0 2 1.2 3 3.5 3M16 6h4v2c0 2-1.2 3-3.5 3M12 14v4M8.5 21h7M9 18h6"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1z"/>',
  arrowUpRight:'<path d="M7 17L17 7M9 7h8v8"/>',
  fork:'<path d="M7 3v7M4 3v5c0 2 1 3 3 3s3-1 3-3V3M7 11v10M15 3v18M15 3c4 2 4 7 0 9"/>',
  spark:'<path d="M12 3l1.2 4.3L17.5 9l-4.3 1.7L12 15l-1.2-4.3L6.5 9l4.3-1.7L12 3zM19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15z"/>',
  moon:'<path d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.6 8.6 0 1 0 11.2 11.2z"/>'
};
function svgIcon(name, cls='ui-icon') { return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[name]||''}</svg>`; }

const AR_UI = {
  'Today':'اليوم','Week':'الأسبوع','University':'الجامعة','Money':'المال','More':'المزيد','Gym':'النادي','Health':'الصحة','Car':'السيارة','Projects':'المشاريع','Progress':'التقدم',
  'Settings & backup':'الإعدادات والنسخ الاحتياطي','Export backup':'تصدير نسخة احتياطية','Import backup':'استيراد نسخة احتياطية','Add to iPhone Home Screen':'إضافة إلى شاشة الآيفون الرئيسية','Local data protection':'حماية البيانات المحلية','Automatic backup copy':'نسخة احتياطية تلقائية','App version':'إصدار التطبيق','Erase all app data':'مسح جميع بيانات التطبيق','Language':'اللغة',
  'English':'English','Arabic':'العربية','Close':'إغلاق','Cancel':'إلغاء','Save':'حفظ','Edit':'تعديل','Delete':'حذف','Remove':'إزالة','Done':'تم','Select':'تحديد','Selected':'محدد','Back':'رجوع','Today’s timeline':'جدول اليوم','Today\'s timeline':'جدول اليوم','Today’s Progress':'تقدم اليوم',
  'Now':'الآن','Next':'التالي','NEXT':'التالي','DO THIS NOW':'افعل هذا الآن','Mark done':'تم','Move':'نقل','Add task':'إضافة مهمة','Task':'مهمة','Routine':'روتين','Fitness':'لياقة','Food':'طعام','Life':'حياة','Project':'مشروع','Sleep':'نوم',
  'Classes':'المحاضرات','Habits':'العادات','Other':'أخرى','Plan day':'خطط لليوم','Rebuild day':'أعد بناء اليوم','Wake time for this day':'وقت الاستيقاظ لهذا اليوم','This changes only this date. Your recurring routine stays untouched.':'هذا التغيير لهذا التاريخ فقط. الروتين المتكرر لن يتغير.','Keep my moves':'احتفظ بتعديلاتي','Reset day to routine':'أعد اليوم للروتين','Full Body':'جسم كامل','Upper Body':'الجزء العلوي','Lower Body':'الجزء السفلي','Core':'البطن والجذع','Chest':'الصدر','Back':'الظهر','Shoulders':'الأكتاف','Arms':'الذراعان','Legs':'الأرجل','Glutes':'الأرداف','Calves':'السمانة','Rear Delts':'الكتف الخلفي','Biceps':'البايسبس','Triceps':'الترايسبس','Quads':'العضلات الأمامية للفخذ','Hamstrings':'أوتار الركبة','Perfect Week':'أسبوع مثالي','Finish every scheduled item Monday through Sunday.':'أكمل كل المهام المجدولة من الاثنين إلى الأحد.','Done today':'تم اليوم','Streak':'السلسلة','Sleep target':'هدف النوم','Rebuild today from now':'إعادة بناء اليوم من الآن','ADAPTIVE RESTART':'إعادة ضبط ذكية','Normal':'عادي','Bad day':'يوم صعب','Exam':'اختبارات','Holiday':'إجازة',
  'Previous week':'الأسبوع السابق','Next week':'الأسبوع التالي','Recurring routine':'الروتين المتكرر','Weekly schedule':'الجدول الأسبوعي','Manage routine':'إدارة الروتين','Recurring item':'مهمة متكررة','Nothing scheduled for this day.':'لا يوجد شيء مجدول لهذا اليوم.',
  'Courses':'المقررات','Open tasks':'المهام المفتوحة','Urgent':'عاجل','Catch-up queue':'قائمة اللحاق','Schedule it':'جدولها','Important':'مهم','Later':'لاحقاً','General':'عام',
  'Next salary':'الراتب القادم','days until salary':'أيام حتى الراتب','+ Log spending':'+ تسجيل مصروف','NEXT SALARY':'الراتب القادم','left to spend':'متبقي للصرف','LEFT TO SPEND':'متبقي للصرف','Monthly Spending':'مصروفات الشهر','Monthly spending':'مصروفات الشهر','Allocations':'التخصيصات','Log spending':'تسجيل مصروف','Recent Spending':'آخر المصروفات','Recent spending':'آخر المصروفات','See all':'عرض الكل','Spending History':'سجل المصروفات','Spending history':'سجل المصروفات','All':'الكل','All months':'كل الأشهر','All allocations':'كل التخصيصات','Allocation':'التخصيص','Month':'الشهر','Spending trend':'اتجاه المصروفات','Income':'الدخل','Allocated':'المخصص','Spent':'المصروف','Save money plan':'حفظ خطة المال','Edit monthly allocation':'تعديل التخصيص الشهري','Monthly income (SAR)':'الدخل الشهري (ر.س)','Payday day of month':'يوم نزول الراتب','Add allocation bucket':'إضافة تخصيص','Bucket':'التخصيص','Monthly SAR':'شهرياً (ر.س)','Log an expense':'تسجيل مصروف','Edit an expense':'تعديل مصروف','Amount':'المبلغ','Date':'التاريخ','Note':'ملاحظة','Save spending':'حفظ المصروف','Delete entry':'حذف السجل',
  'Workouts':'التمارين','History':'السجل','This Week':'هذا الأسبوع','This week':'هذا الأسبوع','sessions':'جلسات','Start Workout':'ابدأ التمرين','Recent Sessions':'الجلسات الأخيرة','Recent sessions':'الجلسات الأخيرة','Strength progress':'تقدم القوة','Personal bests':'الأرقام الشخصية','Personal best':'الرقم الشخصي','Exercise history':'سجل التمارين','Workout days':'أيام التمرين','Log exercise':'تسجيل تمرين','Log workout day':'تسجيل يوم تمرين','Exercise':'التمرين','Weight (kg)':'الوزن (كجم)','Sets':'الجولات','Reps':'التكرارات','Save log':'حفظ السجل','Add an exercise':'إضافة تمرين','Exercise name':'اسم التمرين','Muscle group':'المجموعة العضلية','Add exercise':'إضافة تمرين',
  'Weekly goal':'الهدف الأسبوعي','Edit goal':'تعديل الهدف','Manage exercises':'إدارة التمارين','Edit exercise':'تعديل التمرين','Delete exercise':'حذف التمرين','Workout':'تمرين','Logged session':'جلسة مسجلة','Progress & achievements':'التقدم والإنجازات','Insights, trends and long-term goals':'الملاحظات والاتجاهات والأهداف طويلة المدى','Odometer':'عداد الكيلومترات','Update odometer':'تحديث العداد','Tap to update':'اضغط للتحديث','Service due':'موعد الصيانة','days left':'يوم متبقٍ','overdue':'متأخر','km left':'كم متبقي','Fuel history':'سجل الوقود','Maintenance history':'سجل الصيانة','No date set':'لم يتم تحديد تاريخ','Last fill':'آخر تعبئة','Goal':'الهدف','Save goal':'حفظ الهدف','Save odometer':'حفظ العداد',
  'Overview':'نظرة عامة','Month':'الشهر','All time':'كل الوقت','Daily completion':'إنجاز اليوم','Class attendance':'حضور المحاضرات','Three-meal days':'أيام 3 وجبات','Money spent':'المصروف','Insights':'الملاحظات','Achievements':'الإنجازات','Month in review':'ملخص الشهر','Good days':'الأيام الجيدة','Completion':'الإنجاز','3 meals':'3 وجبات','Daily streak':'السلسلة اليومية','Class-day streak':'سلسلة أيام الدراسة',
  'Life Tools':'أدوات الحياة','Life tools':'أدوات الحياة','Strength, PRs and workout history.':'القوة والأرقام الشخصية وسجل التمارين.','Body weight and simple progress.':'الوزن والتقدم بشكل بسيط.','Fuel, service, rego and maintenance.':'الوقود والصيانة والتسجيل.','Keep meaningful work moving.':'استمر في مشاريعك المهمة.','Track your spending':'تتبع مصروفاتك','See patterns':'شاهد الأنماط','Long-term goals':'أهداف طويلة المدى',
  'Body weight':'وزن الجسم','Weight history':'سجل الوزن','Log body weight':'تسجيل الوزن','Fuel':'وقود','Maintenance':'صيانة','Edit car':'تعديل السيارة','Fuel logged':'الوقود المسجل','Last fill':'آخر تعبئة','Rego due':'موعد التسجيل','Active projects':'المشاريع النشطة','Next task':'المهمة التالية','Plan':'الخطة','Activity history':'سجل النشاط','Log project session':'تسجيل جلسة مشروع','Archive project':'أرشفة المشروع',
  'Protected':'محمي','Best effort':'حماية جزئية','Local':'محلي','Checking…':'جاري التحقق…','Saved now':'تم الحفظ الآن','Ready':'جاهز','How':'الطريقة','Choose file':'اختر ملف','Reset':'إعادة ضبط',
  'Wake up + curtains open':'استيقظ وافتح الستائر','Shower + grooming':'استحمام وعناية','Breakfast':'الإفطار','Money check':'مراجعة المال','Plan the coming week':'تخطيط الأسبوع','Focused university catch-up':'تعويض جامعي مركز','Lunch':'الغداء','Outside + walk':'خروج ومشي','Mobility / easy movement':'مرونة / حركة خفيفة','Dinner':'العشاء','Personal project':'مشروع شخصي','Phone away':'إبعاد الهاتف','Lights out':'إطفاء الأنوار',
  'Production Engineering Forum':'ملتقى هندسة الإنتاج','Production Engineering Workshop':'ورشة هندسة الإنتاج','Reservoir Engineering Workshop':'ورشة هندسة المكامن','Production Engineering Tutorial':'تمارين هندسة الإنتاج','Reservoir Engineering Tutorial':'تمارين هندسة المكامن','Reservoir Engineering Lecture':'محاضرة هندسة المكامن','Fluid Mechanics Workshop':'ورشة ميكانيكا الموائع','Systems Engineering Workshop':'ورشة هندسة النظم',
  'Get out of bed immediately. No scrolling or gooning in bed.':'قم من السرير فورًا. لا تبقَ في السرير للتصفح أو إضاعة الوقت.','Teeth, deodorant, hair/beard and clean clothes.':'أسنان، مزيل عرق، شعر أو لحية وملابس نظيفة.','Eat early and include protein.':'تناول وجبة مبكرة تحتوي على بروتين.','Check spending, allocations and upcoming car/travel costs.':'راجع المصروفات والتخصيصات وتكاليف السيارة والسفر القادمة.','Classes, urgent uni work, gym and one focus for the week.':'المحاضرات والعمل الجامعي العاجل والنادي وهدف واحد للأسبوع.','Proper meal, not random snacking.':'وجبة حقيقية بدل الأكل العشوائي.','Leave the room and get at least 30 minutes outside.':'اخرج من الغرفة واقضِ 30 دقيقة على الأقل خارج المنزل.','10–15 minutes for hips, hamstrings, back and shoulders.':'10–15 دقيقة للورك وأوتار الركبة والظهر والكتفين.','A real meal with protein.':'وجبة حقيقية تحتوي على بروتين.','Build something outside university. The app itself can count.':'ابنِ شيئًا خارج الجامعة. حتى تطوير التطبيق يُحسب.','Charge it away from the bed. No late scroll spiral.':'اشحن الهاتف بعيدًا عن السرير. لا تدخل في دوامة تصفح ليلية.','Protect tomorrow before it starts.':'احمِ يوم الغد قبل أن يبدأ.',
  'Rebuild the rest of today':'أعد بناء بقية اليوم','Keep fixed events safe and rebuild only what is still useful.':'حافظ على المواعيد الثابتة وأعد ترتيب ما زال مفيدًا فقط.','Rebuild':'إعادة بناء','Review':'مراجعة','Last night':'الليلة الماضية','Sleep was not logged':'لم يتم تسجيل النوم','Record it even if you slept after midnight.':'سجله حتى لو نمت بعد منتصف الليل.','Log sleep':'سجل النوم','Complete':'مكتمل','Next up':'التالي','left':'متبقي','until':'حتى','overdue':'متأخر','LOCKED':'مقفل','ADJUSTED':'معدل','MOVED':'منقول','DROPPED':'محذوف','MISSED':'فات',

  'Good morning':'صباح الخير','Good afternoon':'مساء الخير','Good evening':'مساء الخير','now':'الآن','Log sleep time':'سجل وقت النوم','Do the next useful thing.':'افعل الشيء المفيد التالي.','You’re clear for now.':'لا يوجد شيء مطلوب الآن.','Use the free time well, or add something useful.':'استفد من الوقت أو أضف مهمة مفيدة.','You finished what mattered today.':'أنهيت ما كان مهمًا اليوم.','Day complete':'اكتمل اليوم','Recovery complete':'اكتمل التعافي','End of day':'نهاية اليوم','flexible item still open':'مهمة مرنة ما زالت مفتوحة','flexible items still open':'مهام مرنة ما زالت مفتوحة','Move, drop or keep them.':'انقلها أو احذفها أو أبقها.','Weekly routine':'الروتين الأسبوعي','recurring items':'عناصر متكررة','Add':'إضافة','Open':'فتح','Workout':'تمرين','Sleep, weight, habits':'النوم والوزن والعادات','Fuel & maintenance':'الوقود والصيانة','Track your progress':'تتبع تقدمك','earned':'مكتسب','Gym Sessions':'جلسات النادي','Class Attendance':'حضور المحاضرات','Three-Meal Days':'أيام ثلاث وجبات','Money Spent':'المصروفات','Daily Completion':'الإنجاز اليومي','Weight':'الوزن','30-day comparison':'مقارنة 30 يومًا','Meals':'الوجبات','Gym':'النادي','Previous 30 days':'آخر 30 يومًا سابقًا','All spending':'كل المصروفات','Selected allocation':'التخصيص المحدد','Transactions':'المعاملات','Trend':'الاتجاه','entries':'سجلات','No spending logged this month.':'لا توجد مصروفات مسجلة هذا الشهر.','No spending matches these filters.':'لا توجد مصروفات مطابقة لهذه الفلاتر.','Online rate':'سعر مباشر','manual':'يدوي','Refresh or set an AUD → SAR rate first.':'حدّث أو أدخل سعر تحويل الدولار الأسترالي إلى الريال أولاً.','One clean catch-up block before the new week.':'جلسة لحاق مركزة واحدة قبل الأسبوع الجديد.',
  '+ Add':'+ إضافة','Rent + bills':'الإيجار والفواتير','Car fuel + reserve':'وقود السيارة والاحتياطي','Travel':'السفر','Invisalign':'إنفزلاين','Savings':'الادخار','Clothes + fun':'الملابس والترفيه','Buffer':'احتياطي','Not logged':'غير مسجل','No workout days logged yet.':'لم يتم تسجيل أيام تمرين بعد.','Push':'دفع','Pull':'سحب','Legs':'الأرجل','Upper Body':'الجزء العلوي','Chest, Shoulders, Triceps':'الصدر، الأكتاف، الترايسبس','Back, Biceps':'الظهر، البايسبس','Chest, Back, Shoulders':'الصدر، الظهر، الأكتاف','Keep using Reset and useful patterns will appear here automatically.':'استمر باستخدام Reset وستظهر الأنماط المفيدة هنا تلقائيًا.','Two solid weeks':'أسبوعان قويان','Finish 14 days at 70% or better.':'أنهِ 14 يومًا بنسبة 70% أو أكثر.','Gym routine':'روتين النادي','Complete 12 gym sessions.':'أكمل 12 جلسة في النادي.','Locked in':'ملتزم','Complete 30 gym sessions.':'أكمل 30 جلسة في النادي.','Food rhythm':'انتظام الوجبات','Hit all 3 meals on 20 different days.':'أكمل الوجبات الثلاث في 20 يومًا مختلفًا.','Show up':'الحضور','Attend 20 tracked university classes.':'احضر 20 محاضرة جامعية متتبعة.','Reliable student':'طالب ملتزم','Complete every class on 10 class days.':'أكمل جميع المحاضرات في 10 أيام دراسية.','Builder':'بنّاء','Log 15 focused project sessions.':'سجل 15 جلسة مشروع مركزة.','Stronger':'أقوى','Improve one tracked lift by at least 20%.':'حسّن أحد الأوزان المتتبعة بنسبة 20% على الأقل.','Reset 50':'Reset 50','Finish 50 good days at 70% or better.':'أنهِ 50 يومًا جيدًا بنسبة 70% أو أكثر.','Nothing in the catch-up queue. Current classes can stay your focus.':'لا توجد مهام في قائمة اللحاق. ركز على المحاضرات الحالية.','Update this to your real position.':'حدّث هذا إلى تقدمك الحقيقي.',
  'Current saved rate':'السعر المحفوظ الحالي','AUD → SAR conversion':'تحويل الدولار الأسترالي إلى الريال','Currency':'العملة','Refresh':'تحديث','Saved directly in SAR':'سيتم الحفظ مباشرة بالريال','No rate saved':'لا يوجد سعر محفوظ','or set manually':'أو أدخله يدويًا','A$1 equals how many SAR?':'كم ريال يساوي 1 دولار أسترالي؟','Save manual rate':'حفظ السعر اليدوي','Choose language':'اختر اللغة'
};
Object.assign(AR_UI,{
  'Sleep duration':'مدة النوم','Last night':'الليلة الماضية','7-day average':'متوسط 7 أيام','30-day average':'متوسط 30 يوماً','Sleep history':'سجل النوم','Target duration':'المدة المستهدفة','Bedtime consistency':'انتظام وقت النوم','Wake consistency':'انتظام وقت الاستيقاظ','Log / correct night':'تسجيل / تصحيح ليلة','Sleep tool':'النوم','Duration, timing and consistency.':'المدة والتوقيت والانتظام.','On target':'ضمن الهدف','Short':'قصير','Long':'طويل','Incomplete':'غير مكتمل','Manage':'إدارة','Edit details':'تعديل التفاصيل','Fuel, service & rego':'الوقود والصيانة والتسجيل','Body weight and simple progress':'وزن الجسم والتقدم البسيط','Progress & achievements':'التقدم والإنجازات','Insights, trends and long-term goals':'الملاحظات والاتجاهات والأهداف طويلة المدى','No workouts logged this week yet.':'لم يتم تسجيل تمارين هذا الأسبوع بعد.','Weekly goal reached':'تم تحقيق الهدف الأسبوعي','No exercises yet. Add one to start tracking strength.':'لا توجد تمارين بعد. أضف تمريناً لبدء تتبع القوة.','No fuel fill logged yet':'لم يتم تسجيل تعبئة وقود بعد','Due today':'مستحق اليوم','Current reading':'القراءة الحالية','Edit exercise':'تعديل التمرين','Exercise updated':'تم تحديث التمرين','Exercise added':'تمت إضافة التمرين','Exercise deleted':'تم حذف التمرين','Workout session':'جلسة تمرين','Logged session':'جلسة مسجلة','Goal':'الهدف','Weekly goal':'الهدف الأسبوعي','Choose how many workout days you want in a normal week. This is a target, not a fixed program.':'اختر عدد أيام التمرين التي تريدها في أسبوع عادي. هذا هدف وليس برنامجاً ثابتاً.','What are you training?':'ماذا ستتمرن اليوم؟','Choose what you are training':'اختر ما ستتمرن عليه','Full body or a muscle focus. Reset builds a simple exercise list from your own library.':'جسم كامل أو مجموعة عضلية محددة. يبني Reset قائمة بسيطة من تمارينك.','Start Workout':'ابدأ التمرين','IN PROGRESS':'قيد التنفيذ','PLAN':'الخطة','Log':'سجل','Log again':'سجل مرة أخرى','Finish workout':'إنهاء التمرين','Cancel workout':'إلغاء التمرين','All exercises':'كل التمارين','Show':'عرض','Strength Progress':'تقدم القوة','Personal Bests':'الأرقام الشخصية','7 days':'7 أيام','30 days':'30 يوماً','All time':'كل الوقت','Last 7 days':'آخر 7 أيام','Last 30 days':'آخر 30 يوماً','VIEWING':'عرض','Fixed time / appointment':'وقت ثابت / موعد','Use for meetings or anything Reset should never move.':'استخدمه للاجتماعات أو أي شيء لا يجب على Reset تحريكه.','ONE-DAY PLAN':'خطة يوم واحد','Rebuild day':'أعد بناء اليوم','Reset day to routine':'أعد اليوم للروتين','Keep swaps and time changes you already made for this day while rebuilding around them.':'احتفظ بالتبديلات وتغييرات الوقت التي أجريتها لهذا اليوم أثناء إعادة البناء.'
});
function ui(text){return isArabic()?(AR_UI[text]||text):text;}
function translateTextValue(text){
  if(!isArabic()) return text;
  const trimmed=String(text||'').trim();
  if(!trimmed) return text;
  if(AR_UI[trimmed]) return String(text).replace(trimmed,AR_UI[trimmed]);
  const replacements=[
    [/^\+ Task$/i,'+ مهمة'],[/^NOW$/i,'الآن'],[/^Next up$/i,'التالي'],
    [/^(\d+) days?$/i,'$1 يوم'],[/^Start (.+) workout$/i,'ابدأ تمرين $1'],[/^(\d+) exercises$/i,'$1 تمارين'],[/^(\d+) days? left$/i,'$1 يوم متبقٍ'],[/^(\d+) days? overdue$/i,'متأخر $1 يوم'],[/^(\d+) sessions?$/i,'$1 جلسة'],[/^(\d+) entries$/i,'$1 سجل'],[/^(\d+) active$/i,'$1 نشط'],[/^(\d+) items$/i,'$1 عناصر'],[/^Goal (\d+)$/i,'الهدف $1'],[/^(\d+) to go$/i,'متبقي $1'],[/^Workout (\d+)$/i,'تمرين $1'],[/^Level (\d+)$/i,'المستوى $1'],
    [/^(\d+) day(?:s)? until your next salary$/i,'$1 يوم حتى الراتب القادم'],[/^(\d+) min ago$/i,'منذ $1 دقيقة'],[/^(\d+) selected$/i,'تم تحديد $1'],
    [/^Week (\d+)$/i,'الأسبوع $1'],[/^Due (.+)$/i,'موعد $1'],[/^(\d+) flexible item still open$/i,'$1 مهمة مرنة ما زالت مفتوحة'],[/^(\d+) flexible items still open$/i,'$1 مهام مرنة ما زالت مفتوحة'],[/^(\d+) recurring items$/i,'$1 عناصر متكررة'],[/^(\d+) days until salary$/i,'$1 يوم حتى الراتب'],[/^(\d+) earned$/i,'$1 مكتسب'],[/^(\d+) \/ (\d+) sessions$/i,'$1 / $2 جلسات'],[/^You: week (\d+) · Teaching: week (\d+) · (\d+) weeks behind$/i,'أنت: الأسبوع $1 · التدريس: الأسبوع $2 · متأخر $3 أسابيع'],[/^(.+) spent · (.+) left$/i,'تم صرف $1 · متبقي $2'],[/\boverdue\b/gi,'متأخر'],[/\bnow\b/gi,'الآن'],[/^Log sleep time$/i,'سجل وقت النوم']
  ];
  for(const [r,repl] of replacements) if(r.test(trimmed)) return String(text).replace(trimmed,trimmed.replace(r,repl));
  return text;
}
function localizeTree(root=document){
  if(!isArabic()||!root) return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT); const nodes=[]; let n;
  while(n=walker.nextNode()){if(n.parentElement && !['SCRIPT','STYLE','OPTION'].includes(n.parentElement.tagName))nodes.push(n);}
  nodes.forEach(node=>{const x=translateTextValue(node.nodeValue);if(x!==node.nodeValue)node.nodeValue=x;});
  root.querySelectorAll?.('[placeholder]').forEach(el=>{const p=el.getAttribute('placeholder');const q=translateTextValue(p);if(q!==p)el.setAttribute('placeholder',q);});
  root.querySelectorAll?.('option').forEach(el=>{const x=translateTextValue(el.textContent);if(x!==el.textContent)el.textContent=x;});
}
function applyLanguageState(){
  const ar=isArabic(); document.documentElement.lang=ar?'ar':'en';document.documentElement.dir=ar?'rtl':'ltr';document.body.classList.toggle('rtl',ar);
  const labels={today:'Today',week:'Week',university:'University',money:'Money',more:'More'};
  $$('.tab').forEach(b=>{const sm=$('small',b);if(sm)sm.textContent=ui(labels[b.dataset.tab]||'');});
  const lang=$('#languageLabel'); if(lang)lang.textContent=ar?'🇸🇦 العربية':'🇺🇸 English';
  const settingsTitle=$('#settingsDialog h2');if(settingsTitle)settingsTitle.textContent=ui('Settings & backup');
  const pairs=[['#languageBtn','Language'],['#exportBtn','Export backup'],['.file-label','Import backup'],['#installHelpBtn','Add to iPhone Home Screen'],['#storageProtectionBtn','Local data protection'],['#eraseBtn','Erase all app data']];
  pairs.forEach(([sel,key])=>{const el=$(sel);const span=el&&$('span',el);if(span)span.textContent=ui(key);});
}
let languageObserver=null;
function ensureLanguageObserver(){
  if(languageObserver)return;
  languageObserver=new MutationObserver(muts=>{if(!isArabic())return;muts.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)localizeTree(n);else if(n.nodeType===3){const x=translateTextValue(n.nodeValue);if(x!==n.nodeValue)n.nodeValue=x;}}));});
  languageObserver.observe(document.body,{childList:true,subtree:true});
}

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
    gym:{exercises:defaultGymExercises(),logs:[],sessions:[],sessionExcluded:[],weeklyGoal:3,activeWorkout:null,workoutPresets:defaultWorkoutPresets()},
    health:{weightLogs:[]},
    car:{model:'2007 Honda Accord V6 Luxury',odometer:180000,regoDue:'',serviceDueDate:'',serviceDueKm:0,fuelLogs:[],maintenanceLogs:[]},
    weeklyReviews:[],
    settings:{activeTab:'today', selectedWeekDate:todayKey(), statsRange:'30', moreView:'home', mode:'normal', modeSetDate:todayKey(), selectedExerciseId:'chest_press', gymView:'workouts', gymGroupFilter:'All', gymHistoryExercise:'all', gymHistoryExpanded:false, sleepHistoryExpanded:false, moneyHistoryMonth:monthKey(), moneyHistoryBucket:'all', moneyView:'home', language:'en'}
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
  // v3.3: wake/sleep are permanent day anchors. Morning tasks and phone are flexible again.
  next.schedule=next.schedule.map(item=>{
    if(item.id==='wake') return {...item,fixed:true,manualLocked:true,anchor:'wake',essential:true};
    if(item.id==='sleep') return {...item,title:'Sleep',fixed:true,manualLocked:true,anchor:'sleep'};
    if(['groom','breakfast'].includes(item.id)){const x={...item,fixed:false,manualLocked:false};delete x.anchor;return x;}
    if(item.id==='phone'){const x={...item,fixed:false,manualLocked:false};delete x.anchor;return x;}
    return item;
  });
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
  if(!['en','ar'].includes(next.settings.language)) next.settings.language='en';
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
  if(!initialLocalStateFound) {
    const snap=await durableRead();
    if(snap?.state){state=migrateState(snap.state);try{localStorage.setItem(APP_KEY,JSON.stringify(state));}catch(e){}}
  }
  if(state.settings.mode==='bad' && state.settings.modeSetDate!==todayKey()) state.settings.mode='normal';
  appInitialized=true;
  applyLanguageState();ensureLanguageObserver();
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
  if(status==='pending') {
    delete rec.itemStatus[occurrenceKey(item)];
    rec.finishCelebrated='';
    if(item.id==='sleep') delete rec.actualSleepAt;
  } else rec.itemStatus[occurrenceKey(item)]=status;
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
function dayCompletion(date) {
  const key=todayKey(date); const items=itemsForMode(itemsForDate(date),modeForDate(key)).filter(i=>getStatus(i,key)!=='cancelled');
  if(!items.length) return 0;
  const done=items.filter(i=>getStatus(i,key)==='done').length;
  return Math.round(done/items.length*100);
}

function dayFinishState(date=new Date()) {
  const key=todayKey(date); const items=itemsForMode(itemsForDate(date),modeForDate(key)).filter(i=>getStatus(i,key)!=='cancelled');
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
  const scroll=window.scrollY;
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
    <div class="section-title"><h2>Today’s timeline</h2><button id="addTodayBtn">+ Task</button></div>
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
  localizeTree(main);if(preserveScroll)requestAnimationFrame(()=>window.scrollTo(0,scroll));
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
          <div class="timeline-meta">${anchorBadge}${categoryBadge(item.category)}<span class="badge blue">${escapeHTML(timeWindow(item))}</span>${locked&&!anchor?'<span class="badge lock-badge">LOCKED</span>':''}${statusBadge}${sleepBadge}${wakeBadge}</div>
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
    const date=parseDateKey(key),duration=itemDurationForMove(item),blocked=itemsForDate(date).filter(x=>occurrenceKey(x)!==occurrenceKey(item)&&itemManualMoveLocked(x)&&getStatus(x,key)!=='cancelled'&&itemEndSortMinutes(x)>=currentMinutes()).map(x=>({start:itemSortMinutes(x),end:itemEndSortMinutes(x)}));
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
    const y=window.scrollY;render();requestAnimationFrame(()=>{window.scrollTo(0,y);if(cb.checked)maybeCelebrateDayFinish(date);});
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
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SLEEP</p><h2>Log when you actually went to sleep</h2><p class="muted">This belongs to the night of ${escapeHTML(formatDateShort(targetDate))}, even if you slept after midnight.</p><label><span class="label">Actual sleep time</span><input class="input" id="actualSleepInput" type="datetime-local" value="${escapeAttr(defaultValue)}"></label><button class="primary full" id="saveSleepLog" style="margin-top:14px">Save sleep time</button>${rec.actualSleepAt?'<button class="danger-btn full" id="clearSleepLog" style="margin-top:8px">Clear sleep log</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveSleepLog').onclick=()=>{const value=$('#actualSleepInput').value;if(!value||!value.includes('T'))return toast('Choose the actual sleep time');const actualKey=value.slice(0,10);if(actualKey!==targetKey&&actualKey!==nextKey)return toast('Use that evening or the following morning');rec.actualSleepAt=value;setDaySleepOverride(targetDate,value.slice(11,16));setStatus(item,targetKey,'done');save();modal.close();render();toast(`Sleep logged at ${actualSleepClock(value)}`);requestAnimationFrame(()=>maybeCelebrateDayFinish(targetDate));};
  if($('#clearSleepLog'))$('#clearSleepLog').onclick=()=>{delete rec.actualSleepAt;setStatus(item,targetKey,'pending');save();modal.close();render();toast('Sleep log cleared');};
  $('#cancelModal').onclick=()=>modal.close();localizeTree(modalContent);
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

function renderMoney() {
  if((state.settings.moneyView||'home')==='history')return renderMoneyHistoryPage();
  setHeader('Money');captureCurrentMoneyPlan();const mk=monthKey(),totalTarget=moneyPlanTotal(),tx=transactionsForMonth(mk),totalSpent=tx.reduce((a,t)=>a+Number(t.amount||0),0),remaining=totalTarget-totalSpent,spendPct=totalTarget>0?Math.round(totalSpent/totalTarget*100):0,daysPay=daysUntilPayday();
  const recent=[...tx].sort((a,b)=>String(b.date).localeCompare(String(a.date))||Number(b.createdAt||0)-Number(a.createdAt||0)).slice(0,5);
  main.innerHTML=`<section class="money-top-grid"><article class="money-summary-tile salary"><span class="money-tile-icon">${svgIcon('calendar')}</span><div><b>${daysPay===0?'Today':daysPay}</b><small>${daysPay===0?'salary day':'day'+(daysPay===1?'':'s')+' until salary'}</small></div></article><article class="money-summary-tile remaining ${remaining<0?'over':''}"><span class="money-tile-icon">${svgIcon('money')}</span><div><b>${fmtMoney(Math.abs(remaining))}</b><small>${remaining>=0?'left to spend':'over allocation'}</small></div></article></section>
  <section class="monthly-spending-card"><div class="monthly-spending-title"><div><span>Monthly Spending</span><b>${fmtMoney(totalSpent)} <em>/ ${fmtMoney(totalTarget)}</em></b></div><strong>${spendPct}%</strong></div><div class="budget-track big"><div class="budget-fill ${remaining<0?'over':''}" style="width:${Math.min(100,Math.max(0,spendPct))}%"></div></div>${moneyBarsHTML()}</section>
  <div class="section-title"><h2>Allocations</h2><button id="editMoneyBtn">Edit</button></div><section class="allocation-list">${state.money.buckets.map(b=>budgetRowHTML(b,mk)).join('')}</section>
  <button class="primary full money-log-btn" id="addExpenseBtn">+ Log spending</button>
  <div class="section-title"><h2>Recent Spending</h2><button id="seeAllSpendingBtn">See all</button></div><section class="recent-spending-list">${recent.length?recent.map(t=>transactionHTML(t)).join(''):'<div class="empty-state">No spending logged this month.</div>'}</section>`;
  $('#editMoneyBtn').onclick=openMoneyModal;$('#addExpenseBtn').onclick=()=>openExpenseModal();$('#seeAllSpendingBtn').onclick=()=>{state.settings.moneyView='history';save();renderMoney();};$$('[data-edit-tx]').forEach(b=>b.onclick=()=>openExpenseModal(b.dataset.editTx));$$('[data-del-tx]').forEach(b=>b.onclick=()=>deleteMoneyTransactionWithUndo(b.dataset.delTx));localizeTree(main);
}
function moneyBarsHTML(){
  const rows=recentMonthKeys(6).map(k=>({k,spent:transactionsForMonth(k).reduce((a,t)=>a+Number(t.amount||0),0)}));const max=Math.max(1,...rows.map(x=>x.spent));
  return `<div class="money-bars">${rows.map((r,i)=>`<div class="money-bar-col"><b>${r.spent?shortMoney(r.spent):'—'}</b><i><span class="${i===rows.length-1?'current':''}" style="height:${Math.max(r.spent?10:2,Math.round(r.spent/max*100))}%"></span></i><small>${escapeHTML(moneyMonthLabel(r.k))}</small></div>`).join('')}</div>`;
}
function shortMoney(n){const x=Number(n||0);return x>=1000?`${(x/1000).toFixed(x>=10000?0:1)}K`:Math.round(x).toString();}
function renderMoneyHistoryPage(){
  setHeader('Spending History');captureCurrentMoneyPlan();const mk=monthKey(),historyMonth=state.settings.moneyHistoryMonth||mk;let historyBucket=state.settings.moneyHistoryBucket||'all';if(historyBucket!=='all'&&!state.money.buckets.some(b=>b.id===historyBucket)){historyBucket='all';state.settings.moneyHistoryBucket='all';}const filtered=moneyFilteredTransactions(historyMonth,historyBucket),months=moneyAvailableMonths(),filteredTotal=filtered.reduce((a,t)=>a+Number(t.amount||0),0);
  main.innerHTML=`<button class="back-link" id="moneyBackBtn">${svgIcon('chevronLeft')}<span>Money</span></button><div class="history-chip-row"><button class="filter-chip ${historyBucket==='all'?'active':''}" data-money-bucket="all">All</button>${state.money.buckets.map(b=>`<button class="filter-chip ${historyBucket===b.id?'active':''}" data-money-bucket="${escapeAttr(b.id)}">${escapeHTML(b.name)}</button>`).join('')}</div><section class="history-month-card"><label><span class="label">Month</span><select id="moneyHistoryMonth"><option value="all" ${historyMonth==='all'?'selected':''}>All months</option>${months.map(x=>`<option value="${x}" ${historyMonth===x?'selected':''}>${escapeHTML(moneyMonthLongLabel(x))}</option>`).join('')}</select></label><div><b>${fmtMoney(filteredTotal)}</b><small>${filtered.length} entries</small></div></section>${historyMonth!=='all'?moneyMonthSummaryHTML(historyMonth):''}<div class="section-title"><h2>Transactions</h2><button class="secondary small-btn" id="selectTxBtn">${moneySelectMode?'Done':'Select'}</button></div>${moneySelectMode?`<section class="selection-toolbar"><span><b id="selectedTxCount">${moneySelectedIds.size}</b> selected</span><button class="danger-btn small-btn" id="deleteSelectedTx" ${moneySelectedIds.size?'':'disabled'}>Delete selected</button></section>`:''}<section class="spending-history-list">${filtered.length?moneyHistoryHTML(filtered):'<div class="empty-state">No spending matches these filters.</div>'}</section><div class="section-title"><h2>Trend</h2></div>${moneyTrendHTML(historyBucket)}`;
  $('#moneyBackBtn').onclick=()=>{moneySelectMode=false;moneySelectedIds.clear();state.settings.moneyView='home';save();renderMoney();};$('#moneyHistoryMonth').onchange=e=>{state.settings.moneyHistoryMonth=e.target.value;moneySelectedIds.clear();save();renderMoney();};$$('[data-money-bucket]').forEach(b=>b.onclick=()=>{state.settings.moneyHistoryBucket=b.dataset.moneyBucket;moneySelectedIds.clear();save();renderMoney();});$('#selectTxBtn').onclick=()=>{moneySelectMode=!moneySelectMode;moneySelectedIds.clear();renderMoney();};$$('[data-edit-tx]').forEach(b=>b.onclick=()=>openExpenseModal(b.dataset.editTx));$$('[data-del-tx]').forEach(b=>b.onclick=()=>deleteMoneyTransactionWithUndo(b.dataset.delTx));$$('[data-select-tx]').forEach(cb=>cb.onchange=()=>{if(cb.checked)moneySelectedIds.add(cb.dataset.selectTx);else moneySelectedIds.delete(cb.dataset.selectTx);const c=$('#selectedTxCount');if(c)c.textContent=moneySelectedIds.size;const d=$('#deleteSelectedTx');if(d)d.disabled=!moneySelectedIds.size;});if($('#deleteSelectedTx'))$('#deleteSelectedTx').onclick=deleteSelectedMoneyTransactions;localizeTree(main);
}

function moneyPlanTotal(){return state.money.buckets.reduce((a,b)=>a+Number(b.target||0),0);}
function captureCurrentMoneyPlan(){
  if(!state.money.planHistory || typeof state.money.planHistory!=='object') state.money.planHistory={};
  if(!state.money.bucketPlanHistory || typeof state.money.bucketPlanHistory!=='object') state.money.bucketPlanHistory={};
  const mk=monthKey(); const total=moneyPlanTotal();
  const snap=state.money.buckets.map(b=>({id:b.id,name:b.name,target:Number(b.target||0)}));
  const before=JSON.stringify(state.money.bucketPlanHistory[mk]||[]);
  if(Number(state.money.planHistory[mk])!==total || before!==JSON.stringify(snap)){state.money.planHistory[mk]=total;state.money.bucketPlanHistory[mk]=snap;save();}
}
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
function budgetRowHTML(b,mk) {
  const spent=spentForBucket(b.id,mk); const target=Number(b.target||0); const pct=target?clamp(Math.round(spent/target*100),0,140):0; const over=spent>target && target>0;
  return `<div class="budget-row"><div class="budget-top"><div><b>${escapeHTML(b.name)}</b><small>${fmtMoney(spent)} spent · ${fmtMoney(Math.max(0,target-spent))} left</small></div><div class="budget-amount"><b>${fmtMoney(target)}</b><small>${target?Math.round(spent/target*100):0}%</small></div></div><div class="budget-track"><div class="budget-fill ${over?'over':''}" style="width:${Math.min(100,pct)}%"></div></div></div>`;
}
function transactionHTML(t,{selectable=false}={}) {
  const b=state.money.buckets.find(x=>x.id===t.bucketId);
  return `<div class="transaction ${selectable?'selectable-history':''}">${selectable?`<input class="check history-check" type="checkbox" data-select-tx="${escapeAttr(t.id)}" ${moneySelectedIds.has(t.id)?'checked':''} aria-label="Select spending entry">`:''}<span class="transaction-icon">${svgIcon(t.bucketId==='food'?'fork':t.bucketId==='car'?'car':'wallet')}</span><div class="transaction-copy"><b>${escapeHTML(t.note||b?.name||'Spending')}</b><small>${escapeHTML(b?.name||'Other')} · ${escapeHTML(formatDateShort(parseDateKey(t.date)))}</small></div><div class="transaction-amount"><b>−${fmtMoney(t.amount)}</b>${selectable?'':`<div class="row"><button class="text-button tiny" data-edit-tx="${t.id}">Edit</button><button class="text-button tiny danger-text" data-del-tx="${t.id}">Delete</button></div>`}</div></div>`;
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
function perfectClassDaysCount(){
  return dateRange('all').filter(d=>{const key=todayKey(d);const items=itemsForDate(d,{ignoreOverrides:true}).filter(i=>i.isClass&&getStatus(i,key)!=='cancelled');if(!items.length)return false;const ended=key<todayKey()||items.every(i=>itemEndSortMinutes(i)<currentMinutes());return ended&&items.every(i=>getStatus(i,key)==='done');}).length;
}
function perfectWeeksCount(){
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
  (state.gym.exercises||[]).forEach(ex=>{const logs=(state.gym.logs||[]).filter(l=>l.exerciseId===ex.id).sort((a,b)=>String(a.date).localeCompare(String(b.date))||Number(a.createdAt||0)-Number(b.createdAt||0));if(logs.length>=2){const first=Number(logs[0].weight||0), max=Math.max(...logs.map(x=>Number(x.weight||0)));if(first>0)best=Math.max(best,Math.round((max-first)/first*100));}});
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
    ['perfect_week','Perfect Week','Finish every scheduled item Monday through Sunday.',perfectWeeks,1]
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
  if(tracked>=7){const byDay=Array.from({length:7},()=>[]);Object.keys(state.records).forEach(k=>{const d=parseDateKey(k);byDay[d.getDay()].push(dayCompletion(d));});const avgs=byDay.map(a=>a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length):-1);const best=Math.max(...avgs);if(best>=0)out.push(`${DAY_LONG[avgs.indexOf(best)]} is your strongest tracked day at about ${best}% completion.`);}
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
  $$('[data-more-view]').forEach(b=>b.onclick=()=>{const v=b.dataset.moreView;moreHomeScrollY=window.scrollY;state.settings.moreView=v;save();renderMore();window.scrollTo({top:0,behavior:'auto'});});localizeTree(main);
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
function bindMoreBack(){const b=$('#moreBackBtn');if(b)b.onclick=()=>{const y=moreHomeScrollY;state.settings.moreView='home';save();renderMore();requestAnimationFrame(()=>window.scrollTo({top:y,behavior:'auto'}));};}
function itemIsFixed(item) { return isDayAnchor(item) || item.fixed===true || item.isClass===true; }
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
  let end=Math.max(floor+duration,latestEnd);
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
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">ADAPTIVE RESTART</p><h2>Rebuild the rest of today.</h2><p class="muted">Wake and sleep anchors stay fixed for this day. Classes and appointments are never moved.${missCount?` ${missCount} fixed event${missCount===1?' is':'s are'} already past and will stay visible as missed.`:''}</p>${manualCount?`<div class="card flat restart-preview"><b>${manualCount} manual move${manualCount===1?'':'s'} detected</b><small>Choose whether Reset should keep the order/timing choices you made or return to the original schedule before rebuilding.</small></div><button class="primary full" id="restartKeepMoves" style="margin-top:12px">Rebuild + keep my moves</button><button class="secondary full" id="restartResetMoves" style="margin-top:8px">Reset my moves + rebuild</button>`:`<div class="card flat restart-preview"><b>Adaptive rebuild</b><small>Overdue flexible tasks move forward around fixed events.</small></div><button class="primary full" id="restartResetMoves" style="margin-top:12px">Rebuild today</button>`}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();if($('#restartKeepMoves'))$('#restartKeepMoves').onclick=()=>{applyAdaptiveRestart(keepPlan);modal.close();toast('Today rebuilt and your manual order was kept');renderToday();};$('#restartResetMoves').onclick=()=>{applyAdaptiveRestart(resetPlan);modal.close();toast(manualCount?'Today rebuilt from the original schedule':'Today rebuilt around the current time');renderToday();};$('#cancelModal').onclick=()=>modal.close();
}
function dailyWakeItem(date){return itemsForDate(date,{ignoreOverrides:true}).find(i=>i.id==='wake')||null;}
function dailySleepItem(date){return itemsForDate(date,{ignoreOverrides:true}).find(i=>i.id==='sleep')||null;}
function dayWakeTime(date){const key=todayKey(date),wake=dailyWakeItem(date);if(!wake)return state.profile.wakeTarget||'08:00';const ov=state.records[key]?.timeOverrides?.[occurrenceKey(wake)];return ov?.start||wake.start;}
function daySleepTime(date){const key=todayKey(date),sleep=dailySleepItem(date);if(!sleep)return state.profile.sleepTarget||'23:30';const ov=state.records[key]?.timeOverrides?.[occurrenceKey(sleep)];return ov?.start||sleep.start;}
function daySleepOffset(date){const key=todayKey(date),sleep=dailySleepItem(date);if(!sleep)return sleepDayOffsetForTime(state.profile.sleepTarget||'23:30');const ov=state.records[key]?.timeOverrides?.[occurrenceKey(sleep)];return Number(ov?.dayOffset??sleep.dayOffset??sleepDayOffsetForTime(ov?.start||sleep.start));}
function daySleepAbsoluteMinutes(date){return minutesFromTime(daySleepTime(date))+1440*daySleepOffset(date);}
function setDayWakeOverride(date,time){const key=todayKey(date),wake=dailyWakeItem(date);if(!wake)return false;const rec=ensureRecord(key),dur=durationMinutes(wake),start=minutesFromTime(time);rec.timeOverrides[occurrenceKey(wake)]={start:minutesToTime(start),end:minutesToTime(start+dur),dayOffset:0,manual:true,adaptive:false,dayAnchor:true};return true;}
function setDaySleepOverride(date,time){const key=todayKey(date),sleep=dailySleepItem(date);if(!sleep)return false;const rec=ensureRecord(key),dur=durationMinutes(sleep),off=sleepDayOffsetForTime(time),start=minutesFromTime(time);rec.timeOverrides[occurrenceKey(sleep)]={start:minutesToTime(start),end:minutesToTime(start+dur),dayOffset:off,manual:true,adaptive:false,dayAnchor:true};return true;}
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
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">DAY PLAN</p><h2>${escapeHTML(dayLong(date.getDay()))}, ${escapeHTML(formatDateShort(date))}</h2><p class="muted">Wake and sleep change only for this date. Your recurring routine stays untouched.</p><div class="stack"><label><span class="label">Wake time for this day</span><input class="input" id="futureWakeTime" type="time" value="${escapeAttr(currentWake)}"></label><label><span class="label">Sleep time for this night</span><input class="input" id="futureSleepTime" type="time" value="${escapeAttr(currentSleep)}"><small class="field-help">Times before noon are treated as after midnight on the following calendar day.</small></label><label class="switch-row"><input type="checkbox" id="keepFutureMoves" ${manualCount?'checked':''}><span><b>Keep my moves</b><small>Keep swaps and manual time changes while rebuilding around the new anchors.</small></span></label></div><button class="primary full" id="rebuildFutureDay" style="margin-top:14px">Save + rebuild day</button><button class="secondary full" id="saveAnchorsOnly" style="margin-top:8px">Save anchors only</button><button class="secondary full" id="resetFutureDay" style="margin-top:8px">Reset day to routine</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  const saveAnchors=()=>{const wake=$('#futureWakeTime').value||currentWake,sleep=$('#futureSleepTime').value||currentSleep;setDayWakeOverride(date,wake);setDaySleepOverride(date,sleep);save();return {wake,sleep};};
  $('#rebuildFutureDay').onclick=()=>{const {wake,sleep}=saveAnchors(),keep=$('#keepFutureMoves').checked;if(isToday){const rec=ensureRecord(key),beforeWake=!rec.actualWakeAt&&currentMinutes()<minutesFromTime(wake);if(beforeWake){const plan=buildFutureDayPlan(date,keep,wake,sleep);applyFutureDayPlan(plan);}else{const plan=buildAdaptiveRestartPlan(new Date(),keep);applyAdaptiveRestart(plan);}}else{const plan=buildFutureDayPlan(date,keep,wake,sleep);applyFutureDayPlan(plan);}modal.close();render();toast(isToday?'Today rebuilt':'Day rebuilt');};
  $('#saveAnchorsOnly').onclick=()=>{saveAnchors();modal.close();render();toast('Day anchors saved');};
  $('#resetFutureDay').onclick=()=>{const rec=ensureRecord(key);rec.timeOverrides={};delete rec.futurePlannedAt;save();modal.close();render();toast('Day restored to recurring routine');};
  $('#cancelModal').onclick=()=>modal.close();localizeTree(modalContent);
}
function openFutureDayPlanner(date){openDayAnchorPlanner(date);}

function captureWeekEditContext(){if(state.settings.activeTab==='week')weekEditContext={date:state.settings.selectedWeekDate||todayKey(),scrollY:window.scrollY};else weekEditContext=null;}
function renderAfterEditor(){if(state.settings.activeTab==='week'&&weekEditContext){const ctx=weekEditContext;weekEditContext=null;state.settings.selectedWeekDate=ctx.date;save();renderWeek();requestAnimationFrame(()=>window.scrollTo({top:ctx.scrollY,behavior:'auto'}));}else{weekEditContext=null;render();}}

function openScheduleManager() {
  const sorted=[...state.schedule].sort((a,b)=>minutesFromTime(a.start)-minutesFromTime(b.start));
  modalContent.innerHTML=`<div class="sheet-handle"></div><div class="row between center"><div><p class="eyebrow">WEEKLY ROUTINE</p><h2>Recurring schedule</h2></div><button class="icon-button" id="closeModal" aria-label="Close">${svgIcon('close')}</button></div><p class="muted tiny">Your university timetable is preloaded. Fixed items stay in place during an adaptive restart. You can still edit or add recurring items.</p><div class="stack" style="margin-top:14px">${sorted.map(s=>`<button class="more-link" data-routine-edit="${s.id}"><span><b>${escapeHTML(s.title)}</b><small>${escapeHTML(s.days.map(d=>DAY_SHORT[d]).join(', '))} · ${escapeHTML(timeWindow(s))}</small></span><span class="tool-chevron">${svgIcon('chevronRight')}</span></button>`).join('')}</div><button class="primary full" id="addRoutineInside" style="margin-top:14px">+ Add recurring item</button>`;
  modal.showModal();
  $('#closeModal').onclick=()=>modal.close();
  $('#addRoutineInside').onclick=()=>openScheduleItemModal();
  $$('[data-routine-edit]').forEach(b=>b.onclick=()=>openScheduleItemModal(b.dataset.routineEdit));
}

function openScheduleItemModal(id=null,preset={}) {
  captureWeekEditContext();
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
  </div><button class="primary full" id="saveSchedule" style="margin-top:14px">Save recurring item</button>${existing&&!isDayAnchor(item)?'<button class="danger-btn full" id="deleteSchedule" style="margin-top:8px">Delete recurring item</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveSchedule').onclick=()=>{
    const title=$('#schedTitle').value.trim(); const days=$$('[data-repeat-day]').filter(x=>x.checked).map(x=>Number(x.dataset.repeatDay));
    if(!title)return toast('Add a title'); if(!days.length)return toast('Choose at least one day');
    const startTime=$('#schedStart').value||'09:00', endTime=$('#schedEnd').value||'10:00', startDate=$('#schedStartDate').value||'', endDate=$('#schedEndDate').value||'';
    if(minutesFromTime(endTime)<=minutesFromTime(startTime))return toast('End time must be after start time');
    if(startDate&&endDate&&endDate<startDate)return toast('End date must be after start date');
    const anchor=isDayAnchor(item);const data={title,days,start:startTime,end:endTime,category:$('#schedCategory').value,detail:$('#schedDetail').value.trim(),active:true,fixed:anchor?true:$('#schedFixed').checked,startDate,endDate};
    if(anchor){data.manualLocked=true;data.anchor=item.anchor;}
    if(existing){Object.assign(existing,data);if(existing.id==='wake')state.profile.wakeTarget=data.start;if(existing.id==='sleep')state.profile.sleepTarget=data.start;}else state.schedule.push({id:uid('sched'),...data});save();modal.close();toast('Weekly schedule updated');renderAfterEditor();
  };
  if(existing&&!isDayAnchor(item)&&$('#deleteSchedule'))$('#deleteSchedule').onclick=()=>{state.schedule=state.schedule.filter(x=>x.id!==existing.id);save();modal.close();toast('Recurring item deleted');renderAfterEditor();};
  $('#cancelModal').onclick=()=>modal.close();
}

function openOneOffTaskModal(id=null,preset={}) {
  captureWeekEditContext();
  const existing=id?state.oneOffTasks.find(x=>x.id===id):null;
  const item=existing || {title:preset.title||'',date:preset.date||todayKey(),start:preset.start||'12:00',end:preset.end||'',category:preset.category||'Life',detail:preset.detail||'',fixed:!!preset.fixed};
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">ONE-OFF TASK</p><h2>${existing?'Edit task':'Add task'}</h2><div class="stack">
    <label><span class="label">Task</span><input class="input" id="oneTitle" value="${escapeAttr(item.title)}" placeholder="e.g. Buy groceries"></label>
    <label><span class="label">Date</span><input class="input" id="oneDate" type="date" value="${item.date}"></label>
    <div class="form-grid"><label><span class="label">Start</span><input class="input" id="oneStart" type="time" value="${item.start}"></label><label><span class="label">End (optional)</span><input class="input" id="oneEnd" type="time" value="${item.end||''}"></label></div>
    <label><span class="label">Category</span><select id="oneCategory">${CATEGORIES.map(c=>`<option ${c===item.category?'selected':''}>${c}</option>`).join('')}</select></label>
    <label class="switch-row"><input type="checkbox" id="oneFixed" ${item.fixed?'checked':''}><span><b>Fixed time / appointment</b><small>Use for meetings or anything Reset should never move.</small></span></label>
    <label><span class="label">Note</span><textarea id="oneDetail" placeholder="Keep it specific.">${escapeHTML(item.detail||'')}</textarea></label>
  </div><button class="primary full" id="saveOneTask" style="margin-top:14px">Save task</button>${existing?'<button class="danger-btn full" id="deleteOneTask" style="margin-top:8px">Delete task</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveOneTask').onclick=()=>{const title=$('#oneTitle').value.trim();if(!title)return toast('Add a task name');const startTime=$('#oneStart').value||'12:00', endTime=$('#oneEnd').value||'';if(endTime&&minutesFromTime(endTime)<=minutesFromTime(startTime))return toast('End time must be after start time');const data={title,date:$('#oneDate').value||todayKey(),start:startTime,end:endTime,category:$('#oneCategory').value,detail:$('#oneDetail').value.trim(),fixed:$('#oneFixed').checked};if(existing)Object.assign(existing,data);else state.oneOffTasks.push({id:uid('one'),...data});save();modal.close();toast('Task scheduled');renderAfterEditor();};
  if(existing)$('#deleteOneTask').onclick=()=>{state.oneOffTasks=state.oneOffTasks.filter(x=>x.id!==existing.id);save();modal.close();toast('Task deleted');renderAfterEditor();};
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
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">MONEY PLAN</p><h2>Edit monthly allocation</h2><div class="form-grid"><label><span class="label">Monthly income (SAR)</span><input class="input" id="incomeInput" type="number" min="0" value="${state.money.income}"></label><label><span class="label">Payday day of month</span><input class="input" id="paydayInput" type="number" min="1" max="31" value="${state.profile.paydayDay||29}"></label></div><hr><div id="bucketEditor" class="stack">${state.money.buckets.map(bucketEditorRow).join('')}</div><button class="secondary full" id="addBucketBtn" style="margin-top:10px">+ Add allocation bucket</button><button class="primary full" id="saveMoney" style="margin-top:14px">Save money plan</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#addBucketBtn').onclick=()=>{const wrap=document.createElement('div');wrap.innerHTML=bucketEditorRow({id:uid('bucket'),name:'New bucket',target:0});$('#bucketEditor').appendChild(wrap.firstElementChild);bindBucketDeleteButtons();};
  bindBucketDeleteButtons();
  $('#saveMoney').onclick=()=>{state.money.income=Math.max(0,Number($('#incomeInput').value||0));state.profile.paydayDay=clamp(Number($('#paydayInput').value||29),1,31);state.money.buckets=$$('.bucket-editor').map(row=>({id:row.dataset.bucketId||uid('bucket'),name:$('.bucket-name',row).value.trim()||'Bucket',target:Math.max(0,Number($('.bucket-target',row).value||0))}));captureCurrentMoneyPlan();save();modal.close();renderMoney();};
  $('#cancelModal').onclick=()=>modal.close();
}
function bucketEditorRow(b){return `<div class="course bucket-editor" data-bucket-id="${escapeAttr(b.id)}"><div class="row"><label style="flex:1"><span class="label">Bucket</span><input class="input bucket-name" value="${escapeAttr(b.name)}"></label><label style="width:130px"><span class="label">Monthly SAR</span><input class="input bucket-target" type="number" min="0" value="${Number(b.target||0)}"></label></div><button class="text-button danger-text bucket-delete" type="button">Remove</button></div>`;}
function bindBucketDeleteButtons(){ $$('.bucket-delete').forEach(b=>b.onclick=()=>{if($$('.bucket-editor').length<=1)return toast('Keep at least one bucket');b.closest('.bucket-editor').remove();}); }

function openExpenseModal(id=null) {
  const existing=id?state.money.transactions.find(t=>t.id===id):null;
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SPENDING</p><h2>${existing?'Edit':'Log'} an expense</h2><div class="stack"><label><span class="label">Amount (SAR)</span><input class="input" id="expenseAmount" type="number" min="0" step="0.01" inputmode="decimal" placeholder="0" value="${existing?.amount??''}"></label><label><span class="label">Allocation</span><select id="expenseBucket">${state.money.buckets.map(b=>`<option value="${b.id}" ${existing?.bucketId===b.id?'selected':''}>${escapeHTML(b.name)}</option>`).join('')}</select></label><label><span class="label">Date</span><input class="input" id="expenseDate" type="date" value="${existing?.date||todayKey()}"></label><label><span class="label">Note</span><input class="input" id="expenseNote" value="${escapeAttr(existing?.note||'')}" placeholder="e.g. takeaway, fuel, haircut"></label></div><button class="primary full" id="saveExpense" style="margin-top:14px">Save spending</button>${existing?'<button class="danger-btn full" id="deleteExpense" style="margin-top:8px">Delete entry</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveExpense').onclick=()=>{const amount=Number($('#expenseAmount').value||0);if(amount<=0)return toast('Enter an amount');const data={amount,bucketId:$('#expenseBucket').value,date:$('#expenseDate').value||todayKey(),note:$('#expenseNote').value.trim(),createdAt:existing?.createdAt||Date.now()};if(existing)Object.assign(existing,data);else state.money.transactions.push({id:uid('tx'),...data});save();modal.close();toast(existing?'Spending updated':'Spending logged');renderMoney();};
  if(existing)$('#deleteExpense').onclick=()=>{const idx=state.money.transactions.findIndex(t=>t.id===existing.id);if(idx<0)return;const removed=state.money.transactions[idx];state.money.transactions.splice(idx,1);save();modal.close();renderMoney();toast('Spending entry deleted','Undo',()=>{state.money.transactions.splice(Math.min(idx,state.money.transactions.length),0,removed);save();renderMoney();});};
  $('#cancelModal').onclick=()=>modal.close();
  localizeTree(modalContent);
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
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">BODY WEIGHT</p><h2>${existing?'Edit':'Log'} weight</h2><div class="stack"><label><span class="label">Weight (kg)</span><input class="input" id="bodyWeight" type="number" min="20" max="300" step="0.1" inputmode="decimal" value="${existing?Number(existing.weight):''}"></label><label><span class="label">Date</span><input class="input" id="bodyWeightDate" type="date" value="${existing?.date||todayKey()}"></label></div><button class="primary full" id="saveBodyWeight" style="margin-top:14px">Save</button>${existing?'<button class="danger-btn full" id="deleteBodyWeight" style="margin-top:8px">Delete entry</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveBodyWeight').onclick=()=>{const weight=Number($('#bodyWeight').value);if(!(weight>=20&&weight<=300))return toast('Enter a valid weight');const data={weight,date:$('#bodyWeightDate').value||todayKey(),createdAt:existing?.createdAt||Date.now()};if(existing)Object.assign(existing,data);else state.health.weightLogs.push({id:uid('weight'),...data});save();modal.close();renderHealth();toast(existing?'Weight updated':'Weight logged');};
  if(existing)$('#deleteBodyWeight').onclick=()=>{const idx=state.health.weightLogs.findIndex(x=>x.id===existing.id);if(idx<0)return;const removed=state.health.weightLogs[idx];state.health.weightLogs.splice(idx,1);save();modal.close();renderHealth();toast('Weight entry deleted','Undo',()=>{state.health.weightLogs.splice(Math.min(idx,state.health.weightLogs.length),0,removed);save();renderHealth();});};
  $('#cancelModal').onclick=()=>modal.close();
}


function sleepNightRecord(nightKey){
  const night=parseDateKey(nightKey),nextKey=todayKey(addDays(night,1)),sleepValue=state.records[nightKey]?.actualSleepAt||'',wakeValue=state.records[nextKey]?.actualWakeAt||'';
  const sleepDate=sleepValue?new Date(sleepValue):null,wakeDate=wakeValue?new Date(wakeValue):null;
  let durationHours=null;
  if(sleepDate&&wakeDate&&!Number.isNaN(sleepDate.getTime())&&!Number.isNaN(wakeDate.getTime())){
    const hours=(wakeDate-sleepDate)/36e5;if(hours>0&&hours<=20)durationHours=hours;
  }
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
function openSleepTargetModal(){const current=clamp(Number(state.profile.sleepDurationTarget||8),4,14);modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SLEEP</p><h2>Target duration</h2><p class="muted">This only changes your duration target. Your planned sleep and wake times stay separate.</p><div class="quick-value-row sleep-target-options">${[7,7.5,8,8.5,9].map(v=>`<button class="quick-value ${v===current?'active':''}" data-sleep-target="${v}">${v}h</button>`).join('')}</div><label><span class="label">Custom hours</span><input class="input" id="sleepTargetHours" type="number" min="4" max="14" step="0.25" value="${current}"></label><button class="primary full" id="saveSleepTarget" style="margin-top:14px">Save target</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;modal.showModal();$$('[data-sleep-target]').forEach(b=>b.onclick=()=>{$('#sleepTargetHours').value=b.dataset.sleepTarget;$$('[data-sleep-target]').forEach(x=>x.classList.toggle('active',x===b));});$('#saveSleepTarget').onclick=()=>{state.profile.sleepDurationTarget=clamp(Number($('#sleepTargetHours').value||8),4,14);save();modal.close();renderSleep();toast('Sleep target updated');};$('#cancelModal').onclick=()=>modal.close();localizeTree(modalContent);}
function openSleepNightModal(nightKey){
  const r=sleepNightRecord(nightKey),night=parseDateKey(nightKey),next=addDays(night,1),nextKey=todayKey(next);const plannedSleep=daySleepTime(night),plannedWake=dayWakeTime(next);let sleepValue=r.sleepValue,wakeValue=r.wakeValue;
  if(!sleepValue){const d=new Date(night),off=sleepDayOffsetForTime(plannedSleep);d.setDate(d.getDate()+off);const [h,m]=plannedSleep.split(':').map(Number);d.setHours(h,m,0,0);sleepValue=localDateTimeInput(d);}if(!wakeValue){const d=new Date(next);const [h,m]=plannedWake.split(':').map(Number);d.setHours(h,m,0,0);wakeValue=localDateTimeInput(d);}
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">SLEEP HISTORY</p><h2>${escapeHTML(formatDateShort(night))} night</h2><p class="muted">Sleep after midnight still belongs to this night.</p><div class="stack"><label><span class="label">Went to sleep</span><input class="input" id="sleepNightBed" type="datetime-local" value="${escapeAttr(sleepValue)}"></label><label><span class="label">Woke up</span><input class="input" id="sleepNightWake" type="datetime-local" value="${escapeAttr(wakeValue)}"></label></div><button class="primary full" id="saveSleepNight" style="margin-top:14px">Save night</button>${r.sleepValue||r.wakeValue?'<button class="danger-btn full" id="deleteSleepNight" style="margin-top:8px">Clear this night</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;modal.showModal();
  $('#saveSleepNight').onclick=()=>{const bed=$('#sleepNightBed').value,wake=$('#sleepNightWake').value;if(!bed||!wake)return toast('Choose both sleep and wake times');const bd=new Date(bed),wd=new Date(wake);if(Number.isNaN(bd.getTime())||Number.isNaN(wd.getTime())||wd<=bd)return toast('Wake time must be after sleep time');const hours=(wd-bd)/36e5;if(hours>20)return toast('That sleep duration looks too long');const sleepRec=ensureRecord(nightKey),wakeRec=ensureRecord(nextKey);sleepRec.actualSleepAt=bed;wakeRec.actualWakeAt=wake;const sleepItem=sleepItemForKey(nightKey),wakeItem=itemsForDate(next).find(i=>i.id==='wake');if(sleepItem)setStatus(sleepItem,nightKey,'done');if(wakeItem)setStatus(wakeItem,nextKey,'done');setDaySleepOverride(night,bed.slice(11,16));setDayWakeOverride(next,wake.slice(11,16));save();modal.close();renderSleep();toast('Sleep night saved');};
  if($('#deleteSleepNight'))$('#deleteSleepNight').onclick=()=>{const sleepRec=ensureRecord(nightKey),wakeRec=ensureRecord(nextKey);delete sleepRec.actualSleepAt;delete wakeRec.actualWakeAt;const sleepItem=sleepItemForKey(nightKey),wakeItem=itemsForDate(next).find(i=>i.id==='wake');if(sleepItem)setStatus(sleepItem,nightKey,'pending');if(wakeItem)setStatus(wakeItem,nextKey,'pending');save();modal.close();renderSleep();toast('Sleep night cleared');};$('#cancelModal').onclick=()=>modal.close();localizeTree(modalContent);
}


function exercisePR(exerciseId,excludeId=null){const logs=(state.gym.logs||[]).filter(l=>l.exerciseId===exerciseId&&l.id!==excludeId);return logs.length?Math.max(...logs.map(l=>Number(l.weight||0))):0;}
function exerciseById(id){return (state.gym.exercises||[]).find(x=>x.id===id)||null;}
function exerciseTargets(ex){return [...new Set([ex?.group,...(Array.isArray(ex?.targets)?ex.targets:[])].filter(Boolean))];}
function workoutFocuses(){return ['Full Body','Upper Body','Lower Body','Custom'];}
function validPresetIds(name){const defaults=defaultWorkoutPresets(),source=Array.isArray(state.gym.workoutPresets?.[name])?state.gym.workoutPresets[name]:(defaults[name]||[]),valid=new Set((state.gym.exercises||[]).map(x=>x.id));return source.filter(id=>valid.has(id));}
function bodyRegionForExercise(ex){const t=exerciseTargets(ex);if(t.includes('Core'))return 'Core';if(t.some(x=>['Quads','Hamstrings','Glutes','Calves','Legs'].includes(x)))return 'Lower Body';if(t.some(x=>['Chest','Back','Shoulders','Rear Delts','Biceps','Triceps','Traps','Forearms','Arms'].includes(x)))return 'Upper Body';return 'Other';}
function sessionWorkoutLog(workoutId,exerciseId){return [...(state.gym.logs||[])].filter(l=>l.workoutId===workoutId&&l.exerciseId===exerciseId).sort((a,b)=>Number(b.createdAt||0)-Number(a.createdAt||0))[0]||null;}
function latestExerciseLog(exerciseId,excludeId=null){return [...(state.gym.logs||[])].filter(l=>l.exerciseId===exerciseId&&l.id!==excludeId).sort((a,b)=>String(b.date).localeCompare(String(a.date))||Number(b.createdAt||0)-Number(a.createdAt||0))[0]||null;}
function smartWeightOptions(exerciseId,current=null){const prior=latestExerciseLog(exerciseId,current?.id||null),base=Number(current?.weight||prior?.weight||20),step=base<20?2.5:5;return [...new Set([base-step,base-step/2,base,base+step/2,base+step].map(x=>Math.max(.5,Math.round(x*2)/2)))];}
function openWorkoutPlanner(){
  let focus='Full Body',temp={};workoutFocuses().forEach(name=>temp[name]=new Set(validPresetIds(name)));
  const draw=()=>{const selected=temp[focus],all=state.gym.exercises||[],defaults=defaultWorkoutPresets(),count=selected.size;modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">START WORKOUT</p><h2>Build today’s workout</h2><div class="focus-chip-wrap workout-four">${workoutFocuses().map(x=>`<button class="focus-chip ${x===focus?'active':''}" data-workout-focus="${escapeAttr(x)}">${escapeHTML(x)}</button>`).join('')}</div><div class="workout-builder-head"><div><small>${escapeHTML(focus.toUpperCase())}</small><b>${count} exercise${count===1?'':'s'} selected</b></div><button class="text-button" id="resetWorkoutPreset">${focus==='Custom'?'Clear':'Reset default'}</button></div><div class="exercise-pick-grid">${all.map(ex=>`<label class="exercise-pick ${selected.has(ex.id)?'selected':''}"><input type="checkbox" data-workout-pick="${escapeAttr(ex.id)}" ${selected.has(ex.id)?'checked':''}><span class="exercise-pick-check">${selected.has(ex.id)?svgIcon('check'):''}</span><span><b>${escapeHTML(ex.name)}</b><small>${escapeHTML(ex.group||'Other')}</small></span></label>`).join('')}</div><button class="primary full" id="startPlannedWorkout" ${count?'':'disabled'}>Start ${escapeHTML(focus)} workout</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;modal.showModal();
    $$('[data-workout-focus]',modalContent).forEach(b=>b.onclick=()=>{focus=b.dataset.workoutFocus;draw();});
    $$('[data-workout-pick]',modalContent).forEach(cb=>cb.onchange=()=>{if(cb.checked)selected.add(cb.dataset.workoutPick);else selected.delete(cb.dataset.workoutPick);draw();});
    $('#resetWorkoutPreset').onclick=()=>{temp[focus]=new Set((defaults[focus]||[]).filter(id=>exerciseById(id)));draw();};
    $('#startPlannedWorkout').onclick=()=>{const ids=[...temp[focus]];if(!ids.length)return toast('Choose at least one exercise');if(!state.gym.workoutPresets)state.gym.workoutPresets=defaultWorkoutPresets();state.gym.workoutPresets[focus]=ids;state.gym.activeWorkout={id:uid('workout'),date:todayKey(),focus,exerciseIds:ids,completedExerciseIds:[],startedAt:new Date().toISOString()};save();modal.close();renderGym();toast(`${focus} workout started`);};
    $('#cancelModal').onclick=()=>modal.close();localizeTree(modalContent);
  };draw();
}
function activeWorkoutHTML(){
  const w=state.gym.activeWorkout;if(!w||w.date!==todayKey())return '';
  const exercises=(w.exerciseIds||[]).map(exerciseById).filter(Boolean),logs=new Map(exercises.map(ex=>[ex.id,sessionWorkoutLog(w.id,ex.id)])),done=exercises.filter(ex=>logs.get(ex.id)).length;
  return `<section class="active-workout-card"><div class="row between center"><div><span>IN PROGRESS</span><h3>${escapeHTML(w.focus||'Workout')}</h3></div><b>${done}/${exercises.length}</b></div><div class="weekbar"><span style="width:${exercises.length?Math.round(done/exercises.length*100):0}%"></span></div><div class="active-workout-list">${exercises.map(ex=>{const log=logs.get(ex.id);return `<div class="active-workout-row ${log?'done':''}"><span class="workout-check">${log?svgIcon('check'):''}</span><div><b>${escapeHTML(ex.name)}</b><small>${log?`${Number(log.weight)} kg · ${Number(log.sets)} × ${Number(log.reps)}`:`${escapeHTML(ex.group||'Other')} · not logged yet`}</small></div><button class="secondary tiny-workout-btn" data-workout-log="${escapeAttr(ex.id)}">${log?'Edit':'Log'}</button></div>`}).join('')}</div><button class="success-btn full" id="finishWorkoutBtn">${svgIcon('check')} Finish workout</button><button class="text-button full" id="cancelWorkoutBtn">Cancel workout</button></section>`;
}
function markActiveWorkoutExercise(exerciseId){const w=state.gym.activeWorkout;if(!w||w.date!==todayKey())return;if(!Array.isArray(w.completedExerciseIds))w.completedExerciseIds=[];if(!w.completedExerciseIds.includes(exerciseId))w.completedExerciseIds.push(exerciseId);}
function confirmWorkoutAction(kind){
  const w=state.gym.activeWorkout;if(!w)return;const total=(w.exerciseIds||[]).length,done=(w.exerciseIds||[]).filter(id=>sessionWorkoutLog(w.id,id)).length,isFinish=kind==='finish';
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">WORKOUT</p><h2>${isFinish?'Finish this workout?':'Cancel this workout?'}</h2><p class="muted">${isFinish?(done<total?`You logged ${done} of ${total} exercises. You can still finish if you intentionally skipped the rest.`:`All ${total} exercises are logged.`):'The active workout plan will close. Exercise logs you already saved will stay in your history.'}</p><button class="${isFinish?'success-btn':'danger-btn'} full" id="confirmWorkoutAction" style="margin-top:14px">${isFinish?'Finish workout':'Cancel workout'}</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Go back</button>`;modal.showModal();
  $('#confirmWorkoutAction').onclick=()=>{if(isFinish){const k=todayKey();state.gym.sessionExcluded=state.gym.sessionExcluded.filter(x=>x!==k);if(!state.gym.sessions.includes(k))state.gym.sessions.push(k);toast('Workout finished');}else toast('Workout cancelled');state.gym.activeWorkout=null;save();modal.close();renderGym();};$('#cancelModal').onclick=()=>modal.close();
}
function finishActiveWorkout(){confirmWorkoutAction('finish');}
function cancelActiveWorkout(){confirmWorkoutAction('cancel');}
function prSectionHTML(title,rows){return `<div class="pr-section"><div class="pr-section-title"><b>${escapeHTML(title)}</b><span>${rows.length}</span></div>${rows.length?rows.map(({ex,pr})=>`<div class="pr-row"><div><b>${escapeHTML(ex.name)}</b><small>${escapeHTML(ex.group||'')}</small></div><strong>${Number(pr)} kg</strong></div>`).join(''):'<div class="empty-state compact-empty">No PRs yet.</div>'}</div>`;}
function renderGym(){
  setHeader('Gym');
  const sessions=gymSessionDates(),view=state.settings.gymView||'workouts',weeklyGoal=clamp(Number(state.gym.weeklyGoal||3),1,7),groupFilter=state.settings.gymGroupFilter||'All',filteredExercises=(state.gym.exercises||[]).filter(ex=>groupFilter==='All'||exerciseTargets(ex).includes(groupFilter));
  let exercise=filteredExercises.find(x=>x.id===state.settings.selectedExerciseId)||filteredExercises[0]||state.gym.exercises[0]||null;if(exercise)state.settings.selectedExerciseId=exercise.id;
  const logs=(state.gym.logs||[]).filter(l=>l.exerciseId===exercise?.id).sort((a,b)=>String(a.date).localeCompare(String(b.date))||Number(a.createdAt||0)-Number(b.createdAt||0)),allLogs=[...(state.gym.logs||[])].sort((a,b)=>String(b.date).localeCompare(String(a.date))||Number(b.createdAt||0)-Number(a.createdAt||0));
  const historyFilter=state.settings.gymHistoryExercise||'all',historyLogs=historyFilter==='all'?allLogs:allLogs.filter(l=>l.exerciseId===historyFilter),historyExpanded=!!state.settings.gymHistoryExpanded,displayHistory=historyExpanded?historyLogs:allLogs.slice(0,8);
  const first=logs[0],last=logs[logs.length-1],change=first&&last?Number(last.weight)-Number(first.weight):0,pr=exercise?exercisePR(exercise.id):0,weekStart=startOfWeek(new Date()),weekKeys=new Set(Array.from({length:7},(_,i)=>todayKey(addDays(weekStart,i)))),weekSessions=[...sessions].filter(k=>weekKeys.has(k)).sort(),recentSessions=[...sessions].sort().reverse();
  const prRows=state.gym.exercises.map(ex=>({ex,pr:exercisePR(ex.id),region:bodyRegionForExercise(ex)})).filter(x=>x.pr>0).sort((a,b)=>b.pr-a.pr),upper=prRows.filter(x=>x.region==='Upper Body'),lower=prRows.filter(x=>x.region==='Lower Body'),core=prRows.filter(x=>x.region==='Core'),other=prRows.filter(x=>x.region==='Other');
  let body='';
  if(view==='workouts')body=`${activeWorkoutHTML()}<section class="gym-week-card"><div class="row between center"><div><span>This Week</span><b>${weekSessions.length} session${weekSessions.length===1?'':'s'}</b></div><button class="goal-pill" id="editGymGoalBtn">Goal ${weeklyGoal}</button></div><div class="weekbar"><span style="width:${Math.min(100,weekSessions.length/weeklyGoal*100)}%"></span></div><small class="gym-goal-copy">${weekSessions.length>=weeklyGoal?'Weekly goal reached':`${Math.max(0,weeklyGoal-weekSessions.length)} to go`}</small></section>${state.gym.activeWorkout?.date===todayKey()?'':`<button class="primary full" id="startWorkoutBtn">Start Workout</button><section class="workout-type-list gym-focus-guide"><div class="workout-type"><span class="workout-icon">${svgIcon('spark')}</span><div><b>Choose your workout</b><small>Full Body, Upper Body, Lower Body or Custom. Every exercise stays editable before you start.</small></div></div></section>`}<div class="section-title"><h2>Recent Sessions</h2><button data-gym-view="history">See all</button></div><section class="recent-session-list">${recentSessions.slice(0,5).map(k=>`<div class="workout-type done"><span class="workout-icon">${svgIcon('dumbbell')}</span><div><b>Workout</b><small>${formatDateShort(parseDateKey(k))}</small></div></div>`).join('')||'<div class="empty-state">No workout days logged yet.</div>'}</section>`;
  if(view==='progress')body=`<div class="section-title first-section"><h2>Strength Progress</h2><div class="row"><button class="secondary small-btn" id="manageExercisesBtn">Manage</button><button id="addExerciseBtn">+ Exercise</button></div></div><div class="muscle-filter-strip">${['All',...GYM_GROUPS.filter(g=>g!=='Other')].map(g=>`<button class="focus-chip ${g===groupFilter?'active':''}" data-gym-group="${escapeAttr(g)}">${escapeHTML(g)}</button>`).join('')}</div>${state.gym.exercises.length?`<section class="card flat"><label><span class="label">Exercise</span><select id="gymExerciseSelect">${filteredExercises.map(x=>`<option value="${escapeAttr(x.id)}" ${x.id===exercise?.id?'selected':''}>${escapeHTML(x.name)} · ${escapeHTML(x.group||'')}</option>`).join('')}</select></label>${exercise?`<section class="progress-color-grid gym-metrics"><article class="pmetric blue"><small>First</small><b>${first?Number(first.weight):'—'}</b><em>kg</em></article><article class="pmetric green"><small>Current</small><b>${last?Number(last.weight):'—'}</b><em>kg</em></article><article class="pmetric yellow"><small>PR</small><b>${pr||'—'}</b><em>kg</em></article><article class="pmetric purple"><small>Change</small><b>${logs.length>1?(change>0?'+':'')+change:'—'}</b><em>kg</em></article></section>${gymChartHTML(logs)}`:'<div class="empty-state">No exercise in this muscle group yet.</div>'}</section><button class="primary full" id="logGymBtn">+ Log exercise</button>`:`<section class="card flat empty-state">No exercises yet. Add one to start tracking strength.</section>`}<div class="section-title"><h2>Personal Bests</h2></div><section class="card flat pr-groups">${prSectionHTML('Upper Body',upper)}${prSectionHTML('Lower Body',lower)}${prSectionHTML('Core',core)}${other.length?prSectionHTML('Other',other):''}</section>`;
  if(view==='history')body=`<div class="section-title first-section"><h2>${historyExpanded?'All Exercise Logs':'Recent Exercise Logs'}</h2><div class="row"><button class="secondary small-btn" id="toggleGymHistory">${historyExpanded?'Recent':'View all'}</button><button class="secondary small-btn" id="selectGymBtn">${historySelectMode.gym?'Done':'Select'}</button></div></div>${historyExpanded?`<label class="history-exercise-filter"><span class="label">Show</span><select id="gymHistoryFilter"><option value="all" ${historyFilter==='all'?'selected':''}>All exercises</option>${state.gym.exercises.map(x=>`<option value="${escapeAttr(x.id)}" ${historyFilter===x.id?'selected':''}>${escapeHTML(x.name)}</option>`).join('')}</select></label>`:''}${historySelectToolbar('gym')}<section class="card flat">${displayHistory.length?displayHistory.map(l=>{const ex=exerciseById(l.exerciseId);return `<div class="gym-log">${historySelectMode.gym?historySelectCheckbox('gym',l.id):''}<div><b>${escapeHTML(ex?.name||'Deleted exercise')} · ${Number(l.weight)} kg</b><small>${escapeHTML(formatDateShort(parseDateKey(l.date)))} · ${escapeHTML(ex?.group||'Other')} · ${Number(l.sets||0)||'—'} × ${Number(l.reps||0)||'—'}</small></div>${historySelectMode.gym?'':`<div class="row"><button class="text-button tiny" data-edit-gym="${l.id}">Edit</button><button class="text-button tiny danger-text" data-del-gym="${l.id}">Delete</button></div>`}</div>`}).join(''):'<div class="empty-state">No exercise logs match this view.</div>'}</section><div class="section-title"><h2>Workout Days</h2><button class="secondary small-btn" id="selectWorkoutBtn">${historySelectMode.workout?'Done':'Select'}</button></div>${historySelectToolbar('workout')}<section class="card flat">${recentSessions.length?recentSessions.map(k=>`<div class="gym-log">${historySelectMode.workout?historySelectCheckbox('workout',k):''}<div><b>${escapeHTML(formatDateShort(parseDateKey(k)))}</b><small>Workout session</small></div>${historySelectMode.workout?'':`<button class="text-button tiny danger-text" data-del-session="${k}">Remove</button>`}</div>`).join(''):'<div class="empty-state">No workout days logged yet.</div>'}</section>`;
  main.innerHTML=`${moreBack()}<div class="segmented gym-tabs"><button data-gym-view="workouts" class="${view==='workouts'?'active':''}">Workouts</button><button data-gym-view="progress" class="${view==='progress'?'active':''}">Progress</button><button data-gym-view="history" class="${view==='history'?'active':''}">History</button></div>${body}`;bindMoreBack();
  $$('[data-gym-view]').forEach(b=>b.onclick=()=>{state.settings.gymView=b.dataset.gymView;save();renderGym();});$$('[data-gym-group]').forEach(b=>b.onclick=()=>{state.settings.gymGroupFilter=b.dataset.gymGroup;const pool=(state.gym.exercises||[]).filter(ex=>b.dataset.gymGroup==='All'||exerciseTargets(ex).includes(b.dataset.gymGroup));if(pool.length)state.settings.selectedExerciseId=pool[0].id;save();renderGym();});if($('#gymExerciseSelect'))$('#gymExerciseSelect').onchange=e=>{state.settings.selectedExerciseId=e.target.value;save();renderGym();};if($('#gymHistoryFilter'))$('#gymHistoryFilter').onchange=e=>{state.settings.gymHistoryExercise=e.target.value;historySelected.gym.clear();historySelectMode.gym=false;save();renderGym();};if($('#toggleGymHistory'))$('#toggleGymHistory').onclick=()=>{state.settings.gymHistoryExpanded=!historyExpanded;if(!state.settings.gymHistoryExpanded)state.settings.gymHistoryExercise='all';historySelected.gym.clear();historySelectMode.gym=false;save();renderGym();};if($('#logGymBtn'))$('#logGymBtn').onclick=()=>openGymLogModal();if($('#startWorkoutBtn'))$('#startWorkoutBtn').onclick=()=>{if(state.gym.activeWorkout?.date===todayKey())return toast('Your workout is already in progress');openWorkoutPlanner();};$$('[data-workout-log]').forEach(b=>b.onclick=()=>openGymLogModal(null,b.dataset.workoutLog));if($('#finishWorkoutBtn'))$('#finishWorkoutBtn').onclick=finishActiveWorkout;if($('#cancelWorkoutBtn'))$('#cancelWorkoutBtn').onclick=cancelActiveWorkout;if($('#addExerciseBtn'))$('#addExerciseBtn').onclick=()=>openExerciseModal();if($('#manageExercisesBtn'))$('#manageExercisesBtn').onclick=openExerciseManager;if($('#editGymGoalBtn'))$('#editGymGoalBtn').onclick=openGymGoalModal;if($('#selectGymBtn'))$('#selectGymBtn').onclick=()=>historySelectToggle('gym',renderGym);if($('#selectWorkoutBtn'))$('#selectWorkoutBtn').onclick=()=>historySelectToggle('workout',renderGym);$$('[data-edit-gym]').forEach(b=>b.onclick=()=>openGymLogModal(b.dataset.editGym));$$('[data-del-gym]').forEach(b=>b.onclick=()=>{const idx=state.gym.logs.findIndex(l=>l.id===b.dataset.delGym);if(idx<0)return;const removed=state.gym.logs[idx];state.gym.logs.splice(idx,1);save();renderGym();toast('Exercise log deleted','Undo',()=>{state.gym.logs.splice(Math.min(idx,state.gym.logs.length),0,removed);save();renderGym();});});$$('[data-del-session]').forEach(b=>b.onclick=()=>{const k=b.dataset.delSession,existed=state.gym.sessions.includes(k);state.gym.sessions=state.gym.sessions.filter(x=>x!==k);if(!state.gym.sessionExcluded.includes(k))state.gym.sessionExcluded.push(k);save();renderGym();toast('Workout day removed','Undo',()=>{state.gym.sessionExcluded=state.gym.sessionExcluded.filter(x=>x!==k);if(existed&&!state.gym.sessions.includes(k))state.gym.sessions.push(k);save();renderGym();});});bindHistorySelection('gym',renderGym,ids=>{const set=new Set(ids),removed=state.gym.logs.map((item,index)=>({item,index})).filter(x=>set.has(x.item.id));state.gym.logs=state.gym.logs.filter(x=>!set.has(x.id));historySelected.gym.clear();historySelectMode.gym=false;save();renderGym();toast(`${removed.length} exercise logs deleted`,'Undo',()=>{restoreDeletedObjects(state.gym.logs,removed);save();renderGym();});});bindHistorySelection('workout',renderGym,ids=>{const set=new Set(ids),removed=state.gym.sessions.filter(k=>set.has(k));state.gym.sessions=state.gym.sessions.filter(k=>!set.has(k));removed.forEach(k=>{if(!state.gym.sessionExcluded.includes(k))state.gym.sessionExcluded.push(k);});historySelected.workout.clear();historySelectMode.workout=false;save();renderGym();toast(`${removed.length} workout days removed`,'Undo',()=>{removed.forEach(k=>{state.gym.sessionExcluded=state.gym.sessionExcluded.filter(x=>x!==k);if(!state.gym.sessions.includes(k))state.gym.sessions.push(k);});save();renderGym();});});localizeTree(main);
}
function gymChartHTML(logs){if(logs.length<2)return `<div class="chart-empty">Log this exercise at least twice to see a progress chart.</div>`;const pts=logs.slice(-12),vals=pts.map(x=>Number(x.weight||0)),min=Math.min(...vals),max=Math.max(...vals),span=Math.max(1,max-min),w=320,h=130,pad=18,coords=pts.map((x,i)=>({x:pad+(w-pad*2)*(i/Math.max(1,pts.length-1)),y:h-pad-(h-pad*2)*((Number(x.weight)-min)/span),v:Number(x.weight),date:x.date})),path=coords.map((p,i)=>`${i?'L':'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');return `<div class="gym-chart-wrap"><svg class="gym-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Weight progress chart"><path class="chart-line" d="${path}"/>${coords.map(p=>`<circle cx="${p.x}" cy="${p.y}" r="4"><title>${p.v} kg · ${escapeHTML(p.date)}</title></circle>`).join('')}<text x="${pad}" y="14">${max} kg</text><text x="${pad}" y="${h-3}">${min} kg</text></svg></div>`;}
function openGymLogModal(id=null,presetExerciseId=null){
  const active=state.gym.activeWorkout?.date===todayKey()?state.gym.activeWorkout:null,workoutExisting=!id&&presetExerciseId&&active?sessionWorkoutLog(active.id,presetExerciseId):null,existing=id?(state.gym.logs||[]).find(x=>x.id===id):workoutExisting,lockedExercise=!!(presetExerciseId&&active),initialId=existing?.exerciseId||presetExerciseId||state.settings.selectedExerciseId,ex=state.gym.exercises.find(x=>x.id===initialId)||state.gym.exercises[0];
  const drawQuickWeights=(exerciseId,current=existing)=>smartWeightOptions(exerciseId,current).map(v=>`<button type="button" class="quick-value" data-quick-weight="${v}">${v}</button>`).join('');
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">GYM LOG</p><h2>${existing?'Update':'Log'} exercise</h2><div class="stack">${lockedExercise?`<div class="locked-exercise-name"><small>Exercise</small><b>${escapeHTML(ex?.name||'Exercise')}</b></div>`:`<label><span class="label">Exercise</span><select id="gymLogExercise">${state.gym.exercises.map(x=>`<option value="${x.id}" ${x.id===ex?.id?'selected':''}>${escapeHTML(x.name)}</option>`).join('')}</select></label>`}<label><span class="label">Weight (kg)</span><div class="quick-value-row" id="quickWeightRow">${drawQuickWeights(ex?.id)}</div><input class="input" id="gymWeight" type="number" min="0" step="0.5" inputmode="decimal" value="${existing?Number(existing.weight):''}" placeholder="Type another weight"></label><div class="quick-log-grid"><label><span class="label">Sets</span><div class="quick-value-row compact">${[2,3,4,5].map(v=>`<button type="button" class="quick-value ${Number(existing?.sets||3)===v?'active':''}" data-quick-sets="${v}">${v}</button>`).join('')}</div><input class="input" id="gymSets" type="number" min="1" max="20" value="${Number(existing?.sets||3)}"></label><label><span class="label">Reps</span><div class="quick-value-row compact">${[6,8,10,12,15].map(v=>`<button type="button" class="quick-value ${Number(existing?.reps||10)===v?'active':''}" data-quick-reps="${v}">${v}</button>`).join('')}</div><input class="input" id="gymReps" type="number" min="1" max="100" value="${Number(existing?.reps||10)}"></label></div>${lockedExercise?'':`<label><span class="label">Date</span><input class="input" id="gymDate" type="date" value="${existing?.date||todayKey()}"></label>`}</div><button class="primary full" id="saveGymLog" style="margin-top:14px">${existing?'Update log':'Save log'}</button>${existing&&!workoutExisting?'<button class="danger-btn full" id="deleteGymLog" style="margin-top:8px">Delete log</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;modal.showModal();
  const bindQuick=()=>{$$('[data-quick-weight]',modalContent).forEach(b=>b.onclick=()=>{$('#gymWeight').value=b.dataset.quickWeight;$$('[data-quick-weight]',modalContent).forEach(x=>x.classList.toggle('active',x===b));});$$('[data-quick-sets]',modalContent).forEach(b=>b.onclick=()=>{$('#gymSets').value=b.dataset.quickSets;$$('[data-quick-sets]',modalContent).forEach(x=>x.classList.toggle('active',x===b));});$$('[data-quick-reps]',modalContent).forEach(b=>b.onclick=()=>{$('#gymReps').value=b.dataset.quickReps;$$('[data-quick-reps]',modalContent).forEach(x=>x.classList.toggle('active',x===b));});};bindQuick();
  if($('#gymLogExercise'))$('#gymLogExercise').onchange=e=>{$('#quickWeightRow').innerHTML=drawQuickWeights(e.target.value,null);bindQuick();};
  $('#saveGymLog').onclick=()=>{const exerciseId=lockedExercise?ex.id:$('#gymLogExercise').value,weight=Number($('#gymWeight').value);if(!(weight>0))return toast('Choose or type the weight you used');const date=lockedExercise?todayKey():($('#gymDate').value||todayKey()),priorPR=exercisePR(exerciseId,existing?.id||null),data={exerciseId,weight,sets:clamp(Number($('#gymSets').value||3),1,20),reps:clamp(Number($('#gymReps').value||10),1,100),date,createdAt:existing?.createdAt||Date.now(),workoutId:lockedExercise?active.id:(existing?.workoutId||null)};if(existing)Object.assign(existing,data);else state.gym.logs.push({id:uid('gymlog'),...data});state.gym.sessionExcluded=state.gym.sessionExcluded.filter(k=>k!==date);state.settings.selectedExerciseId=exerciseId;if(lockedExercise)markActiveWorkoutExercise(exerciseId);save();modal.close();renderGym();toast(weight>priorPR?`New PR: ${weight} kg`:(existing?'Gym log updated':'Gym progress saved'));};
  if(existing&&!workoutExisting&&$('#deleteGymLog'))$('#deleteGymLog').onclick=()=>{const idx=state.gym.logs.findIndex(l=>l.id===existing.id);if(idx<0)return;const removed=state.gym.logs[idx];state.gym.logs.splice(idx,1);save();modal.close();renderGym();toast('Exercise log deleted','Undo',()=>{state.gym.logs.splice(Math.min(idx,state.gym.logs.length),0,removed);save();renderGym();});};$('#cancelModal').onclick=()=>modal.close();localizeTree(modalContent);
}
function openExerciseModal(id=null){
  const existing=id?(state.gym.exercises||[]).find(x=>x.id===id):null;modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">GYM</p><h2>${existing?'Edit exercise':'Add an exercise'}</h2><div class="stack"><label><span class="label">Exercise name</span><input class="input" id="exerciseName" value="${escapeAttr(existing?.name||'')}" placeholder="e.g. Incline dumbbell press"></label><label><span class="label">Muscle group</span><select id="exerciseGroup">${[...new Set([existing?.group,...GYM_GROUPS].filter(Boolean))].map(g=>`<option value="${escapeAttr(g)}" ${g===(existing?.group||'Other')?'selected':''}>${escapeHTML(g)}</option>`).join('')}</select></label></div><button class="primary full" id="saveExercise" style="margin-top:14px">${existing?'Save':'Add exercise'}</button>${existing?'<button class="danger-btn full" id="deleteExercise" style="margin-top:8px">Delete exercise</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;modal.showModal();$('#saveExercise').onclick=()=>{const name=$('#exerciseName').value.trim();if(!name)return toast('Add an exercise name');if(existing){existing.name=name;existing.group=$('#exerciseGroup').value||'Other';existing.targets=[existing.group];}else{const x={id:uid('exercise'),name,group:$('#exerciseGroup').value||'Other',targets:[$('#exerciseGroup').value||'Other']};state.gym.exercises.push(x);state.settings.selectedExerciseId=x.id;}save();modal.close();renderGym();toast(existing?'Exercise updated':'Exercise added');};if(existing&&$('#deleteExercise'))$('#deleteExercise').onclick=()=>{const exIndex=state.gym.exercises.findIndex(x=>x.id===existing.id),removedExercise={...existing},removedLogs=(state.gym.logs||[]).map((item,index)=>({item,index})).filter(x=>x.item.exerciseId===existing.id),presetSnapshot=JSON.parse(JSON.stringify(state.gym.workoutPresets||{})),activeWorkoutSnapshot=state.gym.activeWorkout?JSON.parse(JSON.stringify(state.gym.activeWorkout)):null;state.gym.exercises.splice(exIndex,1);state.gym.logs=state.gym.logs.filter(l=>l.exerciseId!==existing.id);Object.keys(state.gym.workoutPresets||{}).forEach(k=>state.gym.workoutPresets[k]=(state.gym.workoutPresets[k]||[]).filter(id=>id!==existing.id));if(state.gym.activeWorkout){state.gym.activeWorkout.exerciseIds=(state.gym.activeWorkout.exerciseIds||[]).filter(id=>id!==existing.id);state.gym.activeWorkout.completedExerciseIds=(state.gym.activeWorkout.completedExerciseIds||[]).filter(id=>id!==existing.id);}state.settings.selectedExerciseId=state.gym.exercises[0]?.id||'';save();modal.close();renderGym();toast('Exercise deleted','Undo',()=>{state.gym.exercises.splice(Math.max(0,Math.min(exIndex,state.gym.exercises.length)),0,removedExercise);restoreDeletedObjects(state.gym.logs,removedLogs);state.gym.workoutPresets=presetSnapshot;if(activeWorkoutSnapshot)state.gym.activeWorkout=activeWorkoutSnapshot;state.settings.selectedExerciseId=removedExercise.id;save();renderGym();});};$('#cancelModal').onclick=()=>modal.close();localizeTree(modalContent);
}
function openExerciseManager(){modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">GYM</p><h2>Manage exercises</h2><div class="exercise-manage-list">${state.gym.exercises.length?state.gym.exercises.map(ex=>`<div class="exercise-manage-row"><div><b>${escapeHTML(ex.name)}</b><small>${escapeHTML(ex.group||'Other')}</small></div><button class="secondary small-btn" data-edit-exercise="${escapeAttr(ex.id)}">Edit</button></div>`).join(''):'<div class="empty-state">No exercises yet.</div>'}</div><button class="primary full" id="managerAddExercise" style="margin-top:12px">+ Add exercise</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Close</button>`;modal.showModal();$$('[data-edit-exercise]').forEach(b=>b.onclick=()=>{modal.close();openExerciseModal(b.dataset.editExercise);});$('#managerAddExercise').onclick=()=>{modal.close();openExerciseModal();};$('#cancelModal').onclick=()=>modal.close();localizeTree(modalContent);}
function openGymGoalModal(){const current=clamp(Number(state.gym.weeklyGoal||3),1,7);modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">GYM</p><h2>Weekly goal</h2><p class="muted">Choose how many workout days you want in a normal week. This is a target, not a fixed program.</p><div class="goal-picker">${Array.from({length:7},(_,i)=>i+1).map(n=>`<button class="goal-number ${n===current?'active':''}" data-goal="${n}">${n}</button>`).join('')}</div><button class="secondary full" id="cancelModal" style="margin-top:12px">Cancel</button>`;modal.showModal();$$('[data-goal]').forEach(b=>b.onclick=()=>{state.gym.weeklyGoal=clamp(Number(b.dataset.goal),1,7);save();modal.close();renderGym();toast(`Weekly goal set to ${state.gym.weeklyGoal}`);});$('#cancelModal').onclick=()=>modal.close();localizeTree(modalContent);}

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
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">CAR</p><h2>Update odometer</h2><div class="odo-picker"><small>Current reading</small><strong id="odoPickerValue">${original.toLocaleString(currentLocale())}</strong><span>km</span><input id="odoRange" type="range" min="${min}" max="${max}" step="10" value="${original}" aria-label="Odometer"></div><div class="odo-steps"><button data-odo-step="-100">−100</button><button data-odo-step="-10">−10</button><button data-odo-step="10">+10</button><button data-odo-step="100">+100</button></div><button class="primary full" id="saveOdo" style="margin-top:14px">Save odometer</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();const label=$('#odoPickerValue'),range=$('#odoRange');const draw=()=>{value=Math.max(0,Math.round(value));label.textContent=value.toLocaleString(currentLocale());range.value=String(clamp(value,Number(range.min),Number(range.max)));};range.oninput=()=>{value=Number(range.value);draw();};$$('[data-odo-step]').forEach(b=>b.onclick=()=>{value+=Number(b.dataset.odoStep);draw();});$('#saveOdo').onclick=()=>{c.odometer=value;save();modal.close();renderCar();toast('Odometer updated');};$('#cancelModal').onclick=()=>modal.close();localizeTree(modalContent);
}
function openCarModal(){const c=state.car;modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">CAR</p><h2>Edit car details</h2><div class="stack"><label><span class="label">Car</span><input class="input" id="carModel" value="${escapeAttr(c.model||'')}"></label><label><span class="label">Current odometer (km)</span><input class="input" id="carOdo" type="number" min="0" value="${Number(c.odometer||0)}"></label><div class="form-grid"><label><span class="label">Rego due</span><input class="input" id="carRego" type="date" value="${c.regoDue||''}"></label><label><span class="label">Service due date</span><input class="input" id="carServiceDate" type="date" value="${c.serviceDueDate||''}"></label></div><label><span class="label">Service due odometer (km)</span><input class="input" id="carServiceKm" type="number" min="0" value="${Number(c.serviceDueKm||0)||''}"></label></div><button class="primary full" id="saveCar" style="margin-top:14px">Save car</button><button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;modal.showModal();$('#saveCar').onclick=()=>{state.car.model=$('#carModel').value.trim()||'My car';state.car.odometer=Math.max(0,Number($('#carOdo').value||0));state.car.regoDue=$('#carRego').value||'';state.car.serviceDueDate=$('#carServiceDate').value||'';state.car.serviceDueKm=Math.max(0,Number($('#carServiceKm').value||0));save();modal.close();renderCar();};$('#cancelModal').onclick=()=>modal.close();}
function openFuelModal(id=null){const c=state.car;const existing=id?(c.fuelLogs||[]).find(x=>x.id===id):null;modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">CAR</p><h2>${existing?'Edit':'Log'} a fuel fill</h2><div class="stack"><div class="form-grid"><label><span class="label">Litres</span><input class="input" id="fuelLitres" type="number" min="0" step="0.1" value="${existing?Number(existing.litres):''}"></label><label><span class="label">Cost (SAR)</span><input class="input" id="fuelCost" type="number" min="0" step="1" value="${existing?Number(existing.cost||0):''}"></label></div><div class="form-grid"><label><span class="label">Odometer (km)</span><input class="input" id="fuelOdo" type="number" min="0" value="${existing?Number(existing.odometer||0):Number(c.odometer||0)}"></label><label><span class="label">Date</span><input class="input" id="fuelDate" type="date" value="${existing?.date||todayKey()}"></label></div></div><button class="primary full" id="saveFuel" style="margin-top:14px">Save fuel fill</button>${existing?'<button class="danger-btn full" id="deleteFuel" style="margin-top:8px">Delete entry</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;modal.showModal();$('#saveFuel').onclick=()=>{const litres=Number($('#fuelLitres').value||0),cost=Number($('#fuelCost').value||0),odometer=Number($('#fuelOdo').value||0);if(!(litres>0))return toast('Enter litres');if(odometer<0)return toast('Enter a valid odometer');const data={litres,cost:Math.max(0,cost),odometer,date:$('#fuelDate').value||todayKey()};if(existing)Object.assign(existing,data);else state.car.fuelLogs.push({id:uid('fuel'),...data});state.car.odometer=Math.max(Number(state.car.odometer||0),odometer);save();modal.close();renderCar();toast(existing?'Fuel entry updated':'Fuel fill saved');};if(existing)$('#deleteFuel').onclick=()=>{const idx=state.car.fuelLogs.findIndex(x=>x.id===existing.id);if(idx<0)return;const removed=state.car.fuelLogs[idx];state.car.fuelLogs.splice(idx,1);save();modal.close();renderCar();toast('Fuel entry deleted','Undo',()=>{state.car.fuelLogs.splice(Math.min(idx,state.car.fuelLogs.length),0,removed);save();renderCar();});};$('#cancelModal').onclick=()=>modal.close();}
function openMaintenanceModal(id=null){const c=state.car;const existing=id?(c.maintenanceLogs||[]).find(x=>x.id===id):null;modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">CAR MAINTENANCE</p><h2>${existing?'Edit':'Log'} maintenance</h2><div class="stack"><label><span class="label">What was done?</span><input class="input" id="maintService" value="${escapeAttr(existing?.service||'')}" placeholder="e.g. Engine oil + filter"></label><div class="form-grid"><label><span class="label">Date</span><input class="input" id="maintDate" type="date" value="${existing?.date||todayKey()}"></label><label><span class="label">Odometer (km)</span><input class="input" id="maintOdo" type="number" min="0" value="${existing?Number(existing.odometer||0):Number(c.odometer||0)}"></label></div><label><span class="label">Cost (SAR)</span><input class="input" id="maintCost" type="number" min="0" step="1" value="${existing?Number(existing.cost||0):''}"></label><label><span class="label">Short note (optional)</span><input class="input" id="maintNote" value="${escapeAttr(existing?.note||'')}" placeholder="fluid, parts, next check..."></label></div><button class="primary full" id="saveMaint" style="margin-top:14px">Save maintenance</button>${existing?'<button class="danger-btn full" id="deleteMaint" style="margin-top:8px">Delete entry</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;modal.showModal();$('#saveMaint').onclick=()=>{const service=$('#maintService').value.trim();if(!service)return toast('Add what was done');const odometer=Math.max(0,Number($('#maintOdo').value||0));const data={service,date:$('#maintDate').value||todayKey(),odometer,cost:Math.max(0,Number($('#maintCost').value||0)),note:$('#maintNote').value.trim()};if(existing)Object.assign(existing,data);else c.maintenanceLogs.push({id:uid('maint'),...data});c.odometer=Math.max(Number(c.odometer||0),odometer);save();modal.close();renderCar();toast(existing?'Maintenance updated':'Maintenance saved');};if(existing)$('#deleteMaint').onclick=()=>{const idx=c.maintenanceLogs.findIndex(x=>x.id===existing.id);if(idx<0)return;const removed=c.maintenanceLogs[idx];c.maintenanceLogs.splice(idx,1);save();modal.close();renderCar();toast('Maintenance entry deleted','Undo',()=>{c.maintenanceLogs.splice(Math.min(idx,c.maintenanceLogs.length),0,removed);save();renderCar();});};$('#cancelModal').onclick=()=>modal.close();}
function renderProjects(){
  setHeader('Projects'); const active=state.projects.filter(p=>!p.archived), archived=state.projects.filter(p=>p.archived);
  const cards=list=>list.map(p=>`<button class="project-card ${p.archived?'archived':''}" data-project="${p.id}"><div class="row between center"><div><span class="badge ${p.archived?'muted-badge':p.status==='Completed'?'':'purple'}">${p.archived?'Archived':escapeHTML(p.status)}</span><h3>${escapeHTML(p.name)}</h3></div><strong>${clamp(Number(p.progress||0),0,100)}%</strong></div><div class="weekbar"><span style="width:${clamp(Number(p.progress||0),0,100)}%"></span></div><p>${escapeHTML(p.nextTask||'Set the next task.')}</p></button>`).join('');
  main.innerHTML=`${moreBack()}<div class="section-title first-section"><h2>Active projects</h2><button id="addProjectBtn">+ Project</button></div><section class="project-list">${active.length?cards(active):'<div class="card flat empty-state">No active projects. Start one when you have something worth building.</div>'}</section>${archived.length?`<details class="card flat archive-section"><summary>Archive · ${archived.length}</summary><section class="project-list archive-list">${cards(archived)}</section></details>`:''}`;
  bindMoreBack();$('#addProjectBtn').onclick=()=>openProjectModal();$$('[data-project]').forEach(b=>b.onclick=()=>{historySelected.project.clear();historySelectMode.project=false;state.settings.moreView='project:'+b.dataset.project;save();renderMore();window.scrollTo({top:0,behavior:'auto'});});
}
function renderProjectDetail(id){
  const p=state.projects.find(x=>x.id===id);if(!p){state.settings.moreView='projects';return renderProjects();}setHeader(p.name);
  main.innerHTML=`<button class="back-link" id="projectBackBtn">${svgIcon('chevronLeft')}<span>Projects</span></button><section class="card hero"><div class="row between center"><span class="badge ${p.archived?'muted-badge':'purple'}">${p.archived?'ARCHIVED':escapeHTML(p.status)}</span><button class="secondary small-btn" id="editProjectBtn">Edit</button></div><h2 style="margin-top:14px">${escapeHTML(p.name)}</h2><p class="muted">${escapeHTML(p.description||'No description yet.')}</p><div class="project-progress"><div><b>${clamp(Number(p.progress||0),0,100)}%</b><span>progress</span></div><div class="weekbar"><span style="width:${clamp(Number(p.progress||0),0,100)}%"></span></div></div></section><div class="section-title"><h2>Next task</h2></div><section class="card flat"><h3>${escapeHTML(p.nextTask||'Choose the next useful step.')}</h3></section><div class="section-title"><h2>Plan</h2></div><section class="card flat"><p class="project-plan">${escapeHTML(p.plan||'No plan written yet. Keep it short.')}</p></section><section class="grid-3"><div class="stat"><small>Sessions</small><strong>${Number(p.sessions||0)}</strong></div><div class="stat"><small>Status</small><strong>${p.archived?'Archived':escapeHTML(p.status)}</strong></div><div class="stat"><small>Progress</small><strong>${clamp(Number(p.progress||0),0,100)}%</strong></div></section>${p.archived?'<button class="secondary full" id="restoreProjectBtn">Restore project</button>':'<button class="primary full" id="logProjectBtn">+ Log project session</button>'}<div class="section-title"><h2>Activity history</h2><button class="secondary small-btn" id="selectProjectHistoryBtn">${historySelectMode.project?'Done':'Select'}</button></div>${historySelectToolbar('project')}<section class="card flat">${(p.logs||[]).length?p.logs.slice().reverse().map(l=>`<div class="project-log">${historySelectMode.project?historySelectCheckbox('project',l.id):''}<div><b>${escapeHTML(l.note||'Project session')}</b><small>${escapeHTML(formatDateShort(parseDateKey(l.date)))}</small></div>${historySelectMode.project?'':`<div class="row"><button class="text-button tiny" data-edit-project-log="${l.id}">Edit</button><button class="text-button tiny danger-text" data-del-project-log="${l.id}">Delete</button></div>`}</div>`).join(''):'<div class="empty-state">No project sessions logged yet.</div>'}</section>`;
  $('#projectBackBtn').onclick=()=>{historySelected.project.clear();historySelectMode.project=false;state.settings.moreView='projects';save();renderMore();};$('#editProjectBtn').onclick=()=>openProjectModal(p.id);if($('#logProjectBtn'))$('#logProjectBtn').onclick=()=>openProjectSessionModal(p.id);if($('#restoreProjectBtn'))$('#restoreProjectBtn').onclick=()=>{p.archived=false;save();renderProjectDetail(p.id);toast('Project restored');};if($('#selectProjectHistoryBtn'))$('#selectProjectHistoryBtn').onclick=()=>historySelectToggle('project',()=>renderProjectDetail(p.id));$$('[data-edit-project-log]').forEach(b=>b.onclick=()=>openProjectSessionModal(p.id,b.dataset.editProjectLog));$$('[data-del-project-log]').forEach(b=>b.onclick=()=>{const idx=p.logs.findIndex(x=>x.id===b.dataset.delProjectLog);if(idx<0)return;const removed=p.logs[idx];p.logs.splice(idx,1);p.sessions=Math.max(0,Number(p.sessions||0)-1);save();renderProjectDetail(p.id);toast('Project session deleted','Undo',()=>{p.logs.splice(Math.min(idx,p.logs.length),0,removed);p.sessions=Number(p.sessions||0)+1;save();renderProjectDetail(p.id);});});bindHistorySelection('project',()=>renderProjectDetail(p.id),ids=>{const set=new Set(ids),removed=p.logs.map((item,index)=>({item,index})).filter(x=>set.has(x.item.id));p.logs=p.logs.filter(x=>!set.has(x.id));p.sessions=Math.max(0,Number(p.sessions||0)-removed.length);historySelected.project.clear();historySelectMode.project=false;save();renderProjectDetail(p.id);toast(`${removed.length} project session${removed.length===1?'':'s'} deleted`,'Undo',()=>{restoreDeletedObjects(p.logs,removed);p.sessions=Number(p.sessions||0)+removed.length;save();renderProjectDetail(p.id);});});
}
function openProjectModal(id=null){
  const p=id?state.projects.find(x=>x.id===id):null;const x=p||{name:'',status:'Active',archived:false,progress:0,description:'',nextTask:'',plan:''};
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">PROJECT</p><h2>${p?'Edit project':'New project'}</h2><div class="stack"><label><span class="label">Project name</span><input class="input" id="projectName" value="${escapeAttr(x.name)}"></label><label><span class="label">What is this project?</span><textarea id="projectDescription">${escapeHTML(x.description||'')}</textarea></label><label><span class="label">Next task</span><input class="input" id="projectNext" value="${escapeAttr(x.nextTask||'')}" placeholder="The next concrete thing to do"></label><label><span class="label">Plan / notes</span><textarea id="projectPlan">${escapeHTML(x.plan||'')}</textarea></label><div class="form-grid"><label><span class="label">Progress %</span><input class="input" id="projectProgress" type="number" min="0" max="100" value="${Number(x.progress||0)}"></label><label><span class="label">Status</span><select id="projectStatus"><option ${x.status==='Active'?'selected':''}>Active</option><option ${x.status==='Paused'?'selected':''}>Paused</option><option ${x.status==='Completed'?'selected':''}>Completed</option></select></label></div></div><button class="primary full" id="saveProject" style="margin-top:14px">Save project</button>${p?`<button class="secondary full" id="archiveProject" style="margin-top:8px">${p.archived?'Restore from archive':'Archive project'}</button>${p.archived?'<button class="danger-btn full" id="deleteProject" style="margin-top:8px">Delete permanently</button>':''}`:''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;
  modal.showModal();
  $('#saveProject').onclick=()=>{const name=$('#projectName').value.trim();if(!name)return toast('Add a project name');const data={name,status:$('#projectStatus').value,progress:clamp(Number($('#projectProgress').value||0),0,100),description:$('#projectDescription').value.trim(),nextTask:$('#projectNext').value.trim(),plan:$('#projectPlan').value.trim()};if(p)Object.assign(p,data);else state.projects.push({id:uid('project'),archived:false,sessions:0,logs:[],...data});save();modal.close();if(p){state.settings.moreView='project:'+p.id;renderMore();}else renderProjects();};
  if(p)$('#archiveProject').onclick=()=>{p.archived=!p.archived;save();modal.close();renderProjectDetail(p.id);toast(p.archived?'Project archived':'Project restored');};
  if(p&&$('#deleteProject'))$('#deleteProject').onclick=()=>{if(!confirm('Permanently delete this archived project and its history?'))return;state.projects=state.projects.filter(x=>x.id!==p.id);state.settings.moreView='projects';save();modal.close();renderMore();};
  $('#cancelModal').onclick=()=>modal.close();
}
function openProjectSessionModal(id,logId=null){const p=state.projects.find(x=>x.id===id);if(!p)return;const existing=logId?(p.logs||[]).find(x=>x.id===logId):null;modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">PROJECT SESSION</p><h2>${escapeHTML(p.name)}</h2><div class="stack"><label><span class="label">What did you move forward?</span><textarea id="projectSessionNote" placeholder="A short note is enough.">${escapeHTML(existing?.note||'')}</textarea></label><label><span class="label">Date</span><input class="input" id="projectSessionDate" type="date" value="${existing?.date||todayKey()}"></label></div><button class="primary full" id="saveProjectSession" style="margin-top:14px">Save session</button>${existing?'<button class="danger-btn full" id="deleteProjectSession" style="margin-top:8px">Delete session</button>':''}<button class="secondary full" id="cancelModal" style="margin-top:8px">Cancel</button>`;modal.showModal();$('#saveProjectSession').onclick=()=>{const data={date:$('#projectSessionDate').value||todayKey(),note:$('#projectSessionNote').value.trim()||'Focused project session'};if(existing)Object.assign(existing,data);else{p.sessions=Number(p.sessions||0)+1;if(!Array.isArray(p.logs))p.logs=[];p.logs.push({id:uid('projectlog'),...data});}save();modal.close();renderProjectDetail(p.id);toast(existing?'Project session updated':'Project session logged');};if(existing)$('#deleteProjectSession').onclick=()=>{const idx=p.logs.findIndex(x=>x.id===existing.id);if(idx<0)return;const removed=p.logs[idx];p.logs.splice(idx,1);p.sessions=Math.max(0,Number(p.sessions||0)-1);save();modal.close();renderProjectDetail(p.id);toast('Project session deleted','Undo',()=>{p.logs.splice(Math.min(idx,p.logs.length),0,removed);p.sessions=Number(p.sessions||0)+1;save();renderProjectDetail(p.id);});};$('#cancelModal').onclick=()=>modal.close();}
function openModeModal(){const cur=currentMode();const modes=[['normal','Normal','Full routine and normal weekly plan.'],['bad','Bad day','Today only: keep essentials, classes, meals, outside and sleep. It resets tomorrow.'],['exam','Exam','Temporarily park projects and nonessential life admin. Keep uni, sleep, food and training.'],['holiday','Holiday','Pause university items without deleting the timetable. Keep life, gym, projects and sleep.']];modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">DAY MODE</p><h2>How should Reset treat your schedule?</h2><div class="mode-list">${modes.map(([id,name,desc])=>`<button class="mode-option ${id===cur?'active':''}" data-mode="${id}"><span><b>${name}</b><small>${desc}</small></span><strong>${id===cur?'✓':''}</strong></button>`).join('')}</div><button class="secondary full" id="cancelModal" style="margin-top:10px">Cancel</button>`;modal.showModal();$$('[data-mode]').forEach(b=>b.onclick=()=>{state.settings.mode=b.dataset.mode;state.settings.modeSetDate=todayKey();ensureRecord(todayKey()).mode=b.dataset.mode;save();modal.close();renderToday();toast(`${modeName()} mode active`);});$('#cancelModal').onclick=()=>modal.close();}

$$('.tab').forEach(btn=>btn.addEventListener('click',()=>{state.settings.activeTab=btn.dataset.tab;if(btn.dataset.tab==='more')state.settings.moreView='home';if(btn.dataset.tab==='money')state.settings.moneyView='home';save();render();window.scrollTo({top:0,behavior:'auto'});}));

function openLanguageModal(){
  modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">LANGUAGE</p><h2>Choose language</h2><div class="language-list"><button class="language-option ${state.settings.language==='en'?'active':''}" data-lang="en"><span class="flag">🇺🇸</span><b>English</b><span>${state.settings.language==='en'?'✓':''}</span></button><button class="language-option ${state.settings.language==='ar'?'active':''}" data-lang="ar"><span class="flag">🇸🇦</span><b>العربية</b><span>${state.settings.language==='ar'?'✓':''}</span></button></div><button class="secondary full" id="cancelModal" style="margin-top:12px">Cancel</button>`;modal.showModal();$$('[data-lang]').forEach(b=>b.onclick=()=>{state.settings.language=b.dataset.lang;save();modal.close();applyLanguageState();render();toast(b.dataset.lang==='ar'?'تم تغيير اللغة':'Language changed');});$('#cancelModal').onclick=()=>modal.close();localizeTree(modalContent);
}


const settingsDialog=$('#settingsDialog');
$('#settingsBtn').onclick=()=>{const v=$('#versionLabel');if(v)v.textContent='v'+APP_DISPLAY_VERSION;applyLanguageState();requestPersistentStorage().then(updateStorageProtectionLabel);updateBackupConfidenceLabel();settingsDialog.showModal();localizeTree(settingsDialog);};
$('#exportBtn').onclick=()=>{
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`reset-backup-${todayKey()}.json`;a.click();URL.revokeObjectURL(url);toast('Backup exported');
};
$('#importInput').addEventListener('change',async e=>{const f=e.target.files?.[0];if(!f)return;try{const data=JSON.parse(await f.text());if(!data.money||!data.records)throw new Error('Invalid');state=migrateState(data);save();settingsDialog.close();toast('Backup imported');render();}catch(err){toast('That backup file is not valid');}e.target.value='';});
$('#languageBtn').onclick=()=>{settingsDialog.close();openLanguageModal();};
$('#installHelpBtn').onclick=()=>{settingsDialog.close();modalContent.innerHTML=`<div class="sheet-handle"></div><p class="eyebrow">IPHONE</p><h2>Add Reset to your Home Screen</h2><ol class="muted" style="padding-left:20px;line-height:1.8"><li>Open the app link in <b>Safari</b>.</li><li>Tap <b>Share</b>.</li><li>Choose <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b>.</li></ol><p class="muted tiny">When an update is uploaded to GitHub Pages, fully close and reopen the app. If an old version remains, refresh the Safari page once.</p><button class="primary full" id="cancelModal">Got it</button>`;modal.showModal();$('#cancelModal').onclick=()=>modal.close();};
$('#storageProtectionBtn').onclick=async()=>{const r=await requestPersistentStorage();updateStorageProtectionLabel(r);toast(r.persisted?'Local data protection enabled':'iPhone is using best-effort local storage');};
$('#eraseBtn').onclick=async()=>{if(confirm('Erase all Reset app data on this device?')){try{localStorage.removeItem(APP_KEY);}catch(e){}await durableClear();state=defaultState();settingsDialog.close();save();render();toast('App reset');}};
modal.addEventListener('click',e=>{if(e.target===modal)modal.close();});
settingsDialog.addEventListener('click',e=>{if(e.target===settingsDialog)settingsDialog.close();});

if('serviceWorker' in navigator){
  window.addEventListener('load',async()=>{
    try{
      let reloading=false;
      navigator.serviceWorker.addEventListener('controllerchange',()=>{
        if(reloading)return;
        reloading=true;
        window.location.reload();
      });
      const reg=await navigator.serviceWorker.register('./service-worker.js?v=3.3.0',{updateViaCache:'none'});
      if(reg.waiting)reg.waiting.postMessage({type:'SKIP_WAITING'});
      reg.addEventListener('updatefound',()=>{
        const worker=reg.installing;
        if(!worker)return;
        worker.addEventListener('statechange',()=>{
          if(worker.state==='installed'&&navigator.serviceWorker.controller){
            worker.postMessage({type:'SKIP_WAITING'});
          }
        });
      });
      reg.update().catch(()=>{});
    }catch(e){}
  });
}

// iPhone standalone Safari can still zoom on rapid double taps even when
// touch-action is set. Reset is an app-like UI, so suppress that gesture.
let resetLastTouch={time:0,target:null,x:0,y:0};
document.addEventListener('touchend',event=>{
  if(event.touches&&event.touches.length>0)return;
  const touch=event.changedTouches&&event.changedTouches[0];
  const now=Date.now();
  const x=touch?touch.clientX:0;
  const y=touch?touch.clientY:0;
  const sameTarget=event.target===resetLastTouch.target;
  const closeEnough=Math.hypot(x-resetLastTouch.x,y-resetLastTouch.y)<28;
  if(now-resetLastTouch.time<320&&sameTarget&&closeEnough)event.preventDefault();
  resetLastTouch={time:now,target:event.target,x,y};
},{passive:false});
document.addEventListener('dblclick',event=>event.preventDefault(),{passive:false});
setInterval(()=>{if(state.settings.activeTab==='today')renderToday(true);},60000);
initializeApp();
