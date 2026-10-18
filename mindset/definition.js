const q = (id, text, axis, weight) => ({ id, text, effects: { [axis]: weight } });

export const MINDSET_TEST = {
  id: 'mindset', version: 1, title: '心智认知测试',
  description: '观察你在执行、评价、风险与复杂性方面的认知偏好。',
  notice: '规则任务导向（学生思维倾向）是正常认知偏好，在学习、标准化工作中是优势；各种取向无优劣之分。',
  dimensions: [
    { id: 'task-goal', name: '执行方式', low: '规则任务导向', high: '目标结果导向', description: '你更常从明确步骤还是目标结果组织行动。' },
    { id: 'external-internal', name: '评价来源', low: '外部评价驱动', high: '内部自洽驱动', description: '你更常借助公共标准还是自身理由校准行动。' },
    { id: 'risk-trial', name: '不确定性', low: '风险规避', high: '接纳试错', description: '你更倾向提前降低风险还是通过可逆尝试获得反馈。' },
    { id: 'linear-system', name: '问题模型', low: '线性确定思维', high: '复杂系统思维', description: '你更常使用顺序因果还是关系与反馈理解问题。' },
  ],
  questions: [
    q('m01','有明确任务时，我会先确保每一项要求都做到。','task-goal',-1), q('m02','如果原来的步骤妨碍目标，我愿意换一种做法。','task-goal',1),
    q('m03','有一张清楚的待办清单，我更容易开始做事。','task-goal',-1), q('m04','即使没人告诉我具体怎么做，我也能从目标反推下一步。','task-goal',1),
    q('m05','开始工作前，我更喜欢先弄清楚别人会按什么标准评价。','task-goal',-1), q('m06','我会根据实际情况调整计划，不会死守最初的分工。','task-goal',1),
    q('m07','对重复任务来说，稳定按流程做比临时改进更重要。','task-goal',-1), q('m08','我会主动问：这项工作最后到底要解决什么问题？','task-goal',1),
    q('m09','得到我信任的人的肯定，会让我更相信自己的决定。','external-internal',-1), q('m10','即使没人认同，只要我认真想清楚了，仍会坚持自己的选择。','external-internal',1),
    q('m11','有公开明确的评分标准，我更容易判断自己做得好不好。','external-internal',-1), q('m12','比起别人怎么看，我更在意决定是否符合自己长期看重的事。','external-internal',1),
    q('m13','到了不熟悉的领域，我会先听有经验的人怎么评价。','external-internal',-1), q('m14','意见很多时，我会形成一套自己的判断标准。','external-internal',1),
    q('m15','如果一直得不到反馈，我容易怀疑自己是不是走错方向。','external-internal',-1), q('m16','即使大家说法不一，我也能坚持自己想清楚的判断。','external-internal',1),
    q('m17','动手前，我希望尽量排除可能带来损失的风险。','risk-trial',-1), q('m18','只要成本不高，我愿意先小范围试一试再决定。','risk-trial',1),
    q('m19','信息不够时，我更愿意等到有更多依据再行动。','risk-trial',-1), q('m20','我能接受第一次尝试只是为了早点发现问题。','risk-trial',1),
    q('m21','如果不清楚失败会造成多大损失，我通常会选更稳妥的办法。','risk-trial',-1), q('m22','能改回来的小错误，往往比长时间空想更能帮我了解问题。','risk-trial',1),
    q('m23','重要环节上，我会多留一些时间或资源以防出错。','risk-trial',-1), q('m24','我习惯把一个大风险拆成几个可以快速验证的小风险。','risk-trial',1),
    q('m25','我喜欢把问题拆成前后顺序清楚的原因和结果。','linear-system',-1), q('m26','我会留意一个变化怎样一步步影响整个局面。','linear-system',1),
    q('m27','找到主要原因后，我通常会集中解决它。','linear-system',-1), q('m28','我经常会想，多个因素互相影响后会不会出现意料外的结果。','linear-system',1),
    q('m29','按顺序一步步处理，能让我不被复杂问题搞乱。','linear-system',-1), q('m30','解决眼前问题时，我也会看看是不是把麻烦转移到了别处。','linear-system',1),
  ],
  ideologies: [
    { id:'executor', name:'任务执行者', description:'偏好清晰规则、外部校准和稳健推进，适合标准明确的协作情境。', longDescription:'你倾向把复杂工作转化为可核验的任务，并通过规则、反馈和风险控制保持稳定。这个取向在学习、合规和标准化工作中尤其有价值。', scores:{'task-goal':25,'external-internal':35,'risk-trial':30,'linear-system':35} },
    { id:'autonomous', name:'自主行动者', description:'偏好从目标出发，以内部理由、试验与系统反馈推动行动。', longDescription:'你倾向先理解目标，再自行选择路径，并通过可逆试验和整体反馈修正方案。面对开放问题时，这种取向有助于保持主动性。', scores:{'task-goal':78,'external-internal':78,'risk-trial':76,'linear-system':75} },
    { id:'balanced', name:'平衡型心智', description:'会根据情境在规则与目标、稳健与试错之间切换。', longDescription:'你的回答没有持续偏向单一处理方式。你更可能根据任务成本、信息质量和协作环境选择适合的认知策略。', scores:{'task-goal':50,'external-internal':50,'risk-trial':50,'linear-system':50} },
  ],
};

