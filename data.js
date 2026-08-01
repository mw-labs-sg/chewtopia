/* ==========================================================================
   CHEWTOPIA — DATA. This is the only file you normally need to edit.

     KIDS                   -> names and levels
     TC_SPELL / TC_PINYIN   -> Primary 2 tests
     HANZI                  -> 生字表 我会写
     SC_TINGXIE / SC_SPELL  -> Kindergarten tests
     TIMETABLE / SC_SCHOOL  -> school timetables
     BREAKFAST_DEFAULT      -> the weekly breakfast plan
     MEALS_ROTATION         -> the four-week dinner rotation
     SEED_EVENTS            -> term dates, tests, trips
     SEED_ACTS              -> weekly after-school activities

   New SEED_EVENTS and SEED_ACTS are added to the app the next time it opens.
   Give every one a new id. Anything you delete inside the app stays deleted.
   ========================================================================== */

var KIDS = [ {id:"tc",init:"TC",level:"Primary 2"}, {id:"sc",init:"SC",level:"Kindergarten"} ];

var TC_SPELL = {
  "3.3": ["Unit 9", [
    ["spell","I cannot find my keys. They have completely disappeared!","disappeared"],
    ["spell","John read a book about three mischievous children.","mischievous"],
    ["spell","There was something strange about that tree.","strange"],
    ["spell","Uncle Lim propped the ladder against the tree.","propped"],
    ["spell","He picked something up from the ground.","ground"],
    ["spell","Were his eyes playing a trick on him?","playing a trick"],
    ["spell","He thought of climbing the tall sturdy tree.","sturdy"],
    ["spell","John hid behind the bushes.","behind"],
    ["dict","He frowned with concern.","He frowned with concern."],
    ["dict","He scratched his head over the tricky question.","He scratched his head over the tricky question."]
  ]],
  "3.4": ["Unit 9", [
    ["spell","He returned to the tree with Uncle Lim and his ladder.","returned"],
    ["spell","That tree! he told Uncle Lim as he pointed at it.","pointed at"],
    ["spell","Whenever anyone stood under the tree, odd things happened.","odd"],
    ["spell","Its nest was decorated with Mary's ribbon and many other shiny things.","decorated with"],
    ["spell","They went closer and looked very carefully up into the tree.","closer"],
    ["spell","They saw a bird with Peter's coin in its beak.","coin"],
    ["spell","They were both puzzled by what happened.","puzzled"],
    ["spell","She ambled, grinning from ear to ear.","grinning from ear to ear"],
    ["dict","She looked at the floor with a sheepish grin.","She looked at the floor with a sheepish grin."],
    ["dict","She finally realised what had happened.","She finally realised what had happened."]
  ]],
  "3.5": ["Unit 10", [
    ["spell","He had forgotten to bring his pencil case to school.","forgotten"],
    ["spell","She loves eating vegetables.","vegetables"],
    ["spell","Those tomatoes are red and juicy.","tomatoes"],
    ["spell","The cat might eat the mouse.","might"],
    ["spell","The snake is huge and green.","huge"],
    ["spell","My aunt arrived at my party in a limousine.","arrived"],
    ["spell","It is dangerous to cycle on the road without a helmet.","dangerous"],
    ["dict","He lost his balance and fell with a thud.","He lost his balance and fell with a thud."],
    ["dict","Tears welled up in her eyes.","Tears welled up in her eyes."],
    ["dict","His knees were grazed but he quickly got up.","His knees were grazed but he quickly got up."]
  ]],
  "3.6": ["Unit 10", [
    ["spell","Please be quiet in the library, whispered the librarian.","whispered"],
    ["spell","That aeroplane looks like a gigantic bird.","gigantic"],
    ["spell","The gardener used the hose to water the plants.","hose"],
    ["spell","The smell of the garbage over there is terrible.","garbage"],
    ["spell","He called for extra men to help him move the table.","extra"],
    ["spell","That truck is carrying many baskets of watermelons.","truck"],
    ["spell","Grandfather noticed something moving behind the bushes.","noticed"],
    ["dict","The boy tripped because he missed the ball.","The boy tripped because he missed the ball."],
    ["dict","He slid and fell as the wet grass was slippery.","He slid and fell as the wet grass was slippery."],
    ["dict","He clutched his leg as it was painful.","He clutched his leg as it was painful."]
  ]]
};

