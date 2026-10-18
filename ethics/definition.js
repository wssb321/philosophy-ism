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
    ...make('e1','consequence-duty',['如果一种做法一直效果更好，就该考虑改掉原来的规则。','判断一个选择好不好，实际造成的影响比出发点更重要。','两个方案都不完美时，应该选总体伤害更小的那个。','判断一项制度好不好，主要看它长期改善了多少人的生活。','出发点虽好却总带来坏结果，这种做法就该重新考虑。'],['有些事就算结果好，也不能拿来当手段。','判断一种做法是否道德，要看同样的原则能不能用于所有人。','遵守承诺本身就有价值，不该只看是否方便。','不能为了得到更好结果而故意骗别人。','一个人有责任遵守自己认可的正当规则。']),
    ...make('e2','welfare-rights',['公共政策应该优先让尽可能多的人生活得更好。','如果能带来很大的公共利益，个人可以让出一点便利。','资源有限时，应该选择能帮助最多人的方案。','判断一项政策时，受益和受影响的人数很重要。','为了社会正常运转，每个人有时都该公平地承担一份责任。'],['即使能让大多数人受益，也不能侵犯个人的基本权利。','即使效率低一点，也应该让每个人有权说“不”。','不能为了多数人的利益，就忽视少数人的重要利益。','追求公共利益时，也不能侵犯个人尊严和私人边界。','即使一种选择不受欢迎，只要不伤害别人，公平的制度也该保护它。']),
    ...make('e3','virtue-rule',['真正诚实的人，不会只在规则要求时才说实话。','遇到新情况时，自己的判断力比死记规则更有用。','判断一件事时，也要看它反映出这个人怎样的品格。','经常练习勇敢、克制和公正，能让人更会分辨是非。','好榜样对培养品德的作用，不比讲规则小。'],['明确的规则能让相似的情况得到同样处理。','不能只凭对一个人人品的印象，判断他的行为对不对。','大家都能检查的公开规则，可以减少偏心和随意判断。','遇到利益冲突时，明确的责任比个人感觉更可靠。','如果一个例外不能同样适用于别人，就不该只因好意而允许。']),
    ...make('e4','universal-care',['情况差不多，就应该用同样的道德标准。','对人的基本尊重，不该因为亲疏远近而改变。','一种规则如果不能公平地用于每个人，就应该怀疑它。','要做到公正，判断时应该暂时放下对亲近之人的偏爱。','做出道德决定的理由，应该能公开向所有受影响的人解释。'],['照顾长期依赖我们的人时，他们真正需要什么比一视同仁更重要。','我们对亲近的人，可以比对陌生人承担更多责任。','面对更脆弱的人，同一条规则也可以灵活处理。','做道德判断时，也要了解当事人的经历和人际关系。','关心一个人不只是心里在乎，还要长期回应他的实际需要。']),
  ],
  ideologies:[
    {id:'utilitarianism',name:'功利主义',lexiconId:'utilitarianism',description:'以总体福祉和行动后果评价选择。',scores:{'consequence-duty':8,'welfare-rights':12,'virtue-rule':55,'universal-care':32}},
    {id:'kantian-deontology',name:'康德义务论',lexiconId:'deontology',description:'强调可普遍化的原则、义务与对人的尊重。',scores:{'consequence-duty':94,'welfare-rights':88,'virtue-rule':88,'universal-care':10}},
    {id:'virtue-ethics',name:'德性伦理学',lexiconId:'virtue-ethics',description:'以品格、德性、实践智慧与良好生活为中心。',scores:{'consequence-duty':46,'welfare-rights':48,'virtue-rule':6,'universal-care':45}},
    {id:'care-ethics',name:'关怀伦理学',lexiconId:'care-ethics',description:'强调关系、依赖、处境与回应具体需要。',scores:{'consequence-duty':42,'welfare-rights':52,'virtue-rule':28,'universal-care':96}},
  ],
};

