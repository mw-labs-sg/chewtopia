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
  ]],

  /* Term 4, off the sheets that came home in the folder. Unit 11 is lists 4.1
     and 4.2, Unit 12 is 4.3 and 4.4, Unit 13 is 4.5.

     All five are here now. 4.4 was missing from the first scan and came in on
     its own a day later, which is why it reads in a different hand above — the
     four pages that came together carried no 4.4 between them.

     All five are dated now, and not off the sheets: Ms Huang put the term's
     five spelling dates on ClassDojo on 17 September, and the five lists fall
     into them in order — 4.1 on 22 Sept, 4.2 on the 30th, 4.3 on 15 Oct, 4.4
     on the 20th and 4.5 on 3 Nov. That order is anchored at both ends: that
     the 30th is 4.2 came from him, and 4.5 is Unit 13, which comes last.

     So neither date in his own hand was the date of the sheet it was written
     on — 30 Sept was on 4.1 and belongs to 4.2, and 15 Oct was on 4.5 and
     belongs to 4.3. A date he copies off the board is the next test, not the
     page he writes it on; the teacher's own list is what the events use. */
  "4.1": ["Unit 11", [
    ["spell","Tom thumped on the door impatiently with his hand.","thumped"],
    ["spell","Jane could not wait to eat the delicious ham at the feast.","feast"],
    ["spell","The sparrow flapped its wings and flew away quickly.","flapped"],
    ["spell","We could see icicles hanging from the tree branches in winter.","branches"],
    ["spell","My mother bakes appetising cakes.","appetising"],
    ["spell","The baseball player swung at the ball but missed it.","swung"],
    ["spell","The guests swayed to the beat of the music.","swayed"],
    ["dict","Bob was cross with his brother for taking his toy.","Bob was cross with his brother for taking his toy."],
    ["dict","Lisa is having a party this Saturday.","Lisa is having a party this Saturday."],
    ["dict","I am excited to come for your birthday celebration.","I am excited to come for your birthday celebration."]
  ]],
  "4.2": ["Unit 11", [
    ["spell","The teacher was angry with her students for yelling in the canteen.","angry"],
    ["spell","The water pipe broke and water swooshed from it.","swooshed"],
    ["spell","Jill was furious when Ken took her diary.","furious"],
    ["spell","Fiona stamped her feet in frustration.","stamped her feet"],
    ["spell","My grandmother looked fabulous in her glittery dress.","fabulous"],
    ["spell","The clown danced and pranced around the guests.","pranced"],
    ["dict","The buffet was lined with delicious dishes.","The buffet was lined with delicious dishes."],
    ["dict","The room was decorated with balloons and streamers.","The room was decorated with balloons and streamers."],
    ["dict","Please come dressed as your favourite book character.","Please come dressed as your favourite book character."]
  ]],
  "4.3": ["Unit 12", [
    ["spell","I like to challenge myself to solve difficult problem sums.","myself"],
    ["spell","Dan enjoys spending time by himself in the library.","himself"],
    ["spell","It was raining cats and dogs, so Amy made herself a cup of hot chocolate.","herself"],
    ["spell","We must clean up after ourselves during recess.","ourselves"],
    ["spell","The scouts pitched the tents themselves without the teachers assistance.","themselves"],
    ["spell","The bell rang and the students walked quickly to class.","quickly"],
    ["spell","The sign read, Walk quietly along the corridors.","quietly"],
    ["dict","Jane is a kind and helpful girl.","Jane is a kind and helpful girl."],
    ["dict","He stopped in his tracks when he heard loud noises.","He stopped in his tracks when he heard loud noises."],
    ["dict","Peter shouted, Stop hurting it!","Peter shouted, Stop hurting it!"]
  ]],
  "4.4": ["Unit 12", [
    ["spell","Peter thought, What can this toy do? It looks useless to me.","useless"],
    ["spell","The animals should be able to roam about freely.","roam"],
    ["spell","When Brenda saw the spider, she panicked.","panicked"],
    ["spell","The sight of a flying cockroach is terrifying.","terrifying"],
    ["spell","The bully sneered at the boy who was sitting alone.","sneered"],
    ["spell","My grandfather looked pleased at how well his plants were growing.","pleased"],
    ["spell","Oliver laughed at how silly he looked wearing mismatched socks.","laughed"],
    ["dict","They threw stones mercilessly at the cat.","They threw stones mercilessly at the cat."],
    ["dict","The poor animal whimpered softly.","The poor animal whimpered softly."],
    ["dict","He walked up bravely and stopped the boys.","He walked up bravely and stopped the boys."]
  ]],
  "4.5": ["Unit 13", [
    ["spell","The boy gazed at the clock, wishing time would pass quickly.","gazed at"],
    ["spell","We climbed up Bukit Timah Hill yesterday.","climbed up"],
    ["spell","He flashed a broad smile at the boy.","flashed"],
    ["spell","She slept soundly after a long day out.","slept"],
    ["spell","The man in crisp uniform strode in.","strode"],
    ["spell","The boy dashed to the man in green uniform, his arms outstretched.","outstretched"],
    ["spell","Dad! he cried excitedly.","excitedly"],
    ["dict","Father gave him a bear hug and tousled his hair.","Father gave him a bear hug and tousled his hair."],
    ["dict","David learnt about the adventures his father went on.","David learnt about the adventures his father went on."],
    ["dict","Jill waited patiently at the door.","Jill waited patiently at the door."]
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

/* ==========================================================================
   THE SPELLING CLIMB — a word ladder, three letters up to twenty.

   NOT curriculum. Nothing here is off a school sheet: it is a general
   English word list written for this game, graded by how many letters a
   word has and by nothing else. Falling over at level 9 says which length
   he stops coping with, not that he is behind on anything the school has
   set — STELLAR is TC_SPELL and SC_SPELL above, and those are the lists
   that count.

   Anything past about thirteen letters is there to be the top of the ladder
   rather than to be spelt. A P2 boy who reaches it has run out of game, not
   run into a weakness, which is the whole reason none of this feeds his
   practice.

   Keyed by word length, and the key is checked against the word when the
   game builds a level: a nine-letter word filed under ten would quietly
   break the one thing the ladder measures. Lower-case letters only — no
   names, no apostrophes, no hyphens — so "how many letters" has one
   honest answer.

   Every word carries a sentence it appears in, read out after the word the
   way the spelling tests do. Not decoration: heard on its own "sun" could
   be "son", "web" could be "webb", and a boy would be marked wrong for
   spelling a word nobody told him.
   ========================================================================== */
var CLIMB_WORDS = {
  3: [
    ["cat","The cat sat on my bed."],
    ["dog","Our dog barks at the postman."],
    ["sun","The sun is very hot today."],
    ["bus","We take the bus to school."],
    ["red","His water bottle is red."],
    ["box","The toys are in a big box."],
    ["cup","She drank a cup of milk."],
    ["hat","Wear a hat in the sun."],
    ["leg","He hurt his leg playing football."],
    ["pen","Write your name with a pen."],
    ["six","There are six eggs left."],
    ["van","The delivery van stopped outside."],
    ["web","A spider made a web in the corner."],
    ["jam","I like jam on my toast."],
    ["key","Dad lost the key to the door."],
    ["ice","There is ice in my drink."],
    ["egg","He ate a boiled egg for breakfast."],
    ["fox","A fox has a bushy tail."]
  ],
  4: [
    ["fish","We saw a fish in the pond."],
    ["jump","Watch me jump over the puddle."],
    ["milk","He drinks milk before bed."],
    ["book","This book is about dinosaurs."],
    ["tree","A bird is sitting in the tree."],
    ["rain","The rain fell all afternoon."],
    ["blue","The sky is blue this morning."],
    ["hand","Put up your hand to answer."],
    ["cake","We cut the cake at the party."],
    ["frog","A frog hopped into the grass."],
    ["ship","The ship sailed out of the harbour."],
    ["nest","Two eggs are in the nest."],
    ["sock","One sock is missing again."],
    ["drum","He banged the drum loudly."],
    ["moon","The moon is bright tonight."],
    ["star","I can see one star already."],
    ["bird","That bird has a red beak."],
    ["door","Please close the door quietly."]
  ],
  5: [
    ["apple","She packed an apple in her bag."],
    ["house","Their house is near the park."],
    ["water","Drink some water after running."],
    ["green","The leaves are green after the rain."],
    ["happy","He was happy with his score."],
    ["sleep","I sleep for ten hours."],
    ["table","Put the plates on the table."],
    ["chair","He pushed his chair under the desk."],
    ["cloud","One grey cloud covered the sun."],
    ["beach","We built a castle at the beach."],
    ["mango","This mango is sweet and juicy."],
    ["tiger","A tiger has orange and black stripes."],
    ["brush","Brush your teeth before bed."],
    ["sweet","That drink is too sweet."],
    ["month","There are four birthdays this month."],
    ["plant","Water the plant every morning."],
    ["smile","Her smile is very wide."],
    ["watch","My watch tells me the time."]
  ],
  6: [
    ["yellow","The school bus is bright yellow."],
    ["school","We walk to school together."],
    ["family","My family eats dinner at seven."],
    ["orange","He peeled an orange for me."],
    ["dinner","Dinner is ready in ten minutes."],
    ["garden","Grandma grows chillies in her garden."],
    ["pencil","My pencil needs sharpening."],
    ["rabbit","The rabbit ate a whole carrot."],
    ["monkey","A monkey took the fruit."],
    ["market","We buy fish at the wet market."],
    ["jungle","Tigers live deep in the jungle."],
    ["letter","She posted a letter to her cousin."],
    ["minute","Wait one minute please."],
    ["bottle","Fill your bottle before the trip."],
    ["summer","It rains a lot in summer."],
    ["winter","They wore coats all winter."],
    ["basket","Put the apples in the basket."],
    ["circle","Draw a circle around the answer."]
  ],
  7: [
    ["kitchen","Mum is cooking in the kitchen."],
    ["teacher","Our teacher read us a story."],
    ["morning","I brush my teeth every morning."],
    ["holiday","The holiday starts on Friday."],
    ["library","He borrowed two books from the library."],
    ["bicycle","She rode her bicycle to the park."],
    ["picture","He drew a picture of our house."],
    ["weather","The weather is hot and wet."],
    ["evening","We go swimming in the evening."],
    ["chicken","We had rice and chicken for lunch."],
    ["station","The train left the station on time."],
    ["brother","My brother is younger than me."],
    ["journey","The journey took two hours."],
    ["uniform","Wear your uniform on Monday."],
    ["biscuit","He ate one biscuit with his milk."],
    ["sandals","Wear sandals to the beach."],
    ["blanket","Pull the blanket over your feet."],
    ["whisper","Please whisper in the library."]
  ],
  8: [
    ["birthday","His birthday is in October."],
    ["elephant","An elephant drinks with its trunk."],
    ["computer","The computer will not start."],
    ["hospital","The nurse works at the hospital."],
    ["sandwich","She made a cheese sandwich."],
    ["mountain","They climbed the mountain slowly."],
    ["umbrella","Take an umbrella, it looks like rain."],
    ["dinosaur","This dinosaur had tiny arms."],
    ["homework","Finish your homework before dinner."],
    ["football","We played football in the field."],
    ["midnight","The party ended at midnight."],
    ["painting","Her painting won a prize."],
    ["together","They walked home together."],
    ["shoulder","He carried the bag on one shoulder."],
    ["question","Put up your hand if you have a question."],
    ["exercise","A little exercise every day helps."]
  ],
  9: [
    ["butterfly","A butterfly landed on the flower."],
    ["breakfast","We eat breakfast at seven."],
    ["chocolate","He shared his chocolate with me."],
    ["favourite","Blue is my favourite colour."],
    ["beautiful","The garden looks beautiful today."],
    ["different","These two socks are different."],
    ["telephone","The telephone rang twice."],
    ["adventure","The book is about a great adventure."],
    ["crocodile","A crocodile slept beside the river."],
    ["pineapple","This pineapple is very sweet."],
    ["yesterday","It rained hard yesterday."],
    ["dangerous","Crossing without looking is dangerous."],
    ["orchestra","The orchestra played for an hour."],
    ["furniture","The new furniture arrived today."],
    ["apartment","They live in a small apartment."],
    ["wonderful","We had a wonderful time."]
  ],
  10: [
    ["playground","The playground is next to the hall."],
    ["everything","He packed everything into one bag."],
    ["understand","I do not understand this question."],
    ["helicopter","A helicopter flew over the school."],
    ["motorcycle","The motorcycle was very noisy."],
    ["restaurant","We ate at a Japanese restaurant."],
    ["television","Turn the television off now."],
    ["vegetables","Eat your vegetables first."],
    ["basketball","They play basketball on Tuesdays."],
    ["strawberry","She chose strawberry ice cream."],
    ["difference","Can you spot the difference?"],
    ["calculator","Use a calculator to check it."],
    ["instrument","The violin is a difficult instrument."],
    ["friendship","Their friendship began in Primary One."]
  ],
  11: [
    ["comfortable","This chair is very comfortable."],
    ["information","The letter had all the information."],
    ["immediately","Come inside immediately, it is raining."],
    ["interesting","That was an interesting story."],
    ["temperature","The nurse took his temperature."],
    ["examination","The examination lasts one hour."],
    ["grandmother","My grandmother makes the best soup."],
    ["grandfather","Grandfather walks in the park each morning."],
    ["celebration","There was a celebration after the match."],
    ["imagination","She has a wonderful imagination."],
    ["thermometer","The thermometer showed thirty degrees."],
    ["caterpillar","A caterpillar ate the whole leaf."],
    ["supermarket","We buy milk at the supermarket."],
    ["countryside","The countryside is quiet and green."]
  ],
  12: [
    ["refrigerator","Put the milk back in the refrigerator."],
    ["kindergarten","His little brother is still in kindergarten."],
    ["occasionally","We occasionally eat out on Sundays."],
    ["successfully","She successfully finished the whole race."],
    ["unbelievable","The end of that film was unbelievable."],
    ["conversation","They had a long conversation after class."],
    ["championship","Our school won the championship."],
    ["disappointed","He was disappointed by his score."],
    ["thunderstorm","A thunderstorm woke us at night."],
    ["particularly","It was particularly hot yesterday."],
    ["introduction","Read the introduction before you start."],
    ["neighbouring","The neighbouring school joined the competition."]
  ],
  13: [
    ["understanding","Thank you for your understanding."],
    ["extraordinary","The magician did something extraordinary."],
    ["unfortunately","The trip was cancelled, unfortunately."],
    ["international","The airport is full of international flights."],
    ["concentration","Chess needs a lot of concentration."],
    ["neighbourhood","Our neighbourhood has three playgrounds."],
    ["disappearance","Nobody could explain the disappearance of the keys."],
    ["entertainment","The clown was the entertainment at the party."],
    ["grandchildren","She has six grandchildren."],
    ["mathematician","A mathematician studies numbers all day."]
  ],
  14: [
    ["multiplication","We learn multiplication in Primary Two."],
    ["transportation","The bus is our transportation to school."],
    ["disappointment","Losing the final was a real disappointment."],
    ["classification","The classification of animals is on page ten."],
    ["recommendation","The teacher wrote a recommendation for him."],
    ["responsibility","Feeding the fish is his responsibility."],
    ["understandable","His handwriting is barely understandable."],
    ["characteristic","A long neck is the characteristic of a giraffe."],
    ["identification","Bring some identification to the office."],
    ["congratulation","He sent a congratulation card to his cousin."]
  ],
  15: [
    ["congratulations","He shouted congratulations across the field."],
    ["extraordinarily","The cake was extraordinarily good."],
    ["straightforward","The instructions were straightforward."],
    ["internationally","The singer is known internationally."],
    ["environmentally","Cycling is environmentally friendly."],
    ["characteristics","List three characteristics of a mammal."],
    ["recommendations","The report ended with five recommendations."],
    ["accomplishments","She listed her accomplishments proudly."],
    ["extracurricular","Chess club is an extracurricular activity."],
    ["multiplications","He finished all the multiplications quickly."]
  ],
  /* Sixteen letters and up is the joke end of the ladder, and it is meant to
     be. No seven-year-old is expected to spell "electroencephalogram"; the
     rungs are here so the top of the ladder is a real place he can see from
     level twelve, and so a boy who has cleared everything the school could
     ever set him still has somewhere to go. Every sentence still says what
     the word means, because a word he has never heard read out is a word he
     is only guessing at. */
  16: [
    ["responsibilities","He has three responsibilities at home."],
    ["misunderstanding","The whole quarrel was a misunderstanding."],
    ["extraterrestrial","He drew an extraterrestrial with three eyes."],
    ["acknowledgements","The book has a page of acknowledgements."],
    ["incomprehensible","His scribbled note was incomprehensible."],
    ["disqualification","A false start means disqualification."],
    ["electromagnetism","A compass works because of electromagnetism."],
    ["transcontinental","They took a transcontinental train."]
  ],
  17: [
    ["misunderstandings","A few misunderstandings spoiled the game."],
    ["indistinguishable","The twins are indistinguishable in that photo."],
    ["counterproductive","Shouting at the dog is counterproductive."],
    ["environmentalists","The environmentalists cleaned up the beach."],
    ["conscientiousness","His teacher praised his conscientiousness."],
    ["electrocardiogram","The doctor read his electrocardiogram."],
    ["disqualifications","Two disqualifications ended the race early."]
  ],
  18: [
    ["characteristically","He was characteristically late again."],
    ["disproportionately","The schoolbag was disproportionately heavy."],
    ["oversimplification","Saying all snakes bite is an oversimplification."],
    ["misinterpretations","The map led to several misinterpretations."],
    ["electrocardiograms","The nurse filed both electrocardiograms."],
    ["interchangeability","The parts have complete interchangeability."]
  ],
  19: [
    ["incomprehensibility","The code was famous for its incomprehensibility."],
    ["counterproductively","He revised counterproductively until midnight."],
    ["electrocardiography","The ward has a room for electrocardiography."],
    ["oversimplifications","The answer was full of oversimplifications."],
    ["overgeneralisations","Avoid overgeneralisations in your essay."],
    ["unconstitutionality","The judge ruled on its unconstitutionality."]
  ],
  20: [
    ["uncharacteristically","He was uncharacteristically quiet at dinner."],
    ["electroencephalogram","The machine records an electroencephalogram."],
    ["indistinguishability","Their voices have complete indistinguishability."],
    ["compartmentalisation","The ship survived through compartmentalisation."],
    ["internationalisation","The company planned its internationalisation."],
    ["counterrevolutionary","The old general led a counterrevolutionary plot."]
  ]
};

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
  {id:"e25", t:"End of school year", d:"2026-11-21", d2:"2026-12-31", hol:1,
   n:"Both schools. Term 4 ends Friday 20 November at Nanyang Primary, and the kindergarten newsletter has the very same run — 21 November to 31 December — so this is no longer TC’s alone. SC’s two camps fall inside it."},

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
   n:"Physical orientation at Nanyang Primary for him and a parent, Friday afternoon. Times and the rest come closer to the date, through Parents Gateway. The kindergarten has its graduation closure the same day — read that one before committing to a time."},


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
  {id:"e36", t:"K2 Graduation Ceremony cum Concert", d:"2026-11-19", w:"sc",
   n:"Thursday, at Nanyang Girls’ High. The date came off the parents’ group first, and the Term 4 newsletter has now confirmed it under the school’s own name for it. Still no times: a parent in the group was told the morning session starts at 9, and how long it runs nobody knew. Four rehearsals lead up to it — 16 October at the kindergarten, 11 and 12 November at NYGH, and the full dress rehearsal on the 18th."},

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
  /* Filled out from the principal's letter of 24 September 2026. A carnival with
     one parent per family staying the whole day, so this is one of ours as much
     as his — hence the time on it, which is the 8.30am drop-off and not the
     9.00am start. The venue is the Coronation Road campus and the parents' half
     is in the Nanyang Indoor Sports Hall, which is why both addresses are here:
     his own campus is 118 King's Road and that is not where to go. */
  {id:"e40", t:"Children’s Day carnival", d:"2026-10-01", time:"08:30", w:"sc",
   n:"Thursday. Report 8.30am, programme 9am to 2pm, and the hall itself is the Nanyang Primary School Indoor Sports Hall — the same campus TC is at, which is what makes the 10.30 pickup possible. Drop him at Gate E, 51 Coronation Road (teachers from 8.15), park in the public car parks, then go to the hall. His two slots: the movie and snack box at 11.10 to 11.40, and the K2 runway show at 12.15 to 1.10. Check the coupon, which gives his screening time and room and is the thing not to lose — it redeems ice cream, popcorn, an egglet, a snack box of sandwich and nuggets, and one gift, up to two servings of each food and one gift in all. Miss the screening and the snack box can still be collected from the Level 2 Learning Kitchen, which is also where the water bottle gets refilled. A proper breakfast first — the schedule sheet asks for a hearty one, where the first letter said light. Dress as a favourite movie or cartoon character; parents are encouraged to as well. No school bus at all that day, so both trips are on us, and no parking in the school or along Coronation Road. The holiday itself is the next day."},

  /* Nanyang Kindergarten K2, Term 4 newsletter, 11 September 2026. The term’s
     calendar of events, and only the rows that are his. The theme (Save My
     Earth), the word lists, the sight words and the digraphs are learning
     content with no date on them — not events, so not here.

     Rows already covered: Children’s Day on 1 and 2 October, which came off
     the pledge schedule, and Deepavali and Christmas, which are in SG_HOLIDAYS.
     The newsletter had the learning journey on two days, 14 October for K2/1
     and K2/2 and the 15th for the rest, which put him on the 15th — his pledge
     schedule is headed K2/4. The principal's letter of 25 September has since
     named one date, 14 October, to all of K2 parents with no class split, so
     e44 is on the 14th now and says so. */
  {id:"e42", t:"Kindergarten reopens — Term 4", d:"2026-09-14", w:"sc",
   n:"Monday. His last term of K2. The theme is Save My Earth — land, air and water pollution, the 4Rs, and saving water and energy — with money and early multiplication and division in numeracy."},
  {id:"e43", t:"Mid-Autumn Festival celebration", d:"2026-09-25", w:"sc",
   n:"Friday, in school. The newsletter lists it and says nothing else — no costume, nothing to bring."},
  /* Nanyang Kindergarten, letter from the principal 25 September 2026 — the
     Term 4 learning journey, now with a place and a packing list. Dated the
     14th, which is the only date in the letter and not the 15th the newsletter
     had for his class; the letter goes to all of K2 and splits no classes, and
     it is the newer of the two. If the class says the 15th after all, the date
     is the only thing that moves — everything to pack stays the same. */
  {id:"e44", t:"Learning journey — Tampines Park", d:"2026-10-14", w:"sc",
   n:"Wednesday, during school hours. EcoTots Adventure: Sustainability @ Tampines Park, for the Save My Earth theme — black soldier fly larvae eating food waste, and why we throw less away. Breakfast and lunch are given. Wear the NYK polo and school shorts, and pack a cap, comfortable shoes, a water bottle, a raincoat and a mosquito repellent patch. Parents are strictly not allowed to come along. The newsletter had his class on Thursday the 15th and this letter says the 14th to all of K2 — worth one question to the teacher. A child not going stays home that day, as there are no lessons, but after-school enrichment still runs."},
  /* The letter's own deadline, and the only thing it asks of us before the day.
     The two links that answer it are in the e-mail and are not repeated here on
     purpose: they are one tap each and they submit the answer, which is not
     something to leave inside an app the boys hold. */
  {id:"e59", t:"Reply for the learning journey", d:"2026-10-05", w:"sc",
   n:"Monday. Allow or disallow the Tampines Park learning journey, by the two links in the principal's e-mail of 25 September from 118campus@nyk.edu.sg. Disallowing means he stays home on the day — there are no lessons — though after-school enrichment still runs."},

  {id:"e45", t:"K2 rehearsal at the kindergarten", d:"2026-10-16", w:"sc",
   n:"Friday, at NYK itself. The first of the graduation rehearsals; the November ones are all at Nanyang Girls’ High."},
  {id:"e46", t:"Nanyang Primary P5 engagement and school tour", d:"2026-11-10", w:"sc",
   n:"Tuesday. The newsletter also lists a Primary School Visit among the term’s exploratory activities, so this is the K2 children going across to Nanyang Primary — the school he starts P1 at in January, and TC’s school already."},
  {id:"e47", t:"Graduation concert rehearsals at NYGH", d:"2026-11-11", d2:"2026-11-12", w:"sc",
   n:"Wednesday and Thursday, both at Nanyang Girls’ High. No times given."},
  {id:"e48", t:"Parent-teacher meeting", d:"2026-11-16", d2:"2026-11-17", w:"sc",
   n:"Monday and Tuesday. The newsletter gives no slots and no times, so one of the two days becomes ours once the teachers say which."},
  {id:"e49", t:"No lesson — but K2 are at the dress rehearsal", d:"2026-11-18", w:"sc",
   n:"Wednesday. “No lesson for all levels” reads like a day off and is not one for him: the full dress rehearsal at Nanyang Girls’ High is all staff and all K2 children. Times not given."},
  {id:"e50", t:"K2 graduation — closure day", d:"2026-11-20", w:"sc",
   n:"Friday. The term calendar says “K2 Graduation Ceremony cum Concert Closure” and no more. Whether that is the school closing after the concert or a second part of the ceremony is worth asking now rather than that week, because P1 orientation at Nanyang Primary is the same afternoon."},
  {id:"e51", t:"Year-end holiday camp", d:"2026-11-23", d2:"2026-11-25", w:"sc",
   n:"Monday to Wednesday, inside the school holidays. The newsletter does not say whether it has to be signed up for, or what it costs."},
  {id:"e52", t:"K2 overnight camp", d:"2026-11-26", d2:"2026-11-27", w:"sc",
   n:"Thursday and Friday, straight after the holiday camp, and his last thing as a kindergarten child. Nothing yet on what to pack."},

  /* A Google Calendar invitation off our own family calendar: Sunday 11 October,
     10 to 11am, organised by Chew. The forwarded mail began at “When”,
     so it carried no event title at all — and a name is the one thing an
     entry cannot be given by guessing. The hour is blocked out and the title says
     plainly that the name is missing, rather than the app inventing a class nobody
     named. Rename it and this comment goes with it. */
  /* ClassDojo, 2J, 14 September. Set for the PSLE listening-comprehension day
     off and not done on the day, so it sits on the Saturday rather than on the
     15th where it would have scrolled past as something already missed.

     No practice button: picture graphs with scales is a P2 sub-strand that
     MA_SETS has no set for, so there is nothing in Training to send him to. The
     work is in SLS. */
  {id:"e58", t:"SLS — Picture Graph with Scales", d:"2026-09-19", w:"tc",
   n:"Mdm Leong set this on ClassDojo for the day off on the 15th, to revise picture graphs. Log in to SLS and finish it this weekend. Nothing to hand in on paper."},

  /* Nanyang Primary, P2 English — the whole Term 4 spelling run, off Ms
     Huang's ClassDojo post of 17 September, which simply lists the dates:
     week 2 Tue 22 Sept, week 3 Wed 30 Sept, week 5 Thu 15 Oct, week 6 Tue
     20 Oct, week 8 Tue 3 Nov. Two tests, a week off, two tests, a week off,
     one test — and she says that shape is what the HBL days and the PSLE
     marking days left her, not the usual rhythm.

     That settles the one thing e57 asked on screen to be checked, and the
     answer was the one it feared: 15 October is List 4.3, not 4.5. The five
     lists fall into the five dates in order, anchored at both ends by his own
     correction that the 30th is 4.2 and by 4.5 being Unit 13, which comes
     last. 22 September was List 4.1 and has been and gone, so it gets no
     event; the three still ahead are here. */
  {id:"e56", t:"Spelling test — List 4.2", d:"2026-09-30", w:"tc", p:"en|4.2",
   n:"Wednesday, and Unit 11 again. Six words and three dictation sentences, all in Training under List 4.2. The HBL timetable for Tuesday sets aside time to study for it."},
  {id:"e57", t:"Spelling test — List 4.3", d:"2026-10-15", w:"tc", p:"en|4.3",
   n:"Thursday of week 5, and the first half of Unit 12. Seven words and three dictation sentences, in Training under List 4.3. Five of the seven are the reflexive pronouns — myself, himself, herself, ourselves, themselves — so they are one thing learnt rather than five, and the other two are quickly and quietly. This was down as List 4.5 before, off a date in his own hand; the teacher's own list has it as 4.3."},
  {id:"e66", t:"Spelling test — List 4.4", d:"2026-10-20", w:"tc", p:"en|4.4",
   n:"Tuesday of week 6, and the second half of Unit 12. Seven words and three dictation sentences, in Training under List 4.4: useless, roam, panicked, terrifying, sneered, pleased, laughed."},
  {id:"e67", t:"Spelling test — List 4.5", d:"2026-11-03", w:"tc", p:"en|4.5",
   n:"Tuesday of week 8. Unit 13, Postcards to David — seven words and three dictation sentences, in Training under List 4.5. The last one on the list Ms Huang gave, and the last list the sheets go up to, so anything after this needs a new sheet scanned."},

  /* Nanyang Primary, September information sheet. Only the rows that are his:
     P2, so the P6 study break and the PSLE written papers are somebody else's
     term. Teachers' Day has been and gone, and the Term 4 calendar is a
     document rather than a date. */
  {id:"e53", t:"No school — PSLE Listening Comprehension", d:"2026-09-15", w:"tc", hol:1,
   n:"Tuesday. P1 to P5 stay home while the P6 listening paper runs. Only children booked into Student Care go in — it opens as usual."},
  {id:"e54", t:"Mid-Autumn celebration at school", d:"2026-09-18", time:"18:00", w:"tc",
   n:"Friday evening, 6 to 8pm at Nanyang Primary, and families are invited — this is the one we go to together. Run with Bukit View, Northoaks and Lianhua Primary and the Farrer Holland Neighbourhood Committee. SC has his own celebration at the kindergarten the following Friday."},
  /* The two HBL days off the school's own timetable sheets, one per day. They
     were a single two-day event saying the tasks would come through SLS; the
     sheets have now come, and the days are not the same as each other — so
     they are two events, because the boy doing Tuesday wants Tuesday's list
     and not a wall of both.

     The practice buttons are one each and both are off the sheet: 第十六课 on
     the Monday, which is the lesson both Chinese tasks are on, and List 4.1 on
     the Tuesday, which is the spelling the sheet tells him to study for. The
     Tuesday maths is a worksheet on shapes and gets no button — shapes is a P2
     sub-strand MA_SETS has no set for, the same as picture graphs, so there is
     nothing in Training to send him to. */
  {id:"e55", t:"HBL day 1 — Monday", d:"2026-09-28", w:"tc", p:"hz|第十六课",
   n:"At home, following the school's timetable for the day. 7.30 Maths — MA worksheet, Review 6, pages 111 to 113, due 30 Sept. 8.30 华文 — 完成活动本16, pages 56 to 66, due 30 Sept. 10.30 LSP — Super Star Reader 10 and the Unit 12 Mastery Checklist, due 16 October (LSP students only). 11.00 PAL — the story reading and colouring worksheet that goes with PAL lesson 2. 12.30 English — Oral Poster: Toy Fair, due 30 Sept, answering the two questions on it: choice-making, and experience. Everything except the LSP reader goes back to school on the 30th. If he has to go in for supervision instead: report 8.00am to the canteen, dismissed 1.30pm. Student Care runs in the afternoons either way."},

  {id:"e60", t:"HBL day 2 — Tuesday", d:"2026-09-29", w:"tc", p:"en|4.2",
   n:"At home again, a different timetable from Monday's. 7.30 Maths — the worksheet on Shapes, due 30 Sept. 8.30 Art — Art Journal: finish the Snail Drawing and My Dream Pet, drawn and coloured, due next lesson. 9.30 and 10.30 华文 — 练习「我来说」16课. 11.30 LSP — Super Star Reader 11, due 16 October (LSP students only). 12.00 English — an English Journal entry on “A Party that I attended”, back to school on the 30th, and study for the spelling test on Wednesday the 30th, which is List 4.2. 1.00 PE — two worksheets, “How much sugar is in my drink?” and “My Healthy Meal & Sleep Log”, and those two are due today, the 29th, not the 30th."},

  /* Everything the two days produce, in one place on the morning it is wanted.
     A separate row from the spelling test that day: one is a thing to pack the
     night before and the other is a thing he sits. */
  {id:"e61", t:"HBL work back to school", d:"2026-09-30", w:"tc",
   n:"Wednesday. In the bag: the maths Review 6 worksheet (pages 111–113), the Shapes worksheet, 活动本16 pages 56–66, the Toy Fair oral poster, and the English Journal entry about a party. The PE worksheets were due yesterday and the art journal is due at his next art lesson, not today. The LSP readers are not due until 16 October."},

  /* Only his if he is in the Learning Support Programme — the sheet puts
     "(For LSP students)" against both rows and nothing here says whether he
     is one. Delete it in a tap if he is not. */
  {id:"e62", t:"LSP readers due — if he is in LSP", d:"2026-10-16", w:"tc",
   n:"Super Star Reader 10 and 11, and the Unit 12 Mastery Checklist, all set during the two HBL days and all due today. Marked “For LSP students” on both timetables, so this is only his if he is in the programme."},

  /* Nanyang Primary, October information sheet NYPS2026/09/110, 28 Sep 2026.
     Only the rows that are his: P2, so the P3 to P5 end-of-year examinations,
     the P3 Di Zi Gui camp, the P6 HBL packages on the 12th to 14th and the P6
     post-exam programme are all somebody else's October.

     The clash in the note is the whole reason this event is worth having. SC's
     kindergarten carnival the same morning wants one parent there from 8.30
     until 2pm at Coronation Road, and TC comes out at 10.30 at King's Road. It
     cannot be the same grown-up, and finding that out on the morning is too
     late to fix it. */
  {id:"e63", t:"Children’s Day at NYPS", d:"2026-10-01", w:"tc",
   n:"Thursday. Dismissal is 10.30am, not the usual time. SC's carnival is the same morning and, it turns out, in this school's own indoor sports hall — so it is one campus, not two, and 10.30 falls in the gap before his movie at 11.10 and long before his runway show at 12.15. One parent can do both. Theme is “Celebrate ME, Celebrate WE!”, with a carnival the PTA co-organises. No recess that day, so pack snacks. In a small bag: a water bottle, snacks, a Chinese book for silent reading, a card or board game to play with his class, and his donation for the Community Chest Children's Day Appeal. Envelopes are handed out and collected in school, and there is a PayNow QR on the letter if we would rather give that way. The next day, Friday the 2nd, is a school holiday."},

  /* Off the same sheet's October table, which arrived scrambled: two rows of
     dates and two of remarks, and it is not certain from the paste which goes
     with which. This is the reading that matches how PSLE runs — everyone is
     off while the papers are marked, and the P6 HBL days are P6's alone — but
     it is worth one look at the Term 4 calendar on Parents Gateway before
     anyone books anything around it. */
  {id:"e64", t:"No school — PSLE marking", d:"2026-10-29", d2:"2026-10-30", w:"tc", hol:1,
   n:"Thursday and Friday. The information sheet says all students are not required to come to school while the PSLE papers are marked. The same table also lists P6 home-based learning on the 12th to 14th, which is P6's own and does not affect him. If the two got swapped in the sheet, this is the one to check — the Term 4 calendar went out on Parents Gateway on 20 August and was updated on 16 September."},

  {id:"e41", t:"Sunday 10am — invitation with no name on it", d:"2026-10-11", time:"10:00", w:"tc",
   n:"One hour, 10 to 11am. A Google Calendar invite organised by Chew to minwei.chew.sgp@gmail.com, and that is the whole of what came through — the forwarded copy started at “When” and had no title on it."},

  /* Nanyang Primary 华文部, letter from 刘朝, 华文部主任. The carnival
     itself carries no date — only the passport deadline does, and that is the
     half of it that is ours to do, so that is what the event is. The night is
     the prize for having done it, which is why it is in the note rather than
     on a day of its own: a date we have not been given cannot go on the
     calendar, and the thing to act on is three weeks of reading anyway. */
  {id:"e65", t:"阅读护照 due — the Reading Carnival turns on it", d:"2026-10-23", w:"tc",
   n:"Friday, and the last day to hand the 阅读护照 in. P1 to P3 have to have finished B本, where P4 and P5 need 40 points, and the children who have get an invitation card from their teacher for 阅读嘉年华 — 童话之夜, a Fairytale Night with 绘本 activities, carnival games and food in the evening. No date for the night itself yet. So the thing to do is look now at how much of B本 is left: three weeks of Chinese reading is doable, the Friday it is due is not."},

  /* Mdm Ling on ClassDojo, 24 September. The magnetic badge that came free
     with every bubble tea coupon was to be collected at recess on the 25th,
     and that has been put off with no new date given. So this date is ours
     and not the school's — the next school day, the way e28 sits on one —
     because the only thing being asked of us is not to lose a coupon, and a
     reminder with no date on it is a reminder nobody ever sees. The real
     collection gets its own event once the school names a day. */
  {id:"e68", t:"Keep the bubble tea coupon somewhere safe", d:"2026-10-05", w:"tc",
   n:"Monday. The 《月下龙井》 coupon from the Mid-Autumn celebration still redeems a limited-edition magnetic badge, one badge a coupon. Collection at recess on 25 September was called off and no new date, time or place has been given; the school says the arrangements will be flexible so that every child holding a coupon gets one. Nothing to do today but find the coupon and put it where it will still be there."}
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
   u:"https://idp.mims.moe.gov.sg/nidp/app/login?id=mims", k:"mims"},
  /* 文萃, off Ms Lee 李老师's ClassDojo post of 22 September. A standing
     invitation with no deadline anywhere on it, so it is a site and not an
     event: Term 4 is exam season and she asks the children to read what their
     classmates wrote, as preparation for the 口试 and the 作文. The 投稿 form
     is the other link in that post and is deliberately not here — it submits
     a piece of writing under his name, and that is not something to leave one
     tap away inside an app the boys hold. */
  {id:"wencui", t:"Wencui", cn:"文萃",
   s:"The school’s own writing magazine — compositions by its pupils. Reading them is practice for the 口试 and the 作文.",
   u:"https://go.gov.sg/nanyang-wencui", k:"wencui"}
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

