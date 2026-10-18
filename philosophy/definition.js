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
    q('p01','每个人都有一些先于选择而存在的核心特征。','essence-create',-1),q('p02','一个人主要通过持续选择成为他自己。','essence-create',1),q('p03','理想生活在很大程度上取决于实现人的共同本性。','essence-create',-1),q('p04','身份应当允许随经历和承诺不断重写。','essence-create',1),q('p05','理解自己首先是发现内在稳定的倾向。','essence-create',-1),q('p06','没有任何单一标签能预先决定一个人应该成为什么。','essence-create',1),
    q('p07','人生存在某些不依赖个人偏好的客观目的。','objective-open',-1),q('p08','意义更多来自我们赋予经历的解释。','objective-open',1),q('p09','有些生活方式本身就比另一些更接近真正的圆满。','objective-open',-1),q('p10','不同人生可以在没有共同终极目的时仍然有意义。','objective-open',1),q('p11','价值需要某种超越个人选择的根据。','objective-open',-1),q('p12','意义可以在行动、关系与创造中逐步形成。','objective-open',1),
    q('p13','平静常来自接受自己无法控制的条件。','accept-transform',-1),q('p14','即使结构稳定，我也愿意寻找改变它的实际路径。','accept-transform',1),q('p15','把精力集中在自身判断和行动上通常更明智。','accept-transform',-1),q('p16','不合理的处境值得通过集体或个人行动重新塑造。','accept-transform',1),q('p17','与其要求世界符合期待，不如调整自己的回应。','accept-transform',-1),q('p18','人的尊严也体现在拒绝被动接受既有安排。','accept-transform',1),
    q('p19','即使结果不理想，坚持正确原则仍有独立价值。','ideal-practical',-1),q('p20','观念的价值需要在它带来的实际差异中检验。','ideal-practical',1),q('p21','行动首先应符合一套能够普遍说明的理想。','ideal-practical',-1),q('p22','面对新证据时，规则和方案都应允许修订。','ideal-practical',1),q('p23','妥协会削弱某些不应放弃的价值。','ideal-practical',-1),q('p24','可行的渐进改善有时比纯粹方案更值得选择。','ideal-practical',1),
    q('p25','社会位置和历史条件深刻限定个人的生活可能。','condition-agency',-1),q('p26','即使条件有限，个人选择仍能形成关键差异。','condition-agency',1),q('p27','理解一个人的决定必须先理解他所处的环境。','condition-agency',-1),q('p28','人应为自己在限制中能够做出的选择负责。','condition-agency',1),q('p29','许多人生走向更多由机会结构而非意志决定。','condition-agency',-1),q('p30','持续的小行动能够扩展原本有限的选择空间。','condition-agency',1),
    q('p31','跨越不同阶段，我仍希望保持一个连贯稳定的自我。','stable-becoming',-1),q('p32','随情境改变观点不必被视为背离真实自我。','stable-becoming',1),q('p33','长期承诺为人生提供不可轻易替换的连续性。','stable-becoming',-1),q('p34','自我更像不断生成的过程，而不是固定内核。','stable-becoming',1),q('p35','一致的原则有助于人在变化中保持方向。','stable-becoming',-1),q('p36','新的关系与经验可以合理改变一个人的核心计划。','stable-becoming',1),
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