/* 拼音 — hear the word, write the pinyin and the tone number.
   [character, word it is used in, pinyin, tone, meaning] */
var TC_PINYIN = {
  "Lesson 12": [
    ["永","永远","yong","3","forever"], ["轻","轻轻","qing","1","light / gently"],
    ["命","生命","ming","4","life"],   ["百","一百","bai","3","hundred"],
    ["健","健康","jian","4","healthy"],["康","健康","kang","1","well-being"],
    ["幸","幸福","xing","4","fortunate"],["愿","愿望","yuan","4","wish"],
    ["吹","吹风","chui","1","to blow"],["糕","蛋糕","gao","1","cake"],
    ["首","一首歌","shou","3","measure word for songs"],["张","一张纸","zhang","1","measure word"],
    ["卡","卡片","ka","3","card"],     ["影","电影","ying","3","shadow / film"],
    ["票","电影票","piao","4","ticket"],["礼","礼物","li","3","gift"],
    ["厅","客厅","ting","1","hall"],   ["奇","奇怪","qi","2","strange"],
    ["怪","奇怪","guai","4","weird"],  ["活","生活","huo","2","to live"],
    ["宝","宝贝","bao","3","treasure"]
  ],
  "复习 12 字": [
    ["宝","宝贝","bao","3","treasure"], ["些","一些","xie","1","some"],
    ["写","写字","xie","3","to write"], ["桌","桌子","zhuo","1","table"],
    ["礼","礼物","li","3","gift"],      ["卡","卡片","ka","3","card"],
    ["张","一张","zhang","1","measure word"],["吹","吹风","chui","1","to blow"],
    ["康","健康","kang","1","well-being"],["健","健康","jian","4","healthy"],
    ["百","一百","bai","3","hundred"],  ["永","永远","yong","3","forever"]
  ]
};


/* 生字表 · 我会写 — Primary 2 textbook, lessons 11–19.
   [character, pinyin, tone, word it appears in, meaning] */
