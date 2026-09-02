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

/* subj: which subjects this child practises. SC is in K2 and does not get
   maths here — the school sends home spelling and 听写 only. */
var KIDS = [ {id:"tc",init:"TC",level:"Primary 2",   subj:["en","zh","ma"]},
             {id:"sc",init:"SC",level:"Kindergarten",subj:["en","zh"]} ];

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

/* ==========================================================================
   我会认 — straight off the 生字表 page (p.116). These are recognition only:
   longer than the 我会写 lists, and not the same characters.
   [character, pinyin, tone, the word it appears in, meaning]
   ========================================================================== */
var RECOG = {
  "\u7b2c\u5341\u4e00\u8bfe": [
    ["\u7eb8","zhi","3","\u7eb8\u98de\u673a","paper"],      ["\u673a","ji","1","\u673a\u5668\u4eba","machine"],
    ["\u5757","kuai","4","\u9b54\u672f\u65b9\u5757","block"],  ["\u8ddf","gen","1","\u8ddf\u7740","to follow"],
    ["\u68cb","qi","2","\u8df3\u68cb","chess"],        ["\u642d","da","1","\u642d\u79ef\u6728","to build up"],
    ["\u79ef","ji","1","\u79ef\u6728","to pile up"],     ["\u5e03","bu","4","\u5e03\u5a03\u5a03","cloth"],
    ["\u5a03","wa","2","\u5e03\u5a03\u5a03","doll"],      ["\u5427","ba","","\u597d\u5427","(particle)"],
    ["\u5668","qi","4","\u673a\u5668\u4eba","device"],     ["\u8bb8","xu","3","\u8bb8\u591a","many"],
    ["\u7ef3","sheng","2","\u8df3\u7ef3","rope"],       ["\u634f","nie","1","\u634f","to mould"],
    ["\u62fc","pin","1","\u62fc\u56fe","to piece together"], ["\u8239","chuan","2","\u7eb8\u8239","boat"],
    ["\u66f4","geng","4","\u66f4\u597d","more"],        ["\u9e70","ying","1","\u8001\u9e70","eagle"],
    ["\u8ffd","zhui","1","\u8ffd","to chase"]
  ],
  "\u7b2c\u5341\u4e8c\u8bfe": [
    ["\u6c38","yong","3","\u6c38\u8fdc","forever"],      ["\u8f7b","qing","1","\u5e74\u8f7b","young"],
    ["\u547d","ming","4","\u957f\u547d\u767e\u5c81","life"],   ["\u767e","bai","3","\u4e00\u767e","hundred"],
    ["\u5065","jian","4","\u5065\u5eb7","healthy"],      ["\u5eb7","kang","1","\u5065\u5eb7","well-being"],
    ["\u5e78","xing","4","\u5e78\u798f","blessed"],      ["\u613f","yuan","4","\u8bb8\u613f","to wish"],
    ["\u5439","chui","1","\u5439\u98ce","to blow"],      ["\u5947","qi","2","\u5947\u602a","strange"],
    ["\u7cd5","gao","1","\u86cb\u7cd5","cake"],         ["\u9996","shou","3","\u4e00\u9996\u6b4c","(songs)"],
    ["\u5f20","zhang","1","\u4e00\u5f20\u5361","(flat things)"], ["\u5361","ka","3","\u751f\u65e5\u5361","card"],
    ["\u5f71","ying","3","\u7535\u5f71\u7968","film"],     ["\u7968","piao","4","\u7535\u5f71\u7968","ticket"],
    ["\u793c","li","3","\u793c\u7269","gift"],         ["\u5385","ting","1","\u5ba2\u5385","hall"],
    ["\u602a","guai","4","\u5947\u602a","strange"],      ["\u6d3b","huo","2","\u6d3b\u52a8","alive"],
    ["\u5b9d","bao","3","\u5b9d\u8d1d","treasure"]
  ],
  "第十三课": [
    ["澡","zao","3","洗澡","bath"], ["吐","tu","3","吐出","to spit out"],
    ["识","shi","2","认识","to know"], ["睡","shui","4","睡觉","to sleep"],
    ["宠","chong","3","宠物","to pamper"], ["醒","xing","3","睡醒","to wake"],
    ["觉","jue","2","觉得","to feel"], ["岛","dao","3","小岛","island"],
    ["羽","yu","3","羽毛","feather"], ["欺","qi","1","欺负","to bully"],
    ["乖","guai","1","乖巧","well behaved"], ["负","fu","4","欺负","to bear"],
    ["总","zong","3","总是","always"], ["丢","diu","1","丢了","to lose"],
    ["聪","cong","1","聪明","clever"], ["梦","meng","4","做梦","dream"],
    ["金","jin","1","金鱼","gold"], ["围","wei","2","围着","to surround"],
    ["漂","piao","4","漂亮","pretty"], ["迎","ying","2","欢迎","to welcome"]
  ],
  "第十四课": [
    ["难","nan","2","很难","difficult"], ["吵","chao","3","争吵","to quarrel"],
    ["道","dao","4","知道","way"], ["易","yi","4","容易","easy"],
    ["弄","nong","4","弄破","to make"], ["虹","hong","2","彩虹","rainbow"],
    ["粗","cu","1","粗心","careless"], ["破","po","4","弄破","broken"],
    ["细","xi","4","细心","careful"], ["撞","zhuang","4","撞倒","to bump into"],
    ["抢","qiang","3","抢东西","to snatch"], ["倒","dao","3","撞倒","to fall over"],
    ["推","tui","1","推倒","to push"], ["伤","shang","1","受伤","hurt"],
    ["讨","tao","3","讨厌","to demand"], ["容","rong","2","容易","to allow"],
    ["厌","yan","4","讨厌","to dislike"], ["能","neng","2","能够","can"],
    ["争","zheng","1","争吵","to argue"], ["晶","jing","1","亮晶晶","sparkling"]
  ],
  "第十五课": [
    ["茄","qie","2","番茄","aubergine in 茄子 — 番茄 is a tomato"], ["卜","bo","","萝卜","radish"],
    ["考","kao","3","考试","to test"], ["紫","zi","3","紫色","purple"],
    ["煮","zhu","3","煮汤","to boil"], ["根","gen","1","树根","root"],
    ["番","fan","1","番茄","foreign — 番茄 is a tomato"], ["鼠","shu","3","老鼠","mouse"],
    ["实","shi","2","果实","fruit"], ["芽","ya","2","豆芽","sprout"],
    ["或","huo","4","或者","or"], ["扁","bian","3","扁豆","flat"],
    ["者","zhe","3","或者","one who"], ["玉","yu","4","玉米","jade"],
    ["猪","zhu","1","小猪","pig"], ["比","bi","3","比较","to compare"],
    ["拔","ba","2","拔萝卜","to pull up"], ["伯","bo","2","伯伯","uncle"],
    ["摘","zhai","1","摘菜","to pick"], ["萝","luo","2","萝卜","radish"],
    ["挖","wa","1","挖土","to dig"]
  ],
  "第十六课": [
    ["持","chi","2","保持","to keep"], ["箱","xiang","1","书箱","box"],
    ["知","zhi","1","知道","to know"], ["静","jing","4","安静","quiet"],
    ["盒","he","2","盒子","box"], ["指","zhi","3","手指","finger"],
    ["绘","hui","4","绘本","to draw"], ["案","an","4","图案","case"],
    ["趣","qu","4","有趣","interest"], ["附","fu","4","附近","attached"],
    ["借","jie","4","借书","to borrow"], ["近","jin","4","附近","near"],
    ["次","ci","4","一次","time"], ["满","man","3","满意","full"],
    ["英","ying","1","英语","English"], ["始","shi","3","开始","to begin"],
    ["遍","bian","4","一遍","once through"], ["样","yang","4","一样","kind"],
    ["架","jia","4","书架","shelf"], ["候","hou","4","时候","time"]
  ],
  "第十七课": [
    ["逛","guang","4","逛街","to stroll"], ["料","liao","4","饮料","material"],
    ["套","tao","4","套圈","to loop"], ["夜","ye","4","夜晚","night"],
    ["踢","ti","1","踢球","to kick"], ["圈","quan","1","套圈","ring"],
    ["市","shi","4","夜市","market"], ["筝","zheng","1","风筝","zither"],
    ["烤","kao","3","烧烤","to roast"], ["但","dan","4","但是","but"],
    ["肠","chang","2","香肠","sausage"], ["闹","nao","4","热闹","noisy"],
    ["翅","chi","4","鸡翅","wing"], ["摊","tan","1","摊位","stall"],
    ["射","she","4","射击","to shoot"], ["阵","zhen","4","一阵","a burst"],
    ["碰","peng","4","碰碰车","to bump"], ["引","yin","3","吸引","to attract"],
    ["饮","yin","3","饮料","to drink"], ["群","qun","2","人群","crowd"]
  ],
  "第十八课": [
    ["馆","guan","3","博物馆","hall"], ["沙","sha","1","沙滩","sand"],
    ["城","cheng","2","城市","city"], ["院","yuan","4","医院","courtyard"],
    ["捡","jian","3","捡贝壳","to pick up"], ["植","zhi","2","植物","to plant"],
    ["壳","ke","2","贝壳","shell"], ["海","hai","3","大海","sea"],
    ["区","qu","1","市区","district"], ["岸","an","4","海岸","shore"],
    ["处","chu","4","到处","place"], ["参","can","1","参观","to take part"],
    ["街","jie","1","街道","street"], ["观","guan","1","参观","to view"],
    ["整","zheng","3","整齐","tidy"], ["野","ye","3","野餐","wild"],
    ["齐","qi","2","整齐","neat"], ["泳","yong","3","游泳","swimming"],
    ["离","li","2","离开","to leave"]
  ],
  "第十九课": [
    ["浇","jiao","1","浇花","to water"], ["约","yue","1","节约","to save"],
    ["渴","ke","3","口渴","thirsty"], ["桶","tong","3","水桶","bucket"],
    ["浪","lang","4","浪费","wave"], ["低","di","1","低头","low"],
    ["厕","ce","4","厕所","toilet"], ["费","fei","4","浪费","to spend"],
    ["所","suo","3","厕所","place"], ["流","liu","2","流水","to flow"],
    ["告","gao","4","告诉","to tell"], ["连","lian","2","连忙","to link"],
    ["诉","su","4","告诉","to inform"], ["线","xian","4","水线","line"],
    ["珍","zhen","1","珍惜","precious"], ["断","duan","4","不断","to break off"],
    ["惜","xi","1","珍惜","to cherish"], ["猜","cai","1","猜猜","to guess"],
    ["滴","di","1","一滴水","a drop"], ["摇","yao","2","摇头","to shake"]
  ]
};

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
  ],
  "第十一课 词表": [
    ["折","折过","zhe","2","have folded"],
    ["纸","纸飞机","zhi","3","paper aeroplane"],
    ["块","魔术方块","kuai","4","Rubik's Cube"],
    ["跟","跟","gen","1","and"],
    ["棋","跳棋","qi","2","Chinese checkers"],
    ["搭","搭","da","1","to build up"],
    ["积","积木","ji","1","blocks"],
    ["娃","布娃娃","wa","2","rag doll"],
    ["器","机器人","qi","4","robot"],
    ["许","许多","xu","3","many"],
    ["绳","跳绳","sheng","2","rope skipping"],
    ["捏","捏","nie","1","to mould"],
    ["拼","拼","pin","1","to fix together"],
    ["图","拼图","tu","2","puzzle"],
    ["船","纸船","chuan","2","paper boat"],
    ["象","象棋","xiang","4","Chinese chess"],
    ["石","五石子","shi","2","Five Stones"],
    ["更","更","geng","4","more"],
    ["鹰","老鹰","ying","1","eagle"],
    ["追","追","zhui","1","to chase"]
  ],
  "第十二课 词表": [
    ["远","永远","yuan","3","forever"],
    ["轻","年轻","qing","1","young"],
    ["岁","长命百岁","sui","4","longevity and good health"],
    ["康","健康","kang","1","healthy"],
    ["幸","幸福","xing","4","happy; blessed"],
    ["愿","许愿","yuan","4","to make a wish"],
    ["吹","吹","chui","1","to blow"],
    ["糕","蛋糕","gao","1","cake"],
    ["首","首","shou","3","measure word for a song"],
    ["张","张","zhang","1","measure word for a card"],
    ["卡","生日卡","ka","3","birthday card"],
    ["票","电影票","piao","4","movie ticket"],
    ["礼","礼物","li","3","gift"],
    ["厅","客厅","ting","1","living room"],
    ["写","写","xie","3","to write"],
    ["想","想","xiang","3","to think"],
    ["怪","奇怪","guai","4","strange"],
    ["活","活动","huo","2","activity"],
    ["宝","宝贝","bao","3","darling"]
  ]
};