/* ==========================================================================
   THE SCIENCE LADDER — general science, graded by my own judgement.

   NOT curriculum, and it cannot be: MOE primary science starts in P3, so
   neither boy has a science syllabus yet and there is no school sheet for
   this to come off. It is a general-knowledge ladder written for the game —
   ten rungs, easiest first, each one a topic — so a P2 boy who likes animals
   and volcanoes has somewhere to put that. Nothing here is marked against
   anything, nothing joins his practice, and a low rung means nothing except
   that the next question was harder than the last.

   Each question is [question, right answer, other answers]. The right answer
   is stored on its own rather than by index, because an index is the sort of
   thing that survives an edit while quietly pointing at the wrong line.
   ========================================================================== */
var SCI_LADDER = {
  1: ["Animals", [
    ["Which of these animals lays eggs?","a chicken",["a dog","a cat"]],
    ["How many legs does a spider have?","eight",["six","four"]],
    ["Which animal breathes underwater using gills?","a fish",["a bird","a rabbit"]],
    ["What do we call a baby frog?","a tadpole",["a puppy","a calf"]],
    ["Which of these animals has feathers?","an owl",["a bat","a dolphin"]],
    ["Which of these is a mammal?","a dolphin",["a shark","a crocodile"]]
  ], "creatures"],
  2: ["Your body", [
    ["Which part of your body pumps blood?","the heart",["the lungs","the stomach"]],
    ["What do your lungs take in when you breathe?","air",["water","food"]],
    ["Which part of your body do you smell with?","your nose",["your ear","your elbow"]],
    ["Where does food go after you swallow it?","your stomach",["your heart","your brain"]],
    ["Which part of you does your skull protect?","your brain",["your liver","your knee"]],
    ["What do your teeth help you to do?","chew food",["see far away","hear sounds"]]
  ], "body"],
  3: ["Plants", [
    ["What do plants need to make their own food?","sunlight",["moonlight","darkness"]],
    ["Which part of a plant takes in water from the soil?","the roots",["the leaves","the flower"]],
    ["Which part of a plant makes most of its food?","the leaves",["the roots","the seeds"]],
    ["What grows into a new plant?","a seed",["a stone","a grain of sand"]],
    ["What do bees carry from flower to flower?","pollen",["water","soil"]],
    ["Which of these foods comes from a plant?","rice",["milk","eggs"]]
  ], "plant"],
  4: ["Weather", [
    ["What falls from clouds as drops of water?","rain",["sand","rocks"]],
    ["Which instrument measures how hot or cold it is?","a thermometer",["a ruler","a clock"]],
    ["What is the loud sound that follows lightning?","thunder",["a rainbow","a breeze"]],
    ["Singapore's weather is hot and what else?","wet",["snowy","freezing"]],
    ["What do we see when sunlight shines through raindrops?","a rainbow",["a shadow","a star"]],
    ["What do we call a very strong storm with spinning winds?","a typhoon",["a drizzle","a mist"]]
  ], "cloud"],
  5: ["Materials", [
    ["Which of these is a metal?","iron",["wood","glass"]],
    ["Which material lets you see straight through it?","glass",["wood","brick"]],
    ["Which of these floats on water?","a cork",["a stone","a coin"]],
    ["Which material would keep you driest in the rain?","plastic",["paper","cotton wool"]],
    ["Which of these would a magnet pick up?","a steel nail",["a plastic straw","a wooden stick"]],
    ["Why are tyres made of rubber?","it bends and grips",["it is see-through","it melts easily"]]
  ], "materials"],
  6: ["Earth and space", [
    ["Which star gives the Earth its light and heat?","the Sun",["the Moon","Mars"]],
    ["How long does the Earth take to travel once around the Sun?","one year",["one day","one week"]],
    ["What travels around the Earth?","the Moon",["the Sun","Jupiter"]],
    ["Which planet do we live on?","Earth",["Venus","Saturn"]],
    ["Why is the sky dark at night?","our side of Earth faces away from the Sun",
      ["the Sun switches off","clouds cover the Sun"]],
    ["What do we call a huge group of stars?","a galaxy",["a crater","a puddle"]]
  ], "space"],
  7: ["Forces", [
    ["A push or a pull is called what?","a force",["a colour","a sound"]],
    ["What pulls everything back down to the ground?","gravity",["sunlight","wind"]],
    ["What makes it harder to slide a box across a rough floor?","friction",["gravity","magnetism"]],
    ["A see-saw is an example of which simple machine?","a lever",["a pulley","a screw"]],
    ["What do wheels make easier?","moving heavy things",["seeing in the dark","keeping warm"]],
    ["Two magnets pushing each other apart are doing what?","repelling",["attracting","melting"]]
  ], "pushpull"],
  8: ["Light and sound", [
    ["Light travels in what shape of path?","straight lines",["circles","zigzags"]],
    ["What is made when an object blocks the light?","a shadow",["a rainbow","a cloud"]],
    ["Sound is made by things that do what?","vibrate",["glow","freeze"]],
    ["Which travels faster, light or sound?","light",["sound","they are the same"]],
    ["What do we call sound bouncing back off a wall?","an echo",["a shadow","a ripple"]],
    ["What does a mirror do to light?","reflects it",["soaks it up","eats it"]]
  ], "shadow"],
  9: ["Heat and matter", [
    ["What happens to ice when you heat it?","it melts",["it freezes","it grows"]],
    ["Water turns into steam when it does what?","boils",["freezes","cools"]],
    ["Which of these is a gas?","air",["wood","milk"]],
    ["What is it called when water vapour turns back into water?","condensation",
      ["evaporation","erosion"]],
    ["Which spoon gets hot fastest in a hot drink?","a metal spoon",
      ["a plastic spoon","a wooden spoon"]],
    ["At what temperature does water freeze?","0 degrees Celsius",
      ["50 degrees Celsius","100 degrees Celsius"]]
  ], "states"],
  10: ["Living things", [
    ["Which of these is not a living thing?","a rock",["a fern","a beetle"]],
    ["Animals that eat only plants are called what?","herbivores",["carnivores","omnivores"]],
    ["What do we call the place an animal lives in?","its habitat",["its skeleton","its shadow"]],
    ["A butterfly starts its life as what?","a caterpillar",["a tadpole","a chick"]],
    ["Which gas do plants take in from the air to make food?","carbon dioxide",
      ["oxygen","helium"]],
    ["What is usually at the start of a food chain?","a plant",["a lion","an eagle"]]
  ], "foodchain"]
};