var HANZI = {
  "第十一课": [
    ["过","guo","4","过来","to cross / pass"], ["娃","wa","2","娃娃","doll"],
    ["更","geng","4","更好","more"],          ["机","ji","1","机器","machine"],
    ["吧","ba","","好吧","particle"],          ["鸡","ji","1","小鸡","chicken"],
    ["吗","ma","","好吗","question particle"], ["最","zui","4","最好","most"],
    ["块","kuai","4","一块","piece"],          ["图","tu","2","图画","picture"],
    ["跟","gen","1","跟着","to follow"],       ["象","xiang","4","大象","elephant"]
  ],
  "第十二课": [
    ["永","yong","3","永远","forever"],  ["张","zhang","1","一张","measure word"],
    ["些","xie","1","一些","some"],      ["百","bai","3","一百","hundred"],
    ["卡","ka","3","卡片","card"],       ["宝","bao","3","宝贝","treasure"],
    ["健","jian","4","健康","healthy"],  ["礼","li","3","礼物","gift"],
    ["桌","zhuo","1","桌子","table"],    ["康","kang","1","健康","well-being"],
    ["吹","chui","1","吹风","to blow"],  ["写","xie","3","写字","to write"]
  ],
  "第十三课": [
    ["猫","mao","1","小猫","cat"],     ["晚","wan","3","晚上","evening"],
    ["得","de","","觉得","particle"],   ["狗","gou","3","小狗","dog"],
    ["梦","meng","4","做梦","dream"],   ["前","qian","2","前面","front"],
    ["总","zong","3","总是","always"],  ["那","na","4","那里","that"],
    ["医","yi","1","医生","doctor"],    ["兔","tu","4","兔子","rabbit"],
    ["丢","diu","1","丢了","to lose"],  ["觉","jue","2","觉得","to feel"]
  ],
  "第十四课": [
    ["难","nan","2","很难","difficult"], ["该","gai","1","应该","should"],
    ["作","zuo","4","作业","to do"],     ["易","yi","4","容易","easy"],
    ["伤","shang","1","受伤","injured"], ["脸","lian","3","洗脸","face"],
    ["争","zheng","1","争吵","to argue"],["容","rong","2","容易","to allow"],
    ["吵","chao","3","吵架","noisy"],    ["能","neng","2","能够","can"],
    ["应","ying","1","应该","should"],   ["呢","ne","","呢","particle"]
  ],
  "第十五课": [
    ["黄","huang","2","黄色","yellow"], ["汤","tang","1","喝汤","soup"],
    ["考","kao","3","考试","to test"],  ["菜","cai","4","蔬菜","vegetable"],
    ["就","jiu","4","就是","then"],     ["扁","bian","3","扁的","flat"],
    ["拔","ba","2","拔萝卜","to pull"], ["瓜","gua","1","西瓜","melon"],
    ["哭","ku","1","哭了","to cry"],    ["比","bi","3","比较","to compare"],
    ["黑","hei","1","黑色","black"]
  ],
  "第十六课": [
    ["声","sheng","1","声音","sound"],  ["英","ying","1","英语","English"],
    ["具","ju","4","文具","tool"],      ["话","hua","4","说话","speech"],
    ["讲","jiang","3","讲故事","to tell"],["知","zhi","1","知道","to know"],
    ["借","jie","4","借书","to borrow"],["故","gu","4","故事","reason"],
    ["道","dao","4","知道","way"],      ["次","ci","4","一次","occurrence"],
    ["事","shi","4","故事","matter"],   ["首","shou","3","一首歌","measure word"],
    ["样","yang","4","一样","kind"]
  ],
  "第十七课": [
    ["夜","ye","4","夜晚","night"],   ["楼","lou","2","楼上","building"],
    ["椅","yi","3","椅子","chair"],   ["市","shi","4","城市","city"],
    ["静","jing","4","安静","quiet"], ["烤","kao","3","烧烤","to roast"],
    ["热","re","4","很热","hot"],     ["闹","nao","4","热闹","noisy"],
    ["炸","zha","2","油炸","to fry"], ["踢","ti","1","踢球","to kick"],
    ["颜","yan","2","颜色","colour"]
  ],
  "第十八课": [
    ["海","hai","3","大海","sea"],     ["泳","yong","3","游泳","swimming"],
    ["参","can","1","参观","to visit"],["区","qu","1","地区","area"],
    ["观","guan","1","参观","to view"],["处","chu","4","到处","place"],
    ["国","guo","2","中国","country"], ["净","jing","4","干净","clean"],
    ["游","you","2","游泳","to swim"], ["坡","po","1","山坡","slope"]
  ],
  "第十九课": [
    ["洗","xi","3","洗手","to wash"],  ["喝","he","1","喝水","to drink"],
    ["渴","ke","3","口渴","thirsty"],  ["告","gao","4","告诉","to tell"],
    ["婆","po","2","婆婆","grandmother"],["重","zhong","4","很重","heavy"],
    ["诉","su","4","告诉","to inform"],["连","lian","2","连接","to connect"],
    ["活","huo","2","生活","to live"], ["忙","mang","2","很忙","busy"],
    ["约","yue","1","约会","appointment"],["猜","cai","1","猜猜","to guess"]
  ]
};

