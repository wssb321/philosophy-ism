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
    ...make('po1','collective-market',['关键生产资源由共同体所有更能保障公平。','基本公共服务不应主要由利润动机决定。','劳动者共同参与企业所有权有助于减少支配关系。','重要资源的收益应更广泛地归全体成员共享。'],['私人产权通常能为长期投入提供清晰激励。','竞争性市场比集中配置更能回应多样需求。','价格信号通常是协调稀缺资源的有效方式。','允许个人积累和投资有助于推动创新。']),
    ...make('po2','state-anarchy',['稳定社会需要拥有充分执行能力的公共权威。','统一规则有助于在大规模社会中保障可预期性。','公共机构应有能力协调跨地区的长期项目。','维护基本权利需要能够执行裁决的制度中心。'],['社会秩序可以更多依靠自愿协作与地方自治。','集中权力本身容易形成持续的支配关系。','许多公共事务可以由互助组织而非国家处理。','制度应尽量减少任何主体对他人的强制权限。']),
    ...make('po3','equality-tradition',['制度应主动缩小由出身造成的长期差异。','实质机会平等需要对资源分配进行公共调整。','过大的社会差距会削弱成员之间的平等地位。','公共政策应优先改善处境最不利者的机会。'],['长期形成的社会规范通常包含难以替代的经验。','制度改变应保持渐进，以避免破坏既有合作基础。','稳定角色与责任结构能为共同生活提供连续性。','传统安排在被替换前应获得审慎理解。']),
    ...make('po4','collective-individual',['个人选择应考虑其对共同生活条件的长期影响。','社会成员对维持公共制度负有相互责任。','某些共同目标可以合理限制纯粹个人便利。','评价制度时应关注群体能否共同获得基本保障。'],['个人应拥有广泛空间选择自己的生活方式。','集体目标不能轻易越过个人基本权利边界。','只要不侵犯他人，个人决定通常不需公共批准。','制度的首要任务之一是保护少数人与不同生活选择。']),
    ...make('po5','ecology-growth',['经济活动应受生态承载边界的严格约束。','代际公平要求为未来保留足够自然条件。','无法恢复的环境损失不应被短期收益抵消。','衡量发展应包含生态稳定而不只看产出增加。'],['持续经济增长能扩大社会解决问题的资源。','技术创新可以在增长中逐步降低环境压力。','发展不足带来的现实需求应优先得到满足。','只要成本被计入，市场与技术可协调增长和环境目标。']),
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