/* ==========================================================================
   THE 华文 LADDER — hear the word, tap the characters.

   NOT curriculum. The school's lists are HANZI, RECOG, TC_PINYIN, TC_TINGXIE
   and SC_TINGXIE above, all off 南洋小学 sheets and all keyed by lesson. This
   is not one of them: it is ordinary vocabulary sorted into ten rungs by my
   own judgement of how hard each word is, so there is a Chinese game with a
   top to climb towards. A boy who stalls on rung 7 has not failed 二年级
   anything — his 听写 sheet is the thing that says how he is doing.

   Each entry is [word, pinyin, what it means in English]. The wrong answers
   on screen are the other words from the same rung, drawn at random, so every
   character he is choosing between is one he has just as much business
   knowing — a rung of easy distractors would make a hard word look easy.
   ========================================================================== */
var ZH_LADDER = {
  1: ["\u6570\u5b57\u548c\u4eba", [
    ["\u4e00","y\u012b","one"], ["\u4e8c","\u00e8r","two"], ["\u4e09","s\u0101n","three"],
    ["\u4eba","r\u00e9n","a person"], ["\u5927","d\u00e0","big"], ["\u5c0f","xi\u01ceo","small"],
    ["\u4e0a","sh\u00e0ng","up, above"], ["\u4e0b","xi\u00e0","down, below"]
  ]],
  2: ["\u5bb6\u4eba", [
    ["\u7238\u7238","b\u00e0ba","dad"], ["\u5988\u5988","m\u0101ma","mum"],
    ["\u54e5\u54e5","g\u0113ge","big brother"], ["\u5f1f\u5f1f","d\u00ecdi","little brother"],
    ["\u59d0\u59d0","ji\u011bjie","big sister"], ["\u59b9\u59b9","m\u00e8imei","little sister"]
  ]],
  3: ["\u8eab\u4f53", [
    ["\u624b","sh\u01d2u","a hand"], ["\u53e3","k\u01d2u","a mouth"], ["\u5934","t\u00f3u","a head"],
    ["\u811a","ji\u01ceo","a foot"], ["\u5fc3","x\u012bn","a heart"], ["\u8033","\u011br","an ear"],
    ["\u76ee","m\u00f9","an eye"], ["\u7259","y\u00e1","a tooth"]
  ]],
  4: ["\u5927\u81ea\u7136", [
    ["\u5c71","sh\u0101n","a mountain"], ["\u6c34","shu\u01d0","water"], ["\u706b","hu\u01d2","fire"],
    ["\u65e5","r\u00ec","the sun"], ["\u6708","yu\u00e8","the moon"], ["\u6728","m\u00f9","a tree"],
    ["\u7530","ti\u00e1n","a field"], ["\u77f3","sh\u00ed","a stone"]
  ]],
  5: ["\u52a8\u7269", [
    ["\u732b","m\u0101o","a cat"], ["\u72d7","g\u01d2u","a dog"], ["\u9e1f","ni\u01ceo","a bird"],
    ["\u9c7c","y\u00fa","a fish"], ["\u9a6c","m\u01ce","a horse"], ["\u725b","ni\u00fa","a cow"],
    ["\u7f8a","y\u00e1ng","a sheep"], ["\u866b","ch\u00f3ng","an insect"]
  ]],
  6: ["\u5b66\u6821", [
    ["\u8001\u5e08","l\u01ceosh\u012b","a teacher"], ["\u5b66\u751f","xu\u00e9sh\u0113ng","a pupil"],
    ["\u4e66","sh\u016b","a book"], ["\u7b14","b\u01d0","a pen"],
    ["\u5b66\u6821","xu\u00e9xi\u00e0o","a school"], ["\u540c\u5b66","t\u00f3ngxu\u00e9","a classmate"],
    ["\u529f\u8bfe","g\u014dngk\u00e8","homework"], ["\u6559\u5ba4","ji\u00e0osh\u00ec","a classroom"]
  ]],
  7: ["\u98df\u7269", [
    ["\u7c73\u996d","m\u01d0f\u00e0n","rice"], ["\u9762\u5305","mi\u00e0nb\u0101o","bread"],
    ["\u9e21\u86cb","j\u012bd\u00e0n","an egg"], ["\u725b\u5976","ni\u00fan\u01cei","milk"],
    ["\u6c34\u679c","shu\u01d0gu\u01d2","fruit"], ["\u852c\u83dc","sh\u016bc\u00e0i","vegetables"],
    ["\u9762\u6761","mi\u00e0nti\u00e1o","noodles"], ["\u6c64","t\u0101ng","soup"]
  ]],
  8: ["\u65f6\u95f4\u548c\u5730\u65b9", [
    ["\u4eca\u5929","j\u012bnti\u0101n","today"], ["\u660e\u5929","m\u00edngti\u0101n","tomorrow"],
    ["\u6628\u5929","zu\u00f3ti\u0101n","yesterday"], ["\u661f\u671f","x\u012bngq\u012b","a week"],
    ["\u56fe\u4e66\u9986","t\u00fash\u016bgu\u01cen","a library"], ["\u533b\u9662","y\u012byu\u00e0n","a hospital"],
    ["\u5546\u5e97","sh\u0101ngdi\u00e0n","a shop"], ["\u516c\u56ed","g\u014dngyu\u00e1n","a park"]
  ]],
  9: ["\u600e\u4e48\u505a\u4e8b", [
    ["\u559c\u6b22","x\u01d0huan","to like"], ["\u9ad8\u5174","g\u0101ox\u00ecng","happy"],
    ["\u5e2e\u52a9","b\u0101ngzh\u00f9","to help"], ["\u8ba4\u771f","r\u00e8nzh\u0113n","careful, in earnest"],
    ["\u52aa\u529b","n\u01d4l\u00ec","hard-working"], ["\u5e72\u51c0","g\u0101nj\u00ecng","clean"],
    ["\u5b89\u9759","\u0101nj\u00ecng","quiet"], ["\u70ed\u95f9","r\u00e8nao","lively, bustling"]
  ]],
  10: ["\u96be\u8bcd", [
    ["\u52c7\u6562","y\u01d2ngg\u01cen","brave"], ["\u9a84\u50b2","ji\u0101o'\u00e0o","proud"],
    ["\u4fdd\u62a4","b\u01ceoh\u00f9","to protect"], ["\u73af\u5883","hu\u00e1nj\u00ecng","the environment"],
    ["\u5e86\u795d","q\u00ecngzh\u00f9","to celebrate"], ["\u89c2\u5bdf","gu\u0101nch\u00e1","to observe"],
    ["\u5408\u4f5c","h\u00e9zu\u00f2","to work together"], ["\u7ecf\u9a8c","j\u012bngy\u00e0n","experience"]
  ]]
};

/* ==========================================================================
   THE HUMAN BODY LADDER — ten rungs, outside in.

   NOT curriculum, for the same reason the science ladder is not: MOE starts
   science in P3 and neither boy has a syllabus yet. What it is instead is a
   proper progression — what you can see and touch first, then the senses,
   then bones and muscles, then the organs that keep you going, then the
   systems all at once. A boy who gets to rung 8 has learnt something real
   about himself; he has not passed anything.

   Same shape as SCI_LADDER: [question, the right answer, the wrong ones].
   ========================================================================== */
var BODY_LADDER = {
  1: ["Outside", [
    ["Which part of your body do you see with?","your eyes",["your ears","your knees"]],
    ["How many fingers are there on two hands?","ten",["eight","twelve"]],
    ["Which part of your body do you smell with?","your nose",["your tongue","your elbow"]],
    ["What covers the outside of your whole body?","skin",["bone","hair"]],
    ["Which joint is in the middle of your arm?","the elbow",["the knee","the ankle"]],
    ["Which part of you do you hear with?","your ears",["your eyes","your nose"]]
  ], "body"],
  2: ["The senses", [
    ["Which part of you tastes food?","your tongue",["your liver","your lungs"]],
    ["How many senses do we usually count?","five",["three","ten"]],
    ["Which sense do you use to read a book?","sight",["taste","smell"]],
    ["Touch is felt through your what?","skin",["hair","nails"]],
    ["Which sense warns you that milk has gone off?","smell",["hearing","sight"]],
    ["Which part of you helps you keep your balance?","your inner ear",["your thumb","your tongue"]]
  ], "senses"],
  3: ["Bones", [
    ["What is your skeleton made of?","bones",["muscles","blood"]],
    ["Which bones make a cage around your heart and lungs?","the ribs",["the knees","the fingers"]],
    ["What is the bone that protects your brain called?","the skull",["the spine","the jaw"]],
    ["Roughly how many bones does a grown-up have?","about 206",["about 50","about 1000"]],
    ["What are the bones running down your back called?","the spine",["the ribs","the hips"]],
    ["What do we call the place where two bones meet?","a joint",["a nerve","a muscle"]]
  ], "bones"],
  4: ["Muscles", [
    ["What pulls on your bones so that you can move?","muscles",["skin","hair"]],
    ["Which muscle never stops working, day or night?","the heart",["the biceps","the jaw"]],
    ["What joins a muscle to a bone?","a tendon",["a vein","a nerve"]],
    ["What happens to a muscle you use a lot?","it gets stronger",["it turns to bone","it disappears"]],
    ["Which muscles do the work when you chew?","the jaw muscles",["the calf muscles","the neck muscles"]],
    ["Shivering when you are cold is your muscles doing what?","making heat",["going to sleep","growing"]]
  ], "muscle"],
  5: ["Heart and blood", [
    ["What does your heart do?","pumps blood",["makes food","holds air"]],
    ["Where in your body is your heart?","in your chest",["in your head","in your knee"]],
    ["What does blood carry to every part of you?","oxygen and food",["only water","only air"]],
    ["What are the tubes that carry blood around you called?","blood vessels",["nerves","tendons"]],
    ["Roughly how many times a minute does a child's heart beat?","about 90",["about 10","about 300"]],
    ["What is the beat you can feel in your wrist called?","your pulse",["your reflex","your breath"]]
  ], "heart"],
  6: ["Breathing", [
    ["Which organs take in the air you breathe?","your lungs",["your kidneys","your liver"]],
    ["Which gas does your body need out of the air?","oxygen",["helium","neon"]],
    ["Which gas does your body get rid of when you breathe out?","carbon dioxide",["oxygen","hydrogen"]],
    ["What is the big muscle underneath your lungs called?","the diaphragm",["the biceps","the pelvis"]],
    ["Why do you breathe faster when you run?","your muscles need more oxygen",
      ["your lungs get smaller","your heart stops"]],
    ["Which of these keeps your lungs healthy?","exercise and clean air",
      ["breathing smoke","sitting all day"]]
  ], "lungs"],
  7: ["Eating and digesting", [
    ["Where does digesting your food begin?","in your mouth",["in your stomach","in your toes"]],
    ["What breaks your food into small pieces first?","your teeth",["your ribs","your lungs"]],
    ["Which tube carries food from your mouth down to your stomach?","the oesophagus",
      ["the windpipe","the spine"]],
    ["Where does most of your food pass into the blood?","the small intestine",
      ["the large intestine","the stomach"]],
    ["What does your liver help your body to do?","clean the blood and digest food",
      ["pump blood","hold air"]],
    ["Why does your body need you to drink water?","every part of it needs water",
      ["it makes bones harder","it makes hair grow"]]
  ], "tummy"],
  8: ["Brain and nerves", [
    ["Which part of you is in charge of all the rest?","your brain",["your heart","your stomach"]],
    ["What carries messages between your body and your brain?","nerves",["veins","tendons"]],
    ["What protects your brain?","your skull",["your ribs","your hips"]],
    ["Snatching your hand off something hot is called what?","a reflex",["a habit","a dream"]],
    ["Which part of the brain helps with balance and movement?","the cerebellum",
      ["the skull","the lungs"]],
    ["Why does your body need sleep?","the brain and body rest and repair",
      ["so you stop breathing","so your hair grows"]]
  ], "brain"],
  9: ["Teeth, skin and hair", [
    ["How many baby teeth does a child have?","twenty",["thirty-two","ten"]],
    ["What is the hard white outside of a tooth called?","enamel",["the root","the gum"]],
    ["Which is the largest organ of the body?","the skin",["the heart","the liver"]],
    ["Why does your body sweat?","to cool itself down",["to grow","to see better"]],
    ["Which of these keeps teeth healthy?","brushing twice a day",
      ["sweets at bedtime","never seeing a dentist"]],
    ["What are your hair and nails mostly made of?","keratin",["bone","muscle"]]
  ], "skin"],
  10: ["All of it at once", [
    ["Which system carries blood around your body?","the circulatory system",
      ["the digestive system","the skeletal system"]],
    ["Which system is made of all your bones?","the skeletal system",
      ["the muscular system","the respiratory system"]],
    ["Which system takes in oxygen and gets rid of carbon dioxide?","the respiratory system",
      ["the digestive system","the nervous system"]],
    ["What does your immune system do?","fights germs",["digests food","makes bones"]],
    ["Which organs clean your blood and make urine?","the kidneys",["the lungs","the ears"]],
    ["What are all living things, including you, built from?","cells",["bricks","plastic"]]
  ], "body"]
};

/* ==========================================================================
   THE BIOLOGY LADDER — living things, ten rungs, easiest first.

   NOT curriculum, the same as SCI_LADDER and BODY_LADDER above: MOE starts
   science in P3, so there is no school sheet either boy could have this off.
   It is here because they like animals, and because the science ladder has
   one rung each for animals and plants and that was never going to be enough
   for a boy who owns four books about frogs.

   Where it meets the other two, it goes further rather than saying the same
   thing again: BODY_LADDER is him, this one is everything else alive. Each
   row is [question, the right answer, the other answers], and the third slot
   on a rung names the drawing in QPIC that goes above the question.
   ========================================================================== */
var BIO_LADDER = {
  1: ["Animal groups", [
    ["Which group do animals with feathers belong to?","birds",["fish","insects"]],
    ["How many legs does an insect have?","six",["eight","four"]],
    ["Which group does a frog belong to?","amphibians",["mammals","reptiles"]],
    ["Which of these animals is a reptile?","a snake",["a frog","a snail"]],
    ["What do we call animals that feed their babies milk?","mammals",["birds","fish"]],
    ["Which animal group has scales and breathes with gills?","fish",["birds","insects"]]
  ], "creatures"],
  2: ["Staying alive", [
    ["Which of these does every living thing need?","water",["a television","money"]],
    ["What do all land animals need to breathe?","air",["soil","sand"]],
    ["Which of these is a sign that something is alive?","it grows",["it is heavy","it is shiny"]],
    ["Why do animals need food?","it gives them energy",["it keeps them cool","it makes them shiny"]],
    ["Which of these does a living thing not need?","a mobile phone",["air","water"]],
    ["Living things make more of their own kind. What is that called?","reproducing",
      ["reflecting","recycling"]]
  ], "sprout"],
  3: ["Plants", [
    ["Which part of a plant holds it up and carries water to the leaves?","the stem",
      ["the flower","the seed"]],
    ["Which part of a plant makes the seeds?","the flower",["the roots","the stem"]],
    ["What do most plants give out into the air in the daytime?","oxygen",["salt","smoke"]],
    ["Which part of a plant is usually hidden under the soil?","the roots",
      ["the flower","the leaves"]],
    ["What does a cactus store inside its thick stem?","water",["milk","sand"]],
    ["Which of these is a plant?","moss",["coral","a jellyfish"]]
  ], "plant"],
  4: ["Life cycles", [
    ["What does a caterpillar turn into?","a butterfly",["a beetle","a spider"]],
    ["What is the hard case a caterpillar makes around itself called?","a chrysalis",
      ["a shell","a nest"]],
    ["What hatches out of a hen's egg?","a chick",["a tadpole","a kitten"]],
    ["A tadpole grows up into what?","a frog",["a fish","a snake"]],
    ["What is the very first stage of a butterfly's life?","an egg",["a wing","a flower"]],
    ["Which of these animals is born rather than hatched?","a kitten",["a crocodile","a turtle"]]
  ], "butterfly"],
  5: ["Habitats", [
    ["Which animal is best suited to living in a hot desert?","a camel",
      ["a polar bear","a penguin"]],
    ["What kind of habitat is the forest at Bukit Timah?","a rainforest",
      ["a desert","a snowfield"]],
    ["Where would you find a crab living?","on the seashore",["in a cupboard","in the clouds"]],
    ["Which habitat is home to a polar bear?","the frozen Arctic",["a rainforest","a desert"]],
    ["Why can a fish not live on land?","it breathes with gills",
      ["it is too heavy","it dislikes trees"]],
    ["What happens to animals when their forest is cut down?","they lose their home",
      ["they grow bigger","they turn into plants"]]
  ], "habitat"],
  6: ["Food chains", [
    ["What do we call an animal that hunts other animals?","a predator",
      ["a producer","a passenger"]],
    ["What do we call the animal that is hunted?","the prey",["the pride","the plant"]],
    ["Plants are called producers because they do what?","make their own food",
      ["eat other animals","run the fastest"]],
    ["What do we call an animal that eats both plants and meat?","an omnivore",
      ["a herbivore","a carnivore"]],
    ["What do we call the creatures that break down dead plants and animals?","decomposers",
      ["composers","collectors"]],
    ["In the chain grass, then rabbit, then fox — what does the rabbit eat?","grass",
      ["the fox","nothing at all"]]
  ], "foodchain"],
  7: ["Built to survive", [
    ["What is it called when an animal's colours help it hide?","camouflage",
      ["a carousel","a calculation"]],
    ["Why does a polar bear have such thick fur?","to keep its heat in",
      ["to swim faster","to look taller"]],
    ["What do some animals do all winter to save energy?","hibernate",
      ["decorate","celebrate"]],
    ["Why do some birds fly thousands of miles every year?","to find food and warmth",
      ["to get lost","to grow new feathers"]],
    ["A bird that cracks hard seeds most likely has what?","a short strong beak",
      ["a long thin beak","no beak at all"]],
    ["Why does a giraffe have such a long neck?","to reach leaves high up",
      ["to run faster","to swim better"]]
  ], "chameleon"],
  8: ["Tiny living things", [
    ["What are all living things built out of?","cells",["bricks","glass"]],
    ["Which of these is too small to see without a microscope?","a bacterium",
      ["an ant","a bean"]],
    ["What makes bread dough rise?","yeast",["ice","sand"]],
    ["Why do we wash our hands before eating?","to get rid of germs",
      ["to make them soft","to make them cold"]],
    ["Which part of a cell is in charge of it?","the nucleus",["the roof","the engine"]],
    ["Are all germs harmful to us?","no, some of them help us",
      ["yes, every single one","there is no such thing"]]
  ], "cells"],
  9: ["How plants feed", [
    ["What is the name for the way a plant makes food out of sunlight?","photosynthesis",
      ["photography","hibernation"]],
    ["What green stuff inside a leaf traps the sunlight?","chlorophyll",["chalk","clay"]],
    ["What does a plant make for itself when it photosynthesises?","sugar",["salt","soil"]],
    ["Which gas does a plant give out while it is making food?","oxygen",
      ["carbon dioxide","hydrogen"]],
    ["Why are most leaves flat and wide?","to catch more sunlight",
      ["to feel soft","to taste nice"]],
    ["What happens to a plant shut in a dark cupboard for weeks?","it goes pale and dies",
      ["it grows twice as fast","it turns into an animal"]]
  ], "photo"],
  10: ["Passed on", [
    ["Why do children often look like their parents?","traits are passed on to them",
      ["they copy them on purpose","they eat the same food"]],
    ["What are the instructions inside every living cell called?","DNA",["DVD","ABC"]],
    ["What do we call a kind of animal that has died out for ever?","extinct",
      ["extra","excited"]],
    ["What is left in old rock that tells us about ancient animals?","fossils",
      ["footprints in sand","photographs"]],
    ["Which animal did people breed dogs from?","the wolf",["the cat","the cow"]],
    ["Animals that can have babies together belong to the same what?","species",
      ["colour","country"]]
  ], "dna"]
};