/* --- SC, Kindergarten K2 --- */
var SC_TINGXIE = {
  "Week 6 · 6 Aug": [
    ["去","去学校","qu","4","to go"], ["来","过来","lai","2","to come"],
    ["爱","爱心","ai","4","love"],   ["快乐","快乐","kuai le","",  "happy"],
    ["马儿跑得快","马儿跑得快。","ma er pao de kuai","","The horse runs fast."]
  ],
  "Week 8 · 20 Aug": [
    ["狼","大灰狼","lang","2","wolf"], ["蛇","小蛇","she","2","snake"],
    ["鸭子","小鸭子","ya zi","","duck"], ["乌龟","小乌龟","wu gui","","tortoise"],
    ["小花猫","小花猫","xiao hua mao","","little tabby cat"]
  ]
};
var SC_SPELL = {
  "Week 7 · 12 Aug": ["English Spelling", [
    ["spell","A seed grows into a plant.","seed"],
    ["spell","The root takes in water from the soil.","root"],
    ["spell","The stem holds the plant up.","stem"],
    ["spell","The flower is pink and pretty.","flower"],
    ["spell","A green leaf grew on the branch.","leaf"],
    ["dict","We eat fruits daily.","We eat fruits daily."]
  ]],
  "Week 9 · 26 Aug": ["English Spelling", [
    ["spell","We baked cookies for tea.","cookies"],
    ["spell","Let us bake a cake today.","bake"],
    ["spell","She drank a glass of orange juice.","juice"],
    ["spell","Put the buns on the tray.","tray"],
    ["spell","Add the flour into the bowl.","flour"],
    ["dict","She mixes the batter to bake a cake.","She mixes the batter to bake a cake."]
  ]]
};

/* --- TC's school timetable --- */
/* School timetable. Each entry is [start, end, subject].
   Times come from the printed timetable — check them against the original. */
var TIMES = ["7:30","8:00","8:30","9:00","9:30","10:00","10:30",
             "11:00","11:30","12:00","12:30","13:00","13:30","14:15"];
var TIMETABLE = {
  Monday: [
    ["7:30","8:00","MA"], ["8:00","8:30","CL"], ["8:30","9:30","CL"],
    ["10:00","10:30","Recess"], ["10:30","11:00","LSP"],
    ["11:00","12:30","PAL"], ["12:30","13:30","EL"]
  ],
  Tuesday: [
    ["7:30","8:00","MA"], ["8:00","9:00","ART"], ["9:00","9:30","CL"],
    ["10:00","10:30","Recess"], ["10:30","11:30","CL"], ["11:30","12:00","LSP"],
    ["12:00","13:00","EL"], ["13:00","13:30","PE"]
  ],
  Wednesday: [
    ["7:30","8:00","LSP"], ["8:00","8:30","EL"], ["8:30","9:30","CCE"],
    ["10:00","10:30","Recess"], ["10:30","11:30","CL"],
    ["11:30","12:30","MA"], ["12:30","13:30","FTGP"]
  ],
  Thursday: [
    ["7:30","8:00","LSP"], ["8:00","9:00","CL"], ["9:30","10:00","Assembly"],
    ["10:00","10:30","Recess"], ["10:30","11:30","MA"], ["11:30","12:00","PE"],
    ["12:00","12:30","EL"], ["13:00","13:30","SS"]
  ],
  Friday: [
    ["7:30","8:00","MA"], ["8:00","8:30","MUSIC"], ["8:30","9:30","EL"],
    ["10:00","10:30","Recess"], ["10:30","11:00","LSP"], ["11:00","12:00","CL"],
    ["12:00","12:30","PE"], ["12:30","13:00","CL"]
  ]
};
/* One timetable per child. SC is in kindergarten — put the hours here
   when you have them and they will appear on the Schedule automatically. */
var SC_SCHOOL = {
  Monday:    [["08:15","14:15","School"]],
  Tuesday:   [["08:15","14:15","School"]],
  Wednesday: [["08:15","14:15","School"]],
  Thursday:  [["08:15","14:15","School"]],
  Friday:    [["08:15","14:15","School"]]
};
var TIMETABLES = { tc: TIMETABLE, sc: SC_SCHOOL };

