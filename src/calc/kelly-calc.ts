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
  const graph = _.range(0, 101).map((x) => {
    return _.sum(
      odds.map(
        (o) =>
          o.probability *
          Math.log(1 + (o.payoffReturn * x) / 100)
      )
    );
  });

  const max = Math.max(...graph);

  const betPct = graph.indexOf(max);

  return {
    betPct,
    graph,
  };
};

export default calcKellyBetSize;
