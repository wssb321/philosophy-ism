export function auditCatalog(definition, rules) {
  const errors = [];
  const warnings = [];
  const dimensions = definition.dimensions ?? [];
  const questions = definition.questions ?? [];
  if (questions.length !== rules.questionCount) errors.push(`题量应为 ${rules.questionCount}，实际为 ${questions.length}`);

  const ids = new Set();
  const counts = Object.fromEntries(dimensions.map(({ id }) => [id, { positive: 0, negative: 0 }]));
  for (const question of questions) {
    if (ids.has(question.id)) errors.push(`题目 ID 重复：${question.id}`);
    ids.add(question.id);
    for (const [dimensionId, weight] of Object.entries(question.effects ?? {})) {
      if (!counts[dimensionId]) errors.push(`未知维度：${dimensionId}`);
      else if (weight > 0) counts[dimensionId].positive += 1;
      else if (weight < 0) counts[dimensionId].negative += 1;
    }
    for (const word of rules.forbidden ?? []) {
      if (question.text.includes(word)) errors.push(`题目 ${question.id} 包含禁用词：${word}`);
    }
  }
  for (const [id, count] of Object.entries(counts)) {
    if (!count.positive || !count.negative) errors.push(`维度 ${id} 未同时覆盖两个方向`);
    else if (Math.abs(count.positive - count.negative) > 2) warnings.push(`维度 ${id} 方向题量差异超过 2`);
  }
  for (const ideology of definition.ideologies ?? []) {
    for (const { id } of dimensions) if (!Number.isFinite(ideology.scores?.[id])) errors.push(`流派 ${ideology.id} 坐标缺少 ${id}`);
  }
  return { errors, warnings };
}