/* 生字表 · 我会写 — Primary 2 textbook, lessons 11–19.
   [character, pinyin, tone, word it appears in, meaning] */
var HANZI = {
  "第九课": [
    ["冷","leng","3","冷天","cold"],
    ["乌","wu","1","乌云","dark; black"],
    ["电","dian","4","电闪","electricity"],
    ["闪","shan","3","闪电","to flash"],
    ["风","feng","1","刮风","wind"],
    ["刮","gua","1","刮风","to blow"],
    ["带","dai","4","带伞","to bring"],
    ["伞","san","3","雨伞","umbrella"],
    ["放","fang","4","放学","to let out"],
    ["急","ji","2","着急","anxious"],
    ["问","wen","4","问一问","to ask"],
    ["孩","hai","2","孩子","child"],
    ["忘","wang","4","忘记","to forget"],
    ["记","ji","4","记得","to remember"]
  ],
  "第十课": [
    ["爬","pa","2","爬来爬去","to crawl"],
    ["枝","zhi","1","树枝","branch"],
    ["跳","tiao","4","跳来跳去","to jump"],
    ["眼","yan","3","眼睛","eye"],
    ["睛","jing","1","眼睛","eye"],
    ["鸟","niao","3","小鸟","bird"],
    ["叶","ye","4","树叶","leaf"],
    ["帮","bang","1","帮忙","to help"],
    ["捉","zhuo","1","捉害虫","to catch"],
    ["甜","tian","2","甜甜的","sweet"],
    ["喜","xi","3","喜欢","to like"],
    ["欢","huan","1","喜欢","to like"]
  ],
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

/* ==========================================================================
   TC_TINGXIE — the 听写 sheets themselves, 南洋小学 二年级高级华文.
   Section (二) 填写字词: a sentence with the tested characters knocked out.
   s   the sentence, □ where a character is missing
   a   the missing characters, in order
   Read off the workbook and checked against the 生字表. Lessons 13 and 14 use
   every character on their 我会写 list exactly once; 18 and 19 do not, because
   the school's own sentences do not — 18 reaches for 干 and 馆 off the 我会认
   list, and 19 never tests 重 or 猜. Left as the school wrote them.
   ========================================================================== */
var TC_TINGXIE = {
  /* Keyed by lesson so it lines up with HANZI and RECOG on the 生字表 grid. */
  "第十三课": [
    ["□只小鸟病了，主人要带它去看兽□。", "那医"],
    ["小美见到老师就打招呼，大家都□□她很有礼貌。", "觉得"],
    ["□和□是我们生活中常见的宠物。", "猫狗"],
    ["昨天□上，我□见妈妈送给我一只小白□。", "晚梦兔"],
    ["小明以□□是乱□垃圾，后来改掉了坏习惯。", "前总丢"]
  ],
  /* 第十四课 — NOT off the workbook. The school's sheet for this lesson has not
     come home yet, so these are practice sentences written to the same shape:
     every character on the 我会写 list used once, inside a sentence a P2 child
     would actually meet. Swap them for the real ones when the page turns up. */
  "第十四课": [
    ["这道题很□，那道题却很□□。", "难容易"],
    ["做完功课后，我们□□早点休息。", "应该"],
    ["哥哥的□业写完了，你的□？", "作呢"],
    ["弟弟和妹妹为了一个玩具□□起来。", "争吵"],
    ["他跌倒了，□上受了点□。", "脸伤"],
    ["只要多练习，你就□写好这些字。", "能"]
  ],
  "第十八课": [
    ["小丽把故事书放回□□的书架上。", "干净"],
    ["爸妈带我坐缆车到圣淘沙□□□洋□。", "参观海馆"],
    ["市□的街道很干□，到□都能看到美丽的花草树木。", "区净处"],
    ["昨天，欢欢和小乐一起去□边□□。", "海游泳"],
    ["我们□□了新加□美术馆和□家博物馆后，学到了很多知识。", "参观坡国"]
  ],
  "第十九课": [
    ["我每天吃饭前会先去□手。", "洗"],
    ["出门前，外□□□我要记得带伞。", "婆告诉"],
    ["跑完步后我很口□，妈妈连忙倒水给我□。", "渴喝"],
    ["我们在生□中要学会节□。", "活约"],
    ["弟弟知道错了，□□跟哥哥说对不起。", "连忙"]
  ]
};

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
/* Shared results database. Both of these are meant to be public — the
   publishable key opens nothing on its own, because row level security
   requires a signed-in family account. */
var SUPA_URL = "https://bbaysfiqeppteiqozmwd.supabase.co";
var SUPA_KEY = "sb_publishable__AP7bKLoEneuD9Vh5SXXYA_oVmZRCkc";
/* Sign-in takes a plain name. This gets tacked on to make it an email,
   which is all Supabase needs. Type "chewtopia", it sends
   "chewtopia@chewtopia.family". A full email typed in still works. */
var FAMILY_DOMAIN = "@chewtopia.family";

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
  {id:"e4", t:"华文听写",        d:"2026-08-06", w:"sc", p:"zh|Week 6 · 6 Aug"},
  {id:"e5", t:"Birthday party", d:"2026-08-08", w:"sc"},
  {id:"e6", t:"Spelling test",  d:"2026-08-12", w:"sc", p:"es|Week 7 · 12 Aug"},
  {id:"e7", t:"Chiang Mai",     d:"2026-09-04", d2:"2026-09-07"},
  {id:"e8", t:"HPB form due — health screening", d:"2026-08-11", w:"sc",
   n:"Fill in the online Medical Information and Lifestyle Questionnaire from HPB's letter. It is not a consent form — to opt out, email HPB directly."},
  {id:"e9", t:"HPB health screening", d:"2026-08-21", d2:"2026-08-25", w:"sc",
   n:"Annual health screening for K1 and K2, held in school. Nothing to bring."},

  /* Nanyang Primary, August info sheet NYPS2026/07/093 */
  {id:"e10", t:"National Day celebration", d:"2026-08-07", time:"07:30", w:"tc",
   n:"Be there by 7.30am at the Basketball and Multi-purpose Courts, King's Road campus. Red top with school shorts. In a small bag: a storybook for silent reading, healthy snacks, a water bottle, a National Day food item that means something about Singapore (his own to eat), and a hand-held flag if he wants one. Out at 10.30am — school bus runs as usual, or drive in between 10.50 and 11.15am."},
  {id:"e11", t:"No school — PSLE oral", d:"2026-08-12", d2:"2026-08-13", w:"tc", hol:1,
   n:"P1 to P5 stay home both days while the P6 oral exams run. Only children booked into Student Care go in."},
  {id:"e12", t:"Founders' Day — 109th", d:"2026-08-14", w:"tc",
   n:"The school was founded 15 August 1917. Every child gets a longevity bun with lotus paste, halal option available. Normal school day, nothing to bring."},

  /* Nanyang Kindergarten, National Day letter 28 Jul 2026 */
  {id:"e13", t:"National Day learning journey", d:"2026-08-07", time:"07:45", w:"sc",
   n:"Drop off at the 118 King's Road campus — teachers take them from 7.45am. Journey runs 8.00 to 11.15am, walking to places from Singapore's founding. Red top with white bottoms. Pack in a backpack: a cap, a water bottle, a light raincoat, and shoes he can walk in. Breakfast is given at school. No school bus at all today, so both trips are on us."},
  {id:"e14", t:"Public holiday — National Day (in lieu)", d:"2026-08-10", hol:1,
   n:"9 August falls on a Sunday. Kindergarten reopens Tuesday 11 August."},
  {id:"e15", t:"Spelling test — List 3.4", d:"2026-08-04", w:"tc", p:"en|3.4",
   n:"STELLAR Unit 9. Eight words plus two dictation sentences."},
  {id:"e17", t:"华文听写", d:"2026-08-20", w:"sc", p:"zh|Week 8 · 20 Aug",
   n:"第八周 · 八月二十日 (星期四). 狼, 蛇, 鸭子, 乌龟, 小花猫."},
  {id:"e18", t:"Spelling test", d:"2026-08-26", w:"sc", p:"es|Week 9 · 26 Aug",
   n:"Week 9, Wednesday. cookies, bake, juice, tray, flour, and the sentence."},
  {id:"e16", t:"华文 test — 我学会了 第九至十二课", d:"2026-08-06", w:"tc", p:"hz|第九课",
   n:"All four lessons are now in Training. 我会写 生字 for 第九课 (weather), 第十课 (小动物), 第十一课 and 第十二课, plus 词表 word lists for 11 and 12. Work through them in order."},

  /* TC spelling runs two Tuesdays on, one Tuesday off. 3.3 on 28 Jul, 3.4 on
     4 Aug, the 11th was the rest week (and the PSLE oral closure), so the run
     picks up again here. After 25 Aug comes another rest week, then the Term 3
     holiday, so 3.6 is the last one this term. */
  {id:"e19", t:"Spelling test — List 3.5", d:"2026-08-18", w:"tc", p:"en|3.5",
   n:"STELLAR Unit 10. Seven words plus three dictation sentences."},
  {id:"e20", t:"Spelling test — List 3.6", d:"2026-08-25", w:"tc", p:"en|3.6",
   n:"STELLAR Unit 10. Seven words plus three dictation sentences. Last spelling test of Term 3."},

  /* 听写 is a Thursday. The 13 Aug one moved to Friday the 14th because of the
     PSLE oral closure; this is the next one. */
  /* The practice button opens 我会写, not the 听写 sheet: the sheet column is
     no longer on Training, so this is the way he practises the lesson now. */
  {id:"e21", t:"华文听写 — 第十四课", d:"2026-08-27", w:"tc", p:"hz|第十四课",
   n:"Thursday, fortnightly. 第十四课 生字: 难, 该, 作, 易, 伤, 脸, 争, 容, 吵, 能, 应, 呢. Training has 我会认 and 我会写, plus 默写 to read out while he writes on paper."},

  /* MOE school calendar 2026 — Term 3 runs 29 Jun to 4 Sept, Term 4 from 14 Sept. */
  {id:"e22", t:"Teachers' Day — no school", d:"2026-09-04", w:"tc", hol:1,
   n:"Also the last day of Term 3."},
  {id:"e23", t:"Term 3 holidays", d:"2026-09-05", d2:"2026-09-13", w:"tc", hol:1,
   n:"Term 4 starts Monday 14 September."},
  {id:"e24", t:"Children’s Day — no school", d:"2026-10-02", hol:1,
   n:"Both schools. The kindergarten’s Term 4 pledge schedule has the Friday down as a holiday too, which is why this is no longer TC’s alone."},
  {id:"e25", t:"End of school year", d:"2026-11-21", d2:"2026-12-31", w:"tc", hol:1,
   n:"Term 4 ends Friday 20 November."},

  /* From ClassDojo, class 2J. Only the ones still open — the filing reminders
     and the worksheets already handed back have all been and gone. */
  {id:"e26", t:"Book cover competition — entries close", d:"2026-08-16", time:"23:59", w:"tc",
   n:"Inter-school \u201cCelebrate Singapore Together\u201d library competition: design a book cover on what Singapore means to him. Book vouchers and a certificate for winners, and the winning covers go into the school library e-book system. Queries to the librarian, poh_yeow_khoon@nanyangpri.edu.sg."},
  /* Mdm Leong's fractions revision. The SLS deadline itself has gone, but
     fractions is what the class is on, so it sits on the next school day with
     a practice button rather than nowhere. Being dated also means the "Ten
     minutes of practice" button pulls questions from it. */
  {id:"e28", t:"Maths — Fractions", d:"2026-08-17", w:"tc", p:"ma|frac",
   n:"Mdm Leong set an SLS activity, Introduction to Fractions, to revise what the class has covered — plus pages 72\u201375 of the practice book. Unit and like fractions: naming them, comparing them, adding and subtracting with the same bottom number."},
  {id:"e27", t:"Connectogram — parents to fill in", d:"2026-08-26", w:"tc",
   n:"Miss Lee \u674e\u8001\u5e08 asked parents to help their child complete it by 26 August, so the teachers understand how the class gets on together.",
   url:"https://forms.moe.edu.sg/sna/forms/vK3M45"},

  /* Nanyang Kindergarten, K2 English teachers — coins for the counting-money
     unit. Dated the day they are due in, not the day the letter came. */
  {id:"e29", t:"Bring $3 in coins — counting money", d:"2026-08-24", w:"sc",
   n:"Exactly 4 × 10¢, 3 × 20¢, 2 × 50¢ and 1 × $1 — $3 altogether. In a small purse or ziplock bag with his name on it, in school by Monday 24 August. The coins stay in class for the counting activities and come back at the end of Term 4. Teachers are not liable for any that go missing."},

  /* Nanyang Primary, P1 2027 welcome letter — SC starts P1 next January, so
     these are his, not TC's, even though the letter comes from TC's school. */
  {id:"e31", t:"Download Parents Gateway", d:"2026-10-01", w:"sc",
   n:"From October the school sends every announcement, letter and consent form through the Parents Gateway app, not by email. Get it onto the phone before then so nothing is missed.",
   url:"https://pg.moe.edu.sg"},
  {id:"e32", t:"P1 Orientation Day", d:"2026-11-20", w:"sc",
   n:"Physical orientation at Nanyang Primary for him and a parent, Friday afternoon. Times and the rest come closer to the date, through Parents Gateway."},


  /* From the K2 parents' WhatsApp group, read off the thread rather than from
     the school. Two birthdays and the graduation. Anything in that group that
     was already over (the Twinkl free downloads, the 2C results) is not here,
     and neither is the chat. */
  /* Off the printed invitation, which had a good deal more on it than the
     group chat did - it is a joint party for both children, and it has a
     time, an address and two numbers to call. */
  {id:"e33", t:"Aurora & Albus\u2019 birthday party", d:"2026-09-26", time:"12:00", w:"sc",
   n:"Saturday, 12noon to 4pm, cake cutting at 2.15pm. Clementi Park Condo clubhouse, 120 Sunset Way S(597152). A joint party for the two of them. RSVP to Darius on 9831 8353 or Yee Jing on 8112 4148."},

  /* Our own reminder, not the hosts\u2019: the invitation gives two numbers to
     RSVP to and no date to do it by, and a party with a room and a caterer
     behind it wants an answer well before the week of. A Saturday, so there
     is time to call. */
  {id:"e37", t:"RSVP for Aurora & Albus\u2019 party", d:"2026-09-19", w:"sc",
   n:"Darius on 9831 8353 or Yee Jing on 8112 4148. The invitation sets no deadline \u2014 this is a week before, to give them a headcount in time for the room and the food."},
  {id:"e34", t:"RSVP for Arden\u2019s birthday", d:"2026-10-07", w:"sc",
   n:"Headcount by Wednesday 7 October, adults and kids, so Jeremy and Candice can book the room and the food. Siblings are welcome, so TC counts too.",
   url:"https://luma.com/5z0qfvda"},
  {id:"e35", t:"Arden Au\u2019s birthday party", d:"2026-11-07", w:"sc",
   n:"Saturday morning. Siblings welcome. RSVP was due a month before, on 7 October."},

  /* The one date in that thread that is the school\u2019s, not a parent\u2019s. Two
     parents asked how long it runs and nobody in the group knew; the 9am is
     one parent saying they were told the morning session starts then, which
     is why it is a note and not a time on the event. */
  {id:"e36", t:"K2 graduation and concert", d:"2026-11-19", w:"sc",
   n:"Thursday. A parent in the group was told the morning session starts at 9. How long it runs nobody in the group knew, and the school had not said \u2014 worth asking, because P1 orientation at Nanyang Primary is the very next afternoon."},

  /* Nanyang Kindergarten, letter from the principal 31 Aug 2026. A drill, not
     an incident — said so in the title, so that nobody reads the word
     "intruder" off a phone screen and thinks something has happened. Nothing
     to bring and nothing to sign; the only thing asked of us is the
     conversation the night before. */
  {id:"e38", t:"Security drill — practice only", d:"2026-09-03", w:"sc",
   n:"Thursday. An ECDA intruder-alert drill at the kindergarten: the children practise moving quickly to a secure area and staying quiet with their teachers. Nothing to bring and nothing to sign. Worth telling him the night before that it is a practice, like a fire drill — listening to the teacher and keeping quiet is the whole of it."},

  /* Nanyang Kindergarten, Term 4 pledge schedule from the principal.
     Every K2 child takes a turn leading the National Pledge at assembly,
     and the whole class list is on the letter — only his day is here.
     The week decides the language, not the child: weeks 1, 3 and 5 are
     宣读信约 and weeks 2 and 4 are English, and his week is a Chinese one.
     Time on the event is the 8.05am the letter asks parents to be in by,
     not the start of the school day. */
  {id:"e39", t:"宣读信约 — his turn to lead the pledge", d:"2026-09-17", time:"08:05", w:"sc",
   n:"Thursday of week 1, in Mandarin. Family may come and watch — be in school by 8.05am sharp, and leave promptly once assembly is over. Neatly dressed, covered shoes. There is no second slot if he is late or away: the only way to move it is to swap directly with another parent in the class and tell the school."},

  /* Also off that schedule: the kindergarten marks Children’s Day on the
     Thursday and closes on the Friday. */
  {id:"e40", t:"Children’s Day celebration", d:"2026-10-01", w:"sc",
   n:"Thursday, in school. The holiday itself is the next day."}
];