/* ==========================================================================
   THE PHYSICS LADDER — forces, light, sound, heat, electricity and space.

   NOT curriculum either, and the same warning as the rest: nothing here is
   off a sheet and nothing is marked against anything. The science ladder has
   a single rung for forces and one for light and sound; this is the ladder
   for the boy who wanted to know what happens next.

   Rungs 1 to 6 are things that can be tried at the kitchen table. From 7 up
   it is upper-primary work at the earliest, so a short climb there means
   nothing at all.
   ========================================================================== */
var PHY_LADDER = {
  1: ["Pushes and pulls", [
    ["Opening a door by tugging the handle uses what?","a force",["a sound","a shadow"]],
    ["What happens to a ball if you kick it harder?","it goes further",["it goes slower","it disappears"]],
    ["Which of these is a pull?","a dog tugging on its lead",["pressing a doorbell","clapping your hands"]],
    ["What can a force do to a ball that is already rolling?","change its direction",["change its colour","change its name"]],
    ["What do you do to a swing to get it going?","push it",["shout at it","paint it"]],
    ["Squashing a lump of dough shows a force doing what?","changing its shape",["changing its taste","making it invisible"]],
    ["Which of these is a push?","closing a door",["pulling a rope","reading a book"]],
    ["What happens to a toy car if you push it harder?","it speeds up more",["it slows down","it stays still"]],
    ["What unit do we measure forces in?","newtons",["litres","metres"]],
    ["What would you measure a pull with?","a force meter",["a thermometer","a stopwatch"]]
  ], "pushpull"],
  2: ["Magnets", [
    ["Which of these sticks to a magnet?","a paper clip",["a rubber band","a plastic ruler"]],
    ["What are the two ends of a magnet called?","its poles",["its posts","its pipes"]],
    ["What happens when you push two north poles together?","they push each other apart",["they stick together","they melt"]],
    ["What happens when a north pole meets a south pole?","they pull together",["they push apart","they vanish"]],
    ["Which of these metals is a magnet attracted to?","iron",["gold","copper"]],
    ["Which way does a compass needle point?","north",["down","at the Sun"]],
    ["What do we call the space round a magnet where it works?","its magnetic field",["its shadow","its shell"]],
    ["Will a magnet still pull through a sheet of paper?","yes, it still works",["no, never","only if the paper is wet"]],
    ["Which of these metals is not attracted to a magnet?","aluminium",["iron","steel"]],
    ["The Earth behaves like a giant what?","magnet",["mirror","battery"]]
  ], "magnet"],
  3: ["Floating and sinking", [
    ["Why does a beach ball float?","it is full of air",["it is round","it is brightly coloured"]],
    ["Which of these sinks in water?","a metal spoon",["a plastic bottle","a cork"]],
    ["Ships are built of steel. Why do they still float?","they are hollow and full of air",["steel is lighter than water","they are painted"]],
    ["What is the upward push of water on a floating thing called?","upthrust",["downforce","friction"]],
    ["What happens to a stone dropped into a pond?","it sinks",["it floats","it flies"]],
    ["Which floats, a ball of clay or the same clay shaped like a boat?","the boat shape",["the ball","neither of them"]],
    ["What do we call the water a floating boat pushes aside?","the water it displaces",["the water it drinks","the water it freezes"]],
    ["Is it easier to float in salty water or fresh water?","salty water",["fresh water","exactly the same"]],
    ["How does a submarine sink and rise again?","by filling and emptying its tanks",["by flapping wings","by spinning faster"]],
    ["Something that floats is less what than water?","dense",["colourful","noisy"]]
  ], "float"],
  4: ["Light and shadows", [
    ["Where does the Earth get nearly all its light from?","the Sun",["the Moon","street lamps"]],
    ["What do we call a material you cannot see through at all?","opaque",["transparent","invisible"]],
    ["When is your shadow longest?","when the Sun is low in the sky",["at midday","at midnight"]],
    ["Why can you see yourself in a mirror?","light bounces off it into your eyes",["it is heavy","it is cold"]],
    ["What happens to light when it passes from air into water?","it bends",["it stops dead","it turns green"]],
    ["Which of these makes its own light?","a candle",["the Moon","a mirror"]],
    ["What do we call a material you can see straight through?","transparent",["opaque","invisible"]],
    ["What happens to a shadow when the light is moved closer?","it gets bigger",["it gets smaller","it vanishes"]],
    ["Which of these does not make its own light?","the Moon",["a torch","a bonfire"]],
    ["What colour do you get when all the colours of light mix?","white",["black","brown"]]
  ], "shadow"],
  5: ["Sound", [
    ["What does a guitar string do to make a sound?","it vibrates",["it glows","it freezes"]],
    ["What do we call how loud a sound is?","its volume",["its colour","its weight"]],
    ["What do we call how high or low a sound is?","its pitch",["its shadow","its width"]],
    ["Can sound travel through empty space?","no, there is nothing to carry it",["yes, easily","only at night"]],
    ["Why do you see lightning before you hear the thunder?","light travels faster than sound",["the thunder starts later","the sky is too far away"]],
    ["What happens to a sound as you walk further away from it?","it gets quieter",["it gets louder","it changes colour"]],
    ["What do we call sound that nobody wants?","noise",["news","nonsense"]],
    ["Does sound travel better through air or through water?","through water",["through air","it cannot travel through either"]],
    ["What part of your ear catches the vibrations first?","the eardrum",["the earlobe","the elbow"]],
    ["What should you wear near a very loud machine?","ear defenders",["sunglasses","gloves"]]
  ], "sound"],
  6: ["Heat", [
    ["What units do we measure temperature in here?","degrees Celsius",["centimetres","kilograms"]],
    ["Which of these carries heat best?","a metal pan",["a wooden spoon","a woolly glove"]],
    ["Why do we put on a jumper when it is cold?","it keeps our own heat in",["it makes heat of its own","it makes us shorter"]],
    ["What happens to most things when you heat them?","they expand a little",["they shrink away to nothing","they turn blue"]],
    ["Heat always moves from a hot thing to what?","a colder thing",["a hotter thing","nothing at all"]],
    ["Why does a hot drink go cold on the table?","its heat spreads out into the room",["cold climbs up out of the table","the cup drinks it"]],
    ["What do we call a material that will not let heat through easily?","an insulator",["a conductor","a magnet"]],
    ["Why is a saucepan handle made of wood or plastic?","it does not carry the heat to your hand",["it looks nicer","it makes the pan heavier"]],
    ["Which feels colder to touch, metal or wood, in the same room?","the metal",["the wood","they feel exactly the same"]],
    ["What happens to a puddle on a hot day?","it evaporates away",["it freezes","it sinks into the air"]]
  ], "thermo"],
  7: ["Electricity", [
    ["What must a circuit be before the bulb will light?","complete, with no gaps",["broken somewhere","upside down"]],
    ["Which of these lets electricity pass through it?","copper wire",["a rubber glove","a plastic straw"]],
    ["What pushes the electricity round a torch?","the battery",["the switch","the glass"]],
    ["What does a switch do in a circuit?","breaks it open or joins it up",["heats it up","colours it in"]],
    ["Why is a wire wrapped in plastic?","to keep the electricity safely inside",["to make it look pretty","to make it heavier"]],
    ["Which of these is dangerous near electricity?","wet hands",["dry gloves","a plastic switch"]],
    ["In a line of bulbs, what happens if you take one out?","the others go out too",["they get brighter","nothing at all"]],
    ["What do we call a circuit with more than one path?","a parallel circuit",["a series circuit","a round circuit"]],
    ["What do we call the flow of electricity round a circuit?","the current",["the weather","the weight"]],
    ["Rubbing a balloon on your hair makes what?","static electricity",["a magnetic field","a rainbow"]]
  ], "circuit"],
  8: ["Energy", [
    ["What do we call energy from the wind and the sun?","renewable energy",["rubbish energy","returned energy"]],
    ["What does a solar panel turn sunlight into?","electricity",["water","wood"]],
    ["Energy is never really lost. What happens to it?","it changes into another kind",["it disappears for good","it gets eaten"]],
    ["When you switch on a lamp, electrical energy becomes what?","light and heat",["sound and water","soil"]],
    ["Which of these stores energy ready to be used?","a battery",["a mirror","a shadow"]],
    ["Where does the energy in your dinner first come from?","the Sun",["the fridge","the cooker"]],
    ["What kind of energy does a moving bicycle have?","movement energy",["sound energy only","no energy at all"]],
    ["What kind of energy is stored in your dinner?","chemical energy",["light energy","echo energy"]],
    ["Which of these will run out one day?","coal",["wind","sunlight"]],
    ["What does a wind turbine need before it will work at all?","wind",["rain","darkness"]]
  ], "windmill"],
  9: ["Motion", [
    ["Which force slows your bicycle when you stop pedalling?","friction",["magnetism","sunlight"]],
    ["Why would you weigh less standing on the Moon?","the Moon's gravity is weaker",["the Moon is colder","you would be smaller there"]],
    ["What do we call how fast something is going?","its speed",["its size","its weight"]],
    ["On which surface would a toy car roll furthest?","smooth wood",["thick carpet","loose sand"]],
    ["What happens to a rolling ball if nothing slows it down?","it keeps on going",["it stops at once","it turns round"]],
    ["Why are brake pads made rough?","to make more friction",["to make less friction","to make the bicycle lighter"]],
    ["What slows a swimmer down in a pool?","water resistance",["air resistance","magnetism"]],
    ["Why does a parachute have such a big canopy?","to catch more air and slow the fall",["to look impressive","to make it heavier"]],
    ["If the forces on a moving object are balanced, what happens?","it carries on at the same speed",["it stops at once","it speeds up"]],
    ["What do we measure a car's speed in?","kilometres per hour",["litres per hour","degrees per hour"]]
  ], "speed"],
  10: ["Space", [
    ["How many planets go round our Sun?","eight",["two","one hundred"]],
    ["Which planet is closest to the Sun?","Mercury",["Earth","Neptune"]],
    ["Why does the Moon seem to change shape?","we see different amounts of its lit half",["it really does melt away","clouds cover part of it"]],
    ["What do we call a space rock burning up as a streak of light?","a meteor",["a planet","a cloud"]],
    ["Which planet is famous for its rings?","Saturn",["Mars","Venus"]],
    ["What keeps the planets going round the Sun?","gravity",["glue","magnets"]],
    ["Which planet is the biggest?","Jupiter",["Mercury","Earth"]],
    ["What does a light year measure?","distance",["time","brightness"]],
    ["Which galaxy do we live in?","the Milky Way",["Andromeda","Orion"]],
    ["What do we call a machine put into orbit round the Earth?","a satellite",["a crater","a comet"]]
  ], "space"]
};

/* ==========================================================================
   THE CHEMISTRY LADDER — materials, states, mixtures and changes.

   NOT curriculum, like every other ladder. It starts where a seven-year-old
   already is — what things are made of and what happens when you heat them —
   and it stops at the periodic table, which is where the pictures run out and
   the arithmetic would start.

   Nothing on this ladder asks him to do an experiment. Rung 8 says outright
   that we do not taste things to test them, because a boy who has just been
   asked what an acid tastes like is a boy about to go and find out.
   ========================================================================== */
var CHEM_LADDER = {
  1: ["Everyday materials", [
    ["What is a window usually made of?","glass",["wool","paper"]],
    ["What is a jumper most likely made of?","wool",["steel","glass"]],
    ["Why are saucepans made of metal?","metal carries heat well",["metal is see-through","metal is soft"]],
    ["What is paper made from?","wood",["rocks","water"]],
    ["Which of these bends easily without breaking?","rubber",["a brick","glass"]],
    ["Which of these materials is waterproof?","plastic",["tissue paper","a sponge"]],
    ["Why are windows not made of wood?","you could not see through it",["wood is too light","wood is too cold"]],
    ["Which of these materials carries electricity?","copper",["plastic","rubber"]],
    ["What is wool made from?","a sheep's fleece",["tree bark","sand"]],
    ["What do we call what a material is like and what it can do?","its properties",["its price","its postcode"]]
  ], "materials"],
  2: ["Solid, liquid, gas", [
    ["Which of these is a solid?","a brick",["milk","steam"]],
    ["Which of these is a liquid?","milk",["ice","wood"]],
    ["What shape does a liquid take?","the shape of whatever it is poured into",["always a ball","always a cube"]],
    ["Which of these can be squashed into a smaller space?","a gas",["a brick","water"]],
    ["Which one keeps its own shape wherever you put it?","a solid",["a liquid","a gas"]],
    ["What is the gas rising off boiling water called?","steam",["smoke","soot"]],
    ["What are the three states of matter?","solid, liquid and gas",["hot, warm and cold","big, small and tiny"]],
    ["Which substance can be a solid, a liquid and a gas?","water",["wood","iron"]],
    ["Which state keeps the same amount but changes shape?","a liquid",["a solid","a gas"]],
    ["Can you usually see a gas?","no, most are invisible",["yes, always","only when it is frozen"]]
  ], "states"],
  3: ["Melting and freezing", [
    ["What happens to chocolate left out in the sun?","it melts",["it freezes","it turns into a gas"]],
    ["What do we call water once it has frozen?","ice",["steam","fog"]],
    ["What is it called when a liquid turns into a solid?","freezing",["melting","boiling"]],
    ["Which of these would melt if you heated it?","butter",["a stone","a brick"]],
    ["Melting and freezing can both be undone. What kind of change is that?","a reversible change",["a permanent change","an impossible change"]],
    ["What does an ice cube actually do to your drink?","it takes heat out of the drink",["it pours cold into the drink","it makes the drink heavier"]],
    ["At what temperature does ice melt?","0 degrees Celsius",["100 degrees Celsius","50 degrees Celsius"]],
    ["Why do cold countries put salt on icy roads?","it makes the ice melt",["it makes the road colder","it makes the road brighter"]],
    ["Which melts at a lower temperature, chocolate or iron?","chocolate",["iron","they melt at the same point"]],
    ["What do we call a solid that turns straight into a gas?","sublimation",["saturation","separation"]]
  ], "melt"],
  4: ["Water on the move", [
    ["What is it called when a liquid turns into a gas?","evaporation",["condensation","freezing"]],
    ["Why do wet clothes dry on a line?","the water evaporates into the air",["the water freezes","the sun eats it"]],
    ["What are the drops that appear on a cold window called?","condensation",["evaporation","erosion"]],
    ["At what temperature does water boil?","100 degrees Celsius",["0 degrees Celsius","40 degrees Celsius"]],
    ["Where did the water in a cloud come from?","seas and rivers, by evaporating",["the sky makes it itself","the Moon"]],
    ["Which of these dries a puddle up fastest?","a hot sunny day",["a cold night","being covered with a box"]],
    ["What do we call water's whole journey, sea to cloud to rain?","the water cycle",["the water wheel","the water slide"]],
    ["What happens to water vapour when it cools high in the sky?","it forms clouds",["it disappears","it catches fire"]],
    ["Which dries the washing faster, a windy day or a still one?","a windy day",["a still day","they are just the same"]],
    ["What is the dew on the grass in the morning?","water that condensed overnight",["rain that missed","spilt milk"]]
  ], "kettle"],
  5: ["Mixing and dissolving", [
    ["What happens to sugar stirred into hot tea?","it dissolves",["it burns","it freezes"]],
    ["What do we call the liquid that something dissolves into?","the solvent",["the sponge","the sieve"]],
    ["Which of these will not dissolve in water?","sand",["salt","sugar"]],
    ["What makes sugar dissolve faster?","stirring it into warm water",["putting it in the fridge","leaving it perfectly still"]],
    ["When salt dissolves, where has it gone?","it is still there, spread through the water",["it has vanished for good","it has turned into water"]],
    ["What do you get if you mix oil and water?","two separate layers",["one clear drink","a solid lump"]],
    ["What do we call the solid that dissolves into a liquid?","the solute",["the solvent","the sediment"]],
    ["What do we call the liquid once something has dissolved in it?","a solution",["a suspension","a substance"]],
    ["Can you get the sugar back out of sugary water?","yes, by evaporating the water",["no, it is gone for good","only by freezing it"]],
    ["Why does hot water dissolve sugar faster than cold?","its particles move faster",["it is heavier","it is already sweet"]]
  ], "dissolve"],
  6: ["Sorting a mixture", [
    ["How would you get sand out of muddy water?","filter it",["drink it","freeze it"]],
    ["How would you get the salt back out of salty water?","let the water evaporate away",["filter it","stir it harder"]],
    ["How would you pick iron nails out of a bowl of rice?","with a magnet",["with a sieve","with a mirror"]],
    ["What is a sieve good for separating?","big pieces from small ones",["salt from water","air from water"]],
    ["What stays behind in the filter paper?","the bits that never dissolved",["the water","the air"]],
    ["Which of these would separate stones from soil fastest?","a sieve",["a spoon","a straw"]],
    ["What do we call the liquid that runs through the filter paper?","the filtrate",["the residue","the remainder"]],
    ["What do we call the bits left behind in the filter paper?","the residue",["the filtrate","the solution"]],
    ["How would you separate oil floating on water?","let it settle and pour the top off",["freeze them both","stir them harder"]],
    ["How would you get salt out of salty sand?","add water, filter, then evaporate",["use a magnet","use a sieve"]]
  ], "filter"],
  7: ["Changes you cannot undo", [
    ["What happens to paper when it burns?","it changes for ever into ash and smoke",["it turns back into paper","it freezes solid"]],
    ["What do we call a change that cannot be undone?","an irreversible change",["a reversible change","a quiet change"]],
    ["What makes iron go rusty?","air and water together",["ice and snow","loud noise"]],
    ["Can you turn a boiled egg back into a raw one?","no, never",["yes, by cooling it","yes, by shaking it"]],
    ["What do you see when vinegar meets baking soda?","lots of fizzing bubbles",["a solid block","nothing at all"]],
    ["Baking a cake is which kind of change?","irreversible",["reversible","imaginary"]],
    ["What do we call a change that makes a brand new substance?","a chemical change",["a physical change","a temporary change"]],
    ["Is melting a chemical change?","no, because it can be undone",["yes, always","only in winter"]],
    ["Which gas does burning use up?","oxygen",["nitrogen","helium"]],
    ["What is the black stuff left when toast burns?","carbon",["chalk","salt"]]
  ], "candle"],
  8: ["Acids and alkalis", [
    ["What does an acid usually taste like?","sour",["sweet","salty"]],
    ["Which of these is an acid?","lemon juice",["soap","pure water"]],
    ["Which of these is an alkali?","soap",["vinegar","orange juice"]],
    ["What do we use to find out whether something is an acid?","an indicator",["a ruler","a magnet"]],
    ["What colour does red cabbage water go in an acid?","pink or red",["black","gold"]],
    ["Why must we never taste a chemical to test it?","many of them are poisonous",["they all taste the same","they are always cold"]],
    ["What does the pH scale measure?","how acidic or alkaline something is",["how hot something is","how heavy something is"]],
    ["Which pH number is neutral?","7",["0","14"]],
    ["What happens when an acid and an alkali meet in the right amounts?","they neutralise each other",["they explode","they freeze solid"]],
    ["Which of these is neutral, neither acid nor alkali?","pure water",["lemon juice","soap"]]
  ], "ph"],
  9: ["Atoms and molecules", [
    ["What is everything in the world made of?","tiny particles",["tiny pictures","tiny letters"]],
    ["What is the smallest piece of an element called?","an atom",["an acorn","an apple"]],
    ["What do we call a group of atoms joined together?","a molecule",["a mountain","a machine"]],
    ["How many hydrogen atoms are there in one water molecule?","two",["one","ten"]],
    ["In which of these are the particles packed most tightly?","in a solid",["in a liquid","in a gas"]],
    ["What are the particles in a gas doing?","whizzing about far apart",["sitting perfectly still","glued in a neat row"]],
    ["What is at the very centre of an atom?","the nucleus",["an electron","a molecule"]],
    ["What moves around the outside of an atom?","electrons",["protons","neutrons"]],
    ["What holds the atoms in a molecule together?","chemical bonds",["glue","magnets"]],
    ["What is the chemical formula for water?","H2O",["CO2","O2"]]
  ], "molecule"],
  10: ["Elements and metals", [
    ["What is the big table of all the elements called?","the periodic table",["the timetable","the dinner table"]],
    ["Which gas in the air do we need in order to breathe?","oxygen",["helium","argon"]],
    ["Which gas makes a party balloon float upwards?","helium",["oxygen","steam"]],
    ["What is table salt made of?","sodium and chlorine",["sugar and sand","iron and gold"]],
    ["Which metal is used for electrical wires because it carries electricity so well?","copper",["wood","rubber"]],
    ["Which metal are drink cans made of because it is so light?","aluminium",["gold","lead"]],
    ["What do we call a column of the periodic table?","a group",["a row","a shelf"]],
    ["Why are the noble gases so unreactive?","their outer shell is already full",["they are very cold","they are very heavy"]],
    ["Which gas is used to put fires out?","carbon dioxide",["oxygen","hydrogen"]],
    ["Which metal is stainless steel mostly made of?","iron",["gold","tin"]]
  ], "ptable"]
};

