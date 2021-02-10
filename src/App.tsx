import React from 'react';
import KellyUi from './kellyUi';
import { ScenarioData } from './scenario';

const coinFlip: ScenarioData[] = [
  {
    name: 'heads',
    probabilityPct: 50,
    expectedReturnPct: 200,
  },
  {
    name: 'tails',
    probabilityPct: 50,
    expectedReturnPct: -100,
  },
];

const App = () => {
  return (
    <KellyUi showHeader={true} startScenario={coinFlip} />
  );
};

export default App;