/* ==========================================================================
   SINGAPORE PUBLIC HOLIDAYS — the gazetted list from the Ministry of Manpower.
   Everyone's, so they run the full width of Upcoming, and hol:1 gives them
   their own quiet colour: these are days off, not things to do.

   Where a holiday lands on a Sunday the Monday after is gazetted in its place,
   and that Monday is the one that matters — it is the day there is no school.
   Both are listed so the reason is never a mystery.
   ========================================================================== */
var SG_HOLIDAYS = [
  /* --- 2026 --- */
  {id:"ph26-1108", t:"Deepavali",                d:"2026-11-08", hol:1},
  {id:"ph26-1109", t:"Public holiday — Deepavali (in lieu)", d:"2026-11-09", hol:1,
   n:"Deepavali falls on a Sunday, so the Monday is the day off."},
  {id:"ph26-1225", t:"Christmas Day",            d:"2026-12-25", hol:1},
  /* --- 2027 --- */
  {id:"ph27-0101", t:"New Year's Day",           d:"2027-01-01", hol:1},
  {id:"ph27-0206", t:"Chinese New Year",         d:"2027-02-06", d2:"2027-02-07", hol:1,
   n:"初一 Saturday, 初二 Sunday."},
  {id:"ph27-0208", t:"Public holiday — Chinese New Year (in lieu)", d:"2027-02-08", hol:1,
   n:"初二 falls on a Sunday, so the Monday is the day off."},
  {id:"ph27-0310", t:"Hari Raya Puasa",          d:"2027-03-10", hol:1},
  {id:"ph27-0326", t:"Good Friday",              d:"2027-03-26", hol:1},
  {id:"ph27-0501", t:"Labour Day",               d:"2027-05-01", hol:1},
  {id:"ph27-0517", t:"Hari Raya Haji",           d:"2027-05-17", hol:1},
  {id:"ph27-0520", t:"Vesak Day",                d:"2027-05-20", hol:1},
  {id:"ph27-0809", t:"National Day",             d:"2027-08-09", hol:1},
  {id:"ph27-1028", t:"Deepavali",                d:"2027-10-28", hol:1},
  {id:"ph27-1225", t:"Christmas Day",            d:"2027-12-25", hol:1}
];
SEED_EVENTS = SEED_EVENTS.concat(SG_HOLIDAYS);