/* ==========================================================================
   THE FILMS AND GAMES LADDER — the one that is purely for fun.

   NOT curriculum, and not pretending to be: no school sets homework on Mario.
   It is here because they asked for it, and because a ladder full of things
   they already love is the one they will play when they will not play any of
   the others.

   Ten rungs, easiest first and roughly by age: Mario and Disney at the bottom
   because a boy of six knows them, the studios and who made what at the top.
   Nothing above rung 7 assumes they have seen the film — a ladder ending is
   how it says "not yet", and the card says so.

   Every question is a fact ABOUT a film or a game — a name, a colour, a plot
   point — never a line of dialogue and never a lyric. The pictures are the
   same: a game controller for the Mario rung, a microphone for the K-pop one,
   an original monster for the Pokémon one. Drawing somebody's character into
   this repo would be copying their character, and the same care that keeps
   song words out of data.js keeps them out of QPIC.
   ========================================================================== */
var POP_LADDER = {
  1: ["Mario", [
    ["What is Mario's job?","a plumber",["a dentist","a pilot"]],
    ["What colour is Mario's cap?","red",["green","purple"]],
    ["Who is Mario's brother?","Luigi",["Toad","Bowser"]],
    ["Which princess does Mario keep having to rescue?","Princess Peach",
      ["Princess Elsa","Princess Fiona"]],
    ["Who is the big spiky turtle who causes all the trouble?","Bowser",
      ["Yoshi","Donkey Kong"]],
    ["What is the green dinosaur Mario rides called?","Yoshi",["Rex","Spike"]]
  ], "controller"],
  2: ["Disney", [
    ["Which two sisters are in Frozen?","Elsa and Anna",
      ["Ariel and Ursula","Moana and Maui"]],
    ["What kind of animal is Simba in The Lion King?","a lion",["a tiger","a wolf"]],
    ["In Moana, who is the demigod with the magic fish hook?","Maui",
      ["Mufasa","Maleficent"]],
    ["In Zootopia, what kind of animal is Judy Hopps?","a rabbit",["a fox","a sloth"]],
    ["In The Little Mermaid, what is Ariel?","a mermaid",["a fairy","a dragon"]],
    ["Which film has a snowman called Olaf in it?","Frozen",["Encanto","Zootopia"]]
  ], "castle"],
  3: ["Pixar", [
    ["In Toy Story, what sort of toy is Woody?","a cowboy",["a robot","a dinosaur"]],
    ["Who is the space ranger toy in Toy Story?","Buzz Lightyear",["Rex","Hamm"]],
    ["In Finding Nemo, what kind of fish is Nemo?","a clownfish",["a shark","a whale"]],
    ["In Cars, what is the red racing car called?","Lightning McQueen",
      ["Mater","Sally"]],
    ["In Up, how does Carl make his house fly?","with thousands of balloons",
      ["with a jet engine","with magic beans"]],
    ["In Inside Out, where do all the feelings live?","inside Riley's head",
      ["in a toy box","under the sea"]]
  ], "popcorn"],
  4: ["KPop Demon Hunters", [
    ["What is the girl group in KPop Demon Hunters called?","Huntr/x",
      ["the Saja Boys","the Honmoon"]],
    ["What do the three of them do when they are not on stage?","hunt demons",
      ["bake cakes","drive taxis"]],
    ["What is the rival boy band called?","the Saja Boys",["Huntr/x","the Sajas"]],
    ["What is the magic barrier that keeps the demons out called?","the Honmoon",
      ["the Golden Gate","the Moonbeam"]],
    ["Which member of Huntr/x is hiding that she is part demon?","Rumi",
      ["Mira","Zoey"]],
    ["Which country is the film set in?","South Korea",["Japan","Singapore"]]
  ], "mic"],
  5: ["Pokemon", [
    ["Which yellow Pokemon shoots lightning?","Pikachu",["Charmander","Squirtle"]],
    ["What do trainers throw to catch a Pokemon?","a Poke Ball",
      ["a fishing net","a lasso"]],
    ["Who is the boy trainer in the cartoon with the cap?","Ash",
      ["Brock","Professor Oak"]],
    ["Charmander is which type of Pokemon?","fire",["water","grass"]],
    ["Squirtle is which type of Pokemon?","water",["fire","electric"]],
    ["What is Pikachu's most famous attack?","Thunderbolt",["Flamethrower","Surf"]]
  ], "monster"],
  6: ["Games", [
    ["In Minecraft, what do you dig with?","a pickaxe",["a spoon","a pencil"]],
    ["In Minecraft, which green creature creeps up and explodes?","a creeper",
      ["a chicken","a cow"]],
    ["What shape is almost everything in Minecraft?","a block",
      ["a circle","a triangle"]],
    ["In Angry Birds, what are you firing the birds at?","pigs",["cows","robots"]],
    ["What is Roblox mostly made of?","games made by other players",
      ["films","songs"]],
    ["In Among Us, what do you call the one trying to trick everybody?","the impostor",
      ["the plumber","the referee"]]
  ], "blocks"],
  7: ["DreamWorks", [
    ["What kind of creature is Shrek?","an ogre",["a giant","a troll"]],
    ["What is Shrek's talking donkey friend called?","Donkey",["Dobby","Doug"]],
    ["In Kung Fu Panda, what is the panda called?","Po",["Pip","Bao"]],
    ["In How to Train Your Dragon, what is Hiccup's dragon called?","Toothless",
      ["Smaug","Fireball"]],
    ["In Madagascar, which animal is Alex?","a lion",["a zebra","a penguin"]],
    ["In Puss in Boots, what kind of animal is Puss?","a cat",["a dog","a bear"]]
  ], "ticket"],
  8: ["Superheroes", [
    ["What does Spider-Man shoot out of his wrists?","webs",["fire","ice"]],
    ["Which hero carries a round shield with a star on it?","Captain America",
      ["Iron Man","Thor"]],
    ["What colour does the Hulk go when he is angry?","green",["blue","gold"]],
    ["In The Incredibles, what can Violet do?","turn invisible",
      ["run very fast","stretch like elastic"]],
    ["Which hero flies in a metal suit he built himself?","Iron Man",
      ["Black Panther","Hawkeye"]],
    ["Which city does Batman look after?","Gotham City",["Metropolis","Wakanda"]]
  ], "cape"],
  9: ["Ghibli and anime", [
    ["In My Neighbour Totoro, what is Totoro?","a forest spirit",
      ["a robot","a dragon"]],
    ["In Spirited Away, what happens to Chihiro's parents?","they turn into pigs",
      ["they turn into birds","they fall asleep"]],
    ["Which Japanese studio made My Neighbour Totoro?","Studio Ghibli",
      ["Pixar","Nintendo"]],
    ["In Kiki's Delivery Service, what is Kiki?","a young witch",
      ["a chef","a pilot"]],
    ["What is Kiki's black cat called?","Jiji",["Jojo","Momo"]],
    ["In Howl's Moving Castle, how does the castle get about?","it walks on legs",
      ["it rolls on wheels","it floats on water"]]
  ], "onigiri"],
  10: ["Who made it", [
    ["Which company makes the Mario games?","Nintendo",["Microsoft","Lego"]],
    ["KPop Demon Hunters came out on which service?","Netflix",
      ["Disney+","YouTube"]],
    ["Which studio made Toy Story, the first film made all on computers?","Pixar",
      ["DreamWorks","Studio Ghibli"]],
    ["What do we call the people who speak the parts in a cartoon?","voice actors",
      ["stunt doubles","the camera crew"]],
    ["What is it called when models are moved a tiny bit at a time to make a film?",
      "stop motion",["slow motion","fast forward"]],
    ["Which studio has a boy fishing on the moon in its logo?","DreamWorks",
      ["Pixar","Netflix"]]
  ], "clapper"]
};

/* ==========================================================================
   THE FLAGS AND COUNTRIES LADDER — where things are and who lives there.

   NOT curriculum. Social studies at Nanyang Primary is its own thing with its
   own sheets, and this is not it: it is general knowledge, sorted into ten
   rungs by my own judgement of how hard each one is.

   Our own corner of the world is rung 4 rather than rung 9 on purpose. A boy
   in Singapore can see Johor from the top of a car park; Canberra he cannot.
   ========================================================================== */
var GEO_LADDER = {
  1: ["Flags you know", [
    ["Which country's flag has a red maple leaf on it?","Canada",["Brazil","Kenya"]],
    ["What two colours is the Singapore flag?","red and white",
      ["green and gold","blue and yellow"]],
    ["Which country's flag is a plain red circle on white?","Japan",["China","India"]],
    ["How many stars are on the Singapore flag?","five",["three","ten"]],
    ["Which country's flag is a white cross on red?","Switzerland",["Sweden","Spain"]],
    ["What shape are nearly all flags?","a rectangle",["a circle","a triangle"]]
  ], "flags"],
  2: ["Continents and oceans", [
    ["How many continents are there?","seven",["three","twelve"]],
    ["Which continent is Singapore in?","Asia",["Europe","Africa"]],
    ["Which is the largest ocean?","the Pacific",["the Atlantic","the Indian"]],
    ["Which continent is covered in ice?","Antarctica",["Australia","South America"]],
    ["Which continent has the Sahara Desert?","Africa",["Europe","North America"]],
    ["Which continent is also a country all by itself?","Australia",["Africa","Asia"]]
  ], "globe"],
  3: ["Capital cities", [
    ["What is the capital of Japan?","Tokyo",["Kyoto","Osaka"]],
    ["What is the capital of France?","Paris",["Nice","Lyon"]],
    ["What is the capital of England?","London",["Manchester","Liverpool"]],
    ["What is the capital of China?","Beijing",["Shanghai","Guangzhou"]],
    ["What is the capital of Malaysia?","Kuala Lumpur",["Johor Bahru","Penang"]],
    ["What does the word capital mean here?","the city a country is run from",
      ["the biggest building","the oldest street"]]
  ], "citysky"],
  4: ["Our neighbours", [
    ["Which country is joined to Singapore by a causeway?","Malaysia",
      ["Indonesia","Thailand"]],
    ["Which country next to us is made of thousands of islands?","Indonesia",
      ["Vietnam","Laos"]],
    ["Bangkok is the capital of which country?","Thailand",["Cambodia","Myanmar"]],
    ["Manila is the capital of which country?","the Philippines",["Brunei","Laos"]],
    ["Hanoi is the capital of which country?","Vietnam",["Cambodia","Brunei"]],
    ["What do we call the group of countries around us?","Southeast Asia",
      ["Northern Europe","West Africa"]]
  ], "map"],
  5: ["Famous places", [
    ["In which city would you find the Eiffel Tower?","Paris",["Rome","Berlin"]],
    ["Which country has the Great Wall?","China",["Japan","Korea"]],
    ["The Taj Mahal is in which country?","India",["Pakistan","Nepal"]],
    ["Which city has the Statue of Liberty?","New York",["Los Angeles","Chicago"]],
    ["The Pyramids were built in which country?","Egypt",["Greece","Turkey"]],
    ["The Opera House with white sails like a ship is in which city?","Sydney",
      ["Melbourne","Auckland"]]
  ], "tower"],
  6: ["Biggest and smallest", [
    ["What is the highest mountain in the world?","Mount Everest",
      ["Mount Fuji","Bukit Timah Hill"]],
    ["Which is the largest country in the world?","Russia",["China","Canada"]],
    ["Which is usually called the longest river in the world?","the Nile",
      ["the Thames","the Singapore River"]],
    ["Which is the largest hot desert?","the Sahara",["the Gobi","the Thar"]],
    ["What is the highest hill in Singapore?","Bukit Timah Hill",
      ["Mount Faber","Fort Canning Hill"]],
    ["Which continent has the most people living on it?","Asia",
      ["Antarctica","Australia"]]
  ], "mountain"],
  7: ["Harder capitals", [
    ["What is the capital of Australia?","Canberra",["Sydney","Melbourne"]],
    ["What is the capital of Canada?","Ottawa",["Toronto","Vancouver"]],
    ["What is the capital of South Korea?","Seoul",["Busan","Incheon"]],
    ["What is the capital of Egypt?","Cairo",["Luxor","Alexandria"]],
    ["What is the capital of Italy?","Rome",["Milan","Venice"]],
    ["What is the capital of New Zealand?","Wellington",["Auckland","Christchurch"]]
  ], "pin"],
  8: ["Money and language", [
    ["What money is used in Japan?","the yen",["the euro","the pound"]],
    ["What money is used in Britain?","the pound",["the dollar","the rupee"]],
    ["Which language is spoken in Brazil?","Portuguese",["Spanish","Brazilian"]],
    ["Singapore has four official languages. Which is one of them?","Tamil",
      ["German","Russian"]],
    ["Which language do the most people speak as their first language?","Chinese",
      ["Dutch","Swedish"]],
    ["What money is used in Malaysia?","the ringgit",["the baht","the peso"]]
  ], "speech"],
  9: ["On the map", [
    ["Which imaginary line goes right round the middle of the Earth?","the equator",
      ["the horizon","the timeline"]],
    ["Is Singapore north or south of Malaysia?","south",["north","west"]],
    ["Where is the sun in the morning?","in the east",
      ["in the west","straight overhead"]],
    ["What do we call land with water all the way round it?","an island",
      ["a desert","a valley"]],
    ["What do we call a very large area of land, like Africa?","a continent",
      ["a country","a city"]],
    ["What do we call a book full of maps?","an atlas",["an album","an anthem"]]
  ], "compass"],
  10: ["Flags in detail", [
    ["How many stars are on the flag of the United States?","fifty",
      ["thirteen","five"]],
    ["What is in the middle of the South Korean flag?","a red and blue circle",
      ["a gold star","a dragon"]],
    ["The flag of Brazil is mostly which colour?","green",["red","purple"]],
    ["Which flag is three crosses laid one over another?","the United Kingdom's",
      ["Norway's","Greece's"]],
    ["What is the group of stars on the Australian flag called?","the Southern Cross",
      ["the Great Bear","the Milky Way"]],
    ["What is the study of flags called?","vexillology",["geology","zoology"]]
  ], "flagpole"]
};

/* ==========================================================================
   THE HISTORY LADDER — what happened before, and how anyone knows.

   NOT curriculum. Social Studies at Nanyang Primary has its own sheets and
   this is not them; it is general knowledge, ten rungs deep, ten questions a
   rung, sorted by my own judgement of what a boy can hold.

   Singapore is rung 5 rather than rung 9 on purpose: Temasek and 1965 are his
   own island's story, and a boy should meet that before he meets Rome.

   Rung 9 covers the twentieth century, wars included. It sticks to dates,
   names and what changed — a quiz for a six-year-old is no place for the rest
   of it, and nothing here needs the rest of it to be worth knowing.
   ========================================================================== */
