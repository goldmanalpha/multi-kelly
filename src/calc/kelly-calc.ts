import _ from 'lodash';
import { ScenarioOdds, KellyResult } from './kelly-types';

/**
 * calcKellyBetSize: based on: https://math.stackexchange.com/a/662210
 * @param odds
 * @returns 0-100: kelly percent of capital to invest
 */
const calcKellyBetSize = (
  odds: ScenarioOdds[]
): KellyResult => {
  const yCalc = (x: number) => {
    return _.sum(
      odds.map(
        (o) =>
          o.probability *
          Math.log(1 + (o.payoffReturn * x) / 100)
      )
    );
  };

  const graph = _.range(0, 101).map(yCalc);

  function getMaxIdx(graph: number[]) {
    const max = Math.max(...graph);

    const maxIdx = graph.indexOf(max);
    return maxIdx;
  }

  const maxIdx = getMaxIdx(graph);

  const maxIdx2 = getMaxIdx(
    graph.map((y, i) => (i === maxIdx ? -Infinity : y))
  );

  const direction = maxIdx2 > maxIdx ? 1 : -1;

  const graph2 = _.range(0, 9)
    .map((x) => maxIdx + (direction * x) / 10)
    .map(yCalc);

  const decimalMaxIdx = getMaxIdx(graph2);

  const y = graph2[decimalMaxIdx];

  return {
    betPct: maxIdx + (direction * decimalMaxIdx) / 10,
    graph,
    expectedPayoff: Math.pow(Math.E, y),
  };
};

export default calcKellyBetSize;
