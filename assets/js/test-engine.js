const ANSWERS = [
  { value: -2, label: '非常不同意' },
  { value: -1, label: '比较不同意' },
  { value: 0, label: '不确定／视情况而定' },
  { value: 1, label: '比较同意' },
  { value: 2, label: '非常同意' },
];

export function createTestSession(definition, initialAnswers = {}) {
  const questions = definition.questions;
  const answers = { ...initialAnswers };
  const firstUnanswered = questions.findIndex((question) => !(question.id in answers));
  let index = firstUnanswered === -1 ? Math.max(0, questions.length - 1) : firstUnanswered;

  return {
    answer(value) {
      if (![ -2, -1, 0, 1, 2 ].includes(value)) throw new TypeError('非法答案');
      answers[questions[index].id] = value;
      if (index < questions.length - 1) index += 1;
      return this.getProgress();
    },
    previous() { index = Math.max(0, index - 1); return this.getProgress(); },
    next() { index = Math.min(questions.length - 1, index + 1); return this.getProgress(); },
    goTo(nextIndex) { index = Math.max(0, Math.min(questions.length - 1, nextIndex)); return this.getProgress(); },
    getCurrentQuestion() { return questions[index]; },
    getAnswers() { return { ...answers }; },
    getProgress() { return { index, current: index + 1, total: questions.length, answered: Object.keys(answers).filter((id) => questions.some((q) => q.id === id)).length }; },
    isComplete() { return questions.every((question) => question.id in answers); },
  };
}

export function mountTest(root, definition, options = {}) {
  const store = options.store;
  const restored = store?.loadProgress(definition.id, definition.version) ?? {};
  const session = createTestSession(definition, restored.answers ?? {});
  if (Number.isInteger(restored.index)) session.goTo(restored.index);

  const render = () => {
    const progress = session.getProgress();
    const question = session.getCurrentQuestion();
    const currentAnswer = session.getAnswers()[question.id];
    root.innerHTML = `<section class="test-shell" aria-labelledby="test-title"><header class="test-question"><div class="test-progress"><p class="test-kicker">${definition.title}</p><p class="question-index"><span>${String(progress.current).padStart(2, '0')}</span> / ${String(progress.total).padStart(2, '0')}</p></div><h1 id="test-title">${question.text}</h1><div class="progress-meta" aria-live="polite"><span>第 ${progress.current} 题，共 ${progress.total} 题</span><span>已答 ${progress.answered}</span></div><div class="progress-track" aria-hidden="true"><span style="width:${(progress.current / progress.total) * 100}%"></span></div></header><fieldset class="answer-list"><legend class="sr-only">选择你的回答</legend>${ANSWERS.map((answer, i) => `<label class="answer-option${currentAnswer === answer.value ? ' selected' : ''}" aria-checked="${currentAnswer === answer.value}"><input type="radio" name="answer" value="${answer.value}"${currentAnswer === answer.value ? ' checked' : ''}><span>${answer.label}</span><kbd>${i + 1}</kbd></label>`).join('')}</fieldset><p class="keyboard-hint">可按数字键 1—5 快速作答</p><div class="test-actions"><button class="text-button" type="button" data-previous${progress.index === 0 ? ' disabled' : ''}>← 上一题</button><button class="button umber" type="button" data-next>${session.isComplete() && progress.index === progress.total - 1 ? '查看结果' : '下一题 →'}</button></div><p class="storage-message" role="status" aria-live="polite"></p></section>`;

    const persist = () => {
      const result = store?.saveProgress(definition.id, definition.version, { index: session.getProgress().index, answers: session.getAnswers() });
      if (result && !result.ok) root.querySelector('.storage-message').textContent = '当前浏览器无法保存进度，但你仍可继续完成本次测试。';
    };
    root.querySelectorAll('input[name="answer"]').forEach((input) => input.addEventListener('change', () => {
      session.answer(Number(input.value));
      persist();
      render();
    }));
    root.querySelector('[data-previous]').addEventListener('click', () => { session.previous(); persist(); render(); });
    root.querySelector('[data-next]').addEventListener('click', () => {
      if (session.isComplete() && session.getProgress().index === progress.total - 1) options.onComplete?.(session.getAnswers());
      else { session.next(); persist(); render(); }
    });
  };

  const keyHandler = (event) => {
    const number = Number(event.key);
    if (number >= 1 && number <= 5) {
      session.answer(ANSWERS[number - 1].value);
      store?.saveProgress(definition.id, definition.version, { index: session.getProgress().index, answers: session.getAnswers() });
      render();
    }
  };
  document.addEventListener('keydown', keyHandler);
  render();
  return { session, destroy: () => document.removeEventListener('keydown', keyHandler) };
}