var TT_KEY = "MA maths · CL 华文 · EL English · SS social studies · " +
             "LSP learning support · PAL active learning · " +
             "CCE character &amp; citizenship · FTGP form teacher time";

/* Breakfast is the same every week. */
var BREAKFAST_DEFAULT = {
  Monday:"Fried egg sandwich",
  Tuesday:"Ham sandwich",
  Wednesday:"Salmon with cream cheese sandwich",
  Thursday:"Sausage bun",
  Friday:"Egg with ham sandwich",
  Saturday:"", Sunday:""
};

/* Four-week dinner rotation, from the printed planner.
   ROTATION_START is the Monday that counts as Week 1. */
var ROTATION_START = "2026-08-03";
var MEALS_ROTATION = [
{
  Monday:"Steamed cod fish with ginger & spring onion\nStir fried mixed veg\nSunny egg for the boys\nStir fried bell pepper with chilli and pork belly",
  Tuesday:"Stir fried garlic prawn\nBraised chicken with carrot, potato & egg\nBlanched veggies with fried garlic/onion",
  Wednesday:"Salmon rice for the boys\nChicken fillet salad (adults)\nMiso soup with tofu and seaweed",
  Thursday:"Macaroni soup with minced beef",
  Friday:"Baked chicken with carrot, onion, zucchini, baby corn\nServe with bread and butter on the side",
  Saturday:"",
  Sunday:""
},
{
  Monday:"Steamed cod fish with ginger & spring onion\nStir fried mixed veg\nSunny egg for the boys\nStir fried minced pork with long bean, chilli & peppercorn",
  Tuesday:"Stir fried garlic prawn\nRoast pork\nBlanched veggies with fried garlic/onion",
  Wednesday:"Salmon rice for the boys\nChicken fillet salad (adults)\nMiso soup with tofu and seaweed",
  Thursday:"Pasta bolognese with minced beef",
  Friday:"Steak with steamed broccoli, corn and carrot\nServe with mushroom and salad",
  Saturday:"",
  Sunday:""
},
{
  Monday:"Steamed cod fish with ginger & spring onion\nStir fried mixed veg\nSunny egg for the boys\nClaypot tofu with minced pork and prawn paste",
  Tuesday:"Stir fried garlic prawn\nBraised pork belly with carrot, potato & egg\nBlanched veggies with fried garlic/onion",
  Wednesday:"Salmon rice for the boys\nChicken fillet salad (adults)\nMiso soup with tofu and seaweed",
  Thursday:"Beef burger with minced beef",
  Friday:"Baked chicken with carrot, onion, zucchini, baby corn\nServe with bread and butter on the side",
  Saturday:"",
  Sunday:""
},
{
  Monday:"Steamed cod fish with ginger & spring onion\nStir fried mixed veg\nSunny egg for the boys\nChilli mapo tofu with minced pork or beef",
  Tuesday:"Stir fried garlic prawn\nCurry chicken\nBlanched veggies with fried garlic/onion\nOmelette with onion",
  Wednesday:"Salmon rice for the boys\nChicken fillet salad (adults)\nMiso soup with tofu and seaweed",
  Thursday:"Cream sauce pasta with minced beef",
  Friday:"Baked chicken with carrot, onion, zucchini, baby corn\nServe with bread and butter on the side",
  Saturday:"",
  Sunday:""
}
];

/* Test dates and family events, loaded on first open only.
   Delete any of them in the app and they stay deleted. */