var HIST_LADDER = {
  1: ["Then and now", [
    ["What do we call the time before you were born?","the past",["the future","the present"]],
    ["What did people light their houses with before electricity?","candles and oil lamps",
      ["torches with batteries","neon signs"]],
    ["How did most people travel before cars?","on foot or by horse",
      ["by aeroplane","by underground train"]],
    ["What kept food cold before fridges were invented?","blocks of ice",
      ["batteries","plastic boxes"]],
    ["How did people send a message before telephones?","they wrote a letter",
      ["they sent an email","they sent a text"]],
    ["What do we call the study of what happened long ago?","history",
      ["mystery","geography"]],
    ["Which was invented first, the bicycle or the car?","the bicycle",
      ["the car","they arrived together"]],
    ["What did schoolchildren write on long ago?","a slate",
      ["a tablet computer","a whiteboard"]],
    ["What do we call your grandmother's mother?","your great-grandmother",
      ["your aunt","your cousin"]],
    ["What do we call a very old object that people keep?","an antique",
      ["an argument","an appointment"]]
  ], "hourglass"],
  2: ["Before writing", [
    ["What do we call the time before anyone could write things down?","prehistory",
      ["the holidays","the future"]],
    ["What did the earliest people make their tools from?","stone",
      ["plastic","stainless steel"]],
    ["Where did early people paint their pictures?","on the walls of caves",
      ["on paper","on screens"]],
    ["What did early people use to cook and keep warm?","fire",
      ["electric heaters","gas cookers"]],
    ["Which round invention made heavy loads far easier to move?","the wheel",
      ["the wall","the window"]],
    ["What did early hunters use?","spears",["rifles","fishing rods"]],
    ["What do we call people who moved about instead of settling?","nomads",
      ["neighbours","novelists"]],
    ["What changed once people learnt to farm?","they could stay in one place",
      ["they stopped eating","they travelled further"]],
    ["What were the first houses mostly built from?","mud, wood and straw",
      ["concrete","sheet glass"]],
    ["Which metal did people learn to use after stone?","bronze",
      ["aluminium","titanium"]]
  ], "cave"],
  3: ["Ancient Egypt", [
    ["What are the huge pointed tombs of Egypt called?","pyramids",
      ["castles","cathedrals"]],
    ["What was an Egyptian ruler called?","a pharaoh",["a president","a knight"]],
    ["What is an Egyptian body wrapped in linen called?","a mummy",
      ["a mermaid","a model"]],
    ["Which great river did the Egyptians build beside?","the Nile",
      ["the Thames","the Amazon"]],
    ["What was Egyptian picture writing called?","hieroglyphs",
      ["headlines","holograms"]],
    ["What did the Egyptians write on?","papyrus",
      ["paper made from trees","plastic sheets"]],
    ["Which animal did the Egyptians treat as sacred?","the cat",
      ["the penguin","the kangaroo"]],
    ["What was buried with a pharaoh?","treasure and belongings",
      ["nothing at all","only water"]],
    ["What is the giant stone figure with a lion's body called?","the Sphinx",
      ["the Sphere","the Spire"]],
    ["Roughly how long ago were the great pyramids built?","about 4,500 years ago",
      ["about 200 years ago","about 50 years ago"]]
  ], "pyramid"],
  4: ["Ancient Rome", [
    ["Which city was the heart of the Roman empire?","Rome",["Athens","Cairo"]],
    ["What was a Roman foot soldier called?","a legionary",
      ["a lifeguard","a librarian"]],
    ["What huge round arena did Romans watch contests in?","the Colosseum",
      ["the Cathedral","the Castle"]],
    ["What did the Romans build to carry water for miles?","aqueducts",
      ["escalators","chimneys"]],
    ["Which language did the Romans speak?","Latin",["Greek","English"]],
    ["What were Roman roads famous for?","being remarkably straight",
      ["being made of glass","changing direction daily"]],
    ["What loose garment did Roman men wrap around themselves?","a toga",
      ["a tuxedo","a tracksuit"]],
    ["Which famous Roman leader was assassinated in 44 BC?","Julius Caesar",
      ["Henry the Eighth","Napoleon"]],
    ["How did the Romans write their numbers?","with letters like I, V and X",
      ["with emojis","with barcodes"]],
    ["What became of the Roman empire in the end?","it broke apart",
      ["it is still running","it moved to Egypt"]]
  ], "column"],
  5: ["Singapore's story", [
    ["What was Singapore called hundreds of years ago?","Temasek",
      ["Timbuktu","Tasmania"]],
    ["In which year did Singapore become independent?","1965",["1865","1995"]],
    ["Who was Singapore's first Prime Minister?","Lee Kuan Yew",
      ["Stamford Raffles","Tan Tock Seng"]],
    ["Which Englishman landed in Singapore in 1819?","Stamford Raffles",
      ["Captain Cook","Christopher Columbus"]],
    ["When is Singapore's National Day?","9 August",["1 January","25 December"]],
    ["Which country was Singapore part of just before independence?","Malaysia",
      ["Indonesia","Thailand"]],
    ["Which everyday thing did Singapore have to buy from its neighbour?","fresh water",
      ["sunshine","sea air"]],
    ["What does the old name Singapura mean?","Lion City",
      ["Long River","Low Island"]],
    ["What brought most early settlers to Singapore?","trade",
      ["skiing","gold mining"]],
    ["What is Singapore's port one of the busiest in the world for?","container ships",
      ["submarines","hot air balloons"]]
  ], "harbour"],
  6: ["Castles and knights", [
    ["What metal suit did a knight wear?","armour",["a raincoat","pyjamas"]],
    ["What is the ring of water round a castle called?","the moat",
      ["the mast","the mist"]],
    ["What is the heavy gate that drops down at a castle called?","the portcullis",
      ["the porthole","the postbox"]],
    ["What long weapon did knights carry on horseback?","a lance",
      ["a lasso","a lantern"]],
    ["What is a castle's strongest central tower called?","the keep",
      ["the kitchen","the kennel"]],
    ["What were castle walls built from?","stone",["straw","glass"]],
    ["What did defenders fire from the castle walls?","arrows",
      ["confetti","water balloons"]],
    ["What do we call the centuries of castles and knights?","the Middle Ages",
      ["the Stone Age","the Space Age"]],
    ["What was a boy training to become a knight called?","a squire",
      ["a scout","a sailor"]],
    ["Who did a knight promise to serve?","his lord or king",
      ["his teacher","the postman"]]
  ], "helmet"],
  7: ["Explorers and voyages", [
    ["Who sailed west in 1492 and reached the Americas?","Christopher Columbus",
      ["Marco Polo","Captain Cook"]],
    ["Which traveller went overland to China and wrote about it?","Marco Polo",
      ["Magellan","Amundsen"]],
    ["Whose expedition first sailed all the way round the world?","Magellan's",
      ["Newton's","Napoleon's"]],
    ["How did sailors find their way across open sea?","by compass and the stars",
      ["by mobile phone","by street map"]],
    ["Which explorer charted much of Australia and New Zealand?","Captain Cook",
      ["Captain Scott","Captain Bligh"]],
    ["Which illness struck sailors who ate no fresh fruit?","scurvy",
      ["hiccups","sunburn"]],
    ["Who reached the South Pole first, in 1911?","Roald Amundsen",
      ["Robert Falcon Scott","Ernest Shackleton"]],
    ["What drove the ships of the great explorers?","the wind in their sails",
      ["steam engines","diesel motors"]],
    ["What did explorers bring back from distant lands?","spices and new foods",
      ["televisions","bicycles"]],
    ["What did many people wrongly fear about long voyages?","that you might sail off the edge",
      ["that the sea was fresh water","that ships could not float"]]
  ], "galleon"],
  8: ["Inventions", [
    ["Who is credited with inventing the telephone?","Alexander Graham Bell",
      ["Thomas Edison","Henry Ford"]],
    ["Who made the electric light bulb practical for homes?","Thomas Edison",
      ["Alexander Graham Bell","Isaac Newton"]],
    ["Who flew the first powered aeroplane, in 1903?","the Wright brothers",
      ["Amelia Earhart","Yuri Gagarin"]],
    ["Which machine let books be made quickly and cheaply?","the printing press",
      ["the photocopier","the typewriter"]],
    ["What powered the first railway engines?","steam",["petrol","electricity"]],
    ["How were books made before the printing press?","copied out by hand",
      ["printed at home","not made at all"]],
    ["Who worked out the laws of motion and gravity?","Isaac Newton",
      ["Albert Einstein","Charles Darwin"]],
    ["What medicine did Alexander Fleming discover?","penicillin",
      ["paracetamol","vitamin C"]],
    ["Roughly when did the internet reach ordinary homes?","in the 1990s",
      ["in the 1790s","in the 1490s"]],
    ["What did the first wheels chiefly help people to do?","move heavy loads",
      ["tell the time","cook food"]]
  ], "cog"],
  9: ["The twentieth century", [
    ["What do we call the years from 1939 to 1945?","the Second World War",
      ["the Middle Ages","the Industrial Revolution"]],
    ["In which year did people first walk on the Moon?","1969",["1869","1999"]],
    ["Who was the first person to travel into space?","Yuri Gagarin",
      ["Neil Armstrong","Buzz Aldrin"]],
    ["Who was the first person to walk on the Moon?","Neil Armstrong",
      ["Yuri Gagarin","Michael Collins"]],
    ["Which invention first brought moving pictures into homes?","television",
      ["the radio","the telephone"]],
    ["Which famous wall came down in 1989?","the Berlin Wall",
      ["the Great Wall of China","Hadrian's Wall"]],
    ["Who led India's peaceful campaign for independence?","Mahatma Gandhi",
      ["Nelson Mandela","Winston Churchill"]],
    ["Who became South Africa's first black president, in 1994?","Nelson Mandela",
      ["Mahatma Gandhi","Kofi Annan"]],
    ["What happened to computers over the century?","they got far smaller and faster",
      ["they got much bigger","they disappeared"]],
    ["Which Asian city hosted the 1964 Olympic Games?","Tokyo",["Osaka","Seoul"]]
  ], "plane"],
  10: ["How we know", [
    ["What do we call somebody who digs up and studies the past?","an archaeologist",
      ["an architect","an acrobat"]],
    ["What do we call an old object dug out of the ground?","an artefact",
      ["an artwork","an alarm"]],
    ["Where are objects from the past kept for everyone to see?","in a museum",
      ["in a mailbox","in a market"]],
    ["What does BC mean after a date?","before Christ",
      ["big century","by carriage"]],
    ["What do we call an account written by somebody who was there?","a primary source",
      ["a fairy tale","a forecast"]],
    ["How many years are there in a century?","one hundred",["ten","one thousand"]],
    ["What do we call a period of ten years?","a decade",
      ["a century","a millennium"]],
    ["What do we call a period of a thousand years?","a millennium",
      ["a decade","a fortnight"]],
    ["How do scientists work out the age of an ancient object?","by testing the material",
      ["by asking it","by weighing it"]],
    ["Why do two history books sometimes tell it differently?",
      "people remember and judge differently",
      ["one of them must be lying","the past keeps changing"]]
  ], "urn"]
};

/* ==========================================================================
   THE GEOGRAPHY LADDER — the Earth itself.

   NOT curriculum, and deliberately the other half of GEO_LADDER: that one is
   flags, capitals and who lives where, this one is rivers, volcanoes, the
   inside of the planet and the weather over it. Where the two touch — oceans,
   maps — the questions are different ones, checked by hand when a row is added.

   Singapore's own geography turns up throughout rather than in a rung of its
   own: the monsoon, being one degree off the equator, having no fresh water
   of its own. That is the geography he can feel.
   ========================================================================== */
var GEOG_LADDER = {
  1: ["Land and water", [
    ["What do we call a huge area of salt water?","an ocean",["a lake","a pond"]],
    ["What do we call water with land all the way round it?","a lake",
      ["an island","a bay"]],
    ["What do we call a very high piece of land?","a mountain",
      ["a valley","a beach"]],
    ["What do we call the low ground between two hills?","a valley",
      ["a summit","a cliff"]],
    ["What do we call water flowing downhill to the sea?","a river",
      ["a road","a ridge"]],
    ["What do we call the sandy edge of the sea?","a beach",
      ["a bridge","a border"]],
    ["What do we call a place that gets almost no rain?","a desert",
      ["a rainforest","a swamp"]],
    ["What do we call a steep rock face above the sea?","a cliff",
      ["a cave","a crater"]],
    ["What do we call a wide flat stretch of land?","a plain",
      ["a peak","a pier"]],
    ["What do we call a finger of land sticking out into the sea?","a peninsula",
      ["a pyramid","a pavement"]]
  ], "island"],
  2: ["Weather and seasons", [
    ["How many seasons do many countries have?","four",["one","ten"]],
    ["Which season follows winter?","spring",["autumn","summer"]],
    ["Why does Singapore not have four seasons?","it sits close to the equator",
      ["it is too small","it is too busy"]],
    ["What do we call a long spell with no rain at all?","a drought",
      ["a flood","a breeze"]],
    ["Which instrument shows which way the wind is blowing?","a weather vane",
      ["a thermometer","a ruler"]],
    ["What do we call what the sky is doing today?","the weather",
      ["the climate","the calendar"]],
    ["What do we measure rainfall with?","a rain gauge",
      ["a stopwatch","a compass"]],
    ["What is the season of heavy rains in this part of Asia called?","the monsoon",
      ["the hurricane","the blizzard"]],
    ["What are clouds actually made of?","tiny drops of water",
      ["cotton wool","smoke"]],
    ["What do we call frozen rain that falls as hard lumps?","hail",
      ["dew","fog"]]
  ], "cloud"],
  3: ["Rivers and lakes", [
    ["Where does a river begin?","at its source",
      ["at its mouth","in the middle"]],
    ["Where does a river end?","at its mouth",
      ["at its source","at a mountain top"]],
    ["What do we call a smaller river joining a bigger one?","a tributary",
      ["a treaty","a trolley"]],
    ["Which river runs through the world's biggest rainforest?","the Amazon",
      ["the Nile","the Danube"]],
    ["What do we call water tumbling over a cliff edge?","a waterfall",
      ["a whirlpool","a wave"]],
    ["Why do people build dams across rivers?","to store water and make electricity",
      ["to stop fish swimming","to make the river wider"]],
    ["What do we call a river bursting over its banks?","a flood",
      ["a drought","a frost"]],
    ["Which river gave Singapore's old town its harbour?","the Singapore River",
      ["the Thames","the Mekong"]],
    ["What do we call the deep valley a river carves over ages?","a gorge",
      ["a garden","a gate"]],
    ["Is the water in most lakes salty or fresh?","fresh",["salty","fizzy"]]
  ], "river"],
  4: ["Mountains and volcanoes", [
    ["What pours out of an erupting volcano?","lava",["lemonade","ice"]],
    ["What do we call the opening at the top of a volcano?","the crater",
      ["the crust","the cradle"]],
    ["What is the very top of a mountain called?","the summit",
      ["the base","the middle"]],
    ["Which mountain range is Mount Everest part of?","the Himalayas",
      ["the Alps","the Andes"]],
    ["What do we call a volcano that has been quiet for ages?","dormant",
      ["dramatic","damp"]],
    ["What is melted rock called while it is still underground?","magma",
      ["mud","marble"]],
    ["Which country near Singapore has dozens of active volcanoes?","Indonesia",
      ["Brunei","Vietnam"]],
    ["What do we call a long line of mountains together?","a range",
      ["a row","a rank"]],
    ["What pushes mountains upwards over millions of years?","the Earth's plates colliding",
      ["rain piling up","wind blowing sand"]],
    ["What often covers the very highest peaks all year?","snow",
      ["sand","grass"]]
  ], "volcano"],
  5: ["Oceans and coasts", [
    ["How many oceans are there on Earth?","five",["two","twenty"]],
    ["Which ocean lies between Africa and Australia?","the Indian Ocean",
      ["the Atlantic","the Arctic"]],
    ["What makes the tide rise and fall?","the pull of the Moon",
      ["the wind","passing ships"]],
    ["What do we call the edge where land meets sea?","the coast",
      ["the corner","the crust"]],
    ["What is a huge wave caused by an undersea earthquake called?","a tsunami",
      ["a typhoon","a tornado"]],
    ["What do we call a ring of coral around a lagoon?","an atoll",
      ["an attic","an alley"]],
    ["Why can people not drink sea water?","it is far too salty",
      ["it is too cold","it is too blue"]],
    ["What slowly wears a cliff away?","the waves",
      ["the clouds","the moonlight"]],
    ["What do we call the very deepest parts of the ocean floor?","trenches",
      ["trails","tunnels"]],
    ["Which living thing builds a reef?","coral",["cod","crabs"]]
  ], "wave"],
  6: ["Deserts, forests and ice", [
    ["How much rain does a desert get in a year?","very little",
      ["a great deal","more than a rainforest"]],
    ["What do we call a thick forest where rain falls almost daily?","a rainforest",
      ["a desert","a meadow"]],
    ["What do we call the frozen treeless land near the poles?","tundra",
      ["the tropics","a terrace"]],
    ["How does a cactus survive in a desert?","it stores water in its stem",
      ["it drinks from taps","it needs no water at all"]],
    ["What do we call a green watered spot in a desert?","an oasis",
      ["an orchard","an office"]],
    ["Which continent is almost entirely buried under ice?","Antarctica",
      ["Africa","Australia"]],
    ["What do we call a huge slow-moving river of ice?","a glacier",
      ["a geyser","a gulf"]],
    ["Why do rainforests matter to the whole world?","they produce a great deal of oxygen",
      ["they make the sand","they hold the moon up"]],
    ["What do we call the leafy roof of a rainforest?","the canopy",
      ["the cellar","the cabin"]],
    ["Which enormous desert stretches across northern Africa?","the Sahara",
      ["the Gobi","the Atacama"]]
  ], "desert"],
  7: ["Maps and directions", [
    ["What are the four main compass directions?","north, south, east and west",
      ["up, down, left and right","first, second, third and fourth"]],
    ["What does the key on a map tell you?","what the symbols mean",
      ["who drew it","how old it is"]],
    ["What do we call map lines that join places of the same height?","contour lines",
      ["cracks","corners"]],
    ["Which direction is opposite east?","west",["north","south"]],
    ["What do we call how much a map shrinks the real world?","the scale",
      ["the size","the sum"]],
    ["What is a globe?","a map of the Earth on a ball",
      ["a kind of lamp","a large balloon"]],
    ["Which half of the Earth is Singapore in?","the northern hemisphere",
      ["the southern hemisphere","neither one"]],
    ["Where is north usually drawn on a map?","at the top",
      ["at the bottom","on the left"]],
    ["What do we call a photograph of the ground taken from space?","a satellite image",
      ["a selfie","a sketch"]],
    ["Why do maps use symbols instead of pictures?","a great deal fits in a small space",
      ["to look decorative","to keep places secret"]]
  ], "compass"],
  8: ["Inside the Earth", [
    ["What do we call the thin rocky layer we live on?","the crust",
      ["the core","the canopy"]],
    ["What is at the very centre of the Earth?","the core",
      ["the crust","the mantle"]],
    ["What do we call the great slabs the crust is broken into?","plates",
      ["puzzles","planks"]],
    ["What happens when two plates suddenly slip past each other?","an earthquake",
      ["a rainbow","a sunset"]],
    ["Which instrument records earthquakes?","a seismometer",
      ["a thermometer","a speedometer"]],
    ["Is the centre of the Earth hot or cold?","extremely hot",
      ["extremely cold","about room temperature"]],
    ["What is the thick layer between the crust and the core called?","the mantle",
      ["the mantelpiece","the middle ground"]],
    ["Why do volcanoes so often appear where plates meet?","magma can escape there",
      ["it is windier there","the sea is deeper there"]],
    ["What do we call a small shaking of the ground?","a tremor",
      ["a trickle","a trumpet"]],
    ["Which layer of the Earth is the thickest?","the mantle is far thicker than the crust",
      ["the crust is thickest","they are all equal"]]
  ], "earthlayers"],
  9: ["Climate", [
    ["What is the difference between weather and climate?",
      "climate is the usual weather over many years",
      ["there is no difference","climate only means rain"]],
    ["What is Singapore's climate like?","hot and wet all year round",
      ["cold and dry","four clear seasons"]],
    ["What do we call the hot band either side of the equator?","the tropics",
      ["the poles","the plains"]],
    ["Why is it so cold at the poles?","the sun's rays arrive at a low angle",
      ["they are further from the moon","they are higher above the sea"]],
    ["Which winds bring the heavy seasonal rains to Asia?","the monsoon winds",
      ["the mistral","the trade breeze"]],
    ["What is happening to the Earth's average temperature?","it is rising",
      ["it is falling quickly","it never changes at all"]],
    ["What do we call the gases that trap heat around the Earth?","greenhouse gases",
      ["greenfly","green tea"]],
    ["What is happening to the ice at the poles as the world warms?","it is melting",
      ["it is growing","it is turning to sand"]],
    ["Which is wetter, a rainforest or a desert?","a rainforest",
      ["a desert","they are the same"]],
    ["Why does planting trees help?","trees take carbon dioxide out of the air",
      ["trees make the wind blow","trees block out the sun"]]
  ], "umbrella"],
  10: ["People and the planet", [
    ["What do we call a very large town?","a city",["a village","a cottage"]],
    ["What do we call people moving to live in another country?","migration",
      ["a mirage","a marathon"]],
    ["What do we call growing food on the land?","agriculture",
      ["architecture","arithmetic"]],
    ["Why did most great cities grow up beside water?","trade and travel were easier",
      ["the view was better","water costs nothing"]],
    ["What do we call rubbish that will never rot away?","non-biodegradable",
      ["non-stop","non-fiction"]],
    ["What does recycling actually do?","turns old things into new ones",
      ["buries rubbish deeper","burns everything at once"]],
    ["What causes most air pollution in a big city?","burning fuel in vehicles and factories",
      ["too many trees","too much rain"]],
    ["What do we call land set aside to protect wildlife?","a nature reserve",
      ["a car park","a shopping centre"]],
    ["Roughly how many people live on Earth?","about eight billion",
      ["about eight million","about eight thousand"]],
    ["What is a simple way to use less water at home?","take shorter showers",
      ["leave the taps running","wash the pavement"]]
  ], "recycle"]
};

/* ==========================================================================
   THE SPORTS LADDER — how each game is played, not who won it.

   NOT curriculum, and deliberately not about results either: a quiz on last
   season's league table is out of date by the time anyone plays it, and a boy
   who knows how many players are on a football pitch knows something that is
   still true next year.

   Badminton gets its own rung at 3 because it is the one on television here.
   ========================================================================== */
var SPORT_LADDER = {
  1: ["Football", [
    ["How many players from one team are on the pitch?","eleven",["five","twenty"]],
    ["What do you call it when the ball goes into the net?","a goal",
      ["a try","a basket"]],
    ["Which player is allowed to pick the ball up?","the goalkeeper",
      ["the striker","the defender"]],
    ["What colour card sends a player off?","red",["yellow","blue"]],
    ["How long is a normal football match?","90 minutes",
      ["30 minutes","three hours"]],
    ["What is the World Cup?","the biggest football competition",
      ["a drinking cup","a kind of ball"]]
  ], "football"],
  2: ["Swimming", [
    ["Which stroke do you swim lying on your back?","backstroke",
      ["breaststroke","butterfly"]],
    ["What do we call the strips a pool is divided into?","lanes",
      ["roads","tracks"]],
    ["Which stroke is named after an insect?","butterfly",
      ["the frog stroke","the crab stroke"]],
    ["What do swimmers wear to see underwater?","goggles",
      ["sunglasses","a helmet"]],
    ["Which stroke is usually the fastest?","freestyle",
      ["breaststroke","backstroke"]],
    ["How long is an Olympic swimming pool?","50 metres",
      ["10 metres","500 metres"]]
  ], "pool"],
  3: ["Badminton", [
    ["What do you hit over the net in badminton?","a shuttlecock",
      ["a football","a puck"]],
    ["What is a shuttlecock often made with?","feathers",["wool","paper"]],
    ["How many players are on each side in singles?","one",["two","five"]],
    ["What do you hit the shuttlecock with?","a racquet",["a bat","a club"]],
    ["Which of these countries is famous for being strong at badminton?","Indonesia",
      ["Iceland","Egypt"]],
    ["What happens if the shuttlecock lands outside the lines?","the other side scores",
      ["you score","nothing at all"]]
  ], "racquet"],
  4: ["Basketball", [
    ["How many points is an ordinary basket worth?","two",["one","five"]],
    ["What must you do to move with the ball?","bounce it",["carry it","kick it"]],
    ["How many players from one team are on court?","five",["eleven","two"]],
    ["What is the ring you throw the ball through called?","the hoop",
      ["the post","the base"]],
    ["How high off the ground is a basketball hoop?","about three metres",
      ["about one metre","about ten metres"]],
    ["What is it called when you move the ball by bouncing it along?","dribbling",
      ["diving","drifting"]]
  ], "hoop"],
  5: ["Running and jumping", [
    ["What do sprinters push off from at the start?","starting blocks",
      ["a chair","a boat"]],
    ["How far is a marathon?","about 42 kilometres",
      ["about four kilometres","about 400 kilometres"]],
    ["What do runners pass to each other in a relay?","a baton",
      ["a ball","a hat"]],
    ["What do long jumpers land in?","a sandpit",["a pool","a net"]],
    ["What is the shortest sprint race at the Olympics?","100 metres",
      ["one metre","1000 metres"]],
    ["What do runners jump over in a hurdles race?","hurdles",
      ["walls","rivers"]]
  ], "stopwatch"],
  6: ["Wheels", [
    ["How many wheels does an ordinary bicycle have?","two",["three","four"]],
    ["What should you always wear when cycling?","a helmet",["a crown","flippers"]],
    ["What is the most famous bicycle race in the world?","the Tour de France",
      ["the Tour de Sentosa","the Wheel Cup"]],
    ["What do you push round with your feet on a bicycle?","the pedals",
      ["the brakes","the bell"]],
    ["What stops a bicycle?","the brakes",["the saddle","the basket"]],
    ["How many wheels does a skateboard have?","four",["two","six"]]
  ], "bike"],
  7: ["The Olympics", [
    ["How often are the Summer Olympics held?","every four years",
      ["every year","every ten years"]],
    ["What does the winner of an Olympic event get?","a gold medal",
      ["a silver cup","a car"]],
    ["Which medal is for second place?","silver",["gold","bronze"]],
    ["Which medal is for third place?","bronze",["silver","gold"]],
    ["Where were the very first Olympics held, long ago?","in Greece",
      ["in China","in Brazil"]],
    ["What is carried from country to country before the games?","a flame",
      ["a flagpole","a boat"]]
  ], "podium"],
  8: ["Martial arts and gymnastics", [
    ["What colour belt does a beginner usually wear in judo?","white",
      ["black","gold"]],
    ["What colour belt shows somebody is an expert?","black",["white","yellow"]],
    ["Which martial art comes from Korea?","taekwondo",["judo","kung fu"]],
    ["Which martial art comes from Japan?","judo",["taekwondo","capoeira"]],
    ["What do gymnasts perform on that is long, narrow and high up?","the balance beam",
      ["the running track","the swimming lane"]],
    ["What is a forward roll?","rolling head over heels",
      ["a jump into water","a kind of bread"]]
  ], "belt"],
  9: ["Bat and ball", [
    ["In cricket, what are the three sticks behind the batter called?","the stumps",
      ["the poles","the posts"]],
    ["In baseball, what do you run round?","the bases",["the net","the hoop"]],
    ["What is it called in baseball when you hit it out of the park?","a home run",
      ["a goal","a knockout"]],
    ["Which country did cricket come from?","England",["Brazil","Japan"]],
    ["In cricket, what is the person who throws the ball called?","the bowler",
      ["the pitcher","the server"]],
    ["What is a cricket ball usually made of?","leather",["plastic","glass"]]
  ], "bat"],
  10: ["Rules and fair play", [
    ["Who makes sure the rules are kept during a match?","the referee",
      ["the coach","the crowd"]],
    ["What do we call a game that ends level?","a draw",["a win","a foul"]],
    ["What do we call the person who trains a team?","the coach",
      ["the captain","the mascot"]],
    ["What is a hat-trick?","three goals by the same player",
      ["three players sent off","a magic trick at half time"]],
    ["What is your personal best?","the best you have ever done yourself",
      ["the world record","the team's score"]],
    ["What do we call playing fairly and shaking hands afterwards?","sportsmanship",
      ["showmanship","championship"]]
  ], "trophy"]
};

