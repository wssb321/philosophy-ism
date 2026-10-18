export function validateTestDefinition(definition) {
  const errors = [];
  if (!definition || typeof definition !== 'object') return ['测试定义必须是对象'];
  const dimensions = Array.isArray(definition.dimensions) ? definition.dimensions : [];
  const questions = Array.isArray(definition.questions) ? definition.questions : [];
  const ideologies = Array.isArray(definition.ideologies) ? definition.ideologies : [];
  const dimensionIds = new Set(dimensions.map((item) => item.id));
  const seenQuestions = new Set();

  for (const question of questions) {
    if (seenQuestions.has(question.id)) errors.push(`题目 ID 重复：${question.id}`);
    seenQuestions.add(question.id);
    for (const [dimensionId, weight] of Object.entries(question.effects ?? {})) {
      if (!dimensionIds.has(dimensionId)) errors.push(`题目 ${question.id} 使用未知维度：${dimensionId}`);
      if (!Number.isFinite(weight) || weight === 0) errors.push(`题目 ${question.id} 的权重必须是非零数值`);
    }
    if (!Object.keys(question.effects ?? {}).length) errors.push(`题目 ${question.id} 缺少维度权重`);
  }

  for (const ideology of ideologies) {
    for (const dimensionId of dimensionIds) {
      if (!Number.isFinite(ideology.scores?.[dimensionId])) errors.push(`流派 ${ideology.id} 缺少维度：${dimensionId}`);
    }
  }
  return errors;
}