var SEED_EVENTS = [
  {id:"e1", t:"Spelling test",  d:"2026-07-28", w:"tc"},
  {id:"e2", t:"华文听写",        d:"2026-07-30", w:"tc"},
  {id:"e3", t:"Hai Di Lao",     d:"2026-08-01", w:"sc"},
  {id:"e4", t:"华文听写",        d:"2026-08-06", w:"sc"},
  {id:"e5", t:"Birthday party", d:"2026-08-08", w:"sc"},
  {id:"e6", t:"Spelling test",  d:"2026-08-12", w:"sc"},
  {id:"e7", t:"Chiang Mai",     d:"2026-09-04", d2:"2026-09-07"},
  {id:"e8", t:"HPB form due — health screening", d:"2026-08-11", w:"sc",
   n:"Fill in the online Medical Information and Lifestyle Questionnaire from HPB's letter. It is not a consent form — to opt out, email HPB directly."},
  {id:"e9", t:"HPB health screening", d:"2026-08-21", d2:"2026-08-25", w:"sc",
   n:"Annual health screening for K1 and K2, held in school. Nothing to bring."},

  /* Nanyang Primary, August info sheet NYPS2026/07/093 */
  {id:"e10", t:"National Day celebration", d:"2026-08-07", time:"07:30", w:"tc",
   n:"Be there by 7.30am at the Basketball and Multi-purpose Courts, King's Road campus. Red top with school shorts. In a small bag: a storybook for silent reading, healthy snacks, a water bottle, a National Day food item that means something about Singapore (his own to eat), and a hand-held flag if he wants one. Out at 10.30am — school bus runs as usual, or drive in between 10.50 and 11.15am."},
  {id:"e11", t:"No school — PSLE oral", d:"2026-08-12", d2:"2026-08-13", w:"tc",
   n:"P1 to P5 stay home both days while the P6 oral exams run. Only children booked into Student Care go in."},
  {id:"e12", t:"Founders' Day — 109th", d:"2026-08-14", w:"tc",
   n:"The school was founded 15 August 1917. Every child gets a longevity bun with lotus paste, halal option available. Normal school day, nothing to bring."},

  /* Nanyang Kindergarten, National Day letter 28 Jul 2026 */
  {id:"e13", t:"National Day learning journey", d:"2026-08-07", time:"07:45", w:"sc",
   n:"Drop off at the 118 King's Road campus — teachers take them from 7.45am. Journey runs 8.00 to 11.15am, walking to places from Singapore's founding. Red top with white bottoms. Pack in a backpack: a cap, a water bottle, a light raincoat, and shoes he can walk in. Breakfast is given at school. No school bus at all today, so both trips are on us."},
  {id:"e14", t:"Public holiday — National Day (in lieu)", d:"2026-08-10",
   n:"9 August falls on a Sunday. Kindergarten reopens Tuesday 11 August."}
];
var SEED_ACTS = [
  /* SC — from the printed weekly schedule */
  {id:"sa1", who:"sc", day:"Monday",    from:"16:00", to:"17:00", t:"Phonics"},
  {id:"sa2", who:"sc", day:"Tuesday",   from:"14:15", to:"15:15", t:"Art"},
  {id:"sa3", who:"sc", day:"Wednesday", from:"14:45", to:"15:45", t:"Teacher Denise"},
  {id:"sa4", who:"sc", day:"Thursday",  from:"15:00", to:"16:45", t:"Learning Lab"},
  {id:"sa5", who:"sc", day:"Thursday",  from:"17:00", to:"17:45", t:"Swimming"},
  {id:"sa6", who:"sc", day:"Friday",    from:"14:15", to:"15:15", t:"Speech & Drama"},
  {id:"sa7", who:"all", day:"Saturday", from:"08:30", to:"10:15", t:"Berries"},
  {id:"sa8", who:"sc", day:"Saturday",  from:"13:00", to:"14:00", t:"Golf"},
  {id:"sa9", who:"sc", day:"Sunday",    from:"09:00", to:"10:45", t:"Swimming & Tennis"},
  /* TC */
  {id:"ta1", who:"tc", day:"Sunday",    from:"09:00", to:"11:00", t:"Coach Lee"}
];