/* ==========================================================================
   SCHOOL LINKS — the sites the school actually sends you to. These open the
   real login page in a new tab; nothing here stores a username or a password,
   and it never should on a tablet the boys use.
   ========================================================================== */
var SCHOOL_LINKS = [
  {id:"sls", t:"SLS", cn:"\u5b66\u4e60\u7a7a\u95f4",
   s:"Student Learning Space \u2014 where the class activities are set. Log in with MIMS.",
   u:"https://vle.learning.moe.edu.sg", k:"sls"},
  {id:"icon", t:"Student iCON", cn:"",
   s:"His school Google account \u2014 Docs, Slides and school email.",
   u:"https://workspace.google.com/dashboard", k:"icon"},
  {id:"dojo", t:"ClassDojo", cn:"",
   s:"Messages from the teachers, and what has been set for home.",
   u:"https://home.classdojo.com", k:"dojo"},
  /* The MIMS sign-in. The address the school hands out is a one-visit link: it
     carries a client_id, a redirect back to whichever site sent you, and a
     single-use state token, so it belongs to that one sign-in and is stale by
     the next. Only the stable part is kept, which lands on the same page. */
  {id:"mims", t:"MIMS", cn:"",
   s:"The MOE sign-in behind SLS, iCON and the school forms.",
   u:"https://idp.mims.moe.gov.sg/nidp/app/login?id=mims", k:"mims"}
];

