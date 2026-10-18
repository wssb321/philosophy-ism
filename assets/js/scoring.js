const VALID_ANSWERS = new Set([-2, -1, 0, 1, 2]);

function round(value) {
  return Math.round(value * 10) / 10;
}

export function calculateDimensionScores(definition, answers) {
  const questionIds = new Set(definition.questions.map((question) => question.id));
  for (const answerId of Object.keys(answers)) {
    if (!questionIds.has(answerId)) throw new TypeError(`未知题目：${answerId}`);
  }
  const totals = Object.fromEntries(definition.dimensions.map(({ id }) => [id, { raw: 0, max: 0 }]));
  for (const question of definition.questions) {
    if (!(question.id in answers)) throw new TypeError(`测试尚未完成：${question.id}`);
    const answer = answers[question.id];
    if (!VALID_ANSWERS.has(answer)) throw new TypeError(`非法答案：${question.id}`);
    for (const [dimensionId, weight] of Object.entries(question.effects)) {
      if (!totals[dimensionId]) throw new TypeError(`未知维度：${dimensionId}`);
      totals[dimensionId].raw += answer * weight;
      totals[dimensionId].max += 2 * Math.abs(weight);
    }
  }
  return Object.fromEntries(Object.entries(totals).map(([id, total]) => {
    const score = total.max ? 50 + (total.raw / total.max) * 50 : 50;
    return [id, round(Math.max(0, Math.min(100, score)))];
  }));
}

export function calculateMatches(scores, ideologies) {
  const dimensionIds = Object.keys(scores);
  const maxDistance = Math.sqrt(dimensionIds.length) * 100 || 1;
  return ideologies.map((ideology, index) => {
    const distance = Math.sqrt(dimensionIds.reduce((sum, id) => {
      const difference = scores[id] - ideology.scores[id];
      return sum + difference * difference;
    }, 0));
    return { ...ideology, match: round(Math.max(0, 100 - (distance / maxDistance) * 100)), _index: index };
  }).sort((a, b) => b.match - a.match || a._index - b._index).map(({ _index, ...match }) => match);
}

