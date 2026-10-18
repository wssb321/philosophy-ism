const q = (id, text, axis, weight) => ({ id, text, effects: { [axis]: weight } });

export const PHILOSOPHY_TEST = {
  id:'philosophy', version:1, title:'人生哲学立场测试',
  description:'从六个维度观察你理解意义、行动与人生方向的方式。',
  modelNote:'六条轴是本站用于比较思想倾向的解释模型，不代表这些哲学传统可被完整压缩为固定坐标。',
  dimensions:[
    {id:'essence-create',name:'自我形成',low:'预设本质',high:'自我塑造',description:'人的核心方向更像被发现还是在选择中形成。'},
    {id:'objective-open',name:'意义来源',low:'客观意义',high:'意义开放',description:'人生意义更像客观存在还是持续建构。'},
    {id:'accept-transform',name:'处境态度',low:'接纳秩序',high:'主动改造',description:'面对限制时更重视接纳还是改变。'},
    {id:'ideal-practical',name:'行动依据',low:'原则理想',high:'实践效果',description:'更常依据理想原则还是经验后果判断方案。'},
    {id:'condition-agency',name:'行动空间',low:'外部条件',high:'个体能动',description:'更强调处境结构还是个人选择的作用。'},
    {id:'stable-becoming',name:'自我连续性',low:'稳定一致',high:'情境演变',description:'自我更像稳定核心还是持续变化的过程。'},
  ],
  questions:[
    q('p01','有些特点是我们天生就有的，不是自己选的。','essence-create',-1),q('p02','一个人会在一次次选择中变成现在的自己。','essence-create',1),q('p03','每个人都有一些共同的天性，活出这些天性才能过好一生。','essence-create',-1),q('p04','我们可以随着经历和承诺，重新定义自己。','essence-create',1),q('p05','认识自己，首先要看清那些长期不变的性格和倾向。','essence-create',-1),q('p06','任何标签都不能提前决定一个人该成为什么样。','essence-create',1),
    q('p07','人生有些目标是客观存在的，不由个人喜好决定。','objective-open',-1),q('p08','一段经历有没有意义，主要看我们怎么理解它。','objective-open',1),q('p09','有些活法本身就比另一些活法更好、更圆满。','objective-open',-1),q('p10','即使大家没有共同的人生终点，也都能活得有意义。','objective-open',1),q('p11','什么是对、什么有价值，不能只由个人说了算。','objective-open',-1),q('p12','人生的意义可以在做事、交往和创造中慢慢形成。','objective-open',1),
    q('p13','内心平静，常常来自接受自己改变不了的事。','accept-transform',-1),q('p14','即使一种制度很稳定，我也愿意寻找真正能改变它的办法。','accept-transform',1),q('p15','把精力放在自己能控制的想法和行动上，通常更明智。','accept-transform',-1),q('p16','遇到不合理的环境，我们应该想办法靠个人或集体行动去改变。','accept-transform',1),q('p17','与其要求世界都按我想的来，不如调整自己的态度和做法。','accept-transform',-1),q('p18','不肯被动接受别人安排，也是维护尊严的一种方式。','accept-transform',1),
    q('p19','即使结果不好，坚持正确的原则仍然有价值。','ideal-practical',-1),q('p20','一个想法好不好，要看它在现实中能带来什么变化。','ideal-practical',1),q('p21','做事时，首先应该遵守一套对所有人都适用的原则。','ideal-practical',-1),q('p22','有了新证据，就应该允许修改原来的规则和方案。','ideal-practical',1),q('p23','有些原则不能为了妥协而放弃。','ideal-practical',-1),q('p24','有时，一步步改善现实，比追求完美方案更值得。','ideal-practical',1),
    q('p25','一个人能过怎样的生活，很大程度受社会地位和时代环境限制。','condition-agency',-1),q('p26','就算条件有限，个人选择仍能带来重要改变。','condition-agency',1),q('p27','要理解一个人的决定，得先了解他所处的环境。','condition-agency',-1),q('p28','即使受到限制，人也应该为自己能做的选择负责。','condition-agency',1),q('p29','很多人的人生走向，更多取决于他们得到的机会，而不是意志。','condition-agency',-1),q('p30','持续做一些小事，可以慢慢增加自己能选的路。','condition-agency',1),
    q('p31','不管人生进入哪个阶段，我都希望自己保持前后一致。','stable-becoming',-1),q('p32','随着环境改变想法，不代表背叛真实的自己。','stable-becoming',1),q('p33','长期坚持一件事，能让人生更有连贯性。','stable-becoming',-1),q('p34','人是在不断变化中成为自己的，并没有固定不变的内核。','stable-becoming',1),q('p35','坚持一套稳定的原则，能让我在变化中不迷失方向。','stable-becoming',-1),q('p36','新的关系和经历，可以让人合理地改变人生计划。','stable-becoming',1),
  ],
  ideologies:[
    {id:'existentialism',name:'存在主义',lexiconId:'existentialism',description:'强调具体处境中的自由、选择、责任与意义建构。',scores:{'essence-create':90,'objective-open':80,'accept-transform':65,'ideal-practical':50,'condition-agency':75,'stable-becoming':80}},
    {id:'nihilism',name:'虚无主义',lexiconId:'nihilism',description:'质疑既定价值和终极意义是否具有客观根据。',scores:{'essence-create':65,'objective-open':92,'accept-transform':48,'ideal-practical':58,'condition-agency':45,'stable-becoming':70}},
    {id:'stoicism',name:'斯多葛主义',lexiconId:'stoicism',description:'区分可控与不可控，以德性和理性面对境遇。',scores:{'essence-create':45,'objective-open':32,'accept-transform':18,'ideal-practical':30,'condition-agency':62,'stable-becoming':35}},
    {id:'pragmatism',name:'实用主义',lexiconId:'pragmatism',description:'通过经验、探究与实际后果检验观念。',scores:{'essence-create':70,'objective-open':68,'accept-transform':78,'ideal-practical':92,'condition-agency':72,'stable-becoming':76}},
    {id:'essentialism',name:'本质主义',lexiconId:'essentialism',description:'强调定义、稳定特征与事物的核心性质。',scores:{'essence-create':8,'objective-open':28,'accept-transform':38,'ideal-practical':32,'condition-agency':35,'stable-becoming':12}},
    {id:'idealism',name:'理想主义',lexiconId:'philosophical-idealism',description:'以原则、理想与应然目标审视现实并指引行动。',scores:{'essence-create':42,'objective-open':25,'accept-transform':72,'ideal-practical':8,'condition-agency':68,'stable-becoming':35}},
    {id:'absurdism',name:'荒诞主义',lexiconId:'absurdism',description:'直面意义追寻与世界沉默之间的张力，并继续选择和生活。',scores:{'essence-create':82,'objective-open':88,'accept-transform':58,'ideal-practical':55,'condition-agency':72,'stable-becoming':76}},
    {id:'epicureanism',name:'伊壁鸠鲁主义',lexiconId:'epicureanism',description:'以节制、友谊与免于纷扰的宁静理解良好生活。',scores:{'essence-create':48,'objective-open':48,'accept-transform':22,'ideal-practical':70,'condition-agency':56,'stable-becoming':38}},
    {id:'humanism',name:'人文主义',lexiconId:'humanism',description:'重视人的尊严、理性、教育与共同改善现实的能力。',scores:{'essence-create':72,'objective-open':42,'accept-transform':82,'ideal-practical':54,'condition-agency':82,'stable-becoming':62}},
    {id:'hedonism',name:'享乐主义',lexiconId:'hedonism',description:'把愉悦的获得与痛苦的减少作为生活价值的重要尺度。',scores:{'essence-create':58,'objective-open':66,'accept-transform':42,'ideal-practical':86,'condition-agency':64,'stable-becoming':55}},
  ],
};