/* ==========================================================================
   CCAs AT NANYANG PRIMARY - what the school offers, so the choice is not a
   surprise the term it has to be made. The names, and who each one takes, are
   off MOE's own school listing for Nanyang Primary. That listing does NOT say
   which levels each CCA takes or when they meet, so neither do we.

   Three separate questions get three separate buttons, because rolling them
   into one tag got the whole panel misread:

   dsa   : which of MOE's seven DSA-Sec talent categories it counts in. Every
           CCA counts in one, so the button is the same everywhere and only
           the category behind it differs - it is on the screen to say "this
           is a DSA category", nothing more. moe.gov.sg/secondary/dsa
   inri  : 1 if Raffles runs this as a CCA, so he could carry on doing it
           there. Off RI's own entry on MOE SchoolFinder.
   ridsa : 1 if Raffles takes DSA in an area of exactly this name.

   The two are genuinely different and the difference is the useful bit:
   Football and International Chess are both CCAs at RI, and RI says outright
   it takes no DSA in either. Being able to do it there is not being able to
   get in through it.

   RI publishes its DSA areas only while the exercise is open, so those come
   from the last one it ran, off ask.gov.sg/ri. RI reviews the list yearly.
   ========================================================================== */
var NYPS_CCA = [
  {h:"Sports", em:"\uD83C\uDFC3", cca:[
    {t:"Artistic Gymnastics", g:"g", dsa:"Sports and games", inri:0, ridsa:0},
    {t:"Badminton",           g:"",  dsa:"Sports and games", inri:1, ridsa:1},
    {t:"Basketball",          g:"",  dsa:"Sports and games", inri:1, ridsa:1},
    {t:"Football",            g:"b", dsa:"Sports and games", inri:1, ridsa:0},
    {t:"Table Tennis",        g:"",  dsa:"Sports and games", inri:1, ridsa:1},
    {t:"Tennis",              g:"",  dsa:"Sports and games", inri:1, ridsa:1},
    {t:"Track and Field",     g:"",  dsa:"Sports and games", inri:1, ridsa:1},
    {t:"Wushu",               g:"",  dsa:"Sports and games", inri:0, ridsa:0}
  ]},
  {h:"Visual and performing arts", em:"\uD83C\uDFB5", cca:[
    {t:"Art and Crafts",                         g:"",  dsa:"Visual, literary and performing arts", inri:0, ridsa:0},
    {t:"Chinese Calligraphy and Brush Painting", g:"",  dsa:"Visual, literary and performing arts", inri:0, ridsa:0},
    {t:"Chinese Dance",                          g:"g", dsa:"Visual, literary and performing arts", inri:0, ridsa:0},
    {t:"Chinese Orchestra",                      g:"",  dsa:"Visual, literary and performing arts", inri:1, ridsa:1},
    {t:"Choir",                                  g:"b", dsa:"Visual, literary and performing arts", inri:1, ridsa:1},
    {t:"String Ensemble",                        g:"",  dsa:"Visual, literary and performing arts", inri:1, ridsa:1}
  ]},
  {h:"Clubs and societies", em:"\u265F\uFE0F", cca:[
    {t:"International Chess", g:"", dsa:"Sports and games",                     inri:1, ridsa:0},
    {t:"Robotics",            g:"", dsa:"Science, mathematics and engineering", inri:0, ridsa:0}
  ]},
  {h:"Uniformed groups", em:"\uD83E\uDDE2", cca:[
    {t:"Boys\u2019 Brigade",         g:"b", dsa:"Uniformed groups", inri:1, ridsa:0},
    {t:"Girl Guides (Brownies)", g:"g", dsa:"Uniformed groups", inri:0, ridsa:0},
    {t:"Girls\u2019 Brigade",        g:"g", dsa:"Uniformed groups", inri:0, ridsa:0},
    {t:"Scouts",                 g:"",  dsa:"Uniformed groups", inri:1, ridsa:0}
  ]}
];

/* What the RI tag on each CCA means, and — the part that matters — what it
   does not. Written out because the panel on its own reads like a promise,
   and the first time it was shown the tags were taken for "join this, get in
   through it", which is not what any of them say.

   Every quoted line below is RI's own, off ri.edu.sg and ask.gov.sg/ri.
   ========================================================================== */