/* ==========================================================================
   THE MUSIC LADDER — instruments, how music is written, who wrote it.

   NOT curriculum. Both schools do music and neither sets homework on it.

   Not a word of any song is in here and none is coming: every question is
   about how music works — what a stave is, which family a trumpet belongs to,
   who wrote The Four Seasons — the same line the Fun screen holds. A quiz
   question that needed a lyric to answer it would be a lyric in data.js.
   ========================================================================== */
var MUSIC_LADDER = {
  1: ["Instruments", [
    ["How many strings does an ordinary guitar have?","six",["two","twenty"]],
    ["Which instrument has black and white keys?","the piano",
      ["the flute","the drum"]],
    ["What do you play a violin with?","a bow",["a hammer","a reed"]],
    ["Which of these do you blow into?","the flute",["the harp","the cymbals"]],
    ["What do you usually hit a drum with?","sticks",["a bow","a key"]],
    ["Which instrument do you sit down and hold between your knees?","the cello",
      ["the trumpet","the tambourine"]]
  ], "guitar"],
  2: ["Families of instruments", [
    ["Which family does the violin belong to?","the strings",
      ["the brass","the percussion"]],
    ["Which family does the trumpet belong to?","the brass",
      ["the strings","the woodwind"]],
    ["Which family does the drum belong to?","the percussion",
      ["the strings","the brass"]],
    ["Which family does the flute belong to?","the woodwind",
      ["the brass","the percussion"]],
    ["What are brass instruments made of?","metal",["wood","glass"]],
    ["How do you make a sound on a brass instrument?","buzz your lips into it",
      ["pluck a string","hit it with a stick"]]
  ], "trumpet"],
  3: ["Loud, soft, high and low", [
    ["What do we call how loud or soft music is?","the dynamics",
      ["the tempo","the title"]],
    ["Which instrument makes the lowest sounds?","the tuba",
      ["the piccolo","the triangle"]],
    ["Do big instruments usually make high or low sounds?","low",
      ["high","no sound at all"]],
    ["What is it called when music gets gradually louder?","a crescendo",
      ["a chorus","a canyon"]],
    ["Which end of a piano plays the high notes?","the right-hand end",
      ["the left-hand end","the middle"]],
    ["What do we call a silence written into a piece of music?","a rest",
      ["a gap","a hole"]]
  ], "dynamics"],
  4: ["Beat and rhythm", [
    ["What do we call the steady pulse you tap your foot to?","the beat",
      ["the words","the colour"]],
    ["What do we call how fast or slow a piece of music is?","the tempo",
      ["the volume","the pitch"]],
    ["What do we call a pattern of long and short sounds?","the rhythm",
      ["the rainbow","the recipe"]],
    ["How many beats are in most bars of pop music?","four",["one","nine"]],
    ["What does a metronome do?","clicks out a steady beat",
      ["plays a tune","records the music"]],
    ["What do we call it when everybody claps together on the beat?","keeping time",
      ["keeping score","keeping quiet"]]
  ], "drum"],
  5: ["Reading music", [
    ["How many lines does a musical stave have?","five",["three","ten"]],
    ["What are the round marks written on the stave called?","notes",
      ["dots","letters"]],
    ["How many letters are used to name the notes?","seven",
      ["three","twenty-six"]],
    ["What is the curly sign at the start of the stave called?","a clef",
      ["a cliff","a claw"]],
    ["What does a sharp sign do to a note?","makes it a little higher",
      ["makes it louder","makes it shorter"]],
    ["Where is a note written if it sounds higher?","further up the stave",
      ["further down the stave","in the margin"]]
  ], "stave"],
  6: ["The orchestra", [
    ["Who stands at the front and leads an orchestra?","the conductor",
      ["the drummer","the singer"]],
    ["Which family has the most players in an orchestra?","the strings",
      ["the brass","the percussion"]],
    ["What do the players read from while they play?","their music",
      ["a newspaper","a map"]],
    ["What do we call a large group of people singing together?","a choir",
      ["a crowd","a class"]],
    ["What is a long piece written for a whole orchestra often called?","a symphony",
      ["a sandwich","a sonnet"]],
    ["What does the conductor hold?","a baton",["a bat","a brush"]]
  ], "violin"],
  7: ["Voices", [
    ["What do we call the highest singing voice?","soprano",["bass","tenor"]],
    ["What do we call the lowest singing voice?","bass",["soprano","alto"]],
    ["What is singing with no instruments at all called?","a cappella",
      ["a capital","a carousel"]],
    ["What do we call the main tune of a song?","the melody",
      ["the medley","the mystery"]],
    ["What do we call the part of a song that comes round again?","the chorus",
      ["the verse","the ending"]],
    ["What do we call notes sung together that sound good?","harmony",
      ["history","hardware"]]
  ], "mic"],
  8: ["Music around the world", [
    ["Which Scottish instrument has a bag you squeeze?","the bagpipes",
      ["the banjo","the bongo"]],
    ["Which country is K-pop from?","South Korea",["Japan","Thailand"]],
    ["The steel drum comes from which part of the world?","the Caribbean",
      ["the Arctic","the Sahara"]],
    ["The erhu, which has two strings, is from which country?","China",
      ["Brazil","Norway"]],
    ["Which Indonesian orchestra is made mostly of gongs and metal keys?","the gamelan",
      ["the gramophone","the gondola"]],
    ["What is the Japanese instrument with thirteen strings called?","the koto",
      ["the kazoo","the kalimba"]]
  ], "globe"],
  9: ["Composers", [
    ["Who carried on writing music after he went deaf?","Beethoven",
      ["Mozart","Bach"]],
    ["Which composer was famous as a small child playing for kings?","Mozart",
      ["Beethoven","Chopin"]],
    ["Who wrote The Four Seasons?","Vivaldi",["Verdi","Handel"]],
    ["Which country was Mozart born in?","Austria",["Australia","Argentina"]],
    ["What do we call somebody who writes music?","a composer",
      ["a conductor","a carpenter"]],
    ["Who wrote the music for The Nutcracker?","Tchaikovsky",["Brahms","Schubert"]]
  ], "piano"],
  10: ["Making music", [
    ["What do we call a piece of music written down in full?","the score",
      ["the scoreboard","the sketch"]],
    ["Where is music usually recorded?","in a studio",
      ["in a stadium","in a station"]],
    ["What do you sing into when you are recording?","a microphone",
      ["a telescope","a kettle"]],
    ["What is a cover version?","somebody else performing an existing song",
      ["the front of a CD","the volume knob"]],
    ["What do we call the words of a song?","the lyrics",
      ["the labels","the letters"]],
    ["What does live music mean?","played in front of you, not recorded",
      ["music about animals","music played very loudly"]]
  ], "headphones"]
};

/* ==========================================================================
   THE ART LADDER — colour, shape, and the people who made the famous ones.

   NOT curriculum. Art at school is something he does rather than something he
   is tested on, and it should stay that way; this is the words for it.

   Nothing here reproduces a painting. The rung about famous pictures asks who
   painted what and what they are of, and its picture is an empty gold frame —
   copying somebody's painting into this repo is copying their painting, the
   same rule that keeps characters out of QPIC.
   ========================================================================== */
var ART_LADDER = {
  1: ["Colours", [
    ["How many colours are in a rainbow?","seven",["three","twelve"]],
    ["Which of these is a primary colour?","blue",["green","orange"]],
    ["What are the three primary colours?","red, yellow and blue",
      ["red, green and grey","black, white and brown"]],
    ["Which of these are called warm colours?","red, orange and yellow",
      ["blue and grey","black and white"]],
    ["Which colour sits opposite red on the colour wheel?","green",
      ["purple","yellow"]],
    ["What do we call colours like blue and grey?","cool colours",
      ["hot colours","loud colours"]]
  ], "palette"],
  2: ["Mixing colours", [
    ["What do you get if you mix red and yellow?","orange",["purple","green"]],
    ["What do you get if you mix blue and yellow?","green",["orange","brown"]],
    ["What do you get if you mix red and blue?","purple",["green","yellow"]],
    ["What happens if you add white to a colour?","it gets lighter",
      ["it gets darker","it disappears"]],
    ["What happens if you add black to a colour?","it gets darker",
      ["it gets lighter","it turns red"]],
    ["What do you get if you mix all the paints together?","a muddy brown",
      ["bright white","gold"]]
  ], "paintpots"],
  3: ["Lines and shapes", [
    ["How many sides does a triangle have?","three",["four","five"]],
    ["What do we call the line round the edge of a shape?","its outline",
      ["its middle","its shadow"]],
    ["What is a shape with four equal sides called?","a square",
      ["a circle","a triangle"]],
    ["What do we call a line that goes straight up and down?","vertical",
      ["horizontal","diagonal"]],
    ["What do we call a line that goes flat across?","horizontal",
      ["vertical","curved"]],
    ["What do we call a quick drawing made of lines only?","a sketch",
      ["a statue","a stencil"]]
  ], "shapes"],
  4: ["Drawing and painting", [
    ["What do you rub out a pencil line with?","an eraser",["a brush","a ruler"]],
    ["What is the hairy end of a paintbrush called?","the bristles",
      ["the handle","the ferrule"]],
    ["What is the cloth stretched over a wooden frame to paint on?","canvas",
      ["cardboard","carpet"]],
    ["Which pencil makes the darkest line?","a soft one",
      ["a hard one","they are the same"]],
    ["What do artists mix their paints on?","a palette",
      ["a pillow","a pencil case"]],
    ["What are charcoal and pastels used for?","drawing",
      ["eating","building"]]
  ], "pencils"],
  5: ["Famous pictures", [
    ["Who painted the Mona Lisa?","Leonardo da Vinci",
      ["Vincent van Gogh","Pablo Picasso"]],
    ["Which painter cut off part of his own ear?","Van Gogh",
      ["Monet","Michelangelo"]],
    ["Which famous painting shows a woman with a mysterious smile?","the Mona Lisa",
      ["The Scream","Sunflowers"]],
    ["Who painted the ceiling of the Sistine Chapel?","Michelangelo",
      ["Rembrandt","Raphael"]],
    ["Which artist painted water lilies again and again?","Monet",
      ["Picasso","Constable"]],
    ["Which artist painted faces all jumbled up into flat shapes?","Picasso",
      ["Monet","Turner"]]
  ], "frame"],
  6: ["Artists at work", [
    ["What do we call a picture of a person?","a portrait",
      ["a landscape","a still life"]],
    ["What do we call a picture of the countryside?","a landscape",
      ["a portrait","a still life"]],
    ["What do we call a picture of objects like fruit on a table?","a still life",
      ["a portrait","a landscape"]],
    ["What is a picture an artist paints of themselves called?","a self-portrait",
      ["a selfie stick","a mirror"]],
    ["What is the wooden stand that holds a canvas called?","an easel",
      ["an eagle","an elbow"]],
    ["What do we call the person who sits still to be painted?","the model",
      ["the manager","the mascot"]]
  ], "easel"],
  7: ["Sculpture and building", [
    ["What do we call art you can walk all the way round?","sculpture",
      ["a painting","a poster"]],
    ["What are many statues carved out of?","stone",["paper","water"]],
    ["What is the hot oven that clay pots are baked in called?","a kiln",
      ["a kettle","a kitchen sink"]],
    ["What do we call a picture made from small coloured tiles?","a mosaic",
      ["a mosquito","a mobile"]],
    ["Who designs buildings?","an architect",["an archer","an acrobat"]],
    ["What do we call a very large painting made on a wall?","a mural",
      ["a medal","a mirror"]]
  ], "statue"],
  8: ["Art around the world", [
    ["Chinese painting is traditionally done with what?","ink and a brush",
      ["crayons","spray paint"]],
    ["What is the Japanese art of folding paper called?","origami",
      ["karaoke","kirigami"]],
    ["What is the art of patterning cloth with wax called here and in Indonesia?",
      "batik",["bakso","bandung"]],
    ["What do we call beautiful handwriting done as an art?","calligraphy",
      ["cartography","choreography"]],
    ["Aboriginal Australian paintings often use what?","dots",
      ["glitter","glass beads"]],
    ["What is a long Chinese painting that unrolls called?","a scroll",
      ["a screen","a scrapbook"]]
  ], "inkbrush"],
  9: ["Making a picture", [
    ["What do we call the part of a picture nearest to you?","the foreground",
      ["the background","the underground"]],
    ["What do we call the part furthest away?","the background",
      ["the foreground","the playground"]],
    ["Why do artists draw faraway things smaller?","to make them look far away",
      ["to save paint","to be funny"]],
    ["What is the line where the land meets the sky called?","the horizon",
      ["the border","the hedge"]],
    ["What do we call the light and dark that make something look round?","shading",
      ["sharpening","shouting"]],
    ["What do we call the way things are arranged in a picture?","the composition",
      ["the collection","the conversation"]]
  ], "canvas"],
  10: ["Art words", [
    ["What is a picture made by sticking on paper and scraps called?","a collage",
      ["a cottage","a carriage"]],
    ["What is a picture printed from a carved block of wood called?","a woodcut",
      ["a woodchuck","a woodpecker"]],
    ["What do we call art that is not a picture of anything real?","abstract art",
      ["absent art","ancient art"]],
    ["Who chooses and looks after the pictures in a gallery?","a curator",
      ["a caretaker","a courier"]],
    ["What do we call a picture printed in many identical copies?","a print",
      ["a pint","a plant"]],
    ["What do we call the way an artist's work looks, that makes it theirs?",
      "their style",["their salary","their signature"]]
  ], "collage"]
};

/* ==========================================================================
   THE COMPUTERS LADDER — how the machine works and how to be safe on it.

   NOT curriculum: Nanyang Primary does not examine this, and the good half of
   it is not examinable anywhere. Rung 5 is the one that matters — passwords,
   strangers, what to do when something online is upsetting — and it is at 5
   rather than 9 so that a boy who stalls halfway up has still met it.

   Rung 10 ends on the thing a computer cannot do, which is the right last
   question for a ladder a child plays on a screen.
   ========================================================================== */
var COMP_LADDER = {
  1: ["Parts of a computer", [
    ["Which part of a computer do you look at?","the screen",
      ["the keyboard","the mouse"]],
    ["Which part do you type on?","the keyboard",["the screen","the printer"]],
    ["What do you slide about to point and click?","the mouse",
      ["the monitor","the modem"]],
    ["What puts your work onto paper?","the printer",
      ["the speaker","the webcam"]],
    ["What comes out of the speakers?","sound",["pictures","paper"]],
    ["What is a laptop?","a computer you can carry about",
      ["a very large desk","a kind of printer"]]
  ], "desktop"],
  2: ["Going in and coming out", [
    ["A keyboard is what kind of device?","an input device",
      ["an output device","a broken device"]],
    ["A screen is what kind of device?","an output device",
      ["an input device","a storage device"]],
    ["Which of these does both, in and out?","a touchscreen",
      ["a mouse","a printer"]],
    ["What does a microphone put into a computer?","sound",
      ["pictures","paper"]],
    ["What does a camera put into a computer?","pictures",
      ["sound","electricity"]],
    ["What do we call the information a computer is given?","input",
      ["intake","income"]]
  ], "mouse"],
  3: ["Files and folders", [
    ["What do we call one piece of work saved on a computer?","a file",
      ["a folder","a shelf"]],
    ["What do we keep files tidy inside?","folders",["boxes","drawers"]],
    ["What must you do before closing your work?","save it",
      ["delete it","print it"]],
    ["What can happen if you do not save your work?","it can be lost",
      ["it prints itself","it saves anyway"]],
    ["Where does a deleted file go first?","the recycle bin",
      ["the printer","the internet"]],
    ["What do the letters at the end of a file's name tell you?",
      "what kind of file it is",["who made it","how big the screen is"]]
  ], "folder"],
  4: ["The internet", [
    ["What do we call a page you visit on the internet?","a website",
      ["a bookshelf","a postcard"]],
    ["What do you use to look something up on the internet?","a search engine",
      ["a steam engine","a fire engine"]],
    ["What connects a tablet to the internet without any wires?","wi-fi",
      ["glue","a pencil"]],
    ["What is an email?","a message sent over the internet",
      ["a paper letter","a phone call"]],
    ["What do we call the address of a website?","a URL",["an RSVP","a USB"]],
    ["Is everything you read on the internet true?","no, it has to be checked",
      ["yes, always","only on Mondays"]]
  ], "wifi"],
  5: ["Staying safe", [
    ["What makes a good password?","one that is long and hard to guess",
      ["your own name","1234"]],
    ["Who should you tell your password to?","nobody except your parents",
      ["your friends","anyone who asks"]],
    ["What should you do if a stranger messages you online?","tell a grown-up",
      ["reply to them","send them a photo"]],
    ["Should you put your home address on a website?","no, never",
      ["yes, always","only at night"]],
    ["What do we call a message that tries to trick you out of your password?",
      "phishing",["fishing","flossing"]],
    ["If something online upsets you, what is the first thing to do?",
      "close it and tell someone",["keep watching it","send it to a friend"]]
  ], "padlock"],
  6: ["Coding", [
    ["What do we call a list of instructions for a computer?","a program",
      ["a poem","a picture"]],
    ["Does a computer do what you meant or what you said?","exactly what you said",
      ["what you meant","whatever it likes"]],
    ["What do we call a mistake in a program?","a bug",["a beetle","a blob"]],
    ["What do we call hunting those mistakes down?","debugging",
      ["defrosting","deleting"]],
    ["What do we call telling a computer to repeat something?","a loop",
      ["a line","a leap"]],
    ["What does an “if” do in a program?","chooses what happens next",
      ["stops the computer","prints the page"]]
  ], "code"],
  7: ["Inside the machine", [
    ["What is the part that does all the thinking called?","the processor",
      ["the printer","the plug"]],
    ["What does a computer use to hold what it is working on right now?","memory",
      ["the mouse","the monitor"]],
    ["Where are your files kept while the computer is switched off?",
      "on its storage drive",["in the memory","on the screen"]],
    ["What do we call the parts you can actually touch?","hardware",
      ["software","silverware"]],
    ["What do we call the programs?","software",["hardware","homeware"]],
    ["Why do computers have fans inside them?","to keep them cool",
      ["to blow the dust in","to make music"]]
  ], "chip"],
  8: ["Computer numbers", [
    ["How many different digits does a computer count with?","two",
      ["ten","twenty-six"]],
    ["Which two digits are they?","0 and 1",["1 and 2","A and B"]],
    ["What do we call one of those digits?","a bit",["a bat","a byte"]],
    ["How many bits make one byte?","eight",["two","one hundred"]],
    ["What do we call one tiny dot on a screen?","a pixel",
      ["a pickle","a parcel"]],
    ["Which is bigger, a megabyte or a gigabyte?","a gigabyte",
      ["a megabyte","they are the same"]]
  ], "binary"],
  9: ["People and history", [
    ["Who is often called the first computer programmer?","Ada Lovelace",
      ["Alan Turing","Bill Gates"]],
    ["Which British mathematician helped break wartime codes?","Alan Turing",
      ["Isaac Newton","Charles Babbage"]],
    ["Who designed an early mechanical computer with cogs and gears?",
      "Charles Babbage",["Ada Lovelace","Alan Turing"]],
    ["What were the very first electronic computers like?","as big as a whole room",
      ["as small as a watch","completely invisible"]],
    ["What did early computers hold their programs on?","punched cards",
      ["memory sticks","wi-fi"]],
    ["When did computers start appearing in ordinary homes?","in the 1980s",
      ["in the 1500s","last year"]]
  ], "mainframe"],
  10: ["Smart machines", [
    ["What do the letters AI stand for?","artificial intelligence",
      ["automatic internet","artistic imagination"]],
    ["What is a robot?","a machine that can carry out tasks on its own",
      ["a kind of animal","a type of hat"]],
    ["How does a robot find out about the world around it?","with sensors",
      ["with feelings","with dreams"]],
    ["Can a computer be wrong?","yes, it certainly can",
      ["no, never","only on Fridays"]],
    ["What should you do with an answer a computer gives you?",
      "check whether it makes sense",["believe it always","print it out"]],
    ["What can people do that computers cannot?","care about somebody",
      ["add up quickly","store a lot of information"]]
  ], "robot"]
};

