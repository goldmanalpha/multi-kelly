import calcKellyBetSize from './kelly-calc';
import { KellyResult, ScenarioOdds } from './kelly-types';
import _ from 'lodash';

describe('single option', () => {
  test('coin flip', () => {
    const odds: ScenarioOdds[] = [
      {
        probability: 0.5,
        payoffReturn: 2,
      },
      {
        probability: 0.5,
        payoffReturn: -1,
      },
    ];

    const result = calcKellyBetSize(odds);

    const simpleResult = {
      ...result,
      graph: result.graph.map((p) => _.round(p, 3)),
    };

    // prettier-ignore
    const expectedGraphRounded3 = [   0,   0.005,   0.01,   0.014,   0.018,   0.022,   0.026,   0.029,   0.033,   0.036,   0.038,   0.041,   0.044,   0.046,   0.048,   0.05,   0.052,   0.053,   0.055,   0.056,   0.057,   0.057,   0.058,   0.059,   0.059,   0.059,   0.059,   0.059,   0.058,   0.057,   0.057,   0.056,   0.055,   0.053,   0.052,   0.05,   0.048,   0.046,   0.044,   0.041,   0.038,   0.036,   0.033,   0.029,   0.026,   0.022,   0.018,   0.014,   0.01,   0.005,   0,   -0.005,   -0.011,   -0.016,   -0.022,   -0.028,   -0.035,   -0.042,   -0.049,   -0.056,   -0.064,   -0.072,   -0.081,   -0.089,   -0.099,   -0.108,   -0.119,   -0.129,   -0.14,   -0.152,   -0.164,   -0.177,   -0.19,   -0.205,   -0.219,   -0.235,   -0.251,   -0.269,   -0.287,   -0.306,   -0.327,   -0.349,   -0.372,   -0.397,   -0.423,   -0.452,   -0.483,   -0.516,   -0.553,   -0.592,   -0.636,   -0.686,   -0.741,   -0.804,   -0.878,   -0.966,   -1.074,   -1.214,   -1.413,   -1.757,   -Infinity, ];

    expect(simpleResult).toEqual({
      betPct: 25,
      graph: expectedGraphRounded3,
    } as KellyResult);
  });

  describe('option', () => {});
});

// test empty