var CCA_NOTES = [
  ["The three buttons, plainly",
   "DSA says the CCA counts in one of MOE's seven talent categories \u2014 they "+
   "all do, so that button never rules anything out. IN RI says Raffles runs "+
   "it as a CCA, so he could keep doing it there. RI DSA says Raffles takes "+
   "DSA applications in it. Those last two are different questions and the "+
   "difference is the useful part."],
  ["Football and Chess prove the point",
   "Both are CCAs at Raffles \u2014 IN RI \u2014 and Raffles says outright it takes no "+
   "DSA in either. Being able to do it at RI is not being able to get in "+
   "through it, and the two buttons are there so that never has to be guessed "+
   "at again."],
  ["A green RI DSA button is still not a way in",
   "It says Raffles ran an area of that name last round, and nothing more. "+
   "RI's own page says meeting every criterion guarantees neither a shortlist "+
   "nor an offer \u2014 and that applicants who have never done the activity may "+
   "apply too, because potential is assessed. The CCA is not the "+
   "qualification."],
  ["Grey does not mean pointless",
   "Raffles is one school out of dozens that take DSA, and football, chess and "+
   "robotics are talent areas at plenty of them. RI's own advice for a "+
   "robotics child is to apply under Mathematics or Science with the robotics "+
   "achievements as supporting evidence."],
  ["RI DSA means RI runs an area of exactly that name",
   "Nothing looser, so the button never has to be interpreted. RI also runs "+
   "Visual Arts and Leadership & Character, which no CCA here is named after "+
   "\u2014 an art child applies under the first, a child with a leadership record "+
   "under the second, and being in Art and Crafts or the Scouts is neither "+
   "required for that nor sufficient. That is a conversation for P6, not a "+
   "tag on a list."],
  ["What is actually looked at",
   "The standard reached, evidenced: age-group or national selection, SYF, "+
   "National School Games, a graded music exam \u2014 plus RI's own trial, "+
   "audition or interview. Almost none of that comes from the school CCA "+
   "alone. Six years of turning up on a Wednesday is not evidence of "+
   "anything."],
  ["So pick it for the six years",
   "This is four hours a week of his life until he is eighteen. Choosing it to "+
   "game an application that mostly looks elsewhere is optimising the wrong "+
   "thing \u2014 and a child who enjoys it is the one who reaches the standard "+
   "that does count."]
];

/* ==========================================================================
   HOW THE PSLE IS SCORED - the thing every CCA and streaming conversation
   eventually circles back to, written down once so it does not have to be
   half-remembered off a WhatsApp group.

   All of it is MOE's, from:
     moe.gov.sg/psle-fsbb/psle/psle-scoring-system          (ALs, the score)
     moe.gov.sg/secondary/s1-posting/how-to-choose/...      (posting groups,
                                                             tie-breakers)
   The mark ranges are MOE's own word "reference" ranges - the AL a child gets
   is set against the cohort, so a printed range is a guide, not a promise.

   TC sits it in 2030 and SC in 2032, counting forward from P2 and K2 in 2026.
   ========================================================================== */
var PSLE_AL = [
  {al:"AL 1", m:"90 and above"},
  {al:"AL 2", m:"85 to 89"},
  {al:"AL 3", m:"80 to 84"},
  {al:"AL 4", m:"75 to 79"},
  {al:"AL 5", m:"65 to 74"},
  {al:"AL 6", m:"45 to 64"},
  {al:"AL 7", m:"20 to 44"},
  {al:"AL 8", m:"below 20"}
];

/* Where the totals come from, because "4 to 6" means nothing until you have
   seen it added up once. Four subjects, one AL each, so the smallest total
   possible is four ones and the largest is four eights. It is not a mark out
   of anything and it is not a percentage - it is four small numbers added. */
var PSLE_MAKE = [
  {n:"4",  sum:"1 + 1 + 1 + 1", w:"90 or more in all four subjects. Nothing better exists."},
  {n:"5",  sum:"1 + 1 + 1 + 2", w:"Three at 90+, one at 85-89."},
  {n:"6",  sum:"1 + 1 + 2 + 2", w:"Two at 90+, two at 85-89."},
  {n:"8",  sum:"2 + 2 + 2 + 2", w:"85-89 across the board."},
  {n:"12", sum:"3 + 3 + 3 + 3", w:"80-84 across the board."},
  {n:"20", sum:"5 + 5 + 5 + 5", w:"65-74 across the board."},
  {n:"32", sum:"8 + 8 + 8 + 8", w:"The largest total there is."}
];

/* What the total opens up. G3/G2/G1 are the subject levels that replaced
   Express, Normal (Academic) and Normal (Technical). */
var PSLE_PG = [
  {s:"4 to 20",  g:"PG3",        n:"every subject at G3, the most demanding level"},
  {s:"21 to 22", g:"PG3 or PG2", n:""},
  {s:"23 to 24", g:"PG2",        n:"most subjects at G2"},
  {s:"25",       g:"PG2 or PG1", n:""},
  {s:"26 to 30", g:"PG1",        n:"needs AL 7 or better in both English and maths"}
];

/* The notes under the tables. Kept here so the wording is edited in one place
   with everything else, and app.js stays the shape of the panel only. */
var PSLE_NOTES = [
  ["The four subjects",
   "English, mother tongue, maths and science. Each is marked on its own and "+
   "given an Achievement Level from 1 to 8 - no bell curve against the rest of "+
   "the cohort, so a good year for everyone is a good result for everyone."],
  ["The score",
   "Add the four ALs together. 4 is the best possible and 32 the worst, and "+
   "there are only 29 totals in between - far fewer rungs than the old "+
   "aggregate, which is the whole point of it."],
  ["Foundation subjects",
   "Graded A, B or C, which count as AL 6, AL 7 and AL 8 when the four are "+
   "added up."],
  ["高级华文",
   "Graded Distinction, Merit or Pass, and it does NOT go into the score. It "+
   "buys a posting advantage at a SAP school on a score of 14 or better, and "+
   "where two children with the same score want the same SAP place, the better "+
   "华文 grade goes first - ahead of the ordinary tie-breakers."],
  ["Same score, one seat",
   "Citizenship first (citizens, then PRs, then international students), then "+
   "who put the school higher on their list, and only then a ballot."]
];

/* ==========================================================================
   THE WORDS - every abbreviation on this tab, decoded once. Nothing here is
   an opinion; it is what each term means, and where it bites for our two.
   ========================================================================== */
var JARGON = [
  {k:"AL", t:"Achievement Level",
   d:"One per subject, 1 to 8, and 1 is the best. It is the band his raw mark "+
     "falls in - AL 1 is 90 and above, AL 8 is under 20. He gets four of them."},
  {k:"PSLE Score", t:"The four ALs added together",
   d:"That is all it is. Smallest possible 4, largest 32, and LOWER IS BETTER. "+
     "It is not a percentage and not a mark out of anything."},
  {k:"4 to 6", t:"What a school's range means",
   d:"The band of totals that school actually took at the last posting. \"4 to "+
     "6\" means everyone admitted had four ALs adding to between 4 and 6 - "+
     "AL 1 in all four subjects, or one band worse in two of them. It is not a "+
     "target the school sets; it is what the applicants happened to be."},
  {k:"(D) (M)", t:"The Higher Chinese grade on a cut-off",
   d:"Distinction and Merit. \"4(D) to 6(M)\" means the last child in got a 6 "+
     "AND a Merit in Higher Chinese. Where a range carries one, the number on "+
     "its own was not enough."},
  {k:"HCL / 高级华文", t:"Higher Chinese Language",
   d:"Graded Distinction, Merit or Pass, and it does NOT go into the score. It "+
     "buys a SAP posting advantage at a score of 14 or better, and where two "+
     "children tie for a SAP seat the better grade goes first. TC does it "+
     "already; it is most of why the practice in this app is 高级华文."},
  {k:"PG1 PG2 PG3", t:"Posting Group",
   d:"Which band he is posted into, from his score. PG3 is 4-20 and is the "+
     "most demanding; PG2 is 23-24; PG1 is 26-30. It decides the level his "+
     "subjects start at, not which school he goes to."},
  {k:"G1 G2 G3", t:"Subject levels",
   d:"What replaced Normal (Technical), Normal (Academic) and Express. Set per "+
     "subject rather than for the whole child, and moved up or down later on "+
     "how he actually does."},
  {k:"IP", t:"Integrated Programme",
   d:"Six years in one school straight through to A levels, skipping O levels "+
     "entirely. Entered at Secondary 1. RI, Hwa Chong, Dunman, NJC, Victoria "+
     "and River Valley on our list all run one."},
  {k:"SAP", t:"Special Assistance Plan",
   d:"The Chinese-medium heritage schools. Everyone does Higher Chinese, and "+
     "the culture is bilingual by design. Nanyang Primary is a SAP school, "+
     "which is why the 华文 load is what it is."},
  {k:"DSA", t:"Direct School Admission",
   d:"Applying in P6 on a talent, before the PSLE is sat. Free, and binding: "+
     "accept a place and there are no S1 posting choices and no transfer after "+
     "results."},
  {k:"S1 Posting", t:"The ordinary route",
   d:"Score plus his ranked list of schools. Ties are broken by citizenship, "+
     "then who ranked the school higher, then a ballot."},
  {k:"Affiliation", t:"A lower bar at a linked secondary",
   d:"Some primaries feed a secondary and their children get in on a gentler "+
     "range. Nanyang Primary's is Nanyang Girls' High, which takes girls, so "+
     "neither of ours has one. Worth knowing early."}
];

