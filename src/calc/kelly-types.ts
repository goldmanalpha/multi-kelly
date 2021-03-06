export interface ScenarioOdds {
  /**
   * 0 - 1: 0 = no chace, 1 = certainty
   */
  probability: number;

  /**
   * how much received if the scenario occurs including original principal
   * 1 = 100% gain -- return of amount bet * 2
   * 0 = return of bet, no gain or loss
   * -1 = complete loss
   * netgative numbers for losing more than the bet not tested
   *
   * see: https://www.amwager.com/horse-racing-odds/#:~:text=The%20first%20number%20tells%20you,in%20one%20of%20two%20formats.
   */
  payoffReturn: number;
}

export interface KellyResult {
  betPct: number;

  /**
   * indices represent bet amount, number represents proportionality to expected outcome
   */
  graph: number[];

  expectedPayoff: number;
}
