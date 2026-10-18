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
    q('m01','面对明确任务时，我通常先确保每项要求都被准确落实。','task-goal',-1), q('m02','如果原定步骤妨碍目标，我愿意重新设计实现路径。','task-goal',1),
    q('m03','有清晰的完成清单会让我更容易进入状态。','task-goal',-1), q('m04','即使没有详细指引，我也能从预期结果倒推下一步。','task-goal',1),
    q('m05','我更喜欢先确认评价标准，再开始投入工作。','task-goal',-1), q('m06','我会根据现场反馈调整计划，而不坚持最初分工。','task-goal',1),
    q('m07','对于重复任务，稳定遵循流程比临时优化更重要。','task-goal',-1), q('m08','我会主动询问这项工作最终要改变什么。','task-goal',1),
    q('m09','得到可信他人的肯定会显著增强我对决定的把握。','external-internal',-1), q('m10','即使没有人认可，我也会坚持自己充分论证过的选择。','external-internal',1),
    q('m11','公开的评分标准能帮助我判断自己是否做得合适。','external-internal',-1), q('m12','我更在意决定是否符合自己的长期价值。','external-internal',1),
    q('m13','在陌生领域，我会优先参考有经验者的评价。','external-internal',-1), q('m14','面对多种意见时，我会建立自己的判断原则。','external-internal',1),
    q('m15','没有及时反馈时，我容易怀疑自己的推进方向。','external-internal',-1), q('m16','我能在外界意见不一致时保持内部判断的一致。','external-internal',1),
    q('m17','行动前，我希望尽量排除可能造成损失的因素。','risk-trial',-1), q('m18','当成本可控时，我愿意先做小实验再决定。','risk-trial',1),
    q('m19','信息不完整时，我倾向等待更多依据。','risk-trial',-1), q('m20','我能接受第一次尝试主要用于暴露问题。','risk-trial',1),
    q('m21','如果失败代价不明确，我通常选择更稳妥的方案。','risk-trial',-1), q('m22','可逆的错误常能比长时间推演提供更多信息。','risk-trial',1),
    q('m23','我会为关键步骤预留较充分的安全余量。','risk-trial',-1), q('m24','我习惯把大风险拆成多个可以快速检验的小风险。','risk-trial',1),
    q('m25','我喜欢把问题拆成前后清楚的因果步骤。','linear-system',-1), q('m26','我会留意一个改变如何通过反馈影响整个系统。','linear-system',1),
    q('m27','明确主要原因后，我通常集中处理这一原因。','linear-system',-1), q('m28','我常考虑多个因素相互作用后可能出现的新结果。','linear-system',1),
    q('m29','顺序推进能帮助我减少问题中的混乱。','linear-system',-1), q('m30','解决局部问题时，我也会检查它是否把压力转移到别处。','linear-system',1),
  ],
  ideologies: [
    { id:'executor', name:'任务执行者', description:'偏好清晰规则、外部校准和稳健推进，适合标准明确的协作情境。', longDescription:'你倾向把复杂工作转化为可核验的任务，并通过规则、反馈和风险控制保持稳定。这个取向在学习、合规和标准化工作中尤其有价值。', scores:{'task-goal':25,'external-internal':35,'risk-trial':30,'linear-system':35} },
    { id:'autonomous', name:'自主行动者', description:'偏好从目标出发，以内部理由、试验与系统反馈推动行动。', longDescription:'你倾向先理解目标，再自行选择路径，并通过可逆试验和整体反馈修正方案。面对开放问题时，这种取向有助于保持主动性。', scores:{'task-goal':78,'external-internal':78,'risk-trial':76,'linear-system':75} },
    { id:'balanced', name:'平衡型心智', description:'会根据情境在规则与目标、稳健与试错之间切换。', longDescription:'你的回答没有持续偏向单一处理方式。你更可能根据任务成本、信息质量和协作环境选择适合的认知策略。', scores:{'task-goal':50,'external-internal':50,'risk-trial':50,'linear-system':50} },
  ],
};