/* ==========================================================================
   WHAT WE ACTUALLY HAVE TO DO - the whole thing above, turned into the few
   things that are ours to act on, in the order they happen.

   The month names are the shape of the year, taken from MOE's 2026 exercise;
   they move by a week or two each year and MOE publishes the real ones each
   January. TC sits the PSLE in 2030, SC in 2032.
   ========================================================================== */
var TODO = [
  {w:"Now, and for years", t:"Nothing to submit. Two things to build.",
   d:"There is no form and no application before P6. What compounds between "+
     "now and then is only this: the four PSLE subjects, and 高级华文. Every "+
     "SAP cut-off in the table above carries a (D) or an (M), so the 华文 is "+
     "not extra credit - it is part of the price."},
  {w:"Around P3", t:"Pick a CCA he will still want in Secondary 3.",
   d:"Not the one with the best tag. The one he stays in long enough to get "+
     "good at, because the standard is what is looked at and the membership is "+
     "not. If he is going to be serious about a sport or an instrument, the "+
     "level that counts is usually built outside school as well - a club, a "+
     "coach, graded exams."},
  {w:"P4 to P6", t:"Keep the evidence.",
   d:"Certificates, competition results, graded music exams, any age-group or "+
     "national selection. A DSA application is that pile plus a trial or an "+
     "audition. Nobody reconstructs four years of it in May of P6."},
  {w:"P6, January to May", t:"Look at schools, in person.",
   d:"Open houses run through this window. This is also when each school "+
     "publishes its own DSA talent areas for that year - RI takes its list "+
     "down between exercises, so the one in this app is last round's."},
  {w:"P6, early May to early June", t:"DSA applications, if we are doing one.",
   d:"One window for every school, free, done online. Miss it and that is the "+
     "year gone."},
  {w:"P6, June to August", t:"Trials, auditions and interviews.",
   d:"Each school runs its own and they clash. This is the part that actually "+
     "decides a DSA place."},
  {w:"P6, late October", t:"Rank the DSA schools that made an offer.",
   d:"Only if there was an offer. Ranking one is a commitment, not a hedge."},
  {w:"P6, late November", t:"DSA results - before the PSLE result.",
   d:"Take a place and school choices at S1 posting are gone, and so is "+
     "transferring after the results come out."},
  {w:"P6, late November onward", t:"PSLE result, then choose six schools.",
   d:"Only if there is no DSA place. Rank them honestly - the second "+
     "tie-breaker is who put the school higher, so a wishful first choice "+
     "costs nothing but a dishonest order does."}
];

/* ==========================================================================
   SECONDARY SCHOOLS - a shortlist, with what it took to get in last round.

   There is no ranking to show. MOE stopped ranking secondary schools in 2012
   and has not published one since, so anything calling itself a league table
   is somebody's guess dressed up. What MOE does publish is the indicative
   PSLE score range each school actually took, and that is what is here, off
   each school's own page on moe.gov.sg/schoolfinder. MOE says on those pages
   that the ranges move year to year with the cohort and with who applied, so
   read them as last year's weather, not next year's.

   The shortlist is boys' and co-ed schools a Nanyang Primary boy with 高级华文
   would look at - the SAP and Integrated Programme ones. It is not every
   school, and a school missing from it is not a school ruled out.

   (D) and (M) are the Higher Chinese grade that came with that score:
   Distinction and Merit. Where a range carries one, the score alone was not
   enough - the 华文 grade was part of the cut.

   s   : what the school is - IP, SAP, both, or neither.
   pg  : the ranges, most demanding posting group first.
   aff : an affiliated primary, which lowers the bar for its own children.
   ========================================================================== */
var SEC_SCHOOLS = [
  {t:"Raffles Institution", w:"Boys", s:"Integrated Programme",
   pg:[["PG3","4 to 6"]], aff:""},
  {t:"Hwa Chong Institution", w:"Boys", s:"IP \u00b7 SAP",
   pg:[["PG3","4(D) to 6(M)"]], aff:""},
  {t:"Catholic High School", w:"Boys", s:"IP \u00b7 SAP",
   pg:[["PG3","4(D) to 7(M)"],["PG2","6(D) to 8(M)"]],
   aff:"Catholic High School (Primary)"},
  {t:"Dunman High School", w:"Co-ed", s:"IP \u00b7 SAP",
   pg:[["PG3","4(D) to 8(M)"]], aff:""},
  {t:"National Junior College", w:"Co-ed", s:"Integrated Programme",
   pg:[["IP","5 to 8"]], aff:""},
  {t:"Victoria School", w:"Boys", s:"Integrated Programme",
   pg:[["IP","5 to 8"],["PG3","6 to 9"]], aff:""},
  {t:"River Valley High School", w:"Co-ed", s:"IP \u00b7 SAP",
   pg:[["PG3","4(M) to 9(M)"]], aff:""},
  {t:"Maris Stella High School", w:"Boys", s:"SAP",
   pg:[["PG3","4(M) to 16"],["PG3","7(M) to 12"]],
   aff:"Maris Stella High School (Primary)"},
  {t:"NUS High School of Math and Science", w:"Co-ed", s:"Through-train \u00b7 DSA only",
   pg:[["\u2014","no S1 posting at all"]], aff:""}
];

/* The things that decide it, none of which is a ranking. Written out because
   the first is the one that catches Nanyang parents of boys by surprise. */
var SEC_NOTES = [
  ["Nanyang gives our two no affiliation",
   "Nanyang Primary's affiliated secondary is Nanyang Girls' High, and it takes "+
   "girls. So neither boy inherits a place anywhere. The score and DSA are the "+
   "only two doors, which is worth knowing six years early rather than one."],
  ["高级华文 is doing work in that table",
   "Every (D) and (M) above is a Higher Chinese grade that came with the score. "+
   "At a SAP school a score of 14 or better plus a HCL grade is a posting "+
   "advantage, and where two children tie for the last seat the better 华文 "+
   "grade goes first - before citizenship, before order of choice, before the "+
   "ballot."],
  ["DSA is the other door, and it closes early",
   "Applications go in around May of P6 and results come back in November, "+
   "before the PSLE result. Take a DSA place and school choices at S1 posting "+
   "are gone, and so is transferring after results. It is a commitment, not a "+
   "safety net."],
  ["Ranges are last year's, not a promise",
   "MOE republishes them after each posting and says on every school page that "+
   "they shift with the cohort. Two or three points either way is ordinary."]
];

/* ==========================================================================
   KIASUPARENTS - the site and its forum, as links out. Nothing is read in.

   An earlier build pasted the top three threads of each board into this file
   so the tab could be read without leaving it. That is gone, and on purpose.
   It could never have been live: Chewtopia has no server, and the forum sends
   no CORS headers on /api/category, /api/recent, /recent.rss or
   /category/N.rss - all four were tried from the page and every one is
   refused by the browser before the request goes out. So the list had to be
   pasted by hand, and a hand-pasted list of "latest" threads is wrong within
   the week and has to be re-pasted forever. A link that always opens the real
   page beats a copy that quietly rots.

   Every URL below is off the site's own sitemap.xml, and each was fetched and
   checked for a 200 before it went in. The site sections are the ones behind
   its top menu; the boards are the forum's own categories.

   sec:  which group the card sits in - "site" or "forum".
   live: the page is itself a newest-first list.
   ========================================================================== */
