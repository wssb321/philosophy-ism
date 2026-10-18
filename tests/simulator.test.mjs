import test from 'node:test';
import assert from 'node:assert/strict';
import { PHILOSOPHY_TEST } from '../philosophy/definition.js';
import { createSimulationState, updateSimulation } from '../assets/js/simulator.js';

test('simulation starts every dimension at the neutral midpoint', () => {
  const state = createSimulationState(PHILOSOPHY_TEST.dimensions);
  assert.deepEqual(Object.values(state), [50, 50, 50, 50, 50, 50]);
});

test('simulation clamps input and changes only the requested axis', () => {
  const state = createSimulationState(PHILOSOPHY_TEST.dimensions);
  const result = updateSimulation(state, 'essence-create', 140, PHILOSOPHY_TEST.ideologies);
  assert.equal(result.scores['essence-create'], 100);
  assert.equal(result.scores['objective-open'], 50);
  assert.equal(state['essence-create'], 50);
});

test('matches are recalculated and reordered from the live state', () => {
  const state = createSimulationState(PHILOSOPHY_TEST.dimensions);
  const towardExistentialism = Object.entries(PHILOSOPHY_TEST.ideologies[0].scores)
    .reduce((result, [dimensionId, value]) => updateSimulation(result.scores, dimensionId, value, PHILOSOPHY_TEST.ideologies), { scores: state });
  assert.equal(towardExistentialism.matches[0].id, 'existentialism');
});

test('each new philosophy prototype is its own closest simulation match', () => {
  for (const id of ['absurdism', 'epicureanism', 'humanism', 'hedonism']) {
    const ideology = PHILOSOPHY_TEST.ideologies.find((item) => item.id === id);
    assert.ok(ideology, `missing ${id}`);
    let state = createSimulationState(PHILOSOPHY_TEST.dimensions);
    for (const [dimensionId, value] of Object.entries(ideology.scores)) {
      state = updateSimulation(state, dimensionId, value, PHILOSOPHY_TEST.ideologies).scores;
    }
    assert.equal(updateSimulation(state, 'essence-create', state['essence-create'], PHILOSOPHY_TEST.ideologies).matches[0].id, id);
  }
});
