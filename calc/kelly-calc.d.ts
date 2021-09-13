import { ScenarioOdds, KellyResult } from './kelly-types';
/**
 * calcKellyBetSize: based on: https://math.stackexchange.com/a/662210
 * @param odds
 * @returns 0-100: kelly percent of capital to invest
 */
declare const calcKellyBetSize: (odds: ScenarioOdds[]) => KellyResult;
export default calcKellyBetSize;
//# sourceMappingURL=kelly-calc.d.ts.map