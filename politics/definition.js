const make=(prefix,axis,low,high)=>[...low.map((text,i)=>({id:`${prefix}${i+1}`,text,effects:{[axis]:-1}})),...high.map((text,i)=>({id:`${prefix}${i+5}`,text,effects:{[axis]:1}}))];
export const POLITICS_TEST={
  id:'politics',version:1,title:'政治理念测试',description:'只讨论抽象政治哲学原则，不涉及国家、政党、人物或现实事件。',
  dimensions:[
    {id:'collective-market',name:'经济所有',low:'集体所有制',high:'自由市场私有制',description:'生产资源更适合共同所有还是私人所有与市场配置。'},
    {id:'state-anarchy',name:'政治权威',low:'强国家',high:'无国家',description:'公共秩序更依赖集中权威还是自愿自治。'},
    {id:'equality-tradition',name:'社会秩序',low:'社会平等',high:'传统秩序',description:'制度更优先缩小差异还是维持传承与连续性。'},
    {id:'collective-individual',name:'价值主体',low:'集体优先',high:'个体优先',description:'共同目标与个人选择发生张力时如何排序。'},
    {id:'ecology-growth',name:'发展目标',low:'生态优先',high:'经济增长优先',description:'长期生态边界与当期经济扩张如何权衡。'},
  ],
  questions:[
    ...make('po1','collective-market',['重要的生产资源由大家共同拥有，更能保证公平。','学校、医疗等基本公共服务，不该主要以赚钱为目标。','让员工共同拥有企业的一部分，更能减少老板对员工的控制。','重要资源赚到的钱，应该让所有人更广泛地分享。'],['私人拥有财产，通常更能鼓励人们长期投入。','互相竞争的市场，比统一安排更能满足不同人的需要。','用价格变化来调配稀缺资源，通常很有效。','允许个人积累财富和投资，更有利于推动创新。']),
    ...make('po2','state-anarchy',['社会要稳定，需要有执行力足够强的政府。','统一的规则能让大规模社会更稳定、更容易预期。','政府应该有能力协调跨地区、时间很长的大型项目。','要保护基本权利，需要一个能真正执行裁决的公共机构。'],['社会秩序可以更多依靠人们自愿合作和地方自治。','权力过于集中，很容易长期控制和压迫别人。','很多公共事务不一定要由国家处理，互助组织也能完成。','制度应该尽量减少任何人强迫别人的权力。']),
    ...make('po3','equality-tradition',['制度应该主动减少家庭出身带来的长期差距。','要让每个人真的有差不多的机会，政府需要调整资源分配。','贫富和地位差距太大，会让人们难以平等相处。','公共政策应该优先帮助处境最差的人获得更多机会。'],['长期形成的社会传统，通常包含很多不容易替代的经验。','制度改革应该一步步来，避免破坏原有的合作关系。','清楚稳定的社会角色和责任，能让共同生活延续下去。','想替换一种传统做法前，应该先认真理解它为什么存在。']),
    ...make('po4','collective-individual',['个人做选择时，应该考虑它会不会长期影响大家的生活。','每个人都有责任一起维护公共制度。','为了共同目标，可以适当限制个人的一些便利。','判断一个制度好不好，要看大家能不能都得到基本保障。'],['每个人都应该有很大的空间选择自己想过的生活。','不能为了集体目标，就轻易侵犯个人的基本权利。','只要不伤害别人，个人决定通常不需要社会批准。','制度的一项重要任务，是保护少数人和不同的生活方式。']),
    ...make('po5','ecology-growth',['经济发展不能超过环境能够承受的限度。','为了下一代，我们应该留下足够好的自然环境。','不能用短期利益来抵消无法挽回的环境破坏。','衡量发展不能只看经济产出，还要看生态是否稳定。'],['经济持续增长，能让社会有更多资源解决问题。','靠技术进步，我们可以一边发展经济，一边逐步减轻环境压力。','发展不足带来的现实生活问题，应该先解决。','只要把环境代价算进去，市场和技术就能兼顾发展与环保。']),
  ],
  ideologies:[
    {id:'communism',name:'共产主义',lexiconId:'communism',description:'强调共同所有、阶级平等与集体福祉。',scores:{'collective-market':5,'state-anarchy':35,'equality-tradition':8,'collective-individual':15,'ecology-growth':35}},
    {id:'capitalism',name:'资本主义',lexiconId:'capitalism',description:'强调私人产权、市场交换与资本投入。',scores:{'collective-market':92,'state-anarchy':48,'equality-tradition':55,'collective-individual':72,'ecology-growth':82}},
    {id:'social-democracy',name:'社会民主主义',lexiconId:'social-democracy',description:'在市场经济框架中通过民主制度、社会保障和调节追求公平。',scores:{'collective-market':58,'state-anarchy':35,'equality-tradition':22,'collective-individual':45,'ecology-growth':35}},
    {id:'democratic-socialism',name:'民主社会主义',lexiconId:'democratic-socialism',description:'通过民主方式推动经济所有权与生产关系的社会主义转型。',scores:{'collective-market':22,'state-anarchy':38,'equality-tradition':15,'collective-individual':35,'ecology-growth':28}},
    {id:'conservatism',name:'保守主义',lexiconId:'conservatism',description:'重视传统、秩序、连续性与渐进改变。',scores:{'collective-market':72,'state-anarchy':28,'equality-tradition':86,'collective-individual':55,'ecology-growth':68}},
    {id:'classical-liberalism',name:'古典自由主义',lexiconId:'classical-liberalism',description:'强调个人自由、法治、有限政府与市场交换。',scores:{'collective-market':86,'state-anarchy':65,'equality-tradition':58,'collective-individual':86,'ecology-growth':72}},
    {id:'libertarianism',name:'自由意志主义',lexiconId:'libertarianism',description:'将个人自由和自愿交往置于政治价值核心。',scores:{'collective-market':95,'state-anarchy':82,'equality-tradition':52,'collective-individual':96,'ecology-growth':78}},
    {id:'anarchism',name:'无政府主义',lexiconId:'anarchism',description:'质疑强制等级，以自治与自愿协作组织公共生活。',scores:{'collective-market':55,'state-anarchy':98,'equality-tradition':20,'collective-individual':72,'ecology-growth':30}},
    {id:'anarcho-communism',name:'无政府共产主义',lexiconId:'anarcho-communism',description:'结合无国家自治与共同所有、按需协作。',scores:{'collective-market':4,'state-anarchy':98,'equality-tradition':5,'collective-individual':30,'ecology-growth':20}},
  ],
};