var FORUM_LINKS = [
  /* --- the site: the sections behind the menu across the top --- */
  {id:"kp-psle", sec:"site", t:"PSLE", k:"sec",
   s:"Scoring, subject-based banding and the yearly result noise.",
   u:"https://www.kiasuparents.com/kiasu/psle"},
  {id:"kp-dsa", sec:"site", t:"DSA", k:"sec",
   s:"Direct School Admission \u2014 talent areas, timelines, what schools ask for.",
   u:"https://www.kiasuparents.com/kiasu/dsa"},
  {id:"kp-sec2", sec:"site", t:"Secondary", k:"sec",
   s:"Choosing one, getting in, and surviving the first year.",
   u:"https://www.kiasuparents.com/kiasu/secondary"},
  {id:"kp-pri2", sec:"site", t:"Primary", k:"pri",
   s:"Where TC is now. Curriculum, exams, and the P1 to P6 slog.",
   u:"https://www.kiasuparents.com/kiasu/primary"},
  {id:"kp-schools", sec:"site", t:"Primary schools", k:"pri",
   s:"Their directory, school by school.",
   u:"https://www.kiasuparents.com/kiasu/primary-schools"},
  {id:"kp-p1", sec:"site", t:"P1 registration", k:"pri",
   s:"Phases, balloting, parent volunteering. SC is through it; it runs yearly.",
   u:"https://www.kiasuparents.com/kiasu/p1-registration"},
  {id:"kp-pre", sec:"site", t:"Pre-school", k:"pri",
   s:"Kindergarten and childcare, which SC has nearly finished with.",
   u:"https://www.kiasuparents.com/kiasu/pre-school"},
  {id:"kp-tert", sec:"site", t:"Tertiary", k:"sec",
   s:"JC, poly, ITE and university. A long way off, but it is where all of it points.",
   u:"https://www.kiasuparents.com/kiasu/tertiary"},
  {id:"kp-sen", sec:"site", t:"Special needs", k:"cca",
   s:"Support, diagnosis and the schools that provide it.",
   u:"https://www.kiasuparents.com/kiasu/special-needs"},
  {id:"kp-grow", sec:"site", t:"Grow well", k:"cca",
   s:"Health, growth and development \u2014 the sibling of our own Growth tab.",
   u:"https://www.kiasuparents.com/kiasu/grow-well"},
  {id:"kp-well", sec:"site", t:"Well-being", k:"cca",
   s:"The part nobody puts on a timetable.",
   u:"https://www.kiasuparents.com/kiasu/well-being"},
  {id:"kp-act", sec:"site", t:"Activities", k:"cca",
   s:"What is on this weekend, holiday camps and school-break things.",
   u:"https://www.kiasuparents.com/kiasu/activities"},
  {id:"kp-svc", sec:"site", t:"Enrichment and services", k:"cca",
   s:"Their directory of centres, tutors and coaches. Read as advertising.",
   u:"https://www.kiasuparents.com/kiasu/service-providers"},
  {id:"kp-art", sec:"site", t:"Articles", k:"hot", live:1,
   s:"Everything they publish, newest first.",
   u:"https://www.kiasuparents.com/kiasu/articles"},
  {id:"kp-ask", sec:"site", t:"ASKQ", k:"hot",
   s:"Ask the room a question and see what has already been asked.",
   u:"https://www.kiasuparents.com/kiasu/askq"},

  /* --- the forum itself --- */
  {id:"kp-recent", sec:"forum", t:"Latest posts", k:"hot", live:1,
   s:"Everything on the forum, newest first.",
   u:"https://forum.kiasuparents.com/recent"},
  {id:"kp-popular", sec:"forum", t:"Most active", k:"hot", live:1,
   s:"What the forum is arguing about this week.",
   u:"https://forum.kiasuparents.com/popular"},
  {id:"kp-sec", sec:"forum", t:"Secondary schools \u2014 selection", k:"sec",
   s:"Cut-off points, DSA, and what a PSLE score is worth where.",
   u:"https://forum.kiasuparents.com/category/48/secondary-schools-selection"},
  {id:"kp-pri-ac", sec:"forum", t:"Primary schools \u2014 academic support", k:"pri",
   s:"Schoolwork, exams, tuition and learning gaps, P1 to P6.",
   u:"https://forum.kiasuparents.com/category/27/primary-schools-academic-support"},
  {id:"kp-pri-net", sec:"forum", t:"Primary schools \u2014 parent networking", k:"pri",
   s:"Parents from the same school, one thread each.",
   u:"https://forum.kiasuparents.com/category/38/primary-schools-parent-networking-groups"},
  {id:"kp-pri-reg", sec:"forum", t:"Primary One \u2014 selection and registration", k:"pri",
   s:"Phases, balloting and parent volunteering.",
   u:"https://forum.kiasuparents.com/category/5/primary-schools-selection-registration"},
  {id:"kp-sport", sec:"forum", t:"Sports, fitness and athletics", k:"cca",
   s:"Clubs, coaches, and what a CCA standard actually looks like.",
   u:"https://forum.kiasuparents.com/category/15/sports-fitness-athletics"},
  {id:"kp-music", sec:"forum", t:"Music, dance, speech and drama", k:"cca",
   s:"The other half of the CCA and DSA conversation.",
   u:"https://forum.kiasuparents.com/category/12/music-singing-dancing-speech-drama"},
  {id:"kp-enrich", sec:"forum", t:"Academic learning and enrichment", k:"cca",
   s:"Home learning, enrichment and tutors, sales pitches included.",
   u:"https://forum.kiasuparents.com/category/70/academic-learning-enrichment"},
  {id:"kp-nyps", sec:"forum", t:"Search: Nanyang Primary", k:"sec", live:1,
   s:"Every thread with Nanyang Primary in the title, newest first.",
   u:"https://forum.kiasuparents.com/search?term=nanyang%20primary&in=titles"}
];

/* ==========================================================================
   WEIGH-INS FROM HERE - readings taken off a photo of the scale and the rule
   rather than typed on the tablet. They land in the Growth tab on next open.

   Same rules as everything else seeded: give each a fresh id, and one deleted
   in the app stays deleted. Unlike the events, a reading here is never written
   back over an edit made on the tablet - if a number is corrected there, the
   correction wins.

   w in kg, h in cm, either may be left out.
   ========================================================================== */
var SEED_GROW = [
  /* Photo of the scale and the wall rule, morning of 30 Aug 2026. The 18.5 is
     off the display and is not in doubt. The 113 is Dad's reading of the rule
     and could not be checked from the photo: the boy's face is close to the
     lens while the rule is back on the wall, and that parallax alone moves the
     apparent number by several centimetres. If the height line ever looks
     wrong, this is the reading to measure again. */
  {id:"gsc-20260830", who:"sc", d:"2026-08-30", w:18.5, h:113},

  /* Same morning, TC against the same wall rule. Both numbers check out on
     the photos: 23.7 is on the Xiaomi display, and the top of his head sits
     just under the 130 mark, which is what 129 looks like. A better shot than
     SC's - the rule and the boy are in the same plane and the whole scale is
     in frame, so this one did not have to be taken on trust. */
  {id:"gtc-20260830", who:"tc", d:"2026-08-30", w:23.7, h:129}
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
  {id:"ta1", who:"tc", day:"Sunday",    from:"09:00", to:"11:00", t:"Coach Lee"},
  /* 书法 runs inside the Monday PAL lesson, so the bag has to be packed the
     night before. Sits before the school day rather than on top of PAL. */
  {id:"ta2", who:"tc", day:"Monday",    from:"07:00", to:"07:30", t:"\u5e26\u4e66\u6cd5\u5305 calligraphy bag"}
];
