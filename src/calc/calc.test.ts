import calcKellyBetSize from './kelly-calc';
import { KellyResult, ScenarioOdds } from './kelly-types';
import _ from 'lodash';

const simplifyResult = (
  result: KellyResult
): Partial<KellyResult> => {
  const copy: Partial<KellyResult> = {
    ...result,
    expectedPayoff: _.round(result.expectedPayoff, 2),
  };

  delete copy.graph;

  return copy;
};

describe('coin flips', () => {
  test('triple or nothing', () => {
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
      expectedPayoff: _.round(result.expectedPayoff, 3),
    };

    // prettier-ignore
    const expectedGraphRounded3 = [   0,   0.005,   0.01,   0.014,   0.018,   0.022,   0.026,   0.029,   0.033,   0.036,   0.038,   0.041,   0.044,   0.046,   0.048,   0.05,   0.052,   0.053,   0.055,   0.056,   0.057,   0.057,   0.058,   0.059,   0.059,   0.059,   0.059,   0.059,   0.058,   0.057,   0.057,   0.056,   0.055,   0.053,   0.052,   0.05,   0.048,   0.046,   0.044,   0.041,   0.038,   0.036,   0.033,   0.029,   0.026,   0.022,   0.018,   0.014,   0.01,   0.005,   0,   -0.005,   -0.011,   -0.016,   -0.022,   -0.028,   -0.035,   -0.042,   -0.049,   -0.056,   -0.064,   -0.072,   -0.081,   -0.089,   -0.099,   -0.108,   -0.119,   -0.129,   -0.14,   -0.152,   -0.164,   -0.177,   -0.19,   -0.205,   -0.219,   -0.235,   -0.251,   -0.269,   -0.287,   -0.306,   -0.327,   -0.349,   -0.372,   -0.397,   -0.423,   -0.452,   -0.483,   -0.516,   -0.553,   -0.592,   -0.636,   -0.686,   -0.741,   -0.804,   -0.878,   -0.966,   -1.074,   -1.214,   -1.413,   -1.757,   -Infinity, ];

    expect({
      betPct: 25,
      graph: expectedGraphRounded3,
      expectedPayoff: 1.061,
    } as KellyResult).toEqual(simpleResult);
  });

  test('double or nothing', () => {
    const odds: ScenarioOdds[] = [
      {
        probability: 0.5,
        payoffReturn: 1,
      },
      {
        probability: 0.5,
        payoffReturn: -1,
      },
    ];

    const result = calcKellyBetSize(odds);

    expect(result.betPct).toEqual(0);
  });
});

describe('multiple outcomes', () => {
  test('jelly bean 3 scenario', () => {
    const odds: ScenarioOdds[] = [
      {
        //black
        probability: 0.7,
        payoffReturn: -1,
      },

      {
        // blue
        probability: 0.2,
        payoffReturn: 10,
      },

      {
        // red
        probability: 0.1,
        payoffReturn: 30,
      },
    ];

    const result = calcKellyBetSize(odds);

    expect(simplifyResult(result)).toEqual({
      betPct: 24.8,
      expectedPayoff: 1.3,
    });
  });
});