/* ==========================================================================
   THREE MORE LANGUAGES — Bahasa Indonesia, 日本語, 한국어.

   NOT curriculum, and nobody at either school teaches these. They are here
   because the boys asked, and because a language ladder is the one kind of
   quiz where knowing nothing at the start is the normal way to begin: rung 1
   is hello and thank you, and every rung after it is six more words.

   Same shape as ZH_LADDER, so all four run off one ladder in training.js:
   each rung is [what the rung is called, [[the word, how it sounds, what it
   means], ...]]. The middle column is a reading, not a translation — romaji
   for Japanese, revised romanisation for Korean — and Indonesian has none
   worth printing, since it is read exactly as it is spelt.

   Every word is ordinary, everyday vocabulary. Where a word is one a child
   would only use to or about particular people, the meaning says so: Korean
   형 is what a boy calls his older brother, and a girl would say 오빠.
   ========================================================================== */
var ID_LADDER = {
  1: ["Halo", [
    ["halo","","hello"],
    ["terima kasih","","thank you"],
    ["selamat pagi","","good morning"],
    ["selamat tinggal","","goodbye"],
    ["ya","","yes"],
    ["tidak","","no"],
    ["selamat malam","","good night"],
    ["selamat siang","","good afternoon"],
    ["maaf","","sorry"],
    ["sama-sama","","you are welcome"]
  ]],
  2: ["Angka", [
    ["satu","","one"],
    ["dua","","two"],
    ["tiga","","three"],
    ["empat","","four"],
    ["lima","","five"],
    ["sepuluh","","ten"],
    ["enam","","six"],
    ["tujuh","","seven"],
    ["delapan","","eight"],
    ["sembilan","","nine"]
  ]],
  3: ["Keluarga", [
    ["ibu","","mother"],
    ["ayah","","father"],
    ["kakak","","older brother or sister"],
    ["adik","","younger brother or sister"],
    ["nenek","","grandmother"],
    ["keluarga","","family"],
    ["kakek","","grandfather"],
    ["anak","","a child"],
    ["paman","","an uncle"],
    ["bibi","","an aunt"]
  ]],
  4: ["Binatang", [
    ["kucing","","a cat"],
    ["anjing","","a dog"],
    ["burung","","a bird"],
    ["ikan","","a fish"],
    ["kuda","","a horse"],
    ["sapi","","a cow"],
    ["ayam","","a chicken"],
    ["bebek","","a duck"],
    ["kelinci","","a rabbit"],
    ["gajah","","an elephant"]
  ]],
  5: ["Makanan", [
    ["nasi","","rice"],
    ["roti","","bread"],
    ["telur","","an egg"],
    ["susu","","milk"],
    ["air","","water"],
    ["sayur","","vegetables"],
    ["buah","","fruit"],
    ["daging","","meat"],
    ["gula","","sugar"],
    ["garam","","salt"]
  ]],
  6: ["Sekolah", [
    ["guru","","a teacher"],
    ["murid","","a pupil"],
    ["buku","","a book"],
    ["sekolah","","a school"],
    ["teman","","a friend"],
    ["pensil","","a pencil"],
    ["kelas","","a classroom"],
    ["kertas","","paper"],
    ["pelajaran","","a lesson"],
    ["papan tulis","","a whiteboard"]
  ]],
  7: ["Tempat", [
    ["rumah","","a house"],
    ["taman","","a park"],
    ["rumah sakit","","a hospital"],
    ["toko","","a shop"],
    ["pasar","","a market"],
    ["perpustakaan","","a library"],
    ["jalan","","a road"],
    ["kantor","","an office"],
    ["bandara","","an airport"],
    ["pantai","","a beach"]
  ]],
  8: ["Waktu", [
    ["hari ini","","today"],
    ["besok","","tomorrow"],
    ["kemarin","","yesterday"],
    ["pagi","","morning"],
    ["malam","","night"],
    ["setiap hari","","every day"],
    ["sekarang","","now"],
    ["nanti","","later"],
    ["minggu","","a week"],
    ["bulan","","a month"]
  ]],
  9: ["Kata kerja", [
    ["makan","","to eat"],
    ["minum","","to drink"],
    ["melihat","","to see"],
    ["pergi","","to go"],
    ["membaca","","to read"],
    ["menulis","","to write"],
    ["bermain","","to play"],
    ["mendengar","","to hear"],
    ["berbicara","","to speak"],
    ["tidur","","to sleep"]
  ]],
  10: ["Kata sifat", [
    ["besar","","big"],
    ["kecil","","small"],
    ["tinggi","","tall"],
    ["baru","","new"],
    ["senang","","happy"],
    ["sulit","","difficult"],
    ["panjang","","long"],
    ["pendek","","short"],
    ["panas","","hot"],
    ["dingin","","cold"]
  ]]
};

var JA_LADDER = {
  1: ["あいさつ", [
    ["こんにちは","konnichiwa","hello"], ["ありがとう","arigatou","thank you"],
    ["おはよう","ohayou","good morning"], ["さようなら","sayounara","goodbye"],
    ["はい","hai","yes"], ["いいえ","iie","no"]
  ]],
  2: ["かず", [
    ["いち","ichi","one"], ["に","ni","two"], ["さん","san","three"],
    ["よん","yon","four"], ["ご","go","five"], ["じゅう","juu","ten"]
  ]],
  3: ["かぞく", [
    ["おかあさん","okaasan","mother"], ["おとうさん","otousan","father"],
    ["あに","ani","my older brother"], ["あね","ane","my older sister"],
    ["おとうと","otouto","my younger brother"], ["かぞく","kazoku","family"]
  ]],
  4: ["どうぶつ", [
    ["ねこ","neko","a cat"], ["いぬ","inu","a dog"], ["とり","tori","a bird"],
    ["さかな","sakana","a fish"], ["うま","uma","a horse"], ["うし","ushi","a cow"]
  ]],
  5: ["たべもの", [
    ["ごはん","gohan","rice, a meal"], ["パン","pan","bread"],
    ["たまご","tamago","an egg"], ["ぎゅうにゅう","gyuunyuu","milk"],
    ["みず","mizu","water"], ["やさい","yasai","vegetables"]
  ]],
  6: ["がっこう", [
    ["せんせい","sensei","a teacher"], ["がくせい","gakusei","a student"],
    ["ほん","hon","a book"], ["がっこう","gakkou","a school"],
    ["ともだち","tomodachi","a friend"], ["えんぴつ","enpitsu","a pencil"]
  ]],
  7: ["ばしょ", [
    ["いえ","ie","a house"], ["こうえん","kouen","a park"],
    ["びょういん","byouin","a hospital"], ["みせ","mise","a shop"],
    ["えき","eki","a station"], ["としょかん","toshokan","a library"]
  ]],
  8: ["じかん", [
    ["きょう","kyou","today"], ["あした","ashita","tomorrow"],
    ["きのう","kinou","yesterday"], ["あさ","asa","morning"],
    ["よる","yoru","night"], ["まいにち","mainichi","every day"]
  ]],
  9: ["どうし", [
    ["たべる","taberu","to eat"], ["のむ","nomu","to drink"],
    ["みる","miru","to see"], ["いく","iku","to go"],
    ["よむ","yomu","to read"], ["かく","kaku","to write"]
  ]],
  10: ["けいようし", [
    ["おおきい","ookii","big"], ["ちいさい","chiisai","small"],
    ["たかい","takai","tall, expensive"], ["あたらしい","atarashii","new"],
    ["たのしい","tanoshii","fun"], ["むずかしい","muzukashii","difficult"]
  ]]
};

var KO_LADDER = {
  1: ["인사", [
    ["안녕하세요","annyeonghaseyo","hello"], ["감사합니다","gamsahamnida","thank you"],
    ["안녕히 가세요","annyeonghi gaseyo","goodbye"], ["네","ne","yes"],
    ["아니요","aniyo","no"], ["미안해요","mianhaeyo","sorry"]
  ]],
  2: ["숫자", [
    ["하나","hana","one"], ["둘","dul","two"], ["셋","set","three"],
    ["넷","net","four"], ["다섯","daseot","five"], ["열","yeol","ten"]
  ]],
  3: ["가족", [
    ["어머니","eomeoni","mother"], ["아버지","abeoji","father"],
    ["형","hyeong","a boy's older brother"], ["누나","nuna","a boy's older sister"],
    ["동생","dongsaeng","younger brother or sister"], ["가족","gajok","family"]
  ]],
  4: ["동물", [
    ["고양이","goyangi","a cat"], ["개","gae","a dog"], ["새","sae","a bird"],
    ["물고기","mulgogi","a fish"], ["말","mal","a horse"], ["소","so","a cow"]
  ]],
  5: ["음식", [
    ["밥","bap","rice, a meal"], ["빵","ppang","bread"], ["계란","gyeran","an egg"],
    ["우유","uyu","milk"], ["물","mul","water"], ["김치","gimchi","kimchi"]
  ]],
  6: ["학교", [
    ["선생님","seonsaengnim","a teacher"], ["학생","haksaeng","a student"],
    ["책","chaek","a book"], ["학교","hakgyo","a school"],
    ["친구","chingu","a friend"], ["연필","yeonpil","a pencil"]
  ]],
  7: ["장소", [
    ["집","jip","a house"], ["공원","gongwon","a park"],
    ["병원","byeongwon","a hospital"], ["가게","gage","a shop"],
    ["역","yeok","a station"], ["도서관","doseogwan","a library"]
  ]],
  8: ["시간", [
    ["오늘","oneul","today"], ["내일","naeil","tomorrow"],
    ["어제","eoje","yesterday"], ["아침","achim","morning"],
    ["밤","bam","night"], ["매일","maeil","every day"]
  ]],
  9: ["동사", [
    ["먹다","meokda","to eat"], ["마시다","masida","to drink"],
    ["보다","boda","to see"], ["가다","gada","to go"],
    ["읽다","ikda","to read"], ["쓰다","sseuda","to write"]
  ]],
  10: ["형용사", [
    ["크다","keuda","big"], ["작다","jakda","small"],
    ["높다","nopda","high"], ["새롭다","saeropda","new"],
    ["재미있다","jaemiitda","fun"], ["어렵다","eoryeopda","difficult"]
  ]]
};

/* Tagalog, the fifth language and the one the boys hear most often outside the
   house. Same shape and the same ten rungs as the other three, and like Bahasa
   it is read as it is spelt, so the middle column is empty. */
var TL_LADDER = {
  1: ["Pagbati", [
    ["kumusta","","hello"], ["salamat","","thank you"],
    ["magandang umaga","","good morning"], ["paalam","","goodbye"],
    ["oo","","yes"], ["hindi","","no"]
  ]],
  2: ["Mga numero", [
    ["isa","","one"], ["dalawa","","two"], ["tatlo","","three"],
    ["apat","","four"], ["lima","","five"], ["sampu","","ten"]
  ]],
  3: ["Pamilya", [
    ["nanay","","mother"], ["tatay","","father"],
    ["kuya","","older brother"], ["ate","","older sister"],
    ["kapatid","","a brother or sister"], ["pamilya","","family"]
  ]],
  4: ["Mga hayop", [
    ["pusa","","a cat"], ["aso","","a dog"], ["ibon","","a bird"],
    ["isda","","a fish"], ["kabayo","","a horse"], ["baka","","a cow"]
  ]],
  5: ["Pagkain", [
    ["kanin","","rice"], ["tinapay","","bread"], ["itlog","","an egg"],
    ["gatas","","milk"], ["tubig","","water"], ["gulay","","vegetables"]
  ]],
  6: ["Paaralan", [
    ["guro","","a teacher"], ["mag-aaral","","a pupil"], ["libro","","a book"],
    ["paaralan","","a school"], ["kaibigan","","a friend"], ["lapis","","a pencil"]
  ]],
  7: ["Mga lugar", [
    ["bahay","","a house"], ["parke","","a park"], ["ospital","","a hospital"],
    ["tindahan","","a shop"], ["palengke","","a market"], ["aklatan","","a library"]
  ]],
  8: ["Oras", [
    ["ngayon","","today"], ["bukas","","tomorrow"], ["kahapon","","yesterday"],
    ["umaga","","morning"], ["gabi","","night"], ["araw-araw","","every day"]
  ]],
  9: ["Mga pandiwa", [
    ["kumain","","to eat"], ["uminom","","to drink"], ["matulog","","to sleep"],
    ["pumunta","","to go"], ["magbasa","","to read"], ["magsulat","","to write"]
  ]],
  10: ["Mga pang-uri", [
    ["malaki","","big"], ["maliit","","small"], ["mataas","","tall"],
    ["bago","","new"], ["masaya","","happy"], ["mahirap","","difficult"]
  ]]
};

/* ==========================================================================
   FUN — the songs the boys want the words to.

   The words are NOT in here and will not be. "Soda Pop" and "Revolting
   Children" are somebody's copyright — Tim Minchin's in one case and the
   film's in the other — and a home-school app is not a lyrics site. What is
   here is the title, who it is by, and a link that opens a search for the
   official video. The words go in on the device, typed or pasted by whoever
   has a copy of them, and they are kept in `lyr:<id>` rather than in the song
   record: mergeSeed() replaces a seeded record whenever data.js changes it,
   so anything the family typed into one would be wiped by the next release.

   Nothing here syncs, the same way meals and the scene do not. A song pasted
   on TC's iPad stays on TC's iPad, and the panel says so on screen.

   Give any song added here a fresh id. Deleting a seeded one records it in
   `seedgone` like every other seeded list, so it stays deleted.
   ========================================================================== */
var SEED_SONGS = [
  /* The songs they are actually singing. None of them carries its words and
     none of them will: every one is in copyright, and a home-school app is not
     a lyrics site. The ▶ searches for the song; the words go in on the device,
     through "Add the words", and live in `lyr:<id>` on that iPad alone. */
  {id:"sg1", t:"Soda Pop",           w:"Saja Boys · KPop Demon Hunters"},
  {id:"sg9", t:"Zoo",                w:"Shakira · Zootopia 2"},
  {id:"sg8", t:"Try Everything",     w:"Shakira · Zootopia"},
  {id:"sg2", t:"Revolting Children", w:"Matilda the Musical · Tim Minchin"}

  /* sg3 to sg7 were five traditional nursery rhymes, shipped with their words
     because they are old enough to belong to nobody, and put here for SC to
     practise reading on — a boy of five decoding what he already knows by
     heart. He is six now and reads, so they have gone: a screen of rhymes he
     has outgrown is a screen he stops opening. Their ids are retired and must
     not be reused. Taking them out of data.js only stops them reaching a fresh
     install — on the iPads that already have them it is Remove this song,
     once each, which tombstones them in `seedgone` like any other deletion. */
];

/* ==========================================================================
   BERRIES 高华 — 看图作文, the composition sheets TC brings home.

   What is here and what is not. The 参考词语 are his sheet's own list, the way
   TC_TINGXIE holds the school's 听写 lists: eight words off P2-L34-高华-PG1,
   and a word list is the thing a boy has to know by Friday.

   The 好句 pairs are NOT off the sheet. Berries' own "哪一句比较生动" pairs are
   their copyright and they stay on the paper he ticked them on; these are
   written for this app about the same four pictures, using the same 好词 the
   model answers use — 眼前一亮, 狼吞虎咽, 兴高采烈, 皱起眉头, 红着脸. The skill
   is the same one: plain sentence on one side, the same thing said properly on
   the other, and he picks. Nothing is gained by copying their sentences in,
   and he has already ticked those.

   The 结构 questions are the shape of the sheet — 开头法: 人物, 结尾法: 做了错事,
   and which picture belongs in which paragraph. That is a method, not a text.

   A part is passed at BE_PASS or better, and the screen says 通过 or 再做一次.
   That number is mine, not the school's: nobody marks these out of ten, but
   "have another go" needs a line somewhere and 80% is where a P2 boy has shown
   he knows the words rather than half of them.
   ========================================================================== */
var BE_PASS = 0.8;
var BERRIES = [
{
  id:"L34", who:"tc", sheet:"P2-L34-高华",
  t:"第三十四课：看图作文", theme:"知错能改",
  open:"人物", end:"做了错事",
  /* The four pictures, said plainly, so the screen can put the story in order
     without reprinting the sheet. */
  steps:[
    "文华和朋友在操场上踢球。",
    "回到家后，他看到桌子上的蛋糕，手也不洗就吃了起来。",
    "晚上，他肚子很痛，捂着肚子哭着告诉妈妈。",
    "妈妈带他到诊所，医生检查后告诉他为什么会肚子痛。"
  ],
  /* 参考词语, off the sheet. [word, pinyin, what it means, the sentence it is
     practised in with the word left out] */
  words:[
    ["操场","cāochǎng","the school field","一天下午，文华和朋友在□□上踢球。"],
    ["踢球","tī qiú","to play football","他们在操场上□□，玩得兴高采烈。"],
    ["蛋糕","dàngāo","cake","回到家后，他看到桌子上放着几块□□。"],
    ["口水直流","kǒushuǐ zhí liú","mouth watering","他眼前一亮，顿时□□□□。"],
    ["肚子痛","dùzi tòng","stomach ache","晚上，文华觉得□□□得厉害。"],
    ["捂着肚子","wǔzhe dùzi","holding his tummy","他弯下腰，□□□□，哭着叫妈妈。"],
    ["诊所","zhěnsuǒ","the clinic","妈妈连忙带他到□□去。"],
    ["检查","jiǎnchá","to examine","医生给他□□后说，他的手太脏了。"]
  ],
  /* 好句: the flat one and the lively one. Written for this app — see above. */
  good:[
    ["文华和朋友在操场上踢球。",
     "文华和朋友在操场上踢球，玩得兴高采烈。",
     "兴高采烈 说出他们有多开心。"],
    ["文华看到桌子上的蛋糕，很想吃。",
     "文华看到桌子上的蛋糕，眼前一亮，口水直流。",
     "眼前一亮、口水直流 让人看见他的样子。"],
    ["他拿起蛋糕就吃了起来。",
     "他手也不洗，拿起蛋糕就狼吞虎咽地吃了起来。",
     "狼吞虎咽 写出他吃得多急，也点出他没洗手。"],
    ["晚上，文华的肚子很痛。",
     "晚上，文华痛得皱起眉头，弯下腰，捂着肚子。",
     "皱起眉头、弯下腰、捂着肚子 是三个动作，比“很痛”清楚。"],
    ["妈妈很担心，带他去诊所。",
     "妈妈听了，连忙放下手里的东西，带他到诊所去。",
     "连忙 写出妈妈有多急。"],
    ["文华知道错了，对妈妈说对不起。",
     "文华红着脸，低下头，羞愧地对妈妈说：“对不起，让您担心了。”",
     "红着脸、低下头 让人看得出他真的知道错了。"]
  ],
  /* 结构: the shape of the sheet, and where each picture goes. */
  frame:[
    ["这篇看图作文的主题是什么？", "知错能改", ["助人为乐","勤劳节俭"],
     "他做错了事，后来知道错，还改了。"],
    ["开头用的是哪一种开头法？", "人物开头法", ["天气开头法","对话开头法"],
     "开头先介绍文华这个人：XX今年八岁……"],
    ["结尾用的是哪一种结尾法？", "做了错事", ["快乐的一天","一次比赛"],
     "结尾写他以后再也不这样做了：从此以后，XX……"],
    ["第一段应该写哪一幅图？", "文华和朋友在操场上踢球。",
     ["晚上，他肚子很痛。","妈妈带他到诊所。"], "一天下午……"],
    ["第二段应该写哪一幅图？", "回到家后，他看到蛋糕，手也不洗就吃了起来。",
     ["医生给他检查。","他和朋友在踢球。"], "回到家后……"],
    ["最后一段最适合怎么写？", "从此以后，文华再也不敢不洗手就吃东西了。",
     ["从此以后，文华每天都去操场踢球。","从此以后，文华最喜欢吃蛋糕。"],
     "结尾要写他改了什么。"]
  ]
}
];
