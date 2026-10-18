const make=(prefix,axis,low,high)=>[...low.map((text,i)=>({id:`${prefix}${i+1}`,text,effects:{[axis]:-1}})),...high.map((text,i)=>({id:`${prefix}${i+6}`,text,effects:{[axis]:1}}))];
export const ETHICS_TEST={
  id:'ethics',version:1,title:'道德伦理哲学测试',description:'通过日常与抽象思想实验观察你的伦理判断侧重。',
  dimensions:[
    {id:'consequence-duty',name:'判断焦点',low:'结果主义',high:'义务论',description:'更重视行动后果还是行为原则与义务。'},
    {id:'welfare-rights',name:'价值范围',low:'集体福祉优先',high:'个体权利优先',description:'总体利益与个人边界冲突时如何权衡。'},
    {id:'virtue-rule',name:'伦理中心',low:'德性品格优先',high:'规则优先',description:'更重视行动者品格还是可普遍说明的规则。'},
    {id:'universal-care',name:'道德语境',low:'普世道德',high:'情境关怀道德',description:'更重视普遍标准还是具体关系与需要。'},
  ],
  questions:[
    ...make('e1','consequence-duty',['如果一种做法持续带来更好结果，就应认真考虑修改原有规则。','判断选择是否合适时，实际影响比最初动机更重要。','两个方案都无完美结果时，应选择总体损失更小者。','制度评价应主要看它长期改善了多少人的生活。','善意但反复造成不良后果的做法需要被重新评价。'],['有些行为即使能带来好结果，也不应成为可接受手段。','能否把行动原则一贯地用于所有人，是重要道德检验。','履行承诺具有不依赖便利结果的价值。','一个人不应为了改善结果而故意误导他人。','行动者有义务尊重自己已经承认的正当规则。']),
    ...make('e2','welfare-rights',['公共安排应优先让整体生活条件得到最大改善。','少量个人便利可以为显著公共收益作出让步。','有限资源应投向能产生最多总体帮助的方案。','评价政策时，受益与受影响人数是重要依据。','共同体的基本运转有时需要成员承担公平份额。'],['个人基本权利不应仅因多数人受益而被越过。','即使效率较低，也应为每个人保留拒绝参与的空间。','不能把少数人的重要利益简单折算为总体数字。','公共目标必须受到个人尊严与边界的限制。','公平程序应保护不受欢迎但不侵犯他人的选择。']),
    ...make('e3','virtue-rule',['真正诚实的人不只是在规则要求时才说实话。','培养判断力比记住大量具体规则更能应对新情境。','评价行动时，也应看它体现了怎样的品格。','持续练习勇气、节制和公正会改善道德判断。','好榜样对伦理成长的作用不亚于规则说明。'],['清晰规则有助于让相似情况得到一致对待。','不能只凭对行动者品格的印象决定行为是否合适。','公开可检验的规则能减少偏袒与随意判断。','遇到利益冲突时，明确义务比个人直觉更可靠。','如果例外无法被一致说明，就不宜只因好意而允许。']),
    ...make('e4','universal-care',['相似处境原则上应适用相同的道德标准。','基本尊重不应随亲疏关系而改变。','一个规则如果不能合理适用于所有人，就值得怀疑。','公正要求判断时暂时放下个人关系偏好。','道德理由应能向任何受影响者公开说明。'],['照料长期依赖关系时，具体需要比抽象一致性更重要。','对亲近者承担的责任可以不同于对陌生人的责任。','同一规则可能需要根据脆弱程度作出不同回应。','理解当事人的故事和关系是道德判断的一部分。','关怀不仅是情感，也包括持续回应具体需要的实践。']),
  ],
  ideologies:[
    {id:'utilitarianism',name:'功利主义',lexiconId:'utilitarianism',description:'以总体福祉和行动后果评价选择。',scores:{'consequence-duty':8,'welfare-rights':12,'virtue-rule':55,'universal-care':32}},
    {id:'kantian-deontology',name:'康德义务论',lexiconId:'deontology',description:'强调可普遍化的原则、义务与对人的尊重。',scores:{'consequence-duty':94,'welfare-rights':88,'virtue-rule':88,'universal-care':10}},
    {id:'virtue-ethics',name:'德性伦理学',lexiconId:'virtue-ethics',description:'以品格、德性、实践智慧与良好生活为中心。',scores:{'consequence-duty':46,'welfare-rights':48,'virtue-rule':6,'universal-care':45}},
    {id:'care-ethics',name:'关怀伦理学',lexiconId:'care-ethics',description:'强调关系、依赖、处境与回应具体需要。',scores:{'consequence-duty':42,'welfare-rights':52,'virtue-rule':28,'universal-care':96}},
  ],
};

